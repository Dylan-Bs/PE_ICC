import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from Student.models import Student
from Services.linkedin import LinkedinCrawler
from django.http import HttpResponse
from django.http import JsonResponse
import datetime
import time


class Crawl(APIView):
    _crawler = None

    @property
    def crawler(self):
        if self._crawler == None:
            self._crawler = LinkedinCrawler(headless=True)
            self._crawler.login('angivare-bot@yahoo.com', 'CODE_COM1')
        return self._crawler

    def get(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id = userid)
            if user != None and (user.is_staff or user.is_superuser):
                studentId = request.GET.get('id', '')
                student = Student.objects.get(id=studentId)
                user = User.objects.get(id=studentId)

                url = student.linkedin_url
                if not url:
                    url = self.crawler.find_user_url(f'{user.first_name} {user.last_name}')

                res = self.crawler.crawl_page(url)

                if res:
                    if res['company'] != None:
                        student.company = res['company']
                    if res['work_place'] != None:
                        student.working_city = res['work_place']
                    student.save()

            resp = JsonResponse({'message': "Student updated"}, status = "200")

        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        return resp
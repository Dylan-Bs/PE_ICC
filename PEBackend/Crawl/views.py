import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from Student.views import Student
from Services.linkedin import LinkedinCrawler
from django.http import HttpResponse
from django.http import JsonResponse
import datetime
import time


class Crawl(APIView):
    crawler = None

    @property
    def crawler():
        if crawler == None:
            crawler = LinkedinCrawler()
            crawler.login()
        else:
            return crawler

    def get(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.header['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id = userid)
            if user != None and (user.is_staff or user.is_superuser):
                studentId = request.GET.get('id', '')
                student = Student.objects.get(id=studentId)

                url = student.linkedin_url
                if url == None:
                    url = self.crawler.find_user_url(f'{student.first_name} {student.last_name}')

                res = self.crawler.crawl_page(url)

                if res['company'] != None:
                    student.company = res['company']
                if res['working_place'] != None:
                    student.working_place = res['working_place']
                student.save()

            resp = JsonResponse({'message': "Student updated"}, status = "200")

        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        return resp
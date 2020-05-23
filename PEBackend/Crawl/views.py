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
        if('user-token' in request.headers):
            token = request.header['user-token']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id = userid)
            if user != None and (user.is_staff or user.is_superuser):
                studentId = request.GET.get('id', '')
                student = Student.objects.get(id=studentId)

                url = student.linkedin_url
                res = self.crawler.crawl_page(url)

                student.company = res['company']
                student.working_place = res['working_place']
                student.save()

            resp = JsonResponse({'message': "Student updated"}, status = "200")

        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        return resp
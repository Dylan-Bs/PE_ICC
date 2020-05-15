import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import JsonResponse
import datetime
import time

class Crawl(APIView):

    def get(self, request, *args, **kwargs):
        if('user_token' in request.headers):
            token = request.header['user_token']
            payload = jwt.decode(token, "PCSK")
            email = payload['email']
            userid = payload['id']
            userId = request.GET.get('id', '')
        # resp["Access-Control-Allow-Origin"] = "*"
        # resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        # resp["Access-Control-Max-Age"] = "1000"
        # resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        # return resp
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

class Authenticate(APIView):

    def converter(obj):
        if isinstance(obj, datetime.datetime):
            return obj.__str__()

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status="400")
        email_r = request.data['email']
        password_r = request.data['password']
        user = authenticate(username=email_r, password=password_r)
        if user:
            expiry = datetime.date.today() + datetime.timedelta(days=7)
            token = jwt.encode({'id':user.id,'username': user.username, 'expiry':expiry.__str__()}, 'PCSK',  algorithm='HS256')    
            resp = HttpResponse(
              token,
              status=200,
              content_type="application/json",
             )
        else:
            resp = HttpResponse(
              json.dumps({'Error': "Invalid credentials"}),
              status=400,
              content_type="application/json",
            )
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
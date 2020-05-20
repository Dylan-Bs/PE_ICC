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

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status="400")
        email_r = request.data['email']
        password_r = request.data['password']
        user = authenticate(username=email_r, password=password_r)
        if user:
            expiry = datetime.date.today() + datetime.timedelta(days=7)
            role = '0'
            if(user.is_staff):
                role = '1'
            if(user.is_superuser):
                role = '2'
            token = jwt.encode({'id':user.id,'username': user.username, 'expiry':expiry.__str__()}, 'PCSK',  algorithm='HS256').decode('utf-8')    
            resp = HttpResponse(
              json.dumps({'token' : str(token), 'expiry': str(expiry), "first_name": str(user.first_name), "last_name": str(user.last_name), 'email': str(user.email), 'role': str(role)}),
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
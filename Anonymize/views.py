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

class Anonymize(APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status="400")
        try:
            if('user_token' in request.headers):
                token = request.header['user_token']
                payload = jwt.decode(token, "PCSK")
                email = payload['email']
                userid = payload['id']
                user = User.objects.get(username = email)
                user.IsActive = False;
                resp = JsonResponse({'Success': "User deleted, anonymization completed"}, status = "200")
        except User.DoesNotExist:
            resp = JsonResponse({'NotFound': "User does not exist"}, status = "404")
        except Exception as e: 
            resp = JsonResponse({'ExceptionOccured': "An exception occured during anonymization"}, status = "400")
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.mail import send_mail
from Teacher.models import Teacher
from Student.models import Student
import datetime
import time

class ForgottenPassword(APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status="400")
        else:
            email_r = request.data.get('email', '')
            if email_r == '':
                resp = JsonResponse({'Error': "Please provide "}, status="400")
            else:
                user = User.objects.filter(username = email_r)
                if user and user.is_active:
                    print(" ")
                elif user and not user.is_active:
                    resp = HttpResponse(
                    json.dumps({'Forbidden': "You disabled your account, register again with the same email"}),
                        status=403,
                        content_type="application/json",
                    )
                else:
                    resp = HttpResponse(
                    json.dumps({'Error': "No user linked to this email"}),
                        status=400,
                        content_type="application/json",
                    )
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
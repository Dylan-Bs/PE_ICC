import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import JsonResponse
from Teacher.models import Teacher
from Student.models import Student
import datetime
import time

class Authenticate(APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status="400")
        else:
            email_r = request.POST.get('email', '')
            password_r = request.POST.get('password', '')
            if email_r == '' or password_r == '':
                resp = JsonResponse({'Error': "Please provide email and password"}, status="400")
            else:
                user = authenticate(username=email_r, password=password_r)
                if user and user.is_active:
                    expiry = datetime.date.today() + datetime.timedelta(days=7)
                    if(user.is_superuser):
                        role = '2'
                        option = ''
                    elif(user.is_staff):
                        role = '1'
                        teacher = Teacher.objects.get(id = user.id)
                        option = teacher.option
                    else:
                        student = Student.objects.get(id = user.id)
                        option = student.option
                        role = '0'
                    token = jwt.encode({'id':user.id,'username': user.username, 'expiry':expiry.__str__()}, 'PCSK',  algorithm='HS256').decode('utf-8')    
                    resp = HttpResponse(
                        json.dumps({'token' : str(token), 'expiry': str(expiry), "first_name": str(user.first_name), "last_name": str(user.last_name), 'email': str(user.email), 'role': str(role), 'option': str(option)}),
                        status=200,
                        content_type="application/json",
                    )
                elif user and not user.is_active:
                    resp = HttpResponse(
                    json.dumps({'Forbidden': "You disabled your account, register again with the same email"}),
                        status=403,
                        content_type="application/json",
                    )
                else:
                    resp = HttpResponse(
                    json.dumps({'Error': "Invalid credentials"}),
                        status=400,
                        content_type="application/json",
                    )
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
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
            resp = JsonResponse({'Error': "Please provide username/password"}, status="400")
        email_r = request.data['email']
        password_r = request.data['password']
        user = authenticate(username=email_r, password=password_r)
        if user:
            expiry = datetime.date.today() + datetime.timedelta(days=7)
<<<<<<< HEAD
            if(user.is_superuser):
                role = '2'
                option = ''
            elif(user.is_staff):
=======
            role = '0'
            if(user.is_staff and not user.is_superuser):
>>>>>>> master
                role = '1'
                teacher = Teacher.objects.get(id = user.id)
                option = teacher.option
            else:
                student = Student.objects.get(id = user.id)
                option = student.option
<<<<<<< HEAD
                role = '0'
=======
            if(user.is_superuser):
                role = '2'
                option = ''
>>>>>>> master
            token = jwt.encode({'id':user.id,'username': user.username, 'expiry':expiry.__str__()}, 'PCSK',  algorithm='HS256').decode('utf-8')    
            resp = HttpResponse(
              json.dumps({'token' : str(token), 'expiry': str(expiry), "first_name": str(user.first_name), "last_name": str(user.last_name), 'email': str(user.email), 'role': str(role), 'option': str(option)}),
              status=200,
              content_type="application/json",
             )
        else:
            resp = HttpResponse(
              json.dumps({'Error': "Invalid credentials"}),
              status=400,
              content_type="application/json",
            )
<<<<<<< HEAD
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
=======
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
>>>>>>> master
        return resp
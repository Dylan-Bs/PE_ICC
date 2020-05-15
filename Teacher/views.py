import django
import pathlib
from .models import Student as StudentModel
import os
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import TeacherModel

class teacher(views.APIView):

    def put(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status = "400")
        else: 
            userlogin = request.data['id']
            password = request.data['userpassword']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            option = request.data['option']
            if User.objects.filter(username=userlogin).exists():
                resp = JsonResponse({'Error': "Already registered"}, status = "400")
            else:
                user = User.objects.create_user(userlogin,userlogin, password)
                user.first_name = first_name
                user.last_name = last_name
                user.is_active = True
                user.is_staff = True
                user.is_superuser = False
                user.save()
                res = User.objects.get(username=userlogin)
                teacher = TeacherModel()
                teacher.id = str(res.id)
                teacher.option = option
                teacher.save()
                resp = JsonResponse({'id':str(res.id), "email":res.email,"first_name":res.first_name}, status = "200")
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp





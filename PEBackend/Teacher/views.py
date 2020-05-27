import django
import pathlib
import os
import jwt
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Teacher as TeacherModel

class Teacher(views.APIView):

    def put(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id=userid)
            if user != None:
                if user.is_superuser:
                    if not request.data:
                        resp = JsonResponse({'Error': "Please provide username/password"}, status = "400")
                    else: 
                        userlogin = request.data['email']
                        password = request.data['password']
                        first_name = request.data['first_name']
                        last_name = request.data['last_name']
                        option = request.data['option']
                        if User.objects.filter(username=userlogin).exists():
                            resp = JsonResponse({'Error': "Already registered"}, status = "409")
                        else:
                            user = User.objects.create_user(userlogin,userlogin, password)
                            user.first_name = first_name
                            user.last_name = last_name
                            user.email = userlogin
                            user.is_active = True
                            user.is_staff = True
                            user.is_superuser = False
                            user.save()
                            res = User.objects.get(username=userlogin)
                            teacher = TeacherModel()
                            teacher.id = str(res.id)
                            teacher.option = option
                            teacher.save()
                            resp = JsonResponse({"Created": "Teacher succesfully created.", 'id':str(res.id), "email":res.username,"first_name":res.first_name, "last_name":res.last_name}, status = "201")
                else:
                    resp = JsonResponse({'Access Denied': "No enough rights to achieve this"}, status = "403")

            else:
                resp = JsonResponse({'Access Denied': "Token invalid"}, status = "400")
        else:
            resp = JsonResponse({'Access Denied': " You must be authenticated"}, status = "401")
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status = "400")
        else: 
            if('Authorization' in request.headers):
                token = request.headers['Authorization']
                payload = jwt.decode(token, "PCSK")
                userid = payload['id']
                user = User.objects.get(id=userid)
                if(user != None):
                    if user.is_superuser:
                        userid = request.data['id']
                        option = request.data['option']
                        user = User.objects.get(id=userid)
                        teacher = TeacherModel.objects.get(id=userid)
                        teacher.option = option
                        teacher.save()
                    first_name = request.data['first_name']
                    last_name = request.data['last_name']
                    user.first_name = first_name
                    user.last_name = last_name
                    user.save()
                    res = User.objects.get(id=userid)
                    resp = JsonResponse({'Modifications accepted': "Teacher " + res.first_name + " " + res.last_name + " updated"}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp





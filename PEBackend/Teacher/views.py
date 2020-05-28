import django
import pathlib
import os
import jwt
import datetime
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
            expiry = payload['expiry']
            if datetime.datetime.strptime(expiry, '%Y-%m-%d') > datetime.datetime.now():
                user = User.objects.get(id=userid)
                if user != None:
                    if user.is_superuser:
                        if not request.data:
                            resp = JsonResponse({'Error': "Please provide username/password"}, status = "400")
                        else: 
                            userlogin = request.data.get('email', '')
                            password = request.data.get('password', '')
                            first_name = request.data.get('first_name', '')
                            last_name = request.data.get('last_name', '')
                            option = request.data.get('option', '')
                            if userlogin == '' or password == '' or first_name == '' or last_name == '':
                                resp = JsonResponse({'BadRequest': "Required parameters missing"}, status = "400")
                            else:
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
                resp = JsonResponse({'TokenExpired': "You must authenticate again"}, status = "408")
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
                expiry = payload['expiry']
                if datetime.datetime.strptime(expiry, '%Y-%m-%d') > datetime.datetime.now():
                    user = User.objects.get(id=userid)
                    if(user != None):
                        if user.is_superuser:
                            userid = request.data.get('id', '')
                            if id != '':
                                user = User.objects.get(id=userid)
                                if user!= None:
                                    option = request.data.get('option', '')
                                    if option != '':
                                        teacher = TeacherModel.objects.get(id=userid)
                                        teacher.option = option
                                        teacher.save()
                            else:
                                user = None
                        if user != None:
                            first_name = request.data.get('first_name', '')
                            last_name = request.data.get('last_name', '')
                            if first_name != '':
                                user.first_name = first_name
                            if last_name != '':
                                user.last_name = last_name
                            user.save()
                            resp = JsonResponse({'Modifications accepted': "Teacher " + user.first_name + " " + user.last_name + " updated"}, status = "200")
                        else:
                            resp = JsonResponse({'Notfound': "No user found with this id"}, status = "404")
                    else:
                        resp = JsonResponse({'AccessDenied': "Token invalid"}, status = "403")
                else:
                    resp = JsonResponse({'TokenExpired': "You must authenticate again"}, status = "408")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp





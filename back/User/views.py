from django.shortcuts import render
from django.shortcuts import render
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
from django.contrib.auth.models import User as UserModel
from Student.models import Student 

class User(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status = "400")
        else: 
            if('user-token' in request.headers):
                token = request.headers['user-token']
                payload = jwt.decode(token, "PCSK", algorithms=['HS256'])
                userid = payload['id']
                user = UserModel.objects.get(id=userid)
                if(user != None):
                    email = request.data['email']
                    password = request.data['password']
                    user.email = email
                    user.set_password(password)
                    user.save()
                    resp = JsonResponse({'Modifications accepted': "User " + user.first_name + " " + user.last_name + " updated"}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
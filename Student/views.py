import django
import pathlib
from .models import Student as StudentModel
import os
import jwt
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.http import JsonResponse

class Student(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "Please provide username/password"}, status = "400")
        else: 
            if('user_token' in request.headers):
                token = request.header['user_token']
                payload = jwt.decode(token, "PCSK")
                email = payload['email']
                userid = payload['id']
                user = User.objects.get(username=email, id=userid)
                if(user != None):
                    first_name = request.data['first_name']
                    last_name = request.data['last_name']
                    promotion = request.data['promotion']
                    company = request.data['company']
                    wage = request.data['wage']
                    working_city = request.data['working_city']
                    user.first_name = first_name
                    user.last_name = last_name
                    user.save()
                    res = User.objects.get(username=email)
                    student = Student.objects.get(id= res.id)
                    student.promotion = promotion
                    student.company = company
                    student.working_city = working_city
                    student.wage = wage
                    student.save()
                    resp = JsonResponse({'Modifications accepted': "User " + res.first_name + " " + res.last_name + " updated"}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
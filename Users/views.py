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
from django.contrib.auth.models import User
from Student.models import Student 
from Teacher.models import Teacher 

class Users(views.APIView):

    def get(self, request, *args, **kwargs):
        data = []
        users = User.objects.all()
        users = list(users)
        for user in users:
            if(Student.objects.filter(id = user.id).exists()):
                tmp_student = Student.objects.get(id = user.id)
                data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "promotion": str(tmp_student.promotion), "company": str(tmp_student.company), "wage" : str(tmp_student.wage), "working_city": str(tmp_student.working_city), "role": "student"})
            elif (Teacher.objects.filter(id = user.id).exists()):
                tmp_teacher = Teacher.objects.get(id = user.id)
                data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "option": str(tmp_teacher.option), "role": "teacher"})
        resp = JsonResponse(data, safe = False)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp

    def delete(self, request, *args, **kwargs):
        data = []
        users = User.objects.all()
        users = list(users)
        for user in users:
            if(Student.objects.filter(id = user.id).exists()):
                tmp_student = Student.objects.get(id = user.id)
                data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "promotion": str(tmp_student.promotion), "company": str(tmp_student.company), "wage" : str(tmp_student.wage), "working_city": str(tmp_student.working_city), "role": "student"})
            elif (Teacher.objects.filter(id = user.id).exists()):
                tmp_teacher = Teacher.objects.get(id = user.id)
                data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "option": str(tmp_teacher.option), "role": "teacher"})
        resp = JsonResponse(data, safe = False)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
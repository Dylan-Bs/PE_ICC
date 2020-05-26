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

    def get(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id=userid)
            if(user != None):
                res = User.objects.get(id=userid)
                student = StudentModel.objects.get(id= res.id)
                resp = JsonResponse({"first_name": res.first_name, "last_name": res.last_name, "email": res.email, "promotion": student.promotion, "option": student.option, "company": student.company, "working_city": student.working_city, "wage": student.wage, "linkedin_url": str(student.linkedin_url)}, status = "200")
            else:
                resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
        else:
            resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
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
                        user = User.objects.get(id=userid)
                    first_name = request.data['first_name']
                    last_name = request.data['last_name']
                    email = request.data['email']
                    promotion = request.data['promotion']
                    option = request.data['option']
                    company = request.data['company']
                    wage = request.data['wage']
                    working_city = request.data['working_city']
                    user.first_name = first_name
                    user.last_name = last_name
                    user.email = email
                    user.save()
                    res = User.objects.get(id=userid)
                    student = StudentModel.objects.get(id= res.id)
                    student.promotion = promotion
                    student.option = option
                    student.company = company
                    student.working_city = working_city
                    student.wage = wage
                    student.save()
                    resp = JsonResponse({'Modifications accepted': "Student " + res.first_name + " " + res.last_name + " updated"}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
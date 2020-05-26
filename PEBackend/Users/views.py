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
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id = userid)
            if user != None:
                if(user.is_superuser):
                    users = User.objects.all()
                    users = list(users)
                    for user in users:
                        if(Student.objects.filter(id = user.id).exists()):
                            tmp_student = Student.objects.get(id = user.id)
                            data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "promotion": str(tmp_student.promotion), "option": str(tmp_student.option), "company": str(tmp_student.company), "wage" : str(tmp_student.wage), "working_city": str(tmp_student.working_city), "linkedin_url": str(tmp_student.linkedin_url), "role": "0"})
                        elif (Teacher.objects.filter(id = user.id).exists()):
                            tmp_teacher = Teacher.objects.get(id = user.id)
                            data.append({"id": str(user.id), "first_name": str(user.first_name), "last_name": str(user.last_name), "email": str(user.email), "option": str(tmp_teacher.option), "role": "1"})
                    resp = JsonResponse(data, safe = False)
                else:
                    resp = JsonResponse({'Access Denied': "No enough rights to achieve this"}, status = "403")
            else:
                resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
        else:
            resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp

    def delete(self, request, *args, **kwargs):
        if request.data != None:
            if('Authorization' in request.headers):
                token = request.headers['Authorization']
                payload = jwt.decode(token, "PCSK")
                userid = payload['id']
                user = User.objects.get(id = userid)
                if(user.is_superuser):
                    for jsonObject in request.Data:
                        deleteId = jsonObject['user_id']
                        userToDelete = User.objects.get(id = deleteId)
                        if userToDelete != None:
                            if userToDelete.is_staff:
                                teacher = Teacher.objects.get(id=deleteId)
                                teacher.delete()
                            else:
                                student = Student.objects.get(id=deleteId)
                                student.delete()                        
                        userToDelete.delete()
                    resp = JsonResponse({"Success": "Users deleted with success"}, status = 200)
                else:
                    resp = JsonResponse({"Denied": "No enough rights to operate this"}, status = 403)
        else:
            resp = JsonResponse({"Error": "No data provided"}, status = 400, safe = False)
        resp["Access-Control-Allow-Methods"] = "DELETE, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp

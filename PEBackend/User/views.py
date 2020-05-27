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
from Teacher.models import Teacher 

class User(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status = "400")
        else: 
            if('Authorization' in request.headers):
                token = request.headers['Authorization']
                payload = jwt.decode(token, "PCSK", algorithms=['HS256'])
                userid = payload['id']
                user = UserModel.objects.get(id=userid)
                if(user != None):
                    email = request.data.get('email', '')
                    password = request.data.get('password', '')
                    first_name = request.data.get('first_name', '')
                    last_name = request.data.get('last_name', '')
                    if email != '':
                        user.username = email
                        user.email = email
                    if password != '':
                        user.set_password(password)
                    if first_name != '':
                        user.first_name = first_name
                    if last_name != '':
                        user.last_name = last_name
                    user.save()
                    resp = JsonResponse({'Modifications accepted': "User " + user.first_name + " " + user.last_name + " updated"}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "400")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "401")
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp

    def delete(self, request, *args, **kwargs):
        if request.data != None:
            if('Authorization' in request.headers):
                token = request.headers['Authorization']
                payload = jwt.decode(token, "PCSK")
                userid = payload['id']
                user = UserModel.objects.get(id = userid)
                if(user.is_superuser):
                    deleteId = request.data['id']
                    userToDelete = UserModel.objects.get(id = deleteId)
                else:
                    userToDelete = UserModel.objects.get(id = userid)
                if userToDelete != None:
                    if not userToDelete.is_staff and not userToDelete.is_superuser:
                        student = Student.objects.get(id=userToDelete.id)
                        student.delete()                        
                    elif userToDelete.is_staff and not userToDelete.is_superuser:
                        teacher = Teacher.objects.get(id=userToDelete.id)
                        teacher.delete()
                    userToDelete.delete()
                    resp = JsonResponse({"Success": "User deleted with success"}, status = 200)
                else:
                    resp = JsonResponse({"Denied": "No enough rights to operate this"}, status = 403)
            else:
                resp = JsonResponse({"Unauthorized": "An authentication is required"}, status = 401)
        else:
            resp = JsonResponse({"Error": "No data provided"}, status = 400, safe = False)
        resp["Access-Control-Allow-Methods"] = "DELETE, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
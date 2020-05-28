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
import datetime

class Student(views.APIView):

    def get(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            expiry = payload['expiry']
            if datetime.datetime.strptime(expiry, '%Y-%m-%d %H:%M:%S.%f') > datetime.datetime.now():
                user = User.objects.get(id=userid)
                if(user != None):
                    res = User.objects.get(id=userid)
                    student = StudentModel.objects.get(id= res.id)
                    resp = JsonResponse({"first_name": res.first_name, "last_name": res.last_name, "email": res.username, "promotion": student.promotion, "option": student.option, "company": student.company, "working_city": student.working_city, "wage": student.wage, "linkedin_url": str(student.linkedin_url)}, status = "200")
                else:
                    resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
            else:
                resp = JsonResponse({'TokenExpired': "You must authenticate again"}, status = "408")
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
                expiry = payload['expiry']
                if datetime.datetime.strptime(expiry, '%Y-%m-%d %H:%M:%S.%f') > datetime.datetime.now():
                    user = User.objects.get(id=userid)
                    if(user != None):
                        if user.is_superuser:
                            userid = request.data.get('id', '')
                            if id != '':
                                user = User.objects.get(id=userid)
                            else:
                                user = None
                        if user != None:
                            first_name = request.data.get('first_name', '')
                            last_name = request.data.get('last_name', '')
                            email = request.data.get('email', '')
                            promotion = request.data.get('promotion', '')
                            option = request.data.get('option', '')
                            company = request.data.get('company', '')
                            wage = request.data.get('wage', '')
                            working_city = request.data.get('working_city', '')
                            linkedin_url = request.data.get('linkedin_url', '')
                            if first_name != '':
                                user.first_name = first_name
                            if last_name != '':
                                user.last_name = last_name
                            if email != '':
                                user.username = email
                                user.email = email
                            user.save()
                            res = User.objects.get(id=userid)
                            student = StudentModel.objects.get(id=res.id)
                            if promotion != '':
                                student.promotion = promotion
                            if option != '':
                                student.option = option
                            if company != '':
                                student.company = company
                            if working_city != '':
                                student.working_city = working_city
                            if linkedin_url != '':
                                student.linkedin_url = linkedin_url
                            if wage != '':
                                student.wage = wage
                            student.save()
                            resp = JsonResponse({'Modifications accepted': "Student " + res.first_name + " " + res.last_name + " updated"}, status = "200")
                        else:
                            resp = JsonResponse({'Notfound': "No user found with this id"}, status = "404")
                    else:
                        resp = JsonResponse({'Access Denied': "Token invalid"}, status = "403")
                else:
                    resp = JsonResponse({'TokenExpired': "You must authenticate again"}, status = "408")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
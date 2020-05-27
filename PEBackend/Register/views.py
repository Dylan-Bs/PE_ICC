import django
from django.views.generic.edit import CreateView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from Student.models import Student as StudentModel
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse

class Register(APIView):

    def put(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status = "400")
        else: 
            userlogin = request.data.get('email', '')
            password = request.data.get('password', '')
            first_name = request.data.get('first_name', '')
            last_name = request.data.get('last_name', '')
            if userlogin == '' or password == '' or first_name == '' or last_name == '':
                resp = JsonResponse({'Error': "Required informations missing"}, status="400")
            else:
                promotion = request.data.get('promotion', '')
                option = request.data.get('option', '')
                company = request.data.get('company', '')
                wage = request.data.get('wage', '')
                linkedin_url = request.data.get('linkedin_url', '')
                working_city = request.data.get('working_city', '')
                if User.objects.filter(username=userlogin).exists():
                    resp = JsonResponse({'Error': "Already registered"}, status = "409")
                else:
                    user = User.objects.create_user(userlogin,userlogin, password)
                    user.first_name = first_name
                    user.last_name = last_name
                    user.is_active = True
                    user.is_staff = False
                    user.is_superuser = False
                    user.save()
                    res = User.objects.get(username=userlogin)
                    student = StudentModel()
                    student.id = str(res.id)
                    student.promotion = promotion
                    student.option = option
                    student.company = company
                    student.working_city = working_city
                    student.wage = wage
                    student.linkedin_url = linkedin_url
                    student.save()
                    resp = JsonResponse({'Created': 'Successfully registered', 'id':str(res.id), "email":res.username,"first_name":res.first_name}, status = "201")
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
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
            userlogin = request.data['email']
            password = request.data['password']
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            promotion = request.data['promotion']
            option = request.data['option']
            company = request.data['company']
            wage = request.data['wage']
            linkedin_url = request.data['linkedin_url']
            working_city = request.data['working_city']
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
                resp = JsonResponse({'Created': 'Successfully registered', 'id':str(res.id), "email":res.email,"first_name":res.first_name}, status = "201")
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
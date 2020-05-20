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

class Students(views.APIView):

    def get(self, request, *args, **kwargs):
        data = []
        wageGET = request.GET.get('wage', '')
        promotionGET = request.GET.get('promotion', '')
        specialityGET = request.GET.get('speciality', '')
        idGET = request.GET.get('id', '')
        companyGET = request.GET.get('company', '')
        working_cityGET = request.GET.get('working_city', '')
        students = Student.objects.all()
        if(wageGET != ''):
            students = students.filter(wage = wageGET)
        if(promotionGET != ''):
            students = students.filter(promotion = promotionGET)
        if(specialityGET != ''):
            students = students.filter(speciality = specialityGET)
        if(idGET != ''):
            students = students.filter(id = idGET)
        if(companyGET != ''):
            students = students.filter(company = companyGET)
        if(working_cityGET != ''):
            students = students.filter(working_city = working_cityGET)
        students = list(students)
        for student in students:
            tmp_user = User.objects.get(id = student.id)
            data.append({"id": str(student.id), "name": str(tmp_user.first_name)+" "+str(tmp_user.last_name), "email": str(tmp_user.email), "promotion": str(student.promotion), "company": str(student.company), "wage" : str(student.wage), "working_city": str(student.working_city)})
        resp = JsonResponse(data, safe = False)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
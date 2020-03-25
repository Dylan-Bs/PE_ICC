import django
import pathlib
from .models import Student as StudentModel
import os
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse

class Project(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "No request provided"}, status="400", headers= {"Access-Control-Allow-Origin": "*"})
        else:
            name = request.data['name']
            imageUrl = request.data['imageUrl']
            algorithmiaCount = request.data['algorithmiaCount']
            if StudentModel.objects.filter(name=name).exists():
                resp = JsonResponse({'Error': "Project named like this already created"}, status="400")
            else:
                db_student = StudentModel()
                db_student.name = name
                db_student.imageUrl = imageUrl
                db_student.algorithmiaCount = algorithmiaCount
                db_student.save()
                resp = JsonResponse({"id": db_student.id,"name":db_student.name,"imageUrl":db_student.imageUrl,"algorithmiaCount":db_student.algorithmiaCount}, status = "200")
            resp["Access-Control-Allow-Origin"] = "*"
            resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            resp["Access-Control-Max-Age"] = "1000"
            resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
            return resp





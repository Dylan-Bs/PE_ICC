import django
import pathlib
from .models import Project as ProjectModel
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
            if ProjectModel.objects.filter(name=name).exists():
                resp = JsonResponse({'Error': "Project named like this already created"}, status="400")
            else:
                db_project = ProjectModel()
                db_project.name = name
                db_project.imageUrl = imageUrl
                db_project.algorithmiaCount = algorithmiaCount
                db_project.save()
                resp = JsonResponse({"id": db_project.id,"name":db_project.name,"imageUrl":db_project.imageUrl,"algorithmiaCount":db_project.algorithmiaCount}, status = "200")
            resp["Access-Control-Allow-Origin"] = "*"
            resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            resp["Access-Control-Max-Age"] = "1000"
            resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
            return resp





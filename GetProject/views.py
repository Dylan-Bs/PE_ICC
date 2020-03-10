import django
import pathlib
from Project.models import Project as ProjectModel
import os
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse

class GetProject(views.APIView):

    def post(self, request, *args, **kwargs):
        projects = ProjectModel.objects.all()
        project_list = []
        for project in projects:
            project_list.append({"id": project.id,"name": project.name,"imgUrl": project.imageUrl,"algorithmiaCount": project.algorithmiaCount})
        resp = JsonResponse(project_list, safe = False)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
from django.shortcuts import render
from django.shortcuts import render
import django
import pathlib
from Clicks.models import Click
import os
from django.core import serializers
from rest_framework import views
from rest_framework.response import Response
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.contrib.auth.models import User

class GetClicks(views.APIView):

# Create your views here.
    def post(self, request, image_Id, *args, **kwargs):
        clicks = Click.objects.filter(imageId = image_Id).order_by('userId')
        userIds = clicks.values('userId').distinct()
        data =[]
        for userId in userIds:
            user_Id =userId['userId']
            user = User.objects.get(id = user_Id)
            user_clicks = list(clicks.filter(userId=user_Id))
            tmp_clicks = []
            for click in user_clicks:
                tmp_clicks.append({"Top": str(click.top),"Left": str(click.left)})
            tmp = {"userId": str(user_Id), "email": user.email, "color": user.first_name,"clicks": tmp_clicks}
            data.append(tmp)
        resp = JsonResponse(data, safe = False)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
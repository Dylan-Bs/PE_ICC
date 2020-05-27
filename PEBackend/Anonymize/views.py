import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User as UserModel
from Student.models import Student
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import JsonResponse
import datetime
import time

class Anonymize(APIView):

    def post(self, request, *args, **kwargs):
        try:
            if('Authorization' in request.headers):
                token = request.headers['Authorization']
                payload = jwt.decode(token, "PCSK")
                userid = payload['id']
                user = UserModel.objects.get(id = userid)
                if user != None:
                    user.first_name = ''
                    user.last_name = ''
                    user.IsActive = False
                    student = Student.objects.get(id = user.id)
                    student.linkedin_url = ""
                    student.save()
                    resp = JsonResponse({'Success': "User anonymized, anonymization completed"}, status = "200")
                else:
                    resp = JsonResponse({'Bad Request': "authentication token invalid."}, status = "400")
            else:
                resp = JsonResponse({'Unauthorized': "An authentication is required to access this"}, status = "401")
        except UserModel.DoesNotExist:
            resp = JsonResponse({'NotFound': "User does not exist"}, status = "404")
        except Exception as e: 
            resp = JsonResponse({'ExceptionOccured': "An exception occured during anonymization"}, status = "400")
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.mail import send_mail
from Teacher.models import Teacher
from Student.models import Student
import datetime
import time

class ResetPassword(APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            resp = JsonResponse({'Error': "No data provided"}, status="400")
        else:
            session_r = request.data.get('session', '')
            password = request.data.get('password', '')
            if password == '' or session_r == 0:
                resp = JsonResponse({'Error': "Invalid request data"}, status="400")
            else:
                payload = jwt.decode(session_r, 'peiccreset')
                userid = payload['id']
                session = payload['session']
                expiry = payload['expiry']
                if expiry < datetime.datetime.now():
                    user = User.objects.get(id = userid)
                    if user and session == user.email:
                        user.set_password(password)
                        user.save()
                        resp = HttpResponse(
                            json.dumps({'OK': "New password set"}),
                            status=200,
                            content_type="application/json",
                        )
                    else:
                        resp = HttpResponse(
                            json.dumps({'Error': "Invalid session"}),
                            status=400,
                            content_type="application/json",
                        )
                else:
                    resp = HttpResponse(
                        json.dumps({'Error': "Reset password session expired"}),
                        status=408,
                        content_type="application/json",
                    )
        resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
import jwt,json 
from rest_framework import views
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from Student.models import Student
from django.http import HttpResponse
from django.http import JsonResponse
from os import environ
import datetime
import time
import json
import pika

class Crawl(APIView):    
    _connection = None
    _channel = None

    @classmethod
    def _connect(cls):
        cls._disconnect()

        cls._connection = pika.BlockingConnection(
            # TODO: remove credentials (use env variables)
            pika.ConnectionParameters(
                'rabbitmq',
                credentials=pika.PlainCredentials(
                    environ['RMQ_USER'], environ['RMQ_PASS']
                )
        ))
        cls._channel = cls._connection.channel()
        cls._channel.confirm_delivery()

    @classmethod
    def _disconnect(cls):
        if cls._is_connected():
            try:
                if cls._connection:
                    cls._connection.close()
            except:
                pass

        cls._connection = None
        cls._channel = None

    @classmethod
    def _is_connected(cls):
        return cls._channel and cls._channel.is_open

    @property
    def connected(self):
        return self._is_connected()

    @property
    def channel(self):
        if not self.connected:
            self._connect()
        return self._channel

    def get(self, request, *args, **kwargs):
        if('Authorization' in request.headers):
            token = request.headers['Authorization']
            payload = jwt.decode(token, "PCSK")
            userid = payload['id']
            user = User.objects.get(id = userid)
            if user != None and (user.is_staff or user.is_superuser):
                studentId = request.GET.get('id', '')
                student = Student.objects.get(id=studentId)
                user = User.objects.get(id=studentId)

                for retry_count in range(2):
                    try:
                        self.channel.basic_publish(
                            exchange='',
                            routing_key='crawl',
                            body=json.dumps({
                                'student_id': studentId,
                                'url': student.linkedin_url,
                                'first_name': user.first_name,
                                'last_name': user.last_name
                            }),
                            properties=pika.BasicProperties(
                                content_type='application/json',
                                delivery_mode=1
                            )
                        )

                        break
                    except pika.exceptions.NackError:
                        resp = JsonResponse({'message': "Broker could not register task"}, status = "500")
                    except pika.exceptions.AMQPError:
                        if not self.connected:
                            self._disconnect()
                        
                        if retry_count == 2:
                            raise

                resp = JsonResponse({'message': "Task registered"}, status = "200")
            else:
                resp = JsonResponse({'Access Denied': "You must be authenticated"}, status = "403")

        resp["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        return resp
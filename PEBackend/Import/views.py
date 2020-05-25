import django
import csv, io, json
from django.views.generic.edit import CreateView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from Student.models import Student as StudentModel
from django.contrib.auth.models import User as UserModel
from django.shortcuts import render
from django.http import JsonResponse
import uuid

class Import(APIView):

    def put(self, request, *args, **kwargs):
        if not request.FILES:
            resp = JsonResponse({'Error': "Please provide file"}, status = "400")
        else: 
            data = []
            nbStudents = 0
            for filename, file in request.FILES.items():
                if filename.endswith('.csv'):
                    data_set = file.read().decode('UTF-8')
                    students = io.StringIO(data_set)
                    # On ignore la première ligne, correspondants aux headers
                    next(students)
                    for student in csv.reader(students, delimiter=',', quotechar="|"):
                        if(not UserModel.objects.filter(username = student[0]).exists()):
                            user = UserModel.objects.create_user(student[0], student[0], str(uuid.uuid4()))
                            user.first_name = student[1]
                            user.last_name = student[2]
                            user.is_active = False
                            user.is_staff = False
                            user.is_superuser = False
                            user.save()
                            tmp_student = StudentModel()
                            tmp_student.id = user.id
                        else:
                            user = UserModel.objects.get(username = student[0])
                            tmp_student = StudentModel.objects.get(id = user.id)
                        tmp_student.promotion = student[3]
                        tmp_student.option = student[4]
                        tmp_student.company = student[5]
                        tmp_student.working_city = student[6]
                        tmp_student.wage = student[7]
                        tmp_student.save()
                        nbStudents += 1
                elif filename.endswith('.json'):
                    data = json.load(file)
                    students = data["students"]
                    for tmp_student in students:
                        if not UserModel.objects.filter(username=tmp_student['email']).exists():
                            user = UserModel.objects.create_user(tmp_student['email'], tmp_student['email'], tmp_student['password'])
                            student = StudentModel()
                            student.id = user.id
                        else:
                            user = UserModel.objects.get(email = student[0])
                            tmp_student = StudentModel.objects.get(id = user.id)
                        user.first_name = tmp_student['first_name']
                        user.last_name = tmp_student['last_name']
                        user.is_staff = False
                        user.is_superuser = False
                        user.save()
                        student.promotion = tmp_student['promotion']
                        student.option = tmp_student['option']
                        student.company = tmp_student['company']
                        student.working_city = tmp_student['working_city']
                        student.wage = tmp_student['wage']
                        student.save()
                else:
                    resp = JsonResponse({"Not Supported": "Not supported media"}, status = 415, safe = False)
            if nbStudents > 0:
                resp = JsonResponse({"Success": str(nbStudents) + " users datas imported."}, status = 200, safe = False)
            else:
                resp = JsonResponse({"No data": "No users added from the files"}, status = 400, safe = False)
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        return resp
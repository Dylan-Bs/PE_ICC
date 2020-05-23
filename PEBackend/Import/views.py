import django
from django.views.generic.edit import CreateView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from Student.models import Student as StudentModel
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse

class Import(APIView):

    def put(self, request, *args, **kwargs):
        if not request.FILES:
            resp = JsonResponse({'Error': "Please provice file"}, status = "400")
        else: 
            nbStudents = 0
            for filename, file in request.FILES.iteritems():
                name = request.FILES[filename].name
                with open(name) as students:
                    # On ignore la première ligne, correspondants aux headers
                    next(students)
                    for student in students:
                        tmp_student = StudentModel()
                        tmp_student.email = student[0]
                        tmp_student.first_name = student[1]
                        tmp_student.last_name = student[2]
                        tmp_student.promotion = student[3]
                        tmp_student.option = student[4]
                        tmp_student.company = student[5]
                        tmp_student.working_city = student[6]
                        tmp_student.wage = student[7]
                        tmp_student.save()
                        nbStudents += 1

        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Methods"] = "PUT, OPTIONS"
        resp["Access-Control-Max-Age"] = "1000"
        resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
        return resp
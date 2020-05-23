from django.contrib.auth.models import User
from Student.models import Student
import json
 
def run():
    data = {}
    if not User.objects.filter(username='admin@peicc.com').exists():
        print("Creating superuser")
        user = User.objects.create_user('admin@peicc.com', 'admin@peicc.com', 'adminpeic*')
        user.first_name = 'Admin'
        user.last_name = 'PeICC'
        user.is_staff = True
        user.is_superuser = True
        user.save()
    with open('/src/scripts/students.json') as studentsFile:
        data = json.load(studentsFile)
    students = data["students"]
    for tmp_student in students:
        if not User.objects.filter(username=tmp_student['email']).exists():
            print("adding user " + tmp_student['first_name'] + " " + tmp_student['last_name'])
            user = User.objects.create_user(tmp_student['email'], tmp_student['email'], tmp_student['password'])
            user.first_name = tmp_student['first_name']
            user.last_name = tmp_student['last_name']
            user.is_staff = False
            user.is_superuser = False
            user.save()
            student = Student()
            student.id = str(user.id)
            student.promotion = int(tmp_student['promotion'])
            student.option = tmp_student['option']
            student.company = tmp_student['company']
            student.working_city = tmp_student['working_city']
            student.wage = tmp_student['wage']
            student.save()
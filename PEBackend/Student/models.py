from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
import os

class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

class Student(models.Model): 
    class Meta:
       managed = True
       db_table = 'student'
    id = models.CharField(max_length=30, primary_key=True)
    promotion = models.CharField(max_length=30)
    option = models.CharField(max_length=30)
    company = models.CharField(max_length=255)
    wage = models.CharField(max_length=20)
    working_city = models.CharField(max_length=100)
    linkedin_url = models.CharField(max_length=250)
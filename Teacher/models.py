from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
import os

class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

class Teacher(models.Model): 
    class Meta:
       managed = True
       db_table = 'teacher'
    id = models.CharField(max_length=30, primary_key=True)
    option = models.CharField(max_length=30)
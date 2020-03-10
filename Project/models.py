from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
import os

class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name):
        if self.exists(nom):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name

class Project(models.Model): 
    class Meta:
       managed = True
       db_table = 'project'
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    imageUrl = models.CharField(max_length=255)
    algorithmiaCount = models.IntegerField()
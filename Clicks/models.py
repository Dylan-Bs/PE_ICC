from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
import os

class Click(models.Model): 
    class Meta:
       managed = True
       db_table = 'click'
    imageId = models.IntegerField()
    top = models.IntegerField()
    left = models.IntegerField()
    userId = models.IntegerField()
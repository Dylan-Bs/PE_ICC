from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
import os

class Test(models.Model): 
    class Meta:
       managed = True
       db_table = 'Test'
    test_id = models.AutoField(primary_key = True)
    date = models.DateField()
    registrationTest = models.BooleanField()
    authenticationTest = models.BooleanField()
    verifyAuthenticationTest = models.BooleanField()
    projectTest_Get = models.BooleanField()
    projectTest_Post = models.BooleanField()
    clicksTest_Get = models.BooleanField()
    clicksTest_Post = models.BooleanField()
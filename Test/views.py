from django.shortcuts import render
from rest_framework.views import APIView
from Project.models import Project
from .models import Test as TestModel
from django.contrib.auth.models import User
from Clicks.models import Click
from urllib.request import Request
#import urlopen

class Test(APIView):
    def post(self, Request, *args, **kwargs):
        test = TestModel()
        ##url = ''
        ##if not (User.objects.get(username="test1@test.com")):
        ##r1 = Request.POST(url+'/register',data={'email': "test1@test.com", 'password': "123test1", 'color': "#f4002c"})
        ##json1 = urlopen(r1).read()
        ##if not (User.objects.get(username="test2@test.com")):
        ##r2 = Request.POST(url+'/register',data={'email': "test2@test.com", 'password': "123test2", 'color': "#0c00ff"})
        ##json2 = urlopen(r2).read()
        ##if not (Project.objects.get(name="test1")):
        ##r3 = Request.POST(url+'/project', data={'name': "test1", 'imageUrl': "/url/test1", 'algorithmiaCount': 12})
        ##json3 = urlopen(r3).read()
        ##if not (Project.objects.get(name="test2")):
        ##r4 = Request.POST(url+'/project', data={'name': "test2", 'imageUrl': "/url/test2", 'algorithmiaCount': 34})
        ##json4 = urlopen(r4).read()
        ##test1_id = Project.objects.get(name="test1")
        ##user1_id = User.objects.get(email="test1@test.com")
        ##user2_id = User.objects.get(email="test2@test.com")
        ##if not (Click.objects.get(imageId=test1_id, top=1,left=1)):
        ##r5 = Request.POST(url+'/clicks', data={'imageId': test1_id, 'Top': 1, 'Left': 1 , 'userId': user1_id})
        ##json5 = urlopen(r5).read()
        ##if not (Click.objects.get(imageId=test1_id, top=2,left=2)):
        ##r6 = Request.POST(url+'/clicks', data={'imageId': test1_id, 'Top': 2, 'Left': 2 , 'userId': user1_id})
        ##json6 = urlopen(r6).read()
        ##if not (Click.objects.get(imageId=test1_id, top=3,left=3)):
        ##r7 = Request.POST(url+'/clicks', data={'imageId': test1_id, 'Top': 3, 'Left': 3 , 'userId': user1_id})
        ##json7 = urlopen(r7).read()
        ##if not (Click.objects.get(imageId=test1_id, top=4,left=4)):
        ##r8 = Request.POST(url+'/clicks', data={'imageId': test1_id, 'Top': 4, 'Left': 4 , 'userId': user2_id})
        ##json8 = urlopen(r8).read()
        ##if not (Click.objects.get(imageId=test1_id, top=5,left=5)):
        ##r9 = Request.POST(url+'/clicks', data={'imageId': test1_id, 'Top': 5, 'Left': 5 , 'userId': user2_id})
        ##json9 = urlopen(r9).read()
from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'^register/', include('Register.urls'), name='register'),
    url(r'^authenticate/', include('Authenticate.urls'), name='authenticate'),
    url(r'^verify-authentication/', include('VerifyAuthentication.urls'), name='verifyAuthentication'),
    url(r'^students/', include('Students.urls'),name="students"),
    url(r'^student/', include('Student.urls'),name="student"),
    url(r'^test/', include('Test.urls'),name="test"),
]

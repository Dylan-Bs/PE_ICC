from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'^register/', include('Register.urls'), name='register'),
    url(r'^authenticate/', include('Authenticate.urls'), name='authenticate'),
    url(r'^verify-authentication/', include('VerifyAuthentication.urls'), name='verifyAuthentication'),
    url(r'^project/', include('Project.urls'),name="project"),
    url(r'^clicks/', include('Clicks.urls'),name="clicks"),
    url(r'^getproject/', include('GetProject.urls'),name="getproject"),
    url(r'^getclicks/', include('GetClicks.urls'),name="getclicks"),
    url(r'^test/', include('Test.urls'),name="test"),
]

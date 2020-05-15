from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'^register', include('Register.urls'), name='register'),
    url(r'^authenticate', include('Authenticate.urls'), name='authenticate'),
    url(r'^verify-authentication', include('VerifyAuthentication.urls'), name='verifyAuthentication'),
    url(r'^students', include('Students.urls'),name="students"),
    url(r'^student', include('Student.urls'),name="student"),
    url(r'^anonymize', include('Anonymize.urls'),name="anonymize"),
    url(r'^crawl', include('Crawl.urls'), name="crawl"),
    url(r'^user', include('User.urls'), name="user"),
    url(r'^users', include('Users.urls'), name="users")

]

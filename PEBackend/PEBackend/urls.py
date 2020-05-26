from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'^register', include('Register.urls'), name='register'),
    url(r'^authenticate', include('Authenticate.urls'), name='authenticate'),
    url(r'^students', include('Students.urls'),name="students"),
    url(r'^student', include('Student.urls'),name="student"),
    url(r'^teacher', include('Teacher.urls'),name="teacher"),
    url(r'^anonymize', include('Anonymize.urls'),name="anonymize"),
    url(r'^crawl', include('Crawl.urls'), name="crawl"),
    url(r'^user', include('User.urls'), name="user"),
    url(r'^users', include('Users.urls'), name="users"),
    url(r'^import', include('Import.urls'), name="import"),    
    url(r'^forgottenpassword', include('ForgottenPassword.urls'), name="forgottenpassword"),    
    url(r'^resetpassword', include('ResetPassword.urls'), name="resetpassword"),    
    url(r'^admin', admin.site.urls, name="admin")
]

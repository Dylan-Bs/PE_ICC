from django.conf.urls import include, re_path
from django.urls import path
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.views.generic.base import RedirectView


urlpatterns = [
    path('', RedirectView.as_view(url="https://app.swaggerhub.com/apis-docs/laurencetf/PEBackendICC/1.0.0#", permanent = False), name='documentation'),
    re_path(r'^register', include('Register.urls'), name='register'),
    re_path(r'^authenticate', include('Authenticate.urls'), name='authenticate'),
    re_path(r'^students', include('Students.urls'),name="students"),
    re_path(r'^student', include('Student.urls'),name="student"),
    re_path(r'^teacher', include('Teacher.urls'),name="teacher"),
    re_path(r'^anonymize', include('Anonymize.urls'),name="anonymize"),
    re_path(r'^crawl', include('Crawl.urls'), name="crawl"),
    re_path(r'^user', include('User.urls'), name="user"),
    re_path(r'^users', include('Users.urls'), name="users"),
    re_path(r'^import', include('Import.urls'), name="import"),    
    re_path(r'^forgottenpassword', include('ForgottenPassword.urls'), name="forgottenpassword"),    
    re_path(r'^resetpassword', include('ResetPassword.urls'), name="resetpassword"),    
    re_path(r'^admin', admin.site.urls, name="admin")
]

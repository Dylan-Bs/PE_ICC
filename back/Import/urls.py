from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    url(r'^$', views.Import.as_view(), name='import'),
]

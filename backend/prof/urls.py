
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/profiles/', views.userprofile),
    path("api/register/", views.register),
    path("api/login/", views.login),
]

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("api/my-profile/", views.my_profile_view),
    path("api/register/", views.register), 
    path("api/login/", views.user_login),
    path('logout/', views.logout_view, name='logout'),
    path('api/csrf/', views.get_csrf_token),
    path('api/educations/', views.education_list_create),
    path('api/educations/delete/', views.delete_education),
    path('api/experiences/', views.experience_list_create),
    path('api/experiences/delete/', views.delete_experience),
#     path('experiences/', views.experience_list_create),
#     path('projects/', views.project_list_create),
 ]
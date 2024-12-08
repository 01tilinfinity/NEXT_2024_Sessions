from .views import user_login, signup, logout_user
from django.contrib import admin
from django.urls import path
from authapp import views

urlpatterns = [
    path("login", views.user_login, name="user_login"),
    path("signup", views.signup, name="signup"),
    path("logout", views.logout_user, name="logout"),
]

from .views import home, new, detail, edit, delete, delete_comment
from django.contrib import admin
from django.urls import path
from blog import views

urlpatterns = [
    path("home/", home, name="home"),
    path("new/", new, name="new"),
    path("detail/<int:post_pk>", views.detail, name="detail"),
    path("edit/<int:post_pk>", views.edit, name="edit"),
    path("delete/<int:post_pk>", views.delete, name="delete"),
    path(
        "delete-comment/<int:post_pk>/<int:comment_pk>",
        views.delete_comment,
        name="delete_comment",
    ),
]

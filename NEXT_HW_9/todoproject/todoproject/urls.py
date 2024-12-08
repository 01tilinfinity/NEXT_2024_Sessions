"""
URL configuration for todoproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from todoapp import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home_1, name='home_1'),
    path('new_1/',views.new_1, name='new_1'),
    path('detail_1/<int:todo_pk>', views.detail_1, name='detail_1'),
    path('edit_1/<int:todo_pk>',views.edit_1, name='edit_1'),
    path('delete_1/<int:todo_pk>', views.delete_1, name='delete_1'),
]

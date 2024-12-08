from django.shortcuts import render, redirect
from .forms import UserCreationForm, LoginForm
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as django_login, get_user_model


# Create your views here.


get_user_model().objects.filter(username="admin").exists()

def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            django_login(request, user)
            return redirect("home")
        else:
            print(form.errors)
    else:
        form = UserCreationForm()

    return render(request, "signup.html", {"form": form})


def user_login(request): #그냥 login이라고 쓰면 장고의 기존 구현 함수랑 충돌해서 안됨
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                django_login(request, user)
                return redirect("home")
            else:
                form.add_error(None, "Invalid username or password")
    else:
        form = LoginForm()
    return render(request, "user_login.html", {"form": form})


def logout_user(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("home")
    else:
        return redirect("user_login.html")

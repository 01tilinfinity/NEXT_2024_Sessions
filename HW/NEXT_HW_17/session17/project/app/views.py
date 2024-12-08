from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import HttpRequest
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Comment, Post, Like
from django.shortcuts import get_object_or_404
import json
import json

from .models import Comment, Post, Like


def signup(request):
   if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      exist_user = User.objects.filter(username=username)
      if exist_user:
           error = "이미 존재하는 유저입니다."
           return render(request, 'registration/signup.html', {"error":error})
      
      new_user = User.objects.create_user(username=username, password=password)
      auth.login(request, new_user)
   
      return redirect('home')
       
   return render(request, 'registration/signup.html')

def login(request):
   if request.method == 'POST':
      username = request.POST['username']
      password = request.POST['password']
      user = auth.authenticate(username=username, password=password)
      if user is not None:
           auth.login(request, user)
           return redirect(request.GET.get('next', '/'))
      error = "아이디 또는 비밀번호가 틀립니다"
      return render(request, 'registration/login.html', {"error":error})
        
   return render(request, 'registration/login.html')

@login_required(login_url="/registration/login/")
def home(request):
    posts = Post.objects.all()
    liked_posts = Like.objects.filter(user=request.user).values_list('post_id', flat=True)
    return render(request, 'home.html', {'posts': posts, 'liked_posts': liked_posts})


def logout(request):
   auth.logout(request)
   return redirect('home')

@login_required(login_url="/registration/login/")
def new(request):
   if request.method == "POST":
       title = request.POST['title']
       content = request.POST['content']


       new_post = Post.objects.create(
           title=title,
           content=content,
           author=request.user
           )
       return redirect('detail', new_post.pk)
  
   return render(request, 'new.html')

@login_required(login_url="/registration/login/")
def detail(request, post_pk):
   post = Post.objects.get(pk=post_pk)

   if request.method == 'POST':
        content = request.POST['content']
        Comment.objects.create(

        )
        return redirect('detail', post_pk)

   return render(request, 'detail.html', {'post':post})


def edit(request, post_pk):
   post = Post.objects.get(pk=post_pk)


   if request.method == 'POST':
       title = request.POST['title']
       content = request.POST['content']
       Post.objects.filter(pk=post_pk).update(
           title=title,
           content=content
       )
       return redirect('detail', post_pk)


   return render(request, 'edit.html', {'post':post})


def delete(request, post_pk):
   post = Post.objects.get(pk=post_pk)
   post.delete()
   return redirect('home')


def delete_comment(request, post_pk, comment_pk):
   comment = Comment.objects.get(pk=comment_pk)
   comment.delete()
   return redirect('detail', post_pk)

from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Post, Like

@login_required(login_url="/registration/login/")
@csrf_exempt
def like(request):
    if request.method == "POST":
        post_pk = request.POST.get('post_pk')
        post = Post.objects.get(pk=post_pk)
        user = request.user
        existing_like = Like.objects.filter(post=post, user=user)
        if existing_like.exists():
            existing_like.delete()
            liked = False
        else:
            Like.objects.create(post=post, user=user)
            liked = True

        response = {
            'like_count': post.likes.count(),
            'liked': liked,
        }

        return JsonResponse(response)

    return JsonResponse({'error': 'Invalid request'}, status=400)

#axios는 fetchAPI에서 json을 만들고 parsing해야 했던 것을 자동으로 해주는 라이브러리 

@login_required(login_url="/registration/login/")
@csrf_exempt
def add_comment(request, post_pk):
    if request.method == 'POST':
        data = json.loads(request.body)
        content = data.get('content')
        post = get_object_or_404(Post, pk=post_pk)
        comment = Comment.objects.create(post=post, content=content, author=request.user)
        response = {
            'comment': comment.content,
            'author': comment.author.username,
            'post': post_pk,
            'id': comment.pk
        }
        return JsonResponse(response)
    return JsonResponse({'error': 'Invalid request'}, status=400)
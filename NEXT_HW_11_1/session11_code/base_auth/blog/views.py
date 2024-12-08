
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib import messages
from django.views.decorators.http import require_POST
from .models import Comment, Post
from django.contrib.auth.decorators import login_required
from .decorators import track_post_view
from authapp.permissions import check_is_creator_or_admin


def home(request):
    posts = Post.objects.all()

    return render(request, "home.html", {"posts": posts})


@login_required
def new(request):
    if request.method == "POST":
        title = request.POST["title"]
        content = request.POST["content"]

        new_post = Post.objects.create(
            title=title, content=content, creator=request.user
        )
        return redirect("detail", new_post.pk)

    return render(request, "new.html")

@login_required
@track_post_view
def detail(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)

    if request.method == "POST":
        content = request.POST["content"]
        Comment.objects.create(post=post, content=content, creator=request.user)
        return redirect("detail", post_pk=post_pk)

    return render(request, "detail.html", {"post": post})


@login_required
@check_is_creator_or_admin(Post, "post_pk") #main business logic이 실행되기 전에 user를 검증하는 decorator
def edit(request, post_pk):
    post = Post.objects.get(pk=post_pk)

    if request.method == "POST":
        title = request.POST["title"]
        content = request.POST["content"]
        Post.objects.filter(pk=post_pk).update(title=title, content=content)
        return redirect("detail", post_pk)

    return render(request, "edit.html", {"post": post})


@login_required
@check_is_creator_or_admin(Post, "post_pk")
def delete(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    return redirect("home")


@login_required
@check_is_creator_or_admin(Comment, "comment_pk")
def delete_comment(request, post_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    comment.delete()
    return redirect("detail", post_pk)
    

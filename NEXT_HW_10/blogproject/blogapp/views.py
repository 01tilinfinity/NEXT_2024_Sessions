from django.shortcuts import render, redirect
from .models import Article,Comment
from datetime import datetime
from django.utils import timezone

# Create your views here.
def new(request):
    if request.method == 'POST':
        print(request.POST)
    
        new_article = Article.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            created_at = datetime.now(),
            category = request.POST['category']
        )
        
        return redirect('list')
    category_list = ['hobby','food','programming']
    
    return render(request, 'new.html', {'category_list':category_list})

def list(request):
    total_article = Article.objects.all()
    
    hobbies = Article.objects.filter(category='hobby')
    foods = Article.objects.filter(category='food')
    programmings = Article.objects.filter(category='programming')
    
    total_post_count = total_article.count()
    hp = hobbies.count() 
    fp = foods.count() 
    pc = programmings.count()
    
    return render(request, 'list.html', {'total_article':total_article, 'total_post_count':total_post_count, 'hp':hp, 'fp':fp, 'pc':pc})
    
def detail(request, article_id):
    article = Article.objects.get(pk=article_id)
    if request.method == 'POST':
        comment_body = request.POST['comments']
        parent_comment_id = request.POST.get('parent_comment_id')  
        
        if parent_comment_id:
            parent_comment = Comment.objects.get(pk=parent_comment_id)
            reply = Comment(article=article, parent_comment=parent_comment, comment_body=comment_body, comment_datetime=timezone.now())
            reply.save()
        else:
            new_comment = Comment(article=article, comment_body=comment_body, comment_datetime=timezone.now())
            new_comment.save()
        
        return redirect('detail', article_id=article_id)
    
    return render(request, 'detail.html', {'article': article}) 


def category(request, category_name):
    articles = Article.objects.filter(category=category_name)
    post_count = articles.count()
    return render(request, 'category.html', {'articles': articles, 'category_name': category_name, 'post_count': post_count} ) 
from django.shortcuts import render,redirect 
from .models import Todo

# Create your views here.
def home_1(request):
    todos = Todo.objects.all().order_by('dday')
    
    return render(request, 'home_1.html', {'todos': todos})


def new_1(request):
    if request.method == 'POST':
        new_todo = Todo.objects.create(
            title = request.POST['title'],
            description = request.POST['description'],
            dday = request.POST['dday']
        )
        
        return redirect('detail_1',new_todo.pk)
    
    return render(request, 'new_1.html')

def detail_1(request, todo_pk):
    todo = Todo.objects.get(pk=todo_pk) 
    
    return render(request, 'detail_1.html', {'todo':todo})

def edit_1(request, todo_pk):
    todo = Todo.objects.get(pk=todo_pk)
    
    if request.method == 'POST':
        Todo.objects.filter(pk=todo_pk).update(
            title = request.POST['title'],
            description = request.POST['description'],
            dday = request.POST['dday']
        )
        return redirect('detail_1', todo_pk) 
    
    return render(request, 'edit_1.html', {'todo':todo})

def delete_1(request, todo_pk):
    todo = Todo.objects.get(pk=todo_pk) 
    todo.delete() 
    
    return redirect('home_1')
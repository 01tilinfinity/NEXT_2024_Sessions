from django.shortcuts import render

# Create your views here.
def info(request):
    return render(request, 'info.html')

def project(request):
    return render(request, 'project.html')

def aboutme(request):
    return render(request, 'aboutme.html')

def contact(request):
    return render(request,'contact.html')
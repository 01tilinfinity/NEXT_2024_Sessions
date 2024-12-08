from django.shortcuts import render

# Create your views here.
def counting(request):
    return render(request, 'counting.html')

def result(request):
    text = request.POST['text']
    total_len = len(text) 
    words_len = len(text.split(' '))
    nospace_len = len(text.replace(' ',''))
    return render(request, 'result.html',{'total_len':total_len, 'words_len':words_len, 'nospace_len':nospace_len,})
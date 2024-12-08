from django import forms
from .models import Todo

class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ['title', 'description', 'dday', 'completed']
        widgets = {
            'completed': forms.CheckboxInput(attrs={'class': 'checkbox'}),
        }

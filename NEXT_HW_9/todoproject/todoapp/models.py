from django.db import models
from django.utils import timezone

class Todo(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField() 
    dday = models.DateTimeField()
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['dday']

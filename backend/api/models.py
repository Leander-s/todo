from django.db import models

# Create your models here.


class TodoItem(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default="open")

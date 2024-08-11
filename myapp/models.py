from django.db import models

class Certification(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

class Contact(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=10)
    feedback = models.TextField(max_length=50)
    date = models.DateField()

def __str__(self):
    return f"{self.name} - {self.date.strftime('%d-%m-%Y')}"

# yashraj
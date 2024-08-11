from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from datetime import datetime
from myapp.models import Contact
# username - admin
# password - admin123

# Create your views here.
def index(request):
    return render(request,'index.html')
  

def about(request):
    return render(request,'about.html')
    # return HttpResponse("This about page")

def contact(request):
    # return HttpResponse("This is Contact")

    if request.method == "POST":
            name = request.POST.get('name'),
            email = request.POST.get('email'),
            phone = request.POST.get('phone'),
            feedback = request.POST.get('feedback'),
            contact = Contact(name = name, email=email,phone=phone,feedback=feedback,date=datetime.today())
            contact.save()
            # messages.success(request, "Message has been sent successfully")

    return render(request,'contact.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        pass1 = request.POST.get('pass')
        user = authenticate(request, username=username, password=pass1)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return HttpResponse("Invalid Credentials")
        
    return render(request, 'login.html')

def signup(request):
    if request.method == 'POST':
        uname = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')
        if pass1!=pass2:
            return HttpResponse("Use same password")
        else:
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
        return redirect('login')

    return render(request,'signup.html')

def logoutpage(request):
    logout(request)
    return redirect('login')

def certifications(request):
    return render(request,'certifications.html')

def html_test(request):
    return render(request,'html_test.html')  

def python(request):
    return render(request,'python.html')  

# programming
def programming(request):
    return render(request,'programming.html')

def c_test(request):
    return render(request,'c_test.html')

def sports(request):
    return render(request,'sports.html')

def project(request):
    return render(request,'project.html')

# certification
from rest_framework import generics
from .models import Certification
from .serializers import CertificationSerializer

class CertificationList(generics.ListCreateAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class CertificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
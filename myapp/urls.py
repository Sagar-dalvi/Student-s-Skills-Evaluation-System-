from django.contrib import admin
from django.urls import path
from myapp import views
from django.urls import path
from .views import CertificationList, CertificationDetail


urlpatterns = [
    path('',views.signup,name='signup'), #yash
    path('login/',views.login,name='login'), #yash
    path('about',views.about,name='about'), #yash
    path('home/',views.index,name='home'), #yash
    path('home/',views.index,name='home'), #yash
    path('contact',views.contact,name='contact'),
    path('logout',views.logoutpage,name='logout'), #yash
    path('html_test',views.html_test,name='html_test'),
    path('python',views.python,name='python'),
    path('certifications',views.certifications,name='certifications'),
    path('programming',views.programming,name='programming'),
    path('c_testx',views.c_test,name='c_test'),
    path('sports',views.sports,name='sports'),
    path('project',views.project,name='project'),
    path('certifications/', CertificationList.as_view(), name='certification-list'),
    path('certifications/<int:pk>/', CertificationDetail.as_view(), name='certification-detail')

]

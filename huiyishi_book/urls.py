# -*- coding: utf-8 -*-
# @Time    : 18-11-27 下午6:12
# @Author  : Felix Wang

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),  # 登录
    path('logout/', views.logout, name='logout'),  # 登录
    path('login_for_model/', views.login_for_model, name='login_for_model'),  # 登录
    path('register/', views.register, name='register'),  # 注册
    path('book/',views.book,name='book'),
    path('un_book/',views.un_book,name='un_book'),
]


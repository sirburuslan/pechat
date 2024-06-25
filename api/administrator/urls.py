"""
@model Messages

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-04-09

This file contains classes which represents the db tables for messages, threads and guests
"""

# System Utils
from django.urls import path

# App Utils
from administrator.views import CreateUserView, UpdateUserView, UpdateUserPasswordView, UsersListView, UserInfoView, DeleteUserView

# Namespace for the administrator app
app_name = 'administrator'

urlpatterns = [
    path('users/create', CreateUserView.as_view(), name='create_user'),
    path('users/list', UsersListView.as_view(), name='list_users'),
    path('users/<int:pk>/update', UpdateUserView.as_view(), name='update_user'),
    path('users/<int:pk>/update-password', UpdateUserPasswordView.as_view(), name='update_user_password'),
    path('users/<int:pk>/info', UserInfoView.as_view(), name='user_info'),
    path('users/<int:pk>/delete', DeleteUserView.as_view(), name='delete_user'),
]
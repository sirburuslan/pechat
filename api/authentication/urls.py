"""
@module Urls

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-04-29

This file contains urls manager for the auth section
"""

# System Utils
from django.urls import path

# App Utils
from authentication.views.registration_view import CreateAccountView
from authentication.views.signin_view import SignInAccountView

# Namespace for the auth app
app_name = 'authentication'

urlpatterns = [
    path('registration', CreateAccountView.as_view(), name='registration'),
    path('signin', SignInAccountView.as_view(), name='signin')
]
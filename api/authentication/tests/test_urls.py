"""
@file Test Urls

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-04

This file contains functions to test the urls in the authentication app
"""

# System Utils
from django.urls import reverse, resolve

# App Utils
from authentication.views.registration_view import CreateAccountView

def test_registration_url_resolves():
    """
    This function tests the
    urls in authentication.urls.py
    """
    path = reverse('authentication:registration')
    assert resolve(path).func.view_class == CreateAccountView

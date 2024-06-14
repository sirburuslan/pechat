"""
@module Urls

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-19

This file contains urls manager for the member settings
"""

# System Utils
from django.urls import path

# App Utils
from member.views import MemberUpdateView, MemberReadView

# Namespace for the auth app
app_name = 'member'

# Urls rules
urlpatterns = [
    path('update', MemberUpdateView.as_view(), name='update'),
    path('settings', MemberReadView.as_view(), name='settings')
]
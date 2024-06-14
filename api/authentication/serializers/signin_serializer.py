"""
@serializer SignIn

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-05

This file contains the class used to validate the user data
"""

# System Utils
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

# Installed Utils
from rest_framework import serializers

# Get the user model reference
User = get_user_model()

class SignInAccountSerializer(serializers.ModelSerializer):
    """
    The goal of this class is to validate
    the data received
    """
    email = serializers.EmailField()
    password = serializers.CharField(max_length=20, write_only=True)

    class Meta:
        """
        Serializer meta data
        """
        model = User
        fields = ['email', 'password']
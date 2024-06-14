"""
@serializer Registration

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-01

This file contains the class used to validate the user data and create account
"""

# System Utils
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

# Installed Utils
from rest_framework import serializers

# App Utils
from authentication.models import CustomUser

# Get the user model reference
User = get_user_model()

class CreateAccountSerializer(serializers.ModelSerializer):
    """
    The goal of this class is to validate
    the data received from view and create
    new account
    """

    # Default role
    role = serializers.IntegerField(default=1)

    class Meta:
        """
        Serializer meta data
        """
        model = User
        fields = ['email', 'password', 'role']

        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }

    def validate_email(self, email):

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(_('This email address is already registered.'))
        
        if not email.strip():
            raise serializers.ValidationError(_('Email address cannot be blank.'))
        
        import re
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise serializers.ValidationError(_('Enter a valid email address.'))

        return email
    
    def validate_password(self, password):

        min_length = 8
        max_length = 20

        if len(password) < min_length or len(password) > max_length:
            raise serializers.ValidationError(_('The password must be between 8 and 20 characters long.'))

        if ' ' in password:
            raise serializers.ValidationError(_('The password cannot contain spaces.'))

        return password
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
"""
@file Serializers

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-06-25

This file contains classes for serialization in the administrator area
"""

# System Utils
from django.utils.translation import gettext_lazy as _

# Installed Utils
from rest_framework import serializers

# App Utils
from authentication.models import CustomUser

class CreateUserSerializer(serializers.ModelSerializer):
    """
    The goal of this class is to validate
    the user data received
    """
    first_name = serializers.CharField(max_length=200, write_only=True)
    last_name = serializers.CharField(max_length=200, write_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=20, write_only=True)
    role = serializers.IntegerField(default=1)

    class Meta:
        """
        Serializer meta data
        """
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password', 'role']

        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }

    def validate_first_name(self, first_name):
        return first_name
    
    def validate_last_name(self, last_name):
        return last_name

    def validate_email(self, email):

        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(_('This email address is already registered.'))
        
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
    
class UpdateUserSerializer(serializers.ModelSerializer):
    """
    The goal of this class
    is to validate the user's data
    """
    first_name = serializers.CharField(max_length=200, write_only=True)
    last_name = serializers.CharField(max_length=200, write_only=True)
    ROLE_CHOICES = (
        (0, 'Administrator'),
        (1, 'User'),
    )
    role = serializers.ChoiceField(choices=ROLE_CHOICES)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'role']

    def validate_first_name(self, value):
        """
        Validate the first name to ensure it meets criteria.
        """
        if not value.isalpha():
            raise serializers.ValidationError("First name should only contain alphabetic characters.")
        return value

    def validate_last_name(self, value):
        """
        Validate the last name to ensure it meets criteria.
        """
        if not value.isalpha():
            raise serializers.ValidationError("Last name should only contain alphabetic characters.")
        return value

    def validate_role(self, value):
        """
        Validate the role to ensure it's within the accepted choices.
        """
        if value not in [choice[0] for choice in self.ROLE_CHOICES]:
            raise serializers.ValidationError("Invalid role choice.")
        return value
    
class UpdateUserPasswordSerializer(serializers.ModelSerializer):
    """
    The goal of this class
    is to validate the user's password
    """
    password = serializers.CharField(min_length=8, max_length=20, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['password']

    def validate_password(self, password):

        min_length = 8
        max_length = 20

        if len(password) < min_length or len(password) > max_length:
            raise serializers.ValidationError(_('The password must be between 8 and 20 characters long.'))

        if ' ' in password:
            raise serializers.ValidationError(_('The password cannot contain spaces.'))

        return password
    
    def update(self, instance, validated_data):
        """
        The password is hashed before saving to the database.
        """
        password = validated_data.get('password')
        instance.set_password(password)
        instance.save()
        return instance

class UsersListSerializer(serializers.ModelSerializer):
    """
    The goal of this class is to
    specify the user fields for lists
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined']
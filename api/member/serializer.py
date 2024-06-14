"""
@serializer Member

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-21

This file contains the class used to validate the user data
"""

# System Utils
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

# Installed Utils
from rest_framework import serializers

# Get the user model reference
User = get_user_model()

class MemberSerializer(serializers.Serializer):
    """
    The goal of this class is to validate
    the data received
    """
    sidebar = serializers.IntegerField(required=False, default=0)

    class Meta:
        """
        Serializer meta data
        """
        model = User
        fields = ['sidebar']

    def validate_sidebar(self, value):
        """
        Validate sidebar field.
        """
        if value not in [0, 1]:
            raise serializers.ValidationError("Sidebar value must be either 0 or 1.")
        return value
"""
@view Registration

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-05

This file contains the class used for registration
"""

# System Utils
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.translation import gettext_lazy as _

# Installed Utils
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

# App Utils
from authentication.serializers.registration_serializer import CreateAccountSerializer
from authentication.models import CustomUser
from shared_utils.decorators import require_POST

# Create Account
@method_decorator(require_POST, name='dispatch')
class CreateAccountView(CreateAPIView):
    """
    The goal of this class is to register
    the members. It uses Django Rest Framework
    """

    # Serializer class used for registration
    serializer_class = CreateAccountSerializer

    # Use custom user model
    queryset = None

    # Allow public access
    permission_classes = [AllowAny]

    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def create(self, request, *args, **kwargs):

        # Get information about serialization
        serializer = self.get_serializer(data=request.data)

        # Check if the received data is correct
        if not serializer.is_valid():

            # Default error message
            errorMsg: str = _('An error has occurred.')

            # Check if the error is for email
            if ( serializer.errors.get('email') != None ):
                errorMsg = serializer.errors['email'][0].capitalize()
            elif ( serializer.errors.get('password') != None ):
                errorMsg = serializer.errors['password'][0].capitalize()

            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": errorMsg
                },
                status=status.HTTP_200_OK
            )

        # Try to create the user
        try:
            serializer.save()
        except Exception as e:
            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": format(str(e))
                },
                status=status.HTTP_200_OK
            )             

        # Return custom message
        return Response(
            {
                "success": True,
                "message": _('The account was created successfully.')
            },
            status=status.HTTP_201_CREATED
        )
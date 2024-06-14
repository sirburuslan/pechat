"""
@view Registration

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-01

This file contains the class used for registration
"""

# System Utils
from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate

# Installed Utils
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django_ratelimit.decorators import ratelimit

# App Utils
from authentication.serializers.signin_serializer import SignInAccountSerializer
from shared_utils.decorators import require_POST

@method_decorator(require_POST, name='dispatch')
class SignInAccountView(APIView):
    """
    The goal of this class is to signin
    the members. It uses Django Rest Framework
    """

    # Serializer class used for signin
    serializer_class = SignInAccountSerializer

    # Query set is none by default
    queryset = None

    # Allow public access
    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key='ip', rate='5/m', block=True))
    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Process the POST
        Request
        """
        
        # Get information about serialization
        serializer = SignInAccountSerializer(data=request.data)

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

        # Get email
        email = serializer.validated_data.get('email')

        # Get password
        password = serializer.validated_data.get('password')

        # Lets login
        user = authenticate(email=email, password=password)

        # Check if login is successfully
        if user:
            # Delete existing token if it exists
            Token.objects.filter(user=user).delete()

            # Create a new token
            token = Token.objects.create(user=user)

            # Return custom message
            return Response(
                {
                    "success": True,
                    "message": _('You have successfully signed in.'),
                    "user": {
                        "user_id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "email": user.email,
                        "role": user.role,
                        "token": token.key
                    }
                },
                status=status.HTTP_201_CREATED
            )

        else:

            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": _('The email or password is not correct.')
                },
                status=status.HTTP_200_OK
            )
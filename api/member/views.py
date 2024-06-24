# System Utils
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _

# Installed Utils
from rest_framework import status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

# App Utils
from authentication.models import CustomUser
from shared_utils.decorators import require_PUT, require_POST
from shared_utils.logs import logger
from .serializer import MemberSerializer

@method_decorator(require_PUT, name='dispatch')
class MemberUpdateView(generics.RetrieveAPIView, generics.UpdateAPIView):
    """
    The goal of this class is to update
    the member options
    """

    # Serilizer class used for user update
    serializer_class = MemberSerializer

    # Use custom user model
    queryset = None

    # Allow public access
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAuthenticated]

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def put(self, request, *args, **kwargs):
        try:

            # Get user from from authorization
            user = request.user
            
            # Get information about serialization
            serializer = MemberSerializer(data=request.data)

            # Check if the received data is correct
            if not serializer.is_valid():

                # Default error message
                errorMsg = _('An unknown error has occurred.')
                
                # Check if the request data has sidebar field
                if 'sidebar' in request.data:

                    # Check if the error is for sidebar
                    if ( serializer.errors.get('sidebar') != None ):
                        errorMsg = serializer.errors['sidebar'][0].capitalize()

                # Custom Response
                return Response(
                    {
                        "success": False,
                        "message": errorMsg
                    },
                    status=status.HTTP_200_OK
                )
            
            else:
                
                # Check if the request data has sidebar field
                if 'sidebar' in request.data:
                    user.sidebar = request.data['sidebar']

                # Save the changes
                user.save()

            # Custom Response
            return Response(
                {
                    "success": True,
                    "message": _('Changes have been saved successfully.')
                },
                status=status.HTTP_200_OK
            )     
            
        except CustomUser.DoesNotExist:

            # Save the error
            logger.error('Error: ' + _('Member was not found.'))

            # Custom Response
            return Response(
                {
                    "success": False,
                    "message": _('Member was not found.')
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:

            # Save the error
            logger.error(f"Error: {e}")

@method_decorator(require_POST, name='dispatch')
class MemberReadView(APIView):
    """
    The goal of this class is to get
    the member options
    """
    # Use custom user model
    queryset = None
    # Allow public access
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):

        try:

            # Get user from from authorization
            user = request.user

            # Get the user data
            user_data = CustomUser.objects.get(pk=user.pk)

            # Custom Response
            return Response(
                {
                    "success": True,
                    "content": {
                        "userId": user_data.pk,
                        "firstName": user_data.first_name,
                        "last_name": user_data.last_name,
                        "role": user_data.role,
                        "email": user_data.email,
                        "sidebar": user_data.sidebar
                    }
                },
                status=status.HTTP_200_OK
            )            
            
        except CustomUser.DoesNotExist:

            # Custom Response
            return Response(
                {
                    "success": False,
                    "message": _('Member was not found.')
                },
                status=status.HTTP_200_OK
            )
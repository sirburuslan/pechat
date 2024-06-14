"""
@file Views

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-06-13

This file contains classes for handling and generating responses for the administrator area
"""

# Installed Utils
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters

# Installed Utils
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.response import Response

# App Utils
from administrator.filters import UsersFilter
from administrator.serializers import CreateUserSerializer, UsersListSerializer
from authentication.models import CustomUser
from shared_utils.decorators import require_POST, require_DELETE
from shared_utils.pagination import DefaultPagination
from shared_utils.permissions import IsAdministrator
from shared_utils.serializers import ListQuerySerializer

@method_decorator(require_POST, name='dispatch')
class CreateUserView(CreateAPIView):
    """
    This class creates a new user
    from the administrator panel
    """

    # Serializer class used for user creation
    serializer_class = CreateUserSerializer

    # Queryset is none
    queryset = None

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def create(self, request):

        # Get information about serialization
        serializer = self.get_serializer(data=request.data)

        # Check if the received data is correct
        if not serializer.is_valid():

            # Default error message
            errorMsg: str = _('An error has occurred.')

            # Check if the error is for name, email or password
            if ( serializer.errors.get('first_name') != None ):
                errorMsg = serializer.errors['first_name'][0].capitalize()
            elif ( serializer.errors.get('last_name') != None ):
                errorMsg = serializer.errors['last_name'][0].capitalize()
            elif ( serializer.errors.get('email') != None ):
                errorMsg = serializer.errors['email'][0].capitalize()
            elif ( serializer.errors.get('password') != None ):
                errorMsg = serializer.errors['password'][0].capitalize()

            # Return error message
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
            # Return error message
            return Response(
                {
                    "success": False,
                    "message": format(str(e))
                },
                status=status.HTTP_200_OK
            )             

        # Return success message
        return Response(
            {
                "success": True,
                "message": _('The user was created successfully.')
            },
            status=status.HTTP_201_CREATED
        )
    

class UsersListView(ListAPIView):
    """
    This class gets users
    from the database
    """
    queryset = CustomUser.objects.all()
    serializer_class = UsersListSerializer
    pagination_class = DefaultPagination
    filter_backends = [UsersFilter]
    search_fields = ['email', 'first_name', 'last_name']

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    def list(self, request, *args, **kwargs):

        # Get the list serializer
        list_serializer = ListQuerySerializer(data=request.GET)

        # Check if get data contains valid parameters
        if list_serializer.is_valid():
            
            # Get Page number
            page = list_serializer.validated_data['page']
        
            # Apply the filters
            queryset = self.filter_queryset(self.get_queryset())

            # Oder responses
            queryset = queryset.order_by('-id')
            
            # Get results
            results = self.paginate_queryset(queryset)
            
            # Check if results exists
            if results is not None:
                
                # Get serialized data
                serializer = self.get_serializer(results, many=True)

                # Return success message
                return Response(
                    {
                        "items": serializer.data,
                        "total": queryset.count(),
                        "page": page
                    },
                    status=status.HTTP_200_OK
                ) 

        # Return error message
        return Response(
            {
                "success": False,
                "message": _('No users were found.')
            },
            status=status.HTTP_200_OK
        ) 

@method_decorator(require_DELETE, name='dispatch')
class DeleteUserView(DestroyAPIView):
    """
    This class is used to delete 
    users from the administrator panel
    """

    # Serializer to sanitize the get parameters
    serializer_class = None

    # Query set is none
    queryset = CustomUser.objects.all()

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def delete(self, request, *args, **kwargs):
        
        # Get the user id
        pk = kwargs.get('pk')

        if ( pk == request.user.pk ):
            # Return error message
            return Response(
                {
                    "success": False,
                    "message": _('The administrator cannot delete its account.')
                },
                status=status.HTTP_200_OK
            )

        try:

            # Get the user
            userObj = CustomUser.objects.get(pk=pk)

            # Delete
            userObj.delete()
            
            # Return success message
            return Response(
                {
                    "success": True,
                    "message": _('The members was deleted successfully.')
                },
                status=status.HTTP_200_OK
            )

        except CustomUser.DoesNotExist:

            # Return error message
            return Response(
                {
                    "success": False,
                    "message": _('The member was not found.')
                },
                status=status.HTTP_200_OK
            )
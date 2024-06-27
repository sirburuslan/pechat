"""
@file Views

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-06-13

This file contains classes for handling and generating responses for the administrator area
"""

# Installed Utils
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters

# Installed Utils
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.response import Response

# App Utils
from administrator.filters import UsersFilter
from administrator.serializers import CreateUserSerializer, UpdateUserSerializer, UpdateUserImageSerializer, UpdateUserPasswordSerializer, UsersListSerializer
from authentication.models import CustomUser
from shared_utils.decorators import require_POST, require_PUT, require_DELETE
from shared_utils.pagination import DefaultPagination
from shared_utils.permissions import IsAdministrator
from shared_utils.serializers import ListQuerySerializer
from shared_utils.services import Imgur

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
    
@method_decorator(require_PUT, name='dispatch')
class UpdateUserView(UpdateAPIView):
    """
    This class updates a user
    from the administrator panel
    """

    # Serializer class used for user update
    serializer_class = UpdateUserSerializer

    # Queryset is none
    queryset = CustomUser.objects.all()

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs) -> None:
        return super().dispatch(*args, **kwargs)

    def put(self, request, *args, **kwargs) -> None:

        # Get the user id
        pk: int = kwargs.get('pk')

        # Get the user
        userObj = CustomUser.objects.get(pk=pk)

        # Serialize data
        serializer = self.get_serializer(data=request.data, instance=userObj)

        # Check if data is valid
        if not serializer.is_valid():
            
            # Default error message
            error_msg: str = _('An error has occurred.')

            # Check if the error is related to a field's value
            if 'first_name' in serializer.errors:
                error_msg = serializer.errors['first_name'][0].capitalize()
            elif 'last_name' in serializer.errors:
                error_msg = serializer.errors['last_name'][0].capitalize()
            elif 'role' in serializer.errors:
                error_msg = _('Role: ') + serializer.errors['role'][0].capitalize()

            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": error_msg
                },
                status=status.HTTP_200_OK
            )

        try:
            serializer.save()
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": str(e)
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": True,
                "message": _('The member was updated successfully.')
            },
            status=status.HTTP_200_OK
        )
    
@method_decorator(require_PUT, name='dispatch')
class UpdateUserImageView(UpdateAPIView):
    """
    This class updates a user image
    from the administrator panel
    """

    # Serializer class used for user image update
    serializer_class = UpdateUserImageSerializer

    # Queryset is none
    queryset = CustomUser.objects.all()

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def put(self, request, *args, **kwargs):

        image = request.FILES.get('image')
        print(image)

        return Response(
            {
                "success": True,
                "message": _('The image was saved successfully.')
            },
            status=status.HTTP_200_OK
        )

        # Get the user id
        pk = kwargs.get('pk')

        # Get the user
        userObj = CustomUser.objects.get(pk=pk)

        # Serialize data
        serializer = self.get_serializer(data=request.data, instance=userObj)

        # Check if data is valid
        if not serializer.is_valid():
            
            # Default error message
            error_msg = _('An error has occurred.')

            # Check if the error is related to a field's value
            if 'image' in serializer.errors:
                error_msg = serializer.errors['image'][0].capitalize()

            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": error_msg
                },
                status=status.HTTP_200_OK
            )

        try:
            serializer.save()
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": str(e)
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": True,
                "message": _('The image was saved successfully.')
            },
            status=status.HTTP_200_OK
        )
    
@method_decorator(require_PUT, name='dispatch')
class UpdateUserPasswordView(UpdateAPIView):
    """
    This class updates a user password
    from the administrator panel
    """

    # Serializer class used for user password update
    serializer_class = UpdateUserPasswordSerializer

    # Queryset is none
    queryset = CustomUser.objects.all()

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    @method_decorator(sensitive_post_parameters())
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def put(self, request, *args, **kwargs):

        # Get the user id
        pk = kwargs.get('pk')

        # Get the user
        userObj = CustomUser.objects.get(pk=pk)

        # Serialize data
        serializer = self.get_serializer(data=request.data, instance=userObj)

        # Check if data is valid
        if not serializer.is_valid():
            
            # Default error message
            error_msg = _('An error has occurred.')

            # Check if the error is related to a field's value
            if 'password' in serializer.errors:
                error_msg = serializer.errors['password'][0].capitalize()

            # Return custom message
            return Response(
                {
                    "success": False,
                    "message": error_msg
                },
                status=status.HTTP_200_OK
            )

        try:
            serializer.save()
        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": str(e)
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "success": True,
                "message": _('The password was saved successfully.')
            },
            status=status.HTTP_200_OK
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

class UserInfoView(RetrieveAPIView):
    """
    This class get user's info
    """
    # Serializer to sanitize the get parameters
    serializer_class = None

    # Query set is none
    queryset = CustomUser.objects.all()

    # Access Only With Tokken
    authentication_classes = [TokenAuthentication]

    # Permission classes
    permission_classes = [IsAdministrator]

    def get(self, request, *args, **kwargs):

        # Get the user id
        pk = kwargs.get('pk')

        try:

            # Get the user data
            user_data = CustomUser.objects.get(pk=pk)
            
            # Return success message
            return Response(
                {
                    "success": True,
                    "content": {
                        "userId": user_data.pk,
                        "first_name": user_data.first_name,
                        "last_name": user_data.last_name,
                        "role": user_data.role,
                        "email": user_data.email,
                        "image": user_data.image
                    }
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
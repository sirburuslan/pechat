# System Utils
from django.http import HttpResponse
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

# Installed Utils
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

# App Utils
from authentication.models import CustomUser

class CreateUserViewTest(APITestCase):
    """
    This class is used to test
    the user creation process
    """

    def setUp(self) -> None:

        # Api Client to simulate http requests
        self.client = APIClient()

        # Create an admin user
        self.admin_user = CustomUser.objects.create_user(
            email='testadmin@example.com', password='adminpassword', is_staff=True
        )

        # Create the admin token
        self.admin_token = Token.objects.create(user=self.admin_user)

        # Define the URL for the CreateUserView
        self.url = reverse('administrator:create_user')

        # Set the administrator token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)        

    def test_create_valid_user(self) -> None:

        # Prepare user's data
        data: dict[str, str] = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'existinguser@example.com',
            'password': 'newpassword'
        }
        
        # Send post request to create the user
        response: HttpResponse = self.client.post(self.url, data)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check for success response
        self.assertTrue(response.data['success'])

        # Verify if there are 2 users
        self.assertEqual(CustomUser.objects.count(), 2)

        # Get the last user data
        second_user: CustomUser = CustomUser.objects.last()

        # Check if email is equal 
        self.assertEqual(second_user.email, 'existinguser@example.com')

    def test_create_user_with_blank_spaces_email(self) -> None:

        # Prepare the user's data
        data: dict[str, str] = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'ww wuhuw@example.com',
            'password': 'newpassword'
        }
        
        # Send post request to create the user
        response: HttpResponse = self.client.post(self.url, data)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check for success response
        self.assertFalse(response.data['success'])

        # Verify if the returned message is correct
        self.assertEqual(response.data['message'], 'Enter a valid email address.')

    def test_create_user_with_existing_email(self):

        # Create a user
        CustomUser.objects.create_user(
            first_name='Existing',
            last_name='User',
            email='existinguser@example.com',
            password='password'
        )

        # Data for second user with same email
        data: dict[str, str] = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'existinguser@example.com',
            'password': 'newpassword'
        }
        
        # Send post request to create the user
        response: HttpResponse = self.client.post(self.url, data)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check for success response
        self.assertFalse(response.data['success'])

        # Verify if the returned message is correct
        self.assertEqual(response.data['message'], 'This email address is already registered.')

    def test_create_user_with_incorrect_length_password(self):

        # Prepare the user's data
        data: dict[str, str] = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'email@example.com',
            'password': 'new'
        }
        
        # Send post request to create the user
        response: HttpResponse = self.client.post(self.url, data)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check for success response
        self.assertFalse(response.data['success'])

        # Verify if the returned message is correct
        self.assertEqual(response.data['message'], 'The password must be between 8 and 20 characters long.')

    def test_create_user_with_blank_spaces_password(self):

        # Prepare the user's data
        data: dict[str, str] = {
            'first_name': 'New',
            'last_name': 'User',
            'email': 'email@example.com',
            'password': 'new password'
        }
        
        # Send post request to create the user
        response: HttpResponse = self.client.post(self.url, data)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check for success response
        self.assertFalse(response.data['success'])

        # Verify if the returned message is correct
        self.assertEqual(response.data['message'], 'The password cannot contain spaces.')


class UserListViewTest(APITestCase):
    """
    This class is used to test the users 
    reading for the administrator panel
    """

    @classmethod
    def setUpTestData(cls) -> None:

        # Create the users for testing
        cls.user1 = CustomUser.objects.create_user(
            email='email1@example.com', password='password'
        )
        cls.user2 = CustomUser.objects.create_user(
            email='email2@example.com', password='password'
        )

    def setUp(self) -> None:

        # Api Client to simulate http requests
        self.client = APIClient()

        # Create the administrator for data access
        self.admin_user = CustomUser.objects.create_user(
            email='admin@example.com', password='password', is_staff=True
        )

        # Set the administrator token
        self.admin_token = Token.objects.create(user=self.admin_user)

        # Define the URL for the CreateUserView
        self.url = reverse('administrator:list_users')

        # Set the administrator token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)        

    def test_get_users_list(self):

        # Get the users by page
        response = self.client.get(self.url, {'page': 1})

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if were created 3 members
        self.assertEqual(response.data['total'], 3)

        # Get all users
        user_data = response.data['items'][0]

        # And verify if the users have the required fields in the serializer
        self.assertIn('id', user_data)
        self.assertIn('first_name', user_data)
        self.assertIn('last_name', user_data)
        self.assertIn('email', user_data)
        self.assertIn('date_joined', user_data)

    def test_get_users_list_by_email(self):

        # Get the users by page
        response = self.client.get(self.url, {'page': 1, 'search': 'email2@example.com'})

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Should return only one user
        self.assertEqual(response.data['total'], 1) 

    def test_get_empty_users_list(self):

        # Get the users by page
        response = self.client.get(self.url, {'page': 1, 'search': 'nothing'})

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Should return only one user
        self.assertEqual(response.data['total'], 0)

class DeleteUserViewTest(APITestCase):
    """
    This class is used to test the user
    deletion code
    """

    def setUp(self) -> None:

        # Api Client to simulate http requests
        self.client = APIClient()

        # Create the administrator
        self.admin_user = CustomUser.objects.create(
            email='admin@example.com', password='password', is_staff=True
        )

        # Set the administrator token
        self.admin_token = Token.objects.create(user=self.admin_user)        

        # Create a user for testing
        self.user1 = CustomUser.objects.create(
            email='email1@example.com', password='password'
        )        

        # Create the credentials for http requests
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.admin_token.key)          

    def test_users_deletion(self):

        # Get the last created user
        last_user: CustomUser = CustomUser.objects.last()

        # Define the URL for the DeleteUserView
        self.url = reverse('administrator:delete_user', kwargs={'pk': last_user.pk})          

        # Delete the last user
        response: HttpResponse = self.client.delete(self.url)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the success key has the True value
        self.assertEqual(response.data['success'], True)

        # Check if the for correct message
        self.assertEqual(response.data['message'], 'The user was deleted successfully.')

        # Check if the user is actually deleted from the database
        self.assertFalse(CustomUser.objects.filter(pk=last_user.pk).exists())

    def test_fail_users_deletion(self):

        # Define the URL for the DeleteUserView
        self.url = reverse('administrator:delete_user', kwargs={'pk': 3})          

        # Delete the last user
        response: HttpResponse = self.client.delete(self.url)

        # Compare the status code to see if is correct
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the success key has the True value
        self.assertEqual(response.data['success'], False)

        # Check if the for correct message
        self.assertEqual(response.data['message'], 'The member was not found.')
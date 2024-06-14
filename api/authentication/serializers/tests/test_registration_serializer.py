# System Utils
from django.contrib.auth import get_user_model
from django.test import TestCase

# App Utils
from authentication.serializers.registration_serializer import CreateAccountSerializer

# Custom user model
User = get_user_model()

class CreateAccountSerializerTest(TestCase):
    """
    Test the Create Account
    Serializer
    """
    def setUp(self):
        self.valid_data = {
            'email': 'test@example.com',
            'password': 'password123',
            'role': 1
        }
        self.invalid_email_data = {
            'email': 'invalid-email',
            'password': 'password123',
            'role': 1
        }
        self.invalid_password_data = {
            'email': 'test@example.com',
            'password': 'short',
            'role': 1
        }
        self.existing_user_data = {
            'email': 'existing@example.com',
            'password': 'password123',
            'role': 1
        }
        # Create an existing user
        self.existing_user = User.objects.create_user(email='existing@example.com', password='password123')

    def test_valid_data(self):
        serializer = CreateAccountSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertIsInstance(user, User)

    def test_invalid_email(self):
        serializer = CreateAccountSerializer(data=self.invalid_email_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_invalid_password(self):
        serializer = CreateAccountSerializer(data=self.invalid_password_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_existing_user(self):
        serializer = CreateAccountSerializer(data=self.existing_user_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)
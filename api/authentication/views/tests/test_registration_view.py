"""
@file Test Registration View

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-04

This file contains the class used to test the registration registration
"""

# System Utils
from django.urls import reverse

# Installed Utils
from rest_framework import status
from rest_framework.test import APITestCase

class CreateAccountViewTest(APITestCase):
    """
    Test the user account creation
    """
    def setUp(self):
        self.url = reverse('authentication:registration')
        self.valid_payload = {
            'email': 'test@example.com',
            'password': 'password123'
        }
        self.invalid_payload = {
            'email': 'invalid-email',
            'password': ''
        }

    def test_create_account_success(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['success'], True)

    def test_create_account_invalid_data(self):
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['success'], False)
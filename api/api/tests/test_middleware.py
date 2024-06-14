"""
@file Test Middleware

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-04

This file contains functions to test the project middlewares
"""

# System utils
from django.http import HttpResponse
from django.test import RequestFactory
from unittest.mock import patch

# Project Utils
from api.middleware import LanguageMiddleware

def test_language_middleware() -> None:
    """
    This function test the 
    Language Middleware for
    correct working
    """

    # Prepare a mock request
    request_factory = RequestFactory()
    request = request_factory.get('/')

    # Define a mock response
    def mock_get_response(request) -> HttpResponse:
        return HttpResponse()

    # Create an instance of LanguageMiddleware with the mock response
    middleware = LanguageMiddleware(mock_get_response)

    # Test with default language
    with patch('django.utils.translation.activate') as mock_activate:
        response = middleware(request)
        assert response.status_code == 200
        assert mock_activate.called_once_with('en')

    # Test with a different language
    with patch('django.utils.translation.activate') as mock_activate:
        request.LANGUAGE_CODE = 'es'
        response = middleware(request)
        assert response.status_code == 200
        assert mock_activate.called_once_with('es')

"""
@file Test Decorators

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-04

This file contains functions to test the decorators
"""

# System Utils
import json
from django.http import JsonResponse
from django.test import RequestFactory

# App Utils
from shared_utils.decorators import require_POST

def test_require_POST() -> None:
    """
    This function tests the
    require_POST decorator
    """

    # Define a dummy view function
    def dummy_view(request) -> JsonResponse:
        return JsonResponse({'success': True})
    
    # Apply the decorator to the dummy view
    decorated_view = require_POST(dummy_view)

    # Create a request instance with different methods
    factory = RequestFactory()
    get_request = factory.get('/')
    post_request = factory.post('/')

    # Test with a GET request
    response_get = decorated_view(get_request)
    assert response_get.status_code == 200
    assert json.loads(response_get.content) == {'success': False, 'message': 'Method Not Allowed (Requires POST)'}

    # Test with a POST request
    response_post = decorated_view(post_request)
    assert response_post.status_code == 200
    assert json.loads(response_post.content) == {'success': True}
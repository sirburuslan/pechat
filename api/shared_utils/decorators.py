"""
@file Decorators

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-03

This file contains functions used as decorators for classes and methods
"""

# System Utils
from django.http import JsonResponse
from django.utils.translation import gettext_lazy as _
from typing import Any

def require_POST(func) -> (JsonResponse | Any):
    """
    The function has the scope
    to block no POST requests
    """
    def decorated(request, *args, **kwargs):
        if request.method != 'POST':
            # Return custom JSON response
            return JsonResponse({
                'success': False,
                'message': _('Method Not Allowed (Requires POST)')
            })
        return func(request, *args, **kwargs)
    return decorated

def require_PUT(func) -> (JsonResponse | Any):
    """
    The function has the scope
    to block no PUT requests
    """
    def decorated(request, *args, **kwargs):
        if request.method != 'PUT':
            # Return custom JSON response
            return JsonResponse({
                'success': False,
                'message': _('Method Not Allowed (Requires PUT)')
            })
        return func(request, *args, **kwargs)
    return decorated

def require_GET(func) -> (JsonResponse | Any):
    """
    The function has the scope
    to block no GET requests
    """
    def decorated(request, *args, **kwargs):
        if request.method != 'GET':
            # Return custom JSON response
            return JsonResponse({
                'success': False,
                'message': _('Method Not Allowed (Requires POST)')                
            })
        return func(request, *args, **kwargs)
    return decorated

def require_DELETE(func) -> (JsonResponse | Any):
    """
    The function has the scope
    to block no DELETE requests
    """
    def decorated(request, *args, **kwargs):
        if request.method != 'DELETE':
            # Return custom JSON response
            return JsonResponse({
                'success': False,
                'message': _('Method Not Allowed (Requires DELETE)')                
            })
        return func(request, *args, **kwargs)
    return decorated
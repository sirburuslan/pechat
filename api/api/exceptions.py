# System Utils
from django.http import JsonResponse

# Installed Utils
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    """
    Custom the exceptions
    messages
    """
    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code
        
    if hasattr(exc, 'detail'):
        return JsonResponse({
            'success': False,
            'message': exc.detail
        })

    return response
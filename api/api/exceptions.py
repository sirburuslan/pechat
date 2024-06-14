# System Utils
from django.http import JsonResponse

def custom_exception_handler(exc, context):
    print(context)
    """
    Custom the exceptions
    messages
    """
    return JsonResponse({
        'success': False,
        'message': exc
    })
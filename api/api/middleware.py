# System Utils
from django.conf import settings
from django.http import HttpRequest, HttpResponse
from django.utils.translation import activate
from typing import Callable

# Middleware for selected language
class LanguageMiddleware:
    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.get_response = get_response
        self.default_language: str = getattr(settings, 'LANGUAGE_CODE', 'it')

    def __call__(self, request):
        activate(self.default_language)
        return self.get_response(request)
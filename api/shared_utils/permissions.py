# Installed Utils
from rest_framework.permissions import BasePermission

class IsAdministrator(BasePermission):
    """
    Allows access only to administrators
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role < 1)
# Installed Utils
from rest_framework import filters

class UsersFilter(filters.SearchFilter):
    """
    This class defines the fields
    to search for users
    """
    search_fields = ['email', 'first_name', 'last_name']
    
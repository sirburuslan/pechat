# Installed Utils
from rest_framework.pagination import PageNumberPagination

class DefaultPagination(PageNumberPagination):
    """
    Rules for pagination in a list
    """
    page_size = 24
    page_size_query_param = 'page_size'
    max_page_size = 24
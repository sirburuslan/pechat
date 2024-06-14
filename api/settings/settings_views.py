# System Utils
from django.utils.decorators import method_decorator

# Installed Utils
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

# App Utils
from shared_utils.decorators import require_GET

@method_decorator(require_GET, name='dispatch')
class SettingsView(APIView):
    """
    The goal of this class is to get
    the member options
    """

    queryset = None
    # Allow public access
    permission_classes = [AllowAny]

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        my_list = {"siteName": "value1"}

        return Response(
            {
                "success": False,
                "website": my_list
            },
            status=status.HTTP_200_OK
        )
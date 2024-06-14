"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# System Utils
from django.urls import include, path

# App Utils
from settings.settings_views import SettingsView

urlpatterns = [
    path('api/v1.0/settings', SettingsView.as_view(), name='settings'),
    path('api/v1.0/member/', include(('member.urls', 'member'), namespace='member')),
    path('api/v1.0/auth/', include(('authentication.urls', 'authentication'), namespace='authentication')),
    path('api/v1.0/admin/', include(('administrator.urls', 'administrator'), namespace='administrator')),
]

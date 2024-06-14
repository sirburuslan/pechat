# System Utils
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """
    Custom user manager where the email is the unique identifier
    for authentication instead of usernames.
    """

    def create_user(self, email, password=None, role=0, **extra_fields):
        """
        Create and return a regular user with an email, password, and role.
        """
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            role=role,
            sidebar=0,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):
    """
    Custom user model where the email is the unique identifier
    for authentication instead of usernames.
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)
    ROLE_CHOICES = (
        (0, 'Administrator'),
        (1, 'User'),
    )
    role = models.IntegerField(_('role'), choices=ROLE_CHOICES, default=0)
    SIDEBAR_CHOICES = (
        (0, 'Maximized'),
        (1, 'Minimized'),
    )    
    sidebar = models.IntegerField(_('sidebar'), choices=SIDEBAR_CHOICES, default=0)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    def __str__(self):
        return self.email

"""
@model Settings

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-04-09

This file contains classes which represents the db tables for settings
"""

# System Modules
from django.db import models

# Settings Table
class Settings(models.Model):
    option_id: int = models.AutoField(primary_key=True)
    option_name: str = models.CharField(max_length=255, null=True)
    option_value: str = models.TextField(max_length=1000, null=True)

    def __str__(self) -> str:
        return f"Option Id: {self.option_id}"

    class Meta:
        db_table: str = 'settings'
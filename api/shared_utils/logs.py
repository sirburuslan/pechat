"""
@file Logs

@author Ruslan Sirbu
@version 0.0.1
@updated 2024-05-22

This file contains functions used for logging
"""

# System Utils
import os
import sys
from datetime import datetime

# Installed Utils
from loguru import logger as _logger

# Default Severity Level
_print_level = "INFO"

def define_log_level(print_level="INFO", logfile_level="DEBUG", name: str = None):
    """
    Create Logs
    """
    global _print_level
    _print_level = print_level

    current_date = datetime.now()
    formatted_date = current_date.strftime("%Y%m%d")
    log_name = f"{name}_{formatted_date}" if name else formatted_date
    log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs")

    _logger.remove()
    _logger.add(sys.stderr, level=print_level)
    _logger.add(os.path.join(log_dir, f"{log_name}.txt"), level=logfile_level)
    return _logger

logger = define_log_level()
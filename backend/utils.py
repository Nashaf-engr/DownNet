import os
from pathlib import Path
import re

class URLValidator:
    """Validate and parse URLs from supported platforms"""

    PLATFORM_PATTERNS = {
        'youtube': r'(youtube\.com|youtu\.be)',
        'instagram': r'(instagram\.com|instagr\.am)',
        'tiktok': r'(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)',
        'pinterest': r'(pinterest\.com|pin\.it)',
        'threads': r'(threads\.net)',
        'spotify': r'(spotify\.com|open\.spotify\.com)'
    }

    @staticmethod
    def detect_platform(url):
        """Detect platform from URL"""
        for platform, pattern in URLValidator.PLATFORM_PATTERNS.items():
            if re.search(pattern, url):
                return platform
        return None

    @staticmethod
    def is_valid_url(url):
        """Check if URL is valid"""
        url_pattern = r'https?://(?:www\.)?[\w.-]+\.\w+'
        return re.match(url_pattern, url) is not None

    @staticmethod
    def clean_url(url):
        """Clean and normalize URL"""
        url = url.strip()
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        return url

class PathManager:
    """Manage download paths and ensure safety"""

    @staticmethod
    def ensure_valid_path(path):
        """Ensure path is valid and safe"""
        try:
            path = Path(path).expanduser().resolve()
            path.mkdir(parents=True, exist_ok=True)
            return str(path)
        except (OSError, ValueError) as e:
            raise ValueError(f"Invalid path: {str(e)}")

    @staticmethod
    def get_available_space(path):
        """Get available disk space in bytes"""
        import shutil
        try:
            return shutil.disk_usage(path).free
        except:
            return None

    @staticmethod
    def sanitize_filename(filename):
        """Remove invalid characters from filename"""
        invalid_chars = r'[<>:"/\\|?*]'
        return re.sub(invalid_chars, '_', filename)

class FileManager:
    """Handle file operations"""

    @staticmethod
    def get_file_size(filepath):
        """Get file size in bytes"""
        try:
            return os.path.getsize(filepath)
        except:
            return None

    @staticmethod
    def delete_file(filepath):
        """Safely delete a file"""
        try:
            if os.path.exists(filepath):
                os.remove(filepath)
                return True
            return False
        except Exception as e:
            raise Exception(f"Failed to delete file: {str(e)}")

    @staticmethod
    def format_file_size(bytes_size):
        """Convert bytes to human-readable format"""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if bytes_size < 1024.0:
                return f"{bytes_size:.2f} {unit}"
            bytes_size /= 1024.0
        return f"{bytes_size:.2f} PB"

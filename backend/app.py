import os
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
import yt_dlp
import requests
from pathlib import Path
import threading

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
ALLOWED_PLATFORMS = ['youtube', 'instagram', 'tiktok', 'pinterest', 'threads', 'spotify']
DOWNLOAD_TIMEOUT = 300

class DownloadManager:
    def __init__(self):
        self.downloads = {}
        self.download_id = 0

    def add_download(self, status):
        self.download_id += 1
        self.downloads[self.download_id] = status
        return self.download_id

    def update_download(self, download_id, status):
        if download_id in self.downloads:
            self.downloads[download_id].update(status)

    def get_download(self, download_id):
        return self.downloads.get(download_id, {})

dm = DownloadManager()

# Platform-specific downloaders
class YouTubeDownloader:
    @staticmethod
    def get_formats():
        return {
            'video': ['1080p', '720p', '480p', '360p'],
            'audio': ['320kbps', '256kbps', '128kbps']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        try:
            ydl_opts = {
                'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),
                'quiet': False,
                'no_warnings': False,
            }

            if format_type == 'audio':
                ydl_opts.update({
                    'format': 'bestaudio/best',
                    'postprocessors': [{
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3',
                        'preferredquality': quality.replace('kbps', ''),
                    }]
                })
            else:
                ydl_opts['format'] = f'best[height<={quality.replace("p", "")}]'

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                return {'success': True, 'filename': info.get('title', 'download')}
        except Exception as e:
            return {'success': False, 'error': str(e)}

class SpotifyDownloader:
    @staticmethod
    def get_formats():
        return {
            'audio': ['320kbps', '256kbps', '128kbps']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        return {'success': False, 'error': 'Spotify API requires authentication. Manual setup needed.'}

class InstagramDownloader:
    @staticmethod
    def get_formats():
        return {
            'video': ['720p', '480p', '360p'],
            'audio': ['128kbps']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        return {'success': False, 'error': 'Instagram requires session authentication. Please use instagrapi setup.'}

class TikTokDownloader:
    @staticmethod
    def get_formats():
        return {
            'video': ['1080p', '720p', '480p'],
            'audio': ['128kbps']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        return {'success': False, 'error': 'TikTok requires special handling. Install TikTok-Dl separately.'}

class PinterestDownloader:
    @staticmethod
    def get_formats():
        return {
            'image': ['original', '1080p', '720p'],
            'video': ['1080p', '720p']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        return {'success': False, 'error': 'Pinterest downloader requires additional setup.'}

class ThreadsDownloader:
    @staticmethod
    def get_formats():
        return {
            'post': ['original', '1080p', '720p'],
            'video': ['1080p', '720p']
        }

    @staticmethod
    def download(url, format_type, quality, save_path):
        return {'success': False, 'error': 'Threads API access required.'}

# Routes
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

@app.route('/api/platforms', methods=['GET'])
def get_platforms():
    return jsonify({
        'platforms': [
            {'name': 'YouTube', 'id': 'youtube', 'icon': 'youtube'},
            {'name': 'Instagram', 'id': 'instagram', 'icon': 'instagram'},
            {'name': 'TikTok', 'id': 'tiktok', 'icon': 'tiktok'},
            {'name': 'Pinterest', 'id': 'pinterest', 'icon': 'pinterest'},
            {'name': 'Threads', 'id': 'threads', 'icon': 'threads'},
            {'name': 'Spotify', 'id': 'spotify', 'icon': 'spotify'}
        ]
    })

@app.route('/api/formats/<platform>', methods=['GET'])
def get_formats(platform):
    downloaders = {
        'youtube': YouTubeDownloader,
        'instagram': InstagramDownloader,
        'tiktok': TikTokDownloader,
        'pinterest': PinterestDownloader,
        'threads': ThreadsDownloader,
        'spotify': SpotifyDownloader
    }

    if platform not in downloaders:
        return jsonify({'error': 'Platform not supported'}), 400

    formats = downloaders[platform].get_formats()
    return jsonify(formats)

@app.route('/api/download', methods=['POST'])
def download():
    try:
        data = request.json
        url = data.get('url')
        platform = data.get('platform')
        format_type = data.get('format')
        quality = data.get('quality')
        save_path = data.get('savePath', str(Path.home() / 'Downloads'))

        if not url or not platform or not format_type or not quality:
            return jsonify({'error': 'Missing required fields'}), 400

        if platform not in ALLOWED_PLATFORMS:
            return jsonify({'error': 'Platform not supported'}), 400

        # Create save directory
        Path(save_path).mkdir(parents=True, exist_ok=True)

        # Initialize download
        download_id = dm.add_download({
            'status': 'starting',
            'platform': platform,
            'progress': 0
        })

        downloaders = {
            'youtube': YouTubeDownloader,
            'instagram': InstagramDownloader,
            'tiktok': TikTokDownloader,
            'pinterest': PinterestDownloader,
            'threads': ThreadsDownloader,
            'spotify': SpotifyDownloader
        }

        # Start download in background
        def download_task():
            downloader = downloaders[platform]
            result = downloader.download(url, format_type, quality, save_path)
            dm.update_download(download_id, {
                'status': 'completed' if result.get('success') else 'failed',
                'result': result,
                'progress': 100
            })

        thread = threading.Thread(target=download_task)
        thread.daemon = True
        thread.start()

        return jsonify({'download_id': download_id, 'status': 'started'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download/<int:download_id>', methods=['GET'])
def get_download_status(download_id):
    status = dm.get_download(download_id)
    if not status:
        return jsonify({'error': 'Download not found'}), 404
    return jsonify(status)

@app.route('/api/validate-url', methods=['POST'])
def validate_url():
    try:
        data = request.json
        url = data.get('url')

        response = requests.head(url, timeout=5, allow_redirects=True)
        is_valid = response.status_code < 400

        return jsonify({'valid': is_valid})
    except:
        return jsonify({'valid': False})

if __name__ == '__main__':
    app.run(debug=True, port=5000)

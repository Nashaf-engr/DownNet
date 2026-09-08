#!/usr/bin/env python
"""
Test suite for DownNet backend
Run with: python -m pytest tests/
"""

import pytest
import json
from app import app, dm

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

class TestHealth:
    def test_health_endpoint(self, client):
        response = client.get('/api/health')
        assert response.status_code == 200
        assert response.json['status'] == 'healthy'

class TestPlatforms:
    def test_get_platforms(self, client):
        response = client.get('/api/platforms')
        assert response.status_code == 200
        data = response.json
        assert 'platforms' in data
        assert len(data['platforms']) > 0

        platform_ids = [p['id'] for p in data['platforms']]
        assert 'youtube' in platform_ids
        assert 'instagram' in platform_ids
        assert 'tiktok' in platform_ids

class TestFormats:
    def test_get_youtube_formats(self, client):
        response = client.get('/api/formats/youtube')
        assert response.status_code == 200
        data = response.json
        assert 'video' in data or 'audio' in data

    def test_invalid_platform(self, client):
        response = client.get('/api/formats/invalid')
        assert response.status_code == 400

class TestDownload:
    def test_download_missing_fields(self, client):
        response = client.post('/api/download', json={
            'url': 'https://youtube.com/watch?v=test'
        })
        assert response.status_code == 400
        assert 'error' in response.json

    def test_download_invalid_platform(self, client):
        response = client.post('/api/download', json={
            'url': 'https://youtube.com/watch?v=test',
            'platform': 'invalid',
            'format': 'video',
            'quality': '720p',
            'savePath': '/tmp'
        })
        assert response.status_code == 400

class TestURLValidation:
    def test_validate_valid_url(self, client):
        response = client.post('/api/validate-url', json={
            'url': 'https://www.google.com'
        })
        assert response.status_code == 200
        # May be valid or invalid depending on network

    def test_validate_missing_url(self, client):
        response = client.post('/api/validate-url', json={})
        assert response.status_code == 200
        assert response.json['valid'] == False

if __name__ == '__main__':
    pytest.main([__file__, '-v'])

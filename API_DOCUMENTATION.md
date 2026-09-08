API_DOCUMENTATION

## DownNet API Reference

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
```
GET /api/health

Response:
{
  "status": "healthy"
}
```

#### 2. Get Supported Platforms
```
GET /api/platforms

Response:
{
  "platforms": [
    {
      "name": "YouTube",
      "id": "youtube",
      "icon": "youtube"
    },
    ...
  ]
}
```

#### 3. Get Format Options
```
GET /api/formats/<platform>

Parameters:
- platform: youtube | instagram | tiktok | pinterest | threads | spotify

Response:
{
  "video": ["1080p", "720p", "480p", "360p"],
  "audio": ["320kbps", "256kbps", "128kbps"]
}
```

#### 4. Start Download
```
POST /api/download

Request Body:
{
  "url": "https://youtube.com/watch?v=...",
  "platform": "youtube",
  "format": "video",
  "quality": "720p",
  "savePath": "/path/to/save"
}

Response:
{
  "download_id": 1,
  "status": "started"
}
```

#### 5. Check Download Status
```
GET /api/download/<download_id>

Response:
{
  "download_id": 1,
  "status": "downloading|completed|failed",
  "platform": "youtube",
  "progress": 45,
  "result": {
    "success": true,
    "filename": "video_title"
  }
}
```

#### 6. Validate URL
```
POST /api/validate-url

Request Body:
{
  "url": "https://youtube.com/watch?v=..."
}

Response:
{
  "valid": true
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

#### 404 Not Found
```json
{
  "error": "Download not found"
}
```

#### 500 Server Error
```json
{
  "error": "Server error message"
}
```

### Status Codes
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Server Error

### Rate Limiting
- No rate limiting currently implemented
- Recommended: 1 request per second for downloads

### Authentication
- Not required (future enhancement)

### CORS
- Configured for localhost:3000
- Update CORS_ORIGINS in .env for production

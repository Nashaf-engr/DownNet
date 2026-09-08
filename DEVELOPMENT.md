# Development Guide

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Installation

#### Option 1: Using setup scripts
**Windows:**
```bash
cd H:\DownNet
setup.bat
```

**Linux/macOS:**
```bash
cd H:\DownNet
chmod +x setup.sh
./setup.sh
```

#### Option 2: Manual setup

**Backend:**
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

**Frontend (in another terminal):**
```bash
cd frontend
npm install
npm start
```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Project Structure

```
H:\DownNet/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration
│   ├── logger.py           # Logging setup
│   ├── utils.py            # Utility functions
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables
│   ├── Dockerfile         # Docker configuration
│   └── logs/              # Log files
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.js
│   │   │   ├── URLInput.js
│   │   │   ├── PlatformSelector.js
│   │   │   ├── FormatSelector.js
│   │   │   ├── SaveLocationPicker.js
│   │   │   ├── DownloadButton.js
│   │   │   ├── DownloadProgress.js
│   │   │   ├── DownloadHistory.js
│   │   │   └── SettingsModal.js
│   │   ├── context/       # React Context
│   │   │   └── DownloadContext.js
│   │   ├── services/      # API services
│   │   │   └── apiService.js
│   │   ├── constants/     # Constants
│   │   │   └── index.js
│   │   ├── styles/        # Global styles
│   │   │   ├── global.css
│   │   │   └── app.css
│   │   ├── App.js         # Main component
│   │   └── index.js       # Entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI/CD
│
├── README.md
├── API_DOCUMENTATION.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── .gitignore
├── docker-compose.yml
├── setup.sh
└── setup.bat
```

## Development Workflow

### Adding a New Component

1. Create component file in `frontend/src/components/`
2. Create corresponding CSS file
3. Import and use in parent component
4. Test in development mode

Example:
```javascript
// MyComponent.js
import React from 'react';
import './MyComponent.css';

function MyComponent() {
  return <div className="my-component">Content</div>;
}

export default MyComponent;
```

### Adding a New API Endpoint

1. Add route in `backend/app.py`
2. Create appropriate handler function
3. Return JSON response
4. Test with Postman or curl
5. Update `frontend/src/services/apiService.js`

Example:
```python
@app.route('/api/endpoint', methods=['GET'])
def my_endpoint():
    try:
        # Implementation
        return jsonify({'data': 'value'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

### Running Tests

**Frontend:**
```bash
cd frontend
npm test
```

**Backend:**
```bash
cd backend
python -m pytest
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

Output will be in `frontend/build/`

## Environment Variables

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
MAX_DOWNLOAD_SIZE=5GB
DOWNLOAD_TIMEOUT=300
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_DOWNLOAD_TIMEOUT=300000
REACT_APP_MAX_FILE_SIZE=5GB
```

## Debugging

### Backend Debugging
```python
from logger import logger
logger.info("Debug message")
logger.error("Error message")
```

### Frontend Debugging
```javascript
console.log("Debug message");
console.error("Error message");
// Use React DevTools browser extension
```

### API Testing
```bash
# Test health check
curl http://localhost:5000/api/health

# Get platforms
curl http://localhost:5000/api/platforms

# Get formats
curl http://localhost:5000/api/formats/youtube
```

## Common Issues

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### CORS Errors
- Check CORS_ORIGINS in backend/.env
- Must match frontend URL exactly
- Restart backend after changes

### Module Import Issues
- Clear Python cache: `find . -type d -name __pycache__ -exec rm -r {} +`
- Reinstall dependencies
- Check Python path in terminal

## Performance Tips

1. **Frontend:**
   - Use React.memo for expensive components
   - Lazy load routes with React.lazy
   - Optimize images and assets
   - Use production build for deployment

2. **Backend:**
   - Use connection pooling
   - Cache API responses
   - Optimize database queries
   - Use gzip compression

## Documentation

- API: See API_DOCUMENTATION.md
- Contributing: See CONTRIBUTING.md
- Changes: See CHANGELOG.md

## Support

For issues or questions:
1. Check existing GitHub issues
2. Open a new issue with details
3. Include error logs and environment info

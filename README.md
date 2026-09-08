# DownNet - Social Media Downloader

A full-stack application to download videos, audio, and posts from multiple social media platforms.

## Features

- 🎥 Support for YouTube, Instagram, TikTok, Pinterest, Threads, and Spotify
- 🎯 Multiple format and quality options
- 🎨 Dark colorful UI with modern design
- 📁 Custom save location picker
- 📊 Real-time download progress tracking
- 🔐 Secure and fast downloads

## Tech Stack

**Backend:**
- Python 3.8+
- Flask
- Flask-CORS
- yt-dlp
- requests

**Frontend:**
- React 18
- React Icons
- Lucide Icons
- CSS3 with modern features

## Project Structure

```
DownNet/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── styles/         # CSS files
    │   ├── App.js          # Main App component
    │   └── index.js        # Entry point
    ├── public/
    │   └── index.html      # HTML template
    └── package.json        # Node dependencies
```

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd H:\DownNet\backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd H:\DownNet\frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open the application in your browser (http://localhost:3000)
2. Enter the URL of the media you want to download
3. Select the platform from the available options
4. Choose the format type (video, audio, etc.)
5. Select the desired quality
6. Choose the save location
7. Click "Download" to start the download

## API Endpoints

- `GET /api/health` - Check server health
- `GET /api/platforms` - Get list of supported platforms
- `GET /api/formats/<platform>` - Get available formats for a platform
- `POST /api/download` - Start a download
- `GET /api/download/<id>` - Check download status
- `POST /api/validate-url` - Validate a media URL

## Supported Platforms

- **YouTube** - Videos in various resolutions and audio
- **Instagram** - Photos and videos
- **TikTok** - Videos and audios
- **Pinterest** - Images and videos
- **Threads** - Posts and videos
- **Spotify** - Audio tracks

## Configuration

Edit `.env` file in the backend directory to configure:
- Flask environment settings
- CORS origins
- API credentials (optional)
- Download limits and timeouts

## Future Enhancements

- [ ] Batch download support
- [ ] Download history tracking
- [ ] Playlist downloading
- [ ] Advanced filtering options
- [ ] Desktop app with Electron
- [ ] Mobile app support
- [ ] Cloud storage integration

## License

MIT License - Feel free to use this project

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

### Backend Issues
- Ensure Python 3.8+ is installed
- Check if all dependencies are installed: `pip install -r requirements.txt`
- Verify Flask is running on port 5000

### Frontend Issues
- Ensure Node.js 14+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if React is running on port 3000

### CORS Issues
- Verify CORS_ORIGINS in `.env` includes your frontend URL
- Restart the backend server after changing `.env`

## Support

For issues and questions, please open an issue on GitHub.

# QUICKSTART.md

## Get DownNet Running in 5 Minutes

### Step 1: Prerequisites
- Python 3.8+ installed
- Node.js 14+ installed
- Git installed

### Step 2: Clone/Navigate to Project
```bash
cd H:\DownNet
```

### Step 3: Run Setup

**Windows:**
```bash
setup.bat
```

**Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

### Step 4: Start Backend (Terminal 1)
```bash
cd backend
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

python app.py
```

Backend will run at: **http://localhost:5000**

### Step 5: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```

Frontend will open at: **http://localhost:3000**

### Step 6: You're Ready!
1. Enter a media URL (YouTube, Instagram, TikTok, Pinterest, Threads, or Spotify)
2. Select platform
3. Choose format and quality
4. Pick save location
5. Click Download

## Troubleshooting

**Backend won't start?**
- Check Python version: `python --version` (should be 3.8+)
- Check all dependencies: `pip install -r requirements.txt`

**Frontend won't start?**
- Clear cache: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

**Can't connect backend?**
- Check backend is running on port 5000
- Check CORS_ORIGINS in `backend/.env`

**Download fails?**
- Verify URL is valid
- Check internet connection
- Check save path exists and is writable

## Next Steps
- Read [README.md](README.md) for detailed info
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [DEVELOPMENT.md](DEVELOPMENT.md) for development guide

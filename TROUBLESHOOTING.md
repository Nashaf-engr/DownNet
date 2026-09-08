# TROUBLESHOOTING.md

## Common Issues & Solutions

### Backend Issues

#### Issue: "ModuleNotFoundError: No module named 'flask'"
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

#### Issue: "Address already in use" port 5000
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/macOS
lsof -i :5000
kill -9 <PID>
```

#### Issue: CORS errors in browser
**Solution:**
1. Check `backend/.env`:
   ```
   CORS_ORIGINS=http://localhost:3000
   ```
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+Del)

#### Issue: "Connection refused" when calling API
**Solution:**
- Verify backend is running: `python app.py`
- Check port 5000 is accessible
- Check firewall settings

### Frontend Issues

#### Issue: "npm ERR! code ERESOLVE"
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 3000 already in use
**Solution:**
```bash
# Use different port
PORT=3001 npm start
```

#### Issue: "Cannot find module" errors
**Solution:**
```bash
cd frontend
npm install
# Or clear cache
npm cache clean --force
npm install
```

#### Issue: Blank page after starting
**Solution:**
- Check browser console for errors
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Network Issues

#### Issue: "Cannot connect to server"
**Solution:**
1. Verify backend running: `http://localhost:5000/api/health`
2. Check CORS_ORIGINS in `.env`
3. Check firewall/antivirus blocking ports
4. Restart both services

#### Issue: Download fails with "Network error"
**Solution:**
- Check internet connection
- Verify URL is valid and accessible
- Check rate limiting on platform
- Try different quality/format

#### Issue: Slow downloads
**Solution:**
- Check internet speed
- Try lower quality
- Close other applications
- Check platform limits

### File & Path Issues

#### Issue: "Invalid path" error
**Solution:**
- Use full path: `C:\Users\Username\Downloads`
- Avoid special characters
- Check write permissions on directory
- Ensure path exists

#### Issue: "Permission denied" saving file
**Solution:**
- Check folder permissions
- Run app as administrator
- Use different save location
- Check disk space

### Platform-Specific Issues

#### YouTube Issues
- Try without extra URL parameters
- Check video isn't age-restricted
- Verify it's publicly available
- Try different quality

#### Instagram Issues
- Requires authentication setup
- Check account isn't private
- Verify profile is accessible
- May need session cookies

#### TikTok Issues
- Some regions may have access issues
- Check if video is publicly available
- Try with different quality
- May require special API setup

#### Spotify Issues
- Requires API credentials
- Need client ID and secret
- Some songs may be restricted
- Check region restrictions

### Docker Issues

#### Issue: "Docker daemon is not running"
**Solution:**
```bash
# Windows - Start Docker Desktop
docker --version

# Linux
sudo systemctl start docker
sudo systemctl status docker

# macOS
open -a Docker
```

#### Issue: "Cannot connect to Docker daemon"
**Solution:**
```bash
# Windows
docker-machine start default

# Check if running
docker ps
```

#### Issue: Container exits immediately
**Solution:**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild
docker-compose down
docker-compose up --build
```

### Git Issues

#### Issue: "fatal: not a git repository"
**Solution:**
```bash
cd H:\DownNet
git init
git remote add origin https://github.com/username/DownNet.git
```

#### Issue: "Could not read from remote repository"
**Solution:**
```bash
# Check SSH key setup
ssh -T git@github.com

# Or use HTTPS
git remote set-url origin https://github.com/username/DownNet.git
```

### Performance Issues

#### High Memory Usage
- Close unnecessary applications
- Clear browser cache
- Limit concurrent downloads
- Check for memory leaks

#### High CPU Usage
- Multiple large downloads
- Close other apps
- Reduce browser tabs
- Check for infinite loops

#### Slow UI Response
- Update React
- Profile with React DevTools
- Reduce number of history items
- Clear localStorage

### Logging & Debugging

#### Enable Debug Mode
**Backend:**
```python
# In app.py
app.run(debug=True)  # Already enabled
```

**Frontend:**
```javascript
// In console
localStorage.setItem('debug', 'true');
```

#### View Logs
```bash
# Backend logs
tail -f backend/logs/downnet_*.log

# Docker logs
docker-compose logs -f

# Browser console
F12 -> Console tab
```

#### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Missing fields | Fill all fields |
| 404 Not Found | Invalid endpoint | Check API URL |
| 500 Server Error | Backend crash | Check backend logs |
| CORS error | Origin mismatch | Update CORS_ORIGINS |
| Timeout | Slow network | Increase timeout |

### Getting Help

1. **Check logs first**
   - Backend: `backend/logs/downnet_*.log`
   - Browser: F12 DevTools Console

2. **Search existing issues**
   - GitHub Issues

3. **Create new issue** with:
   - OS and versions
   - Error message
   - Steps to reproduce
   - Screenshots

4. **Community forums**
   - Stack Overflow (tag: downnet)
   - Reddit communities

### Before Asking for Help

- [ ] Read this troubleshooting guide
- [ ] Check all environment variables
- [ ] Verify dependencies installed
- [ ] Try restarting both services
- [ ] Clear cache and temp files
- [ ] Test with simple URLs first
- [ ] Check internet connection
- [ ] Verify firewall settings

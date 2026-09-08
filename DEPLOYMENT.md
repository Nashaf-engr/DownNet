# Deployment Guide

## Local Deployment

### Using Python & Node.js

1. **Backend Setup**
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

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run build
   npm start
   ```

## Docker Deployment

### Build and Run with Docker Compose

```bash
cd H:\DownNet
docker-compose up --build
```

Access at: http://localhost:3000

### Build Individual Docker Images

**Backend:**
```bash
cd backend
docker build -t downnet-backend .
docker run -p 5000:5000 downnet-backend
```

**Frontend:**
```bash
cd frontend
docker build -t downnet-frontend .
docker run -p 3000:3000 downnet-frontend
```

## Production Deployment

### Environment Setup

Create `backend/.env.production`:
```
FLASK_ENV=production
FLASK_DEBUG=False
CORS_ORIGINS=https://yourdomain.com
```

### Using Gunicorn (Python)

```bash
pip install gunicorn
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using PM2 (Node.js)

```bash
npm install -g pm2
cd frontend
pm2 start "npm start" --name "downnet-frontend"
cd ../backend
pm2 start "python app.py" --name "downnet-backend"
pm2 save
pm2 startup
```

## Cloud Deployment

### Heroku

1. **Backend**
   ```bash
   heroku login
   heroku create downnet-backend
   git push heroku main
   heroku config:set FLASK_ENV=production
   ```

2. **Frontend**
   ```bash
   heroku create downnet-frontend
   git subtree push --prefix frontend heroku main
   ```

### AWS EC2

1. Launch Ubuntu instance
2. SSH into instance
3. Clone repository
4. Install dependencies
5. Use systemd services for auto-restart

### DigitalOcean

1. Create Droplet
2. SSH and clone repo
3. Use Docker or native setup
4. Point domain to IP

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

Update Nginx config with SSL certificates.

## Monitoring

### Application Monitoring
```bash
# Monitor logs
tail -f backend/logs/downnet_*.log

# Check processes
ps aux | grep python
ps aux | grep node
```

### System Monitoring
- Use PM2 Plus for Node.js monitoring
- Use New Relic or DataDog for APM

## Database Setup (Future)

For production with persistent data:

```bash
# PostgreSQL
docker run -d \
  --name downnet-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=downnet \
  -p 5432:5432 \
  postgres:13

# SQLite (simpler alternative)
# No setup needed - file-based database
```

## Backup Strategy

- Back up download history (localStorage)
- Back up configuration files
- Back up logs for troubleshooting
- Automate backups weekly

## Scaling

### Horizontal Scaling
- Run multiple backend instances
- Use load balancer (Nginx, HAProxy)
- Deploy frontend to CDN

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database queries
- Use caching (Redis)

## Troubleshooting

### 502 Bad Gateway
- Check backend is running
- Check port mappings
- Check Nginx configuration

### High Memory Usage
- Monitor background downloads
- Implement request timeout
- Clear old logs

### Slow Downloads
- Check network bandwidth
- Check platform rate limits
- Optimize download queue

## Rollback Strategy

Keep multiple versions:
```bash
git tag v1.0.0
git tag v1.0.1
git checkout v1.0.0  # Rollback
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure headers (HSTS, CSP)
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Enable rate limiting
- [ ] Use CORS properly
- [ ] Regular security audits

#!/bin/bash

echo "🚀 Starting DownNet..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Start services
echo "▶️ Starting services..."
cd ..

# Start backend in background
echo "Starting backend on port 5000..."
cd backend
nohup python app.py > backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend on port 3000
echo "Starting frontend on port 3000..."
cd ../frontend
PORT=3000 npm start

# Cleanup
kill $BACKEND_PID 2>/dev/null

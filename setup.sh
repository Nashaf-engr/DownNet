#!/bin/bash

echo "======================================"
echo "DownNet - Setup Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python installation
echo -e "${YELLOW}Checking Python installation...${NC}"
if ! command -v python &> /dev/null; then
    echo -e "${RED}Python is not installed. Please install Python 3.8+${NC}"
    exit 1
fi

PYTHON_VERSION=$(python --version | cut -d' ' -f2)
echo -e "${GREEN}✓ Python ${PYTHON_VERSION} found${NC}"

# Check Node installation
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 14+${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"

# Setup Backend
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo -e "${YELLOW}Setting up frontend...${NC}"
cd ../frontend

# Install dependencies
echo "Installing Node dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete${NC}"

echo ""
echo -e "${GREEN}======================================"
echo "Setup Complete!"
echo "======================================"
echo -e "To start the application:${NC}"
echo ""
echo -e "${YELLOW}1. Backend:${NC}"
echo "   cd backend"
echo "   source venv/bin/activate  # or venv\\Scripts\\activate on Windows"
echo "   python app.py"
echo ""
echo -e "${YELLOW}2. Frontend (in another terminal):${NC}"
echo "   cd frontend"
echo "   npm start"
echo ""
echo -e "Then open http://localhost:3000 in your browser${NC}"

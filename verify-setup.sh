#!/bin/bash
# verify-setup.sh - Verify DownNet installation

echo "=================================="
echo "DownNet Setup Verification"
echo "=================================="
echo ""

# Check Python
echo "Checking Python installation..."
if command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version 2>&1)
    echo "✅ $PYTHON_VERSION"
else
    echo "❌ Python not found"
fi

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo "✅ Node.js $NODE_VERSION, npm $NPM_VERSION"
else
    echo "❌ Node.js not found"
fi

# Check Git
echo "Checking Git installation..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo "✅ $GIT_VERSION"
else
    echo "⚠️  Git not found (optional)"
fi

# Check Docker
echo "Checking Docker installation..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ $DOCKER_VERSION"
else
    echo "⚠️  Docker not found (optional)"
fi

echo ""
echo "=================================="
echo "File Structure Verification"
echo "=================================="
echo ""

# Check key directories
dirs=("backend" "frontend" "frontend/src" "frontend/src/components" ".github/workflows")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir"
    else
        echo "❌ $dir"
    fi
done

echo ""
echo "=================================="
echo "Key Files Verification"
echo "=================================="
echo ""

# Check key files
files=("backend/app.py" "backend/requirements.txt" "frontend/package.json" "frontend/src/App.js" "docker-compose.yml" "README.md" "START_HERE.md")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file"
    fi
done

echo ""
echo "=================================="
echo "Next Steps"
echo "=================================="
echo ""
echo "1. Read: START_HERE.md"
echo "2. Run: setup.sh (this script)"
echo "3. Start backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python app.py"
echo "4. Start frontend (new terminal):"
echo "   cd frontend"
echo "   npm start"
echo "5. Open: http://localhost:3000"
echo ""
echo "=================================="
echo "Documentation"
echo "=================================="
echo ""
echo "📖 START_HERE.md - Quick start guide"
echo "📖 INDEX.md - File navigation"
echo "📖 QUICKSTART.md - 5-minute setup"
echo "📖 README.md - Full documentation"
echo "📖 DEVELOPMENT.md - Development guide"
echo "📖 DEPLOYMENT.md - Production deployment"
echo "📖 TROUBLESHOOTING.md - Common issues"
echo ""

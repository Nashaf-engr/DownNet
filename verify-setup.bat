@echo off
REM verify-setup.bat - Verify DownNet installation (Windows)

echo ==================================
echo DownNet Setup Verification
echo ==================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do echo ✓ Python %%i
) else (
    echo ✗ Python not found
)

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('node --version') do echo ✓ Node.js %%i
) else (
    echo ✗ Node.js not found
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('npm --version') do echo ✓ npm %%i
) else (
    echo ✗ npm not found
)

REM Check Git
echo Checking Git installation...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Git found
) else (
    echo ~ Git not found (optional)
)

REM Check Docker
echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker found
) else (
    echo ~ Docker not found (optional)
)

echo.
echo ==================================
echo File Structure Verification
echo ==================================
echo.

REM Check directories
if exist "backend" (echo ✓ backend) else (echo ✗ backend)
if exist "frontend" (echo ✓ frontend) else (echo ✗ frontend)
if exist "frontend\src" (echo ✓ frontend\src) else (echo ✗ frontend\src)
if exist "frontend\src\components" (echo ✓ frontend\src\components) else (echo ✗ frontend\src\components)
if exist ".github\workflows" (echo ✓ .github\workflows) else (echo ✗ .github\workflows)

echo.
echo ==================================
echo Key Files Verification
echo ==================================
echo.

REM Check files
if exist "backend\app.py" (echo ✓ backend\app.py) else (echo ✗ backend\app.py)
if exist "backend\requirements.txt" (echo ✓ backend\requirements.txt) else (echo ✗ backend\requirements.txt)
if exist "frontend\package.json" (echo ✓ frontend\package.json) else (echo ✗ frontend\package.json)
if exist "frontend\src\App.js" (echo ✓ frontend\src\App.js) else (echo ✗ frontend\src\App.js)
if exist "docker-compose.yml" (echo ✓ docker-compose.yml) else (echo ✗ docker-compose.yml)
if exist "README.md" (echo ✓ README.md) else (echo ✗ README.md)
if exist "START_HERE.md" (echo ✓ START_HERE.md) else (echo ✗ START_HERE.md)

echo.
echo ==================================
echo Next Steps
echo ==================================
echo.
echo 1. Read: START_HERE.md
echo 2. Run: setup.bat
echo 3. Start backend:
echo    cd backend
echo    venv\Scripts\activate
echo    python app.py
echo 4. Start frontend (new terminal):
echo    cd frontend
echo    npm start
echo 5. Open: http://localhost:3000
echo.
echo ==================================
echo Documentation
echo ==================================
echo.
echo START_HERE.md - Quick start guide
echo INDEX.md - File navigation
echo QUICKSTART.md - 5-minute setup
echo README.md - Full documentation
echo DEVELOPMENT.md - Development guide
echo DEPLOYMENT.md - Production deployment
echo TROUBLESHOOTING.md - Common issues
echo.
pause

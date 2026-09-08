@echo off
echo ======================================
echo DownNet - Setup Script (Windows)
echo ======================================

REM Check Python installation
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo [OK] Python %PYTHON_VERSION% found

REM Check Node installation
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 14+
    pause
    exit /b 1
)

for /f %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Setup Backend
echo.
echo Setting up backend...
cd backend

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo [OK] Backend setup complete

REM Setup Frontend
echo.
echo Setting up frontend...
cd ..\frontend

echo Installing Node dependencies...
call npm install

echo [OK] Frontend setup complete

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo To start the application:
echo.
echo 1. Backend:
echo    cd backend
echo    venv\Scripts\activate
echo    python app.py
echo.
echo 2. Frontend (in another terminal):
echo    cd frontend
echo    npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause

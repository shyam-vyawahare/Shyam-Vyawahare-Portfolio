@echo off
title Shyam Vyawahare Portfolio Server
color 0A
cd /d "%~dp0"

echo ========================================
echo   Shyam Vyawahare Portfolio Server
echo ========================================
echo.

echo [Step 1/3] Checking Python installation...
py --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found!
    echo Please install Python from https://www.python.org/
    echo.
    pause
    exit /b 1
)
py --version
echo [OK] Python is installed
echo.

echo [Step 2/3] Checking dependencies...
py -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing required packages...
    py -m pip install --quiet --upgrade pip
    py -m pip install Flask==2.3.3 Flask-Mail==0.9.1 python-dotenv==1.0.0
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
) else (
    echo [OK] All dependencies are installed
)
echo.

echo [Step 3/3] Starting Flask server...
echo.
echo ========================================
echo   Server starting...
echo ========================================
echo.
echo   URL: http://localhost:5000
echo   Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

py app.py

if errorlevel 1 (
    echo.
    echo [ERROR] Server failed to start!
    echo Check the error messages above.
    echo.
    pause
)


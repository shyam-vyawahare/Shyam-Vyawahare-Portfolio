@echo off
echo ========================================
echo   Shyam Vyawahare Portfolio - Launcher
echo ========================================
echo.

echo [1/3] Checking Python...
py --version
if errorlevel 1 (
    echo ERROR: Python not found! Please install Python first.
    pause
    exit /b 1
)
echo.

echo [2/3] Installing/Updating dependencies...
py -m pip install --upgrade pip
py -m pip install Flask==2.3.3 Flask-Mail==0.9.1 python-dotenv==1.0.0
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo [3/3] Starting Flask server...
echo.
echo Server will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

py app.py

pause


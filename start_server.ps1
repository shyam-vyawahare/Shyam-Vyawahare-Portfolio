# PowerShell script to start Flask server
Write-Host "Checking Flask installation..." -ForegroundColor Yellow

# Try to import Flask
try {
    $result = python -c "import flask; print(flask.__version__)" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Flask not found. Installing..." -ForegroundColor Yellow
        python -m pip install Flask Flask-Mail python-dotenv
    } else {
        Write-Host "Flask is installed: $result" -ForegroundColor Green
    }
} catch {
    Write-Host "Error checking Flask: $_" -ForegroundColor Red
}

Write-Host "`nStarting Flask server on http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

# Start the Flask app
python app.py


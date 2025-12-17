#!/usr/bin/env python
"""Test script to verify Flask installation and run the server"""
import sys

print("Python version:", sys.version)
print("Python executable:", sys.executable)
print("\nAttempting to import Flask...")

try:
    import flask
    print(f"✓ Flask {flask.__version__} imported successfully")
except ImportError as e:
    print(f"✗ Flask import failed: {e}")
    print("\nInstalling Flask...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Flask", "Flask-Mail", "python-dotenv"])
    import flask
    print(f"✓ Flask {flask.__version__} now available")

print("\nStarting Flask server...")
print("=" * 50)

# Now import and run the app
from app import app

if __name__ == '__main__':
    print("\nServer starting on http://localhost:5000")
    print("Press Ctrl+C to stop the server\n")
    app.run(host='0.0.0.0', port=5000, debug=True)


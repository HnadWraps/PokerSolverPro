#!/usr/bin/env python3
import os
import sys
import webbrowser
import threading
import time
import subprocess
from flask import Flask, send_from_directory

# Configuration
FRONTEND_PORT = 3000  # React development server port
BACKEND_PORT = 5000   # Flask backend port
PRODUCTION_MODE = False  # Set to True when building for production

app = Flask(__name__, static_folder=None if PRODUCTION_MODE else '../frontend/build')

def start_react_dev_server():
    """Start the React development server (for development only)"""
    try:
        frontend_dir = os.path.join(os.path.dirname(__file__), '../frontend/poker-solver-gui')
        subprocess.Popen(['npm', 'start'], cwd=frontend_dir, shell=True)
    except Exception as e:
        print(f"Failed to start React server: {e}")
        sys.exit(1)

def start_browser():
    """Wait for server to start then open browser"""
    time.sleep(2)  # Give server time to start
    url = f"http://localhost:{FRONTEND_PORT}" if not PRODUCTION_MODE else f"http://localhost:{BACKEND_PORT}"
    webbrowser.open_new(url)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve static files from React build (production only)"""
    if PRODUCTION_MODE:
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    else:
        return "Development mode - using React dev server", 404

def start_flask_server():
    """Start the Flask server"""
    app.run(port=BACKEND_PORT, threaded=True)

def main():
    # Start the appropriate servers based on environment
    if not PRODUCTION_MODE:
        print("Starting in development mode...")
        threading.Thread(target=start_react_dev_server, daemon=True).start()
    else:
        print("Starting in production mode...")
    
    # Start Flask server (for API endpoints in both modes)
    threading.Thread(target=start_flask_server, daemon=True).start()
    
    # Open browser (only in production or if you want it in dev)
    if PRODUCTION_MODE:
        threading.Thread(target=start_browser, daemon=True).start()
    
    # Keep the main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")
        sys.exit(0)

if __name__ == '__main__':
    # Check if we're running in a PyInstaller bundle
    if getattr(sys, 'frozen', False):
        PRODUCTION_MODE = True
        app.static_folder = os.path.join(sys._MEIPASS, 'frontend/build')
    
    main()
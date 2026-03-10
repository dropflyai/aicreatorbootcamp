#!/bin/bash
# Start the REST API server

set -e

echo "Starting Prototype X1000 REST API..."

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Set environment variables (defaults)
export ENVIRONMENT=${ENVIRONMENT:-development}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8000}

# Start the server
echo "Starting server on ${HOST}:${PORT}..."
uvicorn main:app --host $HOST --port $PORT --reload
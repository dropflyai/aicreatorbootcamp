"""Simple REST API with health check endpoint.

A minimal FastAPI server providing health check functionality for the
Prototype X1000 Brain System.
"""

from datetime import datetime
from typing import Dict, Any
import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI(
    title="Prototype X1000 API",
    description="REST API for the Prototype X1000 Brain System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    timestamp: str
    version: str
    environment: str
    uptime: str

class DetailedHealthResponse(BaseModel):
    """Detailed health check response model."""
    status: str
    timestamp: str
    version: str
    environment: str
    uptime: str
    services: Dict[str, str]

# Store app start time for uptime calculation
app_start_time = datetime.utcnow()

@app.get("/", response_model=Dict[str, str])
async def root() -> Dict[str, str]:
    """Root endpoint with basic API information."""
    return {
        "message": "Prototype X1000 Brain System API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Basic health check endpoint.
    
    Returns:
        HealthResponse: Basic health status information
    """
    current_time = datetime.utcnow()
    uptime = str(current_time - app_start_time)
    
    return HealthResponse(
        status="healthy",
        timestamp=current_time.isoformat() + "Z",
        version="1.0.0",
        environment=os.getenv("ENVIRONMENT", "development"),
        uptime=uptime
    )

@app.get("/health/detailed", response_model=DetailedHealthResponse)
async def detailed_health_check() -> DetailedHealthResponse:
    """Detailed health check endpoint with service status.
    
    Returns:
        DetailedHealthResponse: Comprehensive health status information
    """
    current_time = datetime.utcnow()
    uptime = str(current_time - app_start_time)
    
    # Check various service components
    services = {}
    
    # Check Supabase connection
    try:
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
        if supabase_url and supabase_key:
            # Could add actual Supabase ping here
            services["supabase"] = "available"
        else:
            services["supabase"] = "not_configured"
    except Exception as e:
        services["supabase"] = f"error: {str(e)}"
    
    # Check brain agents
    try:
        from pathlib import Path
        brain_dirs = ["engineering_brain", "design_brain", "mba_brain", "options_trading_brain"]
        available_brains = []
        for brain_dir in brain_dirs:
            if Path(brain_dir).exists():
                available_brains.append(brain_dir.replace("_brain", ""))
        services["brain_agents"] = f"available: {', '.join(available_brains)}"
    except Exception as e:
        services["brain_agents"] = f"error: {str(e)}"
    
    # Check MCP server
    try:
        mcp_server_path = Path("mcp/brain_mcp_server.py")
        services["mcp_server"] = "available" if mcp_server_path.exists() else "not_found"
    except Exception as e:
        services["mcp_server"] = f"error: {str(e)}"
    
    return DetailedHealthResponse(
        status="healthy",
        timestamp=current_time.isoformat() + "Z",
        version="1.0.0",
        environment=os.getenv("ENVIRONMENT", "development"),
        uptime=uptime,
        services=services
    )

@app.get("/ping")
async def ping() -> Dict[str, str]:
    """Simple ping endpoint for basic connectivity testing.
    
    Returns:
        Dict[str, str]: Simple pong response
    """
    return {"message": "pong"}

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Handle 404 errors with JSON response."""
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": "The requested endpoint was not found",
            "path": str(request.url.path)
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    """Handle 500 errors with JSON response."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred"
        }
    )

def create_app() -> FastAPI:
    """Factory function to create the FastAPI app."""
    return app

if __name__ == "__main__":
    # For development - use uvicorn directly in production
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
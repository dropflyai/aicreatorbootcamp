"""FastAPI server for PX1000 agent system.

Run with: uvicorn agents.api.server:app --reload
"""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# --- Request/Response Models ---


class OrchestrationRequest(BaseModel):
    task: str
    context: str | None = None


class RunRequest(BaseModel):
    brain: str
    task: str
    context: str | None = None
    model: str | None = None
    direct: bool = False


class OrchestrationResponse(BaseModel):
    success: bool
    result: str
    brains_used: list[str]
    tokens_used: int


class RunResponse(BaseModel):
    success: bool
    content: str
    error: str | None = None
    tokens_used: int


class BrainInfo(BaseModel):
    name: str
    status: str
    description: str


class HealthResponse(BaseModel):
    status: str
    anthropic_configured: bool
    supabase_configured: bool
    brains_available: int


# --- Lifespan ---


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup: validate env
    from dotenv import load_dotenv

    load_dotenv()
    yield
    # shutdown: nothing needed


# --- App ---

app = FastAPI(
    title="PX1000 Agent System",
    description="Multi-agent orchestration API powered by 37 specialist brains",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routes ---


@app.get("/health", response_model=HealthResponse)
async def health():
    """System health check."""
    from agents.core import BrainLoader

    loader = BrainLoader()
    available = loader.get_available_brains()

    return HealthResponse(
        status="healthy",
        anthropic_configured=bool(os.environ.get("ANTHROPIC_API_KEY")),
        supabase_configured=bool(
            os.environ.get("SUPABASE_URL") and os.environ.get("SUPABASE_SERVICE_KEY")
        ),
        brains_available=len(available),
    )


@app.post("/orchestrate", response_model=OrchestrationResponse)
async def orchestrate(request: OrchestrationRequest):
    """Orchestrate a task across multiple brain agents via CEO."""
    from agents.ceo import CEOAgent

    try:
        ceo = CEOAgent()
        result = ceo.orchestrate(request.task, request.context)
        return OrchestrationResponse(
            success=result.success,
            result=result.final_synthesis,
            brains_used=result.brains_used,
            tokens_used=result.total_tokens,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@app.post("/run", response_model=RunResponse)
async def run_task(request: RunRequest):
    """Run a task against a specific brain (routes through CEO by default)."""
    if request.direct:
        from agents.specialists import SpecialistFactory

        try:
            agent = SpecialistFactory.create(request.brain, model=request.model)
            result = agent.run(request.task, request.context)
            return RunResponse(
                success=result.success,
                content=result.content,
                error=result.error,
                tokens_used=result.tokens_used,
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e)) from e
    else:
        from agents.ceo import CEOAgent

        try:
            ceo = CEOAgent(model=request.model)
            enhanced_context = (
                f"User specifically requested the {request.brain} brain for this task."
            )
            if request.context:
                enhanced_context += "\n\nAdditional context: " + request.context
            result = ceo.orchestrate(request.task, context=enhanced_context)
            return RunResponse(
                success=result.success,
                content=result.final_synthesis,
                tokens_used=result.total_tokens,
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e)) from e


@app.get("/brains", response_model=list[BrainInfo])
async def list_brains():
    """List all available brains."""
    from agents.core import BrainLoader
    from agents.specialists import SpecialistFactory

    loader = BrainLoader()
    available = loader.get_available_brains()

    brains = []
    for brain_name in sorted(available):
        brains.append(
            BrainInfo(
                name=brain_name,
                status="ready",
                description=SpecialistFactory.get_description(brain_name),
            )
        )
    return brains


@app.get("/brains/{brain_name}")
async def get_brain(brain_name: str):
    """Get details about a specific brain."""
    from agents.core import BrainLoader
    from agents.specialists import SpecialistFactory

    loader = BrainLoader()
    available = loader.get_available_brains()

    if brain_name not in available:
        raise HTTPException(status_code=404, detail=f"Brain '{brain_name}' not found")

    identity = loader.extract_identity(brain_name)
    rules = loader.extract_rules(brain_name)

    return {
        "name": brain_name,
        "status": "ready",
        "description": SpecialistFactory.get_description(brain_name),
        "identity": identity,
        "rules": rules,
    }


@app.get("/runs")
async def list_runs(
    brain: str | None = None,
    limit: int = 10,
    success_only: bool = False,
):
    """List recent agent runs from memory."""
    from agents.core import SupabaseMemoryClient

    try:
        memory = SupabaseMemoryClient()
        runs = memory.get_agent_runs(
            agent_type=brain, limit=limit, success_only=success_only
        )
        return {"runs": runs}
    except ValueError as e:
        raise HTTPException(status_code=503, detail="Supabase not configured") from e

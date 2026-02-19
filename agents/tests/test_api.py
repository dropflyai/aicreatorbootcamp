"""API endpoint tests for the PX1000 FastAPI server.

Uses httpx AsyncClient with the ASGI app for fast, in-process testing.
All external services (Anthropic, Supabase) are mocked.
"""

import os
from unittest.mock import MagicMock, patch

import pytest

# Set env before any imports
os.environ.setdefault("ANTHROPIC_API_KEY", "test-key-for-api-tests")


@pytest.fixture
def mock_anthropic_response():
    """Create a mock Anthropic API response."""
    mock_response = MagicMock()
    mock_response.content = [MagicMock(text="Test response from brain", type="text")]
    mock_response.stop_reason = "end_turn"
    mock_response.usage = MagicMock(input_tokens=100, output_tokens=50)
    return mock_response


@pytest.fixture
def mock_anthropic_client(mock_anthropic_response):
    """Mock the Anthropic client."""
    mock_client = MagicMock()
    mock_client.messages.create.return_value = mock_anthropic_response
    with patch("anthropic.Anthropic", return_value=mock_client):
        yield mock_client


class TestHealthEndpoint:
    @pytest.mark.asyncio
    async def test_health_returns_200(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "brains_available" in data

    @pytest.mark.asyncio
    async def test_health_reports_api_key_status(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.get("/health")
        data = response.json()
        assert data["anthropic_configured"] is True


class TestBrainsEndpoint:
    @pytest.mark.asyncio
    async def test_list_brains_returns_array(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.get("/brains")
        assert response.status_code == 200
        brains = response.json()
        assert isinstance(brains, list)
        assert len(brains) >= 37

    @pytest.mark.asyncio
    async def test_get_brain_details(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.get("/brains/engineering")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "engineering"

    @pytest.mark.asyncio
    async def test_get_nonexistent_brain_returns_404(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.get("/brains/nonexistent_brain_xyz")
        assert response.status_code == 404


class TestOrchestrateEndpoint:
    @pytest.mark.asyncio
    async def test_orchestrate_simple_task(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.post(
                "/orchestrate", json={"task": "Create a REST API endpoint"}
            )
        assert response.status_code == 200
        data = response.json()
        assert "success" in data
        assert "result" in data

    @pytest.mark.asyncio
    async def test_orchestrate_with_context(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.post(
                "/orchestrate",
                json={
                    "task": "Build a landing page",
                    "context": "Using Next.js and Tailwind",
                },
            )
        assert response.status_code == 200


class TestRunEndpoint:
    @pytest.mark.asyncio
    async def test_run_direct_mode(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.post(
                "/run",
                json={
                    "brain": "engineering",
                    "task": "Write a Python function",
                    "direct": True,
                },
            )
        assert response.status_code == 200
        data = response.json()
        assert "success" in data
        assert "content" in data

    @pytest.mark.asyncio
    async def test_run_via_ceo(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        async with AsyncClient(
            transport=ASGITransport(app=app), base_url="http://test"
        ) as client:
            response = await client.post(
                "/run",
                json={
                    "brain": "design",
                    "task": "Design a login form",
                },
            )
        assert response.status_code == 200


class TestRunsEndpoint:
    @pytest.mark.asyncio
    async def test_runs_without_supabase_returns_503(self, mock_anthropic_client):
        from httpx import ASGITransport, AsyncClient

        from agents.api.server import app

        # Without SUPABASE_URL set, should return 503
        with patch.dict(os.environ, {}, clear=False):
            os.environ.pop("SUPABASE_URL", None)
            os.environ.pop("SUPABASE_SERVICE_KEY", None)
            async with AsyncClient(
                transport=ASGITransport(app=app), base_url="http://test"
            ) as client:
                response = await client.get("/runs")
            assert response.status_code == 503

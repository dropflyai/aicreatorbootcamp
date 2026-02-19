"""Shared fixtures for the Prototype X1000 agents test suite.

All external services (Anthropic API, Supabase) are mocked so that tests
run without real credentials or network access.
"""

import textwrap
from unittest.mock import MagicMock, patch

import pytest

# ---------------------------------------------------------------------------
# API key fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def mock_api_key(monkeypatch):
    """Provide a fake Anthropic API key and inject it into the environment."""
    key = "test-api-key-xxx"
    monkeypatch.setenv("ANTHROPIC_API_KEY", key)
    return key


# ---------------------------------------------------------------------------
# Anthropic client fixture
# ---------------------------------------------------------------------------

@pytest.fixture()
def mock_anthropic_client():
    """Patch ``anthropic.Anthropic`` and return a mock client.

    The mock client exposes ``client.messages.create()`` which returns a
    response object with sensible defaults (``stop_reason="end_turn"``,
    one text block, and token usage).
    """
    mock_client = MagicMock()

    # Build a default response that looks like a real Anthropic response
    mock_response = MagicMock()
    mock_response.stop_reason = "end_turn"
    mock_text_block = MagicMock()
    mock_text_block.text = "Mock agent response content"
    mock_text_block.type = "text"
    mock_response.content = [mock_text_block]
    mock_response.usage = MagicMock(input_tokens=100, output_tokens=50)

    mock_client.messages.create.return_value = mock_response

    with patch("anthropic.Anthropic", return_value=mock_client):
        yield mock_client


# ---------------------------------------------------------------------------
# Supabase fixture
# ---------------------------------------------------------------------------

@pytest.fixture()
def mock_supabase():
    """Patch ``supabase.create_client`` and return a mock Supabase client.

    Supports the chained call pattern:
        client.table("x").insert(data).execute()
        client.table("x").select("*").eq(...).order(...).limit(...).execute()
    """
    mock_client = MagicMock()

    # Make the chained query builder fluent
    mock_query = MagicMock()
    mock_query.insert.return_value = mock_query
    mock_query.select.return_value = mock_query
    mock_query.eq.return_value = mock_query
    mock_query.gte.return_value = mock_query
    mock_query.contains.return_value = mock_query
    mock_query.ilike.return_value = mock_query
    mock_query.order.return_value = mock_query
    mock_query.limit.return_value = mock_query
    mock_query.single.return_value = mock_query
    mock_query.update.return_value = mock_query

    # Default execute() returns empty data
    mock_result = MagicMock()
    mock_result.data = []
    mock_query.execute.return_value = mock_result

    mock_client.table.return_value = mock_query

    with patch("agents.core.memory_client.create_client", return_value=mock_client):
        yield mock_client


# ---------------------------------------------------------------------------
# Sample data fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def sample_task():
    """Return a realistic sample task string."""
    return "Build a REST API endpoint"


@pytest.fixture()
def sample_brain_content():
    """Return a realistic CLAUDE.md string with Identity and Absolute Rules."""
    return textwrap.dedent("""\
        # Engineering Brain

        ## Identity

        You are a principal-level software engineer with deep expertise
        in building production systems. You prioritize correctness, clarity,
        and maintainability in everything you produce.

        ---

        ## Absolute Rules

        - Claims require evidence -- verify before asserting
        - If automation exists, you MUST use it
        - Never bypass governance or verification
        - Stop and report if verification cannot be completed
        - Log solutions to memory for future reference

        ---

        ## Capabilities

        - Backend and frontend engineering
        - Database design and migrations
        - CI/CD pipelines
    """)


# ---------------------------------------------------------------------------
# BrainLoader helpers
# ---------------------------------------------------------------------------

@pytest.fixture()
def tmp_brain_dir(tmp_path):
    """Create a temporary brain directory structure with CLAUDE.md files.

    Returns the root path (equivalent to BRAINS_ROOT / prototype_x1000/).
    """
    brains_root = tmp_path / "prototype_x1000"
    brains_root.mkdir()

    eng_dir = brains_root / "engineering_brain"
    eng_dir.mkdir()
    (eng_dir / "CLAUDE.md").write_text(textwrap.dedent("""\
        # Engineering Brain

        ## Identity

        Principal-level software engineer.

        ## Absolute Rules

        - Verify before asserting
        - Use automation when available
    """), encoding="utf-8")

    design_dir = brains_root / "design_brain"
    design_dir.mkdir()
    (design_dir / "CLAUDE.md").write_text(textwrap.dedent("""\
        # Design Brain

        ## Identity

        Senior product designer and UI specialist.

        ## Absolute Rules

        - Clarity beats clever
        - One primary action per screen
    """), encoding="utf-8")

    return brains_root


@pytest.fixture()
def brain_loader_with_mock(tmp_brain_dir):
    """Return a ``BrainLoader`` whose BRAINS_ROOT points at the temp dir."""
    from agents.core.brain_loader import BrainLoader

    loader = BrainLoader()
    # Override the class-level root to the temp directory
    loader.BRAINS_ROOT = tmp_brain_dir
    return loader

"""Tests for agents.core.memory_client.SupabaseMemoryClient and data models.

All Supabase interactions are mocked -- no real database access is required.
"""

from unittest.mock import patch

import pytest

from agents.core.memory_client import (
    AgentRun,
    Experience,
    Pattern,
    SupabaseMemoryClient,
)

# ---------------------------------------------------------------------------
# Pydantic model validation
# ---------------------------------------------------------------------------

class TestModels:
    """Tests for the Pydantic data models."""

    def test_experience_model_validation(self):
        exp = Experience(
            brain_type="engineering",
            category="success",
            task_summary="Built an API endpoint",
            problem="Needed a new endpoint",
            solution="Created REST route",
            outcome="Working endpoint",
            lessons_learned="Use async handlers",
            tags=["api", "rest"],
        )
        assert exp.brain_type == "engineering"
        assert exp.category == "success"
        assert "api" in exp.tags

    def test_agent_run_model_validation(self):
        run = AgentRun(
            agent_type="engineering",
            task_input="Create endpoint",
            task_output="Done",
            success=True,
            tool_calls=[{"name": "write_file", "input": {}}],
            tokens_used=250,
            model="claude-sonnet-4-20250514",
        )
        assert run.agent_type == "engineering"
        assert run.success is True
        assert run.tokens_used == 250

    def test_pattern_model_validation(self):
        pat = Pattern(
            brain_type="engineering",
            pattern_name="REST pagination",
            description="Standard pagination pattern for REST APIs",
            trigger_conditions=["list endpoint", "many records"],
            solution_template="Use cursor-based pagination",
            example_usages=["GET /users?cursor=abc"],
            observation_count=5,
            tags=["api", "pagination"],
        )
        assert pat.pattern_name == "REST pagination"
        assert pat.observation_count == 5


# ---------------------------------------------------------------------------
# SupabaseMemoryClient initialisation
# ---------------------------------------------------------------------------

class TestInit:
    """Tests for SupabaseMemoryClient.__init__()."""

    def test_init_requires_credentials(self):
        """Instantiation without URL and key raises ValueError."""
        with patch.dict("os.environ", {}, clear=True):
            with pytest.raises(ValueError, match="Supabase credentials required"):
                SupabaseMemoryClient()

    def test_init_with_explicit_credentials(self, mock_supabase):
        """Passing URL and key directly succeeds."""
        client = SupabaseMemoryClient(
            url="https://test.supabase.co",
            key="test-service-key",
        )
        assert client.url == "https://test.supabase.co"
        assert client.key == "test-service-key"


# ---------------------------------------------------------------------------
# Logging operations
# ---------------------------------------------------------------------------

class TestLogging:
    """Tests for log_agent_run and log_experience."""

    @pytest.fixture(autouse=True)
    def _setup(self, mock_supabase):
        self.supabase_client = mock_supabase
        self.memory = SupabaseMemoryClient(
            url="https://test.supabase.co",
            key="test-key",
        )

    def test_log_agent_run_calls_insert(self):
        run = AgentRun(
            agent_type="engineering",
            task_input="Build feature X",
            success=True,
        )
        run_id = self.memory.log_agent_run(run)

        assert isinstance(run_id, str)
        assert len(run_id) > 0
        self.supabase_client.table.assert_called_with("agent_runs")

    def test_log_experience_calls_insert(self):
        exp = Experience(
            brain_type="engineering",
            category="success",
            task_summary="Built an API",
        )
        exp_id = self.memory.log_experience(exp)

        assert isinstance(exp_id, str)
        assert len(exp_id) > 0
        self.supabase_client.table.assert_called_with("shared_experiences")


# ---------------------------------------------------------------------------
# Search operations
# ---------------------------------------------------------------------------

class TestSearch:
    """Tests for search_experiences."""

    @pytest.fixture(autouse=True)
    def _setup(self, mock_supabase):
        self.supabase_client = mock_supabase
        self.memory = SupabaseMemoryClient(
            url="https://test.supabase.co",
            key="test-key",
        )

    def test_search_experiences_with_filters(self):
        result = self.memory.search_experiences(
            brain_type="engineering",
            category="success",
            tags=["api"],
            search_text="endpoint",
            limit=5,
        )

        assert isinstance(result, list)
        # Verify the chained query methods were called
        table_mock = self.supabase_client.table.return_value
        table_mock.select.assert_called_with("*")
        table_mock.eq.assert_any_call("brain_type", "engineering")
        table_mock.eq.assert_any_call("category", "success")
        table_mock.contains.assert_called_with("tags", ["api"])
        table_mock.ilike.assert_called_with("task_summary", "%endpoint%")

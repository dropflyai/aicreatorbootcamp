"""Tests for agents.ceo.task_decomposer.TaskDecomposer.

All Anthropic API calls are mocked -- no real network access is required.
"""

import json
from unittest.mock import MagicMock, patch

import pytest

from agents.ceo.task_decomposer import DecomposedTask, TaskDecomposer


@pytest.fixture()
def decomposer():
    """Return a TaskDecomposer with a patched Anthropic client."""
    with patch("anthropic.Anthropic"):
        td = TaskDecomposer(api_key="test-key")
    return td


# ---------------------------------------------------------------------------
# is_simple_task
# ---------------------------------------------------------------------------


class TestIsSimpleTask:
    """Tests for TaskDecomposer.is_simple_task()."""

    def test_is_simple_task_short_task(self, decomposer):
        assert decomposer.is_simple_task("Add a button") is True

    def test_is_simple_task_bug_fix(self, decomposer):
        assert decomposer.is_simple_task("Fix the login bug in the auth module") is True

    def test_is_simple_task_complex_task_returns_false(self, decomposer):
        complex_task = (
            "Build a complete SaaS platform with user authentication, "
            "subscription billing, an admin dashboard, and email notifications "
            "that integrates with Stripe and sends weekly reports."
        )
        assert decomposer.is_simple_task(complex_task) is False


# ---------------------------------------------------------------------------
# get_primary_brain
# ---------------------------------------------------------------------------


class TestGetPrimaryBrain:
    """Tests for TaskDecomposer.get_primary_brain()."""

    def test_get_primary_brain_engineering(self, decomposer):
        assert decomposer.get_primary_brain("Create an API endpoint") == "engineering"

    def test_get_primary_brain_design(self, decomposer):
        assert decomposer.get_primary_brain("Design the UI layout") == "design"

    def test_get_primary_brain_default(self, decomposer):
        """Unrecognised tasks fall back to engineering."""
        assert (
            decomposer.get_primary_brain("do something unknown xyzzy") == "engineering"
        )

    def test_get_primary_brain_marketing(self, decomposer):
        assert decomposer.get_primary_brain("Run a marketing campaign") == "marketing"

    def test_get_primary_brain_sales(self, decomposer):
        assert decomposer.get_primary_brain("Close the sales deal") == "sales"


# ---------------------------------------------------------------------------
# decompose
# ---------------------------------------------------------------------------


class TestDecompose:
    """Tests for TaskDecomposer.decompose()."""

    def _make_api_response(self, text: str) -> MagicMock:
        """Build a mock Anthropic response containing *text*."""
        mock_block = MagicMock()
        mock_block.text = text
        mock_response = MagicMock()
        mock_response.content = [mock_block]
        return mock_response

    def test_decompose_with_mock_api(self, decomposer):
        """Successful JSON parsing path."""
        api_json = json.dumps(
            {
                "subtasks": [
                    {
                        "id": "task_1",
                        "description": "Design the database schema",
                        "required_brain": "engineering",
                        "dependencies": [],
                        "priority": 1,
                        "estimated_complexity": "medium",
                    },
                    {
                        "id": "task_2",
                        "description": "Design the UI wireframe",
                        "required_brain": "design",
                        "dependencies": ["task_1"],
                        "priority": 2,
                        "estimated_complexity": "high",
                    },
                ],
                "execution_order": ["task_1", "task_2"],
                "reasoning": "DB schema first, then UI.",
            }
        )

        decomposer.client.messages.create.return_value = self._make_api_response(
            f"```json\n{api_json}\n```"
        )

        result = decomposer.decompose("Build a user dashboard")

        assert isinstance(result, DecomposedTask)
        assert len(result.subtasks) == 2
        assert result.execution_order == ["task_1", "task_2"]
        assert result.subtasks[0].required_brain == "engineering"

    def test_decompose_fallback_on_parse_error(self, decomposer):
        """When the API returns non-JSON, the decomposer falls back to a
        single engineering subtask."""
        decomposer.client.messages.create.return_value = self._make_api_response(
            "I cannot produce JSON right now, sorry."
        )

        result = decomposer.decompose("Build something")

        assert len(result.subtasks) == 1
        assert result.subtasks[0].required_brain == "engineering"
        assert "single task" in result.reasoning.lower()

    def test_decompose_with_context(self, decomposer):
        """The context argument is forwarded into the prompt sent to the API."""
        api_json = json.dumps(
            {
                "subtasks": [
                    {
                        "id": "task_1",
                        "description": "Implement auth",
                        "required_brain": "engineering",
                        "dependencies": [],
                        "priority": 1,
                        "estimated_complexity": "low",
                    },
                ],
                "execution_order": ["task_1"],
                "reasoning": "Simple task.",
            }
        )

        decomposer.client.messages.create.return_value = self._make_api_response(
            f"```json\n{api_json}\n```"
        )

        result = decomposer.decompose(
            "Add authentication",
            context="This is a Flask backend using JWT tokens.",
        )

        assert isinstance(result, DecomposedTask)
        assert result.subtasks[0].description == "Implement auth"

        # Verify context was passed into the API call
        call_args = decomposer.client.messages.create.call_args
        prompt_text = call_args.kwargs["messages"][0]["content"]
        assert "Flask backend" in prompt_text

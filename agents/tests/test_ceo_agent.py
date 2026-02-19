"""Tests for agents.ceo.ceo_agent.CEOAgent.

All Anthropic API, Supabase, and specialist agent interactions are mocked.
"""

from unittest.mock import MagicMock, patch

import pytest

from agents.ceo.ceo_agent import CEOAgent, OrchestrationResult
from agents.ceo.task_decomposer import DecomposedTask, SubTask
from agents.core.base_agent import AgentResponse

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_mock_specialist(content: str = "specialist result", success: bool = True):
    """Return a mock specialist agent whose ``run()`` returns a canned response."""
    mock_agent = MagicMock()
    mock_agent.run.return_value = AgentResponse(
        content=content,
        success=success,
        error=None if success else "specialist error",
    )
    return mock_agent


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def ceo_agent(mock_api_key, mock_anthropic_client, mock_supabase):
    """Fully mocked CEOAgent."""
    with patch("agents.ceo.task_decomposer.anthropic.Anthropic"):
        agent = CEOAgent(api_key="test-key", auto_log=False)
    # Stub out brain loader so get_system_prompt does not touch the filesystem
    agent._system_prompt = "CEO system prompt"
    return agent


# ---------------------------------------------------------------------------
# orchestrate -- simple task path
# ---------------------------------------------------------------------------

class TestOrchestrateSimple:
    """Tests for the simple-task (skip decomposition) branch."""

    def test_orchestrate_simple_task(self, ceo_agent):
        """For a simple task the CEO delegates directly to one brain
        without decomposition."""
        mock_spec = _make_mock_specialist("API created")
        with patch.object(ceo_agent, "_get_specialist", return_value=mock_spec):
            result = ceo_agent.orchestrate("Add a button", skip_decomposition=True)

        assert isinstance(result, OrchestrationResult)
        assert result.success is True
        assert "API created" in result.final_synthesis


# ---------------------------------------------------------------------------
# orchestrate -- complex task path
# ---------------------------------------------------------------------------

class TestOrchestrateComplex:
    """Tests for the decompose + delegate branch."""

    def test_orchestrate_complex_task(self, ceo_agent):
        """For a complex task the CEO decomposes, delegates each subtask, and
        synthesises the results."""
        decomposed = DecomposedTask(
            original_task="Build a SaaS platform",
            subtasks=[
                SubTask(
                    id="task_1",
                    description="Design DB schema",
                    required_brain="engineering",
                    dependencies=[],
                    priority=1,
                ),
                SubTask(
                    id="task_2",
                    description="Design UI",
                    required_brain="design",
                    dependencies=["task_1"],
                    priority=2,
                ),
            ],
            execution_order=["task_1", "task_2"],
            reasoning="Schema first, then UI",
        )

        ceo_agent.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo_agent.decomposer.decompose = MagicMock(return_value=decomposed)

        mock_spec = _make_mock_specialist("Done")
        with patch.object(ceo_agent, "_get_specialist", return_value=mock_spec):
            # Mock the synthesis call
            mock_synth_block = MagicMock()
            mock_synth_block.text = "Final synthesis"
            mock_synth_response = MagicMock()
            mock_synth_response.content = [mock_synth_block]
            ceo_agent.client.messages.create.return_value = mock_synth_response

            result = ceo_agent.orchestrate("Build a SaaS platform")

        assert result.success is True
        assert len(result.subtask_results) == 2
        assert "engineering" in result.brains_used or "design" in result.brains_used


# ---------------------------------------------------------------------------
# _synthesize
# ---------------------------------------------------------------------------

class TestSynthesize:
    """Tests for CEOAgent._synthesize()."""

    def test_synthesize_single_result(self, ceo_agent):
        """With exactly one subtask result, synthesis returns it directly."""
        synthesis = ceo_agent._synthesize("task", {"only": "single result"})
        assert synthesis == "single result"

    def test_synthesize_multiple_results(self, ceo_agent):
        """With multiple results, Claude is called to create a synthesis."""
        mock_block = MagicMock()
        mock_block.text = "Synthesized output"
        mock_response = MagicMock()
        mock_response.content = [mock_block]
        ceo_agent.client.messages.create.return_value = mock_response

        synthesis = ceo_agent._synthesize(
            "Build X",
            {"task_1": "Schema done", "task_2": "UI done"},
        )

        assert synthesis == "Synthesized output"
        ceo_agent.client.messages.create.assert_called_once()

    def test_synthesize_empty_results(self, ceo_agent):
        result = ceo_agent._synthesize("task", {})
        assert "No subtasks" in result


# ---------------------------------------------------------------------------
# _delegate_to_brain
# ---------------------------------------------------------------------------

class TestDelegateToBrain:
    """Tests for CEOAgent._delegate_to_brain()."""

    def test_delegate_to_brain_success(self, ceo_agent):
        mock_spec = _make_mock_specialist("success content")
        with patch.object(ceo_agent, "_get_specialist", return_value=mock_spec):
            result = ceo_agent._delegate_to_brain("engineering", "Do work")
        assert result == "success content"

    def test_delegate_to_brain_failure(self, ceo_agent):
        mock_spec = _make_mock_specialist("", success=False)
        mock_spec.run.return_value = AgentResponse(
            content="", success=False, error="something broke"
        )
        with patch.object(ceo_agent, "_get_specialist", return_value=mock_spec):
            result = ceo_agent._delegate_to_brain("engineering", "Do work")
        assert "Error" in result


# ---------------------------------------------------------------------------
# run (override)
# ---------------------------------------------------------------------------

class TestRunOverride:
    """Tests for CEOAgent.run() which delegates to orchestrate."""

    def test_run_delegates_to_orchestrate(self, ceo_agent):
        mock_orch_result = OrchestrationResult(
            task="test",
            final_synthesis="Orchestrated result",
            success=True,
        )
        with patch.object(ceo_agent, "orchestrate", return_value=mock_orch_result):
            result = ceo_agent.run("test task")

        assert isinstance(result, AgentResponse)
        assert result.content == "Orchestrated result"
        assert result.success is True

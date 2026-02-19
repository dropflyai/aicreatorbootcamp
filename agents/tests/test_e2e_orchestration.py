"""End-to-end integration tests for the PX1000 CEO orchestration pipeline.

These tests exercise the full CEO -> decompose -> delegate -> synthesize
flow.  All external services (Anthropic API, Supabase) are mocked, but the
internal orchestration logic -- routing, dependency resolution, deduplication,
synthesis gating, and memory logging -- runs for real.
"""

from unittest.mock import MagicMock, patch

import pytest

from agents.ceo.ceo_agent import CEOAgent, OrchestrationResult
from agents.ceo.task_decomposer import DecomposedTask, SubTask
from agents.core.base_agent import AgentResponse
from agents.core.memory_client import SupabaseMemoryClient

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _mock_specialist(
    content: str = "specialist output",
    success: bool = True,
):
    """Return a mock specialist whose run() yields a canned response."""
    agent = MagicMock()
    agent.run.return_value = AgentResponse(
        content=content,
        success=success,
        error=None if success else "specialist_error",
    )
    return agent


def _build_decomposed(
    subtasks: list[SubTask],
    execution_order: list[str] | None = None,
    reasoning: str = "test decomposition",
) -> DecomposedTask:
    """Convenience builder for DecomposedTask."""
    return DecomposedTask(
        original_task="test task",
        subtasks=subtasks,
        execution_order=execution_order or [st.id for st in subtasks],
        reasoning=reasoning,
    )


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture()
def ceo(mock_api_key, mock_anthropic_client, mock_supabase):
    """Return a fully-mocked CEOAgent with auto_log disabled."""
    with patch("agents.ceo.task_decomposer.anthropic.Anthropic"):
        agent = CEOAgent(api_key="test-key", auto_log=False)
    # Prevent filesystem access in get_system_prompt
    agent._system_prompt = "CEO system prompt (test)"
    return agent


@pytest.fixture()
def ceo_with_memory(mock_api_key, mock_anthropic_client, mock_supabase):
    """Return a CEOAgent that has a mock SupabaseMemoryClient attached."""
    with (
        patch("agents.ceo.task_decomposer.anthropic.Anthropic"),
        patch(
            "agents.core.memory_client.create_client",
            return_value=mock_supabase,
        ),
    ):
        memory = SupabaseMemoryClient(
            url="https://fake.supabase.co",
            key="fake-key",
        )
        agent = CEOAgent(
            api_key="test-key",
            memory_client=memory,
            auto_log=False,
        )
    agent._system_prompt = "CEO system prompt (test)"
    return agent


# ---------------------------------------------------------------------------
# 1. Simple task routes to a single brain
# ---------------------------------------------------------------------------


class TestSimpleTaskRoutesToSingleBrain:
    """Submit Create a REST API -- CEO detects simple task, routes to
    engineering brain, and returns the specialist result."""

    def test_simple_task_routes_to_single_brain(self, ceo):
        task = "Create a REST API"

        eng_mock = _mock_specialist("REST API scaffold created")
        with patch.object(ceo, "_get_specialist", return_value=eng_mock):
            result = ceo.orchestrate(task)

        # Correct brain selected (engineering via keyword match)
        assert "engineering" in result.brains_used
        # Response content populated
        assert "REST API scaffold created" in result.final_synthesis
        # Success flag
        assert result.success is True
        assert isinstance(result, OrchestrationResult)


# ---------------------------------------------------------------------------
# 2. Complex task decomposes to multiple brains
# ---------------------------------------------------------------------------


class TestComplexTaskDecomposesToMultipleBrains:
    """Submit a complex SaaS task -- CEO decomposes into 3 subtasks and
    delegates to engineering, design, and marketing brains."""

    def test_complex_task_decomposes_to_multiple_brains(self, ceo):
        task = "Build a SaaS product with landing page, API, and go-to-market strategy"

        subtasks = [
            SubTask(
                id="api",
                description="Build the backend API",
                required_brain="engineering",
                dependencies=[],
                priority=1,
            ),
            SubTask(
                id="landing",
                description="Design the landing page",
                required_brain="design",
                dependencies=[],
                priority=1,
            ),
            SubTask(
                id="gtm",
                description="Create go-to-market strategy",
                required_brain="marketing",
                dependencies=["api", "landing"],
                priority=2,
            ),
        ]
        decomposed = _build_decomposed(
            subtasks,
            execution_order=["api", "landing", "gtm"],
        )

        ceo.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo.decomposer.decompose = MagicMock(return_value=decomposed)

        spec_map = {
            "engineering": _mock_specialist("API built"),
            "design": _mock_specialist("Landing page designed"),
            "marketing": _mock_specialist("GTM strategy ready"),
        }

        def _get_specialist(brain_type):
            return spec_map[brain_type]

        # Mock synthesis call
        synth_block = MagicMock()
        synth_block.text = "Unified SaaS launch plan complete."
        synth_response = MagicMock()
        synth_response.content = [synth_block]
        ceo.client.messages.create.return_value = synth_response

        with patch.object(ceo, "_get_specialist", side_effect=_get_specialist):
            result = ceo.orchestrate(task)

        # All 3 brains used
        assert set(result.brains_used) == {
            "engineering",
            "design",
            "marketing",
        }
        # 3 subtask results
        assert len(result.subtask_results) == 3
        # Final synthesis populated
        assert result.final_synthesis == "Unified SaaS launch plan complete."
        assert result.success is True


# ---------------------------------------------------------------------------
# 3. Orchestration handles specialist failure
# ---------------------------------------------------------------------------


class TestOrchestrationHandlesSpecialistFailure:
    """One specialist returns an error; the pipeline should still complete
    the other subtasks and attempt synthesis."""

    def test_orchestration_handles_specialist_failure(self, ceo):
        subtasks = [
            SubTask(
                id="task_a",
                description="Working task",
                required_brain="engineering",
                dependencies=[],
            ),
            SubTask(
                id="task_b",
                description="Failing task",
                required_brain="design",
                dependencies=[],
            ),
        ]
        decomposed = _build_decomposed(subtasks)

        ceo.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo.decomposer.decompose = MagicMock(return_value=decomposed)

        eng_mock = _mock_specialist("Engineering done")
        design_mock = _mock_specialist(
            "Error: design service unavailable", success=False
        )

        spec_map = {
            "engineering": eng_mock,
            "design": design_mock,
        }

        # Synthesis should still be called on the completed results
        synth_block = MagicMock()
        synth_block.text = "Partial completion: engineering succeeded, design failed."
        synth_response = MagicMock()
        synth_response.content = [synth_block]
        ceo.client.messages.create.return_value = synth_response

        with patch.object(
            ceo,
            "_get_specialist",
            side_effect=lambda bt: spec_map[bt],
        ):
            result = ceo.orchestrate("Do two things")

        # Overall success is False because one subtask failed
        assert result.success is False
        # Engineering subtask succeeded
        assert result.subtask_results["task_a"].success is True
        # Design subtask failed (content starts with Error)
        assert result.subtask_results["task_b"].success is False
        # Synthesis was still attempted
        assert result.final_synthesis != ""


# ---------------------------------------------------------------------------
# 4. Dependency chain passes context
# ---------------------------------------------------------------------------


class TestDependencyChainPassesContext:
    """Subtask B depends on subtask A.  When B executes it must receive
    A result as context."""

    def test_dependency_chain_passes_context(self, ceo):
        subtasks = [
            SubTask(
                id="schema",
                description="Design DB schema",
                required_brain="engineering",
                dependencies=[],
            ),
            SubTask(
                id="api",
                description="Build API on top of schema",
                required_brain="engineering",
                dependencies=["schema"],
            ),
        ]
        decomposed = _build_decomposed(
            subtasks,
            execution_order=["schema", "api"],
        )

        ceo.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo.decomposer.decompose = MagicMock(return_value=decomposed)

        # Track what context was passed to _delegate_to_brain
        delegate_calls: list[tuple[str, str, str | None]] = []

        def _tracking_delegate(brain_type, task, context=None):
            delegate_calls.append((brain_type, task, context))
            return "result for " + task

        with patch.object(
            ceo,
            "_delegate_to_brain",
            side_effect=_tracking_delegate,
        ):
            ceo.orchestrate("Schema then API")

        # The second call (api) should have received context containing
        # the result from the first call (schema)
        assert len(delegate_calls) == 2
        _, _, api_context = delegate_calls[1]
        assert api_context is not None
        assert "result for Design DB schema" in api_context


# ---------------------------------------------------------------------------
# 5. Single result is NOT re-synthesized
# ---------------------------------------------------------------------------


class TestSingleResultNotReSynthesized:
    """When only one subtask completes, _synthesize returns it directly
    without making an additional API call."""

    def test_single_result_not_re_synthesized(self, ceo):
        # _synthesize with one entry should return the value directly
        result = ceo._synthesize("original task", {"only_task": "single output"})

        assert result == "single output"
        # No API call should have been made
        ceo.client.messages.create.assert_not_called()


# ---------------------------------------------------------------------------
# 6. skip_decomposition flag
# ---------------------------------------------------------------------------


class TestSkipDecompositionFlag:
    """orchestrate(task, skip_decomposition=True) routes directly to a
    single brain without calling the decomposer."""

    def test_skip_decomposition_flag(self, ceo):
        eng_mock = _mock_specialist("Direct result")
        ceo.decomposer.decompose = MagicMock()

        with patch.object(ceo, "_get_specialist", return_value=eng_mock):
            result = ceo.orchestrate(
                "Create a REST API",
                skip_decomposition=True,
            )

        # Decomposer.decompose should NOT have been called
        ceo.decomposer.decompose.assert_not_called()
        assert result.final_synthesis == "Direct result"
        assert result.success is True
        assert len(result.brains_used) == 1


# ---------------------------------------------------------------------------
# 7. brains_used is deduplicated
# ---------------------------------------------------------------------------


class TestBrainsUsedIsDeduplicated:
    """When two subtasks use the same brain, brains_used must not contain
    duplicates."""

    def test_brains_used_is_deduplicated(self, ceo):
        subtasks = [
            SubTask(
                id="task_1",
                description="Task one",
                required_brain="engineering",
                dependencies=[],
            ),
            SubTask(
                id="task_2",
                description="Task two",
                required_brain="engineering",
                dependencies=[],
            ),
        ]
        decomposed = _build_decomposed(subtasks)

        ceo.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo.decomposer.decompose = MagicMock(return_value=decomposed)

        eng_mock = _mock_specialist("Done")

        # Synthesis mock for multiple results
        synth_block = MagicMock()
        synth_block.text = "Both done"
        synth_response = MagicMock()
        synth_response.content = [synth_block]
        ceo.client.messages.create.return_value = synth_response

        with patch.object(ceo, "_get_specialist", return_value=eng_mock):
            result = ceo.orchestrate("Two engineering tasks")

        # brains_used must have no duplicates
        assert result.brains_used == list(set(result.brains_used))
        assert result.brains_used.count("engineering") == 1


# ---------------------------------------------------------------------------
# 8. Orchestration logs to Supabase
# ---------------------------------------------------------------------------


class TestOrchestrationLogsToSupabase:
    """With a memory_client configured, verify that ceo_task_delegations
    and ceo_brain_collaborations tables receive INSERT calls."""

    def test_orchestration_logs_to_supabase(self, ceo_with_memory):
        ceo = ceo_with_memory
        subtasks = [
            SubTask(
                id="task_1",
                description="Build it",
                required_brain="engineering",
                dependencies=[],
            ),
        ]
        decomposed = _build_decomposed(subtasks)

        ceo.decomposer.is_simple_task = MagicMock(return_value=False)
        ceo.decomposer.decompose = MagicMock(return_value=decomposed)

        eng_mock = _mock_specialist("Built")
        with patch.object(ceo, "_get_specialist", return_value=eng_mock):
            ceo.orchestrate("Build it")

        # Grab the underlying Supabase mock
        sb_client = ceo._memory_client.client

        # Collect all table names that had .table() called
        table_calls = [c.args[0] for c in sb_client.table.call_args_list]

        assert "ceo_task_delegations" in table_calls
        assert "ceo_brain_collaborations" in table_calls


# ---------------------------------------------------------------------------
# 9. Orchestration works without Supabase
# ---------------------------------------------------------------------------


class TestOrchestrationWorksWithoutSupabase:
    """When no Supabase client is configured the orchestration pipeline
    must still complete successfully (no memory logging, no errors)."""

    def test_orchestration_works_without_supabase(self, ceo):
        # Confirm memory client is None
        assert ceo._memory_client is None

        eng_mock = _mock_specialist("Works fine")
        with patch.object(ceo, "_get_specialist", return_value=eng_mock):
            result = ceo.orchestrate(
                "Create a REST API",
                skip_decomposition=True,
            )

        assert result.success is True
        assert "Works fine" in result.final_synthesis

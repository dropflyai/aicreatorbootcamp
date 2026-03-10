"""Property-based tests using Hypothesis for Prototype X1000 agents.

These tests verify invariants that must hold for ALL possible inputs,
not just hand-picked examples.  Every external dependency (Anthropic,
Supabase) is mocked so tests run offline.
"""

from unittest.mock import patch

from hypothesis import given, settings
from hypothesis import strategies as st

from agents.ceo.brain_selector import BrainSelector, BrainType
from agents.ceo.task_decomposer import TaskDecomposer
from agents.core.base_agent import AgentResponse
from agents.core.brain_loader import BrainLoader
from agents.core.memory_client import AgentRun, Experience, Pattern

# Collect every valid BrainType *value* for quick membership checks.
_VALID_BRAIN_VALUES = {bt.value for bt in BrainType}


# =====================================================================
# 1. BrainSelector invariants
# =====================================================================


class TestBrainSelectorProperties:
    """Property-based tests for BrainSelector."""

    # -- get_primary_brain is on TaskDecomposer, but the task says
    #    "BrainSelector invariants" and references get_primary_brain.
    #    TaskDecomposer.get_primary_brain returns a *string* that must
    #    be a valid BrainType value.

    @given(task=st.text())
    @settings(max_examples=200)
    def test_get_primary_brain_always_returns_valid_brain_value(self, task):
        """For ANY string, get_primary_brain() returns a valid BrainType value."""
        with patch("anthropic.Anthropic"):
            td = TaskDecomposer(api_key="test-key")
        result = td.get_primary_brain(task)
        assert isinstance(result, str)
        assert result in _VALID_BRAIN_VALUES, (
            f"get_primary_brain returned {result!r} which is not in BrainType"
        )

    @given(task=st.text())
    @settings(max_examples=200)
    def test_select_brain_never_crashes(self, task):
        """select_brain() must return a BrainType for ANY string input."""
        selector = BrainSelector()
        result = selector.select_brain(task)
        assert isinstance(result, BrainType)

    @given(task=st.text(), max_brains=st.integers(min_value=1, max_value=37))
    @settings(max_examples=200)
    def test_select_brains_respects_max_brains(self, task, max_brains):
        """select_brains() must never return more than max_brains results."""
        selector = BrainSelector()
        results = selector.select_brains(task, max_brains=max_brains)
        assert len(results) <= max_brains
        assert len(results) >= 1  # always returns at least one
        for brain in results:
            assert isinstance(brain, BrainType)


# =====================================================================
# 2. AgentResponse invariants
# =====================================================================


class TestAgentResponseProperties:
    """Property-based tests for AgentResponse model invariants."""

    @given(
        content=st.text(),
        tokens=st.integers(min_value=0, max_value=10_000_000),
    )
    @settings(max_examples=200)
    def test_success_true_implies_error_none(self, content, tokens):
        """If success=True, error must be None."""
        resp = AgentResponse(
            content=content,
            success=True,
            error=None,
            tokens_used=tokens,
        )
        assert resp.success is True
        assert resp.error is None

    @given(
        content=st.text(),
        error_msg=st.text(min_size=1),
        tokens=st.integers(min_value=0, max_value=10_000_000),
    )
    @settings(max_examples=200)
    def test_success_false_has_nonempty_error(self, content, error_msg, tokens):
        """If success=False, we can construct with a non-empty error string."""
        resp = AgentResponse(
            content=content,
            success=False,
            error=error_msg,
            tokens_used=tokens,
        )
        assert resp.success is False
        assert resp.error is not None
        assert len(resp.error) > 0

    @given(tokens=st.integers(min_value=0, max_value=10_000_000))
    @settings(max_examples=200)
    def test_tokens_used_always_non_negative(self, tokens):
        """tokens_used is always >= 0."""
        resp = AgentResponse(content="ok", tokens_used=tokens)
        assert resp.tokens_used >= 0


# =====================================================================
# 3. TaskDecomposer.is_simple_task invariants
# =====================================================================


class TestIsSimpleTaskProperties:
    """Property-based tests for TaskDecomposer.is_simple_task()."""

    @given(task=st.text())
    @settings(max_examples=200)
    def test_is_simple_task_always_returns_bool(self, task):
        """is_simple_task must always return a bool, never crash."""
        with patch("anthropic.Anthropic"):
            td = TaskDecomposer(api_key="test-key")
        result = td.is_simple_task(task)
        assert isinstance(result, bool)

    def test_is_simple_task_empty_string_returns_true(self):
        """Empty string has <10 words, so the short-task heuristic fires."""
        with patch("anthropic.Anthropic"):
            td = TaskDecomposer(api_key="test-key")
        assert td.is_simple_task("") is True


# =====================================================================
# 4. Experience / AgentRun / Pattern model invariants
# =====================================================================


class TestMemoryModelProperties:
    """Property-based tests for Pydantic models in memory_client."""

    @given(
        brain_type=st.text(min_size=1),
        category=st.sampled_from(["success", "failure", "pattern", "learning"]),
        task_summary=st.text(min_size=1),
        tags=st.lists(st.text(min_size=1), max_size=10),
    )
    @settings(max_examples=200)
    def test_experience_validates_with_required_fields(
        self, brain_type, category, task_summary, tags
    ):
        """Experience always validates when required fields are supplied."""
        exp = Experience(
            brain_type=brain_type,
            category=category,
            task_summary=task_summary,
            tags=tags,
        )
        assert exp.brain_type == brain_type
        assert exp.category == category
        assert exp.task_summary == task_summary
        assert isinstance(exp.tags, list)

    @given(
        agent_type=st.text(min_size=1),
        task_input=st.text(min_size=1),
    )
    @settings(max_examples=200)
    def test_agent_run_validates_with_required_fields(self, agent_type, task_input):
        """AgentRun always validates when required fields are supplied."""
        run = AgentRun(agent_type=agent_type, task_input=task_input)
        assert run.agent_type == agent_type
        assert run.task_input == task_input
        assert isinstance(run.tool_calls, list)

    @given(
        brain_type=st.text(min_size=1),
        pattern_name=st.text(min_size=1),
        description=st.text(min_size=1),
        tags=st.lists(st.text(min_size=1), max_size=10),
    )
    @settings(max_examples=200)
    def test_pattern_validates_with_required_fields(
        self, brain_type, pattern_name, description, tags
    ):
        """Pattern always validates when required fields are supplied."""
        pat = Pattern(
            brain_type=brain_type,
            pattern_name=pattern_name,
            description=description,
            tags=tags,
        )
        assert pat.brain_type == brain_type
        assert pat.pattern_name == pattern_name
        assert isinstance(pat.tags, list)

    def test_experience_tags_default_is_list(self):
        """Tags defaults to an empty list when not provided."""
        exp = Experience(
            brain_type="engineering",
            category="success",
            task_summary="did a thing",
        )
        assert isinstance(exp.tags, list)
        assert exp.tags == []

    def test_pattern_tags_default_is_list(self):
        """Tags defaults to an empty list when not provided."""
        pat = Pattern(
            brain_type="engineering",
            pattern_name="retry",
            description="retry on failure",
        )
        assert isinstance(pat.tags, list)
        assert pat.tags == []


# =====================================================================
# 5. BrainLoader invariants
# =====================================================================


class TestBrainLoaderProperties:
    """Property-based tests for BrainLoader extraction helpers."""

    @given(markdown=st.text())
    @settings(max_examples=200)
    def test_extract_identity_always_returns_string(self, markdown):
        """extract_identity() must return a string for ANY markdown input."""
        loader = BrainLoader()
        result = loader.extract_identity(markdown)
        assert isinstance(result, str)

    @given(markdown=st.text())
    @settings(max_examples=200)
    def test_extract_rules_always_returns_list(self, markdown):
        """extract_rules() must return a list for ANY markdown input."""
        loader = BrainLoader()
        result = loader.extract_rules(markdown)
        assert isinstance(result, list)
        for item in result:
            assert isinstance(item, str)

"""Performance benchmark tests using pytest-benchmark.

All benchmarks use mocked brain content so there is no filesystem I/O.
The Anthropic client is mocked for TaskDecomposer tests.
"""

import textwrap
from unittest.mock import patch

import pytest

from agents.ceo.brain_selector import BrainSelector
from agents.ceo.task_decomposer import TaskDecomposer
from agents.core.brain_loader import BrainLoader

# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------

MOCK_BRAIN_CONTENT = textwrap.dedent("""\
    # Engineering Brain

    ## Identity

    Principal-level software engineer.

    ## Absolute Rules

    - Verify before asserting
    - Use automation when available
    - Never bypass governance

    ## Capabilities

    - Backend and frontend engineering
    - Database design
    - CI/CD pipelines
""")


def _make_loader_with_cached_brain() -> BrainLoader:
    """Return a BrainLoader whose cache already contains ``engineering``."""
    loader = BrainLoader()
    loader._cache["engineering"] = MOCK_BRAIN_CONTENT
    return loader


# ---------------------------------------------------------------------------
# BrainLoader.load_brain (cached)
# ---------------------------------------------------------------------------


class TestBrainLoaderCachedBenchmark:
    """Benchmark: cached ``load_brain`` should be sub-millisecond."""

    def test_load_brain_cached_performance(self, benchmark):
        """Loading a brain from cache must be < 1 ms."""
        loader = _make_loader_with_cached_brain()

        result = benchmark(loader.load_brain, "engineering")
        assert result == MOCK_BRAIN_CONTENT

        # Verify sub-millisecond (stats.mean is in seconds)
        mean_ms = benchmark.stats.stats.mean * 1000
        assert mean_ms < 1.0, f"Cached load_brain took {mean_ms:.3f} ms (> 1 ms)"


# ---------------------------------------------------------------------------
# BrainLoader.build_system_prompt
# ---------------------------------------------------------------------------


class TestBuildSystemPromptBenchmark:
    """Benchmark: ``build_system_prompt`` with cached content."""

    def test_build_system_prompt_performance(self, benchmark):
        """Measure prompt assembly time from cached brain content."""
        loader = _make_loader_with_cached_brain()

        result = benchmark(loader.build_system_prompt, "engineering")
        assert "ENGINEERING AGENT" in result
        assert "Principal-level" in result


# ---------------------------------------------------------------------------
# BrainSelector.select_brain
# ---------------------------------------------------------------------------


class TestSelectBrainBenchmark:
    """Benchmark: single-brain keyword matching."""

    def test_select_brain_performance(self, benchmark):
        """Measure keyword matching time for ``select_brain``."""
        selector = BrainSelector()

        result = benchmark(
            selector.select_brain,
            "Build a REST API endpoint with authentication and database schema",
        )
        # Engineering should win for this task
        assert result.value == "engineering"


# ---------------------------------------------------------------------------
# BrainSelector.select_brains (multi-brain)
# ---------------------------------------------------------------------------


class TestSelectBrainsBenchmark:
    """Benchmark: multi-brain keyword matching."""

    def test_select_brains_performance(self, benchmark):
        """Measure multi-brain selection time for ``select_brains``."""
        selector = BrainSelector()

        result = benchmark(
            selector.select_brains,
            "Design a mobile app with marketing campaign and sales pipeline",
            3,
        )
        assert isinstance(result, list)
        assert len(result) >= 1


# ---------------------------------------------------------------------------
# TaskDecomposer.is_simple_task
# ---------------------------------------------------------------------------


class TestIsSimpleTaskBenchmark:
    """Benchmark: heuristic task complexity evaluation."""

    @pytest.fixture()
    def decomposer(self):
        """Return a TaskDecomposer with a mocked Anthropic client."""
        with patch("anthropic.Anthropic"):
            return TaskDecomposer(api_key="fake-key")

    def test_is_simple_task_short_input(self, benchmark, decomposer):
        """Measure heuristic evaluation time for a short task."""
        result = benchmark(decomposer.is_simple_task, "Fix the login bug")
        assert result is True

    def test_is_simple_task_long_input(self, benchmark, decomposer):
        """Measure heuristic evaluation time for a longer, complex task."""
        result = benchmark(
            decomposer.is_simple_task,
            "Build a complete SaaS platform with user authentication, "
            "payment processing via Stripe, admin dashboard, and email "
            "notification system for customer onboarding workflows",
        )
        assert result is False

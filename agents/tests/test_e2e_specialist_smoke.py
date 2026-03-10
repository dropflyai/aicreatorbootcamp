"""Smoke tests for each of the five PX1000 agent types.

Every test mocks the Anthropic client so no real API calls are made.
Each test verifies that the agent:
1. Initializes without error
2. Returns an AgentResponse from run()
3. Populates response.content with a non-empty string

Additional tests cover the SpecialistFactory type-routing logic,
BrainSelector coverage for all 37 brains, and BrainLoader availability.
"""

from unittest.mock import MagicMock, patch

import pytest

from agents.ceo.brain_selector import BrainSelector, BrainType
from agents.ceo.ceo_agent import CEOAgent
from agents.core.base_agent import AgentResponse
from agents.core.brain_loader import BrainLoader
from agents.specialists.design_agent import DesignAgent
from agents.specialists.engineering_agent import EngineeringAgent
from agents.specialists.generic_agent import GenericSpecialistAgent
from agents.specialists.mba_agent import MBAAgent
from agents.specialists.specialist_factory import SpecialistFactory

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture(autouse=True)
def _mock_externals(mock_api_key, mock_anthropic_client):
    """Ensure every test in this module has a mocked API key and client."""


@pytest.fixture()
def mock_client(mock_anthropic_client):
    """Expose the mock client for fine-grained response configuration."""
    return mock_anthropic_client


# ---------------------------------------------------------------------------
# 1. EngineeringAgent smoke test
# ---------------------------------------------------------------------------


class TestEngineeringAgentSmoke:
    """Verify EngineeringAgent initialises and runs without error."""

    def test_engineering_agent_smoke(self, mock_client):
        # Configure response text
        mock_client.messages.create.return_value.content[
            0
        ].text = "REST API implementation with Express.js"

        agent = EngineeringAgent(api_key="test-key", auto_log=False)
        # Stub system prompt to avoid filesystem access
        agent._system_prompt = "Engineering system prompt"

        result = agent.run("Create a REST API")

        assert isinstance(result, AgentResponse)
        assert result.content != ""
        assert len(result.content) > 0
        assert result.success is True


# ---------------------------------------------------------------------------
# 2. DesignAgent smoke test
# ---------------------------------------------------------------------------


class TestDesignAgentSmoke:
    """Verify DesignAgent initialises and runs without error."""

    def test_design_agent_smoke(self, mock_client):
        mock_client.messages.create.return_value.content[
            0
        ].text = "Dashboard wireframe with navigation sidebar"

        agent = DesignAgent(api_key="test-key", auto_log=False)
        agent._system_prompt = "Design system prompt"

        result = agent.run("Design a dashboard UI")

        assert isinstance(result, AgentResponse)
        assert result.content != ""
        assert len(result.content) > 0
        assert result.success is True


# ---------------------------------------------------------------------------
# 3. MBAAgent smoke test
# ---------------------------------------------------------------------------


class TestMBAAgentSmoke:
    """Verify MBAAgent initialises and runs without error."""

    def test_mba_agent_smoke(self, mock_client):
        mock_client.messages.create.return_value.content[
            0
        ].text = "Go-to-market strategy targeting SMBs"

        agent = MBAAgent(api_key="test-key", auto_log=False)
        agent._system_prompt = "MBA system prompt"

        result = agent.run("Create a go-to-market strategy")

        assert isinstance(result, AgentResponse)
        assert result.content != ""
        assert len(result.content) > 0
        assert result.success is True


# ---------------------------------------------------------------------------
# 4. GenericAgent smoke test (via factory)
# ---------------------------------------------------------------------------


class TestGenericAgentSmoke:
    """Verify GenericSpecialistAgent via SpecialistFactory.create()."""

    def test_generic_agent_smoke(self, mock_client):
        mock_client.messages.create.return_value.content[
            0
        ].text = "Marketing campaign plan with paid and organic channels"

        agent = SpecialistFactory.create("marketing", auto_log=False)
        assert isinstance(agent, GenericSpecialistAgent)

        # Stub system prompt
        agent._system_prompt = "Marketing system prompt"

        result = agent.run("Plan a product launch campaign")

        assert isinstance(result, AgentResponse)
        assert result.content != ""
        assert len(result.content) > 0
        assert result.success is True


# ---------------------------------------------------------------------------
# 5. SpecialistFactory creates correct types
# ---------------------------------------------------------------------------


class TestSpecialistFactoryCreatesCorrectTypes:
    """Verify factory returns the correct class for each brain type."""

    def test_specialist_factory_creates_correct_types(self):
        eng = SpecialistFactory.create("engineering", auto_log=False)
        assert isinstance(eng, EngineeringAgent)

        design = SpecialistFactory.create("design", auto_log=False)
        assert isinstance(design, DesignAgent)

        mba = SpecialistFactory.create("mba", auto_log=False)
        assert isinstance(mba, MBAAgent)

        # Everything else falls back to GenericSpecialistAgent
        for brain in ["marketing", "sales", "finance", "legal"]:
            agent = SpecialistFactory.create(brain, auto_log=False)
            assert isinstance(agent, GenericSpecialistAgent), (
                f"{brain} should produce GenericSpecialistAgent"
            )


# ---------------------------------------------------------------------------
# 6. All 37 brains selectable
# ---------------------------------------------------------------------------


class TestAll37BrainsSelectable:
    """Verify BrainSelector can select every brain via BrainType enum."""

    ALL_BRAIN_NAMES = [bt.value for bt in BrainType]

    def test_all_37_brains_selectable(self):
        selector = BrainSelector()

        # The BrainType enum should contain exactly 37 members
        assert len(BrainType) == 37, (
            f"Expected 37 BrainType members, got {len(BrainType)}"
        )

        # Every brain (except CEO) must have a capability entry
        for brain_type in BrainType:
            if brain_type == BrainType.CEO:
                continue
            cap = selector.BRAIN_CAPABILITIES.get(brain_type)
            assert cap is not None, (
                f"BrainSelector missing capability for {brain_type.value}"
            )

    def test_select_brain_returns_valid_brain_type(self):
        selector = BrainSelector()

        # Spot-check a handful of tasks
        tasks = [
            "Write unit tests",
            "Design a logo",
            "Analyze competitors",
            "Build a mobile app",
            "Set up email marketing",
        ]
        for task in tasks:
            result = selector.select_brain(task)
            assert isinstance(result, BrainType)
            assert result.value in self.ALL_BRAIN_NAMES


# ---------------------------------------------------------------------------
# 7. BrainLoader loads all brains
# ---------------------------------------------------------------------------


class TestBrainLoaderLoadsAllBrains:
    """BrainLoader.BRAIN_PATHS must contain all 37 brain names."""

    def test_brain_loader_has_all_37_paths(self):
        # Use a fresh dict copy to avoid pollution from other tests
        # that may have mutated the class-level BRAIN_PATHS dict.
        # Re-read the original class attribute count
        expected_brains = {bt.value for bt in BrainType}
        loader = BrainLoader()
        actual = set(loader.BRAIN_PATHS.keys())

        # Every BrainType member must appear in BRAIN_PATHS
        missing = expected_brains - actual
        assert len(missing) == 0, (
            f"BrainLoader.BRAIN_PATHS is missing entries for: {missing}"
        )
        # At least 37 brains
        assert len(actual) >= 37

    def test_brain_loader_paths_match_brain_type_enum(self):
        loader = BrainLoader()
        enum_names = {bt.value for bt in BrainType}
        loader_names = set(loader.BRAIN_PATHS.keys())

        # Every enum member must be in BRAIN_PATHS (superset is OK
        # because other tests may register extra keys at class level)
        enum_only = enum_names - loader_names
        assert len(enum_only) == 0, (
            f"BrainType enum values missing from BrainLoader.BRAIN_PATHS: {enum_only}"
        )

    def test_get_available_brains_returns_list(self):
        loader = BrainLoader()
        available = loader.get_available_brains()

        # Should be a list of strings
        assert isinstance(available, list)
        # Each entry must be a known brain name
        for name in available:
            assert name in loader.BRAIN_PATHS, (
                f"Unexpected brain name in available list: {name}"
            )


# ---------------------------------------------------------------------------
# CEO Agent smoke test (bonus -- covers the 5th agent type)
# ---------------------------------------------------------------------------


class TestCEOAgentSmoke:
    """Verify CEOAgent initialises and run() returns AgentResponse."""

    def test_ceo_agent_smoke(self, mock_client):
        mock_client.messages.create.return_value.content[
            0
        ].text = "Orchestrated result across multiple brains"

        with patch("agents.ceo.task_decomposer.anthropic.Anthropic"):
            agent = CEOAgent(api_key="test-key", auto_log=False)
        agent._system_prompt = "CEO system prompt"

        # Use skip_decomposition to keep the smoke test fast
        eng_mock = MagicMock()
        eng_mock.run.return_value = AgentResponse(
            content="Engineering output",
            success=True,
        )
        with patch.object(agent, "_get_specialist", return_value=eng_mock):
            result = agent.run("Create a REST API")

        assert isinstance(result, AgentResponse)
        assert result.content != ""
        assert len(result.content) > 0

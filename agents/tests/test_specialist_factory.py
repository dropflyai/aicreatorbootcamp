"""Tests for agents.specialists.specialist_factory.SpecialistFactory."""

import pytest

from agents.core.base_agent import BaseAgent
from agents.specialists.design_agent import DesignAgent
from agents.specialists.engineering_agent import EngineeringAgent
from agents.specialists.mba_agent import MBAAgent
from agents.specialists.specialist_factory import SpecialistFactory

# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture(autouse=True)
def _mock_externals(mock_api_key, mock_anthropic_client):
    """Ensure all tests have mocked API key and Anthropic client."""
    pass


# ---------------------------------------------------------------------------
# create() -- known specialists
# ---------------------------------------------------------------------------


class TestCreateKnown:
    """Tests for SpecialistFactory.create() with registered specialist types."""

    def test_create_engineering(self):
        agent = SpecialistFactory.create("engineering", auto_log=False)
        assert isinstance(agent, EngineeringAgent)

    def test_create_design(self):
        agent = SpecialistFactory.create("design", auto_log=False)
        assert isinstance(agent, DesignAgent)

    def test_create_mba(self):
        agent = SpecialistFactory.create("mba", auto_log=False)
        assert isinstance(agent, MBAAgent)


# ---------------------------------------------------------------------------
# create() -- unknown / generic fallback
# ---------------------------------------------------------------------------


class TestCreateGeneric:
    """Tests for SpecialistFactory.create() with generic / unknown brain types."""

    def test_create_unknown_with_claude_md(self):
        """A brain_type present in BRAIN_PATHS but not in SPECIALISTS produces
        a GenericSpecialistAgent."""
        from agents.specialists.generic_agent import GenericSpecialistAgent

        # "marketing" is in BrainLoader.BRAIN_PATHS but not in SPECIALISTS
        agent = SpecialistFactory.create("marketing", auto_log=False)
        assert isinstance(agent, GenericSpecialistAgent)

    def test_create_unknown_without_claude_md_raises(self):
        """A completely unrecognised brain_type raises ValueError."""
        with pytest.raises(ValueError, match="Unknown specialist type"):
            SpecialistFactory.create("totally_unknown_xyzzy", auto_log=False)


# ---------------------------------------------------------------------------
# get_available
# ---------------------------------------------------------------------------


class TestGetAvailable:
    """Tests for SpecialistFactory.get_available()."""

    def test_get_available_includes_all_brains(self):
        available = SpecialistFactory.get_available()
        # Must include the three custom specialists
        assert "engineering" in available
        assert "design" in available
        assert "mba" in available
        # Must also include generic brains from BRAIN_PATHS
        assert "marketing" in available
        assert "sales" in available
        # Result is sorted
        assert available == sorted(available)


# ---------------------------------------------------------------------------
# register
# ---------------------------------------------------------------------------


class TestRegister:
    """Tests for SpecialistFactory.register()."""

    def test_register_new_specialist(self):
        """Registering a new specialist adds it to the SPECIALISTS dict."""

        class CustomAgent(BaseAgent):
            AGENT_TYPE = "custom"
            BRAIN_NAME = "engineering"

            def _get_agent_instructions(self):
                return "Custom instructions"

        SpecialistFactory.register("custom_brain", CustomAgent)
        assert "custom_brain" in SpecialistFactory.SPECIALISTS

        # Cleanup -- remove from SPECIALISTS to avoid leaking state
        del SpecialistFactory.SPECIALISTS["custom_brain"]

    def test_register_non_baseagent_raises(self):
        """Registering a class that does not inherit from BaseAgent raises
        TypeError."""
        with pytest.raises(TypeError, match="must inherit from BaseAgent"):
            SpecialistFactory.register("bad", dict)

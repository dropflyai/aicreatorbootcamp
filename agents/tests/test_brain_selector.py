"""Tests for agents.ceo.brain_selector.BrainSelector."""

import pytest

from agents.ceo.brain_selector import BrainSelector, BrainType


@pytest.fixture()
def selector():
    return BrainSelector()


# ---------------------------------------------------------------------------
# select_brain (single)
# ---------------------------------------------------------------------------

class TestSelectBrain:
    """Tests for BrainSelector.select_brain()."""

    def test_select_brain_engineering_keywords(self, selector):
        result = selector.select_brain("Write code for the REST API endpoint")
        assert result == BrainType.ENGINEERING

    def test_select_brain_design_keywords(self, selector):
        result = selector.select_brain("Create a wireframe for the UI layout")
        assert result == BrainType.DESIGN

    def test_select_brain_mba_keywords(self, selector):
        result = selector.select_brain("Develop a business strategy for revenue growth")
        assert result == BrainType.MBA

    def test_select_brain_defaults_to_engineering(self, selector):
        """When no keywords match, the selector falls back to ENGINEERING."""
        result = selector.select_brain("do something completely unrelated to everything xyzzy")
        assert result == BrainType.ENGINEERING


# ---------------------------------------------------------------------------
# select_brains (multiple)
# ---------------------------------------------------------------------------

class TestSelectBrains:
    """Tests for BrainSelector.select_brains()."""

    def test_select_brains_returns_multiple(self, selector):
        # A task that spans engineering and design
        results = selector.select_brains(
            "Build frontend code with good UI design and layout"
        )
        assert len(results) >= 2
        brain_values = [b.value for b in results]
        assert "engineering" in brain_values or "design" in brain_values

    def test_select_brains_respects_max(self, selector):
        results = selector.select_brains(
            "Build code with UI design and business strategy for revenue growth",
            max_brains=2,
        )
        assert len(results) <= 2


# ---------------------------------------------------------------------------
# Capability completeness
# ---------------------------------------------------------------------------

class TestCapabilities:
    """Tests for the BRAIN_CAPABILITIES registry."""

    def test_brain_capabilities_completeness(self, selector):
        """Every member of the BrainType enum (except CEO) must have an entry
        in BRAIN_CAPABILITIES with a non-empty keywords list."""
        for brain_type in BrainType:
            if brain_type == BrainType.CEO:
                # CEO is not a specialist brain, skip if not present
                continue
            cap = selector.BRAIN_CAPABILITIES.get(brain_type)
            assert cap is not None, f"Missing capability for {brain_type.value}"
            assert len(cap.keywords) > 0, f"Empty keywords for {brain_type.value}"


# ---------------------------------------------------------------------------
# can_delegate
# ---------------------------------------------------------------------------

class TestCanDelegate:
    """Tests for BrainSelector.can_delegate()."""

    def test_can_delegate_valid_pair(self, selector):
        """Engineering can delegate to Design per the capability definition."""
        assert selector.can_delegate(BrainType.ENGINEERING, BrainType.DESIGN) is True

    def test_can_delegate_invalid_pair(self, selector):
        """Design cannot delegate to MBA (not in its can_delegate_to list)."""
        assert selector.can_delegate(BrainType.DESIGN, BrainType.MBA) is False


# ---------------------------------------------------------------------------
# get_routing_explanation
# ---------------------------------------------------------------------------

class TestRoutingExplanation:
    """Tests for BrainSelector.get_routing_explanation()."""

    def test_get_routing_explanation_shows_matches(self, selector):
        explanation = selector.get_routing_explanation("Build a REST API endpoint")
        assert "Keyword matches" in explanation
        assert "engineering" in explanation

    def test_get_routing_explanation_no_matches(self, selector):
        explanation = selector.get_routing_explanation("xyzzy nothing here")
        assert "Defaulting to Engineering" in explanation


# ---------------------------------------------------------------------------
# keyword index
# ---------------------------------------------------------------------------

class TestKeywordIndex:
    """Tests for the internal keyword index."""

    def test_keyword_index_built_correctly(self, selector):
        """The inverted keyword index should contain entries for every keyword
        defined across all capabilities."""
        total_keywords = sum(
            len(cap.keywords)
            for cap in selector.BRAIN_CAPABILITIES.values()
        )
        # The index may be smaller because some keywords are shared across
        # brains, but it must be at least 1 and no larger than the total.
        assert 1 <= len(selector._keyword_index) <= total_keywords
        # Spot-check a known keyword
        assert "code" in selector._keyword_index
        assert BrainType.ENGINEERING in selector._keyword_index["code"]

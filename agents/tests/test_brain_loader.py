"""Tests for agents.core.brain_loader.BrainLoader."""

import pytest

from agents.core.brain_loader import BrainLoader

# ---------------------------------------------------------------------------
# load_brain
# ---------------------------------------------------------------------------


class TestLoadBrain:
    """Tests for BrainLoader.load_brain()."""

    def test_load_brain_success(self, brain_loader_with_mock):
        """Loading a known brain with a CLAUDE.md file succeeds."""
        content = brain_loader_with_mock.load_brain("engineering")
        assert "Engineering Brain" in content
        assert "Identity" in content

    def test_load_brain_unknown_raises_value_error(self):
        """Requesting an unrecognised brain name raises ValueError."""
        loader = BrainLoader()
        with pytest.raises(ValueError, match="Unknown brain"):
            loader.load_brain("nonexistent_brain")

    def test_load_brain_missing_file_raises_file_not_found(
        self, brain_loader_with_mock
    ):
        """If the brain directory exists in BRAIN_PATHS but CLAUDE.md is
        absent, FileNotFoundError is raised."""
        # Create an entry in BRAIN_PATHS that maps to a dir without CLAUDE.md
        brain_loader_with_mock.BRAIN_PATHS["ghost"] = "ghost_brain"
        ghost_dir = brain_loader_with_mock.BRAINS_ROOT / "ghost_brain"
        ghost_dir.mkdir(exist_ok=True)

        with pytest.raises(FileNotFoundError, match="Brain file not found"):
            brain_loader_with_mock.load_brain("ghost")

    def test_brain_cache_returns_same_content(self, brain_loader_with_mock):
        """After a brain is loaded once its content is served from cache."""
        first = brain_loader_with_mock.load_brain("engineering")
        second = brain_loader_with_mock.load_brain("engineering")
        assert first is second  # exact same object from cache


# ---------------------------------------------------------------------------
# extract_identity / extract_rules
# ---------------------------------------------------------------------------


class TestExtractSections:
    """Tests for section extraction helpers."""

    def test_extract_identity_parses_section(self, sample_brain_content):
        loader = BrainLoader()
        identity = loader.extract_identity(sample_brain_content)
        assert "principal-level" in identity.lower()

    def test_extract_identity_returns_empty_for_missing_section(self):
        loader = BrainLoader()
        result = loader.extract_identity("# No identity here\n\nJust some text.")
        assert result == ""

    def test_extract_rules_parses_bullet_list(self, sample_brain_content):
        loader = BrainLoader()
        rules = loader.extract_rules(sample_brain_content)
        assert len(rules) >= 3
        assert any("verify" in r.lower() for r in rules)

    def test_extract_rules_returns_empty_for_missing_section(self):
        loader = BrainLoader()
        rules = loader.extract_rules("# Nothing relevant\n\nFoo bar.")
        assert rules == []


# ---------------------------------------------------------------------------
# get_available_brains
# ---------------------------------------------------------------------------


class TestGetAvailableBrains:
    """Tests for BrainLoader.get_available_brains()."""

    def test_get_available_brains_returns_existing_only(self, brain_loader_with_mock):
        """Only brains that actually have a CLAUDE.md file on disk are
        returned, even though BRAIN_PATHS contains many more entries."""
        available = brain_loader_with_mock.get_available_brains()
        assert "engineering" in available
        assert "design" in available
        # Brains whose directories do not exist in tmp dir are excluded
        assert "mba" not in available


# ---------------------------------------------------------------------------
# build_system_prompt
# ---------------------------------------------------------------------------


class TestBuildSystemPrompt:
    """Tests for BrainLoader.build_system_prompt()."""

    def test_build_system_prompt_includes_identity_and_rules(
        self, brain_loader_with_mock
    ):
        prompt = brain_loader_with_mock.build_system_prompt("engineering")
        # Identity content
        assert "Principal-level" in prompt
        # Rules content
        assert "Verify before asserting" in prompt
        # Brain header
        assert "ENGINEERING AGENT" in prompt

    def test_build_system_prompt_includes_additional_context(
        self, brain_loader_with_mock
    ):
        prompt = brain_loader_with_mock.build_system_prompt(
            "engineering", additional_context="Use Python 3.12"
        )
        assert "Use Python 3.12" in prompt
        assert "Additional Context" in prompt


# ---------------------------------------------------------------------------
# clear_cache
# ---------------------------------------------------------------------------


class TestClearCache:
    """Tests for BrainLoader.clear_cache()."""

    def test_clear_cache_empties_cache(self, brain_loader_with_mock):
        brain_loader_with_mock.load_brain("engineering")
        assert len(brain_loader_with_mock._cache) > 0

        brain_loader_with_mock.clear_cache()
        assert len(brain_loader_with_mock._cache) == 0

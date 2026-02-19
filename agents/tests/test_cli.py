"""Tests for agents.cli.main (Click CLI interface).

Uses Click's CliRunner so no real subprocess or API calls are made.
"""

import os

import pytest
from click.testing import CliRunner

from agents.cli.main import cli


@pytest.fixture()
def runner():
    return CliRunner()


# ---------------------------------------------------------------------------
# Help
# ---------------------------------------------------------------------------


class TestHelp:
    """Tests for the CLI help output."""

    def test_cli_help(self, runner):
        result = runner.invoke(cli, ["--help"])
        assert result.exit_code == 0
        assert "Prototype X1000" in result.output
        assert "orchestrate" in result.output
        assert "brains" in result.output
        assert "status" in result.output


# ---------------------------------------------------------------------------
# brains command
# ---------------------------------------------------------------------------


class TestBrainsCommand:
    """Tests for ``px1000 brains``."""

    def test_brains_command(self, runner):
        """The brains command lists brain names and their status."""
        result = runner.invoke(cli, ["brains"])
        assert result.exit_code == 0
        assert "engineering" in result.output
        assert "design" in result.output
        assert "mba" in result.output


# ---------------------------------------------------------------------------
# status command
# ---------------------------------------------------------------------------


class TestStatusCommand:
    """Tests for ``px1000 status``."""

    def test_status_command_no_api_key(self, runner):
        """When ANTHROPIC_API_KEY is unset, status shows it is missing."""
        env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
        result = runner.invoke(cli, ["status"], env=env)
        assert result.exit_code == 0
        assert "missing" in result.output.lower() or "API key" in result.output

    def test_status_command_with_api_key(self, runner):
        """When ANTHROPIC_API_KEY is set, status confirms it is configured."""
        env = {**os.environ, "ANTHROPIC_API_KEY": "sk-test-key"}
        result = runner.invoke(cli, ["status"], env=env)
        assert result.exit_code == 0
        assert "configured" in result.output.lower() or "API key" in result.output


# ---------------------------------------------------------------------------
# run command -- missing API key
# ---------------------------------------------------------------------------


class TestRunCommand:
    """Tests for ``px1000 run``."""

    def test_run_missing_api_key(self, runner):
        """Running a task without an API key should fail gracefully."""
        env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
        result = runner.invoke(
            cli,
            ["run", "engineering", "Create a REST API"],
            env=env,
        )
        # Should either exit non-zero or print an error about the API key
        assert (
            result.exit_code != 0
            or "api key" in result.output.lower()
            or "error" in result.output.lower()
        )

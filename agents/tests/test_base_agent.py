"""Tests for agents.core.base_agent.BaseAgent.

All Anthropic and Supabase interactions are mocked.
"""

from unittest.mock import MagicMock, patch

import pytest

from agents.core.base_agent import AgentResponse, BaseAgent

# ---------------------------------------------------------------------------
# Concrete subclass for testing (BaseAgent is abstract)
# ---------------------------------------------------------------------------

class _StubAgent(BaseAgent):
    """Minimal concrete subclass used in tests."""

    AGENT_TYPE = "stub"
    BRAIN_NAME = "engineering"

    def _get_agent_instructions(self) -> str:
        return "You are a stub agent for testing."


# ---------------------------------------------------------------------------
# Initialisation
# ---------------------------------------------------------------------------

class TestInit:
    """Tests for BaseAgent.__init__()."""

    def test_init_requires_api_key(self):
        """Instantiation without an API key raises ValueError."""
        with patch.dict("os.environ", {}, clear=True):
            with patch("anthropic.Anthropic"):
                with pytest.raises(ValueError, match="API key required"):
                    _StubAgent()

    def test_init_with_env_var(self, mock_api_key, mock_anthropic_client, mock_supabase):
        """When ANTHROPIC_API_KEY is set, the agent initialises successfully."""
        agent = _StubAgent(auto_log=False)
        assert agent.api_key == mock_api_key
        assert agent.model == agent.DEFAULT_MODEL

    def test_init_with_explicit_key(self, mock_anthropic_client):
        """Passing api_key directly bypasses the env var requirement."""
        agent = _StubAgent(api_key="explicit-key", auto_log=False)
        assert agent.api_key == "explicit-key"


# ---------------------------------------------------------------------------
# Tool registration and execution
# ---------------------------------------------------------------------------

class TestToolRegistry:
    """Tests for register_tool / _execute_tool."""

    @pytest.fixture(autouse=True)
    def _setup(self, mock_api_key, mock_anthropic_client):
        self.agent = _StubAgent(auto_log=False)

    def test_tool_registration(self):
        self.agent.register_tool(
            name="greet",
            description="Say hello",
            input_schema={"type": "object", "properties": {"name": {"type": "string"}}},
            handler=lambda name="World": f"Hello, {name}!",
        )

        assert "greet" in self.agent._tools
        assert any(td["name"] == "greet" for td in self.agent._tool_definitions)

    def test_tool_execution(self):
        self.agent.register_tool(
            name="add",
            description="Add two numbers",
            input_schema={"type": "object", "properties": {}},
            handler=lambda a, b: a + b,
        )

        result = self.agent._execute_tool("add", {"a": 2, "b": 3})
        assert result == 5

    def test_tool_execution_unknown_raises(self):
        with pytest.raises(ValueError, match="Unknown tool"):
            self.agent._execute_tool("nonexistent", {})


# ---------------------------------------------------------------------------
# System prompt
# ---------------------------------------------------------------------------

class TestSystemPrompt:
    """Tests for BaseAgent.get_system_prompt()."""

    @pytest.fixture(autouse=True)
    def _setup(self, mock_api_key, mock_anthropic_client):
        self.agent = _StubAgent(auto_log=False)

    def test_get_system_prompt_includes_brain(self):
        """The system prompt loads brain content and includes agent
        instructions."""
        with patch.object(
            self.agent.brain_loader, "build_system_prompt", return_value="BRAIN PROMPT"
        ):
            prompt = self.agent.get_system_prompt()
            assert "BRAIN PROMPT" in prompt
            assert "stub agent" in prompt

    def test_system_prompt_caching(self):
        """Once generated, the system prompt is cached and reused."""
        with patch.object(
            self.agent.brain_loader, "build_system_prompt", return_value="CACHED"
        ) as mock_build:
            first = self.agent.get_system_prompt()
            second = self.agent.get_system_prompt()
            assert first == second
            # build_system_prompt should only be called once due to caching
            assert mock_build.call_count == 1


# ---------------------------------------------------------------------------
# run()
# ---------------------------------------------------------------------------

class TestRun:
    """Tests for BaseAgent.run()."""

    @pytest.fixture(autouse=True)
    def _setup(self, mock_api_key, mock_anthropic_client):
        self.mock_client = mock_anthropic_client
        self.agent = _StubAgent(auto_log=False)
        # Bypass brain loader for cleaner tests
        self.agent._system_prompt = "Test system prompt"

    def test_run_basic(self):
        """A simple run that ends on the first turn."""
        response = self.agent.run("Hello agent")

        assert isinstance(response, AgentResponse)
        assert response.success is True
        assert response.content == "Mock agent response content"
        assert response.tokens_used == 150  # 100 + 50

    def test_run_with_tool_use(self):
        """When stop_reason is tool_use, the agent executes the tool and
        continues until end_turn."""
        self.agent.register_tool(
            name="lookup",
            description="Look up data",
            input_schema={"type": "object", "properties": {}},
            handler=lambda query: f"Result for {query}",
        )

        # First call returns tool_use, second call returns end_turn
        tool_block = MagicMock()
        tool_block.type = "tool_use"
        tool_block.name = "lookup"
        tool_block.input = {"query": "test"}
        tool_block.id = "tool_call_1"

        text_block = MagicMock()
        text_block.type = "text"
        text_block.text = "Found the answer."

        first_response = MagicMock()
        first_response.stop_reason = "tool_use"
        first_response.content = [tool_block]
        first_response.usage = MagicMock(input_tokens=100, output_tokens=50)

        second_response = MagicMock()
        second_response.stop_reason = "end_turn"
        second_response.content = [text_block]
        second_response.usage = MagicMock(input_tokens=80, output_tokens=40)

        self.mock_client.messages.create.side_effect = [first_response, second_response]

        result = self.agent.run("Look up something")

        assert result.success is True
        assert result.content == "Found the answer."
        assert len(result.tool_calls) == 1
        assert result.tool_calls[0]["name"] == "lookup"
        assert result.tokens_used == 270  # 150 + 120

    def test_run_max_iterations(self):
        """When every response is tool_use, the agent stops at max_iterations."""
        tool_block = MagicMock()
        tool_block.type = "tool_use"
        tool_block.name = "lookup"
        tool_block.input = {}
        tool_block.id = "tool_call_loop"

        self.agent.register_tool(
            name="lookup",
            description="stub",
            input_schema={"type": "object", "properties": {}},
            handler=lambda: "data",
        )

        loop_response = MagicMock()
        loop_response.stop_reason = "tool_use"
        loop_response.content = [tool_block]
        loop_response.usage = MagicMock(input_tokens=10, output_tokens=10)

        self.mock_client.messages.create.return_value = loop_response

        result = self.agent.run("Loop forever", max_iterations=3)

        assert result.success is False
        assert result.error == "max_iterations_reached"
        assert self.mock_client.messages.create.call_count == 3

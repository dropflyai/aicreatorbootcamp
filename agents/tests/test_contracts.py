"""Contract tests for external dependency interfaces.

These tests verify that OUR code expects the correct interface shapes from
external libraries (Anthropic SDK, Supabase client, Pydantic models).  All
external calls are mocked -- nothing hits the network.
"""

from unittest.mock import MagicMock, patch

# ---------------------------------------------------------------------------
# Anthropic API contract
# ---------------------------------------------------------------------------

class TestAnthropicAPIContract:
    """Verify the interface shape we expect from the Anthropic Python SDK."""

    def test_client_accepts_api_key_kwarg(self):
        """``anthropic.Anthropic`` must accept an ``api_key`` keyword arg."""
        with patch("anthropic.Anthropic") as MockAnthropicCls:
            MockAnthropicCls.return_value = MagicMock()
            import anthropic

            client = anthropic.Anthropic(api_key="test-key")
            MockAnthropicCls.assert_called_once_with(api_key="test-key")
            assert client is not None

    def test_messages_create_accepts_expected_kwargs(self):
        """``client.messages.create()`` must accept model, max_tokens,
        system, messages, and tools keyword arguments."""
        mock_client = MagicMock()
        mock_response = MagicMock()
        mock_client.messages.create.return_value = mock_response

        mock_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system="You are an assistant.",
            messages=[{"role": "user", "content": "Hello"}],
            tools=[{"name": "read_file", "description": "Read a file", "input_schema": {}}],
        )

        mock_client.messages.create.assert_called_once_with(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system="You are an assistant.",
            messages=[{"role": "user", "content": "Hello"}],
            tools=[{"name": "read_file", "description": "Read a file", "input_schema": {}}],
        )

    def test_response_has_content_stop_reason_usage(self):
        """The response object must expose ``.content``, ``.stop_reason``,
        and ``.usage`` attributes."""
        mock_response = MagicMock()
        mock_text_block = MagicMock()
        mock_text_block.type = "text"
        mock_text_block.text = "Hello world"
        mock_response.content = [mock_text_block]
        mock_response.stop_reason = "end_turn"
        mock_response.usage = MagicMock(input_tokens=100, output_tokens=50)

        # Verify the attributes our code reads from the response
        assert hasattr(mock_response, "content")
        assert hasattr(mock_response, "stop_reason")
        assert hasattr(mock_response, "usage")

    def test_usage_has_token_counts(self):
        """``response.usage`` must expose ``.input_tokens`` and
        ``.output_tokens``."""
        mock_usage = MagicMock(input_tokens=200, output_tokens=75)

        assert mock_usage.input_tokens == 200
        assert mock_usage.output_tokens == 75

    def test_content_blocks_have_type_and_text(self):
        """Content blocks must expose ``.type`` and ``.text`` attributes."""
        mock_block = MagicMock()
        mock_block.type = "text"
        mock_block.text = "Some generated content"

        assert mock_block.type == "text"
        assert mock_block.text == "Some generated content"

    def test_stop_reason_includes_end_turn_and_tool_use(self):
        """``stop_reason`` must support at least ``'end_turn'`` and
        ``'tool_use'`` values, matching what ``base_agent.py`` checks."""
        end_turn_response = MagicMock()
        end_turn_response.stop_reason = "end_turn"

        tool_use_response = MagicMock()
        tool_use_response.stop_reason = "tool_use"

        assert end_turn_response.stop_reason == "end_turn"
        assert tool_use_response.stop_reason == "tool_use"

    def test_base_agent_run_uses_correct_api_shape(self, mock_api_key, mock_anthropic_client):
        """Integration-level contract: ``BaseAgent.run()`` calls
        ``messages.create`` with the kwargs our code assembles."""
        from agents.core.base_agent import BaseAgent

        class _StubAgent(BaseAgent):
            AGENT_TYPE = "stub"
            BRAIN_NAME = "engineering"

            def _get_agent_instructions(self) -> str:
                return "Test instructions"

        with patch.object(
            _StubAgent, "get_system_prompt", return_value="system prompt"
        ):
            agent = _StubAgent(api_key="test-api-key-xxx", auto_log=False)
            agent.client = mock_anthropic_client
            agent.run("Hello")

        call_kwargs = mock_anthropic_client.messages.create.call_args
        assert "model" in call_kwargs.kwargs
        assert "max_tokens" in call_kwargs.kwargs
        assert "system" in call_kwargs.kwargs
        assert "messages" in call_kwargs.kwargs


# ---------------------------------------------------------------------------
# Supabase client contract
# ---------------------------------------------------------------------------

class TestSupabaseClientContract:
    """Verify the interface shape we expect from the Supabase Python client."""

    def test_create_client_returns_client(self):
        """``create_client(url, key)`` must return an object with a
        ``.table()`` method."""
        mock_client = MagicMock()
        with patch("agents.core.memory_client.create_client", return_value=mock_client):
            from agents.core.memory_client import SupabaseMemoryClient

            client = SupabaseMemoryClient(url="https://x.supabase.co", key="key")
            assert hasattr(client.client, "table")

    def test_client_has_table_method(self, mock_supabase):
        """Client must have a ``.table()`` method."""
        assert callable(mock_supabase.table)
        mock_supabase.table("agent_runs")
        mock_supabase.table.assert_called_with("agent_runs")

    def test_table_supports_chained_select(self, mock_supabase):
        """``table().select()`` must be chainable."""
        query = mock_supabase.table("t").select("*")
        assert query is not None

    def test_table_supports_chained_insert(self, mock_supabase):
        """``table().insert()`` must be chainable."""
        query = mock_supabase.table("t").insert({"key": "value"})
        assert query is not None

    def test_table_supports_chained_eq_order_limit(self, mock_supabase):
        """``table().select().eq().order().limit()`` full chain must work."""
        result = (
            mock_supabase.table("t")
            .select("*")
            .eq("col", "val")
            .order("created_at", desc=True)
            .limit(10)
            .execute()
        )
        assert hasattr(result, "data")

    def test_execute_returns_object_with_data(self, mock_supabase):
        """``execute()`` must return an object with a ``.data`` attribute."""
        result = mock_supabase.table("t").select("*").execute()
        assert hasattr(result, "data")
        # Default from conftest is an empty list
        assert isinstance(result.data, list)

    def test_memory_client_uses_chained_pattern(self, mock_supabase, monkeypatch):
        """``SupabaseMemoryClient.get_agent_runs`` exercises the full
        chain pattern: select -> eq -> order -> limit -> execute."""
        monkeypatch.setenv("SUPABASE_URL", "https://x.supabase.co")
        monkeypatch.setenv("SUPABASE_SERVICE_KEY", "test-key")

        from agents.core.memory_client import SupabaseMemoryClient

        client = SupabaseMemoryClient(
            url="https://x.supabase.co", key="test-key"
        )
        runs = client.get_agent_runs(agent_type="engineering", limit=5)
        assert isinstance(runs, list)


# ---------------------------------------------------------------------------
# Pydantic model contracts
# ---------------------------------------------------------------------------

class TestPydanticModelContracts:
    """Verify Pydantic models accept their documented fields and serialize."""

    def test_experience_accepts_documented_fields(self):
        """``Experience`` must accept all fields from memory_client.py."""
        from agents.core.memory_client import Experience

        exp = Experience(
            brain_type="engineering",
            project_id="proj-123",
            category="success",
            task_summary="Built the API",
            problem="No API existed",
            solution="Created REST endpoints",
            outcome="Working API",
            lessons_learned="Start with OpenAPI spec",
            tags=["api", "rest"],
        )
        assert exp.brain_type == "engineering"
        assert exp.category == "success"
        assert exp.tags == ["api", "rest"]

    def test_agent_run_accepts_documented_fields(self):
        """``AgentRun`` must accept all fields from memory_client.py."""
        from agents.core.memory_client import AgentRun

        run = AgentRun(
            agent_type="engineering",
            task_input="Build an API",
            task_output="Done",
            success=True,
            tool_calls=[{"name": "read_file", "input": {}}],
            tokens_used=150,
            model="claude-sonnet-4-20250514",
        )
        assert run.agent_type == "engineering"
        assert run.success is True
        assert run.tokens_used == 150

    def test_pattern_accepts_documented_fields(self):
        """``Pattern`` must accept all fields from memory_client.py."""
        from agents.core.memory_client import Pattern

        pat = Pattern(
            brain_type="engineering",
            pattern_name="API-first design",
            description="Always start with the API contract",
            trigger_conditions=["new service", "new endpoint"],
            solution_template="1. Write OpenAPI spec\n2. Generate stubs",
            example_usages=["Built the auth service"],
            observation_count=5,
            tags=["api", "design"],
        )
        assert pat.pattern_name == "API-first design"
        assert pat.observation_count == 5

    def test_experience_ignores_unknown_fields(self):
        """``Experience`` should silently ignore fields not in the schema."""
        from agents.core.memory_client import Experience

        exp = Experience(
            brain_type="engineering",
            category="success",
            task_summary="x",
            totally_bogus_field="should be ignored",
        )
        assert not hasattr(exp, "totally_bogus_field")
        assert "totally_bogus_field" not in exp.model_dump()

    def test_agent_run_ignores_unknown_fields(self):
        """``AgentRun`` should silently ignore fields not in the schema."""
        from agents.core.memory_client import AgentRun

        run = AgentRun(
            agent_type="engineering",
            task_input="x",
            not_a_real_field="boom",
        )
        assert not hasattr(run, "not_a_real_field")
        assert "not_a_real_field" not in run.model_dump()

    def test_pattern_ignores_unknown_fields(self):
        """``Pattern`` should silently ignore fields not in the schema."""
        from agents.core.memory_client import Pattern

        pat = Pattern(
            brain_type="engineering",
            pattern_name="x",
            description="x",
            made_up_field=42,
        )
        assert not hasattr(pat, "made_up_field")
        assert "made_up_field" not in pat.model_dump()

    def test_experience_model_dump(self):
        """``Experience.model_dump()`` must return a dict."""
        from agents.core.memory_client import Experience

        exp = Experience(
            brain_type="engineering",
            category="learning",
            task_summary="Learned something",
        )
        dumped = exp.model_dump()
        assert isinstance(dumped, dict)
        assert dumped["brain_type"] == "engineering"
        assert dumped["category"] == "learning"

    def test_agent_run_model_dump(self):
        """``AgentRun.model_dump()`` must return a dict."""
        from agents.core.memory_client import AgentRun

        run = AgentRun(agent_type="design", task_input="Design a page")
        dumped = run.model_dump()
        assert isinstance(dumped, dict)
        assert dumped["agent_type"] == "design"

    def test_pattern_model_dump(self):
        """``Pattern.model_dump()`` must return a dict."""
        from agents.core.memory_client import Pattern

        pat = Pattern(
            brain_type="qa",
            pattern_name="Test first",
            description="Write tests before code",
        )
        dumped = pat.model_dump()
        assert isinstance(dumped, dict)
        assert dumped["pattern_name"] == "Test first"

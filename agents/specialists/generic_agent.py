"""Generic specialist agent for brains without custom implementations."""

from ..core.base_agent import BaseAgent
from ..core.memory_client import SupabaseMemoryClient


class GenericSpecialistAgent(BaseAgent):
    """Generic agent that loads any brain's CLAUDE.md as guidance.

    Used as a fallback for brains that don't have custom agent implementations.
    Loads the brain's CLAUDE.md and uses it as the system prompt.
    """

    DEFAULT_MODEL = "claude-sonnet-4-20250514"

    def __init__(
        self,
        brain_name: str,
        api_key: str | None = None,
        memory_client: SupabaseMemoryClient | None = None,
        model: str | None = None,
        auto_log: bool = True,
    ):
        """Initialize the generic specialist agent.

        Args:
            brain_name: Name of the brain to load (e.g., 'marketing', 'sales').
            api_key: Anthropic API key.
            memory_client: Supabase client for logging.
            model: Override default model.
            auto_log: Whether to auto-log runs.
        """
        self.brain_name = brain_name
        self.BRAIN_NAME = brain_name
        self.AGENT_TYPE = brain_name
        super().__init__(
            api_key=api_key,
            memory_client=memory_client,
            model=model,
            auto_log=auto_log,
        )

    def _get_agent_instructions(self) -> str:
        """Return agent-specific instructions.

        Returns:
            Instructions string appended to the system prompt.
        """
        return f"""You are the {self.brain_name.replace("_", " ").title()} specialist agent.

Your role is to execute tasks within your domain of expertise as defined by your CLAUDE.md guidance.

## Operating Principles

1. **Stay in your lane** - Focus on tasks within your specialty
2. **Request handoffs** - If a task requires another brain's expertise, recommend delegation
3. **Quality first** - Follow all quality gates defined in your brain guidance
4. **Log learnings** - Document patterns and lessons for future reference

## Handoff Protocol

If you encounter work outside your expertise, respond with:
```
HANDOFF_RECOMMENDED:
- Target Brain: [brain_name]
- Reason: [why this brain should handle it]
- Context: [relevant context to pass along]
```
"""

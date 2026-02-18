"""Factory for creating specialist agents."""

from typing import Any, Optional

from ..core.base_agent import BaseAgent
from ..core.brain_loader import BrainLoader
from ..core.memory_client import SupabaseMemoryClient
from .engineering_agent import EngineeringAgent
from .design_agent import DesignAgent
from .mba_agent import MBAAgent


class SpecialistFactory:
    """Factory for creating specialist brain agents.

    Provides a centralized way to instantiate specialist agents
    with consistent configuration.
    """

    # Registry of available specialists
    SPECIALISTS = {
        "engineering": EngineeringAgent,
        "design": DesignAgent,
        "mba": MBAAgent,
    }

    @classmethod
    def create(
        cls,
        brain_type: str,
        api_key: Optional[str] = None,
        memory_client: Optional[SupabaseMemoryClient] = None,
        model: Optional[str] = None,
        auto_log: bool = True,
        **kwargs: Any,
    ) -> BaseAgent:
        """Create a specialist agent.

        Args:
            brain_type: Type of specialist (engineering, design, mba, etc.).
            api_key: Anthropic API key.
            memory_client: Supabase client for logging.
            model: Override default model.
            auto_log: Whether to auto-log runs.
            **kwargs: Additional arguments passed to agent constructor.

        Returns:
            Instantiated specialist agent.

        Raises:
            ValueError: If brain_type is not recognized and has no CLAUDE.md.
        """
        # Use custom agent if available
        if brain_type in cls.SPECIALISTS:
            agent_class = cls.SPECIALISTS[brain_type]
            return agent_class(
                api_key=api_key,
                memory_client=memory_client,
                model=model,
                auto_log=auto_log,
                **kwargs,
            )

        # Fallback to generic agent for any brain with CLAUDE.md
        loader = BrainLoader()
        if brain_type in loader.BRAIN_PATHS:
            from .generic_agent import GenericSpecialistAgent

            return GenericSpecialistAgent(
                brain_name=brain_type,
                api_key=api_key,
                memory_client=memory_client,
                model=model,
                auto_log=auto_log,
            )

        # Unknown brain type
        available = ", ".join(list(cls.SPECIALISTS.keys()) + list(loader.BRAIN_PATHS.keys()))
        raise ValueError(
            f"Unknown specialist type: {brain_type}. "
            f"Available: {available}"
        )

    @classmethod
    def register(
        cls,
        brain_type: str,
        agent_class: type,
    ) -> None:
        """Register a new specialist agent type.

        Args:
            brain_type: Name for the specialist.
            agent_class: Agent class to register.
        """
        if not issubclass(agent_class, BaseAgent):
            raise TypeError("Agent class must inherit from BaseAgent")

        cls.SPECIALISTS[brain_type] = agent_class

    @classmethod
    def get_available(cls) -> list[str]:
        """Get list of available specialist types.

        Returns:
            List of specialist type names (custom + generic).
        """
        loader = BrainLoader()
        # Combine custom specialists with all brain paths
        all_brains = set(cls.SPECIALISTS.keys()) | set(loader.BRAIN_PATHS.keys())
        return sorted(list(all_brains))

    # Descriptions for all 37 brains
    BRAIN_DESCRIPTIONS = {
        # Tier 1: Complete
        "engineering": "Code, APIs, databases, infrastructure, DevOps, automation",
        "design": "UI/UX, visual design, user research, branding, accessibility",
        "mba": "Business strategy, operations, financial analysis, GTM",
        "options_trading": "Trading algorithms, market analysis, options strategies",
        "ceo": "Orchestration of all brains, task decomposition, synthesis",
        # Tier 2: Business & Strategy
        "finance": "Accounting, budgeting, financial modeling, fundraising",
        "operations": "Supply chain, logistics, process optimization",
        "legal": "Contracts, compliance, IP protection, regulatory",
        # Tier 3: Product & Design
        "product": "Product strategy, roadmapping, prioritization, PRDs",
        "game_design": "Game mechanics, level design, player psychology",
        "content": "Copywriting, content strategy, SEO, storytelling",
        "localization": "i18n, l10n, regional adaptation, translation",
        # Tier 4: Growth & Revenue
        "marketing": "Growth, acquisition, retention, brand positioning",
        "sales": "Sales process, objection handling, closing, pipeline",
        "growth": "Growth hacking, viral loops, referrals, PLG",
        "partnership": "Business development, alliances, integrations",
        "customer_success": "Onboarding, retention, support, churn prevention",
        # Tier 5: Technical
        "data": "Analytics, ML/AI, data pipelines, warehousing",
        "security": "Cybersecurity, compliance, risk management, auditing",
        "cloud": "AWS, GCP, Azure, serverless, infrastructure",
        "mobile": "iOS, Android, React Native, mobile-first",
        "qa": "Testing strategies, automation, quality gates",
        "ai": "LLMs, ML models, AI strategy, prompting",
        "automation": "Workflow automation, n8n, Zapier, integrations",
        "analytics": "Metrics, dashboards, reporting, insights",
        "devrel": "Developer relations, documentation, community",
        # Tier 6: Marketing Channels
        "branding": "Brand identity, visual systems, brand voice",
        "email": "Email marketing, drip campaigns, deliverability",
        "social_media": "Social platforms, content calendar, engagement",
        "video": "Video content, production, distribution",
        "community": "Community building, moderation, engagement",
        # Tier 7: Business Operations
        "support": "Customer support, ticketing, knowledge base",
        "investor": "Fundraising, investor relations, pitch decks",
        "pricing": "Pricing strategy, packaging, monetization",
        "innovation": "R&D, new ventures, experimentation",
        # Tier 8: People
        "hr": "Hiring, culture, team building, performance",
        "research": "Market research, competitor analysis, trends",
    }

    @classmethod
    def get_description(cls, brain_type: str) -> str:
        """Get description of a specialist.

        Args:
            brain_type: The specialist type.

        Returns:
            Description string.
        """
        return cls.BRAIN_DESCRIPTIONS.get(brain_type, "Specialist brain (no description)")

    @classmethod
    def create_all(
        cls,
        api_key: Optional[str] = None,
        memory_client: Optional[SupabaseMemoryClient] = None,
        auto_log: bool = True,
    ) -> dict[str, BaseAgent]:
        """Create all available specialist agents.

        Args:
            api_key: Anthropic API key.
            memory_client: Supabase client.
            auto_log: Whether to auto-log.

        Returns:
            Dict mapping brain_type to agent instance.
        """
        agents = {}
        for brain_type in cls.SPECIALISTS:
            agents[brain_type] = cls.create(
                brain_type,
                api_key=api_key,
                memory_client=memory_client,
                auto_log=auto_log,
            )
        return agents

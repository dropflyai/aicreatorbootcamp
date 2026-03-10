"""Brain selection and routing logic for CEO agent."""

from dataclasses import dataclass
from enum import Enum


class BrainType(Enum):
    """Available brain types in the system (all 37 brains)."""

    # Tier 1: Complete
    ENGINEERING = "engineering"
    DESIGN = "design"
    MBA = "mba"
    OPTIONS_TRADING = "options_trading"
    CEO = "ceo"
    # Tier 2: Business & Strategy
    FINANCE = "finance"
    OPERATIONS = "operations"
    LEGAL = "legal"
    # Tier 3: Product & Design
    PRODUCT = "product"
    GAME_DESIGN = "game_design"
    CONTENT = "content"
    LOCALIZATION = "localization"
    # Tier 4: Growth & Revenue
    MARKETING = "marketing"
    SALES = "sales"
    GROWTH = "growth"
    PARTNERSHIP = "partnership"
    CUSTOMER_SUCCESS = "customer_success"
    # Tier 5: Technical
    DATA = "data"
    SECURITY = "security"
    CLOUD = "cloud"
    MOBILE = "mobile"
    QA = "qa"
    AI = "ai"
    AUTOMATION = "automation"
    ANALYTICS = "analytics"
    DEVREL = "devrel"
    # Tier 6: Marketing Channels
    BRANDING = "branding"
    EMAIL = "email"
    SOCIAL_MEDIA = "social_media"
    VIDEO = "video"
    COMMUNITY = "community"
    # Tier 7: Business Operations
    SUPPORT = "support"
    INVESTOR = "investor"
    PRICING = "pricing"
    INNOVATION = "innovation"
    # Tier 8: People
    HR = "hr"
    RESEARCH = "research"


@dataclass
class BrainCapability:
    """Describes what a brain can do."""

    brain_type: BrainType
    keywords: list[str]
    description: str
    can_delegate_to: list[BrainType]
    model_preference: str  # sonnet or opus


class BrainSelector:
    """Select and route tasks to appropriate brain agents.

    Uses keyword matching and heuristics for fast routing decisions.
    For complex routing, the CEO agent can use Claude to make decisions.
    """

    BRAIN_CAPABILITIES = {
        BrainType.ENGINEERING: BrainCapability(
            brain_type=BrainType.ENGINEERING,
            keywords=[
                "code",
                "api",
                "database",
                "deploy",
                "bug",
                "test",
                "backend",
                "frontend",
                "server",
                "endpoint",
                "function",
                "class",
                "module",
                "package",
                "build",
                "compile",
                "debug",
                "refactor",
                "migrate",
                "schema",
                "query",
                "orm",
                "rest",
                "graphql",
                "webhook",
                "ci",
                "cd",
                "docker",
                "kubernetes",
                "aws",
                "infrastructure",
                "script",
                "automation",
                "performance",
                "security",
                "authentication",
                "authorization",
            ],
            description="Code, APIs, databases, infrastructure, DevOps, automation",
            can_delegate_to=[BrainType.DESIGN],
            model_preference="sonnet",
        ),
        BrainType.DESIGN: BrainCapability(
            brain_type=BrainType.DESIGN,
            keywords=[
                "design",
                "ui",
                "ux",
                "layout",
                "color",
                "font",
                "typography",
                "wireframe",
                "mockup",
                "component",
                "interface",
                "visual",
                "brand",
                "logo",
                "icon",
                "illustration",
                "spacing",
                "grid",
                "responsive",
                "mobile",
                "accessibility",
                "a11y",
                "wcag",
                "persona",
                "user research",
                "journey",
                "flow",
                "onboarding",
                "empty state",
                "error state",
                "loading",
                "animation",
                "motion",
                "prototype",
            ],
            description="UI/UX, visual design, user research, information architecture",
            can_delegate_to=[BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.MBA: BrainCapability(
            brain_type=BrainType.MBA,
            keywords=[
                "business",
                "strategy",
                "market",
                "revenue",
                "pricing",
                "competitor",
                "operations",
                "finance",
                "budget",
                "forecast",
                "kpi",
                "metric",
                "growth",
                "retention",
                "acquisition",
                "churn",
                "ltv",
                "cac",
                "unit economics",
                "go-to-market",
                "gtm",
                "positioning",
                "target market",
                "swot",
                "okr",
                "leadership",
                "team",
                "hiring",
                "culture",
                "process",
                "workflow",
                "efficiency",
            ],
            description="Business strategy, operations, financial analysis, leadership",
            can_delegate_to=[BrainType.DESIGN, BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.OPTIONS_TRADING: BrainCapability(
            brain_type=BrainType.OPTIONS_TRADING,
            keywords=[
                "trade",
                "trading",
                "option",
                "options",
                "stock",
                "equity",
                "portfolio",
                "market",
                "analysis",
                "technical analysis",
                "fundamental",
                "chart",
                "indicator",
                "signal",
                "algorithm",
                "backtest",
                "hedge",
                "volatility",
                "greeks",
                "delta",
                "gamma",
                "theta",
                "vega",
                "strike",
                "expiration",
                "call",
                "put",
                "spread",
                "straddle",
                "strangle",
            ],
            description="Trading algorithms, market analysis, options strategies",
            can_delegate_to=[BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.PRODUCT: BrainCapability(
            brain_type=BrainType.PRODUCT,
            keywords=[
                "product",
                "roadmap",
                "feature",
                "prd",
                "requirements",
                "spec",
                "specification",
                "priority",
                "prioritize",
                "backlog",
                "sprint",
                "agile",
                "user story",
                "acceptance criteria",
                "mvp",
                "iteration",
                "release",
                "launch",
                "feedback",
                "validation",
                "hypothesis",
                "experiment",
                "a/b test",
                "metric",
                "north star",
                "discovery",
                "ideation",
            ],
            description="Product strategy, roadmapping, feature prioritization",
            can_delegate_to=[BrainType.DESIGN, BrainType.ENGINEERING, BrainType.MBA],
            model_preference="sonnet",
        ),
        # Tier 2: Business & Strategy
        BrainType.FINANCE: BrainCapability(
            brain_type=BrainType.FINANCE,
            keywords=[
                "finance",
                "accounting",
                "budget",
                "financial",
                "fundraise",
                "investor",
                "capital",
                "cash flow",
                "balance sheet",
                "income statement",
                "p&l",
                "valuation",
                "roi",
                "runway",
                "burn rate",
                "equity",
                "debt",
                "tax",
                "audit",
            ],
            description="Accounting, budgeting, financial modeling, fundraising",
            can_delegate_to=[BrainType.MBA, BrainType.INVESTOR],
            model_preference="sonnet",
        ),
        BrainType.OPERATIONS: BrainCapability(
            brain_type=BrainType.OPERATIONS,
            keywords=[
                "operations",
                "supply chain",
                "logistics",
                "inventory",
                "procurement",
                "vendor",
                "supplier",
                "fulfillment",
                "warehouse",
                "shipping",
                "delivery",
                "process optimization",
                "efficiency",
                "lean",
                "six sigma",
            ],
            description="Supply chain, logistics, process optimization",
            can_delegate_to=[BrainType.MBA, BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.LEGAL: BrainCapability(
            brain_type=BrainType.LEGAL,
            keywords=[
                "legal",
                "contract",
                "compliance",
                "regulation",
                "intellectual property",
                "ip",
                "patent",
                "trademark",
                "copyright",
                "liability",
                "terms of service",
                "privacy policy",
                "gdpr",
                "ccpa",
                "nda",
                "agreement",
                "lawsuit",
                "litigation",
            ],
            description="Contracts, compliance, IP protection, regulatory",
            can_delegate_to=[BrainType.MBA],
            model_preference="sonnet",
        ),
        # Tier 3: Product & Design
        BrainType.GAME_DESIGN: BrainCapability(
            brain_type=BrainType.GAME_DESIGN,
            keywords=[
                "game",
                "game design",
                "level design",
                "mechanics",
                "gameplay",
                "player",
                "gamification",
                "achievement",
                "leaderboard",
                "progression",
                "difficulty",
                "balance",
                "fun",
                "engagement",
                "retention",
                "monetization",
                "f2p",
                "gacha",
            ],
            description="Game mechanics, level design, player psychology",
            can_delegate_to=[BrainType.DESIGN, BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.CONTENT: BrainCapability(
            brain_type=BrainType.CONTENT,
            keywords=[
                "content",
                "copywriting",
                "copy",
                "blog",
                "article",
                "seo",
                "storytelling",
                "narrative",
                "headline",
                "cta",
                "call to action",
                "editorial",
                "tone",
                "voice",
                "messaging",
                "tagline",
                "slogan",
            ],
            description="Copywriting, content strategy, SEO, storytelling",
            can_delegate_to=[BrainType.MARKETING, BrainType.BRANDING],
            model_preference="sonnet",
        ),
        BrainType.LOCALIZATION: BrainCapability(
            brain_type=BrainType.LOCALIZATION,
            keywords=[
                "localization",
                "l10n",
                "internationalization",
                "i18n",
                "translation",
                "language",
                "locale",
                "regional",
                "cultural",
                "multilingual",
                "rtl",
                "ltr",
                "currency",
                "date format",
                "timezone",
            ],
            description="i18n, l10n, regional adaptation, translation",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.CONTENT],
            model_preference="sonnet",
        ),
        # Tier 4: Growth & Revenue
        BrainType.MARKETING: BrainCapability(
            brain_type=BrainType.MARKETING,
            keywords=[
                "marketing",
                "campaign",
                "advertising",
                "ads",
                "brand",
                "awareness",
                "acquisition",
                "retention",
                "funnel",
                "conversion",
                "leads",
                "content marketing",
                "inbound",
                "outbound",
                "paid media",
                "organic",
                "seo",
                "sem",
                "ppc",
            ],
            description="Growth, acquisition, retention, brand positioning",
            can_delegate_to=[BrainType.CONTENT, BrainType.BRANDING, BrainType.GROWTH],
            model_preference="sonnet",
        ),
        BrainType.SALES: BrainCapability(
            brain_type=BrainType.SALES,
            keywords=[
                "sales",
                "selling",
                "close",
                "deal",
                "pipeline",
                "prospect",
                "lead",
                "objection",
                "negotiation",
                "quota",
                "commission",
                "crm",
                "salesforce",
                "demo",
                "pitch",
                "proposal",
                "contract",
                "enterprise",
                "b2b",
                "b2c",
            ],
            description="Sales process, objection handling, closing, pipeline",
            can_delegate_to=[BrainType.MARKETING, BrainType.MBA],
            model_preference="sonnet",
        ),
        BrainType.GROWTH: BrainCapability(
            brain_type=BrainType.GROWTH,
            keywords=[
                "growth",
                "viral",
                "referral",
                "plg",
                "product led growth",
                "loop",
                "network effect",
                "flywheel",
                "hack",
                "experiment",
                "a/b test",
                "optimization",
                "activation",
                "onboarding",
                "engagement",
                "stickiness",
            ],
            description="Growth hacking, viral loops, referrals, PLG",
            can_delegate_to=[BrainType.MARKETING, BrainType.PRODUCT],
            model_preference="sonnet",
        ),
        BrainType.PARTNERSHIP: BrainCapability(
            brain_type=BrainType.PARTNERSHIP,
            keywords=[
                "partnership",
                "partner",
                "alliance",
                "integration",
                "collaboration",
                "affiliate",
                "reseller",
                "channel",
                "distribution",
                "joint venture",
                "co-marketing",
                "ecosystem",
                "api partner",
            ],
            description="Business development, alliances, integrations",
            can_delegate_to=[BrainType.SALES, BrainType.MBA],
            model_preference="sonnet",
        ),
        BrainType.CUSTOMER_SUCCESS: BrainCapability(
            brain_type=BrainType.CUSTOMER_SUCCESS,
            keywords=[
                "customer success",
                "onboarding",
                "adoption",
                "churn",
                "retention",
                "renewal",
                "upsell",
                "cross-sell",
                "nps",
                "csat",
                "health score",
                "qbr",
                "expansion",
                "account management",
            ],
            description="Onboarding, retention, support, churn prevention",
            can_delegate_to=[BrainType.SUPPORT, BrainType.PRODUCT],
            model_preference="sonnet",
        ),
        # Tier 5: Technical
        BrainType.DATA: BrainCapability(
            brain_type=BrainType.DATA,
            keywords=[
                "data",
                "analytics",
                "ml",
                "machine learning",
                "ai",
                "pipeline",
                "etl",
                "warehouse",
                "lake",
                "spark",
                "hadoop",
                "sql",
                "bigquery",
                "redshift",
                "snowflake",
                "visualization",
                "tableau",
                "looker",
                "dbt",
            ],
            description="Analytics, ML/AI, data pipelines, warehousing",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.AI],
            model_preference="sonnet",
        ),
        BrainType.SECURITY: BrainCapability(
            brain_type=BrainType.SECURITY,
            keywords=[
                "security",
                "cybersecurity",
                "infosec",
                "vulnerability",
                "penetration test",
                "pentest",
                "encryption",
                "authentication",
                "authorization",
                "sso",
                "oauth",
                "rbac",
                "audit",
                "soc2",
                "iso27001",
                "hipaa",
                "pci",
                "firewall",
                "waf",
            ],
            description="Cybersecurity, compliance, risk management, auditing",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.LEGAL],
            model_preference="sonnet",
        ),
        BrainType.CLOUD: BrainCapability(
            brain_type=BrainType.CLOUD,
            keywords=[
                "cloud",
                "aws",
                "gcp",
                "azure",
                "serverless",
                "lambda",
                "s3",
                "ec2",
                "kubernetes",
                "k8s",
                "docker",
                "container",
                "terraform",
                "infrastructure",
                "iac",
                "cdn",
                "cloudflare",
                "scaling",
                "load balancer",
            ],
            description="AWS, GCP, Azure, serverless, infrastructure",
            can_delegate_to=[BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.MOBILE: BrainCapability(
            brain_type=BrainType.MOBILE,
            keywords=[
                "mobile",
                "ios",
                "android",
                "react native",
                "flutter",
                "swift",
                "kotlin",
                "app store",
                "play store",
                "push notification",
                "deep link",
                "mobile first",
                "responsive",
                "pwa",
                "native",
                "hybrid",
            ],
            description="iOS, Android, React Native, mobile-first",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.DESIGN],
            model_preference="sonnet",
        ),
        BrainType.QA: BrainCapability(
            brain_type=BrainType.QA,
            keywords=[
                "qa",
                "quality assurance",
                "testing",
                "test",
                "unit test",
                "integration test",
                "e2e",
                "end to end",
                "regression",
                "automation",
                "selenium",
                "cypress",
                "playwright",
                "jest",
                "pytest",
                "coverage",
                "bug",
                "defect",
            ],
            description="Testing strategies, automation, quality gates",
            can_delegate_to=[BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.AI: BrainCapability(
            brain_type=BrainType.AI,
            keywords=[
                "ai",
                "artificial intelligence",
                "llm",
                "large language model",
                "gpt",
                "claude",
                "prompt",
                "fine-tune",
                "embedding",
                "vector",
                "rag",
                "agent",
                "chatbot",
                "nlp",
                "computer vision",
                "neural network",
                "model",
            ],
            description="LLMs, ML models, AI strategy, prompting",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.DATA],
            model_preference="sonnet",
        ),
        BrainType.AUTOMATION: BrainCapability(
            brain_type=BrainType.AUTOMATION,
            keywords=[
                "automation",
                "workflow",
                "n8n",
                "zapier",
                "make",
                "integromat",
                "automate",
                "trigger",
                "action",
                "webhook",
                "integration",
                "rpa",
                "bot",
                "scheduled",
                "cron",
            ],
            description="Workflow automation, n8n, Zapier, integrations",
            can_delegate_to=[BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        BrainType.ANALYTICS: BrainCapability(
            brain_type=BrainType.ANALYTICS,
            keywords=[
                "analytics",
                "metrics",
                "kpi",
                "dashboard",
                "report",
                "insight",
                "tracking",
                "mixpanel",
                "amplitude",
                "segment",
                "google analytics",
                "gtm",
                "attribution",
                "funnel",
                "cohort",
                "retention",
            ],
            description="Metrics, dashboards, reporting, insights",
            can_delegate_to=[BrainType.DATA, BrainType.PRODUCT],
            model_preference="sonnet",
        ),
        BrainType.DEVREL: BrainCapability(
            brain_type=BrainType.DEVREL,
            keywords=[
                "devrel",
                "developer relations",
                "developer experience",
                "dx",
                "documentation",
                "docs",
                "sdk",
                "api docs",
                "tutorial",
                "guide",
                "example",
                "sample",
                "community",
                "developer",
                "advocate",
                "evangelist",
            ],
            description="Developer relations, documentation, community",
            can_delegate_to=[BrainType.ENGINEERING, BrainType.CONTENT],
            model_preference="sonnet",
        ),
        # Tier 6: Marketing Channels
        BrainType.BRANDING: BrainCapability(
            brain_type=BrainType.BRANDING,
            keywords=[
                "branding",
                "brand",
                "identity",
                "logo",
                "visual",
                "style guide",
                "brand voice",
                "tone",
                "personality",
                "positioning",
                "differentiation",
                "perception",
                "awareness",
            ],
            description="Brand identity, visual systems, brand voice",
            can_delegate_to=[BrainType.DESIGN, BrainType.MARKETING],
            model_preference="sonnet",
        ),
        BrainType.EMAIL: BrainCapability(
            brain_type=BrainType.EMAIL,
            keywords=[
                "email",
                "newsletter",
                "drip",
                "campaign",
                "mailchimp",
                "sendgrid",
                "deliverability",
                "open rate",
                "click rate",
                "unsubscribe",
                "spam",
                "template",
                "segmentation",
                "personalization",
            ],
            description="Email marketing, drip campaigns, deliverability",
            can_delegate_to=[BrainType.MARKETING, BrainType.CONTENT],
            model_preference="sonnet",
        ),
        BrainType.SOCIAL_MEDIA: BrainCapability(
            brain_type=BrainType.SOCIAL_MEDIA,
            keywords=[
                "social media",
                "social",
                "twitter",
                "instagram",
                "linkedin",
                "facebook",
                "tiktok",
                "youtube",
                "post",
                "content calendar",
                "engagement",
                "followers",
                "influencer",
                "hashtag",
                "viral",
            ],
            description="Social platforms, content calendar, engagement",
            can_delegate_to=[BrainType.MARKETING, BrainType.CONTENT],
            model_preference="sonnet",
        ),
        BrainType.VIDEO: BrainCapability(
            brain_type=BrainType.VIDEO,
            keywords=[
                "video",
                "youtube",
                "production",
                "editing",
                "script",
                "storyboard",
                "thumbnail",
                "b-roll",
                "interview",
                "webinar",
                "livestream",
                "podcast",
                "audio",
                "vlog",
            ],
            description="Video content, production, distribution",
            can_delegate_to=[BrainType.CONTENT, BrainType.MARKETING],
            model_preference="sonnet",
        ),
        BrainType.COMMUNITY: BrainCapability(
            brain_type=BrainType.COMMUNITY,
            keywords=[
                "community",
                "discord",
                "slack",
                "forum",
                "moderation",
                "engagement",
                "ambassador",
                "champion",
                "user group",
                "meetup",
                "event",
                "feedback",
                "support",
            ],
            description="Community building, moderation, engagement",
            can_delegate_to=[BrainType.SUPPORT, BrainType.DEVREL],
            model_preference="sonnet",
        ),
        # Tier 7: Business Operations
        BrainType.SUPPORT: BrainCapability(
            brain_type=BrainType.SUPPORT,
            keywords=[
                "support",
                "customer support",
                "help desk",
                "ticket",
                "zendesk",
                "intercom",
                "freshdesk",
                "knowledge base",
                "faq",
                "help center",
                "sla",
                "response time",
                "escalation",
            ],
            description="Customer support, ticketing, knowledge base",
            can_delegate_to=[BrainType.CUSTOMER_SUCCESS],
            model_preference="sonnet",
        ),
        BrainType.INVESTOR: BrainCapability(
            brain_type=BrainType.INVESTOR,
            keywords=[
                "investor",
                "fundraise",
                "funding",
                "seed",
                "series a",
                "vc",
                "venture capital",
                "pitch deck",
                "term sheet",
                "cap table",
                "dilution",
                "valuation",
                "due diligence",
                "board",
            ],
            description="Fundraising, investor relations, pitch decks",
            can_delegate_to=[BrainType.FINANCE, BrainType.MBA],
            model_preference="sonnet",
        ),
        BrainType.PRICING: BrainCapability(
            brain_type=BrainType.PRICING,
            keywords=[
                "pricing",
                "price",
                "monetization",
                "subscription",
                "freemium",
                "tier",
                "plan",
                "package",
                "discount",
                "promotion",
                "revenue model",
                "arpu",
                "ltv",
                "mrr",
                "arr",
            ],
            description="Pricing strategy, packaging, monetization",
            can_delegate_to=[BrainType.MBA, BrainType.PRODUCT],
            model_preference="sonnet",
        ),
        BrainType.INNOVATION: BrainCapability(
            brain_type=BrainType.INNOVATION,
            keywords=[
                "innovation",
                "r&d",
                "research",
                "experiment",
                "prototype",
                "poc",
                "proof of concept",
                "new venture",
                "incubator",
                "spin-off",
                "disrupt",
                "breakthrough",
                "emerging",
            ],
            description="R&D, new ventures, experimentation",
            can_delegate_to=[BrainType.PRODUCT, BrainType.ENGINEERING],
            model_preference="sonnet",
        ),
        # Tier 8: People
        BrainType.HR: BrainCapability(
            brain_type=BrainType.HR,
            keywords=[
                "hr",
                "human resources",
                "hiring",
                "recruit",
                "talent",
                "culture",
                "team",
                "onboarding",
                "performance",
                "review",
                "compensation",
                "benefits",
                "diversity",
                "inclusion",
                "dei",
                "employee",
            ],
            description="Hiring, culture, team building, performance",
            can_delegate_to=[BrainType.MBA],
            model_preference="sonnet",
        ),
        BrainType.RESEARCH: BrainCapability(
            brain_type=BrainType.RESEARCH,
            keywords=[
                "research",
                "market research",
                "competitor",
                "competitive analysis",
                "trend",
                "survey",
                "interview",
                "focus group",
                "insight",
                "report",
                "industry",
                "benchmark",
                "swot",
            ],
            description="Market research, competitor analysis, trends",
            can_delegate_to=[BrainType.MBA, BrainType.PRODUCT],
            model_preference="sonnet",
        ),
    }

    def __init__(self):
        """Initialize the brain selector."""
        self._keyword_index = self._build_keyword_index()

    def _build_keyword_index(self) -> dict[str, list[BrainType]]:
        """Build an inverted index of keywords to brain types.

        Returns:
            Dict mapping keywords to list of brain types that handle them.
        """
        index: dict[str, list[BrainType]] = {}
        for brain_type, capability in self.BRAIN_CAPABILITIES.items():
            for keyword in capability.keywords:
                if keyword not in index:
                    index[keyword] = []
                index[keyword].append(brain_type)
        return index

    def select_brain(self, task: str) -> BrainType:
        """Select the best brain for a task based on keyword matching.

        Args:
            task: The task description.

        Returns:
            BrainType that should handle this task.
        """
        task_lower = task.lower()
        scores: dict[BrainType, float] = dict.fromkeys(BrainType, 0)

        # Score based on keyword matches
        for keyword, brain_types in self._keyword_index.items():
            if keyword in task_lower:
                for brain_type in brain_types:
                    scores[brain_type] += 1

        # Find highest scoring brain
        best_brain = max(scores.items(), key=lambda x: x[1])

        # Default to engineering if no matches
        if best_brain[1] == 0:
            return BrainType.ENGINEERING

        return best_brain[0]

    def select_brains(self, task: str, max_brains: int = 3) -> list[BrainType]:
        """Select multiple relevant brains for a complex task.

        Args:
            task: The task description.
            max_brains: Maximum number of brains to return.

        Returns:
            List of BrainTypes sorted by relevance.
        """
        task_lower = task.lower()
        scores: dict[BrainType, float] = dict.fromkeys(BrainType, 0)

        # Score based on keyword matches
        for keyword, brain_types in self._keyword_index.items():
            if keyword in task_lower:
                for brain_type in brain_types:
                    scores[brain_type] += 1

        # Sort by score and filter zeros
        sorted_brains = sorted(
            [(bt, score) for bt, score in scores.items() if score > 0],
            key=lambda x: x[1],
            reverse=True,
        )

        if not sorted_brains:
            return [BrainType.ENGINEERING]

        return [bt for bt, _ in sorted_brains[:max_brains]]

    def get_brain_capability(self, brain_type: BrainType) -> BrainCapability:
        """Get the capability description for a brain.

        Args:
            brain_type: The brain type.

        Returns:
            BrainCapability with full description.
        """
        return self.BRAIN_CAPABILITIES.get(
            brain_type,
            BrainCapability(
                brain_type=brain_type,
                keywords=[],
                description="Unknown brain type",
                can_delegate_to=[],
                model_preference="sonnet",
            ),
        )

    def can_delegate(self, from_brain: BrainType, to_brain: BrainType) -> bool:
        """Check if one brain can delegate to another.

        Args:
            from_brain: The brain making the delegation.
            to_brain: The brain receiving the delegation.

        Returns:
            True if delegation is allowed.
        """
        capability = self.BRAIN_CAPABILITIES.get(from_brain)
        if not capability:
            return False
        return to_brain in capability.can_delegate_to

    def get_routing_explanation(self, task: str) -> str:
        """Get an explanation of why certain brains were selected.

        Args:
            task: The task description.

        Returns:
            Human-readable explanation.
        """
        task_lower = task.lower()
        matches: dict[BrainType, list[str]] = {}

        for keyword, brain_types in self._keyword_index.items():
            if keyword in task_lower:
                for brain_type in brain_types:
                    if brain_type not in matches:
                        matches[brain_type] = []
                    matches[brain_type].append(keyword)

        if not matches:
            return "No specific keywords matched. Defaulting to Engineering brain."

        explanation_parts = []
        for brain_type, keywords in sorted(
            matches.items(), key=lambda x: len(x[1]), reverse=True
        ):
            kw_str = ", ".join(keywords[:5])
            if len(keywords) > 5:
                kw_str += f", ... (+{len(keywords) - 5} more)"
            explanation_parts.append(f"- {brain_type.value}: matched [{kw_str}]")

        return "Keyword matches:\n" + "\n".join(explanation_parts)

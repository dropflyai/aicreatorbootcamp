"""Task decomposition for CEO agent."""

import anthropic
from pydantic import BaseModel


class SubTask(BaseModel):
    """A decomposed sub-task."""

    id: str
    description: str
    required_brain: str  # engineering, design, mba, etc.
    dependencies: list[str] = []  # IDs of tasks that must complete first
    priority: int = 1  # 1 = highest, 3 = lowest
    estimated_complexity: str = "medium"  # low, medium, high


class DecomposedTask(BaseModel):
    """Result of task decomposition."""

    original_task: str
    subtasks: list[SubTask]
    execution_order: list[str]  # Ordered list of subtask IDs
    reasoning: str


class TaskDecomposer:
    """Decompose complex tasks into brain-specific subtasks.

    Uses Claude to analyze tasks and break them into specialist work items
    that can be routed to the appropriate brain agents.
    """

    DECOMPOSITION_PROMPT = """You are a task decomposition specialist for a multi-agent AI system.

Your job is to analyze user requests and break them into subtasks that can be handled by specialist agents.

## Available Specialist Brains (37 Total)

### Core Brains (Complete)
1. **engineering** - Code, APIs, databases, infrastructure, DevOps, automation, testing
2. **design** - UI/UX, visual design, user research, information architecture, branding
3. **mba** - Business strategy, operations, financial analysis, market research, leadership
4. **options_trading** - Trading algorithms, market analysis, options strategies
5. **ceo** - Orchestration (this is you - do not assign tasks to yourself)

### Business & Strategy
6. **finance** - Accounting, budgeting, financial modeling, fundraising
7. **operations** - Supply chain, logistics, process optimization
8. **legal** - Contracts, compliance, IP protection, regulatory

### Product & Design
9. **product** - Product strategy, roadmapping, feature prioritization, PRDs
10. **game_design** - Game mechanics, level design, player psychology
11. **content** - Copywriting, content strategy, SEO, storytelling
12. **localization** - i18n, l10n, regional adaptation, translation

### Growth & Revenue
13. **marketing** - Growth, acquisition, retention, brand positioning
14. **sales** - Sales process, objection handling, closing, pipeline
15. **growth** - Growth hacking, viral loops, referrals, PLG
16. **partnership** - Business development, alliances, integrations
17. **customer_success** - Onboarding, retention, support, churn prevention

### Technical
18. **data** - Analytics, ML/AI, data pipelines, warehousing
19. **security** - Cybersecurity, compliance, risk management, auditing
20. **cloud** - AWS, GCP, Azure, serverless, infrastructure
21. **mobile** - iOS, Android, React Native, mobile-first
22. **qa** - Testing strategies, automation, quality gates
23. **ai** - LLMs, ML models, AI strategy, prompting
24. **automation** - Workflow automation, n8n, Zapier, integrations
25. **analytics** - Metrics, dashboards, reporting, insights
26. **devrel** - Developer relations, documentation, community

### Marketing Channels
27. **branding** - Brand identity, visual systems, brand voice
28. **email** - Email marketing, drip campaigns, deliverability
29. **social_media** - Social platforms, content calendar, engagement
30. **video** - Video content, production, distribution
31. **community** - Community building, moderation, engagement

### Business Operations
32. **support** - Customer support, ticketing, knowledge base
33. **investor** - Fundraising, investor relations, pitch decks
34. **pricing** - Pricing strategy, packaging, monetization
35. **innovation** - R&D, new ventures, experimentation

### People
36. **hr** - Hiring, culture, team building, performance
37. **research** - Market research, competitor analysis, trends

## Rules

1. Break tasks into the smallest reasonable units that a specialist can handle
2. Identify dependencies between subtasks (what must be done before what)
3. Assign each subtask to exactly ONE brain
4. Order subtasks so dependencies are respected
5. Keep subtasks focused - don't combine unrelated work

## Output Format

Respond with JSON in this exact format:
```json
{
  "subtasks": [
    {
      "id": "task_1",
      "description": "Clear description of what to do",
      "required_brain": "engineering",
      "dependencies": [],
      "priority": 1,
      "estimated_complexity": "medium"
    }
  ],
  "execution_order": ["task_1", "task_2"],
  "reasoning": "Brief explanation of the decomposition approach"
}
```

## Example

User: "Build a landing page for a SaaS product with user signup"

Response:
```json
{
  "subtasks": [
    {
      "id": "task_1",
      "description": "Research target audience and define value proposition",
      "required_brain": "mba",
      "dependencies": [],
      "priority": 1,
      "estimated_complexity": "medium"
    },
    {
      "id": "task_2",
      "description": "Design landing page layout, visual hierarchy, and component specifications",
      "required_brain": "design",
      "dependencies": ["task_1"],
      "priority": 1,
      "estimated_complexity": "high"
    },
    {
      "id": "task_3",
      "description": "Implement landing page frontend with signup form",
      "required_brain": "engineering",
      "dependencies": ["task_2"],
      "priority": 1,
      "estimated_complexity": "medium"
    },
    {
      "id": "task_4",
      "description": "Create backend API endpoint for user registration",
      "required_brain": "engineering",
      "dependencies": [],
      "priority": 2,
      "estimated_complexity": "medium"
    }
  ],
  "execution_order": ["task_1", "task_4", "task_2", "task_3"],
  "reasoning": "MBA research informs design, design informs frontend. Backend can start in parallel."
}
```

Now analyze the following task and provide decomposition:
"""

    def __init__(
        self,
        api_key: str | None = None,
        model: str = "claude-sonnet-4-20250514",
    ):
        """Initialize the task decomposer.

        Args:
            api_key: Anthropic API key.
            model: Model to use for decomposition.
        """
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model

    def decompose(self, task: str, context: str | None = None) -> DecomposedTask:
        """Decompose a task into subtasks.

        Args:
            task: The user's task description.
            context: Additional context about the project.

        Returns:
            DecomposedTask with subtasks and execution order.
        """
        prompt = self.DECOMPOSITION_PROMPT

        if context:
            prompt += f"\n\nAdditional context:\n{context}\n\n"

        prompt += f"Task to decompose:\n{task}"

        response = self.client.messages.create(
            model=self.model,
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )

        # Parse the JSON response
        response_text = response.content[0].text

        # Extract JSON from response (handle markdown code blocks)
        import json
        import re

        json_match = re.search(r"```json\s*(.*?)\s*```", response_text, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            # Try to find raw JSON
            json_match = re.search(r"\{.*\}", response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group(0)
            else:
                # Fallback: single task
                return DecomposedTask(
                    original_task=task,
                    subtasks=[
                        SubTask(
                            id="task_1",
                            description=task,
                            required_brain="engineering",
                            dependencies=[],
                            priority=1,
                            estimated_complexity="medium",
                        )
                    ],
                    execution_order=["task_1"],
                    reasoning="Could not decompose - treating as single task",
                )

        try:
            data = json.loads(json_str)
            subtasks = [SubTask(**st) for st in data["subtasks"]]
            return DecomposedTask(
                original_task=task,
                subtasks=subtasks,
                execution_order=data["execution_order"],
                reasoning=data["reasoning"],
            )
        except (json.JSONDecodeError, KeyError) as e:
            # Fallback for parsing errors
            return DecomposedTask(
                original_task=task,
                subtasks=[
                    SubTask(
                        id="task_1",
                        description=task,
                        required_brain="engineering",
                        dependencies=[],
                        priority=1,
                        estimated_complexity="medium",
                    )
                ],
                execution_order=["task_1"],
                reasoning=f"Parsing error ({e}) - treating as single task",
            )

    def is_simple_task(self, task: str) -> bool:
        """Check if a task is simple enough to skip decomposition.

        Args:
            task: The task description.

        Returns:
            True if task should be handled directly without decomposition.
        """
        # Simple heuristics for detecting single-brain tasks
        simple_indicators = [
            len(task.split()) < 10,  # Very short task
            "fix" in task.lower() and "bug" in task.lower(),  # Bug fix
            task.lower().startswith("update "),  # Simple update
            task.lower().startswith("add ") and len(task.split()) < 15,
        ]

        return any(simple_indicators)

    def get_primary_brain(self, task: str) -> str:
        """Quickly determine the primary brain for a simple task.

        Args:
            task: The task description.

        Returns:
            Brain name that should handle this task.
        """
        task_lower = task.lower()

        # Keyword matching for quick routing (ordered by specificity)

        # Technical brains
        if any(
            kw in task_lower
            for kw in [" ai ", " ai,", "llm", "prompt", "ml ", "machine learning"]
        ):
            return "ai"

        if any(
            kw in task_lower for kw in ["security", "pentest", "vulnerability", "audit"]
        ):
            return "security"

        if any(
            kw in task_lower
            for kw in ["cloud", "aws", "gcp", "azure", "kubernetes", "docker"]
        ):
            return "cloud"

        if any(
            kw in task_lower
            for kw in ["mobile", "ios", "android", "react native", "flutter"]
        ):
            return "mobile"

        if any(kw in task_lower for kw in ["qa", "test", "testing", "quality"]):
            return "qa"

        if any(
            kw in task_lower for kw in ["data", "analytics", "pipeline", "warehouse"]
        ):
            return "data"

        if any(kw in task_lower for kw in ["automation", "workflow", "zapier", "n8n"]):
            return "automation"

        if any(
            kw in task_lower
            for kw in [
                "code",
                "api",
                "database",
                "deploy",
                "bug",
                "backend",
                "frontend",
                "server",
                "endpoint",
            ]
        ):
            return "engineering"

        # Design brains
        if any(
            kw in task_lower
            for kw in [
                "design",
                "ui",
                "ux",
                "layout",
                "color",
                "font",
                "wireframe",
                "mockup",
                "component",
            ]
        ):
            return "design"

        if any(kw in task_lower for kw in ["brand", "branding", "logo", "identity"]):
            return "branding"

        if any(
            kw in task_lower for kw in ["game", "gameplay", "level design", "mechanics"]
        ):
            return "game_design"

        # Growth & Revenue brains
        if any(
            kw in task_lower for kw in ["marketing", "campaign", "advertising", "ads"]
        ):
            return "marketing"

        if any(
            kw in task_lower for kw in ["sales", "selling", "close", "deal", "pipeline"]
        ):
            return "sales"

        if any(kw in task_lower for kw in ["growth", "viral", "referral", "plg"]):
            return "growth"

        if any(kw in task_lower for kw in ["partnership", "partner", "alliance"]):
            return "partnership"

        if any(kw in task_lower for kw in ["customer success", "onboarding", "churn"]):
            return "customer_success"

        # Marketing channels
        if any(kw in task_lower for kw in ["email", "newsletter", "drip"]):
            return "email"

        if any(
            kw in task_lower
            for kw in ["social media", "twitter", "instagram", "linkedin", "tiktok"]
        ):
            return "social_media"

        if any(kw in task_lower for kw in ["video", "youtube", "production"]):
            return "video"

        if any(kw in task_lower for kw in ["community", "discord", "slack", "forum"]):
            return "community"

        if any(
            kw in task_lower
            for kw in ["content", "copywriting", "blog", "article", "seo"]
        ):
            return "content"

        # Business brains
        if any(
            kw in task_lower for kw in ["finance", "accounting", "budget", "financial"]
        ):
            return "finance"

        if any(kw in task_lower for kw in ["legal", "contract", "compliance", "ip"]):
            return "legal"

        if any(kw in task_lower for kw in ["operations", "supply chain", "logistics"]):
            return "operations"

        if any(
            kw in task_lower for kw in ["investor", "fundraise", "pitch deck", "vc"]
        ):
            return "investor"

        if any(kw in task_lower for kw in ["pricing", "monetization", "subscription"]):
            return "pricing"

        if any(kw in task_lower for kw in ["support", "help desk", "ticket"]):
            return "support"

        if any(
            kw in task_lower for kw in ["hr", "hiring", "recruit", "culture", "team"]
        ):
            return "hr"

        if any(
            kw in task_lower for kw in ["research", "competitor", "market research"]
        ):
            return "research"

        # Product
        if any(
            kw in task_lower
            for kw in [
                "product",
                "roadmap",
                "feature",
                "prd",
                "requirements",
                "priorit",
            ]
        ):
            return "product"

        # Trading
        if any(
            kw in task_lower
            for kw in [
                "trade",
                "option",
                "stock",
                "portfolio",
                "market analysis",
            ]
        ):
            return "options_trading"

        # Business strategy
        if any(
            kw in task_lower
            for kw in [
                "business",
                "strategy",
                "market",
                "revenue",
                "competitor",
            ]
        ):
            return "mba"

        # Default to engineering for technical tasks
        return "engineering"

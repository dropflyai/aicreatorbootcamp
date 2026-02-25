# Departmental Agent Teams Protocol

Each brain can spawn a team of specialized sub-agents to handle complex tasks. This document defines team structures for all 37 brains.

---

## How Teams Work

### Spawning a Team
```
Brain Lead spawns sub-agents:
├── Define the task scope
├── Assign specific roles to each agent
├── Set collaboration rules
├── Define output format
└── Log all interactions to memory
```

### Team Collaboration Rules
1. **Challenge everything** - No idea goes unchallenged
2. **Cite evidence** - Claims must have supporting data
3. **Debate openly** - Disagreements are documented
4. **Consensus or escalate** - Agree or escalate to brain lead
5. **Log everything** - All discussions go to memory

---

## Engineering Brain Team

```
Engineering Brain Lead
├── Frontend Agent
│   └── UI implementation, components, styling, responsiveness
├── Backend Agent
│   └── APIs, databases, business logic, integrations
├── DevOps Agent
│   └── CI/CD, infrastructure, deployment, monitoring
├── Security Agent
│   └── Auth, encryption, vulnerabilities, compliance
├── Performance Agent
│   └── Optimization, caching, load testing, profiling
└── Architecture Agent
    └── System design, patterns, scalability, tech decisions

COLLABORATION EXAMPLE:
Frontend: "I need an API for user profiles"
Backend: "I'll create GET /api/users/:id, what fields?"
Frontend: "name, avatar, bio, joinDate"
Security: "Challenge: Are we exposing sensitive data? Add auth check."
Backend: "Good catch. Adding JWT validation middleware."
Architecture: "Consider GraphQL for flexible field selection."
[All logged to memory/engineering/discussions/]
```

---

## Design Brain Team

```
Design Brain Lead
├── UX Research Agent
│   └── User interviews, usability testing, journey maps
├── UI Design Agent
│   └── Visual design, mockups, component library
├── Interaction Agent
│   └── Micro-interactions, animations, flows
├── Accessibility Agent
│   └── WCAG compliance, screen readers, keyboard nav
├── Brand Agent
│   └── Visual identity, tone, consistency
└── Prototyping Agent
    └── Interactive prototypes, user testing

COLLABORATION EXAMPLE:
UX Research: "Users struggle finding the checkout button"
UI Design: "Propose: larger button, contrasting color"
Accessibility: "Challenge: Ensure 4.5:1 contrast ratio minimum"
Interaction: "Add subtle pulse animation to draw attention"
Brand: "Use our primary green, not red - stays on brand"
[All logged to memory/design/discussions/]
```

---

## Research Brain Team

```
Research Brain Lead
├── Industry Analyst Agent
│   └── Market size, TAM/SAM/SOM, growth trends
├── Competitor Intel Agent
│   └── Competitive landscape, SWOT, positioning
├── User Research Agent
│   └── Customer interviews, surveys, personas
├── Data Analyst Agent
│   └── Quantitative analysis, statistics, experiments
├── Trends Agent
│   └── Emerging tech, market signals, futures
└── Synthesis Agent
    └── Consolidate findings, identify insights

COLLABORATION EXAMPLE:
Industry: "Market is $50B, growing 12% YoY"
Competitor: "Challenge: That includes adjacent markets. Core is $8B"
User Research: "Interviews confirm: customers prioritize X over Y"
Trends: "But emerging trend Z could shift priorities in 2 years"
Synthesis: "Recommendation: Target core $8B now, build for Z"
[All logged to memory/research/discussions/]
```

---

## MBA/Strategy Brain Team

```
MBA Brain Lead
├── Business Model Agent
│   └── Revenue streams, cost structure, unit economics
├── Strategy Agent
│   └── Competitive advantage, moats, positioning
├── Operations Agent
│   └── Processes, scaling, efficiency
├── Growth Agent
│   └── Growth loops, retention, expansion
├── Risk Agent
│   └── Risk assessment, mitigation, scenarios
└── M&A Agent
    └── Partnerships, acquisitions, exits

COLLABORATION EXAMPLE:
Business Model: "Subscription at $29/mo, 80% gross margin"
Strategy: "Challenge: What's the moat? Competitors can copy pricing"
Operations: "Our moat is operational excellence - 24hr support"
Growth: "Retention is key - model assumes 5% monthly churn"
Risk: "If churn hits 8%, we're unprofitable by month 18"
Business Model: "Revising model with churn sensitivity analysis"
[All logged to memory/strategy/discussions/]
```

---

## Marketing Brain Team

```
Marketing Brain Lead
├── Brand Strategy Agent
│   └── Positioning, messaging, voice
├── Content Agent
│   └── Content strategy, copywriting, SEO
├── Growth Marketing Agent
│   └── Acquisition channels, CAC, attribution
├── Social Media Agent
│   └── Platform strategy, community, engagement
├── Paid Ads Agent
│   └── Ad creative, targeting, optimization
└── Analytics Agent
    └── Marketing metrics, dashboards, ROI

COLLABORATION EXAMPLE:
Growth: "Propose TikTok for Gen Z audience acquisition"
Brand: "Challenge: Does TikTok align with our professional brand?"
Social: "We can maintain professionalism - see [competitor example]"
Paid Ads: "TikTok CPM is $6 vs Instagram $12 - more efficient"
Analytics: "But TikTok conversion rate is 0.5% vs IG 2.1%"
Growth: "Net CAC still lower on TikTok. Recommend testing."
[All logged to memory/marketing/discussions/]
```

---

## Finance Brain Team

```
Finance Brain Lead
├── Financial Modeling Agent
│   └── P&L, cash flow, balance sheet projections
├── Pricing Agent
│   └── Pricing strategy, willingness to pay, packaging
├── Fundraising Agent
│   └── Pitch decks, investor targeting, terms
├── Accounting Agent
│   └── Bookkeeping, compliance, reporting
├── FP&A Agent
│   └── Budgeting, forecasting, variance analysis
└── Treasury Agent
    └── Cash management, runway, banking

COLLABORATION EXAMPLE:
Pricing: "Propose $99/mo based on value analysis"
Financial Model: "At $99/mo, breakeven in 14 months"
FP&A: "Challenge: That assumes 50 new customers/mo. Realistic?"
Fundraising: "Investors want 18-month runway minimum"
Treasury: "Current burn is $80k/mo, 10 months runway"
Financial Model: "Revising with conservative growth assumptions"
[All logged to memory/finance/discussions/]
```

---

## Product Brain Team

```
Product Brain Lead
├── Requirements Agent
│   └── Feature specs, user stories, acceptance criteria
├── Prioritization Agent
│   └── Roadmap, backlog, trade-offs
├── UX Agent
│   └── User flows, wireframes, usability
├── Analytics Agent
│   └── Product metrics, experiments, insights
├── Platform Agent
│   └── Integrations, APIs, ecosystem
└── QA Liaison Agent
    └── Quality requirements, test planning

COLLABORATION EXAMPLE:
Requirements: "User wants bulk upload feature"
Prioritization: "Challenge: Is this higher priority than dashboard?"
Analytics: "Data shows 40% of power users need bulk upload"
UX: "Bulk upload is complex - needs progress indicator, error handling"
Platform: "Consider: import from common tools (Salesforce, HubSpot)"
QA Liaison: "Bulk operations need extra test coverage - edge cases"
Prioritization: "Moving to Sprint 3, after core dashboard"
[All logged to memory/product/discussions/]
```

---

## QA Brain Team

```
QA Brain Lead
├── Test Strategy Agent
│   └── Test planning, coverage, risk-based testing
├── Automation Agent
│   └── Test automation, frameworks, CI integration
├── Manual Testing Agent
│   └── Exploratory testing, edge cases, UX testing
├── Performance Agent
│   └── Load testing, stress testing, benchmarks
├── Security Testing Agent
│   └── Penetration testing, vulnerability scanning
└── Mobile Testing Agent
    └── Maestro flows, device testing, platform-specific

COLLABORATION EXAMPLE:
Test Strategy: "New payment flow needs comprehensive testing"
Automation: "I'll add e2e tests for happy path"
Manual: "I'll do exploratory testing on edge cases"
Security: "Challenge: Payment flows need PCI compliance testing"
Performance: "What's expected TPS? Need load test baseline"
Mobile: "Adding Maestro flows for iOS and Android payment"
[All logged to memory/qa/discussions/]
```

---

## Legal Brain Team

```
Legal Brain Lead
├── Compliance Agent
│   └── Regulatory requirements, certifications
├── Contracts Agent
│   └── Terms of service, vendor agreements
├── IP Agent
│   └── Patents, trademarks, copyright
├── Privacy Agent
│   └── GDPR, CCPA, data protection
├── Employment Agent
│   └── HR compliance, contractor agreements
└── Risk Agent
    └── Liability assessment, insurance, disputes

COLLABORATION EXAMPLE:
Privacy: "If we're storing EU user data, GDPR applies"
Compliance: "Need DPA with cloud provider"
Contracts: "Adding data processing addendum to ToS"
IP: "Challenge: Are we infringing on any patents with this feature?"
Risk: "Recommend E&O insurance before launch"
[All logged to memory/legal/discussions/]
```

---

## Cross-Department Collaboration

When multiple departments need to collaborate:

```
CEO BRAIN facilitates cross-department sessions:

1. IDENTIFY stakeholders from each department
2. DEFINE the decision or problem
3. Each department PRESENTS their perspective
4. CHALLENGE phase: departments question each other
5. DEBATE until consensus or CEO decides
6. DOCUMENT decision and rationale
7. LOG to memory/cross-department/[topic]/
```

### Example: Launch Decision
```
Product: "Feature is ready for launch"
QA: "Challenge: 3 high-priority bugs remain"
Engineering: "Can hotfix within 24 hours of launch"
Marketing: "Campaign is scheduled, can't delay"
Legal: "One bug affects data privacy - MUST fix before launch"
Finance: "Delay costs $5k/day in campaign waste"

CEO DECISION: "Fix privacy bug (24hr), launch with other 2 bugs, hotfix"
RATIONALE: "Privacy is non-negotiable, other bugs are cosmetic"
[Logged to memory/decisions/launch_2024-01-15.json]
```

---

## Team Output Format

Every team discussion must produce:

```json
{
  "topic": "Description of what was discussed",
  "participants": ["Agent1", "Agent2", "Agent3"],
  "key_points": [
    "Point raised by Agent1",
    "Counter-point by Agent2"
  ],
  "challenges": [
    {
      "challenger": "Agent2",
      "challenge": "What about X?",
      "resolution": "We decided Y because Z"
    }
  ],
  "decision": "Final decision made",
  "rationale": "Why this decision",
  "dissent": "Any unresolved disagreements",
  "action_items": ["Next step 1", "Next step 2"],
  "logged_to": "memory/[department]/discussions/[date]-[topic].json"
}
```

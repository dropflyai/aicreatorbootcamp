# Brain Communication Wiring Map

**Complete Inter-Brain Communication Architecture**

This document defines how all 37 brains communicate, collaborate, challenge each other, and produce superior outcomes through structured debate.

---

## PART I: WIRING ARCHITECTURE

### 1.1 Master Communication Topology

```
                                    ┌─────────────────────────────────────┐
                                    │           CEO BRAIN                 │
                                    │      (Master Orchestrator)          │
                                    │  - Routing & Decomposition          │
                                    │  - Conflict Resolution              │
                                    │  - Final Decision Authority         │
                                    └─────────────┬───────────────────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────────────────────┐
                    │                             │                             │
        ┌───────────▼───────────┐   ┌─────────────▼─────────────┐   ┌──────────▼──────────┐
        │   STRATEGY CLUSTER    │   │    EXECUTION CLUSTER      │   │   SUPPORT CLUSTER   │
        │                       │   │                           │   │                     │
        │  MBA ◄──► Finance     │   │  Engineering ◄──► QA      │   │  Legal ◄──► HR      │
        │   │         │         │   │       │           │       │   │    │         │      │
        │   ▼         ▼         │   │       ▼           ▼       │   │    ▼         ▼      │
        │ Research ◄─► Investor │   │  Design ◄──► Product      │   │ Operations ◄► Support│
        └───────────────────────┘   └───────────────────────────┘   └─────────────────────┘
                    │                             │                             │
                    └─────────────────────────────┼─────────────────────────────┘
                                                  │
        ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
        │                                         │                                         │
┌───────▼──────────┐   ┌─────────────▼─────────────┐   ┌─────────────▼─────────────┐
│   GROWTH CLUSTER │   │     TECHNICAL CLUSTER     │   │    CHANNEL CLUSTER        │
│                  │   │                           │   │                           │
│ Marketing ◄──►   │   │   Data ◄──► AI            │   │  Branding ◄──► Content    │
│    │      Sales  │   │    │         │            │   │      │           │        │
│    ▼         │   │   │    ▼         ▼            │   │      ▼           ▼        │
│ Growth ◄──►  │   │   │ Security ◄──► Cloud       │   │  Social ◄──► Email       │
│ Partnership ─┘   │   │    │         │            │   │      │           │        │
│    │             │   │    ▼         ▼            │   │      ▼           ▼        │
│    ▼             │   │ Mobile ◄──► Automation    │   │  Video ◄──► Community    │
│ Customer Success │   │    │         │            │   │                           │
└──────────────────┘   │    ▼         ▼            │   └───────────────────────────┘
                       │ Analytics ◄─► DevRel      │
                       └───────────────────────────┘
```

### 1.2 Communication Pathways

#### Direct Pathways (Brains Can Communicate Directly)

| Brain A | Brain B | Purpose | Handoff Format |
|---------|---------|---------|----------------|
| Engineering | Design | Implementation specs, feasibility | Component specs, API contracts |
| Engineering | QA | Test requirements, bug reports | Test cases, defect logs |
| Design | Product | User research, wireframes | PRDs, user stories |
| Product | Engineering | Requirements, priorities | Technical specs |
| Marketing | Sales | Lead qualification, messaging | Campaign assets, playbooks |
| Marketing | Content | Content strategy, SEO | Content briefs, calendars |
| Finance | MBA | Financial modeling, unit economics | Financial projections |
| Legal | Operations | Compliance, contracts | Compliance checklists |
| Data | AI | Data pipelines, model requirements | Data schemas, model specs |
| Security | Engineering | Security requirements, audits | Security protocols |

#### Escalation Pathways (Must Route Through CEO Brain)

| Trigger | Route | Resolution |
|---------|-------|------------|
| Cross-cluster conflict | Any cluster → CEO | CEO facilitates, decides |
| Resource contention | Any two brains | CEO allocates, prioritizes |
| Strategic disagreement | Any brain with strategic impact | CEO applies Decision Framework |
| Multi-domain coordination | 3+ brains involved | CEO orchestrates |

### 1.3 Message Protocol

Every inter-brain communication MUST follow this structure:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BRAIN COMMUNICATION MESSAGE                       │
├─────────────────────────────────────────────────────────────────────┤
│  FROM: [Source Brain]                                                │
│  TO: [Target Brain(s)]                                               │
│  CC: [Other interested brains]                                       │
│  TYPE: [REQUEST | RESPONSE | CHALLENGE | PROPOSAL | HANDOFF]         │
│  PRIORITY: [P0-Critical | P1-High | P2-Medium | P3-Low]              │
│  THREAD_ID: [Unique conversation identifier]                         │
├─────────────────────────────────────────────────────────────────────┤
│  SUBJECT: [Brief description]                                        │
│                                                                      │
│  CONTENT:                                                            │
│  [Message body with structured data]                                 │
│                                                                      │
│  SOURCES: [MANDATORY - Citations supporting claims]                  │
│  - Source 1: [URL/Reference]                                         │
│  - Source 2: [URL/Reference]                                         │
│                                                                      │
│  EXPECTED_RESPONSE: [What you need back]                             │
│  DEADLINE: [When you need it]                                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## PART II: CLUSTER DEFINITIONS

### 2.1 Strategy Cluster

**Purpose:** Business strategy, financial planning, market positioning

**Members:** CEO, MBA, Finance, Research, Investor

**Cluster Lead:** CEO Brain

**Internal Communication:**
```
MBA ─────────► Finance (financial modeling requests)
      ◄─────── (unit economics, projections)

Research ────► MBA (market data, competitor intel)
        ◄──── (research questions, priorities)

Investor ────► Finance (cap table, fundraising)
         ◄─── (financial due diligence)
```

**External Interfaces:**
- → Execution Cluster: Strategic requirements, priorities
- → Support Cluster: Compliance requirements, risk tolerance
- → Growth Cluster: Growth targets, market positioning

### 2.2 Execution Cluster

**Purpose:** Build and ship products

**Members:** Engineering, Design, Product, QA

**Cluster Lead:** Product Brain (scope decisions) / Engineering Brain (technical decisions)

**Internal Communication:**
```
Product ─────► Design (feature requirements)
        ◄──── (wireframes, user flows)

Design ──────► Engineering (design specs)
        ◄───── (feasibility, constraints)

Engineering ──► QA (code ready for testing)
           ◄─── (test results, bugs)

QA ──────────► Product (quality reports)
        ◄───── (acceptance criteria)
```

**External Interfaces:**
- ← Strategy Cluster: Business requirements, priorities
- → Growth Cluster: Feature releases, capabilities
- → Technical Cluster: Infrastructure needs

### 2.3 Growth Cluster

**Purpose:** Acquire, retain, and expand customers

**Members:** Marketing, Sales, Growth, Partnership, Customer Success

**Cluster Lead:** Marketing Brain (acquisition) / Customer Success Brain (retention)

**Internal Communication:**
```
Marketing ───► Sales (qualified leads)
         ◄─── (deal feedback, win/loss)

Growth ──────► Marketing (experiment results)
         ◄─── (campaign data)

Partnership ──► Sales (partner leads)
           ◄─── (partner feedback)

Customer Success ──► Marketing (retention data)
              ◄──── (customer targeting)
```

**External Interfaces:**
- ← Execution Cluster: Feature releases for marketing
- ← Strategy Cluster: Positioning, pricing guidance
- → Channel Cluster: Content requirements

### 2.4 Technical Cluster

**Purpose:** Technical infrastructure, data, and AI capabilities

**Members:** Data, Security, Cloud, Mobile, AI, Automation, Analytics, DevRel

**Cluster Lead:** Data Brain (data decisions) / Security Brain (security decisions)

**Internal Communication:**
```
Data ────────► AI (training data, pipelines)
        ◄───── (model requirements)

Security ────► Cloud (security requirements)
         ◄─── (infrastructure audit)

Mobile ──────► Cloud (backend needs)
        ◄───── (API specs)

Analytics ───► Data (reporting needs)
         ◄─── (data models)

Automation ──► Cloud (deployment needs)
          ◄── (infrastructure APIs)

DevRel ──────► Engineering (API feedback)
         ◄─── (API documentation needs)
```

**External Interfaces:**
- ← Execution Cluster: Technical implementation needs
- → Execution Cluster: Infrastructure capabilities

### 2.5 Channel Cluster

**Purpose:** Content creation and distribution across channels

**Members:** Branding, Content, Email, Social Media, Video, Community

**Cluster Lead:** Content Brain (content strategy) / Branding Brain (brand consistency)

**Internal Communication:**
```
Branding ────► Content (brand guidelines)
         ◄─── (content for approval)

Content ─────► Email (email copy)
         ◄─── (performance data)

Content ─────► Social Media (social copy)
         ◄─── (engagement data)

Content ─────► Video (scripts)
         ◄─── (video assets)

Community ───► Content (community insights)
          ◄── (community content)
```

**External Interfaces:**
- ← Growth Cluster: Marketing requirements
- ← Execution Cluster: Product content needs

### 2.6 Support Cluster

**Purpose:** Operations, legal, HR, and customer support

**Members:** Operations, Legal, HR, Support

**Cluster Lead:** Operations Brain (processes) / Legal Brain (compliance)

**Internal Communication:**
```
Legal ───────► Operations (compliance requirements)
         ◄─── (process documentation)

Legal ───────► HR (employment law)
         ◄─── (HR policies)

Operations ──► Support (process improvements)
          ◄── (customer feedback)
```

**External Interfaces:**
- ← Strategy Cluster: Compliance requirements
- ← Execution Cluster: Operational needs
- → All Clusters: Policy and compliance guidance

---

## PART III: DEPARTMENT SPAWNING SYSTEM

### 3.1 Spawning Protocol

Each brain can spawn a **department** of specialized sub-agents to handle complex tasks.

**Spawning Sequence:**
```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEPARTMENT SPAWN PROTOCOL                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  1. BRAIN LEAD receives complex task requiring multiple perspectives  │
│                              │                                         │
│                              ▼                                         │
│  2. SPAWN AGENTS with specific roles                                   │
│     ├── Define each agent's specialty                                  │
│     ├── Define each agent's deliverable                                │
│     ├── Define collaboration rules                                     │
│     └── Establish debate protocol                                      │
│                              │                                         │
│                              ▼                                         │
│  3. INITIAL RESEARCH - Each agent researches independently            │
│                              │                                         │
│                              ▼                                         │
│  4. PROPOSE - Each agent proposes their position with evidence         │
│                              │                                         │
│                              ▼                                         │
│  5. CHALLENGE ROUND - Agents challenge each other                      │
│     ├── Must cite sources for all challenges                           │
│     ├── Must propose alternatives, not just criticize                  │
│     └── All challenges logged to memory                                │
│                              │                                         │
│                              ▼                                         │
│  6. DEBATE - Structured argumentation until consensus or escalation    │
│                              │                                         │
│                              ▼                                         │
│  7. RESOLUTION - Brain Lead synthesizes or decides                     │
│                              │                                         │
│                              ▼                                         │
│  8. LOG - Full debate transcript + decision + rationale to memory      │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Agent Roles per Brain

#### Engineering Brain Department

| Agent | Specialty | Typical Contributions |
|-------|-----------|----------------------|
| **Architecture Agent** | System design, patterns, scalability | Architecture decisions, tech stack, patterns |
| **Frontend Agent** | UI implementation, components, state | React/Vue components, state management |
| **Backend Agent** | APIs, databases, business logic | API design, data models, integrations |
| **DevOps Agent** | CI/CD, infrastructure, deployment | Pipelines, IaC, deployment strategies |
| **Security Agent** | Auth, encryption, vulnerabilities | Security reviews, threat modeling |
| **Performance Agent** | Optimization, caching, profiling | Performance audits, optimizations |

**Example Debate:**
```
TOPIC: Should we use microservices or monolith for MVP?

Architecture Agent: PROPOSE
"Microservices for future scalability."
Source: Fowler, M. (2015). "Microservices." martinfowler.com

Backend Agent: CHALLENGE
"Microservices add operational complexity we can't handle with 3 engineers."
Source: DHH (2020). "Majestic Monolith." signalvnoise.com

DevOps Agent: SUPPORT CHALLENGE
"I agree. We don't have the infrastructure for service mesh, distributed tracing."
Source: Nygard, M. (2007). "Release It!" Chapter 4.

Architecture Agent: ADAPT
"Modified proposal: Modular monolith with clear domain boundaries, extract services later."
Source: Vernon, V. (2016). "Domain-Driven Design Distilled."

RESOLUTION: Modular monolith approved. Review at 10 engineers.
LOGGED TO: memory/engineering/debates/2026-03-08-architecture.json
```

#### Design Brain Department

| Agent | Specialty | Typical Contributions |
|-------|-----------|----------------------|
| **UX Research Agent** | User interviews, usability testing | User insights, pain points |
| **UI Design Agent** | Visual design, mockups, components | Design specs, mockups |
| **Interaction Agent** | Micro-interactions, animations | Motion specs, transitions |
| **Accessibility Agent** | WCAG, screen readers, keyboard | Accessibility audits |
| **Brand Agent** | Visual identity, consistency | Brand compliance |
| **Prototyping Agent** | Interactive prototypes | Clickable prototypes |

#### QA Brain Department

| Agent | Specialty | Typical Contributions |
|-------|-----------|----------------------|
| **Test Strategy Agent** | Test planning, coverage analysis | Test plans, risk matrices |
| **Automation Agent** | Test automation, frameworks | Automated test suites |
| **Manual Testing Agent** | Exploratory, edge cases | Bug reports, edge case lists |
| **Performance Agent** | Load testing, stress testing | Performance reports |
| **Security Testing Agent** | Penetration testing, OWASP | Security findings |
| **Mobile Testing Agent** | Maestro, device testing | Mobile test results |

#### Marketing Brain Department

| Agent | Specialty | Typical Contributions |
|-------|-----------|----------------------|
| **Brand Strategy Agent** | Positioning, messaging | Brand guidelines, messaging |
| **Content Agent** | Content strategy, SEO | Content calendars, SEO audits |
| **Growth Marketing Agent** | CAC, channels, attribution | Channel recommendations |
| **Social Media Agent** | Platform strategy, engagement | Social calendars |
| **Paid Ads Agent** | Ad creative, targeting | Campaign specs |
| **Analytics Agent** | Marketing metrics, ROI | Performance dashboards |

[Additional departments defined in agent_teams.md]

### 3.3 Spawn Invocation

**Syntax for spawning a department:**

```typescript
await spawnDepartment({
  brain: 'engineering',
  task: 'Design authentication system for SaaS product',
  agents: ['Architecture', 'Backend', 'Security', 'DevOps'],
  debateProtocol: 'PROPOSE_CHALLENGE_RESOLVE',
  consensusThreshold: 0.7, // 70% agreement required
  escalationTarget: 'CEO Brain',
  outputFormat: 'COLLABORATION_LOG',
  citationRequirement: 'MANDATORY'
});
```

---

## PART IV: MANDATORY SOURCE CITATION

### 4.1 Citation Requirements

**ALL agent outputs MUST include sources.**

This is non-negotiable. Claims without sources are rejected.

**Citation Categories:**

| Category | Required Sources | Format |
|----------|-----------------|--------|
| **Technical Claims** | Documentation, papers, benchmarks | URL + relevant quote |
| **Business Claims** | Research reports, case studies | Source + date + finding |
| **Market Claims** | Industry reports, data sources | Source + methodology + date |
| **Design Claims** | Research studies, usability data | Study + sample size + finding |
| **Legal Claims** | Laws, regulations, case law | Statute/case + jurisdiction |

### 4.2 Source Quality Tiers

| Tier | Description | Acceptable For |
|------|-------------|----------------|
| **Tier 1** | Peer-reviewed research, official documentation | All claims |
| **Tier 2** | Industry reports, established publications | Business/market claims |
| **Tier 3** | Expert blogs, conference talks | Technical insights |
| **Tier 4** | Internal data, direct observation | Company-specific claims |

**Rule:** Higher-stakes claims require higher-tier sources.

### 4.3 Citation Format

```
CLAIM: [Statement being made]
SOURCE: [Author/Organization] ([Year]). "[Title]." [Publication/URL]
RELEVANCE: [How this source supports the claim]
```

**Example:**
```
CLAIM: Microservices increase operational complexity for small teams.
SOURCE: Fowler, M. (2015). "Microservices Prerequisites." martinfowler.com/bliki/MicroservicePrerequisites.html
RELEVANCE: Fowler lists 8 prerequisites including automated deployment,
monitoring, and service discovery that teams must have before adopting microservices.
```

### 4.4 Citation Enforcement

**Pre-submission check for all agent outputs:**

```
□ Every factual claim has a source
□ Sources are appropriate tier for claim type
□ Sources are recent enough (< 5 years for fast-moving topics)
□ Sources are accessible (URLs work, documents exist)
□ Citation format is followed
```

**Rejection criteria:**
- Unsourced claims → REJECT
- Low-tier sources for high-stakes claims → REJECT
- Outdated sources for current practices → WARNING
- Broken links/unavailable sources → FIX BEFORE ACCEPT

---

## PART V: COLLABORATION LOGGING SYSTEM

### 5.1 Log Structure

Every collaboration produces a structured log.

**Log Location:** `/prototype_x1000/memory/collaborations/`

**Log Filename Pattern:** `[date]-[brains]-[topic]-[outcome].json`

### 5.2 Collaboration Log Schema

```json
{
  "collaboration_id": "uuid",
  "timestamp_start": "ISO-8601",
  "timestamp_end": "ISO-8601",
  "duration_minutes": 45,

  "participants": {
    "lead_brain": "Engineering Brain",
    "participating_brains": ["Design Brain", "QA Brain"],
    "spawned_agents": [
      {"brain": "Engineering", "agent": "Architecture Agent"},
      {"brain": "Engineering", "agent": "Backend Agent"},
      {"brain": "Design", "agent": "UX Research Agent"}
    ]
  },

  "context": {
    "topic": "Authentication system design for SaaS",
    "trigger": "New project kickoff",
    "business_context": "Series A SaaS, targeting enterprise",
    "constraints": ["6-week timeline", "3 engineers available"],
    "success_criteria": ["Secure", "Scalable to 100k users", "SSO support"]
  },

  "debate_transcript": [
    {
      "turn": 1,
      "speaker": "Architecture Agent",
      "type": "PROPOSE",
      "content": "Implement OAuth2 with JWT tokens for stateless auth",
      "sources": [
        {
          "citation": "RFC 6749 - OAuth 2.0 Authorization Framework",
          "url": "https://tools.ietf.org/html/rfc6749",
          "relevance": "Industry standard for authorization"
        }
      ],
      "timestamp": "ISO-8601"
    },
    {
      "turn": 2,
      "speaker": "Security Agent",
      "type": "CHALLENGE",
      "content": "JWTs are hard to revoke. Consider session-based for initial MVP.",
      "sources": [
        {
          "citation": "Stop using JWT for sessions",
          "url": "http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/",
          "relevance": "Details JWT revocation challenges"
        }
      ],
      "timestamp": "ISO-8601"
    },
    {
      "turn": 3,
      "speaker": "Backend Agent",
      "type": "SUPPORT",
      "content": "Session-based is simpler for MVP. We can add JWT for API access later.",
      "sources": [
        {
          "citation": "Internal: Previous project learnings",
          "url": "/memory/patterns/auth-patterns.json",
          "relevance": "Our last JWT implementation took 3 weeks vs 1 week for sessions"
        }
      ],
      "timestamp": "ISO-8601"
    },
    {
      "turn": 4,
      "speaker": "UX Research Agent",
      "type": "ADD_CONTEXT",
      "content": "Enterprise users expect SSO. Whatever we choose must support SAML/OIDC integration.",
      "sources": [
        {
          "citation": "Enterprise SaaS Authentication Survey 2025",
          "url": "https://example.com/enterprise-auth-survey",
          "relevance": "92% of enterprise buyers require SSO"
        }
      ],
      "timestamp": "ISO-8601"
    },
    {
      "turn": 5,
      "speaker": "Architecture Agent",
      "type": "ADAPT",
      "content": "Modified proposal: Session-based for MVP with abstraction layer for SSO. Add JWT for API in v2.",
      "sources": [],
      "timestamp": "ISO-8601"
    }
  ],

  "challenges_raised": [
    {
      "challenger": "Security Agent",
      "target": "Architecture Agent",
      "challenge": "JWT revocation complexity",
      "outcome": "ACCEPTED - Led to design change"
    }
  ],

  "consensus": {
    "achieved": true,
    "percentage": 100,
    "dissent": null
  },

  "decision": {
    "summary": "Session-based auth for MVP with SSO abstraction layer",
    "rationale": "Balances speed-to-market with enterprise requirements",
    "tradeoffs_accepted": [
      "Slightly higher server load vs stateless JWT",
      "Will need to add JWT later for mobile/API"
    ],
    "owner": "Engineering Brain",
    "deadline": "2026-03-22"
  },

  "action_items": [
    {
      "item": "Design session schema",
      "owner": "Backend Agent",
      "deadline": "2026-03-10"
    },
    {
      "item": "Create SSO abstraction interface",
      "owner": "Architecture Agent",
      "deadline": "2026-03-12"
    }
  ],

  "learnings": [
    {
      "type": "PATTERN",
      "content": "Start simple with sessions, add JWT when API access needed",
      "applicable_to": ["SaaS", "Enterprise", "MVP"]
    }
  ],

  "metrics": {
    "total_proposals": 2,
    "total_challenges": 1,
    "challenges_accepted": 1,
    "sources_cited": 4,
    "turns_to_consensus": 5
  }
}
```

### 5.3 Collaboration Summary Format

After every collaboration, generate a human-readable summary:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COLLABORATION SUMMARY                             │
├─────────────────────────────────────────────────────────────────────┤
│  DATE: 2026-03-08                                                   │
│  TOPIC: Authentication System Design                                │
│  DURATION: 45 minutes                                               │
│  PARTICIPANTS: Engineering Brain, Design Brain, QA Brain            │
│  AGENTS: Architecture, Backend, Security, UX Research               │
├─────────────────────────────────────────────────────────────────────┤
│  DEBATE HIGHLIGHTS:                                                  │
│  • Architecture proposed JWT-based auth                             │
│  • Security challenged JWT revocation complexity (ACCEPTED)         │
│  • UX Research added SSO requirement for enterprise                 │
│  • Architecture adapted to session-based with SSO abstraction       │
├─────────────────────────────────────────────────────────────────────┤
│  DECISION: Session-based auth for MVP with SSO abstraction layer    │
│  RATIONALE: Balances speed and enterprise requirements              │
│  CONSENSUS: 100% agreement                                          │
├─────────────────────────────────────────────────────────────────────┤
│  KEY SOURCES CITED:                                                  │
│  • RFC 6749 - OAuth 2.0 Authorization Framework                     │
│  • "Stop using JWT for sessions" (2016) - JWT limitations           │
│  • Enterprise SaaS Authentication Survey 2025                       │
├─────────────────────────────────────────────────────────────────────┤
│  ACTION ITEMS:                                                       │
│  • Backend Agent: Design session schema (by 2026-03-10)             │
│  • Architecture Agent: Create SSO abstraction (by 2026-03-12)       │
├─────────────────────────────────────────────────────────────────────┤
│  LEARNINGS CAPTURED:                                                 │
│  • PATTERN: Start simple with sessions, add JWT when API needed     │
├─────────────────────────────────────────────────────────────────────┤
│  LOG: /memory/collaborations/2026-03-08-eng-design-qa-auth.json     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.4 Log Querying

Before any new collaboration, query past logs:

```
QUERY: "authentication" AND participants:"Engineering Brain"
RESULT: 3 past collaborations found
- 2025-11-15: Session management patterns (DECISION: Redis for sessions)
- 2025-09-22: OAuth integration (DECISION: Use Auth0 for MVP)
- 2025-07-03: Password policy (DECISION: NIST 800-63B guidelines)

APPLYING LEARNINGS:
- Redis session pattern confirmed working
- Auth0 integration patterns available
- Password policies already defined
```

---

## PART VI: DEBATE & CHALLENGE PROTOCOL

### 6.1 Debate Modes

| Mode | When to Use | Structure | Duration |
|------|-------------|-----------|----------|
| **QUICK** | Low-stakes, reversible | 3 turns max | 5-10 min |
| **STANDARD** | Medium-stakes, most common | 5-10 turns | 15-30 min |
| **DEEP** | High-stakes, irreversible | Unlimited turns | 45-90 min |
| **ADVERSARIAL** | Need to stress-test | Red team/Blue team | 60+ min |

### 6.2 Challenge Types

| Type | Purpose | Example |
|------|---------|---------|
| **FEASIBILITY** | Can we actually do this? | "Do we have the skills?" |
| **EVIDENCE** | Where's the proof? | "What data supports this?" |
| **ALTERNATIVE** | Is there a better way? | "Have we considered X?" |
| **RISK** | What could go wrong? | "What's the failure mode?" |
| **PRECEDENT** | Has this worked before? | "Where has this succeeded?" |
| **COST** | Is it worth it? | "What's the opportunity cost?" |

### 6.3 Challenge Response Types

| Response | When Appropriate | Example |
|----------|-----------------|---------|
| **ACCEPT** | Challenge is valid, change approach | "You're right, modifying proposal" |
| **DEFEND** | Challenge is invalid, provide evidence | "Actually, data shows..." |
| **PARTIALLY_ACCEPT** | Challenge is partially valid | "Valid point, but doesn't apply because..." |
| **DEFER** | Need more information | "Good question, let me research..." |
| **ESCALATE** | Beyond scope to resolve | "This needs CEO Brain decision" |

### 6.4 Consensus Protocol

```
┌────────────────────────────────────────────────────────────────────┐
│                     CONSENSUS DETERMINATION                         │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  THRESHOLD: 70% agreement required for consensus                   │
│                                                                    │
│  CALCULATION:                                                      │
│  • Count participating agents                                      │
│  • Count agents supporting final proposal                          │
│  • Consensus = (Supporting / Total) >= 0.70                        │
│                                                                    │
│  IF CONSENSUS:                                                     │
│  └── Log decision and proceed                                      │
│                                                                    │
│  IF NO CONSENSUS:                                                  │
│  └── Escalate to Brain Lead for decision                          │
│      └── Brain Lead decides with documented rationale              │
│          └── Dissent is logged (not ignored)                       │
│                                                                    │
│  IF BRAIN LEAD CANNOT RESOLVE:                                     │
│  └── Escalate to CEO Brain                                         │
│      └── CEO applies Decision Framework                            │
│          └── Final decision is binding                             │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 6.5 Debate Quality Metrics

Track these metrics to improve debate quality over time:

| Metric | Target | Description |
|--------|--------|-------------|
| **Challenge Rate** | >50% | % of proposals that receive challenges |
| **Citation Rate** | 100% | % of claims with sources |
| **Consensus Rate** | >80% | % of debates reaching consensus |
| **Turn Efficiency** | <10 | Average turns to resolution |
| **Escalation Rate** | <10% | % requiring CEO intervention |
| **Learning Capture** | 100% | % of debates producing learnings |

---

## PART VII: CROSS-CLUSTER COORDINATION

### 7.1 Multi-Cluster Projects

When a project requires multiple clusters:

```
PROJECT: Launch new product line

STRATEGY CLUSTER (Lead: CEO Brain)
├── MBA Brain: Business model, competitive positioning
├── Finance Brain: Financial projections, pricing
└── Research Brain: Market research, competitor analysis

EXECUTION CLUSTER (Lead: Product Brain)
├── Product Brain: Requirements, roadmap
├── Design Brain: UI/UX, branding
├── Engineering Brain: Implementation
└── QA Brain: Testing strategy

GROWTH CLUSTER (Lead: Marketing Brain)
├── Marketing Brain: Go-to-market strategy
├── Sales Brain: Sales playbook
└── Customer Success Brain: Onboarding plan

COORDINATION:
1. CEO Brain facilitates cross-cluster sync weekly
2. Each cluster lead attends sync
3. Dependencies tracked in shared project log
4. Conflicts escalate to CEO Brain
```

### 7.2 Handoff Contracts

When work passes between clusters:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      HANDOFF CONTRACT                                │
├─────────────────────────────────────────────────────────────────────┤
│  FROM: Strategy Cluster (MBA Brain)                                 │
│  TO: Execution Cluster (Product Brain)                              │
│  DATE: 2026-03-08                                                   │
├─────────────────────────────────────────────────────────────────────┤
│  DELIVERABLE: Market requirements document                          │
│                                                                      │
│  CONTENTS:                                                           │
│  ✓ Target market definition                                         │
│  ✓ Competitive landscape                                            │
│  ✓ Value proposition                                                │
│  ✓ Pricing guidance                                                 │
│  ✓ Success metrics                                                  │
│                                                                      │
│  ASSUMPTIONS:                                                        │
│  • Market size estimates based on 2025 industry reports             │
│  • Competitor data current as of 2026-03-01                         │
│                                                                      │
│  LIMITATIONS:                                                        │
│  • No direct customer validation yet                                │
│  • Pricing is guidance, not final                                   │
│                                                                      │
│  ACCEPTANCE CRITERIA:                                                │
│  □ Product Brain acknowledges receipt                               │
│  □ Product Brain confirms no blocking questions                     │
│  □ Product Brain provides ETA for next handoff                      │
│                                                                      │
│  ESCALATION:                                                         │
│  If requirements unclear → Schedule sync within 24 hours            │
│                                                                      │
│  LOGGED TO: /memory/handoffs/2026-03-08-strategy-to-execution.json  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## PART VIII: INTEGRATION WITH MEMORY SYSTEM

### 8.1 Memory Locations

| Data Type | Location | Retention |
|-----------|----------|-----------|
| Collaboration Logs | `/memory/collaborations/` | Permanent |
| Debate Transcripts | `/memory/debates/` | Permanent |
| Handoff Contracts | `/memory/handoffs/` | Permanent |
| Learnings | `/memory/learnings/` | Permanent |
| Patterns | `/memory/patterns/` | Permanent |
| Decisions | `/memory/decisions/` | Permanent |

### 8.2 Pre-Collaboration Memory Query

**MANDATORY before any collaboration:**

```
QUERY SEQUENCE:
1. Search for similar past collaborations
2. Surface relevant patterns
3. Surface relevant learnings
4. Surface relevant failures (anti-patterns)
5. Present to participants before debate begins

EXAMPLE:
> Starting collaboration on "Payment Integration"
> MEMORY QUERY: "payment" + "integration"
> FOUND:
> - 2025-08-12: Stripe integration debate (PATTERN: Start with test mode)
> - 2025-06-03: Payment security review (LEARNING: PCI compliance takes 3 weeks)
> - 2024-11-20: Failed PayPal integration (ANTI-PATTERN: Don't custom-build webhooks)
>
> APPLYING TO CURRENT COLLABORATION:
> - Start with test mode before live
> - Budget 3 weeks for PCI compliance
> - Use standard webhook libraries, don't custom-build
```

### 8.3 Post-Collaboration Memory Write

**MANDATORY after any collaboration:**

```
WRITE SEQUENCE:
1. Write collaboration log
2. Extract and write patterns
3. Extract and write learnings
4. Update relevant brain knowledge
5. Cross-reference with project memory

OUTPUT:
✓ Collaboration log written: /memory/collaborations/2026-03-08-auth.json
✓ Pattern extracted: /memory/patterns/auth-session-first.json
✓ Learning logged: /memory/learnings/2026-03-08-sso-enterprise.json
✓ Engineering Brain updated with auth decision
✓ Project X2000 memory cross-referenced
```

---

## PART IX: ENFORCEMENT & COMPLIANCE

### 9.1 Compliance Checklist

Every collaboration MUST satisfy:

```
□ All participants cited sources for claims
□ Challenges were raised and addressed
□ Consensus threshold was met or escalation occurred
□ Decision was documented with rationale
□ Action items have owners and deadlines
□ Learnings were extracted
□ Full log was written to memory
□ Summary was generated
```

### 9.2 Quality Audit

Monthly audit of collaboration quality:

```
AUDIT METRICS:
• % of collaborations with full source citations
• % of challenges that received responses
• Average turns to consensus
• % of action items completed on deadline
• % of learnings applied to subsequent collaborations
• Escalation rate trend

QUALITY THRESHOLD:
• Citation compliance: >95%
• Challenge response: 100%
• Consensus efficiency: <8 turns average
• Action item completion: >90%
• Learning application: >70%
• Escalation rate: <10%
```

### 9.3 Continuous Improvement

After each month, identify:

1. **Top 3 collaboration patterns that worked well** → Reinforce
2. **Top 3 collaboration friction points** → Improve process
3. **Most valuable learnings captured** → Highlight and share
4. **Most common escalation triggers** → Address root cause

---

## APPENDIX: QUICK REFERENCE

### Brain Cluster Quick Reference

| Cluster | Brains | Lead | Primary Function |
|---------|--------|------|------------------|
| **Strategy** | CEO, MBA, Finance, Research, Investor | CEO | Business strategy |
| **Execution** | Engineering, Design, Product, QA | Product/Engineering | Build & ship |
| **Growth** | Marketing, Sales, Growth, Partnership, CS | Marketing/CS | Acquire & retain |
| **Technical** | Data, Security, Cloud, Mobile, AI, Automation, Analytics, DevRel | Data/Security | Infrastructure |
| **Channel** | Branding, Content, Email, Social, Video, Community | Content/Branding | Content & distribution |
| **Support** | Operations, Legal, HR, Support | Operations/Legal | Operations & compliance |

### Debate Mode Quick Reference

| Stakes | Reversibility | Mode | Duration |
|--------|--------------|------|----------|
| Low | High | QUICK | 5-10 min |
| Medium | Medium | STANDARD | 15-30 min |
| High | Low | DEEP | 45-90 min |
| Critical | None | ADVERSARIAL | 60+ min |

### Citation Tier Quick Reference

| Tier | Source Type | Use For |
|------|-------------|---------|
| 1 | Peer-reviewed, official docs | All claims |
| 2 | Industry reports, publications | Business claims |
| 3 | Expert blogs, conference talks | Technical insights |
| 4 | Internal data, observation | Company-specific |

---

**This wiring map is authoritative for all inter-brain communication.**
**Violations are logged and escalated.**

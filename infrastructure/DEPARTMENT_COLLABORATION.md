# Cross-Department Collaboration Protocol

**How Department Heads work together to solve complex problems.**

---

## Core Principle

> No department operates in isolation. Real work crosses boundaries.
> Department Heads must collaborate openly, challenge constructively, and synthesize collectively.

---

## Collaboration Types

### Type 1: Sequential Handoff
Work flows from one department to another.

```
Product → Design → Engineering → QA → Marketing
   │         │          │         │        │
   ▼         ▼          ▼         ▼        ▼
 Reqs    Designs     Code     Tests   Launch
```

**Protocol:**
1. Sending department prepares handoff package
2. Receiving department acknowledges receipt
3. Receiving department reviews for completeness
4. If incomplete → request clarification
5. If complete → proceed with work
6. Log handoff to memory

### Type 2: Parallel Collaboration
Multiple departments work simultaneously on different aspects.

```
        ┌── Engineering (build)
        │
Task ───┼── Design (polish)
        │
        └── QA (test)
```

**Protocol:**
1. CEO Brain or Lead Department defines parallel tracks
2. Each department works independently
3. Sync points defined in advance
4. Conflicts resolved at sync points
5. Final integration by lead department

### Type 3: Consultative
One department needs expertise from another.

```
Engineering ──(security question)──► Security
            ◄──(security answer)───
```

**Protocol:**
1. Requesting department sends formal request
2. Consulting department provides expertise
3. Requesting department incorporates advice
4. Attribution in final output

### Type 4: Joint Ownership
Complex tasks require shared ownership.

```
┌─────────────────────────────────────┐
│  Product + Engineering + Design    │
│      (joint ownership)             │
│                                    │
│  Shared: Decision-making           │
│  Shared: Success/failure           │
│  Shared: Credit                    │
└─────────────────────────────────────┘
```

**Protocol:**
1. Define shared objectives
2. Establish decision rights (who decides what)
3. Regular syncs (not async handoffs)
4. Consensus or escalation
5. Joint reporting to CEO Brain

---

## Collaboration Request Format

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COLLABORATION REQUEST                             │
├─────────────────────────────────────────────────────────────────────┤
│  FROM: [Department Head + Title]                                     │
│  TO: [Department Head(s) + Title]                                    │
│  CC: [Other stakeholders]                                            │
│  DATE: [YYYY-MM-DD]                                                  │
│  TYPE: [HANDOFF | CONSULT | PARALLEL | JOINT]                        │
│  PRIORITY: [P0-CRITICAL | P1-HIGH | P2-MEDIUM | P3-LOW]              │
├─────────────────────────────────────────────────────────────────────┤
│  SUBJECT: [Brief description]                                        │
│                                                                      │
│  CONTEXT:                                                            │
│  [Why this collaboration is needed]                                  │
│  [Business/project context]                                          │
│                                                                      │
│  REQUEST:                                                            │
│  [Specific ask - what you need from them]                            │
│  [Expected deliverables]                                             │
│                                                                      │
│  TIMELINE:                                                           │
│  [When you need it]                                                  │
│  [Milestones if applicable]                                          │
│                                                                      │
│  DEPENDENCIES:                                                       │
│  [What you're providing]                                             │
│  [What you're blocked on]                                            │
│                                                                      │
│  ATTACHMENTS:                                                        │
│  [Documents, specs, data]                                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Collaboration Response Format

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COLLABORATION RESPONSE                            │
├─────────────────────────────────────────────────────────────────────┤
│  FROM: [Responding Department Head]                                  │
│  TO: [Requesting Department Head]                                    │
│  DATE: [YYYY-MM-DD]                                                  │
│  TYPE: [ACCEPT | ACCEPT_WITH_CONDITIONS | NEGOTIATE | ESCALATE]      │
├─────────────────────────────────────────────────────────────────────┤
│  RESPONSE:                                                           │
│  [Acceptance, conditions, or counter-proposal]                       │
│                                                                      │
│  DELIVERABLE:                                                        │
│  [What we will provide]                                              │
│  [Format and quality]                                                │
│                                                                      │
│  TIMELINE:                                                           │
│  [When we will deliver]                                              │
│  [Any delays or constraints]                                         │
│                                                                      │
│  NEEDS FROM YOU:                                                     │
│  [What we need to proceed]                                           │
│  [Blockers you can resolve]                                          │
│                                                                      │
│  ASSIGNED TO:                                                        │
│  [Department Head personally or spawned specialist]                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Common Collaboration Scenarios

### Scenario 1: Feature Development

**Participants:** Product, Design, Engineering, QA

```
DAY 1: Product defines requirements
        │
        ▼
      Product ──(HANDOFF)──► Design
                             │
DAY 3:                       ▼
                           Design creates wireframes
                             │
                             ▼
      Product ◄──(CONSULT)── Design (validate)
        │
        ▼
      Product ──(PARALLEL)─┬─► Engineering (feasibility)
                           └─► Design (high-fidelity)
                               │
DAY 7:                         ▼
                           Sync point
                             │
                             ▼
      Engineering ◄─(HANDOFF)─ Design (final specs)
        │
DAY 14: ▼
      Engineering builds feature
        │
        ▼
      Engineering ──(HANDOFF)──► QA
```

### Scenario 2: Security Incident

**Participants:** Security, Engineering, Legal, Support, Marketing

```
HOUR 0: Security detects incident
          │
          ▼
        Security ──(PARALLEL)─┬─► Engineering (contain)
                              ├─► Legal (assess liability)
                              └─► Support (prepare response)
          │
HOUR 2:   ▼
        Sync point (CEO Brain coordinates)
          │
          ▼
        Security ──(CONSULT)──► Legal (disclosure req)
          │
HOUR 4:   ▼
        Marketing ◄─(HANDOFF)─ Security (comms draft)
          │
          ▼
        Marketing ──► Customer communication
```

### Scenario 3: New Market Entry

**Participants:** Research, Legal, Marketing, Sales, Operations

```
WEEK 1-2: Research ──(HANDOFF)──► CEO Brain (market analysis)
            │
            ▼
          CEO Brain decomposes:
            │
          ──(PARALLEL)─┬─► Legal (compliance requirements)
                       ├─► Marketing (positioning)
                       └─► Operations (logistics)
            │
WEEK 3:     ▼
          Sync point
            │
            ▼
          Marketing ──(HANDOFF)──► Sales (playbook)
            │
WEEK 4:     ▼
          Launch coordination (JOINT ownership)
```

### Scenario 4: Fundraising

**Participants:** Finance, Investor Relations, Legal, CEO

```
WEEK 1: Finance ──(JOINT)── Investor Relations
         │                   │
         ▼                   ▼
       Financial model    Pitch deck
              │
              ▼
        Sync and align
              │
              ▼
        Legal ◄─(CONSULT)─ Finance (term sheet review)
              │
              ▼
        CEO Brain ◄─(HANDOFF)─ All (investor package)
```

---

## Challenge Protocol (Between Departments)

Department Heads can (and should) challenge each other.

### When to Challenge
- Disagreement on approach
- Concern about impact on your domain
- Conflicting priorities
- Resource contention
- Risk identification

### Challenge Format

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CROSS-DEPARTMENT CHALLENGE                        │
├─────────────────────────────────────────────────────────────────────┤
│  FROM: [Challenging Department]                                      │
│  TO: [Challenged Department]                                         │
│  CC: CEO Brain (for visibility)                                      │
├─────────────────────────────────────────────────────────────────────┤
│  CHALLENGING: [Specific decision/proposal/action]                    │
│                                                                      │
│  CONCERN:                                                            │
│  [Why this is problematic]                                           │
│  [Impact on my domain]                                               │
│                                                                      │
│  EVIDENCE:                                                           │
│  [Data, precedent, research supporting concern]                      │
│  [Sources with citations]                                            │
│                                                                      │
│  ALTERNATIVE:                                                        │
│  [What we propose instead]                                           │
│  [Why it's better]                                                   │
│                                                                      │
│  RESOLUTION REQUESTED:                                               │
│  [What outcome we're seeking]                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Challenge Response Types

| Response | When to Use |
|----------|-------------|
| **ACCEPT** | Challenge is valid, changing approach |
| **DEFEND** | Challenge is invalid, providing counter-evidence |
| **PARTIALLY_ACCEPT** | Valid concern, partial change |
| **NEGOTIATE** | Neither fully right, find middle ground |
| **ESCALATE** | Cannot resolve, need CEO Brain |

### Escalation Protocol

If departments cannot resolve:

1. Both departments document positions
2. Escalate to CEO Brain
3. CEO Brain reviews with Decision Framework
4. CEO Brain makes ruling
5. Ruling is final and binding
6. Full discussion logged to memory

---

## Sync Meeting Patterns

### Daily Standup (Within Department)
- Department Head + Active Specialists
- 15 minutes
- Blockers and priorities

### Weekly Department Sync (Cross-Department)
- Department Heads in same cluster
- 30 minutes
- Coordination and handoffs

### Bi-Weekly All-Hands (All Departments)
- All Department Heads + CEO Brain
- 60 minutes
- Strategic alignment

### Ad-Hoc Collaboration Sync
- Relevant Department Heads only
- As needed
- Specific topic resolution

---

## Communication Channels

### Sync (Real-time)
- Joint discussions
- Decision-making
- Conflict resolution
- Complex coordination

### Async (Documented)
- Handoffs
- Status updates
- Non-urgent requests
- Information sharing

### Escalation (Formal)
- Unresolved conflicts
- Resource contention
- Strategic decisions
- Cross-cutting concerns

---

## Anti-Patterns (What NOT to Do)

### Silo Syndrome
```
BAD: "That's not my department's problem"
GOOD: "Let me connect you with the right department and stay involved"
```

### Over-the-Wall Handoff
```
BAD: Throw work over to next department and forget about it
GOOD: Stay available for questions during transition
```

### Passive-Aggressive Blocking
```
BAD: "Sure, we'll get to it... eventually"
GOOD: "We can't prioritize this until X. Here's why and what would change that."
```

### Hero Complex
```
BAD: "My department will just do everything ourselves"
GOOD: "We need expertise from [department] to do this right"
```

### Escalation Avoidance
```
BAD: Let conflicts fester to avoid CEO involvement
GOOD: Escalate early when alignment isn't happening
```

---

## Metrics for Healthy Collaboration

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Handoff completion | >90% | 70-90% | <70% |
| Challenge response | <24h | 24-48h | >48h |
| Escalation rate | <10% | 10-20% | >20% |
| Cross-dept satisfaction | >4.0 | 3.0-4.0 | <3.0 |
| Collaboration NPS | >50 | 0-50 | <0 |

---

## Logging Requirements

All collaboration MUST be logged to:

```
/memory/collaborations/
├── [date]-[dept1]-[dept2]-[topic].json    # Full log
├── summaries/
│   └── [date]-summary.md                  # Human-readable
├── challenges/
│   └── [date]-[challenger]-[topic].json   # Challenges
└── escalations/
    └── [date]-[topic].json                # Escalations
```

### Required Fields in Log

```json
{
  "collaboration_id": "uuid",
  "timestamp": "ISO-8601",
  "participants": ["dept1", "dept2"],
  "type": "HANDOFF|CONSULT|PARALLEL|JOINT",
  "topic": "description",
  "outcome": "COMPLETED|PARTIAL|ESCALATED",
  "decisions": [],
  "action_items": [],
  "learnings": [],
  "next_steps": []
}
```

---

**Collaboration is not optional. It's how work actually gets done.**

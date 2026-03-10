# Agent Collaboration Protocol

How agents work together, challenge each other, and reach the best outcomes.

**Related:** See `/infrastructure/BRAIN_WIRING_MAP.md` for complete inter-brain communication architecture.

---

## MANDATORY: Source Citation Requirement

**ALL claims, proposals, and challenges MUST include sources.**

This is non-negotiable. Unsourced claims are REJECTED.

### Citation Format

```
CLAIM: [Statement being made]
SOURCE: [Author/Organization] ([Year]). "[Title]." [Publication/URL]
RELEVANCE: [How this source supports the claim]
```

### Source Tiers

| Tier | Source Type | Acceptable For |
|------|-------------|----------------|
| **Tier 1** | Peer-reviewed research, official documentation | All claims |
| **Tier 2** | Industry reports, established publications | Business/market claims |
| **Tier 3** | Expert blogs, conference talks | Technical insights |
| **Tier 4** | Internal data, direct observation | Company-specific claims |

**Rule:** Higher-stakes claims require higher-tier sources.

---

## Core Principles

### 1. No Unchallenged Ideas
Every proposal must be questioned:
- "What could go wrong?"
- "What are we missing?"
- "Is there a better way?"
- "What does the data say?"

### 2. Evidence Over Opinion (WITH CITATIONS)
Claims require support AND sources:
- Data from research (CITE SOURCE)
- Examples from past projects (CITE MEMORY LOG)
- Industry benchmarks (CITE REPORT)
- User feedback (CITE RESEARCH)

### 3. Constructive Conflict
Disagreement is healthy:
- Attack ideas, not agents
- Propose alternatives
- Seek to understand first
- Document dissent

### 4. Consensus or Escalate
Resolution paths:
- Ideal: Team reaches agreement
- Acceptable: Majority with documented dissent
- Escalate: Brain Lead decides with rationale

### 5. Learn and Log
Every interaction is valuable:
- Log all discussions
- Record what worked
- Record what failed
- Build institutional memory

---

## Collaboration Patterns

### Pattern 1: Proposal-Challenge-Resolution

```
Agent A: PROPOSE
"I suggest we do X because [reason]"

Agent B: CHALLENGE
"What about Y? X might fail because [concern]"

Agent A or C: DEFEND or ADAPT
"Good point. Modified proposal: X with safeguard Z"
OR
"You're right. Changing to approach Y"

Team: RESOLVE
"Agreed on [final approach]"
LOG to memory
```

### Pattern 2: Round-Robin Review

```
Agent A: Present work
Agent B: First review - "I see issue X"
Agent C: Second review - "Also consider Y"
Agent D: Third review - "Strength: Z is well done"
Agent A: Incorporate feedback
Team: Approve or iterate
LOG to memory
```

### Pattern 3: Devil's Advocate

```
Assign one agent to argue AGAINST the proposal:
"For the sake of argument, here's why this fails..."

Forces team to:
- Consider failure modes
- Strengthen weak points
- Prepare for objections
- Build more robust solutions
```

### Pattern 4: Red Team / Blue Team

```
Blue Team: Proposes solution
Red Team: Tries to break it / find flaws
Blue Team: Defends and adapts
Iteration until Red Team can't find issues
```

---

## Discussion Structure

### Opening
```
TOPIC: [What are we deciding/discussing]
CONTEXT: [Background information]
CONSTRAINTS: [Time, resources, requirements]
GOAL: [What outcome do we need]
```

### Discussion
```
AGENT: [Name]
POSITION: [Their view]
EVIDENCE: [Supporting data]
CONCERNS: [Potential issues they see]
```

### Challenge Phase
```
CHALLENGER: [Agent name]
CHALLENGE: [The question or concern]
TARGET: [Who is being challenged]
RESPONSE: [How they address it]
RESOLUTION: [Outcome]
```

### Closing
```
DECISION: [What was decided]
RATIONALE: [Why this decision]
DISSENT: [Any disagreements]
ACTIONS: [Next steps]
OWNER: [Who is responsible]
LOGGED: [Where this is stored]
```

---

## Question Templates for Agents

### Feasibility Questions
- "How long will this take?"
- "What resources do we need?"
- "Do we have the skills for this?"
- "What are the dependencies?"

### Risk Questions
- "What's the worst case scenario?"
- "How likely is failure?"
- "What's our fallback?"
- "Have we tried this before?"

### Value Questions
- "Who benefits from this?"
- "How do we measure success?"
- "Is this the highest priority?"
- "What's the opportunity cost?"

### Evidence Questions
- "What data supports this?"
- "Are there examples of this working?"
- "What did user research show?"
- "What do competitors do?"

### Alternative Questions
- "Is there a simpler way?"
- "What if we did the opposite?"
- "Can we combine approaches?"
- "What would [expert] recommend?"

---

## Conflict Resolution

### Level 1: Peer Resolution
Agents try to resolve directly:
- Share perspectives
- Find common ground
- Compromise if possible

### Level 2: Team Vote
If peers can't resolve:
- Each agent states position
- Team votes
- Majority wins
- Dissent documented

### Level 3: Brain Lead Decision
If vote is tied or stakes are high:
- Brain Lead reviews positions
- Makes final call
- Documents rationale
- Dissent still logged

### Level 4: CEO Brain Escalation
If cross-department or strategic:
- CEO Brain reviews
- Applies Decision Quality Framework
- Makes final ruling
- Full documentation to memory

---

## Anti-Patterns (What NOT to Do)

### Groupthink
```
BAD: "Everyone agrees, so it must be right"
GOOD: Actively seek dissenting views
```

### HiPPO (Highest Paid Person's Opinion)
```
BAD: "The lead said X, so we do X"
GOOD: Challenge leaders with evidence too
```

### Bikeshedding
```
BAD: Spending hours on trivial decisions
GOOD: Time-box discussions, decide and move on
```

### Analysis Paralysis
```
BAD: "We need more data before deciding"
GOOD: Decide with 70% confidence, iterate
```

### Echo Chamber
```
BAD: Only hearing from agents who agree
GOOD: Assign devil's advocate role
```

---

## Communication Formats

### Quick Update
```
AGENT: [Name]
STATUS: [On track / Blocked / Complete]
HEADLINE: [One sentence summary]
```

### Detailed Report
```
AGENT: [Name]
TOPIC: [What this covers]
FINDINGS: [Key discoveries]
EVIDENCE: [Supporting data]
RECOMMENDATIONS: [What to do]
NEXT STEPS: [Actions needed]
```

### Challenge
```
CHALLENGER: [Name]
TO: [Target agent]
RE: [Specific claim or proposal]
CONCERN: [What's the issue]
QUESTION: [What needs answering]
SUGGESTED: [Alternative if any]
```

### Decision Record
```
DECISION: [What was decided]
DATE: [When]
PARTICIPANTS: [Who was involved]
OPTIONS: [What was considered]
CHOSEN: [What was selected]
RATIONALE: [Why]
RISKS: [Known risks accepted]
REVIEW: [When to revisit]
```

---

## Integration with Memory System

All collaboration outputs automatically log to:

```
memory/
├── discussions/
│   ├── [department]/
│   │   └── [date]-[topic].json
├── decisions/
│   └── [date]-[decision].json
├── challenges/
│   └── [date]-[challenge].json
├── dissent/
│   └── [date]-[disagreement].json
└── learnings/
    └── [date]-[lesson].json
```

Before any new discussion:
```
1. QUERY memory for related past discussions
2. SURFACE relevant learnings
3. APPLY what worked before
4. AVOID what failed before
5. REFERENCE past decisions for consistency
```

---

## Collaboration Summary Logging — MANDATORY

After EVERY collaboration, generate a summary log.

### Summary Log Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COLLABORATION SUMMARY                             │
├─────────────────────────────────────────────────────────────────────┤
│  DATE: [YYYY-MM-DD]                                                 │
│  TOPIC: [Brief description]                                         │
│  DURATION: [X minutes]                                              │
│  PARTICIPANTS: [Brain names]                                        │
│  AGENTS SPAWNED: [Agent names]                                      │
├─────────────────────────────────────────────────────────────────────┤
│  DEBATE HIGHLIGHTS:                                                  │
│  • [Key proposal 1]                                                  │
│  • [Challenge raised and outcome]                                    │
│  • [Key insight or adaptation]                                       │
├─────────────────────────────────────────────────────────────────────┤
│  DECISION: [Final decision made]                                     │
│  RATIONALE: [Why this decision]                                      │
│  CONSENSUS: [% agreement or escalation outcome]                      │
│  DISSENT: [Any documented disagreement]                              │
├─────────────────────────────────────────────────────────────────────┤
│  KEY SOURCES CITED:                                                  │
│  • [Source 1 with URL]                                               │
│  • [Source 2 with URL]                                               │
├─────────────────────────────────────────────────────────────────────┤
│  ACTION ITEMS:                                                       │
│  • [Owner]: [Action] (by [deadline])                                 │
├─────────────────────────────────────────────────────────────────────┤
│  LEARNINGS CAPTURED:                                                 │
│  • [Pattern or insight for future use]                               │
├─────────────────────────────────────────────────────────────────────┤
│  LOG: /memory/collaborations/[date]-[topic].json                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Full Log Location

Detailed JSON logs: `/memory/collaborations/`
Summary logs: `/memory/collaborations/summaries/`

### Log Query Syntax

```
QUERY: "[keyword]" AND participants:"[Brain Name]"
QUERY: "[keyword]" AND date:">2026-01-01"
QUERY: challenges.outcome:"ACCEPTED" AND topic:"[keyword]"
```

---

## Collaboration Quality Metrics

Track these to improve collaboration quality:

| Metric | Target | Meaning |
|--------|--------|---------|
| Citation Rate | 100% | All claims have sources |
| Challenge Rate | >50% | Proposals are questioned |
| Consensus Rate | >80% | Debates reach agreement |
| Turn Efficiency | <10 | Turns to resolution |
| Learning Capture | 100% | Debates produce learnings |
| Escalation Rate | <10% | CEO intervention needed |

---

## See Also

- `/infrastructure/BRAIN_WIRING_MAP.md` — Complete communication architecture
- `/ceo_brain/02_orchestration/agent_teams.md` — Department spawning
- `/ceo_brain/02_orchestration/brain_routing.md` — Brain routing table

# Roadmap Strategy

## What This Enables

A disciplined approach to roadmapping that communicates strategic intent without degenerating into a feature-delivery timeline that over-commits, under-delivers, and strips teams of the autonomy to discover the best solutions. The modern product roadmap is a strategic communication tool, not a project plan. When done correctly, it aligns the organization around outcomes while preserving the team's ability to iterate on solutions.

---

## The Core Insight

A roadmap is not a list of features with dates. It is a communication of strategic intent — what problems you are solving, for whom, in what sequence, and why. The moment a roadmap becomes a contractual commitment to deliver specific features by specific dates, it becomes a tool of organizational dysfunction: teams build exactly what was specified regardless of what they learn, discovery is abandoned because the output is predetermined, and stakeholders treat the roadmap as a promise rather than a plan.

As Marty Cagan states (Empowered, 2020): "The roadmap is the single most important — and most dangerous — artifact in product management."

---

## Now/Next/Later Roadmap

### The Structure

The Now/Next/Later roadmap (popularized by Janna Bastow, ProdPad) organizes work by time horizon without committing to specific dates:

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PRODUCT ROADMAP                            │
├──────────────────┬──────────────────────┬──────────────────────────┤
│       NOW        │        NEXT          │         LATER            │
│   (This quarter) │   (Next 1-2 quarters)│   (6+ months)           │
│                  │                      │                          │
│ High confidence  │ Medium confidence    │ Low confidence           │
│ Specific scope   │ Problem-defined      │ Theme-level              │
│ Teams assigned   │ Solutions emerging   │ Strategic direction      │
│ Metrics defined  │ Metrics hypothesized │ Outcomes aspirational    │
│                  │                      │                          │
│ Example:         │ Example:             │ Example:                 │
│ "Reduce onboard- │ "Improve team        │ "Platform extensibility  │
│  ing time from   │  collaboration for   │  for third-party         │
│  14 days to 3"   │  distributed teams"  │  developers"             │
│                  │                      │                          │
│ Solution: New    │ Solution: TBD -      │ Solution: TBD -          │
│ guided setup     │ exploring shared     │ exploring API, plugins,  │
│ wizard with      │ workspaces and       │ marketplace              │
│ progress tracker │ async communication  │                          │
├──────────────────┼──────────────────────┼──────────────────────────┤
│ Commitment: HIGH │ Commitment: MEDIUM   │ Commitment: LOW          │
│ Flexibility: LOW │ Flexibility: MEDIUM  │ Flexibility: HIGH        │
└──────────────────┴──────────────────────┴──────────────────────────┘
```

### Why Now/Next/Later Works

| Benefit | How It Works |
|---------|-------------|
| Manages expectations | Stakeholders see that later items are directional, not committed |
| Preserves discovery | "Next" and "Later" items are problems/outcomes, not solutions |
| Reduces date anxiety | No dates on "Next" or "Later" — reduces false precision |
| Enables learning | Teams can change solutions in "Now" based on what they learn |
| Scales communication | Same format works for board, engineering, sales, customers |

---

## Outcome-Based Roadmaps

### Definition

An outcome-based roadmap organizes work around measurable customer or business outcomes rather than features. Each roadmap item states the outcome to achieve, not the feature to build.

### Structure

| Outcome | Target Metric | Current State | Target State | Time Horizon | Owner |
|---------|--------------|---------------|--------------|-------------- |-------|
| New users reach value faster | Time to first key action | 14 days | 3 days | Now (Q1) | Growth squad |
| Teams collaborate more effectively | Collaboration session frequency | 2/week | 5/week | Next (Q2-Q3) | Collab squad |
| Platform becomes extensible | Third-party integrations | 0 | 10+ | Later (Q3-Q4) | Platform squad |

### The Outcome-Based Roadmap Advantage

```
Feature roadmap says: "Build a shared workspace feature"
    -> Team builds exactly that, even if research shows a different solution would work better
    -> Success is measured by shipping the feature

Outcome roadmap says: "Increase collaboration session frequency from 2/week to 5/week"
    -> Team discovers the best solution through research and experimentation
    -> Success is measured by the outcome, not the output
    -> Multiple solutions can be explored: shared workspaces, async comments, notifications, templates
```

### Connecting Outcomes to Strategy

Outcomes should trace directly to the product strategy:

```
PRODUCT VISION: "Every team collaborates as effectively as if they were in the same room"
    └── PRODUCT STRATEGY: "Win distributed teams by being the best async collaboration tool"
        ├── GOAL (Q1): Reduce onboarding friction for distributed teams
        │   └── OUTCOME: New distributed teams reach first collaboration in < 24 hours
        ├── GOAL (Q2): Increase async collaboration depth
        │   └── OUTCOME: Average async thread length increases from 3 to 8 messages
        └── GOAL (Q3): Become the system of record for team decisions
            └── OUTCOME: 60% of decisions reference a product artifact
```

---

## Audience-Specific Roadmaps

### The Multi-Audience Problem

Different stakeholders need different views of the same roadmap:

| Audience | What They Need | What They Do NOT Need | Format |
|----------|---------------|----------------------|--------|
| **Board/Executives** | Strategic themes, business impact, resource allocation | Feature details, technical architecture | Quarterly theme map with OKR alignment |
| **Engineering teams** | Problems to solve, constraints, success metrics | Business justification, sales context | Outcome cards with technical context |
| **Sales team** | What is coming that helps close deals, rough timing | Technical details, research findings | Customer-facing roadmap with themes and quarters |
| **Customers** | Strategic direction, upcoming capabilities | Internal prioritization rationale, abandoned ideas | Public roadmap with Now/Next/Later themes |
| **Customer Success** | Feature changes affecting existing users, migration plans | Discovery process, experimental features | Release calendar with impact assessment |

### Building Audience-Specific Views

**Single source of truth:** Maintain one canonical roadmap (outcome-based). Generate audience-specific views through filtering and reformatting — never maintain multiple independent roadmaps.

```
Canonical Roadmap (internal, full detail)
    ├── Board View (themes + metrics + resource allocation)
    ├── Engineering View (outcomes + constraints + success criteria)
    ├── Sales View (capabilities + timing + customer value)
    ├── Customer View (themes + directional timing)
    └── CS View (changes + migration + impact)
```

### The Customer-Facing Roadmap Dilemma

**Risks of sharing a roadmap externally:**
- Features get delayed or cut — customers feel betrayed
- Competitors see your plans — strategic disadvantage
- Sales over-commits based on roadmap items — trust erosion

**Risks of NOT sharing a roadmap externally:**
- Customers feel blindsided by changes
- Prospects cannot evaluate your direction vs competitors
- Enterprise customers require roadmap visibility for procurement

**Resolution:** Share a theme-level, Now/Next/Later roadmap externally. Never share specific features or dates. Frame everything as directional: "We are investing in collaboration capabilities" not "We are building a shared workspace feature in Q2."

---

## Roadmap Cadence and Governance

### Cadence

| Activity | Frequency | Participants | Output |
|----------|-----------|-------------|--------|
| Roadmap review | Monthly | Product leadership | Updated priorities, resource reallocation |
| Roadmap planning | Quarterly | Product + Engineering + Design leads | Next quarter's "Now" items committed |
| Strategy alignment | Quarterly | C-suite + Product leadership | Vision-strategy-roadmap coherence check |
| Customer roadmap update | Quarterly | Product + Sales + CS | Updated external roadmap themes |
| Roadmap retrospective | Quarterly | Product team | What did we learn? What should change? |

### Governance Rules

1. **No item enters "Now" without a defined outcome metric and success criteria**
2. **"Next" items must have validated customer evidence (not just internal requests)**
3. **"Later" items must connect to the product strategy**
4. **Removing items requires explicit communication to affected stakeholders**
5. **Adding items to "Now" mid-quarter requires removing something else**

---

## Roadmap Anti-Patterns

### Anti-Pattern 1: The Feature Factory Roadmap

```
BAD:
Q1: Build feature A, Build feature B, Build feature C
Q2: Build feature D, Build feature E, Build feature F
Q3: Build feature G, Build feature H, Build feature I

Problem: No outcomes, no strategy, no learning. Just output.
```

### Anti-Pattern 2: The Date-Driven Roadmap

```
BAD:
March 15: Ship feature A
April 1: Ship feature B
April 30: Ship feature C

Problem: Creates contractual expectations. Teams cut scope or quality to hit dates
rather than iterating to find the right solution.
```

### Anti-Pattern 3: The Stakeholder Appeasement Roadmap

```
BAD:
"We will build X for the sales team, Y for the CEO, Z for the big customer"

Problem: No strategic coherence. Roadmap is a political document, not a strategic one.
Every stakeholder gets "their" feature; no stakeholder gets a coherent product.
```

### Anti-Pattern 4: The Technology-Driven Roadmap

```
BAD:
Q1: Migrate to microservices
Q2: Implement GraphQL
Q3: Add Kubernetes orchestration

Problem: No customer outcomes. Technology investments must serve product goals.
Frame as: "Reduce deployment cycle from 2 weeks to 1 day to enable faster experimentation."
```

### Anti-Pattern 5: The Perpetual Research Roadmap

```
BAD:
Q1: Research opportunity A
Q2: Continue researching A, start researching B
Q3: Continue researching A and B

Problem: Research without shipping. Discovery must lead to delivery.
```

### Anti-Pattern 6: The Everything Roadmap

```
BAD:
Q1: 47 items spanning 12 themes

Problem: No prioritization. If everything is a priority, nothing is.
Rule of thumb: 2-3 themes per quarter, max.
```

---

## Roadmap as Strategy Communication

### The Roadmap Narrative

A roadmap should tell a story:

1. **Where are we today?** (Current state, key metrics, customer feedback)
2. **What is our biggest challenge/opportunity?** (Strategic diagnosis)
3. **What is our approach?** (Strategic response — why these themes)
4. **What are we doing now?** (Specific committed work with outcomes)
5. **What are we exploring next?** (Directional themes based on research)
6. **What is on the horizon?** (Long-term vision alignment)
7. **What are we explicitly NOT doing?** (Strategic tradeoffs)

### Roadmap Presentation Tips

| Do | Do Not |
|----|--------|
| Start with the customer problem and strategic context | Start with a list of features |
| Show the connection between roadmap items and strategy | Present items in isolation |
| Acknowledge uncertainty in later items | Present everything with false precision |
| Explain what you are NOT doing and why | Ignore the omissions |
| Include metrics and success criteria | Present features without measurable outcomes |
| Show dependencies and risks | Present an unrealistic happy path |

---

## Integration with Discovery

### The Discovery-Delivery Dual-Track

```
┌─────────────────────────────────────────────┐
│            PRODUCT DEVELOPMENT               │
│                                              │
│  ┌──────────────┐    ┌──────────────┐       │
│  │  DISCOVERY    │    │  DELIVERY    │       │
│  │  TRACK        │    │  TRACK       │       │
│  │               │    │              │       │
│  │ - Interviews  │    │ - Build      │       │
│  │ - Prototyping │--->│ - Test       │       │
│  │ - Experiments │    │ - Ship       │       │
│  │ - Analysis    │    │ - Measure    │       │
│  └──────────────┘    └──────────────┘       │
│                                              │
│  Feeds "Now" with validated solutions        │
│  Feeds "Next" with validated problems        │
│  Feeds "Later" with emerging themes          │
└─────────────────────────────────────────────┘
```

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Roadmap as contract | Sales promises features with dates to customers | Roadmap shared with dates externally | Theme-level external roadmap only |
| Roadmap by committee | Every stakeholder has items on the roadmap | No prioritization authority | PM owns roadmap; stakeholders provide input, not control |
| Zombie items | Items sit on the roadmap for quarters without progress | No governance, no kill criteria | Quarterly roadmap hygiene; remove stale items |
| Outcome washing | Items relabeled as "outcomes" but are still features | Surface adoption of outcome thinking | Verify: is this measurable? Can multiple solutions serve it? |
| Roadmap drift | Roadmap bears no resemblance to what teams are building | Planning-execution disconnect | Monthly roadmap-execution alignment check |

---

## The Operator's Framework

When building or evaluating a roadmap:

1. **Start with strategy** — roadmap items must trace to product strategy and vision
2. **Frame as outcomes** — state what will change for customers, not what you will build
3. **Use Now/Next/Later** — progressive confidence levels, not false date precision
4. **Build audience-specific views** — from one canonical source, tailored for each stakeholder
5. **Govern rigorously** — entry criteria for "Now," quarterly review, removal process
6. **Integrate with discovery** — discovery feeds the roadmap; the roadmap does not bypass discovery
7. **Communicate the narrative** — present as a strategic story, not a feature list

---

## Summary

A product roadmap is a strategic communication tool, not a feature-delivery timeline. The Now/Next/Later format manages commitment levels and preserves discovery. Outcome-based roadmaps organize work around measurable customer and business results rather than features, enabling teams to discover the best solutions. Different audiences need different views generated from a single canonical source. Six anti-patterns plague roadmaps: feature factories, date fixation, stakeholder appeasement, technology-driven plans, perpetual research, and the everything roadmap. A well-crafted roadmap tells a strategic story — where we are, where we are going, what we are doing now, what we are exploring, and critically, what we are choosing NOT to do. The roadmap's power comes not from what it includes, but from the strategic choices it makes visible.

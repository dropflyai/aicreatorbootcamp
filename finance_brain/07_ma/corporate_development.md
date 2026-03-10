# Corporate Development — Deal Sourcing, Build vs Buy, and Strategic Investment

## Overview

Corporate development (corp dev) is the strategic function responsible for
identifying, evaluating, and executing inorganic growth opportunities including
acquisitions, partnerships, joint ventures, and strategic investments. This module
covers building a corp dev function, deal sourcing methodologies, the build vs buy
vs partner decision framework, strategic investment structures, and joint venture
design. Corp dev bridges business strategy with execution through deals.

References: DePamphilis (Mergers, Acquisitions, and Other Restructuring
Activities), Galpin & Herndon (The Complete Guide to Mergers and Acquisitions),
Harvard Business Review (Corporate Development articles), Bain & Company
(M&A Integration Best Practices).

---

## Building a Corp Dev Function

### Organizational Structure

```
                    CEO
                     │
            ┌────────┴────────┐
            │                  │
         CFO                VP Corp Dev
            │                  │
    Finance Team         ┌─────┴─────┐
                         │            │
                    Dir M&A    Dir Partnerships
                         │            │
                    Analyst    BD Manager
```

### When to Build Corp Dev

| Stage | Approach | Staffing |
|-------|---------|---------|
| < $10M ARR | CEO + CFO handle ad hoc deals | No dedicated team |
| $10-50M ARR | Part-time corp dev + external advisors | VP Corp Dev (1 person) |
| $50-200M ARR | Dedicated team, proactive deal sourcing | VP + 1-2 analysts |
| $200M+ ARR | Full team, continuous pipeline | VP + 3-5 team members |

### Corp Dev Competencies

```
Required skills:
  Strategic thinking: translate business strategy into deal criteria
  Financial analysis: valuation, modeling, synergy quantification
  Negotiation: deal structuring, term negotiation
  Due diligence: coordinate cross-functional assessment
  Integration: post-merger integration planning and execution
  Relationship building: maintain target and advisor relationships
  Industry knowledge: deep understanding of competitive landscape
```

---

## Deal Sourcing

### Proactive Sourcing

```
Sources of deal flow:
  1. Strategic roadmap gaps: what capabilities do we need?
  2. Market mapping: who plays in our adjacent markets?
  3. Competitive intelligence: who are competitors acquiring?
  4. Customer requests: what do customers wish we offered?
  5. Technology scouting: what emerging tech is relevant?
  6. Advisor network: investment bankers, VCs, lawyers
  7. Conference networking: industry events, demo days
  8. Inbound: companies approaching us (lower quality, higher volume)
```

### Target Screening Framework

```
Stage 1: Universe Identification (100+ companies)
  - Industry databases (PitchBook, Crunchbase, CB Insights)
  - Patent searches for technology adjacencies
  - Conference attendee lists
  - VC portfolio company reviews

Stage 2: Initial Screen (20-30 companies)
  Criteria:
  [ ] Strategic fit: addresses identified gap
  [ ] Size: within our acquisition capability
  [ ] Growth: healthy trajectory
  [ ] Technology: complementary, not redundant
  [ ] Geography: manageable integration

Stage 3: Deep Assessment (5-10 companies)
  Criteria:
  [ ] Customer overlap / complementarity
  [ ] Retention and unit economics healthy
  [ ] Technology quality (architecture review)
  [ ] Team quality and retention risk
  [ ] Valuation expectation within range
  [ ] Cultural compatibility

Stage 4: Active Engagement (2-3 companies)
  - Management meetings
  - Preliminary valuation and term discussion
  - Board approval to proceed with LOI
```

### Target Tracking

```yaml
target:
  name: "[Company Name]"
  stage: "Deep Assessment"
  strategic_rationale: "Adds ML pipeline automation to our platform"
  category: "Technology acquisition"
  estimated_revenue: "$5M ARR"
  estimated_valuation: "$40-60M"
  growth_rate: "80% YoY"
  team_size: 35
  key_contact: "[Name, Title]"
  relationship_status: "2 meetings completed, CEO warm"
  next_step: "Technical deep dive with CTO"
  timeline: "LOI target: Q2"
  risks: ["Key founder retention", "AWS dependency"]
  champion: "[Corp Dev lead name]"
  last_updated: "2024-06-15"
```

---

## Build vs Buy vs Partner Decision Framework

### Decision Matrix

```
Score each option 1-5 on each criterion:

Criterion            Weight  Build  Buy   Partner
────────────────────────────────────────────────────
Strategic importance  0.25    [_]    [_]    [_]
Time to market        0.20    [_]    [_]    [_]
Total cost (3yr)      0.15    [_]    [_]    [_]
Execution risk        0.15    [_]    [_]    [_]
IP/competitive moat   0.10    [_]    [_]    [_]
Talent acquisition    0.10    [_]    [_]    [_]
Reversibility         0.05    [_]    [_]    [_]
────────────────────────────────────────────────────
Weighted score:               [_]    [_]    [_]
```

### Build Criteria

```
Build when:
  - Core to long-term differentiation
  - Team has domain expertise
  - Market timing allows 12-24 months
  - Total cost < acquisition premium
  - IP control is essential
  - No suitable acquisition targets

Example: Stripe building its own payment processing infrastructure
  (core competency, no suitable acquisition at the right time)
```

### Buy Criteria

```
Buy when:
  - Speed to market is critical
  - Technology is complex and mature
  - Talent is extremely scarce in the market
  - Strategic window is closing (competitor may acquire)
  - Target has proven product-market fit
  - Combined entity is worth more than separate

Example: Salesforce acquiring Slack
  (faster than building enterprise messaging, defensive move)
```

### Partner Criteria

```
Partner when:
  - Capability is not core to differentiation
  - Testing market before committing
  - Risk reduction (shared investment)
  - Regulatory requirements for local presence
  - Technology standard requires interoperability
  - Distribution access through partner's channels

Example: Stripe partnering with banks for lending
  (not core, regulatory complexity, leverages bank relationships)
```

---

## Strategic Investments (Minority Stakes)

### Investment Structures

| Structure | Ownership | Governance | Purpose |
|-----------|-----------|-----------|---------|
| Minority equity | 1-15% | Observer seat | Strategic alignment |
| Strategic round participation | 5-20% | Board seat possible | Deeper partnership |
| Corporate venture fund | < 10% each | Limited | Portfolio approach |
| Convertible note/SAFE | Future equity | None | Low commitment |

### Strategic Investment Criteria

```
Investment thesis:
  1. Strategic value: does this company enhance our ecosystem?
  2. Financial return: is the valuation reasonable for the stage?
  3. Information value: will we learn about adjacent markets?
  4. Option value: could this become an acquisition target?
  5. Relationship value: does this strengthen a partnership?

Anti-criteria (do NOT invest if):
  - Purely financial return motivation (that is VC, not corp dev)
  - Competitor to a current partner
  - No clear strategic connection
  - Valuation assumes acquisition premium already
```

### Rights to Negotiate

```
Strategic investment with acquisition option:

  Right of First Offer (ROFO):
    If target decides to sell, must offer to strategic investor first
    Strategic investor has X days to make an offer

  Right of First Refusal (ROFR):
    If target receives a third-party offer, strategic investor can match

  Information rights:
    Monthly financial updates
    Board observer seat (non-voting)
    Notification of material events

  Pro-rata rights:
    Right to maintain ownership % in future rounds
```

---

## Joint Ventures (JVs)

### When to Use JVs

```
JV appropriate when:
  - Two companies have complementary capabilities
  - Neither wants to fully acquire the other
  - Geographic expansion requires local partnership
  - Regulatory requirements mandate local ownership
  - Risk-sharing on large, uncertain projects
  - Technology development with shared IP

JV structure:
  Company A: contributes technology + brand
  Company B: contributes distribution + local market knowledge
  JV Entity: separate legal entity, shared governance
  Ownership: typically 50/50 or 51/49 (51% for consolidation)
```

### JV Governance

```
Board:       Equal representation (2+2) with independent chair
Management:  CEO appointed by majority owner (or rotates)
Decisions:   Unanimous for major decisions (budget, strategy)
             Majority for operational decisions
Deadlock:    Escalation to parent company CEOs
             If unresolved: mediation, then buy-sell (shotgun clause)
```

### JV Financial Structure

```
Capital contributions:
  Company A: $5M cash + technology license (valued at $3M)
  Company B: $5M cash + distribution agreement (valued at $3M)
  Total JV capitalization: $16M

Profit/Loss distribution:
  Pro-rata to ownership (50/50)
  With preferred return to capital contributors if applicable

Transfer pricing:
  Technology license: arm's-length royalty rate (5-10% of JV revenue)
  Distribution services: market-rate commission (15-20%)
  Must comply with transfer pricing regulations
```

---

## Deal Process Management

### Deal Stages

```
Stage 1: Identify (passive)
  Activities: market mapping, screening
  Duration: ongoing
  Exit criteria: meets initial screen criteria

Stage 2: Evaluate (active)
  Activities: management meetings, financial analysis
  Duration: 2-4 weeks
  Exit criteria: strategic fit confirmed, valuation range acceptable

Stage 3: Negotiate (committed)
  Activities: LOI/term sheet, preliminary due diligence
  Duration: 2-4 weeks
  Exit criteria: signed LOI

Stage 4: Execute (intensive)
  Activities: full due diligence, definitive agreement, regulatory
  Duration: 4-12 weeks
  Exit criteria: signed definitive agreement + closing conditions

Stage 5: Close and Integrate
  Activities: closing, integration execution
  Duration: 1 day (close) + 6-12 months (integration)
```

### Deal Pipeline Dashboard

```
┌─────────────────────────────────────────────────────────┐
│  CORP DEV PIPELINE                                       │
│                                                          │
│  Stage      │ Deals │ Est. Value │ Next Action           │
│  ──────────────────────────────────────────────────      │
│  Identify   │   15  │            │ Screen by end of Q2   │
│  Evaluate   │    5  │ $200-400M  │ Mgmt meetings July    │
│  Negotiate  │    2  │ $80-120M   │ LOI drafting          │
│  Execute    │    1  │ $45M       │ DD completing Week 3   │
│  Closed YTD │    1  │ $12M       │ Integration on track   │
│                                                          │
│  Pipeline coverage: 4.5x annual target                   │
│  Average deal cycle: 14 weeks (identify to close)        │
└─────────────────────────────────────────────────────────┘
```

---

## Post-Deal Value Creation

### Value Creation Levers

| Lever | Description | Timeline |
|-------|-----------|---------|
| Revenue synergies | Cross-sell, upsell, new markets | 12-36 months |
| Cost synergies | Headcount, technology, vendor consolidation | 6-18 months |
| Product integration | Combined offering, single platform | 6-24 months |
| Best practices | Transfer operating knowledge both ways | 3-12 months |
| Talent leverage | Redeploy acquired talent to high-impact areas | Immediate |

### Integration Tracking

```
Monthly integration review:
  - Synergy realization vs plan
  - Key employee retention status
  - Customer satisfaction (NPS, retention)
  - Product integration milestones
  - Cultural integration assessment
  - Budget vs actual integration costs
```

---

## Production Checklist

- [ ] Corp dev function scoped and staffed appropriately for stage
- [ ] Strategic roadmap identifies capability gaps for inorganic growth
- [ ] Target universe mapped with screening criteria
- [ ] Deal pipeline tracked with stage-gate process
- [ ] Build vs buy vs partner framework applied to each opportunity
- [ ] Financial analysis (valuation, synergies) prepared for targets
- [ ] Board approval process defined for deal commitment
- [ ] Due diligence playbook ready (cross-functional)
- [ ] Integration playbook ready (100-day plan template)
- [ ] Post-deal value creation metrics defined and tracked

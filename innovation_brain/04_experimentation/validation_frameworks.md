# Validation Frameworks -- From Hypothesis to Evidence

## Overview

Validation is the systematic process of reducing uncertainty about whether an
innovation will succeed. It answers the fundamental question: "Should we invest
more in this idea?" Validation is not about confirming what you hope is true --
it is about discovering what is actually true, even when the truth is uncomfortable.
This module covers the complete validation journey from customer discovery through
product-market fit, providing evidence hierarchies and decision frameworks for each
stage.

---

## Customer Discovery (Steve Blank)

### The Four Steps to the Epiphany

Steve Blank's Customer Development model defines four phases:

```
+-----------------+    +-----------------+    +-----------------+    +-----------------+
|   CUSTOMER      |    |   CUSTOMER      |    |   CUSTOMER      |    |   COMPANY       |
|   DISCOVERY     |--->|   VALIDATION    |--->|   CREATION      |--->|   BUILDING      |
|                 |    |                 |    |                 |    |                 |
| "Do people have |    | "Will people    |    | "Can we create  |    | "Can we scale   |
|  this problem?" |    |  pay for our    |    |  end-user       |    |  the company?"  |
|                 |    |  solution?"     |    |  demand?"       |    |                 |
+-----------------+    +-----------------+    +-----------------+    +-----------------+
       SEARCH                SEARCH               EXECUTION             EXECUTION
   (iterate/pivot)       (iterate/pivot)       (scale what works)   (build the machine)
```

### Customer Discovery Process

```
Phase 1: State Your Hypotheses
  - Business model canvas (all 9 blocks)
  - Customer segment hypothesis
  - Problem hypothesis
  - Solution hypothesis
  - Revenue model hypothesis

Phase 2: Test the Problem
  - Conduct 30-50 problem interviews
  - Do NOT pitch your solution
  - Understand their current workflow, pain points, workarounds
  - Map the job-to-be-done
  - Validate or invalidate problem hypothesis

Phase 3: Test the Solution
  - Present solution concept (prototype or demo)
  - Gauge reaction (enthusiasm, indifference, confusion)
  - Would they pay? How much? When?
  - What would they change?
  - Validate or invalidate solution hypothesis

Phase 4: Pivot or Proceed
  - Sufficient evidence of problem-solution fit?
  - YES --> Move to Customer Validation
  - NO --> Pivot (new customer, new problem, or new solution)
```

### Customer Discovery Interview Guide

| Question Type | Example Questions |
|--------------|-------------------|
| Open-ended context | "Tell me about the last time you [did the job]." |
| Pain exploration | "What is the hardest part about [doing the job]?" |
| Current solutions | "How do you currently solve this problem?" |
| Workarounds | "Have you built any workarounds or hacks?" |
| Prioritization | "If you could wave a magic wand, what would you fix?" |
| Willingness to pay | "How much does this problem cost you today?" |
| Decision process | "Who else is involved in decisions about this?" |

### Interview Anti-Patterns (The Mom Test)

Rob Fitzpatrick's "Mom Test" identifies questions that give false positive signals:

| Bad Question | Why It Fails | Better Question |
|-------------|-------------|-----------------|
| "Would you use this?" | People say yes to be polite | "Tell me about the last time you had this problem" |
| "Do you think this is a good idea?" | Opinion, not behavior | "What do you currently do about this?" |
| "Would you pay $X for this?" | Hypothetical behavior | "Have you tried to solve this? What did you spend?" |
| "What features would you want?" | Leading; they are not product designers | "Walk me through your workflow" |

---

## Problem-Solution Fit

### Definition
Problem-solution fit exists when you have evidence that:
1. A significant customer segment has a meaningful problem
2. Your proposed solution addresses the core of that problem
3. Customers acknowledge the solution solves their problem

### Problem-Solution Fit Evidence Hierarchy

```
WEAK EVIDENCE (bottom)          STRONG EVIDENCE (top)

Level 5: Customers paying for a pre-order or pilot
Level 4: Customers committing time/effort to participate in beta
Level 3: Customers expressing strong emotional response to concept
Level 2: Customers confirming the problem exists and matters
Level 1: You believe the problem exists (founder intuition)
```

### Problem-Solution Fit Criteria

| Signal | Threshold | Method |
|--------|-----------|--------|
| Problem confirmation | > 80% of interviews confirm | Customer discovery interviews |
| Pain severity | "Top 3 problem" for > 50% | Ranking exercise in interviews |
| Current spend | > $0 spent on alternatives | Interview + market research |
| Solution enthusiasm | > 40% say "I need this" | Solution interviews / demo |
| Letter of intent / pre-order | > 5 commitments | Sales conversations |

---

## Product-Market Fit Validation

### Definition
Product-market fit exists when you have built something a significant number
of customers want badly enough to adopt, use repeatedly, and (if applicable) pay for.

### The Sean Ellis Test

```
Ask existing users: "How would you feel if you could no longer use [product]?"

Responses:
  Very disappointed:       ____%  (Target: > 40%)
  Somewhat disappointed:   ____%
  Not disappointed:        ____%
  N/A (no longer use it):  ____%

If > 40% say "Very disappointed" --> Product-market fit achieved
If < 40% --> Not yet. Keep iterating.
```

### Product-Market Fit Indicators

| Indicator | What to Look For | PMF Signal |
|-----------|-----------------|-----------|
| Retention | Flat retention curve (not declining to zero) | Users keep coming back |
| Organic growth | Users refer without incentives | Word-of-mouth exceeds paid |
| Usage depth | Power users emerging; feature discovery | Users finding more value over time |
| Pull > Push | Customers seeking you out | Inbound > outbound |
| Revenue retention | Net revenue retention > 100% | Customers paying more over time |
| Time to value | Short time from sign-up to "aha moment" | Users get value quickly |

### The PMF Engine

```
                +----> Usage ---+
                |               |
                |               v
Sign-up ---> Activation ---> Retention ---> Revenue
                |               |               |
                |               +----> Referral-+
                |                       |
                +<----- New Users <-----+

PMF exists when this loop is self-sustaining.
```

---

## Demand Testing Methods

### Smoke Tests

Test demand before building the product:

| Method | How It Works | Signal |
|--------|-------------|--------|
| Landing page | Describe product, collect sign-ups | Conversion rate, traffic quality |
| Waitlist | Create exclusivity, measure demand | Sign-up velocity, share rate |
| Pre-order | Accept payment before product exists | Willingness to pay (strongest signal) |
| Crowdfunding | Kickstarter/Indiegogo campaign | Funding success, backer count |
| Fake door test | Feature button that explains "coming soon" | Click-through rate |
| Explainer video | Video pitch with CTA | View-to-action conversion |
| Ad campaign | Run ads for non-existent product | CTR, CPC, conversion |

### Interpreting Demand Test Results

| Metric | Weak Signal | Moderate Signal | Strong Signal |
|--------|------------|----------------|--------------|
| Landing page conversion | < 2% | 2-8% | > 8% |
| Waitlist growth rate | < 10/day | 10-100/day | > 100/day |
| Pre-order conversion | < 1% | 1-5% | > 5% |
| Crowdfunding | < 50% of goal | 50-100% of goal | > 200% of goal |
| Fake door CTR | < 5% | 5-15% | > 15% |
| Ad campaign CPC | > $5 | $1-5 | < $1 |

---

## Technical Feasibility Validation

### Technical Feasibility Assessment

```
+------------------------------------------------------------------+
| TECHNICAL FEASIBILITY ASSESSMENT                                  |
|                                                                  |
| Core technology: _____________________________________________   |
|                                                                  |
| Maturity level:                                                  |
|   [ ] Research (TRL 1-3) -- Principles observed/demonstrated     |
|   [ ] Development (TRL 4-6) -- Lab validation/prototype          |
|   [ ] Deployment (TRL 7-9) -- System tested/operational          |
|                                                                  |
| Key technical risks:                                             |
|   1. _________________________ Severity: [H/M/L] Mitigation: ___ |
|   2. _________________________ Severity: [H/M/L] Mitigation: ___ |
|   3. _________________________ Severity: [H/M/L] Mitigation: ___ |
|                                                                  |
| Dependencies:                                                    |
|   External APIs: _____________________________________________   |
|   Third-party tools: _________________________________________   |
|   Hardware: __________________________________________________   |
|                                                                  |
| POC plan:                                                        |
|   Scope: ____________________________________________________    |
|   Duration: _____ days                                           |
|   Success criteria: _________________________________________    |
|   Team: _____________________________________________________    |
+------------------------------------------------------------------+
```

### Technology Readiness Levels (TRL)

| TRL | Stage | Description | Innovation Brain Action |
|-----|-------|-------------|----------------------|
| 1 | Basic research | Scientific principles observed | Monitor; do not invest |
| 2 | Applied research | Technology concept formulated | Research partnership |
| 3 | Proof of concept | Experimental proof of concept | Small internal experiment |
| 4 | Lab validation | Technology validated in lab | Dedicated research team |
| 5 | Relevant environment | Validated in relevant environment | Prototype funding |
| 6 | Relevant demonstration | Demonstrated in relevant environment | Venture investment |
| 7 | System prototype | System prototype demonstrated | Pilot program |
| 8 | System complete | System complete and qualified | Launch preparation |
| 9 | Operational | Actual system proven in operation | Full scaling |

---

## Financial Viability Validation

### Unit Economics Validation

```
Revenue per customer (LTV)
  - Average revenue per user per month: $____
  - Average customer lifetime (months): ____
  - Gross margin: ____%
  - LTV = ARPU x Lifetime x Gross Margin = $____

Cost to acquire customer (CAC)
  - Marketing spend per period: $____
  - Sales cost per period: $____
  - Customers acquired per period: ____
  - CAC = (Marketing + Sales) / Customers = $____

LTV:CAC ratio = ____
  Target: > 3:1 for SaaS, > 2:1 for consumer
  Below 1:1 = losing money on every customer

Payback period = CAC / (ARPU x Gross Margin) = ____ months
  Target: < 12 months for SaaS, < 6 months for consumer
```

### Viability Kill Criteria

| Signal | Threshold | Action |
|--------|-----------|--------|
| LTV:CAC < 1:1 | After 6+ months of data | Kill or pivot business model |
| Payback > 24 months | After testing multiple channels | Kill or reduce CAC |
| Gross margin < 40% | For software/SaaS | Revisit pricing or cost structure |
| Churn > 10%/month | After 3+ months | Fix retention before scaling |
| Market size < $100M | For venture-backed | Evaluate adjacent markets |

---

## Evidence Hierarchy for Startups

### The Pyramid of Evidence

```
STRONGEST EVIDENCE
        /\
       /  \  Revenue and retention from paying customers
      /    \
     /      \  Pre-orders, letters of intent, signed contracts
    /        \
   /          \  Behavioral signals (sign-ups, usage, engagement)
  /            \
 /              \  Stated intent ("I would pay for this")
/                \
/                  \  Expert opinions, market research reports
--------------------
                     WEAKEST EVIDENCE
```

### Evidence Requirements by Decision Stage

| Decision | Minimum Evidence Level | Sample Size |
|----------|----------------------|-------------|
| Explore the idea | Expert opinion + market data | N/A |
| Fund an experiment | 10+ problem interviews confirming pain | 10-30 interviews |
| Build an MVP | Behavioral signals (sign-ups, engagement) | 100+ behavioral signals |
| Launch product | Pre-orders or paying pilot customers | 10+ paying customers |
| Scale investment | Revenue, retention, unit economics | 3+ months of data |

---

## Key Takeaways

1. **Customer discovery precedes everything**: Understand the problem before building solutions.
2. **The Mom Test protects against false positives**: Ask about behavior, not opinions.
3. **Product-market fit is measurable**: The Sean Ellis test gives a clear signal.
4. **Demand testing is cheap**: Test willingness to pay before building.
5. **Evidence has a hierarchy**: Revenue > behavior > stated intent > opinion.
6. **Validate viability early**: Unit economics determine whether growth is sustainable.

---

**References:**
- Blank, S. (2013). *The Startup Owner's Manual*. K&S Ranch.
- Fitzpatrick, R. (2013). *The Mom Test*. Robfitz Ltd.
- Ellis, S. & Brown, M. (2017). *Hacking Growth*. Currency.
- Mankins, J.C. (2009). Technology readiness and risk assessments. *Acta Astronautica*.
- Osterwalder, A. et al. (2014). *Value Proposition Design*. Wiley.
- Croll, A. & Yoskovitz, B. (2013). *Lean Analytics*. O'Reilly Media.

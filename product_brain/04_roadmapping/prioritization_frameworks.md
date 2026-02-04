# Prioritization Frameworks

## What This Enables

A rigorous, transparent system for deciding what to build next — the single most consequential recurring decision in product management. Without structured prioritization, roadmaps are determined by whoever argues most persuasively, whoever has the most political capital, or whoever asked last. Frameworks transform prioritization from a political exercise into an analytical one, making tradeoffs explicit and defensible.

---

## The Core Insight

Prioritization is not about ranking features. It is about making explicit tradeoffs between competing investments of scarce resources (engineering time, design attention, opportunity cost). Every item on the roadmap displaces another item that could have been built instead. The purpose of prioritization frameworks is to make these tradeoffs visible, debatable, and ultimately defensible.

Sean Ellis (Hacking Growth, 2017): "The biggest risk in product development is not building the wrong thing — it is building the right thing at the wrong time."

---

## Framework 1: RICE Scoring

### Origin

Developed by Intercom's product team. RICE provides a quantitative scoring system that balances reach, impact, confidence, and effort.

### Formula

```
RICE Score = (Reach x Impact x Confidence) / Effort
```

### Component Definitions

| Component | Definition | Scale | Guidance |
|-----------|-----------|-------|----------|
| **Reach** | How many customers/users will this affect in a given time period? | Number of users per quarter | Use product analytics, segment data, or estimates |
| **Impact** | How much will this move the target metric for each affected user? | 3 = Massive, 2 = High, 1 = Medium, 0.5 = Low, 0.25 = Minimal | Requires judgment calibrated by past experiments |
| **Confidence** | How confident are you in the Reach and Impact estimates? | 100% = High (data-backed), 80% = Medium (strong evidence), 50% = Low (hypothesis) | Forces honest assessment of evidence quality |
| **Effort** | How many person-months of work will this require? | Person-months (e.g., 0.5, 1, 2, 5) | Engineering + Design + QA + PM time |

### RICE Example

| Initiative | Reach | Impact | Confidence | Effort | RICE Score |
|-----------|-------|--------|------------|--------|------------|
| Guided onboarding wizard | 5000 | 3 | 80% | 2 | 6000 |
| Advanced reporting dashboard | 500 | 2 | 50% | 3 | 167 |
| Single sign-on (SSO) | 200 | 2 | 100% | 1 | 400 |
| Mobile app | 3000 | 1 | 50% | 5 | 300 |

### RICE Strengths and Limitations

| Strength | Limitation |
|----------|-----------|
| Quantitative and comparable | Impact scoring is subjective |
| Includes confidence as a variable | Does not account for strategic alignment |
| Penalizes high-effort items | Does not account for dependencies |
| Simple to calculate | Can be gamed by inflating Reach or Impact |

---

## Framework 2: ICE Scoring

### Origin

Popularized by Sean Ellis in growth hacking contexts. Simpler than RICE, designed for rapid prioritization of growth experiments.

### Formula

```
ICE Score = Impact x Confidence x Ease
```

### Component Definitions

| Component | Scale (1-10) | Guidance |
|-----------|-------------|----------|
| **Impact** | 1 = Negligible, 10 = Game-changing | How much will this move the target metric? |
| **Confidence** | 1 = Wild guess, 10 = Certain | How strong is the evidence? |
| **Ease** | 1 = Extremely difficult, 10 = Trivial | How easy is this to implement? |

### ICE vs RICE

| Dimension | ICE | RICE |
|-----------|-----|------|
| Complexity | Simpler — three subjective scores | More rigorous — Reach is quantitative |
| Speed | Faster to score | Requires data for Reach |
| Accuracy | Lower (more subjective) | Higher (Reach grounds it in reality) |
| Best for | Growth experiments, rapid ideation | Feature prioritization, roadmap planning |

---

## Framework 3: Kano Model

### Origin

Developed by Professor Noriaki Kano (Tokyo University of Science, 1984). Classifies features by their relationship to customer satisfaction.

### The Five Categories

```
CUSTOMER SATISFACTION
        ^
        |          Delighters
        |         /
        |        /     Performance
        |       /     /
        |      /     /
        |     /     /
   ─────┼────/─────/───────> FEATURE IMPLEMENTATION
        |   /     /
        |  /     /
        | /     /
        |/     /
        |     / Must-Haves
        |    /
        |   /
        |  /
        | /
        |/
```

| Category | Definition | Customer Reaction if Present | Customer Reaction if Absent |
|----------|-----------|----------------------------|---------------------------|
| **Must-Haves** (Basic) | Expected, taken for granted | No increase in satisfaction | Strong dissatisfaction |
| **Performance** (Linear) | More is better; direct correlation | Proportional satisfaction | Proportional dissatisfaction |
| **Delighters** (Attractive) | Unexpected, creates disproportionate joy | Strong satisfaction increase | No dissatisfaction (they did not expect it) |
| **Indifferent** | Customer does not care either way | No effect | No effect |
| **Reverse** | Customer actively does not want this | Dissatisfaction | Satisfaction |

### Kano Questionnaire

For each feature, ask two questions:

1. **Functional:** "If [feature] were present, how would you feel?" (Like it / Expect it / Neutral / Live with it / Dislike it)
2. **Dysfunctional:** "If [feature] were absent, how would you feel?" (Like it / Expect it / Neutral / Live with it / Dislike it)

Cross-reference the answers:

```
                    DYSFUNCTIONAL RESPONSE
                 Like  Expect Neutral Live-with Dislike
FUNCTIONAL  Like   Q      A      A       A        P
RESPONSE  Expect   R      I      I       I        M
         Neutral   R      I      I       I        M
       Live-with   R      I      I       I        M
         Dislike   R      R      R       R        Q

A=Attractive  M=Must-Have  P=Performance  R=Reverse  I=Indifferent  Q=Questionable
```

### Kano-Informed Prioritization

```
Priority Order:
1. Must-Haves first (eliminate dissatisfaction — table stakes)
2. Performance features second (competitive advantage — differentiation)
3. Delighters selectively (unexpected value — loyalty and word-of-mouth)
4. Never build Indifferent or Reverse features (waste of resources)
```

### Kano Decay

Features migrate over time:

```
Delighter -> Performance -> Must-Have

Example: Free two-day shipping
  2010: Delighter (Amazon Prime, unprecedented)
  2015: Performance (expected from premium services)
  2020: Must-Have (table stakes for e-commerce)
```

**Implication:** Today's delighters become tomorrow's must-haves. You must continuously innovate at the delighter level while maintaining must-haves.

---

## Framework 4: Weighted Shortest Job First (WSJF)

### Origin

From the Scaled Agile Framework (SAFe), rooted in Don Reinertsen's principles of product development flow (The Principles of Product Development Flow, 2009).

### Formula

```
WSJF = Cost of Delay / Job Duration
```

### Cost of Delay Components

| Component | Definition | Question |
|-----------|-----------|----------|
| **User-Business Value** | Direct value to customers and business | How much revenue, retention, or satisfaction does this create? |
| **Time Criticality** | How much value decreases with delay | Is there a deadline, competitive window, or regulatory date? |
| **Risk Reduction / Opportunity Enablement** | How much this reduces risk or enables future opportunities | Does this unlock other high-value work? Does it reduce uncertainty? |

```
Cost of Delay = User-Business Value + Time Criticality + Risk Reduction/Opportunity Enablement
```

### WSJF Scoring

Use relative sizing (Fibonacci: 1, 2, 3, 5, 8, 13, 21) rather than absolute values:

| Initiative | User-Business Value | Time Criticality | Risk Reduction | Cost of Delay | Duration | WSJF |
|-----------|-------------------|------------------|----------------|---------------|----------|------|
| Compliance feature | 8 | 13 | 5 | 26 | 3 | 8.7 |
| Onboarding redesign | 13 | 3 | 8 | 24 | 5 | 4.8 |
| Performance optimization | 5 | 2 | 13 | 20 | 2 | 10.0 |

### Why WSJF Captures What RICE Misses

WSJF explicitly accounts for time criticality — the economic cost of delay. A feature that must ship before a regulatory deadline has a very high time criticality score, even if its user-business value is moderate. RICE does not capture this urgency dimension.

---

## Framework 5: Opportunity Scoring (Outcome-Driven Innovation)

### Origin

Tony Ulwick's ODI methodology (Strategyn). Prioritizes product investments based on the gap between how important an outcome is to customers and how satisfied they are with current solutions.

### The Formula

```
Opportunity Score = Importance + max(Importance - Satisfaction, 0)

Range: 0-20
> 12: Underserved (high opportunity)
10-12: Appropriately served
< 10: Overserved
```

### Application

| Desired Outcome | Importance (1-10) | Satisfaction (1-10) | Opportunity Score |
|----------------|-------------------|--------------------|--------------------|
| Minimize time to generate reports | 9 | 4 | 14 (underserved) |
| Minimize errors in data entry | 8 | 7 | 9 (appropriately served) |
| Increase visibility into team progress | 7 | 3 | 11 (underserved) |
| Maximize customization options | 4 | 6 | 4 (overserved) |

### Strategic Implications

- **Underserved outcomes** (score > 12): Invest here. Customers care deeply and current solutions fail them.
- **Appropriately served** (score 10-12): Maintain; do not over-invest.
- **Overserved outcomes** (score < 10): Opportunity to simplify or reduce cost. Potential for a disruptive, lower-cost offering.

---

## Framework 6: Cost of Delay Analysis

### The Economic Foundation

Don Reinertsen (The Principles of Product Development Flow, 2009) argues that the primary metric for prioritization should be the economic cost of delay — the revenue, market share, or strategic value lost for each unit of time a feature is not delivered.

### Cost of Delay Profiles

```
Profile 1: LINEAR (Standard)          Profile 2: URGENT (Deadline)
Value │                                Value │        deadline
      │    /                                 │    _____|
      │   /                                  │   /     |
      │  /                                   │  /      |
      │ /                                    │ /       |cliff
      │/                                     │/        |
      └──────── Time                         └──────── Time

Profile 3: STEP FUNCTION                Profile 4: DECAYING
Value │                                 Value │\
      │     ____                              │ \
      │    |                                  │  \
      │    |                                  │   \
      │    |                                  │    \
      │____|                                  │     \____
      └──────── Time                          └──────── Time
```

| Profile | Description | Example | Prioritization Implication |
|---------|-------------|---------|---------------------------|
| Linear | Value accrues steadily over time | Core feature improvement | Prioritize by value/effort ratio |
| Urgent | Value drops to zero after a deadline | Regulatory compliance, seasonal feature | Prioritize by deadline proximity |
| Step function | Value unlocks at a specific point | Platform launch enabler | Sequence dependencies carefully |
| Decaying | Value decreases as competitors catch up | Competitive feature parity | Ship fast or abandon |

---

## Combining Frameworks

### The Multi-Framework Approach

No single framework captures all relevant dimensions. Use frameworks in combination:

```
Step 1: Kano Classification
    -> Separate must-haves from performance and delighters
    -> Must-haves go first, regardless of scoring

Step 2: Opportunity Scoring
    -> For performance features, identify underserved outcomes
    -> Focus on highest opportunity scores

Step 3: RICE or WSJF Scoring
    -> Within the underserved outcomes, score by reach/impact/effort (RICE)
    -> Or by cost of delay/duration (WSJF) if timing matters

Step 4: Strategic Alignment Check
    -> Does the prioritized list align with product strategy?
    -> If not, adjust — strategy trumps scoring when they conflict
```

### When Each Framework Shines

| Situation | Best Framework |
|-----------|---------------|
| Growth experimentation, rapid iteration | ICE |
| Feature roadmap prioritization | RICE |
| Understanding customer needs depth | Kano + Opportunity Scoring |
| Time-sensitive prioritization with dependencies | WSJF |
| Innovation and new product development | Opportunity Scoring |
| Comparing initiatives with very different scales | Cost of Delay |

---

## Prioritization Governance

### The Prioritization Meeting

```
Cadence: Monthly (with quarterly deep dives)
Participants: PM, Engineering Lead, Design Lead, Data/Analytics
Duration: 90 minutes

Agenda:
1. Review current priorities and progress (15 min)
2. New candidates: present evidence and scoring (30 min)
3. Re-score existing items if new data emerged (15 min)
4. Stack rank and decide (20 min)
5. Communicate changes to stakeholders (10 min)
```

### Handling Disagreements

When scores are debatable:
1. **Identify the source of disagreement** — is it Reach, Impact, Effort, or Confidence?
2. **Seek data** — can the dispute be resolved with customer data or engineering estimates?
3. **Run a small experiment** — if uncertainty is high, can we test the hypothesis cheaply?
4. **Defer to the PM** — if data cannot resolve it, the PM makes the call (and owns the outcome)

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Gaming the scores | Teams inflate Reach or Impact to get their pet project prioritized | Scores not calibrated or audited | Require evidence for each score; calibrate across teams |
| Framework worship | Rigid adherence to scores even when strategy disagrees | Over-indexing on quantification | Strategy alignment check as final gate |
| Analysis paralysis | Spending more time scoring than building | Too many frameworks, too much precision | Use one framework consistently; time-box scoring |
| HiPPO override | Highest-Paid Person's Opinion overrides framework scores | Cultural problem, not framework problem | Make scores visible; require justification for overrides |
| Effort sandbagging | Engineering inflates effort estimates to reduce score of work they dislike | Incentive misalignment | Use relative sizing; compare to similar past work |
| Confidence inflation | Everything scored at 100% confidence | No accountability for accuracy | Track predicted vs actual impact; calibrate over time |

---

## The Operator's Framework

When prioritizing:

1. **Classify first** — use Kano to separate must-haves from performance and delighters
2. **Score systematically** — apply RICE or WSJF with honest estimates and documented evidence
3. **Check opportunity** — verify that high-scoring items target underserved customer outcomes
4. **Validate strategically** — ensure the prioritized list advances the product strategy
5. **Communicate transparently** — share scores and rationale with stakeholders; explain tradeoffs
6. **Calibrate continuously** — track predicted vs actual impact; improve scoring accuracy over time
7. **Review monthly** — priorities change as new data emerges; re-score and re-stack regularly

---

## Summary

Prioritization frameworks transform "what should we build next?" from a political negotiation into an analytical exercise. RICE scores balance reach, impact, confidence, and effort. ICE provides rapid scoring for growth experiments. Kano classifies features by their relationship to customer satisfaction, revealing must-haves, performance features, and delighters. WSJF incorporates the economic cost of delay. Opportunity scoring identifies underserved customer outcomes where investment will produce the greatest return. No single framework is sufficient — combine them, with Kano classification first, then quantitative scoring, then strategic alignment as a final gate. The greatest prioritization failure is not choosing the wrong framework; it is allowing the loudest voice to override the analysis.

# Sales Process Design — Engineering Predictable Revenue

## Foundational Principle

A sales process is not an internal tracking tool — it is a model of the buyer's
decision process. Stage definitions must map to buyer actions, not seller activities.
"Demo completed" is a seller activity. "Buyer confirmed evaluation criteria and
timeline" is a buyer action. The distinction determines whether the process predicts
revenue or merely records activity.

---

## The Pipeline Velocity Formula

Pipeline velocity is the fundamental equation of revenue generation. Every sales
process decision ultimately impacts one or more of these four variables:

```
                Number of       Average Deal       Win           1
Velocity  =  Opportunities  x    Value       x    Rate    x  ─────────────
                                                              Cycle Length
                                                              (in days)
```

**Example:**
- 100 qualified opportunities
- $50,000 average deal value
- 25% win rate
- 90-day average cycle
- Velocity = 100 x $50,000 x 0.25 / 90 = **$13,889 per day**

**Implication:** To double revenue, you can:
1. Double qualified pipeline (hardest, most expensive)
2. Double deal size (requires value selling maturity)
3. Double win rate (requires qualification and methodology)
4. Halve cycle length (requires process optimization)
5. Any combination that achieves 2x aggregate improvement

The Sales Brain always diagnoses which velocity lever has the highest ROI before
recommending action.

---

## Stage Design Framework

### Design Principles

1. **Buyer-defined exits:** A deal advances when the buyer takes a verifiable action,
   not when the seller completes a task
2. **Mutual commitment:** Each stage transition requires commitment from both parties
3. **Irreversibility:** Once a buyer action is taken, it cannot be un-taken
   (e.g., they introduced you to the economic buyer — that cannot be undone)
4. **Measurability:** Stage criteria must be objectively verifiable, not subjective

### Standard B2B SaaS Pipeline Stages

```
Stage 0: PROSPECT (Pre-pipeline)
├── Definition: Target account identified, outreach initiated
├── Entry criteria: Matches ICP, contact data verified
├── Exit criteria: Prospect agrees to a discovery meeting
├── Probability: Not in pipeline — tracked separately
└── Buyer action: Responds to outreach and accepts meeting

Stage 1: DISCOVERY
├── Definition: Initial meeting to diagnose pain and qualify fit
├── Entry criteria: Meeting confirmed with relevant stakeholder
├── Exit criteria: Pain identified, stakeholders mapped, mutual next step agreed
├── Probability: 10%
├── Buyer action: Articulates business problem and agrees to deeper evaluation
├── MEDDIC check: Pain identified? Initial metrics discussed?
└── Red flags: No pain articulated, meeting taken out of courtesy, no next step

Stage 2: QUALIFICATION
├── Definition: Deep qualification confirming deal viability
├── Entry criteria: Pain confirmed, 2+ stakeholders engaged
├── Exit criteria: MEDDIC score ≥5/8, evaluation plan agreed
├── Probability: 20%
├── Buyer action: Provides decision criteria, introduces additional stakeholders
├── MEDDIC check: Economic buyer identified? Decision criteria known?
└── Red flags: Single-threaded, no access to EB, vague timeline

Stage 3: EVALUATION / DEMO
├── Definition: Buyer actively evaluating solution against requirements
├── Entry criteria: Evaluation criteria documented, demo/POC scoped
├── Exit criteria: Buyer confirms solution meets requirements
├── Probability: 40%
├── Buyer action: Participates in demo/POC, shares evaluation feedback
├── MEDDIC check: Decision process mapped? Competition identified?
└── Red flags: No feedback after demo, evaluation scope creep, champion silent

Stage 4: PROPOSAL / BUSINESS CASE
├── Definition: Commercial proposal presented with pricing and terms
├── Entry criteria: Technical validation complete, commercial discussion initiated
├── Exit criteria: Buyer confirms budget availability and intent to proceed
├── Probability: 60%
├── Buyer action: Reviews proposal, shares with economic buyer, provides feedback
├── MEDDIC check: Champion selling internally? Metrics quantified?
└── Red flags: Proposal sent but no feedback, price objection without discussion

Stage 5: NEGOTIATION
├── Definition: Active negotiation on terms, pricing, and contract language
├── Entry criteria: Verbal intent to purchase, commercial discussions active
├── Exit criteria: Agreement on terms, contract in review
├── Probability: 80%
├── Buyer action: Submits to procurement, negotiates specific terms
├── MEDDIC check: Paper process known? All objections addressed?
└── Red flags: Legal stalling, new stakeholders introduced late, scope reduction

Stage 6: CLOSED-WON
├── Definition: Contract signed, deal booked
├── Entry criteria: Fully executed contract, PO received (if applicable)
├── Post-close: Handoff to CS, onboarding initiated
└── Buyer action: Signs contract, issues PO
```

---

## Stage Probability Calibration

Default stage probabilities are starting points. They must be calibrated to your
actual historical conversion data.

### Calibration Method

```
1. Pull 12 months of closed-won and closed-lost data
2. For each deal, record the highest stage reached before outcome
3. Calculate: stage_probability = deals_that_reached_stage_and_won /
                                  all_deals_that_reached_stage
4. Apply Bayesian smoothing for stages with <30 data points
5. Recalibrate quarterly
```

### Example Calibration

| Stage | Default % | Actual (Company X) | Delta | Action |
|-------|-----------|--------------------|-------|--------|
| Discovery | 10% | 8% | -2% | Qualification too loose at entry |
| Qualification | 20% | 22% | +2% | Within tolerance |
| Evaluation | 40% | 35% | -5% | Demo-to-advance gap; improve demo |
| Proposal | 60% | 55% | -5% | Price objection pattern; adjust |
| Negotiation | 80% | 82% | +2% | Within tolerance |

**Rule:** If actual probability deviates >10% from default, investigate root cause
before adjusting the number. The deviation is a diagnostic signal, not just a
calibration input.

---

## Conversion Rate Analysis

### Waterfall Analysis

Track conversion rates between each adjacent stage to identify bottlenecks:

```
PIPELINE WATERFALL — Q3 EXAMPLE

Discovery          100 deals ─────────────────────────────────────── 100%
     │ 60% convert
Qualification       60 deals ─────────────────────────────── 60%
     │ 67% convert
Evaluation          40 deals ─────────────────────── 40%
     │ 63% convert
Proposal            25 deals ─────────────── 25%
     │ 72% convert
Negotiation         18 deals ──────── 18%
     │ 83% convert
Closed-Won          15 deals ───── 15%

Overall Win Rate: 15/100 = 15%
```

### Diagnosing Conversion Drops

| Bottleneck | Likely Cause | Diagnostic Question | Remedy |
|------------|--------------|---------------------|--------|
| Discovery→Qual <50% | Poor ICP targeting | Are we prospecting the right accounts? | Refine ICP, tighten lead scoring |
| Qual→Eval <60% | Weak discovery | Are we finding real pain? | SPIN training, discovery call coaching |
| Eval→Proposal <50% | Demo ineffectiveness | Does demo address buyer's criteria? | Demo certification, custom demos |
| Proposal→Nego <60% | Price/value misalignment | Are we quantifying ROI? | Value engineering, business case rigor |
| Nego→Won <70% | Procurement friction | Do we understand the paper process? | MEDDPICC Paper Process discipline |

---

## Sales Cycle Optimization

### Cycle Length Drivers

Sales cycle length is not fixed — it is a function of controllable variables:

1. **Deal size:** Larger deals require more approvals and longer evaluation
2. **Stakeholder count:** Each additional stakeholder adds ~2 weeks
3. **Buyer urgency:** Compelling event presence can compress 50%
4. **Competitive dynamics:** Multi-vendor evaluations extend cycle
5. **Procurement complexity:** Enterprise procurement adds 30-60 days
6. **Seller behavior:** Slow follow-up, poor next-step discipline extend cycle

### Compression Techniques

| Technique | Impact | How |
|-----------|--------|-----|
| Multi-threading early | -15-20% cycle | Engage 3+ stakeholders by Stage 2 |
| Mutual action plan | -20-30% cycle | Shared timeline with milestones |
| Executive alignment | -10-15% cycle | EB meeting before formal eval |
| Pre-built business case | -15-20% cycle | Quantified ROI before proposal |
| Procurement pre-work | -20-30% in S5 | Legal/security docs ready Day 1 |
| Compelling event ID | -25-40% total | Tie to budget cycle, board date, etc. |

### Mutual Action Plan (MAP)

The single most effective cycle compression tool. A shared document between buyer
and seller with:

```
MUTUAL ACTION PLAN — [Company Name]

Objective: Evaluate [Solution] for [Use Case]
Target Go-Live: [Date]
Executive Sponsor (Buyer): [Name]
Executive Sponsor (Seller): [Name]

| Week | Milestone | Owner | Status |
|------|-----------|-------|--------|
| W1 | Discovery complete, success criteria defined | Both | ☐ |
| W2 | Technical evaluation / demo | Seller + IT | ☐ |
| W3 | Reference calls (2 customers) | Seller + Champion | ☐ |
| W4 | Business case review with CFO | Champion + Seller | ☐ |
| W5 | Proposal presented | Seller | ☐ |
| W6 | Legal/procurement review | Buyer legal | ☐ |
| W7 | Contract negotiation | Both | ☐ |
| W8 | Signature target | Economic Buyer | ☐ |
```

**Why MAPs work:**
- Creates shared accountability and momentum
- Surfaces process obstacles early (legal review, budget cycles)
- Provides natural "constructive tension" touchpoints
- Enables accurate forecasting (milestone-based, not gut-based)
- Differentiates you from competitors who are reactive

---

## Process Design by Sales Motion

### Self-Serve / PLG
- No pipeline stages — conversion is product-driven
- Sales enters when usage hits threshold (PQL)
- Process: PQL → Discovery → Expansion proposal → Contract
- Cycle: 14-30 days from PQL to paid

### SMB Velocity
- 3-4 stages maximum
- Process: Discovery → Demo → Proposal → Close
- Target cycle: 14-30 days
- Minimize procurement friction
- Standardized pricing, minimal negotiation

### Mid-Market
- 5-6 stages
- Full SPIN/Challenger methodology
- MEDDIC qualification
- Process: Discovery → Qual → Eval → Proposal → Negotiation → Close
- Target cycle: 60-90 days

### Enterprise / Strategic
- 6-7 stages with sub-stages
- MEDDPICC qualification mandatory
- Multi-threaded, multi-level engagement
- Executive sponsorship required
- Process: Discovery → Deep Qual → Technical Eval → Business Case →
  Procurement → Legal → Close
- Target cycle: 120-270 days

---

## Process Instrumentation

### CRM Requirements per Stage

Every stage must capture:
1. **Entry date** — When the deal entered this stage
2. **Exit criteria status** — Which buyer actions have occurred
3. **MEDDIC/MEDDPICC score** — Updated at each stage transition
4. **Next step** — Specific, dated, with identified participants
5. **Close date rationale** — Why the projected close date is credible
6. **Amount rationale** — How deal size was determined

### Health Indicators

| Indicator | Healthy | Warning | Critical |
|-----------|---------|---------|----------|
| Days in stage | < median | 1-2x median | > 2x median |
| Activity recency | < 7 days | 7-14 days | > 14 days |
| Stakeholder count | 3+ | 2 | 1 |
| Next step clarity | Dated + named | Vague | None |
| MEDDIC score | ≥ stage minimum | 1 below minimum | 2+ below |

### Pipeline Hygiene Rules

1. Deals with no activity for 30 days must be reviewed
2. Deals past projected close date by >14 days must be re-forecast or removed
3. Close dates may only push twice before manager review is required
4. Stage regression (moving backward) triggers mandatory deal review
5. MEDDIC score must increase or maintain as deal advances — score decrease
   while stage advances is a data quality violation

---

## Revenue Architecture

### Capacity Model

```
Revenue Target = Reps x Quota x Attainment Rate

Where:
- Reps = number of fully ramped AEs
- Quota = annual quota per rep
- Attainment Rate = % of reps hitting quota (target: 60-70%)

Example:
$10M target = 10 AEs x $1.5M quota x 67% attainment
Requires: 10 AEs fully ramped + pipeline coverage of 3-4x per AE
Pipeline needed: 10 x $1.5M x 3.5 = $52.5M in qualified pipeline annually
```

### Ramp Considerations

New reps do not carry full quota immediately. Standard ramp schedule:

| Month | Quota % | Rationale |
|-------|---------|-----------|
| 1-2 | 0% | Training, onboarding, shadowing |
| 3 | 25% | First pipeline creation |
| 4 | 50% | Pipeline building, first closes |
| 5 | 75% | Approaching full productivity |
| 6+ | 100% | Fully ramped |

**Ramp-adjusted capacity:** Subtract unrealized quota from new hires when building
the annual plan. A rep hired in Q2 contributes approximately 50% of annual quota.

---

**Sales process design is revenue engineering. Every stage, metric, and exit criteria
exists to make revenue generation predictable and diagnosable.**

# Pipeline Management — Architecture for Predictable Revenue

## Pipeline as a System, Not a List

Pipeline management is the operational discipline of converting qualified demand into
closed revenue through a structured, stage-gated process with defined exit criteria,
velocity optimization, and hygiene enforcement. The distinction between a pipeline and
a deal list is governance: a pipeline has rules, a list does not.

The fundamental equation governing pipeline health:

```
Revenue = Pipeline Created x Win Rate x Average Deal Size x (1 / Sales Cycle Length)
```

Every pipeline management intervention targets one of these four variables. Most
organizations focus exclusively on pipeline creation while neglecting the multiplier
effects of win rate improvement, deal size expansion, and cycle compression.

---

## Stage Architecture

### Designing Pipeline Stages

Pipeline stages must satisfy three criteria simultaneously:
1. **Buyer-verifiable** — the stage reflects a buyer action, not a seller action
2. **Objectively measurable** — two observers would agree on the stage assignment
3. **Sequentially dependent** — stage N cannot occur without completing stage N-1

**Anti-pattern: Seller-centric stages.** "Demo scheduled" is seller activity. "Buyer
confirmed specific pain and allocated evaluation time" is buyer commitment. Stages
must track buyer progression, not seller effort.

### Standard B2B SaaS Stage Model (7-Stage)

| Stage | Name | Buyer Signal | Seller Action | Probability |
|-------|------|-------------|---------------|-------------|
| S0 | Prospect Identified | Fit confirmed via ICP | Research, enrichment | 5% |
| S1 | Discovery Complete | Buyer articulated pain | SPIN/Challenger discovery | 15% |
| S2 | Solution Validated | Buyer confirmed solution fit | Demo, POC scoping | 30% |
| S3 | Stakeholder Alignment | Economic buyer engaged | Multi-threading, champion coaching | 50% |
| S4 | Proposal Delivered | Buyer requested commercial terms | Proposal, pricing, SOW | 65% |
| S5 | Negotiation | Buyer negotiating terms | Legal, procurement, concessions | 80% |
| S6 | Verbal Commit | Buyer verbally committed | Contract execution | 90% |
| S7 | Closed Won | Signature + PO/payment | Handoff to CS | 100% |

**Probability Calibration Protocol:**
Default probabilities are starting points. Every organization must calibrate based on
historical conversion data. Run quarterly regression analysis:

```
Actual Win Rate at Stage X = (Deals that entered Stage X AND closed won) /
                              (Total deals that entered Stage X)
```

If your S3 shows 50% default but actual is 38%, recalibrate. Miscalibrated
probabilities are the primary source of forecast error.

---

## Exit Criteria — The Gate Between Stages

### Exit Criteria Design Principles

Exit criteria are the contractual requirements a deal must satisfy before advancing.
Without exit criteria, stages are meaningless labels applied based on seller optimism.

**The FACT Framework for Exit Criteria:**
- **F**inding: What buyer information must be confirmed?
- **A**ction: What buyer action must have occurred?
- **C**ommitment: What has the buyer committed to next?
- **T**imeline: What date-bound next step is scheduled?

### Sample Exit Criteria by Stage

**S0 to S1 (Prospect to Discovery Complete):**
- [ ] ICP fit confirmed (firmographic + technographic)
- [ ] Buyer responded to outreach and agreed to discovery call
- [ ] Discovery call completed (minimum 30 minutes)
- [ ] At least one explicit pain statement captured verbatim
- [ ] Buyer agreed to a follow-up meeting with defined agenda
- [ ] BANT minimum: Budget range acknowledged, Authority level identified

**S1 to S2 (Discovery to Solution Validated):**
- [ ] Pain quantified in business impact terms (dollars, hours, risk)
- [ ] Current state documented (existing solution, workarounds, costs)
- [ ] Future state agreed upon with the buyer
- [ ] Demo or POC completed with buyer feedback captured
- [ ] Buyer confirmed "this could solve our problem"
- [ ] Technical evaluation criteria documented

**S2 to S3 (Solution Validated to Stakeholder Alignment):**
- [ ] Economic buyer identified by name and title
- [ ] Economic buyer has been briefed or met directly
- [ ] Champion identified and tested (will they sell internally?)
- [ ] Decision process mapped: who, what criteria, what timeline
- [ ] Competitive landscape confirmed (who else is the buyer evaluating?)
- [ ] Paper process identified (procurement, legal, security review)

**S3 to S4 (Stakeholder Alignment to Proposal):**
- [ ] Economic buyer confirmed budget availability
- [ ] Decision criteria documented and weighted
- [ ] Mutual action plan agreed upon with buyer
- [ ] All stakeholder objections surfaced and addressed
- [ ] Buyer explicitly requested a proposal or commercial terms
- [ ] Pricing framework discussed (no surprises in proposal)

**S4 to S5 (Proposal to Negotiation):**
- [ ] Proposal reviewed with buyer (not just sent via email)
- [ ] Buyer provided specific feedback on terms
- [ ] Legal/procurement engaged with timeline
- [ ] Redlines or requested changes documented
- [ ] Buyer confirmed intent to proceed pending terms agreement

**S5 to S6 (Negotiation to Verbal Commit):**
- [ ] All commercial terms agreed
- [ ] Legal review complete or waived
- [ ] Security review passed (if applicable)
- [ ] Budget confirmed and allocated
- [ ] Verbal "yes" from economic buyer
- [ ] Contract sent for signature

---

## Velocity Formula — The Speed of Money

### Pipeline Velocity Defined

Pipeline velocity measures the rate at which revenue moves through the pipeline,
expressed in dollars per unit time:

```
Pipeline Velocity = (Number of Opportunities x Win Rate x Average Deal Size) /
                     Average Sales Cycle (days)
```

**Example Calculation:**
- 80 qualified opportunities in pipeline
- 25% win rate
- $45,000 average ACV
- 62-day average sales cycle

```
Velocity = (80 x 0.25 x $45,000) / 62 = $14,516/day = ~$435K/month
```

### Velocity Lever Analysis

Each variable in the velocity equation has different optimization characteristics:

| Lever | Impact | Ease | Risk | Best Intervention |
|-------|--------|------|------|-------------------|
| Opportunities | Linear | Moderate | Low | Increase SDR capacity, channels |
| Win Rate | Multiplicative | Hard | Medium | Better qualification, deal coaching |
| Deal Size | Multiplicative | Moderate | Medium | Multi-product, land-and-expand |
| Cycle Time | Inverse | Hard | Low | Mutual action plans, champion enablement |

**The Compounding Effect:**
Improving each lever by just 10% compounds dramatically:
```
Base:    80 x 0.25 x $45K / 62 = $14,516/day
+10% each: 88 x 0.275 x $49.5K / 56.2 = $21,316/day (+47%)
```

A 10% improvement across all four levers yields a 47% velocity increase. This is why
holistic pipeline management outperforms channel-specific optimization.

---

## Coverage Ratios — The Buffer Against Reality

### What Coverage Ratios Measure

Pipeline coverage ratio expresses how much pipeline you need relative to your quota
to account for deals that will slip, shrink, or be lost:

```
Coverage Ratio = Total Weighted Pipeline / Quota for Period
```

### Benchmark Coverage Ratios by Segment

| Segment | Typical Win Rate | Required Coverage | Explanation |
|---------|-----------------|-------------------|-------------|
| SMB | 25-35% | 3.0-4.0x | High volume, lower qualification |
| Mid-Market | 20-30% | 3.5-5.0x | Moderate complexity, committee decisions |
| Enterprise | 15-25% | 4.0-6.0x | Long cycles, procurement complexity |
| Strategic | 10-20% | 5.0-8.0x | Multi-year, high-stakes evaluation |

**The Coverage Ratio Fallacy:**
Raw coverage ratios are misleading when deal quality varies. A rep with 5x coverage
in early-stage deals has less real coverage than a rep with 3x coverage in late-stage
deals. Weight coverage by stage probability:

```
Weighted Coverage = SUM(Deal Value x Stage Probability) / Quota
```

### Time-Phased Coverage

Static coverage ratios ignore temporal distribution. A Q4 pipeline with 4x coverage
but 80% of deals in S1 is not healthy — those deals cannot close this quarter.

**Time-to-Close Analysis:**
For each stage, calculate median days to close. Deals whose median time-to-close
exceeds the remaining quota period should be excluded from in-period coverage:

```
In-Period Coverage = SUM(Deal Value x Stage Probability
                        WHERE median_days_to_close(stage) <= days_remaining_in_period)
                     / Quota
```

---

## Pipeline Hygiene — Preventing Decay

### The Decay Problem

Pipelines naturally decay. Deals age, contacts change roles, priorities shift, budgets
get cut. Without active hygiene enforcement, pipeline bloat creates three problems:
1. **Forecast inflation** — stale deals inflate projections
2. **Misallocated effort** — reps work dead deals instead of creating new ones
3. **False confidence** — leaders believe coverage exists when it doesn't

### Hygiene Rules Engine

**Age-Based Rules:**
- Deals in S0/S1 with no activity for 14+ days: auto-flag for review
- Deals in S2/S3 with no activity for 21+ days: require manager justification
- Deals in S4+ with no activity for 30+ days: escalate to VP
- Any deal older than 2x median cycle time for its segment: mandatory review

**Push Count Rules:**
- Close date pushed once: acceptable (document reason)
- Close date pushed twice: manager review required
- Close date pushed three+ times: mandatory pipeline review, consider removing

**Stage Regression Rules:**
- Deals moving backward (S3 to S2) must document the regression reason
- Deals regressing twice should be re-qualified from scratch
- Stage regression rates above 15% indicate a stage definition problem

### Quarterly Pipeline Scrub Protocol

Every quarter (ideally in week 2 of the quarter), conduct a full pipeline scrub:

1. **Export** all open opportunities with stage, age, last activity, close date, push count
2. **Flag** all opportunities violating hygiene rules
3. **Review** flagged deals with each rep (15 min per rep per 10 deals)
4. **Decision** for each flagged deal: validate, re-stage, or remove
5. **Measure** scrub impact: total pipeline removed, coverage ratio change
6. **Communicate** post-scrub pipeline health to leadership

**Expected Scrub Outcomes:**
A healthy scrub should remove 15-25% of pipeline value. If you remove less than 10%,
your criteria are too lenient. If you remove more than 40%, your stage definitions or
entry criteria need fundamental redesign.

---

## Pipeline Creation Engine

### Source Diversification

Reliance on a single pipeline source creates fragility. Best-practice organizations
maintain balanced creation across multiple sources:

| Source | Target Mix | Characteristics |
|--------|-----------|-----------------|
| SDR Outbound | 30-40% | Controllable, predictable, scalable |
| Inbound Marketing | 20-30% | Lower cost, higher volume, lower ACV |
| AE Self-Sourced | 15-25% | Highest quality, best win rate |
| Partner/Channel | 10-20% | Leverage, but less control |
| Customer Expansion | 10-15% | Highest win rate, lowest cost |

### Pipeline Generation Cadence

Pipeline creation must be a weekly discipline, not a quarterly panic:

```
Weekly Pipeline Created >= (Monthly Quota / 3) x (1 / Win Rate)
```

For a rep with $100K monthly quota and 25% win rate:
```
Weekly Pipeline Created >= ($100K / 3) x (1 / 0.25) = $133K/week
```

This ensures steady-state pipeline replenishment to maintain coverage ratios despite
ongoing deal closures and pipeline decay.

---

## Pipeline Review Cadence

### Weekly Pipeline Review (30 min per rep)

**Focus:** Movement and next actions
- Deals that advanced a stage this week (celebrate, reinforce)
- Deals with no movement for 10+ days (diagnose, intervene)
- Top 3 deals by value: what is the next verifiable buyer action?
- Pipeline created this week vs. target
- In-period coverage ratio

### Monthly Pipeline Review (60 min per team)

**Focus:** Patterns and process
- Stage conversion rates vs. benchmarks
- Average deal size trends (expanding or contracting?)
- Cycle time trends by segment
- Source mix analysis
- Win/loss themes from completed deals

### Quarterly Strategic Pipeline Review (Half-day)

**Focus:** Structural health and forecasting
- Full pipeline scrub (see protocol above)
- Coverage ratio by segment and rep
- Velocity trend analysis (quarter over quarter)
- Pipeline creation sustainability analysis
- Quota adequacy assessment based on pipeline reality

---

## Common Pipeline Anti-Patterns

### The Stuffed Pipeline
**Symptom:** High deal count, low win rate, inflated early-stage
**Cause:** Low qualification bar, activity-focused culture
**Fix:** Raise S0-to-S1 exit criteria, institute discovery scorecards

### The Top-Heavy Pipeline
**Symptom:** Few deals, all in late stages, no early-stage replenishment
**Cause:** Over-reliance on existing pipeline, insufficient prospecting
**Fix:** Mandate weekly prospecting hours, SDR pipeline targets

### The Zombie Pipeline
**Symptom:** High total value, but most deals have no recent activity
**Cause:** No hygiene enforcement, emotional attachment to dead deals
**Fix:** Implement automated hygiene rules, quarterly scrubs

### The Hero Pipeline
**Symptom:** 60%+ of pipeline from 1-2 mega-deals
**Cause:** Over-concentration, insufficient deal diversification
**Fix:** No single deal should exceed 20% of quarterly pipeline value

---

## Integration with CRM

### Required CRM Fields for Pipeline Management

| Field | Type | Purpose |
|-------|------|---------|
| Stage | Picklist | Current pipeline stage |
| Exit Criteria Met | Checkbox set | Tracks gate completion |
| Close Date | Date | Expected close (auto-audit for pushes) |
| Push Count | Auto-calculated | Number of close date changes |
| Last Buyer Activity | Date | Last verifiable buyer action |
| Next Step | Text (required) | Next scheduled buyer action |
| Pipeline Source | Picklist | Origin of the opportunity |
| MEDDPICC Score | Auto-calculated | Qualification completeness |

### Automation Rules

- Stage cannot advance unless exit criteria checkboxes are complete
- Close date changes auto-increment push count and log reason
- Deals with no next step cannot be saved
- Stale deal alerts fire based on stage-specific inactivity thresholds
- Weekly automated pipeline report to each manager

---

**Pipeline management is the operating system of revenue. Without it, sales
organizations operate on hope. With it, they operate on physics.**

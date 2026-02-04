# Pricing Brain -- Accountability Protocol (Authoritative)

This protocol defines how the Pricing Brain is held accountable for the quality,
accuracy, and impact of its recommendations. Every pricing decision is tracked,
every prediction is verified, and every failure is documented for learning.

Accountability is not optional. Untracked decisions are unaccountable decisions.

---

## CORE ACCOUNTABILITY PRINCIPLES

1. **Every recommendation must be falsifiable.** If you cannot define what "wrong" looks like, the recommendation has no accountability.
2. **Predictions must have timelines.** "Revenue will increase" is not a prediction. "ARPU will increase 8-12% within 90 days" is.
3. **Outcomes are measured, not assumed.** Post-implementation review is mandatory.
4. **Failures are documented, not buried.** Wrong predictions improve the model. Hidden failures compound.
5. **The brain owns its recommendations.** If the recommendation was followed and the outcome was bad, the brain must diagnose why.

---

## DECISION AUDIT TRAIL

Every pricing recommendation must be logged with the following structure.
This trail is the primary accountability mechanism.

### Decision Log Entry Format

```
DECISION ID: PRC-[YYYY]-[NNN]
DATE: [Date of recommendation]
TYPE: [ ] New Pricing  [ ] Price Change  [ ] Packaging Change  [ ] Discount Approval
      [ ] International  [ ] Experiment Design  [ ] Competitive Response

CONTEXT:
  Product: ________________________________
  Segment: ________________________________
  Current State: ________________________________
  Problem/Opportunity: ________________________________

RECOMMENDATION:
  Action: ________________________________
  Rationale: ________________________________
  Data Supporting: ________________________________
  Assumptions: ________________________________

PREDICTIONS:
  Primary Metric: ________________________________
  Predicted Outcome: ________________________________
  Confidence Level: [ ] High (>80%)  [ ] Medium (50-80%)  [ ] Low (<50%)
  Timeline for Measurement: ________________________________

  Guardrail Metrics:
    Metric 1: ________ Expected: ________ Acceptable Range: ________
    Metric 2: ________ Expected: ________ Acceptable Range: ________
    Metric 3: ________ Expected: ________ Acceptable Range: ________

KILL CRITERIA:
  Revert if: ________________________________
  Escalate if: ________________________________
  Review date: ________________________________

STATUS: [ ] Pending  [ ] Implemented  [ ] Measured  [ ] Verified  [ ] Closed
```

### Decision Log Storage
- All entries stored in Supabase `pricing_decisions` table
- Decision ID is unique and sequential per year
- Status updated at each lifecycle stage
- Never delete entries -- mark as superseded if replaced

---

## PREDICTION TRACKING

Every quantitative prediction must be tracked to actual outcomes.
This is how the Pricing Brain calibrates its confidence.

### Prediction Registry

```
| Decision ID | Prediction | Confidence | Timeline | Actual | Accuracy | Notes |
|-------------|-----------|------------|----------|--------|----------|-------|
| PRC-2025-001 | ARPU +8-12% | High | 90 days | | | |
| PRC-2025-002 | Conversion +3pp | Medium | 60 days | | | |
| PRC-2025-003 | Churn <2% increase | High | 90 days | | | |
```

### Prediction Accuracy Scoring
- **Hit:** Actual falls within predicted range = +1 point
- **Near Miss:** Actual within 1.5x of predicted range = 0 points
- **Miss:** Actual outside 1.5x of predicted range = -1 point
- **Catastrophic Miss:** Actual in opposite direction of prediction = -2 points

### Calibration Review
Quarterly, compute:
- **Prediction Hit Rate:** % of predictions that were Hits
- **Calibration Score:** Are "High Confidence" predictions more accurate than "Low Confidence"?
- **Directional Accuracy:** Even when magnitude is wrong, was the direction right?
- **Overconfidence Index:** Ratio of High Confidence predictions to actual High Accuracy outcomes

### Calibration Targets
| Metric | Target | Warning | Failure |
|--------|--------|---------|---------|
| Prediction Hit Rate | >60% | 40-60% | <40% |
| Directional Accuracy | >80% | 60-80% | <60% |
| High Confidence Hit Rate | >75% | 50-75% | <50% |
| Catastrophic Miss Rate | <5% | 5-10% | >10% |

If calibration targets are not met, the brain must:
1. Review all missed predictions for systematic bias
2. Adjust confidence levels downward
3. Increase data requirements before making predictions
4. Document root cause in failure log

---

## POST-IMPLEMENTATION REVIEW (PIR)

Every pricing change must undergo a Post-Implementation Review at the defined
measurement timeline. This is not optional.

### PIR Template

```
DECISION ID: PRC-[YYYY]-[NNN]
REVIEW DATE: ________________________________
REVIEWER: ________________________________

1. OUTCOME ASSESSMENT
   Primary metric predicted: ________________________________
   Primary metric actual: ________________________________
   Verdict: [ ] Hit  [ ] Near Miss  [ ] Miss  [ ] Catastrophic Miss

2. GUARDRAIL METRICS
   | Metric | Predicted | Actual | Within Range? |
   |--------|-----------|--------|---------------|
   | | | | [ ] Yes [ ] No |
   | | | | [ ] Yes [ ] No |
   | | | | [ ] Yes [ ] No |

3. UNINTENDED CONSEQUENCES
   Positive surprises: ________________________________
   Negative surprises: ________________________________
   Segment-level variations: ________________________________

4. ROOT CAUSE ANALYSIS (if miss)
   Why was the prediction wrong? ________________________________
   What data was missing? ________________________________
   What assumption was incorrect? ________________________________
   Was the methodology flawed? ________________________________

5. LESSONS LEARNED
   What should the brain do differently next time? ________________________________
   Should any scoring dimensions be updated? ________________________________
   Should any benchmark tests be added? ________________________________

6. ACTION ITEMS
   | Action | Owner | Deadline | Status |
   |--------|-------|----------|--------|
   | | | | |
   | | | | |
```

### PIR Schedule
- **Price increases:** PIR at 30 days, 90 days, and 180 days post-implementation
- **New pricing (new product):** PIR at 30, 60, 90, and 180 days
- **Packaging changes:** PIR at 60 days and 180 days
- **Experiments:** PIR at experiment end date plus 30-day follow-up
- **Competitive responses:** PIR at 30 days and 90 days

---

## FAILURE LOG

All pricing failures must be documented. A failure is defined as:
- Prediction accuracy is a Miss or Catastrophic Miss
- A guardrail metric was breached
- A pricing change was reverted
- Customer backlash required a response
- Revenue declined when growth was predicted

### Failure Entry Format

```
FAILURE ID: PRC-FAIL-[YYYY]-[NNN]
DECISION ID: PRC-[YYYY]-[NNN] (linked)
DATE IDENTIFIED: ________________________________
SEVERITY: [ ] Critical (revenue/churn impact >10%)
          [ ] Major (revenue/churn impact 5-10%)
          [ ] Minor (revenue/churn impact <5%)
          [ ] Learning (no material impact but prediction was wrong)

DESCRIPTION:
  What happened: ________________________________
  What was expected: ________________________________
  Gap: ________________________________

ROOT CAUSE:
  Category: [ ] Bad Data  [ ] Bad Assumptions  [ ] Bad Methodology
            [ ] External Shock  [ ] Implementation Error  [ ] Communication Failure
  Detail: ________________________________

IMPACT:
  Revenue impact: ________________________________
  Customer impact: ________________________________
  Brand/trust impact: ________________________________

CORRECTIVE ACTION:
  Immediate: ________________________________
  Systemic: ________________________________
  Prevention: ________________________________

LESSONS LEARNED:
  Rule to add: ________________________________
  Benchmark to add: ________________________________
  Process to change: ________________________________

STATUS: [ ] Open  [ ] Corrective Action In Progress  [ ] Resolved  [ ] Closed
```

---

## ESCALATION PROTOCOL

### When to Escalate
The Pricing Brain must escalate to the CEO Brain or human decision-maker when:

1. **Revenue at risk:** Pricing change may impact >10% of total revenue
2. **Customer backlash likely:** Change affects >50% of customer base negatively
3. **Competitive crisis:** Competitor action requires response within 48 hours
4. **Prediction failure:** Two consecutive Catastrophic Misses on the same metric
5. **Cross-brain conflict:** Pricing recommendation conflicts with Sales, Product, or Marketing brain
6. **Irreversible decision:** Pricing change that cannot be easily reverted (e.g., published annual contracts)

### Escalation Format

```
ESCALATION ID: PRC-ESC-[YYYY]-[NNN]
URGENCY: [ ] Immediate (within hours)  [ ] Urgent (within 24h)  [ ] Standard (within 1 week)
ESCALATED TO: ________________________________

SITUATION: ________________________________
OPTIONS:
  Option A: ________________________________ (Pricing Brain recommendation)
  Option B: ________________________________
  Option C: ________________________________
RECOMMENDATION: ________________________________
RISK IF DELAYED: ________________________________
```

---

## REVIEW CADENCE

### Weekly
- Review all open pricing experiments (status, early signals)
- Check guardrail metrics on recent pricing changes
- Update prediction registry with latest actuals

### Monthly
- Complete PIRs for any pricing changes reaching their review date
- Review discount frequency and depth trends
- Update competitive pricing landscape
- Review prediction accuracy month-over-month

### Quarterly
- Full PricingScore.md evaluation for all active pricing
- Prediction calibration review
- Failure log review and pattern identification
- Benchmark test re-run (minimum 5 scenarios)
- Update pricing strategy based on accumulated learnings
- Present pricing health report to CEO Brain

### Annually
- Complete pricing audit across all products and markets
- Refresh WTP research for all major segments
- Rebuild competitive analysis from scratch
- Review and update all eval files (PricingScore, ReviewChecklist, BenchmarkTests)
- Set pricing OKRs for the coming year

---

## ACCOUNTABILITY METRICS DASHBOARD

Track these metrics continuously to measure Pricing Brain effectiveness:

### Brain Performance Metrics
| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Prediction Hit Rate | >60% | | |
| Directional Accuracy | >80% | | |
| High Confidence Accuracy | >75% | | |
| Catastrophic Miss Rate | <5% | | |
| PIR Completion Rate | 100% | | |
| Avg PricingScore | >=4.0 | | |
| Failure Response Time | <48h | | |
| Experiment Win Rate | >40% | | |

### Business Impact Metrics
| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| ARPU Growth | >5% QoQ | | |
| NRR | >110% | | |
| Conversion Rate | >Category Median | | |
| Discount Rate | <15% | | |
| Pricing-Related Churn | <2% | | |
| Expansion Revenue % | >25% | | |

---

## CROSS-BRAIN ACCOUNTABILITY

### When Pricing Brain Recommendations Involve Other Brains

| Situation | Handoff To | Accountability |
|-----------|-----------|----------------|
| Pricing page design | Design Brain | Pricing Brain owns content, Design owns UX |
| Sales pricing playbook | Sales Brain | Pricing Brain owns strategy, Sales owns execution |
| Pricing experiment code | Engineering Brain | Pricing Brain owns design, Engineering owns implementation |
| Market pricing research | Research Brain | Pricing Brain owns questions, Research owns methodology |
| Pricing communication | Marketing Brain | Pricing Brain owns messaging, Marketing owns distribution |
| Revenue forecasting | Finance Brain | Pricing Brain owns assumptions, Finance owns model |

### Conflict Resolution
When Pricing Brain and another brain disagree:
1. Document the disagreement with both perspectives
2. Identify the factual basis for each position
3. Escalate to CEO Brain with both recommendations
4. Accept CEO Brain's resolution
5. Log the resolution and outcome for future reference

---

## ENFORCEMENT RULE

Accountability is enforced, not voluntary.
Every decision is logged. Every prediction is tracked. Every failure is documented.
Untracked recommendations are unauthorized recommendations.
If it was not logged, it did not happen.

---

## END OF ACCOUNTABILITY PROTOCOL

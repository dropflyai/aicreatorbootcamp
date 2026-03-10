# Innovation Brain -- Accountability Protocol (Authoritative)

This protocol defines how the Innovation Brain is held accountable for the quality,
rigor, and outcomes of its recommendations. Every innovation decision is tracked,
every prediction is verified, every kill decision is reviewed, and every failure
is documented for learning.

Accountability is not optional. Innovation without accountability is expensive guessing.

---

## CORE ACCOUNTABILITY PRINCIPLES

1. **Every recommendation must have kill criteria.** If you cannot define when to stop, you are not managing risk.
2. **Predictions must have timelines and thresholds.** "This will work" is not a prediction. "We will have 50 paying customers within 6 months" is.
3. **Kill decisions are reviewed retroactively.** Were we right to kill? Were we right to continue? Both are evaluated.
4. **Learning velocity is the primary process metric.** Speed of learning, not speed of building.
5. **Portfolio performance is tracked, not just project performance.** One hit can justify several misses -- but only if the portfolio was managed deliberately.

---

## DECISION AUDIT TRAIL

Every innovation recommendation must be logged with the following structure.

### Decision Log Entry Format

```
DECISION ID: INN-[YYYY]-[NNN]
DATE: [Date of recommendation]
TYPE: [ ] Idea Evaluation  [ ] Stage Gate  [ ] Kill/Continue  [ ] Pivot
      [ ] Resource Allocation  [ ] Experiment Design  [ ] Portfolio Rebalance

CONTEXT:
  Project: ________________________________
  Stage: [ ] Ideation  [ ] Validation  [ ] Scaling
  Horizon: [ ] H1  [ ] H2  [ ] H3
  Current Investment: $________________________________
  Problem Being Solved: ________________________________

RECOMMENDATION:
  Action: ________________________________
  Rationale: ________________________________
  Key Assumptions: ________________________________
  Alternative Options Considered: ________________________________

PREDICTIONS:
  Primary Metric: ________________________________
  Predicted Outcome: ________________________________
  Confidence Level: [ ] High (>80%)  [ ] Medium (50-80%)  [ ] Low (<50%)
  Timeline: ________________________________

  Milestone Predictions:
    30 days: ________________________________
    90 days: ________________________________
    180 days: ________________________________

KILL CRITERIA:
  Kill if by [date]: ________________________________
  Kill if total investment exceeds: $________________________________
  Pivot trigger: ________________________________

STATUS: [ ] Pending  [ ] Implemented  [ ] Measured  [ ] Verified  [ ] Closed
```

### Decision Log Storage
- All entries stored in Supabase `innovation_decisions` table
- Decision ID is unique and sequential per year
- Status updated at each lifecycle stage
- Never delete entries -- mark as superseded if replaced

---

## PREDICTION TRACKING

Every quantitative prediction must be tracked to actual outcomes.

### Prediction Registry

```
| Decision ID | Prediction | Confidence | Timeline | Actual | Accuracy | Notes |
|-------------|-----------|------------|----------|--------|----------|-------|
| INN-2025-001 | 50 beta users in 90d | Medium | 90 days | | | |
| INN-2025-002 | PMF signal by month 6 | Low | 180 days | | | |
| INN-2025-003 | $100K ARR in 12mo | Medium | 365 days | | | |
```

### Prediction Accuracy Scoring
- **Hit:** Actual falls within predicted range = +1 point
- **Near Miss:** Actual within 1.5x of predicted range = 0 points
- **Miss:** Actual outside 1.5x of predicted range = -1 point
- **Catastrophic Miss:** Actual in opposite direction = -2 points

### Calibration Targets
| Metric | Target | Warning | Failure |
|--------|--------|---------|---------|
| Prediction Hit Rate | >50% | 30-50% | <30% |
| Directional Accuracy | >70% | 50-70% | <50% |
| High Confidence Hit Rate | >65% | 45-65% | <45% |
| Catastrophic Miss Rate | <10% | 10-15% | >15% |

Note: Innovation predictions are inherently less accurate than pricing or
operational predictions. Calibration targets are adjusted accordingly.
The key metric is directional accuracy: was the trend correct even if magnitude was off?

---

## KILL DECISION REVIEW

Every kill decision must be reviewed 6 months after the kill to determine
if the decision was correct. This prevents both premature kills and
emotional attachment masking bad projects.

### Kill Decision Log

```
KILL ID: INN-KILL-[YYYY]-[NNN]
DECISION ID: INN-[YYYY]-[NNN] (linked)
PROJECT: ________________________________
DATE KILLED: ________________________________
TOTAL INVESTMENT: $________________________________
REASON FOR KILL: ________________________________

KILL CRITERIA THAT TRIGGERED:
  Criterion: ________________________________
  Threshold: ________________________________
  Actual: ________________________________

TEAM REASSIGNMENT:
  Team members: ________________________________
  Reassigned to: ________________________________

ASSETS RECOVERED:
  Technology/code reusable: [ ] Yes [ ] Partial [ ] No
  Customer relationships preserved: [ ] Yes [ ] No
  Learnings documented: [ ] Yes [ ] No

6-MONTH RETROSPECTIVE (complete 6 months after kill):
  Market signal since kill: ________________________________
  Would we make the same decision today? [ ] Yes [ ] No
  What did we learn about our kill criteria? ________________________________
  Did a competitor succeed where we stopped? [ ] Yes [ ] No
  If yes, why did they succeed? ________________________________
  Verdict: [ ] Correct Kill  [ ] Premature Kill  [ ] Should Have Killed Earlier
```

### Kill Decision Quality Metrics
| Metric | Target | Current | Notes |
|--------|--------|---------|-------|
| Kill decisions reviewed | 100% | | |
| Correct Kill Rate | >70% | | |
| Premature Kill Rate | <15% | | |
| Should Have Killed Earlier Rate | <15% | | |
| Average time from warning signs to kill | <60 days | | |

---

## CONTINUE DECISION REVIEW

Projects that receive continued investment are also reviewed.
Throwing good money after bad is the most expensive innovation failure.

### Continue Decision Check
At every stage gate, evaluate:

```
CONTINUE REVIEW: INN-[YYYY]-[NNN]
DATE: ________________________________
INVESTMENT TO DATE: $________________________________
INVESTMENT REQUESTED: $________________________________

PROGRESS SINCE LAST REVIEW:
  Milestones achieved: ________________________________
  Milestones missed: ________________________________
  Learnings generated: ________________________________
  Kill criteria status: ________________________________

RED FLAGS CHECK:
  [ ] Multiple missed milestones with "good reasons" each time
  [ ] Team requesting lower kill criteria thresholds
  [ ] Progress narrative changes each review (shifting goalposts)
  [ ] Customer evidence is anecdotal, not quantitative
  [ ] Team cannot articulate top 3 learnings from last month
  [ ] Competitor has launched similar product with traction

RED FLAG COUNT: ___
  0-1: Proceed with confidence
  2-3: Proceed with caution, increase review frequency
  4+: Serious consideration of kill or pivot
```

---

## EXPERIMENT ACCOUNTABILITY

Every experiment must be tracked from hypothesis to outcome.

### Experiment Log

```
EXPERIMENT ID: INN-EXP-[YYYY]-[NNN]
PROJECT: ________________________________
HYPOTHESIS: ________________________________
RISKIEST ASSUMPTION BEING TESTED: ________________________________

DESIGN:
  Method: ________________________________
  Success Criteria: ________________________________
  Failure Criteria: ________________________________
  Sample Size: ________________________________
  Duration: ________________________________
  Budget: $________________________________

RESULT:
  Outcome: [ ] Validated  [ ] Invalidated  [ ] Inconclusive
  Data: ________________________________
  Learning: ________________________________
  Action Taken: ________________________________

QUALITY ASSESSMENT:
  Was the riskiest assumption tested? [ ] Yes [ ] No
  Were success criteria defined BEFORE running? [ ] Yes [ ] No
  Was sample size adequate? [ ] Yes [ ] No
  Were results shared with team? [ ] Yes [ ] No
  Was the assumption map updated? [ ] Yes [ ] No
```

### Experiment Quality Metrics
| Metric | Target | Current | Notes |
|--------|--------|---------|-------|
| Experiments per month (portfolio) | >4 | | |
| Pre-registered hypothesis rate | 100% | | |
| Inconclusive result rate | <20% | | |
| Average experiment cycle time | <2 weeks | | |
| Riskiest assumption tested first | >80% | | |
| Results shared within 48h | 100% | | |

---

## PORTFOLIO ACCOUNTABILITY

The innovation portfolio is reviewed quarterly with specific accountability metrics.

### Portfolio Health Dashboard

```
| Project | Horizon | Stage | Investment | Revenue | Learning Velocity | Score | Status |
|---------|---------|-------|-----------|---------|-------------------|-------|--------|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

PORTFOLIO BALANCE:
  H1: ___% (target: 70%)
  H2: ___% (target: 20%)
  H3: ___% (target: 10%)

PORTFOLIO METRICS:
  Total Investment: $________________________________
  Total Revenue from Innovation: $________________________________
  Innovation ROI: ________________________________
  Kill Rate: ____% (healthy: 30-50%)
  Active Experiments: ________________________________
  Learnings per Month: ________________________________
```

### Portfolio Accountability Questions (Quarterly)
1. Are we investing in the right horizon balance?
2. Are we killing fast enough? (Kill rate below 20% may indicate insufficient experimentation)
3. Are we killing too fast? (Kill rate above 60% may indicate bad idea selection)
4. Is learning velocity increasing or decreasing?
5. Are killed project learnings being reused?
6. Has the competitive landscape shifted our portfolio?

---

## FAILURE LOG

All innovation failures must be documented for institutional learning.

### Failure Entry Format

```
FAILURE ID: INN-FAIL-[YYYY]-[NNN]
DECISION ID: INN-[YYYY]-[NNN] (linked)
DATE IDENTIFIED: ________________________________
SEVERITY: [ ] Critical (>$200K investment lost with no learning)
          [ ] Major ($50K-$200K lost or significant time wasted)
          [ ] Minor (<$50K lost, learnings captured)
          [ ] Learning (no material loss, prediction was wrong)

DESCRIPTION:
  What happened: ________________________________
  What was expected: ________________________________
  Gap: ________________________________

ROOT CAUSE:
  Category: [ ] Bad Problem Selection  [ ] Bad Solution Design
            [ ] Insufficient Validation  [ ] Premature Scaling
            [ ] Market Timing  [ ] Execution Failure
            [ ] External Shock  [ ] Team Mismatch
  Detail: ________________________________

LEARNINGS:
  What we know now that we did not know then: ________________________________
  What signals we missed: ________________________________
  What we would do differently: ________________________________

PATTERN CHECK:
  Is this a repeat failure pattern? [ ] Yes [ ] No
  If yes, which pattern? ________________________________
  What systemic change prevents recurrence? ________________________________

REUSABLE ASSETS:
  Technology/code reusable: ________________________________
  Customer relationships: ________________________________
  Market insights: ________________________________
  Team capability built: ________________________________

STATUS: [ ] Open  [ ] Learning Captured  [ ] Systemic Fix Applied  [ ] Closed
```

---

## ESCALATION PROTOCOL

### When to Escalate
The Innovation Brain must escalate to the CEO Brain or human decision-maker when:

1. **Investment threshold:** Single project investment exceeds $500K
2. **Kill deadlock:** Team and reviewers disagree on kill/continue
3. **Portfolio imbalance:** >90% of investment on single horizon
4. **Failure pattern:** Same failure type occurs 3+ times
5. **Cross-brain conflict:** Innovation recommendation conflicts with Product, Engineering, or Finance brain
6. **Strategic pivot:** Innovation finding suggests the core business strategy should change

### Escalation Format

```
ESCALATION ID: INN-ESC-[YYYY]-[NNN]
URGENCY: [ ] Immediate  [ ] Urgent (24h)  [ ] Standard (1 week)
ESCALATED TO: ________________________________

SITUATION: ________________________________
OPTIONS:
  Option A: ________________________________ (Innovation Brain recommendation)
  Option B: ________________________________
  Option C: ________________________________
RECOMMENDATION: ________________________________
DATA SUPPORTING: ________________________________
RISK IF DELAYED: ________________________________
```

---

## REVIEW CADENCE

### Weekly
- Review all active experiments (status, early signals)
- Update learning velocity tracker
- Check kill criteria proximity for all projects

### Monthly
- Complete stage-gate reviews for any projects at decision points
- Review experiment pipeline (enough experiments running?)
- Update assumption maps for all active projects
- Innovation Brain performance metrics review

### Quarterly
- Full portfolio rebalancing review
- Kill decision retrospectives (6-month lookback)
- Failure log pattern analysis
- Prediction calibration review
- Full InnovationScore evaluation for all active projects
- Present innovation health report to CEO Brain

### Annually
- Complete innovation program ROI analysis
- Review all kill decisions from the year
- Audit innovation process for systemic improvements
- Update InnovationScore dimensions if needed
- Set innovation OKRs for the coming year
- Benchmark against industry innovation metrics

---

## CROSS-BRAIN ACCOUNTABILITY

### When Innovation Brain Recommendations Involve Other Brains

| Situation | Handoff To | Accountability |
|-----------|-----------|----------------|
| Feasibility assessment | Engineering Brain | Innovation owns hypothesis, Engineering owns assessment |
| Market research | Research Brain | Innovation owns questions, Research owns methodology |
| Business model design | MBA Brain / Finance Brain | Innovation owns concept, MBA/Finance owns model |
| Customer research | Product Brain | Innovation owns experiments, Product owns integration |
| Go-to-market for innovation | Marketing Brain | Innovation owns value prop, Marketing owns distribution |
| Innovation pricing | Pricing Brain | Innovation owns positioning, Pricing owns numbers |

### Conflict Resolution
When Innovation Brain and another brain disagree:
1. Document the disagreement with both data sets
2. Identify the core factual disagreement
3. Design an experiment to resolve it (when possible)
4. If no experiment possible, escalate to CEO Brain
5. Log resolution and track the outcome

---

## ENFORCEMENT RULE

Accountability is enforced, not optional.
Every decision is logged. Every prediction is tracked.
Every kill is reviewed. Every failure teaches.
Innovation without accountability is expensive hope.
If it was not logged, it did not happen.

---

## END OF ACCOUNTABILITY PROTOCOL

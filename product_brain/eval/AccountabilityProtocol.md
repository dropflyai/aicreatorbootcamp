# AccountabilityProtocol.md -- Product Brain Audit & Accountability System

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Product Brain / CEO Brain
> Purpose: Every product decision is tracked, predictions are scored,
> failures are documented, and biases are detected. The Product Brain
> is accountable not just for decisions but for the quality of its
> decision-making process over time.

---

## 1. Decision Audit Trail

Every product decision that allocates engineering time, changes the roadmap,
or affects customers must be logged in the following format.

### Decision Record Template

```
DECISION ID: PROD-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
DECISION MAKER: [Product Brain / with whom]
TYPE: [Feature | Prioritization | Experiment | Sunset | Pricing | Strategy]

DECISION STATEMENT:
[One sentence: what was decided]

ALTERNATIVES CONSIDERED:
1. [Alternative A]: [Why rejected]
2. [Alternative B]: [Why rejected]
3. [Do nothing]: [Why rejected or accepted]

EVIDENCE BASE:
- Customer evidence: [Summary + links to research]
- Quantitative data: [Summary + links to dashboards]
- Strategic input: [How this connects to strategy]

PREDICTED OUTCOME:
- Primary metric: [Metric name] will [direction] by [amount] within [timeframe]
- Confidence: [High/Medium/Low] because [reason]
- Counter-metric: [Metric name] should not [direction] by more than [threshold]

STAKEHOLDERS:
- Informed: [List]
- Consulted: [List]
- Approver: [Name]
- Objections raised: [Summary of any disagreements]

REVERSIBILITY: [One-way door / Two-way door]
REVIEW DATE: [When this decision will be evaluated]

ProductScore APPLIED:
- Customer Insight Depth: [1/3/5]
- Strategic Alignment: [1/3/5]
- Metric Rigor: [1/3/5]
- Prioritization Quality: [1/3/5]
- Specification Completeness: [1/3/5]
- Stakeholder Communication: [1/3/5]
- Experimentation Design: [1/3/5]
- Technical Product Sense: [1/3/5]
- COMPOSITE: [X/40]
```

### Decision Log Rules

1. Every decision record must be created BEFORE execution begins.
2. Decision records are IMMUTABLE after creation (no retroactive editing).
3. Outcome records are appended, never replacing the original prediction.
4. All decision records are accessible to all brains (transparency).
5. Decision records older than 2 years are archived but never deleted.

---

## 2. Post-Launch Review Protocol

Every feature launch is reviewed at 30, 60, and 90 days post-launch.
Reviews are mandatory, not optional. Skipping a review is itself a failure
that must be documented.

### 30-Day Review

```
DECISION ID: PROD-[YYYY]-[NNN]
REVIEW TYPE: 30-DAY POST-LAUNCH
DATE: [YYYY-MM-DD]

ADOPTION:
- Target: [X% of eligible users]
- Actual: [Y% of eligible users]
- Assessment: [On track / Below target / Above target]

METRICS:
- Primary metric baseline: [Value at launch]
- Primary metric current: [Value now]
- Primary metric target: [Value expected at 30 days]
- Counter-metric status: [Within bounds / Degraded]

QUALITATIVE SIGNALS:
- Support ticket volume related to feature: [Count]
- Sentiment from user feedback: [Positive / Mixed / Negative]
- Top 3 user complaints: [List]

BUGS / ISSUES:
- P0 issues: [Count and status]
- P1 issues: [Count and status]
- Performance regressions: [Any detected]

DECISION: [Continue as planned / Iterate on specific issue / Escalate concern]
NEXT REVIEW: [60-day date]
```

### 60-Day Review

```
DECISION ID: PROD-[YYYY]-[NNN]
REVIEW TYPE: 60-DAY POST-LAUNCH
DATE: [YYYY-MM-DD]

METRIC TRAJECTORY:
- Primary metric: [Trending toward target / Plateau / Declining]
- Retention of feature users: [Retained / Dropping off]
- Counter-metric: [Stable / Concerning]

COHORT ANALYSIS:
- Early adopters vs. later adopters: [Same behavior / Different behavior]
- Usage depth: [Increasing / Stable / Decreasing]
- Power user emergence: [Any users using feature in unexpected ways?]

COMPETITIVE RESPONSE:
- Have competitors reacted to this feature? [Yes/No, details]

ITERATION EFFECTIVENESS:
- Changes made since 30-day review: [List]
- Impact of those changes: [Measured / Not yet measurable]

DECISION: [Continue / Iterate / Begin sunset consideration]
NEXT REVIEW: [90-day date]
```

### 90-Day Review (Final)

```
DECISION ID: PROD-[YYYY]-[NNN]
REVIEW TYPE: 90-DAY POST-LAUNCH (FINAL)
DATE: [YYYY-MM-DD]

OUTCOME vs. PREDICTION:
- Predicted: [Original prediction from decision record]
- Actual: [What happened]
- Accuracy: [Prediction was accurate / over-estimated / under-estimated by X%]

PREDICTION CALIBRATION:
- Confidence was [High/Medium/Low]
- Outcome supports that confidence level: [Yes / No -- was overconfident /
  No -- was underconfident]

LESSONS LEARNED:
1. What we got right: [Specific]
2. What we got wrong: [Specific]
3. What we would do differently: [Specific]
4. What surprised us: [Specific]

ROI ASSESSMENT:
- Engineering investment: [Person-weeks]
- Revenue impact: [Measurable / Not directly attributable]
- User impact: [Quantified]
- Strategic value: [Assessment]

FINAL DISPOSITION:
- [ ] Feature is a clear success. Invest further.
- [ ] Feature is meeting expectations. Maintain.
- [ ] Feature is underperforming. Iterate plan defined.
- [ ] Feature is failing. Sunset plan initiated.

PREDICTION ACCURACY LOG UPDATE: [Score recorded in Section 3]
```

---

## 3. Prediction Accuracy Tracking

The Product Brain maintains a running log of all predictions and their
outcomes. This is the most important accountability mechanism because it
reveals systematic biases over time.

### Prediction Log Format

```
| ID | Date | Prediction | Confidence | Timeframe | Outcome | Accurate? | Error Type |
|----|------|-----------|------------|-----------|---------|-----------|------------|
| PROD-2026-001 | 2026-01-15 | Feature X will increase activation by 10% | High | 90 days | +3% | Over-estimated | Optimism bias |
```

### Prediction Accuracy Metrics (Updated Quarterly)

```
QUARTER: [Q1/Q2/Q3/Q4 YYYY]

TOTAL PREDICTIONS MADE: [N]
TOTAL PREDICTIONS RESOLVED: [N]
TOTAL PREDICTIONS PENDING: [N]

ACCURACY BY CONFIDENCE LEVEL:
- High confidence predictions: [X% accurate]
  - Expected: 80-90% accurate
  - Calibration: [Well-calibrated / Overconfident / Underconfident]
- Medium confidence predictions: [X% accurate]
  - Expected: 50-70% accurate
  - Calibration: [Well-calibrated / Overconfident / Underconfident]
- Low confidence predictions: [X% accurate]
  - Expected: 20-40% accurate
  - Calibration: [Well-calibrated / Overconfident / Underconfident]

DIRECTIONAL ACCURACY:
- Predictions where direction was correct (up/down): [X%]
- Predictions where magnitude was within 2x: [X%]

SYSTEMATIC BIASES DETECTED:
- Optimism bias: [Predictions consistently over-estimate positive outcomes?]
- Anchoring: [Predictions cluster around round numbers or recent data?]
- Recency bias: [Recent experiences disproportionately influence predictions?]
- Planning fallacy: [Timelines consistently underestimated?]

CALIBRATION ACTIONS:
[What the Product Brain will do to improve prediction accuracy next quarter]
```

### Calibration Thresholds

| Condition | Action |
|-----------|--------|
| High-confidence accuracy < 60% | STOP making high-confidence predictions until calibrated. All predictions downgraded to Medium. |
| Directional accuracy < 50% | Fundamental review required. Product Brain may be operating on wrong mental models. |
| Planning fallacy detected (>70% of timelines missed) | All timeline estimates automatically multiplied by 1.5x. |
| Optimism bias detected (>70% of magnitude estimates too high) | All magnitude estimates automatically discounted by 30%. |
| Prediction log not updated for 30+ days | Escalation to CEO Brain. Accountability lapse. |

---

## 4. Sunk Cost Bias Detection System

The Product Brain is especially vulnerable to sunk cost bias because PMs
champion features emotionally. This system provides automated checks.

### Sunk Cost Trigger Conditions

The following conditions trigger a mandatory sunk cost review:

1. **Time trigger:** Any initiative that has been in development for more than
   2x the original estimate without shipping.
2. **Scope trigger:** Any initiative where scope has been cut more than 50%
   from original spec to hit a deadline.
3. **Metric trigger:** Any launched feature where 60-day metrics are below 50%
   of the original prediction.
4. **Pivot trigger:** The justification for continuing has changed from the
   original justification. ("We started this because of X, but now we are
   continuing because of Y.")
5. **Emotional trigger:** Any time the Product Brain catches itself using
   phrases like:
   - "We have already invested too much to stop."
   - "We are so close to finishing."
   - "The team worked so hard on this."
   - "We just need one more sprint."
   - "We promised the stakeholders."

### Sunk Cost Review Process

When a trigger fires:

```
SUNK COST REVIEW
DECISION ID: [Reference]
TRIGGER: [Which trigger fired]
DATE: [YYYY-MM-DD]

ORIGINAL JUSTIFICATION:
[Why did we start this?]

CURRENT JUSTIFICATION:
[Why are we continuing this?]

JUSTIFICATION SHIFT:
[Has the reason changed? If yes, is the new reason valid on its own?]

FRESH-START TEST:
"If we had NOT started this, and someone proposed it today with current
information, would we approve it?"
- [ ] Yes -> Continue is justified.
- [ ] No -> Sunk cost bias is likely influencing the decision.

REMAINING INVESTMENT:
[What additional resources are needed to complete?]

OPPORTUNITY COST:
[What else could those resources do?]

EXPECTED VALUE OF CONTINUING:
[Realistic, not optimistic, estimate of outcomes]

EXPECTED VALUE OF STOPPING:
[What do we gain by reallocating resources? Minus any shutdown costs.]

DECISION:
- [ ] Continue: Fresh-start test passed. Expected value of continuing exceeds
      expected value of stopping.
- [ ] Stop: Sunk cost bias detected. Resources reallocated to [what].
- [ ] Reduce: Scope down to minimum viable version and ship in [timeframe].

DECISION RATIONALE:
[Documented for the audit trail]
```

---

## 5. Failure Documentation Protocol

Failures are the most valuable learning opportunities, but only if they are
documented honestly and systematically.

### Failure Severity Classification

| Severity | Definition | Documentation Required |
|----------|-----------|----------------------|
| S1 - Critical | Feature caused customer harm, data loss, security breach, or significant revenue impact | Full post-mortem within 48 hours. CEO Brain involved. |
| S2 - Major | Feature significantly underperformed predictions. Resources wasted. Customer confusion. | Post-mortem within 1 week. |
| S3 - Minor | Feature slightly underperformed. Lessons learned but no major impact. | Logged in prediction accuracy tracker. Retrospective note. |
| S4 - Learning | Experiment produced null result. Expected outcome of rigorous experimentation. | Logged in experiment registry. No post-mortem needed. |

### Post-Mortem Template (S1 and S2)

```
POST-MORTEM: PROD-[YYYY]-[NNN]
SEVERITY: [S1/S2]
DATE: [YYYY-MM-DD]
FACILITATOR: [Who led the post-mortem]

TIMELINE:
[Chronological sequence of events from decision to failure detection]

WHAT HAPPENED:
[Factual description of the failure, not blame]

WHAT WE EXPECTED:
[Original prediction and rationale]

WHY IT FAILED (5 Whys Analysis):
1. Why? [Surface cause]
2. Why? [Deeper cause]
3. Why? [Deeper still]
4. Why? [Systemic cause]
5. Why? [Root cause]

CONTRIBUTING FACTORS:
- [ ] Insufficient customer research
- [ ] Incorrect assumptions about user behavior
- [ ] Technical constraints not identified early enough
- [ ] Scope creep diluted the value proposition
- [ ] Market timing was wrong
- [ ] Competitive response was faster than expected
- [ ] Internal misalignment caused delays
- [ ] Metric definition was wrong (measured the wrong thing)
- [ ] Sample size too small for valid conclusions
- [ ] Other: [Specify]

WHAT WE LEARNED:
[Specific, actionable insights]

WHAT WE WILL CHANGE:
[Specific process or behavior changes with owners and deadlines]

FOLLOW-UP VERIFICATION:
[How we will verify the changes were implemented]
[Date to check]
```

### Failure Pattern Detection

Quarterly, review all failures and look for patterns:

```
FAILURE PATTERN REVIEW: [Quarter YYYY]

TOTAL FAILURES BY SEVERITY:
- S1: [Count]
- S2: [Count]
- S3: [Count]
- S4: [Count]

RECURRING ROOT CAUSES:
[List root causes that appear in 2+ post-mortems]

PROCESS GAPS IDENTIFIED:
[Which ReviewChecklist gates, if enforced, would have caught these failures?]

CALIBRATION DRIFT:
[Are failures increasing, decreasing, or stable quarter-over-quarter?]

ACTIONS:
[Specific improvements to process, rubric, or checklist based on patterns]
```

---

## 6. Escalation Matrix

Not all issues should be resolved by the Product Brain alone. This matrix
defines when and how to escalate.

### Escalation Levels

| Level | Condition | Escalate To | Response Time |
|-------|-----------|------------|---------------|
| L1 - Inform | Decision made, FYI to stakeholders | Relevant stakeholders | Within 24 hours |
| L2 - Consult | Need input from another brain | Specific brain (Engineering, Design, Data, etc.) | Within 48 hours |
| L3 - Collaborate | Cross-functional decision requiring joint ownership | Multiple brains + CEO Brain | Within 72 hours |
| L4 - Escalate | Decision exceeds Product Brain authority or competence | CEO Brain | Within 24 hours |
| L5 - Emergency | Customer harm, security, legal, or existential risk | CEO Brain + all relevant brains | Immediately |

### Mandatory Escalation Triggers

The Product Brain MUST escalate (not optional) when:

1. **Revenue impact > $X threshold** (defined per company size):
   - Decision affects more than 20% of current revenue.
   - Decision requires investment exceeding quarterly budget.

2. **Customer impact > threshold:**
   - Decision affects more than 50% of active users.
   - Decision removes functionality users currently depend on.
   - Decision changes pricing for existing customers.

3. **Strategic direction change:**
   - Decision contradicts a board-approved strategy.
   - Decision enters a new market or exits an existing one.
   - Decision fundamentally changes the product's positioning.

4. **Cross-brain dependency:**
   - Decision requires Engineering Brain capacity not currently allocated.
   - Decision requires Design Brain to create a new design system component.
   - Decision requires Data Brain to build new data infrastructure.
   - Decision requires Marketing Brain to change positioning or messaging.

5. **Repeated failure:**
   - Same dimension scores 1 on ProductScore twice consecutively.
   - Same type of failure appears in 3+ post-mortems within a quarter.
   - Prediction accuracy drops below 50% for a quarter.

6. **Ethical concerns:**
   - Feature could be used to harm users.
   - Dark pattern identification.
   - Data privacy implications unclear.
   - Accessibility regression.

### Escalation Record Format

```
ESCALATION ID: ESC-PROD-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
TRIGGER: [Which mandatory trigger or voluntary reason]
ESCALATED TO: [Brain or person]
SEVERITY: [L1-L5]

CONTEXT:
[What is the situation]

DECISION NEEDED:
[What specifically needs to be decided]

OPTIONS PRESENTED:
1. [Option A with pros/cons]
2. [Option B with pros/cons]
3. [Option C with pros/cons]

PRODUCT BRAIN RECOMMENDATION:
[What the Product Brain recommends and why]

RESOLUTION:
[What was decided, by whom, on what date]

FOLLOW-UP:
[What happens next and who owns it]
```

---

## 7. Quarterly Self-Assessment

Every quarter, the Product Brain completes a structured self-assessment.

```
QUARTERLY SELF-ASSESSMENT: [Quarter YYYY]
DATE: [YYYY-MM-DD]

DECISIONS MADE THIS QUARTER: [Count]
DECISIONS WITH COMPLETED REVIEWS: [Count]

PRODUCTCORE AVERAGES:
- Customer Insight Depth: [Avg score]
- Strategic Alignment: [Avg score]
- Metric Rigor: [Avg score]
- Prioritization Quality: [Avg score]
- Specification Completeness: [Avg score]
- Stakeholder Communication: [Avg score]
- Experimentation Design: [Avg score]
- Technical Product Sense: [Avg score]

WEAKEST DIMENSION: [Which one]
IMPROVEMENT PLAN: [Specific actions for weakest dimension]

PREDICTION CALIBRATION:
- High confidence accuracy: [X%]
- Directional accuracy: [X%]
- Planning accuracy: [X%]

SUNK COST REVIEWS TRIGGERED: [Count]
SUNK COST REVIEWS WHERE STOP WAS RECOMMENDED: [Count]

FAILURES:
- S1: [Count]
- S2: [Count]
- Recurring patterns: [Summary]

ESCALATIONS:
- Total: [Count]
- Resolved satisfactorily: [Count]

TOP 3 THINGS I DID WELL:
1. [Specific with evidence]
2. [Specific with evidence]
3. [Specific with evidence]

TOP 3 THINGS I NEED TO IMPROVE:
1. [Specific with plan]
2. [Specific with plan]
3. [Specific with plan]

BENCHMARK TEST RESULTS:
- Tests passed: [X/15]
- Tests failed: [List which ones]
- Retest plan: [When and how]
```

---

## 8. Continuous Improvement Loop

The accountability system itself must improve. Annually:

1. Review all quarterly self-assessments for the year.
2. Identify which accountability mechanisms caught real problems.
3. Identify which mechanisms are bureaucratic overhead without value.
4. Remove or simplify low-value mechanisms.
5. Add mechanisms for newly discovered failure modes.
6. Recalibrate all thresholds based on actual data.
7. Update BenchmarkTests with new scenarios from real failures.
8. Share the annual review with all brains for cross-pollination.

---

*Accountability without action is theater. Every mechanism in this protocol
must lead to a concrete improvement or it should be removed.*

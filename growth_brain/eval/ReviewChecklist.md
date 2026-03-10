# Growth Review Checklist — Pre-Ship Verification (Authoritative)

Every growth experiment, strategy document, and growth model must pass this checklist
before it ships, launches, or influences decisions.

No exceptions. No shortcuts. Incomplete checklist = cannot ship.

---

## HOW TO USE THIS CHECKLIST

1. Complete every section relevant to the artifact type
2. Mark each item: PASS, FAIL, or N/A (with justification for N/A)
3. All FAIL items must be resolved before shipping
4. Reviewer must sign off at the bottom
5. Checklist is stored with the experiment documentation

### Artifact Types

| Type | Required Sections |
|------|------------------|
| Experiment | 1, 2, 3, 4, 5, 6, 8, 10 |
| Growth model | 1, 7, 8, 10 |
| Strategy document | 1, 7, 8, 9, 10 |
| Channel launch | 1, 3, 5, 6, 7, 8, 10 |
| Loop design | 1, 5, 6, 7, 8, 10 |

---

## SECTION 1: HYPOTHESIS AND FRAMING

### 1.1 Hypothesis Structure
- [ ] Hypothesis is written in standard format: "If [change] for [audience], then [metric] will [change by amount] because [reason]"
- [ ] Hypothesis is falsifiable (can be proven wrong with data)
- [ ] Hypothesis specifies the independent variable (what we are changing)
- [ ] Hypothesis specifies the dependent variable (what we are measuring)
- [ ] Hypothesis includes expected magnitude of effect
- [ ] Hypothesis includes behavioral or psychological rationale
- [ ] Hypothesis defines the audience segment
- [ ] Learning outcome is defined regardless of result (what we learn if hypothesis is false)

### 1.2 Problem Validation
- [ ] Problem is validated with qualitative data (user interviews, support tickets, session recordings)
- [ ] Problem is validated with quantitative data (funnel analysis, drop-off rates, cohort data)
- [ ] Problem is sized: how many users are affected and what is the revenue impact?
- [ ] Problem is prioritized relative to other growth opportunities

### 1.3 Prior Art
- [ ] Previous experiments on this area are reviewed
- [ ] Learnings from past experiments are incorporated
- [ ] Competitor approaches are analyzed (not copied)
- [ ] Industry benchmarks are referenced

---

## SECTION 2: EXPERIMENT DESIGN

### 2.1 Statistical Rigor
- [ ] Power analysis completed: minimum sample size calculated
- [ ] Expected effect size is realistic (based on prior experiments or benchmarks)
- [ ] Significance level defined (typically alpha = 0.05)
- [ ] Power level defined (typically beta = 0.80)
- [ ] Duration calculated based on current traffic and required sample size
- [ ] Multiple comparison correction applied if testing multiple variants
- [ ] One-tailed vs two-tailed test decision documented with rationale

### 2.2 Experiment Mechanics
- [ ] Randomization method defined and verified
- [ ] Unit of randomization specified (user, session, device, account)
- [ ] Experiment does not conflict with other running experiments
- [ ] Feature flag or experiment framework configured correctly
- [ ] Variant allocation verified (50/50 or as specified)
- [ ] Novelty effect mitigation plan in place (if applicable)
- [ ] Ramp plan defined (e.g., 10% -> 50% -> 100%)

### 2.3 Pre-Registration
- [ ] Hypothesis documented before experiment starts
- [ ] Primary metric defined before experiment starts
- [ ] Success criteria defined before experiment starts
- [ ] Analysis plan documented before experiment starts
- [ ] Stopping criteria defined before experiment starts
- [ ] Guardrail metrics defined before experiment starts

---

## SECTION 3: METRICS DEFINITION

### 3.1 Primary Metric
- [ ] One primary metric defined (not two, not three, ONE)
- [ ] Primary metric directly ladders to a business outcome
- [ ] Primary metric is measurable with current instrumentation
- [ ] Primary metric has a baseline measurement
- [ ] Minimum detectable effect (MDE) is defined
- [ ] Primary metric is not a vanity metric (pageviews, impressions without context)

### 3.2 Secondary Metrics
- [ ] Secondary metrics defined (2-5 maximum)
- [ ] Secondary metrics provide supporting context to primary metric
- [ ] Secondary metrics include leading indicators
- [ ] No more than 5 secondary metrics (focus is required)

### 3.3 Guardrail Metrics
- [ ] Guardrail metrics defined (metrics that must NOT degrade)
- [ ] Guardrail thresholds defined (how much degradation is acceptable: typically 0%)
- [ ] Guardrail metrics include at minimum:
  - [ ] Core product engagement (DAU, session length, or equivalent)
  - [ ] Revenue (if experiment touches monetization funnel)
  - [ ] Error rates / performance (page load, crash rate)
  - [ ] Customer satisfaction (NPS, CSAT, support ticket volume)
- [ ] Guardrail violation triggers automatic experiment pause

### 3.4 Instrumentation
- [ ] All metrics have tracking events implemented
- [ ] Tracking events verified in staging/QA environment
- [ ] Data pipeline latency is acceptable for experiment duration
- [ ] Dashboard or report is set up to monitor experiment

---

## SECTION 4: AUDIENCE AND TARGETING

### 4.1 Segment Definition
- [ ] Target audience clearly defined
- [ ] Inclusion criteria specified (who is in the experiment)
- [ ] Exclusion criteria specified (who is NOT in the experiment)
- [ ] New users vs existing users distinction made
- [ ] Geographic, device, and platform filters applied if relevant
- [ ] Segment size is sufficient for statistical significance

### 4.2 Segment Validation
- [ ] Segment represents a meaningful portion of the user base
- [ ] Segment behavior matches assumptions (verified with data)
- [ ] Results from this segment are generalizable (or limitation is documented)

---

## SECTION 5: RISK ASSESSMENT

### 5.1 User Impact
- [ ] Worst-case user experience scenario documented
- [ ] Rollback plan defined and tested
- [ ] Rollback can happen within 1 hour of decision
- [ ] User communication plan ready if experiment causes issues
- [ ] No experiment puts user data at risk

### 5.2 Business Impact
- [ ] Revenue impact estimated for worst-case scenario
- [ ] Brand risk assessed (does this experiment feel manipulative or dark-pattern?)
- [ ] Legal/compliance reviewed if experiment touches PII, pricing, or claims
- [ ] Support team briefed on potential customer-facing changes

### 5.3 Technical Risk
- [ ] Performance impact assessed (page load, API latency)
- [ ] Edge cases documented and handled
- [ ] Experiment code is isolated and removable
- [ ] No experiment introduces technical debt without a cleanup plan

---

## SECTION 6: GROWTH LOOP REVIEW

### 6.1 Loop Identification
- [ ] Growth loop type identified (viral, content, paid, product-led, sales-led)
- [ ] Each step in the loop is defined with expected conversion rate
- [ ] Loop cycle time estimated
- [ ] K-factor or equivalent calculated
- [ ] Loop input source identified

### 6.2 Loop Health
- [ ] Loop is net positive (output > input required to sustain)
- [ ] Loop is not dependent on a single channel
- [ ] Loop is measured end-to-end (not just individual steps)
- [ ] Decay rate estimated (will this loop weaken over time?)
- [ ] Saturation risk assessed (addressable market size vs loop reach)

### 6.3 Loop Optimization
- [ ] Bottleneck step in the loop identified (lowest conversion rate)
- [ ] Experiment targets the bottleneck step (not random step)
- [ ] Expected impact on overall loop efficiency calculated
- [ ] Cross-loop interactions considered (does optimizing one loop hurt another?)

---

## SECTION 7: GROWTH MODEL REVIEW

### 7.1 Model Construction
- [ ] Model is bottoms-up (built from channel-level data, not top-down)
- [ ] All assumptions are explicitly listed
- [ ] Each assumption has a confidence level (high/medium/low)
- [ ] Assumptions with low confidence are flagged for validation
- [ ] Model uses real cohort data where available
- [ ] Model is built in a shareable, auditable format

### 7.2 Model Validation
- [ ] Model back-tested against last 3 months of actuals
- [ ] Variance between model and actuals is <20%
- [ ] If variance >20%, root cause identified
- [ ] Sensitivity analysis completed (what if top 3 assumptions are 50% wrong?)
- [ ] Model scenarios defined: base, optimistic, pessimistic

### 7.3 Model Maintenance
- [ ] Model update cadence defined (monthly minimum)
- [ ] Responsible person assigned for model updates
- [ ] Actual data automatically feeds into model comparison
- [ ] Model version history maintained

---

## SECTION 8: SUSTAINABILITY CHECK

### 8.1 Channel Mix
- [ ] Organic % of acquisition documented
- [ ] Organic % trend documented (growing, flat, declining)
- [ ] No single paid channel accounts for >40% of acquisition
- [ ] CAC by channel documented and trending in acceptable range
- [ ] LTV:CAC ratio >3:1 (or path to >3:1 documented)

### 8.2 Payback Period
- [ ] CAC payback period calculated by channel
- [ ] Payback period <12 months for all channels (or justified)
- [ ] Blended payback period <6 months (or path documented)

### 8.3 Unsustainable Growth Flags
- [ ] Organic growth % is >20% (if not, UNSUSTAINABLE FLAG raised)
- [ ] Growth is not dependent on increasing paid spend
- [ ] Growth rate can be maintained if top paid channel goes away
- [ ] Brand search volume is growing (organic demand signal)

---

## SECTION 9: STRATEGY ALIGNMENT

### 9.1 Business Alignment
- [ ] Growth initiative aligns with current company strategy
- [ ] Initiative supports current quarter OKRs
- [ ] Initiative does not conflict with other team priorities
- [ ] Resource requirements are realistic given current capacity

### 9.2 Sequencing
- [ ] Prerequisites for this initiative are in place
- [ ] Dependencies on other teams are documented and agreed upon
- [ ] Timeline is realistic
- [ ] Initiative fits within the current experiment roadmap

---

## SECTION 10: POST-EXPERIMENT PLAN

### 10.1 Analysis Plan
- [ ] Who will analyze results is assigned
- [ ] Analysis will happen within 48 hours of experiment completion
- [ ] Segment-level analysis is planned (not just aggregate)
- [ ] Long-term impact will be tracked (not just during experiment window)

### 10.2 Decision Framework
- [ ] Decision criteria are pre-defined:
  - [ ] If primary metric improves by >= MDE with significance: SHIP
  - [ ] If primary metric is flat: LEARN and move on
  - [ ] If primary metric degrades: REVERT and document learning
  - [ ] If guardrail metric degrades: REVERT regardless of primary metric
- [ ] Decision-maker is identified

### 10.3 Documentation
- [ ] Experiment results will be documented in experiment log
- [ ] Learning will be shared with the team (even if negative)
- [ ] If shipped, experiment code will be cleaned up within 2 weeks
- [ ] If reverted, feature flag will be removed within 1 week

### 10.4 Follow-Up
- [ ] Next experiment based on learnings is identified
- [ ] Long-term metric tracking is set up (D30, D60, D90 impact)
- [ ] Growth model is updated with new data from experiment

---

## SIGN-OFF

```
Artifact: [Name]
Type: [Experiment / Model / Strategy / Channel / Loop]
Reviewer: [Name]
Date: [YYYY-MM-DD]

Sections Reviewed: [List numbers]
Items Passed: [Count]
Items Failed: [Count]
Items N/A: [Count]

All FAIL items resolved: [ ] Yes [ ] No

VERDICT:
[ ] APPROVED — Ship/launch/publish
[ ] CONDITIONAL — Ship with noted caveats
[ ] REJECTED — Fix issues and re-review

Reviewer Signature: _______________
Growth Lead Approval: _______________
```

---

## COMMON REJECTION REASONS

| Reason | Frequency | Fix |
|--------|-----------|-----|
| No pre-registered hypothesis | Very Common | Write hypothesis before building anything |
| No guardrail metrics | Common | Define what must NOT break before testing |
| Vanity metric as primary | Common | Replace with business-outcome metric |
| No power analysis | Common | Calculate sample size before launching |
| Missing rollback plan | Occasional | Define rollback steps and test them |
| Conflicting experiments | Occasional | Check experiment calendar before launching |
| Unsustainable channel mix | Periodic | Invest in organic before scaling paid |

---

**No growth artifact ships without a completed checklist.**
**Rigor is not bureaucracy. Rigor is respect for the user and the data.**

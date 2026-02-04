# Growth Score — Quality Enforcement (Authoritative)

This document defines how growth work is evaluated.
Every growth experiment, strategy, and model must be scored before it ships.

If growth is not measurable, it is not growth. It is guessing.

---

## SCORING RULES (MANDATORY)

Each growth artifact must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate rejection:
- **Hypothesis Quality**
- **Experiment Rigor**
- **Guardrail Metrics**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No experiment ships without pre-registered hypothesis
- No growth initiative runs without guardrail metrics defined

### Rejection Triggers (Automatic Fail)

- Experiment proposed without a falsifiable hypothesis = **REJECTED**
- Growth driven >80% by paid acquisition = **UNSUSTAINABLE FLAG** raised
- No guardrail metrics defined = **CANNOT SHIP EXPERIMENT**
- Vanity metric used as primary success metric = **REJECTED**
- Experiment runs longer than 4 weeks without interim analysis = **REVIEW REQUIRED**
- Growth model built on assumptions without validation data = **REJECTED**
- Retention not measured at D1/D7/D30/D90 = **INCOMPLETE**
- No control group defined = **REJECTED**

---

## 1. HYPOTHESIS QUALITY

**Question:**
Is the hypothesis falsifiable, specific, measurable, and learning-oriented?

### What a Good Hypothesis Looks Like

```
"If we [change X] for [audience Y], then [metric Z] will [improve by N%]
because [behavioral reason], measured over [time period]."
```

### What a Bad Hypothesis Looks Like

```
"If we improve the onboarding, more users will convert."
(Not specific. Not measurable. No behavioral rationale. No timeframe.)
```

### Scoring Guide

- **5** — Falsifiable, specific metric target, clear behavioral rationale, defined measurement window, identifies learning regardless of outcome
- **4** — Falsifiable and specific, minor gap in rationale or measurement plan
- **3** — Has a measurable target but lacks behavioral reasoning or is too vague to generate learning
- **2** — Vague direction without specific targets or falsifiability
- **1** — No hypothesis stated, or hypothesis is unfalsifiable ("users will like it")

### Evaluation Criteria

| Element | Required | Example |
|---------|----------|---------|
| Independent variable | Yes | "Adding social proof to pricing page" |
| Dependent variable | Yes | "Trial-to-paid conversion rate" |
| Magnitude | Yes | "Increase by 15%" |
| Audience | Yes | "New visitors from organic search" |
| Timeframe | Yes | "Over 2 weeks with n=5000" |
| Behavioral rationale | Yes | "Because users need validation before high-commitment actions" |
| Learning outcome | Yes | "If false, we learn pricing page trust is not the bottleneck" |

Score <4 = rewrite hypothesis before proceeding.

---

## 2. EXPERIMENT RIGOR

**Question:**
Is the experiment designed to produce statistically valid, actionable results?

### Scoring Guide

- **5** — Power analysis completed, sample size calculated, randomization verified, guardrail metrics set, pre-registered hypothesis, interim analysis plan defined, novelty effects accounted for
- **4** — Strong design with minor gaps (e.g., no interim analysis plan but everything else solid)
- **3** — Basic A/B test setup but missing power analysis or has contamination risks
- **2** — Test running but no statistical rigor (e.g., peeking at results daily, no sample size calc)
- **1** — No experimental design. Just shipped a change and hoped for the best

### Required Elements

| Element | Description | Non-Negotiable |
|---------|-------------|----------------|
| Power analysis | Minimum sample size to detect expected effect | Yes |
| Randomization | Users randomly assigned to variants | Yes |
| Guardrail metrics | Metrics that must NOT degrade | Yes |
| Pre-registration | Hypothesis documented before experiment starts | Yes |
| Duration estimate | How long to reach statistical significance | Yes |
| Segmentation plan | Which segments to analyze post-hoc | Recommended |
| Novelty adjustment | Account for novelty effects in new features | Recommended |
| Interaction check | Ensure no conflicting experiments running | Yes |

### Common Experiment Failures

| Failure | Description | Severity |
|---------|-------------|----------|
| Peeking | Checking results before reaching sample size | Critical |
| Contamination | Control group exposed to treatment | Critical |
| Simpson's paradox | Aggregate result hides segment-level truth | High |
| Novelty effect | Short-term lift that fades | High |
| Multiple testing | Running many variants without correction | Medium |
| Selection bias | Non-random assignment to variants | Critical |
| Survivor bias | Only measuring users who stayed | High |

Score <3 = redesign experiment before launch.

---

## 3. GROWTH MODEL ACCURACY

**Question:**
Does the bottoms-up growth model validate against actual data?

### Scoring Guide

- **5** — Model built from real cohort data, validated against 3+ months of actuals, variance <10%, assumptions explicitly stated and tested, sensitivity analysis completed
- **4** — Model built from real data, variance <20%, most assumptions validated
- **3** — Model uses mix of real data and assumptions, variance <30%, some assumptions untested
- **2** — Model is primarily assumption-based, limited validation against actuals
- **1** — No model, or model is pure fiction (hockey stick with no supporting data)

### Model Components (Required)

| Component | Description | Validation Method |
|-----------|-------------|-------------------|
| Acquisition channels | Source, volume, cost per channel | Compare to last 90 days actuals |
| Activation rate | % who reach activation milestone | Measure from cohort data |
| Retention curves | D1/D7/D30/D90 by cohort | Plot actual cohort curves |
| Monetization rate | % who convert to paid | Calculate from billing data |
| Revenue per user | ARPU by segment | Derive from actual revenue |
| Viral coefficient | K-factor from referral data | Measure actual invite-to-signup |
| Payback period | Time to recover CAC | Calculate from cohort revenue |

### Model Validation Protocol

1. Build model from real data (not assumptions)
2. Compare model predictions to last 3 months of actuals
3. If variance >20%, identify which assumptions are wrong
4. Stress test: what happens if top assumption is 50% wrong?
5. Document all assumptions with confidence levels (high/medium/low)
6. Update model monthly with actual data

Score <3 = rebuild model with real data before making decisions.

---

## 4. ACTIVATION DEPTH

**Question:**
Has the aha moment been identified, validated, and optimized for time-to-value?

### Scoring Guide

- **5** — Aha moment empirically validated (users who reach it retain 2x+), time-to-value measured and optimized, activation funnel instrumented with <5% drop-off at each step, personalized activation paths by segment
- **4** — Aha moment identified and correlated with retention, time-to-value under target, funnel instrumented
- **3** — Aha moment hypothesized but not empirically validated, basic funnel tracking in place
- **2** — Activation defined as "signed up" with no deeper analysis
- **1** — No activation milestone defined, no funnel instrumentation

### Activation Funnel Requirements

| Stage | Definition | Measurement |
|-------|-----------|-------------|
| Signup | Account created | Count, conversion from visit |
| Setup | Core configuration completed | % of signups, time to complete |
| Aha moment | First value experienced | % of setups, time to reach |
| Habit | Returned and repeated value action | % of aha, frequency |
| Conversion | Upgraded to paid (if freemium) | % of habit, time to convert |

### Aha Moment Validation Criteria

The aha moment is validated when:
1. Users who reach it retain at 2x+ the rate of those who do not
2. The correlation holds across multiple cohorts
3. The correlation holds across user segments
4. Moving users to aha moment faster improves overall retention
5. The aha moment can be reached within the first session

### Time-to-Value Targets

| Product Type | Target Time-to-Value | Acceptable |
|-------------|---------------------|------------|
| Consumer app | <2 minutes | <5 minutes |
| SMB SaaS | <15 minutes | <1 hour |
| Enterprise SaaS | <1 day | <1 week |
| Marketplace | <5 minutes (first browse) | <15 minutes |

Score <3 = activation is undefined. Must identify and validate aha moment.

---

## 5. RETENTION IMPACT

**Question:**
Are cohort retention curves improving over time?

### Scoring Guide

- **5** — D30 retention improving quarter-over-quarter, flattening point identified and rising, retention by segment analyzed, leading indicators of churn identified and actioned, smile curve visible in recent cohorts
- **4** — D30 retention stable or improving, cohort analysis regular, churn reasons documented
- **3** — Retention measured but flat or declining slightly, limited cohort analysis
- **2** — Only aggregate retention tracked (no cohort view), no trend analysis
- **1** — Retention not measured, or measured incorrectly (e.g., counting DAU without cohort)

### Retention Measurement Requirements

| Metric | Frequency | Segmentation |
|--------|-----------|-------------|
| D1 retention | Weekly cohorts | By acquisition channel, by plan |
| D7 retention | Weekly cohorts | By acquisition channel, by plan |
| D30 retention | Monthly cohorts | By acquisition channel, by plan, by activation status |
| D90 retention | Monthly cohorts | By acquisition channel, by plan, by activation status |
| Resurrection rate | Monthly | By dormancy duration |

### Retention Curve Analysis

| Pattern | Meaning | Action |
|---------|---------|--------|
| Curve flattens above 20% | Healthy product-market fit signal | Optimize the flat portion upward |
| Curve flattens below 10% | Weak retention, likely PMF issue | Revisit activation and core value prop |
| Curve never flattens | Leaky bucket, no habit formed | Stop growth spending, fix retention first |
| Smile curve (uptick) | Users returning after dormancy | Investigate and amplify resurrection triggers |
| Recent cohorts above older | Product improving | Document what changed and double down |
| Recent cohorts below older | Product degrading | Urgent: find what broke |

### Retention Benchmarks by Category

| Category | Good D30 | Great D30 | Elite D30 |
|----------|----------|-----------|-----------|
| Consumer social | 25% | 40% | 60%+ |
| Consumer SaaS | 30% | 45% | 60%+ |
| SMB SaaS | 60% | 75% | 85%+ |
| Enterprise SaaS | 80% | 90% | 95%+ |
| Marketplace | 20% | 35% | 50%+ |
| Gaming (casual) | 10% | 20% | 35%+ |

Score <3 = retention is a crisis. All growth spending paused until addressed.

---

## 6. LOOP EFFICIENCY

**Question:**
Are growth loops functioning and measurable?

### Scoring Guide

- **5** — Viral coefficient (K) >0.5, loop completion rate >15%, multiple loops active and measured independently, compounding effect visible in acquisition data, loop speed (cycle time) measured and optimized
- **4** — K >0.3, at least one loop functioning with clear measurement, loop cycle time known
- **3** — One loop in place but K <0.3, limited measurement of loop components
- **2** — Growth is linear (no loops), relies entirely on direct acquisition
- **1** — No loops identified or attempted, all growth is paid/manual

### Loop Types and Metrics

| Loop Type | Key Metric | Good | Great |
|-----------|-----------|------|-------|
| Viral (invite) | K-factor | 0.3 | 0.7+ |
| Content (SEO/UGC) | Organic traffic growth rate | 10% MoM | 25% MoM |
| Paid (profitable) | ROAS after 90 days | 1.5x | 3x+ |
| Sales-led | Pipeline-to-close rate | 15% | 30%+ |
| Product-led | Free-to-paid conversion | 3% | 7%+ |

### Loop Health Assessment

For each active loop, measure:

1. **Input** — What enters the loop (users, content, revenue)
2. **Steps** — Each step in the loop with conversion rate
3. **Output** — What the loop produces (new users, new content, new revenue)
4. **Cycle time** — How long one loop iteration takes
5. **Decay** — Is the loop strengthening or weakening over time?
6. **Saturation** — Is the addressable audience shrinking?

### Loop Failure Signals

| Signal | Meaning | Action |
|--------|---------|--------|
| K declining month-over-month | Loop is decaying | Diagnose: saturation, product, or incentive problem |
| Cycle time increasing | Loop is slowing | Remove friction in loop steps |
| Output quality declining | Loop producing lower-value users | Tighten loop targeting |
| Single-loop dependency | All growth from one loop | Build a second loop urgently |

Score <3 = no functioning loops. Growth is linear and will stall.

---

## 7. SUSTAINABLE VS UNSUSTAINABLE GROWTH

**Question:**
Is the organic percentage of growth increasing over time?

### Scoring Guide

- **5** — Organic >60% of new users, organic % growing quarter-over-quarter, paid channels profitable with payback <6 months, brand-driven acquisition measurable and growing
- **4** — Organic 40-60%, organic % stable or growing, paid channels near profitable
- **3** — Organic 20-40%, organic % flat, paid channels subsidize most growth
- **2** — Organic <20%, most growth paid, unclear path to organic dominance
- **1** — >80% paid acquisition, no organic growth engine, unsustainable

### Sustainability Assessment

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Organic % of new users | >50% | 20-50% | <20% |
| CAC payback period | <6 months | 6-12 months | >12 months |
| LTV:CAC ratio | >3:1 | 1.5-3:1 | <1.5:1 |
| Paid channel dependency | No single channel >40% | One channel 40-60% | One channel >60% |
| Brand search growth | Growing | Flat | Declining |

### UNSUSTAINABLE FLAG Protocol

When organic growth is <20% of total:

1. **Flag raised** — All growth reports must include this flag
2. **90-day plan required** — Must present plan to grow organic to >30%
3. **Paid spend capped** — No increase in paid budget until organic improves
4. **Weekly review** — Organic % tracked weekly and reported to leadership
5. **Root cause analysis** — Why is organic not growing? Product, content, or distribution problem?

### Channel Mix Health

| Channel Type | Role | Max Dependency |
|-------------|------|---------------|
| Paid search | Demand capture | 30% of total |
| Paid social | Demand generation | 20% of total |
| Organic search | Sustainable acquisition | No max (more is better) |
| Referral/viral | Sustainable acquisition | No max (more is better) |
| Content/SEO | Sustainable acquisition | No max (more is better) |
| Direct/brand | Brand strength indicator | No max (more is better) |
| Partnerships | Leverage acquisition | 20% of total |

Score <3 = growth is unsustainable. Organic investment required immediately.

---

## 8. VELOCITY

**Question:**
Is the growth team running enough experiments at a fast enough learning rate?

### Scoring Guide

- **5** — 3+ experiments per week shipping, average learning cycle <2 weeks, 70%+ of experiments produce clear learnings (even if negative), experiment backlog prioritized by expected impact x confidence, team shipping experiments without bottlenecks
- **4** — 2-3 experiments per week, learning cycle <3 weeks, 60%+ produce learnings
- **3** — 1-2 experiments per week, learning cycle 3-4 weeks, some experiments inconclusive
- **2** — <1 experiment per week, learning cycle >4 weeks, most experiments inconclusive
- **1** — No regular experimentation cadence, ad-hoc changes with no measurement

### Velocity Metrics

| Metric | Target | Acceptable | Below Standard |
|--------|--------|------------|----------------|
| Experiments per week | 3+ | 2 | <1 |
| Learning cycle (idea to learning) | <2 weeks | 2-3 weeks | >4 weeks |
| Win rate (experiments that hit target) | 20-30% | 15-20% | <10% or >50%* |
| Learning rate (experiments producing insight) | >70% | 50-70% | <50% |
| Backlog depth | 4+ weeks of experiments | 2-4 weeks | <2 weeks |

*Win rate >50% suggests experiments are too safe and not pushing boundaries.

### Experiment Prioritization Framework

Score each experiment candidate on:

| Factor | Weight | Scale |
|--------|--------|-------|
| Expected impact on primary metric | 40% | 1-10 |
| Confidence in hypothesis | 30% | 1-10 |
| Ease of implementation | 20% | 1-10 |
| Learning value (even if fails) | 10% | 1-10 |

Priority Score = (Impact x 0.4) + (Confidence x 0.3) + (Ease x 0.2) + (Learning x 0.1)

### Velocity Blockers

| Blocker | Impact | Fix |
|---------|--------|-----|
| Engineering bottleneck | Experiments delayed by dev capacity | Feature flags, no-code tools, dedicated growth eng |
| Analysis bottleneck | Results not analyzed for weeks | Automated dashboards, pre-built analysis templates |
| Decision bottleneck | No one calls experiments done | Pre-registered stopping criteria, auto-stop rules |
| Idea bottleneck | Backlog is empty | Monthly ideation sessions, customer research pipeline |
| QA bottleneck | Experiments stuck in QA | Automated testing for experiments, staged rollouts |

Score <3 = growth team is too slow. Diagnose bottleneck and fix within 2 weeks.

---

## SCORING SUMMARY TEMPLATE

```
## Growth Score Report — [Project/Initiative Name]
## Date: [YYYY-MM-DD]
## Evaluator: [Name]

| # | Dimension | Score (1-5) | Notes |
|---|-----------|-------------|-------|
| 1 | Hypothesis Quality | _ | |
| 2 | Experiment Rigor | _ | |
| 3 | Growth Model Accuracy | _ | |
| 4 | Activation Depth | _ | |
| 5 | Retention Impact | _ | |
| 6 | Loop Efficiency | _ | |
| 7 | Sustainable vs Unsustainable | _ | |
| 8 | Velocity | _ | |

**Average Score:** _
**Hard Fail Triggered:** Yes/No
**Rejection Triggers Hit:** [List any]

### Verdict
- [ ] PASS — Average >= 4.0, no hard fails
- [ ] CONDITIONAL PASS — Average >= 3.5, action items required
- [ ] FAIL — Average < 3.5 or hard fail triggered

### Required Actions
1. [Action item]
2. [Action item]

### Next Review Date: [YYYY-MM-DD]
```

---

## ESCALATION PROTOCOL

| Condition | Action |
|-----------|--------|
| Any dimension scores 1 | Immediate review with growth lead |
| Average score <3.0 | Growth strategy paused for reassessment |
| 3+ experiments in a row produce no learning | Process review required |
| Unsustainable flag raised for 2+ quarters | Exec-level growth strategy review |
| Retention declining for 3+ consecutive cohorts | All growth spending paused |

---

## QUARTERLY CALIBRATION

Every quarter, the Growth Score system itself must be calibrated:

1. Review all experiments from the quarter
2. Did the scoring predict actual outcomes?
3. Adjust benchmarks based on company stage and industry
4. Update experiment velocity targets based on team capacity
5. Archive learnings to growth knowledge base

---

**This scoring system is authoritative. No growth work ships without passing.**
**Growth without measurement is not growth. It is spending.**

# Experimentation — A/B Testing, Geo-Lift, Holdouts, and Bayesian Methods

## The Experimentation Imperative

Marketing without experimentation is guessing with a budget. Experimentation
provides the causal evidence that separates "we think this works" from "we know
this works." The difference is material: organizations with formal experimentation
programs achieve 30-40% higher marketing ROI (Harvard Business Review) because
they systematically eliminate waste and amplify what works.

B2B experimentation is harder than B2C because of smaller sample sizes, longer
conversion cycles, and complex buyer journeys. This module provides frameworks
specifically adapted for B2B marketing experimentation.

---

## A/B Testing for Marketing

### A/B Testing Fundamentals

An A/B test (split test) compares two or more variants of a marketing element to
determine which performs better against a defined metric.

**The A/B Testing Process:**

```
Hypothesis → Design → Run → Analyze → Implement → Document
```

**Step 1: Form a Hypothesis**
"Changing [element] from [current] to [proposed] will increase [metric] by [amount]
because [rationale]."

**Step 2: Design the Test**
- Control (A): Current version
- Treatment (B): Modified version
- One variable at a time (unless running multivariate)
- Define primary metric and guardrail metrics
- Calculate required sample size

**Step 3: Calculate Sample Size**

```
Sample Size per Variant = (Z_alpha + Z_beta)^2 x 2 x p(1-p) / delta^2

Where:
  Z_alpha = 1.96 (for 95% confidence)
  Z_beta = 0.84 (for 80% power)
  p = baseline conversion rate
  delta = minimum detectable effect (MDE)
```

**Example:**
```
Baseline conversion rate: 5%
Minimum detectable effect: 20% relative lift (5% → 6%)
Required sample per variant: ~14,700
Total sample needed: ~29,400

At 500 visitors/day: test duration = ~59 days
```

### What to Test in B2B Marketing

| Element | Location | Typical MDE | Test Duration |
|---------|----------|-------------|---------------|
| Email subject line | Marketing emails | 10-30% open rate lift | 1-2 sends (1,000+ recipients) |
| Landing page headline | Campaign landing pages | 10-25% CVR lift | 2-4 weeks |
| CTA button text | Website, landing pages | 5-15% click lift | 2-4 weeks |
| Ad creative | LinkedIn, Google, Meta | 10-30% CTR lift | 1-3 weeks |
| Form length | Lead capture forms | 10-40% completion lift | 2-4 weeks |
| Pricing page layout | Pricing page | 5-20% request lift | 4-8 weeks |
| Nurture email sequence | Email automation | 5-15% conversion lift | 4-8 weeks |
| Webinar timing | Event marketing | 10-30% attendance lift | 2-4 events |

### A/B Testing Anti-Patterns

**Anti-Pattern 1: Peeking**
Checking results daily and stopping when you see a "winner." This inflates false
positive rates dramatically (from 5% to 30%+). Wait until the pre-determined
sample size is reached before evaluating.

**Anti-Pattern 2: Too Many Variants**
Testing A/B/C/D/E splits your sample five ways, requiring 5x the traffic for the
same statistical power. Stick to 2-3 variants maximum.

**Anti-Pattern 3: Testing Trivial Changes**
Testing button color (red vs. blue) rarely produces meaningful lift. Test
substantive changes: headline messaging, value proposition framing, offer structure.

**Anti-Pattern 4: Ignoring Guardrail Metrics**
A headline change that increases CTR by 50% but decreases conversion quality by 40%
is a net negative. Always track downstream metrics alongside the primary test metric.

**Anti-Pattern 5: Not Documenting Results**
Every test should be logged with hypothesis, design, results, and learnings —
regardless of outcome. Negative results prevent future waste.

---

## Geo-Lift Testing

### What Is Geo-Lift?

Geo-lift testing divides geographic markets into test and control groups to measure
the incremental impact of marketing spend. It is the gold standard for measuring
channel-level incrementality because it controls for confounding variables that
individual-level attribution cannot.

### Geo-Lift Design

**Step 1: Market Selection**
Select test and control markets that are:
- Similar in size, demographics, and conversion patterns
- Independent (marketing in one does not spill over to the other)
- Large enough to generate meaningful signal

**Step 2: Pre-Test Measurement**
Measure the target metric (pipeline, demos, revenue) in all markets for 4-8 weeks
before the test to establish baseline patterns and confirm similarity.

**Step 3: Test Execution**
- Test markets: Activate the marketing treatment (increase spend, launch campaign)
- Control markets: Maintain current spend levels (no treatment)
- Duration: Minimum 4 weeks, ideally 8-12 weeks

**Step 4: Analysis**
```
Incremental Lift = (Test Market Outcome - Control Market Outcome) /
                    Control Market Outcome x 100%

Incremental ROAS = Incremental Outcome / Incremental Spend
```

### Geo-Lift Example

```
Test Markets (5 DMAs): LinkedIn ads + programmatic display
Control Markets (5 DMAs): No additional spend

Pre-Test (4 weeks):
  Test market avg. demos/week:    25
  Control market avg. demos/week: 24  (comparable baseline)

During Test (8 weeks):
  Test market avg. demos/week:    35  (+10 incremental)
  Control market avg. demos/week: 25  (flat = no spill-over)

  Incremental demos per week: 10
  Total incremental demos (8 weeks): 80
  Total incremental spend: $120K
  Cost per incremental demo: $1,500
  Incremental pipeline (at $50K avg deal): $4M
  Incremental ROAS: $4M / $120K = 33x (pipeline)
```

---

## Holdout Methodology

### What Is a Holdout Test?

A holdout test withholds a percentage of your audience from a marketing treatment
to measure its incremental impact. Unlike geo-lift (which splits by geography),
holdouts split at the individual level.

### Holdout Design

**Approach 1: Random Holdout**
Randomly exclude 10-20% of your target audience from seeing ads. Compare conversion
rates between exposed and holdout groups.

**Approach 2: Customer List Holdout**
For email or CRM-based campaigns, randomly exclude a portion of the list from
the campaign. Measure outcome differences.

**Approach 3: Retargeting Holdout**
Exclude a random percentage of website visitors from retargeting ads. Compare
conversion rates of retargeted vs. non-retargeted visitors.

### Holdout Calculations

```
Exposed Group Conversion Rate:    4.2%
Holdout Group Conversion Rate:    3.5%
Incremental Lift:                 (4.2% - 3.5%) / 3.5% = 20%

Without the campaign, 3.5% would have converted anyway.
Only 20% of the observed conversions are truly incremental.
```

### When to Use Holdouts

| Scenario | Recommended? | Why |
|----------|-------------|-----|
| Retargeting campaigns | Yes | Retargeting often claims credit for conversions that would have happened anyway |
| Email nurture sequences | Yes | Easy to implement, clear measurement |
| LinkedIn brand campaigns | Yes | Helps measure brand lift vs. conversion |
| Paid search brand keywords | Yes | Tests whether brand clicks are incremental or organic redirect |
| Major channel investment | Yes (geo-lift preferred) | Before committing large budget to a channel |

---

## Bayesian Methods for Marketing

### Why Bayesian for B2B?

Traditional frequentist A/B testing requires large sample sizes to reach
statistical significance. B2B marketers often do not have the luxury of 50,000
visitors to split between variants. Bayesian methods provide an alternative that:

- Works with smaller sample sizes
- Provides probability statements ("there is a 92% chance B is better than A")
  instead of binary significant/not-significant
- Allows continuous monitoring without the "peeking problem"
- Incorporates prior knowledge (useful when you have historical data)

### Bayesian A/B Testing Framework

**Step 1: Define Prior**
Based on historical data, what do you believe the conversion rate to be?
If baseline conversion is 5% with moderate confidence, use a Beta(5, 95) prior.

**Step 2: Collect Data**
As data comes in, update the posterior distribution:
```
Posterior = Prior x Likelihood
Beta(a + successes, b + failures)
```

**Step 3: Calculate Probability of Winning**
Instead of p-values, calculate:
- P(B > A): Probability that variant B is better than A
- Expected Loss: If you choose B, how much could you lose if A was actually better?
- Lift Distribution: The range of likely lift values

**Decision Criteria:**
- If P(B > A) > 95% AND Expected Loss < $X, deploy B
- If P(B > A) < 50% after sufficient data, deploy A (B is likely worse)
- If 50% < P(B > A) < 95%, continue collecting data

### Bayesian vs. Frequentist

| Dimension | Frequentist | Bayesian |
|-----------|-----------|---------|
| Result | "Reject null" or "Fail to reject" | "92% probability B is better" |
| Sample Size | Must be pre-determined | Can monitor continuously |
| Decision Rule | p < 0.05 | P(B > A) > 95% AND expected loss < threshold |
| Prior Information | Not used | Can incorporate historical data |
| Communication | "Statistically significant" (confusing) | "92% chance of improvement" (intuitive) |
| Risk Quantification | Binary | Continuous (expected loss in dollars) |

---

## Experimentation Program Design

### Building an Experimentation Culture

**Quarterly Experimentation Roadmap:**
| Quarter | Focus Area | Number of Tests | Expected Learning |
|---------|-----------|----------------|-------------------|
| Q1 | Landing page optimization | 4-6 tests | CVR improvement, best messaging |
| Q2 | Email sequence optimization | 4-6 tests | Engagement improvement, best cadence |
| Q3 | Channel incrementality | 2-3 geo-lifts | True channel contribution |
| Q4 | Pricing/packaging | 2-3 tests | Optimal pricing presentation |

### Test Documentation Template

| Field | Content |
|-------|---------|
| Test Name | [Descriptive name] |
| Hypothesis | [If we change X, Y will increase by Z because...] |
| Primary Metric | [The one metric this test measures] |
| Guardrail Metrics | [Metrics that must not degrade] |
| Test Type | [A/B, geo-lift, holdout, multivariate] |
| Sample Size | [Required per variant] |
| Duration | [Estimated run time] |
| Start Date | [Date] |
| End Date | [Date] |
| Result | [Winner, loser, inconclusive] |
| Statistical Confidence | [% or p-value] |
| Lift Observed | [Absolute and relative] |
| Learnings | [What did we learn?] |
| Next Steps | [Implement, iterate, or abandon] |

---

## Experimentation Metrics

| Metric | Target | Calculation |
|--------|--------|------------|
| Test Velocity | 2-4 tests/month | Tests launched per month |
| Win Rate | 30-40% | Tests with statistically significant positive lift |
| Average Lift (Winners) | 10-25% | Average improvement from winning tests |
| Cumulative Impact | Growing | Total revenue/pipeline impact from test wins |
| Learning Velocity | Increasing | Insights documented per quarter |
| Implementation Rate | >80% | % of winning tests deployed to production |

---

**Experimentation is the engine of marketing improvement. Every test — win or lose —
reduces uncertainty and moves the organization closer to optimal performance.
The only failed test is one that was never run or never documented.**

# Experimentation Science -- Statistical Foundations for Growth

## The Scientific Method Applied to Growth

### Why Experimentation is Non-Negotiable

Growth without experimentation is guesswork with a budget. The history of
growth is littered with confident teams who scaled the wrong thing because
they skipped validation. Experimentation is the mechanism by which growth
teams convert opinions into evidence.

Andrew Chen: "The best growth teams do not have better ideas. They have
better systems for testing ideas."

### The Growth Experiment Lifecycle

```
1. OBSERVE    → Identify anomaly or opportunity in data
2. HYPOTHESIZE → Formulate a testable prediction
3. DESIGN     → Define test parameters, sample size, duration
4. IMPLEMENT  → Build variants, configure targeting, launch
5. COLLECT    → Gather data for the pre-specified duration
6. ANALYZE    → Apply statistical tests to determine significance
7. DECIDE     → Ship, iterate, or kill based on evidence
8. DOCUMENT   → Record hypothesis, result, and learning
```

Every step is mandatory. Skipping the hypothesis step is the most common
failure: teams run "tests" without a clear prediction, then retrofit
narratives to whatever result they observe.

---

## Hypothesis Formation

### The Hypothesis Template

A well-formed growth hypothesis contains:

```
IF we [change/intervention]
FOR [user segment]
THEN [measurable outcome] will [increase/decrease] by [amount]
BECAUSE [behavioral mechanism/reasoning]
```

Example:
```
IF we add a progress bar to the onboarding flow
FOR new users who signed up via organic search
THEN activation rate will increase by 5 percentage points
BECAUSE progress indicators exploit the goal gradient effect
(Kivetz, Urminsky, Zheng 2006), increasing completion motivation
as users perceive proximity to the finish.
```

### Hypothesis Quality Criteria

| Criterion | Description | Example |
|-----------|-------------|---------|
| Specific | Names the exact change | "Add progress bar" not "improve onboarding" |
| Measurable | Quantifies expected effect | "5pp increase" not "improvement" |
| Falsifiable | Can be proven wrong | Clear success/failure criteria |
| Causal | States the mechanism | "Because goal gradient effect" |
| Actionable | Can be built and tested | Within engineering capacity |

### The ICE Prioritization Framework

Score each hypothesis 1-10 on three dimensions:

- **Impact**: How large is the potential effect on the North Star Metric?
- **Confidence**: How confident are we in the hypothesis (data, precedent)?
- **Ease**: How quickly and cheaply can we test this?

```
ICE Score = Impact x Confidence x Ease
Maximum possible: 1000 (10 x 10 x 10)
Minimum viable for testing: 300+ (indicates reasonable bets)
```

Alternative: RICE (Reach x Impact x Confidence / Effort) adds audience size
but is more complex. Use ICE for speed; RICE for precision.

---

## Statistical Foundations

### Frequentist vs Bayesian

**Frequentist approach**:
- Defines a null hypothesis (H0: no difference between variants)
- Calculates p-value: probability of observing the data if H0 is true
- Rejects H0 if p < alpha (typically 0.05)
- Reports confidence intervals
- Requires fixed sample size determined before the test

**Bayesian approach**:
- Starts with a prior belief about the effect size
- Updates the prior with observed data to produce a posterior distribution
- Reports the probability that one variant beats another
- Can be evaluated continuously (no peeking problem)
- Requires specification of priors

### When to Use Each

| Situation | Recommended | Reason |
|-----------|-------------|--------|
| Large sample, clear hypothesis | Frequentist | Well-established, simple |
| Small sample, strong priors | Bayesian | Incorporates prior knowledge |
| Need to stop early | Bayesian | No peeking problem |
| Regulatory/compliance context | Frequentist | More widely accepted |
| Multiple variants | Bayesian | Handles naturally |
| Fast iteration | Bayesian | Continuous evaluation |

### Key Statistical Concepts

**Type I Error (False Positive)**: Declaring a winner when there is no real
difference. Controlled by alpha (significance level). At alpha = 0.05, there
is a 5% chance of a false positive.

**Type II Error (False Negative)**: Missing a real effect. Controlled by power
(1 - beta). At power = 0.80, there is a 20% chance of missing a real effect.

**Minimum Detectable Effect (MDE)**: The smallest effect size the experiment
is designed to detect. Smaller MDE requires larger sample size.

The relationship:
```
n = (Z_alpha/2 + Z_beta)^2 x 2 x sigma^2 / delta^2

Where:
  n = sample size per variant
  Z_alpha/2 = 1.96 for alpha = 0.05 (two-tailed)
  Z_beta = 0.84 for power = 0.80
  sigma^2 = variance of the metric
  delta = MDE (absolute difference to detect)

Simplified for proportions:
  n = 16 x p x (1-p) / delta^2

  (For 80% power, alpha = 0.05, two variants)
```

Example: Detecting a 2pp lift in a 10% conversion rate:
```
n = 16 x 0.10 x 0.90 / 0.02^2 = 16 x 0.09 / 0.0004 = 3,600 per variant
```

---

## Test Design Methodologies

### A/B Testing (Randomized Controlled Experiment)

The gold standard. Users are randomly assigned to control (A) or treatment (B).
Random assignment eliminates confounders.

Design parameters:
- **Traffic split**: Typically 50/50 for fastest results, but can use 90/10
  for risky changes (limits blast radius)
- **Duration**: Determined by sample size calculation and traffic volume
  Minimum: 1 full business cycle (7 days for most products)
- **Primary metric**: One metric for the decision; secondary metrics for learning
- **Guardrail metrics**: Metrics that must not degrade (e.g., load time, error rate)

### A/B/n Testing (Multiple Variants)

Testing 3+ variants simultaneously. Increases the chance of finding a winner
but requires Bonferroni correction or similar adjustment to maintain overall
significance level:

```
Adjusted alpha = alpha / number of comparisons
For 3 variants (3 pairwise comparisons): alpha = 0.05/3 = 0.0167
```

This means each comparison needs to reach p < 0.0167 instead of p < 0.05.

### Multivariate Testing (MVT)

Tests multiple factors simultaneously using factorial design. If testing
headline (2 variants) and CTA button (3 variants), a full factorial design
has 2 x 3 = 6 cells.

Advantages: Detects interaction effects between factors.
Disadvantages: Requires much larger sample sizes (n per cell, not per variant).

Use MVT only when:
- Traffic is abundant (>100K users per week)
- Interaction effects are hypothesized
- Factors are independent

### Quasi-Experimental Methods

When randomization is impossible (pricing changes, infrastructure changes):

**Difference-in-Differences (DiD)**:
Compare the change in outcome for the treatment group minus the change in
outcome for a comparable control group.
```
Effect = (Treatment_After - Treatment_Before) - (Control_After - Control_Before)
```

**Regression Discontinuity Design (RDD)**:
When treatment is assigned based on a threshold (e.g., users above a score).
Compare users just above and just below the threshold.

**Interrupted Time Series (ITS)**:
When no control group exists. Model the pre-intervention trend and compare
to post-intervention observations.

**Propensity Score Matching**:
Match treated and untreated units based on observable characteristics to
create a pseudo-control group. Requires strong assumptions about selection.

---

## Common Statistical Pitfalls

### Peeking (The Most Dangerous Pitfall)

Checking results before the pre-specified sample size is reached and stopping
early when results look significant. This inflates the false positive rate
dramatically.

If you check a test at 5 points during its run at alpha = 0.05:
Actual false positive rate: ~14% (not 5%)

Solutions:
1. Pre-register the analysis plan and sample size
2. Use sequential testing methods (alpha-spending functions)
3. Use Bayesian methods that allow continuous evaluation
4. Lock yourself out of dashboards until the test is complete (extreme)

### Multiple Comparisons Problem

Testing multiple metrics increases the chance of finding at least one
"significant" result by chance.

```
P(at least one false positive) = 1 - (1 - alpha)^k

Where k = number of comparisons
For k=20 metrics at alpha=0.05: P = 1 - 0.95^20 = 64%
```

Solutions:
1. Bonferroni correction: alpha_adjusted = alpha / k
2. Benjamini-Hochberg procedure (controls false discovery rate)
3. Designate ONE primary metric for the decision; all others are exploratory

### Simpson's Paradox

A trend that appears in aggregate data reverses when the data is split by
a confounding variable. Example: a test appears to win overall, but loses
in every segment. This happens when the test shifts the mix of segments.

Solution: Always analyze by segment in addition to aggregate. If segment
results contradict the aggregate, investigate the confound.

### Novelty and Primacy Effects

**Novelty effect**: Users engage more with something new simply because it
is new. The effect wears off over time.

**Primacy effect**: Existing users prefer the familiar. The effect wears off
as users adapt.

Solutions:
1. Run tests for at least 2-4 weeks to let effects stabilize
2. Analyze only new users (not exposed to the old experience)
3. Use holdout groups to measure long-term impact

### Survivorship Bias

Analyzing only users who remained active ignores those who churned. This
biases results toward users who were already predisposed to succeed.

Solution: Always use intent-to-treat analysis (include all users assigned
to the experiment, regardless of whether they completed it).

---

## Advanced Experimental Techniques

### Sequential Testing

Allow early stopping while controlling the false positive rate using
alpha-spending functions (Lan-DeMets, O'Brien-Fleming boundaries).

The idea: "spend" the total alpha across multiple analysis points.
O'Brien-Fleming: stringent early, lenient later.
Pocock: equal spending at each analysis.

### Bayesian A/B Testing

```
Prior: theta ~ Beta(alpha_prior, beta_prior)
Likelihood: X | theta ~ Binomial(n, theta)
Posterior: theta | X ~ Beta(alpha_prior + successes, beta_prior + failures)

Decision: P(theta_B > theta_A | data) > threshold (typically 0.95)
```

Advantages:
- Natural interpretation: "95% probability B is better than A"
- No peeking problem (can evaluate continuously)
- Incorporates prior knowledge
- Handles small samples better

### Multi-Armed Bandits

Adaptive allocation of traffic to maximize cumulative reward:

```
Epsilon-Greedy:
  With probability epsilon: explore (random variant)
  With probability 1-epsilon: exploit (best variant so far)

Thompson Sampling:
  For each variant, sample from its posterior distribution
  Assign the next user to the variant with the highest sample
  Update posteriors with observed outcome
```

Use bandits when:
- Optimization matters more than measurement
- The opportunity cost of sending traffic to a loser is high
- You want to maximize cumulative conversions, not just learn

Do not use bandits when:
- You need a clean causal estimate of the effect
- You plan to report the result externally
- The effect size is small relative to noise

---

## Experiment Documentation Standard

Every experiment must be documented with:

```
## Experiment: [Name]
Date: [Start - End]
Owner: [Name]
Status: [Running / Complete / Killed]

### Hypothesis
IF [change] FOR [segment] THEN [metric] will [direction] by [amount]
BECAUSE [mechanism]

### Design
- Type: [A/B / A/B/n / MVT / Quasi]
- Primary metric: [metric name]
- Secondary metrics: [list]
- Guardrail metrics: [list]
- Traffic split: [ratio]
- Sample size: [n per variant]
- MDE: [minimum detectable effect]
- Duration: [days]

### Results
- Primary metric: Control [X%] vs Treatment [Y%], delta [Z%], p=[value]
- Confidence interval: [lower, upper]
- Secondary metrics: [summary]
- Guardrail metrics: [all clear / flagged]

### Decision
[Ship / Iterate / Kill] because [reasoning]

### Learnings
1. [What we learned about user behavior]
2. [What we learned about our hypothesis]
3. [What follow-up experiment this suggests]
```

This documentation feeds the Memory module and builds institutional knowledge.

# Experimentation Framework — Hypothesis-Driven Growth, ICE/PIE Scoring, Experiment Design, Statistical Rigor

## Overview

Experimentation is the engine of systematic growth. Growth teams that
run more experiments, with better hypotheses and rigorous analysis,
outperform teams that rely on intuition. This module covers the complete
experimentation framework: hypothesis formulation, prioritization
methodologies, experiment design principles, and the statistical
foundations required to draw valid conclusions from experiment results.

---

## Section 1: Hypothesis-Driven Growth

### Why Hypotheses Matter

A hypothesis transforms a vague idea ("let's try a new homepage") into
a testable prediction with a measurable outcome. Without hypotheses,
experiments are just changes—you cannot learn from results you did not
predict.

### Hypothesis Structure

Every growth experiment requires a structured hypothesis:

```
IF we [make this specific change]
FOR [this specific audience segment]
THEN [this specific metric] will [increase/decrease] by [amount]
BECAUSE [this behavioral or psychological mechanism]
```

**Example:**
```
IF we add social proof (customer logos and count) to the pricing page
FOR first-time visitors who reach the pricing page
THEN free trial sign-up rate will increase by 15%
BECAUSE social proof reduces perceived risk and increases trust
(Cialdini's social proof principle)
```

### Hypothesis Quality Criteria

**Specific:** Names the exact change, audience, metric, and expected
magnitude. "Improve conversion" is not a hypothesis.

**Falsifiable:** Can be proven wrong by data. If any result confirms
the hypothesis, it is not falsifiable.

**Measurable:** The predicted outcome can be tracked with existing or
implementable instrumentation.

**Behavioral:** Includes a "because" clause grounded in user psychology,
behavioral economics, or observed user behavior data.

**Time-Bound:** Specifies how long the experiment will run and when
results will be evaluated.

### Generating Hypotheses

**Data-Driven Sources**
- Funnel analysis (where are users dropping off?)
- Cohort analysis (which cohorts perform differently and why?)
- Feature usage data (which features correlate with retention?)
- Session recordings (where do users struggle or hesitate?)
- Heat maps (what do users click or ignore?)

**Qualitative Sources**
- User interviews (what frustrates or delights users?)
- Support tickets (what are the top complaints?)
- Sales call recordings (what objections do prospects raise?)
- NPS verbatim comments (what do detractors say?)
- Competitor analysis (what are competitors doing differently?)

**Behavioral Science Sources**
- Cialdini's principles (social proof, scarcity, authority, reciprocity,
  commitment, liking)
- Kahneman's biases (loss aversion, anchoring, framing, default effect)
- Fogg's behavior model (motivation, ability, trigger)
- BJ Fogg's tiny habits (make desired behavior easier)

---

## Section 2: Prioritization Frameworks

### ICE Scoring

ICE (Impact, Confidence, Ease) scores each experiment idea on three
dimensions, each rated 1–10:

**Impact:** If this experiment succeeds, how much will it move the
target metric?
- 10: Transformative (2x+ improvement expected)
- 7: Major (50–100% improvement expected)
- 5: Moderate (20–50% improvement)
- 3: Minor (5–20% improvement)
- 1: Marginal (<5% improvement)

**Confidence:** How confident are you that the hypothesis is correct?
- 10: Strong data supports the hypothesis (prior experiments, user
  research, competitive validation)
- 7: Moderate evidence (qualitative data, analogous experiments)
- 5: Reasonable theory but limited evidence
- 3: Educated guess based on intuition
- 1: Pure speculation

**Ease:** How easy is this to implement and measure?
- 10: Copy change, can ship today
- 7: Design change, can ship in 1–2 days
- 5: Frontend development, 1–2 weeks
- 3: Backend development, 2–4 weeks
- 1: Infrastructure change, 1+ months

**ICE Score = (Impact + Confidence + Ease) / 3**

### PIE Scoring

PIE (Potential, Importance, Ease) is an alternative framework:

**Potential:** How much room for improvement exists?
- Based on current performance vs. benchmark or theoretical maximum
- Pages with 1% conversion have more potential than pages at 15%

**Importance:** How much traffic or revenue flows through this area?
- A 10% improvement on a page with 100,000 monthly visitors is more
  important than a 50% improvement on a page with 1,000 visitors

**Ease:** Same as ICE—how easy to implement and measure.

**PIE Score = (Potential + Importance + Ease) / 3**

### When to Use ICE vs. PIE

- **ICE** when you have strong behavioral hypotheses and want to
  account for confidence in the hypothesis
- **PIE** when you are prioritizing across different areas of the
  funnel and need to account for traffic volume and current performance

### Prioritization Best Practices

- Score independently (have 3+ team members score, then average)
- Review scores in a group session to calibrate and debate
- Re-score quarterly as data and confidence change
- Do not over-engineer: the goal is relative ranking, not precise scores
- Always include at least one "moonshot" (low confidence, high impact)
  in each sprint's experiment roster

---

## Section 3: Experiment Design

### Experiment Types

**A/B Test (Split Test)**
Two variants shown to randomly assigned user groups simultaneously.
The gold standard for causal inference.
- Use for: UI changes, copy changes, pricing, onboarding flows
- Minimum: 2 variants (control + treatment)
- Maximum recommended: 4 variants (beyond this, sample requirements
  become prohibitive)

**Multivariate Test (MVT)**
Multiple elements varied simultaneously to test combinations.
- Use for: Pages with many elements where interactions matter
- Requires: Very high traffic (combinations multiply sample needs)
- Rarely practical for growth teams (prefer sequential A/B tests)

**Before/After (Pre/Post)**
Measure metrics before a change and after. No concurrent control group.
- Use for: Changes that cannot be split-tested (backend, infrastructure,
  pricing for existing users)
- Limitations: Cannot separate the treatment effect from other changes
  (seasonality, external events, organic trends)

**Holdback Test**
Roll out a change to 90–95% of users, hold back 5–10% as control.
- Use for: Measuring the impact of a change you are confident about
  but want to quantify
- Best practice: Maintain holdbacks for 4–8 weeks minimum

### Experiment Structure Document

For every experiment, complete this document before development begins:

```
EXPERIMENT: [Name]
HYPOTHESIS: IF... FOR... THEN... BECAUSE...
PRIMARY METRIC: [One metric that determines success/failure]
SECONDARY METRICS: [2-3 supporting metrics to monitor]
GUARDRAIL METRICS: [Metrics that must NOT degrade]
AUDIENCE: [Who sees this experiment]
TRAFFIC ALLOCATION: [% per variant]
MINIMUM SAMPLE SIZE: [Calculated]
ESTIMATED DURATION: [Based on traffic and MDE]
SUCCESS CRITERIA: [What result constitutes success]
IMPLEMENTATION: [Technical requirements]
ROLLBACK PLAN: [How to revert if guardrails are breached]
```

### Guardrail Metrics

Guardrail metrics protect against experiments that improve the target
metric at the expense of overall product health:

- Conversion rate improvement must not increase support ticket volume
- Engagement increase must not decrease revenue per user
- Activation improvement must not degrade long-term retention
- Click-through improvement must not increase bounce rate on next page

If a guardrail metric degrades beyond a pre-defined threshold, the
experiment is stopped regardless of primary metric results.

---

## Section 4: Statistical Rigor

### Sample Size Calculation

Before running any experiment, calculate the required sample size:

```
n = (Z_alpha/2 + Z_beta)^2 * 2 * p * (1-p) / MDE^2

Where:
n = sample size per variant
Z_alpha/2 = 1.96 for 95% significance (alpha = 0.05)
Z_beta = 0.84 for 80% power (beta = 0.20)
p = baseline conversion rate
MDE = minimum detectable effect (smallest meaningful improvement)
```

**Practical Implications:**
- Smaller MDE requires larger samples (detecting a 1% improvement
  requires ~16x more data than detecting a 10% improvement)
- Lower baseline rates require larger samples
- Higher confidence/power requirements require larger samples

### Bayesian vs. Frequentist Approaches

**Frequentist Testing**
The traditional approach. Defines a null hypothesis (no difference),
collects data, and calculates the probability (p-value) of observing
the data if the null hypothesis were true.

Strengths:
- Well-established methodology with clear decision rules
- Fixed sample size and duration (planned in advance)
- Widely understood by statisticians and researchers

Weaknesses:
- Cannot "peek" at results before the predetermined sample size
  (peeking inflates false positive rate)
- p-values are widely misunderstood (p < 0.05 does not mean 95%
  probability the variant is better)
- Does not directly answer "what is the probability that B is better
  than A?"

**Bayesian Testing**
Updates a prior belief about the treatment effect as data accumulates.
Produces a posterior probability distribution that directly answers
"what is the probability that B is better than A?"

Strengths:
- Natural interpretation ("there is a 93% probability that B is better")
- Can check results at any time without inflating error rates
- Incorporates prior knowledge (from previous experiments)
- More intuitive for non-statisticians

Weaknesses:
- Requires choosing a prior (can introduce bias)
- Less established in some organizations
- Computationally more complex

**Growth Brain Recommendation:**
Use Bayesian methods for faster decision-making on routine experiments.
Use frequentist methods for high-stakes experiments where statistical
rigor must be defensible to stakeholders.

### Common Statistical Mistakes

**Peeking Problem**
Checking results before reaching the required sample size and stopping
when significance is reached. This inflates false positive rates from
5% to 20–30%. Solutions: Pre-commit to sample sizes, use sequential
testing methods, or use Bayesian approaches.

**Multiple Comparisons Problem**
Testing many variants or metrics without correction inflates false
positive rates. With 20 metrics, you expect 1 false positive at
alpha = 0.05. Solutions: Bonferroni correction, FDR control, or
designate a single primary metric.

**Survivorship Bias**
Analyzing only users who completed the experiment, ignoring those who
dropped off. If one variant causes more users to abandon, the
remaining users may appear healthier—but the variant is actually worse.

**Simpson's Paradox**
A trend that appears in aggregate data reverses when the data is
segmented. Always check experiment results by key segments (device,
source, plan type) to detect reversals.

---

## Key References

- Ron Kohavi, *Trustworthy Online Controlled Experiments* (Cambridge)
- Stefan Thomke, *Experimentation Works* (Harvard Business Review)
- Ronny Kohavi: "Online Experiment Guidelines" (Microsoft Research)
- Evan Miller: Sample size calculator (evanmiller.org)
- VWO/Optimizely: Experimentation platform documentation
- Andrew Gelman, *Bayesian Data Analysis* (CRC Press)

---

## Summary

Experimentation is how growth teams convert intuition into evidence.
Hypothesis-driven experiments with structured predictions produce
learning regardless of outcome. ICE and PIE scoring ensure that the
highest-leverage experiments are prioritized. Experiment design with
clear primary metrics, guardrails, and rollback plans prevents both
wasted effort and unintended damage. Statistical rigor—proper sample
sizing, awareness of peeking and multiple comparisons problems, and
appropriate use of Bayesian or frequentist methods—ensures that
conclusions are valid and decisions are sound. The Growth Brain runs
experiments continuously, learns from every result, and compounds
those learnings into sustained growth.

# Experimentation

## What This Enables

A statistically rigorous experimentation practice that produces reliable, actionable results — not the pseudo-scientific "we ran an A/B test" that plagues most product organizations. True experimentation requires statistical literacy, methodological discipline, and intellectual honesty. This module provides the foundation to design experiments that yield valid conclusions, avoid common statistical pitfalls, and build an experimentation culture that accelerates learning.

---

## The Core Insight

An experiment is not "we changed something and looked at the numbers." An experiment is a structured test of a specific hypothesis, with predefined success criteria, adequate statistical power, and controls for confounding variables. Ron Kohavi (Trustworthy Online Controlled Experiments, 2020) estimates that most A/B tests at major tech companies show no statistically significant effect — and that is the system working correctly. The value of experimentation is not in producing winners; it is in preventing the organization from shipping changes that do not work while confidently identifying the ones that do.

---

## A/B Testing Methodology

### The Experimental Process

```
1. HYPOTHESIS
   "If we [change], then [metric] will [improve/decline] by [amount],
   because [reasoning based on user behavior]."

2. DESIGN
   - Define primary metric and guardrail metrics
   - Calculate required sample size (power analysis)
   - Determine randomization unit (user, session, account)
   - Define experiment duration
   - Identify potential confounders

3. IMPLEMENTATION
   - Build variant(s) behind feature flags
   - Implement event tracking for all relevant metrics
   - QA the variant to ensure it works correctly
   - Verify randomization is truly random

4. EXECUTION
   - Launch to calculated sample
   - Do NOT peek at results before planned analysis date
   - Monitor guardrail metrics for severe degradation
   - Document any external events that may confound results

5. ANALYSIS
   - Verify sample sizes reached target
   - Check for sample ratio mismatch (SRM)
   - Calculate statistical significance
   - Analyze primary metric, then secondary and guardrail metrics
   - Segment analysis for heterogeneous treatment effects

6. DECISION
   - Ship, iterate, or kill based on predefined criteria
   - Document results and learnings
   - Update the experiment repository
```

### Hypothesis Quality

| Component | Bad Example | Good Example |
|-----------|------------|--------------|
| Change | "Improve the onboarding" | "Add a progress bar to the 5-step onboarding wizard" |
| Metric | "Improve the experience" | "Increase onboarding completion rate" |
| Expected effect | "It will be better" | "Increase from 45% to 55% (10 percentage point improvement)" |
| Reasoning | "Users will like it" | "Users drop off at step 3 due to uncertainty about remaining steps; a progress bar reduces this uncertainty" |

---

## Statistical Significance

### Definition

Statistical significance quantifies the probability that the observed difference between control and treatment is due to chance rather than the intervention. The conventional threshold is p < 0.05 (5% probability the result is due to chance).

### Key Concepts

| Concept | Definition | Implication |
|---------|-----------|-------------|
| **p-value** | Probability of observing this result (or more extreme) if the null hypothesis is true | p < 0.05 means < 5% chance the result is noise |
| **Null hypothesis (H0)** | "There is no difference between control and treatment" | This is what we are trying to reject |
| **Alternative hypothesis (H1)** | "There IS a difference" | This is what we are trying to support |
| **Type I error (false positive)** | Concluding there is an effect when there is not | Set by significance level (alpha, typically 0.05) |
| **Type II error (false negative)** | Failing to detect an effect that exists | Set by statistical power (beta, typically 0.20) |
| **Confidence interval** | Range within which the true effect likely falls | More informative than p-value alone |

### The p-value is NOT

| Misinterpretation | Correct Interpretation |
|-------------------|----------------------|
| "There is a 95% probability the treatment is better" | "If there were no effect, there is a 5% chance of seeing this result" |
| "The effect size is large" | p-value says nothing about effect size; a tiny effect can be significant with enough data |
| "The result is practically meaningful" | Statistical significance does not imply practical significance |
| "The result will replicate" | A single p < 0.05 result has a meaningful probability of not replicating |

---

## Power Analysis

### Definition

Statistical power is the probability of detecting a true effect when it exists. Power analysis determines the sample size needed to detect an effect of a given size with a given confidence.

### The Four Parameters

```
1. Significance level (alpha): Probability of false positive (typically 0.05)
2. Power (1 - beta): Probability of detecting a true effect (typically 0.80)
3. Minimum Detectable Effect (MDE): The smallest effect size you want to detect
4. Sample size (N): The number of observations per variant
```

**Relationship:** Fix any three parameters, and the fourth is determined.

### Sample Size Estimation

For a two-proportion test (e.g., conversion rates):

| Baseline Rate | MDE (absolute) | Sample per Variant (80% power, 5% significance) |
|--------------|----------------|------------------------------------------------|
| 5% | +1% (5% to 6%) | ~14,700 |
| 5% | +2% (5% to 7%) | ~3,800 |
| 10% | +1% (10% to 11%) | ~28,000 |
| 10% | +2% (10% to 12%) | ~7,100 |
| 20% | +2% (20% to 22%) | ~12,400 |
| 20% | +5% (20% to 25%) | ~2,100 |
| 50% | +5% (50% to 55%) | ~3,200 |

### Power Analysis Implications

1. **Smaller effects require more data:** Detecting a 0.5% improvement requires ~100x more users than detecting a 5% improvement
2. **Higher baselines require more data:** 50% -> 51% is harder to detect than 5% -> 6%
3. **Higher power requires more data:** 95% power requires ~60% more data than 80% power
4. **Practical implication:** If your product has 1,000 DAU, you cannot reliably detect effects smaller than 3-5% without running experiments for weeks

### What to Do With Low Traffic

| Strategy | Description | Tradeoff |
|----------|-------------|----------|
| Accept larger MDE | Only test changes expected to produce large effects | Miss smaller but meaningful improvements |
| Run longer | Extend experiment duration | Seasonal effects may confound |
| Use a more sensitive metric | Switch from conversion to revenue or engagement | May not be the most important metric |
| Use composite metrics | Combine multiple related metrics into one | Harder to interpret |
| Use Bayesian methods | More efficient with small samples | Requires more statistical expertise |
| Qualitative validation | Replace A/B with usability testing | Cannot quantify the effect |

---

## Bayesian vs Frequentist Approaches

### Philosophical Difference

| Dimension | Frequentist | Bayesian |
|-----------|-------------|----------|
| Core question | "What is the probability of this data given H0?" | "What is the probability of the hypothesis given this data?" |
| Prior knowledge | Not incorporated (fresh analysis each time) | Explicitly incorporated (prior beliefs updated with data) |
| Output | p-value + confidence interval | Posterior probability + credible interval |
| Sample size | Fixed in advance; must not peek | Can be continuous; update beliefs as data arrives |
| Interpretation | "95% of intervals from repeated experiments would contain the true value" | "There is a 95% probability the true value is in this interval" |
| Decision | Binary: significant or not | Continuous: probability of being better |

### When to Use Each

| Approach | Best For | Not Good For |
|----------|----------|-------------|
| **Frequentist** | High-traffic products; regulatory or scientific contexts; when you need to set sample size in advance | Low-traffic products; sequential testing; incorporating prior knowledge |
| **Bayesian** | Low-traffic products; continuous monitoring; when prior knowledge is strong; when you need to answer "what is the probability B is better than A?" | When stakeholders expect p-values; when no prior exists; highly novel tests |

### Bayesian A/B Testing in Practice

```
Step 1: Set priors
  - Based on historical experiment results
  - Example: "Conversion rate improvements in our experiments are typically 0-5%"

Step 2: Collect data
  - As data arrives, update the posterior distribution

Step 3: Monitor
  - Track: P(B > A), expected loss, and credible intervals
  - No need to pre-set sample size

Step 4: Decide
  - Ship when P(B > A) exceeds threshold (e.g., 95%)
  - Or stop when expected loss is below threshold (e.g., < 0.1%)
```

---

## Feature Flags and Experimentation Infrastructure

### Feature Flags as Experiment Infrastructure

Feature flags (feature toggles) are the technical mechanism that enables experiments:

```
FEATURE FLAG ARCHITECTURE FOR EXPERIMENTATION

┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  User       │────>│  Flag        │────>│  Variant     │
│  Request    │     │  Service     │     │  Assignment  │
└─────────────┘     └──────────────┘     └──────────────┘
                          │                      │
                    ┌─────┴─────┐          ┌─────┴─────┐
                    │  Flag     │          │  Tracking  │
                    │  Config   │          │  Events    │
                    └───────────┘          └───────────┘

Config includes:
- Flag name and description
- Variant weights (e.g., 50/50, 90/10)
- Targeting rules (segment, %, user attributes)
- Start/end dates
- Kill switch
```

### Feature Flag Best Practices for Experiments

| Practice | Rationale |
|----------|-----------|
| Deterministic assignment | Same user always sees same variant (no flickering) |
| Server-side evaluation | Client-side flags can be manipulated and leak variants |
| Flag hygiene | Remove flags after experiment concludes (prevent flag debt) |
| Gradual rollout | Start at 1-5%, monitor for bugs, then expand to experiment traffic |
| Kill switch | Ability to immediately disable a variant if it causes errors |
| Assignment logging | Log every flag evaluation for debugging and analysis |

---

## Experimentation Anti-Patterns

### The Most Common Mistakes

| Anti-Pattern | What Happens | Why It Is Wrong | Fix |
|-------------|-------------|----------------|-----|
| **Peeking** | Looking at results daily and stopping when p < 0.05 | Inflates false positive rate to 20-30% | Pre-set duration; do not analyze until planned date |
| **Underpowered tests** | Running with too few users | Cannot detect real effects; inconclusive results | Run power analysis before starting |
| **Multiple comparisons** | Testing 20 metrics and celebrating the one that is significant | At p < 0.05, 1 in 20 metrics will be significant by chance | Pre-declare primary metric; apply Bonferroni correction for exploratory |
| **Post-hoc segmentation** | After the test, searching for segments where the treatment "worked" | Finding patterns in noise; will not replicate | Pre-declare segments; treat post-hoc findings as hypotheses |
| **Ignoring SRM** | Sample ratio is 48/52 instead of 50/50, and nobody notices | Indicates a bug in randomization; results are invalid | Always check sample ratio before analyzing results |
| **Novelty/primacy effects** | Measuring too early; new UI gets clicks from curiosity | Effect disappears once novelty wears off | Run for at least 2 full business cycles (2-4 weeks) |
| **Survivorship bias** | Only measuring users who complete the flow | Misses users who dropped off because of the treatment | Include all assigned users in analysis (intent-to-treat) |

### The Peeking Problem in Detail

```
If you check your experiment every day and stop when p < 0.05:

Day 3:  p = 0.04  -> "Significant! Ship it!" (but actually noise)
Day 5:  p = 0.12  -> (would have seen it is not significant if you waited)
Day 10: p = 0.03  -> (random fluctuation back below 0.05)
Day 14: p = 0.08  -> (the true state — not significant)

Actual false positive rate with daily peeking: ~26% (not 5%)
```

**Solutions to peeking:**
1. Pre-register analysis date and do not look before then
2. Use sequential testing methods (group sequential boundaries, always-valid p-values)
3. Use Bayesian methods with continuous monitoring

---

## Experiment Documentation

### Experiment Brief Template

```
EXPERIMENT BRIEF

Name: [Descriptive experiment name]
Owner: [PM name]
Date: [Start date - planned end date]

1. HYPOTHESIS
   If we [change], then [metric] will [improve] by [amount],
   because [reasoning].

2. METRICS
   Primary: [metric name, current baseline, target]
   Secondary: [2-3 additional metrics]
   Guardrails: [metrics that must not degrade]

3. DESIGN
   Variants: Control (current), Treatment (change description)
   Split: 50/50 (or justify different split)
   Sample size: [calculated from power analysis]
   Duration: [calculated from traffic and required sample]
   Randomization unit: [user / session / account]

4. IMPLEMENTATION
   Feature flag: [flag name]
   Tracking events: [list of events to instrument]
   QA checklist: [verification steps]

5. RESULTS (filled in after experiment)
   Primary metric: [result with confidence interval]
   Secondary metrics: [results]
   Guardrail metrics: [any degradation?]
   Sample ratio check: [pass/fail]
   Segments: [any pre-declared segment analysis]

6. DECISION
   Ship / Iterate / Kill
   Rationale: [evidence-based reasoning]
   Learnings: [what we learned regardless of outcome]
```

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Experimentation theater | Tests run but results do not influence decisions | Culture does not value data; experiments are performative | Tie experiments to decisions; "no result" is still a valid learning |
| Winner bias | Only "winning" experiments are shared; losing experiments hidden | Fear of failure; celebration of success only | Celebrate learning speed, not win rate; share all results |
| Local optima | Many small optimizations, no breakthrough improvements | Experimentation used for optimization, not discovery | Reserve capacity for bold experiments (10x changes, not 10%) |
| Test everything | Resources spread across dozens of simultaneous tests | No prioritization of experiments | Score experiments by expected learning value; focus on highest-leverage |
| Statistical illiteracy | Teams misinterpret p-values, confidence intervals, and power | No training in experimental methods | Train PMs and engineers in basic statistics |

---

## The Operator's Framework

When designing and running experiments:

1. **Start with a hypothesis** — not "let's see what happens" but "we believe X because Y"
2. **Run power analysis** — calculate the sample size needed before starting
3. **Pre-declare metrics** — primary metric, secondary metrics, and guardrails defined before launch
4. **Do not peek** — analyze on the planned date, not before (or use sequential testing methods)
5. **Check sample ratio** — verify randomization is working before trusting results
6. **Use confidence intervals** — they convey more information than binary significance
7. **Document everything** — hypotheses, results, decisions, and learnings in the experiment repository

---

## Summary

Experimentation is the discipline of learning under uncertainty with statistical rigor. A/B testing requires a structured process: hypothesis formulation, power analysis for sample sizing, randomized controlled assignment, predefined metrics with guardrails, and honest analysis without peeking. Statistical significance (p < 0.05) means there is less than a 5% chance the result is noise — it does not mean the effect is large or practically meaningful. Power analysis prevents underpowered experiments that waste time without producing conclusions. Bayesian methods offer an alternative that permits continuous monitoring and produces more intuitive probability statements. Feature flags provide the technical infrastructure for experiments. The most dangerous anti-patterns are peeking (inflates false positives to 25%+), underpowered tests (produce inconclusive results), and post-hoc segmentation (finds patterns in noise). The goal of an experimentation program is not to produce winners — it is to accelerate the organization's rate of validated learning.

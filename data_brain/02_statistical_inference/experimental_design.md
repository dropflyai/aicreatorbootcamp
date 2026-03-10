# Experimental Design — A/B Testing and Beyond

## Overview

Experimental design is the science of structuring data collection to maximize the
information gained about causal effects while controlling for confounding. In technology,
this primarily manifests as A/B testing, but extends to multi-armed bandits, factorial
designs, and sequential testing. This module codifies the methodology for designing,
running, and analyzing experiments with statistical rigor.

References: Kohavi, Tang & Xu (Trustworthy Online Controlled Experiments), Montgomery
(Design and Analysis of Experiments, 9th ed.), Box, Hunter & Hunter (Statistics for
Experimenters), Larsen et al. (Statistical Challenges in Online Controlled Experiments).

---

## A/B Testing Fundamentals

### Anatomy of an A/B Test

1. **Hypothesis:** A specific, falsifiable prediction (pre-registered before data collection)
2. **Randomization unit:** The entity being randomized (user, session, page view, device)
3. **Treatment:** The intervention being tested (new feature, design change, algorithm)
4. **Control:** The current experience (status quo)
5. **Primary metric:** The single metric that determines success (pre-registered)
6. **Secondary metrics:** Additional metrics to watch (with multiple comparison correction)
7. **Guardrail metrics:** Metrics that must not degrade (latency, crash rate, revenue)
8. **Sample size:** Determined by power analysis before the experiment starts
9. **Duration:** Long enough for power and to capture weekly seasonality (minimum 1 week)

### Pre-Registration Protocol

Before launching any experiment:

```
1. State the null and alternative hypotheses
2. Define the primary metric precisely (SQL query or computation logic)
3. Define the minimum detectable effect (MDE)
4. Compute required sample size via power analysis
5. Define the experiment duration
6. Specify the analysis plan (test type, correction method, segmentation)
7. List all secondary and guardrail metrics
8. Document the randomization method and unit
9. Identify potential risks and mitigation strategies
```

**Why pre-registration matters:** Post-hoc hypothesis generation (HARKing) and
selective reporting are the primary sources of false discoveries in experimentation.
Pre-registration separates confirmatory from exploratory analysis.

### Randomization Methods

**Simple randomization:** Each unit independently assigned to treatment with probability p.
- Pros: Simple, unbiased
- Cons: Possible imbalance for small experiments

**Stratified randomization:** Randomize within strata (e.g., country, platform) to
ensure balance on known important variables.
- Reduces variance of the treatment effect estimator
- Essential when strata have very different baseline rates

**Cluster randomization:** Randomize groups of units together (e.g., all users in a
geographic region). Required when SUTVA is violated (social features, marketplace effects).
- Effective sample size = number of clusters, not number of units
- Requires intra-cluster correlation (ICC) in power calculations

**Switchback experiments:** Alternate treatment and control over time periods within
the same units. Used for marketplace experiments where supply and demand are coupled.
- Accounts for temporal spillover effects
- Analysis must account for carryover effects

---

## Power Analysis

### Before Every Experiment

Power analysis determines the sample size needed to detect a meaningful effect with
sufficient probability.

**Inputs:**
- alpha: significance level (typically 0.05)
- 1-beta: desired power (typically 0.80 or 0.90)
- delta: minimum detectable effect (MDE) — the smallest effect worth detecting
- sigma: standard deviation of the metric (estimated from historical data)

### Formulas

**For a two-sample t-test (continuous metric):**
n_per_group = 2 * (z_{alpha/2} + z_{beta})^2 * sigma^2 / delta^2

At alpha=0.05, power=0.80: n_per_group = 2 * (1.96 + 0.84)^2 * sigma^2 / delta^2
                                         = 15.7 * sigma^2 / delta^2

**For a two-proportion test (binary metric):**
n_per_group = (z_{alpha/2} * sqrt(2*p*(1-p)) + z_{beta} * sqrt(p_c*(1-p_c) + p_t*(1-p_t)))^2 / (p_t - p_c)^2

Approximate: n_per_group = 16 * p * (1-p) / delta^2 (at alpha=0.05, power=0.80)

### Variance Reduction Techniques

When the required sample size is too large:

**CUPED (Controlled-experiment Using Pre-Experiment Data):**
Adjust the metric using pre-experiment data as a covariate:
Y_adj = Y - theta * (X - E[X])

where X is a pre-experiment metric correlated with Y and theta = Cov(Y, X) / Var(X).

Variance reduction: 1 - R^2 (proportion of variance explained by X).
Typical variance reduction: 30-50% (equivalent to 1.5x-2x more users).

**CUPAC (Microsoft variant):** Uses ML to predict Y from pre-experiment features.

**Stratified estimation:** Compute treatment effects within strata, combine via
weighted average. Reduces variance when strata explain outcome variation.

**Ratio metrics:** For metrics like revenue per user, use delta method or bootstrap
for variance estimation (mean of ratios != ratio of means).

### Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Peeking | Checking results repeatedly inflates Type I error | Use sequential testing or fixed-horizon |
| Underpowered tests | Cannot detect real effects | Run power analysis; extend duration |
| Too many metrics | Multiple comparisons inflate false positives | Pre-specify primary metric; correct for multiple tests |
| Wrong randomization unit | Correlated observations inflate significance | Match randomization unit to analysis unit |
| Duration too short | Misses novelty/primacy effects, weekly patterns | Run minimum 1-2 weeks; check for time effects |
| SRM (Sample Ratio Mismatch) | Unequal allocation indicates a bug | Check SRM before analyzing results (chi-squared test) |

---

## Sequential Testing

### The Peeking Problem

If you check a fixed-horizon test every day at alpha = 0.05:
- After 5 checks: actual alpha = ~0.14
- After 10 checks: actual alpha = ~0.19
- After 100 checks: actual alpha = ~0.53

This is because under the null, the test statistic follows a random walk that will
eventually cross any fixed boundary.

### Group Sequential Methods

**O'Brien-Fleming bounds:** Conservative early, liberal late. Preserves most of the
power of a fixed-horizon test but allows optional early stopping.

**Alpha spending function:** Allocates the total alpha budget across interim analyses.
Lan-DeMets approach allows flexible timing of interim looks.

### Always-Valid Confidence Sequences

**Confidence sequences (Howard et al., 2021):** Provide valid confidence intervals at
every time point, not just pre-specified looks. Based on martingale theory.

**Mixture sequential probability ratio test (mSPRT):**
Reject H0 when: Lambda_t = product_{i=1}^{t} [likelihood ratio] > 1/alpha

**Bayesian sequential testing:** Compute posterior P(theta > 0 | data_t) at each time t.
Stop when P exceeds a threshold (e.g., 0.95). No correction needed because Bayesian
inference is inherently sequential.

### Comparison

| Method | Peeking OK? | Inference Type | Practical Use |
|--------|------------|----------------|---------------|
| Fixed-horizon | No | Frequentist | Standard A/B tests |
| Group sequential | At pre-specified times | Frequentist | Tests with planned interim analyses |
| Always-valid CI | Yes, anytime | Frequentist | Continuous monitoring |
| Bayesian sequential | Yes, anytime | Bayesian | Dynamic stopping |
| mSPRT | Yes, anytime | Frequentist | Online experimentation platforms |

---

## Multi-Armed Bandits

### The Exploration-Exploitation Tradeoff

A/B tests separate exploration (learning) from exploitation (using the best variant).
Bandits combine both, dynamically allocating more traffic to better-performing variants.

### Algorithms

**Epsilon-Greedy:**
- With probability epsilon: explore (random arm)
- With probability 1-epsilon: exploit (best arm so far)
- Simple but suboptimal; typically use decaying epsilon

**Upper Confidence Bound (UCB1):**
Select arm j that maximizes: x-bar_j + sqrt(2 * ln(t) / n_j)
- x-bar_j: empirical mean reward
- n_j: number of times arm j was pulled
- The second term is the "optimism bonus" (exploration encouragement)

**Thompson Sampling:**
1. Maintain posterior distribution for each arm's reward parameter
2. Sample from each posterior
3. Select the arm with the highest sampled value
4. Update the posterior with the observed reward

For Bernoulli rewards with Beta priors:
- Prior: Beta(alpha_j, beta_j) for each arm j
- Update: alpha_j += reward, beta_j += (1 - reward)
- Naturally balances exploration and exploitation

**Contextual Bandits:**
Extend bandits to use context (user features) for arm selection.
- LinUCB: linear reward model with UCB exploration
- Neural bandits: deep learning for reward prediction

### Bandits vs A/B Tests

| Criterion | A/B Test | Bandit |
|-----------|---------|--------|
| Statistical validity | Exact inference | Approximate, harder to quantify |
| Regret | Fixed during exploration | Minimized by dynamic allocation |
| Duration | Fixed by power analysis | Adaptive |
| Interpretability | Clear effect estimate with CI | Harder to estimate treatment effect |
| Multiple variants | Equal allocation (wasteful) | Efficient allocation |
| Use case | Measuring effects precisely | Optimizing outcomes quickly |

**Recommendation:** Use A/B tests for learning (measuring effects). Use bandits for
optimizing (maximizing reward when you need a quick decision and precise measurement
is less important).

---

## Factorial and Multivariate Designs

### Full Factorial Design

Test all combinations of multiple factors simultaneously.

For k factors each at 2 levels: 2^k treatment combinations.

**Advantages:**
- Estimates main effects AND interaction effects
- More efficient than testing one factor at a time
- Reveals interactions that one-at-a-time testing misses

**Example:** Testing button color (red/blue) and text (Sign Up/Get Started):
- 4 variants: red+SignUp, red+GetStarted, blue+SignUp, blue+GetStarted
- Main effect of color, main effect of text, AND their interaction

### Fractional Factorial Design

When full factorial is too expensive (too many combinations), use a carefully chosen
fraction that estimates main effects and some interactions.

**Resolution III:** Main effects estimable but aliased with two-factor interactions.
**Resolution IV:** Main effects estimable; two-factor interactions aliased with each other.
**Resolution V:** Main effects and two-factor interactions estimable.

---

## Experiment Analysis

### Analysis Workflow

```
1. Check Sample Ratio Mismatch (SRM)
   - chi-squared test on assignment counts
   - If SRM detected: STOP. Debug the randomization. Results are unreliable.

2. Compute treatment effect with confidence interval
   - Primary metric: pre-registered analysis
   - Use CUPED-adjusted metric if planned

3. Check guardrail metrics
   - Any significant degradation requires investigation

4. Analyze secondary metrics
   - Apply multiple comparison correction (Holm or BH)

5. Perform heterogeneity analysis
   - Pre-specified segments only (e.g., new vs returning users)
   - Exploratory segments clearly labeled

6. Document and share results
   - Include all metrics, not just significant ones
   - Report effect sizes and confidence intervals
   - State the decision and rationale
```

### Interpreting Results

**Significant positive effect:** Ship the treatment (if guardrails are clean).

**Significant negative effect:** Do not ship. Investigate why.

**Non-significant result (p > alpha):**
- NOT evidence of no effect (absence of evidence != evidence of absence)
- Check if the CI excludes practically meaningful effects
- Consider if the experiment was adequately powered
- May warrant a follow-up experiment with more power

### Novelty and Primacy Effects

- **Novelty effect:** Users engage more with new experiences initially, then revert
- **Primacy effect:** Users prefer the familiar, engagement increases over time

**Mitigation:** Run experiments for at least 2-4 weeks. Analyze by cohort (day of first
exposure). Compare early vs late treatment effects.

---

**Every experiment in the Data Brain follows this protocol. No peeking. No post-hoc hypotheses
disguised as pre-registered. No shipping without guardrail checks.**

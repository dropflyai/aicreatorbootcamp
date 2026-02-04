# Statistical Analysis — Hypothesis Testing, Inference, and Causal Methods

## Overview

Statistical analysis is the rigorous application of probability theory to draw
conclusions from data. This module covers the frequentist hypothesis testing framework,
Bayesian alternatives, resampling methods, and the causal inference toolkit that
enables reasoning about interventions rather than mere associations. Every claim
must be supported by quantified uncertainty.

References: Wasserman (All of Statistics), Angrist & Pischke (Mostly Harmless
Econometrics), Imbens & Rubin (Causal Inference for Statistics), McElreath
(Statistical Rethinking), Efron & Tibshirani (An Introduction to the Bootstrap).

---

## Hypothesis Testing Framework

### Structure

A hypothesis test evaluates evidence against a null hypothesis H_0:

```
H_0: theta = theta_0   (null hypothesis, status quo)
H_1: theta != theta_0  (alternative hypothesis, one-sided or two-sided)
```

### Procedure

1. State H_0 and H_1
2. Choose significance level alpha (typically 0.05)
3. Compute test statistic T from data
4. Determine p-value = P(T >= t_obs | H_0)
5. Reject H_0 if p-value < alpha

### Error Types

| | H_0 True | H_0 False |
|---|----------|-----------|
| Reject H_0 | Type I (alpha) | Correct (Power = 1-beta) |
| Fail to Reject | Correct | Type II (beta) |

- alpha = P(Type I error) = P(reject H_0 | H_0 true) = false positive rate
- beta = P(Type II error) = P(fail to reject H_0 | H_0 false) = false negative rate
- Power = 1 - beta = probability of detecting a true effect

---

## Common Tests

### One-Sample t-Test

Tests whether a population mean differs from a hypothesized value.

```
H_0: mu = mu_0
Test statistic: t = (x_bar - mu_0) / (s / sqrt(n))
Distribution: t(n-1) under H_0
```

Assumptions: independent observations, approximately normal (or n >= 30 by CLT).

### Two-Sample t-Test

Tests whether two population means differ.

```
H_0: mu_1 = mu_2
Test statistic: t = (x_bar_1 - x_bar_2) / sqrt(s_1^2/n_1 + s_2^2/n_2)
```

Welch's t-test (unequal variances): preferred over pooled t-test in practice.
Degrees of freedom approximated by Satterthwaite formula:

```
df = (s_1^2/n_1 + s_2^2/n_2)^2 / ((s_1^2/n_1)^2/(n_1-1) + (s_2^2/n_2)^2/(n_2-1))
```

### Paired t-Test

For matched observations (before/after, same subject):

```
d_i = x_i_after - x_i_before
t = d_bar / (s_d / sqrt(n))
```

### Chi-Square Test of Independence

Tests association between two categorical variables.

```
H_0: variables are independent
Test statistic: chi^2 = SUM_ij (O_ij - E_ij)^2 / E_ij
where E_ij = (row_i_total * col_j_total) / grand_total
df = (r-1)(c-1)
```

Rule of thumb: all expected frequencies E_ij >= 5. Use Fisher's exact test otherwise.

### ANOVA (Analysis of Variance)

Tests whether means differ across k >= 3 groups.

```
H_0: mu_1 = mu_2 = ... = mu_k

F = MS_between / MS_within
  = [SS_between / (k-1)] / [SS_within / (N-k)]

SS_between = SUM_j n_j * (x_bar_j - x_bar)^2
SS_within  = SUM_j SUM_i (x_ij - x_bar_j)^2
```

Post-hoc tests (after rejecting H_0):
- Tukey HSD: controls family-wise error rate (FWER)
- Bonferroni: alpha_adj = alpha / m (conservative)
- Benjamini-Hochberg: controls false discovery rate (FDR)

### Non-Parametric Alternatives

| Parametric | Non-Parametric | Use When |
|-----------|----------------|----------|
| t-test (1 sample) | Wilcoxon signed-rank | Non-normal, ordinal data |
| t-test (2 sample) | Mann-Whitney U | Non-normal, ordinal data |
| ANOVA | Kruskal-Wallis | Non-normal, ordinal data |
| Pearson r | Spearman rho | Non-linear relationship |

---

## Confidence Intervals

A 95% confidence interval means: if we repeat the experiment many times,
95% of the computed intervals will contain the true parameter.

### For a Mean

```
CI = x_bar +/- t_(alpha/2, n-1) * (s / sqrt(n))
```

### For a Proportion

```
Wald:   p_hat +/- z_(alpha/2) * sqrt(p_hat * (1-p_hat) / n)
Wilson: better coverage for small n or extreme p
```

### Interpreting CIs

- The interval is random, the parameter is fixed
- A 95% CI does NOT mean "95% probability the parameter is in this interval"
- Narrower CI = more precision = larger sample or less variance
- CIs and hypothesis tests are dual: reject H_0 iff theta_0 is outside the CI

---

## Effect Size

Statistical significance (p < 0.05) does not imply practical significance.
Effect sizes quantify the magnitude of an effect.

### Cohen's d (Standardized Mean Difference)

```
d = (x_bar_1 - x_bar_2) / s_pooled

Benchmarks:
  Small:  d = 0.2
  Medium: d = 0.5
  Large:  d = 0.8
```

### Correlation Coefficient (r)

```
r = COV(X,Y) / (SD(X) * SD(Y))

Benchmarks:
  Small:  r = 0.1
  Medium: r = 0.3
  Large:  r = 0.5
```

### Odds Ratio (OR) and Relative Risk (RR)

```
          | Outcome+ | Outcome- |
Exposed   |    a     |    b     |
Unexposed |    c     |    d     |

OR = (a*d) / (b*c)
RR = (a/(a+b)) / (c/(c+d))
```

OR approximates RR when the outcome is rare (< 10%).

---

## Power Analysis

### Formula

```
n = ((z_alpha/2 + z_beta)^2 * 2 * sigma^2) / delta^2

where:
  z_alpha/2 = critical value for significance level (1.96 for alpha=0.05)
  z_beta    = critical value for power (0.84 for power=0.80)
  sigma^2   = variance
  delta     = minimum detectable effect
```

### Sample Size Table (Two-sample t-test, alpha=0.05, power=0.80)

| Effect Size (d) | n per group |
|-----------------|-------------|
| 0.2 (small) | 394 |
| 0.5 (medium) | 64 |
| 0.8 (large) | 26 |

### Practical Considerations

- Power analysis should be done BEFORE data collection
- Post-hoc power analysis is meaningless (circular reasoning)
- For multiple comparisons, adjust alpha before computing sample size
- Sequential testing (GSTE) allows for early stopping with valid inference

---

## Bayesian Statistics

### Bayes' Theorem

```
P(theta | data) = P(data | theta) * P(theta) / P(data)
posterior        = likelihood      * prior     / evidence
```

### Conjugate Priors

| Likelihood | Conjugate Prior | Posterior |
|-----------|----------------|-----------|
| Binomial | Beta(a, b) | Beta(a + successes, b + failures) |
| Poisson | Gamma(a, b) | Gamma(a + sum(x), b + n) |
| Normal (known var) | Normal(mu_0, sigma_0) | Normal(weighted mean, ...) |
| Normal (known mean) | Inverse-Gamma | Inverse-Gamma(updated) |

### Credible Intervals vs Confidence Intervals

- Bayesian 95% credible interval: P(theta in CI | data) = 0.95
- This IS the probability statement people intuitively want
- Depends on the prior (frequentist CI does not)
- Highest Posterior Density (HPD) interval: shortest interval with 95% mass

### MCMC (Markov Chain Monte Carlo)

When posteriors are analytically intractable:
- Metropolis-Hastings: general-purpose sampler
- Gibbs sampling: samples one parameter at a time from conditionals
- Hamiltonian Monte Carlo (HMC): uses gradient information for efficient exploration
- NUTS (No-U-Turn Sampler): auto-tuning HMC (used by Stan and PyMC)

### Diagnostics

- R-hat (Gelman-Rubin): < 1.01 indicates convergence
- Effective sample size (ESS): > 400 per parameter recommended
- Trace plots: visual check for stationarity and mixing
- Divergent transitions: indicate posterior geometry problems

---

## Bootstrap Methods

### Nonparametric Bootstrap

```
For b = 1 to B:
    Draw sample of size n WITH replacement from original data
    Compute statistic theta_hat_b
CI = [quantile(theta_hat, alpha/2), quantile(theta_hat, 1-alpha/2)]
```

- Works for any statistic (median, correlation, regression coefficients)
- B >= 1000 for CIs, B >= 10000 for p-values
- Fails when the statistic is not smooth or data is small

### BCa Bootstrap (Bias-Corrected and Accelerated)

Corrects for bias and skewness in the bootstrap distribution:

```
z_0 = Phi^{-1}(proportion of theta_hat_b < theta_hat)  -- bias correction
a = SUM(theta_hat_(.) - theta_hat_(i))^3 /
    (6 * (SUM(theta_hat_(.) - theta_hat_(i))^2)^{3/2}) -- acceleration
```

BCa intervals have better coverage than percentile intervals.

### Permutation Tests

For testing H_0: no association between X and Y:

```
For b = 1 to B:
    Randomly permute Y labels
    Compute test statistic T_b
p-value = proportion of |T_b| >= |T_obs|
```

- Exact test (no distributional assumptions)
- Valid for any test statistic
- Computationally intensive for large datasets

---

## Causal Inference

### The Fundamental Problem

We observe Y_i(treatment) OR Y_i(control), never both.
The individual treatment effect tau_i = Y_i(1) - Y_i(0) is unidentifiable.
We estimate the Average Treatment Effect (ATE):

```
ATE = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)]
```

### Difference-in-Differences (DiD)

Compares changes over time between treatment and control groups.

```
ATE_DiD = (Y_treat_post - Y_treat_pre) - (Y_control_post - Y_control_pre)
```

Key assumption: parallel trends (absent treatment, both groups would have
followed the same trajectory).

### Regression Discontinuity Design (RDD)

Exploits a cutoff in a running variable that determines treatment assignment.

```
Treatment: D_i = 1 if X_i >= c, 0 otherwise
ATE_RDD = lim_{x->c+} E[Y|X=x] - lim_{x->c-} E[Y|X=x]
```

Sharp RDD: cutoff perfectly determines treatment.
Fuzzy RDD: cutoff shifts probability of treatment (use IV estimation).

### Instrumental Variables (IV)

When treatment is endogenous (correlated with unobservables), an instrument Z
satisfies:
1. Relevance: Z is correlated with treatment D
2. Exclusion: Z affects Y only through D
3. Independence: Z is independent of unobserved confounders

```
Two-Stage Least Squares (2SLS):
  Stage 1: D_hat = pi_0 + pi_1 * Z + v     (predict treatment from instrument)
  Stage 2: Y = beta_0 + beta_1 * D_hat + u  (use predicted treatment)
```

Weak instruments (F-statistic < 10) cause severe bias; use Anderson-Rubin test.

### Propensity Score Methods

Propensity score: e(X) = P(D=1 | X) -- probability of treatment given covariates.

**Matching**: pair treated and control units with similar e(X).
**Inverse Probability Weighting (IPW)**:

```
ATE_IPW = (1/n) * SUM [ D_i * Y_i / e(X_i) - (1-D_i) * Y_i / (1-e(X_i)) ]
```

**Doubly Robust**: combines outcome model and propensity model.
Consistent if EITHER model is correctly specified (not both required).

```
ATE_DR = (1/n) * SUM [
    mu_1(X_i) - mu_0(X_i)
    + D_i * (Y_i - mu_1(X_i)) / e(X_i)
    - (1-D_i) * (Y_i - mu_0(X_i)) / (1 - e(X_i))
]
```

---

## Multiple Testing Correction

When conducting m simultaneous tests, the probability of at least one
false positive rises: P(>= 1 false positive) = 1 - (1 - alpha)^m.

### Family-Wise Error Rate (FWER)

- Bonferroni: reject if p_i < alpha/m (conservative)
- Holm-Bonferroni: step-down procedure (uniformly more powerful than Bonferroni)
- Sidak: reject if p_i < 1 - (1-alpha)^{1/m} (slightly less conservative)

### False Discovery Rate (FDR)

- Benjamini-Hochberg: controls E[false discoveries / total discoveries]
- Less conservative than FWER; appropriate when some false positives are acceptable
- Standard in genomics, A/B testing at scale

```
BH Procedure:
1. Sort p-values: p_(1) <= p_(2) <= ... <= p_(m)
2. Find largest k such that p_(k) <= (k/m) * alpha
3. Reject H_0 for all i = 1, ..., k
```

---

## Practical Workflow

1. **Define the question**: descriptive, predictive, or causal?
2. **Design the study**: power analysis, choose the right test
3. **Check assumptions**: normality, independence, homoskedasticity
4. **Run the test**: compute test statistic, p-value, CI
5. **Report effect size**: Cohen's d, OR, RR, or regression coefficient
6. **Quantify uncertainty**: confidence/credible intervals
7. **Check robustness**: sensitivity analysis, alternative specifications
8. **Communicate clearly**: distinguish statistical from practical significance

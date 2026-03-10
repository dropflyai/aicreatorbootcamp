# Hypothesis Testing — Complete Framework

## Overview

Hypothesis testing is the formal framework for using data to make decisions about
population parameters. This module covers the complete toolkit: parametric and non-parametric
tests, multiple comparison corrections, effect size quantification, and practical
guidelines for choosing the right test. Every test must report effect sizes and confidence
intervals alongside p-values.

References: Casella & Berger (Statistical Inference), Wasserman (All of Statistics),
Lehmann & Romano (Testing Statistical Hypotheses, 3rd ed.), Cumming (Understanding The
New Statistics: Effect Sizes, Confidence Intervals, and Meta-Analysis).

---

## The Neyman-Pearson Framework

### Setup

1. **State hypotheses:**
   - H0 (null): The default assumption (typically "no effect")
   - H1 (alternative): The claim to be tested

2. **Choose significance level alpha** (Type I error rate, typically 0.05)

3. **Compute test statistic** from data

4. **Determine rejection region** or compute p-value

5. **Make decision:** Reject H0 if p-value < alpha

### Critical Distinction

**Statistical significance != Practical significance**

A p-value of 0.001 with an effect size of 0.01 standard deviations means:
- You have strong evidence the effect is non-zero
- The effect is too small to matter practically

Always report: effect size, confidence interval, and sample size alongside the p-value.

---

## Parametric Tests

### One-Sample t-test

**Purpose:** Test whether a population mean equals a hypothesized value.

**Hypotheses:** H0: mu = mu_0 vs H1: mu != mu_0 (two-sided)

**Test statistic:** t = (x-bar - mu_0) / (s / sqrt(n))

**Distribution under H0:** t ~ t(n-1) (Student's t with n-1 degrees of freedom)

**Assumptions:**
- Data are independent
- Data are approximately Normal (robust for n >= 30 via CLT)

**Effect size:** Cohen's d = (x-bar - mu_0) / s
- Small: d = 0.2, Medium: d = 0.5, Large: d = 0.8 (Cohen, 1988)
- Use these conventions cautiously; domain context matters more

### Two-Sample t-test

**Purpose:** Compare means of two independent groups.

**Equal variance (pooled) version:**
t = (x-bar_1 - x-bar_2) / (s_p * sqrt(1/n_1 + 1/n_2))
where s_p = sqrt(((n_1-1)*s_1^2 + (n_2-1)*s_2^2) / (n_1 + n_2 - 2))
df = n_1 + n_2 - 2

**Unequal variance (Welch's) version:**
t = (x-bar_1 - x-bar_2) / sqrt(s_1^2/n_1 + s_2^2/n_2)
df approximated by Welch-Satterthwaite equation

**Recommendation:** Always use Welch's t-test. It is robust to unequal variances and
reduces to the pooled version when variances are equal. There is no practical reason
to use the pooled version (Ruxton, 2006).

**Effect size:** Cohen's d = (x-bar_1 - x-bar_2) / s_pooled

### Paired t-test

**Purpose:** Compare means of matched or repeated-measure observations.

**Test statistic:** t = d-bar / (s_d / sqrt(n)), where d_i = x_{1i} - x_{2i}

**When to use:** Before/after measurements, matched pairs, repeated measures.
More powerful than independent two-sample test when pairing is meaningful.

### One-Way ANOVA (Analysis of Variance)

**Purpose:** Compare means of 3+ independent groups simultaneously.

**Hypotheses:** H0: mu_1 = mu_2 = ... = mu_k vs H1: at least one differs

**Test statistic:** F = MS_between / MS_within
- MS_between = SS_between / (k - 1) [variance between group means]
- MS_within = SS_within / (N - k) [variance within groups]
- Under H0: F ~ F(k-1, N-k)

**Assumptions:**
- Independence of observations
- Normality within groups (robust for moderate violations with balanced designs)
- Homogeneity of variance (Levene's test; use Welch's ANOVA if violated)

**Effect size:** eta-squared = SS_between / SS_total
- Partial eta-squared for factorial designs
- Omega-squared is less biased: omega^2 = (SS_between - (k-1)*MS_within) / (SS_total + MS_within)

**Post-hoc tests** (after significant ANOVA):
- Tukey HSD: controls familywise error rate, all pairwise comparisons
- Dunnett: comparisons against a control group
- Scheff: most conservative, for arbitrary contrasts

### Two-Way ANOVA

**Purpose:** Examine effects of two factors and their interaction.

**Model:** Y_{ijk} = mu + alpha_i + beta_j + (alpha*beta)_{ij} + epsilon_{ijk}

**Tests three hypotheses:**
1. Main effect of Factor A: all alpha_i = 0
2. Main effect of Factor B: all beta_j = 0
3. Interaction: all (alpha*beta)_{ij} = 0

**Interpretation priority:** Always examine the interaction first. If significant,
main effects are not directly interpretable (they depend on the level of the other factor).

---

## Tests for Proportions and Categorical Data

### Chi-Squared Test of Independence

**Purpose:** Test whether two categorical variables are independent.

**Test statistic:** chi^2 = sum_{i,j} (O_{ij} - E_{ij})^2 / E_{ij}
- O_{ij} = observed count in cell (i, j)
- E_{ij} = (row_i_total * col_j_total) / N
- Under H0: chi^2 ~ chi^2((r-1)(c-1))

**Assumptions:** Expected counts >= 5 in each cell (use Fisher's exact test otherwise)

**Effect size:** Cramer's V = sqrt(chi^2 / (N * min(r-1, c-1)))
- V in [0, 1], where 0 = no association, 1 = perfect association

### Chi-Squared Goodness-of-Fit

**Purpose:** Test whether observed frequencies match expected frequencies.

**Test statistic:** chi^2 = sum_i (O_i - E_i)^2 / E_i, df = k - 1 - p
where p = number of estimated parameters

### Fisher's Exact Test

**Purpose:** Test independence in a 2x2 contingency table with small samples.

**Method:** Exact computation of probability under the hypergeometric distribution.
No minimum expected count requirement. Preferred when any expected count < 5.

**Effect size:** Odds ratio = (a*d) / (b*c) for 2x2 table [[a,b],[c,d]]

### Two-Proportion Z-test

**Purpose:** Compare proportions between two groups.

**Test statistic:** z = (p1-hat - p2-hat) / sqrt(p-hat*(1-p-hat)*(1/n1 + 1/n2))
where p-hat = (x1 + x2) / (n1 + n2) is the pooled proportion.

**Confidence interval for difference:** (p1-hat - p2-hat) +/- z_{alpha/2} * SE

---

## Non-Parametric Tests

### Mann-Whitney U Test (Wilcoxon Rank-Sum)

**Purpose:** Compare two independent groups without normality assumption.

**How it works:** Ranks all observations, computes sum of ranks in each group.
Tests whether one group tends to have larger values than the other.

**Effect size:** r = Z / sqrt(N) or rank-biserial correlation

### Wilcoxon Signed-Rank Test

**Purpose:** Paired comparison without normality assumption.

**How it works:** Ranks the absolute differences, applies signs, sums positive and
negative ranks. Tests symmetry of difference distribution around zero.

### Kruskal-Wallis Test

**Purpose:** Non-parametric alternative to one-way ANOVA (3+ groups).

**Post-hoc:** Dunn's test with Bonferroni or Holm correction.

### Kolmogorov-Smirnov Test

**Purpose:** Test whether two samples come from the same distribution (two-sample)
or whether a sample comes from a specified distribution (one-sample).

**Test statistic:** D = max_x |F_1(x) - F_2(x)| (maximum difference between ECDFs)

**Use in data science:** Testing for data drift between training and serving distributions.

---

## Multiple Comparisons

### The Problem

When conducting m tests at alpha = 0.05:
P(at least one false positive) = 1 - (1 - alpha)^m

For m = 20 tests: P(at least one false positive) = 1 - 0.95^20 = 0.64

This is catastrophic for any analysis involving many comparisons (e.g., testing 50
features, comparing 10 segments, running 20 metric tests in an A/B test).

### Familywise Error Rate (FWER) Control

**Bonferroni correction:** alpha_adjusted = alpha / m
- Most conservative. Reject if p_i < alpha/m.
- Simple but overly conservative for large m.

**Holm-Sidak (step-down):** Order p-values: p_(1) <= p_(2) <= ... <= p_(m)
- Reject H_(i) if p_(i) < alpha / (m - i + 1) (proceed until first non-rejection)
- Uniformly more powerful than Bonferroni. No reason to ever use Bonferroni over Holm.

**Sidak correction:** alpha_adjusted = 1 - (1 - alpha)^(1/m)
- Less conservative than Bonferroni. Assumes independence.

### False Discovery Rate (FDR) Control

**Benjamini-Hochberg procedure:**
1. Order p-values: p_(1) <= p_(2) <= ... <= p_(m)
2. Find the largest k such that p_(k) <= (k/m) * alpha
3. Reject H_(1), ..., H_(k)

FDR = E[false positives / total rejections]

**When to use FDR vs FWER:**
- FWER when any false positive is costly (clinical trials, regulatory decisions)
- FDR when some false positives are acceptable (genomics, feature screening, exploratory analysis)

### Practical Recommendation

```
1. Pre-register the primary hypothesis (no correction needed for one test)
2. Designate secondary hypotheses (apply Holm correction)
3. Exploratory analyses (apply Benjamini-Hochberg, clearly label as exploratory)
4. Report ALL tests conducted, not just significant ones
```

---

## Power Analysis

### Definition

Power = P(reject H0 | H1 is true) = 1 - beta

Power depends on four quantities (fix any three to determine the fourth):
1. Effect size (delta)
2. Sample size (n)
3. Significance level (alpha)
4. Power (1 - beta)

### Sample Size Formulas

**Two-sample t-test (per group):**
n = 2 * ((z_{alpha/2} + z_{beta}) / delta)^2 * sigma^2

where delta = mu_1 - mu_2 (minimum detectable effect)

**Two-proportion test (per group):**
n = (z_{alpha/2} * sqrt(2*p-bar*(1-p-bar)) + z_{beta} * sqrt(p_1*(1-p_1) + p_2*(1-p_2)))^2 / (p_1 - p_2)^2

### Practical Guidelines

- **Minimum recommended power:** 0.80 (Cohen, 1988). Prefer 0.90 for important decisions.
- **Always compute power before data collection.** Post-hoc power analysis is meaningless
  (Hoenig & Heisey, 2001): observed power is a monotonic function of the p-value.
- **Use the minimum practically meaningful effect size,** not the expected effect size.
- **Account for multiple comparisons** in the power calculation.
- **Account for dropout, non-compliance, and measurement error** by inflating n.

### Power for A/B Tests

For a proportion metric with baseline p and minimum detectable effect delta:
n_per_group = 16 * p * (1-p) / delta^2 (approximate, at alpha=0.05, power=0.80)

Example: baseline conversion = 5%, MDE = 0.5% (relative lift of 10%):
n = 16 * 0.05 * 0.95 / 0.005^2 = 30,400 per group

This is why large A/B tests need millions of users for small effect sizes.

---

## Reporting Standards

### What to Always Report

1. **Test name and type** (e.g., "Welch's two-sample t-test, two-sided")
2. **Test statistic and degrees of freedom** (e.g., t(148) = 2.34)
3. **p-value** (exact, not "p < 0.05"; e.g., p = 0.021)
4. **Effect size with confidence interval** (e.g., Cohen's d = 0.38, 95% CI [0.05, 0.71])
5. **Sample sizes** for each group
6. **Assumption checks** performed and results

### What NOT to Do

- Do NOT report only "significant" or "not significant"
- Do NOT report p < 0.05 without the exact value
- Do NOT interpret non-significance as evidence of no effect (absence of evidence != evidence of absence)
- Do NOT run additional tests after seeing results without adjusting for multiplicity
- Do NOT confuse statistical significance with practical importance

---

**Every hypothesis test in the Data Brain follows this framework. No exceptions.**

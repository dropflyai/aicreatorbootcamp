# Probability and Statistics — Foundations

## Overview

Probability theory and statistics form the mathematical bedrock of all data science.
Probability provides the language for reasoning under uncertainty; statistics provides
the tools for drawing conclusions from data. This module covers both Bayesian and
frequentist frameworks, key distributions, and the inferential machinery that
underpins every analysis the Data Brain produces.

References: DeGroot & Schervish (Probability and Statistics, 4th ed.), Casella & Berger
(Statistical Inference, 2nd ed.), Wasserman (All of Statistics).

---

## Probability Axioms and Foundations

### Kolmogorov Axioms

For a sample space Omega with event algebra F:

1. **Non-negativity:** P(A) >= 0 for all A in F
2. **Normalization:** P(Omega) = 1
3. **Countable Additivity:** For mutually exclusive events A_1, A_2, ...:
   P(union A_i) = sum P(A_i)

### Conditional Probability

P(A | B) = P(A intersect B) / P(B), provided P(B) > 0

This is the foundation of Bayesian reasoning. The act of conditioning on observed data
transforms prior beliefs into posterior beliefs.

### Bayes' Theorem

```
P(theta | data) = P(data | theta) * P(theta) / P(data)

Where:
  P(theta | data)  = posterior (what we want)
  P(data | theta)  = likelihood (model of data generation)
  P(theta)         = prior (beliefs before data)
  P(data)          = evidence / marginal likelihood (normalizing constant)
```

The posterior is proportional to the likelihood times the prior:
P(theta | data) is proportional to L(theta) * P(theta)

### Law of Total Probability

P(A) = sum_i P(A | B_i) * P(B_i), where {B_i} is a partition of Omega.

Essential for marginalizing over latent variables in mixture models, hidden Markov
models, and Bayesian networks.

### Independence

Events A and B are independent iff P(A intersect B) = P(A) * P(B).
Conditional independence: A is independent of B given C iff P(A | B, C) = P(A | C).

Conditional independence is the backbone of graphical models (Pearl, 2009; Koller &
Friedman, 2009) and is what makes Bayesian networks tractable.

---

## Key Probability Distributions

### Discrete Distributions

**Bernoulli(p):** Single binary trial. P(X=1) = p, P(X=0) = 1-p.
- Mean: p, Variance: p(1-p)
- Use: Modeling binary outcomes (click/no-click, convert/no-convert)

**Binomial(n, p):** Number of successes in n independent Bernoulli trials.
- P(X=k) = C(n,k) * p^k * (1-p)^(n-k)
- Mean: np, Variance: np(1-p)
- Use: Conversion rates, A/B test success counts

**Poisson(lambda):** Count of events in a fixed interval when events occur independently
at constant rate.
- P(X=k) = lambda^k * e^(-lambda) / k!
- Mean: lambda, Variance: lambda
- Use: Event counts (page views per hour, support tickets per day)
- Arises as limit of Binomial when n is large and p is small

**Negative Binomial(r, p):** Number of trials needed to achieve r successes.
- Generalizes geometric distribution (r=1)
- Overdispersed alternative to Poisson when Variance > Mean
- Use: Count data with overdispersion (common in biology, web analytics)

### Continuous Distributions

**Normal(mu, sigma^2):** The Gaussian distribution. Central via the Central Limit Theorem.
- f(x) = (1 / sqrt(2*pi*sigma^2)) * exp(-(x-mu)^2 / (2*sigma^2))
- Mean: mu, Variance: sigma^2
- Use: Measurement errors, aggregate metrics, residual modeling
- CLT: Sum of n iid random variables approaches Normal as n grows, regardless of
  underlying distribution (provided finite variance)

**Exponential(lambda):** Time between events in a Poisson process.
- f(x) = lambda * exp(-lambda*x) for x >= 0
- Mean: 1/lambda, Variance: 1/lambda^2
- Memoryless property: P(X > s+t | X > s) = P(X > t)
- Use: Time-to-event, inter-arrival times

**Beta(alpha, beta):** Distribution over [0, 1]. Conjugate prior for Bernoulli/Binomial.
- Mean: alpha / (alpha + beta)
- Variance: alpha*beta / ((alpha+beta)^2 * (alpha+beta+1))
- Use: Modeling probabilities, conversion rates (Bayesian A/B testing)
- alpha = beta = 1 gives Uniform(0,1) (uninformative prior)

**Gamma(alpha, beta):** Generalization of exponential. Conjugate prior for Poisson rate.
- Mean: alpha/beta, Variance: alpha/beta^2
- Use: Modeling positive continuous quantities, waiting times

**Student's t(nu):** Heavier tails than Normal. Used when estimating mean with unknown
variance from small samples.
- nu = degrees of freedom. As nu -> infinity, t -> Normal
- Use: t-tests, robust regression, small-sample inference

**Chi-squared(k):** Sum of k squared standard Normal variables.
- Mean: k, Variance: 2k
- Use: Goodness-of-fit tests, variance estimation, chi-squared tests of independence

---

## Frequentist vs. Bayesian Frameworks

### Frequentist Framework

**Philosophy:** Probability is the long-run frequency of events. Parameters are fixed
but unknown. Inference proceeds by reasoning about the sampling distribution of estimators.

**Key Tools:**
- Point estimators (MLE, method of moments)
- Confidence intervals
- Hypothesis tests (Neyman-Pearson framework)
- p-values

**Strengths:**
- Well-understood theoretical properties (consistency, efficiency, sufficiency)
- No need to specify prior distributions
- Straightforward interpretation for well-designed experiments

**Limitations:**
- Cannot directly express probability of hypotheses
- p-values are widely misinterpreted (Greenland et al., 2016)
- Confidence intervals have counter-intuitive interpretation
- Difficulty with small samples and complex hierarchical structures

### Bayesian Framework

**Philosophy:** Probability is a degree of belief. Parameters have distributions.
Inference proceeds by updating beliefs via Bayes' theorem.

**Key Tools:**
- Prior specification
- Posterior computation (analytical, MCMC, variational inference)
- Credible intervals
- Bayes factors
- Posterior predictive checks

**Strengths:**
- Direct probability statements about parameters: P(theta > 0 | data)
- Natural incorporation of prior knowledge
- Handles small samples gracefully
- Hierarchical models for complex data structures
- Sequential updating as new data arrives

**Limitations:**
- Prior specification can be controversial (subjectivity criticism)
- Computational cost for complex models
- Sensitivity to prior choice in low-data regimes
- Model comparison via Bayes factors can be sensitive to prior specification

### When to Use Which

| Scenario | Recommended | Rationale |
|----------|-------------|-----------|
| Large sample, well-designed experiment | Frequentist | Simple, well-understood, priors add little |
| Small sample, strong prior knowledge | Bayesian | Priors stabilize estimates |
| Sequential decisions (A/B testing) | Bayesian | Natural sequential updating |
| Hierarchical data (users within groups) | Bayesian | Hierarchical models are natural |
| Regulatory/compliance contexts | Frequentist | Established acceptance, no prior debates |
| Complex generative models | Bayesian | MCMC handles complex likelihoods |
| Quick exploratory analysis | Frequentist | Faster computation, simpler workflow |

---

## Estimation Theory

### Properties of Estimators

**Bias:** Bias(theta-hat) = E[theta-hat] - theta. An estimator is unbiased if Bias = 0.
- Sample mean is unbiased for population mean
- Sample variance with (n-1) denominator (Bessel's correction) is unbiased

**Consistency:** theta-hat_n converges in probability to theta as n -> infinity.
- MLE is consistent under regularity conditions

**Efficiency:** An estimator achieves the Cramer-Rao lower bound:
Var(theta-hat) >= 1 / (n * I(theta)), where I(theta) is Fisher information.

**Sufficiency:** A statistic T(X) is sufficient for theta if the distribution of X
given T(X) does not depend on theta. By the factorization theorem, T is sufficient iff
the joint density factors as f(x|theta) = g(T(x), theta) * h(x).

### Maximum Likelihood Estimation

The MLE maximizes:
L(theta) = product_i f(x_i | theta)

Equivalently, minimizes the negative log-likelihood:
-l(theta) = -sum_i log f(x_i | theta)

**Properties of MLE:**
- Consistent: theta-hat -> theta as n -> infinity
- Asymptotically normal: sqrt(n)(theta-hat - theta) -> N(0, I(theta)^(-1))
- Asymptotically efficient: achieves Cramer-Rao bound asymptotically
- Invariant: MLE of g(theta) is g(theta-hat) for any function g

**Limitations of MLE:**
- Can overfit with small samples (regularization needed)
- May not exist or may be on boundary of parameter space
- Sensitive to model misspecification

---

## Confidence Intervals and Hypothesis Tests

### Constructing Confidence Intervals

For a Normal population with known variance:
CI = x-bar +/- z_(alpha/2) * sigma / sqrt(n)

For unknown variance:
CI = x-bar +/- t_(alpha/2, n-1) * s / sqrt(n)

For proportions (large sample):
CI = p-hat +/- z_(alpha/2) * sqrt(p-hat * (1-p-hat) / n)

### Bootstrap Confidence Intervals

When analytical CIs are unavailable:
1. Resample n observations with replacement from the data, B times
2. Compute the statistic of interest for each resample
3. Use the empirical distribution of the statistic for inference

Methods:
- **Percentile bootstrap:** Use the alpha/2 and 1-alpha/2 quantiles directly
- **BCa (bias-corrected and accelerated):** Corrects for bias and skewness
- **Studentized bootstrap:** Accounts for non-constant variance

Bootstrap is distribution-free but requires:
- Observations to be independent (or block bootstrap for dependent data)
- Sufficient sample size (n >= 20 as rough minimum)
- The statistic to be smooth (median is problematic)

---

## The Central Limit Theorem and Its Limits

### Classical CLT

If X_1, ..., X_n are iid with mean mu and finite variance sigma^2:
sqrt(n) * (X-bar - mu) / sigma -> N(0, 1) as n -> infinity

### When CLT Applies Well
- n >= 30 for symmetric distributions
- n >= 100 for moderately skewed distributions
- Larger n needed for heavy-tailed or highly skewed distributions

### When CLT Fails
- Heavy-tailed distributions (e.g., Cauchy has no finite mean)
- Dependent observations (need CLT for dependent data or resampling methods)
- Discrete data with small counts (use exact tests instead)

### Practical Implications

The CLT justifies:
- Using Normal-based confidence intervals for sample means
- z-tests and t-tests for comparing means
- The Normal approximation to the Binomial for proportions

But always verify: Q-Q plots, Shapiro-Wilk test, or bootstrap as alternatives.

---

## Multivariate Statistics

### Multivariate Normal Distribution

X ~ N(mu, Sigma) where mu is a d-dimensional mean vector and Sigma is a d x d covariance matrix.

- Marginals are Normal
- Conditionals are Normal
- Linear transformations are Normal: AX + b ~ N(A*mu + b, A*Sigma*A^T)

The Mahalanobis distance: d(x) = sqrt((x - mu)^T * Sigma^(-1) * (x - mu))

Used in: outlier detection, discriminant analysis, Gaussian mixture models.

### Correlation vs. Causation

Pearson correlation r measures linear association: r = Cov(X,Y) / (SD(X) * SD(Y))

**Correlation does NOT imply causation because of:**
- Confounding variables (Z causes both X and Y)
- Reverse causation (Y causes X)
- Selection bias (conditioning on a collider)
- Simpson's paradox (aggregate trend reverses within subgroups)

See `02_statistical_inference/causal_inference.md` for methods to establish causation.

---

## Practical Decision Rules

### Choosing a Statistical Test

```
Comparing two group means:
  Independent groups + Normal + equal variance --> two-sample t-test
  Independent groups + Normal + unequal variance --> Welch's t-test
  Paired observations --> paired t-test
  Non-Normal or ordinal --> Mann-Whitney U (independent) / Wilcoxon signed-rank (paired)

Comparing 3+ group means:
  Normal + equal variance --> one-way ANOVA
  Non-Normal or ordinal --> Kruskal-Wallis
  Repeated measures --> repeated measures ANOVA or Friedman test

Testing proportions:
  Two groups --> chi-squared test or Fisher's exact (small n)
  Multiple groups --> chi-squared test of independence

Testing associations:
  Two continuous --> Pearson (linear) or Spearman (monotonic) correlation
  Categorical --> chi-squared test of independence or Cramer's V
```

### Sample Size Rules of Thumb

- Proportions: n >= 30 per group for large effects, n >= 400 for small effects
- Means: n >= 20 per group for large effects, n >= 200 for small effects
- Always prefer formal power analysis over rules of thumb
- Use Cohen's conventions cautiously: d=0.2 (small), d=0.5 (medium), d=0.8 (large)

---

**Statistical rigor is the foundation. Every analysis in the Data Brain starts here.**

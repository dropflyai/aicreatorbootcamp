# Bayesian Methods — Inference and Computation

## Overview

Bayesian inference provides a coherent framework for combining prior knowledge with
observed data to produce posterior distributions over parameters. Unlike frequentist
methods, Bayesian inference directly answers: "What is the probability of the hypothesis
given the data?" This module covers prior selection, posterior computation, MCMC methods,
conjugate families, hierarchical models, and model comparison.

References: Gelman et al. (Bayesian Data Analysis, 3rd ed.), McElreath (Statistical
Rethinking, 2nd ed.), Bishop (PRML, Chapters 2-3), Murphy (Machine Learning: A
Probabilistic Perspective).

---

## The Bayesian Framework

### Bayes' Theorem for Parameters

```
P(theta | D) = P(D | theta) * P(theta) / P(D)

posterior = (likelihood * prior) / evidence
```

Where:
- **theta:** Parameters of interest
- **D:** Observed data
- **P(theta):** Prior distribution (beliefs before seeing data)
- **P(D | theta):** Likelihood function (how the data arise given parameters)
- **P(D):** Marginal likelihood / evidence = integral P(D | theta) * P(theta) d_theta
- **P(theta | D):** Posterior distribution (updated beliefs)

### The Evidence (Marginal Likelihood)

P(D) = integral P(D | theta) * P(theta) d_theta

This integral is often intractable, which is why:
- Conjugate priors give closed-form posteriors (evidence cancels)
- MCMC methods sample from the posterior without computing P(D)
- Variational inference approximates the posterior

### Posterior Summarization

**Point estimates:**
- **Posterior mean:** E[theta | D] = integral theta * P(theta | D) d_theta (minimizes MSE)
- **Posterior mode (MAP):** argmax_theta P(theta | D) (equivalent to regularized MLE)
- **Posterior median:** minimizes mean absolute error

**Interval estimates:**
- **Credible interval:** P(a < theta < b | D) = 0.95
  - Equal-tailed: 2.5th and 97.5th percentiles
  - Highest Posterior Density (HPD): shortest interval containing 95% of the posterior mass

Unlike frequentist confidence intervals, credible intervals have the intuitive
interpretation: "There is a 95% probability the parameter is in this interval."

---

## Prior Distributions

### Types of Priors

**Informative priors:** Encode specific prior knowledge.
- Previous experiments, expert knowledge, domain constraints
- Example: We know the conversion rate is roughly 3-7%, so Beta(30, 570)

**Weakly informative priors:** Constrain to a reasonable range without strong assumptions.
- Gelman recommends: Normal(0, sigma) with sigma chosen so that extreme values are plausible
- Example: For a regression coefficient, Normal(0, 10) says effects beyond +/- 20 are very unlikely

**Non-informative (reference) priors:** Attempt to "let the data speak."
- Flat/uniform: P(theta) = constant (improper in unbounded spaces)
- Jeffreys prior: P(theta) is proportional to sqrt(det(I(theta))) (invariant under reparametrization)
- Warning: Non-informative in one parameterization may be informative in another

**Regularizing priors:** Prevent overfitting (equivalent to penalization).
- Normal(0, sigma^2) prior on coefficients = L2 regularization (Ridge) with lambda = 1/sigma^2
- Laplace(0, b) prior on coefficients = L1 regularization (Lasso)
- Horseshoe prior = adaptive shrinkage (sparse signal recovery)

### Prior Sensitivity Analysis

**Always check:**
1. How do results change with different reasonable priors?
2. Is the posterior dominated by the prior (too little data) or the likelihood (plenty of data)?
3. Are the prior predictive distributions sensible?

**Prior predictive check:** Simulate data from the prior. If the simulated data look
unreasonable, the prior is poorly specified.

---

## Conjugate Families

Conjugate priors yield closed-form posteriors, enabling exact Bayesian inference.

### Key Conjugate Pairs

| Likelihood | Prior | Posterior | Use Case |
|-----------|-------|-----------|----------|
| Bernoulli(p) | Beta(a, b) | Beta(a + sum(x), b + n - sum(x)) | Conversion rates |
| Binomial(n, p) | Beta(a, b) | Beta(a + x, b + n - x) | Success counts |
| Poisson(lambda) | Gamma(a, b) | Gamma(a + sum(x), b + n) | Event counts |
| Normal(mu, known sigma^2) | Normal(m, s^2) | Normal(m', s'^2) | Known-variance means |
| Normal(known mu, sigma^2) | Inverse-Gamma(a, b) | Inverse-Gamma(a', b') | Variance estimation |
| Normal(mu, sigma^2) | Normal-Inverse-Gamma | Normal-Inverse-Gamma | Mean and variance |
| Multinomial(p) | Dirichlet(a) | Dirichlet(a + counts) | Category probabilities |
| Exponential(lambda) | Gamma(a, b) | Gamma(a + n, b + sum(x)) | Rate parameters |

### Example: Beta-Binomial for A/B Testing

Prior: p ~ Beta(1, 1) (uniform, uninformative)
Data: 50 conversions out of 1000 visitors
Posterior: p | data ~ Beta(1 + 50, 1 + 950) = Beta(51, 951)

Posterior mean: 51/1002 = 0.0509
95% credible interval: [0.038, 0.066]

**For comparing two variants:**
P(p_B > p_A | data) = integral_{p_B > p_A} P(p_A | data_A) * P(p_B | data_B) dp_A dp_B

This can be computed analytically for Beta posteriors or via Monte Carlo sampling:
```
samples_A = Beta(a_A, b_A).sample(100000)
samples_B = Beta(a_B, b_B).sample(100000)
prob_B_better = mean(samples_B > samples_A)
```

---

## Markov Chain Monte Carlo (MCMC)

### Why MCMC

When the posterior has no closed form (non-conjugate models, complex likelihoods),
we need computational methods. MCMC generates correlated samples from the posterior
distribution by constructing a Markov chain whose stationary distribution is the target posterior.

### Metropolis-Hastings Algorithm

1. Initialize theta_0
2. For t = 1, 2, ..., T:
   a. Propose theta* from proposal distribution q(theta* | theta_{t-1})
   b. Compute acceptance ratio: alpha = min(1, [P(D|theta*) * P(theta*) * q(theta_{t-1}|theta*)] / [P(D|theta_{t-1}) * P(theta_{t-1}) * q(theta*|theta_{t-1})])
   c. Accept theta_t = theta* with probability alpha, else theta_t = theta_{t-1}

**Key properties:**
- Chain converges to the posterior regardless of initialization (ergodicity)
- Proposal distribution affects efficiency (too narrow = slow exploration, too wide = low acceptance)
- Need to discard burn-in samples and thin for autocorrelation

### Gibbs Sampling

A special case of Metropolis-Hastings where each parameter is sampled from its full
conditional distribution:

For parameters (theta_1, theta_2, ..., theta_k):
1. Sample theta_1 from P(theta_1 | theta_2, ..., theta_k, D)
2. Sample theta_2 from P(theta_2 | theta_1, theta_3, ..., theta_k, D)
3. ... continue for all parameters

**Advantages:** 100% acceptance rate, no tuning of proposal distributions.
**Requirement:** Full conditional distributions must be available (often from conjugacy).
**Limitation:** Slow mixing when parameters are highly correlated.

### Hamiltonian Monte Carlo (HMC)

Uses gradient information to propose distant states with high acceptance probability.

**Key idea:** Augment the parameter space with "momentum" variables. Simulate Hamiltonian
dynamics to propose new states, exploiting the geometry of the posterior.

**No-U-Turn Sampler (NUTS):** Adaptive HMC that eliminates the need to tune the number
of leapfrog steps. Default in Stan and PyMC.

**Advantages over Metropolis-Hastings:**
- Much more efficient in high dimensions
- Better mixing (explores posterior faster)
- Fewer samples needed for equivalent effective sample size

**Tools:** Stan (state-of-the-art HMC), PyMC (Python), NumPyro (JAX-based, very fast)

### MCMC Diagnostics

**Convergence diagnostics (CRITICAL - never skip these):**

| Diagnostic | What It Checks | Threshold |
|-----------|---------------|-----------|
| R-hat (Gelman-Rubin) | Between-chain vs within-chain variance | R-hat < 1.01 |
| Effective Sample Size (ESS) | Independent information in correlated samples | ESS > 400 |
| Trace plots | Visual check for mixing and stationarity | No trends, good mixing |
| Rank plots | Distribution of ranks across chains | Uniform |
| Divergent transitions | Numerical issues in HMC | Zero divergences |

**If diagnostics fail:**
- Increase number of iterations
- Reparametrize the model (non-centered parameterization for hierarchical models)
- Use stronger priors to constrain the posterior
- Increase adapt_delta in Stan (target acceptance rate)
- Simplify the model

---

## Hierarchical (Multilevel) Models

### Motivation

Data often has natural grouping structure:
- Students within schools
- Users within regions
- Measurements within subjects

**Three approaches:**
1. **Complete pooling:** Ignore groups, fit one model (underfits group variation)
2. **No pooling:** Fit separate models per group (overfits small groups)
3. **Partial pooling (hierarchical):** Share information across groups via a common prior

### Structure

```
Hyperprior:    mu_0, sigma_0 ~ prior
Group-level:   mu_j ~ Normal(mu_0, sigma_0)    for j = 1, ..., J
Observation:   y_{ij} ~ Normal(mu_j, sigma)    for i = 1, ..., n_j
```

**Shrinkage:** Groups with less data are pulled more toward the overall mean.
Groups with more data retain their individual estimates. This is optimal under
squared error loss (James-Stein estimation).

### Non-Centered Parameterization

For efficient sampling in HMC, reparametrize:

**Centered:** mu_j ~ Normal(mu_0, sigma_0) [samples mu_j directly]
**Non-centered:** mu_j = mu_0 + sigma_0 * eta_j, where eta_j ~ Normal(0, 1)

Non-centered parameterization reduces the correlation between group effects and
hyperparameters, dramatically improving sampling efficiency (especially when n_j is small).

---

## Bayesian Model Comparison

### Bayes Factor

BF_{12} = P(D | M_1) / P(D | M_2) = evidence_1 / evidence_2

| BF_{12} | Evidence for M_1 |
|---------|-----------------|
| 1-3 | Barely worth mentioning |
| 3-10 | Substantial |
| 10-30 | Strong |
| 30-100 | Very strong |
| > 100 | Decisive |

(Kass & Raftery, 1995)

**Caution:** Bayes factors are sensitive to prior specification, especially for continuous
parameters. Use with care and always perform sensitivity analysis.

### Information Criteria

**WAIC (Widely Applicable Information Criterion):**
WAIC = -2 * (lppd - p_WAIC)
- lppd = log pointwise predictive density (Bayesian measure of fit)
- p_WAIC = effective number of parameters (Bayesian complexity penalty)
- Asymptotically equivalent to leave-one-out cross-validation

**LOO-CV (Leave-One-Out Cross-Validation):**
Approximated efficiently via Pareto-Smoothed Importance Sampling (PSIS-LOO).
More reliable than WAIC in practice. Implemented in the `loo` R package and `arviz` in Python.

### Posterior Predictive Checks

**The most practical model checking tool:**
1. Simulate new data from the posterior predictive distribution: y_rep ~ P(y | D)
2. Compare simulated data to observed data using test statistics
3. If systematic discrepancies exist, the model is misspecified

**Test statistics to check:**
- Mean, variance, skewness, kurtosis
- Min, max, range
- Domain-specific statistics (e.g., proportion of zeros for zero-inflated data)

---

## Practical Bayesian Workflow

### Gelman et al. (2020) Recommended Workflow

1. **Write a generative model** for the data-generating process
2. **Simulate data** from the model to verify the code works
3. **Run prior predictive checks** to verify priors are reasonable
4. **Fit the model** to observed data
5. **Check MCMC diagnostics** (R-hat, ESS, divergences)
6. **Run posterior predictive checks** for model adequacy
7. **Interpret results** with uncertainty
8. **Perform sensitivity analysis** on priors and model choices

### When to Use Bayesian Methods

| Use Bayesian When | Use Frequentist When |
|-------------------|---------------------|
| Strong prior information exists | Priors are controversial or unknown |
| Sample sizes are small | Sample sizes are large (priors wash out) |
| Sequential decisions are needed | One-shot analysis is sufficient |
| Hierarchical structure exists | Data are independently distributed |
| Direct probability statements are needed | Regulatory standards require frequentist tests |
| Complex generative models are appropriate | Simple parametric tests suffice |

---

**Bayesian inference is not a competitor to frequentist methods; it is a complementary
framework. The Data Brain uses whichever is appropriate for the problem at hand.**

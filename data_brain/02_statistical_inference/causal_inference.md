# Causal Inference — Methods and Frameworks

## Overview

Causal inference is the science of determining whether and how X causes Y, as opposed
to merely being associated with Y. This is arguably the most important and most
frequently violated principle in data science: correlation does not imply causation.
This module covers the two major frameworks (potential outcomes and structural causal
models), experimental methods, and quasi-experimental designs for when randomization
is impossible.

References: Pearl (Causality, 2nd ed.), Imbens & Rubin (Causal Inference for Statistics,
Social, and Biomedical Sciences), Angrist & Pischke (Mostly Harmless Econometrics),
Hernan & Robins (Causal Inference: What If), Cunningham (Causal Inference: The Mixtape).

---

## Two Frameworks for Causality

### Potential Outcomes Framework (Rubin Causal Model)

For each unit i and binary treatment W_i in {0, 1}:
- Y_i(1) = potential outcome if treated
- Y_i(0) = potential outcome if not treated
- Individual treatment effect: tau_i = Y_i(1) - Y_i(0)

**The Fundamental Problem of Causal Inference:**
We can never observe both Y_i(1) and Y_i(0) for the same unit. We observe:
Y_i = W_i * Y_i(1) + (1 - W_i) * Y_i(0)

**Target estimands:**
- **ATE (Average Treatment Effect):** E[Y(1) - Y(0)] — effect across the population
- **ATT (Average Treatment Effect on the Treated):** E[Y(1) - Y(0) | W=1]
- **ATU (Average Treatment Effect on the Untreated):** E[Y(1) - Y(0) | W=0]
- **CATE (Conditional Average Treatment Effect):** E[Y(1) - Y(0) | X=x]

### Structural Causal Models (Pearl's Framework)

A Structural Causal Model (SCM) consists of:
1. A set of endogenous variables V
2. A set of exogenous variables U (external, unobserved)
3. A set of structural equations: V_i = f_i(pa_i, U_i)
4. A distribution over U

**Directed Acyclic Graphs (DAGs):** Visual representation of causal relationships.
- Nodes = variables
- Directed edges = direct causal effects
- Missing edges = assumed no direct effect

**The do-operator:** P(Y | do(X = x)) is the distribution of Y when X is set to x
by intervention, not observation. This differs from P(Y | X = x) when confounders exist.

### Confounding and the Adjustment Formula

If Z is a sufficient set of confounders (satisfies the backdoor criterion):
P(Y | do(X)) = sum_z P(Y | X, Z=z) * P(Z=z)

**Backdoor Criterion:** A set Z satisfies the backdoor criterion relative to (X, Y) if:
1. No node in Z is a descendant of X
2. Z blocks every path between X and Y that contains an arrow into X

### Key Causal Structures

**Fork (Confounder):** X <- Z -> Y
- Z confounds the relationship between X and Y
- Controlling for Z removes confounding
- Example: Ice cream sales (X) and drowning (Y) are both caused by temperature (Z)

**Chain (Mediator):** X -> Z -> Y
- Z mediates the effect of X on Y
- Controlling for Z blocks the causal path (DO NOT control for mediators to estimate total effect)
- Example: Education (X) -> Income (Z) -> Health (Y)

**Collider:** X -> Z <- Y
- X and Y are independent, but conditioning on Z induces a spurious association
- DO NOT control for colliders
- Example: Talent (X) -> Admission (Z) <- Effort (Y). Among admitted students (conditioning on Z), talent and effort appear negatively correlated (Berkson's paradox)

**Selection Bias:** A form of collider bias where the conditioning is on a variable
affected by both treatment and outcome (or their causes).

---

## Randomized Controlled Trials (RCTs)

### Why Randomization Works

Random assignment ensures:
- E[Y(0) | W=1] = E[Y(0) | W=0] (potential outcomes are independent of treatment)
- All confounders (observed and unobserved) are balanced in expectation
- Simple difference in means is an unbiased estimator of ATE:
  ATE-hat = mean(Y | W=1) - mean(Y | W=0)

### Threats to Internal Validity

| Threat | Description | Mitigation |
|--------|-------------|-----------|
| Non-compliance | Units don't follow assignment | Intent-to-treat analysis, IV with LATE |
| Attrition | Units drop out differentially | Bounds analysis, sensitivity analysis |
| Spillover (SUTVA violation) | Treatment affects control units | Cluster randomization, spatial buffers |
| Novelty effects | Short-term behavior change | Longer experiments |
| Hawthorne effect | Behavior changes from being observed | Blinding |
| Experimenter demand | Users guess the hypothesis | Double-blinding |

### SUTVA (Stable Unit Treatment Value Assumption)

1. No interference: Y_i(w) depends only on w_i, not on other units' treatment assignments
2. No hidden variations: treatment is the same for all treated units

SUTVA is violated in network/social settings. Solutions: cluster randomization, network
experiments (Eckles et al., 2017).

---

## Quasi-Experimental Methods

### Instrumental Variables (IV)

**When to use:** Treatment is endogenous (confounded), but an instrument Z exists.

**Requirements for a valid instrument:**
1. **Relevance:** Z is correlated with the treatment X (first-stage F > 10)
2. **Exclusion restriction:** Z affects Y only through X (untestable)
3. **Independence:** Z is independent of unobserved confounders (untestable)

**Two-Stage Least Squares (2SLS):**
- Stage 1: X-hat = alpha_0 + alpha_1 * Z + epsilon_1 (predict X from Z)
- Stage 2: Y = beta_0 + beta_1 * X-hat + epsilon_2 (regress Y on predicted X)

**LATE (Local Average Treatment Effect):**
IV estimates the effect for "compliers" — units whose treatment changes with the instrument.
Not the ATE unless there is full compliance. This is a critical distinction often overlooked.

**Classic examples:**
- Vietnam draft lottery (instrument) -> military service (treatment) -> earnings (outcome)
- Distance to college (instrument) -> education (treatment) -> earnings (outcome)

### Difference-in-Differences (DiD)

**When to use:** A policy or treatment affects one group at a specific time, with an
unaffected comparison group.

**Setup:**
| | Pre-treatment | Post-treatment |
|---|---|---|
| Treatment group | A | B |
| Control group | C | D |

**DiD estimator:** (B - A) - (D - C) = treatment effect

**Key assumption: Parallel trends**
In the absence of treatment, treatment and control groups would have followed the
same trend. This is untestable but can be supported by:
- Pre-treatment trend comparison (should be parallel)
- Placebo tests in pre-treatment periods
- Event study plots showing no pre-trends

**Extensions:**
- Staggered adoption: treatment starts at different times for different groups
  (Callaway & Sant'Anna, 2021; Sun & Abraham, 2021)
- Two-way fixed effects is problematic with staggered treatment (Goodman-Bacon, 2021)

### Regression Discontinuity Design (RDD)

**When to use:** Treatment is assigned based on whether a running variable R crosses
a cutoff c. Units just above and just below the cutoff are quasi-randomly assigned.

**Sharp RDD:** Treatment deterministically assigned at cutoff.
tau_RDD = lim_{r -> c+} E[Y | R=r] - lim_{r -> c-} E[Y | R=r]

**Fuzzy RDD:** Cutoff changes probability of treatment (like an IV at the cutoff).

**Implementation:**
- Local linear regression: fit separate lines on each side of the cutoff
- Bandwidth selection: Imbens-Kalyanaraman optimal bandwidth
- Robustness: Test sensitivity to bandwidth choice, polynomial degree
- Placebo tests: test for discontinuities at non-cutoff points

**Validity checks:**
- No manipulation of the running variable (McCrary density test)
- No discontinuity in baseline covariates at the cutoff
- Smooth density of the running variable at the cutoff

### Propensity Score Methods

**Propensity score:** e(X) = P(W=1 | X) — the probability of treatment given covariates.

**Rosenbaum & Rubin (1983) theorem:** If treatment assignment is strongly ignorable
given X, it is also strongly ignorable given e(X). This reduces a high-dimensional
matching problem to a one-dimensional one.

**Methods:**

**Propensity Score Matching:**
1. Estimate e(X) via logistic regression or ML
2. Match treated units to control units with similar e(X)
3. Estimate ATE from the matched sample
- Risk: poor matches, discarding unmatched units, sensitivity to caliper choice

**Inverse Probability Weighting (IPW):**
ATE = (1/n) * sum_i [W_i * Y_i / e(X_i) - (1-W_i) * Y_i / (1-e(X_i))]
- More efficient than matching but sensitive to extreme propensity scores
- Trimming or truncation of extreme weights is recommended
- Doubly robust estimators combine IPW with outcome modeling

**Subclassification:** Stratify on propensity score quintiles, estimate effect within
each stratum, average across strata.

**Critical limitation:** Propensity score methods only control for OBSERVED confounders.
Unobserved confounders remain. Always conduct sensitivity analysis (Rosenbaum bounds).

---

## Heterogeneous Treatment Effects

### Conditional Average Treatment Effect (CATE)

CATE(x) = E[Y(1) - Y(0) | X = x]

Understanding who benefits most (or is harmed) is often more valuable than the ATE.

### Methods for CATE Estimation

**Causal Forests (Athey & Imbens, 2016; Wager & Athey, 2018):**
- Extension of random forests for treatment effect estimation
- Honest estimation: separate sample for tree building and effect estimation
- Provides valid confidence intervals for CATE
- Implementation: `grf` (R), `econml` (Python)

**Meta-Learners:**
- **T-learner:** Fit separate outcome models for treated and control, take difference
- **S-learner:** Fit one model with treatment as a feature
- **X-learner:** Two-stage approach, better with imbalanced treatment groups
- **DR-learner:** Doubly robust, combines propensity and outcome models

**Double Machine Learning (Chernozhukov et al., 2018):**
Combines ML for nuisance parameters with classical inference for the causal parameter.
Uses cross-fitting to avoid overfitting bias. Implementation: `econml`, `DoubleML`.

---

## Sensitivity Analysis

### Why Sensitivity Analysis is Non-Negotiable

Every observational causal estimate relies on untestable assumptions. Sensitivity
analysis quantifies: "How strong would an unobserved confounder need to be to
explain away the estimated effect?"

### Methods

**Rosenbaum Bounds:** For matched designs, quantify how much an unobserved confounder
would need to change treatment odds to alter the conclusion. Gamma = 2 means an
unobserved factor would need to double the odds of treatment.

**E-value (VanderWeele & Ding, 2017):** The minimum strength of association that an
unmeasured confounder would need to have with both treatment and outcome to explain
away the observed effect. Higher E-values indicate more robust findings.

**Omitted Variable Bias (Oster, 2019):** Bounds on the bias from unobserved confounders
based on how coefficient stability changes as observed controls are added.

---

## Decision Framework

```
Can you randomize?
  YES --> RCT (gold standard)
  NO  --> Is there a natural cutoff for treatment assignment?
           YES --> Regression Discontinuity Design
           NO  --> Is there a plausible instrument?
                    YES --> Instrumental Variables
                    NO  --> Is there a pre/post with comparison group?
                             YES --> Difference-in-Differences
                             NO  --> Propensity Score Methods (weaker, always do sensitivity analysis)
```

---

**Correlation is description. Causation is mechanism. The Data Brain never confuses the two.**

# Econometrics — Formal Foundations

## Overview

This file provides PhD-level econometrics theory underlying the MBA Brain's modules on analytics and decisions (02) and labs/simulations (17). It covers OLS regression, instrumental variables, panel data, and modern causal inference methods.

**Key references:**
- Wooldridge, J. M. (2010). *Econometric Analysis of Cross Section and Panel Data* (2nd ed.). MIT Press.
- Angrist, J. D., & Pischke, J.-S. (2009). *Mostly Harmless Econometrics*. Princeton University Press.
- Angrist, J. D., & Pischke, J.-S. (2014). *Mastering 'Metrics*. Princeton University Press.
- Greene, W. H. (2018). *Econometric Analysis* (8th ed.). Pearson.
- Imbens, G. W., & Rubin, D. B. (2015). *Causal Inference for Statistics, Social, and Biomedical Sciences*. Cambridge University Press.

---

## 1. The Linear Regression Model

### 1.1 Setup

The population model:

```
y = X beta + epsilon
```

where:
- y is an n x 1 vector of outcomes
- X is an n x k matrix of regressors (first column typically a vector of ones for the intercept)
- beta is a k x 1 vector of unknown parameters
- epsilon is an n x 1 vector of error terms

### 1.2 OLS Estimator

The OLS estimator minimizes the sum of squared residuals:

```
beta_hat = argmin_b (y - Xb)'(y - Xb)
```

First-order condition:

```
X'(y - X beta_hat) = 0
```

Solution:

```
beta_hat = (X'X)^{-1} X'y
```

Requires X'X to be invertible (no perfect multicollinearity).

### 1.3 Gauss-Markov Assumptions

**Classical assumptions for the linear model:**

**A1. Linearity:** y = X beta + epsilon (the model is correctly specified)

**A2. Random sampling:** The observations (y_i, x_i) are independently and identically drawn from the population

**A3. No perfect multicollinearity:** rank(X) = k (X has full column rank)

**A4. Zero conditional mean:** E[epsilon | X] = 0

**A5. Homoskedasticity:** Var(epsilon | X) = sigma^2 * I_n

Under A1-A4:
- OLS is **unbiased**: E[beta_hat | X] = beta
- Proof: beta_hat = (X'X)^{-1}X'(X beta + epsilon) = beta + (X'X)^{-1}X'epsilon. Taking conditional expectation: E[beta_hat | X] = beta + (X'X)^{-1}X'E[epsilon | X] = beta.

Under A1-A5:
- OLS is **BLUE** (Best Linear Unbiased Estimator) by the **Gauss-Markov Theorem**

**Gauss-Markov Theorem:** Under assumptions A1-A5, the OLS estimator has the smallest variance among all linear unbiased estimators.

**Proof sketch:** Let beta_tilde = Cy be any other linear unbiased estimator. Then C = (X'X)^{-1}X' + D for some matrix D with DX = 0. Var(beta_tilde | X) = sigma^2 * CC' = sigma^2 * [(X'X)^{-1} + DD']. Since DD' is positive semi-definite, Var(beta_tilde) >= Var(beta_hat).

### 1.4 Variance of OLS Estimator

Under homoskedasticity:

```
Var(beta_hat | X) = sigma^2 (X'X)^{-1}
```

Unbiased estimator of sigma^2:

```
s^2 = e'e / (n - k)
```

where e = y - X beta_hat are the residuals.

### 1.5 Heteroskedasticity-Robust Inference

When Var(epsilon_i | x_i) = sigma_i^2 (varies across observations), the OLS estimator is still consistent but the standard errors are incorrect.

**White (1980) heteroskedasticity-consistent (HC) estimator:**

```
Var_hat(beta_hat) = (X'X)^{-1} (sum_i e_i^2 x_i x_i') (X'X)^{-1}
```

This is the "sandwich" or "robust" standard error estimator.

*Citation: White, H. (1980). A heteroskedasticity-consistent covariance matrix estimator and a direct test for heteroskedasticity. Econometrica, 48(4), 817-838.*

### 1.6 Goodness of Fit

**R-squared:**

```
R^2 = 1 - SSR/SST = 1 - (sum e_i^2) / (sum (y_i - y_bar)^2)
```

**Adjusted R-squared:**

```
R_adj^2 = 1 - [(n-1)/(n-k)] * (1 - R^2)
```

Penalizes for additional regressors. Useful for model comparison.

**F-test for joint significance:** Testing H0: beta_j = beta_{j+1} = ... = beta_k = 0:

```
F = [(SSR_restricted - SSR_unrestricted) / q] / [SSR_unrestricted / (n-k)]
```

where q is the number of restrictions. Under H0: F ~ F(q, n-k).

**Operator connection:** R-squared measures explanatory power, not causal relationships. A high R-squared with a biased estimate is worse than a lower R-squared with an unbiased estimate. Business decisions should prioritize causal identification over fit. See Module 02 (experimentation and causal inference).

---

## 2. Omitted Variable Bias

### 2.1 The Problem

True model: y = X_1 beta_1 + X_2 beta_2 + epsilon

If we omit X_2 and estimate y = X_1 gamma + u, the OLS estimator gamma_hat is:

```
E[gamma_hat] = beta_1 + (X_1'X_1)^{-1} X_1'X_2 beta_2
```

The bias is:

```
Bias = (X_1'X_1)^{-1} X_1'X_2 * beta_2
```

This is nonzero whenever:
1. The omitted variable X_2 affects y (beta_2 != 0), AND
2. The omitted variable X_2 is correlated with included variable X_1

### 2.2 Direction of Bias

For the simple case with one included and one omitted variable:

```
Bias(beta_1_hat) = delta * beta_2
```

where delta = Cov(X_1, X_2) / Var(X_1) is the regression coefficient of X_2 on X_1.

| | beta_2 > 0 | beta_2 < 0 |
|---|-----------|-----------|
| **Corr(X_1, X_2) > 0** | Positive bias | Negative bias |
| **Corr(X_1, X_2) < 0** | Negative bias | Positive bias |

### 2.3 Practical Implications

Omitted variable bias is the primary threat to causal interpretation of regression estimates in observational data. Solutions include:
- Adding controls (if available and correctly specified)
- Instrumental variables
- Natural experiments (DiD, RDD)
- Randomized controlled trials

---

## 3. Instrumental Variables (IV)

### 3.1 The Endogeneity Problem

When E[epsilon | X] != 0, OLS is biased and inconsistent. Sources:
- Omitted variables
- Simultaneity (reverse causality)
- Measurement error

### 3.2 IV Estimator

An **instrument** Z must satisfy:
1. **Relevance:** Cov(Z, X) != 0 (Z is correlated with the endogenous regressor)
2. **Exclusion restriction:** Cov(Z, epsilon) = 0 (Z affects y only through X)

**Two-Stage Least Squares (2SLS):**

Stage 1: X_hat = Z(Z'Z)^{-1}Z'X (project X onto instrument space)
Stage 2: beta_hat_IV = (X_hat'X_hat)^{-1} X_hat'y

In the just-identified case (one instrument per endogenous variable):

```
beta_hat_IV = (Z'X)^{-1} Z'y
```

**Consistency:** Under relevance and exclusion:

```
plim beta_hat_IV = beta + plim [(Z'X/n)^{-1} (Z'epsilon/n)]
                 = beta + [Cov(Z,X)]^{-1} * 0 = beta
```

### 3.3 Weak Instruments

When instruments are weakly correlated with X, the IV estimator:
- Has large standard errors
- Is biased toward OLS in finite samples
- Has poor finite-sample properties

**Staiger-Stock rule of thumb** (Staiger & Stock, 1997): First-stage F-statistic should exceed 10 for reliable inference.

*Citation: Staiger, D., & Stock, J. H. (1997). Instrumental variables regression with weak instruments. Econometrica, 65(3), 557-586.*

**Stock-Yogo test:** More formal test for weak instruments based on the relative bias of IV vs. OLS or the distortion of the Wald test size.

### 3.4 Examples of Natural Instruments

| Study | Endogenous Variable | Instrument | Exclusion Argument |
|-------|-------------------|------------|-------------------|
| Angrist (1990) | Military service | Draft lottery number | Random assignment |
| Card (1995) | Education | Proximity to college | Reduces cost of education |
| Acemoglu et al. (2001) | Institutions | Settler mortality | Affects institutions, not current income directly |

**Operator connection:** IV methods are essential for evaluating business interventions when randomization is impossible. For example, measuring the causal effect of sales training on revenue when assignment to training is non-random. See Module 02 (causal inference) and Module 17 (labs).

---

## 4. Difference-in-Differences (DiD)

### 4.1 Setup

**Two groups:** Treatment group (receives intervention at time t*) and control group (does not).

**Two periods:** Pre-treatment (t=0) and post-treatment (t=1).

**Model:**

```
y_{it} = alpha + beta * Treat_i + gamma * Post_t + delta * (Treat_i * Post_t) + epsilon_{it}
```

The coefficient delta is the DiD estimator:

```
delta_DiD = [E(y|Treat,Post) - E(y|Treat,Pre)] - [E(y|Control,Post) - E(y|Control,Pre)]
```

```
           Treat       Control     Difference
Pre        a + b       a           b
Post       a+b+c+d     a+c         b+d
Change     c+d         c           d = DiD
```

### 4.2 Parallel Trends Assumption

The key identifying assumption: in the absence of treatment, the treated and control groups would have followed parallel trends:

```
E[y_0(1) - y_0(0) | Treat = 1] = E[y_0(1) - y_0(0) | Treat = 0]
```

where y_0(t) denotes the potential outcome without treatment at time t.

**Testing:** Examine pre-treatment trends. If they are parallel before treatment, the assumption is more plausible (though not testable directly).

### 4.3 Event Study Framework

Generalization with multiple time periods:

```
y_{it} = alpha_i + gamma_t + sum_{k != -1} delta_k * D_{i,t-t*=k} + epsilon_{it}
```

where D_{i,t-t*=k} indicates k periods from treatment. Pre-treatment coefficients (k < 0) should be approximately zero under parallel trends.

### 4.4 Recent Developments

**Staggered treatment timing:** When different units are treated at different times, the standard two-way fixed effects estimator can be biased (Goodman-Bacon, 2021; de Chaisemartin & D'Haultfoeuille, 2020).

*Citation: Goodman-Bacon, A. (2021). Difference-in-differences with variation in treatment timing. Journal of Econometrics, 225(2), 254-277.*

Modern solutions include Callaway & Sant'Anna (2021) and Sun & Abraham (2021) estimators that properly handle treatment effect heterogeneity.

---

## 5. Regression Discontinuity Design (RDD)

### 5.1 Sharp RD

Treatment is a deterministic function of a running variable X crossing a threshold c:

```
D_i = 1(X_i >= c)
```

**Identification:** At the threshold, treatment assignment is "as good as random" — units just above and just below the threshold are nearly identical.

**Estimand:**

```
tau_RD = lim_{x->c+} E[y|X=x] - lim_{x->c-} E[y|X=x]
```

The treatment effect is identified as the jump in the conditional expectation of y at the threshold.

**Estimation:** Local linear regression on each side of the cutoff:

```
y_i = alpha_l + beta_l(X_i - c) + epsilon_i     for X_i < c
y_i = alpha_r + beta_r(X_i - c) + epsilon_i     for X_i >= c
tau_hat = alpha_r - alpha_l
```

**Bandwidth selection:** The Imbens-Kalyanaraman (IK) optimal bandwidth balances bias (wider bandwidth) against variance (narrower bandwidth).

*Citation: Imbens, G. W., & Kalyanaraman, K. (2012). Optimal bandwidth choice for the regression discontinuity estimator. Review of Economic Studies, 79(3), 933-959.*

### 5.2 Fuzzy RD

Treatment probability jumps at the threshold but assignment is not deterministic:

```
P(D=1|X=x) jumps at x = c, but is not 0 or 1
```

Fuzzy RD is analogous to IV, using the threshold as an instrument:

```
tau_FRD = [lim_{x->c+} E[y|X=x] - lim_{x->c-} E[y|X=x]] / [lim_{x->c+} E[D|X=x] - lim_{x->c-} E[D|X=x]]
```

This identifies the LATE (Local Average Treatment Effect) for compliers at the threshold.

### 5.3 Validity Checks

**McCrary density test:** Check for manipulation — if agents can precisely control the running variable, there may be bunching at the threshold, violating the design.

**Covariate balance:** Pre-determined covariates should be smooth through the threshold.

**Placebo tests:** Check for "effects" at non-threshold cutoffs.

---

## 6. Panel Data Methods

### 6.1 Panel Data Model

```
y_{it} = x_{it}' beta + alpha_i + lambda_t + epsilon_{it}
```

where:
- alpha_i = individual (unit) fixed effect
- lambda_t = time fixed effect
- epsilon_{it} = idiosyncratic error

### 6.2 Fixed Effects (FE) Estimator

**Within transformation:** Subtract individual means:

```
(y_{it} - y_bar_i) = (x_{it} - x_bar_i)' beta + (epsilon_{it} - epsilon_bar_i)
```

The FE estimator eliminates all time-invariant unobservables (alpha_i). This is equivalent to including a dummy variable for each individual.

**Key assumption:** Strict exogeneity: E[epsilon_{it} | x_{i1}, ..., x_{iT}, alpha_i] = 0

**Limitation:** Cannot estimate effects of time-invariant regressors (they are absorbed by alpha_i).

### 6.3 Random Effects (RE) Estimator

Assumes alpha_i is uncorrelated with x_{it}:

```
E[alpha_i | x_{i1}, ..., x_{iT}] = E[alpha_i] = 0
```

RE uses a GLS transformation, partially demeaning the data:

```
(y_{it} - theta * y_bar_i) = (x_{it} - theta * x_bar_i)' beta + composite_error
```

where theta = 1 - sqrt(sigma_epsilon^2 / (sigma_epsilon^2 + T * sigma_alpha^2)).

RE is more efficient than FE when the assumption holds, but biased if alpha_i is correlated with x_{it}.

### 6.4 Hausman Test

**H0:** alpha_i is uncorrelated with x_{it} (RE is consistent)
**H1:** alpha_i is correlated with x_{it} (only FE is consistent)

Test statistic:

```
H = (beta_FE - beta_RE)' [Var(beta_FE) - Var(beta_RE)]^{-1} (beta_FE - beta_RE)
```

Under H0: H ~ chi^2(k).

If H is large (reject H0), use FE. If H is small (fail to reject), RE is preferred for efficiency.

---

## 7. Causal Inference Framework

### 7.1 Rubin Causal Model (Potential Outcomes)

*Citation: Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688-701.*

For each unit i:
- Y_i(1) = potential outcome if treated
- Y_i(0) = potential outcome if not treated
- Individual treatment effect: tau_i = Y_i(1) - Y_i(0)

**Fundamental problem of causal inference:** We observe Y_i = D_i * Y_i(1) + (1 - D_i) * Y_i(0). We never observe both potential outcomes for the same unit.

**Average Treatment Effect (ATE):**
```
ATE = E[Y(1) - Y(0)]
```

**Average Treatment Effect on the Treated (ATT):**
```
ATT = E[Y(1) - Y(0) | D = 1]
```

### 7.2 Selection Bias

```
E[Y|D=1] - E[Y|D=0] = ATT + {E[Y(0)|D=1] - E[Y(0)|D=0]}
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^
                                         Selection bias
```

Selection bias arises when treatment assignment is correlated with potential outcomes. Randomization eliminates selection bias: E[Y(0)|D=1] = E[Y(0)|D=0].

### 7.3 Conditional Independence (CIA) / Unconfoundedness

**Assumption:** (Y(0), Y(1)) is independent of D, conditional on X:

```
(Y(0), Y(1)) _|_ D | X
```

If CIA holds, we can identify ATE by conditioning on observables:

```
ATE = E_X[E[Y|D=1, X] - E[Y|D=0, X]]
```

**Estimation methods under CIA:**
- Regression adjustment
- Matching (nearest neighbor, propensity score)
- Inverse probability weighting (IPW)
- Doubly robust estimators

### 7.4 Directed Acyclic Graphs (DAGs)

*Citation: Pearl, J. (2009). Causality: Models, Reasoning, and Inference (2nd ed.). Cambridge University Press.*

DAGs provide a graphical framework for causal reasoning:
- Nodes represent variables
- Directed edges represent direct causal effects
- A path from X to Y through only directed edges is a causal path

**Key concepts:**
- **Confounder:** Common cause of treatment and outcome. Must be controlled for.
- **Mediator:** Variable on the causal path from treatment to outcome. Controlling for it blocks the causal path.
- **Collider:** Variable caused by both treatment and outcome. Controlling for it opens a spurious path (collider bias).

**Backdoor criterion:** A set of variables Z satisfies the backdoor criterion relative to (X, Y) if:
1. No variable in Z is a descendant of X
2. Z blocks every path between X and Y that contains an arrow into X

If Z satisfies the backdoor criterion, conditioning on Z identifies the causal effect.

### 7.5 Local Average Treatment Effect (LATE)

*Citation: Imbens, G. W., & Angrist, J. D. (1994). Identification and estimation of local average treatment effects. Econometrica, 62(2), 467-475.*

With an instrument Z that affects treatment D:

**Assumptions:**
1. Independence: Z is independent of potential outcomes and potential treatment statuses
2. Relevance: Z affects D
3. Exclusion: Z affects Y only through D
4. Monotonicity: D_i(1) >= D_i(0) for all i (no "defiers")

**LATE:** The IV estimator identifies the treatment effect for **compliers** — those who take up treatment when Z=1 but not when Z=0:

```
LATE = E[Y(1) - Y(0) | Complier] = Cov(Y, Z) / Cov(D, Z)
```

**Types:**
- Always-takers: D(0) = D(1) = 1
- Never-takers: D(0) = D(1) = 0
- Compliers: D(0) = 0, D(1) = 1
- Defiers: D(0) = 1, D(1) = 0 (ruled out by monotonicity)

**Operator connection:** LATE is what most business experiments actually estimate. When you offer a discount (instrument) to drive trial (treatment), the estimated effect is for "compliers" — customers who would try the product with the discount but not without it. This is a specific subpopulation, not the overall population. Understanding LATE prevents over-generalizing experimental results. See Module 02 (experimentation) and Module 17 (labs).

---

## 8. Common Pitfalls and Best Practices

### 8.1 Threats to Identification

| Threat | Description | Solutions |
|--------|------------|-----------|
| Omitted variable bias | Unobserved confounders | IV, FE, DiD, RCT |
| Reverse causality | Y causes X | IV, lagged variables, theory |
| Measurement error | X measured with noise | IV, better data |
| Sample selection | Non-random sample | Heckman correction, bounds |
| Bad controls | Controlling for endogenous variables | DAGs, theory |
| p-hacking | Testing many specifications | Pre-registration, adjustments |

### 8.2 Practical Recommendations

1. **Start with theory:** What is the causal mechanism? Draw a DAG.
2. **Identify threats:** What could confound the relationship?
3. **Choose appropriate method:** Match method to the source of identification.
4. **Report robustly:** Show results under multiple specifications.
5. **Cluster standard errors** when observations are correlated within groups.
6. **Use robust standard errors** unless homoskedasticity is justified.
7. **Report economic significance** alongside statistical significance.

---

## Summary of Methods

| Method | Identifies | Key Assumption | Best For |
|--------|-----------|----------------|----------|
| OLS | Conditional correlation | E[epsilon\|X] = 0 | Prediction, description |
| IV/2SLS | Causal effect (LATE) | Valid instrument | Endogeneity |
| DiD | Causal effect (ATT) | Parallel trends | Policy changes, interventions |
| RDD | Causal effect (at cutoff) | Continuity at threshold | Threshold-based rules |
| FE | Causal effect (within-unit) | Strict exogeneity | Panel data with unobserved heterogeneity |
| Matching | Causal effect (ATE/ATT) | CIA/unconfoundedness | Rich observational data |

The choice of method depends on the source of identifying variation and the plausibility of assumptions. There is no single "best" method — each requires different, non-testable assumptions.

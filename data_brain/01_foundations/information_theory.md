# Information Theory — Foundations

## Overview

Information theory, founded by Claude Shannon (1948), provides the mathematical framework
for quantifying information, uncertainty, and the relationships between random variables.
In modern data science, information-theoretic concepts underpin loss functions (cross-entropy),
model selection (AIC via KL divergence), feature selection (mutual information), decision
trees (information gain), variational inference (ELBO), and generative models (VAEs, GANs).

References: Cover & Thomas (Elements of Information Theory, 2nd ed.), MacKay (Information
Theory, Inference, and Learning Algorithms), Bishop (PRML, Chapter 1.6).

---

## Entropy

### Shannon Entropy

For a discrete random variable X with probability mass function p(x):

H(X) = -sum_x p(x) * log p(x)

Convention: 0 * log(0) = 0 (by continuity argument: lim_{p->0} p*log(p) = 0)

**Properties:**
- H(X) >= 0 (entropy is non-negative)
- H(X) = 0 iff X is deterministic (one outcome has probability 1)
- H(X) is maximized when X is uniformly distributed: H(X) = log(|X|)
- H(X) is measured in bits (log base 2) or nats (natural log)

**Interpretation:** Entropy measures the average surprise or uncertainty in a random
variable. High entropy = high uncertainty = more information needed to describe outcomes.

### Example: Coin Flip

For a coin with P(heads) = p:
H(X) = -p*log(p) - (1-p)*log(1-p)

- p = 0.5: H = 1 bit (maximum uncertainty, fair coin)
- p = 0.9: H = 0.469 bits (biased coin, less uncertain)
- p = 1.0: H = 0 bits (deterministic, no uncertainty)

### Differential Entropy

For a continuous random variable X with density f(x):

h(X) = -integral f(x) * log f(x) dx

**Key difference from discrete entropy:**
- Differential entropy can be negative
- It is not invariant under change of variables
- For Normal(mu, sigma^2): h(X) = (1/2) * log(2*pi*e*sigma^2)
  - Depends only on variance, not mean
  - The Gaussian maximizes entropy among all distributions with fixed variance

---

## Joint and Conditional Entropy

### Joint Entropy

H(X, Y) = -sum_{x,y} p(x, y) * log p(x, y)

Measures the total uncertainty in the pair (X, Y).

### Conditional Entropy

H(Y | X) = -sum_{x,y} p(x, y) * log p(y | x)
         = sum_x p(x) * H(Y | X = x)

Measures the remaining uncertainty in Y after observing X.

### Chain Rule of Entropy

H(X, Y) = H(X) + H(Y | X) = H(Y) + H(X | Y)

Generalizes to:
H(X_1, X_2, ..., X_n) = sum_i H(X_i | X_1, ..., X_{i-1})

**Interpretation:** The total information in (X, Y) equals the information in X plus
the additional information in Y given X.

### Key Inequality

H(Y | X) <= H(Y)

Conditioning reduces entropy (on average). Equality holds iff X and Y are independent.
This formalizes the intuition: observing X can only reduce (or maintain) our uncertainty
about Y.

---

## Kullback-Leibler Divergence

### Definition

For distributions p and q over the same space:

D_KL(p || q) = sum_x p(x) * log(p(x) / q(x))
             = E_p[log(p(X) / q(X))]

For continuous distributions:
D_KL(p || q) = integral p(x) * log(p(x) / q(x)) dx

### Properties

- **Non-negative:** D_KL(p || q) >= 0 (Gibbs' inequality)
- **Zero iff equal:** D_KL(p || q) = 0 iff p = q almost everywhere
- **Not symmetric:** D_KL(p || q) != D_KL(q || p) in general
- **Not a metric:** Does not satisfy triangle inequality

### Asymmetry and Its Consequences

**Forward KL: D_KL(p || q)** — "mean-seeking" or "moment-matching"
- Minimizing D_KL(p || q) with respect to q penalizes q(x) = 0 where p(x) > 0
- Encourages q to cover all modes of p (even at the cost of placing mass where p is low)
- Used in: variational inference (mean-field approximation)

**Reverse KL: D_KL(q || p)** — "mode-seeking"
- Minimizing D_KL(q || p) with respect to q penalizes q(x) > 0 where p(x) = 0
- Encourages q to concentrate on one mode of p
- Used in: expectation propagation, some variational methods

### KL Divergence in Practice

**Maximum Likelihood Estimation:**
MLE is equivalent to minimizing D_KL(p_data || p_model) where p_data is the empirical
distribution. This connects MLE to information theory.

**Variational Inference:**
The Evidence Lower Bound (ELBO):
log p(x) = D_KL(q(z|x) || p(z|x)) + ELBO(q)
ELBO(q) = E_q[log p(x, z)] - E_q[log q(z)]

Since D_KL >= 0, maximizing ELBO tightens the bound on log p(x).

**Model Comparison:**
AIC (Akaike Information Criterion) approximates expected KL divergence between the
fitted model and the true distribution: AIC = 2k - 2*log(L), where k = number of
parameters and L = maximized likelihood.

### For Gaussians (Closed Form)

D_KL(N(mu_1, sigma_1^2) || N(mu_2, sigma_2^2)) =
  log(sigma_2/sigma_1) + (sigma_1^2 + (mu_1 - mu_2)^2) / (2*sigma_2^2) - 1/2

Multivariate:
D_KL(N(mu_1, Sigma_1) || N(mu_2, Sigma_2)) =
  (1/2) * [tr(Sigma_2^(-1) * Sigma_1) + (mu_2-mu_1)^T * Sigma_2^(-1) * (mu_2-mu_1)
  - d + log(det(Sigma_2)/det(Sigma_1))]

This closed form is used extensively in VAEs and Gaussian process approximations.

---

## Cross-Entropy

### Definition

H(p, q) = -sum_x p(x) * log q(x) = H(p) + D_KL(p || q)

Cross-entropy measures the average number of bits needed to encode data from distribution
p using a code optimized for distribution q.

### Cross-Entropy as a Loss Function

For classification with true labels y and predicted probabilities q:

**Binary cross-entropy:**
L = -(1/n) * sum_i [y_i * log(q_i) + (1 - y_i) * log(1 - q_i)]

**Categorical cross-entropy:**
L = -(1/n) * sum_i sum_c [y_{ic} * log(q_{ic})]

where y_{ic} is 1 if sample i belongs to class c, and q_{ic} is the predicted probability.

**Why cross-entropy, not MSE, for classification:**
- Cross-entropy produces larger gradients when predictions are confidently wrong
- MSE gradients vanish when sigmoid outputs are near 0 or 1
- Cross-entropy is a proper scoring rule (minimized when q = p)
- Cross-entropy loss corresponds to MLE of the logistic/softmax model

### Relationship to Log Loss

Log loss = cross-entropy loss (they are the same thing in classification context).
Minimizing cross-entropy = maximizing log-likelihood = minimizing KL divergence from
the empirical distribution to the model distribution.

---

## Mutual Information

### Definition

I(X; Y) = H(X) + H(Y) - H(X, Y)
         = H(X) - H(X | Y)
         = H(Y) - H(Y | X)
         = D_KL(p(x, y) || p(x) * p(y))
         = sum_{x,y} p(x, y) * log(p(x, y) / (p(x) * p(y)))

### Properties

- I(X; Y) >= 0
- I(X; Y) = 0 iff X and Y are independent
- I(X; Y) = I(Y; X) (symmetric, unlike KL divergence)
- I(X; X) = H(X) (self-information equals entropy)

### Interpretation

Mutual information measures the amount of information that X contains about Y (and
vice versa). It captures ALL dependencies (linear and non-linear), unlike correlation
which only captures linear relationships.

### Venn Diagram of Information

```
    ┌──────────────────────────┐
    │         H(X,Y)           │
    │                          │
    │   ┌─────────┐            │
    │   │  H(X|Y) │  I(X;Y)   │   H(Y|X)
    │   │         │            │
    │   └─────────┘            │
    │                          │
    └──────────────────────────┘

H(X) = H(X|Y) + I(X;Y)
H(Y) = H(Y|X) + I(X;Y)
H(X,Y) = H(X|Y) + H(Y|X) + I(X;Y)
```

### Applications in Data Science

**Feature Selection:**
Select features that maximize mutual information with the target:
I(X_j; Y) for each feature j. Features with high MI are informative.
Algorithms: mRMR (minimum Redundancy Maximum Relevance), CMIM.

**Decision Trees:**
Information gain = I(Y; X_j) = H(Y) - H(Y | X_j)
Each split maximizes the reduction in entropy of the target variable.

**Clustering Evaluation:**
Normalized Mutual Information (NMI) between cluster assignments and ground truth:
NMI(C, K) = 2 * I(C; K) / (H(C) + H(K))

**Independent Component Analysis (ICA):**
Find components that minimize mutual information (maximize independence).

**Information Bottleneck:**
Compress X into a representation T that retains maximum information about Y:
min I(X; T) - beta * I(T; Y)

---

## Jensen-Shannon Divergence

### Definition

JSD(p || q) = (1/2) * D_KL(p || m) + (1/2) * D_KL(q || m)

where m = (p + q) / 2 is the mixture distribution.

### Properties

- **Symmetric:** JSD(p || q) = JSD(q || p)
- **Bounded:** 0 <= JSD <= log(2) (for log base 2)
- **Square root is a metric:** sqrt(JSD) satisfies the triangle inequality
- **Always finite:** Unlike KL divergence, JSD is defined even when supports differ

### Applications

**GAN Training:**
The original GAN objective (Goodfellow et al., 2014) minimizes the Jensen-Shannon
divergence between the data distribution and the generator distribution.

**Data Drift Detection:**
JSD between training and serving feature distributions quantifies distribution shift.
Thresholds can trigger retraining alerts.

**Document Similarity:**
JSD between topic distributions of two documents provides a symmetric similarity measure.

---

## Information-Theoretic Model Selection

### Akaike Information Criterion (AIC)

AIC = 2k - 2*log(L_max)

Where k = number of parameters, L_max = maximized likelihood.
Approximates expected KL divergence. Prefers models that balance fit and complexity.
Tends to select larger models (not consistent).

### Bayesian Information Criterion (BIC)

BIC = k*log(n) - 2*log(L_max)

Stronger penalty for complexity than AIC. Consistent: selects the true model as n -> infinity.
Approximates the log marginal likelihood (Bayes factor).

### Minimum Description Length (MDL)

Total description length = length of model + length of data given model.
Equivalent to BIC in many settings. Information-theoretic foundation for Occam's Razor.

### When to Use Which

| Criterion | Goal | Tends to Select |
|-----------|------|----------------|
| AIC | Best prediction | Larger models (lower bias) |
| BIC | True model identification | Smaller models (higher parsimony) |
| MDL | Data compression | Similar to BIC |
| Cross-validation | Empirical prediction error | Problem-dependent |

---

## Information Theory in Deep Learning

### Cross-Entropy Loss and Softmax

The softmax function + cross-entropy loss is the standard output layer for classification:
q_c = exp(z_c) / sum_k exp(z_k)

This combination is numerically stable and produces well-calibrated gradients.

### Information Bottleneck in Deep Networks

Shwartz-Ziv & Tishby (2017) proposed that deep networks compress input information
through layers, retaining only information relevant to the output. While debated, this
perspective provides intuition for why deep networks generalize.

### Entropy Regularization

Adding entropy of the output distribution as a regularizer encourages exploration
(in reinforcement learning) or prevents overconfident predictions:
L_total = L_task - alpha * H(p_output)

Used in: SAC (Soft Actor-Critic), label smoothing, knowledge distillation.

### Variational Autoencoders

The ELBO objective in VAEs:
ELBO = E_q[log p(x|z)] - D_KL(q(z|x) || p(z))

Reconstruction term + KL regularization term. The KL term measures how much the
encoder deviates from the prior, acting as an information bottleneck.

---

**Information theory provides the fundamental vocabulary for reasoning about what models
learn, what they ignore, and how to measure the quality of that tradeoff.**

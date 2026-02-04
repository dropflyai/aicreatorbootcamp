# Supervised Learning — Theory, Algorithms, and Practice

## Overview

Supervised learning is the task of learning a mapping f: X -> Y from labeled training
data {(x_i, y_i)}_{i=1}^{n}. When Y is continuous, the problem is regression; when Y is
categorical, classification. This module covers the core algorithm families, the
bias-variance tradeoff that governs generalization, regularization strategies,
model selection, and interpretability methods that make black-box models actionable.

References: Hastie, Tibshirani & Friedman (Elements of Statistical Learning, 2nd ed.),
Bishop (Pattern Recognition and Machine Learning), Stanford CS229, Murphy (Machine
Learning: A Probabilistic Perspective).

---

## Linear Regression

### Ordinary Least Squares

The model assumes Y = X * beta + epsilon, where epsilon ~ N(0, sigma^2 * I).

The OLS estimator minimizes the residual sum of squares:

```
beta_hat = argmin_beta ||Y - X * beta||_2^2
         = (X^T X)^{-1} X^T Y
```

Under Gauss-Markov conditions (linearity, exogeneity, homoskedasticity, no perfect
multicollinearity), OLS is the Best Linear Unbiased Estimator (BLUE).

### Statistical Properties

- E[beta_hat] = beta (unbiased)
- Var(beta_hat) = sigma^2 (X^T X)^{-1}
- The hat matrix H = X(X^T X)^{-1} X^T projects Y onto the column space of X
- Residuals e = (I - H)Y are orthogonal to the fitted values

### Diagnostics

- R^2 = 1 - RSS/TSS (proportion of variance explained)
- Adjusted R^2 penalizes for number of predictors: 1 - (1-R^2)(n-1)/(n-p-1)
- VIF_j = 1/(1 - R_j^2) for detecting multicollinearity (VIF > 10 is problematic)
- Cook's distance for influential observations
- Residual plots for heteroskedasticity, non-linearity, and outlier detection

---

## Logistic Regression

### Model Formulation

For binary classification, logistic regression models the log-odds as linear:

```
log(p(y=1|x) / (1 - p(y=1|x))) = beta^T x

p(y=1|x) = sigma(beta^T x) = 1 / (1 + exp(-beta^T x))
```

The loss function is the negative log-likelihood (cross-entropy):

```
L(beta) = -sum_{i=1}^{n} [y_i log(p_i) + (1-y_i) log(1-p_i)]
```

No closed-form solution exists; optimization uses iteratively reweighted least squares
(IRLS) or gradient descent. The Hessian is negative semi-definite, guaranteeing
convexity of the negative log-likelihood.

### Multinomial Extension

For K classes, the softmax function generalizes:
p(y=k|x) = exp(beta_k^T x) / sum_{j=1}^{K} exp(beta_j^T x)

---

## Support Vector Machines

### Hard-Margin SVM

Find the hyperplane w^T x + b = 0 that maximizes the margin 2/||w||:

```
min_{w,b}  (1/2)||w||^2
s.t.       y_i(w^T x_i + b) >= 1  for all i
```

### Soft-Margin SVM (C-SVM)

Introduce slack variables xi_i for non-separable data:

```
min_{w,b,xi}  (1/2)||w||^2 + C * sum xi_i
s.t.          y_i(w^T x_i + b) >= 1 - xi_i,  xi_i >= 0
```

C controls the tradeoff between margin width and classification error.

### Kernel Trick

The dual formulation depends on data only through inner products x_i^T x_j.
Replace with kernel K(x_i, x_j) = phi(x_i)^T phi(x_j):

- Linear: K(x, z) = x^T z
- Polynomial: K(x, z) = (x^T z + c)^d
- RBF/Gaussian: K(x, z) = exp(-gamma ||x - z||^2)

Mercer's theorem: K is a valid kernel iff the Gram matrix is positive semi-definite.

---

## Decision Trees

### Splitting Criteria

For classification (CART):
- Gini impurity: G(t) = 1 - sum_{k=1}^{K} p_k^2
- Entropy: H(t) = -sum_{k=1}^{K} p_k log(p_k)
- Information gain: IG = H(parent) - sum (n_child/n_parent) H(child)

For regression: minimize within-node variance (MSE).

### Tree Construction

At each node, search all features and all split points for the split maximizing
the impurity reduction. This greedy algorithm is NP-hard to optimize globally.

### Pruning

- Pre-pruning: max_depth, min_samples_split, min_samples_leaf
- Post-pruning (cost-complexity): minimize R_alpha(T) = R(T) + alpha * |T|
  where R(T) is tree error, |T| is number of leaves, alpha is complexity parameter

---

## Ensemble Methods

### Random Forests (Breiman, 2001)

Combine bagging with random feature subsets:
1. Draw B bootstrap samples of size n from training data
2. For each bootstrap sample, grow a tree using random subset of m features at each split
   (m ~ sqrt(p) for classification, m ~ p/3 for regression)
3. Aggregate: majority vote (classification) or mean (regression)

Variance reduction: Var(f_hat) = rho * sigma^2 + (1-rho) * sigma^2 / B
where rho is average pairwise correlation between trees. Random feature selection
reduces rho, which is why random forests outperform bagging.

Out-of-bag (OOB) error provides an unbiased estimate of test error without
requiring a separate validation set (each sample is OOB for ~37% of trees).

### Gradient Boosting

Build an additive model F_m(x) = F_{m-1}(x) + eta * h_m(x), where each weak
learner h_m fits the negative gradient of the loss:

```
For squared error loss: h_m fits residuals r_i = y_i - F_{m-1}(x_i)
For general loss L:     h_m fits pseudo-residuals r_i = -dL/dF|_{F=F_{m-1}(x_i)}
```

### XGBoost (Chen & Guestrin, 2016)

Regularized objective: L(phi) = sum l(y_i, y_hat_i) + sum Omega(f_k)
where Omega(f) = gamma * T + (1/2) * lambda * ||w||^2

Second-order Taylor expansion enables efficient split finding:
Gain = (1/2) [G_L^2/(H_L+lambda) + G_R^2/(H_R+lambda) - (G_L+G_R)^2/(H_L+H_R+lambda)] - gamma

Key innovations: column subsampling, weighted quantile sketch for approximate
split finding, sparsity-aware split finding, cache-aware access patterns.

### LightGBM

Gradient-based one-side sampling (GOSS): keeps all instances with large gradients,
randomly samples from instances with small gradients. Exclusive feature bundling (EFB)
reduces dimensionality by bundling mutually exclusive features. Leaf-wise (best-first)
growth instead of level-wise.

---

## Bias-Variance Tradeoff

### Formal Decomposition

For squared error loss, the expected prediction error decomposes:

```
E[(Y - f_hat(x))^2] = Var(Y|x) + [Bias(f_hat(x))]^2 + Var(f_hat(x))

Where:
  Var(Y|x)          = irreducible error (Bayes error)
  Bias(f_hat(x))    = E[f_hat(x)] - f(x)    (systematic error from wrong assumptions)
  Var(f_hat(x))     = E[(f_hat(x) - E[f_hat(x)])^2]  (sensitivity to training data)
```

High bias (underfitting): model too simple, misses signal.
High variance (overfitting): model too complex, fits noise.

### Practical Diagnosis

- Training error >> desired error: high bias. Solution: more features, more complex model.
- Training error << test error: high variance. Solution: more data, regularization, simpler model.
- Learning curves: plot training/validation error vs. training set size.

---

## Regularization

### L2 (Ridge) Regression

```
beta_ridge = argmin ||Y - X*beta||^2 + lambda * ||beta||_2^2
           = (X^T X + lambda I)^{-1} X^T Y
```

Shrinks coefficients toward zero but never exactly to zero. Equivalent to a
Gaussian prior on beta: beta ~ N(0, tau^2 I) with lambda = sigma^2/tau^2.

### L1 (Lasso) Regression (Tibshirani, 1996)

```
beta_lasso = argmin ||Y - X*beta||^2 + lambda * ||beta||_1
```

Induces sparsity: some coefficients are exactly zero, performing feature selection.
Equivalent to a Laplace prior. No closed-form solution; use coordinate descent.

### Elastic Net (Zou & Hastie, 2005)

```
beta_EN = argmin ||Y - X*beta||^2 + lambda_1 * ||beta||_1 + lambda_2 * ||beta||_2^2
```

Combines L1 sparsity with L2 grouping effect. Superior when features are correlated.

---

## Cross-Validation

### K-Fold Cross-Validation

Partition data into K roughly equal folds. For k = 1,...,K:
train on all folds except k, evaluate on fold k.

CV estimate: CV(K) = (1/K) sum_{k=1}^{K} L(y_k, f_hat_{-k}(x_k))

K=5 or K=10 are standard. Leave-one-out CV (K=n) has low bias but high variance.

### Stratified K-Fold

Preserves class distribution in each fold. Essential for imbalanced datasets.

### Time-Series Cross-Validation

Expanding window: train on [1, t], test on [t+1, t+h], increase t.
Sliding window: train on [t-w, t], test on [t+1, t+h], slide forward.
Never use future data for training (no data leakage).

### Nested Cross-Validation

Outer loop: estimate generalization error. Inner loop: select hyperparameters.
Avoids optimistic bias from using the same data for model selection and evaluation.

---

## Hyperparameter Tuning

### Grid Search

Exhaustive search over a predefined parameter grid. Computational cost grows
exponentially with number of hyperparameters: O(n_1 * n_2 * ... * n_k).

### Random Search (Bergstra & Bengio, 2012)

Sample hyperparameters from distributions. More efficient than grid search when
only a few hyperparameters matter (low effective dimensionality). With the same
budget, random search finds better solutions with high probability.

### Bayesian Optimization

Model the objective f(lambda) with a surrogate (typically Gaussian process).
Use an acquisition function to balance exploration vs. exploitation:

- Expected Improvement: EI(lambda) = E[max(f(lambda) - f(lambda_best), 0)]
- Upper Confidence Bound: UCB(lambda) = mu(lambda) + kappa * sigma(lambda)

Tools: Optuna, Hyperopt, BOHB (combines Bayesian optimization with HyperBand).

---

## Feature Importance and Interpretability

### Permutation Importance (Breiman, 2001)

For each feature j, permute its values and measure increase in prediction error.
Model-agnostic, but can be misleading with correlated features (use conditional
permutation importance or drop-column importance instead).

### SHAP (SHapley Additive exPlanations, Lundberg & Lee, 2017)

Based on Shapley values from cooperative game theory:

```
phi_j = sum_{S subset F\{j}} [|S|! (|F|-|S|-1)! / |F|!] * [f(S union {j}) - f(S)]
```

Properties: local accuracy, missingness, consistency. TreeSHAP computes exact
Shapley values in O(TLD^2) for tree ensembles (T trees, L leaves, D depth).

### LIME (Ribeiro et al., 2016)

Local Interpretable Model-agnostic Explanations: perturb input, observe predictions,
fit a local linear model weighted by proximity to the instance being explained.

xi(x) = argmin_{g in G} L(f, g, pi_x) + Omega(g)

### Partial Dependence Plots

Marginal effect of one or two features on prediction:
PD(x_S) = (1/n) sum_{i=1}^{n} f(x_S, x_{C,i})

Individual Conditional Expectation (ICE) plots show per-instance curves.

---

## Model Selection Criteria

### Information Criteria

- AIC = -2 * log(L) + 2k (Akaike, asymptotically equivalent to leave-one-out CV)
- BIC = -2 * log(L) + k * log(n) (Schwarz, consistent model selection)
- AICc = AIC + 2k(k+1)/(n-k-1) (corrected for small samples)

### Evaluation Metrics

**Classification:**
- Accuracy, precision, recall, F1-score
- ROC-AUC: area under the receiver operating characteristic curve
- PR-AUC: preferred for imbalanced datasets
- Log loss (cross-entropy): measures calibration quality
- Cohen's kappa: agreement corrected for chance

**Regression:**
- MSE, RMSE, MAE, MAPE
- R^2 and adjusted R^2
- Quantile loss for quantile regression

---

## Practical Considerations

### When to Use Which Algorithm

| Scenario | Recommended |
|----------|-------------|
| Interpretability required | Logistic regression, decision trees, GAMs |
| Tabular data, strong performance | XGBoost, LightGBM, CatBoost |
| High-dimensional sparse data | Lasso, elastic net, linear SVM |
| Small dataset | SVM with kernel, regularized regression |
| Large dataset, many features | Random forest, gradient boosting |
| Unstructured data (images, text) | Neural networks (see deep_learning.md) |

### Common Pitfalls

- Data leakage: feature engineering must be inside the CV loop
- Class imbalance: use stratified splits, class weights, SMOTE, or focal loss
- Multicollinearity: regularize or use PCA before training
- Target encoding leakage: use leave-one-out or k-fold within training set
- Overfitting hyperparameter search: use nested CV for unbiased estimates

---

## Cross-References

- Bayesian optimization details: `02_statistical_inference/bayesian_methods.md`
- Deep learning approaches: `03_machine_learning/deep_learning.md`
- Feature engineering in pipelines: `04_data_engineering/data_pipelines.md`
- Model deployment: `07_mlops/model_deployment.md`
- Experiment tracking: `07_mlops/ml_lifecycle.md`

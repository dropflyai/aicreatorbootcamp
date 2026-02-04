# Data Brain — Glossary of Terms

## Purpose

This glossary provides precise definitions for terms used throughout the Data Brain.
Definitions follow standard usage from canonical references (Hastie et al., Bishop,
Pearl, Kohavi et al.) and are authoritative within this brain system. When terms have
multiple common meanings, the Data Brain definition takes precedence.

---

## Statistical Foundations

### Probability and Distributions

**Probability Distribution:** A mathematical function that describes the likelihood of
different outcomes. Discrete distributions assign probabilities to countable outcomes
(Bernoulli, Binomial, Poisson); continuous distributions assign probability densities
over real-valued outcomes (Normal, Exponential, Beta).

**Prior Distribution:** In Bayesian inference, the probability distribution representing
beliefs about a parameter before observing data. Notation: P(theta).

**Posterior Distribution:** The updated probability distribution after combining the prior
with observed data via Bayes' theorem. P(theta | data) = P(data | theta) * P(theta) / P(data).

**Likelihood:** The probability of observing the data given a specific parameter value.
L(theta | data) = P(data | theta). Not a probability distribution over theta.

**Conjugate Prior:** A prior distribution that, when combined with a specific likelihood,
produces a posterior in the same family. Example: Beta prior + Binomial likelihood = Beta posterior.

**Maximum Likelihood Estimation (MLE):** Finding the parameter value theta-hat that
maximizes L(theta | data). Equivalent to minimizing negative log-likelihood.

**Maximum A Posteriori (MAP):** Finding the parameter value that maximizes the posterior
distribution. Equivalent to MLE with a regularization term from the prior.

### Hypothesis Testing

**Null Hypothesis (H0):** The default assumption, typically "no effect" or "no difference."
Rejection of H0 requires sufficient evidence, quantified by the p-value.

**Alternative Hypothesis (H1/Ha):** The claim being tested against H0. Can be one-sided
(directional) or two-sided (non-directional).

**p-value:** The probability of observing data at least as extreme as the actual observation,
assuming H0 is true. NOT the probability that H0 is true (a common misinterpretation
flagged by Wasserstein & Lazar, 2016).

**Type I Error (alpha):** Rejecting H0 when it is actually true (false positive).
Conventionally set at 0.05, but should be justified for each application.

**Type II Error (beta):** Failing to reject H0 when it is actually false (false negative).

**Statistical Power (1 - beta):** The probability of correctly rejecting H0 when it is
false. Standard target: 0.80. Power depends on effect size, sample size, and alpha.

**Effect Size:** A standardized measure of the magnitude of an effect, independent of
sample size. Cohen's d for means, odds ratio for proportions, R-squared for variance explained.

**Confidence Interval (CI):** A range of values that, under repeated sampling, would
contain the true parameter value (1 - alpha)% of the time. A 95% CI does NOT mean there
is a 95% probability the parameter is in the interval (frequentist interpretation).

**Credible Interval:** The Bayesian analog of a confidence interval. A 95% credible
interval means there is a 95% probability the parameter lies within the interval, given
the data and prior.

**Multiple Comparisons Problem:** When conducting many statistical tests simultaneously,
the probability of at least one false positive increases. Corrections: Bonferroni (most
conservative), Holm-Sidak (step-down), Benjamini-Hochberg (FDR control).

**False Discovery Rate (FDR):** The expected proportion of false positives among all
rejected null hypotheses. Controlled by the Benjamini-Hochberg procedure.

---

## Machine Learning

### Core Concepts

**Supervised Learning:** Learning a mapping f: X -> Y from labeled training data
{(x_i, y_i)}. Includes classification (discrete Y) and regression (continuous Y).

**Unsupervised Learning:** Learning structure from unlabeled data {x_i}. Includes
clustering, dimensionality reduction, density estimation, and anomaly detection.

**Semi-Supervised Learning:** Learning from a small amount of labeled data and a large
amount of unlabeled data. Exploits cluster and manifold assumptions.

**Self-Supervised Learning:** A form of unsupervised learning where the data provides
its own supervision through pretext tasks (e.g., masked language modeling in BERT).

**Bias-Variance Tradeoff:** Decomposition of expected prediction error into three
components: irreducible noise, bias (systematic error from model assumptions), and
variance (sensitivity to training data). E[error] = Bias^2 + Variance + Noise.

**Overfitting:** When a model fits the training data too closely, capturing noise rather
than signal. Indicated by a large gap between training and validation performance.

**Underfitting:** When a model is too simple to capture the underlying pattern. Indicated
by poor performance on both training and validation data.

**Regularization:** Techniques to prevent overfitting by adding constraints to the model.
L1 (Lasso, promotes sparsity), L2 (Ridge, shrinks coefficients), Dropout (neural networks),
Early stopping (training duration).

**Cross-Validation:** A resampling method for estimating model performance. k-fold CV
splits data into k folds, trains on k-1, evaluates on the held-out fold, and averages.
Standard: k=5 or k=10. Stratified CV preserves class distribution.

**Hyperparameter:** A model setting not learned from data (e.g., learning rate, tree depth,
regularization strength). Selected via cross-validation, grid search, random search,
or Bayesian optimization.

### Model Types

**Linear Regression:** Models the target as a linear combination of features: y = X*beta + epsilon. Assumes linearity, independence, homoscedasticity, normality of residuals.

**Logistic Regression:** Models the log-odds of a binary outcome as a linear function of features: log(p/(1-p)) = X*beta. Output is a probability via the sigmoid function.

**Decision Tree:** A recursive partitioning model that splits feature space into regions.
Splits chosen to maximize information gain (classification) or minimize MSE (regression).

**Random Forest:** An ensemble of decision trees trained on bootstrap samples with random
feature subsets. Reduces variance through bagging (Breiman, 2001).

**Gradient Boosting:** Sequential ensemble that fits each new tree to the residuals of
the previous ensemble. XGBoost, LightGBM, CatBoost are popular implementations.

**Support Vector Machine (SVM):** Finds the maximum-margin hyperplane separating classes.
Kernel trick enables non-linear boundaries (RBF, polynomial kernels).

**Neural Network:** Composed of layers of neurons with non-linear activation functions.
Universal approximation theorem guarantees representational capacity. Trained via backpropagation.

**Transformer:** Attention-based architecture (Vaswani et al., 2017) that processes
sequences in parallel. Foundation of modern LLMs. Self-attention: Attention(Q,K,V) = softmax(QK^T / sqrt(d_k))V.

### Evaluation Metrics

**Accuracy:** Proportion of correct predictions. Misleading for imbalanced classes.

**Precision:** TP / (TP + FP). Of all positive predictions, how many were correct?

**Recall (Sensitivity):** TP / (TP + FN). Of all actual positives, how many were found?

**F1 Score:** Harmonic mean of precision and recall: 2 * (P * R) / (P + R).

**ROC AUC:** Area under the Receiver Operating Characteristic curve. Measures discrimination
ability across all classification thresholds. 0.5 = random, 1.0 = perfect.

**Log Loss (Cross-Entropy):** -sum(y_i * log(p_i) + (1-y_i) * log(1-p_i)). Penalizes
confident wrong predictions more heavily. Proper scoring rule.

**RMSE:** Root Mean Squared Error. sqrt(mean((y - y_hat)^2)). In the same units as y.

**MAE:** Mean Absolute Error. mean(|y - y_hat|). More robust to outliers than RMSE.

**R-squared:** 1 - SS_res/SS_tot. Proportion of variance explained. Can be negative for
arbitrarily bad models.

**Calibration:** Whether predicted probabilities match empirical frequencies. A model
predicting 70% should be correct approximately 70% of the time.

---

## Data Engineering

**ETL (Extract, Transform, Load):** Traditional pattern where data is transformed before
loading into the warehouse. Transformations happen in a staging area.

**ELT (Extract, Load, Transform):** Modern pattern where raw data is loaded first, then
transformed inside the warehouse using SQL (dbt). Preferred with modern cloud warehouses.

**Data Warehouse:** A centralized repository optimized for analytical queries. Uses
columnar storage, denormalized schemas, and query optimization for OLAP workloads.

**Data Lake:** A storage repository holding raw data in native format until needed.
Schema-on-read rather than schema-on-write.

**Data Lakehouse:** Combines data lake storage with warehouse management features
(ACID transactions, schema enforcement, indexing). Examples: Delta Lake, Apache Iceberg.

**Star Schema:** Dimensional model with a central fact table connected to dimension tables.
Optimized for aggregation queries. Developed by Kimball.

**Data Vault:** Modeling methodology focused on auditability and flexibility. Hub-link-satellite
architecture. Preferred for environments with frequent source system changes.

**dbt (data build tool):** SQL-based transformation framework. Manages dependencies,
testing, documentation. Treats data transformations as software with version control.

**Data Contract:** A formal agreement between data producers and consumers specifying
schema, quality expectations, freshness SLAs, and change notification procedures.

**Data Lineage:** The tracking of data from origin through all transformations to final
consumption. Critical for debugging, compliance, and impact analysis.

**Idempotency:** A pipeline property where running it multiple times with the same input
produces the same output. Essential for reliable data pipelines.

---

## Causal Inference

**Randomized Controlled Trial (RCT):** The gold standard for causal inference. Units are
randomly assigned to treatment and control groups, eliminating confounding.

**Confounding Variable:** A variable that influences both the treatment and the outcome,
creating a spurious association if not controlled for.

**Instrumental Variable (IV):** A variable that affects the outcome only through its effect
on the treatment. Used when randomization is impossible (Angrist & Imbens, 1996).

**Difference-in-Differences (DiD):** Compares the change in outcomes over time between
treatment and control groups. Requires the parallel trends assumption.

**Regression Discontinuity Design (RDD):** Exploits a cutoff in a continuous variable
that determines treatment assignment. Estimates causal effects at the cutoff.

**Propensity Score:** The probability of receiving treatment given observed covariates.
Used for matching or weighting to approximate randomization (Rosenbaum & Rubin, 1983).

**Average Treatment Effect (ATE):** E[Y(1) - Y(0)]. The average causal effect of treatment
across the entire population.

**CATE (Conditional Average Treatment Effect):** The treatment effect conditional on
covariates X. E[Y(1) - Y(0) | X = x]. Used for heterogeneous treatment effect estimation.

**Do-calculus:** Pearl's formal system for computing causal effects from observational
data using directed acyclic graphs (DAGs). P(Y | do(X)) differs from P(Y | X).

---

## MLOps

**Data Drift:** Changes in the distribution of input features between training and
serving. Detected via PSI, KS test, or Jensen-Shannon divergence.

**Concept Drift:** Changes in the relationship between features and target (P(Y|X) changes).
More dangerous than data drift because the model's learned function becomes invalid.

**Feature Store:** A centralized system for computing, storing, and serving features for
ML models. Ensures consistency between training and serving (feast, Tecton).

**Model Registry:** A versioned repository for trained model artifacts with metadata
(metrics, lineage, approval status). Examples: MLflow Model Registry, Weights & Biases.

**Shadow Mode:** Deploying a new model alongside the current production model, logging
predictions without serving them. Enables comparison before full rollout.

**Canary Deployment:** Gradually routing a small percentage of traffic to a new model
while monitoring performance before full rollout.

**Champion/Challenger:** A framework where the current production model (champion) is
continuously compared against new candidates (challengers) on live traffic.

---

## Analytics

**Cohort:** A group of users who share a common characteristic at a specific time
(e.g., users who signed up in January 2024). Used for retention and lifecycle analysis.

**LTV (Lifetime Value):** The total expected revenue from a customer over their entire
relationship. LTV = ARPU * Average Lifespan, or modeled via probabilistic methods (BG/NBD).

**Funnel Analysis:** Analyzing sequential steps in a user journey to identify drop-off
points. Each step has a conversion rate to the next step.

**Attribution Model:** A method for assigning credit for conversions across marketing
touchpoints. Last-touch, first-touch, linear, time-decay, position-based, or data-driven.

**Incrementality:** The causal effect of a marketing action above and beyond what would
have happened without it. Measured via randomized holdout experiments.

---

**This glossary is the authoritative terminology reference for all Data Brain operations.**

# Machine Learning Fundamentals

> Reference: Stanford CS229 (Andrew Ng), Bishop "Pattern Recognition and Machine Learning," Murphy "Probabilistic Machine Learning"

---

## 1. The Learning Problem

Machine learning is the study of algorithms that improve their performance at some task through experience. Formally (Mitchell, 1997): A computer program is said to learn from experience E with respect to task T and performance measure P, if its performance at T, as measured by P, improves with experience E.

### The Three Pillars

Every ML problem is defined by three choices:

1. **Representation** -- What hypothesis class H do we search over? (linear models, decision trees, neural networks)
2. **Evaluation** -- What objective function do we optimize? (loss function, likelihood, margin)
3. **Optimization** -- How do we search the hypothesis space? (gradient descent, EM, combinatorial optimization)

These three choices fully determine the learning algorithm. Poor choices in any pillar doom the system regardless of data quality or compute.

---

## 2. Supervised Learning

### Formal Setup

Given a training set D = {(x_1, y_1), ..., (x_n, y_n)} where x_i in R^d and y_i in Y, learn a function f: R^d -> Y that generalizes to unseen data.

- **Classification**: Y is discrete (e.g., {0, 1} for binary, {1, ..., K} for multiclass)
- **Regression**: Y is continuous (e.g., R)

### The Empirical Risk Minimization (ERM) Framework

The ideal objective is to minimize the expected risk (true risk):

```
R(f) = E_{(x,y) ~ P}[L(y, f(x))]
```

Since we do not know the true distribution P, we minimize the empirical risk:

```
R_emp(f) = (1/n) * sum_{i=1}^{n} L(y_i, f(x_i))
```

ERM alone leads to overfitting. We add regularization to control complexity:

```
R_reg(f) = R_emp(f) + lambda * Omega(f)
```

where Omega(f) is a complexity penalty (L1 norm for sparsity, L2 norm for smoothness).

### Key Supervised Algorithms

**Linear Regression**
- Model: f(x) = w^T x + b
- Loss: L(y, y_hat) = (y - y_hat)^2 (MSE)
- Closed-form solution: w* = (X^T X)^{-1} X^T y (Normal Equation)
- With L2 regularization (Ridge): w* = (X^T X + lambda I)^{-1} X^T y

**Logistic Regression**
- Model: P(y=1|x) = sigma(w^T x + b) where sigma(z) = 1/(1 + e^{-z})
- Loss: Binary cross-entropy L = -[y log(p) + (1-y) log(1-p)]
- No closed-form; optimized via gradient descent or Newton's method
- Decision boundary is linear (hyperplane in feature space)

**Support Vector Machines (SVM)**
- Finds the maximum-margin hyperplane separating classes
- Primal: min (1/2)||w||^2 subject to y_i(w^T x_i + b) >= 1
- Kernel trick: K(x_i, x_j) = phi(x_i)^T phi(x_j) enables nonlinear boundaries
- Common kernels: RBF (Gaussian), polynomial, sigmoid

**Decision Trees and Ensembles**
- Trees: Recursive binary partitioning of feature space. Split criteria: Gini impurity, information gain (entropy reduction)
- Random Forests: Bagging (bootstrap aggregating) of decorrelated trees. Reduces variance while maintaining low bias
- Gradient Boosting (XGBoost, LightGBM): Sequential additive models where each tree corrects the residual errors of the ensemble. Minimizes loss via functional gradient descent

**k-Nearest Neighbors (kNN)**
- Non-parametric: f(x) = majority vote (or average) of the k training points nearest to x
- Distance metrics: Euclidean, Manhattan, cosine, Mahalanobis
- Curse of dimensionality: in high dimensions, all points become equidistant, destroying the neighborhood structure

---

## 3. Unsupervised Learning

### Clustering

**k-Means**
- Objective: min sum_{i=1}^{k} sum_{x in C_i} ||x - mu_i||^2
- Algorithm: Alternate between (1) assigning points to nearest centroid and (2) recomputing centroids
- Converges to local optimum; sensitive to initialization (use k-means++)
- Assumes spherical, equally-sized clusters

**Hierarchical Clustering**
- Agglomerative (bottom-up): Start with each point as a cluster, merge closest pairs
- Linkage criteria: single (min distance), complete (max distance), average, Ward's (minimize variance increase)
- Produces a dendrogram; cut at desired level for k clusters

**DBSCAN (Density-Based Spatial Clustering)**
- Groups points in high-density regions separated by low-density regions
- Parameters: epsilon (neighborhood radius), minPts (minimum points for a core point)
- Discovers arbitrary-shaped clusters; naturally handles noise points

### Dimensionality Reduction

**PCA (Principal Component Analysis)** [F]
- Finds orthogonal directions of maximum variance in the data
- Formally: eigendecomposition of the covariance matrix Sigma = (1/n) X^T X
- First k principal components capture maximum variance in k dimensions
- Equivalent to minimizing reconstruction error ||X - X_k||^2_F

**t-SNE (t-distributed Stochastic Neighbor Embedding)**
- Nonlinear dimensionality reduction for visualization
- Converts pairwise distances to conditional probabilities, then minimizes KL divergence between high-dimensional and low-dimensional distributions
- Uses Student-t distribution in low-dimensional space to avoid crowding problem
- Not suitable for downstream ML (non-parametric, stochastic, non-convex)

**UMAP (Uniform Manifold Approximation and Projection)**
- Based on Riemannian geometry and algebraic topology
- Constructs fuzzy simplicial complex in high dimensions, optimizes cross-entropy to find low-dimensional representation
- Faster than t-SNE, better preserves global structure, can be used for downstream tasks

### Generative Models

**Variational Autoencoders (VAE)** [F]
- Encoder maps input to a distribution in latent space: q(z|x)
- Decoder generates data from latent code: p(x|z)
- Objective: maximize ELBO = E_q[log p(x|z)] - KL(q(z|x) || p(z))
- Enables principled generation and interpolation in latent space

**Generative Adversarial Networks (GANs)**
- Generator G maps noise z ~ p(z) to synthetic data G(z)
- Discriminator D classifies real vs. fake: min_G max_D E[log D(x)] + E[log(1 - D(G(z)))]
- Training instability: mode collapse, oscillation, vanishing gradients
- Largely superseded by diffusion models for image generation

---

## 4. Reinforcement Learning

### Markov Decision Process (MDP)

An MDP is defined by the tuple (S, A, T, R, gamma):
- S: set of states
- A: set of actions
- T(s'|s, a): transition probability
- R(s, a): reward function
- gamma in [0, 1): discount factor

The goal is to find a policy pi(a|s) that maximizes expected cumulative discounted reward:

```
V^pi(s) = E_pi[sum_{t=0}^{inf} gamma^t R(s_t, a_t) | s_0 = s]
```

### Key Algorithms

**Q-Learning (Off-Policy, Model-Free)**
- Learns the action-value function Q(s, a) = E[R + gamma * max_{a'} Q(s', a')]
- Update: Q(s,a) <- Q(s,a) + alpha * [r + gamma * max_{a'} Q(s',a') - Q(s,a)]
- Deep Q-Networks (DQN): Use neural network to approximate Q (Mnih et al., 2015)

**Policy Gradient Methods**
- Directly parameterize and optimize the policy pi_theta(a|s)
- REINFORCE: grad J(theta) = E_pi[sum_t grad log pi_theta(a_t|s_t) * G_t]
- High variance; reduce with baselines (actor-critic methods)

**Proximal Policy Optimization (PPO)**
- Clips the policy ratio to prevent destructively large updates:
- L^CLIP = E[min(r_t * A_t, clip(r_t, 1-eps, 1+eps) * A_t)]
- where r_t = pi_theta(a_t|s_t) / pi_theta_old(a_t|s_t)
- The standard algorithm for RLHF in LLM alignment

**RLHF Connection**
In language model alignment, RL is applied where:
- State: the prompt + tokens generated so far
- Action: the next token
- Reward: from a learned reward model trained on human preferences
- Policy: the language model itself
- PPO is used to fine-tune the policy to maximize the reward model while staying close to the reference policy (KL penalty)

---

## 5. Bias-Variance Tradeoff

### Decomposition

For squared loss, the expected prediction error decomposes:

```
E[(y - f_hat(x))^2] = [E[f_hat(x)] - f(x)]^2 + E[(f_hat(x) - E[f_hat(x)])^2] + sigma^2
                       |_________________________|   |__________________________________|   |_____|
                               Bias^2                           Variance                    Noise
```

- **Bias**: Error from wrong assumptions in the learning algorithm. High bias means the model is too simple to capture the true relationship (underfitting).
- **Variance**: Error from sensitivity to fluctuations in the training set. High variance means the model is too complex and memorizes noise (overfitting).
- **Irreducible error (sigma^2)**: Noise inherent in the problem that no model can eliminate.

### Practical Implications

| Symptom | Diagnosis | Remedy |
|---------|-----------|--------|
| High training error, high test error | High bias (underfitting) | More complex model, more features, less regularization |
| Low training error, high test error | High variance (overfitting) | More data, regularization, simpler model, dropout, early stopping |
| Both errors low and similar | Good fit | Monitor for distribution shift |

### Model Complexity Curve

As model complexity increases:
- Training error monotonically decreases
- Test error follows a U-shaped curve: decreases initially, then increases
- The optimal model complexity minimizes test error (the bottom of the U)

This is the most fundamental concept in ML. Every architecture decision, regularization choice, and hyperparameter tuning run is navigating this tradeoff.

---

## 6. Loss Functions

### Regression Losses

**Mean Squared Error (MSE / L2 Loss)**
```
L = (1/n) * sum (y_i - y_hat_i)^2
```
- Penalizes large errors quadratically; sensitive to outliers
- Gradient: 2(y_hat - y) -- smooth everywhere
- Corresponds to maximum likelihood under Gaussian noise assumption

**Mean Absolute Error (MAE / L1 Loss)**
```
L = (1/n) * sum |y_i - y_hat_i|
```
- Linear penalty; robust to outliers
- Non-differentiable at zero (use subgradients or Huber loss)
- Corresponds to maximum likelihood under Laplacian noise

**Huber Loss**
```
L = 0.5 * (y - y_hat)^2           if |y - y_hat| <= delta
    delta * |y - y_hat| - 0.5*delta^2   otherwise
```
- Combines MSE (small errors) and MAE (large errors)
- Differentiable everywhere; robust to outliers

### Classification Losses

**Binary Cross-Entropy (Log Loss)**
```
L = -(1/n) * sum [y_i log(p_i) + (1-y_i) log(1-p_i)]
```
- Derived from maximum likelihood for Bernoulli distribution
- Heavily penalizes confident wrong predictions
- Standard loss for binary classification (logistic regression, neural networks)

**Categorical Cross-Entropy**
```
L = -(1/n) * sum_i sum_c y_{ic} log(p_{ic})
```
- Generalization of binary cross-entropy to K classes
- Used with softmax output layer: p_c = exp(z_c) / sum_j exp(z_j)
- Equivalent to negative log-likelihood for categorical distribution

**Focal Loss** (Lin et al., 2017)
```
L = -alpha_t * (1 - p_t)^gamma * log(p_t)
```
- Down-weights well-classified examples; focuses on hard examples
- Addresses class imbalance in object detection
- gamma=0 recovers standard cross-entropy; gamma=2 is common

### Contrastive and Similarity Losses

**Contrastive Loss**
```
L = (1-y) * 0.5 * D^2 + y * 0.5 * max(0, margin - D)^2
```
- Pulls similar pairs together, pushes dissimilar pairs apart
- Foundation of metric learning and embedding training

**InfoNCE Loss** (used in CLIP, SimCLR)
```
L = -log(exp(sim(z_i, z_j)/tau) / sum_k exp(sim(z_i, z_k)/tau))
```
- Identifies the positive pair among N-1 negatives
- tau is temperature; lower temperature makes the distribution sharper
- Core loss function for contrastive learning of embeddings

---

## 7. Evaluation Methodology

### Train/Validation/Test Split

- **Training set** (typically 70-80%): Used to fit model parameters
- **Validation set** (typically 10-15%): Used for hyperparameter tuning and model selection
- **Test set** (typically 10-15%): Used ONCE for final performance estimation

**Critical rule**: The test set must NEVER influence model development decisions. Any information leakage from test to training invalidates the performance estimate.

### Cross-Validation

When data is limited, k-fold cross-validation provides better estimates:

1. Partition data into k equal folds
2. For each fold i: train on all folds except i, evaluate on fold i
3. Average performance across all k evaluations

- k=5 or k=10 are standard choices
- Stratified k-fold preserves class proportions in each fold
- Leave-one-out (k=n) has lowest bias but highest variance

### Metrics

**Classification Metrics**
- Accuracy = (TP + TN) / (TP + TN + FP + FN) -- misleading with class imbalance
- Precision = TP / (TP + FP) -- "of those predicted positive, how many are correct?"
- Recall = TP / (TP + FN) -- "of those actually positive, how many were found?"
- F1 = 2 * Precision * Recall / (Precision + Recall) -- harmonic mean
- AUC-ROC: Area under the receiver operating characteristic curve; threshold-invariant

**Regression Metrics**
- MSE, RMSE: Standard error measures (sensitive to outliers)
- MAE: Robust error measure
- R^2 = 1 - SS_res/SS_tot: Proportion of variance explained (1 is perfect, 0 is baseline)
- MAPE: Mean Absolute Percentage Error (scale-invariant, undefined when y=0)

---

## 8. Feature Engineering and Data Quality

### The Data-Centric AI Perspective

Andrew Ng's data-centric AI paradigm argues that for most practical applications, improving data quality yields larger gains than improving model architecture. Key principles:

1. **Clean labels** are more important than more labels
2. **Consistent labeling criteria** matter more than labeler agreement
3. **Targeted data collection** for failure modes beats random data augmentation
4. **Data versioning** (DVC, LakeFS) is as important as code versioning

### Feature Engineering Techniques

- **Numerical**: Scaling (StandardScaler, MinMaxScaler), log transforms, polynomial features, binning
- **Categorical**: One-hot encoding, target encoding, ordinal encoding, embedding layers
- **Text**: TF-IDF, word embeddings, subword tokenization, contextual embeddings
- **Temporal**: Lag features, rolling statistics, Fourier features, holiday indicators
- **Missing data**: Imputation (mean, median, KNN, MICE), missingness indicators

### Data Quality Checks

Before training any model, verify:
- Class distribution and imbalance ratio
- Missing value patterns (MCAR, MAR, MNAR)
- Outlier detection (IQR, z-score, isolation forest)
- Feature correlations and multicollinearity
- Train/test distribution shift (PSI, KS test)
- Data leakage (features that encode the target)

---

## 9. When to Use What

### Algorithm Selection Guide

| Problem Type | Data Size | First Try | Scale Up To |
|-------------|-----------|-----------|-------------|
| Tabular classification | Small (<10K) | Logistic Regression, Random Forest | XGBoost, LightGBM |
| Tabular classification | Large (>100K) | XGBoost, LightGBM | Neural networks (TabNet) |
| Tabular regression | Any | XGBoost, LightGBM | Neural networks for very large |
| Image classification | Any | Pretrained CNN/ViT + fine-tune | Custom architecture |
| Text classification | Small | TF-IDF + LogReg | Fine-tuned LLM |
| Text classification | Large | Fine-tuned BERT/RoBERTa | Fine-tuned LLM |
| Sequence prediction | Any | LSTM/GRU or Transformer | Transformer |
| Recommendation | Any | Matrix factorization | Deep collaborative filtering |
| Anomaly detection | Any | Isolation Forest, Autoencoder | Custom ensemble |

### The "No Free Lunch" Theorem (Wolpert, 1996)

No single algorithm is universally best across all possible problems. Any algorithm that outperforms random on some class of problems must underperform on another class. This motivates:
- Problem-specific algorithm selection
- Empirical evaluation rather than theoretical preference
- Ensemble methods that combine diverse learners

---

**This module provides the theoretical foundation for all AI Brain operations. All subsequent modules build on these fundamentals.**

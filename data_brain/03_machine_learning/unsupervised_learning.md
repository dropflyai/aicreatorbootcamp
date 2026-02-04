# Unsupervised Learning — Clustering, Dimensionality Reduction, and Anomaly Detection

## Overview

Unsupervised learning discovers structure in unlabeled data. The three primary tasks are
clustering (grouping similar observations), dimensionality reduction (finding low-dimensional
representations), and anomaly detection (identifying outliers). Unlike supervised learning,
there is no ground truth label, making evaluation inherently more challenging and requiring
domain-informed judgment alongside quantitative metrics.

References: Hastie, Tibshirani & Friedman (ESL Ch. 13-14), Bishop (PRML Ch. 9-12),
Murphy (MLAPP Ch. 11, 25), Stanford CS229 unsupervised learning lectures.

---

## Clustering Algorithms

### K-Means Clustering

**Objective:** Minimize the within-cluster sum of squares (WCSS):

```
J = sum_{k=1}^{K} sum_{x_i in C_k} ||x_i - mu_k||^2

Where mu_k = (1/|C_k|) sum_{x_i in C_k} x_i  is the centroid of cluster k
```

**Lloyd's Algorithm:**
1. Initialize K centroids (random, k-means++, or other strategy)
2. Assign each point to nearest centroid: C_k = {x_i : ||x_i - mu_k|| <= ||x_i - mu_j|| for all j}
3. Recompute centroids: mu_k = mean of points in C_k
4. Repeat until convergence (guaranteed to converge, but to local minimum)

**K-Means++ Initialization (Arthur & Vassilvitskii, 2007):**
Choose first centroid uniformly at random. For subsequent centroids, select x with
probability proportional to D(x)^2 (squared distance to nearest existing centroid).
This guarantees O(log K) competitive ratio with optimal clustering.

**Complexity:** O(n * K * d * I) where I is iterations. Typically converges in few iterations.

**Limitations:**
- Assumes spherical, equally-sized clusters
- Sensitive to initialization (mitigated by k-means++)
- Must specify K in advance
- Sensitive to outliers (use k-medoids/PAM for robustness)

### K-Medoids (PAM)

Uses actual data points as cluster centers instead of means. Minimizes sum of
dissimilarities rather than squared distances. More robust to outliers. O(n^2 * K * I).

### Hierarchical Clustering

**Agglomerative (bottom-up):** Start with n singleton clusters, merge the two
closest at each step until one cluster remains.

**Linkage criteria:**
- Single linkage: min distance between any two points in different clusters
  (sensitive to chaining, discovers elongated clusters)
- Complete linkage: max distance (produces compact clusters, sensitive to outliers)
- Average linkage: mean pairwise distance (compromise)
- Ward's method: merge clusters that minimize increase in total WCSS
  (equivalent to k-means objective, produces spherical clusters)

**Dendrogram:** Tree visualization of the merge sequence. Cut at desired height
to obtain K clusters. Cophenetic correlation measures dendrogram faithfulness.

**Complexity:** O(n^2 * log n) with efficient implementations. O(n^3) for naive.

### DBSCAN (Ester et al., 1996)

Density-Based Spatial Clustering of Applications with Noise.

**Parameters:** epsilon (neighborhood radius), minPts (minimum points for core point).

**Point classification:**
- Core point: has >= minPts neighbors within epsilon
- Border point: within epsilon of a core point but not itself core
- Noise point: neither core nor border

**Algorithm:**
1. For each unvisited point, find epsilon-neighborhood
2. If core point, start a new cluster and expand by recursively adding
   density-reachable points
3. Points not reachable from any core point are labeled noise

**Strengths:** Discovers arbitrarily shaped clusters, automatically determines
number of clusters, identifies noise. **Weakness:** Struggles with varying densities.

**HDBSCAN (Campello et al., 2013):** Hierarchical extension that handles varying
densities. Builds a hierarchy of DBSCAN clusterings across all epsilon values and
extracts stable clusters using cluster persistence.

### Gaussian Mixture Models (GMM)

**Generative model:** Data is generated from a mixture of K Gaussians:

```
p(x) = sum_{k=1}^{K} pi_k * N(x | mu_k, Sigma_k)

Where:
  pi_k     = mixing coefficient (pi_k >= 0, sum pi_k = 1)
  mu_k     = mean of component k
  Sigma_k  = covariance matrix of component k
```

**Expectation-Maximization (EM) Algorithm:**

E-step: Compute responsibilities (posterior probability of cluster membership):
```
r_{nk} = pi_k * N(x_n | mu_k, Sigma_k) / sum_j pi_j * N(x_n | mu_j, Sigma_j)
```

M-step: Update parameters using responsibilities:
```
N_k     = sum_n r_{nk}
mu_k    = (1/N_k) sum_n r_{nk} * x_n
Sigma_k = (1/N_k) sum_n r_{nk} * (x_n - mu_k)(x_n - mu_k)^T
pi_k    = N_k / N
```

EM monotonically increases the log-likelihood (or stays flat at convergence).
Converges to local maximum. Use BIC for model selection (choosing K):
BIC = -2 * log(L) + k * log(n), where k is number of free parameters.

**Covariance types:** full, tied, diagonal, spherical (in order of decreasing
flexibility and number of parameters).

---

## Dimensionality Reduction

### Principal Component Analysis (PCA)

**Objective:** Find orthogonal directions of maximum variance.

```
Formally: w_1 = argmax_{||w||=1} Var(X * w) = argmax_{||w||=1} w^T S w

Where S = (1/n) X^T X is the sample covariance matrix (X is centered).
```

Solution: w_1, w_2, ..., w_d are the eigenvectors of S sorted by decreasing
eigenvalue. Equivalently, the right singular vectors of X from SVD: X = U Sigma V^T.

**Proportion of variance explained:** lambda_k / sum lambda_j for component k.
Choose number of components to retain (e.g., 95% of variance, or scree plot elbow).

**Kernel PCA:** Apply PCA in feature space via kernel trick. Enables non-linear
dimensionality reduction. Eigendecomposition of kernel matrix K instead of covariance.

**Probabilistic PCA (Tipping & Bishop, 1999):** Generative model
x = W*z + mu + epsilon, where z ~ N(0, I), epsilon ~ N(0, sigma^2 I).
Handles missing data naturally via EM.

### t-SNE (van der Maaten & Hinton, 2008)

t-Distributed Stochastic Neighbor Embedding. Non-linear, primarily for visualization.

**Joint probability in high-dimensional space (Gaussian kernel):**
```
p_{j|i} = exp(-||x_i - x_j||^2 / 2*sigma_i^2) / sum_{k!=i} exp(-||x_i - x_k||^2 / 2*sigma_i^2)
p_{ij} = (p_{j|i} + p_{i|j}) / 2n
```

**Joint probability in low-dimensional space (Student-t with 1 df):**
```
q_{ij} = (1 + ||y_i - y_j||^2)^{-1} / sum_{k!=l} (1 + ||y_k - y_l||^2)^{-1}
```

**Objective:** Minimize KL divergence: KL(P||Q) = sum_{ij} p_{ij} log(p_{ij}/q_{ij})

The heavy-tailed Student-t distribution in the embedding space alleviates the
crowding problem (moderate distances in high-D map to very small distances in low-D).

**Perplexity:** Controls the effective number of neighbors. Typical range: 5-50.
sigma_i is set so that perplexity of the conditional distribution equals the target.

**Limitations:** Non-convex optimization, results depend on initialization and
perplexity. Not suitable for new points (no parametric mapping). Global structure
is not preserved reliably.

### UMAP (McInnes et al., 2018)

Uniform Manifold Approximation and Projection. Based on Riemannian geometry and
algebraic topology (fuzzy simplicial sets).

**Advantages over t-SNE:**
- Better preservation of global structure
- Faster (O(n^1.14) vs O(n^2) for t-SNE)
- Supports transform (embedding new points)
- Works for general dimensionality reduction, not just 2D

**Key parameters:** n_neighbors (local vs. global structure), min_dist (tightness
of embedding), metric (distance function).

---

## Anomaly Detection

### Statistical Methods

- Z-score: Flag if |x - mu| / sigma > threshold (assumes Gaussianity)
- Mahalanobis distance: d(x) = sqrt((x-mu)^T Sigma^{-1} (x-mu)) accounts for
  correlations. Follows chi-squared distribution with p degrees of freedom under normality.
- Grubbs' test, Dixon's Q test for univariate outliers

### Isolation Forest (Liu et al., 2008)

Key insight: anomalies are easier to isolate (require fewer random splits).

**Algorithm:**
1. Build ensemble of isolation trees (random feature, random split point)
2. Anomaly score s(x, n) = 2^{-E[h(x)] / c(n)}
   where h(x) is path length, c(n) is average path length of unsuccessful BST search

Score near 1: anomaly. Score near 0.5: normal. Near 0: dense region.

**Strengths:** O(n * t * log(psi)) where t is trees, psi is subsample size.
Linear time, handles high dimensions, no distance computation.

### Autoencoder-Based Anomaly Detection

Train autoencoder on normal data. Reconstruction error on new data serves as anomaly score:

score(x) = ||x - Decoder(Encoder(x))||^2

High reconstruction error indicates the input deviates from learned normal patterns.
Variational autoencoders provide probabilistic scores via ELBO.

### One-Class SVM

Learn a decision boundary around normal data in kernel-induced feature space:
min (1/2)||w||^2 + (1/(nu*n)) sum max(0, -w^T phi(x_i) + rho) - rho

Parameter nu is an upper bound on the fraction of outliers.

---

## Association Rules

### Apriori Algorithm

Discover frequent itemsets and generate association rules from transactional data.

**Key metrics:**
- Support: supp(X) = |transactions containing X| / |total transactions|
- Confidence: conf(X -> Y) = supp(X union Y) / supp(X)
- Lift: lift(X -> Y) = conf(X -> Y) / supp(Y) (lift > 1 indicates positive association)
- Conviction: conv(X -> Y) = (1 - supp(Y)) / (1 - conf(X -> Y))

**Apriori principle:** If an itemset is infrequent, all its supersets are infrequent.
This enables efficient pruning of the search space.

**FP-Growth:** More efficient alternative using a compressed representation (FP-tree)
that avoids candidate generation entirely. Two passes over the data.

---

## Evaluation Metrics for Unsupervised Learning

### Internal Metrics (No Ground Truth)

**Silhouette Score (Rousseeuw, 1987):**
```
s(i) = (b(i) - a(i)) / max(a(i), b(i))

Where:
  a(i) = mean distance from i to other points in same cluster (cohesion)
  b(i) = min over other clusters of mean distance to that cluster (separation)
```
Range: [-1, 1]. Higher is better. Mean silhouette over all points summarizes quality.

**Davies-Bouldin Index:**
```
DB = (1/K) sum_{k=1}^{K} max_{j != k} (sigma_k + sigma_j) / d(mu_k, mu_j)
```
Lower is better. Measures ratio of within-cluster scatter to between-cluster separation.

**Calinski-Harabasz Index (Variance Ratio Criterion):**
```
CH = [tr(B_K) / (K-1)] / [tr(W_K) / (n-K)]
```
Higher is better. Ratio of between-cluster to within-cluster variance.

**Elbow Method:**
Plot WCSS (or distortion) vs. K. The "elbow" point where marginal decrease
diminishes suggests the appropriate K. Subjective but widely used.

### External Metrics (With Ground Truth)

- Adjusted Rand Index (ARI): corrected-for-chance measure of cluster agreement
- Normalized Mutual Information (NMI): MI normalized to [0, 1]
- V-measure: harmonic mean of homogeneity and completeness
- Fowlkes-Mallows Index: geometric mean of precision and recall at pair level

---

## Dimensionality Reduction Theory

### The Curse of Dimensionality

As dimensionality d increases:
- Volume of unit hypersphere approaches zero relative to unit hypercube
- Data becomes increasingly sparse (distances concentrate)
- k-NN breaks down: ratio of nearest to farthest neighbor approaches 1
- More data needed: n ~ O(exp(d)) for fixed density

**Johnson-Lindenstrauss Lemma:** n points in R^d can be embedded in R^k with
k = O(log(n) / epsilon^2) while preserving pairwise distances within (1 +/- epsilon).
This is the theoretical basis for random projection methods.

### Manifold Hypothesis

High-dimensional data often lies on or near a lower-dimensional manifold.
Dimensionality reduction methods exploit this by finding the manifold structure:
- PCA: linear manifold (subspace)
- t-SNE, UMAP: non-linear manifold
- Autoencoders: learned non-linear manifold via neural networks

### Feature Selection vs. Feature Extraction

Feature selection: choose a subset of original features (filter, wrapper, embedded methods).
Feature extraction: create new features as combinations of originals (PCA, autoencoders).

Feature selection preserves interpretability; extraction often achieves better compression.

---

## Practical Considerations

### Preprocessing for Unsupervised Learning

- Scaling is critical: k-means and PCA are sensitive to feature magnitudes
  (use StandardScaler or MinMaxScaler)
- Handle missing values before clustering (impute or use algorithms that handle them)
- Remove or down-weight highly correlated features to avoid biased clustering

### Choosing an Algorithm

| Data Characteristic | Recommended Algorithm |
|---------------------|----------------------|
| Spherical clusters, known K | K-means |
| Arbitrary shape clusters | DBSCAN, HDBSCAN |
| Probabilistic cluster assignment needed | GMM |
| Hierarchical structure | Agglomerative clustering |
| High-dimensional visualization | UMAP or t-SNE |
| Linear dimensionality reduction | PCA |
| Anomaly detection, large data | Isolation Forest |
| Streaming/incremental | Mini-batch K-means |

### Validation Strategy

1. Run multiple algorithms and compare with internal metrics
2. Vary K and plot stability metrics
3. Use domain knowledge to validate cluster interpretability
4. Bootstrap resampling to assess cluster stability (Hennig, 2007)
5. Consensus clustering: run algorithm many times, measure co-occurrence matrix

---

## Cross-References

- Probability foundations: `01_foundations/probability_and_statistics.md`
- Bayesian mixture models: `02_statistical_inference/bayesian_methods.md`
- Supervised counterparts: `03_machine_learning/supervised_learning.md`
- Neural network approaches: `03_machine_learning/deep_learning.md`
- Customer segmentation application: `05_analytics/business_analytics.md`

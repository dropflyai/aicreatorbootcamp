# Linear Algebra Essentials for Data Science

## Overview

Linear algebra is the mathematical language of data. Every dataset is a matrix. Every
ML model performs matrix operations. Every dimensionality reduction technique rests on
eigendecomposition or singular value decomposition. This module covers the linear algebra
foundations essential for understanding and implementing data science methods.

References: Strang (Introduction to Linear Algebra, 5th ed.), Boyd & Vandenberghe
(Introduction to Applied Linear Algebra), Goodfellow et al. (Deep Learning, Chapter 2).

---

## Vectors and Vector Spaces

### Vectors

A vector x in R^n is an ordered list of n real numbers:
x = [x_1, x_2, ..., x_n]^T

In data science, a vector typically represents:
- A single data point (feature vector) with n features
- A column of a dataset (all values of one feature across m observations)
- Model parameters (weights in a regression or neural network)
- An embedding (dense representation in a learned space)

### Vector Operations

**Addition:** x + y = [x_1 + y_1, ..., x_n + y_n]^T (component-wise)

**Scalar multiplication:** c*x = [c*x_1, ..., c*x_n]^T

**Dot product (inner product):**
x^T * y = sum_i (x_i * y_i) = ||x|| * ||y|| * cos(theta)

The dot product encodes both magnitude and angular similarity. This is why cosine
similarity (x^T*y / (||x|| * ||y||)) is fundamental to NLP embeddings, recommendation
systems, and information retrieval.

**Norms:**
- L1 norm: ||x||_1 = sum_i |x_i| (Manhattan distance, promotes sparsity in Lasso)
- L2 norm: ||x||_2 = sqrt(sum_i x_i^2) (Euclidean distance, used in Ridge regression)
- L-infinity norm: ||x||_inf = max_i |x_i|
- Lp norm: ||x||_p = (sum_i |x_i|^p)^(1/p)

**Why norms matter in ML:**
- L1 regularization (Lasso) drives coefficients to exactly zero (feature selection)
- L2 regularization (Ridge) shrinks coefficients toward zero (prevents overfitting)
- L1 + L2 (Elastic Net) combines sparsity with grouping effect

### Linear Independence and Span

Vectors v_1, ..., v_k are linearly independent if:
c_1*v_1 + c_2*v_2 + ... + c_k*v_k = 0 implies c_1 = c_2 = ... = c_k = 0

The span of a set of vectors is the set of all linear combinations.

The rank of a matrix equals the number of linearly independent columns (or rows).
If rank(X) < min(m, n), the matrix is rank-deficient, which causes:
- Non-invertibility (singular matrix)
- Multicollinearity in regression (infinite solutions)
- Numerical instability in optimization

---

## Matrices

### Matrix as Data

An m x n matrix X represents:
- m observations (rows) of n features (columns) -- the data matrix
- A linear transformation from R^n to R^m
- A system of m linear equations in n unknowns

### Key Matrix Operations

**Matrix multiplication:** (AB)_{ij} = sum_k A_{ik} * B_{kj}
- Not commutative: AB != BA in general
- Associative: (AB)C = A(BC)
- Computational cost: O(m*n*p) for m x n times n x p

**Transpose:** (A^T)_{ij} = A_{ji}
- (AB)^T = B^T * A^T
- For symmetric matrices: A = A^T

**Inverse:** A^(-1) exists iff det(A) != 0 (A is non-singular)
- A * A^(-1) = A^(-1) * A = I
- (AB)^(-1) = B^(-1) * A^(-1)
- Computing the inverse directly is numerically unstable; prefer solving Ax = b directly

**Trace:** tr(A) = sum_i A_{ii}
- tr(AB) = tr(BA) (cyclic property)
- tr(A) = sum of eigenvalues

**Determinant:** det(A) = product of eigenvalues
- det(A) = 0 iff A is singular
- Geometric interpretation: scaling factor of the linear transformation

### Special Matrices

**Symmetric:** A = A^T. Covariance matrices are always symmetric positive semi-definite.

**Orthogonal:** Q^T * Q = Q * Q^T = I. Columns are orthonormal vectors.
- Preserves norms and angles: ||Qx|| = ||x||
- Rotation and reflection matrices are orthogonal
- Orthogonal matrices are numerically stable

**Positive Definite:** x^T * A * x > 0 for all non-zero x.
- All eigenvalues are positive
- Covariance matrices are positive semi-definite (>= 0)
- Guarantees a unique minimum in quadratic optimization (convexity)

**Diagonal:** Non-zero entries only on the main diagonal.
- Eigendecomposition produces a diagonal matrix of eigenvalues
- Diagonal matrices are trivial to invert: D^(-1)_{ii} = 1/D_{ii}

---

## Eigendecomposition

### Definition

For a square matrix A, eigenvalue lambda and eigenvector v satisfy:
A * v = lambda * v

Equivalently: (A - lambda * I) * v = 0, which has non-trivial solutions iff
det(A - lambda * I) = 0 (the characteristic equation).

### Eigendecomposition of Symmetric Matrices

For a real symmetric matrix A (e.g., a covariance matrix):
A = Q * Lambda * Q^T

Where:
- Q = [q_1, q_2, ..., q_n] is an orthogonal matrix of eigenvectors
- Lambda = diag(lambda_1, lambda_2, ..., lambda_n) is a diagonal matrix of eigenvalues
- Eigenvalues are real (guaranteed by symmetry)
- Eigenvectors are orthogonal (guaranteed by symmetry)

### Why Eigendecomposition Matters in Data Science

**PCA (Principal Component Analysis):**
The covariance matrix Sigma = (1/(n-1)) * X^T * X (where X is centered) is symmetric.
Its eigenvectors are the principal components. Its eigenvalues are the variance explained
by each component.

Proportion of variance explained by the first k components:
sum(lambda_1, ..., lambda_k) / sum(lambda_1, ..., lambda_n)

**Spectral Clustering:**
The graph Laplacian L = D - W (D = degree matrix, W = adjacency matrix) is symmetric
positive semi-definite. Its smallest eigenvectors reveal cluster structure.

**PageRank:**
The dominant eigenvector of the web's transition matrix gives the PageRank scores.

**Dynamical Systems:**
Eigenvalues of the state transition matrix determine system stability.
|lambda| < 1 for all eigenvalues implies stability (convergence).

---

## Singular Value Decomposition (SVD)

### Definition

Any m x n matrix A (not necessarily square) can be decomposed as:
A = U * Sigma * V^T

Where:
- U is m x m orthogonal (left singular vectors)
- Sigma is m x n diagonal with non-negative entries (singular values sigma_1 >= sigma_2 >= ... >= 0)
- V is n x n orthogonal (right singular vectors)

### Relationship to Eigendecomposition

- A^T * A = V * Sigma^T * Sigma * V^T (eigendecomposition of A^T*A gives V and sigma_i^2)
- A * A^T = U * Sigma * Sigma^T * U^T (eigendecomposition of A*A^T gives U and sigma_i^2)
- Singular values of A = square roots of eigenvalues of A^T*A

### Truncated SVD (Low-Rank Approximation)

The best rank-k approximation to A (in Frobenius norm) is:
A_k = U_k * Sigma_k * V_k^T

Where only the top k singular values/vectors are retained.

**Eckart-Young-Mirsky Theorem:**
||A - A_k||_F = sqrt(sigma_{k+1}^2 + ... + sigma_r^2)

No other rank-k matrix achieves a smaller approximation error.

### Applications of SVD

**Dimensionality Reduction:**
PCA is equivalent to SVD of the centered data matrix. The right singular vectors V
are the principal components.

**Latent Semantic Analysis (LSA):**
SVD of the term-document matrix reveals latent semantic structure.
Documents and terms mapped to a shared low-dimensional space.

**Recommendation Systems:**
Matrix factorization for collaborative filtering: R approx U * Sigma * V^T
where R is the user-item rating matrix.

**Data Compression:**
Store only k singular values/vectors instead of the full matrix.
Compression ratio: k*(m + n + 1) / (m*n)

**Pseudoinverse:**
The Moore-Penrose pseudoinverse A^+ = V * Sigma^+ * U^T
where Sigma^+ has 1/sigma_i for non-zero singular values. Used for solving
least-squares problems when A is not invertible.

---

## Matrix Calculus for Machine Learning

### Gradients

For a scalar-valued function f(x) where x is a vector:
gradient_x f = [df/dx_1, df/dx_2, ..., df/dx_n]^T

For a scalar-valued function f(X) where X is a matrix:
(gradient_X f)_{ij} = df/dX_{ij}

### Key Derivatives

| Function | Derivative |
|----------|-----------|
| f(x) = a^T * x | gradient = a |
| f(x) = x^T * A * x | gradient = (A + A^T) * x = 2Ax if A symmetric |
| f(X) = tr(AX) | gradient = A^T |
| f(X) = tr(X^T * A * X) | gradient = (A + A^T) * X |
| f(x) = \|\|Ax - b\|\|^2 | gradient = 2 * A^T * (Ax - b) |

### Why This Matters

**Linear Regression (OLS):**
Minimize ||Xw - y||^2
gradient = 2 * X^T * (Xw - y) = 0
Solution: w = (X^T * X)^(-1) * X^T * y (the normal equation)

**Ridge Regression:**
Minimize ||Xw - y||^2 + lambda * ||w||^2
Solution: w = (X^T * X + lambda * I)^(-1) * X^T * y
The lambda * I term ensures invertibility (regularization = adding to diagonal).

**Neural Networks:**
Backpropagation is repeated application of the chain rule through matrix operations.
Understanding matrix calculus is essential for implementing custom layers and losses.

---

## Numerical Considerations

### Condition Number

kappa(A) = sigma_max / sigma_min (ratio of largest to smallest singular value)

- kappa(A) near 1: well-conditioned, numerical computations are stable
- kappa(A) >> 1: ill-conditioned, small perturbations in input cause large output changes
- kappa(A) = infinity: singular matrix

**Practical implication:** If your feature matrix X has a high condition number,
multicollinearity is present. Regularization (Ridge) or feature removal is needed.

### Avoiding Explicit Inverses

Never compute A^(-1) explicitly. Instead:
- Solve Ax = b using LU decomposition, Cholesky (for positive definite), or QR
- Use the pseudoinverse via SVD for least-squares problems
- Use iterative methods (conjugate gradient) for large sparse systems

### Sparse Matrices

Many real-world matrices are sparse (most entries are zero):
- User-item matrices in recommendation systems
- Document-term matrices in NLP
- Adjacency matrices of graphs

Sparse storage formats: CSR (compressed sparse row), CSC (compressed sparse column),
COO (coordinate). Use scipy.sparse or equivalent.

Operations on sparse matrices preserve sparsity when possible, with orders-of-magnitude
speedups over dense operations.

---

## Cheat Sheet: Linear Algebra in ML Algorithms

| Algorithm | Key Linear Algebra | Core Operation |
|-----------|-------------------|----------------|
| Linear Regression | Normal equations | (X^T X)^(-1) X^T y |
| PCA | Eigendecomposition / SVD | Covariance matrix eigenvectors |
| SVMs | Kernel matrices | K_{ij} = k(x_i, x_j) |
| Neural Networks | Matrix multiplication | Forward: Wx + b, Backward: chain rule |
| Spectral Clustering | Graph Laplacian eigenvectors | Smallest eigenvectors of L |
| Recommendation | Matrix factorization (SVD) | R approx U Sigma V^T |
| LDA (topic model) | Matrix decomposition | Term-topic and topic-document matrices |
| t-SNE / UMAP | Pairwise distance matrices | Distance computation and embedding |

---

**Every matrix operation in ML has a geometric interpretation. Understanding the geometry
leads to better intuition, better debugging, and better models.**

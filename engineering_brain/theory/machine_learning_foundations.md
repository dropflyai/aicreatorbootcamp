# Machine Learning Foundations

## What This Enables

Machine learning foundations provide the mathematical framework for understanding why learning algorithms work, when they fail, and what their fundamental limitations are. This knowledge enables engineers to diagnose model failures from first principles, select appropriate model architectures based on theoretical properties rather than hype, understand generalization (why a model works on new data, not just training data), and reason about the tradeoffs between model complexity, data requirements, and computational cost. Without these foundations, ML engineering reduces to trial-and-error hyperparameter tuning.

---

## Foundational Concepts

### Statistical Learning Theory

The central question: given a finite sample of training data, what can we guarantee about a model's performance on unseen data?

**Setup:**
- Data drawn i.i.d. from unknown distribution D over X x Y.
- Hypothesis class H: set of functions h: X -> Y we consider.
- Loss function L(h(x), y): measures prediction error.
- True risk: R(h) = E_{(x,y) ~ D}[L(h(x), y)] (what we want to minimize).
- Empirical risk: R_hat(h) = (1/n) * sum_{i=1}^{n} L(h(x_i), y_i) (what we can compute).

The gap between empirical risk and true risk is the generalization gap. Statistical learning theory bounds this gap.

### PAC Learning (Valiant, 1984)

**Probably Approximately Correct (PAC) learning:**

A concept class C is PAC-learnable if there exists an algorithm A such that for any distribution D over X, any target concept c in C, any epsilon > 0 (accuracy), and any delta > 0 (confidence):

Given m >= m_0(epsilon, delta) training examples drawn from D, algorithm A outputs hypothesis h in H such that:
```
Pr[R(h) <= epsilon] >= 1 - delta
```

The sample complexity m_0(epsilon, delta) must be polynomial in 1/epsilon and 1/delta.

**Finite hypothesis classes:** If |H| is finite:
```
m >= (1/epsilon) * (ln|H| + ln(1/delta))
```
suffices for PAC learning. This is the fundamental sample complexity bound.

### VC Dimension (Vapnik-Chervonenkis, 1971)

The VC dimension measures the capacity (expressiveness) of a hypothesis class.

**Definition:** VC(H) is the largest set of points that H can shatter. A set S is shattered by H if for every labeling of S, some h in H achieves that labeling.

**Examples:**
- Linear classifiers in R^d: VC = d + 1
- Decision stumps (single threshold): VC = 2
- Sine functions (sin(omega * x)): VC = infinity
- Neural networks: approximately proportional to number of parameters (with caveats)

**VC generalization bound:** With probability at least 1 - delta:
```
R(h) <= R_hat(h) + sqrt((VC(H) * (ln(2n/VC(H)) + 1) + ln(4/delta)) / n)
```

**Interpretation:** The generalization gap depends on VC dimension / n. More complex models (higher VC dimension) need proportionally more data to generalize.

**Fundamental theorem of statistical learning:** For binary classification with 0-1 loss, the following are equivalent:
1. H has finite VC dimension.
2. H is PAC learnable.
3. Uniform convergence holds for H.

### Bias-Variance Tradeoff

For any hypothesis h, the expected squared error decomposes as:
```
E[(h(x) - y)^2] = Bias(h)^2 + Var(h) + sigma^2
```

Where:
- **Bias^2:** Error from erroneous assumptions in the learning algorithm. High bias = underfitting (model too simple).
- **Variance:** Error from sensitivity to fluctuations in the training set. High variance = overfitting (model too complex).
- **sigma^2:** Irreducible error (noise in the data).

**The tradeoff:** Increasing model complexity decreases bias but increases variance. The optimal model balances both.

**Double descent phenomenon (Belkin et al., 2019):** Modern overparameterized models (deep neural networks) exhibit a "double descent" curve: test error first decreases, then increases (classical bias-variance tradeoff), then decreases again as the model becomes massively overparameterized. This challenges the classical view and is partially explained by implicit regularization in gradient descent.

---

## Key Theorems and Results

### Gradient Descent Convergence

**Setup:** Minimize f(w) where f is differentiable. Gradient descent: w_{t+1} = w_t - eta * grad_f(w_t).

**Theorem (convex, L-smooth):** If f is convex and L-smooth (||grad_f(x) - grad_f(y)|| <= L * ||x - y||), then gradient descent with step size eta = 1/L satisfies:
```
f(w_T) - f(w*) <= L * ||w_0 - w*||^2 / (2T)
```

Convergence rate: O(1/T) for convex, O(1/T^2) for strongly convex (with optimal step size).

**Stochastic Gradient Descent (SGD):** Uses a random subset (mini-batch) of data for each gradient estimate.

Convergence rate for convex: O(1/sqrt(T)) -- slower due to gradient noise. But each step is much cheaper.

**SGD for non-convex (neural networks):** SGD converges to a stationary point (grad_f = 0), which may be a local minimum or saddle point. For deep networks, empirical and theoretical evidence suggests most local minima are nearly as good as the global minimum (loss surface is benign in high dimensions).

### Backpropagation Derivation

Backpropagation computes gradients of the loss with respect to all parameters using the chain rule.

**Forward pass:** For a network with layers l = 1, ..., L:
```
z^l = W^l * a^{l-1} + b^l    (pre-activation)
a^l = sigma(z^l)               (activation)
```

**Backward pass:** Let delta^l = dL/dz^l (error signal at layer l).

Output layer:
```
delta^L = dL/da^L * sigma'(z^L)
```

Hidden layers (the backpropagation equation):
```
delta^l = (W^{l+1})^T * delta^{l+1} * sigma'(z^l)
```

Parameter gradients:
```
dL/dW^l = delta^l * (a^{l-1})^T
dL/db^l = delta^l
```

**Computational complexity:** O(n) per sample where n is the number of parameters -- same as a forward pass. This efficiency is what makes training deep networks practical.

**Automatic differentiation:** Backpropagation is a special case of reverse-mode automatic differentiation. Modern frameworks (PyTorch, JAX, TensorFlow) implement this generically for arbitrary computation graphs.

### Universal Approximation Theorem

**Theorem (Cybenko, 1989; Hornik, 1991):** A feedforward neural network with a single hidden layer containing a finite number of neurons can approximate any continuous function on a compact subset of R^n to arbitrary accuracy, given a non-constant, bounded, continuous activation function.

**Caveat:** The theorem says such a network exists but says nothing about:
- How many neurons are needed (may be exponentially many).
- Whether gradient descent will find the right weights.
- Whether a single hidden layer is efficient (deep networks may need exponentially fewer parameters).

### No Free Lunch Theorem (Wolpert & Macready, 1997)

**Theorem:** Averaged over all possible problems, all optimization (learning) algorithms perform equally well.

**Implication:** There is no universally best learning algorithm. An algorithm that performs well on some class of problems must perform poorly on others. The choice of algorithm must be guided by domain knowledge about the problem structure.

---

## Regularization Theory

### L2 Regularization (Ridge / Weight Decay)

Add penalty lambda * ||w||_2^2 to the loss:
```
L_reg = L(w) + lambda * sum_i w_i^2
```

**Effect:** Shrinks all weights toward zero. Equivalent to a Gaussian prior on weights (MAP estimation). In linear regression, closed-form solution: w = (X^T X + lambda I)^{-1} X^T y.

**Interpretation:** Smooths the model. Reduces effective degrees of freedom. The eigenvalues of X^T X are shrunk by lambda.

### L1 Regularization (Lasso)

Add penalty lambda * ||w||_1:
```
L_reg = L(w) + lambda * sum_i |w_i|
```

**Effect:** Drives some weights exactly to zero (sparse solutions). Performs feature selection. Equivalent to a Laplace prior on weights.

**Elastic net:** Combines L1 and L2: lambda_1 * ||w||_1 + lambda_2 * ||w||_2^2. Gets sparsity of L1 with stability of L2.

### Dropout (Srivastava et al., 2014)

During training, randomly set each hidden unit to zero with probability p (typically 0.5 for hidden layers).

**Theoretical interpretation:**
- Approximate Bayesian inference: training with dropout is approximately variational inference with Bernoulli random variables.
- Ensemble method: dropout trains an exponential number of sub-networks and averages them at test time.
- Regularization: reduces co-adaptation of neurons.

### Early Stopping

Stop training when validation loss begins to increase.

**Theoretical basis:** Early stopping is equivalent to L2 regularization (for linear models, the equivalence is exact: stopping at iteration T with learning rate eta gives the same result as L2 with lambda = 1/(eta * T)).

---

## Kernel Methods

### Kernel Trick

Many algorithms (SVM, PCA, regression) depend on data only through inner products. The kernel trick replaces inner products with a kernel function:
```
K(x, z) = phi(x) . phi(z)
```
where phi maps data to a (possibly infinite-dimensional) feature space.

**Common kernels:**
- Linear: K(x, z) = x . z
- Polynomial: K(x, z) = (x . z + c)^d
- RBF (Gaussian): K(x, z) = exp(-||x - z||^2 / (2 * sigma^2))
- Laplacian: K(x, z) = exp(-||x - z||_1 / sigma)

**Mercer's theorem:** A function K is a valid kernel iff the Gram matrix K_{ij} = K(x_i, x_j) is positive semi-definite for any set of points.

### Support Vector Machines (SVM)

**Primal problem (linearly separable):**
```
min_{w, b} (1/2) ||w||^2
subject to: y_i * (w . x_i + b) >= 1 for all i
```

**Dual problem:**
```
max_alpha sum_i alpha_i - (1/2) sum_{i,j} alpha_i alpha_j y_i y_j K(x_i, x_j)
subject to: alpha_i >= 0, sum_i alpha_i y_i = 0
```

**Support vectors:** Data points with alpha_i > 0. The decision boundary depends only on support vectors, making SVMs memory-efficient.

**Soft margin (C-SVM):** Allow misclassification with penalty C. Upper bound on alpha: 0 <= alpha_i <= C.

---

## Information-Theoretic Bounds on Generalization

### Mutual Information Bound

**Theorem (Xu & Raginsky, 2017):** For any learning algorithm:
```
|E[R(h)] - E[R_hat(h)]| <= sqrt(2 * sigma^2 * I(S; h) / n)
```
where I(S; h) is the mutual information between the training set S and the output hypothesis h.

**Interpretation:** Algorithms that are less sensitive to the specific training set (low mutual information) generalize better. This explains why:
- SGD generalizes (noise prevents overfitting to specific training examples).
- Compression helps generalization (compressed representations have low mutual information with training data).

### PAC-Bayes Bounds

For a prior P over hypotheses and posterior Q learned from data:
```
E_{h~Q}[R(h)] <= E_{h~Q}[R_hat(h)] + sqrt(D_KL(Q || P) + ln(n/delta)) / (2(n-1)))
```

**Significance:** These bounds are often tighter than VC bounds for neural networks and can be computed numerically. They show that the effective complexity of a trained neural network (KL divergence from initialization) can be much less than the raw parameter count suggests.

---

## Transformer Architecture: Mathematical Foundations

### Attention Mechanism

**Scaled dot-product attention (Vaswani et al., 2017):**
```
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V
```

Where:
- Q (queries), K (keys), V (values) are linear projections of the input.
- d_k is the dimension of key vectors.
- Scaling by sqrt(d_k) prevents softmax from entering saturated regions (where gradients vanish).

**Multi-head attention:**
```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W^O
where head_i = Attention(Q * W_i^Q, K * W_i^K, V * W_i^V)
```

Multiple attention heads allow the model to attend to information from different representation subspaces at different positions.

### Positional Encoding

Since attention is permutation-equivariant (order-independent), positional information must be injected explicitly.

**Sinusoidal encoding:**
```
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

**Properties:**
- Each dimension is a sinusoid with different frequency.
- For any fixed offset k, PE(pos+k) can be represented as a linear function of PE(pos) (enables learning relative positions).
- Extends to arbitrary sequence lengths.

**Rotary Position Embedding (RoPE, Su et al., 2021):** Encodes position by rotating query and key vectors. Produces a dot product that depends only on relative position. Used in LLaMA, GPT-NeoX, and most modern LLMs.

### Transformer Computational Complexity

**Self-attention:** O(n^2 * d) where n is sequence length and d is model dimension. The quadratic dependence on n is the primary bottleneck for long sequences.

**Feed-forward layers:** O(n * d^2). Linear in sequence length.

**Total:** O(n^2 * d + n * d^2). For typical LLMs where d >> n (training), the feed-forward layers dominate. For long sequences where n >> d, attention dominates.

**Efficient attention variants:**
- **Flash Attention:** Exact attention with O(n) memory (instead of O(n^2)) via tiling and recomputation. 2-4x faster in practice.
- **Linear attention:** O(n * d^2) by approximating softmax(QK^T)V as phi(Q) * (phi(K)^T * V). Loses some expressiveness.
- **Sparse attention:** Attend only to local windows + global tokens. O(n * sqrt(n)) or O(n * log n).

### Why Transformers Work

**Theoretical perspectives:**
1. **Universal approximation:** Transformers are universal approximators of sequence-to-sequence functions (Yun et al., 2020).
2. **In-context learning:** Transformers can implement gradient descent internally -- attention layers can implement one step of gradient descent on a linear regression problem (von Oswald et al., 2023).
3. **Inductive bias:** Unlike RNNs (sequential bias) or CNNs (local bias), transformers have minimal inductive bias, allowing them to learn from data which patterns matter. This flexibility comes at the cost of needing more data.

---

## Practical Implications

1. **More data > better algorithms (usually).** The Unreasonable Effectiveness of Data (Halevy et al., 2009): for many tasks, simple algorithms with more data outperform complex algorithms with less data. But data quality matters as much as quantity.

2. **Regularization is not optional.** Every model should use some form of regularization (L2, dropout, early stopping, data augmentation). Without regularization, modern neural networks will memorize training data.

3. **The bias-variance tradeoff guides model selection.** If training error is high, you have a bias problem (need a more expressive model). If training error is low but validation error is high, you have a variance problem (need more regularization or data).

4. **Understand your loss landscape.** For deep networks, the loss surface is non-convex with many local minima. SGD with momentum finds good (not necessarily optimal) solutions. Learning rate schedules (warmup, cosine annealing) help navigate the landscape.

5. **Transformers are the foundation for now.** Understanding the attention mechanism, positional encoding, and scaling properties is essential for working with modern LLMs, vision transformers, and multimodal models.

6. **Kernel methods are still relevant.** For small-to-medium datasets with engineered features, SVMs and kernel methods remain competitive with neural networks and are more interpretable. Gaussian processes provide uncertainty estimates.

---

## Common Misconceptions

1. **"Deep learning always beats classical ML."** For tabular data with < 10K samples, gradient-boosted trees (XGBoost, LightGBM) often outperform deep learning. Deep learning shines with unstructured data (images, text, audio) and large datasets.

2. **"VC dimension explains deep learning generalization."** Classical VC bounds are too loose for overparameterized neural networks (they predict terrible generalization, but we observe good generalization). PAC-Bayes bounds, compression-based bounds, and implicit regularization of SGD provide better explanations.

3. **"Batch size doesn't matter."** Large batch sizes can converge to sharp minima that generalize poorly. Small batch sizes introduce noise that acts as regularization. The learning rate must be scaled with batch size (linear scaling rule).

4. **"More parameters always means more overfitting."** Double descent shows that very large models can generalize well despite being able to memorize training data. This occurs because gradient descent has an implicit bias toward simple solutions.

5. **"Neural networks are black boxes."** While interpretability is a challenge, significant progress has been made: attention visualization, feature attribution (SHAP, integrated gradients), mechanistic interpretability (circuit analysis), and probing classifiers all provide insight into what models learn.

6. **"Training loss going to zero means overfitting."** In the double descent regime, models with zero training loss can still generalize well if they are sufficiently overparameterized. The key metric is always validation/test performance, not training performance.

---

## Further Reading

- **Shalev-Shwartz, S. & Ben-David, S.** *Understanding Machine Learning: From Theory to Algorithms* - The best introduction to statistical learning theory. Covers PAC learning, VC theory, and boosting rigorously.
- **Goodfellow, I., Bengio, Y., & Courville, A.** *Deep Learning* - The standard deep learning textbook. Strong on mathematical foundations of optimization and regularization.
- **Bishop, C.** *Pattern Recognition and Machine Learning* - Bayesian perspective on machine learning. Excellent coverage of probabilistic graphical models and kernel methods.
- **Hastie, T., Tibshirani, R., & Friedman, J.** *The Elements of Statistical Learning* - Comprehensive treatment of statistical learning with mathematical rigor. Freely available online.
- **Vaswani, A. et al.** "Attention Is All You Need" (2017) - The transformer paper. Essential reading for understanding modern AI.
- **Belkin, M. et al.** "Reconciling Modern Machine Learning Practice and the Bias-Variance Tradeoff" (2019) - The double descent paper.
- **Zhang, C. et al.** "Understanding Deep Learning Requires Rethinking Generalization" (2017) - Seminal paper showing neural networks can memorize random labels, challenging classical generalization theory.
- **Vapnik, V.** *The Nature of Statistical Learning Theory* - The original treatment of VC theory and SVMs by one of the founders.
- **Murphy, K.** *Machine Learning: A Probabilistic Perspective* - Encyclopedic reference covering both classical and modern ML.
- **Scholkopf, B. & Smola, A.** *Learning with Kernels* - Definitive reference on kernel methods and SVMs.

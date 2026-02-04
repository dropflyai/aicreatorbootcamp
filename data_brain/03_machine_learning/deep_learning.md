# Deep Learning — Architectures, Optimization, and Modern Paradigms

## Overview

Deep learning extends classical machine learning by learning hierarchical feature
representations through compositions of non-linear transformations. This module
covers neural network fundamentals, the major architecture families (CNN, RNN,
Transformer), the mathematics of backpropagation, optimization strategies, and
modern paradigms including transfer learning and foundation models. The emphasis
is on understanding when deep learning is appropriate and how to apply it rigorously.

References: Goodfellow, Bengio & Courville (Deep Learning, 2016), Vaswani et al.
(Attention Is All You Need, 2017), Stanford CS231n, CS224n, Bishop (PRML Ch. 5).

---

## Neural Network Fundamentals

### The Perceptron and Multi-Layer Networks

A single neuron computes: y = sigma(w^T x + b), where sigma is an activation function.

A feedforward neural network with L layers computes:

```
h_0 = x                                       (input)
h_l = sigma_l(W_l * h_{l-1} + b_l)           for l = 1, ..., L-1 (hidden layers)
y   = f(W_L * h_{L-1} + b_L)                 (output layer)
```

### Activation Functions

| Function | Formula | Range | Properties |
|----------|---------|-------|------------|
| Sigmoid | 1/(1+exp(-z)) | (0,1) | Saturates, vanishing gradient |
| Tanh | (exp(z)-exp(-z))/(exp(z)+exp(-z)) | (-1,1) | Zero-centered, still saturates |
| ReLU | max(0, z) | [0, inf) | No saturation for z>0, dead neurons |
| Leaky ReLU | max(alpha*z, z) | (-inf, inf) | No dead neurons |
| GELU | z * Phi(z) | (-0.17, inf) | Smooth, used in Transformers |
| Swish | z * sigmoid(z) | (-0.28, inf) | Self-gated, smooth |
| Softmax | exp(z_k)/sum exp(z_j) | (0,1) | Output layer for classification |

### Universal Approximation Theorem

A feedforward network with a single hidden layer of finite width can approximate
any continuous function on a compact subset of R^n to arbitrary accuracy (Cybenko,
1989; Hornik, 1991). However, the required width may be exponentially large. Depth
provides exponentially more efficient representations for many function classes.

---

## Backpropagation

### Derivation via Chain Rule

The loss L depends on parameters theta = {W_l, b_l}. Backpropagation computes
dL/d(theta) efficiently using the chain rule, propagating gradients backward.

**Forward pass:** Compute and cache all intermediate activations h_l and pre-activations z_l.

**Backward pass:** For the output layer:
```
delta_L = dL/dz_L = dL/dy * dy/dz_L
```

For hidden layers (l = L-1, ..., 1):
```
delta_l = (W_{l+1}^T * delta_{l+1}) . sigma_l'(z_l)

Where . denotes element-wise multiplication
```

**Parameter gradients:**
```
dL/dW_l = delta_l * h_{l-1}^T
dL/db_l = delta_l
```

**Computational complexity:** Forward and backward pass are both O(n) in the number
of parameters, making backpropagation linear-time (vs. O(n^2) for naive numerical
differentiation). This efficiency is why deep learning is practical.

### Automatic Differentiation

Modern frameworks (PyTorch, JAX, TensorFlow) implement reverse-mode automatic
differentiation, which generalizes backpropagation to arbitrary computation graphs.
The computation graph is built dynamically (PyTorch) or statically (TensorFlow 1.x)
and gradients are computed by traversing it in reverse topological order.

---

## Convolutional Neural Networks (CNNs)

### Architecture Components

**Convolutional layer:** Applies learnable filters (kernels) via cross-correlation:

```
(f * g)[i, j] = sum_{m} sum_{n} f[m, n] * g[i-m, j-n]

Output spatial dimensions: (W - F + 2P) / S + 1
Where W = input size, F = filter size, P = padding, S = stride
```

**Pooling layer:** Reduces spatial dimensions. Max pooling (takes max in window)
or average pooling. Provides translation invariance and reduces parameters.

**Fully connected layer:** Flattens spatial features for final classification/regression.

### Key Architectures

| Architecture | Year | Depth | Key Innovation |
|-------------|------|-------|----------------|
| LeNet-5 | 1998 | 5 | Foundational CNN architecture |
| AlexNet | 2012 | 8 | ReLU, dropout, GPU training |
| VGGNet | 2014 | 16-19 | Small 3x3 filters throughout |
| GoogLeNet | 2014 | 22 | Inception modules (parallel filter sizes) |
| ResNet | 2015 | 50-152 | Skip connections (residual learning) |
| DenseNet | 2017 | 121-264 | Dense connections (feature reuse) |
| EfficientNet | 2019 | Varied | Compound scaling (width, depth, resolution) |

### Residual Learning (He et al., 2015)

Instead of learning H(x), learn the residual F(x) = H(x) - x:
y = F(x, {W_i}) + x (identity shortcut connection)

Solves the degradation problem: deeper networks can be trained because gradients
flow directly through skip connections. Mathematically, the Jacobian of a residual
block is I + dF/dx, which has eigenvalues bounded away from zero.

### Receptive Field

The receptive field of a neuron at layer l is the region of the input that
influences its activation. For stacked 3x3 convolutions:
RF = 1 + L * (F - 1) * product of strides

Two stacked 3x3 convolutions have the same receptive field as one 5x5 but with
fewer parameters (2 * 3^2 = 18 vs. 25) and an extra non-linearity.

---

## Recurrent Neural Networks (RNNs)

### Vanilla RNN

Processes sequences by maintaining a hidden state:
```
h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b_h)
y_t = W_hy * h_t + b_y
```

**Backpropagation Through Time (BPTT):** Unroll the RNN for T steps and apply
standard backpropagation. Gradients involve products of Jacobians:
dh_T/dh_1 = product_{t=1}^{T-1} (dh_{t+1}/dh_t)

### Vanishing/Exploding Gradient Problem

If the spectral radius of W_hh is < 1, gradients vanish exponentially.
If > 1, gradients explode. Solutions:
- Gradient clipping: rescale if ||g|| > threshold
- Gated architectures: LSTM, GRU

### LSTM (Hochreiter & Schmidhuber, 1997)

Long Short-Term Memory introduces a cell state c_t and three gates:

```
f_t = sigma(W_f * [h_{t-1}, x_t] + b_f)       (forget gate)
i_t = sigma(W_i * [h_{t-1}, x_t] + b_i)       (input gate)
c_tilde = tanh(W_c * [h_{t-1}, x_t] + b_c)    (candidate cell state)
c_t = f_t . c_{t-1} + i_t . c_tilde            (cell state update)
o_t = sigma(W_o * [h_{t-1}, x_t] + b_o)       (output gate)
h_t = o_t . tanh(c_t)                           (hidden state)
```

The cell state acts as a "highway" for gradients: dc_t/dc_{t-1} = f_t, which
can stay near 1, allowing information to persist over long sequences.

### GRU (Cho et al., 2014)

Simpler alternative with two gates (reset, update). Comparable performance to
LSTM with fewer parameters. Merges cell state and hidden state.

---

## The Transformer Architecture (Vaswani et al., 2017)

### Self-Attention Mechanism

**Scaled dot-product attention:**
```
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V

Where:
  Q = X * W_Q  (queries, d_k dimensions)
  K = X * W_K  (keys, d_k dimensions)
  V = X * W_V  (values, d_v dimensions)
  d_k = dimension of keys (scaling factor prevents softmax saturation)
```

The attention weight alpha_{ij} = softmax(q_i^T k_j / sqrt(d_k)) measures how much
position i should attend to position j. This allows direct connections between
any two positions regardless of distance (O(1) path length vs. O(n) for RNNs).

### Multi-Head Attention

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W_O

Where head_i = Attention(Q * W_Q^i, K * W_K^i, V * W_V^i)
```

Multiple heads allow the model to jointly attend to information from different
representation subspaces. Typically h=8 or h=16, with d_k = d_model / h.

### Positional Encoding

Since attention is permutation-equivariant, positional information must be injected:

```
PE(pos, 2i)   = sin(pos / 10000^{2i/d_model})
PE(pos, 2i+1) = cos(pos / 10000^{2i/d_model})
```

Modern variants: learned positional embeddings, rotary position embeddings (RoPE),
ALiBi (relative positional bias in attention).

### Encoder-Decoder Architecture

**Encoder:** Stack of N identical layers, each containing multi-head self-attention
followed by position-wise feed-forward network, with residual connections and
layer normalization: LayerNorm(x + Sublayer(x)).

**Decoder:** Same structure plus masked self-attention (causal mask prevents attending
to future positions) and cross-attention to encoder outputs.

**Complexity:** O(n^2 * d) for self-attention where n is sequence length. This
quadratic cost drives research into efficient attention (linear attention, sparse
attention, flash attention).

---

## Optimization for Deep Learning

### Stochastic Gradient Descent (SGD)

```
theta_{t+1} = theta_t - eta * g_t

Where g_t = (1/|B|) sum_{i in B} nabla L(theta_t; x_i, y_i) is the mini-batch gradient
```

SGD with momentum: v_t = beta * v_{t-1} + g_t; theta_{t+1} = theta_t - eta * v_t
Nesterov momentum: evaluate gradient at the look-ahead point theta_t - eta * beta * v_{t-1}

### Adam (Kingma & Ba, 2015)

Adaptive learning rates using first and second moment estimates:

```
m_t = beta_1 * m_{t-1} + (1-beta_1) * g_t           (first moment)
v_t = beta_2 * v_{t-1} + (1-beta_2) * g_t^2         (second moment)
m_hat_t = m_t / (1 - beta_1^t)                       (bias correction)
v_hat_t = v_t / (1 - beta_2^t)                       (bias correction)
theta_{t+1} = theta_t - eta * m_hat_t / (sqrt(v_hat_t) + epsilon)
```

Default: beta_1=0.9, beta_2=0.999, epsilon=1e-8. AdamW decouples weight decay
from the adaptive learning rate for better generalization.

### Learning Rate Scheduling

- Step decay: reduce by factor every N epochs
- Cosine annealing: eta_t = eta_min + (eta_max - eta_min) * (1 + cos(pi*t/T)) / 2
- Warmup: linearly increase from 0 to eta_max over first K steps
- One-cycle policy (Smith, 2018): single cycle of increasing then decreasing LR
- ReduceLROnPlateau: reduce when validation metric stops improving

---

## Regularization Techniques

### Dropout (Srivastava et al., 2014)

During training, randomly zero each neuron with probability p (typically 0.1-0.5).
At inference, multiply weights by (1-p) or use inverted dropout (scale by 1/(1-p)
during training). Approximately equivalent to training an ensemble of 2^n thinned
networks. Provides a cheap Bayesian approximation (Gal & Ghahramani, 2016).

### Batch Normalization (Ioffe & Szegedy, 2015)

Normalize each mini-batch to zero mean and unit variance, then apply learnable
affine transformation:

```
BN(z) = gamma * (z - mu_B) / sqrt(sigma_B^2 + epsilon) + beta

Where mu_B, sigma_B^2 are mini-batch statistics during training,
and running averages during inference
```

Reduces internal covariate shift, allows higher learning rates, and acts as a
regularizer. Layer Normalization (Ba et al., 2016) normalizes across features
instead of batch dimension, preferred for Transformers and RNNs.

### Weight Decay

L2 regularization: L_total = L_data + (lambda/2) * ||theta||^2
For SGD, equivalent to weight decay: theta_{t+1} = (1 - eta*lambda) * theta_t - eta * g_t
For Adam, weight decay and L2 regularization differ (use AdamW).

### Data Augmentation

Create synthetic training examples via label-preserving transformations:
- Images: flips, rotations, crops, color jitter, mixup, cutout, CutMix
- Text: synonym replacement, back-translation, random deletion
- Tabular: SMOTE, noise injection

### Early Stopping

Monitor validation loss and stop training when it begins to increase.
Patience parameter: number of epochs to wait for improvement before stopping.
Equivalent to an implicit L2 regularization (Bishop, 1995).

---

## Transfer Learning and Foundation Models

### Transfer Learning Paradigm

1. **Pre-train** on large source dataset (e.g., ImageNet, large text corpus)
2. **Fine-tune** on smaller target dataset:
   - Feature extraction: freeze pre-trained layers, train only new head
   - Full fine-tuning: update all parameters with small learning rate
   - Gradual unfreezing: progressively unfreeze layers from top to bottom

### Foundation Models

Large models pre-trained on broad data that can be adapted to many downstream tasks:
- Vision: ViT, CLIP, DINOv2
- Language: BERT, GPT, T5, LLaMA
- Multimodal: GPT-4V, Gemini, CLIP

**Parameter-Efficient Fine-Tuning (PEFT):**
- LoRA (Hu et al., 2021): low-rank adaptation of weight matrices. W = W_0 + B*A
  where B is d x r and A is r x k, with r << min(d, k)
- Adapters: small bottleneck layers inserted between frozen layers
- Prefix tuning: prepend learnable tokens to input

### When Deep Learning Is and Is Not Appropriate

**Use deep learning when:**
- Large dataset available (typically >10K-100K examples)
- Unstructured data (images, text, audio, video)
- Feature engineering is difficult or domain knowledge is limited
- State-of-the-art performance is critical
- Pre-trained models exist for similar tasks (transfer learning)

**Prefer classical ML when:**
- Small dataset (<1K examples for tabular data)
- Structured/tabular data (gradient boosting often wins)
- Interpretability is paramount
- Computational budget is limited
- Low latency inference is required
- Data is well-understood and features are informative

---

## Practical Training Recipes

### Training Checklist

1. Start with a known architecture and pre-trained weights when possible
2. Overfit a single batch first to verify the pipeline works
3. Use learning rate finder (Smith, 2017) to set initial learning rate
4. Train with cosine schedule + warmup
5. Use mixed precision (fp16/bf16) for 2x speedup with minimal accuracy loss
6. Monitor train/val loss, gradient norms, and learning rate
7. Use gradient accumulation for effective large batch sizes on limited memory

### Debugging Neural Networks

- Loss not decreasing: check learning rate, data loading, label correctness
- Loss goes to NaN: reduce learning rate, check for numerical instability
- Validation loss increases while train loss decreases: add regularization
- Gradient norms exploding: add gradient clipping
- All predictions are the same class: check class balance, learning rate

---

## Cross-References

- Linear algebra foundations: `01_foundations/linear_algebra_essentials.md`
- Information theory (cross-entropy, KL divergence): `01_foundations/information_theory.md`
- Classical ML baselines: `03_machine_learning/supervised_learning.md`
- NLP applications of Transformers: `06_nlp/modern_nlp.md`
- Model deployment and optimization: `07_mlops/model_deployment.md`
- Experiment tracking: `07_mlops/ml_lifecycle.md`

# Deep Learning

> Reference: Goodfellow, Bengio, Courville "Deep Learning" (2016); Andrej Karpathy lectures; Stanford CS231N

---

## 1. Neural Network Fundamentals

### The Neuron (Perceptron)

A single artificial neuron computes:

```
z = w^T x + b          (affine transformation)
a = sigma(z)            (nonlinear activation)
```

where w in R^d is the weight vector, b in R is the bias, and sigma is the activation function. A single neuron implements a linear decision boundary; stacking neurons into layers enables approximation of arbitrary functions (Universal Approximation Theorem, Cybenko 1989, Hornik 1991).

### Feedforward Networks (Multi-Layer Perceptrons)

An L-layer feedforward network computes:

```
h_0 = x                                    (input)
z_l = W_l * h_{l-1} + b_l                  (pre-activation, layer l)
h_l = sigma_l(z_l)                          (activation, layer l)
y_hat = h_L                                 (output)
```

Key design choices:
- **Width** (neurons per layer): Controls representational capacity per layer
- **Depth** (number of layers): Enables hierarchical feature learning; deeper networks can represent more complex functions with fewer parameters than wider shallow networks (depth efficiency)
- **Activation functions**: Determine the nonlinearity at each layer

### Activation Functions

**ReLU (Rectified Linear Unit)**
```
ReLU(x) = max(0, x)
```
- Default choice for hidden layers since Krizhevsky et al. (2012)
- Gradient is 1 for x > 0, 0 for x < 0 (dying ReLU problem)
- Computationally efficient; alleviates vanishing gradient
- Variants: Leaky ReLU (small slope for x < 0), PReLU (learned slope), ELU

**GELU (Gaussian Error Linear Unit)**
```
GELU(x) = x * Phi(x) = x * 0.5 * (1 + erf(x / sqrt(2)))
```
- Used in GPT, BERT, and most modern transformers
- Smooth approximation of ReLU weighted by the Gaussian CDF
- Allows small negative values, providing non-zero gradient everywhere
- Approximation: GELU(x) ~ 0.5x(1 + tanh(sqrt(2/pi)(x + 0.044715x^3)))

**SiLU / Swish**
```
SiLU(x) = x * sigmoid(x) = x / (1 + e^{-x})
```
- Discovered via automated search (Ramachandran et al., 2017)
- Used in many modern architectures (EfficientNet, LLaMA)
- Smooth, non-monotonic, self-gated

**Softmax (Output Layer for Classification)**
```
softmax(z_i) = exp(z_i) / sum_j exp(z_j)
```
- Converts logits to a probability distribution over K classes
- Numerically stabilized by subtracting max(z) before exponentiation
- Combined with cross-entropy loss: L = -sum_c y_c log(softmax(z_c))

---

## 2. Backpropagation

### The Chain Rule Applied to Computation Graphs

Backpropagation is not a learning algorithm -- it is an efficient algorithm for computing gradients. The learning algorithm is gradient descent; backpropagation provides the gradients that gradient descent needs.

For a composition of functions f = f_L o f_{L-1} o ... o f_1, the chain rule gives:

```
dL/dW_l = dL/dh_L * dh_L/dh_{L-1} * ... * dh_{l+1}/dh_l * dh_l/dW_l
```

### Forward Pass

Compute and cache all intermediate values (activations, pre-activations) layer by layer from input to output.

### Backward Pass

Starting from the loss gradient dL/dh_L, propagate gradients backward through each layer:

```
For layer l (from L down to 1):
    dL/dz_l = dL/dh_l * sigma'_l(z_l)           (gradient through activation)
    dL/dW_l = dL/dz_l * h_{l-1}^T               (gradient for weights)
    dL/db_l = dL/dz_l                             (gradient for biases)
    dL/dh_{l-1} = W_l^T * dL/dz_l               (gradient to propagate)
```

### Computational Complexity

- Forward pass: O(sum_l n_l * n_{l-1}) -- matrix multiplications per layer
- Backward pass: Same order as forward (roughly 2x the cost due to two matrix multiplications per layer)
- Memory: Must store all activations for the backward pass (activation checkpointing trades compute for memory)

### Automatic Differentiation

Modern frameworks (PyTorch, JAX, TensorFlow) implement backpropagation via automatic differentiation on dynamic (PyTorch) or static (TensorFlow/XLA) computation graphs. Each operation registers a backward function, enabling gradient computation for arbitrary compositions.

---

## 3. The Vanishing and Exploding Gradient Problem

### Diagnosis

For a deep network, the gradient at layer l involves a product of L-l Jacobian matrices:

```
dL/dh_l = (prod_{k=l+1}^{L} dh_k/dh_{k-1}) * dL/dh_L
```

If the spectral norm of each Jacobian is:
- **< 1**: Gradients shrink exponentially with depth (vanishing gradients)
- **> 1**: Gradients grow exponentially with depth (exploding gradients)

### Solutions

**Residual Connections** (He et al., 2015)
```
h_l = F(h_{l-1}) + h_{l-1}
```
The gradient through a residual block is dL/dh_{l-1} = dL/dh_l * (dF/dh_{l-1} + I). The identity term I ensures that gradients flow directly through the skip connection, even if dF/dh_{l-1} is small. This is the single most important architectural innovation for training deep networks.

**Careful Initialization**
- Xavier/Glorot (2010): W ~ N(0, 2/(n_in + n_out)) -- for sigmoid/tanh
- He/Kaiming (2015): W ~ N(0, 2/n_in) -- for ReLU
- Principle: Maintain variance of activations across layers

**Normalization** (see Section 4)

**Gradient Clipping**
```
if ||g|| > threshold:
    g = g * threshold / ||g||
```
Prevents exploding gradients by capping the gradient norm. Standard in RNN and transformer training.

---

## 4. Normalization Techniques

### Batch Normalization (Ioffe & Szegedy, 2015)

For a mini-batch B = {x_1, ..., x_m}:

```
mu_B = (1/m) * sum x_i                           (batch mean)
sigma_B^2 = (1/m) * sum (x_i - mu_B)^2           (batch variance)
x_hat_i = (x_i - mu_B) / sqrt(sigma_B^2 + eps)   (normalize)
y_i = gamma * x_hat_i + beta                      (scale and shift)
```

- gamma and beta are learned parameters (restore representational power)
- At inference, use running mean/variance (exponential moving average from training)
- Reduces internal covariate shift; enables higher learning rates
- Batch dependency is a weakness: performance degrades with small batch sizes

### Layer Normalization (Ba et al., 2016)

Normalizes across the feature dimension for each individual sample:

```
mu = (1/H) * sum_{i=1}^{H} x_i                   (mean across features)
sigma^2 = (1/H) * sum_{i=1}^{H} (x_i - mu)^2     (variance across features)
x_hat = (x - mu) / sqrt(sigma^2 + eps)
y = gamma * x_hat + beta
```

- No batch dependency; works identically during training and inference
- **Standard in transformers** (Pre-LN transformers apply LayerNorm before attention and FFN)
- RMSNorm (Zhang & Sennrich, 2019): Simplification that omits mean centering, used in LLaMA:
  RMSNorm(x) = x / sqrt((1/H) * sum x_i^2 + eps) * gamma

### Group Normalization, Instance Normalization

- **Group Norm** (Wu & He, 2018): Divides channels into groups, normalizes within each group. Used when batch size is very small (detection, segmentation)
- **Instance Norm** (Ulyanov et al., 2016): Normalizes each channel independently per sample. Used in style transfer

---

## 5. Optimization Algorithms

### Stochastic Gradient Descent (SGD)

```
theta_{t+1} = theta_t - eta * grad L(theta_t; x_i, y_i)
```

- Uses a random mini-batch to estimate the gradient
- Mini-batch SGD: gradient averaged over B samples (typical B = 32 to 512)
- Noisy gradients provide implicit regularization (generalization benefit)
- Learning rate eta is the most important hyperparameter

**SGD with Momentum**
```
v_t = beta * v_{t-1} + grad L(theta_t)
theta_{t+1} = theta_t - eta * v_t
```
- Accumulates a velocity vector that smooths gradient updates
- beta = 0.9 is standard; accelerates convergence in consistent gradient directions
- Nesterov momentum: Evaluate gradient at the "lookahead" position theta - eta * beta * v

### Adam (Adaptive Moment Estimation) (Kingma & Ba, 2014)

```
m_t = beta_1 * m_{t-1} + (1 - beta_1) * g_t           (first moment / mean)
v_t = beta_2 * v_{t-1} + (1 - beta_2) * g_t^2         (second moment / uncentered variance)
m_hat_t = m_t / (1 - beta_1^t)                          (bias correction)
v_hat_t = v_t / (1 - beta_2^t)                          (bias correction)
theta_{t+1} = theta_t - eta * m_hat_t / (sqrt(v_hat_t) + eps)
```

- Default: beta_1 = 0.9, beta_2 = 0.999, eps = 1e-8
- Adaptive per-parameter learning rates
- Works well "out of the box" for most problems
- **AdamW** (Loshchilov & Hutter, 2017): Decoupled weight decay (fixes L2 regularization interaction):
  theta_{t+1} = theta_t - eta * (m_hat_t / (sqrt(v_hat_t) + eps) + lambda * theta_t)
- AdamW is the standard optimizer for transformer training

### Learning Rate Schedules

**Warmup + Cosine Decay** (standard for transformers)
```
Phase 1 (warmup, steps 0 to T_w):
    eta_t = eta_max * t / T_w

Phase 2 (cosine decay, steps T_w to T):
    eta_t = eta_min + 0.5 * (eta_max - eta_min) * (1 + cos(pi * (t - T_w) / (T - T_w)))
```

- Warmup prevents early divergence when Adam's moment estimates are biased
- Cosine decay smoothly reduces LR to near zero
- Typical warmup: 1-10% of total training steps

**One-Cycle Policy** (Smith & Topin, 2018)
- Ramp LR up, then down in one cycle
- Often trains faster and generalizes better than fixed schedules

---

## 6. Regularization

### Dropout (Srivastava et al., 2014)

During training, randomly set each neuron's output to zero with probability p:

```
mask ~ Bernoulli(1 - p)
h_drop = mask * h / (1 - p)        (inverted dropout: scale during training)
```

- Forces the network to learn redundant representations
- Approximately equivalent to training an ensemble of 2^n sub-networks
- Typical p: 0.1-0.5 (higher for larger layers)
- At inference: no dropout (all neurons active, already scaled)

### Weight Decay (L2 Regularization)

```
L_total = L_data + (lambda/2) * sum ||W_l||^2
```

- Gradient contribution: grad_{W_l} L_total = grad_{W_l} L_data + lambda * W_l
- Shrinks weights toward zero; prefers smoother functions
- In AdamW, decoupled from the adaptive gradient step

### Data Augmentation

Create synthetic training examples by applying label-preserving transformations:
- **Images**: Random crop, flip, rotation, color jitter, cutout, mixup, RandAugment
- **Text**: Synonym replacement, back-translation, random insertion/deletion
- **General**: Mixup (convex combination of examples: x' = lambda*x_i + (1-lambda)*x_j)
- One of the most effective regularization techniques in practice

### Early Stopping

Monitor validation loss during training; stop when it begins to increase:
- Save the model with the lowest validation loss
- Patience: number of epochs to wait for improvement before stopping
- Effectively limits the number of gradient steps (implicit complexity control)

### Label Smoothing

Replace hard one-hot labels with soft labels:
```
y_smooth = (1 - alpha) * y_hard + alpha / K
```
- Prevents the model from becoming overconfident
- alpha = 0.1 is standard; used in transformer training

---

## 7. Convolutional Neural Networks (CNNs)

### Convolution Operation

For 2D input with C_in channels and a kernel of size K x K:

```
y[i,j] = sum_{c=1}^{C_in} sum_{m=0}^{K-1} sum_{n=0}^{K-1} W[c,m,n] * x[c, i+m, j+n] + b
```

Key properties:
- **Parameter sharing**: Same kernel applied at every spatial position
- **Translation equivariance**: f(shift(x)) = shift(f(x))
- **Local connectivity**: Each output depends on a local receptive field

### Pooling

- **Max pooling**: y = max(x in window) -- retains strongest activation
- **Average pooling**: y = mean(x in window) -- retains average activation
- **Global average pooling**: Average over entire spatial dimensions -- replaces fully connected layers

### Landmark Architectures

| Architecture | Year | Key Innovation |
|-------------|------|----------------|
| LeNet-5 | 1998 | First successful CNN (handwritten digits) |
| AlexNet | 2012 | Deep CNN + ReLU + dropout on GPUs |
| VGGNet | 2014 | Deeper (16-19 layers) with 3x3 kernels |
| GoogLeNet | 2014 | Inception modules (parallel multi-scale convolutions) |
| ResNet | 2015 | Residual connections (enabled 152+ layers) |
| EfficientNet | 2019 | Compound scaling (width, depth, resolution) |
| ConvNeXt | 2022 | CNN modernized with transformer-era techniques |

### Vision Transformers (ViT)

ViT (Dosovitskiy et al., 2020) applies the transformer architecture to images:
1. Split image into fixed-size patches (e.g., 16x16)
2. Linearly embed each patch (flatten + linear projection)
3. Add positional embeddings
4. Process with standard transformer encoder
5. Use [CLS] token or global average pooling for classification

ViT has largely replaced CNNs for image understanding at scale, especially with pretraining (DINO, MAE, CLIP).

---

## 8. Recurrent Neural Networks (RNNs)

### Vanilla RNN

```
h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b_h)
y_t = W_hy * h_t + b_y
```

- Hidden state h_t carries information across time steps
- Severe vanishing gradient problem: gradients decay as O(lambda_max^T) where lambda_max < 1

### LSTM (Long Short-Term Memory)

```
f_t = sigma(W_f * [h_{t-1}, x_t] + b_f)           (forget gate)
i_t = sigma(W_i * [h_{t-1}, x_t] + b_i)           (input gate)
c_tilde = tanh(W_c * [h_{t-1}, x_t] + b_c)        (candidate cell)
c_t = f_t * c_{t-1} + i_t * c_tilde                (cell state update)
o_t = sigma(W_o * [h_{t-1}, x_t] + b_o)            (output gate)
h_t = o_t * tanh(c_t)                               (hidden state)
```

- Cell state c_t provides a "highway" for gradient flow (analogous to residual connections)
- Gates learn to selectively read, write, and erase memory
- Largely superseded by transformers for most NLP tasks

### Historical Significance for LLMs

RNNs (and LSTMs) were the dominant architecture for language modeling from 2013-2017. The transformer (Vaswani et al., 2017) replaced them by enabling:
- Parallel training (no sequential dependency)
- Direct long-range connections via attention
- Better scaling with model and data size

---

## 9. Training at Scale

### Mixed Precision Training (Micikevicius et al., 2017)

- Store master weights in FP32
- Compute forward/backward pass in FP16 (or BF16)
- Loss scaling to prevent gradient underflow in FP16
- 2x memory savings, 2-8x throughput improvement on modern GPUs
- BFloat16 (BF16): Same exponent range as FP32, reduced mantissa; preferred for training stability

### Distributed Training

**Data Parallelism**
- Replicate model on N GPUs; each processes 1/N of the mini-batch
- Synchronize gradients via AllReduce after each step
- Effective batch size = per-GPU batch * N GPUs
- Frameworks: PyTorch DDP (DistributedDataParallel), DeepSpeed ZeRO

**Tensor Parallelism**
- Split individual layers across GPUs (e.g., split weight matrices column-wise)
- Requires communication within each layer (AllReduce after each matrix multiply)
- Used for layers too large to fit on a single GPU (Megatron-LM)

**Pipeline Parallelism**
- Assign different layers to different GPUs
- Micro-batching: Split mini-batch into micro-batches for pipeline efficiency
- GPipe, PipeDream approaches minimize pipeline bubble

**ZeRO (Zero Redundancy Optimizer)** -- DeepSpeed
- Stage 1: Partition optimizer states across GPUs
- Stage 2: Partition gradients across GPUs
- Stage 3: Partition parameters across GPUs
- Enables training models larger than single-GPU memory

### Gradient Accumulation

When GPU memory limits batch size:
```
for i in range(accumulation_steps):
    loss = model(micro_batch[i]) / accumulation_steps
    loss.backward()                  # accumulate gradients
optimizer.step()                     # update once with accumulated gradient
optimizer.zero_grad()
```

Effective batch size = micro_batch_size * accumulation_steps * num_GPUs

---

## 10. Practical Training Checklist

### Before Training

- [ ] Data quality verified (no leakage, clean labels, balanced or addressed)
- [ ] Architecture selected with justification
- [ ] Loss function matches the task and data characteristics
- [ ] Optimizer selected (Adam/AdamW for transformers, SGD+momentum for CNNs)
- [ ] Learning rate schedule defined (warmup + cosine for transformers)
- [ ] Regularization strategy set (dropout, weight decay, data augmentation)
- [ ] Evaluation metrics defined and baseline established
- [ ] Compute budget estimated (GPU hours, cost)

### During Training

- [ ] Monitor training loss (should decrease smoothly)
- [ ] Monitor validation loss (watch for overfitting divergence)
- [ ] Monitor gradient norms (exploding = clipping needed, vanishing = architecture issue)
- [ ] Monitor learning rate schedule
- [ ] Save checkpoints at regular intervals
- [ ] Log all hyperparameters for reproducibility

### After Training

- [ ] Evaluate on held-out test set (ONCE)
- [ ] Error analysis on failure cases
- [ ] Compare against baseline and ablation studies
- [ ] Document results, hyperparameters, compute used
- [ ] Version model artifacts (weights, config, tokenizer)

---

**This module covers the deep learning fundamentals required for understanding transformer-based LLMs and all downstream AI Brain modules.**

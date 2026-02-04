# Transformer Architecture

> Reference: Vaswani et al. "Attention Is All You Need" (2017); Karpathy "Let's build GPT"; Stanford CS224N

---

## 1. Historical Context and Motivation

Before transformers, sequence modeling was dominated by recurrent architectures (RNNs, LSTMs, GRUs). These suffered from three fundamental limitations:

1. **Sequential computation**: Token t depends on the hidden state from token t-1, preventing parallelization during training
2. **Long-range dependency decay**: Even with gating mechanisms (LSTM), information degrades over long sequences
3. **Fixed-size bottleneck**: The entire sequence history must be compressed into a fixed-size hidden state

The transformer (Vaswani et al., 2017) addresses all three by replacing recurrence with **attention** -- a mechanism that allows every position to directly attend to every other position, with O(1) path length for any dependency.

### The Key Insight

The computational cost of attention is O(n^2 * d) where n is sequence length and d is model dimension. This quadratic cost in sequence length is the primary limitation of transformers. However, for the sequence lengths and model sizes that matter for language, this tradeoff is massively favorable compared to the O(n) sequential steps required by RNNs.

---

## 2. Scaled Dot-Product Attention

### Mathematical Definition

Given queries Q in R^{n x d_k}, keys K in R^{n x d_k}, and values V in R^{n x d_v}:

```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V
```

### Step-by-Step Computation

**Step 1: Compute attention scores**
```
S = QK^T                   [n x n matrix]
```
Each element S_{ij} = q_i^T k_j measures the compatibility between position i's query and position j's key.

**Step 2: Scale**
```
S_scaled = S / sqrt(d_k)
```
Division by sqrt(d_k) prevents the dot products from growing large in magnitude as d_k increases, which would push the softmax into regions of extremely small gradients (saturation).

Intuition: If q and k are random vectors with zero mean and unit variance, then q^T k has variance d_k. Dividing by sqrt(d_k) restores unit variance.

**Step 3: Apply mask (optional)**
```
S_masked = S_scaled + M     where M_{ij} = -inf for masked positions
```
For causal (autoregressive) models, M masks all positions j > i (future positions). The -inf ensures softmax assigns zero probability to masked positions.

**Step 4: Softmax normalization**
```
A = softmax(S_masked)       [n x n matrix, rows sum to 1]
```
Row i of A contains the attention weights: how much position i attends to each other position.

**Step 5: Weighted sum of values**
```
Output = A * V              [n x d_v matrix]
```
Each output position is a weighted combination of all value vectors, with weights determined by the attention pattern.

### Attention as Soft Dictionary Lookup

Attention can be understood as a differentiable, soft version of dictionary lookup:
- Keys K define what each position "advertises"
- Queries Q define what each position "searches for"
- The attention weights A are a soft match score (probability distribution)
- Values V are the information retrieved
- Output is a weighted sum of values, weighted by match quality

---

## 3. Multi-Head Attention

### Motivation

A single attention function can only capture one type of relationship. Multi-head attention runs multiple attention operations in parallel, each with different learned projections, allowing the model to attend to information from different representation subspaces at different positions.

### Mathematical Definition

```
MultiHead(Q, K, V) = Concat(head_1, head_2, ..., head_h) * W^O

where head_i = Attention(Q * W_i^Q, K * W_i^K, V * W_i^V)
```

Parameters:
- W_i^Q in R^{d_model x d_k} -- per-head query projection
- W_i^K in R^{d_model x d_k} -- per-head key projection
- W_i^V in R^{d_model x d_v} -- per-head value projection
- W^O in R^{h*d_v x d_model} -- output projection

Typically: d_k = d_v = d_model / h (divide model dimension equally among heads)

### What Different Heads Learn

Empirical analysis reveals that different attention heads specialize:
- **Positional heads**: Attend to fixed relative positions (previous token, next token)
- **Syntactic heads**: Track grammatical relationships (subject-verb, modifier-noun)
- **Semantic heads**: Attend to semantically related tokens
- **Rare token heads**: Specialize in attending to infrequent tokens
- **Induction heads** (Olsson et al., 2022): Implement in-context learning by matching patterns seen earlier in the sequence

### Grouped-Query Attention (GQA)

Standard MHA has h query heads, h key heads, and h value heads. GQA (Ainslie et al., 2023) uses fewer key-value heads (shared among groups of query heads):

```
MHA:  h_q = h_k = h_v = h           (e.g., 32 each)
GQA:  h_q = h, h_k = h_v = g < h   (e.g., 32 queries, 8 KV)
MQA:  h_q = h, h_k = h_v = 1       (Multi-Query: single KV head)
```

GQA reduces KV-cache memory during inference by factor h/g with minimal quality loss. Used in LLaMA 2/3, Gemini.

---

## 4. Positional Encoding

### The Permutation Invariance Problem

Self-attention operates on sets, not sequences. Without positional information:
```
Attention({token_A, token_B, token_C}) = Attention({token_C, token_A, token_B})
```

Positional encodings inject order information so the model can distinguish position.

### Sinusoidal Positional Encoding (Vaswani et al., 2017)

```
PE(pos, 2i)   = sin(pos / 10000^{2i/d_model})
PE(pos, 2i+1) = cos(pos / 10000^{2i/d_model})
```

Properties:
- Each dimension is a sinusoid with a different frequency
- PE(pos+k) can be represented as a linear function of PE(pos) for any fixed offset k, enabling the model to learn relative positions
- No learned parameters; works for any sequence length
- Lower dimensions capture fine-grained position; higher dimensions capture coarse position

### Learned Positional Embeddings

- A lookup table E_pos in R^{max_len x d_model} trained alongside the model
- Used in GPT-2, BERT
- Limitation: Cannot extrapolate beyond max_len seen during training

### Rotary Position Embeddings (RoPE) (Su et al., 2021)

RoPE encodes position by rotating the query and key vectors in 2D subspaces:

```
f(x_m, m) = R_m * x_m

where R_m = [cos(m*theta_1)  -sin(m*theta_1)   0            0          ...]
             [sin(m*theta_1)   cos(m*theta_1)   0            0          ...]
             [0                0                cos(m*theta_2) -sin(m*theta_2)...]
             [0                0                sin(m*theta_2)  cos(m*theta_2)...]
             ...
```

Key properties:
- The dot product q_m^T k_n depends only on the relative position (m - n)
- Naturally decays with distance (inner product decreases for distant positions)
- Extrapolates to longer sequences than seen during training (with NTK-aware scaling)
- **Standard in modern LLMs**: LLaMA, Mistral, Gemma, Qwen

### ALiBi (Attention with Linear Biases) (Press et al., 2021)

Instead of modifying embeddings, ALiBi adds a fixed linear bias to attention scores:
```
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k) - m * |i - j|) * V
```
where m is a head-specific slope. Penalizes attention to distant positions linearly. Used in BLOOM and MPT.

---

## 5. The Transformer Block

### Architecture of a Single Block (Pre-LN Variant)

```
         ┌──────────────────────────┐
    x────┤                          │
    │    │   Layer Norm              │
    │    │   Multi-Head Attention    │
    │    │   Dropout                 │
    │    └────────────┬─────────────┘
    │                 │
    └────────(+)──────┘  ← Residual connection
              │
         ┌────┤
    x'───┤    │
    │    │   Layer Norm              │
    │    │   Feed-Forward Network    │
    │    │   Dropout                 │
    │    └────────────┬─────────────┘
    │                 │
    └────────(+)──────┘  ← Residual connection
              │
           output
```

### Pre-LN vs. Post-LN

**Post-LN** (original Vaswani et al.):
```
x' = LayerNorm(x + MultiHeadAttention(x))
output = LayerNorm(x' + FFN(x'))
```

**Pre-LN** (modern standard):
```
x' = x + MultiHeadAttention(LayerNorm(x))
output = x' + FFN(LayerNorm(x'))
```

Pre-LN is more stable during training (gradients flow more cleanly through residual connections) and does not require careful learning rate warmup. Virtually all modern LLMs use Pre-LN.

### Feed-Forward Network (FFN)

The FFN in each transformer block is a position-wise two-layer MLP:

```
FFN(x) = W_2 * activation(W_1 * x + b_1) + b_2
```

- W_1 in R^{d_model x d_ff} expands dimension (typically d_ff = 4 * d_model)
- Activation: GELU (GPT, BERT), SiLU/Swish (LLaMA)
- W_2 in R^{d_ff x d_model} projects back to model dimension

**Gated FFN / SwiGLU** (Shazeer, 2020; used in LLaMA, PaLM):
```
FFN_SwiGLU(x) = (SiLU(W_1 * x) * (W_3 * x)) * W_2
```
Three weight matrices instead of two; empirically superior. d_ff is reduced to 2/3 * 4 * d_model to keep parameter count constant.

The FFN is where factual knowledge is primarily stored in the network (key-value memory hypothesis, Geva et al., 2021). The attention layers route information; the FFN layers process and transform it.

---

## 6. Encoder, Decoder, and Decoder-Only Architectures

### Original Encoder-Decoder (Vaswani et al., 2017)

Designed for sequence-to-sequence tasks (machine translation):

**Encoder**: Processes the full input sequence with bidirectional (non-causal) self-attention. Each position attends to all positions. Stack of N identical blocks.

**Decoder**: Generates output autoregressively with:
1. Causal self-attention (masked -- each position attends only to itself and earlier positions)
2. Cross-attention (queries from decoder, keys/values from encoder output)
3. FFN

Used in: T5, BART, mBART, original Transformer

### Encoder-Only (BERT-style)

- Bidirectional self-attention over the entire input
- Trained with masked language modeling (MLM): predict randomly masked tokens
- Not autoregressive; cannot generate text natively
- Used for: classification, NER, semantic similarity, embeddings
- Models: BERT, RoBERTa, DeBERTa, ELECTRA

### Decoder-Only (GPT-style)

- Causal (autoregressive) self-attention only
- Each position attends to itself and all previous positions
- Trained with next-token prediction: P(x_t | x_{<t})
- **Dominant architecture for modern LLMs**: GPT-4, Claude, LLaMA, Gemini, Mistral

Why decoder-only won:
1. Simpler architecture (one type of attention)
2. Scales better with compute (Kaplan et al., 2020)
3. Naturally supports generative tasks
4. In-context learning emerges at scale
5. Can approximate encoder behavior via bidirectional attention in the prompt

---

## 7. Key-Value Cache and Autoregressive Generation

### The Inference Problem

During autoregressive generation, the model generates one token at a time:
```
p(x_1, x_2, ..., x_T) = prod_{t=1}^{T} p(x_t | x_1, ..., x_{t-1})
```

Naive implementation recomputes attention over the entire sequence for each new token: O(T^2 * d) per generation step, O(T^3 * d) total.

### KV-Cache Solution

Since attention for position t only reads (does not modify) the keys and values of positions 1..t-1, we cache them:

```
Step 1: Process prompt [x_1, ..., x_n] → cache K_{1:n}, V_{1:n} for each layer
Step 2: For each new token x_t:
    - Compute q_t, k_t, v_t from x_t only
    - Append k_t, v_t to cache
    - Compute attention: q_t attends to K_{1:t}, V_{1:t}
    - Output: one new token
```

This reduces per-step cost to O(T * d) instead of O(T^2 * d).

### KV-Cache Memory Analysis

For a model with L layers, h heads, d_k dimensions per head:

```
KV-cache memory per token = 2 * L * h * d_k * bytes_per_element
                          = 2 * L * d_model * bytes_per_element
```

Example (LLaMA 70B, FP16):
- L = 80, d_model = 8192, 2 bytes per FP16 element
- Per token: 2 * 80 * 8192 * 2 = 2.62 MB
- For 4096 token sequence: 2.62 MB * 4096 = 10.7 GB

This is why GQA (fewer KV heads) is critical for long-context inference.

### Paged Attention (vLLM)

Manages KV-cache memory like OS virtual memory pages:
- Allocates KV-cache in non-contiguous blocks (pages)
- Eliminates memory fragmentation and over-allocation
- Enables efficient batch scheduling (different sequences can have different lengths)
- 2-4x throughput improvement for serving workloads

---

## 8. Attention Variants and Efficiency

### Flash Attention (Dao et al., 2022)

Standard attention materializes the full n x n attention matrix in GPU HBM (High Bandwidth Memory). Flash Attention:
- Tiles the computation into blocks that fit in SRAM (on-chip memory)
- Computes attention block-by-block, never materializing the full matrix
- Uses online softmax trick to accumulate results
- Result: exact attention (not an approximation) with O(n) memory instead of O(n^2)
- 2-4x speedup, enables much longer sequences

### Sparse Attention Patterns

For very long sequences (>100K tokens), even Flash Attention's O(n^2) compute is prohibitive:

- **Sliding Window Attention** (Mistral, Longformer): Each token attends to a fixed window of w neighbors. O(n * w) compute. Combined with global attention tokens for long-range dependencies.
- **Dilated Attention**: Attends to every k-th position, increasing receptive field without quadratic cost
- **Block-Sparse Attention**: Predefined sparse patterns (BigBird: random + sliding window + global)

### Linear Attention Approximations

Replace softmax(QK^T)V with kernel approximations:
- **Performers** (Choromanski et al., 2020): Random feature maps to approximate softmax kernel
- **Linear Transformers**: Remove softmax, compute KV first: Attention = Q(K^TV) in O(n * d^2)
- Tradeoff: Faster (O(n)) but generally lower quality than full attention

### Multi-Query and Grouped-Query Attention (Section 3 detail)

These are not approximations but architectural choices that reduce KV-cache memory:
- MQA: All heads share one K and V -- fastest inference, slight quality loss
- GQA: Groups of heads share K and V -- balanced tradeoff
- Used in production LLMs where inference cost dominates

---

## 9. Scaling Laws

### Kaplan et al. (2020) -- OpenAI Scaling Laws

Empirical finding: LLM performance (cross-entropy loss L) follows power laws:

```
L(N) ~ N^{-alpha_N}        (parameters, alpha_N ~ 0.076)
L(D) ~ D^{-alpha_D}        (data tokens, alpha_D ~ 0.095)
L(C) ~ C^{-alpha_C}        (compute FLOPs, alpha_C ~ 0.050)
```

Implications: Performance improves predictably with scale. Compute is the binding constraint -- given a fixed compute budget, there is an optimal allocation between model size and data.

### Chinchilla Scaling Laws (Hoffmann et al., 2022)

Revised the Kaplan findings:
- Parameters and data should scale roughly equally with compute
- Chinchilla-optimal: for C FLOPs, use N ~ sqrt(C/6) parameters and D ~ sqrt(6C) tokens
- Most existing models were undertrained (too large for their data budget)
- Rule of thumb: ~20 tokens per parameter for compute-optimal training

Example:
- 7B parameter model needs ~140B training tokens
- 70B parameter model needs ~1.4T training tokens

### Emergent Abilities (Wei et al., 2022)

Certain capabilities appear abruptly at specific model scales:
- Chain-of-thought reasoning: ~100B parameters
- In-context learning: ~6B parameters
- Multi-step arithmetic: ~100B+ parameters

Debate: Schaeffer et al. (2023) argue emergence is partly a measurement artifact (nonlinear metrics on smooth improvements). The practical implication remains: smaller models cannot perform certain tasks regardless of prompting.

---

## 10. Architecture Diagram -- Complete Decoder-Only Transformer

```
Input Tokens: [t_1, t_2, ..., t_n]
        │
        ▼
┌─────────────────────────┐
│   Token Embedding       │  E ∈ R^{V x d_model}
│   + Positional Encoding │  (RoPE applied in attention)
└────────────┬────────────┘
             │
    ┌────────▼────────┐
    │  Transformer     │ ×N blocks (N = 32 for 7B, 80 for 70B)
    │  Block:          │
    │  ┌─────────────┐ │
    │  │ RMSNorm     │ │
    │  │ GQA Attn    │─┤─── Causal mask + RoPE
    │  │ + Residual  │ │
    │  ├─────────────┤ │
    │  │ RMSNorm     │ │
    │  │ SwiGLU FFN  │─┤─── d_ff = 8/3 * d_model
    │  │ + Residual  │ │
    │  └─────────────┘ │
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │  RMSNorm        │  Final normalization
    └────────┬────────┘
             │
    ┌────────▼────────┐
    │  Linear (unembedding) │  W ∈ R^{d_model x V}
    └────────┬────────┘      (often tied with embedding)
             │
    ┌────────▼────────┐
    │  Softmax        │  → P(next_token | context)
    └─────────────────┘
```

### Typical Configurations

| Model | d_model | Heads | Layers | d_ff | Params |
|-------|---------|-------|--------|------|--------|
| GPT-2 | 768 | 12 | 12 | 3072 | 117M |
| LLaMA 7B | 4096 | 32 | 32 | 11008 | 6.7B |
| LLaMA 13B | 5120 | 40 | 40 | 13824 | 13B |
| LLaMA 70B | 8192 | 64 (GQA:8) | 80 | 28672 | 70B |
| GPT-4 | ~12288* | ~96* | ~120* | ~49152* | ~1.8T* (MoE) |

*GPT-4 specifications are estimated from public analysis; not officially disclosed.

---

## 11. Training Objective: Next-Token Prediction

### Causal Language Modeling

The training objective for decoder-only transformers:

```
L = -(1/T) * sum_{t=1}^{T} log P(x_t | x_1, ..., x_{t-1}; theta)
```

This is simply the average negative log-likelihood of predicting each token given all preceding tokens. Minimizing this loss is equivalent to maximizing the likelihood of the training data under the autoregressive model.

### Why This Works So Well

Ilya Sutskever's insight: "Predicting the next token well enough requires understanding the world." To predict the next token in a diverse text corpus, the model must learn:
- Syntax and grammar
- Facts and knowledge
- Reasoning patterns
- Style and tone
- Multilinguality
- Code structure
- Mathematical relationships

The simplicity and generality of next-token prediction, combined with scale, produces the remarkable capabilities of modern LLMs.

---

**This module provides the architectural foundation for understanding all LLM-related modules in the AI Brain. The transformer is the backbone of modern AI.**

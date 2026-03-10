# Modern NLP — Transformers, LLMs, and Fine-Tuning

## Overview

The transformer architecture (Vaswani et al., 2017) revolutionized NLP by replacing
recurrence with self-attention, enabling massive parallelization and scaling to
billions of parameters. This module covers the transformer mechanism, the major
pretrained model families (BERT, GPT, T5), fine-tuning strategies, prompt engineering
for NLP tasks, retrieval-augmented generation (RAG), evaluation metrics, and
multilingual NLP. Understanding these systems is essential for any modern NLP
practitioner.

References: Vaswani et al. (Attention Is All You Need), Devlin et al. (BERT),
Brown et al. (GPT-3), Raffel et al. (T5), Lewis et al. (RAG paper),
Wolf et al. (Hugging Face Transformers), Lin et al. (ROUGE).

---

## Transformer Architecture

### Self-Attention Mechanism

The core innovation: every token attends to every other token in the sequence.

```
Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V

where:
  Q = X * W_Q   (queries, d_k dimensions)
  K = X * W_K   (keys, d_k dimensions)
  V = X * W_V   (values, d_v dimensions)
  d_k = dimension of keys (scaling prevents softmax saturation)
```

### Multi-Head Attention

Run h attention heads in parallel, each with different learned projections:

```
MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W_O

where head_i = Attention(Q * W_Qi, K * W_Ki, V * W_Vi)

Typical: h=12 heads, d_model=768, d_k=d_v=64 (for BERT-base)
```

Each head can learn different attention patterns:
- Syntactic (attend to subject-verb pairs)
- Positional (attend to adjacent tokens)
- Semantic (attend to coreferent mentions)

### Full Transformer Block

```
Input
  │
  ├── Multi-Head Self-Attention
  │     └── Add & Layer Norm (residual connection)
  │
  ├── Feed-Forward Network (two linear layers + activation)
  │     FFN(x) = max(0, x * W_1 + b_1) * W_2 + b_2
  │     └── Add & Layer Norm (residual connection)
  │
  └── Output

Parameters per block (BERT-base):
  Self-attention: 4 * d_model^2 = 4 * 768^2 = 2.4M
  FFN: 2 * d_model * d_ff = 2 * 768 * 3072 = 4.7M
  Total: ~7.1M per block * 12 blocks = ~85M + embeddings ≈ 110M
```

### Positional Encoding

Transformers have no inherent notion of position. Position is injected via:

**Sinusoidal (original Transformer)**
```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

**Learned positional embeddings**: BERT, GPT-2 (max 512/1024 positions)
**Rotary Position Embedding (RoPE)**: LLaMA, modern models (relative, extrapolates)
**ALiBi**: attention bias by distance (linear, no learned parameters)

---

## BERT (Bidirectional Encoder Representations from Transformers)

### Architecture

- Encoder-only transformer (12 layers, 768 hidden, 12 heads = 110M params)
- Bidirectional: attends to both left and right context
- Input: [CLS] token_1 token_2 ... [SEP] (sentence_A [SEP] sentence_B)

### Pre-Training Objectives

**Masked Language Modeling (MLM)**
```
Input:  "The [MASK] sat on the [MASK]"
Target: "The cat sat on the mat"

15% of tokens masked:
  80% replaced with [MASK]
  10% replaced with random token
  10% kept unchanged
```

**Next Sentence Prediction (NSP)**
```
Input: [CLS] sentence_A [SEP] sentence_B [SEP]
Target: IsNext / NotNext (binary classification)
```

### Fine-Tuning Patterns

| Task | Architecture | Input Format |
|------|-------------|-------------|
| Classification | [CLS] -> linear | [CLS] text [SEP] |
| NER | Token-level -> linear | [CLS] w1 w2 ... [SEP] |
| QA (extractive) | Start/end logits | [CLS] question [SEP] context [SEP] |
| Sentence similarity | [CLS] -> cosine | [CLS] sent_A [SEP] sent_B [SEP] |

### BERT Variants

| Model | Params | Innovation |
|-------|--------|-----------|
| BERT-base | 110M | Original |
| BERT-large | 340M | 24 layers, 1024 hidden |
| RoBERTa | 125M | Longer training, no NSP, dynamic masking |
| ALBERT | 12M | Parameter sharing, factorized embeddings |
| DistilBERT | 66M | Knowledge distillation, 6 layers |
| DeBERTa | 140M | Disentangled attention, enhanced mask decoder |
| ELECTRA | 110M | Replaced token detection (more efficient) |

---

## GPT Family (Generative Pre-Trained Transformer)

### Architecture

- Decoder-only transformer with causal (left-to-right) attention
- Autoregressive: predicts next token given all previous tokens

```
P(x_1, ..., x_n) = PRODUCT P(x_t | x_1, ..., x_{t-1})

Training objective: minimize negative log-likelihood
L = -SUM log P(x_t | x_{<t})
```

### Scaling Laws

```
L(N) ≈ (N_c / N)^{alpha_N}   (loss as function of parameters N)
L(D) ≈ (D_c / D)^{alpha_D}   (loss as function of dataset size D)
L(C) ≈ (C_c / C)^{alpha_C}   (loss as function of compute C)

Chinchilla optimal: N and D should scale equally with compute budget
  N_opt ≈ C^0.5,  D_opt ≈ C^0.5
```

### Model Sizes

| Model | Params | Context | Training Data |
|-------|--------|---------|--------------|
| GPT-2 | 1.5B | 1024 | WebText (40GB) |
| GPT-3 | 175B | 2048 | 300B tokens |
| GPT-4 | ~1.8T (est.) | 128K | Multi-trillion tokens |
| LLaMA 2 | 7-70B | 4096 | 2T tokens |
| Mistral | 7B | 32K | Undisclosed |
| Claude 3 | Undisclosed | 200K | Undisclosed |

---

## T5 (Text-to-Text Transfer Transformer)

### Architecture

Encoder-decoder transformer. All tasks framed as text-to-text:

```
Classification: "mnli premise: ... hypothesis: ..." -> "entailment"
Summarization:  "summarize: ..." -> "summary text"
Translation:    "translate English to French: ..." -> "texte francais"
QA:             "question: ... context: ..." -> "answer text"
```

### Variants

| Model | Params | Innovation |
|-------|--------|-----------|
| T5-small | 60M | Baseline |
| T5-base | 220M | Standard |
| T5-large | 770M | Strong performance |
| T5-3B / 11B | 3B/11B | Best quality |
| Flan-T5 | 60M-11B | Instruction-tuned on 1.8K tasks |
| UL2 | 20B | Unified pre-training (multiple denoising) |

---

## Fine-Tuning Strategies

### Full Fine-Tuning

Update all parameters of the pretrained model on task-specific data.

```
Typical hyperparameters:
  Learning rate: 2e-5 to 5e-5
  Batch size: 16-32
  Epochs: 2-5
  Warmup: 6-10% of total steps
  Weight decay: 0.01
  Max sequence length: 512
```

### Parameter-Efficient Fine-Tuning (PEFT)

**LoRA (Low-Rank Adaptation)**
```
W_new = W_pretrained + delta_W
delta_W = A * B   where A is (d x r), B is (r x d), r << d

Typical rank r = 8-64
Parameters trained: 2 * d * r per attention matrix
Savings: 10-100x fewer trainable parameters
```

**Prefix Tuning**: prepend learnable virtual tokens to each layer
**Adapters**: insert small bottleneck layers between transformer blocks
**QLoRA**: quantize base model to 4-bit, apply LoRA on top

### When to Use What

| Data Size | Approach |
|-----------|----------|
| 0 examples | Zero-shot prompting |
| 1-50 examples | Few-shot prompting |
| 50-1K examples | LoRA / Adapters |
| 1K-100K examples | Full fine-tuning |
| 100K+ examples | Continue pre-training + fine-tuning |

---

## Prompt Engineering for NLP

### Core Techniques

**Zero-Shot**
```
Classify the sentiment of this review as positive or negative:
"The product arrived damaged and customer service was unhelpful."
Sentiment:
```

**Few-Shot (In-Context Learning)**
```
Classify sentiment:
"Great product!" -> positive
"Terrible experience" -> negative
"Arrived damaged" ->
```

**Chain-of-Thought**
```
Classify the sentiment and explain your reasoning step by step:
Review: "The battery life is amazing but the camera quality is disappointing."
Reasoning: The review has mixed sentiment...
```

---

## Retrieval-Augmented Generation (RAG)

### Architecture

```
Query ──> [Retriever] ──> Top-K documents ──> [Generator] ──> Answer
              │                                     │
         Vector DB                          LLM (GPT/Claude)
    (FAISS/Pinecone/Weaviate)
```

### RAG Pipeline

1. **Index**: chunk documents, embed with sentence-transformer, store in vector DB
2. **Retrieve**: embed query, find top-K similar chunks via ANN search
3. **Augment**: prepend retrieved chunks to the LLM prompt as context
4. **Generate**: LLM generates answer grounded in retrieved context

### Chunking Strategies

| Strategy | Description | Best For |
|----------|-----------|----------|
| Fixed size | Split every N tokens with overlap | General purpose |
| Sentence | Split at sentence boundaries | Clean text |
| Semantic | Split at topic boundaries (embedding similarity) | Long documents |
| Recursive | Split by paragraph, then sentence, then token | Structured docs |
| Document | One chunk per document | Short documents |

### Evaluation

| Metric | Measures | Computed By |
|--------|---------|-------------|
| Retrieval precision@K | Relevant docs in top K | Exact match or annotation |
| MRR | Rank of first relevant doc | 1/rank |
| Faithfulness | Answer supported by context | LLM-as-judge or NLI |
| Answer relevance | Answer addresses the question | LLM-as-judge |
| Context relevance | Retrieved context is pertinent | Embedding similarity |

---

## Evaluation Metrics

### BLEU (Bilingual Evaluation Understudy)

Precision-based metric for machine translation:

```
BLEU = BP * exp(SUM_n w_n * log(p_n))

p_n = modified n-gram precision (clipped by reference count)
BP = brevity penalty = min(1, exp(1 - r/c))
Typical: BLEU-4 with uniform weights w_n = 1/4
```

### ROUGE (Recall-Oriented Understudy for Gisting Evaluation)

Recall-based metrics for summarization:

```
ROUGE-N = (overlap n-grams with reference) / (n-grams in reference)
ROUGE-L = longest common subsequence / reference length
ROUGE-Lsum = sentence-level ROUGE-L for multi-sentence summaries
```

### BERTScore

Contextual embedding similarity between generated and reference text:

```
BERTScore = F1 of token-level cosine similarities
  Precision: each generated token matched to most similar reference token
  Recall: each reference token matched to most similar generated token
```

### Human Evaluation Dimensions

| Dimension | Definition |
|-----------|-----------|
| Fluency | Grammatically correct, natural sounding |
| Coherence | Logically consistent, well-organized |
| Relevance | Addresses the question/task |
| Faithfulness | Supported by source material (no hallucination) |
| Informativeness | Contains useful, sufficient information |

---

## Multilingual NLP

### Multilingual Models

| Model | Languages | Approach |
|-------|-----------|---------|
| mBERT | 104 | Joint MLM on Wikipedia |
| XLM-RoBERTa | 100 | 2.5TB CommonCrawl data |
| mT5 | 101 | Text-to-text, multilingual C4 |
| BLOOM | 46 | Multilingual autoregressive |
| NLLB | 200 | Machine translation focused |

### Cross-Lingual Transfer

Train on high-resource language (English), evaluate on low-resource:
- Zero-shot transfer: fine-tune on English, evaluate on target language
- Translate-train: translate training data to target language
- Translate-test: translate test data to English, run English model
- Few-shot: small amount of target language data for adaptation

---

## Production Checklist

- [ ] Model selected based on task requirements (encoder/decoder/both)
- [ ] Fine-tuning strategy matches available data volume
- [ ] Evaluation metrics appropriate for the task (BLEU for translation, etc.)
- [ ] Inference latency and throughput benchmarked
- [ ] Model size fits deployment constraints (GPU memory, cost)
- [ ] Prompt templates versioned and tested
- [ ] RAG pipeline evaluated end-to-end (retrieval + generation)
- [ ] Bias and toxicity evaluation completed
- [ ] Multilingual performance tested if applicable
- [ ] Monitoring for distribution shift in production inputs

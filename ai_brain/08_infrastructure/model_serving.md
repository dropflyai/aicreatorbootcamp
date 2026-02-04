# Model Serving: Optimizing Inference for Production Deployment

## Overview

Model serving is the discipline of deploying trained models to handle real-time inference requests at production scale. The core challenge is balancing three competing objectives: latency (how fast responses are delivered), throughput (how many requests can be processed concurrently), and cost (the compute resources consumed per request). This module covers latency optimization, batching strategies, quantization, distillation, model compression, and edge deployment.

---

## 1. Inference Latency Anatomy

### 1.1 Latency Components

Total inference latency for an LLM request consists of:

**Prefill Latency (Time-to-First-Token, TTFT)**: The time to process the input prompt. Proportional to input length and model size. This is compute-bound -- the GPU is actively processing every input token.

**Decode Latency (Inter-Token Latency)**: The time to generate each subsequent output token. Each token requires a forward pass through the model, but only for a single token, making it memory-bandwidth-bound rather than compute-bound.

**Total Latency**: TTFT + (number of output tokens * inter-token latency).

For a typical request with 1000 input tokens and 500 output tokens on a 7B model:
- TTFT: ~200-500ms
- Inter-token: ~20-40ms per token
- Total: ~10-20 seconds

### 1.2 Latency Optimization Targets

| Metric | Target | Impact |
|--------|--------|--------|
| TTFT | < 500ms | User perceives response starting quickly |
| Inter-token latency | < 50ms | Smooth streaming experience |
| P99 total latency | < 30s | Acceptable for most interactive use |
| P99 TTFT | < 1s | Handles long prompts without perceived delay |

---

## 2. KV-Cache Optimization

### 2.1 What Is the KV-Cache

During autoregressive generation, each new token needs to attend to all previous tokens. Without caching, this requires recomputing the key and value projections for all previous tokens at every step. The KV-cache stores these projections, converting the operation from O(n^2) to O(n).

### 2.2 Memory Impact

KV-cache memory grows linearly with sequence length and batch size:

```
KV-cache memory = 2 * num_layers * num_heads * head_dim * seq_length * batch_size * bytes_per_element
```

For a 7B model with 32 layers, 32 heads, 128 head dim, 4096 sequence length, batch size 1, FP16:
~2GB of KV-cache memory.

### 2.3 KV-Cache Compression

**Grouped Query Attention (GQA)**: Use fewer key-value heads than query heads. Reduces KV-cache by the grouping factor. Most modern models (Llama 2+, Mistral) use GQA.

**Multi-Query Attention (MQA)**: Extreme GQA with a single key-value head shared across all query heads. Maximum KV-cache reduction but potential quality loss.

**PagedAttention (vLLM)**: Manages KV-cache memory like OS virtual memory pages. Eliminates memory waste from pre-allocated but unused cache slots. Improves throughput by 2-4x through better memory utilization.

---

## 3. Batching Strategies

### 3.1 Static Batching

Collect N requests, pad to the same length, process as a single batch. Simple but wasteful: short sequences are padded to the length of the longest, wasting compute on padding tokens.

### 3.2 Continuous Batching

Dynamically add and remove requests from the batch as they arrive and complete. When one request in the batch finishes generating, immediately start a new request in its slot. Maximizes GPU utilization.

**Iteration-Level Scheduling**: At each decode step, check for new requests and add them to the batch. Completed requests are removed. This is the approach used by vLLM and TGI.

### 3.3 Speculative Decoding

Use a small, fast "draft" model to generate several candidate tokens, then verify them in parallel using the large model. If the draft model's predictions match the large model's, multiple tokens are accepted in a single step.

**Speedup**: 2-3x for tasks where the draft model can predict many tokens correctly (well-structured output, common patterns). No quality loss since the large model verifies every token.

---

## 4. Quantization

### 4.1 Core Concept

Quantization reduces the precision of model weights from 32-bit or 16-bit floating point to lower-precision representations (8-bit, 4-bit, or even 2-bit). This reduces memory requirements and can accelerate inference.

### 4.2 Quantization Methods

**Post-Training Quantization (PTQ)**: Quantize weights after training without any retraining. Simple but can degrade quality, especially at very low bit-widths.

- **INT8 Quantization**: Minimal quality loss (< 1% accuracy drop on most benchmarks). 2x memory reduction. Well-supported by hardware.
- **INT4 Quantization (GPTQ, AWQ)**: Moderate quality loss (1-3% on most benchmarks). 4x memory reduction. Enables serving large models on consumer hardware.
- **2-bit Quantization**: Significant quality loss. Useful only for inference cost reduction where quality degradation is acceptable.

**Quantization-Aware Training (QAT)**: Simulate quantization during training, allowing the model to adapt to lower precision. Produces higher quality quantized models but requires retraining.

### 4.3 Quantization Format Comparison

| Format | Bits | Memory Reduction | Quality Loss | Hardware Support |
|--------|------|-----------------|--------------|-----------------|
| FP16/BF16 | 16 | 2x vs FP32 | Negligible | Excellent |
| INT8 (SmoothQuant) | 8 | 4x vs FP32 | < 1% | Good |
| INT4 (GPTQ) | 4 | 8x vs FP32 | 1-3% | Moderate |
| INT4 (AWQ) | 4 | 8x vs FP32 | < 2% | Moderate |
| GGUF (llama.cpp) | 2-8 | Variable | Variable | CPU-optimized |

### 4.4 When to Quantize

- **Always**: FP32 to FP16/BF16 for training and inference (negligible quality loss)
- **Usually**: FP16 to INT8 for serving (< 1% quality loss, 2x cost reduction)
- **Selectively**: INT8 to INT4 when serving large models on limited hardware
- **Carefully**: Below INT4 only for edge deployment or extreme cost constraints

---

## 5. Knowledge Distillation

### 5.1 Core Concept

Knowledge distillation trains a smaller "student" model to mimic the behavior of a larger "teacher" model. The student learns from the teacher's output distribution (soft labels), which contains richer information than hard labels alone.

### 5.2 Distillation Approaches

**Output Distillation**: Train the student on the teacher's output logits. The student learns the teacher's probability distribution over tokens, including the relative probabilities of incorrect tokens, which encode useful information.

**Feature Distillation**: Train the student to match the teacher's intermediate representations (hidden states, attention patterns). More information transfer but more complex to implement.

**Data Distillation**: Use the teacher to generate a large training dataset, then fine-tune the student on this dataset. Simplest approach, works well when the teacher can generate high-quality outputs at scale.

### 5.3 Distillation Results

Typical quality retention when distilling from a 70B model to a 7B model:
- General benchmarks: 85-95% of teacher performance
- Domain-specific tasks (with domain data): 90-98% of teacher performance
- At 10x lower inference cost and 10x faster inference speed

### 5.4 When to Distill

- When you need to serve a high-quality model at lower cost
- When latency requirements exceed what the large model can achieve
- When deploying to resource-constrained environments (mobile, edge)
- When you have access to a high-quality teacher but need a smaller production model

---

## 6. Model Compression

### 6.1 Pruning

Remove weights or entire neurons/attention heads that contribute least to model quality:

**Unstructured Pruning**: Zero out individual weights based on magnitude. Up to 50-80% sparsity with minimal quality loss. Requires sparse computation support for speed benefit.

**Structured Pruning**: Remove entire neurons, attention heads, or layers. Produces standard dense models that run on standard hardware. Typically 20-40% of parameters can be removed.

### 6.2 Architecture Optimization

**Layer Reduction**: Remove transformer layers that contribute least to output quality. Identify by measuring each layer's impact through ablation.

**Width Reduction**: Reduce hidden dimension size. Re-train or distill to recover quality.

**Attention Head Reduction**: Many attention heads are redundant. Remove low-impact heads to reduce computation.

---

## 7. Serving Frameworks

### 7.1 vLLM

**Architecture**: PagedAttention for efficient KV-cache management, continuous batching, and optimized CUDA kernels.

**Strengths**: Highest throughput for concurrent requests, excellent memory utilization, OpenAI-compatible API.

**Best For**: High-throughput serving of open-source models.

### 7.2 TGI (Text Generation Inference)

**Architecture**: Hugging Face's production inference server. Rust-based for performance. Supports tensor parallelism, continuous batching, and flash attention.

**Strengths**: Deep Hugging Face ecosystem integration, production-tested at scale.

**Best For**: Teams using Hugging Face models and infrastructure.

### 7.3 Ollama

**Architecture**: Local model serving optimized for developer experience. Supports GGUF quantized models on CPU and GPU.

**Strengths**: Simplest setup, works on consumer hardware, excellent for development.

**Best For**: Local development, prototyping, on-device inference.

### 7.4 Triton Inference Server

**Architecture**: NVIDIA's production inference server. Supports multiple model types (PyTorch, TensorRT, ONNX) and dynamic batching.

**Strengths**: Enterprise-grade features, multi-model serving, A/B testing support.

**Best For**: Enterprise deployments with multiple model types.

---

## 8. Edge Inference

### 8.1 On-Device Models

Deploy models directly on user devices (phones, laptops, IoT devices):
- **Privacy**: Data never leaves the device
- **Latency**: No network round-trip
- **Offline**: Works without internet connectivity
- **Cost**: No per-inference cloud cost

### 8.2 Edge Optimization Stack

1. Start with a small model (1-3B parameters)
2. Distill from a larger teacher for quality improvement
3. Quantize to INT4 for memory and speed
4. Optimize with framework-specific tools (Core ML for Apple, ONNX Runtime for cross-platform)
5. Test on target devices for latency and quality validation

### 8.3 Edge Deployment Challenges

- Limited memory (8-16GB on mobile, often shared with other apps)
- Thermal constraints (sustained inference causes throttling)
- Battery impact (GPU inference is power-intensive)
- Model update distribution (updating multi-GB models on devices)

---

## 9. Key References

- Kwon et al. (2023) -- "Efficient Memory Management for Large Language Model Serving with PagedAttention"
- Leviathan et al. (2023) -- "Fast Inference from Transformers via Speculative Decoding"
- Frantar et al. (2023) -- "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
- Lin et al. (2024) -- "AWQ: Activation-aware Weight Quantization for LLM Compression"

---

*This module covers model serving. See `ml_infrastructure.md` for training infrastructure and `cost_optimization.md` for cost management strategies.*

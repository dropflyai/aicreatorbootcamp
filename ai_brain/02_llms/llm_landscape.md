# LLM Landscape

> Reference: Model technical reports (GPT-4, Claude, LLaMA, Gemini), Hugging Face Open LLM Leaderboard, Stanford HELM

---

## 1. The Foundation Model Ecosystem

The LLM landscape divides into two categories: **closed-source frontier models** (accessed via API) and **open-weight models** (weights available for download and self-hosting). The choice between them is one of the most consequential architectural decisions in any AI product.

### Decision Framework

| Factor | Closed-Source (API) | Open-Weight (Self-Hosted) |
|--------|-------------------|--------------------------|
| Capability ceiling | Higher (GPT-4, Claude 3.5) | Approaching parity (LLaMA 3.1 405B) |
| Latency control | Limited (provider-dependent) | Full control |
| Cost at scale | Per-token pricing (can be expensive) | Fixed infra cost (amortizes with volume) |
| Data privacy | Data leaves your infrastructure | Full data sovereignty |
| Customization | Prompt engineering, fine-tuning APIs | Full fine-tuning, architecture modification |
| Operational burden | Zero (provider manages everything) | Significant (GPUs, serving, monitoring) |
| Vendor lock-in | High | Low |
| Compliance | Depends on provider's certifications | Full control over compliance |

### The 80/20 Rule of Model Selection

For 80% of production use cases, the right model is NOT the largest or most capable. It is the smallest model that meets quality requirements, because:
- Smaller models are faster (lower latency)
- Smaller models are cheaper (fewer tokens, less compute)
- Smaller models are easier to self-host
- Smaller models can be fine-tuned on consumer hardware

Always start with the smallest viable model and scale up only when evaluation demonstrates inadequacy.

---

## 2. Closed-Source Frontier Models

### GPT-4 / GPT-4o / GPT-4o-mini (OpenAI)

**Architecture**: Rumored mixture-of-experts (MoE) with ~1.8T total parameters, ~280B active per forward pass. Decoder-only transformer.

**Key Characteristics**:
- Strongest general-purpose reasoning as of late 2024
- 128K context window (GPT-4 Turbo and GPT-4o)
- Native multimodal: vision (image input), audio (GPT-4o)
- Function calling with structured JSON output
- Extensive fine-tuning API

**Model Variants**:
| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| GPT-4o | Fast | Medium | General production use |
| GPT-4o-mini | Very fast | Low | High-volume, simpler tasks |
| GPT-4 Turbo | Medium | High | Complex reasoning, long context |
| o1 / o1-mini | Slow | High | Math, science, complex reasoning |

**Strengths**: Broadest capability profile, strongest at code generation, best function calling, most extensive ecosystem (plugins, assistants API).

**Weaknesses**: Cost at scale, data privacy concerns, no self-hosting option, occasional quality regressions after updates.

### Claude 3.5 / Claude 3 (Anthropic)

**Architecture**: Decoder-only transformer. Specific architecture details not publicly disclosed. Trained with Constitutional AI (RLAIF) and RLHF.

**Key Characteristics**:
- 200K context window (largest among frontier models)
- Strong instruction following and nuanced reasoning
- Constitutional AI training produces more cautious, aligned behavior
- Excellent at long-document analysis and synthesis
- Tool use / function calling support

**Model Variants**:
| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| Claude 3.5 Sonnet | Fast | Medium | General production use, coding |
| Claude 3 Opus | Slower | High | Complex analysis, nuanced reasoning |
| Claude 3.5 Haiku | Very fast | Low | High-volume, classification |

**Strengths**: Long context handling, safety and alignment, instruction following, reduced hallucination, excellent at analysis and writing.

**Weaknesses**: More conservative (may refuse edge cases), smaller ecosystem than OpenAI, fewer fine-tuning options.

### Gemini (Google DeepMind)

**Architecture**: Mixture-of-Experts transformer. Natively multimodal (trained on text, images, audio, video jointly).

**Key Characteristics**:
- 1M+ token context window (Gemini 1.5 Pro)
- Native multimodal from pretraining (not bolted on)
- Strong at code, math, and multimodal reasoning
- Tight integration with Google Cloud and Vertex AI

**Model Variants**:
| Model | Speed | Context | Best For |
|-------|-------|---------|----------|
| Gemini 1.5 Pro | Medium | 1M tokens | Long document, multimodal |
| Gemini 1.5 Flash | Fast | 1M tokens | High-volume production |
| Gemini Ultra | Slow | 128K | Frontier reasoning |

**Strengths**: Longest context window, native multimodality, competitive reasoning, Google ecosystem integration.

**Weaknesses**: Availability varies by region, API stability has been inconsistent, fewer third-party integrations.

---

## 3. Open-Weight Models

### LLaMA 3.1 (Meta)

**Architecture**: Decoder-only transformer with GQA, RoPE, SwiGLU, RMSNorm. Released under Meta's open license.

**Sizes**: 8B, 70B, 405B parameters

**Key Characteristics**:
- 128K context window
- Trained on 15T+ tokens
- Competitive with GPT-4 at 405B scale
- Extensive fine-tuning ecosystem (QLoRA on consumer GPUs for 8B)
- Community: Thousands of fine-tuned variants on Hugging Face

**Why LLaMA Matters**:
LLaMA democratized access to frontier-quality LLMs. The 8B model runs on a single GPU; the 70B model on 2-4 GPUs. This enabled:
- Private deployment (data never leaves your infrastructure)
- Custom fine-tuning for domain-specific tasks
- Research and experimentation without API costs
- Edge deployment (quantized 8B models run on laptops)

### Mistral / Mixtral (Mistral AI)

**Architecture**: Mistral 7B uses sliding window attention (4096 window, 32K effective context). Mixtral 8x7B is a Mixture-of-Experts model with 8 experts, 2 active per token (~13B active parameters from 47B total).

**Key Characteristics**:
- Mistral 7B: Outperforms LLaMA 2 13B on most benchmarks
- Mixtral 8x7B: Outperforms LLaMA 2 70B on most benchmarks at 3x lower inference cost
- Sliding window attention enables efficient long-context processing
- Apache 2.0 license (truly open)

**Strengths**: Excellent quality-to-cost ratio, efficient inference, permissive licensing.

### Qwen 2.5 (Alibaba)

**Architecture**: Decoder-only transformer. Strong multilingual support (Chinese, English, and 27+ languages).

**Sizes**: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B

**Strengths**: Best-in-class for Chinese language tasks, strong coding ability, extensive size range, Apache 2.0 license.

### Phi-3 (Microsoft)

**Architecture**: Decoder-only transformer trained on high-quality synthetic and curated data.

**Sizes**: 3.8B (Mini), 7B (Small), 14B (Medium)

**Key Innovation**: "Textbook-quality" training data. Demonstrates that data quality can partially compensate for model size.

**Strengths**: Extremely strong for size, runs on mobile devices (Phi-3 Mini), good for on-device deployment.

### DeepSeek-V2 / DeepSeek-Coder

**Architecture**: Multi-head Latent Attention (MLA) -- a novel KV-cache compression technique. MoE with 236B total / 21B active parameters.

**Strengths**: Competitive with much larger models, innovative architecture, strong coding capability, open weights.

---

## 4. Architectural Differences That Matter

### Decoder-Only vs. Encoder-Decoder

| Aspect | Decoder-Only (GPT, Claude, LLaMA) | Encoder-Decoder (T5, BART) |
|--------|-----------------------------------|---------------------------|
| Pretraining | Next-token prediction | Span corruption / denoising |
| Generation | Natural (autoregressive) | Natural (autoregressive decoder) |
| Understanding | Via in-context learning | Native bidirectional encoding |
| Scaling | Scales better empirically | Less explored at frontier scale |
| Flexibility | One architecture for all tasks | Separate encoder/decoder |

The industry has converged on decoder-only. The theoretical advantage of bidirectional encoding has been overcome by scale and better training.

### Dense vs. Mixture-of-Experts (MoE)

| Aspect | Dense (LLaMA, Claude) | MoE (Mixtral, Gemini, GPT-4*) |
|--------|----------------------|-------------------------------|
| Active parameters | All params every forward pass | Subset per token (via routing) |
| Total parameters | N | K * N (K experts, each ~N params) |
| Inference cost | Proportional to total params | Proportional to active params |
| Memory | Proportional to total params | Proportional to total params (all experts loaded) |
| Training | Simpler, more stable | Load balancing challenges, routing instability |
| Quality | Strong | Can match dense at lower inference cost |

MoE enables larger total parameter count (more knowledge capacity) with lower inference cost (fewer active parameters per token). The tradeoff is higher memory requirements and training complexity.

### Attention Variants

| Variant | Memory (KV-cache) | Quality | Used In |
|---------|-------------------|---------|---------|
| Multi-Head (MHA) | h * d_k * 2 per token | Baseline | GPT-2, BERT |
| Multi-Query (MQA) | d_k * 2 per token | Slightly lower | PaLM, Falcon |
| Grouped-Query (GQA) | g * d_k * 2 per token | Near-MHA | LLaMA 2/3, Gemini |

---

## 5. Model Selection Decision Tree

### Step 1: Define Requirements

```
Required capability level? ──► Frontier (complex reasoning, cutting-edge) → GPT-4o / Claude 3.5 Sonnet
                              │
                              ├► Strong (general production) → Claude 3.5 Haiku / GPT-4o-mini / LLaMA 70B
                              │
                              └► Good (classification, extraction, simple generation) → Mistral 7B / LLaMA 8B / Phi-3
```

### Step 2: Check Constraints

```
Data must stay on-premise? ──► Yes → Open-weight models only (LLaMA, Mistral, Qwen)
                              └► No → API models acceptable

Latency < 200ms? ──► Yes → Smaller models, self-hosted, or GPT-4o-mini / Haiku
                    └► No → Any model viable

Budget < $0.01/request? ──► Yes → Small open-weight or cheapest API tier
                           └► No → Full range available

Need fine-tuning? ──► Custom behavior → LoRA on open-weight model
                     ├► Instruction tuning → OpenAI / Anthropic fine-tuning API
                     └► No fine-tuning → Prompt engineering first
```

### Step 3: Prototype and Evaluate

Never select a model based on benchmarks alone. Always:
1. Build a representative evaluation set (50-200 examples)
2. Test 2-3 candidate models on your actual task
3. Measure: quality (task-specific metrics), latency, cost
4. Select the model that meets quality threshold at lowest cost

---

## 6. Model Versioning and Deprecation

### The Stability Problem

API model providers regularly update models, sometimes introducing regressions:
- GPT-4 showed measurable capability changes between March and June 2023 versions
- Model deprecation forces migration (GPT-3.5 → GPT-4o-mini)
- Version pinning (e.g., `gpt-4-0613`) provides temporary stability

### Mitigation Strategies

1. **Pin model versions** in production (never use `gpt-4-latest`)
2. **Maintain evaluation suites** that run on every model version change
3. **Abstract the model layer** so switching providers requires minimal code changes
4. **Keep a fallback model** from a different provider
5. **Log all model responses** for regression detection
6. **Consider open-weight models** for version stability (you control the weights)

---

## 7. Emerging Trends

### Smaller, Smarter Models
The trend is toward smaller models trained on better data (Phi-3, Gemma). For many production tasks, a well-tuned 7B model matches or exceeds a poorly-prompted 70B model.

### Multimodality as Default
Vision, audio, and tool use are becoming standard capabilities rather than premium features. Design systems assuming multimodal input from the start.

### Reasoning Models
OpenAI's o1 and o3 demonstrate that explicit reasoning chains (test-time compute scaling) can dramatically improve performance on math, science, and complex reasoning tasks. This represents a new scaling axis beyond model size and training data.

### Long Context
Context windows have expanded from 4K (GPT-3.5) to 1M+ (Gemini 1.5). This changes RAG architecture: for smaller document sets, stuffing documents into context may outperform retrieval pipelines.

### On-Device AI
Apple Intelligence, Gemini Nano, Phi-3 Mini demonstrate that useful LLM inference is possible on consumer devices. This enables privacy-preserving AI and offline functionality.

---

**This module provides the decision-making framework for model selection. Always consult evaluation data before committing to a model.**

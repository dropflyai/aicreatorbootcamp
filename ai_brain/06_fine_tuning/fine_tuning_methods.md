# Fine-Tuning Methods: Adapting Language Models for Specialized Tasks

## Overview

Fine-tuning adapts pre-trained language models to specific domains, tasks, or behavioral patterns by continuing training on curated datasets. While prompting steers a model's behavior at inference time, fine-tuning modifies the model's parameters permanently, embedding new capabilities or knowledge into the model's weights. This module covers the spectrum of fine-tuning approaches from full parameter updates through efficient adapter methods to alignment techniques.

---

## 1. When to Fine-Tune vs. Prompt

### 1.1 Decision Framework

Fine-tuning is justified when:
- **Prompting has been exhausted**: You have systematically optimized prompts and they still do not achieve the required performance
- **Consistent format is critical**: The task requires a specific output format that the base model cannot reliably produce
- **Latency matters**: Fine-tuned models can produce specialized behavior without long system prompts, reducing latency
- **Cost optimization**: Replacing expensive few-shot prompts with fine-tuned behavior reduces per-request token costs
- **Domain adaptation**: The model needs to understand specialized terminology, conventions, or reasoning patterns not well-represented in pre-training data

Fine-tuning is NOT justified when:
- A well-crafted prompt achieves the target performance
- The task changes frequently (re-fine-tuning is expensive)
- You lack sufficient high-quality training data (< 100 examples for most methods)
- The base model already has strong domain coverage

### 1.2 Cost-Benefit Analysis

| Factor | Prompting | Fine-Tuning |
|--------|-----------|-------------|
| Upfront Cost | Low (engineering time only) | High (data + compute + engineering) |
| Per-Request Cost | Higher (longer prompts) | Lower (shorter prompts) |
| Iteration Speed | Minutes | Hours to days |
| Flexibility | High (change prompt anytime) | Low (requires retraining) |
| Performance Ceiling | Model's inherent capability | Can exceed base model on specific tasks |
| Data Requirement | 0-10 examples | 100-100,000+ examples |

---

## 2. Full Fine-Tuning

### 2.1 Method

Full fine-tuning updates all parameters of the model on the training dataset. The entire model's weights are adjusted to optimize performance on the target task while retaining general capabilities from pre-training.

### 2.2 Training Configuration

**Learning Rate**: Use 10-100x lower learning rate than pre-training (typically 1e-5 to 5e-5). Higher rates cause catastrophic forgetting -- the model loses pre-trained knowledge.

**Epochs**: 1-5 epochs for most datasets. More epochs risk overfitting, especially on small datasets. Monitor validation loss to detect overfitting.

**Batch Size**: Larger batches provide more stable gradients. Use gradient accumulation to simulate large batches on limited hardware. Effective batch size of 32-128 is common.

**Warmup**: Linear warmup over 5-10% of total steps prevents early instability. The model needs gradual adjustment from pre-trained weights.

**Weight Decay**: 0.01-0.1 to prevent overfitting. Regularizes the model by penalizing large weight values.

### 2.3 Catastrophic Forgetting

The primary risk of full fine-tuning is catastrophic forgetting: as the model adapts to the fine-tuning data, it loses pre-trained general knowledge. Mitigation strategies:

- **Learning Rate Reduction**: Lower learning rates modify weights more gently
- **Data Mixing**: Include a portion (5-20%) of general-purpose data alongside task-specific data
- **Regularization**: L2 regularization or elastic weight consolidation penalize large parameter changes
- **Early Stopping**: Stop training before the model overfits to fine-tuning data

### 2.4 Hardware Requirements

Full fine-tuning of a 7B parameter model requires approximately 28GB VRAM (with mixed precision). 70B models require multiple GPUs with model parallelism. This makes full fine-tuning prohibitively expensive for most practitioners beyond the 7-13B parameter range.

---

## 3. LoRA (Low-Rank Adaptation)

### 3.1 Core Concept

LoRA (Hu et al., 2021) freezes the pre-trained model weights and injects small trainable rank-decomposition matrices into each transformer layer. Instead of updating the full weight matrix W (dimensions d x d), LoRA learns two small matrices A (d x r) and B (r x d) where r << d (typically 4-64), such that the weight update is approximated by BA.

### 3.2 Why It Works

Weight updates during fine-tuning have low intrinsic rank -- the information needed to adapt a model to a new task can be captured in a much lower-dimensional space than the full parameter count suggests. LoRA exploits this by constraining updates to a low-rank subspace.

### 3.3 Configuration Parameters

**Rank (r)**: The rank of the decomposition matrices. Higher rank = more expressive but more parameters and memory. Start with r=8 for most tasks, increase to r=16-64 for complex tasks.

**Alpha**: Scaling factor for the LoRA update. The effective learning rate for LoRA weights is `alpha/r * learning_rate`. Typical alpha = 2*r.

**Target Modules**: Which model layers receive LoRA adapters. Common choices:
- Attention layers only (q_proj, v_proj): Minimal parameters, good for simple adaptation
- All attention layers (q, k, v, o projections): More expressive
- Attention + MLP layers: Maximum expressiveness, most parameters

**Dropout**: LoRA-specific dropout (0.05-0.1) to prevent overfitting the adapter weights.

### 3.4 Advantages

- **Memory Efficient**: Only 0.1-1% of parameters are trainable. 7B model fine-tuning on a single consumer GPU.
- **No Catastrophic Forgetting**: Base model weights are frozen, preserving pre-trained knowledge.
- **Composable**: Multiple LoRA adapters can be trained for different tasks and swapped at inference time.
- **Mergeable**: LoRA weights can be merged back into the base model for zero-overhead inference.

---

## 4. QLoRA (Quantized LoRA)

### 4.1 Core Concept

QLoRA (Dettmers et al., 2023) combines LoRA with 4-bit quantization of the base model. The frozen base model is quantized to 4-bit precision (reducing memory by 4x), while LoRA adapters are trained in 16-bit or 32-bit precision.

### 4.2 Key Innovations

**4-bit NormalFloat (NF4)**: A quantization data type optimized for normally distributed neural network weights. More information-theoretically optimal than standard 4-bit integer quantization.

**Double Quantization**: Quantize the quantization constants themselves, saving an additional 0.37 bits per parameter.

**Paged Optimizers**: Use CPU memory as overflow when GPU memory is exhausted, preventing out-of-memory crashes during gradient computation.

### 4.3 Impact

QLoRA makes fine-tuning of 65B+ parameter models possible on a single 48GB GPU. This democratized access to large model fine-tuning, enabling researchers and practitioners with limited hardware to adapt frontier-scale models.

### 4.4 Performance

QLoRA achieves quality within 1-2% of full fine-tuning on most benchmarks while using 75% less memory. The quantization of the base model introduces minimal quality degradation because the LoRA adapters compensate during training.

---

## 5. RLHF (Reinforcement Learning from Human Feedback)

### 5.1 The RLHF Pipeline

RLHF aligns model behavior with human preferences through a three-stage pipeline:

**Stage 1 -- Supervised Fine-Tuning (SFT)**: Fine-tune the base model on high-quality demonstration data. This teaches the model the basic format and style of desired outputs.

**Stage 2 -- Reward Model Training**: Train a separate model to predict human preferences. Given two outputs for the same input, the reward model predicts which one a human would prefer. Training data: human annotators compare pairs of outputs and select the preferred one.

**Stage 3 -- RL Optimization**: Use PPO (Proximal Policy Optimization) to fine-tune the SFT model to maximize the reward model's score while staying close to the SFT model's behavior (KL divergence constraint).

### 5.2 Reward Model Design

The reward model receives (prompt, response) pairs and outputs a scalar reward score. Quality depends on:
- **Annotator Agreement**: Inter-annotator agreement on preferences should exceed 70%
- **Calibration**: Reward scores should correlate with actual quality, not just surface features
- **Robustness**: The reward model should not be easily "gamed" by the policy model

### 5.3 Challenges

- **Reward Hacking**: The policy model finds exploits in the reward model that produce high scores without actually improving quality
- **Annotation Cost**: Human preference data is expensive to collect at scale
- **Instability**: PPO training can be unstable, requiring careful hyperparameter tuning
- **Reward Model Quality**: The ceiling of RLHF is determined by reward model quality

---

## 6. DPO (Direct Preference Optimization)

### 6.1 Core Concept

DPO (Rafailov et al., 2023) reformulates RLHF to eliminate the separate reward model and RL optimization step. Instead, it directly optimizes the language model's policy using preference pairs, treating the language model itself as an implicit reward model.

### 6.2 Method

Given preference pairs (prompt, preferred response, dispreferred response):
- Increase the probability of generating the preferred response
- Decrease the probability of generating the dispreferred response
- Constrain updates to stay close to the reference model (SFT checkpoint)

### 6.3 Advantages Over RLHF

- **Simpler Pipeline**: No separate reward model training, no PPO optimization
- **More Stable Training**: Standard supervised loss function, no RL instability
- **Lower Compute Cost**: Single training stage instead of three
- **Comparable Quality**: Achieves similar or better alignment quality to RLHF on most benchmarks

### 6.4 Variants

- **IPO (Identity Preference Optimization)**: Addresses DPO's tendency to overfit to preference data
- **KTO (Kahneman-Tversky Optimization)**: Works with binary feedback (good/bad) instead of preference pairs
- **ORPO (Odds Ratio Preference Optimization)**: Combines SFT and preference optimization into a single stage

---

## 7. Constitutional AI Training

### 7.1 Method

Constitutional AI (Bai et al., 2022) extends RLHF by replacing human feedback with AI-generated feedback based on a set of principles (the "constitution"). This enables scalable alignment without the cost of human annotation.

### 7.2 Training Pipeline

1. Generate responses to prompts
2. Ask the model to critique its own responses against constitutional principles
3. Ask the model to revise responses based on its critiques
4. Use the original and revised responses as preference pairs for DPO/RLHF

### 7.3 Advantages

- Dramatically reduces human annotation requirements
- Principles can be updated and re-applied without re-collecting human data
- Enables alignment on nuanced criteria that are difficult to annotate consistently

---

## 8. Adapter Methods

### 8.1 Prefix Tuning

Prepend trainable continuous vectors ("soft prompts") to each transformer layer's attention computation. Only the prefix vectors are trained; model weights are frozen. Parameter efficient but less expressive than LoRA for complex adaptations.

### 8.2 Prompt Tuning

Similar to prefix tuning but only adds trainable vectors to the input embedding layer. Even more parameter efficient but with lower expressiveness. Best for simple task adaptation with large models.

### 8.3 Adapter Layers

Insert small trainable modules (typically a down-projection, nonlinearity, up-projection) between existing transformer layers. Model weights are frozen, only adapter parameters are trained.

### 8.4 Method Comparison

| Method | Trainable Params | Quality | Flexibility | Inference Overhead |
|--------|-----------------|---------|-------------|-------------------|
| Full Fine-Tuning | 100% | Highest | Lowest | None |
| LoRA | 0.1-1% | High | High (swappable) | Minimal (mergeable) |
| QLoRA | 0.1-1% | High | High | Minimal |
| Adapter Layers | 1-5% | High | High | Moderate |
| Prefix Tuning | 0.01-0.1% | Moderate | High | Minimal |
| Prompt Tuning | <0.01% | Lower | High | None |

---

## 9. Practical Fine-Tuning Workflow

### 9.1 End-to-End Process

1. **Define the objective**: What specific behavior change do you need?
2. **Curate training data**: Collect and validate training examples (see `data_preparation.md`)
3. **Select method**: Choose between full/LoRA/QLoRA based on hardware and requirements
4. **Configure training**: Set hyperparameters based on method and dataset size
5. **Train**: Run training with validation monitoring
6. **Evaluate**: Measure against benchmarks and domain-specific tests (see `evaluation.md`)
7. **Iterate**: Adjust data, hyperparameters, or method based on evaluation results
8. **Deploy**: Merge adapters (if applicable) and deploy the fine-tuned model

---

## 10. Key References

- Hu et al. (2021) -- "LoRA: Low-Rank Adaptation of Large Language Models"
- Dettmers et al. (2023) -- "QLoRA: Efficient Finetuning of Quantized Language Models"
- Rafailov et al. (2023) -- "Direct Preference Optimization"
- Ouyang et al. (2022) -- "Training Language Models to Follow Instructions with Human Feedback"
- Bai et al. (2022) -- "Constitutional AI: Harmlessness from AI Feedback"

---

*This module covers fine-tuning methods. See `data_preparation.md` for data curation and `evaluation.md` for benchmarking fine-tuned models.*

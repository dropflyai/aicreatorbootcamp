# Data Preparation: Curating Datasets for Language Model Fine-Tuning

## Overview

The quality of a fine-tuned model is bounded by the quality of its training data. State-of-the-art fine-tuning methods cannot compensate for noisy, biased, or insufficient training data. This module covers the complete data preparation pipeline: curation strategies, quality filtering, deduplication, synthetic data generation, and format requirements for different fine-tuning methods. The principles here apply whether you are preparing 500 examples for LoRA or 500,000 for full fine-tuning.

---

## 1. Data Curation Strategy

### 1.1 Defining Data Requirements

Before collecting any data, define:

**Task Specification**: What exact input-output behavior should the fine-tuned model exhibit? Write a precise specification with 10+ examples of ideal behavior across the full range of expected inputs.

**Quality Criteria**: What makes a training example "good"? Define explicit criteria:
- Correctness: The output must be factually accurate
- Completeness: The output must address all aspects of the input
- Format: The output must match the target format exactly
- Style: The output must match the desired tone, length, and register
- Edge cases: The output must handle unusual inputs gracefully

**Quantity Targets**: The amount of data needed depends on the task complexity and fine-tuning method:

| Task Complexity | LoRA/QLoRA | Full Fine-Tuning |
|----------------|-----------|-----------------|
| Simple format change | 50-200 | 200-1000 |
| Domain adaptation | 500-2000 | 2000-10000 |
| Complex behavior | 1000-5000 | 5000-50000 |
| New capability | 5000-20000 | 20000-100000+ |

### 1.2 Data Source Hierarchy

Prioritize data sources by quality:

**Tier 1 -- Expert-Created**: Domain experts manually create input-output pairs. Highest quality but most expensive. Use for the core training set and all evaluation data.

**Tier 2 -- Expert-Curated**: Collect existing data and have experts review, correct, and approve each example. Good balance of quality and efficiency.

**Tier 3 -- Rule-Filtered**: Apply automated quality rules to large datasets. Catches obvious errors but misses nuanced quality issues.

**Tier 4 -- Synthetic**: Generate training data using a stronger model. Scalable but requires careful validation to prevent error propagation.

### 1.3 Data Collection Methods

**Manual Annotation**: Hire domain experts or specialized annotators to create examples. Develop clear annotation guidelines with 20+ annotated examples. Train annotators and measure inter-annotator agreement before production annotation.

**Log Mining**: Extract examples from production system logs. User queries become inputs, system responses that received positive feedback become outputs. Requires careful filtering to avoid propagating existing system errors.

**Existing Datasets**: Leverage publicly available datasets as starting points. Transform them to match your task format. Validate quality on a random sample before using.

**Crowdsourcing**: Use platforms (Scale AI, Surge, Amazon Mechanical Turk) for annotation at scale. Requires strong quality controls: multiple annotators per example, gold-standard questions, and regular calibration.

---

## 2. Quality Filtering

### 2.1 Automated Quality Checks

Apply these filters to every training example:

**Format Validation**: Parse outputs to verify they match the required format (valid JSON, correct schema, proper markdown structure). Reject malformed examples.

**Length Filtering**: Remove examples that are too short (likely incomplete) or too long (likely rambling or containing irrelevant content). Set length thresholds based on the task.

**Language Detection**: Verify all examples are in the target language. Mixed-language training data degrades performance unless multilingual behavior is desired.

**Toxicity Screening**: Run examples through content safety classifiers. Remove toxic, biased, or inappropriate content unless the model needs to learn to handle such inputs.

**Duplication Detection**: Identify and remove exact and near-duplicate examples (covered in detail in Section 3).

### 2.2 LLM-Based Quality Scoring

Use a capable model (e.g., Claude, GPT-4) to score training examples:

```
For each training example (input, output):
  Score the output on a 1-5 scale for:
    - Correctness: Is the output factually accurate?
    - Relevance: Does the output address the input?
    - Completeness: Are all aspects of the input addressed?
    - Format: Does the output match the required format?

  If average score < 4.0: Flag for human review
  If average score < 3.0: Remove from training set
```

### 2.3 Human Quality Review

For the highest-quality datasets, implement a human review pipeline:

1. **Sample Review**: Review a random 10-20% of examples manually
2. **Error Pattern Detection**: Identify systematic error patterns in the reviewed sample
3. **Targeted Filtering**: Apply automated rules to catch the identified error patterns across the full dataset
4. **Final Audit**: Review another random sample after filtering to verify quality improvement

### 2.4 Quality Metrics

Track these metrics for your training dataset:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Format compliance | > 99% | Automated validation |
| Factual accuracy | > 95% | Expert review on sample |
| Inter-annotator agreement | > 80% | Cohen's kappa on overlapping annotations |
| LLM quality score | > 4.0/5.0 | Automated LLM scoring |
| Duplication rate | < 5% | Deduplication analysis |

---

## 3. Deduplication

### 3.1 Why Deduplication Matters

Duplicated training examples cause the model to memorize rather than generalize. The model over-weights duplicated examples, potentially learning to produce those specific outputs at the expense of generalization. Even near-duplicates (slight variations of the same content) can cause this effect.

### 3.2 Exact Deduplication

Compute a hash (SHA-256) of each example and remove entries with identical hashes. Fast and simple. Catches copy-paste duplicates.

### 3.3 Near-Deduplication

**N-gram Overlap**: Compute n-gram (n=5) overlap between all pairs of examples. Remove pairs with > 80% overlap.

**MinHash / LSH**: Approximate nearest neighbor search on text. Efficient for large datasets. Groups similar documents into buckets. Remove all but one document from each bucket.

**Embedding Similarity**: Embed all examples and find clusters with high intra-cluster similarity. More semantically aware than n-gram methods but more expensive.

### 3.4 Deduplication Pipeline

```
Raw Dataset
    |
    v
Exact Dedup (hash-based) --> Remove exact copies
    |
    v
Near Dedup (MinHash) --> Remove paraphrases
    |
    v
Semantic Dedup (embedding) --> Remove semantically redundant examples
    |
    v
Deduplicated Dataset
```

---

## 4. Synthetic Data Generation

### 4.1 When to Use Synthetic Data

Synthetic data generation uses a stronger model to create training examples for fine-tuning a smaller or specialized model. Use when:
- Insufficient real-world examples exist
- Expert annotation is too expensive to scale
- You need to cover edge cases that are rare in real data
- Data augmentation is needed to balance class distributions

### 4.2 Generation Strategies

**Direct Generation**: Prompt a strong model to generate input-output pairs for the target task.

```
Generate 10 diverse examples of customer support tickets about billing issues.
For each ticket, provide:
1. The customer's message
2. The ideal support agent response
Ensure examples cover: overcharges, subscription cancellation, payment failures,
refund requests, and billing cycle questions.
```

**Seed-Based Generation**: Start with a few real examples and ask the model to generate variations.

```
Here are 3 real examples of our task:
{examples}

Generate 10 new examples that are similar in format and quality but cover
different scenarios not represented above.
```

**Evolutionary Generation**: Generate examples, evaluate them, keep the best, and use them as seeds for the next generation. This iteratively improves quality.

**Distillation**: Feed real inputs to a strong model and use its outputs as training targets for the weaker model. The fine-tuned model learns to approximate the strong model's behavior.

### 4.3 Quality Control for Synthetic Data

Synthetic data inherits and amplifies the generating model's biases and errors. Mandatory quality controls:

- **Diversity Analysis**: Verify synthetic examples cover the full input space, not just the generating model's comfort zone
- **Correctness Verification**: Validate a random sample of synthetic outputs against ground truth
- **Distribution Analysis**: Compare the distribution of synthetic data to real data across key dimensions (length, complexity, topic, format)
- **Contamination Check**: Ensure synthetic data does not contain verbatim text from the generating model's training data

### 4.4 Mixing Ratios

For optimal results, combine real and synthetic data:
- Start with 70% real, 30% synthetic
- Increase synthetic proportion only if evaluation metrics improve
- Never exceed 80% synthetic without extensive quality validation
- Always use 100% real data for evaluation (never evaluate on synthetic data)

---

## 5. Data Format Requirements

### 5.1 Instruction Fine-Tuning Format

The standard format for instruction fine-tuning:

```json
{
  "messages": [
    {"role": "system", "content": "You are a medical coding specialist..."},
    {"role": "user", "content": "Code the following clinical note: ..."},
    {"role": "assistant", "content": "ICD-10 Codes: E11.9 (Type 2 diabetes)..."}
  ]
}
```

### 5.2 Preference Data Format (for DPO/RLHF)

```json
{
  "prompt": "Explain quantum computing to a 10-year-old.",
  "chosen": "Imagine you have a magic coin that can be heads AND tails...",
  "rejected": "Quantum computing utilizes quantum mechanical phenomena such as superposition and entanglement to perform computation..."
}
```

### 5.3 Multi-Turn Conversation Format

```json
{
  "messages": [
    {"role": "user", "content": "I need help with my order."},
    {"role": "assistant", "content": "I'd be happy to help. What's your order number?"},
    {"role": "user", "content": "It's ORDER-12345"},
    {"role": "assistant", "content": "I found your order. It was shipped on..."}
  ]
}
```

### 5.4 Format Validation

Before training, validate every example:
- All required fields are present
- Field types match the schema (string, array, etc.)
- Token counts are within the model's context window
- Special tokens are properly handled
- No data leakage between training and evaluation sets

---

## 6. Dataset Splitting

### 6.1 Train / Validation / Test Split

| Split | Proportion | Purpose |
|-------|-----------|---------|
| Train | 80-90% | Model parameter updates |
| Validation | 5-10% | Hyperparameter tuning, early stopping |
| Test | 5-10% | Final performance evaluation |

### 6.2 Splitting Strategy

- **Random Split**: Appropriate for i.i.d. data
- **Stratified Split**: Maintain class proportions across splits
- **Temporal Split**: Train on older data, evaluate on newer data (for temporal domains)
- **Group Split**: Ensure examples from the same source/user are in the same split (prevents data leakage)

---

## 7. Data Augmentation

### 7.1 Paraphrase Augmentation

Generate paraphrased versions of inputs to increase robustness:
- Same meaning, different wording
- Different levels of formality
- Different levels of detail

### 7.2 Negative Example Generation

Generate examples of incorrect outputs to use in preference training:
- Outputs with subtle factual errors
- Outputs with correct facts but wrong format
- Outputs that are partially correct but incomplete
- Outputs that hallucinate additional information

### 7.3 Perturbation Augmentation

Add realistic noise to inputs:
- Typos and grammatical errors
- Incomplete sentences
- Ambiguous phrasing
- Out-of-scope requests (to train appropriate refusal behavior)

---

## 8. Key References

- Zhou et al. (2023) -- "LIMA: Less Is More for Alignment"
- Touvron et al. (2023) -- "Llama 2: Open Foundation and Fine-Tuned Chat Models"
- Wang et al. (2023) -- "Self-Instruct: Aligning LMs with Self-Generated Instructions"
- Penedo et al. (2023) -- "The RefinedWeb Dataset for Falcon LLM"
- Lee et al. (2022) -- "Deduplicating Training Data Makes Language Models Better"

---

*This module covers data preparation. See `fine_tuning_methods.md` for training approaches and `evaluation.md` for measuring fine-tuned model performance.*

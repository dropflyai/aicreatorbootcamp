# Prompt Optimization: Testing, Evaluation, and Management at Scale

## Overview

Prompt optimization is the systematic practice of testing, measuring, versioning, and continuously improving prompts to maximize their effectiveness in production systems. While prompt design is an art informed by intuition, prompt optimization is an engineering discipline driven by data. This module covers the complete lifecycle of prompt management from initial testing through production monitoring and iteration.

---

## 1. Prompt Testing Frameworks

### 1.1 The Prompt Testing Pyramid

Like software testing, prompt testing operates at multiple levels of granularity:

**Unit Tests (Component Level)**: Test individual prompt components in isolation. Does the system prompt correctly establish the persona? Does the output format specification produce valid JSON? Does the few-shot example set cover edge cases?

**Integration Tests (Pipeline Level)**: Test the complete prompt pipeline end-to-end. Does the chain of prompts produce correct final output? Do RAG-augmented prompts retrieve relevant context? Does the error handling path activate correctly?

**Regression Tests (Stability Level)**: Maintain a curated set of input-output pairs that must continue to produce correct results as prompts evolve. Any prompt change that breaks a regression test requires explicit review.

**Adversarial Tests (Robustness Level)**: Test prompts against deliberately challenging inputs: prompt injection attempts, edge cases, ambiguous inputs, extremely long inputs, inputs in unexpected formats, and inputs designed to trigger hallucination.

### 1.2 Test Suite Design

A comprehensive prompt test suite should include:

| Category | Count | Purpose |
|----------|-------|---------|
| Golden examples | 20-50 | Core functionality verification |
| Edge cases | 10-20 | Boundary behavior validation |
| Adversarial inputs | 10-15 | Robustness verification |
| Format compliance | 10-15 | Output structure validation |
| Domain-specific | 15-30 | Domain accuracy verification |
| Performance benchmarks | 5-10 | Latency and cost baselines |

### 1.3 Automated Testing Infrastructure

Build a prompt testing pipeline that:
1. Accepts a prompt version identifier and test suite
2. Runs all test cases against the specified model
3. Evaluates outputs using both automated metrics and LLM-as-judge
4. Produces a score card comparing to the previous version
5. Flags regressions and improvements with specific examples
6. Archives results for longitudinal analysis

---

## 2. Evaluation Metrics

### 2.1 Task-Specific Metrics

**Classification Tasks**: Precision, recall, F1 score, confusion matrix, Cohen's kappa for inter-rater agreement.

**Generation Tasks**: BLEU, ROUGE, BERTScore for reference-based evaluation. Perplexity for fluency. Custom rubrics for domain-specific quality.

**Extraction Tasks**: Field-level accuracy, completeness (all fields extracted), precision (no spurious fields), format compliance rate.

**Reasoning Tasks**: Step-level accuracy (each reasoning step is correct), final answer accuracy, reasoning chain coherence.

### 2.2 Universal Metrics

These metrics apply across all prompt types:

**Consistency**: Run the same prompt 10+ times with temperature > 0. Measure the variance in outputs. High variance indicates an unreliable prompt that is sensitive to sampling randomness.

**Format Compliance Rate**: Percentage of outputs that pass schema validation. Target 99%+ for production prompts. Anything below 95% indicates a format specification issue.

**Refusal Rate**: Percentage of inputs that trigger a refusal or "I can't help with that" response. Track legitimate vs. inappropriate refusals. High inappropriate refusal rates indicate over-constrained safety instructions.

**Latency**: Time to first token (TTFT) and total completion time. Prompt length directly affects TTFT. Complex reasoning instructions increase total completion time.

**Token Efficiency**: Output quality per token consumed. Compare the quality achieved against the total token cost (input + output). Identify opportunities to achieve the same quality with fewer tokens.

### 2.3 LLM-as-Judge Evaluation

Use a separate LLM call to evaluate prompt outputs against a rubric. This scales better than human evaluation while capturing nuanced quality dimensions.

**Rubric Design**: Define 3-5 evaluation dimensions, each with a 1-5 scale and explicit descriptions for each score level. Vague rubrics produce unreliable evaluations.

**Calibration**: Evaluate a set of outputs with both human judges and LLM judges. Compute correlation. If correlation is below 0.8, refine the rubric or switch to a more capable evaluation model.

**Bias Mitigation**: LLM judges have known biases -- they prefer longer responses, responses that match their own style, and responses that hedge. Control for these biases by including length-normalized scoring and penalizing unnecessary hedging.

---

## 3. Prompt Versioning

### 3.1 Version Control Strategy

Treat prompts as code. Every prompt change should be:
- Stored in version control with a meaningful commit message
- Tagged with a version number following semantic versioning
- Associated with evaluation results on the standard test suite
- Reviewed by a second engineer before deployment

### 3.2 Semantic Versioning for Prompts

**MAJOR** (1.0 -> 2.0): Changes that alter the fundamental behavior or output format. Breaking changes that require downstream system updates.

**MINOR** (1.0 -> 1.1): Changes that add new capabilities or improve quality without altering existing behavior. New few-shot examples, additional instructions for edge cases.

**PATCH** (1.0.0 -> 1.0.1): Typo fixes, minor wording changes, formatting adjustments that do not measurably affect output quality.

### 3.3 Prompt Configuration Management

Store prompts in a structured format that separates content from configuration:

```yaml
prompt:
  id: "invoice-extractor"
  version: "2.3.1"
  model: "claude-sonnet-4-20250514"
  temperature: 0.0
  max_tokens: 2048
  system: |
    {system prompt content}
  user_template: |
    {user message template with {{variables}}}
  metadata:
    author: "team-billing"
    last_evaluated: "2025-03-15"
    eval_score: 0.94
    test_suite: "invoice-extractor-v2"
```

### 3.4 Prompt Registry

Maintain a centralized prompt registry that maps prompt identifiers to versions, tracks which version is deployed in each environment (staging, production), and provides rollback capabilities.

---

## 4. A/B Testing Prompts

### 4.1 Experimental Design

A/B testing prompts requires careful experimental design to produce valid conclusions:

**Sample Size Calculation**: Determine the minimum number of requests needed to detect a meaningful difference in quality. For a 5% improvement detection with 95% confidence, typically need 500-1000 requests per variant.

**Stratification**: Ensure both variants receive a representative distribution of input types. Random assignment usually achieves this, but verify with post-hoc analysis.

**Duration**: Run experiments for at least one full business cycle (typically one week) to capture temporal patterns in usage.

### 4.2 Traffic Splitting

**Random Split**: Assign each request randomly to variant A or B. Simple but may produce uneven distributions for small sample sizes.

**User-Level Split**: Assign each user to a variant for the duration of the experiment. Provides consistency within user sessions and enables per-user quality measurement.

**Input-Type Split**: Route specific input types to specific variants. Useful for testing prompts optimized for particular input categories.

### 4.3 Statistical Analysis

**Primary Metric**: Define a single primary metric before the experiment starts. Optimize for this metric. Common choices: task accuracy, user satisfaction score, format compliance rate.

**Secondary Metrics**: Track additional metrics for insight but do not use them for the go/no-go decision. Prevents p-hacking from multiple comparisons.

**Significance Testing**: Use appropriate statistical tests. For proportions (accuracy, compliance rate), use chi-squared or Fisher's exact test. For continuous metrics (quality scores), use t-tests or Mann-Whitney U tests.

### 4.4 Interpreting Results

Beware of:
- **Simpson's Paradox**: Aggregate results may mask sub-group differences
- **Novelty Effects**: New prompts may perform better initially due to novelty, then regress
- **Regression to the Mean**: Extreme initial results are unlikely to persist
- **Confounding Variables**: Model updates, traffic pattern changes, or data distribution shifts during the experiment

---

## 5. Prompt Management at Scale

### 5.1 Prompt Lifecycle

```
Design -> Test -> Stage -> Deploy -> Monitor -> Iterate
  ^                                               |
  |_______________________________________________|
```

Each stage has explicit entry and exit criteria:
- **Design Exit**: Prompt has been reviewed by a second engineer
- **Test Exit**: All regression tests pass, evaluation score meets threshold
- **Stage Exit**: No regressions observed on staging traffic for 24 hours
- **Deploy Exit**: Canary deployment shows no quality degradation
- **Monitor Continuously**: Track metrics in real-time dashboards

### 5.2 Prompt Observability

Instrument prompt executions with:
- **Input logging**: Log the full prompt sent to the model (redacting PII)
- **Output logging**: Log the model's response for quality analysis
- **Metadata logging**: Model version, latency, token counts, temperature
- **Quality signals**: Downstream signals that indicate output quality (user corrections, error rates, task completion rates)

### 5.3 Drift Detection

Prompt effectiveness can degrade over time due to:
- **Model Updates**: The underlying model changes behavior across versions
- **Input Distribution Shift**: The types of inputs change over time
- **Context Degradation**: RAG-retrieved context becomes stale
- **Adversarial Adaptation**: Users learn to craft inputs that exploit prompt weaknesses

Implement automated drift detection by continuously evaluating a random sample of production inputs against quality metrics and alerting when metrics drop below thresholds.

### 5.4 Multi-Model Prompt Management

When the same task is served by different models (e.g., routing by complexity), maintain model-specific prompt variants. A prompt optimized for one model may underperform on another due to different training data, instruction-following patterns, and capability profiles.

---

## 6. Prompt Optimization Techniques

### 6.1 Ablation Studies

Systematically remove prompt components to measure their contribution:
1. Start with the full prompt (baseline)
2. Remove one component at a time
3. Measure the quality impact of each removal
4. Identify components with low contribution and remove them
5. Identify components with high contribution and invest in improving them

### 6.2 Instruction Tuning

Iterate on instruction phrasing to find optimal wording:
- Test imperative ("Extract the fields") vs. declarative ("The following fields should be extracted")
- Test specific ("Return exactly 3 bullet points") vs. flexible ("Return a concise summary")
- Test positive framing ("Include supporting evidence") vs. negative framing ("Do not omit evidence")

### 6.3 Example Optimization

For few-shot prompts, optimize example selection:
- **Coverage Analysis**: Map examples to input categories and identify gaps
- **Contribution Analysis**: Remove each example and measure quality impact
- **Ordering Effects**: Test different example orderings (easy-first vs. hard-first vs. random)
- **Example Freshness**: Replace examples periodically with recent, representative cases

### 6.4 Token Budget Optimization

Reduce token consumption without sacrificing quality:
- **Compression**: Replace verbose instructions with concise equivalents
- **Deduplication**: Remove redundant instructions that say the same thing differently
- **Conditional Inclusion**: Only include prompt sections relevant to the input type
- **Summary Substitution**: Replace detailed context with concise summaries when full detail is not needed

---

## 7. Production Prompt Architecture

### 7.1 Template Engine

Build a prompt template engine that:
- Supports variable interpolation with type checking
- Handles conditional sections based on input properties
- Manages few-shot example selection dynamically
- Enforces token budget limits by truncating lower-priority sections
- Provides rendering previews for debugging

### 7.2 Prompt Compilation

For complex prompt chains, implement a "compilation" step that:
- Resolves all template variables
- Validates the complete prompt against the model's context window
- Optimizes token usage by removing unnecessary whitespace and redundancy
- Produces a deterministic prompt hash for caching and reproducibility

### 7.3 Caching Strategies

Cache prompt results at multiple levels:
- **Exact Match Cache**: Cache responses for identical prompts. High hit rate for repeated queries.
- **Semantic Cache**: Cache responses for semantically similar prompts using embedding similarity. Lower precision but higher hit rate.
- **Partial Cache**: Cache intermediate results in prompt chains. If only the final step's input changes, reuse cached results from earlier steps.

---

## 8. Organizational Prompt Governance

### 8.1 Prompt Review Process

Establish a prompt review process analogous to code review:
- All prompt changes require review by at least one domain expert
- Review checklist: accuracy, safety, format compliance, edge case handling, token efficiency
- Automated checks: regression test pass, evaluation score threshold, prompt injection resistance

### 8.2 Shared Prompt Libraries

Maintain organization-wide prompt libraries for common patterns:
- Standard system prompts for each application category
- Vetted few-shot example sets for common tasks
- Approved safety and compliance instructions
- Reusable prompt components (output format specs, error handling blocks)

### 8.3 Documentation Standards

Each production prompt should be documented with:
- Purpose and intended use case
- Input requirements and constraints
- Expected output format and examples
- Known limitations and failure modes
- Performance characteristics (accuracy, latency, cost)
- Change history and rationale for current design

---

## 9. Key References

- Perez et al. (2021) -- "True Few-Shot Learning with Language Models"
- Zhou et al. (2023) -- "Large Language Models are Human-Level Prompt Engineers"
- Zheng et al. (2023) -- "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
- Gao et al. (2023) -- "ARES: An Automated Evaluation Framework for RAG Systems"
- Chen et al. (2023) -- "PromptBench: A Unified Library for Prompt Evaluation"

---

*This module completes the prompt engineering sequence. Apply these optimization practices to prompts designed using `prompt_design.md` and `advanced_prompting.md`.*

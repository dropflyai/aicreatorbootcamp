# Evaluation: Measuring Fine-Tuned Model Performance

## Overview

Evaluation is the most consequential step in the fine-tuning pipeline. Without rigorous evaluation, you cannot distinguish a model that has genuinely learned the target behavior from one that has memorized training examples or learned superficial shortcuts. This module covers standard benchmarks, human evaluation protocols, LLM-as-judge methodology, domain-specific evaluation design, and red teaming for safety assessment.

---

## 1. Evaluation Philosophy

### 1.1 What to Evaluate

Fine-tuned models must be evaluated on multiple dimensions simultaneously:

**Task Performance**: Does the model perform the target task correctly? This is the primary objective and should be measured with task-specific metrics.

**General Capability Retention**: Has the model retained its general capabilities (reasoning, language understanding, instruction following)? Fine-tuning can inadvertently degrade capabilities outside the training distribution.

**Safety and Alignment**: Has fine-tuning introduced new failure modes? Has it weakened existing safety behaviors? Has it introduced biases present in the training data?

**Robustness**: Does the model perform consistently across input variations, or has it become brittle to inputs that differ from the training distribution?

### 1.2 Evaluation Set Design Principles

**Independence**: Evaluation data must be completely separate from training data. No overlap in examples, and preferably no overlap in data sources or annotators.

**Representativeness**: The evaluation set must represent the distribution of real-world inputs the model will encounter, including common cases and edge cases.

**Difficulty Distribution**: Include easy, medium, and hard examples. A model that only passes easy tests may fail in production on hard cases.

**Adversarial Examples**: Include inputs specifically designed to test failure modes identified during development.

---

## 2. Standard Benchmarks

### 2.1 MMLU (Massive Multitask Language Understanding)

**What It Measures**: Broad academic knowledge across 57 subjects spanning STEM, humanities, social sciences, and professional domains (law, medicine, accounting).

**Format**: Multiple-choice questions at varying difficulty levels (elementary through professional).

**Scoring**: Accuracy per subject and aggregate. Compare fine-tuned model to base model to detect capability regression.

**Interpretation**: A significant drop in MMLU after fine-tuning indicates catastrophic forgetting of general knowledge. A drop of more than 5% warrants investigation.

### 2.2 HumanEval

**What It Measures**: Code generation capability. The model must generate Python functions that pass test cases.

**Format**: 164 programming problems with function signatures, docstrings, and test cases.

**Scoring**: pass@k -- the probability that at least one of k generated solutions passes all test cases. pass@1 is the most stringent metric.

**Interpretation**: Relevant for models that need to maintain coding ability after fine-tuning on non-code tasks.

### 2.3 GSM8K (Grade School Math)

**What It Measures**: Mathematical reasoning through multi-step word problems requiring arithmetic and basic algebra.

**Format**: 1,319 test problems requiring 2-8 step solutions.

**Scoring**: Exact match on the final numerical answer.

**Interpretation**: Tests whether fine-tuning has affected the model's reasoning chain capability.

### 2.4 TruthfulQA

**What It Measures**: The model's tendency to generate truthful answers rather than common misconceptions or plausible-sounding falsehoods.

**Format**: 817 questions designed to elicit incorrect answers from language models (questions where popular misconceptions exist).

**Scoring**: Truthfulness score (how often the model's answer is true) and informativeness score (how often the answer provides useful information).

**Interpretation**: A decrease in truthfulness after fine-tuning suggests the training data may have introduced or reinforced incorrect information.

### 2.5 MT-Bench

**What It Measures**: Multi-turn conversation quality across 8 categories: writing, roleplay, reasoning, math, coding, extraction, STEM, and humanities.

**Format**: 80 multi-turn questions. An LLM judge (typically GPT-4) scores responses on a 1-10 scale.

**Scoring**: Average score across categories. Compare to base model and leading models.

**Interpretation**: Tests whether fine-tuning has affected conversational ability and instruction following.

---

## 3. Human Evaluation

### 3.1 When Human Evaluation Is Necessary

Human evaluation is the gold standard for measuring:
- Nuanced quality dimensions (helpfulness, naturalness, appropriateness)
- Subjective quality in creative or open-ended tasks
- Safety and alignment properties that automated metrics miss
- Domain-specific quality that requires expert knowledge

### 3.2 Evaluation Protocol Design

**Comparative Evaluation (A/B Testing)**: Present evaluators with outputs from two models (base and fine-tuned) for the same input. Ask them to select the preferred output. This is more reliable than absolute scoring because it eliminates individual rater scale biases.

**Absolute Scoring with Rubrics**: Define a detailed rubric with explicit descriptions for each score level. Train evaluators on the rubric with calibration examples before production evaluation.

**Elo Rating**: Present pairs of outputs from multiple models and have evaluators select preferences. Compute Elo ratings that reflect relative quality across all models. This scales well to comparing many model variants.

### 3.3 Evaluator Selection and Training

**Domain Experts vs. General Evaluators**: Use domain experts for tasks requiring specialized knowledge (medical, legal, technical). Use general evaluators for broad quality assessment (helpfulness, clarity, naturalness).

**Calibration Protocol**:
1. Present evaluators with 10 pre-scored examples
2. Have them score independently
3. Compare their scores to the reference scores
4. Discuss discrepancies and clarify the rubric
5. Repeat until inter-annotator agreement exceeds 80%

### 3.4 Statistical Requirements

**Sample Size**: For paired comparisons with 90% power to detect a 10% improvement:
- 2-category comparison (better/worse): ~200 evaluations
- 5-point scale: ~100 evaluations per condition
- Multiple categories: Scale by number of categories

**Annotator Count**: Minimum 3 annotators per example. Use majority vote or Bayesian aggregation to combine annotations.

---

## 4. LLM-as-Judge

### 4.1 Methodology

Use a capable LLM (typically Claude Opus or GPT-4) to evaluate model outputs against a rubric. This scales better than human evaluation while capturing nuanced quality dimensions.

### 4.2 Judge Prompt Design

```
You are evaluating the quality of an AI assistant's response.

## Input
{user query}

## Response to Evaluate
{model output}

## Evaluation Criteria
Rate the response on the following dimensions (1-5 scale):

1. Accuracy: Are all factual claims correct?
   - 5: All facts verified and correct
   - 3: Mostly correct with minor inaccuracies
   - 1: Contains significant factual errors

2. Completeness: Does the response fully address the query?
   - 5: Comprehensive, all aspects addressed
   - 3: Main points covered, some gaps
   - 1: Major aspects missing

3. Clarity: Is the response clear and well-organized?
   - 5: Exceptionally clear and well-structured
   - 3: Adequately clear, some organization issues
   - 1: Confusing, poorly organized

Provide your scores as JSON: {"accuracy": N, "completeness": N, "clarity": N}
Explain your reasoning for each score before providing the JSON.
```

### 4.3 Known Biases

LLM judges exhibit systematic biases that must be controlled:

**Verbosity Bias**: LLM judges prefer longer responses regardless of quality. Mitigate by normalizing for length in the scoring rubric.

**Self-Preference Bias**: LLM judges prefer outputs that match their own style. Mitigate by using a different model family as the judge than the model being evaluated.

**Position Bias**: In comparative evaluations, LLM judges prefer the first or last response presented. Mitigate by randomizing presentation order and averaging across orderings.

**Sycophancy**: LLM judges may rate responses more favorably when they include hedging, caveats, and expressions of uncertainty. Mitigate by explicitly penalizing unnecessary hedging in the rubric.

### 4.4 Calibration

Validate LLM judge reliability by computing agreement with human evaluators:
- Evaluate 100+ examples with both human and LLM judges
- Compute correlation (Pearson or Spearman) between human and LLM scores
- If correlation < 0.75, refine the judge prompt or switch to human evaluation
- Compute per-dimension correlations to identify which dimensions the LLM judges poorly

---

## 5. Domain-Specific Evaluation

### 5.1 Designing Domain Evaluations

For specialized fine-tuning tasks, standard benchmarks are insufficient. Design custom evaluations that directly measure the target behavior:

**Step 1**: Define 5-10 evaluation dimensions specific to your domain
**Step 2**: Create a rubric with explicit scoring criteria for each dimension
**Step 3**: Generate 50-200 evaluation examples covering the full input distribution
**Step 4**: Establish baseline performance (base model, existing system, human expert)
**Step 5**: Implement both automated metrics and human evaluation for each dimension

### 5.2 Example: Medical Coding Evaluation

| Dimension | Metric | Measurement |
|-----------|--------|-------------|
| Code Accuracy | Exact match with expert codes | Automated comparison |
| Code Completeness | All applicable codes identified | Expert review |
| Specificity | Most specific code selected | Automated hierarchy check |
| Sequencing | Primary diagnosis correctly identified | Expert review |
| Supporting Evidence | Correct clinical evidence cited | LLM-as-judge |

### 5.3 Evaluation-Driven Development

Use evaluation results to guide data collection and training iteration:
1. Run evaluation to identify weakest performance areas
2. Collect additional training data for those areas
3. Re-train and re-evaluate
4. Repeat until all dimensions meet target thresholds

---

## 6. Red Teaming

### 6.1 Purpose

Red teaming probes the fine-tuned model for safety failures, alignment degradation, and exploitable behaviors introduced by fine-tuning. It answers: "What new ways can this model fail that the base model could not?"

### 6.2 Red Team Scope

**Alignment Regression**: Test whether fine-tuning has weakened the model's safety behaviors. Can the fine-tuned model be more easily convinced to produce harmful content than the base model?

**Training Data Leakage**: Can the model be prompted to reproduce verbatim training examples? This tests for memorization and potential privacy violations.

**Distribution Shift Exploitation**: Does the model behave unpredictably on inputs that differ from the training distribution? Test with out-of-distribution inputs.

**Jailbreak Sensitivity**: Test known jailbreak techniques against the fine-tuned model. Fine-tuning can inadvertently weaken jailbreak resistance.

### 6.3 Red Team Methodology

1. **Automated Scanning**: Run the model against a bank of known adversarial prompts
2. **Expert Red Teaming**: Domain experts attempt to elicit harmful or incorrect outputs
3. **Behavioral Differential**: Compare base model and fine-tuned model responses to the same adversarial inputs to identify regression
4. **Stress Testing**: Test with extremely long inputs, inputs in unexpected formats, repeated instructions, and multi-turn manipulation attempts

### 6.4 Red Team Findings Documentation

Document each finding with:
- The adversarial input that triggered the failure
- The model's response
- The expected (safe) response
- Severity classification (critical, high, medium, low)
- Recommended remediation (additional training data, safety filtering, prompt modification)

---

## 7. Evaluation Reporting

### 7.1 Model Card Template

Every fine-tuned model should have a model card documenting:
- Base model and fine-tuning method
- Training data summary (size, source, domain)
- Intended use case and limitations
- Benchmark results (standard + domain-specific)
- Red team findings and mitigations
- Known failure modes

### 7.2 Comparison Dashboard

Maintain a comparison dashboard showing:
- Fine-tuned model vs. base model across all metrics
- Fine-tuned model vs. previous fine-tuned versions
- Performance by input category (to identify strengths and weaknesses)
- Cost-quality tradeoff analysis

---

## 8. Key References

- Hendrycks et al. (2021) -- "Measuring Massive Multitask Language Understanding" (MMLU)
- Chen et al. (2021) -- "Evaluating Large Language Models Trained on Code" (HumanEval)
- Zheng et al. (2023) -- "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
- Perez et al. (2022) -- "Red Teaming Language Models with Language Models"
- Lin et al. (2022) -- "TruthfulQA: Measuring How Models Mimic Human Falsehoods"

---

*This module covers evaluation of fine-tuned models. See `fine_tuning_methods.md` for training approaches and `data_preparation.md` for data curation.*

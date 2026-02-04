# Prompt Design: Foundations of Effective LLM Communication

## Overview

Prompt design is the discipline of crafting inputs to large language models that reliably produce desired outputs. This module covers the theoretical foundations, core techniques, and systematic approaches to designing prompts that are robust, reproducible, and aligned with application requirements.

---

## 1. System Prompt Architecture

### 1.1 Role and Purpose

The system prompt establishes the model's behavioral contract for an entire conversation. It defines identity, constraints, output format, and domain boundaries. A well-engineered system prompt functions as a constitution -- it governs all subsequent interactions without requiring re-specification.

### 1.2 Structural Components

A production system prompt should include these sections in order:

**Identity Block**: Who the model is, what domain it operates in, and the scope of its authority. Specificity matters -- "You are a senior tax accountant specializing in US corporate tax law for companies with $10M-$500M revenue" outperforms "You are a helpful assistant."

**Behavioral Constraints**: Explicit rules about what the model should and should not do. Frame constraints as affirmative instructions rather than negations when possible. "Always cite the specific tax code section" is more reliable than "Don't give answers without citations."

**Output Format Specification**: Define the exact structure of responses. Include field names, data types, ordering, and delimiter choices. When using structured output, provide a complete schema rather than examples alone.

**Error Handling Instructions**: What the model should do when it lacks information, encounters ambiguity, or cannot fulfill the request within its constraints. This prevents hallucination by giving the model a sanctioned escape path.

**Interaction Protocol**: Rules about follow-up questions, clarification requests, and conversation management. Specify whether the model should ask for clarification or make reasonable assumptions.

### 1.3 System Prompt Anti-Patterns

- **Overloading**: Stuffing too many unrelated instructions degrades adherence to all of them
- **Contradiction**: Instructions that conflict cause unpredictable behavior
- **Vagueness**: "Be helpful" provides no actionable constraint
- **Over-constraining**: Leaving no room for the model to reason reduces quality

---

## 2. Zero-Shot Prompting

### 2.1 Definition and Mechanism

Zero-shot prompting provides the model with a task description and input without any demonstration examples. The model relies entirely on its pre-training knowledge and instruction tuning to produce the correct output format and reasoning.

### 2.2 When to Use Zero-Shot

Zero-shot works best when: the task is well-defined by natural language description, the model has strong pre-training coverage of the domain, output format is simple or well-known (classification, summarization), and token budget is constrained.

### 2.3 Effective Zero-Shot Patterns

**Direct Instruction**: "Classify the following customer support ticket into one of these categories: billing, technical, account, feature-request."

**Role-Primed Instruction**: "As an experienced radiologist, analyze the following report findings and identify any abnormalities that require follow-up."

**Format-Specified Instruction**: "Extract the following fields from the invoice text and return them as JSON: vendor_name, invoice_number, total_amount, due_date."

### 2.4 Limitations

Zero-shot prompts fail when the task requires a novel output format the model has not seen during training, when the domain is highly specialized with non-obvious conventions, or when the task definition itself is ambiguous without examples.

---

## 3. Few-Shot Prompting

### 3.1 In-Context Learning Theory

Few-shot prompting leverages in-context learning (ICL), where the model infers the task from provided examples without any parameter updates. Research (Brown et al., 2020) demonstrates that ICL quality scales with model size and example quality rather than example quantity.

### 3.2 Example Selection Strategies

**Diversity-Maximizing**: Select examples that cover the full range of expected inputs, including edge cases. Three diverse examples outperform ten similar ones.

**Difficulty-Graduated**: Order examples from simple to complex. This mirrors curriculum learning and helps the model build up to harder cases.

**Boundary-Illustrating**: Include examples that sit at decision boundaries. For classification, include examples where the correct category might be confused with another.

### 3.3 Example Count Optimization

The optimal number of examples follows a diminishing returns curve. For most tasks, 3-5 well-chosen examples capture 90%+ of the performance gains. Beyond 8-10 examples, additional demonstrations consume token budget without meaningful improvement and may introduce spurious patterns.

### 3.4 Example Formatting

Consistency in format between examples and the target query is critical. Use identical delimiters, field ordering, and formatting. Inconsistency between examples and the actual query is the most common source of few-shot failures.

---

## 4. Chain-of-Thought (CoT) Prompting

### 4.1 Mechanism and Theory

Chain-of-thought prompting (Wei et al., 2022) instructs the model to produce intermediate reasoning steps before the final answer. This decomposes complex reasoning into manageable sub-problems and allows the model to allocate compute to each step.

### 4.2 Zero-Shot CoT

Adding "Let's think step by step" to a prompt triggers reasoning chain generation without requiring demonstration examples. This simple addition improves performance on arithmetic, logic, and multi-step reasoning tasks by 40-70% on average.

### 4.3 Manual CoT

Providing explicit reasoning chains in few-shot examples teaches the model the expected granularity and structure of reasoning. The quality of the demonstrated reasoning matters more than the final answer -- a correct answer with flawed reasoning can teach the model to produce plausible-sounding but incorrect chains.

### 4.4 Structured CoT Patterns

**Problem Decomposition CoT**: "First, identify the key variables. Second, determine the relationships between them. Third, apply the relevant formula. Fourth, verify the result."

**Verification CoT**: After producing an answer, instruct the model to verify it: "Now check your answer by working backwards from the result."

**Comparative CoT**: For decisions, instruct the model to evaluate each option against explicit criteria before selecting.

---

## 5. Tree-of-Thought (ToT) Prompting

### 5.1 Conceptual Framework

Tree-of-thought (Yao et al., 2023) extends chain-of-thought from a single linear reasoning path to a branching exploration of multiple reasoning paths. The model generates several possible next steps, evaluates each, and pursues the most promising branches.

### 5.2 Implementation Approaches

**Single-Prompt ToT**: Within a single prompt, instruct the model to generate multiple hypotheses, evaluate each, and select the best. This works for problems with 2-4 branches.

**Multi-Turn ToT**: Use orchestration code to manage the tree. Generate candidate next steps, score them with the model, prune low-scoring branches, and continue expanding promising ones. This supports deeper trees with more branches.

### 5.3 Evaluation Functions

Each node in the tree requires an evaluation function to determine whether to expand or prune. Options include:
- **Self-evaluation**: Ask the model to rate the promise of each partial solution (1-10)
- **Verification**: Ask the model if the partial solution is consistent and could lead to a valid answer
- **Comparison**: Present multiple candidates and ask the model to rank them

### 5.4 Use Cases

ToT excels at creative generation, planning problems, puzzle solving, and any task where the first approach may not be optimal and backtracking is valuable.

---

## 6. Structured Output Design

### 6.1 JSON Output Engineering

When designing prompts for JSON output, provide the complete schema including field descriptions, data types, and constraints. Use the model's structured output mode (e.g., Anthropic's tool use, OpenAI's JSON mode) when available -- these constrain the output at the token generation level, eliminating format errors.

### 6.2 Schema Design Principles

**Flat Over Nested**: Deeply nested JSON structures increase error rates. Flatten where possible.

**Enums Over Free Text**: For categorical fields, specify allowed values explicitly.

**Required vs Optional**: Mark fields as required or optional and specify default values for optional fields.

**Description Fields**: Include human-readable descriptions for each field to guide the model's understanding.

### 6.3 Output Validation Pipeline

Never trust model output without validation. Implement a pipeline:
1. Parse the output (handle malformed JSON gracefully)
2. Validate against the schema (type checking, required fields)
3. Apply business logic validation (ranges, cross-field consistency)
4. Handle failures (retry with error feedback, fallback to simpler format)

### 6.4 Markdown and Structured Text

For human-readable structured output, define heading hierarchies, list formats, and section ordering. Provide a template showing the exact structure expected. Models are more consistent with markdown structure when given a template rather than a description.

---

## 7. Prompt Composition Patterns

### 7.1 Instruction-Input-Output Pattern

The most fundamental pattern: clearly separate the instruction (what to do), the input (the data to process), and the output specification (what to produce). Use explicit delimiters:

```
## Instruction
{task description}

## Input
{data to process}

## Output Format
{expected structure}
```

### 7.2 Persona-Context-Task Pattern

Establish who the model is, provide relevant context, then specify the task. This pattern works well for domain-specific applications where the model needs to adopt expert-level reasoning.

### 7.3 Constraint-First Pattern

Lead with constraints before the task. Models attend more strongly to information at the beginning and end of prompts. Placing critical constraints first ensures they are weighted heavily in generation.

---

## 8. Common Failure Modes

### 8.1 Prompt Injection Sensitivity

Prompts that process user-supplied text must be designed defensively. Use clear delimiters between instructions and user content. Never allow user content to appear before system instructions in the prompt.

### 8.2 Context Window Saturation

As the prompt approaches the context window limit, the model's attention to instructions degrades. Monitor the ratio of instruction tokens to content tokens and keep instructions concise.

### 8.3 Ambiguity-Induced Hallucination

When a prompt is ambiguous, the model will resolve the ambiguity silently, often incorrectly. Explicitly address potential ambiguities in the prompt or instruct the model to ask for clarification.

### 8.4 Format Drift

Over long conversations, the model's adherence to output format specifications degrades. Periodically reinforce format requirements or use structured output modes.

---

## 9. Evaluation Criteria for Prompt Quality

| Criterion | Description | Measurement |
|-----------|-------------|-------------|
| Reliability | Same input produces consistent outputs | Run 10x, measure variance |
| Accuracy | Output matches ground truth | Compare to labeled data |
| Format Compliance | Output matches specified structure | Schema validation pass rate |
| Robustness | Performance across input variations | Test with edge cases |
| Efficiency | Token usage relative to output quality | Quality per token spent |
| Maintainability | How easily the prompt can be updated | Complexity assessment |

---

## 10. Key References

- Brown et al. (2020) -- "Language Models are Few-Shot Learners" (GPT-3 paper, ICL)
- Wei et al. (2022) -- "Chain-of-Thought Prompting Elicits Reasoning in LLMs"
- Yao et al. (2023) -- "Tree of Thoughts: Deliberate Problem Solving with LLMs"
- Zhou et al. (2023) -- "Large Language Models are Human-Level Prompt Engineers" (APE)
- Kojima et al. (2022) -- "Large Language Models are Zero-Shot Reasoners"

---

*This module provides the foundation for prompt design. See `advanced_prompting.md` for research-frontier techniques and `prompt_optimization.md` for systematic testing and iteration.*

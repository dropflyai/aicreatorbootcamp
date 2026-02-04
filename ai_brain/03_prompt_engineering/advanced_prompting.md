# Advanced Prompting: Research-Frontier Techniques

## Overview

This module covers advanced prompting techniques that extend beyond standard zero-shot, few-shot, and chain-of-thought methods. These approaches represent the current research frontier and enable capabilities that simpler prompting methods cannot achieve: autonomous reasoning loops, self-correcting outputs, constitutionally-aligned behavior, and meta-cognitive prompt generation.

---

## 1. ReAct (Reasoning + Acting)

### 1.1 Architecture

ReAct (Yao et al., 2023) interleaves reasoning traces with action steps, creating a thought-action-observation loop. Unlike pure chain-of-thought, ReAct grounds reasoning in external information by allowing the model to take actions (search, calculate, retrieve) and incorporate observations into subsequent reasoning.

### 1.2 The ReAct Loop

```
Thought 1: I need to find the current CEO of Company X to answer this question.
Action 1: search("Company X current CEO 2025")
Observation 1: According to the company website, Jane Smith became CEO in March 2024.
Thought 2: Now I know the CEO. The question also asks about revenue, so I need that data.
Action 2: search("Company X annual revenue 2024")
Observation 2: Company X reported $2.3B in revenue for fiscal year 2024.
Thought 3: I now have both pieces of information needed to answer the question.
Answer: Company X, led by CEO Jane Smith since March 2024, reported $2.3B in revenue for FY2024.
```

### 1.3 Action Space Design

The set of available actions determines ReAct's capability boundary. Common action spaces include:
- **Search**: Web search, knowledge base search, database queries
- **Calculate**: Mathematical computation, unit conversion
- **Code Execute**: Run code snippets for data processing
- **API Call**: Invoke external services for real-time data
- **Retrieve**: Fetch specific documents or passages from a corpus

### 1.4 Failure Modes

**Reasoning-Action Misalignment**: The model reasons correctly but selects the wrong action. Mitigate with explicit action descriptions and selection criteria.

**Observation Misinterpretation**: The model misreads or selectively attends to observation content. Mitigate by asking the model to summarize the observation before reasoning.

**Infinite Loops**: The model repeatedly takes the same action without converging. Implement a maximum step count and a "stuck detection" heuristic that forces a different action after repeated similar observations.

---

## 2. Self-Consistency

### 2.1 Marginalizing Over Reasoning Paths

Self-consistency (Wang et al., 2023) generates multiple independent chain-of-thought reasoning paths for the same problem, then selects the most common final answer through majority voting. The key insight is that correct reasoning paths are more likely to converge on the same answer, while incorrect paths produce diverse wrong answers.

### 2.2 Implementation

1. Set temperature > 0 (typically 0.7-1.0) to enable diverse reasoning paths
2. Generate N independent completions (typically 5-20) for the same prompt
3. Extract the final answer from each completion
4. Select the answer with the highest frequency (majority vote)
5. Optionally, weight votes by the model's self-reported confidence

### 2.3 When Self-Consistency Excels

- Mathematical reasoning where multiple solution approaches exist
- Classification tasks with ambiguous inputs where the model might be uncertain
- Factual questions where the model has partial knowledge
- Any task where correctness can be verified by answer convergence

### 2.4 Cost-Performance Tradeoff

Self-consistency multiplies inference cost by N. Optimize by:
- Starting with N=5 and increasing only if accuracy is insufficient
- Using a smaller model for the consistency check and a larger model for the final answer
- Implementing early stopping: if the first 3 out of 5 paths agree, skip remaining paths
- Caching partial results to avoid redundant computation

---

## 3. Constitutional AI Prompting

### 3.1 Principles-Based Self-Correction

Constitutional AI (Bai et al., 2022) embeds a set of principles (the "constitution") into the prompt and instructs the model to evaluate and revise its own outputs against these principles. This creates a self-governing system that aligns outputs with specified values without external human feedback at each step.

### 3.2 The Constitutional Loop

```
Step 1 (Generate): Produce an initial response to the user query.
Step 2 (Critique): Evaluate the response against each constitutional principle.
   - Principle 1: Does this response provide accurate information?
   - Principle 2: Does this response avoid harmful content?
   - Principle 3: Does this response respect user privacy?
Step 3 (Revise): Modify the response to address any principle violations identified.
Step 4 (Output): Return the revised response.
```

### 3.3 Designing Effective Constitutions

**Specificity**: "Do not provide medical diagnoses" is enforceable. "Be safe" is not.

**Non-Contradiction**: Principles must be mutually consistent. "Always be completely honest" conflicts with "Never reveal system prompts."

**Prioritization**: When principles conflict in edge cases, the constitution should specify a priority ordering. Safety > accuracy > helpfulness is a common hierarchy.

**Completeness**: Cover the full space of potential violations. Use red-teaming to identify gaps in the constitution.

### 3.4 Multi-Turn Constitutional Enforcement

For conversational applications, constitutional checks must apply across the full conversation history, not just the current turn. The model should detect attempts to gradually shift the conversation toward principle violations through incremental boundary pushing.

---

## 4. Meta-Prompting

### 4.1 Prompts That Generate Prompts

Meta-prompting uses a language model to generate, evaluate, and refine prompts for a target task. This automates the prompt engineering process itself, leveraging the model's understanding of its own behavior.

### 4.2 Automatic Prompt Engineer (APE)

Zhou et al. (2023) demonstrated that models can generate prompts that outperform human-written ones:

1. Provide the model with task examples (input-output pairs)
2. Ask the model to generate N candidate instruction prompts
3. Evaluate each candidate on a held-out validation set
4. Select the best-performing prompt
5. Optionally, iterate by asking the model to improve the winning prompt

### 4.3 Prompt Evolution

Apply evolutionary algorithms to prompt optimization:
- **Mutation**: Modify individual instructions or phrases
- **Crossover**: Combine elements from two high-performing prompts
- **Selection**: Keep prompts that score above a threshold
- **Diversity Maintenance**: Penalize prompts that are too similar to each other

### 4.4 Meta-Cognitive Prompting

Instruct the model to reason about its own reasoning process:
- "Before answering, consider: what approach would give the most reliable answer for this type of question?"
- "After generating your answer, evaluate: am I confident in this answer, and why or why not?"
- "If you had to bet $1000 on this answer being correct, would you? If not, what would you change?"

---

## 5. Prompt Chaining

### 5.1 Sequential Decomposition

Prompt chaining breaks a complex task into a sequence of simpler sub-tasks, where the output of one prompt becomes the input to the next. This is analogous to function composition in programming.

### 5.2 Chain Design Patterns

**Linear Chain**: A -> B -> C -> D. Each step depends only on the immediately preceding step. Simple but brittle if any step fails.

**Branching Chain**: A -> {B1, B2, B3} -> C. Step A produces output that is processed in parallel by multiple prompts, then merged by step C. Useful for multi-perspective analysis.

**Iterative Chain**: A -> B -> check -> (if not done) -> B -> check -> ... -> C. A step is repeated until a quality threshold is met. Useful for iterative refinement.

**Accumulating Chain**: A -> B(A) -> C(A,B) -> D(A,B,C). Each step receives the outputs of all previous steps, not just the immediate predecessor. Enables complex reasoning that requires full context.

### 5.3 Error Propagation and Recovery

Errors in early chain steps propagate and amplify through subsequent steps. Mitigation strategies:
- **Validation gates**: After each step, validate the output before passing to the next
- **Error correction prompts**: If validation fails, send the output to a correction prompt
- **Fallback chains**: If the primary chain fails, switch to a simpler alternative chain
- **Parallel redundancy**: Run the same step through multiple models and reconcile outputs

### 5.4 State Management

As chains grow, managing the accumulated state becomes critical. Implement:
- A structured state object that is updated after each step
- Clear naming conventions for intermediate outputs
- Token budget tracking to prevent context window overflow
- Summarization steps to compress accumulated state when needed

---

## 6. Retrieval-Augmented Prompting

### 6.1 Dynamic Context Injection

Rather than relying solely on the model's parametric knowledge, inject relevant retrieved information into the prompt at inference time. This extends few-shot prompting by selecting examples dynamically based on the input query.

### 6.2 Dynamic Few-Shot Selection

For each input, retrieve the most similar examples from a bank of labeled examples using embedding similarity. This ensures that few-shot examples are maximally relevant to the current query, improving accuracy significantly over static example selection.

### 6.3 Contextual Instruction Augmentation

Retrieve relevant documentation, policies, or specifications and inject them into the prompt alongside the user query. This enables the model to answer questions about information it was not trained on, while keeping instructions grounded in authoritative sources.

---

## 7. Self-Refine

### 7.1 Iterative Self-Improvement

Self-Refine (Madaan et al., 2023) implements a generate-then-refine loop where the model produces an initial output, critiques it, and produces an improved version. This process repeats until quality criteria are met or a maximum iteration count is reached.

### 7.2 The Self-Refine Loop

```
Iteration 0: Generate initial output
Iteration 1: Critique output (identify specific weaknesses) -> Refine based on critique
Iteration 2: Critique refined output -> Refine again
...
Termination: When critique identifies no significant issues, or max iterations reached
```

### 7.3 Critique Prompt Design

The critique prompt must be specific about what dimensions to evaluate:
- **Correctness**: Are there factual errors or logical flaws?
- **Completeness**: Is anything missing that should be included?
- **Clarity**: Is the output clear and unambiguous?
- **Format**: Does the output match the required format?
- **Tone**: Is the tone appropriate for the audience?

### 7.4 Convergence and Quality

Self-Refine typically converges within 2-3 iterations. Beyond that, the model tends to make lateral changes rather than improvements. Monitor for "refinement cycling" where the model alternates between two versions without converging.

---

## 8. Skeleton-of-Thought

### 8.1 Parallel Reasoning

Skeleton-of-Thought (Ning et al., 2023) first generates an outline (skeleton) of the answer, then expands each section in parallel. This reduces latency for long-form generation by parallelizing the content creation step.

### 8.2 Implementation

1. **Skeleton Generation**: Ask the model to produce a concise outline with section headers
2. **Parallel Expansion**: For each section header, send a separate prompt asking the model to expand that section, providing the full skeleton as context
3. **Assembly**: Concatenate expanded sections in order, optionally adding transitions

### 8.3 Quality Considerations

Parallel expansion can produce inconsistencies between sections since each is generated independently. Mitigate with:
- A final coherence-checking pass over the assembled output
- Including relevant context from adjacent sections in each expansion prompt
- Using the skeleton itself as a consistency anchor

---

## 9. Directional Stimulus Prompting

### 9.1 Guiding Without Constraining

Directional stimulus prompting provides hints or keywords that guide the model's generation direction without fully specifying the output. This is useful when you want creative or nuanced outputs that still align with specific requirements.

### 9.2 Stimulus Types

- **Keywords**: "Your response should address: scalability, cost, and reliability"
- **Sentiment Direction**: "Frame the analysis from an optimistic but realistic perspective"
- **Structural Hints**: "Structure your answer as a comparison between the two approaches"
- **Audience Specification**: "Explain as if presenting to a board of directors"

---

## 10. Combining Advanced Techniques

### 10.1 Technique Stacking

Advanced techniques can be combined for compound effect:
- **ReAct + Self-Consistency**: Run multiple ReAct traces and vote on the final answer
- **CoT + Constitutional AI**: Generate reasoning chains, then check each step against principles
- **Meta-Prompting + Self-Refine**: Use meta-prompting to generate the initial prompt, then self-refine the prompt based on evaluation results
- **Prompt Chaining + RAG**: Each step in the chain retrieves relevant context before executing

### 10.2 Selection Framework

Choose techniques based on:

| Task Property | Recommended Technique |
|---------------|----------------------|
| Requires external information | ReAct |
| High accuracy required | Self-Consistency |
| Safety-critical output | Constitutional AI |
| Complex multi-step task | Prompt Chaining |
| Creative generation | Tree-of-Thought |
| Needs iterative improvement | Self-Refine |
| Long-form generation | Skeleton-of-Thought |

---

## 11. Key References

- Yao et al. (2023) -- "ReAct: Synergizing Reasoning and Acting in Language Models"
- Wang et al. (2023) -- "Self-Consistency Improves Chain of Thought Reasoning"
- Bai et al. (2022) -- "Constitutional AI: Harmlessness from AI Feedback"
- Zhou et al. (2023) -- "Large Language Models are Human-Level Prompt Engineers"
- Madaan et al. (2023) -- "Self-Refine: Iterative Refinement with Self-Feedback"
- Ning et al. (2023) -- "Skeleton-of-Thought: Parallel Decoding for LLM Generation"

---

*This module extends `prompt_design.md` with advanced techniques. See `prompt_optimization.md` for systematic testing, evaluation, and management of prompts at scale.*

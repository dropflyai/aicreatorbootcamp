# LLM Capabilities

> Reference: Brown et al. "Language Models are Few-Shot Learners" (2020); Wei et al. "Chain-of-Thought Prompting" (2022); Anthropic research on in-context learning

---

## 1. In-Context Learning (ICL)

### Definition

In-context learning is the ability of LLMs to learn new tasks from examples provided in the prompt, without any gradient updates or parameter changes. The model conditions on the examples and generalizes to new inputs within the same context window.

```
Prompt:
  Translate English to French:
  sea otter => loutre de mer
  peppermint => menthe poivree
  plush giraffe => girafe en peluche
  cheese =>

Output: fromage
```

No training occurred. The model "learned" the task from the pattern of examples in the prompt.

### Theoretical Explanations

The mechanism of ICL is an active research area. Leading hypotheses:

**Induction Heads** (Olsson et al., 2022, Anthropic)
- Specific attention head circuits that implement pattern matching
- Two-head motif: Head 1 identifies previous occurrences of the current token, Head 2 copies the token that followed
- This circuit generalizes: it can match abstract patterns, not just exact tokens
- Induction heads form during a "phase change" in training and are a necessary mechanism for ICL

**Implicit Bayesian Inference** (Xie et al., 2021)
- The pretrained LLM has learned a distribution over tasks from the pretraining data
- ICL examples narrow the posterior over which "task" the model should perform
- More examples reduce uncertainty about the intended task

**Task Vectors** (Hendel et al., 2023)
- ICL examples cause the model to form internal "task vectors" in activation space
- These vectors encode the function to be applied, separate from the content
- Evidence: you can extract and transplant task vectors between contexts

### Practical Implications

1. **Example quality matters more than quantity**: 3-5 high-quality, diverse examples often outperform 20 mediocre ones
2. **Example ordering matters**: Place the most representative example last (recency bias in attention)
3. **Label space must be explicit**: The model infers the output format from examples; ambiguous formats degrade performance
4. **ICL degrades with task complexity**: Multi-step reasoning tasks benefit more from chain-of-thought than from more examples

---

## 2. Chain-of-Thought Reasoning

### Standard Chain-of-Thought (Wei et al., 2022)

Prompting the model to produce intermediate reasoning steps before the final answer dramatically improves performance on reasoning tasks.

**Without CoT:**
```
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls.
   Each can has 3 tennis balls. How many tennis balls does he have now?
A: 11
```

**With CoT:**
```
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls.
   Each can has 3 tennis balls. How many tennis balls does he have now?
A: Roger started with 5 balls. 2 cans of 3 tennis balls each is 6.
   5 + 6 = 11. The answer is 11.
```

### Why CoT Works

1. **Decomposition**: Breaking a complex problem into subproblems, each within the model's capability
2. **Working memory**: The generated tokens serve as external working memory, offloading intermediate results from the model's limited internal computation
3. **Error localization**: When reasoning is explicit, errors can be identified and corrected at specific steps
4. **Training distribution**: The pretraining data contains many examples of step-by-step reasoning (textbooks, Stack Overflow, etc.)

### Zero-Shot CoT (Kojima et al., 2022)

Simply adding "Let's think step by step" to the prompt triggers chain-of-thought reasoning without providing examples:

```
Q: [complex question]
A: Let's think step by step.
```

This works because the instruction activates the model's latent reasoning capabilities learned during pretraining. Performance is lower than few-shot CoT but significantly better than direct answering.

### Chain-of-Thought Variants

**Self-Consistency** (Wang et al., 2022)
- Generate multiple reasoning chains (via temperature sampling)
- Take the majority vote on the final answer
- Significantly improves accuracy on reasoning benchmarks
- Cost: proportional to the number of chains (typically 5-40)

**Tree-of-Thought** (Yao et al., 2023)
- Explores multiple reasoning paths at each step (branching)
- Evaluates each partial path and prunes unpromising ones
- Enables lookahead and backtracking (search over thought space)
- More capable but significantly more expensive than linear CoT

**Graph-of-Thought** (Besta et al., 2023)
- Generalizes ToT to arbitrary graph structures
- Thoughts can be combined, refined, or used as input to other thoughts
- Enables more complex reasoning topologies

---

## 3. Few-Shot Learning

### The Spectrum of Prompting

| Mode | Examples in Prompt | Description |
|------|-------------------|-------------|
| Zero-shot | 0 | Task description only |
| One-shot | 1 | Single example |
| Few-shot | 2-10+ | Multiple examples |

### Few-Shot Design Principles

**Example Selection**
- Choose examples that cover the diversity of expected inputs
- Include edge cases and boundary conditions
- Avoid examples that are too similar (information redundancy)
- For classification: balance examples across all classes

**Example Format**
- Use a consistent, clear delimiter between input and output
- The format should be unambiguous and parseable
- If structured output is needed, demonstrate the exact structure

**Example Ordering**
- Most recent examples have the strongest influence (recency effect)
- Diverse ordering generally outperforms grouped ordering
- For sensitive tasks, randomize ordering to avoid positional bias

### When Few-Shot Outperforms Fine-Tuning

Few-shot is preferred when:
- The task is simple and well-defined
- You have fewer than 100 training examples
- The task changes frequently (iterating prompts is faster than retraining)
- You need to support multiple tasks with one model deployment
- Latency and cost requirements are met by the base model

Fine-tuning is preferred when:
- You have thousands of training examples
- The output format or style needs to be very specific
- You need consistently lower latency (fine-tuned smaller model)
- The task requires knowledge not in the pretraining data
- Cost per inference needs to be minimized at scale

---

## 4. Emergent Abilities

### Definition and Evidence

Emergent abilities (Wei et al., 2022) are capabilities that appear in large models but are absent or near-random in smaller models of the same family. They are "emergent" because they cannot be predicted by extrapolating from smaller-scale experiments.

### Documented Emergent Capabilities

**Multi-Step Reasoning**
- Arithmetic with multiple operations
- Logical deduction chains
- Causal reasoning across multiple steps
- Appears around 10B-100B parameters depending on task complexity

**Instruction Following**
- Following complex, multi-part instructions
- Understanding implicit constraints
- Generalizing from instruction descriptions (not just examples)
- Enabled by instruction tuning but requires sufficient base model capability

**Code Generation**
- Writing functional code from natural language descriptions
- Understanding code semantics (not just syntax pattern matching)
- Debugging and explaining code
- Significantly improves from 7B to 70B+ parameter range

**Theory of Mind**
- Modeling other agents' beliefs and intentions
- Understanding sarcasm, irony, and indirect communication
- Predicting behavior based on knowledge states
- Emergent at largest model scales; still imperfect

**Self-Correction**
- Identifying and correcting errors in own output when prompted
- Revising responses based on feedback
- Caveat: Models are better at identifying errors in others' output than their own

### The Emergence Debate

Schaeffer et al. (2023) challenged the emergence narrative:
- Argued that apparent emergent abilities are partly artifacts of evaluation metrics
- Nonlinear metrics (exact match) show sharp transitions; linear metrics (token-level accuracy) show smooth improvement
- Implication: Some capabilities improve gradually but only become visible when crossing a metric threshold

Practical takeaway: Do not assume a capability will "emerge" at larger scale. Test empirically. If a 7B model gets 0% on a task, try CoT prompting and few-shot before scaling up.

---

## 5. Tool Use and Function Calling

### The Capability Extension Pattern

LLMs have inherent limitations: no real-time information, no computation, no external actions. Tool use extends LLMs beyond these limits by allowing them to invoke external functions.

### How Function Calling Works

```
1. System prompt defines available tools:
   tools: [
     {name: "get_weather", params: {location: string}},
     {name: "calculate", params: {expression: string}},
     {name: "search_database", params: {query: string}}
   ]

2. User asks: "What's the weather in Tokyo and is 47*83 more than 3900?"

3. Model generates tool calls (not text):
   [
     {tool: "get_weather", args: {location: "Tokyo"}},
     {tool: "calculate", args: {expression: "47*83"}}
   ]

4. System executes tools, returns results to model

5. Model synthesizes final response using tool results
```

### Tool Use Best Practices

1. **Define tools with clear, specific descriptions** -- The model selects tools based on their descriptions
2. **Use constrained output schemas** -- Enforce JSON schema for tool call arguments
3. **Provide examples of tool use** -- Few-shot examples of when and how to use each tool
4. **Limit the number of available tools** -- Performance degrades with too many options (>20)
5. **Implement tool result validation** -- Don't trust tool call arguments blindly; validate
6. **Handle tool errors gracefully** -- The model should recover from failed tool calls

### Parallel Tool Calling

Modern models (GPT-4o, Claude 3.5) support parallel tool calls -- invoking multiple tools simultaneously when they are independent. This reduces latency for multi-tool queries.

---

## 6. Structured Output Generation

### JSON Mode

Most frontier models support constrained JSON output:
- OpenAI: `response_format: { type: "json_object" }` or JSON Schema mode
- Anthropic: Tool use with defined schemas
- Guaranteed valid JSON (the model will not produce malformed output)

### Grammar-Constrained Generation

For self-hosted models, frameworks like Outlines and LMQL constrain generation to match a formal grammar:
- Regular expressions
- Context-free grammars
- JSON Schema
- Works by masking invalid tokens during generation (zero probability for tokens that would violate the grammar)

### Structured Output Strategies

| Approach | Reliability | Flexibility | Latency |
|----------|-------------|-------------|---------|
| JSON mode (native) | Very high | Schema-constrained | Normal |
| Tool/function calling | Very high | Schema-constrained | Normal |
| Prompt engineering | Medium | Unconstrained | Normal |
| Grammar-constrained | Very high | Grammar-defined | Slightly higher |
| Output parsing + retry | Medium-high | Unconstrained | Variable |

---

## 7. Long-Context Capabilities

### What Long Context Enables

| Context Length | Enables |
|---------------|---------|
| 4K tokens | Short conversations, single document QA |
| 32K tokens | Multi-document analysis, long conversations |
| 128K tokens | Book-length analysis, codebase understanding |
| 1M tokens | Entire repositories, multi-book analysis |

### The "Lost in the Middle" Problem (Liu et al., 2023)

LLMs perform best when relevant information is at the beginning or end of the context, with degraded performance for information in the middle. This is an artifact of:
- Positional encoding bias (stronger attention to start/end)
- U-shaped attention distribution learned during training

**Mitigation strategies:**
1. Place the most important context at the beginning and end
2. Use structured formatting (headers, numbered sections) to aid navigation
3. For RAG: order retrieved documents by relevance with the most relevant first
4. Use reranking to ensure relevant documents are positioned optimally

### Long Context vs. RAG

| Factor | Long Context (Stuff All Docs) | RAG (Retrieve Relevant) |
|--------|------------------------------|------------------------|
| Simplicity | Very simple | Complex pipeline |
| Quality (small corpus) | Often better | Can miss relevant docs |
| Quality (large corpus) | Degrades (lost in middle) | Better (focused context) |
| Cost | High (process all tokens) | Lower (process fewer tokens) |
| Latency | Higher (longer generation) | Lower (shorter context) |
| Corpus > context window | Not possible | Necessary |

Rule of thumb: If your entire knowledge base fits in the context window AND you can afford the token cost, try long-context before building RAG. If not, RAG is necessary.

---

## 8. Multimodal Capabilities

### Vision-Language Models

Modern LLMs can process images alongside text:

**Capabilities:**
- Image description and captioning
- Visual question answering
- OCR and document understanding
- Chart and diagram interpretation
- UI screenshot analysis
- Multi-image comparison

**Architecture approaches:**
- **Early fusion** (Gemini): Vision and text trained jointly from scratch
- **Late fusion** (GPT-4V, LLaVA): Vision encoder (CLIP ViT) connected to pretrained LLM via adapter

**Limitations:**
- Spatial reasoning is unreliable (counting objects, understanding layouts)
- Fine-grained text in images can be misread
- Complex charts may be misinterpreted
- Hallucination is more common with visual input

### Audio-Language Models

- GPT-4o: Native voice mode with real-time speech understanding and generation
- Gemini: Native audio processing
- Whisper (OpenAI): Speech-to-text as a preprocessing step

---

## 9. Capability Assessment Framework

### Before deploying an LLM capability in production, assess:

**1. Reliability**
- What is the success rate on representative test cases? (Minimum 90% for production)
- What are the failure modes? (Graceful vs. catastrophic)
- Is the output consistent across runs? (Temperature 0 helps but does not guarantee)

**2. Controllability**
- Can you constrain the output format reliably?
- Can you prevent specific content or behaviors?
- Does the model follow instructions consistently?

**3. Scalability**
- What is the per-request cost at production volume?
- What is the latency at production load?
- Are there rate limits that would block scale?

**4. Evaluability**
- Can you automatically measure output quality?
- Do you have a ground truth dataset for comparison?
- Can you detect degradation in real-time?

### Capability Maturity Levels

| Level | Description | Production Readiness |
|-------|-------------|---------------------|
| 1 - Experimental | Works in demos, fails unpredictably | Not ready |
| 2 - Prototype | Works for common cases, fails on edge cases | Internal tools only |
| 3 - Production | >90% reliability, known failure modes, fallbacks | Ready with monitoring |
| 4 - Robust | >99% reliability, comprehensive evaluation, auto-fallback | Ready for critical paths |

---

**This module catalogs what LLMs can do. Always pair with `llm_limitations.md` to understand what they cannot do.**

# AI Brain -- Scope and Boundaries

---

## In Scope

The AI Brain is the authoritative source for decisions, architecture, and guidance in the following domains:

### 1. Machine Learning Fundamentals
- Supervised learning (classification, regression)
- Unsupervised learning (clustering, dimensionality reduction, generative models)
- Reinforcement learning (policy gradient, Q-learning, RLHF)
- Statistical learning theory (bias-variance tradeoff, PAC learning, VC dimension)
- Loss functions and optimization landscapes
- Feature engineering and data preprocessing for ML

### 2. Deep Learning
- Neural network architectures (feedforward, convolutional, recurrent, transformer)
- Training dynamics (backpropagation, gradient flow, vanishing/exploding gradients)
- Optimization algorithms (SGD, Adam, AdamW, learning rate scheduling)
- Regularization techniques (dropout, weight decay, batch/layer normalization)
- Transfer learning and domain adaptation

### 3. Large Language Models
- Model architecture analysis (decoder-only, encoder-decoder, mixture-of-experts)
- Model selection criteria (capability, cost, latency, context window, licensing)
- Capability assessment and benchmarking
- Scaling laws and emergent behaviors
- Multi-modal models (vision-language, audio-language)

### 4. Prompt Engineering
- System prompt design and optimization
- Few-shot and zero-shot prompting strategies
- Chain-of-thought, tree-of-thought, and graph-of-thought reasoning
- Prompt security (injection attacks, jailbreak prevention)
- Prompt versioning, testing, and CI/CD for prompts

### 5. Retrieval-Augmented Generation (RAG)
- End-to-end RAG pipeline architecture
- Document ingestion, chunking, and preprocessing
- Embedding model selection and fine-tuning
- Vector database architecture, selection, and optimization
- Retrieval strategies (dense, sparse, hybrid, multi-hop)
- Reranking and contextual compression
- RAG evaluation frameworks

### 6. AI Agents
- Agent architecture patterns (ReAct, Plan-and-Execute, LATS)
- Tool use and function calling
- Memory systems (buffer, summary, vector, entity)
- Planning and reasoning frameworks
- Multi-agent orchestration and communication
- Agent safety and controllability

### 7. Fine-Tuning and Model Adaptation
- Full parameter fine-tuning
- Parameter-efficient methods (LoRA, QLoRA, prefix tuning, adapters)
- Alignment methods (RLHF, DPO, RLAIF, Constitutional AI training)
- Training data curation, quality, and deduplication
- Synthetic data generation
- Evaluation and benchmarking (MMLU, HumanEval, MT-Bench, domain-specific)

### 8. Computer Vision (AI-Specific)
- Vision transformers (ViT, DINO, SAM)
- Multi-modal models (CLIP, LLaVA, GPT-4V)
- Image generation (diffusion models, DALL-E, Stable Diffusion)
- OCR and document understanding

### 9. Natural Language Processing
- Text classification, NER, sentiment analysis
- Semantic similarity and embedding spaces
- Summarization and extraction
- Machine translation
- Question answering systems

### 10. AI Infrastructure
- GPU/TPU compute planning
- Training pipeline architecture
- Inference optimization (quantization, distillation, pruning)
- Model serving (latency, throughput, batching)
- Cost modeling and optimization

### 11. AI Product Design
- AI-first product architecture
- Human-AI interaction patterns
- UX design for probabilistic systems
- Feature design accounting for AI limitations
- AI-powered workflow automation

### 12. Responsible AI
- Bias detection and mitigation
- Fairness metrics (demographic parity, equalized odds, calibration)
- Transparency and explainability (SHAP, LIME, attention visualization)
- AI governance frameworks
- Model cards and documentation
- Red teaming and adversarial testing

---

## Out of Scope

The following are explicitly NOT the AI Brain's responsibility:

### Delegated to Engineering Brain
- **Application code implementation** -- The AI Brain designs the AI architecture; the Engineering Brain implements it
- **Database migrations and schema design** -- Even for vector databases, the Engineering Brain handles DDL
- **CI/CD pipeline configuration** -- AI Brain specifies what to test; Engineering Brain builds the pipeline
- **API endpoint implementation** -- AI Brain designs the AI service interface; Engineering Brain implements REST/GraphQL
- **Infrastructure provisioning** -- AI Brain specifies GPU requirements; Engineering Brain provisions them
- **Security hardening** -- AI Brain handles AI-specific safety; Engineering Brain handles application security

### Delegated to Design Brain
- **UI/UX implementation** -- AI Brain advises on AI UX patterns; Design Brain implements them
- **Visual design** -- Design Brain owns all visual decisions
- **User research methodology** -- Design Brain owns research; AI Brain provides AI capability constraints
- **Accessibility** -- Design Brain owns WCAG compliance

### Delegated to MBA Brain
- **Business model selection** -- MBA Brain decides pricing; AI Brain provides cost inputs
- **Market analysis** -- MBA Brain owns market research; AI Brain provides competitive AI landscape
- **Financial projections** -- MBA Brain owns financials; AI Brain provides cost estimates
- **Go-to-market strategy** -- MBA Brain leads; AI Brain advises on AI positioning

### Not Covered by Any Current Brain
- **Novel ML research** -- This brain synthesizes and applies existing research; it does not conduct new research
- **Hardware design** -- Custom silicon, FPGA programming, chip architecture
- **Robotics** -- Physical robot control, motion planning, sensor fusion (future brain)
- **Quantum computing** -- Quantum ML algorithms, quantum advantage claims

---

## Boundary Interactions

### AI Brain + Engineering Brain

```
AI Brain decides:                  Engineering Brain implements:
- Which model to use               - API integration code
- Prompt design                    - Prompt storage/versioning system
- RAG architecture                 - Vector DB setup, indexing pipeline
- Agent design pattern             - Agent runtime, error handling
- Evaluation criteria              - Test automation, CI/CD
- Cost budget                      - Caching, rate limiting
```

### AI Brain + Design Brain

```
AI Brain advises:                  Design Brain decides:
- AI capability constraints        - How to present AI output
- Confidence score ranges          - Visual confidence indicators
- Streaming response behavior      - Streaming UI animation
- Error/hallucination types        - Error state design
- Latency expectations             - Loading state design
```

### AI Brain + MBA Brain

```
AI Brain provides:                 MBA Brain decides:
- Technical feasibility            - Whether to build
- Cost per inference               - Pricing model
- Competitive AI landscape         - Market positioning
- Build vs. buy analysis (tech)    - Build vs. buy decision (business)
- Risk assessment (technical)      - Risk tolerance (business)
```

---

## Escalation Rules

### When to Escalate to CEO Brain
- Cross-brain conflicts that cannot be resolved bilaterally
- AI initiatives that require coordinated multi-brain execution
- Strategic AI decisions that affect the entire product portfolio
- Resource allocation conflicts between AI and other priorities

### When to Refuse Work
- Requests that violate responsible AI principles (see `09_responsible_ai/`)
- Requests to bypass evaluation or safety checks
- Requests outside scope with no appropriate brain to delegate to
- Requests that require capabilities beyond current state of the art

### When to Defer
- Implementation details (defer to Engineering Brain)
- Visual/UX decisions (defer to Design Brain)
- Business strategy (defer to MBA Brain)
- Domain expertise outside AI (defer to relevant specialist brain)

---

## Versioning

This scope document reflects the state of AI as of early 2025. The field evolves rapidly. Key areas likely to expand:

- **Multimodal AI** -- As vision-language-audio models mature, this scope will expand
- **AI agents** -- As agent frameworks stabilize, patterns will become more prescriptive
- **On-device AI** -- As edge inference improves, mobile/embedded AI will enter scope
- **AI regulation** -- As governments enact AI laws (EU AI Act, etc.), governance sections will expand

Update this document when the state of the art materially changes.

---

**This scope document defines the boundaries of AI Brain authority.**

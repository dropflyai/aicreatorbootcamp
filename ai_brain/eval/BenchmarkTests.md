# AI Brain Benchmark Tests -- Authoritative

These scenarios test real-world AI engineering competence.
Every scenario requires a complete solution, not a conceptual answer.

A passing response must include: diagnosis, architecture, implementation plan,
evaluation criteria, and failure handling.

Handwaving is not engineering. "It depends" without specifics is a failure.

---

## BENCHMARK RULES

- Each scenario must be answered with a concrete, implementable plan
- Trade-offs must be stated explicitly (not hidden)
- Cost, latency, and quality implications must be quantified
- Edge cases must be addressed (not ignored)
- Evaluation method must be included in every answer
- Time estimate and resource requirements must be provided

### Scoring Per Scenario

- **5** -- Production-ready plan with quantified tradeoffs, edge cases handled, evaluation included
- **4** -- Strong plan with minor gaps, tradeoffs acknowledged, evaluation present
- **3** -- Reasonable approach but missing key details or evaluation
- **2** -- Conceptual only, no implementation specifics, no evaluation
- **1** -- Wrong approach or critical misunderstanding

### Passing Criteria

- Average across all scenarios >= 4.0
- No scenario < 3
- All "Critical" scenarios >= 4

---

## SCENARIO 1: RAG FAITHFULNESS DEGRADATION [Critical]

**Situation:**
RAG system returns relevant but slightly wrong answers 15% of the time. Users report
that answers sound confident but contain subtle factual errors. Retrieval looks correct --
the right chunks are being returned. The problem is in generation.

**Task:**
Diagnose the pipeline and propose fixes.

**Required in Response:**
- Root cause analysis (why faithful retrieval produces unfaithful generation)
- At least 3 concrete fixes ranked by impact and effort
- Faithfulness measurement methodology
- Before/after evaluation plan
- Monitoring to prevent regression

**Red Flags (auto-fail if present):**
- "Just use a better model" without analysis
- No measurement methodology
- Ignoring the retrieval-generation gap

---

## SCENARIO 2: MULTI-AGENT CUSTOMER SUPPORT [Critical]

**Situation:**
Design a multi-agent system for customer support that handles: routing to specialist
agents, preserving conversation context across handoffs, escalating to human agents,
and maintaining a consistent customer experience.

**Task:**
Architecture the complete system.

**Required in Response:**
- Agent topology (which agents, what roles, how they communicate)
- Routing logic (how requests reach the right agent)
- Context preservation strategy (what state transfers between agents)
- Human handoff protocol (when, how, what context transfers)
- Failure modes and recovery (what happens when an agent fails)
- Quality evaluation per agent and end-to-end

**Red Flags (auto-fail if present):**
- No consideration of context window limits during handoff
- No failure mode analysis
- No evaluation strategy

---

## SCENARIO 3: COST REDUCTION 10x [Critical]

**Situation:**
LLM-based feature costs $0.50/user/day. Product is scaling to 100K users.
Current cost trajectory: $50K/day, $1.5M/month. Budget is $150K/month.
Reduce cost to ~$0.05/user/day without significant quality loss.

**Task:**
Design a cost reduction strategy that achieves 10x savings.

**Required in Response:**
- Current cost breakdown (where tokens are spent)
- At least 5 concrete optimization techniques ranked by impact
- Quality measurement before and after each optimization
- Acceptable quality degradation threshold (quantified)
- Implementation priority and timeline
- Monitoring to catch quality regression early

**Red Flags (auto-fail if present):**
- "Use a cheaper model" as the only strategy
- No quality measurement plan
- No quantified impact per technique

---

## SCENARIO 4: PROMPT INJECTION DEFENSE

**Situation:**
Your customer-facing AI assistant processes user messages that may contain
prompt injection attempts. Current system has no defense. Users have already
found that they can override system instructions.

**Task:**
Design a layered defense system.

**Required in Response:**
- Threat model (categories of injection attacks)
- At least 4 defense layers with implementation details
- Detection strategy for novel injection attempts
- Response strategy when injection is detected
- Testing methodology (how to verify defenses work)
- False positive handling (legitimate inputs that look like injection)

---

## SCENARIO 5: EVALUATION PIPELINE FROM SCRATCH

**Situation:**
Your team has been shipping LLM features with no automated evaluation.
There are 5 LLM-powered features in production. You need to build an
evaluation system from zero.

**Task:**
Design and prioritize the evaluation pipeline.

**Required in Response:**
- Evaluation taxonomy (what types of evaluation for what purposes)
- Priority order (which features to evaluate first and why)
- Golden dataset creation strategy
- Automated evaluation implementation plan
- Human evaluation protocol
- CI integration plan
- Regression detection methodology
- Timeline and resource estimate

---

## SCENARIO 6: HALLUCINATION IN MEDICAL CONTEXT

**Situation:**
AI health assistant occasionally generates plausible but incorrect medical
information. Overall hallucination rate is 3%, but for medication interactions
specifically, the rate is 8%. The system uses RAG over a medical knowledge base.

**Task:**
Reduce medication interaction hallucination rate to <0.5%.

**Required in Response:**
- Analysis of why medication interactions specifically hallucinate more
- Structured knowledge representation for drug interactions
- Verification pipeline (how to catch hallucinations before user sees them)
- Confidence scoring and abstention strategy
- Human-in-the-loop for uncertain answers
- Liability and safety considerations
- Evaluation dataset for medication interactions specifically

---

## SCENARIO 7: EMBEDDING MODEL MIGRATION

**Situation:**
You need to migrate from text-embedding-ada-002 to a newer, better embedding
model. You have 50M documents in your vector database. RAG system serves 10K
queries/day. You cannot afford downtime.

**Task:**
Plan the zero-downtime migration.

**Required in Response:**
- Migration strategy (parallel index, shadow mode, cutover plan)
- Quality validation before cutover (how to verify new embeddings are better)
- Rollback plan if new embeddings perform worse
- Cost estimate for re-embedding 50M documents
- Timeline with milestones
- Monitoring during and after migration
- Chunk boundary changes (if re-chunking during migration)

---

## SCENARIO 8: AGENT INFINITE LOOP IN PRODUCTION

**Situation:**
Production agent entered an infinite loop at 3 AM. It made 847 API calls before
the rate limiter stopped it. Each call had side effects (sent emails). 200 duplicate
emails were sent to customers before detection.

**Task:**
Post-incident analysis and prevention system.

**Required in Response:**
- Root cause analysis framework (what caused the loop)
- Immediate fixes (prevent recurrence of this exact issue)
- Systemic fixes (prevent any future loop scenario)
- Side-effect management (idempotency, undo capability)
- Monitoring and alerting improvements
- Customer communication plan for the 200 affected users
- Testing strategy to verify loop prevention works

---

## SCENARIO 9: MULTI-MODAL DOCUMENT UNDERSTANDING

**Situation:**
Build a system that processes documents containing text, tables, charts, and
images. Documents are insurance claims (PDFs, 5-50 pages each). System must
extract structured data and flag anomalies.

**Task:**
Design the document understanding pipeline.

**Required in Response:**
- Document processing architecture (OCR, layout analysis, content extraction)
- Multi-modal handling strategy (text vs table vs chart vs image)
- Structured data extraction schema
- Anomaly detection approach
- Confidence scoring per extracted field
- Human review routing for low-confidence extractions
- Accuracy measurement methodology
- Processing throughput and latency estimates

---

## SCENARIO 10: LLM-AS-JUDGE CALIBRATION

**Situation:**
You are using an LLM to evaluate outputs of another LLM (LLM-as-judge pattern).
Initial testing shows the judge agrees with human evaluators only 65% of the time.
You need >85% agreement for the evaluation to be trustworthy.

**Task:**
Calibrate the LLM judge to achieve >85% human agreement.

**Required in Response:**
- Diagnosis of why agreement is low (systematic biases in LLM judges)
- Calibration techniques (at least 4 specific approaches)
- Reference answer strategy (when to use, how to create)
- Inter-rater reliability measurement
- Judge prompt optimization methodology
- When to use LLM judge vs human judge (decision framework)
- Cost comparison: calibrated LLM judge vs human evaluation

---

## SCENARIO 11: REAL-TIME STREAMING WITH TOOL CALLS

**Situation:**
User-facing AI assistant needs to stream responses in real-time while also
making tool calls (database lookups, API calls). Current implementation either
streams with no tool use or uses tools with no streaming. Users complain about
latency when tools are involved.

**Task:**
Design a streaming architecture that supports interleaved tool calls.

**Required in Response:**
- Architecture for parallel streaming and tool execution
- UI/UX for showing tool execution status during streaming
- Partial response handling (what to show while waiting for tool results)
- Error handling when a tool call fails mid-stream
- Latency budget allocation (model inference vs tool execution)
- Implementation approach (SSE, WebSockets, or other)

---

## SCENARIO 12: FINE-TUNING VS PROMPTING DECISION

**Situation:**
Classification task with 50 categories. Few-shot prompting achieves 78% accuracy.
Business requires 92%+. You have 10K labeled examples. You need to decide between
better prompting, fine-tuning, or a hybrid approach.

**Task:**
Make and justify the decision with a concrete implementation plan.

**Required in Response:**
- Analysis of why few-shot is at 78% (error analysis by category)
- Prompting improvements with estimated impact
- Fine-tuning plan with data strategy
- Hybrid approach design
- Cost comparison across approaches
- Time-to-production comparison
- Maintenance burden comparison
- Recommendation with quantified justification

---

## SCENARIO 13: CONTEXT WINDOW MANAGEMENT AT SCALE

**Situation:**
AI assistant needs access to user's full conversation history (avg 50K tokens)
plus relevant knowledge base chunks (avg 10K tokens) plus system instructions
(3K tokens). Model context window is 128K but quality degrades significantly
beyond 32K tokens in practice.

**Task:**
Design context window management strategy.

**Required in Response:**
- Context prioritization framework (what goes in, what gets summarized, what drops)
- Conversation summarization strategy (when to summarize, how to preserve key info)
- Sliding window with smart eviction
- RAG integration with context budget
- Quality measurement across context lengths
- Edge cases (very long conversations, rapid topic changes)

---

## SCENARIO 14: A/B TESTING LLM FEATURES

**Situation:**
You want to A/B test a new prompt version against the current one. But LLM
outputs are non-deterministic, user queries vary wildly, and traditional
conversion metrics do not capture output quality.

**Task:**
Design an A/B testing framework for LLM features.

**Required in Response:**
- Metric selection (what to measure and why)
- Sample size calculation (accounting for output variance)
- Randomization strategy (user-level vs request-level)
- Quality evaluation method (automated + human)
- Statistical analysis approach (handling non-normal distributions)
- Guardrails (auto-rollback on quality degradation)
- Duration estimation and early stopping criteria

---

## SCENARIO 15: MULTI-TENANT AI SYSTEM

**Situation:**
Build an AI platform that serves multiple enterprise customers. Each customer
has their own knowledge base, custom instructions, and usage limits. Customers
must not see each other's data. Some customers want fine-tuned models.

**Task:**
Design the multi-tenant architecture.

**Required in Response:**
- Tenant isolation strategy (data, compute, model)
- Knowledge base per tenant (separate indexes vs filtered shared index)
- Custom instruction management
- Usage metering and billing
- Per-tenant model management (shared vs fine-tuned)
- Security and compliance (SOC2, data residency)
- Scaling strategy per tenant
- Onboarding automation for new tenants

---

## SCENARIO 16: GRACEFUL DEGRADATION UNDER LOAD

**Situation:**
AI system normally handles 100 req/sec. During peak events, traffic spikes
to 1000 req/sec. System must degrade gracefully rather than crash.

**Task:**
Design the degradation strategy.

**Required in Response:**
- Traffic classification (which requests are critical vs deferrable)
- Queue management and priority scheduling
- Model downgrade path (expensive model -> cheap model -> cached response)
- Feature degradation tiers (full AI -> simplified AI -> static fallback)
- Auto-scaling triggers and limits
- User communication during degraded mode
- Recovery strategy (how to drain queues and restore full service)

---

## FINAL BENCHMARK ASSESSMENT

### Scoring Summary

| Scenario | Score | Critical? | Notes |
|----------|-------|-----------|-------|
| 1. RAG Faithfulness | /5 | Yes | |
| 2. Multi-Agent Support | /5 | Yes | |
| 3. Cost Reduction 10x | /5 | Yes | |
| 4. Prompt Injection | /5 | No | |
| 5. Evaluation Pipeline | /5 | No | |
| 6. Medical Hallucination | /5 | No | |
| 7. Embedding Migration | /5 | No | |
| 8. Agent Infinite Loop | /5 | No | |
| 9. Multi-Modal Docs | /5 | No | |
| 10. LLM-as-Judge | /5 | No | |
| 11. Streaming + Tools | /5 | No | |
| 12. Fine-tune vs Prompt | /5 | No | |
| 13. Context Window | /5 | No | |
| 14. A/B Testing LLMs | /5 | No | |
| 15. Multi-Tenant | /5 | No | |
| 16. Graceful Degradation | /5 | No | |

**Average:** /5
**Critical Scenarios Average:** /5
**Verdict:** PASS / FAIL
**Weakest Areas:** ________________

---

## END OF BENCHMARK TESTS

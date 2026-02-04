# AI Score -- Quality Enforcement (Authoritative)

This document defines how AI system quality is evaluated.
Every AI feature, pipeline, or agent must be scored before deployment.

If quality is not measurable, it is not enforced.
If it is not enforced, it will degrade.

---

## SCORING RULES (MANDATORY)

Each AI system must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Evaluation Rigor**
- **Safety & Alignment**
- **Agent Reliability**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (floor threshold)
- All failure conditions checked and cleared

### Deployment Gates

| Gate | Requirement |
|------|-------------|
| Staging | Average >= 3.5, no hard fail < 3 |
| Production | Average >= 4.0, no hard fail < 4, all safety checks pass |
| Critical Path | Average >= 4.5, independent safety audit complete |

---

## 1. MODEL SELECTION RIGOR

**Question:**
Is the model choice justified by the task requirements, not by default or hype?

### What to Evaluate

- Task requirements documented (latency, accuracy, cost, context window)
- Multiple models evaluated with benchmarks for the specific use case
- Cost-quality tradeoff is explicit and documented
- Model selection rationale written before implementation, not after
- Fallback model identified for outages or rate limits
- Model version pinned, not floating on "latest"
- Fine-tuning vs. prompting decision is justified
- Open-source vs. proprietary tradeoff considered

### Scoring Guide

- **5** -- Task-specific benchmarks run, cost-quality frontier mapped, selection justified with data, fallback configured
- **4** -- Multiple models compared, rationale documented, cost considered, version pinned
- **3** -- Model chosen with some rationale but no comparative benchmarks
- **2** -- Default model used without evaluation, no cost analysis
- **1** -- Model chosen arbitrarily or by popularity alone

### Failure Conditions

- Model selected without any benchmark on actual task data = Score capped at 2
- No cost projection for production scale = Score capped at 3
- Model version not pinned = Score capped at 3
- No fallback model identified = Score capped at 3

Score <4 --> Re-evaluate model selection with benchmark data.

---

## 2. PROMPT ENGINEERING QUALITY

**Question:**
Are prompts systematic, versioned, and evaluated -- not ad-hoc strings?

### What to Evaluate

- Prompts stored as versioned artifacts, not inline strings
- Prompt templates parameterized (not hardcoded values)
- System prompts separated from user prompts
- Few-shot examples curated and tested
- Prompt regression suite exists (output stability across versions)
- Chain-of-thought or structured output used where appropriate
- Prompt injection defenses implemented
- Output format enforcement (JSON mode, function calling, structured output)

### Scoring Guide

- **5** -- Versioned prompt library, regression tests, injection defenses, structured output enforcement, A/B tested
- **4** -- Versioned prompts, few-shot examples tested, output format enforced, injection defenses present
- **3** -- Prompts stored separately but not versioned, basic output formatting
- **2** -- Prompts inline in code, no testing, no injection defense
- **1** -- Ad-hoc strings with no structure or testing

### Failure Conditions

- Prompts hardcoded inline in application code = Score capped at 2
- No prompt injection defense = Score capped at 3
- No output format enforcement = Score capped at 3
- No prompt regression tests = Score capped at 3

Score <4 --> Extract prompts into versioned library with tests.

---

## 3. RAG PIPELINE QUALITY

**Question:**
Does the retrieval-augmented generation pipeline return accurate, relevant, and faithful answers?

### What to Evaluate

- Chunking strategy justified (size, overlap, semantic boundaries)
- Embedding model selected with benchmark (not default)
- Retrieval precision measured (relevant chunks in top-k)
- Retrieval recall measured (relevant info not missed)
- Chunk quality audited (no broken context, no noise)
- Faithfulness measured (answer grounded in retrieved context)
- Citation or attribution present in output
- Reranking layer present and evaluated
- Metadata filtering implemented where applicable
- Index refresh strategy documented (stale data prevention)

### Scoring Guide

- **5** -- Precision/recall measured, faithfulness >95%, citations present, reranking tuned, index refresh automated
- **4** -- Retrieval metrics tracked, faithfulness >90%, chunk quality audited, reranking present
- **3** -- Basic RAG working, some retrieval measurement, no faithfulness tracking
- **2** -- RAG implemented but untested, no retrieval metrics, unknown faithfulness
- **1** -- Naive implementation, no measurement, hallucinations not tracked

### Failure Conditions

- No retrieval metrics measured = Score capped at 2
- Faithfulness not measured = Score capped at 3
- Chunk quality never audited = Score capped at 3
- Stale data in index with no refresh plan = Score capped at 2
- Hallucination rate >5% for factual tasks = NOT PRODUCTION READY

Score <4 --> Implement retrieval evaluation suite and faithfulness checks.

---

## 4. AGENT RELIABILITY

**Question:**
Do AI agents use tools correctly, handle errors gracefully, and avoid infinite loops?

### What to Evaluate

- Tool use accuracy measured (correct tool selected, correct parameters)
- Error handling for tool failures (retry, fallback, graceful degradation)
- Loop prevention implemented (max iterations, cycle detection)
- Context window management (summarization, pruning strategy)
- Multi-step reasoning evaluated end-to-end (not just per-step)
- Agent observability (traces logged, steps inspectable)
- Human-in-the-loop escalation path defined
- Rollback capability for agent actions with side effects
- Timeout enforcement on all agent actions
- State persistence across interruptions

### Scoring Guide

- **5** -- Tool accuracy >98%, comprehensive error handling, loop prevention, full observability, human escalation, rollback capability
- **4** -- Tool accuracy >95%, error handling present, loop prevention, traces logged, escalation defined
- **3** -- Basic tool use working, some error handling, no loop prevention or observability
- **2** -- Agent works on happy path only, crashes on errors, no observability
- **1** -- Agent unreliable, frequent failures, no error handling

### Failure Conditions

- No loop prevention = Score capped at 2 (agent can run forever)
- No timeout on agent actions = Score capped at 2
- No observability or tracing = Score capped at 3
- No human escalation path for high-stakes actions = Score capped at 3
- Agent can take irreversible actions without confirmation = Score capped at 2

Score <4 --> Implement loop prevention, tracing, and escalation.

---

## 5. EVALUATION RIGOR

**Question:**
Is the AI system evaluated with automated tests, human evaluation, and regression suites?

### What to Evaluate

- Automated evaluation suite exists and runs in CI
- Human evaluation protocol defined (who, how often, rubric)
- Regression suite covers known edge cases and failure modes
- Evaluation metrics aligned with business outcomes (not just ML metrics)
- A/B testing framework available for production changes
- Evaluation data versioned and reproducible
- Bias evaluation included (demographic parity, equalized odds)
- Adversarial test cases included (jailbreaks, edge inputs, malformed data)
- Golden dataset maintained and updated
- Evaluation runs before every deployment (not optional)

### Scoring Guide

- **5** -- Automated + human eval, regression suite, A/B framework, bias testing, adversarial cases, golden dataset, runs in CI
- **4** -- Automated eval in CI, human eval protocol, regression suite, golden dataset maintained
- **3** -- Some automated tests but not comprehensive, human eval ad-hoc
- **2** -- Manual testing only, no regression suite, no automated evaluation
- **1** -- No evaluation -- deployed without testing

### Failure Conditions

- No evaluation suite = CANNOT DEPLOY TO PRODUCTION
- No regression tests for known failure modes = Score capped at 3
- No human evaluation protocol = Score capped at 3
- Evaluation not in CI pipeline = Score capped at 3
- No adversarial test cases = Score capped at 3

Score <4 --> Build evaluation suite before any deployment.

---

## 6. SAFETY & ALIGNMENT

**Question:**
Is the AI system safe, content-filtered, and resistant to adversarial attacks?

### What to Evaluate

- Content filtering implemented (input and output)
- Red team testing conducted (attempted jailbreaks, prompt injection)
- PII detection and handling (masking, filtering, audit logging)
- Output toxicity monitoring active
- Refusal behavior tested (system correctly refuses harmful requests)
- Rate limiting on API endpoints
- Data retention policy enforced
- User consent mechanisms for AI-generated content
- Bias audit completed and documented
- Incident response plan for AI safety failures

### Scoring Guide

- **5** -- Red team tested, content filtering on input/output, PII handling, toxicity monitoring, bias audit, incident response plan, rate limiting
- **4** -- Content filtering present, red team tested, PII handling, rate limiting, bias audit scheduled
- **3** -- Basic content filtering, no red team testing, limited PII handling
- **2** -- Minimal safety measures, no content filtering on output
- **1** -- No safety measures implemented

### Failure Conditions

- No content filtering = SAFETY VIOLATION -- cannot deploy
- No PII handling = COMPLIANCE VIOLATION -- cannot deploy
- No rate limiting = Score capped at 2 (abuse risk)
- Red team testing not conducted = Score capped at 3
- No incident response plan = Score capped at 3
- Known jailbreak vectors not tested = Score capped at 3

Score <4 --> Implement content filtering and red team testing before deployment.

---

## 7. COST EFFICIENCY

**Question:**
Is token usage optimized without sacrificing quality beyond acceptable thresholds?

### What to Evaluate

- Cost per query tracked and monitored
- Token usage optimized (prompt compression, efficient few-shot)
- Caching implemented (semantic cache, exact match cache)
- Model routing implemented (cheap model for simple, expensive for complex)
- Batch processing used where latency allows
- Cost alerts and budgets configured
- Cost-quality tradeoff documented and approved
- Token waste identified and eliminated (redundant context, verbose prompts)
- Cost projections at scale calculated
- Unit economics viable (cost per user per day within budget)

### Scoring Guide

- **5** -- Cost tracked per query, caching active, model routing optimized, batch where possible, unit economics proven, budget alerts active
- **4** -- Cost tracked, caching implemented, some model routing, projections calculated
- **3** -- Cost tracked at aggregate level, basic caching, no routing
- **2** -- Cost tracked monthly (too coarse), no optimization
- **1** -- Cost not tracked, no optimization, budget surprises

### Failure Conditions

- Cost per query >10x baseline without justification = OPTIMIZATION REQUIRED
- No cost tracking = Score capped at 2
- No caching strategy = Score capped at 3
- Unit economics not calculated for production scale = Score capped at 3
- No budget alerts = Score capped at 3

Score <4 --> Implement cost tracking, caching, and model routing.

---

## 8. LATENCY PERFORMANCE

**Question:**
Does the AI system meet latency SLAs at P50, P95, and P99?

### What to Evaluate

- Latency SLAs defined (P50, P95, P99 targets)
- Latency measured and monitored in production
- Streaming implemented where user-facing (perceived latency)
- Cold start latency measured and mitigated
- Timeout configuration appropriate
- Async processing used for non-real-time tasks
- Queue management for burst traffic
- Geographic distribution considered (edge inference, regional endpoints)
- Latency regression detected automatically
- Fallback to faster model when latency SLA at risk

### Scoring Guide

- **5** -- SLAs defined, P50/P95/P99 within targets, streaming active, cold start mitigated, auto-fallback on latency breach
- **4** -- SLAs defined, P50/P95 within targets, streaming implemented, latency monitored
- **3** -- Latency measured but no SLAs, some optimization, monitoring present
- **2** -- Latency measured occasionally, no SLAs, no optimization
- **1** -- Latency not measured, no SLAs, no monitoring

### Failure Conditions

- No latency SLAs defined = Score capped at 3
- P95 latency >2x SLA = Score capped at 2
- No streaming for user-facing endpoints = Score capped at 3
- No latency monitoring in production = Score capped at 2
- No timeout configuration = Score capped at 2

Score <4 --> Define SLAs, implement monitoring, add streaming.

---

## FINAL AI SCORE DECISION

**Hard Fail Dimensions (Evaluation Rigor, Safety & Alignment, Agent Reliability):**
- Score <3 --> IMMEDIATE REMEDIATION REQUIRED
- Evaluation Rigor <3 --> DEPLOYMENT BLOCKED

**All Dimensions:**
- Average score >= 4.0 --> AI SYSTEM MAY DEPLOY
- Average score 3.5-3.9 --> STAGING ONLY, remediation plan required
- Average score < 3.5 --> NOT DEPLOYABLE

**Safety:**
- Any safety failure condition triggered --> DEPLOYMENT BLOCKED regardless of score

Scores must be stated explicitly before any deployment decision.

### Score Card Template

```markdown
## AI Score: [System/Feature Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Model Selection Rigor | /5 | |
| Prompt Engineering Quality | /5 | |
| RAG Pipeline Quality | /5 | |
| Agent Reliability | /5 | |
| Evaluation Rigor | /5 | |
| Safety & Alignment | /5 | |
| Cost Efficiency | /5 | |
| Latency Performance | /5 | |

**Average:** /5
**Hard Fail Check:** PASS / FAIL
**Safety Check:** PASS / FAIL
**Verdict:** DEPLOY / STAGING ONLY / BLOCKED / REMEDIATION REQUIRED
**Blocking Issues:** [if any]
**Remediation Plan:** [if needed, with owner and deadline]
```

---

## SEVERITY CLASSIFICATION

### Critical (Deployment Blocked)

- No evaluation suite exists
- No content filtering on production system
- Hallucination rate >5% on factual tasks
- Agent can take irreversible actions without confirmation
- PII exposed in logs or outputs
- No rate limiting on public endpoints

### High (Must Fix Before Next Release)

- Prompt injection not defended
- No regression test suite
- Cost per query >10x baseline
- No observability on agent actions
- No human escalation path

### Medium (Tracked, Fix Within Sprint)

- Model version floating (not pinned)
- No A/B testing framework
- Cache hit rate below 50%
- Cold start latency unmitigated
- Bias audit not completed

### Low (Improvement Backlog)

- No semantic caching (only exact match)
- Few-shot examples not A/B tested
- Geographic latency not optimized
- Cost tracking at aggregate only

---

## CONTINUOUS MONITORING REQUIREMENTS

After deployment, the following must be monitored continuously:

| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| Hallucination rate | >3% | Daily |
| Latency P95 | >SLA | Real-time |
| Cost per query | >2x baseline | Daily |
| Error rate | >1% | Real-time |
| Safety filter triggers | >5% of requests | Hourly |
| Cache hit rate | <40% | Daily |
| Token usage per query | >2x baseline | Daily |
| User satisfaction (if measured) | <4.0/5.0 | Weekly |

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Do not deploy without passing evaluation.
Remediate until standards are met.

No evaluation suite = No production deployment. No exceptions.

---

## END OF AI SCORE

# AI System Review Checklist -- Authoritative

Use this checklist to evaluate any AI system before deployment or handoff.
Every section must be completed. Incomplete reviews are invalid.
Skipping a section requires written justification approved by the system owner.

---

## Review Header

```
System/Feature: ________________________________
Reviewer: ________________________________
Date: ________________________________
Type: [ ] LLM Feature  [ ] RAG System  [ ] Agent  [ ] ML Pipeline  [ ] Multi-Agent
Stage: [ ] Design Review  [ ] Pre-Staging  [ ] Pre-Production  [ ] Post-Incident
```

---

## 1. Problem Definition & Model Justification

### Problem Statement Present?
[ ] Yes  [ ] No (STOP -- cannot proceed without problem statement)

### Problem Definition Check
```
Task type: ________________________________
Input format: ________________________________
Output format: ________________________________
Success criteria: ________________________________
Failure definition: ________________________________
Why AI (not rules): ________________________________
```

### Model Selection
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Task requirements documented | [ ] | [ ] | [ ] |
| Multiple models benchmarked | [ ] | [ ] | [ ] |
| Cost-quality tradeoff explicit | [ ] | [ ] | [ ] |
| Model version pinned | [ ] | [ ] | [ ] |
| Fallback model identified | [ ] | [ ] | [ ] |
| Fine-tuning vs prompting justified | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 2. Prompt Engineering

### Prompt Architecture
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Prompts versioned (not inline) | [ ] | [ ] | [ ] |
| System prompt separated from user prompt | [ ] | [ ] | [ ] |
| Prompts parameterized (no hardcoded values) | [ ] | [ ] | [ ] |
| Few-shot examples curated and tested | [ ] | [ ] | [ ] |
| Output format enforced (JSON mode / structured) | [ ] | [ ] | [ ] |
| Chain-of-thought used where appropriate | [ ] | [ ] | [ ] |

### Prompt Security
| Check | Pass | Fail |
|-------|------|------|
| Prompt injection defense present | [ ] | [ ] |
| User input sanitized before prompt insertion | [ ] | [ ] |
| System prompt not extractable | [ ] | [ ] |
| Indirect injection vectors considered | [ ] | [ ] |

### Prompt Testing
| Check | Pass | Fail |
|-------|------|------|
| Regression tests exist for prompts | [ ] | [ ] |
| Edge case inputs tested | [ ] | [ ] |
| Multilingual inputs tested (if applicable) | [ ] | [ ] |
| Long input handling tested | [ ] | [ ] |
| Empty/null input handling tested | [ ] | [ ] |

Notes:
```

```

---

## 3. RAG Pipeline (if applicable)

### Data Ingestion
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Source documents catalogued | [ ] | [ ] | [ ] |
| Chunking strategy documented | [ ] | [ ] | [ ] |
| Chunk size justified with testing | [ ] | [ ] | [ ] |
| Chunk overlap configured | [ ] | [ ] | [ ] |
| Metadata preserved in chunks | [ ] | [ ] | [ ] |
| Document freshness tracked | [ ] | [ ] | [ ] |

### Retrieval Quality
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Embedding model benchmarked | [ ] | [ ] | [ ] |
| Retrieval precision measured | [ ] | [ ] | [ ] |
| Retrieval recall measured | [ ] | [ ] | [ ] |
| Reranking layer present | [ ] | [ ] | [ ] |
| Top-k value justified | [ ] | [ ] | [ ] |
| Metadata filtering implemented | [ ] | [ ] | [ ] |

### Generation Quality
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Faithfulness measured | [ ] | [ ] | [ ] |
| Citations or attributions present | [ ] | [ ] | [ ] |
| Hallucination rate < 5% | [ ] | [ ] | [ ] |
| "I don't know" response for out-of-scope | [ ] | [ ] | [ ] |
| Answer relevance scored | [ ] | [ ] | [ ] |

### Index Management
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Index refresh automated | [ ] | [ ] | [ ] |
| Stale document detection | [ ] | [ ] | [ ] |
| Index versioning | [ ] | [ ] | [ ] |
| Rollback capability | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 4. Agent Architecture (if applicable)

### Tool Use
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Tools documented (name, purpose, parameters) | [ ] | [ ] | [ ] |
| Tool selection accuracy measured | [ ] | [ ] | [ ] |
| Tool parameter validation present | [ ] | [ ] | [ ] |
| Tool error handling implemented | [ ] | [ ] | [ ] |
| Tool timeout configured | [ ] | [ ] | [ ] |

### Control Flow
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Maximum iteration limit set | [ ] | [ ] | [ ] |
| Cycle detection implemented | [ ] | [ ] | [ ] |
| Timeout on total agent run | [ ] | [ ] | [ ] |
| Graceful degradation on tool failure | [ ] | [ ] | [ ] |
| State persistence across interruptions | [ ] | [ ] | [ ] |

### Escalation
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Human escalation path defined | [ ] | [ ] | [ ] |
| Escalation triggers documented | [ ] | [ ] | [ ] |
| High-stakes actions require confirmation | [ ] | [ ] | [ ] |
| Rollback capability for side effects | [ ] | [ ] | [ ] |

### Observability
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Full trace logging enabled | [ ] | [ ] | [ ] |
| Each step inspectable | [ ] | [ ] | [ ] |
| Token usage logged per step | [ ] | [ ] | [ ] |
| Latency logged per step | [ ] | [ ] | [ ] |
| Error chain visible | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 5. Evaluation & Testing

### Automated Evaluation
| Check | Pass | Fail |
|-------|------|------|
| Evaluation suite exists | [ ] | [ ] |
| Runs in CI before deployment | [ ] | [ ] |
| Covers known failure modes | [ ] | [ ] |
| Regression tests for past bugs | [ ] | [ ] |
| Golden dataset maintained | [ ] | [ ] |

### Human Evaluation
| Check | Pass | Fail |
|-------|------|------|
| Human eval protocol defined | [ ] | [ ] |
| Evaluator rubric documented | [ ] | [ ] |
| Inter-rater reliability measured | [ ] | [ ] |
| Evaluation frequency scheduled | [ ] | [ ] |

### Adversarial Testing
| Check | Pass | Fail |
|-------|------|------|
| Jailbreak attempts tested | [ ] | [ ] |
| Prompt injection tested | [ ] | [ ] |
| Malformed input tested | [ ] | [ ] |
| Boundary inputs tested (max length, unicode, etc) | [ ] | [ ] |
| Conflicting instruction tested | [ ] | [ ] |

### Bias & Fairness
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Demographic parity evaluated | [ ] | [ ] | [ ] |
| Output bias audited | [ ] | [ ] | [ ] |
| Training data bias assessed | [ ] | [ ] | [ ] |
| Mitigation strategies documented | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 6. Safety & Compliance

### Content Safety
| Check | Pass | Fail |
|-------|------|------|
| Input content filtering active | [ ] | [ ] |
| Output content filtering active | [ ] | [ ] |
| Toxicity detection active | [ ] | [ ] |
| Refusal behavior tested | [ ] | [ ] |
| Red team testing completed | [ ] | [ ] |

### Data Privacy
| Check | Pass | Fail |
|-------|------|------|
| PII detection implemented | [ ] | [ ] |
| PII not logged in plaintext | [ ] | [ ] |
| Data retention policy enforced | [ ] | [ ] |
| User consent mechanism present | [ ] | [ ] |
| Third-party data sharing documented | [ ] | [ ] |

### Access Control
| Check | Pass | Fail |
|-------|------|------|
| API rate limiting configured | [ ] | [ ] |
| Authentication required | [ ] | [ ] |
| Authorization per endpoint | [ ] | [ ] |
| API keys rotated on schedule | [ ] | [ ] |

Notes:
```

```

---

## 7. Cost & Performance

### Cost Management
| Check | Pass | Fail |
|-------|------|------|
| Cost per query tracked | [ ] | [ ] |
| Budget alerts configured | [ ] | [ ] |
| Token usage optimized | [ ] | [ ] |
| Caching implemented | [ ] | [ ] |
| Model routing active (if applicable) | [ ] | [ ] |
| Unit economics viable at scale | [ ] | [ ] |

### Performance
| Check | Pass | Fail |
|-------|------|------|
| Latency SLAs defined | [ ] | [ ] |
| P50/P95/P99 within SLA | [ ] | [ ] |
| Streaming for user-facing endpoints | [ ] | [ ] |
| Cold start mitigated | [ ] | [ ] |
| Timeout configuration present | [ ] | [ ] |
| Load tested at expected scale | [ ] | [ ] |

Notes:
```

```

---

## 8. Operational Readiness

### Monitoring
| Check | Pass | Fail |
|-------|------|------|
| Error rate monitoring active | [ ] | [ ] |
| Latency monitoring active | [ ] | [ ] |
| Cost monitoring active | [ ] | [ ] |
| Quality metric monitoring active | [ ] | [ ] |
| Alert routing configured | [ ] | [ ] |

### Incident Response
| Check | Pass | Fail |
|-------|------|------|
| Incident response plan documented | [ ] | [ ] |
| Kill switch available | [ ] | [ ] |
| Rollback procedure tested | [ ] | [ ] |
| On-call rotation defined | [ ] | [ ] |
| Post-incident review process defined | [ ] | [ ] |

### Documentation
| Check | Pass | Fail |
|-------|------|------|
| System architecture documented | [ ] | [ ] |
| API contracts documented | [ ] | [ ] |
| Prompt library documented | [ ] | [ ] |
| Runbook for common issues | [ ] | [ ] |
| Onboarding guide for new engineers | [ ] | [ ] |

Notes:
```

```

---

## 9. AI Score

Run full scoring from `eval/AIScore.md`:

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Model Selection Rigor | | |
| Prompt Engineering Quality | | |
| RAG Pipeline Quality | | |
| Agent Reliability | | |
| Evaluation Rigor | | |
| Safety & Alignment | | |
| Cost Efficiency | | |
| Latency Performance | | |

**Average:** ___
**Hard Fail Check:** [ ] Pass [ ] Fail
**Minimum passing: Average >= 4.0, no hard fail < 3**

---

## 10. Final Verdict

### Decision
[ ] **Approved for Production** -- All checks pass, score >= 4.0
[ ] **Approved for Staging** -- Minor issues, score >= 3.5
[ ] **Needs Remediation** -- Significant issues, score < 3.5
[ ] **Blocked** -- Safety or evaluation failures, cannot deploy

### Blocking Issues (if any)
```

```

### Required Remediation (with owner and deadline)
```

```

### Strengths
```

```

### Risks Accepted (if any, with justification)
```

```

---

## Signatures

```
Engineer: _________________ Date: _________
Reviewer: _________________ Date: _________
Safety Approver: _________________ Date: _________
```

---

## END OF REVIEW CHECKLIST

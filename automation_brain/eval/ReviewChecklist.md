# Automation Review Checklist -- Authoritative

Use this checklist to evaluate any automation before deployment or handoff.
Every section must be completed. Incomplete reviews are invalid.
Skipping a section requires written justification approved by the system owner.

---

## Review Header

```
Workflow/Integration: ________________________________
Reviewer: ________________________________
Date: ________________________________
Type: [ ] Scheduled  [ ] Event-Driven  [ ] Webhook  [ ] ETL  [ ] Approval Workflow  [ ] Multi-System Sync
Platform: [ ] n8n  [ ] Zapier  [ ] Custom Code  [ ] AWS Step Functions  [ ] Other: ___
Stage: [ ] Design Review  [ ] Pre-Staging  [ ] Pre-Production  [ ] Post-Incident
```

---

## 1. Purpose & Justification

### Business Case Present?
[ ] Yes  [ ] No (STOP -- cannot proceed without business case)

### Purpose Definition
```
What manual process does this replace: ________________________________
How often does the process run: ________________________________
Time saved per execution: ________________________________
Who benefits: ________________________________
What happens if the automation is down for 24 hours: ________________________________
```

### ROI Quick Check
| Check | Pass | Fail |
|-------|------|------|
| Manual process time documented | [ ] | [ ] |
| Automation execution frequency known | [ ] | [ ] |
| Build cost estimated | [ ] | [ ] |
| Break-even calculated | [ ] | [ ] |
| Maintenance cost estimated | [ ] | [ ] |

Notes:
```

```

---

## 2. Trigger & Scheduling

### Trigger Definition
```
Trigger type: [ ] Schedule (cron)  [ ] Webhook  [ ] Event  [ ] Manual  [ ] Polling
Trigger source: ________________________________
Trigger frequency: ________________________________
Expected payload/input: ________________________________
```

### Trigger Checks
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Trigger condition clearly defined | [ ] | [ ] | [ ] |
| Duplicate trigger handling | [ ] | [ ] | [ ] |
| Missed trigger detection | [ ] | [ ] | [ ] |
| Trigger backfill capability | [ ] | [ ] | [ ] |
| Webhook signature validation | [ ] | [ ] | [ ] |
| Cron schedule verified in all timezones | [ ] | [ ] | [ ] |
| Polling interval appropriate (not too frequent) | [ ] | [ ] | [ ] |

### Edge Cases
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| What happens if trigger fires twice rapidly | [ ] | [ ] | [ ] |
| What happens if trigger payload is malformed | [ ] | [ ] | [ ] |
| What happens if trigger fires during maintenance | [ ] | [ ] | [ ] |
| What happens if trigger source is down | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 3. Data Flow & Mapping

### Data Sources
| Source System | Data Retrieved | Auth Method | Rate Limits |
|--------------|---------------|-------------|-------------|
| | | | |
| | | | |
| | | | |

### Data Destinations
| Destination System | Data Written | Auth Method | Rate Limits |
|-------------------|-------------|-------------|-------------|
| | | | |
| | | | |
| | | | |

### Data Mapping
| Check | Pass | Fail |
|-------|------|------|
| Source-to-destination field mapping documented | [ ] | [ ] |
| Data type transformations specified | [ ] | [ ] |
| Null/empty handling defined | [ ] | [ ] |
| Default values documented | [ ] | [ ] |
| Validation rules on input data | [ ] | [ ] |
| Data format conversion tested (dates, currencies, etc.) | [ ] | [ ] |

### Data Integrity
| Check | Pass | Fail |
|-------|------|------|
| No data loss between source and destination | [ ] | [ ] |
| Data consistency verified end-to-end | [ ] | [ ] |
| Conflict resolution strategy defined | [ ] | [ ] |
| Data versioning or audit trail present | [ ] | [ ] |

Notes:
```

```

---

## 4. Reliability & Error Handling

### Retry Logic
| Check | Pass | Fail |
|-------|------|------|
| Retry implemented for transient errors | [ ] | [ ] |
| Exponential backoff configured | [ ] | [ ] |
| Maximum retry count defined | [ ] | [ ] |
| Retry does not cause duplicates (idempotent) | [ ] | [ ] |
| Different retry strategy for different error types | [ ] | [ ] |

### Error Handling
| Check | Pass | Fail |
|-------|------|------|
| All known error types handled | [ ] | [ ] |
| Error notification configured (Slack/email/PagerDuty) | [ ] | [ ] |
| Dead letter queue for failed items | [ ] | [ ] |
| Error context preserved (input, state, trace) | [ ] | [ ] |
| Human escalation path for unrecoverable errors | [ ] | [ ] |
| Partial failure handling (batch: some succeed, some fail) | [ ] | [ ] |

### Recovery
| Check | Pass | Fail |
|-------|------|------|
| Crash recovery: can resume from last checkpoint | [ ] | [ ] |
| Timeout configuration per step | [ ] | [ ] |
| Circuit breaker for downstream dependencies | [ ] | [ ] |
| Graceful degradation when non-critical step fails | [ ] | [ ] |

### Specific Error Scenarios Tested
| Scenario | Tested | Result |
|----------|--------|--------|
| Network timeout | [ ] | |
| Authentication expiry | [ ] | |
| Rate limit hit | [ ] | |
| Invalid input data | [ ] | |
| Downstream system unavailable | [ ] | |
| Disk/storage full | [ ] | |
| Out of memory | [ ] | |

Notes:
```

```

---

## 5. Idempotency & Deduplication

### Idempotency Checks
| Check | Pass | Fail |
|-------|------|------|
| Safe to re-run without side effects | [ ] | [ ] |
| Deduplication keys defined for external calls | [ ] | [ ] |
| Database operations use upsert or check-first | [ ] | [ ] |
| Email/notification deduplication present | [ ] | [ ] |
| Financial operations have transaction IDs | [ ] | [ ] |

### Deduplication Testing
| Test | Passed | Failed |
|------|--------|--------|
| Run workflow twice with same input | [ ] | [ ] |
| Verify no duplicate records created | [ ] | [ ] |
| Verify no duplicate notifications sent | [ ] | [ ] |
| Verify no duplicate API calls with side effects | [ ] | [ ] |
| Verify checkpoint/resume does not re-process completed items | [ ] | [ ] |

Notes:
```

```

---

## 6. Security

### Credential Management
| Check | Pass | Fail |
|-------|------|------|
| Credentials in secrets manager | [ ] | [ ] |
| No credentials in code or config files | [ ] | [ ] |
| Credentials rotation scheduled | [ ] | [ ] |
| API keys scoped to minimum permissions | [ ] | [ ] |
| Service accounts use least privilege | [ ] | [ ] |

### Data Security
| Check | Pass | Fail |
|-------|------|------|
| Data encrypted in transit (TLS) | [ ] | [ ] |
| Sensitive data not logged in plaintext | [ ] | [ ] |
| PII handling compliant | [ ] | [ ] |
| Input validation on external data | [ ] | [ ] |
| Output sanitized before downstream | [ ] | [ ] |

### Access Control
| Check | Pass | Fail |
|-------|------|------|
| Webhook endpoints authenticated | [ ] | [ ] |
| Admin access restricted | [ ] | [ ] |
| Audit logging for configuration changes | [ ] | [ ] |
| No shared credentials between environments | [ ] | [ ] |

Notes:
```

```

---

## 7. Performance & Scalability

### Current Performance
```
Average execution time: ________________________________
Records processed per run: ________________________________
Peak load handled: ________________________________
SLA (maximum acceptable time): ________________________________
```

### Performance Checks
| Check | Pass | Fail |
|-------|------|------|
| Execution time within SLA | [ ] | [ ] |
| Handles current load with headroom | [ ] | [ ] |
| Rate limits respected for all APIs | [ ] | [ ] |
| Database queries optimized (indexed, paginated) | [ ] | [ ] |
| Parallel processing used where appropriate | [ ] | [ ] |
| Queue management for burst processing | [ ] | [ ] |

### Scalability
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Can handle 10x current load | [ ] | [ ] | [ ] |
| Scaling strategy documented | [ ] | [ ] | [ ] |
| Bottleneck identified | [ ] | [ ] | [ ] |
| Cost at scale projected | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 8. Testing

### Test Coverage
| Check | Pass | Fail |
|-------|------|------|
| Unit tests for data transformations | [ ] | [ ] |
| Integration tests for each step | [ ] | [ ] |
| End-to-end test in staging | [ ] | [ ] |
| Error scenario tests | [ ] | [ ] |
| Idempotency tests | [ ] | [ ] |
| Load test (if high volume) | [ ] | [ ] |

### Test Environments
| Check | Pass | Fail |
|-------|------|------|
| Staging environment mirrors production | [ ] | [ ] |
| Test data representative of production | [ ] | [ ] |
| Tests do not affect production systems | [ ] | [ ] |
| Tests run before every deployment | [ ] | [ ] |

Notes:
```

```

---

## 9. Documentation & Observability

### Documentation
| Check | Pass | Fail |
|-------|------|------|
| Flow diagram present | [ ] | [ ] |
| Trigger conditions documented | [ ] | [ ] |
| Data mapping documented | [ ] | [ ] |
| Business logic documented | [ ] | [ ] |
| Error handling documented | [ ] | [ ] |
| Troubleshooting guide present | [ ] | [ ] |
| Runbook for on-call | [ ] | [ ] |

### Observability
| Check | Pass | Fail |
|-------|------|------|
| Structured logging on every step | [ ] | [ ] |
| Execution trace end-to-end | [ ] | [ ] |
| Metrics dashboard present | [ ] | [ ] |
| Alert routing configured | [ ] | [ ] |
| Historical execution data retained | [ ] | [ ] |

Notes:
```

```

---

## 10. Automation Score

Run full scoring from `eval/AutomationScore.md`:

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Reliability | | |
| Idempotency | | |
| Error Handling | | |
| Documentation | | |
| Maintainability | | |
| Performance | | |
| Security | | |
| ROI | | |

**Average:** ___
**Hard Fail Check:** [ ] Pass [ ] Fail
**Minimum passing: Average >= 4.0, no hard fail < 3**

---

## 11. Final Verdict

### Decision
[ ] **Approved for Production** -- All checks pass, score >= 4.0
[ ] **Approved for Staging** -- Minor issues, score >= 3.5
[ ] **Needs Remediation** -- Significant issues, score < 3.5
[ ] **Blocked** -- Security violation or silent failure risk

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
```

---

## END OF REVIEW CHECKLIST

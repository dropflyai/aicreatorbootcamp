# Automation Score -- Quality Enforcement (Authoritative)

This document defines how automation quality is evaluated.
Every workflow, integration, and automated process must be scored before deployment.

If quality is not measurable, it is not enforced.
If an automation fails silently, it has already failed critically.

---

## SCORING RULES (MANDATORY)

Each automation must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Reliability**
- **Error Handling**
- **Security**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (floor threshold)
- All failure conditions checked and cleared

### Deployment Gates

| Gate | Requirement |
|------|-------------|
| Development | Average >= 3.0, basic error handling present |
| Staging | Average >= 3.5, no hard fail < 3, retry logic tested |
| Production | Average >= 4.0, no hard fail < 4, monitoring active |
| Business Critical | Average >= 4.5, independent reliability audit complete |

---

## 1. RELIABILITY

**Question:**
Does the automation run successfully at least 99.9% of the time under normal conditions?

### What to Evaluate

- Historical success rate tracked and reported
- Retry logic implemented with exponential backoff
- Circuit breaker pattern for downstream dependencies
- Graceful handling of partial failures
- Recovery from interrupted executions (crash recovery)
- Idempotent restart capability after unexpected termination
- Health check endpoints or heartbeat monitoring
- Dependency health verified before execution begins
- Scheduled runs execute within acceptable time window
- No data loss on transient failures

### Scoring Guide

- **5** -- Uptime >99.99%, retry + circuit breaker, crash recovery tested, dependency pre-check, health monitoring, zero data loss guaranteed
- **4** -- Uptime >99.9%, retry logic with backoff, crash recovery present, health monitoring active
- **3** -- Uptime >99%, basic retry logic, some recovery capability, monitoring present
- **2** -- Uptime >95%, minimal retry, no crash recovery, basic monitoring
- **1** -- Frequent failures, no retry logic, no monitoring, data loss on failure

### Failure Conditions

- No retry logic = Score capped at 2
- No crash recovery = Score capped at 3
- Success rate not tracked = Score capped at 2
- Uptime <99% in production = Score capped at 2
- Data loss possible on failure = Score capped at 2

Score <4 --> Implement retry logic, crash recovery, and monitoring.

---

## 2. IDEMPOTENCY

**Question:**
Is the automation safe to re-run without creating duplicate side effects?

### What to Evaluate

- Re-running produces the same result as running once
- Duplicate detection implemented (dedup keys, unique constraints)
- External API calls are idempotent (idempotency keys used)
- Database operations use upsert or check-before-insert patterns
- File operations handle existing files correctly
- Email/notification sends have deduplication
- Payment or financial operations have transaction IDs
- Queue messages have deduplication windows
- Partial completion can be resumed without re-processing completed items
- State checkpointing for long-running processes

### Scoring Guide

- **5** -- Fully idempotent, dedup keys on all external calls, checkpoint/resume for long processes, tested with duplicate injection
- **4** -- Idempotent for primary operations, dedup on critical paths, partial resume supported
- **3** -- Most operations idempotent, some edge cases may duplicate, no checkpoint
- **2** -- Some idempotency, known duplicate scenarios exist, no dedup keys
- **1** -- Not idempotent, re-running creates duplicates, no dedup strategy

### Failure Conditions

- Re-running creates duplicate records = Score capped at 2
- Financial operations without transaction IDs = Score capped at 1
- No duplicate detection on critical paths = Score capped at 2
- Email/notification deduplication absent = Score capped at 3
- No checkpoint for processes >10 minutes = Score capped at 3

Score <4 --> Implement idempotency keys and deduplication.

---

## 3. ERROR HANDLING

**Question:**
Does the automation detect, report, and recover from errors without silent failure?

### What to Evaluate

- All error types anticipated and handled (network, auth, data, timeout, rate limit)
- Dead letter queue for unprocessable items
- Alert notification on failure (email, Slack, PagerDuty)
- Human escalation path for unrecoverable errors
- Error categorization (transient vs permanent, retriable vs terminal)
- Error context preserved (full stack trace, input data, state at failure)
- Partial failure handling (some items succeed, some fail)
- Error rate monitoring with trend detection
- Graceful degradation when non-critical components fail
- Error recovery runbook documented

### Scoring Guide

- **5** -- All errors handled, dead letter queue, alerts configured, human escalation, error categorization, full context, partial failure handling, runbook complete
- **4** -- Most errors handled, alerts on failure, dead letter queue, error context preserved, escalation path defined
- **3** -- Common errors handled, alerts present but incomplete, some context lost on error
- **2** -- Basic try/catch, some alerts, no dead letter queue, limited context
- **1** -- Errors swallowed or ignored, no alerts, silent failure possible

### Failure Conditions

- Automation fails silently = CRITICAL VIOLATION -- Score 1
- No error notification = Score capped at 2
- No dead letter queue for batch processing = Score capped at 3
- Error context not preserved = Score capped at 3
- No human escalation for unrecoverable errors = Score capped at 3
- No distinction between transient and permanent errors = Score capped at 3

Score <4 --> Implement comprehensive error handling with alerts and dead letter queue.

---

## 4. DOCUMENTATION

**Question:**
Can a new engineer understand, maintain, and troubleshoot this automation without the original author?

### What to Evaluate

- Flow diagram present (visual representation of the automation)
- Trigger conditions documented (what starts the automation, when, why)
- Data mapping documented (source fields to destination fields)
- Business logic documented (why each step exists, not just what)
- Configuration documented (environment variables, settings, thresholds)
- Error handling documented (what errors occur, how they are handled)
- Dependency map present (what systems does this automation touch)
- SLA documented (expected runtime, acceptable delay, failure tolerance)
- Troubleshooting guide present (common failures and fixes)
- Change log maintained (what changed, when, why, by whom)

### Scoring Guide

- **5** -- Flow diagram, trigger docs, data mapping, business logic, config docs, error docs, dependency map, SLA, troubleshooting guide, change log -- all current
- **4** -- Flow diagram, trigger docs, data mapping, business logic, config docs, troubleshooting guide -- all current
- **3** -- Some documentation exists but incomplete or partially outdated
- **2** -- Minimal documentation, mostly code comments
- **1** -- No documentation, tribal knowledge only

### Failure Conditions

- No documentation = UNMAINTAINABLE -- Score 1
- No flow diagram = Score capped at 3
- No trigger condition documentation = Score capped at 3
- Documentation >6 months stale = Score capped at 3
- No troubleshooting guide = Score capped at 3
- Business logic undocumented = Score capped at 3

Score <4 --> Create or update documentation before adding features.

---

## 5. MAINTAINABILITY

**Question:**
Can this automation be modified, extended, and debugged efficiently?

### What to Evaluate

- Modular design (discrete steps, single responsibility per module)
- Version controlled (Git, with meaningful commit history)
- Environment separation (dev, staging, production configs separate)
- Configuration externalized (not hardcoded values)
- Testable (unit tests for transforms, integration tests for flows)
- Logging sufficient for debugging (structured, leveled, searchable)
- Dependency versions pinned (no floating versions)
- Code follows consistent conventions (naming, structure, patterns)
- Feature flags for gradual rollout of changes
- Rollback capability (previous version deployable quickly)

### Scoring Guide

- **5** -- Modular, versioned, env-separated, externalized config, tested (unit + integration), structured logging, pinned deps, feature flags, rollback tested
- **4** -- Modular, versioned, env-separated, some tests, structured logging, rollback possible
- **3** -- Mostly modular, versioned, basic logging, limited tests
- **2** -- Monolithic, versioned but messy, minimal logging, no tests
- **1** -- Monolithic, not versioned, no logging, no tests, cannot be safely modified

### Failure Conditions

- Not version controlled = Score capped at 1
- No tests of any kind = Score capped at 2
- Hardcoded configuration values = Score capped at 3
- No structured logging = Score capped at 3
- Cannot rollback to previous version = Score capped at 3
- Monolithic design (cannot modify one part without risking others) = Score capped at 3

Score <4 --> Refactor into modular, tested, well-logged components.

---

## 6. PERFORMANCE

**Question:**
Does the automation complete within its SLA and handle expected load?

### What to Evaluate

- Execution time SLA defined and monitored
- Throughput sufficient for current and projected load
- Queue management for burst processing
- Parallel processing where appropriate (batch parallelism)
- Resource utilization monitored (CPU, memory, connections)
- Rate limiting respected for external APIs
- Backpressure handling (slow consumers do not crash)
- Database query performance optimized (indexes, pagination)
- Timeout configuration appropriate per operation
- Performance regression detected automatically

### Scoring Guide

- **5** -- SLA defined, throughput >2x current need, parallel processing, queue management, resource monitoring, rate limit handling, performance regression alerts
- **4** -- SLA defined, throughput meets current need with headroom, some parallelism, queue management present
- **3** -- SLA loosely defined, throughput meets current need, basic queue handling
- **2** -- No SLA, throughput barely adequate, no queue management, no parallelism
- **1** -- Slow, cannot handle current load, no optimization, timeouts frequent

### Failure Conditions

- No execution time SLA = Score capped at 3
- Cannot handle current load = Score capped at 2
- No rate limit handling for external APIs = Score capped at 3
- No timeout configuration = Score capped at 2
- Database queries without pagination for large datasets = Score capped at 3

Score <4 --> Define SLAs, implement queue management, optimize throughput.

---

## 7. SECURITY

**Question:**
Are credentials, data, and access controls properly managed?

### What to Evaluate

- Credentials stored in secrets manager (not code, not env files in repo)
- Credentials rotated on schedule (quarterly minimum)
- Least privilege principle (automation has only the permissions it needs)
- API keys scoped to minimum required access
- Audit logging for all actions with side effects
- Data encryption in transit (TLS)
- Data encryption at rest (where applicable)
- Input validation on all external data
- Output sanitization before passing to downstream systems
- Access to automation configuration restricted to authorized personnel

### Scoring Guide

- **5** -- Secrets manager, rotated quarterly, least privilege, scoped keys, full audit log, encryption in transit + at rest, input validation, output sanitization, access controlled
- **4** -- Secrets manager, rotation scheduled, least privilege mostly, audit logging present, encryption in transit, input validation
- **3** -- Credentials externalized but not rotated, basic access control, some audit logging
- **2** -- Credentials in environment variables (not committed but not managed), minimal access control
- **1** -- Credentials in plaintext in code or config files, no access control, no audit

### Failure Conditions

- Credentials in plaintext = SECURITY VIOLATION -- Score 1
- Credentials in version control = SECURITY VIOLATION -- Score 1
- No credential rotation in >1 year = Score capped at 2
- No audit logging for actions with side effects = Score capped at 3
- No input validation on external data = Score capped at 3
- Automation runs with admin/root privileges unnecessarily = Score capped at 2

Score <4 --> Implement secrets management, rotation, and audit logging.

---

## 8. ROI

**Question:**
Does the time saved by this automation justify the cost to build and maintain it?

### What to Evaluate

- Time saved per execution calculated (manual process time vs automation time)
- Execution frequency documented (daily, hourly, per event)
- Total time saved per month/year calculated
- Build cost documented (hours to develop)
- Maintenance cost estimated (hours per month to maintain)
- Break-even point calculated
- Error cost reduction quantified (fewer human errors)
- Scalability benefit documented (handles 10x volume without 10x cost)
- Opportunity cost considered (what else could the team build)
- Sunset criteria defined (when to retire the automation)

### Scoring Guide

- **5** -- Full ROI analysis, break-even <3 months, ongoing savings >5x maintenance cost, scalability proven, sunset criteria defined
- **4** -- ROI positive, break-even <6 months, savings >3x maintenance, scalability considered
- **3** -- ROI roughly positive, break-even ~12 months, savings estimated but not precise
- **2** -- ROI unclear, savings assumed but not measured, no break-even analysis
- **1** -- ROI negative or unknown, automation may cost more than manual process

### Failure Conditions

- No ROI analysis = Score capped at 3 (building without justification)
- Break-even >12 months without strategic justification = Score capped at 3
- Maintenance cost exceeds savings = Score capped at 2
- No sunset criteria = Score capped at 3

Score <4 --> Complete ROI analysis with break-even calculation.

---

## FINAL AUTOMATION SCORE DECISION

**Hard Fail Dimensions (Reliability, Error Handling, Security):**
- Score <3 --> IMMEDIATE REMEDIATION REQUIRED
- Security violation --> DEPLOYMENT BLOCKED

**All Dimensions:**
- Average score >= 4.0 --> AUTOMATION MAY DEPLOY
- Average score 3.5-3.9 --> STAGING ONLY, remediation plan required
- Average score < 3.5 --> NOT DEPLOYABLE

**Security:**
- Any security failure condition triggered --> DEPLOYMENT BLOCKED regardless of score

Scores must be stated explicitly before any deployment decision.

### Score Card Template

```markdown
## Automation Score: [Workflow/Integration Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Reliability | /5 | |
| Idempotency | /5 | |
| Error Handling | /5 | |
| Documentation | /5 | |
| Maintainability | /5 | |
| Performance | /5 | |
| Security | /5 | |
| ROI | /5 | |

**Average:** /5
**Hard Fail Check:** PASS / FAIL
**Security Check:** PASS / FAIL
**Verdict:** DEPLOY / STAGING ONLY / BLOCKED / REMEDIATION REQUIRED
**Blocking Issues:** [if any]
**Remediation Plan:** [if needed, with owner and deadline]
```

---

## SEVERITY CLASSIFICATION

### Critical (Deployment Blocked)

- Credentials in plaintext or version control
- Automation fails silently in production
- No error notification on failure
- Security vulnerability with data exposure risk
- Financial operations without idempotency
- Running with unnecessary admin privileges

### High (Must Fix Before Next Release)

- No dead letter queue for batch processing
- No retry logic on external API calls
- No audit logging for side-effect actions
- Cannot rollback to previous version
- No crash recovery mechanism
- Documentation entirely absent

### Medium (Tracked, Fix Within Sprint)

- Credential rotation overdue
- Performance SLA not defined
- Test coverage below 60%
- ROI analysis incomplete
- Logging insufficient for debugging
- No feature flags for changes

### Low (Improvement Backlog)

- Flow diagram missing but text docs present
- Change log not maintained
- Parallelism not implemented but throughput adequate
- Break-even analysis approximate
- Input validation incomplete for edge cases

---

## CONTINUOUS MONITORING REQUIREMENTS

After deployment, the following must be monitored continuously:

| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| Success rate | <99.9% | Real-time |
| Execution time | >2x SLA | Per execution |
| Error rate | >1% | Real-time |
| Dead letter queue depth | >0 for >1 hour | Every 15 minutes |
| Duplicate detection triggers | >1% of executions | Daily |
| Resource utilization | >80% capacity | Every 5 minutes |
| Credential expiration | <30 days remaining | Daily |
| Downstream dependency health | Any failure | Real-time |

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Do not deploy automations that fail silently.
Remediate until standards are met.

Silent failure is the worst failure. An automation you cannot trust
is worse than no automation at all.

---

## END OF AUTOMATION SCORE

# Engineering Accountability Protocol

This document defines the accountability framework for the Engineering Brain. It establishes how engineering decisions are tracked, evaluated, and improved over time. Accountability is not blame -- it is a system for learning from outcomes and maintaining engineering excellence.

---

## Core Principles

1. **Every decision has an owner.** No engineering decision should be made without a clear accountable party.
2. **Decisions are documented before execution.** The rationale must be recorded while context is fresh, not reconstructed after the fact.
3. **Outcomes are measured against predictions.** When we make tradeoffs, we state what we expect. Later, we check if reality matched.
4. **Failures are learning opportunities.** Blameless postmortems identify systemic issues, not individuals.
5. **Theory informs practice.** Engineering decisions should reference theoretical foundations where applicable. "We chose AP because of CAP" is accountable. "It seemed right" is not.

---

## Decision Accountability Framework

### Architecture Decision Records (ADRs)

Every significant engineering decision must be recorded as an ADR with the following structure:

```
# ADR-{number}: {title}

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-{number}

## Context
What is the issue that we are seeing that motivates this decision?

## Decision
What is the change that we are proposing and/or doing?

## Theoretical Basis
What theoretical results support this decision?
(Reference specific theory files and theorems)

## Consequences
What becomes easier or more difficult because of this change?

## Tradeoffs
What are we giving up? What is the cost?

## Metrics
How will we measure whether this decision was correct?
What signals would indicate we should revisit?

## Owner
Who is accountable for this decision?

## Review Date
When will we evaluate the outcome of this decision?
```

### Decision Categories and Review Cadence

| Category | Examples | Review Cadence |
|----------|----------|----------------|
| Architecture | Service boundaries, database selection, communication patterns | Quarterly |
| Infrastructure | Cloud provider, deployment strategy, monitoring stack | Semi-annually |
| Process | CI/CD pipeline, review process, testing strategy | Quarterly |
| Technology | Language/framework selection, library adoption | Semi-annually |
| Data | Schema design, data model, migration strategy | Monthly (first 3 months), then quarterly |

---

## Quality Gates

### Pre-Merge Quality Gate

Before any code is merged, the following must pass:

| Gate | Automated? | Threshold | Escalation |
|------|-----------|-----------|------------|
| All tests pass | Yes (CI) | 100% | Block merge |
| Linter passes | Yes (CI) | Zero warnings | Block merge |
| Type checker passes | Yes (CI) | Zero errors | Block merge |
| Security scan | Yes (CI) | Zero critical/high | Block merge |
| Dependency audit | Yes (CI) | Zero critical CVEs | Block merge |
| Code review approval | No | At least 1 approval | Block merge |
| Review checklist | No | All CRITICAL items pass | Block merge |
| Test coverage | Yes (CI) | No decrease from baseline | Warning (non-blocking) |
| Complexity increase | Yes (CI) | No function above cognitive complexity 15 | Warning (non-blocking) |

### Pre-Deploy Quality Gate

Before deploying to production:

| Gate | Check | Threshold |
|------|-------|-----------|
| Staging verification | Smoke tests pass in staging | 100% |
| Performance check | P99 latency does not regress > 10% | Measured |
| Database migration | Forward and backward migration tested | Both pass |
| Rollback plan | Documented and executable | Exists |
| Feature flag | High-risk changes behind flag | Enabled |

### Post-Deploy Quality Gate

After deploying to production:

| Gate | Check | Timeline | Action if Failed |
|------|-------|----------|-----------------|
| Smoke tests | Core user journeys pass | 5 minutes | Auto-rollback |
| Error rate | Does not exceed baseline + 0.1% | 15 minutes | Alert on-call |
| Latency | P99 does not exceed baseline + 20% | 15 minutes | Alert on-call |
| Business metrics | No anomalous drop | 1 hour | Investigate |

---

## Incident Accountability

### Severity Classification

| Severity | Definition | Response Time | Communication |
|----------|-----------|---------------|---------------|
| SEV-1 | System down, all users affected | 15 minutes | All-hands, executive notification |
| SEV-2 | Major feature broken, > 10% users affected | 30 minutes | Team notification |
| SEV-3 | Minor feature broken, < 10% users affected | 4 hours | Ticket created |
| SEV-4 | Cosmetic issue, no functionality impact | Next sprint | Ticket created |

### Blameless Postmortem Protocol

Required for all SEV-1 and SEV-2 incidents. Optional for SEV-3.

**Template:**

```
# Incident Postmortem: {title}

## Summary
One-paragraph summary of what happened.

## Timeline
Chronological list of events with timestamps.

## Root Cause
What was the underlying cause? (Use "5 Whys" technique)

## Contributing Factors
What conditions allowed this to happen?
- Was there a theoretical principle we violated? (Reference theory files)
- Was there a quality gate that should have caught this?
- Was there a monitoring gap?

## Impact
- Duration: {time}
- Users affected: {count}
- Revenue impact: {estimate}
- Data impact: {description}

## What Went Well
What worked as designed during the incident?

## What Went Wrong
What failed or was missing?

## Action Items
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|
| ... | ... | ... | ... |

## Lessons Learned
What should we do differently? What theory should we have applied?

## Prevention
How do we prevent this class of incident from recurring?
```

### Postmortem Review Cycle

1. **Draft postmortem:** Within 48 hours of incident resolution.
2. **Team review:** Within 1 week. All team members read and comment.
3. **Action item tracking:** Weekly check-ins until all items complete.
4. **Effectiveness review:** 3 months later, verify that preventive measures worked.

---

## Engineering Metrics Accountability

### DORA Metrics (Track Monthly)

| Metric | Elite | High | Medium | Low |
|--------|-------|------|--------|-----|
| Deployment Frequency | On-demand (multiple/day) | Weekly-monthly | Monthly-semi-annually | < Semi-annually |
| Lead Time for Changes | < 1 hour | 1 day - 1 week | 1 week - 1 month | > 1 month |
| Time to Restore Service | < 1 hour | < 1 day | < 1 week | > 1 week |
| Change Failure Rate | < 5% | 5-10% | 10-15% | > 15% |

**Accountability:** Track these metrics monthly. If any metric drops more than one tier, conduct a team retrospective to identify causes and create action items.

### Technical Debt Accountability

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| SQALE TD Ratio | < 5% | 5-10% | > 10% |
| Functions with cognitive complexity > 15 | < 5% | 5-10% | > 10% |
| Dependencies with known vulnerabilities | 0 critical | 0 critical, < 5 high | Any critical |
| Test coverage (business logic) | > 80% | 60-80% | < 60% |
| Build time | < 5 minutes | 5-15 minutes | > 15 minutes |

**Accountability:** Review these metrics bi-weekly. Any metric in Red requires an action plan within 1 sprint.

---

## Knowledge Accountability

### Theory Application Tracking

When making decisions that have theoretical implications, document the theory applied:

```
Decision: Use eventual consistency for user preferences
Theory Applied: CAP theorem (distributed_systems.md) - chose AP during partition
Theory Applied: PACELC (distributed_systems.md) - chose EL (latency over consistency)
Justification: User preferences are not safety-critical. Stale reads are acceptable.
Review: Validated after 3 months -- no user complaints about stale preferences.
```

### Learning Accountability

Each quarter, the Engineering Brain should demonstrate growth in at least one theory dimension (as measured by the EngineeringScore.md rubric). Track:

| Quarter | Focus Area | Starting Score | Ending Score | Evidence |
|---------|-----------|---------------|-------------|----------|
| Q1 | Distributed Systems | 3 | 4 | Applied Raft consensus in new service, passed BenchmarkTests Q2, Q5, Q11 |
| Q2 | Performance | 3 | 4 | Applied queueing theory to capacity planning, reduced P99 by 40% |

---

## Escalation Protocol

### When to Escalate

| Situation | Escalation |
|-----------|-----------|
| Quality gate cannot be met and deadline is imminent | Escalate to engineering lead. Document the debt being taken and schedule remediation. |
| Architecture decision has no clear winner | Document both options with tradeoffs. Escalate to architecture review. Time-box the decision. |
| Incident root cause is systemic (not a one-off) | Escalate to engineering leadership. Request dedicated remediation sprint. |
| Technical debt ratio exceeds 15% | Escalate to product/engineering leadership. Request debt reduction allocation (20% of sprint capacity). |
| Theory knowledge gap is causing repeated mistakes | Schedule study group or pair programming session. Reference specific theory files. |

### Escalation Does Not Mean Failure

Escalation is a sign of maturity. Not escalating when you should is a failure. The Engineering Brain values transparency and early communication over heroic individual effort.

---

## Continuous Improvement

### Quarterly Engineering Review

Every quarter, conduct a review covering:

1. **Metrics review:** DORA metrics, tech debt metrics, incident metrics.
2. **ADR review:** Revisit decisions scheduled for review. Were outcomes as expected?
3. **Postmortem patterns:** Are there recurring themes across incidents?
4. **Theory gaps:** Where did lack of theoretical knowledge cause problems?
5. **Process effectiveness:** Are quality gates catching problems? Are they too restrictive?
6. **Score update:** Re-evaluate the EngineeringScore across all 8 dimensions.

### Improvement Cycle

```
Measure -> Identify Gaps -> Create Action Plan -> Execute -> Measure Again
```

This cycle applies at every level:
- Individual: personal engineering score improvement.
- Team: DORA metrics and incident rates.
- System: availability, performance, and technical debt.
- Knowledge: theory benchmark scores.

---

## Commitments

The Engineering Brain commits to:

1. Never merging code that fails a CRITICAL quality gate.
2. Never deploying without a rollback plan.
3. Conducting blameless postmortems for all significant incidents.
4. Documenting all architectural decisions with theoretical basis.
5. Tracking and reducing technical debt systematically.
6. Continuously improving engineering scores across all 8 dimensions.
7. Referencing theory when making engineering decisions.
8. Asking for help (escalating) when uncertain rather than guessing.

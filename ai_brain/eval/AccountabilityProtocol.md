# AI Brain Accountability Protocol -- Authoritative

This document defines accountability standards for AI systems.
Every AI deployment has an owner. Every failure has a response.
Every decision has a record. No exceptions.

Accountability without enforcement is performance.
Enforcement without measurement is guessing.

---

## CORE PRINCIPLES

1. **Every AI system has a named owner** -- not a team, a person
2. **Every deployment decision is recorded** -- with rationale
3. **Every failure triggers a response** -- proportional to severity
4. **Every metric has a threshold** -- crossing it triggers action
5. **Every exception is documented** -- with expiration date
6. **Silence is not approval** -- unmonitored systems are unacceptable

---

## OWNERSHIP MODEL

### System Owner Responsibilities

The system owner is accountable for:

| Responsibility | Frequency | Evidence Required |
|---------------|-----------|-------------------|
| Evaluation suite passing | Every deployment | CI log |
| Safety checks passing | Every deployment | Safety report |
| Cost within budget | Weekly review | Cost dashboard |
| Latency within SLA | Continuous monitoring | Alert configuration |
| Hallucination rate within threshold | Daily check | Quality dashboard |
| Incident response | Within SLA | Incident record |
| Model version management | Per update | Change log |
| Prompt version management | Per update | Version history |

### Ownership Transfer Protocol

When ownership transfers:
1. Full system walkthrough with new owner (recorded)
2. All credentials and access transferred
3. All monitoring and alert routing updated
4. New owner signs accountability acknowledgment
5. 2-week shadow period where both owners are on-call
6. Transfer logged in system registry

### Ownership Gaps

- System with no owner = **DEPLOYMENT BLOCKED**
- Owner leaves without transfer = **Escalate to engineering lead within 24 hours**
- Shared ownership (no single person) = **Not acceptable, assign primary**

---

## DEPLOYMENT ACCOUNTABILITY

### Pre-Deployment Requirements

Before any AI system reaches production:

| Requirement | Owner | Verification |
|-------------|-------|--------------|
| Evaluation suite passes | AI Engineer | CI pipeline |
| Safety review complete | Safety Reviewer | Signed checklist |
| Cost projection approved | System Owner | Budget sign-off |
| Latency SLA defined | System Owner | SLA document |
| Monitoring configured | Platform Engineer | Alert test fired |
| Rollback tested | AI Engineer | Rollback drill log |
| Documentation current | AI Engineer | Doc review date |
| Incident response plan | System Owner | Plan document |

### Deployment Record

Every deployment must produce a record containing:

```
System: ________________________________
Version: ________________________________
Deployer: ________________________________
Date/Time: ________________________________
Model Version: ________________________________
Prompt Version: ________________________________
Evaluation Results: ________________________________
Safety Review: [ ] Passed [ ] Waived (justification: ___)
Change Summary: ________________________________
Rollback Plan: ________________________________
Monitoring Verified: [ ] Yes [ ] No
```

### Deployment Without Evaluation

Deploying an AI system without passing evaluation is a **Critical Violation**.

Consequences:
1. Deployment must be rolled back within 1 hour
2. System owner must write incident report
3. Root cause: why was evaluation skipped?
4. Preventive measure: how to prevent recurrence
5. Review with engineering lead within 48 hours

---

## INCIDENT RESPONSE ACCOUNTABILITY

### Severity Levels

| Severity | Definition | Response Time | Resolution Time |
|----------|-----------|---------------|-----------------|
| SEV-1 | Safety failure, data breach, widespread harm | 15 minutes | 4 hours |
| SEV-2 | Feature broken for all users, SLA breach | 1 hour | 8 hours |
| SEV-3 | Feature degraded, some users affected | 4 hours | 24 hours |
| SEV-4 | Minor issue, workaround available | 24 hours | 1 week |

### AI-Specific Incident Types

| Incident Type | Severity | Required Response |
|--------------|----------|-------------------|
| Hallucination causing user harm | SEV-1 | Kill switch, notify users, root cause |
| PII exposure in AI output | SEV-1 | Kill switch, compliance notification, audit |
| Prompt injection exploitation | SEV-1 | Block vector, patch defense, security review |
| Agent infinite loop with side effects | SEV-2 | Stop agent, undo side effects, add prevention |
| Cost spike >5x normal | SEV-2 | Rate limit, investigate, add budget cap |
| Latency SLA breach >1 hour | SEV-2 | Scale or degrade, investigate root cause |
| Hallucination rate >5% | SEV-3 | Investigation, evaluation, potential rollback |
| Model provider outage | SEV-3 | Activate fallback model, monitor |
| Evaluation suite failing | SEV-3 | Block deployments, fix evaluation |
| Bias detected in output | SEV-3 | Investigation, mitigation, audit |

### Incident Record Requirements

Every AI incident must produce:

```
Incident ID: ________________________________
Severity: SEV-___
System: ________________________________
Detected By: [ ] Monitoring [ ] User Report [ ] Internal [ ] External
Detection Time: ________________________________
Response Time: ________________________________
Resolution Time: ________________________________

Timeline:
- [time] Event description
- [time] Event description

Root Cause: ________________________________
Impact: ________________________________
Users Affected: ________________________________
Data Affected: ________________________________

Immediate Fix: ________________________________
Permanent Fix: ________________________________
Prevention: ________________________________

Owner: ________________________________
Reviewer: ________________________________
```

### Post-Incident Review

Required for SEV-1 and SEV-2:

1. Post-incident review within 48 hours
2. All stakeholders present
3. Timeline reconstructed from logs
4. Root cause identified (not symptoms)
5. Action items assigned with owners and deadlines
6. Follow-up review when action items complete
7. Learnings documented in shared knowledge base

---

## QUALITY ACCOUNTABILITY

### Continuous Quality Monitoring

| Metric | Owner | Check Frequency | Alert Threshold | Action |
|--------|-------|-----------------|-----------------|--------|
| Hallucination rate | AI Engineer | Daily | >3% | Investigate |
| Faithfulness score | AI Engineer | Daily | <90% | Evaluate pipeline |
| User satisfaction | Product Owner | Weekly | <4.0/5.0 | Root cause analysis |
| Safety filter triggers | Safety Owner | Hourly | >5% | Review filter rules |
| Error rate | Platform Engineer | Real-time | >1% | Page on-call |
| Latency P95 | Platform Engineer | Real-time | >SLA | Scale or degrade |
| Cost per query | System Owner | Daily | >2x baseline | Optimize |
| Evaluation pass rate | AI Engineer | Per deployment | <100% | Block deployment |

### Quality Regression Response

When quality drops below threshold:

1. **Hour 0-1:** Alert received, owner acknowledges
2. **Hour 1-4:** Root cause investigation begins
3. **Hour 4-8:** Diagnosis complete, fix proposed
4. **Hour 8-24:** Fix implemented and verified
5. **Hour 24-48:** Monitoring confirms fix holds
6. **Day 7:** Retrospective on root cause and prevention

If quality is not restored within 48 hours:
- Escalate to engineering lead
- Consider rollback to last known good version
- Temporary feature flag to disable degraded feature

---

## COST ACCOUNTABILITY

### Budget Management

| Control | Implementation | Owner |
|---------|---------------|-------|
| Per-query cost tracking | Logging middleware | Platform Engineer |
| Daily cost dashboard | Automated report | System Owner |
| Budget alerts | Threshold notifications | System Owner |
| Hard budget cap | Rate limiting at cap | Platform Engineer |
| Monthly cost review | Meeting with finance | System Owner |

### Cost Overrun Response

| Overrun Level | Response | Timeline |
|---------------|----------|----------|
| >120% of budget | Investigation and optimization plan | 48 hours |
| >150% of budget | Immediate optimization, feature scoping | 24 hours |
| >200% of budget | Emergency rate limiting, escalation to leadership | 4 hours |
| >300% of budget | Kill switch, post-incident review | Immediate |

### Cost Accountability Record

Monthly cost review must document:

```
Month: ________________________________
System: ________________________________
Budget: $________________________________
Actual: $________________________________
Variance: ____%

Top Cost Drivers:
1. ________________________________
2. ________________________________
3. ________________________________

Optimizations Applied:
1. ________________________________
2. ________________________________

Optimizations Planned:
1. ________________________________ (deadline: ___)
2. ________________________________ (deadline: ___)

Projection Next Month: $________________________________
```

---

## SAFETY ACCOUNTABILITY

### Safety Review Cadence

| Review Type | Frequency | Owner | Output |
|-------------|-----------|-------|--------|
| Automated safety checks | Every deployment | CI pipeline | Pass/fail log |
| Red team exercise | Quarterly | Security team | Vulnerability report |
| Bias audit | Quarterly | AI Ethics lead | Bias report |
| Compliance review | Semi-annually | Legal/Compliance | Compliance certificate |
| Third-party audit | Annually | External auditor | Audit report |

### Safety Violation Escalation

```
Level 1: Automated detection triggers alert
    |
    v
Level 2: System owner investigates (within response SLA)
    |
    v
Level 3: Safety team reviews (within 24 hours for SEV-1/2)
    |
    v
Level 4: Engineering lead decision (deploy fix, rollback, or kill switch)
    |
    v
Level 5: Executive notification (for SEV-1 with user impact)
```

### Safety Exception Process

If a safety check must be bypassed:

1. Written justification from system owner
2. Risk assessment by safety team
3. Approval from engineering lead
4. Time-limited exception (maximum 30 days)
5. Exception logged with expiration date
6. Automated reminder at expiration
7. Exception review: extend (with justification) or enforce

---

## DOCUMENTATION ACCOUNTABILITY

### Required Documentation

Every AI system must maintain:

| Document | Update Trigger | Staleness Threshold |
|----------|---------------|---------------------|
| System architecture | Any architecture change | 90 days |
| API documentation | Any API change | 30 days |
| Prompt library | Any prompt change | Immediate |
| Evaluation results | Every deployment | Per deployment |
| Cost report | Monthly | 30 days |
| Incident log | Every incident | Per incident |
| Runbook | Any operational change | 90 days |

### Documentation Debt

Documentation more than 2x staleness threshold old:
- System flagged as "documentation debt critical"
- No new features until documentation is current
- Owner must schedule documentation sprint

---

## AUDIT TRAIL

### What Must Be Logged

| Event | Retention | Access |
|-------|-----------|--------|
| Every deployment | 1 year | Engineering team |
| Every model change | 1 year | Engineering team |
| Every prompt change | 1 year | Engineering team |
| Every safety incident | 5 years | Engineering + Legal |
| Every cost overrun | 1 year | Engineering + Finance |
| Every exception granted | 1 year | Engineering lead |
| Every ownership transfer | Permanent | Engineering team |
| Every evaluation result | 1 year | Engineering team |

### Audit Review

- Quarterly audit of all AI systems by engineering lead
- Annual audit by external party (for production systems with user impact)
- Audit findings create action items with owners and deadlines

---

## ESCALATION MATRIX

| Situation | First Contact | Escalation | Final Authority |
|-----------|--------------|------------|-----------------|
| Quality regression | System Owner | AI Lead | Engineering Lead |
| Safety incident | System Owner | Safety Team | CTO |
| Cost overrun | System Owner | Finance | Engineering Lead |
| Evaluation failure | AI Engineer | System Owner | AI Lead |
| Documentation debt | AI Engineer | System Owner | Engineering Lead |
| Ownership gap | Engineering Lead | CTO | CEO |

---

## ACCOUNTABILITY REVIEW CADENCE

| Review | Frequency | Attendees | Output |
|--------|-----------|-----------|--------|
| System health check | Weekly | System Owner + AI Engineer | Status report |
| Quality review | Bi-weekly | AI Team | Quality dashboard |
| Cost review | Monthly | System Owner + Finance | Cost report |
| Safety review | Quarterly | Safety Team + AI Lead | Safety report |
| Full system audit | Annually | All stakeholders | Audit report |

---

## ENFORCEMENT

- Accountability is mandatory, not optional
- Every requirement in this document must be met or explicitly exempted
- Exemptions expire and must be renewed
- Repeated violations trigger escalation
- This protocol is reviewed and updated quarterly

---

## END OF ACCOUNTABILITY PROTOCOL

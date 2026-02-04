# Automation Brain Accountability Protocol -- Authoritative

This document defines accountability standards for automation systems.
Every automation has an owner. Every failure has a response.
Every silent failure is a critical violation. No exceptions.

An automation you cannot trust is worse than no automation at all.
Trust requires measurement, monitoring, and accountability.

---

## CORE PRINCIPLES

1. **Every automation has a named owner** -- not a team, a person
2. **Every automation has a documented purpose** -- why it exists, what it replaces
3. **Every failure produces a notification** -- silent failure is unacceptable
4. **Every automation has an SLA** -- expected runtime, acceptable delay, failure tolerance
5. **Every side effect is tracked** -- emails sent, records created, payments processed
6. **Unused automations are retired** -- no zombie workflows

---

## OWNERSHIP MODEL

### Automation Owner Responsibilities

The automation owner is accountable for:

| Responsibility | Frequency | Evidence Required |
|---------------|-----------|-------------------|
| Automation runs successfully | Continuous monitoring | Success rate dashboard |
| Error handling works correctly | Every deployment | Test results |
| Documentation is current | Every change | Doc review date |
| Security credentials rotated | Quarterly | Rotation log |
| ROI still positive | Quarterly review | ROI calculation |
| Monitoring and alerts functional | Monthly test | Alert test log |
| Disaster recovery tested | Semi-annually | DR drill log |
| Dependencies still healthy | Monthly check | Dependency health report |

### Automation Registry

Every automation in production must be registered:

```
Automation Name: ________________________________
Owner: ________________________________
Purpose: ________________________________
Trigger: ________________________________
Frequency: ________________________________
Criticality: [ ] P0 (business critical)  [ ] P1 (important)  [ ] P2 (helpful)  [ ] P3 (nice to have)
Systems Touched: ________________________________
Expected Runtime: ________________________________
Last Reviewed: ________________________________
Next Review: ________________________________
Sunset Date (if applicable): ________________________________
```

### Ownership Gaps

- Automation with no owner = **Must be assigned within 48 hours or disabled**
- Owner leaves without transfer = **Escalate to engineering lead within 24 hours**
- Automation not in registry = **Register immediately or disable**

---

## DEPLOYMENT ACCOUNTABILITY

### Pre-Deployment Requirements

Before any automation reaches production:

| Requirement | Owner | Verification |
|-------------|-------|--------------|
| Error handling tested | Engineer | Test results |
| Idempotency verified | Engineer | Dedup test results |
| Monitoring configured | Engineer | Alert test fired |
| Documentation complete | Engineer | Doc review |
| Security review passed | Security | Review sign-off |
| Rollback tested | Engineer | Rollback drill log |
| ROI justified | Owner | ROI document |
| Stakeholders notified | Owner | Notification record |

### Deployment Record

Every deployment must produce:

```
Automation: ________________________________
Version: ________________________________
Deployer: ________________________________
Date/Time: ________________________________
Change Summary: ________________________________
Tests Passed: [ ] Unit  [ ] Integration  [ ] E2E  [ ] Idempotency
Monitoring Verified: [ ] Yes  [ ] No
Rollback Plan: ________________________________
Stakeholders Notified: [ ] Yes  [ ] No
```

### Deployment Without Testing

Deploying an automation without passing tests is a **Critical Violation**.

Consequences:
1. Automation must be disabled within 1 hour
2. Owner must write incident report
3. Root cause: why was testing skipped
4. Preventive measure: how to prevent recurrence
5. Review with engineering lead within 48 hours

---

## FAILURE RESPONSE ACCOUNTABILITY

### Severity Levels

| Severity | Definition | Response Time | Resolution Time |
|----------|-----------|---------------|-----------------|
| SEV-1 | Financial data loss, compliance breach, widespread impact | 15 minutes | 4 hours |
| SEV-2 | Business process blocked, data inconsistency | 1 hour | 8 hours |
| SEV-3 | Automation degraded, manual workaround available | 4 hours | 24 hours |
| SEV-4 | Minor issue, no business impact | 24 hours | 1 week |

### Automation-Specific Incident Types

| Incident Type | Severity | Required Response |
|--------------|----------|-------------------|
| Silent failure (no alert fired) | SEV-1 | Fix alerting, retroactive data check, root cause |
| Duplicate records created at scale | SEV-1 | Stop automation, dedup, fix idempotency |
| Credentials exposed in logs | SEV-1 | Rotate credentials, scrub logs, security review |
| Financial automation incorrect | SEV-1 | Stop automation, reconcile, notify finance |
| Automation loop (re-triggering itself) | SEV-2 | Kill switch, undo side effects, add loop prevention |
| Data sync inconsistency | SEV-2 | Stop sync, reconcile, fix mapping |
| Rate limit causing cascade failure | SEV-2 | Reduce rate, fix coordination, add circuit breaker |
| Missed scheduled run (P0 automation) | SEV-2 | Manual run, fix scheduler, add missed-run detection |
| Slow execution (>2x SLA) | SEV-3 | Investigate bottleneck, optimize |
| Non-critical automation failing | SEV-3 | Fix error, verify no data impact |
| Documentation stale | SEV-4 | Schedule documentation update |

### Incident Record Requirements

Every automation incident must produce:

```
Incident ID: ________________________________
Severity: SEV-___
Automation: ________________________________
Detected By: [ ] Monitoring  [ ] User Report  [ ] Manual Check  [ ] External
Detection Time: ________________________________
Response Time: ________________________________
Resolution Time: ________________________________

Silent Failure? [ ] Yes  [ ] No
If Yes -- Why Was It Silent: ________________________________

Timeline:
- [time] Event description
- [time] Event description

Root Cause: ________________________________
Impact: ________________________________
Records Affected: ________________________________
Side Effects Occurred: ________________________________

Immediate Fix: ________________________________
Permanent Fix: ________________________________
Prevention: ________________________________

Owner: ________________________________
Reviewer: ________________________________
```

### Silent Failure Protocol

Silent failure is the highest-priority automation failure. When detected:

1. **Hour 0:** Emergency alert to owner and engineering lead
2. **Hour 0-1:** Determine blast radius (how long was it silent, what data is affected)
3. **Hour 1-4:** Retroactive data audit (what was missed, what is inconsistent)
4. **Hour 4-8:** Fix the monitoring gap that allowed silent failure
5. **Hour 8-24:** Run reconciliation to fix affected data
6. **Day 2-3:** Post-incident review with mandatory action items
7. **Day 7:** Verify monitoring fix catches the failure mode

Every silent failure must produce a monitoring improvement. If the same
automation fails silently twice, it must be rebuilt with monitoring-first design.

---

## HEALTH MONITORING ACCOUNTABILITY

### Required Monitoring Per Automation

| Metric | Owner | Alert Threshold | Check Frequency |
|--------|-------|-----------------|-----------------|
| Success rate | Engineer | <99.9% for P0, <99% for P1 | Real-time |
| Execution time | Engineer | >2x SLA | Per execution |
| Error rate | Engineer | >1% | Real-time |
| Missed runs | Engineer | Any for P0/P1 | Expected schedule |
| Dead letter queue depth | Engineer | >0 for >1 hour | Every 15 minutes |
| Duplicate detection rate | Engineer | >0.5% | Daily |
| Data consistency | Owner | Any drift detected | Daily |
| Credential expiration | Engineer | <30 days remaining | Daily |

### Weekly Health Report

Every automation must contribute to a weekly health report:

```
Week of: ________________________________
Total Automations: ___
Healthy: ___  Degraded: ___  Failed: ___  Unknown: ___

Top Issues This Week:
1. ________________________________
2. ________________________________
3. ________________________________

Automations Not Run As Expected:
- ________________________________

Longest Dead Letter Queue:
- ________________________________

Upcoming Credential Expirations:
- ________________________________
```

### Zombie Automation Detection

An automation is a "zombie" if:
- It has not run in >2x its expected interval
- It runs but produces no output
- Its downstream consumers are gone
- Nobody can explain what it does

Zombie automations must be:
1. Identified in monthly review
2. Investigated (does anyone need it?)
3. Either documented and kept, or disabled and archived
4. Never left in unknown state

---

## IDEMPOTENCY ACCOUNTABILITY

### Idempotency Requirements By Type

| Automation Type | Idempotency Requirement | Testing Frequency |
|----------------|------------------------|-------------------|
| Financial (payments, invoicing) | Mandatory, transaction IDs | Every deployment |
| Data sync (CRM, records) | Mandatory, dedup keys | Every deployment |
| Notifications (email, SMS) | Mandatory, dedup window | Every deployment |
| Reporting (dashboards, exports) | Recommended, last-write-wins | Monthly |
| Internal tooling | Recommended | Quarterly |

### Idempotency Verification

Every deployment of an automation with side effects must include:

1. Run automation twice with identical input
2. Verify no duplicate side effects
3. Document the dedup mechanism used
4. Log verification result

Failure to verify idempotency before deploying an automation with side effects
is a **High Severity** violation.

---

## COST ACCOUNTABILITY

### Cost Tracking

| Control | Implementation | Owner |
|---------|---------------|-------|
| Per-automation cost tracking | Execution logs with cost | Engineer |
| Monthly cost summary | Automated report | Owner |
| ROI review | Quarterly analysis | Owner |
| Cost anomaly detection | Alert on >2x normal cost | Engineer |

### ROI Review

Quarterly, every automation must answer:

```
Automation: ________________________________
Manual process time (if we turned this off): ___ hours/month
Automation cost (infrastructure + maintenance): $___/month
Net savings: $___/month
Break-even achieved: [ ] Yes (date: ___) [ ] No (projected: ___)
Still justified: [ ] Yes  [ ] No (action: ___)
```

If ROI is negative for 2 consecutive quarters without strategic justification,
the automation should be evaluated for retirement.

---

## SECURITY ACCOUNTABILITY

### Credential Management Cadence

| Action | Frequency | Owner | Verification |
|--------|-----------|-------|--------------|
| Credential rotation | Quarterly | Engineer | Rotation log |
| Access review | Semi-annually | Owner | Access audit |
| Permission audit | Annually | Security | Audit report |
| Vulnerability scan | Monthly (automated) | Security | Scan results |

### Security Violation Response

```
Level 1: Automated scan detects issue
    |
    v
Level 2: Owner investigates and remediates
    |
    v
Level 3: Security team validates remediation
    |
    v
Level 4: Engineering lead approves re-deployment
    |
    v
Level 5: Post-incident review if data was exposed
```

---

## DOCUMENTATION ACCOUNTABILITY

### Required Documentation Per Automation

| Document | Update Trigger | Staleness Threshold |
|----------|---------------|---------------------|
| Flow diagram | Any flow change | 90 days |
| Trigger documentation | Any trigger change | 30 days |
| Data mapping | Any schema change | 30 days |
| Error handling guide | Any error handling change | 60 days |
| Troubleshooting runbook | Any operational change | 90 days |
| ROI analysis | Quarterly | 90 days |
| Security review | Semi-annually | 180 days |

### Documentation Debt

If documentation is >2x staleness threshold:
- Automation flagged as "documentation debt critical"
- No new features until documentation is current
- Owner must schedule documentation sprint within 2 weeks

---

## RETIREMENT PROTOCOL

When an automation is no longer needed:

1. Confirm with all stakeholders that it can be retired
2. Disable (do not delete) for 30 days
3. Monitor for any complaints or data gaps during the 30-day period
4. Archive automation code and documentation
5. Remove from monitoring and alert routing
6. Update automation registry
7. Log retirement in change log

Deleting an automation without the 30-day disabled period is a **violation**.
Data that depended on the automation may not be recoverable.

---

## ESCALATION MATRIX

| Situation | First Contact | Escalation | Final Authority |
|-----------|--------------|------------|-----------------|
| Silent failure | Owner | Engineering Lead | CTO |
| Duplicate data at scale | Owner | Data Lead | Engineering Lead |
| Security credential exposure | Owner | Security Team | CTO |
| Missed SLA | Owner | Engineering Lead | VP Engineering |
| Zombie automation | Monthly Review | Owner | Engineering Lead |
| Cost overrun | Owner | Finance | Engineering Lead |
| Documentation debt | Owner | Engineering Lead | VP Engineering |

---

## ACCOUNTABILITY REVIEW CADENCE

| Review | Frequency | Attendees | Output |
|--------|-----------|-----------|--------|
| Automation health check | Weekly | Owner + Engineer | Health report |
| Silent failure audit | Bi-weekly | Engineering Team | Monitoring gaps |
| ROI review | Quarterly | Owner + Finance | ROI report |
| Security review | Semi-annually | Security + Owner | Security report |
| Full automation audit | Annually | All stakeholders | Audit report |
| Zombie cleanup | Monthly | Engineering Team | Retirement candidates |

---

## ENFORCEMENT

- Accountability is mandatory, not optional
- Silent failure is the highest-priority violation
- Every requirement in this document must be met or explicitly exempted
- Exemptions expire and must be renewed (maximum 30 days)
- Repeated violations trigger escalation
- This protocol is reviewed and updated quarterly

---

## END OF ACCOUNTABILITY PROTOCOL

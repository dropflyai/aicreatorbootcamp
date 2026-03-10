# Cloud Brain -- Accountability Protocol (Authoritative)

This document defines the accountability framework for all cloud infrastructure work.
Every decision, deployment, and incident has an owner.
Every outcome is measured. Every failure is learned from.

Accountability without measurement is theater.
Measurement without consequences is decoration.

---

## CORE PRINCIPLES

1. **Every resource has an owner.** No orphan infrastructure. If nobody owns it, it gets decommissioned.
2. **Every change has a trail.** CloudTrail, IaC commits, change management records. If it is not logged, it did not happen correctly.
3. **Every failure produces learning.** Post-mortems are blameless but not consequence-free. Repeated failures escalate.
4. **Every cost is attributable.** If you cannot attribute a cost to a team or service, you cannot optimize it.
5. **Every SLO has a budget owner.** Someone is responsible for the error budget. When it is exhausted, they decide what happens.

---

## SECTION 1: OWNERSHIP MODEL

### 1.1 Service Ownership

Every production service must have:

| Role | Responsibility | Required? |
|------|---------------|-----------|
| Service Owner | Business decisions, priority, roadmap | YES |
| Technical Lead | Architecture, technical decisions | YES |
| On-Call Primary | First responder for incidents | YES |
| On-Call Secondary | Backup responder, escalation | YES |
| Cost Owner | Budget responsibility, optimization | YES |
| Security Contact | Security findings triage for this service | YES |

### Ownership Registration

Every service must register in the service catalog with:
- Service name and description
- All ownership roles filled (names, not teams)
- Tier classification (Tier 1: revenue-critical, Tier 2: important, Tier 3: internal)
- SLOs and error budget owner
- Cost center and budget allocation
- Dependencies (upstream and downstream)
- Runbook location
- Architecture diagram location

### Ownership Verification

- Quarterly: verify all ownership records are current
- On personnel change: update within 5 business days
- On service creation: ownership registered before production deployment
- On service decommission: ownership record archived, not deleted

### Orphan Resource Protocol

Resources without a documented owner:
1. Week 1: Tag as "UNOWNED" and notify infrastructure team
2. Week 2: Announce to all engineering teams, request claim
3. Week 4: If unclaimed and non-production, schedule for decommission
4. Week 6: Decommission with 7-day recovery window
5. Week 8: Permanently delete

Production resources without an owner are escalated to VP of Engineering immediately.

---

## SECTION 2: CHANGE ACCOUNTABILITY

### 2.1 Change Classification

| Class | Description | Approval | Review | Rollback Plan |
|-------|------------|----------|--------|---------------|
| Standard | Routine, pre-approved, low risk | Pre-approved | Post-change | Automated |
| Normal | Planned changes with moderate risk | Peer review | Pre-change | Documented |
| Emergency | Unplanned, incident-driven | Post-hoc review | Within 24 hours | Best effort |

### 2.2 Change Record Requirements

Every change to production infrastructure must record:

```
Change ID: [Auto-generated or ticket number]
Requester: [Name]
Approver: [Name]
Date/Time: [When applied]
Classification: [Standard / Normal / Emergency]
Description: [What changed and why]
Impact Scope: [What services/users affected]
Rollback Plan: [How to reverse this change]
Rollback Tested: [Yes / No — if No, justify]
Monitoring: [What metrics to watch post-change]
Success Criteria: [How to know the change worked]
```

### 2.3 Emergency Change Protocol

Emergency changes (made during incidents without normal review):
1. Apply the change to resolve the incident
2. Document the change within 1 hour of resolution
3. Create IaC representation within 24 hours
4. Peer review the change within 48 hours
5. If the change introduced technical debt, create a ticket with a deadline

### 2.4 Unauthorized Change Response

Changes made outside the approved process:
1. First occurrence: Document, review, require training completion
2. Second occurrence: Revoke direct production access for 30 days
3. Third occurrence: Escalation to engineering management
4. Repeated pattern: Treat as a process failure, not just a people problem -- fix the process

---

## SECTION 3: INCIDENT ACCOUNTABILITY

### 3.1 Incident Severity Definitions

| Severity | Impact | Response Time | Update Cadence | Post-Mortem Required |
|----------|--------|---------------|----------------|---------------------|
| SEV-1 | Revenue impact, data loss risk, full outage | 5 minutes | Every 15 minutes | YES, within 48 hours |
| SEV-2 | Degraded service, partial outage, SLO breach | 15 minutes | Every 30 minutes | YES, within 5 business days |
| SEV-3 | Minor impact, workaround available | 1 hour | Every 2 hours | Optional |
| SEV-4 | Cosmetic, no user impact | Next business day | As needed | No |

### 3.2 Incident Roles

During any SEV-1 or SEV-2 incident:

| Role | Responsibility |
|------|---------------|
| Incident Commander | Coordinates response, makes decisions, communicates status |
| Technical Lead | Diagnoses and resolves the technical issue |
| Communications Lead | Updates status page, notifies stakeholders, drafts customer messaging |
| Scribe | Documents timeline, actions taken, decisions made in real-time |

### 3.3 Post-Mortem Requirements

Every SEV-1 and SEV-2 incident requires a post-mortem that includes:

1. **Timeline:** Minute-by-minute account from detection to resolution
2. **Impact:** Number of users affected, duration, revenue impact, SLO burn
3. **Root Cause:** 5 Whys analysis (go deep, not wide)
4. **Contributing Factors:** What made this worse than it needed to be
5. **What Went Well:** Acknowledge effective response actions
6. **Action Items:** Each must have owner, deadline, and priority
7. **Detection Gap:** How long between failure and detection? How to improve?
8. **Prevention:** What changes prevent this exact failure from recurring

### 3.4 Post-Mortem Action Item Tracking

- Action items are tracked in the team's issue tracker (not in the post-mortem document)
- Each action item has a severity-aligned deadline:
  - SEV-1 action items: completed within 14 days
  - SEV-2 action items: completed within 30 days
- Overdue action items are escalated weekly
- Action item completion rate is a team metric
- Repeat incidents where the previous post-mortem action items were not completed are escalated to VP level

### 3.5 Blameless Culture with Accountability

- Post-mortems are blameless: focus on systems, not individuals
- However: repeated systemic failures that are not addressed are an accountability issue
- The system, process, or tooling failed -- fix those
- If someone circumvented established safety measures, address the behavior without blame for the incident itself

---

## SECTION 4: COST ACCOUNTABILITY

### 4.1 Cost Ownership

- Every AWS account has a cost owner
- Every service has a cost allocation tag
- Every team has a monthly cost budget
- Cost overruns are reported to cost owner within 24 hours of detection

### 4.2 Cost Review Cadence

| Cadence | Activity | Attendees | Output |
|---------|----------|-----------|--------|
| Weekly | Cost anomaly review | Infrastructure team | Action items for anomalies |
| Monthly | Cost optimization review | Service owners + finance | Savings opportunities, budget check |
| Quarterly | FinOps review | Engineering leadership + finance | Budget adjustments, strategy changes |

### 4.3 Cost Anomaly Response

When a cost anomaly is detected (> 20% deviation from baseline):

1. **Hour 0-1:** Automated alert sent to cost owner and infrastructure team
2. **Hour 1-4:** Cost owner investigates and provides initial assessment
3. **Hour 4-8:** Root cause identified (planned growth, waste, attack, misconfiguration)
4. **Day 1:** Remediation plan if waste or misconfiguration
5. **Day 7:** Verification that anomaly is resolved or reclassified as expected growth

### 4.4 Waste Elimination Accountability

| Waste Type | Detection | Owner | SLA to Resolve |
|------------|-----------|-------|----------------|
| Unused EC2 instances | Weekly automated scan | Service owner | 7 days |
| Unattached EBS volumes | Weekly automated scan | Last user (CloudTrail) | 3 days |
| Unused Elastic IPs | Daily automated scan | Account owner | 1 day |
| Idle load balancers | Weekly automated scan | Service owner | 7 days |
| Old snapshots (> 90 days) | Monthly review | Service owner | 14 days |
| Unused reserved capacity | Quarterly review | Finance + infra lead | Next purchase cycle |

---

## SECTION 5: SECURITY ACCOUNTABILITY

### 5.1 Security Finding SLAs

| Severity | Remediation SLA | Escalation If Missed |
|----------|----------------|---------------------|
| Critical | 24 hours | VP Engineering + CISO |
| High | 7 days | Engineering Manager |
| Medium | 30 days | Team Lead |
| Low | 90 days | Tracked in backlog |

### 5.2 Security Review Triggers

A security review is REQUIRED when:
- New service is deployed to production
- Service gains access to PII/PHI data
- IAM policies are modified for production
- Network boundaries are changed (new VPC peering, public endpoints)
- Third-party integration is added
- After any security incident

### 5.3 Compliance Accountability

| Framework | Owner | Audit Cadence | Evidence Location |
|-----------|-------|---------------|-------------------|
| SOC 2 | Security team | Annual | Compliance portal |
| HIPAA | Compliance officer | Annual | Compliance portal |
| PCI-DSS | Payment team lead | Quarterly | Compliance portal |
| Internal standards | Each service owner | Continuous | IaC + CloudTrail |

### 5.4 Access Review Protocol

- Quarterly: review all human access to production environments
- Monthly: review all service-to-service IAM roles
- On termination: revoke access same day (4-hour SLA)
- On role change: review and adjust within 5 business days
- Privileged access (admin, root): review monthly with justification required

---

## SECTION 6: SLO ACCOUNTABILITY

### 6.1 Error Budget Governance

Each service with an SLO must define:
- Error budget owner (person, not team)
- Error budget policy (what happens when budget is exhausted)
- Error budget review cadence (weekly recommended)

### 6.2 Error Budget Policy Template

When error budget is exhausted for the current period:
1. All non-critical feature deployments are frozen
2. Team priority shifts to reliability work
3. Root cause analysis for the budget burn
4. Freeze remains until budget is replenished or next period begins
5. If budget exhausted 2 consecutive periods: architecture review required

### 6.3 SLO Review Protocol

| Cadence | Activity |
|---------|----------|
| Weekly | Review error budget burn rate, address trending issues |
| Monthly | Review SLO appropriateness, adjust targets if needed |
| Quarterly | Review SLO strategy, add/remove SLOs, benchmark against industry |

---

## SECTION 7: REPORTING AND METRICS

### 7.1 Cloud Brain Health Dashboard

The following metrics must be tracked and visible:

| Metric | Target | Red Threshold |
|--------|--------|--------------|
| Infrastructure uptime (tier-1) | 99.95% | < 99.9% |
| Mean time to detect (MTTD) | < 5 minutes | > 15 minutes |
| Mean time to resolve (MTTR) | < 30 minutes (SEV-1) | > 2 hours |
| IaC coverage | > 95% | < 85% |
| Cloud Score average (all services) | >= 4.0 | < 3.5 |
| Cost variance from budget | < 10% | > 20% |
| Post-mortem action item completion | > 90% on time | < 70% |
| Security finding SLA compliance | > 95% | < 80% |
| DR drill completion | Quarterly | > 6 months since last |
| Flaky alert rate | < 5% | > 15% |

### 7.2 Monthly Infrastructure Report

Must include:
1. Service availability summary (SLO compliance per service)
2. Incident summary (count by severity, MTTD, MTTR trends)
3. Cost summary (actual vs budget, trend, top 5 cost drivers)
4. Security posture (open findings by severity, SLA compliance)
5. IaC coverage trend
6. Top 3 risks and mitigation status
7. Top 3 improvements delivered
8. Action items status from previous month

### 7.3 Quarterly Business Review

Must include:
1. Everything from monthly report, aggregated
2. Cloud Score trends per service
3. Total cost of ownership analysis
4. Capacity planning projections
5. Technology roadmap alignment
6. Team health (on-call burden, alert fatigue metrics)
7. Benchmarking against industry standards

---

## SECTION 8: ESCALATION MATRIX

### When to Escalate

| Situation | Escalation Target | Timeline |
|-----------|-------------------|----------|
| SEV-1 incident > 30 minutes | VP Engineering | Immediate |
| Cost anomaly > $10K unexplained | Finance + Infra Lead | 4 hours |
| Security critical finding unaddressed > 24 hours | CISO | Immediate |
| Service with no owner identified | VP Engineering | 5 business days |
| Post-mortem action items overdue > 14 days | Engineering Manager | Next standup |
| IaC coverage drops below 85% | Infrastructure Lead | 1 week |
| DR drill not completed in > 6 months | VP Engineering | Immediate |
| Repeated unauthorized production changes | Engineering Manager | Per occurrence |

### Escalation Is Not Blame

Escalation exists to ensure issues receive the attention and resources they need.
Escalating is always the right call when the defined thresholds are met.
Not escalating when thresholds are met is an accountability failure.

---

## SECTION 9: CONTINUOUS IMPROVEMENT

### 9.1 Retrospective Cadence

- After every SEV-1 incident: post-mortem within 48 hours
- After every SEV-2 incident: post-mortem within 5 business days
- Monthly: infrastructure team retrospective
- Quarterly: cross-functional infrastructure review

### 9.2 Improvement Tracking

Every improvement must be:
1. Documented as a ticket with clear acceptance criteria
2. Assigned to an owner
3. Given a deadline based on priority
4. Tracked in the monthly report
5. Verified after implementation (did it actually improve the metric?)

### 9.3 Protocol Updates

This accountability protocol is reviewed quarterly:
- Are thresholds still appropriate?
- Are escalation paths still correct?
- Do new failure modes require new protocols?
- Has the team outgrown any of these processes?

Changes require review by infrastructure lead and VP Engineering.

---

**Accountability is not punishment. It is clarity about who owns what, what success looks like, and what happens when we fall short. Without it, infrastructure quality degrades through entropy.**

**This protocol is authoritative. Follow it.**

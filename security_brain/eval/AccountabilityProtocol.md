# Accountability Protocol — Security Incident Accountability and Compliance Tracking

## Overview

Accountability is the mechanism that transforms security policies from aspirational documents into enforceable standards. Without accountability, vulnerability SLAs become suggestions, compliance audits become checkbox exercises, and incident response becomes improvisational theater. This protocol codifies the accountability framework for security operations: incident accountability, vulnerability SLA compliance tracking, compliance audit trails, security posture scoring, red team findings tracking, and remediation verification.

The axiom: security without accountability is security theater. Every security commitment must have an owner, a deadline, a measurement, and a consequence.

---

## Security Incident Accountability

### Incident Ownership Model

Every security incident must have a clear ownership chain:

| Role | Accountability |
|------|---------------|
| Incident Commander | Overall incident resolution, timeline adherence, communication |
| Technical Lead | Root cause identification, containment, eradication |
| System Owner | System recovery, verification, prevention implementation |
| Risk Owner | Risk acceptance decisions, residual risk documentation |
| CISO | Executive accountability, regulatory notification decisions |
| Post-Incident Reviewer | Lessons learned extraction, action item assignment |

### Incident Accountability Metrics

| Metric | Target | Measurement | Escalation Trigger |
|--------|--------|-------------|-------------------|
| Time to assign incident commander | <15 minutes (SEV-1) | Timestamp tracking | >30 minutes = CTO notification |
| Time to initial containment | <1 hour (SEV-1) | Timestamp tracking | >2 hours = executive escalation |
| Post-incident review completion | 100% within 5 business days | Calendar tracking | >7 days = CISO follow-up |
| Action items from PIR completed | 100% within assigned deadline | Task tracking | >deadline = risk escalation |
| Repeat incidents (same root cause) | 0 | Incident classification | Any repeat = process failure review |

### Incident Accountability Log

Every incident produces an accountability record:

```
Incident: SEC-2024-047
Severity: SEV-1 (Critical)
Commander: [Name] assigned at [timestamp]
Root Cause: Unpatched CVE-2024-XXXXX on production server
Containment: [timestamp] — Network isolation applied
Eradication: [timestamp] — System rebuilt from IaC
Recovery: [timestamp] — Service restored
PIR Completed: [date] — 3 business days post-recovery
Action Items:
  1. Patch SLA enforcement automation — Owner: [Name] — Due: [date] — Status: Complete
  2. Scan coverage gap for DMZ servers — Owner: [Name] — Due: [date] — Status: In Progress
  3. Update runbook for this vulnerability class — Owner: [Name] — Due: [date] — Status: Complete
Accountability Review: All action items tracked to completion
```

---

## Vulnerability SLA Compliance Tracking

### SLA Compliance Framework

| Severity | SLA | Grace Period | Escalation Chain |
|----------|-----|-------------|-----------------|
| Critical | 24 hours | None | 12h: Security Lead → 24h: CISO → 48h: CTO |
| High | 7 days | 1 day | 5d: Security Lead → 7d: CISO → 14d: CTO |
| Medium | 30 days | 5 days | 21d: Security Lead → 30d: CISO |
| Low | 90 days | 14 days | 60d: Security Lead → 90d: CISO |

### SLA Tracking Dashboard

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| Critical SLA compliance rate | 98% | 100% | Improving |
| High SLA compliance rate | 92% | >95% | Stable |
| Medium SLA compliance rate | 87% | >90% | Needs improvement |
| Total overdue vulnerabilities | 23 | <10 | Decreasing |
| Average days overdue (critical) | 0.5 | 0 | Improving |
| Average days overdue (high) | 2.1 | 0 | Stable |

### SLA Exception Process

When a vulnerability cannot be remediated within SLA:

1. **Risk acceptance request** — System owner documents why SLA cannot be met
2. **Compensating controls** — Must implement temporary mitigation (WAF rule, network restriction, enhanced monitoring)
3. **Revised timeline** — New remediation deadline (maximum 2x original SLA)
4. **Risk owner approval** — Authorized risk owner (director level or above) must approve in writing
5. **Tracking** — Exception logged in risk register with review date
6. **Expiration** — Exception expires at revised deadline; if still unresolved, escalate to CISO

### SLA Violation Consequences

| Occurrence | Action |
|-----------|--------|
| First violation | Root cause analysis, process improvement |
| Repeated violation (same team) | Team-level review, additional resources or training |
| Systematic violation | Engineering leadership review, process redesign |
| Willful neglect | Performance management action |

---

## Compliance Audit Trail

### Audit Trail Requirements

Every security-relevant action must be logged in an immutable audit trail:

| Action Category | Events Logged | Retention |
|----------------|--------------|-----------|
| Access control changes | User creation, role changes, permission grants, deprovisioning | 7 years |
| Configuration changes | Security group modifications, IAM policy changes, encryption settings | 7 years |
| Data access | Access to restricted/confidential data, bulk exports, API access | 3 years |
| Incident response | All IR actions, evidence collection, notifications | 7 years |
| Vulnerability management | Discovery, triage, remediation, verification, exceptions | 3 years |
| Compliance decisions | Risk acceptances, policy exceptions, audit findings | 7 years |

### Audit Trail Integrity

- Logs stored in append-only storage (S3 Object Lock, immutable audit tables)
- Cryptographic integrity verification (hash chains, digital signatures)
- Separate storage account with restricted access (security team only)
- Regular integrity verification (automated hash validation)
- Tamper detection alerts (any modification attempt triggers critical alert)

### Continuous Compliance Monitoring

| Framework | Automated Checks | Manual Reviews | Frequency |
|-----------|-----------------|----------------|-----------|
| SOC 2 | Configuration compliance, access reviews, vulnerability scanning | Policy review, training records, vendor assessments | Continuous + annual audit |
| ISO 27001 | Technical controls, logging, encryption | ISMS documentation, management review, internal audit | Continuous + annual surveillance |
| PCI DSS | Network segmentation, encryption, access controls | Policy review, penetration testing, ASV scanning | Continuous + annual/quarterly |
| HIPAA | ePHI access controls, encryption, audit logs | Risk assessment, BAA reviews, training | Continuous + annual review |

---

## Security Posture Scoring

### Posture Score Calculation

Security posture is scored 0-100 across five dimensions:

| Dimension | Weight | Components |
|----------|--------|-----------|
| Vulnerability Management | 25% | SLA compliance, scan coverage, remediation velocity |
| Configuration Security | 20% | CIS benchmark compliance, CSPM findings, drift detection |
| Access Control | 20% | Least privilege compliance, MFA coverage, access review currency |
| Detection and Response | 20% | ATT&CK coverage, MTTD, MTTR, incident readiness |
| Compliance | 15% | Framework compliance rate, audit findings, policy currency |

### Scoring Formula

```
Posture Score = Σ (Dimension Score × Weight)

Where each Dimension Score (0-100) =
  Vulnerability: (SLA_compliance × 0.4) + (scan_coverage × 0.3) + (remediation_velocity × 0.3)
  Configuration: (CIS_compliance × 0.5) + (CSPM_pass_rate × 0.3) + (drift_compliance × 0.2)
  Access Control: (least_privilege × 0.3) + (MFA_coverage × 0.3) + (review_currency × 0.4)
  Detection: (ATT&CK_coverage × 0.3) + (MTTD_score × 0.3) + (MTTR_score × 0.4)
  Compliance: (framework_compliance × 0.4) + (open_findings × 0.3) + (policy_currency × 0.3)
```

### Posture Score Interpretation

| Score Range | Rating | Action |
|------------|--------|--------|
| 90-100 | Excellent | Maintain, continuous improvement |
| 75-89 | Good | Address specific gaps, targeted improvements |
| 60-74 | Needs Improvement | Dedicated improvement program, executive attention |
| 40-59 | Poor | Urgent remediation required, significant investment |
| 0-39 | Critical | Executive escalation, potential business risk, immediate action |

---

## Red Team Findings Tracking

### Finding Lifecycle

```
Discovery → Classification → Assignment → Remediation → Verification → Closure → Trend Analysis
  Red team     Severity/ATT&CK  Team owner    Fix deployed    Re-test       Document    Pattern ID
  finding      technique mapping  SLA set       Controls added  Validate fix  Update TTM  Systemic fix
```

### Red Team Scorecard

| Metric | Current | Target |
|--------|---------|--------|
| Findings per exercise | Track trend | Decreasing |
| Mean time to detect (red team activity) | 4 hours | <1 hour |
| Findings remediated within SLA | 85% | >95% |
| Techniques detected by blue team | 60% | >80% |
| Repeat findings (same technique, subsequent exercise) | 15% | <5% |
| Purple team validation pass rate | 75% | >90% |

---

## Remediation Verification

### Verification Requirements

Every remediated vulnerability must be verified before closure:

| Verification Method | When to Use |
|--------------------|------------|
| Automated re-scan | Standard vulnerability remediation (infrastructure, container) |
| Manual re-test | Application logic vulnerabilities, access control fixes |
| Code review | Source code changes for security fixes |
| Penetration re-test | Complex vulnerabilities, chained attacks, critical findings |
| Configuration audit | Infrastructure and cloud configuration changes |

### Verification SLAs

| Severity | Verification Deadline | Method |
|----------|----------------------|--------|
| Critical | Within 24 hours of fix | Automated scan + manual validation |
| High | Within 48 hours of fix | Automated scan |
| Medium | Within 7 days of fix | Automated scan (next scheduled) |
| Low | Next scheduled scan cycle | Automated scan |

### Verification Failure Handling

If verification reveals the remediation was incomplete:
1. Re-open the vulnerability (not create a new one)
2. Assign back to the same team with updated context
3. Reduce SLA by 50% (the team already had context)
4. Escalate if this is the second verification failure

---

## Accountability Reporting

### Monthly Security Accountability Report

Distributed to: CISO, Engineering Leadership, Risk Committee

**Contents:**
1. Security posture score and trend
2. Vulnerability SLA compliance by team
3. Open incidents and action item status
4. Compliance audit trail summary
5. Red team findings status
6. Risk acceptance register changes
7. Key risks and recommended actions

### Quarterly Executive Security Review

Presented to: Executive team, Board security committee

**Contents:**
1. Security posture trend (quarterly)
2. Significant incidents and outcomes
3. Compliance status and upcoming audits
4. Investment effectiveness (risk reduction per dollar)
5. Benchmark comparison (industry peers)
6. Forward-looking risk assessment

---

## Cross-References

- `eval/SecurityScore.md` — Quality scoring criteria
- `eval/ReviewChecklist.md` — Review process
- `06_operations/incident_response.md` — Incident lifecycle
- `06_operations/vulnerability_management.md` — Vulnerability SLAs
- `05_compliance/compliance_frameworks.md` — Compliance requirements

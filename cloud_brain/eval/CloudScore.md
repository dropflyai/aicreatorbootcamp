# Cloud Score -- Quality Enforcement (Authoritative)

This document defines how cloud infrastructure quality is evaluated.
Every architecture, deployment, and infrastructure change must be scored before it is considered production-ready.

If quality is not measurable, it is not enforced.
If it is not enforced, it will degrade.

---

## SCORING RULES (MANDATORY)

Each cloud deliverable must be scored across all eight dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Architecture Soundness**
- **Reliability**
- **Security Posture**
- **DR Readiness**

A hard fail on ANY of these blocks deployment to production.

### Passing Criteria

- Average score across all eight dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (even non-hard-fail)
- Cost Efficiency is evaluated with context -- seasonal spikes are documented, not penalized

### Escalation Rule

If a deliverable scores < 3.0 average, the Cloud Brain MUST:
1. Stop all forward work
2. Document deficiencies
3. Create remediation plan with owner and deadline
4. Re-score after remediation before proceeding

---

## 1. ARCHITECTURE SOUNDNESS

**Question:**
Does this architecture align with the AWS Well-Architected Framework (or equivalent for GCP/Azure) across all five pillars?

### Scoring Guide

- **5** -- All five WAF pillars addressed explicitly. Trade-offs documented. Architecture Decision Records (ADRs) exist for every major choice. Peer-reviewed by at least one other architect.
- **4** -- Four of five pillars addressed. Minor gaps in documentation. ADRs exist for critical decisions.
- **3** -- Three pillars addressed. Some decisions are implicit rather than documented. No formal peer review.
- **2** -- Architecture is ad-hoc. Only one or two pillars considered. Significant undocumented decisions.
- **1** -- No architectural framework applied. Decisions are reactive. No documentation.

### Well-Architected Pillars Checklist

- [ ] Operational Excellence: Runbooks exist, IaC for all infra, monitoring in place
- [ ] Security: IAM least privilege, encryption at rest and in transit, audit logging
- [ ] Reliability: Multi-AZ, auto-recovery, tested failover, defined RTO/RPO
- [ ] Performance Efficiency: Right-sized instances, caching strategy, CDN for static
- [ ] Cost Optimization: Reserved/spot where appropriate, waste identified, budgets set

### Failure Conditions

- Single AZ for production = UNACCEPTABLE (automatic score 1)
- No ADRs for infrastructure decisions > $1K/month = score capped at 3
- Architecture not reviewed by second engineer = score capped at 4
- No diagram of current architecture = score capped at 2

Score < 4 --> Conduct architecture review before proceeding.

---

## 2. RELIABILITY

**Question:**
Can this system withstand component failures, zone failures, and traffic spikes while meeting defined RTO/RPO targets?

### Scoring Guide

- **5** -- Multi-AZ active-active. Chaos testing performed quarterly. RTO < 15 minutes, RPO < 1 minute, both verified by drill. Auto-recovery for all critical components. Circuit breakers and bulkheads implemented.
- **4** -- Multi-AZ with automated failover. RTO < 1 hour, RPO < 15 minutes. Chaos testing performed at least annually. Auto-recovery for most components.
- **3** -- Multi-AZ deployed but failover is manual. RTO < 4 hours, RPO < 1 hour. No chaos testing. Basic health checks in place.
- **2** -- Single AZ with backup in another AZ. RTO > 4 hours. Failover procedure exists but untested. Minimal health checks.
- **1** -- Single AZ, no failover plan. RTO/RPO undefined. No health checks.

### Reliability Checklist

- [ ] RTO defined and documented for each tier of service
- [ ] RPO defined and documented for each data store
- [ ] Failover procedure documented and tested within last 6 months
- [ ] Health checks configured for all critical services
- [ ] Auto-scaling policies defined and tested
- [ ] Circuit breakers implemented for external dependencies
- [ ] Retry logic with exponential backoff for transient failures
- [ ] Dependency failure modes documented (what happens when X goes down)
- [ ] Chaos experiments run at least quarterly in non-production
- [ ] Incident response runbook exists and is current

### Failure Conditions

- RTO/RPO not tested in 6 months = COMPLIANCE GAP (score capped at 3)
- No multi-AZ for production workloads = automatic score 1
- Failover procedure exists only in documentation, never tested = score capped at 3
- No health checks on critical services = score capped at 2
- Single points of failure with no mitigation plan = score capped at 2

Score < 4 --> Create reliability improvement plan with specific targets and timeline.

---

## 3. COST EFFICIENCY

**Question:**
Is cloud spend optimized, waste minimized, and cost allocation transparent?

### Scoring Guide

- **5** -- FinOps practice mature. Waste < 5%. Reserved capacity optimized (coverage > 80% for steady-state). Cost anomaly detection automated. Per-team/per-service cost allocation. Monthly cost review with action items. Unit economics tracked (cost per user, cost per transaction).
- **4** -- Waste < 10%. Reserved capacity coverage > 60%. Cost allocation by service. Quarterly cost review. Budget alerts configured.
- **3** -- Waste < 15%. Some reserved capacity. Basic cost allocation. Budget alerts exist but thresholds not tuned. Cost review is ad-hoc.
- **2** -- Waste 15-25%. No reserved capacity strategy. Minimal cost allocation. No regular review cadence.
- **1** -- Waste > 25%. On-demand only. No cost visibility. Bill is a surprise every month.

### Cost Efficiency Checklist

- [ ] Monthly cloud spend reviewed and documented
- [ ] Cost anomaly detection configured (threshold: 20% deviation)
- [ ] Reserved instances / savings plans evaluated quarterly
- [ ] Unused resources identified and terminated (weekly scan)
- [ ] Right-sizing recommendations reviewed monthly
- [ ] Cost allocation tags on all resources
- [ ] Per-service cost dashboards available
- [ ] Spot instances used where fault-tolerant workloads allow
- [ ] Data transfer costs monitored and optimized
- [ ] Storage lifecycle policies configured (S3, EBS, snapshots)

### Failure Conditions

- Cost anomaly > 20% without explanation = INVESTIGATION REQUIRED (score capped at 3 until resolved)
- No cost allocation tags = score capped at 3
- Unused resources running for > 30 days = score reduced by 1
- No reserved capacity evaluation in 6 months = score capped at 4
- Monthly bill variance > 30% with no documented reason = score capped at 2

Score < 4 --> Conduct FinOps review within 2 weeks.

---

## 4. SECURITY POSTURE

**Question:**
Does this infrastructure follow defense-in-depth principles with least-privilege access, encryption, and auditability?

### Scoring Guide

- **5** -- IAM follows strict least privilege with regular access reviews. All data encrypted at rest and in transit. WAF configured with custom rules. CloudTrail/audit logs enabled, centralized, and actively monitored. Secrets managed via dedicated service (Secrets Manager, Vault). Vulnerability scanning automated. Penetration testing performed annually.
- **4** -- Least privilege IAM with quarterly reviews. Encryption at rest and in transit. WAF with managed rules. Audit logs centralized. Secrets in dedicated service. Vulnerability scanning configured.
- **3** -- IAM policies exist but are overly broad. Encryption at rest for critical data. Basic WAF. Audit logs enabled but not actively monitored. Some secrets in environment variables.
- **2** -- IAM is ad-hoc. Encryption inconsistent. No WAF. Audit logs partially enabled. Secrets in plaintext config files.
- **1** -- Root credentials used. No encryption. No WAF. No audit logs. Secrets in source code.

### Security Checklist

- [ ] Root account has MFA and is never used for daily operations
- [ ] IAM roles follow least privilege; no wildcards in production policies
- [ ] Service-to-service authentication uses IAM roles, not long-lived keys
- [ ] All data encrypted at rest (RDS, S3, EBS, DynamoDB)
- [ ] All data encrypted in transit (TLS 1.2+ everywhere)
- [ ] WAF deployed on all public-facing endpoints
- [ ] CloudTrail / audit logging enabled in all regions
- [ ] Security groups follow deny-by-default, allow-by-exception
- [ ] VPC flow logs enabled for production VPCs
- [ ] Secrets stored in Secrets Manager or Vault, rotated on schedule
- [ ] Vulnerability scanning (ECR, AMI, dependency) running on every build
- [ ] Penetration testing scheduled at least annually
- [ ] Security Hub / GuardDuty (or equivalent) enabled and findings triaged weekly
- [ ] Network segmentation isolates production from non-production

### Failure Conditions

- Root credentials used for any operational task = automatic score 1
- Secrets in source code = automatic score 1
- No encryption at rest for databases = score capped at 2
- IAM policies with * actions on * resources in production = score capped at 2
- No audit logging = score capped at 2
- No WAF on public endpoints = score capped at 3
- Security findings unaddressed for > 30 days = score reduced by 1

Score < 4 --> Security remediation is highest priority. Stop feature work.

---

## 5. SCALABILITY

**Question:**
Can this system handle 3x normal load without degradation, and scale down efficiently when load decreases?

### Scoring Guide

- **5** -- Auto-scaling tested and verified at 3x load. Scale-out time < 2 minutes. Scale-in configured to avoid premature termination. Load testing is part of CI/CD for performance-critical paths. Database read replicas and connection pooling in place. CDN handles static content. Caching layer reduces backend load by > 50%.
- **4** -- Auto-scaling configured and tested at 2x load. Scale-out time < 5 minutes. Load testing performed before major releases. Database scaling strategy defined. Caching in place.
- **3** -- Auto-scaling configured but not load-tested. Manual scaling procedures exist. Some caching. Database scaling is manual.
- **2** -- Fixed capacity with manual scaling. No load testing. No caching strategy. Database is a bottleneck.
- **1** -- Single instance, no scaling plan. System falls over under 2x load.

### Scalability Checklist

- [ ] Auto-scaling groups configured for all compute tiers
- [ ] Scaling policies based on meaningful metrics (not just CPU)
- [ ] Load tested to 3x expected peak traffic
- [ ] Scale-out latency measured and documented
- [ ] Scale-in cooldown configured to prevent flapping
- [ ] Database read replicas for read-heavy workloads
- [ ] Connection pooling for all database connections
- [ ] Caching layer (ElastiCache, CloudFront, application-level)
- [ ] Queue-based architecture for async workloads
- [ ] Stateless compute (no session affinity requirements)
- [ ] CDN for static assets and API caching where appropriate
- [ ] Capacity planning documented for next 6 months

### Failure Conditions

- No auto-scaling for production compute = score capped at 2
- Never load-tested = score capped at 3
- System degrades at 2x normal load = score capped at 2
- Scale-out takes > 10 minutes = score capped at 3
- Stateful instances without session management = score capped at 3

Score < 4 --> Conduct load test and implement scaling improvements.

---

## 6. OBSERVABILITY

**Question:**
Can the team detect, diagnose, and resolve issues before customers notice them?

### Scoring Guide

- **5** -- SLOs defined for all critical services. SLI dashboards are actionable (not vanity). Alerting is tuned (< 5% false positive rate). Distributed tracing covers all service-to-service calls. Structured logging with correlation IDs. Error budgets tracked and used to prioritize reliability work. On-call runbooks are current and tested.
- **4** -- SLOs defined for top services. Dashboards cover key metrics. Alerting configured with reasonable thresholds. Distributed tracing for critical paths. Structured logging. On-call rotation defined.
- **3** -- Basic metrics dashboards (CPU, memory, request count). Alerting on basic thresholds. Logging exists but is unstructured. No distributed tracing. On-call is informal.
- **2** -- Minimal dashboards. Alerting is noisy (> 30% false positives). Logs are scattered across systems. Issues discovered by customers.
- **1** -- No dashboards. No alerting. Logs are not centralized. Team learns about outages from customers.

### Observability Checklist

- [ ] SLOs defined for all tier-1 and tier-2 services
- [ ] SLI dashboards accessible to all team members
- [ ] Error budget calculated and reviewed weekly
- [ ] Alerting thresholds tuned (false positive rate < 5%)
- [ ] Alert fatigue assessed quarterly (are alerts actionable?)
- [ ] Distributed tracing deployed (X-Ray, Jaeger, Datadog APM)
- [ ] Correlation IDs propagated across all service boundaries
- [ ] Structured logging (JSON) with consistent field names
- [ ] Log aggregation centralized (CloudWatch, ELK, Datadog)
- [ ] Custom business metrics tracked (not just infrastructure)
- [ ] On-call runbooks exist for every alert
- [ ] Post-incident reviews produce observability improvements

### Failure Conditions

- No SLOs defined = score capped at 3
- Alert false positive rate > 20% = score capped at 3
- No centralized logging = score capped at 2
- No distributed tracing for microservices = score capped at 3
- On-call runbooks missing or outdated = score capped at 3
- Issues consistently found by customers first = score capped at 2

Score < 4 --> Observability sprint before next feature work.

---

## 7. INFRASTRUCTURE AS CODE COVERAGE

**Question:**
Is all infrastructure defined in code, version-controlled, and reproducible?

### Scoring Guide

- **5** -- > 95% of infrastructure defined in IaC (Terraform, CDK, Pulumi, CloudFormation). Drift detection runs daily. State file management is secure (remote state, locking). Modules are reusable and documented. IaC is tested (plan validation, policy-as-code). Environments are reproducible from code alone.
- **4** -- > 85% IaC coverage. Drift detection configured. Remote state management. Some reusable modules. IaC reviewed in PRs.
- **3** -- > 70% IaC coverage. Some resources created manually. No drift detection. State management exists but is basic. IaC not consistently reviewed.
- **2** -- 40-70% IaC coverage. Significant manual resources. No drift detection. Local state files. IaC is aspirational.
- **1** -- < 40% IaC. Most infrastructure is ClickOps. No state management. Reproducibility impossible.

### IaC Checklist

- [ ] All production infrastructure defined in IaC
- [ ] IaC stored in version control with PR review
- [ ] Remote state backend with locking (S3 + DynamoDB, Terraform Cloud)
- [ ] State file encryption enabled
- [ ] Drift detection running at least daily
- [ ] Drift alerts sent to infrastructure team
- [ ] IaC modules documented with inputs/outputs
- [ ] Policy-as-code (Sentinel, OPA, Checkov) in CI pipeline
- [ ] Environment promotion follows code promotion (dev -> staging -> prod)
- [ ] Terraform plan / CDK diff required before apply
- [ ] No manual changes to production infrastructure
- [ ] IaC linting and formatting enforced in CI

### Failure Conditions

- No IaC for production infrastructure = CANNOT DEPLOY (automatic score 1)
- Manual changes to production without IaC follow-up within 24 hours = score capped at 2
- State file stored locally or unencrypted = score capped at 3
- No drift detection = score capped at 4
- IaC not reviewed in PRs = score capped at 3

Score < 4 --> IaC coverage sprint. Prioritize production resources.

---

## 8. DR READINESS

**Question:**
If the primary region or a critical service fails, can the team recover within defined RTO/RPO targets?

### Scoring Guide

- **5** -- DR plan documented and tested quarterly. Automated failover for critical services. Backup verification automated (restore tested, not just backup confirmed). Multi-region architecture for tier-1 services. Communication plan tested. Runbooks current. Last DR drill completed within 90 days.
- **4** -- DR plan documented and tested semi-annually. Automated failover for databases. Backups verified monthly. Warm standby in secondary region. Communication plan exists.
- **3** -- DR plan documented but tested annually at best. Manual failover procedures. Backups exist but restoration not regularly tested. Pilot light in secondary region.
- **2** -- DR plan exists on paper but never tested. Backups are configured but unverified. No secondary region. Recovery would be ad-hoc.
- **1** -- No DR plan. Backups may or may not exist. Recovery time unknown.

### DR Readiness Checklist

- [ ] RTO/RPO defined for each service tier
- [ ] DR plan documented with step-by-step runbook
- [ ] DR drill performed within last 90 days (quarterly cadence)
- [ ] Drill results documented with lessons learned
- [ ] Automated failover for databases (RDS Multi-AZ, Aurora Global)
- [ ] Automated failover for compute (Route53 health checks, ALB)
- [ ] Backup schedule defined for all data stores
- [ ] Backup restoration tested monthly (not just backup success)
- [ ] Cross-region replication for critical data
- [ ] Communication plan for customers during DR event
- [ ] DR runbook accessible during outage (not hosted on the system that is down)
- [ ] DNS TTL configured for fast failover (< 60 seconds for critical)
- [ ] Third-party dependency failure modes documented

### Failure Conditions

- Failover not tested quarterly = COMPLIANCE GAP (score capped at 3)
- Backups not verified by restore test in 90 days = score capped at 3
- No DR plan = automatic score 1
- DR runbook hosted only on the system it is meant to recover = score capped at 2
- RTO/RPO not defined = score capped at 2
- Last DR drill > 12 months ago = score capped at 2

Score < 4 --> Schedule DR drill within 30 days. This is non-negotiable.

---

## COMPOSITE SCORING

### Score Calculation

| Dimension | Weight | Hard Fail? |
|-----------|--------|------------|
| Architecture Soundness | 15% | YES |
| Reliability | 15% | YES |
| Cost Efficiency | 10% | No |
| Security Posture | 15% | YES |
| Scalability | 10% | No |
| Observability | 10% | No |
| IaC Coverage | 10% | No |
| DR Readiness | 15% | YES |

### Grade Thresholds

| Grade | Score Range | Meaning |
|-------|------------|---------|
| A | 4.5 - 5.0 | Production-excellent. Exemplary infrastructure. |
| B | 4.0 - 4.4 | Production-ready. Minor improvements identified. |
| C | 3.0 - 3.9 | Conditional. Requires improvement plan with deadlines. |
| D | 2.0 - 2.9 | Not production-ready. Remediation required before deployment. |
| F | < 2.0 | Critical. Infrastructure is a liability. Immediate action. |

### Blocking Rules

- Any hard-fail dimension < 3 = cannot deploy to production regardless of average
- Average < 3.5 = cannot deploy to production
- Grade C = deployment allowed with signed-off remediation plan and deadline
- Grade D or F = no deployment until remediation complete

---

## SCORING TEMPLATE

```
## Cloud Score: [Service/Project Name]
## Date: YYYY-MM-DD
## Scored By: [Name]
## Environment: [Production / Staging / Development]

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Architecture Soundness | | |
| Reliability | | |
| Cost Efficiency | | |
| Security Posture | | |
| Scalability | | |
| Observability | | |
| IaC Coverage | | |
| DR Readiness | | |

**Weighted Average:** X.X
**Grade:** [A/B/C/D/F]
**Hard Fail Triggered:** [Yes/No — which dimension]

### Action Items
1. [Priority 1 item — owner — deadline]
2. [Priority 2 item — owner — deadline]
3. [Priority 3 item — owner — deadline]

### Sign-off
- [ ] Architect reviewed
- [ ] Security reviewed
- [ ] Operations reviewed
```

---

## HISTORICAL TRACKING

Cloud Scores must be tracked over time per service:

| Date | Service | Score | Grade | Key Changes |
|------|---------|-------|-------|-------------|
| | | | | |

Trend analysis:
- Score improving over 3 consecutive reviews = healthy
- Score declining over 2 consecutive reviews = investigation required
- Score stagnant below 4.0 for 3+ reviews = escalation required

---

## WHEN TO SCORE

- Before every production deployment
- After any architecture change
- After any security incident
- Quarterly review for all production services
- After any cost anomaly investigation
- Before and after DR drills

---

**This scoring system is authoritative. No exceptions. No shortcuts.**
**If you cannot score it, you cannot ship it.**

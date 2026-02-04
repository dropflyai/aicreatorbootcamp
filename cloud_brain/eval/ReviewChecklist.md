# Cloud Review Checklist -- Pre-Deployment Gate (Authoritative)

This checklist must be completed before any cloud infrastructure change reaches production.
Every item must be explicitly marked PASS, FAIL, or N/A with justification.
A single unjustified FAIL blocks deployment.

---

## HOW TO USE THIS CHECKLIST

1. Copy the checklist for each deployment or architecture change
2. Every item must be reviewed -- no skipping
3. Mark each item: PASS / FAIL / N/A
4. N/A requires written justification
5. Any FAIL must include remediation plan and timeline
6. Checklist must be signed off by at least two people (implementer + reviewer)
7. Archive completed checklists for audit trail

---

## SECTION 1: ARCHITECTURE REVIEW

### 1.1 Design Validation

- [ ] Architecture diagram is current and matches actual deployment
- [ ] Architecture Decision Records (ADRs) exist for all major decisions
- [ ] Well-Architected Framework review completed (all 5 pillars addressed)
- [ ] Single points of failure identified and mitigated or accepted with sign-off
- [ ] Service dependencies mapped and failure modes documented
- [ ] Data flow diagram shows all data movement including cross-region
- [ ] API contracts versioned and backward-compatible or migration plan exists
- [ ] Async vs sync decisions documented with rationale

### 1.2 Multi-Tenancy and Isolation

- [ ] Tenant isolation strategy documented (siloed, pooled, or bridge)
- [ ] Noisy neighbor prevention in place (rate limiting, resource quotas)
- [ ] Tenant data cannot leak between accounts/orgs
- [ ] Per-tenant resource limits configured

### 1.3 Network Architecture

- [ ] VPC design follows segmentation best practices
- [ ] Private subnets used for all backend services
- [ ] Public subnets contain only load balancers and bastion hosts (if any)
- [ ] VPC peering or Transit Gateway configured correctly
- [ ] DNS resolution works across all required networks
- [ ] Network ACLs and security groups follow deny-by-default
- [ ] No 0.0.0.0/0 ingress rules except on public load balancers

---

## SECTION 2: RELIABILITY REVIEW

### 2.1 Availability

- [ ] Production workloads span at least 2 availability zones
- [ ] Health checks configured for all services behind load balancers
- [ ] Health check endpoints test actual functionality (not just HTTP 200)
- [ ] Auto-recovery configured for EC2 instances (or equivalent)
- [ ] Graceful degradation paths defined for each external dependency
- [ ] Circuit breakers configured for downstream service calls
- [ ] Retry logic includes exponential backoff with jitter

### 2.2 Data Durability

- [ ] All databases have automated backups enabled
- [ ] Backup retention meets compliance requirements
- [ ] Point-in-time recovery enabled for critical databases
- [ ] Backup restoration tested within the last 90 days
- [ ] Cross-region backup replication for disaster recovery
- [ ] S3 versioning enabled for critical buckets
- [ ] Deletion protection enabled for production databases and critical resources

### 2.3 Capacity Planning

- [ ] Current resource utilization documented
- [ ] Growth projections for next 6 months documented
- [ ] Auto-scaling configured with appropriate min/max/desired
- [ ] Scaling triggers based on meaningful metrics (not just CPU)
- [ ] Service quotas reviewed and increases requested proactively
- [ ] Load testing performed at 3x expected peak

---

## SECTION 3: SECURITY REVIEW

### 3.1 Identity and Access Management

- [ ] IAM policies follow least privilege (no wildcard actions on wildcard resources)
- [ ] No long-lived access keys for production services (use IAM roles)
- [ ] Service accounts have narrowly scoped permissions
- [ ] Cross-account access uses IAM roles with external IDs
- [ ] MFA enforced for all human access to production accounts
- [ ] Access reviews completed within last quarter
- [ ] Break-glass procedure documented for emergency access

### 3.2 Data Protection

- [ ] All data encrypted at rest (RDS, S3, EBS, DynamoDB, SQS, SNS)
- [ ] All data encrypted in transit (TLS 1.2+ minimum, TLS 1.3 preferred)
- [ ] KMS keys use customer-managed keys (CMK) for regulated data
- [ ] Key rotation policy configured and automated
- [ ] PII/PHI data stores identified and additional protections applied
- [ ] Data classification documented for all data stores
- [ ] Data retention policies implemented and automated

### 3.3 Network Security

- [ ] WAF deployed on all public-facing endpoints
- [ ] WAF rules include OWASP Top 10 protections
- [ ] DDoS protection enabled (Shield Standard at minimum, Advanced for critical)
- [ ] Security groups are specific (no broad port ranges or CIDR blocks)
- [ ] VPC endpoints used for AWS service access (no internet traversal)
- [ ] No SSH/RDP ports open to 0.0.0.0/0
- [ ] Bastion host or Session Manager used for instance access

### 3.4 Logging and Audit

- [ ] CloudTrail enabled in all regions
- [ ] CloudTrail logs sent to centralized, immutable storage
- [ ] VPC Flow Logs enabled for production VPCs
- [ ] S3 access logging enabled for sensitive buckets
- [ ] Database audit logging enabled (RDS, Aurora, DynamoDB)
- [ ] Log retention meets compliance requirements
- [ ] Tampering detection for audit logs (log file integrity validation)

### 3.5 Vulnerability Management

- [ ] Container image scanning in CI/CD pipeline
- [ ] AMI/OS patching schedule defined and followed
- [ ] Dependency vulnerability scanning automated
- [ ] Security Hub / GuardDuty enabled and findings triaged weekly
- [ ] Penetration testing completed within last 12 months
- [ ] Known vulnerabilities have remediation plan with deadline

---

## SECTION 4: COST REVIEW

### 4.1 Resource Optimization

- [ ] Right-sizing analysis performed (no over-provisioned instances)
- [ ] Reserved Instances / Savings Plans evaluated for steady-state workloads
- [ ] Spot instances used for fault-tolerant batch workloads
- [ ] Unused resources identified and cleaned up (orphan EBS, unused EIPs, idle LBs)
- [ ] Storage lifecycle policies configured (S3 tiering, EBS snapshot cleanup)
- [ ] Data transfer costs reviewed (cross-AZ, cross-region, internet egress)

### 4.2 Cost Visibility

- [ ] All resources tagged with required cost allocation tags
- [ ] Budget alerts configured at account and service level
- [ ] Cost anomaly detection enabled
- [ ] Monthly cost review scheduled and documented
- [ ] Unit economics calculated (cost per user, cost per transaction)

### 4.3 Architecture Efficiency

- [ ] Serverless considered for variable/bursty workloads
- [ ] Caching reduces unnecessary compute and data transfer
- [ ] Database query optimization performed (no full table scans in production)
- [ ] CDN offloads static content delivery
- [ ] Async processing used where synchronous is not required

---

## SECTION 5: INFRASTRUCTURE AS CODE

### 5.1 IaC Quality

- [ ] All infrastructure defined in IaC (Terraform, CDK, CloudFormation, Pulumi)
- [ ] IaC coverage > 95% for production infrastructure
- [ ] IaC stored in version control and changes go through PR review
- [ ] No manual changes to production (or ClickOps followed by IaC within 24 hours)
- [ ] Terraform plan / CDK diff reviewed before every apply
- [ ] Remote state backend with locking configured
- [ ] State file encrypted at rest

### 5.2 IaC Best Practices

- [ ] Modules are reusable and documented
- [ ] Variables have descriptions and validation rules
- [ ] Sensitive outputs marked as sensitive
- [ ] Provider versions pinned
- [ ] Module versions pinned
- [ ] Drift detection running at least daily
- [ ] Policy-as-code (Sentinel, OPA, Checkov) in CI pipeline

### 5.3 Environment Parity

- [ ] Environments (dev, staging, prod) are structurally identical
- [ ] Environment differences are parameterized, not hard-coded
- [ ] Promotion path follows code: dev -> staging -> production
- [ ] Production infrastructure can be rebuilt from code alone

---

## SECTION 6: OBSERVABILITY REVIEW

### 6.1 Metrics and Dashboards

- [ ] SLOs defined for all tier-1 and tier-2 services
- [ ] SLI dashboards accessible to all team members
- [ ] Dashboards show business metrics alongside infrastructure metrics
- [ ] Error budget tracked and visible
- [ ] Dashboards are actionable (every panel has clear "what to do if this goes red")

### 6.2 Alerting

- [ ] Alerts based on SLOs, not arbitrary thresholds
- [ ] Alert severity levels defined (P1/P2/P3/P4)
- [ ] Escalation paths configured for each severity level
- [ ] Alert routing tested (right team gets right alert)
- [ ] False positive rate < 5% (reviewed quarterly)
- [ ] Every alert has a runbook link
- [ ] On-call rotation configured and documented

### 6.3 Logging and Tracing

- [ ] Structured logging (JSON) with consistent field names
- [ ] Correlation IDs propagated across all service boundaries
- [ ] Log levels appropriate (no DEBUG in production by default)
- [ ] Distributed tracing covers all service-to-service calls
- [ ] Log retention configured per compliance requirements
- [ ] Log-based alerts configured for critical error patterns

---

## SECTION 7: DISASTER RECOVERY

### 7.1 DR Plan

- [ ] DR plan documented and accessible during outage
- [ ] DR plan NOT hosted exclusively on the system it recovers
- [ ] RTO/RPO defined for each service tier
- [ ] Failover procedure documented step-by-step
- [ ] Failback procedure documented step-by-step
- [ ] Customer communication plan exists for DR events

### 7.2 DR Testing

- [ ] DR drill performed within last 90 days
- [ ] Drill results documented with lessons learned
- [ ] Action items from previous drill completed
- [ ] Automated failover tested for critical services
- [ ] Manual failover steps verified by operations team
- [ ] Recovery time measured and compared to RTO target

### 7.3 Backup Verification

- [ ] All backup jobs are monitored (not just configured)
- [ ] Failed backup alerts are routed to responsible team
- [ ] Backup restoration tested monthly
- [ ] Restored data validated for integrity
- [ ] Cross-region backup replication confirmed working

---

## SECTION 8: DEPLOYMENT PROCESS

### 8.1 CI/CD Pipeline

- [ ] Deployment pipeline is automated (no manual steps beyond approval)
- [ ] Pipeline includes: lint, test, security scan, build, deploy
- [ ] Deployment follows blue/green or canary strategy
- [ ] Rollback procedure is automated and tested
- [ ] Rollback can be executed in < 5 minutes
- [ ] Database migrations are backward-compatible
- [ ] Feature flags used for risky changes

### 8.2 Change Management

- [ ] Change documented (what, why, who, when, rollback plan)
- [ ] Change reviewed by at least one peer
- [ ] Change window appropriate (no risky changes on Friday at 5 PM)
- [ ] Monitoring dashboard open during deployment
- [ ] Success criteria defined before deployment
- [ ] Soak time defined before declaring deployment successful

---

## SIGN-OFF

```
## Deployment Review: [Service/Change Name]
## Date: YYYY-MM-DD
## Environment: [Production / Staging]

### Results Summary
- Total items reviewed: [X]
- PASS: [X]
- FAIL: [X]
- N/A (with justification): [X]

### Blocking Failures
1. [Item — remediation — deadline]

### Non-Blocking Improvements
1. [Item — owner — target date]

### Reviewers
- Implementer: [Name] — Date: YYYY-MM-DD
- Reviewer: [Name] — Date: YYYY-MM-DD
- Security (if applicable): [Name] — Date: YYYY-MM-DD

### Decision
- [ ] APPROVED for production deployment
- [ ] APPROVED with conditions (list conditions)
- [ ] BLOCKED (list blocking items)
```

---

## CHECKLIST MAINTENANCE

- This checklist is reviewed quarterly and updated as needed
- New items are added after incidents (prevention measures)
- Items are removed only when the underlying risk is eliminated
- All changes to this checklist require review

---

**No deployment without a completed checklist. No exceptions.**

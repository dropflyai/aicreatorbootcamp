# Cost Management — Tagging, Showback/Chargeback, Budgets, and Unit Economics

## Overview

Cost management is the organizational framework for financial accountability in cloud computing. While cost optimization focuses on reducing individual resource costs, cost management ensures the organization understands, allocates, and governs cloud spending at a strategic level. This module codifies tagging strategies for cost allocation, showback and chargeback models for organizational accountability, budget management and anomaly detection, and unit economics for measuring cost efficiency relative to business outcomes.

The cost management axiom: you cannot optimize what you cannot attribute. Without cost allocation, cloud spending is a black box — and organizations cannot make informed decisions about a black box.

---

## Tagging Strategy — The Foundation of Cost Allocation

### Tag Taxonomy

A comprehensive tagging strategy enables cost allocation, automation, security, and operations:

| Tag Category | Required Tags | Purpose |
|-------------|--------------|---------|
| Business | CostCenter, BusinessUnit, Project | Financial allocation and reporting |
| Technical | Service, Component, ManagedBy | Technical cost attribution |
| Environment | Environment (production/staging/dev) | Environment cost comparison |
| Ownership | Team, Owner, Contact | Accountability and communication |
| Compliance | DataClassification, Compliance | Regulatory tracking |
| Lifecycle | CreatedDate, ExpiryDate | Resource lifecycle management |

### Tag Enforcement

**Preventive enforcement:**
- AWS Service Control Policies (SCPs): Deny resource creation without required tags
- Terraform policies (OPA/Sentinel): Block infrastructure deployment without tags
- AWS Tag Policies: Define allowed tag keys and values at the organization level

**Detective enforcement:**
- AWS Config rules: Alert on untagged resources
- Automated scanning: Daily scan for untagged resources, notify owner
- Compliance dashboards: Track tagging compliance by team

```json
// AWS SCP — Deny EC2 launch without required tags
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "DenyUntaggedEC2",
    "Effect": "Deny",
    "Action": "ec2:RunInstances",
    "Resource": "arn:aws:ec2:*:*:instance/*",
    "Condition": {
      "Null": {
        "aws:RequestTag/Environment": "true",
        "aws:RequestTag/Team": "true",
        "aws:RequestTag/Service": "true"
      }
    }
  }]
}
```

### Tag Remediation

For existing untagged resources:
1. Export all resources from AWS Config or Resource Groups Tagging API
2. Identify untagged resources
3. Attempt automatic tagging based on resource metadata (VPC, account, creator)
4. Assign remaining untagged resources to teams for manual tagging
5. Set deadline for tag compliance (30 days)
6. After deadline, enforce SCP blocking new resources from non-compliant teams

---

## Showback and Chargeback

### Showback Model

Showback provides cost visibility without financial transfer. Teams see their cloud costs but are not billed internally.

**Advantages:** Low friction, encourages awareness without creating adversarial dynamics.
**Disadvantages:** Limited accountability — teams that see costs without consequences may not act.

### Chargeback Model

Chargeback transfers cloud costs to the consuming team's budget. Teams pay for what they use.

**Advantages:** Strong accountability, teams optimize because it is their budget.
**Disadvantages:** Higher friction, requires accurate cost allocation, can discourage experimentation.

### Hybrid Approach (Recommended)

1. **Shared infrastructure costs** (networking, security, platform tools): Allocated proportionally by compute usage or headcount
2. **Direct service costs** (compute, databases, storage): Charged back to the owning team
3. **Shared services** (monitoring, CI/CD, logging): Allocated proportionally
4. **Development/sandbox costs**: Showback with guardrails (budget caps)

### Cost Allocation Reports

**Monthly team cost report:**
| Cost Category | Orders Team | Payments Team | Platform Team | Shared |
|--------------|-------------|---------------|---------------|--------|
| Compute (EC2/ECS/Lambda) | $8,200 | $12,400 | $3,100 | |
| Database (RDS/DynamoDB) | $4,300 | $6,700 | $800 | |
| Storage (S3/EBS) | $1,200 | $900 | $5,400 | |
| Networking | | | | $3,200 |
| Monitoring/Logging | | | | $2,100 |
| **Total** | **$13,700** | **$20,000** | **$9,300** | **$5,300** |
| Shared allocation | +$1,800 | +$2,200 | +$1,300 | -$5,300 |
| **Charged amount** | **$15,500** | **$22,200** | **$10,600** | **$0** |

---

## Budget Management

### Budget Hierarchy

```
Organization Budget: $200,000/month
├── Production Account: $150,000/month
│   ├── Orders Team: $25,000/month
│   ├── Payments Team: $35,000/month
│   ├── Platform Team: $40,000/month
│   └── Shared Infrastructure: $50,000/month
├── Staging Account: $30,000/month
└── Development Account: $20,000/month
```

### AWS Budgets Configuration

| Budget Type | Configuration | Alert Thresholds |
|-----------|--------------|-----------------|
| Cost budget (monthly) | Per team, per account, per service | 50%, 80%, 100%, 120% |
| Usage budget | Per service (e.g., EC2 hours, S3 GB) | 80%, 100% |
| Savings Plans coverage | Target coverage % | Below 80% coverage |
| Reservation utilization | RI/SP utilization | Below 80% utilization |

### Anomaly Detection and Response

**Automated anomaly response:**
1. AWS Cost Anomaly Detection identifies unusual spending
2. Alert sent to team Slack channel with cost impact and root cause
3. If anomaly exceeds threshold ($500+), create Jira ticket for investigation
4. Team has 24 hours to acknowledge and explain
5. If unexplained, escalate to engineering lead
6. If caused by resource leak, auto-remediate (tag for deletion, notify)

---

## Unit Economics

### What is Unit Economics?

Unit economics measures the cost per business-meaningful unit, connecting cloud spend to business outcomes:

| Metric | Definition | Example |
|--------|-----------|---------|
| Cost per transaction | Cloud cost / number of transactions | $0.003 per order processed |
| Cost per user | Cloud cost / monthly active users | $0.15 per MAU |
| Cost per API call | Cloud cost / API call volume | $0.00001 per API call |
| Cost per GB processed | Cloud cost / data volume processed | $0.05 per GB |
| Infrastructure cost ratio | Cloud cost / revenue | 15% of revenue |

### Tracking Unit Economics

```
Monthly Dashboard:
  Revenue:           $500,000
  Cloud Spend:       $45,000
  Infra Cost Ratio:  9.0% (target: <12%)

  Transactions:      1,500,000
  Cost/Transaction:  $0.030 (target: <$0.035)

  Monthly Active Users: 50,000
  Cost/MAU:            $0.90 (target: <$1.00)

  Trend: Cost/transaction decreasing 5% QoQ (healthy — scaling efficiently)
```

### Unit Economics Decision Framework

Unit economics answers critical business questions:
- "Can we afford to scale to 10x users?" → If cost/MAU is stable, yes
- "Is this new feature cost-efficient?" → Compare cost/transaction before and after
- "Are we engineering for efficiency?" → Cost/transaction should decrease or remain stable as scale increases
- "When should we invest in optimization?" → When infra cost ratio exceeds target threshold

---

## Cost Governance Automation

### Automated Cost Controls

| Control | Trigger | Action |
|---------|---------|--------|
| Idle instance cleanup | CPU < 5% for 14 days | Tag for review, auto-stop after 7 more days |
| Unattached volume cleanup | Unattached > 7 days | Snapshot and delete |
| Development environment shutdown | Outside business hours | Auto-stop dev instances 7PM-7AM + weekends |
| Budget exceeded | 120% of monthly budget | Block new resource creation (SCP), alert leadership |
| Oversized instance | Compute Optimizer recommendation | Create right-sizing ticket for team |
| Unused Elastic IP | Unassociated > 24 hours | Release |
| Old snapshots | > 90 days, not tagged for retention | Delete |

### Cost Review Cadence

| Review | Frequency | Attendees | Focus |
|--------|-----------|-----------|-------|
| Daily cost check | Daily (automated) | FinOps team | Anomaly detection, spike investigation |
| Weekly team review | Weekly | Team leads | Team spending trends, optimization actions |
| Monthly business review | Monthly | Engineering + Finance | Budget tracking, unit economics, forecasting |
| Quarterly optimization | Quarterly | Engineering + FinOps | Savings plans review, architecture optimization, commitment adjustments |

---

## Cross-References

- `07_cost/cost_optimization.md` — Technical cost optimization strategies
- `07_cost/cost_architecture.md` — Cost-aware architecture decisions
- `05_infrastructure_as_code/iac_patterns.md` — Tag enforcement in IaC
- `06_reliability/site_reliability.md` — Cost of reliability targets
- `Templates/cost_review_template.md` — Cost review template

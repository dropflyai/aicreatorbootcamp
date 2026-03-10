# Cost Optimization — FinOps, Reserved Instances, Spot, Right-Sizing, and Lifecycle

## Overview

Cloud cost optimization is an ongoing engineering discipline, not a one-time exercise. The pay-as-you-go model that makes cloud attractive also makes it easy to overspend without realizing it. FinOps (Cloud Financial Operations) provides the framework for bringing financial accountability to cloud spending. This module codifies FinOps principles, compute cost optimization (reserved instances, savings plans, spot instances, right-sizing), storage optimization (lifecycle policies, tiering), and idle resource detection.

The FinOps axiom: everyone takes ownership for their cloud usage. Cloud cost is not just a finance problem — it is an engineering problem. The engineers who make architecture decisions are the ones who determine cloud cost.

---

## FinOps Framework

### FinOps Principles

1. **Teams need to collaborate** — Finance, engineering, and business work together on cloud cost
2. **Everyone takes ownership** — Engineers understand cost impact of their architecture decisions
3. **A centralized team drives FinOps** — FinOps team provides tools, data, and governance
4. **Reports should be accessible and timely** — Real-time cost visibility, not monthly surprises
5. **Decisions are driven by business value** — Optimize for value, not just lowest cost
6. **Take advantage of the variable cost model** — Cloud's variable model is a feature, not a bug

### FinOps Lifecycle

```
Inform → Optimize → Operate
 visibility  action    governance
 allocation  savings   automation
 benchmarks  right-size  policy
```

**Inform:** Gain visibility into who is spending what, on which services, and why. Tagging, cost allocation, showback/chargeback.

**Optimize:** Identify and implement savings opportunities. Right-sizing, reserved instances, spot, storage tiering, idle resource cleanup.

**Operate:** Establish governance and automation. Budgets, alerts, policies, automated right-sizing, automated cleanup.

---

## Compute Cost Optimization

### Reserved Instances and Savings Plans

**AWS Savings Plans:**
| Type | Discount | Flexibility | Commitment |
|------|----------|------------|------------|
| Compute Savings Plan | Up to 66% | Any instance family, region, OS, tenancy | 1 or 3 year hourly spend commitment |
| EC2 Instance Savings Plan | Up to 72% | Specific instance family in specific region | 1 or 3 year |
| SageMaker Savings Plan | Up to 64% | SageMaker ML instances | 1 or 3 year |

**Savings Plan Strategy:**
1. Analyze steady-state compute usage over 30-90 days
2. Identify the minimum baseline that is always running
3. Cover baseline with Savings Plans (start conservative — 50-70% of baseline)
4. Cover variable peaks with on-demand or spot
5. Review and adjust quarterly based on actual usage

**Payment Options:**
| Option | Discount | Cash Flow |
|--------|----------|-----------|
| All upfront | Highest discount | Large upfront payment |
| Partial upfront | Medium discount | Half upfront, half monthly |
| No upfront | Lowest discount | Monthly payments only |

### Spot Instances

Spot instances offer up to 90% discount on on-demand pricing but can be interrupted with 2-minute warning.

**Suitable workloads:**
- Batch processing, data analytics, ETL
- CI/CD build workers
- Stateless web servers (behind load balancer with on-demand fallback)
- Machine learning training
- Testing and development environments

**Spot strategies:**
| Strategy | Description |
|----------|-------------|
| Capacity-optimized | Select instances from pools with most available capacity (lowest interruption) |
| Lowest-price | Select cheapest spot instance (higher interruption risk) |
| Diversified | Spread across multiple instance types and AZs (recommended) |
| Mixed instances | Auto Scaling Group with mix of on-demand and spot |

**Spot best practices:**
- Use at least 3-5 instance types per AZ to increase availability
- Implement graceful shutdown handling (SIGTERM on 2-minute warning)
- Use Auto Scaling Group with mixed instances policy (on-demand base + spot scaling)
- Monitor spot interruption rates by instance type
- Never use spot for stateful workloads without checkpointing

### Right-Sizing

Right-sizing adjusts instance types to match actual resource consumption:

```
Current: m5.xlarge (4 vCPU, 16 GB) → Average CPU: 12%, Average Memory: 35%
Recommendation: m5.large (2 vCPU, 8 GB) → Savings: 50%

Current: r5.2xlarge (8 vCPU, 64 GB) → Average CPU: 5%, Average Memory: 15%
Recommendation: t3.large (2 vCPU, 8 GB) → Savings: 80%
```

**Right-sizing tools:**
| Tool | Source |
|------|--------|
| AWS Compute Optimizer | AWS native, ML-based recommendations |
| AWS Cost Explorer Right Sizing | Cost Explorer recommendations |
| CloudHealth | Commercial, multi-cloud |
| Spot.io (NetApp) | Commercial, automated optimization |

### Idle Resource Detection

| Resource Type | Idle Indicator | Action |
|--------------|---------------|--------|
| EC2 instances | CPU < 5% for 14 days | Terminate or right-size |
| EBS volumes | Unattached for 7 days | Snapshot and delete |
| Elastic IPs | Unassociated | Release |
| Load balancers | Zero targets or zero requests for 7 days | Delete |
| NAT Gateways | Minimal traffic | Consider VPC endpoints |
| RDS instances | Zero connections for 7 days | Stop or delete |

---

## Storage Cost Optimization

### S3 Storage Classes

| Storage Class | Use Case | Cost (relative) | Retrieval |
|--------------|----------|-----------------|-----------|
| S3 Standard | Frequently accessed data | 1x | Immediate |
| S3 Intelligent-Tiering | Unknown/changing access patterns | ~0.9x | Automatic tiering |
| S3 Standard-IA | Infrequently accessed, immediate retrieval | ~0.5x | Immediate (retrieval fee) |
| S3 One Zone-IA | Reproducible, infrequent data | ~0.4x | Immediate, single AZ |
| S3 Glacier Instant | Archive with immediate retrieval | ~0.25x | Milliseconds |
| S3 Glacier Flexible | Archive, hours retrieval | ~0.1x | Minutes to hours |
| S3 Glacier Deep Archive | Long-term archive | ~0.05x | 12-48 hours |

### S3 Lifecycle Policies

```json
{
  "Rules": [{
    "ID": "intelligent-tiering-then-archive",
    "Status": "Enabled",
    "Transitions": [
      { "Days": 30, "StorageClass": "INTELLIGENT_TIERING" },
      { "Days": 90, "StorageClass": "GLACIER_IR" },
      { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }
    ],
    "NoncurrentVersionTransitions": [
      { "NoncurrentDays": 30, "StorageClass": "GLACIER_IR" }
    ],
    "NoncurrentVersionExpiration": {
      "NoncurrentDays": 365
    },
    "AbortIncompleteMultipartUpload": {
      "DaysAfterInitiation": 7
    }
  }]
}
```

### EBS Optimization

| Optimization | Savings |
|-------------|---------|
| Delete unattached volumes | Direct cost elimination |
| Downgrade gp3 from io2 where IOPS not needed | 60-80% savings |
| Use gp3 instead of gp2 (20% cheaper, better performance) | 20% savings |
| Snapshot and delete infrequently used volumes | Variable |
| Right-size volumes (reduce over-provisioned capacity) | Variable |

---

## Cost Monitoring and Governance

### Tagging Strategy

Tags are the foundation of cost allocation. Without tags, you cannot attribute costs to teams, services, or environments.

**Required tags:**
| Tag | Purpose | Example Values |
|-----|---------|---------------|
| Environment | Cost by environment | production, staging, development |
| Team | Cost by team | platform, orders, payments |
| Service | Cost by service | order-service, payment-api |
| CostCenter | Financial allocation | CC-1001, CC-2050 |
| ManagedBy | Automation tracking | terraform, manual, cloudformation |

### Budget Alerts

```
Account-level budget: $50,000/month → Alert at 50%, 80%, 100%
Team-level budget: $10,000/month → Alert at 80%, 100%, 120%
Service-level budget: $2,000/month → Alert at 100%, 150%
```

### Cost Anomaly Detection

AWS Cost Anomaly Detection uses ML to identify unusual spending patterns:
- Automatic detection without manual threshold configuration
- Alerts via SNS, email, or Slack
- Root cause analysis (which service, region, usage type)
- Configure sensitivity and minimum impact threshold

---

## Cross-References

- `07_cost/cost_management.md` — Organizational cost management
- `07_cost/cost_architecture.md` — Cost-aware architecture decisions
- `06_reliability/site_reliability.md` — Cost of reliability targets
- `03_serverless/serverless_operations.md` — Serverless cost optimization
- `Patterns/cost_optimization_pattern.md` — Cost review pattern

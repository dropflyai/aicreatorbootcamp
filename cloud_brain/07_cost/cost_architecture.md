# Cost-Aware Architecture — Serverless vs Containers, Storage Tiering, and CDN Optimization

## Overview

Every architectural decision has a cost implication. Choosing between serverless and containers, selecting a database engine, deciding on storage tiers, and configuring CDN caching all affect the cost profile of a system. Cost-aware architecture does not mean choosing the cheapest option — it means understanding the cost implications of architectural decisions and making informed tradeoffs between cost, performance, reliability, and development velocity. This module codifies cost-aware architectural patterns: serverless vs container economics, database cost optimization, storage tiering strategies, CDN and edge optimization, and architectural patterns that reduce cost at scale.

The cost architecture axiom: the cheapest architecture is not always the best architecture. The best architecture is the one that delivers the required performance and reliability at the lowest sustainable cost.

---

## Serverless vs Containers — Cost Analysis

### Cost Model Comparison

**Serverless (Lambda):**
- Pay per invocation + per millisecond of execution
- Zero cost when idle (no traffic = no cost)
- No server management overhead (reduced ops cost)
- Higher per-unit cost at sustained high volume

**Containers (ECS Fargate / EKS):**
- Pay per vCPU-second + per GB-second (always running)
- Fixed baseline cost regardless of traffic
- Lower per-unit cost at sustained high volume
- Higher operational overhead (cluster management, scaling configuration)

### Crossover Analysis

```
Monthly Cost vs Request Volume:

Cost ($)
│
│     Containers (Fargate)
│    ╱────────────────────────
│   ╱
│  ╱        Lambda
│ ╱       ╱
│╱       ╱
│       ╱
│      ╱
│     ╱
│    ╱
│───╱──────────────────────── Crossover point
│  ╱
│ ╱
│╱
└─────────────────────────────── Requests/month
         ~1M                ~100M

Below crossover: Lambda is cheaper (pay only for what you use)
Above crossover: Containers are cheaper (fixed cost amortized over volume)
```

### Decision Framework

| Factor | Favors Serverless | Favors Containers |
|--------|------------------|-------------------|
| Traffic pattern | Spiky, unpredictable, low baseline | Steady, high baseline |
| Request volume | < 1M requests/month | > 100M requests/month |
| Execution duration | < 1 second average | > 5 seconds average |
| Cold start tolerance | Acceptable (non-real-time) | Unacceptable (real-time) |
| Team expertise | Limited ops experience | Strong ops/K8s experience |
| Startup/MVP | Yes (minimize fixed costs) | No (premature optimization) |
| GPU/specialized compute | No | Yes |
| Long-running processes | No (15min Lambda limit) | Yes |

### Hybrid Architecture (Best of Both)

```
API Layer:     Lambda (API Gateway + Lambda) — scales to zero, handles spiky traffic
Background:    ECS Fargate — steady-state batch processing, always running
Data Pipeline: Lambda — event-driven processing (S3 triggers, SQS consumers)
Real-time:     ECS/EKS — WebSocket servers, streaming, low-latency requirements
```

---

## Database Cost Optimization

### Database Service Selection by Cost

| Service | Best For | Cost Model | Optimization |
|---------|---------|-----------|-------------|
| DynamoDB | Key-value, predictable access | On-demand or provisioned capacity | On-demand for spiky, provisioned + auto-scaling for steady |
| RDS PostgreSQL | Relational, complex queries | Instance hours + storage + I/O | Right-size instance, Reserved Instances, Aurora Serverless v2 for variable |
| Aurora Serverless v2 | Variable relational workloads | ACU (Aurora Capacity Units) per second | Scales to near-zero, pay for actual compute |
| ElastiCache | Caching, session store | Node hours + data transfer | Right-size, reserved nodes, r6g Graviton |
| S3 + Athena | Analytics, data lake queries | Storage + per-query scan | Partitioning reduces scan cost dramatically |

### DynamoDB Cost Optimization

**On-Demand vs Provisioned:**
| Mode | Best For | Pricing |
|------|---------|---------|
| On-Demand | Unpredictable traffic, new tables, spiky workloads | ~$1.25 per million WCU, ~$0.25 per million RCU |
| Provisioned | Predictable, steady traffic | ~$0.00065 per WCU/hour, ~$0.00013 per RCU/hour |
| Provisioned + Auto-scaling | Predictable with peaks | Base provisioned + auto-scale for peaks |
| Reserved Capacity | Very steady, high-volume | Up to 53% discount with 1-year commitment |

**DynamoDB optimization techniques:**
- Use single-table design to reduce table count and RCU/WCU fragmentation
- Use GSI sparingly (each GSI duplicates data and capacity)
- Use DynamoDB Accelerator (DAX) for read-heavy workloads (cache layer)
- Enable TTL for automatic data expiration (reduces storage costs)
- Use projection expressions to read only needed attributes (reduces RCU)

### RDS Cost Optimization

| Optimization | Impact |
|-------------|--------|
| Right-size instance class | 30-70% savings |
| Reserved Instances (1-year, no upfront) | 30-40% savings |
| Aurora Serverless v2 for variable workloads | Pay only for consumed ACUs |
| Read replicas for read-heavy workloads | Offload reads from expensive primary |
| Stop non-production instances outside business hours | 65% savings on dev/staging |
| Graviton instances (r6g, m6g) | 20% better price-performance |

---

## Storage Tiering Strategies

### Data Lifecycle Cost Optimization

```
Day 0-30:    S3 Standard ($0.023/GB)    — Frequently accessed
Day 30-90:   S3 IA ($0.0125/GB)         — Infrequently accessed
Day 90-365:  Glacier Instant ($0.004/GB) — Rarely accessed, instant retrieval
Day 365+:    Glacier Deep ($0.00099/GB)  — Archive, 12h retrieval acceptable

Savings: ~95% storage cost reduction for data older than 1 year
```

### Intelligent Tiering

S3 Intelligent-Tiering automatically moves objects between tiers based on access patterns:
- Frequent Access tier (default)
- Infrequent Access tier (after 30 days without access)
- Archive Instant Access tier (after 90 days — opt-in)
- Archive Access tier (after 90-730 days — opt-in)
- Deep Archive Access tier (after 180-730 days — opt-in)

**Cost:** Small monitoring fee per object ($0.0025 per 1,000 objects/month) but no retrieval charges when accessed. Best for unknown or changing access patterns.

---

## CDN and Edge Optimization

### CloudFront Cost Optimization

| Optimization | Impact |
|-------------|--------|
| Increase cache hit ratio | Reduce origin requests (biggest cost driver) |
| Use CloudFront Functions (not Lambda@Edge) for simple transformations | 1/6 the cost of Lambda@Edge |
| Enable compression (gzip, Brotli) | Reduce data transfer costs |
| Use Origin Shield | Reduce origin load, improve cache hit ratio |
| Price Class selection | Restrict to needed regions (Price Class 100 = US/EU only, cheapest) |

### Cache Hit Ratio Optimization

```
Target: >95% cache hit ratio for static content, >80% for dynamic content

Techniques:
- Normalize query strings (sort parameters, remove tracking params)
- Cache by specific headers only (not Vary: *)
- Use cache policies to control cache key composition
- Set appropriate TTLs (longer = better hit ratio, stale data risk)
- Use stale-while-revalidate for dynamic content
- Cache error responses briefly (prevent origin overload on errors)
```

---

## Architectural Patterns for Cost Reduction

### Event-Driven Architecture

Replace synchronous polling with event-driven processing:
- Polling SQS every second: ~2.6M API calls/month = cost
- Event-driven with EventBridge: events only when needed = lower cost
- Long polling SQS (20s wait): ~130K API calls/month = 20x reduction

### Caching Layer

Add caching to reduce expensive compute and database operations:
```
Without cache: 1M requests → 1M database queries ($$$)
With cache (90% hit rate): 1M requests → 100K database queries ($)
Cache cost: ElastiCache node < database queries saved
```

### Asynchronous Processing

Move non-real-time work to asynchronous processing:
- Synchronous: API Gateway → Lambda → RDS (user waits, Lambda billed for full duration)
- Asynchronous: API Gateway → SQS → Lambda → RDS (user gets immediate response, Lambda processes batch)
- Savings: Batch processing reduces Lambda invocations and enables spot/reserved compute

### Right Architecture for Right Tier

| Tier | Architecture | Cost Profile |
|------|-------------|-------------|
| Free/Hobby | Static site (S3 + CloudFront) | < $1/month |
| Startup | Serverless (Lambda + DynamoDB) | $10-$500/month |
| Growth | Containers (Fargate) + managed databases | $500-$10K/month |
| Scale | Kubernetes (EKS) + reserved compute + CDN | $10K-$100K/month |
| Enterprise | Multi-region, multi-account, dedicated | $100K+/month |

---

## Cost Optimization Checklist

- [ ] All resources tagged with required tags (Environment, Team, Service, CostCenter)
- [ ] Right-sizing recommendations reviewed and applied quarterly
- [ ] Savings Plans/Reserved Instances covering >70% of steady-state compute
- [ ] Spot instances used for fault-tolerant workloads
- [ ] S3 lifecycle policies configured for all buckets
- [ ] Non-production environments stopped outside business hours
- [ ] Idle resources identified and remediated monthly
- [ ] Unit economics tracked and trending favorably
- [ ] Budget alerts configured for all accounts and teams
- [ ] Cost anomaly detection enabled

---

## Cross-References

- `07_cost/cost_optimization.md` — Technical optimization strategies
- `07_cost/cost_management.md` — Organizational cost governance
- `03_serverless/serverless_architecture.md` — Serverless cost model
- `04_containers/container_orchestration.md` — Container cost model
- `Templates/cost_review_template.md` — Cost review template

# High Availability — Multi-AZ, Multi-Region, Failover, and Disaster Recovery

## Overview

High availability (HA) is the characteristic of a system that aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period. In cloud architecture, HA is achieved through redundancy at every layer: compute, storage, networking, and data. This module codifies the mathematics of availability, multi-AZ and multi-region architectures, active-active vs active-passive patterns, failover mechanisms, disaster recovery planning with RTO/RPO targets, and backup strategies.

The HA axiom: everything fails. Hardware fails, software fails, networks fail, regions fail, humans fail. High availability is not the absence of failure — it is the ability to continue operating through failure.

---

## The Mathematics of Availability

### Nines of Availability

| Availability | Downtime/Year | Downtime/Month | Downtime/Day |
|-------------|--------------|----------------|-------------|
| 99% (two nines) | 3.65 days | 7.3 hours | 14.4 minutes |
| 99.9% (three nines) | 8.76 hours | 43.8 minutes | 1.44 minutes |
| 99.95% | 4.38 hours | 21.9 minutes | 43.2 seconds |
| 99.99% (four nines) | 52.6 minutes | 4.38 minutes | 8.64 seconds |
| 99.999% (five nines) | 5.26 minutes | 26.3 seconds | 0.86 seconds |

### Serial vs Parallel Availability

**Serial components (dependencies):**
```
A(system) = A(component1) * A(component2) * ... * A(componentN)

Example: API (99.9%) → Database (99.95%) → Cache (99.99%)
A(system) = 0.999 * 0.9995 * 0.9999 = 99.84%
```
Each additional serial dependency reduces overall availability.

**Parallel components (redundancy):**
```
A(parallel) = 1 - (1 - A(single))^N

Example: Two instances, each 99.9%
A(parallel) = 1 - (1 - 0.999)^2 = 1 - 0.000001 = 99.9999%
```
Adding redundant components dramatically improves availability.

### Cost of Availability

Each additional "nine" costs approximately 10x more than the previous one. The cost curve is exponential:

| Target | Relative Cost | Architecture Requirement |
|--------|-------------|------------------------|
| 99% | 1x | Single instance, basic monitoring |
| 99.9% | 10x | Multi-AZ, load balancing, auto-healing |
| 99.99% | 100x | Multi-region, active-active, automated failover |
| 99.999% | 1000x | Global distribution, zero-downtime deployment, instant failover |

---

## Multi-AZ Architecture

### AWS Availability Zones

An Availability Zone (AZ) is one or more discrete data centers with independent power, cooling, and networking. AZs within a region are connected via low-latency links but are physically separated to provide failure isolation.

### Multi-AZ Compute

```
                    ┌──────────────────┐
                    │   Load Balancer   │
                    │   (cross-AZ)     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──────┐ ┌────▼────────┐ ┌──▼──────────┐
     │   AZ-a        │ │   AZ-b      │ │   AZ-c      │
     │ ┌──────────┐  │ │ ┌─────────┐ │ │ ┌─────────┐ │
     │ │Instance 1│  │ │ │Instance 2│ │ │ │Instance 3│ │
     │ └──────────┘  │ │ └─────────┘ │ │ └─────────┘ │
     └───────────────┘ └─────────────┘ └─────────────┘
```

### Multi-AZ Data

| Service | Multi-AZ Configuration |
|---------|----------------------|
| RDS | Multi-AZ deployment: synchronous replication to standby in different AZ; automatic failover |
| DynamoDB | Automatically replicated across 3 AZs within a region |
| S3 | Automatically replicated across minimum 3 AZs |
| ElastiCache | Multi-AZ with automatic failover |
| EFS | Automatically replicated across AZs in a region |
| EBS | Single AZ; use snapshots + cross-AZ restore for HA |

---

## Multi-Region Architecture

### Active-Passive (Warm Standby)

```
Primary Region (us-east-1)          Secondary Region (us-west-2)
┌─────────────────────┐             ┌─────────────────────┐
│  Active Traffic      │             │  Standby (warm)     │
│  ┌───────────────┐  │             │  ┌───────────────┐  │
│  │  Application   │  │   async     │  │  Application   │  │
│  │  (full scale)  │  │──repl.───→  │  │  (scaled down) │  │
│  └───────────────┘  │             │  └───────────────┘  │
│  ┌───────────────┐  │             │  ┌───────────────┐  │
│  │  Database      │  │   async     │  │  Database      │  │
│  │  (primary)     │  │──repl.───→  │  │  (read replica)│  │
│  └───────────────┘  │             │  └───────────────┘  │
└─────────────────────┘             └─────────────────────┘
         │                                    │
         └────────── Route 53 ────────────────┘
                  (health-check based
                   failover routing)
```

### Active-Active (Multi-Region)

```
Region 1 (us-east-1)               Region 2 (eu-west-1)
┌─────────────────────┐             ┌─────────────────────┐
│  Active Traffic      │             │  Active Traffic      │
│  ┌───────────────┐  │             │  ┌───────────────┐  │
│  │  Application   │  │   bi-dir    │  │  Application   │  │
│  │  (full scale)  │  │◄──repl.──→  │  │  (full scale)  │  │
│  └───────────────┘  │             │  └───────────────┘  │
│  ┌───────────────┐  │             │  ┌───────────────┐  │
│  │  DynamoDB      │  │   global    │  │  DynamoDB      │  │
│  │  Global Table  │  │◄──tables──→ │  │  Global Table  │  │
│  └───────────────┘  │             │  └───────────────┘  │
└─────────────────────┘             └─────────────────────┘
         │                                    │
         └── Route 53 / CloudFront ───────────┘
              (latency-based or
               geolocation routing)
```

### Active-Active Challenges

| Challenge | Solution |
|-----------|---------|
| Data consistency | Eventual consistency acceptable; use conflict resolution (last-writer-wins, CRDTs) |
| Write conflicts | Application-level conflict resolution; avoid same-record writes from multiple regions |
| Cross-region latency | Async replication (accept ~1s lag); users read from local region |
| Cost | 2x compute, 2x+ data storage, cross-region data transfer |
| Complexity | Significantly more complex operations, testing, deployment |

---

## Disaster Recovery — RTO and RPO

### Key Metrics

| Metric | Definition | Question |
|--------|-----------|----------|
| RTO (Recovery Time Objective) | Maximum acceptable downtime | How long can the system be down? |
| RPO (Recovery Point Objective) | Maximum acceptable data loss | How much data can we lose? |

### DR Strategies by Cost and Speed

| Strategy | RTO | RPO | Cost | Description |
|----------|-----|-----|------|-------------|
| Backup & Restore | Hours | Hours | $ | Restore from backups to a new environment |
| Pilot Light | 10-30 min | Minutes | $$ | Core infrastructure running, scale up on failover |
| Warm Standby | Minutes | Seconds-Minutes | $$$ | Scaled-down copy running, scale up on failover |
| Active-Active | Near-zero | Near-zero | $$$$ | Full capacity in multiple regions, traffic split |

### Backup Strategy

| Data Type | Backup Method | Frequency | Retention | Verification |
|-----------|-------------|-----------|-----------|-------------|
| Database (RDS) | Automated snapshots + cross-region copy | Daily (automated) + continuous (WAL) | 35 days (automated) + as needed (manual) | Monthly restore test |
| Object Storage (S3) | Cross-region replication | Continuous | Lifecycle policies | Quarterly verification |
| Application Config | Git (version controlled) | Every change | Indefinite | CI/CD validates |
| Infrastructure State | Terraform state (S3 + versioning) | Every apply | Versioned indefinitely | Plan validates |
| Secrets | Secrets Manager (multi-region) | Real-time replication | Versioned | Quarterly rotation test |

### DR Testing

| Test Type | Frequency | Description |
|-----------|-----------|-------------|
| Tabletop exercise | Quarterly | Walk through DR plan verbally, identify gaps |
| Component failover | Monthly | Failover individual components (RDS, cache, service) |
| Region failover | Semi-annually | Full region failover to secondary region |
| Chaos engineering | Ongoing | Random failure injection in production (controlled) |
| Backup restore | Monthly | Restore from backup to verify data integrity |

---

## Failover Mechanisms

### DNS-Based Failover (Route 53)

| Routing Policy | Use Case |
|---------------|----------|
| Health-check failover | Route to secondary when primary health check fails |
| Latency-based | Route to lowest-latency region (with health checks) |
| Geolocation | Route based on user location |
| Weighted | Gradually shift traffic between regions (canary) |
| Multivalue answer | Return multiple healthy endpoints |

### Database Failover

| Database | Failover Mechanism | Failover Time |
|----------|-------------------|---------------|
| RDS Multi-AZ | Automatic DNS failover to standby | 60-120 seconds |
| Aurora | Automatic promotion of read replica | 30-60 seconds |
| Aurora Global | Manual or automatic cross-region failover | 1-5 minutes |
| DynamoDB Global Tables | Automatic cross-region replication | Near-instant (reads) |
| ElastiCache | Automatic failover to replica | 10-30 seconds |

### Application-Level Failover

- Circuit breaker pattern (stop calling failing dependency, use fallback)
- Retry with exponential backoff and jitter
- Bulkhead pattern (isolate failures to prevent cascading)
- Timeout configuration (do not wait indefinitely for failing services)
- Graceful degradation (serve partial results rather than failing entirely)

---

## Cross-References

- `06_reliability/site_reliability.md` — SRE principles and SLOs
- `06_reliability/observability.md` — Monitoring for HA
- `07_cost/cost_architecture.md` — Cost of high availability
- `Patterns/disaster_recovery_pattern.md` — DR execution pattern
- `Templates/runbook_template.md` — Failover runbook format

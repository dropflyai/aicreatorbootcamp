# Cloud Brain -- Benchmark Tests (Authoritative)

These benchmark scenarios test the Cloud Brain's ability to design, operate, and troubleshoot
cloud infrastructure at production scale. Each scenario must be approached with the rigor
of a senior cloud architect or SRE.

No hand-waving. No "it depends" without specifics. Show your work.

---

## HOW TO USE THESE BENCHMARKS

1. Each scenario presents a realistic cloud infrastructure challenge
2. The Cloud Brain must produce a complete, actionable response
3. Responses are scored against the criteria listed with each scenario
4. Minimum passing score: meet ALL required criteria for the scenario
5. Scenarios are grouped by domain -- complete at least 3 from each group

---

## GROUP A: ARCHITECTURE DESIGN

### Scenario A1: Multi-Region Active-Active for Real-Time Collaboration

**Context:** A real-time collaboration application (think Google Docs competitor) needs
multi-region active-active architecture. Users in North America and Europe must have
sub-100ms latency. Documents are edited simultaneously by up to 50 users.

**Challenge:** Design the complete architecture. Address:
- Data consistency model (strong vs eventual, conflict resolution)
- Real-time sync mechanism (WebSockets, CRDTs, OT)
- Database strategy (multi-region writes, conflict resolution)
- Session management across regions
- Failover behavior when one region goes down

**Required in response:**
- [ ] Architecture diagram (text-based is acceptable)
- [ ] Specific AWS/GCP/Azure services named with justification
- [ ] Data consistency approach with trade-off analysis
- [ ] Conflict resolution strategy for concurrent edits
- [ ] Latency budget breakdown (where the 100ms is spent)
- [ ] Cost estimate (order of magnitude)
- [ ] Failure modes and mitigation for each component

---

### Scenario A2: Event-Driven Microservices for E-Commerce

**Context:** An e-commerce platform processes 10,000 orders per hour at peak.
Current monolith is being decomposed into microservices. Critical path:
Order -> Payment -> Inventory -> Fulfillment -> Notification.

**Challenge:** Design event-driven architecture for the order processing pipeline.

**Required in response:**
- [ ] Event schema design (what events, what fields, versioning)
- [ ] Message broker selection with justification (SQS, SNS, EventBridge, Kafka)
- [ ] Ordering guarantees (FIFO requirements, idempotency)
- [ ] Dead letter queue strategy and poison message handling
- [ ] Saga pattern for distributed transactions (compensating actions)
- [ ] Observability for event flows (how to trace an order across all services)
- [ ] Handling of duplicate events and at-least-once delivery
- [ ] Capacity planning for the message broker

---

### Scenario A3: Zero-Downtime Database Migration

**Context:** Production PostgreSQL RDS (500GB, 5,000 QPS) needs to migrate from
db.r5.2xlarge in us-east-1 to Aurora PostgreSQL Global Database spanning us-east-1
and eu-west-1. Zero downtime required. Application has both read and write traffic.

**Challenge:** Design the migration plan with zero customer-visible downtime.

**Required in response:**
- [ ] Step-by-step migration plan with rollback at each step
- [ ] Data replication strategy during migration
- [ ] Application cutover approach (connection string management)
- [ ] Validation steps (data integrity verification)
- [ ] Estimated timeline for each phase
- [ ] Risk register (what could go wrong, mitigation for each)
- [ ] Communication plan for stakeholders
- [ ] Monitoring during migration (what to watch)

---

### Scenario A4: Serverless at Scale -- Media Processing Pipeline

**Context:** A social media platform processes 1 million image uploads per day.
Each image needs: virus scan, EXIF strip, resize to 5 formats, watermark (premium),
generate thumbnail, run content moderation AI, store metadata.

**Challenge:** Design a serverless architecture that handles this at cost efficiency.

**Required in response:**
- [ ] Complete pipeline architecture with specific services
- [ ] Lambda cold start mitigation strategy
- [ ] Concurrency management (reserved vs provisioned vs on-demand)
- [ ] Cost comparison: serverless vs container-based approach
- [ ] Error handling for each pipeline stage (retry, DLQ, alerting)
- [ ] Performance targets (end-to-end processing time per image)
- [ ] Storage strategy (hot/warm/cold tiering)
- [ ] Content moderation integration with human review escalation

---

### Scenario A5: Kubernetes Multi-Cluster Strategy

**Context:** Organization runs 200 microservices. Currently on a single large EKS cluster
(500 nodes). Experiencing blast radius concerns, noisy neighbor problems, and long
cluster upgrade times.

**Challenge:** Design a multi-cluster strategy that addresses operational concerns.

**Required in response:**
- [ ] Cluster topology (how many clusters, what goes where, naming)
- [ ] Service mesh selection and justification
- [ ] Cross-cluster service discovery and communication
- [ ] Cluster upgrade strategy (in-place vs blue/green clusters)
- [ ] Resource quotas and namespace strategy
- [ ] Centralized observability across clusters
- [ ] GitOps deployment strategy (ArgoCD, Flux)
- [ ] Cost implications of multi-cluster vs single cluster

---

## GROUP B: COST OPTIMIZATION

### Scenario B1: The $50K/Month AWS Bill

**Context:** Current AWS bill is $50,000/month. Breakdown:
- EC2: $22,000 (mix of on-demand m5.xlarge and r5.2xlarge)
- RDS: $8,000 (Multi-AZ r5.xlarge, 3 databases)
- S3: $6,000 (500TB, all Standard tier)
- Data Transfer: $5,000 (cross-region and internet egress)
- Lambda: $3,000 (high invocation count, short duration)
- Other: $6,000 (ELB, CloudWatch, Route53, etc.)

**Challenge:** Find $15,000 in monthly savings without impacting performance or reliability.

**Required in response:**
- [ ] Line-by-line analysis of each cost category
- [ ] Specific savings recommendations with dollar estimates
- [ ] Reserved Instance / Savings Plan recommendations with term analysis
- [ ] S3 storage tiering plan (what percentage moves to IA, Glacier)
- [ ] Data transfer optimization (VPC endpoints, CDN, compression)
- [ ] Lambda optimization (memory tuning, Graviton, duration reduction)
- [ ] Implementation priority order (quick wins first)
- [ ] Risk assessment for each recommendation
- [ ] Total projected savings with confidence range

---

### Scenario B2: Spot Instance Strategy for Batch Processing

**Context:** Data pipeline runs daily, processing 10TB of data. Current setup:
20 x c5.4xlarge on-demand instances for 4 hours = ~$320/day. Pipeline is
fault-tolerant and can handle instance interruptions with checkpointing.

**Challenge:** Design a Spot instance strategy that reduces cost by 70%+ while
maintaining the 4-hour SLA.

**Required in response:**
- [ ] Spot instance pool diversification strategy (instance types, AZs)
- [ ] Interruption handling (checkpointing, graceful shutdown, rebalancing)
- [ ] Capacity planning (what if Spot market is dry)
- [ ] Fallback to on-demand strategy (when, how much, automatic)
- [ ] Cost projection with Spot pricing analysis
- [ ] Monitoring and alerting for Spot interruptions
- [ ] Implementation plan (ASG mixed instances, Spot Fleet, or EMR)

---

### Scenario B3: Database Cost Optimization

**Context:** Three production RDS instances:
1. Primary app DB: r5.2xlarge Multi-AZ, 2TB GP2 storage, $3,500/month
2. Analytics DB: r5.xlarge, 5TB GP2 storage, $2,500/month (heavy reads, light writes)
3. Legacy DB: m5.large, 200GB GP2 storage, $800/month (50 QPS, rarely changes)

**Challenge:** Reduce total database cost by 40% without degrading application performance.

**Required in response:**
- [ ] Per-database analysis of utilization and right-sizing opportunity
- [ ] Reserved Instance recommendations with breakeven analysis
- [ ] Storage optimization (GP2 vs GP3, IOPS analysis, storage type migration)
- [ ] Architecture recommendations (read replicas, caching, offloading analytics)
- [ ] Aurora vs RDS cost comparison for each workload
- [ ] Legacy database modernization path (serverless, DynamoDB, or decommission)
- [ ] Implementation order and timeline
- [ ] Expected monthly savings

---

## GROUP C: INCIDENT RESPONSE AND OPERATIONS

### Scenario C1: Production Database Failover

**Context:** 2:00 AM alert: primary RDS instance in us-east-1a is unreachable.
Multi-AZ failover should have triggered but the application is returning 500 errors.
Customer-facing application with 10,000 concurrent users. SLA: 99.95% uptime.

**Challenge:** Walk through the incident response from alert to resolution to post-mortem.

**Required in response:**
- [ ] First 5 minutes: triage steps (what to check, in what order)
- [ ] Diagnosis decision tree (is it RDS, is it network, is it application)
- [ ] Manual failover procedure if automatic failover failed
- [ ] Application-side investigation (connection pool, DNS caching, health checks)
- [ ] Customer communication template (status page update)
- [ ] Escalation criteria (when to page AWS support, when to involve leadership)
- [ ] Timeline of actions with expected duration for each
- [ ] Post-mortem structure (5 whys, action items, prevention)

---

### Scenario C2: Cascading Failure in Microservices

**Context:** Payment service latency increases from 200ms to 5 seconds. This causes:
- Order service: thread pool exhaustion, returns 503
- Cart service: timeout failures, returns 500
- Frontend: loading spinners, users rage-clicking
- Load balancer: health checks failing, removing instances
- Auto-scaling: scaling up aggressively (cost spike)

**Challenge:** Diagnose and resolve the cascading failure. Then prevent recurrence.

**Required in response:**
- [ ] Immediate stabilization steps (in priority order)
- [ ] Diagnosis approach (distributed tracing, metrics correlation)
- [ ] Circuit breaker implementation for each affected service
- [ ] Bulkhead pattern to prevent resource exhaustion
- [ ] Timeout and retry policy recommendations per service
- [ ] Load shedding strategy (graceful degradation)
- [ ] Auto-scaling policy corrections (prevent runaway scaling)
- [ ] Architecture changes to prevent recurrence
- [ ] Runbook for this failure class

---

### Scenario C3: Security Incident -- Compromised IAM Credentials

**Context:** GuardDuty alert: anomalous API calls from an IAM user key.
Calls include: ListBuckets, GetObject on multiple S3 buckets, DescribeInstances,
CreateUser. Source IP is from an unknown geography. The key belongs to a CI/CD pipeline.

**Challenge:** Execute the incident response procedure.

**Required in response:**
- [ ] Immediate containment steps (what to disable, in what order)
- [ ] Scope assessment (what did the attacker access, what did they modify)
- [ ] CloudTrail analysis approach (what to search for, time window)
- [ ] Data exfiltration assessment (which buckets accessed, what data)
- [ ] Credential rotation plan (not just the compromised key)
- [ ] Forensic preservation (what to capture before remediation)
- [ ] Communication plan (internal, legal, customers if data breach)
- [ ] Hardening measures to prevent recurrence
- [ ] Compliance notification requirements (GDPR, SOC2, HIPAA if applicable)

---

### Scenario C4: Mysterious Performance Degradation

**Context:** Application latency has gradually increased from P99 of 500ms to P99 of
2,500ms over the past 3 weeks. No deployments during this period. Traffic has been
stable. CPU and memory utilization look normal. Users are complaining.

**Challenge:** Develop a systematic investigation plan and identify likely root causes.

**Required in response:**
- [ ] Investigation methodology (what to check, in what order)
- [ ] Metrics to examine (beyond CPU/memory)
- [ ] Database investigation (query plans, index bloat, vacuum stats, connection pool)
- [ ] Network investigation (cross-AZ latency, DNS resolution time, NLB/ALB metrics)
- [ ] Application investigation (GC pauses, thread contention, memory leaks)
- [ ] External dependency investigation (third-party API latency changes)
- [ ] Top 5 most likely root causes ranked by probability
- [ ] Diagnostic commands/queries for each hypothesis
- [ ] Remediation plan for each likely root cause

---

### Scenario C5: Region Failure -- Full DR Execution

**Context:** AWS us-east-1 experiences a major outage affecting EC2, RDS, and S3
for your production environment. You have a warm standby in us-west-2.
10,000 active users. RTO: 30 minutes. RPO: 5 minutes.

**Challenge:** Execute full failover and then plan failback.

**Required in response:**
- [ ] Failover decision criteria (when to trigger DR vs wait for recovery)
- [ ] Step-by-step failover runbook (ordered, with time estimates per step)
- [ ] DNS failover procedure (Route53 health checks, manual override)
- [ ] Database failover (Aurora Global Database promotion, data loss assessment)
- [ ] Application configuration changes required in DR region
- [ ] Verification steps (how to confirm DR environment is serving traffic correctly)
- [ ] Customer communication at each stage (incident, failover, recovered)
- [ ] Failback plan after primary region recovers
- [ ] Data reconciliation between regions after failback

---

## GROUP D: INFRASTRUCTURE AS CODE

### Scenario D1: IaC for Complete Application Stack

**Context:** New application requires: VPC with public/private subnets across 3 AZs,
ALB, ECS Fargate cluster, RDS Aurora PostgreSQL, ElastiCache Redis, S3 buckets,
CloudFront distribution, Route53 DNS, ACM certificates, and all necessary IAM roles.

**Challenge:** Design the Terraform/CDK module structure for this stack.

**Required in response:**
- [ ] Module decomposition (what modules, what resources in each)
- [ ] Variable design (what is configurable, what is fixed)
- [ ] State management strategy (how many state files, backend config)
- [ ] Environment parameterization (how dev/staging/prod differ)
- [ ] Naming and tagging convention
- [ ] Security considerations in IaC (no secrets in state, least privilege)
- [ ] Testing strategy for IaC (plan validation, policy-as-code, integration tests)
- [ ] CI/CD pipeline for IaC changes

---

### Scenario D2: IaC Drift Remediation

**Context:** Drift detection reveals 47 resources have drifted from their Terraform
state in production. Drifted resources include: 12 security group rules, 8 IAM policy
changes, 15 EC2 instance tag changes, 7 S3 bucket policy changes, 5 RDS parameter
group changes. Some changes were intentional emergency fixes.

**Challenge:** Develop a strategy to remediate drift without causing outages.

**Required in response:**
- [ ] Triage process (categorize: intentional vs unintentional, risky vs safe)
- [ ] Priority order for remediation
- [ ] Strategy for each resource type (import, refresh, or revert)
- [ ] Safety measures during remediation (plan review, targeted applies)
- [ ] Process changes to prevent future drift
- [ ] Tooling recommendations for continuous drift detection
- [ ] Communication plan for teams that made manual changes

---

### Scenario D3: Multi-Account IaC Strategy

**Context:** Organization is growing from 1 AWS account to a multi-account setup:
Management, Security, Log Archive, Shared Services, Dev, Staging, Production.
100+ developers need access. Currently everything is in one account with IaC.

**Challenge:** Design the multi-account IaC strategy using AWS Organizations.

**Required in response:**
- [ ] Account structure and OU hierarchy
- [ ] Landing zone approach (Control Tower vs custom)
- [ ] Cross-account IaC execution (how Terraform runs across accounts)
- [ ] Shared module strategy (how teams reuse infrastructure modules)
- [ ] State management across accounts
- [ ] IAM strategy (SSO, role assumption, break-glass)
- [ ] Network architecture (hub-and-spoke, Transit Gateway)
- [ ] Guardrails (SCPs, preventive and detective controls)
- [ ] Migration plan from single account to multi-account

---

## GROUP E: OBSERVABILITY AND PERFORMANCE

### Scenario E1: SLO Definition for a SaaS Platform

**Context:** SaaS platform with: API gateway, 5 microservices, PostgreSQL database,
Redis cache, S3 storage. Customer-facing API serves 1 million requests per day.
Business requires 99.9% availability and P99 latency < 500ms.

**Challenge:** Define the complete SLO framework.

**Required in response:**
- [ ] SLO definitions for each service tier
- [ ] SLI selection (what to measure, how to measure it)
- [ ] Error budget calculation and tracking method
- [ ] Error budget policy (what happens when budget is exhausted)
- [ ] Dashboard design (what panels, what thresholds)
- [ ] Alert rules derived from SLOs (multi-window, multi-burn-rate)
- [ ] Reporting cadence and audience
- [ ] SLO review process (how often, who is involved)

---

### Scenario E2: Debugging Distributed System Latency

**Context:** User request flows: CDN -> ALB -> API Gateway -> Auth Service ->
Product Service -> Database. P50 latency is 120ms (acceptable). P99 is 3.2 seconds
(unacceptable, target is 500ms). P99.9 is 12 seconds.

**Challenge:** Design the investigation and resolution strategy.

**Required in response:**
- [ ] Tracing strategy to identify where latency is introduced
- [ ] Per-hop latency analysis approach
- [ ] Likely culprits for P99 vs P50 divergence
- [ ] Database query analysis (slow query log, explain plans)
- [ ] Connection pool analysis (exhaustion, wait times)
- [ ] GC and runtime investigation
- [ ] CDN cache hit rate and miss latency
- [ ] Specific remediation recommendations for top 3 causes
- [ ] Target metrics after remediation

---

### Scenario E3: Alert Fatigue Resolution

**Context:** On-call team receives 200+ alerts per week. 80% are non-actionable.
Team morale is low. Pages happen at 3 AM for issues that resolve themselves.
Alert sources: CloudWatch (120), Datadog (50), PagerDuty (30), custom scripts (varies).

**Challenge:** Fix the alerting system.

**Required in response:**
- [ ] Alert audit methodology (how to categorize all 200+ alerts)
- [ ] Classification criteria (actionable, informational, noise, duplicate)
- [ ] Alert consolidation strategy (reduce duplicate/correlated alerts)
- [ ] Severity level redesign (P1-P4 definitions)
- [ ] SLO-based alerting migration plan
- [ ] Noise reduction targets (week 1, month 1, month 3)
- [ ] Self-healing automation opportunities
- [ ] On-call rotation improvements
- [ ] Success metrics for alerting health

---

## SCORING GUIDE

### Per-Scenario Scoring

| Criteria | Points |
|----------|--------|
| All required items addressed | 40 |
| Technical accuracy | 20 |
| Specificity (named services, actual numbers, real commands) | 15 |
| Trade-off analysis (pros/cons, alternatives considered) | 10 |
| Operational readiness (runbooks, monitoring, rollback) | 10 |
| Communication and documentation | 5 |

### Passing Threshold

- Individual scenario: >= 70 points
- Overall benchmark: >= 75% of scenarios passed
- No GROUP with 0 passes

### Disqualifying Responses

- "It depends" without then providing specific options and criteria
- Recommending services without explaining why that service over alternatives
- Ignoring cost implications
- Ignoring security implications
- No rollback plan for any change
- Vague answers like "use auto-scaling" without specifics

---

## BENCHMARK MAINTENANCE

- Scenarios updated quarterly to reflect new services and patterns
- New scenarios added after significant incidents
- Retired scenarios archived (not deleted)
- Difficulty calibrated to senior cloud architect level

---

**These benchmarks are the minimum bar. Production infrastructure demands rigor.**

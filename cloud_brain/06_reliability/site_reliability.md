# Site Reliability Engineering — SRE Principles, SLI/SLO/SLA, and Error Budgets

## Overview

Site Reliability Engineering (SRE), pioneered at Google and codified in the "Site Reliability Engineering" book (Betsy Beyer et al., 2016), applies software engineering principles to operations problems. SRE treats operations as a software problem — automating toil, defining reliability targets mathematically, and using error budgets to balance reliability with feature velocity. This module codifies SRE principles: Service Level Indicators (SLIs), Service Level Objectives (SLOs), Service Level Agreements (SLAs), error budgets, and toil reduction.

The SRE axiom: 100% reliability is the wrong target. Every increment of reliability beyond what users need costs exponentially more and slows feature development. The correct target is the reliability level that satisfies users — no more, no less.

---

## SRE Principles

### Core Tenets

1. **Operations is a software problem.** Automate everything that can be automated. Manual operations that are repetitive, automatable, and devoid of enduring value are "toil" and must be eliminated.

2. **SLOs with consequences.** Reliability targets are defined mathematically and enforced. When reliability drops below the target, feature development slows to focus on reliability.

3. **Reduce organizational silos.** SRE teams share ownership with development teams. Development teams that cause excessive operational burden take on that operational work.

4. **Move fast by reducing cost of failure.** With proper SLOs, monitoring, rollback mechanisms, and incremental rollouts, the risk of deploying frequently is manageable.

5. **Embrace risk.** Not all services need the same reliability level. A user-facing payment API needs higher reliability than an internal batch processing system.

### SRE Team Model

| Model | Description | When to Use |
|-------|-------------|-------------|
| Embedded SRE | SRE engineers on product teams | Smaller orgs, close collaboration needed |
| Centralized SRE | Dedicated SRE team serving multiple services | Larger orgs, shared expertise |
| Consulting SRE | SRE advises, does not own | Teams building SRE capability |
| Platform SRE | SRE builds shared platform, teams self-serve | Mature orgs with IDP |

---

## SLI — Service Level Indicator

### Definition

An SLI is a quantitative measure of a specific aspect of the service level. It is the measurement that feeds the SLO.

### Common SLI Types

| SLI Type | Definition | Measurement |
|----------|-----------|-------------|
| Availability | Proportion of time the service is operational | Successful requests / total requests |
| Latency | Proportion of requests faster than a threshold | Requests < 200ms / total requests |
| Error rate | Proportion of requests that succeed | 1 - (error responses / total responses) |
| Throughput | Volume of requests processed per time unit | Requests per second |
| Correctness | Proportion of responses returning correct data | Correct responses / total responses |
| Freshness | Proportion of data updated within threshold | Records updated within T / total records |

### SLI Specification Best Practices

**Good SLI:** "The proportion of HTTP GET requests to the /api/orders endpoint that return a 2xx response within 200 milliseconds, measured at the load balancer."

**Bad SLI:** "API response time" (ambiguous — which API? which percentile? measured where?)

**SLI Requirements:**
- Directly measurable from production telemetry
- Meaningful to users (correlates with user experience)
- Consistent over time (not affected by measurement methodology changes)
- Measured at the boundary closest to the user (load balancer > application > database)

---

## SLO — Service Level Objective

### Definition

An SLO is a target value or range for an SLI. It defines the acceptable reliability level for a service.

### SLO Examples

| Service | SLI | SLO | Window |
|---------|-----|-----|--------|
| Order API | Availability | 99.9% of requests succeed | 30-day rolling |
| Order API | Latency | 95% of requests < 200ms, 99% < 500ms | 30-day rolling |
| Payment Processing | Availability | 99.95% of transactions succeed | 30-day rolling |
| Search Service | Latency | 90% of requests < 100ms | 30-day rolling |
| Batch Processing | Freshness | 99% of records processed within 1 hour | 24-hour rolling |

### SLO Design Process

1. **Identify critical user journeys** — What actions do users take that matter most?
2. **Determine SLIs for each journey** — What measurements indicate the journey is working?
3. **Set initial SLO targets** — Based on historical data, user expectations, and business requirements
4. **Measure and iterate** — Adjust SLOs based on actual user satisfaction and operational experience
5. **Document SLOs** — Make SLOs visible to all stakeholders

### SLO Window Types

| Window | Description | Use Case |
|--------|-------------|----------|
| Rolling (30-day) | Continuously calculated over trailing 30 days | Most common, smooth, responsive |
| Calendar (monthly) | Reset at beginning of each month | Budget planning, reporting |
| Rolling (7-day) | Trailing 7-day window | Fast feedback, volatile services |

---

## SLA — Service Level Agreement

### SLO vs SLA

| Aspect | SLO | SLA |
|--------|-----|-----|
| Audience | Internal team | External customers (contractual) |
| Consequence | Error budget impact, development slowdown | Financial penalties, credits, contract breach |
| Target | Aggressive (pushes reliability higher) | Conservative (buffer below SLO) |
| Example | 99.95% availability (SLO) | 99.9% availability (SLA) — 0.05% buffer |

**Rule:** The SLA must be less stringent than the SLO. If SLO = SLA, you are contractually obligated to maintain a target with zero error budget for improvement.

---

## Error Budgets — Balancing Reliability and Velocity

### Error Budget Calculation

```
Error Budget = 1 - SLO target

For SLO of 99.9% availability:
  Error Budget = 1 - 0.999 = 0.1% = 0.001

In a 30-day month (43,200 minutes):
  Allowed downtime = 43,200 * 0.001 = 43.2 minutes

In requests (1 million requests/month):
  Allowed failures = 1,000,000 * 0.001 = 1,000 failed requests
```

### Error Budget by Availability Target

| SLO | Error Budget (30 days) | Implication |
|-----|----------------------|-------------|
| 99% | 7.2 hours | Very permissive; suitable for internal tools |
| 99.5% | 3.6 hours | Moderate; suitable for non-critical services |
| 99.9% | 43.2 minutes | Standard for production APIs |
| 99.95% | 21.6 minutes | Stringent; requires significant investment |
| 99.99% | 4.3 minutes | Extremely stringent; multi-region, active-active |
| 99.999% | 26 seconds | Practically zero downtime; telecom/finance grade |

### Error Budget Policy

The error budget policy defines what happens when the error budget is consumed:

**Budget remaining > 50%:** Normal operations. Ship features, run experiments.

**Budget remaining 25-50%:** Caution. Increase deployment testing, slow down risky changes, prioritize reliability work.

**Budget remaining < 25%:** Freeze. No feature deployments. All engineering effort focused on reliability improvements. Only bug fixes and reliability improvements deployed.

**Budget exhausted (0%):** Full freeze. Emergency reliability improvement sprint. Postmortem for every incident that consumed budget. Architecture review for systemic reliability improvements.

### Error Budget as Decision Framework

The error budget explicitly answers: "Should we ship this feature or improve reliability?"

- If error budget is healthy → Ship features (the service is reliable enough)
- If error budget is depleted → Improve reliability (the service is failing users)

This removes the political negotiation between product and engineering. The math decides.

---

## Toil Reduction

### Defining Toil

Toil is work that is:
- Manual (requires human action)
- Repetitive (done over and over)
- Automatable (could be done by software)
- Tactical (interrupt-driven, not strategic)
- Devoid of enduring value (does not make the system better)
- Linear scaling (grows with service size)

### Toil Measurement

**Target:** SRE teams should spend no more than 50% of time on toil. The remaining 50% is for engineering work that eliminates toil.

**Toil tracking:**
- Categorize on-call tasks: toil vs engineering vs investigation
- Measure time spent on repetitive manual tasks per sprint
- Track automation projects and their toil reduction impact
- Report toil percentage as a team health metric

### Toil Elimination Strategies

| Strategy | Example |
|----------|---------|
| Automate manual procedures | Automate certificate rotation that was manual |
| Self-service | Platform portal eliminates "provision my database" tickets |
| Self-healing | Auto-restart failed processes, auto-scale under load |
| Eliminate the source | Remove flaky test that requires manual re-run |
| Reduce frequency | Batch operations instead of per-request processing |

---

## SRE Practices

### On-Call

| Practice | Standard |
|----------|---------|
| Rotation length | 1 week primary, 1 week secondary |
| Maximum incidents per shift | 2 significant incidents (more indicates systemic issues) |
| Response time | 5 minutes for page, 15 minutes for investigation start |
| Compensation | On-call compensation per local requirements |
| Handoff | Written handoff document at rotation change |
| Postmortem | Required for every incident consuming error budget |

### Blameless Postmortems

Every significant incident produces a postmortem that:
- Documents the timeline without blame
- Identifies root cause and contributing factors
- Generates actionable improvement items with owners
- Is shared openly (learning from failure is organizational value)
- Tracks action items to completion

---

## Cross-References

- `06_reliability/high_availability.md` — HA architecture
- `06_reliability/observability.md` — Monitoring and alerting
- `07_cost/cost_optimization.md` — Cost-aware reliability
- `03_serverless/serverless_operations.md` — Serverless SRE
- `Templates/runbook_template.md` — Operational runbooks

# Performance Metrics — Measurement, Percentiles, and Analysis

## Overview

Performance metrics quantify system behavior under load. Raw numbers are meaningless without context — a 200ms response time is excellent for a database-heavy report but unacceptable for a health check endpoint. Effective performance analysis requires understanding what to measure, how to measure it correctly, how to interpret statistical distributions, and how to set meaningful thresholds. The most dangerous performance metric is the average: it hides the tail latency that real users experience.

This module covers the science of performance measurement: the RED and USE methods for systematic metric collection, percentile analysis for understanding latency distributions, Apdex scoring for user satisfaction, and the correlation techniques that connect application metrics to infrastructure utilization.

---

## Metric Frameworks

### RED Method (Request-Oriented)

The RED method measures the workload from the perspective of incoming requests:

| Metric | Definition | What It Reveals |
|--------|-----------|----------------|
| **R**ate | Requests per second served | Throughput and demand |
| **E**rrors | Requests per second that fail | Reliability under load |
| **D**uration | Time per request (distribution) | User experience |

**When to use:** For request-driven services (APIs, web servers, microservices).

```
RED Dashboard Layout:
┌─────────────────────────────────────────────────────┐
│  Rate: 1,250 req/s (↑12% from last week)           │
│  ████████████████████████████████                    │
├─────────────────────────────────────────────────────┤
│  Errors: 0.3% (within 1% SLO)                      │
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░                    │
├─────────────────────────────────────────────────────┤
│  Duration (p50/p95/p99): 45ms / 120ms / 350ms      │
│  p50: ██████                                         │
│  p95: ████████████████                               │
│  p99: ███████████████████████████████████████         │
└─────────────────────────────────────────────────────┘
```

### USE Method (Resource-Oriented)

The USE method measures infrastructure resources:

| Metric | Definition | What It Reveals |
|--------|-----------|----------------|
| **U**tilization | Percentage of resource capacity in use | How close to saturation |
| **S**aturation | Degree to which work is queued | Overload indicator |
| **E**rrors | Resource-level error count | Hardware or driver issues |

**Apply USE to each resource:**

| Resource | Utilization | Saturation | Errors |
|----------|------------|-----------|--------|
| CPU | CPU % per core | Run queue length | Machine checks |
| Memory | Used / Total | Swap usage, OOM kills | ECC errors |
| Disk I/O | IOPS / Max IOPS | I/O queue depth | Read/write errors |
| Network | Bandwidth / Capacity | TCP retransmits | Interface errors |
| Connection pool | Active / Max | Waiting threads | Timeout errors |
| Thread pool | Active / Max | Queued tasks | Rejected tasks |

**When to use:** For infrastructure analysis, bottleneck identification, capacity planning.

---

## Percentile Analysis

### Why Averages Lie

```
Consider 10 response times (ms):
[50, 52, 48, 55, 51, 49, 53, 50, 52, 500]

Average: 96ms ← Misleading! 9 of 10 users had ~50ms experience
Median (p50): 51ms ← Represents the typical user
p95: 500ms ← 1 in 20 users waits 500ms
p99: 500ms ← The worst experience your frequent users have
```

### Percentile Definitions

| Percentile | Meaning | Use Case |
|-----------|---------|----------|
| p50 (median) | 50% of requests are faster | Typical user experience |
| p90 | 90% faster, 10% slower | Good experience threshold |
| p95 | 95% faster, 5% slower | SLO target for most services |
| p99 | 99% faster, 1% slower | Tail latency — affects power users |
| p99.9 | 999 of 1000 faster | Critical for high-traffic services |
| Max | Absolute worst case | Outlier detection |

### Percentile Math

```
For N sorted values, the kth percentile value is at index:
  index = ceil(k/100 * N)

Example: 100 sorted response times, p95:
  index = ceil(0.95 * 100) = 95
  p95 = value at position 95

For streaming data, use approximation algorithms:
  - t-digest (Dunning): memory-efficient, mergeable
  - HDR Histogram: constant memory, microsecond precision
  - DD Sketch: relative error guarantee
```

### Percentile Properties

| Property | Implication |
|----------|------------|
| Not additive | p95(A) + p95(B) != p95(A+B) |
| Not averageable | Average of p95s across servers != system p95 |
| Sensitive to sample size | Need 1000+ samples for stable p99 |
| Sensitive to outliers | Single slow request can move p99 significantly |
| Requires raw data or histograms | Cannot compute from pre-aggregated averages |

---

## Apdex Score

### Application Performance Index

Apdex provides a single score (0 to 1) representing user satisfaction:

```
Apdex = (Satisfied + Tolerating/2) / Total

Where:
  Satisfied:  response time <= T (threshold)
  Tolerating: response time > T and <= 4T
  Frustrated: response time > 4T

Example: T = 500ms, 1000 requests
  - 800 requests < 500ms (Satisfied)
  - 150 requests between 500ms-2000ms (Tolerating)
  - 50 requests > 2000ms (Frustrated)

  Apdex = (800 + 150/2) / 1000 = 0.875
```

### Apdex Interpretation

| Score | Rating | User Perception |
|-------|--------|----------------|
| 0.94 - 1.00 | Excellent | Users rarely notice delays |
| 0.85 - 0.93 | Good | Most users satisfied |
| 0.70 - 0.84 | Fair | Some users frustrated |
| 0.50 - 0.69 | Poor | Many users frustrated |
| < 0.50 | Unacceptable | Majority frustrated |

### Setting Apdex Thresholds

| Endpoint Type | T (Satisfied) | 4T (Frustrated) | Rationale |
|--------------|---------------|------------------|-----------|
| Health check | 50ms | 200ms | Must be fast for LB |
| API read | 200ms | 800ms | User-facing latency |
| API write | 500ms | 2000ms | Acceptable for mutations |
| Search | 300ms | 1200ms | User expects quick results |
| Report generation | 2000ms | 8000ms | Users tolerate longer waits |
| File upload | 5000ms | 20000ms | Depends on file size |

---

## Throughput Metrics

### Requests Per Second (RPS)

```
Throughput = Total Requests / Time Period

Sustained throughput vs burst throughput:
  Sustained: Average RPS over 5+ minutes
  Burst: Peak RPS in any 1-second window

Example:
  Sustained: 1,200 req/s (5-minute average)
  Burst: 3,500 req/s (1-second peak during traffic spike)
```

### Little's Law

```
L = λ × W

Where:
  L = average number of concurrent requests in system
  λ = average arrival rate (requests per second)
  W = average time in system (seconds)

Example:
  λ = 1000 req/s, W = 0.1s (100ms)
  L = 1000 × 0.1 = 100 concurrent requests

Implication: If average response time doubles (200ms),
  concurrent requests double (200), requiring more resources.
```

### Throughput Ceiling

```
Throughput is bounded by the bottleneck resource:

Max Throughput = min(
  CPU capacity / CPU per request,
  Memory capacity / Memory per request,
  DB connections / DB time per request,
  Network bandwidth / Payload per request,
  Thread pool size / Processing time per request
)

Example:
  50 DB connections, 20ms per query, 2 queries per request
  DB-limited throughput = 50 / (0.020 × 2) = 1,250 req/s
```

---

## Latency Breakdown

### Request Lifecycle Timing

```
Total Response Time = DNS + TCP + TLS + TTFB + Content Transfer

┌──────┬──────┬──────┬────────────────────┬──────────┐
│ DNS  │ TCP  │ TLS  │      TTFB          │ Transfer │
│Lookup│Handsh│Handsh│  (Server Think)     │ (Body)   │
│ 5ms  │ 20ms │ 30ms │     100ms          │  15ms    │
└──────┴──────┴──────┴────────────────────┴──────────┘
                       │
              ┌────────┴────────┐
              │ Server Breakdown│
              │  Auth: 5ms      │
              │  Route: 1ms     │
              │  Query: 40ms    │
              │  Serialize: 2ms │
              │  Cache: 3ms     │
              │  Logic: 49ms    │
              └─────────────────┘
```

### Server-Side Timing Headers

```http
Server-Timing: db;dur=40, cache;dur=3, auth;dur=5, app;dur=52
```

---

## Error Rate Analysis

### Error Categories

| Category | HTTP Codes | Meaning | Impact |
|----------|-----------|---------|--------|
| Client errors | 4xx | Client sent bad request | Usually not a system issue |
| Server errors | 5xx | Server failed to process | System reliability issue |
| Timeout errors | 408, 504 | Request exceeded time limit | Performance issue |
| Rate limit | 429 | Client exceeding quota | Capacity or abuse |

### Error Rate Calculation

```
Error Rate = (5xx responses + timeouts) / Total Responses × 100

Exclude from error rate:
  - 4xx (client errors — not our fault)
  - 429 (rate limiting — by design)
  - Retried requests that eventually succeed

Include in error rate:
  - 500, 502, 503, 504
  - Connection timeouts
  - Connection refused
  - Circuit breaker trips
```

### Error Budget

```
If SLO = 99.9% availability:
  Error budget = 0.1% of requests per month
  At 1,000,000 requests/month = 1,000 allowed errors

Error budget consumption rate:
  If burning 100 errors/day = 10 days to exhaust monthly budget
  If burning 500 errors/day = 2 days to exhaust → alert and investigate
```

---

## Resource Utilization Metrics

### CPU Metrics

| Metric | Description | Red Flag |
|--------|------------|----------|
| User CPU % | Application code execution | Sustained >70% |
| System CPU % | Kernel/OS operations | >20% (may indicate I/O issues) |
| I/O Wait % | Waiting for disk I/O | >10% (I/O bottleneck) |
| Steal % | Hypervisor taking CPU (cloud) | >5% (noisy neighbor) |
| Load average | Run queue length (1/5/15 min) | > number of CPU cores |

### Memory Metrics

| Metric | Description | Red Flag |
|--------|------------|----------|
| RSS (Resident Set Size) | Physical memory used | Growing trend over hours |
| Heap used vs allocated | Application memory | Heap approaching max |
| GC frequency | Garbage collection rate | Increasing over time |
| GC pause time | Time spent in GC | >100ms pauses |
| Swap usage | Overflow to disk | Any swap usage |
| OOM kills | Kernel killing processes | Any occurrence |

### Database Metrics

| Metric | Description | Red Flag |
|--------|------------|----------|
| Active connections | Current DB connections | >80% of max_connections |
| Query duration (p95) | Slow query detection | Increasing trend |
| Rows examined/returned | Query efficiency | Examined >> returned (missing index) |
| Lock wait time | Contention | Any significant waiting |
| Replication lag | Read replica freshness | >1 second (depends on RPO) |
| Buffer pool hit rate | Cache effectiveness | <95% (need more memory) |

---

## Performance Baselines and SLOs

### Establishing Baselines

```
Baseline Procedure:
1. Run load test at current production traffic level
2. Collect all metrics for 30+ minutes of steady state
3. Record p50, p95, p99 for each endpoint
4. Record resource utilization at each percentile
5. This becomes the reference for regression detection

Baseline Table:
| Endpoint        | p50  | p95   | p99   | Throughput | CPU  | Memory |
|----------------|------|-------|-------|-----------|------|--------|
| GET /products  | 25ms | 80ms  | 150ms | 500 rps   | 15%  | 2.1GB  |
| POST /orders   | 80ms | 200ms | 450ms | 100 rps   | 25%  | 2.3GB  |
| GET /search    | 50ms | 150ms | 300ms | 200 rps   | 20%  | 2.2GB  |
```

### Performance SLOs

| Tier | Endpoint Type | p95 Target | p99 Target | Error Rate |
|------|--------------|-----------|-----------|-----------|
| Tier 1 | Revenue-critical (checkout) | <300ms | <1000ms | <0.1% |
| Tier 2 | User-facing (browse, search) | <500ms | <1500ms | <0.5% |
| Tier 3 | Internal API | <1000ms | <3000ms | <1.0% |
| Tier 4 | Background jobs | <5000ms | <15000ms | <2.0% |

---

## Correlation Analysis

### Identifying Bottlenecks

```
When latency increases, check resources in this order:

1. Database query time ↑ → Index missing, lock contention, slow query
   Action: EXPLAIN ANALYZE, add index, optimize query

2. CPU utilization ↑ → Compute-bound processing
   Action: Profile code, optimize hot paths, scale out

3. Memory pressure ↑ → Memory leak or insufficient allocation
   Action: Heap dump analysis, increase memory, fix leak

4. Network I/O ↑ → Large payloads, chatty protocols
   Action: Compress, paginate, batch requests

5. External API latency ↑ → Upstream dependency slow
   Action: Circuit breaker, caching, fallback

6. Connection pool exhausted → All connections in use
   Action: Increase pool, reduce hold time, connection pooler
```

---

## Performance Reporting

### Report Structure

| Section | Content |
|---------|---------|
| Executive summary | One-paragraph status with Apdex score |
| Test configuration | Load profile, duration, environment |
| Results summary | p50/p95/p99 for each endpoint |
| Throughput analysis | Max sustained throughput, bottleneck |
| Error analysis | Error types, rates, root causes |
| Resource utilization | CPU, memory, disk, network at peak |
| Comparison to baseline | Regression or improvement |
| Recommendations | Prioritized optimization actions |

---

## Cross-References

- `04_performance/performance_testing.md` — Test types and execution
- `04_performance/performance_engineering.md` — Optimization techniques
- `07_management/test_metrics.md` — Quality metrics and reporting
- `07_management/test_reporting.md` — Report generation
- `06_ci_cd/quality_gates.md` — Performance gates in CI


# Performance Testing — Load, Stress, Capacity Planning, and Bottleneck Identification

## What This Enables

**Decisions it helps make:**
- Whether a system can handle projected user growth without architectural rework
- Which infrastructure investments yield the highest throughput gains per dollar
- When to trigger horizontal scaling versus vertical scaling versus code optimization
- Whether a release candidate meets production readiness from a latency and throughput standpoint

**Mistakes it prevents:**
- Deploying a system that collapses under 2x expected load because nobody tested beyond happy-path concurrency
- Misidentifying the bottleneck (optimizing CPU-bound code when the real constraint is database I/O)
- Conflating average response time with user-perceived performance (ignoring p99 tail latency)
- Running performance tests on unrealistic environments and drawing false conclusions about production capacity

**Outputs it enables:**
- Capacity models mapping concurrent users to infrastructure cost
- Performance budgets integrated into CI/CD quality gates
- Bottleneck analysis reports with root-cause attribution and remediation priority
- Load profile specifications derived from production traffic analysis

---

## The Core Insight

Performance testing is not about proving a system is "fast enough." It is about building a **predictive model** of system behavior under variable load so that capacity decisions can be made with quantifiable confidence rather than hope. Every system has a saturation point -- a load level beyond which response times degrade non-linearly. The purpose of performance testing is to locate that saturation point, understand which resource (CPU, memory, I/O, network, connection pool, thread pool) constrains it, and determine whether the constraint can be relaxed through optimization or requires architectural change.

The distinction between performance test types -- load, stress, soak, spike, breakpoint -- is not taxonomic pedantry. Each type is designed to reveal a different class of defect that the others cannot find. A system that passes load testing at 100% projected capacity may still leak memory over 48 hours (soak), collapse under sudden traffic spikes (spike), or fail to recover gracefully after overload (stress recovery). The complete performance testing family is required for production-grade confidence.

---

## Performance Test Type Taxonomy

### Load Testing

Load testing validates that the system meets performance SLAs at expected production load. The defining characteristic is that the load level represents *realistic* traffic patterns, not extreme conditions.

**Load Profile Design:**

| Phase | Duration | Purpose |
|-------|----------|---------|
| Ramp-up | 2-5 min | Gradually introduce virtual users to avoid cold-start distortion |
| Steady state | 15-60 min | Sustained load at target concurrency for stable metric collection |
| Ramp-down | 2-5 min | Graceful reduction to verify resource release |

**Critical design decisions:**
- **Think time modeling**: Real users pause between actions. Without think time, a test with 100 virtual users generates request rates equivalent to 1000+ real users. Model think time from production analytics (typically 3-10 seconds between page interactions).
- **Data parameterization**: Users must not all request the same product, same search term, or same endpoint. Realistic data distribution prevents cache warming artifacts.
- **Session realism**: Include authentication flows, cart management, session renewals -- not just API endpoint hammering.

### Stress Testing

Stress testing pushes load beyond expected capacity to find the breaking point and evaluate degradation behavior. The key question is not "does it break?" (everything breaks) but "how does it break?"

**Graceful degradation indicators:**
- Response times increase linearly with load (not exponentially)
- Error rates stay below defined thresholds until a clear saturation point
- The system recovers to baseline performance when load decreases
- No data corruption or inconsistency occurs during overload

**Catastrophic failure indicators:**
- Complete unresponsiveness (thread pool exhaustion, connection pool depletion)
- Cascading failures across dependent services
- Data corruption or lost transactions
- Inability to recover without manual intervention (restart required)

### Soak Testing (Endurance Testing)

Soak tests run at moderate load (60-80% of capacity) for extended periods (4-72 hours) to detect time-dependent defects invisible in shorter tests.

**Defects uniquely revealed by soak testing:**
- Memory leaks (object references never released, growing heap)
- Connection leaks (database/HTTP connections allocated but not returned to pool)
- Log file growth consuming disk space
- Certificate expiration during test window
- Garbage collection pauses increasing over time (heap fragmentation)
- Thread count growth from improperly terminated async operations

### Spike Testing

Spike tests inject sudden, dramatic load increases (from baseline to 5-10x capacity in seconds) to validate elastic scaling behavior and thundering herd resilience.

---

## Tooling: k6, JMeter, and Gatling

### k6 (Recommended for Modern Stacks)

k6 is a Go-based load testing tool with JavaScript ES6 scripting. Its advantages are developer ergonomics, CI/CD-native design, and low resource consumption per virtual user.

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const apiLatency = new Trend('api_latency');

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '3m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '3m', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1500'],
    errors: ['rate<0.01'],
  },
};

export default function () {
  const start = Date.now();
  const res = http.get(`${__ENV.BASE_URL}/api/products`);
  apiLatency.add(Date.now() - start);
  check(res, { 'status 200': (r) => r.status === 200 });
  errorRate.add(res.status !== 200);
  sleep(Math.random() * 3 + 1); // Realistic think time: 1-4s
}
```

### JMeter (Enterprise Protocol Diversity)

JMeter excels when testing non-HTTP protocols (JDBC, JMS, LDAP, FTP, SMTP) or when teams prefer GUI-based test design. Its JVM foundation makes it memory-intensive -- a single JMeter instance typically saturates at 500-1000 virtual users, requiring distributed mode for larger loads.

### Gatling (Scala-Based, High Concurrency)

Gatling uses an actor-based architecture (Akka/Netty) that handles high concurrency more efficiently than thread-per-user models. Its Scala DSL produces readable test scenarios and its HTML reports are publication-quality.

**Tool Selection Matrix:**

| Factor | k6 | JMeter | Gatling |
|--------|------|--------|---------|
| Developer experience | Excellent (JS) | Moderate (GUI/Groovy) | Good (Scala DSL) |
| CI/CD integration | Native | Requires plugins | Good (sbt/maven) |
| Resource efficiency | High (Go runtime) | Low (JVM threads) | High (Akka actors) |
| Protocol support | HTTP, WS, gRPC | Broadest (30+ protocols) | HTTP, WS, JMS |
| Distributed testing | k6 Cloud or OSS | Built-in master/slave | Gatling Enterprise |
| Reporting | JSON/InfluxDB/Grafana | Listeners + plugins | Built-in HTML reports |

---

## Capacity Planning and Bottleneck Identification

### The Saturation Analysis Method

Every system has a primary bottleneck -- the first resource to saturate as load increases. Identifying this bottleneck requires correlating application metrics with infrastructure metrics during load ramp.

```
Response Time vs. Load:

Latency │                              ╱
(ms)    │                           ╱
        │                        ╱     ← Saturation point:
        │                     ╱           latency inflects upward
        │              ______╱
        │        _____╱
        │  _____╱
        │_╱  ← Linear region (healthy)
        └──────────────────────────────→
                  Concurrent Users
```

**Resource correlation checklist during load ramp:**
1. **CPU saturation** -- Indicates compute-bound workload. Remediation: algorithm optimization, caching computed results, horizontal scaling.
2. **Memory pressure** -- Indicates large working sets or leaks. Remediation: reduce object allocation, tune GC, increase instance memory.
3. **Disk I/O saturation** -- Indicates storage-bound workload. Remediation: add caching layer, optimize queries to reduce result set size, use SSDs.
4. **Network bandwidth** -- Indicates payload-heavy responses. Remediation: compression, CDN, pagination, response field filtering.
5. **Connection pool exhaustion** -- Indicates too many concurrent database/service calls relative to pool size. Remediation: increase pool size (to a point), optimize query duration, introduce connection multiplexing.
6. **Thread pool exhaustion** -- Indicates blocking operations consuming all available threads. Remediation: async I/O, increase thread pool, reduce lock contention.

### Performance Budgets

A performance budget defines the maximum acceptable performance cost of each component of a user interaction.

| Budget Category | Target | Measurement |
|----------------|--------|-------------|
| Server response time | p95 < 200ms | Application Performance Monitoring (APM) |
| Total page load | < 3 seconds on 3G | Synthetic monitoring |
| Time to interactive | < 5 seconds on mid-range mobile | Lighthouse CI |
| API response payload | < 100KB per response | Response size monitoring |
| JavaScript bundle | < 300KB gzipped | Build-time budget check |
| Database query count | < 10 queries per request | Query logging/APM |

---

## Failure Modes

1. **Testing on unrealistic environments**: Running performance tests on a single-node staging environment and extrapolating to a multi-node production cluster. Resource contention, network latency, and distributed system behavior are fundamentally different. Results are not transferable.

2. **Ignoring percentile distributions**: Reporting only average response time masks tail latency. A system with 50ms average and 15-second p99 has a devastating user experience for 1% of requests -- which at 1M daily users means 10,000 frustrated sessions.

3. **Omitting think time in virtual users**: Without think time, 100 virtual users with 100ms response time generate 1,000 requests/second. With realistic 5-second think time, the same 100 users generate only 20 requests/second. Omitting think time makes results incomparable to production traffic patterns.

4. **Measuring tool overhead instead of system performance**: When the load generator itself becomes the bottleneck (CPU-saturated JMeter instance, network-saturated single client), reported latencies include client-side queuing delays. Always monitor load generator resource utilization.

5. **One-time testing instead of continuous performance validation**: Performance characteristics change with every code deployment, data growth, and dependency update. A single performance test provides a snapshot, not a trajectory. Performance testing must be continuous and automated.

6. **Failing to warm caches and JIT compilers**: The first minutes of a test show cold-start behavior (empty caches, unoptimized JIT code paths). Measurements should exclude the warm-up phase or account for it explicitly.

7. **Not correlating application and infrastructure metrics**: Seeing high latency without knowing whether CPU, memory, I/O, or network caused it makes the test result an observation without a diagnosis.

---

## The Operator's Framework

**Step 1: Define Performance Requirements**
- Establish SLAs: response time targets (p50, p95, p99), throughput targets (requests/second), availability targets (99.9%, 99.99%)
- Derive from business requirements: "checkout must complete in under 3 seconds" translates to p95 < 2000ms server-side

**Step 2: Model Production Load**
- Analyze production traffic patterns (peak hours, seasonal spikes, geographic distribution)
- Define virtual user scenarios weighted by real usage ratios (e.g., 60% browse, 25% search, 10% add-to-cart, 5% checkout)
- Calculate target concurrency from production analytics

**Step 3: Prepare the Test Environment**
- Match production topology as closely as budget allows
- Load production-scale data volumes
- Configure monitoring (APM, infrastructure metrics, database slow query logs)

**Step 4: Execute the Test Family**
- Run baseline (10% load) to establish reference metrics
- Run load test (100% projected load) against SLAs
- Run stress test (150-300% load) to find breaking point
- Run soak test (70% load, 8+ hours) for stability validation
- Run spike test (sudden 5x burst) for elasticity validation

**Step 5: Analyze and Report**
- Correlate latency inflection points with resource saturation
- Identify the primary bottleneck and secondary bottlenecks
- Calculate headroom: (breaking point - current peak) / current peak
- Produce capacity model with cost projections

**Step 6: Integrate into CI/CD**
- Automate load test execution on staging deployments
- Define threshold-based quality gates (fail the build if p95 > 500ms)
- Track performance trends across releases to detect gradual degradation

---

## Summary

**Key Principles:**

1. Performance testing is a family of test types, not a single activity -- load, stress, soak, and spike tests each reveal distinct defect classes that the others miss.
2. The saturation point -- where response time begins non-linear degradation -- is the most important number in capacity planning, and finding it requires correlating application metrics with infrastructure metrics.
3. Think time, data parameterization, and environment fidelity are not optional details -- they determine whether test results are transferable to production behavior.
4. Performance budgets must be defined before testing begins, derived from user experience requirements, and enforced continuously through CI/CD quality gates.
5. A performance test without bottleneck identification is an observation without a diagnosis -- always answer "which resource saturated first and why."

---

## Cross-References

- `04_performance/performance_engineering.md` -- Web vitals, optimization techniques, caching strategies
- `04_performance/scalability_testing.md` -- Horizontal/vertical scaling validation, chaos engineering
- `06_ci_cd/ci_cd_testing.md` -- Pipeline integration, deployment gates
- `Patterns/quality_gate_pattern.md` -- Quality gate deployment pattern
- `08_advanced/chaos_engineering.md` -- Resilience testing under failure conditions

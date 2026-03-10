# API Orchestration: Chaining, Parallel Calls, and Resilience Patterns

## Overview

API orchestration is the practice of coordinating multiple API calls into coherent workflows that accomplish business objectives. A single automation workflow may invoke dozens of APIs across multiple services, each with different reliability characteristics, rate limits, and data formats. This module covers patterns for chaining API calls, executing calls in parallel, implementing rate limiting, circuit breakers, and retry logic to build resilient automation.

---

## 1. Orchestration Patterns

### 1.1 Sequential Chain

The simplest pattern: call APIs one after another, passing output from one call as input to the next.

```
Call API A --> Transform Response --> Call API B --> Transform Response --> Call API C
```

**When to Use**: Each call depends on the previous call's response. The workflow has a linear data flow.

**Strengths**: Simple to implement, easy to debug, clear data lineage.

**Weaknesses**: Total latency is the sum of all call latencies. A failure at any step blocks all subsequent steps.

### 1.2 Parallel Fan-Out

Execute multiple independent API calls simultaneously:

```
                ┌── Call API B (contacts) ──┐
Call API A ─────┤── Call API C (orders)    ──├── Merge Results
(customer ID)   └── Call API D (tickets)   ──┘
```

**When to Use**: Multiple calls are independent (do not depend on each other's results). Latency optimization is important.

**Strengths**: Total latency is the maximum of parallel calls (not the sum). Efficient use of time.

**Weaknesses**: More complex error handling (what if one of three parallel calls fails?). Need to manage concurrent rate limits across multiple APIs.

### 1.3 Scatter-Gather

Fan-out to multiple sources, gather results, and combine:

```
Query ──┬── Search API 1 ──┐
        ├── Search API 2 ──┼── Aggregate ── Deduplicate ── Return
        └── Search API 3 ──┘
```

**When to Use**: Querying multiple data sources for comprehensive results. Building aggregated views from distributed data.

### 1.4 Saga Pattern

For multi-step operations that require all-or-nothing consistency across multiple services:

```
Step 1: Reserve inventory (API A)
Step 2: Charge payment (API B)
Step 3: Create shipment (API C)

If Step 3 fails:
  Compensate Step 2: Refund payment (API B)
  Compensate Step 1: Release inventory (API A)
```

**When to Use**: The workflow modifies state in multiple services, and partial completion would leave data in an inconsistent state.

**Implementation**: Define a compensation action for each forward action. If any forward action fails, execute compensation actions for all completed steps in reverse order.

### 1.5 Choreography vs. Orchestration

**Orchestration (Centralized)**: A single controller manages the workflow, making all API calls and handling all logic. The automation platform is the orchestrator.

**Choreography (Decentralized)**: Each service reacts to events from other services. No central controller. Each service listens for events and takes action independently.

| Dimension | Orchestration | Choreography |
|-----------|--------------|--------------|
| Visibility | Full workflow visible in one place | Distributed across services |
| Coupling | Orchestrator depends on all services | Services loosely coupled |
| Complexity | In the orchestrator | Distributed (harder to trace) |
| Failure Handling | Centralized | Each service handles its own |
| Best For | Automation platforms | Microservices architectures |

---

## 2. Rate Limiting

### 2.1 Client-Side Rate Limiting

Implement rate limiting in your automation to prevent exceeding API provider limits:

**Token Bucket Algorithm**:
- Bucket holds N tokens (the rate limit)
- Tokens are added at a constant rate (requests per second)
- Each API call consumes one token
- If the bucket is empty, the call waits until a token is available

**Sliding Window**: Track the number of calls in the last N seconds. If at the limit, delay the next call until the oldest call ages out of the window.

### 2.2 Rate Limit Discovery

Most APIs communicate rate limits through response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 23
X-RateLimit-Reset: 1710500000
Retry-After: 30
```

Parse these headers and adjust request pacing accordingly:
- If `Remaining` < 10% of `Limit`: slow down
- If `Remaining` = 0: wait until `Reset` timestamp
- If 429 response: wait for `Retry-After` seconds

### 2.3 Rate Limit Strategies by Scenario

| Scenario | Strategy |
|----------|----------|
| Bulk data sync (10K records) | Batch API calls, 10 per second with monitoring |
| Real-time event processing | Pre-allocate rate budget, queue overflow |
| Multi-tenant automation | Per-tenant rate budgets within total API limits |
| Shared API key across workflows | Centralized rate limiter shared across workflows |

---

## 3. Circuit Breaker Pattern

### 3.1 Purpose

The circuit breaker prevents an automation from repeatedly calling a failing API, which wastes resources and can exacerbate the API's problems (cascading failures).

### 3.2 State Machine

```
CLOSED ──(failure threshold exceeded)──> OPEN
   ^                                        |
   |                                        v
   └──(success on probe)── HALF-OPEN <──(timeout elapsed)
```

**Closed**: Normal operation. Track failure count. If failures exceed threshold within time window, transition to Open.

**Open**: All calls immediately fail without contacting the API. After a timeout period, transition to Half-Open.

**Half-Open**: Allow a single probe request through. If it succeeds, transition to Closed. If it fails, transition back to Open.

### 3.3 Configuration

| Parameter | Typical Value | Description |
|-----------|--------------|-------------|
| Failure threshold | 5 failures in 60 seconds | When to open the circuit |
| Open timeout | 30-60 seconds | How long to wait before probing |
| Success threshold | 3 consecutive successes | When to close the circuit from half-open |
| Monitored exceptions | 500, 502, 503, timeout | Which failures count toward the threshold |

### 3.4 Implementation in Automation

Most automation platforms do not have built-in circuit breakers. Implement using platform state management:

1. Store circuit state in a data store / database / Zapier Table
2. Before each API call, check circuit state
3. If circuit is Open and timeout has not elapsed: skip the call, use fallback
4. If circuit is Open and timeout has elapsed: allow one probe call
5. Update circuit state based on call result

---

## 4. Retry Logic

### 4.1 Retry Strategy Design

Not all errors are retryable. Design retry logic based on error type:

| Error Type | Retryable | Strategy |
|-----------|-----------|----------|
| 400 Bad Request | No | Fix the request |
| 401 Unauthorized | Once | Refresh token, retry |
| 403 Forbidden | No | Alert, investigate |
| 404 Not Found | No | Handle as expected case |
| 408 Timeout | Yes | Retry with same request |
| 429 Rate Limited | Yes | Wait for Retry-After, retry |
| 500 Server Error | Yes | Retry with backoff |
| 502 Bad Gateway | Yes | Retry with backoff |
| 503 Unavailable | Yes | Retry with longer backoff |
| Network Error | Yes | Retry with backoff |

### 4.2 Exponential Backoff with Jitter

```
wait_time = min(base_delay * 2^attempt + random_jitter, max_delay)

Example (base_delay=1s, max_delay=60s):
  Attempt 1: ~1-2 seconds
  Attempt 2: ~2-4 seconds
  Attempt 3: ~4-8 seconds
  Attempt 4: ~8-16 seconds
  Attempt 5: ~16-32 seconds
```

**Jitter** prevents the "thundering herd" problem where many retrying clients all retry simultaneously, overwhelming the API.

### 4.3 Retry Budget

Set limits on retry behavior:
- Maximum retry attempts: 3-5
- Maximum total retry duration: 5 minutes
- Maximum retries per time window across all workflows: Prevent aggregate retry load from exceeding rate limits

### 4.4 Dead Letter Queue

When all retries are exhausted:
1. Log the failed request with full context (request body, error, attempt count)
2. Move to a dead letter queue for manual investigation
3. Alert the team
4. Periodically review the dead letter queue for patterns

---

## 5. Data Transformation Between APIs

### 5.1 Schema Mapping

Different APIs use different field names, formats, and structures for the same concepts:

```
Salesforce Contact:
  { "FirstName": "Alice", "LastName": "Smith", "Email": "alice@example.com" }

HubSpot Contact:
  { "firstname": "Alice", "lastname": "Smith", "email": "alice@example.com" }
```

Implement mapping layers that translate between schemas:

```python
def salesforce_to_hubspot(sf_contact):
    return {
        "firstname": sf_contact["FirstName"],
        "lastname": sf_contact["LastName"],
        "email": sf_contact["Email"]
    }
```

### 5.2 Data Type Conversion

Common conversions needed between APIs:
- Date formats: ISO 8601 to Unix timestamp to API-specific formats
- Currency: Cents (Stripe) to dollars (display) to locale-specific formatting
- Boolean: "true"/"false" strings to true/false booleans
- Enums: Mapping between different enum values for the same concept

### 5.3 Validation Between Steps

Validate data after transformation and before sending to the next API:
- Required fields are present and non-empty
- Data types match the target API's expectations
- Values are within acceptable ranges
- References (IDs) are valid in the target system

---

## 6. Monitoring API Orchestrations

### 6.1 Observability Requirements

For each API call in an orchestration:
- Request timestamp, method, URL, key parameters (redacted as needed)
- Response status code, latency, body size
- Retry attempts and outcomes
- Circuit breaker state changes
- Rate limit headers (remaining, reset)

### 6.2 Alerting

| Condition | Severity | Action |
|-----------|----------|--------|
| Error rate > 5% for 5 minutes | Warning | Investigate |
| Error rate > 20% for 5 minutes | Critical | Immediate response |
| Circuit breaker opened | Warning | Investigate root cause |
| Dead letter queue > 10 items | Warning | Manual review |
| Rate limit remaining < 10% | Info | Monitor closely |

### 6.3 Dashboard Metrics

- API call success rate by endpoint
- Latency distribution (P50, P95, P99) by endpoint
- Retry rate and retry success rate
- Circuit breaker state timeline
- Rate limit utilization percentage
- Dead letter queue depth

---

## 7. Key References

- Richardson (2018) -- "Microservices Patterns" (Saga, Circuit Breaker, API Gateway)
- Nygard (2018) -- "Release It!" (Stability patterns for production systems)
- Fowler -- "Circuit Breaker" pattern description
- AWS Architecture Blog -- "Implementing Safe Deployments with Circuit Breakers"

---

*This module covers API orchestration. See `api_design.md` for API fundamentals and `authentication.md` for auth patterns.*

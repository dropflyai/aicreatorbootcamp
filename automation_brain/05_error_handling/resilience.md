# Resilience: Building Automation Systems That Withstand Failure

## Overview

Resilience is the ability of an automation system to continue operating correctly in the face of failures, degraded dependencies, unexpected inputs, and load spikes. Resilient systems do not merely handle errors -- they anticipate failure as a normal operating condition and are designed to maintain acceptable service levels despite it. This module covers idempotency, exactly-once semantics, eventual consistency, graceful degradation, bulkheading, and timeout management.

---

## 1. Idempotency

### 1.1 Definition and Importance

An operation is idempotent if executing it multiple times has the same effect as executing it once. In automation, idempotency is critical because operations are frequently retried due to timeouts, network failures, and duplicate triggers.

### 1.2 Idempotency Implementation Strategies

**Natural Idempotency**: Some operations are naturally idempotent:
- GET requests (reading data does not change state)
- PUT requests that set a value (setting X=5 twice results in X=5)
- DELETE requests (deleting an already-deleted record is a no-op)

**Idempotency Keys**: For non-naturally-idempotent operations (POST, transfers), use an idempotency key:

```
POST /api/v1/payments
Idempotency-Key: pay_abc123_attempt_1

{
  "amount": 50.00,
  "customer_id": "cust_789"
}
```

The server checks if a payment with this idempotency key already exists:
- If yes: return the existing payment result
- If no: process the payment and store the result keyed by the idempotency key

### 1.3 Idempotency Key Design

**Key Generation**: Combine business identifiers to create deterministic keys:
- `{workflow_id}_{execution_id}_{step_index}` -- unique per workflow step execution
- `{entity_type}_{entity_id}_{operation}_{date}` -- unique per business operation per day

**Key Storage**: Store (key, result, expiry) tuples. Set expiry to at least 24 hours to cover all reasonable retry windows.

### 1.4 Making Workflows Idempotent

| Step Type | Idempotent? | How to Make Idempotent |
|-----------|-------------|----------------------|
| Create record | No | Check if exists first (find-or-create) |
| Update record | Usually | Use conditional update (if-match) |
| Delete record | Yes | Delete is naturally idempotent |
| Send email | No | Track sent emails by message ID |
| Transfer funds | No | Use idempotency key |
| API call with side effects | Depends | Use idempotency key at API level |

---

## 2. Exactly-Once Semantics

### 2.1 The Distributed Systems Reality

True exactly-once processing is impossible in distributed systems (proven by the Two Generals Problem). What we can achieve is "effectively exactly-once" through idempotent processing of at-least-once delivery.

```
Exactly-Once (effective) = At-Least-Once Delivery + Idempotent Processing
```

### 2.2 At-Least-Once Delivery

Ensure every message is delivered at least once:
- Acknowledge messages only after successful processing
- If processing fails, the message returns to the queue for redelivery
- Set a visibility timeout longer than the expected processing time
- Use dead letter queues for messages that fail repeatedly

### 2.3 Deduplication

Complement idempotent processing with explicit deduplication:

**Message-Level Deduplication**: Track processed message IDs. Before processing a new message, check if its ID has been seen before.

**Business-Level Deduplication**: Track business operations. Before creating an order, check if an order with the same external reference already exists.

**Time-Window Deduplication**: Keep a deduplication window (e.g., 24 hours). Messages older than the window are assumed to not be duplicates. This bounds storage requirements.

---

## 3. Eventual Consistency

### 3.1 Concept

In distributed automation systems, data across multiple services cannot be kept perfectly synchronized at all times. Instead, the system guarantees that data will become consistent eventually, after all pending operations complete and propagate.

### 3.2 Designing for Eventual Consistency

**Accept Temporary Inconsistency**: Design the user experience and downstream systems to tolerate brief periods where data across services does not match.

**Convergence Mechanisms**: Implement processes that detect and resolve inconsistencies:
- Periodic reconciliation: Compare records across services and fix mismatches
- Event replay: Re-process events that may have been missed
- Consistency checks: Validate cross-service data integrity on a schedule

### 3.3 Reconciliation Patterns

**Full Reconciliation**: Periodically compare all records between two services. Resource-intensive but comprehensive. Run during low-traffic periods.

```
Every night at 2 AM:
  1. Fetch all orders from System A (modified in last 24h)
  2. Fetch all orders from System B (modified in last 24h)
  3. Compare records by external ID
  4. For each mismatch: determine the source of truth and update
  5. Log all reconciliation actions
```

**Delta Reconciliation**: Compare only records modified since the last reconciliation. More efficient but may miss issues from before the delta window.

**Checksum Reconciliation**: Compute checksums of record sets (sorted by ID) in both systems. If checksums match, systems are consistent. If not, drill down to find specific mismatches.

### 3.4 Conflict Resolution

When reconciliation finds conflicting data, apply a deterministic resolution strategy:

| Strategy | Rule | When to Use |
|----------|------|-------------|
| Last-write-wins | Most recent timestamp wins | Simple, acceptable for most data |
| Source-of-truth | Designated system always wins | One system is authoritative |
| Merge | Combine non-conflicting fields from both | Complex but preserves more data |
| Manual | Flag for human resolution | High-value or ambiguous conflicts |

---

## 4. Graceful Degradation

### 4.1 Principle

When a dependency fails, the automation should degrade gracefully rather than failing completely. Provide reduced functionality rather than no functionality.

### 4.2 Degradation Strategies

| Scenario | Full Functionality | Degraded Functionality |
|----------|-------------------|----------------------|
| CRM sync fails | Real-time bidirectional sync | Queue changes for later sync |
| Enrichment API down | Full data enrichment | Skip enrichment, process with basic data |
| Email service down | Send email immediately | Queue emails for later delivery |
| AI classification fails | AI-powered classification | Rule-based fallback classification |
| Search API fails | Semantic search results | Keyword-based fallback search |

### 4.3 Degradation Implementation

```
def process_order(order):
    # Primary: Full enrichment
    try:
        enriched = enrichment_api.enrich(order.customer_email)
        order.customer_data = enriched
    except EnrichmentUnavailable:
        # Degraded: Use basic data
        order.customer_data = {"email": order.customer_email}
        queue_for_enrichment_later(order.id)
        log.warn("Enrichment unavailable, using basic data")

    # Continue processing with whatever data is available
    process_with_available_data(order)
```

### 4.4 Degradation Monitoring

Track degradation events:
- Count of degraded executions vs. full executions
- Duration of degradation periods
- Recovery time (how long until full functionality resumes)
- Impact analysis (what data quality was lost during degradation)

---

## 5. Bulkhead Pattern

### 5.1 Concept

Isolate different parts of the automation system so that a failure in one part does not cascade to others. Named after the watertight compartments in ship hulls.

### 5.2 Implementation

**Workflow Isolation**: Run different workflow categories on separate execution pools:
- Critical workflows: Dedicated resources, priority execution
- Standard workflows: Shared resource pool
- Batch workflows: Low-priority, can be paused if resources are constrained

**API Connection Isolation**: Maintain separate connection pools for different external APIs. If one API is slow or failing, it does not consume all available connections.

**Queue Isolation**: Use separate queues for different workflow priorities. A burst of low-priority work does not delay high-priority executions.

---

## 6. Timeout Management

### 6.1 Timeout Types

| Timeout | Purpose | Typical Value |
|---------|---------|---------------|
| Connection timeout | Max time to establish connection | 5-10 seconds |
| Read timeout | Max time to receive response | 30-60 seconds |
| Workflow timeout | Max total workflow execution time | 5-30 minutes |
| Idle timeout | Max time with no progress | 60-120 seconds |

### 6.2 Timeout Design Principles

**Always Set Timeouts**: Every external call must have a timeout. Without timeouts, a hanging connection can block the entire workflow indefinitely.

**Timeout Budget**: For sequential calls, the workflow timeout must exceed the sum of individual call timeouts. For parallel calls, it must exceed the maximum individual call timeout.

**Timeout Hierarchy**: Individual step timeouts must be shorter than the overall workflow timeout. Individual API call timeouts must be shorter than the step timeout.

```
Workflow Timeout: 300 seconds
  Step 1 Timeout: 60 seconds
    API Call Timeout: 30 seconds
  Step 2 Timeout: 120 seconds
    API Call Timeout: 30 seconds
    Processing Timeout: 90 seconds
  Step 3 Timeout: 60 seconds
    API Call Timeout: 30 seconds
  Buffer: 60 seconds
```

---

## 7. Health Checks

### 7.1 Dependency Health Checks

Proactively check the health of external dependencies:
- Periodic lightweight API calls (e.g., status endpoint)
- Check response time and error rate
- Verify authentication is still valid
- Monitor rate limit headroom

### 7.2 Self-Health Checks

The automation system should monitor its own health:
- Queue depth and processing rate
- Worker utilization
- Memory and CPU usage
- Database connection pool utilization
- Credential validity

### 7.3 Health Check Response

| Health State | Action |
|-------------|--------|
| All healthy | Normal operation |
| Dependency degraded | Activate graceful degradation |
| Dependency down | Open circuit breaker, use fallback |
| Self-health degraded | Scale resources, alert team |
| Self-health critical | Pause non-critical workflows, alert immediately |

---

## 8. Key References

- Nygard (2018) -- "Release It!" (Stability patterns, bulkheads, timeouts)
- Kleppmann (2017) -- "Designing Data-Intensive Applications" (Consistency models)
- Burns (2018) -- "Designing Distributed Systems" (Resilience patterns)

---

*This module covers resilience. See `error_patterns.md` for error handling and `monitoring.md` for observability.*

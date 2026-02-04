# Error Patterns: Resilience Strategies for Automation Systems

## Overview

Automation systems operate at the boundary between multiple services, each with independent failure modes. A robust automation system must anticipate and handle failures gracefully, ensuring that transient issues do not cause data loss and that permanent failures are surfaced quickly for human intervention. This module covers the fundamental error handling patterns used in production automation: retry with backoff, dead letter queues, compensation transactions, circuit breakers, and the saga pattern.

---

## 1. Retry with Exponential Backoff

### 1.1 Core Pattern

When an operation fails due to a transient error (network timeout, temporary service unavailability, rate limiting), retry the operation with increasing wait times between attempts.

```
Attempt 1: Execute operation
  Failed (503 Service Unavailable)
  Wait: 1 second

Attempt 2: Execute operation
  Failed (503 Service Unavailable)
  Wait: 2 seconds

Attempt 3: Execute operation
  Failed (503 Service Unavailable)
  Wait: 4 seconds

Attempt 4: Execute operation
  Success -> Continue workflow
```

### 1.2 Backoff Calculation

```
wait_time = min(base * 2^(attempt - 1) + jitter, max_wait)

Where:
  base = 1 second (initial wait)
  jitter = random(0, base) (prevents thundering herd)
  max_wait = 60 seconds (cap on wait time)
```

### 1.3 Configuration Parameters

| Parameter | Default | Range | Description |
|-----------|---------|-------|-------------|
| max_retries | 3 | 1-10 | Maximum retry attempts |
| base_delay | 1s | 0.5-5s | Initial wait time |
| max_delay | 60s | 10-300s | Maximum wait time cap |
| jitter_factor | 0.5 | 0-1.0 | Randomization factor |
| retryable_errors | [408,429,500,502,503] | Custom | Error codes to retry on |

### 1.4 Retry Anti-Patterns

**Retry Everything**: Retrying non-transient errors (400, 404) wastes resources and time. Only retry errors that are likely to resolve on their own.

**No Jitter**: Without jitter, retrying clients synchronize and create periodic load spikes that can overwhelm the target service.

**Unbounded Retries**: Without a maximum retry count, a permanently failing operation consumes resources indefinitely.

**Retry Without Idempotency**: Retrying a non-idempotent operation (POST without idempotency key) can create duplicate records. Ensure idempotency before enabling retries.

---

## 2. Dead Letter Queue (DLQ)

### 2.1 Core Pattern

When an operation exhausts all retry attempts, move the failed message to a dead letter queue for investigation and manual processing.

```
Input Queue --> [Process] --> Success --> Output
                    |
                    v (all retries failed)
                [Dead Letter Queue]
                    |
                    v
              [Alert Team]
              [Manual Review]
              [Reprocess or Discard]
```

### 2.2 DLQ Design

**What to Store**: The failed message must include all information needed to understand and reprocess the failure:
- Original message/request body
- Error message and stack trace
- Retry history (number of attempts, timestamps, error codes)
- Workflow context (which step failed, what was the workflow state)
- Timestamp of final failure

**Storage Options**: Database table, message queue (SQS, RabbitMQ), automation platform data store, or a dedicated error tracking service.

### 2.3 DLQ Processing

**Manual Review**: An operator reviews each item, diagnoses the issue, fixes the underlying problem, and either reprocesses or discards.

**Automated Reprocessing**: Schedule periodic scans of the DLQ. Attempt reprocessing items that have been in the queue for more than a threshold time (the underlying issue may have been resolved).

**Escalation**: If the DLQ depth exceeds a threshold (e.g., 50 items), escalate to senior engineering. Growing DLQ depth indicates a systemic issue.

### 2.4 DLQ Monitoring

| Metric | Alert Threshold | Action |
|--------|----------------|--------|
| DLQ depth | > 10 items | Investigate |
| DLQ growth rate | > 5 items/hour | Investigate root cause |
| DLQ item age | > 24 hours | Manual review required |
| DLQ reprocessing success rate | < 50% | Root cause analysis |

---

## 3. Compensation (Undo) Pattern

### 3.1 Core Pattern

When a multi-step operation partially completes and a later step fails, undo the completed steps to restore consistency.

```
Forward Operations:
  Step 1: Create order record      -> Success
  Step 2: Reserve inventory        -> Success
  Step 3: Charge payment           -> FAILED

Compensation (Reverse Order):
  Compensate Step 2: Release inventory -> Execute
  Compensate Step 1: Delete order      -> Execute
```

### 3.2 Compensation Action Design

Each forward action must have a defined compensation action:

| Forward Action | Compensation Action | Notes |
|---------------|-------------------|-------|
| Create record | Delete record | Must store created record ID |
| Update field | Restore original value | Must store original value before update |
| Send email | Send correction/retraction | Cannot truly "unsend" |
| Transfer funds | Reverse transfer | Must store transaction ID |
| Grant access | Revoke access | Must store access grant details |

### 3.3 Compensation Challenges

**Non-Compensable Actions**: Some actions cannot be undone (sent emails, printed documents, physical shipments). Design workflows to perform non-compensable actions last.

**Compensation Failures**: What if the compensation action itself fails? Implement retry logic for compensations and alert on compensation failures. This is a "double failure" requiring immediate human intervention.

**Partial State Visibility**: During the time between forward action and compensation, other systems may have observed the intermediate state. Design compensations that are safe even if intermediate state was consumed.

---

## 4. Circuit Breaker

### 4.1 Core Pattern

Prevent repeated calls to a failing service by "breaking the circuit" after a threshold of failures:

```
Closed State (normal):     Track failures per window
                              |
                              v (failure count > threshold)
Open State (failing):      All calls immediately fail with fallback
                              |
                              v (timeout elapsed)
Half-Open State (probing): Allow one test call through
                              |
                              +--> Success: Close circuit (resume normal)
                              |
                              +--> Failure: Reopen circuit (continue blocking)
```

### 4.2 Configuration

| Parameter | Default | Description |
|-----------|---------|-------------|
| failure_threshold | 5 | Failures before opening |
| window_size | 60s | Time window for counting failures |
| open_timeout | 30s | Wait before probing |
| success_threshold | 3 | Consecutive successes to close |

### 4.3 Fallback Strategies

When the circuit is open, the automation needs a fallback:
- **Cached Response**: Return the last successful response for the same query
- **Default Value**: Return a safe default value
- **Queue for Later**: Store the request for processing when the circuit closes
- **Alternative Service**: Route to a backup service
- **Graceful Degradation**: Skip the failing step and continue with reduced functionality

---

## 5. Saga Pattern

### 5.1 Core Pattern

The saga pattern manages long-running transactions across multiple services by breaking them into a sequence of local transactions, each with a compensating transaction.

### 5.2 Orchestration-Based Saga

A central orchestrator manages the saga execution:

```python
class OrderSaga:
    def execute(self, order):
        try:
            inventory_reservation = inventory_service.reserve(order.items)
            payment_result = payment_service.charge(order.total)
            shipment = shipping_service.create(order.address, order.items)
            return SagaResult.success(shipment)
        except PaymentError:
            inventory_service.release(inventory_reservation.id)
            return SagaResult.failure("Payment failed")
        except ShippingError:
            payment_service.refund(payment_result.transaction_id)
            inventory_service.release(inventory_reservation.id)
            return SagaResult.failure("Shipping failed")
```

### 5.3 Choreography-Based Saga

Each service listens for events and takes action:

```
Order Service: Creates order, publishes "OrderCreated"
    |
    v
Inventory Service: Hears "OrderCreated", reserves inventory, publishes "InventoryReserved"
    |
    v
Payment Service: Hears "InventoryReserved", charges payment, publishes "PaymentCompleted"
    |
    v
Shipping Service: Hears "PaymentCompleted", creates shipment, publishes "ShipmentCreated"

If Payment fails:
Payment Service: Publishes "PaymentFailed"
    |
    v
Inventory Service: Hears "PaymentFailed", releases reservation
Order Service: Hears "PaymentFailed", marks order as failed
```

### 5.4 Saga Design Principles

- Execute compensable steps before non-compensable steps
- Design each step to be idempotent
- Store the saga state persistently (survives process crashes)
- Implement timeout for sagas that do not complete (stuck sagas)
- Log all saga steps for debugging and audit

---

## 6. Error Classification Framework

### 6.1 Error Taxonomy

Classify all errors into actionable categories:

| Category | Examples | Response |
|----------|----------|----------|
| Transient | Network timeout, 503, rate limit | Retry with backoff |
| Client Error | 400, 422, malformed data | Fix data, do not retry |
| Auth Error | 401, 403, expired token | Refresh token, retry once |
| Not Found | 404, deleted resource | Handle gracefully (skip/create) |
| Conflict | 409, duplicate | Treat as idempotent success |
| Server Error | 500, unhandled exception | Retry, then DLQ |
| Configuration | Wrong URL, missing credential | Alert, manual fix |

### 6.2 Error Handling Decision Tree

```
Error Received
    |
    v
Is the error retryable?
    |
    +--> Yes: Retry within budget?
    |         +--> Yes: Retry with backoff
    |         +--> No: Dead letter queue + alert
    |
    +--> No: Is it an expected error?
              +--> Yes: Handle (skip, create, use default)
              +--> No: Dead letter queue + alert
```

---

## 7. Testing Error Handling

### 7.1 Chaos Testing

Deliberately inject failures to verify error handling:
- Simulate API timeouts (delay responses by 30+ seconds)
- Simulate rate limiting (return 429 responses)
- Simulate service outages (return 503 responses)
- Simulate data errors (return malformed responses)
- Simulate authentication failures (return 401 responses)

### 7.2 Error Handling Verification

For each error handling mechanism, verify:
- Retries occur with correct timing and backoff
- Dead letter queue captures failed items with full context
- Compensations execute correctly and in the right order
- Circuit breakers open and close at configured thresholds
- Alerts fire at the correct severity levels
- Monitoring dashboards reflect error states accurately

---

## 8. Key References

- Nygard (2018) -- "Release It!" (Circuit breaker, bulkhead, timeout patterns)
- Richardson (2018) -- "Microservices Patterns" (Saga pattern, compensating transactions)
- Hohpe & Woolf (2003) -- "Enterprise Integration Patterns" (Dead letter channel)

---

*This module covers error patterns. See `monitoring.md` for observability and `resilience.md` for advanced resilience strategies.*

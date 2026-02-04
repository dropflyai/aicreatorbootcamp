# Serverless Patterns — Fan-Out, Saga, CQRS, Event Sourcing, and API Gateway

## Overview

Serverless architecture patterns solve the distributed systems challenges that arise when applications are decomposed into independently deployed functions. The stateless, event-driven nature of serverless requires different architectural patterns than traditional monolithic or microservice applications. This module codifies the essential serverless patterns: fan-out/fan-in for parallel processing, the saga pattern for distributed transactions, CQRS and event sourcing for complex domain models, the strangler fig pattern for incremental migration, and API Gateway integration patterns.

Each pattern addresses a specific architectural challenge. Choosing the wrong pattern is worse than no pattern at all — it adds complexity without solving the right problem.

---

## Fan-Out / Fan-In Pattern

### Problem

A single event requires processing by multiple independent consumers, and the results must be aggregated before the workflow can continue.

### Architecture

```
                    ┌─────────────┐
                    │   Trigger    │
                    │  (S3, API)   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Orchestrator │
                    │(Step Functions│
                    │  Map state)  │
                    └──────┬──────┘
                           │ Fan-Out
              ┌────────────┼────────────┐
              │            │            │
        ┌─────▼─────┐ ┌───▼───┐ ┌─────▼─────┐
        │ Worker A  │ │Worker B│ │ Worker C  │
        │ (Lambda)  │ │(Lambda)│ │ (Lambda)  │
        └─────┬─────┘ └───┬───┘ └─────┬─────┘
              │            │            │
              └────────────┼────────────┘
                           │ Fan-In
                    ┌──────▼──────┐
                    │  Aggregator  │
                    │  (Lambda)    │
                    └─────────────┘
```

### Implementation with Step Functions Map

```json
{
  "Comment": "Fan-out/Fan-in with Map state",
  "StartAt": "PrepareItems",
  "States": {
    "PrepareItems": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:PrepareFunction",
      "Next": "ProcessItems"
    },
    "ProcessItems": {
      "Type": "Map",
      "ItemsPath": "$.items",
      "MaxConcurrency": 40,
      "Iterator": {
        "StartAt": "ProcessSingleItem",
        "States": {
          "ProcessSingleItem": {
            "Type": "Task",
            "Resource": "arn:aws:lambda:...:ProcessItemFunction",
            "End": true
          }
        }
      },
      "Next": "AggregateResults"
    },
    "AggregateResults": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:AggregateFunction",
      "End": true
    }
  }
}
```

### Use Cases

- Image/video processing pipeline (process each frame/chunk in parallel)
- Batch data processing (split large dataset, process chunks, merge results)
- Multi-region health checks (check each region in parallel, aggregate status)
- Order fulfillment (check inventory, process payment, reserve shipping in parallel)

---

## Saga Pattern — Distributed Transactions

### Problem

In a microservices/serverless architecture, a business transaction spans multiple services, each with its own database. Traditional ACID transactions do not work across service boundaries. The saga pattern implements eventual consistency through a sequence of local transactions with compensating actions for rollback.

### Choreography vs Orchestration

**Choreography Saga:**
Each service listens for events and reacts. No central coordinator. Services communicate through events.

```
Order Service ──(OrderCreated)──→ Payment Service
Payment Service ──(PaymentProcessed)──→ Inventory Service
Inventory Service ──(InventoryReserved)──→ Shipping Service

On failure:
Shipping Service ──(ShippingFailed)──→ Inventory Service (compensate: release inventory)
Inventory Service ──(InventoryReleased)──→ Payment Service (compensate: refund)
Payment Service ──(PaymentRefunded)──→ Order Service (compensate: cancel order)
```

**Orchestration Saga (Recommended for Serverless):**
A central orchestrator (Step Functions) coordinates the saga, calling each step and handling compensation on failure.

```json
{
  "StartAt": "ProcessPayment",
  "States": {
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:ProcessPayment",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "CancelOrder"
      }],
      "Next": "ReserveInventory"
    },
    "ReserveInventory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:ReserveInventory",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "RefundPayment"
      }],
      "Next": "ArrangeShipping"
    },
    "ArrangeShipping": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:ArrangeShipping",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "ReleaseInventory"
      }],
      "Next": "OrderComplete"
    },
    "ReleaseInventory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:ReleaseInventory",
      "Next": "RefundPayment"
    },
    "RefundPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:RefundPayment",
      "Next": "CancelOrder"
    },
    "CancelOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:CancelOrder",
      "Next": "SagaFailed"
    },
    "OrderComplete": { "Type": "Succeed" },
    "SagaFailed": { "Type": "Fail" }
  }
}
```

### Saga Design Rules

1. **Every forward action must have a compensating action** (rollback equivalent)
2. **Compensating actions must be idempotent** (may be retried)
3. **Compensating actions must be commutative** (order should not matter for cleanup)
4. **Record saga state persistently** (Step Functions does this automatically)
5. **Design for partial failure** — the system will be in inconsistent states transiently

---

## CQRS — Command Query Responsibility Segregation

### Problem

Read and write workloads have fundamentally different characteristics. Writes require consistency, validation, and domain logic. Reads require speed, denormalization, and often different data shapes than the write model. A single model serving both creates compromises in both directions.

### Architecture

```
                Commands (write)              Queries (read)
                     │                             │
              ┌──────▼──────┐              ┌───────▼───────┐
              │ Command API  │              │   Query API    │
              │ (API Gateway │              │ (API Gateway   │
              │  + Lambda)   │              │  + Lambda)     │
              └──────┬──────┘              └───────┬───────┘
                     │                             │
              ┌──────▼──────┐              ┌───────▼───────┐
              │ Write Model  │──(events)──→│  Read Model    │
              │ (DynamoDB)   │   DynamoDB   │ (DynamoDB /    │
              │ normalized   │   Streams    │  ElasticSearch)│
              │              │              │ denormalized   │
              └─────────────┘              └───────────────┘
```

### Implementation on AWS

**Write side:** API Gateway -> Lambda -> DynamoDB (or RDS). Validates business rules, persists state, emits events via DynamoDB Streams or EventBridge.

**Read side:** DynamoDB Streams -> Lambda -> Read-optimized store (DynamoDB with different key schema, ElasticSearch for search, S3 for analytics). Query API reads from the optimized store.

### When to Use CQRS

| Use CQRS When | Avoid CQRS When |
|--------------|-----------------|
| Read/write ratios are highly asymmetric (100:1 reads) | Simple CRUD application |
| Read model needs different shape than write model | Read and write models are identical |
| Read and write scaling requirements differ significantly | Application is small and simple |
| Complex domain logic on writes, simple reads | Team is unfamiliar with eventual consistency |
| Event sourcing is already in use | Consistency requirements do not allow eventual consistency |

---

## Event Sourcing

### Problem

Traditional state-based persistence overwrites current state with each update, losing the history of how the system arrived at its current state. Event sourcing persists all state changes as an immutable sequence of events, enabling complete audit trails, temporal queries, and state reconstruction.

### Architecture

```
Command → Validate → Store Event → Update Read Model → Respond
                    (append-only)   (projection)
```

**Event Store:** Immutable, append-only log of domain events. Each event represents a fact that happened.

**Projections:** Materialize current state from the event stream. Multiple projections can exist for different read requirements.

### Event Sourcing with DynamoDB

```
Event Store Table:
  PK: "ORDER#ord-123"
  SK: "EVENT#001" → { type: "OrderCreated", data: {...}, timestamp: "..." }
  SK: "EVENT#002" → { type: "ItemAdded", data: {...}, timestamp: "..." }
  SK: "EVENT#003" → { type: "PaymentProcessed", data: {...}, timestamp: "..." }
  SK: "EVENT#004" → { type: "OrderShipped", data: {...}, timestamp: "..." }
```

**Rebuilding state:** Query all events for an aggregate, replay them in order to reconstruct current state. Cache the result for performance.

---

## Strangler Fig Pattern

### Problem

Migrating a monolithic application to serverless cannot happen in a single big-bang release. The strangler fig pattern enables incremental migration by routing specific functionality to the new serverless implementation while the monolith continues to handle everything else.

### Implementation

```
                    ┌─────────────────┐
                    │   API Gateway    │
                    │  (routing layer) │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │ /api/orders/*  │ /api/legacy/*   │
            │ (new routes)   │ (old routes)    │
            ▼                ▼                 │
     ┌─────────────┐  ┌──────────────┐        │
     │   Lambda     │  │   Lambda     │        │
     │  (new svc)   │  │   (proxy)    │────────┤
     └─────────────┘  └──────────────┘        │
                             │                 │
                      ┌──────▼──────┐          │
                      │  Monolith   │◄─────────┘
                      │  (legacy)   │
                      └─────────────┘
```

### Migration Strategy

1. Place API Gateway in front of the monolith (proxy all traffic initially)
2. Implement new functionality as Lambda functions behind the same API Gateway
3. Migrate existing routes one by one: implement in Lambda, redirect route, verify, remove from monolith
4. Continue until the monolith handles zero routes
5. Decommission the monolith

---

## API Gateway + Lambda Patterns

### REST API Pattern

```
Client → API Gateway (REST) → Lambda (handler) → DynamoDB
                │
                ├── /api/users (GET)     → ListUsersFunction
                ├── /api/users (POST)    → CreateUserFunction
                ├── /api/users/{id} (GET) → GetUserFunction
                └── /api/users/{id} (PUT) → UpdateUserFunction
```

### Single Lambda vs Multiple Lambdas

| Approach | Pros | Cons |
|----------|------|------|
| One Lambda per route | Independent scaling, fine-grained permissions, isolated deployments | More deployment units to manage |
| Single Lambda (monolithic) | Simpler deployment, shared code | All-or-nothing scaling, coarse permissions |
| Lambda per domain | Balance between isolation and management | Moderate complexity |

**Recommendation:** Start with one Lambda per domain (e.g., orders, users, payments). Split further when specific routes have distinct scaling or permission requirements.

### API Gateway Features

| Feature | Purpose |
|---------|---------|
| Request validation | Validate request body/parameters against JSON Schema |
| Request transformation | Map/transform request before Lambda invocation |
| Response transformation | Map/transform Lambda response before client |
| Caching | Cache API responses (TTL-based) to reduce Lambda invocations |
| Throttling | Rate limiting per API key, per method |
| Authorization | Cognito, Lambda authorizer, IAM |
| Custom domains | Map API to custom domain with ACM certificate |
| WAF integration | AWS WAF for request filtering |

---

## Anti-Patterns in Serverless

| Anti-Pattern | Problem | Solution |
|-------------|---------|---------|
| Lambda monolith | Single function handling all routes, 50MB+ package | Split by domain or route |
| Synchronous chains | Lambda → Lambda → Lambda (fragile, slow) | Use Step Functions or async events |
| Storing state in /tmp | State lost between invocations | Use DynamoDB, S3, or ElastiCache |
| Ignoring cold starts | User-facing latency spikes | Provisioned concurrency or architecture redesign |
| No DLQ | Failed events silently lost | Always configure DLQ for async invocations |
| Overly broad IAM | Lambda role with * permissions | Least privilege per function |
| Treating Lambda as a server | Long-running processes, background threads | Use Step Functions, ECS/Fargate for long tasks |

---

## Cross-References

- `03_serverless/serverless_architecture.md` — Lambda fundamentals
- `03_serverless/serverless_operations.md` — Observability and deployment
- `06_reliability/site_reliability.md` — SRE for serverless
- `07_cost/cost_architecture.md` — Cost-aware serverless design
- `Patterns/microservices_deployment_pattern.md` — Deployment patterns

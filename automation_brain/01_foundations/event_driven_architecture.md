# Event-Driven Architecture

## Foundations of Event-Driven Systems for Automation

Event-driven architecture (EDA) is the backbone of modern automation. Rather than systems polling each other for changes, systems emit events when something happens, and interested parties react independently. This module covers the theoretical foundations, architectural patterns, and practical implementation of EDA as it applies to workflow automation and integration design.

---

## 1. Event Theory and Taxonomy

### What Is an Event?

An event is an immutable record of a fact that occurred at a specific point in time. Events differ fundamentally from commands and queries:

| Aspect | Command | Query | Event |
|--------|---------|-------|-------|
| Intent | "Do this" | "Tell me this" | "This happened" |
| Direction | To a specific receiver | To a specific provider | To all interested parties |
| Coupling | Sender knows receiver | Sender knows provider | Sender does not know receivers |
| Timing | Synchronous (usually) | Synchronous | Asynchronous |
| Failure | Sender handles failure | Sender handles failure | Emitter does not know about consumer failures |
| Mutability | May be retried with changes | Idempotent by nature | Immutable |

### Event Anatomy

A well-structured event contains:

```json
{
  "event_id": "evt_a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "event_type": "order.placed",
  "source": "order-service",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.2",
  "correlation_id": "req_xyz789",
  "causation_id": "evt_previous123",
  "data": {
    "order_id": "ord_12345",
    "customer_id": "cust_67890",
    "total_amount": 149.99,
    "currency": "USD",
    "items": [
      { "product_id": "prod_111", "quantity": 2, "price": 74.995 }
    ]
  },
  "metadata": {
    "user_agent": "web-checkout/2.1",
    "ip_region": "us-east-1"
  }
}
```

**Required fields**:
- `event_id`: Globally unique identifier (UUID v4 or ULID). Enables deduplication and tracing.
- `event_type`: Dot-notation classification. Convention: `<entity>.<past_tense_verb>` (e.g., `order.placed`, `customer.updated`, `payment.failed`).
- `source`: The system that produced the event. Enables provenance tracking.
- `timestamp`: ISO 8601 with timezone. When the event occurred (not when it was published).
- `data`: The event payload. Contains the domain-specific information about what happened.

**Recommended fields**:
- `version`: Schema version for backward compatibility.
- `correlation_id`: Links related events across a business process.
- `causation_id`: The event_id of the event that caused this event. Creates causal chains.

### Event Types Taxonomy

**Domain Events**: Business-significant occurrences. `order.placed`, `payment.received`, `shipment.dispatched`. These are the primary events in business process automation.

**Integration Events**: System-to-system notifications. `sync.completed`, `import.finished`, `webhook.received`. These coordinate automation infrastructure.

**System Events**: Infrastructure-level occurrences. `service.started`, `health.check.failed`, `threshold.exceeded`. These drive monitoring and alerting automations.

**Lifecycle Events**: Entity state transitions. `lead.qualified`, `subscription.renewed`, `ticket.escalated`. These drive workflow automations tied to entity lifecycles.

---

## 2. Event-Driven Architecture Patterns

### Event Notification

The simplest EDA pattern. A system emits an event to notify others that something happened. The event carries minimal data -- just enough for consumers to decide if they care and to look up details if needed.

```
[Order Service] ──emit──> "order.placed { order_id: 123 }"
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              [Inventory]  [Billing]  [Notification]
              (lookup order) (lookup order) (lookup order)
```

**Advantage**: Minimal coupling. Source system has no knowledge of consumers.
**Disadvantage**: Consumers must call back to get full data (chatty). Source system must handle callback load.

### Event-Carried State Transfer

Events carry the full state (or relevant subset) of the entity. Consumers can process the event without calling back to the source system.

```
[Order Service] ──emit──> "order.placed { order_id: 123,
                                           customer: { ... },
                                           items: [ ... ],
                                           total: 149.99 }"
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              [Inventory]  [Billing]  [Notification]
              (has all data) (has all data) (has all data)
```

**Advantage**: No callbacks needed. Consumers are fully autonomous.
**Disadvantage**: Larger events. Consumers may cache stale data.

**Recommendation for automation**: Prefer Event-Carried State Transfer for workflows that need to process data. The reduced coupling and eliminated callbacks justify the larger event size.

### Event Sourcing (Young, 2010; Fowler, 2005)

Instead of storing the current state of an entity, store the sequence of events that produced that state. Current state is derived by replaying events.

```
Event Store for Order #123:
  1. OrderCreated    { items: [...], customer: "Jo" }
  2. ItemAdded       { product: "Widget", qty: 1 }
  3. PaymentReceived { amount: 149.99 }
  4. OrderShipped    { tracking: "1Z999" }

Current state = replay(events 1..4)
```

**Properties of Event Sourcing**:
- **Complete audit trail**: Every change is recorded permanently
- **Temporal queries**: "What was the state of this order on January 10?"
- **Event replay**: Rebuild state from scratch, or rebuild into a different model
- **Debugging**: Replay events to reproduce exact conditions of a bug
- **Eventual consistency**: Read models may lag behind write model

**When to use in automation**:
- Compliance-heavy domains (financial, healthcare, legal)
- Systems requiring complete audit trails
- Workflows that need to "undo" or "replay" past operations
- Complex state machines with many possible transitions

### CQRS (Command Query Responsibility Segregation)

Separate the write model (commands that change state) from the read model (queries that return state). Write model emits events; read model subscribes to events and builds optimized query views.

```
[Commands] ──> [Write Model] ──emit──> [Events]
                                           │
                              ┌────────────┼────────────┐
                              ▼            ▼            ▼
                         [Read Model A] [Read Model B] [Read Model C]
                         (list view)    (dashboard)    (search index)

[Queries] ──> [Read Model A/B/C] ──> [Response]
```

**CQRS in automation context**:
- Write side: Automation execution engine processes triggers and executes workflows
- Read side: Monitoring dashboard queries execution history, status, metrics
- Separation enables: High-throughput execution without query load; multiple optimized views

---

## 3. Event Delivery Guarantees

### At-Most-Once Delivery
Events are delivered zero or one time. If delivery fails, the event is lost. Simplest implementation (fire-and-forget). Unacceptable for business-critical automations.

### At-Least-Once Delivery
Events are delivered one or more times. If delivery acknowledgment is lost, the event is re-delivered. No data loss, but duplicates are possible. **This is the standard guarantee for most messaging systems and iPaaS platforms.**

### Exactly-Once Processing
Events are processed exactly one time, despite at-least-once delivery. Achieved through idempotent receivers, not through delivery infrastructure. The consumer is responsible for detecting and handling duplicates.

**Implementation pattern**:
```
receive(event):
    key = event.event_id
    if deduplication_store.contains(key):
        return cached_result(key)    // Already processed
    else:
        result = process(event)
        deduplication_store.put(key, result, ttl=72h)
        return result
```

### Ordering Guarantees

**No ordering**: Events may arrive in any order. Consumer must handle out-of-order delivery.

**Partition ordering**: Events with the same partition key arrive in order. Different partition keys may be out of order. Kafka provides this guarantee. Use entity ID as partition key to ensure per-entity ordering.

**Global ordering**: All events arrive in the order they were produced. Expensive and rarely necessary. Single-partition topics in Kafka provide this.

**For automation**: Use partition ordering with entity ID as the partition key. This ensures all events for a given customer, order, or entity are processed in sequence.

---

## 4. Event Bus Architectures

### Message Broker (Traditional)

A central intermediary that receives, stores, and forwards messages. Examples: RabbitMQ, ActiveMQ, AWS SQS.

```
[Producer A] ──┐                    ┌──> [Consumer X]
[Producer B] ──┼──> [BROKER] ──────┼──> [Consumer Y]
[Producer C] ──┘    (queue/topic)   └──> [Consumer Z]
```

**Characteristics**:
- Smart broker, dumb consumers
- Broker manages routing, filtering, delivery, retry
- Messages typically deleted after successful consumption
- Good for: Task distribution, request-reply, point-to-point messaging

### Event Log (Modern)

An append-only, partitioned, replicated log. Examples: Apache Kafka, AWS Kinesis, Redpanda.

```
[Producer A] ──┐                         ┌──> [Consumer X] (offset: 1042)
[Producer B] ──┼──> [EVENT LOG] ────────┼──> [Consumer Y] (offset: 987)
[Producer C] ──┘    (partitioned log)    └──> [Consumer Z] (offset: 1042)
```

**Characteristics**:
- Dumb broker (append-only log), smart consumers (track their own position)
- Events are retained for a configurable period (hours to forever)
- Consumers can replay from any point in the log
- Good for: Event sourcing, stream processing, high-throughput pipelines

### Cloud-Native Event Services

Managed services that abstract broker infrastructure. Examples: AWS EventBridge, Google Cloud Pub/Sub, Azure Event Grid.

**Characteristics**:
- Fully managed (no infrastructure to operate)
- Native integration with cloud services
- Schema registry and event filtering
- Good for: Cloud-native applications, serverless architectures

### iPaaS as Event Consumer

In the automation context, iPaaS platforms (n8n, Zapier, Make) act as event consumers:

```
[Source Systems] ──events──> [Event Bus] ──webhook──> [iPaaS Platform]
                                                           │
                                                    [Workflow Execution]
                                                           │
                                                    [Target Systems]
```

The iPaaS platform subscribes to events via webhooks or polling and triggers workflow executions in response.

---

## 5. Event-Driven Workflow Patterns

### Event-Triggered Workflow

The simplest pattern: an event triggers a workflow execution.

```
[Event: customer.signed_up]
    │
    ▼
[Workflow: New Customer Onboarding]
    ├── Send welcome email
    ├── Create CRM record
    ├── Assign to sales rep
    └── Schedule follow-up task
```

### Event Correlation Workflow

A workflow that requires multiple events to proceed. The workflow starts on the first event and waits for correlated events before continuing.

```
[Event: order.placed]      ──> [Start workflow, store order data]
[Event: payment.received]  ──> [Correlate by order_id, continue]
[Event: inventory.reserved]──> [Correlate by order_id, continue]
                                    │
                            [All events received]
                                    │
                            [Process: Ship Order]
```

**Implementation considerations**:
- Correlation key design (which field links events?)
- Timeout handling (what if a correlated event never arrives?)
- Partial completion (proceed with available events after timeout?)

### Event Choreography

Multiple autonomous services react to events without central coordination. Each service knows what events to produce and what events to consume.

```
[Order Service]
    emit: order.placed
    │
    ├──> [Payment Service]
    │        listen: order.placed
    │        emit: payment.processed
    │
    ├──> [Inventory Service]
    │        listen: order.placed
    │        emit: inventory.reserved
    │
    └──> [Notification Service]
             listen: order.placed, payment.processed
             emit: notification.sent
```

**Advantages**: No single point of failure, services are autonomous, easy to add new consumers.
**Disadvantages**: Hard to see the big picture, debugging across services is complex, no central state of the overall process.

### Event Orchestration (Saga)

A central orchestrator coordinates the process by sending commands and receiving events.

```
[Saga Orchestrator]
    │
    ├── send: ProcessPayment ──> [Payment Service]
    │   receive: PaymentProcessed
    │
    ├── send: ReserveInventory ──> [Inventory Service]
    │   receive: InventoryReserved
    │
    ├── send: ShipOrder ──> [Shipping Service]
    │   receive: OrderShipped
    │
    └── On failure at any step:
        send compensating commands in reverse order
```

**Advantages**: Centralized visibility, easier debugging, clear process definition.
**Disadvantages**: Orchestrator is a coordination bottleneck, tighter coupling.

### Choosing Choreography vs. Orchestration

| Factor | Choreography | Orchestration |
|--------|-------------|---------------|
| Number of steps | Few (2-4) | Many (5+) |
| Process visibility | Low priority | High priority |
| Team autonomy | High priority | Lower priority |
| Compensation needed | Simple | Complex |
| Debugging ease | Lower | Higher |
| Single point of failure | None | Orchestrator |
| Latency sensitivity | Higher (no coordinator hop) | Lower (coordinator adds latency) |

**Recommendation**: Use choreography for simple event reactions (3 or fewer steps). Use orchestration for complex business processes with compensation requirements.

---

## 6. Event Schema Evolution

### Schema Compatibility

As systems evolve, event schemas change. Compatibility rules determine which changes are safe:

**Backward compatible** (new consumers can read old events):
- Adding optional fields with defaults
- Adding new event types
- Widening field types (int32 to int64)

**Forward compatible** (old consumers can read new events):
- Removing optional fields
- Adding optional fields (old consumers ignore unknown fields)

**Full compatible** (both backward and forward):
- Adding optional fields with defaults
- This is the safest approach for automation

### Schema Registry

A centralized repository of event schemas with version management. Benefits:
- Producers validate events against the registered schema before publishing
- Consumers know exactly what fields to expect
- Schema evolution is controlled and validated
- Documentation is always up-to-date

**Tools**: Confluent Schema Registry (Avro/Protobuf/JSON Schema), AWS Glue Schema Registry, custom registries.

### Versioning Strategies

**In-band versioning**: Version is part of the event type: `order.placed.v2`. Consumers subscribe to specific versions. Simple but creates topic/channel proliferation.

**Header versioning**: Version is in the event metadata: `"version": "2.0"`. Consumers check version and handle accordingly. Keeps channels clean but requires consumer logic.

**Schema evolution**: Events evolve in-place using compatible changes only. No explicit versioning needed. Requires discipline and schema registry enforcement.

---

## 7. Event-Driven Error Handling

### Dead Letter Topics

Events that fail processing after maximum retries are published to a dead letter topic for manual inspection and replay.

```
[Event] ──> [Consumer] ──FAIL──> [Retry Queue] ──FAIL(3x)──> [Dead Letter Topic]
                                                                      │
                                                              [Alert Operations]
                                                              [Manual Review]
                                                              [Fix and Replay]
```

### Poison Message Handling

A poison message is one that causes consumer failure every time it is processed (malformed data, missing required fields, business rule violation). Without detection, a poison message blocks the entire queue.

**Detection**: Track per-message retry count. If a message exceeds the retry threshold, route to dead letter.

**Prevention**: Validate event schema on receipt before processing. Reject malformed events immediately.

### Event Replay

The ability to re-process historical events. Essential for:
- Recovering from consumer bugs (fix bug, replay events)
- Building new read models (replay all events into new projection)
- Testing (replay production events against staging consumers)

**Requirements**: Event store with retention period, consumer offset management, idempotent processing.

---

## 8. Event-Driven Architecture in iPaaS

### n8n Event Handling
- Webhook node for real-time event reception
- Cron node for scheduled polling
- Event trigger nodes for specific platforms (Slack events, GitHub webhooks)
- Error Trigger workflow for handling execution failures
- Sub-workflow execution for event processing chains

### Zapier Event Handling
- Instant triggers (webhooks) for real-time events
- Polling triggers for systems without webhook support
- Webhooks by Zapier for custom event reception
- Paths for event-type-based routing
- Filters for event filtering

### Make Event Handling
- Webhook modules for real-time event reception
- Scheduled triggers for polling
- Router modules for event-type-based fan-out
- Error handler modules for per-module failure handling
- Data stores for event correlation state

---

## 9. Designing Event-Driven Automations

### Design Checklist

1. **Event identification**: What events exist in the domain? Name them using past-tense verbs.
2. **Event payload design**: What data does each event carry? Use Event-Carried State Transfer unless events would be excessively large.
3. **Consumer identification**: Who needs to react to each event? Map events to consumers.
4. **Ordering requirements**: Which events must be processed in order? Define partition keys.
5. **Delivery guarantees**: What is acceptable? At-least-once with idempotent consumers is the standard.
6. **Error handling**: What happens when processing fails? Define retry policy and dead letter handling.
7. **Schema evolution**: How will events change over time? Establish compatibility rules.
8. **Monitoring**: How will you know if events are being processed? Define metrics and alerts.

### Anti-Patterns

**Event as Command**: Using events to tell systems what to do rather than what happened. Events state facts; commands make requests. "OrderPlaced" is an event. "ProcessOrder" is a command.

**Temporal Coupling**: Assuming events will arrive in a specific order or within a specific time window. Design consumers to handle out-of-order and delayed delivery.

**Missing Correlation**: Emitting related events without correlation IDs. Makes it impossible to trace a business process across multiple events.

**Over-Eventing**: Emitting an event for every trivial change. Creates noise and processing overhead. Emit events for business-significant state changes only.

---

**Event-driven architecture is not optional for modern automation. It is the foundation upon which reactive, resilient, and scalable workflows are built.**

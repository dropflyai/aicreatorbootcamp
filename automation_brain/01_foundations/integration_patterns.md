# Integration Patterns

## Enterprise Integration Patterns (Hohpe & Woolf, 2003)

This module codifies the 65 patterns from Gregor Hohpe and Bobby Woolf's "Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions" -- the definitive reference for system integration architecture. These patterns form the vocabulary of every integration architect and are the foundation of all iPaaS platform designs.

---

## 1. Integration Styles

Before selecting patterns, choose an integration style. Hohpe/Woolf identify four fundamental approaches:

### File Transfer
Systems produce files that other systems consume. The simplest integration style.
- **Advantages**: Decoupled, technology-agnostic, handles large volumes
- **Disadvantages**: High latency, no real-time capability, file format coupling
- **When to use**: Batch data exchange, legacy system integration, large dataset transfers
- **Modern equivalent**: S3 bucket event triggers, SFTP polling workflows

### Shared Database
Systems read and write from a common database. Direct data sharing.
- **Advantages**: Real-time access, consistent data, simple conceptually
- **Disadvantages**: Tight coupling, schema changes break consumers, performance contention
- **When to use**: Rarely recommended for new designs; acceptable for read replicas
- **Modern equivalent**: Shared API database, read-only replicas for reporting

### Remote Procedure Invocation (RPC)
Systems expose functions that other systems call directly. Synchronous communication.
- **Advantages**: Real-time, familiar programming model, immediate response
- **Disadvantages**: Temporal coupling (both systems must be running), cascading failures
- **When to use**: When immediate response is required, low-latency operations
- **Modern equivalent**: REST APIs, GraphQL, gRPC

### Messaging
Systems communicate by sending messages through a messaging infrastructure. Asynchronous communication.
- **Advantages**: Decoupled in time and space, resilient to failures, natural buffering
- **Disadvantages**: Complex error handling, eventual consistency, debugging difficulty
- **When to use**: Most integration scenarios; default recommendation
- **Modern equivalent**: Message brokers (RabbitMQ, Kafka), cloud messaging (SNS/SQS, Pub/Sub)

### Selection Decision Matrix

```
                    Real-Time Needed?
                    YES                    NO
              ┌──────────────────┬──────────────────┐
Coupling      │                  │                  │
Acceptable?   │ RPC / REST API   │ File Transfer    │
YES           │ (synchronous)    │ (batch)          │
              ├──────────────────┼──────────────────┤
              │                  │                  │
NO            │ Messaging        │ Messaging        │
              │ (async, events)  │ (async, batch)   │
              └──────────────────┴──────────────────┘
```

---

## 2. Messaging System Patterns

### Message Channel
A virtual pipe that connects sender to receiver.

**Point-to-Point Channel**: Exactly one consumer receives each message. Used for command processing, task distribution, request/reply. In iPaaS: direct workflow triggers, webhook-to-single-workflow routing.

**Publish-Subscribe Channel**: All subscribers receive a copy of every message. Used for event distribution, notification broadcasting, audit logging. In iPaaS: fan-out workflows, multi-system notification patterns.

**Datatype Channel**: A separate channel for each data type. Eliminates the need for consumers to filter messages by type. In iPaaS: separate workflows per entity type (orders, customers, invoices).

**Invalid Message Channel**: A channel for messages that cannot be processed due to format or content errors. The messaging equivalent of a dead letter queue. In iPaaS: error workflows that receive malformed trigger data.

**Dead Letter Channel**: A channel for messages that have been retried and cannot be delivered. Essential for zero-data-loss guarantees. In iPaaS: error output paths that persist failed items for manual review.

**Guaranteed Delivery**: The messaging system persists messages to disk before acknowledging receipt. Survives system crashes. In iPaaS: platforms with execution persistence (n8n stores execution data, Zapier logs task history).

**Channel Adapter**: Connects an application to the messaging system. Translates application-specific protocol to messaging protocol. In iPaaS: connectors/integrations that wrap API calls in platform-native interfaces.

### Message Construction

**Command Message**: A message that specifies a function to invoke. "Create this order," "Send this email." The message IS the instruction. In iPaaS: webhook payloads that trigger specific actions.

**Document Message**: A message that transfers data between systems. "Here is the updated customer record." The message IS the data. In iPaaS: data sync payloads, ETL pipeline records.

**Event Message**: A message that notifies of something that happened. "An order was placed." The message IS the notification. In iPaaS: event triggers from source systems.

**Request-Reply**: A pair of messages -- a request and a corresponding reply. The request includes a return address (reply channel). In iPaaS: synchronous webhook calls that return response data.

**Correlation Identifier**: A field in the message that correlates a reply to its request. Essential for matching responses in asynchronous request-reply. In iPaaS: workflow execution IDs, webhook callback tokens.

**Message Expiration**: A time-to-live on a message. Expired messages are discarded or routed to the dead letter channel. Prevents processing stale data. In iPaaS: webhook timeout settings, execution TTL configurations.

---

## 3. Message Routing Patterns

Routing patterns determine which consumers receive which messages. These are the most frequently applied EIP patterns in automation design.

### Content-Based Router

Routes a message to the correct recipient based on message content.

```
                              ┌──> [Customer Service System]
                              │    (when type = "support")
[Incoming] ──> [ROUTER] ─────┤
                              │    (when type = "sales")
                              ├──> [Sales CRM]
                              │
                              │    (when type = "billing")
                              └──> [Billing System]
```

**iPaaS Implementation**:
- n8n: Switch node or IF node with multiple outputs
- Zapier: Paths feature (up to 3 paths on paid plans)
- Make: Router module with filter conditions on routes

**Design rules**:
- Always include a default/fallback route for unrecognized content
- Keep routing logic in the router, not spread across downstream systems
- Document all routing conditions and their criteria

### Message Filter

Eliminates unwanted messages from a channel. A special case of content-based router where unwanted messages are simply discarded (or sent to a log).

**iPaaS Implementation**:
- n8n: IF node where one branch leads to "No Operation" node
- Zapier: Filter step (continues or stops the Zap)
- Make: Filter module between modules (passes or blocks)

### Recipient List

Routes a message to a dynamically determined list of recipients. Unlike content-based router (one recipient), the recipient list sends to multiple recipients based on message content or external lookup.

```
[Message] ──> [Lookup Recipients] ──> [Route to Each]
                    │
                    └── Checks: subscriber list, routing table,
                        message attributes
```

### Splitter

Breaks a composite message into individual messages. Essential for batch processing: receive an array, process each item individually.

```
[{A, B, C}] ──> [SPLITTER] ──> [A] ──> [Process]
                            ──> [B] ──> [Process]
                            ──> [C] ──> [Process]
```

**iPaaS Implementation**:
- n8n: Item Lists node or SplitInBatches node
- Zapier: Line Item processing (automatic iteration)
- Make: Iterator module

### Aggregator

Combines multiple related messages into a single composite message. The inverse of Splitter. Requires a correlation condition (which messages belong together) and a completeness condition (when to stop waiting and emit the aggregate).

```
[A] ──┐
[B] ──┼──> [AGGREGATOR] ──> [{A, B, C}]
[C] ──┘
        Correlation: same order_id
        Completeness: 3 items received OR 60s timeout
```

**iPaaS Implementation**:
- n8n: Merge node (multiple modes: append, merge by key, multiplex)
- Zapier: Limited (Formatter with line items, or Looping)
- Make: Array Aggregator module

**Aggregator design challenges**:
- What if not all expected messages arrive? (timeout and partial aggregation)
- What if duplicate messages arrive? (deduplication before aggregation)
- What if messages arrive out of order? (buffering and resequencing)

### Resequencer

Restores the original order of messages that arrived out of sequence. Buffers messages and emits them in correct order based on a sequence number.

### Composed Message Processor

Splits a composite message, routes each sub-message to the correct processor, and reaggregates the results. Combines Splitter, Router, and Aggregator.

```
[Composite] ──> [Split] ──> [Route] ──> [Process] ──> [Aggregate] ──> [Result]
```

### Scatter-Gather

Broadcasts a message to multiple recipients and reaggregates responses. Two variants: **Auction** (best response wins) and **Distribution** (all responses combined).

```
                    ┌──> [Service A] ──┐
[Request] ──> [Broadcast]              [Aggregate] ──> [Best Result]
                    └──> [Service B] ──┘
```

**iPaaS Implementation**: Fan-out to multiple API calls, collect responses, merge or select best.

### Routing Slip

Defines a sequence of processing steps as a list attached to the message. Each processor handles the message and routes it to the next processor on the slip. Enables dynamic, data-driven pipeline composition.

### Process Manager

A central coordinator that maintains the state of a message's processing across multiple steps. More capable than Routing Slip because it can make conditional routing decisions based on intermediate results. Equivalent to the Saga Orchestrator pattern.

---

## 4. Message Transformation Patterns

### Message Translator
Converts a message from one format to another. The most common transformation in automation.

```
Source Format          Translator          Target Format
{                      ──────>            {
  "first_name": "Jo"                        "name": "Jo Smith",
  "last_name": "Smith"                      "email": "jo@test.com"
  "email": "jo@test.com"                  }
}
```

**Transformation types**:
- **Structural**: Flattening nested objects, nesting flat fields, renaming fields
- **Value**: Type conversion (string to number), format conversion (date formats), encoding
- **Semantic**: Mapping code values (status codes between systems), unit conversion
- **Aggregation**: Summing, counting, averaging across fields

### Envelope Wrapper
Wraps application data in messaging infrastructure metadata. On receipt, the wrapper is stripped and the application data is delivered.

```
{
  "header": {
    "message_id": "uuid-123",
    "timestamp": "2024-01-15T10:30:00Z",
    "source": "crm",
    "type": "customer.updated"
  },
  "body": {
    "customer_id": 456,
    "name": "Updated Name"
  }
}
```

### Content Enricher
Augments a message with data from an external source. The message arrives with partial data; the enricher looks up additional data and adds it.

```
[Partial Message] ──> [Lookup in DB] ──> [Complete Message]

Input:  { order_id: 123 }
Lookup: GET /api/orders/123 -> { product: "Widget", qty: 5 }
Output: { order_id: 123, product: "Widget", qty: 5 }
```

**iPaaS Implementation**:
- n8n: HTTP Request node to fetch additional data, Merge node to combine
- Zapier: Lookup step (Find Record), Formatter to combine
- Make: HTTP module for lookup, Set Variable to merge

### Content Filter
Removes unwanted data from a message. The inverse of Content Enricher. Used for privacy (strip PII before logging), efficiency (remove large unused fields), and compatibility (remove fields the target system cannot handle).

### Normalizer
Routes messages of varying formats through format-specific translators to produce a single canonical format. Essential when receiving data from multiple sources in different formats.

```
[Format A] ──> [Translator A] ──┐
[Format B] ──> [Translator B] ──┼──> [Canonical Format]
[Format C] ──> [Translator C] ──┘
```

### Canonical Data Model
A shared data model that all systems map to and from. Prevents N-squared translation problem (N systems would need N*(N-1) translators). With canonical model, each system needs only 2 translators (to canonical and from canonical).

```
Without canonical: N*(N-1) translators = 12 for 4 systems
With canonical:    2*N translators = 8 for 4 systems
```

---

## 5. Message Endpoint Patterns

### Polling Consumer
Explicitly checks for new messages on a schedule. Simple but introduces latency (up to one polling interval).

**iPaaS Implementation**: Scheduled triggers in all platforms. n8n: Cron trigger. Zapier: Polling triggers (default for most apps, checks every 1-15 minutes). Make: Scheduled scenarios.

### Event-Driven Consumer
Receives messages pushed by the messaging system. Zero latency (processing starts immediately on event). Requires the source to support push notification (webhooks, WebSocket).

**iPaaS Implementation**: Webhook triggers. n8n: Webhook node. Zapier: Instant triggers (webhooks). Make: Webhook modules.

### Competing Consumers
Multiple consumers read from the same channel. Each message is processed by exactly one consumer. Provides horizontal scaling -- add more consumers to increase throughput.

**iPaaS Implementation**: Multiple workflow instances consuming from a shared queue. n8n: Parallel execution mode. Zapier: Automatic (each task is independent). Make: Parallel execution setting.

### Idempotent Receiver
A consumer that can safely process the same message multiple times. Essential because distributed messaging systems may deliver duplicates.

**Implementation strategy**:
1. Extract a unique identifier from the message (idempotency key)
2. Check if this key has been processed before (lookup in deduplication store)
3. If processed: return cached result, skip processing
4. If new: process the message, store the key and result

---

## 6. System Management Patterns

### Control Bus
A messaging channel used to manage and monitor the integration infrastructure itself. Separate from application message channels. Carries: configuration changes, health checks, statistics requests.

### Wire Tap
Inserts a listener on a channel that copies each message to a secondary channel (for logging, auditing, debugging) without affecting the primary flow.

**iPaaS Implementation**: n8n: Add a parallel branch that logs to a monitoring system. Make: Add a route in a router that sends to a logging module.

### Message Store
Persists a copy of every message flowing through the system. Enables replay, audit, debugging, and compliance. In iPaaS: execution history and logs.

### Smart Proxy
Tracks requests and their corresponding replies, enabling monitoring of request-reply conversations.

---

## 7. Pattern Composition and Anti-Patterns

### Composition Guidelines

Patterns compose naturally:
- **Splitter + Router + Aggregator** = Composed Message Processor
- **Content Enricher + Content Filter** = Data Transformation Pipeline
- **Pub/Sub + Content-Based Router** = Selective Notification
- **Scatter-Gather + Aggregator** = Parallel Processing with Collection

### Anti-Patterns to Avoid

**Spaghetti Integration**: Point-to-point connections between every system. No central routing or transformation. Creates O(N^2) complexity.

**Golden Hammer**: Using one integration style for everything. REST for batch transfer. Messaging for simple request-reply. Match the style to the requirement.

**Chatty Integration**: Many small messages where fewer large messages would suffice. Each message has overhead (serialization, network, processing). Batch when possible.

**Tight Coupling Through Data Format**: Systems sharing internal data structures. Changes to one system's internal model break all integrations. Use canonical data models and message translators.

**Synchronous Everything**: Making all integrations synchronous (request-reply). Blocks callers, creates cascading failures, limits throughput. Default to asynchronous messaging.

---

## 8. Pattern Selection Guide

| Requirement | Recommended Pattern |
|-------------|-------------------|
| Route to one of many recipients | Content-Based Router |
| Route to dynamically determined recipients | Recipient List |
| Process array items individually | Splitter |
| Collect individual results into array | Aggregator |
| Add data from external source | Content Enricher |
| Remove sensitive fields | Content Filter |
| Handle multiple input formats | Normalizer |
| Scale processing throughput | Competing Consumers |
| Handle duplicate messages | Idempotent Receiver |
| Log all messages for audit | Wire Tap + Message Store |
| Multi-step processing across systems | Process Manager (Saga) |
| Broadcast to all interested parties | Publish-Subscribe Channel |
| Ensure no message loss | Guaranteed Delivery + Dead Letter Channel |

---

**Master these patterns. They are the vocabulary of integration architecture. Every iPaaS workflow is a composition of these patterns, whether the designer recognizes it or not.**

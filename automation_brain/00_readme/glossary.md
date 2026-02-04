# Automation Brain -- Glossary

## Core Automation Terminology

### Workflow
A directed graph of steps (nodes) connected by transitions (edges) that defines an automated process. Each step performs a discrete action -- API call, data transformation, conditional branch, or human task. Formally, a workflow W = (N, E, T, C) where N is a set of nodes, E is a set of edges, T is a trigger, and C is a completion condition.

### Trigger
The initiating event that starts a workflow execution. Categories include: webhook (HTTP request received), schedule (cron-based timing), event (message from event bus), poll (periodic check for changes), and manual (human-initiated). Trigger design is foundational to automation reliability.

### Node / Step / Action
A single unit of work within a workflow. In n8n these are "nodes," in Zapier these are "actions" or "steps," in Make these are "modules." Each node receives input data, performs an operation, and produces output data.

### Execution / Run
A single invocation of a workflow from trigger to completion (or failure). Each execution has a unique identifier, input parameters, execution state, output data, and timing metadata.

### iPaaS (Integration Platform as a Service)
Cloud-based platform providing pre-built connectors, workflow designers, and execution engines for building integrations without custom code. Examples: Zapier, Make, Workato, Tray.io. Distinguished from custom integration by reduced development time and maintained connectors.

### Connector / Integration App
A pre-built module that interfaces with a specific external service (e.g., Slack connector, Salesforce connector). Connectors abstract authentication, API versioning, and data formatting for their target service.

---

## Enterprise Integration Patterns (Hohpe/Woolf)

### Message
The atomic unit of data exchanged between systems in integration architecture. A message consists of a header (metadata: ID, timestamp, type, correlation ID) and a body (payload: the actual data being communicated). Per Hohpe/Woolf (2003), "Messaging is the most loosely coupled integration style."

### Message Channel
A virtual pipe connecting a sender to a receiver. Two fundamental types exist: **Point-to-Point Channel** (exactly one consumer receives each message) and **Publish-Subscribe Channel** (all subscribers receive a copy of each message).

### Message Router
A pattern that consumes a message from one channel and republishes it to a different channel based on conditions. Sub-patterns include:
- **Content-Based Router**: Routes based on message content
- **Message Filter**: Drops messages that do not match criteria
- **Recipient List**: Routes to a dynamically determined list of recipients
- **Splitter**: Breaks a composite message into individual messages
- **Aggregator**: Combines multiple related messages into a single message
- **Resequencer**: Reorders messages to restore original sequence

### Message Translator
A pattern that transforms a message from one format to another. Sub-patterns include:
- **Envelope Wrapper**: Wraps application data in messaging-specific headers
- **Content Enricher**: Augments a message with data from an external source
- **Content Filter**: Removes unwanted fields from a message
- **Normalizer**: Routes messages of different formats through format-specific translators to produce a canonical format

### Message Endpoint
The interface between an application and the messaging system. Sub-patterns include:
- **Polling Consumer**: Explicitly fetches messages from a channel
- **Event-Driven Consumer**: Receives messages pushed by the messaging system
- **Competing Consumers**: Multiple consumers compete to process messages from a single channel
- **Message Dispatcher**: Distributes messages to performers based on message type

### Dead Letter Channel
A channel for messages that cannot be delivered or processed. When a message fails repeatedly (exceeding retry limits), it is routed to the dead letter channel for manual inspection, debugging, and potential replay.

### Guaranteed Delivery
A pattern ensuring messages are not lost even if the messaging system fails. Implemented through message persistence (writing to disk before acknowledging receipt) and acknowledgment protocols.

### Idempotent Receiver
A message endpoint that can safely receive and process the same message multiple times. Critical for exactly-once processing semantics in distributed systems where duplicate delivery is possible.

---

## Event-Driven Architecture

### Event
An immutable record of something that happened in a system. Unlike commands (which request action) or queries (which request data), events state facts about the past: "OrderPlaced," "PaymentReceived," "UserRegistered." Events carry a timestamp, event type, source, and payload.

### Event Sourcing
A persistence pattern where state changes are stored as a sequence of events rather than as mutable records. The current state is derived by replaying events from the beginning. Provides complete audit trail and enables temporal queries.

### CQRS (Command Query Responsibility Segregation)
An architectural pattern that separates read models from write models. Commands mutate state (through events); queries read from optimized read models. Often paired with event sourcing. Introduced by Greg Young (2010) based on Bertrand Meyer's CQS principle.

### Pub/Sub (Publish-Subscribe)
A messaging pattern where publishers emit events without knowledge of subscribers. Subscribers register interest in event types and receive matching events. Decouples producers from consumers. Implementations include message brokers (RabbitMQ, Kafka), cloud services (AWS SNS/SQS, Google Pub/Sub), and platform-level event buses.

### Event Bus
An infrastructure component that receives events from publishers and delivers them to subscribers. May provide ordering guarantees, persistence, replay capability, and filtering.

### Choreography
A coordination pattern where autonomous services react to events without a central coordinator. Each service knows what events to emit and what events to react to. Contrasted with **orchestration**, where a central controller directs the sequence of operations.

### Orchestration
A coordination pattern where a central controller (orchestrator) manages the sequence of service invocations. The orchestrator maintains workflow state and directs each participant. Provides centralized visibility but creates a single point of coordination.

---

## Workflow Patterns (van der Aalst et al.)

### Sequence Pattern
Tasks execute in a defined order: A then B then C. The most fundamental workflow pattern. Every workflow engine supports this natively.

### Parallel Split
A point in the workflow where a single thread of execution splits into multiple concurrent threads. All branches execute simultaneously. Also known as AND-split or fork.

### Synchronization
A point where multiple concurrent branches reconverge into a single thread. Execution continues only when ALL incoming branches have completed. Also known as AND-join or barrier synchronization.

### Exclusive Choice
A point where exactly one of multiple branches is selected based on a condition. Also known as XOR-split. Equivalent to an if-else in programming.

### Simple Merge
A point where multiple alternative branches converge without synchronization. The first branch to arrive triggers continuation. Also known as XOR-join.

### Structured Loop
A workflow segment that executes repeatedly until a condition is met. Two variants: **while-do** (condition checked before each iteration) and **repeat-until** (condition checked after each iteration).

### Cancellation Pattern
The ability to terminate an executing workflow instance or a subset of its activities. Includes **cancel activity** (stop a single task), **cancel case** (stop an entire workflow instance), and **cancel region** (stop a subset of activities).

### Compensation Pattern
The ability to undo the effects of a completed activity when a subsequent step fails. Implements the Saga pattern for distributed transactions. Each forward step has a corresponding compensating action.

---

## Resilience Patterns

### Circuit Breaker
A pattern that prevents an application from repeatedly trying an operation likely to fail. Three states: **Closed** (normal operation), **Open** (calls fail immediately without trying), **Half-Open** (limited test calls to probe recovery). Named by Michael Nygard in "Release It!" (2007).

### Retry with Exponential Backoff
A retry strategy where the delay between attempts increases exponentially: 1s, 2s, 4s, 8s, 16s. Prevents overwhelming a recovering service. Often combined with jitter (random variation) to prevent thundering herd problems.

### Dead Letter Queue (DLQ)
A holding area for messages that have exhausted all retry attempts. Messages in the DLQ are inspected manually, debugged, potentially modified, and replayed. Essential for zero-data-loss guarantees.

### Bulkhead
A pattern that isolates failures to prevent cascading. Named after ship bulkheads that contain flooding. In automation: separate execution pools, independent retry queues, isolated credential contexts.

### Timeout
A maximum duration for an operation before it is considered failed. Critical in distributed systems where a service may be unreachable. Timeouts should be tuned per-operation: database queries (5s), API calls (30s), webhook responses (10s).

### Idempotency Key
A unique identifier attached to an operation that allows the receiver to detect and handle duplicate requests. Typically a UUID generated by the sender and included in the request header. The receiver stores processed keys and returns cached results for duplicates.

---

## Business Process Automation

### BPA (Business Process Automation)
The use of technology to automate repeatable business processes. Distinguished from simple task automation by its scope: BPA addresses end-to-end processes that span multiple departments, systems, and roles.

### BPMN (Business Process Model and Notation)
An OMG standard (ISO 19510) for graphical representation of business processes. Elements include: events (circles), activities (rounded rectangles), gateways (diamonds), and flows (arrows). BPMN 2.0 includes execution semantics, making models directly executable.

### RPA (Robotic Process Automation)
Technology that automates tasks by mimicking human interactions with user interfaces. RPA "bots" click buttons, fill forms, copy data, and navigate applications at the UI level. Appropriate when no API exists and the process is rule-based and repetitive. Limited by UI changes and lacks semantic understanding.

### Process Mining
The use of event log data to discover, monitor, and improve business processes. Algorithms reconstruct actual process flows from system logs, revealing bottlenecks, deviations, and compliance violations. Tools include Celonis, Minit, and ProM.

### STP (Straight-Through Processing)
A process that executes from initiation to completion without any manual intervention. The gold standard for automation: no human touches, no manual approvals, no data re-entry. Commonly targeted in financial services and order processing.

---

## Data Synchronization

### Bidirectional Sync
Synchronization where changes in either system are propagated to the other. Introduces conflict resolution challenges when the same record is modified in both systems between sync cycles. Requires conflict detection (timestamp comparison, version vectors) and resolution strategies.

### Eventual Consistency
A consistency model where, given no new updates, all replicas of data will eventually converge to the same state. Weaker than strong consistency but enables higher availability and partition tolerance (per CAP theorem). Most integration scenarios operate under eventual consistency.

### CDC (Change Data Capture)
A technique for identifying and capturing changes made to a data source. Methods include: **log-based** (reading database transaction logs), **trigger-based** (database triggers that write to a change table), **timestamp-based** (querying for records modified since last sync), and **diff-based** (comparing snapshots).

### ETL (Extract, Transform, Load)
A data integration process: **Extract** data from source systems, **Transform** it (clean, enrich, aggregate, format), and **Load** it into target systems. Modern variant ELT loads raw data first and transforms within the target system.

### Conflict Resolution
The process of determining the correct state when two systems have divergent values for the same record. Strategies include: **Last-Write-Wins** (timestamp comparison), **Merge** (combine non-conflicting fields), **Manual Review** (human decision), and **Domain-Specific Rules** (business logic determines winner).

---

## Platform-Specific Terms

### n8n
- **Workflow**: The top-level automation object containing nodes and connections
- **Node**: A single operation (HTTP request, function, if/else, etc.)
- **Credential**: Stored authentication for external services
- **Expression**: Dynamic value using `{{ }}` syntax for data access
- **Sub-Workflow**: A workflow called by another workflow (composition pattern)
- **Execution**: A single run of a workflow with its data and status

### Zapier
- **Zap**: A complete automation (trigger + one or more actions)
- **Trigger**: The event that starts a Zap (new row, new email, webhook, etc.)
- **Action**: A step that performs work (create record, send message, etc.)
- **Path**: Conditional branching within a Zap (if/else logic)
- **Filter**: A step that stops the Zap if conditions are not met
- **Formatter**: A built-in data transformation step
- **Task**: A single action execution (Zapier billing unit)
- **Zapier Tables**: Built-in database for storing and querying data

### Make (Integromat)
- **Scenario**: A complete automation (trigger + modules + routes)
- **Module**: A single operation within a scenario
- **Route**: A branch path after a router module
- **Iterator**: A module that processes array items one by one
- **Aggregator**: A module that combines multiple items into an array
- **Data Structure**: A defined schema for structured data
- **Webhook**: A custom trigger that receives HTTP requests
- **Operation**: A single module execution (Make billing unit)

---

## Governance Terms

### Shadow Automation
An undocumented automation created by individuals outside the governance framework. Shadow automations pose risks: unknown dependencies, unmonitored failures, credential sprawl, data integrity issues. The Automation Brain's governance framework prevents shadow automations.

### Automation Debt
The accumulated cost of poorly designed, undocumented, or unmaintained automations. Analogous to technical debt. Manifests as: brittle workflows that break frequently, redundant integrations doing the same thing differently, orphaned automations consuming resources, and undocumented credential dependencies.

### Runbook
A documented set of procedures for operating, maintaining, and troubleshooting an automation. Includes: purpose, architecture, dependencies, common failure modes, recovery procedures, and escalation contacts.

---

**This glossary provides the shared vocabulary for all Automation Brain operations.**

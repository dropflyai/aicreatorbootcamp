# Workflow Patterns

## Control-Flow, Error Compensation, and Structural Patterns for Automation

Workflow patterns define how activities are composed into executable processes. This module extends van der Aalst et al.'s (2003) formal pattern taxonomy with practical implementation guidance for iPaaS platforms and custom automation systems. Every automation engineer must internalize these patterns as the building blocks of workflow design.

---

## 1. Sequential Patterns

### Linear Sequence

The most fundamental pattern: activities execute in a strict linear order. Activity B starts only after Activity A completes successfully.

```
[Trigger] ──> [Step A] ──> [Step B] ──> [Step C] ──> [End]
```

**Properties**:
- Deterministic execution order
- Simple error handling (fail at point of failure)
- Total execution time = sum of all step durations
- No concurrency benefits

**When to use**: Simple data pipelines, linear approval chains, sequential API calls where each depends on the previous.

**iPaaS implementation**:
- n8n: Connect nodes in a straight line
- Zapier: Multi-step Zap (the only native pattern)
- Make: Linear module chain

### Sequential with Accumulation

Each step adds data to a growing context object. Downstream steps have access to all upstream outputs.

```
[Trigger: { email }]
    │
    ▼
[Lookup User] ──adds──> { email, user_id, name }
    │
    ▼
[Fetch Orders] ──adds──> { email, user_id, name, orders[] }
    │
    ▼
[Calculate Metrics] ──adds──> { email, user_id, name, orders[], lifetime_value }
    │
    ▼
[Update CRM] (has full context)
```

**Implementation note**: In n8n, each node output is accessible to all downstream nodes via expressions. In Zapier, each step's output is available in subsequent steps. In Make, variables propagate through the scenario.

---

## 2. Parallel Patterns

### Parallel Split (AND-Split / Fork)

A single execution thread divides into multiple concurrent threads. All branches execute simultaneously.

```
                    ┌──> [Branch A: Send Email]
[Trigger] ──> [Fork]
                    ├──> [Branch B: Update CRM]
                    │
                    └──> [Branch C: Log Analytics]
```

**Properties**:
- All branches start simultaneously
- Branches are independent (no data dependencies between them)
- Total execution time = max(branch durations) -- significant speedup
- Failure in one branch does not affect others (unless configured otherwise)

**iPaaS implementation**:
- n8n: Connect a single node to multiple output nodes (native parallel execution)
- Zapier: Paths (but limited -- Zapier Paths is actually exclusive choice, not true parallel)
- Make: Router module with no filters (all routes execute)

### Synchronization (AND-Join / Barrier)

Multiple concurrent branches converge into a single thread. Execution continues only when ALL branches complete.

```
[Branch A] ──┐
[Branch B] ──┼──> [Barrier] ──> [Continue]
[Branch C] ──┘
```

**Properties**:
- Waits for the slowest branch
- Must handle branch failures (what if one branch never completes?)
- Timeout is essential (maximum wait time for all branches)
- Output is typically the merged results of all branches

**iPaaS implementation**:
- n8n: Merge node in "Wait for All" mode
- Zapier: Not natively supported (workaround: use storage/webhook callbacks)
- Make: Converging routes after a router (Make waits for all routes)

**Timeout handling**: Always set a maximum wait time. If a branch does not complete within the timeout, either proceed with partial results or fail the workflow with an explanatory error.

### Parallel with Priority

All branches execute concurrently, but the first branch to complete determines the outcome. Other branches are cancelled (or their results are discarded).

```
[Branch A: Primary API] ──┐
                          ├──> [First Completes] ──> [Use Result]
[Branch B: Fallback API] ──┘    (cancel others)
```

**Use case**: Querying multiple data sources and using the fastest response. Implementing fallback strategies where primary and secondary sources race.

---

## 3. Conditional Patterns

### Exclusive Choice (XOR-Split / If-Else)

Exactly one branch is selected based on a condition. The most common branching pattern.

```
                         ┌──> [High Priority Path]
                         │    (when priority = "high")
[Evaluate] ──> [XOR] ───┤
                         │    (when priority = "normal")
                         ├──> [Normal Path]
                         │
                         │    (default)
                         └──> [Default Path]
```

**Design rules**:
1. Conditions must be mutually exclusive (no ambiguity)
2. Conditions must be exhaustive (default/fallback is mandatory)
3. Evaluate conditions in order of likelihood (performance optimization)
4. Keep condition logic in the gateway, not scattered across branches

**iPaaS implementation**:
- n8n: IF node (two outputs: true/false) or Switch node (multiple outputs)
- Zapier: Paths feature (conditions on each path) or Filter (binary: continue/stop)
- Make: Router with filter conditions on each route

### Multi-Choice (Inclusive OR / OR-Split)

One or more branches are selected based on conditions. Unlike exclusive choice, multiple branches may execute.

```
                              ┌──> [Email Notification]
                              │    (when notify_email = true)
[Evaluate] ──> [OR-Split] ───┤
                              │    (when notify_slack = true)
                              ├──> [Slack Notification]
                              │
                              │    (when notify_sms = true)
                              └──> [SMS Notification]
```

**Properties**:
- Zero or more branches execute (at least one should be guaranteed by design)
- Branches execute in parallel (concurrent)
- Synchronizing merge must handle variable number of incoming branches

### Deferred Choice (External Choice)

The branch is determined by an external event rather than data conditions. The workflow pauses and waits for one of several possible events to occur. The first event to arrive determines the path.

```
[Submit Application] ──> [WAIT FOR EVENT]
                              │
                    ┌─────────┼─────────┐
                    │         │         │
              [Approved]  [Rejected]  [Timeout]
                    │         │         │
              [Process]   [Notify]   [Escalate]
```

**Use cases**: Human approval workflows, payment confirmation waiting, external system callbacks.

**iPaaS implementation**:
- n8n: Wait node with webhook resume, or separate trigger workflows
- Zapier: Multi-step with delay + webhook callback
- Make: Webhook wait with timeout

---

## 4. Loop Patterns

### While-Do Loop (Pre-Test)

Condition is checked before each iteration. If the condition is false initially, the loop body never executes.

```
[Start] ──> [Check Condition] ──true──> [Loop Body] ──> [Check Condition]
                   │
                   false
                   │
                   ▼
              [Continue]
```

### Repeat-Until Loop (Post-Test)

Loop body executes at least once. Condition is checked after each iteration.

```
[Start] ──> [Loop Body] ──> [Check Condition] ──not met──> [Loop Body]
                                    │
                                    met
                                    │
                                    ▼
                              [Continue]
```

### Bounded Loop (For-Each / Iterator)

Iterates over a collection, executing the loop body once for each item. The number of iterations is determined by the collection size.

```
[Items: [A, B, C]] ──> [FOR EACH item] ──> [Process item]
                              │                    │
                              │                    │
                              └────────────────────┘
                                    │
                              [All processed]
                                    │
                              [Continue with results[]]
```

**iPaaS implementation**:
- n8n: SplitInBatches node (processes N items per batch, loops automatically)
- Zapier: Looping by Zapier (iterates over an array)
- Make: Iterator module (emits one bundle per array item)

### Pagination Loop

A specialized loop pattern for APIs that return paginated results. Fetches pages until no more data is available.

```
[Initialize: page=1, results=[]]
    │
    ▼
[Fetch Page] ──> [Append Results] ──> [Has Next Page?]
    ▲                                       │
    │              yes                      │
    └───────────────────────────────────────┘
                                            │
                                            no
                                            │
                                            ▼
                                    [Return All Results]
```

**Design rules**:
1. Always set a maximum page limit (prevent infinite loops)
2. Handle rate limiting between page fetches
3. Implement exponential backoff if rate limited
4. Store intermediate results in case of failure mid-pagination

### Retry Loop

A specialized loop for retrying failed operations. Combines loop with exponential backoff and maximum retry count.

```
[Attempt Operation]
    │
    ├── Success ──> [Continue]
    │
    └── Failure ──> [Retry Count < Max?]
                         │
                    ┌────┤
                    │    no
                    │    │
                    │    ▼
                    │  [Dead Letter / Escalate]
                    │
                    yes
                    │
                    ▼
              [Wait: backoff_delay * 2^retry_count]
                    │
                    ▼
              [Attempt Operation]
```

---

## 5. Error Compensation Patterns

### Saga Pattern (Compensating Transactions)

When a multi-step workflow fails partway through, previously completed steps must be undone. Each forward step has a corresponding compensating action.

```
Forward Flow:
[Create Order] ──> [Reserve Inventory] ──> [Charge Payment] ──> [Ship]

Compensating Flow (if Ship fails):
[Ship FAILED] ──> [Refund Payment] ──> [Release Inventory] ──> [Cancel Order]
```

**Implementation approaches**:

**Choreography-based saga**: Each service emits success/failure events. Compensating services listen for failure events and undo their work.

**Orchestration-based saga**: A central orchestrator tracks the saga state and issues compensating commands on failure. Easier to reason about and debug.

**Design rules**:
1. Every forward step MUST have a defined compensating action
2. Compensating actions must be idempotent (may be called multiple times)
3. Compensating actions should not fail (if they do, alert for manual intervention)
4. Log every compensation for audit trail

### Error Workflow (Error Handler)

A separate workflow that executes when the primary workflow fails. The error workflow receives the failure context (error message, failed step, input data) and performs recovery or notification.

```
[Primary Workflow] ──FAILURE──> [Error Workflow]
                                      │
                                      ├── Log error details
                                      ├── Send alert to team
                                      ├── Store failed data for retry
                                      └── Update monitoring dashboard
```

**iPaaS implementation**:
- n8n: Error Trigger node starts a separate error workflow
- Zapier: Not natively supported (use conditional logic within the Zap)
- Make: Error Handler module attached to any module (Resume, Commit, Rollback, Ignore, Break)

### Circuit Breaker Workflow

A meta-pattern that wraps a potentially failing integration with circuit breaker logic.

```
[Check Circuit State]
    │
    ├── CLOSED (normal) ──> [Execute Integration]
    │                              │
    │                    ┌─────────┤
    │                    │         │
    │               Success     Failure
    │                    │         │
    │               [Reset       [Increment
    │                failure      failure
    │                count]       count]
    │                              │
    │                    [Count > Threshold?]
    │                         │
    │                    ┌────┤
    │                    no   yes
    │                    │    │
    │                    │    ▼
    │                    │  [OPEN Circuit]
    │                    │  [Set timer for recovery probe]
    │                    │
    ├── OPEN ──> [Return Cached/Default/Error immediately]
    │
    └── HALF-OPEN ──> [Execute ONE probe request]
                           │
                      ┌────┤
                   Success  Failure
                      │      │
                [CLOSE      [Re-OPEN
                 Circuit]    Circuit]
```

---

## 6. Structural Patterns

### Sub-Workflow (Composition)

Encapsulate a reusable sequence of steps as a named sub-workflow. The parent workflow calls the sub-workflow, passing parameters and receiving results. This is the primary mechanism for workflow reuse and modularity.

```
[Parent Workflow]
    │
    ├── [Step 1: Validate Input]
    │
    ├── [Step 2: Call Sub-Workflow "Enrich Customer Data"]
    │         │
    │         ├── [Lookup in CRM]
    │         ├── [Lookup in Database]
    │         └── [Merge and Return]
    │
    ├── [Step 3: Process Enriched Data]
    │
    └── [End]
```

**iPaaS implementation**:
- n8n: Execute Workflow node (calls another workflow by ID)
- Zapier: Not natively supported (workaround: use webhooks between Zaps)
- Make: Not natively supported (workaround: use webhooks between scenarios)

### Workflow Template

A parameterized workflow pattern that can be instantiated for specific use cases. Unlike sub-workflows (called at runtime), templates are design-time artifacts that are cloned and customized.

```
Template: "CRM Sync Pattern"
    Parameters:
        - source_system: [Salesforce | HubSpot | Pipedrive]
        - target_system: [Salesforce | HubSpot | Pipedrive]
        - entity_type: [Contact | Lead | Deal]
        - sync_direction: [unidirectional | bidirectional]

    Instantiation:
        "Salesforce -> HubSpot Contact Sync"
        "Pipedrive -> Salesforce Lead Sync"
```

### Pipeline Pattern

A chain of processing stages where each stage transforms the data and passes it to the next. Inspired by Unix pipes. Each stage is independent and composable.

```
[Input] ──> [Validate] ──> [Transform] ──> [Enrich] ──> [Filter] ──> [Load]
```

**Properties**:
- Each stage has a single responsibility
- Stages are independently testable
- Stages can be reordered or replaced without affecting others
- Natural error boundary: failure in one stage does not corrupt the pipeline

---

## 7. Advanced Composition Patterns

### Fan-Out / Fan-In

Broadcast a request to multiple services, collect all responses, and aggregate results. Combines Parallel Split with Synchronization.

```
                    ┌──> [Service A] ──> [Result A] ──┐
[Request] ──> [Fan-Out]                               [Fan-In] ──> [Aggregated]
                    └──> [Service B] ──> [Result B] ──┘
```

### Scatter-Gather with Timeout

Fan-out with a time limit. Collect as many responses as arrive within the timeout; proceed with partial results.

```
[Broadcast] ──> [Wait max 5 seconds] ──> [Aggregate received responses]
```

**Use case**: Querying multiple inventory warehouses. If one does not respond within 5 seconds, proceed with available data.

### Event-Driven Chain

Each step in the chain is triggered by the completion event of the previous step. Unlike direct sequential execution, steps are decoupled through events.

```
[Step A completes] ──emit: "step_a.completed"──> [Step B starts]
[Step B completes] ──emit: "step_b.completed"──> [Step C starts]
```

**Advantages over direct sequence**: Steps can run in different systems, failures are isolated, steps can be retried independently, and new consumers can be added without modifying the chain.

### Human-in-the-Loop

A workflow that pauses at a designated point for human input before continuing. The human task is modeled as an event (approval, review, data entry).

```
[Automated Steps] ──> [PAUSE: Awaiting Human Input]
                              │
                    [Human performs task]
                    [Submits via form/email/app]
                              │
                              ▼
                    [Resume Automated Steps]
```

**Implementation**: Webhook or callback URL that the human interaction triggers. The workflow stores its state and resumes when the callback is received.

---

## 8. Pattern Selection Decision Tree

```
Start: What kind of workflow do you need?

├── Linear process, each step depends on previous
│   └── Sequential Pattern
│
├── Multiple independent tasks
│   ├── Need all results before continuing?
│   │   └── Parallel Split + Synchronization
│   └── Results independent?
│       └── Parallel Split (fire-and-forget branches)
│
├── Different paths based on data
│   ├── Exactly one path?
│   │   └── Exclusive Choice
│   └── Multiple paths possible?
│       └── Multi-Choice
│
├── Waiting for external event
│   └── Deferred Choice
│
├── Processing a collection of items
│   └── Bounded Loop (For-Each / Iterator)
│
├── Repeating until condition met
│   └── While-Do or Repeat-Until Loop
│
├── Multi-system transaction
│   └── Saga Pattern (with compensation)
│
├── Reusable logic needed in multiple workflows
│   └── Sub-Workflow (Composition)
│
└── Need human approval midway
    └── Human-in-the-Loop with Deferred Choice
```

---

**Every workflow is a composition of these patterns. Master them, and you can design any automation.**

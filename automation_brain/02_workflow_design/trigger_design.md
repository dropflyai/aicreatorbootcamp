# Trigger Design

## Engineering Robust Automation Triggers

The trigger is the most critical component of any automation. A poorly designed trigger causes missed executions, duplicate runs, race conditions, and data loss. This module provides a comprehensive framework for trigger selection, configuration, and hardening, drawing from distributed systems theory and production automation experience.

---

## 1. Trigger Taxonomy

### Webhook Triggers (Push-Based, Real-Time)

A webhook trigger activates when an external system sends an HTTP request to a registered URL. The automation platform listens on a dedicated endpoint and executes the workflow immediately upon receiving the request.

**Mechanism**:
```
[Source System] ──HTTP POST──> [Webhook URL] ──> [Workflow Execution]
```

**Properties**:
- Latency: Near-zero (milliseconds from event to execution start)
- Coupling: Source must know the webhook URL
- Reliability: Depends on source system's retry behavior
- Ordering: No guarantee (concurrent requests may arrive out of order)
- Authentication: Must be secured (HMAC signature, API key, IP whitelist)

**When to use**:
- Real-time reactions required (new order processing, instant notifications)
- Source system supports webhook configuration
- Volume is manageable (not millions of events per minute)

**Hardening checklist**:
1. Validate webhook signature (HMAC-SHA256 with shared secret)
2. Respond with 200 within 5 seconds (process asynchronously if needed)
3. Implement idempotency (handle duplicate deliveries)
4. Log all received payloads for debugging
5. Set up health check endpoint monitoring
6. Configure alert for webhook endpoint downtime

**iPaaS implementation**:
- n8n: Webhook node (generates unique URL, supports GET/POST/PUT/DELETE)
- Zapier: Webhooks by Zapier trigger (Catch Hook, Catch Raw Hook)
- Make: Custom Webhook module (generates unique URL)

### Schedule Triggers (Time-Based, Periodic)

A schedule trigger activates at predefined time intervals or at specific times. The automation platform's scheduler fires the workflow without external stimulus.

**Mechanism**:
```
[Internal Clock] ──cron expression──> [Workflow Execution]
```

**Cron expression syntax** (minute hour day-of-month month day-of-week):
```
*/5 * * * *      Every 5 minutes
0 */2 * * *      Every 2 hours
0 9 * * 1-5      9:00 AM Monday through Friday
0 0 1 * *        Midnight on the 1st of every month
0 8,17 * * *     8:00 AM and 5:00 PM daily
```

**Properties**:
- Latency: Up to one interval (if event occurs just after a poll, wait until next)
- Coupling: None (no source system configuration required)
- Reliability: Platform-managed (highly reliable)
- Ordering: Sequential by nature (one execution per trigger fire)
- Idempotency: Must handle overlapping executions if previous run is still active

**When to use**:
- Batch processing (nightly data sync, hourly report generation)
- Polling for changes in systems without webhook support
- Periodic maintenance tasks (cleanup, health checks)
- Rate-limited operations that should run at controlled intervals

**Design considerations**:
- **Overlap prevention**: What happens if the previous execution is still running when the next trigger fires? Options: skip, queue, run in parallel.
- **Timezone handling**: Always specify timezone explicitly. UTC is recommended for server-side schedules. Local time for human-facing schedules.
- **Clock drift**: Distributed systems may have slight clock differences. Do not rely on exact-to-the-second timing.
- **Execution window**: For batch operations, define a maximum execution window. Alert if execution exceeds the window.

**iPaaS implementation**:
- n8n: Cron node or Schedule Trigger node (supports cron expressions and intervals)
- Zapier: Schedule by Zapier trigger (every N minutes/hours/days/weeks/months)
- Make: Scheduling settings on scenario (at regular intervals, once, specific dates)

### Event Triggers (Message-Based, Reactive)

An event trigger activates when a message is published to an event bus, message queue, or streaming platform that the automation platform subscribes to.

**Mechanism**:
```
[Source System] ──publish──> [Event Bus] ──subscribe──> [Workflow Execution]
```

**Properties**:
- Latency: Near-real-time (depends on event bus delivery guarantee)
- Coupling: Both systems coupled to event bus (but not to each other)
- Reliability: Depends on event bus guarantees (at-least-once typical)
- Ordering: Partition-level ordering (per Kafka partitions, per SQS FIFO)
- Scalability: Horizontal scaling through consumer groups

**When to use**:
- Microservice architectures with existing event infrastructure
- High-volume event processing
- When decoupling source and automation is critical
- When replay capability is needed

**iPaaS implementation**:
- n8n: AMQP Trigger, Kafka Trigger, Redis Trigger, SQS Trigger
- Zapier: Limited native support (typically via webhooks from event bus)
- Make: Limited native support (typically via webhooks from event bus)

### Poll Triggers (Pull-Based, Periodic Check)

A poll trigger periodically queries a source system for new or changed data. Unlike schedule triggers (which run at a time), poll triggers check for a specific condition.

**Mechanism**:
```
[Workflow] ──query──> [Source System] ──> [New data?]
                                              │
                                    ┌─────────┤
                                    yes       no
                                    │         │
                              [Process]   [Sleep until next poll]
```

**Properties**:
- Latency: Up to one polling interval
- Coupling: Low (standard API or database query)
- Reliability: High (automation controls the polling)
- Ordering: Controlled by query sorting
- State management: Must track "last seen" marker (timestamp, ID, cursor)

**Polling state management strategies**:

**Timestamp-based**: Record the timestamp of the last successfully processed record. On next poll, query for records modified after that timestamp.
```sql
SELECT * FROM orders WHERE updated_at > :last_poll_timestamp ORDER BY updated_at
```
Risk: Records modified at exactly the poll timestamp may be missed or duplicated.

**ID-based**: Record the last processed record ID. On next poll, query for records with ID greater than the last processed ID.
```sql
SELECT * FROM orders WHERE id > :last_processed_id ORDER BY id
```
Risk: Only works with sequential IDs. Does not capture updates to existing records.

**Cursor-based**: Use an opaque cursor provided by the source API. The cursor represents the position in the result set.
```
GET /api/orders?cursor=eyJsYXN0X2lkIjoxMjM0fQ==
```
Best practice: Use cursor-based pagination when the API supports it. It is the most reliable.

**Change token / ETag**: The source system provides a token that represents the current state. On next poll, include the token; the API returns only changes since that token.

**iPaaS implementation**:
- n8n: HTTP Request node on a schedule with state tracking via static data
- Zapier: Most Zapier triggers are poll-based (Zapier manages the polling state)
- Make: HTTP module on a schedule with data store for state

### Manual Triggers (Human-Initiated)

A manual trigger is activated by explicit human action: clicking a button, submitting a form, or sending a command.

**Mechanism**:
```
[Human Action] ──click/submit──> [Workflow Execution]
```

**Properties**:
- Latency: Zero (immediate on user action)
- Coupling: Requires UI or command interface
- Reliability: Depends on human remembering to trigger
- Volume: Low (human-limited)

**When to use**:
- Ad-hoc operations (run report, sync specific account, retry failed batch)
- Testing and debugging workflows
- Approval-gated processes (human decides when to proceed)
- Operations that should not run automatically (destructive operations)

---

## 2. Trigger Selection Framework

### Decision Matrix

```
                    Real-Time           Near-Real-Time        Batch
                    (< 1 second)        (1s - 5min)          (> 5min)
               ┌──────────────────┬──────────────────┬──────────────────┐
Source has      │                  │                  │                  │
webhook/event? │ Webhook Trigger   │ Event Trigger    │ Schedule Trigger │
YES            │ (instant push)   │ (event bus)      │ (time-based)     │
               ├──────────────────┼──────────────────┼──────────────────┤
Source has      │                  │                  │                  │
API only?      │ Poll Trigger     │ Poll Trigger     │ Schedule Trigger │
NO events      │ (high frequency) │ (medium freq)    │ (low frequency)  │
               ├──────────────────┼──────────────────┼──────────────────┤
No API?        │                  │                  │                  │
               │ File Watch /     │ File Watch /     │ File Watch /     │
               │ Database Trigger │ Database Trigger │ Database Trigger │
               └──────────────────┴──────────────────┴──────────────────┘
```

### Trigger Reliability Analysis

| Trigger Type | Failure Mode | Mitigation |
|-------------|-------------|------------|
| Webhook | Source fails to deliver | Source retry policy + dead letter + monitoring |
| Webhook | Platform downtime | Queue in front of webhook + replay capability |
| Schedule | Execution overlap | Overlap prevention (skip/queue) + locking |
| Schedule | Missed execution | Catch-up policy + execution log monitoring |
| Event | Event bus failure | Multi-AZ/region event bus + dead letter topic |
| Event | Consumer lag | Scaling consumers + lag monitoring + alerting |
| Poll | State management error | Idempotent processing + overlap tolerance |
| Poll | API rate limiting | Backoff + adaptive polling interval |
| Manual | Human forgets | Scheduled reminders + escalation automation |

---

## 3. Trigger Composition Patterns

### Multi-Trigger Workflow

A single workflow that can be started by multiple trigger types. The same processing logic executes regardless of how the workflow was initiated.

```
[Webhook: new order]  ──┐
                        │
[Schedule: hourly poll] ──┼──> [Normalize Input] ──> [Process Order]
                        │
[Manual: retry button] ──┘
```

**Implementation**: Each trigger normalizes its input into a common format before the shared processing logic.

### Trigger Chain (Cascading Triggers)

The completion of one workflow triggers another workflow. Creates a chain of automations.

```
[Trigger A] ──> [Workflow A] ──emit event──> [Trigger B] ──> [Workflow B]
```

**Design rules**:
- Avoid deep chains (> 3 levels) -- they become hard to debug
- Each workflow should be independently testable
- Use correlation IDs to trace execution across chains

### Conditional Trigger (Guard)

A trigger that fires only when specific conditions are met. Combines trigger with immediate filter.

```
[Webhook received]
    │
    ▼
[Guard: Is payload valid? Is sender authorized? Is data new?]
    │
    ├── Pass ──> [Execute Workflow]
    │
    └── Fail ──> [Log and Discard]
```

### Debounced Trigger

Delays processing until a quiet period occurs. If multiple triggers fire in rapid succession, only the last one executes (or all are batched).

```
[Event 1] ──> [Reset Timer: 5s]
[Event 2] ──> [Reset Timer: 5s]
[Event 3] ──> [Reset Timer: 5s]
                    │
              [5s passes with no new events]
                    │
                    ▼
              [Execute with Event 3 data]
              (or batch all 3 events)
```

**Use case**: CRM record updates where multiple fields are saved in rapid succession. Process once after all fields are updated, not per-field.

---

## 4. Trigger Security

### Webhook Authentication Methods

**HMAC Signature Verification**:
The source system signs the payload using a shared secret. The automation platform verifies the signature before processing.

```
Verification:
1. Receive: headers["X-Signature"] = "sha256=abc123..."
2. Compute: HMAC-SHA256(shared_secret, request_body)
3. Compare: computed_signature == received_signature
4. If match: process. If mismatch: reject with 401.
```

**API Key in Header**:
Source includes a secret API key in a request header. Simple but less secure than HMAC (key is transmitted rather than used to sign).

**IP Whitelist**:
Only accept webhook requests from known source IP addresses. Effective for well-known services with published IP ranges.

**OAuth Bearer Token**:
Source authenticates with an OAuth token. The automation platform validates the token before processing. Most complex but most standard.

### Trigger-Level Authorization

Beyond authentication, validate that the triggering entity has permission to initiate the workflow:

```
[Webhook Received]
    │
    ├── [1. Verify Signature] (is the request authentic?)
    │
    ├── [2. Check Permissions] (is the sender authorized for this action?)
    │
    ├── [3. Validate Payload] (is the data well-formed and within expected ranges?)
    │
    └── [4. Deduplicate] (have we already processed this event?)
         │
         ▼
    [Execute Workflow]
```

---

## 5. Trigger Monitoring and Alerting

### Key Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Trigger fire rate | How often the trigger activates | Deviates > 2 standard deviations from baseline |
| Execution start latency | Time from trigger to workflow start | > 30 seconds for webhook triggers |
| Missed executions | Scheduled triggers that did not fire | Any occurrence |
| Duplicate triggers | Same event triggering multiple executions | > 1% of total triggers |
| Authentication failures | Invalid webhook signatures or API keys | > 5 in 5 minutes (possible attack) |
| Payload validation failures | Malformed trigger data | > 10% of total triggers |

### Dead Trigger Detection

A "dead trigger" is one that has stopped firing without explanation. Causes: source system configuration changed, webhook URL expired, polling credential expired, source system decommissioned.

**Detection**: Alert when a trigger has not fired within 3x its expected interval. For a trigger that fires hourly, alert after 3 hours of silence.

**Recovery**:
1. Check source system health
2. Verify trigger configuration (URL, credentials, schedule)
3. Re-register webhooks if expired
4. Refresh authentication tokens
5. Document root cause and prevention

---

## 6. Trigger Design Checklist

For every trigger design, verify:

- [ ] **Type selected**: Appropriate trigger type chosen based on latency needs and source capabilities
- [ ] **Authentication**: Webhook triggers have signature verification or equivalent
- [ ] **Idempotency**: Duplicate trigger events are handled gracefully
- [ ] **Payload validation**: Input data is validated before processing begins
- [ ] **Error response**: Trigger endpoint returns appropriate HTTP status codes
- [ ] **Timeout**: Processing starts within acceptable latency
- [ ] **Monitoring**: Trigger fire rate and health are monitored
- [ ] **Dead trigger alert**: Alert configured for unexpected trigger silence
- [ ] **Documentation**: Trigger purpose, source, expected payload documented
- [ ] **Testing**: Trigger tested with valid, invalid, and edge-case payloads
- [ ] **Overlap handling**: For schedule triggers, overlap behavior is defined
- [ ] **State management**: For poll triggers, state tracking is reliable and resumable

---

**The trigger is the foundation. A robust workflow on a fragile trigger is a failure waiting to happen.**

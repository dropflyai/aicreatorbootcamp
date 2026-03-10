# Serverless Architecture — Lambda, Cloud Functions, and Event-Driven Compute

## Overview

Serverless computing represents a fundamental shift in how applications consume infrastructure. The developer writes functions; the cloud provider manages servers, scaling, patching, and availability. AWS Lambda, Google Cloud Functions, and Azure Functions abstract the compute layer entirely, billing only for actual execution time measured in milliseconds. This module codifies serverless architecture principles, event-driven design, cold start optimization, concurrency management, and orchestration patterns with AWS Step Functions.

The serverless axiom: you do not pay for idle. But you also do not control the runtime — understanding the platform's constraints is the difference between a well-architected serverless application and an unreliable, expensive one.

---

## AWS Lambda — Deep Dive

### Lambda Execution Model

```
Event Source → Lambda Service → Execution Environment → Function Code → Response
  (API GW,      (routing,         (container,           (handler fn,     (sync or
   S3, SQS,      concurrency,      runtime init,         business logic,   async
   EventBridge,   throttling)       cold/warm start)      SDK calls)       result)
   DynamoDB)
```

### Lambda Execution Lifecycle

**Cold Start:** A new execution environment is provisioned when no warm environment is available.
1. Download function code and layers from S3
2. Create new execution environment (micro-VM via Firecracker)
3. Initialize runtime (Node.js, Python, Java, etc.)
4. Execute initialization code (outside handler — global scope, SDK initialization)
5. Execute handler function
6. Return response

**Warm Start:** A previously used execution environment is reused.
1. Execute handler function (skip steps 1-4)
2. Return response

**Key implication:** Code in the global scope (outside the handler) runs once per cold start and is reused across invocations. Database connections, SDK clients, and configuration should be initialized in global scope for reuse.

### Cold Start Optimization

| Technique | Impact | Implementation |
|-----------|--------|---------------|
| Provisioned Concurrency | Eliminates cold starts entirely | Pre-warm N environments (costs for idle time) |
| Smaller deployment package | Reduces download time | Tree-shaking, exclude dev dependencies, use layers for shared code |
| Language choice | Java/C# cold starts 5-10x slower than Node.js/Python | Choose Node.js or Python for latency-sensitive functions |
| Lambda SnapStart (Java) | Reduces Java cold start from ~5s to ~200ms | Snapshot and restore of initialized JVM state |
| Avoid VPC unless required | VPC ENI attachment adds 1-2s to cold start (improved with Hyperplane) | Only place Lambda in VPC when accessing VPC resources |
| Lazy initialization | Defer expensive initialization until first use | Initialize DB connections on first invocation, not global scope |
| ARM64 (Graviton2) | 20% better price-performance, often faster cold starts | Set architecture to arm64 in function configuration |

### Cold Start Benchmarks (Approximate)

| Runtime | Cold Start (no VPC) | Cold Start (VPC) | Warm Invocation |
|---------|--------------------|--------------------|-----------------|
| Node.js 20 | 100-300ms | 200-500ms | 1-5ms |
| Python 3.12 | 100-300ms | 200-500ms | 1-5ms |
| Java 21 | 3-8 seconds | 4-10 seconds | 1-10ms |
| Java 21 (SnapStart) | 100-300ms | 200-500ms | 1-10ms |
| .NET 8 | 200-500ms | 300-700ms | 1-5ms |
| Go (custom runtime) | 50-100ms | 150-300ms | <1ms |
| Rust (custom runtime) | 10-50ms | 100-200ms | <1ms |

### Concurrency Model

**Reserved concurrency:** Guarantees a set number of concurrent executions for a function. Prevents other functions from consuming this capacity. Also acts as a throttle (hard limit).

**Provisioned concurrency:** Pre-initializes a set number of execution environments. Eliminates cold starts but costs money for idle environments. Use for latency-sensitive, predictable workloads.

**Unreserved concurrency:** Default pool shared across all functions in the account. Default account limit: 1,000 concurrent executions (can be increased).

**Burst concurrency:** Lambda can burst to 500-3,000 concurrent environments instantly (region-dependent), then scales at 500 additional environments per minute.

```
Concurrency Architecture:
Account Limit: 1000 concurrent executions
├── Function A: Reserved = 100 (guaranteed, capped at 100)
├── Function B: Reserved = 50 (guaranteed, capped at 50)
├── Function C: Provisioned = 20 (20 warm + can scale unreserved)
└── Unreserved Pool: 850 (shared by all non-reserved functions)
```

---

## Event-Driven Architecture

### Event Sources

| Source | Pattern | Invocation Type | Use Case |
|--------|---------|----------------|----------|
| API Gateway | Request/Response | Synchronous | REST/GraphQL APIs |
| ALB | Request/Response | Synchronous | HTTP microservices |
| S3 | Event notification | Asynchronous | File processing, ETL |
| SQS | Poll-based | Asynchronous | Queue processing, decoupling |
| SNS | Push | Asynchronous | Fan-out notifications |
| EventBridge | Event bus | Asynchronous | Event-driven microservices |
| DynamoDB Streams | CDC | Asynchronous | Change data capture, replication |
| Kinesis | Stream processing | Asynchronous | Real-time data processing |
| CloudWatch Events | Scheduled | Asynchronous | Cron jobs, maintenance tasks |
| Cognito | Trigger | Synchronous | Auth customization |

### Synchronous vs Asynchronous Invocation

**Synchronous:** Caller waits for the response. Lambda executes, returns result. If Lambda fails, the caller gets an error immediately. Retry is the caller's responsibility.

**Asynchronous:** Caller gets immediate acknowledgment (202). Lambda manages retries (2 automatic retries). Failed events can be sent to a Dead Letter Queue (DLQ) or EventBridge for further processing. Lambda handles backpressure.

**Event Source Mapping (Poll-based):** Lambda polls the event source (SQS, Kinesis, DynamoDB Streams). Lambda manages the polling, batching, and retry logic. Failed batches can be retried or sent to a DLQ.

### EventBridge — Event Bus Architecture

EventBridge is the preferred event routing service for serverless architectures:

```
Producers → EventBridge Bus → Rules (filtering) → Targets (consumers)
  Microservice A    Default bus    Pattern matching    Lambda functions
  Microservice B    Custom bus     Content filtering   SQS queues
  SaaS integration  Partner bus    Transformation      Step Functions
  Scheduled events                                      API destinations
```

**Event Schema:**
```json
{
  "source": "com.myapp.orders",
  "detail-type": "OrderCreated",
  "detail": {
    "orderId": "ord-123",
    "customerId": "cust-456",
    "total": 99.99,
    "items": [{"sku": "PROD-001", "quantity": 2}]
  },
  "time": "2024-01-15T10:30:00Z"
}
```

---

## AWS Step Functions — Serverless Orchestration

### State Machine Architecture

Step Functions coordinate multiple Lambda functions and AWS services into workflows using Amazon States Language (ASL):

**State Types:**
| State | Purpose |
|-------|---------|
| Task | Execute a Lambda function, API call, or AWS service action |
| Choice | Branch logic based on input data |
| Parallel | Execute multiple branches concurrently |
| Map | Iterate over a collection, processing each item |
| Wait | Pause execution for a specified time or until a timestamp |
| Pass | Transform input/output without performing work |
| Succeed/Fail | Terminal states |

### Step Functions vs Direct Lambda Invocation

| Scenario | Use Step Functions | Use Direct Invocation |
|----------|-------------------|----------------------|
| Multi-step workflow with error handling | Yes | No |
| Long-running process (>15 min) | Yes (Express or Standard) | No (Lambda 15min limit) |
| Fan-out/fan-in pattern | Yes (Map state) | Complex |
| Human approval workflow | Yes (callback pattern) | No |
| Simple API handler | No (overhead) | Yes |
| Real-time, low-latency | Express Workflows | Yes |

### Standard vs Express Workflows

| Feature | Standard | Express |
|---------|----------|---------|
| Max duration | 1 year | 5 minutes |
| Execution model | Exactly-once | At-least-once (sync) / At-most-once (async) |
| Pricing | Per state transition | Per execution + duration |
| Best for | Long-running, audit trails | High-volume, low-latency |
| Max executions | 25,000 start/sec (soft limit) | 100,000 start/sec |

---

## Google Cloud Functions and Azure Functions

### Google Cloud Functions

- First-gen: HTTP and event-triggered functions, single purpose
- Second-gen: Built on Cloud Run, longer timeout (60min), concurrency per instance, event-driven via Eventarc
- Cloud Run: Container-based serverless (more flexible than functions, same scaling model)

### Azure Functions

- Consumption plan: True serverless (pay per execution), cold starts
- Premium plan: Pre-warmed instances, VNet integration, no cold starts
- Dedicated plan: Functions running on App Service plan (not truly serverless)
- Durable Functions: Orchestration framework (equivalent to Step Functions)

### Multi-Cloud Serverless Comparison

| Feature | AWS Lambda | Google Cloud Functions | Azure Functions |
|---------|-----------|----------------------|----------------|
| Max timeout | 15 minutes | 60 minutes (2nd gen) | 10 minutes (Consumption) |
| Max memory | 10 GB | 32 GB (2nd gen) | 1.5 GB (Consumption) |
| Languages | Node, Python, Java, .NET, Go, Ruby, Rust | Node, Python, Java, .NET, Go, Ruby, PHP | Node, Python, Java, .NET, PowerShell |
| Orchestration | Step Functions | Workflows | Durable Functions |
| Container support | Container images | Cloud Run | Custom handlers |
| Edge compute | Lambda@Edge, CloudFront Functions | N/A (use Cloud CDN) | N/A |

---

## Serverless Best Practices

### Function Design Principles

1. **Single responsibility:** Each function does one thing well
2. **Stateless:** No local state between invocations (use DynamoDB, S3, ElastiCache)
3. **Idempotent:** Same input produces same result regardless of retry count
4. **Small and fast:** Minimize deployment package, minimize execution time
5. **Timeout configuration:** Set timeout slightly above expected maximum duration (not the maximum 15 minutes)
6. **Memory configuration:** More memory = more CPU. Profile to find the optimal memory/cost ratio

### Error Handling and Retry Strategy

| Pattern | Implementation |
|---------|---------------|
| Idempotency | Use idempotency keys (request ID) to prevent duplicate processing |
| Dead Letter Queue | Configure DLQ for failed async invocations and SQS consumers |
| Circuit Breaker | Use Step Functions Catch/Retry or implement in code |
| Exponential Backoff | Built into SQS visibility timeout and Step Functions retry |
| Partial Batch Failure | Report partial failures in SQS batch processing (ReportBatchItemFailures) |

### Lambda Limits to Know

| Limit | Value | Notes |
|-------|-------|-------|
| Execution timeout | 15 minutes | Use Step Functions for longer workflows |
| Deployment package | 50 MB (zipped), 250 MB (unzipped) | Use layers or container images for larger |
| Memory | 128 MB - 10,240 MB | CPU scales proportionally |
| Concurrent executions | 1,000 (default, regional) | Request increase via AWS support |
| /tmp storage | 512 MB - 10,240 MB | Ephemeral, per execution environment |
| Environment variables | 4 KB total | Use Parameter Store/Secrets Manager for more |
| Payload size | 6 MB (sync), 256 KB (async) | Use S3 for larger payloads |

---

## Cross-References

- `03_serverless/serverless_patterns.md` — Architecture patterns for serverless
- `03_serverless/serverless_operations.md` — Observability and operations
- `06_reliability/site_reliability.md` — SRE principles for serverless
- `07_cost/cost_optimization.md` — Serverless cost optimization
- `08_security/cloud_iam.md` — Lambda security and IAM roles

# n8n: Self-Hosted Workflow Automation Platform

## Overview

n8n is an open-source, self-hosted workflow automation platform that connects services, transforms data, and orchestrates complex business processes. Its distinguishing features are full data sovereignty (your data never leaves your infrastructure), a visual workflow editor, and the ability to write custom code within any workflow step. This module covers n8n architecture, node types, expression system, sub-workflows, error handling, and credential management for production deployments.

---

## 1. Architecture

### 1.1 Core Components

**Workflow Engine**: The execution runtime that processes workflow triggers, executes nodes sequentially or in parallel, manages data passing between nodes, and handles errors. Built on Node.js with TypeScript.

**Editor UI**: Browser-based visual editor for building and testing workflows. Supports drag-and-drop node placement, connection drawing, real-time execution debugging, and workflow versioning.

**Database Backend**: Stores workflow definitions, execution logs, credentials (encrypted), and configuration. Supports PostgreSQL (recommended for production), MySQL, MariaDB, and SQLite (development only).

**Queue System**: For production deployments, n8n uses a Redis-backed queue (Bull) to manage workflow execution, enabling horizontal scaling with multiple worker instances.

### 1.2 Deployment Architecture (Production)

```
                    ┌──────────────┐
                    │   Reverse    │
                    │   Proxy      │
                    │  (nginx)     │
                    └──────┬───────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        ┌─────┴─────┐           ┌──────┴──────┐
        │  n8n Main │           │  n8n Worker  │
        │ (webhook  │           │  (execution) │
        │  receiver)│           │              │
        └─────┬─────┘           └──────┬───────┘
              │                        │
              └────────┬───────────────┘
                       │
              ┌────────┴────────┐
              │                 │
        ┌─────┴─────┐   ┌─────┴─────┐
        │ PostgreSQL │   │   Redis   │
        │            │   │  (queue)  │
        └────────────┘   └───────────┘
```

### 1.3 Scaling Strategy

**Vertical Scaling**: Increase CPU and memory for the main instance. Effective up to ~100 concurrent workflow executions.

**Horizontal Scaling (Queue Mode)**: Separate the webhook receiver (main instance) from execution (worker instances). The main instance receives triggers and enqueues jobs. Workers pull jobs from Redis and execute them. Scale workers independently based on load.

**Worker Configuration**:
- Set `EXECUTIONS_MODE=queue` on all instances
- Main instance: `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`
- Workers: Same Redis configuration plus `GENERIC_TIMEZONE` matching main

---

## 2. Node Types and Categories

### 2.1 Trigger Nodes

Trigger nodes start workflow execution:

| Trigger Type | Node | Use Case |
|-------------|------|----------|
| Webhook | Webhook | Receive HTTP requests from external services |
| Schedule | Schedule Trigger | Run workflows on a cron schedule |
| Polling | Various (e.g., Gmail Trigger) | Check for new data at intervals |
| Event | Various (e.g., Stripe Trigger) | React to external events via webhooks |
| Manual | Manual Trigger | Testing and ad-hoc execution |

### 2.2 Action Nodes

Action nodes perform operations:

| Category | Examples | Count |
|----------|----------|-------|
| Communication | Slack, Email, Teams, Discord, Telegram | 15+ |
| CRM | HubSpot, Salesforce, Pipedrive | 10+ |
| Database | PostgreSQL, MySQL, MongoDB, Redis | 8+ |
| Cloud | AWS, GCP, Azure services | 20+ |
| AI | OpenAI, Anthropic, Google AI | 10+ |
| File | Google Drive, Dropbox, S3 | 8+ |
| Developer | HTTP Request, Code, SSH, Git | 10+ |

### 2.3 Flow Control Nodes

| Node | Purpose | Key Configuration |
|------|---------|-------------------|
| IF | Conditional branching | Conditions on any data field |
| Switch | Multi-branch routing | Multiple conditions, fallback branch |
| Merge | Combine data from branches | Modes: append, combine by position, combine by field |
| Loop Over Items | Process items individually | Batch size, parallel execution |
| Wait | Pause execution | Timer, webhook resume, approval |
| Execute Workflow | Call sub-workflows | Pass parameters, return results |

### 2.4 Transformation Nodes

| Node | Purpose |
|------|---------|
| Set | Create or modify data fields |
| Code | Write JavaScript/Python for custom logic |
| Item Lists | Split, aggregate, sort, limit items |
| Date & Time | Parse, format, calculate dates |
| Crypto | Hash, encrypt, sign data |
| HTML Extract | Parse HTML and extract data |
| XML | Parse XML to JSON and back |

---

## 3. Expression System

### 3.1 Expression Syntax

n8n expressions use `{{ }}` delimiters and support JavaScript within expressions:

**Referencing Previous Nodes**: `{{ $node["NodeName"].json.fieldName }}`
**Current Item Data**: `{{ $json.fieldName }}`
**Binary Data**: `{{ $binary.data.fileName }}`
**Environment Variables**: `{{ $env.VARIABLE_NAME }}`
**Workflow Variables**: `{{ $vars.variableName }}`

### 3.2 Built-in Functions

**String Functions**: `$json.name.toUpperCase()`, `$json.text.slice(0, 100)`, `$json.email.includes("@")`

**Date Functions**: `$today.format('yyyy-MM-dd')`, `$now.minus(7, 'days')`, `DateTime.fromISO($json.date)`

**Array Functions**: `$json.items.length`, `$json.items.filter(i => i.status === 'active')`, `$json.items.map(i => i.name)`

**Utility Functions**: `$if($json.amount > 100, 'high', 'low')`, `$json.value ?? 'default'`

### 3.3 Expression Best Practices

- Use `??` (nullish coalescing) to handle missing data gracefully
- Avoid complex logic in expressions; use the Code node instead
- Test expressions with the expression editor's evaluation preview
- Document complex expressions with comments in the workflow notes
- Use workflow variables for values reused across multiple nodes

---

## 4. Sub-Workflows

### 4.1 When to Use Sub-Workflows

- Reusable logic shared across multiple workflows (DRY principle)
- Complex workflows that benefit from modular decomposition
- Workflows that need to be tested and versioned independently
- Error isolation: a failure in a sub-workflow does not crash the parent

### 4.2 Implementation

**Parent Workflow**: Uses the "Execute Workflow" node to call the sub-workflow, passing input data as parameters.

**Sub-Workflow**: Starts with a "Workflow Trigger" node (not a webhook or schedule trigger). Receives input parameters and returns output data.

**Data Passing**: Input data is sent as JSON. Output data from the sub-workflow's last node is returned to the parent.

### 4.3 Sub-Workflow Patterns

**Shared Authentication**: A sub-workflow that handles OAuth token refresh. Multiple workflows call this instead of each managing tokens independently.

**Standardized Processing**: A sub-workflow for data validation and normalization. Called by all workflows that ingest external data.

**Error Notification**: A sub-workflow that formats and sends error notifications. Called by error handlers across all workflows.

---

## 5. Error Handling

### 5.1 Error Handling Strategies

**Node-Level Retry**: Configure individual nodes to retry on failure.
- Max retries: 3
- Wait between retries: exponential backoff (1s, 2s, 4s)
- Retry on specific error codes only

**Workflow-Level Error Handler**: Attach an error workflow that executes when any node in the main workflow fails. The error workflow receives the error details, failed node information, and execution context.

**Try-Catch Pattern**: Use the "Continue On Error" setting on nodes that may fail. The workflow continues execution, and downstream nodes check whether the previous node succeeded or failed.

### 5.2 Error Handling Configuration

```
Workflow Settings:
  Error Workflow: "Error Handler - Notify Team"
  Timeout: 300 seconds (per workflow execution)
  Save Execution Data: Always (for debugging)

Per-Node Settings:
  Retry On Fail: true
  Max Retries: 3
  Wait Between Retries: 1000ms (first), exponential
  Continue On Error: false (stop workflow on failure)
```

### 5.3 Dead Letter Queue Pattern

For workflows processing items from a queue:
1. Attempt processing with retries
2. If all retries fail, move the item to a dead letter queue (separate database table or queue)
3. A separate monitoring workflow periodically reviews the dead letter queue
4. Alert the team when the dead letter queue exceeds a threshold

---

## 6. Credential Management

### 6.1 Credential Storage

n8n encrypts credentials at rest using AES-256 with a key derived from `N8N_ENCRYPTION_KEY`. This key must be set before first use and never changed (changing it invalidates all stored credentials).

### 6.2 Credential Types

- **API Key**: Simple key-based authentication
- **OAuth2**: Full OAuth2 flow with automatic token refresh
- **Header Auth**: Custom headers for authentication
- **Basic Auth**: Username/password
- **Custom**: For services with non-standard authentication

### 6.3 Credential Security Best Practices

- Set `N8N_ENCRYPTION_KEY` to a strong random string (32+ characters)
- Back up the encryption key separately from the database
- Use environment variables for sensitive values instead of hardcoding in workflows
- Restrict credential sharing to users who need access
- Rotate API keys and OAuth tokens on a schedule
- Audit credential usage through execution logs

---

## 7. Production Best Practices

### 7.1 Workflow Organization

- Use consistent naming: `[Domain] - [Action] - [Version]` (e.g., "CRM - Sync Contacts - v2")
- Group related workflows with tags
- Document each workflow's purpose in the workflow notes
- Use sticky notes for complex logic explanation within workflows
- Version workflows before making changes (duplicate, then modify)

### 7.2 Performance Optimization

- Use "Execute Once" mode for operations that process all items at once
- Batch API calls using the "Split In Batches" node to respect rate limits
- Minimize data passed between nodes (remove unnecessary fields with Set node)
- Use the Code node for complex transformations instead of chaining multiple simple nodes
- Set appropriate timeouts to prevent runaway executions

### 7.3 Monitoring

- Configure execution log retention (retain at least 30 days for debugging)
- Set up alerts for workflow failures using the Error Workflow feature
- Monitor execution duration trends for performance regression
- Track webhook response times
- Review execution logs weekly for intermittent failures

---

## 8. Key References

- n8n Documentation -- https://docs.n8n.io
- n8n Community Forum -- https://community.n8n.io
- n8n GitHub Repository -- https://github.com/n8n-io/n8n
- n8n Workflow Templates -- https://n8n.io/workflows

---

*This module covers n8n in depth. See `zapier.md` and `make.md` for alternative platforms and `comparison.md` for platform selection guidance.*

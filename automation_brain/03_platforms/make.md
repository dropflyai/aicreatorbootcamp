# Make (formerly Integromat): Visual Automation Platform

## Overview

Make is a visual automation platform distinguished by its powerful data transformation capabilities, visual scenario builder, and granular control over execution flow. While Zapier excels at breadth of integrations and simplicity, Make excels at complex data transformation, conditional logic, and scenarios requiring precise control over data flow. This module covers Make's architecture, scenario design, modules, webhooks, data stores, and error handling for production deployments.

---

## 1. Core Concepts

### 1.1 Terminology

**Scenario**: The equivalent of a Zapier Zap or n8n workflow. A scenario defines the trigger, processing logic, and actions that execute automatically.

**Module**: A single step in a scenario. Modules are categorized as triggers, actions, searches, aggregators, iterators, and transformers.

**Operation**: A single execution of a module. Make bills based on operations consumed.

**Connection**: An authenticated link to an external service. Shared across scenarios.

**Bundle**: A unit of data processed through a scenario. When a trigger returns 10 items, it creates 10 bundles, each processed independently through the scenario.

### 1.2 Execution Model

Make processes bundles sequentially through the scenario path. When a trigger fires with multiple bundles:
1. Bundle 1 flows through all modules in the scenario
2. Bundle 2 flows through all modules
3. ... and so on

This sequential-per-bundle model ensures data consistency but means processing time scales linearly with bundle count.

### 1.3 Visual Builder Advantages

Make's visual builder represents data flow as a flowchart:
- Modules are circles connected by lines
- Data flows left to right
- Branching is visually represented as diverging paths (routers)
- Error handlers are visually attached to specific modules
- Data mapping is configured inline with visual path selection

---

## 2. Scenario Design

### 2.1 Trigger Types

| Type | Description | Latency | Use Case |
|------|-------------|---------|----------|
| Instant (Webhook) | Receives HTTP requests | < 5s | Real-time event processing |
| Polling | Checks for new data on schedule | 1-15 min | When webhooks unavailable |
| Email | Processes incoming emails | Polling interval | Email-triggered workflows |
| Scheduled | Runs at specified times | Exact | Periodic batch processing |

### 2.2 Module Categories

**Action Modules**: Perform CRUD operations on external services. Examples: Create a Slack message, Update a Salesforce record, Upload a file to Google Drive.

**Search Modules**: Query external services and return results. Examples: Find contacts in HubSpot matching criteria, Search for files in Dropbox.

**Aggregator Modules**: Combine multiple bundles into a single bundle. Essential for: creating summary records, building arrays from individual items, counting or summing values across bundles.

**Iterator Modules**: Split a single bundle containing an array into multiple bundles (one per array element). The inverse of aggregator.

**Router Modules**: Create conditional branching paths. Each route has a filter condition. Bundles flow down the first matching route (or all matching routes, depending on configuration).

### 2.3 Data Mapping

Make provides a powerful inline data mapper:
- Click any field to see available data from previous modules
- Use the formula editor for transformations
- Built-in functions: text, math, date, array, and conversion functions
- Map arrays to arrays using iterator + aggregator pattern
- Reference data from any preceding module (not just the immediately previous one)

---

## 3. Webhooks

### 3.1 Custom Webhooks

Make provides two webhook types:

**Simple Webhook**: Receives any HTTP request. No data structure definition required. Flexible but less efficient.

**Custom Webhook with Data Structure**: Define the expected request schema. Make validates incoming data against the schema and provides typed field selection in downstream modules. Recommended for production.

### 3.2 Webhook Response

**Immediate Response**: The scenario returns an HTTP response to the webhook caller immediately after receiving the request. Processing continues asynchronously.

**Deferred Response**: The scenario processes the request and returns a response after all modules complete. Use when the caller needs the processing result.

### 3.3 Webhook Security

- Use webhook verification (shared secret or signature validation)
- Restrict allowed IP addresses when possible
- Validate incoming data structure and reject malformed requests
- Implement rate limiting at the infrastructure level
- Monitor webhook invocation patterns for anomalies

---

## 4. Data Stores

### 4.1 What Are Data Stores

Data stores are Make's built-in key-value storage. They provide persistent state that survives across scenario executions, enabling stateful workflows without external databases.

### 4.2 Use Cases

| Use Case | Description |
|----------|-------------|
| Deduplication | Track processed item IDs to prevent duplicate processing |
| State Management | Store workflow state (last sync timestamp, processing status) |
| Lookup Tables | Store reference data (mapping tables, configuration values) |
| Counters | Track counts across executions (daily API calls, processed items) |
| Caching | Store API responses to reduce external calls |

### 4.3 Data Store Operations

| Operation | Description |
|-----------|-------------|
| Add/Replace | Insert or update a record by key |
| Get | Retrieve a record by key |
| Search | Find records matching criteria |
| Delete | Remove a record by key |
| Count | Return the number of records |
| Check Existence | Verify if a key exists |

### 4.4 Data Store Limitations

- Maximum 1,000 records per data store (varies by plan)
- Not designed for large datasets (use external databases for > 1,000 records)
- No complex querying (use external databases for relational queries)
- Limited data types (string, number, boolean, date)
- No automatic backup (export periodically for safety)

---

## 5. Error Handling

### 5.1 Error Handler Types

Make provides four error handler types, each serving a different purpose:

**Resume**: Catch the error, provide substitute output data, and continue the scenario. Use when you have a reasonable default value.

**Commit**: Save all completed operations up to the error point, stop execution. Use when partial completion is acceptable.

**Rollback**: Undo all operations performed in this execution, stop execution. Use when all-or-nothing consistency is required.

**Break**: Move the failed bundle to the incomplete executions queue for later retry. Use when transient failures are expected.

### 5.2 Error Handler Configuration

```
Module: "Create Salesforce Record"
  |
  ├── Success Path: Continue to next module
  |
  └── Error Handler (Break):
        Max retries: 3
        Retry interval: 60 seconds
        On final failure: Notify team via Slack
```

### 5.3 Incomplete Executions

When the Break error handler is used, failed executions move to the "Incomplete Executions" queue:
- View failed executions with full error details
- Manually retry individual executions
- Set up automatic retry (configurable interval and max retries)
- Monitor incomplete execution count for operational awareness

### 5.4 Error Handling Best Practices

- Always attach error handlers to modules that call external APIs
- Use Break handlers for transient failures (API timeouts, rate limits)
- Use Resume handlers when you have sensible default values
- Log all errors to an external monitoring system (Datadog, Slack channel)
- Set up alerts when incomplete executions exceed a threshold

---

## 6. Advanced Patterns

### 6.1 Router Pattern (Multi-Path Processing)

```
Trigger
    |
    v
Router
    |
    ├── Route 1 (filter: type = "order"): Process order → Update inventory → Send confirmation
    |
    ├── Route 2 (filter: type = "return"): Process return → Refund → Send notification
    |
    └── Route 3 (fallback): Log unknown type → Alert team
```

### 6.2 Iterator + Aggregator Pattern

For processing arrays within bundles:
```
Trigger (returns order with line items array)
    |
    v
Iterator (split line items into individual bundles)
    |
    v
Module: Look up product price for each item
    |
    v
Module: Calculate tax for each item
    |
    v
Aggregator (combine back into single bundle with processed items)
    |
    v
Module: Create invoice with all processed line items
```

### 6.3 Parallel Processing

Make's router can execute multiple routes simultaneously for the same bundle:
```
Trigger: New Customer Signup
    |
    v
Router (all routes execute)
    |
    ├── Route 1: Create CRM record
    ├── Route 2: Add to email list
    ├── Route 3: Send welcome email
    └── Route 4: Notify sales team
```

### 6.4 Pagination Pattern

For APIs that return paginated results:
```
Scenario 1 (scheduled):
    |
    v
    HTTP Module: GET /api/items?page=1
    |
    v
    Store: Save total_pages to data store
    |
    v
    Process page 1 items
    |
    v
    If more pages: Call Scenario 2 with page=2

Scenario 2 (webhook trigger):
    |
    v
    HTTP Module: GET /api/items?page={{page}}
    |
    v
    Process items
    |
    v
    If more pages: Call self with page={{page+1}}
```

---

## 7. Production Optimization

### 7.1 Operation Optimization

Operations drive cost. Optimize by:
- Use search modules with specific filters instead of retrieving all records
- Aggregate bundles before actions to reduce module executions
- Use data stores for caching instead of making repeated API calls
- Set appropriate scheduling intervals (do not poll more frequently than needed)
- Use filters early to skip unnecessary processing

### 7.2 Performance Optimization

- Minimize the number of modules in scenarios (merge where possible)
- Use the JSON module to combine multiple API calls into batch requests
- Set timeout limits on HTTP modules to prevent hanging
- Use sleep modules to respect API rate limits (prevent 429 errors)

### 7.3 Monitoring

- Review scenario logs regularly for intermittent errors
- Monitor operation consumption against plan limits
- Track scenario execution duration for performance regression
- Set up external monitoring for critical scenarios (ping on completion)
- Review incomplete executions queue daily

---

## 8. Key References

- Make Documentation -- https://www.make.com/en/help
- Make Community -- https://www.make.com/en/community
- Make API Reference -- https://www.make.com/en/api-documentation
- Make Academy -- https://academy.make.com

---

*This module covers Make in depth. See `n8n.md` and `zapier.md` for alternative platforms and `comparison.md` for platform selection guidance.*

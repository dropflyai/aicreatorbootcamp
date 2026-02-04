# Data Sync Patterns: Real-Time, Batch, Bidirectional, and Conflict Resolution

## Overview

Data synchronization ensures that information remains consistent across multiple systems. As organizations adopt more specialized SaaS tools, each containing a partial view of business data, keeping these systems in sync becomes a critical automation challenge. This module covers the fundamental sync patterns -- real-time vs. batch, unidirectional vs. bidirectional -- along with conflict resolution strategies and change data capture techniques.

---

## 1. Sync Pattern Selection

### 1.1 Decision Framework

| Factor | Real-Time Sync | Batch Sync |
|--------|---------------|------------|
| Data freshness requirement | < 5 minutes | Hours to daily acceptable |
| Volume | Low-medium (< 1K events/hour) | Any (batch handles high volume efficiently) |
| Complexity | Lower per-event | Higher per-batch (pagination, dedup) |
| Cost | Higher (always-on infrastructure) | Lower (scheduled execution) |
| Error recovery | Per-event retry | Full batch retry or incremental |
| Infrastructure | Webhook receivers, queue processing | Scheduled job infrastructure |

### 1.2 Pattern Categories

**Unidirectional (Source -> Target)**: Data flows from one system to another. Source is authoritative. Changes in target are overwritten by source. Simplest pattern.

**Bidirectional**: Data flows both ways between two systems. Both systems can modify the same records. Requires conflict resolution. Most complex pattern.

**Hub-and-Spoke**: A central system (hub) syncs with multiple peripheral systems (spokes). All data flows through the hub. Simplifies multi-system sync.

**Event-Driven**: Systems publish change events. Interested systems subscribe and process events. Decoupled architecture.

---

## 2. Real-Time Sync

### 2.1 Architecture

```
System A                    Middleware                   System B
    |                          |                            |
    |-- Change Event --------->|                            |
    |                          |-- Transform Data --------->|
    |                          |                            |
    |                          |<-- Acknowledgment ---------|
    |<-- Confirmation ---------|                            |
```

### 2.2 Implementation with Webhooks

1. Configure System A to send webhooks on data changes
2. Middleware receives webhook, validates signature
3. Middleware transforms data to System B's format
4. Middleware calls System B's API to create/update record
5. Middleware stores sync log (source ID, target ID, timestamp)
6. On failure: retry with backoff, then dead letter queue

### 2.3 Real-Time Sync Challenges

**Ordering**: Events may arrive out of order. A "create" event may arrive after an "update" event for the same record. Solution: include a sequence number or timestamp and process events in order.

**Duplication**: Webhooks may be delivered more than once. Solution: implement idempotent processing using event IDs.

**Volume Spikes**: Bulk imports or migrations can flood the sync pipeline. Solution: implement queue-based processing with configurable throughput limits.

**Circular Updates**: In bidirectional sync, updating System B triggers a webhook that updates System A, which triggers a webhook back to System B (infinite loop). Solution: include a sync source marker in each update and ignore events that originated from the sync itself.

---

## 3. Batch Sync

### 3.1 Architecture

```
Scheduler (cron)
    |
    v
[Fetch changes from System A since last sync]
    |
    v
[Transform and validate data]
    |
    v
[Match records between System A and System B]
    |
    v
[Apply changes to System B (create/update/delete)]
    |
    v
[Update sync cursor (last sync timestamp)]
    |
    v
[Generate sync report]
```

### 3.2 Incremental Sync

Only process records that changed since the last sync:

**Timestamp-Based**: Query for records where `updated_at > last_sync_timestamp`. Simple but requires accurate timestamps in the source system. Deletes are not captured.

**Cursor-Based**: Use an opaque cursor provided by the API to track sync position. More reliable than timestamps but requires API support.

**Change Flag**: Source system marks records as changed. Sync processes flagged records and clears the flag. Requires source system modification.

### 3.3 Full Reconciliation

Periodically compare all records between systems to catch any that were missed by incremental sync:

```
Every Sunday at 2 AM:
  1. Fetch all records from System A
  2. Fetch all records from System B
  3. Match by external ID
  4. Identify discrepancies:
     - Records in A but not B (missed creates)
     - Records in B but not A (orphaned records)
     - Records in both but with different data (missed updates)
  5. Resolve discrepancies based on rules
  6. Log all reconciliation actions
```

---

## 4. Bidirectional Sync

### 4.1 Architecture

```
System A                    Sync Engine                  System B
    |                          |                            |
    |-- Change Event --------->|                            |
    |                          |-- Is this from sync? ------|
    |                          |   (check sync marker)      |
    |                          |   No --> Transform -------->|
    |                          |                            |
    |                          |<-- Change Event ------------|
    |<-- Transform ------------|   (check sync marker)      |
    |                          |   No --> Transform         |
```

### 4.2 Conflict Detection

Conflicts occur when the same record is modified in both systems between sync cycles:

**Detection Methods**:
- **Version Numbers**: Each system maintains a version counter. If both versions increased since last sync, there is a conflict.
- **Timestamps**: Compare modification timestamps. If both changed after the last sync, there is a conflict.
- **Field-Level Comparison**: Compare individual fields to detect which specific fields are in conflict (reduces the scope of conflicts).

### 4.3 Conflict Resolution Strategies

| Strategy | Rule | When to Use |
|----------|------|-------------|
| Last-Write-Wins | Most recent timestamp wins | Simple, acceptable for most data |
| Source-of-Truth | One system always wins | One system is authoritative for specific fields |
| Field-Level Merge | Non-conflicting fields from both, flag conflicting fields | Preserves most data, reduces data loss |
| Manual Resolution | Queue for human decision | High-value data, legal documents |
| Domain Rules | Business logic determines winner | "Sales data from CRM wins, support data from helpdesk wins" |

### 4.4 Sync Marker Pattern

To prevent circular updates in bidirectional sync:

1. When the sync engine updates System B, include a marker: `_sync_source: "sync_engine"`
2. When System B fires a webhook for this change, the payload includes the marker
3. The sync engine checks for the marker and ignores events from itself
4. Only genuine user-initiated changes in System B are synced back to System A

---

## 5. Change Data Capture (CDC)

### 5.1 What Is CDC

Change Data Capture captures row-level changes (inserts, updates, deletes) in a database and streams them as events. CDC is the most reliable source of change information because it captures all changes, including those made by direct SQL queries that bypass application-level webhooks.

### 5.2 CDC Methods

**Log-Based CDC**: Read the database's transaction log (WAL in PostgreSQL, binlog in MySQL). Captures all changes with minimal performance impact on the source database.

**Trigger-Based CDC**: Database triggers fire on INSERT, UPDATE, DELETE and write change records to a separate table. Higher performance impact on the source database.

**Polling-Based CDC**: Periodically query for records with `updated_at` timestamps newer than the last poll. Misses deletes and has higher latency.

### 5.3 CDC Tools

| Tool | Type | Databases Supported |
|------|------|-------------------|
| Debezium | Log-based | PostgreSQL, MySQL, MongoDB, SQL Server |
| AWS DMS | Log-based | Most databases |
| Fivetran | Varies | 300+ sources |
| Airbyte | Varies (open source) | 300+ sources |

---

## 6. Sync Data Model

### 6.1 Mapping Table

Maintain a mapping between record IDs in different systems:

```sql
CREATE TABLE sync_mapping (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50),       -- e.g., "contact", "order"
    system_a_id VARCHAR(100),      -- ID in System A
    system_b_id VARCHAR(100),      -- ID in System B
    last_synced_at TIMESTAMP,
    last_sync_direction VARCHAR(10), -- "a_to_b" or "b_to_a"
    sync_status VARCHAR(20),       -- "synced", "pending", "conflict", "error"
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 6.2 Sync Log

Log every sync operation for debugging and audit:

```sql
CREATE TABLE sync_log (
    id SERIAL PRIMARY KEY,
    mapping_id INTEGER REFERENCES sync_mapping(id),
    operation VARCHAR(20),         -- "create", "update", "delete"
    direction VARCHAR(10),         -- "a_to_b" or "b_to_a"
    source_data JSONB,
    target_data JSONB,
    status VARCHAR(20),            -- "success", "error", "conflict"
    error_message TEXT,
    executed_at TIMESTAMP
);
```

---

## 7. Monitoring and Health

### 7.1 Sync Health Metrics

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| Sync lag (time since last successful sync) | < 5 min (real-time), < 1 hour (batch) | 2x target |
| Sync success rate | > 99% | < 95% |
| Conflict rate | < 1% | > 5% |
| Mapping coverage | 100% of expected records | < 98% |
| Queue depth | < 100 pending items | > 500 |

### 7.2 Data Quality Checks

Periodically verify sync accuracy:
- Sample 100 records and compare data between systems
- Check mapping table for orphaned entries
- Verify record counts match between systems (accounting for expected differences)
- Check for stale sync timestamps

---

## 8. Key References

- Kleppmann (2017) -- "Designing Data-Intensive Applications" (Data replication and consistency)
- Debezium Documentation -- Change Data Capture for databases
- Airbyte Documentation -- Open-source data integration

---

*This module covers sync patterns. See `etl_automation.md` for data pipeline automation and `data_quality.md` for data quality management.*

# ETL Automation: Data Pipelines, Transformation, Scheduling, and Monitoring

## Overview

ETL (Extract, Transform, Load) automation builds reliable data pipelines that move data between systems, transform it into useful formats, and load it into destination systems for analysis, reporting, or operational use. Unlike real-time sync (which keeps systems in lockstep), ETL focuses on batch processing of data for analytical and reporting purposes. This module covers pipeline architecture, transformation patterns, scheduling strategies, and monitoring for production ETL operations.

---

## 1. ETL Pipeline Architecture

### 1.1 Classic ETL vs. ELT

**ETL (Extract-Transform-Load)**: Data is transformed before loading into the destination. Transformation happens in a staging area or middleware.

```
Source --> [Extract] --> [Transform (middleware)] --> [Load] --> Destination
```

**ELT (Extract-Load-Transform)**: Data is loaded raw into the destination first, then transformed in place. Leverages the destination's processing power.

```
Source --> [Extract] --> [Load (raw)] --> [Transform (in destination)] --> Ready
```

| Dimension | ETL | ELT |
|-----------|-----|-----|
| Transformation location | Middleware/staging | Destination warehouse |
| Data volume handling | Limited by middleware resources | Scales with warehouse |
| Complexity of transforms | Handled in code | SQL-based in warehouse |
| Raw data preservation | No (only transformed data loaded) | Yes (raw data available) |
| Best for | Operational systems, APIs | Analytics warehouses (Snowflake, BigQuery) |

### 1.2 Pipeline Components

```
┌──────────────────────────────────────────────────┐
│                  ETL PIPELINE                     │
│                                                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐     │
│  │  Extract  │  │ Transform │  │   Load   │     │
│  │           │  │           │  │          │     │
│  │ - API     │  │ - Clean   │  │ - Bulk   │     │
│  │ - DB      │  │ - Map     │  │ - Upsert │     │
│  │ - File    │  │ - Enrich  │  │ - Append │     │
│  │ - Stream  │  │ - Validate│  │ - Replace│     │
│  └──────────┘  └───────────┘  └──────────┘     │
│                                                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐     │
│  │Scheduling│  │ Monitoring │  │  Logging │     │
│  └──────────┘  └───────────┘  └──────────┘     │
└──────────────────────────────────────────────────┘
```

---

## 2. Extraction Patterns

### 2.1 Full Extraction

Extract all records from the source on each run. Simple but inefficient for large datasets.

**When to Use**: Small datasets (< 10K records), when incremental extraction is not possible, for initial loads and periodic full reconciliation.

### 2.2 Incremental Extraction

Extract only records that changed since the last extraction:

**Timestamp-Based**: `SELECT * FROM orders WHERE updated_at > :last_extract_time`

**CDC-Based**: Use change data capture to stream only changes (see sync_patterns.md).

**Sequence-Based**: `SELECT * FROM events WHERE id > :last_extracted_id`

### 2.3 API Extraction Challenges

| Challenge | Solution |
|-----------|---------|
| Pagination | Implement cursor-based pagination, handle all pages |
| Rate limits | Implement rate limiting with backoff |
| Large responses | Stream responses instead of loading into memory |
| Partial failures | Checkpoint progress, resume from last successful page |
| Schema changes | Detect and handle new/removed fields gracefully |
| Authentication | Manage token refresh within extraction pipeline |

---

## 3. Transformation Patterns

### 3.1 Data Cleaning

| Operation | Description | Example |
|-----------|-------------|---------|
| Null handling | Replace nulls with defaults or flag for review | `COALESCE(phone, 'N/A')` |
| Deduplication | Remove duplicate records | Deduplicate by email, keep most recent |
| Standardization | Normalize formats | Phone: `+1-555-123-4567` format |
| Trimming | Remove whitespace | `TRIM(name)` |
| Type casting | Ensure correct data types | String dates to DATE type |
| Outlier handling | Flag or remove statistical outliers | Revenue > 10x average flagged |

### 3.2 Data Mapping

Map source fields to destination fields:

```python
field_mapping = {
    "source_field": "destination_field",
    "first_name": "firstName",
    "last_name": "lastName",
    "email_address": "email",
    "created_date": "createdAt",
    # Computed fields
    "full_name": lambda row: f"{row['first_name']} {row['last_name']}",
    "age_group": lambda row: classify_age(row['birth_date']),
}
```

### 3.3 Data Enrichment

Augment extracted data with additional information:
- Geocoding addresses to latitude/longitude
- Company data enrichment (industry, size, revenue)
- Currency conversion to a standard currency
- Timezone normalization to UTC

### 3.4 Aggregation

Summarize detailed data into analytical summaries:

```sql
-- Transform order line items into daily revenue summary
SELECT
    DATE(order_date) as date,
    product_category,
    COUNT(DISTINCT order_id) as order_count,
    SUM(line_total) as revenue,
    AVG(line_total) as avg_order_value
FROM order_items
GROUP BY DATE(order_date), product_category
```

---

## 4. Loading Patterns

### 4.1 Load Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| Full Replace | Drop and recreate target table | Small tables, dimension tables |
| Append | Add new records only | Event/log tables, immutable data |
| Upsert | Insert new, update existing | Most operational tables |
| SCD Type 2 | Maintain historical versions | Slowly changing dimensions |
| Merge | Complex conditional insert/update/delete | Large tables with mixed changes |

### 4.2 Bulk Loading

For large datasets, use bulk loading methods:
- PostgreSQL: `COPY FROM` command (fastest)
- MySQL: `LOAD DATA INFILE`
- Snowflake: `COPY INTO` from staged files
- BigQuery: Load from Cloud Storage

### 4.3 Idempotent Loading

Design loads to be safely re-runnable:
- Use `INSERT ... ON CONFLICT UPDATE` (PostgreSQL) or equivalent
- Include a batch ID to identify and replace specific load batches
- Track loaded records to prevent duplication

---

## 5. Scheduling

### 5.1 Scheduling Strategies

| Strategy | Trigger | Use Case |
|----------|---------|----------|
| Cron-based | Time schedule | Regular periodic loads |
| Event-driven | Source system event | Real-time data arrival |
| Dependency-based | Upstream pipeline completion | Multi-stage pipelines |
| Manual | Human trigger | Ad-hoc loads, backfills |

### 5.2 Scheduling Best Practices

- Schedule pipelines during low-traffic periods to minimize source system impact
- Stagger pipeline start times to avoid resource contention
- Build in buffer time between dependent pipelines
- Implement timeout limits to prevent runaway pipelines
- Use dependency-based scheduling for multi-stage pipelines (do not use fixed time offsets)

### 5.3 Pipeline Orchestration Tools

| Tool | Type | Best For |
|------|------|----------|
| Apache Airflow | Open-source orchestrator | Complex DAG-based pipelines |
| Prefect | Modern orchestrator | Python-native workflows |
| Dagster | Data orchestrator | Data-aware pipeline management |
| dbt | Transform-focused | SQL transformation pipelines |
| n8n / Make | No-code automation | Simple ETL with integrations |

---

## 6. Monitoring

### 6.1 Pipeline Health Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|----------------|
| Pipeline success rate | % of runs completing successfully | < 95% |
| Pipeline duration | Execution time | > 2x average |
| Records processed | Count of records per run | Deviates > 50% from average |
| Data freshness | Time since last successful load | > 2x schedule interval |
| Error count | Number of errors per run | > 0 for critical pipelines |

### 6.2 Data Quality Monitoring

After each pipeline run, validate the loaded data:

```sql
-- Row count check
SELECT COUNT(*) FROM target_table WHERE load_date = CURRENT_DATE;
-- Expected: within 10% of previous day

-- Null check on critical fields
SELECT COUNT(*) FROM target_table WHERE email IS NULL AND load_date = CURRENT_DATE;
-- Expected: 0

-- Freshness check
SELECT MAX(updated_at) FROM target_table;
-- Expected: within the last pipeline interval

-- Referential integrity
SELECT COUNT(*) FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL AND o.load_date = CURRENT_DATE;
-- Expected: 0
```

### 6.3 Alerting

| Condition | Severity | Action |
|-----------|----------|--------|
| Pipeline failed | High | Investigate, manual retry if needed |
| Pipeline running > 2x average duration | Warning | Monitor, potential issue |
| Zero records processed | Critical | Source system may be down |
| Data quality check failed | High | Investigate data issue |
| Pipeline did not start on schedule | Critical | Check scheduler, infrastructure |

---

## 7. Error Handling

### 7.1 Pipeline-Level Error Handling

- **Retry**: Retry the entire pipeline on transient failures (max 3 retries)
- **Partial Success**: Save successfully processed records, queue failures for retry
- **Checkpoint**: Save progress markers to resume from the failure point
- **Dead Letter**: Move permanently failed records to a dead letter table for investigation

### 7.2 Record-Level Error Handling

For individual record failures within a batch:
- Log the error with the specific record data
- Continue processing remaining records
- Report the failure count in the pipeline summary
- Route failed records to an error table for review

---

## 8. Key References

- Kimball & Ross (2013) -- "The Data Warehouse Toolkit" (ETL best practices)
- Apache Airflow Documentation -- Pipeline orchestration
- dbt Documentation -- Transform-focused data pipelines
- Fivetran/Airbyte Documentation -- Managed extraction and loading

---

*This module covers ETL automation. See `sync_patterns.md` for real-time sync and `data_quality.md` for data quality management.*

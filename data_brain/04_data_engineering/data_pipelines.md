# Data Pipelines — ETL, ELT, Streaming, and Orchestration

## Overview

A data pipeline is a directed acyclic graph (DAG) of transformations that moves data
from source systems to analytical destinations. Pipeline architecture choices --
ETL vs ELT, batch vs streaming, lambda vs kappa -- determine latency, cost, complexity,
and maintainability. This module covers pipeline design patterns, orchestration engines,
and the operational discipline required to run pipelines at production scale.

References: Kleppmann (Designing Data-Intensive Applications), Reis & Housley
(Fundamentals of Data Engineering), Narkhede et al. (Kafka: The Definitive Guide),
Databricks/dbt Labs documentation, Airflow best practices guides.

---

## ETL vs ELT

### ETL (Extract, Transform, Load)

The traditional pattern: data is extracted from sources, transformed in a staging
area (often an ETL server), then loaded into the target warehouse.

```
Source --> [Extract] --> Staging --> [Transform] --> [Load] --> Warehouse
```

Characteristics:
- Transformation happens before loading (compute on ETL server)
- Suited when warehouse compute is expensive or limited
- Schema-on-write: data must conform to target schema before loading
- Common in legacy on-premise environments (Informatica, Talend, SSIS)
- Drawback: transformation logic is coupled to ingestion

### ELT (Extract, Load, Transform)

The modern cloud pattern: raw data is loaded into a scalable warehouse first,
then transformed in place using SQL or warehouse-native compute.

```
Source --> [Extract] --> [Load] --> Warehouse --> [Transform in-place]
```

Characteristics:
- Leverages warehouse's elastic compute (Snowflake, BigQuery, Redshift)
- Schema-on-read: raw data persists, transformations applied as views/tables
- Enables exploration of raw data before defining transformations
- dbt is the canonical ELT transformation layer
- Lower operational burden: fewer moving parts

### Decision Matrix

| Factor | ETL | ELT |
|--------|-----|-----|
| Compute model | Dedicated ETL server | Warehouse compute |
| Data persistence | Only transformed data | Raw + transformed |
| Flexibility | Low (must re-extract) | High (re-transform) |
| Cost at scale | Linear with server | Elastic with queries |
| Latency | Higher (multi-hop) | Lower (in-warehouse) |
| Governance | Transform pre-load | Transform post-load |
| Best for | Legacy, regulated, PII scrubbing | Cloud-native, analytics |

---

## Batch vs Streaming

### Batch Processing

Data is collected over a time window and processed as a group.

- Window sizes: hourly, daily, weekly
- Processing engines: Spark, Hive, Presto, dbt
- Scheduling: cron, Airflow, Dagster, Prefect
- Latency: minutes to hours
- Simpler error handling, easier to reason about

### Stream Processing

Data is processed record-by-record or in micro-batches as it arrives.

- Latency: milliseconds to seconds
- Engines: Kafka Streams, Apache Flink, Spark Structured Streaming
- Requires handling of late-arriving data, out-of-order events
- Windowing strategies: tumbling, sliding, session, global
- Exactly-once semantics require careful design

### Watermarks and Late Data

In streaming, a watermark W(t) is a heuristic bound on event time progress:

```
W(t) = max(event_time_seen) - allowed_lateness
```

Events arriving after the watermark are either:
1. Dropped (simplest, lowest accuracy)
2. Accumulated into a side output for later reconciliation
3. Trigger updated results (retractions)

### Lambda Architecture

Combines batch and streaming layers:

```
                    ┌──────────────┐
     Raw Data ─────>│  Batch Layer │───> Batch Views
         │          └──────────────┘         │
         │          ┌──────────────┐         │
         └─────────>│ Speed Layer  │───> Real-time Views
                    └──────────────┘         │
                                             ▼
                                      ┌─────────────┐
                                      │ Serving Layer│
                                      └─────────────┘
```

- Batch layer: complete, accurate, high latency (MapReduce/Spark)
- Speed layer: approximate, low latency (Storm/Flink)
- Serving layer: merges both views for queries
- Drawback: dual codebases, operational complexity

### Kappa Architecture

Eliminates the batch layer; everything is a stream:

```
Raw Data ───> Stream Processing Engine ───> Serving Layer
                    │
                    └──> Replay from log for corrections
```

- Single codebase for all processing
- Uses an immutable log (Kafka) as the source of truth
- Reprocessing = replay the log with updated logic
- Simpler than Lambda but requires a robust log infrastructure
- Championed by Jay Kreps (LinkedIn/Confluent)

---

## Apache Spark

Unified analytics engine for large-scale data processing.

### Core Abstractions

- RDD (Resilient Distributed Dataset): immutable, partitioned collection
- DataFrame: RDD with schema (columnar, Catalyst-optimized)
- Dataset: typed DataFrame (Scala/Java only)

### Execution Model

```
Driver Program
    │
    ├── SparkContext → Cluster Manager (YARN/Mesos/K8s)
    │                        │
    │                  ┌─────┴─────┐
    │                  │ Executor 1 │ ─── Tasks (partition-level)
    │                  │ Executor 2 │
    │                  │ Executor N │
    │                  └───────────┘
    │
    └── DAG Scheduler → Stage boundaries at shuffles
```

### Optimization Techniques

- Partition pruning: filter pushdown to avoid full scans
- Broadcast joins: small table replicated to all executors
- Salting: add random prefix to skewed keys before join
- Caching: persist intermediate DataFrames for reuse
- AQE (Adaptive Query Execution): runtime re-optimization in Spark 3.x
- Bucketing: pre-partition data to avoid shuffle on join keys

---

## Apache Airflow

The standard orchestration platform for batch data pipelines.

### Core Concepts

- DAG: directed acyclic graph of tasks with dependencies
- Operator: unit of work (BashOperator, PythonOperator, BigQueryOperator)
- Sensor: waits for an external condition (file, API, partition)
- XCom: cross-communication between tasks (small metadata only)
- Connection/Hook: external system credentials and clients

### DAG Design Principles

1. **Idempotency**: re-running a task produces the same result
2. **Atomicity**: each task succeeds or fails entirely
3. **Parameterization**: use execution_date, not wall-clock time
4. **No side-channel data**: pass data through storage, not XComs
5. **Shallow DAGs**: prefer wide over deep (parallelize where possible)

### Example DAG Pattern

```python
# Typical ELT pipeline DAG
with DAG(
    dag_id="daily_revenue_pipeline",
    schedule_interval="0 6 * * *",
    catchup=True,
    max_active_runs=1,
    default_args={"retries": 2, "retry_delay": timedelta(minutes=5)},
) as dag:

    extract = BigQueryExtractOperator(
        task_id="extract_raw_orders",
        sql="SELECT * FROM source.orders WHERE date = '{{ ds }}'",
        destination="staging.orders_{{ ds_nodash }}",
    )

    transform = DbtRunOperator(
        task_id="transform_revenue",
        models="staging.stg_orders fct_daily_revenue",
    )

    test = DbtTestOperator(task_id="test_revenue")

    notify = SlackOperator(task_id="notify_success")

    extract >> transform >> test >> notify
```

---

## dbt (Data Build Tool)

SQL-first transformation framework for the ELT paradigm.

### Key Features

- Models: SELECT statements that materialize as tables/views
- Tests: schema tests (not_null, unique, accepted_values, relationships)
- Documentation: YAML-based, auto-generates data catalog
- Snapshots: SCD Type 2 tracking via dbt snapshot
- Incremental models: process only new/changed rows

### Materialization Strategies

| Strategy | When to Use | Trade-off |
|----------|-------------|-----------|
| View | Small/fast queries, always-fresh | Compute on read |
| Table | Large queries, stable data | Storage cost, stale |
| Incremental | Large tables, append-mostly | Complexity, must handle late data |
| Ephemeral | CTEs, no materialization | No persistence |

### Incremental Model Pattern

```sql
-- models/fct_daily_revenue.sql
{{ config(materialized='incremental', unique_key='order_date') }}

SELECT
    DATE(order_timestamp) AS order_date,
    SUM(amount) AS total_revenue,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
WHERE order_timestamp > (SELECT MAX(order_timestamp) FROM {{ this }})
{% endif %}
GROUP BY 1
```

---

## Apache Kafka

Distributed event streaming platform for real-time pipelines.

### Architecture

- Broker: server that stores and serves messages
- Topic: named feed of messages, partitioned for parallelism
- Partition: ordered, immutable sequence of records
- Consumer group: set of consumers that share partitions
- Offset: position of a consumer within a partition

### Guarantees

- At-most-once: consumer commits offset before processing
- At-least-once: consumer commits offset after processing (may duplicate)
- Exactly-once: idempotent producer + transactional consumer (Kafka 0.11+)

### Key Design Decisions

- Partition count: determines max consumer parallelism
- Replication factor: typically 3 for production
- Retention: time-based (7 days default) or size-based
- Compaction: retains latest value per key (for changelogs)
- Schema registry: Avro/Protobuf schemas for data contracts

---

## Idempotency

A pipeline is idempotent if running it N times with the same input produces the
same output as running it once.

### Techniques for Idempotency

1. **MERGE/UPSERT**: INSERT ... ON CONFLICT UPDATE
2. **Partition overwrite**: DELETE partition, then INSERT
3. **Deduplication key**: use natural key + event timestamp
4. **Deterministic IDs**: UUID v5 (namespace + content hash)
5. **Atomic swap**: write to temp table, then RENAME

### Anti-Patterns

- AUTO_INCREMENT IDs break idempotency on re-runs
- Appending without deduplication creates duplicates
- Using wall-clock timestamps instead of logical timestamps

---

## Backfill Strategies

Backfill = re-processing historical data through a pipeline.

### Approaches

1. **Full backfill**: reprocess all historical data (simplest, most expensive)
2. **Incremental backfill**: reprocess date range with parameterized queries
3. **Parallel backfill**: run multiple date partitions concurrently

### Airflow Backfill

```bash
# Backfill 30 days of data
airflow dags backfill daily_revenue_pipeline \
    --start-date 2024-01-01 \
    --end-date 2024-01-31 \
    --reset-dagruns
```

### Backfill Checklist

- Ensure pipeline is idempotent before backfilling
- Rate-limit concurrent runs to avoid overwhelming sources
- Monitor warehouse costs during large backfills
- Validate output counts against source system
- Communicate downstream about data refresh

---

## Data Contracts

A data contract is a formal agreement between a data producer and consumer
that defines the schema, semantics, SLAs, and quality expectations.

### Contract Components

```yaml
# data_contract.yaml
contract:
  name: orders_stream
  version: 2.1.0
  owner: payments-team
  consumers: [analytics, ml-features, finance]

schema:
  fields:
    - name: order_id
      type: STRING
      description: "UUID, globally unique"
      constraints: [not_null, unique]
    - name: amount_cents
      type: INTEGER
      description: "Order total in cents (USD)"
      constraints: [not_null, positive]
    - name: created_at
      type: TIMESTAMP
      description: "ISO 8601, UTC"
      constraints: [not_null]

sla:
  freshness: "< 15 minutes"
  availability: "99.9%"
  volume: "1M-5M events/day"

quality:
  completeness: "> 99.5%"
  uniqueness: "order_id is unique"
  validity: "amount_cents > 0"
```

### Enforcement

- Schema registry (Confluent) for streaming contracts
- dbt tests + Great Expectations for batch contracts
- Contract-breaking changes require version bump + consumer notification
- CI/CD gates: fail deployment if contract tests fail

---

## Pipeline Observability

### Key Metrics

- **Freshness**: time since last successful run
- **Volume**: row counts per run (detect anomalies with Z-score)
- **Duration**: execution time trend (alert on 2x baseline)
- **Error rate**: failed tasks / total tasks
- **Data quality score**: % of quality checks passing

### Observability Stack

| Layer | Tools |
|-------|-------|
| Orchestration | Airflow UI, Dagster Dagit |
| Data quality | Great Expectations, dbt tests, Monte Carlo |
| Lineage | OpenLineage, DataHub, Atlan |
| Alerting | PagerDuty, Slack, OpsGenie |

---

## Production Checklist

- [ ] Pipeline is idempotent and can be safely re-run
- [ ] Backfill strategy documented and tested
- [ ] Data contracts defined with schema and SLA
- [ ] Monitoring and alerting configured
- [ ] Error handling: retries, dead-letter queues, alerts
- [ ] Documentation: DAG description, owner, runbook
- [ ] Security: credentials in secrets manager, least-privilege access
- [ ] Cost estimation: compute, storage, egress
- [ ] Downstream impact assessment complete
- [ ] Disaster recovery plan documented

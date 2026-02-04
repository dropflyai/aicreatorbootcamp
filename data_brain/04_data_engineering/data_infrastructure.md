# Data Infrastructure — Warehouses, Lakes, and the Modern Data Stack

## Overview

Data infrastructure encompasses the compute engines, storage layers, and orchestration
platforms that power analytical workloads. Choosing between Snowflake, BigQuery, Redshift,
or a lakehouse architecture involves trade-offs in cost model, performance characteristics,
ecosystem integration, and operational burden. This module covers cloud data warehouses,
data lake architectures, data mesh principles, and the optimization techniques that
make these systems performant at petabyte scale.

References: Kleppmann (Designing Data-Intensive Applications), Snowflake Architecture
whitepaper, Google BigQuery under the hood, Amazon Redshift engineering blog,
Dehghani (Data Mesh: Delivering Data-Driven Value at Scale).

---

## Cloud Data Warehouses

### Snowflake

Architecture: shared-data, multi-cluster compute.

```
┌─────────────────────────────────────────────────┐
│                 Cloud Services                    │
│  (Query parsing, optimization, metadata, RBAC)   │
├─────────────────────────────────────────────────┤
│        Virtual Warehouses (Compute)               │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│   │   XS     │  │    L     │  │   3XL    │     │
│   │ Cluster  │  │ Cluster  │  │ Cluster  │     │
│   └──────────┘  └──────────┘  └──────────┘     │
├─────────────────────────────────────────────────┤
│        Centralized Storage (S3/Azure/GCS)        │
│        Micro-partitions (50-500 MB each)         │
└─────────────────────────────────────────────────┘
```

Key characteristics:
- Separation of storage and compute (scale independently)
- Credit-based pricing: $/credit/second, warehouse size determines credits
- Zero-copy cloning: instant clone of tables/databases without data duplication
- Time travel: query data as it existed up to 90 days ago
- Semi-structured support: VARIANT type for JSON/Avro/Parquet
- Multi-cloud: runs on AWS, Azure, GCP with cross-cloud replication

### Micro-Partition Pruning

Snowflake stores data in immutable micro-partitions (50-500 MB compressed).
Metadata tracked per partition: min/max values, distinct count, NULL count.

```
Query: SELECT * FROM orders WHERE order_date = '2024-01-15'

Partition metadata:
  Partition 1: order_date min=2024-01-01, max=2024-01-10 --> PRUNED
  Partition 2: order_date min=2024-01-11, max=2024-01-20 --> SCANNED
  Partition 3: order_date min=2024-01-21, max=2024-01-31 --> PRUNED
```

Clustering keys further optimize pruning for non-natural sort orders.

### Google BigQuery

Architecture: serverless, columnar, Dremel-based.

Key characteristics:
- Truly serverless: no clusters to manage, pay per query (per TB scanned)
- Slots: units of compute (on-demand or reserved capacity)
- Columnar storage: Capacitor format, automatic compression
- Nested/repeated fields: native support for denormalized schemas
- BI Engine: in-memory acceleration for dashboards
- BigQuery ML: train ML models directly in SQL

### Cost Model

```
On-demand: $6.25/TB scanned (first 1 TB/month free)
Flat-rate:  $2,600/month for 100 slots (predictable cost)

Optimization levers:
  - SELECT only needed columns (columnar = pay for what you read)
  - Partition by date (reduce scanned data)
  - Cluster by high-cardinality filter columns
  - Use materialized views for repeated aggregations
  - Set query byte limits as guardrails
```

### Amazon Redshift

Architecture: shared-nothing, MPP (Massively Parallel Processing).

Key characteristics:
- Node-based pricing: dc2 (SSD) or ra3 (managed storage)
- Redshift Serverless: auto-scaling alternative to provisioned clusters
- AQUA: hardware-accelerated cache layer for aggregation queries
- Spectrum: query data in S3 without loading (federated)
- Distribution styles: KEY, EVEN, ALL (determines data placement across nodes)
- Sort keys: COMPOUND or INTERLEAVED (determines on-disk ordering)

### Distribution and Sort Key Selection

```sql
-- Fact table: distribute by most-joined dimension key
CREATE TABLE fct_orders (
    order_id    BIGINT,
    customer_id BIGINT,  -- DISTKEY: co-locates with dim_customer
    order_date  DATE,    -- SORTKEY: enables range pruning
    amount      DECIMAL(12,2)
)
DISTKEY(customer_id)
SORTKEY(order_date);

-- Small dimension: ALL distribution (replicated to every node)
CREATE TABLE dim_status (
    status_id    INT,
    status_name  VARCHAR(50)
)
DISTSTYLE ALL;
```

### Warehouse Comparison Matrix

| Feature | Snowflake | BigQuery | Redshift |
|---------|-----------|----------|----------|
| Pricing model | Credit/time | Per TB scanned | Node/hour |
| Serverless | Via warehouse sizing | Native | Serverless option |
| Storage/compute separation | Full | Full | ra3 only |
| Concurrency scaling | Auto (extra clusters) | Auto (slots) | Manual (WLM) |
| Semi-structured | VARIANT | STRUCT/ARRAY | SUPER |
| ML integration | Snowpark ML | BigQuery ML | Redshift ML |
| Ecosystem | dbt, Fivetran, Sigma | Looker, Dataform | AWS native |

---

## Data Lake Architecture

### Components

```
┌──────────────────────────────────────────────────┐
│                  Consumption Layer                │
│  (BI tools, notebooks, ML pipelines, APIs)       │
├──────────────────────────────────────────────────┤
│                  Processing Layer                 │
│  (Spark, Presto/Trino, Flink, dbt)              │
├──────────────────────────────────────────────────┤
│                  Table Format Layer               │
│  (Delta Lake, Apache Iceberg, Apache Hudi)       │
├──────────────────────────────────────────────────┤
│                  Storage Layer                    │
│  (S3, GCS, ADLS -- Parquet/ORC files)           │
├──────────────────────────────────────────────────┤
│                  Ingestion Layer                  │
│  (Kafka, Fivetran, Airbyte, custom connectors)  │
└──────────────────────────────────────────────────┘
```

### Data Lake Zones

| Zone | Purpose | Data Quality | Access |
|------|---------|-------------|--------|
| Raw/Bronze | Landing zone, exact copy of source | Uncleaned | ETL only |
| Cleansed/Silver | Deduplicated, typed, validated | Standardized | Data team |
| Curated/Gold | Business-ready, modeled, aggregated | High quality | Analysts, BI |

### File Format Comparison

| Format | Type | Compression | Splittable | Schema Evolution | Best For |
|--------|------|-------------|-----------|------------------|----------|
| Parquet | Columnar | Excellent (snappy, zstd) | Yes | Yes | Analytics |
| ORC | Columnar | Excellent (zlib) | Yes | Yes | Hive ecosystem |
| Avro | Row-based | Good | Yes | Yes | Streaming, Kafka |
| JSON | Row-based | Poor | Yes (newline-delimited) | Flexible | Raw ingestion |
| CSV | Row-based | Poor | Yes | No | Legacy exchange |

---

## Data Mesh

### Principles (Zhamak Dehghani)

Data mesh is a sociotechnical approach to building a decentralized data architecture.

**1. Domain-Oriented Ownership**
- Each business domain owns and publishes its data as a product
- Domain teams include data engineers, not a centralized data team
- Example: Payments domain owns payments data products

**2. Data as a Product**
- Data products have SLAs, documentation, discoverability, and quality guarantees
- Product thinking: who are the consumers? What are their needs?
- Each data product has a data product owner

**3. Self-Serve Data Infrastructure as a Platform**
- Platform team provides tools for domains to build data products
- Standardized ingestion, storage, cataloging, and access patterns
- Reduces cognitive load on domain teams

**4. Federated Computational Governance**
- Global policies enforced computationally (not manually)
- Interoperability standards (naming, schema, quality)
- Automated compliance checks

### Data Mesh vs Centralized Architecture

| Aspect | Centralized | Data Mesh |
|--------|-------------|-----------|
| Ownership | Central data team | Domain teams |
| Bottleneck | Central team capacity | None (distributed) |
| Knowledge | Generic, context-poor | Deep domain expertise |
| Scalability | Linear (hire more) | Distributed (org scales) |
| Coordination | High (centralized) | Lower (contracts) |
| Platform cost | Lower (shared) | Higher (per-domain) |

---

## Query Optimization Deep Dive

### Execution Plans

Read execution plans bottom-up, right-to-left:

```
Hash Join (cost=1234.56)
├── Seq Scan on dim_product (cost=0..50)
│   Filter: category = 'Electronics'
└── Hash
    └── Index Scan on fct_orders (cost=0..800)
        Index Cond: order_date >= '2024-01-01'
```

### Common Optimization Patterns

**1. Predicate Pushdown**
```sql
-- Bad: filter after join
SELECT * FROM fct_orders o JOIN dim_product p ON o.product_id = p.id
WHERE p.category = 'Electronics';

-- Better: the optimizer should push the filter down
-- But explicit CTEs in some engines prevent pushdown
```

**2. Join Order Optimization**
- Smaller table should be the build side of hash joins
- Most optimizers handle this automatically
- Hints available: /*+ BROADCAST(small_table) */

**3. Aggregate Pushdown**
```sql
-- Instead of aggregating after a large join:
-- Pre-aggregate the fact table, then join for labels
WITH daily_totals AS (
    SELECT product_id, SUM(revenue) AS total
    FROM fct_orders
    GROUP BY product_id
)
SELECT p.name, d.total
FROM daily_totals d JOIN dim_product p ON d.product_id = p.id;
```

**4. Materialized Views**
```sql
CREATE MATERIALIZED VIEW mv_daily_revenue AS
SELECT
    order_date,
    product_category,
    SUM(revenue) AS total_revenue,
    COUNT(*) AS order_count
FROM fct_orders o JOIN dim_product p ON o.product_id = p.id
GROUP BY 1, 2;

-- Automatic query rewrite uses MV when applicable
```

---

## Infrastructure Cost Optimization

### Cost Levers by Platform

**Snowflake**
- Auto-suspend warehouses after 1-5 minutes of inactivity
- Use multi-cluster warehouses for concurrency instead of upsizing
- Resource monitors with credits alerts and auto-suspend
- Use transient tables for staging (no time travel / fail-safe storage)

**BigQuery**
- Switch from on-demand to flat-rate when monthly spend > $10K
- Use partitioning and clustering to reduce bytes scanned
- Set custom query quotas per user/project
- Archive cold data to BigQuery long-term storage (50% cheaper)

**Redshift**
- Right-size nodes: monitor CPU, disk, and network utilization
- Use Redshift Spectrum for infrequently accessed historical data
- VACUUM and ANALYZE regularly for optimal query plans
- Consider Serverless for variable workloads

### Cost Estimation Formula

```
Monthly Cost = Storage + Compute + Ingestion + Egress

Storage:
  Snowflake:  $23/TB/month (compressed)
  BigQuery:   $20/TB/month (active), $10/TB/month (long-term)
  S3:         $23/TB/month (standard), $4/TB/month (glacier)

Compute:
  Snowflake:  $2-4/credit, ~8 credits/hour for XS warehouse
  BigQuery:   $6.25/TB scanned (on-demand)
  Redshift:   $0.25-13.04/hour per node (varies by type)
```

---

## High Availability and Disaster Recovery

### Replication Strategies

| Strategy | RPO | RTO | Cost |
|----------|-----|-----|------|
| Multi-AZ (within region) | 0 | Minutes | Included |
| Cross-region replication | Minutes | Hours | 2x storage |
| Cold backup (S3 export) | Hours | Hours-Days | Minimal |

### Snowflake Failover

```sql
-- Enable failover for a database
ALTER DATABASE analytics ENABLE REPLICATION TO ACCOUNTS org.account_dr;

-- Promote DR account during outage
ALTER DATABASE analytics PRIMARY;
```

### Backup Best Practices

- Automated daily snapshots of production databases
- Cross-region replication for critical data
- Test restore procedures quarterly
- Document RPO/RTO requirements per data product
- Version control all transformation logic (dbt, Airflow DAGs)

---

## Production Checklist

- [ ] Warehouse/engine selected with documented rationale
- [ ] Storage tier strategy defined (hot/warm/cold)
- [ ] Partitioning and clustering aligned with query patterns
- [ ] Cost monitoring and alerting configured
- [ ] Access controls: RBAC, row-level security, column masking
- [ ] DR strategy documented with tested failover procedure
- [ ] Data catalog populated with business metadata
- [ ] Query performance baselines established
- [ ] Capacity planning for 12-month growth projection
- [ ] Network security: VPC peering, private endpoints, encryption at rest/in transit

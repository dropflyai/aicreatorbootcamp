# Data Modeling — Dimensional, Vault, and Modern Approaches

## Overview

Data modeling is the discipline of structuring data to serve analytical and operational
workloads. The choice of modeling technique -- Kimball dimensional modeling, Data Vault 2.0,
or modern lakehouse patterns -- determines query performance, flexibility, governance
complexity, and the ability to evolve the model over time. This module covers the theory,
trade-offs, and implementation details of each approach.

References: Kimball & Ross (The Data Warehouse Toolkit, 3rd ed.), Linstedt & Olschimke
(Building a Scalable Data Warehouse with Data Vault 2.0), Inmon (Building the Data
Warehouse), Zhamak Dehghani (Data Mesh), Databricks Lakehouse documentation.

---

## Normalization Theory

### Normal Forms

Normalization eliminates redundancy and update anomalies in relational schemas.

**First Normal Form (1NF)**
- All attributes are atomic (no repeating groups or arrays)
- Each row is unique (has a primary key)
- Violation: storing "tag1, tag2, tag3" in a single column

**Second Normal Form (2NF)**
- In 1NF + every non-key attribute is fully dependent on the entire primary key
- Applies to composite keys: no partial dependencies
- Violation: {order_id, product_id} -> product_name (depends only on product_id)

**Third Normal Form (3NF)**
- In 2NF + no transitive dependencies between non-key attributes
- A -> B -> C means C should be in a separate table keyed by B
- Violation: customer_id -> zip_code -> city (city depends on zip, not customer)

**Boyce-Codd Normal Form (BCNF)**
- In 3NF + every determinant is a candidate key
- Resolves anomalies when 3NF allows non-candidate-key determinants
- Decomposition may not preserve all functional dependencies

**Fourth Normal Form (4NF)**
- In BCNF + no multi-valued dependencies
- Violation: an employee has multiple skills AND multiple languages independently

**Fifth Normal Form (5NF)**
- In 4NF + no join dependencies that are not implied by candidate keys
- Ensures lossless decomposition into the smallest possible tables
- Rarely encountered in practice

### OLTP vs OLAP

| Dimension | OLTP | OLAP |
|-----------|------|------|
| Purpose | Transactions | Analysis |
| Normalization | 3NF+ | Denormalized (star/snowflake) |
| Query pattern | Point lookups, short txns | Full scans, aggregations |
| Concurrency | High (thousands of users) | Low (analysts) |
| Data volume | Current state | Historical (years) |
| Schema changes | Infrequent, carefully managed | Evolving, additive |

---

## Kimball Dimensional Modeling

### Core Concepts

Ralph Kimball's methodology organizes data into facts and dimensions arranged
in star or snowflake schemas optimized for analytical queries.

**Fact Tables** contain measurements (metrics) at a specific grain:
- Grain = the level of detail (one row per what?)
- Fact types: additive (revenue), semi-additive (balance), non-additive (ratio)
- Typically narrow and very tall (billions of rows)

**Dimension Tables** contain descriptive context:
- Who, what, where, when, why, how
- Typically wide and short (thousands to millions of rows)
- Contain hierarchies (geography: country > state > city)

### Star Schema

```
                    ┌──────────────┐
                    │  dim_date    │
                    └──────┬───────┘
                           │
┌──────────────┐    ┌──────┴───────┐    ┌──────────────┐
│ dim_customer │────│ fct_orders   │────│ dim_product  │
└──────────────┘    └──────┬───────┘    └──────────────┘
                           │
                    ┌──────┴───────┐
                    │  dim_store   │
                    └──────────────┘
```

- Single join from fact to any dimension
- Optimized for aggregation queries
- Denormalized dimensions (redundancy accepted for query speed)

### Snowflake Schema

Dimensions are further normalized into sub-dimensions:

```
dim_product ──> dim_category ──> dim_department
```

- Saves storage (no redundancy in dimensions)
- More joins required for queries
- Harder for analysts to navigate
- Rarely recommended in modern warehouses (storage is cheap)

### Fact Table Types

**Transaction Facts**: one row per event (order placed, click)
```sql
CREATE TABLE fct_orders (
    order_key       BIGINT,
    date_key        INT REFERENCES dim_date(date_key),
    customer_key    INT REFERENCES dim_customer(customer_key),
    product_key     INT REFERENCES dim_product(product_key),
    quantity         INT,
    revenue_amount   DECIMAL(12,2),
    discount_amount  DECIMAL(12,2)
);
```

**Periodic Snapshot Facts**: one row per entity per time period
```sql
-- Monthly account balance snapshot
CREATE TABLE fct_account_monthly (
    account_key     INT,
    month_key       INT,
    ending_balance  DECIMAL(15,2),  -- semi-additive: don't sum across time
    transaction_count INT            -- additive
);
```

**Accumulating Snapshot Facts**: one row per entity lifecycle
```sql
-- Order fulfillment pipeline
CREATE TABLE fct_order_fulfillment (
    order_key         INT,
    order_date_key    INT,
    ship_date_key     INT,   -- NULL until shipped
    deliver_date_key  INT,   -- NULL until delivered
    days_to_ship      INT,
    days_to_deliver   INT
);
```

---

## Slowly Changing Dimensions (SCD)

Dimensions change over time. SCD strategies handle historical tracking.

### SCD Type 0: Retain Original
- Never update. The original value is preserved forever.
- Use case: original credit score at loan origination

### SCD Type 1: Overwrite
- Update in place. No history preserved.
- Use case: correcting a data entry error

### SCD Type 2: Add New Row
- Insert a new row with version tracking columns.
- Preserves full history.

```sql
CREATE TABLE dim_customer (
    customer_key       SERIAL PRIMARY KEY,  -- surrogate key
    customer_id        VARCHAR(50),          -- natural key
    name               VARCHAR(200),
    address            VARCHAR(500),
    effective_date     DATE,
    expiration_date    DATE,       -- '9999-12-31' for current
    is_current         BOOLEAN
);
```

dbt implements SCD2 via snapshots:
```sql
{% snapshot customer_snapshot %}
{{ config(
    target_schema='snapshots',
    unique_key='customer_id',
    strategy='timestamp',
    updated_at='updated_at',
) }}
SELECT * FROM {{ source('crm', 'customers') }}
{% endsnapshot %}
```

### SCD Type 3: Add New Column
- Adds a "previous_value" column. Tracks only one change.
- Use case: tracking previous vs current sales territory

### SCD Type 6: Hybrid (1+2+3)
- Combines Type 1 (current column), Type 2 (history rows), Type 3 (previous column)
- Most flexible but most complex

---

## Data Vault 2.0

### Philosophy

Data Vault is an insert-only, historized modeling methodology designed for
enterprise data warehouses with multiple source systems and auditability requirements.

### Core Entities

**Hubs**: business keys (the identity of a business entity)
```sql
CREATE TABLE hub_customer (
    hub_customer_hash   BINARY(32),  -- MD5/SHA of business key
    customer_bk         VARCHAR(50), -- business key
    load_date           TIMESTAMP,
    record_source       VARCHAR(100)
);
```

**Links**: relationships between hubs (many-to-many)
```sql
CREATE TABLE link_order_customer (
    link_hash            BINARY(32),
    hub_order_hash       BINARY(32),
    hub_customer_hash    BINARY(32),
    load_date            TIMESTAMP,
    record_source        VARCHAR(100)
);
```

**Satellites**: descriptive attributes with temporal versioning
```sql
CREATE TABLE sat_customer_details (
    hub_customer_hash   BINARY(32),
    load_date           TIMESTAMP,
    load_end_date       TIMESTAMP,
    hash_diff           BINARY(32),  -- hash of all attributes for change detection
    name                VARCHAR(200),
    email               VARCHAR(200),
    address             VARCHAR(500),
    record_source       VARCHAR(100)
);
```

### Advantages Over Kimball

- Parallel loading from multiple sources without conflict
- Full auditability (every record has source and timestamp)
- Schema evolution without breaking existing structures
- Well-suited for regulated industries (finance, healthcare)

### Disadvantages

- Query complexity: many joins for simple questions
- Requires a "business vault" or "information mart" layer for consumption
- Steeper learning curve for analysts

---

## Modern Lakehouse Architecture

### Concept

The lakehouse combines the low-cost storage of data lakes with the performance
and governance of data warehouses.

```
┌─────────────────────────────────────────────┐
│              Lakehouse                       │
│  ┌────────────────────────────────────────┐  │
│  │   Open Table Formats                   │  │
│  │   (Delta Lake / Iceberg / Hudi)       │  │
│  │   ACID transactions on object storage │  │
│  └────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────┐  │
│  │   Object Storage (S3/GCS/ADLS)        │  │
│  │   Parquet/ORC files                   │  │
│  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Open Table Formats

| Feature | Delta Lake | Apache Iceberg | Apache Hudi |
|---------|-----------|----------------|-------------|
| Origin | Databricks | Netflix/Apple | Uber |
| ACID | Yes | Yes | Yes |
| Time travel | Yes | Yes | Yes |
| Schema evolution | Yes | Yes | Yes |
| Partition evolution | Limited | Yes (hidden) | Limited |
| Engine support | Spark-centric | Multi-engine | Spark/Flink |

### Feature Stores

Feature stores manage the lifecycle of ML features:

- **Offline store**: historical features for training (batch)
- **Online store**: low-latency features for serving (Redis/DynamoDB)
- **Feature registry**: metadata, lineage, documentation
- Tools: Feast, Tecton, Databricks Feature Store, SageMaker Feature Store

```
Training Pipeline:
    Raw Data --> Feature Engineering --> Offline Store --> Training

Serving Pipeline:
    Request --> Online Store --> Model --> Prediction
```

---

## Partitioning and Query Optimization

### Partitioning Strategies

- **Range partitioning**: by date (most common for time-series data)
- **Hash partitioning**: by hash of a key (even distribution)
- **List partitioning**: by categorical value (region, status)
- **Composite**: range + hash (date + customer_id)

### Column Store vs Row Store

| Aspect | Column Store | Row Store |
|--------|-------------|-----------|
| Read pattern | Few columns, many rows | Many columns, few rows |
| Compression | Excellent (similar values) | Moderate |
| Aggregations | Very fast | Slow for full scans |
| Point lookups | Slow | Fast |
| Write pattern | Batch optimal | Row-by-row optimal |
| Examples | BigQuery, Redshift, Snowflake | PostgreSQL, MySQL |

### Query Optimization Techniques

1. **Predicate pushdown**: filter at storage layer, not query layer
2. **Projection pushdown**: read only required columns
3. **Partition pruning**: skip irrelevant partitions
4. **Clustering/Sort keys**: co-locate related rows on disk
5. **Materialized views**: pre-compute expensive aggregations
6. **Result caching**: reuse results for identical queries

### Cost Formula (Simplified)

```
Query Cost = (Data Scanned / Compression Ratio) * $/TB
           + (Compute Time) * $/second
           + (Shuffle/Network) * $/GB
```

For Snowflake: cost is primarily warehouse-time (credit-based)
For BigQuery: cost is primarily data scanned (per-TB pricing)

---

## Data Catalog and Metadata Management

### Catalog Components

- **Technical metadata**: schema, types, partitions, statistics
- **Business metadata**: descriptions, owners, stewards, tags
- **Operational metadata**: freshness, quality scores, lineage
- **Social metadata**: usage frequency, popular queries, ratings

### Tools

| Tool | Type | Key Feature |
|------|------|-------------|
| DataHub | Open source | LinkedIn-born, rich lineage |
| Atlan | Commercial | Active metadata, collaboration |
| Amundsen | Open source | Lyft-born, search-first |
| OpenMetadata | Open source | API-first, dbt integration |
| Unity Catalog | Databricks | Fine-grained access control |

---

## Production Checklist

- [ ] Modeling methodology chosen and documented (Kimball/Vault/hybrid)
- [ ] Grain defined for every fact table
- [ ] SCD strategy selected for each dimension
- [ ] Partitioning strategy aligned with query patterns
- [ ] Naming conventions enforced (prefix: dim_, fct_, stg_, int_)
- [ ] Data lineage tracked from source to consumption
- [ ] Documentation in data catalog with business descriptions
- [ ] Access controls and row-level security configured
- [ ] Performance benchmarks established for key queries
- [ ] Schema evolution strategy documented

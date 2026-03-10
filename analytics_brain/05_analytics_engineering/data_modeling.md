# Data Modeling — Dimensional Models, Metrics Layers, and dbt Patterns

---

## Overview

Data modeling for analytics is the practice of structuring data to optimize for query performance, business understandability, and analytical flexibility. Unlike operational database design (which optimizes for transactional integrity and write performance), analytical data modeling optimizes for read-heavy workloads, ad-hoc queries, and self-serve exploration.

This module covers dimensional modeling (Kimball methodology), the modern metrics layer, and dbt modeling patterns — the practical techniques that transform raw operational data into trustworthy analytical assets.

---

## Dimensional Modeling (Kimball Methodology)

### Core Concept

Ralph Kimball's dimensional modeling methodology (The Data Warehouse Toolkit, 1996; 4th edition 2013) organizes analytical data into two types of tables:

**Fact tables:** Store quantitative measurements of business processes. Each row represents an event or transaction.

**Dimension tables:** Store descriptive attributes that provide context for facts. Each row represents an entity.

### The Star Schema

```
                    ┌──────────────┐
                    │  dim_date    │
                    │  ──────────  │
                    │  date_key    │
                    │  date        │
                    │  day_of_week │
                    │  month       │
                    │  quarter     │
                    │  year        │
                    │  is_weekend  │
                    └──────┬───────┘
                           │
┌──────────────┐    ┌──────┴──────────┐    ┌──────────────┐
│  dim_user    │    │  fct_orders     │    │  dim_product │
│  ──────────  │    │  ─────────────  │    │  ──────────  │
│  user_key    ├────┤  order_id       ├────┤  product_key │
│  user_id     │    │  user_key (FK)  │    │  product_id  │
│  name        │    │  product_key(FK)│    │  name        │
│  email       │    │  date_key (FK)  │    │  category    │
│  signup_date │    │  quantity       │    │  price       │
│  plan_tier   │    │  revenue        │    │  created_at  │
│  segment     │    │  discount       │    └──────────────┘
└──────────────┘    │  channel_key(FK)│
                    └──────┬──────────┘
                           │
                    ┌──────┴───────┐
                    │ dim_channel  │
                    │ ──────────── │
                    │ channel_key  │
                    │ channel_name │
                    │ medium       │
                    │ source       │
                    └──────────────┘
```

### Fact Table Design

**Types of fact tables:**

**Transaction facts:** One row per event (order, page view, click). Most granular, most flexible.
```sql
-- Example: fct_orders
SELECT
  order_id,
  user_key,
  product_key,
  date_key,
  order_amount,
  discount_amount,
  quantity
FROM raw.orders
```

**Periodic snapshot facts:** One row per entity per time period (daily user activity, monthly account metrics).
```sql
-- Example: fct_daily_user_activity
SELECT
  user_key,
  activity_date,
  session_count,
  page_views,
  actions_taken,
  minutes_active
FROM aggregated.daily_user_metrics
```

**Accumulating snapshot facts:** One row per entity lifecycle, with columns for milestones (lead lifecycle, order fulfillment).
```sql
-- Example: fct_user_lifecycle
SELECT
  user_key,
  signup_date,
  activation_date,
  first_purchase_date,
  upgrade_date,
  churn_date,
  days_to_activate,
  days_to_purchase
FROM derived.user_lifecycle
```

### Dimension Table Design

**Dimension design rules:**

1. **Wide and denormalized** — Dimensions should contain all descriptive attributes in a single table, even if the source data is normalized across multiple tables.

2. **Slowly Changing Dimensions (SCD)** — Handle attributes that change over time:
   - **SCD Type 1:** Overwrite old value. Simple but loses history.
   - **SCD Type 2:** Add new row with effective date range. Preserves history but increases complexity.
   - **SCD Type 3:** Add column for previous value. Simple history but limited to one prior value.

3. **Conformed dimensions** — Dimensions shared across multiple fact tables must be identical. If `dim_user` is used in both `fct_orders` and `fct_page_views`, the definition must be the same.

4. **Degenerate dimensions** — Dimensional attributes stored in the fact table itself (e.g., order_number) when they do not warrant a separate dimension table.

### The Date Dimension

Every analytical data model needs a date dimension with pre-calculated calendar attributes:

```sql
-- dim_date
date_key          -- surrogate key (integer: 20240115)
date_actual       -- DATE type: 2024-01-15
day_of_week       -- Monday, Tuesday, ...
day_of_week_num   -- 1-7
day_of_month      -- 1-31
day_of_year       -- 1-366
week_of_year      -- 1-53
month_num         -- 1-12
month_name        -- January, February, ...
quarter_num       -- 1-4
year_num          -- 2024
is_weekend        -- boolean
is_holiday        -- boolean
fiscal_quarter    -- company-specific fiscal calendar
fiscal_year       -- company-specific fiscal year
```

---

## The Metrics Layer

### The Problem It Solves

Without a metrics layer, metric definitions live in multiple places:
- Dashboard A calculates "Active Users" one way
- Dashboard B calculates it differently
- The data team's SQL uses a third definition
- The spreadsheet exported by the PM uses a fourth

The result: the same metric produces different numbers depending on where you look. This is the single biggest destroyer of data trust.

### What a Metrics Layer Is

A metrics layer (also called a semantic layer) is a centralized, code-defined layer that specifies:
- **What** metrics exist (names, descriptions)
- **How** they are calculated (SQL/logic)
- **What dimensions** they can be sliced by
- **What time grains** they support

Every downstream tool (BI, notebooks, APIs) consumes metrics from this single layer, guaranteeing consistency.

### Metrics Layer Implementations

| Tool | Approach | Integration |
|------|----------|-------------|
| dbt Metrics | YAML-defined metrics in dbt project | dbt-compatible BI tools |
| Looker LookML | Modeling language defining dimensions, measures, relationships | Looker BI |
| Cube.js | Semantic layer as a service | Any BI tool via SQL/REST API |
| Metabase Models | Curated questions and models | Metabase BI |
| Transform (now part of dbt) | Standalone metrics layer | Multi-tool via SQL API |

### Metric Definition Specification

```yaml
metrics:
  - name: weekly_active_users
    label: "Weekly Active Users"
    description: >
      Count of distinct users who performed at least one core action
      in a rolling 7-day window. Core actions: create, edit, share, comment.
      Excludes automated actions and known bots.
    type: count_distinct
    sql: user_id
    timestamp: activity_date
    time_grains: [day, week, month, quarter]
    dimensions:
      - platform
      - plan_tier
      - acquisition_channel
      - geography
    filters:
      - field: action_type
        operator: in
        value: ['create', 'edit', 'share', 'comment']
      - field: is_bot
        operator: "="
        value: false
    model: ref('fct_user_activity')
    owner: "Product Analytics Team"
    tags: [engagement, north-star-input]
```

---

## dbt Modeling Patterns

### The dbt Project Structure

```
models/
├── staging/              # 1:1 with source tables, minimal transformation
│   ├── stripe/
│   │   ├── _stripe__sources.yml
│   │   ├── stg_stripe__charges.sql
│   │   └── stg_stripe__customers.sql
│   ├── segment/
│   │   ├── _segment__sources.yml
│   │   ├── stg_segment__pages.sql
│   │   └── stg_segment__tracks.sql
│   └── app_db/
│       ├── _app_db__sources.yml
│       ├── stg_app_db__users.sql
│       └── stg_app_db__projects.sql
├── intermediate/         # Business logic transformations
│   ├── int_user_sessions.sql
│   ├── int_daily_user_activity.sql
│   └── int_order_items_enriched.sql
└── marts/               # Final models for BI consumption
    ├── core/
    │   ├── dim_users.sql
    │   ├── dim_dates.sql
    │   └── fct_orders.sql
    ├── product/
    │   ├── fct_user_activity.sql
    │   ├── fct_feature_adoption.sql
    │   └── dim_features.sql
    └── finance/
        ├── fct_mrr.sql
        └── fct_invoices.sql
```

### Layer Responsibilities

**Staging layer (`stg_`):**
- One model per source table
- Rename columns to consistent conventions
- Cast data types
- Apply basic filters (remove test data, known bad records)
- No joins, no business logic
- Naming: `stg_{source}__{entity}`

```sql
-- stg_stripe__charges.sql
with source as (
    select * from {{ source('stripe', 'charges') }}
),

renamed as (
    select
        id as charge_id,
        customer as customer_id,
        amount::decimal(10,2) / 100 as charge_amount_dollars,
        currency,
        status as charge_status,
        created::timestamp as charged_at,
        metadata
    from source
    where livemode = true  -- exclude test charges
)

select * from renamed
```

**Intermediate layer (`int_`):**
- Complex transformations, joins, window functions
- Business logic that multiple mart models need
- Naming: `int_{description}`

**Mart layer (`fct_`, `dim_`):**
- Final, BI-ready models
- Wide, denormalized where appropriate
- Optimized for query patterns of the consuming team
- Naming: `fct_{entity}` for facts, `dim_{entity}` for dimensions

### dbt Testing Patterns

```yaml
# schema.yml
models:
  - name: fct_orders
    description: "One row per order, grain: order_id"
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: user_key
        tests:
          - not_null
          - relationships:
              to: ref('dim_users')
              field: user_key
      - name: order_amount
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 100000
```

**Custom data tests:**
```sql
-- tests/assert_mrr_reconciles.sql
-- Verify that MRR from fct_mrr matches sum from fct_subscriptions
select
    month,
    abs(mrr_from_subscriptions - mrr_from_mrr_model) as discrepancy
from (
    select
        date_trunc('month', period_start) as month,
        sum(mrr) as mrr_from_subscriptions
    from {{ ref('fct_subscriptions') }}
    group by 1
) s
join (
    select month, total_mrr as mrr_from_mrr_model
    from {{ ref('fct_mrr') }}
) m using (month)
where abs(mrr_from_subscriptions - mrr_from_mrr_model) > 1.00
```

### dbt Best Practices

1. **ref() everything** — Never hardcode table names. Use `{{ ref('model_name') }}` to maintain lineage.
2. **Source freshness** — Define expected freshness for all sources and alert when data is stale.
3. **Incremental models** — For large fact tables, use incremental materialization to process only new/changed data.
4. **Documentation** — Every model and column should have a description in the YAML schema file.
5. **Version control** — dbt projects are code. Use branches, pull requests, and code review.
6. **CI/CD** — Run dbt tests in CI before merging changes to production.

---

## Wide Table Pattern (One Big Table / OBT)

### When to Denormalize Completely

For analytics use cases where query simplicity outweighs storage efficiency, the wide table pattern collapses multiple dimensions into a single table:

```sql
-- mart: fct_user_activity_wide
select
    a.activity_date,
    a.user_id,
    u.signup_date,
    u.plan_tier,
    u.acquisition_channel,
    u.country,
    a.session_count,
    a.page_views,
    a.core_actions,
    a.minutes_active,
    p.plan_name,
    p.plan_price,
    c.channel_group,
    d.day_of_week,
    d.is_weekend
from {{ ref('fct_daily_user_activity') }} a
left join {{ ref('dim_users') }} u on a.user_key = u.user_key
left join {{ ref('dim_plans') }} p on u.plan_key = p.plan_key
left join {{ ref('dim_channels') }} c on u.channel_key = c.channel_key
left join {{ ref('dim_dates') }} d on a.activity_date = d.date_actual
```

**Advantages:** Simple queries, no joins needed for analysts, fast BI tool performance.
**Disadvantages:** Data redundancy, larger storage, slower dbt build times.

**Use when:** The consuming audience is non-technical analysts using a BI tool. The query simplicity is worth the storage cost.

---

## Data Modeling Anti-Patterns

### Anti-Pattern 1: The Source Mirror
Exposing raw source tables directly to BI tools without transformation. Source tables have cryptic names, inconsistent types, and no documentation.

### Anti-Pattern 2: The Business Logic Spaghetti
Critical business logic embedded in BI tool calculated fields instead of the data model. When BI tools are swapped, all logic is lost. Business logic belongs in the transformation layer (dbt), not the presentation layer (Looker, Tableau).

### Anti-Pattern 3: The Unmaintained Model
Models built once and never updated as business definitions change. "Active user" meant one thing two years ago and something different today, but the model still uses the old definition.

### Anti-Pattern 4: No Tests
Models without data quality tests are ticking time bombs. A schema change upstream silently breaks the model, and no one notices until a board member asks about a suspicious number.

### Anti-Pattern 5: The Mega-Model
A single SQL query with 500+ lines, 20 joins, and embedded business logic. Break it into staged models with clear responsibilities.

---

**Data modeling is not a one-time setup activity. It is a living system that must evolve with the business, be tested like software, and be documented like an API. The quality of every downstream analysis depends on the quality of the data model.**

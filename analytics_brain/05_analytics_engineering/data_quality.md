# Data Quality — Testing, Freshness, Completeness, and Data Contracts

---

## Overview

Data quality is the foundation of the analytics hierarchy. Without trustworthy data, every metric, dashboard, analysis, and decision built on top of it is suspect. Data quality is not a one-time cleanup project — it is a continuous engineering practice that must be designed into the analytics infrastructure from day one.

This module covers data quality testing frameworks, freshness monitoring, completeness validation, documentation standards, and data contracts — the emerging practice of formalizing quality agreements between data producers and consumers. The standard is borrowed from software engineering: **untested data is broken data.**

---

## The Cost of Bad Data

### Trust Destruction Dynamics

Data trust follows an asymmetric pattern: it takes months to build and seconds to destroy.

```
Trust Level
   │
   │        ┌── Months of reliable reporting ──┐
   │       /                                    \
100%│──────/                                      \
   │     /                                        \
   │    /                                          \── One wrong number
   │   /                                            \   in a board meeting
   │  /                                              \
  0%│/                                                \______________
   └──────────────────────────────────────────────────────────────→ Time
```

**The cascade of bad data:**
1. A join fails silently — revenue figures drop by 15%
2. The dashboard shows the bad number for three days before anyone notices
3. An executive references the number in an investor conversation
4. When corrected, the executive questions all other numbers
5. For the next six months, every analytics deliverable is cross-checked manually
6. The organization reverts to spreadsheets and "gut feel"

**Prevention is orders of magnitude cheaper than repair.** Every dollar invested in data quality testing saves ten dollars in incident response and trust rebuilding.

---

## Data Quality Dimensions

### The Six Pillars

**1. Accuracy — Does the data correctly represent reality?**

Tests:
- Cross-reference event counts with application logs
- Verify financial figures against accounting systems
- Spot-check user attributes against source-of-truth systems
- Validate calculations against known benchmarks

```sql
-- Accuracy test: MRR should match Stripe's reported MRR within 1%
select
  abs(our_mrr - stripe_mrr) / stripe_mrr as mrr_discrepancy_pct
from (
  select sum(mrr) as our_mrr from {{ ref('fct_mrr') }} where month = current_month
) ours
cross join (
  select sum(amount) / 100.0 as stripe_mrr from {{ source('stripe', 'invoices') }}
  where status = 'paid' and period = current_month
) stripe
having mrr_discrepancy_pct > 0.01  -- Fail if >1% discrepancy
```

**2. Completeness — Is all expected data present?**

Tests:
- Row count checks against expected volumes
- NULL rate monitoring for required fields
- Gap detection in time series (missing hours, missing days)
- Coverage checks by segment (all expected countries present?)

```sql
-- Completeness test: No gaps in daily event data
select
  date,
  event_count
from (
  select
    date_trunc('day', event_timestamp) as date,
    count(*) as event_count
  from {{ ref('stg_segment__tracks') }}
  where event_timestamp >= current_date - interval '30 days'
  group by 1
)
where event_count < (select avg(event_count) * 0.5 from daily_counts)
-- Fail if any day has less than 50% of average volume
```

**3. Consistency — Does the same entity have the same representation everywhere?**

Tests:
- Cross-model consistency (user count in fct_orders matches dim_users)
- Cross-system consistency (CRM customer count matches billing system)
- Temporal consistency (metric value does not change retroactively without explanation)

```sql
-- Consistency test: Active users in fct_activity matches dim_users
select
  abs(count_from_activity - count_from_users) as user_count_discrepancy
from (
  select count(distinct user_id) as count_from_activity
  from {{ ref('fct_user_activity') }}
  where activity_date = current_date - 1
) a
cross join (
  select count(*) as count_from_users
  from {{ ref('dim_users') }}
  where is_active = true
) u
having user_count_discrepancy > 100  -- Fail if discrepancy exceeds tolerance
```

**4. Timeliness — Is the data available when needed?**

Tests:
- Source freshness checks (max timestamp should be recent)
- Pipeline completion time monitoring
- SLA violation tracking (data not ready by expected time)

```yaml
# dbt source freshness
sources:
  - name: segment
    database: analytics
    schema: raw_segment
    tables:
      - name: tracks
        loaded_at_field: received_at
        freshness:
          warn_after: {count: 2, period: hour}
          error_after: {count: 6, period: hour}
```

**5. Validity — Does the data conform to expected formats and rules?**

Tests:
- Accepted values (status must be one of: active, churned, trialing)
- Range checks (age between 0 and 120, revenue >= 0)
- Format validation (email format, phone format, date format)
- Referential integrity (every foreign key has a matching primary key)

```sql
-- Validity test: All subscription statuses are expected values
select status, count(*)
from {{ ref('fct_subscriptions') }}
where status not in ('active', 'trialing', 'past_due', 'canceled', 'unpaid')
group by 1
-- Should return zero rows
```

**6. Uniqueness — Is each entity represented exactly once?**

Tests:
- Primary key uniqueness (no duplicate order_ids)
- Business key uniqueness (no duplicate user_id + date combinations)
- Deduplication validation (event deduplication pipeline is working)

```sql
-- Uniqueness test: No duplicate orders
select
  order_id,
  count(*) as occurrences
from {{ ref('fct_orders') }}
group by 1
having count(*) > 1
-- Should return zero rows
```

---

## Data Testing Framework

### Test Pyramid for Data

Borrowing from software engineering's test pyramid:

```
           /  Integration Tests  \     ← Cross-model consistency, end-to-end checks
          / Unit Tests             \   ← Column-level tests, schema validation
         / Schema Tests              \ ← Structure, types, primary keys, not-nulls
        / Source Freshness             \← Data arrival time, pipeline health
       /________________________________\
```

### dbt Testing Implementation

**Schema tests (declarative):**
```yaml
models:
  - name: fct_orders
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: order_amount
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
      - name: order_status
        tests:
          - accepted_values:
              values: ['pending', 'completed', 'refunded', 'canceled']
      - name: user_key
        tests:
          - relationships:
              to: ref('dim_users')
              field: user_key
```

**Custom data tests (SQL-based):**
```sql
-- tests/assert_daily_revenue_reasonable.sql
-- Fail if daily revenue is more than 3 standard deviations from the 30-day mean
with daily_revenue as (
  select
    order_date,
    sum(order_amount) as revenue
  from {{ ref('fct_orders') }}
  where order_date >= current_date - interval '30 days'
  group by 1
),
stats as (
  select
    avg(revenue) as mean_revenue,
    stddev(revenue) as stddev_revenue
  from daily_revenue
  where order_date < current_date - 1
)
select
  d.order_date,
  d.revenue,
  s.mean_revenue,
  s.stddev_revenue,
  abs(d.revenue - s.mean_revenue) / nullif(s.stddev_revenue, 0) as z_score
from daily_revenue d
cross join stats s
where d.order_date = current_date - 1
  and abs(d.revenue - s.mean_revenue) / nullif(s.stddev_revenue, 0) > 3
```

### Test Execution Strategy

**On every dbt run (CI/CD):**
- All schema tests (unique, not_null, accepted_values, relationships)
- All custom data tests
- Source freshness checks

**Daily (scheduled):**
- Volume anomaly detection
- Cross-model reconciliation
- Historical consistency checks (metric values for past dates should not change)

**Weekly (manual review):**
- Sample-based accuracy audits (random sample of records verified against source)
- Coverage analysis (are all expected segments, time periods, and entities represented?)
- Test coverage review (are there untested models or columns?)

---

## Data Freshness Monitoring

### Freshness SLAs

Every data pipeline should have a defined freshness SLA:

| Data Type | Expected Freshness | Warning | Critical |
|-----------|-------------------|---------|----------|
| Behavioral events | < 1 hour | 2 hours | 6 hours |
| Transactional data | < 4 hours | 6 hours | 12 hours |
| Third-party extracts | < 24 hours | 36 hours | 48 hours |
| Aggregated models | < 6 hours after sources | 8 hours | 12 hours |

### Freshness Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│                 DATA FRESHNESS MONITOR                       │
├──────────────────┬──────────────┬──────────┬────────────────┤
│ Source           │ Last Update  │ Expected │ Status         │
├──────────────────┼──────────────┼──────────┼────────────────┤
│ Segment Events   │ 23 min ago   │ < 1 hr   │ 🟢 Fresh      │
│ Stripe Charges   │ 2.1 hr ago   │ < 4 hr   │ 🟢 Fresh      │
│ HubSpot Contacts │ 14 hr ago    │ < 24 hr  │ 🟢 Fresh      │
│ Google Ads       │ 38 hr ago    │ < 24 hr  │ 🟡 Warning     │
│ dbt Models       │ 45 min ago   │ < 6 hr   │ 🟢 Fresh      │
│ Facebook Ads     │ 52 hr ago    │ < 24 hr  │ 🔴 Critical    │
└──────────────────┴──────────────┴──────────┴────────────────┘
```

---

## Documentation Standards

### Model Documentation

Every dbt model must have:

```yaml
models:
  - name: fct_orders
    description: >
      One row per completed order. Grain: order_id.
      Includes all orders from all channels.
      Excludes test orders and internal orders.
      Refreshed daily at 06:00 UTC.
    meta:
      owner: "Analytics Engineering"
      tier: "Tier 1 — Business Critical"
      pii: true
      retention: "36 months rolling"
    columns:
      - name: order_id
        description: "Unique order identifier from the application database"
      - name: user_key
        description: "Surrogate key linking to dim_users"
      - name: order_amount
        description: "Total order amount in USD after discounts, before tax"
      - name: order_date
        description: "Date the order was placed (UTC)"
```

### Column-Level Documentation Checklist

For each column, document:
1. **What it represents** (business definition, not technical)
2. **Units** (dollars, cents, seconds, percentage expressed as 0.42 or 42)
3. **NULL handling** (can it be NULL? what does NULL mean?)
4. **Edge cases** (what happens with refunds, cancellations, etc.)
5. **Source** (which upstream system or model produces this value)

---

## Data Contracts

### The Producer-Consumer Agreement

A data contract is a formal agreement between a data producer (application team, vendor) and a data consumer (analytics team) that specifies:

```yaml
data_contract:
  name: "User Events Contract"
  version: "2.1"
  producer: "Product Engineering Team"
  consumer: "Analytics Engineering Team"

  schema:
    event_name:
      type: string
      required: true
      enum: [page_viewed, button_clicked, form_submitted, ...]
    user_id:
      type: string
      required: true
      format: "usr_[a-zA-Z0-9]{8}"
    timestamp:
      type: timestamp
      required: true
      timezone: UTC
    properties:
      type: object
      required: false

  quality_guarantees:
    completeness: "> 99.5% of events captured"
    latency: "< 5 seconds from event to warehouse"
    duplicates: "< 0.1% duplicate rate after deduplication"
    uptime: "99.9% pipeline availability"

  breaking_change_policy:
    notification: "14 days advance notice via Slack #data-contracts"
    migration: "Producer provides migration guide and supports dual-write for 30 days"
    approval: "Consumer must acknowledge before change is deployed"

  sla:
    freshness: "Events available in warehouse within 1 hour"
    response_time: "Schema violation alerts acknowledged within 4 business hours"
```

### Why Data Contracts Matter

Without contracts, breaking changes propagate silently:

```
1. App team renames event "signup_complete" to "registration_finished"
2. Staging model stg_events filters for "signup_complete" — finds nothing
3. Activation rate metric drops to zero
4. Dashboard shows 0% activation for 3 days
5. PM notices and files a bug
6. Analyst investigates, discovers the rename
7. Fix deployed, historical data backfilled
Total impact: 3 days of bad data, 8 hours of investigation, trust damage
```

With a data contract:
```
1. App team proposes rename in contract change request
2. Analytics team reviews, updates staging model
3. Both changes deploy simultaneously
4. No data quality incident
```

### Data Contract Implementation Approaches

**Lightweight (documentation-based):**
- YAML files in a shared repository
- Manual review during deploy process
- Suitable for small teams

**Medium (automated validation):**
- Schema validation in the event pipeline (reject non-conforming events)
- Automated tests that verify contract compliance
- Slack/email alerts on contract violations

**Heavy (full governance):**
- Schema registry (Confluent, AWS Glue)
- Automated contract enforcement at ingestion
- Version management and backward compatibility checks
- Formal approval workflows for contract changes

---

## Data Quality Incident Response

### When Data Goes Bad

**Step 1: Detect** (minutes)
Automated tests, freshness monitors, or user reports identify a data quality issue.

**Step 2: Assess Impact** (15 minutes)
- Which models and dashboards are affected?
- Which business decisions may have been made on bad data?
- How long has the issue been present?
- What is the blast radius?

**Step 3: Communicate** (30 minutes)
- Post in #data-incidents channel
- Tag affected dashboard owners
- Add a warning banner to affected dashboards
- Notify stakeholders who may have seen bad data

**Step 4: Diagnose** (hours)
- Trace the issue to its root cause (source data change, pipeline failure, model bug)
- Determine whether the fix is simple (rerun) or complex (code change + backfill)

**Step 5: Fix** (hours to days)
- Deploy the fix
- Backfill affected data
- Rerun all dependent models
- Verify all downstream dashboards

**Step 6: Post-Mortem** (within 1 week)
- Document: What happened? Why? How was it detected? How long did it persist?
- Identify: What test would have caught this earlier?
- Implement: Add the test. Update the data contract if applicable.

---

## Data Quality Metrics

Track the health of your data quality practice:

| Metric | Definition | Target |
|--------|-----------|--------|
| Test coverage | % of models with at least one test | > 95% |
| Column documentation | % of columns with descriptions | > 80% |
| Freshness SLA compliance | % of days meeting freshness targets | > 99% |
| Data incidents per month | Count of data quality incidents | Decreasing trend |
| Mean time to detect (MTTD) | Average time from issue onset to detection | < 2 hours |
| Mean time to resolve (MTTR) | Average time from detection to resolution | < 8 hours |
| Test pass rate | % of daily test runs that pass all tests | > 99% |

---

**Data quality is not a feature — it is a prerequisite. Every analytics capability in this brain assumes trustworthy data. When data quality fails, everything above it in the analytics hierarchy becomes unreliable.**

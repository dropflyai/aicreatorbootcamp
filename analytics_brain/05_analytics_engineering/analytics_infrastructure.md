# Analytics Infrastructure — The Stack That Powers Measurement

---

## Overview

Analytics infrastructure is the collection of tools, pipelines, and services that capture user behavior, store it reliably, transform it into analytical models, and serve it to decision-makers. A well-designed analytics infrastructure is invisible to its consumers — analysts query data, dashboards refresh, experiments report results, and no one thinks about the plumbing. A poorly designed one creates data gaps, latency complaints, conflicting numbers, and trust erosion.

This module covers the modern analytics stack: event tracking, Customer Data Platforms (CDPs), data warehouses, transformation layers, BI tools, and the semantic layer that ties them together. The architecture draws from the ELT paradigm (Extract, Load, Transform) that has supplanted traditional ETL in cloud-native organizations.

---

## The Modern Analytics Stack

```
┌───────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                                │
│  [Web App] [Mobile App] [Backend] [CRM] [Payment] [Ads] [Email]  │
└───────┬───────────────────────────────────────────────┬───────────┘
        │                                               │
        ▼                                               ▼
┌───────────────────┐                         ┌──────────────────┐
│   EVENT TRACKING  │                         │  DATA EXTRACTION │
│   (Segment,       │                         │  (Fivetran,      │
│    Rudderstack,   │                         │   Airbyte,       │
│    Snowplow)      │                         │   Stitch)        │
└───────┬───────────┘                         └────────┬─────────┘
        │                                              │
        └──────────────────┬───────────────────────────┘
                           ▼
                ┌─────────────────────┐
                │   DATA WAREHOUSE    │
                │   (Snowflake,       │
                │    BigQuery,        │
                │    Redshift,        │
                │    Databricks)      │
                └─────────┬───────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │   TRANSFORMATION    │
                │   (dbt)             │
                │   staging →         │
                │   intermediate →    │
                │   marts             │
                └─────────┬───────────┘
                          │
              ┌───────────┼───────────────┐
              ▼           ▼               ▼
    ┌──────────────┐ ┌──────────┐ ┌──────────────┐
    │  SEMANTIC     │ │  BI TOOL │ │  REVERSE ETL │
    │  LAYER        │ │ (Looker, │ │ (Census,     │
    │ (Cube, dbt   │ │ Tableau, │ │  Hightouch)  │
    │  metrics)    │ │ Metabase)│ │              │
    └──────────────┘ └──────────┘ └──────────────┘
```

---

## Event Tracking Infrastructure

### What Gets Tracked

Event tracking captures user interactions with the product. Every meaningful user action generates an event that is sent to the analytics pipeline.

**Event anatomy:**
```json
{
  "event": "project_created",
  "user_id": "usr_abc123",
  "anonymous_id": "anon_xyz789",
  "timestamp": "2024-06-15T14:23:45.123Z",
  "properties": {
    "project_id": "proj_def456",
    "project_type": "blank",
    "template_used": false,
    "team_id": "team_ghi789"
  },
  "context": {
    "device": "desktop",
    "os": "macOS",
    "browser": "Chrome 125",
    "locale": "en-US",
    "ip": "192.168.1.1",
    "page": {
      "url": "https://app.example.com/projects/new",
      "path": "/projects/new",
      "referrer": "https://app.example.com/dashboard"
    }
  }
}
```

### Customer Data Platforms (CDPs)

CDPs serve as the routing layer between event sources and analytical destinations.

**Segment (Twilio):**
- Market leader with broadest integration catalog (300+ destinations)
- Client-side (analytics.js) and server-side (Node, Python) SDKs
- Protocols feature for event schema governance
- Pricing: per monthly tracked user (MTU)

**RudderStack:**
- Open-source alternative to Segment
- Warehouse-first architecture (data flows to warehouse before destinations)
- Self-hosted or cloud-hosted
- Lower cost at scale

**Snowplow:**
- Open-source behavioral data platform
- Maximum data ownership and control
- Self-hosted pipeline with real-time and batch processing
- Best for organizations with strong engineering teams and data sovereignty requirements

### CDP Selection Criteria

| Criterion | Consideration |
|-----------|--------------|
| Integration catalog | Does it connect to all your sources and destinations? |
| Schema governance | Can you enforce event schemas and block non-conforming events? |
| Identity resolution | How does it handle cross-device and cross-session identity? |
| Data residency | Where is data stored? Compliance with GDPR, CCPA? |
| Cost model | Per-event, per-MTU, or flat pricing? |
| Self-hosted option | Can you run it on your own infrastructure? |
| Real-time support | Does it support streaming use cases (personalization, real-time triggers)? |

---

## Data Warehouse

### The Analytical Storage Layer

The data warehouse is the central repository for all analytical data. Modern cloud data warehouses separate storage from compute, enabling independent scaling.

**Snowflake:**
- Fully managed, multi-cloud (AWS, GCP, Azure)
- Separate storage and compute with instant elasticity
- Time travel (query historical states) and data sharing
- Strong ecosystem of tools and integrations
- Pay per compute second + storage

**Google BigQuery:**
- Serverless — no infrastructure management
- Columnar storage with built-in ML (BigQuery ML)
- Streaming inserts for near-real-time data
- Pay per query (on-demand) or flat-rate pricing
- Deeply integrated with Google ecosystem

**Amazon Redshift:**
- AWS-native, strong for existing AWS customers
- Redshift Serverless for on-demand workloads
- Spectrum for querying data lake (S3) directly
- RA3 nodes separate storage and compute

**Databricks:**
- Lakehouse architecture (combines data lake and data warehouse)
- Strong for organizations also doing ML/AI workloads
- Apache Spark-based processing
- Delta Lake for ACID transactions on data lake storage

### Warehouse Architecture Layers

```
RAW LAYER (Landing Zone)
├── Raw event data (as received from sources)
├── Raw API extracts (CRM, payment, ads platforms)
├── Purpose: Immutable historical record
├── Access: Data engineers only
└── Retention: Indefinite

STAGING LAYER (Cleaned)
├── 1:1 mapping to source tables
├── Renamed, typed, filtered (no test data)
├── Purpose: Clean interface to raw data
├── Access: Analytics engineers
└── Materialization: Views or ephemeral

INTERMEDIATE LAYER (Transformed)
├── Business logic, joins, window functions
├── Shared transformations used by multiple marts
├── Purpose: DRY business logic
├── Access: Analytics engineers
└── Materialization: Tables or ephemeral

MART LAYER (Consumption)
├── Final analytical models (facts and dimensions)
├── Optimized for BI tool query patterns
├── Purpose: Self-serve analytics
├── Access: All analysts and BI tools
└── Materialization: Tables (incremental where appropriate)
```

---

## BI Tools

### The Presentation Layer

BI tools consume data from the warehouse (typically from the mart layer or semantic layer) and present it as dashboards, reports, and interactive explorations.

**Looker (Google):**
- LookML modeling language defines a semantic layer
- Strong data governance and centralized metric definitions
- Version-controlled models in Git
- Best for organizations that want tight metric governance
- Higher learning curve, higher organizational value

**Tableau:**
- Industry-leading visualization capabilities
- Drag-and-drop interface for rapid exploration
- Tableau Prep for data preparation
- Large user community and learning resources
- Best for organizations that prioritize visual exploration

**Metabase:**
- Open-source, easy to self-host
- Natural language queries (ask questions in English)
- Low learning curve, fast time-to-value
- Best for small-to-medium teams and startups
- Limited at enterprise scale

**Mode:**
- SQL-first analytics platform
- Notebook-style interface combining SQL, Python, and visualization
- Strong for analyst-heavy teams
- Collaborative features for sharing analyses

**Superset (Apache):**
- Open-source, maintained by Apache Foundation
- Rich visualization library
- SQL Lab for ad-hoc querying
- Dashboard builder with drill-down capabilities
- Self-hosted or managed (Preset.io)

### BI Tool Selection Criteria

| Criterion | Questions to Ask |
|-----------|-----------------|
| Audience technical level | How SQL-savvy are the primary users? |
| Governance requirements | How tightly do metric definitions need to be controlled? |
| Exploration vs. reporting | Is the primary use case ad-hoc exploration or standardized reporting? |
| Self-serve ambition | Should business users build their own dashboards? |
| Embedding | Do you need to embed analytics in your product? |
| Budget | Open-source (self-host) vs. commercial (managed)? |
| Existing ecosystem | What tools do you already use? Integration matters. |

---

## Semantic Layer

### The Consistency Guarantor

The semantic layer sits between the warehouse and the BI tool, providing a centralized definition of metrics, dimensions, and relationships. Its purpose: guarantee that "Weekly Active Users" means exactly the same thing in every dashboard, report, and analysis.

### Semantic Layer Architecture

```
┌─────────────────────────────────────────────┐
│               CONSUMERS                      │
│  [Dashboard] [Notebook] [API] [Spreadsheet] │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────┴──────────┐
         │   SEMANTIC LAYER    │
         │  ┌──────────────┐  │
         │  │ Metrics      │  │  ← Centralized calculations
         │  │ Dimensions   │  │  ← Governed slice-by attributes
         │  │ Relationships│  │  ← Join paths
         │  │ Access Rules │  │  ← Row/column level security
         │  └──────────────┘  │
         └─────────┬──────────┘
                   │
         ┌─────────┴──────────┐
         │   DATA WAREHOUSE    │
         │  [Marts] [Facts]    │
         │  [Dimensions]       │
         └─────────────────────┘
```

### What the Semantic Layer Defines

**Metrics:**
```yaml
- name: monthly_recurring_revenue
  type: sum
  expression: mrr_amount
  model: fct_subscriptions
  time_dimension: period_start_date
  filters:
    - subscription_status = 'active'
```

**Dimensions:**
```yaml
- name: plan_tier
  type: categorical
  expression: plan_tier
  model: dim_subscriptions
  values: [free, basic, pro, enterprise]
```

**Relationships (join paths):**
```yaml
- left_model: fct_subscriptions
  right_model: dim_users
  join_type: left
  condition: fct_subscriptions.user_key = dim_users.user_key
```

---

## Reverse ETL

### Activating Analytical Data

Reverse ETL takes data from the warehouse and pushes it back into operational tools (CRM, marketing automation, customer success platforms). This closes the loop between analysis and action.

**Use cases:**
- Sync user segments from the warehouse to the email platform for targeted campaigns
- Push lead scores from analytical models to the CRM for sales prioritization
- Update customer health scores in the customer success platform
- Sync product usage data to the support platform for context

**Tools:** Census, Hightouch, Polytomic, Grouparoo (open-source)

### Reverse ETL Architecture

```
Warehouse (segment model: dim_user_segments)
  → Reverse ETL tool (Census, Hightouch)
    → Destination: CRM (Salesforce, HubSpot)
    → Destination: Email (Braze, Iterable, Customer.io)
    → Destination: Support (Zendesk, Intercom)
    → Destination: Ad platforms (Facebook Custom Audiences, Google)
```

---

## Infrastructure Selection Framework

### Stage-Appropriate Stack

**Seed Stage / MVP (0-10 employees, $0-$1M ARR):**
```
Tracking:   Segment (free tier) or PostHog (open-source)
Warehouse:  BigQuery (free tier) or DuckDB (local)
Transform:  SQL scripts or minimal dbt
BI:         Metabase (open-source) or Mode (free tier)
Cost:       $0-500/month
```

**Growth Stage (10-50 employees, $1M-$10M ARR):**
```
Tracking:   Segment or RudderStack
Warehouse:  Snowflake or BigQuery
Transform:  dbt Cloud or dbt Core
BI:         Looker, Tableau, or Metabase Cloud
Reverse ETL: Census or Hightouch
Cost:       $2,000-10,000/month
```

**Scale Stage (50-200 employees, $10M-$100M ARR):**
```
Tracking:   Segment, RudderStack, or Snowplow
Warehouse:  Snowflake or BigQuery (multi-cluster)
Transform:  dbt Cloud (Team or Enterprise)
Semantic:   Looker LookML or Cube
BI:         Looker + Tableau (different audiences)
Reverse ETL: Census or Hightouch (enterprise)
Orchestration: Airflow or Dagster
Cost:       $10,000-50,000/month
```

---

## Infrastructure Anti-Patterns

### Anti-Pattern 1: Tool Proliferation
Five different BI tools, three different tracking systems, and two warehouses. Each tool has different metric definitions. Consolidation is painful but necessary.

### Anti-Pattern 2: No Staging Layer
Raw source data queried directly by BI tools. When source schemas change, dashboards break immediately with no buffer.

### Anti-Pattern 3: Spreadsheet as Warehouse
Critical business metrics maintained in Google Sheets or Excel. No version control, no testing, no lineage, no scalability.

### Anti-Pattern 4: Event Tracking Without Governance
Every developer adds events with whatever names and properties they choose. The result is an untraceable mess of inconsistent event data that no analyst can reliably query.

### Anti-Pattern 5: Over-Engineering
A 5-person startup with Snowflake, dbt Cloud Enterprise, Looker, Census, Airflow, and a data engineer. This stack is designed for 100-person organizations. Start simple, add complexity only when the previous tool is genuinely insufficient.

---

**Infrastructure is not the goal — it is the enabler. The goal is trustworthy, accessible data that drives better decisions. The best infrastructure is the simplest one that achieves this goal for your current stage.**

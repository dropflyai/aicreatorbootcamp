# Data Governance Framework — Operating Model, Stewardship, and Quality

## Overview

Data governance is the organizational discipline that ensures data is managed as a
strategic asset with defined ownership, quality standards, access controls, and
lifecycle management. This module covers governance operating models, stewardship
roles, data quality dimensions and measurement, master data management, and the
organizational structures that make governance effective rather than bureaucratic.
Good governance enables data democratization; bad governance blocks it.

References: DAMA International (DMBOK 2.0), Ladley (Data Governance: How to Design,
Deploy, and Sustain an Effective Data Governance Program), Seiner (Non-Invasive Data
Governance), DCAM (Data Management Capability Assessment Model), ISO 8000.

---

## Governance Operating Model

### Three Models

**Centralized Governance**
```
┌─────────────────────────┐
│   Chief Data Officer    │
│   (Central Authority)   │
├─────────────────────────┤
│  Data Governance Team   │
│  - Policies             │
│  - Standards            │
│  - Enforcement          │
├─────────────────────────┤
│  All Domains Follow     │
│  Central Rules          │
└─────────────────────────┘
```
- Single team sets all policies and standards
- Consistent enforcement across the organization
- Risk: bottleneck, slow to respond to domain needs

**Federated Governance**
```
┌─────────────────────────┐
│   Governance Council    │
│   (Sets Principles)     │
├─────┬─────┬─────┬───────┤
│Dom A│Dom B│Dom C│Dom D  │
│Gov  │Gov  │Gov  │Gov    │
│Lead │Lead │Lead │Lead   │
└─────┴─────┴─────┴───────┘
```
- Each domain has its own governance lead
- Central council sets global policies; domains implement locally
- Balances consistency with domain autonomy

**Data Mesh Governance (Federated Computational)**
- Global interoperability standards defined computationally
- Domain teams self-govern within guardrails
- Platform provides automated compliance checks
- Policies as code, not documents

### Governance Structure

| Role | Responsibility | Scope |
|------|---------------|-------|
| Chief Data Officer | Executive sponsorship, strategy | Organization |
| Data Governance Council | Policy decisions, conflict resolution | Organization |
| Data Domain Owner | Accountability for domain data assets | Domain |
| Data Steward | Day-to-day quality, documentation | Data product |
| Data Custodian | Technical implementation, access control | Systems |
| Data Consumer | Provide feedback, report quality issues | Self |

---

## Data Stewardship

### Steward Responsibilities

1. **Define data definitions**: business glossary entries, semantic meaning
2. **Document data lineage**: source to consumption tracing
3. **Monitor data quality**: define rules, investigate failures
4. **Manage access**: approve/deny data access requests
5. **Resolve issues**: triage and fix data quality incidents
6. **Maintain metadata**: keep catalog entries current

### Stewardship Models

**Dedicated Stewards**: full-time governance roles
- Thorough, consistent
- Expensive, may lack domain context

**Embedded Stewards**: domain experts with part-time governance duties
- Deep domain knowledge
- Governance competes with primary responsibilities

**Non-Invasive (Seiner)**: recognize existing behaviors as governance acts
- Identify people already defining, producing, and using data
- Formalize their existing roles rather than creating new ones
- Lowest organizational resistance

### Business Glossary

A governed dictionary of business terms with precise definitions.

```yaml
term: Annual Recurring Revenue (ARR)
definition: >
  The annualized value of active subscription contracts at a point in time.
  Includes recurring subscription revenue only. Excludes one-time fees,
  professional services, and usage-based overages.
formula: "SUM(monthly_recurring_revenue * 12) for active contracts"
owner: Finance Domain
steward: revenue-operations-lead
related_terms: [MRR, NRR, Bookings, TCV]
source_system: billing_platform
last_reviewed: 2024-06-01
status: approved
```

---

## Data Quality Dimensions

### The Six Dimensions (DAMA)

| Dimension | Definition | Measurement |
|-----------|-----------|-------------|
| **Completeness** | All required data is present | % non-null for required fields |
| **Accuracy** | Data correctly represents real-world values | % matching authoritative source |
| **Consistency** | Data agrees across systems and over time | % matching cross-system checks |
| **Timeliness** | Data is available when needed | Freshness: time since last update |
| **Validity** | Data conforms to defined rules | % passing validation rules |
| **Uniqueness** | No unintended duplicates | % unique on designated keys |

### Additional Dimensions

| Dimension | Definition |
|-----------|-----------|
| **Conformity** | Data matches expected format/pattern |
| **Integrity** | Referential relationships are maintained |
| **Relevance** | Data serves the intended business purpose |
| **Accessibility** | Data can be retrieved by authorized users |

### Data Quality Rules

```yaml
# Data quality rules for orders table
table: fct_orders

rules:
  - name: order_id_unique
    dimension: uniqueness
    check: "COUNT(*) = COUNT(DISTINCT order_id)"
    severity: critical

  - name: amount_positive
    dimension: validity
    check: "amount > 0 FOR ALL rows"
    severity: high

  - name: customer_id_exists
    dimension: integrity
    check: "ALL customer_id IN dim_customer.customer_id"
    severity: high

  - name: order_date_not_future
    dimension: validity
    check: "order_date <= CURRENT_DATE()"
    severity: medium

  - name: no_null_required_fields
    dimension: completeness
    check: "order_id, customer_id, amount, order_date ARE NOT NULL"
    severity: critical

  - name: freshness
    dimension: timeliness
    check: "MAX(loaded_at) > NOW() - INTERVAL '2 hours'"
    severity: high
```

### Data Quality Score

```
DQ Score = weighted average of dimension scores

Score = w_completeness * S_completeness
      + w_accuracy * S_accuracy
      + w_consistency * S_consistency
      + w_timeliness * S_timeliness
      + w_validity * S_validity
      + w_uniqueness * S_uniqueness

where S_dimension = (rules_passing / total_rules) for that dimension

Typical weights:
  Completeness: 0.20
  Accuracy: 0.25
  Consistency: 0.15
  Timeliness: 0.15
  Validity: 0.15
  Uniqueness: 0.10
```

### Great Expectations Implementation

```python
import great_expectations as gx

context = gx.get_context()

# Define expectations
suite = context.add_expectation_suite("orders_quality")

suite.add_expectation(
    gx.expectations.ExpectColumnValuesToNotBeNull(column="order_id")
)
suite.add_expectation(
    gx.expectations.ExpectColumnValuesToBeUnique(column="order_id")
)
suite.add_expectation(
    gx.expectations.ExpectColumnValuesToBeBetween(
        column="amount", min_value=0, max_value=1000000
    )
)
suite.add_expectation(
    gx.expectations.ExpectColumnValuesToBeInSet(
        column="status", value_set=["pending", "completed", "cancelled"]
    )
)

# Run validation
results = context.run_checkpoint(checkpoint_name="orders_checkpoint")
```

---

## Master Data Management (MDM)

### Definition

MDM ensures that shared, critical business entities (customers, products,
locations, employees) have a single, authoritative source of truth.

### MDM Styles

| Style | Approach | Trade-off |
|-------|---------|-----------|
| Registry | Link records across systems, no golden copy | Low cost, no single source |
| Consolidation | Create golden copy in MDM hub, read-only | Single source, one-way |
| Coexistence | Golden copy synced bidirectionally with sources | Full consistency, complex |
| Centralized | MDM hub is the system of record | Full control, highest cost |

### Entity Resolution

The process of determining whether two records refer to the same entity.

```
Record A: {name: "John Smith", email: "jsmith@corp.com", phone: "555-0123"}
Record B: {name: "J. Smith", email: "john.smith@corp.com", phone: "555-0123"}

Steps:
1. Blocking: candidate pairs based on phone number match
2. Comparison: Jaro-Winkler distance on name, exact match on phone
3. Classification: match/non-match/possible match
4. Merge: create golden record with highest-quality attributes
```

### Golden Record Construction

```
Priority rules by attribute:
  email:   CRM > billing > marketing (CRM is most authoritative)
  address: billing > CRM > marketing
  name:    CRM > billing > marketing

Survivorship:
  Most recent wins for volatile attributes (address, phone)
  Most authoritative wins for stable attributes (name, date of birth)
```

---

## Data Lifecycle Management

### Stages

```
1. Creation/Acquisition
   └── Data is generated or ingested from external sources

2. Storage
   └── Raw data lands in bronze/raw zone

3. Processing
   └── Cleaned, transformed, modeled (silver/gold zones)

4. Usage
   └── Consumed by analytics, ML, applications

5. Archival
   └── Moved to cold storage after active use period

6. Deletion
   └── Purged per retention policy or privacy request
```

### Retention Policies

| Data Category | Retention | Rationale |
|--------------|-----------|-----------|
| Financial records | 7 years | Tax/audit requirements |
| Customer PII | Until consent withdrawal + 30 days | GDPR/CCPA |
| Application logs | 90 days | Debugging, security |
| ML training data | Duration of model lifecycle | Reproducibility |
| Analytics events | 2 years | Trend analysis |
| Backups | 30 days | Recovery |

---

## Data Governance Maturity Model

### Levels

| Level | Name | Characteristics |
|-------|------|----------------|
| 1 | Initial | Ad hoc, no formal governance, tribal knowledge |
| 2 | Managed | Basic policies documented, some ownership defined |
| 3 | Defined | Governance program established, stewards active |
| 4 | Measured | Quality metrics tracked, SLAs enforced |
| 5 | Optimized | Automated governance, continuous improvement |

### Assessment Framework

```
Dimension scores (1-5):
  Strategy and vision:        [_]
  Organizational structure:   [_]
  Policies and standards:     [_]
  Data quality management:    [_]
  Metadata management:        [_]
  Master data management:     [_]
  Privacy and security:       [_]
  Data architecture:          [_]
  Technology and tooling:     [_]
  Culture and change mgmt:    [_]

Overall maturity = average across dimensions
```

---

## Production Checklist

- [ ] Governance operating model selected and roles staffed
- [ ] Data stewards assigned for all critical data products
- [ ] Business glossary established with term definitions
- [ ] Data quality dimensions defined with measurable rules
- [ ] Quality scoring automated and tracked over time
- [ ] Master data entities identified with golden record strategy
- [ ] Data catalog deployed with business metadata
- [ ] Retention policies defined and automated
- [ ] Governance maturity assessed with improvement roadmap
- [ ] Quarterly governance review cadence established

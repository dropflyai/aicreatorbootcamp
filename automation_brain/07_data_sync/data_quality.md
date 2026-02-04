# Data Quality: Validation, Cleansing, Deduplication, and Reconciliation

## Overview

Data quality is the foundation of reliable automation. When automation systems process and move data between systems, they amplify any quality issues: a misspelled email in one system becomes a misspelled email in five systems. This module covers data validation rules, cleansing techniques, deduplication strategies, and reconciliation processes that ensure the data flowing through automation pipelines is accurate, complete, consistent, and timely.

---

## 1. Data Quality Dimensions

### 1.1 The Six Dimensions

| Dimension | Definition | Example of Poor Quality |
|-----------|-----------|----------------------|
| Accuracy | Data correctly represents the real-world entity | Phone number has wrong digits |
| Completeness | All required data is present | Missing email address on contact |
| Consistency | Same data is represented the same way across systems | "USA" in one system, "United States" in another |
| Timeliness | Data is current and available when needed | Address not updated after customer move |
| Uniqueness | Each entity is represented once (no duplicates) | Same customer appears twice with different IDs |
| Validity | Data conforms to defined rules and formats | Date field contains "March 15" instead of "2024-03-15" |

### 1.2 Data Quality Measurement

For each data field, measure quality across applicable dimensions:

```
Quality Score = (valid_records / total_records) * 100

Example:
  Total contacts: 10,000
  Contacts with valid email: 9,500
  Email quality score: 95%
```

### 1.3 Quality Thresholds

| Dimension | Critical Fields | Standard Fields | Low-Priority Fields |
|-----------|----------------|-----------------|-------------------|
| Accuracy | > 99% | > 95% | > 90% |
| Completeness | > 99% | > 90% | > 80% |
| Consistency | > 99% | > 95% | > 90% |
| Uniqueness | > 99.5% | > 98% | > 95% |
| Validity | 100% | > 99% | > 95% |

---

## 2. Validation Rules

### 2.1 Field-Level Validation

| Field Type | Validation Rules |
|-----------|-----------------|
| Email | RFC 5322 format, valid domain (MX record exists), not disposable |
| Phone | E.164 format, valid country code, correct length |
| Date | ISO 8601 format, valid date (not Feb 30), reasonable range |
| URL | Valid scheme (http/https), reachable (optional), no malicious patterns |
| Currency | Numeric, positive (or explicitly signed), reasonable range |
| Address | Required components present (street, city, postal code, country) |
| Name | Non-empty, reasonable length, no control characters |
| ID/Reference | Matches expected format (regex), exists in reference system |

### 2.2 Record-Level Validation

Cross-field validation rules:

```python
rules = [
    # Logical consistency
    {"rule": "end_date >= start_date", "message": "End date before start date"},
    {"rule": "age >= 18 if account_type == 'adult'", "message": "Underage adult account"},
    {"rule": "discount_amount <= total_amount", "message": "Discount exceeds total"},

    # Completeness dependencies
    {"rule": "if country == 'US' then state is not null", "message": "US address missing state"},
    {"rule": "if payment_type == 'card' then card_last_four is not null", "message": "Card payment missing card details"},

    # Business rules
    {"rule": "order_total == sum(line_item_totals)", "message": "Order total mismatch"},
    {"rule": "quantity > 0", "message": "Zero or negative quantity"},
]
```

### 2.3 Dataset-Level Validation

| Check | Description | When to Run |
|-------|-------------|-------------|
| Row count | Within expected range of previous run | Every pipeline run |
| Null rate | % of nulls per field within threshold | Every pipeline run |
| Value distribution | No unexpected category values | Weekly |
| Referential integrity | Foreign keys resolve | Every pipeline run |
| Freshness | Most recent record within expected time | Every pipeline run |
| Statistical distribution | Mean/std/min/max within expected ranges | Weekly |

### 2.4 Validation Pipeline

```
Data Input
    |
    v
[Field Validation] --> Invalid records --> [Error Queue]
    |
    v (valid fields)
[Record Validation] --> Invalid records --> [Error Queue]
    |
    v (valid records)
[Dataset Validation] --> Quality alerts if thresholds breached
    |
    v
[Validated Data] --> Continue pipeline
```

---

## 3. Data Cleansing

### 3.1 Cleansing Operations

| Operation | Input | Output | Technique |
|-----------|-------|--------|-----------|
| Standardize names | "JOHN DOE", "john doe" | "John Doe" | Title case, trim whitespace |
| Standardize phone | "(555) 123-4567", "5551234567" | "+15551234567" | Parse and format to E.164 |
| Standardize address | "123 Main St.", "123 Main Street" | Standardized format | Address parsing library |
| Standardize dates | "3/15/24", "March 15, 2024" | "2024-03-15" | Date parsing with format detection |
| Standardize country | "US", "USA", "United States" | "US" (ISO 3166-1 alpha-2) | Lookup table |
| Fix encoding | "Caf\u00e9" | "Cafe" or proper UTF-8 | Character encoding detection |
| Remove HTML | "<p>Hello</p>" | "Hello" | HTML stripping |

### 3.2 Cleansing Best Practices

**Preserve Originals**: Always keep the original data alongside cleaned data. This enables audit and allows reverting if the cleansing logic is incorrect.

**Idempotent Cleansing**: Running the cleansing process twice should produce the same result as running it once.

**Log All Changes**: Record every modification made during cleansing, including what was changed, why, and the before/after values.

**Validate After Cleansing**: Run validation again after cleansing to verify that cleansing did not introduce new issues.

---

## 4. Deduplication

### 4.1 Deduplication Strategy

```
Data Input
    |
    v
[Blocking] - Group potentially matching records to reduce comparison space
    |
    v
[Matching] - Compare records within blocks using similarity metrics
    |
    v
[Clustering] - Group matching records into clusters (each cluster = one entity)
    |
    v
[Merging] - Create a single golden record from each cluster
    |
    v
[Deduplicated Data]
```

### 4.2 Blocking Strategies

Comparing every record pair is O(n^2), which is infeasible for large datasets. Blocking reduces the comparison space:

| Strategy | Description | Example |
|----------|-------------|---------|
| Exact block | Group by exact field value | Same last name and zip code |
| Phonetic block | Group by phonetic encoding | Soundex("Smith") = Soundex("Smyth") |
| N-gram block | Group by shared character n-grams | Records sharing 3+ character trigrams |
| Sorted neighborhood | Sort by key and compare adjacent records | Sort by name, compare within window of 5 |

### 4.3 Matching Techniques

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| Exact match | Fields are identical | IDs, email addresses |
| Fuzzy match | Fields are similar (Levenshtein, Jaro-Winkler) | Names, addresses |
| Phonetic match | Fields sound similar (Soundex, Metaphone) | Names with spelling variants |
| Token match | Fields share the same tokens in any order | Company names ("ABC Corp" = "Corp ABC") |
| ML match | Trained model predicts match probability | Complex multi-field matching |

### 4.4 Merge Strategies

When multiple records are identified as the same entity, create a single "golden record":

| Strategy | Rule |
|----------|------|
| Most complete | Keep the record with fewest null fields |
| Most recent | Keep the most recently updated record |
| Source priority | Prefer records from the authoritative source |
| Field-level best | For each field, select the best value across all duplicate records |
| Manual | Route to human for merge decisions (high-value records) |

---

## 5. Reconciliation

### 5.1 Reconciliation Types

**Count Reconciliation**: Verify record counts match between source and target.

**Value Reconciliation**: Verify data values match between systems for sampled records.

**Aggregate Reconciliation**: Verify aggregated values (sums, counts) match between systems.

**Full Reconciliation**: Compare every record between systems to find all discrepancies.

### 5.2 Reconciliation Process

```
1. Extract summary data from System A
2. Extract summary data from System B
3. Compare summaries:
   a. Record counts by category
   b. Sum of numeric fields
   c. Latest modification timestamps
4. If summaries match: reconciliation passes
5. If summaries differ: drill down to identify specific discrepancies
6. For each discrepancy:
   a. Determine the correct value
   b. Apply correction to the incorrect system
   c. Log the correction for audit
7. Generate reconciliation report
```

### 5.3 Reconciliation Scheduling

| Type | Frequency | Scope |
|------|-----------|-------|
| Count check | Every sync cycle | All records |
| Value check | Daily | Random sample (5-10%) |
| Aggregate check | Daily | Key business metrics |
| Full reconciliation | Weekly/Monthly | All records, all fields |

---

## 6. Data Quality Monitoring

### 6.1 Quality Dashboard

Track data quality metrics over time:
- Quality score per field (trend line)
- Duplicate rate (trend line)
- Validation failure rate by rule
- Cleansing volume (records modified per pipeline run)
- Reconciliation discrepancy rate

### 6.2 Quality Alerts

| Condition | Severity | Action |
|-----------|----------|--------|
| Quality score drops below threshold | High | Investigate data source |
| Duplicate rate increases > 50% | Warning | Review dedup rules |
| Validation failure rate spikes | High | Check source system changes |
| Reconciliation discrepancy > 1% | High | Investigate sync pipeline |

### 6.3 Quality Reporting

Generate periodic quality reports:
- Overall data quality score by system
- Top quality issues by field and rule
- Quality trend over time
- Remediation actions taken and their impact
- Recommendations for quality improvement

---

## 7. Data Quality Tools

| Tool | Type | Best For |
|------|------|----------|
| Great Expectations | Validation framework | Automated data validation |
| dbt tests | SQL-based validation | Warehouse data quality |
| Soda | Data quality monitoring | Continuous data monitoring |
| Dedupe.io | ML deduplication | Python-based entity resolution |
| OpenRefine | Data cleansing | Manual data exploration and cleansing |

---

## 8. Key References

- Redman (2001) -- "Data Quality: The Field Guide"
- Dasu & Johnson (2003) -- "Exploratory Data Mining and Data Cleaning"
- Great Expectations Documentation -- Data validation framework
- Soda Documentation -- Data quality monitoring

---

*This module covers data quality. See `sync_patterns.md` for sync architecture and `etl_automation.md` for data pipeline automation.*

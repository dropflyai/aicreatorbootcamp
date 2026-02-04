# Data Mapping

## Transformation, Schema Mapping, Validation, and Type Coercion for Automation

Data mapping is the discipline of transforming data from one system's schema to another's. In integration architecture, data mapping is responsible for more production failures than any other component (MuleSoft Integration Report, 2023). This module codifies the theory and practice of correct, maintainable, and resilient data transformation in automated workflows.

---

## 1. Data Mapping Theory

### The Mapping Problem

Given a source schema S and a target schema T, a data mapping M is a function M: S -> T that transforms instances of S into instances of T. The mapping must preserve semantic meaning while adapting structural representation.

**Formal definition**: For source schema S = {s1, s2, ..., sn} and target schema T = {t1, t2, ..., tm}, a mapping M is a set of rules {r1, r2, ..., rk} where each rule ri defines how one or more source fields produce one or more target fields.

### Mapping Classification

**Direct mapping (1:1)**: One source field maps to one target field. Example: `source.email -> target.email_address`. May involve renaming only.

**Combining mapping (N:1)**: Multiple source fields produce one target field. Example: `source.first_name + " " + source.last_name -> target.full_name`.

**Splitting mapping (1:N)**: One source field produces multiple target fields. Example: `source.full_name -> target.first_name, target.last_name`.

**Computed mapping**: Target field is derived from source fields through computation. Example: `source.quantity * source.unit_price -> target.line_total`.

**Constant mapping**: Target field receives a fixed value regardless of source data. Example: `"active" -> target.status`.

**Conditional mapping**: Target field value depends on a condition. Example: `if source.amount > 1000 then "high" else "low" -> target.priority`.

**Lookup mapping**: Target field is obtained by looking up source field value in a reference table. Example: `lookup(source.country_code, country_table) -> target.country_name`.

### Information-Theoretic Perspective

From Shannon's information theory (1948), data transformation has entropy implications:

**Lossless transformation**: H(source) = H(target). No information is destroyed. The original data can be reconstructed from the transformed data. Example: JSON to XML with full schema mapping.

**Lossy transformation**: H(target) < H(source). Information is irreversibly destroyed. The original data cannot be fully reconstructed. Example: Datetime with timezone to date-only, rich text to plain text.

**Enriching transformation**: H(target) > H(source). Information is added from external sources. The target contains data not present in the source. Example: Adding geocoordinates from an address lookup.

**Design rule**: Always document information loss in lossy transformations. If business-critical data is lost, the mapping is incorrect.

---

## 2. Schema Mapping Patterns

### Flat-to-Flat Mapping

Source and target are both flat (non-nested) structures. The simplest mapping scenario.

```
Source:                          Target:
{                                {
  "firstName": "Jo",              "first_name": "Jo",
  "lastName": "Smith",            "last_name": "Smith",
  "emailAddress": "jo@x.com"     "email": "jo@x.com"
}                                }
```

Mapping rules:
- `firstName -> first_name` (rename, case convention change)
- `lastName -> last_name` (rename, case convention change)
- `emailAddress -> email` (rename, simplification)

### Nested-to-Flat Mapping (Flattening)

Source has nested objects; target is flat. Common when integrating hierarchical APIs with flat databases or spreadsheets.

```
Source:                          Target:
{                                {
  "customer": {                    "customer_name": "Jo Smith",
    "name": "Jo Smith",           "customer_email": "jo@x.com",
    "email": "jo@x.com"           "address_city": "Portland",
  },                               "address_state": "OR"
  "address": {                   }
    "city": "Portland",
    "state": "OR"
  }
}
```

**Naming convention**: When flattening, prefix the field name with the parent object name to preserve context: `customer.name -> customer_name`, `address.city -> address_city`.

### Flat-to-Nested Mapping (Nesting)

Source is flat; target has nested objects. Common when integrating flat databases with hierarchical APIs.

```
Source:                          Target:
{                                {
  "customer_name": "Jo Smith",    "customer": {
  "customer_email": "jo@x.com",     "name": "Jo Smith",
  "address_city": "Portland",       "email": "jo@x.com"
  "address_state": "OR"           },
}                                  "address": {
                                     "city": "Portland",
                                     "state": "OR"
                                   }
                                 }
```

### Array Mapping Patterns

**Element-wise mapping**: Each element in a source array maps to an element in a target array with the same transformation applied.

```
Source: { items: [{ sku: "A1", qty: 2 }, { sku: "B2", qty: 1 }] }
Target: { line_items: [{ product_code: "A1", quantity: 2 }, { product_code: "B2", quantity: 1 }] }
```

**Array aggregation**: Source array is reduced to a single target value.

```
Source: { items: [{ amount: 10 }, { amount: 20 }, { amount: 30 }] }
Target: { total: 60, count: 3, average: 20 }
```

**Array expansion**: Single source value generates a target array.

```
Source: { tags: "red,blue,green" }
Target: { tags: ["red", "blue", "green"] }
```

**Cross-reference mapping**: Source array elements are matched to target elements based on a key field, not position.

```
Source: [{ id: 1, value: "A" }, { id: 2, value: "B" }]
Existing Target: [{ external_id: 2, data: "old" }, { external_id: 1, data: "old" }]
Merged Target: [{ external_id: 2, data: "B" }, { external_id: 1, data: "A" }]
```

---

## 3. Type Coercion

### Type Coercion Rules

When source and target types differ, explicit coercion is required. Implicit coercion (automatic type conversion) is the source of subtle bugs. Always be explicit.

| Source Type | Target Type | Coercion | Example | Risk |
|-------------|-------------|----------|---------|------|
| String | Number | Parse | "42" -> 42 | Non-numeric strings fail |
| Number | String | Format | 42 -> "42" | Loss of numeric precision |
| String | Boolean | Parse | "true" -> true | Ambiguity ("yes", "1", "on") |
| Boolean | String | Format | true -> "true" | Format depends on target |
| String | Date | Parse | "2024-01-15" -> Date | Format must be specified |
| Date | String | Format | Date -> "01/15/2024" | Timezone and format matter |
| Number | Date | Epoch convert | 1705286400 -> Date | Seconds vs milliseconds |
| String | Array | Split | "a,b,c" -> ["a","b","c"] | Delimiter must be specified |
| Array | String | Join | ["a","b","c"] -> "a,b,c" | Delimiter must be specified |
| Object | String | Serialize | {a:1} -> '{"a":1}' | JSON vs other formats |
| String | Object | Deserialize | '{"a":1}' -> {a:1} | Malformed JSON fails |
| null | Any | Default | null -> default_value | Default must be specified |
| Any | null | Nullify | value -> null | Data loss (intentional) |

### Date and Time Handling

Date/time conversion is the single most error-prone data mapping operation. Rules:

1. **Always store and transmit in ISO 8601 format**: `2024-01-15T10:30:00.000Z`
2. **Always include timezone offset**: `2024-01-15T10:30:00-08:00` or UTC `Z`
3. **Never assume timezone**: If source does not include timezone, require explicit configuration
4. **Handle epoch timestamps carefully**: Determine if seconds, milliseconds, or microseconds
5. **Validate date ranges**: Reject dates before 1970 or after 2099 unless explicitly expected
6. **Test at DST boundaries**: Run tests with dates during daylight saving time transitions

**Common date format translations**:
```
ISO 8601:     2024-01-15T10:30:00.000Z
RFC 2822:     Mon, 15 Jan 2024 10:30:00 +0000
Unix epoch:   1705314600 (seconds) or 1705314600000 (milliseconds)
US format:    01/15/2024
EU format:    15/01/2024
Salesforce:   2024-01-15T10:30:00.000+0000
HubSpot:      1705314600000 (milliseconds since epoch, UTC midnight)
```

### Currency and Number Handling

1. **Never use floating-point for currency**: Use integer cents (1050 = $10.50) or decimal strings ("10.50")
2. **Always include currency code**: Amount without currency is meaningless
3. **Handle locale-specific formatting**: `1,234.56` (US) vs `1.234,56` (EU)
4. **Specify rounding rules**: ROUND_HALF_UP, ROUND_HALF_EVEN (banker's rounding), TRUNCATE
5. **Validate ranges**: Negative amounts, zero amounts, maximum values

---

## 4. Data Validation

### Validation Layers

Data should be validated at multiple points in the mapping pipeline:

```
[Input Data]
    │
    ├── Layer 1: Schema Validation (structure correct?)
    │   - Required fields present
    │   - Field types correct
    │   - No unexpected fields (if strict mode)
    │
    ├── Layer 2: Constraint Validation (values valid?)
    │   - String length limits
    │   - Number ranges
    │   - Enum value membership
    │   - Date range bounds
    │   - Pattern matching (email, phone, URL)
    │
    ├── Layer 3: Business Rule Validation (semantically correct?)
    │   - Cross-field dependencies (end_date > start_date)
    │   - Referential integrity (customer_id exists in CRM)
    │   - Business constraints (order total matches line items)
    │
    ├── Layer 4: Consistency Validation (matches expectations?)
    │   - Duplicates detected and handled
    │   - Idempotency key checked
    │   - Version/timestamp compared for stale data
    │
    └── [Validated Data] ──> [Transformation] ──> [Output]
```

### Validation Strategies

**Fail-Fast**: Stop processing immediately on first validation error. Return detailed error with field name, expected format, and actual value. Best for synchronous API integrations.

**Collect-All**: Accumulate all validation errors and return them together. The user sees every issue at once rather than fixing one at a time. Best for batch imports and form submissions.

**Warn-and-Continue**: Log validation warnings but proceed with processing. Use default values or best-effort coercion for invalid fields. Best for non-critical data sync where some data loss is acceptable.

**Quarantine**: Move invalid records to a quarantine queue for manual review. Valid records proceed normally. Best for high-volume data pipelines where stopping for one bad record is unacceptable.

### Validation Error Response Format

```json
{
  "valid": false,
  "errors": [
    {
      "field": "email",
      "value": "not-an-email",
      "rule": "email_format",
      "message": "Field 'email' must be a valid email address. Received: 'not-an-email'"
    },
    {
      "field": "amount",
      "value": -50,
      "rule": "min_value",
      "message": "Field 'amount' must be >= 0. Received: -50"
    }
  ],
  "warnings": [
    {
      "field": "phone",
      "value": "",
      "rule": "recommended_field",
      "message": "Field 'phone' is empty. Record will be created without phone number."
    }
  ]
}
```

---

## 5. Canonical Data Model

### The N-Squared Problem

When integrating N systems, each pair needs a translation: N*(N-1) mappings. For 5 systems, that is 20 mappings. For 10 systems, 90 mappings.

### Canonical Model Solution

Define a single canonical schema. Each system has exactly 2 mappings: to-canonical and from-canonical. For N systems: 2*N mappings. For 10 systems: 20 mappings (vs. 90 without canonical model).

```
[System A] ──to-canonical──> [Canonical] ──from-canonical──> [System B]
[System C] ──to-canonical──> [Canonical] ──from-canonical──> [System D]
```

### Canonical Schema Design Principles

1. **Superset**: The canonical schema should be the union of all system schemas. Every field from every system must have a place.
2. **Normalized**: Avoid redundancy. Use references instead of denormalization.
3. **Versioned**: The canonical schema evolves. Use semantic versioning.
4. **Documented**: Every field has a description, type, constraints, and examples.
5. **Domain-aligned**: Fields use business terminology, not system-specific terminology.

### Example: Canonical Customer Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Canonical Customer",
  "version": "2.1.0",
  "type": "object",
  "required": ["canonical_id", "email"],
  "properties": {
    "canonical_id": {
      "type": "string",
      "format": "uuid",
      "description": "Globally unique customer identifier"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Primary email address"
    },
    "name": {
      "type": "object",
      "properties": {
        "first": { "type": "string" },
        "last": { "type": "string" },
        "display": { "type": "string" }
      }
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp of customer creation"
    },
    "source_systems": {
      "type": "object",
      "description": "ID mapping to source systems",
      "properties": {
        "salesforce_id": { "type": "string" },
        "hubspot_id": { "type": "string" },
        "stripe_id": { "type": "string" }
      }
    }
  }
}
```

---

## 6. Mapping in iPaaS Platforms

### n8n Data Mapping

n8n uses a JSON-based data model. Each node receives and produces JSON items.

**Expressions**: Access data using `{{ }}` syntax:
```
{{ $json.customer.name }}              // Current node input
{{ $node["HTTP Request"].json.data }}  // Specific node output
{{ $json.amount * 1.1 }}              // Computed value
{{ $json.date ? $json.date : "N/A" }} // Conditional with default
```

**Set node**: For explicit field mapping with renaming and type control.
**Function node**: JavaScript code for complex transformations.
**Item Lists node**: For splitting, merging, and aggregating arrays.

### Zapier Data Mapping

Zapier uses a field-mapping interface with template syntax:

**Field references**: `{{step_id__field_name}}`
**Formatters**: Built-in transformations (text, number, date, utility)
```
Text: Capitalize, Lowercase, Truncate, Replace, Split
Number: Format Number, Round, Math Operations
Date: Format Date, Add/Subtract Time, Compare Dates
Utility: Lookup Table, Line Items to Text
```

### Make Data Mapping

Make uses a visual mapping interface with function syntax:

**Functions**: Built-in transformation functions
```
Text: {{lower(field)}}, {{replace(field, "old", "new")}}, {{trim(field)}}
Number: {{round(field, 2)}}, {{ceil(field)}}, {{formatNumber(field, 2, ".", ",")}}
Date: {{formatDate(field, "YYYY-MM-DD")}}, {{addDays(field, 7)}}
Array: {{map(array, "field")}}, {{join(array, ",")}}
```

---

## 7. Testing Data Mappings

### Test Categories

**Positive tests**: Valid input produces expected output.
**Negative tests**: Invalid input produces appropriate error.
**Boundary tests**: Edge cases at field limits (empty string, max length, zero, negative, null).
**Type tests**: Each coercion path tested (string->number, date->string, etc.).

### Test Data Strategy

For each mapping, maintain a test data set covering:
1. **Happy path**: Standard, complete records
2. **Missing optional fields**: Records with optional fields absent
3. **Empty strings vs null**: Verify handling of empty string versus null versus missing
4. **Unicode**: Names with accents, CJK characters, emoji, RTL text
5. **Large values**: Fields at maximum length, numbers at maximum precision
6. **Special characters**: Quotes, backslashes, HTML entities, SQL injection patterns
7. **Date edge cases**: Leap year, DST transition, year 2038, epoch zero

### Mapping Regression Tests

When modifying a mapping, run all existing test cases to ensure backward compatibility. New source fields should not break existing mappings. Automated regression testing for data mappings prevents the most common integration failure mode.

---

## 8. Data Mapping Design Checklist

- [ ] **Source schema documented**: All source fields with types and examples
- [ ] **Target schema documented**: All target fields with types and constraints
- [ ] **Mapping rules defined**: Every target field has a defined source (or default)
- [ ] **Type coercions explicit**: Every type conversion is explicitly defined
- [ ] **Null handling defined**: Behavior for null, empty, and missing values
- [ ] **Information loss documented**: Any lossy transformations are documented
- [ ] **Validation rules defined**: Schema, constraint, and business rule validation
- [ ] **Error handling defined**: Fail-fast, collect-all, warn-and-continue, or quarantine
- [ ] **Test data prepared**: Happy path, edge cases, and error cases
- [ ] **Date/timezone handling verified**: All date fields have explicit timezone treatment
- [ ] **Currency handling verified**: Amounts use correct precision and include currency code
- [ ] **Array handling verified**: Correct iteration, aggregation, or expansion behavior

---

**Data mapping is not configuration -- it is engineering. Treat it with the same rigor as code.**

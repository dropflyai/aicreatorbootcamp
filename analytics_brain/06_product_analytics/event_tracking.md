# Event Tracking — Taxonomy Design, Governance, and Implementation

---

## Overview

Event tracking is the instrumentation layer that converts user behavior into structured data. Every product analytics capability — retention analysis, funnel optimization, feature adoption measurement, experimentation — depends on the quality and completeness of event tracking. A poorly designed tracking system produces unreliable, ungoverned data that no analyst can trust. A well-designed one provides a comprehensive, consistent behavioral record that powers insight for years.

This module covers event taxonomy design, naming conventions, property schema design, tracking governance, and the operational processes that keep event data trustworthy at scale. The standard: event tracking should be treated as a product, with the same rigor applied to requirements, implementation, testing, and maintenance.

---

## Event Taxonomy Design

### What Is an Event Taxonomy?

An event taxonomy is a structured naming system and governance framework that defines:
1. **What events exist** (the catalog of all tracked events)
2. **What each event means** (precise definitions and triggering conditions)
3. **What properties each event carries** (structured metadata)
4. **Who owns each event** (accountability for accuracy and maintenance)
5. **How events are named** (consistent conventions)

### Taxonomy Architecture

```
CATEGORY (Noun/Object)           ACTION (Verb)
────────────────────────         ──────────────
page                             viewed
button                           clicked
form                             submitted, abandoned
feature                          activated, deactivated
search                           performed, refined
content                          viewed, completed, shared
subscription                     created, upgraded, downgraded, canceled
payment                          initiated, completed, failed
notification                     sent, received, opened, dismissed
experiment                       enrolled, converted
```

### Naming Conventions

**Object-Action Format (Recommended)**

```
[object]_[action]

Examples:
  page_viewed
  button_clicked
  form_submitted
  project_created
  subscription_upgraded
  search_performed
  onboarding_step_completed
  experiment_enrolled
```

**Why Object-Action:**
- Natural language ordering (reads like English: "page viewed")
- Hierarchical — all `page_*` events group together alphabetically
- Consistent parsing — automated tools can reliably split object from action
- Scalable — new events follow the existing pattern without ambiguity

**Naming rules:**
1. **All lowercase** — No mixed case, no camelCase, no PascalCase
2. **Underscores for spaces** — `page_viewed`, not `page-viewed` or `pageViewed`
3. **Past tense for actions** — `clicked`, `submitted`, `created` (the event records something that happened)
4. **Specific objects** — `signup_form_submitted` is better than `form_submitted` if there are multiple forms
5. **No abbreviations** — `subscription_canceled` not `sub_cxl`
6. **Consistent vocabulary** — Pick one verb and use it everywhere. Do not mix `created`, `added`, `made`, and `generated` for the same concept.

### Event Categories

**Navigation Events:**
```
page_viewed
tab_switched
modal_opened
modal_closed
navigation_clicked
```

**Interaction Events:**
```
button_clicked
link_clicked
toggle_switched
dropdown_selected
form_field_focused
form_field_completed
```

**Lifecycle Events:**
```
account_created
onboarding_started
onboarding_step_completed
onboarding_completed
first_core_action_performed
subscription_created
subscription_upgraded
subscription_downgraded
subscription_canceled
account_deleted
```

**Feature Events:**
```
feature_activated
feature_used
feature_configuration_changed
```

**System Events:**
```
error_occurred
api_call_made
notification_sent
email_delivered
email_opened
email_clicked
```

---

## Property Schema Design

### Event Properties

Every event carries properties — structured key-value pairs that provide context about the event.

**Property categories:**

**1. Event-specific properties** (unique to this event type):
```json
// project_created
{
  "project_id": "proj_abc123",
  "project_name": "Q4 Campaign Analysis",
  "project_type": "dashboard",
  "template_used": "marketing_dashboard_v2",
  "team_id": "team_xyz789"
}
```

**2. User properties** (consistent across all events for the same user):
```json
{
  "user_id": "usr_def456",
  "plan_tier": "professional",
  "company_size": "51-200",
  "role": "analyst",
  "signup_date": "2024-01-15"
}
```

**3. Context properties** (automatically collected):
```json
{
  "timestamp": "2024-06-15T14:23:45.123Z",
  "session_id": "sess_ghi789",
  "device_type": "desktop",
  "browser": "Chrome 125",
  "os": "macOS 14.5",
  "screen_resolution": "2560x1440",
  "locale": "en-US",
  "timezone": "America/New_York",
  "page_url": "https://app.example.com/projects/new",
  "page_path": "/projects/new",
  "referrer": "https://app.example.com/dashboard"
}
```

### Property Naming Conventions

```
1. snake_case for all property names
2. Consistent type suffixes:
   - _id for identifiers: user_id, project_id, session_id
   - _name for human-readable labels: project_name, plan_name
   - _type for categorical classifiers: project_type, device_type
   - _count for integers: item_count, retry_count
   - _at for timestamps: created_at, completed_at
   - _duration for time spans: session_duration_seconds
   - _amount for monetary values: order_amount_usd
   - _rate for percentages: conversion_rate (as decimal 0.0-1.0)
   - _is_ or _has_ for booleans: is_first_session, has_team
```

### Property Value Standards

**Enums (categorical values):**
Define all allowed values explicitly. Reject or flag non-conforming values.
```yaml
project_type:
  type: string
  enum: [dashboard, report, analysis, exploration]
  required: true
```

**Identifiers:**
Use consistent format prefixes for readability and debugging:
```
user_id:    "usr_abc123"
project_id: "proj_def456"
team_id:    "team_ghi789"
session_id: "sess_jkl012"
```

**Monetary values:**
Always specify currency. Store in the smallest unit (cents) or as explicit decimals with currency suffix:
```json
{
  "order_amount_cents": 4999,
  "currency": "USD"
}
// OR
{
  "order_amount_usd": 49.99
}
```

**Timestamps:**
Always UTC. Always ISO 8601 format with timezone designator:
```
"2024-06-15T14:23:45.123Z"
```

---

## Tracking Governance

### The Tracking Plan

A tracking plan is the authoritative specification of all events and properties. It serves as the contract between the product/analytics teams (who define what to track) and the engineering team (who implements the tracking).

**Tracking plan format:**

| Event Name | Trigger | Properties | Required | Type | Owner | Status |
|-----------|---------|------------|----------|------|-------|--------|
| page_viewed | User loads any page | page_name | Yes | string | Product | Active |
| | | page_path | Yes | string | | |
| | | page_category | Yes | enum: [app, marketing, docs] | | |
| project_created | User creates a new project | project_id | Yes | string | Growth | Active |
| | | project_type | Yes | enum: [dashboard, report, analysis] | | |
| | | template_used | No | string (null if blank) | | |
| | | team_id | Yes | string | | |

### Governance Workflow

```
1. PROPOSE: Product/analytics team proposes new event or property change
   → Fill out tracking plan template
   → Specify: event name, trigger condition, properties, types, examples

2. REVIEW: Analytics engineering reviews proposal
   → Naming convention compliance
   → Property completeness (are all needed dimensions captured?)
   → Duplication check (does this overlap with existing events?)
   → Implementation feasibility

3. IMPLEMENT: Engineering implements tracking
   → Client-side and/or server-side
   → Unit tests for event firing conditions
   → Property value validation

4. VALIDATE: QA verifies tracking
   → Event fires at the correct trigger
   → All required properties are present
   → Property values match specifications
   → No duplicate events on single user actions

5. DOCUMENT: Tracking plan updated
   → Event added to catalog
   → Implementation notes recorded
   → Owner assigned

6. MONITOR: Ongoing quality monitoring
   → Volume alerts (event volume drops >20% WoW)
   → Schema alerts (new unexpected properties appear)
   → NULL rate monitoring (required fields with NULLs)
```

### Schema Validation

Implement schema validation at the collection layer to catch bad data before it enters the warehouse:

**Client-side validation:**
```javascript
// Using Segment Protocols or custom validation
analytics.track('project_created', {
  project_id: projectId,        // Required: string
  project_type: projectType,    // Required: enum
  template_used: template,      // Optional: string or null
  team_id: teamId              // Required: string
}, {
  // Schema validation will reject if required fields are missing
  // or types do not match
});
```

**Server-side validation (in the CDP or pipeline):**
```python
# Schema enforcement in the event pipeline
SCHEMAS = {
    'project_created': {
        'required': ['project_id', 'project_type', 'team_id'],
        'properties': {
            'project_id': {'type': 'string', 'pattern': r'^proj_[a-zA-Z0-9]+$'},
            'project_type': {'type': 'string', 'enum': ['dashboard', 'report', 'analysis']},
            'template_used': {'type': ['string', 'null']},
            'team_id': {'type': 'string', 'pattern': r'^team_[a-zA-Z0-9]+$'}
        }
    }
}
```

---

## Implementation Patterns

### Client-Side vs. Server-Side Tracking

**Client-side tracking (browser/mobile SDK):**
- Captures UI interactions (clicks, page views, form events)
- Has access to client context (device, browser, screen)
- Subject to ad blockers (10-30% event loss on web)
- Latency: events sent from user's device

**Server-side tracking (backend API):**
- Captures system events (account creation, payment, subscription changes)
- Not affected by ad blockers
- More reliable (server-controlled execution)
- No access to client context unless passed explicitly

**Best practice:** Use server-side for critical business events (signups, purchases, subscription changes). Use client-side for UI interaction events (clicks, page views, feature usage). Some events warrant both: client-side captures the user's context, server-side captures the business outcome.

### Identity Resolution

**The problem:** A user may interact with the product across multiple devices and sessions. Before authentication, they have only an anonymous ID. After authentication, they have a user ID. Connecting these identities is essential for accurate behavioral analysis.

**The identify call:**
```javascript
// When user logs in, link anonymous to known identity
analytics.identify(userId, {
  email: user.email,
  plan: user.plan,
  signup_date: user.signupDate
});
```

**Identity resolution challenges:**
- One person, multiple devices = multiple anonymous IDs that must merge
- Shared devices = multiple people appearing as one anonymous ID
- Account changes = user ID changes (merges, migrations)
- GDPR/CCPA = right to erasure requires identity graph management

### Testing Event Tracking

**Unit tests:**
```javascript
// Test that project_created event fires with correct properties
test('project creation fires tracking event', () => {
  createProject({ name: 'Test', type: 'dashboard' });

  expect(analytics.track).toHaveBeenCalledWith('project_created', {
    project_id: expect.stringMatching(/^proj_/),
    project_type: 'dashboard',
    template_used: null,
    team_id: expect.stringMatching(/^team_/)
  });
});
```

**Integration tests:**
- Verify events arrive in the warehouse with expected schema
- Check that event volume after deployment matches expected patterns
- Validate that identity resolution correctly merges anonymous and known IDs

---

## Tracking Debt

### The Accumulation Problem

Like technical debt, tracking debt accumulates when:
- Events are added without governance (informal "just add a track call")
- Events are never removed when features are deprecated
- Property schemas drift as the product evolves
- Documentation falls out of date
- Testing is skipped under deadline pressure

### Tracking Debt Symptoms

| Symptom | Indicator |
|---------|-----------|
| Unknown events | Events in the warehouse that no one recognizes |
| Schema drift | Same event has different properties over time |
| High NULL rates | Required properties frequently missing |
| Duplicate events | Same user action produces multiple identical events |
| Volume anomalies | Event volumes change without product changes |
| Naming chaos | Mix of conventions: camelCase, snake_case, SCREAMING_CASE |

### Tracking Debt Remediation

**Quarterly tracking audit:**
1. Export list of all unique event names from the warehouse
2. Cross-reference with the tracking plan — identify undocumented events
3. For each undocumented event: investigate, document, or deprecate
4. Check NULL rates for all required properties — investigate violations
5. Review event volumes — identify events with zero volume (dead tracking)
6. Update the tracking plan to reflect current reality

---

**Event tracking is the foundation of product analytics. Bad tracking data produces bad analysis. Bad analysis produces bad decisions. The rigor applied to event tracking governance directly determines the quality of every analytical capability built on top of it.**

# Analytics Implementation

## What This Enables

A rigorous analytics infrastructure that transforms raw user behavior data into actionable product insights. Without disciplined analytics implementation, product teams either fly blind (no data) or drown in noise (too much unstructured data). This module provides the methodology for event taxonomy design, tracking plan creation, funnel analysis, and cohort analysis — the operational backbone that makes data-informed product management possible.

---

## The Core Insight

Analytics is not a tool — it is a system. The system includes: an event taxonomy (what to track), a tracking plan (how to track it), instrumentation (the code that captures events), storage (the data warehouse), analysis (the queries and dashboards), and action (the decisions the data informs). A gap anywhere in this chain renders the entire system useless. The most common gap is between analysis and action — data is collected and visualized, but never actually used to change a product decision.

---

## Event Taxonomy

### Definition

An event taxonomy is a structured, standardized vocabulary for describing user actions in your product. It defines what events to track, what properties each event carries, and how events are named.

### Naming Convention

A consistent naming convention prevents the entropy of ad-hoc event names:

```
Convention: [Object]_[Action]

Examples:
  account_created
  project_created
  document_edited
  report_exported
  subscription_upgraded
  team_member_invited
  search_performed
  onboarding_step_completed
  feature_flag_evaluated
```

### Naming Rules

| Rule | Good | Bad |
|------|------|-----|
| Use snake_case consistently | `project_created` | `ProjectCreated`, `project-created`, `createProject` |
| Object first, action second | `report_exported` | `exported_report`, `export` |
| Use past tense for completed actions | `payment_completed` | `payment_complete`, `paying` |
| Be specific about the object | `search_result_clicked` | `clicked` |
| Avoid abbreviations | `subscription_cancelled` | `sub_cxl` |
| Include context in properties, not names | `button_clicked { button_name: "upgrade" }` | `upgrade_button_clicked` |

### Event Types

| Type | Description | Examples |
|------|-------------|---------|
| **Track events** | User performed an action | `document_created`, `feature_used`, `search_performed` |
| **Page/Screen events** | User viewed a page or screen | `page_viewed { page: "/dashboard" }`, `screen_viewed { screen: "settings" }` |
| **Identity events** | User identity established or updated | `user_identified`, `user_traits_updated` |
| **Group events** | User associated with an account/team | `group_identified { company_id, plan, team_size }` |

### Event Property Design

Every event should carry properties that provide context:

```
Event: document_created
Properties:
  - document_type: string (e.g., "report", "note", "template")
  - creation_method: string (e.g., "blank", "template", "duplicate")
  - word_count: integer
  - has_images: boolean
  - team_id: string (for group analysis)
  - source: string (e.g., "dashboard", "quick_action", "api")

Event: subscription_upgraded
Properties:
  - previous_plan: string
  - new_plan: string
  - billing_period: string ("monthly", "annual")
  - upgrade_trigger: string ("paywall", "settings", "admin_panel")
  - days_since_signup: integer
  - trial_status: string ("in_trial", "post_trial", "no_trial")
```

### The Event Taxonomy Document

Maintain a canonical document listing every tracked event:

```
EVENT TAXONOMY v2.4 (last updated: 2025-01-15)

Category: Account
| Event Name | Description | Properties | Trigger |
|------------|-------------|------------|---------|
| account_created | User completes registration | method, referral_source | Registration form submit |
| account_verified | User verifies email | verification_method | Email link click |
| account_deleted | User deletes their account | reason, days_since_creation | Account deletion confirmation |

Category: Core Product
| Event Name | Description | Properties | Trigger |
|------------|-------------|------------|---------|
| project_created | User creates a new project | project_type, creation_method, template_used | Project creation complete |
| project_shared | User shares project with team | share_method, recipient_count | Share action complete |
...
```

---

## Tracking Plans

### Definition

A tracking plan is the implementation specification for analytics — the document that tells engineers exactly what to instrument, where, and with what properties. It is the contract between Product (who defines what to track) and Engineering (who implements the tracking).

### Tracking Plan Structure

```
TRACKING PLAN

Section 1: Overview
- Analytics tool(s): [Amplitude, Mixpanel, Segment, etc.]
- Data warehouse: [BigQuery, Snowflake, Redshift]
- SDK version: [e.g., Segment Analytics.js 2.0]

Section 2: Identity Resolution
- Anonymous ID: auto-generated, persisted in localStorage
- User ID: assigned at registration, used after login
- Alias: link anonymous ID to user ID at registration

Section 3: User Properties (traits)
| Property | Type | Description | Set When |
|----------|------|-------------|----------|
| email | string | User's email | Registration, profile update |
| plan | string | Current subscription plan | Signup, plan change |
| company_size | integer | Number of employees | Onboarding, profile update |
| created_at | datetime | Account creation date | Registration |
| role | string | User's role in the product | Role assignment |

Section 4: Events
[Full event taxonomy with implementation notes]

Section 5: Page Tracking
- Track all page views automatically via SPA router integration
- Include: page URL, referrer, UTM parameters
- Exclude: admin pages, internal tools

Section 6: Data Validation
- Required properties: events missing required properties should be flagged
- Property types: enforce type validation (string, integer, boolean)
- Data quality monitoring: automated alerts for event volume anomalies
```

### Tracking Plan Review Process

```
1. PM drafts tracking plan based on questions to answer
2. Data/Analytics reviews for completeness and best practices
3. Engineering reviews for feasibility and implementation approach
4. QA defines validation criteria
5. Implementation + QA verification
6. Production monitoring for 1 week
7. Tracking plan archived as living document
```

---

## Funnel Analysis

### Definition

Funnel analysis measures the conversion rate through a sequence of steps, identifying where users drop off and why.

### Building Effective Funnels

```
Step 1: Define the funnel
  - What is the goal? (e.g., new user activation)
  - What are the required steps?
  - Are the steps sequential and required?

Step 2: Instrument the events
  - One event per funnel step
  - Include properties for segmentation

Step 3: Set the conversion window
  - How long between first and last step counts as one session?
  - Too short: misses delayed conversions
  - Too long: includes disconnected sessions

Step 4: Analyze
  - Overall conversion rate (step 1 to final step)
  - Step-by-step conversion rate
  - Drop-off rate at each step
  - Time between steps
```

### Funnel Analysis Example

```
ONBOARDING FUNNEL (30-day window)

Step                    Users    Conversion    Drop-off
──────────────────────────────────────────────────────
1. Account created      10,000   100%          -
2. Email verified        8,500    85%          15%
3. Profile completed     6,800    80%          20%
4. First project          4,080    60%          40%  <-- BIGGEST DROP
5. Invited team member   2,448    60%          40%
6. Completed core action 1,469    60%          40%
──────────────────────────────────────────────────────
Overall conversion: 14.7% (Step 1 -> Step 6)
Biggest opportunity: Step 3 -> Step 4 (40% drop-off)
```

### Funnel Diagnostic Questions

| Drop-off Location | Diagnostic Questions | Potential Causes |
|-------------------|---------------------|-----------------|
| Top of funnel | Are we attracting the right users? | Wrong audience, misleading marketing |
| After registration | Is verification too difficult? | Email deliverability, friction |
| During onboarding | Is the value proposition clear? | Confusing onboarding, too many steps |
| Before core action | Do users understand what to do next? | Missing guidance, unclear UI |
| Before social action | Is the social trigger compelling? | No clear reason to invite, friction |

### Advanced Funnel Techniques

| Technique | Description | Use Case |
|-----------|-------------|----------|
| **Segmented funnels** | Compare funnel by user segment | Do enterprise users convert better than SMB? |
| **Time-to-convert** | Measure time between each step | Is step 3 taking too long? |
| **Funnel trends** | Track funnel conversion over time | Is the new onboarding improving conversion? |
| **Reverse funnels** | Start from the goal and work backward | What paths do successful users take? |
| **Parallel funnels** | Compare alternative paths to the same goal | Is path A or path B more effective? |

---

## Cohort Analysis

### Definition

Cohort analysis groups users by a shared characteristic (usually signup date) and tracks their behavior over time. It reveals whether product changes are improving outcomes for newer users and identifies long-term retention patterns.

### Types of Cohorts

| Cohort Type | Grouping Basis | Question Answered |
|-------------|---------------|-------------------|
| **Acquisition cohort** | Signup week/month | Are newer users retaining better than older ones? |
| **Behavioral cohort** | Action performed (e.g., "completed onboarding") | Do users who do X retain better than those who do not? |
| **Feature cohort** | Feature used | Does using feature Y predict higher retention? |
| **Campaign cohort** | Acquisition channel or campaign | Which channel produces the best long-term users? |
| **Plan cohort** | Subscription tier | Do premium users retain better? |

### Cohort Retention Table

```
               Week 0   Week 1   Week 2   Week 3   Week 4   Week 5
Jan 1 cohort   100%     68%      52%      45%      42%      40%
Jan 8 cohort   100%     72%      55%      48%      44%      42%
Jan 15 cohort  100%     75%      60%      52%      48%      -
Jan 22 cohort  100%     78%      63%      -        -        -
Jan 29 cohort  100%     80%      -        -        -        -

Reading: Each row is a cohort. Each column shows % still active after N weeks.
Trend: Week 1 retention is improving (68% -> 80%) — product changes are working.
```

### Cohort Analysis Patterns

```
Pattern 1: IMPROVING COHORTS              Pattern 2: DECLINING COHORTS
(Product is getting better)               (Product is getting worse)

Week 0: 100% 100% 100% 100%              Week 0: 100% 100% 100% 100%
Week 4:  30%  35%  40%  45%              Week 4:  45%  40%  35%  30%
         ↑ newer cohorts retain better            ↑ newer cohorts retain worse

Pattern 3: FLAT COHORTS                   Pattern 4: SMILE CURVE
(No improvement over time)                (Users return after initial drop)

Week 0: 100% 100% 100% 100%              Week 0: 100%
Week 4:  35%  35%  35%  35%              Week 2:  40%
         ↑ no change across cohorts       Week 4:  35%
                                          Week 8:  38%
                                          Week 12: 42% <-- users come back
```

### Building Cohort Analyses

```
Step 1: Define the cohort (signup date, feature usage, plan)
Step 2: Define the retention event (login, core action, purchase)
Step 3: Define the time intervals (daily, weekly, monthly)
Step 4: Query the data

SQL Pattern:
SELECT
  DATE_TRUNC('week', u.created_at) AS cohort_week,
  FLOOR(DATEDIFF('day', u.created_at, e.event_date) / 7) AS weeks_since_signup,
  COUNT(DISTINCT u.user_id) AS active_users
FROM users u
JOIN events e ON u.user_id = e.user_id
WHERE e.event_name = 'core_action_performed'
GROUP BY 1, 2
ORDER BY 1, 2
```

---

## Analytics Architecture

### The Modern Analytics Stack

```
DATA COLLECTION          DATA PIPELINE           DATA STORAGE         ANALYSIS
┌──────────────┐        ┌──────────────┐       ┌──────────────┐    ┌──────────────┐
│ Client SDK   │───────>│ Event Router │──────>│ Data         │───>│ BI Tool      │
│ (Segment,    │        │ (Segment,    │       │ Warehouse    │    │ (Looker,     │
│  Amplitude)  │        │  Rudderstack)│       │ (BigQuery,   │    │  Tableau,    │
│              │        │              │       │  Snowflake)  │    │  Mode)       │
│ Server SDK   │───────>│              │──────>│              │    │              │
│              │        │              │       │              │    │ Product      │
│ Mobile SDK   │───────>│              │──────>│              │───>│ Analytics    │
└──────────────┘        └──────────────┘       └──────────────┘    │ (Amplitude,  │
                                                                    │  Mixpanel)   │
                                                                    └──────────────┘
```

### Build vs Buy Decision

| Component | Buy (SaaS) | Build (In-house) | Recommendation |
|-----------|-----------|------------------|----------------|
| Event collection | Segment, Rudderstack | Custom SDK | Buy until 10M+ events/month |
| Product analytics | Amplitude, Mixpanel | Custom dashboards | Buy for self-serve analysis |
| Data warehouse | BigQuery, Snowflake | Self-hosted | Buy (almost always) |
| BI / dashboards | Looker, Mode, Metabase | Custom | Buy for team access; build for embedded |
| Experimentation | Statsig, LaunchDarkly | Custom platform | Buy until experimentation is a core competency |

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Tracking debt | Key events are not instrumented; cannot answer basic questions | Analytics added as afterthought | Include tracking plan in every PRD |
| Data swamp | Thousands of events, many duplicated or undefined | No taxonomy governance | Maintain canonical event taxonomy; review quarterly |
| Dashboard graveyard | Dashboards built and never viewed | Dashboards not tied to decisions | For every dashboard, define: what decision does this support? |
| Vanity dashboards | Dashboards show only positive metrics | Fear of transparency | Include all AARRR stages; show churn and drop-off |
| Analysis without action | Insights generated but not connected to product decisions | Data team separate from product team | Embed analyst in product trio; tie analysis to decision cycles |
| Privacy violations | Tracking PII without consent; GDPR/CCPA non-compliance | No data governance | Implement consent management; audit tracked properties for PII |

---

## The Operator's Framework

When implementing analytics:

1. **Start with questions** — what product decisions do you need data to make? Work backward to events.
2. **Design the event taxonomy** — standardized naming, consistent properties, documented in a canonical source
3. **Write the tracking plan** — implementation specification for engineering; reviewed by data and PM
4. **Build funnels for critical paths** — onboarding, activation, purchase, core workflow
5. **Implement cohort analysis** — track retention by signup cohort and behavioral cohort
6. **Maintain data quality** — automated alerts for event volume anomalies; quarterly taxonomy review
7. **Connect analysis to decisions** — every dashboard and report should map to a specific product decision

---

## Summary

Analytics implementation is the operational foundation of data-informed product management. An event taxonomy provides a standardized vocabulary for user actions, with consistent naming conventions and contextual properties. Tracking plans translate the taxonomy into engineering specifications. Funnel analysis reveals where users drop off in critical paths, enabling targeted intervention. Cohort analysis tracks behavior over time, revealing whether product changes are improving outcomes for newer users. The modern analytics stack separates collection, routing, storage, and analysis into modular components. The most critical success factor is not the tooling — it is the connection between data and decisions. Analytics that do not inform product decisions are expensive noise. Analytics that drive weekly product decisions are the competitive advantage of every high-performing product team.

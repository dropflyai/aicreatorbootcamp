# CS Ops — Gainsight/Totango/ChurnZero, Data Infrastructure, Health Score Implementation, Playbook Automation

## Overview

Customer Success Operations (CS Ops) is the operational backbone that enables CSMs to work efficiently, leaders to make data-driven decisions, and the organization to scale customer success without proportional headcount growth. CS Ops encompasses the technology stack (platforms like Gainsight, Totango, and ChurnZero), the data infrastructure that feeds those platforms, the implementation of health scoring models, and the automation of engagement playbooks. Without CS Ops, customer success is a collection of individual heroics; with CS Ops, it is a scalable, repeatable, measurable discipline. This module covers the complete CS Ops function from platform selection through data architecture, health score operationalization, and playbook automation.

---

## Section 1: CS Platform Selection

### The CS Platform Landscape

Customer Success Platforms (CSPs) centralize customer data, automate engagement workflows, calculate health scores, and provide the operational intelligence CSMs need to manage their books of business effectively.

**Platform Comparison:**

| Capability | Gainsight | Totango | ChurnZero | Vitally | Planhat |
|-----------|-----------|---------|-----------|---------|---------|
| Health scoring | Advanced (multi-dimensional) | Strong (SuccessBLOCs) | Strong | Good | Good |
| Playbook automation | Advanced (Rules Engine) | Good (SuccessPlays) | Good | Basic | Good |
| Customer 360 | Comprehensive | Good | Good | Good | Good |
| Analytics | Advanced (reporting + Horizon AI) | Good | Good | Good (product analytics) | Good |
| In-app engagement | Limited (via partners) | Built-in | Built-in | Built-in | Limited |
| Integration ecosystem | Extensive (Salesforce-native) | Good | Good | Good | Good |
| Enterprise readiness | Strong | Moderate | Moderate | Moderate | Moderate |
| Ease of implementation | Complex (6-12 weeks) | Moderate (4-8 weeks) | Moderate (4-8 weeks) | Fast (2-4 weeks) | Moderate |
| Pricing | Premium ($$$) | Mid-range ($$) | Mid-range ($$) | Mid-range ($$) | Mid-range ($$) |
| Best for | Enterprise CS at scale | Mid-market, quick start | SMB/Mid-market, in-app | Product-led CS | European market |

### Platform Selection Framework

**Step 1: Define Requirements**
Prioritize capabilities based on your CS maturity and strategy:

| Priority | Early Stage (0-50 customers) | Growth Stage (50-500) | Scale Stage (500+) |
|----------|---------------------------|---------------------|-------------------|
| Must-have | Customer 360, basic health score, task management | Health scoring, playbook automation, CRM integration | Advanced analytics, multi-model health scoring, AI |
| Nice-to-have | Playbook automation, reporting | In-app engagement, advanced analytics | Predictive churn modeling, revenue intelligence |
| Can wait | Advanced analytics, AI | Revenue forecasting, multi-product | Custom ML models, enterprise compliance |

**Step 2: Evaluate Integration Requirements**
The CSP must integrate with your existing stack:

```
DATA SOURCES → CS PLATFORM → OUTPUTS

CRM (Salesforce, HubSpot)     →  ┌──────────────┐  →  Health Scores
Product Analytics (Amplitude)  →  │  CS Platform  │  →  Playbook Triggers
Support (Zendesk, Intercom)    →  │              │  →  CSM Tasks
Billing (Stripe, Chargebee)    →  │              │  →  Dashboards
Communication (Email, Slack)   →  │              │  →  Reports
NPS/Survey (Delighted)         →  └──────────────┘  →  Alerts
```

**Step 3: Run a Proof of Concept**
Before committing to a platform:
- Load a subset of customer data (50-100 accounts)
- Configure one health score model
- Build one automated playbook
- Test CRM bi-directional sync
- Evaluate CSM user experience (adoption depends on usability)
- Measure implementation effort and vendor support quality

---

## Section 2: Data Infrastructure

### The CS Data Model

Customer success requires data from multiple systems synthesized into a unified customer view. The data model defines what data is collected, where it comes from, how it is transformed, and how it is consumed.

**Core Data Entities:**

| Entity | Source | Key Fields | Update Frequency |
|--------|--------|-----------|-----------------|
| Account | CRM | Name, ARR, segment, industry, contract dates, owner | Real-time sync |
| Contact | CRM | Name, title, role, email, engagement level | Real-time sync |
| Usage | Product analytics | DAU/MAU, feature adoption, session data, API calls | Daily aggregation |
| Support | Ticketing system | Ticket volume, severity, CSAT, resolution time | Real-time sync |
| Billing | Billing system | MRR, payment status, invoices, dunning status | Daily sync |
| Health | CS platform | Composite score, component scores, trend | Calculated daily |
| Engagement | CS platform + email | Touchpoints, meeting attendance, email opens | Event-driven |
| Survey | NPS/CSAT tool | NPS score, CSAT score, verbatim feedback | Event-driven |
| Success Plan | CS platform | Goals, milestones, completion status, next review | CSM-updated |

### Data Architecture Patterns

**Pattern 1: Direct Integration (Simple)**
Each source system connects directly to the CS platform via native integrations or APIs.

```
Salesforce ──API──→ CS Platform
Amplitude  ──API──→ CS Platform
Zendesk    ──API──→ CS Platform
Stripe     ──API──→ CS Platform
```

Best for: Early-stage, <500 customers, standard data needs.

**Pattern 2: Data Warehouse Intermediary (Scalable)**
Data flows from source systems into a data warehouse (Snowflake, BigQuery, Redshift), where it is transformed and then pushed to the CS platform.

```
Salesforce ──→ ┌──────────────┐
Amplitude  ──→ │    Data       │ ──→ CS Platform
Zendesk    ──→ │  Warehouse   │ ──→ BI Dashboards
Stripe     ──→ │  (Snowflake) │ ──→ ML Models
Custom DB  ──→ └──────────────┘
```

Best for: Growth stage, 500+ customers, complex data transformations, custom health scoring.

**Pattern 3: Reverse ETL (Modern)**
Data is stored and transformed in the warehouse, then synced back to operational tools using reverse ETL (Census, Hightouch).

```
Sources → Warehouse → Reverse ETL → CS Platform, CRM, Marketing Automation
```

Best for: Scale stage, data team available, advanced analytics requirements.

### Data Quality Management

**Data Quality Dimensions:**

| Dimension | Definition | Measurement | Target |
|-----------|-----------|-------------|--------|
| Completeness | All required fields populated | % of records with no null required fields | 95%+ |
| Accuracy | Data reflects reality | Spot-check audits, user-reported errors | 98%+ |
| Timeliness | Data is current | Lag between source change and CS platform update | <24 hours |
| Consistency | Same data across systems | Cross-system reconciliation checks | 99%+ |

**Common Data Quality Issues:**
- CRM records with missing or outdated contact information
- Product usage data not mapping correctly to CRM accounts
- Billing data not syncing contract changes in real-time
- Support tickets not linked to the correct account
- Duplicate records creating inflated or deflated metrics

**Data Quality Remediation:**
- Automated validation rules at data entry points
- Weekly data quality reports highlighting gaps
- Quarterly data audit and cleanup sprints
- Data stewardship: Assign owners for each data domain
- Integration monitoring: Alert when data sync fails or lags

---

## Section 3: Health Score Implementation

### From Model to Production

Health score models (defined in `03_health_scoring/`) must be operationalized in the CS platform. This requires translating the conceptual model into configured scoring rules, data mappings, and display logic.

**Implementation Steps:**

**Step 1: Define Score Components and Weights**

```
HEALTH SCORE CONFIGURATION

Component 1: Product Usage (40% weight)
  Inputs:
    - DAU/MAU ratio (source: product analytics)
    - Core feature adoption count (source: product analytics)
    - Session duration trend (source: product analytics)
  Scoring logic:
    - DAU/MAU > 40%: 100 points
    - DAU/MAU 25-40%: 75 points
    - DAU/MAU 10-25%: 50 points
    - DAU/MAU < 10%: 25 points
    [Similar tiered scoring for each input]

Component 2: Engagement (30% weight)
  Inputs:
    - Meeting attendance rate (source: CS platform)
    - Email response rate (source: email tracking)
    - NPS/CSAT score (source: survey tool)
  Scoring logic: [Tiered as above]

Component 3: Business Outcomes (20% weight)
  Inputs:
    - Success plan milestone completion (source: CS platform)
    - ROI achieved vs. target (source: CSM input)
  Scoring logic: [Tiered as above]

Component 4: Support Experience (10% weight)
  Inputs:
    - Open critical tickets (source: support system)
    - Ticket sentiment trend (source: support system)
    - Time to resolution vs. SLA (source: support system)
  Scoring logic: [Tiered as above]
```

**Step 2: Configure in CS Platform**
- Create custom measures for each input
- Map data sources to measures (API endpoints, field mappings)
- Build scoring rules with threshold logic
- Configure component weights
- Set up composite score calculation
- Define color coding (green/yellow/red thresholds)

**Step 3: Validate and Calibrate**
- Run the score against historical data
- Compare predicted risk to actual churn outcomes
- Identify accounts where the score seems wrong (over-predicting or under-predicting risk)
- Adjust weights and thresholds based on validation
- Re-validate quarterly

**Step 4: Deploy and Monitor**
- Publish scores to CSM dashboards
- Configure alerts for score changes (drops > 10 points)
- Build manager views (portfolio distribution, trend analysis)
- Set up weekly health score review cadence
- Track score-to-outcome correlation monthly

### Health Score Display

**CSM View (Account Level):**

```
ACCOUNT HEALTH: 72 / 100 [YELLOW]
Trend: ↓ -8 points over 30 days

  Product Usage:    68/100  ↓  [Key concern: DAU/MAU declining]
  Engagement:       78/100  →  [Stable, meeting attendance good]
  Business Outcomes: 80/100  ↑  [Success plan on track]
  Support:          60/100  ↓  [2 open P1 tickets]

RECOMMENDED ACTION: Review open P1 tickets and schedule check-in
                    to address usage decline.
```

**Manager View (Portfolio Level):**

```
PORTFOLIO HEALTH DISTRIBUTION

Green (80-100):   45 accounts (55%)  │████████████████████████████  │
Yellow (60-79):   25 accounts (30%)  │████████████████             │
Red (0-59):       12 accounts (15%)  │████████                     │

Trend vs. Last Month:
  Improved:    8 accounts
  Stable:     62 accounts
  Declined:   12 accounts

Top At-Risk Accounts:
  1. Account A - Score 42, ARR $180K [Critical: Champion departed]
  2. Account B - Score 48, ARR $95K [High: Usage decline 60%]
  3. Account C - Score 55, ARR $220K [Medium: NPS detractor]
```

---

## Section 4: Playbook Automation

### What Is a CS Playbook?

A playbook is a standardized set of actions triggered by a specific customer event or condition. Playbooks ensure consistent execution, reduce CSM decision fatigue, and enable best practices to scale across the team.

### Playbook Architecture

```
TRIGGER → CONDITION CHECK → ACTION SEQUENCE → OUTCOME TRACKING

Example:
  Trigger: Health score drops below 60
  Condition: Account ARR > $25K AND renewal within 180 days
  Actions:
    1. Alert CSM (Slack notification)
    2. Create task: "Schedule risk assessment call" (due: 3 days)
    3. Send internal brief to CS Manager
    4. If not resolved in 14 days: Escalate to CS Director
  Outcome: Track whether account returns to 60+ within 30 days
```

### Core Playbook Library

**Lifecycle Playbooks:**

| Playbook | Trigger | Key Actions | Target Outcome |
|----------|---------|-------------|----------------|
| New Customer Welcome | Contract signed | Welcome email, kickoff scheduling, resource sharing | Kickoff within 5 business days |
| Onboarding Milestone Check | Day 14, 30, 60, 90 | Usage check, milestone assessment, intervention if behind | Time-to-value < 45 days |
| First QBR Prep | Day 75 (pre-QBR) | Data collection, deck prep, scheduling | QBR conducted by Day 90 |
| Renewal Prep | -120 days to renewal | Assessment, strategy, engagement, closure | Renewal signed by expiration |

**Risk Playbooks:**

| Playbook | Trigger | Key Actions | Target Outcome |
|----------|---------|-------------|----------------|
| Usage Decline | Usage drops 30%+ over 30 days | CSM alert, check-in call, reactivation plan | Usage stabilizes within 30 days |
| Champion Departure | Key contact marked as departed | Identify successor, request intro, rebuild relationship | New champion identified within 30 days |
| NPS Detractor | NPS score 0-6 | CSM call within 4 hours, root cause analysis, remediation | Move to passive (7+) within 90 days |
| Support Escalation | P1 ticket open > 48 hours | CSM alert, customer communication, internal escalation | Resolution within SLA |

**Expansion Playbooks:**

| Playbook | Trigger | Key Actions | Target Outcome |
|----------|---------|-------------|----------------|
| Usage Ceiling | Usage at 80%+ of plan limit | In-app prompt, CSM outreach, upgrade proposal | Upsell conversation within 14 days |
| Feature Request Premium | Customer requests premium feature | Demo scheduling, value framing, proposal | Upsell pipeline within 30 days |
| Multi-Department Signal | New department mentioned in call notes | Discovery call, stakeholder mapping, pilot proposal | Cross-sell pipeline within 30 days |

### Playbook Automation Configuration

**Automation Layers:**

| Layer | What Is Automated | What Requires Human |
|-------|-------------------|-------------------|
| Trigger detection | Data monitors, threshold alerts | Contextual judgment on false positives |
| Task creation | Automatic task assignment with due dates | Task execution and customer interaction |
| Communication | Template emails, Slack notifications | Personalized outreach, executive communication |
| Escalation | Time-based escalation if tasks overdue | Judgment on escalation severity and approach |
| Reporting | Automated dashboards and trend tracking | Insight interpretation and strategy adjustment |

### Measuring Playbook Effectiveness

| Metric | Definition | Target |
|--------|-----------|--------|
| Trigger accuracy | % of triggers that represent real situations (not false positives) | 85%+ |
| Action completion rate | % of playbook actions completed within SLA | 90%+ |
| Time to first action | Time from trigger to first CSM action | <24 hours |
| Outcome achievement | % of playbooks that achieve target outcome | 70%+ |
| Escalation rate | % of playbooks that require escalation beyond CSM | <15% |

---

## Section 5: CS Ops Operating Cadence

### Daily Operations

- Monitor data sync health (all integrations flowing correctly)
- Review automated alert queue for anomalies
- Triage new playbook triggers
- Resolve data quality issues flagged by CSMs

### Weekly Operations

- Review playbook effectiveness metrics
- Audit overdue CSM tasks and follow up
- Health score distribution review with CS leadership
- Update any broken automations or data mappings

### Monthly Operations

- Health score calibration review (score vs. actual outcomes)
- Playbook performance analysis (which playbooks drive outcomes?)
- Data quality audit and remediation
- Platform usage analysis (are CSMs using the tools effectively?)

### Quarterly Operations

- Health score model re-validation and weight adjustment
- Playbook library review (add, modify, or retire playbooks)
- CS platform ROI assessment
- Data architecture review and optimization
- Technology stack evaluation (new tools, upgrades, replacements)

---

## Key References

- Gainsight: Platform documentation and best practices
- ChurnZero: CS operations playbooks
- TSIA: CS operations maturity model
- Totango: SuccessBLOC methodology
- Vitally: Product-led CS operations

---

## Summary

CS Ops is the function that transforms customer success from an art into a science. Platform selection determines the operational foundation—Gainsight for enterprise scale, ChurnZero for in-app engagement, Totango for rapid deployment, Vitally for product-led motions. Data infrastructure ensures that the CS platform has accurate, timely, and complete customer data from CRM, product analytics, support, and billing systems. Health score implementation translates conceptual models into production-grade scoring with validated predictive accuracy. Playbook automation ensures that best practices execute consistently across the entire customer base, with appropriate escalation when automation is insufficient. The Customer Success Brain treats CS Ops as the critical infrastructure that enables everything else—without reliable data, accurate health scores, and automated workflows, customer success cannot scale.

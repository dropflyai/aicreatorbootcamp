# Adoption Acceleration

## The Adoption Imperative

Product adoption is the bridge between technical implementation and business
value realization. A product that is deployed but not adopted is a product
that will churn. Gainsight research (2024) shows that customers in the bottom
quartile of adoption scores are 6.2x more likely to churn than those in the
top quartile. Adoption is the single strongest predictor of renewal.

---

## Adoption Dimensions

### The Three Dimensions of Adoption

Adoption is not a single metric — it is a multi-dimensional construct that
must be measured across three axes:

```
                    FEATURE BREADTH
                    (How many features?)
                         │
                         │
                         │
          ┌──────────────┼──────────────┐
         ╱              ╱│             ╱│
        ╱              ╱ │            ╱ │
       ╱──────────────╱──│───────────╱  │
      │               │  │          │   │
      │   ADOPTION    │  │          │   │
      │   VOLUME      │  │          │   │
      │               │  └──────────│───┘
      │               │ ╱           │  ╱
      │               │╱            │ ╱── USER PENETRATION
      └───────────────┘─────────────┘    (How many users?)
                    ╱
                   ╱
        FEATURE DEPTH
        (How intensively?)
```

#### Dimension 1: Feature Breadth

What percentage of relevant features is the customer using?

```
Feature Breadth = Features Actively Used / Features Available for Use Case x 100

Scoring:
  0-25%:   Critical — customer using only basic functionality
  25-50%:  Low — significant adoption opportunity
  50-75%:  Moderate — good foundation, room to grow
  75-100%: Strong — deep product utilization
```

**Important**: Not all features are relevant to every customer. Breadth must be
measured against the customer's specific use case, not the total feature set.
A customer using 40% of features may be at 100% breadth for their use case.

#### Dimension 2: Feature Depth

How intensively is each feature being used?

```
Feature Depth = Actual Usage Frequency / Expected Usage Frequency x 100

For each key feature, define:
- Expected daily/weekly/monthly usage for this customer's use case
- Actual measured usage over the same period
- Depth score per feature, then weighted average across all features

Example (Project Management Tool):
Feature          | Expected  | Actual   | Depth
─────────────────|───────────|──────────|──────
Task creation    | 50/week   | 45/week  | 90%
Time tracking    | 200/week  | 80/week  | 40%
Reporting        | 5/week    | 2/week   | 40%
Integrations     | Daily sync| Daily    | 100%
Automations      | 10 active | 3 active | 30%
─────────────────|───────────|──────────|──────
Weighted Average:                        | 60%
```

#### Dimension 3: User Penetration

What percentage of licensed users are actively engaged?

```
User Penetration = Active Users / Licensed Users x 100

Active User Definitions (choose based on product type):
- DAU: Daily Active User (logged in and performed meaningful action today)
- WAU: Weekly Active User (meaningful action in past 7 days)
- MAU: Monthly Active User (meaningful action in past 30 days)

Scoring:
  0-20%:   Critical — shelfware risk
  20-40%:  Low — limited organizational embedding
  40-60%:  Moderate — growing but not pervasive
  60-80%:  Strong — broadly adopted
  80-100%: Excellent — deeply embedded in organization
```

---

## Stickiness Metrics

### What Makes a Product Sticky?

Stickiness measures how embedded a product is in the customer's operations.
Sticky products have high switching costs, making churn economically and
operationally painful. The stickier the product, the higher the retention.

### Stickiness Score Calculation

```
Stickiness Score (0-100) = Weighted composite of:

1. Integration Depth (25% weight)
   - Number of active integrations
   - Data volume flowing through integrations
   - Bidirectional vs. unidirectional
   Score: (Active Integrations / Maximum Possible) x 100

2. Workflow Dependency (25% weight)
   - Number of business processes dependent on product
   - Criticality of those processes (mission-critical, important, nice-to-have)
   Score: Sum of (Process Criticality Weight x Dependency Indicator) / Max Possible x 100

3. Data Investment (20% weight)
   - Volume of customer data stored in product
   - Uniqueness of data (exists only in this product)
   - Historical depth of data
   Score: Data Volume Index x Uniqueness Factor x Historical Depth Factor

4. User Habit Formation (15% weight)
   - DAU/MAU ratio (stickiness ratio)
   - Session frequency and duration trends
   - Return visit consistency
   Score: DAU/MAU Ratio x 100 (target: > 0.40 for daily-use products)

5. Organizational Spread (15% weight)
   - Number of departments using product
   - Number of teams with distinct workflows
   - Executive-level usage
   Score: (Departments Active / Total Relevant Departments) x 100
```

### DAU/MAU Ratio (The Stickiness Ratio)

The DAU/MAU ratio is the most commonly used stickiness metric in product
analytics (popularized by Facebook/Meta):

```
Stickiness Ratio = DAU / MAU

Interpretation:
- 0.10 (10%): Monthly product, users come ~3 days/month
- 0.20 (20%): Weekly product, users come ~6 days/month
- 0.40 (40%): Near-daily product, users come ~12 days/month
- 0.60 (60%): Daily essential, users come ~18 days/month
- 0.80+ (80%): Critical daily tool, users come ~24+ days/month

SaaS Benchmarks:
- Email/Communication tools: 0.50-0.70
- Project Management: 0.30-0.50
- CRM: 0.20-0.40
- Analytics: 0.15-0.30
- HR/Admin tools: 0.10-0.20
```

---

## Adoption Playbooks

### Playbook 1: New Feature Adoption

Triggered when a new feature launches or an existing feature has low adoption.

```
NEW FEATURE ADOPTION PLAYBOOK
──────────────────────────────
Trigger: Feature adoption < 30% at Day 30 post-launch

Step 1: Segment (Day 0-3)
  ├── Identify customers who would benefit from the feature
  ├── Segment by likelihood to adopt (based on use case fit)
  └── Prioritize outreach by segment

Step 2: Educate (Day 3-7)
  ├── In-app announcement/tooltip for the feature
  ├── Email campaign: "New Feature: [Name] — Here's How It Helps"
  ├── Webinar: Feature deep-dive with live demo
  └── Knowledge base article with step-by-step guide

Step 3: Activate (Day 7-21)
  ├── CSM proactively introduces feature during regular touchpoints
  ├── Offer 1:1 feature walkthrough for high-value accounts
  ├── Create "quick win" template that demonstrates feature value
  └── In-app guided tour for first-time feature users

Step 4: Reinforce (Day 21-30)
  ├── Share success stories from early adopters
  ├── Highlight feature usage in QBR discussions
  ├── Include feature in adoption health score
  └── Measure and report adoption lift vs. baseline

Step 5: Evaluate (Day 30+)
  ├── If adoption > 50%: Continue passive reinforcement
  ├── If adoption 30-50%: One more targeted push
  └── If adoption < 30%: Analyze barriers, escalate to Product
```

### Playbook 2: Low Adoption Rescue

Triggered when overall adoption score drops below threshold.

```
LOW ADOPTION RESCUE PLAYBOOK
────────────────────────────
Trigger: Composite adoption score < 40% for 30+ days

Step 1: Diagnose (Day 0-5)
  ├── Analyze which dimension is weakest (breadth, depth, penetration)
  ├── Compare current usage to success plan expectations
  ├── Interview primary contact: "What's preventing fuller use?"
  ├── Check for technical blockers (integration failures, bugs)
  └── Review support ticket history for adoption-related issues

Step 2: Intervene (Day 5-15)
  ├── Schedule "re-onboarding" session focused on gap areas
  ├── Create custom adoption roadmap with weekly targets
  ├── Assign specific adoption milestones with dates
  ├── Offer office hours or dedicated training slots
  └── Address any technical blockers with Engineering escalation

Step 3: Monitor (Day 15-45)
  ├── Weekly adoption metric review
  ├── Bi-weekly check-in calls focused on adoption progress
  ├── Celebrate wins: "Your team's usage of [Feature] increased 40%!"
  └── If no improvement by Day 30, escalate to CS manager

Step 4: Evaluate (Day 45+)
  ├── If adoption > 60%: Return to standard monitoring
  ├── If adoption 40-60%: Extend intervention with adjusted approach
  └── If adoption < 40%: Flag as at-risk, initiate risk playbook
```

### Playbook 3: Champion Enablement

Build internal champions who drive adoption from within the customer org.

```
CHAMPION ENABLEMENT PLAYBOOK
─────────────────────────────
Trigger: New customer onboarded, or champion change detected

Step 1: Identify Champions
  ├── High-usage individuals (top 10% by usage frequency)
  ├── Vocal advocates (positive feedback, feature requests)
  ├── Organizational influencers (management, team leads)
  └── Power users who help colleagues (informal support)

Step 2: Invest in Champions
  ├── Offer advanced training and certification
  ├── Invite to beta programs and early access
  ├── Provide "Champion Kit" (internal presentation deck, talking points)
  ├── Connect with product team (advisory board, feedback sessions)
  └── Recognize publicly (customer newsletter, community spotlight)

Step 3: Empower Champions to Drive Adoption
  ├── Train-the-trainer programs
  ├── Internal communication templates for champions
  ├── Usage dashboards champions can share with their leadership
  └── Success metric templates for internal business cases

Step 4: Sustain Champions
  ├── Regular check-ins (monthly 1:1 with CSM)
  ├── Early warning if champion usage declines
  ├── Succession planning if champion changes roles
  └── Multi-threading beyond the champion
```

---

## Adoption Milestone Framework

### Universal Adoption Milestones

Define adoption milestones that apply across customer segments:

```
ADOPTION MATURITY LEVELS
════════════════════════

Level 0: Deployed (Technical)
  ├── Product is technically live
  ├── Users have access
  └── NOT adoption — this is implementation completion

Level 1: Activated (Basic Usage)
  ├── >50% of users have logged in
  ├── Core workflow completed at least once
  └── Milestone: "First meaningful action"

Level 2: Engaged (Regular Usage)
  ├── >50% of users active weekly
  ├── Core workflows used regularly
  ├── 2+ features actively used
  └── Milestone: "Habitual usage established"

Level 3: Embedded (Operational Dependency)
  ├── Product integrated into daily operations
  ├── 2+ integrations active
  ├── >70% of users active weekly
  └── Milestone: "Operational dependency"

Level 4: Optimized (Full Value)
  ├── >70% of relevant features used
  ├── Advanced features and automations active
  ├── >80% user penetration
  └── Milestone: "Full value realization"

Level 5: Expanding (Growth Mode)
  ├── New use cases identified
  ├── Additional teams requesting access
  ├── Customer contributing to product feedback
  └── Milestone: "Expansion-ready"
```

---

## References

1. Gainsight. (2024). *Product Adoption Benchmarks*. Gainsight Research.
2. Murphy, L. (2020). "Adoption is the Bridge to Value." Sixteen Ventures.
3. Pendo. (2023). *State of Product Engagement Report*.
4. Mixpanel. (2023). *Product Benchmarks Report*.
5. TSIA. (2023). *Adoption Science in Technology Services*.
6. McClure, D. (2007). "Startup Metrics for Pirates: AARRR." 500 Startups.

---

**Deployment without adoption is shelfware. Adoption without depth is
superficial. Deep adoption is the foundation of retention.**

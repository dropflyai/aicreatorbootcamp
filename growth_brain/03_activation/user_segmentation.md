# User Segmentation -- Behavioral and Intent-Based Activation

## Why Segmentation is Critical for Growth

### The Heterogeneity Problem

Users are not uniform. A "10% activation rate" hides enormous variance:
some segments may activate at 40% while others activate at 2%. Treating
all users identically means under-serving the high-potential segments and
wasting resources on segments that may never activate.

Brian Balfour (Reforge): "The biggest unlock in growth is usually not a
better tactic; it is a better segmentation that reveals which users to
prioritize and how to serve them differently."

### Segmentation Impact on Growth Math

```
Scenario: 10,000 new signups per month

Unsegmented approach (same onboarding for all):
  Activation rate: 25%
  Activated users: 2,500

Segmented approach (tailored onboarding per segment):
  Segment A (3,000 users): 40% activation = 1,200
  Segment B (4,000 users): 25% activation = 1,000
  Segment C (3,000 users): 15% activation = 450
  Total activated: 2,650 (+6% improvement)

  After optimizing each segment's onboarding:
  Segment A (3,000 users): 50% activation = 1,500
  Segment B (4,000 users): 30% activation = 1,200
  Segment C (3,000 users): 20% activation = 600
  Total activated: 3,300 (+32% improvement from original)
```

Segmentation unlocks targeted optimization that aggregate approaches cannot.

---

## Behavioral Segmentation

### First-Session Behavior Clusters

Analyze first-session behavior to identify natural user clusters:

**Methodology**:
1. Collect all first-session events (pages viewed, actions taken, time spent)
2. Apply clustering algorithm (K-means, DBSCAN, or hierarchical)
3. Identify 3-5 distinct behavioral clusters
4. Name and characterize each cluster
5. Track downstream retention by cluster

**Common clusters discovered** (examples from SaaS products):

| Cluster | Behavior Pattern | Typical Retention | Strategy |
|---------|-----------------|-------------------|----------|
| Explorers | Browse many features, low depth | Medium (20-30% D30) | Guide toward depth |
| Doers | Jump straight to core action | High (40-60% D30) | Remove friction |
| Evaluators | Check pricing, docs, compare | Low-Medium (15-25% D30) | Prove value fast |
| Confused | Short sessions, help-seeking | Low (5-15% D30) | Simplify + guide |
| Power users | Deep engagement from day 1 | Very High (50-70% D30) | Unlock advanced features |

### Behavioral Signals for Segmentation

**High-intent signals** (prioritize these users):
- Completed setup in first session
- Invited team members
- Connected integrations
- Visited pricing page
- Imported data from competitor

**Low-intent signals** (nurture or deprioritize):
- Single-page visit, bounced
- Signed up but never returned
- Only viewed marketing content
- Signed up with disposable email
- Signed up for incentive (promo, referral reward only)

**Engagement velocity signals**:
```
User Engagement Score = SUM of (Action Weight x Action Count) / Days Since Signup

High-weight actions: Core value actions, team invitations, integrations
Medium-weight actions: Settings changes, profile updates, content creation
Low-weight actions: Page views, help page visits, settings browsing
```

---

## Intent-Based Segmentation

### Inferred Intent from Acquisition Context

The channel through which a user arrives reveals their intent:

| Channel | Likely Intent | Onboarding Strategy |
|---------|--------------|---------------------|
| Google search (branded) | Knows product, evaluating | Skip intro, fast setup |
| Google search (problem) | Has problem, seeking solution | Show how product solves it |
| Referral from colleague | Trusts product, social proof | Leverage referrer context |
| Product Hunt / HN | Early adopter, curious | Show innovation, power features |
| Paid ad (retargeting) | Already aware, revisiting | Resume where they left off |
| Paid ad (prospecting) | Low awareness, needs education | Value proposition first |
| Blog / content | Informed but uncommitted | Bridge content topic to product |

### Self-Declared Intent

Ask users about their intent during signup (1-2 questions maximum):

**Question 1: Role/Use Case**
"What best describes your role?"
- Individual contributor → Solo onboarding flow
- Team lead → Team setup flow
- Executive → Dashboard/reporting flow
- Evaluating for team → Evaluation flow with comparison data

**Question 2: Primary Goal**
"What is your primary goal with [product]?"
- Option A → Tailored to use case A
- Option B → Tailored to use case B
- Option C → Tailored to use case C
- Not sure → Guided exploration flow

### Combining Declared and Observed Intent

```
Segment Matrix:
                    Declared Intent
                    High         Low/Unclear
Observed    High    CHAMPION     SILENT LOVER
Behavior    Low     SKEPTIC      AT-RISK

CHAMPION: Activate aggressively, offer premium features
SILENT LOVER: Surface sharing/advocacy opportunities
SKEPTIC: Provide proof points, case studies, trial extensions
AT-RISK: Simplified onboarding, re-engagement campaigns
```

---

## Persona-Based Activation

### Building Growth Personas

Growth personas differ from marketing personas. Marketing personas describe
who people are; growth personas describe how people behave with the product.

**Growth Persona Template**:
```
Persona Name: [Descriptive name]
Size: [% of total users]
Acquisition source: [Primary channels]
First-session behavior: [Key actions and patterns]
Aha Moment: [What value resonates for this persona]
Natural frequency: [How often they would use ideally]
Activation rate: [Current rate for this persona]
D30 retention: [Current retention]
LTV: [Estimated lifetime value]
Primary friction: [What blocks activation]
Opportunity: [Specific intervention to improve]
```

### Persona Prioritization

Not all personas deserve equal investment. Prioritize by:

```
Persona Value Score = Segment Size x LTV x (Activation Potential - Current Rate)

Where:
  Segment Size = % of total signups
  LTV = estimated lifetime value for this persona
  Activation Potential = reasonable target activation rate
  Current Rate = current activation rate

High Value Score = large segment, high LTV, large gap to potential
```

### Example Persona Set

**The Power User (15% of signups)**
- Arrives from developer communities, HN, Product Hunt
- Creates 5+ items in first session
- Activation rate: 55% (already high)
- D30 retention: 65%
- LTV: $2,400
- Strategy: Remove friction, unlock advanced features, convert to advocate

**The Team Leader (25% of signups)**
- Arrives from referral or organic search
- Invites team in first session
- Activation rate: 35% (moderate, high potential)
- D30 retention: 45%
- LTV: $8,500 (team account)
- Strategy: Optimize team setup flow, ensure team joins quickly

**The Evaluator (30% of signups)**
- Arrives from paid ads or comparison searches
- Views pricing, docs, and features but takes few actions
- Activation rate: 18% (low, moderate potential)
- D30 retention: 20%
- LTV: $1,200
- Strategy: Provide instant demo, case studies, and proof of value

**The Casual Explorer (30% of signups)**
- Arrives from content or social media
- Brief first session, explores but does not act
- Activation rate: 8% (low, low-moderate potential)
- D30 retention: 8%
- LTV: $400
- Strategy: Low-touch engagement, email nurture, do not over-invest

---

## Segmented Onboarding Implementation

### Architecture for Segmented Onboarding

```
User Signup
    │
    ▼
┌──────────────┐
│  Segmentation │ ← Declared: role, goal, team size
│    Engine      │ ← Inferred: channel, device, behavior
└──────┬───────┘
       │
       ├──→ Segment A → Onboarding Flow A → Aha Moment A
       ├──→ Segment B → Onboarding Flow B → Aha Moment B
       ├──→ Segment C → Onboarding Flow C → Aha Moment C
       └──→ Default   → General Flow      → Generic Aha
```

### Real-Time Segment Reassignment

Initial segmentation is a guess. As the user takes actions, the system
should reassign segments based on observed behavior:

```
Rule Engine:
  IF user declared "solo" BUT invited 3+ team members
  THEN reassign to "team leader" segment

  IF user declared "evaluating" BUT completed full setup
  THEN reassign to "committed" segment

  IF user was in "power user" segment BUT has not returned in 5 days
  THEN reassign to "at-risk power user" segment
```

### Measuring Segmented Activation

Track independently for each segment:

| Metric | Segment A | Segment B | Segment C | Overall |
|--------|-----------|-----------|-----------|---------|
| Signups | 3,000 | 4,000 | 3,000 | 10,000 |
| Activation Rate | 50% | 30% | 20% | 33% |
| D7 Retention | 60% | 40% | 25% | 41% |
| D30 Retention | 45% | 28% | 15% | 29% |
| Avg TTV (hours) | 2 | 8 | 24 | 11 |

If overall activation improves but one segment declines, investigate
immediately. Segment-level visibility prevents aggregate metrics from
masking problems.

---

## Advanced Segmentation Techniques

### Predictive Segmentation (ML-Based)

Train a model to predict activation probability from early signals:

```
Features:
  - Acquisition channel
  - Device type
  - First-session duration
  - Number of first-session actions
  - Specific actions taken (binary features)
  - Time of signup (day of week, hour)
  - Company size (if B2B)

Target: Activated within 14 days (binary)

Model: Gradient Boosted Trees or Logistic Regression
Output: P(activation) for each new user
```

Use the prediction to:
- **High P(activation)**: Light-touch onboarding, focus on expansion
- **Medium P(activation)**: Aggressive onboarding, human outreach
- **Low P(activation)**: Automated nurture, do not invest human time

### RFM Segmentation (Adapted for Growth)

Recency-Frequency-Monetary adapted for product usage:

```
R = Days since last session (lower = better)
F = Sessions in last 30 days (higher = better)
M = Core actions in last 30 days (higher = better)

Score each 1-5, creating segments like:
  555: Power users (retain and expand)
  554: Frequent but shallow (deepen engagement)
  511: Recently active but infrequent (build habit)
  155: Historically active, churning (win-back)
  111: Dormant (automated resurrection only)
```

### Cohort x Segment Analysis

The most powerful analysis crosses temporal cohorts with behavioral segments:

```
                    Power Users    Team Leads    Evaluators    Explorers
Jan Cohort D30      65%            45%           20%           8%
Feb Cohort D30      68%            48%           22%           10%
Mar Cohort D30      70%            52%           18%           9%
```

This reveals:
- Which segments are improving (Power Users, Team Leads improving)
- Which segments need attention (Evaluators declining in Mar)
- Where product changes are having impact (or not)

---

## Segmentation Governance

### Rules for Segment Management

1. **Minimum segment size**: Each segment must contain >5% of users.
   Smaller segments lack statistical power for experimentation.

2. **Actionable differences**: Segments must differ in a way that implies
   a different growth action. Segments that get the same treatment are
   not useful segments.

3. **Measurable assignment**: Every user must be assignable to a segment
   using available data. A segment defined by unobservable characteristics
   is not implementable.

4. **Periodic review**: Review segment definitions quarterly. User behavior
   evolves, and segments that were once distinct may converge.

5. **Segment proliferation limit**: Maintain 3-5 segments maximum. More
   segments create operational complexity without proportional learning gains.

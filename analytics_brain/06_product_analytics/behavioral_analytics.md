# Behavioral Analytics — Understanding How Users Actually Use Your Product

---

## Overview

Behavioral analytics is the discipline of studying what users do in a product — their flows, patterns, habits, and progression — to inform product decisions. Unlike traditional web analytics (which counts page views and sessions), behavioral analytics tracks meaningful actions and connects them to outcomes. It answers: "What behavior patterns separate successful users from those who churn?"

This module covers user flow analysis, session analysis, feature adoption measurement, power user identification, and the analytical techniques that connect product behavior to business outcomes. The frameworks draw from Amplitude's product analytics methodology, the Reforge growth framework, and behavioral science foundations.

---

## User Flow Analysis

### What Users Actually Do vs. What We Design For

Product teams design intended user flows — the happy path from signup to value realization. Behavioral analytics reveals actual user flows — what users really do, which is often dramatically different from what was designed.

### Flow Visualization Techniques

**Sankey Diagrams:**
Visualize all paths users take through a sequence of screens or actions. Width of each flow proportional to user volume.

```
Homepage ─────────────── Pricing ──────── Signup ────── Onboarding
   │    50%                 │   40%         │  70%
   │                        │               │
   ├───── Features ─────────┘               │
   │    30%                                 │
   │                                        │
   └───── Blog ──── Exit                    └──── Activate
        20%          60%                          55%
```

**Key metrics from flow analysis:**
- **Path frequency:** How often does each path occur? The most common path is the de facto "happy path" — design for it even if it was not the intended path.
- **Path conversion:** What is the end-to-end conversion rate for each path?
- **Path length:** How many steps does the average user take? Shorter paths typically convert better.
- **Deviation points:** Where do users leave the intended path? These are UX friction points.

### Path Analysis Methods

**Sequential funnel analysis:**
Define a specific sequence of events and measure conversion through each step.
```
Step 1: landing_page_viewed     → 100% (entry point)
Step 2: signup_form_started     → 42%  (58% drop-off)
Step 3: signup_form_completed   → 28%  (33% of starters abandon)
Step 4: onboarding_started      → 25%  (11% of completers skip onboarding)
Step 5: first_core_action       → 14%  (44% of onboarders do not reach core value)
```

**Unstructured path mining:**
Instead of imposing a predefined funnel, discover the most common actual paths:
```sql
-- Top 10 most common 3-step paths from first session
SELECT
  event_1 || ' → ' || event_2 || ' → ' || event_3 as path,
  count(*) as path_count,
  count(*) * 100.0 / sum(count(*)) over() as path_pct
FROM (
  SELECT
    user_id,
    event_name as event_1,
    LEAD(event_name, 1) OVER (PARTITION BY user_id ORDER BY timestamp) as event_2,
    LEAD(event_name, 2) OVER (PARTITION BY user_id ORDER BY timestamp) as event_3
  FROM events
  WHERE session_number = 1
)
WHERE event_3 IS NOT NULL
GROUP BY 1
ORDER BY 2 DESC
LIMIT 10
```

---

## Session Analysis

### Defining a Session

A session is a period of continuous user engagement, bounded by inactivity. The standard session timeout is 30 minutes of inactivity (Google Analytics convention), but the appropriate timeout varies by product:

| Product Type | Recommended Timeout | Rationale |
|-------------|-------------------|-----------|
| Real-time communication | 5-10 minutes | Conversations are brief |
| Productivity tool | 30 minutes | Work sessions with breaks |
| Content consumption | 30 minutes | Standard browsing behavior |
| Developer tool | 60 minutes | Deep work sessions with interruptions |
| Mobile game | 5-15 minutes | Short play sessions |
| Enterprise software | 60 minutes | Complex workflows with interruptions |

### Session Metrics

**Session frequency:**
- Sessions per user per week (or month)
- Distribution of session frequency across users (heavily right-skewed)
- Session frequency trend over user lifecycle (increasing = habit formation)

**Session depth:**
- Events per session (how much does the user do?)
- Unique features per session (how broadly do they engage?)
- Session duration (raw time, but unreliable — idle time inflates duration)
- Active time per session (time between events, capped at session timeout)

**Session quality:**
- Core actions per session (how often do they reach the product's value?)
- Session outcome (did the session end in value delivery or frustration?)
- Error rate per session (errors encountered / total actions)

### Session Segmentation

Segment sessions to understand different usage modes:

**By depth:**
- Shallow sessions: < 3 actions (quick check, notification response)
- Medium sessions: 3-10 actions (standard use)
- Deep sessions: > 10 actions (power usage, creation, exploration)

**By purpose (inferred from first action):**
- Creation sessions: first action is create/write/build
- Consumption sessions: first action is view/read/browse
- Management sessions: first action is settings/admin/organize
- Search sessions: first action is search

---

## Feature Adoption Analysis

### The Adoption Lifecycle

```
                Discovery → Trial → Adoption → Habit → Mastery
                  │          │        │          │        │
Awareness: "I    First    Regular   Automatic  Deep
know it exists"  use      use       use        expertise
```

### Feature Adoption Metrics

**Adoption rate:**
```
Feature Adoption Rate = Users who used feature / Users who could have used feature
```
The denominator matters — "could have used" means the feature was available (correct plan, correct role, visible in UI).

**Time to adoption:**
Median time from account creation to first use of the feature. Long time-to-adoption suggests discovery problems.

**Adoption depth:**
Not just "did they use it?" but "how much did they use it?"
```
Light adoption:  Used 1-2 times (tried it)
Medium adoption: Used 3-10 times (exploring)
Heavy adoption:  Used 10+ times (integrated into workflow)
```

**Feature stickiness:**
```
Feature DAU / Feature MAU

Interpretation:
> 50%: Very sticky — users who try it use it daily
25-50%: Moderately sticky — regular but not daily
< 25%: Not sticky — users try it but do not return
```

### Feature Impact Analysis

The ultimate question: does this feature make the product more valuable?

**Retention impact:**
Compare retention curves for users who adopted the feature vs. those who did not.
```
D30 Retention (Feature Adopted):     52%
D30 Retention (Feature Not Adopted): 31%
Lift: +21 percentage points

CAUTION: This is observational, not causal. Users who adopt features
may be inherently more engaged. See behavioral cohorts in 03_analysis/cohort_analysis.md
```

**Revenue impact:**
Compare LTV, ARPU, or upgrade rates between adopters and non-adopters.

**Engagement impact:**
Compare session frequency, session depth, and overall product engagement between feature adopters and non-adopters.

### Feature Adoption Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    FEATURE ADOPTION OVERVIEW                     │
├────────────────┬──────────┬───────────┬───────────┬─────────────┤
│ Feature        │ Adoption │ Stickiness│ D30 Ret   │ Rev Impact  │
│                │ Rate     │ (DAU/MAU) │ Lift      │ (ARPU lift) │
├────────────────┼──────────┼───────────┼───────────┼─────────────┤
│ Team Spaces    │ 67%      │ 45%       │ +18pp     │ +$12/mo     │
│ Templates      │ 43%      │ 22%       │ +8pp      │ +$5/mo      │
│ API Access     │ 12%      │ 62%       │ +25pp     │ +$45/mo     │
│ Mobile App     │ 31%      │ 38%       │ +15pp     │ +$8/mo      │
│ Integrations   │ 28%      │ 55%       │ +22pp     │ +$20/mo     │
└────────────────┴──────────┴───────────┴───────────┴─────────────┘
```

---

## Power User Analysis

### Defining Power Users

Power users are the product's most engaged, most valuable users. Understanding their behavior reveals what the product looks like when it is working perfectly — and provides a behavioral blueprint for other users.

### Identification Methods

**Method 1: Quantile-Based**
Define power users as the top 10% (or 5%, or 20%) of users by a chosen engagement metric:
```sql
SELECT
  user_id,
  total_actions,
  NTILE(10) OVER (ORDER BY total_actions) as decile
FROM user_engagement_monthly
WHERE month = current_month
```
Power users = users in decile 10 (top 10%).

**Method 2: Behavioral Threshold**
Define specific behavioral criteria:
```
Power User Criteria (all must be met):
  - Active 5+ days per week
  - Uses 3+ features per session
  - Has created 10+ artifacts
  - Has been active for 30+ days
```

**Method 3: Composite Engagement Score**
Build a weighted score from multiple engagement dimensions:
```
Engagement Score = w1 * session_frequency_normalized
                + w2 * feature_breadth_normalized
                + w3 * content_created_normalized
                + w4 * collaboration_actions_normalized

Power Users: Score > P90
```

### Power User Behavioral Profile

Once identified, profile power users across all available dimensions:

**Behavioral patterns:**
- What features do power users use that others do not?
- What is the sequence of actions in their typical session?
- What was their onboarding experience? (Faster? More complete?)
- When did they become power users? (Which week post-signup?)
- What triggered the transition from regular to power user?

**Demographic patterns:**
- Are power users concentrated in specific plan tiers?
- Are they concentrated in specific company sizes or industries?
- Are they concentrated in specific acquisition channels?
- Are they concentrated in specific roles?

**Value patterns:**
- How much more revenue do power users generate? (LTV differential)
- How much more likely are power users to refer? (Viral coefficient differential)
- How much less support do power users require? (Support ticket rate differential)

### The Power User Playbook

The goal of power user analysis is not just understanding — it is replication. Use power user behavioral patterns to:

1. **Optimize onboarding** — Guide new users toward behaviors that power users exhibit
2. **Design nudges** — Prompt regular users to try features that correlate with power-user status
3. **Identify at-risk power users** — Detect engagement declines before churn
4. **Prioritize features** — Invest in features that power users value most

---

## Engagement Scoring

### Building an Engagement Score

An engagement score condenses multiple behavioral dimensions into a single composite metric.

**Step 1: Select input features**
```
- session_frequency (sessions per week)
- session_depth (actions per session)
- feature_breadth (unique features used per week)
- recency (days since last activity)
- content_creation (artifacts created per week)
- collaboration (shared items, comments, invites per week)
```

**Step 2: Normalize each feature**
Scale to 0-100 using percentile rank:
```python
# Percentile-based normalization
engagement_features['session_freq_score'] = (
    engagement_features['sessions_per_week']
    .rank(pct=True) * 100
)
```

**Step 3: Weight and combine**
```python
engagement_score = (
    0.25 * session_freq_score +
    0.20 * session_depth_score +
    0.15 * feature_breadth_score +
    0.20 * recency_score +
    0.10 * creation_score +
    0.10 * collaboration_score
)
```

**Step 4: Validate weights**
Validate that the composite score predicts outcomes:
- Does a higher score predict higher retention? (Should correlate > 0.5)
- Does a higher score predict higher LTV? (Should correlate > 0.3)
- Are the individual feature weights stable over time?

### Engagement Score Applications

| Application | How the Score Is Used |
|------------|----------------------|
| Churn prediction | Declining engagement score triggers proactive retention |
| Upsell targeting | High engagement + low plan tier = upgrade candidate |
| Support prioritization | High-engagement users get priority support |
| Feature targeting | Show advanced feature prompts to high-engagement users |
| Health scoring | Aggregate engagement scores for CSM account health dashboards |

---

## Behavioral Analytics Anti-Patterns

### Anti-Pattern 1: Counting Without Context
"Users performed 1.2 million actions last month" is meaningless without per-user distribution, action type breakdown, and trend context.

### Anti-Pattern 2: Assuming Feature Availability = Feature Awareness
A feature may be "available" to all users but discoverable only by those who navigate to a specific submenu. Low adoption may indicate a discovery problem, not a value problem.

### Anti-Pattern 3: Survivorship Bias in Behavioral Analysis
Analyzing only current active users excludes those who churned. Power user analysis on survivors over-represents behaviors of retained users and may miss early signals that could have prevented churn.

### Anti-Pattern 4: Time-Aggregated Behavior Metrics
Monthly active users (MAU) treats a user who logged in once on day 1 the same as a user who logged in every day. Always look at frequency distributions, not just period-level counts.

### Anti-Pattern 5: Confusing Engagement with Value
A user who spends 3 hours searching for something and failing is highly "engaged" by time-based metrics but received no value. Engagement metrics must be grounded in value-creating actions, not just any activity.

---

**Behavioral analytics transforms the product from a black box into a transparent system. When you can see what users actually do — not what they say they do, not what you designed for — you can build products that genuinely serve their needs.**

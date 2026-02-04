# Community Analytics — Authoritative Module

Analytics transforms community data into actionable insight. Raw metrics
are ingredients; analytics is the recipe that produces decisions. This
document codifies the analytics tooling, methodologies, and reporting
frameworks that enable evidence-based community management.

---

## 1. ANALYTICS TOOLING STACK

### Community Analytics Platforms

| Platform | Primary Function | Best For | Price Range |
|----------|-----------------|---------|-------------|
| Common Room | Unified community intelligence | Multi-platform communities | $$$$ |
| Orbit | Developer community analytics | DevRel, OSS communities | $$–$$$ |
| Discourse Analytics | Built-in forum analytics | Discourse communities | Free (built-in) |
| Discord Insights | Server analytics | Discord communities | Free (built-in) |
| Slack Analytics | Workspace analytics | Slack communities | Free–$$ |
| Circle Analytics | Built-in community analytics | Circle communities | Free (built-in) |
| Google Analytics | Web traffic analytics | Community websites/forums | Free |
| Mixpanel/Amplitude | Product analytics | Community-product integration | $$–$$$$ |

### Platform Selection Criteria

| Criterion | Weight | Questions |
|-----------|--------|-----------|
| Data coverage | High | Does it capture all platforms your community uses? |
| Integration | High | Does it connect with your existing tools (CRM, support)? |
| Segmentation | High | Can you segment by member type, cohort, behavior? |
| Attribution | Medium | Can you attribute business outcomes to community activity? |
| Automation | Medium | Can it trigger actions based on data (alerts, workflows)? |
| Cost | Medium | Does the cost justify the insight gained? |
| Ease of use | Medium | Can the community team use it without data engineering? |

### Recommended Stack by Community Size

| Size | Analytics Stack | Monthly Cost |
|------|---------------|-------------|
| 0–1,000 | Platform built-in + spreadsheet | $0 |
| 1,000–5,000 | Platform analytics + Google Analytics | $0–$200 |
| 5,000–20,000 | Orbit/Common Room + platform analytics | $200–$1,000 |
| 20,000–100,000 | Common Room + custom dashboards | $1,000–$5,000 |
| 100,000+ | Enterprise analytics stack + data warehouse | $5,000+ |

---

## 2. COMMON ROOM

### Overview

Common Room aggregates community activity across platforms (Discord,
Slack, GitHub, Twitter, Discourse) into a unified member view.

**Core Capabilities:**
- Unified member profiles across platforms
- Activity timeline per member
- Segment and filter by behavior
- Automated alerts for key events
- Integration with CRM (Salesforce, HubSpot)
- Custom reports and dashboards

### Common Room Analytics Model

```
Data Sources:
├── Discord activity
├── Slack messages
├── GitHub contributions
├── Twitter mentions
├── Forum posts
├── Event attendance
└── Custom sources (API)

    ↓ Unified into ↓

Member Profiles:
├── Identity (name, org, role)
├── Activity (all actions, all platforms)
├── Segments (cohort, tier, behavior)
├── Scores (engagement, influence, reach)
└── Journey (first seen → current state)

    ↓ Analyzed via ↓

Insights:
├── Engagement trends
├── Churn risk
├── Influence mapping
├── Segment comparison
└── Business attribution
```

### Key Common Room Reports

| Report | Purpose | Audience | Frequency |
|--------|---------|----------|-----------|
| Community overview | High-level health | Executive | Monthly |
| Member activity | Individual engagement tracking | Community team | Weekly |
| Segment analysis | Compare cohorts, tiers, sources | Community team | Monthly |
| Trending topics | What the community is discussing | Product team | Weekly |
| Churn risk | At-risk members requiring attention | Community team | Weekly |
| Influence map | Key connectors and opinion leaders | All teams | Monthly |

---

## 3. ORBIT

### Overview

Orbit is purpose-built for developer community analytics with the Orbit
Model at its core (see community_metrics.md for model details).

**Core Capabilities:**
- Orbit level assignment (1–4) based on activity
- Love and reach scoring
- Activity tracking across GitHub, Discord, Twitter, DEV
- Member journey visualization
- API for custom integrations

### Orbit-Specific Analytics

| Metric | Definition | What It Reveals |
|--------|-----------|----------------|
| Orbit Level distribution | % of members at each level | Community depth |
| Orbit level changes | Members moving between levels | Engagement trends |
| Love score | Weighted engagement intensity | Individual contribution value |
| Reach score | Audience size and influence | Amplification potential |
| Activity types | Distribution of contribution types | Engagement patterns |

---

## 4. COHORT ANALYSIS

### Why Cohort Analysis Matters

Aggregate metrics hide critical trends. A community may show stable 25%
engagement — but this could mean every cohort retains at 25%, or it could
mean older cohorts retain at 40% while newer cohorts retain at 10%.
Only cohort analysis reveals the truth.

### Building Cohort Tables

**Step 1: Define cohorts by join month**
```
Jan cohort: All members who joined in January
Feb cohort: All members who joined in February
...
```

**Step 2: Track activity in subsequent months**
```
              Month 0   Month 1   Month 2   Month 3   Month 6   Month 12
Jan (n=200)    100%      48%       32%       27%       19%       13%
Feb (n=250)    100%      52%       36%       30%       22%       15%
Mar (n=180)    100%      55%       40%       33%       25%       —
Apr (n=300)    100%      42%       28%       22%       —         —
```

**Step 3: Analyze patterns**
- **Improving over time (Feb > Jan):** Onboarding improvements working
- **Declining over time (Apr < Mar):** Something broke or quality dropped
- **Steep early drop, flat after:** Good retention of activated members
- **Gradual decline that never flattens:** No habit formation occurring

### Cohort Segmentation

Beyond join-month cohorts, analyze by:
- **Acquisition source:** Referral vs. organic vs. event
- **Initial behavior:** Members who posted in week 1 vs. those who did not
- **Program participation:** Members in programs vs. those not
- **Platform:** Members on Discord vs. Forum vs. both
- **Geography:** Regional differences in retention

---

## 5. MEMBER JOURNEY ANALYTICS

### Journey Mapping with Data

Track the progression of members through engagement stages:

```
Journey Stage Analytics:

Stranger → Visitor:    Conversion rate from content to visit
Visitor → Member:      Signup conversion rate
Member → Activated:    % taking first action within 7 days
Activated → Regular:   % becoming weekly active within 30 days
Regular → Contributor: % creating original content within 90 days
Contributor → Leader:  % entering leadership programs within 1 year
```

### Funnel Analysis

| Stage Transition | Conversion Rate | Benchmark | If Below Benchmark |
|-----------------|----------------|-----------|-------------------|
| Visit → Join | 10–30% | 15% | Improve signup flow, value prop |
| Join → Activate | 30–50% | 35% | Improve onboarding |
| Activate → Regular | 20–40% | 25% | Improve value delivery, habits |
| Regular → Contributor | 10–25% | 15% | Lower contribution barriers |
| Contributor → Leader | 5–15% | 8% | Create leadership pathways |

### Drop-Off Analysis

Identify where members abandon their journey:
- **High drop-off at Join → Activate:** Onboarding problem
- **High drop-off at Activate → Regular:** Value delivery problem
- **High drop-off at Regular → Contributor:** Barrier-to-contribute problem
- **Even drop-off across stages:** Systemic value problem

---

## 6. ROI REPORTING

### Building the ROI Case

Community ROI reporting must connect community metrics to business
outcomes that finance and executives understand.

### ROI Report Structure

```
COMMUNITY ROI REPORT — [Quarter]

EXECUTIVE SUMMARY
├── Total community value created: $[amount]
├── Total community cost: $[amount]
├── ROI: [X]x
└── Key trends: [2–3 bullets]

VALUE BREAKDOWN
├── Support Deflection
│   ├── Questions answered in community: [N]
│   ├── Deflection rate: [%]
│   ├── Cost per ticket: $[X]
│   └── Value: $[amount]
│
├── Retention Impact
│   ├── Community member churn: [%]
│   ├── Non-member churn: [%]
│   ├── Members retained due to community: [N]
│   └── Value: $[amount]
│
├── Referral Revenue
│   ├── Referrals attributed to community: [N]
│   ├── Conversion rate: [%]
│   ├── Revenue per referral: $[X]
│   └── Value: $[amount]
│
├── Content Value
│   ├── UGC pieces produced: [N]
│   ├── Equivalent production cost: $[X/piece]
│   └── Value: $[amount]
│
└── Additional Value (qualitative)
    ├── Product feedback items actioned
    ├── Brand advocacy indicators
    └── Talent pipeline contributions

COST BREAKDOWN
├── Team compensation: $[amount]
├── Platform and tooling: $[amount]
├── Events and programs: $[amount]
├── Other: $[amount]
└── Total: $[amount]

NET VALUE: $[total value - total cost]
ROI: [net value / cost]x
```

### Attribution Methodology

**Conservative attribution (recommended for credibility):**
- Only count value you can directly prove
- Use control groups when possible (community vs. non-community)
- Apply discount factors to uncertain attributions
- Document assumptions transparently

**Attribution Methods:**
| Method | Description | Confidence |
|--------|-------------|-----------|
| Direct tracking | Referral codes, tracked links | High |
| A/B comparison | Community members vs. matched non-members | High |
| Survey attribution | Members report community influence | Medium |
| Correlation analysis | Statistical relationship | Medium |
| Proxy estimation | Industry benchmarks applied | Low |

---

## 7. EXECUTIVE DASHBOARDS

### Board-Level Dashboard

One slide, four quadrants, updated quarterly:

```
┌──────────────────────────┬──────────────────────────┐
│    COMMUNITY HEALTH      │    BUSINESS VALUE         │
│                          │                           │
│  Active Members: 2,450   │  Support Deflected: $115K │
│  Engagement: 22.5%       │  Retention Lift: $600K    │
│  NPS: 62                 │  Referral Revenue: $226K  │
│  30-Day Retention: 28%   │  Content Value: $150K     │
│  Trend: ↑ improving      │  Total Value: $1.09M      │
│                          │  ROI: 7.3x                │
├──────────────────────────┼──────────────────────────┤
│    GROWTH                │    RISK & OUTLOOK         │
│                          │                           │
│  Total Members: 10,800   │  Moderation incidents: ↓  │
│  Net Growth: +350/month  │  Platform dependency: med │
│  Acquisition Sources:    │  Key person risk: low     │
│    Referral: 40%         │  Budget: on track         │
│    Organic: 35%          │  Next quarter focus:      │
│    Events: 15%           │    - Ambassador launch    │
│    Other: 10%            │    - Event expansion      │
└──────────────────────────┴──────────────────────────┘
```

### Cross-Functional Dashboards

| Team | Metrics They Care About | Delivery |
|------|------------------------|----------|
| Product | Feature requests, bug reports, beta feedback | Monthly report + Slack channel |
| Support | Deflection rate, common questions, escalations | Weekly dashboard |
| Marketing | Content produced, brand mentions, referrals | Monthly report |
| Sales | Lead generation, customer stories, references | Quarterly summary |
| Engineering | Technical content, API adoption, bug reports | Bi-weekly digest |
| Executive | ROI, health score, growth, strategic risks | Quarterly dashboard |

---

## 8. PREDICTIVE ANALYTICS

### Churn Prediction

Use historical data to predict future churn:

**Input Features:**
- Days since last activity
- Activity trend (increasing, stable, decreasing)
- Email engagement (open rate, click rate)
- Event attendance trend
- Connection count (relationships formed)
- Content consumption pattern

**Model Output:**
- Churn probability (0–100%)
- Recommended intervention
- Expected response to intervention

### Engagement Forecasting

Predict future engagement based on:
- Seasonal patterns (historical)
- Planned events and programs
- Growth rate projections
- Content calendar impact
- External factors (industry events, competitor launches)

---

## 9. DATA GOVERNANCE

### Data Collection Ethics

- **Transparency:** Members know what data is collected
- **Consent:** Members opt in to tracking beyond platform defaults
- **Minimization:** Collect only what is needed for stated purposes
- **Security:** Data is stored securely and access-controlled
- **Deletion:** Members can request data deletion
- **Anonymization:** Aggregate data is anonymized for reporting

### GDPR/Privacy Compliance

| Requirement | Implementation |
|------------|---------------|
| Right to access | Export member data on request |
| Right to deletion | Delete member data on request |
| Data minimization | Only collect necessary data |
| Consent | Clear opt-in for analytics beyond platform |
| Processing documentation | Document all data processing activities |
| Breach notification | Plan for data breach notification |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Data hoarding | Collecting everything, analyzing nothing | Start with questions, collect for answers |
| Tool-first | Buying analytics before defining metrics | Metrics → requirements → tool selection |
| Analysis paralysis | Spending more time analyzing than acting | Time-box analysis, bias toward action |
| Cherry-picking | Reporting only positive metrics | Full transparency, including weaknesses |
| Surveillance feel | Members feel watched and tracked | Transparent data use, aggregate focus |
| Single source of truth myth | Expecting one tool to provide all answers | Complementary tools for different needs |

---

**Analytics is the discipline of turning community data into community
wisdom. The tools and methodologies in this module provide the capability;
the judgment to ask the right questions and act on the answers must come
from the community team. No dashboard will tell you why a member left or
what would bring them back. For that, you need conversations. Analytics
and empathy are not alternatives — they are partners.**

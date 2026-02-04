# Growth Metrics — North Star Metric, Input Metrics, AARRR Operationalized, Dashboards, Alerts

## Overview

Growth metrics are the quantitative system that measures whether a
company is growing efficiently, sustainably, and in the right direction.
Without a disciplined metrics framework, growth teams optimize for
vanity metrics, miss early warning signs, and cannot communicate
progress to stakeholders. This module covers the complete growth metrics
stack: the North Star Metric framework, input metric identification,
the operationalization of the AARRR pirate metrics model, dashboard
design, and alert systems that detect problems before they become crises.

---

## Section 1: North Star Metric

### What Is a North Star Metric?

The North Star Metric (NSM) is the single metric that best captures
the core value your product delivers to customers. It serves three
functions:

1. **Alignment:** Everyone in the company optimizes toward the same
   outcome
2. **Focus:** Prevents metric proliferation and conflicting priorities
3. **Leading Indicator:** Correlates with long-term revenue and
   retention better than revenue itself

### North Star Metric Criteria

A valid North Star Metric must satisfy five criteria:

**1. Measures Value Delivered**
The NSM quantifies the value customers receive, not the value extracted
from them. Revenue is not a North Star because it measures what you
take, not what you give. Value delivered leads to revenue; revenue does
not lead to value.

**2. Leading Indicator of Revenue**
The NSM must correlate with future revenue growth. If the NSM increases
and revenue does not follow within a reasonable timeframe, the metric
is measuring the wrong thing.

**3. Reflects User Engagement**
The NSM captures how actively users are engaging with the product's
core functionality. Passive metrics (accounts created, downloads)
are not North Stars.

**4. Measurable and Timely**
The NSM must be measurable with current instrumentation and update
frequently enough to inform weekly or monthly decisions.

**5. Actionable**
The growth team must be able to influence the NSM through their work.
Metrics driven entirely by external factors are not actionable.

### North Star Examples by Product Category

| Product | North Star Metric | Why |
|---------|------------------|-----|
| Slack | Daily messages sent | Measures communication value delivered |
| Airbnb | Nights booked | Measures stay value for guests and hosts |
| Spotify | Time spent listening | Measures entertainment value |
| Amplitude | Weekly querying users | Measures analytics value delivered |
| Shopify | Gross merchandise value (GMV) | Measures merchant success |
| Zoom | Weekly meeting minutes | Measures communication utility |
| HubSpot | Weekly active teams | Measures platform adoption and value |
| Netflix | Monthly viewing hours | Measures entertainment consumption |
| Figma | Weekly active editors | Measures design collaboration value |

### Selecting Your North Star

**Step 1: Define Your Core Value**
What is the primary reason customers use your product? Complete this
sentence: "Our product delivers value by helping customers ___."

**Step 2: Identify the Action**
What user action represents the delivery of that value? This should
be a specific, measurable event that occurs when the user experiences
the product's benefit.

**Step 3: Add Frequency**
How often should a healthy user perform this action? Daily, weekly,
monthly? The frequency defines the measurement cadence.

**Step 4: Validate Correlation**
Analyze historical data: Does an increase in this metric correlate
with increased revenue, retention, and customer satisfaction?

**Step 5: Test Actionability**
Can the growth team influence this metric through experiments?
If not, move up or down the funnel to find an actionable proxy.

---

## Section 2: Input Metrics

### The NSM Input Tree

The North Star Metric is decomposed into input metrics—the component
factors that drive the NSM. Input metrics are the targets for specific
growth experiments.

**Decomposition Framework:**
```
North Star Metric = Width x Depth x Frequency

Width:     How many users are actively using the product?
Depth:     How much value does each user extract per session?
Frequency: How often do users return to the product?
```

**Example: Slack**
```
NSM: Daily Messages Sent

Width:     Daily Active Teams (DAT)
Depth:     Messages per Active Team per Day
Frequency: Days Active per Week per Team

Input Tree:
Daily Messages = DAT x Messages/Team/Day x Days Active/Week

DAT influenced by:
  - New team sign-ups (acquisition)
  - Team activation rate (activation)
  - Team retention rate (retention)

Messages/Team/Day influenced by:
  - Users per team (team expansion)
  - Channel adoption (engagement breadth)
  - Integration usage (workflow integration)

Days Active/Week influenced by:
  - Notification effectiveness
  - Mobile app adoption
  - Cross-team connections
```

### Input Metric Ownership

Each input metric should be owned by a specific team or individual:

| Input Metric | Owner | Experiment Area |
|-------------|-------|-----------------|
| New sign-ups | Growth (Acquisition) | Channels, landing pages, referral |
| Activation rate | Growth (Activation) | Onboarding, first value, setup |
| Retention rate | Growth (Retention) | Engagement loops, notifications |
| Revenue per user | Growth (Monetization) | Pricing, upgrades, expansion |
| Referral rate | Growth (Virality) | Referral program, sharing features |

---

## Section 3: AARRR Operationalized

### The Pirate Metrics Framework

Dave McClure's AARRR framework (Acquisition, Activation, Retention,
Revenue, Referral) provides a complete lifecycle metrics model. This
section operationalizes each stage with specific metrics, measurement
methods, and benchmarks.

### Acquisition

**Definition:** How users discover and arrive at your product.

**Key Metrics:**
| Metric | Definition | Measurement |
|--------|-----------|-------------|
| Visitors/month | Unique visitors to marketing properties | GA4 |
| Sign-up rate | Visitors who create an account | Sign-ups / Visitors |
| CAC by channel | Cost to acquire one customer per channel | Spend / Customers per channel |
| Traffic by source | Distribution of visitors by channel | GA4 source/medium |
| Brand search volume | People searching for your brand name | Google Search Console |

**Healthy Signals:**
- Diversified traffic sources (no single channel > 40%)
- CAC stable or declining over time
- Brand search volume growing
- Sign-up rate improving through optimization

### Activation

**Definition:** The moment a new user experiences the product's core
value for the first time.

**Key Metrics:**
| Metric | Definition | Measurement |
|--------|-----------|-------------|
| Activation rate | % of sign-ups who reach the activation milestone | Event tracking |
| Time-to-value | Time from sign-up to first value delivery | Timestamp delta |
| Setup completion rate | % completing key onboarding steps | Funnel analysis |
| Feature adoption rate | % using core feature within first session | Event tracking |

**Defining the Activation Event:**
The activation event is the specific user action most correlated with
long-term retention. Identify it through:
1. List all actions a new user can take in the first 7 days
2. For each action, compare 30-day retention of users who did vs. did
   not perform the action
3. The action with the largest retention delta is the activation event
4. Validate with multiple cohorts

### Retention

**Definition:** Users continuing to receive value from the product
over time.

**Key Metrics:**
| Metric | Definition | Measurement |
|--------|-----------|-------------|
| D1/D7/D30 retention | % of users active on day N after sign-up | Cohort analysis |
| DAU/MAU ratio | Daily actives / monthly actives (stickiness) | Analytics |
| Churn rate | % of users/revenue lost per period | Revenue reporting |
| Net Revenue Retention | Revenue from existing customers including expansion | MRR tracking |
| Engagement frequency | Average sessions per active user per week | Analytics |

**DAU/MAU Benchmarks:**
| Ratio | Interpretation | Example |
|-------|---------------|---------|
| > 50% | Exceptional stickiness (daily habit) | Messaging apps, social |
| 25–50% | Strong engagement (multi-weekly habit) | Productivity tools |
| 10–25% | Moderate engagement (weekly use) | B2B SaaS, project tools |
| < 10% | Low frequency (monthly or less) | Marketplaces, seasonal |

### Revenue

**Definition:** Users paying for the product's value.

**Key Metrics:**
| Metric | Definition | Measurement |
|--------|-----------|-------------|
| MRR/ARR | Monthly/annual recurring revenue | Billing system |
| ARPU | Average revenue per user (paying) | MRR / Paying users |
| Free-to-paid conversion | % of free users who upgrade | Funnel analysis |
| LTV | Predicted lifetime revenue per customer | LTV model |
| LTV:CAC ratio | Unit economics health | LTV / CAC |
| Quick Ratio | Growth efficiency | (New + Expansion) / (Churn + Contraction) |

### Referral

**Definition:** Users bringing new users through sharing and advocacy.

**Key Metrics:**
| Metric | Definition | Measurement |
|--------|-----------|-------------|
| K-factor | Viral coefficient | Invites sent x Acceptance rate |
| Referral participation | % of users who share or invite | Event tracking |
| Invites per referrer | Average invitations per active referrer | Event tracking |
| Referral conversion rate | % of invitees who sign up | Funnel analysis |
| NPS | Net Promoter Score | Survey |

---

## Section 4: Dashboard Design

### Growth Dashboard Hierarchy

**Level 1: Executive Dashboard**
One screen. Viewed by CEO, board, all-hands. Updated weekly.
- North Star Metric (trend, WoW and MoM change)
- Revenue (MRR, growth rate, Quick Ratio)
- Acquisition (new users, CAC, top channels)
- Retention (cohort retention, NRR)

**Level 2: Growth Team Dashboard**
Detailed operational view. Viewed daily by growth team.
- NSM and all input metrics (with trends)
- Experiment scoreboard (active, concluded, win rate)
- Funnel metrics (AARRR stages with conversion rates)
- Channel performance (traffic, conversion, CAC by channel)

**Level 3: Deep-Dive Dashboards**
Specialized views for each growth area:
- Activation dashboard (onboarding funnel, step-by-step completion)
- Retention dashboard (cohort tables, engagement curves)
- Monetization dashboard (conversion funnels, ARPU, upgrade paths)
- Channel dashboards (per-channel performance, creative performance)

### Dashboard Design Principles

**1. One Key Question Per Dashboard**
Each dashboard should answer one question. Dashboards that try to
answer everything answer nothing.

**2. Context Over Data Points**
Show trends, benchmarks, and targets alongside current values. A
number without context is meaningless.

**3. Progressive Disclosure**
Start with the summary (Level 1). Click to drill down (Level 2).
Click again for deep analysis (Level 3).

**4. Consistent Time Windows**
Use consistent comparison periods across all metrics: WoW, MoM, QoQ.
Mix-and-match timeframes confuse interpretation.

---

## Section 5: Alert Systems

### Why Alerts Matter

Dashboards require someone to look at them. Alerts push critical
information to the right people at the right time, enabling faster
response to problems and opportunities.

### Alert Tiers

**Tier 1: Critical Alerts (Immediate Response)**
Triggers: Metric drops >30% day-over-day, payment system failure,
tracking breakage, experiment guardrail breach
- Channel: PagerDuty/Slack + SMS to on-call
- Response time: < 1 hour
- Examples: Sign-up rate drops to zero, revenue tracking stops

**Tier 2: Warning Alerts (Same-Day Response)**
Triggers: Metric drops >15% WoW, experiment reaches significance,
anomaly detected in funnel
- Channel: Slack channel + email
- Response time: < 4 hours
- Examples: Activation rate drops 20%, churn spikes for a segment

**Tier 3: Informational Alerts (Next Business Day)**
Triggers: Metric changes >10% MoM, new trends detected, experiment
concludes, milestone reached
- Channel: Email digest or Slack channel
- Response time: Next business day
- Examples: Monthly cohort retention improving, experiment win detected

### Alert Design Best Practices

- Include context: "Activation rate dropped to 23% (was 31% last week)"
  not just "Activation rate alert"
- Include potential causes: "Possible cause: New sign-up flow deployed
  yesterday"
- Include action: "Check experiment X or contact engineering on-call"
- Minimize false positives: Tune thresholds to avoid alert fatigue
  (target <10% false positive rate)
- Review alert effectiveness monthly: Are alerts actionable? Too many?
  Too few?

---

## Key References

- Sean Ellis: North Star Metric framework
- Brian Balfour: Input metrics and growth models (Reforge)
- Dave McClure: AARRR pirate metrics
- Lenny Rachitsky: NSM examples and selection
- Amplitude: North Star playbook
- First Round Review: Growth metrics frameworks

---

## Summary

Growth metrics provide the quantitative system that guides every growth
decision. The North Star Metric aligns the entire organization around
the value delivered to customers. Input metrics decompose the NSM into
actionable components that specific teams can influence through
experiments. The AARRR framework operationalizes the complete user
lifecycle from acquisition through referral. Dashboards make metrics
visible and interpretable at multiple levels of detail. Alert systems
detect problems and opportunities before they require dashboards to be
checked. The Growth Brain measures relentlessly, but measures what
matters—value delivered, not vanity accumulated.

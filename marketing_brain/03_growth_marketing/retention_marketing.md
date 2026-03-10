# Retention Marketing -- Keeping Customers Engaged and Growing

## Purpose

Retention is the foundation of sustainable growth. A 5% increase in retention
produces a 25-95% increase in profits (Reichheld, Bain & Company). Acquiring a
new customer costs 5-7x more than retaining an existing one. No amount of
acquisition fixes a retention problem. This module codifies lifecycle marketing,
re-engagement, churn prediction, and retention optimization.

---

## Retention Fundamentals

### Why Retention Trumps Acquisition

**The Leaky Bucket Problem:**
If monthly churn is 5%, you lose half your customers every 14 months.
To grow, you must acquire more than you lose -- AND retain what you gain.

```
Month 1:  1,000 customers + 200 new - 50 churned = 1,150
Month 6:  1,150 + 200 new - 58 churned = 1,292
Month 12: 1,292 + 200 new - 65 churned = 1,427 (growing slowly)

vs. with improved retention (3% churn):
Month 1:  1,000 + 200 - 30 = 1,170
Month 6:  1,170 + 200 - 35 = 1,335
Month 12: 1,335 + 200 - 40 = 1,495 (growing 5% faster)
```

Small retention improvements compound dramatically over time.

### Retention Metrics

**Cohort Retention Rate:**
Track what percentage of each cohort remains active over time.
This is the most important retention metric.

```
Cohort: January signups (1,000 users)
  Day 1:   80% (800 active)
  Day 7:   55% (550 active)
  Day 14:  42% (420 active)
  Day 30:  30% (300 active)
  Day 60:  25% (250 active)
  Day 90:  22% (220 active)  <-- Does this flatten? Critical.
```

**Healthy Retention Curve:**
```
Retention %
100|*
   | *
   |  *
   |   *
   |    **
   |      ***
   |         ********** <-- Flattening = product-market fit
   |
   +----------------------------> Time
```

**Unhealthy Retention Curve:**
```
Retention %
100|*
   | *
   |  *
   |   *
   |    *
   |     *
   |      *
   |       *  <-- Approaching zero = no PMF
   +----------------------------> Time
```

### Retention Benchmarks (SaaS)

| Metric | Good | Great | World-Class |
|--------|------|-------|-------------|
| Monthly logo churn | < 5% | < 3% | < 1% |
| Annual logo churn | < 40% | < 25% | < 10% |
| Net revenue retention | > 100% | > 110% | > 130% |
| DAU/MAU ratio | > 20% | > 30% | > 50% |

**Net Revenue Retention (NRR):** The revenue from existing customers compared
to the same period last year, including expansion, contraction, and churn.
NRR > 100% means you grow even without new customers.

---

## Lifecycle Marketing Framework

### Customer Lifecycle Stages

```
Onboarding --> Activation --> Engagement --> Expansion --> Advocacy
    |              |              |              |             |
  First 7-30    First value    Habitual       Upsell/      Referral/
  days          moment         usage          cross-sell   case study
```

### Stage 1: Onboarding (Days 0-30)

**Objective:** Get users to first value as quickly as possible.

**Time-to-Value (TTV):** The elapsed time from signup to first moment of value.
Shorter TTV = higher activation = better retention.

**Onboarding Strategies:**
- Welcome sequence (email + in-app): Set expectations, guide to value
- Checklist / progress bar: Show users what to do next
- Interactive walkthroughs: Guide through key features
- Templates / pre-built content: Reduce the "blank canvas" problem
- Human touch: Customer success call for high-ACV accounts

**Onboarding Email Sequence:**
| Day | Email | Goal |
|-----|-------|------|
| 0 | Welcome + quick start | Set expectations, one action |
| 1 | Feature spotlight #1 | Drive to core value feature |
| 3 | Social proof | Show what similar users achieve |
| 5 | Feature spotlight #2 | Deepen engagement |
| 7 | Check-in | Ask if they need help. Offer demo. |
| 14 | Success story | Inspire with customer case study |
| 21 | Value recap | Show what they've accomplished |
| 30 | Upgrade / expansion | If free trial, convert to paid |

### Stage 2: Activation

**Objective:** Ensure user experiences the "aha moment."

**Identifying the Aha Moment:**
Analyze behavior of retained users vs. churned users. The action that most
strongly correlates with retention IS the aha moment.

**Famous Examples:**
- Facebook: Add 7 friends in 10 days
- Slack: 2,000 messages sent by team
- Dropbox: Put one file in a folder
- HubSpot: Import contacts and send first email

**Activation Rate:** % of signups who complete the aha moment action.
Target: > 40% for self-serve, > 60% for sales-assisted.

### Stage 3: Engagement

**Objective:** Build habitual usage through ongoing value delivery.

**Engagement Tactics:**
- Feature adoption campaigns: Introduce underused features over time
- Usage-based triggers: Send relevant content based on behavior
- Community: Forums, Slack channels, user groups
- Webinars and education: Ongoing learning opportunities
- Product updates: Keep users excited about improvements
- Gamification: Streaks, badges, leaderboards (where appropriate)

**Engagement Scoring:**
Create a health score based on product usage:
```
Health Score = (Login frequency * 0.3) + (Feature breadth * 0.3)
             + (Integration usage * 0.2) + (Team invites * 0.2)

Score: 80-100 = Healthy (nurture, expand)
Score: 50-79  = At risk (re-engage, support)
Score: 20-49  = Critical (intervention required)
Score: 0-19   = Likely churned (win-back or accept)
```

### Stage 4: Expansion

**Objective:** Grow revenue from existing customers.

**Expansion Revenue Types:**
- Upsell: Move to higher tier (more features, higher limits)
- Cross-sell: Sell additional products
- Seat expansion: Add more users within the account
- Usage-based: Revenue grows with increased usage

**Expansion Triggers:**
- Approaching usage limits (natural upsell moment)
- Team growth (seat expansion opportunity)
- New use case adoption (cross-sell signal)
- High engagement score (ready for more value)

### Stage 5: Advocacy

**Objective:** Convert loyal customers into active promoters.

**Advocacy Programs:**
- Case study participation (offer visibility in exchange)
- Reference customer program (for sales conversations)
- User community champions (recognition and perks)
- Beta access (early access to new features)
- Advisory board (strategic input, deepened relationship)
- Referral program (see `virality_and_referrals.md`)

---

## Churn Prediction and Prevention

### Churn Signal Detection

**Leading Indicators (Predict Churn Before It Happens):**

| Signal | Severity | Action |
|--------|----------|--------|
| Login frequency declining | Medium | Automated re-engagement email |
| Feature usage narrowing | Medium | Feature adoption campaign |
| Support tickets increasing | Medium-High | Proactive outreach |
| NPS score declining | High | Customer success intervention |
| Champion left the company | Critical | Immediate account review |
| Billing issues (failed payment) | Critical | Dunning sequence |
| Contract renewal approaching | Varies | Renewal preparation |
| Competitive evaluation signals | Critical | Executive engagement |

### Churn Prevention Decision Tree

```
Churn risk detected
  |
  +-- Is this a product/value issue?
  |     +-- Yes --> Product feedback loop + success coaching
  |     +-- No --> Continue
  |
  +-- Is this a relationship issue (champion left, etc.)?
  |     +-- Yes --> Re-establish relationship with new stakeholder
  |     +-- No --> Continue
  |
  +-- Is this a competitive issue?
  |     +-- Yes --> Competitive response playbook + executive engagement
  |     +-- No --> Continue
  |
  +-- Is this a budget/priority issue?
  |     +-- Yes --> Offer downgrade before cancel. Pause option.
  |     +-- No --> Continue
  |
  +-- Is this an engagement issue?
        +-- Yes --> Re-engagement campaign + success story sharing
        +-- No --> Accept potential churn. Learn from exit interview.
```

### The Save Offer Ladder

When a customer requests cancellation, offer alternatives in order:
1. **Understand:** Ask why. Diagnose the root cause.
2. **Solve:** If there is a fixable problem, fix it immediately.
3. **Downgrade:** Offer a lower tier instead of cancellation.
4. **Pause:** Offer an account pause (30-90 days).
5. **Discount:** Offer a temporary discount (last resort, use sparingly).
6. **Accept:** If they insist, make cancellation easy. A good exit = possible return.

---

## Re-Engagement and Win-Back

### Dormant User Reactivation

**Dormant Definition:** No product login for 30+ days (adjust by product type).

**Reactivation Email Sequence:**

| Day | Email | Approach |
|-----|-------|----------|
| 30 | "We miss you" | Highlight what's new since they left |
| 37 | "Here's what you're missing" | Social proof, success metrics |
| 45 | "Can we help?" | Offer support, demo, or call |
| 60 | "Last chance" offer | Incentive (discount, extended trial) |
| 90 | Final notice | "We're keeping your data" + easy return path |

### Win-Back Campaigns (Post-Churn)

**Timing:** Wait 30-90 days after cancellation. Too soon feels desperate.

**Win-Back Triggers:**
- Major product update or new feature launch
- Annual milestone (e.g., "It's been a year, here's what's changed")
- Competitive intelligence (their chosen alternative raised prices)
- Industry event or trigger moment

**Win-Back Success Rate Benchmarks:**
- 20-40% open rate on win-back emails
- 5-10% reactivation rate (return to paid)
- Win-back customers often have higher LTV second time

---

## Retention Program Measurement

### Key Metrics Dashboard

| Metric | Formula | Frequency |
|--------|---------|-----------|
| Cohort retention curves | % active by cohort over time | Weekly |
| Net Revenue Retention | (Starting MRR + Expansion - Contraction - Churn) / Starting MRR | Monthly |
| Logo churn rate | Customers lost / Starting customers | Monthly |
| Revenue churn rate | MRR lost / Starting MRR | Monthly |
| Engagement health score | Composite of usage behaviors | Real-time |
| Time-to-value | Median time from signup to aha moment | Weekly |
| Activation rate | % completing aha moment action | Weekly |
| Expansion revenue | Upsell + cross-sell + seat expansion | Monthly |

---

## Key References

| Work | Author | Year | Contribution |
|------|--------|------|-------------|
| The Loyalty Effect | Reichheld | 1996 | Retention economics |
| Hooked | Nir Eyal | 2014 | Habit-forming products |
| Intercom on Onboarding | Intercom | 2018 | Onboarding best practices |
| Product-Led Growth | Wes Bush | 2019 | Activation and retention |
| Customer Success | Mehta, Steinman, Murphy | 2016 | CS methodology |
| Subscribed | Tien Tzuo | 2018 | Subscription retention models |

---

**Retention is not a department. It is the entire company's responsibility.
Marketing sets the promise; the product must keep it.**

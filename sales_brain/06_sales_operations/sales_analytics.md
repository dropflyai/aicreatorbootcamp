# Sales Analytics — From Activity to Pipeline to Revenue

## The Analytics Hierarchy

Sales analytics follows a causal chain: activity drives pipeline, pipeline drives
revenue. Most organizations measure revenue obsessively and activity sporadically,
while neglecting the conversion mechanics between them. This creates an organization
that knows WHERE it ended up but not WHY, making future improvement accidental
rather than systematic.

The analytics hierarchy:
```
Activity Metrics (leading)
    ↓ conversion
Pipeline Metrics (mid-funnel)
    ↓ conversion
Revenue Metrics (lagging)
    ↓ efficiency
Unit Economics (strategic)
```

Each layer has distinct metrics, diagnostic value, and intervention points. This
module covers all four layers and the analytical techniques that connect them.

---

## Layer 1: Activity Metrics

### What Activity Metrics Measure

Activity metrics quantify seller effort. They are the earliest leading indicators
in the analytics chain. Activity does not guarantee results, but insufficient
activity guarantees failure.

### Core Activity Metrics

| Metric | Definition | Benchmark (AE) | Benchmark (SDR) |
|--------|-----------|-----------------|-----------------|
| Calls/Day | Outbound call attempts | 10-15 | 50-80 |
| Emails/Day | Personalized outbound emails | 15-25 | 40-60 |
| Meetings/Week | Discovery or demo meetings held | 8-12 | N/A (meetings set, not held) |
| Meetings Set/Week | Qualified meetings created | N/A | 5-10 |
| Social Touches/Day | LinkedIn connections, comments, InMails | 5-10 | 10-20 |
| Proposals/Month | Formal proposals delivered | 4-8 | N/A |
| Pipeline Created/Week | New pipeline value added | $100-200K | N/A |

### Activity Quality vs. Quantity

Raw activity counts are necessary but insufficient. Quality metrics provide
diagnostic value:

| Quality Metric | Formula | What It Reveals |
|---------------|---------|-----------------|
| Connection Rate | Conversations / Attempts | Targeting and timing effectiveness |
| Meeting Rate | Meetings / Conversations | Discovery pitch effectiveness |
| Show Rate | Meetings Held / Meetings Scheduled | Qualification and confirmation process |
| Multi-Touch Effectiveness | Meetings from Multi-Channel / Total Meetings | Sequence design quality |
| Personalization Rate | Personalized Emails / Total Emails | Effort quality |

### Activity-to-Pipeline Conversion Analysis

The critical conversion point is where activity becomes pipeline:

```
Activity → Conversation → Meeting → Opportunity → Pipeline
```

| Conversion | Formula | Healthy Benchmark |
|-----------|---------|-------------------|
| Attempt to Conversation | Conversations / Total Attempts | 15-25% (phone), 5-10% (email) |
| Conversation to Meeting | Meetings / Conversations | 20-30% |
| Meeting to Opportunity | Opportunities / Meetings | 30-50% |
| Opportunity to Pipeline | Pipeline Value / Opportunities | ACV-dependent |

**Diagnostic Framework:**
If pipeline is insufficient, trace backward through conversions to identify the
bottleneck. Low pipeline can stem from:
- Insufficient activity (volume problem — fix with capacity or efficiency)
- Low conversation rate (targeting problem — fix with ICP refinement)
- Low meeting rate (messaging problem — fix with pitch coaching)
- Low opportunity rate (qualification problem — fix with discovery skills)

---

## Layer 2: Pipeline Metrics

### Core Pipeline Metrics

| Metric | Definition | Formula | Healthy Range |
|--------|-----------|---------|---------------|
| Pipeline Value | Total open opportunity value | SUM(Opportunity Amount) | 3-5x quota |
| Pipeline Coverage | Pipeline vs. quota | Pipeline / Quota | 3.0-5.0x |
| Weighted Pipeline | Probability-adjusted value | SUM(Amount x Stage Probability) | 1.0-1.5x quota |
| Pipeline Created | New pipeline in period | SUM(New Opportunity Amount in Period) | >1x quota monthly |
| Pipeline Velocity | Revenue flow rate | (Opps x Win Rate x ACV) / Cycle Days | Increasing trend |
| Stage Distribution | Pipeline by stage | % in each stage | Pyramid shape (more early, less late) |

### Pipeline Conversion Metrics

| Conversion | Formula | Enterprise Benchmark | Mid-Market Benchmark |
|-----------|---------|---------------------|---------------------|
| S0 to S1 | S1 entries / S0 entries | 40-50% | 50-60% |
| S1 to S2 | S2 entries / S1 entries | 50-60% | 60-70% |
| S2 to S3 | S3 entries / S2 entries | 55-65% | 65-75% |
| S3 to S4 | S4 entries / S3 entries | 60-70% | 70-80% |
| S4 to S5 | S5 entries / S4 entries | 65-80% | 75-85% |
| S5 to Won | Won / S5 entries | 75-90% | 80-90% |
| Overall S0 to Won | Won / S0 entries | 15-25% | 25-35% |

### Pipeline Health Diagnostics

**Diagnostic 1: Stage Velocity**
Measure median days in each stage. Increasing velocity indicates process friction
or deal stagnation:

```
If Stage 2 median days increases from 14 to 21 over two quarters:
→ Diagnosis: Demo-to-validation conversion is slowing
→ Root cause: Feature gap? Competitive pressure? Poor demo quality?
→ Intervention: Demo audit, competitive analysis, SE coaching
```

**Diagnostic 2: Stage-Specific Win Rate**
Calculate win rate for deals that REACH each stage:

```
Win Rate from S3 = Deals Won that were in S3 / All Deals that reached S3
```

If win rate from S3 is declining, stakeholder alignment is weakening. If win rate
from S5 is declining, negotiation/procurement is the problem.

**Diagnostic 3: Creation-to-Close Cohort Analysis**
Track cohorts of pipeline created in the same month:
- What % closed within 1 quarter?
- What % closed within 2 quarters?
- What % is still open after 2 quarters? (Zombie pipeline)
- What % closed lost vs. went stale?

---

## Layer 3: Revenue Metrics

### Core Revenue Metrics

| Metric | Definition | Formula |
|--------|-----------|---------|
| Bookings | New contract value signed | Total new ACV booked in period |
| Revenue (ARR) | Annual recurring revenue | Active subscriptions x annual value |
| Revenue (MRR) | Monthly recurring revenue | ARR / 12 |
| New ARR | ARR from new customers | New customer contracts x ACV |
| Expansion ARR | ARR from existing customer growth | Upsell + cross-sell ACV |
| Churned ARR | ARR lost from cancellations | Canceled contract ACV |
| Contraction ARR | ARR lost from downgrades | Downgraded contract value delta |
| Net New ARR | Total ARR change | New + Expansion - Churn - Contraction |

### Revenue Composition Analysis

Understanding WHERE revenue comes from is as important as how much:

```
Net New ARR = New Logo ARR + Expansion ARR - Gross Churn ARR
```

**Healthy SaaS Composition:**
- New Logo: 50-70% of net new ARR (growth phase)
- Expansion: 30-50% of net new ARR (mature phase)
- Gross Churn: <10% annual logo churn, <15% annual dollar churn

**Warning Signs:**
- New logo % declining while expansion is flat = growth engine stalling
- Expansion % declining while new logo is flat = product-market fit weakening
- Churn accelerating = retention crisis (investigate immediately)

---

## Layer 4: Unit Economics and Efficiency

### Sales Efficiency Metrics

| Metric | Formula | Healthy Range | World Class |
|--------|---------|---------------|-------------|
| Magic Number | Net New ARR / Sales & Marketing Spend (prior Q) | 0.75-1.0 | >1.0 |
| CAC (Customer Acquisition Cost) | Total S&M Spend / New Customers | Industry-dependent | Declining trend |
| CAC Payback (months) | CAC / (Monthly Recurring Revenue x Gross Margin) | 12-18 months | <12 months |
| LTV:CAC | Customer Lifetime Value / CAC | 3:1 - 5:1 | >5:1 |
| Sales Efficiency Ratio | New ARR / Total Sales Cost | 2:1 - 3:1 | >4:1 |
| Burn Multiple | Net Burn / Net New ARR | 1.0-2.0 | <1.0 |

### Rep-Level Efficiency Metrics

| Metric | Formula | Purpose |
|--------|---------|---------|
| Revenue per Rep | Total Bookings / Quota-Carrying Reps | Capacity utilization |
| Quota Attainment | Individual Bookings / Individual Quota | Performance measurement |
| Pipeline-to-Close Ratio | Pipeline Created / Revenue Closed | Effort efficiency |
| Cycle Time Efficiency | Median Cycle Days / Segment Benchmark | Process efficiency |
| Activities per Dollar | Total Activities / Revenue Booked | Effort per revenue |
| Win Rate vs. Team Average | Individual Win Rate / Team Win Rate | Relative effectiveness |

### Rep Performance Distribution

Analyze the distribution of rep performance, not just the average:

```
Segment          % of Reps     Revenue Contribution
Top 20%            20%              50-60%
Middle 60%         60%              35-40%
Bottom 20%         20%              5-10%
```

**The Pareto Problem:**
If your top 20% generates >60% of revenue, your process is person-dependent, not
process-dependent. This is a scaling risk. The goal is to compress the distribution:
shift middle performers upward through process, methodology, and coaching.

---

## Rep Performance Scoring Model

### Multi-Dimensional Performance Score

Instead of ranking reps solely on quota attainment, create a composite score:

| Dimension | Weight | Metrics | Scoring |
|-----------|--------|---------|---------|
| Results | 40% | Quota attainment, bookings | % of quota |
| Pipeline | 25% | Pipeline created, coverage ratio | % of target |
| Process | 20% | MEDDPICC adherence, CRM hygiene, forecast accuracy | Compliance rate |
| Development | 15% | Methodology certification, coaching attendance, call quality | Score (1-5) |

**Scoring Calculation:**
```
Composite Score = (Results x 0.40) + (Pipeline x 0.25) +
                  (Process x 0.20) + (Development x 0.15)
```

**Performance Categories:**
- A Player (Score >85): Promote, develop, retain
- B Player (Score 65-85): Coach, invest, stretch assignment
- C Player (Score <65): Performance plan, role evaluation, exit if no improvement

### Capacity Modeling

**How many reps do you need to hit plan?**

```
Required Reps = Revenue Target / (Quota per Rep x Expected Attainment Rate)
```

Example:
```
Revenue Target: $20M
Quota per Rep: $800K
Expected Attainment: 65% of reps hit = weighted average 80% of quota

Required Reps = $20M / ($800K x 0.80) = 31.25 → 32 reps
```

Add buffer for attrition (assume 20% annual):
```
Adjusted Headcount = 32 / (1 - 0.20) = 40 reps (hire 8 to replace attrition)
```

Add ramp time (new reps produce ~50% in first two quarters):
```
Final Headcount Plan = 40 + (8 x 0.50 ramp adjustment) = 44 reps at start of year
```

---

## Dashboard Architecture

### Executive Dashboard (CRO/VP Level)

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Revenue vs. Plan | Cumulative bookings vs. quarterly target | Waterfall chart |
| Pipeline Coverage | Weighted pipeline / remaining quota | Gauge chart |
| Forecast Confidence | Commit + Best Case vs. quota | Stacked bar |
| Win Rate Trend | Win rate by month, trailing 6 months | Line chart |
| Rep Attainment Distribution | % of reps by attainment band | Histogram |
| Pipeline Source Mix | Pipeline by source category | Pie chart |

### Manager Dashboard (Team Level)

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Rep Leaderboard | Attainment, pipeline, activity by rep | Ranked table |
| Stage Conversion | Conversion rates by stage | Funnel chart |
| Deal Aging | Deals by stage and age | Heatmap |
| Activity Trends | Weekly activity by rep | Sparklines |
| Forecast Accuracy | Forecast vs. actual by rep | Scatter plot |
| Stale Pipeline | Deals with no activity >14 days | Alert list |

### Rep Dashboard (Individual Level)

| Widget | Metric | Visualization |
|--------|--------|---------------|
| My Quota Progress | YTD bookings vs. quota | Progress bar |
| My Pipeline | Open deals by stage and value | Kanban board |
| My Activities This Week | Calls, emails, meetings | Activity tracker |
| My Forecast | Commit + Best Case | Summary card |
| Next Steps Due | Tasks and follow-ups | Priority list |
| My Win Rate | Rolling 90-day win rate | Trend line |

---

## Advanced Analytics Techniques

### Cohort Analysis
Group deals by creation month and track progression. Reveals seasonal patterns,
process improvements, and degradation over time.

### Attribution Analysis
Determine which activities and touchpoints most influence deal progression. Use
multi-touch attribution to credit pipeline and revenue to the appropriate sources.

### Predictive Lead Scoring
Use historical deal data to build models that predict which leads are most likely
to convert. Features: firmographic data, behavioral signals, engagement patterns.

### Win/Loss Analysis
Structured review of won and lost deals to identify patterns:
- What do won deals have in common? (discovery depth, multi-threading, executive)
- What do lost deals have in common? (single-threaded, weak champion, price)
- What competitive dynamics appear? (when do we lose to whom, and why?)

---

**Sales analytics is not reporting — it is diagnosis. The goal is not to know your
numbers but to understand what drives them and how to change them systematically.**

# Marketing Analytics — Attribution, ROAS, CAC, and LTV:CAC

## The Marketing Analytics Challenge

Marketing analytics exists to answer one question: "Is our marketing spend creating
business value, and where should we invest more or less?" This question is
deceptively simple. In practice, answering it requires navigating attribution
complexity, multi-touch buyer journeys, long sales cycles, and the fundamental
tension between measurable (but incomplete) digital signals and unmeasurable (but
real) brand and dark funnel influence.

The organizations that build the best analytics capabilities share a philosophy:
measure what matters (pipeline and revenue), not what is easy (clicks and impressions).
Every marketing metric should ultimately connect to revenue contribution.

---

## Attribution Modeling

### The Attribution Problem

In B2B, a typical deal involves 15-30+ marketing touchpoints across 3-6 months
before the buyer talks to sales. The attribution problem: which of those 30
touchpoints "caused" the deal? The honest answer: none of them individually,
and all of them collectively. Attribution models are useful simplifications,
not truth.

### Attribution Model Comparison

| Model | Logic | Strengths | Weaknesses | Best For |
|-------|-------|----------|-----------|----------|
| First Touch | 100% credit to first interaction | Simple, identifies awareness channels | Ignores nurture and conversion | Top-of-funnel analysis |
| Last Touch | 100% credit to last interaction | Simple, identifies conversion channels | Ignores awareness and education | Bottom-of-funnel analysis |
| Linear | Equal credit across all touches | Acknowledges all contributions | Over-credits low-impact touches | Basic multi-touch analysis |
| Time Decay | More credit to recent touches | Weights conversion-proximate activity | Under-credits brand building | Short-cycle B2B |
| U-Shaped (Position) | 40% first, 40% last, 20% middle | Balances awareness and conversion | Arbitrary weights | Balanced analysis |
| W-Shaped | 30% first, 30% lead creation, 30% opp creation, 10% middle | Captures key funnel moments | Complex, requires precise event tracking | Full-funnel B2B |
| Custom/Algorithmic | ML-determined weights based on historical data | Data-driven, adapts to your business | Black box, requires large datasets | Mature analytics organizations |

### Implementing W-Shaped Attribution (Recommended for B2B)

**Step 1: Define Attribution Events**
- First Touch: First trackable interaction (website visit, ad click, content download)
- Lead Creation: Moment the contact enters your system (form fill, event registration)
- Opportunity Creation: Moment the deal is created in CRM
- Close: Moment the deal closes (won or lost)

**Step 2: Assign Credit**
```
First Touch:          30% of deal value
Lead Creation Touch:  30% of deal value
Opportunity Creation: 30% of deal value
Middle Touches:       10% of deal value (split evenly among middle touches)
```

**Step 3: Map Touchpoints to Channels**
Each touch gets assigned to a channel (paid search, organic, LinkedIn, email, etc.).
Aggregate channel credit across all deals to determine channel-level contribution.

### Self-Reported Attribution

The most underused attribution method: simply asking buyers "How did you hear about
us?" on high-intent forms (demo request, contact sales).

**Implementation:**
- Add free-text field: "How did you hear about us?" on demo request form
- Make it required but keep it open (not a dropdown)
- Categorize responses monthly (podcast, LinkedIn, referral, Google, event, etc.)
- Compare self-reported to system-reported attribution

**Why It Matters:**
Self-reported attribution reveals dark funnel influence that no tracking system
can capture. When 30% of demo requests say "I heard your CEO on [podcast]" but
your MTA system shows zero attribution to podcast, you know your attribution
system is missing real influence.

---

## ROAS vs. ROI

### ROAS (Return on Ad Spend)

```
ROAS = Revenue Attributed to Marketing / Marketing Spend
```

**ROAS Variants:**

| Variant | Formula | Use Case |
|---------|---------|----------|
| Pipeline ROAS | Pipeline Created / Ad Spend | Leading indicator |
| Revenue ROAS | Closed Revenue / Ad Spend | Lagging, most accurate |
| Blended ROAS | Total Revenue / Total Marketing Spend | Organizational efficiency |
| Channel ROAS | Channel Revenue / Channel Spend | Channel optimization |

**ROAS Benchmarks (B2B SaaS):**

| Channel | Pipeline ROAS | Revenue ROAS |
|---------|-------------|-------------|
| Paid Search (Brand) | 20-50x | 10-30x |
| Paid Search (Non-Brand) | 10-25x | 5-15x |
| LinkedIn Ads | 8-20x | 3-10x |
| Content Marketing | 15-40x | 5-20x |
| Events | 5-15x | 3-8x |
| Partner Marketing | 10-30x | 5-15x |

### ROI (Return on Investment)

```
ROI = (Revenue - Total Cost) / Total Cost x 100%
```

ROI accounts for ALL costs, not just ad spend:
- Salaries (marketing team, sales team for marketing-sourced deals)
- Tools and technology
- Creative production
- Agency fees
- Overhead allocation

---

## CAC Calculation Methodologies

### Simple CAC

```
CAC = Total Sales & Marketing Spend / New Customers
```

### Segmented CAC

| Segment | S&M Spend | New Customers | CAC |
|---------|-----------|---------------|-----|
| Enterprise | $800K | 20 | $40,000 |
| Mid-Market | $600K | 60 | $10,000 |
| SMB | $400K | 200 | $2,000 |
| PLG/Self-Serve | $200K | 1,000 | $200 |

### Channel-Specific CAC

| Channel | Spend | Customers | CAC | Benchmark |
|---------|-------|-----------|-----|-----------|
| Paid Search | $200K | 40 | $5,000 | Good |
| LinkedIn Ads | $150K | 15 | $10,000 | Average |
| Content/SEO | $100K | 30 | $3,333 | Great |
| Events | $300K | 25 | $12,000 | Average |
| SDR Outbound | $500K | 50 | $10,000 | Average |
| Referral | $50K | 20 | $2,500 | Excellent |
| Partner | $100K | 15 | $6,667 | Good |

### CAC Ratio (Sales vs. Marketing)

```
Sales CAC = Total Sales Cost / New Customers
Marketing CAC = Total Marketing Cost / New Customers
CAC = Sales CAC + Marketing CAC
```

**Healthy Ratio:** Marketing CAC should be 30-50% of total CAC for most B2B SaaS.
If marketing CAC exceeds 60%, investigate whether brand spending is generating
commensurate pipeline. If marketing CAC is below 20%, marketing may be under-invested.

---

## LTV:CAC Deep Dive

### LTV Calculation

```
Simple LTV = ARPA x Gross Margin x Customer Lifetime (months)

Where:
  Customer Lifetime = 1 / Monthly Churn Rate

Example:
  ARPA = $3,000/month
  Gross Margin = 78%
  Monthly Churn = 2%
  Customer Lifetime = 1/0.02 = 50 months

  LTV = $3,000 x 0.78 x 50 = $117,000
```

### Advanced LTV (with Expansion)

```
LTV with Expansion = ARPA x Gross Margin x (1 / (Churn Rate - Expansion Rate))

Example:
  ARPA = $3,000/month
  Gross Margin = 78%
  Monthly Churn = 2%
  Monthly Expansion Rate = 1%
  Effective Churn = 2% - 1% = 1%

  LTV = $3,000 x 0.78 x (1/0.01) = $234,000
```

NRR above 100% means the denominator approaches zero (or goes negative),
indicating theoretically infinite LTV. In practice, cap LTV at 5x ACV or
use a 5-year DCF calculation instead.

### LTV:CAC by Channel

| Channel | CAC | LTV | LTV:CAC | Verdict |
|---------|-----|-----|---------|---------|
| Organic/Inbound | $3,333 | $117K | 35:1 | Under-investing |
| Paid Search | $5,000 | $117K | 23:1 | Under-investing |
| LinkedIn Ads | $10,000 | $117K | 12:1 | Healthy |
| Events | $12,000 | $117K | 10:1 | Healthy |
| SDR Outbound | $10,000 | $117K | 12:1 | Healthy |
| Content Syndication | $8,000 | $80K* | 10:1 | Monitor |

*Lower LTV because syndicated leads may have lower retention

---

## Marketing Analytics Dashboard

### Executive Marketing Dashboard

| Section | Metrics | Visualization |
|---------|---------|---------------|
| Pipeline Contribution | Marketing-sourced + influenced pipeline | Waterfall chart |
| Revenue Attribution | Marketing-sourced + influenced revenue | Stacked bar |
| Efficiency | Blended CAC, CAC payback, LTV:CAC | KPI cards with trend |
| Channel Performance | Pipeline and revenue by channel | Bar chart (ranked) |
| Funnel Metrics | MQL→SQL→Opp→Close conversion rates | Funnel visualization |
| Budget Utilization | Spend vs. budget by channel | Progress bars |

### Operational Marketing Dashboard

| Section | Metrics | Frequency |
|---------|---------|-----------|
| Campaign Performance | CTR, CPA, conversions by campaign | Daily/Weekly |
| Content Performance | Traffic, engagement, conversions by asset | Weekly |
| Email Performance | Open rate, CTR, unsubscribes | Weekly |
| Lead Flow | MQLs by source, SDR acceptance rate | Daily |
| Pipeline Quality | SQL conversion rate, average deal size | Weekly |
| Attribution | Channel mix by first-touch and multi-touch | Monthly |

---

## Analytics Maturity Model

### Level 1: Reporting (What Happened?)
- Track basic metrics: traffic, leads, spend
- Campaign-level reporting
- No attribution beyond last-touch
- Spreadsheet-based

### Level 2: Analysis (Why Did It Happen?)
- Multi-touch attribution implemented
- Funnel conversion analysis
- Channel-level CAC calculation
- CRM-integrated reporting

### Level 3: Optimization (How Do We Improve?)
- Predictive lead scoring
- Budget allocation optimization
- A/B testing framework
- Marketing mix modeling (basic)

### Level 4: Prediction (What Will Happen?)
- Machine learning attribution
- Predictive pipeline modeling
- Automated budget optimization
- Incrementality testing program

---

**Marketing analytics is not about perfect measurement — it is about directionally
correct decisions. The goal is not to know exactly which touchpoint caused a deal
but to understand which investments are generating returns and which are not.**

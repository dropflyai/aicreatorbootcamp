# Media Buying — MMM, Incrementality, CAC Payback, and Diminishing Returns

## Media Buying Strategy for B2B

Media buying is the science of allocating marketing budget across channels to
maximize return. For B2B companies, this is complicated by long sales cycles
(the click and the revenue are months apart), multi-touch journeys (no single
channel "caused" the deal), and attribution blindness (much buyer activity is
invisible to tracking systems).

Effective media buying requires three capabilities: measurement (understanding
what each channel contributes), optimization (allocating spend to maximize return),
and governance (controlling spend efficiency within acceptable thresholds).

---

## Measurement Frameworks

### Marketing Mix Modeling (MMM)

**What It Is:**
MMM is a statistical approach that uses regression analysis on aggregate data to
determine the contribution of each marketing channel (and external factors) to
business outcomes (pipeline, revenue, conversions).

**How It Works:**
```
Revenue = f(Search Spend, Social Spend, Content Investment, Events,
             Brand Awareness, Seasonality, Economic Conditions, Competitor Activity)
```

**Advantages:**
- Does not require user-level tracking (privacy-compliant)
- Accounts for offline channels (events, direct mail, brand)
- Captures cross-channel effects and long-term brand impact
- Works with aggregate data (avoids cookie/tracking limitations)

**Disadvantages:**
- Requires 2+ years of historical data for reliable results
- Granularity is limited (quarterly or monthly, not daily)
- Slow to reflect real-time changes
- Expensive to build and maintain (specialized data science)

**MMM Implementation:**
1. Collect 2+ years of marketing spend by channel (weekly or monthly)
2. Collect matching time-series of outcome data (pipeline, revenue)
3. Include external variables (seasonality, market conditions, competitor activity)
4. Build regression model with appropriate lag structures
5. Validate model predictions against held-out data
6. Decompose revenue contribution by channel
7. Simulate different budget allocation scenarios

### Multi-Touch Attribution (MTA)

**What It Is:**
MTA tracks individual user journeys across touchpoints and assigns credit to
each interaction that contributed to a conversion.

**Attribution Models:**

| Model | Credit Distribution | Best For |
|-------|-------------------|----------|
| First Touch | 100% to first interaction | Understanding awareness |
| Last Touch | 100% to last interaction | Understanding conversion |
| Linear | Equal across all touches | Simple multi-touch |
| Time Decay | More credit to recent touches | Conversion-focused |
| U-Shaped | 40/20/40 (first, middle, last) | Balanced |
| W-Shaped | 30/30/30/10 | Full funnel |
| Algorithmic | Data-driven, ML-based | Most accurate (with sufficient data) |

**Advantages:**
- User-level granularity
- Real-time optimization capability
- Clear channel-to-conversion path

**Disadvantages:**
- Broken by privacy changes (iOS 14.5, cookie deprecation, GDPR)
- Cannot measure offline or dark funnel influence
- Over-credits trackable channels, under-credits brand
- Cross-device tracking gaps

### MMM vs. MTA

| Dimension | MMM | MTA |
|-----------|-----|-----|
| Data Level | Aggregate | Individual user |
| Privacy Impact | Resistant | Highly vulnerable |
| Channel Coverage | All (including offline) | Digital only (trackable) |
| Granularity | Monthly/Weekly | Daily/Real-time |
| Brand Measurement | Yes (long-term effects) | No (only clickable events) |
| Implementation Cost | High ($50-200K+) | Medium ($10-50K) |
| Best For | Budget allocation, strategic planning | Campaign optimization, tactical decisions |

**Recommendation:** Use both. MMM for strategic budget allocation. MTA for tactical
campaign optimization. Triangulate where they disagree.

---

## Incrementality Testing

### What Is Incrementality?

Incrementality measures the TRUE causal impact of marketing spend. It answers:
"How much additional outcome did this spend create that would not have occurred
without it?" This is different from attribution (which measures correlation, not
causation).

### Incrementality Testing Methods

**Method 1: Geo-Lift Testing**
- Split geographic markets into test (spend on) and control (spend off)
- Measure outcome difference between test and control markets
- Calculate incremental lift from the spend

**Implementation:**
```
Test Markets:  New York, Chicago, Dallas (run ads)
Control Markets: Boston, Philadelphia, Denver (no ads)

After 4-8 weeks:
  Test Market Pipeline:    $2.5M (average per market)
  Control Market Pipeline: $1.8M (average per market)
  Incremental Lift:        $700K per market = 39% lift
  Total Spend in Test:     $150K per market
  Incremental ROAS:        $700K / $150K = 4.7x
```

**Method 2: Holdout Testing**
- Randomly hold back a percentage (10-20%) of your target audience from seeing ads
- Compare conversion rates between exposed and held-out groups
- Calculate the incremental conversion attributable to ad exposure

**Method 3: Spend Variation (On/Off Testing)**
- Increase spend by 50% in one period, measure impact
- Decrease spend by 50% in another period, measure impact
- If outcome changes proportionally, spend is incremental
- If outcome does not change, spend is not driving incremental results

### Incrementality vs. Attribution

| Scenario | Attribution Says | Incrementality Says |
|----------|-----------------|-------------------|
| Brand search clicks | "We drove 500 conversions" | "90% would have converted organically" |
| Retargeting ads | "ROAS is 20x" | "Lift is only 5% above control (most would have converted anyway)" |
| LinkedIn awareness | "Low direct conversions" | "15% lift in demo requests in test markets" |
| Podcast sponsorship | "Cannot attribute any conversions" | "12% lift in branded search volume" |

---

## CAC Payback and Unit Economics

### Customer Acquisition Cost (CAC)

**Blended CAC:**
```
Blended CAC = Total Sales + Marketing Spend / New Customers Acquired
```

**Channel CAC:**
```
Channel CAC = Channel Spend / New Customers from Channel
```

**Fully-Loaded CAC:**
```
Fully-Loaded CAC = (S&M Salaries + Tools + Ad Spend + Events + Content +
                     Agency Fees + Overhead) / New Customers
```

### CAC Payback Period

**Definition:** The number of months it takes for a customer's gross margin
contribution to repay the cost of acquiring them.

```
CAC Payback (months) = CAC / (Monthly Recurring Revenue x Gross Margin %)
```

**Example:**
```
CAC:           $15,000
MRR:           $2,000
Gross Margin:  80%

CAC Payback = $15,000 / ($2,000 x 0.80) = $15,000 / $1,600 = 9.4 months
```

**CAC Payback Benchmarks:**

| Rating | Payback Period | Interpretation |
|--------|---------------|---------------|
| Excellent | <12 months | Highly efficient acquisition |
| Good | 12-18 months | Healthy, sustainable |
| Acceptable | 18-24 months | Watch carefully, optimize |
| Concerning | 24-36 months | Efficiency problem |
| Unsustainable | >36 months | Structural issue, requires intervention |

### LTV:CAC Ratio

```
LTV = ARPA x Gross Margin x (1 / Monthly Churn Rate)
LTV:CAC = LTV / CAC
```

**Example:**
```
ARPA (Average Revenue Per Account): $24,000/year ($2,000/month)
Gross Margin: 80%
Monthly Churn: 1.5%

LTV = $2,000 x 0.80 x (1 / 0.015) = $1,600 x 66.7 = $106,667
CAC = $15,000
LTV:CAC = $106,667 / $15,000 = 7.1:1
```

**LTV:CAC Benchmarks:**

| Rating | Ratio | Interpretation |
|--------|-------|---------------|
| Under-investing | >5:1 | Could grow faster by spending more |
| Optimal | 3:1 - 5:1 | Efficient and sustainable |
| Acceptable | 2:1 - 3:1 | Workable but optimize |
| Concerning | 1:1 - 2:1 | Approaching unprofitability |
| Unsustainable | <1:1 | Losing money on every customer |

---

## Diminishing Returns and Budget Optimization

### The Diminishing Returns Curve

Every marketing channel follows a diminishing returns curve: initial spend is
highly efficient, but each incremental dollar produces less return than the previous.

```
Return on
Ad Spend
    │
    │    ╱‾‾‾‾‾‾‾‾‾‾‾‾‾
    │   ╱
    │  ╱     Diminishing Returns Zone
    │ ╱
    │╱
    └──────────────────────── Spend
       Efficient     Saturated
       Zone          Zone
```

### Identifying Diminishing Returns

**Method 1: Marginal ROAS Analysis**
Plot incremental ROAS as you increase spend. When marginal ROAS drops below your
target threshold, you have reached diminishing returns for that channel.

```
Monthly Spend    Total Pipeline    Marginal ROAS
$10K             $100K             10.0x
$20K             $180K             8.0x (last $10K generated $80K)
$30K             $240K             6.0x
$40K             $280K             4.0x ← diminishing
$50K             $300K             2.0x ← approaching limit
$60K             $310K             1.0x ← saturated
```

**Method 2: Response Curve Modeling**
Fit a log or S-curve function to spend-vs-outcome data to predict the optimal
spend level for each channel:

```
Pipeline = a x ln(Spend) + b    (logarithmic model)
Pipeline = a / (1 + e^(-b(Spend-c)))    (S-curve model)
```

### Budget Allocation Optimization

**Principle: Equalize marginal returns across channels.**

At the optimal budget allocation, the marginal ROAS of the last dollar spent on
Channel A should equal the marginal ROAS of the last dollar spent on Channel B.
If Channel A has higher marginal ROAS, shift budget from B to A until equilibrium.

**Optimization Process:**
1. Calculate marginal ROAS for each channel at current spend level
2. Rank channels by marginal ROAS (highest to lowest)
3. Shift budget from lowest marginal ROAS channels to highest
4. Recalculate after shifts (each shift changes marginal ROAS)
5. Iterate until marginal ROAS is equalized across channels
6. Validate with incrementality testing before committing to large shifts

---

## Media Buying Governance

### Budget Control Framework

| Control | Threshold | Action |
|---------|----------|--------|
| Daily Spend Limit | +20% over daily target | Auto-pause, review |
| Weekly CPA | +30% over target CPA | Campaign review, bid adjustment |
| Monthly Budget | 95% of monthly budget reached | Pace check, possible pause |
| Channel CAC | +50% over target | Strategic review, possible channel pause |
| Negative ROI | Channel CAC > 3-month revenue | Pause channel, investigate |

### Monthly Media Buying Review

| Agenda Item | Analysis | Decision |
|------------|---------|----------|
| Spend vs. Budget | Actual vs. planned by channel | Reallocation if needed |
| Performance by Channel | CPA, ROAS, pipeline contribution | Increase/decrease/pause |
| Creative Performance | Winning vs. losing creative | Refresh schedule |
| Audience Performance | Segment-level performance | Targeting adjustments |
| Incrementality Check | Any holdout or geo test results | Validated vs. estimated impact |
| Competitive Landscape | Competitor ad activity, market changes | Strategic response |
| Next Month Plan | Budget allocation, creative pipeline | Aligned and approved |

---

**Media buying is applied economics. Every dollar has an opportunity cost. The
discipline is not just spending efficiently — it is knowing when to stop spending
on one channel and start spending on another.**

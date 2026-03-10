# Revenue Metrics — ARR, NRR, ACV, and the Language of SaaS Revenue

## Why Revenue Metrics Matter

Revenue metrics are the language of SaaS business health. They communicate growth
trajectory, customer retention, expansion efficiency, and economic sustainability
to leadership, investors, and the board. Misunderstanding or misusing these metrics
leads to flawed strategy, misleading forecasts, and broken investor relationships.

This module defines every material revenue metric with precision, including the
common mistakes in calculation that create discrepancies between how companies
report and how investors evaluate.

---

## ARR and MRR — The Foundation

### Annual Recurring Revenue (ARR)

**Definition:** The annualized value of all active recurring subscription contracts
at a point in time.

**Calculation:**
```
ARR = SUM(Active Subscription Annual Contract Value)
```

**What Counts as ARR:**
- Subscription fees (monthly, quarterly, or annual)
- Committed platform fees
- Minimum committed usage fees

**What Does NOT Count as ARR:**
- One-time implementation fees
- Professional services revenue
- Variable usage above minimums (until committed)
- Pilot or trial revenue (until converted to paid subscription)
- Non-recurring add-on purchases

**ARR Variants:**

| Variant | Definition | Use Case |
|---------|-----------|----------|
| Starting ARR | ARR at the beginning of a period | Baseline for growth calculation |
| Ending ARR | ARR at the end of a period | Current run rate |
| New ARR | ARR from new customer contracts signed in period | New business performance |
| Expansion ARR | ARR added from existing customer upsell/cross-sell | Expansion performance |
| Churned ARR | ARR lost from customer cancellations | Retention measurement |
| Contraction ARR | ARR lost from existing customer downgrades | Downsell measurement |
| Net New ARR | New + Expansion - Churn - Contraction | Total growth in period |

**ARR Waterfall:**
```
Starting ARR (Jan 1):           $10,000,000
  + New ARR:                    + $2,500,000
  + Expansion ARR:              + $1,200,000
  - Churned ARR:                -   $800,000
  - Contraction ARR:            -   $300,000
  = Ending ARR (Dec 31):        $12,600,000
  = Net New ARR:                 $2,600,000
  = ARR Growth Rate:                    26%
```

### Monthly Recurring Revenue (MRR)

**Definition:** The monthly-normalized value of all active recurring subscriptions.

**Calculation:**
```
MRR = ARR / 12
```

Or calculated directly:
```
MRR = SUM(Monthly Subscription Value for all active customers)
```

For annual contracts: MRR contribution = Annual Contract Value / 12
For multi-year contracts: MRR contribution = Total Contract Value / (Term Months)

**When to Use ARR vs. MRR:**
- ARR: Enterprise/B2B SaaS with annual contracts, board reporting, fundraising
- MRR: Self-serve/PLG, SMB-focused, monthly contracts, operational reporting
- Both: Mature SaaS with mixed contract types

---

## NRR and GRR — Retention Economics

### Net Revenue Retention (NRR)

**Definition:** The percentage of recurring revenue retained from existing customers
over a period, including expansion and contraction.

**Calculation:**
```
NRR = (Starting ARR + Expansion - Churn - Contraction) / Starting ARR x 100
```

**Example:**
```
Starting ARR (Jan 1):     $10,000,000
Expansion ARR:            + $1,200,000
Churned ARR:              -   $800,000
Contraction ARR:          -   $300,000

NRR = ($10,000,000 + $1,200,000 - $800,000 - $300,000) / $10,000,000
NRR = $10,100,000 / $10,000,000
NRR = 101%
```

**NRR > 100% means:** Existing customers are growing faster than they churn. Even
with zero new customers, the business would still grow. This is the hallmark of a
best-in-class SaaS company.

**NRR Benchmarks:**

| Segment | Good | Great | World Class |
|---------|------|-------|-------------|
| SMB (<$10K ACV) | 90-95% | 95-100% | >100% |
| Mid-Market ($10-100K ACV) | 100-105% | 105-115% | >115% |
| Enterprise ($100K+ ACV) | 110-120% | 120-130% | >130% |

**NRR Measurement Periods:**
- Trailing 12 months (most common, smooths seasonality)
- Trailing 4 quarters (normalized by quarter)
- Cohort-based (measure NRR for customers acquired in specific period)

### Gross Revenue Retention (GRR)

**Definition:** The percentage of recurring revenue retained from existing customers
EXCLUDING expansion. GRR can never exceed 100%.

**Calculation:**
```
GRR = (Starting ARR - Churn - Contraction) / Starting ARR x 100
```

**Example:**
```
Starting ARR:     $10,000,000
Churned ARR:      -   $800,000
Contraction ARR:  -   $300,000

GRR = ($10,000,000 - $800,000 - $300,000) / $10,000,000
GRR = $8,900,000 / $10,000,000
GRR = 89%
```

**GRR Benchmarks:**

| Segment | Concerning | Good | Great |
|---------|-----------|------|-------|
| SMB | <80% | 80-85% | >85% |
| Mid-Market | <85% | 85-90% | >90% |
| Enterprise | <90% | 90-95% | >95% |

**Why GRR Matters Separately from NRR:**
NRR can mask retention problems. A company with 120% NRR and 75% GRR is growing
through aggressive expansion but bleeding customers. This is unsustainable because:
- The expansion pool shrinks as customers churn
- Expansion often comes from a subset of healthy accounts
- Eventually, churn outpaces expansion as the base erodes

---

## ACV and TCV — Deal Metrics

### Annual Contract Value (ACV)

**Definition:** The annualized revenue value of a single customer contract.

**Calculation:**
```
For 1-year contract: ACV = Total Contract Value
For multi-year contract: ACV = Total Contract Value / Contract Years
```

**Examples:**
- 1-year, $120K contract: ACV = $120K
- 3-year, $300K contract: ACV = $100K
- 2-year, $200K contract with ramp ($80K Y1, $120K Y2): ACV = $100K average
  (or reported as $80K Y1 ACV and $120K Y2 ACV depending on methodology)

### Total Contract Value (TCV)

**Definition:** The total committed revenue value of a contract over its full term.

**Calculation:**
```
TCV = Annual Contract Value x Contract Term (years) + One-Time Fees
```

**Examples:**
- 3-year deal at $100K/year + $25K implementation: TCV = $325K
- 1-year deal at $50K + $10K onboarding: TCV = $60K

**ACV vs. TCV Usage:**

| Context | Use ACV | Use TCV |
|---------|---------|---------|
| Revenue reporting | Yes | No (use ARR instead) |
| Deal size comparison | Yes | For multi-year comparison |
| Rep commission | Usually ACV-based | Sometimes TCV for multi-year incentive |
| Fundraising/board | Yes (with ARR) | Less common |
| Pipeline valuation | Yes | No |
| Contract analysis | Both | Both |

---

## Bookings vs. Billings vs. Revenue

### The Three Revenue Measures

These three terms are frequently confused but represent fundamentally different
things:

| Measure | Definition | When Recognized | Example |
|---------|-----------|-----------------|---------|
| Bookings | Total value of signed contracts | At contract signature | 3-year, $300K deal → $300K booking (TCV) or $100K booking (ACV) |
| Billings | Invoices sent to customers | At invoice generation | Annual prepaid → $100K billed at year start |
| Revenue | Revenue recognized per accounting standards (ASC 606) | Ratably over service period | $100K annual deal → $8,333/month recognized |

### Why the Distinction Matters

**Scenario: January 1 — Company signs a 3-year, $300K deal, billed annually.**

| Measure | January | Q1 | Year 1 | Total |
|---------|---------|----|---------|----- |
| Bookings | $300K (TCV) or $100K (ACV) | $100K ACV | $100K ACV | $300K TCV |
| Billings | $100K (first year invoice) | $100K | $100K | $300K over 3 years |
| Revenue | $8,333 | $25,000 | $100,000 | $300K over 3 years |

**For sales teams:** Bookings (ACV) is the primary performance metric.
**For finance teams:** Revenue (ASC 606) is the primary reporting metric.
**For cash flow:** Billings determine actual cash collection.

### Common Bookings Mistakes

1. **Double-counting multi-year TCV as ACV.** A $300K 3-year deal is $100K ACV,
   not $300K.

2. **Counting renewals as new bookings.** Renewals at the same rate are retention,
   not new bookings. Only the expansion component is "new."

3. **Counting signed but not started contracts.** If the contract starts in Q2 but
   is signed in Q1, different organizations treat this differently. Define your
   policy and apply consistently.

4. **Ignoring contraction in net bookings.** A customer renewing at $80K instead of
   $100K is -$20K net new bookings, not $80K bookings.

---

## Advanced Revenue Metrics

### DBNER (Dollar-Based Net Expansion Rate)

Identical to NRR but explicitly named. Some companies use DBNER in SEC filings.

### Committed ARR vs. Live ARR

- **Committed ARR:** Contracts signed but not yet deployed
- **Live ARR:** Contracts deployed and actively generating usage/value
- The gap between committed and live is your implementation backlog

### ARR per Employee

```
ARR per Employee = Total ARR / Total Employees
```

**Benchmarks:**
- Early-stage (seed to Series A): $50-100K ARR/employee
- Growth (Series B to D): $100-200K ARR/employee
- Efficient growth: $200-300K ARR/employee
- Public company median: $250-350K ARR/employee

### Quick Ratio (SaaS)

```
Quick Ratio = (New ARR + Expansion ARR) / (Churned ARR + Contraction ARR)
```

**Interpretation:**
- Quick Ratio > 4: Excellent growth efficiency
- Quick Ratio 2-4: Healthy
- Quick Ratio < 2: Growth is being undermined by churn

### Rule of 40

```
Rule of 40 = Revenue Growth Rate (%) + Free Cash Flow Margin (%)
```

A combined score above 40 indicates a healthy balance between growth and profitability.
- Growth-focused company: 60% growth + (-20%) margin = 40 (passes)
- Balanced company: 30% growth + 15% margin = 45 (passes)
- Profitable company: 10% growth + 35% margin = 45 (passes)

---

## Revenue Metric Reporting Cadence

| Metric | Frequency | Audience | Source |
|--------|-----------|----------|--------|
| ARR/MRR | Monthly | All leadership | Billing system + CRM |
| NRR/GRR | Quarterly | Board, executive team | Revenue operations |
| ACV/TCV | Deal-level (real-time) | Sales leadership | CRM |
| Bookings | Weekly/Monthly | Sales leadership | CRM |
| Revenue (ASC 606) | Monthly/Quarterly | Finance, board, investors | Accounting system |
| Billings | Monthly | Finance | Billing system |
| Quick Ratio | Quarterly | Board, executive team | Revenue operations |
| Rule of 40 | Quarterly | Board, investors | Finance |

---

**Revenue metrics are the vital signs of a SaaS business. Knowing the numbers is
necessary. Understanding what drives them — and what they predict — is the difference
between a data-informed organization and a data-decorated one.**

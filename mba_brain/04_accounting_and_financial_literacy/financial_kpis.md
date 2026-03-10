# Financial KPIs and Ratio Analysis

## What This Enables

**Decisions it helps make:**
- Is this business financially healthy?
- How does it compare to industry benchmarks?
- What are the leading indicators of financial distress?
- Which SaaS metrics matter most at each growth stage?

---

## 1. Financial Ratio Categories

### 1.1 Liquidity Ratios

Measure ability to meet short-term obligations.

| Ratio | Formula | Healthy Range | Interpretation |
|-------|---------|---------------|----------------|
| Current Ratio | Current Assets / Current Liabilities | 1.5 - 3.0 | Ability to cover short-term debts |
| Quick Ratio | (Cash + Receivables) / Current Liabilities | 1.0 - 2.0 | Excludes inventory (stricter test) |
| Cash Ratio | Cash / Current Liabilities | 0.5 - 1.0 | Most conservative liquidity measure |
| Operating Cash Flow Ratio | CFO / Current Liabilities | > 1.0 | Cash-based liquidity test |

**Warning signs:** Current ratio < 1.0, declining trend, or sudden drops.

### 1.2 Solvency (Leverage) Ratios

Measure ability to meet long-term obligations.

| Ratio | Formula | Healthy Range | Interpretation |
|-------|---------|---------------|----------------|
| Debt-to-Equity | Total Debt / Total Equity | 0.3 - 1.5 (varies by industry) | Capital structure risk |
| Debt-to-Assets | Total Debt / Total Assets | 0.2 - 0.6 | Proportion of assets financed by debt |
| Interest Coverage | EBIT / Interest Expense | > 3.0 | Ability to service debt |
| Debt-to-EBITDA | Total Debt / EBITDA | < 3.0 | Leverage relative to cash generation |
| Fixed Charge Coverage | (EBIT + Lease Payments) / (Interest + Lease Payments) | > 1.5 | Broader obligation coverage |

**Warning signs:** Interest coverage < 1.5x, debt-to-EBITDA > 4x, rising leverage with declining margins.

### 1.3 Efficiency (Activity) Ratios

Measure how effectively assets are used.

| Ratio | Formula | Interpretation |
|-------|---------|----------------|
| Asset Turnover | Revenue / Total Assets | Revenue generated per dollar of assets |
| Inventory Turnover | COGS / Average Inventory | Times inventory cycles per year |
| Days Sales Outstanding (DSO) | (AR / Revenue) x 365 | Days to collect receivables |
| Days Inventory Outstanding (DIO) | (Inventory / COGS) x 365 | Days inventory sits before sale |
| Days Payable Outstanding (DPO) | (AP / COGS) x 365 | Days to pay suppliers |
| Cash Conversion Cycle | DSO + DIO - DPO | Days between cash out and cash in |
| Receivables Turnover | Revenue / Average AR | Times receivables cycle per year |

**Cash Conversion Cycle:**

```
CCC = DSO + DIO - DPO
```

A negative CCC means the company gets paid by customers before it pays suppliers — an ideal working capital position (e.g., Amazon, subscription businesses collecting upfront).

### 1.4 Profitability Ratios

| Ratio | Formula | Interpretation |
|-------|---------|----------------|
| Gross Margin | Gross Profit / Revenue | Direct production profitability |
| Operating Margin | EBIT / Revenue | Core operational profitability |
| Net Margin | Net Income / Revenue | Bottom-line profitability |
| EBITDA Margin | EBITDA / Revenue | Cash-operating profitability |
| Return on Assets (ROA) | Net Income / Total Assets | Profitability relative to asset base |
| Return on Equity (ROE) | Net Income / Shareholders' Equity | Return to equity holders |
| Return on Invested Capital (ROIC) | NOPAT / Invested Capital | Return on all invested capital |

**ROIC is the gold standard:** ROIC = NOPAT / (Total Debt + Equity - Excess Cash)

Where NOPAT = EBIT x (1 - Tax Rate)

**ROIC > WACC** indicates the firm is creating economic value (earning above its cost of capital).

**ROIC < WACC** indicates the firm is destroying economic value, regardless of accounting profitability.

---

## 2. Industry Benchmarks

### 2.1 By Industry

| Industry | Gross Margin | Operating Margin | Asset Turnover | Debt/Equity |
|----------|-------------|-----------------|----------------|-------------|
| SaaS Software | 70-85% | 10-25% (mature) | 0.5-1.0 | 0.0-0.5 |
| E-commerce | 25-45% | 3-8% | 1.5-3.0 | 0.5-1.5 |
| Professional Services | 30-50% | 10-20% | 1.0-2.0 | 0.2-0.8 |
| Manufacturing | 25-45% | 8-15% | 0.8-1.5 | 0.5-1.5 |
| Financial Services | N/A | 25-40% | 0.05-0.15 | 5.0-15.0 |
| Retail | 25-35% | 3-8% | 2.0-4.0 | 0.5-1.5 |
| Marketplace | 60-90% (take rate) | 15-35% | 0.8-2.0 | 0.0-0.5 |

### 2.2 Interpreting Benchmarks

- Compare to direct competitors, not just industry averages
- Track trends over time, not just point-in-time snapshots
- Adjust for company stage (early-stage companies prioritize growth over margins)
- Adjust for business model (marketplaces report gross merchandise value differently than product companies)

---

## 3. SaaS Metrics

### 3.1 Core SaaS KPIs

| Metric | Formula | Target |
|--------|---------|--------|
| MRR (Monthly Recurring Revenue) | Sum of all monthly subscription fees | Growing month-over-month |
| ARR (Annual Recurring Revenue) | MRR x 12 | Primary top-line metric |
| New MRR | MRR from new customers this month | Consistent or growing |
| Expansion MRR | MRR increase from existing customers | Growing |
| Churned MRR | MRR lost from cancellations | Minimizing |
| Net New MRR | New + Expansion - Churned | Positive and growing |

### 3.2 Retention Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Gross Revenue Retention (GRR) | (Starting MRR - Churned MRR) / Starting MRR | > 85% |
| Net Revenue Retention (NRR/NDR) | (Starting MRR + Expansion - Churned) / Starting MRR | > 110% |
| Logo Retention | (Starting customers - Lost customers) / Starting customers | > 90% |
| Dollar-Weighted Churn | Churned MRR / Starting MRR | < 2% monthly |

**NRR > 100%** means you are growing revenue from existing customers even without new customer acquisition. This is the hallmark of best-in-class SaaS:
- Best in class: NRR > 130% (Snowflake, Twilio at peak)
- Excellent: NRR 120-130%
- Good: NRR 110-120%
- Acceptable: NRR 100-110%
- Concerning: NRR < 100%

### 3.3 Unit Economics

| Metric | Formula | Target |
|--------|---------|--------|
| CAC | Total S&M spend / New customers acquired | Varies by segment |
| LTV | ARPA x Gross Margin / Monthly Churn Rate | Varies by segment |
| LTV:CAC Ratio | LTV / CAC | > 3:1 |
| CAC Payback (months) | CAC / (ARPA x Gross Margin) | < 12-18 months |
| Magic Number | Net New ARR / Prior Quarter S&M Spend | > 0.75 |

**CAC Payback by stage:**
- Early stage (pre-PMF): < 18 months acceptable
- Growth stage: < 12 months
- At scale: < 8 months

### 3.4 The Rule of 40

```
Rule of 40 = Revenue Growth Rate (%) + EBITDA Margin (%)
```

**Interpretation:**
- > 40%: Excellent balance of growth and profitability
- 20-40%: Good, but room for optimization
- < 20%: Concerning — neither growing fast nor profitable

**Best-in-class SaaS companies:**
- High growth: 60% growth + (-20%) margin = 40
- Balanced: 30% growth + 15% margin = 45
- Mature: 15% growth + 30% margin = 45

### 3.5 SaaS Quick Ratio

```
SaaS Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)
```

Measures growth efficiency. How many dollars of new/expansion revenue for each dollar lost.

- > 4.0: Very healthy growth efficiency
- 2.0 - 4.0: Healthy
- 1.0 - 2.0: Concerns about sustainability
- < 1.0: Shrinking (losing more than gaining)

---

## 4. Financial Distress Indicators

### 4.1 Altman Z-Score

*Citation: Altman, E. I. (1968). Financial ratios, discriminant analysis and the prediction of corporate bankruptcy. Journal of Finance, 23(4), 589-609.*

```
Z = 1.2(WC/TA) + 1.4(RE/TA) + 3.3(EBIT/TA) + 0.6(MVE/BVD) + 1.0(Sales/TA)
```

Where:
- WC = Working Capital
- TA = Total Assets
- RE = Retained Earnings
- MVE = Market Value of Equity
- BVD = Book Value of Total Debt

**Interpretation:**
- Z > 2.99: Safe zone
- 1.81 < Z < 2.99: Grey zone (caution)
- Z < 1.81: Distress zone (high bankruptcy probability)

### 4.2 Early Warning Signs

| Signal | What It Indicates |
|--------|------------------|
| Revenue growing but CFO declining | Aggressive revenue recognition |
| DSO increasing rapidly | Collection problems or quality of revenue declining |
| Inventory building up | Demand weakness |
| Frequent goodwill impairments | Overpaid for acquisitions |
| Auditor changes | Potential disagreements on accounting treatment |
| Debt covenants being renegotiated | Approaching financial stress |
| C-suite departures (especially CFO) | Internal concerns about financial health |

---

## 5. Putting It All Together — Financial Health Assessment

### 5.1 The Five-Minute Financial Health Check

1. **Revenue trend:** Growing, stable, or declining? (growth rate)
2. **Margin trend:** Expanding, stable, or compressing? (gross and operating margins)
3. **Cash generation:** Is CFO positive and tracking net income? (cash quality)
4. **Balance sheet:** Is leverage manageable? (debt-to-EBITDA, interest coverage)
5. **Efficiency:** Is capital being used effectively? (ROIC vs. WACC)

### 5.2 Red Flags Summary

```
Financial Statement Red Flags:
- Revenue growing faster than cash from operations
- Margins declining without clear strategic reason
- Working capital deteriorating (DSO, DIO increasing)
- Off-balance-sheet obligations (operating leases pre-IFRS 16, SPEs)
- Unusual related-party transactions
- Frequent changes in accounting policies
- Non-GAAP metrics diverging from GAAP metrics
- Stock-based compensation excluded from "adjusted" metrics
```

---

## Key Citations

- Altman, E. I. (1968). Financial ratios, discriminant analysis and the prediction of corporate bankruptcy. *Journal of Finance*, 23(4), 589-609.
- Brealey, R. A., Myers, S. C., & Allen, F. (2020). *Principles of Corporate Finance* (13th ed.). McGraw-Hill.
- Damodaran, A. (2012). *Investment Valuation* (3rd ed.). Wiley.
- Koller, T., Goedhart, M., & Wessels, D. (2020). *Valuation: Measuring and Managing the Value of Companies* (7th ed.). McKinsey/Wiley.

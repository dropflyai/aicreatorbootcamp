# Financial Statements — Comprehensive Analysis Framework

## What This Enables

**Decisions it helps make:**
- Is this business fundamentally healthy or deteriorating?
- Where is value being created or destroyed?
- How does this company compare to peers?
- What story are the financials telling (and hiding)?

**Academic foundations:**
- DuPont analysis (decomposition of ROE)
- Common-size analysis (standardization for comparison)
- Revenue recognition under ASC 606
- GAAP vs. IFRS differences

---

## 1. The Three Financial Statements

### 1.1 Income Statement (P&L)

Reports revenue, expenses, and profit over a period.

**Structure:**

```
Revenue (Net Sales)
  - Cost of Goods Sold (COGS)
= Gross Profit
  - Operating Expenses (SG&A, R&D)
= Operating Income (EBIT)
  - Interest Expense
  +/- Other Income/Expense
= Pre-Tax Income (EBT)
  - Income Tax Expense
= Net Income
  / Shares Outstanding
= Earnings Per Share (EPS)
```

**Key relationships:**
- Gross Margin = Gross Profit / Revenue
- Operating Margin = EBIT / Revenue
- Net Margin = Net Income / Revenue
- EBITDA = EBIT + Depreciation + Amortization

### 1.2 Balance Sheet

Reports assets, liabilities, and equity at a point in time.

**The fundamental equation:** Assets = Liabilities + Shareholders' Equity

```
ASSETS                          LIABILITIES + EQUITY
Current Assets                  Current Liabilities
  Cash & Equivalents              Accounts Payable
  Accounts Receivable             Short-term Debt
  Inventory                       Accrued Expenses
  Prepaid Expenses                Deferred Revenue
Non-Current Assets              Long-term Liabilities
  PP&E (net)                      Long-term Debt
  Intangible Assets               Deferred Tax Liabilities
  Goodwill                      Shareholders' Equity
  Long-term Investments           Common Stock
                                  Retained Earnings
                                  AOCI
```

### 1.3 Cash Flow Statement

Reports cash inflows and outflows by activity.

```
Cash from Operations (CFO)
  Net Income
  + Depreciation & Amortization (non-cash)
  +/- Changes in Working Capital
    (increase in AR = cash outflow)
    (increase in AP = cash inflow)
    (increase in Inventory = cash outflow)

Cash from Investing (CFI)
  - Capital Expenditures
  - Acquisitions
  + Asset Sales

Cash from Financing (CFF)
  + Debt Issuance
  - Debt Repayment
  + Equity Issuance
  - Share Repurchases
  - Dividends

Net Change in Cash = CFO + CFI + CFF
```

### 1.4 How the Three Statements Connect

```
Income Statement ──(Net Income)──> Statement of Retained Earnings ──> Balance Sheet (Equity)
Income Statement ──(Net Income)──> Cash Flow Statement (starting point of CFO)
Balance Sheet ──(Change in assets/liabilities)──> Cash Flow Statement (working capital changes)
Cash Flow Statement ──(Net change in cash)──> Balance Sheet (Cash line)
```

---

## 2. DuPont Analysis

### 2.1 Three-Component DuPont

*Origin: DuPont Corporation, 1920s*

Decomposes Return on Equity (ROE) into three drivers:

```
ROE = Net Margin x Asset Turnover x Equity Multiplier

ROE = (Net Income/Revenue) x (Revenue/Assets) x (Assets/Equity)
```

| Component | Measures | Improved By |
|-----------|----------|-------------|
| Net Margin | Profitability | Pricing power, cost control |
| Asset Turnover | Efficiency | Better asset utilization, less capital intensity |
| Equity Multiplier | Leverage | More debt (increases ROE but also risk) |

### 2.2 Five-Component DuPont

Further decomposes margin into operating and non-operating components:

```
ROE = Tax Burden x Interest Burden x Operating Margin x Asset Turnover x Equity Multiplier

ROE = (NI/EBT) x (EBT/EBIT) x (EBIT/Revenue) x (Revenue/Assets) x (Assets/Equity)
```

**Why this matters:** Separates operating performance from capital structure and tax decisions. Two companies with the same ROE may have very different operational health.

### 2.3 DuPont Diagnostic Framework

| If ROE is declining, check: | Likely cause | Action |
|----------------------------|-------------|--------|
| Margin declining | Pricing pressure, cost inflation | Pricing strategy, cost reduction |
| Turnover declining | Underutilized assets, slow growth | Asset optimization, working capital management |
| Leverage declining | Deleveraging, equity issuance | May be intentional (de-risking) |

---

## 3. Common-Size Analysis

### 3.1 Method

Express all line items as a percentage of a base:
- **Income statement:** All items as % of Revenue
- **Balance sheet:** All items as % of Total Assets

### 3.2 Application

**Cross-company comparison:** Companies of different sizes become comparable when expressed as percentages.

**Trend analysis:** Track how cost structure evolves over time.

**Example common-size income statement:**

```
                Company A    Company B    Industry Avg
Revenue           100.0%      100.0%       100.0%
COGS              (45.0%)     (62.0%)      (55.0%)
Gross Profit       55.0%       38.0%        45.0%
SG&A              (20.0%)     (18.0%)      (22.0%)
R&D               (15.0%)      (8.0%)      (10.0%)
EBIT               20.0%       12.0%        13.0%
Net Income         14.0%        8.0%         9.0%
```

**Interpretation:** Company A has superior gross margins (pricing power or cost structure), invests more in R&D, and still achieves higher profitability. Company B has lower margins but also lower SG&A.

---

## 4. Trend Analysis

### 4.1 Horizontal Analysis

Compare line items across time periods, expressed as growth rates or index numbers.

```
                  2023      2024      2025     3-yr CAGR
Revenue           $100M     $130M     $169M    30.0%
COGS              ($45M)    ($60M)    ($80M)   33.3%
Gross Profit      $55M      $70M      $89M     27.3%
SG&A              ($20M)    ($28M)    ($38M)   37.9%
```

**Warning sign:** When expenses grow faster than revenue (SG&A CAGR 37.9% > Revenue CAGR 30.0%), margins are compressing. This is unsustainable.

### 4.2 Key Trends to Monitor

| Trend | Healthy | Concerning |
|-------|---------|------------|
| Revenue growth vs. expense growth | Revenue > expenses | Expenses > revenue |
| Gross margin | Stable or improving | Declining |
| Days Sales Outstanding (DSO) | Stable or declining | Increasing (collection issues) |
| Days Inventory Outstanding (DIO) | Stable | Increasing (demand issues) |
| Cash conversion cycle | Short and stable | Lengthening |
| CapEx as % of revenue | Appropriate for stage | Spiking or collapsing |

---

## 5. GAAP vs. IFRS

### 5.1 Key Differences

| Area | GAAP (US) | IFRS (International) |
|------|-----------|---------------------|
| Inventory | FIFO or LIFO allowed | LIFO prohibited |
| Development costs | Expensed (mostly) | Capitalized if criteria met |
| Revenue recognition | ASC 606 | IFRS 15 (largely converged) |
| Leases | ASC 842 | IFRS 16 (largely converged) |
| Impairment | Cannot reverse | Can reverse (except goodwill) |
| Extraordinary items | Not permitted | Not permitted |
| Framework | Rules-based | Principles-based |

### 5.2 Practical Implications

When comparing companies across jurisdictions:
- LIFO vs. FIFO affects COGS and inventory values (especially in inflationary environments)
- Capitalization vs. expensing of development costs affects both profitability and asset values
- Impairment reversals under IFRS can increase reported income relative to GAAP

---

## 6. Revenue Recognition — ASC 606

### 6.1 The Five-Step Model

*ASC 606 (Topic 606, Revenue from Contracts with Customers), effective 2018*

**Step 1: Identify the contract** — Agreement creating enforceable rights and obligations

**Step 2: Identify performance obligations** — Distinct promises in the contract (a good, a service, a bundle)

**Step 3: Determine the transaction price** — Amount of consideration expected, including variable consideration, discounts, and financing components

**Step 4: Allocate the transaction price** — Distribute to each performance obligation based on standalone selling prices

**Step 5: Recognize revenue** — When (or as) each performance obligation is satisfied (point in time or over time)

### 6.2 SaaS Revenue Recognition

| Component | Recognition |
|-----------|-------------|
| Subscription fees | Ratably over the subscription period |
| Implementation fees | Over time if inseparable from subscription; at completion if distinct |
| Professional services | As delivered (over time) |
| Usage-based fees | As usage occurs |

### 6.3 Red Flags in Revenue Recognition

- Revenue growing faster than cash from operations (recognizing revenue before cash)
- Deferred revenue declining while reported revenue grows (pulling forward revenue)
- Unusual quarter-end revenue spikes (channel stuffing)
- Frequent revenue restatements
- Complicated multi-element arrangements with subjective allocation

---

## 7. Financial Statement Linkage for Valuation

### 7.1 Building a Three-Statement Model

The three statements must be internally consistent:

```
1. Project Revenue (top-line growth assumptions)
2. Build Income Statement (margins, expense ratios)
3. Build Balance Sheet (working capital, capex, debt)
4. Build Cash Flow (from IS changes and BS changes)
5. Verify: ending cash on CFS = cash on BS
6. Iterate: adjust assumptions until model balances
```

### 7.2 Key Assumptions to Stress-Test

| Assumption | Impact |
|-----------|--------|
| Revenue growth rate | Drives everything downstream |
| Gross margin | Pricing power and COGS efficiency |
| OpEx as % of revenue | Operating leverage |
| Working capital days | Cash conversion efficiency |
| CapEx as % of revenue | Capital intensity |
| Tax rate | Net income and cash flow |
| Debt terms | Interest expense, refinancing risk |

---

## Key Citations

- Financial Accounting Standards Board. (2014). ASC 606: Revenue from Contracts with Customers.
- International Accounting Standards Board. (2014). IFRS 15: Revenue from Contracts with Customers.
- Penman, S. H. (2013). *Financial Statement Analysis and Security Valuation* (5th ed.). McGraw-Hill.
- Palepu, K. G., Healy, P. M., & Peek, E. (2019). *Business Analysis and Valuation: IFRS Edition* (5th ed.). Cengage.
- Fridson, M. S., & Alvarez, F. (2022). *Financial Statement Analysis: A Practitioner's Guide* (5th ed.). Wiley.

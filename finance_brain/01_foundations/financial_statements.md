# Financial Statements

## Foundation

The three primary financial statements -- income statement, balance sheet, and
cash flow statement -- form an interconnected system that tells the complete
story of a company's financial performance, position, and liquidity. Mastery
of these statements and their interrelationships is essential for every
financial analysis this brain produces.

Reference: FASB ASC 205-235 (Presentation of Financial Statements),
IAS 1 (Presentation of Financial Statements), CFA Level I Financial Reporting.

---

## Statement 1: Income Statement (Statement of Operations)

### Purpose
Measures economic performance over a period (month, quarter, year). Reports
revenue earned and expenses incurred to determine net income or net loss.

### Structure for a SaaS Company

```
Revenue
  Subscription Revenue                         $10,000,000
  Professional Services Revenue                  1,000,000
  Usage-Based Revenue                              500,000
                                              -----------
Total Revenue                                  $11,500,000

Cost of Revenue (COGS)
  Hosting and Infrastructure                      (800,000)
  Customer Support                                (600,000)
  Payment Processing                              (200,000)
  Third-Party Software                            (150,000)
                                              -----------
Total Cost of Revenue                          $(1,750,000)
                                              -----------
Gross Profit                                    $9,750,000
Gross Margin                                         84.8%

Operating Expenses
  Research & Development
    Engineering Salaries                        (3,000,000)
    Stock-Based Compensation (R&D)                (500,000)
    Software & Tools                              (200,000)
    Subtotal R&D                               $(3,700,000)

  Sales & Marketing
    Sales Salaries & Commissions                (2,000,000)
    Marketing Programs                            (800,000)
    Stock-Based Compensation (S&M)                (300,000)
    Subtotal S&M                               $(3,100,000)

  General & Administrative
    Executive Compensation                        (800,000)
    Legal & Professional                          (300,000)
    Rent & Facilities                             (400,000)
    Insurance                                     (100,000)
    Stock-Based Compensation (G&A)                (200,000)
    Other G&A                                     (150,000)
    Subtotal G&A                               $(1,950,000)
                                              -----------
Total Operating Expenses                       $(8,750,000)
                                              -----------
Operating Income (EBIT)                         $1,000,000
Operating Margin                                       8.7%

Other Income / (Expense)
  Interest Income                                   50,000
  Interest Expense                                (100,000)
  Foreign Exchange Gain / (Loss)                   (20,000)
                                              -----------
Total Other Income / (Expense)                    $(70,000)
                                              -----------
Income Before Taxes                               $930,000

Income Tax Expense                                (195,300)
Effective Tax Rate                                   21.0%
                                              -----------
Net Income                                        $734,700
                                              -----------

Non-GAAP Adjustments:
  Add back: Stock-Based Compensation            $1,000,000
  Adjusted EBITDA                               $2,000,000
  Adjusted EBITDA Margin                             17.4%
```

### Critical Income Statement Concepts

**Revenue Recognition Timing:**
- Point-in-time: professional services delivered, one-time fees
- Over time: subscription revenue (ratably), long-term contracts

**GAAP vs. Non-GAAP:**
- SBC is a real economic cost (dilution) but non-cash
- Adjusted EBITDA adds back SBC, depreciation, one-time items
- Non-GAAP must reconcile to GAAP (SEC Regulation G)

**Operating Leverage:**
Measured by the relationship between revenue growth and operating income growth.
High operating leverage: fixed costs are large relative to variable costs, so
incremental revenue drops mostly to operating income.

```
Degree of Operating Leverage = % Change in EBIT / % Change in Revenue
```

---

## Statement 2: Balance Sheet (Statement of Financial Position)

### Purpose
Snapshot of what the company owns (assets), owes (liabilities), and the residual
claim of owners (equity) at a specific point in time. Must always balance:
Assets = Liabilities + Equity.

### Structure

```
ASSETS
Current Assets
  Cash and Cash Equivalents                     $5,000,000
  Short-Term Investments                         2,000,000
  Accounts Receivable, net                       1,800,000
    (Gross AR: $2,000,000, less allowance: $200,000)
  Prepaid Expenses                                 300,000
  Deferred Commission Costs (current)              150,000
  Other Current Assets                             100,000
                                              -----------
Total Current Assets                            $9,350,000

Non-Current Assets
  Property & Equipment, net                        500,000
  Right-of-Use Assets (ASC 842)                    800,000
  Capitalized Software Development, net            400,000
  Deferred Commission Costs (non-current)          250,000
  Goodwill                                               0
  Other Non-Current Assets                         100,000
                                              -----------
Total Non-Current Assets                        $2,050,000
                                              -----------
TOTAL ASSETS                                   $11,400,000
===========================================================

LIABILITIES AND SHAREHOLDERS' EQUITY
Current Liabilities
  Accounts Payable                                $400,000
  Accrued Liabilities                              600,000
  Accrued Compensation                             500,000
  Deferred Revenue (current)                     3,500,000
  Current Portion of Lease Liability               200,000
  Current Portion of Long-Term Debt                100,000
  Other Current Liabilities                        100,000
                                              -----------
Total Current Liabilities                       $5,400,000

Non-Current Liabilities
  Long-Term Debt                                   900,000
  Deferred Revenue (non-current)                   500,000
  Non-Current Lease Liability                      650,000
  Other Non-Current Liabilities                    100,000
                                              -----------
Total Non-Current Liabilities                   $2,150,000
                                              -----------
TOTAL LIABILITIES                               $7,550,000

Shareholders' Equity
  Preferred Stock, $0.0001 par, Series A              100
  Common Stock, $0.0001 par                            50
  Additional Paid-In Capital                    12,000,000
  Accumulated Deficit                           (8,150,150)
                                              -----------
TOTAL SHAREHOLDERS' EQUITY                      $3,850,000
                                              -----------
TOTAL LIABILITIES & EQUITY                     $11,400,000
===========================================================
```

### Critical Balance Sheet Concepts

**Working Capital:**
```
Working Capital = Current Assets - Current Liabilities
Net Working Capital = (CA excluding cash) - (CL excluding current debt)
```

For SaaS: deferred revenue is a current liability but represents future revenue,
not a cash obligation. Adjusted working capital often excludes deferred revenue.

**Book Value vs. Market Value:**
- Book value: historical cost minus accumulated depreciation/amortization
- Market value: what the asset would sell for today
- For startups, book value of equity is usually negative (accumulated deficit)
- Market value (last round valuation) may be dramatically higher

**Days Sales Outstanding (DSO):**
```
DSO = (Accounts Receivable / Revenue) * Days in Period
```
Target: < 45 days for SaaS. High DSO indicates collection issues.

---

## Statement 3: Cash Flow Statement

### Purpose
Shows actual cash movements during the period, categorized into operating,
investing, and financing activities. Reconciles beginning and ending cash.

### Indirect Method (Most Common)

```
CASH FLOW FROM OPERATING ACTIVITIES
Net Income                                        $734,700

Adjustments to reconcile net income to cash:
  Depreciation & Amortization                      200,000
  Stock-Based Compensation                       1,000,000
  Amortization of Deferred Commission Costs        100,000
  Non-Cash Lease Expense                            50,000

Changes in Operating Assets and Liabilities:
  Increase in Accounts Receivable                 (300,000)
  Increase in Prepaid Expenses                     (50,000)
  Increase in Deferred Commission Costs           (200,000)
  Increase in Accounts Payable                     100,000
  Increase in Accrued Liabilities                  150,000
  Increase in Deferred Revenue                     800,000
  Decrease in Lease Liabilities                    (50,000)
                                              -----------
Net Cash from Operating Activities              $2,534,700

CASH FLOW FROM INVESTING ACTIVITIES
  Purchase of Property & Equipment                (100,000)
  Capitalized Software Development                (200,000)
  Purchase of Short-Term Investments              (500,000)
                                              -----------
Net Cash from Investing Activities               $(800,000)

CASH FLOW FROM FINANCING ACTIVITIES
  Proceeds from Exercise of Stock Options          100,000
  Repayment of Long-Term Debt                     (100,000)
  Proceeds from Issuance of Preferred Stock              0
                                              -----------
Net Cash from Financing Activities                    $0

                                              -----------
Net Change in Cash                              $1,734,700
Beginning Cash Balance                           3,265,300
                                              -----------
Ending Cash Balance                             $5,000,000
===========================================================
```

### Operating vs. Free Cash Flow

```
Operating Cash Flow (OCF) = Cash from Operating Activities

Free Cash Flow to Firm (FCFF):
  FCFF = EBIT * (1 - T) + D&A - CapEx - Change in NWC
  FCFF = $1,000,000 * 0.79 + $200,000 - $300,000 - (-$450,000)
  FCFF = $790,000 + $200,000 - $300,000 + $450,000 = $1,140,000

Alternative (from cash flow statement):
  FCFF = OCF + Interest * (1-T) - CapEx
  FCFF = $2,534,700 + $100,000 * 0.79 - $300,000 = $2,313,700

Note: The second method includes SBC addback in OCF. For valuation,
adjust for whether SBC is treated as a cash expense equivalent.

Free Cash Flow to Equity (FCFE):
  FCFE = FCFF - Interest * (1-T) + Net Borrowing
  FCFE = Net Income + D&A - CapEx - Change in NWC + Net Borrowing
```

---

## The Three-Statement Linkage

This is the most critical concept for financial modeling. The three statements
are not independent -- they form an integrated system.

### Linkage Map

```
INCOME STATEMENT --> BALANCE SHEET
  Net Income --> Retained Earnings (adds to equity)
  Depreciation Expense --> Accumulated Depreciation (reduces PP&E)
  SBC Expense --> Additional Paid-In Capital (adds to equity)
  Revenue --> Accounts Receivable (if not collected)
  COGS --> Accounts Payable (if not paid)
  Interest Expense --> Cash or Debt balance

INCOME STATEMENT --> CASH FLOW STATEMENT
  Net Income --> Starting point for operating cash flow
  Depreciation --> Added back (non-cash)
  SBC --> Added back (non-cash)

BALANCE SHEET --> CASH FLOW STATEMENT
  Change in AR --> Operating (negative if AR increases)
  Change in AP --> Operating (positive if AP increases)
  Change in Deferred Revenue --> Operating (positive if DR increases)
  Change in PP&E --> Investing (CapEx)
  Change in Debt --> Financing (borrowing or repayment)
  Change in Equity --> Financing (stock issuance or repurchase)

CASH FLOW STATEMENT --> BALANCE SHEET
  Ending Cash --> Cash on balance sheet
  Net Change in Cash = Ending Cash - Beginning Cash
```

### The Integration Check

A properly built 3-statement model must satisfy:

```
1. Balance sheet balances: A = L + E (every period)
2. Cash reconciles: BS ending cash = CFS ending cash
3. Retained earnings reconcile:
   Ending RE = Beginning RE + Net Income - Dividends
4. Debt reconciles:
   Ending Debt = Beginning Debt + Borrowings - Repayments
5. PP&E reconciles:
   Ending PP&E = Beginning PP&E + CapEx - Depreciation - Disposals
6. Deferred revenue reconciles:
   Ending DR = Beginning DR + Billings - Revenue Recognized
```

If any of these fail to reconcile, the model has an error.

---

## Financial Statement Analysis Framework

### Horizontal Analysis (Trend Analysis)

Compare each line item across periods:
```
Growth Rate = (Current Period - Prior Period) / Prior Period * 100%
```

Look for: revenue acceleration/deceleration, margin expansion/compression,
working capital trends, cash conversion trends.

### Vertical Analysis (Common-Size)

Express each line item as a percentage of revenue (income statement) or total
assets (balance sheet):
```
Common-Size Percentage = Line Item / Revenue (or Total Assets) * 100%
```

Enables comparison across companies of different sizes and across time periods.

### Key Relationships to Monitor

| Relationship | Healthy Signal | Warning Signal |
|-------------|---------------|----------------|
| Revenue growth vs. expense growth | Rev grows faster | Expenses grow faster |
| Net income vs. operating cash flow | OCF > NI | OCF << NI (quality issue) |
| AR growth vs. revenue growth | In line | AR growing faster (collection) |
| Deferred revenue growth | Growing = bookings strong | Declining = demand issue |
| Cash from operations | Positive and growing | Negative and worsening |
| CapEx vs. depreciation | CapEx >= Depreciation | CapEx << Depreciation (underinvesting) |

---

## Startup-Specific Considerations

### The Cash-Negative Growth Company

Most startups have:
- Negative net income (investing in growth)
- Negative operating cash flow (spending exceeds revenue)
- Positive financing cash flow (funded by equity raises)
- Growing deferred revenue (strong bookings signal)

The key question is: **When does the company reach cash flow breakeven?**

```
Cash Breakeven Analysis:
  Monthly Burn Rate = Monthly Operating Expenses - Monthly Revenue
  Months to Breakeven = Current Burn / Monthly Burn Improvement
  Cash Required = Burn Rate * Months to Breakeven + Safety Buffer
```

### Deferred Revenue as a Leading Indicator

For SaaS companies, deferred revenue is a leading indicator of future revenue:
```
Billings = Revenue + Change in Deferred Revenue
Billings Growth > Revenue Growth = accelerating business
Billings Growth < Revenue Growth = decelerating business
```

### Remaining Performance Obligations (RPO)

Under ASC 606, companies must disclose RPO (contracted but unrecognized revenue):
```
RPO = Deferred Revenue + Unbilled Contracted Revenue
cRPO (current RPO) = portion expected to be recognized within 12 months
```

RPO growth is a forward-looking indicator of the revenue pipeline.

---

## Pro Forma Financial Statements

### When to Use Pro Forma

- Fundraising: project future financials for investor materials
- M&A: combine acquirer and target statements
- Restructuring: show impact of planned changes
- Capital structure changes: show impact of new debt or equity

### Pro Forma Construction Rules

1. Start with historical audited/reviewed statements
2. Apply adjustments with clear labels ("Pro Forma Adjustment")
3. Show each adjustment as a separate column
4. Reconcile pro forma to historical with a bridge
5. Document every assumption underlying each adjustment
6. Clearly label as "Pro Forma" -- not actual results

---

**Financial statements are not merely reports -- they are the quantitative
narrative of a business. Reading them fluently is the prerequisite for every
financial analysis this brain produces.**

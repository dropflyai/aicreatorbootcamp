# SaaS Operations — Quote-to-Cash, Billing, and Financial Operations

## Overview

SaaS financial operations encompass the systems, processes, and accounting treatments
that translate sales bookings into recognized revenue, invoiced billing, and collected
cash. This module covers the quote-to-cash lifecycle, billing models and automation,
deferred revenue accounting, professional services economics, the SaaS P&L structure,
and non-GAAP adjustments commonly used in SaaS reporting.

References: ASC 606 (Revenue Recognition), Zuora (Subscription Economy Index),
Stripe Billing documentation, SaaS Capital (operational benchmarks), Chargebee/Maxio
SaaS billing guides.

---

## Quote-to-Cash Lifecycle

### End-to-End Flow

```
┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
│Quote │──>│Order │──>│Invoice│──>│Revenue│──>│Collect│──>│Report│
│(CPQ) │   │(CRM) │   │(Billing)│ │(Ledger)│  │(AR)  │   │(FP&A)│
└──────┘   └──────┘   └──────┘   └──────┘   └──────┘   └──────┘
```

### Stage Details

**1. Quote (CPQ — Configure, Price, Quote)**
```
Sales rep creates a quote:
  Products: Standard Plan (annual subscription)
  Quantity: 100 seats
  List price: $50/seat/month = $60,000 annual
  Discount: 10% (approved by VP Sales)
  Net price: $54,000/year
  Contract term: 2 years
  Payment terms: annual upfront
  TCV (Total Contract Value): $108,000

Approval workflow:
  < 10% discount: rep can approve
  10-20% discount: manager approval
  20-30% discount: VP Sales approval
  > 30% discount: CRO + CFO approval
```

**2. Order and Contract**
```
Order created in CRM (Salesforce, HubSpot)
  - Contract signed (DocuSign, PandaDoc)
  - Contract terms logged: start date, end date, billing schedule
  - Booking recorded: $54,000 ACV, $108,000 TCV

Booking ≠ Revenue ≠ Cash
  Booking: contractual commitment (recorded at signing)
  Revenue: recognized per ASC 606 (over service period)
  Cash: when payment is received
```

**3. Invoice and Billing**
```
Billing schedule generated:
  Invoice 1: $54,000 (at contract start)
  Invoice 2: $54,000 (at 12-month anniversary)

Invoice details:
  Invoice date: 2024-07-01
  Due date: 2024-07-31 (Net 30)
  Line items: Standard Plan, 100 seats, 12 months
  Amount: $54,000
  Tax: varies by jurisdiction (SaaS taxability differs by state)
```

**4. Revenue Recognition**
```
Monthly revenue: $54,000 / 12 = $4,500/month
Deferred revenue at signing: $54,000 - $4,500 = $49,500

Month    Revenue    Cash      Deferred Revenue
Jul      $4,500     $54,000   $49,500
Aug      $4,500     $0        $45,000
Sep      $4,500     $0        $40,500
...
Jun      $4,500     $0        $0
Jul(Y2)  $4,500     $54,000   $49,500 (renewal)
```

**5. Collection and AR**
```
AR aging:
  0-30 days: current
  31-60 days: past due (automated reminder)
  61-90 days: escalated (account manager notified)
  90+ days: collections team, potential write-off assessment

Dunning sequence (failed payments):
  Day 0: Payment fails -> retry in 24 hours
  Day 3: Retry + email notification
  Day 7: Retry + email with payment update link
  Day 14: Final notice before service suspension
  Day 21: Service suspended, final retry
  Day 30: Churn (if not resolved)
```

---

## Billing Models

### Common SaaS Billing Models

| Model | Description | Revenue Recognition |
|-------|-----------|-------------------|
| Subscription (flat) | Fixed price per period | Ratably over period |
| Per-seat | Price per user per period | Ratably, adjust for user changes |
| Usage-based | Price per unit consumed | As consumed (variable) |
| Tiered | Fixed tiers with feature gates | Ratably at tier price |
| Hybrid | Base subscription + usage | Base ratably + usage as consumed |
| Freemium | Free tier + paid conversion | Revenue only on paid conversion |

### Usage-Based Billing Complexity

```
Metering pipeline:
  Event -> Aggregation -> Rating -> Invoicing

  Event: API call logged (timestamp, customer_id, units)
  Aggregation: sum units per billing period per customer
  Rating: apply pricing tiers
    0-100K calls: $0.001/call
    100K-1M: $0.0008/call
    1M+: $0.0005/call
  Invoicing: generate invoice with itemized usage

Revenue recognition challenge:
  Usage in June but invoiced in July:
    Accrue revenue in June (estimated from metering data)
    True up when invoice is issued in July
    Deferred revenue may be negative (unbilled revenue/contract asset)
```

### Billing System Architecture

```
┌────────────────────────────────────────────────────┐
│                  BILLING STACK                       │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ CRM      │  │ Billing  │  │ Payment Gateway  │ │
│  │(Salesforce)│ │(Stripe/  │  │(Stripe/Adyen)   │ │
│  │          │──│ Chargebee/│──│                  │ │
│  │          │  │ Maxio)   │  │                  │ │
│  └──────────┘  └──────────┘  └──────────────────┘ │
│       │              │                │             │
│  ┌────▼──────────────▼────────────────▼────────┐   │
│  │              ERP / Ledger                    │   │
│  │        (NetSuite, QBO, Sage)                │   │
│  └──────────────────┬──────────────────────────┘   │
│                     │                               │
│  ┌──────────────────▼──────────────────────────┐   │
│  │            FP&A / Reporting                  │   │
│  │        (Mosaic, Runway, custom)             │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

---

## Deferred Revenue

### Mechanics

```
Deferred revenue is a liability on the balance sheet representing
cash received for services not yet delivered.

Customer pays $120K for annual subscription:
  Day 1:
    Cash: +$120K (asset)
    Deferred Revenue: +$120K (liability)

  Each month:
    Revenue: +$10K (income statement)
    Deferred Revenue: -$10K (liability reduced)

  After 12 months:
    Deferred Revenue: $0
    Revenue recognized: $120K
```

### Deferred Revenue Schedule

```
Month    Beginning DR   New Cash   Revenue Rec'd   Ending DR
──────────────────────────────────────────────────────────────
Jan      $500K          $120K      ($60K)          $560K
Feb      $560K          $80K       ($62K)          $578K
Mar      $578K          $200K      ($65K)          $713K
Apr      $713K          $90K       ($68K)          $735K
...

Deferred revenue growth is a positive signal:
  Growing DR = customers paying upfront for future services
  DR provides cash flow visibility
  Declining DR may signal bookings slowdown
```

### Change in Deferred Revenue

```
Change in DR = New Cash Received - Revenue Recognized

If Change in DR > 0: collecting cash faster than recognizing revenue (healthy)
If Change in DR < 0: recognizing revenue faster than collecting (investigate)

Cash from Operations adjustment:
  CFO = Net Income + ... + Increase in Deferred Revenue
  (Increase in DR is a source of cash from operations)
```

---

## Professional Services Economics

### PS Revenue Model

```
Professional services: implementation, consulting, training, customization

Revenue recognition: over the service delivery period (ASC 606)
  Fixed-fee: ratably over engagement period
  Time-and-materials: as hours are delivered

PS economics:
  Billable rate: $250/hour
  Internal cost: $100/hour (fully loaded)
  Gross margin: 60% (target for healthy PS business)

PS margin benchmarks:
  Excellent: > 30% margin
  Good: 15-30% margin
  Poor: < 15% (or negative -- common in early-stage)
  Many SaaS companies run PS at breakeven deliberately (drives subscription)
```

### PS Impact on SaaS Metrics

```
PS revenue is NOT included in ARR:
  ARR = subscription revenue only
  PS revenue is separate line item

PS impact on financials:
  Total revenue: $20M (subscription $17M + PS $3M)
  Subscription gross margin: 80%
  PS gross margin: 20%
  Blended gross margin: 71% (diluted by PS)

Investor perspective:
  High PS % of revenue = services-heavy business (lower multiple)
  Target: PS < 15% of total revenue for a software multiple
  Solution: automate implementation, reduce PS dependency
```

---

## SaaS P&L Structure

### Standard Format

```
                              Q1         Q2         Q3         Q4        FY
──────────────────────────────────────────────────────────────────────────
Subscription Revenue          $4,000K    $4,500K    $5,100K    $5,800K   $19,400K
Professional Services         $400K      $450K      $500K      $550K     $1,900K
Total Revenue                 $4,400K    $4,950K    $5,600K    $6,350K   $21,300K

Subscription COGS             $800K      $900K      $1,020K    $1,160K   $3,880K
  (hosting, support, CS)
PS COGS                       $320K      $360K      $400K      $440K     $1,520K
Total COGS                    $1,120K    $1,260K    $1,420K    $1,600K   $5,400K

Gross Profit                  $3,280K    $3,690K    $4,180K    $4,750K   $15,900K
  Subscription GM%            80.0%      80.0%      80.0%      80.0%     80.0%
  Blended GM%                 74.5%      74.5%      74.6%      74.8%     74.6%

Sales & Marketing             $1,500K    $1,650K    $1,800K    $1,950K   $6,900K
  % of Revenue                34.1%      33.3%      32.1%      30.7%     32.4%
Research & Development        $1,200K    $1,250K    $1,300K    $1,350K   $5,100K
  % of Revenue                27.3%      25.3%      23.2%      21.3%     23.9%
General & Administrative      $500K      $520K      $540K      $560K     $2,120K
  % of Revenue                11.4%      10.5%      9.6%       8.8%      10.0%
Total Operating Expenses      $3,200K    $3,420K    $3,640K    $3,860K   $14,120K

Operating Income (Loss)       $80K       $270K      $540K      $890K     $1,780K
  Operating Margin            1.8%       5.5%       9.6%       14.0%     8.4%
```

---

## Non-GAAP Adjustments

### Common Non-GAAP Metrics

```
Non-GAAP Operating Income = GAAP Operating Income
  + Stock-Based Compensation (SBC)
  + Amortization of acquired intangibles
  + Restructuring charges
  + Other one-time items

Example:
  GAAP operating loss:                    ($2,000K)
  + Stock-based compensation:             $3,500K
  + Amortization of acquired intangibles: $500K
  + Restructuring charges:                $200K
  Non-GAAP operating income:              $2,200K

Non-GAAP operating margin:  10.3% (vs GAAP -9.4%)
```

### Non-GAAP Reconciliation Table

```
                                    Q1         Q2
─────────────────────────────────────────────────────
GAAP Net Income (Loss)              ($500K)    ($200K)
  + Stock-based compensation        $800K      $850K
  + Amortization of intangibles     $125K      $125K
  + Restructuring charges           $0         $100K
Non-GAAP Net Income                 $425K      $875K

GAAP EPS                            ($0.05)    ($0.02)
Non-GAAP EPS                        $0.04      $0.09
```

### Free Cash Flow

```
Free Cash Flow = Cash from Operations - Capital Expenditures

FCF Margin = FCF / Revenue

Example:
  Cash from operations: $2,500K
  CapEx: $300K
  FCF: $2,200K
  Revenue: $21,300K
  FCF margin: 10.3%

Note: FCF often exceeds non-GAAP income because:
  - SBC is non-cash (already excluded from non-GAAP)
  - Deferred revenue provides cash before revenue recognition
  - Net working capital timing
```

---

## Financial Operations Tech Stack

### Core Systems

| System | Purpose | Examples |
|--------|---------|---------|
| CRM | Pipeline, contracts | Salesforce, HubSpot |
| CPQ | Quote generation | Salesforce CPQ, DealHub |
| Billing | Invoice, collect | Stripe Billing, Chargebee, Maxio |
| Payment gateway | Process payments | Stripe, Adyen, Braintree |
| ERP/Ledger | General ledger, AR/AP | NetSuite, QuickBooks, Sage Intacct |
| FP&A | Planning, reporting | Mosaic, Runway, Anaplan |
| Revenue recognition | ASC 606 automation | RevPro (Zuora), Softrax |
| Expense management | Employee expenses | Brex, Ramp, Navan |
| Payroll | Employee compensation | Gusto, Rippling, ADP |

### System Integration Priorities

```
Priority 1: CRM -> Billing (automate order-to-invoice)
Priority 2: Billing -> ERP (automate revenue recognition)
Priority 3: ERP -> FP&A (automate reporting)
Priority 4: Billing -> Payment (automate collection)
Priority 5: CRM -> FP&A (pipeline-based forecasting)
```

---

## Production Checklist

- [ ] Quote-to-cash process documented end-to-end
- [ ] Billing system configured for all pricing models
- [ ] Deferred revenue schedule automated and reconciled monthly
- [ ] ASC 606 revenue recognition policy documented
- [ ] Dunning process automated for failed payments
- [ ] PS revenue separated from subscription in reporting
- [ ] SaaS P&L structure follows industry standard format
- [ ] Non-GAAP reconciliation prepared and reviewed
- [ ] Free cash flow calculated and tracked monthly
- [ ] Finance tech stack integrated (CRM -> Billing -> ERP -> FP&A)

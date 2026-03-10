# Accounting Principles

## Foundation

Financial accounting is the bedrock of the Finance Brain. Without accurate,
consistent, and standards-compliant accounting, every downstream analysis --
valuation, forecasting, fundraising -- is built on sand. This module codifies
the principles that govern all accounting work within this brain, drawing from
GAAP (ASC codification), IFRS, and the conceptual frameworks established by
FASB and IASB.

Reference: FASB Accounting Standards Codification (ASC), IASB Conceptual
Framework for Financial Reporting (2018 revision).

---

## The Accounting Equation

The fundamental identity that must always hold:

```
Assets = Liabilities + Shareholders' Equity
```

Expanded form:

```
Assets = Liabilities + Contributed Capital + Retained Earnings - Treasury Stock

Where:
  Retained Earnings = Beginning RE + Net Income - Dividends
  Net Income = Revenue - Expenses - Taxes
```

Every transaction must preserve this equation. If it does not balance, there is
an error. This is non-negotiable.

---

## Double-Entry Bookkeeping

Attributed to Luca Pacioli, Summa de Arithmetica (1494). Every transaction
requires at least two entries: a debit and a credit of equal amounts.

### Debit and Credit Rules

| Account Type | Debit Effect | Credit Effect | Normal Balance |
|-------------|-------------|--------------|----------------|
| Assets | Increase | Decrease | Debit |
| Liabilities | Decrease | Increase | Credit |
| Equity | Decrease | Increase | Credit |
| Revenue | Decrease | Increase | Credit |
| Expenses | Increase | Decrease | Debit |

### Transaction Examples

**Example 1: SaaS subscription revenue received**
```
Dr. Cash (Asset)                    $10,000
  Cr. Deferred Revenue (Liability)          $10,000
  (Annual subscription received upfront, recognized monthly)

Monthly recognition:
Dr. Deferred Revenue (Liability)     $833
  Cr. Subscription Revenue (Revenue)          $833
```

**Example 2: Equipment purchase with loan**
```
Dr. Equipment (Asset)               $50,000
  Cr. Notes Payable (Liability)             $40,000
  Cr. Cash (Asset)                          $10,000
```

**Example 3: Stock-based compensation (ASC 718)**
```
Dr. Stock Compensation Expense       $25,000
  Cr. Additional Paid-in Capital             $25,000
  (Fair value of options vested during period)
```

---

## Accrual vs. Cash Basis Accounting

### Accrual Basis (GAAP Required)

Revenue recognized when **earned** (performance obligation satisfied).
Expenses recognized when **incurred** (benefit received).

The matching principle requires that expenses be recognized in the same period
as the revenues they helped generate.

Key implications for SaaS companies:
- Annual subscriptions paid upfront: recognize revenue ratably over 12 months
- Sales commissions on multi-year deals: capitalize and amortize over benefit
  period (ASC 340-40, practical expedient if amortization period < 12 months)
- Prepaid expenses: recognize as expense over the benefit period

### Cash Basis

Revenue recognized when cash received. Expenses recognized when cash paid.
Permitted only for: small businesses not requiring GAAP, tax reporting for
qualifying small entities, supplemental cash flow analysis.

### The Accrual-to-Cash Reconciliation

This is effectively the cash flow statement's operating section (indirect method):

```
Net Income (accrual basis)
+ Depreciation and amortization (non-cash expense)
+ Stock-based compensation (non-cash expense)
- Increase in accounts receivable (earned but not collected)
+ Increase in deferred revenue (collected but not earned)
- Increase in prepaid expenses (paid but not expensed)
+ Increase in accounts payable (expensed but not paid)
+ Increase in accrued liabilities (expensed but not paid)
= Cash from Operations
```

---

## GAAP Principles and Concepts

### The FASB Conceptual Framework

**Qualitative Characteristics of Useful Financial Information:**

Primary:
1. **Relevance**: Information capable of making a difference in user decisions.
   Includes predictive value and confirmatory value. Subject to materiality.
2. **Faithful Representation**: Complete, neutral, and free from error.
   Replaces the older "reliability" concept.

Enhancing:
3. **Comparability**: Consistent application across entities and periods
4. **Verifiability**: Independent observers would reach consensus
5. **Timeliness**: Available to decision-makers before it loses relevance
6. **Understandability**: Classified, characterized, and presented clearly

### Key GAAP Principles

| Principle | Definition | Application |
|-----------|-----------|-------------|
| Historical Cost | Assets recorded at acquisition cost | Modified by fair value for certain instruments |
| Revenue Recognition | Recognized when earned (ASC 606) | Five-step model for all contracts |
| Matching | Expenses matched to related revenues | Commission capitalization, depreciation |
| Full Disclosure | Material information must be disclosed | Notes to financial statements |
| Conservatism | When uncertain, err toward understating assets/income | Lower of cost or market, impairment |
| Going Concern | Assume entity continues operating | Affects asset valuation approach |
| Consistency | Same methods period to period | Changes require disclosure and justification |
| Materiality | Only material items require strict GAAP treatment | Quantitative and qualitative assessment |

### Revenue Recognition -- ASC 606 Deep Dive

The five-step model (effective for all entities):

**Step 1: Identify the contract with a customer**
- Commercial substance, approved by parties, identifiable rights, identifiable
  payment terms, collection probable

**Step 2: Identify the performance obligations**
- Distinct goods or services (capable of being distinct AND distinct in context)
- Series guidance: substantially the same, same pattern of transfer

**Step 3: Determine the transaction price**
- Fixed and variable consideration
- Constraining variable consideration (include only amounts not subject to
  significant reversal)
- Time value of money (if significant financing component > 12 months)
- Non-cash consideration at fair value

**Step 4: Allocate the transaction price**
- Standalone selling price (SSP) for each performance obligation
- Methods: adjusted market assessment, expected cost plus margin, residual
  (only if SSP is highly variable or uncertain)

**Step 5: Recognize revenue when (or as) performance obligations are satisfied**
- Point in time: control transfers at a specific moment
- Over time: one of three criteria met (customer simultaneously receives and
  consumes benefits; company creates asset with no alternative use and has
  enforceable right to payment; customer controls asset as it is created)

---

## Chart of Accounts Design

### Standard Numbering Convention

```
1000-1999  Assets
  1000-1099  Cash and equivalents
  1100-1199  Short-term investments
  1200-1299  Accounts receivable
  1300-1399  Prepaid expenses
  1400-1499  Other current assets
  1500-1699  Property, plant, and equipment
  1700-1799  Intangible assets
  1800-1899  Right-of-use assets (ASC 842)
  1900-1999  Other long-term assets

2000-2999  Liabilities
  2000-2099  Accounts payable
  2100-2199  Accrued liabilities
  2200-2299  Deferred revenue (current)
  2300-2399  Current portion of long-term debt
  2400-2499  Other current liabilities
  2500-2599  Long-term debt
  2600-2699  Deferred revenue (long-term)
  2700-2799  Lease liabilities (ASC 842)
  2800-2999  Other long-term liabilities

3000-3999  Equity
  3000-3099  Common stock
  3100-3199  Preferred stock (by series)
  3200-3299  Additional paid-in capital
  3300-3399  Retained earnings
  3400-3499  Treasury stock
  3500-3599  Accumulated other comprehensive income

4000-4999  Revenue
  4000-4099  Subscription revenue
  4100-4199  Professional services revenue
  4200-4299  Usage-based revenue
  4300-4399  Other revenue

5000-5999  Cost of Goods Sold
  5000-5099  Hosting and infrastructure
  5100-5199  Customer support costs
  5200-5299  Payment processing fees
  5300-5399  Third-party software costs

6000-7999  Operating Expenses
  6000-6299  Research and development
  6300-6599  Sales and marketing
  6600-6899  General and administrative
  6900-6999  Depreciation and amortization

8000-8999  Other Income / Expense
  8000-8099  Interest income
  8100-8199  Interest expense
  8200-8299  Foreign exchange gain/loss
  8300-8399  Gain/loss on investments
  8900-8999  Income tax expense
```

### Departmental Coding

For FP&A purposes, append department codes:

```
Account-Department-Project
6100-ENG-001  R&D Engineering Salaries, Project Alpha
6100-ENG-002  R&D Engineering Salaries, Project Beta
6300-MKT-001  Marketing Salaries, Growth Team
```

---

## Period-End Close Process

### Monthly Close Checklist (Target: 5 Business Days)

| Day | Task | Owner |
|-----|------|-------|
| 1 | Cut off AP/AR, bank reconciliation | Accounting |
| 2 | Revenue recognition, deferred revenue roll-forward | Accounting |
| 3 | Payroll accrual, benefits accrual, SBC expense | Accounting |
| 3 | Prepaid amortization, depreciation | Accounting |
| 4 | Intercompany eliminations (if applicable) | Accounting |
| 4 | Account reconciliations (all balance sheet accounts) | Accounting |
| 5 | Flux analysis (P&L vs budget, vs prior period) | FP&A |
| 5 | Management review and sign-off | Controller/CFO |

### Key Reconciliations

Every balance sheet account must have a monthly reconciliation:
- **Cash**: Reconcile to bank statements (zero tolerance for differences)
- **AR**: Reconcile to subledger, age analysis, allowance for doubtful accounts
- **Deferred Revenue**: Roll-forward (beginning + billings - recognized = ending)
- **Fixed Assets**: Roll-forward (beginning + additions - disposals - depreciation = ending)
- **AP**: Reconcile to subledger, review for completeness
- **Accruals**: Support for each accrual with calculation methodology
- **Debt**: Reconcile to loan statements, verify interest accrual

---

## Internal Controls Framework

Per COSO (Committee of Sponsoring Organizations) framework:

### Control Environment
- Tone at the top: management commitment to financial integrity
- Segregation of duties: no single person controls entire transaction cycle
- Authorization matrix: spending limits by role

### Control Activities

| Control | Type | Example |
|---------|------|---------|
| Bank reconciliation | Detective | Monthly comparison to GL |
| Purchase approval | Preventive | Dual approval above $5K |
| Revenue cut-off | Preventive | System-enforced period close |
| Journal entry review | Detective | Manager approval required |
| Access controls | Preventive | Role-based system permissions |
| Physical inventory | Detective | Annual count, cycle counts |

### Information and Communication
- Financial reporting calendar distributed to all stakeholders
- Material accounting policy changes communicated in advance
- Audit findings tracked and remediated with deadlines

### Monitoring
- Monthly reconciliations reviewed by controller
- Quarterly self-assessment of control effectiveness
- Annual external audit (when applicable)

---

## Special Topics for Startups

### Stock-Based Compensation (ASC 718)

Fair value of equity awards recognized as expense over vesting period.
Option fair value typically determined using Black-Scholes model:

```
C = S * N(d1) - K * e^(-rT) * N(d2)

Where:
  d1 = [ln(S/K) + (r + sigma^2/2) * T] / (sigma * sqrt(T))
  d2 = d1 - sigma * sqrt(T)
  S = current stock price (409A fair market value for private companies)
  K = exercise price
  r = risk-free rate
  T = expected term (typically 5-7 years for employee options)
  sigma = expected volatility (comparable public company volatility)
  N() = cumulative normal distribution function
```

### Capitalized Software Development Costs

**Internal-Use Software (ASC 350-40):**
- Preliminary project stage: expense as incurred
- Application development stage: capitalize
- Post-implementation stage: expense as incurred
- Amortize over useful life (typically 3-5 years)

**Software to be Sold (ASC 985-20):**
- Capitalize after technological feasibility is established
- Amortize using greater of straight-line or revenue-based method

---

**Accounting is not merely record-keeping -- it is the language of business.
This module ensures that language is spoken with precision and integrity.**

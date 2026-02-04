# Finance Brain -- Glossary

## Purpose

This glossary defines financial terms as used within the Finance Brain. Definitions
align with GAAP, CFA Institute standards, and Damodaran's valuation framework.
When a term has multiple meanings in practice, the definition here is authoritative
within this brain's context.

---

## Accounting and Reporting

### Accrual Accounting
Recognition of revenue when earned and expenses when incurred, regardless of cash
timing. Required under GAAP for all entities above the small business threshold.
Contrast with cash-basis accounting.

### Chart of Accounts (COA)
The complete listing of every account in a company's general ledger, organized by
category: assets, liabilities, equity, revenue, COGS, operating expenses.
Numbering convention: 1xxx assets, 2xxx liabilities, 3xxx equity, 4xxx revenue,
5xxx COGS, 6xxx-7xxx operating expenses, 8xxx other income/expense.

### Double-Entry Bookkeeping
Every transaction affects at least two accounts with equal debits and credits.
The fundamental equation: Assets = Liabilities + Equity. Attributed to Luca
Pacioli (1494). Non-negotiable in all financial record-keeping.

### GAAP (Generally Accepted Accounting Principles)
The standard framework for financial accounting in the United States, established
by FASB (Financial Accounting Standards Board). Key codifications referenced by
this brain: ASC 606 (revenue), ASC 842 (leases), ASC 718 (stock compensation).

### IFRS (International Financial Reporting Standards)
The global accounting framework issued by the IASB. Used outside the US and
increasingly relevant for multinational entities. Key differences from GAAP:
LIFO prohibited, development costs can be capitalized, revaluation model allowed.

### Materiality
The threshold above which an omission or misstatement would influence the economic
decisions of financial statement users. Quantitative benchmarks: 5% of pre-tax
income, 0.5% of total assets, 1% of total revenue. Always requires qualitative
judgment as well (per SAB 99).

### Revenue Recognition (ASC 606)
Five-step model: (1) Identify the contract, (2) Identify performance obligations,
(3) Determine the transaction price, (4) Allocate to performance obligations,
(5) Recognize when/as obligations are satisfied. Critical for SaaS companies
with multi-element arrangements.

---

## Corporate Finance and Valuation

### Beta (Systematic Risk)
Measure of an asset's sensitivity to market movements. Calculated as:
beta = Cov(R_asset, R_market) / Var(R_market). Unlevered beta removes capital
structure effects. Re-levered beta applies target capital structure:
beta_levered = beta_unlevered * (1 + (1 - tax_rate) * (D/E)).

### CAPM (Capital Asset Pricing Model)
E(R_i) = R_f + beta_i * (E(R_m) - R_f), where R_f is the risk-free rate,
beta_i is systematic risk, and (E(R_m) - R_f) is the equity risk premium.
Per Damodaran, the ERP for the US market is approximately 4.5-5.5% based on
historical geometric average. Modified CAPM adds size premium and company-specific
risk premium for private companies.

### DCF (Discounted Cash Flow)
Intrinsic valuation method. Enterprise Value = sum of [FCF_t / (1+WACC)^t] for
t=1 to n, plus Terminal Value / (1+WACC)^n. Terminal value typically calculated
via Gordon Growth Model: TV = FCF_(n+1) / (WACC - g), where g is the perpetual
growth rate (typically 2-3% for mature companies, not exceeding long-term GDP
growth per Damodaran).

### Enterprise Value (EV)
The total value of a firm's operations available to all capital providers.
EV = Market Cap + Total Debt + Preferred Stock + Minority Interest - Cash and
Equivalents. Enterprise value is capital-structure neutral, making it the
preferred basis for operational valuation multiples.

### Equity Value
The residual value available to common shareholders.
Equity Value = Enterprise Value - Net Debt - Preferred Stock - Minority Interest
+ Associate Companies. Also called market capitalization for public companies.

### Free Cash Flow to Firm (FCFF)
FCFF = EBIT * (1 - tax rate) + Depreciation & Amortization - Capital Expenditures
- Change in Net Working Capital. This is the cash flow available to all capital
providers (debt + equity) and is discounted at WACC in a DCF.

### Free Cash Flow to Equity (FCFE)
FCFE = Net Income + D&A - CapEx - Change in NWC + Net Borrowing. Cash flow
available only to equity holders, discounted at cost of equity. Used in FCFE
models and dividend discount models.

### IRR (Internal Rate of Return)
The discount rate at which NPV equals zero. Solved iteratively:
0 = sum of [CF_t / (1+IRR)^t] for all t. Decision rule: accept if IRR > WACC
(or required return). Limitations: assumes reinvestment at IRR, multiple IRRs
possible with non-conventional cash flows. MIRR addresses reinvestment assumption.

### NPV (Net Present Value)
NPV = sum of [CF_t / (1+r)^t] for t=0 to n. The gold standard for capital
budgeting decisions per Brealey/Myers/Allen. Decision rule: accept if NPV > 0.
NPV represents the value created above the required return.

### Terminal Value
The value of all cash flows beyond the explicit forecast period. Two methods:
(1) Gordon Growth: TV = FCF * (1+g) / (WACC - g);
(2) Exit Multiple: TV = EBITDA_terminal * EV/EBITDA_multiple.
Terminal value typically represents 60-80% of total enterprise value, requiring
careful assumption scrutiny.

### WACC (Weighted Average Cost of Capital)
WACC = (E/V) * R_e + (D/V) * R_d * (1 - T), where E = equity value, D = debt
value, V = E + D, R_e = cost of equity (CAPM), R_d = cost of debt, T = marginal
tax rate. The appropriate discount rate for FCFF in a DCF. Per Modigliani-Miller,
WACC is minimized at the optimal capital structure (with taxes).

---

## Fundraising and Venture Capital

### Anti-Dilution Protection
Mechanism protecting investors from down-round dilution. Full ratchet: conversion
price drops to new round price. Weighted average (broad-based): adjusted price =
(old price * old shares + new price * new shares) / (old shares + new shares).
Weighted average is standard; full ratchet is founder-unfriendly.

### Cap Table (Capitalization Table)
Complete record of a company's equity ownership showing all shareholders, share
classes, options, warrants, convertible instruments, and their fully diluted
percentages. Must reconcile to articles of incorporation and stock ledger.

### Convertible Note
Short-term debt that converts to equity at a future financing event.
Key terms: principal, interest rate (typically 2-8%), maturity (12-24 months),
valuation cap, discount rate (typically 15-25%). Conversion shares =
(principal + accrued interest) / min(cap price, discounted price).

### Dilution
Reduction in existing shareholders' percentage ownership due to new share
issuance. Dilution percentage = new shares / (pre-money shares + new shares).
Types: economic dilution (value per share decreases), percentage dilution
(ownership percentage decreases without necessarily reducing value per share if
shares are sold above current value).

### Liquidation Preference
The amount investors receive before common shareholders in a liquidity event.
1x non-participating: investors get max(1x investment, pro-rata share).
1x participating: investors get 1x investment PLUS pro-rata share of remainder.
Participating preferred with a cap: participation limited to specified multiple.

### Post-Money Valuation
Post-Money = Pre-Money + Investment Amount. Alternatively, Post-Money = Investment
Amount / Investor Ownership Percentage. If an investor puts in $5M for 20%,
post-money = $25M, pre-money = $20M.

### Pre-Money Valuation
The value of the company immediately before a financing round.
Pre-Money = Post-Money - Investment Amount. Pre-money determines the price per
share: PPS = Pre-Money / Pre-Money Fully Diluted Shares.

### SAFE (Simple Agreement for Future Equity)
Y Combinator standard instrument. Not debt (no interest, no maturity). Converts
to equity at next priced round. Key terms: valuation cap, discount (optional),
MFN (most favored nation) clause, pro-rata rights. Post-money SAFEs (2018+)
include the SAFE amount in the pre-money capitalization.

---

## FP&A and Operations

### Burn Rate
The rate at which a company spends cash in excess of revenue.
Gross burn = total monthly operating expenses.
Net burn = total monthly cash outflow minus cash inflow.
Net burn = Revenue - Total Expenses (negative means burning cash).

### CAC (Customer Acquisition Cost)
CAC = Total Sales and Marketing Spend / Number of New Customers Acquired.
Blended CAC includes all customers; paid CAC includes only paid channels.
Fully loaded CAC includes salaries of sales/marketing team.

### Contribution Margin
Revenue minus variable costs, expressed as a dollar amount or percentage.
Contribution Margin % = (Revenue - Variable Costs) / Revenue.
Used to determine break-even: Break-even Units = Fixed Costs / Contribution
Margin per Unit.

### LTV (Lifetime Value)
LTV = ARPU * Gross Margin % * (1 / Churn Rate). More sophisticated:
LTV = sum of [margin_t / (1+d)^t] for t=1 to expected lifetime.
Target: LTV/CAC > 3x for healthy unit economics.

### Runway
The number of months a company can operate before running out of cash.
Runway = Cash Balance / Net Monthly Burn Rate. Rule of thumb: raise when
6 months of runway remain. 18-24 months of runway post-raise is standard.

### Unit Economics
The revenue and costs associated with a single unit of the business model
(one customer, one transaction, one subscription). Healthy unit economics are
the foundation of scalable business models. Key metrics: CAC, LTV, LTV/CAC,
payback period, contribution margin.

---

## SaaS Metrics

### ARR (Annual Recurring Revenue)
ARR = MRR * 12. Only includes committed, recurring subscription revenue.
Excludes one-time fees, professional services, and usage-based overages
(unless contractually committed).

### Churn Rate
Logo churn = customers lost / customers at period start.
Revenue churn (gross) = MRR lost / MRR at period start.
Net revenue churn = (MRR lost - expansion MRR) / MRR at period start.
Negative net churn means expansion exceeds contraction -- the holy grail.

### MRR (Monthly Recurring Revenue)
MRR = sum of all active subscription revenue normalized to monthly.
Components: New MRR + Expansion MRR - Contraction MRR - Churned MRR = Net New MRR.

### NRR (Net Revenue Retention)
NRR = (Beginning MRR + Expansion - Contraction - Churn) / Beginning MRR.
Measured on a cohort basis (same customers). Best-in-class SaaS: NRR > 120%.
Median public SaaS: NRR approximately 110%.

### Rule of 40
Revenue Growth Rate (%) + EBITDA Margin (%) >= 40%. A heuristic for SaaS
company health that balances growth against profitability. Top-quartile public
SaaS companies score 50+.

### SaaS Magic Number
Magic Number = Net New ARR (quarterly) / Sales & Marketing Spend (prior quarter).
Interpretation: > 0.75 means sales efficiency is good (invest more), 0.5-0.75
is moderate, < 0.5 suggests inefficient spend.

---

## Tax and Entity Structure

### C-Corporation
Standard corporate entity. Subject to corporate income tax (21% federal rate
post-TCJA). Eligible for QSBS treatment under Section 1202. Required for VC
financing (preferred stock requires corporate structure).

### QSBS (Qualified Small Business Stock)
Section 1202 of the IRC. If held for 5+ years, excludes up to $10M (or 10x
basis) of capital gains from federal tax. Requirements: C-corp, gross assets
under $50M at issuance, active business (not services), stock acquired at
original issuance.

### R&D Tax Credit (Section 41)
Credit for qualified research expenditures (QREs). Four-part test: technological
in nature, elimination of uncertainty, process of experimentation, permitted
purpose. Startups (< $5M revenue, < 5 years) can apply up to $500K/year against
payroll taxes.

### Transfer Pricing
The pricing of transactions between related entities (e.g., parent and subsidiary
in different jurisdictions). Must follow arm's-length principle per IRC Section
482 and OECD Guidelines. Methods: comparable uncontrolled price, resale price,
cost plus, transactional net margin, profit split.

---

## M&A

### Accretion/Dilution
Analysis of whether an acquisition increases (accretive) or decreases (dilutive)
the acquirer's earnings per share. Accretive if target's P/E is lower than
acquirer's P/E (all-stock deal) or if target's earnings yield exceeds the
after-tax cost of debt (all-cash deal).

### Earnout
Contingent consideration in an acquisition tied to post-closing performance
milestones (typically revenue or EBITDA targets). Bridges valuation gaps between
buyer and seller. Accounting: fair value at close, re-measured each period
(ASC 805).

### Synergies
Value created by combining two entities beyond standalone values.
Revenue synergies: cross-selling, market access, pricing power (harder to realize).
Cost synergies: headcount reduction, facility consolidation, procurement savings
(more certain, typically realized within 12-24 months).

---

**All definitions in this glossary are authoritative within the Finance Brain.
When external usage differs, this glossary takes precedence for internal work.**

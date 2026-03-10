# Tax Strategy — Entity Structure, Credits, and Equity Tax Planning

## Overview

Tax strategy for startups encompasses entity selection, R&D tax credits, equity
compensation tax planning, and QSBS benefits that can save founders and employees
millions of dollars. Mistakes made at formation -- wrong entity type, missed 83(b)
elections, or ignored QSBS eligibility -- are often irreversible or extremely costly
to correct later. This module covers the key tax decisions at each company stage.

References: IRS Code Sections 41, 83, 409A, 1202, 1244. Feld & Mendelson
(Venture Deals), Wasserman (The Founder's Dilemmas), PwC/Deloitte startup tax
guides, Carta 409A documentation.

DISCLAIMER: This is educational content, not tax advice. Consult qualified tax
counsel for your specific situation.

---

## Entity Selection

### C-Corporation vs S-Corporation vs LLC

| Feature | C-Corp | S-Corp | LLC |
|---------|--------|--------|-----|
| Double taxation | Yes (corp + personal) | No (pass-through) | No (pass-through) |
| Investors | Unlimited, any type | Max 100, US only | Flexible |
| VC compatible | Yes (required) | No (structure issue) | Usually converts |
| Stock classes | Multiple (common, preferred) | Single class only | Membership units |
| QSBS eligible | Yes (Section 1202) | No | No |
| Self-employment tax | No (on salary only) | On reasonable salary | On all income |
| IPO ready | Yes | Must convert | Must convert |
| R&D tax credit | Yes (payroll offset) | Pass-through to owners | Pass-through |

### Why VCs Require C-Corps

1. **Multiple stock classes**: preferred stock requires C-Corp structure
2. **Unlimited shareholders**: S-Corps limited to 100
3. **Foreign investors**: S-Corps cannot have non-US shareholders
4. **QSBS benefits**: only available for C-Corp shareholders
5. **IPO readiness**: public companies are almost always C-Corps

### Delaware Incorporation

Standard practice: incorporate in Delaware, even if operating elsewhere.

```
Benefits:
  - Well-established corporate law (Court of Chancery)
  - Favorable precedent for VC deal structures
  - Fast filing and corporate governance processes
  - Investors and lawyers are familiar with DE law
  - No state tax on out-of-state income

Cost:
  - Delaware franchise tax: $400-$200K/year (based on shares)
  - Must also register as "foreign corporation" in operating state
  - Need registered agent in Delaware ($100-300/year)
```

---

## R&D Tax Credits (Section 41)

### Eligibility

The federal R&D tax credit applies to expenses for qualified research activities
that meet a 4-part test:

```
1. Permitted purpose: improve function, performance, reliability, quality
2. Technological uncertainty: outcome is uncertain at the start
3. Process of experimentation: systematic evaluation of alternatives
4. Technological in nature: relies on hard sciences or engineering

Qualifying activities (startups):
  - Software development (new features, architecture, algorithms)
  - Hardware prototyping
  - Process improvement through engineering
  - Data science / ML model development

NOT qualifying:
  - Market research
  - Routine testing / QA (unless novel methodology)
  - Adaptation of existing technology without uncertainty
  - Social science research
```

### Credit Calculation

**Regular Credit Method:**
```
Credit = 20% * (Current QREs - Base Amount)
Base Amount = Fixed Base % * Average Annual Gross Receipts (4 years)

For startups with < 4 years of gross receipts:
  Year 1-2: base = 0 (full QREs qualify)
  Year 3: base = 50% of Year 1 QREs
  Year 4: base = average of first 3 years
```

**Alternative Simplified Credit (ASC):**
```
Credit = 14% * (Current QREs - 50% of Average QREs over prior 3 years)
If no prior QREs: Credit = 6% * Current QREs
```

### Startup Payroll Tax Offset

Small businesses (< $5M gross receipts, < 5 years old) can apply the R&D
credit against payroll taxes instead of income taxes:

```
Maximum offset: $500,000/year against employer FICA (6.2%)
Inflation Reduction Act (2022): additional $250,000 against Medicare (1.45%)
Total maximum payroll tax offset: $500,000 FICA + $250,000 Medicare = $750,000

This is critical for pre-revenue startups that have no income tax liability.
```

### Qualifying Research Expenses (QREs)

```
Employee wages:     65% of time spent on qualifying R&D * salary
  (Engineers, data scientists, product managers involved in R&D)

Contractor costs:   65% of qualifying contractor payments
  (Only US-based contractors; foreign contractor expenses do not qualify)

Supplies:           100% of supplies consumed in R&D
  (Cloud computing costs are debated; AWS/GCP may qualify if for R&D)

Example calculation:
  5 engineers * $180K avg salary * 80% R&D time = $720K wages
  QREs from wages: $720K * 65% = $468K
  Contractor R&D: $100K * 65% = $65K
  Total QREs: $533K
  ASC credit (startup, no prior years): $533K * 6% = $32K
```

---

## 409A Valuations

### What Is a 409A Valuation?

Section 409A of the Internal Revenue Code requires that stock options be granted
at fair market value (FMV) to avoid adverse tax consequences. A 409A valuation
determines the FMV of common stock.

```
Consequences of below-FMV grants:
  - Employees: income tax + 20% penalty + interest on the spread at vesting
  - Company: withholding obligations
  - Both: retroactive tax liability from grant date

409A safe harbors:
  1. Independent appraisal (valid for 12 months or until material event)
  2. Written valuation by qualified person (startups < 10 years old)
  3. Binding formula (rarely used)
```

### When to Get a 409A

```
Required before any option grants
Update when:
  - 12 months have passed since last valuation
  - Material event occurred (fundraise, significant revenue change, acquisition)
  - Before each new round of option grants

Typical cost: $5K-$20K per valuation
Providers: Carta, Aranca, Scalar, Big 4 firms
```

### Common Stock Discount

409A valuations typically value common stock at a discount to the latest
preferred stock price:

```
Common stock discount factors:
  - Lack of marketability (DLOM): 20-40%
  - Liquidation preferences on preferred stock
  - Preferential rights (voting, board seats)
  - Company stage and risk profile

Example:
  Series A price: $5.00/share (preferred)
  409A FMV: $1.50/share (common)
  Discount: 70% (typical for early-stage)

As company matures and approaches IPO:
  Discount narrows: 50% -> 30% -> 10% -> 0% (at IPO)
```

---

## 83(b) Elections

### What Is an 83(b) Election?

When stock is subject to vesting (restricted stock), Section 83(b) allows the
recipient to pay income tax on the VALUE AT GRANT DATE rather than at vesting.

```
Without 83(b):
  Grant date:   1M shares at $0.001/share = $1,000 value
  Year 1 vest:  250K shares * current FMV $1.00 = $250,000 ordinary income
  Year 2 vest:  250K shares * current FMV $3.00 = $750,000 ordinary income
  ... tax on each vesting event at current FMV

With 83(b):
  Grant date:   1M shares at $0.001/share = $1,000 ordinary income (pay tax now)
  All subsequent appreciation taxed as LTCG when sold
  If FMV at sale is $10/share: $9,999,000 taxed at LTCG rate (23.8%)
  vs ordinary income rate (37%+)

Savings on $10M exit: ~$1.3M in federal tax alone
```

### Critical Rules

```
DEADLINE: File within 30 days of grant. NO EXCEPTIONS. NO EXTENSIONS.
  - File with IRS (mail to the service center where you file returns)
  - Provide copy to employer
  - Attach copy to personal tax return
  - Keep proof of mailing (certified mail recommended)

Risk: if the company fails and stock becomes worthless,
you paid tax on value that never materialized.
This risk is minimal when stock price is near zero (e.g., at founding).
```

---

## QSBS (Qualified Small Business Stock) — Section 1202

### The Benefit

Exclude up to the GREATER of:
- $10 million in capital gains, OR
- 10x the adjusted basis of the stock

from federal income tax when selling QSBS held for 5+ years.

```
Example:
  Founder purchased stock for $1,000 (basis)
  Sold 5 years later for $15,000,000
  Capital gain: $14,999,000

  QSBS exclusion: MAX($10M, 10 * $1,000) = $10M
  Taxable gain: $14,999,000 - $10,000,000 = $4,999,000
  Tax on excluded amount: $0
  Tax savings: $10M * 23.8% = $2,380,000
```

### Qualification Requirements

```
1. C-Corporation at all times stock is held
2. Gross assets < $50M at time of issuance (and all prior)
   (This includes the raise amount itself)
3. Active business requirement (>= 80% of assets in active business)
4. Excluded industries: professional services, banking, hospitality, farming
5. Stock acquired at original issuance (not secondary market)
6. Held for >= 5 years (Section 1202 holding period)
7. Stock issued after August 10, 1993
```

### QSBS Planning

```
Maximize QSBS by:
  - Each shareholder gets their own $10M exclusion
  - Gifting stock to family members multiplies exclusions
  - Converting SAFEs/notes early (to start the 5-year clock)
  - Ensuring company stays under $50M gross assets at issuance
  - Keeping compliant with active business test

Stacking example:
  Founder: $10M exclusion
  Spouse: $10M exclusion (if filing separately or community property)
  2 trusts for children: $10M each = $20M
  Total family exclusion: $40M at 0% federal tax
```

---

## International Tax Basics

### Transfer Pricing

When a US company has a foreign subsidiary, transactions between them must
be at arm's-length prices (as if between unrelated parties).

```
Common arrangements:
  - Cost-plus: foreign sub performs services at cost + margin (typically 8-15%)
  - Intercompany licensing: IP licensed to foreign sub for royalty
  - Buy-sell: foreign sub purchases products at arm's-length price

Documentation requirements (IRS, OECD):
  - Transfer pricing study (benchmark analysis)
  - Contemporaneous documentation
  - Country-by-country reporting (for large multinationals)
```

### Common International Structures

```
US HQ (C-Corp, Delaware)
    │
    ├── Ireland Ltd (EMEA operations, IP licensing)
    ├── Singapore Pte Ltd (APAC operations)
    └── UK Ltd (engineering center, cost-plus arrangement)
```

---

## Tax Calendar for Startups

```
Quarterly:
  - Estimated federal/state income tax payments (15th of month after quarter)
  - Payroll tax deposits (semi-weekly or monthly per IRS schedule)
  - State sales tax filings (where applicable)

Annual:
  - Corporate tax return (Form 1120): April 15 (or extension to October 15)
  - State tax returns: varies by state
  - 1099s to contractors: January 31
  - 409A valuation refresh: before granting new options
  - R&D credit study: with annual tax return

Event-Driven:
  - 83(b) election: within 30 days of restricted stock grant
  - 409A valuation: before any option grant
  - QSBS documentation: at each stock issuance
  - Fundraise: update 409A, check QSBS $50M threshold
```

---

## Production Checklist

- [ ] Entity structure selected (C-Corp for VC-backed) and documented
- [ ] Delaware incorporation completed with registered agent
- [ ] R&D tax credit study completed for prior year
- [ ] Payroll tax offset election filed (if qualifying startup)
- [ ] 409A valuation current (within 12 months or post-material event)
- [ ] 83(b) elections filed for all founders and early employees
- [ ] QSBS eligibility tracked (gross assets, active business test)
- [ ] Tax calendar set up with reminders for all deadlines
- [ ] Qualified tax counsel retained
- [ ] International structure evaluated (if applicable)

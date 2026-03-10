# Treasury — Cash Management, Venture Debt, and Risk Management

## Overview

Treasury management for startups focuses on preserving capital, optimizing cash
returns, managing risk, and leveraging non-dilutive financing. When a company has
raised millions in venture capital, the treasury function ensures that cash is
safe, accessible, earning yield where possible, and protected against operational
risks. This module covers cash management strategies, venture debt mechanics,
foreign exchange risk, working capital optimization, and insurance requirements.

References: Bragg (Treasury Management: The Practitioner's Guide), SVB/First
Republic startup banking guides, Kruze Consulting (Startup Finance), Western
Technology Investment (venture debt structures).

---

## Cash Management

### Cash Placement Strategy

```
Cash Tiers:
  Tier 1 (Operating): 2-3 months of burn
    Vehicle: Business checking account
    Yield: ~0.01-0.5%
    Liquidity: Immediate
    Purpose: Payroll, AP, daily operations

  Tier 2 (Reserve): 3-6 months of burn
    Vehicle: High-yield savings, money market
    Yield: 4-5% (rate environment dependent)
    Liquidity: Same day
    Purpose: Buffer against cash flow timing

  Tier 3 (Strategic): Remaining cash
    Vehicle: Treasury bills, CDs, sweep accounts
    Yield: 4-5%+
    Liquidity: Days to weeks (ladder maturities)
    Purpose: Maximize yield on excess cash

Example ($10M cash, $400K monthly burn):
  Tier 1: $1,200K in checking (3 months burn)
  Tier 2: $2,400K in HYS (6 months buffer)
  Tier 3: $6,400K in T-bills (laddered 1/3/6 month)
  Annual yield: ~$380K (vs ~$10K in checking alone)
```

### Cash Management Rules

1. **FDIC/SIPC coverage**: spread across multiple banks for > $250K
2. **Counterparty risk**: use only investment-grade institutions
3. **Investment policy**: no equities, no crypto, no illiquid instruments
4. **Board reporting**: monthly cash position in board package
5. **Signatory controls**: dual signatures above $50K
6. **Sweep accounts**: automatic overnight sweeps to money market

### Treasury Policy

```yaml
policy:
  name: Cash Investment Policy
  approved_by: Board of Directors
  effective_date: 2024-01-01

  objectives:
    - Preservation of principal (safety first)
    - Maintain liquidity for operational needs
    - Maximize yield within risk constraints

  permitted_investments:
    - US Treasury bills and notes (no limit)
    - FDIC-insured deposits (up to $250K per bank)
    - Money market funds (AAA rated)
    - Corporate bonds (AA- or higher, < 12 month maturity)
    - Certificates of deposit (FDIC insured)

  prohibited_investments:
    - Equities and equity funds
    - Cryptocurrency
    - Derivatives (unless hedging FX)
    - Investments rated below AA-
    - Maturities > 18 months

  concentration_limits:
    - No more than $5M at any single bank (excluding sweep)
    - No more than 25% in any single issuer (ex-Treasury)

  reporting:
    - Monthly: cash position and yield report to CFO
    - Quarterly: investment portfolio review with board
```

---

## Venture Debt

### What Is Venture Debt?

Non-dilutive financing provided to VC-backed companies, typically structured
as a term loan with warrants. It extends runway without additional equity dilution.

### When to Use Venture Debt

```
Good use cases:
  - Extend runway by 3-6 months post-equity raise
  - Finance specific capital expenditures (equipment, buildout)
  - Bridge to a known milestone (revenue target, new product launch)
  - Working capital for seasonal businesses

Bad use cases:
  - Substitute for equity when you cannot raise
  - Fund operating losses without a path to profitability
  - Company has no VC backing (no debt covenant protection)
```

### Venture Debt Terms

```
Typical structure:
  Amount:           20-35% of last equity raise
  Interest rate:    Prime + 2-5% (or 8-14% fixed)
  Maturity:         36-48 months
  Amortization:     Interest-only period (6-12 months), then straight-line
  Warrants:         0.25-1.0% of fully diluted equity
  Covenants:        Minimum cash, revenue milestones (lighter than bank debt)
  Prepayment:       1-3% fee in first year, declining thereafter

Example:
  Last equity raise: $20M Series B
  Venture debt: $6M (30% of raise)
  Rate: 10% fixed
  Term: 36 months (12 months IO, 24 months amortization)
  Warrants: 0.5% of equity

  Monthly payments:
    Months 1-12: $50K (interest only: $6M * 10% / 12)
    Months 13-36: $300K (principal + interest, declining interest)
  Total interest cost: ~$1.2M
  Warrant dilution: 0.5% of equity

  Effective cost of capital: much lower than equity dilution
```

### Venture Debt Providers

| Provider | Type | Typical Size |
|----------|------|-------------|
| Silicon Valley Bank (SVB) | Bank | $2-30M |
| Western Technology Investment | Specialty | $5-50M |
| Hercules Capital | BDC | $10-100M |
| Trinity Capital | BDC | $5-75M |
| Horizon Technology Finance | BDC | $5-30M |
| HSBC Innovation Banking | Bank | $5-50M |

### Covenant Monitoring

```
Typical financial covenants:
  1. Minimum cash balance: $[X]M (often 3-6 months of payments)
  2. Minimum ARR or revenue: $[X]M (milestone-based)
  3. Maximum monthly burn: $[X]K
  4. Reporting: monthly financials within 30 days of close

Covenant breach consequences:
  - Warning / cure period (typically 30 days)
  - Increased interest rate
  - Acceleration of repayment (worst case)
  - Default (triggers cross-default on other debt)

Prevention:
  - Model covenants into cash flow forecast
  - Set internal triggers at 80% of covenant threshold
  - Proactive communication with lender if at risk
```

---

## Foreign Exchange (FX) Risk

### Types of FX Exposure

```
Transaction risk:
  Revenue invoiced in EUR, expenses in USD
  If EUR depreciates, USD revenue decreases

Translation risk:
  Foreign subsidiary financials converted to USD
  Affects consolidated financial statements

Economic risk:
  Long-term competitiveness affected by currency movements
  Harder to hedge, requires strategic response
```

### FX Hedging Strategies

| Strategy | Instrument | Complexity | Cost |
|----------|-----------|-----------|------|
| Natural hedge | Match currency of revenue and expenses | Low | None |
| Forward contracts | Lock in exchange rate for future date | Medium | Bid-ask spread |
| Options | Right (not obligation) to exchange at rate | Medium | Premium |
| Netting | Offset receivables and payables in same currency | Low | None |
| Currency accounts | Hold balances in multiple currencies | Low | Account fees |

### When to Hedge

```
Hedge when:
  - FX revenue > 20% of total
  - Single currency exposure > $1M quarterly
  - Volatility of the currency pair > 10% annualized
  - Budget has tight margins sensitive to FX

Do not hedge when:
  - FX exposure is immaterial (< 5% of revenue)
  - Natural hedge exists (matched revenues and costs)
  - Cost of hedging exceeds expected loss
```

---

## Working Capital Management

### Working Capital Formula

```
Working Capital = Current Assets - Current Liabilities
NWC = Accounts Receivable + Inventory - Accounts Payable - Deferred Revenue

Cash Conversion Cycle (CCC):
  CCC = DSO + DIO - DPO

  DSO (Days Sales Outstanding) = AR / (Revenue / 365)
  DIO (Days Inventory Outstanding) = Inventory / (COGS / 365)
  DPO (Days Payable Outstanding) = AP / (COGS / 365)

  Lower CCC = less cash tied up in operations
  Negative CCC (SaaS) = customers pay before you deliver (prepaid annual)
```

### SaaS Working Capital Advantage

```
SaaS with annual prepay:
  Customer pays $120K upfront
  Revenue recognized: $10K/month
  Deferred revenue (liability): $110K at month 1

  Cash is received BEFORE service is delivered
  Working capital is NEGATIVE (favorable)
  The company funds growth with customer prepayments
```

### Optimizing Working Capital

| Lever | Action | Impact |
|-------|--------|--------|
| DSO reduction | Tighter payment terms, auto-billing | Faster cash collection |
| DPO extension | Negotiate longer payment terms with vendors | Slower cash outflow |
| Prepaid annual | Offer discount for annual upfront payment | Negative CCC |
| Invoice promptly | Invoice on contract signing, not delivery | Earlier clock starts |
| Collections | Automated AR follow-up, dunning | Reduce bad debt |

---

## Insurance

### Required Insurance for Startups

| Policy | Coverage | Typical Cost | When Required |
|--------|---------|-------------|---------------|
| D&O (Directors & Officers) | Protects board/officers from lawsuits | $5-30K/year | At first outside board member |
| E&O (Errors & Omissions) | Professional liability, software errors | $3-15K/year | Enterprise customer contracts |
| Cyber liability | Data breach costs, notification, legal | $3-20K/year | SOC 2, enterprise contracts |
| General liability | Property damage, bodily injury | $1-5K/year | Office lease requirement |
| Workers compensation | Employee work-related injuries | State-mandated | First employee |
| EPLI (Employment Practices) | Wrongful termination, discrimination | $3-15K/year | > 10 employees |
| Key person | Death/disability of founder(s) | $1-5K/year | Investor requirement |

### D&O Insurance Deep Dive

```
Coverage structure:
  Side A: Protects individual directors/officers when company cannot indemnify
  Side B: Reimburses company for indemnifying directors/officers
  Side C: "Entity coverage" for securities claims against the company

Typical limits:
  Seed stage: $2-5M
  Series A: $5-10M
  Series B+: $10-20M
  Pre-IPO: $20-50M+

When to increase:
  - After each fundraise (more money = higher target)
  - Before IPO (dramatically increase, "IPO tail" coverage)
  - When joining regulated industries
```

---

## Production Checklist

- [ ] Cash placement strategy defined (3 tiers) and implemented
- [ ] Treasury policy approved by board
- [ ] Cash distributed across multiple FDIC-insured banks
- [ ] Venture debt evaluated (if appropriate for stage)
- [ ] Debt covenants monitored in cash flow forecast
- [ ] FX exposure assessed and hedging strategy defined
- [ ] Working capital metrics tracked monthly (DSO, DPO, CCC)
- [ ] Insurance portfolio reviewed annually with broker
- [ ] D&O insurance adequate for current stage
- [ ] Cash position reported monthly to board

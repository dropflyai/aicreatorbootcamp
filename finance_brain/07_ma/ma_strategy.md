# M&A Strategy — Valuation, Due Diligence, and Integration

## Overview

Mergers and acquisitions (M&A) allow companies to accelerate growth through
inorganic means -- acquiring technology, talent, customers, or market share that
would take years to build organically. This module covers M&A rationale and
strategic fit assessment, the three primary valuation methodologies (DCF,
comparable companies, precedent transactions), synergy analysis, the due
diligence process, integration planning, and earnout structures.

References: Rosenbaum & Pearl (Investment Banking: Valuation, LBOs, M&A, and IPOs),
DePamphilis (Mergers, Acquisitions, and Other Restructuring Activities),
McKinsey (Valuation: Measuring and Managing Value), Harvard Business Review
(M&A Integration articles).

---

## M&A Rationale

### Strategic Drivers

| Driver | Description | Example |
|--------|-----------|---------|
| Technology | Acquire capabilities faster than building | Stripe acquiring Paystack |
| Talent (acqui-hire) | Acquire skilled teams in tight markets | Google acquiring DeepMind |
| Market share | Consolidate fragmented market | Salesforce acquiring Slack |
| Customer base | Cross-sell to acquired customers | HubSpot acquiring Hustle |
| Geographic expansion | Enter new markets rapidly | Uber acquiring Careem |
| Defensive | Prevent competitor from acquiring | Facebook acquiring Instagram |
| Revenue synergies | Combine products for higher ARPU | Twilio acquiring SendGrid |
| Cost synergies | Eliminate redundancies | Dell acquiring EMC |

### Build vs Buy vs Partner Framework

```
                    Build           Buy             Partner
─────────────────────────────────────────────────────────────
Time to market      12-24 months    3-6 months      1-3 months
Control             Full            Full            Shared
Cost                Lower upfront   High upfront    Lowest upfront
Risk                Execution       Integration     Dependency
IP ownership        Full            Full            Shared/none
Cultural fit        Organic         Forced          Minimal
Reversibility       Moderate        Difficult       Easy
─────────────────────────────────────────────────────────────

Decision factors:
  Buy when: speed matters, talent is scarce, technology is complex
  Build when: core competency, differentiation, no good targets
  Partner when: non-core, testing market, risk reduction
```

---

## Valuation Methods

### 1. Discounted Cash Flow (DCF)

Intrinsic value based on projected future cash flows.

```
Enterprise Value = SUM_{t=1}^{n} FCF_t / (1+WACC)^t + TV / (1+WACC)^n

Terminal Value (Gordon Growth):
  TV = FCF_n * (1+g) / (WACC - g)

Terminal Value (Exit Multiple):
  TV = EBITDA_n * Exit_Multiple

FCF = EBIT * (1-Tax) + D&A - CapEx - Change in NWC
```

### 2. Comparable Company Analysis (Trading Comps)

Value based on how similar public companies are valued.

```
Steps:
1. Select comparable companies (same industry, size, growth)
2. Calculate valuation multiples:
   EV/Revenue, EV/EBITDA, EV/ARR, P/E

3. Apply multiples to target's metrics:
   Target EV = Target EBITDA * Median EV/EBITDA of comps

Example:
  Comparable SaaS companies trade at 10x NTM Revenue
  Target's NTM Revenue: $20M
  Implied EV: $200M

Common SaaS multiples:
  EV/NTM Revenue: 5-15x (varies with growth rate)
  EV/ARR: 8-20x (high-growth SaaS)
  Rule of 40 adjusted: companies above Rule of 40 command premium
```

### 3. Precedent Transaction Analysis (Deal Comps)

Value based on prices paid in comparable M&A transactions.

```
Steps:
1. Identify comparable transactions (same industry, size, timeframe)
2. Calculate transaction multiples:
   EV/Revenue, EV/EBITDA at time of deal

3. Apply to target:
   Target EV = Target Revenue * Median EV/Revenue of deals

Key differences from trading comps:
  - Includes control premium (typically 20-40% over trading price)
  - Reflects strategic value and synergies
  - Limited by data availability and recency
```

### Valuation Summary (Football Field)

```
Method               Low        Mid        High
──────────────────────────────────────────────────
DCF                  $150M      $200M      $280M
Trading Comps        $160M      $220M      $300M
Precedent Txns       $180M      $250M      $340M
──────────────────────────────────────────────────
Blended Range:       $170M      $220M      $300M

Offer range:         $200M-$250M (supported by all methods)
```

---

## Synergy Analysis

### Revenue Synergies

```
Types:
  Cross-selling: sell target's products to acquirer's customers
  Upselling: combined product commands higher price
  Market access: target's distribution channels for acquirer's products
  Reduced churn: combined offering is stickier

Quantification:
  Cross-sell revenue = Acquirer customers * adoption rate * target ARPU
  Example: 10,000 customers * 15% adoption * $500/year = $750K incremental ARR

Timeline: 12-36 months to realize (revenue synergies are slow)
Discount: apply 50% haircut in valuation (high execution risk)
```

### Cost Synergies

```
Types:
  Headcount reduction: eliminate duplicate roles (HR, finance, legal)
  Technology consolidation: single platform instead of two
  Vendor negotiation: combined purchasing power
  Facility consolidation: close redundant offices

Quantification:
  Headcount savings = duplicated roles * avg fully loaded cost
  Example: 15 roles * $200K = $3M annual savings

Timeline: 6-18 months to realize (cost synergies are faster)
One-time costs: severance, integration expenses, system migration
Discount: apply 25% haircut (more certain than revenue synergies)
```

### Net Synergy Calculation

```
Annual revenue synergies:     $750K (50% haircut applied)
Annual cost synergies:        $2.25M (25% haircut applied)
Total annual synergies:       $3.0M

One-time integration costs:   ($1.5M)
Annual ongoing integration:   ($200K)

Net synergy (Year 1):        $1.3M
Net synergy (Year 2+):       $2.8M

Synergy multiple at 10x:     $28M (added to standalone valuation)
Allocation: acquirer keeps 60%, target captures 40% in price
```

---

## Due Diligence

### Due Diligence Streams

| Stream | Key Items | Red Flags |
|--------|----------|-----------|
| Financial | Revenue quality, COGS, burn, projections | Aggressive rev rec, unusual adjustments |
| Legal | Contracts, IP ownership, litigation, compliance | Pending lawsuits, IP disputes |
| Technology | Architecture, tech debt, security, scalability | Monolithic legacy code, no tests |
| Commercial | Customer concentration, pipeline, churn | Top 3 customers > 50% revenue |
| People | Key person risk, retention, culture | Key employees planning to leave |
| Tax | Entity structure, NOLs, transfer pricing | Unpaid taxes, IRS audit pending |
| Regulatory | Industry compliance, licenses, permits | Non-compliance, missing permits |

### Financial Due Diligence Detail

```
Revenue quality analysis:
  - Revenue by customer (concentration risk)
  - Revenue by product line (sustainability)
  - Recurring vs one-time revenue mix
  - Contract analysis: terms, renewals, cancellations
  - Revenue recognition policy compliance (ASC 606)
  - Monthly revenue bridge: new + expansion - churn

EBITDA normalization:
  Reported EBITDA:                    $2.0M
  + One-time restructuring:          +$500K
  + Founder excess compensation:     +$300K
  + Non-recurring legal fees:        +$200K
  - Below-market rent (related party): -$100K
  = Adjusted EBITDA:                  $2.9M

Net working capital:
  - Analyze trends in AR, AP, deferred revenue
  - Identify required NWC for operations
  - Agree on target NWC for closing adjustment
```

### Technology Due Diligence

```
Assessment areas:
  Architecture:
    - Monolith vs microservices
    - Cloud vs on-premise
    - Database technology and scalability
    - API design and documentation

  Code quality:
    - Test coverage %
    - Code review practices
    - Technical debt quantification
    - Security vulnerabilities (SAST/DAST results)

  Team:
    - Key technical dependencies (bus factor)
    - Documentation quality
    - DevOps maturity (CI/CD, monitoring)
    - Open source compliance (licenses)

  Scalability:
    - Current scale (users, requests, data)
    - Bottlenecks at 10x current scale
    - Infrastructure cost scaling curve
```

---

## Earnouts

### Structure

An earnout ties a portion of the purchase price to post-acquisition performance.

```
Total consideration: $100M
  Upfront cash: $70M
  Earnout: up to $30M over 2 years

Earnout triggers:
  Year 1: $15M if ARR reaches $25M (currently $18M)
  Year 2: $15M if ARR reaches $35M

Key terms:
  - Measurement period: how long and when
  - Metric: revenue, EBITDA, milestones, or customer metrics
  - Accounting treatment: consistent with pre-acquisition practices
  - Operating autonomy: seller needs independence to hit targets
  - Acceleration: what happens if acquirer's actions prevent target achievement
```

### Earnout Risks

| Risk | For Seller | For Buyer |
|------|-----------|----------|
| Operational interference | Buyer changes go-to-market, hurting targets | Seller resists necessary integration |
| Metric manipulation | Buyer reduces marketing spend | Seller pulls revenue forward |
| Key person departure | Founders leave, no one to drive targets | Knowledge loss |
| Accounting disputes | Different interpretations of "revenue" | Costly arbitration |

---

## Integration Planning

### 100-Day Integration Plan

```
Day 1-30: Stabilize
  - Communicate to all employees (both companies)
  - Retain key talent (retention bonuses, clarity on roles)
  - Customer communication (no service disruption)
  - IT integration: email, access, basic systems
  - Legal: close remaining deal items

Day 31-60: Align
  - Organizational structure finalized
  - Combined product roadmap drafted
  - Sales and marketing integration plan
  - Technology integration assessment and plan
  - Finance: combined reporting, chart of accounts

Day 61-100: Execute
  - Begin technology integration
  - Cross-selling motions launched
  - Redundancy elimination (if planned)
  - Cultural integration activities
  - First combined operating review
```

### Integration Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Key employee retention | > 90% at 12 months | HR tracking |
| Customer retention | > 95% at 12 months | Churn analysis |
| Revenue synergy | $[X]K within 12 months | Financial tracking |
| Cost synergy | $[X]K within 6 months | Budget tracking |
| System integration | Complete by month 6 | Project milestones |
| Employee satisfaction | > 70% favorable | Survey at 90 days |

---

## Production Checklist

- [ ] Strategic rationale documented (build vs buy vs partner)
- [ ] Valuation completed with 3 methods (DCF, comps, precedents)
- [ ] Synergy analysis quantified with haircuts applied
- [ ] Due diligence completed across all streams
- [ ] Earnout terms structured with clear metrics and protections
- [ ] Integration plan drafted with 100-day milestones
- [ ] Key person retention strategy defined
- [ ] Customer communication plan prepared
- [ ] Legal and regulatory approvals timeline mapped
- [ ] Integration success metrics defined and tracking started

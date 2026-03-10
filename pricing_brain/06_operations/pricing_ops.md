# Pricing Operations — CPQ, Deal Desk, Billing, and Revenue Recognition

## Overview

Pricing operations is the infrastructure that translates pricing strategy into executed
transactions. The best pricing strategy in the world is worthless if the systems, processes,
and controls that implement it are broken. This module covers Configure-Price-Quote (CPQ)
systems, deal desk operations, discount governance and approval workflows, promotional
pricing mechanics, billing configuration (including proration, upgrades, and dunning),
international pricing and currency management, and revenue recognition implications of
pricing decisions. Pricing operations is where strategy meets the general ledger.

---

## 1. Configure-Price-Quote (CPQ) Systems

### CPQ Architecture

```
CPQ SYSTEM COMPONENTS:

  CONFIGURE:
    Product catalog:    All SKUs, plans, tiers, add-ons defined
    Rules engine:       Valid combinations, dependencies, exclusions
    Guided selling:     Recommend products based on customer needs
    Custom bundles:     Assemble bespoke packages from catalog

  PRICE:
    List price:         Base prices from pricing strategy
    Discount rules:     Automated discount application by criteria
    Volume pricing:     Tiered/volume discounts calculated automatically
    Contract pricing:   Customer-specific negotiated rates
    Currency:           Multi-currency conversion and rounding
    Approval routing:   Discounts above threshold trigger approvals

  QUOTE:
    Document generation: Professional quote/proposal PDF
    E-signature:        DocuSign/Adobe Sign integration
    Version control:    Quote revisions tracked
    Expiration:         Auto-expire quotes after N days
    CRM sync:          Quote data flows back to opportunity

CPQ PLATFORMS:
  Salesforce CPQ (Steelbrick):  Best for Salesforce-native orgs
  DealHub:                      Strong guided selling, visual quotes
  PandaDoc:                     Document-centric, SMB-friendly
  Zuora CPQ:                    Subscription-first CPQ
  Custom-built:                 Only for unique pricing models
```

### CPQ Implementation Considerations

```
PRODUCT CATALOG DESIGN:

  HIERARCHY:
    Product Family → Product → Plan → Add-On → Feature Flag

  EXAMPLE:
    Family:   DropFly Platform
    Product:  DropFly Core
    Plans:    Starter ($29), Pro ($79), Business ($199)
    Add-Ons:  Premium Support ($49), API Access ($29), SSO ($19)
    Flags:    Custom branding (Pro+), Audit logs (Business only)

  RULES:
    Inclusion:   "Pro plan includes API Access"
    Exclusion:   "Starter cannot add SSO"
    Dependency:  "Premium Support requires Pro or higher"
    Minimum:     "Business plan minimum 10 seats"

PRICING RULES ENGINE:

  Rule Type        Example                          Priority
  ----------------------------------------------------------------
  List price       Base price from catalog           1 (lowest)
  Volume discount  10% off for 100+ seats            2
  Contract rate    Customer-specific negotiated       3
  Promotional      20% off first year                 4
  Manual discount  Sales rep applied 15%              5 (highest)

  CONFLICT RESOLUTION:
    Highest priority rule wins
    Discounts do NOT stack unless explicitly configured
    Manual discounts require approval workflow
```

---

## 2. Deal Desk Operations

### Deal Desk Function

```
DEAL DESK PURPOSE:
  Centralized team that reviews, approves, and structures non-standard deals.
  Acts as the bridge between sales, finance, legal, and pricing.

DEAL DESK SCOPE:
  Standard deals:    Self-serve or sales-assisted; no desk involvement
  Non-standard:      Custom pricing, deep discounts, custom terms → Desk reviews
  Strategic:         Large enterprise, multi-year, co-marketing → Desk structures

DEAL DESK TEAM:
  Deal Desk Manager:     Owns process, final approval authority
  Deal Desk Analyst:     Reviews financials, models deal economics
  Legal Liaison:         Reviews non-standard contract terms
  Revenue Accountant:    Reviews rev rec implications

DEAL FLOW:
  1. Sales rep submits deal for review (CRM workflow)
  2. Deal Desk Analyst reviews: discount depth, margin, contract terms
  3. If within authority: Analyst approves
  4. If above authority: Routes to Manager → VP Sales → CRO
  5. If non-standard terms: Legal review in parallel
  6. If rev rec concerns: Revenue Accountant review
  7. Approved deal returns to sales rep for customer execution
  8. Deal terms flow to billing system for implementation

DEAL DESK SLAs:
  Standard review:    4-hour turnaround
  Complex review:     24-hour turnaround
  Quarter-end surge:  2-hour turnaround (pre-approved escalation)
```

### Deal Economics Analysis

```
DEAL EVALUATION FRAMEWORK:

  REVENUE ANALYSIS:
    ACV (Annual Contract Value):     Total annual recurring revenue
    TCV (Total Contract Value):      ACV * contract length
    ARPU impact:                     Does this deal raise or lower ARPU?
    Discount from list:              Actual discount percentage

  MARGIN ANALYSIS:
    Gross margin:                    Revenue - COGS for this deal
    Contribution margin:             Revenue - variable costs
    Blended margin:                  Weighted average across all components

  STRATEGIC VALUE:
    Logo value:                      Brand name worth acquisition cost?
    Expansion potential:             Can this grow 2-3x over 3 years?
    Reference value:                 Will customer be a reference/case study?
    Competitive displacement:        Taking share from competitor?

  DEAL SCORING (1-5 each, total /20):
    Financial attractiveness:        [ ]
    Strategic value:                 [ ]
    Implementation feasibility:      [ ]
    Risk (inverse: lower risk = higher score): [ ]

    16-20: APPROVE — strong deal
    12-15: CONDITIONAL — approve with modifications
    8-11:  CAUTION — requires VP+ approval
    <8:    DECLINE — does not meet thresholds
```

---

## 3. Discount Governance

### Approval Workflow

```
DISCOUNT AUTHORITY MATRIX:

  Discount %    Approver            Documentation Required
  ────────────────────────────────────────────────────────
  0-10%         Sales Rep           Standard deal notes
  11-15%        Sales Manager       Written justification
  16-20%        Director of Sales   Business case + competitive intel
  21-30%        VP Sales            Full business case + deal desk review
  31-40%        CRO                 Strategic justification + CFO awareness
  >40%          CEO + CFO           Board-level strategic deal

APPROVAL WORKFLOW:
  1. Rep enters discount in CPQ
  2. System checks discount against authority matrix
  3. If within authority: Auto-approved, logged
  4. If above authority: Routed to next approver
  5. Approver receives notification with deal context
  6. Approver approves, rejects, or modifies
  7. Decision logged with timestamp and rationale
  8. If rejected: Rep can appeal one level up (once only)

GUARDRAILS:
  - Maximum discount cap: 40% (no exceptions below CEO)
  - No retroactive discounts (cannot discount after signature)
  - No stacking: promotional + volume + negotiated do not combine
  - Sunset clause: All discounts expire at renewal unless renewed
  - Audit trail: Every discount logged with approver, reason, date
```

### Promotional Pricing

```
PROMOTIONAL PRICING TYPES:

  TYPE 1: TIME-LIMITED DISCOUNT
    "20% off for first 3 months"
    Implementation: Coupon code in billing system
    Revenue: Deferred discount; full price after promotion
    Risk: Customer churns when promotion ends

  TYPE 2: LAUNCH PRICING
    "Introductory rate of $29/month (regular $49)"
    Implementation: Separate promotional plan in catalog
    Revenue: Below steady-state; increases at promotion end
    Risk: Customer anchors on launch price; resists increase

  TYPE 3: SEASONAL/EVENT
    "Black Friday: 50% off annual plans"
    Implementation: Limited-window coupon
    Revenue: Spike during event; full price for remainder
    Risk: Customers wait for next event to purchase

  TYPE 4: REFERRAL/PARTNER
    "Get 2 months free when referred by a partner"
    Implementation: Partner-specific pricing or credits
    Revenue: Acquisition cost offset by LTV
    Risk: Abuse if referral tracking is weak

PROMOTIONAL GOVERNANCE:
  - All promotions require Finance approval (rev rec impact)
  - Maximum promotional discount: 50% (consumer); 30% (B2B)
  - Duration limits: 1-6 months for time-limited; no permanent promos
  - Track promotional revenue separately from organic revenue
  - Post-promotion churn analysis required within 60 days
```

---

## 4. Billing Configuration

### Billing System Architecture

```
BILLING SYSTEM COMPONENTS:

  SUBSCRIPTION MANAGEMENT:
    Plan assignment:    Customer → Plan → Add-Ons
    Billing cycle:      Monthly, annual, custom
    Proration:          Upgrade/downgrade mid-cycle handling
    Seat management:    Add/remove seats with billing impact

  INVOICING:
    Invoice generation:  Automated at billing cycle start/end
    Line items:          Plan fee + seats + usage + add-ons
    Tax calculation:     Jurisdiction-based tax (Avalara, TaxJar)
    PDF generation:      Professional invoice document

  PAYMENT COLLECTION:
    Credit card:         Stripe, Braintree auto-charge
    ACH/wire:           Enterprise invoice payment (net-30/60/90)
    Dunning:            Failed payment retry and recovery

  REVENUE REPORTING:
    MRR tracking:       Monthly recurring revenue by customer
    ARR tracking:       Annual recurring revenue
    Revenue waterfall:  New, expansion, contraction, churn

BILLING PLATFORMS:
  Stripe Billing:      Best for PLG/self-serve; developer-friendly
  Chargebee:           Strong for B2B SaaS; dunning/retention
  Zuora:               Enterprise-grade; complex pricing models
  Recurly:             Mid-market; strong dunning and analytics
  Maxio (SaaSOptics):  Revenue recognition focused
```

### Proration Logic

```
PRORATION SCENARIOS:

  UPGRADE MID-CYCLE:
    Day 15 of 30-day cycle, customer upgrades $49 → $99
    Remaining days: 15
    Credit for old plan: $49 * (15/30) = $24.50
    Charge for new plan: $99 * (15/30) = $49.50
    Net charge: $49.50 - $24.50 = $25.00
    Next full cycle: $99

  DOWNGRADE MID-CYCLE:
    Option A (Immediate): Credit issued; lower plan starts now
    Option B (End of cycle): Current plan continues; lower plan at renewal
    Recommendation: Option B (prevents gaming; simpler billing)

  SEAT ADDITION:
    Day 10 of 30-day cycle, add 5 seats at $15/seat
    Remaining days: 20
    Prorated charge: 5 * $15 * (20/30) = $50.00
    Next full cycle: Original + (5 * $15) added

  SEAT REMOVAL:
    Effective at end of current billing cycle (no mid-cycle removal)
    No credit for unused portion of current cycle
    Next cycle reflects reduced seat count

BILLING EDGE CASES:
  - Free trial → paid: No proration; first full cycle starts
  - Annual → monthly: Transition at annual renewal only
  - Currency change: Not supported mid-contract; change at renewal
  - Plan discontinuation: Grandfather existing; migrate at renewal
```

### Dunning Management

```
DUNNING SEQUENCE (Failed Payment Recovery):

  DAY 0: PAYMENT FAILS
    Action: Retry payment immediately (transient failures)
    Notification: None (no customer alarm for retry)

  DAY 1: SECOND RETRY
    Action: Retry with updated card info (if available)
    Notification: Email — "We had trouble processing your payment"
    Tone: Helpful, not alarming

  DAY 3: THIRD RETRY
    Action: Retry payment
    Notification: Email + in-app banner — "Please update your payment method"
    Include: Direct link to update payment

  DAY 7: FOURTH RETRY
    Action: Retry payment
    Notification: Email — "Your account may be interrupted"
    Tone: Urgent but supportive

  DAY 14: FINAL RETRY
    Action: Last retry attempt
    Notification: Email — "Last chance to update payment"
    Include: Account will be downgraded/paused in 48 hours

  DAY 16: ACCOUNT ACTION
    Action: Downgrade to free tier (if available) or pause account
    Notification: Email — "Your account has been paused"
    Data: Preserved for 90 days
    Recovery: Update payment to instantly reactivate

  DAY 90: DATA RETENTION LIMIT
    Action: Account data eligible for deletion
    Notification: Email — "Your data will be deleted in 30 days"
    Final opportunity to reactivate

DUNNING METRICS:
  Recovery rate target: 60-80% of failed payments recovered
  Average days to recover: 3-7 days
  Involuntary churn from failed payments: 1-3% of MRR monthly
```

---

## 5. International Pricing

### Multi-Currency Strategy

```
INTERNATIONAL PRICING APPROACHES:

  APPROACH 1: SINGLE CURRENCY (USD)
    All customers pay in USD regardless of location
    Pro: Simplest; no currency risk
    Con: Friction for non-US buyers; perceived as non-local
    Best for: Early-stage, primarily US customer base

  APPROACH 2: LOCALIZED DISPLAY, SINGLE SETTLEMENT
    Show prices in local currency; settle in USD
    Customer sees EUR/GBP/etc. on pricing page
    Actual charge in USD (or converted at checkout)
    Pro: Feels local; moderate complexity
    Con: Exchange rate fluctuation risk for customer

  APPROACH 3: FULL MULTI-CURRENCY
    Price, charge, and settle in local currencies
    Separate price points per currency (not just conversion)
    Pro: Best customer experience; true local pricing
    Con: Complex; requires multi-currency billing + accounting

CURRENCY PRIORITIZATION:
  Tier 1 (Day 1):   USD
  Tier 2 (Scale):   EUR, GBP, CAD, AUD
  Tier 3 (Growth):  JPY, BRL, INR, MXN
  Tier 4 (Mature):  All remaining major currencies
```

### Purchasing Power Parity (PPP)

```
PPP PRICING:

  CONCEPT:
    Adjust prices based on local purchasing power
    A customer in India should not pay the same as one in the US
    $49/month may be affordable in US but prohibitive in India

  PPP DISCOUNT TIERS:
    Tier 1 (Full price):     US, UK, Germany, Australia, Japan
    Tier 2 (20% discount):   Spain, Italy, South Korea, Israel
    Tier 3 (40% discount):   Brazil, Mexico, Turkey, Poland
    Tier 4 (60% discount):   India, Indonesia, Philippines, Nigeria

  IMPLEMENTATION:
    Detect country via IP geolocation (Cloudflare, MaxMind)
    Display adjusted price on pricing page
    Apply discount at checkout via region-specific coupon
    Prevent abuse: Require payment method from qualifying country

  REVENUE IMPACT:
    Lower ARPU per customer in PPP regions
    BUT: Higher conversion rate (more affordable)
    Net effect: Usually positive (more customers at lower price)
    Monitor: Revenue per region, conversion by PPP tier
```

---

## 6. Revenue Recognition Implications

### ASC 606 Overview for Pricing

```
ASC 606 FIVE-STEP MODEL:

  Step 1: Identify the contract
  Step 2: Identify performance obligations
  Step 3: Determine the transaction price
  Step 4: Allocate the transaction price
  Step 5: Recognize revenue as obligations are satisfied

PRICING DECISIONS THAT AFFECT REV REC:

  MULTI-YEAR CONTRACTS:
    Revenue recognized ratably over contract term
    $120K 3-year contract = $40K/year = $3,333/month recognized
    NOT $120K recognized at signing

  BUNDLED PRODUCTS:
    Each product = separate performance obligation
    Allocate total price to each based on standalone selling price
    If Product A standalone = $50 and B = $50, but bundle = $80:
      A gets $40 recognized, B gets $40 recognized

  PROFESSIONAL SERVICES + SUBSCRIPTION:
    Services = separate obligation (recognized as delivered)
    Subscription = separate obligation (recognized ratably)
    Cannot front-load subscription revenue to services period

  DISCOUNTS:
    Allocated proportionally across performance obligations
    20% discount on bundle: each component discounted 20%
    Unless evidence shows discount relates to specific component

  FREE PERIODS:
    "3 months free on annual plan" = total price spread over 12 months
    Revenue per month = Annual price / 12 (not $0 for 3 then full for 9)

PRICING TEAM RESPONSIBILITY:
  - Consult Finance before creating new pricing structures
  - Document standalone selling prices for all components
  - Ensure promotional pricing has clear start/end dates
  - Track bundle vs individual pricing for allocation purposes
```

---

## 7. Pricing Operations Metrics

### Operational Health Dashboard

```
PRICING OPS METRICS:

  DEAL VELOCITY:
    Average time from quote to close:    Target <14 days
    Deal desk review turnaround:         Target <4 hours
    Approval bottleneck rate:            Target <5% of deals delayed

  DISCOUNT HEALTH:
    Average discount depth:              Target <15%
    Discount frequency:                  Target <40% of deals discounted
    Discount compliance rate:            Target >95% within authority
    Exception rate:                      Target <5% requiring override

  BILLING HEALTH:
    Invoice accuracy rate:               Target >99.5%
    Dunning recovery rate:               Target >70%
    Involuntary churn rate:              Target <2% of MRR
    Payment failure rate:                Target <5% of charges

  OPERATIONAL EFFICIENCY:
    Quote generation time:               Target <30 minutes
    Pricing change deployment time:      Target <24 hours
    New product pricing setup time:      Target <1 week
    International pricing update cycle:  Target quarterly
```

---

## References

1. FASB ASC 606 (2014). "Revenue from Contracts with Customers."
2. Zuora (2024). "The Subscription Economy Index."
3. Salesforce (2024). "CPQ Best Practices Guide."
4. Simon, H. (2015). "Confessions of the Pricing Man."
5. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing."
6. ProfitWell/Paddle (2023). "The Complete Guide to SaaS Billing."

---

**This document is authoritative for pricing operations within the Pricing Brain.**

# SaaS Pricing Models — Per-Seat, Usage, Tiered, Freemium, and Hybrid

## Overview

SaaS pricing models define the structural mechanism by which customers are charged for
software access. The choice of pricing model determines how revenue scales with customer
growth, what expansion revenue looks like, how customers perceive value, and how
competitive the offering is in market. This module covers all major SaaS pricing models:
per-seat, per-usage (metered), tiered flat-rate, freemium, reverse trial, hybrid, value
metric selection, enterprise pricing, and annual vs. monthly billing structures.

---

## 1. SaaS Pricing Model Taxonomy

### Model Overview

| Model | How Customer Pays | Revenue Scaling | Best For |
|-------|------------------|----------------|----------|
| **Per-Seat** | Per user per month | Linear with headcount | Collaboration tools, CRM, PM |
| **Usage-Based** | Per unit consumed | With consumption | API, infrastructure, communication |
| **Tiered Flat-Rate** | Fixed monthly fee per tier | Step function at tier upgrade | Simple SaaS, fixed-scope tools |
| **Freemium** | Free tier + paid upgrades | Conversion rate * ARPU | Consumer, PLG, network effects |
| **Reverse Trial** | Full features → downgrade | Retention after trial | Products with strong "aha" moments |
| **Hybrid** | Base + per-seat + usage | Multiple expansion vectors | Complex platforms, multi-product |
| **Enterprise** | Custom negotiated | Deal-by-deal | Large organizations, complex needs |

---

## 2. Per-Seat Pricing

### Mechanics

```
FORMULA:
  Monthly Revenue = Number of Seats * Price per Seat per Month

  EXAMPLE:
    Plan: $15/user/month
    Customer has 50 users
    Monthly revenue: $15 * 50 = $750/month ($9,000/year)
    Customer adds 20 users → $15 * 70 = $1,050/month ($12,600/year)
    Expansion: +40% revenue without any upsell conversation
```

### Per-Seat Variants

| Variant | Description | Example |
|---------|------------|---------|
| **Named seats** | Each user has a dedicated license | Salesforce, Jira |
| **Concurrent seats** | N users can be online simultaneously | Legacy software |
| **Seat types** | Different prices for different user roles | Zendesk (agents vs. light agents) |
| **Seat ranges** | Price based on range (1-10, 11-50, 51-100) | Many mid-market SaaS |

### Per-Seat Pricing Strategy

```
SEAT PRICING CONSIDERATIONS:

  1. VOLUME DISCOUNTS
     Flat rate: $15/seat regardless of count
     Tiered: $15/seat for 1-10, $12 for 11-50, $10 for 51+
     Which to use: Tiered if you want enterprise adoption; flat if simple

  2. MINIMUM SEATS
     "Minimum 5 seats on Pro plan"
     Prevents gaming (one seat at high tier, rest at free)
     Ensures minimum contract value

  3. SEAT EXPANSION MECHANICS
     Auto-add: New users automatically added, billed at next invoice
     Manual: Admin must purchase seats before assigning
     Overage: Charged per extra seat above purchased count
     Recommendation: Auto-add with notification (lowest friction)

  4. SEAT REMOVAL
     Immediate: Seat removed, credit issued (generous but cash flow risk)
     End of period: Seat removed at end of billing cycle (standard)
     Annual lock: Cannot reduce seats during annual contract (enterprise)
```

---

## 3. Usage-Based (Metered) Pricing

### Mechanics

```
FORMULA:
  Monthly Revenue = Units Consumed * Price per Unit

  EXAMPLES:
    API calls:     1M calls * $0.001/call = $1,000/month
    Messages:      50K messages * $0.005/msg = $250/month
    Storage:       500GB * $0.023/GB = $11.50/month
    Compute:       1000 hours * $0.10/hour = $100/month
    Transactions:  10K transactions * $0.25/txn = $2,500/month
```

### Usage-Based Pricing Design

```
USAGE PRICING STRUCTURES:

  PAY-AS-YOU-GO:
    No commitment; pay only for what you use
    Example: AWS Lambda — $0.20 per 1M invocations
    Pro: Lowest barrier; scales perfectly
    Con: Unpredictable revenue; customer cost anxiety

  COMMITTED USE:
    Commit to a usage level for discount
    Example: AWS Savings Plans — commit to $X/hour for 1 or 3 years
    Pro: Predictable revenue; customer gets discount
    Con: Customer risk of over/under-committing

  TIERED USAGE:
    Price per unit decreases at higher tiers
    Example: Twilio — $0.0075/SMS for first 1M, $0.0050 above
    Pro: Rewards growth; encourages volume
    Con: More complex to understand

  INCLUDED ALLOWANCE + OVERAGE:
    Base plan includes N units; overage charged per unit
    Example: $49/month includes 10K API calls; $0.005 per additional
    Pro: Predictable base cost; usage flexibility
    Con: "Bill shock" if overage is unexpected
```

### Usage Metric Selection

```
IDEAL USAGE METRIC CRITERIA:

  ✓ SCALES WITH VALUE: More usage = more value to customer
  ✓ MEASURABLE: You can accurately track it
  ✓ PREDICTABLE: Customer can forecast their usage
  ✓ CONTROLLABLE: Customer can influence their consumption
  ✓ UNDERSTANDABLE: Customer knows what the unit means

EVALUATION MATRIX:

  Metric        Value-Aligned  Predictable  Understandable  Score
  ─────────────────────────────────────────────────────────────────
  API calls     High           Medium       High            8/10
  Active users  High           High         High            9/10
  Storage (GB)  Medium         High         High            8/10
  Events/msgs   High           Medium       High            8/10
  Compute hours Medium         Low          Medium          5/10
  Revenue ($)   Very High      Medium       High            9/10
```

---

## 4. Tiered Flat-Rate Pricing

### Mechanics

```
FORMULA:
  Monthly Revenue = Plan Price (fixed per tier)

  EXAMPLE:
    Starter:  $29/month (5 users, 10GB, basic features)
    Pro:      $79/month (25 users, 50GB, all features)
    Business: $199/month (100 users, 200GB, all features + priority)

  Revenue expansion: Only through tier upgrades (step function)
  No automatic expansion as customer grows within a tier
```

### When Flat-Rate Works

```
FLAT-RATE IS BEST WHEN:
  - Product value doesn't scale linearly with usage
  - Simplicity is a competitive advantage
  - Target customers prefer predictable costs
  - Product is feature-differentiated (not usage-differentiated)
  - Market is consumer or prosumer (B2C, very small business)

FLAT-RATE LIMITATIONS:
  - Revenue ceiling per tier (no expansion within tier)
  - Large customers subsidized by small customers
  - No natural upgrade trigger until limits are hit
  - May leave money on table for heavy users
```

---

## 5. Freemium Model

### Freemium Design

```
FREEMIUM COMPONENTS:

  FREE TIER:
    Purpose: Acquisition, product-led growth, viral distribution
    Features: Core value proposition; enough to be useful alone
    Limits: Constrained (users, storage, features, records)
    Support: Self-service only (KB, community)
    Cost target: <$1/free user/month

  PAID TIERS:
    Trigger: Free user hits a growth limit or needs premium features
    Conversion target: 2-5% (consumer), 5-15% (B2B)
    Time to convert: 15-60 days average
```

### Freemium vs. Free Trial Decision

```
CHOOSE FREEMIUM WHEN:
  - Product has network effects (more users = more value)
  - Marginal cost per free user is very low
  - Viral loops exist (user invites others)
  - Product-led growth is the go-to-market strategy
  - Value compounds over time (more data, more history)

CHOOSE FREE TRIAL WHEN:
  - Product value is clear in a short time period
  - Product is expensive to provision per user
  - Enterprise or high-ACV sale (free trial → sales conversation)
  - Product requires configuration/setup investment
  - No natural viral loop

CHOOSE REVERSE TRIAL WHEN:
  - Product "aha" moment requires premium features
  - Traditional freemium conversion rates are low
  - You want users to experience the full product before deciding
  - Product has strong loss aversion potential
```

---

## 6. Reverse Trial

### Mechanics

```
REVERSE TRIAL FLOW:

  Day 0:  User signs up → Full premium access (all features)
  Day 1-14: User experiences the complete product
            Builds workflows, invites team, configures integrations
  Day 14: Trial ends
            Option A: Subscribe to paid plan (keep everything)
            Option B: Downgrade to free tier (lose premium features)

  PSYCHOLOGY:
    Standard trial: "Try it and decide if you want to pay"
    Reverse trial: "You already have it; decide if you want to keep it"

    Reverse trial leverages:
      - Endowment effect (they "own" the premium features)
      - Loss aversion (downgrading feels like losing something)
      - Status quo bias (continuing is easier than changing)
```

### Reverse Trial Metrics

```
KEY METRICS:

  Trial start rate:        What % of signups start the trial?
  Feature adoption:        What premium features do trial users activate?
  Trial-to-paid conversion: What % convert to paid at trial end?
  Trial-to-free conversion: What % downgrade to free?
  Time to conversion:      When during the trial do they decide?
  Feature that drives conversion: Which premium feature is the trigger?

BENCHMARKS:
  Reverse trial conversion: 15-30% (vs 5-15% for standard freemium)
  Higher because: Loss aversion is stronger than gain motivation
```

---

## 7. Hybrid Pricing

### Combining Models

```
HYBRID PRICING = Base Fee + Per-Seat + Usage + Add-Ons

EXAMPLE (Complex SaaS Platform):

  BASE FEE:      $99/month (platform access, up to 5 users)
  PER-SEAT:      $10/user/month beyond 5 users
  USAGE:         $0.001/API call beyond 50K/month
  ADD-ONS:       Premium support: $49/month
                 Advanced analytics: $29/month
                 SSO: $19/month

  Customer A (small team, light usage):
    Base: $99 + 0 extra seats + 0 API overage = $99/month

  Customer B (medium team, moderate usage):
    Base: $99 + 15 extra seats ($150) + 100K extra calls ($100)
    = $349/month

  Customer C (large team, heavy usage, all add-ons):
    Base: $99 + 95 extra seats ($950) + 500K extra calls ($500)
    + Premium support ($49) + Analytics ($29) + SSO ($19)
    = $1,646/month
```

### Hybrid Pricing Advantages

```
  ✓ Multiple expansion vectors (seats, usage, add-ons)
  ✓ Revenue scales with customer value received
  ✓ Low entry price (base only) reduces friction
  ✓ Natural upsell moments throughout customer lifecycle
  ✓ Captures value from diverse customer segments

HYBRID PRICING RISKS:
  ✗ Complexity: Harder for customer to predict total cost
  ✗ Bill shock: Unexpected usage charges damage trust
  ✗ Sales friction: Complex pricing requires more explanation
  ✗ Billing complexity: Systems must handle multiple charge types

MITIGATION:
  - Provide cost calculator on pricing page
  - Send usage alerts before overage charges
  - Offer committed usage discounts for predictability
  - Default to annual with included usage for enterprise
```

---

## 8. Enterprise Pricing

### Enterprise Pricing Characteristics

```
ENTERPRISE PRICING:

  Pricing model:    Custom (negotiated per deal)
  Pricing page:     "Contact Sales" (no public price)
  Contract:         Annual or multi-year
  Billing:          Invoice (net-30/60/90), not credit card
  Negotiation:      Procurement, legal, security review
  Components:       Base platform + seats + usage + support SLA + services

  WHY "CONTACT SALES":
    1. Every enterprise has unique requirements (one size does not fit all)
    2. Deal size justifies sales team involvement ($50K+ ACV)
    3. Price discrimination: Each customer pays based on their value/WTP
    4. Procurement expects negotiation (fixed pricing feels wrong to them)
    5. Includes non-standard items (SLA, custom terms, security addenda)
```

### Enterprise Deal Structure

```
ENTERPRISE DEAL COMPONENTS:

  Platform License:     $X/year (base access fee)
  User Licenses:        $Y/user/year (volume discounted)
  Usage Commitment:     $Z/year for committed usage level
  Premium Support:      $W/year (dedicated support, SLA)
  Professional Services: $V one-time (implementation, migration, training)
  Custom Development:   $U (if applicable)

  TOTAL ANNUAL CONTRACT VALUE (ACV):
    = Platform + (Users * Per-User) + Usage + Support + Services

  TYPICAL ENTERPRISE DISCOUNT STRUCTURE:
    Standard list price:        $100K/year
    Volume discount (100+ users): -10%
    Multi-year commitment (3yr):  -15%
    Strategic partnership:        -5%
    Final negotiated price:       $70K/year

  DISCOUNT GOVERNANCE:
    Sales rep authority: Up to 10% off list
    Sales manager: Up to 20% off list
    VP Sales: Up to 30% off list
    C-level: Up to 40% off list (with business case)
    >40%: Requires CEO approval + strategic justification
```

---

## 9. Annual vs. Monthly Billing

### Billing Comparison

| Attribute | Monthly | Annual |
|-----------|---------|--------|
| Price | Higher per month | Lower per month (discount) |
| Commitment | Low (cancel anytime) | High (12-month lock) |
| Cash flow | Monthly (predictable but lower) | Upfront (better cash flow) |
| Churn risk | Higher (monthly decision point) | Lower (fewer decision points) |
| Customer preference | Uncertain buyers, small budgets | Committed buyers, larger orgs |
| Typical discount | -- | 15-25% off monthly equivalent |

### Annual Pricing Strategy

```
ANNUAL BILLING INCENTIVE STRUCTURE:

  Monthly price:   $49/month ($588/year)
  Annual price:    $39/month ($468/year)
  Savings:         $120/year (20% discount)

  DISPLAY:
    ✓ Show monthly equivalent: "$39/mo billed annually"
    ✓ Show savings: "Save $120/year (20%)"
    ✓ Default to annual in UI (preselected toggle)
    ✓ Monthly available but not highlighted

  FINANCIAL IMPACT:
    Monthly customer LTV:   $588 * (1/monthly churn rate)
    Annual customer LTV:    $468 * (1/annual churn rate)
    Even with 20% discount, annual LTV is usually higher because
    annual churn rate is significantly lower than 12x monthly churn rate
```

---

## 10. Pricing Model Selection Framework

### Decision Matrix

```
SELECTION CRITERIA:

  1. How does customer value scale?
     Linearly with users → Per-seat
     With consumption → Usage-based
     With features → Tiered flat-rate
     Multiple dimensions → Hybrid

  2. What does the customer expect?
     Market convention matters: CRM = per-seat, cloud = usage, etc.
     Going against convention requires strong justification

  3. What drives expansion revenue?
     Headcount growth → Per-seat
     Increased usage → Usage-based
     New capabilities → Feature upsell
     All of the above → Hybrid

  4. What is the go-to-market?
     Product-led growth → Freemium or reverse trial
     Sales-led growth → Tiered with enterprise custom
     Both → Freemium + sales for enterprise

  5. What is the ACV range?
     <$500/year: Self-serve, simple pricing (flat-rate or per-seat)
     $500-$50K: Self-serve + sales-assisted, tiered or hybrid
     >$50K: Sales-led, enterprise custom pricing
```

---

## References

1. OpenView Partners (2024). "SaaS Pricing Benchmarks."
2. ProfitWell/Paddle (2023). "The State of SaaS Pricing."
3. Zuora (2024). "The Subscription Economy Index."
4. Ramanujam, M., & Tacke, G. (2016). "Monetizing Innovation."
5. Kyle Poyar, OpenView (2024). "Usage-Based Pricing Playbook."
6. Bessemer Venture Partners (2024). "Cloud Index: SaaS Metrics."

---

**This document is authoritative for SaaS pricing models within the Pricing Brain.**

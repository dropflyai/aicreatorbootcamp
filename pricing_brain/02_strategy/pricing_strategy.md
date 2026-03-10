# Pricing Strategy — Cost-Plus, Competitive, Value-Based, and Dynamic

## Overview

Pricing strategy determines the approach an organization uses to set and manage prices.
The choice of strategy depends on market position, competitive landscape, differentiation
level, customer base, and organizational maturity. This module covers the four primary
pricing strategies (cost-plus, competitive, value-based, and dynamic), sources of
pricing power, market entry strategies (penetration vs. skimming), and pricing lifecycle
management as products mature.

---

## 1. The Four Pricing Strategies

### Strategy Comparison

| Strategy | Price Based On | Best When | Risk |
|----------|---------------|-----------|------|
| **Cost-Plus** | Internal costs + markup | Commodity, regulated, or cost-predictable | Ignores customer value; may leave money on table |
| **Competitive** | Competitor prices | Crowded market, low differentiation | Race to bottom; no pricing power |
| **Value-Based** | Customer perceived value | Differentiated product; strong value prop | Requires deep customer understanding |
| **Dynamic** | Real-time demand/supply | Perishable inventory, variable demand | Customer fairness perception risk |

---

## 2. Cost-Plus Pricing

### The Model

```
COST-PLUS FORMULA:
  Price = Total Cost * (1 + Markup %)

  Where Total Cost = Fixed Costs (allocated per unit) + Variable Costs

EXAMPLE (SaaS):
  Fixed costs: $500K/year (engineering, infrastructure, G&A)
  Target customers: 1,000
  Cost per customer: $500/year
  Target markup: 3x (200% margin)
  Price: $500 * 3 = $1,500/year = $125/month
```

### When Cost-Plus Works

| Scenario | Why Cost-Plus Fits |
|----------|--------------------|
| Regulated industries (defense, utilities) | Margins are capped by regulation |
| Custom services (consulting, agency) | Each project has unique costs |
| Manufacturing with high COGS | Costs are the primary constraint |
| Internal transfer pricing | Need a "fair" price between divisions |
| Cost-plus government contracts | Required by procurement rules |

### When Cost-Plus Fails

```
FAILURE IN SOFTWARE / SAAS:

  Problem: Marginal cost of software is ~$0
  Cost-plus price for 100 customers: $125/month
  Cost-plus price for 10,000 customers: $1.25/month

  The price should NOT decrease as you scale (unless costs decrease
  proportionally). This is because:
    1. Customer willingness to pay is unchanged by your costs
    2. Value delivered is unchanged by your costs
    3. Pricing should capture value, not reflect costs

  RULE: Never use cost-plus for software unless regulatory or
  contractual requirements demand it.
```

---

## 3. Competitive Pricing

### The Model

```
COMPETITIVE PRICING:
  Price = f(Competitor Prices, Your Relative Position)

POSITIONING OPTIONS:
  Price Leader:     Price below all competitors
  Price Parity:     Match competitor prices
  Price Premium:    Price above competitors (must justify with value)
  Price Follower:   Set price relative to market leader
```

### Competitive Price Mapping

```
COMPETITIVE PRICING MAP:

  Feature       CompA ($49)   CompB ($79)   You ($??)   CompC ($129)
  ─────────────────────────────────────────────────────────────────
  Users         5             10            15          25
  Storage       5GB           25GB          50GB        100GB
  Integrations  3             10            15          25
  Support       Email         Email+Chat    Email+Chat  Full
  API           No            Yes           Yes         Yes
  Uptime SLA    99%           99.5%         99.9%       99.9%

  Analysis:
    Your features most closely match CompB ($79) and exceed them
    in users and storage. CompC ($129) has more integrations and
    full support. Recommended range: $79-$109.
```

### Competitive Strategy Framework

| Your Position | Strategy | Rationale |
|--------------|----------|-----------|
| **Market leader** | Price premium (10-20% above followers) | Brand, features, and trust justify premium |
| **Strong challenger** | Price parity or slight premium | Match leader on price; compete on specific advantages |
| **Disruptor** | Aggressive undercut (30-50% below leader) | Win share with price; differentiate on specific value |
| **Niche specialist** | Premium for niche; competitive for broader market | Niche customers pay for specialized value |
| **Commodity** | Match market or slightly below | No differentiation; compete on price and convenience |

### Competitive Pricing Pitfalls

```
PITFALL 1: RACE TO THE BOTTOM
  CompA drops price → CompB matches → CompA drops again → ...
  Result: All margins erode; nobody wins
  Prevention: Differentiate on value; never compete solely on price

PITFALL 2: ANCHORING TO THE WRONG COMPETITOR
  If your product serves a different segment or use case,
  competitor prices may be irrelevant reference points
  Prevention: Anchor pricing to value delivered, not competitor list

PITFALL 3: FOLLOWING WITHOUT UNDERSTANDING
  Competitors may have different cost structures, strategies, or
  may be mispricing their own product
  Prevention: Competitive data informs but does not determine your price
```

---

## 4. Value-Based Pricing

### The Model

```
VALUE-BASED PRICING:
  Price = f(Customer Perceived Value, Willingness to Pay)

FRAMEWORK:
  1. Quantify the value your product creates for the customer
  2. Determine the next-best alternative (NBA) and its price
  3. Calculate your differentiation value over the NBA
  4. Price = NBA Price + Differentiation Value * Capture Rate

  Where Capture Rate is typically 20-40% (you share value with customer)
```

### Why Value-Based Is Superior for SaaS

```
COST-PLUS PROBLEM:
  Your SaaS costs $50/customer/year to deliver.
  Cost-plus 3x = $150/year.
  But it saves the customer $10,000/year in labor costs.
  You are leaving $9,850 in value on the table.

VALUE-BASED APPROACH:
  Value to customer: $10,000/year in labor savings
  Capture rate: 20-30%
  Price: $2,000-3,000/year
  Result: 13-20x improvement over cost-plus pricing
  Customer still saves $7,000-8,000 (happy!)
  You capture 20-30x your costs (profitable!)
```

### Value Quantification Framework

```
ECONOMIC VALUE ESTIMATION (EVE):

  STEP 1: Identify the customer's current state (without your product)
    Current cost of doing the job manually or with alternatives
    Current time spent on the task
    Current error rate and cost of errors
    Current opportunity cost

  STEP 2: Identify the future state (with your product)
    Reduced cost (labor, tools, errors)
    Reduced time
    Increased revenue (if applicable)
    Reduced risk

  STEP 3: Calculate the delta
    Economic Value = Future State Value - Current State Value

  STEP 4: Set price as a fraction of value
    Price = Economic Value * Capture Rate (20-40%)
```

---

## 5. Dynamic Pricing

### The Model

```
DYNAMIC PRICING:
  Price varies based on real-time demand, supply, timing, or customer segment

MECHANISMS:
  Time-based:     Prices change by time of day, day of week, season
  Demand-based:   Prices increase when demand is high
  Inventory-based: Prices change based on remaining capacity
  Segment-based:  Different prices for different customer segments
  Algorithmic:    ML model continuously optimizes price
```

### Dynamic Pricing in SaaS / Digital

```
WHERE DYNAMIC PRICING WORKS IN SAAS:

  Usage-based pricing:
    Price per API call, per GB stored, per compute hour
    Price is dynamic by nature (varies with consumption)

  Promotional pricing:
    Limited-time offers tied to events (Black Friday, end of quarter)
    Creates urgency without permanent price change

  Geographic pricing:
    Different prices by country based on purchasing power parity
    Spotify: $9.99/month in US, $1.58/month in India

  Cohort pricing:
    Early adopters get one price; later cohorts get different price
    Grandfather existing customers at old rate

  NOT RECOMMENDED for most SaaS:
    Demand-based surge pricing (B2B customers expect price stability)
    Algorithmic per-visitor pricing (trust violation if discovered)
```

---

## 6. Pricing Power Sources

### What Creates Pricing Power

Pricing power is the ability to raise prices without losing significant volume.

```
SOURCES OF PRICING POWER:

  1. SWITCHING COSTS (strongest)
     Data lock-in, workflow dependency, integration complexity
     Example: Salesforce (years of CRM data, custom config)

  2. NETWORK EFFECTS
     Product becomes more valuable as more people use it
     Example: Slack (team communication requires the team)

  3. BRAND / TRUST
     Customers pay premium for trusted brands
     Example: Apple (premium pricing sustained by brand loyalty)

  4. UNIQUE CAPABILITIES
     Features or technology no competitor can match
     Example: Palantir (unique data platform)

  5. REGULATORY / COMPLIANCE
     Product required for compliance; alternatives limited
     Example: SOC 2 compliance tools in regulated industries

  6. INTELLECTUAL PROPERTY
     Patents, proprietary algorithms, unique data sets
     Example: Bloomberg Terminal (proprietary financial data)

PRICING POWER TEST:
  "If we raised prices 10% tomorrow, what % of customers would churn?"
    <5% churn: Strong pricing power
    5-15% churn: Moderate pricing power
    >15% churn: Weak pricing power
```

---

## 7. Market Entry Pricing Strategies

### Penetration Pricing

```
STRATEGY: Enter with low price to maximize adoption rapidly

MECHANICS:
  Set price below competitor / below perceived value
  Acquire maximum market share
  Build switching costs and network effects
  Raise prices once established

WHEN TO USE:
  - Market with strong network effects (need critical mass)
  - Commoditized market (price is key differentiator)
  - Land-and-expand model (low price now, upsell later)
  - Market where switching costs build over time

RISKS:
  - Sets low price anchor (hard to raise later)
  - Attracts price-sensitive customers who churn at price increase
  - May signal low quality (price-quality inference)
  - May trigger competitive price war

EXAMPLES:
  - Zoom: Free tier + aggressive low pricing disrupted WebEx/Skype
  - Slack: Generous free tier to build critical mass
  - Amazon Web Services: Low prices to build market share, then leverage
```

### Price Skimming

```
STRATEGY: Enter with high price targeting early adopters, lower over time

MECHANICS:
  Set price high for early adopters (highest WTP)
  Gradually lower price to capture next segment
  Each price reduction expands addressable market

WHEN TO USE:
  - Innovative product with no direct competitor
  - Early adopters have significantly higher WTP
  - Technology costs decline over time (hardware, compute)
  - Clear product differentiation that justifies premium

RISKS:
  - High price attracts competitors who undercut
  - Slow adoption may fail to achieve critical mass
  - Early customers feel cheated when price drops

EXAMPLES:
  - Apple iPhone: Launched at $599, systematically reduced
  - Tesla: Started with $100K+ Roadster, now has $25K model
  - SaaS: Enterprise-first pricing, then mid-market, then SMB
```

---

## 8. Pricing Lifecycle

### Product-Market Fit Stage

```
PRICING CHARACTERISTICS:
  - Willingness to pay is uncertain
  - Customer base is small (<100 customers)
  - Product is evolving rapidly
  - GOAL: Learn about WTP, not optimize revenue

RECOMMENDED APPROACH:
  - Simple pricing (1-2 plans)
  - Talk to every customer about pricing (qualitative WTP research)
  - Price based on value hypothesis, iterate based on feedback
  - Annual deals to lock in early revenue + reduce churn
  - Offer discounts for testimonials, case studies, feedback
```

### Growth Stage

```
PRICING CHARACTERISTICS:
  - Product-market fit achieved
  - Customer base growing rapidly
  - Competitive landscape forming
  - GOAL: Capture market share while maintaining healthy margins

RECOMMENDED APPROACH:
  - Good-Better-Best packaging (3 tiers)
  - Usage-based components to capture expansion revenue
  - Formal WTP research (Van Westendorp, conjoint)
  - Annual/monthly pricing with annual discount
  - Pricing page optimization
  - Begin tracking pricing metrics (ARPU, conversion, expansion)
```

### Maturity Stage

```
PRICING CHARACTERISTICS:
  - Market is established; competitive dynamics stable
  - Customer base is large and segmented
  - Growth is slowing; focus shifts to expansion revenue
  - GOAL: Maximize revenue per customer while defending market share

RECOMMENDED APPROACH:
  - Sophisticated packaging (multiple tiers + add-ons)
  - Value-metric alignment (pricing tied to value delivered)
  - Regular price increases (annual, below JND)
  - Enterprise pricing with custom deals
  - Pricing governance and deal desk
  - Advanced analytics (elasticity measurement, churn by price point)
```

### Decline / Pivot Stage

```
PRICING CHARACTERISTICS:
  - Market shrinking or product being replaced
  - Customer base declining
  - GOAL: Extract remaining value while managing sunset

RECOMMENDED APPROACH:
  - Grandfather loyal customers on existing pricing
  - Reduce investment in pricing optimization
  - Migration incentives to successor product (if applicable)
  - End-of-life pricing: Do not raise prices on declining product
```

---

## References

1. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing." Routledge.
2. Ramanujam, M., & Tacke, G. (2016). "Monetizing Innovation." Wiley.
3. Simon, H. (2015). "Confessions of the Pricing Man." Copernicus.
4. Dolan, R., & Simon, H. (1996). "Power Pricing." Free Press.
5. Shapiro, C., & Varian, H. (1999). "Information Rules." HBS Press.
6. Baker, W. et al. (2010). "The Price Advantage." Wiley.

---

**This document is authoritative for pricing strategy within the Pricing Brain.**

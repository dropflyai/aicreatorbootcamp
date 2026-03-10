# Pricing Theory — Elasticity, Discrimination, Behavioral Pricing

## Overview

Pricing theory provides the microeconomic and behavioral science foundations that
govern all pricing decisions. This module covers classical price theory (elasticity,
supply and demand, surplus analysis, price discrimination) and behavioral pricing
(anchoring, decoy effects, endowment, reference prices, prospect theory, and the
Weber-Fechner law). Every pricing strategy, experiment, and optimization in subsequent
modules derives from the principles documented here.

---

## 1. Price Elasticity of Demand

### Definition

Price elasticity of demand (PED) measures how responsive quantity demanded is to a
change in price. It is the most fundamental concept in pricing theory.

```
PED = (% Change in Quantity Demanded) / (% Change in Price)

E = (dQ/Q) / (dP/P) = (dQ/dP) * (P/Q)

Where:
  Q = Quantity demanded
  P = Price
  dQ = Change in quantity
  dP = Change in price
```

### Elasticity Categories

| Elasticity | |E| Value | Interpretation | Pricing Implication |
|-----------|-----------|---------------|---------------------|
| **Perfectly Inelastic** | 0 | Quantity unchanged by price | Rare; life-saving drugs, absolute necessities |
| **Inelastic** | 0 < |E| < 1 | Quantity changes less than price | Price increase = revenue increase |
| **Unit Elastic** | 1 | Quantity changes proportionally to price | Revenue unchanged by price change |
| **Elastic** | |E| > 1 | Quantity changes more than price | Price decrease = revenue increase |
| **Perfectly Elastic** | Infinity | Any price increase = zero demand | Pure commodity; identical substitutes |

### Determinants of Elasticity

| Factor | More Elastic When | More Inelastic When |
|--------|------------------|---------------------|
| **Substitutes** | Many substitutes available | Few or no substitutes |
| **Necessity** | Product is a luxury/discretionary | Product is essential |
| **Budget share** | Large % of buyer's budget | Small % of buyer's budget |
| **Time horizon** | Long run (buyers can adjust) | Short run (locked in) |
| **Switching costs** | Low switching costs | High switching costs |
| **Differentiation** | Commodity, undifferentiated | Unique, highly differentiated |
| **Information** | Buyers can easily compare prices | Price comparison is difficult |

### Revenue Optimization Using Elasticity

```
REVENUE = Price * Quantity

If demand is INELASTIC (|E| < 1):
  Raising price → Revenue INCREASES
  (% revenue gain from higher price > % revenue loss from lower volume)

If demand is ELASTIC (|E| > 1):
  Lowering price → Revenue INCREASES
  (% revenue gain from higher volume > % revenue loss from lower price)

Optimal price: Where marginal revenue = marginal cost
  MR = P * (1 + 1/E)
  Set MR = MC → P = MC / (1 + 1/E)

  This is the Lerner Index pricing rule.
```

---

## 2. Cross-Price Elasticity

### Definition

Cross-price elasticity measures how the quantity demanded of one product changes when
the price of another product changes.

```
Cross-PED = (% Change in Quantity of Good A) / (% Change in Price of Good B)
```

### Interpretation

| Cross-PED | Relationship | Example |
|-----------|-------------|---------|
| Positive | Substitutes | If Competitor raises price, your demand increases |
| Zero | Unrelated | Price of milk does not affect demand for SaaS |
| Negative | Complements | If laptop prices rise, laptop case demand falls |

### Strategic Implications

```
HIGH POSITIVE CROSS-ELASTICITY (close substitutes):
  - Competitive pricing matters enormously
  - Price wars are dangerous; differentiate on value instead
  - Monitor competitor pricing continuously

HIGH NEGATIVE CROSS-ELASTICITY (strong complements):
  - Bundle the products for higher combined value
  - Price the platform low; monetize the complement (razor/blades)
  - Cross-sell aggressively

LOW CROSS-ELASTICITY (differentiated / unique):
  - You have pricing power; value-based pricing viable
  - Focus on communicating unique value
  - Competitors' pricing is less relevant to your strategy
```

---

## 3. Supply, Demand, and Market Equilibrium

### For Digital / SaaS Products

Classical supply-demand curves have a critical modification for software: marginal cost
of supply is approximately zero. This fundamentally changes pricing strategy.

```
PHYSICAL PRODUCTS:
  Supply curve: Upward sloping (marginal cost increases with volume)
  Equilibrium: Where supply intersects demand
  Pricing constraint: Must price above marginal cost

DIGITAL PRODUCTS:
  Supply curve: Essentially flat at zero marginal cost
  Fixed costs: High (development, infrastructure)
  Variable costs: Near zero (per additional user)
  Pricing constraint: Must cover fixed costs over volume

  This means:
    - Price is decoupled from cost (price based on VALUE, not cost)
    - Volume pricing (more users = lower fixed cost per user)
    - Bundling is almost always profitable (zero marginal cost of inclusion)
    - Free tiers are viable (marginal cost of free user ~ $0)
```

---

## 4. Consumer and Producer Surplus

### Definitions

```
CONSUMER SURPLUS:
  The difference between what consumers are willing to pay and what
  they actually pay. Represents value captured by the buyer.

  Consumer Surplus = WTP - Price Paid

PRODUCER SURPLUS:
  The difference between the price received and the minimum price
  the seller would accept. Represents value captured by the seller.

  Producer Surplus = Price Received - Cost

TOTAL VALUE CREATED = Consumer Surplus + Producer Surplus
```

### Pricing Strategy as Surplus Allocation

```
                   Willingness to Pay
                   ┌──────────────────────────┐
                   │                          │
                   │    CONSUMER SURPLUS       │
                   │    (value to buyer)       │
                   │                          │
  Price ──────────├──────────────────────────┤
                   │                          │
                   │    PRODUCER SURPLUS       │
                   │    (profit to seller)     │
                   │                          │
  Cost  ──────────├──────────────────────────┤
                   │    COST OF PRODUCTION    │
                   └──────────────────────────┘

PRICING GOAL:
  Capture more producer surplus without losing customers.
  This means pricing closer to WTP, NOT closer to cost.
  But: Price too close to WTP → customers feel ripped off → churn
```

### Value-Based Pricing Connection

Value-based pricing aims to set price as a percentage of perceived value (WTP), leaving
enough consumer surplus to make the purchase feel like a good deal while maximizing
producer surplus. The typical split: capture 20-40% of value created as price; leave
60-80% as consumer surplus.

---

## 5. Price Discrimination

### Three Degrees of Price Discrimination (Pigou, 1920)

#### First-Degree (Perfect)

**Definition:** Charge each customer their exact maximum willingness to pay.

```
Theoretical: Each customer pays a different price
Reality: Impossible to know exact WTP for each customer
Approximation: Negotiate every deal (enterprise sales)
  - Custom pricing based on deal size, urgency, competitive alternatives
  - Enterprise SaaS: "Contact us for pricing" IS first-degree discrimination

Surplus captured: All consumer surplus → producer surplus
Ethics: Legal and common in B2B; perceived as unfair in B2C
```

#### Second-Degree (Versioning / Self-Selection)

**Definition:** Offer different price-quality bundles and let customers self-select
based on their WTP.

```
Mechanism: Good-Better-Best tiers (e.g., Starter, Pro, Enterprise)
Self-selection: High-WTP customers choose premium tiers voluntarily
  because the value differential justifies the price differential

Key principle: Tiers must be designed so that high-WTP customers
  do NOT find lower tiers acceptable. This requires:
  - Feature differentiation that matters to power users
  - Usage limits that constrain heavy users on lower tiers
  - Premium features that unlock high-value workflows

SaaS examples:
  - Slack: Free → Pro → Business+ → Enterprise Grid
  - HubSpot: Starter → Professional → Enterprise
  - Zoom: Basic → Pro → Business → Enterprise
```

#### Third-Degree (Segment-Based)

**Definition:** Charge different prices to different identifiable customer segments.

```
Segmentation variables:
  - Geography: Different prices by country (purchasing power parity)
  - Customer type: Student/nonprofit discount; enterprise premium
  - Volume: Quantity discounts for larger purchases
  - Timing: Early bird pricing, end-of-quarter discounts
  - Channel: Direct vs. partner/reseller pricing

Legal considerations:
  - B2B: Highly legal and standard practice
  - B2C: Legal in most jurisdictions with exceptions
  - Must not discriminate based on protected characteristics
  - Robinson-Patman Act (US): Restricts price discrimination between
    competing resellers for commodities (rarely enforced for SaaS)
```

---

## 6. Behavioral Pricing — Anchoring

### The Anchoring Effect (Tversky & Kahneman, 1974)

People rely heavily on the first piece of information they receive (the "anchor") when
making judgments, even when the anchor is arbitrary.

```
PRICING APPLICATION:

  ANCHOR HIGH, THEN DISCOUNT:
    "Regular price: $299 → Your price: $199"
    The $299 anchor makes $199 feel like a bargain

  DECOY ANCHORING:
    Show the enterprise plan ($599/mo) first on the pricing page
    Then show the target plan ($199/mo) — it feels affordable

  REFERENCE PRICE ANCHORING:
    "Companies typically spend $50K/year on this function"
    "Our product replaces that for $12K/year"
    The $50K anchors the value perception

  ANTI-PATTERN:
    Showing the cheapest plan first anchors LOW
    Everything else feels expensive by comparison
```

---

## 7. Behavioral Pricing — The Decoy Effect

### Asymmetric Dominance (Huber, Payne, & Puck, 1982)

Adding a dominated option (decoy) changes preference between existing options.

```
CLASSIC EXAMPLE (The Economist):

  Option A: Digital only         — $59
  Option B: Print only          — $125
  Option C: Print + Digital     — $125

  Without decoy (B): Most choose A (digital is cheaper)
  With decoy (B):    Most choose C (print+digital = same price as print?!)

  Option B is dominated by C (C offers everything B does plus more for the
  same price). B's only purpose is to make C look like an incredible deal.

SAAS PRICING APPLICATION:

  Starter:    $19/mo  — 5 users, 10GB, basic features
  DECOY:      $39/mo  — 5 users, 50GB, basic features + reports
  Professional: $49/mo — 25 users, 100GB, all features + reports + API

  The decoy makes Professional look like the obvious best value.
```

---

## 8. Behavioral Pricing — Endowment and Loss Aversion

### Endowment Effect (Thaler, 1980)

People value things more once they own them. This has direct implications for pricing.

```
APPLICATIONS:

  FREE TRIALS:
    Give the customer access to the full product for 14 days.
    They build workflows, configure settings, invite teammates.
    At the end: they "own" the product psychologically.
    Removing access triggers loss aversion → they pay to keep it.

  REVERSE TRIALS:
    Give full-feature access; then downgrade to free tier.
    Customer experiences the loss of premium features.
    More effective than traditional free → upgrade path.

  ANNUAL PLANS:
    Once committed to annual, the endowment effect strengthens.
    Customer is less likely to churn mid-contract.
    Price increases are easier to absorb at renewal.
```

### Loss Aversion (Kahneman & Tversky, 1979)

Losses are felt approximately 2x more strongly than equivalent gains.

```
PRICING IMPLICATIONS:

  FRAMING AS LOSS PREVENTION:
    "Save $2,400/year" is less motivating than
    "You're currently losing $200/month without this"

  PRICE INCREASE COMMUNICATION:
    Frame as what they keep (features, support, value) not what they lose (money)
    "You'll continue to receive [list of benefits] at the new rate of $X"

  DISCOUNTS:
    Removing a discount feels like a loss (even though it was a promotion)
    "Your promotional pricing expires on [date]" triggers loss aversion
    Use this to drive conversion from trial/promotional to full price
```

---

## 9. Reference Prices and Prospect Theory

### Reference Price Theory

Customers evaluate prices not in absolute terms but relative to a reference point.

```
REFERENCE PRICE SOURCES:

  Internal reference: Customer's memory of past prices for this or similar products
  External reference: Competitor prices, list price, "was" price
  Contextual reference: Other prices visible at the moment of purchase

PRICING IMPLICATIONS:

  If actual price < reference price → Perceived gain → Purchase likely
  If actual price > reference price → Perceived loss → Purchase unlikely
  If actual price = reference price → Neutral → Decision based on other factors

  STRATEGY: Manage the reference price

  Techniques:
    1. Show original price alongside sale price (creates favorable reference)
    2. Show competitor pricing comparison (creates favorable reference)
    3. Frame in smaller units ("only $3/day" vs. "$90/month")
    4. Show price per unit ("$0.50/user/day" vs. "$750/month for 50 users")
```

### Prospect Theory (Kahneman & Tversky, 1979)

```
KEY FINDINGS:

  1. People evaluate outcomes relative to a reference point (not absolute)
  2. Losses hurt ~2x more than equivalent gains feel good
  3. The value function is concave for gains, convex for losses
     (diminishing sensitivity to larger changes in either direction)

PRICING APPLICATIONS:

  Segregate gains: Present multiple benefits separately
    "You save on labor costs AND software costs AND training costs"
    (Three small gains feel better than one large gain)

  Integrate losses: Combine costs into one number
    Bundle all costs into one subscription price
    (One large loss feels better than multiple small losses)

  Silver lining: When delivering bad news (price increase),
    pair with good news (new feature)
    (The gain partially offsets the loss)
```

---

## 10. Weber-Fechner Law

### The Law

The Weber-Fechner law states that the just-noticeable difference (JND) in a stimulus
is proportional to the magnitude of the stimulus.

```
Weber's Law: dI/I = k

Where:
  dI = Change in stimulus needed to be noticed
  I  = Original stimulus magnitude
  k  = Constant (Weber fraction)

For pricing, k ≈ 0.10-0.15 (10-15%)

This means:
  - A $10 product needs a ~$1-1.50 change to be noticed
  - A $100 product needs a ~$10-15 change to be noticed
  - A $1000 product needs a ~$100-150 change to be noticed
```

### Pricing Applications

```
PRICE INCREASES:
  If current price is $100/mo, an increase below $10-15 (10-15%)
  will be below the JND threshold for many customers.

  Strategy: Small, frequent increases (below JND) rather than
  large, infrequent increases (above JND).

  Example:
    BAD:  $100 → $130 (30% increase, very noticeable, high churn risk)
    GOOD: $100 → $110 → $120 → $130 (three 10% increases over 18 months)

PLAN PRICING:
  Adjacent plan prices should differ by MORE than the JND (>15%)
  to create perceived value difference.

  BAD:  Starter $49, Pro $55 (12% difference, barely noticeable)
  GOOD: Starter $49, Pro $79 (61% difference, clearly differentiated)

DISCOUNT THRESHOLDS:
  Discounts below the JND (~10%) are not perceived as meaningful.
  A 5% discount on a $200/mo plan ($10 savings) may not motivate action.
  A 20% discount ($40 savings) crosses the JND and feels significant.
```

---

## 11. Price Fairness and Reference Transaction

### Dual Entitlement Theory (Kahneman, Knetsch, Thaler, 1986)

Customers believe:
1. The firm is entitled to a "reference profit" (fair margin)
2. The customer is entitled to a "reference price" (previous price or market rate)

Violations of either entitlement trigger perception of unfairness.

```
PERCEIVED AS FAIR:
  - Price increase due to genuine cost increase (input costs rose)
  - Price increase with added value (new features justify new price)
  - Volume discounts (buying more should cost less per unit)
  - Loyalty rewards (long-term customers get better pricing)

PERCEIVED AS UNFAIR:
  - Price increase purely due to demand increase (surge pricing)
  - Different prices for identical products at identical time
  - Price increase with no added value
  - Removing features from existing plan to create upsell pressure
  - Penalizing loyal customers (new customer discounts > existing)
```

---

## References

1. Pigou, A. C. (1920). "The Economics of Welfare." Macmillan.
2. Kahneman, D., & Tversky, A. (1979). "Prospect Theory." Econometrica.
3. Tversky, A., & Kahneman, D. (1974). "Judgment Under Uncertainty." Science.
4. Thaler, R. (1980). "Toward a Positive Theory of Consumer Choice." JEBO.
5. Weber, E. H. (1834). "De Pulsu, Resorptione, Auditu et Tactu."
6. Huber, J., Payne, J., & Puck, C. (1982). "Adding Asymmetrically Dominated
   Alternatives." Journal of Consumer Research.
7. Kahneman, D., Knetsch, J., & Thaler, R. (1986). "Fairness as a Constraint on
   Profit Seeking." American Economic Review.
8. Varian, H. (1989). "Price Discrimination." Handbook of Industrial Organization.

---

**This document is authoritative within the Pricing Brain foundations layer.**

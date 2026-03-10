# Value-Based Pricing — EVE, Value Drivers, and Price-Value Maps

## Overview

Value-based pricing is the discipline of setting prices based on the economic value
a product delivers to the customer rather than on the cost to produce it or the prices
competitors charge. It is the most profitable pricing strategy for differentiated
products and the gold standard for SaaS and technology companies. This module covers
Economic Value Estimation (EVE), value driver analysis, next-best-alternative
assessment, customer value quantification, price-value maps, and the decomposition
of price into reference value and differentiation value.

---

## 1. The Value-Based Pricing Framework

### Core Principle

```
VALUE-BASED PRICING AXIOM:

  Price should be a function of the value created for the customer,
  NOT the cost to deliver it, NOT the competitor's price.

  Price = f(Customer Value) ≠ f(Your Costs) ≠ f(Competitor Prices)

  Costs set the floor (you must be profitable).
  Competition sets the context (relative positioning).
  Value sets the ceiling (maximum willingness to pay).
  Strategy determines where between floor and ceiling you price.
```

### Value Sharing Model

```
  Customer's Maximum WTP
  ┌──────────────────────────────────────────┐
  │                                          │
  │    CONSUMER SURPLUS (60-80% of value)    │
  │    Value retained by customer            │
  │    "Why this is a good deal"             │
  │                                          │
  ├──────────────────────────────────────────┤ ← YOUR PRICE
  │                                          │
  │    PRODUCER SURPLUS (20-40% of value)    │
  │    Value captured as price               │
  │    "Your revenue"                        │
  │                                          │
  ├──────────────────────────────────────────┤ ← YOUR COST
  │    COST OF DELIVERY                      │
  └──────────────────────────────────────────┘

  The pricing challenge: Determine the correct split.
  Too much producer surplus → customers leave (price too high)
  Too little producer surplus → money left on table (underpriced)
```

---

## 2. Economic Value Estimation (EVE)

### The EVE Method

Economic Value Estimation (also called Economic Value to the Customer, EVC) quantifies
the total value your product creates for a specific customer segment in monetary terms.

```
EVE = Reference Value + Differentiation Value

Where:
  Reference Value = Price of the customer's next-best alternative (NBA)
  Differentiation Value = Value of your product's differences vs. the NBA
                          (can be positive or negative)
```

### Step-by-Step EVE Process

```
STEP 1: IDENTIFY THE CUSTOMER SEGMENT
  Who specifically are you pricing for?
  Different segments have different value drivers and WTP.
  Example: "Mid-market B2B SaaS companies, 50-200 employees,
  using manual processes for [function]"

STEP 2: IDENTIFY THE NEXT-BEST ALTERNATIVE (NBA)
  What would this customer use if your product did not exist?
  Options:
    a) Specific competitor product
    b) Manual process (spreadsheets, email, human labor)
    c) Build in-house
    d) Do nothing (accept the cost of not solving the problem)

STEP 3: DETERMINE REFERENCE VALUE
  What does the NBA cost the customer?
  Include: License fees, implementation, training, maintenance,
           labor, opportunity cost

STEP 4: IDENTIFY DIFFERENTIATION FACTORS
  How is your product different from the NBA?
  List every meaningful difference (positive and negative)

STEP 5: QUANTIFY DIFFERENTIATION VALUE
  For each differentiator, estimate the monetary value to the customer

STEP 6: CALCULATE EVE
  EVE = Reference Value + Sum(Differentiation Values)

STEP 7: SET PRICE
  Price = EVE * Value Capture Rate (typically 20-40%)
  The remainder stays with the customer as consumer surplus
```

### EVE Example

```
SEGMENT: Mid-market company, 100 employees, managing customer data manually

NEXT-BEST ALTERNATIVE: Spreadsheets + manual processes

REFERENCE VALUE (annual cost of NBA):
  Employee time: 2 FTEs at $60K each = $120,000/year
  Error costs: ~$15,000/year in data errors and corrections
  Opportunity cost: ~$25,000/year in delayed decisions
  Tool costs: $5,000/year (spreadsheet tools, email)
  Total NBA cost: $165,000/year

YOUR PRODUCT DIFFERENTIATION VALUE:
  + Time savings: Eliminates 1.5 FTEs of manual work      = +$90,000
  + Error reduction: 95% fewer data errors                 = +$14,250
  + Faster decisions: Real-time data vs. weekly reports     = +$20,000
  + Integration: Connects to existing tools (saves config)  = +$5,000
  - Learning curve: 2 weeks of reduced productivity         = -$5,000
  - Risk: New system, unknown reliability                   = -$10,000
  Net Differentiation Value: +$114,250

EVE = $165,000 (reference) + $114,250 (differentiation) = $279,250/year

But this is the MAXIMUM theoretical price.

PRICE SETTING:
  Value capture at 20%: $55,850/year ($4,654/month)
  Value capture at 30%: $83,775/year ($6,981/month)
  Value capture at 40%: $111,700/year ($9,308/month)

  Customer saves: $167,550-$223,400/year (ROI: 2.5-5x)
  This makes the purchase decision easy.
```

---

## 3. Value Driver Analysis

### What Are Value Drivers?

Value drivers are the specific attributes of your product that create measurable
economic value for the customer. They are the "reasons the customer pays."

### Value Driver Taxonomy

```
CATEGORY 1: REVENUE DRIVERS (help customer earn more)
  - Increased conversion rates
  - Faster time-to-market
  - Better customer retention
  - Access to new markets/channels
  - Higher pricing power for customer

CATEGORY 2: COST DRIVERS (help customer spend less)
  - Labor savings (automation, efficiency)
  - Tool consolidation (replace multiple tools)
  - Error reduction (fewer costly mistakes)
  - Compliance cost avoidance (penalties, fines)
  - Infrastructure savings

CATEGORY 3: RISK DRIVERS (help customer avoid loss)
  - Security (reduced breach probability * breach cost)
  - Compliance (reduced regulatory penalty risk)
  - Business continuity (reduced downtime cost)
  - Data protection (reduced data loss probability)

CATEGORY 4: STRATEGIC DRIVERS (harder to quantify)
  - Competitive advantage
  - Speed of innovation
  - Customer experience improvement
  - Brand perception
  - Employee satisfaction/retention
```

### Value Driver Prioritization

```
VALUE DRIVER IMPORTANCE MATRIX:

                    Quantifiable        Hard to Quantify
                ┌──────────────────┬──────────────────┐
  High Impact   │ LEAD WITH THESE  │ SUPPORT WITH     │
                │ (ROI calculators)│ (testimonials,    │
                │                  │  case studies)    │
                ├──────────────────┼──────────────────┤
  Low Impact    │ MENTION          │ OMIT             │
                │ (nice to have)   │ (distracting)    │
                └──────────────────┴──────────────────┘

  Pricing should be anchored on HIGH IMPACT + QUANTIFIABLE drivers.
  Communication should include HIGH IMPACT + HARD TO QUANTIFY for
  emotional resonance.
```

---

## 4. Next-Best Alternative (NBA) Analysis

### Identifying the True NBA

```
THE NBA IS NOT ALWAYS A COMPETITOR:

  Competitor product:  "Use [Competitor X] instead"
  Manual process:      "Do it in spreadsheets / manually"
  Build in-house:      "Have engineering build it internally"
  Do nothing:          "Accept the status quo and its costs"
  Hire people:         "Hire more staff to handle it"

DETERMINING THE NBA:
  Ask the customer: "If our product disappeared tomorrow,
  what would you do?"

  The answer reveals:
    1. The true alternative (which sets reference value)
    2. The switching cost (which affects pricing power)
    3. The perceived value gap (which sets differentiation value)
```

### NBA Pricing Framework

```
NBA ANALYSIS TEMPLATE:

  Alternative         Total Cost    Pros vs You    Cons vs You
  ───────────────────────────────────────────────────────────
  Competitor A        $X/year       [List]         [List]
  Competitor B        $X/year       [List]         [List]
  Manual process      $X/year       [List]         [List]
  Build in-house      $X/year       [List]         [List]
  Do nothing          $X/year       [List]         [List]

  Most likely NBA: [The one most customers would actually choose]
  Reference value: [Cost of the most likely NBA]
```

---

## 5. Customer Value Quantification

### ROI Calculator Design

ROI calculators are the operational tool for value-based selling. They translate
the EVE analysis into a customer-specific business case.

```
ROI CALCULATOR INPUTS (customer provides):
  Number of employees
  Current time spent on [task] (hours/week)
  Average employee hourly cost (fully loaded)
  Current error rate (if applicable)
  Cost per error (if applicable)
  Current tool costs (if replacing)
  Revenue attributed to [function] (if revenue driver)

ROI CALCULATOR OUTPUTS (system calculates):
  Annual time savings: [hours] x [hourly cost] = $X
  Annual error reduction savings: [errors] x [cost per error] = $X
  Annual tool consolidation savings: $X
  Annual revenue impact: $X (if applicable)
  Total annual value: $X
  Your annual cost: $X
  Net annual value: Total - Cost = $X
  ROI: (Net Value / Cost) x 100 = X%
  Payback period: Cost / (Monthly Value) = X months
```

### Value Communication

```
COMMUNICATING VALUE:

  NEVER LEAD WITH PRICE:
    Bad: "Our product costs $500/month."
    Good: "Our product saves you $5,000/month. It costs $500."

  FRAME AS INVESTMENT:
    Bad: "The cost is $6,000/year."
    Good: "An investment of $6,000/year yields $60,000 in savings (10x ROI)."

  USE CUSTOMER-SPECIFIC NUMBERS:
    Bad: "Companies typically save 40%."
    Good: "Based on your team size and current process, you would save
           approximately $47,000 per year."

  ANCHOR ON ALTERNATIVES:
    Bad: "Our price is $500/month."
    Good: "Hiring a person to do this costs $5,000/month.
           Our tool does it for $500/month. You save $4,500."
```

---

## 6. Price-Value Maps

### What Is a Price-Value Map?

A price-value map plots products on two axes: perceived value (x-axis) and price
(y-axis). It reveals positioning gaps and pricing opportunities.

```
PRICE-VALUE MAP:

  Price ($)
  High │          ○ CompC
       │              (overpriced)
       │
       │     ◆ YOU        ★ CompD
       │     (fair)       (premium)
       │
       │          ○ CompB
       │          (fair)
       │
  Low  │    ○ CompA
       │    (bargain)
       │
       └────────────────────────────────
       Low              Value            High

  QUADRANTS:
    Upper-left:  OVERPRICED (high price, low value) — vulnerable to disruption
    Upper-right: PREMIUM (high price, high value) — sustainable if differentiated
    Lower-left:  ECONOMY (low price, low value) — viable but low margin
    Lower-right: BARGAIN (low price, high value) — great for market share, low margin
    DIAGONAL:    FAIR VALUE LINE — price proportional to value
```

### How to Build a Price-Value Map

```
STEP 1: DEFINE VALUE AXES
  Use value drivers identified in value analysis
  Weight them by customer importance (conjoint or survey)
  Create composite "value score" for each product

STEP 2: GATHER PRICE DATA
  Collect published pricing for all competitors
  For enterprise/custom pricing, estimate based on industry intelligence

STEP 3: PLOT
  X-axis: Composite value score
  Y-axis: Price (normalized to same unit, e.g., $/user/month)
  Plot all competitors and your product

STEP 4: ANALYZE
  Where do you fall relative to the fair value line?
  Above the line: Potentially overpriced (or strong brand premium)
  Below the line: Potentially underpriced (or intentionally penetrating)
  On the line: Fair pricing; need other differentiators

STEP 5: IDENTIFY OPPORTUNITIES
  Gaps in the map: Underserved price-value zones
  Overcrowded zones: Intense competition; differentiate or avoid
  Your ideal position: Matches your strategic intent
```

---

## 7. Reference Value + Differentiation Value

### Decomposing EVE for Communication

```
CUSTOMER VALUE COMMUNICATION:

  "Here's how our pricing is set:"

  REFERENCE VALUE:
    "Companies like yours currently spend $X per year on [alternatives]."
    This anchors the customer's expectation.

  DIFFERENTIATION VALUE (positive):
    "Our product additionally provides:"
    + $X in time savings through automation
    + $X in error reduction through [feature]
    + $X in faster [outcome] through [feature]

  DIFFERENTIATION VALUE (negative — be honest):
    "Fair considerations:"
    - There is a learning curve (first 2 weeks)
    - Migration requires [effort]

  TOTAL VALUE:
    "Total economic value: $X per year"

  YOUR PRICE:
    "Our price: $Y per year"
    "Your net gain: $X - $Y = $Z per year"
    "ROI: [ratio]x"
```

### Segment-Specific Value

```
VALUE VARIES BY SEGMENT:

  Segment A (Enterprise, 500 employees):
    Reference value: $500K/year (multiple FTEs + existing tools)
    Differentiation: +$200K (automation, integration, scale)
    Total EVE: $700K
    Price at 25%: $175K/year

  Segment B (Mid-Market, 100 employees):
    Reference value: $120K/year (1-2 FTEs + spreadsheets)
    Differentiation: +$80K (time savings, error reduction)
    Total EVE: $200K
    Price at 25%: $50K/year

  Segment C (SMB, 20 employees):
    Reference value: $30K/year (part-time labor + manual)
    Differentiation: +$15K (time savings)
    Total EVE: $45K
    Price at 25%: $11.25K/year ($940/month)

  INSIGHT: Same product, 15x price difference between segments
  This is why segmented pricing (Good-Better-Best) exists.
```

---

## 8. Value-Based Pricing Challenges

### Common Objections and Responses

| Objection | Response |
|-----------|---------|
| "We can't measure value precisely" | Perfect precision is unnecessary; directional is sufficient. A 2x range is better than cost-plus guessing. |
| "Customers won't share their economics" | Ask about their process, time, and pain points; quantify value for them. |
| "Our value varies too much by customer" | This is GOOD — it means segmented pricing can capture more value. |
| "Competitors are cheaper" | If you deliver more value, you should cost more. Compete on ROI, not price. |
| "Sales team can't sell value" | Train them; give them ROI calculators and case studies. |

### Implementation Checklist

```
VALUE-BASED PRICING IMPLEMENTATION:

  □ Customer interviews completed (10-15 per segment)
  □ Next-best alternatives identified per segment
  □ Reference values calculated per segment
  □ Value drivers identified and prioritized
  □ Differentiation value quantified per segment
  □ EVE calculated per segment
  □ Price-value map created
  □ ROI calculator built and tested
  □ Sales team trained on value-based selling
  □ Customer-facing value communication created
  □ WTP research (Van Westendorp or conjoint) completed
  □ Pricing model designed (tiers, packaging, value metrics)
  □ Price set with documented rationale
```

---

## References

1. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing." Routledge.
2. Ramanujam, M., & Tacke, G. (2016). "Monetizing Innovation." Wiley.
3. Forbis, J., & Mehta, N. (1981). "Value-Based Strategies for Industrial Products."
   Business Horizons.
4. Anderson, J., & Narus, J. (1998). "Business Marketing: Understand What Customers
   Value." Harvard Business Review.
5. Hinterhuber, A. (2004). "Towards Value-Based Pricing." Journal of Product & Brand
   Management.

---

**This document is authoritative for value-based pricing within the Pricing Brain.**

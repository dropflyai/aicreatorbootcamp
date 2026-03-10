# Pricing Analytics — Elasticity Measurement, Revenue Waterfall, and Competitive Intelligence

## Overview

Pricing analytics is the quantitative discipline of measuring pricing effectiveness,
identifying revenue opportunities, and providing the empirical foundation for pricing
decisions. While pricing strategy sets direction and pricing operations executes it,
pricing analytics tells you whether it is working. This module covers price elasticity
measurement from real-world data, the revenue waterfall from list price to pocket price,
discount analysis and leakage identification, win/loss analysis by price, competitive
pricing intelligence gathering and synthesis, cohort-based pricing analysis, and the
analytical infrastructure required to support data-driven pricing. Every pricing decision
should be informed by analytics; every pricing change should be measured by analytics.

---

## 1. Price Elasticity Measurement

### Measuring Elasticity from Real Data

```
ELASTICITY ESTIMATION METHODS:

  METHOD 1: HISTORICAL PRICE VARIATION
    Use natural price variation (promotions, A/B tests, price changes)
    to estimate demand response.

    Formula:
      PED = (% Change in Quantity) / (% Change in Price)

    Example:
      Price changed from $49 to $59 (20.4% increase)
      Conversion rate changed from 8% to 6.8% (15% decrease)
      PED = -15% / 20.4% = -0.74 (inelastic)

    Requirements:
      - Sufficient data before and after price change
      - Control for confounding variables (seasonality, marketing spend)
      - Minimum 4 weeks of data per price point

  METHOD 2: A/B TEST (EXPERIMENTAL)
    Randomly assign visitors to different price points.
    Measure conversion rate per variant.

    Design:
      Control:   Current price ($49)
      Variant A: Lower price ($39)
      Variant B: Higher price ($59)
      Variant C: Premium price ($79)

    Analysis:
      Plot conversion rate vs. price
      Fit demand curve (linear, log-linear, or logit)
      Calculate point elasticity at each price

    Advantage: Causal inference (no confounders)
    Limitation: Ethical constraints; limited duration

  METHOD 3: SURVEY-BASED (STATED PREFERENCE)
    Van Westendorp, Gabor-Granger, or conjoint analysis
    (see 05_experimentation for detailed methodology)

    Advantage: No real-world pricing risk
    Limitation: Stated vs. revealed preference gap (typically 15-30%)

  METHOD 4: REGRESSION ANALYSIS
    Multi-variable regression with price as independent variable.

    Model:
      ln(Quantity) = B0 + B1*ln(Price) + B2*Marketing + B3*Season + e

    B1 = Price elasticity (in log-log specification)

    Controls: Marketing spend, seasonality, competitor actions, product changes
    Data: Monthly or weekly observations over 12+ months
    Advantage: Controls for multiple factors simultaneously
    Limitation: Requires sufficient historical variation in price
```

### Elasticity Segmentation

```
SEGMENT-LEVEL ELASTICITY:

  Different customer segments have different price sensitivity.
  Measuring overall elasticity masks important variation.

  SEGMENTATION DIMENSIONS:
    By company size:    SMB (more elastic) vs Enterprise (less elastic)
    By vertical:        Funded startups (less elastic) vs bootstrapped (more elastic)
    By geography:       Developed markets (less elastic) vs emerging (more elastic)
    By acquisition:     Organic (less elastic) vs paid (more elastic)
    By engagement:      High usage (less elastic) vs low usage (more elastic)

  EXAMPLE OUTPUT:
    Segment          PED      Interpretation
    ─────────────────────────────────────────────
    SMB (<50 emp)    -1.4     Elastic: price sensitive, explore lower tiers
    Mid-Market       -0.8     Inelastic: room for price increase
    Enterprise       -0.3     Very inelastic: value-based pricing works
    Startup          -1.1     Elastic: offer startup program discounts
    Overall          -0.9     Near unitary: disguises segment variation

  APPLICATION:
    Segment-specific pricing (different tiers for different segments)
    Segment-specific discounting (larger discounts for elastic segments)
    Segment-specific messaging (value-focused for inelastic, price-focused for elastic)
```

---

## 2. Revenue Waterfall Analysis

### From List Price to Pocket Price

```
REVENUE WATERFALL:

  The revenue waterfall traces the journey from published list price
  to the actual revenue collected ("pocket price") per customer.

  LIST PRICE (published on pricing page)
    minus: Standard discounts (annual billing, volume)
  = INVOICE PRICE (what appears on the invoice)
    minus: Off-invoice adjustments (credits, refunds, disputes)
    minus: Payment terms cost (net-60 = cost of capital)
    minus: Cash discounts (2% net-10)
  = POCKET PRICE (actual revenue collected)

  EXAMPLE:
    List price:              $99/month ($1,188/year)
    Annual billing discount: -20% ($237.60)
    Invoice price:           $950.40/year
    Promotional credit:      -$100 (first year promo)
    Refund/credit:           -$50 (service credit for outage)
    Net revenue collected:   $800.40/year

    Price realization rate: $800.40 / $1,188 = 67.4%

  HEALTHY RANGE: Price realization 80-90%
  WARNING: Price realization <75% indicates significant leakage
  CRITICAL: Price realization <60% requires immediate audit
```

### Waterfall Visualization

```
POCKET PRICE WATERFALL (per customer per year):

  $1,200 ┤ ████████████████████████████████████  List Price ($1,188)
         │
  $1,000 ┤ ████████████████████████████████  Annual Discount (-$238)
         │                                    Invoice Price ($950)
   $900  ┤ ██████████████████████████████  Promo Credit (-$100)
         │
   $800  ┤ ████████████████████████████  Service Credit (-$50)
         │                                Pocket Price ($800)
         │
   $600  ┤
         └──────────────────────────────────────────────────

  AGGREGATE WATERFALL (all customers, annual):
    Theoretical maximum (list * customers):  $10,000,000
    Standard discounts:                      -$1,500,000
    Invoice revenue:                          $8,500,000
    Off-invoice leakage:                      -$750,000
    Pocket revenue:                           $7,750,000
    Price realization:                         77.5%
    Leakage opportunity:                      $750K addressable
```

### Waterfall Decomposition by Segment

```
SEGMENT-LEVEL WATERFALL:

  Segment      List    Discount  Invoice  Leakage  Pocket  Realization
  ────────────────────────────────────────────────────────────────────
  SMB          $588    -5%       $559     -2%      $547    93%
  Mid-Market   $1,188  -15%      $1,010   -5%      $959    81%
  Enterprise   $5,988  -25%      $4,491   -8%      $4,132  69%
  Overall      —       -18%      —        -6%      —       77.5%

  INSIGHTS:
    SMB: Healthy realization; minimal leakage
    Mid-Market: Moderate; discount depth is primary driver
    Enterprise: Significant leakage; investigate off-invoice adjustments

  ACTION ITEMS:
    1. Audit enterprise credits and service adjustments
    2. Tighten enterprise discount governance (authority matrix)
    3. Reduce service credits through reliability improvement
    4. Review payment terms impact on enterprise segment
```

---

## 3. Discount Analysis

### Discount Distribution

```
DISCOUNT DEPTH ANALYSIS:

  Pull all deals closed in the period.
  Calculate discount depth for each: (List - Actual) / List * 100

  Distribution:
    0% (no discount):      35% of deals
    1-10%:                 25% of deals
    11-20%:                20% of deals
    21-30%:                12% of deals
    31-40%:                 6% of deals
    >40%:                   2% of deals

  METRICS:
    Average discount depth:   12.8%
    Median discount depth:    8.0%
    Weighted average (by ACV): 18.5% (larger deals get bigger discounts)
    % of deals with any discount: 65%

  TRENDS (quarter over quarter):
    Q1: Average 11.2%  → Q2: 12.8% → Q3: 14.1% → Q4: 16.5%
    CONCERN: Discount depth increasing each quarter
    DIAGNOSIS: End-of-quarter pressure? Sales team learned to discount?
    ACTION: Reinforce discount governance; review authority compliance
```

### Discount Effectiveness

```
DISCOUNT ROI ANALYSIS:

  Question: Do discounts actually improve outcomes?

  ANALYSIS:
    Compare discounted deals to non-discounted deals:

    Metric              No Discount    With Discount    Delta
    ─────────────────────────────────────────────────────────
    Win rate            28%            34%              +6pp
    Average ACV         $12,400        $9,800           -$2,600
    Time to close       42 days        38 days          -4 days
    Expansion rate      22%            15%              -7pp
    12-month retention  91%            84%              -7pp
    LTV                 $45,000        $31,000          -$14,000

  INSIGHT:
    Discounts improve win rate slightly (+6pp) but:
    - Reduce ACV by 21%
    - Reduce expansion rate (anchored to low price)
    - Reduce retention (attracted by price, not value)
    - Reduce LTV by 31%

    The "cost" of the discount exceeds the "benefit" of higher win rate.

  RECOMMENDATION:
    Reduce discounting; invest in value selling training
    Reserve discounts for genuinely strategic situations
    Track LTV by discount depth to quantify long-term impact
```

---

## 4. Win/Loss Analysis by Price

### Price as a Factor in Sales Outcomes

```
WIN/LOSS PRICING ANALYSIS:

  DATA SOURCE: CRM closed-lost reasons + post-deal surveys

  OVERALL LOSS REASONS (all lost deals):
    1. Timing / not ready:           28%
    2. Chose competitor:             25%
    3. Price too high:               22%
    4. Status quo (do nothing):      15%
    5. Lost to internal solution:     7%
    6. Other:                         3%

  DEEP DIVE: "Price too high" losses (22% of all losses):
    By competitor:
      Lost to Competitor A at lower price:    35%
      Lost to Competitor B at lower price:    25%
      "Too expensive" (no named alternative):  30%
      Internal budget constraint:              10%

    By segment:
      SMB price losses:          30% of SMB losses
      Mid-Market price losses:   20% of MM losses
      Enterprise price losses:   12% of Ent losses

    By deal size:
      Deals <$5K ACV:            28% price losses
      Deals $5-20K ACV:          22% price losses
      Deals $20-50K ACV:         18% price losses
      Deals >$50K ACV:           14% price losses

  INSIGHT:
    Price sensitivity is highest in SMB and small deals.
    Enterprise losses are rarely about price.
    Action: Consider SMB-specific pricing; hold firm on enterprise.
```

### Competitive Price Delta Analysis

```
WIN/LOSS BY PRICE DELTA:

  Calculate price difference between our quote and competitor's
  (when known from buyer feedback or competitive intel).

  Price Delta     Win Rate    Sample Size
  ──────────────────────────────────────────
  We're 30%+ cheaper:   82%       45
  We're 10-30% cheaper: 71%       120
  We're +-10% (parity): 55%       280
  We're 10-30% higher:  38%       190
  We're 30%+ higher:    22%       65

  INTERPRETATION:
    At parity, we win 55% (product/relationship advantage)
    Each 10% above parity costs ~8pp in win rate
    Below 30% premium, we win less than 1 in 4

  OPTIMAL POSITIONING:
    Target: 5-15% above primary competitor (premium positioning)
    Win rate at this delta: ~42-48%
    Revenue per deal: Higher (premium pricing)
    Win rate * deal value is maximized in this range
```

---

## 5. Competitive Pricing Intelligence

### Intelligence Gathering

```
COMPETITIVE PRICING DATA SOURCES:

  PUBLIC SOURCES:
    Pricing pages:          Scrape competitor pricing pages weekly
    G2/Capterra reviews:    Mining mentions of pricing in reviews
    Blog/changelog:         Announcements of pricing changes
    Job postings:           "Pricing Manager" postings reveal strategy shifts
    SEC filings:            ARPU, revenue per customer in public filings
    Analyst reports:        Gartner, Forrester pricing mentions

  SEMI-PUBLIC:
    Prospect feedback:      "Competitor quoted us $X"
    Win/loss surveys:       Competitive pricing data from lost deals
    Partner intel:          Channel partners share competitive quotes
    Industry events:        Conference presentations with pricing mentions

  TOOLS:
    Klue:       Competitive intelligence platform (automated collection)
    Crayon:     Website monitoring + competitive intelligence
    Kompyte:    Automated competitive tracking
    Custom:     Web scraper monitoring competitor pricing pages (weekly)

INTELLIGENCE SYNTHESIS:

  COMPETITIVE PRICE MAP (Updated Quarterly):

  Feature/Tier    Us       Comp A     Comp B     Comp C
  ─────────────────────────────────────────────────────────
  Starter         $29      $25        $19        $35
  Pro             $79      $65        $49        $89
  Enterprise      $199     $150       Custom     $249
  Per-seat add    $15      $12        $10        $20

  POSITIONING: We are premium vs Comp A/B, value vs Comp C
  GAP: Our Pro vs Comp B Pro = $30 delta (61% premium)
  RISK: Comp B is gaining share at lower price point
  OPPORTUNITY: Comp C customers may see us as better value
```

---

## 6. Cohort-Based Pricing Analysis

### Revenue Cohort Analysis

```
COHORT ANALYSIS BY SIGN-UP MONTH:

  Track each monthly cohort's pricing behavior over time.

  Cohort    Month 1   Month 3   Month 6   Month 12  ARPU Change
  ──────────────────────────────────────────────────────────────
  Jan '25   $52       $55       $61       $72       +38%
  Apr '25   $55       $58       $63       $74       +35%
  Jul '25   $58       $60       $65       —         —
  Oct '25   $61       $64       —         —         —

  INSIGHTS:
    1. ARPU grows ~35-38% in first 12 months (expansion revenue)
    2. Each new cohort starts at higher ARPU (price increases working)
    3. Expansion primarily from seat additions (months 3-6) and
       tier upgrades (months 6-12)

  PRICING IMPLICATIONS:
    - Landing price can be lower (expansion will grow ARPU)
    - Optimize for easy seat addition (frictionless expansion)
    - Tier upgrade triggers should fire at month 4-5
```

### Price Point Cohort Analysis

```
COHORT BY INITIAL PRICE POINT:

  Group customers by the price they initially paid.
  Track retention and expansion.

  Initial Price   12-Month Retention   12-Month NRR   LTV
  ─────────────────────────────────────────────────────────
  Free tier       N/A (conversion)     N/A            $0*
  $29 (Starter)   78%                  95%            $810
  $79 (Pro)       88%                  115%           $3,200
  $199 (Business) 93%                  128%           $12,500
  Enterprise      96%                  135%           $85,000

  * Free tier LTV = 0 until conversion

  INSIGHTS:
    Higher initial price = higher retention and expansion
    This is selection bias (higher-value customers choose higher plans)
    BUT it also means: optimizing for Pro conversion > Starter volume

  PRICING IMPLICATION:
    Focus conversion efforts on Pro tier, not Starter
    Consider raising Starter price (filter out low-commitment users)
    Or widen Starter-to-Pro gap to create clear upgrade motivation
```

---

## 7. Analytical Infrastructure

### Pricing Data Architecture

```
PRICING DATA REQUIREMENTS:

  DATA SOURCES:
    CRM (Salesforce, HubSpot):     Deals, quotes, win/loss, competitor info
    Billing (Stripe, Chargebee):   Subscriptions, invoices, payments, churn
    Product analytics (Amplitude):  Usage data, feature adoption, engagement
    Support (Zendesk):              Pricing-related tickets, complaints
    Web analytics (GA4, Mixpanel): Pricing page visits, conversion funnel
    Survey tools (Typeform):        WTP research, NPS, CSAT

  DATA WAREHOUSE:
    Central repository (Snowflake, BigQuery, Redshift)
    ETL/ELT pipelines from all sources
    Single customer view linking CRM + billing + product data

  KEY TABLES:
    dim_customers:        Customer attributes, segment, cohort
    dim_plans:            Plan catalog, features, list prices
    fact_subscriptions:   Active subscriptions with price, seats, add-ons
    fact_invoices:        Invoice line items with actual amounts
    fact_deals:           CRM deals with quotes, discounts, outcomes
    fact_usage:           Product usage metrics per customer per period
    fact_pricing_changes: History of all pricing changes with dates

  ANALYTICAL VIEWS:
    vw_revenue_waterfall:    List → invoice → pocket price per customer
    vw_cohort_analysis:      Cohort retention and ARPU over time
    vw_discount_analysis:    Discount depth, frequency, by segment/rep
    vw_competitive_pricing:  Our price vs competitor by segment/tier
    vw_elasticity_data:      Price-quantity pairs for elasticity estimation
```

### Dashboards and Reporting

```
PRICING ANALYTICS DASHBOARD HIERARCHY:

  LEVEL 1: EXECUTIVE SUMMARY (Monthly to Board)
    - MRR / ARR trend
    - ARPU trend (new and existing)
    - NRR (net revenue retention)
    - Price realization rate
    - Competitive win rate

  LEVEL 2: PRICING HEALTH (Weekly to Pricing Committee)
    - Conversion rate by plan
    - Plan distribution (% starter / pro / enterprise)
    - Discount depth trend
    - Pricing page conversion funnel
    - Expansion revenue rate

  LEVEL 3: OPERATIONAL (Daily to Pricing Ops)
    - Deals awaiting approval
    - Exception requests pending
    - Billing errors flagged
    - Dunning status
    - Currency conversion accuracy

  LEVEL 4: ANALYTICAL (Ad hoc to Pricing Analysts)
    - Elasticity estimates by segment
    - Revenue waterfall decomposition
    - Cohort analysis
    - Win/loss by price delta
    - Feature value analysis

  TOOLS:
    Looker / Tableau / Mode:   Dashboards and visualization
    dbt:                       Data transformation and modeling
    Jupyter / Python:          Ad hoc analysis, statistical modeling
    Google Sheets:             Quick analysis, collaboration
```

---

## References

1. Baker, W., Marn, M., & Zawada, C. (2010). "The Price Advantage." McKinsey.
2. Simon, H. (2015). "Confessions of the Pricing Man."
3. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing."
4. ProfitWell/Paddle (2023). "The State of SaaS Pricing."
5. Dolan, R., & Simon, H. (1996). "Power Pricing." Free Press.
6. Phillips, R. (2005). "Pricing and Revenue Optimization." Stanford University Press.

---

**This document is authoritative for pricing analytics within the Pricing Brain.**

# Supply Chain Fundamentals -- Demand, Inventory, Logistics, and Procurement

## Overview

Supply chain management is the design, planning, execution, and monitoring
of the end-to-end flow of goods, services, information, and capital from
raw materials through to the end customer. Even for digital businesses,
supply chain principles apply to vendor management, service delivery,
infrastructure provisioning, and partner coordination.

This module covers the four pillars of supply chain: demand planning,
inventory management, logistics, and procurement with strategic sourcing.

---

## Demand Planning

### The Demand Planning Process

```
DEMAND PLANNING CYCLE:
1. DATA COLLECTION
   Historical sales, market trends, customer feedback,
   seasonal patterns, promotional plans

2. STATISTICAL FORECASTING
   Apply quantitative methods to historical data

3. DEMAND SENSING
   Adjust with real-time signals (web traffic, inquiries,
   competitor moves, economic indicators)

4. CONSENSUS PLANNING
   Cross-functional input (Sales, Marketing, Product, Finance)
   aligns statistical forecast with business intelligence

5. FORECAST OUTPUT
   Demand forecast by product, region, time period

6. ACCURACY MEASUREMENT
   Compare forecast to actual, improve the model
```

### Forecasting Methods

| Method | Type | Best For | Accuracy |
|--------|------|---------|----------|
| Moving Average | Quantitative | Stable demand, short-term | Moderate |
| Exponential Smoothing | Quantitative | Trending demand | Good |
| ARIMA | Quantitative | Complex patterns, seasonality | High |
| Linear Regression | Quantitative | Demand driven by known factors | Good |
| Delphi Method | Qualitative | New products, no history | Low-Moderate |
| Market Research | Qualitative | New market entry | Moderate |
| Machine Learning | Quantitative | Large datasets, complex patterns | High |

### Forecast Accuracy Metrics

```
MAPE (Mean Absolute Percentage Error):
MAPE = (1/n) * SUM(|Actual - Forecast| / Actual) * 100%

Target: MAPE < 20% for most industries
        MAPE < 10% for stable products

Forecast Bias:
Bias = SUM(Forecast - Actual) / SUM(Actual) * 100%

Target: Bias near 0% (not systematically over- or under-forecasting)
```

### S&OP (Sales and Operations Planning)

S&OP is the monthly cross-functional process that aligns demand, supply,
and financial plans.

```
S&OP MONTHLY CYCLE:
Week 1: Data gathering and statistical forecast generation
Week 2: Demand review (Sales + Marketing adjust forecast)
Week 3: Supply review (Operations assesses capacity)
Week 4: Executive S&OP meeting (CEO/COO approves plan)

OUTPUT: Aligned demand-supply plan, production plan, financial forecast
```

---

## Inventory Management

### Why Inventory Exists

Inventory exists to buffer uncertainty:
- Demand uncertainty (customers order unpredictably)
- Supply uncertainty (vendors deliver unpredictably)
- Lead time uncertainty (transportation varies)
- Quality uncertainty (defective items need replacement)

### Types of Inventory

| Type | Purpose | Example |
|------|---------|---------|
| Raw materials | Input to production | Components, APIs, data |
| Work in progress (WIP) | Items being processed | Open tickets, in-dev features |
| Finished goods | Ready for customer | Packaged product, deployed code |
| Safety stock | Buffer against uncertainty | Extra capacity, backup systems |
| Pipeline/Transit | In transport between stages | Shipments, migrations |

### Economic Order Quantity (EOQ)

The optimal order quantity that minimizes total inventory costs:

```
EOQ = sqrt(2 * D * S / H)

Where:
D = Annual demand (units)
S = Ordering cost (per order)
H = Holding cost (per unit per year)

Example:
D = 10,000 units/year
S = $50 per order
H = $2 per unit per year

EOQ = sqrt(2 * 10,000 * 50 / 2) = sqrt(500,000) = 707 units

Order 707 units each time, approximately every 26 days.
```

### Safety Stock Calculation

```
Safety Stock = Z * sigma_d * sqrt(L)

Where:
Z = Service level factor (1.65 for 95%, 2.33 for 99%)
sigma_d = Standard deviation of daily demand
L = Lead time in days

Example:
95% service level (Z = 1.65)
sigma_d = 15 units/day
L = 7 days

Safety Stock = 1.65 * 15 * sqrt(7) = 1.65 * 15 * 2.65 = 65.6 units
Keep ~66 units of safety stock.
```

### ABC Analysis

Classify inventory by value to focus management attention:

```
CLASS A: 20% of items, 80% of value
  - Tight control, frequent review
  - Accurate forecasting
  - Low safety stock (expensive to hold)
  - Example: Enterprise licenses, key components

CLASS B: 30% of items, 15% of value
  - Moderate control
  - Regular review
  - Moderate safety stock

CLASS C: 50% of items, 5% of value
  - Simple controls
  - Infrequent review
  - Higher safety stock (cheap to hold)
  - Example: Office supplies, commodity services
```

---

## Logistics

### Logistics Design Principles

1. **Minimize total landed cost** -- not just shipping cost, but total cost
   including inventory, handling, and time
2. **Optimize for customer experience** -- delivery speed and reliability
   are competitive advantages
3. **Build resilience** -- single points of failure create fragility
4. **Leverage technology** -- visibility, tracking, and automation
5. **Scale with demand** -- logistics must flex with volume

### Logistics Network Design

```
NETWORK CONSIDERATIONS:
+--------------------------------------------------+
| FACTOR              | TRADEOFF                   |
+--------------------------------------------------+
| # of warehouses     | More = faster delivery,    |
|                     | higher fixed cost           |
| Location            | Near customers = fast,     |
|                     | near suppliers = cheap      |
| Transportation mode | Air = fast, expensive       |
|                     | Ground = slow, cheap        |
|                     | Rail = middle ground        |
| Outsource vs. own   | 3PL = flexible, less control|
|                     | Own = control, high capex   |
+--------------------------------------------------+
```

### Last-Mile Optimization

The last mile (final delivery to customer) is the most expensive and
most visible part of logistics. For digital businesses, "last mile"
means:
- API response time to end user
- Time from order to access/activation
- Support response time
- Content delivery latency (CDN)

---

## Procurement and Strategic Sourcing

### The Procurement Process

```
PROCUREMENT LIFECYCLE:
1. NEED IDENTIFICATION
   - Business requirement defined
   - Specifications documented
   - Budget approved

2. MARKET RESEARCH
   - Identify potential suppliers
   - Evaluate market conditions
   - Benchmark pricing

3. SOLICITATION (RFI -> RFP -> RFQ)
   - RFI: Request for Information (broad screening)
   - RFP: Request for Proposal (detailed evaluation)
   - RFQ: Request for Quotation (pricing focus)

4. EVALUATION AND SELECTION
   - Score against criteria
   - Negotiate terms
   - Select vendor

5. CONTRACT AND ONBOARDING
   - Contract execution
   - Vendor onboarding
   - Integration setup

6. MANAGEMENT AND REVIEW
   - Performance monitoring
   - Relationship management
   - Contract renewals or exits
```

### Strategic Sourcing: Kraljic Matrix

Peter Kraljic (1983) developed the matrix for categorizing purchases by
supply risk and profit impact:

```
                    HIGH PROFIT IMPACT
                         |
    STRATEGIC            |         LEVERAGE
    (high risk,          |         (low risk,
     high impact)        |          high impact)
    - Long-term          |         - Competitive
      partnerships       |           bidding
    - Close              |         - Maximize
      collaboration      |           value
    - Risk mitigation    |         - Volume
                         |           discounts
LOW RISK ----------------+---------------- HIGH RISK
                         |
    NON-CRITICAL         |         BOTTLENECK
    (low risk,           |         (high risk,
     low impact)         |          low impact)
    - Simplify           |         - Secure supply
    - Automate           |         - Find alternatives
    - Reduce effort      |         - Buffer stock
                         |
                    LOW PROFIT IMPACT
```

Strategy by quadrant:
- **Strategic:** Partner deeply, invest in relationship, co-develop
- **Leverage:** Compete suppliers, negotiate hard, consolidate volume
- **Bottleneck:** Reduce dependency, develop alternatives, buffer stock
- **Non-critical:** Automate, simplify, reduce transaction cost

### Total Cost of Ownership (TCO)

Never evaluate suppliers on price alone. TCO includes:

```
TCO = Purchase Price
    + Ordering Cost
    + Shipping/Logistics Cost
    + Quality Cost (defects, returns, rework)
    + Integration Cost (setup, customization)
    + Maintenance Cost (ongoing support, updates)
    + Risk Cost (supply disruption probability x impact)
    + Switching Cost (if you need to change later)
    + Opportunity Cost (time and attention required)
```

---

## Supply Chain KPIs

```
SUPPLY CHAIN METRICS
+--------------------------------------------------+
| DEMAND PLANNING                                  |
| - Forecast accuracy (MAPE): Target <20%         |
| - Forecast bias: Target near 0%                 |
|                                                  |
| INVENTORY                                        |
| - Inventory turnover: [Revenue / Avg Inventory]  |
| - Days of supply: [Avg Inventory / Daily Usage]  |
| - Stockout rate: Target <2%                     |
| - Excess/obsolete inventory: Target <5%         |
|                                                  |
| LOGISTICS                                        |
| - On-time delivery: Target >95%                 |
| - Order accuracy: Target >99%                   |
| - Shipping cost as % of revenue: Benchmark      |
| - Lead time: Days from order to delivery        |
|                                                  |
| PROCUREMENT                                      |
| - Cost savings vs. market: Target >5%           |
| - Supplier on-time delivery: Target >95%        |
| - Supplier quality: Defect rate <1%             |
| - Procurement cycle time: Days from request     |
+--------------------------------------------------+
```

---

**Supply chain fundamentals apply to every business that delivers value
to customers. The Operations Brain applies demand planning, inventory
optimization, logistics design, and strategic sourcing to ensure the
organization delivers the right products at the right time at the right
cost.**

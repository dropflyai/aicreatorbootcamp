# Startup Economics — Financial Dynamics of New Ventures

## What This Enables

**Decisions it helps make:**
- How to manage burn rate and runway
- When to raise capital and how much
- How to evaluate unit economics evolution
- How to assess whether a startup is on track

---

## 1. The J-Curve of Venture Returns

### 1.1 Fund-Level J-Curve

VC funds experience negative returns in early years (investment period + management fees) before portfolio companies mature and generate returns.

```
Return
  |
  |                                    *  *  *
  |                                 *
  |                              *
  |                           *
  |─────────────────────────*─────────── Time
  |        *              *
  |     *              *
  |   *             *
  |  *           *
  |*          *
  |        *
  |     *
```

**Typical timeline:**
- Years 1-3: Negative returns (deploying capital, paying fees)
- Years 3-5: Some write-ups, a few markdowns
- Years 5-7: Early exits, distributions begin
- Years 7-10: Major exits, fund returns crystallize

### 1.2 Company-Level J-Curve

Individual startups also follow a J-curve:
- Early: cash outflows exceed revenues (R&D, hiring, go-to-market)
- Mid: revenue ramps but may still trail expenses
- Mature: revenue exceeds expenses, generating positive cash flow

---

## 2. Burn Rate Management

### 2.1 Definitions

**Gross burn rate:** Total cash spent per month (all expenses).

**Net burn rate:** Total cash spent minus total cash received (burn net of revenue).

```
Net Burn = Gross Expenses - Revenue
Runway (months) = Cash Balance / Net Burn Rate
```

### 2.2 Burn Rate Benchmarks

| Stage | Typical Monthly Burn | Runway Target |
|-------|---------------------|---------------|
| Pre-seed (2-3 people) | $20-50K | 18-24 months |
| Seed (5-10 people) | $50-150K | 18-24 months |
| Series A (15-30 people) | $150-400K | 18-24 months |
| Series B (30-80 people) | $400K-$1.5M | 18-24 months |

### 2.3 Burn Multiple

*Source: Suster, M. (2021). "The Burn Multiple."*

```
Burn Multiple = Net Burn / Net New ARR
```

Measures how much cash you burn for each dollar of new ARR generated.

| Burn Multiple | Rating |
|--------------|--------|
| < 1x | Exceptional (adding more ARR than burning) |
| 1-1.5x | Great |
| 1.5-2x | Good |
| 2-3x | Mediocre |
| > 3x | Concerning (burning too much for too little growth) |

---

## 3. Runway Calculation

### 3.1 Simple Runway

```
Runway = Cash / Monthly Net Burn
```

### 3.2 Dynamic Runway (Accounting for Growth)

If revenue is growing, runway extends:

```
Month N cash = Cash_0 - sum_{i=1}^{N} (Expenses_i - Revenue_i)
```

With constant expense growth rate g_e and revenue growth rate g_r:

```
Month N cash = Cash_0 - sum_{i=1}^{N} [Expenses_0(1+g_e)^i - Revenue_0(1+g_r)^i]
```

### 3.3 Default Alive vs. Default Dead

*Citation: Graham, P. (2015). "Default Alive or Default Dead?"*

```
If (Revenue Growth Rate, Current Expenses) -> Profitability before cash runs out:
  DEFAULT ALIVE

If not:
  DEFAULT DEAD
```

**Calculation:**
1. Project revenue at current growth rate
2. Project expenses at current level (or trend)
3. When does revenue exceed expenses?
4. Is that before or after cash runs out?

**Strategic implications:**
- Default alive: You have leverage (can negotiate from strength)
- Default dead: You must either raise capital or cut costs (urgency)

---

## 4. Unit Economics Evolution

### 4.1 Early Stage (Pre-PMF)

Unit economics are typically negative or unclear:
- CAC is high (inefficient channels, no brand)
- LTV is unknown (no retention data)
- Contribution margins may be negative (subsidies, manual processes)

**Focus:** Validate that customers exist, not that unit economics work.

### 4.2 Growth Stage (Post-PMF, Pre-Scale)

Unit economics become visible but may not be optimized:
- CAC begins to stabilize as channels mature
- LTV estimates become reliable with 6-12 months of cohort data
- LTV:CAC ratio should be trending toward 3:1

**Focus:** Prove that unit economics can work at scale.

### 4.3 Scale Stage

Unit economics should be optimized:
- CAC benefits from brand, word-of-mouth, and channel maturity
- LTV increases with better retention and expansion revenue
- LTV:CAC > 3:1 consistently
- Payback period < 12-18 months

### 4.4 Unit Economics Maturity Framework

```
Metric          Seed         Series A       Series B+
────────────────────────────────────────────────────
CAC             Unknown      Measured       Optimized
LTV             Projected    Estimated      Proven
LTV:CAC         N/A          1-3x          3-5x
Payback         Unknown      18-24 months   8-14 months
Gross Margin    Estimate     Tracked        Improving
Contribution    Negative     Breakeven      Positive
```

---

## 5. Fundraising Timing

### 5.1 When to Raise

**Optimal timing:**
- 6+ months of runway remaining (raise from strength)
- After achieving a meaningful milestone (leverage in negotiation)
- When market conditions are favorable (rising valuations, available capital)
- When capital will clearly accelerate an identified opportunity

**Suboptimal timing:**
- < 3 months runway (desperation position)
- Between milestones (nothing new to sell)
- During market downturns (poor terms)
- Without a clear use of funds

### 5.2 How Much to Raise

```
Target Raise = Monthly Net Burn x Months to Next Milestone x Safety Factor

Where:
- Months to next milestone: 12-24 months
- Safety factor: 1.3-1.5x (for plan deviations)
```

### 5.3 Milestone-Based Fundraising

Each round should fund the company to achieve milestones that justify the next round at a higher valuation:

```
Pre-Seed ($250K-$1M):  -> Prove the problem exists, build initial product
Seed ($1-3M):          -> Achieve early product-market fit
Series A ($5-15M):     -> Prove repeatable customer acquisition
Series B ($15-40M):    -> Prove unit economics, scale go-to-market
Series C+ ($40M+):     -> Scale to market leadership
```

### 5.4 The Fundraising Process

```
Typical timeline: 3-6 months end-to-end

Month 1: Preparation (deck, model, data room, target list)
Month 2: Initial meetings (20-40 meetings over 2-3 weeks)
Month 3: Deep dives with interested investors (5-10)
Month 4: Term sheets, negotiation, diligence
Month 5: Close (legal documentation, wire)
```

---

## 6. Valuation at Each Stage

### 6.1 Pre-Revenue Valuation Drivers

| Factor | Higher Valuation | Lower Valuation |
|--------|-----------------|-----------------|
| Founding team | Proven operators, domain experts | First-time founders |
| Market size | Large, growing TAM | Niche, static market |
| Traction | Early users, waitlist, LOIs | Idea stage |
| Technology | Defensible IP, hard to replicate | Commodity technology |
| Competitive landscape | Few competitors, clear differentiation | Crowded market |
| Macro conditions | Bull market, ample funding | Bear market, tight funding |

### 6.2 Typical Valuation Ranges (US Market)

```
Pre-Seed:   $2-6M post-money (2024-2025 range)
Seed:       $6-15M post-money
Series A:   $20-60M post-money
Series B:   $60-200M post-money
Series C:   $150-500M+ post-money
```

These ranges vary significantly by sector, geography, and market conditions.

---

## Key Citations

- Blank, S. (2013). *The Startup Owner's Manual*. K&S Ranch.
- Graham, P. (2015). Default Alive or Default Dead? paulgraham.com.
- Kupor, S. (2019). *Secrets of Sand Hill Road*. Portfolio/Penguin.
- Ries, E. (2011). *The Lean Startup*. Crown Business.

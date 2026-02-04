# Valuation — Formal Methods and Derivations

## What This Enables

**Decisions it helps make:**
- What is this business worth?
- Which valuation method is most appropriate?
- How sensitive is the valuation to key assumptions?
- How to evaluate acquisition targets, fundraising terms, and exit opportunities

---

## 1. Discounted Cash Flow (DCF) — Formal Derivation

### 1.1 Theoretical Foundation

The value of any asset is the present value of its expected future cash flows.

*Citation: Fisher, I. (1930). The Theory of Interest. Macmillan.*

**General formula:**

```
V_0 = sum_{t=1}^{infinity} E[CF_t] / (1 + r)^t
```

where r is the appropriate risk-adjusted discount rate.

### 1.2 Free Cash Flow to Firm (FCFF) Model

```
FCFF_t = EBIT_t(1 - tau) + D&A_t - CapEx_t - Delta_WC_t
```

where:
- tau = corporate tax rate
- D&A = depreciation and amortization
- CapEx = capital expenditures
- Delta_WC = change in net working capital

**Enterprise Value:**

```
EV = sum_{t=1}^{T} FCFF_t / (1 + WACC)^t + TV_T / (1 + WACC)^T
```

### 1.3 WACC Calculation

**Weighted Average Cost of Capital:**

```
WACC = (E / (D + E)) * r_E + (D / (D + E)) * r_D * (1 - tau)
```

**Cost of equity (CAPM):**

```
r_E = r_f + beta * (E[R_m] - r_f)
```

Typical inputs:
- r_f: 10-year Treasury yield (currently ~4-5%)
- beta: regression beta against market index (or industry beta, relevered)
- Market risk premium: 5-7% (historical) or 4-6% (survey-based)

**Levered beta from unlevered beta:**

```
beta_L = beta_U * [1 + (1 - tau)(D/E)]
```

**Cost of debt:**

```
r_D = yield to maturity on existing debt (or spread + risk-free rate)
```

### 1.4 Terminal Value

Terminal value typically represents 60-80% of total DCF value. Two approaches:

**Gordon Growth Model (perpetuity approach):**

```
TV_T = FCFF_{T+1} / (WACC - g)
```

where g is the perpetual growth rate. Key constraint: g < WACC, and typically g <= long-term GDP growth (~2-3%).

**Derivation:** Starting from the infinite sum:

```
TV_T = sum_{s=1}^{infinity} FCFF_{T}(1+g)^s / (1+WACC)^s
     = FCFF_T(1+g) / (WACC - g)       [geometric series convergence for g < WACC]
```

**Exit Multiple approach:**

```
TV_T = EBITDA_T * Exit Multiple
```

Common multiples: EV/EBITDA exit multiples drawn from comparable companies.

### 1.5 Sensitivity Analysis

Always present DCF results as ranges, not point estimates.

**Two-variable sensitivity table:**

```
                    WACC
              8%     9%     10%    11%    12%
g = 1%       $150M  $130M  $115M  $102M  $92M
g = 2%       $175M  $150M  $130M  $115M  $103M
g = 3%       $210M  $175M  $150M  $130M  $115M
g = 4%       $265M  $210M  $175M  $150M  $130M
```

---

## 2. Comparable Company Analysis (Comps)

### 2.1 Method

Value the target by applying valuation multiples from similar publicly traded companies.

**Steps:**
1. Select comparable companies (industry, size, growth, margin profile)
2. Calculate relevant multiples for each comp
3. Apply median or mean multiple to target's financials

### 2.2 Common Multiples

| Multiple | Formula | Best For |
|----------|---------|----------|
| EV/Revenue | Enterprise Value / Revenue | High-growth, pre-profit companies |
| EV/EBITDA | Enterprise Value / EBITDA | Most industries; normalized profitability |
| EV/EBIT | Enterprise Value / EBIT | Capital-intensive industries |
| P/E | Price / Earnings Per Share | Mature, profitable companies |
| P/B | Price / Book Value | Financial institutions, asset-heavy firms |
| EV/FCF | Enterprise Value / Free Cash Flow | Cash flow focused analysis |

**Why Enterprise Value multiples?**
EV-based multiples are capital-structure neutral — they measure value to all investors (debt + equity), not just equity holders. EV/EBITDA is comparable across companies with different leverage.

### 2.3 SaaS Valuation Multiples

For SaaS companies, revenue-based multiples dominate because many are pre-profit:

```
EV/ARR multiple = f(growth rate, NRR, margins, market size)
```

**Benchmarks (2024-2025 range):**
- Hyper-growth (>40% YoY): 10-20x ARR
- Fast growth (25-40% YoY): 6-12x ARR
- Moderate growth (15-25% YoY): 4-8x ARR
- Slow growth (<15% YoY): 2-5x ARR

Adjusted by: Rule of 40 score, NRR, gross margin, TAM.

---

## 3. Precedent Transactions

### 3.1 Method

Value the target by applying multiples from comparable M&A transactions.

**Key adjustment:** Transaction multiples typically include a **control premium** (20-40% above market price) reflecting the value of control.

### 3.2 Premium Analysis

```
Control Premium = (Offer Price - Unaffected Price) / Unaffected Price
```

Median control premium in M&A: ~25-35% (varies by market conditions and deal type).

---

## 4. Leveraged Buyout (LBO) Analysis

### 4.1 Concept

Determines the maximum price a financial buyer (PE fund) can pay while achieving target returns (typically 20-25% IRR).

### 4.2 LBO Model Structure

```
1. Purchase price = EBITDA x Entry Multiple
2. Debt = Purchase Price x Leverage Ratio (typically 4-6x EBITDA)
3. Equity = Purchase Price - Debt
4. Project cash flows over hold period (5-7 years)
5. Use FCFF to pay down debt
6. Exit at assumed multiple
7. Calculate equity value at exit = Exit EV - Remaining Debt
8. IRR = (Exit Equity / Entry Equity)^(1/years) - 1
```

### 4.3 Sources of LBO Returns

```
Total Return = Multiple Expansion + EBITDA Growth + Debt Paydown

IRR = f(entry multiple, exit multiple, revenue growth, margin improvement, leverage)
```

**Value creation levers:**
- Revenue growth (organic + add-on acquisitions)
- Margin expansion (cost cutting, operational improvements)
- Multiple expansion (market conditions, strategic positioning)
- Debt paydown (using free cash flow to reduce leverage)

---

## 5. Real Options Valuation

### 5.1 When to Use

Standard DCF undervalues companies with significant managerial flexibility:
- Option to expand into new markets
- Option to delay investment until uncertainty resolves
- Option to abandon failing projects
- Option to switch between inputs or outputs

### 5.2 Framework

*Citation: Dixit, A. K., & Pindyck, R. S. (1994). Investment Under Uncertainty. Princeton University Press.*

Map business decisions to option types:

| Business Decision | Option Analog | Key Variable |
|------------------|--------------|-------------|
| Delay market entry | American call | Volatility of market opportunity |
| Expand production | Call option | Growth of demand |
| Abandon project | Put option | Decline in project value |
| Switch technology | Exchange option | Relative value of technologies |
| Stage investment | Compound option | Resolution of uncertainty |

### 5.3 Simplified Binomial Approach

For a two-period investment decision:

```
              S*u (up state, probability p)
S (now) --<
              S*d (down state, probability 1-p)
```

Risk-neutral probability: p = (1 + r - d) / (u - d)

Option value: C = [p * C_u + (1-p) * C_d] / (1 + r)

where C_u and C_d are option payoffs in up and down states.

---

## 6. Valuation in Practice

### 6.1 Triangulation

Never rely on a single method. Use multiple approaches and triangulate:

```
Method             Value Range    Weight
DCF                $120M - $180M  40%
Comps              $100M - $150M  30%
Precedent Txns     $130M - $170M  20%
LBO (floor)        $90M - $110M   10%
─────────────────────────────────────
Blended Range      $110M - $160M
Midpoint           ~$135M
```

### 6.2 Common Valuation Errors

1. **Optimistic revenue projections** — Use base rates for growth (most companies decelerate)
2. **Terminal value dominance** — If TV > 75% of total value, your explicit forecast is too short or growth assumptions too aggressive
3. **WACC misestimation** — Small changes in WACC produce large changes in value
4. **Circular reference** — WACC depends on D/E ratio, which depends on equity value, which depends on WACC
5. **Ignoring dilution** — Stock options, warrants, and convertibles dilute equity value
6. **Double-counting risk** — Risk should be in either the discount rate or the cash flows, not both

---

## Key Citations

- Berk, J., & DeMarzo, P. (2020). *Corporate Finance* (5th ed.). Pearson.
- Damodaran, A. (2012). *Investment Valuation* (3rd ed.). Wiley.
- Dixit, A. K., & Pindyck, R. S. (1994). *Investment Under Uncertainty*. Princeton University Press.
- Koller, T., Goedhart, M., & Wessels, D. (2020). *Valuation* (7th ed.). McKinsey/Wiley.
- Rosenbaum, J., & Pearl, J. (2022). *Investment Banking* (3rd ed.). Wiley.

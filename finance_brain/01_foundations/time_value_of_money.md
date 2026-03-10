# Time Value of Money

## Foundation

The time value of money (TVM) is the most fundamental concept in finance. A dollar
today is worth more than a dollar tomorrow because of its earning potential. Every
valuation, every capital budgeting decision, every loan amortization, and every
investment analysis rests on this principle. As Brealey, Myers, and Allen state in
Principles of Corporate Finance: "A dollar today is worth more than a dollar
tomorrow, because the dollar today can be invested to start earning interest
immediately."

Reference: Brealey/Myers/Allen, Principles of Corporate Finance (13th Edition),
Chapters 2-6. CFA Level I, Quantitative Methods: Time Value of Money.

---

## Core Formulas

### Future Value (FV)

The value of a present amount compounded forward in time.

```
FV = PV * (1 + r)^n

Where:
  PV = present value (the amount today)
  r  = periodic interest rate (annual rate / compounding periods per year)
  n  = number of compounding periods
```

**Example:** $100,000 invested at 8% annually for 10 years:
```
FV = $100,000 * (1.08)^10 = $100,000 * 2.1589 = $215,892.50
```

### Present Value (PV)

The current value of a future amount discounted back to today.

```
PV = FV / (1 + r)^n = FV * (1 + r)^(-n)
```

**Example:** What is $1,000,000 received in 5 years worth today at 10% discount?
```
PV = $1,000,000 / (1.10)^5 = $1,000,000 / 1.6105 = $620,921.32
```

### Continuous Compounding

When compounding frequency approaches infinity:

```
FV = PV * e^(r*t)
PV = FV * e^(-r*t)

Where:
  e  = Euler's number (approximately 2.71828)
  r  = continuously compounded rate
  t  = time in years
```

Conversion between discrete and continuous rates:
```
r_continuous = ln(1 + r_discrete)
r_discrete = e^(r_continuous) - 1
```

---

## Annuity Formulas

### Present Value of an Ordinary Annuity

Payments occur at the end of each period.

```
PV_annuity = PMT * [(1 - (1 + r)^(-n)) / r]
```

**Example:** What is the PV of $50,000/year for 10 years at 8%?
```
PV = $50,000 * [(1 - (1.08)^(-10)) / 0.08]
PV = $50,000 * [1 - 0.4632 / 0.08]
PV = $50,000 * 6.7101 = $335,504
```

### Present Value of an Annuity Due

Payments occur at the beginning of each period.

```
PV_annuity_due = PMT * [(1 - (1 + r)^(-n)) / r] * (1 + r)
```

### Future Value of an Ordinary Annuity

```
FV_annuity = PMT * [((1 + r)^n - 1) / r]
```

### Growing Annuity

Payments that grow at a constant rate g per period.

```
PV_growing_annuity = PMT / (r - g) * [1 - ((1 + g) / (1 + r))^n]
```

Requires r > g. If r = g, the formula becomes: PV = n * PMT / (1 + r).

### Perpetuity

An infinite stream of equal payments.

```
PV_perpetuity = PMT / r
```

### Growing Perpetuity

An infinite stream of payments growing at rate g.

```
PV_growing_perpetuity = PMT / (r - g)

Requires: r > g (otherwise the sum diverges)
```

This is the **Gordon Growth Model** -- the foundation of terminal value in DCF
analysis and dividend discount models.

---

## Net Present Value (NPV)

The gold standard for investment decision-making per Brealey/Myers/Allen.

```
NPV = sum from t=0 to n of [CF_t / (1 + r)^t]

Equivalently:
NPV = -Initial Investment + CF_1/(1+r)^1 + CF_2/(1+r)^2 + ... + CF_n/(1+r)^n
```

### Decision Rule

| NPV Result | Decision | Interpretation |
|-----------|----------|----------------|
| NPV > 0 | Accept | Project creates value above required return |
| NPV = 0 | Indifferent | Project earns exactly the required return |
| NPV < 0 | Reject | Project destroys value |

### NPV Properties (Per Brealey/Myers/Allen)

1. **Additivity**: NPV of combined projects = sum of individual NPVs
2. **Uses cash flows**: Not accounting earnings
3. **Time-adjusted**: Accounts for when cash flows occur
4. **Risk-adjusted**: Through the discount rate selection
5. **Absolute measure**: Tells you the dollar value created

### NPV Example: SaaS Investment Decision

Should we invest $500K in a new product feature?
```
Year 0: -$500,000 (development cost)
Year 1: +$100,000 (incremental revenue minus incremental cost)
Year 2: +$200,000
Year 3: +$250,000
Year 4: +$200,000
Year 5: +$150,000
Discount rate: 12% (company WACC)

NPV = -500,000 + 100,000/1.12 + 200,000/1.2544 + 250,000/1.4049
      + 200,000/1.5735 + 150,000/1.7623

NPV = -500,000 + 89,286 + 159,439 + 177,902 + 127,098 + 85,131

NPV = +$138,856

Decision: Accept. The project creates $138,856 in value above the 12% return.
```

---

## Internal Rate of Return (IRR)

The discount rate at which NPV equals zero. Solved iteratively (no closed-form
solution for n > 4).

```
0 = sum from t=0 to n of [CF_t / (1 + IRR)^t]
```

### Decision Rule

Accept if IRR > required rate of return (hurdle rate / WACC).

### IRR Limitations

1. **Reinvestment assumption**: IRR assumes cash flows are reinvested at the IRR
   itself, which may be unrealistic for high-IRR projects
2. **Multiple IRRs**: Non-conventional cash flows (sign changes > 1) can produce
   multiple IRRs, making the decision ambiguous
3. **Scale problem**: IRR ignores project size. A 50% return on $1 is less
   valuable than a 20% return on $1,000,000
4. **Mutually exclusive projects**: IRR can rank projects differently than NPV.
   NPV is always the correct ranking for mutually exclusive projects

### Modified Internal Rate of Return (MIRR)

Addresses the reinvestment assumption by assuming reinvestment at WACC:

```
MIRR = (Terminal Value of Inflows / PV of Outflows)^(1/n) - 1

Where:
  Terminal Value of Inflows = sum of [positive CF_t * (1 + reinvestment_rate)^(n-t)]
  PV of Outflows = sum of [negative CF_t / (1 + finance_rate)^t]
```

---

## Discount Rate Derivation

### Cost of Equity: CAPM

```
R_e = R_f + beta * (R_m - R_f)

Where:
  R_f   = risk-free rate (10-year US Treasury yield)
  beta  = systematic risk of the equity
  R_m   = expected market return
  (R_m - R_f) = equity risk premium (ERP)
```

Per Damodaran (January 2024 update):
- US ERP: approximately 4.60% (implied from S&P 500 level)
- Risk-free rate: use current 10-year Treasury yield
- Beta: regressed against S&P 500, use 2-5 year monthly data

### Modified CAPM for Private Companies

```
R_e = R_f + beta * ERP + Size Premium + Company-Specific Risk Premium

Where:
  Size Premium: Duff & Phelps data, ranges from 1-6% for micro-cap
  Company-Specific Risk Premium: 0-5% for private company illiquidity,
    key person risk, customer concentration, etc.
```

### Cost of Debt

```
R_d = yield on company's long-term debt (or synthetic rating approach)
R_d_after_tax = R_d * (1 - T)

Where:
  T = marginal tax rate
```

For companies without traded debt, use the synthetic rating approach (Damodaran):
1. Calculate interest coverage ratio: EBIT / Interest Expense
2. Map to synthetic credit rating
3. Apply default spread for that rating to the risk-free rate

### WACC (Weighted Average Cost of Capital)

```
WACC = (E/V) * R_e + (D/V) * R_d * (1 - T)

Where:
  E = market value of equity
  D = market value of debt
  V = E + D (total firm value)
  R_e = cost of equity (from CAPM)
  R_d = pre-tax cost of debt
  T = marginal corporate tax rate
```

**WACC Derivation Example:**

```
Given:
  Equity: $80M market cap, beta = 1.2
  Debt: $20M (book approximately market), yield = 5%
  Risk-free rate: 4.0%, ERP: 5.0%, Tax rate: 21%

Step 1: Cost of Equity
  R_e = 4.0% + 1.2 * 5.0% = 10.0%

Step 2: After-Tax Cost of Debt
  R_d * (1-T) = 5.0% * (1 - 0.21) = 3.95%

Step 3: Weights
  E/V = 80/100 = 80%
  D/V = 20/100 = 20%

Step 4: WACC
  WACC = 0.80 * 10.0% + 0.20 * 3.95% = 8.0% + 0.79% = 8.79%
```

---

## Capital Budgeting Decision Criteria Comparison

| Criterion | Formula | Decision Rule | Strengths | Weaknesses |
|-----------|---------|--------------|-----------|------------|
| NPV | Sum of discounted CFs | Accept if > 0 | Gold standard, absolute value | Requires accurate discount rate |
| IRR | Rate where NPV = 0 | Accept if > hurdle | Intuitive percentage return | Multiple IRRs, scale-blind |
| MIRR | Modified reinvestment | Accept if > hurdle | Fixes reinvestment issue | Less intuitive |
| Payback Period | Years to recover investment | Accept if < target | Simple, liquidity focus | Ignores TVM, ignores CFs after payback |
| Discounted Payback | Years to recover PV of investment | Accept if < target | Adds TVM to payback | Still ignores CFs after payback |
| Profitability Index | PV of inflows / PV of outflows | Accept if > 1 | Useful for capital rationing | Relative, not absolute |

### Hierarchy (Per Brealey/Myers/Allen)

1. **NPV**: Always use. The definitive measure of value creation.
2. **IRR**: Useful as a supplementary measure for communication.
3. **Payback**: Only for quick screening, never as the sole criterion.
4. **PI**: Useful when capital is rationed (rank by PI to maximize NPV per dollar).

---

## Loan Amortization

### Calculating the Payment

```
PMT = PV * [r * (1 + r)^n] / [(1 + r)^n - 1]
```

### Amortization Schedule Construction

For each period t:
```
Interest_t = Beginning Balance_t * r
Principal_t = PMT - Interest_t
Ending Balance_t = Beginning Balance_t - Principal_t
```

**Example:** $1,000,000 loan, 5% annual rate, 5-year term, annual payments.

```
PMT = $1,000,000 * [0.05 * 1.05^5] / [1.05^5 - 1]
PMT = $1,000,000 * [0.05 * 1.2763] / [1.2763 - 1]
PMT = $1,000,000 * 0.06381 / 0.27628
PMT = $230,975

Year 1: Interest = $50,000, Principal = $180,975, Balance = $819,025
Year 2: Interest = $40,951, Principal = $190,024, Balance = $629,001
Year 3: Interest = $31,450, Principal = $199,525, Balance = $429,476
Year 4: Interest = $21,474, Principal = $209,501, Balance = $219,975
Year 5: Interest = $10,999, Principal = $219,975, Balance = $0
```

---

## Application: Startup Decision Framework

When evaluating any investment or expenditure, apply TVM rigorously:

1. **Identify all cash flows** (both inflows and outflows, including opportunity costs)
2. **Determine timing** (when does each cash flow occur?)
3. **Select appropriate discount rate** (WACC for firm-level, cost of equity for equity)
4. **Calculate NPV** (the primary decision metric)
5. **Perform sensitivity analysis** (how does NPV change with +/- 2% discount rate?)
6. **Consider real options** (value of flexibility, ability to delay, expand, or abandon)

---

**The time value of money is not merely a formula -- it is a way of thinking.
Every financial decision implicitly makes a TVM assumption. The Finance Brain
makes those assumptions explicit.**

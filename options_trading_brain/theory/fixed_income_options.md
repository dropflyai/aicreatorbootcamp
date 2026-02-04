# Fixed Income and Interest Rate Options

**Prerequisite:** Stochastic calculus, bond mathematics, term structure theory
**Relevance:** Swaptions, caps/floors, bond options, interest rate risk management

---

## 1. Bond Mathematics Foundation

### Present Value and Yield

A bond with cash flows C_i at times t_i has present value:

```
PV = sum_i C_i * exp(-y * t_i)     (continuous compounding)
PV = sum_i C_i / (1 + y/m)^{m*t_i} (m-times compounding)
```

where y is the yield to maturity (YTM) -- the single discount rate that equates PV to market price.

### Duration (Macaulay Duration)

```
D_Mac = (1/PV) * sum_i t_i * C_i * exp(-y * t_i)
```

Duration is the weighted-average time to receive cash flows. It measures the bond's sensitivity to parallel shifts in the yield curve.

### Modified Duration

```
D_Mod = D_Mac / (1 + y/m)
```

For a small change in yield dy:

```
dP/P = -D_Mod * dy
```

### Dollar Duration (DV01)

```
DV01 = D_Mod * PV / 10,000
```

DV01 is the dollar change in bond price for a 1 basis point (0.01%) change in yield. This is the primary risk metric for fixed income portfolios.

### Convexity

```
C = (1/PV) * sum_i t_i^2 * C_i * exp(-y * t_i)
```

Second-order price sensitivity:

```
dP/P = -D_Mod * dy + (1/2) * C * (dy)^2
```

Convexity is always positive for option-free bonds (price-yield curve is convex). Bonds with embedded options (callable, putable) have different convexity profiles.

### Key Relationships

| Metric | Definition | Units | Intuition |
|--------|-----------|-------|-----------|
| Macaulay Duration | Weighted-avg time | Years | How long until you get your money |
| Modified Duration | Price sensitivity | %/yield change | First-order risk |
| DV01 | Dollar sensitivity | $/bp | How much you lose per bp |
| Convexity | Curvature | Years^2 | Second-order benefit from large moves |

---

## 2. Yield Curve Models

### Bootstrap Method

Extract zero-coupon yields (spot rates) from observed bond prices:

1. Use the shortest maturity instrument to get z(t_1)
2. Use next instrument and previously bootstrapped rates to get z(t_2)
3. Continue iteratively to build the full zero curve

### Forward Rates

The instantaneous forward rate f(t, T) at time t for maturity T:

```
f(t, T) = -d/dT [ln P(t, T)]
```

where P(t, T) is the zero-coupon bond price. The spot rate is the average of forward rates:

```
z(t, T) = (1/(T-t)) * integral_t^T f(t, s) ds
```

### Nelson-Siegel Model (1987)

Parameterize the instantaneous forward rate:

```
f(tau) = beta_0 + beta_1 * exp(-tau/lambda) + beta_2 * (tau/lambda) * exp(-tau/lambda)
```

Integrating gives the zero rate:

```
z(tau) = beta_0 + beta_1 * [(1 - exp(-tau/lambda)) / (tau/lambda)]
                + beta_2 * [(1 - exp(-tau/lambda)) / (tau/lambda) - exp(-tau/lambda)]
```

Parameters:
- beta_0: Long-term level (asymptote)
- beta_1: Short-term component (slope)
- beta_2: Medium-term component (curvature)
- lambda: Decay factor (controls the hump location)

### Svensson Extension (1994)

Adds a second hump term:

```
z(tau) = NS(tau) + beta_3 * [(1 - exp(-tau/lambda_2)) / (tau/lambda_2) - exp(-tau/lambda_2)]
```

This allows more flexibility in fitting the long end of the curve.

### Principal Component Analysis of Yield Curves

Empirically, three factors explain ~98% of yield curve movements:

| Factor | % Variance | Shape | Interpretation |
|--------|-----------|-------|----------------|
| PC1 | ~85% | Level (flat shift) | All rates move together |
| PC2 | ~10% | Slope (twist) | Short and long rates move opposite |
| PC3 | ~3% | Curvature (butterfly) | Medium rates move vs. ends |

This is critical for hedging: hedge PC1 with duration, PC2 with flattener/steepener, PC3 with butterfly.

---

## 3. Short-Rate Models

### Vasicek Model (1977)

```
dr = kappa * (theta - r) * dt + sigma * dW
```

- **Mean-reverting:** Rate reverts to theta at speed kappa
- **Normal distribution:** Rate can go negative (problematic but used in practice)
- **Affine model:** Bond prices have closed-form exponential-affine solutions

**Bond price:**
```
P(t, T) = A(t, T) * exp(-B(t, T) * r_t)
```

where A and B are deterministic functions of model parameters.

**Pros:** Analytic solutions for bonds, European options, caps, and swaptions.
**Cons:** Negative rates possible; constant volatility.

### Cox-Ingersoll-Ross (CIR) Model (1985)

```
dr = kappa * (theta - r) * dt + sigma * sqrt(r) * dW
```

- **Non-negative rates:** The sqrt(r) term ensures r stays positive (if 2*kappa*theta > sigma^2)
- **Mean-reverting:** Same mean-reversion as Vasicek
- **Affine model:** Closed-form bond prices

**Feller condition:** 2*kappa*theta >= sigma^2 ensures rates stay strictly positive.

### Hull-White (Extended Vasicek, 1990)

```
dr = [theta(t) - a * r] * dt + sigma * dW
```

The time-dependent theta(t) allows exact calibration to the initial term structure:

```
theta(t) = dF(0,t)/dt + a*F(0,t) + sigma^2/(2*a) * (1 - exp(-2*a*t))
```

where F(0, t) is the market-implied instantaneous forward rate.

**Key advantage:** Matches today's yield curve exactly (no-arbitrage with observed market).

### Comparison of Short-Rate Models

| Model | Mean Reversion | Rate Distribution | Neg. Rates | Calibration to Curve |
|-------|---------------|-------------------|------------|---------------------|
| Vasicek | Yes | Normal | Yes | No (constant theta) |
| CIR | Yes | Chi-squared | No | No (constant theta) |
| Hull-White | Yes | Normal | Yes | Yes (theta(t)) |
| Black-Karasinski | Yes | Lognormal | No | Yes |

---

## 4. Heath-Jarrow-Morton (HJM) Framework (1992)

### Philosophy

Instead of modeling the short rate, model the entire forward curve directly.

### Forward Rate Dynamics

```
df(t, T) = alpha(t, T) * dt + sigma(t, T) * dW_t
```

### HJM Drift Condition

Under the risk-neutral measure, the drift is determined by the volatility:

```
alpha(t, T) = sigma(t, T) * integral_t^T sigma(t, s) ds
```

This is the fundamental result: once you specify the volatility structure sigma(t, T), the drift is completely determined by no-arbitrage.

### Practical Implementation

The HJM framework is infinite-dimensional (the state is the entire forward curve). Practical implementations:

1. **Factor models:** Express sigma(t, T) in terms of a few factors
2. **LIBOR Market Model (BGM):** Discretize to model individual forward LIBOR rates
3. **Markov-functional models:** Project onto a finite-dimensional Markov process

### LIBOR Market Model (Brace-Gatarek-Musiela, 1997)

Model discrete forward rates F_i(t) (LIBOR rates) directly:

```
dF_i(t) / F_i(t) = mu_i(t) dt + sigma_i(t) * dW_t
```

Advantages:
- Forward rates are directly observable (LIBOR, SOFR)
- Natural for pricing caps and floors
- Market-standard for swaption pricing

---

## 5. Swaptions

### Interest Rate Swap

Exchange fixed-rate payments for floating-rate payments:

```
Swap value (receiver) = PV(fixed leg) - PV(floating leg)
```

The par swap rate S(t, T_start, T_end) is the fixed rate that makes the swap have zero value at inception.

### Swaption

An option to enter into a swap at a future date:
- **Payer swaption:** Right to pay fixed, receive floating (benefits from rising rates)
- **Receiver swaption:** Right to receive fixed, pay floating (benefits from falling rates)

### Black's Model for Swaptions

Under the "annuity measure," the forward swap rate is a martingale. Apply Black's formula:

```
Payer swaption = A(0) * [S_0 * N(d_1) - K * N(d_2)]
```

where:
- A(0) = annuity factor (PV of $1 per period over the swap tenor)
- S_0 = current forward swap rate
- K = strike swap rate
- d_1, d_2 defined as in Black-Scholes with sigma = swaption vol

### Normal (Bachelier) Model

When rates are near zero or negative, use the normal model:

```
Payer swaption = A(0) * [(S_0 - K) * N(d) + sigma_n * sqrt(T) * n(d)]
```

where d = (S_0 - K) / (sigma_n * sqrt(T)) and sigma_n is the normal volatility (basis points).

### Swaption Volatility Cube

Swaption vol depends on three dimensions:
- **Option expiry** (1m, 3m, 6m, 1y, ..., 10y)
- **Swap tenor** (1y, 2y, ..., 30y)
- **Strike** (ATM +/- X bps)

The full cube is used for exotic interest rate derivative pricing.

---

## 6. Caps, Floors, and Collars

### Interest Rate Cap

A cap is a portfolio of caplets. Each caplet is a call option on a forward rate:

```
Caplet payoff = delta * N * max(L_i - K, 0)
```

where L_i is the LIBOR/SOFR rate for period i, K is the cap strike, delta is the day-count fraction, and N is the notional.

### Black's Formula for Caplets

```
Caplet = delta * N * P(0, T_{i+1}) * [F_i * N(d_1) - K * N(d_2)]
```

where F_i is the forward rate for the relevant period.

### Interest Rate Floor

A floor is a portfolio of floorlets (put options on forward rates):

```
Floorlet payoff = delta * N * max(K - L_i, 0)
```

### Cap-Floor Parity

```
Cap - Floor = Swap (payer)
```

Analogous to put-call parity for equity options.

### Collar

Buy a cap at strike K_cap, sell a floor at strike K_floor:

```
Collar payoff = max(L - K_cap, 0) - max(K_floor - L, 0)
```

Limits both upside and downside rate exposure. Often used by corporates to bound their borrowing costs.

---

## 7. Bond Options

### European Bond Option

Option on a zero-coupon bond with maturity T_B, option expiry T_O < T_B:

Under the Hull-White model:

```
Call on ZCB = P(0, T_B) * N(h) - K * P(0, T_O) * N(h - sigma_P)
```

where:
```
sigma_P = (sigma/a) * (1 - exp(-a*(T_B - T_O))) * sqrt((1 - exp(-2*a*T_O)) / (2*a))
h = (1/sigma_P) * ln(P(0, T_B) / (K * P(0, T_O))) + sigma_P / 2
```

### Callable and Putable Bonds

- **Callable bond:** Issuer has the right to redeem early (embedded call option)
- **Putable bond:** Holder has the right to sell back early (embedded put option)

Pricing requires tree or finite difference methods with early exercise.

### Option-Adjusted Spread (OAS)

The constant spread added to the risk-free rate in a model that equates the model price to the market price of a bond with embedded options. OAS isolates the credit/liquidity spread from the option value.

---

## 8. Credit Derivatives

### Credit Default Swap (CDS)

- **Protection buyer:** Pays periodic premium (CDS spread) to protection seller
- **Protection seller:** Pays par minus recovery if a credit event occurs

### CDS Pricing

The CDS spread s is the rate that equates the PV of premium payments to the PV of the contingent payment:

```
PV(premium leg) = PV(protection leg)
s * sum_i delta_i * P(0, t_i) * Q(t_i) = (1-R) * integral_0^T P(0,t) * (-dQ(t))
```

where:
- Q(t) = survival probability (probability of no default by time t)
- R = recovery rate (typically 40% for senior unsecured)
- P(0, t) = risk-free discount factor

### Hazard Rate

The instantaneous default probability:

```
Q(t) = exp(-integral_0^t h(s) ds)
```

For constant hazard rate h: Q(t) = exp(-h*t).

The hazard rate can be bootstrapped from CDS spreads of different maturities (analogous to bootstrapping the yield curve).

### CDS-Bond Basis

```
CDS-Bond Basis = CDS spread - Bond spread (Z-spread)
```

Normally near zero. Significant deviations indicate arbitrage opportunities (negative basis trade: buy the bond, buy CDS protection).

### Credit Valuation Adjustment (CVA)

```
CVA = (1 - R) * integral_0^T EE(t) * P(0,t) * (-dQ(t))
```

where EE(t) is the expected exposure of the derivative at time t. CVA measures the expected loss due to counterparty default.

---

## 9. Term Structure Trading Strategies

### Curve Flattener/Steepener

| Strategy | Position | Profits When |
|----------|----------|-------------|
| Flattener | Short 2y, long 10y (DV01-neutral) | 2s10s spread narrows |
| Steepener | Long 2y, short 10y (DV01-neutral) | 2s10s spread widens |

### Butterfly

```
Buy wings (2y + 30y), sell body (10y)
```

Profits when the curve becomes more curved (mid-rates rise relative to ends) or less curved (depending on direction).

### Conditional Steepener with Options

Buy payer swaption on 10y swap, sell payer swaption on 2y swap. Profits from a curve steepening driven by rising long rates, with limited downside.

---

## 10. Risk Management for Fixed Income Options

### Greeks for Interest Rate Options

| Greek | Definition | Hedging Instrument |
|-------|-----------|-------------------|
| Delta (DV01) | Sensitivity to rate changes | Bonds, swaps |
| Gamma (Convexity) | Second-order rate sensitivity | Options, swaptions |
| Vega | Sensitivity to rate vol | Swaptions, caps |
| Theta | Time decay | Inherent cost of optionality |

### Key Risk Dimensions

1. **Level risk:** Parallel shift in the yield curve (hedge with duration)
2. **Slope risk:** Twist in the curve (hedge with steepener/flattener)
3. **Curvature risk:** Butterfly risk (hedge with butterfly spreads)
4. **Volatility risk:** Change in swaption vols (hedge with swaptions)
5. **Credit risk:** Default or spread widening (hedge with CDS)

---

## References

- Brigo, D. & Mercurio, F. (2006). *Interest Rate Models - Theory and Practice*
- Hull, J.C. (2021). *Options, Futures, and Other Derivatives*
- Rebonato, R. (2002). *Modern Pricing of Interest-Rate Derivatives*
- Heath, D., Jarrow, R. & Morton, A. (1992). "Bond Pricing and the Term Structure of Interest Rates"
- Nelson, C. & Siegel, A. (1987). "Parsimonious Modeling of Yield Curves"
- Vasicek, O. (1977). "An Equilibrium Characterization of the Term Structure"

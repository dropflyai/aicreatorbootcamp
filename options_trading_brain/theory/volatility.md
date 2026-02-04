# Volatility Theory

**Prerequisite:** Stochastic calculus, options pricing, statistical estimation
**Relevance:** Central to all options valuation, hedging, and strategy selection

---

## 1. Conceptual Framework

Volatility is the most important parameter in options pricing. Unlike the underlying price (observable), strike (contractual), time to expiry (known), and interest rate (observable), volatility is the one parameter that must be estimated or implied. This estimation challenge creates both risk and opportunity.

### Taxonomy of Volatility

| Type | Definition | Observable? | Use |
|------|-----------|-------------|-----|
| Historical (realized) | Standard deviation of past returns | Yes (backward-looking) | Forecasting, backtesting |
| Implied | Vol that equates BS price to market price | Yes (current) | Market's expectation, pricing |
| Local | Instantaneous vol as function of S, t | No (model output) | Exotic pricing, exact smile fit |
| Stochastic | Vol as a random process | No (model output) | Dynamic hedging, vol derivatives |
| Forward | Implied vol for a future period | Derived | Term structure analysis |

---

## 2. Historical Volatility Estimators

### Close-to-Close (Standard)

The most basic estimator using closing prices:

```
r_i = ln(C_i / C_{i-1})                          (log return)
sigma_CC = sqrt((252 / (n-1)) * sum(r_i - r_bar)^2)   (annualized)
```

Properties:
- Unbiased for normally distributed returns
- Uses only one data point per day (closing price)
- Efficiency: 1.0 (baseline)

### Parkinson (1980) - High-Low Estimator

Uses intraday high-low range:

```
sigma_P = sqrt(252 / (4*n*ln(2)) * sum(ln(H_i/L_i))^2)
```

Properties:
- 5.2x more efficient than close-to-close
- Assumes continuous trading (no overnight gaps)
- Biased downward when trading is discrete

### Garman-Klass (1980)

Uses open, high, low, close:

```
sigma_GK^2 = (252/n) * sum[(1/2)*ln(H_i/L_i)^2 - (2*ln(2) - 1)*ln(C_i/O_i)^2]
```

Properties:
- 7.4x more efficient than close-to-close
- Still assumes no overnight gaps
- Minimum variance unbiased estimator for diffusion processes

### Yang-Zhang (2000)

Handles overnight jumps by combining overnight and intraday components:

```
sigma_YZ^2 = sigma_O^2 + k*sigma_C^2 + (1-k)*sigma_RS^2
```

where:
- sigma_O^2 = variance of overnight returns (close-to-open)
- sigma_C^2 = variance of close-to-close returns
- sigma_RS^2 = Rogers-Satchell estimator (direction-independent)
- k = 0.34 / (1.34 + (n+1)/(n-1))

Properties:
- Handles opening gaps (critical for equities)
- 8x more efficient than close-to-close
- Minimum variance for processes with drift and opening jumps

### Rogers-Satchell (1991)

Direction-independent estimator:

```
sigma_RS^2 = (252/n) * sum[ln(H_i/C_i)*ln(H_i/O_i) + ln(L_i/C_i)*ln(L_i/O_i)]
```

Does not assume zero drift; robust to trending markets.

### Practical Considerations

| Estimator | Data Needed | Gap-Robust | Drift-Robust | Efficiency |
|-----------|-------------|------------|--------------|------------|
| Close-to-close | C | Yes | No | 1.0x |
| Parkinson | H, L | No | No | 5.2x |
| Garman-Klass | O, H, L, C | No | No | 7.4x |
| Rogers-Satchell | O, H, L, C | No | Yes | 6.0x |
| Yang-Zhang | O, H, L, C | Yes | Yes | 8.0x |

**Recommendation:** Use Yang-Zhang for equities (gaps matter). Use Garman-Klass for FX/crypto (24-hour markets with no gaps).

---

## 3. Implied Volatility

### Definition

The implied volatility sigma_IV is the value of sigma that equates the Black-Scholes price to the observed market price:

```
BS(S, K, T, r, sigma_IV) = Market_Price
```

This is a root-finding problem since the BS formula has no closed-form inverse for sigma.

### Newton-Raphson Extraction

```
sigma_{n+1} = sigma_n - [BS(sigma_n) - Market_Price] / Vega(sigma_n)
```

Convergence: Quadratic (doubles correct digits per iteration). Typically converges in 3-5 iterations from a reasonable starting point.

Starting point heuristic (Brenner-Subrahmanyam):

```
sigma_0 = sqrt(2*pi / T) * Market_Price / S
```

### Bisection Method

More robust but slower:

1. Set sigma_low = 0.001, sigma_high = 5.0
2. sigma_mid = (sigma_low + sigma_high) / 2
3. If BS(sigma_mid) > Market_Price, set sigma_high = sigma_mid, else sigma_low = sigma_mid
4. Repeat until |BS(sigma_mid) - Market_Price| < tolerance

Convergence: Linear (one bit per iteration). Always converges but slow (~50 iterations for 1e-15 precision).

### Brent's Method

Combines bisection stability with superlinear convergence. The industry standard. Available in all numerical libraries (scipy.optimize.brentq).

### Jaeckel (2015) - Let's Be Rational

Peter Jaeckel's algorithm provides machine-precision implied volatility in at most two iterations using a rational approximation as starting point followed by Householder's method. Fastest known method. Reference implementation available as open source.

### Edge Cases

- **Deep ITM/OTM options:** Wide bid-ask spreads; use mid price carefully
- **Near-zero time value:** Numerical instability; option is essentially stock + bond
- **Negative implied vol:** Impossible; indicates arbitrage or bad data
- **Very high implied vol (>300%):** Check for meme stock / illiquid options

---

## 4. The Volatility Surface

### Empirical Features

The implied volatility is not a single number -- it varies by strike K and expiry T:

```
sigma_IV = sigma_IV(K, T)
```

This contradicts the Black-Scholes assumption of constant vol. The surface has characteristic shapes:

### Volatility Smile

Symmetric U-shape around ATM. Common in FX markets:

```
    IV
    |  *           *
    |   *         *
    |    *       *
    |     *     *
    |      *   *
    |       * *
    |        *
    +----------------> K/S
              1.0
```

Cause: Fat tails in the return distribution (kurtosis > 3). Both deep OTM puts and deep OTM calls are more expensive than BS predicts.

### Volatility Skew

Asymmetric, with higher IV for lower strikes. Dominant in equity index options (post-1987 crash):

```
    IV
    |*
    | *
    |  *
    |   **
    |     **
    |       ***
    |          ****
    |              *****
    +----------------------> K/S
                   1.0
```

Cause: Crash risk (demand for protective puts), leverage effect (falling prices -> higher vol), risk aversion.

### Term Structure

IV varies with time to expiry:
- **Normal (upward sloping):** Short-term vol < long-term vol (mean-reversion of vol)
- **Inverted (downward sloping):** Short-term vol > long-term vol (crisis, uncertainty)
- **Humped:** Peak at specific maturity (event-driven, e.g., earnings)

### Surface Parameterizations

**SVI (Stochastic Volatility Inspired, Gatheral 2004):**

```
w(k) = a + b * (rho*(k - m) + sqrt((k - m)^2 + sigma^2))
```

where w = sigma_IV^2 * T (total implied variance), k = ln(K/F) (log-moneyness), and {a, b, rho, m, sigma} are parameters.

**SSVI (Surface SVI, Gatheral-Jacquier 2014):**

Extends SVI to ensure no calendar spread arbitrage across the entire surface. Parameterizes the ATM total variance and skew as functions of T.

**SABR (Hagan et al. 2002):**

```
sigma_IV(K) = alpha/((F*K)^((1-beta)/2)) * (z/x(z)) * [1 + correction_terms * T]
```

where z = (nu/alpha) * (F*K)^((1-beta)/2) * ln(F/K) and x(z) = ln((sqrt(1 - 2*rho*z + z^2) + z - rho) / (1 - rho)).

Parameters: alpha (vol level), beta (CEV exponent), rho (correlation), nu (vol of vol).

---

## 5. Local Volatility (Dupire, 1994)

### The Dupire Equation

The unique diffusion coefficient sigma_L(S, t) that reproduces all observed European option prices:

```
sigma_L^2(K, T) = 2 * [dC/dT + (r-q)*K*dC/dK + q*C] / (K^2 * d^2C/dK^2)
```

This is derived from the Fokker-Planck (forward Kolmogorov) equation for the risk-neutral transition density.

### Derivation Sketch

Under risk-neutral measure with local vol:

```
dS = (r-q)*S dt + sigma_L(S,t)*S dW
```

The European call price C(K,T) = e^{-rT} E^Q[(S_T - K)^+] satisfies the Dupire PDE:

```
dC/dT = sigma_L^2(K,T)*K^2/2 * d^2C/dK^2 - (r-q)*K*dC/dK - q*C
```

Solving for sigma_L^2 gives the Dupire formula above.

### Practical Extraction

1. Fit a smooth implied vol surface sigma_IV(K, T)
2. Convert to call prices C(K, T) using Black-Scholes formula
3. Compute numerical derivatives dC/dT, dC/dK, d^2C/dK^2
4. Apply Dupire formula

### Limitations

- Assumes deterministic volatility (no vol of vol)
- Forward smile dynamics are unrealistic (flattens too quickly)
- Numerically sensitive to quality of surface fit
- Not suitable for pricing vol-dependent exotics (cliquets, variance swaps)

---

## 6. Stochastic Volatility Models

### Heston Model (1993)

```
dS = r*S dt + sqrt(v)*S dW_1
dv = kappa*(theta - v) dt + xi*sqrt(v) dW_2
dW_1 * dW_2 = rho * dt
```

Parameters:
- v_0: Initial variance
- kappa: Mean reversion speed
- theta: Long-run variance
- xi: Vol of vol (volatility of the variance process)
- rho: Correlation between stock and vol (typically negative for equities, ~-0.7)

**Feller condition:** 2*kappa*theta > xi^2 ensures variance stays positive.

**Characteristic function approach:** The Heston model has a semi-analytic solution via Fourier transform. Option prices are computed as:

```
C = S*P_1 - K*e^{-rT}*P_2
```

where P_1, P_2 are computed via numerical integration of the characteristic function. This avoids Monte Carlo entirely for European options.

**Calibration:** Minimize the distance between model and market implied vols across strikes and expiries. Use Levenberg-Marquardt or differential evolution.

### SABR Model (Hagan et al., 2002)

```
dF = alpha * F^beta * dW_1
d(alpha) = nu * alpha * dW_2
dW_1 * dW_2 = rho * dt
```

Originally developed for interest rate options. Provides an explicit (approximate) formula for implied volatility as a function of strike.

Advantages:
- Analytically tractable smile dynamics
- Backbone parameter beta controls the shape (beta=0 normal, beta=1 lognormal)
- Widely used in rates and FX

Limitations:
- Approximate formula breaks down for long maturities
- No mean reversion in vol (drifts to infinity)
- Moment explosion for some parameter sets

### Model Comparison

| Feature | Heston | SABR | Local Vol |
|---------|--------|------|-----------|
| Smile fit | Good | Good | Exact |
| Dynamics | Realistic | Realistic (short-dated) | Unrealistic |
| Exotic pricing | Good | Limited | Poor forward smile |
| Calibration speed | Moderate | Fast (analytic) | Fast |
| Vol of vol | Yes (xi) | Yes (nu) | No |

---

## 7. Volatility of Volatility

### Empirical Observation

Implied volatility itself is volatile. The VIX (a measure of 30-day implied vol for S&P 500) has its own realized volatility of approximately 80-120% annualized.

### VVIX

The CBOE's VVIX index measures the implied volatility of VIX options. High VVIX indicates uncertainty about future volatility levels.

### Trading Implications

- High vol-of-vol widens the gap between long-dated and short-dated implied vol
- Volga (d^2V/d(sigma)^2) becomes a dominant risk factor
- Variance swaps and VIX options are direct bets on vol-of-vol

---

## 8. VIX Construction Methodology

### Definition

The VIX represents the 30-day expected volatility of the S&P 500 index, computed from a strip of out-of-the-money SPX options.

### Formula

```
VIX^2 = (2/T) * sum_i (Delta_K_i / K_i^2) * e^{rT} * Q(K_i) - (1/T) * (F/K_0 - 1)^2
```

where:
- T = time to expiry (30 days, interpolated between two nearest monthly expiries)
- K_i = strike prices of OTM options (puts below forward, calls above forward)
- Delta_K_i = (K_{i+1} - K_{i-1}) / 2 (strike spacing)
- Q(K_i) = midpoint of bid-ask for option at strike K_i
- F = forward price (derived from put-call parity)
- K_0 = first strike below the forward price

### Key Features

- Model-free (does not assume Black-Scholes)
- Based on the replication of a variance swap
- Uses all liquid OTM options (not just ATM)
- The VIX squared is proportional to the price of a variance swap

### VIX Term Structure

| Shape | Market Condition | Interpretation |
|-------|-----------------|----------------|
| Contango (upward) | Normal/calm | Short-term vol < long-term vol |
| Backwardation (downward) | Crisis/fear | Short-term vol > long-term vol (panic) |
| Flat | Transition | Uncertainty about regime |

---

## 9. Forward Volatility

### Extraction from Term Structure

Forward variance between T_1 and T_2:

```
sigma_fwd^2 = (sigma_2^2 * T_2 - sigma_1^2 * T_1) / (T_2 - T_1)
```

where sigma_1 and sigma_2 are implied vols for expiries T_1 and T_2.

### Calendar Arbitrage Condition

Total implied variance must be non-decreasing in T:

```
sigma_1^2 * T_1 <= sigma_2^2 * T_2    for T_1 < T_2
```

Equivalently, forward variance must be non-negative. Violation indicates arbitrage (or bad data).

### Butterfly Arbitrage Condition

The call price must be convex in strike:

```
d^2C/dK^2 >= 0
```

Violation means the implied probability density goes negative, which is not physical.

---

## 10. Volatility Forecasting

### EWMA (Exponentially Weighted Moving Average)

```
sigma_t^2 = lambda * sigma_{t-1}^2 + (1-lambda) * r_{t-1}^2
```

RiskMetrics standard: lambda = 0.94 (daily), lambda = 0.97 (monthly).

### GARCH(1,1)

```
sigma_t^2 = omega + alpha * r_{t-1}^2 + beta * sigma_{t-1}^2
```

Long-run variance: V_L = omega / (1 - alpha - beta). Persistence: alpha + beta (typically 0.95-0.99).

### GJR-GARCH (Leverage Effect)

```
sigma_t^2 = omega + (alpha + gamma * I_{r<0}) * r_{t-1}^2 + beta * sigma_{t-1}^2
```

where I_{r<0} = 1 if the previous return was negative. Captures the asymmetric response of volatility to positive and negative returns (leverage effect).

### Implied vs. Realized: The Variance Risk Premium

On average, implied volatility exceeds subsequent realized volatility by 2-4 vol points for equity indices. This "variance risk premium" is the compensation for bearing vol risk and is the source of profit for systematic option selling strategies.

```
VRP = IV - subsequent_RV
```

Positive VRP means option sellers earn a risk premium on average.

---

## 11. Applications to Trading Systems

### Volatility Signal Pipeline

```
Market Data -> Compute Historical Vol (Yang-Zhang) -> Extract IV Surface ->
  Compare IV vs. HV (rich/cheap) -> Forecast Vol (GARCH) ->
  Select Strategy (see strategies/volatility.md) -> Size Position (see risk_management.md)
```

### Key Design Decisions

1. **Which historical estimator?** Yang-Zhang for equities, Garman-Klass for 24h markets
2. **IV extraction method:** Jaeckel for speed, Newton-Raphson for transparency
3. **Surface fit:** SVI for equities, SABR for rates
4. **Forecast model:** GARCH(1,1) as baseline, HAR-RV for higher frequency
5. **Signal threshold:** Trade when IV/HV ratio exceeds historical percentile (e.g., >80th or <20th)

---

## References

- Gatheral, J. (2006). *The Volatility Surface*
- Dupire, B. (1994). "Pricing with a Smile"
- Heston, S. (1993). "A Closed-Form Solution for Options with Stochastic Volatility"
- Hagan, P. et al. (2002). "Managing Smile Risk"
- Jaeckel, P. (2015). "Let's Be Rational"
- Bergomi, L. (2016). *Stochastic Volatility Modeling*
- Yang, D. & Zhang, Q. (2000). "Drift-Independent Volatility Estimation"

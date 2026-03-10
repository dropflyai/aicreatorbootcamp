# The Greeks: Sensitivity Analysis for Options

**Prerequisite:** Options pricing, Black-Scholes model, partial derivatives
**Relevance:** Risk management, hedging, portfolio construction, P&L attribution

---

## 1. Overview and Motivation

Options Greeks measure the sensitivity of an option's price to changes in underlying parameters. They are the partial derivatives of the option pricing function V(S, t, sigma, r) with respect to its inputs. Greeks are essential for:

- **Hedging:** Constructing portfolios that are insensitive to specific risk factors
- **Risk management:** Understanding exposure across multiple dimensions
- **P&L attribution:** Decomposing daily P&L into components (delta P&L, gamma P&L, theta P&L, vega P&L)
- **Strategy construction:** Building positions with desired risk profiles

### The Taylor Expansion of Option Price

```
dV = Delta * dS + (1/2) * Gamma * (dS)^2 + Theta * dt + Vega * d(sigma) + ...
```

This decomposition is the foundation of all Greeks-based risk management.

---

## 2. Delta

### Mathematical Definition

```
Delta = dV/dS
```

**Black-Scholes Call Delta:**
```
Delta_call = N(d_1)
```

**Black-Scholes Put Delta:**
```
Delta_put = N(d_1) - 1 = -N(-d_1)
```

where d_1 = [ln(S/K) + (r + sigma^2/2)*T] / (sigma*sqrt(T)).

### Properties

- Call delta ranges from 0 (deep OTM) to 1 (deep ITM)
- Put delta ranges from -1 (deep ITM) to 0 (deep OTM)
- ATM option delta is approximately 0.5 for calls, -0.5 for puts (exactly 0.5 only when r=0 and q=0)
- Delta approaches a step function as T -> 0
- Delta is the risk-neutral probability of finishing ITM (approximately; exactly N(d_2), but N(d_1) is the hedge ratio)

### Delta Hedging

Hold Delta shares of stock per option to create a locally riskless portfolio:

```
Portfolio: Long 1 option, Short Delta shares
dPi = dV - Delta * dS = Theta * dt + (1/2) * Gamma * (dS)^2 + higher order
```

The hedged portfolio still has gamma and theta exposure. Delta hedging must be rebalanced continuously (in theory) or at discrete intervals (in practice).

### Delta-Neutral Portfolios

A delta-neutral portfolio has net delta = 0. It is insensitive to small moves in the underlying but still exposed to:
- Gamma risk (large moves)
- Theta (time decay)
- Vega (volatility changes)

Constructing delta-neutral positions:

```
Net Delta = sum_i (quantity_i * delta_i) = 0
```

### Dollar Delta

```
Dollar Delta = Delta * S * contract_multiplier * number_of_contracts
```

This measures the dollar exposure equivalent to holding stock.

---

## 3. Gamma

### Mathematical Definition

```
Gamma = d^2V/dS^2 = dDelta/dS
```

**Black-Scholes Gamma (same for calls and puts):**
```
Gamma = N'(d_1) / (S * sigma * sqrt(T))
```

where N'(x) = (1/sqrt(2*pi)) * exp(-x^2/2) is the standard normal PDF.

### Properties

- Always positive for long options (convexity)
- Highest for ATM options near expiration
- Gamma increases as time to expiry decreases (for ATM options)
- Gamma is the rate at which delta changes -- high gamma means frequent rebalancing

### Gamma Profile by Moneyness and Time

```
           Gamma
    |      *
    |     * *        Near expiry (high, narrow peak)
    |    *   *
    |   *     *
    |  *  ---  *     Far from expiry (low, wide)
    | * --   -- *
    |*-         -*
    +---------------> S/K
              1.0
```

### Gamma Scalping

A long gamma position profits from realized volatility exceeding implied volatility through delta rebalancing:

1. Establish a delta-neutral, long-gamma position (e.g., buy a straddle, delta-hedge)
2. When stock moves up: delta becomes positive, sell shares to re-hedge (lock in profit)
3. When stock moves down: delta becomes negative, buy shares to re-hedge (lock in profit)
4. Each rebalance captures a profit proportional to (realized move)^2

P&L from gamma scalping over interval dt:

```
Gamma P&L = (1/2) * Gamma * (dS)^2
```

This is positive when realized vol > implied vol (you paid for less vol than you got).

### Pin Risk

Near expiration, ATM options have extremely high gamma. A small move in the stock can flip delta from 0 to 1 (or -1). This creates unpredictable assignment risk for short option positions. Gamma at expiry for ATM options theoretically approaches infinity (Dirac delta function).

### Dollar Gamma

```
Dollar Gamma = (1/2) * Gamma * S^2 * contract_multiplier * number_of_contracts / 100
```

Measures the P&L for a 1% move in the underlying (approximately).

---

## 4. Theta

### Mathematical Definition

```
Theta = dV/dt
```

Conventionally expressed as value lost per calendar day (divide annual theta by 365) or per trading day (divide by 252).

**Black-Scholes Call Theta:**
```
Theta_call = -(S * N'(d_1) * sigma) / (2 * sqrt(T)) - r * K * e^{-rT} * N(d_2)
```

**Black-Scholes Put Theta:**
```
Theta_put = -(S * N'(d_1) * sigma) / (2 * sqrt(T)) + r * K * e^{-rT} * N(-d_2)
```

### Properties

- Theta is generally negative for long options (time decay erodes value)
- Theta decay accelerates as expiration approaches (proportional to 1/sqrt(T) for ATM)
- Deep ITM puts can have positive theta (due to interest rate effect)
- Theta is largest in magnitude for ATM options

### Theta-Gamma Relationship

From the Black-Scholes PDE for a delta-hedged portfolio:

```
Theta + (1/2) * sigma^2 * S^2 * Gamma + r * S * Delta - r * V = 0
```

For a delta-neutral position (Delta = 0 after hedging):

```
Theta = -(1/2) * sigma^2 * S^2 * Gamma + r * V
```

Approximately (ignoring the r*V term):

```
Theta ~ -(1/2) * sigma^2 * S^2 * Gamma
```

This is the fundamental theta-gamma tradeoff: long gamma (good) costs you theta (bad), and vice versa. You cannot have positive gamma and positive theta simultaneously (without carrying some other risk).

### Time Decay Curve

```
    Option Value
    |
    |****
    |    ****
    |        ****
    |            ****
    |                ****
    |                    ****
    |                        ***
    |                           **
    |                             *
    +-------------------------------> Time to Expiry
    T                                0
```

ATM time decay is proportional to sqrt(T), so the rate of decay (theta) is proportional to 1/sqrt(T) -- it accelerates dramatically in the final days.

---

## 5. Vega

### Mathematical Definition

```
Vega = dV/d(sigma)
```

Note: Vega is not a Greek letter. Some use "kappa" or "zeta" instead.

**Black-Scholes Vega (same for calls and puts):**
```
Vega = S * sqrt(T) * N'(d_1)
```

### Properties

- Always positive for long options (higher vol = higher option value)
- Highest for ATM options
- Increases with time to expiry (longer-dated options are more sensitive to vol)
- Vega is in dollar terms per 1 percentage point change in volatility

### Vega by Expiry

Longer-dated options have more vega. This is why:
- Selling short-dated options gives theta but limited vega risk
- Buying long-dated options gives vega exposure with lower theta bleed
- Calendar spreads exploit this differential

### Vega-Weighted Portfolios

To create a volatility-neutral portfolio:

```
Net Vega = sum_i (quantity_i * vega_i) = 0
```

Often combined with delta-neutral constraint for a portfolio hedged against both direction and vol:

```
sum_i (q_i * delta_i) = 0    (delta-neutral)
sum_i (q_i * vega_i) = 0     (vega-neutral)
```

This requires at least two options to achieve both neutralities simultaneously.

### Vega Across the Surface

Implied volatility is not a single number -- it varies by strike and expiry (volatility surface). A single option has different sensitivities to different parts of the surface:

- **Parallel shift (level):** Standard vega
- **Slope change (skew):** Skew vega
- **Curvature change (smile):** Smile vega

These bucketed vegas are critical for risk management of large options books.

---

## 6. Rho

### Mathematical Definition

```
Rho = dV/dr
```

**Black-Scholes Call Rho:**
```
Rho_call = K * T * e^{-rT} * N(d_2)
```

**Black-Scholes Put Rho:**
```
Rho_put = -K * T * e^{-rT} * N(-d_2)
```

### Properties

- Generally small for short-dated equity options
- Becomes significant for long-dated options (LEAPS)
- Critical for interest rate derivatives
- Positive for calls (higher rates -> higher call values), negative for puts

---

## 7. Second-Order Greeks

### Charm (Delta Decay, DdeltaDtime)

```
Charm = dDelta/dt = d^2V/(dS*dt)
```

Measures how delta changes with time. Important for:
- Predicting how your hedge ratio will change overnight
- Understanding delta drift in your portfolio without rebalancing

For calls: Charm causes OTM call deltas to decay toward 0 and ITM call deltas to increase toward 1 over time.

### Vanna (DdeltaDvol)

```
Vanna = d^2V/(dS*d(sigma)) = dDelta/d(sigma) = dVega/dS
```

**Black-Scholes Vanna:**
```
Vanna = -N'(d_1) * d_2 / sigma = Vega/S * [1 - d_1/(sigma*sqrt(T))]
```

Measures how delta changes when vol changes (or equivalently, how vega changes when the underlying moves). Critical for understanding:
- Sticky-strike vs. sticky-delta vol dynamics
- How your delta hedge is affected by vol regime changes
- Skew-related P&L

### Volga (Vomma, DvegaDvol)

```
Volga = d^2V/d(sigma)^2 = dVega/d(sigma)
```

**Black-Scholes Volga:**
```
Volga = Vega * d_1 * d_2 / sigma
```

Measures the convexity of option price with respect to volatility. Important for:
- Vol-of-vol risk
- Pricing of variance swaps and vol derivatives
- Understanding why deep OTM/ITM options are more expensive than BS predicts (volga drives the smile)

### Speed (DgammaDspot)

```
Speed = d^3V/dS^3 = dGamma/dS
```

Measures how gamma changes as the underlying moves. Important for large portfolios where gamma itself is not constant across the book.

### Color (DgammaDtime)

```
Color = d^3V/(dS^2*dt) = dGamma/dt
```

Measures how gamma changes over time. Near expiry, ATM gamma increases rapidly (color is large and negative for ATM options as t -> T).

### Ultima (DvolgaDvol)

```
Ultima = d^3V/d(sigma)^3
```

Third-order vol sensitivity. Relevant only for very large vol moves or for pricing vol-of-vol-of-vol products.

---

## 8. Greek Profiles by Strategy

### Long Call

| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | +0.0 to +1.0 | Bullish directional bet |
| Gamma | + | Benefits from large moves |
| Theta | - | Pays time decay |
| Vega | + | Benefits from vol increase |

### Short Straddle (Sell call + sell put, same strike)

| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | Near 0 (ATM) | Neutral direction |
| Gamma | - (large) | Hurts from large moves |
| Theta | + (large) | Collects time decay |
| Vega | - (large) | Benefits from vol decrease |

### Bull Call Spread (Buy lower strike call, sell higher strike call)

| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | + (reduced vs. naked call) | Moderately bullish |
| Gamma | Near 0 (gammas offset) | Low convexity |
| Theta | Near 0 (thetas offset) | Low time decay |
| Vega | Near 0 (vegas offset) | Low vol sensitivity |

### Iron Condor (OTM bull put spread + OTM bear call spread)

| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | Near 0 | Neutral |
| Gamma | - | Hurt by large moves |
| Theta | + | Collect time decay |
| Vega | - | Benefit from vol crush |

### Calendar Spread (Sell near-dated, buy far-dated, same strike)

| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | Near 0 (ATM) | Neutral |
| Gamma | - (short near-dated gamma dominates) | Hurt by near-term moves |
| Theta | + (short near-dated theta > long far-dated theta) | Net time decay collection |
| Vega | + (long far-dated vega > short near-dated vega) | Benefits from vol increase |

---

## 9. P&L Attribution Using Greeks

### Daily P&L Decomposition

```
Daily P&L = Delta * dS
           + (1/2) * Gamma * (dS)^2
           + Theta * dt
           + Vega * d(sigma)
           + (1/2) * Volga * (d(sigma))^2
           + Vanna * dS * d(sigma)
           + Residual (higher order + cross terms)
```

### Practical Implementation

1. Record Greeks at start of day
2. Observe changes in S, sigma, t
3. Compute each component
4. "Unexplained P&L" = Actual P&L - Sum of Greek components
5. Large unexplained P&L signals model risk or computational error

### Risk Limits by Greek

| Greek | Typical Limit | Rationale |
|-------|---------------|-----------|
| Net Delta | +/- $X per 1% move | Directional risk budget |
| Net Gamma | +/- $X per 1% move^2 | Convexity risk budget |
| Net Theta | +/- $X per day | Time decay budget |
| Net Vega | +/- $X per 1 vol point | Vol risk budget |

---

## 10. Numerical Computation of Greeks

### Finite Difference Approximation

When analytic formulas are unavailable (exotic options, complex models):

```
Delta ~ [V(S+h) - V(S-h)] / (2*h)                    (central difference)
Gamma ~ [V(S+h) - 2*V(S) + V(S-h)] / h^2             (central second difference)
Theta ~ [V(t+dt) - V(t)] / dt                          (forward difference)
Vega  ~ [V(sigma+h) - V(sigma-h)] / (2*h)             (central difference)
```

### Choosing Step Size h

Too large: truncation error dominates. Too small: floating-point cancellation error dominates.

Optimal h for central differences: h ~ epsilon^{1/3} * |S| where epsilon is machine precision (~1e-16 for double). In practice, h ~ 0.01 * S (1% bump) works well.

### Algorithmic Differentiation (AAD)

For large portfolios, AAD computes all Greeks in a single backward pass through the pricing code. Complexity: O(C) where C is the cost of one pricing evaluation (independent of the number of Greeks). This is used by all modern quant libraries for Greeks computation on large books.

---

## References

- Taleb, N.N. (1997). *Dynamic Hedging: Managing Vanilla and Exotic Options*
- Haug, E.G. (2007). *The Complete Guide to Option Pricing Formulas*
- Hull, J.C. (2021). *Options, Futures, and Other Derivatives*
- Gatheral, J. (2006). *The Volatility Surface*
- Rebonato, R. (2004). *Volatility and Correlation*

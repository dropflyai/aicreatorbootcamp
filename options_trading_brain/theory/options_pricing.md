# Options Pricing Theory

**Prerequisite:** Stochastic calculus, risk-neutral pricing, Ito's Lemma
**Relevance:** Core pricing engine for all options strategies

---

## 1. Black-Scholes-Merton Model

### Assumptions

1. Stock price follows geometric Brownian motion: dS = mu*S dt + sigma*S dW
2. No dividends (relaxed below)
3. Risk-free rate r is constant
4. No transaction costs or taxes
5. Continuous trading is possible
6. No arbitrage opportunities exist
7. Securities are infinitely divisible

### Derivation via Replicating Portfolio (PDE Approach)

Construct a portfolio Pi = V - Delta * S, where V is the option value and Delta is chosen to eliminate risk.

By Ito's Lemma:

```
dV = (dV/dt + mu*S*dV/dS + (1/2)*sigma^2*S^2*d^2V/dS^2) dt + sigma*S*(dV/dS) dW
```

Portfolio change:

```
dPi = dV - Delta * dS
    = [dV/dt + mu*S*dV/dS + (1/2)*sigma^2*S^2*d^2V/dS^2 - Delta*mu*S] dt
      + [sigma*S*dV/dS - Delta*sigma*S] dW
```

Set Delta = dV/dS to eliminate the dW term (delta hedging):

```
dPi = [dV/dt + (1/2)*sigma^2*S^2*d^2V/dS^2] dt
```

This portfolio is riskless, so it must earn the risk-free rate:

```
dPi = r * Pi * dt = r * (V - S*dV/dS) * dt
```

Equating:

```
dV/dt + (1/2)*sigma^2*S^2*d^2V/dS^2 = r*V - r*S*dV/dS
```

Rearranging gives the **Black-Scholes PDE:**

```
dV/dt + r*S*dV/dS + (1/2)*sigma^2*S^2*d^2V/dS^2 - r*V = 0
```

Note: The drift mu has disappeared entirely. Only sigma matters for pricing.

### Derivation via Risk-Neutral Expectation

Under the risk-neutral measure Q, S_T = S_0 * exp((r - sigma^2/2)*T + sigma*W_T^Q).

For a European call with strike K:

```
C = e^{-rT} * E^Q[max(S_T - K, 0)]
```

Since ln(S_T) ~ N(ln(S_0) + (r - sigma^2/2)*T, sigma^2*T):

```
C = e^{-rT} * [E^Q[S_T * 1_{S_T > K}] - K * Q(S_T > K)]
```

### The Black-Scholes Formula

**European Call:**
```
C = S_0 * N(d_1) - K * e^{-rT} * N(d_2)
```

**European Put:**
```
P = K * e^{-rT} * N(-d_2) - S_0 * N(-d_1)
```

where:
```
d_1 = [ln(S_0/K) + (r + sigma^2/2)*T] / (sigma*sqrt(T))
d_2 = d_1 - sigma*sqrt(T)
```

N(x) is the standard normal CDF.

### Interpretation of Terms

- **S_0 * N(d_1):** Present value of receiving the stock conditional on exercise, adjusted for delta
- **K * e^{-rT} * N(d_2):** Present value of paying the strike conditional on exercise
- **N(d_2):** Risk-neutral probability that the option expires in-the-money
- **N(d_1):** Delta of the call option (hedge ratio)

### Put-Call Parity

For European options with same strike and expiry:

```
C - P = S_0 - K * e^{-rT}
```

This is a model-free arbitrage relationship. It holds regardless of the assumed price process.

### Dividend Adjustment (Merton Extension)

For continuous dividend yield q:

```
C = S_0 * e^{-qT} * N(d_1) - K * e^{-rT} * N(d_2)
```

```
d_1 = [ln(S_0/K) + (r - q + sigma^2/2)*T] / (sigma*sqrt(T))
```

Replace S_0 with S_0 * e^{-qT} throughout. For discrete dividends, reduce S_0 by the present value of expected dividends.

---

## 2. Binomial Model (Cox-Ross-Rubinstein)

### Construction

Divide [0, T] into n steps of size dt = T/n. At each step, the stock price moves:

```
Up:   S -> S * u    with risk-neutral probability p
Down: S -> S * d    with risk-neutral probability 1 - p
```

### CRR Parameters

```
u = exp(sigma * sqrt(dt))
d = exp(-sigma * sqrt(dt)) = 1/u
p = (exp(r*dt) - d) / (u - d)
```

### Backward Induction

At expiry (step n), option value = payoff. Working backward:

```
V(i, j) = e^{-r*dt} * [p * V(i+1, j+1) + (1-p) * V(i+1, j)]
```

where V(i, j) is the option value at step i, state j.

### Convergence

As n -> infinity, the CRR model converges to Black-Scholes. The convergence rate is O(1/n) with oscillations. Richardson extrapolation can accelerate convergence.

### Advantages Over Black-Scholes

- Handles American options (check early exercise at each node)
- Handles discrete dividends naturally
- Intuitive and visual
- Flexible payoff structures

---

## 3. Trinomial Tree

### Construction

Three movements per step:

```
Up:     S -> S * u    probability p_u
Middle: S -> S * m    probability p_m
Down:   S -> S * d    probability p_d
```

Typical choice: u = exp(sigma * sqrt(2*dt)), d = 1/u, m = 1.

### Advantages

- Better convergence than binomial (O(1/n^2))
- Barrier options: can place barriers exactly on tree nodes
- More stable Greeks computation (finer grid)

---

## 4. American Option Pricing

### Early Exercise Premium

American option value = European value + early exercise premium.

American options cannot be priced in closed form (except for calls on non-dividend-paying stocks, where early exercise is never optimal).

### Why American Calls on Non-Dividend Stocks Are Not Exercised Early

```
C >= max(S - K*e^{-r(T-t)}, 0) > max(S - K, 0) = intrinsic value
```

The option is always worth more alive than dead (due to time value and the insurance value of limited downside). Exception: deep ITM calls just before an ex-dividend date.

### Free Boundary Problem

The American option price V(S, t) satisfies:

```
dV/dt + r*S*dV/dS + (1/2)*sigma^2*S^2*d^2V/dS^2 - r*V <= 0   (everywhere)
V(S, t) >= payoff(S)                                            (everywhere)
```

with complementary slackness: at least one holds with equality at each point.

The **early exercise boundary** S*(t) separates the continuation region (hold the option) from the exercise region (exercise immediately).

### Numerical Methods for Americans

| Method | Description | Complexity |
|--------|-------------|------------|
| Binomial tree | Backward induction with early exercise check | O(n^2) |
| Finite differences | Solve PDE with free boundary (PSOR, penalty method) | O(M*N) |
| Longstaff-Schwartz | Monte Carlo with regression for continuation value | O(n_paths * n_basis) |
| BAW approximation | Analytic approximation (Barone-Adesi & Whaley) | O(1) per iteration |

### Longstaff-Schwartz Algorithm (Least Squares Monte Carlo)

1. Simulate n paths of the underlying
2. At each exercise date (working backward):
   a. Compute payoff from immediate exercise
   b. Regress discounted future values on basis functions of current state
   c. Exercise if immediate payoff > regression estimate of continuation value
3. Price = average of discounted payoffs along optimal exercise strategy

Basis functions: {1, S, S^2} or Laguerre polynomials. Critical: this estimates the exercise boundary from the cross-section of paths.

---

## 5. Exotic Options Pricing

### Path-Independent Exotics

| Type | Payoff | Pricing |
|------|--------|---------|
| Digital (binary) | 1_{S_T > K} | e^{-rT} * N(d_2) |
| Asset-or-nothing | S_T * 1_{S_T > K} | S_0 * N(d_1) |
| Power option | max(S_T^alpha - K, 0) | Transform to adjusted GBM |
| Chooser option | max(C, P) at choice date | Put-call parity decomposition |

### Path-Dependent Exotics

**Barrier Options:** Knock-in/knock-out when price hits barrier B.

```
Down-and-out call = C_BS - (S_0/B)^{2*lambda} * C_BS(S_0^2/B)
```

where lambda = (r - q - sigma^2/2) / sigma^2. Reflection principle for continuous monitoring; discrete monitoring requires numerical adjustment.

**Asian Options:** Payoff depends on average price. No closed-form under GBM for arithmetic average. Use:
- Geometric average (closed form) as control variate
- Monte Carlo with variance reduction
- Turnbull-Wakeman or Levy approximations

**Lookback Options:** Payoff depends on max or min of price path. Closed forms exist under GBM using the reflection principle.

---

## 6. Monte Carlo Methods for Options

### Basic Algorithm

1. Generate n independent standard normal Z_1, ..., Z_n
2. For each Z_i, compute terminal price: S_T^(i) = S_0 * exp((r - sigma^2/2)*T + sigma*sqrt(T)*Z_i)
3. Compute payoff: H_i = payoff(S_T^(i))
4. Estimate price: V_hat = e^{-rT} * (1/n) * sum(H_i)

Standard error: SE = sigma_H / sqrt(n), where sigma_H is the sample standard deviation of payoffs.

### Variance Reduction Techniques

**Antithetic variates:** For each Z, also use -Z. Reduces variance when payoff is monotone in Z.

```
V_hat = e^{-rT} * (1/n) * sum[(H(Z_i) + H(-Z_i)) / 2]
```

**Control variates:** Use a correlated variable with known expectation.

```
V_hat_CV = V_hat - beta * (Y_hat - E[Y])
```

Common control: geometric Asian option (known formula) to price arithmetic Asian.

**Importance sampling:** Change the sampling distribution to focus on important regions (e.g., deep OTM options).

**Stratified sampling:** Divide the probability space into strata and sample from each.

### Path-Dependent Monte Carlo

For path-dependent payoffs, simulate the full path:

```
S_{t+dt} = S_t * exp((r - sigma^2/2)*dt + sigma*sqrt(dt)*Z)
```

Time steps must be fine enough to capture barrier crossings, averaging windows, etc.

### Greeks via Monte Carlo

- **Finite differences:** Delta_hat = (V(S+h) - V(S-h)) / (2h). Simple but biased for discontinuous payoffs.
- **Pathwise method (IPA):** Differentiate the payoff through the path. Works when payoff is smooth.
- **Likelihood ratio method:** Delta = e^{-rT} * E[H * (d/dS) ln f(S_T; S_0)]. Works for discontinuous payoffs.

---

## 7. Finite Difference Methods

### Grid Setup

Discretize the (S, t) domain into a grid with M spatial points and N time steps.

Transform x = ln(S) to get constant coefficients:

```
dV/dt + (r - sigma^2/2)*dV/dx + (1/2)*sigma^2*d^2V/dx^2 - r*V = 0
```

### Explicit Method

```
V_i^n = V_i^{n+1} + dt * [(r - sigma^2/2)/(2*dx) * (V_{i+1}^{n+1} - V_{i-1}^{n+1})
        + (sigma^2)/(2*dx^2) * (V_{i+1}^{n+1} - 2*V_i^{n+1} + V_{i-1}^{n+1})
        - r * V_i^{n+1}]
```

Stability condition: dt <= dx^2 / sigma^2 (CFL condition).

### Implicit Method (Unconditionally Stable)

```
V_i^{n+1} = V_i^n + dt * [operator applied at time n]
```

Requires solving a tridiagonal system at each time step (Thomas algorithm, O(M)).

### Crank-Nicolson (Second-Order in Time and Space)

Average of explicit and implicit:

```
V^n = V^{n+1} + (dt/2) * [L*V^n + L*V^{n+1}]
```

where L is the spatial differential operator. O(dx^2 + dt^2) accuracy. May produce oscillations near discontinuities; use Rannacher time-stepping (a few implicit steps first) to smooth.

### Boundary Conditions

- **Far field (S -> infinity for call):** V ~ S - K*e^{-r(T-t)} (linear boundary)
- **Near field (S -> 0 for call):** V -> 0
- **American options:** At each time step, apply V = max(V, payoff) (projected SOR)

---

## 8. Model Extensions

### Local Volatility (Dupire)

See volatility.md for full treatment. The local volatility function sigma(S, t) is extracted from the implied volatility surface to exactly match all observed European option prices.

### Stochastic Volatility

See volatility.md. Models like Heston add a second SDE for volatility:

```
dS = r*S dt + sqrt(v)*S dW_1
dv = kappa*(theta - v) dt + xi*sqrt(v) dW_2
dW_1*dW_2 = rho*dt
```

### Jump-Diffusion (Merton)

```
dS/S = (mu - lambda*k) dt + sigma dW + J dN
```

where N is a Poisson process with intensity lambda and J is the jump size (log-normal). Option prices become weighted sums of Black-Scholes prices with adjusted parameters.

### Stochastic Rates

Replace constant r with a stochastic interest rate model (Hull-White, HJM). Important for long-dated options and fixed income derivatives.

---

## 9. Practical Considerations for Trading Systems

### Model Selection Framework

| Instrument | Recommended Model | Rationale |
|------------|-------------------|-----------|
| Vanilla European | Black-Scholes with vol smile | Fast, accurate with smile adjustment |
| Vanilla American | Binomial/finite difference | Early exercise boundary needed |
| Barriers | Local vol + Monte Carlo | Path-dependent, smile-sensitive |
| Asian options | Monte Carlo with control variates | No closed form for arithmetic |
| Multi-asset | Monte Carlo with correlation | High-dimensional |
| Short-dated | SABR | Controls smile dynamics near expiry |

### Calibration Workflow

1. Collect market prices for liquid strikes and expiries
2. Extract implied volatilities (Newton-Raphson)
3. Fit volatility surface (SVI, SSVI, or spline interpolation)
4. Calibrate model parameters (Heston: {v_0, kappa, theta, xi, rho})
5. Validate on out-of-sample instruments (exotics, illiquid strikes)
6. Monitor model risk through daily P&L attribution

### Speed vs. Accuracy Tradeoffs

| Speed Need | Method | Typical Accuracy |
|------------|--------|------------------|
| Real-time (< 1ms) | Black-Scholes analytic | Exact for BS assumptions |
| Near-real-time (< 100ms) | Binomial/trinomial tree (n=200) | 0.01% of BS |
| Batch pricing (< 10s) | Monte Carlo (100k paths) | 0.1% standard error |
| Overnight calibration | Full FD grid or Monte Carlo (1M paths) | Machine precision |

---

## References

- Black, F. & Scholes, M. (1973). "The Pricing of Options and Corporate Liabilities"
- Merton, R.C. (1973). "Theory of Rational Option Pricing"
- Cox, J., Ross, S. & Rubinstein, M. (1979). "Option Pricing: A Simplified Approach"
- Hull, J.C. (2021). *Options, Futures, and Other Derivatives*
- Glasserman, P. (2003). *Monte Carlo Methods in Financial Engineering*
- Wilmott, P. (2006). *Paul Wilmott on Quantitative Finance*

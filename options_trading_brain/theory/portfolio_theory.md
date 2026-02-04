# Portfolio Theory

**Prerequisite:** Linear algebra, statistics, optimization theory
**Relevance:** Portfolio construction, asset allocation, options overlay strategies

---

## 1. Mean-Variance Optimization (Markowitz, 1952)

### Setup

Consider n assets with:
- Expected returns vector: mu = (mu_1, ..., mu_n)^T
- Covariance matrix: Sigma (n x n, positive semi-definite)
- Portfolio weights: w = (w_1, ..., w_n)^T, with sum(w_i) = 1

### Portfolio Return and Risk

```
E[R_p] = w^T * mu
Var(R_p) = w^T * Sigma * w
```

### The Optimization Problem

Minimize portfolio variance for a given target return mu_target:

```
min_w   (1/2) * w^T * Sigma * w
s.t.    w^T * mu = mu_target
        w^T * 1 = 1
```

### Lagrangian Solution

Form the Lagrangian:

```
L = (1/2) * w^T * Sigma * w - lambda_1 * (w^T * mu - mu_target) - lambda_2 * (w^T * 1 - 1)
```

First-order condition (dL/dw = 0):

```
Sigma * w = lambda_1 * mu + lambda_2 * 1
w* = Sigma^{-1} * (lambda_1 * mu + lambda_2 * 1)
```

Substituting back into the constraints gives two equations in two unknowns (lambda_1, lambda_2):

```
[A  B] [lambda_1]   [mu_target]
[B  C] [lambda_2] = [1        ]
```

where A = mu^T * Sigma^{-1} * mu, B = mu^T * Sigma^{-1} * 1, C = 1^T * Sigma^{-1} * 1.

Solution:

```
lambda_1 = (C * mu_target - B) / (A*C - B^2)
lambda_2 = (A - B * mu_target) / (A*C - B^2)
```

### Properties of the Efficient Frontier

- The efficient frontier is a hyperbola in (sigma, mu) space
- All efficient portfolios are combinations of any two efficient portfolios (two-fund separation)
- The minimum variance portfolio (MVP) has weights: w_MVP = Sigma^{-1} * 1 / (1^T * Sigma^{-1} * 1)
- Adding constraints (no short selling, position limits) makes the frontier less efficient but more practical

### Practical Challenges

1. **Estimation error:** Sigma and mu are estimated from data; errors propagate into extreme weights
2. **Instability:** Small changes in inputs cause large changes in optimal weights
3. **Concentration:** Unconstrained optimization often produces extreme positions
4. **Solutions:** Shrinkage (Ledoit-Wolf), robust optimization, resampling (Michaud), Bayesian methods

---

## 2. The Efficient Frontier

### Visualization

```
    E[R]
    |          * Tangency Portfolio
    |         /
    |        / CML
    |       /*****
    |      **    ***
    |     *        **
    |    *  Efficient  *
    |   * Frontier       *
    |  *   (upper)         *
    | *                      *
    |*                         *
    |  MVP *                     (inefficient -- lower portion)
    +---------------------------------> sigma
```

### Capital Market Line (CML)

With a risk-free asset at rate r_f, the CML is the tangent line from r_f to the efficient frontier:

```
E[R_p] = r_f + [(E[R_M] - r_f) / sigma_M] * sigma_p
```

The slope (E[R_M] - r_f) / sigma_M is the Sharpe ratio of the market portfolio.

### Tangency Portfolio

The portfolio on the efficient frontier with the highest Sharpe ratio:

```
w_tan = Sigma^{-1} * (mu - r_f * 1) / (1^T * Sigma^{-1} * (mu - r_f * 1))
```

All investors hold a combination of the risk-free asset and the tangency portfolio (Tobin's separation theorem).

---

## 3. Capital Asset Pricing Model (CAPM)

### Derivation

In equilibrium, the tangency portfolio is the market portfolio. For any asset i:

```
E[R_i] - r_f = beta_i * (E[R_M] - r_f)
```

where:

```
beta_i = Cov(R_i, R_M) / Var(R_M) = sigma_{iM} / sigma_M^2
```

### Derivation via Portfolio Mathematics

Consider adding a small weight epsilon of asset i to the market portfolio. The marginal contribution to portfolio risk must equal the marginal contribution to return (in equilibrium):

```
dE[R_p] / d(epsilon) = mu_i - mu_M
d(sigma_p^2) / d(epsilon) = 2 * (sigma_{iM} - sigma_M^2)
```

In equilibrium, the risk-return tradeoff is the same for all assets:

```
(mu_i - r_f) / sigma_{iM} = (mu_M - r_f) / sigma_M^2
```

Rearranging gives the CAPM equation.

### Security Market Line (SML)

The SML plots expected return vs. beta:

```
E[R_i] = r_f + beta_i * (E[R_M] - r_f)
```

Assets above the SML are undervalued (positive alpha). Assets below are overvalued (negative alpha).

### Alpha

```
alpha_i = E[R_i] - [r_f + beta_i * (E[R_M] - r_f)]
```

Alpha measures risk-adjusted outperformance. In an efficient market, alpha = 0 for all assets.

### CAPM Limitations

- Single factor (market beta) does not explain cross-sectional return variation
- Assumes mean-variance preferences (ignores higher moments)
- Static (does not account for time-varying risk premia)
- Empirical violations: size effect, value effect, momentum

---

## 4. Arbitrage Pricing Theory (APT, Ross 1976)

### Model

Asset returns are driven by k systematic factors:

```
R_i = alpha_i + beta_{i1} * F_1 + beta_{i2} * F_2 + ... + beta_{ik} * F_k + epsilon_i
```

where F_j are factor returns and epsilon_i is idiosyncratic risk.

### No-Arbitrage Pricing

In the absence of arbitrage, expected returns are linear in factor loadings:

```
E[R_i] = r_f + beta_{i1} * lambda_1 + beta_{i2} * lambda_2 + ... + beta_{ik} * lambda_k
```

where lambda_j is the risk premium for factor j.

### APT vs. CAPM

| Feature | CAPM | APT |
|---------|------|-----|
| Factors | 1 (market) | Multiple (unspecified) |
| Derivation | Equilibrium | No-arbitrage |
| Assumptions | Mean-variance, homogeneous expectations | Factor structure |
| Testability | Specific | Flexible (but factors must be identified) |

---

## 5. Fama-French Factor Models

### Three-Factor Model (1993)

```
R_i - r_f = alpha_i + beta_MKT * (R_M - r_f) + beta_SMB * SMB + beta_HML * HML + epsilon_i
```

- **MKT:** Market excess return (CAPM factor)
- **SMB (Small Minus Big):** Return of small-cap minus large-cap stocks (size premium)
- **HML (High Minus Low):** Return of value minus growth stocks (value premium)

### Five-Factor Model (2015)

Adds:
- **RMW (Robust Minus Weak):** Profitability factor
- **CMA (Conservative Minus Aggressive):** Investment factor

### Carhart Four-Factor Model

Adds momentum to the three-factor model:
- **UMD (Up Minus Down):** Return of past winners minus past losers

### Application to Options

Factor models help decompose option portfolio returns:
- What fraction of P&L is due to market exposure (beta)?
- What is the genuine alpha from options strategies?
- Are we taking hidden factor bets (size, value, momentum) through our options positions?

---

## 6. Risk Parity

### Principle

Allocate risk (not capital) equally across assets or asset classes.

### Equal Risk Contribution

Each asset contributes equally to total portfolio variance:

```
RC_i = w_i * (Sigma * w)_i / (w^T * Sigma * w)
```

Set RC_i = 1/n for all i and solve for w.

### Implementation

No closed-form solution in general. Solve numerically:

```
min_w sum_{i} (RC_i - 1/n)^2
s.t.  w_i >= 0, sum(w_i) = 1
```

### Leveraged Risk Parity

The classic Bridgewater "All Weather" approach:
1. Equal risk across asset classes (stocks, bonds, commodities, TIPS)
2. Apply leverage to reach desired return level
3. Bonds get higher weight (lower vol) but are leveraged

### Criticism

- Depends on stable correlation structure
- Leverage introduces margin/funding risk
- May underperform in rising rate environments (bonds down, leverage amplifies)

---

## 7. Black-Litterman Model (1992)

### Problem Solved

Markowitz optimization with expected returns from CAPM gives unstable, unintuitive weights. Black-Litterman combines:
1. **Prior:** CAPM equilibrium returns (derived from market weights)
2. **Views:** Investor's subjective views on expected returns
3. **Posterior:** Bayesian combination that tilts the portfolio toward the views

### Prior (Implied Equilibrium Returns)

```
Pi = delta * Sigma * w_mkt
```

where delta = (E[R_M] - r_f) / sigma_M^2 and w_mkt are market capitalization weights.

### Views

Express views as: P * mu = Q + epsilon, where:
- P is a pick matrix (which assets the view is about)
- Q is the vector of expected excess returns from views
- Omega = diag(tau * P * Sigma * P^T) is the uncertainty in views

### Posterior

```
mu_BL = [(tau * Sigma)^{-1} + P^T * Omega^{-1} * P]^{-1} * [(tau * Sigma)^{-1} * Pi + P^T * Omega^{-1} * Q]
```

### Advantages

- Produces intuitive, stable portfolio weights
- Incorporates both market equilibrium and active views
- Views can be absolute ("Stock A will return 10%") or relative ("Stock A will outperform Stock B by 3%")
- Confidence in views controls how far the portfolio deviates from the benchmark

---

## 8. Portfolio Insurance

### Constant Proportion Portfolio Insurance (CPPI)

Dynamically allocate between risky asset and risk-free asset:

```
Risky allocation = m * (V - F)
```

where:
- V = portfolio value
- F = floor (minimum acceptable value, e.g., 80% of initial)
- m = multiplier (typically 3-5)
- V - F = cushion

As the portfolio falls toward the floor, the risky allocation decreases (de-risking). As it rises, the allocation increases (re-risking).

**Gap risk:** In a sudden crash, the portfolio can breach the floor before rebalancing occurs. The probability of breaching is related to m, vol, and rebalancing frequency.

### Option-Based Portfolio Insurance (OBPI)

Buy protective puts to establish a floor:

```
Protected portfolio = Stock + Put(K = floor level)
```

This is equivalent to holding a call option (by put-call parity):

```
Stock + Put = Call + Bond
```

The put premium is the cost of insurance. Using actual puts gives:
- Exact floor (no gap risk)
- Known cost (premium paid upfront)
- But: premium can be expensive (2-5% per year for ATM protection)

### Comparison

| Feature | CPPI | OBPI |
|---------|------|------|
| Floor guarantee | No (gap risk) | Yes (if European) |
| Cost | Implicit (opportunity cost) | Explicit (put premium) |
| Participation in upside | Full (above floor) | Full minus premium |
| Rebalancing | Continuous (or frequent) | None (buy and hold puts) |
| Path dependency | Yes (can lock in losses) | No |

---

## 9. Options Overlay Strategies

### Covered Call Writing (BuyWrite)

Hold the equity portfolio and sell OTM calls:

```
Return = Stock return + Call premium - Opportunity cost of capped upside
```

- Reduces volatility by ~2-4 vol points
- Adds income of 0.5-2% per month (for 5% OTM monthly calls)
- Underperforms in strong bull markets (capped upside)
- CBOE BXM index tracks systematic covered call writing on S&P 500

### Put-Spread Collar

Hold stock, buy OTM puts, sell OTM calls, sell further OTM puts:

```
Stock + Buy 95% put - Sell 105% call - Sell 85% put = Collar + Short put spread
```

- Floor between 85-95% of current value
- Cap at 105%
- Net premium close to zero (zero-cost collar if strikes chosen correctly)

### Volatility Targeting with Options

Use options to maintain a constant portfolio volatility:

```
When realized vol > target: Buy puts or reduce equity allocation
When realized vol < target: Sell puts or increase equity allocation
```

This can be implemented with variance swaps for precise vol targeting.

### Risk Reversal Overlay

Express a directional view while staying market-neutral in premium:

```
Buy OTM calls + Sell OTM puts (bullish risk reversal)
```

- Zero net premium (or close to it)
- Provides leveraged upside participation
- Exposes to downside risk below the put strike

### Dispersion Overlay

Systematically sell index options and buy single-stock options:

```
Short SPX straddle + Long weighted straddles on SPX constituents
```

Profits when realized correlation is lower than implied correlation (which is the case on average due to the correlation risk premium).

---

## 10. Performance Attribution

### Brinson Attribution (Equity)

Decompose portfolio return vs. benchmark:
- **Allocation effect:** Over/underweighting sectors
- **Selection effect:** Picking better stocks within sectors
- **Interaction effect:** Cross-term

### Options-Specific Attribution

Decompose options portfolio P&L into:

```
Total P&L = Delta P&L + Gamma P&L + Theta P&L + Vega P&L + Rho P&L + Residual
```

Further decompose by:
- Strategy type (directional, volatility, income)
- Underlying (diversification effect)
- Maturity bucket (short-dated vs. long-dated)
- Moneyness (ATM vs. OTM)

---

## 11. Integration with Options Trading Brain

### Portfolio Construction Workflow

```
1. Define investment universe (underlyings, strategy types)
2. Generate alpha signals (directional, volatility, statistical)
3. Size positions using Kelly/risk-parity/BL
4. Construct portfolio respecting:
   - Net Greek limits (delta, gamma, vega, theta)
   - Concentration limits (per underlying, per sector)
   - Margin constraints
   - Correlation constraints
5. Monitor and rebalance
```

### Rebalancing Triggers

- Greek drift exceeds threshold (delta > limit)
- Time-based (daily, weekly)
- Event-based (earnings, FOMC, expiry)
- P&L-based (drawdown triggers)

---

## References

- Markowitz, H. (1952). "Portfolio Selection"
- Sharpe, W. (1964). "Capital Asset Prices"
- Ross, S. (1976). "The Arbitrage Theory of Capital Asset Pricing"
- Fama, E. & French, K. (1993). "Common Risk Factors in the Returns on Stocks and Bonds"
- Black, F. & Litterman, R. (1992). "Global Portfolio Optimization"
- Maillard, S., Roncalli, T. & Teiletche, J. (2010). "The Properties of Equally Weighted Risk Contribution Portfolios"
- Perold, A. & Sharpe, W. (1988). "Dynamic Strategies for Asset Allocation"

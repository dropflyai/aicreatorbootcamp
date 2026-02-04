# Risk Management Theory

**Prerequisite:** Portfolio theory, statistics, options pricing, Greeks
**Relevance:** Position sizing, capital preservation, portfolio risk measurement

---

## 1. Risk Measurement Framework

Risk management in options trading operates at three levels:

1. **Position level:** Risk of a single trade (Greeks, max loss, breakeven)
2. **Portfolio level:** Aggregate risk across all positions (net Greeks, correlation, concentration)
3. **Account level:** Total capital at risk, margin utilization, drawdown limits

---

## 2. Value at Risk (VaR)

### Definition

VaR at confidence level alpha over horizon T is the loss L such that:

```
P(Loss > VaR) = 1 - alpha
```

Example: 1-day 99% VaR of $100K means there is a 1% probability of losing more than $100K in one day.

### Parametric (Variance-Covariance) VaR

Assume portfolio returns are normally distributed:

```
VaR_{alpha} = -mu_p * T + z_{alpha} * sigma_p * sqrt(T)
```

where z_{alpha} is the normal quantile (z_{0.99} = 2.326, z_{0.95} = 1.645).

For a portfolio with positions w and covariance matrix Sigma:

```
sigma_p^2 = w^T * Sigma * w
VaR = z_{alpha} * sqrt(w^T * Sigma * w) * sqrt(T)
```

**Limitations for options:**
- Normal distribution assumption is violated (options have nonlinear payoffs)
- Delta-normal VaR only captures linear risk; misses gamma, vega
- Underestimates tail risk

### Delta-Gamma VaR (Cornish-Fisher Expansion)

Incorporate the non-normality from gamma:

```
Portfolio P&L ~ Delta * dS + (1/2) * Gamma * (dS)^2
```

This P&L is a quadratic function of dS, which has a non-normal distribution even if dS is normal. Use the Cornish-Fisher expansion to adjust quantiles:

```
z_CF = z + (z^2 - 1)*skew/6 + (z^3 - 3*z)*kurt/24 - (2*z^3 - 5*z)*skew^2/36
```

### Historical Simulation VaR

1. Collect n historical return scenarios (e.g., last 500 trading days)
2. Revalue the current portfolio under each historical scenario
3. Sort the P&L outcomes
4. VaR = the (1 - alpha) * n th worst outcome

Advantages:
- No distributional assumptions
- Captures fat tails, correlations, non-linearities automatically
- Easy to implement and explain

Disadvantages:
- Limited to historically observed scenarios (no tail extrapolation)
- Sensitive to lookback window choice
- Recent regime changes may not be well-represented

### Monte Carlo VaR

1. Specify a stochastic model for all risk factors (stock prices, vols, rates)
2. Simulate n scenarios (10,000 - 1,000,000) for the risk factor changes
3. Revalue the portfolio under each scenario (full revaluation)
4. Sort P&L outcomes; VaR = appropriate quantile

Advantages:
- Handles any payoff structure (exotics, path-dependent)
- Can use sophisticated models (stochastic vol, jumps, correlation dynamics)
- Arbitrary confidence level and horizon

Disadvantages:
- Computationally expensive (especially with full revaluation)
- Model risk (results depend on the chosen model)
- Slow convergence for extreme quantiles (need importance sampling for 99.9%)

### VaR Limitations

- **Not subadditive:** VaR(A + B) can exceed VaR(A) + VaR(B), violating diversification logic
- **Uninformative about tail shape:** Says nothing about how bad losses can be beyond VaR
- **Procyclical:** In calm periods, VaR is low, encouraging risk-taking; in crises, VaR spikes, forcing deleveraging

---

## 3. Expected Shortfall (CVaR, Conditional VaR)

### Definition

```
ES_{alpha} = E[Loss | Loss > VaR_{alpha}] = (1 / (1-alpha)) * integral_{alpha}^{1} VaR_u du
```

ES is the average loss in the worst (1-alpha) fraction of scenarios.

### Properties

- **Coherent risk measure:** Satisfies subadditivity, monotonicity, positive homogeneity, translation invariance
- **Subadditive:** ES(A + B) <= ES(A) + ES(B) -- properly reflects diversification
- **Tail-sensitive:** Captures the severity of extreme losses, not just their probability

### Computation

**Parametric (normal):** ES = sigma * phi(z_alpha) / (1-alpha) where phi is the standard normal PDF.

**Historical:** ES = average of all losses worse than VaR.

**Monte Carlo:** ES = average of simulated losses in the worst (1-alpha) fraction.

### Regulatory Usage

Basel III/IV requires ES at 97.5% confidence level for market risk capital (replaced VaR at 99% in the Fundamental Review of the Trading Book).

---

## 4. Portfolio Greeks Management

### Aggregation

For a portfolio of options:

```
Net Delta = sum_i (q_i * delta_i * multiplier_i)
Net Gamma = sum_i (q_i * gamma_i * multiplier_i)
Net Theta = sum_i (q_i * theta_i * multiplier_i)
Net Vega  = sum_i (q_i * vega_i * multiplier_i)
```

where q_i is signed quantity (positive for long, negative for short).

### Greeks Limits Framework

| Greek | Limit Type | Example |
|-------|-----------|---------|
| Delta | Dollar delta | +/- $50K per 1% move |
| Gamma | Dollar gamma | +/- $5K per (1%)^2 move |
| Theta | Daily theta | +/- $2K per day |
| Vega | Dollar vega | +/- $10K per 1 vol point |

### Hedging Priority

1. **Delta first:** The dominant risk factor (first-order); hedge continuously or at least daily
2. **Vega second:** Volatility changes are the next largest risk for options portfolios
3. **Gamma third:** Important for large moves; hedge with options (cannot hedge gamma with stock)
4. **Theta:** Not hedged directly; it is the cost of carrying gamma/vega positions

### Cross-Greek Hedging

To simultaneously neutralize delta and vega, solve:

```
q_stock * delta_stock + q_option_A * delta_A + q_option_B * delta_B = 0
q_stock * 0          + q_option_A * vega_A  + q_option_B * vega_B  = 0
```

This is a linear system. Need at least one option per Greek dimension to neutralize (stock has zero vega and gamma).

---

## 5. Stress Testing and Scenario Analysis

### Stress Test Types

**Historical scenarios:** Apply actual historical market moves:
- Black Monday (1987): S&P -22%, VIX spike to 150
- Financial Crisis (2008): S&P -40% over months, credit freeze
- COVID Crash (2020): S&P -34% in 23 days, VIX to 82
- Volmageddon (2018): VIX from 14 to 50 in one day

**Hypothetical scenarios:** Design plausible extreme events:
- S&P down 10% with vol up 30 points
- Interest rates up 200bps with equities flat
- Correlation spike (all assets move together)

### Scenario Matrix

Construct a grid of underlying price changes x volatility changes:

```
              Vol Change
              -5   -2   0   +2   +5   +10  +20
Price    -10%  []   []  []   []   []   []   []
Change   -5%   []   []  []   []   []   []   []
          0%   []   []  []   []   []   []   []
         +5%   []   []  []   []   []   []   []
        +10%   []   []  []   []   []   []   []
```

Each cell shows the portfolio P&L under that joint scenario. This is the primary tool for options portfolio risk visualization.

### Reverse Stress Testing

Instead of "what is the loss under scenario X?", ask "what scenario would cause loss Y?"

1. Define a critical loss level (e.g., 50% of portfolio value)
2. Search for the most plausible combination of risk factor changes that produces this loss
3. Assess the probability of that scenario

---

## 6. Margin Calculation

### SPAN (Standard Portfolio ANalysis of Risk)

Used by CME and most derivatives exchanges:

1. Define 16 risk scenarios (combinations of price and vol moves)
2. Compute worst-case portfolio loss across all scenarios
3. Add spread charges for inter-month and inter-commodity risk
4. Subtract credits for hedging (spreads reduce margin)

The 16 scenarios typically cover:
- Price moves: +/- 1/3, 2/3, 3/3 of the price scan range
- Vol moves: up and down by 1 standard deviation
- Deep out-of-the-money moves (extreme scenarios at reduced probability)

### TIMS (Theoretical Intermarket Margin System)

Used by OCC (Options Clearing Corporation):

1. Group positions into classes (same underlying) and product groups
2. Compute maximum loss across a set of theoretical price moves
3. Apply offsets for hedged positions within classes and across groups

### Portfolio Margin (Reg T vs. Portfolio Margin)

| Feature | Reg T | Portfolio Margin |
|---------|-------|-----------------|
| Method | Strategy-based (predefined) | Risk-based (TIMS) |
| Typical margin | 20-100% of notional | 5-15% of notional |
| Account minimum | $2K | $100K+ |
| Best for | Small accounts | Large, hedged portfolios |

---

## 7. Kelly Criterion

### Derivation

Maximize the expected logarithmic growth rate of wealth:

```
max_f E[ln(1 + f * R)]
```

where f is the fraction of wealth to bet and R is the return of the bet.

For a binary bet (win W with probability p, lose L with probability q = 1-p):

```
f* = p/L - q/W = (p*W - q*L) / (W*L)
```

For a simple bet (win or lose the bet amount):

```
f* = p - q = 2p - 1       (when W = L = 1)
f* = (p*b - q) / b        (when win b for every 1 risked)
```

### Continuous Kelly for Investments

For a normally distributed return with mean mu and variance sigma^2:

```
f* = mu / sigma^2 = Sharpe^2 / mu = mu / sigma^2
```

This is the leverage ratio that maximizes long-run geometric growth.

### Fractional Kelly

Full Kelly is extremely aggressive and produces large drawdowns. Practical application:

```
f_practical = alpha * f*    where alpha in [0.25, 0.50]
```

- **Full Kelly (alpha = 1):** Maximum growth but 50% drawdown expected
- **Half Kelly (alpha = 0.5):** 75% of full Kelly growth with much smaller drawdowns
- **Quarter Kelly (alpha = 0.25):** Conservative, smooth equity curve

### Kelly for Options

For options trades, compute the expected value and variance of the trade outcome:

```
f* = E[R_trade] / Var(R_trade)
```

where R_trade is the return on capital at risk. Estimate E[R] and Var(R) from:
- Historical win rate and average win/loss ratio
- Model-implied distribution (Monte Carlo)
- Implied distribution from option prices

### Limitations

- Assumes known probabilities (estimation error can be catastrophic)
- Assumes independent bets (correlation between trades reduces optimal sizing)
- Extremely sensitive to parameter estimates (overestimating edge -> ruin)
- Does not account for liquidity, margin, or transaction costs

---

## 8. Position Sizing

### Fixed Fractional

Risk a fixed percentage of account equity on each trade:

```
Position size = (Account * risk_fraction) / (max_loss_per_unit)
```

Example: $100K account, 2% risk, max loss $500/contract -> 4 contracts.

### Volatility-Adjusted Sizing

Normalize position sizes by volatility:

```
Contracts = Target_Dollar_Vol / (ATR * multiplier * point_value)
```

This ensures each position contributes equal volatility to the portfolio.

### Greeks-Based Sizing

Size positions to achieve target Greek exposures:

```
Contracts = Target_Dollar_Gamma / (gamma_per_contract * S^2 / 100)
Contracts = Target_Dollar_Vega / (vega_per_contract)
```

### Maximum Position Size Constraints

- **Liquidity constraint:** No more than X% of average daily volume
- **Concentration constraint:** No single position > Y% of portfolio
- **Margin constraint:** Total margin < Z% of account equity
- **Correlation constraint:** Reduce size when adding correlated positions

---

## 9. Correlation Risk

### Correlation in Options Portfolios

Options on different underlyings are correlated through:
- Underlying price correlation (beta to market)
- Implied volatility correlation (vol regimes are correlated)
- Rates correlation (for longer-dated options)

### Correlation Breakdown in Stress

Correlations tend to spike toward 1.0 during market crises ("correlations go to 1 in a crash"). This means diversification benefits are smallest exactly when they are needed most.

### Dispersion Trading

Exploit the difference between index implied vol and constituent implied vols:

```
Implied correlation = (IV_index^2 - sum(w_i^2 * IV_i^2)) / (2 * sum_{i<j}(w_i * w_j * IV_i * IV_j))
```

If implied correlation > realized correlation, sell index vol and buy constituent vol (dispersion trade).

---

## 10. Tail Risk Hedging

### The Problem

Standard risk management fails in tail events because:
- VaR underestimates tail losses
- Correlations break down
- Liquidity evaporates
- Margin calls force liquidation at worst prices

### Tail Hedging Strategies

**OTM put buying (direct):**
- Buy 5-10% OTM puts on the index
- Cost: typically 1-3% of portfolio per year
- Payoff: Large in crashes (10x-50x in extreme events)
- Challenge: Persistent negative carry erodes returns in normal markets

**Put spread collars:**
- Buy OTM puts, sell further OTM puts, finance with call sales
- Reduces carry cost but caps crash protection

**VIX calls:**
- Buy OTM VIX calls as crash insurance
- VIX spikes during crashes (vol of vol is high)
- Challenge: VIX call pricing includes significant vol-of-vol premium

**Systematic tail hedging (Universa/Spitznagel approach):**
- Allocate 3-5% of portfolio to deep OTM puts (<25 delta)
- Use the crash payoff to buy discounted assets during the crisis
- Rebalance the hedge monthly
- The "insurance" framing: accept small persistent losses for large occasional gains

### Cost-Benefit Analysis

| Strategy | Annual Cost | Max Hedge Payoff | Break-even Crash |
|----------|-------------|-----------------|------------------|
| 5% OTM puts (rolling monthly) | 2-4% | 5-15x | -15% or worse |
| 10% OTM puts (rolling quarterly) | 1-2% | 10-30x | -20% or worse |
| VIX calls (25 strike, rolling monthly) | 1-3% | 5-10x | VIX > 40 |
| Put spread collar | 0-1% | 2-5x | -10% to -25% band |

---

## 11. Drawdown Management

### Maximum Drawdown

```
MDD = max_{t in [0,T]} (peak_equity_t - equity_t) / peak_equity_t
```

### Drawdown-Based Risk Controls

| Drawdown Level | Action |
|---------------|--------|
| 5% | Review all positions; reduce size by 25% |
| 10% | Halt new positions; reduce existing by 50% |
| 15% | Close all positions; paper trade only |
| 20% | Full stop; comprehensive strategy review |

### Recovery Mathematics

| Drawdown | Required Gain to Recover |
|----------|------------------------|
| 10% | 11.1% |
| 20% | 25.0% |
| 30% | 42.9% |
| 50% | 100.0% |
| 75% | 300.0% |

The asymmetry of drawdowns is why capital preservation is paramount.

---

## 12. Integration with Trading System

### Risk Check Pipeline

```
Trade Signal -> Pre-trade Risk Checks:
  1. Position size within limits?
  2. Portfolio delta within limits after trade?
  3. Portfolio vega within limits after trade?
  4. Margin sufficient?
  5. Correlation check (not too concentrated)?
  6. Drawdown level acceptable?
  -> PASS: Execute trade
  -> FAIL: Reject with reason code
```

### Real-Time Risk Monitoring

- Greeks recalculated every tick or every N seconds
- Scenario matrix updated intraday
- Margin utilization tracked vs. limits
- P&L attribution computed continuously

---

## References

- Jorion, P. (2006). *Value at Risk: The New Benchmark for Managing Financial Risk*
- McNeil, A., Frey, R. & Embrechts, P. (2015). *Quantitative Risk Management*
- Taleb, N.N. (2020). *Statistical Consequences of Fat Tails*
- Kelly, J.L. (1956). "A New Interpretation of Information Rate"
- Thorp, E.O. (2017). *A Man for All Markets*
- Spitznagel, M. (2021). *Safe Haven: Investing for Financial Storms*

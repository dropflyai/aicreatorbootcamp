# Behavioral Finance for Options Trading

**Prerequisite:** Decision theory, microeconomics, cognitive psychology
**Relevance:** Understanding market anomalies, avoiding cognitive biases, exploiting behavioral mispricings

---

## 1. Prospect Theory (Kahneman & Tversky, 1979)

### Expected Utility Theory (The Rational Baseline)

Under classical expected utility theory (EUT), an agent maximizes:

```
EU = sum_i p_i * u(W + x_i)
```

where p_i are objective probabilities, x_i are outcomes, W is initial wealth, and u() is a concave utility function (risk aversion).

### Prospect Theory: Key Departures from EUT

Kahneman and Tversky observed that actual human decision-making systematically violates EUT:

1. **Reference dependence:** People evaluate outcomes relative to a reference point (gains vs. losses), not final wealth
2. **Loss aversion:** Losses loom larger than gains (approximately 2x)
3. **Diminishing sensitivity:** Marginal impact decreases for both gains and losses as magnitude increases
4. **Probability weighting:** People overweight small probabilities and underweight large probabilities

### Value Function

```
v(x) = x^alpha                  if x >= 0  (gains)
v(x) = -lambda * (-x)^beta      if x < 0   (losses)
```

Typical parameter estimates (Tversky & Kahneman 1992):
- alpha = 0.88 (diminishing sensitivity for gains)
- beta = 0.88 (diminishing sensitivity for losses)
- lambda = 2.25 (loss aversion coefficient)

Properties:
- Concave for gains (risk-averse for gains)
- Convex for losses (risk-seeking for losses)
- Steeper for losses than gains (loss aversion)
- S-shaped around the reference point

```
    v(x)
    |          ******* (gains: concave)
    |      ****
    |   ***
    |  *
    | *
    +*----------------------------------> x (outcome)
    *|
    * |
   *  |
  *   |  (losses: convex, steeper)
 *    |
**    |
```

### Probability Weighting Function

```
w(p) = p^gamma / (p^gamma + (1-p)^gamma)^{1/gamma}
```

Typical gamma = 0.61 (Tversky & Kahneman 1992).

Properties:
- w(0) = 0, w(1) = 1 (certainty preserved)
- Overweighting of small probabilities: w(0.01) >> 0.01
- Underweighting of moderate-to-large probabilities: w(0.5) < 0.5
- The "certainty effect": going from 99% to 100% feels much larger than 50% to 51%

### Cumulative Prospect Theory (1992)

The prospect theory value of a gamble with ranked outcomes x_1 <= ... <= x_n:

```
V = sum_{i: x_i < 0} [w^{-}(sum_{j<=i} p_j) - w^{-}(sum_{j<i} p_j)] * v(x_i)
  + sum_{i: x_i >= 0} [w^{+}(sum_{j>=i} p_j) - w^{+}(sum_{j>i} p_j)] * v(x_i)
```

This is rank-dependent: decision weights depend on the position of outcomes in the ranked order, not just individual probabilities. This avoids violations of stochastic dominance that plagued original prospect theory.

### Implications for Options

Prospect theory explains several options market phenomena:

1. **Demand for lottery-like options:** OTM call buyers overweight the small probability of a large payoff (w(p) >> p for small p). This makes OTM calls overpriced.
2. **Demand for protective puts:** Loss aversion (lambda > 1) makes investors overpay for downside protection.
3. **The disposition effect in options:** Traders hold losing option positions too long and close winning positions too early.
4. **Risk reversal in the loss domain:** In the loss domain (convex value function), traders become risk-seeking, leading to doubling-down behavior.

---

## 2. Overconfidence in Trading

### Forms of Overconfidence

1. **Miscalibration:** Confidence intervals are too narrow (90% CI contains the true value only 50% of the time)
2. **Overprecision:** Excessive certainty in own estimates
3. **Overplacement:** Believing you are better than average (the "Lake Wobegon" effect)

### Evidence in Options Markets

- Overconfident traders trade more frequently, generating higher transaction costs
- Excessive trading is the single biggest predictor of poor individual investor performance (Barber & Odean, 2000)
- Overconfidence leads to underdiversification (concentrated bets) and insufficient hedging
- Overconfident traders underestimate volatility (their implied vol is too low), leading them to sell options too cheaply

### Quantitative Measure

The overconfidence ratio:

```
OC = (Perceived skill - Actual skill) / Actual skill
```

For financial professionals, average miscalibration is ~30-50% (confidence intervals are dramatically too narrow).

### Mitigation for Trading Systems

- Require explicit confidence levels for every forecast input
- Track calibration: what fraction of 90% confidence intervals actually contain the outcome?
- Implement systematic de-biasing: widen all confidence intervals by a calibration factor
- Use base rates (historical frequencies) as anchors before adjusting with subjective views

---

## 3. The Disposition Effect

### Definition

The tendency to sell winners too early and hold losers too long.

### Mechanism (Prospect Theory Explanation)

- Gains are in the concave region: risk aversion leads to locking in profits
- Losses are in the convex region: risk-seeking leads to holding and hoping for recovery
- The reference point (purchase price) creates an asymmetry in behavior

### Evidence

Odean (1998) found that individual investors are 50% more likely to sell a winning stock than a losing stock. This behavior is costly: the winners they sell continue to outperform the losers they hold by ~3.4% per year.

### Impact on Options Trading

The disposition effect is amplified in options because:
- Options have finite life (unlike stocks), making "hold and hope" especially destructive
- Time decay (theta) actively works against holding losing positions
- Options are leveraged instruments, so the dollar magnitude of gains/losses is amplified

### Quantitative Framework

```
Proportion of Gains Realized (PGR) = (gains realized) / (gains realized + gains unrealized)
Proportion of Losses Realized (PLR) = (losses realized) / (losses realized + losses unrealized)

Disposition effect = PGR - PLR > 0
```

A rational trader should have PGR ~ PLR (or PGR < PLR for tax-loss harvesting).

### Countermeasures

- Pre-define exit rules (both profit targets and stop losses) before entering
- Use automated execution for exits (removes emotional intervention)
- Track PGR and PLR explicitly in the trade journal
- Reframe positions: "If I did not own this position, would I enter it today at the current price?"

---

## 4. Herding

### Definition

The tendency to follow the crowd, even when private information suggests a different action.

### Information Cascade Model (Bikhchandani, Hirshleifer, Welch, 1992)

Sequential decision-makers observe the actions (but not the private signals) of predecessors:

1. First mover acts on private signal
2. Second mover sees first mover's action; if consistent with own signal, follows. If not, the decision depends on the relative strength of signals
3. After enough sequential agreements, a cascade forms: all subsequent movers follow the crowd regardless of private signals
4. Cascades are fragile: a small public signal can reverse the cascade entirely

### Herding in Options Markets

- Sudden spikes in OTM put buying can trigger cascade-like behavior (everyone hedges at once)
- Crowded trades (e.g., selling low-vol, buying momentum) can unwind violently when the herd reverses
- Options market makers adjust quotes based on aggregate order flow; one-sided flow begets more one-sided flow
- The "pain trade" concept: the market moves in the direction that causes maximum pain to the largest number of positioned traders

### Contrarian vs. Momentum

| Strategy | Behavioral Basis | Timeframe |
|----------|-----------------|-----------|
| Momentum | Herding + underreaction to information | 1-12 months |
| Contrarian | Overreaction + mean reversion | Short (< 1 week) or long (> 3 years) |

Options traders can exploit herding-driven overreactions by:
- Selling overpriced options during panic (put selling when VIX spikes)
- Buying options when complacency depresses IV (buying protection when VIX is at lows)

---

## 5. Noise Trader Risk (DeLong-Shleifer-Summers-Waldmann, 1990)

### DSSW Model

Two types of agents:
- **Rational arbitrageurs:** Know the true value, have limited capital and horizons
- **Noise traders:** Trade on sentiment, creating price deviations from fundamental value

### Key Results

1. **Noise trader risk:** Even if arbitrageurs know an asset is mispriced, they cannot fully correct the mispricing because noise traders might push the price further away before it corrects
2. **Noise traders can earn higher returns:** By bearing risk that rational agents avoid (noise trader risk), irrational traders can survive and even thrive in equilibrium
3. **Limits to arbitrage:** Rational traders with finite horizons and capital constraints cannot fully eliminate mispricings

### Formal Model

Price deviates from fundamental value by:

```
p_t - v = rho_t / (1 + r) + noise_risk_premium
```

where rho_t is the noise trader misperception. The noise risk premium compensates rational agents for bearing the risk that noise traders will become even more irrational.

### Implications for Options

- Options mispricings can persist because arbitrage is risky (the spread can widen before it narrows)
- Selling overpriced options (e.g., systematically selling VIX futures) is profitable on average but has extreme left-tail risk
- Capital structure and funding stability are essential for options arbitrage (LTCM lesson)

---

## 6. Limits to Arbitrage

### Why Mispricings Persist

1. **Fundamental risk:** The "correct" value is uncertain; the asset may not converge to your estimate
2. **Noise trader risk:** Mispricing can widen before correcting (Shleifer & Vishny, 1997)
3. **Implementation costs:** Transaction costs, margin, borrowing costs, short-sale constraints
4. **Horizon risk:** Mispricings may take longer to correct than the arbitrageur's investment horizon
5. **Model risk:** Your pricing model may be wrong

### Put-Call Parity Violations

Even the fundamental arbitrage relationship (put-call parity) shows persistent deviations in practice:
- Transaction costs and bid-ask spreads prevent exact exploitation
- Early exercise risk for American options complicates the relationship
- Dividend uncertainty affects the theoretical parity

### Implied Volatility as a Limit to Arbitrage

Selling overpriced implied vol (when IV > subsequent RV) is profitable on average but:
- Requires margin capital that may be called at the worst time (vol spike)
- Gamma risk means realized moves matter, not just realized vol
- Path dependency: selling vol in January 2020 was profitable until March 2020

---

## 7. Volatility Puzzles

### The Volatility Risk Premium Puzzle

Implied volatility consistently exceeds realized volatility by 2-4 vol points. This "variance risk premium" is too large to be explained by standard asset pricing models. Behavioral explanations:

- **Loss aversion:** Investors overpay for put protection due to lambda > 1
- **Probability weighting:** Overweighting of crash scenarios inflates put prices
- **Representativeness:** Recent high-vol periods cause investors to overestimate future vol

### The Skew Puzzle

The implied volatility skew (OTM puts more expensive than OTM calls) is steeper than justified by historical crash frequencies. Behavioral explanations:

- **Crash-o-phobia:** After 1987, investors developed outsized fear of left-tail events
- **Availability bias:** Memorable crashes (1987, 2008, 2020) are overweighted in subjective probabilities
- **Insurance demand:** Institutional hedging requirements create inelastic put demand

### The VIX Term Structure Puzzle

VIX is almost always in contango (upward-sloping term structure), meaning short-dated VIX futures are cheaper than long-dated. This creates a persistent roll yield for VIX short sellers, which seems "too easy":

- **Behavioral:** Investors overpay for longer-dated insurance due to uncertainty aversion
- **Structural:** Pension funds and insurers have mandated hedging requirements
- **Supply/demand:** More sellers of short-dated vol (income strategies) than long-dated

---

## 8. Options Market Anomalies

### Earnings Volatility Premium

Implied volatility before earnings announcements significantly overestimates realized earnings-day moves:

```
Average IV implied move: ~7%
Average realized move: ~5%
Overestimation: ~40%
```

This creates a systematic opportunity to sell earnings straddles (but with significant tail risk from outlier moves).

### Weekend/Holiday Effects

Options prices do not fully adjust for non-trading days:
- Theta decay is typically priced as 1/365 per calendar day
- But no trading occurs on weekends (no gamma scalping opportunity)
- Some evidence that selling Friday / buying Monday captures excess theta

### Volatility Term Structure Anomaly

The slope of the IV term structure predicts future IV changes:
- Steep contango (low near-term IV) predicts subsequent vol increases
- Backwardation (high near-term IV) predicts subsequent vol decreases
- This is partially behavioral (investors extrapolate current vol regime too far)

### Momentum in Options Returns

Delta-hedged option returns exhibit momentum:
- Options that have been expensive (high IV-RV spread) continue to be expensive
- Options that have been cheap continue to be cheap
- Momentum factor in options earns 3-5% per year (after transaction costs in liquid names)

---

## 9. Cognitive Biases Checklist for Traders

| Bias | Description | Impact on Options Trading | Mitigation |
|------|-------------|--------------------------|------------|
| Anchoring | Over-reliance on first piece of information | Anchoring on entry price, ignoring changed conditions | Use model-based fair values, not entry prices |
| Recency bias | Overweighting recent events | Extrapolating current vol regime | Use longer lookback periods; mean-revert expectations |
| Confirmation bias | Seeking info that confirms beliefs | Ignoring bearish signals when long | Systematically seek disconfirming evidence |
| Gambler's fallacy | Expecting mean reversion in random sequences | "It's been down 5 days, it must bounce" | Base decisions on statistical edge, not patterns |
| Sunk cost fallacy | Continuing because of past investment | Holding losing options hoping for recovery | Pre-commit to exit rules; ignore entry price |
| Availability | Overweighting vivid/memorable events | Overpaying for puts after a crash | Use base rate statistics, not narratives |
| Endowment effect | Overvaluing what you own | Holding positions longer than warranted | "Would I enter this trade today?" test |
| Framing | Decision depends on presentation | "90% chance of profit" vs. "10% chance of total loss" | Always compute expected value explicitly |
| Status quo bias | Preferring current state | Not adjusting positions when conditions change | Scheduled portfolio reviews with forced decisions |
| Overconfidence | Excessive faith in own judgment | Oversizing positions, insufficient hedging | Track accuracy; use systematic sizing (Kelly) |

---

## 10. Building Behavioral Awareness into Trading Systems

### Systematic De-Biasing

1. **Pre-trade checklist:** Force consideration of alternatives and risks before every trade
2. **Automated exits:** Remove human judgment from stop-loss and profit-taking execution
3. **Position sizing rules:** Kelly criterion or fixed-fractional sizing prevents overconfidence-driven oversizing
4. **Calibration tracking:** Log all predictions with confidence intervals; measure actual calibration
5. **Trade journal review:** Monthly review of decisions vs. outcomes; identify recurring biases

### Behavioral Alpha

Exploit the biases of other market participants:

- **Sell overpriced OTM options:** Probability weighting makes lottery-like options overpriced
- **Sell vol after crashes:** Loss aversion + availability bias makes puts overpriced after sharp declines
- **Buy vol in calm markets:** Complacency and recency bias makes protection too cheap
- **Fade herding-driven moves:** Crowded trades create reversals; contrarian positioning after extreme sentiment

### Risk of "Behavioral Arbitrage"

- These strategies require patience (mispricings persist due to limits to arbitrage)
- Tail risk is real (selling "overpriced" puts is profitable until a crash actually happens)
- Behavioral alpha decays as strategies become crowded
- Capital preservation through drawdown controls is non-negotiable

---

## References

- Kahneman, D. & Tversky, A. (1979). "Prospect Theory: An Analysis of Decision Under Risk"
- Tversky, A. & Kahneman, D. (1992). "Advances in Prospect Theory: Cumulative Representation of Uncertainty"
- Shleifer, A. (2000). *Inefficient Markets: An Introduction to Behavioral Finance*
- DeLong, B., Shleifer, A., Summers, L. & Waldmann, R. (1990). "Noise Trader Risk in Financial Markets"
- Barber, B. & Odean, T. (2000). "Trading Is Hazardous to Your Wealth"
- Barberis, N. & Thaler, R. (2003). "A Survey of Behavioral Finance"
- Shefrin, H. (2000). *Beyond Greed and Fear*
- Thaler, R. (2015). *Misbehaving: The Making of Behavioral Economics*

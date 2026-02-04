# Volatility Strategies

**Prerequisite:** theory/volatility.md, theory/greeks.md, theory/stochastic_calculus.md
**Relevance:** Trading implied vs. realized volatility, non-directional strategies, vol surface arbitrage

---

## 1. Straddles

### Long Straddle
**Structure:** Buy ATM call + buy ATM put. Same strike, same expiry.

```
Max profit: Unlimited (in either direction)
Max loss: Total premium paid (both legs expire worthless)
Breakeven: K +/- total premium paid
```

### Greeks Profile (Long Straddle)
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | ~0 (ATM) | Non-directional |
| Gamma | + (large) | Profits from large moves in either direction |
| Theta | - (large) | Heavy time decay; the cost of gamma |
| Vega | + (large) | Profits from IV increase |

### When to Buy Straddles
- Expected realized vol > implied vol (the move will be larger than the market prices)
- Before a binary event where the direction is unknown but the magnitude is expected to be large
- When IV is at historical lows (cheap gamma)

### When to Sell Straddles
- Expected realized vol < implied vol (the market is overpricing movement)
- After an event has passed and IV is expected to crush
- When IV is at historical highs

### Short Straddle Risk
- Unlimited loss potential (theoretically)
- Margin-intensive
- Gamma risk accelerates near expiry
- Requires active management and stop-loss discipline

---

## 2. Strangles

### Long Strangle
**Structure:** Buy OTM put (K_1) + buy OTM call (K_2), where K_1 < K_2.

```
Max profit: Unlimited
Max loss: Total premium paid
Upper breakeven: K_2 + total premium
Lower breakeven: K_1 - total premium
```

### Short Strangle
**Structure:** Sell OTM put + sell OTM call.

```
Max profit: Net credit
Max loss: Unlimited
Profit zone: Between K_1 - credit and K_2 + credit
```

### Straddle vs. Strangle

| Feature | Straddle | Strangle |
|---------|----------|----------|
| Cost | Higher | Lower |
| Gamma exposure | Higher | Lower |
| Breakeven range | Narrower | Wider |
| Prob. of max loss | Lower | Higher (both expire OTM) |
| Delta at initiation | ~0 | ~0 |

### Iron Strangle (Defined Risk)
Add wings: Buy a further OTM put below the sold put and a further OTM call above the sold call. This caps the maximum loss and is functionally an iron condor.

---

## 3. Butterflies

### Long Call Butterfly
**Structure:** Buy 1 call at K_1, sell 2 calls at K_2 (middle), buy 1 call at K_3.
Where K_1 < K_2 < K_3 and K_2 - K_1 = K_3 - K_2 (equal spacing).

```
Max profit: (K_2 - K_1) - net debit  (at K_2 at expiry)
Max loss: Net debit
Breakevens: K_1 + debit and K_3 - debit
```

### Greeks Profile (Long Butterfly)
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | ~0 (centered) | Non-directional |
| Gamma | - (short gamma near middle strike) | Profits from stock staying near K_2 |
| Theta | + (positive theta, collecting time decay) | Time decay helps if stock is near K_2 |
| Vega | - (short vega) | Benefits from IV decrease |

### Short Butterfly
The reverse: sell wings, buy body. This is a long volatility position (profits from large moves away from K_2). Rarely used directly; more often constructed via spread combinations.

### Broken-Wing Butterfly
Asymmetric spacing: e.g., buy 95 call, sell 2x 100 calls, buy 110 call. The wider wing on one side creates a directional bias while maintaining butterfly-like characteristics. Can be structured for zero cost or a credit.

---

## 4. Iron Butterfly

### Structure
Sell ATM call + sell ATM put + buy OTM call (higher) + buy OTM put (lower). Equivalent to a short straddle with protective wings.

```
Max profit: Net credit
Max loss: Wing width - net credit
Breakevens: K_ATM +/- net credit
```

### Comparison to Short Straddle

| Feature | Short Straddle | Iron Butterfly |
|---------|---------------|----------------|
| Max loss | Unlimited | Wing width - credit |
| Margin | Very high | Wing width only |
| Max profit | Higher (no wings to pay for) | Lower (wings cost money) |
| Risk management | Requires active stops | Built-in risk limit |

---

## 5. Calendar Spreads (Time Spreads)

### Structure
Sell near-term option at strike K, buy longer-term option at same strike K.

```
Max profit: Occurs when stock is at K at near-term expiry (hard to compute analytically)
Max loss: Net debit
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | ~0 (ATM) | Non-directional |
| Gamma | - (short near-term gamma dominates) | Hurt by large near-term moves |
| Theta | + (short near-term theta > long far-term theta) | Collect net time decay |
| Vega | + (long far-term vega > short near-term vega) | Benefits from IV increase |

### Thesis
Calendar spreads profit from:
1. Time passing (front month decays faster than back month)
2. IV increasing (back month has more vega)
3. Stock staying near the strike (preserves the time value differential)

### Term Structure Play
- Buy calendars when the IV term structure is inverted (front > back): expect normalization to contango
- Sell calendars when term structure is in steep contango: expect flattening

### Double Calendar
Sell near-term call + put (different OTM strikes), buy longer-term call + put (same strikes). Creates a wider profit zone than a single calendar.

---

## 6. Diagonal Spreads

### Structure
Sell near-term option at strike K_1, buy longer-term option at strike K_2 (different strike and different expiry).

### Bullish Diagonal (Poor Man's Covered Call)
Buy long-dated ITM call (high delta), sell short-dated OTM call. Mimics covered call but with less capital.

### Bearish Diagonal
Buy long-dated ITM put, sell short-dated OTM put.

### Greeks
Similar to calendar spreads but with added directional bias from the strike difference. The long leg's higher delta creates directional exposure.

---

## 7. Ratio Spreads

### Call Ratio Spread (1x2)
Buy 1 ATM call, sell 2 OTM calls.

```
Max profit: (K_2 - K_1) + net credit (or - net debit)  at K_2 at expiry
Max loss: Unlimited above upper breakeven
Lower breakeven: K_1 + debit (or protected if done for credit)
Upper breakeven: K_2 + (K_2 - K_1) + credit (or - debit)
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | + (slightly) | Mildly bullish |
| Gamma | - (above the short strikes) | Hurt by moves above K_2 |
| Theta | + (net short theta above K_2) | Collect decay if stock near K_2 |
| Vega | - (net short vega) | Benefits from IV decrease |

### Usage
- Express a moderately bullish view with potential for zero-cost or credit entry
- Best when IV is high (selling premium is favorable)
- Requires careful management of the naked short leg

### Put Ratio Spread (1x2)
Buy 1 ATM put, sell 2 OTM puts. Used for bearish-to-neutral views. Unlimited risk below the lower breakeven.

---

## 8. Volatility Arbitrage

### The Core Trade
Compare implied volatility to a forecast of realized volatility:

```
Signal = IV - Forecast_RV
If Signal > threshold: Sell vol (sell straddles, butterflies)
If Signal < threshold: Buy vol (buy straddles, sell butterflies)
```

### Implementation

1. **Delta-hedge continuously:** Buy or sell stock to maintain delta neutrality
2. **P&L accrues from gamma:** dP&L = (1/2) * Gamma * (realized_move^2 - implied_move^2)
3. **Daily P&L:** ~ (1/2) * Gamma * S^2 * (sigma_realized^2 - sigma_implied^2) * dt

### Practical Challenges

- **Hedging frequency:** Continuous hedging is impossible; discrete hedging introduces "hedging error"
- **Transaction costs:** Each rebalance costs spread + commissions; eats into gamma P&L
- **Volatility of volatility:** IV can change during the trade, creating vega P&L
- **Gamma profile changes:** As the stock moves, gamma changes; the position is not static

### P&L Attribution for Vol Arb

```
Total P&L = Gamma P&L (realized vs. implied) + Vega P&L (IV changes) + Theta P&L + Hedging costs
```

The goal is for Gamma P&L to dominate and be positive.

---

## 9. Dispersion Trading

### Concept
Index implied volatility is systematically higher than what is justified by the implied volatilities of its constituents, because implied correlation is too high.

```
Index_IV^2 ~ sum(w_i^2 * IV_i^2) + 2*sum_{i<j}(w_i*w_j*IV_i*IV_j*rho_implied)
```

If rho_implied > rho_realized, the index vol is "too high" relative to constituent vols.

### Structure
- **Sell index options** (straddles or strangles on SPX)
- **Buy constituent options** (straddles on top N components, weighted by index weight)
- **Delta-hedge** both legs independently

### P&L Driver

```
P&L ~ Notional * (Implied_correlation - Realized_correlation)
```

### Risks
- Correlation can spike in a crisis (dispersion trade loses)
- Execution across many names is complex and costly
- Single-stock events (earnings, M&A) affect individual legs
- Sizing requires careful correlation exposure measurement

---

## 10. Variance Swaps

### Definition
A forward contract on realized variance over a period:

```
Payoff = Notional * (sigma_realized^2 - K_var) * 252 / T
```

where K_var is the strike (variance level), and sigma_realized is the annualized realized volatility computed from daily log returns.

### Replication
A variance swap can be replicated by a portfolio of options across all strikes:

```
K_var = (2/T) * [integral_0^F (1/K^2) * P(K) dK + integral_F^inf (1/K^2) * C(K) dK]
```

This is a model-free result (no Black-Scholes assumptions). The VIX^2 is essentially the variance swap strike for 30-day S&P 500.

### Variance Swap Greeks
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | 0 (by construction, model-free) | Pure vol exposure |
| Gamma | Constant (dollar gamma proportional to 1/S) | No gamma convexity risk |
| Vega | Varies with S | Exposure changes as stock moves |

### Volatility Swaps vs. Variance Swaps
- Variance swap: linear in variance (sigma^2)
- Volatility swap: linear in volatility (sigma)
- Convexity adjustment: K_vol < sqrt(K_var) because E[sigma] < sqrt(E[sigma^2]) by Jensen's inequality

---

## 11. Strategy Selection Decision Tree

```
Volatility View: Long Vol / Short Vol / Neutral

1. Long Volatility (expect RV > IV or IV increase):
   a. Magnitude expectation?
      Large -> Long straddle/strangle
      Moderate -> Long butterfly (reverse), calendar spread
      Unknown -> Variance swap (pure vol bet)
   b. Direction bias?
      None -> Straddle centered at ATM
      Slight bullish -> Strangle skewed (lower put, higher call)
      Slight bearish -> Reverse skew

2. Short Volatility (expect RV < IV or IV decrease):
   a. Risk tolerance?
      High -> Short straddle, short strangle
      Moderate -> Iron butterfly, iron condor
      Low -> Long butterfly, calendar spread (short front)
   b. Event-driven?
      Pre-earnings -> Sell vol before event, close on IV crush
      Steady state -> Systematic selling with defined entry/exit rules

3. Relative Value (surface dislocations):
   a. Term structure dislocation -> Calendar spread
   b. Skew dislocation -> Risk reversal, ratio spread
   c. Correlation dislocation -> Dispersion trade
```

---

## References

- Sinclair, E. (2013). *Volatility Trading*
- Bennett, C. (2014). *Trading Volatility*
- Gatheral, J. (2006). *The Volatility Surface*
- Bossu, S. (2014). "Advanced Equity Derivatives"
- Derman, E. (2016). *The Volatility Smile*

# Advanced Strategies

**Prerequisite:** All theory files, strategies/directional.md, strategies/volatility.md, strategies/income.md
**Relevance:** Arbitrage, complex multi-leg trades, portfolio-level hedging, tail risk management

---

## 1. Box Spreads

### Structure
Bull call spread (K_1, K_2) + bear put spread (K_2, K_1):

```
Buy call at K_1, sell call at K_2
Buy put at K_2, sell put at K_1
```

### Payoff
At any stock price at expiry:

```
Payoff = K_2 - K_1   (guaranteed, regardless of stock price)
```

A box spread is a synthetic zero-coupon bond. The cost of the box should equal:

```
Cost = (K_2 - K_1) * e^{-rT}    (or discounted at the risk-free rate)
```

### Arbitrage Application
If the market price of the box differs from the theoretical price:
- **Box too cheap:** Buy the box (earn above risk-free rate)
- **Box too expensive:** Sell the box (borrow below risk-free rate)

### Practical Notes
- Box spread arbitrage is used by institutions to earn or pay financing rates through options
- On European options (SPX), box spreads are clean arbitrage
- On American options (equity options), early exercise risk complicates the trade
- The implied interest rate from box spreads can differ from SOFR, indicating market-specific financing conditions

---

## 2. Conversion and Reversal Arbitrage

### Conversion
Long stock + long put + short call (same strike and expiry):

```
Payoff = K    (guaranteed, by put-call parity)
```

A conversion is profitable if:

```
S + P - C > K * e^{-rT}    (position costs less than the guaranteed payoff)
```

### Reversal
Short stock + short put + long call:

```
Payoff = -K   (guaranteed obligation)
```

A reversal is profitable if:

```
C - P - S < -K * e^{-rT}   (equivalently, you collect more than the guaranteed obligation)
```

### Dividend Arbitrage
For American options, early exercise of ITM calls just before ex-dividend can create arbitrage:

```
If dividend > time value of the call:
  The call holder should exercise early
  The conversion/reversal arbitrageur must account for this
```

### Pin Risk in Conversions
At expiry, if the stock is near the strike:
- You may be assigned on the short call but not exercise the long put (or vice versa)
- Overnight risk between assignment and the next trading session

---

## 3. Jelly Rolls

### Structure
A jelly roll is a combination of a synthetic long position in one expiry and a synthetic short position in another:

```
Buy call at K, sell put at K (expiry T_1)    -- synthetic long for T_1
Sell call at K, buy put at K (expiry T_2)    -- synthetic short for T_2
```

### Payoff
The jelly roll captures the cost of carrying the stock from T_1 to T_2:

```
Value = (T_2 - T_1) * (r - q) * S    (approximately)
```

where r is the interest rate and q is the dividend yield.

### Application
- Arbitrage on interest rate differentials between expiries
- Exploit mispricing in the term structure of synthetic stock
- Measure the market-implied financing rate and dividend expectation

---

## 4. Christmas Trees

### Call Christmas Tree
Buy 1 ITM call (K_1), sell 1 ATM call (K_2), sell 1 OTM call (K_3):

```
Structure: Long K_1 call, short K_2 call, short K_3 call
Equivalent to: Bull call spread (K_1, K_2) + naked short call at K_3
```

### Risk Profile
- Profits if stock rises moderately (to K_2)
- Unlimited risk above K_3 due to the naked short call
- Cheap to enter (three legs partially offset)

### Put Christmas Tree
Buy 1 ITM put, sell 1 ATM put, sell 1 OTM put. Bearish equivalent with unlimited downside risk below the lowest strike.

### Modified Christmas Tree (Ladder)
Equal spacing between strikes, with defined risk by adding a long option at a fourth strike.

---

## 5. Double Diagonals

### Structure
Sell near-term OTM put + sell near-term OTM call + buy far-term further OTM put + buy far-term further OTM call.

```
Short put (K_1, T_1) + Short call (K_2, T_1) + Long put (K_3, T_2) + Long call (K_4, T_2)
where T_1 < T_2, K_3 < K_1, K_4 > K_2
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | ~0 | Non-directional |
| Gamma | - (short near-term dominates) | Hurt by near-term moves |
| Theta | + (collecting near-term decay) | Time decay is the profit source |
| Vega | + (long far-term vega dominates) | Benefits from IV increase |

### When to Use
- Expect near-term stability but uncertain about longer-term volatility
- Want to be long vega and long theta simultaneously (which calendars and double diagonals uniquely offer)
- IV term structure is inverted (front-month IV > back-month IV): expect normalization

---

## 6. Back Spreads (Ratio Back Spreads)

### Call Back Spread (1x2)
Sell 1 ITM call, buy 2 OTM calls. Can be done for a credit.

```
Max profit: Unlimited (above upper breakeven)
Max loss: (K_2 - K_1) - net credit (or + net debit) at K_2 at expiry
Breakevens: Depends on credit/debit
```

### Profile
- Profits from large upward moves (long gamma on the upside)
- Small loss zone near K_2 at expiry
- Profit from sharp downward move if entered for credit (all options expire worthless, keep credit)

### Put Back Spread (1x2)
Sell 1 ITM put, buy 2 OTM puts. Profits from large downward moves.

### When to Use
- Expecting a large move but uncertain about timing (the credit protects if nothing happens)
- Volatility skew is favorable (OTM options are relatively cheap)
- Excellent for pre-event positioning where a large move in one direction is expected

---

## 7. Portfolio Hedging Strategies

### Protective Put (Married Put)
Long stock + long put. Simple but expensive.

```
Cost: Put premium (2-5% per year for ATM puts)
Protection: 100% below the put strike
```

### Put Spread Collar
Long stock + buy OTM put + sell further OTM put + sell OTM call:

```
Protection band: Between the two put strikes
Cost: Reduced (call sale + further OTM put sale fund the primary put)
Trade-off: No protection below the lower put strike (gap risk)
```

### 1x2 Put Spread Hedge
Long stock + buy 1 ATM put + sell 2 OTM puts:

```
Protection: Full between ATM and OTM strikes
Below OTM strike: Protection reverses (effectively double-long below lower strike)
Cost: Reduced or zero (selling 2 puts funds the purchase)
Risk: If stock drops significantly below the OTM strike, the hedge becomes a losing position
```

### VIX Call Hedge
Buy OTM VIX calls as portfolio insurance:
- VIX spikes during equity market crashes (negative correlation)
- VIX calls are inherently convex (payoff accelerates in crashes)
- Cost: 1-2% of portfolio per year
- Challenge: VIX call pricing includes significant vol-of-vol premium; erosion in calm markets

### Tail Risk Hedging (Taleb / Universa Approach)

**Philosophy:** Accept small, frequent losses (premium paid) in exchange for large, infrequent gains (crash protection).

**Implementation:**
1. Allocate 3-5% of portfolio to tail hedge
2. Buy deep OTM puts (5-15 delta) on broad indices
3. Use 1-3 month expiries (roll monthly)
4. During crash: hedge pays 10-50x, which funds buying discounted assets
5. During calm: hedge bleeds theta (this is the cost of insurance)

**Position Sizing:**
```
Hedge notional = Portfolio_value * hedge_allocation / put_price
Target: Hedge pays 100-300% of portfolio loss in a -20% crash scenario
```

**Key Metric:**
```
Hedge ratio = Hedge_gain_in_crash / Portfolio_loss_in_crash
Target hedge ratio: 0.5 to 1.0 (hedging 50-100% of crash losses)
```

### Dynamic Hedging with Options

Adjust hedge ratio based on market conditions:

| VIX Level | Hedge Allocation | Rationale |
|-----------|-----------------|-----------|
| < 15 | 5% (maximum) | Insurance is cheap; buy more |
| 15-25 | 3% (standard) | Normal pricing |
| 25-35 | 2% (reduced) | Expensive; reduce allocation |
| > 35 | 1% (minimum) | Very expensive; hedge is less needed (vol already high) |

---

## 8. Multi-Leg Combinations

### Iron Fly + Iron Condor = "Winged Iron Butterfly"
Combine for a wider profit zone with higher credit:
- Sell ATM straddle (iron butterfly body)
- Buy OTM strangle as wings
- Additional OTM wings for further protection

### Double Butterfly
Two butterflies at different strikes:
- Butterfly centered at K_1 (slightly bearish)
- Butterfly centered at K_2 (slightly bullish)
- Profits from stock ending near either strike

### Unbalanced Condor
Asymmetric wing widths:
- Wider put spread (more bearish risk)
- Narrower call spread (less bullish risk)
- Expresses a slight directional view within a condor structure

---

## 9. Strategy Risk Matrix

| Strategy | Max Loss | Margin Req | Complexity | Management Need |
|----------|---------|------------|------------|----------------|
| Box spread | Minimal (arb) | Full box value | Medium | None |
| Conversion/reversal | Pin risk | Stock + spread | Medium | Assignment mgmt |
| Jelly roll | Minimal | Two synthetrics | High | None |
| Christmas tree | Unlimited | Naked short req | High | Active |
| Double diagonal | Net debit | Spread margin | High | Roll management |
| Back spread | Limited (or none) | Spread margin | Medium | Moderate |
| Tail hedge | Premium paid | None | Low | Monthly roll |
| Put spread collar | Limited by design | Stock + spread | Medium | Low |

---

## 10. Arbitrage Detection Framework

For the trading system, systematically screen for:

1. **Put-call parity violations:** C - P vs. S - K*exp(-rT). Flag deviations > transaction cost threshold.
2. **Box spread mispricing:** Compare box price to risk-free rate. Flag deviations > 10bps annualized.
3. **Calendar spread arbitrage:** Total implied variance must be non-decreasing in T.
4. **Butterfly spread arbitrage:** Call prices must be convex in K.
5. **Conversion/reversal:** Compare synthetic stock cost to actual stock + borrow cost.

```
Arbitrage Pipeline:
  Market Data -> Compute Theoretical Values -> Compare to Market ->
  Flag Deviations > Threshold -> Validate (check bid-ask, liquidity) ->
  Execute if Real Arbitrage
```

---

## References

- Natenberg, S. (2015). *Option Volatility and Pricing*
- Taleb, N.N. (1997). *Dynamic Hedging*
- Spitznagel, M. (2021). *Safe Haven*
- McMillan, L. (2012). *Options as a Strategic Investment*
- Haug, E.G. (2007). *The Complete Guide to Option Pricing Formulas*

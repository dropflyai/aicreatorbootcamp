# Income Strategies

**Prerequisite:** theory/greeks.md, theory/volatility.md, theory/risk_management.md
**Relevance:** Generating consistent income from options premium, short volatility approaches

---

## 1. Covered Calls

### Structure
Long 100 shares of stock + sell 1 OTM call.

```
Max profit: (K - S_current) + call premium
Max loss: S_current - call premium (stock goes to zero)
Breakeven: S_current - call premium
```

### Strike and Expiry Selection

| Strike (Delta) | Premium | Upside Cap | Assignment Probability |
|----------------|---------|------------|----------------------|
| 0.30 delta (OTM) | Moderate | ~3-5% above current | ~30% |
| 0.20 delta (further OTM) | Lower | ~5-10% above current | ~20% |
| 0.15 delta (far OTM) | Small | ~8-15% above current | ~15% |
| ATM | Highest | At current price | ~50% |

**Expiry selection:**
- 30-45 DTE: Optimal theta decay zone; highest annualized theta per unit of gamma risk
- Weeklies: Higher annualized return but more management; roll every week
- 60+ DTE: Too slow for income generation; more suitable for hedging

### Roll Mechanics

**Roll timing:** When the short call has lost 50-75% of its value, roll to the next cycle.

**Roll up and out:** If the stock has moved above the strike:
```
Buy to close current call (loss on this leg)
Sell to open higher strike, later expiry call (new premium)
Net credit/debit = key metric
```

**Roll down and out:** If the stock has dropped:
```
Buy to close current call (profit on this leg)
Sell to open lower strike, later expiry call (new premium at lower strike)
```

**Never roll for a net debit** (you are paying to maintain a losing position).

### Return Calculation

```
Static return = Premium / (Stock cost basis) * (365 / DTE)    (annualized, if not assigned)
Called-away return = [(K - S_entry) + Premium] / S_entry * (365 / DTE)    (annualized, if assigned)
```

---

## 2. Cash-Secured Puts

### Structure
Sell 1 put at strike K + hold K * 100 in cash (or margin).

```
Max profit: Put premium
Max loss: K - put premium (assigned at K, stock goes to zero)
Breakeven: K - put premium
```

### The Wheel Strategy (Put Selling + Covered Calls)

1. **Phase 1 - Sell puts:** Sell cash-secured puts on stocks you want to own at a lower price
2. **If assigned:** You now own stock at K - premium (effective cost basis)
3. **Phase 2 - Sell calls:** Sell covered calls against your assigned stock
4. **If called away:** You sell at K_call + premium. Return to Phase 1
5. **Repeat:** Continuous income generation on stocks you are willing to own

### Strike Selection for Put Selling

| Approach | Strike Choice | Premium | Assignment Risk |
|----------|--------------|---------|----------------|
| Aggressive | ATM or slightly OTM | High | ~40-50% |
| Standard | 10-15% OTM (0.20-0.30 delta) | Moderate | ~20-30% |
| Conservative | 20-25% OTM (0.10-0.15 delta) | Low | ~10-15% |

### Underlying Selection Criteria
- Stocks you are willing to own at the strike price
- Sufficient liquidity (tight bid-ask spreads)
- No imminent binary events (earnings, FDA) unless intentional
- Moderate IV rank (selling vol at fair or elevated levels)

---

## 3. Iron Condors

### Structure
Sell OTM put spread + sell OTM call spread:
```
Buy put at K_1 (lowest)
Sell put at K_2
Sell call at K_3
Buy call at K_4 (highest)
```

```
Max profit: Net credit
Max loss: Width of wider spread - net credit
Breakevens: K_2 - credit (lower), K_3 + credit (upper)
Profit zone: Stock stays between K_2 and K_3
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | ~0 | Non-directional |
| Gamma | - | Hurt by large moves |
| Theta | + | Collect time decay |
| Vega | - | Benefits from IV decrease |

### Width and Strike Selection

**Wing width (K_2-K_1 and K_4-K_3):** Determines max loss per side.
- $1 wide: Low max loss, low credit
- $5 wide: Higher credit, higher max loss
- Choose based on credit-to-width ratio (target > 1/3 for favorable risk/reward)

**Short strike placement:**
- Standard: 1 standard deviation OTM (16 delta puts, 16 delta calls)
- Wide: 1.5 SD OTM (10 delta each side) for higher win rate, lower credit
- Narrow: 0.75 SD OTM (25 delta each side) for higher credit, lower win rate

### Management Rules

| Scenario | Action |
|----------|--------|
| 50% of max profit reached | Close for profit (buy back the condor) |
| 21 DTE remaining | Close regardless of P&L (avoid gamma risk) |
| Tested on one side (stock near short strike) | Roll tested side out in time; or close entire trade |
| Breached (stock past short strike) | Close for loss; do not hold through max loss |

### Adjustments

**Roll the untested side closer:** If the stock moves toward one wing, roll the opposite (untested) wing closer to ATM to collect more credit and reduce total risk.

**Convert to iron butterfly:** If the stock settles near the center, roll both short strikes to ATM for maximum theta collection.

**Add a directional leg:** If a directional view develops, add a small long option on the threatened side.

---

## 4. Credit Spreads

### Bull Put Spread (Put Credit Spread)
Sell higher put, buy lower put. Bullish-to-neutral view.

### Bear Call Spread (Call Credit Spread)
Sell lower call, buy higher call. Bearish-to-neutral view.

### Probability-Based Framework

```
Probability of profit ~ 1 - (credit / width)
Expected value = POP * credit - (1 - POP) * (width - credit)
```

For edge: Expected value > 0, which requires credit/width > (1 - POP), i.e., the credit must more than compensate for the risk.

### Optimal DTE

Research by tastytrade and others suggests:
- **45 DTE:** Optimal balance of theta decay and gamma risk
- **30-60 DTE range:** Acceptable
- **< 21 DTE:** High gamma risk; only for experienced traders
- **> 60 DTE:** Theta too slow; capital inefficient

---

## 5. Jade Lizard

### Structure
Sell OTM put + sell OTM call spread (short call + long further OTM call):

```
Components: Short put (K_1) + short call (K_2) + long call (K_3)
Max profit: Net credit
Max loss: On downside: K_1 - credit (put assignment). On upside: (K_3 - K_2) - credit
```

### Key Feature
If the total credit > width of the call spread (K_3 - K_2), there is NO upside risk. The only risk is to the downside (short put).

### When to Use
- Bullish-to-neutral outlook
- Want to collect premium with no upside risk
- Prefer undefined risk only on one side (downside)

---

## 6. Ratio Writes

### Covered Ratio Write
Long 100 shares + sell 2 OTM calls.

```
Max profit: (K - S_current) + 2 * call premium    at K at expiry
Max loss: Unlimited above upper breakeven; stock decline below breakeven
Upper breakeven: K + (K - S_current) + 2 * premium
```

### Risk Profile
This is a covered call with an extra naked short call. Profits are enhanced if the stock stays near the strike, but there is unlimited upside risk from the extra short call.

### Management
- Close the naked leg early if the stock approaches the strike
- Only use on underlyings where you have high conviction the stock will not exceed the strike

---

## 7. Income Optimization Framework

### Annualized Return Targeting

```
Annual income target / Account value = Required annual yield
Required annual yield / 12 = Monthly yield target
Monthly yield target = f(strategy choice, IV percentile, management rules)
```

### Typical Yield Ranges

| Strategy | Monthly Yield | Annual Yield | Win Rate | Worst Month |
|----------|--------------|-------------|----------|-------------|
| Covered calls (0.30 delta) | 1-3% | 12-36% | 70-80% | -15% |
| Cash-secured puts (0.20 delta) | 1-2% | 12-24% | 75-85% | -20% |
| Iron condors (16 delta) | 2-4% | 24-48% | 60-70% | -10% of width |
| Iron butterflies | 3-6% | 36-72% | 40-50% | -15% of width |

These are gross returns before the inevitable large losses. Net returns after losses are typically 8-15% annually for well-managed income portfolios.

### IV Rank and Percentile Filters

Only sell premium when IV is elevated:

```
IV Rank = (Current_IV - 52wk_low_IV) / (52wk_high_IV - 52wk_low_IV) * 100
IV Percentile = % of days in past year with IV below current IV
```

| IV Rank | Action |
|---------|--------|
| > 50% | Active premium selling (favorable) |
| 30-50% | Selective selling (standard positions) |
| < 30% | Avoid selling premium; consider buying |

### Defense and Adjustment Techniques

**The 200% rule:** If the option you sold doubles in value (from credit received), close for a loss. Prevents small losses from becoming large ones.

**Delta-based closing:** Close the position if the short option delta exceeds a threshold (e.g., 0.50 for a position opened at 0.16 delta).

**Time-based closing:** Close at 21 DTE regardless of P&L to avoid gamma risk.

**Mechanical rolling:** Roll losing positions to the next expiry cycle at the same or better strike, collecting additional credit. Only roll a maximum of 2-3 times before accepting the loss.

---

## 8. Risk-Return Profile Summary

```
                     Expected Return
                     |
   Iron Butterfly *  |
                     |  * Short Strangle
                     |
   Iron Condor    *  |  * Covered Call / CSP
                     |
   Credit Spread  *  |
                     |
                     +--------------------------> Max Loss Potential
                     Low                          High
```

Income strategies trade limited upside for high probability. The key to long-term success is managing the losers (which will inevitably occur) through disciplined adjustment and position sizing.

---

## References

- Augen, J. (2008). *The Volatility Edge in Options Trading*
- Fontanills, G. & Gentile, T. (2003). *The Options Course*
- tastytrade research: "Managing Winners," "Optimal DTE Studies"
- CBOE. "BXM Benchmark Index" (systematic covered call writing)

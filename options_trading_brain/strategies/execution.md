# Execution Strategies for Options Trading

**Prerequisite:** theory/market_microstructure.md, theory/greeks.md
**Relevance:** Order management, slippage control, rolling, adjustments, assignment

---

## 1. Order Types for Options

### Market Orders
- Execute immediately at the best available price
- Guaranteed fill but no price guarantee
- Use only for small orders in liquid options or when urgency is critical
- Risk: Wide bid-ask spreads in options can cause significant slippage

### Limit Orders
- Specify maximum price (buy) or minimum price (sell)
- No guaranteed fill but price is controlled
- The standard for options trading (always use limits)

### Placement Strategy

```
For buying options:
  Start at: Mid-price (midpoint of bid-ask)
  If no fill after 30s: Move toward ask by 1 tick
  If no fill after 60s: Move toward ask by another tick
  Never pay the full ask unless urgency demands it

For selling options:
  Start at: Mid-price
  If no fill after 30s: Move toward bid by 1 tick
  If no fill after 60s: Move toward bid by another tick
  Never sell at the full bid unless urgency demands it
```

### Natural vs. Limit for Spreads

**Spread orders** should be submitted as a single package (net price) rather than legging in:

| Method | Advantage | Risk |
|--------|-----------|------|
| Net spread order | No legging risk; single fill | May take longer to fill |
| Legging (sequential) | Can get better price on each leg | Legging risk; partial fill exposure |

**Rule:** Always use net spread orders for defined-risk strategies (verticals, iron condors, butterflies). Only leg complex orders when you have a specific directional view on individual legs.

### Complex/Multi-Leg Order Types

| Order Type | Description | When to Use |
|-----------|-------------|-------------|
| Spread order | Net debit/credit for 2-leg spreads | Verticals, calendars |
| Combo order | Net price for 3-4 leg strategies | Iron condors, butterflies |
| Contingent order | Triggered by a condition | Adjustments triggered by price level |
| OTO (One-Triggers-Other) | Second order activated after first fills | Entry triggers stop-loss placement |
| OCO (One-Cancels-Other) | First fill cancels the other | Profit target and stop-loss pair |

---

## 2. Slippage Management

### Measuring Slippage

```
Slippage = Execution_price - Theoretical_fair_value
         = Execution_price - Mid_price_at_decision_time
```

For spreads:
```
Spread_slippage = Actual_net_price - Theoretical_net_mid
```

### Sources of Slippage

1. **Bid-ask spread crossing:** The minimum slippage is half the spread for a single leg
2. **Market impact:** Large orders move the market against you
3. **Latency:** Price moves between decision and execution
4. **Information leakage:** Market participants detect your intent and adjust quotes

### Slippage Reduction Techniques

**Work the order:** Start at mid, increment slowly toward the natural price. Patience saves money.

**Time selection:**
- Avoid opening (9:30-10:00 ET): Widest spreads, most volatile
- Best execution: 10:30-11:30 ET and 1:30-3:00 ET (spreads tighten, flow stabilizes)
- Avoid last 15 minutes on expiry day (wild gamma-driven moves)

**Size management:**
- Break large orders into smaller pieces
- Use TWAP (Time-Weighted Average Price) for sustained execution
- Never show the full size in options (market makers will widen the quote)

**Venue selection:**
- Route to the exchange with the best price (price improvement programs)
- Consider maker-taker fees in the routing decision
- Use smart order routing (SOR) that evaluates all exchanges

### Slippage Budget

Build expected slippage into the trade plan:

```
Expected P&L = Theoretical P&L - Expected slippage (entry + exit)
```

Rule of thumb: Budget 10-25% of the bid-ask spread per leg as expected slippage for limit orders at mid-price.

---

## 3. Rolling Strategies

### What Is Rolling?
Closing the current option position and simultaneously opening a new position in a different expiry (and/or strike).

### Roll Forward (Same Strike, Later Expiry)
```
Buy to close: Current option
Sell to open: Same strike, next expiry
```

**When:** Position is working but approaching expiry. You want to maintain the exposure.

### Roll Up/Down (Different Strike, Same or Later Expiry)
```
Roll up (calls): Close current strike, open higher strike
Roll down (puts): Close current strike, open lower strike
```

**When:** Stock has moved in your favor and you want to adjust the risk/reward.

### Roll Out and Up/Down (Different Strike AND Later Expiry)
Combination of roll forward and strike adjustment.

### Rolling Decision Framework

```
Should I roll this position?

1. Is the original thesis still valid?
   No -> Close the position. Do not roll.
   Yes -> Continue.

2. Can I roll for a net credit?
   No -> Close the position unless there is a compelling reason to take the debit.
   Yes -> Continue.

3. Am I just avoiding taking a loss (disposition effect)?
   Yes -> Close the position. Accept the loss.
   No -> Roll.

4. Does the new position have acceptable risk/reward?
   Evaluate the new position on its own merits (not relative to the original entry).
   If you would not enter this new position fresh, do not roll into it.
```

### Rolling Credits and Debits

Track cumulative credits/debits across rolls to know your true cost basis:

```
Total net credit = Original credit + Roll_1 credit + Roll_2 credit + ...
Effective breakeven = Strike +/- total net credit
```

### Maximum Roll Count
- Set a maximum number of rolls (e.g., 3)
- Each roll commits more capital to a potentially losing position
- After max rolls, accept the outcome and move on

---

## 4. Position Adjustment Framework

### When to Adjust

| Trigger | Action |
|---------|--------|
| Delta breach (portfolio delta exceeds limit) | Add offsetting delta exposure |
| Short strike tested (stock reaches short strike) | Roll tested side or close |
| IV spike (vega P&L exceeds threshold) | Reduce vega exposure or add vega hedge |
| Time trigger (21 DTE for income strategies) | Close or roll to next cycle |
| P&L trigger (50% profit or 200% loss on credit) | Close position |

### Adjustment Techniques

**Add a leg:** Convert a vertical spread into a butterfly or condor by adding another spread.

**Remove a leg:** Take off the losing side of a multi-leg position if the thesis on that side has changed.

**Hedge with stock:** Buy or sell shares to delta-neutralize a position that has become too directional.

**Roll the tested side:** Move the threatened side further away (accept less credit) to reduce probability of loss.

**Invert:** When a credit spread is fully breached, close and re-establish in the opposite direction (accepting the loss and establishing a new position aligned with the new trend).

### Adjustment Cost Analysis

Before adjusting, compute:

```
Adjustment slippage = Cost of closing original + Cost of opening new position
Expected improvement = Change in expected P&L from the adjustment
Net benefit = Expected improvement - Adjustment slippage
```

Only adjust if the net benefit is positive. Many adjustments are psychologically satisfying but economically negative (they reduce the ultimate P&L by incurring unnecessary transaction costs).

---

## 5. Closing Mechanics

### Closing Triggers (Priority Order)

1. **Stop loss triggered:** Close immediately. This is non-negotiable.
2. **Profit target reached:** Close at limit price.
3. **Time-based close:** Close at target DTE (e.g., 21 DTE for income trades).
4. **Thesis invalidated:** Close regardless of P&L.
5. **Margin call:** Close immediately (forced liquidation if not proactive).

### Closing Order Execution

For closing profitable positions:
- Less urgency; work a limit order at a favorable price
- Can wait for a better fill (the position is working in your favor)

For closing losing positions:
- Higher urgency; start at mid-price, move aggressively if needed
- Do not let a loss become catastrophic while working an order

### Partial Closes

Close a portion of the position to:
- Lock in some profit while letting the rest run
- Reduce risk while maintaining some exposure
- Scale out as the trade approaches different price targets

### Expiry Management

**In-the-money options near expiry:**
- Close before expiry to avoid assignment risk and pin risk
- Exception: If you want to be assigned (e.g., cash-secured puts, covered calls)

**Out-of-the-money options near expiry:**
- Usually expire worthless; no action needed
- Watch for last-minute moves that could put them ITM
- CBOE auto-exercises options that are $0.01 or more ITM at expiry

---

## 6. Assignment and Exercise Management

### When You Are Assigned (Short Options)

**Short call assigned:** You are obligated to sell 100 shares at the strike price.
- If covered: Shares are called away (this is expected)
- If naked: You are now short 100 shares (must buy to cover or hold)

**Short put assigned:** You are obligated to buy 100 shares at the strike price.
- If cash-secured: Shares are purchased (this is expected)
- If naked: You now own 100 shares (manage the long stock position)

### Early Assignment Risk

American options can be exercised before expiry. Early exercise is most likely:
1. **Deep ITM short calls just before ex-dividend:** The long call holder exercises to capture the dividend
2. **Deep ITM short puts:** When the put is so deep ITM that time value is negligible
3. **Near expiry:** Any ITM option near expiry

### Early Assignment Detection

Monitor for:
```
Time value of short option < upcoming dividend (for calls)
Time value of short option ~ 0 (for puts)
```

If early assignment risk is high, close the position before the ex-dividend date.

### Spread Assignment

If one leg of a spread is assigned early:
1. Do not panic
2. Exercise the other leg if beneficial, or close the stock position
3. Net P&L should be close to the original spread's maximum value
4. Contact your broker if there are margin issues

---

## 7. Pin Risk Management

### What Is Pin Risk?

Near expiry, if the stock is near a strike with large open interest, the option's delta oscillates between 0 and 1 with small price moves. This creates:
- Uncertainty about whether you will be assigned
- Large gamma-driven delta swings
- Difficulty hedging

### When Pin Risk Matters

- Weekly options on popular names (AAPL, TSLA, SPY)
- High open interest at a strike
- Last hour of trading on expiry day

### Management

```
Rules for expiry day:
1. Close all short options that are within $1 of ATM before 3:00 ET
2. Do not hold short ATM options through expiry (assignment is uncertain)
3. If holding a spread, close the entire spread (not just one leg)
4. Accept the small cost of closing rather than risk overnight assignment surprise
```

---

## 8. Execution Workflow for the Trading System

### Pre-Trade Execution Checklist

```
[ ] Order type selected (limit, spread, combo)
[ ] Price level determined (mid-price +/- expected slippage)
[ ] Position size confirmed (within risk limits)
[ ] Margin impact verified (will not exceed margin limits)
[ ] Slippage budget included in expected P&L
[ ] Stop loss and profit target orders queued (OTO or manual)
[ ] Time of day acceptable (avoid open, avoid close on expiry)
```

### Execution Monitoring

```
Order placed -> Monitor:
  - Fill status (partial fills?)
  - Price drift (has the market moved since order?)
  - Time elapsed (adjust order if stale)
  - Fill quality (compare to benchmark)
```

### Post-Trade Logging

```
Record:
  - Fill price (per leg for spreads)
  - Slippage vs. mid at decision time
  - Time to fill
  - Venue/exchange
  - Fees and commissions
  - Initial Greeks at fill
```

This data feeds back into the execution optimization pipeline.

---

## 9. Execution Metrics Dashboard

| Metric | Definition | Target |
|--------|-----------|--------|
| Fill rate | % of orders filled within time window | > 85% |
| Slippage | Average slippage per trade ($ or %) | < 25% of half-spread |
| Cost per trade | Commissions + slippage | < 5% of expected profit |
| Time to fill | Average seconds from order to complete fill | < 120s for limit orders |
| Improvement rate | % of fills better than mid-price | > 30% |

---

## References

- Harris, L. (2003). *Trading and Exchanges: Market Microstructure for Practitioners*
- Kissell, R. (2013). *The Science of Algorithmic Trading and Portfolio Management*
- Johnson, B. (2010). *Algorithmic Trading and DMA*

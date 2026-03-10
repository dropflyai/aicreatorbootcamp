# Directional Options Strategies

**Prerequisite:** theory/options_pricing.md, theory/greeks.md
**Relevance:** Expressing bullish, bearish, or neutral directional views with defined risk

---

## 1. Long Calls

### Structure
Buy one call option at strike K with expiry T.

### Payoff at Expiry
```
Payoff = max(S_T - K, 0) - Premium
Max profit: Unlimited
Max loss: Premium paid
Breakeven: K + Premium
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | +0.0 to +1.0 | Bullish |
| Gamma | + | Benefits from acceleration |
| Theta | - | Time decay hurts |
| Vega | + | Benefits from vol increase |

### When to Use
- Strongly bullish conviction with defined risk appetite
- Before a catalyst (earnings, FDA, etc.) when you want leveraged upside
- When IV is low relative to expected move (cheap optionality)

### Strike Selection Framework
| Strike | Delta | Cost | Leverage | Win Rate |
|--------|-------|------|----------|----------|
| Deep ITM | 0.80-0.95 | High | Low (stock replacement) | High |
| Slightly ITM | 0.55-0.70 | Moderate | Moderate | Moderate |
| ATM | 0.45-0.55 | Moderate | High | ~50% |
| OTM | 0.20-0.40 | Low | Very high | Low |
| Deep OTM | 0.05-0.15 | Very low | Extreme (lottery) | Very low |

### Expiry Selection
- **Weeklies (0-7 DTE):** Maximum leverage but maximum theta decay; only for high-conviction, imminent catalysts
- **Monthly (20-45 DTE):** Standard for directional trades; good balance of theta and leverage
- **LEAPS (6-24 months):** Stock replacement with reduced capital; theta decay is slow

---

## 2. Long Puts

### Structure
Buy one put option at strike K with expiry T.

### Payoff at Expiry
```
Payoff = max(K - S_T, 0) - Premium
Max profit: K - Premium (stock goes to zero)
Max loss: Premium paid
Breakeven: K - Premium
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | -1.0 to 0.0 | Bearish |
| Gamma | + | Benefits from acceleration |
| Theta | - | Time decay hurts |
| Vega | + | Benefits from vol increase (vol rises on drops) |

### Advantage Over Shorting Stock
- Limited loss (premium only vs. theoretically unlimited loss for short stock)
- No margin requirements beyond the premium
- No borrow cost
- No uptick rule or short-sale restrictions

---

## 3. Vertical Spreads (Bull/Bear Spreads)

### Bull Call Spread
**Structure:** Buy call at K_1 (lower), sell call at K_2 (higher). Same expiry.

```
Max profit: (K_2 - K_1) - Net debit
Max loss: Net debit
Breakeven: K_1 + Net debit
```

### Bear Put Spread
**Structure:** Buy put at K_2 (higher), sell put at K_1 (lower). Same expiry.

```
Max profit: (K_2 - K_1) - Net debit
Max loss: Net debit
Breakeven: K_2 - Net debit
```

### Bull Put Spread (Credit Spread)
**Structure:** Sell put at K_2 (higher), buy put at K_1 (lower). Same expiry.

```
Max profit: Net credit
Max loss: (K_2 - K_1) - Net credit
Breakeven: K_2 - Net credit
```

### Bear Call Spread (Credit Spread)
**Structure:** Sell call at K_1 (lower), buy call at K_2 (higher). Same expiry.

```
Max profit: Net credit
Max loss: (K_2 - K_1) - Net credit
Breakeven: K_1 + Net credit
```

### Spread Width Selection

| Width | Risk/Reward | Capital Efficiency | Probability |
|-------|-------------|-------------------|-------------|
| Narrow ($1-2) | Low risk, low reward | High | Varies with strike choice |
| Medium ($5) | Moderate | Moderate | Moderate |
| Wide ($10+) | High risk, high reward | Low | Lower max profit probability |

### Greeks of Vertical Spreads
- Delta: Reduced (partial offset between long and short legs)
- Gamma: Near zero when both legs are OTM or ITM; nonzero when straddling ATM
- Theta: Small (partially offsetting)
- Vega: Small (partially offsetting)

The key benefit: reduced Greeks exposure means the trade is primarily about direction and less about timing, vol, or gamma.

---

## 4. Risk Reversals

### Structure
Buy OTM call (strike K_call), sell OTM put (strike K_put). Same expiry. Zero or near-zero net premium.

```
Max profit: Unlimited (above K_call)
Max loss: K_put (stock goes to zero, you are assigned the put)
Breakeven: K_put (if exercised) or K_call + net premium (on upside)
```

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | + (long delta from both legs) | Strongly bullish |
| Gamma | + (above K_call) / - (below K_put) | Asymmetric |
| Theta | Small (call theta paid, put theta earned) | Near neutral |
| Vega | + (if IV rises, skew steepens) | Complex; depends on skew dynamics |

### Usage
- Synthetic leveraged long position (similar P&L to stock above K_call)
- Popular institutional strategy for establishing directional exposure with minimal premium outlay
- Can be funded entirely by the put sale (zero-cost risk reversal)

### Risk Management
- The short put creates significant downside risk (equivalent to buying stock at K_put)
- Margin required for the short put
- If the stock drops sharply, both the short put and vega (put skew) work against you

---

## 5. Collars

### Structure
Long stock + buy OTM put + sell OTM call. Net position: Protected long.

```
Max profit: K_call - S_current + net premium
Max loss: S_current - K_put - net premium
Range: [K_put, K_call]
```

### Zero-Cost Collar
Choose K_call and K_put such that call premium sold = put premium purchased. No net cash outflow for protection.

### Greeks Profile
| Greek | Value | Implication |
|-------|-------|-------------|
| Delta | + (reduced vs. stock alone) | Mildly bullish |
| Gamma | Small (offsets between put and call) | Low convexity |
| Theta | Small (offsets) | Low time sensitivity |
| Vega | Small (offsets) | Low vol sensitivity |

### When to Use
- Protecting an existing stock position before earnings or macro events
- Hedging a concentrated stock holding (executive compensation, estate planning)
- When you want to stay long but limit downside

---

## 6. Synthetic Positions

### Synthetic Long Stock
Buy call + sell put at the same strike and expiry:

```
Payoff = (S_T - K) + (K - S_T) [put assigned] = S_T - K + premium received/paid
```

Equivalent to owning stock (with financing cost difference).

### Synthetic Short Stock
Buy put + sell call at the same strike and expiry.

### Synthetic Long Call
Long stock + long put:
```
Payoff = S_T + max(K - S_T, 0) - S_0 - put_premium = max(S_T, K) - S_0 - put_premium
```

### Why Use Synthetics?
- **Capital efficiency:** Synthetic stock requires less margin than actual stock
- **Arbitrage enforcement:** Put-call parity must hold; deviations create risk-free profit
- **Box spread financing:** A box spread (bull call spread + bear put spread) creates a synthetic risk-free bond

---

## 7. Leveraged Directional Trades

### Deep OTM Calls for Speculative Exposure
- Buy 5-10 delta calls for maximum leverage
- Position size: 1-2% of portfolio maximum
- Expected value is often negative (lottery ticket), so limit frequency
- Best used before binary events with asymmetric upside (biotech, M&A speculation)

### ITM Calls for Stock Replacement
- Buy 80-delta LEAPS calls as a substitute for stock
- Cost: ~80% of stock price (20% cash savings) but with time decay risk
- Delta: ~0.80, providing near-stock exposure
- Roll every 6 months to maintain adequate time value

### Skip-Strike Butterfly for Directional Bets
- Buy 1 ATM call, sell 3 calls at K+5, buy 2 calls at K+7.5
- Creates a cheap directional bet that profits if stock moves to the short strike
- Very high risk-reward but narrow profit zone

---

## 8. Greeks Management for Directional Strategies

### Delta-Based Sizing
Size the position to achieve a target dollar delta:

```
Contracts = Target_Dollar_Delta / (delta_per_contract * S * 100)
```

Example: $10K target delta, stock at $200, option delta 0.50:
```
Contracts = 10,000 / (0.50 * 200 * 100) = 1 contract
```

### Rolling to Maintain Delta Exposure
As the underlying moves, delta changes. For a long call:
- Stock moves up: delta increases (position becomes more bullish) -- trim if overweight
- Stock moves down: delta decreases (position becomes less bullish) -- add if still bullish

### Theta Budget
For directional trades, theta is the cost of maintaining the position:

```
Daily theta cost = theta_per_contract * number_of_contracts * 100
Break-even daily move = |daily_theta| / dollar_delta
```

Example: -$15/day theta, $500 dollar delta. The stock must move $15/$500 = $0.03/day in your favor just to break even on theta.

### Vega Awareness
Directional trades have incidental vega exposure:
- Long calls/puts are long vega
- If you are bullish AND expect IV to rise, long calls are doubly beneficial
- If you are bullish but expect IV to fall, consider bull call spreads (reduced vega) or stock replacement

### Adjustments

| Scenario | Adjustment |
|----------|-----------|
| Stock moves in your favor | Take partial profit; roll strike higher (calls) or lower (puts) |
| Stock moves against you | Close if thesis violated; roll down (calls) or up (puts) for recovery |
| IV drops significantly | Convert to spread (sell further OTM option against your position) |
| Approaching expiry, still in trade | Roll to next expiry to avoid gamma risk and theta acceleration |

---

## 9. Decision Framework for Directional Strategy Selection

```
Directional View: Bullish / Bearish / Neutral-to-Bullish / Neutral-to-Bearish

1. How strong is the view?
   Strong -> Naked long options (call/put)
   Moderate -> Vertical spreads
   Mild -> Collars, risk reversals

2. What is IV doing?
   IV low -> Buy premium (long options, debit spreads)
   IV high -> Sell premium (credit spreads, short options with protection)

3. What is the time horizon?
   Short (< 2 weeks) -> Near-term expiry, higher delta
   Medium (2-8 weeks) -> Standard monthly, ATM to slightly OTM
   Long (> 2 months) -> LEAPS, stock replacement

4. What is the risk budget?
   Small (< 1% of portfolio) -> OTM options, debit spreads
   Medium (1-3%) -> ATM options, vertical spreads
   Large (3-5%) -> Stock replacement, collars on existing positions
```

---

## References

- McMillan, L. (2012). *Options as a Strategic Investment*
- Natenberg, S. (2015). *Option Volatility and Pricing*
- Cohen, G. (2005). *The Bible of Options Strategies*
- Sinclair, E. (2010). *Option Trading: Pricing and Volatility Strategies and Techniques*

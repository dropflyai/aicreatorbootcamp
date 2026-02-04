# Strategies Directory -- Options Trading Brain

Practical strategy guides for options trading, organized by strategic objective.

---

## Strategy Index

| File | Category | Key Strategies | Lines |
|------|----------|---------------|-------|
| `directional.md` | Directional | Long calls/puts, verticals, risk reversals, collars, synthetics | ~300 |
| `volatility.md` | Volatility | Straddles, strangles, butterflies, calendars, dispersion, variance swaps | ~320 |
| `income.md` | Income | Covered calls, CSPs, iron condors, wheel, jade lizard, credit spreads | ~300 |
| `advanced.md` | Advanced | Box spreads, conversions, jelly rolls, tail hedging, portfolio hedging | ~320 |
| `execution.md` | Execution | Order types, slippage, rolling, adjustments, assignment, pin risk | ~300 |

---

## Strategy Selection by Market View

### Direction x Volatility Matrix

```
                    Volatility View
                    Long Vol        Short Vol       Neutral Vol
Direction   |----------------------------------------------------
Bullish     | Long calls         Bull put spread   Bull call spread
            | Call back spread   Jade lizard       Collar
            |
Bearish     | Long puts          Bear call spread  Bear put spread
            | Put back spread    Covered put       Put spread collar
            |
Neutral     | Long straddle      Iron condor       Calendar spread
            | Long strangle      Iron butterfly     Double diagonal
```

### Strategy Risk Profiles

| Strategy | Max Profit | Max Loss | Breakeven Points | Capital Required |
|----------|-----------|---------|------------------|-----------------|
| Long call | Unlimited | Premium | 1 (upside) | Premium |
| Bull call spread | Width - debit | Debit | 1 (upside) | Debit |
| Long straddle | Unlimited | 2x premium | 2 (both sides) | 2x premium |
| Iron condor | Net credit | Width - credit | 2 (both sides) | Width (margin) |
| Covered call | Strike - stock + premium | Stock - premium | 1 (downside) | Stock price |
| Protective put | Unlimited upside | Premium + (stock - strike) | 1 (upside) | Stock + premium |

---

## Strategy Selection Decision Tree

```
What is your primary objective?

1. DIRECTIONAL BET (bullish or bearish view)
   -> See directional.md
   -> Key question: How strong is the conviction?
      Strong: Naked options
      Moderate: Vertical spreads
      Mild: Collars, risk reversals

2. VOLATILITY TRADE (vol view, direction-neutral)
   -> See volatility.md
   -> Key question: Long or short vol?
      Long vol: Straddles, strangles, back spreads
      Short vol: Butterflies, condors, ratio spreads
      Relative value: Calendars, diagonals, dispersion

3. INCOME GENERATION (systematic premium collection)
   -> See income.md
   -> Key question: How much risk?
      High: Short straddles, ratio writes
      Medium: Iron condors, iron butterflies
      Low: Covered calls, credit spreads

4. HEDGING (protecting an existing portfolio)
   -> See advanced.md (portfolio hedging section)
   -> Key question: How much are you willing to spend?
      High: Protective puts, VIX calls
      Medium: Collars, put spreads
      Low: Tail hedges (deep OTM puts)

5. ARBITRAGE (risk-free or near-risk-free profit)
   -> See advanced.md (arbitrage section)
   -> Box spreads, conversions/reversals
   -> Requires: Low transaction costs, fast execution
```

---

## Cross-References

| Strategy Topic | Theory Foundation | System Module |
|---------------|------------------|--------------|
| Strike/expiry selection | theory/options_pricing.md, theory/greeks.md | `07_strategy_selection_engine/` |
| Volatility assessment | theory/volatility.md | `03_feature_engineering/`, `04_market_regime/` |
| Risk sizing | theory/risk_management.md | `10_risk_management/` |
| Execution quality | theory/market_microstructure.md | (execution module, TBD) |
| Greeks management | theory/greeks.md | `05_options_analytics/` |

---

## Key Principles Across All Strategies

1. **Define risk before entry:** Know your max loss before placing the trade
2. **Size for survival:** No single trade should risk more than 2-5% of portfolio
3. **Match strategy to conviction:** Stronger views deserve more capital, not more leverage
4. **Manage winners and losers systematically:** Pre-defined exit rules prevent emotional decisions
5. **Account for slippage:** Budget transaction costs into expected P&L
6. **Respect time decay:** Know whether theta is working for or against you
7. **Monitor vol regime:** The same strategy behaves differently in high-vol vs. low-vol environments

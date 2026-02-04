# Trading System Review Checklist

Comprehensive checklist for reviewing the trading system, individual trades, and portfolio health. Use for weekly reviews, monthly audits, and post-trade analysis.

---

## Pre-Trade Review

### Thesis Validation
- [ ] Directional thesis documented with supporting evidence
- [ ] Volatility thesis documented (IV vs. HV comparison, forecast)
- [ ] Time horizon specified and appropriate for the strategy
- [ ] Catalyst or trigger identified (or explicit statement that this is a steady-state trade)
- [ ] Counterargument considered (what would invalidate this trade?)

### Strategy Selection
- [ ] Strategy matches the combined directional + vol view
- [ ] IV rank/percentile assessed (above 50th for selling, below 30th for buying)
- [ ] Term structure analyzed (normal, inverted, humped)
- [ ] Skew analyzed (put skew steep/flat relative to history)
- [ ] Strategy selected from the decision framework (not defaulting to a favorite)

### Risk Parameters
- [ ] Maximum loss defined (dollar amount and portfolio percentage)
- [ ] Position size computed using systematic method (Kelly, fixed-fractional, or vol-adjusted)
- [ ] Position size within single-position limits (max 2-5% of portfolio)
- [ ] Portfolio impact assessed (net delta, gamma, vega, theta after adding this trade)
- [ ] Margin impact verified (will not exceed margin limits)
- [ ] Correlation check: not too concentrated in one sector/factor

### Execution Plan
- [ ] Order type selected (limit, spread, combo)
- [ ] Price target set (mid-price or better)
- [ ] Slippage budget included in expected P&L
- [ ] Time of day appropriate (avoiding open, expiry close)
- [ ] Stop-loss order or alert set
- [ ] Profit target order or alert set

---

## Active Position Review (Weekly)

### Portfolio-Level Greeks
- [ ] Net delta within limits (+/- target range)
- [ ] Net gamma within limits
- [ ] Net theta within limits (income vs. cost)
- [ ] Net vega within limits
- [ ] Delta by expiry bucket checked
- [ ] Vega by expiry bucket checked

### Position-Level Review
For each open position:
- [ ] Original thesis still valid?
- [ ] Current P&L tracked vs. expected P&L path
- [ ] Greeks still within acceptable range for this position
- [ ] No upcoming events (earnings, dividends) that change the trade profile
- [ ] Time to expiry > minimum threshold (close if < 21 DTE for income trades)
- [ ] Adjustment needed? (position adjustment framework applied)

### Risk Dashboard
- [ ] Total portfolio margin utilization < 50% of maximum
- [ ] No single position exceeds 5% of portfolio
- [ ] Current drawdown level noted and within acceptable range
- [ ] Scenario matrix updated (P&L across price/vol scenarios)
- [ ] Stress test run (apply historical crash scenarios to current portfolio)

### Market Regime
- [ ] Current regime identified (low vol, high vol, trending, range-bound)
- [ ] VIX level and term structure noted
- [ ] Sector correlations checked (correlation regime)
- [ ] Upcoming macro events noted (FOMC, CPI, earnings season)

---

## Post-Trade Review (After Every Closed Trade)

### Execution Quality
- [ ] Entry slippage measured (fill vs. mid at decision time)
- [ ] Exit slippage measured
- [ ] Total transaction costs recorded (commissions + slippage)
- [ ] Execution time logged

### P&L Attribution
- [ ] Realized P&L computed
- [ ] P&L decomposed: Delta + Gamma + Theta + Vega + Residual
- [ ] Largest P&L contributor identified
- [ ] Compare actual P&L to expected P&L at entry

### Thesis Evaluation
- [ ] Was the directional thesis correct?
- [ ] Was the volatility thesis correct?
- [ ] Did the strategy selection match the outcome?
- [ ] If the trade lost money: was it a good trade with bad outcome (process correct, result unlucky) or a bad trade (process incorrect)?

### Behavioral Review
- [ ] Any disposition effect observed? (held losers too long, cut winners too early)
- [ ] Any overconfidence? (oversized position, ignored contrary evidence)
- [ ] Any anchoring? (fixated on entry price rather than current fair value)
- [ ] Any revenge trading? (entered a trade to recover previous loss)
- [ ] Was the pre-defined exit plan followed?

---

## Monthly Portfolio Audit

### Performance Metrics
- [ ] Monthly return computed (absolute and risk-adjusted)
- [ ] Sharpe ratio (trailing 30-day, 90-day, 1-year)
- [ ] Maximum drawdown (current and trailing)
- [ ] Win rate by strategy type
- [ ] Average win vs. average loss (profit factor)
- [ ] Compare to benchmark (SPY, BXM, or custom benchmark)

### Strategy Performance
- [ ] P&L by strategy type (directional, vol, income)
- [ ] P&L by underlying
- [ ] P&L by Greek component (delta P&L, gamma P&L, theta P&L, vega P&L)
- [ ] Identify best and worst performing strategy categories
- [ ] Strategy allocation review: over/underweighting any category?

### Risk Review
- [ ] Average daily VaR over the month
- [ ] Number of days exceeding VaR
- [ ] Maximum portfolio drawdown during the month
- [ ] Margin utilization statistics (average, max)
- [ ] Correlation analysis (were positions more correlated than expected?)

### Process Compliance
- [ ] All trades had documented thesis (pre-trade checklist compliance)
- [ ] All exits followed pre-defined rules
- [ ] No position exceeded size limits
- [ ] No unhedged naked positions (unless intentional and documented)
- [ ] Trade journal up to date with all required fields

### Improvement Actions
- [ ] Top 3 mistakes identified (and categorized: strategy, sizing, execution, behavioral)
- [ ] Specific improvement plan for each mistake
- [ ] TradingScore dimensions re-evaluated
- [ ] Knowledge gaps identified with study plan
- [ ] Any system/tooling improvements needed?

---

## Quarterly Deep Review

### Strategy Validity
- [ ] Backtest all active strategies on recent data (last 3-6 months)
- [ ] Compare live performance to backtest expectations
- [ ] Identify regime changes that may require strategy adaptation
- [ ] Evaluate any new strategies for inclusion

### Risk Model Validation
- [ ] Compare predicted VaR to actual P&L distribution (Kupiec test)
- [ ] Stress test with updated scenarios
- [ ] Correlation matrix update
- [ ] Volatility model validation (GARCH parameters still stable?)

### Capital Allocation
- [ ] Review allocation across strategies
- [ ] Rebalance if performance has shifted allocation away from target
- [ ] Review capital adequacy (sufficient margin headroom?)
- [ ] Plan for capital additions or withdrawals

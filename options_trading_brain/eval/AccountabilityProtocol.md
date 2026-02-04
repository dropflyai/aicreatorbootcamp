# Accountability Protocol -- Trading System

Framework for maintaining discipline, tracking performance, and enforcing systematic improvement.

---

## 1. Daily Accountability

### Morning Routine (Pre-Market)

```
[ ] Review overnight developments (futures, international markets, news)
[ ] Check current portfolio Greeks (delta, gamma, theta, vega)
[ ] Review positions approaching expiry (< 7 DTE)
[ ] Identify upcoming events (earnings, FOMC, economic data)
[ ] Set daily risk budget (max new risk to add today)
[ ] Review any open orders or pending adjustments
```

### Intraday Monitoring

```
Continuous:
  - Portfolio P&L vs. Greek-implied P&L (unexplained P&L = red flag)
  - Margin utilization (alert at 40%, action at 50%)
  - Net delta (rebalance if outside limit)

Periodic (every 2 hours):
  - Greeks snapshot and comparison to limits
  - IV change assessment (are vega positions moving as expected?)
  - Check for unusual activity in held underlyings
```

### End-of-Day Routine

```
[ ] Record closing portfolio Greeks
[ ] Log daily P&L (actual and attributed by Greek)
[ ] Record any trades executed (entry in trade journal)
[ ] Note any positions requiring attention tomorrow
[ ] Compute overnight risk (delta and gap risk assessment)
[ ] Update running monthly P&L tracker
```

---

## 2. Trade Journal Requirements

Every trade must have a journal entry with the following fields:

### Entry Record

| Field | Description | Example |
|-------|-------------|---------|
| Trade ID | Unique identifier | T-2026-0204-001 |
| Date/Time | Entry timestamp | 2026-02-04 10:32:15 ET |
| Underlying | Ticker | AAPL |
| Strategy | Strategy type | Iron Condor |
| Legs | Full description of all legs | Sell 190P/Buy 185P/Sell 210C/Buy 215C |
| Expiry | Option expiry date | 2026-03-21 |
| DTE | Days to expiration at entry | 45 |
| Net Credit/Debit | Premium collected/paid | $2.15 credit |
| Contracts | Number of contracts | 5 |
| Max Loss | Maximum possible loss | $1,425 |
| Directional Thesis | Why you expect the direction | Neutral: AAPL in consolidation range |
| Vol Thesis | Why you expect vol to behave | IV rank 72%; expect mean reversion |
| Greeks at Entry | Delta, Gamma, Theta, Vega | D: -15, G: -8, Th: +$12, V: -$85 |
| Exit Plan | Profit target and stop loss | Close at 50% profit or 200% loss |
| Risk/Portfolio Impact | How this affects the portfolio | Adds short vega, neutral delta |

### Exit Record

| Field | Description | Example |
|-------|-------------|---------|
| Exit Date/Time | Exit timestamp | 2026-02-18 11:15:00 ET |
| Exit Price | Net price | $0.95 debit (bought back) |
| Realized P&L | Dollar profit/loss | +$600 (before commissions) |
| Hold Period | Days held | 14 |
| Exit Reason | Why you closed | 50% profit target reached |
| Execution Quality | Slippage assessment | Filled at mid; no slippage |

### Post-Trade Analysis

| Field | Description |
|-------|-------------|
| Was thesis correct? | Yes/No with explanation |
| Would I take this trade again? | Yes/No with reasoning |
| Mistakes made | Any errors in execution, sizing, or management |
| Lessons learned | Specific takeaways for future trades |
| Behavioral notes | Any emotional factors that influenced decisions |

---

## 3. Performance Tracking

### Metrics to Track (Rolling Basis)

| Metric | Frequency | Target |
|--------|-----------|--------|
| Win rate | Weekly | > 50% for income; > 40% for directional |
| Average win / Average loss | Weekly | > 1.5 for directional; > 0.5 for income |
| Profit factor | Monthly | > 1.5 |
| Sharpe ratio | Monthly | > 1.0 |
| Max drawdown (trailing) | Daily | < 15% |
| Average trade duration | Monthly | Track trend |
| Trades per month | Monthly | 10-30 (avoid over/under-trading) |

### Performance by Category

Track separately for:
- Directional trades
- Volatility trades
- Income trades
- Hedging trades

### Equity Curve Analysis

Maintain a daily equity curve and compute:
- Drawdown duration (time from peak to recovery)
- Longest losing streak (consecutive losing trades)
- Calmar ratio (annual return / max drawdown)
- Ulcer index (measure of drawdown severity and duration)

---

## 4. Escalation Rules

### Drawdown Escalation

| Drawdown from Peak | Action | Authority |
|-------------------|--------|-----------|
| 0-5% | Normal operations | Trader discretion |
| 5-10% | Reduce position sizes by 25%; review all positions | Self-review |
| 10-15% | Reduce position sizes by 50%; halt new positions | Mandatory review |
| 15-20% | Close all positions; paper trade only | Full system review |
| > 20% | Complete stop; comprehensive strategy overhaul | External review |

### Losing Streak Escalation

| Consecutive Losses | Action |
|-------------------|--------|
| 3 in a row | Review recent trades for pattern; reduce size 25% |
| 5 in a row | Halt new trades for 2 days; deep review of strategy and execution |
| 7 in a row | Stop trading for 1 week; full system audit |

### Behavioral Escalation

| Behavior Detected | Action |
|-------------------|--------|
| Revenge trade (trading to recover a loss) | Cancel the trade; log the incident; 24-hour cooldown |
| Oversize position (>2x normal) | Immediately reduce to standard size |
| Trading without a plan | Close the trade; log the violation |
| Ignoring stop loss | Close immediately; mandatory 1-day break |
| 3+ behavioral violations in a month | Mandatory 1-week paper trading break |

---

## 5. Review Schedule

### Weekly Review (30 minutes, end of week)

- Closed trades P&L summary
- Open positions status and Greek exposure
- Portfolio-level risk assessment
- Upcoming week's events and plan
- Behavioral self-check

### Monthly Review (2 hours, end of month)

- Full performance metrics computation
- Strategy-level performance analysis
- Risk model validation (did VaR estimates hold?)
- TradingScore re-assessment
- Improvement plan for next month

### Quarterly Review (4 hours, end of quarter)

- Deep strategy backtest validation
- Capital allocation review
- System/tooling improvements
- Knowledge assessment (BenchmarkTests.md)
- Long-term goal alignment

---

## 6. Commitment Contract

By using this trading system, the trader commits to:

1. **Never risk more than 5% of portfolio on a single trade**
2. **Always have a documented exit plan before entry**
3. **Follow the drawdown escalation rules without exception**
4. **Complete the trade journal for every trade within 24 hours of closing**
5. **Conduct weekly and monthly reviews on schedule**
6. **Accept losses as part of the process; never revenge trade**
7. **Continuously study the theory knowledge base**
8. **Treat paper trading periods as genuine learning (not punishment)**

### Violation Tracking

Log all violations of the commitment contract:

| Date | Violation | Severity | Consequence | Root Cause |
|------|-----------|----------|-------------|------------|
| Example | Oversized position | Medium | Reduced to standard | Overconfidence after winning streak |

Review violations monthly. Persistent violations in the same category indicate a systemic issue requiring structural change (automation, constraints, or strategy modification).

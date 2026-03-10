# Trading Score -- 8-Dimension Evaluation Framework

Scoring rubric for evaluating trading system quality, trader competency, and strategy effectiveness. Each dimension is scored 1-10.

---

## Dimension 1: Theory (Weight: 10%)

Depth of quantitative finance knowledge underpinning trading decisions.

| Score | Description |
|-------|-------------|
| 1-2 | No formal knowledge; trades based on tips or social media |
| 3-4 | Understands basic options mechanics (calls, puts, expiry) but not pricing theory |
| 5-6 | Can explain Black-Scholes, basic Greeks, put-call parity; knows what IV is |
| 7-8 | Understands stochastic calculus foundations, can derive BS PDE, knows vol surface theory, GARCH |
| 9-10 | PhD-level: can derive Ito's Lemma, Girsanov, implement Heston calibration, understands measure theory |

### Assessment Questions
- Can you derive the Black-Scholes formula from first principles?
- What is the Girsanov theorem and why does it matter for options pricing?
- Explain the relationship between local volatility and the implied volatility surface.
- What is the Feller condition in the CIR/Heston model and why is it important?

---

## Dimension 2: Risk Management (Weight: 20%)

Quality of capital preservation, position sizing, and drawdown control.

| Score | Description |
|-------|-------------|
| 1-2 | No risk management; position sizes are arbitrary; no stop losses |
| 3-4 | Uses basic stop losses; position sizing by "feel"; no portfolio-level risk tracking |
| 5-6 | Fixed-fractional sizing; tracks net Greeks; has drawdown limits; uses defined-risk strategies |
| 7-8 | Kelly-based sizing with fractional adjustment; scenario matrix analysis; stress testing; correlation-aware |
| 9-10 | Full risk framework: VaR/CVaR computation, tail hedging program, dynamic sizing by regime, margin optimization |

### Assessment Questions
- What is your maximum position size as a percentage of portfolio?
- How do you compute portfolio-level VaR for your options book?
- What happens to your portfolio in a -20% SPX move with VIX at 80?
- How do you manage correlation risk across your positions?

---

## Dimension 3: Strategy Selection (Weight: 15%)

Ability to match the correct strategy to the market environment and thesis.

| Score | Description |
|-------|-------------|
| 1-2 | Only knows one strategy (e.g., always buys calls); no adaptation to conditions |
| 3-4 | Knows 3-5 strategies; selects based on directional view only |
| 5-6 | Considers direction, volatility, and time horizon; matches strategy to IV rank |
| 7-8 | Uses decision framework considering direction, vol view, term structure, skew, regime; adapts mid-trade |
| 9-10 | Systematic strategy selection engine; quantitative scoring of strategy suitability; backtested on historical regimes |

### Assessment Questions
- IV rank is at the 90th percentile and you are bullish. What strategy do you use and why?
- The term structure is inverted. What does this tell you and how do you trade it?
- You want long vega and positive theta simultaneously. What strategies achieve this?

---

## Dimension 4: Greeks Management (Weight: 15%)

Quality of real-time Greeks monitoring, hedging, and P&L attribution.

| Score | Description |
|-------|-------------|
| 1-2 | Does not look at Greeks; only watches P&L |
| 3-4 | Knows delta and theta; checks occasionally; no hedging |
| 5-6 | Monitors all first-order Greeks; delta-hedges when needed; understands theta-gamma tradeoff |
| 7-8 | Tracks second-order Greeks (vanna, volga, charm); P&L attribution by Greek; bucketed vega by expiry |
| 9-10 | Real-time Greek limits; automated alerting; full P&L decomposition; understands cross-Greek dynamics |

### Assessment Questions
- Your portfolio has net gamma of +500 and net theta of -$200/day. Is this consistent?
- Explain how charm affects your delta hedge overnight.
- What is your current vega exposure by expiry bucket?
- Decompose yesterday's P&L into delta, gamma, theta, and vega components.

---

## Dimension 5: Volatility Analysis (Weight: 15%)

Sophistication of volatility measurement, forecasting, and surface analysis.

| Score | Description |
|-------|-------------|
| 1-2 | Does not consider volatility; buys/sells options without checking IV |
| 3-4 | Looks at IV rank/percentile; knows "high IV = sell, low IV = buy" |
| 5-6 | Computes historical vol; compares IV to realized vol; understands term structure |
| 7-8 | Uses multiple HV estimators; GARCH forecasting; analyzes vol surface (skew, smile); understands vol-of-vol |
| 9-10 | Full surface analysis (SVI/SABR fitting); stochastic vol model calibration; VRP computation; regime-dependent forecasts |

### Assessment Questions
- What is the current variance risk premium and how do you compute it?
- Compare the Yang-Zhang and Garman-Klass volatility estimators. When would you use each?
- The 25-delta put skew has steepened by 3 vol points. What does this mean and how do you trade it?
- Walk me through extracting local volatility from the implied vol surface.

---

## Dimension 6: Execution (Weight: 10%)

Quality of trade execution, slippage management, and order management.

| Score | Description |
|-------|-------------|
| 1-2 | Uses market orders; ignores slippage; no execution analysis |
| 3-4 | Uses limit orders at mid-price; basic awareness of bid-ask spread |
| 5-6 | Works orders patiently; avoids bad execution times; tracks slippage |
| 7-8 | Systematic execution: TWAP-like for large orders; venue selection; spread orders for multi-leg |
| 9-10 | Optimal execution framework (Almgren-Chriss inspired); execution analytics; maker-taker optimization |

### Assessment Questions
- What is your average slippage per trade relative to the theoretical mid?
- How do you handle execution of a 50-contract iron condor in a moderately liquid name?
- What times of day do you avoid for options execution and why?

---

## Dimension 7: Backtesting (Weight: 10%)

Quality of historical testing, statistical validation, and out-of-sample analysis.

| Score | Description |
|-------|-------------|
| 1-2 | No backtesting; trades based on forward-only hypothesis |
| 3-4 | Basic historical P&L analysis; no statistical rigor; survivor bias present |
| 5-6 | Proper backtesting with transaction costs; out-of-sample validation; basic statistics (Sharpe, MDD) |
| 7-8 | Walk-forward optimization; Monte Carlo simulation of strategy outcomes; regime-conditional performance |
| 9-10 | Full backtest framework: statistical significance tests, multiple testing correction, regime analysis, bootstrap confidence intervals |

### Assessment Questions
- What is the Sharpe ratio of your strategy and over what period is it measured?
- How do you account for look-ahead bias in your backtests?
- Your backtest shows 60% annual return. What statistical tests do you apply to validate this is not random?
- How does your strategy perform in different vol regimes?

---

## Dimension 8: Market Microstructure (Weight: 5%)

Understanding of market mechanics, order flow, and liquidity dynamics.

| Score | Description |
|-------|-------------|
| 1-2 | No understanding of market mechanics |
| 3-4 | Knows bid-ask spread exists; basic understanding of market makers |
| 5-6 | Understands order book dynamics; knows about maker-taker fees; avoids illiquid options |
| 7-8 | Understands price impact models; analyzes unusual options activity; knows information asymmetry theory |
| 9-10 | Deep microstructure knowledge: Kyle lambda, Avellaneda-Stoikov, optimal execution theory, dark pool dynamics |

### Assessment Questions
- How does the Avellaneda-Stoikov model explain market maker quote skewing?
- What does a spike in put open interest at a specific strike tell you?
- How would you estimate the information content of options order flow?

---

## Composite Score Calculation

```
Total Score = 0.10 * Theory
            + 0.20 * Risk_Management
            + 0.15 * Strategy_Selection
            + 0.15 * Greeks_Management
            + 0.15 * Volatility_Analysis
            + 0.10 * Execution
            + 0.10 * Backtesting
            + 0.05 * Market_Microstructure
```

### Rating Scale

| Composite Score | Rating | Description |
|----------------|--------|-------------|
| 9.0-10.0 | Elite | PhD quant level; institutional-grade system |
| 7.5-8.9 | Advanced | Professional trader; robust risk-managed system |
| 6.0-7.4 | Proficient | Competent trader; some gaps to fill |
| 4.5-5.9 | Developing | Intermediate; significant improvement areas |
| 3.0-4.4 | Novice | Beginner; fundamental knowledge gaps |
| 1.0-2.9 | Unqualified | Should not be trading real capital |

---

## Improvement Roadmap

For each dimension scoring below 7:

1. Identify specific knowledge gaps (use assessment questions)
2. Study the corresponding theory file(s)
3. Practice with paper trading (apply the knowledge)
4. Re-assess after 30 days of deliberate practice
5. Target one dimension per month for improvement

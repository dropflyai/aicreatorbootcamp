# Theory Knowledge Base -- Options Trading Brain

PhD-level quantitative finance theory for the Options Trading Brain. This knowledge base provides the mathematical and conceptual foundation for all trading decisions, risk management, and system design.

---

## File Index

| File | Topic | Lines | Key Concepts |
|------|-------|-------|-------------|
| `stochastic_calculus.md` | Stochastic Calculus | ~350 | Brownian motion, Ito's Lemma, Girsanov, risk-neutral measure |
| `options_pricing.md` | Options Pricing | ~370 | Black-Scholes, binomial/trinomial, American options, Monte Carlo, FD methods |
| `greeks.md` | The Greeks | ~370 | Delta, Gamma, Theta, Vega, second-order Greeks, P&L attribution |
| `volatility.md` | Volatility Theory | ~380 | Historical estimators, implied vol, vol surface, local/stochastic vol, VIX |
| `risk_management.md` | Risk Management | ~370 | VaR, CVaR, stress testing, Kelly criterion, position sizing, tail hedging |
| `market_microstructure.md` | Market Microstructure | ~340 | Order book, spread theory, market making, price impact, optimal execution |
| `portfolio_theory.md` | Portfolio Theory | ~360 | Markowitz, CAPM, APT, Fama-French, risk parity, Black-Litterman, CPPI |
| `fixed_income_options.md` | Fixed Income Options | ~340 | Duration, yield curves, Vasicek/CIR/HW, swaptions, caps/floors, CDS |
| `statistical_methods.md` | Statistical Methods | ~370 | GARCH, HMM, cointegration, PCA, copulas, EVT, jump-diffusion |
| `behavioral_finance.md` | Behavioral Finance | ~350 | Prospect theory, overconfidence, disposition effect, herding, anomalies |

---

## Prerequisite Map

The following diagram shows the dependency structure for reading order. Read prerequisites before dependents.

```
Level 0 (Foundations):
  stochastic_calculus.md
  statistical_methods.md
  behavioral_finance.md

Level 1 (Core Pricing):
  options_pricing.md          <- stochastic_calculus
  volatility.md               <- stochastic_calculus, statistical_methods
  portfolio_theory.md         <- (standalone, but statistics helpful)

Level 2 (Applied):
  greeks.md                   <- options_pricing
  risk_management.md          <- options_pricing, portfolio_theory, statistical_methods
  fixed_income_options.md     <- stochastic_calculus, options_pricing
  market_microstructure.md    <- (standalone, but options_pricing context helpful)
```

### Recommended Reading Order

For someone building the trading system from scratch:

1. **stochastic_calculus.md** -- Mathematical foundation
2. **options_pricing.md** -- Core pricing theory
3. **greeks.md** -- Risk sensitivities
4. **volatility.md** -- The most important input
5. **risk_management.md** -- Capital preservation
6. **statistical_methods.md** -- Forecasting and signal generation
7. **market_microstructure.md** -- Execution quality
8. **portfolio_theory.md** -- Portfolio construction
9. **fixed_income_options.md** -- Rates world (if applicable)
10. **behavioral_finance.md** -- Cognitive biases and market anomalies

For a trader focused on practical application:

1. **greeks.md** -- Understand your risk
2. **volatility.md** -- Understand what you are buying/selling
3. **risk_management.md** -- Protect your capital
4. **behavioral_finance.md** -- Avoid common mistakes
5. **market_microstructure.md** -- Execute well
6. Then: pricing, stochastic calculus, statistics as needed for deeper understanding

---

## Cross-References to Other Brain Directories

| Theory Topic | System Module | Connection |
|-------------|--------------|------------|
| Options pricing | `05_options_analytics/` | Pricing engine implementation |
| Greeks | `05_options_analytics/`, `10_risk_management/` | Risk computation, hedging |
| Volatility | `03_feature_engineering/`, `04_market_regime/` | Vol estimation, regime detection |
| Risk management | `10_risk_management/`, `09_trade_validation/` | Position sizing, risk checks |
| Market microstructure | (execution module, TBD) | Order routing, slippage |
| Statistical methods | `03_feature_engineering/`, `08_signal_generation/` | Signal generation pipeline |
| Portfolio theory | `07_strategy_selection_engine/` | Strategy/portfolio construction |
| Behavioral finance | `04b_setup_and_pattern_library/` | Pattern recognition, bias avoidance |

---

## References (Master Bibliography)

### Textbooks

- Hull, J.C. (2021). *Options, Futures, and Other Derivatives* (11th ed.)
- Shreve, S. (2004). *Stochastic Calculus for Finance I & II*
- Gatheral, J. (2006). *The Volatility Surface*
- Glasserman, P. (2003). *Monte Carlo Methods in Financial Engineering*
- Taleb, N.N. (1997). *Dynamic Hedging*
- McNeil, A., Frey, R. & Embrechts, P. (2015). *Quantitative Risk Management*
- Cartea, A., Jaimungal, S. & Penalva, J. (2015). *Algorithmic and High-Frequency Trading*

### Foundational Papers

- Black, F. & Scholes, M. (1973). "The Pricing of Options and Corporate Liabilities"
- Merton, R. (1973). "Theory of Rational Option Pricing"
- Heston, S. (1993). "A Closed-Form Solution for Options with Stochastic Volatility"
- Dupire, B. (1994). "Pricing with a Smile"
- Kahneman, D. & Tversky, A. (1979). "Prospect Theory"
- Kyle, A.S. (1985). "Continuous Auctions and Insider Trading"

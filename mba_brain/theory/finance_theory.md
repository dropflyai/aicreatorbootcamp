# Finance Theory — Formal Foundations

## Overview

This file provides PhD-level asset pricing and corporate finance theory underlying the MBA Brain's modules on accounting (04), corporate finance (05), and valuation. It covers CAPM, factor models, options pricing, efficient markets, and behavioral finance.

**Key references:**
- Cochrane, J. H. (2005). *Asset Pricing* (Revised ed.). Princeton University Press.
- Campbell, J. Y., Lo, A. W., & MacKinlay, A. C. (1997). *The Econometrics of Financial Markets*. Princeton University Press.
- Tirole, J. (2006). *The Theory of Corporate Finance*. Princeton University Press.
- Back, K. (2017). *Asset Pricing and Portfolio Choice Theory* (2nd ed.). Oxford University Press.

---

## 1. Portfolio Theory

### 1.1 Mean-Variance Framework (Markowitz, 1952)

*Citation: Markowitz, H. (1952). Portfolio selection. Journal of Finance, 7(1), 77-91.*

**Setup:** n risky assets with returns R = (R_1, ..., R_n). Define:
- mu = E[R] (expected return vector)
- Sigma = Var(R) (n x n covariance matrix, assumed positive definite)

Portfolio weights w = (w_1, ..., w_n), with w'1 = 1 (fully invested).

**Portfolio return:** R_p = w'R
- E[R_p] = w'mu
- Var(R_p) = w'Sigma w

### 1.2 Minimum Variance Portfolio

```
min w'Sigma w  subject to  w'1 = 1
```

Solution: w_mv = Sigma^{-1} 1 / (1'Sigma^{-1} 1)

### 1.3 Efficient Frontier

The set of portfolios maximizing expected return for each level of variance (or equivalently, minimizing variance for each level of expected return).

```
min w'Sigma w  subject to  w'mu = mu_target, w'1 = 1
```

Using Lagrangian with multipliers lambda_1, lambda_2:

```
w* = Sigma^{-1} (lambda_1 mu + lambda_2 1)
```

The efficient frontier is a parabola in (sigma^2, mu) space, or a hyperbola in (sigma, mu) space.

**Two-fund separation theorem:** Any efficient portfolio is a linear combination of any two distinct efficient portfolios. This is a purely algebraic result following from the linear structure of the optimization.

### 1.4 Adding a Risk-Free Asset

With risk-free rate r_f, the efficient frontier becomes the **Capital Market Line (CML)**:

```
E[R_p] = r_f + [(E[R_m] - r_f) / sigma_m] * sigma_p
```

where (E[R_m], sigma_m) is the tangency portfolio (the market portfolio under CAPM assumptions).

The Sharpe ratio = (E[R_m] - r_f) / sigma_m is the slope of the CML and measures the market price of risk.

---

## 2. Capital Asset Pricing Model (CAPM)

### 2.1 Assumptions

*Citations:*
- *Sharpe, W. F. (1964). Capital asset prices: A theory of market equilibrium under conditions of risk. Journal of Finance, 19(3), 425-442.*
- *Lintner, J. (1965). The valuation of risk assets and the selection of risky investments in stock portfolios and capital budgets. Review of Economics and Statistics, 47(1), 13-37.*
- *Mossin, J. (1966). Equilibrium in a capital asset market. Econometrica, 34(4), 768-783.*

Key assumptions:
1. Investors are mean-variance optimizers
2. Common time horizon, common beliefs about mu and Sigma
3. Unlimited borrowing/lending at risk-free rate r_f
4. No taxes, transaction costs, or indivisibilities
5. All assets are publicly traded and perfectly divisible

### 2.2 Derivation

In equilibrium, all investors hold the market portfolio M. For any asset i, consider adding a small amount epsilon of asset i to the market portfolio:

```
d E[R_p] / d epsilon |_{epsilon=0} = E[R_i] - E[R_m]
d Var(R_p) / d epsilon |_{epsilon=0} = 2(Cov(R_i, R_m) - Var(R_m))
```

In equilibrium, the marginal Sharpe ratio of any asset equals the market Sharpe ratio:

```
(E[R_i] - r_f) / Cov(R_i, R_m) = (E[R_m] - r_f) / Var(R_m)
```

Rearranging:

```
E[R_i] - r_f = beta_i * (E[R_m] - r_f)
```

where:

```
beta_i = Cov(R_i, R_m) / Var(R_m)
```

### 2.3 Security Market Line (SML)

The SML plots expected return against beta:

```
E[R_i] = r_f + beta_i * (E[R_m] - r_f)
```

- Assets above the SML are underpriced (positive alpha)
- Assets below the SML are overpriced (negative alpha)
- In equilibrium, all assets lie on the SML (alpha = 0)

**Jensen's alpha:**

```
alpha_i = E[R_i] - r_f - beta_i * (E[R_m] - r_f)
```

Measures risk-adjusted abnormal return. A positive alpha indicates outperformance relative to CAPM predictions.

### 2.4 CAPM Limitations

1. **Roll's critique** (Roll, 1977): The market portfolio is unobservable (should include all assets — human capital, real estate, etc.). Tests of CAPM are really tests of the market proxy.

2. **Empirical anomalies:** Size effect, value effect, momentum — returns not fully explained by beta.

3. **Assumptions:** Investors are not purely mean-variance optimizers; beliefs are heterogeneous; markets have frictions.

*Citation: Roll, R. (1977). A critique of the asset pricing theory's tests. Journal of Financial Economics, 4(2), 129-176.*

---

## 3. Multi-Factor Models

### 3.1 Arbitrage Pricing Theory (APT)

*Citation: Ross, S. A. (1976). The arbitrage theory of capital asset pricing. Journal of Economic Theory, 13(3), 341-360.*

Returns generated by a k-factor model:

```
R_i = a_i + b_{i1}F_1 + b_{i2}F_2 + ... + b_{ik}F_k + epsilon_i
```

where F_j are common factors and epsilon_i is idiosyncratic noise (diversifiable).

**No-arbitrage condition:** In a large economy, the expected excess return of any asset is approximately:

```
E[R_i] - r_f = lambda_1 b_{i1} + lambda_2 b_{i2} + ... + lambda_k b_{ik}
```

where lambda_j is the risk premium for factor j.

APT requires fewer assumptions than CAPM but does not identify the factors.

### 3.2 Fama-French Three-Factor Model

*Citation: Fama, E. F., & French, K. R. (1993). Common risk factors in the returns on stocks and bonds. Journal of Financial Economics, 33(1), 3-56.*

```
E[R_i] - r_f = beta_{i,MKT}(E[R_m] - r_f) + beta_{i,SMB} * E[SMB] + beta_{i,HML} * E[HML]
```

- **MKT:** Market excess return
- **SMB (Small Minus Big):** Return of small-cap minus large-cap portfolios
- **HML (High Minus Low):** Return of high book-to-market minus low book-to-market portfolios

Explains approximately 90% of cross-sectional return variation (vs. ~70% for CAPM).

### 3.3 Extensions

**Carhart four-factor model** (Carhart, 1997): Adds momentum factor (UMD — Up Minus Down):

```
E[R_i] - r_f = beta_MKT(R_m - r_f) + beta_SMB * SMB + beta_HML * HML + beta_UMD * UMD
```

**Fama-French five-factor model** (Fama & French, 2015): Adds profitability (RMW) and investment (CMA) factors.

**Operator connection:** Factor models are essential for cost of equity estimation (Module 05). A startup's beta reflects its sensitivity to market risk. High-growth tech companies typically have beta > 1, implying higher cost of equity and higher discount rates in DCF valuation.

---

## 4. Efficient Market Hypothesis

### 4.1 Forms of Market Efficiency

*Citation: Fama, E. F. (1970). Efficient capital markets: A review of theory and empirical work. Journal of Finance, 25(2), 383-417.*

**Weak form:** Prices reflect all past trading information (prices, volume). Technical analysis cannot generate alpha.

**Semi-strong form:** Prices reflect all publicly available information. Fundamental analysis cannot generate alpha. Prices adjust instantaneously to news.

**Strong form:** Prices reflect all information, including private (insider) information. Even insiders cannot generate alpha.

### 4.2 Formal Statement

Asset prices are a martingale with respect to the information set:

```
E[P_{t+1} | I_t] = P_t * (1 + E[R_{t+1}])
```

More precisely, risk-adjusted returns are unpredictable:

```
E[R_{t+1} - R_{t+1}^required | I_t] = 0
```

### 4.3 Joint Hypothesis Problem

Tests of market efficiency are always joint tests of efficiency and a particular asset pricing model. An apparent anomaly could reflect either market inefficiency or a misspecified model.

*Citation: Fama, E. F. (1991). Efficient capital markets: II. Journal of Finance, 46(5), 1575-1617.*

### 4.4 Empirical Evidence

**Supporting EMH:**
- Professional fund managers rarely beat the market after fees (Malkiel, 1995)
- Event studies show rapid price adjustment to information
- Calendar anomalies attenuate after publication

**Challenging EMH:**
- Excess volatility (Shiller, 1981): Stock prices are more volatile than justified by dividend fundamentals
- Predictability: dividend yield, earnings yield, and term spread predict returns at longer horizons
- Momentum and reversal effects

---

## 5. Black-Scholes-Merton Option Pricing

### 5.1 Setup

*Citations:*
- *Black, F., & Scholes, M. (1973). The pricing of options and corporate liabilities. Journal of Political Economy, 81(3), 637-654.*
- *Merton, R. C. (1973). Theory of rational option pricing. Bell Journal of Economics and Management Science, 4(1), 141-183.*

Assumptions:
- Stock price follows geometric Brownian motion: dS = mu*S*dt + sigma*S*dW
- Continuous trading, no transaction costs, no dividends
- Constant risk-free rate r and volatility sigma
- No arbitrage

### 5.2 Derivation Sketch

**Key insight:** Construct a riskless portfolio by holding the option and delta-hedging with the underlying stock.

Portfolio: V = long one option (value f(S, t)), short (partial f / partial S) shares of stock.

By Ito's lemma:

```
df = (partial f/partial t + mu*S*(partial f/partial S) + 0.5*sigma^2*S^2*(partial^2 f/partial S^2)) dt
     + sigma*S*(partial f/partial S) dW
```

The portfolio value change:

```
dV = df - (partial f/partial S) dS
   = (partial f/partial t + 0.5*sigma^2*S^2*(partial^2 f/partial S^2)) dt
```

This is riskless (no dW term), so by no-arbitrage it must earn the risk-free rate:

```
dV = r * V * dt = r * (f - S*(partial f/partial S)) * dt
```

### 5.3 The Black-Scholes PDE

Setting the two expressions for dV equal:

```
partial f/partial t + r*S*(partial f/partial S) + 0.5*sigma^2*S^2*(partial^2 f/partial S^2) = r*f
```

**Critical observation:** The drift mu does not appear. The option price is independent of the expected return on the stock. This is the essence of risk-neutral pricing.

### 5.4 Black-Scholes Formula

For a European call option with strike K and maturity T:

```
C = S * N(d_1) - K * e^{-rT} * N(d_2)
```

where:

```
d_1 = [ln(S/K) + (r + sigma^2/2)*T] / (sigma*sqrt(T))
d_2 = d_1 - sigma*sqrt(T)
```

N(.) is the standard normal CDF.

For a European put: P = K * e^{-rT} * N(-d_2) - S * N(-d_1)

**Put-call parity:** C - P = S - K * e^{-rT}

### 5.5 The Greeks

| Greek | Definition | Measures |
|-------|-----------|----------|
| Delta | partial f / partial S | Sensitivity to underlying price |
| Gamma | partial^2 f / partial S^2 | Sensitivity of delta to price |
| Theta | partial f / partial t | Time decay |
| Vega | partial f / partial sigma | Sensitivity to volatility |
| Rho | partial f / partial r | Sensitivity to interest rate |

### 5.6 Risk-Neutral Valuation

Under the risk-neutral measure Q, the stock price drift is r (not mu):

```
dS = r*S*dt + sigma*S*dW^Q
```

Any derivative's price equals its discounted expected payoff under Q:

```
f(S, t) = e^{-r(T-t)} * E^Q[payoff(S_T)]
```

**Operator connection:** Real options valuation (Module 05) applies BSM logic to business decisions. The option to delay, expand, or abandon a project has value analogous to financial options. Startups with high uncertainty (high sigma) have more valuable real options, justifying higher valuations even with negative current cash flows.

---

## 6. Modigliani-Miller Theorems

### 6.1 MM Proposition I (Capital Structure Irrelevance)

*Citation: Modigliani, F., & Miller, M. H. (1958). The cost of capital, corporation finance and the theory of investment. American Economic Review, 48(3), 261-297.*

**Assumptions:** Perfect capital markets, no taxes, no bankruptcy costs, no asymmetric information.

**Theorem:** The total value of a firm is independent of its capital structure.

```
V_L = V_U
```

(Value of levered firm = Value of unlevered firm)

**Proof sketch:** If V_L != V_U, an arbitrageur could buy the cheaper, replicate the cash flows of the more expensive using homemade leverage, and earn riskless profit. Competition eliminates the mispricing.

### 6.2 MM Proposition II

**Theorem:** The cost of equity increases linearly with leverage:

```
r_E = r_A + (D/E)(r_A - r_D)
```

where r_A is the unlevered cost of capital (WACC in MM world), r_D is the cost of debt, D is debt value, E is equity value.

**Intuition:** As leverage increases, equity becomes riskier (residual claim on more volatile cash flows), so equity holders demand higher returns. But the WACC remains constant:

```
WACC = (E/(D+E)) * r_E + (D/(D+E)) * r_D = r_A
```

### 6.3 MM with Corporate Taxes

*Citation: Modigliani, F., & Miller, M. H. (1963). Corporate income taxes and the cost of capital: A correction. American Economic Review, 53(3), 433-443.*

With corporate tax rate tau_c, interest is tax-deductible:

```
V_L = V_U + tau_c * D
```

The value of the tax shield = tau_c * D (for perpetual debt).

This implies 100% debt financing is optimal — clearly unrealistic, motivating trade-off theory.

### 6.4 Trade-Off Theory

**Static trade-off:** Optimal capital structure balances:
- Tax benefit of debt: tau_c * D (increasing in D)
- Expected costs of financial distress: probability of distress times distress costs (increasing in D)

```
V_L = V_U + PV(tax shield) - PV(distress costs)
```

Optimal D* maximizes V_L, equating marginal tax benefit with marginal distress cost.

*Citation: Kraus, A., & Litzenberger, R. H. (1973). A state-preference model of optimal financial leverage. Journal of Finance, 28(4), 911-922.*

### 6.5 Pecking Order Theory

*Citation: Myers, S. C., & Majluf, N. S. (1984). Corporate financing and investment decisions when firms have information that investors do not have. Journal of Financial Economics, 13(2), 187-221.*

Under asymmetric information, managers (who know more about firm value) prefer financing sources that minimize adverse selection costs:

1. Internal funds (retained earnings) — no adverse selection
2. Debt — low adverse selection (fixed claims less sensitive to firm value)
3. Equity — highest adverse selection (most sensitive to firm value)

**Formal intuition:** Issuing equity signals that managers believe the stock is overvalued (otherwise they'd use cheaper financing). Rational investors discount the stock upon equity issuance, creating a "lemons premium."

**Operator connection:** MM theorems establish the baseline; trade-off and pecking order explain real-world capital structure choices. Startups typically follow pecking order (bootstrap -> debt -> equity) not by choice but by availability. Understanding these theories helps in fundraising strategy (Module 05) and explaining to investors why the chosen capital structure makes sense.

---

## 7. Behavioral Finance

### 7.1 Prospect Theory

*Citation: Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263-291.*

Key departures from expected utility:

**Value function v(x):**
- Defined over gains and losses relative to a reference point (not absolute wealth)
- Concave for gains (risk aversion): v(x) = x^alpha for x >= 0
- Convex for losses (risk seeking): v(x) = -lambda(-x)^beta for x < 0
- Steeper for losses (loss aversion): lambda > 1 (typically ~2.25)

**Probability weighting function pi(p):**
- Overweights small probabilities: pi(p) > p for small p
- Underweights moderate to high probabilities: pi(p) < p for large p
- Not perfectly calibrated: pi(0) = 0, pi(1) = 1, but not linear between

### 7.2 Key Biases in Financial Decision-Making

**Disposition effect** (Shefrin & Statman, 1985): Investors hold losing stocks too long and sell winners too early. Explained by prospect theory — losses are in the convex (risk-seeking) region.

**Overconfidence:** Investors overestimate the precision of their information. Trading volume is far higher than rational models predict. Odean (1999) showed individual investors who trade most earn the lowest returns.

**Anchoring:** Estimates are biased toward initial values. In valuation, analysts anchor to recent prices, round numbers, or their own prior estimates.

**Representativeness:** Judging probabilities by similarity rather than base rates. Investors extrapolate short-run trends (hot hand fallacy in stock picking).

**Availability bias:** Overweighting events that come easily to mind. Recent crashes cause excessive risk aversion; recent booms cause excessive risk-taking.

### 7.3 Limits to Arbitrage

Even if prices are wrong, rational arbitrageurs may not correct them:

**Fundamental risk:** The "correct" value is uncertain, so the arbitrage position is risky.

**Noise trader risk** (De Long, Friedman, Shleifer, & Vishny, 1990): Irrational traders can push prices further from fundamentals before correction, causing losses for arbitrageurs in the short run.

**Implementation costs:** Short-selling constraints, margin requirements, transaction costs.

*Citation: Shleifer, A., & Vishny, R. W. (1997). The limits of arbitrage. Journal of Finance, 52(1), 35-55.*

### 7.4 Market-Level Anomalies

**Excess volatility** (Shiller, 1981): Stock prices vary more than changes in expected dividends can justify.

**Equity premium puzzle** (Mehra & Prescott, 1985): The historical equity premium (~6-7%) is too large to explain with standard risk aversion parameters.

**Predictability:** Dividend-price ratios, earnings-price ratios, and term spreads predict stock returns at horizons of 1-5 years. This is inconsistent with the simplest versions of EMH but consistent with time-varying risk premia or irrational exuberance.

**Operator connection:** Behavioral finance explains why markets are not always efficient, why investors make systematic errors, and why financial crises occur. For operators, the key insight is that market sentiment matters — timing of fundraising, IPO, and M&A should account for market psychology, not just fundamentals. See Module 05 (fundraising) and Module 15 (macro context).

---

## 8. Corporate Finance Theory

### 8.1 NPV and the Fisher Separation Theorem

**Fisher Separation** (Fisher, 1930): Under perfect capital markets, the firm's investment decision (maximize NPV) is independent of shareholders' consumption preferences. All shareholders agree on the NPV rule regardless of their individual time preferences.

```
NPV = sum_{t=0}^{T} CF_t / (1 + r)^t
```

Accept all projects with NPV > 0. This maximizes firm value and shareholder wealth.

### 8.2 WACC and Valuation

**Weighted Average Cost of Capital:**

```
WACC = (E/(D+E)) * r_E + (D/(D+E)) * r_D * (1 - tau_c)
```

where tau_c is the corporate tax rate.

**Free Cash Flow to Firm:**

```
FCFF = EBIT(1 - tau_c) + Depreciation - CapEx - Change in Working Capital
```

**DCF valuation:**

```
V_firm = sum_{t=1}^{T} FCFF_t / (1 + WACC)^t + TV / (1 + WACC)^T
```

**Terminal value** (Gordon Growth Model):

```
TV = FCFF_{T+1} / (WACC - g)
```

where g is the perpetual growth rate (must be less than WACC).

### 8.3 Real Options

*Citation: Dixit, A. K., & Pindyck, R. S. (1994). Investment Under Uncertainty. Princeton University Press.*

Traditional NPV ignores the value of managerial flexibility. Real options approach values:

- **Option to delay:** Wait for better information before investing
- **Option to expand:** Scale up if conditions are favorable
- **Option to abandon:** Exit if conditions deteriorate
- **Option to switch:** Change inputs or outputs

The value of waiting is analogous to an American call option on the project's NPV.

**Investment threshold under uncertainty:** Rather than investing when NPV > 0, the optimal rule is to invest when NPV exceeds a positive threshold that compensates for the option value of waiting:

```
Invest when V >= V* > I (where I is the investment cost)
```

The threshold V* increases with uncertainty (higher sigma raises option value).

---

## Summary of Key Results

| Theorem/Model | Key Insight | Practical Implication |
|--------------|-------------|----------------------|
| CAPM | Expected return = r_f + beta * market premium | Cost of equity estimation |
| MM I | Capital structure irrelevant (in perfect markets) | Baseline for understanding leverage |
| MM II | Cost of equity rises with leverage | WACC unchanged despite leverage |
| MM with taxes | Tax shield creates value | Optimal leverage trades off tax benefit vs. distress |
| Black-Scholes | Options priced by no-arbitrage | Real options valuation |
| Efficient Markets | Prices reflect information | Limits of stock-picking; market timing |
| Prospect Theory | Loss aversion, reference dependence | Explains investor behavior |
| Pecking Order | Firms prefer internal funds | Explains financing hierarchy |

These results form the theoretical architecture of modern finance and underpin all valuation, capital structure, and investment decision-making.

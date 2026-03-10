# Benchmark Tests -- PhD-Level Quantitative Finance

20 benchmark questions to assess mastery of the theoretical knowledge base. These questions span all 10 theory files and require derivation, explanation, and practical application.

---

## Test 1: Stochastic Calculus

**Q1: Ito's Lemma Application**

A stock price follows dS = 0.08*S dt + 0.25*S dW under the physical measure P. Compute the dynamics of f(S) = S^2 using Ito's Lemma. Show all steps.

**Expected Answer:**
df = (df/dS) dS + (1/2)(d^2f/dS^2)(dS)^2
df/dS = 2S, d^2f/dS^2 = 2
(dS)^2 = sigma^2 * S^2 * dt = 0.0625 * S^2 * dt
df = 2S * (0.08*S dt + 0.25*S dW) + (1/2)(2)(0.0625*S^2 dt)
df = (0.16*S^2 + 0.0625*S^2) dt + 0.50*S^2 dW
df = 0.2225*S^2 dt + 0.50*S^2 dW
d(S^2) = S^2 * (0.2225 dt + 0.50 dW)

---

## Test 2: Risk-Neutral Pricing

**Q2: Girsanov Transformation**

Using the stock from Q1, apply Girsanov's theorem to find the dynamics under the risk-neutral measure Q, given r = 0.03. What is the market price of risk? Write the SDE under Q.

**Expected Answer:**
Market price of risk: theta = (mu - r)/sigma = (0.08 - 0.03)/0.25 = 0.20
Under Q: dS = r*S dt + sigma*S dW^Q = 0.03*S dt + 0.25*S dW^Q
where dW^Q = dW + theta*dt = dW + 0.20*dt

---

## Test 3: Options Pricing

**Q3: Black-Scholes PDE Derivation**

Starting from a portfolio Pi = V(S,t) - Delta*S, derive the Black-Scholes PDE. State clearly where you use Ito's Lemma and where you use the no-arbitrage argument.

**Expected Answer:** Full derivation as in theory/options_pricing.md Section 1. Key steps: (1) Apply Ito's Lemma to V(S,t), (2) Construct the delta-hedged portfolio, (3) Set Delta = dV/dS to eliminate randomness, (4) Set dPi = r*Pi*dt (no-arbitrage), (5) Equate to get the PDE.

---

## Test 4: Greeks

**Q4: Theta-Gamma Relationship**

Prove that for a delta-hedged option position, Theta + (1/2)*sigma^2*S^2*Gamma = r*V - r*S*Delta. What does this imply about the tradeoff between theta and gamma for a delta-neutral portfolio?

**Expected Answer:** Start from Black-Scholes PDE: dV/dt + r*S*dV/dS + (1/2)*sigma^2*S^2*d^2V/dS^2 = r*V. Identify Theta = dV/dt, Delta = dV/dS, Gamma = d^2V/dS^2. Rearrange. For delta-neutral: Theta ~ -(1/2)*sigma^2*S^2*Gamma. Positive gamma costs negative theta and vice versa.

---

## Test 5: Volatility Surface

**Q5: Dupire's Local Volatility**

State the Dupire equation for extracting local volatility from European call prices. Explain intuitively why the formula requires the second derivative of call prices with respect to strike, and what happens if this quantity is negative.

**Expected Answer:** sigma_L^2(K,T) = 2*[dC/dT + (r-q)*K*dC/dK + q*C] / (K^2 * d^2C/dK^2). The second derivative d^2C/dK^2 is proportional to the risk-neutral probability density at K. If negative, the density is negative (impossible), indicating butterfly arbitrage in the input prices.

---

## Test 6: Stochastic Volatility

**Q6: Heston Model Calibration**

The Heston model has parameters {v_0, kappa, theta, xi, rho}. (a) State the Feller condition and explain its economic meaning. (b) Explain which parameters control the level, slope, and curvature of the implied volatility smile. (c) Why is the characteristic function approach used instead of Monte Carlo for European option pricing in Heston?

**Expected Answer:** (a) 2*kappa*theta > xi^2 ensures variance stays positive. (b) v_0 and theta control level; rho controls skew (negative rho produces downside skew); xi controls curvature/smile. (c) Characteristic function gives semi-analytic prices via Fourier inversion, much faster than Monte Carlo (seconds vs. minutes).

---

## Test 7: Risk Management

**Q7: Expected Shortfall vs. VaR**

(a) Define VaR and ES mathematically. (b) Construct a simple example where VaR is not subadditive but ES is. (c) Why did Basel III switch from VaR to ES for market risk capital requirements?

**Expected Answer:** (a) VaR_alpha: P(Loss > VaR) = 1-alpha. ES_alpha = E[Loss | Loss > VaR]. (b) Two binary bets each with 4% probability of losing $100. Individually, 95% VaR = 0. Combined, 95% VaR could be $100 (not subadditive). ES correctly accounts for tail. (c) ES is a coherent risk measure (subadditive), captures tail severity, and is more informative about extreme losses.

---

## Test 8: Kelly Criterion

**Q8: Kelly Criterion for Options**

An options trade has a 65% probability of gaining 40% and a 35% probability of losing 100% (total premium loss). (a) Compute the full Kelly fraction. (b) What is the half-Kelly allocation? (c) What is the expected geometric growth rate at full Kelly vs. half Kelly?

**Expected Answer:** (a) E[R] = 0.65*0.40 + 0.35*(-1.0) = -0.09. Negative expected value -- Kelly says don't bet (f* = 0 or negative). This is a trick question: the trade has negative expectation and should not be taken. (b) and (c) Not applicable; expected value is negative. A good answer recognizes this immediately.

---

## Test 9: Market Microstructure

**Q9: Kyle Model**

In Kyle's (1985) model: (a) State the equilibrium price impact coefficient lambda. (b) Explain why the informed trader does not trade aggressively. (c) How does lambda change if noise trader volume increases?

**Expected Answer:** (a) lambda = (1/2) * sigma_V / sigma_u. (b) The informed trader trades proportionally to noise volume to camouflage orders; aggressive trading would move the price against them. (c) If sigma_u increases (more noise trading), lambda decreases (market becomes more liquid) because the market maker attributes less order flow to information.

---

## Test 10: Portfolio Theory

**Q10: Black-Litterman**

(a) What problem does Black-Litterman solve that Markowitz does not? (b) Write the formula for the posterior expected return vector. (c) What happens to the portfolio weights when an investor has no views?

**Expected Answer:** (a) Markowitz produces unstable, extreme weights from noisy estimated returns. BL combines equilibrium returns (prior) with investor views (data) to produce stable, intuitive weights. (b) mu_BL = [(tau*Sigma)^{-1} + P^T*Omega^{-1}*P]^{-1} * [(tau*Sigma)^{-1}*Pi + P^T*Omega^{-1}*Q]. (c) When P is empty, mu_BL = Pi (CAPM equilibrium returns), and w = w_mkt (market cap weights).

---

## Test 11: GARCH

**Q11: GARCH Volatility Forecasting**

A GARCH(1,1) model has omega=0.000002, alpha=0.08, beta=0.91. (a) What is the long-run variance? (b) What is the persistence? (c) Today's return was -3% (epsilon = -0.03) and current sigma^2 = 0.0004. What is tomorrow's forecasted variance?

**Expected Answer:** (a) V_L = 0.000002 / (1 - 0.08 - 0.91) = 0.000002 / 0.01 = 0.0002 (sigma_L = 1.41%). (b) Persistence = alpha + beta = 0.99 (very persistent). (c) sigma^2_tomorrow = 0.000002 + 0.08*(0.03)^2 + 0.91*0.0004 = 0.000002 + 0.000072 + 0.000364 = 0.000438 (sigma = 2.09%).

---

## Test 12: Fixed Income

**Q12: Duration and Convexity**

A 5-year bond with 4% annual coupon, YTM = 5%, face value $100. (a) Calculate the modified duration. (b) Estimate the price change for a 50bp increase in yield using duration only, then using duration + convexity.

**Expected Answer:** Price = sum C/(1+y)^t + F/(1+y)^5 = $95.67. Modified duration ~ 4.38 years. Convexity ~ 22.1. (a) Duration-only estimate: dP = -D_mod * dy * P = -4.38 * 0.005 * 95.67 = -$2.10. (b) Duration + convexity: dP = -4.38*0.005*95.67 + 0.5*22.1*0.005^2*95.67 = -2.10 + 0.026 = -$2.07.

---

## Test 13: Behavioral Finance

**Q13: Prospect Theory and Options Demand**

(a) Using prospect theory, explain why retail investors systematically overpay for deep OTM call options. Reference the probability weighting function. (b) How does this create a tradeable signal for systematic options sellers?

**Expected Answer:** (a) Deep OTM calls have low probability of large payoff (lottery-like). The probability weighting function w(p) overweights small probabilities (w(0.03) >> 0.03), making the subjective expected value of the call higher than its objective expected value. Loss aversion is less relevant here; it is the overweighting of tail probabilities that drives demand. (b) Since OTM calls are overpriced on average, systematic sellers earn a premium. The signal: high IV rank on OTM calls relative to ATM suggests excessive demand.

---

## Test 14: Copulas

**Q14: Tail Dependence**

(a) Define upper and lower tail dependence coefficients. (b) Why is the Gaussian copula inappropriate for modeling joint equity market crashes? (c) Which copula would you use instead and why?

**Expected Answer:** (a) Lower tail dependence: lambda_L = lim_{u->0} P(X < F_X^{-1}(u) | Y < F_Y^{-1}(u)). Upper tail dependence: similar for the upper tail. (b) Gaussian copula has zero tail dependence (lambda_L = lambda_U = 0), meaning it assigns near-zero probability to simultaneous extreme events. Empirically, equity crashes are highly correlated. (c) Student-t copula (symmetric tail dependence) or Clayton copula (lower tail dependence specifically).

---

## Test 15: Variance Swaps

**Q15: VIX and Variance Swap Replication**

(a) Explain why the VIX is related to the price of a variance swap. (b) Why does the replication of a variance swap require options at all strikes, not just ATM? (c) What happens to the replication when there are no liquid options at extreme strikes?

**Expected Answer:** (a) VIX^2 * T is approximately the fair price of a variance swap (model-free expected realized variance). (b) Realized variance depends on the entire distribution of returns, not just the center. OTM options provide information about the tails. The 1/K^2 weighting in the VIX formula reflects the replication portfolio. (c) Truncation at extreme strikes introduces "wing truncation error," typically underestimating variance. Exchanges extrapolate or use the last available quote.

---

## Test 16: Execution

**Q16: Almgren-Chriss Optimal Execution**

(a) State the objective function of the Almgren-Chriss model. (b) What determines whether the optimal trajectory is front-loaded or evenly distributed? (c) How does the model apply to options execution?

**Expected Answer:** (a) min_v E[IS] + lambda*Var(IS) where IS is implementation shortfall. (b) Risk aversion lambda: high lambda -> front-loaded (trade fast to reduce risk); low lambda -> TWAP-like (trade evenly to minimize impact). (c) Options have wider spreads and lower liquidity, so temporary impact is larger. Use longer execution horizons, smaller slices, and consider the underlying's movement (delta exposure during execution).

---

## Test 17: American Options

**Q17: Early Exercise**

(a) Prove that it is never optimal to exercise an American call early on a non-dividend-paying stock. (b) Give an example where early exercise of an American put IS optimal. (c) Describe the Longstaff-Schwartz algorithm.

**Expected Answer:** (a) C >= S - K*exp(-r(T-t)) > S - K = intrinsic value, so the option is always worth more alive than dead. (b) Deep ITM put: the interest on receiving K now exceeds the remaining time value. (c) LS: simulate paths, work backward, at each exercise date regress discounted continuation values on basis functions of current state, exercise if payoff > regression estimate.

---

## Test 18: Regime Detection

**Q18: Hidden Markov Model for Vol Regimes**

(a) Define a 2-state HMM for market regimes with different volatility levels. (b) Describe the Baum-Welch algorithm. (c) How would you use the filtered state probabilities for strategy selection?

**Expected Answer:** (a) States: {low-vol, high-vol}. Emissions: r_t|S_t=1 ~ N(mu_1, sigma_1^2), r_t|S_t=2 ~ N(mu_2, sigma_2^2). Transition matrix A. (b) E-step: forward-backward algorithm to compute P(S_t|data). M-step: update mu, sigma, A given state probabilities. Iterate. (c) When P(high-vol) > 0.7, switch to defensive strategies (reduce position size, add hedges, use wider strikes for income trades). When P(low-vol) > 0.7, use income strategies more aggressively.

---

## Test 19: Extreme Value Theory

**Q19: Tail Risk Quantification**

(a) What is the Generalized Pareto Distribution and how is it used for tail risk estimation? (b) If estimated xi = 0.3, what does this tell you about the tail behavior? (c) How does this inform tail hedge sizing?

**Expected Answer:** (a) GPD: H(x) = 1 - (1 + xi*x/sigma)^{-1/xi} for exceedances over a threshold. Used in POT method to model extreme losses beyond a high threshold. (b) xi = 0.3 > 0 means Frechet (heavy) tail: polynomial decay with tail index 1/xi = 3.33. Moments above order 3 are infinite. The probability of extreme events is much higher than Gaussian. (c) Heavy tails mean tail hedges are more valuable than Gaussian risk models suggest. Size the hedge to cover the EVT-estimated loss at the desired confidence level, not the Gaussian estimate.

---

## Test 20: Comprehensive Integration

**Q20: System Design Question**

Design a complete volatility trading strategy that integrates: (a) A volatility forecasting model (specify the model and inputs), (b) A signal generation rule (when to enter), (c) A strategy selection framework (which strategy to use), (d) A position sizing method, (e) Risk management rules (stops, limits, adjustments), and (f) An execution plan.

**Expected Answer:** This is an open-ended question. A complete answer should demonstrate integration across all theory files. Example structure:
(a) HAR-RV model using 5-min realized vol (daily, weekly, monthly components) to forecast 30-day realized vol.
(b) Signal: when forecasted RV is > 2 vol points below current ATM IV (sell vol); when forecasted RV > 2 vol points above current ATM IV (buy vol).
(c) High IV rank + sell signal -> iron condor or short strangle. Low IV rank + buy signal -> long straddle or calendar spread.
(d) Kelly-based sizing with fractional Kelly (alpha=0.5), using estimated signal Sharpe ratio.
(e) Stop: close if loss exceeds 2x initial credit (for selling) or 50% of premium (for buying). Greek limits. Drawdown rules.
(f) Limit orders at mid-price, spread orders for multi-leg, avoid execution at market open.

---

## Scoring Guide

| Score Range | Questions Correctly Answered | Level |
|-------------|----------------------------|-------|
| 18-20 | PhD-level mastery | Elite |
| 14-17 | Advanced quantitative understanding | Advanced |
| 10-13 | Solid intermediate knowledge | Proficient |
| 6-9 | Fundamental gaps present | Developing |
| 0-5 | Major study required | Novice |

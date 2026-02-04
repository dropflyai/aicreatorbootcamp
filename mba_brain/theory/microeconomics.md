# Microeconomic Theory — Formal Foundations

## Overview

This file provides PhD-level microeconomic theory underlying the MBA Brain's modules on economics (03), marketing (07), and strategy (06). It covers consumer theory, producer theory, general equilibrium, welfare economics, and market failures with formal mathematical treatment.

**Key references:**
- Mas-Colell, A., Whinston, M. D., & Green, J. R. (1995). *Microeconomic Theory*. Oxford University Press.
- Varian, H. R. (1992). *Microeconomic Analysis* (3rd ed.). W. W. Norton.
- Jehle, G. A., & Reny, P. J. (2011). *Advanced Microeconomic Theory* (3rd ed.). Pearson.

---

## 1. Consumer Theory

### 1.1 Preference Relations and Utility

**Axioms of rational preference:**

Let X be the consumption set (typically R+^n). A preference relation >= on X is rational if:

1. **Completeness:** For all x, y in X, either x >= y or y >= x (or both)
2. **Transitivity:** For all x, y, z in X, if x >= y and y >= z, then x >= z

Additional standard assumptions:
3. **Continuity:** The sets {y : y >= x} and {y : x >= y} are closed for all x
4. **Monotonicity (non-satiation):** If x >> y (strictly more of every good), then x > y
5. **Convexity:** If x >= y, then tx + (1-t)y >= y for all t in [0,1]

**Utility representation theorem** (Debreu, 1954):
If >= is a continuous rational preference relation on X = R+^n, then there exists a continuous utility function u: X -> R such that x >= y if and only if u(x) >= u(y).

*Citation: Debreu, G. (1954). Representation of a preference ordering by a numerical function. In R. M. Thrall, C. H. Coombs, & R. L. Davis (Eds.), Decision Processes (pp. 159-165). Wiley.*

### 1.2 Utility Maximization Problem (UMP)

The consumer solves:

```
max u(x)  subject to  p . x <= w
 x
```

where p is the price vector and w is wealth.

**First-order conditions (interior solution):**

Using the Lagrangian L = u(x) - lambda(p . x - w):

```
partial u / partial x_i = lambda * p_i    for all i = 1, ..., n
p . x = w                                  (budget exhaustion)
```

This yields the **Marshallian (ordinary) demand function** x(p, w).

**Key result:** At the optimum, the marginal rate of substitution between any two goods equals their price ratio:

```
MRS_{ij} = (partial u / partial x_i) / (partial u / partial x_j) = p_i / p_j
```

### 1.3 Indirect Utility and Roy's Identity

The **indirect utility function** is:

```
v(p, w) = max u(x) subject to p . x <= w = u(x(p, w))
```

**Roy's Identity** (Roy, 1947):

```
x_i(p, w) = - (partial v / partial p_i) / (partial v / partial w)
```

This allows recovery of demand from the indirect utility function.

### 1.4 Expenditure Minimization Problem (EMP)

The dual problem:

```
min p . x  subject to  u(x) >= u_bar
 x
```

This yields:
- **Hicksian (compensated) demand** h(p, u_bar)
- **Expenditure function** e(p, u_bar) = p . h(p, u_bar)

**Shephard's Lemma:**

```
h_i(p, u_bar) = partial e(p, u_bar) / partial p_i
```

### 1.5 The Slutsky Equation

The fundamental equation connecting Marshallian and Hicksian demands:

```
partial x_i / partial p_j = partial h_i / partial p_j - x_j * (partial x_i / partial w)
```

**Decomposition:**
- **Total effect** = Substitution effect + Income effect
- partial x_i / partial p_j = SE_{ij} + IE_{ij}

The **substitution effect** (partial h_i / partial p_j) is always non-positive for own-price changes (i = j), reflecting the law of compensated demand.

The **income effect** (-x_j * partial x_i / partial w) can be positive or negative:
- Normal goods: income effect reinforces substitution effect
- Giffen goods: income effect dominates, leading to upward-sloping demand (theoretically possible, empirically rare)

*Citation: Slutsky, E. (1915). Sulla teoria del bilancio del consumatore. Giornale degli Economisti, 51, 1-26.*

**Operator connection:** The Slutsky decomposition explains why price changes have complex effects on demand. A price increase reduces quantity demanded through substitution (consumers switch to alternatives) but also reduces real purchasing power (income effect). For luxury goods the income effect amplifies the substitution effect; for necessities it partially offsets it. This matters for pricing strategy (Module 03).

### 1.6 Revealed Preference

**Weak Axiom of Revealed Preference (WARP):**
If bundle x is chosen when y was affordable (p . x >= p . y), then y cannot be chosen when x is affordable at those prices.

**Strong Axiom of Revealed Preference (SARP):**
Extends WARP to chains of choices — no cycles in revealed preference.

*Citation: Samuelson, P. A. (1938). A note on the pure theory of consumer's behaviour. Economica, 5(17), 61-71.*

### 1.7 Welfare Measures

**Compensating Variation (CV):**
The amount of money that, when taken from the consumer after a price change, restores them to their original utility level.

```
CV = e(p_new, u_old) - w = e(p_new, u_old) - e(p_old, u_old)
```

**Equivalent Variation (EV):**
The amount of money that, if given to the consumer at original prices, would make them as well off as after the price change.

```
EV = w - e(p_old, u_new) = e(p_new, u_new) - e(p_old, u_new)
```

**Consumer Surplus** approximates both CV and EV when income effects are small (Willig, 1976).

*Citation: Willig, R. D. (1976). Consumer's surplus without apology. American Economic Review, 66(4), 589-597.*

---

## 2. Producer Theory

### 2.1 Production Functions

A production function f: R+^n -> R+ maps input vectors to output quantities:

```
y = f(x_1, x_2, ..., x_n)
```

**Key properties:**
- **Returns to scale:** f(tx) vs. t*f(x) for t > 1
  - Increasing returns: f(tx) > t*f(x)
  - Constant returns: f(tx) = t*f(x)
  - Decreasing returns: f(tx) < t*f(x)
- **Marginal product:** MP_i = partial f / partial x_i
- **Technical rate of substitution:** TRS_{ij} = MP_i / MP_j

**Common functional forms:**

Cobb-Douglas: f(x_1, x_2) = A * x_1^alpha * x_2^beta
- Returns to scale determined by alpha + beta
- Elasticity of substitution = 1

CES: f(x_1, x_2) = A * [delta * x_1^rho + (1-delta) * x_2^rho]^(1/rho)
- Elasticity of substitution sigma = 1/(1-rho)
- Nests Cobb-Douglas (rho -> 0), Leontief (rho -> -inf), linear (rho = 1)

### 2.2 Cost Minimization

The firm solves:

```
min w . x  subject to  f(x) >= y
 x
```

where w is the input price vector and y is the target output.

**First-order conditions:**

```
w_i = mu * (partial f / partial x_i)    for all i
f(x) = y
```

This yields:
- **Conditional factor demands** x(w, y)
- **Cost function** c(w, y) = w . x(w, y)

**Properties of the cost function** (Shephard, 1953):
1. Non-decreasing in w and y
2. Homogeneous of degree 1 in w
3. Concave in w
4. Shephard's Lemma: x_i(w, y) = partial c(w, y) / partial w_i

### 2.3 Profit Maximization

The competitive firm solves:

```
max p * f(x) - w . x
 x
```

**First-order conditions:**

```
p * (partial f / partial x_i) = w_i    for all i
```

"Hire each input until its marginal revenue product equals its price."

**Supply function:** y(p, w) = f(x(p, w))

**Profit function:** pi(p, w) = max_x {p * f(x) - w . x}

**Hotelling's Lemma:**

```
y(p, w) = partial pi / partial p
-x_i(p, w) = partial pi / partial w_i
```

### 2.4 Cost Curves and Industry Structure

**Short-run vs. long-run costs:**
- Short run: some inputs fixed; yields U-shaped average cost curves
- Long run: all inputs variable; envelope of short-run curves

**Relationship between cost curves:**
- MC crosses ATC and AVC at their minimum points
- When MC < ATC, ATC is falling; when MC > ATC, ATC is rising
- Long-run ATC envelope: LRAC = min_K {SRAC(y, K)}

**Economies of scale:**

```
S(y) = AC(y) / MC(y) = c(y) / (y * c'(y))
```

- S > 1: economies of scale (decreasing AC)
- S = 1: constant returns
- S < 1: diseconomies of scale (increasing AC)

**Operator connection:** Cost structure determines competitive dynamics. Industries with large economies of scale tend toward concentration. The minimum efficient scale (MES) — the output level where LRAC is minimized — determines how many firms can profitably serve a market. This is foundational for Module 06 (strategy) and market structure analysis.

---

## 3. General Equilibrium

### 3.1 The Arrow-Debreu Model

*Citation: Arrow, K. J., & Debreu, G. (1954). Existence of an equilibrium for a competitive economy. Econometrica, 22(3), 265-290.*

**Setup:**
- I consumers, each with preferences u_i and endowment omega_i
- J firms, each with production set Y_j
- L commodities

**Competitive (Walrasian) equilibrium** is an allocation (x*, y*) and price vector p* such that:

1. **Consumer optimization:** For each consumer i, x_i* maximizes u_i(x_i) subject to p* . x_i <= p* . omega_i + sum_j theta_{ij} * pi_j(p*)

2. **Firm optimization:** For each firm j, y_j* maximizes p* . y_j over Y_j

3. **Market clearing:** sum_i x_i* = sum_i omega_i + sum_j y_j*

**Existence theorem** (Arrow & Debreu, 1954; Debreu, 1959):
Under standard assumptions (convex preferences, convex production sets, no externalities), a competitive equilibrium exists.

The proof uses Kakutani's fixed-point theorem applied to the excess demand correspondence.

### 3.2 First Fundamental Theorem of Welfare Economics

**Statement:** If preferences are locally non-satiated, then any Walrasian equilibrium allocation is Pareto efficient.

**Proof sketch:**
Suppose (x*, y*, p*) is a Walrasian equilibrium and x* is not Pareto efficient. Then there exists a feasible allocation (x', y') that Pareto dominates: u_i(x_i') >= u_i(x_i*) for all i with strict inequality for some i.

By local non-satiation, for the consumer with strict preference: p* . x_i' > p* . x_i* (otherwise x_i* wouldn't be optimal). For all others: p* . x_i' >= p* . x_i* (by utility maximization with non-satiation). Summing: p* . sum_i x_i' > p* . sum_i x_i*. But by market clearing and profit maximization, the right side equals the maximum feasible value, contradiction.

**Interpretation:** Competitive markets allocate resources efficiently without central planning. This is the formal basis for the "invisible hand" — but note the strong assumptions required.

### 3.3 Second Fundamental Theorem of Welfare Economics

**Statement:** Under convexity assumptions, any Pareto efficient allocation can be achieved as a Walrasian equilibrium after appropriate lump-sum wealth transfers.

**Significance:** Efficiency and equity can be separated. Markets handle efficiency; redistribution handles equity.

**Practical limitation:** Lump-sum transfers are informationally demanding and rarely feasible.

---

## 4. Market Failures

### 4.1 Externalities

An externality exists when one agent's actions directly affect another's utility or production function, outside the price system.

**Pigouvian tax/subsidy** (Pigou, 1920):

For negative externality with marginal external cost MEC(y):
- Optimal tax: t* = MEC(y*) evaluated at the social optimum
- Induces firm to internalize the externality

*Citation: Pigou, A. C. (1920). The Economics of Welfare. Macmillan.*

**Coase Theorem** (Coase, 1960):

If property rights are well-defined and transaction costs are zero, private bargaining will achieve the efficient outcome regardless of the initial allocation of property rights.

*Citation: Coase, R. H. (1960). The problem of social cost. Journal of Law and Economics, 3, 1-44.*

**Formal statement:** Let v(y) be the polluter's profit from activity level y, and d(y) be the victim's damage. The efficient level y* solves:

```
max v(y) - d(y)  =>  v'(y*) = d'(y*)
```

Under Coase conditions, bargaining reaches y* regardless of who holds the property right. The distribution of surplus differs, but the efficiency outcome is the same.

**Limitations of Coase:** Transaction costs are rarely zero, especially with many parties. Free-rider problems arise with diffuse externalities. This is why Pigouvian solutions and regulation remain important.

### 4.2 Public Goods

A public good is non-rival (one person's consumption doesn't reduce availability) and non-excludable (can't prevent consumption).

**Samuelson condition for efficient provision** (Samuelson, 1954):

```
sum_i MRS_i(public, private) = MRT(public, private)
```

Sum of marginal willingness to pay across all consumers equals marginal cost of production. Contrast with private goods where each individual MRS = MRT.

**Free-rider problem:** Each individual has incentive to understate willingness to pay, leading to underprovision.

*Citation: Samuelson, P. A. (1954). The pure theory of public expenditure. Review of Economics and Statistics, 36(4), 387-389.*

### 4.3 Asymmetric Information

**Adverse selection** (Akerlof, 1970):

In markets with quality uncertainty, only sellers know quality. Buyers offer price reflecting average quality, driving out high-quality sellers. Market unravels.

*Citation: Akerlof, G. A. (1970). The market for "lemons": Quality uncertainty and the market mechanism. Quarterly Journal of Economics, 84(3), 488-500.*

**Formal model:** Sellers have goods of quality q ~ U[0,1]. Seller with quality q values good at q. Buyer values quality q at 3q/2. Efficient to trade all units. But if buyer offers price p, only sellers with q <= p sell. Expected quality given sale = p/2. Buyer's expected value = 3(p/2)/2 = 3p/4 < p. No trade occurs — market failure.

**Solutions:**
- Signaling (Spence, 1973): high-quality agents take costly actions
- Screening (Rothschild & Stiglitz, 1976): uninformed party designs menu of contracts
- Warranties, certifications, reputation mechanisms

**Moral hazard:** After contracting, one party's unobservable actions affect outcomes. See `organizational_economics.md` for formal treatment.

### 4.4 Market Power

When firms have market power (price > marginal cost), the result is allocative inefficiency (deadweight loss).

**Monopoly pricing:**

```
max p(y) * y - c(y)
```

FOC: p(y) + y * p'(y) = c'(y), or equivalently:

```
p(1 - 1/|epsilon|) = MC
```

where |epsilon| is the absolute value of demand elasticity. The **Lerner index** of market power:

```
L = (p - MC) / p = 1 / |epsilon|
```

**Deadweight loss** = area between demand and MC curves, from monopoly quantity to competitive quantity. Harberger (1954) estimated this at roughly 0.1% of GDP; Cowling & Mueller (1978) argued it could be much larger.

**Operator connection:** Understanding market power is essential for pricing strategy (Module 03) and competitive strategy (Module 06). The Lerner index directly quantifies pricing power. Industries with high barriers to entry sustain higher markups, which is why moat analysis matters.

---

## 5. Information Economics

### 5.1 Signaling Theory

*Citation: Spence, M. (1973). Job market signaling. Quarterly Journal of Economics, 87(3), 355-374.*

**Setup:** Workers have productivity type theta in {theta_H, theta_L} with theta_H > theta_L. Firms cannot observe type directly. Workers can acquire education level e at cost c(e, theta), where c is lower for high types: partial c / partial theta < 0.

**Separating equilibrium:** High types choose e* > 0, low types choose e = 0, where:

```
w_H - c(e*, theta_H) >= w_L           (high type prefers signaling)
w_L >= w_H - c(e*, theta_L)           (low type prefers not signaling)
```

These conditions yield e* in [e_L_bar, e_H_bar] where:
- e_L_bar = (w_H - w_L) / c_e(theta_L)  (minimum to deter low type)
- e_H_bar = (w_H - w_L) / c_e(theta_H)  (maximum high type willing to pay)

**Operator connection:** Signaling theory explains why startups burn money on marketing (signaling product quality), why luxury brands maintain high prices (quality signal), and why credentials matter even when the education itself adds no productivity. See Module 07 (marketing) and Module 10 (communication).

### 5.2 Screening and Mechanism Design

**Revelation principle** (Myerson, 1979): Any equilibrium outcome of any mechanism can be replicated by a direct mechanism in which agents truthfully report their types.

This dramatically simplifies mechanism design — we need only consider incentive-compatible direct mechanisms.

**Incentive compatibility (IC):** Each type prefers their own allocation:

```
u(x(theta), theta) - t(theta) >= u(x(theta'), theta) - t(theta')  for all theta, theta'
```

**Individual rationality (IR):** Each type prefers participation:

```
u(x(theta), theta) - t(theta) >= 0  for all theta
```

*Citation: Myerson, R. B. (1979). Incentive compatibility and the bargaining problem. Econometrica, 47(1), 61-73.*

---

## Summary of Key Results

| Result | Statement | Significance |
|--------|-----------|-------------|
| Slutsky equation | Total effect = substitution + income | Demand decomposition |
| First welfare theorem | Equilibrium is Pareto efficient | Case for markets |
| Second welfare theorem | Any efficient outcome achievable | Equity separable from efficiency |
| Coase theorem | Bargaining achieves efficiency | If transaction costs are zero |
| Arrow impossibility | No perfect social choice function | Limits of aggregation |
| Revelation principle | Direct mechanisms suffice | Simplifies mechanism design |

These results form the theoretical backbone of strategic thinking about markets, pricing, competition, and policy.

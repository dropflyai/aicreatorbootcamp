# Formal Game Theory — PhD-Level Treatment

## Overview

This file provides rigorous game-theoretic foundations underlying the MBA Brain's modules on competition (03, 06), negotiation (10), and strategy. It covers normal and extensive form games, equilibrium concepts, mechanism design, and auction theory.

**Key references:**
- Fudenberg, D., & Tirole, J. (1991). *Game Theory*. MIT Press.
- Osborne, M. J., & Rubinstein, A. (1994). *A Course in Game Theory*. MIT Press.
- Myerson, R. B. (1991). *Game Theory: Analysis of Conflict*. Harvard University Press.
- Gibbons, R. (1992). *Game Theory for Applied Economists*. Princeton University Press.

---

## 1. Normal (Strategic) Form Games

### 1.1 Definition

A normal form game G = (N, S, u) consists of:
- **N** = {1, 2, ..., n}: set of players
- **S** = S_1 x S_2 x ... x S_n: set of strategy profiles (S_i is player i's strategy set)
- **u** = (u_1, u_2, ..., u_n): utility functions, u_i: S -> R

### 1.2 Dominance

**Strictly dominated strategy:** Strategy s_i is strictly dominated if there exists s_i' in S_i such that:

```
u_i(s_i', s_{-i}) > u_i(s_i, s_{-i})  for all s_{-i} in S_{-i}
```

A rational player never plays a strictly dominated strategy.

**Iterated elimination of strictly dominated strategies (IESDS):**
Sequentially remove dominated strategies. The order of elimination does not affect the result (Gilboa, Kalai, & Zemel, 1990). If IESDS yields a unique outcome, the game is **dominance solvable**.

**Weakly dominated strategy:** Strategy s_i is weakly dominated if there exists s_i' such that:

```
u_i(s_i', s_{-i}) >= u_i(s_i, s_{-i})  for all s_{-i}
u_i(s_i', s_{-i}) > u_i(s_i, s_{-i})   for some s_{-i}
```

Elimination of weakly dominated strategies is order-dependent and more controversial.

### 1.3 Nash Equilibrium

**Definition** (Nash, 1950): A strategy profile s* = (s_1*, ..., s_n*) is a Nash equilibrium if for every player i:

```
u_i(s_i*, s_{-i}*) >= u_i(s_i, s_{-i}*)  for all s_i in S_i
```

No player can profitably deviate unilaterally.

*Citation: Nash, J. F. (1950). Equilibrium points in n-person games. Proceedings of the National Academy of Sciences, 36(1), 48-49.*

**Existence Theorem** (Nash, 1951):

Every finite game (finite players, finite strategies) has at least one Nash equilibrium in mixed strategies.

**Proof sketch:** Define the best-response correspondence BR_i(s_{-i}) = argmax_{s_i} u_i(s_i, s_{-i}). The joint best-response BR(s) = BR_1(s_{-1}) x ... x BR_n(s_{-n}) maps the compact, convex set of mixed strategy profiles to itself. By Kakutani's fixed-point theorem (BR is upper hemicontinuous, non-empty, convex-valued), a fixed point s* exists. This s* is a Nash equilibrium.

*Citation: Nash, J. F. (1951). Non-cooperative games. Annals of Mathematics, 54(2), 286-295.*

### 1.4 Mixed Strategies

A mixed strategy sigma_i is a probability distribution over S_i. Player i's expected utility under mixed profile sigma:

```
U_i(sigma) = sum_{s in S} [prod_j sigma_j(s_j)] * u_i(s)
```

**Key property:** In a mixed strategy Nash equilibrium, each player is indifferent among all strategies played with positive probability:

```
If sigma_i*(s_i) > 0 and sigma_i*(s_i') > 0, then
U_i(s_i, sigma_{-i}*) = U_i(s_i', sigma_{-i}*)
```

**Interpretation debates:**
- Classical: randomization itself is the strategy
- Harsanyi purification: mixed equilibria approximate pure equilibria in nearby games with private information (Harsanyi, 1973)

### 1.5 Refinements of Nash Equilibrium

Not all Nash equilibria are equally plausible. Refinements eliminate "unreasonable" equilibria.

**Trembling hand perfection** (Selten, 1975): A Nash equilibrium is trembling hand perfect if it is the limit of a sequence of completely mixed strategy profiles (where every strategy is played with some probability).

*Citation: Selten, R. (1975). Reexamination of the perfectness concept for equilibrium points in extensive games. International Journal of Game Theory, 4(1), 25-55.*

**Correlated equilibrium** (Aumann, 1974): A probability distribution over strategy profiles such that, given the signal received, no player wants to deviate. Strictly more general than Nash equilibrium.

*Citation: Aumann, R. J. (1974). Subjectivity and correlation in randomized strategies. Journal of Mathematical Economics, 1(1), 67-96.*

---

## 2. Extensive Form Games

### 2.1 Definition

An extensive form game consists of:
- A game tree (nodes, branches)
- Player assignments at each decision node
- Information sets (grouping nodes a player cannot distinguish)
- Payoffs at terminal nodes
- Probability assignments at nature nodes

### 2.2 Strategies and Behavioral Strategies

A **pure strategy** specifies an action at every information set (including those not reached).

A **behavioral strategy** specifies a probability distribution over actions at each information set.

**Kuhn's Theorem** (Kuhn, 1953): In games of perfect recall, every mixed strategy is payoff-equivalent to a behavioral strategy.

### 2.3 Subgame Perfect Equilibrium (SPE)

**Definition** (Selten, 1965): A strategy profile is a subgame perfect equilibrium if it induces a Nash equilibrium in every subgame.

*Citation: Selten, R. (1965). Spieltheoretische Behandlung eines Oligopolmodells mit Nachfragetragheit. Zeitschrift fur die gesamte Staatswissenschaft, 121, 301-324.*

**Backward induction:** In finite games of perfect information, SPE is found by solving from terminal nodes backward. This eliminates non-credible threats.

**Example — Stackelberg competition:**

Leader (firm 1) chooses quantity q_1. Follower (firm 2) observes q_1, then chooses q_2. Inverse demand: P = a - b(q_1 + q_2). Constant marginal cost c.

Backward induction:
- Firm 2's best response: q_2*(q_1) = (a - c - bq_1) / (2b)
- Firm 1 anticipates this, maximizes: pi_1 = (a - b(q_1 + q_2*(q_1)) - c) * q_1
- Solution: q_1* = (a - c) / (2b), q_2* = (a - c) / (4b)
- Leader produces more, earns higher profit than in Cournot

**Operator connection:** Stackelberg models explain first-mover advantage in capacity commitment. The firm that credibly commits to high output forces competitors into accommodating roles. See Module 06 (competitive strategy).

### 2.4 Sequential Equilibrium

**Definition** (Kreps & Wilson, 1982): A pair (strategy profile, belief system) is a sequential equilibrium if:

1. **Sequential rationality:** At every information set, the strategy is optimal given beliefs and subsequent play
2. **Consistency:** Beliefs are derived from strategies using Bayes' rule wherever possible (and are the limit of beliefs derived from completely mixed strategies)

*Citation: Kreps, D. M., & Wilson, R. (1982). Sequential equilibria. Econometrica, 50(4), 863-894.*

Sequential equilibrium refines SPE for games with imperfect information, handling off-equilibrium-path beliefs.

---

## 3. Bayesian Games (Games of Incomplete Information)

### 3.1 Harsanyi's Framework

*Citation: Harsanyi, J. C. (1967-68). Games with incomplete information played by "Bayesian" players, I-III. Management Science, 14, 159-182, 320-334, 486-502.*

A Bayesian game G = (N, Theta, S, u, p) consists of:
- N: players
- Theta = Theta_1 x ... x Theta_n: type spaces
- S = S_1 x ... x S_n: action spaces
- u_i(s, theta): utility functions
- p(theta): common prior over type profiles

### 3.2 Bayesian Nash Equilibrium (BNE)

A strategy profile sigma* is a BNE if for every player i and type theta_i:

```
E_{theta_{-i}} [u_i(sigma_i*(theta_i), sigma_{-i}*(theta_{-i}), theta) | theta_i]
>= E_{theta_{-i}} [u_i(s_i, sigma_{-i}*(theta_{-i}), theta) | theta_i]
for all s_i in S_i
```

Each type of each player best responds given beliefs about others' types and strategies.

### 3.3 Perfect Bayesian Equilibrium (PBE)

Combines sequential rationality with Bayesian updating:
1. Players have beliefs at each information set
2. Strategies are sequentially rational given beliefs
3. Beliefs are updated using Bayes' rule on the equilibrium path

---

## 4. Signaling Games

### 4.1 Structure

*Citation: Spence, M. (1973). Job market signaling. Quarterly Journal of Economics, 87(3), 355-374.*

Two players: Sender (privately informed) and Receiver.

1. Nature draws Sender's type theta from distribution p(theta)
2. Sender observes theta, chooses message m from M
3. Receiver observes m (not theta), chooses action a from A
4. Payoffs: u_S(theta, m, a) and u_R(theta, m, a)

### 4.2 Equilibrium Types

**Separating equilibrium:** Different types send different messages. The receiver can perfectly infer type from message. Exists when signaling cost varies sufficiently by type.

**Pooling equilibrium:** All types send the same message. The receiver cannot update beliefs beyond the prior. Exists when signaling is too costly or uninformative.

**Semi-separating (partially pooling):** Some types separate, others pool. Or types mix over messages.

### 4.3 The Beer-Quiche Game (Cho & Kreps, 1987)

Illustrates refinements in signaling games. The **Intuitive Criterion** eliminates "unreasonable" pooling equilibria by requiring that off-equilibrium beliefs assign zero probability to types that could never benefit from deviating.

*Citation: Cho, I.-K., & Kreps, D. M. (1987). Signaling games and stable equilibria. Quarterly Journal of Economics, 102(2), 179-221.*

**Operator connection:** Signaling games formalize competitive signaling, brand positioning, and quality communication. When a startup raises a large funding round (costly signal), it signals quality to customers, recruits, and partners. The signal works precisely because low-quality startups could not sustain the costs. See Module 07 (positioning) and Module 12 (fundraising).

---

## 5. Repeated Games

### 5.1 Finitely Repeated Games

**Theorem:** If a finite game G has a unique Nash equilibrium, then the finitely repeated game G^T has a unique SPE: the stage-game NE played every period.

**Implication:** Cooperation cannot be sustained in finitely repeated Prisoner's Dilemma (by backward induction). But this result is fragile — even small amounts of incomplete information can sustain cooperation.

### 5.2 Infinitely Repeated Games and the Folk Theorem

Players discount future payoffs with discount factor delta in (0, 1). The average discounted payoff:

```
V_i = (1 - delta) * sum_{t=0}^{infinity} delta^t * u_i(s^t)
```

**Folk Theorem** (Friedman, 1971; Fudenberg & Maskin, 1986):

If delta is sufficiently large (players are patient enough), any feasible, individually rational payoff vector can be sustained as a Nash equilibrium (or SPE) of the infinitely repeated game.

**Individually rational payoff:** The minimum payoff a player can guarantee, regardless of others' actions:

```
v_i_bar = min_{s_{-i}} max_{s_i} u_i(s_i, s_{-i})
```

**Formally:** For any feasible payoff vector v with v_i > v_i_bar for all i, there exists delta_bar < 1 such that for all delta > delta_bar, v can be sustained as an SPE.

*Citation: Fudenberg, D., & Maskin, E. (1986). The folk theorem in repeated games with discounting or with incomplete information. Econometrica, 54(3), 533-554.*

**Operator connection:** The Folk Theorem explains why repeated interaction sustains cooperation in business. Long-term supplier relationships, tacit price coordination in oligopolies, and reputation effects all rely on the shadow of the future. The higher the discount factor (more patient players), the more cooperation is sustainable. See Module 03 (competition) and Module 10 (negotiation).

### 5.3 Trigger Strategies

**Grim trigger:** Cooperate until opponent defects, then defect forever.

Cooperation is sustainable if:

```
delta >= (temptation - cooperation) / (temptation - punishment)
```

**Tit-for-tat:** Copy opponent's previous action. Forgiving and robust, but not subgame perfect in some formulations.

---

## 6. Mechanism Design

### 6.1 The Design Problem

Mechanism design is "reverse game theory" — given desired outcomes, design the rules of the game.

**Social choice function** f: Theta -> X maps type profiles to outcomes.

**Mechanism** M = (S, g) specifies strategy spaces S_i and an outcome function g: S -> X.

### 6.2 Revelation Principle

**Theorem** (Myerson, 1979; Gibbons, 1973): For any mechanism M and Bayesian Nash equilibrium sigma* of M, there exists a direct mechanism (where S_i = Theta_i) in which truthful reporting is a BNE and yields the same outcomes.

**Implication:** To find optimal mechanisms, we need only search over incentive-compatible direct mechanisms. This massively simplifies the design problem.

### 6.3 Vickrey-Clarke-Groves (VCG) Mechanism

*Citations:*
- *Vickrey, W. (1961). Counterspeculation, auctions, and competitive sealed tenders. Journal of Finance, 16(1), 8-37.*
- *Clarke, E. H. (1971). Multipart pricing of public goods. Public Choice, 11, 17-33.*
- *Groves, T. (1973). Incentives in teams. Econometrica, 41(4), 617-631.*

**Setup:** n agents, type theta_i, social choice must select outcome x to maximize sum_i v_i(x, theta_i).

**VCG mechanism:**
1. Each agent reports type theta_i_hat
2. Outcome: x*(theta_hat) = argmax_x sum_i v_i(x, theta_i_hat)
3. Payment: t_i = -sum_{j != i} v_j(x*(theta_hat), theta_j_hat) + h_i(theta_{-i}_hat)

where h_i is any function independent of agent i's report.

**Incentive compatibility:** Truth-telling is a dominant strategy. Agent i's utility from reporting truthfully:

```
v_i(x*(theta), theta_i) - sum_{j!=i} v_j(x*(theta), theta_j) + h_i(theta_{-i})
= sum_j v_j(x*(theta), theta_j) + h_i(theta_{-i})
```

This is maximized by the true x*(theta), which is chosen when i reports truthfully.

### 6.4 The Gibbard-Satterthwaite Theorem

**Theorem** (Gibbard, 1973; Satterthwaite, 1975): If there are at least 3 outcomes and the social choice function is onto, then it is strategy-proof (truth-telling is dominant) if and only if it is dictatorial.

**Implication:** With unrestricted preferences, no non-dictatorial mechanism makes truth-telling dominant for all agents. This is why mechanism design focuses on restricted domains (quasi-linear preferences, single-peaked preferences).

---

## 7. Auction Theory

### 7.1 The Independent Private Values (IPV) Model

- n bidders, each with private value v_i drawn independently from F on [v_lower, v_upper]
- Seller has one indivisible good
- Common auction formats: first-price sealed-bid, second-price sealed-bid, English (ascending), Dutch (descending)

### 7.2 Revenue Equivalence Theorem

*Citation: Myerson, R. B. (1981). Optimal auction design. Mathematics of Operations Research, 6(1), 58-73.*

**Theorem:** In the symmetric IPV model, any auction mechanism that (a) allocates the good to the highest-value bidder and (b) gives zero expected surplus to the lowest-type bidder yields the same expected revenue.

**Formal statement:** Given symmetric IPV with n bidders, values drawn from F with density f, the expected payment of a bidder with value v in any standard auction is:

```
m(v) = v * G(v) - integral from 0 to v of G(s) ds
```

where G(v) = F(v)^(n-1) is the probability of winning.

**Corollary:** First-price, second-price, English, and Dutch auctions all yield the same expected revenue in the symmetric IPV framework.

### 7.3 Optimal Auction Design (Myerson, 1981)

The revenue-maximizing auction for a single item:

1. Define **virtual valuation:** psi(v) = v - (1 - F(v)) / f(v)
2. Allocate to bidder with highest virtual valuation (if positive)
3. Charge accordingly

If F satisfies the **regularity condition** (psi is monotone increasing), the optimal auction is a second-price auction with reserve price r* where psi(r*) = 0, i.e., r* = v_0 where v_0 - (1 - F(v_0))/f(v_0) = 0.

### 7.4 Common Values and the Winner's Curse

When bidders' values are correlated (common value component), the winner tends to have the most optimistic signal, leading to systematic overbidding.

**Milgrom-Weber linkage principle** (Milgrom & Weber, 1982): In affiliated-values models, the English auction generates weakly more revenue than the second-price sealed-bid, which generates weakly more than the first-price sealed-bid.

*Citation: Milgrom, P. R., & Weber, R. J. (1982). A theory of auctions and competitive bidding. Econometrica, 50(5), 1089-1122.*

**Operator connection:** Auction theory applies to online advertising (ad auctions use generalized second-price mechanisms), procurement, M&A bidding, and spectrum auctions. Understanding the winner's curse prevents overpaying in competitive bidding. The VCG mechanism underlies many platform market designs. See Module 06 (strategy) and Module 12 (fundraising).

---

## 8. Bargaining Theory

### 8.1 Nash Bargaining Solution

*Citation: Nash, J. F. (1950). The bargaining problem. Econometrica, 18(2), 155-162.*

Two players bargain over surplus. Disagreement payoffs: (d_1, d_2). Feasible set: S.

The Nash Bargaining Solution maximizes:

```
max (u_1 - d_1)^alpha * (u_2 - d_2)^(1-alpha)
```

subject to (u_1, u_2) in S.

With equal bargaining power (alpha = 1/2), this splits the surplus equally above the disagreement point.

### 8.2 Rubinstein Bargaining Model

*Citation: Rubinstein, A. (1982). Perfect equilibrium in a bargaining model. Econometrica, 50(1), 97-109.*

Alternating-offers bargaining with discount factors delta_1, delta_2.

**Unique SPE:** Player 1 offers x* = (1 - delta_2) / (1 - delta_1 * delta_2) and player 2 accepts.

**Insights:**
- More patient player gets larger share
- As discount factors approach 1, split approaches 50-50
- Delay is costly, so agreement is immediate

**Operator connection:** The Rubinstein model formalizes why patience is power in negotiation. It also shows that credible outside options (BATNA) increase bargaining power by raising the disagreement payoff. See Module 10 (negotiation).

---

## Summary Table of Key Equilibrium Concepts

| Concept | Requirements | Eliminates |
|---------|-------------|------------|
| Nash Equilibrium | No profitable unilateral deviation | Dominated strategies |
| Subgame Perfect Eq. | Nash in every subgame | Non-credible threats |
| Bayesian Nash Eq. | Best response given beliefs | Inconsistent beliefs |
| Perfect Bayesian Eq. | Sequential rationality + Bayes | Off-path irrationality |
| Sequential Eq. | Consistent beliefs + seq. rationality | Implausible beliefs |
| Trembling Hand Perfect | Robust to small trembles | Weakly dominated strategies |

Each refinement adds requirements, narrowing the set of equilibria and improving predictive power.

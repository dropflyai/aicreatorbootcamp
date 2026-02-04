# Organizational Economics — Formal Foundations

## Overview

This file provides PhD-level organizational economics theory underlying the MBA Brain's modules on leadership and org design (09), operator principles (01), and strategy (06). It covers transaction cost economics, property rights theory, agency theory, and the knowledge-based view of the firm.

**Key references:**
- Williamson, O. E. (1985). *The Economic Institutions of Capitalism*. Free Press.
- Hart, O. (1995). *Firms, Contracts, and Financial Structure*. Oxford University Press.
- Milgrom, P., & Roberts, J. (1992). *Economics, Organization and Management*. Prentice Hall.
- Gibbons, R., & Roberts, J. (Eds.). (2013). *The Handbook of Organizational Economics*. Princeton University Press.

---

## 1. Theory of the Firm: Why Do Firms Exist?

### 1.1 Coase's Foundational Question

*Citation: Coase, R. H. (1937). The nature of the firm. Economica, 4(16), 386-405.*

If markets are efficient allocators, why do firms exist at all? Why not organize all production through market transactions?

**Coase's answer:** Firms exist because market transactions are costly. The costs of using the price mechanism include:
- Discovering relevant prices
- Negotiating and concluding contracts for each transaction
- Specifying and enforcing terms

A firm substitutes a single employment contract (with authority) for a multitude of market contracts. The boundary of the firm is determined by the margin where the cost of organizing one more transaction within the firm equals the cost of organizing it through the market.

### 1.2 The Boundaries of the Firm

The make-or-buy decision (vertical integration vs. market procurement) is the central question of the theory of the firm. Three major theories address it:

1. **Transaction cost economics** (Williamson): Governance structures minimize transaction costs
2. **Property rights theory** (Grossman, Hart, Moore): Ownership allocates residual control rights
3. **Agency theory** (Jensen, Meckling): Contractual relationships with principal-agent structure

---

## 2. Transaction Cost Economics (TCE)

### 2.1 Williamson's Framework

*Citation: Williamson, O. E. (1975). Markets and Hierarchies: Analysis and Antitrust Implications. Free Press.*

*Citation: Williamson, O. E. (1985). The Economic Institutions of Capitalism. Free Press.*

**Behavioral assumptions:**
1. **Bounded rationality** (Simon, 1947): Agents intend to be rational but have limited cognitive capacity. Complete contracts are infeasible.
2. **Opportunism:** Agents may pursue self-interest with guile — strategic manipulation of information, shirking, hold-up.

**Transaction characteristics determining governance:**

**Asset specificity** — the degree to which an asset is specialized to a particular transaction:
- Site specificity (co-location)
- Physical asset specificity (specialized equipment)
- Human asset specificity (specialized knowledge)
- Dedicated assets (investment for a specific customer)
- Brand name capital
- Temporal specificity (time-sensitive transactions)

**Uncertainty** — about the environment, trading partner behavior, or state of the world.

**Frequency** — how often the transaction recurs.

### 2.2 The Fundamental Transformation

Before a contract is signed, there may be many potential suppliers (competitive bidding). After relationship-specific investments are made, the number of effective suppliers falls to one — creating bilateral monopoly. This transforms a competitive market relationship into a bilateral dependency.

**Hold-up problem:** Once specific investments are sunk, the investing party is vulnerable to opportunistic renegotiation by the counterparty. Anticipating this, parties underinvest in relationship-specific assets.

### 2.3 Governance Structures

Williamson identifies three main governance modes:

**Market governance:** For non-specific, infrequent transactions. Price mechanism suffices. Parties can switch to alternatives at low cost.

**Hybrid governance (contracts, alliances, franchises):** For moderately specific assets with moderate frequency. Long-term contracts with safeguards, credible commitments, and dispute resolution mechanisms.

**Hierarchy (vertical integration):** For highly specific assets with high frequency and uncertainty. The firm internalizes the transaction, using fiat (managerial authority) rather than negotiation.

**Discriminating alignment hypothesis:** Transactions are aligned with governance structures in a cost-minimizing way:

```
                    Asset Specificity
                    Low         Medium        High
Frequency
Occasional      Market       Hybrid        Hierarchy
Recurrent       Market       Hybrid        Hierarchy
```

The shift from market to hierarchy occurs as asset specificity increases.

### 2.4 Formal Model of the Make-or-Buy Decision

Let k denote asset specificity, and compare governance costs:

- M(k) = cost of market governance (increasing in k due to hold-up)
- H(k) = cost of hierarchy (relatively constant or slowly increasing in k)

For low k: M(k) < H(k) (markets are cheaper due to scale economies, incentive intensity)
For high k: M(k) > H(k) (hold-up costs dominate market transaction costs)

Switch point k* where M(k*) = H(k*). For k < k*, use market; for k > k*, use hierarchy.

**Operator connection:** TCE directly informs build-vs-buy decisions (Module 13), vertical integration strategy, and alliance design. When your business depends on a supplier's relationship-specific investments, vertical integration or strong contractual safeguards are needed. See Module 06 (strategy) and Module 08 (operations).

---

## 3. Property Rights Theory

### 3.1 Grossman-Hart-Moore (GHM) Framework

*Citation: Grossman, S. J., & Hart, O. D. (1986). The costs and benefits of ownership: A theory of vertical and lateral integration. Journal of Political Economy, 94(4), 691-719.*

*Citation: Hart, O. D., & Moore, J. (1990). Property rights and the nature of the firm. Journal of Political Economy, 98(6), 1119-1158.*

**Key premise:** Contracts are necessarily incomplete — not all contingencies can be specified ex ante (bounded rationality, complexity, unforeseen events).

**Residual control rights:** When contracts are incomplete, whoever owns an asset has the right to make decisions about that asset in uncontracted-for situations.

### 3.2 Formal Model

Two parties (1 and 2) each make relationship-specific investments (e_1, e_2) at cost c_1(e_1), c_2(e_2). These investments are non-contractible.

The total surplus from trade depends on investments and asset ownership:

```
V(e_1, e_2) = total surplus from the relationship
```

Under incomplete contracts, ex post bargaining (Nash bargaining) splits the surplus:

**Party i's payoff:**

```
pi_i = Outside option_i(ownership) + 0.5 * [V(e_1, e_2) - Outside option_1 - Outside option_2]
```

Outside options depend on asset ownership — whoever owns the asset has a better outside option (can use the asset with someone else).

### 3.3 Ownership and Investment Incentives

**Key insight:** Ownership affects outside options, which affects bargaining outcomes, which affects investment incentives.

Give ownership to the party whose investment is more important to the relationship.

**Result:** Integration (one party owns both assets) is optimal when:
- One party's investment is much more important
- The assets are complementary (worth more together)

Non-integration is optimal when:
- Both parties' investments are roughly equally important
- Assets are independent

### 3.4 Costs and Benefits of Integration

**Benefits of integration (Party 1 acquires Party 2):**
- Party 1's investment incentives increase (better outside option)
- Reduced hold-up of Party 1

**Costs of integration:**
- Party 2's investment incentives decrease (worse outside option)
- Party 2 has less reason to invest since they capture less surplus

**Implication:** Integration is not a free lunch. Acquiring a firm may reduce the acquired party's motivation and investment effort — explaining why mergers often destroy value.

**Operator connection:** GHM theory explains why acquiring companies often lose key talent (their investment incentives decline). It also explains why joint ventures sometimes outperform full acquisitions when both parties' contributions are critical. See Module 06 (moats and M&A strategy).

---

## 4. Agency Theory

### 4.1 Jensen-Meckling Framework

*Citation: Jensen, M. C., & Meckling, W. H. (1976). Theory of the firm: Managerial behavior, agency costs and ownership structure. Journal of Financial Economics, 3(4), 305-360.*

**Definition:** An agency relationship exists when one party (the principal) delegates work to another (the agent), and the agent's actions affect the principal's welfare but are not fully observable.

**Agency costs:**
1. **Monitoring costs:** Principal's expenditure to observe/constrain agent
2. **Bonding costs:** Agent's expenditure to guarantee aligned behavior
3. **Residual loss:** Remaining divergence from first-best despite monitoring and bonding

### 4.2 The Moral Hazard Problem (Hidden Action)

*Citation: Holmstrom, B. (1979). Moral hazard and observability. Bell Journal of Economics, 10(1), 74-91.*

**Model setup:**
- Agent chooses effort e in {e_L, e_H} (or continuous)
- Output x = f(e) + epsilon (stochastic, depends on effort and noise)
- Principal observes x but not e
- Agent has reservation utility u_bar (outside option)
- Agent is risk-averse with utility u(w) - c(e), where w is wage and c(e) is effort cost

**First-best (observable effort):**
Maximize total surplus: choose e to maximize E[x] - c(e), then set wage to satisfy participation constraint u(w) - c(e) = u_bar.

**Second-best (unobservable effort):**
Must design wage contract w(x) to satisfy:

**Incentive compatibility (IC):**
```
E[u(w(x)) | e_H] - c(e_H) >= E[u(w(x)) | e_L] - c(e_L)
```

**Participation constraint (PC):**
```
E[u(w(x)) | e_H] - c(e_H) >= u_bar
```

**Key result (Holmstrom, 1979):** The optimal contract balances insurance (flat wage) against incentives (variable pay). The **informativeness principle** states that the contract should depend on any signal informative about effort.

**Sufficient statistic result:** If x is a sufficient statistic for (x, y) with respect to e, then the optimal contract depends only on x. Additional signals that add no information about effort should be excluded.

### 4.3 Holmstrom's Informativeness Principle

*Citation: Holmstrom, B. (1982). Moral hazard in teams. Bell Journal of Economics, 13(2), 324-340.*

The optimal compensation for agent i should depend not only on their own output but on any signal that is informative about their effort:

- **Relative performance evaluation:** Compare agent's output to peers' output. If peers face similar shocks, their output is informative about the common noise, allowing better inference of individual effort.

- **Team production:** When output is jointly produced and individual contributions are unobservable, free-riding is a problem. Holmstrom shows that budget-balanced sharing rules cannot achieve first-best in teams, motivating the role of a "budget breaker" (the firm owner/residual claimant).

### 4.4 Adverse Selection (Hidden Information)

**Screening models:**

*Citation: Rothschild, M., & Stiglitz, J. (1976). Equilibrium in competitive insurance markets: An essay on the economics of imperfect information. Quarterly Journal of Economics, 90(4), 629-649.*

In insurance markets, the insurer (principal) does not know the risk type of the insured (agent).

**Competitive equilibrium (if it exists):** The insurer offers a menu of contracts:
- High-risk types: full insurance at actuarially fair price
- Low-risk types: partial insurance at lower price

The high-risk contract must not attract low-risk types (IC for high-risk) and vice versa (IC for low-risk). The binding constraint is typically on the low-risk types, who receive inefficiently low coverage.

**Nonexistence problem:** Rothschild-Stiglitz showed that a competitive equilibrium may not exist when the proportion of high-risk types is low enough that a pooling contract is more attractive.

### 4.5 Multi-Task Agency

*Citation: Holmstrom, B., & Milgrom, P. (1991). Multitask principal-agent analyses: Incentive contracts, asset ownership, and job design. Journal of Law, Economics, & Organization, 7(Special Issue), 24-52.*

When agents perform multiple tasks, high-powered incentives on one task may cause neglect of others.

**Formal result:** If task 1 is easily measured and task 2 is not, providing strong incentives for task 1 induces substitution away from task 2.

**Implications:**
- Salespeople incentivized purely on volume neglect customer relationships
- Teachers incentivized on test scores teach to the test
- Low-powered incentives (fixed salary) may be optimal when multiple tasks are important and not all are measurable

**Operator connection:** Multi-task agency theory explains why many organizations use balanced scorecards, why equity compensation (which aligns long-term interests) is preferred for executives, and why purely commission-based sales teams often produce poor customer outcomes. See Module 09 (incentives and performance).

---

## 5. Team Production Theory

### 5.1 Alchian-Demsetz Framework

*Citation: Alchian, A. A., & Demsetz, H. (1972). Production, information costs, and economic organization. American Economic Review, 62(5), 777-795.*

**The problem:** In team production, joint output exceeds the sum of individual outputs (synergies), but individual marginal contributions are difficult to measure.

**The firm as a solution:** A central agent (the "monitor") specializes in:
1. Metering individual contributions
2. Adjusting compensation based on observed effort
3. Bearing the residual risk (claiming profits after all contractual payments)

The monitor's incentive to monitor effectively comes from being the residual claimant — they keep whatever surplus remains after paying other team members.

### 5.2 Critique and Extensions

**Limitations:**
- Does not explain authority relationships (why the monitor directs rather than negotiates)
- Assumes separability of monitoring and managing
- Residual claimancy does not always ensure good monitoring (Milgrom & Roberts, 1992)

**Modern extension:** The knowledge-based view argues that the firm's advantage lies in coordinating specialized knowledge that cannot be efficiently transferred through markets.

---

## 6. Knowledge-Based Theory of the Firm

### 6.1 Foundations

*Citation: Grant, R. M. (1996). Toward a knowledge-based theory of the firm. Strategic Management Journal, 17(S2), 109-122.*

*Citation: Kogut, B., & Zander, U. (1992). Knowledge of the firm, combinative capabilities, and the replication of technology. Organization Science, 3(3), 383-397.*

**Core argument:** The firm exists because it is more efficient than markets at integrating and applying specialized knowledge held by many individuals.

**Key concepts:**
- **Tacit knowledge** (Polanyi, 1966): Knowledge that is difficult to articulate, codify, or transfer ("we know more than we can tell")
- **Combinative capability:** The firm's ability to combine and recombine knowledge in novel ways
- **Absorptive capacity** (Cohen & Levinthal, 1990): The ability to recognize, assimilate, and apply new knowledge

### 6.2 Knowledge and Organizational Design

**Rules and directives:** Codified knowledge that enables coordination without full knowledge transfer (e.g., standard operating procedures, checklists)

**Sequencing:** Arranging production so each specialist contributes independently (assembly line logic)

**Routines:** Repeated interaction patterns that encode organizational knowledge (Nelson & Winter, 1982 — evolutionary theory of the firm)

**Group problem-solving:** Face-to-face interaction for non-decomposable problems requiring communication of tacit knowledge

**Operator connection:** The knowledge-based view explains why some firms create more value than others despite similar resources — they are better at integrating specialized knowledge. This underlies organizational design choices (Module 09), explains why culture matters (shared knowledge context), and why remote work poses coordination challenges for knowledge-intensive work.

---

## 7. Incomplete Contracts and the Theory of the Firm

### 7.1 Why Contracts Are Incomplete

Contracts cannot specify all contingencies because:
1. **Bounded rationality:** Parties cannot foresee all possible states of the world
2. **Complexity:** Even foreseeable contingencies may be too complex to describe
3. **Verifiability:** Some information may be observable but not verifiable by courts

### 7.2 Implications

When contracts are incomplete:
- **Renegotiation** occurs when unforeseen events arise
- **Governance structures** matter because they determine who decides in uncontracted situations
- **Relationship-specific investments** are distorted by the prospect of hold-up
- **Ownership** matters because it allocates residual control rights

### 7.3 Formal Contract Theory

*Citation: Bolton, P., & Dewatripont, M. (2005). Contract Theory. MIT Press.*

The optimal contract design problem involves:

```
max E[V(a, theta)]  subject to:
  IC: a in argmax E[u(w(x), a)]     (incentive compatibility)
  PC: E[u(w(x), a)] >= u_bar         (participation)
  LC: w(x) >= 0 for all x            (limited liability)
```

With limited liability, the IC constraint may require "leaving rents" to the agent (paying above reservation utility), creating agency costs even with risk-neutral agents.

---

## 8. Relational Contracts

### 8.1 Theory

*Citation: Baker, G., Gibbons, R., & Murphy, K. J. (2002). Relational contracts and the theory of the firm. Quarterly Journal of Economics, 117(1), 39-84.*

When formal contracts are incomplete, parties may sustain cooperation through **relational contracts** — informal, self-enforcing agreements sustained by the value of the ongoing relationship.

**Self-enforcement condition:** The present value of cooperation must exceed the temptation to renege:

```
(cooperation surplus) / (1 - delta) >= temptation payoff + (punishment cost) / (1 - delta)
```

More patient parties (higher delta) can sustain more relational contracting.

### 8.2 Inside vs. Outside the Firm

Baker, Gibbons, and Murphy show that the scope of relational contracts differs between firms and markets:
- **Within firms:** More relational contracting possible (repeated interaction, shared culture, reputation at stake)
- **Between firms:** Relational contracts supplement formal contracts but are limited by the parties' ability to punish defection

**Operator connection:** Relational contracts explain why organizational culture matters economically — it enables agreements that formal contracts cannot specify. High-trust organizations can sustain complex cooperation that low-trust organizations cannot. This is why culture is a competitive advantage (Module 09) and why long-term supplier relationships outperform transactional ones (Module 08).

---

## Summary of Key Results

| Theory | Key Question | Answer | Key Author |
|--------|-------------|--------|------------|
| Coase | Why do firms exist? | Transaction costs | Coase (1937) |
| TCE | When integrate vs. buy? | Asset specificity drives governance | Williamson (1985) |
| GHM | Who should own assets? | Party with more important investment | Hart (1995) |
| Agency | How to motivate agents? | Optimal contract balances risk and incentives | Holmstrom (1979) |
| Multi-task | Why not just pay for performance? | Distorts effort across tasks | Holmstrom & Milgrom (1991) |
| Team production | Why have a boss? | Need a monitor/residual claimant | Alchian & Demsetz (1972) |
| Knowledge-based | What makes firms valuable? | Knowledge integration capability | Grant (1996) |
| Relational | How do informal agreements work? | Self-enforcing through future value | Baker, Gibbons, Murphy (2002) |

These theories collectively explain when and why firms exist, how they should be structured, who should own what, and how to design incentives. They form the economic foundation for all organizational design and strategy decisions.

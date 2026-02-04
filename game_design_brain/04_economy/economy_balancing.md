# Economy Balancing

## Simulation, Modeling, and Live Tuning of Game Economies

Economy balancing is the quantitative discipline of ensuring game economies function as intended --- that progression feels rewarding, currencies maintain value, and no exploits undermine the system. This module covers the mathematical and analytical tools used to balance game economies.

---

## 1. Economy Simulation Fundamentals

### Why Simulate?

Intuition alone cannot balance a game economy. Even simple economies have emergent properties that are only visible through simulation:
- A 5% difference in drop rate can halve or double time-to-milestone
- Small currency leaks compound over months into hyperinflation
- Edge-case player behaviors (extreme grinding, strategic hoarding) break assumptions

### Simulation Approaches

| Approach | Complexity | Accuracy | Speed | Best For |
|----------|-----------|----------|-------|----------|
| Back-of-envelope | Low | Low | Instant | Initial sanity checks |
| Spreadsheet model | Medium | Medium | Fast | Pre-production design |
| Monte Carlo simulation | High | High | Moderate | Statistical validation |
| Agent-based model | Very high | Very high | Slow | Complex multi-agent economies |
| Live telemetry | N/A | Actual | Real-time | Post-launch tuning |

---

## 2. Spreadsheet Modeling for Game Economies

### The Economy Spreadsheet

Every game economy should have a master spreadsheet model. This is the single source of truth for all economic parameters.

**Core Sheets:**

**1. Income Sheet (Faucets)**
```
Activity          | Currency | Amount/Event | Events/Hour | Income/Hour
─────────────────────────────────────────────────────────────────────
Kill basic enemy  | Gold     | 10           | 60          | 600
Complete quest    | Gold     | 500          | 1           | 500
Daily bonus       | Gold     | 1000         | 0.125       | 125
Sell loot drops   | Gold     | 50           | 20          | 1000
─────────────────────────────────────────────────────────────────────
TOTAL INCOME/HOUR                                         | 2,225
```

**2. Expenditure Sheet (Sinks)**
```
Purchase          | Currency | Cost    | Frequency  | Spend/Hour
─────────────────────────────────────────────────────────────────────
Health potion     | Gold     | 50      | 10/hour    | 500
Weapon upgrade L1 | Gold     | 5,000   | 1/10 hours | 500
Armor piece       | Gold     | 2,000   | 1/5 hours  | 400
Crafting mats     | Gold     | 100     | 3/hour     | 300
─────────────────────────────────────────────────────────────────────
TOTAL SPEND/HOUR                                    | 1,700
```

**3. Progression Sheet**
```
Milestone              | Gold Required | Hours to Earn | Day (3hr/day)
─────────────────────────────────────────────────────────────────────
First weapon upgrade   | 5,000         | 2.2 hours     | Day 1
Full basic gear set    | 20,000        | 9.0 hours     | Day 3
First rare item        | 50,000        | 22.5 hours    | Day 8
Max basic gear         | 200,000       | 90.0 hours    | Day 30
First legendary        | 500,000       | 225 hours     | Day 75
```

### Player Archetype Modeling

Model different player types to ensure the economy works for all:

| Archetype | Play Time/Day | Skill Level | Spending | Focus |
|-----------|--------------|-------------|----------|-------|
| Casual | 15-30 min | Low-medium | $0-5/month | Main quests, daily activities |
| Core | 1-2 hours | Medium-high | $5-20/month | All content, some grinding |
| Hardcore | 3-5 hours | High | $20-100/month | Min-maxing, competitive |
| Whale | 1-3 hours | Variable | $100+/month | Collection, competitive edge |

Each archetype should reach key milestones at designed time points:
- Casual: First meaningful purchase at Day 3, content completion at Day 90
- Core: First meaningful purchase at Day 1, content completion at Day 30
- Hardcore: First meaningful purchase at Day 1, content completion at Day 14

---

## 3. Monte Carlo Simulation for Drop Rates

### What is Monte Carlo Simulation?

Monte Carlo simulation uses random sampling to model probabilistic outcomes. For game economies, it answers questions like:
- "How many gacha pulls until a player gets the legendary item?"
- "What is the probability distribution of gold earned in 100 hours?"
- "How often will a player go 50 kills without a rare drop?"

### Implementation Example: Gacha Pull Simulation

```python
# Pseudo-code for Monte Carlo gacha simulation
LEGENDARY_RATE = 0.01  # 1% per pull
PITY_THRESHOLD = 100   # Guaranteed at 100 pulls
NUM_SIMULATIONS = 100000

results = []
for sim in range(NUM_SIMULATIONS):
    pulls = 0
    while True:
        pulls += 1
        if pulls >= PITY_THRESHOLD:
            break  # Pity system triggers
        if random() < LEGENDARY_RATE:
            break  # Natural drop
    results.append(pulls)

# Analyze results
median_pulls = median(results)      # ~69 pulls
mean_pulls = mean(results)          # ~63 pulls
p90_pulls = percentile(results, 90) # ~90 pulls
p99_pulls = percentile(results, 99) # ~99 pulls
```

### Key Statistical Outputs

| Metric | Purpose | Application |
|--------|---------|-------------|
| Median | "Typical" player experience | Communication, expectation setting |
| Mean | Average across all players | Revenue projection |
| P10 (10th percentile) | Lucky players | Earliest possible milestone |
| P90 (90th percentile) | Unlucky players | Frustration threshold |
| Standard deviation | Variability | Fairness assessment |
| Distribution shape | Overall experience curve | Design validation |

---

## 4. Inflationary Pressures

### Sources of Inflation in Game Economies

**Endogenous Inflation** (from within the game):
- Currency generation outpacing sinks
- Exploits and unintended faucets
- Duplication bugs
- Bot farming

**Exogenous Inflation** (from outside the game):
- Real-money trading (RMT) injecting currency
- Account selling with accumulated wealth
- Cross-server economy imbalances

### Inflation Detection

Monitor these indicators for inflation:
- **Price levels**: Are player-set prices rising over time?
- **Currency velocity**: Is currency being spent as fast as earned?
- **Wealth Gini coefficient**: Is wealth concentrating among top players?
- **Time-to-milestone**: Is reaching key milestones getting faster (devalued currency)?
- **Transaction volume**: Is trade activity declining (players hoarding)?

### Anti-Inflation Interventions

| Intervention | Mechanism | Risk |
|-------------|-----------|------|
| New sink introduction | Create new desirable purchases | May feel forced |
| Currency tax increase | Higher transaction fees | Reduces trading activity |
| Price adjustment | Increase NPC shop prices | Feels like punishment |
| Currency split | Divide all currency by 10 | Confusing, feels like loss |
| New currency | Introduce replacement currency | Devalues old currency holders |
| Seasonal reset | Wipe currency periodically | Acceptable in some genres |

---

## 5. Currency Exchange Rates In-Game

### Internal Exchange Rate Design

When multiple currencies exist, exchange rates define their relative value:

```
100 Gold = 1 Gem (soft-to-hard conversion, if allowed)
1 Gem = $0.01 USD (real-money peg)
Therefore: 100 Gold ≈ $0.01 of real-money value
```

### Exchange Rate Management

**Fixed rate**: Designer-set, immovable.
- Simple, predictable
- May not reflect actual player-perceived value
- Can create arbitrage if misaligned

**Market-based rate**: Determined by supply and demand (player trading).
- Reflects actual value
- Complex to implement and monitor
- Susceptible to manipulation by wealthy players

**Managed float**: Designer-set range with player influence.
- Balance of control and organic pricing
- Requires monitoring and occasional intervention

---

## 6. Pay-to-Win Detection

### Defining Pay-to-Win

Pay-to-win (P2W) exists on a spectrum:

```
Cosmetic Only ◄────────────────────────────────────► Pure P2W

No gameplay    Convenience    Acceleration    Power     Win
advantage      (QoL)         (time-skip)     advantage  button
```

### P2W Detection Metrics

| Metric | Measurement | P2W Threshold |
|--------|------------|---------------|
| Win rate by spend | Correlation between spending and win rate | r > 0.3 = concerning |
| Power gap | Statistical power difference: payer vs non-payer | >10% = concerning |
| Progression speed ratio | Time to milestone: payer vs non-payer | >3x faster = concerning |
| Competitive rank by spend | Correlation between spend and rank | Significant correlation = P2W |
| Content access | % of content locked behind payment | >20% = problematic |

### P2W Mitigation Strategies

1. **Skill-dominant design**: Player skill matters more than equipment/stats
2. **Matchmaking**: Match players by power level, not just skill
3. **Catch-up mechanics**: Free players can eventually reach payer power levels
4. **Separate queues**: Separate competitive and casual/spending modes
5. **Cosmetic monetization**: Revenue from appearance, not power

---

## 7. Economy Health Metrics

### Key Performance Indicators for Economy Health

| KPI | Healthy Range | Warning Sign |
|-----|--------------|--------------|
| Currency in circulation | Stable or slow growth | Exponential growth |
| Average player balance | Consistent across months | Steadily increasing |
| Sink/faucet ratio | 0.8-1.0 | Below 0.5 or above 1.2 |
| Transaction volume | Stable or growing | Declining |
| Wealth Gini coefficient | 0.3-0.6 | Above 0.8 (extreme inequality) |
| Time to key milestone | Matching design targets | Diverging from targets |
| Currency conversion rate | Stable | Rapid fluctuation |
| Exploit reports | Low, declining | Increasing |

### Economy Health Dashboard

Real-time monitoring should include:
- Currency supply graph (total soft/hard currency in existence)
- Transaction volume graph (daily buy/sell/trade activity)
- Price index (weighted average of key item prices)
- Player wealth distribution (histogram/Lorenz curve)
- Milestone achievement rate (% of cohort reaching milestones on schedule)
- Anomaly alerts (statistical outliers in earning/spending)

---

## 8. Live Economy Tuning

### When to Intervene

Intervene in the live economy when:
- Metrics deviate significantly from design targets
- Player sentiment indicates frustration (forums, reviews, support tickets)
- Exploits are discovered and being leveraged
- New content invalidates existing economic assumptions
- Competitive balance is compromised by economic factors

### Tuning Parameters

**Safe to adjust (low player impact):**
- Enemy drop rates (within 10-20% of original)
- NPC shop inventory
- New sink/faucet introduction
- Event reward values
- Crafting recipe adjustments

**Risky to adjust (high player impact):**
- Currency exchange rates
- Previously purchased item values
- Progression speed (faster ok, slower causes backlash)
- Gacha/loot box rates
- Removal of earning opportunities

### Communication of Economy Changes

**Always communicate:**
- Why the change is being made
- What specifically is changing
- When the change takes effect
- How existing progress/purchases are affected

**Never surprise players with:**
- Reduced rewards for existing activities
- Changed rates on items already purchased
- Retroactive nerfs to earned items
- Hidden economy changes (stealth nerfs)

---

## 9. Data-Informed vs Data-Driven Design

### The Distinction

**Data-informed**: Data provides context for design decisions made by humans.
- "Our data shows D7 retention drops at level 12. Let's investigate why and design a solution."

**Data-driven**: Data directly determines design decisions.
- "A/B test shows variant B increases ARPDAU by 3%. Ship variant B."

### The Risk of Pure Data-Driven Economy Design

- Optimizes for measurable metrics (revenue) at expense of unmeasurable ones (trust, fun)
- Short-term metric improvements can damage long-term health
- A/B testing can converge on exploitative equilibria
- Player sentiment is poorly captured by quantitative metrics alone

### Best Practice: Data-Informed with Ethical Guardrails

Use data to understand player behavior, then apply design judgment and ethical principles to make decisions. Never let an algorithm optimize monetization without human oversight.

---

## 10. Summary

Economy balancing is an ongoing discipline that begins with spreadsheet modeling in pre-production and continues with live telemetry for the life of the game. The goal is an economy that feels fair, rewarding, and sustainable --- where every transaction creates value for the player and the game's long-term health.

---

*Game Design Brain | Module 04 | Economy*
*DropFly OS --- PhD-Level Game Design Knowledge System*

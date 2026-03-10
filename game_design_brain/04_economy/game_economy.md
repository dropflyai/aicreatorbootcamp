# Game Economy Design

## Virtual Economies: Currency, Flow, and Equilibrium

Game economy design is the discipline of creating, balancing, and maintaining virtual economic systems. A well-designed game economy creates meaningful player choices, drives engagement, and supports monetization without destroying gameplay integrity.

---

## 1. Virtual Economy Fundamentals

### What is a Game Economy?

A game economy is the system of resources, currencies, items, and transactions that governs the flow of value within a game. It encompasses everything players earn, spend, trade, and lose.

**Key Distinction**: Game economies differ from real economies in that designers control all variables --- supply, demand, drop rates, prices, and exchange rates. This god-like control is both a superpower and a responsibility.

### Economy Design Goals

1. **Meaningful choices**: Players must make trade-off decisions (spend now vs save, this item vs that item)
2. **Progression motivation**: Earning and spending create forward momentum
3. **Fair play**: Free players must have a viable path; paying players gain convenience, not dominance
4. **Long-term sustainability**: The economy must function for months/years without hyperinflation
5. **Monetization support**: The economy creates natural opportunities for revenue

---

## 2. Currency Systems

### Currency Architecture

Most modern games use a multi-currency system:

**Soft Currency** (earnable through gameplay):
- Primary reward for core gameplay activities
- Abundant but not unlimited
- Used for basic purchases (consumables, common items, basic upgrades)
- Examples: Gold, coins, credits, silver

**Hard Currency** (premium, purchased with real money):
- Primary monetization vehicle
- Scarce; small amounts earnable through gameplay (engagement incentive)
- Used for premium purchases (cosmetics, convenience, acceleration)
- Examples: Gems, diamonds, crystals, V-Bucks

**Tertiary Currencies** (specialized):
- Event-specific currencies (limited-time earning and spending)
- Social currencies (guild tokens, friendship points)
- Prestige currencies (earned through high-end activities)
- Seasonal currencies (reset each season)

### Currency Design Parameters

| Parameter | Soft Currency | Hard Currency |
|-----------|--------------|---------------|
| Earn rate | High (constant stream) | Low (milestones, rare drops) |
| Spend rate | High (frequent purchases) | Low (considered purchases) |
| Display | Large numbers (feels abundant) | Small numbers (feels precious) |
| Inflation risk | High (must design sinks) | Low (real-money peg) |
| Conversion | Soft -> Hard: typically impossible | Hard -> Soft: typically possible |

### The Real-Money Exchange Rate

Hard currency must be priced to feel consistent:

```
Typical pricing structure:
$0.99  = 100 gems    (worst value - impulse buy)
$4.99  = 550 gems    (10% bonus)
$9.99  = 1200 gems   (20% bonus)
$19.99 = 2600 gems   (30% bonus)
$49.99 = 7000 gems   (40% bonus)
$99.99 = 15000 gems  (50% bonus - best value)
```

**Design principle**: Bulk purchases offer better value per dollar, incentivizing larger purchases. The $9.99-$19.99 tier typically represents the most purchased denomination.

---

## 3. Sinks and Faucets Model

### The Bathtub Analogy

```
     FAUCETS (Sources)
         │ │ │
         ▼ ▼ ▼
    ┌───────────────┐
    │               │  ← Target: Stable water level
    │  PLAYER       │
    │  WALLET       │
    │               │
    └───┬───┬───┬───┘
        │   │   │
        ▼   ▼   ▼
     SINKS (Drains)
```

If faucets exceed sinks: inflation (currency loses value, prices escalate)
If sinks exceed faucets: deflation (players feel unable to afford anything)
If balanced: healthy economy (currency maintains meaningful value)

### Common Faucets

| Faucet | Description | Flow Rate |
|--------|-------------|-----------|
| Quest rewards | Currency for completing objectives | Moderate, predictable |
| Enemy drops | Currency from defeating enemies | Low per drop, high volume |
| Daily bonuses | Currency for daily engagement | Fixed, predictable |
| Achievement rewards | One-time currency payouts | Burst, non-recurring |
| Sell items | Convert items to currency | Variable, player-controlled |
| Real-money purchase | Buy currency directly | External input |

### Common Sinks

| Sink | Description | Drain Rate |
|------|-------------|------------|
| Item purchases | Buy items from shops | Variable, player-controlled |
| Upgrade costs | Improve items/characters | Escalating with level |
| Repair/maintenance | Keep equipment functional | Recurring |
| Transaction taxes | Fee on trades/sales | Percentage of transactions |
| Consumables | One-time use items | Recurring |
| Gacha/loot boxes | Random item purchases | High for engaged players |
| Crafting costs | Materials consumed in crafting | Variable |
| Cosmetics | Non-functional visual items | Premium, aspirational |

---

## 4. Inflation Control

### Inflation Dynamics in Game Economies

Game economies are inherently inflationary because:
- Faucets are always on (players always earn currency)
- Item creation is infinite (unlike real-world production)
- Currency creation has zero marginal cost
- Older players accumulate wealth faster than new sinks can drain

### Inflation Control Mechanisms

**Escalating costs**: Each level of upgrade costs more than the previous.
```
Level 1 upgrade: 100 gold
Level 2 upgrade: 250 gold
Level 3 upgrade: 500 gold
Level 4 upgrade: 1,000 gold
Level 5 upgrade: 2,500 gold
(Exponential scaling absorbs accumulated wealth)
```

**Consumables**: Items that are destroyed on use (health potions, buffs, crafting materials). Every consumable used is currency permanently removed from circulation.

**Repair and maintenance**: Recurring costs that drain currency proportional to activity level.

**Transaction taxes**: A percentage fee on every player-to-player trade (5-15%). This creates a passive sink proportional to economic activity.

**Seasonal resets**: Periodically reset certain currencies, forcing re-accumulation and preventing terminal hoarding.

**Prestige systems**: Allow players to "reset" progress for permanent bonuses, restarting their economic journey.

---

## 5. Value Chains

### Value Chain Architecture

A value chain traces how raw inputs become valuable outputs:

```
Raw Materials → Processed Materials → Components → Final Product
(Mining ore)    (Smelting bars)       (Crafting parts) (Legendary sword)
```

**Design purpose of value chains:**
- Create meaningful intermediate goals (not just "get gold, buy thing")
- Distribute economic activity across game activities
- Create trade opportunities between players with different specializations
- Add depth to the economy without adding currency complexity

### Value Chain Balancing

Each step in the chain should:
- Require meaningful player effort or decision
- Add value (output worth more than inputs)
- Have alternative uses (ore can make sword OR shield)
- Be balanced against direct purchase alternatives

---

## 6. Drop Tables and Probability

### Drop Table Design

Drop tables define what rewards a player receives from an activity (enemy kill, chest open, gacha pull):

```
Common item:     60% probability
Uncommon item:   25% probability
Rare item:       10% probability
Epic item:        4% probability
Legendary item:   1% probability
```

### Probability Design Considerations

**Pity systems**: Guarantee a rare drop after N unsuccessful attempts.
```
Standard probability: 1% per pull
Pity timer: Guaranteed legendary at 100 pulls
Soft pity: Probability increases after 75 pulls (1% → 5% → 10% → ...)
```

**Duplicate protection**: Reduce or eliminate duplicate drops of items already owned.

**Weighted random**: Not purely random; weights shift based on player state.
- New players get better drops (hook them)
- Returning players get better drops (re-engage them)
- Players near quitting get better drops (retain them)

**Transparent vs opaque**: Some jurisdictions require published drop rates (China, Japan, Belgium). Best practice: publish all probabilities regardless of legal requirement.

---

## 7. Loot Boxes and Gacha

### Gacha Mechanics

Gacha (from Japanese "gachapon" capsule machines) is the dominant monetization mechanic in mobile games:

**Standard Gacha**: Random pull from a pool. Each pull is independent.
**Step-up Gacha**: Escalating cost per pull with guaranteed reward at milestones.
**Pity Gacha**: Guaranteed high-rarity at threshold (see pity systems above).
**Spark System**: Earn currency per pull; exchange accumulated currency for specific item.

### Legal Landscape

| Jurisdiction | Regulation |
|-------------|-----------|
| Belgium | Loot boxes illegal (classified as gambling) |
| Netherlands | Loot boxes regulated (tradeable items = gambling) |
| China | Must publish drop rates; spending limits for minors |
| Japan | Complete gacha banned (requiring all pieces of a set); rates must be published |
| South Korea | Must publish drop rates |
| USA | No federal regulation; FTC oversight; state-level proposals |
| EU | Under investigation; potential unified regulation |
| UK | Parliamentary investigation completed; age verification proposed |

### Ethical Gacha Design

- Publish all probabilities transparently
- Implement pity/spark systems (guaranteed outcomes)
- Never make gacha items required for progression
- Provide alternative earning paths for all gacha items
- Implement spending warnings and limits
- Restrict access for verified minors

---

## 8. Battle Pass Design

### Battle Pass Economics

The battle pass is both an engagement system and an economy:

**Revenue model:**
- Pass price: $8-15 per season (8-12 weeks)
- Premium currency included: Typically 100-150% of pass price
- Effective revenue: Pass purchases + increased engagement driving additional spending

**Economy integration:**
- Battle pass XP earned through gameplay (connects to core loop)
- Premium currency rewards create a self-funding cycle
- Exclusive cosmetics create aspiration and FOMO
- Free track keeps non-payers engaged (potential future converters)

---

## 9. Seasonal Economy Resets

### Why Reset Economies?

Long-running games face inevitable economic bloat. Seasonal resets address:
- Currency inflation (too much currency in circulation)
- Power creep (items become trivially powerful)
- New player disadvantage (impossible to catch up to veterans)
- Content relevance (old content becomes irrelevant)

### Reset Mechanisms

| Reset Type | What Resets | What Persists | Example |
|-----------|------------|---------------|---------|
| Currency reset | Seasonal currencies | Premium currency, account items | Seasonal event shops |
| Power reset | Gear score, level cap | Account unlocks, cosmetics | Destiny 2 seasons |
| Rank reset | Competitive rank | Seasonal rewards, MMR seed | League of Legends seasons |
| Full reset | Everything | Meta-progression, unlocks | Roguelike runs |

---

## 10. Economy Balancing Tools and Simulation

### Spreadsheet Modeling

Every game economy should be modeled in a spreadsheet before implementation:

**Key Model Components:**
- Currency income per activity per hour
- Currency expenditure per upgrade tier
- Time to key milestones (first purchase, max level, first rare item)
- Player archetype modeling (casual, core, whale)
- Sensitivity analysis (what if drop rates change?)

### Monte Carlo Simulation

Run thousands of simulated player progressions to identify:
- Expected time to milestones (median, 10th percentile, 90th percentile)
- Probability of extreme outcomes (lucky/unlucky streaks)
- Economy equilibrium points
- Inflation trajectories over months/years

### Live Economy Monitoring

Post-launch, continuously monitor:
- Currency in circulation (total supply)
- Transaction volume (economic activity)
- Price levels (are items getting cheaper/more expensive?)
- Wealth distribution (Gini coefficient of player wealth)
- Conversion rate (free -> paying player rate)
- ARPDAU (Average Revenue Per Daily Active User)

---

## References

- Castronova, E. (2005). "Synthetic Worlds: The Business and Culture of Online Games"
- Fields, T. (2014). "Mobile & Social Game Design: Monetization Methods and Mechanics"
- Luton, W. (2013). "Free-to-Play: Making Money From Games You Give Away"

---

*Game Design Brain | Module 04 | Economy*
*DropFly OS --- PhD-Level Game Design Knowledge System*

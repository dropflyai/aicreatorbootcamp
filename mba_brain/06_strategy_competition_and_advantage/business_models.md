# Business Model Theory and Patterns

## What This Enables

**Decisions it helps make:**
- Which business model fits this market and value proposition?
- How do platform business models differ from traditional models?
- What are the economics of subscription, marketplace, and transactional models?

---

## 1. Business Model Canvas

*Citation: Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation. Wiley.*

### 1.1 The Nine Building Blocks

```
Key Partners | Key Activities | Value Propositions | Customer      | Customer
             | Key Resources  |                    | Relationships | Segments
─────────────┼────────────────┼────────────────────┼───────────────┼──────────
             | Cost Structure                      | Revenue Streams              |
```

| Block | Defines | Key Question |
|-------|---------|-------------|
| Customer Segments | Who we create value for | Who are our most important customers? |
| Value Propositions | What value we deliver | What problem do we solve? What need do we satisfy? |
| Channels | How we reach customers | How do customers learn about and purchase our offering? |
| Customer Relationships | How we interact | What type of relationship does each segment expect? |
| Revenue Streams | How we capture value | What are customers willing to pay for? How do they pay? |
| Key Resources | What we need | What assets are essential to make the model work? |
| Key Activities | What we do | What activities does our value proposition require? |
| Key Partners | Who helps us | What activities and resources do we outsource? |
| Cost Structure | What it costs | What are the most important costs in our model? |

### 1.2 Business Model Patterns

**Freemium:** Free basic tier + paid premium tier. Economics depend on free-to-paid conversion rate (typically 2-5% for consumer, 5-15% for B2B).

**Razor and blade:** Sell the platform at low margin, monetize consumables at high margin. (Printers/ink, gaming consoles/games, Nespresso machines/pods.)

**Subscription:** Recurring revenue from ongoing access. Key metrics: MRR, churn, NRR, LTV.

**Marketplace:** Connect buyers and sellers, take a percentage of transactions. Key metrics: GMV, take rate, liquidity.

**Advertising:** Provide free content/service, sell user attention to advertisers. Key metrics: MAU, DAU, ARPU, engagement time.

---

## 2. Platform Business Models

*Citation: Parker, G. G., Van Alstyne, M. W., & Choudary, S. P. (2016). Platform Revolution. W. W. Norton.*

### 2.1 Platform vs. Pipeline

| Dimension | Pipeline (Traditional) | Platform |
|-----------|----------------------|----------|
| Value creation | Linear (make and sell) | Facilitated exchange |
| Key asset | Products, supply chain | Network, data, community |
| Scaling mechanism | Investment in production | Network effects |
| Cost structure | Variable costs dominate | Fixed costs + marginal cost near zero |
| Competitive advantage | Supply-side economies of scale | Demand-side economies of scale |

### 2.2 Multi-Sided Platform Economics

*Citation: Rochet, J.-C., & Tirole, J. (2003). Platform competition in two-sided markets. Journal of the European Economic Association, 1(4), 990-1029.*

Key insight: The platform must balance pricing across sides. The optimal price structure depends on:
- Price elasticity of each side
- Cross-side network effects (how much each side values the other)
- Marginal cost of serving each side

**Result:** It may be optimal to subsidize one side (even serving them at zero or negative price) to attract the other, more profitable side.

**Examples:**
- Google: Free search for users, charges advertisers
- Uber: Subsidizes riders during expansion, charges drivers a commission
- Credit cards: Rewards to cardholders, charges to merchants

### 2.3 Marketplace Economics

**Liquidity:** Sufficient supply and demand for efficient matching. The key challenge for early-stage marketplaces.

**Take rate:** Percentage of GMV retained as revenue.

```
Revenue = GMV x Take Rate
```

Typical take rates:
- Low (1-5%): Financial marketplaces, real estate
- Medium (5-15%): E-commerce, services
- High (15-30%): Ride-sharing, food delivery, managed marketplaces

**Matching efficiency:** How well the marketplace pairs supply and demand. Better matching = more value = higher willingness to pay.

### 2.4 Chicken-and-Egg Problem

Multi-sided platforms face a bootstrapping challenge: each side needs the other to create value.

**Solutions:**
1. **Single-player mode:** Provide value to one side without the other (OpenTable offered restaurant management software)
2. **Subsidize one side:** Pay early supply or demand to participate
3. **Seed supply:** Create initial supply yourself (e.g., Amazon selling its own inventory)
4. **Constrain geography:** Launch in one market to achieve density
5. **Sequencing:** Attract one side first, then use it to attract the other

---

## 3. Subscription Economics

### 3.1 Core Metrics

```
Annual value of a subscriber = ARPA x Gross Margin
Lifetime value = Annual Value / Annual Churn Rate
Payback period = CAC / (ARPA x Gross Margin / 12)
```

### 3.2 The Subscription Value Waterfall

```
Starting ARR
+ New ARR (new customers)
+ Expansion ARR (upsell, cross-sell)
- Contraction ARR (downgrades)
- Churned ARR (cancellations)
= Ending ARR
```

Net Revenue Retention = (Starting - Contraction - Churn + Expansion) / Starting

### 3.3 Subscription Compounding

The power of subscription models: cohort value compounds when NRR > 100%.

```
Year 1: $100K ARR from 2024 cohort
Year 2: $100K x 1.15 (115% NRR) = $115K from 2024 cohort + new 2025 cohort
Year 3: $115K x 1.15 = $132K from 2024 cohort + expanded 2025 cohort + new 2026 cohort
```

Each cohort grows independently if NRR > 100%, creating compounding revenue even without new customer acquisition.

---

## 4. Business Model Innovation

### 4.1 Unbundling and Rebundling

Markets cycle between bundled and unbundled solutions:

1. **Bundled:** Incumbent offers comprehensive package (newspaper = news + classifieds + entertainment)
2. **Unbundled:** Startups pick off individual components with better solutions (Craigslist = classifieds; ESPN.com = sports)
3. **Rebundled:** New platform combines best-of-breed unbundled solutions (Apple News+)

### 4.2 Business Model Fit

The right business model depends on:

| Factor | Implication |
|--------|------------|
| Customer willingness to pay | Subscription vs. advertising vs. transactional |
| Usage frequency | High frequency -> subscription/advertising; low frequency -> transactional |
| Value of aggregation | Multi-sided -> platform; single-sided -> pipeline |
| Network effects potential | Strong -> platform; weak -> pipeline |
| Marginal cost of serving | Near-zero -> freemium viable; significant -> paid only |

---

## Key Citations

- Osterwalder, A., & Pigneur, Y. (2010). *Business Model Generation*. Wiley.
- Parker, G. G., Van Alstyne, M. W., & Choudary, S. P. (2016). *Platform Revolution*. W. W. Norton.
- Rochet, J.-C., & Tirole, J. (2003). Platform competition in two-sided markets. *Journal of the European Economic Association*, 1(4), 990-1029.
- Zott, C., Amit, R., & Massa, L. (2011). The business model: Recent developments and future research. *Journal of Management*, 37(4), 1019-1042.

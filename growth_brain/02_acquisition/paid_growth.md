# Paid Growth -- Performance Marketing and Unit Economics

## Paid Growth as a Lever

Paid acquisition is the most direct growth lever: spend money, acquire users.
Its appeal is immediacy and controllability. Its danger is that it is linear,
not compounding, and creates channel dependency if over-indexed.

Brian Balfour's rule: "Paid acquisition should accelerate growth, not create
it. If you turn off paid and growth stops, you do not have a business; you
have an arbitrage."

### When Paid Growth Works

Paid growth is appropriate when:
1. Unit economics are positive (LTV:CAC > 3:1)
2. Payback period is acceptable (< 12 months for SaaS, < 6 for consumer)
3. The channel has not saturated for your targeting
4. Organic growth exists as a baseline (paid is additive, not substitutive)
5. You can attribute and measure accurately

### When Paid Growth is Dangerous

Paid growth is dangerous when:
1. You are subsidizing growth to hit vanity metrics
2. You cannot measure incremental impact (organic cannibalization)
3. Marginal CAC is rising faster than LTV
4. >70% of acquisition comes from paid channels
5. Turning off spend would cause >50% decline in new users

---

## Unit Economics Framework

### The Fundamental Equation

```
Unit Profit = LTV - CAC - COGS per Customer

Where:
  LTV = Lifetime Value of a customer
  CAC = Cost to Acquire that customer (fully loaded)
  COGS = Cost of Goods Sold per customer (hosting, support, etc.)
```

For a channel to be viable: Unit Profit > 0, or equivalently LTV:CAC > 1.
For a channel to be healthy: LTV:CAC > 3:1 (accounts for overhead and risk).

### LTV Calculation Methods

**Method 1: Simple (steady-state)**
```
LTV = ARPU x Gross Margin / Monthly Churn Rate
```
Example: $50 ARPU x 80% margin / 5% churn = $800

**Method 2: Cohort-based (accurate)**
```
LTV = SUM(t=0 to T) of [Retention(t) x ARPU(t) x Gross Margin] / (1+d)^t
```
Uses actual retention curves and accounts for ARPU changes over time.

**Method 3: Revenue cohort analysis (most accurate)**
Plot actual cumulative revenue per customer by cohort. The curve's asymptote
is the observed LTV. Requires 12-24 months of data.

### CAC Calculation

**Channel-specific CAC:**
```
CAC_channel = (Ad Spend + Creative Costs + Tool Costs + Team Salary Allocation)
              / Customers Acquired via Channel
```

**Blended CAC:**
```
CAC_blended = Total Sales & Marketing Spend / Total New Customers
```

Always report channel-specific, not blended. Blended CAC masks unprofitable
channels behind organic acquisition.

### Payback Period

```
Payback Period (months) = CAC / (Monthly ARPU x Gross Margin)
```

Benchmarks:
- Consumer subscription: < 6 months
- SMB SaaS: < 12 months
- Mid-market SaaS: < 18 months
- Enterprise SaaS: < 24 months

Payback period determines cash flow requirements. Longer payback = more
working capital needed to fund growth.

---

## Performance Marketing Channels

### Paid Search (Google Ads, Bing Ads)

**How it works**: Bid on keywords users search for. Pay per click (CPC).
**Best for**: Products with high search intent.
**Key metrics**: CPC, CTR, Conversion Rate, Quality Score.

Optimization levers:
1. **Keyword selection**: Focus on high-intent, specific keywords
2. **Quality Score**: Improve ad relevance, landing page experience
3. **Bid strategy**: Start manual, transition to automated (tROAS, tCPA)
4. **Negative keywords**: Exclude irrelevant searches to reduce waste
5. **Landing page optimization**: Match ad promise to page experience

```
Paid Search Funnel:
Impressions → Clicks → Visits → Signups → Activations → Paying Customers

Target metrics (B2B SaaS):
  CTR: 3-5%
  Visit-to-Signup: 2-5%
  Signup-to-Activation: 30-50%
  Activation-to-Paid: 10-20%
```

### Paid Social (Meta, LinkedIn, TikTok)

**How it works**: Target users by demographics, interests, behaviors, lookalikes.
**Best for**: Products that can demonstrate value visually or emotionally.
**Key metrics**: CPM, CPC, CTR, Conversion Rate, ROAS.

Platform selection:
| Platform | Best For | Typical CPC | Audience |
|----------|----------|-------------|----------|
| Meta (FB/IG) | B2C, visual products | $0.50-$3 | Broad consumer |
| LinkedIn | B2B, professional tools | $5-$15 | Business professionals |
| TikTok | Gen Z, entertainment | $0.20-$1 | Younger demographics |
| Twitter/X | Tech, developer tools | $1-$5 | Tech-savvy |
| Reddit | Niche communities | $0.50-$3 | Interest-based |

### Retargeting

Re-engage users who visited but did not convert:
```
Retargeting Funnel:
  Site Visitor → Cookie/Pixel → Retargeting Ad → Return Visit → Conversion

Retargeting tiers:
  Tier 1: Visited pricing page (highest intent) → Aggressive bid
  Tier 2: Visited product page → Moderate bid
  Tier 3: Visited blog/content → Low bid, nurture messaging
  Tier 4: Visited homepage only → Minimal bid
```

Retargeting typically converts at 2-5x the rate of prospecting campaigns
at 30-70% lower CPC. However, incrementality is lower (many would have
returned organically).

---

## Attribution Models

### The Attribution Problem

A user's journey involves multiple touchpoints:
```
Google Ad → Blog Post → Email → Direct Visit → Signup
```

Which touchpoint gets credit for the conversion?

### Attribution Model Comparison

| Model | How it Works | Best For | Limitation |
|-------|-------------|----------|------------|
| Last Touch | 100% credit to last interaction | Channel optimization | Ignores discovery |
| First Touch | 100% credit to first interaction | Channel discovery | Ignores nurture |
| Linear | Equal credit to all touchpoints | General understanding | Over-credits assists |
| Time Decay | More credit to recent touches | Short sales cycles | Arbitrary decay rate |
| Position-Based | 40% first, 40% last, 20% middle | Balanced view | Arbitrary weights |
| Data-Driven | ML determines credit allocation | Large-scale campaigns | Requires volume |

### Practical Attribution Approach

For most growth teams:
1. **Decision metric**: Last-touch (simple, actionable for channel optimization)
2. **Strategic metric**: First-touch (understand what channels bring new users)
3. **Validation**: Incrementality tests quarterly for top channels
4. **Advanced**: Multi-touch if >$1M monthly ad spend and sufficient data

---

## LTV:CAC Optimization

### Lever 1: Reduce CAC

```
CAC = Spend / Conversions = Spend / (Clicks x Conversion Rate)
     = CPC / Conversion Rate

To reduce CAC:
  - Lower CPC: Better targeting, higher quality score, bid optimization
  - Higher conversion rate: Better landing pages, offers, messaging
  - Better audiences: Lookalike modeling, exclusion of low-value segments
```

### Lever 2: Increase LTV

```
LTV = ARPU x Lifetime

To increase LTV:
  - Increase ARPU: Upsells, cross-sells, pricing optimization
  - Increase Lifetime: Reduce churn through retention optimization
  - Increase both: Product improvements that increase value and stickiness
```

### Lever 3: Improve the Ratio

The relationship between LTV and CAC over the customer lifecycle:

```
Revenue
    │         LTV
    │    ╱─────────────────
    │   ╱
    │  ╱
    │ ╱
    │╱
    ├───────── Break-even point (payback period)
    │
    │  CAC (upfront cost)
    └──────────────────────── Time
```

Three strategies:
1. **Front-load value**: Increase early ARPU to shorten payback
2. **Reduce time-to-value**: Faster activation means faster revenue
3. **Segment channels by LTV**: Some channels produce higher-LTV customers

---

## Paid Growth Scaling Playbook

### Phase 1: Validate (Budget: $1K-$5K/month)

- Test 2-3 channels with minimum viable budgets
- Focus on one audience segment per channel
- Measure CAC, activation rate, and early retention signal
- Do not optimize for volume; optimize for signal

### Phase 2: Optimize (Budget: $5K-$50K/month)

- Focus on the winning channel from Phase 1
- Expand targeting (new audiences, new keywords, lookalikes)
- Test creative variations systematically
- Build landing page testing pipeline
- Implement conversion tracking and attribution

### Phase 3: Scale (Budget: $50K-$500K/month)

- Increase budget on proven campaigns (no more than 20% per week)
- Launch second channel using learnings from first
- Implement automated bidding strategies
- Build creative production pipeline (refresh every 2-4 weeks)
- Monitor marginal CAC weekly for saturation signals

### Phase 4: Diversify (Budget: $500K+/month)

- 3+ channels operating profitably
- Incrementality testing for all channels
- Dedicated creative team per channel
- Cross-channel audience management
- LTV-based bidding (bid more for higher-value segments)

---

## Creative Testing Framework

### The Creative Hierarchy

In paid social, creative is the #1 performance lever:

```
Impact on Performance:
  Creative: 50-70% of performance variance
  Targeting: 20-30%
  Bidding: 10-20%
```

### Structured Creative Testing

```
Level 1: Concept Testing
  - Test fundamentally different value propositions
  - Example: "Save time" vs "Save money" vs "Reduce stress"
  - 3-5 concepts, run for 1 week

Level 2: Format Testing
  - Test different media formats for the winning concept
  - Example: Video vs static image vs carousel vs UGC
  - 3-4 formats, run for 1 week

Level 3: Element Testing
  - Test specific elements within the winning format
  - Example: Headline variations, CTA variations, color
  - 2-3 variations per element, run for 1 week

Level 4: Iteration
  - Combine winning elements and produce variations
  - Refresh every 2-4 weeks to combat fatigue
```

### Creative Fatigue Detection

Monitor frequency (average times a user sees the ad). When:
- Frequency > 3: CTR begins to decline
- Frequency > 5: CTR declines significantly, CPC rises
- Frequency > 7: Actively damaging brand (user irritation)

Refresh triggers: CTR declines >20% from peak, or frequency > 4.

---

## Budget Allocation Model

### Portfolio Optimization

Allocate budget across channels to maximize total conversions subject
to CAC constraint:

```
Maximize: SUM(Conversions_i) for all channels i
Subject to: CAC_i <= Target CAC for all channels i
            SUM(Spend_i) <= Total Budget
            Spend_i >= Minimum Viable Spend for active channels
```

### Marginal Allocation

At any point, the next dollar should go to the channel with the lowest
marginal CAC:

```
Optimal allocation: Marginal CAC is equal across all active channels

If Marginal CAC(channel A) < Marginal CAC(channel B):
  Shift budget from B to A until marginal CACs equalize
```

This is the theoretical optimum. In practice, rebalance weekly based on
trailing 7-day marginal CAC by channel.

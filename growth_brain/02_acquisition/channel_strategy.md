# Channel Strategy -- Systematic Acquisition Planning

## Channel-Model Fit (Brian Balfour)

### The Core Principle

Not every acquisition channel works for every business. The channel must be
compatible with the product's delivery mechanism and the business model's
unit economics. This alignment is what Balfour calls Channel-Model Fit.

```
Channel-Model Fit Matrix:

                     Low ACV           Medium ACV         High ACV
                     (<$100/yr)        ($100-$10K/yr)     (>$10K/yr)
                   ┌─────────────────┬──────────────────┬─────────────────┐
Viral/WoM          │ ✓ PRIMARY       │ ✓ SECONDARY      │ ✗ Unlikely      │
                   ├─────────────────┼──────────────────┼─────────────────┤
SEO/Content        │ ✓ PRIMARY       │ ✓ PRIMARY        │ ✓ SECONDARY     │
                   ├─────────────────┼──────────────────┼─────────────────┤
Paid Social        │ ✓ (if LTV ok)   │ ✓ PRIMARY        │ ✗ Inefficient   │
                   ├─────────────────┼──────────────────┼─────────────────┤
Paid Search        │ ✓ (if intent)   │ ✓ PRIMARY        │ ✓ SECONDARY     │
                   ├─────────────────┼──────────────────┼─────────────────┤
Inside Sales       │ ✗ Uneconomic    │ ✓ PRIMARY        │ ✓ SECONDARY     │
                   ├─────────────────┼──────────────────┼─────────────────┤
Field Sales        │ ✗ Uneconomic    │ ✗ Marginal       │ ✓ PRIMARY       │
                   ├─────────────────┼──────────────────┼─────────────────┤
Partnerships       │ ✓ (distribution)│ ✓ PRIMARY        │ ✓ PRIMARY       │
                   └─────────────────┴──────────────────┴─────────────────┘
```

### Product-Channel Fit

Separate from model economics, the product itself must be distributable
through the channel. Casey Winters identifies these natural fits:

| Product Characteristic | Natural Channel |
|----------------------|-----------------|
| Multiplayer/collaborative | Viral (built-in sharing) |
| Creates shareable content | Content/SEO + Social |
| High search intent | SEO/SEM |
| Visual/demonstrable | Social/Video/Influencer |
| Complex/enterprise | Sales + Content |
| Platform/integration | Partnerships/Marketplace |
| Commoditized | Aggregators/Comparison |

Products that try to force-fit channels waste resources. A solo productivity
tool cannot rely on viral loops. An enterprise security product cannot rely
on Instagram ads.

---

## Channel Evaluation Framework

### The Bullseye Framework (Gabriel Weinberg, Traction)

Step 1: **Brainstorm** -- List all possible channels (19 traction channels)
Step 2: **Rank** -- Score each channel on channel-model fit, estimated CAC,
         scalability, and time to test
Step 3: **Test** -- Run cheap tests on top 3 channels (inner ring)
Step 4: **Focus** -- Double down on the channel that performs best
Step 5: **Expand** -- Once primary channel is optimized, test next channels

### The 19 Traction Channels (Weinberg & Mares)

1. Viral Marketing
2. PR / Public Relations
3. Unconventional PR (stunts, provocations)
4. SEM / Search Engine Marketing
5. SEO / Search Engine Optimization
6. Social Ads (Facebook, Instagram, LinkedIn, TikTok)
7. Display Advertising
8. Offline Advertising (TV, radio, print)
9. Content Marketing
10. Email Marketing
11. Engineering as Marketing (free tools)
12. Targeting Blogs / Influencers
13. Business Development / Partnerships
14. Sales
15. Affiliate Programs
16. Existing Platforms (app stores, marketplaces)
17. Trade Shows / Events
18. Offline Events / Meetups
19. Community Building

### Channel Scoring Rubric

For each candidate channel, score 1-5 on:

| Dimension | 1 (Worst) | 5 (Best) |
|-----------|-----------|----------|
| Estimated CAC | >3x target | <0.5x target |
| Scalability | Small ceiling | Near-unlimited scale |
| Time to test | >3 months | <1 week |
| Channel-model fit | Fundamental misfit | Natural alignment |
| Competitive density | Saturated | Untapped |
| Measurability | Cannot attribute | Clear attribution |

Minimum threshold: average score >= 3.0 to warrant testing.

---

## Channel Saturation and the Decay Curve

### Understanding Saturation

Every channel follows a sigmoid adoption curve followed by diminishing returns:

```
Performance
    │
    │            ╭───────── Plateau (saturated)
    │          ╱
    │        ╱   ← Growth phase (scale here)
    │      ╱
    │    ╱
    │  ╱ ← Discovery phase (test here)
    │╱
    └────────────────────────── Time/Spend
```

### Marginal CAC Analysis

As channel spend increases, marginal CAC increases:

```
Marginal CAC = d(Total Spend) / d(New Customers)

Optimal spend: Where Marginal CAC = Marginal LTV x Target ROI
```

Track marginal CAC weekly. When it exceeds LTV/3, the channel is approaching
saturation for the current targeting and creative.

### Andrew Chen's Law of Shitty Clickthroughs

Channels degrade over three dimensions simultaneously:
1. **Audience fatigue**: The same people see the same ads repeatedly
2. **Competitive entry**: More advertisers drive up auction prices
3. **Platform changes**: Algorithm updates shift organic distribution

The only defense is continuous creative refresh, audience expansion, and
channel diversification.

---

## Channel Diversification Strategy

### The 70/20/10 Portfolio

- **70%**: Core channel (proven, optimized, reliable)
- **20%**: Growth channels (validated, being scaled)
- **10%**: Experimental channels (testing for future potential)

### Diversification Triggers

Diversify when:
1. Primary channel's marginal CAC exceeds target by >30%
2. >60% of new customers come from one channel
3. Channel has policy risk (algorithm change, TOS change)
4. Growth rate from primary channel is decelerating

### Channel Dependency Risk Assessment

```
Risk Score = Channel Concentration x Platform Control x Substitutability

Where:
  Channel Concentration = % of total acquisition from this channel
  Platform Control = 1-5 (1=you own it, 5=third party controls)
  Substitutability = 1-5 (1=easily replaced, 5=irreplaceable)
```

High-risk channels (score >50): require immediate diversification plan.

---

## Channel Testing Protocol

### Minimum Viable Test (MVT)

Before committing resources to a channel, run a minimum viable test:

```
Test Parameters:
  Budget: $500-$2,000 (or 2 weeks of effort for organic channels)
  Duration: 2-4 weeks
  Success metric: Cost per qualified signup (not total signups)
  Sample size: Minimum 100 conversions for statistical validity
  Kill criteria: If CAC > 3x target after 50% of budget, stop
```

### Test Evaluation Criteria

| Metric | Pass | Monitor | Fail |
|--------|------|---------|------|
| CAC vs target | <1.5x | 1.5-2.5x | >2.5x |
| Activation rate | >70% of organic | 50-70% of organic | <50% of organic |
| Payback period | <12 months | 12-18 months | >18 months |
| Scalability signal | Clear path to 10x | Possible but uncertain | Ceiling visible |

A channel that passes all four criteria moves to the 20% growth allocation.
A channel that fails any criterion is paused and re-evaluated quarterly.

---

## Channel-Specific CAC Calculation

### Fully Loaded CAC

```
Fully Loaded CAC = (Direct Spend + Tools + Salary + Overhead) / New Customers

Where:
  Direct Spend = ad spend, content production, event costs
  Tools = attribution software, design tools, analytics
  Salary = pro-rated salary of team members working on channel
  Overhead = office, management, etc. (allocated proportionally)
```

### Blended vs Channel-Specific

Blended CAC is misleading because it mixes organic (free) with paid (costly).
Always calculate and report channel-specific CAC.

```
Channel CAC = Channel-Specific Costs / Customers Attributed to Channel
```

Attribution models:
- **Last touch**: Credit to the last interaction before conversion
- **First touch**: Credit to the first interaction that brought the user
- **Linear**: Equal credit to all touchpoints
- **Time decay**: More credit to recent touchpoints
- **Data-driven**: ML-based attribution using all available data

No model is perfect. Use last-touch for channel optimization and first-touch
for channel discovery analysis.

---

## Channel Playbook by Stage

### Pre-PMF (0 to 100 users)

Do not invest in channels. Focus on:
- Direct outreach (email, DM, phone)
- Personal network
- Communities where target users gather
- Manual, unscalable things (Paul Graham: "Do things that don't scale")

Goal: Get 10-20 users who love the product.

### Early Traction (100 to 1,000 users)

Test 2-3 channels with minimum viable tests:
- Content marketing (blog, SEO) -- starts slow, compounds
- Community participation (Reddit, forums, Slack groups)
- One paid channel (Google Ads if high intent, social ads if visual)

Goal: Find one channel that delivers CAC < LTV/3.

### Growth Stage (1,000 to 100,000 users)

Optimize primary channel, begin diversification:
- Scale primary channel to saturation point
- Build organic growth engine (SEO, content, community)
- Test partnerships and integrations
- Invest in viral/referral mechanics

Goal: Achieve 70/20/10 portfolio with primary channel optimized.

### Scale Stage (100,000+ users)

Full channel portfolio management:
- Multiple channels at scale
- Dedicated teams per channel
- Sophisticated attribution and incrementality testing
- International expansion of proven channels

Goal: Maintain growth rate as base increases.

---

## Incrementality Testing

### Why Incrementality Matters

Attribution tells you which channel touched the user.
Incrementality tells you whether the channel actually caused the conversion.

Many paid conversions would have happened organically. The true value of a
channel is only the incremental conversions it produces.

### Incrementality Test Design

```
1. Define the channel/campaign to test
2. Create a treatment group (exposed to the channel) and holdout (not exposed)
3. Run for sufficient duration (2-4 weeks)
4. Measure conversion in both groups
5. Incremental lift = Treatment conversion rate - Holdout conversion rate
6. Incremental CAC = Channel spend / (Incremental conversions)
```

Incremental CAC is always higher than attributed CAC. If incremental CAC
exceeds LTV/3, the channel is destroying value despite appearing profitable
on attributed metrics.

### When to Run Incrementality Tests

- Before scaling any channel beyond $50K/month spend
- When organic growth is strong (high risk of paid cannibalizing organic)
- Annually for all mature channels
- After any major channel change (new creative, new targeting)

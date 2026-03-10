# Growth Theory -- Foundational Frameworks

## Growth Loops vs Growth Funnels

### The Funnel Model (Legacy)

Dave McClure's AARRR framework (2007) introduced the pirate metrics funnel:
Awareness -> Acquisition -> Activation -> Revenue -> Retention -> Referral.
This model served as an essential teaching tool but contains a fundamental flaw:
it is linear. Users flow in one direction, and each stage "leaks."

The funnel model leads to siloed thinking:
- Marketing owns the top of funnel
- Product owns the middle
- Sales or monetization owns the bottom
- No one owns the feedback loop

The funnel model also implies growth is a one-time journey. A user enters,
progresses, and either converts or drops off. There is no mechanism for
output to feed back as input.

### The Loop Model (Modern)

Brian Balfour and Casey Winters (Reforge, 2018) formalized the growth loop
model. A growth loop has three components:

1. **Input**: A new user, piece of content, or data point enters the system
2. **Action**: The system processes the input (user takes action, content is created)
3. **Output**: The action produces a result that feeds back as a new input

```
    ┌──────────────────────────────────────┐
    │                                      │
    ▼                                      │
  INPUT ──→ ACTION ──→ OUTPUT ──→ REINVEST─┘
```

The critical distinction: loops compound. If each cycle produces more output
than input, growth accelerates. If each cycle produces less, growth decelerates
but still persists. Only when the loop breaks (output = 0) does growth stop.

### Loop Examples by Type

**Content Loop** (HubSpot model):
User creates content -> Content indexed by Google -> Searcher discovers content
-> Searcher becomes user -> User creates more content.
Compounding factor: Each new piece of content attracts traffic indefinitely.

**Viral Loop** (Facebook model):
User signs up -> User invites friends -> Friends sign up -> Friends invite
their friends.
Compounding factor: Each new user is both consumer and distributor.

**Paid Loop** (Subscription model):
Company spends on ads -> Ads acquire customers -> Customers generate revenue
-> Revenue is reinvested in more ads.
Compounding factor: Only compounds if LTV > CAC with surplus for reinvestment.

**Data Loop** (Netflix model):
Users consume content -> Usage generates preference data -> Data improves
recommendations -> Better recommendations increase engagement -> More users join.
Compounding factor: Data asset grows with usage.

---

## Sustainable vs Unsustainable Growth

### Defining Sustainability

Growth is sustainable when the system can maintain or accelerate its growth
rate without proportional increases in external input. Growth is unsustainable
when maintaining the growth rate requires ever-increasing external input
(typically money).

### The Sustainability Test

Ask three questions:
1. If we stopped all paid acquisition today, would we still grow? (Organic baseline)
2. Is our retention curve flattening or declining to zero? (Retention health)
3. Does each new cohort perform as well as the previous one? (Cohort quality)

If all three answers are negative, growth is unsustainable regardless of
current growth rate.

### Chamath Palihapitiya's Framework

Chamath's growth framework at Facebook distinguished between:
- **Core growth**: Improving the product experience to drive organic engagement
- **Strategic growth**: Building systems that generate compounding returns
- **Tactical growth**: Short-term campaigns and promotions

Sustainable growth comes from core and strategic. Unsustainable growth relies
primarily on tactical. A healthy growth portfolio allocates:
- 60% core (product improvements, retention)
- 30% strategic (loops, network effects)
- 10% tactical (campaigns, promotions)

### Andrew Chen's Law of Shitty Clickthroughs

Every channel degrades over time. Banner ads once had 78% CTR (1994). Today
they average 0.05%. Every new channel follows this pattern:
1. **Innovation phase**: Early adopters achieve exceptional results
2. **Adoption phase**: More players enter, performance is good
3. **Saturation phase**: The channel is crowded, performance degrades
4. **Equilibrium phase**: Returns are marginal for most participants

Implication: Companies that depend on a single channel are building on
quicksand. Sustainable growth requires multiple loops and channels.

---

## Growth Accounting

### The Growth Accounting Equation

Chamath Palihapitiya formalized growth accounting at Facebook:

```
Active Users(t) = Active Users(t-1) + New + Resurrected - Churned
```

Where:
- **New**: Users who were never active before and became active this period
- **Resurrected**: Users who were previously active, became inactive, and
  returned this period
- **Churned**: Users who were active last period and became inactive this period
- **Retained**: Users active last period who remain active (implicit in the equation)

### Quick Ratio

The growth accounting quick ratio measures growth health:

```
Quick Ratio = (New + Resurrected) / Churned
```

Interpretation:
- QR > 4: Very healthy growth (strong retention)
- QR 2-4: Healthy growth (normal for scaling companies)
- QR 1-2: Struggling (acquisition barely outpaces churn)
- QR < 1: Shrinking (losing more users than gaining)

### Why Growth Accounting Matters

Consider two companies:
- Company A: 10,000 new users/month, 8,000 churned, QR = 1.25
- Company B: 3,000 new users/month, 500 churned, QR = 6.0

Company A appears to be growing faster (net +2,000/month) but is deeply
unhealthy. If acquisition slows even slightly, growth reverses. Company B
is growing slower (net +2,500/month) but is building a durable base.

Growth accounting reveals the composition of growth, not just the rate.

---

## The Four Fits Framework (Brian Balfour)

### Framework Overview

Most companies fail not because of a single broken element but because of
misalignment between elements. Balfour's four fits framework maps the
critical alignments:

```
Market ←→ Product ←→ Channel ←→ Model
  ↑                                ↑
  └────────────────────────────────┘
```

### Fit 1: Market-Product Fit

Does the product solve a real problem for a real market?
- Market: Who are the users? How many exist? How do they behave?
- Product: What does it do? What value does it deliver?
- Fit test: Sean Ellis PMF survey (>40% "very disappointed" if gone)

### Fit 2: Product-Channel Fit

Does the product's nature align with scalable distribution channels?
- Products with built-in sharing (Dropbox, Figma) fit viral channels
- Products with high search intent (tax software, CRM) fit SEO/SEM channels
- Products requiring education fit content channels
- Products with high ACV fit sales channels

Misfit example: Trying to grow enterprise software through viral loops.

### Fit 3: Channel-Model Fit

Does the channel's economics support the business model?
- High CAC channels (field sales, events) require high ACV models
- Low CAC channels (viral, SEO) are necessary for low ACV models
- The channel cost must be recoverable within the payback period

```
Channel Cost Matrix:
                    Low ACV (<$100/yr)    High ACV (>$10K/yr)
Low CAC channels:   ✓ FITS              ✓ (bonus margin)
High CAC channels:  ✗ MISFIT            ✓ FITS
```

### Fit 4: Model-Market Fit

Does the business model work for the market's characteristics?
- Consumer markets: need freemium or low price points
- SMB markets: need self-serve or low-touch sales
- Enterprise markets: need high-touch sales, custom pricing
- Marketplace: need to solve chicken-and-egg for both sides

### Applying the Four Fits

When growth stalls, diagnose which fit is broken:
1. If users sign up but do not retain: Market-Product Fit issue
2. If the product is loved but does not spread: Product-Channel Fit issue
3. If acquisition is expensive and unprofitable: Channel-Model Fit issue
4. If the market will not pay enough: Model-Market Fit issue

Fix fits in order (1 -> 2 -> 3 -> 4). Downstream fits cannot compensate
for upstream misalignment.

---

## Growth Stages

### Stage 1: Traction (Pre-PMF to Early PMF)
- Goal: Find product-market fit
- Metrics: Retention rate, Sean Ellis survey, qualitative feedback
- Strategy: Talk to users, iterate fast, measure retention
- Anti-pattern: Spending on acquisition before retention is proven

### Stage 2: Transition (Early PMF to Growth Mode)
- Goal: Find one scalable channel
- Metrics: Activation rate, channel-specific CAC, payback period
- Strategy: Test 2-3 channels, find one that works, double down
- Anti-pattern: Trying to optimize all channels simultaneously

### Stage 3: Growth (Scaling)
- Goal: Maximize growth rate through the primary loop
- Metrics: Growth rate, LTV:CAC, experiment velocity
- Strategy: Optimize the primary loop, build secondary loops
- Anti-pattern: Premature diversification before primary loop is optimized

### Stage 4: Scale (Market Leadership)
- Goal: Maintain growth rate as base grows (the law of large numbers)
- Metrics: Net revenue retention, TAM penetration, new market growth
- Strategy: Multiple loops, adjacent markets, platform strategy
- Anti-pattern: Defending legacy growth mechanics instead of evolving

---

## Foundational Growth Math

### Compound Growth

```
Users(t) = Users(0) x (1 + g)^t
```

Where g = growth rate per period, t = number of periods.

At 10% monthly growth: 12-month multiplier = 1.10^12 = 3.14x
At 20% monthly growth: 12-month multiplier = 1.20^12 = 8.92x

Small differences in growth rate produce massive differences over time.
This is why optimizing growth rate is the highest-leverage activity.

### The Rule of 72

Time to double = 72 / growth rate (as percentage).
At 10% monthly growth: doubles in 7.2 months.
At 5% monthly growth: doubles in 14.4 months.

### Growth Rate Benchmarks (Lenny Rachitsky)

Consumer apps (monthly):
- Good: 10-15%
- Great: 15-25%
- Exceptional: >25%

SaaS (monthly MRR growth):
- Good: 10-15%
- Great: 15-20%
- Exceptional: >20%

Marketplace (monthly GMV growth):
- Good: 15-20%
- Great: 20-30%
- Exceptional: >30%

These benchmarks apply post-PMF. Pre-PMF, the only metric is retention.

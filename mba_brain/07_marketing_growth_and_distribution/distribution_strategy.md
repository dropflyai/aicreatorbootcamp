# Distribution Strategy — Channels, Economics, and Go-to-Market

## What This Enables

**Decisions it helps make:**
- Which distribution channels are appropriate for our product and market?
- What are the unit economics of each channel?
- Should we pursue PLG, sales-led, or hybrid GTM?

---

## 1. Distribution as Strategy

### 1.1 Thiel's Distribution Thesis

*Citation: Thiel, P. (2014). Zero to One. Crown Business.*

"Most businesses actually get zero distribution channels to work. Poor distribution — not product — is the number one cause of failure. If you can get even a single distribution channel to work, you have a great business. If you try for several but don't nail one, you're finished."

### 1.2 Distribution Channel Mapping

| Channel | Best For | CAC Range | Time to Scale |
|---------|----------|-----------|---------------|
| Viral/word-of-mouth | Consumer, PLG SaaS | Very low ($0-10) | Months to years |
| SEO/Content marketing | Information products, SaaS | Low-moderate ($20-100) | 6-18 months |
| Paid search (SEM) | High-intent demand capture | Moderate ($50-200) | Weeks |
| Paid social | Consumer, B2B awareness | Moderate ($30-150) | Weeks |
| Inside sales | SMB/mid-market SaaS | High ($200-2K) | Months |
| Field sales | Enterprise | Very high ($5K-50K+) | Months to years |
| Channel partners | Geographic expansion, enterprise | Variable | 6-18 months |
| Community | Developer tools, niche markets | Low ($10-50) | 6-24 months |
| PR/media | Launch awareness, credibility | Variable | Event-driven |

### 1.3 Channel-Product-Market Fit

The right channel depends on:

```
Customer LTV determines channel economics:
  LTV < $100    -> Self-serve, viral, content (low-touch)
  LTV $100-$1K  -> Inside sales, PLG with sales assist
  LTV $1K-$25K  -> Inside sales, channel partners
  LTV $25K+     -> Field sales, strategic partnerships
```

---

## 2. CAC Payback by Channel

### 2.1 Calculation

```
CAC by channel = Total channel spend / Customers acquired via channel
Payback (months) = CAC / (Monthly ARPU x Gross Margin)
```

### 2.2 Channel Maturity Curve

Most channels follow a maturity curve:

```
Phase 1: Discovery
  - Low competition, high ROI
  - Small absolute volume

Phase 2: Growth
  - Increasing volume and efficiency
  - More competitors entering

Phase 3: Maturity
  - High competition, rising costs
  - Optimization matters more

Phase 4: Decline
  - Channel saturated, diminishing returns
  - CAC exceeds viable thresholds
```

### 2.3 Channel Diversification

Relying on a single channel creates existential risk:
- Algorithm changes (Google, Facebook, Apple ATT)
- Cost inflation from competition
- Platform policy changes
- Channel saturation

**Rule:** No single channel should represent >60% of acquisition. Target 2-3 channels at scale.

---

## 3. Go-to-Market Models

### 3.1 Product-Led Growth (PLG)

**Definition:** The product itself is the primary driver of customer acquisition, activation, expansion, and retention.

**Characteristics:**
- Free trial or freemium entry point
- Self-service onboarding
- Usage-based expansion
- Product virality drives distribution
- Bottom-up adoption within organizations

**Economics:**
- Low CAC (users self-serve)
- High volume, lower ACV
- Expansion revenue critical (land-and-expand)

**Benchmarks:**
- Free-to-paid conversion: 2-5% (consumer), 5-15% (B2B)
- Time to value: minutes to hours (not days)
- Self-serve revenue: >50% of total revenue

**Examples:** Slack, Zoom, Dropbox, Figma, Notion, Canva

### 3.2 Sales-Led Growth (SLG)

**Definition:** Human sales teams are the primary driver of customer acquisition.

**Characteristics:**
- Demos and proof-of-concepts
- Negotiated contracts
- Top-down sales (executive sponsors)
- Longer sales cycles
- Higher ACV

**Economics:**
- Higher CAC (sales team costs)
- Lower volume, higher ACV
- Enterprise-grade support and onboarding

**When to use SLG:**
- Complex products requiring explanation
- High ACV justifies sales investment
- Buyers need organizational buy-in
- Regulated industries requiring trust-building

**Examples:** Salesforce, Palantir, ServiceNow, Workday

### 3.3 Hybrid Model

**Definition:** Combines PLG self-serve motion with sales-assisted expansion.

**Pattern:**
1. **Land (PLG):** Individual or team adopts free/low-cost version
2. **Qualify (Product signals):** Usage data identifies expansion opportunities
3. **Expand (Sales):** Sales team engages qualified accounts for enterprise deals

**Product-Qualified Leads (PQLs):**

```
PQL criteria = Usage thresholds + Firmographic fit + Behavioral signals

Example: User from a company with >500 employees,
         who has created 3+ projects,
         invited 5+ teammates,
         and used the product 10+ days in the last 30 days.
```

PQLs convert at 5-10x the rate of Marketing Qualified Leads (MQLs).

**Examples:** Atlassian, Datadog, HubSpot (freemium + sales)

---

## 4. Content Marketing Economics

### 4.1 Content as Distribution

Content marketing creates discoverable assets that attract customers over time:

```
Content Asset Value = (Monthly Organic Traffic x Conversion Rate x LTV) - Production Cost
```

**Compound returns:** Unlike paid advertising (which stops when spend stops), content compounds — each article continues to attract traffic indefinitely.

### 4.2 SEO Economics

```
Organic CAC = Total Content Investment / Organic Customers Acquired
```

Organic CAC is typically calculated over longer time horizons (6-18 months) because content takes time to rank.

**Break-even analysis:**

```
Break-even point = Total Content Investment / (Monthly Organic Signups x Conversion Rate x LTV)
```

### 4.3 Content Moat

Over time, a large corpus of high-quality content creates:
- Organic traffic moat (compound growth, difficult to replicate quickly)
- Brand authority (perceived expertise)
- Backlink profile (hard to replicate)
- Data on customer intent (what they search for)

---

## 5. Paid Acquisition Unit Economics

### 5.1 Paid Channel Profitability

```
Channel Profit = (Customers Acquired x LTV) - Total Channel Spend - Attribution Overhead

Profitable if: LTV > CAC (and the margin is sufficient to cover operations)
```

### 5.2 Attribution Challenges

In practice, customers interact with multiple channels before converting. Attribution models attempt to assign credit:

| Model | Logic | Bias |
|-------|-------|------|
| Last-touch | All credit to last interaction | Favors bottom-funnel (search, retargeting) |
| First-touch | All credit to first interaction | Favors top-funnel (awareness) |
| Linear | Equal credit to all touchpoints | Dilutes signal |
| Time-decay | More credit to recent touchpoints | Moderate bottom-funnel bias |
| Data-driven | ML-based attribution | Requires significant data; often a black box |

### 5.3 Incrementality Testing

The gold standard for measuring channel effectiveness is incrementality testing:

**Method:** Randomly assign users to treatment (exposed to ads) and control (not exposed). Measure the difference in conversion rates.

```
Incremental Conversions = Conversions(Treatment) - Conversions(Control)
Incremental CAC = Total Spend / Incremental Conversions
```

This often reveals that many paid conversions would have happened organically (especially branded search).

---

## 6. Distribution Strategy Selection

### 6.1 Decision Framework

```
1. What is the customer LTV?
   -> Determines affordable CAC
   -> Determines viable channels

2. How does the customer discover solutions?
   -> Search (SEM/SEO)
   -> Peer recommendation (viral/community)
   -> Sales outreach (outbound)
   -> Industry events (field sales)

3. How does the customer evaluate?
   -> Self-service trial (PLG)
   -> Demo/POC (inside sales)
   -> RFP process (field sales)

4. What is the decision-making unit?
   -> Individual (PLG)
   -> Team/department (PLG + sales assist)
   -> C-suite/committee (enterprise sales)
```

### 6.2 Channel Sequencing

Most companies don't launch all channels simultaneously:

```
Phase 1 (0-$1M ARR): 1 core channel + founder-led sales
Phase 2 ($1M-$5M ARR): 2-3 channels, beginning to scale
Phase 3 ($5M-$25M ARR): 3-5 channels, dedicated teams per channel
Phase 4 ($25M+ ARR): Full channel portfolio, optimization focus
```

---

## Key Citations

- Chen, A. (2021). *The Cold Start Problem*. Harper Business.
- Halligan, B., & Shah, D. (2014). *Inbound Marketing* (Revised ed.). Wiley.
- Thiel, P. (2014). *Zero to One*. Crown Business.
- Weinberg, G., & Mares, J. (2015). *Traction*. S&S/Portfolio.

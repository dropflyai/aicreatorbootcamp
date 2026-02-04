# Paid Search — Google Ads Architecture and Performance Optimization

## Paid Search for B2B SaaS

Paid search (SEM) captures demand at the highest-intent moment: when a buyer is
actively searching for a solution to their problem. Unlike display or social
advertising (which creates awareness), paid search intercepts existing intent.
This makes paid search the most efficient demand capture channel for B2B companies
with established category awareness.

The challenge for B2B is economics: high CPCs (often $10-50+ for competitive SaaS
keywords), long sales cycles (the click-to-revenue path may be months), and
attribution complexity (the search click is often one of many touchpoints). Success
requires meticulous architecture, sophisticated bidding, and robust measurement
that connects clicks to pipeline, not just conversions.

---

## Google Ads Account Architecture

### Campaign Structure

The optimal Google Ads structure for B2B SaaS organizes campaigns by intent level
and audience segment:

```
Account
├── Brand Campaigns (Highest Priority)
│   ├── Brand Exact Match
│   └── Brand + Modifier (brand + pricing, brand + reviews)
├── High-Intent Non-Brand (Capture Demand)
│   ├── Category Keywords (e.g., "sales enablement software")
│   ├── Comparison Keywords (e.g., "Gong vs Chorus")
│   └── Solution Keywords (e.g., "sales coaching platform")
├── Mid-Intent Non-Brand (Nurture Demand)
│   ├── Problem Keywords (e.g., "how to improve win rates")
│   └── Category Research (e.g., "best sales tools 2026")
├── Competitor Campaigns
│   ├── Competitor Brand Names
│   └── Competitor + Modifier ("Competitor alternative")
├── Remarketing / RLSA
│   ├── Website Visitors (non-converters)
│   ├── Content Engagers
│   └── Abandoned Demo Requests
└── Performance Max (if applicable)
    └── AI-driven cross-channel
```

### Ad Group Organization

Each campaign contains tightly themed ad groups:

**Rule: Single Theme Ad Groups (STAGs)**
Each ad group should contain keywords that share the same intent and can be served
by the same ad copy. If two keywords need different ad copy, they belong in
different ad groups.

**Example: "Sales Enablement Software" Campaign**

| Ad Group | Keywords | Match Type |
|----------|----------|-----------|
| Sales Enablement Platform | sales enablement platform, sales enablement tool | Phrase, Exact |
| Sales Enablement Software | sales enablement software, sales enablement app | Phrase, Exact |
| Sales Training Software | sales training software, sales training platform | Phrase, Exact |
| Sales Coaching Tool | sales coaching tool, sales coaching software | Phrase, Exact |

---

## Quality Score Deep Dive

### What Is Quality Score?

Quality Score (QS) is Google's 1-10 rating of the quality and relevance of your
keywords, ads, and landing pages. QS directly affects your ad rank and cost per
click. A higher QS means better position at lower cost.

**Quality Score Components:**

| Component | Weight | What It Measures | How to Improve |
|-----------|--------|-----------------|---------------|
| Expected CTR | ~40% | Predicted click-through rate for your keyword | Improve ad copy relevance, use keyword in headline |
| Ad Relevance | ~20% | How closely your ad matches the search intent | Tight ad groups, keyword in ad text, match intent |
| Landing Page Experience | ~40% | Post-click experience quality and relevance | Page speed, mobile optimization, content relevance, clear CTA |

### Quality Score Impact on Cost

```
Ad Rank = Max CPC Bid x Quality Score (+ ad extensions impact)
Actual CPC = (Competitor's Ad Rank / Your Quality Score) + $0.01
```

**Example:**
```
QS 10: You pay $5 CPC for position 1
QS 7:  You pay $7.14 CPC for the same position
QS 5:  You pay $10 CPC for the same position
QS 3:  You pay $16.67 CPC — or you may not qualify at all
```

A QS improvement from 5 to 8 can reduce CPC by 40% while maintaining position.

---

## Bidding Strategies

### Strategy Selection Framework

| Strategy | Type | Best For | Risk Level |
|----------|------|----------|-----------|
| Manual CPC | Manual | New campaigns, learning phase, tight control | Low |
| Enhanced CPC (eCPC) | Semi-automated | Established campaigns with conversion data | Medium |
| Maximize Clicks | Automated | Traffic-focused campaigns, new keywords | Medium |
| Maximize Conversions | Automated | Campaigns with 30+ conversions/month | Medium |
| Target CPA | Automated | Campaigns with stable CPA history | Medium-High |
| Target ROAS | Automated | E-commerce or revenue-tracked campaigns | High |
| Maximize Conversion Value | Automated | Revenue-optimized, requires value tracking | High |

### B2B Bidding Best Practices

1. **Start manual, move to automated.** Manual CPC for the first 30-60 days to
   establish baseline data. Then transition to automated bidding with conversion data.

2. **Bid by intent level.** High-intent keywords (demo, pricing, buy) deserve
   higher bids than mid-intent (comparison, review) or low-intent (how-to, guide).

3. **Dayparting.** B2B buyers search during business hours. Bid higher Monday-Friday
   8AM-6PM, reduce or pause bids on nights and weekends.

4. **Device adjustment.** If mobile conversion rates are lower (common in B2B), apply
   negative bid adjustments (-20 to -50%) for mobile.

5. **Geographic targeting.** Target only geographies where you sell. Exclude countries
   where you do not have GTM presence.

6. **Audience layering.** Apply audience signals (in-market audiences, similar
   audiences, customer match lists) as bid adjustments to prioritize high-value
   searchers.

---

## Performance Max Campaigns

### What Is Performance Max?

Performance Max (PMax) is Google's AI-driven campaign type that serves ads across
all Google surfaces (Search, Display, YouTube, Discover, Gmail, Maps) from a single
campaign. You provide assets and signals; Google's algorithm determines placement,
targeting, and bidding.

### PMax for B2B Considerations

**Advantages:**
- Access to all Google inventory from one campaign
- Machine learning optimization across channels
- Discovery of new audiences you may not target manually

**Disadvantages:**
- Limited control and transparency
- Difficult to attribute performance to specific channels
- May cannibalize brand search (include brand as a negative)
- Creative optimization is a black box

### PMax Best Practices for B2B

1. Provide high-quality audience signals (customer lists, website visitors, in-market)
2. Create diverse asset groups (headlines, descriptions, images, videos)
3. Exclude brand terms (prevent PMax from claiming brand traffic)
4. Set clear conversion goals (demo requests, not just page views)
5. Monitor search terms reports weekly for irrelevant traffic
6. Run PMax alongside standard Search campaigns (not as a replacement)

---

## B2B Search Ads Best Practices

### Ad Copy Framework

**Responsive Search Ads (RSAs):**
Google serves combinations of your headlines and descriptions. Provide:
- 15 unique headlines (max 30 characters each)
- 4 unique descriptions (max 90 characters each)
- Pin critical messages to positions 1 or 2 to ensure visibility

**Headline Categories:**
| Category | Example | Purpose |
|----------|---------|---------|
| Keyword Match | "Sales Enablement Platform" | Relevance, QS |
| Benefit | "Close 35% More Deals" | Value proposition |
| Social Proof | "Trusted by 10,000+ Sales Teams" | Credibility |
| CTA | "Get a Free Demo Today" | Action-oriented |
| Differentiator | "Built for Enterprise Sales Teams" | Segmentation |
| Urgency | "See Results in 30 Days" | Motivation |

### Ad Extensions

| Extension | Type | B2B Application |
|-----------|------|----------------|
| Sitelink | Links to related pages | Product features, pricing, case studies, demo |
| Callout | Short text highlights | "Free Trial", "24/7 Support", "SOC 2 Certified" |
| Structured Snippet | Category-specific features | Features: Pipeline, Forecasting, Coaching |
| Call | Phone number | For high-ACV, sales-ready searches |
| Lead Form | In-ad form submission | Demo request without leaving Google |
| Image | Visual alongside text ad | Product screenshots, trust badges |

---

## Negative Keywords

Negative keywords prevent your ads from showing for irrelevant searches.
Without aggressive negative keyword management, 20-40% of B2B search spend
is wasted on irrelevant clicks.

### Negative Keyword Categories for B2B SaaS

| Category | Examples | Why Exclude |
|----------|---------|-------------|
| Job Seekers | "jobs", "careers", "salary", "hiring" | Not buyers |
| Students | "free", "student", "course", "tutorial" | Not ICP |
| DIY/Code | "open source", "github", "code", "python" | Build vs. buy |
| Consumer | "personal", "home", "free download" | Wrong audience |
| Reviews (wrong intent) | "complaints", "scam", "cancel" | Negative intent |
| Competitor Employees | "[competitor] careers", "[competitor] stock" | Not buyers |

### Negative Keyword Hygiene

- Review search terms report weekly
- Add negatives proactively (before wasting spend)
- Build shared negative keyword lists across campaigns
- Use phrase and exact match negatives strategically

---

## Paid Search Metrics and Benchmarks

### Core Metrics

| Metric | B2B SaaS Benchmark | Calculation |
|--------|-------------------|------------|
| CTR (Click-Through Rate) | 3-7% (search) | Clicks / Impressions |
| CPC (Cost Per Click) | $5-50 | Spend / Clicks |
| Conversion Rate | 2-5% (demo request) | Conversions / Clicks |
| Cost Per Conversion | $50-500 | Spend / Conversions |
| Cost Per MQL | $100-500 | Spend / MQLs from PPC |
| Cost Per SQL | $500-2,000 | Spend / SQLs from PPC |
| ROAS (Return on Ad Spend) | 5-15x (pipeline), 3-8x (revenue) | Pipeline or Revenue / Spend |
| Quality Score | 7+ target | Google's rating (1-10) |
| Impression Share | 60-80% for brand, 30-50% for non-brand | Your impressions / Eligible impressions |

### Paid Search Dashboard

| Widget | Metric | Visualization |
|--------|--------|---------------|
| Spend vs. Budget | Monthly spend tracking | Progress bar |
| Conversions by Campaign | Demo requests, trial starts | Bar chart |
| CPA Trend | Cost per acquisition over time | Line chart |
| Quality Score Distribution | QS by keyword | Histogram |
| Search Terms Analysis | Top converting terms | Table |
| Pipeline Attribution | PPC-sourced pipeline | Waterfall |

---

**Paid search is demand capture, not demand creation. Its power is intercepting
buyers at the moment of highest intent. The discipline is ensuring every click
leads to relevant, compelling experiences that convert searches into pipeline.**

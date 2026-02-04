# Paid Social — LinkedIn, Meta, TikTok, and Creative Testing

## Paid Social for B2B

Paid social advertising serves a different role than paid search. Search captures
existing demand (buyer actively looking). Social creates demand and awareness among
buyers who are not yet searching. For B2B companies, paid social is the primary
channel for top-of-funnel awareness, mid-funnel education, and account-based
targeting.

The B2B paid social landscape is dominated by LinkedIn (professional targeting,
highest CPM/CPC, highest conversion quality), supplemented by Meta (broader reach,
lower cost, retargeting), and increasingly TikTok (emerging B2B awareness channel,
algorithm-driven distribution).

---

## LinkedIn Ads — The B2B Workhorse

### LinkedIn Ad Formats

| Format | Best For | Avg. CPM | Avg. CPC | Avg. CTR |
|--------|---------|---------|---------|---------|
| Single Image | Brand awareness, content promotion | $30-60 | $5-12 | 0.4-0.6% |
| Video | Brand storytelling, demos, testimonials | $25-50 | $4-10 | 0.3-0.5% |
| Carousel | Multi-point messaging, guides | $25-55 | $5-10 | 0.4-0.7% |
| Document Ads | In-feed content delivery (no landing page) | $20-45 | $3-8 | 0.5-0.8% |
| Conversation Ads | Direct engagement, event invitations | $0.30-0.60/send | N/A | 50-70% open rate |
| Lead Gen Forms | In-platform lead capture | $30-60 | $5-15 | 0.5-1.5% (form fill) |
| Sponsored Messaging | Personalized InMail at scale | $0.40-0.80/send | N/A | 45-65% open rate |
| Text Ads | Low-cost awareness | $5-15 | $3-8 | 0.02-0.05% |
| Thought Leader Ads | Boost employee/executive posts | $15-40 | $3-8 | 0.5-1.0% |

### LinkedIn Targeting

**LinkedIn's targeting advantage:** Professional data precision. You can target by
title, seniority, function, company size, industry, skills, and company name —
data that no other platform matches for B2B.

**Targeting Layers:**

| Layer | Options | Example |
|-------|---------|---------|
| Job Function | Marketing, Sales, IT, Engineering, Finance | Sales Function for sales tools |
| Job Title | Specific titles or contains keywords | VP Sales, Director Sales Ops |
| Seniority | Entry, Senior, Manager, Director, VP, CxO | Director and above |
| Company Size | 1-10, 11-50, 51-200, 201-500, 501-1000, 1001-5000, 5000+ | 200-5000 employees |
| Industry | 148 industry categories | Technology, SaaS, Financial Services |
| Company Name | Specific company targeting (ABM) | Target account list upload |
| Skills | Self-reported professional skills | CRM, Sales Operations, Salesforce |
| Groups | LinkedIn group membership | Sales leadership groups |
| Matched Audiences | Website retargeting, contact list, lookalike | Retarget website visitors |

**Targeting Best Practices:**
1. Audience size: 50,000-500,000 for awareness, 20,000-100,000 for conversion
2. Do not over-narrow: combining 4+ targeting criteria reduces reach excessively
3. Use exclusions: exclude current customers, competitors, and job seekers
4. Layer seniority: Director+ for decision-maker targeting, Manager+ for influence
5. Matched audiences: upload ABM lists for Tier 1 and Tier 2 accounts

### LinkedIn Campaign Architecture

```
Campaign Group: [Product / Initiative]
├── Awareness Campaign (Video / Thought Leader Ads)
│   ├── Audience: Broad ICP (Function + Seniority + Size)
│   ├── Objective: Brand awareness
│   └── Budget: 30% of LinkedIn spend
├── Engagement Campaign (Content / Document Ads)
│   ├── Audience: ICP + Interest signals
│   ├── Objective: Website visits, content engagement
│   └── Budget: 30% of LinkedIn spend
├── Conversion Campaign (Lead Gen / Landing Page)
│   ├── Audience: High-intent (retargeting + ABM list)
│   ├── Objective: Demo requests, lead gen forms
│   └── Budget: 30% of LinkedIn spend
└── Retargeting Campaign (All Formats)
    ├── Audience: Website visitors, content engagers, video viewers
    ├── Objective: Conversion
    └── Budget: 10% of LinkedIn spend
```

---

## Meta Ads (Facebook/Instagram) for B2B

### When Meta Works for B2B

Meta's professional targeting is weaker than LinkedIn, but its advantages are:
- Significantly lower CPMs ($5-15 vs. $30-60 on LinkedIn)
- Superior algorithm for retargeting and lookalike audiences
- Video distribution (Reels, Stories) at scale
- Broad reach for brand awareness campaigns

**Best B2B Use Cases for Meta:**
1. Retargeting website visitors (cheapest retargeting channel)
2. Lookalike audiences based on customer lists
3. Brand awareness at scale (supplement LinkedIn)
4. Event promotion (webinars, conferences)
5. Content distribution (blog posts, videos)

### Meta B2B Targeting

| Strategy | Implementation | Effectiveness |
|----------|---------------|---------------|
| Custom Audience (Customer List) | Upload email list, create 1% lookalike | High |
| Website Custom Audience | Retarget visitors by page type | High |
| Interest-Based | Job titles, industry publications, SaaS tools | Medium |
| Behavior-Based | Small business owners, tech early adopters | Medium |
| Lookalike (1-3%) | Based on customer list or high-intent visitors | High |
| Broad (AI-optimized) | Minimal targeting, let Meta algorithm optimize | Variable |

### iOS 14.5+ Impact and Solutions

Apple's App Tracking Transparency (ATT) significantly reduced Meta's targeting
and measurement capabilities for iOS users:

**Impact:**
- Reduced retargeting audience sizes by 30-50%
- Attribution window shortened from 28-day to 7-day
- Conversion reporting delayed and modeled (not exact)
- Lookalike audience quality decreased

**Solutions:**
1. **Conversions API (CAPI):** Server-side event tracking (bypasses browser restrictions)
2. **First-party data:** Prioritize customer list uploads over pixel-based audiences
3. **Broad targeting:** Let Meta's algorithm find converters with less restrictive targeting
4. **Creative testing:** With less targeting precision, creative quality becomes the
   primary lever
5. **Aggregated Event Measurement:** Configure 8 priority conversion events
6. **UTM discipline:** Manual attribution supplements platform reporting

---

## TikTok for B2B

### The Emerging B2B Opportunity

TikTok's B2B advertising is nascent but growing rapidly. The platform's algorithm-
driven distribution means that great content reaches relevant audiences regardless
of follower count. Early B2B adopters are seeing lower CPMs and CPCs than LinkedIn,
with surprisingly relevant audience engagement.

**B2B TikTok Best Practices:**
1. Educational content: "3 things I wish I knew about [topic]" format
2. Behind-the-scenes: Show the human side of your company
3. Myth-busting: "Everyone thinks X, but actually Y"
4. Quick tips: 30-60 second actionable insights
5. Trending audio: Use trending sounds with B2B messaging overlay

**TikTok Ad Formats for B2B:**
- In-Feed Video Ads: Native-feeling, 15-60 seconds
- Spark Ads: Boost organic posts (most natural-feeling)
- Lead Gen Forms: In-app lead capture
- Search Ads: Appear in TikTok search results

---

## Creative Testing Framework

### Why Creative Matters More Than Targeting

In the post-iOS 14.5 world, creative is the largest lever for paid social
performance. Platforms are becoming better at finding the right audience
algorithmically, but they can only work with the creative you provide.

### Creative Testing Methodology

**The Creative Testing Hierarchy:**

```
Level 1: Concept Testing (What message resonates?)
  - Test 3-5 fundamentally different messaging angles
  - Different value propositions, pain points, or benefits
  - Minimum $500 per concept over 5-7 days
  - Metric: CTR and engagement rate

Level 2: Format Testing (How should we deliver it?)
  - Test formats: static image, video, carousel, document
  - Same message, different delivery
  - Minimum $300 per format over 5 days
  - Metric: CPM, CTR, cost per conversion

Level 3: Creative Element Testing (What details matter?)
  - Test specific elements: headline, image, CTA, color
  - One variable at a time
  - Minimum $200 per variant over 3-5 days
  - Metric: Conversion rate, cost per conversion
```

### Creative Best Practices by Platform

| Element | LinkedIn | Meta | TikTok |
|---------|---------|------|--------|
| Image Style | Professional, clean, data-driven | Authentic, human, less polished | Native, casual, creator-style |
| Video Length | 15-30 sec (feed), 60-90 sec (awareness) | 15-30 sec (Reels), 60 sec (feed) | 15-30 sec (optimal), 60 sec (max) |
| Headline | Benefit-focused, professional tone | Emotional, curiosity-driven | Hook in first 2 seconds |
| CTA | "Learn More", "Request Demo" | "Learn More", "Sign Up" | "Link in bio", "Comment for link" |
| Creative Refresh | Every 4-6 weeks | Every 2-4 weeks | Every 1-2 weeks |

### Ad Fatigue Management

Ad fatigue occurs when the same audience sees the same creative too many times,
causing declining CTR and increasing CPM.

**Fatigue Indicators:**
- CTR declining >20% from peak
- Frequency exceeding 4-5 impressions per person
- CPM increasing without audience or bid changes

**Fatigue Prevention:**
1. Rotate 3-5 creative variants simultaneously
2. Refresh creative every 4-6 weeks (LinkedIn) or 2-4 weeks (Meta)
3. Vary formats (alternate image, video, carousel)
4. Expand audience (fresh users reduce frequency)
5. Pause high-frequency ads and replace

---

## Paid Social Measurement

### Metrics Framework

| Metric | Definition | Benchmark (LinkedIn) | Benchmark (Meta) |
|--------|-----------|---------------------|------------------|
| CPM | Cost per 1,000 impressions | $30-60 | $5-15 |
| CPC | Cost per click | $5-12 | $1-5 |
| CTR | Click-through rate | 0.4-0.8% | 0.8-1.5% |
| Conv. Rate | Landing page conversion | 5-15% | 3-10% |
| CPL | Cost per lead | $50-300 | $20-100 |
| CPA | Cost per demo/meeting | $200-800 | $100-400 |
| ROAS (Pipeline) | Pipeline / Ad Spend | 10-30x | 10-30x |

### Attribution Considerations

Paid social attribution is fundamentally broken in standard models because:
1. View-through influence is real but hard to measure
2. Dark funnel engagement (seeing your ad, then searching directly) is invisible
3. Long B2B cycles mean the click and the conversion are months apart
4. Multi-touch journeys involve social + search + direct + email

**Solutions:**
- Self-reported attribution ("How did you hear about us?")
- Lift studies (geo-based or holdout-based incrementality testing)
- Marketing mix modeling (MMM) for channel-level contribution
- View-through window analysis (7-day, 28-day post-view conversions)

---

**Paid social is the primary lever for B2B brand building and demand creation.
Unlike search (which captures existing intent), social creates the conditions
for intent to emerge. The best B2B marketers invest in both.**

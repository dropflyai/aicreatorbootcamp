# Demand Generation Strategy — Architecture for Predictable Pipeline

## Demand Generation vs. Lead Generation

The conflation of demand generation and lead generation is the single most expensive
mistake in B2B marketing. Understanding the distinction is the prerequisite for
building a modern demand engine.

**Lead Generation (Legacy Model):**
- Goal: Capture contact information in exchange for gated content
- Metric: MQL volume
- Motion: Gate content behind forms, pass leads to sales, measure hand-offs
- Problem: Optimizes for form fills, not revenue. Produces high volume of low-intent
  contacts that sales ignores (fewer than 1% of MQLs convert to revenue at most
  organizations, per Forrester)

**Demand Generation (Modern Model):**
- Goal: Create demand (awareness + education + urgency) BEFORE the buyer enters
  a buying cycle
- Metric: Pipeline contribution, revenue influence, brand awareness
- Motion: Provide ungated value, build brand affinity, create buying intent through
  education, capture demand at the point of purchase readiness
- Advantage: Higher quality pipeline, better win rates, lower CAC, sustainable growth

**The Demand Generation Framework:**

```
CREATE DEMAND              CAPTURE DEMAND            CONVERT DEMAND
(Brand + Education)        (Intent Signals)          (Sales Engagement)
│                          │                         │
├─ Thought leadership      ├─ High-intent forms      ├─ Qualified meetings
├─ Ungated content         ├─ Demo requests          ├─ Pipeline creation
├─ Community building      ├─ Pricing page visits    ├─ Revenue attribution
├─ Social presence         ├─ SDR outreach to IWA    ├─ Closed-won revenue
├─ Event experiences       ├─ PLG activation         │
└─ Dark funnel influence   └─ Retargeting            └─
```

---

## The Dark Funnel

### What Is the Dark Funnel?

The dark funnel is the buyer's journey that occurs outside your tracking systems.
Research from 6sense and TrustRadius consistently shows that 70-90% of the B2B
buying journey happens before the buyer ever fills out a form or talks to sales.
This invisible journey includes:

- Reading your content without identifying themselves
- Asking peers for recommendations on Slack, Discord, and private communities
- Evaluating your product through review sites (G2, TrustRadius, Reddit)
- Following your founders and employees on social media
- Attending your webinars or podcasts but never downloading the recording
- Searching for your category terms and competitors
- Getting internal recommendations from colleagues who are already aware

**Implication:** If your demand generation strategy only measures and optimizes
what you can track (form fills, UTM parameters, email clicks), you are optimizing
for 10-30% of the actual buying journey and ignoring the majority of influence.

### Dark Funnel Strategy

1. **Create content that works without tracking:** Podcast episodes, YouTube videos,
   LinkedIn posts, Twitter threads, community contributions. Measure resonance
   (engagement, shares, comments), not just clicks.

2. **Ask buyers how they found you:** Add "How did you hear about us?" as a
   free-text field on demo request forms. The answers will reveal dark funnel
   channels your attribution tools miss entirely.

3. **Invest in brand:** Brand creates the conditions for demand. When a buyer needs
   a solution in your category, brand determines whether you are in their initial
   consideration set. This happens before any trackable interaction.

4. **Build community presence:** Be where your buyers already gather. Industry Slack
   groups, Reddit, LinkedIn communities, niche forums. Add value before you
   capture leads.

---

## Lead Qualification Framework

### MQL, SQL, PQL, and Beyond

| Stage | Definition | Criteria | Owner |
|-------|-----------|----------|-------|
| IQL (Information Qualified Lead) | Person who consumed content | Downloaded a resource, attended a webinar | Marketing (nurture) |
| MQL (Marketing Qualified Lead) | Person who meets fit + engagement threshold | ICP fit + behavioral scoring threshold met | Marketing → SDR handoff |
| SAL (Sales Accepted Lead) | SDR confirmed qualification | SDR connected, confirmed pain and authority | SDR |
| SQL (Sales Qualified Lead) | Opportunity created, meets BANT/MEDDPICC minimum | Discovery complete, pain quantified, decision process understood | AE |
| PQL (Product Qualified Lead) | User who activated in-product and shows buying signals | PLG activation milestones (features used, usage frequency, team invites) | Product → Sales or CS |

### Lead Scoring Model

**Fit Scoring (Demographic/Firmographic):**

| Criteria | Points |
|----------|--------|
| Company size matches ICP | +20 |
| Industry matches target vertical | +15 |
| Title is decision maker (VP+) | +20 |
| Title is influencer (Manager/Director) | +10 |
| Title is individual contributor | +5 |
| Geography is target market | +10 |
| Technology stack includes trigger tool | +10 |
| Company recently funded | +15 |

**Engagement Scoring (Behavioral):**

| Action | Points |
|--------|--------|
| Visited pricing page | +25 |
| Requested demo | +50 |
| Attended live webinar | +15 |
| Downloaded gated content | +10 |
| Visited 5+ pages in a session | +15 |
| Returned to website 3+ times | +20 |
| Opened 3+ marketing emails | +10 |
| Clicked email CTA | +15 |
| Engaged on social media | +5 |

**Threshold:**
- MQL: Fit Score >= 40 AND Engagement Score >= 50
- High-Priority MQL: Fit Score >= 60 AND Engagement Score >= 75
- PQL: Product activation milestone + Fit Score >= 40

### Decay Rules
- Engagement score decays 10% per month of inactivity
- After 90 days of no engagement, lead returns to nurture pool
- Website visit resets the decay clock

---

## Account-Based Marketing (ABM) Tiers

### ABM Tier Architecture

| Tier | Accounts | Investment | Personalization | Channels |
|------|----------|-----------|----------------|----------|
| Tier 1: Strategic ABM | 10-25 accounts | High ($5-15K per account) | Fully custom, 1:1 | Executive dinners, custom research, dedicated campaigns |
| Tier 2: ABM Lite | 50-200 accounts | Moderate ($500-2K per account) | Segment-customized, 1:few | Industry-specific content, targeted ads, personalized outreach |
| Tier 3: Programmatic ABM | 500-2000 accounts | Low ($50-200 per account) | Template-personalized, 1:many | Intent-triggered ads, automated sequences, scaled content |

### Tier 1: Strategic ABM Playbook

**Account Selection Criteria:**
- Annual revenue potential >$200K ACV
- Strategic logo value (referenceable brand)
- Known buying intent signals (leadership change, initiative, funding)
- Existing relationship or warm introduction path

**Strategic ABM Activities:**

| Activity | Timeline | Investment | Expected Outcome |
|----------|----------|-----------|-----------------|
| Custom industry research report | Month 1 | $3-5K (analyst + design) | Opens executive doors |
| Personalized direct mail (high value) | Month 1-2 | $200-500 per package | Memorable first impression |
| Executive roundtable invitation | Month 2-3 | $2-5K per event | Peer relationship + brand credibility |
| Custom demo environment | Month 3-4 | $1-2K (SE time) | Removes evaluation friction |
| Joint customer visit | Month 4-5 | $1-3K (travel) | Proof point + relationship building |
| Executive sponsorship alignment | Ongoing | Time investment | Long-term strategic relationship |

### Tier 2: ABM Lite Playbook

**Account Selection Criteria:**
- ACV potential $50-200K
- Industry vertical alignment
- ICP fit confirmed via firmographic + technographic data
- Intent data signals present (6sense, Bombora, G2)

**ABM Lite Activities:**

| Activity | Cadence | Personalization Level |
|----------|---------|---------------------|
| Industry-specific ad campaigns | Continuous | Vertical-customized creative |
| Targeted content syndication | Monthly | Segment-specific content |
| Personalized email sequences | Monthly | Company name, industry, pain hypothesis |
| SDR outreach (multi-channel) | Weekly | Company research, trigger events |
| Virtual events (industry-specific) | Quarterly | Vertical-focused agenda |

### Tier 3: Programmatic ABM Playbook

**Account Selection Criteria:**
- ICP fit via firmographic scoring
- Intent data signals above threshold
- No existing relationship required

**Programmatic ABM Activities:**

| Activity | Automation Level |
|----------|-----------------|
| Intent-triggered LinkedIn ads | Fully automated |
| Retargeting campaigns | Fully automated |
| Email nurture sequences | Automated with personalization tokens |
| Content recommendations | Algorithm-driven |
| SDR prioritization | Intent score ranking |

---

## Demand Gen Measurement

### Metric Hierarchy

| Level | Metric | Owner | Frequency |
|-------|--------|-------|-----------|
| Activity | Impressions, reach, content published | Marketing | Weekly |
| Engagement | CTR, time on page, shares, comments | Marketing | Weekly |
| Conversion | MQLs, SQLs, demo requests, PQLs | Marketing + Sales | Weekly |
| Pipeline | Marketing-sourced pipeline, marketing-influenced pipeline | Marketing + Sales | Monthly |
| Revenue | Marketing-sourced revenue, marketing-influenced revenue | Revenue Ops | Quarterly |
| Efficiency | CAC, LTV:CAC, payback period | Finance + Marketing | Quarterly |

### Attribution Model Selection

| Model | How It Works | Best For | Limitation |
|-------|-------------|----------|-----------|
| First Touch | 100% credit to first interaction | Understanding awareness channels | Ignores nurture and conversion |
| Last Touch | 100% credit to last interaction | Understanding conversion channels | Ignores awareness and nurture |
| Linear | Equal credit across all touchpoints | Simple multi-touch | Over-credits low-impact touches |
| Time Decay | More credit to recent touchpoints | Conversion-focused analysis | Under-credits brand building |
| U-Shaped | 40% first, 40% last, 20% middle | Balanced first + last | May underweight middle nurture |
| W-Shaped | 30% first, 30% lead creation, 30% opportunity creation, 10% middle | Full-funnel attribution | Complexity, data requirements |
| Algorithmic/ML | Data-driven credit assignment | Organizations with large datasets | Black box, requires data volume |

---

## Demand Gen Tech Stack

| Category | Tools | Purpose |
|----------|-------|---------|
| Marketing Automation | HubSpot, Marketo, Pardot | Email, scoring, nurture |
| ABM Platform | 6sense, Demandbase, Terminus | Intent data, account targeting |
| CRM | Salesforce, HubSpot CRM | Lead and opportunity management |
| Ad Platform | LinkedIn, Google, Meta | Paid demand generation |
| Content | WordPress, Webflow, Contentful | Content publishing |
| Analytics | GA4, Mixpanel, Heap | Behavioral analytics |
| Attribution | Bizible, HockeyStack, Dreamdata | Multi-touch attribution |
| Intent Data | Bombora, G2, TrustRadius | Buying intent signals |

---

**Demand generation is not a campaign — it is an ecosystem. The companies that build
the strongest demand ecosystems create a gravity field that pulls buyers toward them
before a single outbound email is sent.**

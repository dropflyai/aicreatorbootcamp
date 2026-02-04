# GTM Strategy — Sales-Led, Product-Led, Community-Led, and Partner-Led

## What Is Go-to-Market Strategy?

Go-to-market (GTM) strategy defines how a company reaches, acquires, and retains
customers. It encompasses the intersection of product, marketing, sales, and
customer success — the full system that converts market opportunity into revenue.
GTM strategy is not a launch plan. It is the ongoing operating model for how you
create and capture value in your market.

The fundamental GTM question: "What motion will we use to get our product into the
hands of buyers who will pay for it and keep paying?" The answer depends on product
complexity, buyer behavior, competitive dynamics, and unit economics.

---

## GTM Motion Types

### Sales-Led Growth (SLG)

**Definition:** Revenue is primarily driven by a direct sales team that identifies,
qualifies, engages, and closes customers through structured sales processes.

**When to Use SLG:**
- ACV > $25K (justifies the cost of human sales)
- Product requires explanation, customization, or integration
- Buyer is a committee (multiple stakeholders, formal procurement)
- Deal cycles are 30+ days
- Competitive landscape requires relationship-based differentiation

**SLG Architecture:**
```
Marketing → SDR → AE → SE → CS
(Demand)    (Qualify)  (Close)  (Support)  (Retain)
```

**SLG Economics:**
```
Typical ACV: $25K - $500K+
Sales Cycle: 30-180 days
CAC: $5K - $50K
CAC Payback: 6-18 months
S&M % of Revenue: 30-60%
Win Rate: 20-35%
```

**SLG Strengths:** Control over buyer experience, handle complex deals, build
deep relationships, navigate procurement.

**SLG Weaknesses:** Expensive, hard to scale, limited by hiring capacity, slow feedback loop.

### Product-Led Growth (PLG)

**Definition:** The product itself is the primary vehicle for customer acquisition,
expansion, and retention. Users self-serve, experience value, and convert to paid
without (or before) engaging with sales.

**When to Use PLG:**
- Product delivers immediate, self-evident value
- Low barrier to adoption (no integration, no training required)
- Individual user can experience value before team/enterprise purchase
- Viral or network effects exist (product gets better with more users)
- Freemium or free trial is economically viable

**PLG Architecture:**
```
Product → User Activation → Team Adoption → Sales (Expansion) → CS
(Acquire)  (Value Delivery)   (Viral Growth)   (Enterprise Upsell)  (Retain)
```

**PLG Economics:**
```
Typical Starting ACV: $0 (free) to $5K
Expansion ACV: $10K - $100K+
Self-Serve Cycle: 1-14 days
Sales-Assisted Cycle: 30-90 days
CAC (Self-Serve): $100 - $2K
CAC (Sales-Assisted): $5K - $20K
S&M % of Revenue: 15-35%
```

**PLG Strengths:** Efficient acquisition, viral growth potential, product feedback
loop, lower CAC.

**PLG Weaknesses:** Product must be exceptional, hard to monetize enterprise without
sales, may attract non-ICP users.

### Community-Led Growth (CLG)

**Definition:** Community engagement (forums, events, content, peer connections) is
the primary mechanism for building awareness, trust, and demand.

**When to Use CLG:**
- Your buyers value peer advice over vendor messaging
- Strong community already exists around your problem space
- Your team can authentically contribute value to the community
- Long-term brand building is a priority
- Category education is needed (new category, complex problem)

**CLG Architecture:**
```
Community → Education → Trust → Demand → Sales
(Gather)    (Contribute)  (Earn)   (Capture)  (Convert)
```

**CLG Examples:**
- HubSpot: Inbound community, INBOUND conference
- Notion: User community, template marketplace
- dbt: Analytics engineering community

### Partner-Led Growth (PLG-Partner)

**Definition:** Partners (technology, channel, consulting) are the primary mechanism
for reaching and converting new customers.

**When to Use Partner-Led:**
- Your product is part of a larger technology ecosystem
- Partners have existing relationships with your target buyers
- Direct sales in certain segments or geographies is uneconomical
- Your product enhances partner offerings (mutual value creation)

**Partner-Led Architecture:**
```
Partner Program → Co-Marketing → Co-Selling → Customer → Joint Success
(Build Ecosystem)  (Joint Demand)   (Joint Sales)  (Acquire)  (Retain)
```

---

## Crossing the Chasm (Geoffrey Moore)

### The Technology Adoption Lifecycle

Geoffrey Moore's "Crossing the Chasm" (1991, updated 2014) describes how technology
products must navigate different buyer segments in sequence:

```
Innovators → Early Adopters → [CHASM] → Early Majority → Late Majority → Laggards
   2.5%          13.5%                       34%              34%           16%
```

**The Chasm:** The dangerous gap between early adopters (visionaries who buy for
strategic advantage) and the early majority (pragmatists who buy for proven solutions).
Most startups die in the chasm because:
- Visionary customers tolerate bugs, incomplete products, and risk
- Pragmatist customers demand references, reliability, and proven ROI
- The tactics that win visionaries (bold vision, bleeding edge) repel pragmatists

### Crossing the Chasm: The Beachhead Strategy

**Step 1: Choose a Beachhead Segment**
Select one narrow market segment where you can achieve dominance:
- Segment is small enough to dominate (100-500 target companies)
- Segment has a compelling reason to buy (specific pain that is acute)
- Segment members reference each other (word-of-mouth within the segment)
- Winning the segment is achievable with current resources

**Step 2: Develop the Whole Product**
Pragmatist buyers need a "whole product" — not just software, but:
- Implementation support
- Integration with their existing stack
- Training and documentation
- Customer success and support
- Proven ROI with peer references

**Step 3: Win the Segment Completely**
Achieve 50%+ market share in the beachhead segment before expanding. Dominance in
one segment provides:
- Reference customers who talk to each other
- Case studies that prove ROI for similar buyers
- Product maturity for the segment's specific needs
- Revenue foundation for expansion

**Step 4: Expand to Adjacent Segments**
Use beachhead dominance as a launching pad for adjacent segments:
- Geographic expansion (same segment, different region)
- Adjacent vertical (similar buyers, different industry)
- Up-market (same segment, larger companies)
- Adjacent use case (same buyer, additional problem)

---

## GTM Motion Selection Framework

### Choosing Your Primary GTM Motion

| Factor | SLG | PLG | CLG | Partner-Led |
|--------|-----|-----|-----|------------|
| ACV Range | $25K+ | $0-$50K (expands higher) | Any | Any |
| Product Complexity | High | Low-Medium | Any | Medium-High |
| Buyer Type | Committee | Individual → Team | Community member | Partner customer |
| Sales Cycle | 30-180 days | 1-14 days (self-serve) | Varies | 30-120 days |
| Market Maturity | Established category | Emerging or established | New or niche | Established |
| Competitive Intensity | High | Medium-High | Low-Medium | Medium |
| Team Strength | Sales-strong | Product-strong | Content-strong | BD-strong |

### Hybrid GTM (Most Common for Growth Stage)

Most successful B2B SaaS companies at scale use hybrid GTM:

```
PLG (Self-Serve) ──────────→ Small deals, individual users, SMB
     │
     ├── (Product-qualified leads)
     │
PLG + Sales Assist ────────→ Mid-market, team purchases, $10-50K
     │
     ├── (Enterprise signals)
     │
SLG (Direct Sales) ───────→ Enterprise, $50K+, multi-stakeholder
     │
     ├── (Partner referrals)
     │
Partner-Led ───────────────→ Geographic expansion, vertical specialization
```

---

## GTM Metrics by Motion

### SLG Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Pipeline Coverage | Weighted Pipeline / Quota | 3-5x |
| Win Rate | Won / (Won + Lost) | 20-35% |
| Sales Cycle | Median days S0 to Close | Segment-dependent |
| CAC | Total S&M / New Customers | <18 months payback |
| Magic Number | Net New ARR / Prior Q S&M | 0.75-1.0 |

### PLG Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Sign-Up Rate | Sign-ups / Website Visitors | 2-5% |
| Activation Rate | Users who reach value moment / Sign-ups | 20-40% |
| Free to Paid Conversion | Paid Users / Free Users | 2-5% (freemium), 15-25% (trial) |
| Time to Value | Days from sign-up to activation | <1 day (ideal) |
| Viral Coefficient | Invites x Conversion per User | >1.0 (viral) |
| Revenue per Employee | ARR / Employees | Higher than SLG |

### CLG Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Community Size | Active members | Growing MoM |
| Engagement Rate | Active / Total Members | >20% monthly |
| Community-Sourced Pipeline | Pipeline from community members | Growing |
| Brand Awareness | Aided/unaided awareness surveys | Growing |
| Content Engagement | Shares, comments, saves | Growing |

---

## GTM Planning Process

### Annual GTM Planning Framework

**Step 1: Market Analysis (Month 1)**
- TAM/SAM/SOM calculation
- Competitive landscape review
- Buyer persona validation
- Pricing and packaging review

**Step 2: Strategy Definition (Month 1-2)**
- Primary and secondary GTM motions
- Segment prioritization
- Channel strategy (direct, partner, self-serve)
- Positioning and messaging refresh

**Step 3: Resource Planning (Month 2-3)**
- Headcount plan (sales, marketing, CS)
- Budget allocation (brand vs. activation, by channel)
- Technology stack requirements
- Partner program plan

**Step 4: Execution Planning (Month 3)**
- Campaign calendar
- Content roadmap
- Event calendar
- Sales enablement plan
- Partner activation plan

---

**GTM strategy is the bridge between product-market fit and revenue. The right GTM
motion turns a good product into a growing business. The wrong one turns a good
product into a well-kept secret.**

# Market Entry — TAM/SAM/SOM, Beachhead Strategy, and International Expansion

## Market Sizing: The Foundation of GTM

Market sizing answers the most fundamental business question: "How big is the
opportunity?" It informs fundraising, resource allocation, segment prioritization,
and growth planning. Yet most market sizing exercises are either wildly optimistic
(to impress investors) or mechanically precise (to satisfy analysts) without being
genuinely useful for operational decisions.

Useful market sizing requires three numbers at three levels of abstraction, each
serving a different purpose.

---

## TAM, SAM, SOM

### Total Addressable Market (TAM)

**Definition:** The total revenue opportunity available if you achieved 100% market
share across all segments and geographies.

**Purpose:** Communicates the theoretical ceiling of the opportunity. Used primarily
for fundraising and long-term strategic planning.

**Calculation Methods:**

**Method 1: Top-Down (Market Reports)**
```
TAM = Industry market size from analyst reports (Gartner, IDC, Forrester)

Example:
  "The global sales technology market is $20B" (Gartner, 2025)
  Your TAM for a sales tool: ~$20B
```
**Pros:** Easy, credible sources. **Cons:** Broad, may include adjacent categories.

**Method 2: Bottom-Up (Customer Count x ACV)**
```
TAM = Total Potential Customers x Average Revenue Per Customer

Example:
  Total companies worldwide that match your broadest ICP: 500,000
  Average potential ACV: $25,000
  TAM = 500,000 x $25,000 = $12.5B
```
**Pros:** More specific, tied to your product. **Cons:** Depends on ICP definition accuracy.

**Method 3: Value Theory**
```
TAM = Total economic value your product can capture from all potential buyers

Example:
  Problem cost per company: $500K/year
  Your product captures 10% of that value: $50K/year
  Total companies with this problem: 200,000
  TAM = 200,000 x $50K = $10B
```
**Pros:** Anchored in value, not market reports. **Cons:** Harder to validate externally.

### Serviceable Addressable Market (SAM)

**Definition:** The portion of TAM that you can realistically serve given your
product capabilities, geographic presence, and business model.

**SAM Filters:**
- Geographic: Countries where you operate or can sell
- Segment: Company sizes you can serve (not too small, not too large)
- Industry: Verticals your product addresses
- Technology: Companies with compatible technology stack
- Language: Markets where your product is available in local language
- Regulatory: Markets where compliance allows your product

**Example:**
```
TAM: $12.5B (global, all segments)

SAM Filters:
  - US + Europe only: reduces to 40% = $5.0B
  - Mid-market and enterprise (200+ employees): reduces to 60% = $3.0B
  - Technology and SaaS verticals: reduces to 30% = $900M

SAM: $900M
```

### Serviceable Obtainable Market (SOM)

**Definition:** The portion of SAM you can realistically capture in the near term
(1-3 years) given your resources, competitive position, and go-to-market motion.

**SOM Calculation:**
```
SOM = SAM x Realistic Market Share Capture

Factors:
  - Current market share
  - Growth rate
  - Competitive intensity
  - Sales capacity
  - Marketing reach

Example:
  SAM: $900M
  Realistic capture in 3 years: 2-5% = $18-45M
  SOM: $18-45M
```

### Common Market Sizing Mistakes

| Mistake | Example | Fix |
|---------|---------|-----|
| TAM too broad | "The global software market is $600B" | Use product-specific category |
| Ignoring alternatives | Not counting free/open-source solutions | Include all competitive alternatives |
| Static sizing | Using 2022 data for 2026 planning | Apply growth rate to current data |
| Single method | Only using top-down | Triangulate top-down and bottom-up |
| Conflating TAM and SOM | Presenting TAM as achievable revenue | Always show all three levels |

---

## Beachhead Strategy

### Why Beachhead Matters

The beachhead strategy (from Moore's "Crossing the Chasm") is the practice of
focusing all resources on winning a single, narrow market segment before expanding.
It is counterintuitive — most startups want to go broad. But concentration of force
is the most reliable path to initial traction.

### Beachhead Selection Criteria

| Criterion | Weight | Assessment |
|-----------|--------|-----------|
| Pain Severity | 25% | How acute is the problem for this segment? (1-10) |
| Willingness to Pay | 20% | Will they pay your target ACV? (1-10) |
| Accessibility | 15% | Can you reach and sell to this segment efficiently? (1-10) |
| Reference Value | 15% | Will wins in this segment impress adjacent segments? (1-10) |
| Competition | 10% | How intense is competition in this segment? (1-10, inverted) |
| Market Size | 10% | Is the segment large enough to sustain initial growth? (1-10) |
| Product Fit | 5% | How well does current product serve this segment? (1-10) |

### Beachhead Scoring Example

| Segment | Pain | WTP | Access | Reference | Competition | Size | Fit | Total |
|---------|------|-----|--------|-----------|-------------|------|-----|-------|
| SaaS 50-200 emp | 9 | 8 | 9 | 7 | 5 | 6 | 9 | 7.7 |
| FinTech 200-1000 | 8 | 9 | 6 | 8 | 7 | 7 | 7 | 7.5 |
| Healthcare Enterprise | 7 | 9 | 4 | 9 | 4 | 8 | 5 | 6.6 |
| SMB E-Commerce | 6 | 4 | 8 | 3 | 8 | 9 | 8 | 6.3 |

**Winner: SaaS 50-200 employees** — highest pain, most accessible, strong product fit.

### Beachhead Domination Playbook

**Phase 1: Prove (Months 1-6)**
- Win 5-10 customers in the beachhead segment
- Achieve measurable outcomes (quantified ROI)
- Develop 2-3 referenceable case studies
- Refine product for segment-specific needs

**Phase 2: Dominate (Months 6-18)**
- Win 30-50 customers (target 20-30% segment penetration)
- Become the default recommendation within the segment
- Segment-specific content, events, and community
- Earn analyst recognition in the segment

**Phase 3: Expand (Months 18-36)**
- Expand to adjacent segments using beachhead references
- Enter new geographies with the same segment
- Move up-market within the beachhead vertical
- Develop product capabilities for adjacent segments

---

## Market Sizing Methods

### Bottom-Up Market Sizing (Recommended)

**Step 1: Define your ICP precisely**
- Industry, company size, geography, technology stack, buying triggers

**Step 2: Count addressable companies**
Use data sources: ZoomInfo, LinkedIn Sales Navigator, Crunchbase, government databases

**Step 3: Estimate penetration rate**
What percentage of addressable companies would buy your product?
- Conservative: 5-10%
- Moderate: 10-20%
- Aggressive: 20-40%

**Step 4: Calculate revenue**
```
Market Size = Addressable Companies x Penetration Rate x Average ACV
```

### Top-Down Market Sizing

**Step 1: Find relevant market reports**
Gartner, IDC, Forrester, Grand View Research, MarketsandMarkets

**Step 2: Apply your filters**
```
Analyst TAM → Geography Filter → Segment Filter → Product Fit Filter = Your SAM
```

**Step 3: Estimate capture**
```
Your SOM = SAM x Realistic Market Share (typically 1-5% for early stage)
```

### Triangulation

Always use both methods and compare:
- If bottom-up > top-down: Your ICP may be too broad, or the analyst category is too narrow
- If top-down > bottom-up: Your ICP may be too narrow, or you are underestimating addressable companies
- If they roughly match (within 2x): Good confidence in the sizing

---

## International Expansion

### When to Expand Internationally

**Expansion Readiness Signals:**
- Domestic market penetration approaching 15-20% of SOM
- Inbound interest from international markets (organic demand)
- Competitive pressure requiring geographic diversification
- Product matured to support multiple languages/currencies
- Revenue scale justifies international investment ($10M+ ARR typically)

### Market Entry Strategy

| Strategy | Description | Investment | Risk | Speed |
|----------|------------|-----------|------|-------|
| Remote Sales | Sell from HQ, no local presence | Low | Low | Fast |
| Local Hire | Hire 1-2 people in target market | Medium | Medium | Medium |
| Partner-Led | Use local partners to sell and implement | Low-Medium | Low | Medium |
| Office/Entity | Establish legal entity and local office | High | Medium | Slow |
| Acquisition | Acquire a local company in the market | Very High | High | Fast (post-close) |

### International Market Prioritization

| Factor | Weight | Assessment Criteria |
|--------|--------|-------------------|
| Market Size | 25% | TAM in the target market |
| Growth Rate | 15% | Market growth trajectory |
| Competitive Intensity | 15% | Number and strength of local competitors |
| Language/Culture | 15% | Product and content localization requirements |
| Regulatory Complexity | 10% | Data privacy, compliance requirements |
| Existing Demand | 10% | Inbound interest, organic traffic from market |
| GTM Infrastructure | 10% | Partner availability, event opportunities |

### International Expansion Playbook

**Phase 1: Validate (Months 1-3)**
- Analyze existing international customer base and inbound demand
- Conduct market research (TAM, competition, regulatory)
- Test paid advertising in target market (measure demand signal)
- Interview 10-15 prospects in target market

**Phase 2: Seed (Months 3-9)**
- Hire first local employee (typically a senior AE or country manager)
- Localize website, core content, and demo materials
- Establish local payment processing and legal entity (if needed)
- Build initial pipeline through outbound and local events

**Phase 3: Scale (Months 9-18)**
- Grow local team (sales, marketing, CS)
- Launch local demand generation campaigns
- Build partner ecosystem in the market
- Achieve predictable pipeline creation and revenue

**Phase 4: Mature (Months 18+)**
- Fully operational local team
- Localized product (language, currency, compliance)
- Local brand awareness and market presence
- Revenue contribution proportional to market TAM

---

## Market Entry Metrics

| Metric | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|--------|---------|---------|---------|---------|
| Pipeline Created | Validate demand | First $500K | $2M+ quarterly | Proportional to team |
| Revenue | $0 | First $100K | $500K+ quarterly | Proportional to TAM |
| Customers | 0-5 (test) | 5-20 | 20-50 | 50+ |
| Team Size | 0-1 | 1-3 | 3-8 | 8+ |
| CAC vs. Domestic | N/A | 2-3x domestic | 1.5-2x domestic | <1.5x domestic |

---

**Market entry is not about being everywhere. It is about being dominant somewhere
first, then expanding from a position of strength. The graveyard of startups is
filled with companies that expanded too broadly before dominating their beachhead.**

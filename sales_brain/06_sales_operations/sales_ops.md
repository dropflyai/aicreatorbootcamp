# Sales Operations — CRM Architecture, Territories, Quotas, and Comp

## Sales Operations as Strategic Infrastructure

Sales operations is not sales administration. SalesOps is the strategic function
that designs, implements, and optimizes the systems, processes, and data
infrastructure that enable a sales organization to operate at maximum efficiency.
If sales is the engine, SalesOps is the engineering team that designs the engine,
tunes it, and measures its performance.

The scope of modern SalesOps encompasses: CRM architecture, territory design, quota
methodology, compensation plan design, deal desk operations, tech stack management,
data governance, and process optimization. This module covers each domain.

---

## CRM Architecture

### CRM as the System of Record

The CRM (Salesforce, HubSpot, or equivalent) is not a tool for salespeople to use —
it is the system of record for the revenue organization. This distinction matters
because "tool for salespeople" leads to minimal adoption and garbage data, while
"system of record" leads to governance, enforcement, and trust.

### Data Architecture Principles

**Principle 1: Single Source of Truth**
Every revenue-relevant data point lives in one place. If pipeline lives in the CRM
AND in spreadsheets, neither is trustworthy. Eliminate shadow systems ruthlessly.

**Principle 2: Buyer-Centric Data Model**
Organize data around the buyer's journey, not the seller's activity:
```
Account → Contact → Opportunity → Activity → Product Line Item
           ↑                        ↑
        Enrichment             Engagement Data
        (ZoomInfo)             (Email, Calendar)
```

**Principle 3: Automation Over Manual Entry**
Every field that can be auto-populated should be. Manual entry creates friction
and error. Auto-capture: meeting data, email engagement, stage transitions,
activity timestamps, push counts.

### CRM Object Architecture (Salesforce Model)

| Object | Purpose | Key Fields |
|--------|---------|-----------|
| Account | Company record | Industry, size, ICP score, territory, owner |
| Contact | Individual stakeholder | Title, role (MEDDPICC), engagement score, last activity |
| Opportunity | Revenue-bearing deal | Stage, amount, close date, source, MEDDPICC fields, forecast category |
| Activity | Interactions and tasks | Type (call, email, meeting), date, duration, outcome |
| Product | Line items in a deal | Product name, quantity, price, discount, term |
| Quote/CPQ | Formal pricing document | Products, pricing, terms, approval status |
| Case/Ticket | Post-sale support | Category, priority, SLA, resolution time |

### Automation Rules

| Trigger | Action | Purpose |
|---------|--------|---------|
| Opportunity created | Auto-assign to territory owner | Territory integrity |
| Stage change | Timestamp captured, exit criteria checked | Process enforcement |
| Close date changed | Push count incremented, reason required | Pipeline hygiene |
| No activity in 14 days | Alert to owner and manager | Stale deal prevention |
| Opportunity closed won | Trigger CS handoff workflow | Seamless transition |
| Opportunity closed lost | Require loss reason and competitor | Win/loss intelligence |
| Contact role assigned | Map to MEDDPICC framework | Deal qualification |

---

## Territory Design

### Territory Design Principles

Territory design is the art of dividing market potential into balanced, non-overlapping
segments that maximize coverage and minimize conflict. Poor territory design creates
more revenue drag than poor selling — it is the most under-invested function in
most sales organizations.

**The Fairness-Efficiency Tradeoff:**
- Fair territories have equal potential (every rep has the same opportunity)
- Efficient territories minimize travel, maximize account density, and match rep
  capabilities to account complexity
- Perfect fairness and perfect efficiency are mathematically impossible simultaneously
- The goal is a balance that reps perceive as fair AND that optimizes organizational output

### Territory Variables

| Variable | Description | Data Source |
|----------|-------------|-----------|
| Geography | Region, state, metro area, zip code | Census, CRM |
| Industry Vertical | Healthcare, finance, technology, manufacturing | Firmographic data |
| Company Size | Revenue, employee count, funding stage | ZoomInfo, Crunchbase |
| Named Accounts | Strategic accounts assigned regardless of geography | Internal strategy |
| Product Line | Different products = different territories | Product catalog |
| Customer Lifecycle | New business vs. expansion vs. renewal | CRM opportunity type |

### Territory Sizing Methodology

**Step 1: Define Total Addressable Accounts**
Start with your ICP criteria and count the total addressable accounts in your market.

**Step 2: Estimate Account Potential**
For each account, estimate annual revenue potential based on:
- Similar customer spend (look-alike modeling)
- Company size correlation with ACV
- Industry vertical pricing norms
- Current penetration (for existing customers)

**Step 3: Calculate Required Coverage**
```
Territories Needed = Total Market Potential / Target Revenue Per Territory
```

**Step 4: Balance Territories**
Each territory should have within 15% of the mean in:
- Total account potential
- Total addressable accounts
- Mix of account sizes (not all enterprise or all SMB)
- Geographic accessibility (travel burden)

**Step 5: Validate with Reps**
Run a rep advisory panel to identify obvious problems: duplicate accounts, missing
accounts, historical relationships that would be disrupted, market knowledge gaps.

### Territory Conflict Resolution

| Conflict Type | Resolution Rule |
|--------------|----------------|
| Two reps claim same account | Territory definition prevails; escalate to manager |
| Customer has locations in multiple territories | Primary billing location determines territory; expansion managed collaboratively |
| Inbound lead from another rep's territory | Route to territory owner within 24 hours |
| Partner-sourced deal in assigned territory | Co-sell with territory owner; split credit per comp plan |
| Former customer of departing rep | Reassign with 90-day protection (no credit impact) |

---

## Quota Setting Methodology

### Quota Design Principles

Quotas must be: attainable (60-70% of reps should hit), ambitious (stretches
performance beyond comfort), data-informed (based on territory potential, not
arbitrary growth targets), and transparent (reps understand how their quota was set).

### Quota Calculation Methods

**Method 1: Top-Down (Board-Down)**
```
Company Revenue Target → Sales Revenue Responsibility → Team Quotas → Rep Quotas
```
Start with the board-approved revenue plan. Subtract non-sales revenue (self-serve,
expansion, partner). Divide by team capacity. Adjust for territory potential.

**Method 2: Bottom-Up (Territory Potential)**
```
Territory Potential → Historical Conversion → Expected Revenue → Quota (80-90%)
```
Estimate each territory's revenue potential based on addressable accounts, historical
win rates, and pipeline capacity. Set quota at 80-90% of expected revenue.

**Method 3: Hybrid (Recommended)**
Run both top-down and bottom-up. If they align within 15%, quota is well-calibrated.
If they diverge, investigate: the board plan may be unrealistic, or territory
potential may be underestimated.

### Quota Allocation Factors

| Factor | Weight | Rationale |
|--------|--------|-----------|
| Territory potential | 40% | Market opportunity determines ceiling |
| Historical performance | 25% | Past performance predicts future capacity |
| Strategic investment | 20% | New markets or products may require lower initial quotas |
| Rep tenure | 15% | Ramping reps need lower quotas initially |

### Ramp Quotas for New Reps

| Month | Quota % | Expectation |
|-------|---------|-------------|
| 1-2 | 0% | Training, onboarding, shadowing |
| 3 | 25% | First pipeline creation, initial deals |
| 4 | 50% | Active selling, building pipeline |
| 5 | 75% | Approaching full capacity |
| 6+ | 100% | Fully ramped |

**Ramp Quota Total Cost:**
A new rep costs approximately 9-12 months of OTE before reaching breakeven
productivity. Factor this into hiring plans and budget models.

---

## Compensation Plan Design

### Comp Plan Principles

1. **Simplicity:** Reps should calculate their expected comp in 30 seconds. If they
   cannot, the plan is too complex and will not drive behavior.
2. **Alignment:** Comp must incentivize behaviors the company wants. If you want
   multi-year deals, incentivize multi-year deals. If you want new logos, incentivize
   new logos.
3. **Fairness:** Similar effort and results should produce similar compensation.
   Disparity breeds resentment and attrition.
4. **Affordability:** Total comp expense should be 20-30% of revenue for SaaS.
   If it exceeds this, the plan is economically unsustainable.

### Standard SaaS Comp Plan Structure

| Component | AE (New Business) | AE (Full Cycle) | SDR/BDR | AM/CSM |
|-----------|-------------------|-----------------|---------|--------|
| Base Salary | 50% of OTE | 50% of OTE | 60-70% of OTE | 60-70% of OTE |
| Variable | 50% of OTE | 50% of OTE | 30-40% of OTE | 30-40% of OTE |
| Primary Metric | New ARR | Total ARR (new + expansion) | SQLs or Pipeline Created | NRR or Expansion ARR |
| Accelerator | 1.5-2x above quota | 1.5-2x above quota | Tiered bonus | Tiered bonus |
| Decelerator | 0.5x below 50% | 0.5x below 50% | Rare | Rare |

### Accelerator and Decelerator Curves

```
Attainment    Commission Rate    Cumulative Effect
  0-50%         0.5x base          Penalty zone
  50-100%       1.0x base          Standard zone
  100-120%      1.5x base          Accelerator
  120-150%      2.0x base          Super-accelerator
  150%+         Cap or uncapped    Depends on company philosophy
```

### SPIFs and Bonuses

| SPIF Type | Objective | Duration | Award |
|-----------|-----------|----------|-------|
| New Logo | Drive new customer acquisition | Quarterly | $1-5K per new logo |
| Multi-Year | Incentivize longer commitments | Quarterly | 0.5x additional commission |
| Product Focus | Drive adoption of new product | Monthly | 1.5x commission on product |
| Speed to Close | Reduce sales cycle | Monthly | Bonus for deals closed under median cycle |

---

## Deal Desk Operations

### Deal Desk Function

The deal desk is the centralized function that approves, structures, and processes
non-standard deals. It exists to: protect margin, ensure contract consistency, enable
creative deal structuring, and accelerate approval cycles.

### Deal Desk Approval Thresholds

| Discount Level | Approver | SLA |
|---------------|----------|-----|
| 0-10% | AE (pre-approved) | Instant |
| 10-20% | Sales Manager | 4 hours |
| 20-30% | Director of Sales | 24 hours |
| 30-40% | VP Sales | 24-48 hours |
| 40%+ | CRO + CFO | 48-72 hours |

### Non-Standard Terms That Require Deal Desk

- Payment terms beyond Net-30
- Custom SLA commitments
- Unlimited liability clauses
- Termination for convenience provisions
- Custom data processing terms
- Source code escrow requests
- Most-favored-nation pricing clauses
- Benchmark or audit rights

### Deal Structuring Creativity

| Buyer Need | Creative Structure |
|-----------|-------------------|
| Limited current budget | Ramp pricing (lower Year 1, full price Year 2+) |
| Risk aversion | Paid pilot with full-contract option |
| Multiple divisions | Enterprise agreement with volume commitment |
| Long approval process | Quarterly billing to reduce upfront commitment |
| End-of-year budget surplus | Prepaid multi-year with significant discount |

---

## Tech Stack Management

### The Revenue Tech Stack

| Layer | Tools | Purpose |
|-------|-------|---------|
| CRM | Salesforce, HubSpot | System of record |
| Sales Engagement | Outreach, Salesloft, Apollo | Sequence automation |
| Conversation Intelligence | Gong, Chorus, Clari | Call recording, coaching |
| Revenue Intelligence | Clari, BoostUp, Aviso | Forecast, pipeline analytics |
| CPQ | Salesforce CPQ, DealHub | Quote and proposal automation |
| Enrichment | ZoomInfo, Apollo, Clearbit | Contact and account data |
| Calendar/Scheduling | Calendly, Chili Piper | Meeting booking |
| Document Management | DocuSign, PandaDoc | Contract execution |

### Tech Stack Rationalization

Most sales orgs have too many tools with overlapping capabilities. Quarterly review:
1. Audit all tools by category
2. Measure adoption rate (if <60% of reps use it monthly, question its value)
3. Calculate cost per rep per month across the full stack
4. Identify overlap and consolidation opportunities
5. Survey reps: which tools do you actually use daily?

**Target:** Total tech stack cost should be $200-500/rep/month for a mature org.
Above $500 indicates bloat; below $200 may indicate underinvestment.

---

**Sales operations is the invisible infrastructure that makes predictable revenue
possible. Without it, sales is art. With it, sales is engineering.**

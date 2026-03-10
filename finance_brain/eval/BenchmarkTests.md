# Finance Benchmark Tests -- Scenario-Based Evaluation

Every finance scenario below must be evaluated with a structured response.
These benchmarks test real-world financial acumen, not textbook definitions.
Model responses show the standard. Your responses must meet or exceed.

---

## HOW TO USE BENCHMARK TESTS

1. Read the scenario completely before formulating a response
2. Draft your response independently, showing all work
3. Compare against the model response
4. Score each response dimension: Accuracy (1-5), Methodology (1-5), Communication (1-5)
5. Average must be >= 4.0 to pass

---

## SCENARIO 1: THREE-STATEMENT MODEL LOGIC

**Situation:**
Build the logic for a 3-statement financial model from these inputs:

- Revenue Year 1: $2M, growing 50% YoY
- COGS: 30% of revenue
- OpEx (excl. D&A): 60% of revenue Year 1, declining 5% per year as % of revenue
- Capital expenditure: $200K Year 1, growing 20% YoY
- Depreciation: Straight-line over 5 years on all CapEx
- Working capital: AR = 45 days revenue, AP = 30 days COGS, Inventory = 0
- Tax rate: 25% on positive income, 0% on losses (no tax assets recognized)
- No debt. Cash starting balance: $1M

**Challenge:**
Show the 3-statement model logic for Years 1-3 with formulas.

### Model Response

**Income Statement:**

```
                          Year 1      Year 2      Year 3
Revenue                   $2,000K     $3,000K     $4,500K
  (Prior year x 1.50)
COGS (30% Rev)            ($600K)     ($900K)     ($1,350K)
Gross Profit              $1,400K     $2,100K     $3,150K
  Gross Margin            70%         70%         70%

OpEx (% declining)        ($1,200K)   ($1,650K)   ($2,250K)
  (Y1: 60%, Y2: 55%, Y3: 50%)
Depreciation              ($40K)      ($88K)      ($145.6K)
  (Cumulative CapEx / 5)
EBIT                      $160K       $362K       $754.4K
Tax (25%)                 ($40K)      ($90.5K)    ($188.6K)
Net Income                $120K       $271.5K     $565.8K
```

**Depreciation build-up (critical detail):**
```
                          Year 1      Year 2      Year 3
Y1 CapEx ($200K/5)        $40K        $40K        $40K
Y2 CapEx ($240K/5)        --          $48K        $48K
Y3 CapEx ($288K/5)        --          --          $57.6K
Total Depreciation        $40K        $88K        $145.6K
```

**Balance Sheet (key items):**
```
                          Year 1      Year 2      Year 3
Cash                      [from CF]   [from CF]   [from CF]
Accounts Receivable       $246.6K     $369.9K     $554.8K
  (Revenue / 365 x 45)
Net PP&E                  $160K       $312K       $454.4K
  (Prior PP&E + CapEx - Depreciation)
Total Assets              Cash + AR + PP&E

Accounts Payable          $49.3K      $74.0K      $110.9K
  (COGS / 365 x 30)
Retained Earnings         $120K       $391.5K     $957.3K
  (Prior RE + Net Income)
```

**Cash Flow Statement:**
```
                          Year 1      Year 2      Year 3
Net Income                $120K       $271.5K     $565.8K
+ Depreciation            $40K        $88K        $145.6K
- Increase in AR          ($246.6K)   ($123.3K)   ($184.9K)
+ Increase in AP          $49.3K      $24.7K      $36.9K
Operating Cash Flow       ($37.3K)    $260.9K     $563.4K

CapEx                     ($200K)     ($240K)     ($288K)
Free Cash Flow            ($237.3K)   $20.9K      $275.4K

Beginning Cash            $1,000K     $762.7K     $783.6K
Ending Cash               $762.7K     $783.6K     $1,059.0K
```

**Validation checks:**
- BS balances: Assets = Liabilities + Equity (verify each year)
- Cash on BS matches CF ending cash
- Retained earnings roll-forward ties to net income

---

## SCENARIO 2: FUNDRAISING VALUATION DECISION

**Situation:**
Your SaaS company has:
- ARR: $5M, growing 80% YoY
- Net Revenue Retention: 120%
- Gross Margin: 75%
- Burn: $300K/month, 12 months runway
- You have term sheets for Series A:
  - Option A: $10M at 10x ARR ($50M pre-money)
  - Option B: $8M at 15x ARR ($75M pre-money) but requires hitting $8M ARR in 12 months

**Challenge:**
Board asks: raise at 10x ARR or wait/take the conditional 15x? Analyze.

### Model Response

**Quantitative Analysis:**

Option A: $10M at $50M pre-money
- Post-money: $60M
- Dilution: $10M / $60M = 16.7%
- Cash position after: $10M + (12 x $300K remaining runway) = ~$13.6M total runway
- Runway: ~45 months at current burn (comfortable)
- No performance conditions

Option B: $8M at $75M pre-money
- Post-money: $83M
- Dilution: $8M / $83M = 9.6%
- Cash position after: $8M + remaining runway = ~$11.6M
- Runway: ~39 months at current burn
- CONDITION: Must hit $8M ARR in 12 months (requires 60% growth from $5M)

**Risk Analysis of Option B condition:**
- Need $3M net new ARR in 12 months
- Current growth rate (80% YoY) would yield $9M ARR -- exceeds target
- BUT: growth is never linear. Risk factors:
  - Churn could increase as customer base grows
  - Sales cycle could lengthen as you move upmarket
  - Key hire departures could slow execution
- Probability of hitting $8M with 80% growth: ~70-75%
- If condition is NOT met: What happens? (Critical question not specified)
  - If deal reverts to 10x: you get $8M at worse terms than Option A
  - If deal dies: you wasted 3-6 months and may face a tougher market

**Dilution comparison:**
- Option A dilution: 16.7%
- Option B dilution: 9.6%
- Delta: 7.1% = significant at scale. On a $500M exit, that is $35.5M to founders.

**Recommendation:**
Take Option A UNLESS:
1. The condition failure terms are clearly defined and acceptable
2. You have >80% confidence in hitting $8M ARR
3. The 39-month runway is sufficient for your next milestone (Series B)
4. You are willing to accept the execution risk for 7.1% less dilution

If growth confidence is genuinely >80% and failure terms are reasonable, Option B creates significantly more founder value. But "hoping to grow" is not the same as "confident we will grow."

**Board-ready summary:**
"We recommend Option A for three reasons: certainty of capital, longer runway, and elimination of execution risk on the condition. The dilution premium of 7.1% is the price of certainty, and at this stage, certainty of funding outweighs valuation optimization."

---

## SCENARIO 3: REVENUE RECOGNITION -- SAAS CONTRACT

**Situation:**
A customer signs a 12-month SaaS contract:
- Total contract value: $120K
- Payment: Quarterly installments of $30K
- Includes: $20K of implementation services (estimated 2 months to complete)
- Subscription start date: After implementation is complete
- Contract signed: January 1

**Challenge:**
Walk through the revenue recognition treatment month by month for the first 6 months.

### Model Response

**Step 1: Identify performance obligations (ASC 606)**
- Obligation 1: Implementation services (distinct -- has standalone value)
- Obligation 2: SaaS subscription (distinct -- 12-month access)

**Step 2: Allocate transaction price**
- Total contract: $120K
- Standalone selling price of implementation: $20K (based on what we charge separately)
- Standalone selling price of subscription: $100K (12 months x $8,333/month)
- Total SSP: $120K
- Allocation: Implementation = $20K, Subscription = $100K

**Step 3: Determine recognition pattern**
- Implementation: Recognized over 2-month delivery period ($10K/month)
- Subscription: Recognized ratably over 12 months starting after implementation ($100K/12 = $8,333/month, starting Month 3)

**Month-by-month treatment:**

```
Month   Cash Received   Rev Recognized   Deferred Revenue   AR
Jan     $30K (Q1 pmt)   $10K (impl)      $20K               $0
Feb     $0              $10K (impl)      $10K               $0
Mar     $0              $8,333 (sub)     $1,667             $0
Apr     $30K (Q2 pmt)   $8,333 (sub)     $23,334            $0
May     $0              $8,333 (sub)     $15,001            $0
Jun     $0              $8,333 (sub)     $6,668             $0
```

**Running totals through June:**
- Cash received: $60K
- Revenue recognized: $10K + $10K + $8,333 + $8,333 + $8,333 + $8,333 = $53,332
- Deferred revenue balance: $60K - $53,332 = $6,668

**Key accounting entries (January example):**
```
January 1 (contract signed, Q1 payment received):
  Dr. Cash                   $30,000
  Cr. Deferred Revenue       $30,000

January 31 (implementation revenue recognized):
  Dr. Deferred Revenue       $10,000
  Cr. Revenue - Services     $10,000
```

**Critical notes:**
- Implementation revenue is recognized over the delivery period, not at completion (assuming over-time recognition is appropriate based on the nature of the work)
- Subscription revenue does NOT start until implementation is complete
- Cash received is NOT revenue. Deferred revenue is the bridge.
- If implementation takes longer than 2 months, revenue recognition adjusts accordingly

---

## SCENARIO 4: CASH CRISIS MANAGEMENT

**Situation:**
It is October. Your company has:
- Cash: $800K
- Monthly burn: $200K (and growing $10K/month as you are hiring)
- Revenue: $100K/month (growing 5%/month)
- Series A fundraise started but earliest close is February
- Runway: approximately 5-6 months

**Challenge:**
Build a survival plan that gets you to the fundraise.

### Model Response

**13-Week Cash Flow (Oct - Jan):**

```
                    Oct       Nov       Dec       Jan
Revenue (5% growth) $100K     $105K     $110.3K   $115.8K
Expenses (growing)  ($200K)   ($210K)   ($220K)   ($230K)
Net Burn            ($100K)   ($105K)   ($109.7K) ($114.2K)
Cash Balance        $700K     $595K     $485.3K   $371.1K
```

At this rate, cash hits zero in early April. February close is tight.

**Immediate Actions (Week 1):**

1. **Hiring freeze**: Stop all open requisitions immediately. Saves $10K/month escalation.
2. **Vendor negotiation**: Contact top 10 vendors. Request 60-day payment terms (currently 30). Shifts $50-80K of cash outflow.
3. **AR acceleration**: Offer 2% discount for customers who pay annually upfront instead of monthly. Target $50-100K in accelerated collections.
4. **Expense audit**: Review every recurring charge. Cancel non-essential SaaS tools, memberships, consultants. Target $20-30K/month savings.

**Revised 13-Week Cash Flow (with actions):**

```
                    Oct       Nov       Dec       Jan
Revenue             $100K     $105K     $110.3K   $115.8K
+ Accelerated AR    $0        $75K      $0        $0
Total Inflows       $100K     $180K     $110.3K   $115.8K
Expenses (reduced)  ($180K)   ($180K)   ($180K)   ($180K)
Net Cash Flow       ($80K)    $0        ($69.7K)  ($64.2K)
Cash Balance        $720K     $720K     $650.3K   $586.1K
```

This extends runway to May -- 3 months past February target close.

**Fundraise Acceleration:**
- Compress investor meetings. Target 10 meetings in next 2 weeks.
- Prepare a data room immediately (do not wait for investor requests).
- Have term sheet language ready to move fast once a lead commits.
- Consider a bridge round from existing investors: $200-300K convertible note to add buffer.

**Board Communication:**
- Notify board immediately. Do not wait until December.
- Present the plan, not just the problem.
- Ask for board member introductions to investors.
- Monthly cash updates to board until round closes.

**Nuclear options (if fundraise delayed past February):**
- RIF (reduction in force): identify which roles can be eliminated if needed. Do NOT execute yet, but have the plan ready.
- Revenue acceleration: offer discounted annual contracts aggressively.
- Line of credit: explore venture debt or revenue-based financing as bridge.

---

## SCENARIO 5: BOARD ASKS ABOUT UNIT ECONOMICS

**Situation:**
The board asks: "Walk me through our unit economics. Are they healthy?"

Your data:
- Average contract value (ACV): $50K
- Customer acquisition cost (CAC): $75K (fully loaded)
- Gross margin: 72%
- Logo churn: 8% annually
- Net revenue retention: 115%
- Time to payback: 25 months
- Average customer lifespan: 6 years (based on 1/churn = 12.5, but conservatively estimated at 6)

**Challenge:**
Present the unit economics story to the board.

### Model Response

**Opening (the headline):**
"Our unit economics are healthy and improving. We spend $75K to acquire a customer that generates $216K in gross profit over their lifetime -- a 2.9x return. Here is how the math works."

**LTV calculation (show work):**
```
Annual revenue per customer:  $50K ACV
Net revenue per year:         $50K x 1.15 NRR = $57.5K (year 2 effective)
Average annual revenue:       ~$55K (blended across expansion)
Gross profit per year:        $55K x 72% = $39.6K
Customer lifetime:            6 years (conservative)
LTV:                          $39.6K x 6 = $237.6K
```

More precise LTV accounting for compounding NRR:
```
Year 1: $50K x 0.72    = $36.0K GP
Year 2: $57.5K x 0.72  = $41.4K GP
Year 3: $66.1K x 0.72  = $47.6K GP
Year 4: $76.0K x 0.72  = $54.7K GP
Year 5: $87.4K x 0.72  = $62.9K GP
Year 6: $100.5K x 0.72 = $72.4K GP
Total LTV:              = $315.0K
```

**Key ratios:**
```
LTV:CAC ratio:        $315K / $75K = 4.2x  (Benchmark: >3x is healthy)
CAC Payback:          25 months              (Benchmark: <18 months is ideal, <24 is acceptable)
Gross Margin:         72%                    (Benchmark: >70% is healthy for SaaS)
Net Revenue Retention: 115%                  (Benchmark: >110% is strong)
Logo Churn:           8%                     (Benchmark: <10% is acceptable, <5% is excellent)
```

**The story for the board:**
"Three things make this picture strong:
1. Our LTV:CAC of 4.2x means every dollar of sales and marketing investment generates $4.20 of gross profit over the customer's life. This is well above the 3x benchmark.
2. Our NRR of 115% means our existing customer base grows 15% annually without acquiring a single new customer. This is the engine behind efficient growth.
3. The concern is CAC payback at 25 months -- above the ideal 18-month target. We are working to reduce this by improving conversion rates in the sales process and reducing onboarding costs."

**What to improve:**
"Our focus for next quarter is reducing CAC payback to under 20 months by:
- Improving lead-to-close conversion by 15% (reducing wasted sales effort)
- Automating 40% of onboarding (reducing implementation cost per customer)
- Increasing inbound mix from 30% to 45% (lower-cost acquisition channel)"

---

## SCENARIO 6: M&A DUE DILIGENCE -- RED FLAG DETECTION

**Situation:**
You are evaluating an acquisition target. They have provided their financials. You notice:
- Revenue grew 40% YoY but AR grew 80%
- Gross margin improved from 65% to 72% but they changed cost allocation methodology
- EBITDA is positive but operating cash flow has been negative for 3 quarters
- Their top 3 customers represent 55% of revenue
- They capitalized $500K of "development costs" this year (previously expensed)

**Challenge:**
Identify the red flags and explain what each one means.

### Model Response

**Red Flag 1: AR growing 2x faster than revenue**
- What it means: Customers are not paying on time, or revenue is being recognized aggressively.
- Action: Request AR aging report. Check for revenue recognized on contracts where collection is doubtful. Calculate DSO trend over last 8 quarters. Ask about their revenue recognition policy changes.
- Severity: HIGH. This is often a sign of revenue quality issues.

**Red Flag 2: Gross margin improvement from methodology change**
- What it means: They may have moved costs from COGS to OpEx to inflate gross margin. The "improvement" is cosmetic, not operational.
- Action: Get the old and new cost allocation and recalculate gross margin under the old methodology. If margin is flat or declining on a consistent basis, the change was to hide deterioration.
- Severity: MEDIUM-HIGH. Financial engineering vs. operational improvement.

**Red Flag 3: Positive EBITDA but negative operating cash flow**
- What it means: EBITDA is not translating to cash. Likely causes: growing AR (confirmed above), increasing prepaid expenses, or accrued revenues that are not being collected.
- Action: Build an EBITDA-to-cash bridge. Identify every item consuming the gap. If the gap is widening, the business is not generating real economic value despite "profitability."
- Severity: HIGH. Cash is truth. EBITDA is opinion.

**Red Flag 4: Customer concentration -- 55% in top 3**
- What it means: Losing any one of these customers would be catastrophic. This is a business risk that directly impacts valuation.
- Action: Review contracts for each of the top 3. Check renewal dates, terms, and relationship health. Determine if there are long-term contracts or if they can leave at any time. Apply a concentration discount to the valuation (typically 10-20% haircut).
- Severity: MEDIUM-HIGH. Acceptable only with long-term contracts and relationship evidence.

**Red Flag 5: Capitalization of previously expensed development costs**
- What it means: By capitalizing $500K instead of expensing it, they inflated EBITDA by $500K. If this is new behavior, it suggests they are managing earnings -- making the P&L look better for the acquisition.
- Action: Recalculate EBITDA with the $500K expensed. Ask for their capitalization policy and what changed. Check if the costs meet the ASC 350-40 criteria for capitalization (technological feasibility, probable future benefit).
- Severity: HIGH. This is a classic pre-acquisition earning management technique.

**Summary for the deal team:**
"We have identified five red flags that collectively suggest the target's financial performance may be weaker than presented. Before proceeding, we need: (1) full AR aging, (2) historical gross margin on a consistent methodology, (3) EBITDA-to-cash bridge, (4) customer contract detail for top 3, and (5) capitalization policy documentation. Recommend reducing the valuation multiple by 15-25% to reflect these risks until diligence resolves them."

---

## SCENARIO 7: SaaS METRICS DEEP DIVE

**Situation:**
Your company reports these metrics:
- ARR: $10M
- ARR last year: $6M (67% growth)
- New ARR: $5.5M
- Churned ARR: $1.2M
- Expansion ARR: $1.7M (from existing customers)

Something does not add up. Identify the issue and correct it.

### Model Response

**The math check:**
```
Beginning ARR:     $6.0M
+ New ARR:         $5.5M
+ Expansion ARR:   $1.7M
- Churned ARR:     $1.2M
= Ending ARR:      $12.0M
```

But reported ending ARR is $10M. That is a $2M discrepancy.

**Possible explanations:**
1. **Contraction ARR is missing**: Customers who downgraded (reduced spend) but did not fully churn. The $2M gap is likely contraction revenue.
2. **Churn is understated**: Actual churn may be $3.2M, not $1.2M. Someone may have classified churned customers as "paused."
3. **New ARR includes bookings not yet live**: $5.5M may include contracts signed but not yet deployed.

**Corrected waterfall (most likely):**
```
Beginning ARR:      $6.0M
+ New ARR:          $5.5M
+ Expansion ARR:    $1.7M
- Contraction ARR:  ($2.0M)  <-- the missing category
- Churned ARR:      ($1.2M)
= Ending ARR:       $10.0M
```

**Impact on metrics:**
```
Gross Revenue Retention:  ($6.0M - $1.2M - $2.0M) / $6.0M = 46.7%  <-- VERY concerning
Net Revenue Retention:    ($6.0M - $1.2M - $2.0M + $1.7M) / $6.0M = 75%  <-- Below benchmark
```

If contraction is indeed $2M, this company has a serious retention problem masked by strong new logo acquisition. The 67% topline growth hides the fact that the existing customer base is shrinking.

**Board recommendation:**
"We need to immediately understand why existing customers are contracting. A 46.7% gross retention rate means we are losing more than half of every cohort's revenue. Growth is masking this, but if new logo acquisition slows even slightly, total ARR could decline."

---

## SCENARIO 8: VENDOR EVALUATION -- BUILD VS. BUY

**Situation:**
Your engineering team wants to build an internal billing system. The estimated cost is $300K in engineering time (3 engineers x 4 months). The alternative is a SaaS billing platform at $60K/year.

**Challenge:**
Build the financial analysis for the build vs. buy decision.

### Model Response

**5-Year Total Cost of Ownership:**

```
BUILD:
  Initial development:           $300K
  Ongoing maintenance (20%/yr):  $60K/yr x 4 years = $240K
  Opportunity cost of engineers:  $300K (what else could they build?)
  5-Year Total:                  $840K + opportunity cost

BUY:
  Annual subscription:           $60K x 5 = $300K
  Implementation:                $25K (one-time)
  Integration maintenance:       $15K/yr x 5 = $75K
  5-Year Total:                  $400K
```

**But cost is not the full picture. Decision matrix:**

| Factor | Build | Buy | Weight |
|--------|-------|-----|--------|
| 5-Year TCO | $840K+ | $400K | 25% |
| Time to value | 4 months | 2 weeks | 20% |
| Customization | Full control | Limited to platform | 15% |
| Maintenance burden | Internal team | Vendor handles | 15% |
| Feature evolution | You fund all R&D | Shared across customers | 10% |
| Vendor risk | None | Vendor could raise prices or sunset | 10% |
| Engineering focus | Diverted from core product | Stays on core product | 5% |

**Recommendation:**
Buy unless billing is a core competitive advantage (which it almost never is). The $440K savings over 5 years plus faster time to value plus engineering focus on core product makes this clear.

---

## SCENARIO 9: PRICING STRATEGY ANALYSIS

**Situation:**
Your product is priced at $500/user/month. A competitor just launched at $200/user/month with 80% of your features. Your sales team is panicking.

**Challenge:**
How do you respond? Should you cut prices?

### Model Response

**Step 1: Understand the competitive threat**
- Which 20% of features are they missing? Are they the 20% that matter to your customers?
- Who are they targeting? Same segment or different?
- Is their pricing sustainable? (If VC-funded, they may be buying market share at a loss.)
- What is your win rate against them in actual deals? (Anecdotes are not data.)

**Step 2: Analyze the impact of price cuts**
```
Current: $500/user, 1000 users = $500K MRR, 72% gross margin
If cut to $300/user: Need 1,667 users for same MRR (67% increase in volume)
If cut to $200/user: Need 2,500 users for same MRR (150% increase in volume)

Gross margin impact at $300: Margin drops to ~53% (fixed costs spread over less revenue per user)
Gross margin impact at $200: Margin drops to ~33% (likely unsustainable)
```

**Step 3: Alternative responses**
1. **Segment**: Create a lower tier at $250/user with limited features. Compete on the low end without cannibalizing the high end.
2. **Bundle value**: Add services, support, or integrations that justify the premium.
3. **Quantify the gap**: The 20% feature difference -- what is it worth to customers? If it saves them $1,000/user/month, the $300 premium is justified.
4. **Do nothing yet**: If win rates have not actually changed, the panic is premature.

**Recommendation:**
Do NOT cut prices reactively. Instead: (1) Monitor win rates for 60 days. (2) Build a value calculator that quantifies your premium. (3) If competitive losses increase by >10%, introduce a segmented pricing tier. Never compete on price alone when you have a feature advantage.

---

## SCENARIO 10: OPERATING PLAN MISS

**Situation:**
It is the end of Q2. You are tracking 20% below the annual operating plan on revenue. Expenses are on plan. The board meets in 3 weeks.

**Challenge:**
What do you present to the board?

### Model Response

**Do NOT present:**
- Excuses
- A plan that assumes Q3-Q4 will magically be 40% above plan to catch up
- "It is a timing issue" without evidence

**DO present:**

**Slide 1: The facts**
"We are 20% below plan on revenue through Q2. Here is exactly what happened: [specific reasons -- lost 2 enterprise deals, market slowdown in segment X, delayed product launch]."

**Slide 2: What we have learned**
"The gap is driven by [root cause]. We have validated this by [evidence]. This is [structural / temporary], and here is why."

**Slide 3: Revised forecast**
Three scenarios:
- Revised base: Show a realistic H2 forecast (likely 10-15% below original annual plan)
- Upside: What happens if specific identified opportunities close
- Downside: What happens if current trends continue

**Slide 4: Actions taken**
"We have already [action 1], [action 2], [action 3]. These actions are expected to impact revenue starting in [month]."

**Slide 5: Expense adjustment**
"Given the revenue gap, we are [adjusting/maintaining] the expense plan. Here is the impact on cash runway and profitability timeline."

**Slide 6: What we need from the board**
Specific asks: introductions, strategic guidance, approval for plan changes.

---

## SCENARIO 11: TAX OPTIMIZATION FOR SAAS

**Situation:**
Your SaaS company spent $1.2M on engineering salaries this year. The CFO asks: "How much of this qualifies for the R&D tax credit?"

**Challenge:**
Walk through the R&D tax credit analysis.

### Model Response

**Qualifying activities (Section 41 of IRC):**
Must meet all four criteria:
1. Technological in nature
2. Elimination of uncertainty
3. Process of experimentation
4. Permitted purpose (new or improved function, performance, reliability, quality)

**Analysis of engineering activities:**
```
Activity                          Qualifies?    Amount      Reasoning
New feature development           Yes           $500K       Eliminates uncertainty, new functionality
Bug fixes (routine)               No            $150K       No uncertainty, maintenance
Infrastructure scaling            Maybe         $200K       Qualifies if involves technical uncertainty
UI/UX redesign                    Maybe         $100K       Qualifies if involves technical experimentation
Routine maintenance               No            $100K       No uncertainty
Integration development           Yes           $150K       New technical capability, experimentation
```

**Estimated qualifying expenditures:** $700K - $850K (depending on documentation quality)

**Credit calculation (simplified, regular method):**
```
Qualifying expenditures:     $775K (midpoint estimate)
Credit rate:                 20% (of excess over base amount)
Estimated base amount:       $400K (prior year average, simplified)
Credit:                      ($775K - $400K) x 20% = $75K

Alternative: ASC method (14% of expenditures exceeding 50% of base):
Credit:                      ($775K - $200K) x 14% = $80.5K
```

**Key requirements for claiming:**
- Contemporaneous documentation (time tracking by project)
- Technical narratives for each qualifying project
- Employee-by-employee allocation of time to qualifying activities
- Retain records for 7+ years

---

## SCENARIO 12: EQUITY COMPENSATION ANALYSIS

**Situation:**
You are hiring a VP of Engineering. They want 1% equity. Your company's 409A value is $20M. Your last preferred round valued the company at $80M.

**Challenge:**
Analyze the equity offer from both sides.

### Model Response

**Value analysis:**
```
1% of 409A value:     $200K (what it costs the employee in taxes if exercised)
1% of preferred value: $800K (what investors think it is worth)
1% at exit scenarios:
  $200M exit: $2M
  $500M exit: $5M
  $1B exit:   $10M
```

**Company perspective:**
- 409A strike price: $0.50/share (example)
- Shares for 1%: 200,000 (example on 20M share base)
- Vesting: 4 years with 1-year cliff
- Annual cost (ASC 718): ~$150K/year in stock-based compensation expense
- Dilution: 1% to existing shareholders

**Candidate perspective:**
- Paper value at preferred valuation: $800K
- Exercise cost: $200K (409A value)
- Built-in gain at exercise: $600K (taxable as ordinary income or AMT depending on timing)
- Risk: Could be worth $0 if company fails
- Liquidity: None until exit event

**Negotiation framework:**
If the candidate's market cash salary is $350K and you are offering $300K + 1% equity:
- Cash gap: $50K/year = $200K over 4-year vest
- Equity must compensate for $200K+ in cash sacrifice
- At 409A value ($200K), the equity barely covers the cash gap
- At preferred value ($800K), it is a 4x premium on the cash sacrifice
- The question is: what probability does the candidate assign to the preferred value being realized?

---

## SCORING SUMMARY

Each scenario response is scored on three dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Accuracy | 40% | Numbers are correct, formulas are sound, logic is valid |
| Methodology | 35% | Proper frameworks used, assumptions documented, work shown |
| Communication | 25% | Clear, board-ready, actionable, accessible to non-finance |

**Pass:** Average >= 4.0 across all dimensions
**Conditional Pass:** Average 3.0-3.9 with no dimension below 3
**Fail:** Average < 3.0 or any dimension below 2

---

## END OF BENCHMARK TESTS

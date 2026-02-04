# Innovation Score -- Quality Enforcement (Authoritative)

This document defines how innovation projects, ideas, and experiments are evaluated.
Every innovation initiative must be scored before it receives continued investment.

If innovation quality is not measurable, it is theater.

---

## SCORING RULES (MANDATORY)

Each innovation initiative must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate intervention required:
- **Problem Quality**
- **Customer Evidence**
- **Business Model Viability**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 under any circumstance
- Portfolio Balance is evaluated at the portfolio level, not per project

### Stage-Gate Adjustment
Innovation scoring is stage-dependent. Early-stage projects are evaluated on
Problem Quality, Solution Novelty, and Validation Speed. Late-stage projects
must score highly on Customer Evidence, Business Model Viability, and Risk Management.

| Stage | Hard Fail Dimensions | Minimum Average |
|-------|---------------------|-----------------|
| Ideation (H3) | Problem Quality | >= 3.0 |
| Validation (H2/H3) | Problem Quality, Customer Evidence | >= 3.5 |
| Scaling (H1/H2) | All three hard-fail dimensions | >= 4.0 |

---

## 1. PROBLEM QUALITY

**Question:**
Is this a problem worth solving? Is it big enough, urgent enough, and validated
with real people (not just assumed)?

### What to Evaluate
- Problem validated with real customers or users (not hypothetical)
- Market size estimated with bottom-up analysis (not just TAM from reports)
- Urgency quantified (frequency of occurrence, pain intensity, current workarounds)
- Problem is growing (trend is increasing, not declining)
- Problem is underserved (existing solutions inadequate, not just different)
- Target customer clearly defined (not "everyone")
- You can articulate why NOW is the right time (technology shift, regulation, behavior change)
- Problem owner identified (who has the budget and authority to buy a solution)

### Scoring Guide
- **5** -- Problem validated with n>=20 customer conversations, market size bottom-up estimated at >$100M, urgency demonstrated (customers actively seeking solutions), timing catalyst clearly identified, problem owner validated with budget authority
- **4** -- Problem validated with n>=10 conversations, market size estimated with reasonable methodology, urgency directionally understood, timing reasonable, problem owner identified
- **3** -- Problem assumed based on secondary research, market size from analyst reports (top-down only), urgency assumed but not measured, timing plausible but not validated
- **2** -- Problem hypothesized by team without customer input, market size guessed, urgency assumed, timing unclear, no problem owner identified
- **1** -- Solution looking for a problem, no market validation, no urgency data, no timing thesis, no customer conversations

### Hard Fail Triggers
- Score <3 = STOP. Go talk to customers before investing further.
- Zero customer conversations = automatic score of 1
- "Everyone needs this" as target market = automatic score of 2

### Problem Quality Litmus Test
Answer these questions. If you cannot, the problem is not validated:
```
1. Who has this problem? (Specific persona, not demographic)
2. How often do they experience it? (Daily? Monthly? Annually?)
3. What do they do today to solve it? (Current workaround)
4. How much does the workaround cost them? (Time, money, opportunity)
5. Why haven't existing solutions solved it? (Gap identification)
6. Why will this get worse if unsolved? (Urgency trajectory)
7. Who pays to solve this? (Budget owner)
```

---

## 2. SOLUTION NOVELTY

**Question:**
Is the approach genuinely differentiated, or is it a copycat with minor modifications?
Is the differentiation defensible over time?

### What to Evaluate
- Solution approach is distinct from existing alternatives (not a clone)
- Differentiation is based on a genuine insight (technology, process, business model, or distribution)
- Defensibility exists (network effects, data moats, switching costs, brand, IP, or regulatory advantage)
- Novel combination of existing elements counts as novelty (does not need to be pure invention)
- Solution could not have been built 3 years ago (something changed that makes it possible now)
- Differentiation is articulated in one sentence (if it takes a paragraph, it is not clear)

### Scoring Guide
- **5** -- Genuinely new approach based on unique insight, defensible moat identified and buildable, could not have existed 3 years ago, differentiation immediately obvious to customers
- **4** -- Clearly differentiated approach, defensibility plan exists, enabled by recent technology or market shift, differentiation clear after brief explanation
- **3** -- Some differentiation but incremental, defensibility weak or temporary, execution-dependent rather than insight-dependent
- **2** -- Me-too solution with minor variations, no clear defensibility, could have been built at any time, differentiation requires extensive explanation
- **1** -- Direct clone of existing solution, no differentiation, no defensibility, no unique insight

### Novelty Anti-Patterns (Score deductions)
| Anti-Pattern | Deduction | Description |
|-------------|-----------|-------------|
| "Better UI" as sole differentiator | -1 point | UI is not a moat, easily copied |
| "AI-powered" without specific capability | -1 point | AI is a tool, not a differentiator |
| Competing on price alone | -1 point | Lowest price is a race to the bottom |
| "It is like X but for Y" | -0.5 points | May be valid but requires deeper insight |

### Defensibility Framework
```
Rate each moat factor (0 = none, 1 = weak, 2 = moderate, 3 = strong):

Network Effects:     [ ] 0  [ ] 1  [ ] 2  [ ] 3
Data Advantage:      [ ] 0  [ ] 1  [ ] 2  [ ] 3
Switching Costs:     [ ] 0  [ ] 1  [ ] 2  [ ] 3
Brand/Trust:         [ ] 0  [ ] 1  [ ] 2  [ ] 3
IP/Technology:       [ ] 0  [ ] 1  [ ] 2  [ ] 3
Regulatory/Legal:    [ ] 0  [ ] 1  [ ] 2  [ ] 3
Scale Economics:     [ ] 0  [ ] 1  [ ] 2  [ ] 3

Total Moat Score: ___/21
Strong (>12) | Moderate (7-12) | Weak (<7)
```

---

## 3. VALIDATION SPEED

**Question:**
How quickly is the team testing assumptions and generating learnings? Are they
maximizing learning per unit of time and money?

### What to Evaluate
- Speed from hypothesis to test to learning is measured (not just "we are iterating")
- Learning velocity tracked (learnings per week, not just activities per week)
- Build-Measure-Learn cycle time is shrinking over time
- Team is not over-building before testing (MVP is truly minimal)
- Concierge or Wizard of Oz tests used before building technology
- Calendar-forcing functions in place (weekly learning reviews, sprint demos)
- Team can articulate top 3 learnings from last 2 weeks

### Scoring Guide
- **5** -- Weekly learning cycles, <1 week from hypothesis to data, learning velocity increasing, multiple concurrent experiments, team can list 5+ learnings from last 2 weeks
- **4** -- Bi-weekly learning cycles, 1-2 weeks from hypothesis to data, learning velocity stable, at least one active experiment, 3+ learnings from last 2 weeks
- **3** -- Monthly learning cycles, 2-4 weeks from hypothesis to data, learning velocity not tracked, experiments run sequentially, vague learnings articulated
- **2** -- Quarterly learning cycles (too slow), >4 weeks from hypothesis to data, building features instead of testing assumptions, team focused on output not learning
- **1** -- No learning cycles, building in isolation, no experiments running, no validated learnings, "we will learn when we launch"

### Learning Velocity Dashboard
```
| Week | Hypotheses Tested | Learnings Generated | Key Insight | Action Taken |
|------|-------------------|--------------------|--------------------|--------------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
```

### Speed Anti-Patterns
- Building for 3+ months before showing to a customer
- Perfecting the product before testing the market
- Running one experiment at a time when multiple could run in parallel
- Confusing activity (meetings, research, planning) with validated learning

---

## 4. EXPERIMENT QUALITY

**Question:**
Are experiments designed to test the riskiest assumption first, with falsifiable
hypotheses and clear success criteria defined before the experiment runs?

### What to Evaluate
- Riskiest assumption identified and tested first (not easiest or most comfortable)
- Hypothesis is falsifiable (defined success and failure criteria BEFORE running)
- Success criteria are quantitative (not "we will know it when we see it")
- Experiment tests one variable at a time (or is designed for multivariate analysis)
- Sample size or evidence threshold defined before running
- Negative results are valued (killing a bad idea early saves resources)
- Experiment results are shared with the team, not just the experimenter

### Scoring Guide
- **5** -- Riskiest assumption prioritized, falsifiable hypotheses with quantitative success criteria, pre-registered analysis plan, results shared and debated, negative results celebrated, assumption map maintained and updated
- **4** -- Riskiest assumption usually tested, hypotheses mostly falsifiable, success criteria defined, results shared, negative results accepted
- **3** -- Assumptions tested but not prioritized by risk, hypotheses vague, success criteria loose, results reviewed but not deeply analyzed
- **2** -- Experiments designed to confirm bias (testing easy things), hypotheses not falsifiable, success criteria defined after seeing results, negative results suppressed or rationalized
- **1** -- No structured experiments, decisions based on opinion, no hypotheses documented, no success criteria, confirmation bias rampant

### Assumption Mapping Template
```
| Assumption | Risk Level | Evidence For | Evidence Against | Test Method | Status |
|-----------|-----------|-------------|-----------------|-------------|--------|
| | [ ] H [ ] M [ ] L | | | | [ ] Untested [ ] Testing [ ] Validated [ ] Invalidated |
| | [ ] H [ ] M [ ] L | | | | [ ] Untested [ ] Testing [ ] Validated [ ] Invalidated |
| | [ ] H [ ] M [ ] L | | | | [ ] Untested [ ] Testing [ ] Validated [ ] Invalidated |
```

### Experiment Design Checklist
```
[ ] Riskiest assumption identified from assumption map
[ ] Falsifiable hypothesis written: "We believe [assumption]. If we [test], then [metric] will [threshold]."
[ ] Success criteria quantified BEFORE experiment
[ ] Failure criteria quantified BEFORE experiment
[ ] Sample size or evidence threshold defined
[ ] Timeline defined (when will we know?)
[ ] Resources allocated (time, money, people)
[ ] Results documented regardless of outcome
[ ] Assumption map updated based on results
```

---

## 5. CUSTOMER EVIDENCE

**Question:**
Is there evidence from real customers (not surveys, not opinions) that they want
this solution and are willing to pay for it?

### What to Evaluate
- Evidence comes from customer behavior, not just stated preferences
- Customers have demonstrated willingness to pay (LOI, pre-order, deposit, usage-based signal)
- Usage data shows engagement and retention (if product exists)
- Customer evidence is recent (<3 months old for fast-moving markets)
- Evidence is from target segment, not friendly beta users or investors
- Repeat usage or referrals observed (not just trial signups)
- Customer quotes available that articulate the value in their own words

### Scoring Guide
- **5** -- Paying customers exist, retention healthy, referrals happening, customers articulate value unprompted, usage data shows deep engagement, n>=50 evidence points from target segment
- **4** -- Strong letters of intent or pre-orders, pilot customers showing good engagement, customers can articulate value, n>=20 evidence points from target segment
- **3** -- Survey data positive, some pilot usage, customers interested but not committed, evidence mostly qualitative, n>=10 evidence points
- **2** -- Friends and family feedback, investor validation confused with customer validation, evidence anecdotal, n<10 evidence points
- **1** -- No customer evidence, "build it and they will come" mentality, team assumes demand based on personal experience

### Hard Fail Triggers
- Score <3 = STOP BUILDING. Get customer evidence before investing more.
- Zero paying or committed customers at Scaling stage = automatic score of 1
- "Investors love it" as customer evidence = automatic score of 2

### Evidence Hierarchy (Strongest to Weakest)
```
1. Revenue (customers paying real money)
2. Pre-orders/deposits (money committed before delivery)
3. Letters of Intent (formal commitment, not binding)
4. Active usage and retention (engagement data)
5. Pilot completion (customers finished a trial)
6. Waitlist signups with qualification data
7. Survey responses (stated preference, weakest signal)
```

### Customer Evidence Scorecard
```
| Evidence Type | Count | Recency | Segment Match | Signal Strength |
|--------------|-------|---------|---------------|-----------------|
| Paying customers | | | | |
| Pre-orders | | | | |
| LOIs | | | | |
| Active pilots | | | | |
| Qualified waitlist | | | | |
| Survey respondents | | | | |
```

---

## 6. BUSINESS MODEL VIABILITY

**Question:**
Do the unit economics work? Is the model scalable? Are margins healthy enough
to build a sustainable business?

### What to Evaluate
- Unit economics calculated (CAC, LTV, LTV:CAC ratio, payback period)
- Gross margin estimated and above 60% for software, 40% for services
- Scalability path identified (how does cost scale vs. revenue?)
- Customer acquisition channel identified (not just "marketing")
- Revenue model clear (subscription, transaction, usage, licensing)
- Path to profitability defined (even if distant)
- Assumptions documented and sensitivity analysis performed

### Scoring Guide
- **5** -- Unit economics proven with data, LTV:CAC >3:1, gross margin >70%, scalable acquisition channel validated, path to profitability clear, sensitivity analysis shows model is robust
- **4** -- Unit economics estimated with reasonable data, LTV:CAC >2:1, gross margin >60%, acquisition channel identified, path to profitability plausible
- **3** -- Unit economics hypothetical, LTV:CAC estimated but not validated, gross margin estimated, acquisition channel assumed, profitability path requires assumptions
- **2** -- Unit economics not calculated, "we will figure out monetization later," gross margin unknown, no acquisition channel identified
- **1** -- No business model, "growth first, revenue later" without a plan, no economic analysis

### Hard Fail Triggers
- Score <3 at Scaling stage = STOP. Fix the business model.
- LTV:CAC < 1:1 at any stage = automatic score of 1 (losing money on every customer)
- No revenue model defined at Validation stage = automatic score of 2

### Unit Economics Template
```
Customer Acquisition Cost (CAC): $________
  Marketing spend per customer: $________
  Sales cost per customer: $________
  Onboarding cost per customer: $________

Customer Lifetime Value (LTV): $________
  ARPU: $________ /month
  Gross Margin: ________%
  Average Lifetime: ________ months
  LTV = ARPU x Gross Margin x Avg Lifetime

LTV:CAC Ratio: ________
  Target: >3:1 for venture scale, >2:1 minimum viable

Payback Period: ________ months
  Target: <18 months B2B, <6 months B2C

Monthly Burn Rate: $________
Runway: ________ months
```

---

## 7. RISK MANAGEMENT

**Question:**
Are kill criteria defined? Are pivot options identified? Are investments reversible
where possible?

### What to Evaluate
- Kill criteria defined BEFORE investing (not after hope runs out)
- Pivot options identified (if Plan A fails, what are Plans B and C?)
- Investment reversibility assessed (can you recover resources if this fails?)
- Sunk cost bias actively mitigated (regular kill/continue reviews)
- Risk register maintained with mitigation plans
- Team has psychological safety to recommend killing a project
- Stage gates enforced (no skipping gates, no "just one more month")

### Scoring Guide
- **5** -- Kill criteria quantified and pre-committed, 2+ pivot options identified with triggers, investments mostly reversible, regular kill reviews conducted, team has successfully killed projects before, risk register current
- **4** -- Kill criteria defined, at least one pivot option identified, investment reversibility considered, kill reviews scheduled, risk register exists
- **3** -- Kill criteria vague ("if it does not work out"), no concrete pivot options, investment reversibility not assessed, kill reviews informal, risk register incomplete
- **2** -- No kill criteria, "we are committed" mentality, all investments irreversible, no kill mechanism, project continuation is default, no risk register
- **1** -- Active resistance to killing projects, sunk cost fallacy dominant, no pivot thinking, escalation of commitment pattern, risks ignored

### Kill Criteria Template
```
This project will be killed if:
1. By [date]: [metric] has not reached [threshold]
2. By [date]: [metric] has not reached [threshold]
3. Total investment exceeds $[amount] without [milestone]
4. [Qualitative trigger]: ________________________________

This project will pivot if:
1. [Trigger]: Pivot to [alternative approach]
2. [Trigger]: Pivot to [alternative market]
3. [Trigger]: Pivot to [alternative business model]
```

### Investment Reversibility Assessment
```
| Investment | Amount | Reversible? | Recovery if Killed | Notes |
|-----------|--------|-------------|-------------------|-------|
| Engineering time | | [ ] Yes [ ] Partial [ ] No | | |
| Hardware/infra | | [ ] Yes [ ] Partial [ ] No | | |
| Partnerships | | [ ] Yes [ ] Partial [ ] No | | |
| Hiring | | [ ] Yes [ ] Partial [ ] No | | |
| IP/patents | | [ ] Yes [ ] Partial [ ] No | | |
```

---

## 8. PORTFOLIO BALANCE

**Question:**
Is the innovation portfolio balanced across time horizons, risk levels, and
investment types? Or are all bets concentrated?

### What to Evaluate
- Portfolio mapped to three horizons (H1: core, H2: adjacent, H3: transformational)
- Investment allocation matches strategic intent (not all on one horizon)
- Risk diversification across projects (different markets, technologies, models)
- Project count appropriate (not too few, not too many)
- Resource allocation matches portfolio balance (not starving H2/H3 for H1)
- Regular portfolio rebalancing occurs (quarterly at minimum)
- Each project has a clear horizon assignment

### Scoring Guide
- **5** -- 70/20/10 allocation (or deliberate variation) across H1/H2/H3, diversified across risk factors, appropriate project count (5-15 active), quarterly rebalancing, every project clearly assigned and reviewed
- **4** -- Reasonable horizon allocation, some diversification, adequate project count, regular rebalancing, most projects clearly assigned
- **3** -- Imbalanced but not extreme, limited diversification, project count may be off, rebalancing irregular, some projects unclear on horizon
- **2** -- Heavily concentrated (>80% on one horizon), minimal diversification, too many or too few projects, no rebalancing, horizon assignment arbitrary
- **1** -- All bets on one horizon, no diversification, project count wildly inappropriate, no portfolio management discipline, no horizon thinking

### Evaluated at Portfolio Level
Note: This dimension is scored at the portfolio level, not per project.
Individual projects contribute to portfolio balance but are not scored independently.

### Horizon Allocation Target
```
Horizon 1 (Core Business): 70% of innovation investment
  - Extensions and improvements to existing products
  - Low risk, predictable returns
  - Timeline: 0-12 months

Horizon 2 (Adjacent): 20% of innovation investment
  - New capabilities built on existing strengths
  - Moderate risk, higher potential returns
  - Timeline: 12-36 months

Horizon 3 (Transformational): 10% of innovation investment
  - New markets, new technologies, new business models
  - High risk, highest potential returns
  - Timeline: 36-72 months
```

### Portfolio Dashboard
```
| Project | Horizon | Stage | Investment | Expected Return | Risk Level | Status |
|---------|---------|-------|-----------|-----------------|-----------|--------|
| | | | | | | |
| | | | | | | |
| | | | | | | |

Allocation: H1: ___% | H2: ___% | H3: ___%
Target:     H1: 70%  | H2: 20%  | H3: 10%
Delta:      _________ | _________ | _________
```

---

## FINAL INNOVATION SCORE DECISION

**Hard Fail Dimensions (Problem Quality, Customer Evidence, Business Model Viability):**
- Score <3 = **IMMEDIATE INTERVENTION REQUIRED**
- Stage-adjusted thresholds apply (see Stage-Gate Adjustment table)

**All Dimensions:**
- Average score >= 4.0 = **INNOVATION MAY PROCEED** (continue investment)
- Average score 3.0-3.9 = **INNOVATION NEEDS IMPROVEMENT** (reduce investment, increase learning)
- Average score < 3.0 = **INNOVATION REJECTED** (kill or major pivot)

**Portfolio Balance:**
- Evaluated at portfolio level, not per project
- Score N/A for individual project reviews

### Score Card Template

```markdown
## Innovation Score: [Project/Initiative Name]

Stage: [ ] Ideation  [ ] Validation  [ ] Scaling
Horizon: [ ] H1 (Core)  [ ] H2 (Adjacent)  [ ] H3 (Transformational)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Problem Quality | /5 | |
| Solution Novelty | /5 | |
| Validation Speed | /5 | |
| Experiment Quality | /5 | |
| Customer Evidence | /5 | |
| Business Model Viability | /5 | |
| Risk Management | /5 | |
| Portfolio Balance | /5 or N/A | |

**Average Score:** ___
**Hard Fail Dimensions Below 3:** [ ] Yes [ ] No
**Stage-Appropriate Threshold Met:** [ ] Yes [ ] No
**Verdict:** PROCEED / IMPROVE / KILL / PIVOT
**Key Risks:** [if any]
**Required Actions:** [if any]
**Kill Criteria:** [defined for next review]
**Next Review Date:** [mandatory]
```

---

## INNOVATION HEALTH CADENCE

### Monthly Innovation Review
1. Score all active innovation projects
2. Review experiment pipeline and results
3. Update assumption maps for each project
4. Check learning velocity across projects
5. Identify projects approaching kill criteria

### Quarterly Portfolio Review
1. Full portfolio balance assessment
2. Rebalance allocation across horizons
3. Kill underperforming projects (enforce kill criteria)
4. Review innovation pipeline for gaps
5. Update competitive landscape for novelty assessment

### Annual Innovation Audit
1. Calculate ROI on innovation portfolio
2. Review all kill decisions (were they correct?)
3. Assess overall innovation culture health
4. Update InnovationScore.md dimensions if needed
5. Benchmark against industry innovation metrics

---

## ENFORCEMENT RULE

Innovation quality is enforced, not hoped for.
Do not fund unvalidated assumptions.
Do not invest without kill criteria.
Do not confuse activity with learning.
Kill fast, learn faster, invest wisely.

---

## END OF INNOVATION SCORE

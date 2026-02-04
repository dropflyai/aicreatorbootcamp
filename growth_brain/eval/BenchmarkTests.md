# Growth Brain — Benchmark Tests (Authoritative)

These benchmark scenarios test the Growth Brain's ability to diagnose, design,
analyze, and execute growth strategies. Each scenario must be answered with
rigor, specificity, and data-driven reasoning.

Vague answers fail. Hand-waving fails. "It depends" without follow-up fails.

---

## HOW TO USE THESE BENCHMARKS

1. Present a scenario to the Growth Brain
2. Evaluate the response against the provided evaluation criteria
3. Score each response from 1-5 using the scoring rubric
4. A passing score is 4+ on every scenario
5. Any scenario scoring <3 indicates a critical knowledge gap

### Scoring Rubric

| Score | Meaning |
|-------|---------|
| 5 | Expert-level response. Specific, data-driven, actionable, considers edge cases |
| 4 | Strong response. Specific and actionable with minor gaps |
| 3 | Adequate response. Directionally correct but lacks specificity or rigor |
| 2 | Weak response. Vague, generic, or missing key elements |
| 1 | Failing response. Incorrect, dangerous advice, or pure hand-waving |

---

## SCENARIO 1: RETENTION CURVE DIAGNOSIS

**Prompt:**
"Your D30 retention curve flattens at 20%. Is this good or bad? What do you do?"

**Evaluation Criteria:**
- Does the response ask what type of product this is? (Consumer vs B2B vs marketplace)
- Does it reference industry benchmarks for context?
- Does it distinguish between "flattening" (good signal) and "flattening at 20%" (context-dependent)?
- Does it propose cohort-level analysis to see if newer cohorts are improving?
- Does it investigate what the retained 20% are doing differently from the churned 80%?
- Does it propose specific next steps (not just "improve onboarding")?
- Does it consider whether the 20% represents the right users (ICP alignment)?

**Expected Elements:**
1. Context matters: 20% D30 is strong for consumer social, weak for B2B SaaS
2. Flattening is the important signal (indicates a habit has formed)
3. Behavioral cohort analysis: what do retained users do that churned users do not?
4. Segment analysis: is retention higher for users from specific channels or personas?
5. Activation analysis: what % of retained users hit the aha moment?
6. Specific experiment proposals to improve the flatten point upward

---

## SCENARIO 2: B2B VIRAL LOOP DESIGN

**Prompt:**
"Design a viral loop for a B2B SaaS product (project management tool, 500 customers, $200/mo average). Show the math."

**Evaluation Criteria:**
- Does it identify that traditional viral loops are harder in B2B?
- Does it propose a loop that leverages the product's natural collaboration mechanics?
- Does it calculate K-factor with realistic conversion rates at each step?
- Does it show the math for loop impact on total acquisition?
- Does it consider multiple loop types (invite-driven, content-driven, integration-driven)?
- Does it address the difference between seat expansion (within account) and new account acquisition?

**Expected Elements:**
1. Loop structure with each step and conversion rate
2. K-factor calculation: K = invites per user x conversion rate per invite
3. Realistic B2B conversion rates (lower than consumer, typically 5-15% per invite)
4. Net new accounts generated per month from the loop
5. Timeline to meaningful loop contribution
6. Comparison to current acquisition channels
7. At least one non-invite loop (e.g., content/template sharing, integration marketplace)

**Sample Math Framework:**
```
Active users: 500 accounts x 5 users avg = 2,500 users
Invite rate: 30% of users invite at least 1 person per quarter
Invites sent: 2,500 x 0.30 = 750 invites per quarter
Accept rate: 15% of invites convert to trial
New trials from loop: 750 x 0.15 = 112 trials per quarter
Trial-to-paid: 25%
New paid accounts from loop: 112 x 0.25 = 28 per quarter
K-factor per quarter: 28 / 500 = 0.056 (very low, typical for B2B)
```

---

## SCENARIO 3: ACTIVATION RATE DIAGNOSIS

**Prompt:**
"Your activation rate is 35%. Diagnose using the activation funnel and propose 3 experiments."

**Evaluation Criteria:**
- Does it define what "activation" means for this product (or ask)?
- Does it break down the funnel into specific steps with drop-off at each step?
- Does it identify the biggest drop-off point as the priority?
- Are the 3 experiments specific, measurable, and targeted at the bottleneck?
- Does each experiment have a hypothesis in proper format?
- Does it estimate expected impact of each experiment?

**Expected Elements:**
1. Funnel breakdown: Signup -> Setup Step 1 -> Setup Step 2 -> Aha Moment -> Habit
2. Identification of the largest drop-off step
3. Behavioral analysis: what distinguishes activated vs non-activated users?
4. Three experiments with:
   - Proper hypothesis format
   - Target metric
   - Expected impact
   - Implementation complexity
   - Priority ranking
5. Timeline for running experiments

---

## SCENARIO 4: PAID VS ORGANIC REBALANCING

**Prompt:**
"Your startup is 85% paid acquisition, 15% organic. CAC is $120, LTV is $360. The board wants you to get to 50% organic in 12 months. Create the plan."

**Evaluation Criteria:**
- Does it acknowledge the challenge (shifting from 85% paid to 50% organic is massive)?
- Does it create a phased plan with milestones?
- Does it identify which organic channels to invest in and why?
- Does it calculate the math: how many organic users needed month-by-month?
- Does it address the revenue risk during the transition?
- Does it propose maintaining paid while building organic (not just cutting paid)?

**Expected Elements:**
1. Current state analysis: monthly acquisition by channel, cost structure
2. Target state math: if 1000 users/month, need 500 organic (currently 150)
3. Channel strategy: SEO, content, referral, community, partnerships
4. Timeline: Month 1-3 (invest), Month 4-6 (early returns), Month 7-12 (compounding)
5. Budget reallocation plan (shift $ from paid to organic programs)
6. Risk mitigation: do not cut paid until organic replaces the volume
7. Leading indicators to track monthly progress
8. Contingency plan if organic growth is slower than expected

---

## SCENARIO 5: EXPERIMENT VELOCITY CRISIS

**Prompt:**
"Your growth team has run 2 experiments in the last month. Both were inconclusive. The CEO is frustrated. Diagnose and fix."

**Evaluation Criteria:**
- Does it diagnose WHY experiments were inconclusive (sample size, effect size, duration)?
- Does it diagnose WHY velocity is low (2/month is below target)?
- Does it separate the velocity problem from the conclusiveness problem?
- Does it propose systemic fixes, not just "run more experiments"?
- Does it address the CEO's frustration with appropriate framing?

**Expected Elements:**
1. Inconclusive diagnosis: Were experiments underpowered? Wrong metric? Effect too small?
2. Velocity diagnosis: What is blocking faster experimentation?
3. Process fixes: feature flags, experiment framework, automated analysis
4. Quality fixes: better hypothesis formation, power analysis before launch
5. Portfolio approach: mix of big bets and quick wins
6. Communication framework for sharing learnings (not just wins) with CEO
7. 30-day action plan to get to 3+ experiments/week

---

## SCENARIO 6: GROWTH MODEL STRESS TEST

**Prompt:**
"Your growth model projects 10x revenue in 18 months. The model shows: 5x from new user acquisition, 3x from ARPU increase, 2x from retention improvement. Stress test this model."

**Evaluation Criteria:**
- Does it challenge each multiplier independently?
- Does it identify the compounding assumption risk?
- Does it ask what current acquisition, ARPU, and retention look like?
- Does it propose scenario analysis (base, optimistic, pessimistic)?
- Does it flag if the model requires heroic assumptions?

**Expected Elements:**
1. Decompose the 10x: 5 x 3 x 2 = 30x, not 10x (multiplicative vs additive)
2. Challenge each lever:
   - 5x acquisition: requires channel expansion or massive conversion improvement
   - 3x ARPU: requires new pricing tiers, upsell paths, or market move
   - 2x retention: realistic but impactful (what is current retention?)
3. Historical validation: has the company ever achieved these growth rates?
4. Sensitivity analysis: what if each lever achieves only 50% of target?
5. Dependency mapping: does ARPU increase depend on acquisition quality?
6. Timeline reality check: is 18 months realistic for all three levers?
7. Resource requirements: what team, budget, and infrastructure needed?

---

## SCENARIO 7: FREEMIUM CONVERSION OPTIMIZATION

**Prompt:**
"Your freemium product has 100K free users and 2% convert to paid ($29/mo). Design a strategy to get to 5% conversion without reducing free user satisfaction."

**Evaluation Criteria:**
- Does it analyze who currently converts and why?
- Does it propose value-based limits (not arbitrary restrictions)?
- Does it consider the constraint (cannot reduce free user satisfaction)?
- Does it show the revenue math?
- Does it propose experiments rather than just shipping changes?

**Expected Elements:**
1. Current state: 100K free, 2K paid, $58K MRR
2. Target state: 100K free, 5K paid, $145K MRR (+$87K MRR)
3. Behavioral analysis: what do paid users do that free users do not?
4. Strategy options: value gates, usage limits, team features, integrations
5. At least 3 specific experiments with expected conversion lift
6. Guardrail metrics: free user activation, engagement, NPS
7. Phased rollout plan
8. Revenue projection by month

---

## SCENARIO 8: CHURN SPIKE RESPONSE

**Prompt:**
"Monthly churn jumped from 3% to 7% this month. You have 24 hours before the board meeting. What do you do?"

**Evaluation Criteria:**
- Does it prioritize diagnosis over action in the first hours?
- Does it propose a systematic diagnosis framework?
- Does it identify possible causes (product, pricing, competitor, seasonal, data)?
- Does it prepare a board communication strategy?
- Does it distinguish between fixable and structural churn?

**Expected Elements:**
1. Immediate triage (first 2 hours):
   - Is the data correct? (Instrumentation, billing system, delinquent vs voluntary)
   - Is it concentrated in a segment? (Cohort, channel, plan, geography)
   - Did something change? (Product release, pricing change, competitor launch)
2. Root cause analysis (hours 2-12):
   - Survey/interview recently churned users
   - Analyze behavior of churned users in prior 30 days
   - Check health score accuracy (did health scores predict this?)
3. Board communication (hours 12-24):
   - Honest assessment of what happened
   - Root cause (or top 3 hypotheses if unknown)
   - Immediate actions taken
   - 30-day plan to address
4. Response plan with specific actions and owners

---

## SCENARIO 9: MARKETPLACE COLD START

**Prompt:**
"You are launching a two-sided marketplace (service providers and consumers). You have zero users on both sides. Design the growth strategy for the first 1,000 transactions."

**Evaluation Criteria:**
- Does it address the chicken-and-egg problem explicitly?
- Does it choose which side to seed first and explain why?
- Does it propose a concentrated geographic or category strategy?
- Does it define what a "transaction" means and target quality?
- Does it plan for different phases (seed, launch, grow)?

**Expected Elements:**
1. Side selection: which side to recruit first and why
2. Seeding strategy: how to get first 50 supply-side participants
3. Concentrated launch: one geography, one category, or one use case
4. Demand generation for first transactions
5. Quality metrics from day one (not just volume)
6. Transition plan from manual to organic matching
7. Liquidity metrics: time-to-match, fill rate, utilization
8. Timeline and milestones: Week 1-2, Month 1, Month 2-3

---

## SCENARIO 10: PRICING EXPERIMENT DESIGN

**Prompt:**
"You want to test a 30% price increase on your SaaS product ($50/mo to $65/mo). Design the experiment."

**Evaluation Criteria:**
- Does it address the unique challenges of pricing experiments?
- Does it consider both new user and existing user impacts?
- Does it handle the ethical and practical issues of showing different prices?
- Does it define metrics beyond just conversion rate?
- Does it consider long-term effects (LTV, not just initial conversion)?

**Expected Elements:**
1. Experiment design that avoids showing different prices to similar users simultaneously
2. Grandfathering strategy for existing customers
3. Metrics: conversion rate, ARPU, LTV, cancellation rate, support ticket volume
4. Timeline: pricing experiments need longer duration (LTV impact takes months)
5. Segment analysis: willingness-to-pay varies by segment
6. Communication strategy: how to announce price change if successful
7. Rollback plan: how to handle users who paid higher price if reverted
8. Van Westendorp or conjoint analysis as pre-experiment validation

---

## SCENARIO 11: REFERRAL PROGRAM DESIGN

**Prompt:**
"Design a referral program for a $99/mo B2B SaaS tool with 2,000 paying customers and no current referral mechanism."

**Evaluation Criteria:**
- Does it calculate the economics (how much can you afford to pay per referral)?
- Does it design incentives for BOTH referrer and referee?
- Does it consider B2B-specific dynamics (longer sales cycles, multiple stakeholders)?
- Does it define the mechanics (single-sided, double-sided, tiered)?
- Does it project expected results?

**Expected Elements:**
1. Economics: LTV-based incentive cap calculation
2. Incentive design: referrer and referee incentives
3. Mechanics: how invites are sent, tracked, and rewarded
4. Fraud prevention: how to prevent gaming
5. Integration: where in the product the referral surfaces
6. Launch plan: beta with power users, then general availability
7. Metrics: invites sent, invite-to-signup, signup-to-paid, K-factor
8. Projected results: expected referrals per month at steady state

---

## SCENARIO 12: GROWTH TEAM STRUCTURE

**Prompt:**
"You are the first growth hire at a Series A startup ($2M ARR, 15 employees). The CEO asks you to build a growth team. What is your hiring plan for the next 12 months?"

**Evaluation Criteria:**
- Does it consider the current stage and resources?
- Does it propose a realistic hiring timeline?
- Does it define what the growth team owns vs does not own?
- Does it address the build-vs-hire decision for analytics and engineering?

**Expected Elements:**
1. Month 1-3: growth lead does everything (IC mode)
2. First hire recommendation (likely growth engineer or analyst)
3. 12-month team plan: 3-5 people maximum at Series A
4. Role definitions: growth engineer, growth analyst, growth marketer
5. What growth team owns: experimentation, funnel optimization, loops
6. What growth team does NOT own: brand marketing, sales, product strategy
7. Collaboration model with engineering, product, and marketing
8. Success metrics for the growth team itself

---

## SCENARIO 13: NEGATIVE EXPERIMENT RESULT

**Prompt:**
"Your experiment to add social proof (customer logos and testimonials) to the pricing page decreased conversion by 8% (statistically significant, p<0.01). Explain this result and recommend next steps."

**Evaluation Criteria:**
- Does it propose plausible explanations for the counterintuitive result?
- Does it avoid dismissing the data?
- Does it propose follow-up analysis before drawing conclusions?
- Does it recommend next steps that leverage the learning?

**Expected Elements:**
1. Possible explanations: distraction, wrong social proof, trust mismatch, visual clutter
2. Segment analysis: did it hurt all segments or just some?
3. Qualitative follow-up: user testing to understand why
4. The learning: social proof is not universally positive
5. Next experiments: test different social proof types, placements, formats
6. Meta-learning: update priors about this page and audience

---

## SCENARIO 14: PRODUCT-LED GROWTH TRANSITION

**Prompt:**
"Your company is sales-led ($5M ARR, 200 enterprise customers, $25K average ACV). The board wants to add a PLG motion to reach SMBs. Design the strategy."

**Evaluation Criteria:**
- Does it acknowledge the difficulty of running dual motions?
- Does it propose a product that works for self-serve?
- Does it address pricing, packaging, and the free tier question?
- Does it define the SMB ICP separately from enterprise?
- Does it plan for cannibalization risk?

**Expected Elements:**
1. SMB ICP definition: who are they, what do they need, how do they buy?
2. Product strategy: stripped-down version vs separate product vs freemium tier
3. Pricing: self-serve pricing that does not cannibalize enterprise
4. Funnel: PLG funnel (signup -> activate -> convert) vs sales funnel
5. Metrics: separate PLG metrics from sales metrics
6. Team: dedicated PLG team or shared resources?
7. Timeline: 6-12 month plan with milestones
8. Cannibalization guardrails

---

## SCENARIO 15: GROWTH AUDIT

**Prompt:**
"You are brought in to audit a startup's growth function. They are at $1M ARR, growing 10% month-over-month, with 5,000 users. They feel growth is 'stuck.' Conduct the audit."

**Evaluation Criteria:**
- Does it define what "stuck" means quantitatively?
- Does it examine all growth levers systematically?
- Does it produce a prioritized list of findings?
- Does it recommend specific, actionable improvements?

**Expected Elements:**
1. Framework: acquisition, activation, retention, monetization, referral
2. For each lever: current metrics, benchmarks, gap analysis
3. Cohort analysis: are newer cohorts better or worse?
4. Channel analysis: which channels are working, which are saturating?
5. Activation audit: is the aha moment defined and optimized?
6. Retention audit: cohort curves, churn reasons, resurrection
7. Monetization audit: pricing, packaging, expansion revenue
8. Top 3 prioritized recommendations with expected impact
9. 90-day action plan

---

## SCENARIO 16: SEASONAL GROWTH PLANNING

**Prompt:**
"Your e-commerce SaaS tool sees 3x traffic in Q4 (holiday season) but most of those users churn by February. Design a strategy to retain Q4 users."

**Evaluation Criteria:**
- Does it acknowledge the seasonal pattern is normal but improvable?
- Does it propose strategies BEFORE, DURING, and AFTER the season?
- Does it define what success looks like (realistic retention improvement)?
- Does it address the onboarding challenge at scale?

**Expected Elements:**
1. Pre-season: onboarding optimization, activation flow for seasonal users
2. During season: engagement triggers, value demonstration, habit formation
3. Post-season: re-engagement campaigns, value prop pivot for off-season
4. Retention target: improve D90 post-Q4 from X% to Y%
5. Segment seasonal users by intent (one-time vs potential long-term)
6. Specific experiments for each phase
7. Success metrics and measurement plan

---

## BENCHMARK SCORING TEMPLATE

```
## Growth Brain Benchmark Results
## Date: [YYYY-MM-DD]
## Evaluator: [Name]

| # | Scenario | Score (1-5) | Key Gaps |
|---|----------|-------------|----------|
| 1 | Retention Curve Diagnosis | _ | |
| 2 | B2B Viral Loop Design | _ | |
| 3 | Activation Rate Diagnosis | _ | |
| 4 | Paid vs Organic Rebalancing | _ | |
| 5 | Experiment Velocity Crisis | _ | |
| 6 | Growth Model Stress Test | _ | |
| 7 | Freemium Conversion | _ | |
| 8 | Churn Spike Response | _ | |
| 9 | Marketplace Cold Start | _ | |
| 10 | Pricing Experiment Design | _ | |
| 11 | Referral Program Design | _ | |
| 12 | Growth Team Structure | _ | |
| 13 | Negative Experiment Result | _ | |
| 14 | PLG Transition | _ | |
| 15 | Growth Audit | _ | |
| 16 | Seasonal Growth Planning | _ | |

**Average Score:** _
**Scenarios Below 3:** [List]
**Critical Gaps:** [Summary]

### Verdict
- [ ] PASS — All scenarios >= 4
- [ ] CONDITIONAL — Average >= 3.5, remediation plan for gaps
- [ ] FAIL — Any scenario < 3 or average < 3.5
```

---

**These benchmarks are authoritative. A Growth Brain that cannot pass them is not ready.**
**Growth is a discipline. These scenarios test whether the discipline is present.**

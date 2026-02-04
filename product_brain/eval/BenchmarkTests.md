# BenchmarkTests.md -- PhD-Level Product Management Challenges

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Product Brain / CEO Brain
> Purpose: The Product Brain must answer these questions correctly to
> demonstrate competence beyond what a typical product manager can do.
> Each question tests a specific advanced skill. Model answers are provided
> as the minimum acceptable response. The Product Brain should match or
> exceed these answers.

---

## How to Use These Benchmarks

1. Present the scenario to the Product Brain without the model answer.
2. Score the response against the model answer using the ProductScore rubric.
3. A passing response must address all key points in the model answer.
4. A superior response addresses the key points PLUS adds considerations
   not in the model answer.
5. Record pass/fail and notes in the Accountability Protocol.
6. Re-test quarterly or when the Product Brain is updated.

---

## Test 1: Metric Paradox -- North Star Up, Retention Down

**Scenario:** Your North Star metric (weekly active users) has increased 15%
over the past quarter. However, 30-day retention has dropped from 45% to 38%
over the same period. The CEO is celebrating the North Star growth. You need
to present at the next board meeting. What do you do?

**Model Answer:**

The North Star growth is masking a serious underlying problem. WAU can grow
even as retention declines if acquisition is growing faster than churn. This
is a leaky bucket.

**Key points that must be addressed:**
1. Decompose WAU into components: new users + retained users + resurrected users.
   Identify which component is driving growth.
2. If acquisition is driving growth, this is unsustainable. At some point,
   acquisition channels saturate or become more expensive.
3. Calculate the "steady state" -- if acquisition stopped growing, where would
   WAU stabilize given current retention? This is the real health indicator.
4. Segment retention by cohort. Is retention declining for all cohorts or just
   newer ones? If newer cohorts retain worse, the product-market fit for the
   new audience may be weaker.
5. Check for quality-of-activation issues. Are new users onboarding properly?
6. Present to the board with BOTH metrics side by side. Frame it as:
   "Growth is strong AND we have a retention risk. Here is our plan to address
   the retention risk before it undermines growth."
7. Propose specific retention interventions with timelines and metrics.
8. Set a guardrail metric: if retention drops below 35%, pause acquisition
   spending to fix the leaky bucket.

**Automatic fail if:** The response celebrates the North Star without
investigating the retention decline, or treats them as unrelated metrics.

---

## Test 2: Revenue Customer vs. Roadmap Conflict

**Scenario:** Your largest customer (40% of revenue) has submitted 3 feature
requests. None of them are on your roadmap. They have not threatened to churn,
but your champion at the company mentioned they are "evaluating alternatives."
How do you handle this?

**Model Answer:**

This is a customer concentration risk compounded by a roadmap integrity
challenge. The worst outcomes are: (a) losing the customer, or (b) becoming
a custom development shop for one customer.

**Key points that must be addressed:**
1. IMMEDIATE: Schedule a call with the customer champion AND their decision-maker.
   Understand the urgency and business context behind each request. "Evaluating
   alternatives" is a soft churn signal that must be investigated.
2. ASSESS: For each feature request, evaluate:
   - Do other customers also need this? (If yes, it may belong on the roadmap.)
   - Is this a symptom of a broader need we should solve differently?
   - What is the effort and what does it displace?
3. CUSTOMER CONCENTRATION: 40% revenue concentration is itself a risk. The
   strategic response includes diversifying revenue so no single customer has
   this much leverage. This is a business-level issue to raise with leadership.
4. NEGOTIATE: Do not say yes to all 3. Propose: "We will build Feature A
   (aligns with roadmap direction), we will partner with you on Feature B
   (co-design for mutual benefit), and Feature C does not align with our
   platform direction -- here is an alternative approach using our API/integrations."
5. ROADMAP INTEGRITY: Document the decision and rationale. If you adjust the
   roadmap, communicate the trade-offs to all stakeholders (what gets delayed).
6. CONTRACT: Explore whether the customer will commit to a longer contract
   or expansion in exchange for prioritization. Align incentives.
7. FUTURE PREVENTION: Establish a customer advisory board process so large
   customer input is systematized, not reactive.

**Automatic fail if:** Response is either "build all 3 features because they
are 40% of revenue" or "ignore the customer because the roadmap is sacred."

---

## Test 3: Pricing Cannibalization Experiment

**Scenario:** You want to introduce a new pricing tier between your Free and
Pro plans. The concern is that it will cannibalize Pro plan upgrades. Design
an experiment to test this.

**Model Answer:**

**Key points that must be addressed:**
1. HYPOTHESIS: "Introducing a Mid tier at $X/month will increase total revenue
   by capturing users who would otherwise stay on Free, and the cannibalization
   of Pro will be less than the new revenue from Mid."
2. SEGMENTATION: You cannot A/B test pricing easily (customers talk). Instead:
   - Geographic split test (different pricing in different markets).
   - New-user-only test (existing users keep current pricing, new users see
     new tiers).
   - Conjoint analysis survey to estimate willingness-to-pay and tier preference
     before any live test.
3. METRICS TO TRACK:
   - Primary: Total ARPU across all tiers (not just Mid tier revenue).
   - Secondary: Pro conversion rate (to detect cannibalization).
   - Counter-metric: Free-to-paid conversion rate (should increase).
   - Guardrail: Customer satisfaction (NPS or CSAT) should not decrease.
4. DURATION: Pricing experiments need longer run times (minimum 60 days) due
   to consideration cycles and billing cycles.
5. ANALYSIS PLAN:
   - Compare revenue per new user in treatment vs. control.
   - Break down by: Free->Mid conversion, Free->Pro conversion, Mid->Pro
     upgrade rate.
   - Model long-term LTV impact (not just first-month revenue).
6. RISKS AND MITIGATIONS:
   - Price anchoring: Mid tier may change perception of Pro value. Monitor Pro
     willingness-to-pay.
   - Complexity cost: More tiers = more cognitive load. Track plan selection
     time and confusion signals.
   - Irreversibility: Once a price is public, removing it is painful. Start
     with a limited audience.
7. DECISION FRAMEWORK: Pre-commit to decision rules:
   - If total ARPU increases >5% with no Pro degradation >10%: Ship.
   - If total ARPU is flat but Free conversion increases >20%: Ship (volume play).
   - If Pro cannibalization >15%: Do not ship. Revisit tier positioning.

**Automatic fail if:** Response proposes a simple A/B test of pricing pages
without addressing the cannibalization measurement challenge or the long-term
LTV implications.

---

## Test 4: Feature Bloat Diagnosis

**Scenario:** Your product has 47 features. Analytics show that 80% of users
only use 12 of them. The remaining 35 features are used by 5-20% of users each.
Engineering wants to remove features to reduce maintenance burden. What is your
framework for deciding what to remove?

**Model Answer:**

**Key points that must be addressed:**
1. Usage frequency is NOT the only criterion. A feature used by 5% of users
   might be the reason those users chose your product over competitors (killer
   feature for a segment).
2. ANALYSIS FRAMEWORK for each feature:
   - Usage frequency AND depth (how often, how long, how critical to workflow).
   - Revenue attribution (do paying users disproportionately use this feature?).
   - Churn correlation (did users who churned use this feature less?).
   - Acquisition role (is this feature in marketing materials? Does it close deals?).
   - Competitive differentiation (does this feature differentiate us?).
   - Maintenance cost (engineering hours per quarter to maintain).
   - Integration dependency (do other features or third parties depend on this?).
3. CLASSIFICATION:
   - Core: Used by many, high impact. Keep and invest.
   - Niche Critical: Used by few but essential to those users. Keep, minimize
     maintenance cost.
   - Redundant: Functionality overlaps with another feature. Consolidate.
   - Legacy: Was useful, market has moved on. Sunset with migration plan.
   - Experimental: Was never validated. Remove quickly.
4. PROCESS:
   - Do NOT remove anything without usage + revenue + churn analysis.
   - For each proposed removal, identify affected users and propose migration.
   - Communicate deprecation 90+ days in advance.
   - Remove in batches, measure impact after each batch before proceeding.
5. COUNTER-ARGUMENT to "just remove low-usage features":
   - Feature breadth can be a moat (all-in-one vs. point solution positioning).
   - Removing features can signal to the market that the product is contracting.
   - Maintenance cost reduction must be quantified, not assumed to be significant.

**Automatic fail if:** Response recommends removing all features below a usage
threshold without analyzing revenue impact, competitive positioning, or user
segment needs.

---

## Test 5: Product-Led Growth Activation Crisis

**Scenario:** Your PLG funnel shows: 10,000 signups/month, 3,200 reach activation
(32%), 800 convert to paid (8% of signups, 25% of activated). You need to double
paid conversions. Where do you focus?

**Model Answer:**

**Key points that must be addressed:**
1. DECOMPOSITION: Paid = Signups x Activation Rate x Conversion Rate.
   To double paid from 800 to 1,600, you can:
   - Double signups (10K -> 20K) -- expensive, does not fix funnel.
   - Double activation (32% -> 64%) -- highest leverage.
   - Double conversion (25% -> 50%) -- hard, already decent.
   - Combination of improvements across all three.
2. ACTIVATION IS THE BOTTLENECK: 68% of signups never reach activation. This
   is the highest leverage point because:
   - Improving activation also improves downstream conversion (activated users
     convert at 25%, which is reasonable).
   - Activation improvements compound (more activated users = more word-of-mouth
     = more signups).
3. DIAGNOSE ACTIVATION FAILURE:
   - Define "activation" precisely. Is it the right definition? Does it predict
     retention and payment?
   - Segment by acquisition channel (are some channels bringing unqualified users?).
   - Segment by persona (are some personas activating at 60% while others at 10%?).
   - Analyze the drop-off funnel from signup to activation step-by-step.
   - Session recordings / heatmaps for users who drop off.
   - Survey users who signed up but did not activate ("what happened?").
4. ACTIVATION IMPROVEMENT LEVERS:
   - Onboarding redesign (guided setup, progressive disclosure).
   - Time-to-value reduction (get to "aha moment" faster).
   - Remove friction (reduce required steps, defer optional steps).
   - Trigger-based engagement (email/notification if user stalls).
   - Social proof / templates (show what success looks like).
5. CONVERSION OPTIMIZATION (secondary focus):
   - Identify the moment activated users decide to pay. What triggers it?
   - Free plan limitations (are they in the right place?).
   - Pricing page optimization.
   - Trial mechanics (time-limited vs. feature-limited).
6. DO NOT JUST INCREASE SIGNUPS: More top-of-funnel with a broken activation
   step just wastes money. Fix the funnel before scaling the top.

**Automatic fail if:** Response focuses primarily on increasing signups or
does not identify activation as the highest leverage point.

---

## Test 6: Platform vs. Feature Decision

**Scenario:** You can build Feature X (solves one customer problem, 3 months,
high confidence in impact) or Platform Y (enables 5 future features, 6 months,
uncertain impact on any single metric). Your team is burning out from shipping
features with no architectural investment. What do you recommend?

**Model Answer:**

**Key points that must be addressed:**
1. This is a classic exploitation vs. exploration trade-off, compounded by a
   team health concern.
2. FRAMEWORK: Do not treat this as binary. Evaluate:
   - Feature X: expected value = P(success) x impact. High confidence = 70-80%.
   - Platform Y: expected value = sum of [P(each future feature being built) x
     P(each succeeding) x impact of each]. Discount for uncertainty.
   - Option value of Platform Y: even if no single future feature is certain,
     the platform REDUCES COST of all future features.
3. TEAM HEALTH IS A FIRST-CLASS CONCERN:
   - Burned-out teams ship worse code, make worse decisions, and quit.
   - Platform work often energizes engineers (solving systemic problems).
   - The "cost" of not investing in platform is not just technical debt -- it
     is increased defect rate, slower velocity, and attrition.
4. RECOMMENDATION FRAMEWORK:
   - If the team is genuinely at risk of attrition, platform investment is
     an investment in capacity. Do it.
   - If the team is frustrated but not at risk, negotiate: "We will do Feature X
     in 3 months, then Platform Y in the following 3 months. Committed."
   - If Feature X has a hard deadline (competitive threat, contractual), do
     Feature X but scope it minimally and reserve slack for platform work.
5. COMMUNICATE THE DECISION:
   - To leadership: frame platform work in business terms ("Platform Y reduces
     future feature cost by 40%, enabling us to ship 5 features in the time
     Feature X alone would take").
   - To the team: acknowledge the burnout, commit to the platform investment,
     and deliver on the commitment.
6. ANTI-PATTERN WARNING: The most common failure mode is promising platform
   investment "after this one more feature" repeatedly. If you choose Feature X,
   set a hard date for Platform Y and protect it.

**Automatic fail if:** Response makes a binary recommendation without
considering team health, option value, or the compounding effect of platform
investment.

---

## Test 7: Conflicting User Research

**Scenario:** Your qualitative interviews (20 users) say they want Feature A.
Your quantitative survey (2,000 users) says they want Feature B. Your
behavioral analytics show users are actually using Feature C the most. Which
do you trust?

**Model Answer:**

**Key points that must be addressed:**
1. NONE of them alone is "right." Each method has different strengths:
   - Interviews (qual): good for understanding WHY, bad for representing
     the population. 20 users is not representative.
   - Surveys (quant): good for breadth, bad for depth. People state
     preferences that differ from behavior. Question framing matters.
   - Analytics (behavioral): good for what people DO, bad for understanding
     WHY or what they WOULD DO if something new existed.
2. TRIANGULATE: The answer is in the synthesis, not in choosing one source.
   - Why might interview users want A but survey users want B? Are they
     different segments? Were the interview users self-selected (enthusiasts)?
   - Why are users using C the most? Is it because C is best, or because
     C is most visible/accessible?
   - Could A and B be symptoms of the same underlying need?
3. INVESTIGATE DISCREPANCIES:
   - Check survey question wording (was it leading?).
   - Check if interview participants match the survey population.
   - Check analytics for confounds (C might be used most because it is on
     the home screen, not because it is most valued).
4. RESOLUTION PATH:
   - Define the actual decision you need to make (build A, B, or C?).
   - Run a preference test (fake door, painted door, or concierge test) that
     measures BEHAVIOR, not stated preference.
   - If A and B serve different segments, the answer might be "both, sequenced."
5. META-LESSON: This situation reveals a research process gap. Going forward,
   plan mixed-methods research from the start so qual and quant are designed
   to complement each other, not conducted independently.

**Automatic fail if:** Response simply picks one data source as "most
reliable" without synthesizing across sources.

---

## Test 8: Technical Debt Negotiation

**Scenario:** Engineering says they need 6 weeks of "tech debt" work with no
visible product changes. Sales is screaming for 3 features. The CEO wants to
see "momentum." How do you handle this as the product lead?

**Model Answer:**

**Key points that must be addressed:**
1. DO NOT dismiss tech debt as "engineering wants to refactor for fun." Tech
   debt has measurable business impact.
2. QUANTIFY THE DEBT:
   - What is the current cost? (Increased bug rate, slower feature velocity,
     higher incident frequency, engineer frustration/attrition risk.)
   - What specifically will 6 weeks fix? Get engineering to itemize.
   - What is the expected velocity improvement after the investment?
3. QUANTIFY THE FEATURES:
   - What revenue is at stake if the 3 features are delayed 6 weeks?
   - Are any of the 3 features blocking closed deals? (Get specific deal data.)
   - Can any be descoped to ship faster?
4. NEGOTIATE A HYBRID APPROACH:
   - Can you parallelize? (Some engineers on debt, some on features.)
   - Can tech debt be done incrementally alongside feature work?
   - Can you prioritize the tech debt items by impact? (Do the top 2 items
     in 3 weeks instead of all items in 6 weeks.)
5. COMMUNICATE TO CEO:
   - "Momentum" is not just visible features. Frame tech debt as:
     "Investing 3 weeks now to increase our shipping velocity by X% for the
     rest of the year."
   - Show the compound math: slower now = faster later. Provide a chart.
6. SET PRECEDENT: Establish a sustainable ratio (e.g., 20% of every sprint
   allocated to tech debt/reliability) so this crisis does not repeat.

**Automatic fail if:** Response sides entirely with either engineering or
sales without quantifying the trade-off.

---

## Test 9: Multi-Sided Platform Cold Start

**Scenario:** You are building a marketplace with buyers and sellers. You have
neither. How do you solve the chicken-and-egg problem? Be specific.

**Model Answer:**

**Key points that must be addressed:**
1. Classic cold start problem. You must manufacture value on one side without
   the other side being present.
2. STRATEGIES (pick based on specific market):
   - **Single-player mode:** Build tools that are valuable to one side WITHOUT
     the other side. Example: OpenTable built restaurant management software
     before adding the diner marketplace.
   - **Seed the supply:** Manually onboard supply (concierge, subsidize, do
     it yourself). Example: Uber hired drivers directly.
   - **Constrain the market:** Launch in one geography or vertical to achieve
     density. Example: Uber launched in SF only.
   - **Come for the tool, stay for the network:** Attract one side with a
     standalone tool, then layer in marketplace dynamics.
   - **Fake the supply:** Aggregate existing supply from other sources initially.
     Example: Early Yelp used existing review data.
3. SEQUENCING:
   - Determine which side is harder to acquire (typically supply).
   - Build for the hard side first.
   - Create enough value on the hard side that they will tolerate low demand
     initially.
   - Then acquire demand, using the supply as the value proposition.
4. METRICS FOR COLD START:
   - Liquidity rate (% of listings that result in a transaction).
   - Time-to-match (how long before a buyer finds what they want).
   - Supply utilization (are sellers getting enough business to stay?).
   - Do NOT use GMV or total users as North Star during cold start.
5. FAILURE MODES:
   - Subsidizing both sides indefinitely (not a business model).
   - Launching too broadly (no density = no value).
   - Measuring vanity metrics (signups) instead of liquidity.

**Automatic fail if:** Response is generic ("get sellers then get buyers")
without specific strategies, sequencing rationale, or cold-start metrics.

---

## Test 10: Kill Decision

**Scenario:** A feature you championed for 4 months (2 engineers, 1 designer)
is showing flat metrics after 6 weeks post-launch. The team is emotionally
invested. Do you kill it, iterate, or wait?

**Model Answer:**

**Key points that must be addressed:**
1. FIRST: Check your experiment setup before concluding the feature failed.
   - Is 6 weeks enough time? (For some features, adoption curves are longer.)
   - Is the metric instrumented correctly? (Data pipeline issues are common.)
   - Has the feature been discovered? (Check feature awareness/adoption funnel.)
   - Is the metric the right one? (Maybe the feature impacts a different metric.)
2. IF THE DATA IS VALID:
   - Flat metrics after 6 weeks with good adoption = the feature does not solve
     the problem it was designed to solve.
   - Sunk cost fallacy check: the 4 months of investment are gone regardless.
     Future decisions should be based on future expected value only.
3. DECISION FRAMEWORK:
   - KILL if: Users tried it and stopped. The hypothesis was wrong. Iteration
     would require fundamental redesign, not tweaks.
   - ITERATE if: Adoption is low but users who found it show strong engagement.
     The problem is discovery, not value. One specific improvement has clear
     evidence of potential impact.
   - WAIT if: The feature has a longer natural adoption cycle (e.g., monthly
     workflow), and you have not yet seen a full cycle. Leading indicators are
     positive even if lagging metrics are flat.
4. PROCESS:
   - Present the data to the team transparently. Include your recommendation.
   - Separate the decision about the FEATURE from the assessment of the TEAM.
     The team did good work on a hypothesis that did not pan out. That is normal.
   - Document the learning: why was the hypothesis wrong? What would you do
     differently in research/validation next time?
5. PERSONAL ACCOUNTABILITY:
   - As the PM who championed this, own the outcome publicly. Do not blame
     engineering, design, or "the market."
   - Update your prediction tracking record (Accountability Protocol).
   - Use this as calibration data for future prioritization confidence levels.

**Automatic fail if:** Response defaults to "iterate more" without a clear
framework for distinguishing between kill/iterate/wait decisions, or avoids
the sunk cost question.

---

## Test 11: Disagree and Commit

**Scenario:** Your VP of Engineering and VP of Sales disagree on the next
quarter's roadmap. Engineering wants to rebuild the authentication system
(6 weeks, zero new features). Sales wants 4 new integrations (6 weeks each,
but 2 can parallel). The CEO asks you to make the call. Both VPs will be
unhappy with any decision. What do you do?

**Model Answer:**

**Key points that must be addressed:**
1. THIS IS A PRODUCT LEADERSHIP MOMENT, not a technical or sales decision.
   The PM's job is to make the best decision for the business, not to make
   everyone happy.
2. GATHER DATA BEFORE DECIDING:
   - Auth rebuild: What is the current risk? (Security incidents? Performance?
     Compliance deadline? Engineer productivity impact?)
   - Integrations: What revenue is specifically tied to these? (Pipeline deals
     with integration as a requirement. Not "would be nice" -- "will close if
     we have it.")
   - Quantify both sides in dollars or risk-adjusted dollars.
3. MAKE A PRINCIPLED DECISION:
   - If auth has a compliance deadline or security vulnerability: non-negotiable.
     Do it. Explain to Sales this is not optional.
   - If integrations have $X in pipeline tied to them: calculate expected value
     vs. the cost of delayed auth rebuild.
   - Hybrid option: Can the auth rebuild be scoped to a smaller "must do" phase
     (3 weeks) + 1 high-priority integration (3 weeks)?
4. COMMUNICATE THE DECISION:
   - To the "losing" VP: explain the data, the trade-off, and what you will
     do for their priority in the next cycle.
   - To both: get explicit "disagree and commit" agreement. Disagreement is
     fine; undermining the decision is not.
   - Document the decision, rationale, and what was promised to the other side.
5. FOLLOW THROUGH: Whatever you promise to the "losing" side, deliver it. Your
   credibility depends on it.

**Automatic fail if:** Response tries to avoid making a decision, defers to
the CEO, or proposes "doing both" without acknowledging resource constraints.

---

## Test 12: International Expansion Product Decisions

**Scenario:** Your US product is growing well. The CEO wants to launch in
Germany and Japan simultaneously within 6 months. What product considerations
do you raise?

**Model Answer:**

**Key points that must be addressed:**
1. LOCALIZATION IS NOT TRANSLATION:
   - Language: UI, help docs, emails, error messages, legal terms.
   - Format: Dates, currencies, numbers, addresses, phone numbers.
   - Legal: GDPR (Germany), APPI (Japan), data residency, cookie consent.
   - Payment: Local payment methods (SEPA in Germany, convenience store
     payment in Japan).
   - Cultural: UI conventions, color meanings, formality levels, customer
     support expectations.
2. PRODUCT-MARKET FIT IS NOT GUARANTEED:
   - US PMF does not automatically transfer. The problem may not exist, may
     be solved differently, or may have entrenched local competitors.
   - Need local customer research before assuming the US product works.
3. SIMULTANEOUS LAUNCH RISK:
   - Recommend sequencing (one market first) to learn before scaling.
   - Germany and Japan are maximally different (language, culture, legal,
     payment). Launching both means no shared learnings.
   - Propose: Pick the one with stronger initial signals, launch there,
     then use learnings for the second market.
4. OPERATIONAL REQUIREMENTS:
   - Local support (language, timezone, cultural expectations).
   - Local partnerships (distribution, payment processing).
   - Compliance (different in each jurisdiction).
5. SUCCESS METRICS:
   - Do NOT compare international metrics to US metrics directly (different
     baselines, market sizes, competitive landscapes).
   - Set independent North Star for each market based on local TAM.
6. ENGINEERING IMPLICATIONS:
   - i18n infrastructure (if not already built, this is a prerequisite).
   - Multi-currency, multi-timezone, multi-language data models.
   - CDN and infrastructure for local performance.
   - Consult Engineering Brain on architecture changes needed.

**Automatic fail if:** Response treats international launch as "translate the
UI and flip a switch" without raising localization, legal, and PMF concerns.

---

## Test 13: AI Feature Product Management

**Scenario:** Your team wants to add an AI-powered feature (LLM-based). The
prototype demos well but has a 15% error rate. How do you decide whether to
ship it?

**Model Answer:**

**Key points that must be addressed:**
1. 15% error rate is meaningless without context:
   - What KIND of errors? (Incorrect but plausible? Nonsensical? Offensive?)
   - What is the cost of an error? (Low-stakes: autocomplete suggestion.
     High-stakes: financial advice, medical information.)
   - What is the user's alternative? (If manual process has 25% error rate,
     15% AI error rate is an improvement.)
2. DESIGN FOR IMPERFECTION:
   - AI features should be designed assuming errors will occur.
   - Confidence thresholds: only show results above a confidence level.
   - Human-in-the-loop: let users verify/edit AI output.
   - Graceful degradation: clear indication when AI is uncertain.
   - Undo/edit capability for AI-generated content.
3. USER EXPECTATION MANAGEMENT:
   - Beta/experimental labeling to set expectations.
   - Feedback mechanism (thumbs up/down) for continuous improvement.
   - Transparency about AI involvement (users should know it is AI).
4. MEASUREMENT:
   - Not just accuracy: time saved, user satisfaction, task completion rate.
   - Compare to the alternative (not to perfection).
   - Track error DETECTION rate (do users catch errors?).
   - Track error IMPACT (what happens when an error is not caught?).
5. SHIP/NO-SHIP FRAMEWORK:
   - Ship if: errors are low-cost, easily detectable, and the feature
     provides clear value despite them.
   - Do not ship if: errors are high-cost, hard to detect, or erode trust
     in the core product.
   - Ship with guardrails: confidence thresholds, human review for high-stakes
     outputs, usage limits.
6. LIABILITY AND ETHICS:
   - Who is responsible when the AI is wrong?
   - Does the error rate differ across user segments (bias)?
   - Regulatory implications in your domain.

**Automatic fail if:** Response gives a binary "ship" or "don't ship" based
solely on the 15% error rate without analyzing error types, costs, and
design mitigations.

---

## Test 14: Organizational Product Debt

**Scenario:** Your company has 3 product teams, each owning different parts
of the product. There is no shared component library, no consistent UX
patterns, and each team has its own analytics implementation. Users complain
the product feels like "3 different products." How do you fix this?

**Model Answer:**

**Key points that must be addressed:**
1. This is an organizational problem, not a design problem. Inconsistent UX
   is a symptom of team topology and incentive misalignment.
2. ROOT CAUSE ANALYSIS:
   - Each team optimizes for their own metrics, not the user journey.
   - No one "owns" the cross-cutting user experience.
   - Shared infrastructure (component library, analytics) has no team responsible
     for it.
3. STRUCTURAL FIXES:
   - Create a "platform experience" team or designate ownership of shared
     components.
   - Establish a design system with the Design Brain (not just a component
     library -- shared patterns, principles, and governance).
   - Unify analytics implementation (consult Data Brain) so cross-team
     journeys can be measured.
   - Map the end-to-end user journey and assign journey owners (not feature
     owners).
4. INCENTIVE FIXES:
   - Include cross-team experience metrics in team OKRs (e.g., end-to-end
     task completion rate, not just feature-level metrics).
   - Regular cross-team UX reviews.
   - Shared "experience score" that all teams are accountable for.
5. PRACTICAL SEQUENCING:
   - Quick win: audit the top 5 user journeys, fix the worst inconsistencies.
   - Medium term: establish the design system and component library.
   - Long term: restructure teams around user journeys, not features.
6. DO NOT: mandate consistency through process alone. If the structure creates
   inconsistency, process will be circumvented.

**Automatic fail if:** Response proposes only "create a style guide" or "have
more meetings" without addressing the organizational root cause.

---

## Test 15: Zero-to-One Product Strategy

**Scenario:** You are the first PM at a 20-person startup. There is no product
process, no roadmap, no user research, no analytics. Engineering has been
building whatever the CEO and investors suggest. You have 90 days to establish
a product function. What do you do?

**Model Answer:**

**Key points that must be addressed:**
1. DO NOT try to boil the ocean. Establish credibility through quick wins
   while building the foundation.
2. DAYS 1-30 (LEARN AND QUICK WINS):
   - Talk to every customer you can (goal: 15-20 conversations in 30 days).
   - Talk to every team member (engineering, sales, support) to understand
     what they know about customers.
   - Audit current analytics (what exists, what is trustworthy).
   - Ship one small improvement based on an obvious pain point to build
     credibility with engineering.
   - Document the current product strategy (even if it is "whatever the CEO
     says") to make it visible.
3. DAYS 31-60 (ESTABLISH FOUNDATIONS):
   - Define the North Star metric and get CEO alignment.
   - Create a lightweight roadmap (quarterly, not annual).
   - Establish a prioritization framework and use it for one decision publicly.
   - Set up basic analytics (key funnels, core metrics dashboard).
   - Introduce a lightweight spec process (not heavy, just "before we build,
     we write down what and why").
4. DAYS 61-90 (INSTITUTIONALIZE):
   - First prioritization cycle using the new framework.
   - First experiment launched with proper hypothesis and metrics.
   - Regular customer interview cadence established (not just you -- whole
     team exposed to customers).
   - Retrospective on first 90 days: what worked, what did not.
5. KEY PRINCIPLES:
   - Do not introduce heavy process at a 20-person startup. Lightweight,
     high-signal rituals.
   - Earn the right to say "no" by first demonstrating you understand the
     business.
   - Do not position yourself as a gatekeeper. Position yourself as someone
     who helps the team make better decisions.
   - Pick your battles. You cannot fix everything in 90 days.
6. RELATIONSHIP WITH CEO:
   - The CEO has been the de facto PM. Do not threaten their identity.
   - Frame your role as "I help you make product decisions with better data."
   - Get explicit alignment on decision rights (who decides what).

**Automatic fail if:** Response starts with "implement SAFe" or any
heavyweight process framework, or ignores the relationship dynamics with
the CEO.

---

## Scoring Summary

| Test | Primary Dimension Tested | Secondary Dimensions |
|------|-------------------------|---------------------|
| 1 | Metric Rigor | Strategic Alignment, Customer Insight |
| 2 | Prioritization Quality | Stakeholder Communication, Strategic Alignment |
| 3 | Experimentation Design | Metric Rigor, Technical Product Sense |
| 4 | Customer Insight Depth | Prioritization Quality, Strategic Alignment |
| 5 | Metric Rigor | Customer Insight, Experimentation Design |
| 6 | Prioritization Quality | Stakeholder Communication, Technical Product Sense |
| 7 | Customer Insight Depth | Experimentation Design, Metric Rigor |
| 8 | Stakeholder Communication | Prioritization Quality, Technical Product Sense |
| 9 | Strategic Alignment | Metric Rigor, Customer Insight |
| 10 | Prioritization Quality | Stakeholder Communication, Experimentation Design |
| 11 | Stakeholder Communication | Prioritization Quality, Strategic Alignment |
| 12 | Specification Completeness | Technical Product Sense, Strategic Alignment |
| 13 | Technical Product Sense | Experimentation Design, Specification Completeness |
| 14 | Stakeholder Communication | Technical Product Sense, Specification Completeness |
| 15 | Strategic Alignment | Stakeholder Communication, Customer Insight |

**Passing threshold:** 12 of 15 tests must pass.
**Exceptional threshold:** 12 pass + 5 score as "superior" (beyond model answer).

---

*These benchmarks are recalibrated annually as the product management
discipline evolves. New tests are added when new failure modes are observed.*

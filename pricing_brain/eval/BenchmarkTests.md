# Pricing Brain -- Benchmark Tests (Authoritative)

These benchmark scenarios test the Pricing Brain's ability to make sound,
data-informed pricing decisions under realistic business conditions.

Every scenario must be answered with structured analysis, not opinion.
Responses are evaluated against the PricingScore.md dimensions.

---

## HOW TO USE THESE BENCHMARKS

1. Present each scenario to the Pricing Brain as if it were a real business situation
2. Evaluate the response against the Expected Analysis Framework for each test
3. Score the response using PricingScore.md dimensions
4. A passing response must address all Required Elements listed
5. Track scores over time to measure brain improvement

### Scoring Each Response
- **5/5** -- All required elements addressed, analysis rigorous, recommendation defensible with data
- **4/5** -- Most required elements addressed, analysis sound, minor gaps in reasoning
- **3/5** -- Required elements partially addressed, analysis directional but shallow
- **2/5** -- Major elements missing, analysis weak or opinion-driven
- **1/5** -- Response is generic advice, no structured analysis, no data consideration

---

## SCENARIO 1: Post-Price-Increase Conversion Drop

**Situation:**
B2B SaaS product, $49/mo per user. You implemented a 15% price increase to $56/mo
three weeks ago. Conversion rate from trial-to-paid dropped 20% (from 25% to 20%).
ARPU is up. Monthly new signups unchanged.

**Question:** Was the price increase a mistake? Analyze using an elasticity framework.

### Required Elements in Response
- [ ] Calculate revenue impact (not just conversion rate in isolation)
- [ ] Estimate price elasticity of demand from the data
- [ ] Determine whether total revenue increased or decreased
- [ ] Account for the time factor (3 weeks may be too early to judge)
- [ ] Consider segment-level effects (which cohorts churned?)
- [ ] Recommend whether to hold, adjust, or revert
- [ ] Identify what additional data would strengthen the analysis
- [ ] Address long-term vs. short-term revenue implications

### Expected Analysis Framework
```
Revenue before: Signups x 25% conversion x $49 = Revenue per cohort
Revenue after:  Signups x 20% conversion x $56 = Revenue per cohort
PED = (% change quantity) / (% change price) = -20% / +14.3% = -1.4

If PED > -1 (inelastic): Price increase was correct, revenue increased
If PED < -1 (elastic): Price increase was a mistake, revenue decreased
PED = -1.4 suggests elastic -- but check: Is total revenue actually down?
```

---

## SCENARIO 2: B2B SaaS Packaging Design from Scratch

**Situation:**
You are designing pricing for a new B2B SaaS project management tool. Three distinct
customer segments have been identified through research:
- **SMB** (1-50 employees): Need basic project tracking, limited budget, self-serve
- **Mid-Market** (50-500 employees): Need integrations, reporting, multiple teams
- **Enterprise** (500+): Need SSO, audit logs, custom workflows, dedicated support

WTP research shows: SMB $10-25/user/mo, Mid-Market $25-50/user/mo, Enterprise $50-100+/user/mo

**Question:** Design the complete pricing and packaging. Show packaging rationale for every decision.

### Required Elements in Response
- [ ] Tier names that help customers self-select
- [ ] Price points within WTP ranges for each segment
- [ ] Feature allocation with rationale for each placement
- [ ] Value metric selection with justification
- [ ] Upgrade triggers between tiers
- [ ] Free tier decision (include or not) with reasoning
- [ ] Add-on strategy for features that cross segments
- [ ] Annual discount strategy
- [ ] Most popular tier identified and why

---

## SCENARIO 3: Competitor Price Undercut

**Situation:**
Your closest competitor just dropped their prices by 40%. They went from $60/user/mo
to $36/user/mo. Your price is $55/user/mo. Your product has stronger integrations and
better support, but feature parity is roughly 80%. You are the market leader by revenue
but competitor is growing faster by customer count.

**Question:** Should you respond with a price cut? Provide a structured decision framework.

### Required Elements in Response
- [ ] Analysis of competitor's likely motivation (funding pressure? land grab? distress?)
- [ ] Impact assessment on your business (short-term and long-term)
- [ ] Decision framework with clear criteria for when to match vs. hold vs. counter
- [ ] If holding price: how to reinforce value differentiation
- [ ] If cutting price: to what level and with what packaging changes
- [ ] Competitive response timeline (immediate, 30-day, 90-day actions)
- [ ] Risk of triggering a race to the bottom
- [ ] Impact on existing customer perception
- [ ] Monitoring metrics to track competitive impact

---

## SCENARIO 4: Discount Negotiation -- Preserve Value

**Situation:**
Enterprise prospect, 500 seats. Annual deal worth $330,000 at list price ($55/user/mo).
Prospect's procurement team demands 50% discount citing competitive offers.
Champion internally loves the product. Procurement has final sign-off authority.
You know from win/loss data that average enterprise discount is 22%.

**Question:** Structure a counter-offer that preserves value perception and closes the deal.

### Required Elements in Response
- [ ] Anchor response to value, not competitor pricing
- [ ] Counter-offer structure (discount tied to commitment, not arbitrary)
- [ ] Multi-year commitment option with graduated pricing
- [ ] Volume pricing that rewards scale without destroying per-unit value
- [ ] What to give vs. what to hold firm on
- [ ] Walk-away point defined
- [ ] How to handle the competitive threat claim
- [ ] Impact analysis on deal economics at different discount levels
- [ ] Precedent risk assessment (will this deal set a floor?)

---

## SCENARIO 5: Usage-Based Pricing Design

**Situation:**
API platform currently charges $99/mo flat for up to 100K API calls. Usage data shows:
- 40% of customers use <10K calls (overpaying massively)
- 30% use 50-100K calls (fair value)
- 20% use 100-500K calls (underpaying, hitting limits)
- 10% use 500K+ calls (severely underpaying, straining infrastructure)

Churn is 8% monthly, mostly from the <10K group who feel they are overpaying.

**Question:** Redesign to usage-based pricing. Address the transition for existing customers.

### Required Elements in Response
- [ ] Usage-based pricing model with tiered or graduated rates
- [ ] Minimum commitment/platform fee to ensure revenue floor
- [ ] Pricing that is fair across all usage levels
- [ ] Migration plan for existing customers (grandfathering, sunset timeline)
- [ ] Projected churn impact (should decrease for low-usage, may increase for high-usage)
- [ ] Revenue model comparing old vs. new across customer distribution
- [ ] Overage and burst pricing strategy
- [ ] Cost transparency (customers can predict monthly bill)

---

## SCENARIO 6: Freemium to Paid Conversion Optimization

**Situation:**
Product has 50,000 free users and 2,000 paid users (4% conversion). Paid plan is $29/mo.
Free plan includes core functionality with limits: 3 projects, 1 user, no integrations.
Analysis shows: 15,000 free users are "power free users" using all 3 project slots.
Only 5% of power free users convert. Average time from signup to conversion: 47 days.

**Question:** Design a strategy to double conversion rate from 4% to 8% without alienating the free base.

### Required Elements in Response
- [ ] Analysis of why power free users are not converting (hypotheses)
- [ ] Proposed changes to free tier limits (tighten, add, or restructure)
- [ ] Introduction of intermediate tier or trial mechanism
- [ ] Behavioral triggers that prompt conversion at the right moment
- [ ] Experiment design to test conversion changes
- [ ] Risk assessment (free user backlash, viral loop impact)
- [ ] Revenue projection at 8% conversion
- [ ] Timeline and phased rollout plan

---

## SCENARIO 7: International Pricing Launch

**Situation:**
US-based SaaS expanding to 5 new markets: UK, Germany, Brazil, India, Japan.
US pricing: $49/mo per user. Product is cloud-based, no regional cost differences.
Competitors have PPP-adjusted pricing in India and Brazil but not in Europe or Japan.

**Question:** Design international pricing strategy for all 5 markets.

### Required Elements in Response
- [ ] PPP-adjusted prices for each market with rationale
- [ ] Currency strategy (local vs. USD) per market
- [ ] Arbitrage prevention measures
- [ ] Tax implications per market (VAT, GST, consumption tax)
- [ ] Payment method requirements per market
- [ ] Competitive positioning in each market
- [ ] Pricing page localization requirements
- [ ] Exchange rate management approach
- [ ] Launch sequencing recommendation

---

## SCENARIO 8: Price Increase Communication

**Situation:**
Raising prices 25% on all tiers effective in 60 days. 5,000 paying customers.
Product has significantly improved over last 12 months (AI features, integrations, speed).
NPS is 52. Last price increase was 18 months ago (10%).
Customer segmentation: 60% SMB, 30% mid-market, 10% enterprise.

**Question:** Design the complete communication strategy. Every touchpoint, every message.

### Required Elements in Response
- [ ] Grandfathering decision (who, how long, conditions)
- [ ] Communication timeline (pre-announce, announce, remind, effective date)
- [ ] Email templates for each customer segment
- [ ] Pricing page transition plan
- [ ] Sales team talking points
- [ ] Support team escalation procedures
- [ ] Value justification narrative (what improved to justify increase)
- [ ] Proactive retention offers for at-risk segments
- [ ] Churn prediction and mitigation plan
- [ ] Social media monitoring and response plan

---

## SCENARIO 9: SaaS Metric Diagnosis

**Situation:**
Dashboard shows these metrics over last 6 months:
- ARPU: $45 -> $43 -> $41 -> $42 -> $40 -> $38
- NRR: 105% -> 102% -> 98% -> 95% -> 93% -> 91%
- Gross Margin: 78% -> 76% -> 74% -> 73% -> 71% -> 70%
- New customer conversion: Stable at 5%
- Logo churn: Stable at 3%

**Question:** Diagnose the pricing problem. What is happening and what should you fix first?

### Required Elements in Response
- [ ] Diagnosis of ARPU decline root cause (downgrade, discount creep, mix shift?)
- [ ] Diagnosis of NRR decline (contraction revenue exceeding expansion)
- [ ] Diagnosis of margin compression (cost increase, pricing concessions, or mix)
- [ ] Explanation of why conversion and logo churn are stable (the problem is in-base)
- [ ] Prioritized action plan (highest impact first)
- [ ] Leading indicators to monitor
- [ ] 90-day turnaround plan with specific metrics targets

---

## SCENARIO 10: Pricing for Product-Led Growth

**Situation:**
Developer tool with strong bottom-up adoption. 100K individual signups, 5K teams using free tier.
Currently free with no paid plan. Board wants $5M ARR within 12 months.
Developers are highly price-sensitive. Product has strong network effects within organizations.
Competitors: One charges $10/user/mo, another is open-source with paid cloud at $20/user/mo.

**Question:** Design PLG-friendly pricing from zero revenue to $5M ARR.

### Required Elements in Response
- [ ] Free tier preservation strategy (do not kill the growth engine)
- [ ] Paid tier design that targets team/org buyer, not individual developer
- [ ] Pricing that converts teams not individuals (team-level value metric)
- [ ] Path to $5M ARR with assumptions (conversion rate, ACV, customer count)
- [ ] Pricing that does not alienate developer community
- [ ] Enterprise sales motion for largest accounts
- [ ] Competitive positioning vs. both competitors
- [ ] Launch strategy (beta pricing, founder pricing, public pricing)

---

## SCENARIO 11: Multi-Product Pricing Architecture

**Situation:**
Company has 3 products that evolved independently, each with its own pricing:
- Product A: $29/mo flat (CRM, 10K customers)
- Product B: $15/user/mo (Project Management, 3K customers)
- Product C: $0.01/API call (Data Platform, 500 customers)

200 customers use 2+ products but get no bundle benefit.
Company wants to create a unified platform pricing.

**Question:** Design unified pricing that increases cross-sell without losing existing revenue.

### Required Elements in Response
- [ ] Platform pricing model (bundle vs. suite vs. modular)
- [ ] Migration path for each existing customer base
- [ ] Bundle discount strategy (enough to incentivize, not enough to destroy revenue)
- [ ] Standalone pricing preservation for single-product buyers
- [ ] Cross-sell incentive structure
- [ ] Revenue impact modeling (existing + new revenue)
- [ ] Risk of cannibalization assessment
- [ ] Implementation sequencing

---

## SCENARIO 12: Pricing Under Margin Pressure

**Situation:**
AI-powered SaaS product. GPU costs increased 35% due to model upgrades.
Current price: $99/mo. Current margin: 65% (was 78% before cost increase).
Customers love the improved AI capabilities. Competitors have not raised prices yet.
Customer base: 2,000 paying users. Growth rate: 8% MoM.

**Question:** Address the margin compression. Price increase, cost optimization, or packaging change?

### Required Elements in Response
- [ ] Cost analysis: Which features drive GPU costs? Can you tier by usage?
- [ ] Pricing increase analysis: How much increase needed to restore margin?
- [ ] Elasticity consideration: Will a price increase cause unacceptable churn?
- [ ] Packaging option: Can heavy AI features be a premium add-on?
- [ ] Cost optimization: Can model efficiency reduce costs without price increase?
- [ ] Hybrid approach: Some combination of above
- [ ] Competitive timing: Move first or wait for competitors?
- [ ] Customer communication if price increases

---

## SCENARIO 13: Discount Abuse Detection

**Situation:**
Sales team has discount authority up to 25% for annual deals. Data review reveals:
- Average discount: 23% (nearly at max every time)
- 78% of deals involve a discount
- Discounted deals churn at 2x the rate of full-price deals
- Sales team reports "every customer asks for a discount"
- Revenue per rep is declining despite more deals closed

**Question:** Diagnose the discount culture problem and design a fix.

### Required Elements in Response
- [ ] Root cause analysis (is sales leading with discount? is list price too high? is value selling broken?)
- [ ] Data analysis framework (discount by rep, by segment, by deal size, by competitor mention)
- [ ] New discount governance structure
- [ ] Sales compensation alignment (do not reward discounting)
- [ ] Value selling training requirements
- [ ] Pricing integrity restoration plan
- [ ] Timeline to implement changes
- [ ] Expected impact on win rate, deal size, and churn

---

## SCENARIO 14: Reverse Trial Design

**Situation:**
Traditional 14-day free trial converting at 12%. Company wants to experiment with
a reverse trial (full premium access, then downgrade to free at trial end).
Product has clear feature differentiation between free and premium.
Premium features: Advanced analytics, API access, team collaboration, priority support.

**Question:** Design the reverse trial. Predict impact on conversion. Design the measurement approach.

### Required Elements in Response
- [ ] Reverse trial structure (what is included, duration, downgrade experience)
- [ ] Predicted conversion impact with reasoning (directional, not precise)
- [ ] User experience at trial expiration (graceful downgrade, not cliff)
- [ ] Experiment design (A/B test reverse trial vs. current)
- [ ] Metrics to track (conversion, activation, retention, support load)
- [ ] Risk assessment (users gaming the system, support burden)
- [ ] Feature stickiness analysis (which premium features create habit?)
- [ ] Communication during trial (nudges, value reminders, upgrade prompts)

---

## SCENARIO 15: Annual vs. Monthly Pricing Optimization

**Situation:**
Currently: $49/mo monthly, $39/mo annual (20% discount for annual commitment).
Mix: 65% monthly, 35% annual.
Monthly churn: 5% for monthly customers, 1.5% for annual (measured as monthly equivalent).
Goal: Shift mix to 50/50 monthly/annual within 6 months.

**Question:** Optimize the annual/monthly structure to shift the mix. Show the revenue math.

### Required Elements in Response
- [ ] Analysis of current revenue by billing period
- [ ] LTV comparison: monthly vs. annual customers
- [ ] Discount optimization (is 20% enough? too much?)
- [ ] Non-discount incentives for annual (bonus features, priority support)
- [ ] Friction analysis for annual commitment (is checkout optimized?)
- [ ] Monthly price increase option (widen the gap without changing annual)
- [ ] Revenue projection at 50/50 mix vs. current 65/35
- [ ] Experiment design to test different incentive structures

---

## SCENARIO 16: Price Localization for Emerging Markets

**Situation:**
Developer platform popular in India, Brazil, and Nigeria. Current pricing: US-only at $25/mo.
Usage data shows thousands of free users from these markets with strong engagement but
near-zero conversion. Local competitors charge $3-8/mo equivalent.

**Question:** Design market-specific pricing without creating an arbitrage problem.

### Required Elements in Response
- [ ] Market-specific price points with PPP justification
- [ ] Arbitrage prevention (billing country verification, feature differentiation)
- [ ] Payment method support per market (UPI in India, Boleto in Brazil, etc.)
- [ ] Currency strategy per market
- [ ] Revenue projection at localized prices
- [ ] Impact on global pricing perception
- [ ] Implementation approach (geo-detection, self-declaration, hybrid)
- [ ] Success metrics and evaluation timeline

---

## AGGREGATE BENCHMARK SCORING

After running all scenarios, calculate aggregate performance:

```
| Scenario | Score (1-5) | Weakest Dimension | Notes |
|----------|-------------|-------------------|-------|
| 1. Elasticity Analysis | | | |
| 2. Packaging Design | | | |
| 3. Competitive Response | | | |
| 4. Discount Negotiation | | | |
| 5. Usage-Based Design | | | |
| 6. Freemium Optimization | | | |
| 7. International Pricing | | | |
| 8. Price Increase Comms | | | |
| 9. Metric Diagnosis | | | |
| 10. PLG Pricing | | | |
| 11. Multi-Product Pricing | | | |
| 12. Margin Pressure | | | |
| 13. Discount Abuse | | | |
| 14. Reverse Trial | | | |
| 15. Annual/Monthly Mix | | | |
| 16. Emerging Markets | | | |

Average Score: ___
Weakest Dimension Overall: ___
Strongest Dimension Overall: ___
Pass Threshold: Average >= 4.0
```

---

## BENCHMARK REFRESH SCHEDULE

- Scenarios reviewed and updated quarterly
- New scenarios added when new pricing patterns emerge
- Retired scenarios archived (never deleted)
- Brain performance tracked across versions

---

## END OF BENCHMARK TESTS

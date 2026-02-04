# Pricing Score -- Quality Enforcement (Authoritative)

This document defines how pricing decisions, strategies, and outputs are evaluated.
Every pricing recommendation must be scored before it is considered actionable.

If pricing quality is not measurable, it is not enforced.

---

## SCORING RULES (MANDATORY)

Each pricing deliverable must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate rework required:
- **Value Alignment**
- **Revenue Impact**
- **Elasticity Understanding**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 under any circumstance
- International Coherence is NOT a hard fail for domestic-only products

### Override Conditions
- If the product has zero revenue history, Revenue Impact scoring uses projected models instead of actuals
- If the market is nascent (no established competitors), Competitive Position uses value-based anchoring instead of competitor benchmarks

---

## 1. VALUE ALIGNMENT

**Question:**
Does the price accurately reflect the value customers receive, and has willingness to pay been validated?

### What to Evaluate
- Price anchored to measurable customer outcomes (time saved, revenue generated, cost avoided)
- Willingness-to-pay (WTP) research conducted with real prospects or customers
- Van Westendorp or Gabor-Granger study completed for new pricing
- Price-to-value ratio communicated clearly on pricing page
- Value metric chosen correctly (per seat, per usage, per outcome)
- Customer segments mapped to distinct value perceptions
- No "cost-plus" pricing without value justification
- Free tier (if present) delivers enough value to demonstrate but not enough to satisfy

### Scoring Guide
- **5** -- WTP validated with n>=30 per segment, price within optimal range, value metric maps perfectly to how customers derive value, customers articulate value unprompted
- **4** -- WTP directionally validated, price within acceptable range, value metric mostly correct, minor misalignment in one segment
- **3** -- WTP estimated but not formally validated, price based on competitive anchoring with value overlay, value metric chosen by convention not research
- **2** -- Price set by founder intuition or cost-plus, no WTP research, value metric unclear or mismatched to value delivery
- **1** -- Price arbitrary, no connection to customer value, no research conducted, customers confused about what they are paying for

### Hard Fail Triggers
- Score <3 = IMMEDIATE REWORK. Cannot ship pricing without value validation.
- No WTP data of any kind = automatic score of 1

### Remediation Steps (if score < 4)
1. Conduct rapid WTP study (even 10 customer interviews improves signal dramatically)
2. Map value metric to customer success metric
3. Build value calculator showing ROI at each price point
4. Test price framing with A/B messaging before changing actual price

---

## 2. REVENUE IMPACT

**Question:**
Is pricing driving healthy revenue growth across ARPU, conversion, and expansion?

### What to Evaluate
- ARPU trending up quarter-over-quarter (or stable with deliberate strategic reason)
- Conversion rate from free/trial to paid is healthy for category benchmarks
- Expansion revenue (upgrades, add-ons, usage growth) as percentage of total revenue
- Net Revenue Retention (NRR) above 100% for B2B, above 90% for B2C
- Pricing not leaving significant money on the table (underpriced relative to value)
- Pricing not creating excessive churn (overpriced relative to perceived value)
- Discount frequency and depth within acceptable bounds (<20% of deals discounted)
- Revenue mix healthy (not over-dependent on single tier or customer segment)

### Scoring Guide
- **5** -- ARPU growing, conversion rate above category median, NRR >110%, expansion revenue >30% of new ARR, discount rate <10%, revenue mix diversified
- **4** -- ARPU stable or growing, conversion rate at category median, NRR >100%, expansion revenue >20% of new ARR, discount rate <15%
- **3** -- ARPU flat, conversion rate below category median, NRR 90-100%, expansion revenue <15%, discount rate 15-25%
- **2** -- ARPU declining, conversion rate significantly below benchmark, NRR <90%, minimal expansion revenue, heavy discounting (>25%)
- **1** -- No revenue metrics tracked, pricing set without revenue model, no expansion path, rampant discounting destroying value

### Hard Fail Triggers
- Score <3 = IMMEDIATE PRICING REVIEW. Revenue model is broken.
- NRR below 80% = automatic score of 1 (pricing is actively destroying the business)

### Key Metrics to Track
| Metric | Healthy Range | Warning | Critical |
|--------|---------------|---------|----------|
| ARPU Growth | >5% QoQ | 0-5% QoQ | Declining |
| Trial-to-Paid Conversion | >5% (PLG) / >25% (Sales) | 2-5% / 15-25% | <2% / <15% |
| NRR | >110% (B2B) | 100-110% | <100% |
| Expansion Revenue % | >30% of new ARR | 15-30% | <15% |
| Discount Rate | <10% of deals | 10-20% | >20% |
| Gross Margin | >70% (SaaS) | 60-70% | <60% |

---

## 3. COMPETITIVE POSITION

**Question:**
Is the price-value perception favorable relative to alternatives, without racing to the bottom?

### What to Evaluate
- Price positioning intentional (premium, mid-market, or value -- not accidental)
- Price-value perception favorable when customers compare alternatives
- Not in a race to the bottom on price (unless deliberate low-cost strategy)
- Differentiation justifies any price premium
- Switching costs and lock-in considered in pricing strategy
- Competitive response plan exists for price wars
- Win/loss analysis includes pricing as a tracked variable
- Market share trajectory aligned with pricing strategy

### Scoring Guide
- **5** -- Clear positioning, competitors reference your pricing as benchmark, win rate on price-sensitive deals >50%, no reactive price changes in last 12 months, differentiation clearly justifies premium
- **4** -- Positioning defined, price-value perception favorable for primary segment, occasional reactive adjustments, differentiation mostly clear
- **3** -- Positioning unclear to some customers, price-value perception neutral, some reactive pricing, differentiation not well-articulated in pricing context
- **2** -- Positioning confused, frequently undercut and responding reactively, price is primary competitive lever, differentiation not reflected in pricing
- **1** -- No competitive pricing strategy, purely reactive, race to bottom underway, price is lowest and still losing deals

### Competitive Analysis Framework
```
For each key competitor, evaluate:
1. Their price point for equivalent functionality
2. Their value metric and packaging structure
3. Their positioning (premium/mid/value)
4. Customer perception of their price-value ratio
5. Their likely response to your pricing changes
```

### Warning Signs of Race to Bottom
- Discounting frequency increasing quarter over quarter
- Sales team leading with price instead of value
- Win/loss analysis shows "price" as top loss reason AND you are already below market
- Competitors matching your price cuts within weeks
- Margin compression without volume increase

---

## 4. PACKAGING LOGIC

**Question:**
Do tiers map to real customer segments, with clear upgrade paths and defensible feature allocation?

### What to Evaluate
- Number of tiers appropriate for market (2-4 for most SaaS, max 5)
- Each tier maps to a distinct customer segment with distinct needs
- Feature allocation follows good-better-best logic (not arbitrary)
- Upgrade triggers are natural (based on usage, team size, or capability needs)
- No "feature hostage" situations (critical features gated to force upgrades without value)
- Add-on strategy clear (what is bundled vs. optional)
- Naming convention intuitive (customer can self-select tier without sales help)
- Free tier (if exists) has clear boundary and conversion triggers

### Scoring Guide
- **5** -- Tiers map 1:1 to validated segments, feature allocation data-driven, upgrade path natural and predictable, >80% of customers self-select correct tier, add-ons drive incremental revenue without confusion
- **4** -- Tiers mostly map to segments, feature allocation logical, upgrade path clear, >60% self-selection accuracy, add-on strategy defined
- **3** -- Tiers partially overlap, some features arbitrarily placed, upgrade path exists but has friction, customers frequently choose wrong tier, add-on strategy ad hoc
- **2** -- Tiers do not map to real segments, feature allocation feels punitive, upgrade path unclear, significant tier confusion, no add-on strategy
- **1** -- Single tier or tiers are cosmetic (no real differentiation), feature allocation random, no upgrade logic, customers confused

### Packaging Anti-Patterns (Score deductions)
| Anti-Pattern | Deduction | Description |
|-------------|-----------|-------------|
| Feature Hostaging | -1 point | Core features gated to force upgrade without clear value step-up |
| Tier Bloat | -1 point | More than 4 tiers for SMB/mid-market product |
| Metric Mismatch | -1 point | Value metric does not scale with customer's value received |
| Hidden Costs | -1 point | Significant costs not visible until checkout or contract |
| Cliff Pricing | -1 point | Massive price jump between adjacent tiers with no intermediate option |

### Good Packaging Test
Ask these questions:
1. Can a customer describe which tier is right for them without reading feature lists?
2. Does upgrading feel like a natural progression, not a punishment?
3. Would removing a tier cause confusion or simplification?
4. Is the most popular tier the one you want most customers on?

---

## 5. EXPERIMENT RIGOR

**Question:**
Are pricing experiments designed with statistical validity, proper controls, and incrementality measurement?

### What to Evaluate
- Pricing experiments have clear hypotheses with predicted outcomes
- Sample sizes calculated for statistical significance before launch
- Holdout/control groups maintained throughout experiment
- Incrementality measured (not just correlation)
- Experiment duration accounts for purchase cycles (not cut short)
- Pricing experiments isolated from other changes (no confounds)
- Grandfathering strategy defined for existing customers during experiments
- Results analyzed for segment-level effects (not just aggregate)

### Scoring Guide
- **5** -- Formal experiment framework, power analysis for sample size, holdout groups maintained, incrementality measured, results replicated before rollout, segment-level analysis completed, executive review of results
- **4** -- Structured experiments, adequate sample sizes, control group present, basic incrementality analysis, results reviewed before rollout
- **3** -- Some experimentation but informal, sample sizes estimated not calculated, control group sometimes omitted, results accepted at face value without deep analysis
- **2** -- Pricing changes made with minimal testing, no control groups, changes rolled out based on anecdote or executive preference, no statistical rigor
- **1** -- No experimentation, pricing changes are gut decisions, no measurement of impact, no learning loop

### Experiment Design Checklist
```
[ ] Hypothesis written: "If we [change], then [metric] will [direction] by [amount]"
[ ] Primary metric defined (conversion rate, ARPU, revenue per visitor)
[ ] Guardrail metrics defined (churn, support tickets, NPS)
[ ] Sample size calculated (minimum detectable effect, significance level, power)
[ ] Randomization method defined (user-level, cohort, geographic)
[ ] Duration calculated (minimum 2 purchase cycles)
[ ] Grandfathering plan documented
[ ] Analysis plan pre-registered (what counts as success/failure)
[ ] Rollback plan defined
[ ] Segment analysis planned (new vs. existing, SMB vs. enterprise, geo)
```

### Minimum Viable Experiment Standards
| Criterion | Minimum | Preferred |
|-----------|---------|-----------|
| Significance Level | p < 0.05 | p < 0.01 |
| Statistical Power | 80% | 90% |
| Duration | 2 purchase cycles | 4 purchase cycles |
| Sample per variant | 1,000 visitors | 5,000 visitors |
| Holdout group | 10% of traffic | 20% of traffic |

---

## 6. INTERNATIONAL COHERENCE

**Question:**
Is pricing consistent across markets with appropriate PPP adjustments, currency strategy, and no exploitable arbitrage gaps?

### What to Evaluate
- Purchasing Power Parity (PPP) adjustments applied for relevant markets
- Currency strategy defined (local currency pricing vs. USD-only)
- Exchange rate update cadence defined and automated
- No significant arbitrage opportunities between markets
- Regional pricing reflects local competitive landscape
- Tax and compliance handled per jurisdiction (VAT, GST, sales tax)
- Payment methods appropriate for each market (not US-centric)
- Pricing page adapts to visitor geography

### Scoring Guide
- **5** -- PPP-adjusted pricing for all major markets, local currency in top 10 markets, automated exchange rate updates, no arbitrage gaps >15%, tax compliance automated, regional payment methods supported, pricing page geo-adapted
- **4** -- PPP-adjusted for top markets, local currency in top 5 markets, regular exchange rate updates, arbitrage gaps <20%, tax compliance handled, major payment methods supported
- **3** -- Some PPP consideration, 2-3 currency options, manual exchange rate updates, some arbitrage gaps present, basic tax compliance, limited payment methods
- **2** -- USD-only or minimal currency support, no PPP adjustment, exchange rates stale, obvious arbitrage opportunities, tax compliance gaps
- **1** -- Single currency, no international pricing strategy, no PPP consideration, significant arbitrage, tax compliance unknown

### PPP Adjustment Framework
```
Base Price (USD) x PPP Factor x Local Competitive Adjustment = Regional Price

PPP Factors (approximate, update annually):
- Tier 1 (US, UK, Nordics, Australia): 1.0x
- Tier 2 (Western Europe, Japan, Canada): 0.85-0.95x
- Tier 3 (Eastern Europe, Latin America, SEA): 0.5-0.7x
- Tier 4 (India, Africa, select developing markets): 0.3-0.5x
```

### Arbitrage Prevention
- Maximum price gap between regions: 40% (beyond this, VPN abuse increases)
- Enforce billing country = payment method country
- Monitor for unusual geographic purchase patterns
- Consider feature or support differentiation for lower-price tiers

### Not a Hard Fail for Domestic-Only Products
- If product only serves one market, score N/A and exclude from average
- If product serves <3 markets, evaluate only active markets

---

## 7. COMMUNICATION QUALITY

**Question:**
Is pricing communicated clearly to customers, sales teams, and internal stakeholders?

### What to Evaluate
- Pricing page clarity (customer can understand and self-select in <60 seconds)
- Feature comparison table accurate and scannable
- Sales team can explain pricing and handle objections confidently
- Objection handling playbook exists and is current
- Internal stakeholders understand pricing rationale
- Pricing change communication plan exists
- FAQ covers common pricing questions
- No hidden fees, surprises, or "call for pricing" on standard tiers

### Scoring Guide
- **5** -- Pricing page scores >80% comprehension in user testing, sales team win rate on pricing objections >70%, full objection playbook maintained, pricing rationale documented and understood internally, zero customer complaints about pricing clarity
- **4** -- Pricing page clear for most visitors, sales team handles most objections, basic objection playbook exists, pricing rationale communicated internally, few clarity complaints
- **3** -- Pricing page requires some explanation, sales team inconsistent on pricing messaging, limited objection handling guidance, internal understanding varies, moderate clarity complaints
- **2** -- Pricing page confusing, sales team struggles with pricing conversations, no objection playbook, internal disagreement about pricing rationale, frequent clarity complaints
- **1** -- Pricing page absent or misleading, sales team makes up pricing on the fly, no documentation, internal chaos about pricing, customer trust damaged

### Pricing Page Requirements
```
Must Include:
[ ] Tier names and prices visible without scrolling
[ ] Value metric clearly stated (per user/month, per API call, etc.)
[ ] Annual vs. monthly toggle (if both offered)
[ ] Feature comparison table
[ ] Most popular tier highlighted
[ ] CTA button on every tier
[ ] FAQ section addressing top 5 pricing questions
[ ] Enterprise/custom tier with contact option

Must NOT Include:
[ ] "Call for pricing" on standard tiers
[ ] Hidden fees revealed only at checkout
[ ] Confusing unit pricing (e.g., "per 1,000 API calls per day per user")
[ ] More than 15 features in comparison table
[ ] Jargon or internal terminology
```

### Sales Enablement Requirements
```
[ ] One-page pricing overview for sales team
[ ] Objection handling for top 10 pricing objections
[ ] Competitive comparison sheet (pricing section)
[ ] Discount approval matrix (who can approve what level)
[ ] ROI calculator or value framework for justifying price
[ ] Case studies with ROI data for each tier
```

---

## 8. ELASTICITY UNDERSTANDING

**Question:**
Has price sensitivity been measured, demand curves estimated, and the optimal price point identified?

### What to Evaluate
- Price elasticity measured (not assumed)
- Demand curve estimated with data points (not theoretical)
- Optimal price point identified where revenue is maximized
- Sensitivity varies by segment and this is accounted for
- Elasticity informs discount strategy (how far can you go before value perception breaks)
- Cross-price elasticity considered (substitutes and complements)
- Elasticity re-measured after significant product or market changes
- Price floors and ceilings defined based on elasticity data

### Scoring Guide
- **5** -- Formal elasticity measurement conducted, demand curve estimated with multiple data points, optimal price identified and validated, segment-level elasticity known, elasticity refreshed within last 6 months, discount guardrails derived from elasticity data
- **4** -- Elasticity estimated through experiments or conjoint analysis, demand curve directionally understood, near-optimal price identified, some segment-level insight, refreshed within last 12 months
- **3** -- Elasticity inferred from historical price changes or competitor moves, demand curve assumed based on category norms, price point based on best judgment with some data, limited segment insight
- **2** -- Elasticity assumed based on founder intuition, no demand curve, price point set once and not revisited, no segment-level understanding, no refresh schedule
- **1** -- No concept of elasticity applied, price arbitrary, no measurement of sensitivity, changes made without impact analysis

### Hard Fail Triggers
- Score <3 = IMMEDIATE RESEARCH REQUIRED. Cannot optimize pricing without elasticity data.
- Making a >10% price change without any elasticity data = automatic score of 1

### Elasticity Measurement Methods
| Method | Cost | Accuracy | Timeline |
|--------|------|----------|----------|
| Van Westendorp (PSM) | Low | Directional | 2 weeks |
| Gabor-Granger | Low | Moderate | 2 weeks |
| Conjoint Analysis | Medium | High | 4-6 weeks |
| A/B Price Testing | Medium | High | 8-12 weeks |
| Historical Analysis | Low | Moderate | 1 week |
| Win/Loss with Price Data | Low | Moderate | Ongoing |

### Key Formulas
```
Price Elasticity of Demand (PED):
PED = (% Change in Quantity Demanded) / (% Change in Price)

Interpretation:
- |PED| > 1: Elastic (price sensitive) -- lower price increases revenue
- |PED| = 1: Unit elastic -- revenue unchanged by price change
- |PED| < 1: Inelastic (price insensitive) -- higher price increases revenue

Revenue-Maximizing Price:
At unit elasticity (PED = -1), revenue is maximized.
For linear demand: Optimal Price = (Maximum WTP + Marginal Cost) / 2
```

---

## FINAL PRICING SCORE DECISION

**Hard Fail Dimensions (Value Alignment, Revenue Impact, Elasticity Understanding):**
- Score <3 = **IMMEDIATE REWORK REQUIRED**

**All Dimensions:**
- Average score >= 4.0 = **PRICING MAY SHIP**
- Average score 3.0-3.9 = **PRICING NEEDS IMPROVEMENT** (ship with documented risk)
- Average score < 3.0 = **PRICING REJECTED** (do not ship)

**International Coherence:**
- NOT a hard fail for domestic-only products
- Score N/A if only one market served

### Score Card Template

```markdown
## Pricing Score: [Product/Feature Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Value Alignment | /5 | |
| Revenue Impact | /5 | |
| Competitive Position | /5 | |
| Packaging Logic | /5 | |
| Experiment Rigor | /5 | |
| International Coherence | /5 | |
| Communication Quality | /5 | |
| Elasticity Understanding | /5 | |

**Average Score:** ___
**Hard Fail Dimensions Below 3:** [ ] Yes [ ] No
**Verdict:** SHIP / IMPROVE / REJECTED
**Key Risks:** [if any]
**Required Actions:** [if any]
```

---

## QUARTERLY PRICING HEALTH CHECK

Every quarter, the Pricing Brain must evaluate:

1. **Revenue Metrics Review** -- Are ARPU, NRR, conversion trending correctly?
2. **Competitive Landscape Scan** -- Have competitors changed pricing?
3. **Elasticity Refresh** -- Has sensitivity shifted (new features, market changes)?
4. **Packaging Audit** -- Are customers on the right tiers? Migration patterns healthy?
5. **Experiment Pipeline** -- Are pricing experiments running? What did we learn?
6. **International Review** -- Exchange rates, PPP factors, compliance current?

### Quarterly Score Trend
```
| Quarter | Avg Score | Trend | Key Action |
|---------|-----------|-------|------------|
| Q1 2025 | | | |
| Q2 2025 | | | |
| Q3 2025 | | | |
| Q4 2025 | | | |
```

---

## ENFORCEMENT RULE

Pricing quality is enforced, not assumed.
Do not justify low scores with "we will fix it later."
Rework pricing until standards are met.
Shipping bad pricing is worse than shipping late.

---

## END OF PRICING SCORE

# CS Score — Quality Enforcement (Authoritative)

This document defines how Customer Success work is evaluated.
Every CS strategy, program, and intervention must be scored before it is considered complete.

If customer success is not measurable, it is not success. It is hope.

---

## SCORING RULES (MANDATORY)

Each CS artifact must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Health Score Accuracy**
- **Risk Detection Speed**
- **Onboarding Effectiveness**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No account >$50K ARR without a documented success plan
- No customer churns without prior risk identification

### Rejection Triggers (Automatic Fail)

- Customer churns without any prior risk flag = **PROCESS FAILURE**, mandatory post-mortem
- NRR <100% for 2 consecutive quarters = **STRATEGY REVIEW MANDATORY**
- No success plan for accounts >$50K ARR = **GAP**, must be created within 5 business days
- Health score shows green but customer churns within 30 days = **MODEL FAILURE**, recalibrate
- QBR produces no actionable outcomes = **REJECTED**, redo with substance
- Onboarding exceeds target timeline by >50% = **ESCALATION REQUIRED**
- Customer escalation reaches executive without CSM awareness = **PROCESS FAILURE**
- Expansion opportunity missed after clear buying signals = **REVIEW REQUIRED**

---

## 1. ONBOARDING EFFECTIVENESS

**Question:**
Is the onboarding program delivering time-to-first-value within target, consistently, across customer segments?

### What Good Onboarding Looks Like

- Customer achieves their first meaningful outcome within the target window
- All stakeholder groups are engaged (not just the admin)
- Technical implementation is complete and verified
- Customer can articulate the value they are getting
- Adoption metrics show usage beyond initial setup

### Scoring Guide

- **5** — Time-to-first-value (TTFV) consistently under target for all segments, onboarding NPS >70, <5% of customers require onboarding extension, self-serve onboarding available for SMB, playbooks customized by segment and use case
- **4** — TTFV under target for 80%+ of customers, onboarding NPS >50, some segments require extensions
- **3** — TTFV met for ~60% of customers, onboarding experience is inconsistent, no segment-specific playbooks
- **2** — TTFV frequently missed, onboarding is reactive not proactive, high variation in experience quality
- **1** — No defined onboarding program, customers left to figure it out, no TTFV measurement

### Onboarding Metrics (Required)

| Metric | Target (SMB) | Target (Mid-Market) | Target (Enterprise) |
|--------|-------------|--------------------|--------------------|
| Time-to-first-value | <7 days | <30 days | <60 days |
| Time-to-full-deployment | <14 days | <60 days | <90 days |
| Onboarding completion rate | >90% | >85% | >80% |
| Stakeholder engagement rate | >70% | >80% | >90% |
| Onboarding NPS | >60 | >50 | >50 |
| Time from contract to kickoff | <48 hours | <5 days | <7 days |

### Onboarding Health Indicators

| Indicator | Green | Yellow | Red |
|-----------|-------|--------|-----|
| Days since contract signed without kickoff | <3 | 3-7 | >7 |
| Stakeholders in kickoff call | All identified | Most present | Key stakeholders missing |
| Technical setup complete | On schedule | 1-2 days behind | >3 days behind |
| First value milestone | Achieved on time | Slightly delayed | Significantly delayed or unclear |
| Customer engagement level | Proactive questions | Responsive only | Unresponsive |

Score <3 = onboarding is broken. Customers are starting their journey with a bad experience.

---

## 2. HEALTH SCORE ACCURACY

**Question:**
Does the health score reliably predict customer outcomes 60+ days in advance?

### What a Good Health Score Does

- Predicts churn 60+ days before it happens (gives time to intervene)
- Predicts expansion 30+ days before close (enables proactive outreach)
- Distinguishes between at-risk and healthy with >80% accuracy
- Combines usage data, engagement data, sentiment data, and business context
- Updates automatically with manual override capability

### Scoring Guide

- **5** — Health score predicts churn with >80% accuracy 60+ days out, predicts expansion with >70% accuracy, false positive rate <15%, model validated quarterly against actuals, combines 4+ signal categories, auto-updates with CSM override
- **4** — Predicts churn with >70% accuracy 45+ days out, false positive rate <20%, 3+ signal categories
- **3** — Predicts churn with >60% accuracy 30+ days out, but significant false positives or misses
- **2** — Health score exists but is unreliable (frequently wrong), or only uses 1-2 signal categories
- **1** — No health score, or health score is purely subjective (CSM gut feel in a spreadsheet)

### Health Score Components (Required)

| Component | Weight | Signals |
|-----------|--------|---------|
| Product usage | 30-40% | DAU/WAU/MAU, feature adoption, depth of use, usage trend |
| Engagement | 20-25% | Support ticket sentiment, meeting attendance, response time, QBR participation |
| Outcomes | 20-25% | ROI achieved, KPIs met, value realization documented |
| Relationship | 10-15% | Executive sponsor engaged, multi-threaded, champion identified |
| Contract/Financial | 5-10% | Payment history, contract timeline, expansion history |

### Health Score Validation Protocol

Monthly:
1. Pull all accounts that churned in the prior 90 days
2. Check: what was their health score 60 days before churn?
3. Calculate accuracy: what % of churned accounts were flagged as red/yellow?
4. Check: what % of green accounts actually churned? (false negatives)
5. Check: what % of red accounts are still healthy? (false positives)
6. Recalibrate model weights based on findings

### Health Score Failure Modes

| Failure | Description | Fix |
|---------|-------------|-----|
| Green-to-churn | Account showed green, then churned | Missing signal, add data source |
| Perpetual yellow | Account stuck in yellow for months | Define escalation triggers |
| Lagging indicator | Score drops AFTER churn signals are obvious | Add leading indicators |
| Usage-only | Score only measures logins, not value | Add outcome and engagement signals |
| CSM override abuse | CSMs overriding to green without justification | Require override justification |

Score <3 = health score is unreliable. You are flying blind on customer risk.

---

## 3. RETENTION IMPACT

**Question:**
Is the CS function measurably improving Gross Revenue Retention (GRR)?

### Scoring Guide

- **5** — GRR >95% and improving, churn reasons categorized and actioned, save rate >30% on at-risk accounts, predictive churn model deployed, proactive retention plays running for all risk segments
- **4** — GRR 90-95% and stable or improving, churn reasons documented, save playbooks exist
- **3** — GRR 85-90%, churn reasons partially documented, reactive retention approach
- **2** — GRR 80-85%, limited churn analysis, no systematic retention plays
- **1** — GRR <80% or not measured, no churn analysis, no retention program

### GRR Benchmarks by Segment

| Segment | Good | Great | Elite |
|---------|------|-------|-------|
| Enterprise (>$100K ACV) | 92% | 95% | 98%+ |
| Mid-Market ($25K-$100K ACV) | 88% | 92% | 95%+ |
| SMB (<$25K ACV) | 80% | 85% | 90%+ |
| Overall blended | 85% | 90% | 95%+ |

### Retention Analysis Requirements

| Analysis | Frequency | Owner |
|----------|-----------|-------|
| Churn reason categorization | Every churn event | CSM + CS lead |
| Cohort retention curves | Monthly | CS operations |
| Logo churn vs revenue churn | Monthly | CS operations |
| Voluntary vs involuntary churn | Monthly | CS operations |
| Churn by segment, channel, CSM | Quarterly | CS lead |
| Win-back analysis | Quarterly | CS lead |
| Competitive loss analysis | Quarterly | CS lead + Product |

### Churn Category Framework

| Category | Definition | Accountable Team |
|----------|-----------|-----------------|
| Product gap | Customer needs feature we do not have | Product |
| Poor onboarding | Customer never achieved value | CS |
| Lack of adoption | Customer did not use the product enough | CS |
| Champion loss | Key advocate left the company | CS |
| Budget/reorg | Customer org changed, budget cut | Not controllable (document) |
| Competitive loss | Customer chose a competitor | Product + CS + Sales |
| Poor support | Customer had unresolved support issues | Support + CS |
| Misaligned expectations | Customer expected something we cannot deliver | Sales + CS |

Score <3 = retention is a crisis. CS strategy must be reviewed immediately.

---

## 4. EXPANSION EXECUTION

**Question:**
Is the CS function driving Net Revenue Retention (NRR) to target through strategic expansion?

### Scoring Guide

- **5** — NRR >120%, expansion pipeline managed proactively, CSMs identify >60% of expansion opps, cross-sell and upsell playbooks refined by segment, expansion is value-driven (not pushy), land-and-expand motion documented
- **4** — NRR 110-120%, expansion pipeline exists, CSMs contribute 40-60% of expansion opps
- **3** — NRR 100-110%, expansion is opportunistic rather than systematic, limited playbooks
- **2** — NRR 95-100%, expansion is rare, CSMs not trained on commercial conversations
- **1** — NRR <95% or not measured, no expansion program, CS and Sales siloed

### NRR Components

```
NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR

Where:
- Expansion = upsells + cross-sells + seat expansion + usage-based growth
- Contraction = downgrades + seat reduction + plan changes
- Churn = cancelled revenue
```

### NRR Benchmarks

| Company Type | Good | Great | Elite |
|-------------|------|-------|-------|
| Enterprise SaaS | 110% | 120% | 130%+ |
| Mid-Market SaaS | 105% | 110% | 120%+ |
| SMB SaaS | 95% | 100% | 110%+ |
| Usage-based | 115% | 130% | 150%+ |

### Expansion Signal Detection

| Signal | Source | Action |
|--------|--------|--------|
| Usage approaching plan limit | Product data | Proactive upgrade conversation |
| New team/department mentioned | QBR / check-in | Cross-sell opportunity |
| Positive ROI documented | Success plan review | Expansion timing is right |
| Headcount growth at customer | LinkedIn / news | Seat expansion opportunity |
| New use case requested | Support / feature request | Cross-sell or professional services |
| Renewal approaching with high health | Health score + calendar | Bundle expansion with renewal |
| Executive sponsor promotion | LinkedIn / news | Expand relationship, bigger budget |

### Expansion Failure Analysis

When expansion targets are missed:

1. Were expansion signals detected? (If no: instrumentation gap)
2. Were signals acted on? (If no: process gap or CSM skill gap)
3. Were conversations had? (If no: commercial confidence gap)
4. Were proposals sent? (If no: sales/CS handoff gap)
5. Were deals closed? (If no: value prop or pricing gap)

Score <3 = expansion is not happening. Revenue growth depends on new logos only.

---

## 5. CUSTOMER ADVOCACY

**Question:**
What percentage of the customer base is reference-able, and is advocacy growing?

### Scoring Guide

- **5** — >30% of accounts are reference-able, advocacy program structured (references, case studies, reviews, referrals), customer advisory board active, NPS >50 with >60% response rate, advocates drive measurable pipeline
- **4** — 20-30% reference-able, advocacy program exists with moderate activity, NPS >40
- **3** — 10-20% reference-able, advocacy is ad-hoc (one-off reference requests), NPS measured but not actioned
- **2** — <10% reference-able, no formal advocacy program, NPS measured sporadically
- **1** — No advocacy program, no reference accounts, NPS not measured

### Advocacy Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Reference-able accounts % | >25% | Accounts that have agreed to be references |
| Case studies published | 2+ per quarter | Published case studies with named customers |
| G2/Capterra reviews | 10+ per quarter | New verified reviews on major platforms |
| Customer referrals | 5+ per quarter | Qualified referrals from existing customers |
| Advisory board participation | 80%+ attendance | Quarterly advisory board meetings |
| NPS score | >50 | Quarterly NPS survey |
| NPS response rate | >50% | Response rate on NPS surveys |
| Customer speaking engagements | 1+ per quarter | Customers presenting at events |

### Advocacy Ladder

| Level | Definition | Activation |
|-------|-----------|------------|
| 1 - Satisfied | Customer is happy, no complaints | Baseline — achieved through good CS |
| 2 - Referenceable | Willing to take reference calls | Ask after positive QBR or value milestone |
| 3 - Reviewer | Posts public review on G2, Capterra, etc. | Structured ask during advocacy outreach |
| 4 - Case Study | Participates in named case study | Propose after documented ROI achievement |
| 5 - Evangelist | Actively promotes product unprompted | Recognize, nurture, include in advisory board |
| 6 - Referrer | Introduces potential customers | Formalize with referral program |

Score <3 = customers are not advocating. The product may have value delivery issues.

---

## 6. QBR QUALITY

**Question:**
Do Quarterly Business Reviews produce actionable outcomes at the executive level?

### Scoring Guide

- **5** — QBRs attended by customer executives, focus on business outcomes (not feature requests), every QBR produces documented action items with owners, QBRs strengthen executive relationships, renewal/expansion naturally follows strong QBRs
- **4** — QBRs mostly executive-attended, outcome-focused with action items, good but occasional feature-request drift
- **3** — QBRs happen but often with operational contacts only, mix of outcome and feature discussion
- **2** — QBRs are sporadic, primarily product demos or feature wish-lists, no executive attendance
- **1** — No QBRs conducted, or QBRs are check-box exercises with no preparation or follow-up

### QBR Structure Requirements

| Section | Duration | Content |
|---------|----------|---------|
| Business Context | 10 min | Customer's business priorities and changes since last QBR |
| Value Delivered | 15 min | Measurable outcomes achieved, ROI metrics, KPIs impacted |
| Adoption & Usage | 10 min | Usage trends, feature adoption, comparison to peers |
| Roadmap Alignment | 10 min | Upcoming features relevant to customer goals |
| Success Plan Review | 10 min | Progress on success plan milestones, adjustments |
| Next Quarter Plan | 5 min | Agreed actions, owners, timelines |

### QBR Quality Checklist

Pre-QBR:
- [ ] Customer's current business priorities researched (10-K, news, LinkedIn)
- [ ] Usage data pulled and analyzed for trends
- [ ] ROI metrics calculated or estimated
- [ ] Executive sponsor confirmed for attendance
- [ ] Agenda sent 1 week in advance
- [ ] Previous QBR action items reviewed for completion

During QBR:
- [ ] Customer talks more than vendor (60/40 rule minimum)
- [ ] Discussion focuses on business outcomes, not product features
- [ ] ROI and value demonstrated with data
- [ ] Forward-looking success plan discussed
- [ ] Risks and challenges addressed openly
- [ ] Clear action items with owners and deadlines agreed

Post-QBR:
- [ ] Summary sent within 24 hours
- [ ] Action items logged in CRM/CS tool
- [ ] Internal debrief completed (what did we learn?)
- [ ] Health score updated based on QBR signals
- [ ] Expansion or risk flags updated

### QBR Anti-Patterns (Must Avoid)

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Feature parade | QBR is a product demo | Reframe around outcomes, not features |
| Complaint session | QBR becomes list of issues | Address issues pre-QBR, focus QBR on strategy |
| One-way presentation | CSM talks for 45 minutes | Structure for dialogue, customer speaks 60%+ |
| No executive | Only operational contacts attend | Escalate invite, tie QBR to exec priorities |
| No follow-up | Action items never completed | Track actions in CRM, review at next check-in |
| Copy-paste | Same QBR deck for every customer | Customize with customer-specific data and goals |

Score <3 = QBRs are not driving value. Redesign the QBR program.

---

## 7. RISK DETECTION SPEED

**Question:**
How quickly does the CS function detect risk signals and initiate intervention?

### Scoring Guide

- **5** — Automated risk alerts trigger within 24 hours of signal, intervention initiated within 48 hours, risk playbooks exist for all common risk types, average time from signal to intervention <3 business days, monthly review of missed risks
- **4** — Risk alerts within 48 hours, intervention within 1 week, playbooks for major risk types
- **3** — Risk detected within 1-2 weeks, intervention variable, limited playbooks
- **2** — Risk detected manually (CSM noticing), often weeks after first signal, no playbooks
- **1** — Risk not systematically detected, churn is a surprise, reactive only

### Risk Signal Catalog

| Signal | Source | Severity | Response Time |
|--------|--------|----------|---------------|
| Usage drop >30% week-over-week | Product analytics | High | <48 hours |
| Executive sponsor left company | LinkedIn / CRM | Critical | <24 hours |
| Support ticket sentiment negative | Support tool | Medium | <72 hours |
| Missed QBR or check-in | Calendar | Medium | <1 week |
| Contract up in <90 days with no renewal discussion | CRM | High | Immediate |
| Competitor mentioned in support ticket | Support tool | High | <48 hours |
| Payment failed / invoice dispute | Billing | High | <24 hours |
| Key user deactivated | Product analytics | Medium | <72 hours |
| Feature request marked critical by customer | Support/Product | Medium | <1 week |
| Customer posted negative public review | Review monitoring | Critical | <24 hours |
| Multiple stakeholders stop logging in | Product analytics | High | <48 hours |
| Budget freeze announced by customer | News / CSM intel | High | <48 hours |

### Risk Response Playbooks (Required)

Each risk type must have a documented playbook:

```
## Risk Playbook: [Risk Type]

### Detection
- Signal: [What triggers this risk]
- Source: [Where the signal comes from]
- Threshold: [When it becomes a risk, not just a blip]

### Triage (First 24 Hours)
- Verify the signal is accurate (not a data glitch)
- Check account context (health score, recent interactions, contract timeline)
- Classify severity: Critical / High / Medium

### Response (48 Hours - 2 Weeks)
- Step 1: [Immediate action]
- Step 2: [Outreach strategy]
- Step 3: [Remediation offer if applicable]
- Escalation criteria: [When to involve leadership]

### Resolution
- Success criteria: [What does resolved look like?]
- Documentation: [What to log]
- Follow-up: [Monitoring period after resolution]
```

Score <3 = risk detection is too slow. Customers are churning before anyone notices.

---

## 8. CROSS-FUNCTIONAL INFLUENCE

**Question:**
Is the CS function effectively feeding customer insights back to Product, Sales, and Marketing?

### Scoring Guide

- **5** — Structured feedback loop to Product (monthly themes, feature impact data), CS input shapes product roadmap, CS trains Sales on ideal customer profile, CS content informs Marketing, customer voice is present in all product decisions
- **4** — Regular feedback to Product with some influence on roadmap, ad-hoc collaboration with Sales/Marketing
- **3** — CS sends feature requests to Product but unclear if they influence decisions, limited cross-functional collaboration
- **2** — CS is siloed, feedback goes into a black hole, no visible influence on other teams
- **1** — No feedback mechanism, CS is seen as a cost center not a strategic function

### Cross-Functional Feedback Requirements

| Feedback Type | From CS To | Frequency | Format |
|--------------|-----------|-----------|--------|
| Feature request themes | Product | Monthly | Aggregated report with revenue impact |
| Churn reasons | Product + Sales | Monthly | Categorized analysis |
| Competitive intel | Product + Marketing | Quarterly | Competitive insights report |
| Ideal customer signals | Sales | Quarterly | ICP refinement data |
| Customer stories | Marketing | Ongoing | Case study candidates, quotes, testimonials |
| Onboarding friction | Product | Monthly | Onboarding drop-off analysis |
| Usage patterns | Product | Monthly | Feature adoption and engagement data |
| Pricing feedback | Product + Sales | Quarterly | Customer pricing sentiment and willingness-to-pay signals |

### Product Feedback Loop Validation

Monthly, verify:
- [ ] CS submitted aggregated feature request themes with revenue weighting
- [ ] Product acknowledged receipt and provided disposition
- [ ] At least 1 CS-originated insight influenced a product decision this quarter
- [ ] Churn reasons shared with Product include actionable detail
- [ ] CS has visibility into product roadmap and upcoming releases

Score <3 = CS is siloed. Customer voice is not reaching the teams that can act on it.

---

## SCORING SUMMARY TEMPLATE

```
## CS Score Report — [Account Segment / Portfolio / Team]
## Date: [YYYY-MM-DD]
## Evaluator: [Name]

| # | Dimension | Score (1-5) | Notes |
|---|-----------|-------------|-------|
| 1 | Onboarding Effectiveness | _ | |
| 2 | Health Score Accuracy | _ | |
| 3 | Retention Impact (GRR) | _ | |
| 4 | Expansion Execution (NRR) | _ | |
| 5 | Customer Advocacy | _ | |
| 6 | QBR Quality | _ | |
| 7 | Risk Detection Speed | _ | |
| 8 | Cross-Functional Influence | _ | |

**Average Score:** _
**Hard Fail Triggered:** Yes/No
**Rejection Triggers Hit:** [List any]

### Verdict
- [ ] PASS — Average >= 4.0, no hard fails
- [ ] CONDITIONAL PASS — Average >= 3.5, action items required
- [ ] FAIL — Average < 3.5 or hard fail triggered

### Required Actions
1. [Action item with owner and deadline]
2. [Action item with owner and deadline]

### Next Review Date: [YYYY-MM-DD]
```

---

## ESCALATION PROTOCOL

| Condition | Action |
|-----------|--------|
| Any dimension scores 1 | Immediate review with CS leadership |
| Average score <3.0 | CS strategy paused for reassessment |
| GRR <85% for 2 consecutive quarters | Executive-level CS review |
| NRR <100% for 2 consecutive quarters | Strategy review mandatory |
| 3+ surprise churns in one quarter | Process failure investigation |
| Health score accuracy <60% | Model recalibration mandatory |

---

## QUARTERLY CALIBRATION

Every quarter, the CS Score system itself must be calibrated:

1. Review all churn events: did the scoring system flag them?
2. Review all expansions: did the scoring system predict them?
3. Adjust health score weights based on new churn/expansion data
4. Update benchmarks based on company maturity and market conditions
5. Review and update risk signal catalog
6. Archive learnings to CS knowledge base

---

**This scoring system is authoritative. No CS program ships without passing.**
**Customer success without measurement is not success. It is customer service.**

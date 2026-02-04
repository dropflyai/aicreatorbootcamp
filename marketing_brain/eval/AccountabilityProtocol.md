# AccountabilityProtocol.md -- Marketing Brain Audit & Accountability System

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Marketing Brain / CEO Brain
> Purpose: Every marketing campaign, positioning decision, and budget
> allocation is tracked with full audit trails, post-mortems, and
> competitive monitoring. The Marketing Brain is accountable for
> measurable business outcomes, not just activity metrics.

---

## 1. Campaign Audit Trail

Every marketing campaign or initiative that spends budget or affects the
brand must be logged.

### Campaign Record Template

```
CAMPAIGN ID: MKT-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
OWNER: [Marketing Brain / with whom]
TYPE: [Demand Gen | Content | Brand | Event | Product Launch | Referral | Partnership]
BUDGET: [Total spend allocated]

OBJECTIVE:
[One sentence: what business outcome this campaign is designed to achieve]

TARGET AUDIENCE:
- ICP segment: [Which segment(s)]
- Estimated reachable audience: [Size]
- Channels: [Where this campaign will run]

HYPOTHESIS:
If we [campaign action], then [metric] will [direction] by [amount]
because [mechanism].

SUCCESS METRICS:
- Primary: [Metric name, baseline, target, timeframe]
- Secondary: [Metric name, baseline, target, timeframe]
- Guardrail: [What must NOT degrade]

KILL CRITERIA:
If [metric] is below [threshold] after [timeframe], pause and review.

PREDICTED OUTCOMES:
- Leads/MQLs: [Predicted count]
- Pipeline: [Predicted dollars]
- Revenue: [Predicted dollars]
- CAC: [Predicted per customer]
- Confidence: [High/Medium/Low] because [reason]

FUNNEL MODEL:
Impressions -> Clicks -> Landing Page Visits -> Conversions -> MQLs -> SQLs -> Revenue
[Predicted numbers at each stage]

MarketingScore APPLIED:
- Positioning Clarity: [1/3/5]
- Audience Precision: [1/3/5]
- Funnel Math: [1/3/5]
- Channel Strategy: [1/3/5]
- Creative Quality: [1/3/5]
- Attribution Rigor: [1/3/5]
- Growth Sustainability: [1/3/5]
- Competitive Awareness: [1/3/5]
- COMPOSITE: [X/40]
```

### Audit Trail Rules

1. Campaign record created BEFORE campaign launches.
2. Records are IMMUTABLE. Results are appended, not replacing predictions.
3. All campaign creative and landing pages archived at launch.
4. Budget changes during campaign documented with rationale.
5. Records accessible to all brains for cross-functional visibility.

---

## 2. Campaign Post-Mortem Protocol

Every campaign with budget >$5K OR expected to generate >50 leads receives
a mandatory post-mortem. Post-mortems are scheduled at campaign record
creation time, not after results are in.

### Post-Mortem Template

```
POST-MORTEM: MKT-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
CAMPAIGN DURATION: [Start date - End date]
FACILITATOR: [Who led the post-mortem]

PERFORMANCE vs. PREDICTION:
| Metric | Predicted | Actual | Variance | Assessment |
|--------|-----------|--------|----------|------------|
| Impressions | [N] | [N] | [%] | [Above/Below/On target] |
| Clicks/CTR | [N/%] | [N/%] | [%] | [Above/Below/On target] |
| Conversions | [N] | [N] | [%] | [Above/Below/On target] |
| MQLs | [N] | [N] | [%] | [Above/Below/On target] |
| SQLs | [N] | [N] | [%] | [Above/Below/On target] |
| Pipeline | [$] | [$] | [%] | [Above/Below/On target] |
| Revenue | [$] | [$] | [%] | [Above/Below/On target] |
| CAC | [$] | [$] | [%] | [Above/Below/On target] |
| ROI | [X:1] | [X:1] | [%] | [Above/Below/On target] |

FUNNEL ANALYSIS:
Where was the biggest drop-off vs. prediction? Why?
[Detailed analysis of each funnel stage]

CHANNEL PERFORMANCE:
| Channel | Spend | Leads | CAC | Assessment |
|---------|-------|-------|-----|------------|
| [Channel 1] | [$] | [N] | [$] | [Keep/Scale/Cut] |
| [Channel 2] | [$] | [N] | [$] | [Keep/Scale/Cut] |

CREATIVE PERFORMANCE:
| Variant | Impressions | CTR | Conversion | Winner? |
|---------|-------------|-----|------------|---------|
| [Variant A] | [N] | [%] | [%] | [Yes/No] |
| [Variant B] | [N] | [%] | [%] | [Yes/No] |

WHAT WORKED:
1. [Specific, with data]
2. [Specific, with data]
3. [Specific, with data]

WHAT DID NOT WORK:
1. [Specific, with data]
2. [Specific, with data]
3. [Specific, with data]

WHAT WE LEARNED:
1. [Insight that applies beyond this campaign]
2. [Insight that applies beyond this campaign]
3. [Insight that applies beyond this campaign]

WHAT WE WILL DO DIFFERENTLY NEXT TIME:
1. [Specific change with owner]
2. [Specific change with owner]
3. [Specific change with owner]

PREDICTION ACCURACY LOG UPDATE:
[Score recorded in Section 3]
```

### Post-Mortem Schedule

| Campaign Type | Post-Mortem Timing |
|---------------|-------------------|
| Demand gen campaign | 2 weeks after campaign end |
| Product launch | 30 days, 60 days, 90 days post-launch |
| Content campaign | 90 days (content needs time to compound) |
| Event/conference | 30 days post-event |
| Brand campaign | 90 days (brand effects are slower) |
| Always-on campaigns | Monthly review |

---

## 3. Prediction Accuracy Tracking

The Marketing Brain maintains a running log of all campaign predictions
and outcomes to detect systematic forecasting biases.

### Prediction Log

```
| ID | Date | Prediction | Confidence | Outcome | Accurate? | Error Type |
|----|------|-----------|------------|---------|-----------|------------|
| MKT-2026-001 | 2026-01-15 | Campaign will generate 200 MQLs | High | 120 MQLs | Over-estimated | Optimism bias |
```

### Quarterly Prediction Review

```
QUARTER: [Q1/Q2/Q3/Q4 YYYY]

TOTAL CAMPAIGNS: [N]
CAMPAIGNS WITH POST-MORTEMS: [N] ([%])

PREDICTION ACCURACY:
- Lead predictions: [Avg variance %]
  - Systematically over or under? [Direction]
- Pipeline predictions: [Avg variance %]
  - Systematically over or under? [Direction]
- Revenue predictions: [Avg variance %]
  - Systematically over or under? [Direction]
- CAC predictions: [Avg variance %]
  - Systematically over or under? [Direction]

CONFIDENCE CALIBRATION:
- High confidence predictions accuracy: [%]
  - Target: 70-85%. Actual: [%]
  - Assessment: [Well-calibrated / Overconfident / Underconfident]
- Medium confidence predictions accuracy: [%]
  - Target: 40-65%. Actual: [%]
  - Assessment: [Well-calibrated / Overconfident / Underconfident]
- Low confidence predictions accuracy: [%]
  - Target: 15-35%. Actual: [%]
  - Assessment: [Well-calibrated / Overconfident / Underconfident]

SYSTEMATIC BIASES DETECTED:
- Optimism bias in lead volume: [Yes/No, magnitude]
- CAC underestimation: [Yes/No, magnitude]
- Timeline optimism: [Yes/No, campaigns took longer than planned?]
- Channel bias: [Consistently over-estimating certain channels?]
- Novelty bias: [Over-estimating new channel/tactic performance?]

CORRECTION FACTORS:
Based on historical accuracy, apply these corrections to future predictions:
- Lead predictions: multiply by [correction factor]
- Pipeline predictions: multiply by [correction factor]
- Revenue predictions: multiply by [correction factor]
- CAC predictions: multiply by [correction factor]
```

### Calibration Thresholds

| Condition | Action |
|-----------|--------|
| Lead predictions off by >50% for 3+ campaigns | Review ICP definition and funnel assumptions |
| CAC predictions off by >30% consistently | Recalibrate channel cost models |
| High-confidence accuracy < 50% | Downgrade all predictions one confidence level until calibrated |
| Pipeline predictions consistently 2x+ over actual | CFO meeting to recalibrate models |
| Prediction log not updated for 30+ days | Escalation to CEO Brain |

---

## 4. Attribution Model Documentation

Marketing must maintain transparent documentation of its attribution model
so that all stakeholders understand how credit is assigned.

### Attribution Model Registry

```
ATTRIBUTION MODEL: [Name, e.g., "Multi-Touch Time-Decay"]
LAST UPDATED: [YYYY-MM-DD]
OWNER: [Marketing Ops / Data Brain collaboration]

MODEL TYPE:
[First-touch / Last-touch / Linear / Time-decay / Position-based /
Algorithmic / Custom]

MODEL LOGIC:
[Detailed explanation of how credit is assigned]
[For algorithmic: what model, what training data, what features]

TOUCHPOINTS TRACKED:
- Website visit (source, page, duration)
- Content download
- Email engagement (open, click)
- Webinar attendance
- Ad click
- Event attendance
- Sales touch (call, meeting, demo)
- Chat/support interaction
- Social engagement
- Referral/word-of-mouth

KNOWN LIMITATIONS:
1. [Limitation 1]: [Impact and mitigation]
2. [Limitation 2]: [Impact and mitigation]
3. [Limitation 3]: [Impact and mitigation]

INCREMENTALITY VALIDATION:
- Last incrementality test: [Date]
- Method: [Geo-lift / Holdout / Matched market]
- Result: [Attribution model X was Y% higher/lower than measured incremental impact]
- Correction applied: [Yes/No, details]

NEXT INCREMENTALITY TEST: [Date, channel to test]
```

### Attribution Integrity Checks (Monthly)

```
ATTRIBUTION INTEGRITY CHECK: [Month YYYY]

TOTAL ATTRIBUTED REVENUE: [$]
TOTAL ACTUAL REVENUE: [$]
RATIO: [Should be approximately 1.0. If >1.2, over-attribution likely]

CHANNEL-LEVEL SANITY:
| Channel | Attributed Revenue | Spend | Attributed ROAS | Believable? |
|---------|-------------------|-------|-----------------|-------------|
| [Channel] | [$] | [$] | [X:1] | [Yes/No/Investigate] |

ANOMALIES DETECTED:
[Any channels showing implausible ROAS or attribution patterns]

ACTIONS:
[Investigation or correction needed]
```

---

## 5. Brand Health Tracking

Brand is a long-term asset that must be monitored systematically, not just
when a crisis occurs.

### Brand Health Dashboard (Updated Quarterly)

```
BRAND HEALTH REPORT: [Quarter YYYY]

AWARENESS:
- Unaided brand awareness: [%] (trend: [up/down/stable])
- Aided brand awareness: [%] (trend: [up/down/stable])
- Category association: when people think of [category], [%] think of us
- Share of voice: [%] of category mentions/impressions are our brand

PERCEPTION:
- Brand attribute scores (rated by target audience):
  | Attribute | Our Score | Competitor A | Competitor B | Target |
  |-----------|-----------|--------------|--------------|--------|
  | Innovative | [1-10] | [1-10] | [1-10] | [1-10] |
  | Reliable | [1-10] | [1-10] | [1-10] | [1-10] |
  | Easy to use | [1-10] | [1-10] | [1-10] | [1-10] |
  | [Key attribute] | [1-10] | [1-10] | [1-10] | [1-10] |
- NPS: [Score] (trend: [up/down/stable])
- Brand sentiment (social listening): [% positive / neutral / negative]

REPUTATION:
- Review site rating:
  - G2: [Score] ([N] reviews)
  - Capterra: [Score] ([N] reviews)
  - TrustPilot: [Score] ([N] reviews)
- Media mentions: [Count] ([% positive / neutral / negative])
- Industry awards/recognition: [List]

BRAND SAFETY INCIDENTS:
- Number of incidents this quarter: [N]
- Severity: [Details]
- Resolution: [Details]

COMPETITIVE BRAND COMPARISON:
[How our brand metrics compare to top 3 competitors]

ACTIONS:
[What the Marketing Brain will do based on brand health data]
```

### Brand Health Alerts

| Condition | Action | SLA |
|-----------|--------|-----|
| Unaided awareness drops >5 points in a quarter | Investigate cause, adjust awareness strategy | 2 weeks |
| Brand sentiment drops below 60% positive | Social listening deep-dive, identify themes | 1 week |
| Review site rating drops below 4.0 | Customer success collaboration, review response program | 1 week |
| Major brand safety incident | Crisis communication protocol activated | Immediate |
| Share of voice drops below 15% | Competitive response strategy review | 2 weeks |

---

## 6. Competitive Monitoring Cadence

### Real-Time Monitoring (Automated)

```
COMPETITOR MONITORING DASHBOARD

TRACKED COMPETITORS: [List all tracked competitors]

AUTOMATED ALERTS CONFIGURED FOR:
- [ ] Pricing changes (landing page monitoring)
- [ ] New feature announcements (blog/changelog monitoring)
- [ ] Positioning changes (website copy monitoring)
- [ ] New ad creative (ad library monitoring)
- [ ] Hiring patterns (job posting monitoring)
- [ ] Funding announcements (Crunchbase/press monitoring)
- [ ] Content publication (RSS/blog monitoring)
- [ ] Social media activity (mention/engagement monitoring)
- [ ] SEO ranking changes (keyword tracking)
- [ ] Review site activity (new reviews, rating changes)
```

### Monthly Competitive Review

```
COMPETITIVE REVIEW: [Month YYYY]

NOTABLE COMPETITOR MOVES:
| Competitor | Move | Date | Our Assessment | Our Response |
|-----------|------|------|----------------|--------------|
| [Name] | [What they did] | [Date] | [Threat level: Low/Med/High] | [Planned response or "monitor"] |

COMPETITIVE WIN/LOSS UPDATE:
- Competitive deals this month: [N]
- Win rate vs. competitors: [%]
  - vs. Competitor A: [%]
  - vs. Competitor B: [%]
  - vs. Competitor C: [%]
- Top reasons for competitive losses:
  1. [Reason with frequency]
  2. [Reason with frequency]
  3. [Reason with frequency]
- Top reasons for competitive wins:
  1. [Reason with frequency]
  2. [Reason with frequency]
  3. [Reason with frequency]

BATTLECARD UPDATES NEEDED:
[Which competitor battlecards need updating based on new information]

MARKET SHARE ESTIMATE:
[Updated estimate with methodology and confidence level]
```

### Quarterly Competitive Deep-Dive

```
COMPETITIVE DEEP-DIVE: [Quarter YYYY]

MARKET DYNAMICS:
- New entrants: [List any new competitors]
- Exits/acquisitions: [List any competitor exits]
- Funding rounds: [List competitor funding events]
- Market size estimate update: [If applicable]

POSITIONING MAP UPDATE:
[Updated perceptual map showing competitive positioning on key dimensions]

FEATURE PARITY ANALYSIS:
[Updated feature comparison matrix]

PRICING COMPETITIVE ANALYSIS:
[Updated pricing comparison]

MESSAGING COMPETITIVE ANALYSIS:
[How each competitor is positioning and messaging]

STRATEGIC ASSESSMENT:
- Biggest competitive threat: [Who and why]
- Biggest competitive opportunity: [Where competitors are weak]
- Our defensibility: [What moat do we have?]

ACTIONS:
[Strategic responses planned based on competitive landscape]
```

---

## 7. Failure Documentation

### Marketing-Specific Failure Categories

| Category | Examples | Severity |
|----------|----------|----------|
| Brand Damage | Offensive creative, compliance violation, public backlash | S1 |
| Budget Waste | Campaign with zero ROI, over-spending on dead channel | S2 |
| Positioning Error | Mixed messages confusing market, lost competitive deals | S2 |
| Measurement Failure | Wrong attribution, misleading reporting, broken tracking | S2 |
| Execution Failure | Sent to wrong segment, broken links, wrong prices listed | S2-S3 |
| Missed Opportunity | Competitor exploited gap we could have filled, trend missed | S3 |

### Post-Mortem Template (S1 and S2)

```
FAILURE POST-MORTEM: MKT-[YYYY]-[NNN]
SEVERITY: [S1/S2]
CATEGORY: [From table above]
DATE: [YYYY-MM-DD]

WHAT HAPPENED:
[Factual description without blame]

IMPACT:
- Brand impact: [Quantified or assessed]
- Financial impact: [Dollars wasted or revenue lost]
- Customer impact: [If any]
- Competitive impact: [If any]

ROOT CAUSE (5 Whys):
1. [Surface cause]
2. [Deeper]
3. [Deeper still]
4. [Systemic]
5. [Root cause]

WHICH REVIEW CHECKLIST GATE WOULD HAVE CAUGHT THIS:
[Gate name and specific checkbox]

CORRECTIVE ACTIONS:
| Action | Owner | Deadline | Verification |
|--------|-------|----------|-------------|
| [Action] | [Owner] | [Date] | [How to verify] |

WAS THIS PREVENTABLE WITH EXISTING PROCESSES:
[Yes: process was not followed. No: process gap identified.]

PROCESS IMPROVEMENTS:
[Changes to MarketingScore, ReviewChecklist, or monitoring]
```

---

## 8. Escalation Matrix

| Level | Condition | Escalate To | Response Time |
|-------|-----------|------------|---------------|
| L1 | Campaign underperforming vs. plan | Marketing Brain internal review | 48 hours |
| L2 | Budget reallocation needed | CEO Brain approval | 1 week |
| L3 | Positioning or messaging pivot | CEO Brain + Product Brain | 1 week |
| L4 | Brand crisis or compliance issue | CEO Brain + Legal Brain | 4 hours |
| L5 | Competitive threat requiring company response | CEO Brain + all brains | 24 hours |

### Mandatory Escalation Triggers

1. **Budget overrun >20%** -> CEO Brain informed. Justification required.
2. **CAC increases >25% in a quarter** -> Root cause analysis. Channel
   strategy review with CEO Brain.
3. **Brand sentiment drops below 50% positive** -> Crisis assessment.
   CEO Brain + Customer Success Brain involved.
4. **Compliance violation discovered** -> Immediate stop. CEO Brain +
   Legal Brain. Remediation plan within 48 hours.
5. **Competitive loss rate exceeds 60%** -> Positioning review. Product
   Brain consulted for product gaps. CEO Brain for strategic response.
6. **Attribution model shows >30% variance from incrementality test** ->
   Data Brain consulted. All ROI claims paused until recalibrated.
7. **Same MarketingScore dimension scores 1 twice** -> CEO Brain coaching
   session. Targeted improvement plan.

---

## 9. Quarterly Self-Assessment

```
QUARTERLY SELF-ASSESSMENT: [Quarter YYYY]
DATE: [YYYY-MM-DD]

CAMPAIGNS RUN: [Count]
CAMPAIGNS WITH POST-MORTEMS: [Count] ([%])

MarketingScore AVERAGES:
- Positioning Clarity: [Avg]
- Audience Precision: [Avg]
- Funnel Math: [Avg]
- Channel Strategy: [Avg]
- Creative Quality: [Avg]
- Attribution Rigor: [Avg]
- Growth Sustainability: [Avg]
- Competitive Awareness: [Avg]

WEAKEST DIMENSION: [Which one]
IMPROVEMENT PLAN: [Specific actions]

BUDGET PERFORMANCE:
- Total spend: [$]
- Total attributed pipeline: [$]
- Total attributed revenue: [$]
- Blended CAC: [$]
- Blended LTV/CAC: [ratio]
- Budget utilization: [% of approved budget spent]

CHANNEL PERFORMANCE SUMMARY:
| Channel | Spend | Leads | CAC | ROAS | Trend |
|---------|-------|-------|-----|------|-------|
| [Channel] | [$] | [N] | [$] | [X:1] | [Up/Down/Stable] |

BRAND HEALTH SUMMARY:
- Unaided awareness: [%] (trend)
- NPS: [Score] (trend)
- Competitive win rate: [%] (trend)

PREDICTION CALIBRATION:
- Average lead prediction accuracy: [%]
- Average CAC prediction accuracy: [%]
- Systematic biases: [List]
- Correction factors applied: [List]

FAILURES:
- S1: [Count]
- S2: [Count]
- Recurring patterns: [Summary]

BENCHMARK TEST RESULTS:
- Tests passed: [X/15]
- Tests failed: [Which ones]
- Retest plan: [When]

TOP 3 WINS THIS QUARTER:
1. [Specific with data]
2. [Specific with data]
3. [Specific with data]

TOP 3 IMPROVEMENTS FOR NEXT QUARTER:
1. [Specific with plan]
2. [Specific with plan]
3. [Specific with plan]
```

---

## 10. Continuous Improvement Loop

Annually, the accountability system itself is reviewed:

1. Audit all quarterly self-assessments for the year.
2. Identify which mechanisms caught real problems.
3. Identify which mechanisms are overhead without value. Simplify or remove.
4. Update competitive monitoring for new competitors and market changes.
5. Recalibrate prediction correction factors based on full-year data.
6. Update BenchmarkTests with scenarios from real failures.
7. Cross-pollinate learnings with Product Brain and Data Brain.
8. Review and update brand health tracking methodology.
9. Reassess channel portfolio for emerging platforms and declining ones.
10. Update compliance checklists for new regulations.

---

*Marketing is the voice of the company. Every word must be earned, every
dollar must be accountable, and every claim must be defensible. The
accountability system ensures we operate at that standard consistently.*

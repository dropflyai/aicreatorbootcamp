# Analytics Brain Benchmark Tests -- Authoritative

These scenarios test real-world analytics engineering and insight generation competence.
Every scenario requires a complete solution, not a conceptual answer.

A passing response must include: diagnosis, methodology, specific recommendations,
follow-up measurement plan, and caveats.

"The data shows an interesting trend" is not an insight. "Revenue dropped 12%
because X, and we should do Y by Z date" is.

---

## BENCHMARK RULES

- Each scenario must be answered with a concrete, actionable analysis plan
- Statistical methodology must be specified (not "run some analysis")
- Recommendations must be specific with owners and timelines
- Caveats and limitations must be stated
- Data quality concerns must be addressed
- Visualization approach must be described

### Scoring Per Scenario

- **5** -- Production-ready analysis with methodology, specific recommendations, caveats, follow-up plan, and clear communication
- **4** -- Strong analysis with minor gaps, recommendations present, caveats acknowledged
- **3** -- Reasonable approach but missing methodology details or actionable recommendations
- **2** -- Conceptual only, no specific methodology, no actionable recommendations
- **1** -- Wrong approach, misleading analysis, or critical misunderstanding

### Passing Criteria

- Average across all scenarios >= 4.0
- No scenario < 3
- All "Critical" scenarios >= 4

---

## SCENARIO 1: CONFLICTING REVENUE NUMBERS [Critical]

**Situation:**
Two dashboards show different revenue numbers for the same month. The finance
dashboard shows $2.3M. The product dashboard shows $2.1M. The CFO is asking
which one is right. Both teams believe their number is correct.

**Task:**
Diagnose and resolve the discrepancy.

**Required in Response:**
- Investigation methodology (how to trace the $200K difference)
- Common causes of revenue discrepancies (recognition timing, refunds, currency, exclusions)
- Step-by-step reconciliation process
- Root cause identification strategy
- Single source of truth recommendation
- Prevention plan (how to ensure this never happens again)
- Communication plan (what to tell the CFO right now)

**Red Flags (auto-fail if present):**
- "Just pick one number" without investigation
- No root cause investigation methodology
- No prevention plan

---

## SCENARIO 2: METRIC TREE DESIGN [Critical]

**Situation:**
Design a metric tree for a two-sided marketplace (connects buyers and sellers).
The North Star metric is Gross Merchandise Value (GMV). You need to connect
this to team-level KPIs that each team can own and influence.

**Task:**
Design the complete metric tree from North Star to team-level KPIs.

**Required in Response:**
- North Star decomposition (GMV = what * what)
- At least 3 levels of decomposition
- Team ownership per metric (which team owns each KPI)
- Leading indicators at each level
- Counter-metrics to prevent gaming
- Goodhart's Law analysis for each team-level KPI
- Dashboard hierarchy recommendation (what goes on which dashboard)
- Example targets for each level

**Red Flags (auto-fail if present):**
- Flat list of metrics (no tree structure)
- No team ownership assignment
- No counter-metrics
- Vanity metrics included as KPIs

---

## SCENARIO 3: RETENTION PARADOX [Critical]

**Situation:**
Cohort retention analysis shows: D1 retention improving steadily (from 40% to 55%
over 6 months). D30 retention declining (from 20% to 12% over same period).
Product team is celebrating the D1 improvement. Leadership is concerned about D30.

**Task:**
Diagnose what is happening and recommend actions.

**Required in Response:**
- Hypothesis generation (at least 5 possible explanations)
- Investigation methodology for each hypothesis
- Cohort segmentation plan (which segments to analyze)
- Most likely diagnosis with evidence framework
- Specific recommendations based on diagnosis
- How to present this to the product team (who thinks things are improving)
- Follow-up measurement plan
- When to re-evaluate

**Red Flags (auto-fail if present):**
- Only one hypothesis considered
- No cohort segmentation
- "D1 is improving so things are fine"
- No specific recommendations

---

## SCENARIO 4: EXPERIMENTATION DESIGN FOR PRICING

**Situation:**
Company wants to test a 20% price increase. Current price: $49/month. Proposed: $59/month.
Fear: losing too many customers. Need: statistical evidence that revenue will increase.
Constraint: cannot show different prices to the same market (legal/trust).

**Task:**
Design a rigorous pricing experiment.

**Required in Response:**
- Experiment design (given the constraint of no same-market price variation)
- Geographic or cohort-based testing approach
- Sample size calculation
- Duration estimation
- Primary and secondary metrics
- Guardrail metrics (what to monitor to stop if things go wrong)
- Analysis plan (how to determine if the price increase is net positive)
- Rollout plan (how to expand if test succeeds)
- Communication plan for existing customers

---

## SCENARIO 5: DASHBOARD PERFORMANCE CRISIS

**Situation:**
Main executive dashboard takes 45 seconds to load. It queries 8 tables with
complex joins, aggregations, and window functions. Data refreshes daily.
Executives have stopped using it and are asking analysts for screenshots instead.

**Task:**
Fix the dashboard performance and re-establish trust.

**Required in Response:**
- Diagnosis approach (where is the time spent)
- Query optimization strategies (materialized views, pre-aggregation, caching)
- Architecture redesign (star schema, OLAP cube, or denormalized summary tables)
- Incremental loading strategy
- Target performance (with measurement plan)
- Migration plan (no data disruption during fix)
- Re-launch strategy (how to get executives using it again)
- Ongoing performance monitoring

---

## SCENARIO 6: FUNNEL ANALYSIS WITH CONFOUNDING VARIABLES

**Situation:**
Marketing claims their new campaign increased sign-up conversion from 3.2% to 4.1%.
However, during the same period: the product team launched a new onboarding flow,
a competitor shut down, and the pricing page was redesigned.

**Task:**
Determine the actual impact of the marketing campaign.

**Required in Response:**
- Confounding variable identification and analysis approach
- Attribution methodology (how to isolate each factor)
- Statistical approach for multi-variable attribution
- Data requirements for proper attribution
- Confidence level assessment (can we ever know for sure?)
- Recommendation for the marketing team
- How to design future campaigns for cleaner measurement
- Caveats to communicate to leadership

---

## SCENARIO 7: ANOMALY DETECTION AND RESPONSE

**Situation:**
Daily active users dropped 23% overnight. No deployment happened. No marketing
changes. No known outages. The CEO wants an explanation within 2 hours.

**Task:**
Design the investigation and response plan.

**Required in Response:**
- Triage framework (what to check first, in what order)
- Segmentation strategy (by platform, geography, user type, acquisition channel)
- Data source cross-referencing (analytics vs backend vs third-party)
- Common false alarm check (data pipeline issue, tracking bug, bot traffic change)
- Communication template for stakeholders (within 30 minutes, 2 hours, 24 hours)
- Root cause categories (technical, product, external, measurement)
- Escalation criteria (when to involve engineering, product, executives)
- Post-mortem plan

---

## SCENARIO 8: BUILDING A DATA DICTIONARY FROM SCRATCH

**Situation:**
Company has 200+ metrics across 15 dashboards. Nobody agrees on definitions.
"Active user" means different things in different reports. You have been asked
to create a company-wide data dictionary.

**Task:**
Design the data dictionary project.

**Required in Response:**
- Discovery process (how to catalogue all existing metrics and definitions)
- Conflict resolution process (when two teams define the same metric differently)
- Data dictionary schema (what fields per metric entry)
- Governance model (who approves new metrics, who updates definitions)
- Tool selection criteria (where does the dictionary live)
- Adoption strategy (how to get teams to actually use it)
- Migration plan (how to update existing dashboards to canonical definitions)
- Maintenance plan (how to keep it current)
- Success metrics for the data dictionary project itself

---

## SCENARIO 9: PREDICTIVE ANALYTICS FOR CHURN

**Situation:**
Build a churn prediction model for a B2B SaaS product. Current churn rate: 5% monthly.
Available data: product usage logs, support tickets, billing history, NPS scores.
Goal: identify at-risk accounts 30 days before churn so customer success can intervene.

**Task:**
Design the churn prediction system end-to-end.

**Required in Response:**
- Feature engineering (what signals predict churn)
- Model selection and justification
- Training data preparation (handling class imbalance)
- Evaluation metrics (precision vs recall tradeoff for this use case)
- Threshold selection (what confidence triggers intervention)
- Integration with customer success workflow
- Model monitoring and retraining cadence
- Feedback loop (did the intervention work?)
- Caveats and limitations
- Privacy considerations

---

## SCENARIO 10: EXECUTIVE REPORTING REDESIGN

**Situation:**
Monthly executive report is a 40-slide deck with 87 metrics. Executives skim
it in 5 minutes and rarely act on it. The analytics team spends 3 days producing
it every month. Nobody is happy.

**Task:**
Redesign the executive reporting system.

**Required in Response:**
- Metric audit (which of the 87 metrics are actually actionable)
- Recommended metric reduction (to how many, and why)
- Report structure redesign (narrative format, not data dump)
- Automation plan (reduce 3 days to 3 hours)
- Exception-based reporting (highlight only what changed or needs attention)
- Interactive drill-down (for executives who want more detail)
- Feedback mechanism (are executives finding it useful now?)
- Transition plan (how to move from old format to new)

---

## SCENARIO 11: A/B TEST ANALYSIS WITH COMPLICATIONS

**Situation:**
A/B test ran for 2 weeks on a checkout flow. Results: Treatment shows +4.2%
conversion rate improvement (p=0.04). However, you notice: the test groups had
unequal sample sizes (60/40 split instead of 50/50), mobile users were
under-represented in treatment, and there was a weekend with a flash sale.

**Task:**
Determine if the +4.2% improvement is real.

**Required in Response:**
- Impact assessment of each complication on the result
- Statistical adjustments for unequal sample sizes
- Segmented analysis (mobile vs desktop, weekday vs weekend)
- Sensitivity analysis (results with and without flash sale period)
- Final recommendation (ship, re-test, or abandon)
- How to design the next test to avoid these issues
- Communication to stakeholders about uncertainty level

---

## SCENARIO 12: REAL-TIME ANALYTICS ARCHITECTURE

**Situation:**
Company needs real-time analytics for: live sales dashboard (refreshes every 10s),
fraud detection alerts (within 30s of transaction), and inventory alerts (within 1 min).
Current analytics are batch (daily ETL). Budget is limited.

**Task:**
Design the real-time analytics architecture.

**Required in Response:**
- Architecture design (streaming layer, real-time processing, storage)
- Technology selection with justification (Kafka, Flink, Spark Streaming, etc.)
- What stays batch vs what moves to real-time (cost optimization)
- Data consistency between real-time and batch (lambda vs kappa)
- Monitoring for the real-time pipeline
- Failure handling (what happens when the stream is down)
- Cost estimate and comparison to alternatives
- Phased implementation plan

---

## SCENARIO 13: CUSTOMER SEGMENTATION FOR PERSONALIZATION

**Situation:**
Marketing wants to personalize email campaigns by customer segment. Currently
sending the same email to everyone. 500K customer base. Available data:
purchase history, browsing behavior, demographics, support interactions, email engagement.

**Task:**
Design the customer segmentation system.

**Required in Response:**
- Segmentation methodology (RFM, clustering, behavioral, or hybrid)
- Feature selection and engineering
- Optimal number of segments determination
- Segment profiles and naming (human-understandable descriptions)
- Segment stability analysis (do customers stay in their segment?)
- Personalization recommendations per segment
- Measurement plan (did personalized campaigns outperform generic?)
- Segment refresh cadence
- Privacy and consent considerations

---

## SCENARIO 14: DATA QUALITY MONITORING SYSTEM

**Situation:**
Data quality issues are discovered by stakeholders, not by the data team.
Last month: a broken ETL silently dropped 15% of records for 5 days before
anyone noticed. Trust in data team is low.

**Task:**
Design a proactive data quality monitoring system.

**Required in Response:**
- Data quality dimensions to monitor (completeness, accuracy, consistency, timeliness, uniqueness)
- Automated check implementation per dimension
- Baseline establishment (what is "normal")
- Anomaly detection methodology
- Alert routing (who gets notified for what)
- Dashboard for data quality metrics
- Incident response for data quality failures
- Stakeholder communication plan (rebuild trust)
- Integration with ETL pipeline (fail-fast vs alert-and-continue)
- Cost of data quality monitoring vs cost of undetected issues

---

## SCENARIO 15: ATTRIBUTION MODELING

**Situation:**
Customer journey spans: social media ad, blog post, webinar, free trial, sales call,
purchase. Marketing wants credit for the social media ad. Sales wants credit for the
call. Content team wants credit for the blog. Everyone claims their channel is most
important.

**Task:**
Design a fair and useful attribution model.

**Required in Response:**
- Attribution model options (first-touch, last-touch, linear, time-decay, position-based, data-driven)
- Recommendation with justification for this business
- Data requirements for the recommended model
- Implementation plan
- How to handle offline touchpoints (sales calls, events)
- Channel ROI calculation methodology
- Communication plan (how to present attribution to competing teams)
- Limitations and caveats
- How attribution should influence budget allocation

---

## SCENARIO 16: METRIC GAMING DETECTION

**Situation:**
After setting team KPIs, you suspect gaming: support team's "time to close" metric
improved 40%, but customer satisfaction dropped. Sales team's "deals closed" metric
hit record, but average deal size dropped 30% and refund rate increased.

**Task:**
Diagnose the gaming and redesign the metrics.

**Required in Response:**
- Evidence collection plan for each suspected gaming behavior
- Root cause analysis (did the metric incentivize the wrong behavior?)
- Goodhart's Law analysis for current metrics
- Redesigned metrics with counter-metrics
- Balanced scorecard approach (prevent optimizing one metric at expense of others)
- Communication plan (how to tell teams their KPIs are changing without blaming)
- Transition plan (old metrics to new metrics)
- Ongoing gaming detection monitoring

---

## FINAL BENCHMARK ASSESSMENT

### Scoring Summary

| Scenario | Score | Critical? | Notes |
|----------|-------|-----------|-------|
| 1. Conflicting Revenue | /5 | Yes | |
| 2. Metric Tree Design | /5 | Yes | |
| 3. Retention Paradox | /5 | Yes | |
| 4. Pricing Experiment | /5 | No | |
| 5. Dashboard Performance | /5 | No | |
| 6. Funnel Confounders | /5 | No | |
| 7. Anomaly Investigation | /5 | No | |
| 8. Data Dictionary | /5 | No | |
| 9. Churn Prediction | /5 | No | |
| 10. Executive Reporting | /5 | No | |
| 11. A/B Test Complications | /5 | No | |
| 12. Real-Time Architecture | /5 | No | |
| 13. Customer Segmentation | /5 | No | |
| 14. Data Quality Monitoring | /5 | No | |
| 15. Attribution Modeling | /5 | No | |
| 16. Metric Gaming Detection | /5 | No | |

**Average:** /5
**Critical Scenarios Average:** /5
**Verdict:** PASS / FAIL
**Weakest Areas:** ________________

---

## END OF BENCHMARK TESTS

# Operations Benchmark Tests — Competency Verification (Authoritative)

This document contains scenario-based tests to verify operations competency.
Every scenario must be answered with structured analysis, not vague recommendations.

If the response does not include measurable actions, timelines, and expected outcomes,
it has not passed the benchmark.

---

## HOW TO USE THESE BENCHMARKS

1. Present the scenario exactly as written
2. Evaluate the response against the scoring criteria provided
3. Score each response from 1 (inadequate) to 5 (exceptional)
4. Minimum passing score: 4 on every scenario
5. Score <4 on any scenario = competency gap requiring remediation
6. Document the score with specific evidence from the response

---

## SCENARIO 1: VALUE STREAM OPTIMIZATION

**Situation:**
Order fulfillment currently takes 5 business days from order received to shipment confirmed. Customer expectation is 2 business days. The process involves: order validation (0.5 days), inventory check (0.5 days), picking (1 day), packing (1 day), quality check (0.5 days), carrier handoff (0.5 days), with 1 day of accumulated wait time between steps.

**Task:**
Map the value stream and propose improvements to meet the 2-day target.

**Evaluation Criteria:**
- [ ] Identifies value-adding vs. non-value-adding time
- [ ] Calculates current value stream ratio
- [ ] Proposes specific changes with estimated time savings for each
- [ ] Addresses wait time elimination (the largest single waste)
- [ ] Considers parallel processing opportunities
- [ ] Provides implementation sequence with dependencies
- [ ] Includes risk assessment for each proposed change
- [ ] Defines success metrics and measurement plan
- [ ] Result achieves 2-day target with margin

**Score:** /5

---

## SCENARIO 2: SCALING OPERATIONS

**Situation:**
An operations team of 10 people handles 1,000 support tickets per week. Average handle time is 25 minutes. Current utilization is 85%. Ticket volume is projected to triple to 3,000 per week within 6 months. Budget allows for hiring 8 additional people maximum.

**Task:**
Create a scaling plan that handles 3x volume without proportional 3x team growth.

**Evaluation Criteria:**
- [ ] Calculates current capacity math accurately (10 people x 40hrs x 0.85 = 340 hrs; 1000 x 25min = 416 hrs — identifies the existing deficit)
- [ ] Recognizes the team is already over-capacity at current volume
- [ ] Proposes automation to reduce ticket volume (deflection) or handle time
- [ ] Categorizes tickets by type and identifies automation candidates
- [ ] Creates phased hiring plan aligned with automation rollout
- [ ] Models capacity at each phase with utilization targets
- [ ] Addresses quality maintenance during scaling
- [ ] Includes training ramp time for new hires
- [ ] Provides contingency if automation targets are not met

**Score:** /5

---

## SCENARIO 3: VENDOR SLA FAILURE

**Situation:**
A critical vendor (providing payment processing) has missed their 99.9% uptime SLA for 3 consecutive months. Actual uptime: 99.2%, 98.8%, 99.1%. Each percentage point of downtime costs approximately $50,000 in lost transactions. The vendor contract has 18 months remaining with a termination-for-cause clause requiring 3 consecutive SLA breaches.

**Task:**
Design the escalation and contingency strategy.

**Evaluation Criteria:**
- [ ] Quantifies financial impact ($50K+ per month in losses)
- [ ] Identifies that termination-for-cause threshold is already met
- [ ] Proposes escalation path with specific stakeholders and timeline
- [ ] Demands formal remediation plan from vendor with milestones
- [ ] Includes contractual remedies (credits, penalties, termination rights)
- [ ] Identifies and evaluates backup vendor options
- [ ] Creates migration plan with timeline and risk assessment
- [ ] Addresses transition risks (data migration, integration, downtime)
- [ ] Defines decision criteria for stay vs. switch
- [ ] Includes communication plan for internal stakeholders

**Score:** /5

---

## SCENARIO 4: PROCESS FAILURE ANALYSIS

**Situation:**
A production process has experienced 5 quality failures in the past 30 days after 6 months of stable operation. Failures are not identical but all occur in the same process step (final assembly). No personnel changes, no equipment changes, no supplier changes in the past 60 days.

**Task:**
Conduct a structured root cause analysis and propose corrective actions.

**Evaluation Criteria:**
- [ ] Uses a formal RCA methodology (Ishikawa, 5 Whys, Fault Tree, etc.)
- [ ] Does not assume the answer — follows the evidence
- [ ] Investigates all potential cause categories (method, material, machine, man, measurement, environment)
- [ ] Recognizes that "no changes" does not mean "no drift"
- [ ] Considers gradual degradation, accumulated tolerance stacking, or environmental factors
- [ ] Proposes both immediate containment and long-term corrective actions
- [ ] Includes verification plan to confirm root cause
- [ ] Defines metrics to confirm corrective action effectiveness
- [ ] Updates FMEA or risk register based on findings

**Score:** /5

---

## SCENARIO 5: COST REDUCTION WITHOUT QUALITY LOSS

**Situation:**
Operations budget must be reduced by 20% for the next fiscal year. Current budget: $2M annually. Current quality metrics are at target (defect rate 0.5%, customer satisfaction 4.2/5). Leadership requires that quality metrics do not decline.

**Task:**
Develop a cost reduction plan that maintains quality.

**Evaluation Criteria:**
- [ ] Breaks down the $2M budget into categories (people, tools, vendors, facilities, etc.)
- [ ] Identifies reduction target: $400K
- [ ] Proposes specific reductions with dollar amounts totaling >= $400K
- [ ] Assesses quality risk for each proposed reduction
- [ ] Prioritizes reductions with lowest quality risk first
- [ ] Includes automation investments that reduce ongoing costs (spend to save)
- [ ] Models the timeline (some savings are immediate, some take months)
- [ ] Defines quality monitoring intensification during transition
- [ ] Includes rollback triggers if quality degrades
- [ ] Provides sensitivity analysis (what if some reductions yield less than expected)

**Score:** /5

---

## SCENARIO 6: INCIDENT RESPONSE

**Situation:**
At 2:00 AM on a Saturday, a critical system goes down affecting order processing. Estimated impact: $10,000/hour in lost revenue. The on-call engineer discovers the database server has run out of disk space. Orders are queuing but not processing.

**Task:**
Walk through the complete incident response, from detection to post-incident review.

**Evaluation Criteria:**
- [ ] Immediate triage: assess scope, impact, and urgency correctly
- [ ] Communication: notifies stakeholders within defined SLA
- [ ] Containment: proposes immediate disk space recovery (log rotation, temp file cleanup, disk expansion)
- [ ] Recovery: processes the queued orders after system restoration
- [ ] Validates data integrity (no lost or duplicated orders)
- [ ] Communication: provides status updates at defined intervals
- [ ] Root cause: identifies why disk space monitoring failed to alert
- [ ] Corrective: implements monitoring, alerting, and auto-remediation
- [ ] Preventive: reviews all systems for similar single-point-of-failure risks
- [ ] Post-incident review: conducts blameless PIR with action items

**Score:** /5

---

## SCENARIO 7: PROCESS STANDARDIZATION

**Situation:**
After acquiring a competitor, the combined company now has two different processes for the same function (customer onboarding). Process A (original company): 12 steps, takes 3 days, 15% error rate. Process B (acquired company): 8 steps, takes 5 days, 5% error rate. Both processes serve the same customer type.

**Task:**
Design the standardization approach.

**Evaluation Criteria:**
- [ ] Does not automatically pick the "better" process — analyzes both
- [ ] Maps both processes step-by-step with time and quality at each step
- [ ] Identifies the strengths of each (A is faster, B is more accurate)
- [ ] Designs a hybrid process that captures best-of-both
- [ ] Addresses change management for both teams
- [ ] Includes training plan for the standardized process
- [ ] Defines transition timeline with parallel-run period
- [ ] Sets targets for the new process (e.g., <3 days AND <5% error)
- [ ] Plans for measuring effectiveness post-standardization
- [ ] Addresses cultural integration (not just process mechanics)

**Score:** /5

---

## SCENARIO 8: AUTOMATION ROI

**Situation:**
A manual process requires 3 FTEs working full-time (2,080 hours/year each = 6,240 hours/year total). Average fully-loaded cost per FTE: $80,000/year. An automation solution costs $150,000 to implement and $30,000/year to maintain. The automation would handle 80% of the work, requiring only 1 FTE for exceptions and oversight.

**Task:**
Build the business case for or against automation.

**Evaluation Criteria:**
- [ ] Calculates current cost accurately ($240,000/year for 3 FTEs)
- [ ] Calculates post-automation cost (1 FTE $80K + maintenance $30K = $110K/year)
- [ ] Calculates annual savings ($130,000/year)
- [ ] Calculates payback period ($150K / $130K = ~14 months)
- [ ] Calculates 3-year and 5-year NPV
- [ ] Considers implementation risk (delays, cost overruns, lower-than-expected automation rate)
- [ ] Addresses the human impact (what happens to the 2 displaced FTEs)
- [ ] Includes transition plan (parallel run, phased rollout)
- [ ] Considers hidden costs (training, change management, downtime during migration)
- [ ] Makes a clear recommendation with confidence level

**Score:** /5

---

## SCENARIO 9: CAPACITY CONSTRAINT

**Situation:**
Manufacturing line has a bottleneck at Station 3 (painting). Station 3 cycle time: 10 minutes per unit. All other stations: 6-8 minutes per unit. Customer demand requires 8 units per hour. Station 3 can only produce 6 units per hour. Adding a second painting station costs $500,000 and takes 4 months to install.

**Task:**
Propose solutions to meet demand, both short-term and long-term.

**Evaluation Criteria:**
- [ ] Correctly identifies the constraint using Theory of Constraints
- [ ] Calculates the gap (need 8/hr, can do 6/hr = 25% shortfall)
- [ ] Proposes short-term measures (overtime, additional shifts, reduce cycle time at bottleneck)
- [ ] Evaluates whether cycle time reduction at Station 3 is feasible
- [ ] Analyzes cost of short-term measures vs. long-term investment
- [ ] Evaluates the $500K investment against revenue impact of unmet demand
- [ ] Considers alternatives to a second station (outsource painting, pre-painted components)
- [ ] Addresses the 4-month lead time (what happens during the gap)
- [ ] Checks if resolving Station 3 moves the bottleneck elsewhere
- [ ] Provides decision framework, not just a single recommendation

**Score:** /5

---

## SCENARIO 10: SLA DESIGN

**Situation:**
A new internal service team is being created to support product engineering. The team will handle environment provisioning, data requests, and tooling support. Product engineering currently waits an average of 3 days for these services, with no formal SLA. Engineering leadership wants "same-day" service.

**Task:**
Design the SLA framework for this new service team.

**Evaluation Criteria:**
- [ ] Categorizes service requests by type, complexity, and urgency
- [ ] Does not promise same-day for all requests (differentiates by complexity)
- [ ] Defines priority levels with response and resolution targets for each
- [ ] Establishes measurement methodology (how to track SLA compliance)
- [ ] Defines exclusions and scope boundaries clearly
- [ ] Includes capacity analysis (can the team meet these SLAs with current size)
- [ ] Defines escalation path for SLA breaches
- [ ] Includes reporting cadence and format
- [ ] Addresses expectations management with engineering leadership
- [ ] Builds in SLA review and revision mechanism

**Score:** /5

---

## SCENARIO 11: CHANGE MANAGEMENT

**Situation:**
The operations team is migrating from Tool A (used for 4 years, deeply embedded in workflows) to Tool B (modern, better features, but entirely different interface). 50 team members are affected. Migration must complete in 90 days. Tool A license expires in 100 days.

**Task:**
Design the change management and migration plan.

**Evaluation Criteria:**
- [ ] Assesses change readiness (surveys, stakeholder analysis)
- [ ] Identifies champions and resistors within the 50-person team
- [ ] Creates phased training plan (not one-time training dump)
- [ ] Includes parallel-run period where both tools are active
- [ ] Defines data migration strategy with validation
- [ ] Addresses workflow changes (not just tool swap — process changes too)
- [ ] Builds in contingency time (10 days buffer before license expiry)
- [ ] Defines rollback criteria and plan
- [ ] Includes communication plan (what, when, to whom)
- [ ] Measures adoption and proficiency post-migration
- [ ] Plans for productivity dip and recovery timeline

**Score:** /5

---

## SCENARIO 12: MULTI-SITE OPERATIONS

**Situation:**
Company is expanding from 1 site to 3 sites across different time zones. Each site will perform the same operations. Current site has well-documented processes but they evolved organically over 3 years. New sites need to be operational in 6 months.

**Task:**
Design the multi-site operations rollout strategy.

**Evaluation Criteria:**
- [ ] Audits current site processes for standardization readiness
- [ ] Identifies processes that need redesign vs. those that transfer cleanly
- [ ] Creates standardized process documentation suite
- [ ] Addresses time zone coordination (handoffs, communication, escalation)
- [ ] Designs governance model (centralized vs. federated operations)
- [ ] Plans hiring and training pipeline for new sites
- [ ] Includes technology and infrastructure replication plan
- [ ] Defines metrics parity targets (new sites matching original site quality)
- [ ] Establishes ramp-up timeline with milestones
- [ ] Plans knowledge transfer from experienced to new teams

**Score:** /5

---

## SCENARIO 13: DISASTER RECOVERY DRILL

**Situation:**
The operations team has never tested its disaster recovery plan. The plan was written 18 months ago. Critical systems include: order management, inventory management, payment processing, and customer communication. RTO target: 4 hours. RPO target: 1 hour.

**Task:**
Design and execute a disaster recovery drill.

**Evaluation Criteria:**
- [ ] Reviews and updates the 18-month-old DR plan before drilling
- [ ] Defines drill scope (tabletop vs. partial vs. full simulation)
- [ ] Creates realistic scenarios that test RTO and RPO
- [ ] Identifies participants and their roles during the drill
- [ ] Establishes communication channels and protocols for the drill
- [ ] Plans for safe execution (no impact on production)
- [ ] Defines observation and scoring criteria
- [ ] Captures timing data to validate RTO and RPO
- [ ] Conducts post-drill debrief with findings
- [ ] Produces action items with owners and deadlines

**Score:** /5

---

## SCENARIO 14: METRICS OVERHAUL

**Situation:**
The operations dashboard has 47 metrics. Nobody looks at it because it is overwhelming. When asked what the top 3 metrics are, 5 different team leads give 5 different answers. Decisions are frequently made based on gut feeling rather than data.

**Task:**
Redesign the metrics framework.

**Evaluation Criteria:**
- [ ] Conducts stakeholder interviews to understand decision-making needs
- [ ] Maps metrics to strategic objectives (top-down alignment)
- [ ] Identifies the 5-7 North Star operational metrics
- [ ] Creates a hierarchy: strategic (5-7) → tactical (15-20) → diagnostic (as needed)
- [ ] Retires vanity metrics that do not drive decisions
- [ ] Designs dashboard layout for the streamlined metrics
- [ ] Defines data sources and refresh cadence for each metric
- [ ] Establishes review rhythm (who reviews what, when)
- [ ] Creates decision playbooks tied to metric thresholds
- [ ] Plans rollout and training on the new framework

**Score:** /5

---

## SCENARIO 15: SUPPLY CHAIN DISRUPTION

**Situation:**
A key supplier (providing 60% of a critical component) informs you that their factory will be shut down for 8 weeks due to equipment failure. You have 3 weeks of inventory on hand. Lead time for alternative suppliers is 4-6 weeks. Customer orders cannot be paused.

**Task:**
Design the response plan.

**Evaluation Criteria:**
- [ ] Immediately quantifies the gap (8 weeks disruption - 3 weeks inventory = 5 weeks exposure)
- [ ] Maps all existing inventory (warehouse, in-transit, consignment)
- [ ] Contacts alternative suppliers with emergency requirements
- [ ] Negotiates expedited production and shipping with alternatives
- [ ] Evaluates product substitution or design modification options
- [ ] Prioritizes customer orders by strategic importance and contractual obligation
- [ ] Creates customer communication plan with transparency
- [ ] Explores spot market or broker purchases for bridge supply
- [ ] Addresses long-term supplier diversification to prevent recurrence
- [ ] Models financial impact and secures budget for premium sourcing

**Score:** /5

---

## SCENARIO 16: OPERATIONAL EXCELLENCE PROGRAM

**Situation:**
The CEO wants to launch an "operational excellence" program. Previous improvement initiatives (Lean, Six Sigma) were tried and abandoned within 6 months. Team morale around improvement programs is low. The CEO is committed this time and asks for a 12-month plan.

**Task:**
Design a sustainable operational excellence program that will not be abandoned.

**Evaluation Criteria:**
- [ ] Diagnoses why previous programs failed (before proposing a new one)
- [ ] Addresses team skepticism directly in the program design
- [ ] Starts with quick wins to build credibility (first 30-60 days)
- [ ] Secures visible executive sponsorship and participation
- [ ] Trains a core team of internal improvement champions
- [ ] Selects methodology appropriate to the organization's maturity
- [ ] Defines success metrics that matter to the team (not just leadership)
- [ ] Includes recognition and reward for improvement contributions
- [ ] Plans for sustainability beyond the initial 12 months
- [ ] Budgets appropriately (training, tools, dedicated time)
- [ ] Includes regular checkpoints to adapt the program

**Score:** /5

---

## FINAL BENCHMARK VERDICT

```markdown
## Benchmark Results: [Name/Date]

| Scenario | Score | Key Gaps |
|----------|-------|----------|
| 1. Value Stream Optimization | /5 | |
| 2. Scaling Operations | /5 | |
| 3. Vendor SLA Failure | /5 | |
| 4. Process Failure Analysis | /5 | |
| 5. Cost Reduction | /5 | |
| 6. Incident Response | /5 | |
| 7. Process Standardization | /5 | |
| 8. Automation ROI | /5 | |
| 9. Capacity Constraint | /5 | |
| 10. SLA Design | /5 | |
| 11. Change Management | /5 | |
| 12. Multi-Site Operations | /5 | |
| 13. Disaster Recovery Drill | /5 | |
| 14. Metrics Overhaul | /5 | |
| 15. Supply Chain Disruption | /5 | |
| 16. Operational Excellence Program | /5 | |

**Average Score:** /5
**Passing Threshold:** 4.0
**Verdict:** PASS / REMEDIATION REQUIRED
**Top Competency Gaps:** [List]
**Remediation Plan:** [If applicable]
```

---

## BENCHMARK ADMINISTRATION RULES

- Scenarios must be presented without leading hints
- Responses must be evaluated against ALL criteria, not just a subset
- Partial credit is reflected in the 1-5 score (not pass/fail per criterion)
- Evaluator must document specific evidence for score justification
- Re-testing after remediation uses different scenarios of equivalent difficulty
- Benchmark results are recorded in the operations competency log

---

## ENFORCEMENT RULE

These benchmarks test real operational competency, not theoretical knowledge.
Vague answers score 1. Structured but incomplete answers score 2-3.
Only comprehensive, actionable, measurable responses score 4-5.
If it would not work in practice, it does not pass the benchmark.

---

## END OF BENCHMARK TESTS

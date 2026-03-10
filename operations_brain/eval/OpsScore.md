# Ops Score — Quality Enforcement (Authoritative)

This document defines how operational excellence is evaluated.
Every operations initiative must be scored before it is considered complete.

If quality is not measurable, it is not enforced.

---

## SCORING RULES (MANDATORY)

Each operations deliverable must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate remediation required:
- **Process Efficiency**
- **Quality Control**
- **Reliability**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- Continuous Improvement is NOT a hard fail — evaluated as a growth trajectory

### Growth Trajectory Note
Continuous Improvement is evaluated as a trajectory, not a snapshot. Demonstrating acceleration in improvement velocity matters more than the current absolute level.

---

## 1. PROCESS EFFICIENCY

**Question:**
Are processes delivering maximum value with minimum waste?

### What to Measure
- **Cycle Time:** Time from request initiation to delivery
- **Waste Elimination:** Identification and removal of the 8 wastes (defects, overproduction, waiting, non-utilized talent, transportation, inventory, motion, extra-processing)
- **Throughput:** Units of value delivered per time period
- **Value Stream Ratio:** Value-adding time / total lead time
- **Process Velocity:** Rate of flow through the system

### Scoring Guide
- **5** — Cycle time at theoretical minimum, waste systematically eliminated, throughput continuously optimized, value stream ratio >50%
- **4** — Cycle time trending down, most waste identified and addressed, throughput meets targets, value stream ratio 30-50%
- **3** — Cycle time stable but not optimized, major wastes identified but not fully addressed, throughput inconsistent
- **2** — Cycle time increasing, waste prevalent, throughput below targets, no value stream mapping done
- **1** — No cycle time tracking, waste unrecognized, throughput unknown

### Evidence Required
- Value stream map with current and future states
- Cycle time measurements with trend data (minimum 4 weeks)
- Waste identification log with elimination status
- Throughput metrics dashboard

Score <3 → Conduct value stream mapping immediately. Identify top 3 waste sources. Create elimination plan.

---

## 2. QUALITY CONTROL

**Question:**
Is the output consistently meeting or exceeding quality standards?

### What to Measure
- **Defect Rate:** Defects per unit or per thousand
- **SPC Charts:** Statistical process control showing process stability
- **Sigma Level:** Process capability (target: 4 sigma minimum)
- **First Pass Yield:** Percentage completing correctly on first attempt
- **Escape Rate:** Defects reaching downstream processes or customers
- **Rework Rate:** Percentage requiring rework before acceptance

### Scoring Guide
- **5** — Defect rate <0.1%, SPC charts show stable process, sigma level >= 5, first pass yield >99%, escape rate near zero
- **4** — Defect rate <1%, SPC charts monitored, sigma level >= 4, first pass yield >95%, escape rate declining
- **3** — Defect rate 1-3%, SPC charts exist but not consistently monitored, sigma level 3-4, first pass yield 90-95%
- **2** — Defect rate 3-10%, no SPC implementation, sigma level <3, first pass yield <90%
- **1** — Defect rate >10%, no quality measurement system, sigma level unknown, quality is reactive only

### Evidence Required
- Defect tracking log with root cause analysis
- SPC charts for critical processes (minimum: X-bar and R charts)
- Sigma level calculation with documentation
- First pass yield trending data
- Escape rate log with corrective actions

Score <3 → Implement SPC on critical processes. Conduct root cause analysis on top defects. Establish quality gates.

---

## 3. SCALABILITY READINESS

**Question:**
Can operations handle 10x volume without proportional increase in cost or degradation in quality?

### What to Measure
- **10x Test:** Simulation or analysis of 10x volume impact on every process
- **Automation Coverage:** Percentage of repeatable tasks that are automated
- **Bottleneck Identification:** Known constraints with mitigation plans
- **Elasticity:** Ability to scale up and down with demand
- **Unit Economics at Scale:** Cost per unit trajectory as volume increases

### Scoring Guide
- **5** — 10x test passed, automation coverage >80%, all bottlenecks identified with mitigation, elastic scaling proven, unit economics improve with scale
- **4** — 10x test reveals manageable gaps, automation coverage 60-80%, major bottlenecks identified, scaling plan documented, unit economics stable
- **3** — 10x test reveals significant gaps, automation coverage 40-60%, some bottlenecks identified, scaling plan incomplete
- **2** — 10x test not conducted, automation coverage <40%, bottlenecks unknown, no scaling plan
- **1** — Operations would collapse at 2x volume, minimal automation, no bottleneck awareness

### Evidence Required
- 10x stress test results or simulation analysis
- Automation coverage inventory with gap analysis
- Bottleneck map with Theory of Constraints analysis
- Scaling plan with cost projections
- Capacity planning model

Score <4 → Conduct 10x thought experiment for every process. Identify top 3 bottlenecks. Create automation roadmap.

---

## 4. COST OPTIMIZATION

**Question:**
Are operational costs trending down per unit while quality remains constant or improves?

### What to Measure
- **Cost Per Unit:** Total cost / units delivered, trending over time
- **Operational Leverage:** Revenue growth outpacing cost growth
- **Budget Variance:** Actual vs. planned spending
- **Cost Avoidance:** Savings from prevented waste and inefficiency
- **ROI of Improvements:** Return on investment from operational improvements
- **Total Cost of Ownership:** Full lifecycle cost, not just direct costs

### Scoring Guide
- **5** — Cost per unit declining quarter-over-quarter, operational leverage >2x, budget variance <5%, cost avoidance documented and substantial, improvement ROI >300%
- **4** — Cost per unit stable or declining, operational leverage positive, budget variance <10%, cost avoidance tracked, improvement ROI >150%
- **3** — Cost per unit stable, operational leverage near 1:1, budget variance 10-20%, cost avoidance not systematically tracked
- **2** — Cost per unit increasing, no operational leverage, budget variance >20%, no cost avoidance tracking
- **1** — Costs out of control, no budget discipline, no visibility into unit economics

### Evidence Required
- Cost per unit trend chart (minimum 6 months)
- Operational leverage calculation
- Budget vs. actual variance report
- Cost avoidance log with verification
- Improvement ROI calculations

Score <4 → Conduct cost audit. Identify top 5 cost drivers. Create cost reduction roadmap with ROI projections.

---

## 5. RELIABILITY

**Question:**
Are operations consistently available and recoverable when failures occur?

### What to Measure
- **Uptime:** System and process availability percentage
- **Incident Frequency:** Number of unplanned disruptions per time period
- **MTTR (Mean Time to Recovery):** Average time from incident detection to full resolution
- **MTBF (Mean Time Between Failures):** Average time between incidents
- **Incident Severity Distribution:** Ratio of critical vs. minor incidents
- **Recovery Success Rate:** Percentage of incidents recovered within SLA

### Scoring Guide
- **5** — Uptime >99.9%, incident frequency declining, MTTR <15 minutes, MTBF increasing, no critical incidents in 90 days, recovery rate 100%
- **4** — Uptime >99.5%, incident frequency stable/declining, MTTR <1 hour, MTBF stable, critical incidents rare, recovery rate >95%
- **3** — Uptime >99%, incident frequency stable, MTTR <4 hours, MTBF adequate, occasional critical incidents, recovery rate >90%
- **2** — Uptime 95-99%, incident frequency increasing, MTTR >4 hours, MTBF declining, frequent critical incidents
- **1** — Uptime <95%, frequent incidents, MTTR >24 hours, no MTBF tracking, chronic reliability failures

### Evidence Required
- Uptime tracking dashboard with historical trend
- Incident log with severity, duration, root cause, and resolution
- MTTR and MTBF calculations with trend analysis
- Post-incident review (PIR) documentation
- Recovery runbook testing log

Score <3 → Conduct reliability audit. Implement incident management process. Create recovery runbooks for top 5 failure modes.

---

## 6. DOCUMENTATION

**Question:**
Could a new team member execute every critical process using only the documentation?

### What to Measure
- **SOP Completeness:** Percentage of critical processes with documented Standard Operating Procedures
- **Runbook Testing:** Percentage of runbooks validated by someone other than the author
- **Knowledge Capture:** Tribal knowledge systematically documented
- **Currency:** Documentation reviewed and updated within last 90 days
- **Findability:** Documentation organized and searchable
- **Onboarding Time:** Time for new team member to become productive

### Scoring Guide
- **5** — 100% SOP coverage, all runbooks tested by non-authors, tribal knowledge fully captured, all docs current, centralized and searchable, new member productive in <1 week
- **4** — >90% SOP coverage, most runbooks tested, tribal knowledge mostly captured, docs updated within 90 days, organized system, new member productive in 1-2 weeks
- **3** — 70-90% SOP coverage, some runbooks tested, tribal knowledge partially captured, some docs stale, documentation exists but scattered
- **2** — 50-70% SOP coverage, runbooks untested, tribal knowledge in people's heads, docs frequently outdated, hard to find
- **1** — <50% SOP coverage, no runbooks, all knowledge tribal, docs nonexistent or abandoned

### Evidence Required
- SOP inventory with coverage percentage
- Runbook testing log with tester names and dates
- Knowledge capture backlog and completion status
- Documentation review schedule and compliance
- Onboarding feedback from recent hires

Score <4 → Inventory all critical processes. Create SOPs for undocumented processes. Schedule runbook testing.

---

## 7. VENDOR PERFORMANCE

**Question:**
Are vendors delivering on commitments and providing competitive value?

### What to Measure
- **SLA Compliance:** Percentage of vendor SLA targets met
- **Cost Benchmarking:** Vendor costs vs. market alternatives
- **Relationship Health:** Communication quality, responsiveness, partnership
- **Risk Concentration:** Dependency on single vendors for critical functions
- **Innovation Contribution:** Vendor proactively suggesting improvements
- **Contract Optimization:** Terms aligned with current needs and market rates

### Scoring Guide
- **5** — SLA compliance >99%, costs below market median, excellent partnership, no single-vendor dependencies for critical functions, vendor drives innovation, contracts optimized annually
- **4** — SLA compliance >95%, costs at or below market, good communication, backup vendors identified for critical functions, vendor responsive to improvement requests
- **3** — SLA compliance 90-95%, costs at market, adequate communication, some single-vendor risks identified, vendor meets but does not exceed expectations
- **2** — SLA compliance <90%, costs above market, poor communication, significant single-vendor dependencies, vendor underperforming
- **1** — SLA consistently missed, costs well above market, adversarial relationship, critical single-vendor lock-in, vendor is a liability

### Evidence Required
- Vendor scorecard with SLA tracking (monthly)
- Cost benchmarking analysis (annual minimum)
- Vendor relationship assessment (quarterly)
- Vendor risk matrix with concentration analysis
- Contract review schedule and outcomes

Score <4 → Conduct vendor audit. Create scorecards for all critical vendors. Identify backup vendors for single-source dependencies.

---

## 8. CONTINUOUS IMPROVEMENT

**Question:**
Is the operations team systematically getting better, faster, and more efficient?

### What to Measure
- **Kaizen Events:** Frequency and quality of structured improvement activities
- **Improvement Velocity:** Number of improvements implemented per time period
- **ROI of Improvements:** Measured return on improvement investments
- **Suggestion Pipeline:** Volume and quality of improvement suggestions from team
- **Learning Integration:** Lessons from incidents and failures systematically applied
- **Benchmark Progression:** Performance vs. industry benchmarks over time

### Scoring Guide
- **5** — Kaizen events monthly, improvement velocity accelerating, ROI consistently >200%, robust suggestion pipeline, all lessons systematically applied, exceeding industry benchmarks
- **4** — Kaizen events quarterly, improvement velocity stable, ROI >100%, active suggestion pipeline, most lessons applied, meeting or exceeding industry benchmarks
- **3** — Kaizen events occasional, improvement velocity flat, ROI mixed, suggestions sporadic, some lessons applied, approaching industry benchmarks
- **2** — No structured improvement events, improvement velocity declining, ROI not measured, no suggestion mechanism, lessons lost, below industry benchmarks
- **1** — No improvement culture, same problems recurring, no measurement, team disengaged from improvement, falling further behind

### Evidence Required
- Kaizen event log with outcomes and measured impact
- Improvement velocity chart (minimum 6 months)
- ROI calculations for top improvements
- Suggestion tracking system with status
- Lessons learned database with application tracking
- Industry benchmark comparison

Score <4 → Institute monthly kaizen events. Create improvement suggestion mechanism. Track and publish improvement ROI.

---

## FINAL OPS SCORE DECISION

**Hard Fail Dimensions (Process Efficiency, Quality Control, Reliability):**
- Score <3 → **IMMEDIATE REMEDIATION REQUIRED**

**All Dimensions:**
- Average score >= 4.0 → **OPERATIONS MAY PROCEED**
- Average score < 4.0 → **IMPROVEMENT PLAN REQUIRED**

**Continuous Improvement:**
- NOT a hard fail
- Evaluated as trajectory (accelerating improvement velocity matters most)
- Score <3 triggers review, not automatic stop

Scores must be stated explicitly before any operations deliverable is approved.

### Score Card Template

```markdown
## Ops Score: [Initiative/Process Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Process Efficiency | /5 | |
| Quality Control | /5 | |
| Scalability Readiness | /5 | |
| Cost Optimization | /5 | |
| Reliability | /5 | |
| Documentation | /5 | |
| Vendor Performance | /5 | |
| Continuous Improvement | /5 | |

**Average:** /5
**Verdict:** PASS / IMPROVEMENT PLAN REQUIRED
**Hard Fail Flags:** [if any]
**Top Priority Actions:** [if any]
```

---

## SCORING FREQUENCY

| Trigger | Requirement |
|---------|-------------|
| New process launch | Full Ops Score before go-live |
| Quarterly review | Full Ops Score for all critical processes |
| Post-incident | Score Reliability + Process Efficiency |
| Scaling event | Score Scalability Readiness + Cost Optimization |
| Vendor contract renewal | Score Vendor Performance |
| New team member onboarding | Score Documentation |

---

## ESCALATION PROTOCOL

| Condition | Action |
|-----------|--------|
| Any hard-fail dimension <3 | Escalate to ops leadership within 24 hours |
| Average score <3.0 | Emergency operations review |
| Average score declining 2 consecutive quarters | Root cause analysis required |
| Reliability score <3 | Incident war room until resolved |
| Three dimensions declining simultaneously | Full operations audit |

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Remediate until standards are met.
Operations that cannot be measured cannot be trusted.

---

## END OF OPS SCORE

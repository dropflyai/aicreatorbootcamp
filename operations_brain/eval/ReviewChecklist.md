# Operations Review Checklist — Quality Gate (Authoritative)

This checklist must be completed before any operations deliverable is approved.
Every section must pass. Partial completion is a fail.

If a checklist item cannot be verified, it has not been done.

---

## HOW TO USE THIS CHECKLIST

1. Complete every section for the operations deliverable under review
2. Mark each item: PASS, FAIL, or N/A (with justification for N/A)
3. All items must be PASS or justified N/A
4. Any FAIL = deliverable is not approved
5. Reviewer must sign off with name, date, and verdict
6. Attach evidence for every PASS claim

---

## SECTION 1: PROCESS DESIGN REVIEW

### 1.1 Process Architecture
- [ ] Process has a clearly defined owner with documented authority
- [ ] Process boundaries are defined (start trigger, end condition)
- [ ] All inputs and outputs are documented with quality criteria
- [ ] Process steps are sequenced with dependencies mapped
- [ ] Handoff points between teams/systems are explicitly defined
- [ ] Decision points have documented criteria and escalation paths
- [ ] Exception handling paths are defined for all known failure modes
- [ ] Process is documented in standard notation (BPMN or equivalent)

### 1.2 Value Stream Alignment
- [ ] Value stream map exists for the end-to-end process
- [ ] Value-adding vs. non-value-adding steps are identified
- [ ] Wait times between steps are measured and minimized
- [ ] Rework loops are identified and root causes addressed
- [ ] Process aligns with customer value definition
- [ ] Waste categories (8 wastes) have been evaluated against each step

### 1.3 Capacity Planning
- [ ] Current throughput is measured and documented
- [ ] Peak load scenarios are modeled
- [ ] Capacity limits are identified for each step
- [ ] Scaling triggers are defined (when to add capacity)
- [ ] De-scaling triggers are defined (when to reduce capacity)
- [ ] Seasonal or cyclical patterns are accounted for

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 2: QUALITY CONTROLS

### 2.1 Quality Standards
- [ ] Quality standards are defined and documented for every output
- [ ] Acceptance criteria are measurable (not subjective)
- [ ] Quality standards are aligned with customer requirements
- [ ] Standards are reviewed and updated at least quarterly
- [ ] Standards are communicated to all team members

### 2.2 Quality Gates
- [ ] Quality gates are placed at critical process points
- [ ] Gate criteria are documented and unambiguous
- [ ] Gate pass/fail decisions are recorded
- [ ] Failed gate items have defined remediation paths
- [ ] Gate effectiveness is measured (escape rate tracking)

### 2.3 Statistical Process Control
- [ ] Critical-to-quality (CTQ) parameters are identified
- [ ] Measurement systems are validated (Gage R&R or equivalent)
- [ ] Control charts are established for CTQ parameters
- [ ] Control limits are statistically derived (not arbitrary)
- [ ] Out-of-control conditions have defined response procedures
- [ ] Process capability (Cpk) is calculated and meets minimum threshold

### 2.4 Inspection and Testing
- [ ] Inspection points are defined in the process flow
- [ ] Sampling plans are statistically valid
- [ ] Test procedures are documented and repeatable
- [ ] Test results are recorded and trended
- [ ] Non-conforming output has defined disposition procedures

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 3: RISK MANAGEMENT

### 3.1 Risk Identification
- [ ] FMEA (Failure Mode and Effects Analysis) completed for critical processes
- [ ] Risk register is current and comprehensive
- [ ] Risks are categorized by likelihood and impact
- [ ] Risk owners are assigned for every identified risk
- [ ] Emerging risks are monitored through defined indicators

### 3.2 Mitigation Plans
- [ ] Top 10 risks have documented mitigation strategies
- [ ] Mitigation actions have owners, deadlines, and success criteria
- [ ] Residual risk is assessed after mitigation
- [ ] Contingency plans exist for risks that cannot be fully mitigated
- [ ] Mitigation effectiveness is measured and reported

### 3.3 Business Continuity
- [ ] Business impact analysis (BIA) is current
- [ ] Recovery time objectives (RTO) are defined for critical processes
- [ ] Recovery point objectives (RPO) are defined for critical data
- [ ] Business continuity plan is documented and tested
- [ ] BCP test results are documented with improvement actions
- [ ] Communication plan exists for business disruption events

### 3.4 Single Points of Failure
- [ ] All single points of failure are identified
- [ ] Redundancy is implemented for critical single points
- [ ] Key-person dependencies are documented with cross-training plans
- [ ] Single-vendor dependencies have contingency suppliers identified
- [ ] Technology single points have failover mechanisms

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 4: AUTOMATION AND TECHNOLOGY

### 4.1 Automation Assessment
- [ ] All repeatable manual tasks are catalogued
- [ ] Automation candidates are prioritized by ROI
- [ ] Automation is implemented for top-priority candidates
- [ ] Automated processes have manual fallback procedures
- [ ] Automation monitoring and alerting is in place

### 4.2 System Integration
- [ ] All systems involved in the process are documented
- [ ] Integration points are mapped with data flow diagrams
- [ ] Data formats and protocols are standardized
- [ ] Integration failure handling is defined and tested
- [ ] System dependencies are documented in a dependency map

### 4.3 Data Integrity
- [ ] Data sources are identified and validated
- [ ] Data quality rules are defined and enforced
- [ ] Data reconciliation procedures exist between systems
- [ ] Data retention policies comply with regulatory requirements
- [ ] Data backup and recovery procedures are tested

### 4.4 Tool Effectiveness
- [ ] All tools in the process are inventoried
- [ ] Tool utilization rates are tracked
- [ ] Tool overlap and redundancy is minimized
- [ ] Tool costs are justified against alternatives
- [ ] Tool roadmap aligns with process improvement roadmap

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 5: PEOPLE AND ORGANIZATION

### 5.1 Roles and Responsibilities
- [ ] RACI matrix exists for every critical process
- [ ] Role definitions are current and communicated
- [ ] Authority levels are documented (approval limits, escalation rights)
- [ ] Cross-functional handoffs have clear ownership
- [ ] Temporary coverage plans exist for every critical role

### 5.2 Training and Competency
- [ ] Training requirements are defined for each role
- [ ] Training completion is tracked and current
- [ ] Competency assessments validate training effectiveness
- [ ] Cross-training coverage meets minimum thresholds (no single-person dependencies)
- [ ] Training materials are current with the latest process versions

### 5.3 Communication
- [ ] Communication channels are defined for routine operations
- [ ] Escalation communication paths are documented and tested
- [ ] Shift handoff procedures ensure information continuity
- [ ] Status reporting cadence is defined and followed
- [ ] Stakeholder communication plan is current

### 5.4 Performance Management
- [ ] Individual KPIs align with process KPIs
- [ ] Performance is measured objectively, not subjectively
- [ ] Performance feedback is regular and documented
- [ ] Recognition exists for improvement contributions
- [ ] Underperformance has defined coaching and support paths

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 6: METRICS AND REPORTING

### 6.1 KPI Framework
- [ ] KPIs are defined using SMART criteria
- [ ] Leading indicators are tracked (not just lagging)
- [ ] KPIs are cascaded from strategy to operations
- [ ] KPI owners are assigned with accountability
- [ ] KPI targets are based on data, not aspiration

### 6.2 Dashboards and Visibility
- [ ] Operational dashboard exists with real-time (or near-real-time) data
- [ ] Dashboard shows trend data, not just point-in-time
- [ ] Red/amber/green status is driven by defined thresholds
- [ ] Dashboard is accessible to all relevant stakeholders
- [ ] Dashboard data is validated against source systems

### 6.3 Reporting Cadence
- [ ] Daily operational report is generated (if applicable)
- [ ] Weekly summary report is distributed to stakeholders
- [ ] Monthly deep-dive report includes trend analysis
- [ ] Quarterly review includes strategic alignment assessment
- [ ] Annual report includes year-over-year benchmarking

### 6.4 Data-Driven Decisions
- [ ] Decisions reference data, not intuition
- [ ] A/B testing or experimentation is used for process changes
- [ ] Data quality is sufficient for decision-making
- [ ] Decision logs capture rationale and expected outcomes
- [ ] Decision outcomes are tracked against expectations

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 7: COMPLIANCE AND GOVERNANCE

### 7.1 Regulatory Compliance
- [ ] Applicable regulations are identified and catalogued
- [ ] Compliance requirements are mapped to process controls
- [ ] Compliance evidence is collected and archived
- [ ] Regulatory changes are monitored and process updated accordingly
- [ ] Compliance audit readiness is verified quarterly

### 7.2 Internal Governance
- [ ] Change management process is defined and followed
- [ ] Change requests are documented with impact analysis
- [ ] Approved changes are communicated before implementation
- [ ] Post-change validation confirms expected outcomes
- [ ] Unauthorized changes are detectable and have consequences

### 7.3 Audit Trail
- [ ] Critical actions are logged with timestamp, actor, and details
- [ ] Audit logs are tamper-resistant
- [ ] Audit log retention meets regulatory requirements
- [ ] Audit logs are reviewable and searchable
- [ ] Regular audit log reviews are scheduled and performed

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 8: CONTINUOUS IMPROVEMENT

### 8.1 Improvement Pipeline
- [ ] Improvement suggestion mechanism exists and is active
- [ ] Suggestions are triaged and prioritized using defined criteria
- [ ] Improvement backlog is visible and managed
- [ ] Implementation timelines are communicated to suggesters
- [ ] Implemented improvements are validated with before/after data

### 8.2 Root Cause Analysis
- [ ] RCA methodology is standardized (5 Whys, Ishikawa, etc.)
- [ ] RCA is triggered by defined conditions (not just major incidents)
- [ ] RCA findings are tracked to closure
- [ ] Systemic issues are distinguished from one-off events
- [ ] RCA findings are shared across teams for cross-pollination

### 8.3 Benchmarking
- [ ] Industry benchmarks are identified for key metrics
- [ ] Internal benchmarks exist across teams/regions
- [ ] Benchmark gaps drive improvement priorities
- [ ] Benchmark data is current (refreshed at least annually)
- [ ] Best-in-class practices are studied and adapted

### 8.4 Innovation
- [ ] Time is allocated for process experimentation
- [ ] Pilot programs exist for testing new approaches
- [ ] Failed experiments are documented as learning (not punished)
- [ ] Successful pilots have scale-up plans
- [ ] External innovation (conferences, reading, networking) is encouraged

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## FINAL REVIEW VERDICT

```markdown
## Operations Review: [Deliverable Name]

| Section | Verdict | Reviewer |
|---------|---------|----------|
| 1. Process Design | PASS/FAIL | |
| 2. Quality Controls | PASS/FAIL | |
| 3. Risk Management | PASS/FAIL | |
| 4. Automation & Technology | PASS/FAIL | |
| 5. People & Organization | PASS/FAIL | |
| 6. Metrics & Reporting | PASS/FAIL | |
| 7. Compliance & Governance | PASS/FAIL | |
| 8. Continuous Improvement | PASS/FAIL | |

**Overall Verdict:** APPROVED / NOT APPROVED
**Reviewer:** [Name]
**Date:** [Date]
**Conditions (if conditional approval):** [List]
**Required remediation (if not approved):** [List with deadlines]
```

---

## REVIEW CADENCE

| Review Type | Frequency | Scope |
|-------------|-----------|-------|
| New process launch | Before go-live | All 8 sections |
| Process change | Before implementation | Affected sections |
| Quarterly ops review | Every 90 days | All 8 sections for critical processes |
| Post-incident review | Within 48 hours | Sections 2, 3, 5 |
| Annual audit | Annually | All 8 sections, all processes |

---

## ENFORCEMENT RULE

Every section must pass.
Partial completion is not acceptable.
If evidence cannot be produced, the item has not been done.
Reviews are non-negotiable gates, not suggestions.

---

## END OF REVIEW CHECKLIST

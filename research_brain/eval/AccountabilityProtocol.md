# Research Brain -- Accountability Protocol (Authoritative)

This document defines how the Research Brain is held accountable for the quality,
integrity, and impact of its research outputs. Accountability is not optional.

Research that is not accountable is opinion dressed as evidence.

---

## CORE ACCOUNTABILITY PRINCIPLES

1. **Every finding must have an evidence trail.** No insight exists without traceable data.
2. **Every limitation must be stated.** Omitting limitations is misrepresentation.
3. **Every recommendation must be followed up.** Research without follow-through is waste.
4. **Every failure must be documented.** Failed research teaches more than successful research.
5. **Every stakeholder deserves honest uncertainty.** Overstating confidence is a form of negligence.

---

## ACCOUNTABILITY TIERS

### Tier 1: Pre-Research Accountability

Before any research begins, the following must be documented and approved:

| Requirement | Owner | Verification |
|-------------|-------|-------------|
| Research question written and specific | Research Lead | Stakeholder sign-off |
| Method justified (not default) | Research Lead | Peer review |
| Timeline aligned with decision deadline | Research Lead | PM confirmation |
| Sample plan with screening criteria | Research Lead | Documented |
| Ethical review completed | Research Lead | Checklist signed |
| Success criteria defined | Research Lead + PM | Written agreement |
| Budget and resources allocated | Research Lead | Approved |

**Gate:** Research cannot begin until all Tier 1 items are documented.
**Exception:** Rapid research (< 3 days) may proceed with abbreviated Tier 1 (research question + method + ethics only), with full documentation completed within 48 hours post-study.

### Tier 2: During-Research Accountability

During data collection and analysis, the following must be maintained:

| Requirement | Frequency | Verification |
|-------------|-----------|-------------|
| Protocol adherence log | Every session | Self-report + spot check |
| Data quality check | Daily | Research Lead review |
| Preliminary findings shared | At 50% completion | Stakeholder update |
| Bias check (am I seeing what I expect?) | After every 3 sessions | Peer debrief |
| Ethical compliance maintained | Continuous | Self-audit |
| Scope creep monitored | Weekly | Compare to original plan |
| Participant welfare check | Every session | Post-session reflection |

**Gate:** If any during-research accountability item is compromised, research pauses for correction.
**Escalation:** Ethical concerns escalate immediately. No waiting.

### Tier 3: Post-Research Accountability

After research is complete and delivered:

| Requirement | Timeline | Owner |
|-------------|----------|-------|
| Full score using ResearchScore.md | Within 3 days of delivery | Peer reviewer |
| Review using ReviewChecklist.md | Within 5 days of delivery | Peer reviewer |
| Stakeholder feedback collected | Within 1 week of delivery | Research Lead |
| Recommendations tracked for implementation | Ongoing | Research Lead + PM |
| Impact assessment scheduled | 30/60/90 days post-delivery | Research Lead |
| Lessons learned documented | Within 1 week of delivery | Research Lead |
| Raw data archived properly | Within 1 week of delivery | Research Lead |
| Participant data handled per retention policy | Per policy timeline | Research Lead |

**Gate:** Research is not considered "complete" until all Tier 3 items are addressed.

---

## EVIDENCE TRAIL REQUIREMENTS

Every research output must maintain a complete evidence trail:

### Level 1: Insight to Evidence
Every insight must link to:
- Specific data points (quotes, numbers, observations)
- Number of participants/data points supporting the insight
- Number of participants/data points contradicting the insight
- Confidence level (high / medium / low) with justification

### Level 2: Evidence to Method
Every data point must link to:
- Collection method used
- Date and context of collection
- Participant identifier (anonymized)
- Any relevant contextual factors

### Level 3: Method to Plan
Every method must link to:
- Original research plan
- Justification for method selection
- Any deviations from plan and reasons

### Audit Standard
A reviewer should be able to:
1. Read any finding in the report
2. Trace it back to specific evidence
3. Trace that evidence back to the collection method
4. Verify the method was appropriate and executed correctly

If the trail breaks at any point, the finding is unsubstantiated.

---

## UNCERTAINTY COMMUNICATION PROTOCOL

Research must communicate uncertainty honestly. Overstating confidence is a failure.

### Confidence Level Framework

| Level | Label | Criteria | Language |
|-------|-------|----------|----------|
| 5 | Validated | Triangulated across 3+ methods, large N, replicated | "The data clearly shows..." |
| 4 | Strong | Triangulated across 2 methods, adequate N, consistent | "Evidence strongly suggests..." |
| 3 | Moderate | Single method, adequate N, consistent patterns | "Research indicates..." |
| 2 | Directional | Limited data, emerging patterns, needs validation | "Early signals suggest..." |
| 1 | Hypothesis | Minimal data, single observation, speculative | "We hypothesize that..." |

### Rules
- Every finding must have a confidence level assigned
- Confidence level must be visible in the executive summary
- Recommendations must be weighted by confidence level
- Stakeholders must understand the confidence framework
- Presenting Level 2 findings as Level 4 is a scoring failure

### Uncertainty Language Guide

**Acceptable:**
- "Based on 12 interviews with power users, we found..."
- "With moderate confidence (single method, N=8), the data suggests..."
- "This finding needs quantitative validation before acting..."

**Unacceptable:**
- "Users want X" (without qualification)
- "The research proves..." (research rarely proves)
- "Everyone we talked to said..." (implies universality)
- "Clearly, the answer is..." (without evidence strength qualifier)

---

## FOLLOW-THROUGH TRACKING

Research that is not acted upon is waste. The Research Brain must track what happens after delivery.

### Recommendation Tracking Table

| Recommendation | Priority | Owner | Status | Implemented | Impact Measured |
|---------------|----------|-------|--------|-------------|-----------------|
| | | | | | |
| | | | | | |

### Status Options
- **Accepted** -- Team plans to implement
- **Deferred** -- Acknowledged but deprioritized (with reason)
- **Rejected** -- Team chose not to act (with reason documented)
- **Implemented** -- Action taken
- **Validated** -- Post-implementation impact measured
- **Invalidated** -- Implementation showed research was wrong (document why)

### Follow-Through Cadence
- 2 weeks post-delivery: Check recommendation status with PM
- 30 days post-delivery: Track implementation progress
- 60 days post-delivery: Measure early impact signals
- 90 days post-delivery: Full impact assessment

### Abandoned Research Protocol
If research recommendations are not acted upon within 90 days:
1. Document the reason (deprioritized, disagreed, overtaken by events)
2. Assess whether the findings are still valid
3. Archive with clear status
4. Include in quarterly research impact review

---

## FAILURE DOCUMENTATION

Failed research is valuable if the failure is documented and learned from.

### What Counts as a Research Failure
- Research delivered after the decision window closed
- Findings contradicted by subsequent data
- Methodology was flawed (discovered post-delivery)
- Recommendations were implemented and did not produce expected results
- Stakeholders could not act on findings (communication failure)
- Ethical violation occurred
- Research question was wrong (answered the wrong question)

### Failure Log Template

```markdown
## Research Failure Log

**Study:** ________________________________
**Date:** ________________________________
**Failure Type:** [ ] Timeliness [ ] Methodology [ ] Validity [ ] Communication [ ] Ethics [ ] Scope
**Severity:** [ ] Minor (learnable) [ ] Major (impactful) [ ] Critical (harmful)

### What Happened
[Factual description of the failure]

### Root Cause
[Why did this failure occur? Use 5-whys or similar]

### Impact
[What was the impact on the team, product, or users?]

### What We Learned
[Specific, actionable lessons]

### Prevention Measures
[What changes to process, tools, or training would prevent recurrence?]

### Status of Prevention Measures
[ ] Proposed  [ ] Approved  [ ] Implemented  [ ] Verified
```

### Failure Review Cadence
- Individual failures: Documented within 1 week of discovery
- Quarterly failure review: All failures analyzed for patterns
- Annual failure retrospective: Systemic issues identified and addressed

---

## QUALITY METRICS DASHBOARD

The Research Brain tracks these metrics to monitor its own performance over time.

### Output Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average ResearchScore | >= 4.0 | Per study, trended quarterly |
| Studies delivered on time | >= 90% | Delivery date vs decision deadline |
| Hard fail rate | < 5% | Studies scoring <3 on any hard-fail dimension |
| Recommendation implementation rate | >= 60% | Recommendations acted upon within 90 days |

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Evidence trail completeness | 100% | Audit sample quarterly |
| Ethical compliance rate | 100% | Zero violations |
| Limitation disclosure rate | 100% | Every study has limitations section |
| Confidence level accuracy | >= 80% | Post-hoc validation of confidence assignments |

### Impact Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Research-informed decisions | Trending up | Quarterly stakeholder survey |
| Research impact score | >= 4/5 | Stakeholder rating of research usefulness |
| Recommendation validation rate | >= 70% | Implemented recommendations that achieved expected results |
| Research waste rate | < 10% | Studies with zero recommendations acted upon |

### Stakeholder Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Stakeholder satisfaction | >= 4/5 | Post-study feedback |
| Time-to-insight | Trending down | Request to delivery time |
| Research accessibility | >= 90% | Can stakeholders find and understand past research |
| Repeat request rate | Trending up | Stakeholders voluntarily requesting research |

---

## ESCALATION PROTOCOL

### When to Escalate

| Situation | Escalate To | Timeline |
|-----------|-------------|----------|
| Ethical violation discovered | Research Lead + Legal | Immediately |
| Methodology flaw discovered post-delivery | Research Lead + Stakeholders | Within 24 hours |
| Research being misrepresented by stakeholders | Research Lead + Stakeholder's manager | Within 48 hours |
| Findings contradict a shipped decision | Research Lead + PM + Product Lead | Within 1 week |
| Research is being ignored systematically | Research Lead + VP Product | Quarterly review |
| Participant harm reported | Research Lead + Legal + HR | Immediately |

### Escalation Process
1. Document the issue with evidence
2. Notify the appropriate party per the table above
3. Propose resolution options
4. Track resolution to completion
5. Log in failure documentation if applicable

---

## PEER REVIEW REQUIREMENTS

### When Peer Review is Required
- All studies with N > 20 participants
- All studies informing strategic decisions (pricing, positioning, market entry)
- All studies involving vulnerable populations
- Any study where the researcher has a potential conflict of interest
- All mixed-method studies (integration requires review)

### When Peer Review is Recommended
- All studies (even when not strictly required)
- Rapid research (abbreviated review focusing on ethics and validity)
- Competitive analysis (bias check)

### Peer Review Process
1. Reviewer receives study materials (plan, raw data access, report draft)
2. Reviewer completes ReviewChecklist.md
3. Reviewer scores using ResearchScore.md
4. Reviewer provides written feedback
5. Research Lead addresses feedback or documents disagreement
6. Final version reflects peer review input

### Peer Review Standards
- Reviewer must not have been involved in the study
- Reviewer must have domain expertise in the method used
- Review must be completed within 5 business days
- Disagreements between researcher and reviewer are documented, not suppressed

---

## ANNUAL RESEARCH AUDIT

Once per year, the Research Brain conducts a comprehensive audit:

1. **Sample 10% of studies** for full evidence trail verification
2. **Review all failure logs** for systemic patterns
3. **Survey stakeholders** on research quality and impact
4. **Assess process compliance** against this Accountability Protocol
5. **Update benchmarks** based on new challenges encountered
6. **Recalibrate scoring** if score inflation or deflation detected
7. **Review ethical standards** against current best practices
8. **Publish audit findings** to the team with improvement plan

### Audit Output
- Research Quality Report (annual)
- Process Improvement Plan (specific actions with owners)
- Benchmark Updates (new scenarios reflecting current challenges)
- Training Needs Assessment (gaps in team capability)

---

## ACCOUNTABILITY IS NOT PUNISHMENT

This protocol exists to make research better, not to penalize researchers.

- Low scores are learning opportunities, not failures of character
- Failures documented honestly are more valuable than successes hidden
- Accountability builds trust with stakeholders
- Rigorous self-assessment is a sign of professional maturity

The Research Brain that holds itself accountable earns the right to influence decisions.
The Research Brain that does not is just another opinion.

---

## END OF ACCOUNTABILITY PROTOCOL

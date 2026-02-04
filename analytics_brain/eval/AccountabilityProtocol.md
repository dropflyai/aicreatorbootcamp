# Analytics Brain Accountability Protocol -- Authoritative

This document defines accountability standards for analytics deliverables.
Every metric has an owner. Every report has a reviewer.
Every conflicting number is a credibility crisis. No exceptions.

Analytics credibility is earned slowly and lost instantly.
One wrong number in an executive meeting erases months of trust.

---

## CORE PRINCIPLES

1. **Every metric has a named owner** -- not a team, a person
2. **Every number has a source** -- traceable to a query and a dataset
3. **Every insight has a caveat** -- uncertainty is stated, not hidden
4. **Every report is reviewed** -- no deliverable ships without a second pair of eyes
5. **Conflicting numbers are emergencies** -- treated with SEV-1 urgency
6. **Data quality is proactive** -- issues found by the data team, not stakeholders

---

## OWNERSHIP MODEL

### Metric Owner Responsibilities

The metric owner is accountable for:

| Responsibility | Frequency | Evidence Required |
|---------------|-----------|-------------------|
| Metric definition is documented and current | Per change | Definition document |
| Canonical query produces correct results | Per change | Query review |
| Number is consistent across all reports | Monthly audit | Consistency check |
| Data source is healthy and fresh | Continuous monitoring | Freshness dashboard |
| Stakeholders understand the metric | Quarterly review | Stakeholder feedback |
| Target is set and tracked | Quarterly | Target document |
| Counter-metrics monitored | Ongoing | Counter-metric dashboard |
| Definition changes communicated | Per change | Communication record |

### Dashboard Owner Responsibilities

The dashboard owner is accountable for:

| Responsibility | Frequency | Evidence Required |
|---------------|-----------|-------------------|
| Dashboard loads within SLA (<3s) | Continuous monitoring | Performance logs |
| Data freshness within SLA | Continuous monitoring | Freshness indicator |
| All metrics have documented definitions | Per change | Data dictionary link |
| User satisfaction measured | Quarterly | Survey results |
| Self-serve adoption tracked | Monthly | Usage analytics |
| Dashboard maintained and current | Per change | Change log |
| Access control appropriate | Quarterly review | Access audit |

### Ownership Transfer Protocol

When metric or dashboard ownership transfers:
1. Full walkthrough with new owner (definitions, queries, caveats, known issues)
2. Query access and permissions transferred
3. Monitoring and alert routing updated
4. New owner verifies they can reproduce all numbers
5. Stakeholders notified of new owner
6. 2-week shadow period where both owners monitor
7. Transfer logged in analytics registry

### Ownership Gaps

- Metric with no owner = **Flagged in weekly review, assigned within 1 week**
- Dashboard with no owner = **Maintenance paused, stakeholders notified**
- Owner leaves without transfer = **Escalate to analytics lead within 48 hours**

---

## CREDIBILITY ACCOUNTABILITY

### The Cardinal Rule

**Two dashboards showing different numbers for the same metric is a SEV-1 incident.**

This is not an inconvenience. It is a credibility crisis. When leadership sees
conflicting numbers, they stop trusting all numbers.

### Credibility Incident Response

When conflicting numbers are discovered:

1. **Hour 0:** Flag as SEV-1, notify analytics lead and both metric owners
2. **Hour 0-2:** Determine which number is wrong (or if both are wrong)
3. **Hour 2-4:** Trace root cause (definition difference, data source difference, query bug)
4. **Hour 4-8:** Produce corrected number with explanation
5. **Hour 8-24:** Fix the root cause in all affected reports
6. **Day 2-3:** Post-incident review
7. **Day 7:** Verify fix holds, update consistency monitoring

### Credibility Incident Record

```
Incident ID: ________________________________
Metric: ________________________________
Report A (value): ________________________________
Report B (value): ________________________________
Discrepancy: ________________________________

Root Cause: [ ] Definition difference  [ ] Data source difference
            [ ] Query bug  [ ] Timing difference  [ ] Filter difference
            [ ] Other: ________________________________

Explanation: ________________________________
Correct Value: ________________________________

Reports Affected: ________________________________
Stakeholders Who Saw Wrong Number: ________________________________
Correction Communication Sent: [ ] Yes  [ ] No

Fix Applied: ________________________________
Prevention: ________________________________

Owner: ________________________________
Reviewer: ________________________________
```

### Credibility Prevention

| Control | Implementation | Frequency |
|---------|---------------|-----------|
| Cross-report consistency check | Automated comparison of shared metrics | Daily |
| Metric definition audit | Review all definitions for staleness | Monthly |
| Query review | Peer review of canonical queries | Per change |
| Data source audit | Verify all reports use canonical sources | Monthly |
| Stakeholder calibration | Check if stakeholders interpret metrics correctly | Quarterly |

---

## PUBLICATION ACCOUNTABILITY

### Pre-Publication Requirements

Before any analytics deliverable reaches stakeholders:

| Requirement | Owner | Verification |
|-------------|-------|--------------|
| Metric definitions documented | Analyst | Definition links present |
| Data quality verified | Analyst | Quality check log |
| Statistical rigor reviewed | Peer Reviewer | Review sign-off |
| Numbers cross-checked against canonical sources | Analyst | Consistency check |
| Caveats and limitations stated | Analyst | Caveat section present |
| Recommendations are actionable | Analyst | Action items with owners |
| Audience-appropriate language | Reviewer | Language review |
| Visualizations are not misleading | Reviewer | Chart review |

### Publication Record

Every analytics deliverable shared with stakeholders must produce:

```
Deliverable: ________________________________
Analyst: ________________________________
Reviewer: ________________________________
Date: ________________________________
Audience: ________________________________

Metrics Included:
- ________________________________ (definition: ___, source: ___)
- ________________________________ (definition: ___, source: ___)

Data Freshness: ________________________________
Known Caveats: ________________________________
Consistency Verified: [ ] Yes  [ ] No
Review Completed: [ ] Yes  [ ] No
```

### Publication Without Review

Sharing analytics with stakeholders without peer review is a **High Severity Violation**.

Consequences:
1. Analyst must flag the deliverable as unreviewed
2. Rush peer review within 24 hours
3. Corrections issued if errors found
4. Root cause: why was review skipped
5. Discussion with analytics lead

---

## DATA QUALITY ACCOUNTABILITY

### Proactive Monitoring Requirements

| Check | Owner | Frequency | Alert Threshold |
|-------|-------|-----------|-----------------|
| Pipeline completion | Data Engineer | Per run | Any failure |
| Record count anomaly | Data Engineer | Daily | >10% deviation |
| Null rate per critical field | Data Engineer | Daily | >1% increase |
| Schema drift detection | Data Engineer | Per deployment | Any change |
| Data freshness | Data Engineer | Continuous | >SLA |
| Duplicate detection | Data Engineer | Daily | >0.1% |
| Cross-source consistency | Analyst | Daily | Any discrepancy |
| Metric value range | Analyst | Daily | Outside historical bounds |

### Data Quality Incident Types

| Incident Type | Severity | Required Response |
|--------------|----------|-------------------|
| Stakeholder discovers bad data | SEV-1 | Immediate fix, root cause, prevention |
| Pipeline drops records silently | SEV-1 | Fix pipeline, audit affected data, add monitoring |
| Numbers change retroactively without explanation | SEV-2 | Explain change, notify affected stakeholders |
| ETL delayed beyond SLA | SEV-2 | Notify stakeholders, fix pipeline |
| Schema change breaks report | SEV-2 | Fix report, add schema monitoring |
| Minor data quality issue (low impact) | SEV-3 | Fix in next sprint, update monitoring |

### The "Found By" Metric

Track who discovers data quality issues:

| Found By | Target | Current |
|----------|--------|---------|
| Automated monitoring | >80% | ___ |
| Data team (manual check) | >15% | ___ |
| Stakeholder/user | <5% | ___ |

If stakeholders are finding more than 5% of data quality issues, the monitoring
system is inadequate.

---

## INSIGHT ACCOUNTABILITY

### Insight Quality Standards

Every insight shared with stakeholders must meet:

| Standard | Requirement |
|----------|-------------|
| Specificity | "Revenue dropped 12% because X" not "Revenue had an interesting trend" |
| Actionability | Recommendation with owner and timeline |
| Evidence | Data supporting the conclusion cited |
| Caveats | Uncertainty and limitations stated |
| Follow-up | Measurement plan for recommended action |

### Insight Tracking

After sharing insights, track outcomes:

```
Insight: ________________________________
Date Shared: ________________________________
Recommendation: ________________________________
Action Taken: [ ] Yes  [ ] No  [ ] Partial
Outcome: ________________________________
Was Insight Correct: [ ] Yes  [ ] No  [ ] Unclear
Lessons Learned: ________________________________
```

### Insight Accuracy Review

Quarterly, review past insights:

- How many recommendations were acted on?
- How many predictions were accurate?
- What types of insights have the highest action rate?
- What types of insights had the lowest accuracy?
- How can we improve insight quality?

---

## SELF-SERVE ACCOUNTABILITY

### Self-Serve Metrics

| Metric | Target | Owner | Measurement |
|--------|--------|-------|-------------|
| % questions answered without analyst | >70% | Dashboard Owner | Monthly survey |
| User satisfaction with self-serve tools | >4.0/5.0 | Analytics Lead | Quarterly survey |
| Data dictionary completeness | >95% | Analytics Lead | Monthly audit |
| Training completion rate | >80% of stakeholders | Analytics Lead | Training records |
| Time to answer for self-serve questions | <5 minutes | Dashboard Owner | Usage analytics |

### Self-Serve Improvement Cadence

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| User feedback collection | Monthly | Dashboard Owner | Feedback summary |
| Most-requested missing features | Monthly | Analytics Lead | Feature backlog |
| Training session | Quarterly | Analytics Lead | Training materials |
| Data dictionary update | Monthly | Analytics Lead | Updated dictionary |
| Self-serve adoption review | Monthly | Analytics Lead | Adoption report |

---

## STATISTICAL ACCOUNTABILITY

### Analysis Review Requirements

Before sharing any analysis with statistical claims:

| Requirement | Reviewer Check |
|-------------|---------------|
| Significance testing applied correctly | [ ] |
| Confidence intervals stated | [ ] |
| Sample size adequate | [ ] |
| Biases identified and addressed | [ ] |
| Correlation not presented as causation | [ ] |
| Caveats proportional to uncertainty | [ ] |
| Methodology appropriate for the question | [ ] |
| Results reproducible | [ ] |

### Statistical Malpractice

The following are violations:

| Violation | Severity | Response |
|-----------|----------|----------|
| Cherry-picking time ranges to support narrative | Critical | Retract analysis, review process |
| Presenting correlation as causation to executives | Critical | Correction to all recipients |
| Hiding uncertainty or caveats | High | Add caveats, re-distribute |
| Using inappropriate statistical test | High | Redo analysis with correct method |
| Not disclosing data quality issues | High | Disclose and re-assess conclusions |
| P-hacking (testing until significant) | Critical | Retract, redesign experiment |

---

## DOCUMENTATION ACCOUNTABILITY

### Required Documentation

| Document | Update Trigger | Staleness Threshold |
|----------|---------------|---------------------|
| Metric definitions | Any definition change | 30 days |
| Data dictionary | Any metric added/changed | 30 days |
| Dashboard documentation | Any dashboard change | 60 days |
| Query library | Any query change | Immediate |
| Data lineage | Any pipeline change | 60 days |
| Analysis methodology | Per analysis | Per analysis |
| Training materials | Per tool change | 90 days |

### Documentation Debt

Documentation more than 2x staleness threshold:
- Flagged in weekly review
- Owner must update within 2 weeks
- No new deliverables using stale documentation until updated

---

## ESCALATION MATRIX

| Situation | First Contact | Escalation | Final Authority |
|-----------|--------------|------------|-----------------|
| Conflicting numbers | Both Metric Owners | Analytics Lead | VP/Head of Data |
| Stakeholder finds bad data | Data Engineer | Analytics Lead | VP/Head of Data |
| Statistical claim challenged | Analyst | Peer Reviewer | Analytics Lead |
| Dashboard down/slow | Dashboard Owner | Data Engineer | Analytics Lead |
| Metric definition dispute | Both Metric Owners | Analytics Lead | Business Stakeholder |
| Self-serve adoption low | Dashboard Owner | Analytics Lead | VP/Head of Data |

---

## ACCOUNTABILITY REVIEW CADENCE

| Review | Frequency | Attendees | Output |
|--------|-----------|-----------|--------|
| Cross-report consistency check | Weekly (automated) | Analytics Lead | Consistency report |
| Metric definition review | Monthly | Metric Owners | Definition updates |
| Dashboard health check | Monthly | Dashboard Owners | Health report |
| Self-serve adoption review | Monthly | Analytics Lead | Adoption metrics |
| Data quality review | Bi-weekly | Data Engineers + Analysts | Quality dashboard |
| Insight accuracy review | Quarterly | Analytics Team | Accuracy report |
| Stakeholder satisfaction survey | Quarterly | Analytics Lead | NPS/satisfaction score |
| Full analytics audit | Semi-annually | All stakeholders | Audit report |

---

## TRUST REBUILDING PROTOCOL

When analytics credibility has been damaged:

1. **Acknowledge the problem** -- Do not minimize or deflect
2. **Quantify the impact** -- Which numbers were wrong, for how long, who was affected
3. **Fix the root cause** -- Not a bandaid, a permanent fix
4. **Increase transparency** -- Share monitoring dashboards with stakeholders
5. **Over-communicate** -- State caveats and uncertainty more explicitly
6. **Follow up** -- Show that the fix is working over time
7. **Earn back trust gradually** -- Trust returns slower than it leaves

---

## ENFORCEMENT

- Accountability is mandatory, not optional
- Credibility is the analytics team's most valuable asset
- Every requirement in this document must be met or explicitly exempted
- Exemptions expire and must be renewed (maximum 30 days)
- Repeated credibility incidents trigger process review
- This protocol is reviewed and updated quarterly

A number without a source is a guess.
A guess presented as analysis is malpractice.
Malpractice destroys credibility.
Credibility is everything.

---

## END OF ACCOUNTABILITY PROTOCOL

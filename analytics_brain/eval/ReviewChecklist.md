# Analytics Review Checklist -- Authoritative

Use this checklist to evaluate any analytics deliverable before sharing with stakeholders.
Every section must be completed. Incomplete reviews are invalid.
Skipping a section requires written justification approved by the analytics lead.

---

## Review Header

```
Deliverable: ________________________________
Reviewer: ________________________________
Date: ________________________________
Type: [ ] Dashboard  [ ] Ad-Hoc Analysis  [ ] Recurring Report  [ ] Metric Definition  [ ] Data Model
Audience: [ ] Executive  [ ] Team Lead  [ ] Analyst  [ ] External/Board
Stage: [ ] Draft  [ ] Internal Review  [ ] Stakeholder Ready  [ ] Post-Incident
```

---

## 1. Metric Definition & Design

### Metric Definitions Present?
[ ] Yes  [ ] No (STOP -- cannot proceed without documented definitions)

### For Each Metric in the Deliverable

```
Metric name: ________________________________
Definition (what counts, what doesn't): ________________________________
Data source: ________________________________
Calculation logic: ________________________________
Owner: ________________________________
Target/acceptable range: ________________________________
Counter-metric: ________________________________
Goodhart risk: ________________________________
```

### Metric Design Checks
| Check | Pass | Fail |
|-------|------|------|
| Every metric has a written definition | [ ] | [ ] |
| Every metric is actionable (not vanity) | [ ] | [ ] |
| Every metric has an owner | [ ] | [ ] |
| Goodhart's Law risk assessed | [ ] | [ ] |
| Counter-metrics identified | [ ] | [ ] |
| Leading vs lagging classified | [ ] | [ ] |
| Historical baseline established | [ ] | [ ] |
| Metric sensitivity understood | [ ] | [ ] |

### Single Source of Truth Check
| Check | Pass | Fail |
|-------|------|------|
| Each metric has one canonical query | [ ] | [ ] |
| No conflicting definitions across reports | [ ] | [ ] |
| Canonical source documented | [ ] | [ ] |
| All references point to canonical source | [ ] | [ ] |

Notes:
```

```

---

## 2. Data Quality & Lineage

### Data Sources
| Source | Freshness SLA | Current Freshness | Quality Check |
|--------|--------------|-------------------|---------------|
| | | | [ ] Pass [ ] Fail |
| | | | [ ] Pass [ ] Fail |
| | | | [ ] Pass [ ] Fail |

### Data Quality Checks
| Check | Pass | Fail |
|-------|------|------|
| Data sources documented | [ ] | [ ] |
| Data freshness within SLA | [ ] | [ ] |
| Missing data identified and handled | [ ] | [ ] |
| Outliers identified and handled | [ ] | [ ] |
| Duplicates checked for | [ ] | [ ] |
| Data type consistency verified | [ ] | [ ] |
| Null handling documented | [ ] | [ ] |
| Timezone handling correct | [ ] | [ ] |

### Data Lineage
| Check | Pass | Fail |
|-------|------|------|
| Transformation logic documented | [ ] | [ ] |
| Intermediate steps auditable | [ ] | [ ] |
| No manual data manipulation (or audit trail if so) | [ ] | [ ] |
| Data joins verified (no fan-out, no dropped records) | [ ] | [ ] |
| Filters documented (what is excluded and why) | [ ] | [ ] |

Notes:
```

```

---

## 3. Statistical Rigor

### Analysis Methods
```
Methods used: ________________________________
Significance level: ________________________________
Confidence intervals: ________________________________
Sample size: ________________________________
```

### Statistical Checks
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Significance testing applied | [ ] | [ ] | [ ] |
| Confidence intervals shown | [ ] | [ ] | [ ] |
| Sample size adequate | [ ] | [ ] | [ ] |
| Selection bias addressed | [ ] | [ ] | [ ] |
| Survivorship bias considered | [ ] | [ ] | [ ] |
| Simpson's paradox checked | [ ] | [ ] | [ ] |
| Seasonality accounted for | [ ] | [ ] | [ ] |
| Correlation vs causation distinguished | [ ] | [ ] | [ ] |

### Caveats & Limitations
| Check | Pass | Fail |
|-------|------|------|
| Known limitations stated | [ ] | [ ] |
| Data quality issues disclosed | [ ] | [ ] |
| Assumptions documented | [ ] | [ ] |
| Alternative interpretations acknowledged | [ ] | [ ] |
| Uncertainty communicated appropriately | [ ] | [ ] |

Notes:
```

```

---

## 4. Dashboard / Visualization Quality (if applicable)

### Information Architecture
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Clear visual hierarchy | [ ] | [ ] | [ ] |
| Most important metrics most prominent | [ ] | [ ] | [ ] |
| Drill-down from summary to detail | [ ] | [ ] | [ ] |
| Logical grouping of related metrics | [ ] | [ ] | [ ] |
| Progressive disclosure (not everything at once) | [ ] | [ ] | [ ] |

### Performance
| Check | Pass | Fail |
|-------|------|------|
| Initial load <3 seconds | [ ] | [ ] |
| Filter changes <2 seconds | [ ] | [ ] |
| Drill-down navigation <2 seconds | [ ] | [ ] |
| Works on standard hardware | [ ] | [ ] |

### Visualization Best Practices
| Check | Pass | Fail |
|-------|------|------|
| Chart type appropriate for data | [ ] | [ ] |
| Axes labeled and scaled correctly | [ ] | [ ] |
| Color used for meaning (not decoration) | [ ] | [ ] |
| Legends clear and complete | [ ] | [ ] |
| Annotations on key events/anomalies | [ ] | [ ] |
| Comparison context provided (vs period, target, benchmark) | [ ] | [ ] |
| No truncated axes that exaggerate changes | [ ] | [ ] |
| Consistent date formatting | [ ] | [ ] |

### User Experience
| Check | Pass | Fail |
|-------|------|------|
| Filters intuitive | [ ] | [ ] |
| Date range selection clear | [ ] | [ ] |
| Default view shows the right thing | [ ] | [ ] |
| Export capability available | [ ] | [ ] |
| Data refresh time visible | [ ] | [ ] |

Notes:
```

```

---

## 5. Insight & Recommendation Quality

### Insight Evaluation
| Check | Pass | Fail |
|-------|------|------|
| Findings are specific (not vague) | [ ] | [ ] |
| "So what?" test passes (finding connects to decision) | [ ] | [ ] |
| Root cause explored (not just symptoms) | [ ] | [ ] |
| Multiple hypotheses considered | [ ] | [ ] |
| Data supports the conclusion | [ ] | [ ] |

### Recommendation Evaluation
| Check | Pass | Fail |
|-------|------|------|
| Recommendations are specific and actionable | [ ] | [ ] |
| Owner identified for each recommendation | [ ] | [ ] |
| Timeline suggested | [ ] | [ ] |
| Expected impact quantified | [ ] | [ ] |
| Prioritization provided | [ ] | [ ] |
| Follow-up measurement plan included | [ ] | [ ] |
| Alternative actions presented | [ ] | [ ] |
| Resource requirements estimated | [ ] | [ ] |

Notes:
```

```

---

## 6. Data Storytelling & Presentation

### Narrative Structure
| Check | Pass | Fail |
|-------|------|------|
| Executive summary present (key finding upfront) | [ ] | [ ] |
| Narrative arc (situation, complication, resolution) | [ ] | [ ] |
| Call to action clear | [ ] | [ ] |
| Length appropriate for audience | [ ] | [ ] |
| Methodology available but not blocking narrative | [ ] | [ ] |

### Audience Appropriateness
| Check | Pass | Fail |
|-------|------|------|
| Language appropriate for audience | [ ] | [ ] |
| No unexplained jargon | [ ] | [ ] |
| Detail level matches audience needs | [ ] | [ ] |
| Visual style matches context (formal for board, informal for team) | [ ] | [ ] |

### Uncertainty Communication
| Check | Pass | Fail |
|-------|------|------|
| Uncertainty stated honestly | [ ] | [ ] |
| Not hidden or downplayed | [ ] | [ ] |
| Not over-emphasized (paralyzing) | [ ] | [ ] |
| Confidence level appropriate for stakes | [ ] | [ ] |

Notes:
```

```

---

## 7. Reproducibility & Documentation

### Query Reproducibility
| Check | Pass | Fail |
|-------|------|------|
| Queries version controlled | [ ] | [ ] |
| Data sources specified | [ ] | [ ] |
| Date range specified | [ ] | [ ] |
| Filters specified | [ ] | [ ] |
| Another analyst can reproduce the results | [ ] | [ ] |
| No manual steps (or documented with audit trail) | [ ] | [ ] |

### Documentation
| Check | Pass | Fail |
|-------|------|------|
| Metric definitions documented | [ ] | [ ] |
| Data dictionary available | [ ] | [ ] |
| Transformation logic documented | [ ] | [ ] |
| Assumptions documented | [ ] | [ ] |
| Change log maintained | [ ] | [ ] |

Notes:
```

```

---

## 8. Operational Readiness (for dashboards/recurring reports)

### Monitoring
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Data pipeline monitored | [ ] | [ ] | [ ] |
| Dashboard uptime monitored | [ ] | [ ] | [ ] |
| Data freshness alerts configured | [ ] | [ ] | [ ] |
| Query performance monitored | [ ] | [ ] | [ ] |
| Cross-report consistency checked | [ ] | [ ] | [ ] |

### Maintenance
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Owner assigned for ongoing maintenance | [ ] | [ ] | [ ] |
| Update schedule defined | [ ] | [ ] | [ ] |
| Deprecation plan if data sources change | [ ] | [ ] | [ ] |
| User feedback mechanism present | [ ] | [ ] | [ ] |
| Access control appropriate | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 9. Self-Serve Readiness (for dashboards)

### Self-Serve Checks
| Check | Pass | Fail | N/A |
|-------|------|------|-----|
| Target users can navigate without training | [ ] | [ ] | [ ] |
| Common questions answerable from dashboard | [ ] | [ ] | [ ] |
| Tooltip/help text on complex metrics | [ ] | [ ] | [ ] |
| Training documentation available | [ ] | [ ] | [ ] |
| Escalation path clear (when to ask an analyst) | [ ] | [ ] | [ ] |

Notes:
```

```

---

## 10. Analytics Score

Run full scoring from `eval/AnalyticsScore.md`:

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Metric Design Quality | | |
| Dashboard Usability | | |
| Statistical Validity | | |
| Insight Actionability | | |
| Data Storytelling | | |
| Timeliness | | |
| Self-Serve Adoption | | |
| Reproducibility | | |

**Average:** ___
**Hard Fail Check:** [ ] Pass [ ] Fail
**Minimum passing: Average >= 4.0, no hard fail < 3**

---

## 11. Consistency Cross-Check

### Do any numbers in this deliverable appear in other reports?
[ ] Yes  [ ] No

### If Yes:
| Metric | This Report | Other Report | Match? |
|--------|------------|-------------|--------|
| | | | [ ] Yes [ ] No |
| | | | [ ] Yes [ ] No |
| | | | [ ] Yes [ ] No |

**Any mismatch = STOP. Reconcile before sharing.**

Notes:
```

```

---

## 12. Final Verdict

### Decision
[ ] **Approved for Stakeholders** -- All checks pass, score >= 4.0
[ ] **Approved for Internal** -- Minor issues, score >= 3.5
[ ] **Needs Remediation** -- Significant issues, score < 3.5
[ ] **Blocked** -- Credibility issues, conflicting numbers, or statistical violations

### Blocking Issues (if any)
```

```

### Required Remediation (with owner and deadline)
```

```

### Strengths
```

```

### Risks and Caveats to Communicate
```

```

---

## Signatures

```
Analyst: _________________ Date: _________
Reviewer: _________________ Date: _________
```

---

## END OF REVIEW CHECKLIST

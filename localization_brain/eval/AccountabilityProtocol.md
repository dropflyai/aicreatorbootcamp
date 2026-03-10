# Localization Brain -- Accountability Protocol

This document defines how the Localization Brain is held accountable for the quality,
efficiency, and cultural sensitivity of its localization recommendations. Every
recommendation carries responsibility. Every shipped locale has an owner.

---

## PURPOSE

Localization decisions affect user trust, brand perception, market success, and in
safety-critical domains, user well-being. This protocol ensures that:

1. Every localization recommendation is traceable to a rationale
2. Every shipped locale is measurable against quality standards
3. Failures are analyzed with urgency proportional to user impact
4. Cultural sensitivity is never compromised for speed or cost
5. The brain improves systematically through structured feedback

---

## SECTION 1: DECISION DOCUMENTATION REQUIREMENTS

### 1.1 Localization Decision Record (LDR)

Every significant localization decision MUST be documented:

```markdown
## Localization Decision Record: [Title]

**Date:** [Date]
**Product:** [Product Name]
**Locale(s) Affected:** [Locale codes]
**Decision Maker:** Localization Brain
**Status:** Proposed / Approved / Implemented / Reviewed

### Context
[What situation or problem prompted this decision?]

### Decision
[What was decided and why?]

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| | | | |

### Impact Assessment
- Locales affected: [list]
- User population affected: [estimate]
- Timeline impact: [days gained or lost]
- Cost impact: [estimate]
- Quality impact: [expected change]

### Risks
[What could go wrong? What is the mitigation plan?]

### Review Date
[When will this decision be reviewed against actual outcomes?]
```

### 1.2 When an LDR is Required

A Localization Decision Record is MANDATORY for:
- Choosing a localization strategy for a new market
- Selecting or changing translation vendors
- Adopting or changing MT (machine translation) strategy
- Modifying quality standards or acceptance criteria
- Implementing new localization tooling or pipeline changes
- Cultural adaptation decisions that deviate from source content
- Any decision affecting more than 3 locales simultaneously
- Any decision with cost impact exceeding $5,000

### 1.3 LDR Storage

All LDRs must be stored in the project documentation and logged to Supabase:
- Table: `shared_experiences`
- Category: `localization_decision`
- Tags: include product name, locales affected, decision type

---

## SECTION 2: QUALITY ACCOUNTABILITY

### 2.1 Quality Tracking Per Locale

Every shipping locale must have ongoing quality tracking:

```markdown
## Quality Tracker: [Product] - [Locale]

| Release | MQM Score | Coverage | Cultural Review | Technical Pass | Overall |
|---------|-----------|----------|-----------------|----------------|---------|
| v1.0 | | | | | |
| v1.1 | | | | | |
| v1.2 | | | | | |

**Quality Trend:** Improving / Stable / Declining
**Action Items:** [if declining]
```

### 2.2 Quality Regression Detection

Quality regression is defined as:
- MQM error rate increasing by >0.5% between releases
- Coverage dropping below 99%
- New cultural appropriateness issues in previously reviewed content
- Technical issues recurring after being fixed

When quality regression is detected:
1. Halt the release for the affected locale
2. Investigate root cause within 24 hours
3. Remediate before the next release
4. Document the regression in a Failure Analysis (Section 4)

### 2.3 Vendor Accountability

Translation vendors are tracked against SLAs:

```markdown
## Vendor Performance: [Vendor Name]

| Metric | SLA | Q1 Actual | Q2 Actual | Q3 Actual | Q4 Actual |
|--------|-----|-----------|-----------|-----------|-----------|
| On-Time Delivery | >95% | | | | |
| MQM Error Rate | <2% | | | | |
| TM Leverage | >60% | | | | |
| Responsiveness | <4hr | | | | |
| Terminology Compliance | >98% | | | | |

**Overall Rating:** Exceeds / Meets / Below Expectations
**Action Required:** [if below]
```

### 2.4 Vendor Performance Reviews

Vendor performance reviews occur:
- Quarterly for all active vendors
- Immediately after a quality incident
- Before any vendor contract renewal

Reviews include:
- Quantitative SLA performance
- Qualitative feedback from reviewers and in-country teams
- Cost efficiency analysis
- Comparison to other vendors (if applicable)

---

## SECTION 3: CULTURAL SENSITIVITY ACCOUNTABILITY

### 3.1 Cultural Review Requirements

Cultural review is MANDATORY for:
- New market launches
- Marketing and brand content
- Content involving people, gestures, food, religion, politics
- Content that uses humor, idioms, or cultural references
- Content for markets with known cultural sensitivities

### 3.2 Cultural Incident Classification

| Severity | Description | Response Time | Examples |
|----------|-------------|---------------|---------|
| Critical | Offensive, discriminatory, or legally problematic | Immediate (hours) | Religious insult, political statement, discriminatory imagery |
| High | Culturally insensitive, could cause brand damage | 24 hours | Inappropriate gesture, taboo food/animal, offensive color use |
| Medium | Culturally awkward, not damaging | Next release | Unidiomatic expression, irrelevant cultural reference |
| Low | Cultural preference, not an error | Batch fix | Formality level preference, regional dialect choice |

### 3.3 Cultural Incident Response

When a cultural incident is reported:
1. Classify severity immediately
2. For Critical/High: Remove or replace content within the response time
3. Notify affected teams (marketing, legal, executive for Critical)
4. Conduct root cause analysis
5. Update cultural review guidelines to prevent recurrence
6. Communicate with affected users if appropriate
7. Document in Failure Analysis (Section 4)

### 3.4 Cultural Knowledge Maintenance

The brain must maintain and update cultural knowledge:
- After every new market launch, document cultural learnings
- After every cultural incident, update guidelines
- Quarterly review of cultural sensitivity guidelines per market
- Track evolving cultural norms (what was acceptable may change)

---

## SECTION 4: FAILURE ANALYSIS

### 4.1 When Failure Analysis is Required

A formal failure analysis MUST be completed when:
- A translation error reaches end users (any severity)
- A cultural incident is classified as High or Critical
- A locale misses its quality targets for two consecutive releases
- A vendor misses SLAs for two consecutive periods
- An i18n bug causes functional issues in production
- A localization decision leads to measurably worse outcomes than predicted
- A safety-critical translation error occurs (regardless of whether harm resulted)

### 4.2 Failure Analysis Template

```markdown
## Failure Analysis: [Title]

**Date:** [Date]
**Product:** [Product Name]
**Locale(s) Affected:** [Locale codes]
**Severity:** Critical / Major / Minor
**User Impact:** [Number of affected users, duration of exposure]

### What Happened
[Factual description]

### Timeline
| Time | Event |
|------|-------|
| | Issue introduced |
| | Issue detected |
| | Issue reported |
| | Fix deployed |
| | Verification complete |

### Detection Gap
Time from introduction to detection: [duration]
How was it detected: [user report, automated check, internal review]
Why was it not caught earlier: [specific process gap]

### Root Cause Analysis (5 Whys)
1. Why did this happen? [Answer]
2. Why? [Answer]
3. Why? [Answer]
4. Why? [Answer]
5. Why? [Answer]

### Contributing Factors
- [Factor 1]
- [Factor 2]
- [Factor 3]

### Corrective Actions
| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| | | | |

### Prevention Measures
| Measure | Type | Implementation Date |
|---------|------|---------------------|
| | Process / Tool / Training | |

### Brain Update Required
- [ ] Update scoring criteria if this failure mode was not covered
- [ ] Update review checklist if this check was missing
- [ ] Update benchmark tests if this scenario was not tested
- [ ] Update cultural guidelines if cultural knowledge was insufficient
- [ ] Log to Supabase shared_failures table
```

### 4.3 Failure Severity for Localization

- **Critical:** Safety-critical translation error (medical, legal, financial), cultural content causing public backlash, data loss due to encoding, regulatory violation
- **Major:** Visible translation errors on primary user paths, cultural inappropriateness reaching users, functional i18n bugs, locale launch delayed due to quality
- **Minor:** Translation quality below target but not erroneous, minor cultural suboptimality, cosmetic i18n issues, process inefficiency

### 4.4 Safety-Critical Content Protocol

For products with safety-critical content (medical, legal, financial, transportation):
- Every failure analysis must include a harm assessment
- Root cause analysis must evaluate whether similar errors exist in other locales
- Prevention measures must include automated checks where possible
- Human review is MANDATORY for all safety-critical content, regardless of cost
- Failure analysis must be shared with the product safety team

---

## SECTION 5: CONTINUOUS IMPROVEMENT

### 5.1 Performance Review Cadence

| Review Type | Frequency | Scope |
|-------------|-----------|-------|
| Locale Quality Scores | Per release | Each shipping locale |
| Vendor Performance | Quarterly | All active vendors |
| Process Efficiency | Quarterly | Full pipeline |
| Cultural Guideline Review | Quarterly | All target markets |
| Benchmark Retest | Quarterly | Full benchmark suite |
| Failure Pattern Analysis | Monthly | All failure reports |
| Cost Efficiency | Quarterly | Full localization spend |

### 5.2 Improvement Tracking

```markdown
## Improvement Tracker: Localization Brain

| Quarter | Avg Quality Score | TM Leverage | Turnaround | Cost/Word | Failures |
|---------|------------------|-------------|------------|-----------|----------|
| Q1 | | | | | |
| Q2 | | | | | |
| Q3 | | | | | |
| Q4 | | | | | |

**Trend:** [Analysis]
**Focus Areas for Next Quarter:** [List]
```

### 5.3 Knowledge Gap Identification

Track areas where the brain lacks confidence or expertise:

```markdown
## Knowledge Gap Tracker

| Area | Evidence | Priority | Resolution Plan |
|------|----------|----------|-----------------|
| | | | |
```

### 5.4 Post-Launch Market Review

For each new market launch, conduct a 90-day review:
1. User feedback analysis for localization quality mentions
2. App store review analysis for language/locale complaints
3. Support ticket analysis for locale-related issues
4. Revenue and engagement metrics vs projections
5. Quality score trends over the 90 days
6. Lessons learned for the next market launch

---

## SECTION 6: ESCALATION PROTOCOL

### 6.1 When to Escalate

The Localization Brain MUST escalate to a human decision maker when:
- A safety-critical translation error is discovered in production
- A cultural incident is classified as Critical
- A vendor fails to meet SLAs and alternatives are needed
- Quality targets cannot be met within the project timeline
- Budget constraints force quality compromises
- Regulatory compliance is uncertain for a target market
- A localization decision has irreversible consequences
- Competing priorities (speed vs quality vs cost) cannot be reconciled

### 6.2 Escalation Format

```markdown
## ESCALATION: [Title]

**Urgency:** Immediate / Within 24 hours / Within 1 week
**Domain:** Quality / Cultural / Safety / Budget / Regulatory / Vendor

### Situation
[What is happening and why does it need human judgment?]

### User Impact
[How many users are affected? What is the severity?]

### Options
1. [Option A with pros, cons, cost, and timeline]
2. [Option B with pros, cons, cost, and timeline]
3. [Option C with pros, cons, cost, and timeline]

### Brain Recommendation
[Which option the brain recommends and why, or "No recommendation"]

### Decision Needed By
[Date/time, with justification for urgency]
```

### 6.3 Immediate Escalation Triggers

The following situations require IMMEDIATE escalation (do not wait for a review cycle):
- Safety-critical translation error live in production
- Cultural content causing active user complaints or media attention
- Data breach or encoding issue causing data loss
- Regulatory authority inquiry about localized content
- Vendor security incident affecting translation data

---

## SECTION 7: ACCOUNTABILITY ENFORCEMENT

### 7.1 Non-Negotiable Rules

1. Every locale MUST have a quality score before shipping
2. Every vendor MUST have documented SLAs and performance tracking
3. Every cultural incident MUST be analyzed and documented
4. Safety-critical content MUST ALWAYS have human review
5. Failures MUST be analyzed, not buried or ignored
6. Escalations MUST NOT be delayed when user safety is at risk
7. Cost savings MUST NOT compromise quality below minimum thresholds
8. The brain MUST NOT justify poor outcomes -- it must learn from them

### 7.2 Accountability Violations

The following are accountability violations:
- Shipping a locale without completing the review checklist
- Skipping cultural review for content that requires it
- Allowing a vendor to continue after repeated SLA failures without action
- Not conducting failure analysis after a qualifying incident
- Prioritizing speed or cost over user safety
- Repeating a previously documented failure
- Missing an escalation deadline for a safety-critical issue

### 7.3 Violation Response

When a violation is identified:
1. Document the violation with full context
2. Complete the missing accountability artifact retroactively
3. Identify the process gap that allowed the violation
4. Implement a safeguard to prevent recurrence
5. Log to Supabase shared_failures with tag: `accountability_violation`
6. If user harm occurred, trigger the safety-critical content protocol

---

## ENFORCEMENT RULE

Localization carries the trust of every user in every market.
A mistranslation is not "just a typo" -- it is a broken promise.
A cultural error is not "an oversight" -- it is disrespect.
A safety-critical error is not "a bug" -- it is a potential harm.
Document everything. Measure everything. Learn from everything.
The goal is not perfection -- it is systematic, accountable improvement.

---

## END OF ACCOUNTABILITY PROTOCOL

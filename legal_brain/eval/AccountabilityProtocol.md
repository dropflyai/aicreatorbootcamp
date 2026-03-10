# Legal Accountability Protocol — Governance and Oversight (Authoritative)

> **DISCLAIMER:** This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

This document defines how Legal Brain decisions are tracked, reviewed, and
held accountable. Legal advice has real-world consequences. Every analysis
must be traceable, every recommendation must be reviewable, and every
failure must be analyzed.

If accountability is not enforced, quality will degrade and liability will increase.

---

## ACCOUNTABILITY PRINCIPLES

1. **Every analysis must be traceable** — Who produced it, when, for what matter, and what sources were relied upon
2. **Every recommendation must be reviewable** — Sufficient reasoning must be documented for independent verification
3. **Every failure must be analyzed** — No legal error is ignored or minimized
4. **Every disclaimer must be present** — No output ships without the educational guidance disclaimer
5. **Every limitation must be stated** — The brain must explicitly state what it does not know and where licensed counsel is required
6. **Precedent must be current** — All cited authority must be verified as current and not overruled

---

## DECISION TRACKING

### Legal Analysis Log Format

Every significant legal analysis must be logged:

```markdown
## Analysis: [Matter Title]

**Date:** [YYYY-MM-DD]
**Matter Type:** [Contract / Compliance / IP / Privacy / Corporate / Dispute / Other]
**Jurisdiction(s):** [List all applicable]
**Analyst:** [Name/Brain]
**Requestor:** [Who asked for the analysis]

**Question Presented:**
[The specific legal question being analyzed]

**Issues Identified:**
1. [Issue 1 — materiality: high/medium/low]
2. [Issue 2 — materiality: high/medium/low]

**Analysis Summary:**
[Key findings and reasoning]

**Recommendations:**
1. [Recommendation 1 — priority: P0/P1/P2]
2. [Recommendation 2 — priority: P0/P1/P2]

**Authorities Relied Upon:**
- [Case/Statute/Regulation 1]
- [Case/Statute/Regulation 2]

**Limitations and Caveats:**
[What the analysis does not cover, what additional research is needed]

**Licensed Counsel Review Required:** YES / NO
**Reason:** [If yes, why]

**Follow-Up Date:** [When to revisit]

> DISCLAIMER: This analysis provides educational guidance. It is not a substitute
> for licensed legal counsel.
```

### What Requires a Full Analysis Log
- Contract review or drafting
- Compliance assessments
- IP matters (registration, enforcement, licensing)
- Privacy analyses (GDPR, CCPA, cross-border transfers)
- Corporate governance matters
- Litigation or dispute assessment
- Regulatory filings or responses
- Any matter with potential financial exposure > $10,000

### What Requires a Brief Log
- General legal questions with straightforward answers
- Policy reviews without material risk
- Routine document updates
- Standard template usage

---

## REVIEW CADENCE

### Per-Matter Review
**Who:** Assigned reviewer
**When:** Before every analysis ships
**What to verify:**
- All issues identified (compare against checklist for matter type)
- Risk assessment is accurate and proportionate
- Recommendations are specific and actionable
- Authorities are cited and current
- Disclaimer is present
- Limitations are stated
- Communication is clear for the audience

### Weekly Review
**Who:** Legal brain lead
**Duration:** 30 minutes
**What to review:**
- All analyses produced that week
- Any matters requiring follow-up
- Deadline tracking (statutes of limitation, filing deadlines, response deadlines)
- Open commitments and their status
- Emerging issues or regulatory changes

**Output:** Weekly status update logged to memory

### Monthly Review
**Who:** Legal team + stakeholders
**Duration:** 60 minutes
**What to review:**
- LegalScore.md evaluation across all 8 dimensions
- Benchmark scenario performance (run 2-3 scenarios)
- Matter log review (quality trends)
- Error and correction analysis
- Regulatory change impact assessment
- Template and precedent library updates needed
- Communication quality trends

**Output:** Monthly report with scores, trends, and action items

### Quarterly Review
**Who:** Legal team + leadership
**Duration:** 90 minutes
**What to review:**
- Full LegalScore.md evaluation with trend analysis
- Full benchmark test suite (all 16 scenarios)
- Matter outcome tracking (were recommendations followed? What happened?)
- Regulatory landscape changes and compliance posture updates
- Risk register review (new risks, resolved risks, changed risk levels)
- Process improvement opportunities
- Training needs assessment

**Output:** Quarterly report with strategic recommendations

### Annual Review
**Who:** Legal team + executive leadership
**Duration:** Half-day
**What to review:**
- Year-over-year LegalScore.md trends
- Legal risk landscape assessment
- Compliance program maturity evaluation
- IP portfolio review
- Privacy program audit
- Insurance coverage adequacy
- Outside counsel relationship review
- Budget and resource planning

**Output:** Annual legal risk report and strategic plan

---

## FAILURE ANALYSIS PROTOCOL

### Failure Categories

| Category | Definition | Required Response |
|----------|-----------|-------------------|
| Critical | Missed risk that resulted in material liability, regulatory violation, or litigation | Incident report within 24 hours |
| Major | Significant legal error, incorrect jurisdiction analysis, missed deadline | Post-mortem within 48 hours |
| Moderate | Incomplete analysis, weak risk assessment, poor communication | Analysis within 1 week |
| Minor | Citation errors, formatting issues, non-material omissions | Fix and log within 2 weeks |

### Legal Error Post-Mortem Template

```markdown
## Post-Mortem: [Error Title]

> DISCLAIMER: This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

**Date of Error Discovery:** [YYYY-MM-DD]
**Severity:** [Critical/Major/Moderate/Minor]
**Matter Reference:** [Link to original analysis]
**Impact:** [What happened or could have happened as a result]

### Error Description
[What was wrong in the analysis]

### Root Cause
[Why the error occurred — knowledge gap, process gap, oversight, etc.]

### What Should Have Been Caught
[At what stage and by what mechanism should this have been prevented]

### Corrective Action for This Matter
[What was done to correct the specific error]

### Systemic Prevention Measures
| # | Measure | Owner | Deadline | Status |
|---|---------|-------|----------|--------|
| 1 | [Action] | [Name] | [Date] | Open |
| 2 | [Action] | [Name] | [Date] | Open |

### Checklist Updates Required
[Which checklists or protocols need to be updated to prevent recurrence]

### Training Required
[What additional training or research is needed]

### Follow-Up Review Date
[When to verify prevention measures are effective]
```

### Failure Escalation Rules
- Critical failures: Notify leadership immediately. Engage outside counsel within 24 hours.
- Major failures: Notify team lead within 4 hours. Corrective analysis within 48 hours.
- Moderate failures: Log and assign within 24 hours. Analysis within 1 week.
- Minor failures: Fix within 2 weeks. Log for pattern analysis.

### Failure Pattern Analysis
- Review failure logs monthly for recurring patterns
- If same error type occurs 2+ times, escalate to systemic issue
- Systemic issues require a process change, not just a fix
- Track failure rate by matter type and dimension
- Legal errors have a LOWER tolerance threshold than other brains

---

## DEADLINE AND STATUTE TRACKING

### Deadline Categories
| Category | Examples | Alert Schedule |
|----------|----------|----------------|
| Regulatory Filing | Tax returns, annual reports, regulatory submissions | 60, 30, 14, 7, 3, 1 day(s) before |
| Statute of Limitations | Litigation deadlines, claims periods | 180, 90, 60, 30, 14 day(s) before |
| Contract Deadlines | Renewal notices, option exercise, termination notice | 90, 60, 30, 14, 7 day(s) before |
| Response Deadlines | C&D responses, regulatory inquiries, DSRs | 14, 7, 3, 1 day(s) before |
| IP Maintenance | Patent maintenance fees, trademark renewals | 180, 90, 60, 30 day(s) before |

### Deadline Tracking Requirements
- Every deadline must have an owner
- Every deadline must have an alert schedule
- Missed deadlines are treated as Critical failures
- Calendar invites must be created for all deadlines
- Backup owner must be assigned for deadlines during PTO

### Statute of Limitations Tracking

```markdown
## Statute Tracker: [Matter]

**Claim Type:** [e.g., breach of contract, patent infringement]
**Jurisdiction:** [State/Country]
**Statute of Limitations:** [Duration]
**Triggering Event:** [What starts the clock]
**Trigger Date:** [When the clock started]
**Expiration Date:** [When the deadline expires]
**Tolling Factors:** [Any factors that pause the clock]
**Status:** [Active / Expired / Tolled]
**Owner:** [Name]
```

---

## COMMITMENT TRACKING

### Client-Facing Commitments
Every promise made in legal communications must be tracked:

```markdown
## Commitment: [What was promised]

**Made to:** [Counterparty / Regulator / Court / Internal stakeholder]
**Made on:** [YYYY-MM-DD]
**Made by:** [Name/Brain]
**Deadline:** [YYYY-MM-DD]
**Status:** [Open / In Progress / Completed / Modified]
**Matter Reference:** [Link]
**Consequence of Breach:** [What happens if commitment is not met]
```

### Commitment Categories
| Category | Examples | SLA |
|----------|----------|-----|
| Regulatory responses | "We will produce documents by [date]" | Meet exact deadline |
| Contract obligations | "We will deliver audit report by [date]" | Meet contractual deadline |
| Litigation deadlines | "We will file response by [date]" | Meet court deadline (non-negotiable) |
| Internal commitments | "We will complete the review by [date]" | Meet or communicate delay in advance |
| Counterparty promises | "We will send redlines by [date]" | Meet or negotiate extension before deadline |

### Broken Commitment Protocol
If a legal commitment cannot be met:
1. Identify the issue BEFORE the deadline (never after)
2. Assess the consequence of missing the deadline
3. If court or regulatory deadline: this is a Critical failure — engage immediately
4. If contractual: notify counterparty and negotiate extension with documentation
5. If internal: communicate revised timeline with explanation
6. Log the broken commitment and root cause
7. Update processes to prevent recurrence

---

## QUALITY GATES

### Gate 1: Pre-Analysis
Before beginning any legal analysis:
- Matter type and jurisdiction(s) confirmed
- Scope of analysis defined and agreed upon
- Relevant documents collected
- Deadline for delivery confirmed
- Conflicts check completed (if applicable)

### Gate 2: Pre-Delivery
Before delivering any legal analysis:
- ReviewChecklist.md completed for the matter type
- All issues identified and assessed for materiality
- Recommendations are specific and actionable
- Authorities cited and verified as current
- Disclaimer is present
- Limitations are explicitly stated
- Communication is clear for the intended audience
- Peer review completed (for Critical or Major matters)

### Gate 3: Post-Delivery (1 week)
Within 1 week of delivery:
- Confirm analysis was received and understood
- Address any follow-up questions
- Track whether recommendations are being implemented
- Flag any new information that affects the analysis

### Gate 4: Quarterly Audit
Every quarter:
- Full LegalScore.md evaluation
- Benchmark test execution (all scenarios)
- Matter outcome review (what happened with past recommendations?)
- Deadline compliance audit
- Commitment tracking review
- Failure pattern analysis
- Regulatory change impact assessment

---

## ESCALATION MATRIX

| Issue | First Responder | Escalation 1 | Escalation 2 |
|-------|----------------|---------------|---------------|
| Litigation threat received | Legal brain | Outside counsel | CEO / Board |
| Regulatory inquiry | Legal brain | Outside counsel | CEO |
| Data breach detected | Legal brain + Security | Privacy counsel | CEO / Board |
| Contract dispute | Legal brain | Outside counsel | CFO |
| IP infringement detected | Legal brain | IP counsel | CEO |
| Employee legal complaint | Legal brain + HR | Employment counsel | CEO |
| Missed deadline | Legal brain lead | Outside counsel | General counsel |
| Compliance violation discovered | Legal brain | Compliance counsel | Board / Audit committee |

### Escalation Rules
- Always escalate matters involving potential litigation
- Always escalate matters involving regulatory enforcement
- Always escalate matters involving board-level obligations
- Never attempt to resolve Critical matters without outside counsel engagement
- Document every escalation with matter details and actions taken
- Escalation is never optional for matters exceeding the brain's competence

---

## CONFLICT OF INTEREST MANAGEMENT

### Conflict Check Requirements
- Before advising any party, check for conflicts with other parties previously advised
- Document all parties advised and the scope of advice
- If a conflict exists, disclose immediately and recuse from the matter
- Maintain a conflict register updated with every new matter

### Conflict Register Entry

```markdown
## Matter: [Title]
**Parties Involved:** [List all parties]
**Scope of Advice:** [What was analyzed]
**Date:** [YYYY-MM-DD]
**Conflict Check Result:** Clear / Conflict Identified
**If Conflict:** [Nature of conflict and action taken]
```

---

## CONTINUOUS IMPROVEMENT

### Knowledge Base Maintenance
- Update template library quarterly with lessons learned
- Maintain jurisdiction-specific checklists for common matter types
- Track regulatory changes and update compliance frameworks
- Archive notable analyses for future reference
- Build precedent library from past matter outcomes

### Self-Assessment Protocol
The Legal Brain must periodically evaluate its own performance:

**Monthly Self-Assessment Questions:**
1. Did I identify all material risks, or were risks discovered later?
2. Were my recommendations followed, and what were the outcomes?
3. Did I miss any jurisdiction-specific requirements?
4. Did I communicate clearly enough for the audience?
5. Did I provide practical, business-enabling advice or just risk warnings?
6. Did I properly state my limitations and recommend outside counsel when appropriate?
7. Were all my cited authorities current and correctly applied?

**Self-Assessment Scoring:**
- Answer each question: Strong / Adequate / Weak
- 2+ Weak answers = retraining required on those areas
- Any Weak answer on risk identification or compliance = immediate remediation

---

## BRAIN LIMITATIONS — MANDATORY DISCLOSURE

The Legal Brain must always disclose the following limitations:

1. **Not a substitute for licensed counsel** — All outputs are educational guidance
2. **Not privileged** — Output is not protected by attorney-client privilege
3. **Jurisdiction limitations** — Analysis may not cover all applicable jurisdictions
4. **Currency limitations** — Legal landscape changes; analysis reflects a point in time
5. **Fact limitations** — Analysis is only as good as the facts provided
6. **Complexity limitations** — Some matters require expertise beyond the brain's training

These limitations must be stated whenever relevant, not just in the disclaimer.

> **DISCLAIMER:** This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

---

## ENFORCEMENT RULE

Accountability is non-negotiable.
Every analysis is tracked. Every error is analyzed. Every deadline is monitored.
Legal mistakes have real consequences. Rigor is the only acceptable standard.

> **DISCLAIMER:** This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

---

## END OF ACCOUNTABILITY PROTOCOL

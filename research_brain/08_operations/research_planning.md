# Research Planning

Strategic planning, prioritization, and resource management for research programs that deliver maximum decision impact.

---

## 1. Research Roadmap

### 1.1 Purpose

A research roadmap aligns research activities with business strategy, ensuring that research investment directly supports the organization's most important decisions. Without a roadmap, research becomes reactive, fragmented, and misaligned with strategic priorities.

### 1.2 Roadmap Structure

**Time horizons:**
- **This quarter:** Active studies in progress or about to launch. Fully scoped, resourced, and scheduled.
- **Next quarter:** Planned studies with approved briefs. Recruitment and logistics in preparation.
- **This half (6 months):** Directional research themes. Studies identified but not yet fully scoped.
- **This year:** Strategic research investments aligned with annual goals. Flexible and adjusted quarterly.

**Roadmap template:**

```
Q1 2026                    Q2 2026                    Q3 2026
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│ User Research       │    │ Market Sizing       │    │ Pricing Research   │
│ - Persona refresh   │    │ - New market eval   │    │ - WTP study        │
│ - Onboarding study  │    │ - Segment analysis  │    │ - Conjoint         │
│                     │    │                     │    │                     │
│ Competitive         │    │ User Research       │    │ User Research      │
│ - Win/loss Q1       │    │ - Feature validation│    │ - Beta evaluation  │
│ - Landscape update  │    │ - Usability testing │    │ - Satisfaction     │
│                     │    │                     │    │                     │
│ Survey              │    │ Competitive         │    │ Trend              │
│ - Annual NPS        │    │ - Battlecard update │    │ - Tech radar       │
│ - CSAT baseline     │    │ - CI monitoring     │    │ - Scenario plan    │
└────────────────────┘    └────────────────────┘    └────────────────────┘
```

### 1.3 Roadmap Governance

- Review and update the roadmap quarterly with leadership.
- Track completion rate (studies completed vs planned).
- Track utilization rate (research recommendations acted upon vs shelved).
- Maintain a buffer (20-30% of capacity) for urgent, unplanned requests.
- Document roadmap changes and the reasons for them.

---

## 2. Research Prioritization

### 2.1 Impact vs Effort Matrix

The simplest and most practical prioritization framework. Evaluate each potential study on two dimensions:

**Impact:** How significantly will this research influence a business decision? Consider: decision size (revenue impact), decision urgency, current knowledge gap, number of stakeholders affected.

**Effort:** How much time, budget, and complexity is required? Consider: methodology complexity, recruitment difficulty, analysis time, stakeholder management.

```
                    HIGH IMPACT
                         │
    DO NEXT ─────────────┤──────── DO FIRST
    (high impact,        │        (high impact,
     high effort)        │         low effort)
                         │
   ─────────────────────┼──────────────────────
                         │
    DO NOT DO ───────────┤──────── DO LATER
    (low impact,         │        (low impact,
     high effort)        │         low effort)
                         │
                    LOW IMPACT
```

### 2.2 RICE Scoring

A more structured prioritization framework borrowed from product management:

**Reach:** How many people/decisions/teams will this research influence? (Score: estimated number)
**Impact:** How much will it influence those decisions? (Score: 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal)
**Confidence:** How confident are we in the Reach and Impact estimates? (Score: 100%=high, 80%=medium, 50%=low)
**Effort:** Person-weeks to complete. (Score: estimated weeks)

**RICE Score = (Reach x Impact x Confidence) / Effort**

Higher scores indicate higher priority. RICE forces explicit estimation of each component, reducing the influence of gut feeling and politics.

### 2.3 Strategic Alignment Filter

Before applying Impact/Effort or RICE, filter potential studies through strategic alignment:

1. **Does this study support a current strategic priority?** If no, deprioritize regardless of other scores.
2. **Is there a decision pending that depends on this research?** If yes, urgency increases.
3. **Is this research time-sensitive?** Market windows, competitive threats, and regulatory deadlines create natural urgency.
4. **Has this question been answered before?** Check the research repository before commissioning new research.

---

## 3. Research Request Intake

### 3.1 The Problem with Ad Hoc Requests

Without a structured intake process, research teams face a barrage of informal requests (Slack messages, hallway conversations, meeting action items) that are poorly defined, duplicative, and disconnected from strategy. Structured intake solves this.

### 3.2 Intake Process

**Step 1: Submit request via standardized form.** The form forces requesters to articulate their need clearly.

**Request form fields:**
- Requester name and team.
- Decision to be made (what will you do differently based on this research?).
- What you already know (existing data, hypotheses, assumptions).
- What you need to learn (specific questions).
- Target audience/segment.
- Timeline (when is the decision being made?).
- Budget available (if any).
- Priority (requester's assessment, validated by research team).

**Step 2: Research team reviews requests weekly.** Assess feasibility, check for duplication, estimate effort, assign priority.

**Step 3: Triage response.**
- **Accept:** Full study commissioned. Brief created.
- **Redirect:** Existing research answers the question. Share findings from repository.
- **Simplify:** Full study is overkill. Suggest a lighter method (quick survey, desk research, analytics pull).
- **Defer:** Valid question but lower priority. Add to backlog with expected timeline.
- **Decline:** Not feasible, not aligned, or not a research question. Explain why and suggest alternatives.

### 3.3 Intake Metrics

- Requests received per quarter.
- Acceptance rate (accepted / total requests).
- Average time from request to triage response.
- Redirect rate (answered by existing research).
- Requester satisfaction with intake process.

---

## 4. Stakeholder Management for Research

### 4.1 Stakeholder Mapping

Research serves multiple stakeholders with different needs, influence levels, and engagement preferences.

| Stakeholder | Research Needs | Engagement Level | Communication Preference |
|------------|---------------|-----------------|------------------------|
| Executive team | Strategic insights, market sizing, competitive landscape | Inform | Executive summary, quarterly briefing |
| Product team | User needs, feature validation, usability findings | Collaborate | Detailed findings, workshop participation |
| Marketing | Market segments, positioning data, messaging testing | Inform/Consult | Persona documents, positioning research |
| Sales | Competitive intelligence, win/loss, buyer persona | Inform | Battlecards, digest emails |
| Customer success | Satisfaction drivers, churn predictors, adoption barriers | Consult | Quarterly insights, journey maps |
| Engineering | Technical feasibility feedback, API usability | Consult | Specific usability findings |

### 4.2 Managing Expectations

- Set clear timelines at the outset. Research takes time; rushed research produces unreliable results.
- Share preliminary findings to maintain engagement (but label them as preliminary).
- Involve stakeholders in research design (question definition) to increase buy-in for findings.
- Present findings in stakeholder-specific formats (executives want implications; product teams want details).

---

## 5. Research Briefs

### 5.1 Purpose

The research brief is the contract between the research team and the stakeholder. It defines the scope, methodology, timeline, and deliverables before work begins. No study should proceed without an approved brief.

### 5.2 Brief Template

```
RESEARCH BRIEF

Title: [Study name]
Date: [Brief creation date]
Requestor: [Name, team]
Researcher: [Name]

BACKGROUND
What is the business context? Why is this research needed now?

OBJECTIVES
1. [Primary objective: the single most important question]
2. [Secondary objective]
3. [Secondary objective]

METHODOLOGY
- Method: [Interview / Survey / Usability test / etc.]
- Sample: [Who, how many, recruitment approach]
- Duration: [Data collection period]
- Analysis: [Thematic analysis / Statistical analysis / etc.]

DELIVERABLES
- [Research report / Presentation / Dashboard / Workshop]
- [Delivery date]
- [Distribution list]

TIMELINE
- Brief approval: [Date]
- Instrument development: [Date range]
- Recruitment: [Date range]
- Data collection: [Date range]
- Analysis: [Date range]
- Delivery: [Date]

BUDGET
- Incentives: $[Amount]
- Recruitment: $[Amount]
- Tools/platforms: $[Amount]
- Total: $[Amount]

RISKS AND DEPENDENCIES
- [Recruitment risk: availability of target participants]
- [Timeline risk: stakeholder review delays]
- [Quality risk: sample size limitations]

APPROVAL
Stakeholder signature: _______________  Date: _____
Research lead signature: ______________  Date: _____
```

---

## 6. Research Timelines

### 6.1 Typical Study Durations

| Study Type | Scoping | Design | Recruitment | Data Collection | Analysis | Reporting | Total |
|-----------|---------|--------|-------------|----------------|----------|-----------|-------|
| Interviews (10 sessions) | 1 week | 1 week | 1-2 weeks | 2-3 weeks | 1-2 weeks | 1 week | 6-10 weeks |
| Survey (500 respondents) | 1 week | 1-2 weeks | 1 week | 1-2 weeks | 1-2 weeks | 1 week | 6-9 weeks |
| Usability test (8 sessions) | 3 days | 1 week | 1-2 weeks | 1-2 weeks | 1 week | 3 days | 4-7 weeks |
| Competitive analysis | 3 days | 3 days | N/A | 2-3 weeks | 1 week | 1 week | 5-7 weeks |
| Market sizing | 3 days | 3 days | N/A | 1-2 weeks | 1 week | 3 days | 3-5 weeks |

### 6.2 Timeline Acceleration Tactics

- **Parallel tracks:** Recruit while designing the instrument. Analyze early data while collecting later sessions.
- **Unmoderated methods:** Unmoderated usability tests and surveys are faster than moderated sessions.
- **Existing panels:** Internal participant panels eliminate recruitment time.
- **Rapid reporting:** Topline findings presented within 48 hours of data collection completion. Full report follows.
- **Standing studies:** Recurring studies (quarterly NPS, monthly usability tests) eliminate repeated scoping and design.

---

## 7. Resource Allocation

### 7.1 Research Team Capacity Model

**Capacity units:** Measure capacity in researcher-weeks. A full-time researcher provides approximately 46 productive weeks per year (accounting for vacation, training, meetings, and administrative tasks).

**Allocation model:**
- 50-60% on roadmap studies (planned research).
- 20-30% on ad hoc requests (buffer for urgent needs).
- 10-20% on research operations (tool maintenance, repository curation, training, methodology development).

### 7.2 Scaling Research

| Team Size | Capabilities | Organization Type |
|-----------|-------------|-------------------|
| 0 (no researchers) | Democratized research only. PM and designers conduct interviews. | Pre-seed / Seed startup |
| 1 | Generalist researcher. Prioritize ruthlessly. Focus on highest-impact studies. | Series A startup |
| 2-3 | Specialization begins (qualitative + quantitative, or product + market). | Series B-C startup |
| 4-8 | Full research function. Embedded researchers per product area + shared services. | Growth-stage / Mid-market |
| 8+ | Research center of excellence. Specialized roles (ResearchOps, data science, qualitative, quantitative). | Enterprise |

### 7.3 When to Use External Research

- Specialized methodologies you lack internally (conjoint analysis, ethnography, econometric modeling).
- Large-scale quantitative studies requiring panel access.
- Third-party credibility (analyst firm validation, neutral win/loss interviewing).
- Surge capacity during peak demand.
- International research requiring local language and cultural expertise.

---

## 8. Research Planning Quality Checklist

- [ ] Research roadmap exists and is aligned with business strategy
- [ ] Prioritization framework is applied consistently (Impact/Effort, RICE, or equivalent)
- [ ] Intake process is defined and operational
- [ ] Research briefs are required for all studies
- [ ] Stakeholder communication plan is in place
- [ ] Timelines are realistic with built-in buffers
- [ ] Resource allocation balances planned and ad hoc work
- [ ] Research repository is checked before commissioning new studies
- [ ] Budget is tracked and allocated across the roadmap
- [ ] Roadmap is reviewed and updated quarterly

---

**This document governs research planning, prioritization, and resource management across all research brain operations.**

# Planning

## What This Enables

Planning transforms ambiguous intent into an actionable, risk-adjusted engineering
roadmap. Without rigorous planning, teams oscillate between building the wrong thing
and building the right thing poorly. This document codifies the formal techniques
that reduce both failure modes: requirements elicitation to surface latent needs,
MoSCoW prioritization to impose resource discipline, story mapping to preserve user
coherence, architecture decision records to make rationale durable, and reference
class forecasting to counteract the planning fallacy. Every project that enters the
Engineering Brain begins here.

---

## 1. Requirements Elicitation Techniques

Requirements elicitation is not a single activity but a convergent process that
triangulates stakeholder intent from multiple vantage points. No single technique
is sufficient; each compensates for the blind spots of the others.

### 1.1 Structured Interviews

Conduct one-on-one sessions with stakeholders using a prepared question guide.
Questions should follow the "context-problem-constraint" arc:

1. **Context:** What does your current workflow look like?
2. **Problem:** Where do you experience friction, delay, or error?
3. **Constraint:** What are the non-negotiable boundaries (budget, timeline, regulatory)?

Record sessions (with consent) and produce a thematic analysis within 48 hours.
Tag each finding with a confidence level: Confirmed, Probable, or Speculative.

### 1.2 Observation (Ethnographic Inquiry)

Contextual inquiry (Beyer & Holtzblatt, 1998) involves observing users in their
natural work environment. This surfaces tacit knowledge that stakeholders cannot
articulate in interviews because it has become invisible through habituation.

Protocol:
- Shadow users for minimum 2 hours per role
- Record task sequences, workarounds, and verbal frustrations
- Produce an affinity diagram grouping observations into themes
- Validate themes in a follow-up workshop

### 1.3 Prototyping as Elicitation

Low-fidelity prototypes (paper sketches, Balsamiq wireframes) function as boundary
objects (Star & Griesemer, 1989) that allow stakeholders with divergent mental models
to converge on a shared understanding. The prototype is not a deliverable; it is a
conversation device.

Rules:
- Never prototype in production technology during elicitation
- Discard prototypes after requirements are captured
- Use the prototype to test assumptions, not to demonstrate solutions

### 1.4 Document Archaeology

Extract implicit requirements from existing artifacts:
- Support ticket databases (top 20 issues by frequency)
- Competitor feature matrices
- Regulatory documents (SOC 2, HIPAA, GDPR, PCI-DSS)
- Existing API contracts and database schemas

### 1.5 Anti-Requirements (Negative Requirements)

Explicitly document what the system must NOT do. Anti-requirements prevent scope
creep and clarify boundaries:
- "The system must NOT store payment credentials locally"
- "The system must NOT require internet for offline-critical workflows"

---

## 2. MoSCoW Prioritization

MoSCoW (Clegg & Barker, 1994) partitions requirements into four categories with
strict semantic definitions. The common failure is treating MoSCoW as a
preference ranking rather than a contractual commitment framework.

| Category    | Definition                                                        | Decision Rule                              |
|-------------|-------------------------------------------------------------------|--------------------------------------------|
| **Must**    | Non-negotiable for the release. Failure to deliver = project fail | If removed, the release has zero value     |
| **Should**  | Important but can be satisfied via workaround if omitted          | If removed, value degrades but is nonzero  |
| **Could**   | Desirable. Include only if time and budget permit                 | If removed, no stakeholder escalation      |
| **Won't**   | Explicitly excluded from THIS release (not forever)               | Documented to prevent scope re-entry       |

### Application Rules

1. Must items may not exceed 60% of estimated capacity (provides buffer)
2. Every Must has a corresponding acceptance criterion and test case
3. Won't items are recorded with rationale and revisit date
4. Prioritization is reviewed at each iteration boundary, not just at kickoff

---

## 3. Story Mapping (Patton, 2014)

Jeff Patton's User Story Mapping provides a two-dimensional visualization that
preserves the narrative flow of user activity while enabling vertical slicing
for iterative delivery.

### Structure

```
Backbone (User Activities — left to right, chronological)
─────────────────────────────────────────────────────────────
  Activity 1        Activity 2        Activity 3
    │                  │                  │
    ├─ Task 1.1        ├─ Task 2.1        ├─ Task 3.1    ← Walking Skeleton
    ├─ Task 1.2        ├─ Task 2.2        ├─ Task 3.2    ← Release 1
    ├─ Task 1.3        ├─ Task 2.3        ├─ Task 3.3    ← Release 2
    └─ Task 1.4        └─ Task 2.4        └─ Task 3.4    ← Future
```

### Construction Protocol

1. **Identify user personas** from elicitation output
2. **Map the backbone:** Major activities the persona performs (left to right)
3. **Decompose vertically:** Tasks under each activity, ordered by priority (top = essential)
4. **Draw release lines:** Horizontal cuts across the map define minimum viable slices
5. **Validate:** The top slice (walking skeleton) must be end-to-end functional, even if minimal

### Walking Skeleton (Cockburn, 2004)

The first horizontal slice must traverse the entire backbone. It is a tiny
implementation that exercises the full architectural stack end-to-end. It proves
integration feasibility before any feature depth is added.

---

## 4. Technical Spikes

A spike is a time-boxed investigation whose deliverable is knowledge, not code.
Spikes reduce estimation uncertainty by converting unknown-unknowns into
known-unknowns or known-knowns.

### Spike Protocol

| Field            | Description                                          |
|------------------|------------------------------------------------------|
| **Objective**    | Specific question to answer (one question per spike) |
| **Time Box**     | Maximum duration (typically 1-4 hours, never >1 day) |
| **Output**       | Written finding: answer, evidence, recommendation    |
| **Disposition**  | Spike code is DISCARDED (never promoted to prod)     |

### When to Spike

- Integrating with an unfamiliar third-party API
- Evaluating a new library or framework
- Estimating performance characteristics of an approach
- Determining feasibility of a constraint (e.g., "Can we do X in <200ms?")

---

## 5. Architecture Decision Records (ADRs)

ADRs (Nygard, 2011) capture the context, decision, and consequences of significant
architectural choices. They are immutable once accepted; superseded ADRs are marked
as such but never deleted.

### ADR Template

```markdown
# ADR-{NNN}: {Title}

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-{NNN}

## Context
What forces are at play? What is the problem requiring a decision?

## Decision
What is the change that we are proposing and/or doing?

## Consequences
What becomes easier? What becomes harder? What are the tradeoffs?

## Alternatives Considered
What other options were evaluated and why were they rejected?
```

### Filing Rules

- ADRs are numbered sequentially and stored in `Decisions/`
- One decision per ADR (no bundling)
- ADRs are reviewed in PR alongside the implementing code
- Any engineer may propose an ADR; acceptance requires senior review

---

## 6. Estimation Methods

### 6.1 Reference Class Forecasting (Kahneman & Tversky, 1979)

The planning fallacy demonstrates that humans systematically underestimate
completion times by anchoring to best-case scenarios (the "inside view").
Reference class forecasting counters this with the "outside view":

1. **Identify the reference class:** Find a set of comparable past projects
2. **Establish the distribution:** What were the actual durations/costs?
3. **Position the current project:** Where in the distribution does it fall?
4. **Adjust for specifics:** Only after anchoring to the base rate

Example: If 80% of similar API integrations took 3-5 days, your estimate
should start at 3-5 days, not the 1.5 days your optimistic inside view suggests.

### 6.2 Three-Point Estimation (PERT)

For tasks without a reference class, use:

```
Expected = (Optimistic + 4 * Most Likely + Pessimistic) / 6
Standard Deviation = (Pessimistic - Optimistic) / 6
```

This produces a beta distribution approximation. Apply to individual tasks,
then sum for project-level estimates (central limit theorem applies).

### 6.3 Estimation Anti-Patterns

- **Anchoring to deadlines:** Estimate effort first, then compare to deadline
- **Student syndrome:** Work expands to fill the buffer (mitigate with transparency)
- **Precision theater:** Estimating to the hour implies false confidence; use ranges

---

## 7. Risk Matrix

Risk assessment uses a formal likelihood-times-impact matrix to prioritize
mitigation effort. This is standard practice per ISO 31000.

### Likelihood Scale

| Level | Label       | Probability     |
|-------|-------------|-----------------|
| 1     | Rare        | < 5%            |
| 2     | Unlikely    | 5% - 20%        |
| 3     | Possible    | 20% - 50%       |
| 4     | Likely      | 50% - 80%       |
| 5     | Near Certain| > 80%           |

### Impact Scale

| Level | Label       | Effect                                    |
|-------|-------------|-------------------------------------------|
| 1     | Negligible  | No schedule or budget impact               |
| 2     | Minor       | < 5% schedule slip, absorbable             |
| 3     | Moderate    | 5-15% slip, requires scope adjustment      |
| 4     | Major       | 15-30% slip, stakeholder escalation        |
| 5     | Catastrophic| > 30% slip or project cancellation risk    |

### Risk Score and Response

```
Risk Score = Likelihood x Impact

 1 - 4:   Accept   (monitor, no active mitigation)
 5 - 9:   Mitigate (reduce likelihood or impact)
10 - 15:  Transfer (insurance, outsource, contractual)
16 - 25:  Avoid    (change scope to eliminate the risk)
```

Every risk scoring >= 10 requires a named owner, a mitigation plan, and a
review cadence (weekly minimum).

---

## 8. Definition of Ready (DoR)

A work item may NOT enter implementation unless all DoR criteria are satisfied.
The DoR is a quality gate, not a suggestion.

### Mandatory Criteria

| #  | Criterion                                                    | Evidence Required         |
|----|--------------------------------------------------------------|---------------------------|
| 1  | User story follows "As a [role], I want [goal], so that [benefit]" format | Story text           |
| 2  | Acceptance criteria are written and testable                 | AC list with expected I/O |
| 3  | MoSCoW priority is assigned                                 | Priority label            |
| 4  | Dependencies are identified and unblocked                   | Dependency map            |
| 5  | Design artifacts exist (wireframes, API contract, schema)   | Links to artifacts        |
| 6  | Estimation is complete (3-point or reference class)          | Estimate record           |
| 7  | Risks scoring >= 10 have mitigation plans                   | Risk register entry       |
| 8  | ADR exists for any new architectural decision                | ADR link                  |

### Gate Enforcement

If any criterion is unmet, the item is returned to refinement. Engineers are
empowered (and expected) to reject items that fail the DoR. This is not
obstructionism; it is quality assurance applied to inputs.

---

## Cross-References

- Story mapping feeds vertical slicing in `Implementation.md`
- ADRs are stored in `../Decisions/`
- Risk matrix feeds threat modeling in `Design.md`
- Estimation outputs feed capacity planning in `../Playbook.md`
- Definition of Ready pairs with Definition of Done in `Verification.md`

---

## Key References

- Beyer, H. & Holtzblatt, K. (1998). *Contextual Design*. Morgan Kaufmann.
- Clegg, D. & Barker, R. (1994). *Case Method Fast-Track: A RAD Approach*. Addison-Wesley.
- Cockburn, A. (2004). *Crystal Clear*. Addison-Wesley.
- Kahneman, D. & Tversky, A. (1979). Prospect Theory. *Econometrica*, 47(2).
- Nygard, M. (2011). Documenting Architecture Decisions. Blog post.
- Patton, J. (2014). *User Story Mapping*. O'Reilly.
- Star, S.L. & Griesemer, J.R. (1989). Institutional Ecology. *Social Studies of Science*, 19(3).

# Outsourcing Strategy -- Core vs. Context and the Make-or-Buy Decision

## Overview

Outsourcing is the strategic decision to have an external organization perform
work that could be done internally. It is one of the most consequential
operational decisions a company makes -- it determines organizational
boundaries, shapes competitive advantage, and defines what the company IS
versus what the company USES.

Geoffrey Moore's "core vs. context" framework provides the foundational
logic: invest disproportionately in activities that create competitive
differentiation (core), and outsource or simplify activities that do not
differentiate (context). Every hour and dollar spent on context is a resource
stolen from core.

This module covers the outsourcing decision framework, types of outsourcing,
SLA design for outsourced services, transition planning, knowledge transfer,
governance, and the criteria for bringing outsourced work back in-house.

---

## Core vs. Context (Geoffrey Moore)

### The Framework

```
CORE VS. CONTEXT MATRIX:
              MISSION-CRITICAL
                    |
    CORE            |      CORE
    (mission-       |      (mission-critical,
     critical,      |       differentiating)
     non-diff)      |
                    |
NON-DIFF ----------+---------- DIFFERENTIATING
                    |
    CONTEXT         |      CONTEXT
    (non-critical,  |      (non-critical,
     non-diff)      |       differentiating)
                    |
              NON-CRITICAL

ACTIONS:
Core + Differentiating:     INVEST HEAVILY (this is your moat)
Core + Non-differentiating: OPTIMIZE (necessary but not a moat)
Context + Differentiating:  EVALUATE (may become core over time)
Context + Non-differentiating: OUTSOURCE or AUTOMATE
```

### Applying Core vs. Context

```
CLASSIFICATION EXERCISE:
For each function/process, ask:

1. Does this directly create value that customers choose us for?
   YES --> Possibly CORE
   NO  --> Probably CONTEXT

2. If we do this 10x better than competitors, would customers notice?
   YES --> DIFFERENTIATING
   NO  --> NON-DIFFERENTIATING

3. If this fails, does the business stop?
   YES --> MISSION-CRITICAL
   NO  --> NON-CRITICAL

EXAMPLES FOR A SAAS COMPANY:
+----------------------------+------------------+-----------+
| Function                   | Classification   | Action    |
+----------------------------+------------------+-----------+
| Product development        | Core/Diff        | Invest    |
| Customer success           | Core/Diff        | Invest    |
| Payroll processing         | Context/Non-diff | Outsource |
| Office management          | Context/Non-diff | Outsource |
| Data infrastructure        | Core/Non-diff    | Optimize  |
| Legal/compliance           | Context/Critical | Outsource |
| IT helpdesk                | Context/Non-diff | Outsource |
| Brand design               | Context/Diff     | Evaluate  |
| Sales                      | Core/Diff        | Invest    |
| Recruiting                 | Core/Non-diff    | Hybrid    |
+----------------------------+------------------+-----------+
```

---

## The Outsourcing Decision Framework

### Make vs. Buy Decision Tree

```
MAKE-OR-BUY DECISION:

Is this activity core and differentiating?
  YES --> MAKE (keep in-house, invest heavily)
  NO  --> Continue

Is this activity mission-critical?
  YES --> Can we find a vendor with 99.9%+ reliability?
    YES --> OUTSOURCE with strong SLAs and governance
    NO  --> MAKE (too risky to outsource)
  NO  --> Continue

Is the cost of doing this internally justified?
  YES (internal cost < external cost + switching cost) --> MAKE
  NO  --> Continue

Does outsourcing create unacceptable risk?
  YES --> MAKE (or hybrid: partial outsource)
  NO  --> OUTSOURCE
```

### Outsourcing Readiness Assessment

```
OUTSOURCING READINESS CHECKLIST:
+--------------------------------------------------+
| PROCESS READINESS:                               |
| [ ] Process is documented (SOP exists)           |
| [ ] Process is standardized (not ad hoc)         |
| [ ] Quality metrics are defined and measurable   |
| [ ] Handoff points are clearly defined           |
| [ ] Exceptions are cataloged with handling rules |
|                                                  |
| ORGANIZATIONAL READINESS:                        |
| [ ] Management supports the outsourcing decision |
| [ ] Affected employees are informed              |
| [ ] Internal team to manage vendor is identified |
| [ ] Knowledge transfer plan exists               |
| [ ] Governance structure is designed             |
|                                                  |
| VENDOR READINESS:                                |
| [ ] Qualified vendors exist in the market        |
| [ ] Vendor can meet quality and SLA requirements |
| [ ] Vendor has relevant domain expertise         |
| [ ] Vendor has scalability to grow with us       |
| [ ] Contract terms are acceptable                |
+--------------------------------------------------+

SCORING: All items must be checked before proceeding.
         Any unchecked item requires a mitigation plan.
```

---

## Types of Outsourcing

### Business Process Outsourcing (BPO)

```
BPO CATEGORIES:
+--------------------------------------------------+
| BACK-OFFICE BPO:                                 |
| - Accounting and bookkeeping                     |
| - Payroll processing                             |
| - HR administration                              |
| - Data entry and processing                      |
| - IT support and helpdesk                        |
|                                                  |
| FRONT-OFFICE BPO:                                |
| - Customer service (phone, chat, email)          |
| - Technical support (Tier 1, Tier 2)            |
| - Sales development (SDR outsourcing)            |
| - Content moderation                             |
|                                                  |
| KNOWLEDGE PROCESS OUTSOURCING (KPO):             |
| - Data analytics and reporting                   |
| - Market research                                |
| - Legal process outsourcing (LPO)               |
| - Financial analysis                             |
|                                                  |
| IT OUTSOURCING (ITO):                            |
| - Application development                        |
| - Infrastructure management                      |
| - QA and testing                                 |
| - DevOps and cloud management                    |
+--------------------------------------------------+
```

### Outsourcing Models

| Model | Description | Control Level | Cost | Best For |
|-------|------------|---------------|------|----------|
| Staff augmentation | Vendor provides people, you manage them | High | Medium | Temporary capacity needs |
| Managed services | Vendor owns delivery, you define SLAs | Medium | Medium-Low | Ongoing, well-defined work |
| Project-based | Vendor delivers a defined project | Medium | Variable | One-time initiatives |
| Full BPO | Vendor owns entire function end-to-end | Low | Low | Non-core, commoditized functions |
| Hybrid/Co-sourcing | Split responsibility between internal and vendor | High | Medium | Transition or strategic functions |

### Geographic Models

| Model | Description | Cost Savings | Timezone | Communication |
|-------|------------|-------------|----------|---------------|
| Onshore | Same country | Low (0-10%) | Same | Easy |
| Nearshore | Adjacent country/timezone | Medium (20-40%) | Similar | Moderate |
| Offshore | Different continent | High (40-70%) | Different | Challenging |
| Multi-shore | Blend of above | Optimized | Mixed | Structured required |

---

## SLA Design for Outsourced Services

### The SLA Architecture

```
OUTSOURCING SLA FRAMEWORK:
+--------------------------------------------------+
| LAYER 1: SERVICE DEFINITION                      |
| What exactly is being delivered                   |
| - Scope of services (in/out of scope)            |
| - Service hours (24x7, business hours, etc.)     |
| - Service catalog (all deliverables listed)      |
|                                                  |
| LAYER 2: PERFORMANCE STANDARDS                   |
| How well it must be delivered                     |
| - Response time SLAs (by priority)               |
| - Resolution time SLAs (by priority)             |
| - Quality metrics (accuracy, CSAT, FCR)          |
| - Volume/capacity commitments                    |
|                                                  |
| LAYER 3: REPORTING AND GOVERNANCE                |
| How performance is tracked and managed            |
| - Daily/weekly/monthly reporting                 |
| - Scorecard frequency and format                 |
| - Governance meeting cadence                     |
| - Escalation matrix                              |
|                                                  |
| LAYER 4: COMMERCIAL TERMS                        |
| Financial consequences of performance             |
| - Service credits for SLA misses                 |
| - Gain-sharing for exceeding targets             |
| - Penalty caps and floors                        |
| - Termination triggers                           |
+--------------------------------------------------+
```

### Priority-Based SLA Table

```
SUPPORT OUTSOURCING SLA EXAMPLE:
+----------+--------------+--------------+----------+
| Priority | Response Time| Resolution   | Credit   |
+----------+--------------+--------------+----------+
| P0 (Crit)| 15 minutes   | 4 hours      | 20%/hr   |
| P1 (High)| 1 hour       | 8 hours      | 10%/hr   |
| P2 (Med) | 4 hours      | 24 hours     | 5%/day   |
| P3 (Low) | 8 hours      | 72 hours     | 2%/day   |
+----------+--------------+--------------+----------+
Monthly SLA target: 95% of tickets within SLA
Credit cap: 25% of monthly invoice
```

---

## Transition Planning

### The Transition Framework

```
OUTSOURCING TRANSITION PHASES:
+--------------------------------------------------+
| PHASE 1: PREPARATION (4-8 weeks)                 |
| - Document all processes (SOPs)                  |
| - Define success criteria for transition         |
| - Assign internal transition manager             |
| - Establish communication cadence                |
|                                                  |
| PHASE 2: KNOWLEDGE TRANSFER (4-12 weeks)         |
| - Transfer documentation to vendor               |
| - Conduct training sessions (recorded)           |
| - Shadow period (vendor observes)                |
| - Reverse shadow (vendor performs, we observe)   |
| - Knowledge assessments (test vendor readiness)  |
|                                                  |
| PHASE 3: PARALLEL RUN (2-4 weeks)               |
| - Vendor and internal team both perform work     |
| - Compare quality, speed, and accuracy           |
| - Identify and resolve gaps                      |
| - Go/no-go decision for full cutover             |
|                                                  |
| PHASE 4: CUTOVER (1-2 weeks)                    |
| - Vendor assumes full responsibility             |
| - Internal team available for escalations        |
| - Daily check-ins during stabilization           |
|                                                  |
| PHASE 5: STABILIZATION (4-8 weeks)              |
| - Monitor all SLA metrics closely               |
| - Weekly governance reviews                      |
| - Address issues rapidly                         |
| - Transition internal team to oversight role     |
+--------------------------------------------------+

TOTAL TIMELINE: 15-35 weeks depending on complexity.
```

### Transition Risk Management

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Knowledge loss | High | High | Documented SOPs, recorded training, knowledge assessments |
| Quality drop during transition | High | Medium | Parallel run, gradual volume ramp |
| Employee morale impact | Medium | High | Transparent communication, redeployment plan |
| Vendor underperformance | Medium | High | Contractual remedies, exit clause, backup plan |
| Scope creep | Medium | Medium | Detailed scope documentation, change management |
| Security breach during handoff | Low | High | Data handling protocols, access controls, audit |

---

## Knowledge Transfer

### The Knowledge Transfer Protocol

```
KNOWLEDGE TRANSFER METHODOLOGY:
+--------------------------------------------------+
| STEP 1: INVENTORY                                |
| Catalog all knowledge required for the function: |
| - Explicit knowledge (documents, SOPs, data)     |
| - Tacit knowledge (experience, judgment, context)|
| - Tribal knowledge (undocumented practices)      |
|                                                  |
| STEP 2: DOCUMENT                                 |
| Convert tacit and tribal knowledge to explicit:  |
| - Process documentation (step-by-step SOPs)      |
| - Decision trees (if X, do Y)                   |
| - Exception catalogs (known edge cases)          |
| - FAQ documents (common questions and answers)   |
|                                                  |
| STEP 3: TRAIN                                    |
| Transfer knowledge through multiple channels:    |
| - Classroom/virtual training sessions            |
| - Self-paced learning modules                    |
| - Hands-on practice with sample work             |
| - Shadowing (observe experienced performers)     |
|                                                  |
| STEP 4: ASSESS                                   |
| Verify knowledge has been transferred:           |
| - Written assessments                            |
| - Practical assessments (do the work, we verify)|
| - Certification gate (must pass to go live)      |
|                                                  |
| STEP 5: SUSTAIN                                  |
| Maintain knowledge over time:                    |
| - Regular refresher training                     |
| - Updated documentation as processes change      |
| - Knowledge management system with version control|
+--------------------------------------------------+
```

---

## Outsourcing Governance

### The Governance Structure

```
GOVERNANCE MODEL:
+--------------------------------------------------+
| STRATEGIC (Quarterly)                            |
| Attendees: VP/Director + Vendor leadership       |
| Agenda: Business review, strategy alignment,     |
|         contract/commercial discussion           |
|                                                  |
| TACTICAL (Monthly)                               |
| Attendees: Manager + Vendor operations manager   |
| Agenda: SLA review, scorecard, improvement plans,|
|         upcoming changes, issue resolution        |
|                                                  |
| OPERATIONAL (Weekly)                             |
| Attendees: Team lead + Vendor team lead          |
| Agenda: Performance data, open issues, workload  |
|         planning, day-to-day coordination        |
|                                                  |
| DAILY (as needed)                                |
| Channel: Slack/Teams/Huddle                      |
| Purpose: Issue resolution, queue management      |
+--------------------------------------------------+
```

---

## Insourcing -- Bringing Work Back In-House

### When to Insource

```
INSOURCING DECISION CRITERIA:
+--------------------------------------------------+
| CONSIDER INSOURCING WHEN:                        |
|                                                  |
| 1. The function has become core/differentiating  |
|    (what was context is now a competitive moat)  |
|                                                  |
| 2. Vendor quality is persistently below standard |
|    (RED scorecard for 2+ consecutive quarters)   |
|                                                  |
| 3. Cost advantage has eroded                     |
|    (internal cost < vendor cost after accounting |
|     for management overhead)                     |
|                                                  |
| 4. Speed/agility is being constrained            |
|    (vendor change management slows us down)      |
|                                                  |
| 5. Security/compliance risk is unacceptable      |
|    (data sensitivity requires internal control)  |
|                                                  |
| 6. Vendor dependency creates strategic risk      |
|    (single vendor, no alternatives available)    |
+--------------------------------------------------+

INSOURCING IS NOT:
- Punishing a vendor for one bad quarter
- A reaction to a single incident
- A decision made without cost-benefit analysis
```

### Insourcing Transition Plan

```
INSOURCING PROCESS:
1. DECIDE (4 weeks)
   - Cost-benefit analysis (insource vs. outsource)
   - Headcount plan (how many people, what skills)
   - Timeline and budget
   - Stakeholder approval

2. BUILD INTERNAL CAPABILITY (8-16 weeks)
   - Hire and train internal team
   - Build or acquire necessary tools
   - Develop internal SOPs
   - Knowledge transfer FROM vendor

3. PARALLEL RUN (4-8 weeks)
   - Internal team handles increasing volume
   - Vendor handles decreasing volume
   - Compare quality metrics

4. CUTOVER (2-4 weeks)
   - Internal team assumes full responsibility
   - Vendor provides post-transition support

5. VENDOR EXIT (4-8 weeks)
   - Complete data handover
   - Terminate contract per terms
   - Document lessons learned
```

---

## Outsourcing Anti-Patterns

| Anti-Pattern | Description | Prevention |
|-------------|------------|------------|
| Outsource and forget | No governance after contract signing | Mandatory governance cadence |
| Cost-only decision | Choosing cheapest vendor regardless of quality | Use weighted scorecard (not just price) |
| Outsourcing chaos | Outsourcing a process that is not standardized | Standardize first, then outsource |
| Vendor lock-in | No exit plan, data trapped with vendor | Contractual data portability, exit clause |
| Scope ambiguity | Unclear boundaries of what is in/out of scope | Detailed scope document in contract |
| Over-outsourcing | Outsourcing core capabilities | Apply core vs. context rigorously |

---

**Outsourcing is a strategic weapon when used correctly: it frees the
organization to focus on what it does best by leveraging external expertise
for everything else. The Operations Brain applies Moore's core vs. context
framework rigorously, transitions deliberately, governs continuously, and
retains the strategic judgment to insource when the equation changes.**

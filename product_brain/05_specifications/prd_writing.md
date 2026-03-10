# PRD Writing

## What This Enables

The ability to produce product requirements documents that serve their actual purpose: aligning cross-functional teams around what to build, why it matters, and how success will be measured. A well-written PRD is the contract between product, engineering, and design — not a bureaucratic artifact, but a thinking tool that forces clarity before code is written. Poor PRDs produce misaligned teams, scope creep, and products that technically meet specifications but miss the point.

---

## The Core Insight

The PRD is not a specification of the solution. It is a specification of the problem, the desired outcome, the constraints, and the success criteria — leaving room for engineering and design to determine the best solution. As Marty Cagan argues (Empowered, 2020), the best product teams do not receive requirements to implement; they receive problems to solve. The PRD should make the problem so clear that the right solution becomes obvious to a competent cross-functional team.

---

## PRD Structure

### The Essential Components

Every PRD must answer these questions, regardless of format:

| Component | Question Answered | Who Uses It |
|-----------|-------------------|-------------|
| **Problem statement** | What customer problem are we solving? | Everyone |
| **Customer segment** | Who specifically has this problem? | Design, Marketing |
| **Evidence** | How do we know this problem exists and matters? | Leadership, skeptics |
| **Desired outcome** | What measurable change will success produce? | Engineering, Analytics |
| **Success metrics** | How will we measure if we succeeded? | Analytics, PM, Leadership |
| **Scope** | What is included and excluded? | Engineering, Design |
| **Requirements** | What must be true for the solution to succeed? | Engineering, QA |
| **Constraints** | What limitations must the solution respect? | Engineering, Legal, Security |
| **Dependencies** | What external factors does this depend on? | Engineering, Project Management |
| **Risks** | What could go wrong? How do we mitigate? | Leadership, Engineering |
| **Timeline** | What is the target delivery window? | Everyone |
| **Kill criteria** | Under what conditions do we stop or pivot? | PM, Leadership |

### The Full PRD Template

```
1. OVERVIEW
   1.1 Problem Statement
   1.2 Background and Context
   1.3 Customer Segment
   1.4 Strategic Alignment (how this connects to product strategy)

2. EVIDENCE
   2.1 Customer Evidence (interviews, data, support tickets)
   2.2 Market Evidence (competitive landscape, trends)
   2.3 Business Evidence (revenue impact, retention impact)
   2.4 Key Assumptions (what we believe but have not validated)

3. DESIRED OUTCOME
   3.1 Target Outcome (measurable customer behavior change)
   3.2 Success Metrics (primary metric, guardrail metrics)
   3.3 Non-Goals (what this initiative is NOT trying to achieve)

4. SOLUTION OVERVIEW
   4.1 Proposed Approach (high-level — not a detailed spec)
   4.2 User Experience (user flow, key interactions)
   4.3 Technical Approach (architecture-level — not implementation detail)

5. REQUIREMENTS
   5.1 Functional Requirements (what the system must do)
   5.2 Non-Functional Requirements (performance, security, accessibility)
   5.3 Acceptance Criteria (Given/When/Then for key scenarios)
   5.4 Out of Scope (explicitly what we are NOT building)

6. DESIGN
   6.1 Wireframes / Mockups (link to design files)
   6.2 Design Principles (specific to this feature)
   6.3 Edge Cases and Error States

7. IMPLEMENTATION
   7.1 Technical Dependencies
   7.2 Phasing / Rollout Plan
   7.3 Feature Flags and Rollback Strategy
   7.4 Data and Analytics Requirements (events to track)

8. RISKS AND MITIGATIONS
   8.1 Technical Risks
   8.2 Customer Risks
   8.3 Business Risks
   8.4 Mitigation Strategies

9. TIMELINE AND MILESTONES
   9.1 Estimated Duration
   9.2 Key Milestones
   9.3 Dependencies and Blockers

10. APPENDIX
    10.1 Research Findings
    10.2 Competitive Analysis
    10.3 Related Documents
```

---

## Amazon 6-Pager / PR-FAQ

### Origin and Philosophy

Amazon's product development process centers on the "working backwards" methodology. Before building anything, a PM writes a future press release and FAQ as if the product has already launched. This forces customer-centric thinking and tests whether the product's value proposition can be communicated clearly.

### The Press Release Structure

```
PRESS RELEASE (1 page)

Headline: [Product name] helps [customer] [benefit]
   - One sentence that captures the essence

Sub-headline: [Who is the customer and what they can now do]

Date and location: [Formatted as a real press release]

Opening paragraph:
   - What is the product?
   - Who is it for?
   - What problem does it solve?
   - What is the key benefit?

Problem paragraph:
   - Describe the current pain point in vivid detail
   - Use customer language, not internal jargon
   - Quantify the problem if possible

Solution paragraph:
   - How does the product solve the problem?
   - What is the experience like for the customer?
   - What makes this solution better than alternatives?

Customer quote:
   - A fictional but realistic quote from a target customer
   - Describes their experience with the product
   - Captures the emotional benefit, not just functional

How to get started:
   - Simple call to action
   - Emphasize ease of adoption

Internal quote:
   - Quote from a company leader
   - Why the company built this
   - Vision for the future
```

### The FAQ Section

```
EXTERNAL FAQ (customer-facing questions, 2-3 pages)
- What is [product name]?
- Who is this for?
- How does it work?
- How much does it cost?
- What data do you collect?
- How is this different from [competitor]?
- What if I want to cancel?

INTERNAL FAQ (business and technical questions, 2-3 pages)
- What is the target market size?
- What are the unit economics?
- What is the competitive landscape?
- What are the biggest technical risks?
- How will we measure success?
- What is the go-to-market strategy?
- What resources are needed?
- What are the dependencies?
- What is the timeline?
- What are the key assumptions?
```

### Why PR-FAQ Works

| Benefit | Mechanism |
|---------|-----------|
| Forces clarity | If you cannot write a clear press release, the product vision is not clear |
| Customer-first | The press release is written for the customer, not for stakeholders |
| Tests value proposition | If the press release is not compelling, the product may not be either |
| Exposes gaps early | The FAQ forces you to answer hard questions before building |
| Aligns stakeholders | A concrete document is easier to debate than an abstract idea |
| Reduces waste | Killing a bad idea at the PR-FAQ stage costs hours, not months |

---

## Shape Up: The Pitch

### Origin

Ryan Singer (Shape Up, Basecamp, 2019). Shape Up replaces traditional PRDs with "pitches" — concise documents that define the problem, appetite (time budget), solution direction, and risks.

### Pitch Structure

```
1. PROBLEM
   - The raw idea or observation
   - What happens today that is not good enough
   - Specific use cases or stories (concrete, not abstract)

2. APPETITE
   - How much time are we willing to spend?
   - Small batch: 1-2 weeks
   - Big batch: 6 weeks
   - This is a budget, not an estimate. The team shapes scope to fit.

3. SOLUTION
   - Fat marker sketches (intentionally low-fidelity)
   - Key elements and interactions
   - NOT wireframes or mockups — leave room for design
   - "Breadboarding" — abstract flows showing components and connections

4. RABBIT HOLES
   - Known technical or design risks
   - Specific things that could blow up the timeline
   - How to avoid or contain them
   - Decisions to make upfront to prevent scope creep

5. NO-GOS
   - Explicitly out of scope
   - Things that might seem related but should NOT be included
   - Edge cases we will intentionally not handle
```

### Fat Marker Sketches

Shape Up uses intentionally rough sketches ("fat marker" — as if drawn with a thick marker) to convey the solution direction without over-specifying:

```
Instead of: Pixel-perfect mockup of a settings page
Use: "Settings page with: [list of key fields], [save button], [cancel link]"

Instead of: Detailed interaction specification
Use: "When user clicks X, show Y. Details TBD by design."
```

**Rationale:** Detailed specs too early remove the team's ability to find elegant solutions. The pitch provides enough direction to build but enough ambiguity to innovate.

### Shape Up vs Traditional PRD

| Dimension | Traditional PRD | Shape Up Pitch |
|-----------|----------------|----------------|
| Length | 10-30 pages | 1-5 pages |
| Specificity | Detailed requirements | Direction + boundaries |
| Time frame | Estimated by engineering | Budgeted by product ("appetite") |
| Design | Mockups included or referenced | Fat marker sketches |
| Scope management | Change requests when scope changes | Scope is cut to fit appetite |
| Team autonomy | Low (implementing a spec) | High (solving a shaped problem) |

---

## Writing for Engineers

### What Engineers Need From a PRD

| Need | What It Looks Like |
|------|-------------------|
| **Context** | Why we are building this — the problem and the customer |
| **Constraints** | Technical limits, compatibility requirements, performance targets |
| **Acceptance criteria** | Precise, testable conditions for "done" |
| **Edge cases** | What happens when things go wrong — not just the happy path |
| **Dependencies** | APIs, services, data sources that this depends on |
| **Data requirements** | What events to track, what data to store, what to expose via API |
| **Not-goals** | What we are explicitly NOT building (prevents scope creep) |
| **Autonomy** | Room to choose the technical approach — define what, not how |

### PRD Anti-Patterns for Engineering Audiences

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Solution over-specification | "Use a modal dialog with a 400px width" | "Display a confirmation before destructive actions" |
| Missing edge cases | Only describes the happy path | Add error states, empty states, boundary conditions |
| Ambiguous language | "The system should be fast" | "Page load time < 2 seconds at p95" |
| No acceptance criteria | Engineers guess what "done" means | Given/When/Then for every key scenario |
| Missing data requirements | Analytics added as an afterthought | Include event taxonomy in the PRD |
| Scope ambiguity | "We might also want to add..." | Clear in-scope and out-of-scope lists |

### Technical Context Section

For engineering audiences, include a technical context section:

```
TECHNICAL CONTEXT
- Affected services/components: [list]
- Database changes required: [yes/no, high-level]
- API changes: [new endpoints, modified endpoints]
- Third-party dependencies: [services, SDKs]
- Performance requirements: [latency, throughput, availability]
- Security considerations: [authentication, authorization, data handling]
- Backward compatibility: [breaking changes? migration needed?]
- Feature flag: [flag name and rollout plan]
- Monitoring/alerting: [what to monitor, alert thresholds]
```

---

## PRD Quality Checklist

### Before Sharing the PRD

| Check | Question |
|-------|----------|
| Problem clarity | Could an engineer explain the customer problem after reading this? |
| Evidence | Is there customer evidence, not just internal opinion? |
| Metrics | Are success metrics defined with specific targets? |
| Scope | Are in-scope and out-of-scope clearly stated? |
| Acceptance criteria | Are Given/When/Then scenarios written for key flows? |
| Edge cases | Are error states, empty states, and boundary conditions addressed? |
| Dependencies | Are all external dependencies identified? |
| Risks | Are the top 3 risks identified with mitigations? |
| Kill criteria | Under what conditions do we stop? |
| Non-goals | Is it explicit what this does NOT do? |
| Feasibility check | Has engineering reviewed for feasibility? |
| Design alignment | Has design reviewed for usability? |

---

## The PRD Lifecycle

```
Stage 1: DRAFT
   - PM writes initial draft based on discovery
   - Shared with product trio for feedback
   - Focus: problem, evidence, desired outcome

Stage 2: REVIEW
   - Engineering reviews for feasibility and estimates
   - Design reviews for usability and UX implications
   - Stakeholders review for strategic alignment
   - Focus: requirements, scope, constraints

Stage 3: APPROVED
   - All reviewers have signed off
   - Acceptance criteria are finalized
   - Dependencies are confirmed
   - Focus: commitment to build

Stage 4: IN PROGRESS
   - Team references PRD during development
   - PM clarifies questions and resolves ambiguities
   - Scope adjustments documented in the PRD
   - Focus: living reference document

Stage 5: COMPLETE
   - Feature shipped; success metrics being tracked
   - PRD archived with actual vs predicted outcomes
   - Learnings documented for future PRDs
   - Focus: retrospective and learning
```

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| PRD-as-spec | 30-page document that removes all team autonomy | PM acting as system analyst | Define outcomes, not solutions; use Shape Up pitch format |
| Missing "why" | Engineers build the feature but do not understand its purpose | PRD jumps to solution without problem context | Problem statement and evidence sections are mandatory |
| PRD shelf-ware | PRD written but never referenced during development | Too long, too abstract, or written too early | Keep PRDs concise; write them just-in-time |
| Acceptance drift | Final product does not match acceptance criteria | Criteria not reviewed during development | QA references acceptance criteria in test plans |
| No kill criteria | Team continues building even when evidence suggests pivoting | PM does not define stopping conditions | Every PRD must include explicit kill criteria |

---

## The Operator's Framework

When writing a PRD:

1. **Start with the problem** — if you cannot articulate the customer problem clearly, you are not ready to write a PRD
2. **Include evidence** — customer interviews, data, support tickets that validate the problem
3. **Define the outcome** — what measurable change will success produce?
4. **Choose the right format** — traditional PRD for complex projects, PR-FAQ for new products, Shape Up pitch for time-boxed work
5. **Write for engineers** — include technical context, edge cases, acceptance criteria, and explicit scope boundaries
6. **Define kill criteria** — under what conditions you will stop or pivot
7. **Keep it alive** — the PRD is a living document, updated as the team learns during development

---

## Summary

PRD writing is a discipline of clarity under constraint. The traditional PRD provides comprehensive structure for complex initiatives. Amazon's PR-FAQ forces customer-centric thinking by writing the press release before the product exists. Shape Up's pitch trades specification for direction, giving teams a budget (appetite) and a shaped problem rather than a detailed requirement set. All three formats share a common foundation: a clear problem statement, customer evidence, measurable success criteria, explicit scope, and defined risks. The best PRDs answer "why" and "what" while leaving "how" to the cross-functional team. They are written for engineers — with technical context, edge cases, and testable acceptance criteria — not for executives. A PRD that sits on a shelf is worse than no PRD; a PRD that the team references daily is the most powerful alignment tool in product management.

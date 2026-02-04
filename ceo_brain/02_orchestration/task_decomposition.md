# Task Decomposition -- Breaking Goals into Brain-Specific Work

## Overview

Task decomposition is the discipline of converting high-level business goals
into a structured graph of brain-specific, actionable tasks with explicit
dependencies, handoffs, and quality gates. It is the bridge between strategy
(what to do) and execution (how to do it).

Poor decomposition is the #1 cause of failed multi-brain coordination:
tasks are too vague, dependencies are missed, handoffs are undefined, and
the critical path is invisible.

---

## Goal Decomposition Frameworks

### Framework 1: MECE Decomposition (McKinsey)

Mutually Exclusive, Collectively Exhaustive. Every goal must decompose into
parts that do not overlap and that together cover the entire goal.

```
GOAL: Launch a mobile app
      |
      +-- Product Definition (WHAT)
      |     +-- User research
      |     +-- Feature scoping
      |     +-- PRD creation
      |
      +-- Design (HOW IT LOOKS/FEELS)
      |     +-- UI design
      |     +-- UX flows
      |     +-- Design system
      |
      +-- Engineering (HOW IT WORKS)
      |     +-- Architecture
      |     +-- Implementation
      |     +-- Testing
      |     +-- Deployment
      |
      +-- Go-to-Market (HOW PEOPLE FIND IT)
      |     +-- Marketing plan
      |     +-- Launch strategy
      |     +-- ASO
      |
      +-- Operations (HOW IT RUNS)
            +-- Support setup
            +-- Monitoring
            +-- Scaling plan
```

Test for MECE:
- **Mutually Exclusive:** Does any task appear in two branches? If yes, clarify ownership.
- **Collectively Exhaustive:** Is there any aspect of the goal NOT covered? If yes, add a branch.

### Framework 2: Work Breakdown Structure (WBS)

The WBS (PMBOK standard) decomposes scope into progressively smaller
deliverables until each leaf node is a work package assignable to one
brain.

```
Level 0: Project Goal
  Level 1: Major Deliverables
    Level 2: Sub-deliverables
      Level 3: Work Packages (assignable to a brain)
        Level 4: Tasks (individual actions)
```

Rules of WBS:
1. The 100% rule: each level must represent 100% of the parent
2. No overlap between sibling elements
3. Leaf nodes are estimatable and assignable
4. Typically 3-5 levels deep
5. Each leaf should be 8-80 hours of work (the 8/80 rule)

### Framework 3: Jobs-to-be-Done Decomposition

Decompose by the customer job, not by internal function:

```
GOAL: Help small businesses manage invoices

Job 1: Create an invoice quickly
  - Design: Invoice creation UI
  - Engineering: Invoice data model, creation API
  - Product: Template system requirements

Job 2: Track payment status
  - Design: Dashboard showing paid/unpaid
  - Engineering: Payment integration, status tracking
  - Analytics: Payment velocity metrics

Job 3: Get paid faster
  - Design: Payment reminder UX
  - Engineering: Automated reminder system
  - Product: Payment link requirements
  - Email: Payment reminder templates
```

This approach ensures decomposition serves customer value rather than
organizational structure.

---

## Dependency Mapping

### Types of Dependencies

| Type | Description | Example |
|------|------------|---------|
| Finish-to-Start (FS) | B cannot start until A finishes | Engineering cannot implement until Design completes specs |
| Start-to-Start (SS) | B cannot start until A starts | QA test planning starts when Engineering coding starts |
| Finish-to-Finish (FF) | B cannot finish until A finishes | Documentation cannot be finalized until code is frozen |
| Start-to-Finish (SF) | B cannot finish until A starts | Old system stays live until new system deployment starts |

### Dependency Identification Protocol

For each task in the decomposition:
1. What inputs does this task need? (data, specs, decisions, artifacts)
2. Where do those inputs come from? (which brain, which task)
3. What outputs does this task produce?
4. Who consumes those outputs? (which brain, which task)
5. Can this task start before its inputs are fully complete? (partial
   dependency vs. full dependency)

### Dependency Matrix

```
               Producer Brain
               ENG   DES   MBA   PROD  MKT   FIN
Consumer  ENG   -    specs  -    reqs   -     -
Brain     DES   feas  -     -    reqs   -     -
          MBA   cost  -     -    data   mkt   fin
          PROD  feas  ux    strat -     mkt   -
          MKT   feat  asset strat prod   -     budg
          FIN   cost  -     strat -     spend  -
```

Each cell indicates what the consumer brain needs from the producer brain
before it can complete its work.

---

## Critical Path Analysis

### Identifying the Critical Path

The critical path is the longest sequence of dependent tasks from start to
finish. It determines the minimum project duration.

```
Example: SaaS Product Launch

Task A: Market Research (Research Brain) -- 2 weeks
Task B: PRD (Product Brain) -- depends on A -- 2 weeks
Task C: Business Model (MBA Brain) -- depends on A -- 1 week
Task D: UI/UX Design (Design Brain) -- depends on B -- 3 weeks
Task E: Architecture (Engineering Brain) -- depends on B -- 1 week
Task F: Implementation (Engineering Brain) -- depends on D, E -- 4 weeks
Task G: Testing (QA Brain) -- depends on F -- 2 weeks
Task H: Marketing Plan (Marketing Brain) -- depends on C -- 2 weeks
Task I: Launch (CEO Brain) -- depends on G, H -- 1 week

Critical Path: A -> B -> D -> F -> G -> I = 14 weeks
                    B -> E -> F (E takes less than D, so not critical)
                    A -> C -> H (H finishes before G, so not critical)
```

### Crashing the Critical Path

To accelerate the project, focus ONLY on critical path tasks:
1. Add resources to critical path tasks (if resource-constrained)
2. Parallelize critical path work (split Design into parallel workstreams)
3. Reduce scope of critical path tasks (MVP design instead of full design)
4. Start critical path tasks earlier (partial inputs, iterative handoffs)

Non-critical path optimization is waste unless the non-critical path
becomes the new critical path.

---

## Parallel vs. Sequential Execution

### When to Parallelize

Parallelization reduces total duration but increases coordination cost.

```
Parallelize when:
- Tasks have no dependencies between them
- Different brains handle each task (no resource contention)
- The coordination cost is less than the time saved
- Partial outputs are sufficient to start dependent work

Execute sequentially when:
- Task B requires the full output of Task A
- The same brain handles both tasks (resource contention)
- Parallelization creates integration risk
- Quality gates require sequential verification
```

### Parallel Execution Patterns

**Pattern 1: Independent Parallel**
```
     +-- Task A (Brain 1) --+
     |                      |
START+-- Task B (Brain 2) --+---> Integration
     |                      |
     +-- Task C (Brain 3) --+
```

**Pattern 2: Staggered Parallel**
```
Task A (Brain 1): [========]
Task B (Brain 2):     [========]    (starts after partial A output)
Task C (Brain 3):         [========] (starts after partial B output)
```

**Pattern 3: Producer-Consumer Parallel**
```
Brain 1: [Produce chunk 1][Produce chunk 2][Produce chunk 3]
Brain 2:                   [Consume chunk 1][Consume chunk 2][Consume chunk 3]
```

---

## Handoff Specifications

### The Handoff Contract

Every transition between brains must have a defined handoff:

```
HANDOFF CONTRACT
+--------------------------------------------------+
| From: [Producer Brain]                           |
| To: [Consumer Brain]                             |
| Deliverable: [What is being handed off]          |
|                                                  |
| FORMAT:                                          |
| - File type and location                         |
| - Structure/schema of the deliverable            |
| - Required sections/fields                       |
|                                                  |
| ACCEPTANCE CRITERIA:                             |
| - [ ] Criterion 1 (measurable)                  |
| - [ ] Criterion 2 (measurable)                  |
| - [ ] Criterion 3 (measurable)                  |
|                                                  |
| QUALITY GATE:                                    |
| - Reviewer: [Who reviews]                        |
| - Review method: [How they review]               |
| - Accept/Reject criteria: [Explicit threshold]   |
|                                                  |
| TIMELINE:                                        |
| - Due date: [When]                               |
| - Review period: [How long for review]           |
| - Revision window: [Time for fixes if rejected]  |
+--------------------------------------------------+
```

### Common Handoff Failures

| Failure Mode | Root Cause | Prevention |
|-------------|-----------|-----------|
| Ambiguous deliverable | "Design specs" without definition | Explicit format requirements |
| Missing context | Producer omits assumptions | Required context section in every handoff |
| Quality mismatch | Consumer expects higher quality than delivered | Acceptance criteria agreed upfront |
| Timeline surprise | Late delivery without warning | Weekly status checks on dependencies |
| Integration gap | Deliverables do not fit together | Integration review at each handoff |

---

## Example Decompositions (10+ Scenarios)

### 1. Build an E-commerce Platform

```
Product Brain: Feature requirements, user stories [2w]
Research Brain: Competitor analysis, market sizing [2w] (parallel)
  |
Design Brain: UI/UX, component design, design system [3w]
  |
Engineering Brain: Backend API, frontend, payment integration [6w]
  |
QA Brain: Test suite, load testing, security testing [2w]
  |
Marketing Brain: Launch plan, SEO, content [2w] (parallel with QA)
Operations Brain: Fulfillment process, support setup [1w]
Analytics Brain: Dashboards, conversion funnels [1w]
  |
CEO Brain: Launch go/no-go decision
Total critical path: ~15 weeks
```

### 2. Enter Enterprise Market (Upmarket Move)

```
MBA Brain: Enterprise market analysis, ICP definition [2w]
Sales Brain: Enterprise sales process design [2w] (parallel)
  |
Product Brain: Enterprise feature gap analysis [2w]
Security Brain: SOC 2 / compliance requirements [2w] (parallel)
  |
Engineering Brain: Enterprise features, SSO, audit logs [4w]
Legal Brain: Enterprise contract templates, DPA [2w] (parallel)
  |
Pricing Brain: Enterprise pricing model [1w]
CS Brain: Enterprise onboarding playbook [1w] (parallel)
  |
CEO Brain: Enterprise launch readiness review
Total critical path: ~11 weeks
```

### 3. Pivot Product Direction

```
CEO Brain: Pivot decision framework, kill criteria [1w]
  |
Research Brain: New market validation [2w]
Analytics Brain: Current product data analysis [1w] (parallel)
  |
MBA Brain: New business model design [2w]
Product Brain: New product vision and roadmap [2w] (parallel)
  |
Design Brain: New product design [3w]
Finance Brain: Runway analysis with pivot [1w] (parallel)
  |
Engineering Brain: Implementation [4w]
Marketing Brain: Repositioning plan [2w] (parallel)
  |
CEO Brain: Pivot execution review
Total critical path: ~14 weeks
```

### 4. Scale from 10 to 100 Employees

```
HR Brain: Hiring plan, job architecture, comp bands [3w]
Operations Brain: Process documentation, playbooks [3w] (parallel)
  |
Legal Brain: Employment agreements, policies [2w]
Finance Brain: Headcount budget, burn modeling [2w] (parallel)
  |
HR Brain: Interview processes, onboarding program [2w]
Engineering Brain: Dev tooling for larger team [2w] (parallel)
  |
CEO Brain: Culture documentation and reinforcement
Total critical path: ~9 weeks
```

### 5. Launch a Referral Program

```
Growth Brain: Referral program design, incentive structure [2w]
  |
Product Brain: Feature requirements [1w]
Design Brain: Referral UI/UX [2w]
  |
Engineering Brain: Implementation [3w]
Legal Brain: Referral program terms [1w] (parallel)
  |
Marketing Brain: Launch campaign [1w]
Analytics Brain: Tracking and attribution [1w] (parallel)
  |
CEO Brain: Program launch approval
Total critical path: ~9 weeks
```

### 6. Build Internal Data Platform

```
Data Brain: Data architecture, warehouse design [3w]
  |
Cloud Brain: Infrastructure setup [2w]
Security Brain: Data security requirements [1w] (parallel)
  |
Engineering Brain: Pipeline implementation [4w]
  |
Analytics Brain: Dashboard and reporting layer [2w]
  |
Operations Brain: Data governance processes [1w]
Total critical path: ~12 weeks
```

### 7. Respond to Competitive Threat

```
CEO Brain: Threat assessment, wartime/peacetime decision [2d]
  |
Research Brain: Competitive deep-dive [1w]
MBA Brain: Strategic response options [1w] (parallel)
  |
CEO Brain: Response strategy selection [2d]
  |
Product Brain: Feature acceleration plan [1w]
Marketing Brain: Competitive positioning [1w] (parallel)
Sales Brain: Competitive battle cards [1w] (parallel)
  |
Engineering Brain: Accelerated execution [2-4w]
Total critical path: ~5-7 weeks
```

### 8. IPO Preparation

```
Finance Brain: Audit readiness, S-1 financials [8w]
Legal Brain: SEC compliance, governance setup [8w] (parallel)
  |
Investor Brain: Roadshow preparation, investor targeting [4w]
  |
Marketing Brain: Public company branding [2w]
HR Brain: Public company policies, equity programs [2w] (parallel)
  |
CEO Brain: IPO readiness review and go/no-go
Total critical path: ~14 weeks (after years of preparation)
```

### 9. Product Internationalization

```
Localization Brain: Target market assessment, i18n requirements [2w]
Legal Brain: International compliance, data residency [2w] (parallel)
  |
Engineering Brain: i18n infrastructure [3w]
  |
Content Brain: Translation and adaptation [2w]
Design Brain: RTL/cultural design adaptation [2w] (parallel)
  |
Marketing Brain: Local market launch plan [2w]
Partnership Brain: Local distribution partners [2w] (parallel)
  |
Operations Brain: Local operations setup [1w]
Total critical path: ~12 weeks
```

### 10. Build Developer Ecosystem

```
DevRel Brain: Developer strategy, DX audit [2w]
  |
Engineering Brain: API design, SDK development [4w]
  |
Content Brain: API documentation, tutorials [3w]
  |
Community Brain: Developer community setup [2w]
Marketing Brain: Developer marketing plan [2w] (parallel)
  |
Partnership Brain: Integration partnerships [2w]
Total critical path: ~13 weeks
```

---

## Decomposition Quality Checklist

Before executing any decomposition:

- [ ] Every task is assignable to exactly one brain
- [ ] Dependencies are explicit and typed (FS/SS/FF/SF)
- [ ] Critical path is identified and optimized
- [ ] Handoff contracts exist for every brain-to-brain transition
- [ ] Parallel tasks are identified to minimize duration
- [ ] Quality gates are defined at each major handoff
- [ ] Kill criteria are defined for the overall goal
- [ ] Resource contention is identified and resolved
- [ ] The decomposition is MECE (no gaps, no overlaps)
- [ ] Each task has estimated duration and owner

---

**Task decomposition transforms ambiguous goals into executable plans. Without
it, multi-brain coordination is theater. With it, the brain system operates
as a coherent organization.**

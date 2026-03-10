# Project Methodology -- Waterfall, Agile, Hybrid, and Beyond

## Overview

Project methodology is the structured approach used to plan, execute,
monitor, and close projects. The choice of methodology is not ideological
-- it is a strategic decision based on the project's characteristics:
certainty of requirements, rate of change, team maturity, and stakeholder
expectations.

This module covers the major project methodologies (Waterfall/PMBOK,
Agile/Scrum/Kanban, and Hybrid), plus the universal project management
tools (Critical Path, WBS, Gantt, Resource Leveling, Risk Register) that
apply regardless of methodology.

---

## Waterfall (PMBOK)

### The PMBOK Framework

The Project Management Body of Knowledge (PMI) defines five process groups
and ten knowledge areas that form the foundation of traditional project
management.

```
FIVE PROCESS GROUPS (Sequential):
1. INITIATING    --> Define the project, get authorization
2. PLANNING      --> Define scope, schedule, budget, risks
3. EXECUTING     --> Do the work, manage the team
4. MONITORING    --> Track progress, manage changes
5. CLOSING       --> Formalize acceptance, archive lessons
```

### When Waterfall Works

Waterfall is appropriate when:
- Requirements are well-understood and stable
- Regulatory or compliance requirements mandate sequential phases
- Dependencies are rigid (Phase B cannot start until Phase A is complete)
- Stakeholders expect a fixed scope, schedule, and budget
- The project has been done before (low uncertainty)

Examples: Construction, regulatory compliance projects, hardware
manufacturing, fixed-bid contracts.

### When Waterfall Fails

- Requirements are uncertain or evolving
- Customer feedback is needed during development
- Technology is new or unproven
- The team is learning as they go
- Speed of delivery matters more than plan adherence

### Waterfall Project Lifecycle

```
Phase 1: INITIATION
+--------------------------------------------------+
| - Project charter                                |
| - Stakeholder identification                     |
| - Business case and ROI                          |
| - Project manager assignment                     |
| - Kick-off meeting                               |
| GATE: Charter approved, funding authorized       |
+--------------------------------------------------+

Phase 2: PLANNING
+--------------------------------------------------+
| - Requirements gathering (complete)              |
| - Work Breakdown Structure (WBS)                 |
| - Schedule (Critical Path, Gantt)                |
| - Budget estimate                                |
| - Resource plan                                  |
| - Risk register                                  |
| - Communication plan                             |
| - Quality plan                                   |
| GATE: Plan approved by sponsor                   |
+--------------------------------------------------+

Phase 3: EXECUTION
+--------------------------------------------------+
| - Work performed per plan                        |
| - Team managed and directed                      |
| - Deliverables produced                          |
| - Status reports generated                       |
| GATE: Deliverables complete                      |
+--------------------------------------------------+

Phase 4: MONITORING AND CONTROLLING
+--------------------------------------------------+
| - Earned Value Analysis (EVM)                    |
| - Change control (scope, schedule, budget)       |
| - Risk monitoring                                |
| - Quality assurance                              |
| GATE: Performance within tolerance               |
+--------------------------------------------------+

Phase 5: CLOSING
+--------------------------------------------------+
| - Formal acceptance from stakeholder             |
| - Lessons learned documentation                  |
| - Archive project documents                      |
| - Release resources                              |
| - Celebrate                                      |
| GATE: Project formally closed                    |
+--------------------------------------------------+
```

---

## Agile: Scrum

### The Scrum Framework

Scrum (Schwaber & Sutherland, 2020) is an iterative, incremental framework
for managing complex work.

```
SCRUM EVENTS:
                Product
                Backlog
                   |
                   v
Sprint    [Sprint Planning] --> [Daily Scrum x N] --> [Sprint Review]
(2-4 wk)        |                                         |
                 v                                         v
            Sprint Backlog                          Increment
                                                         |
                                                         v
                                               [Sprint Retrospective]
```

### Scrum Roles

| Role | Responsibility |
|------|---------------|
| Product Owner | Defines what to build, prioritizes backlog, accepts work |
| Scrum Master | Facilitates events, removes impediments, coaches team |
| Development Team | Self-organizing, cross-functional, delivers increment |

### Scrum Events

| Event | Duration | Purpose |
|-------|----------|---------|
| Sprint Planning | 4 hours (2-week sprint) | Select and plan sprint work |
| Daily Scrum | 15 minutes | Synchronize, identify impediments |
| Sprint Review | 2 hours | Demo increment, get feedback |
| Sprint Retrospective | 1.5 hours | Inspect and adapt the process |

### Scrum Artifacts

| Artifact | Description |
|----------|------------|
| Product Backlog | Ordered list of everything needed in the product |
| Sprint Backlog | Items selected for the sprint + plan to deliver |
| Increment | Sum of all completed backlog items (potentially shippable) |

### Sprint Velocity

Velocity is the average number of story points completed per sprint.
Use it for:
- **Forecasting:** How many sprints to complete the backlog
- **Capacity planning:** How much work to pull into the next sprint
- **Trend analysis:** Is the team getting faster or slower?

Do NOT use velocity for:
- Comparing teams (different teams, different scales)
- Performance evaluation (incentivizes gaming)
- Absolute measurement (it is relative)

---

## Agile: Kanban

### The Kanban Method

Kanban (David Anderson, 2010) is a flow-based method that visualizes
work, limits work in progress, and optimizes flow.

```
KANBAN BOARD:
+-----------+----------+----------+----------+---------+
| BACKLOG   | READY    | IN PROG  | REVIEW   | DONE    |
| (unlimited)| (WIP: 5)| (WIP: 3) | (WIP: 2) |         |
+-----------+----------+----------+----------+---------+
| [Card A]  | [Card D] | [Card F] | [Card H] | [Card J]|
| [Card B]  | [Card E] | [Card G] |          | [Card K]|
| [Card C]  |          |          |          |         |
+-----------+----------+----------+----------+---------+
```

### Kanban Principles

1. **Visualize work:** Make all work visible on a board
2. **Limit WIP:** Set maximum items per stage
3. **Manage flow:** Optimize for smooth, fast flow
4. **Make policies explicit:** Rules are visible and agreed
5. **Implement feedback loops:** Regular reviews and retrospectives
6. **Improve collaboratively:** Evolutionary change, not revolution

### WIP Limits

WIP (Work in Progress) limits are the core mechanism of Kanban:

```
Little's Law: Lead Time = WIP / Throughput

To reduce lead time, either:
1. Reduce WIP (fewer things in progress)  <-- Easier
2. Increase throughput (work faster)       <-- Harder

Example:
WIP = 10 items, Throughput = 2 items/day
Lead Time = 10 / 2 = 5 days

Reduce WIP to 6:
Lead Time = 6 / 2 = 3 days (40% improvement, no extra effort!)
```

---

## Hybrid Methodology

### When to Use Hybrid

Most real-world projects benefit from combining elements of Waterfall
and Agile:

```
HYBRID MODEL:
+---------+---------+---------+---------+---------+
| INITIATE| PLAN    | BUILD   | TEST    | CLOSE   |
|(Waterfall|(Waterfall|(Agile   |(Agile   |(Waterfall|
| gates)  | scope)  | sprints)| sprints)| formal) |
+---------+---------+---------+---------+---------+
```

Hybrid approach:
- **Waterfall for governance:** Project charter, formal gates, closure
- **Agile for execution:** Iterative development, sprint reviews, retros
- **Best of both:** Structure where needed, flexibility where needed

---

## Critical Path Method (CPM)

### How It Works

The critical path is the longest sequence of dependent tasks. It
determines the minimum project duration.

```
TASK NETWORK:
       A(3)
      /    \
Start       C(4) --- D(2) --- End
      \    /
       B(5)

Path 1: A --> C --> D = 3 + 4 + 2 = 9 days
Path 2: B --> C --> D = 5 + 4 + 2 = 11 days  <-- CRITICAL PATH

Project duration: 11 days (determined by longest path)
Float on Path 1: 11 - 9 = 2 days (A can slip 2 days without
                                    affecting project end date)
```

### Using Critical Path

1. **Focus resources on critical path tasks** -- delays here delay the project
2. **Use float wisely** -- non-critical tasks have flexibility; use it
3. **Crash critical tasks if needed** -- add resources to critical tasks
   to shorten the project
4. **Monitor critical path daily** -- any change can shift the critical path

---

## Work Breakdown Structure (WBS)

```
WBS EXAMPLE: Mobile App Launch
1.0 Mobile App Launch
  1.1 Product Definition
    1.1.1 Requirements
    1.1.2 User stories
    1.1.3 Acceptance criteria
  1.2 Design
    1.2.1 UI design
    1.2.2 UX flows
    1.2.3 Design review
  1.3 Development
    1.3.1 Backend API
    1.3.2 iOS app
    1.3.3 Android app
    1.3.4 Integration testing
  1.4 Quality Assurance
    1.4.1 Test plan
    1.4.2 Testing
    1.4.3 Bug fixing
  1.5 Launch
    1.5.1 App store submission
    1.5.2 Marketing launch
    1.5.3 Support readiness
```

WBS Rules:
- 100% rule: each level = 100% of parent scope
- 8/80 rule: leaf tasks are 8-80 hours
- Deliverable-oriented (outputs, not activities)

---

## Gantt Charts

```
GANTT CHART:
Task           | Wk1 | Wk2 | Wk3 | Wk4 | Wk5 | Wk6 |
Requirements   | === |     |     |     |     |     |
UI Design      |     | === | === |     |     |     |
Backend API    |     |     | === | === |     |     |
iOS App        |     |     | === | === | === |     |
Testing        |     |     |     |     | === | === |
Launch         |     |     |     |     |     | === |
```

---

## Resource Leveling

When resources are over-allocated:
1. Identify over-allocation (person assigned to 150%+ capacity)
2. Prioritize tasks (critical path first)
3. Delay non-critical tasks (use float)
4. Split tasks (part now, part later)
5. Add resources (last resort -- adds coordination cost)

---

## Risk Register

```
RISK REGISTER
+------+----------+------+------+----------+----------+--------+
| ID   | Risk     | Prob | Impact| Score   | Mitigation| Owner  |
+------+----------+------+------+----------+----------+--------+
| R001 | Key dev  | Med  | High | 6       | Cross-    | PM     |
|      | leaves   |      |      | (2x3)   | train now |        |
| R002 | API      | High | Med  | 6       | Mock API  | Eng    |
|      | delayed  |      |      | (3x2)   | for dev   | Lead   |
| R003 | Scope    | High | High | 9       | Scope     | PO     |
|      | creep    |      |      | (3x3)   | freeze    |        |
+------+----------+------+------+----------+----------+--------+

Score = Probability (1-3) x Impact (1-3)
1-2: Accept (monitor)
3-4: Mitigate (active plan)
6-9: Escalate (immediate action)
```

---

## Methodology Selection Framework

```
                    HIGH CERTAINTY
                         |
    WATERFALL            |         HYBRID
    (Predictive)         |         (Adaptive Planning,
                         |          Predictive Governance)
                         |
LOW CHANGE ------------- + ------------- HIGH CHANGE
RATE                     |                RATE
                         |
    HYBRID               |         AGILE
    (Predictive Planning,|         (Fully Adaptive)
     Adaptive Execution) |
                         |
                    LOW CERTAINTY
```

| Factor | Waterfall | Agile | Hybrid |
|--------|-----------|-------|--------|
| Requirements | Stable, known | Evolving, discovered | Mix |
| Change rate | Low | High | Medium |
| Delivery | Big bang | Incremental | Phased incremental |
| Feedback | End of project | Every sprint | At milestones |
| Documentation | Heavy | Light | Appropriate |
| Team size | Large | Small (5-9) | Any |
| Governance | Formal | Lightweight | Formal gates, agile execution |

---

**The Operations Brain selects the right methodology for each project
based on its characteristics, not ideology. Waterfall for certainty,
Agile for discovery, Hybrid for reality. The universal tools -- CPM,
WBS, Gantt, risk register -- apply regardless of methodology.**

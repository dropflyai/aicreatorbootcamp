# Agile Operations -- Scaling Agile and Operational Agility

## Overview

Agile operations extends agile principles beyond software development
into the broader operational context. As organizations scale, they face
the challenge of maintaining agility while adding the coordination
necessary for larger teams, multiple products, and complex dependencies.

This module covers scaled agile frameworks (SAFe, LeSS, Spotify Model),
operational sprint planning, retrospectives at scale, velocity management,
Kanban WIP limits for operations, and the DevOps mindset applied to
operational processes.

---

## Scaled Agile Frameworks

### SAFe (Scaled Agile Framework)

SAFe (Dean Leffingwell) is the most widely adopted framework for scaling
agile to large organizations.

```
SAFe LAYERS:
+--------------------------------------------------+
| PORTFOLIO LEVEL                                  |
| Strategic themes, lean portfolio management,     |
| investment funding, value streams                |
+--------------------------------------------------+
| LARGE SOLUTION LEVEL (if needed)                 |
| Solution train, system architecture,             |
| solution management                              |
+--------------------------------------------------+
| PROGRAM LEVEL (Agile Release Train)              |
| Program Increment (PI) planning, system demos,   |
| inspect & adapt, 8-12 week cadence              |
+--------------------------------------------------+
| TEAM LEVEL                                       |
| Scrum teams, Kanban teams, 2-week sprints,      |
| daily standups, retrospectives                   |
+--------------------------------------------------+
```

Key SAFe Concepts:

**Agile Release Train (ART):** A long-lived team of agile teams (50-125
people) that plans, commits, and executes together. The ART is the
primary value delivery mechanism in SAFe.

**Program Increment (PI):** A time-boxed planning interval (typically
8-12 weeks, containing 5 sprints) during which the ART delivers
incremental value. PI Planning is the heartbeat of the ART.

**PI Planning Event (2 days):**
```
DAY 1:
  - Business context (leadership presents strategy)
  - Product vision (product management presents roadmap)
  - Team breakouts (teams plan their sprints)
  - Draft plan review (teams present, identify risks)

DAY 2:
  - Planning adjustments (resolve dependencies, risks)
  - Final plans (teams commit)
  - Confidence vote (fist of five: 1=no confidence, 5=high)
  - If average <3, re-plan
```

### LeSS (Large-Scale Scrum)

LeSS (Craig Larman & Bas Vodde) takes the opposite approach from SAFe:
minimal additional structure beyond standard Scrum.

```
LeSS PRINCIPLES:
1. More with LeSS -- large-scale Scrum IS Scrum
2. One Product Backlog, one Product Owner
3. Multiple teams working from the same backlog
4. Joint Sprint Planning, joint Sprint Review
5. Overall Retrospective across teams
```

LeSS for 2-8 teams:
- One Product Owner
- One Product Backlog
- One Definition of Done
- One Sprint for all teams
- One Sprint Review (joint)
- One Overall Retrospective

LeSS Huge for 8+ teams:
- Requirement Areas (sub-areas of the product)
- Area Product Owners
- Still one overall Product Backlog

### Spotify Model

The Spotify Model (Henrik Kniberg, 2012) organizes around autonomous
squads with cross-cutting coordination.

```
SPOTIFY STRUCTURE:
+--------------------------------------------------+
| TRIBE (collection of squads in same area)        |
|                                                  |
| +--------+ +--------+ +--------+ +--------+     |
| | SQUAD  | | SQUAD  | | SQUAD  | | SQUAD  |     |
| | (team) | | (team) | | (team) | | (team) |     |
| +---+----+ +---+----+ +---+----+ +---+----+     |
|     |          |          |          |           |
+--------------------------------------------------+
      |          |          |          |
  CHAPTER     CHAPTER    CHAPTER    CHAPTER
  (same       (same      (same      (same
   role        role       role       role
   across      across     across     across
   squads)     squads)    squads)    squads)

GUILD: Cross-tribe community of interest (optional, self-selecting)
```

Key concepts:
- **Squad:** Small, autonomous team (like a mini-startup). Owns a feature area.
- **Tribe:** Collection of squads working in a related area (max ~100 people).
- **Chapter:** People with the same role across squads (e.g., all backend engineers).
  Chapter Lead is their people manager.
- **Guild:** Cross-cutting community of interest (e.g., web technology guild).
  Voluntary, knowledge-sharing.

### Framework Selection

| Framework | Best For | Avoid When |
|-----------|---------|-----------|
| SAFe | Large orgs (500+), complex dependencies, regulatory | Small orgs, simple products |
| LeSS | Product companies (2-8 teams), strong Scrum foundation | Non-Scrum organizations, complex portfolios |
| Spotify | Tech companies, autonomous teams, strong culture | Weak engineering culture, heavy dependencies |

---

## Sprint Planning for Operations

### Operational Sprint Design

Operations work can be managed in sprints, adapted for operational
characteristics:

```
OPERATIONAL SPRINT (2 weeks)
+--------------------------------------------------+
| SPRINT PLANNING (2 hours)                        |
|   - Review operational metrics                   |
|   - Prioritize improvement backlog               |
|   - Plan operational changes for this sprint     |
|   - Identify dependencies and risks              |
+--------------------------------------------------+
| DAILY STANDUP (15 min)                           |
|   - Yesterday: What was completed                |
|   - Today: What will be done                     |
|   - Blockers: What is in the way                 |
+--------------------------------------------------+
| SPRINT EXECUTION (2 weeks)                       |
|   - Implement process improvements               |
|   - Monitor operational metrics                  |
|   - Handle operational incidents                 |
|   - Document changes                             |
+--------------------------------------------------+
| SPRINT REVIEW (1 hour)                           |
|   - Demo improvements made                       |
|   - Review operational metrics (before/after)    |
|   - Stakeholder feedback                         |
+--------------------------------------------------+
| SPRINT RETROSPECTIVE (1 hour)                    |
|   - What went well                               |
|   - What did not go well                        |
|   - What to change next sprint                   |
+--------------------------------------------------+
```

### Operational Backlog Management

```
OPERATIONAL BACKLOG CATEGORIES:
+--------------------------------------------------+
| IMPROVEMENT (40% of sprint capacity):            |
|   Process improvements, automation, tooling      |
|                                                  |
| MAINTENANCE (30% of sprint capacity):            |
|   Keeping existing processes running smoothly    |
|                                                  |
| PROJECTS (20% of sprint capacity):               |
|   Operational projects with defined end dates    |
|                                                  |
| BUFFER (10% of sprint capacity):                 |
|   Unplanned work, incidents, urgent requests     |
+--------------------------------------------------+
```

---

## Retrospectives at Scale

### Team Retrospective (Single Team)

```
FORMAT: 60 minutes, every sprint end
FACILITATOR: Scrum Master or rotating team member

STRUCTURE:
1. Set the stage (5 min)
   - Prime directive: "Regardless of what we discover, we understand
     and believe that everyone did the best job they could."
2. Gather data (15 min)
   - What went well? (green stickies)
   - What did not go well? (red stickies)
   - Ideas for improvement (blue stickies)
3. Generate insights (15 min)
   - Group similar items
   - Identify root causes (5 Whys)
   - Discuss patterns
4. Decide what to do (15 min)
   - Vote on top 2-3 improvements
   - Assign owners and deadlines
5. Close (10 min)
   - Summarize commitments
   - Appreciation round
```

### Cross-Team Retrospective

```
FORMAT: 90 minutes, monthly or end of PI
PARTICIPANTS: Representatives from each team + leadership

STRUCTURE:
1. Team reports (5 min per team)
   - Top win
   - Top challenge
   - Top improvement made
2. Cross-team patterns (20 min)
   - What patterns do we see across teams?
   - What systemic issues affect multiple teams?
3. Systemic improvements (30 min)
   - What organizational changes would help?
   - What process changes are needed?
4. Action items (15 min)
   - Each improvement gets an owner
   - Tracked and reviewed next session
```

---

## Velocity and Flow Metrics

### Velocity (Scrum)

```
VELOCITY CHART:
Sprint | Committed | Completed | Velocity
  1    |    25     |    20     |    20
  2    |    22     |    22     |    22
  3    |    24     |    18     |    18
  4    |    20     |    21     |    21
  5    |    22     |    20     |    20
                    Average Velocity: 20.2

USE FOR:
- Sprint capacity planning (commit to ~20 points)
- Release forecasting (backlog / velocity = sprints needed)
- Trend analysis (is velocity stable? improving? declining?)
```

### Flow Metrics (Kanban)

| Metric | Definition | Target |
|--------|-----------|--------|
| Lead Time | Time from request to delivery | Decreasing |
| Cycle Time | Time from work started to delivered | Decreasing |
| Throughput | Items completed per time period | Stable or increasing |
| WIP | Items currently in progress | Within WIP limits |
| Flow Efficiency | Active time / Lead time | Increasing (target: >25%) |

### Cumulative Flow Diagram (CFD)

```
Items
  ^
  |     Done  /
  |          / In Review
  |         / In Progress
  |        / Ready
  |       / Backlog
  |      /
  |     /
  |    /
  |   /
  +--------------------------> Time

Healthy CFD: Bands are relatively parallel (steady flow)
Unhealthy: Bands widen (WIP growing, flow slowing)
```

---

## Kanban WIP Limits for Operations

### Setting WIP Limits

```
STARTING POINT: WIP limit = Number of people on the team - 1

Adjust based on:
- Too much multitasking -> Lower WIP limit
- People are idle -> Raise WIP limit slightly
- Lead time is too long -> Lower WIP limit
- Quality issues -> Lower WIP limit (less rushing)
```

### Operational Kanban Board Design

```
OPERATIONS KANBAN
+---------+---------+---------+---------+---------+---------+
| INTAKE  | ANALYZE | PLAN    | EXECUTE | VERIFY  | DONE    |
| (no WIP)| WIP: 3  | WIP: 3  | WIP: 5  | WIP: 2  |         |
+---------+---------+---------+---------+---------+---------+
| Ticket  | Ticket  | Ticket  | Ticket  | Ticket  | Ticket  |
| Ticket  |         | Ticket  | Ticket  |         | Ticket  |
| Ticket  |         |         | Ticket  |         |         |
+---------+---------+---------+---------+---------+---------+

POLICIES:
- Nothing enters EXECUTE without a plan
- VERIFY requires independent confirmation
- If a column hits WIP limit, help clear it before starting new work
- Blocked items are flagged and addressed in daily standup
```

---

## DevOps for Operations

### The DevOps Mindset Applied to Ops

DevOps principles extend beyond software to all operational processes:

```
DEVOPS PRINCIPLES FOR OPERATIONS:
1. AUTOMATE EVERYTHING
   Manual processes are error-prone and unscalable.
   Automate repetitive tasks. Measure what remains manual.

2. MEASURE EVERYTHING
   If you cannot measure it, you cannot improve it.
   Instrument every process with metrics.

3. FAIL FAST, LEARN FAST
   Small changes, quick feedback, rapid iteration.
   The cost of a small failure is low; the learning is high.

4. CONTINUOUS IMPROVEMENT
   Never stop improving. Every process can be better.
   Improvement is a daily practice, not a project.

5. SHARED RESPONSIBILITY
   Operations is not a separate team; it is everyone's job.
   Break down silos between teams.

6. INFRASTRUCTURE AS CODE
   Processes should be documented and version-controlled,
   just like code. Changes are reviewed and tracked.
```

### Operational Automation Hierarchy

```
LEVEL 1: MANUAL (fully human)
  Every step performed by a person.
  Document first, automate later.

LEVEL 2: ASSISTED (human with tools)
  Tools help but human makes decisions.
  Checklists, templates, calculators.

LEVEL 3: SEMI-AUTOMATED (human triggers, machine executes)
  Human initiates, system completes.
  Workflow engines, scripts with manual trigger.

LEVEL 4: AUTOMATED (machine with human oversight)
  System runs autonomously; human monitors.
  Scheduled jobs, CI/CD pipelines, alert systems.

LEVEL 5: AUTONOMOUS (fully automated)
  System runs, self-monitors, self-heals.
  Auto-scaling, self-service, ML-driven optimization.
```

---

## Agile Operations Anti-Patterns

| Anti-Pattern | Description | Fix |
|-------------|------------|-----|
| Cargo cult agile | Using agile ceremonies without understanding | Train the team on principles, not just practices |
| Fake retrospectives | Retros happen but nothing changes | Track action items, review next retro |
| WIP unlimited | No WIP limits, everything is "in progress" | Implement and enforce WIP limits |
| Velocity gaming | Teams inflate story points to look productive | Focus on outcomes, not velocity |
| No definition of done | "Done" means different things to different people | Write explicit DoD, enforce it |
| Agile only for dev | Development is agile; everything else is waterfall | Apply agile principles to all operational work |

---

**Agile operations brings the principles of iterative improvement,
transparency, and flow to all operational work. The Operations Brain
selects the appropriate scaling framework, manages work with Kanban or
Scrum, and applies DevOps thinking to eliminate waste and accelerate
delivery across all processes.**

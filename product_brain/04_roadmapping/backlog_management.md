# Backlog Management

## What This Enables

A disciplined system for managing the product backlog — the living inventory of work that connects strategic outcomes to executable delivery. Without rigorous backlog management, teams either drown in a graveyard of thousands of stale tickets or operate from a bare-minimum list that lacks the context engineers need to build the right thing. The well-managed backlog is the interface between discovery and delivery.

---

## The Core Insight

The backlog is not a dumping ground for ideas. It is a curated, prioritized inventory of validated work items, each traceable to a customer outcome and business goal. Jeff Patton (User Story Mapping, 2014) argues that "a flat backlog is a terrible way to understand what you are building." The backlog must have structure — hierarchy (epics, stories, tasks), context (user story maps), and hygiene (regular grooming, archiving, and pruning).

The most important property of a healthy backlog: every item in it could be justified to the team and to stakeholders with a clear answer to "why are we building this?"

---

## User Story Mapping

### Origin and Purpose

Developed by Jeff Patton (User Story Mapping, 2014). Story mapping is a technique for organizing user stories into a two-dimensional map that reveals the user's journey, creates shared understanding, and enables release planning.

### Structure

```
BACKBONE (user activities — left to right)
──────────────────────────────────────────────────────────────
│ Activity 1      │ Activity 2      │ Activity 3       │
│ (e.g., Discover)│ (e.g., Evaluate)│ (e.g., Purchase) │
──────────────────────────────────────────────────────────────

WALKING SKELETON (minimum viable steps — top row under each activity)
──────────────────────────────────────────────────────────────
│ Search products  │ View details    │ Add to cart       │
│ Browse categories│ Compare options │ Checkout          │
│ See trending     │ Read reviews    │ Confirm order     │
──────────────────────────────────────────────────────────────

DETAILS (additional stories — lower priority as you go down)
──────────────────────────────────────────────────────────────
│ Filter by price  │ Zoom images     │ Apply coupon      │
│ Save search      │ 360 view        │ Split payment     │
│ Voice search     │ AR preview      │ Gift wrap         │
│ ...              │ ...             │ ...               │
──────────────────────────────────────────────────────────────

RELEASE SLICES (horizontal cuts across the map)
═══════════════════════════════════════════════════════════════
Release 1 (MVP): Top row — the walking skeleton
═══════════════════════════════════════════════════════════════
Release 2: MVP + second row of details
═══════════════════════════════════════════════════════════════
Release 3: Previous + third row
═══════════════════════════════════════════════════════════════
```

### How to Build a Story Map

```
Step 1: Frame the Narrative
- Who is the user? (Persona)
- What is their goal? (Job to be done)
- What is the context? (When, where, why)

Step 2: Map the Backbone
- Identify the major activities (left to right, in sequential order)
- These are high-level steps in the user's journey
- Typically 5-15 activities

Step 3: Map the User Tasks
- Under each activity, list the tasks the user performs
- Order vertically by priority (most essential at top)
- These become your user stories

Step 4: Identify the Walking Skeleton
- Draw a horizontal line that captures the minimum viable path
- The user can complete their goal with just these stories
- This is your MVP or Release 1

Step 5: Slice Releases
- Draw additional horizontal lines for subsequent releases
- Each slice adds capability while maintaining a shippable product
```

### Story Mapping Benefits

| Benefit | How |
|---------|-----|
| Shared understanding | Team sees the whole user journey, not isolated tickets |
| Release planning | Horizontal slices create natural MVP and release boundaries |
| Gap identification | Missing stories become visible in the map structure |
| Prioritization context | Stories are prioritized within their activity context, not in isolation |
| Onboarding tool | New team members grasp the product scope quickly |

---

## The INVEST Criteria for User Stories

### Origin

Coined by Bill Wake (2003), INVEST defines six qualities of a well-formed user story:

| Criterion | Definition | Test | Example of Violation |
|-----------|-----------|------|---------------------|
| **I — Independent** | Story can be developed, tested, and delivered without depending on other stories | Can we build this story in any order? | "Part 2 of checkout flow" (depends on Part 1) |
| **N — Negotiable** | Story is a conversation starter, not a specification | Can the team discuss how to implement it? | "Build exactly this Figma mockup pixel-perfect" |
| **V — Valuable** | Story delivers value to a user or business stakeholder | Would a customer or stakeholder care? | "Refactor the database schema" (technical task, not user value) |
| **E — Estimable** | Team can estimate the effort with reasonable confidence | Can the team size this in story points? | "Improve the user experience" (too vague to estimate) |
| **S — Small** | Story can be completed within a single sprint | Does it fit in one iteration? | "Build the entire onboarding experience" (epic, not story) |
| **T — Testable** | Story has clear acceptance criteria that can be verified | Can QA confirm this is done? | "Users find the interface intuitive" (not objectively testable) |

### Common INVEST Violations and Fixes

| Violation | Problem | Fix |
|-----------|---------|-----|
| Dependent stories | Cannot deliver independently | Restructure to vertical slices (UI + API + DB for one feature) |
| Over-specified stories | No room for team problem-solving | Rewrite as outcome + acceptance criteria, not solution specification |
| Technical stories without user value | "As a developer, I want to refactor..." | Reframe: "Reduce page load time from 8s to 2s" (user-facing value) |
| Stories too large | Cannot complete in one sprint | Decompose using splitting patterns (see below) |
| Untestable stories | "Improve performance" | Add specific, measurable criteria: "Page loads in < 2 seconds on 3G" |

---

## Acceptance Criteria: Given/When/Then

### Structure

Acceptance criteria define the conditions that must be met for a story to be considered complete. The Given/When/Then format (from Behavior-Driven Development, Dan North, 2006) provides a precise, testable specification:

```
Given [precondition — the starting state]
When [action — what the user does]
Then [expected outcome — what should happen]
```

### Examples

**Story:** As a new user, I want to set up my account so I can start using the product.

```
Acceptance Criteria:

Scenario 1: Successful account creation
Given I am on the registration page
And I have entered a valid email and password (8+ characters, 1 uppercase, 1 number)
When I click "Create Account"
Then my account is created
And I receive a confirmation email within 60 seconds
And I am redirected to the onboarding wizard

Scenario 2: Duplicate email
Given I am on the registration page
And I enter an email that is already registered
When I click "Create Account"
Then I see an error message: "An account with this email already exists"
And I am offered a "Sign In" link

Scenario 3: Invalid password
Given I am on the registration page
And I enter a password that does not meet requirements
When I click "Create Account"
Then I see specific validation errors for each unmet requirement
And my email field retains its value
```

### Acceptance Criteria Best Practices

| Practice | Rationale |
|----------|-----------|
| Write criteria BEFORE development | Ensures shared understanding of "done" |
| Include happy path AND edge cases | Prevents "works on the happy path" syndrome |
| Be specific about data and state | "Valid email" is ambiguous; specify format rules |
| Include performance criteria when relevant | "Page loads in < 2s" is a valid acceptance criterion |
| Include accessibility criteria | "Form is keyboard-navigable" should be standard |
| Keep to 3-8 scenarios per story | More than 8 suggests the story is too large |

---

## Epic Decomposition

### What is an Epic?

An epic is a large body of work that can be broken down into multiple user stories. Epics typically span multiple sprints and represent a significant capability or feature area.

### Decomposition Patterns

**Pattern 1: Workflow Steps**
Break the epic into steps in the user's workflow.

```
Epic: User Onboarding
├── Story: Account creation
├── Story: Email verification
├── Story: Profile setup
├── Story: Team invitation
├── Story: First project creation
└── Story: Guided tutorial completion
```

**Pattern 2: Business Rules**
Each rule or variation becomes a story.

```
Epic: Pricing and Billing
├── Story: Monthly subscription purchase
├── Story: Annual subscription purchase (with discount)
├── Story: Proration for mid-cycle plan change
├── Story: Usage-based billing calculation
├── Story: Invoice generation and delivery
└── Story: Failed payment retry and dunning
```

**Pattern 3: Data Variations**
Each data type or input source becomes a story.

```
Epic: Data Import
├── Story: Import from CSV file
├── Story: Import from Excel file
├── Story: Import from Google Sheets (API)
├── Story: Import from Salesforce (API)
├── Story: Import validation and error handling
└── Story: Import history and rollback
```

**Pattern 4: User Roles**
Each role's perspective becomes a story.

```
Epic: Team Permissions
├── Story: Admin can manage team members
├── Story: Admin can assign roles
├── Story: Member can view team roster
├── Story: Guest can access shared items only
└── Story: Owner can transfer ownership
```

**Pattern 5: CRUD Operations**
Create, Read, Update, Delete as separate stories.

```
Epic: Project Management
├── Story: Create a new project
├── Story: View project dashboard
├── Story: Edit project settings
├── Story: Archive a project
├── Story: Delete a project (with confirmation)
└── Story: Duplicate a project
```

**Pattern 6: Performance / Quality Levels**
Start simple, then add sophistication.

```
Epic: Search
├── Story: Basic keyword search
├── Story: Search with filters (date, type, status)
├── Story: Search results pagination
├── Story: Search suggestions and autocomplete
├── Story: Fuzzy matching and typo tolerance
└── Story: Search analytics and popular queries
```

### Decomposition Quality Test

After decomposition, verify each story against INVEST:
- Can each story be delivered independently?
- Does each story deliver user value?
- Can each story be completed in one sprint?
- Does each story have testable acceptance criteria?

If any answer is "no," decompose further or restructure.

---

## Backlog Hierarchy

### The Four-Level Structure

```
Level 1: THEME (strategic outcome)
    "Improve new user activation"
    │
    ├── Level 2: EPIC (major capability)
    │   "Redesign onboarding experience"
    │   │
    │   ├── Level 3: USER STORY (deliverable increment)
    │   │   "As a new user, I can complete guided setup in < 5 minutes"
    │   │   │
    │   │   ├── Level 4: TASK (implementation work)
    │   │   │   "Design setup wizard UI"
    │   │   │   "Build wizard API endpoints"
    │   │   │   "Write wizard integration tests"
    │   │   │   "Update analytics tracking"
    │   │   │
    │   │   └── ACCEPTANCE CRITERIA
    │   │       "Given/When/Then scenarios"
    │   │
    │   ├── Story: "As a new user, I receive contextual tips during first session"
    │   └── Story: "As a new user, I see a progress indicator for setup completion"
    │
    └── Epic: "Build activation email sequence"
        ├── Story: "Welcome email sent within 1 minute of signup"
        ├── Story: "Day-3 email with personalized tips"
        └── Story: "Day-7 email with peer benchmarks"
```

### Traceability

Every task should trace up to a story, every story to an epic, every epic to a theme, and every theme to a product strategy goal. This traceability enables:

- **Justification:** "Why are we building this task?" — trace it up to the strategic outcome
- **Impact assessment:** "If we cut this story, what outcome is affected?" — trace it up to the theme
- **Progress tracking:** "How much of this strategic outcome have we delivered?" — trace it down to completed stories

---

## Backlog Grooming (Refinement)

### Purpose

Backlog refinement is the recurring practice of reviewing, clarifying, estimating, and prioritizing backlog items to ensure the team always has a "ready" supply of well-defined work.

### Cadence and Structure

```
Frequency: Weekly (1 hour) or bi-weekly (2 hours)
Participants: PM, Engineering Lead, Designer, QA representative
Facilitated by: PM

Agenda:
1. Review top-of-backlog items for clarity (20 min)
   - Are acceptance criteria complete?
   - Are there open questions?
   - Does engineering understand the scope?

2. Estimate upcoming items (20 min)
   - Story points or T-shirt sizing
   - Flag items that need decomposition

3. Discuss new items entering the backlog (10 min)
   - Brief context on why each item exists
   - Preliminary sizing

4. Archive or remove stale items (10 min)
   - Items not touched in 90 days: review and archive or revalidate
```

### Definition of Ready

A story is "ready" for sprint planning when:

| Criterion | Check |
|-----------|-------|
| User value is clear | Team can explain why this matters to a customer |
| Acceptance criteria are written | Given/When/Then scenarios cover happy path and key edge cases |
| Dependencies are resolved | No blockers from other teams, APIs, or decisions |
| Estimated | Team has sized the story (story points or equivalent) |
| Small enough | Fits within a single sprint |
| Designs available (if needed) | Mockups or prototypes are complete for UI work |
| Technical approach agreed | Engineering has a rough plan (no deep unknowns) |

### Backlog Hygiene

| Practice | Frequency | Action |
|----------|-----------|--------|
| Stale item review | Monthly | Archive items untouched for 90+ days |
| Duplicate detection | During refinement | Merge or close duplicate stories |
| Priority re-evaluation | Monthly | Re-stack rank based on new data |
| Backlog size check | Monthly | Healthy backlog: 2-3 sprints of ready items; total < 100 active items |
| Theme alignment check | Quarterly | Ensure all items trace to current strategic themes |

---

## Story Splitting Strategies

When a story is too large, use these splitting patterns:

| Pattern | Technique | Before | After |
|---------|-----------|--------|-------|
| **Workflow** | Split by process steps | "User completes purchase" | "Add to cart" + "Enter payment" + "Confirm order" |
| **Business rule** | Split by rule variation | "Calculate shipping" | "Flat rate shipping" + "Weight-based shipping" + "Free shipping threshold" |
| **Happy/Sad path** | Split by success vs error | "User uploads file" | "Successful upload" + "Upload error handling" |
| **Data entry** | Split by input method | "Create record" | "Manual entry" + "CSV import" + "API integration" |
| **Platform** | Split by platform/device | "Mobile support" | "iOS support" + "Android support" |
| **Performance** | Split by quality level | "Search" | "Basic search" + "Search with filters" + "Autocomplete" |
| **Spike + implementation** | Separate research from build | "Build ML feature" | "Spike: evaluate ML models" + "Implement chosen model" |

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Backlog bankruptcy | 500+ items, most stale | No grooming discipline | Declare bankruptcy: archive everything > 90 days old; restart |
| Vague stories | Engineers constantly asking "what does this mean?" | Insufficient refinement, missing acceptance criteria | Enforce Definition of Ready before sprint planning |
| Ivory tower specs | PM writes detailed specs in isolation; team just executes | Waterfall mindset in agile clothing | Product trio co-creates stories; stories are negotiable |
| Split-averse | Stories span multiple sprints | Fear of losing context by splitting | Practice splitting patterns; celebrate small deliveries |
| Technical debt avoidance | Backlog contains no technical improvement stories | Technical work not valued | Allocate 15-20% of capacity to tech debt; frame in user terms |
| Story point inflation | Velocity appears to increase but output does not | Team inflates estimates | Focus on outcomes delivered, not velocity |

---

## The Operator's Framework

When managing the backlog:

1. **Map before you list** — use story mapping to create a structured view of the user journey
2. **Apply INVEST** — every story must be independent, negotiable, valuable, estimable, small, and testable
3. **Write Given/When/Then** — acceptance criteria that engineers and QA can implement and verify
4. **Decompose systematically** — use the six decomposition patterns to break epics into sprint-sized stories
5. **Maintain traceability** — every story traces up to an epic, theme, and strategic outcome
6. **Groom weekly** — keep 2-3 sprints of ready items; archive stale items ruthlessly
7. **Enforce Definition of Ready** — no story enters a sprint without meeting readiness criteria

---

## Summary

Backlog management is the discipline that connects strategic intent to executable delivery. User story mapping provides a structured, visual representation of the user journey that prevents the backlog from becoming a disconnected list of tickets. The INVEST criteria ensure each story is well-formed and deliverable. Given/When/Then acceptance criteria provide precise, testable specifications that align PM, engineering, and QA. Epic decomposition uses six patterns (workflow, business rules, data variations, user roles, CRUD, and performance levels) to break large initiatives into sprint-sized increments. The four-level hierarchy (theme, epic, story, task) creates traceability from strategic outcomes to daily work. Weekly refinement and ruthless hygiene prevent backlog bankruptcy. The well-managed backlog is not the largest backlog — it is the most curated one, where every item can be justified and every story is ready to build.

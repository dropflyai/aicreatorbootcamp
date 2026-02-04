# Requirements Engineering

## What This Enables

A systematic discipline for discovering, documenting, validating, and managing the requirements that define what a product must do and how well it must perform. Requirements engineering bridges the gap between customer needs (often vague, contradictory, and unstated) and engineering specifications (precise, testable, and implementable). Without this discipline, teams build systems that meet no one's needs precisely while failing everyone's expectations generally.

---

## The Core Insight

Requirements are not gathered — they are discovered, negotiated, and validated. The term "requirements gathering" implies that requirements exist fully formed in stakeholders' minds, waiting to be collected. In reality, requirements emerge through a process of exploration, articulation, and validation. Stakeholders often cannot articulate their needs until they see what they do NOT want. The requirements engineering process must account for this fundamental ambiguity.

Karl Wiegers (Software Requirements, 2013): "The hardest part of building a software system is deciding precisely what to build."

---

## Functional vs Non-Functional Requirements

### Definitions

| Type | Definition | Question Answered | Example |
|------|-----------|-------------------|---------|
| **Functional** | What the system must DO | "What capabilities must the system provide?" | "The system shall allow users to export reports as PDF" |
| **Non-Functional** | How well the system must PERFORM | "What qualities must the system exhibit?" | "The system shall load the dashboard in < 2 seconds at p95" |

### Functional Requirements Categories

| Category | Description | Examples |
|----------|-------------|---------|
| **Business rules** | Logic governing business processes | "Discount applies when cart exceeds $100" |
| **Data handling** | How data is created, stored, retrieved, transformed | "User records must be retained for 7 years after account deletion" |
| **User interactions** | How users interact with the system | "User can drag and drop items to reorder a list" |
| **System interfaces** | How the system communicates with other systems | "The system shall expose a REST API with OAuth 2.0 authentication" |
| **Workflow and process** | Sequences of actions and state transitions | "An invoice moves through states: Draft -> Sent -> Paid -> Archived" |
| **Reporting and analytics** | Information the system must generate | "The system shall generate a monthly usage report by team" |

### Non-Functional Requirements Categories (ISO 25010)

| Category | Sub-Categories | Example Requirement |
|----------|---------------|---------------------|
| **Performance** | Response time, throughput, resource utilization | "API response time < 200ms at p99 under 1000 concurrent users" |
| **Reliability** | Availability, fault tolerance, recoverability | "System availability of 99.9% measured monthly (8.7 hours downtime/year)" |
| **Security** | Confidentiality, integrity, authentication, authorization | "All PII must be encrypted at rest (AES-256) and in transit (TLS 1.3)" |
| **Scalability** | Load handling, growth accommodation | "System shall support 10x current user base without architecture changes" |
| **Usability** | Learnability, accessibility, error prevention | "New users shall complete core task within 5 minutes without documentation" |
| **Maintainability** | Modularity, testability, modifiability | "Test coverage shall exceed 80% for all business-critical modules" |
| **Compatibility** | Browser support, device support, interoperability | "Support Chrome, Firefox, Safari, Edge (latest 2 versions)" |
| **Portability** | Adaptability, installability | "Application shall run in Docker containers on any Linux distribution" |
| **Compliance** | Regulatory, legal, standards | "System shall comply with GDPR, CCPA, and SOC 2 Type II" |

### Writing Non-Functional Requirements

Non-functional requirements must be **specific and measurable**, not vague aspirations:

| Bad (Unmeasurable) | Good (Measurable) |
|-------------------|-------------------|
| "The system shall be fast" | "Page load time < 2 seconds at p95 on a 4G connection" |
| "The system shall be secure" | "All authentication endpoints shall rate-limit to 10 attempts per minute per IP" |
| "The system shall be available" | "Monthly uptime of 99.95%, excluding scheduled maintenance windows" |
| "The system shall be scalable" | "System shall handle 50,000 concurrent users with < 500ms API response time" |
| "The system shall be user-friendly" | "80% of new users shall complete onboarding without contacting support" |

---

## Acceptance Criteria: Given/When/Then

### The BDD Format

Behavior-Driven Development (Dan North, 2006) provides a structured format for acceptance criteria that is readable by non-technical stakeholders and directly translatable to automated tests.

### Structure

```
Feature: [Feature name]
  As a [role]
  I want to [capability]
  So that [benefit]

  Scenario: [Scenario name]
    Given [precondition]
    And [additional precondition]
    When [action]
    And [additional action]
    Then [expected outcome]
    And [additional expected outcome]
    But [exception to expected outcome]
```

### Writing Effective Given/When/Then

**Rules:**

1. **Given** describes the state of the world BEFORE the action
2. **When** describes the action the user (or system) takes
3. **Then** describes the observable outcome AFTER the action
4. Each scenario tests ONE behavior (not a complex multi-step workflow)
5. Scenarios should be independent — no scenario depends on another

### Comprehensive Example

```
Feature: Password Reset
  As a registered user
  I want to reset my forgotten password
  So that I can regain access to my account

  Scenario: Successful password reset request
    Given I am on the login page
    And I have a registered account with email "user@example.com"
    When I click "Forgot password"
    And I enter "user@example.com"
    And I click "Send reset link"
    Then I see a confirmation message: "Reset link sent to user@example.com"
    And a password reset email is sent within 60 seconds
    And the reset link expires after 24 hours

  Scenario: Reset request for unregistered email
    Given I am on the forgot password page
    When I enter "unknown@example.com"
    And I click "Send reset link"
    Then I see the same confirmation message (to prevent email enumeration)
    But no email is actually sent

  Scenario: Successful password change
    Given I have received a valid password reset email
    And I click the reset link within 24 hours
    When I enter a new password that meets complexity requirements
    And I confirm the new password
    And I click "Reset password"
    Then my password is updated
    And I am redirected to the login page
    And all existing sessions are invalidated

  Scenario: Expired reset link
    Given I have received a password reset email
    And more than 24 hours have passed
    When I click the reset link
    Then I see an error: "This reset link has expired"
    And I am offered the option to request a new link

  Scenario: Already-used reset link
    Given I have already used a password reset link successfully
    When I click the same link again
    Then I see an error: "This link has already been used"
```

### Anti-Patterns in Acceptance Criteria

| Anti-Pattern | Example | Problem | Fix |
|-------------|---------|---------|-----|
| Implementation detail | "Given the database has a user record" | Couples to implementation | "Given a registered user exists" |
| Multiple behaviors | "When I login, update profile, and logout" | Tests too much | Split into separate scenarios |
| Vague outcomes | "Then the system works correctly" | Not testable | Specify observable behavior |
| Missing edge cases | Only happy path | False confidence in quality | Add error, boundary, and empty-state scenarios |
| UI-specific | "Then a green button appears at 300px from top" | Brittle, couples to design | "Then a success confirmation is displayed" |

---

## Requirement Traceability

### Definition

Requirement traceability is the ability to follow a requirement from its origin (customer need, business goal) through its specification, implementation, testing, and deployment. Traceability ensures that every piece of code serves a purpose and every requirement is verified.

### The Traceability Matrix

```
┌──────────────┬────────────────┬──────────────┬──────────────┬──────────────┐
│ Customer Need│ Requirement    │ Design       │ Code         │ Test         │
│ (Origin)     │ (Specification)│ (Solution)   │ (Build)      │ (Verify)     │
├──────────────┼────────────────┼──────────────┼──────────────┼──────────────┤
│ CN-001:      │ FR-001:        │ DS-001:      │ Module:      │ TC-001:      │
│ "Need to     │ "System shall  │ Export       │ export.py    │ "Verify PDF  │
│ share reports│ export reports │ dialog with  │ render.py    │ export with  │
│ with exec    │ as PDF with    │ format and   │              │ charts and   │
│ team"        │ charts intact" │ options      │              │ tables"      │
├──────────────┼────────────────┼──────────────┼──────────────┼──────────────┤
│ CN-002:      │ NFR-001:       │ DS-002:      │ Module:      │ TC-002:      │
│ "App is too  │ "Dashboard     │ Lazy loading │ dashboard.js │ "Load test:  │
│ slow on      │ load < 2s on   │ + skeleton   │ perf.config  │ 2s at p95    │
│ Monday       │ 4G at p95"     │ screens      │              │ on 4G"       │
│ mornings"    │                │              │              │              │
└──────────────┴────────────────┴──────────────┴──────────────┴──────────────┘
```

### Forward and Backward Traceability

| Direction | From -> To | Purpose |
|-----------|-----------|---------|
| **Forward** | Customer need -> Requirement -> Code -> Test | Ensures every need is implemented and verified |
| **Backward** | Test -> Code -> Requirement -> Customer need | Ensures every piece of code traces to a customer need |
| **Gap analysis** | Find needs without requirements, or requirements without tests | Identifies missing coverage |
| **Impact analysis** | Requirement changed -> Which code and tests are affected? | Manages change safely |

### When Traceability Matters Most

| Context | Traceability Level | Rationale |
|---------|-------------------|-----------|
| Regulated industry (healthcare, finance) | Full formal traceability | Regulatory compliance requires audit trails |
| Safety-critical systems | Full formal traceability | Failure has severe consequences |
| Enterprise B2B products | Moderate traceability | Customer commitments require accountability |
| Startup/early-stage products | Lightweight traceability | Theme -> Epic -> Story hierarchy is sufficient |
| Growth experiments | Minimal traceability | Speed matters more than documentation |

---

## Requirements Elicitation Techniques

### Technique Comparison

| Technique | Best For | Limitations |
|-----------|----------|------------|
| **User interviews** | Understanding context, motivations, pain points | Subjective; recall bias |
| **Observation / Contextual inquiry** | Discovering tacit requirements | Time-intensive; observer effect |
| **Workshops / JAD sessions** | Building consensus among stakeholders | Groupthink; dominant personality bias |
| **Prototyping** | Validating requirements through tangible artifacts | Can anchor on a specific solution |
| **Document analysis** | Understanding existing processes and regulations | May reflect outdated practices |
| **Survey / questionnaire** | Quantifying requirement priorities at scale | Misses nuance; question bias |
| **Competitive analysis** | Identifying market-expected features | Risk of copycat requirements |
| **User story mapping** | Organizing requirements in user journey context | Requires skilled facilitation |

### Requirements Elicitation Anti-Patterns

| Anti-Pattern | Description | Remedy |
|-------------|-------------|--------|
| "The customer said..." | Single customer request treated as requirement | Validate across multiple customers; look for patterns |
| Gold plating | Adding features beyond what customers need | Strict scope management; YAGNI principle |
| Assumed requirements | Requirements assumed without validation | Challenge every requirement: "How do we know this is needed?" |
| Solution-as-requirement | "We need a Gantt chart" (solution, not requirement) | Reframe: "We need to visualize project timelines" (requirement) |
| Kitchen sink | Every possible requirement included "just in case" | Prioritize ruthlessly; defer unvalidated requirements |

---

## Requirements Change Management

### Why Requirements Change

Requirements change because:
1. **Customer understanding deepens** — the team learns more about the problem
2. **Market conditions shift** — competitors move, regulations change
3. **Technical constraints emerge** — feasibility assumptions prove wrong
4. **Stakeholder priorities change** — business strategy evolves
5. **Users react to early releases** — feedback reveals new needs

### Change Management Process

```
1. Change Request
   - Who is requesting?
   - What is the change?
   - Why is it needed?
   - What is the impact if we do not make the change?

2. Impact Assessment
   - Which requirements are affected?
   - What code and tests need to change? (traceability)
   - What is the effort estimate?
   - What is the schedule impact?
   - What is the risk?

3. Decision
   - Approve: Add to scope (and remove something else)
   - Defer: Add to future roadmap
   - Reject: Document rationale for rejection

4. Implementation
   - Update requirements documentation
   - Update affected code and tests
   - Communicate changes to all stakeholders
```

### The Scope Change Rule

**For every feature added mid-project, one of equal size must be removed — or the timeline must be adjusted.** This is the iron triangle: scope, time, and resources cannot all be fixed simultaneously. Requirements changes that increase scope without adjusting time or resources are a path to failure.

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Incomplete requirements | Critical edge cases discovered during testing | Insufficient elicitation, missing perspectives | Include QA and engineering in requirements review |
| Ambiguous requirements | Engineers and PM disagree on what "done" means | Natural language imprecision | Use Given/When/Then; include examples |
| Unstable requirements | Requirements change faster than they are implemented | Building before understanding; stakeholder churn | Validate requirements before committing to build |
| Over-specified requirements | Requirements dictate the solution, not the problem | PM acting as system designer | Specify WHAT and WHY, not HOW |
| Gold-plated requirements | Features nobody asked for or needs | Fear of missing something; engineer enthusiasm | Trace every requirement to customer evidence |
| Untraceable requirements | Cannot determine why a feature exists | No traceability process | Maintain requirement-to-need mapping |

---

## The Operator's Framework

When engineering requirements:

1. **Discover, do not gather** — requirements emerge through research, not collection
2. **Separate functional from non-functional** — ensure both are specified and measurable
3. **Write Given/When/Then** — for every key scenario, including edge cases
4. **Maintain traceability** — every requirement traces to a customer need; every test traces to a requirement
5. **Expect change** — build a change management process; use the scope change rule
6. **Validate before building** — prototypes and experiments cost less than code
7. **Involve the trio** — PM, Design, and Engineering should co-create requirements, not receive them

---

## Summary

Requirements engineering is the discipline of transforming ambiguous customer needs into precise, testable specifications. Functional requirements define what the system must do; non-functional requirements define how well it must perform (using ISO 25010 categories as a checklist). Given/When/Then acceptance criteria from BDD provide a format that is readable by stakeholders and automatable by engineers. Requirement traceability connects every line of code to a customer need and every test to a requirement, enabling impact analysis and gap detection. Requirements are discovered through iterative elicitation — interviews, observation, workshops, prototyping — not gathered from stakeholders. Change is inevitable; the change management process ensures that scope changes are assessed, decided, and communicated rather than silently absorbed. The goal is not perfect requirements — it is requirements that are clear enough to build, testable enough to verify, and traceable enough to justify.

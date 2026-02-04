# Documentation Strategy — The Divio Framework and Beyond

## Overview

Documentation is the most scalable form of developer education. A well-written
tutorial serves thousands of developers at zero marginal cost. A poorly written
tutorial — or worse, a missing tutorial — generates thousands of support tickets.
This module codifies documentation strategy using the Divio documentation framework
as the foundational taxonomy and augments it with practices from Stripe, Google,
and Twilio.

---

## The Divio Documentation Framework

The Divio framework (created by Daniele Procida) identifies four types of
documentation, organized along two axes:

```
                    PRACTICAL                    THEORETICAL
                  (doing/using)                (understanding)

LEARNING      ┌─────────────────┐         ┌─────────────────┐
(acquiring)   │   TUTORIALS     │         │  EXPLANATION    │
              │  Learning-      │         │  Understanding- │
              │  oriented       │         │  oriented       │
              └─────────────────┘         └─────────────────┘

WORKING       ┌─────────────────┐         ┌─────────────────┐
(applying)    │  HOW-TO GUIDES  │         │   REFERENCE     │
              │  Task-          │         │  Information-   │
              │  oriented       │         │  oriented       │
              └─────────────────┘         └─────────────────┘
```

### The Critical Rule: Never Mix Types

Each documentation page must be exactly one type. Mixing types within a single
page is the most common documentation anti-pattern. When a tutorial suddenly
includes comprehensive reference material, it overwhelms the learner. When a
reference page includes tutorial-style explanations, it annoys the experienced
developer who just needs the parameter list.

---

## Type 1: Tutorials

### Purpose
Take a beginner from zero to a working result through guided steps. Tutorials
are lessons — they teach by leading the reader through a series of actions.

### Characteristics
- **Learning-oriented** — The reader is learning, not doing production work
- **Concrete results** — Each tutorial produces something visible and working
- **Step-by-step** — Every action is explicit; nothing is assumed
- **Reliable** — Every step works every time (tested in CI)
- **Progressive** — Starts simple, adds complexity incrementally

### Stripe Tutorial Example (Deconstructed)

Stripe's "Accept a payment" tutorial exemplifies best practices:

```
Step 1: Install the Stripe library (1 command, copy-paste)
Step 2: Create a PaymentIntent (5 lines of code, all shown)
Step 3: Collect payment details (pre-built UI component)
Step 4: Confirm the payment (1 API call)
Step 5: Test with test cards (specific card numbers provided)
Result: Working payment flow in < 10 minutes
```

**Why it works:**
- No prerequisites beyond a Stripe account
- Every step includes complete, working code
- Test mode means no risk of real charges
- Each step builds on the previous one
- The result is immediately verifiable

### Tutorial Quality Rules

1. **Test every tutorial in CI** — If the code in the tutorial does not compile
   and run, it is broken documentation
2. **Assume nothing** — State every prerequisite explicitly
3. **Use realistic examples** — Not `foo`/`bar` but actual domain-relevant data
4. **Show the complete file** — Not just the changed lines, the whole file
5. **Number every step** — Sequential, clear, unambiguous
6. **End with something working** — The reader must see a result
7. **Time-box** — State "This tutorial takes approximately X minutes"
8. **One path only** — Do not offer alternatives in a tutorial

### Tutorial Anti-Patterns

| Anti-Pattern | Why It Fails |
|-------------|-------------|
| "Exercise for the reader" | Tutorials must be complete |
| Multiple language options in one page | Creates cognitive load; use tabs or separate pages |
| Skipping "obvious" steps | Nothing is obvious to a beginner |
| Starting with theory | Tutorials teach by doing, not by explaining |
| Broken code samples | Destroys trust immediately |

---

## Type 2: How-To Guides

### Purpose
Show how to solve a specific problem. How-to guides are recipes — they assume
the reader can already cook (has basic knowledge) and needs to accomplish a
specific task.

### Characteristics
- **Task-oriented** — Organized around what the developer wants to do
- **Focused** — One guide per task (no multi-topic guides)
- **Practical** — Shows working code for a real scenario
- **Adaptable** — Developer should be able to modify the solution for their context

### Structure Template

```markdown
# How to [Accomplish Specific Task]

## Prerequisites
- [What the developer needs to have already]

## Steps

### 1. [First action]
[Code and explanation]

### 2. [Second action]
[Code and explanation]

## Variations
- [Alternative approaches for different contexts]

## Troubleshooting
- [Common errors and solutions]

## Related
- [Links to related how-to guides]
```

### How-To Guide Quality Rules

1. **Title starts with "How to"** — Searchable, unambiguous intent
2. **List prerequisites** — Do not repeat the tutorial; link to it
3. **Show complete, working code** — Not pseudocode
4. **Include error handling** — Real code handles errors
5. **Include variations** — "If you are using TypeScript instead..."
6. **Include troubleshooting** — The top 3 errors developers will encounter

---

## Type 3: Reference Documentation

### Purpose
Describe the machinery comprehensively and accurately. Reference documentation
is the developer's authoritative source of truth about what the system does.

### Characteristics
- **Information-oriented** — Describes, does not explain or teach
- **Comprehensive** — Every endpoint, parameter, field, and error code
- **Accurate** — Must match actual API behavior exactly (validated in CI)
- **Structured** — Consistent format across all entries
- **Austere** — No narrative, no tutorials, no opinions

### Stripe API Reference (Deconstructed)

Stripe's API reference is the industry gold standard:

**Each endpoint includes:**
- HTTP method and URL
- Description (one sentence)
- Authentication requirement
- Request parameters (name, type, required/optional, description)
- Request body example
- Response schema (every field documented)
- Response example
- Error codes specific to this endpoint
- Related endpoints

**Each parameter includes:**
- Name
- Type (with exact format: "string", "integer", "ISO 8601 datetime")
- Required or optional
- Default value (if optional)
- Description
- Constraints (min/max, regex, enum values)
- Example value

### Reference Documentation Quality Rules

1. **Generate from source** — Use OpenAPI/Swagger specs; do not write by hand
2. **Validate against actual API** — CI tests should verify docs match behavior
3. **Document every field** — Undocumented fields are DX failures
4. **Include examples** — Every request and response with realistic data
5. **Document errors** — Every error code with cause and resolution
6. **Version explicitly** — Documentation must match the documented API version
7. **Mark deprecated items** — With migration guidance and sunset dates

---

## Type 4: Explanation (Conceptual Documentation)

### Purpose
Help developers understand why things work the way they do. Explanations build
mental models, discuss trade-offs, and provide context that makes reference
documentation meaningful.

### Characteristics
- **Understanding-oriented** — Answers "why" questions
- **Discursive** — Narrative style, exploring ideas and context
- **Contextual** — Places technical decisions in broader context
- **Honest** — Acknowledges trade-offs, limitations, and alternatives

### Example Topics
- Why we chose eventual consistency for this service
- How our authentication model works and why
- The architecture of our webhook delivery system
- Rate limiting: why it exists and how to work within it
- Our approach to backward compatibility and versioning

### Explanation Quality Rules

1. **Answer "why" not "how"** — If it teaches steps, it is a tutorial
2. **Discuss trade-offs** — Real engineering involves trade-offs; document them
3. **Reference alternatives** — "We chose X over Y because..."
4. **Include diagrams** — Architecture explanations need visual aids
5. **Keep current** — Outdated explanations are worse than no explanation

---

## Documentation Information Architecture

### The Documentation Homepage

The documentation landing page is the most important page in the entire docs site.
It must answer three questions within 3 seconds:

1. **What does this product do?** (One sentence)
2. **How do I get started?** (Direct link to quickstart)
3. **Where do I find [specific thing]?** (Navigation/search)

### Navigation Structure

```
Documentation Home
├── Getting Started (Tutorial)
│   ├── Quickstart
│   ├── Installation
│   └── First API Call
├── Guides (How-To)
│   ├── Authentication
│   ├── Error Handling
│   ├── Pagination
│   ├── Webhooks
│   └── [Feature-specific guides]
├── API Reference (Reference)
│   ├── Authentication
│   ├── [Resource 1]
│   ├── [Resource 2]
│   └── Error Codes
├── Concepts (Explanation)
│   ├── Architecture Overview
│   ├── Security Model
│   └── [Conceptual topics]
├── SDKs & Libraries
│   ├── Python
│   ├── Node.js
│   ├── Go
│   └── [Other languages]
├── Changelog
│   ├── Latest Changes
│   └── Migration Guides
└── Community
    ├── Discord/Slack
    ├── GitHub
    └── Stack Overflow
```

### Search

Documentation without search is documentation that cannot be found. Requirements:
- Full-text search across all documentation types
- Search results ranked by relevance (not recency)
- Search analytics to identify what developers are looking for
- "Did you mean?" for common misspellings
- Algolia DocSearch or similar purpose-built solution

---

## Documentation Maintenance

### The Documentation Debt Problem

Documentation debt accumulates identically to technical debt. Every API change that
is not reflected in documentation is documentation debt. Every new feature shipped
without documentation is documentation debt. Unlike technical debt, documentation
debt is immediately visible to every developer.

### Documentation Review Cadence

| Review Type | Frequency | Scope |
|------------|-----------|-------|
| Accuracy check (CI) | Every deploy | All code samples |
| Link check | Weekly | All internal and external links |
| Content audit | Quarterly | All pages reviewed for accuracy |
| Navigation audit | Semi-annually | IA and navigation structure |
| Competitive audit | Annually | Compare with competitor docs |

### Documentation CI/CD Pipeline

```
Code change -> API spec regenerated -> Docs build triggered ->
  -> Code samples extracted and tested -> Links validated ->
  -> Screenshots updated (if using automated screenshotting) ->
  -> Preview deployed for review -> Merge -> Production deploy
```

Every code sample in documentation must be extracted and tested as part of CI.
If a code sample breaks, the docs build fails. This is non-negotiable.

---

## Documentation Metrics

| Metric | Source | Target |
|--------|--------|--------|
| Page satisfaction | Thumbs up/down on each page | > 80% positive |
| Time on page | Analytics | Tutorials: 5-15 min; Reference: < 2 min |
| Bounce rate | Analytics | < 40% for tutorials, < 60% for reference |
| Search success rate | Search analytics | > 70% of searches find relevant result |
| Support deflection | Support tickets vs. doc views | Increasing ratio over time |
| Code sample accuracy | CI test results | 100% pass rate |
| Freshness | Last-updated dates | No page > 90 days without review |

---

**This module governs all documentation strategy decisions in the DevRel Brain.**
**Documentation quality is measured against the standards defined here.**

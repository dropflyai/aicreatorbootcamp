# Lifecycle

## Overview

The Engineering Lifecycle is a six-phase iterative process that governs how work
moves from ambiguous intent to production-serving software and back through
maintenance. Each phase has a dedicated document, explicit gate requirements, and
cross-references to the Patterns/ and Verification/ directories.

The lifecycle is a loop, not a line. Every shipped feature generates cleanup
obligations, and cleanup findings feed back into planning.

## Flow

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │                                                                      │
  ▼                                                                      │
PLANNING ──► DESIGN ──► IMPLEMENTATION ──► VERIFICATION ──► SHIPPING ──► CLEANUP
  │              │              │                │              │           │
  │   Gate:      │   Gate:      │   Gate:        │   Gate:      │  Gate:    │
  │   Def of     │   Design     │   Code         │   Def of     │  Deploy   │
  │   Ready      │   Review     │   Review       │   Done       │  Checklist│
  │              │              │                │              │           │
  └──────────────┴──────────────┴────────────────┴──────────────┴───────────┘
                              (continuous loop)
```

## Phase Summary

| Phase          | File                | Key Activities                                              | Gate Requirement          |
|----------------|---------------------|-------------------------------------------------------------|---------------------------|
| Planning       | `Planning.md`       | Requirements elicitation, MoSCoW, story mapping, ADRs, estimation, risk matrix | Definition of Ready       |
| Design         | `Design.md`         | System design (C4), architecture selection, DB design, API contracts, STRIDE, capacity estimation | Design Review approval    |
| Implementation | `Implementation.md` | Branching, TDD, vertical slicing, feature flags, commit hygiene, PRs, pair programming | Code Review approval      |
| Verification   | `Verification.md`   | V&V (IEEE 1012), test execution, static/dynamic analysis, SAST/DAST/SCA, evidence collection | Definition of Done        |
| Shipping       | `Shipping.md`       | Semver, deployment strategies, flag rollout, DB migration coordination, rollback, monitoring | Deployment Checklist      |
| Cleanup        | `Cleanup.md`        | Dead code removal, flag cleanup, dependency audit, flaky test quarantine, tech debt review | Sprint retrospective sign-off |

## Gate Dependency Chain

Each phase gate must be satisfied before work advances to the next phase. Gates
are enforced by a combination of CI automation and human review.

```
Definition of Ready  -->  Design Review  -->  Code Review  -->  Definition of Done
       |                                                              |
       |                  Deployment Checklist  <---------------------+
       |                         |
       +---- Cleanup Review <----+
```

## Cross-References

| Directory         | Relationship to Lifecycle                                    |
|-------------------|--------------------------------------------------------------|
| `../Patterns/`    | Reusable solutions applied during Design and Implementation  |
| `../Verification/`| Detailed verification protocols referenced by Verification   |
| `../Decisions/`   | ADRs created during Planning, reviewed during Design         |
| `../Automations/` | CI/CD recipes that enforce lifecycle gates automatically      |
| `../Templates/`   | Standardized templates for ADRs, PRs, incident reports       |
| `../Score.md`     | Engineering quality metrics derived from lifecycle compliance |

## Key Principle

The lifecycle exists to make speed sustainable. Skipping phases does not make
delivery faster; it borrows time from future phases at compound interest
(Lehman, 1980). Follow the process. Trust the gates.

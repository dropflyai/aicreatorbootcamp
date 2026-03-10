# Decision Log: VoiceFly Deep-Dive

**Date:** 2026-03-09
**Project:** voicefly-app

---

## Decision 1: Parallel Audit Approach

**Context:** User wanted comprehensive evaluation of entire codebase
**Options:**
1. Sequential review (one area at a time)
2. Parallel audit (5 specialist agents simultaneously)

**Decision:** Parallel audit with 5 agents
**Rationale:** Faster coverage, specialist expertise per domain
**Outcome:** Found 20+ issues across backend, frontend, database, integrations, QA

---

## Decision 2: Task Prioritization (P0/P1/P2)

**Context:** Many issues found, needed ordering
**Decision:**
- P0: Blocking issues (endpoints that 404, hardcoded URLs)
- P1: Core functionality gaps (missing routes, broken onboarding)
- P2: Technical debt (duplicate services)

**Rationale:** Fix what breaks first, then what limits, then cleanup
**Outcome:** Systematic resolution, no regression

---

## Decision 3: Onboarding Fix Approach

**Context:** Onboarding wizard collected data but never saved it
**Options:**
1. Save to localStorage (client-side only)
2. Save to database + update VAPI agent (full integration)
3. Skip preferences, use defaults

**Decision:** Full integration (option 2)
**Rationale:** User specifically wanted "setup a number and get them going" — preferences must affect the actual agent
**Outcome:** Created `/api/onboarding/complete` that saves and updates VAPI agent

---

## Decision 4: Delete vs Consolidate Legacy Files

**Context:** Found 3 unused files (email-service-new.ts, vapi-*.js)
**Options:**
1. Keep for reference
2. Consolidate into existing services
3. Delete entirely

**Decision:** Delete entirely
**Rationale:**
- `email-service-new.ts` used Resend, app uses SendGrid — incompatible
- `vapi-*.js` used shared assistant approach, app uses per-business agents — outdated
- Dead code creates confusion

**Outcome:** Cleaner codebase, no regressions

---

## Decision 5: Database Migration Design

**Context:** Needed tables for locations, payment processors, loyalty
**Options:**
1. Separate migrations per feature
2. Single comprehensive migration

**Decision:** Single comprehensive migration
**Rationale:** All tables needed together for feature completeness, easier rollback
**Outcome:** One migration file with all tables, RLS policies, triggers

---

## Decision 6: Commit Strategy

**Context:** User requested local commit only (not push)
**Decision:** Single commit with comprehensive message
**Rationale:** Atomic change, easy to review, easy to revert if needed
**Outcome:** Commit `17627c6` with full description of all changes

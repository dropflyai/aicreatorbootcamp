# Regression History

> **Brain:** Engineering Brain
> **Category:** Memory
> **Last Updated:** 2026-02-19
> **Cross-References:** `Verification/TripleVerification.md`, `Memory/ExperienceLog.md`, `Solutions/SolutionIndex.md`

---

## What Belongs Here

This file is a cross-reference index linking regressions to their fixes and the prevention rules derived from them. It serves as institutional memory to stop the same class of bug from recurring.

### Include

- **Bugs that recurred** -- A bug was fixed, then reappeared later (same root cause or same symptom).
- **Fixes that broke other things** -- A change intended to fix one issue introduced a new issue elsewhere.
- **Deploys that rolled back** -- A production deployment that had to be reverted due to a defect.
- **Schema changes that caused data issues** -- Migrations that corrupted data, broke queries, or caused downtime.
- **Config changes with unintended side effects** -- Environment variable changes, feature flag toggles, or infrastructure config that caused failures.

### Exclude

- First-time bugs with no regression history (those go in `Memory/ExperienceLog.md`).
- Performance issues that did not cause functional regression (those go in `Performance.md`).
- Speculative risks that never materialized.

---

## Regression Entry Format

Every regression entry follows this exact structure:

```markdown
### [REG-NNN] — Brief Description

| Field | Value |
|-------|-------|
| **Date** | YYYY-MM-DD |
| **Category** | Code / Schema / Config / Performance |
| **Severity** | Critical / High / Medium / Low |
| **Discovered By** | [Brain Name] |
| **Fix Commit** | `abc1234` or PR #NNN |
| **Prevention Rule** | [ID from Prevention Rules Catalog below] |

**Description:**
What happened. What was the user-visible symptom. How was it detected.

**Root Cause:**
Why it happened. The precise technical reason, not symptoms.

**Timeline:**
- When the original fix was applied
- When the regression was detected
- When the regression fix was deployed

**Fix:**
What was done to resolve the regression. Include the specific code change or config change.

**Prevention Rule:**
The rule that was derived from this regression to prevent recurrence. Reference the rule ID from the catalog below.
```

---

## Categories

### Code Regression

Regressions caused by source code changes. A feature or fix that reintroduced a previously resolved bug, or a new feature that broke existing functionality.

**Common patterns:**
- Merge conflict resolution that silently dropped a fix
- Refactoring that removed defensive logic
- Dependency upgrade that changed behavior
- Copy-paste from old code that carried a known bug

### Schema Regression

Regressions caused by database schema changes. Migrations that broke existing queries, corrupted data integrity, or caused application errors.

**Common patterns:**
- Column rename without updating all queries
- NOT NULL constraint added without backfilling existing rows
- Index removal that caused query timeouts
- Foreign key addition that blocked writes to orphaned rows

### Config Regression

Regressions caused by configuration changes. Environment variables, feature flags, infrastructure settings, or CI configuration changes that caused unexpected failures.

**Common patterns:**
- Environment variable renamed in code but not in deployment config
- Feature flag enabled in production without the supporting migration
- CI cache key change that caused stale artifacts
- DNS or routing change that broke a subset of users

### Performance Regression

Regressions where a change caused measurable degradation in response time, throughput, memory usage, or build speed that impacted users or developer experience.

**Common patterns:**
- N+1 query introduced by ORM change
- Bundle size increase from unshaken dependency
- Memory leak from event listener not cleaned up
- Build time doubled from new compilation step

---

## Example Entries

### REG-001 — Auth Token Validation Skipped After Middleware Refactor

| Field | Value |
|-------|-------|
| **Date** | 2026-01-20 |
| **Category** | Code |
| **Severity** | Critical |
| **Discovered By** | Engineering Brain |
| **Fix Commit** | `e7f2a1b` |
| **Prevention Rule** | PREV-001 |

**Description:**
After refactoring the middleware chain, the auth token validation step was accidentally removed from the API route handler. Unauthenticated requests were being served for ~2 hours before detection. Discovered by a QA tester who noticed they could access protected routes without logging in.

**Root Cause:**
The middleware refactor moved from a single middleware file to a chain-of-responsibility pattern. The auth middleware was registered in the old file but not added to the new chain. No test covered the "unauthenticated request to protected route returns 401" case.

**Timeline:**
- 2026-01-20 10:00 — Middleware refactor merged to main
- 2026-01-20 10:15 — Deployed to production
- 2026-01-20 12:20 — QA tester reported unauthenticated access
- 2026-01-20 12:45 — Hotfix deployed

**Fix:**
Added auth middleware to the new chain. Added integration test: `test('protected route returns 401 without token')`.

**Prevention Rule:**
PREV-001 — Every middleware refactor must include a "negative auth test" that confirms unauthenticated requests are rejected.

---

### REG-002 — User Profiles Blank After Migration Added NOT NULL

| Field | Value |
|-------|-------|
| **Date** | 2026-02-05 |
| **Category** | Schema |
| **Severity** | High |
| **Discovered By** | Engineering Brain |
| **Fix Commit** | PR #47 |
| **Prevention Rule** | PREV-003 |

**Description:**
A migration added a `NOT NULL` constraint to the `display_name` column on the `profiles` table. Existing rows with NULL values caused the migration to fail in staging. The migration was then modified to set a default value, but the default was an empty string, causing user profiles to display blank names in the UI.

**Root Cause:**
The migration did not include a backfill step to populate existing NULL rows with meaningful data before applying the constraint. The "quick fix" of defaulting to empty string was technically correct but functionally wrong.

**Timeline:**
- 2026-02-04 — Migration written and tested on empty local database
- 2026-02-05 09:00 — Migration failed in staging (NULL violation)
- 2026-02-05 10:00 — Migration amended with DEFAULT ''
- 2026-02-05 11:00 — Deployed to staging, blank names reported
- 2026-02-05 14:00 — New migration deployed with proper backfill

**Fix:**
Created a two-step migration: (1) backfill NULL display_name with username, (2) add NOT NULL constraint.

**Prevention Rule:**
PREV-003 — NOT NULL migrations must include a backfill step. Test migrations against a database snapshot with realistic data, not an empty database.

---

## Prevention Rules Catalog

These rules are derived from actual regressions. Each rule exists because a regression taught us it was necessary.

| Rule ID | Rule | Derived From |
|---------|------|--------------|
| PREV-001 | Every middleware refactor must include negative auth tests confirming unauthenticated requests are rejected. | REG-001 |
| PREV-002 | Dependency upgrades must run the full test suite, not just unit tests. Integration and E2E tests catch behavioral changes that unit tests miss. | (Future entry) |
| PREV-003 | NOT NULL migrations must include a backfill step. Always test migrations against a database with realistic data, never an empty database. | REG-002 |
| PREV-004 | Environment variable renames must be grep-verified across all deployment configs (Vercel, Docker, CI) before merging. | (Future entry) |
| PREV-005 | Feature flag activation in production must be preceded by verification that all supporting migrations have been applied. | (Future entry) |
| PREV-006 | Bundle size must be checked in CI. Any increase over 10% triggers a review. | (Future entry) |
| PREV-007 | After resolving a merge conflict in a file that contains business logic, the file must be reviewed line-by-line for dropped changes. | (Future entry) |

### Adding New Prevention Rules

When a new regression is logged:

1. Analyze the root cause.
2. Draft a prevention rule that would have caught this regression *before* it reached production.
3. Add the rule to the catalog above with the next available `PREV-NNN` ID.
4. Link the rule back to the regression entry.
5. If the rule can be automated (lint rule, CI check, test), create an issue to implement it.

---

## Relationship to Verification/TripleVerification.md

The Triple Verification protocol is the **enforcement mechanism** for prevention rules:

1. **First Verification:** Does the change pass existing tests? (Catches known regression patterns.)
2. **Second Verification:** Does the change pass the specific prevention rules relevant to its category? (E.g., middleware change triggers PREV-001 check.)
3. **Third Verification:** Manual review with regression history context. (Reviewer checks this file for similar past regressions.)

When a new prevention rule is added here, evaluate whether it should be added to the Triple Verification checklist in `Verification/TripleVerification.md`.

---

## Template for New Entries

Copy this template when logging a new regression:

```markdown
### [REG-NNN] — Brief Description

| Field | Value |
|-------|-------|
| **Date** | YYYY-MM-DD |
| **Category** | Code / Schema / Config / Performance |
| **Severity** | Critical / High / Medium / Low |
| **Discovered By** | [Brain Name] |
| **Fix Commit** | `commit-hash` or PR #NNN |
| **Prevention Rule** | PREV-NNN |

**Description:**
[What happened. User-visible symptom. How detected.]

**Root Cause:**
[Precise technical reason.]

**Timeline:**
- [When original change was deployed]
- [When regression was detected]
- [When fix was deployed]

**Fix:**
[What was done to resolve it.]

**Prevention Rule:**
[Rule derived from this regression. Add to catalog above.]
```

### ID Convention

Increment `REG-NNN` sequentially. Check the last entry before adding.

---

## Maintenance

- Review this file monthly. Verify that prevention rules are being enforced.
- When a prevention rule is automated (CI check, lint rule), mark it as "Automated" in the catalog.
- Archive entries older than 12 months to a separate `Memory/RegressionArchive.md` file.
- Cross-reference new entries against `Memory/ExperienceLog.md` for additional context.

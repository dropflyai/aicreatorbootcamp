# Known Constraints

> **Brain:** Engineering Brain
> **Category:** Memory
> **Last Updated:** 2026-02-19
> **Cross-References:** `Solutions/SolutionIndex.md`, `Memory/ExperienceLog.md`, `Memory/LearnedRules.md`

---

## What Is a Known Constraint?

A known constraint is any limitation, restriction, or unexpected behavior in tools, environments, APIs, or platforms that was **discovered during actual work** and would affect future engineering decisions.

Constraints are not opinions. They are **observed facts** -- things that were tried, failed, and yielded a concrete limitation that must be accounted for.

### What Belongs Here

- Tool limitations (e.g., "Playwright cannot interact with native file dialogs")
- Environment restrictions (e.g., "GitHub Actions runners have 14 GB RAM, not 16")
- API quotas and rate limits (e.g., "Supabase free tier: 500 MB database, 50k auth MAU")
- Browser behavior differences (e.g., "Safari does not support CSS `:has()` in pseudo-elements")
- Database engine quirks (e.g., "Supabase RLS policies do not apply to service_role key")
- Security boundaries (e.g., "GitHub Actions secrets are not available in fork PRs")

### What Does NOT Belong Here

- Theoretical limitations never encountered in practice
- Feature requests or wishlists
- Opinions about tool quality
- Temporary outages (those go in `Memory/ExperienceLog.md`)

---

## Constraint Entry Format

Every constraint entry follows this exact structure:

```markdown
### [SHORT-ID] — Brief Description

| Field | Value |
|-------|-------|
| **Date Discovered** | YYYY-MM-DD |
| **Category** | Environment / Tooling / API-Service / Browser-UI / Database / Security |
| **Severity** | Critical / High / Medium / Low |
| **Discovered By** | Brain name (e.g., Engineering Brain, Design Brain) |

**Constraint:**
One-paragraph description of the limitation. What exactly is restricted and under what conditions.

**Context:**
What task was being performed when this constraint was discovered. Include the project or feature name.

**Workaround:**
The accepted workaround, if one exists. If no workaround, state "None known" and explain impact.

**References:**
Links to documentation, issues, or commits that confirm or address this constraint.
```

---

## Categories

### Environment

Constraints related to operating systems, CI runners, container environments, file systems, and hardware limits.

Examples: disk space limits, memory caps, file descriptor limits, OS-specific path behavior, Docker image size restrictions.

### Tooling

Constraints related to developer tools, build systems, package managers, and CLI utilities.

Examples: Playwright version gaps, Node.js compatibility ceilings, pnpm workspace limitations, Webpack vs. Vite behavioral differences.

### API / Service

Constraints related to third-party APIs, SaaS platforms, rate limits, and service-level restrictions.

Examples: Supabase row limits, Stripe webhook retry behavior, Vercel serverless function timeouts, OpenAI token limits.

### Browser / UI

Constraints related to browser engines, CSS support, JavaScript runtime differences, and rendering behavior.

Examples: Safari layout bugs, Firefox scrollbar styling limitations, Chrome extension API restrictions, mobile viewport quirks.

### Database

Constraints related to database engines, query planners, migration systems, and data types.

Examples: Postgres JSON indexing limits, Supabase migration ordering requirements, connection pool ceilings, row-level security edge cases.

### Security

Constraints related to authentication, authorization, secrets management, and security boundaries.

Examples: CORS restrictions, cookie domain limits, CSP directive conflicts, secret exposure in logs, fork PR secret isolation.

---

## Example Entries

### ENV-001 — GitHub Actions Runner Memory Limit

| Field | Value |
|-------|-------|
| **Date Discovered** | 2026-01-15 |
| **Category** | Environment |
| **Severity** | Medium |
| **Discovered By** | Engineering Brain |

**Constraint:**
GitHub Actions `ubuntu-latest` runners provide 7 GB of RAM, not the 16 GB suggested by the machine spec (2-core, 7 GB). Memory-intensive builds (e.g., Next.js with large page counts) can OOM during the build stage.

**Context:**
Discovered during VoiceFly production build. The `next build` command was killed by the OOM killer after consuming 6.8 GB.

**Workaround:**
Set `NODE_OPTIONS=--max-old-space-size=6144` in the build step. For larger builds, use `ubuntu-latest-xl` runners (16 GB, requires GitHub Team or Enterprise).

**References:**
- https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners

---

### TOOL-001 — Playwright Cannot Access Native File Dialogs

| Field | Value |
|-------|-------|
| **Date Discovered** | 2026-01-22 |
| **Category** | Tooling |
| **Severity** | High |
| **Discovered By** | Engineering Brain |

**Constraint:**
Playwright cannot interact with native OS file picker dialogs. The `<input type="file">` element works via `setInputFiles()`, but any custom file picker that opens an OS-level dialog is untestable through Playwright alone.

**Context:**
Discovered while writing E2E tests for the asset upload feature. The drag-and-drop upload component uses a native dialog as fallback.

**Workaround:**
Use `page.setInputFiles()` for `<input type="file">` elements. For native dialogs, intercept the dialog trigger and mock the file selection via `page.on('filechooser')`.

**References:**
- https://playwright.dev/docs/input#upload-files

---

### API-001 — Supabase Free Tier Connection Pool Limit

| Field | Value |
|-------|-------|
| **Date Discovered** | 2026-02-03 |
| **Category** | API / Service |
| **Severity** | High |
| **Discovered By** | Engineering Brain |

**Constraint:**
Supabase free tier limits direct database connections to 60 concurrent connections. Serverless functions that open individual connections can exhaust this pool during traffic spikes.

**Context:**
Discovered during load testing of the API routes. At ~50 concurrent users, new connections began failing with "too many connections" errors.

**Workaround:**
Use Supabase's connection pooler (PgBouncer) on port 6543 instead of direct connections on port 5432. Set `pool_mode=transaction` for serverless workloads. For production, upgrade to a paid tier.

**References:**
- https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler

---

## How to Query Constraints Before Starting Work

Before starting any engineering task, check for relevant constraints:

1. **Identify the task domain.** What tools, services, and environments are involved?
2. **Scan by category.** Read all constraints in the matching category (e.g., if deploying, check Environment and API/Service).
3. **Search by keyword.** Use `grep` or search for tool names (e.g., "Playwright", "Supabase", "Safari") in this file.
4. **Check severity.** Critical and High constraints may block your approach entirely. Plan around them.
5. **Verify currency.** Constraints may become obsolete as tools update. Check the reference links for changes.

### Pre-Work Checklist

```
[ ] Scanned KnownConstraints.md for relevant entries
[ ] Checked constraint dates (any older than 6 months need re-verification)
[ ] Reviewed workarounds for applicability to current task
[ ] Noted any constraints that may require escalation
```

---

## Relationship to Solutions/SolutionIndex.md

`KnownConstraints.md` and `SolutionIndex.md` are complementary:

- **KnownConstraints.md** documents the *problems* -- what cannot be done or what behaves unexpectedly.
- **SolutionIndex.md** documents the *solutions* -- proven approaches that work around or resolve those problems.

When adding a constraint, check if a corresponding solution entry already exists. When adding a solution, check if it addresses a known constraint and cross-reference it.

---

## Template for New Entries

Copy this template when adding a new constraint:

```markdown
### [CAT-NNN] — Brief Description

| Field | Value |
|-------|-------|
| **Date Discovered** | YYYY-MM-DD |
| **Category** | Environment / Tooling / API-Service / Browser-UI / Database / Security |
| **Severity** | Critical / High / Medium / Low |
| **Discovered By** | [Brain Name] |

**Constraint:**
[Describe the limitation precisely. What is restricted? Under what conditions?]

**Context:**
[What were you doing when you discovered this? Which project/feature?]

**Workaround:**
[Accepted workaround, or "None known" with impact statement.]

**References:**
- [Link to docs, issues, or commits]
```

### ID Convention

- `ENV-NNN` — Environment constraints
- `TOOL-NNN` — Tooling constraints
- `API-NNN` — API / Service constraints
- `BROW-NNN` — Browser / UI constraints
- `DB-NNN` — Database constraints
- `SEC-NNN` — Security constraints

Increment `NNN` sequentially within each category. Check the last entry in each category before adding.

---

## Maintenance

- Review all constraints quarterly. Remove entries that are no longer applicable.
- When a tool is upgraded, re-verify all constraints related to that tool.
- Constraints with "None known" workarounds should be re-evaluated monthly.
- Archive resolved constraints at the bottom of this file rather than deleting them.

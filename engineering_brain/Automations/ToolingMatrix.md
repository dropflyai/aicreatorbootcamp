# Tooling Matrix

> **Brain:** Engineering Brain
> **Category:** Automations
> **Last Updated:** 2026-02-19
> **Cross-References:** `Automations/AutomationIndex.md`, `Automations/Recipes/`, `Solutions/ToolAuthority.md`

---

## Overview

The Tooling Matrix maps every recurring engineering task to its **primary tool**, **automation recipe**, and **fallback tool**. It exists to eliminate ambiguity about which tool to use for a given task and to ensure every task has a documented automation path.

### Purpose

1. **Consistency** -- Every engineer uses the same tool for the same task. No "I used X but you used Y" drift.
2. **Automation-first** -- Every task has a recipe reference. If the recipe does not exist yet, that gap is visible.
3. **Resilience** -- Every tool has a fallback. When the primary tool fails, there is a known alternative.
4. **Onboarding** -- New engineers can look up any task and immediately know the approved toolchain.

### How to Read the Matrix

- **Task**: The specific engineering activity.
- **Primary Tool**: The default tool for this task. Use this unless there is a documented reason not to.
- **Automation Recipe**: The recipe file that documents how to automate this task. `--` means no recipe exists yet (gap to fill).
- **Fallback Tool**: The backup tool when the primary is unavailable or unsuitable.
- **Notes**: Context, constraints, or decision rationale.

---

## Task Categories

### Testing

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| Unit tests | Vitest | `Recipes/Testing.md` | Jest | Vitest for ESM-first projects; Jest for legacy CJS |
| Integration tests | Vitest | `Recipes/Testing.md` | Jest | Same runner as unit tests for consistency |
| E2E tests (browser) | Playwright | `Recipes/Playwright.md` | Cypress | Playwright is default; see `Memory/KnownConstraints.md` TOOL-001 |
| E2E tests (API) | Playwright API testing | `Recipes/Playwright.md` | Supertest | Playwright request context keeps auth state between calls |
| Visual regression | Playwright screenshots | `Recipes/Playwright.md` | Percy | Screenshot comparison via `toHaveScreenshot()` |
| Load testing | k6 | -- | Artillery | k6 for scripted load tests; Artillery for quick smoke tests |
| Accessibility testing | axe-playwright | `Recipes/Playwright.md` | pa11y | Integrated into E2E suite via axe-core |

### Deployment

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| CI pipeline | GitHub Actions | `Recipes/CI.md` | -- | Single CI platform; no fallback needed |
| Preview deploys | Vercel | `Recipes/Deployment.md` | Netlify | Auto-deploy on PR; comment with preview URL |
| Production deploy | Vercel | `Recipes/Deployment.md` | Manual deploy | Production deploys triggered by merge to main |
| iOS deploy (TestFlight) | Fastlane + GitHub Actions | `Recipes/TestFlight.md` | Xcode Cloud | Fastlane provides more control over signing |
| Container builds | Docker | `Recipes/Docker.md` | Podman | Docker for CI; Podman for rootless local dev |
| Infrastructure as code | Terraform | -- | Pulumi | Terraform for shared infra; Pulumi where TypeScript is preferred |

### Monitoring

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| Error tracking | Sentry | `Recipes/Monitoring.md` | LogRocket | Sentry for errors; LogRocket for session replay |
| Uptime monitoring | Better Stack | -- | UptimeRobot | Better Stack for alerts + status pages |
| Performance monitoring | Vercel Analytics | -- | Lighthouse CI | Vercel for real user metrics; Lighthouse for synthetic |
| Log aggregation | Vercel Logs | -- | Axiom | Vercel native for serverless; Axiom for custom infra |
| Alerting | Better Stack | -- | PagerDuty | Better Stack for on-call routing and escalation |

### Security

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| Dependency scanning | Trivy | `Recipes/SecretsDetection.md` | npm audit | Trivy runs in CI; npm audit for local quick checks |
| Secret detection | Gitleaks | `Recipes/SecretsDetection.md` | truffleHog | Pre-commit hook + CI scan |
| SAST (static analysis) | Semgrep | -- | CodeQL | Semgrep for custom rules; CodeQL for GitHub integration |
| Container scanning | Trivy | -- | Snyk | Trivy scans images in CI pipeline |
| License compliance | license-checker | -- | FOSSA | Check dependency licenses before adding new packages |

### Documentation

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| API documentation | TypeDoc | -- | Swagger/OpenAPI | TypeDoc for TypeScript; OpenAPI for REST endpoints |
| Architecture diagrams | Mermaid | -- | Excalidraw | Mermaid for diagrams-as-code in Markdown |
| Changelog generation | changesets | -- | conventional-changelog | Changesets for monorepo versioning |
| README maintenance | Manual | -- | -- | No automation; reviewed during PR process |

### Database

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| Migrations | Supabase CLI | `Recipes/Supabase.md` | Prisma Migrate | Supabase CLI for Supabase projects; Prisma for others |
| Schema visualization | Supabase Studio | -- | dbdiagram.io | Visual schema explorer built into Supabase dashboard |
| Seed data | Custom seed scripts | `Recipes/Supabase.md` | Snaplet | Seed scripts for deterministic test data |
| Backups | Supabase automatic | -- | pg_dump | Automatic daily backups on paid plans; manual pg_dump for snapshots |
| Query optimization | EXPLAIN ANALYZE | -- | pgMustard | EXPLAIN for query plans; pgMustard for visual analysis |

### Browser / UI

| Task | Primary Tool | Automation Recipe | Fallback Tool | Notes |
|------|-------------|-------------------|---------------|-------|
| Browser automation | Playwright (Chromium) | `Recipes/Chromium.md` | Puppeteer | Playwright default browser is Chromium |
| Cross-browser testing | Playwright multi-browser | `Recipes/Playwright.md` | BrowserStack | Playwright supports Chromium, Firefox, WebKit natively |
| Responsive testing | Playwright viewports | `Recipes/Playwright.md` | Chrome DevTools | Automated viewport testing via device emulation |
| Performance profiling | Lighthouse | -- | WebPageTest | Lighthouse for automated audits; WebPageTest for deep analysis |

---

## Decision Guide for Tool Selection

When choosing between the primary and fallback tool, follow this decision tree:

### Step 1: Check the Matrix

Look up the task in the matrix above. If the primary tool is listed, use it unless one of the conditions below applies.

### Step 2: Check for Constraints

Consult `Memory/KnownConstraints.md` for any active constraints on the primary tool. If a constraint blocks your use case, switch to the fallback.

### Step 3: Check Project Context

Some tools are project-specific:
- **Supabase CLI** is only for projects using Supabase. For other databases, use the fallback.
- **Vercel** is only for projects deployed on Vercel. For other platforms, adjust accordingly.
- **Vitest** is for ESM-first projects. Legacy CommonJS projects may require Jest.

### Step 4: Check Automation Recipe Existence

If the primary tool has no recipe (`--` in the matrix), check if the fallback has one. Prefer the tool with a documented recipe over one without, unless the primary tool is clearly superior for the task.

### Step 5: When Neither Tool Fits

If neither the primary nor fallback tool fits the task:
1. Document the gap in this matrix.
2. Research alternatives and propose one.
3. Add the new tool following the process in "How to Add New Tools" below.

---

## Tool Version Requirements

All tools must be pinned to specific versions in project configuration. Floating versions cause reproducibility failures.

| Tool | Minimum Version | Pinned In | Notes |
|------|----------------|-----------|-------|
| Node.js | 20.11.0 | `.nvmrc`, CI config | LTS only; no odd-numbered versions |
| pnpm | 8.15.1 | `package.json` engines | Corepack-managed |
| Playwright | 1.42.0 | `package.json` | Must match CI browser install |
| Vitest | 1.3.0 | `package.json` | ESM-first test runner |
| Supabase CLI | 1.140.0 | CI config | Pin to avoid migration format changes |
| Trivy | 0.50.0 | CI config (action version) | Security scanner |
| Gitleaks | 8.18.0 | `.pre-commit-config.yaml` | Secret detection |
| Docker | 25.0.0 | -- | Verified on CI runners |
| Terraform | 1.7.0 | `.terraform-version` | tfenv-managed |

### Updating Tool Versions

1. Update the version in the pinning location.
2. Run the full CI pipeline on a feature branch.
3. Check `Memory/KnownConstraints.md` for constraints that may be affected.
4. Update this matrix with the new version.
5. Log the upgrade in `Memory/ExperienceLog.md`.

---

## Cross-References to Automation Recipes

All recipes are located in `Automations/Recipes/`:

| Recipe File | Covers |
|-------------|--------|
| `CI.md` | GitHub Actions pipeline configuration |
| `Playwright.md` | Browser testing, E2E, visual regression, accessibility |
| `Chromium.md` | Browser automation, headless Chromium |
| `Supabase.md` | Database migrations, seed data, RLS policies |
| `SecretsDetection.md` | Gitleaks, Trivy, pre-commit secret scanning |
| `Deployment.md` | Vercel preview and production deploys |
| `TestFlight.md` | iOS TestFlight deployment via Fastlane |
| `Docker.md` | Container builds and registry management |
| `Monitoring.md` | Sentry, Better Stack, alerting configuration |
| `Testing.md` | Vitest configuration, test splitting, coverage |
| `LogsAndErrors.md` | Log retrieval and error analysis |
| `MemoryLogging.md` | Experience logging and memory updates |
| `TimeAndDate.md` | Timezone handling and date formatting |

If a recipe does not exist yet, the matrix entry shows `--`. These gaps should be tracked and filled as the corresponding tasks are automated.

---

## How to Add New Tools to the Matrix

### Step 1: Identify the Task

Define the specific task the tool addresses. Check if the task already exists in the matrix. If it does, you are proposing a replacement, not an addition.

### Step 2: Evaluate the Tool

| Criterion | Requirement |
|-----------|-------------|
| Open source or well-funded | Must not be abandonware risk |
| CI-compatible | Must run headlessly in GitHub Actions |
| Pinnable version | Must support exact version pinning |
| Documentation quality | Must have official docs, not just blog posts |
| Community adoption | Must have >1000 GitHub stars or equivalent signal |
| Security posture | Must not require broad permissions or network access beyond its scope |

### Step 3: Add to the Matrix

1. Add a row in the appropriate category table.
2. Specify primary tool, fallback, and recipe reference.
3. Add tool version to the version requirements table.
4. Create or update the automation recipe in `Automations/Recipes/`.

### Step 4: Notify

Log the addition in `Memory/ExperienceLog.md` so other brains are aware of the new tool.

### Step 5: Validate

Run a proof-of-concept in CI to confirm the tool works in the pipeline environment. Document any constraints discovered in `Memory/KnownConstraints.md`.

---

## Maintenance

- Review the matrix quarterly. Remove deprecated tools and add newly adopted ones.
- Audit recipe gaps (`--` entries) monthly. Prioritize recipes for frequently used tools.
- When a tool is deprecated, move it to the fallback column and promote the fallback to primary.
- Cross-check with `Solutions/ToolAuthority.md` to ensure alignment on approved tools.

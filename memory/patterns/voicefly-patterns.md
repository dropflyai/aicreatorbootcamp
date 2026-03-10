# Patterns Discovered: VoiceFly Deep-Dive

**Date:** 2026-03-09
**Project:** voicefly-app

---

## Success Pattern: Parallel Specialist Audit

**Pattern Name:** Multi-Agent Parallel Audit

**When to Use:** Deep-dive codebase evaluation

**Implementation:**
1. Spawn 5 specialist agents simultaneously:
   - Backend Brain → API routes, server logic
   - Database Brain → Schema, migrations, RLS
   - Frontend Brain → UI components, state, flows
   - Integration Brain → External services, env vars
   - QA Brain → Test coverage, error handling

2. Each agent produces findings list
3. Merge and prioritize findings (P0/P1/P2)
4. Execute fixes in priority order

**Why It Works:**
- Specialists catch domain-specific issues
- Parallel execution is faster
- No blind spots from single perspective

---

## Success Pattern: Priority-Based Task Execution

**Pattern Name:** P0/P1/P2 Task Triage

**When to Use:** Multiple issues discovered during audit

**Implementation:**
- **P0 (Critical):** Blocking issues, 404 errors, security problems → Fix immediately
- **P1 (Important):** Missing core functionality, broken flows → Fix next
- **P2 (Cleanup):** Technical debt, unused code, documentation → Fix last

**Why It Works:**
- Ensures critical issues don't block progress
- Prevents wasted effort on cleanup before core works
- Clear priority prevents decision paralysis

---

## Failure Pattern: UI-Without-Backend

**Pattern Name:** Frontend-First Neglect

**Signs:**
- UI components with no API calls
- Forms that console.log instead of POST
- Buttons that change local state only
- Wizards that navigate but don't persist

**Root Cause:** Frontend built faster than backend, integration deferred indefinitely

**Prevention:**
- For every UI interaction, require corresponding API endpoint
- Code review checklist: "Where does this data go?"
- E2E tests that verify full flow

---

## Failure Pattern: Legacy Code Accumulation

**Pattern Name:** Version Coexistence

**Signs:**
- Multiple files doing similar things (email-service.ts, email-service-new.ts)
- Old approaches alongside new (shared assistant vs per-business agent)
- Unused imports that still work

**Root Cause:** V2 built without deprecating V1

**Prevention:**
- When building new implementation, delete old in same PR
- If keeping old temporarily, add TODO with deletion date
- Search for unused exports monthly

---

## Failure Pattern: Environment Variable Drift

**Pattern Name:** Local-Only Env Vars

**Signs:**
- .env.example missing variables that code uses
- Runtime errors about undefined env vars
- Onboarding friction for new developers

**Root Cause:** Developer adds to .env, forgets .env.example

**Prevention:**
- Linting rule: Every process.env.X must be in .env.example
- Pre-commit hook checking .env.example completeness
- Template script that validates env vars on startup

---

## Integration Pattern: Onboarding → Agent Configuration

**Pattern Name:** Wizard-to-Service Sync

**When to Use:** User preferences should configure external services

**Implementation:**
1. Wizard collects preferences (voice, use case, etc.)
2. On completion, call API endpoint
3. API endpoint:
   - Saves preferences to database
   - Updates external service (VAPI agent in this case)
   - Returns success confirmation
4. Redirect to dashboard

**Key Insight:** Preferences must affect the actual service, not just be stored

---

## Verification Pattern: Build Before Done

**Pattern Name:** Production Build Gate

**When to Use:** Before claiming any task complete

**Implementation:**
```bash
npm run build
echo $?  # Must be 0
```

**What It Catches:**
- Import errors
- Type mismatches
- Missing dependencies
- Suspense boundary issues
- Dead code that fails on compile

**Key Insight:** Development server is forgiving; production build is not

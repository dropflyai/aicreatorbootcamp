# Critical Learnings

> **NEVER FORGET THESE.** Read before every session.

---

## 1. NEVER Say "Done" Without Verification

**Added:** 2026-03-06
**Source:** FitFly false verification incident

The verification script MUST pass before claiming completion:
```bash
./scripts/verify/px1000-verify.sh
# Exit code MUST be 0
```

If exit code is 1, the task is NOT done. Fix and re-run.

---

## 2. Memory System Has Two Layers

**Added:** 2026-03-06
**Source:** Memory audit session

| Layer | Purpose | Works Without Setup |
|-------|---------|---------------------|
| Layer 1 | `.claude/` files, session logs | YES |
| Layer 2 | Supabase database | NO - needs credentials |

Always use Layer 1. Layer 2 is for deep queries.

---

## 3. Credential Protocol

**Added:** 2026-03-06
**Source:** Repeated credential loss

When user gives credentials:
1. Put in `/credentials/.env`
2. Copy to `/agents/.env` if needed
3. Update `.claude/credentials.md` status
4. Log to session file
5. NEVER put in CLAUDE.md or other tracked files

---

## 4. Session Logging Is Mandatory

**Added:** 2026-03-06
**Source:** Memory audit

Every session that does significant work MUST:
1. Log to `memory/sessions/YYYY-MM-DD.md`
2. Update `.claude/recent.md`
3. Add to `.claude/critical.md` if learned something important

No exceptions. This is how the brain gets smarter.

---

## 5. Path Reference

**Added:** 2026-03-06

prototype_x1000 is at:
```
/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/
```

NOT at `/DropFly-PROJECTS/prototype_x1000/` (that path doesn't exist).

---

## 6. ALL WORK ROUTES THROUGH CEO BRAIN — NO EXCEPTIONS

**Added:** 2026-03-06
**Source:** User feedback on drift and violations

```
THE GOLDEN RULE:
ALL WORK FLOWS THROUGH CEO BRAIN.
NO EXCEPTIONS. NO SHORTCUTS. NO FREELANCING.
```

If you catch yourself about to write code or make decisions without routing through CEO Brain:
1. STOP immediately
2. Say: "I was about to bypass the brain system."
3. Re-route through CEO Brain

Freelancing feels faster but creates rework. Specialists are better than generalists.

---

## 7. Mandatory Output Requirements

**Added:** 2026-03-06
**Source:** User requirement for transparency

Every response involving work MUST include:

1. **BRAINS USED** — List each brain and what it did
2. **ACTIONS TAKEN** — Summarize what was done
3. **SOURCES** — Cite all research (URLs, references)

If you can't list brains used, you bypassed the system.
No sources = no research credibility.

---

## 8. Brain System Database Is Live

**Added:** 2026-03-06
**Source:** Migration session

Supabase project "Brain System" is configured and has all tables:
- Project ID: swvferahilyuquqjpzwn
- URL: https://swvferahilyuquqjpzwn.supabase.co
- Credentials: `/prototype_x1000/credentials/.env`
- CLI is linked (can use `supabase` commands)

Tables include: shared_experiences, shared_patterns, shared_failures, and brain-specific tables.

---

## 9. PHD-LEVEL QUALITY STANDARD — NON-NEGOTIABLE

**Added:** 2026-03-06
**Source:** User directive on quality standards

```
SPEED IS NOT OUR FRIEND.
ACCURACY IS. EFFICIENCY IS. RESULTS THAT ACTUALLY WORK ARE.
```

Every brain, every system, every output must be built to the **highest academic/expert level**:

1. **Theoretical Foundations** — Cite academic research, not just "best practices"
2. **Proper References** — Include sources (papers, books, authoritative docs)
3. **Comprehensive Coverage** — Don't skip sections to save time
4. **Expert-Level Depth** — PhD level, not practitioner level
5. **Get It Right First Time** — Less circling back, more thoroughness upfront

**Why this matters:**
- Quick/shallow work creates rework
- "Fast" solutions that don't work waste more time than slow solutions that do
- The brain system exists to build the BEST products, not the fastest ones

**Before creating anything, ask:**
- Is this at PhD/expert level?
- Would an academic reviewer approve this?
- Are there proper citations and research?
- Is this comprehensive or am I cutting corners?

---

## Template for Adding New Learnings

```
## [Number]. [Title]

**Added:** YYYY-MM-DD
**Source:** [Where this learning came from]

[The learning, kept concise but actionable]
```

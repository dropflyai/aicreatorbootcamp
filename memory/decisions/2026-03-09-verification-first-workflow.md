# Decision: Verification-First Workflow

**Date:** 2026-03-09
**Decision Maker:** CEO Brain + User
**Project:** prototype_x1000

---

## Context

During brain-building work, completion was claimed without verification. User discovered 12 brains did not meet PhD standard despite being told "all done."

This created a trust issue:
> "you just told me they were all done and all phd level and one simple audit tells us that was a lie"

---

## Decision

**Establish verification-first workflow for ALL completion claims.**

### The Rule

```
1. RUN verify-brain-quality.sh (get current state)
2. IDENTIFY what needs work
3. DO the work
4. RUN verify-brain-quality.sh AGAIN
5. ONLY claim "done" if exit code is 0
```

### Trigger Words Requiring Verification

Before saying ANY of these, run verification:
- "done"
- "complete"
- "finished"
- "all brains pass"
- "PhD level"
- "upgraded"

---

## Rationale

1. **Trust requires evidence** — Claims without proof are worthless
2. **Agents can be wrong** — Don't trust delegated work without checking
3. **Numbers drift** — "37 brains" was never verified, turned out to be wrong
4. **Exit code is truth** — 0 means done, 1 means not done

---

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|--------------|
| Trust agent reports | Already failed — caused false completion claim |
| Manual review | Too slow, inconsistent |
| No verification | Unacceptable after trust breach |

---

## Implementation

1. Created `scripts/verify-brain-quality.sh`
2. Added to master CLAUDE.md verification gate
3. Must be run before any completion claim
4. Exit code 1 = go back and fix

---

## Success Criteria

- Zero false completion claims
- All future work verified before claiming done
- Exit code included in completion reports

# Learning: Never Claim Done Without Verification

**Date:** 2026-03-09
**Source:** Brain completion audit
**Category:** Process
**Confidence:** High (learned from failure)

---

## Context

Built 21 brains via 5 parallel agent teams. Claimed all brains were at PhD level. User requested audit. Audit revealed 12 brains failed verification.

User response:
> "you just told me they were all done and all phd level and one simple audit tells us that was a lie. what do we need to do to be more efficient and actually deliver what we say we are or not say it"

---

## Learning

**Never claim completion without running verification.**

The workflow must be:
```
1. Do the work
2. Run verification script
3. If exit code = 1, fix and re-run
4. Only claim done when exit code = 0
5. Include verification evidence in response
```

---

## Root Causes of Failure

1. **Trusted agent reports** — Teams said "done", I relayed it without checking
2. **No pre-work inventory** — Didn't know 12 brains existed but weren't in scope
3. **No verification script existed** — Had to create one after the failure
4. **Repeated unverified numbers** — "37 brains" was in docs but never verified

---

## Application

### Before ANY completion claim:

```bash
./scripts/verify-brain-quality.sh
echo $?  # Must be 0
```

### In completion response, include:

```
VERIFICATION EVIDENCE:
- Script: verify-brain-quality.sh
- Exit code: 0
- Passed: X/X
- Failed: 0
```

---

## Pattern Recognition Trigger

When about to say:
- "done"
- "complete"
- "all pass"
- "PhD level"

**STOP. Run verification first.**

---

## Tags

`verification`, `process`, `trust`, `completion`, `quality-gate`

# Debugger Brain — Learned Patterns

Patterns extracted from 3+ occurrences in the Experience Log.

---

## Pattern Format

```markdown
### Pattern: [Name]

**Observed:** [Number] times
**First Seen:** YYYY-MM-DD
**Last Seen:** YYYY-MM-DD

**Trigger:** [What causes this bug]
**Symptoms:** [How it manifests]
**Root Cause:** [Underlying reason]
**Fix:** [Standard solution]
**Prevention:** [How to avoid]
**Example IDs:** [Supabase IDs of examples]
```

---

## Patterns

### Pattern: Bootstrap Memory Failure

**Observed:** 1 time (promoted due to severity)
**First Seen:** 2026-03-06
**Last Seen:** 2026-03-06

**Trigger:** System depends on external service for bootstrap context
**Symptoms:**
- Credentials lost between sessions
- Same conversations repeated
- System appears to "forget" everything
- Configuration never persists

**Root Cause:** External dependency (database) required before local context is available — chicken-and-egg problem

**Fix:** Create two-layer memory:
1. Layer 1: File-based, zero dependencies, always works
2. Layer 2: External service for deep features

**Prevention:**
- Always design systems with offline-first bootstrap
- Never depend solely on external services for critical context
- Local files should contain enough to bootstrap

**Example IDs:** cf9208e8-e2f6-4a2c-b6be-c0df2de9ac00

---

*Add new patterns as they are extracted from the Experience Log.*

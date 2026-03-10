# Debugger Brain — Experience Log

This file tracks significant debugging experiences for pattern extraction.

---

## How To Use This File

1. After fixing a significant bug, add an entry here
2. Include key learnings
3. Reference Supabase ID if logged there
4. Review periodically for patterns

---

## Experience Format

```markdown
### YYYY-MM-DD — [Brief Title]

**Bug:** [What was broken]
**Root Cause:** [Why]
**Fix:** [What solved it]
**Learning:** [Key takeaway]
**Supabase ID:** [if logged]
**Tags:** [tags]
```

---

## Experiences

### 2026-03-06 — Memory System Initialization

**Bug:** Memory system not logging anything, brain system "getting dumber"
**Root Cause:** Chicken-and-egg problem — memory needed Supabase, Supabase credentials weren't stored, no bootstrap memory existed
**Fix:** Created two-layer memory system:
- Layer 1: File-based (.claude/ directory) — works without dependencies
- Layer 2: Supabase — for deep queries
**Learning:** Always have a bootstrap memory layer that works with zero external dependencies
**Supabase ID:** cf9208e8-e2f6-4a2c-b6be-c0df2de9ac00
**Tags:** `memory-system`, `architecture`, `bootstrap`

---

## Pattern Extraction

When you see 3+ similar bugs in this log:
1. Extract the pattern
2. Add to `/04_patterns/common_patterns.md`
3. Note the pattern here with date extracted

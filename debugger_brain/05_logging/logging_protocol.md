# Logging Protocol

## THE CARDINAL RULE

**Every bug MUST be logged to memory. No exceptions.**

An unlogged fix is:
- Lost knowledge
- A future wasted hour
- A violation of the Debugger Brain mission

---

## Where To Log

### 1. Project Local (Immediate)
```
/[project]/.claude/errors/YYYY-MM-DD-[brief-name].md
```

### 2. Supabase (Persistent)
```
Table: shared_experiences
brain_type: "debugger"
category: "success" (if fixed) or "failure" (if unresolved)
```

### 3. Pattern Library (If Recurring)
```
/debugger_brain/04_patterns/common_patterns.md
```

---

## Bug Log Format

```markdown
# Bug Log: [Brief Description]

**Date:** YYYY-MM-DD
**Project:** [Project Name]
**Severity:** CRITICAL | HIGH | MEDIUM | LOW

## Error

```
[Exact error message]
```

## Location
- **File:** [path/to/file]
- **Line:** [line number]
- **Function:** [function name]

## Context
[What was happening when bug occurred]

## Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Root Cause
[Why this bug occurred]

## Fix Applied
[What code/config was changed]

## Verification
- [ ] Original reproduction no longer triggers bug
- [ ] Related tests pass
- [ ] Regression tests pass

## Prevention
[How to prevent this in future]

## Tags
`[tag1]` `[tag2]` `[tag3]`
```

---

## Supabase Log Command

```bash
curl -X POST "$SUPABASE_URL/rest/v1/shared_experiences" \
  -H "apikey: $SUPABASE_SERVICE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "brain_type": "debugger",
    "project_id": "[project-name]",
    "category": "success",
    "task_summary": "Fixed: [brief description]",
    "problem": "[error message and context]",
    "solution": "[what fixed it]",
    "lessons_learned": "[key takeaway]",
    "tags": ["tag1", "tag2", "tag3"]
  }'
```

---

## When To Update Pattern Library

Add to `04_patterns/common_patterns.md` when:
- Bug has been seen 3+ times
- Bug is likely to recur
- Bug has a clear pattern/solution

---

## Logging Checklist

After EVERY bug fix:

```
[ ] Logged to project .claude/ directory
[ ] Logged to Supabase shared_experiences
[ ] Added to pattern library (if recurring)
[ ] Updated relevant documentation (if needed)
```

**All boxes must be checked before claiming "fixed".**

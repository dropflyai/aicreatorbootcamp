# Memory Query Shortcuts

Quick reference for querying the prototype_x1000 memory system.

---

## Quick Queries

### "What do we know about X?"
```bash
# Search all memory for a topic
grep -r "topic" /Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/memory/
```

### "What failed before?"
```bash
# Check errors directory
ls -la memory/errors/
cat memory/errors/*.md
```

### "What patterns do we have?"
```bash
# Check patterns directory
ls -la memory/patterns/
cat memory/patterns/*.md
```

### "What did we learn?"
```bash
# Check learnings directory
ls -la memory/learnings/
cat memory/learnings/*.md
```

### "What decisions were made?"
```bash
# Check decisions directory
ls -la memory/decisions/
cat memory/decisions/*.json
```

---

## Memory Directories

| Directory | Purpose | When to Query |
|-----------|---------|---------------|
| `decisions/` | Logged decisions with rationale | Before making similar decisions |
| `errors/` | Past errors and how they were fixed | When debugging similar issues |
| `learnings/` | Extracted learnings and insights | Before starting new work |
| `patterns/` | Success and failure patterns | When designing solutions |
| `projects/` | Project-specific context | When working on a project |
| `sessions/` | Session logs and outcomes | For context on recent work |
| `solutions/` | Verified solutions that worked | When facing similar problems |
| `collaborations/` | Brain collaboration logs | For multi-brain decisions |
| `debates/` | Brain debate outcomes | For controversial decisions |

---

## Query Patterns

### Pattern 1: Before Starting Work

```
QUERY SEQUENCE:
1. Check learnings: memory/learnings/
2. Check patterns: memory/patterns/
3. Check related decisions: memory/decisions/
4. Check recent sessions: memory/sessions/
```

### Pattern 2: When Debugging

```
QUERY SEQUENCE:
1. Check errors: memory/errors/
2. Check solutions: memory/solutions/
3. Search for similar issues: grep -r "error message" memory/
```

### Pattern 3: When Making Decisions

```
QUERY SEQUENCE:
1. Check past decisions: memory/decisions/
2. Check debates: memory/debates/
3. Check patterns: memory/patterns/
```

### Pattern 4: After Completing Work

```
LOG SEQUENCE:
1. Log decision to memory/decisions/
2. Log learnings to memory/learnings/
3. Update session log in memory/sessions/
4. If error was fixed, log to memory/solutions/
```

---

## File Formats

### Decision Log (JSON)
```json
{
  "decision": "What was decided",
  "rationale": "Why it was decided",
  "alternatives": ["Option A", "Option B"],
  "date": "2026-03-09",
  "brain": "CEO Brain",
  "project": "project-name"
}
```

### Learning Log (Markdown)
```markdown
# Learning: [Title]
**Date:** 2026-03-09
**Project:** project-name
**Brain:** Engineering Brain

## Context
What was the situation?

## Learning
What did we learn?

## Application
How should this be applied in the future?
```

### Error Log (Markdown)
```markdown
# Error: [Error Name]
**Date:** 2026-03-09
**Project:** project-name

## Symptoms
What happened?

## Root Cause
Why did it happen?

## Resolution
How was it fixed?

## Prevention
How to prevent in future?
```

---

## Common Queries by Brain

### Engineering Brain Queries
- `memory/patterns/engineering/`
- `memory/errors/`
- `memory/solutions/`

### Design Brain Queries
- `memory/patterns/design/`
- `memory/decisions/` (filter for design)

### CEO Brain Queries
- `memory/decisions/`
- `memory/collaborations/`
- `memory/debates/`

### QA Brain Queries
- `memory/errors/`
- `memory/patterns/testing/`

---

## Integration with Brain System

When a brain is activated, it should:

1. **Query memory first** — Check for relevant past work
2. **Apply learnings** — Use patterns and avoid known failures
3. **Log outcomes** — Record decisions, errors, and learnings
4. **Update patterns** — Add new patterns when discovered

**Memory is the system's institutional knowledge. USE IT.**

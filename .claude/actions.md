# Action Protocols

> When X happens, do Y. No thinking required, just follow the protocol.

---

## When User Provides Credentials

```
TRIGGER: User pastes API keys, .env content, or credentials

ACTION:
1. Identify the service (Supabase, Anthropic, etc.)
2. Identify the project (prototype_x1000, FitFly, etc.)
3. Create .env file at: /[project]/credentials/.env
4. If agents need it, also create: /[project]/agents/.env
5. Update .claude/credentials.md status to CONFIGURED
6. If Supabase, ask if user wants migration run
7. Log action to memory/sessions/YYYY-MM-DD.md
8. Confirm to user with file paths created
```

---

## When Starting A Session

```
TRIGGER: New conversation about prototype_x1000

ACTION:
1. Read .claude/context.md
2. Read .claude/recent.md
3. Read .claude/critical.md
4. Note any blockers or pending items
5. THEN address user's request
```

---

## When Ending A Session (Significant Work Done)

```
TRIGGER: Session involved code changes, decisions, or learnings

ACTION:
1. Create/update memory/sessions/YYYY-MM-DD.md
2. Add entry to .claude/recent.md (keep last 10)
3. If learned something critical, add to .claude/critical.md
4. If error occurred and was fixed, log to memory/errors/
```

---

## When User Says "Done" or "Complete"

```
TRIGGER: About to claim task completion

ACTION:
1. STOP - Do not say done yet
2. Run: ./scripts/verify/px1000-verify.sh
3. Check exit code
4. If exit code 1: Fix issues, re-run
5. If exit code 0: Include evidence in response
6. THEN say done with verification proof
```

---

## When User Asks About Past Work

```
TRIGGER: "What did we do before?", "Have we tried this?", etc.

ACTION:
1. Check .claude/recent.md for recent sessions
2. Check memory/sessions/ for older logs
3. Check memory/errors/ if asking about bugs
4. Check memory/decisions/ if asking about choices
5. If can't find locally, query Supabase (if configured)
```

---

## When An Error Occurs

```
TRIGGER: Bug found, error thrown, something breaks

ACTION:
1. Document the error in memory/errors/YYYY-MM-DD-[brief-name].md
2. Include: error message, context, root cause, fix applied
3. Add to .claude/critical.md if likely to recur
4. Update session log
```

---

## When Building A New Feature

```
TRIGGER: User requests new functionality

ACTION:
1. Check .claude/critical.md for relevant warnings
2. Check memory/patterns/ for similar past work
3. Check memory/errors/ for related past failures
4. Plan with awareness of history
5. Build
6. Verify
7. Log
```

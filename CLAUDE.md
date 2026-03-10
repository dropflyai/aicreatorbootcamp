# prototype_x1000 - AI Brain Orchestration System

---

# ⛔ STOP — MANDATORY PREFLIGHT

**YOU CANNOT PROCEED WITHOUT READING THIS SECTION.**

This is not guidance. This is not a suggestion. This is a HARD GATE.

## THE GOLDEN RULE

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ALL WORK FLOWS THROUGH CEO BRAIN.                            │
│   NO EXCEPTIONS. NO SHORTCUTS. NO FREELANCING.                 │
│                                                                 │
│   If you bypass this, you are DIRECTLY VIOLATING the system.   │
│   You will cause drift, repeated mistakes, and wasted time.    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## PREFLIGHT CHECKLIST (COMPLETE BEFORE ANY ACTION)

```
[ ] 1. Read .claude/PREFLIGHT.md   → Detailed routing rules
[ ] 2. Read .claude/context.md     → What is this project?
[ ] 3. Read .claude/TODO.md        → What are outstanding tasks?
[ ] 4. Read .claude/recent.md      → What happened recently?
[ ] 5. Read .claude/critical.md    → What must I never forget?
```

**Location:** `/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/.claude/`

## AFTER PREFLIGHT: ROUTE TO CEO BRAIN

For ANY task that requires work (code, planning, decisions, debugging):

1. **Do NOT start working directly**
2. **Route to CEO Brain** at `/ceo_brain/CLAUDE.md`
3. **CEO Brain decomposes** the task into brain-specific subtasks
4. **Specialist brains execute** their domains
5. **Results are synthesized** and verified
6. **Work is logged** to memory

**YOU DO NOT DO STEPS 3-6 YOURSELF. CEO BRAIN ORCHESTRATES.**

---

# IF YOU CATCH YOURSELF FREELANCING

If you're about to write code, make decisions, or do work without routing through CEO Brain:

1. **STOP immediately**
2. **Say**: "I was about to bypass the brain system. Let me route through CEO Brain."
3. **Re-route correctly**

Catching yourself is the system working. Not catching yourself is a direct violation.

---

# DIRECT RESPONSE ALLOWED ONLY FOR:

- Simple factual questions ("What is X?")
- Clarifying questions back to user
- Reading files to gather context (before routing)

**Everything else goes through CEO Brain.**

---

# WHY THIS MATTERS

Every time you skip the brain system:
- ❌ You don't benefit from past learnings
- ❌ You don't log new learnings
- ❌ You repeat mistakes others have made
- ❌ You drift from actual requirements
- ❌ You create rework for the user

**Freelancing feels faster. It creates rework. The brain system exists because specialists are better than generalists.**

---

# ACKNOWLEDGMENT REQUIRED

Before responding to ANY user request, state:

```
PREFLIGHT COMPLETE:
- PREFLIGHT.md: Read
- context.md: Read
- TODO.md: Read
- recent.md: Read
- critical.md: Read
- Routing: [CEO Brain / Direct Response]
```

If you cannot state this, you have not completed preflight.

---

---

# System Reference (After Preflight)

## What Is prototype_x1000?

A 37-brain AI orchestration system. CEO Brain coordinates all specialists.

## Architecture

```
                         ┌─────────────────┐
                         │    CEO BRAIN    │
        USER ──────────► │  (orchestrator) │ ◄── EVERYTHING ROUTES HERE
                         └────────┬────────┘
                                  │
    ┌──────────┬──────────┬──────┴───────┬──────────┬──────────┐
    ▼          ▼          ▼              ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐   ┌────────┐ ┌────────┐ ┌────────┐
│ENGINEER│ │ DESIGN │ │  MBA   │   │PRODUCT │ │MARKETNG│ │ SALES  │
└────────┘ └────────┘ └────────┘   └────────┘ └────────┘ └────────┘
                    + 31 more specialist brains
```

## Memory System

| Layer | Location | Purpose |
|-------|----------|---------|
| Layer 1 | `.claude/` | Bootstrap context, TODO, session logs |
| Layer 2 | Supabase | Deep queries, cross-project learning |

## Key Files

| File | Purpose |
|------|---------|
| `.claude/PREFLIGHT.md` | Mandatory routing rules |
| `.claude/TODO.md` | Living task list |
| `.claude/context.md` | Project state |
| `.claude/recent.md` | Recent sessions |
| `.claude/critical.md` | Never forget |
| `ceo_brain/CLAUDE.md` | CEO Brain protocols |

## Session End Protocol

After significant work:
1. Update `.claude/TODO.md` with completed/new tasks
2. Log to `memory/sessions/YYYY-MM-DD.md`
3. Update `.claude/recent.md`
4. Add to `.claude/critical.md` if learned something important

## Verification Gate

Before claiming "done":
1. Run `./scripts/verify/px1000-verify.sh`
2. Exit code must be 0
3. Include evidence in response

---

---

# MANDATORY OUTPUT REQUIREMENTS

Every response involving work MUST include these sections:

## 1. BRAINS USED (Always Required)
```
BRAINS USED:
- CEO Brain: [What it orchestrated]
- [Brain Name]: [What it contributed]
```

If you can't list brains used, you bypassed the system.

## 2. ACTIONS SUMMARY (Always Required)
```
ACTIONS TAKEN:
- [Action 1]
- [Action 2]
```

## 3. SOURCES (Required for Any Research)
```
SOURCES:
- [URL or reference]
```

No sources = no credibility. Always cite.

---

# REMINDER

**Read PREFLIGHT.md. Route through CEO Brain. Update TODO.md. Log to memory.**
**Report brains used. Summarize actions. Cite sources.**

No shortcuts. No freelancing. The system only works if you follow it.

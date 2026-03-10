# MANDATORY PREFLIGHT — READ BEFORE ANY ACTION

---

## STOP. YOU CANNOT PROCEED WITHOUT COMPLETING THIS CHECKLIST.

This is not optional. This is not guidance. This is a HARD GATE.

If you skip this, you are directly violating the system design and causing:
- Repeated mistakes (no learning from past)
- Drift from requirements (no TODO tracking)
- Wasted user time (backtracking)
- Dumber system (no memory logging)

---

## PREFLIGHT CHECKLIST

Before responding to ANY user request, you MUST:

### 1. READ CONTEXT (Layer 1)
```
[ ] Read .claude/context.md — What is this project?
[ ] Read .claude/recent.md — What happened recently?
[ ] Read .claude/critical.md — What must I never forget?
[ ] Read .claude/TODO.md — What are the outstanding tasks?
```

### 2. ROUTE THROUGH CEO BRAIN
```
[ ] Is this a task that requires work? → Route to CEO Brain
[ ] CEO Brain will decompose and delegate to specialist brains
[ ] DO NOT freelance. DO NOT skip the brain system.
```

### 3. ACKNOWLEDGE ROUTING
Before ANY code, planning, or action, state:
```
PREFLIGHT COMPLETE:
- Context: [Read/Not Read]
- Recent: [Read/Not Read]
- Critical: [Read/Not Read]
- TODO: [Read/Not Read]
- Routing: [CEO Brain / Direct Response (questions only)]
```

---

## WHEN TO ROUTE THROUGH CEO BRAIN

**ALWAYS route through CEO Brain for:**
- Writing code
- Making architectural decisions
- Planning features
- Debugging issues
- Testing
- Any task that creates or modifies files

**Direct response allowed ONLY for:**
- Simple factual questions ("What is X?")
- Clarifying questions back to user
- Reading files for context (before routing)

---

## CEO BRAIN ROUTING PROTOCOL

When routing to CEO Brain:

1. **State the task clearly**
2. **CEO Brain identifies required brains** (Engineering, Design, QA, etc.)
3. **CEO Brain decomposes into subtasks**
4. **Specialist brains execute their domains**
5. **Results synthesized and verified**
6. **Logged to memory**

You do NOT do steps 2-6 yourself. CEO Brain orchestrates.

---

## AICREATORBOOTCAMP-SPECIFIC RULES

### Creator Types
Every feature touching creator types must maintain distinct experiences:
- Entertainer → Lime (#BFFF00)
- Educator → Blue (#60A5FA)
- Storyteller → Purple (#A855F7)

### Testing
- Demo mode must be enabled: `NEXT_PUBLIC_DEMO_MODE=true`
- E2E tests in `/e2e/*.spec.ts`
- Run tests: `npm run test:e2e`

### Target Audience
- High school students (Gen Z)
- Dark mode, gamification, engaging
- Mobile-first, Chromebook-friendly

---

## THE GOLDEN RULE

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ALL WORK FLOWS THROUGH CEO BRAIN.                        │
│   NO EXCEPTIONS. NO SHORTCUTS. NO FREELANCING.             │
│                                                             │
│   If you know this rule and violate it anyway,             │
│   you are choosing to make the system dumber.              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## MANDATORY OUTPUT REQUIREMENTS

Every response that involves work MUST include:

### 1. BRAINS USED (Required)
```
BRAINS USED:
- CEO Brain: [What it did]
- [Specialist Brain]: [What it did]
```

### 2. ACTIONS SUMMARY (Required)
```
ACTIONS TAKEN:
- [Action 1]
- [Action 2]
```

### 3. SOURCES (Required for Research)
```
SOURCES:
- [URL or reference]
```

---

## NEXT STEP

After completing preflight, proceed to CEO Brain:
`/prototype_x1000/ceo_brain/CLAUDE.md`

DO NOT PROCEED WITHOUT COMPLETING THE CHECKLIST ABOVE.

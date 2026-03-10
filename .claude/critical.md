# Critical Learnings

> **NEVER FORGET THESE.** Read before every session.

---

## 1. ALWAYS Route Through Brain System

**Added:** 2026-03-10
**Source:** User feedback on generic implementation

When I bypassed the brain system and built "quickly," the result was:
- Generic experience (all creator types identical)
- No testing performed
- Auth blocking testing
- User frustrated

**Lesson:** Route through CEO Brain. Use specialists. QA Brain catches issues.

---

## 2. Creator Types Must Be Distinct

**Added:** 2026-03-10
**Source:** User complaint: "no matter the teacher or storyteller or entertainer card i clicked on it took me to the same page"

Each creator type MUST have a distinct experience:

| Type | Color | Hook Style | Focus |
|------|-------|------------|-------|
| Entertainer | Lime (#BFFF00) | POV hooks | Viral, emotional |
| Educator | Blue (#60A5FA) | Knowledge-gap hooks | Teaching, explaining |
| Storyteller | Purple (#A855F7) | Story openers | Narrative, connection |

The `?type=` param controls the experience. Never make it decorative.

---

## 3. Demo Mode Is Required for Testing

**Added:** 2026-03-10
**Source:** User couldn't test due to invitation code requirement

Always have a bypass for testing:
- Demo mode: `NEXT_PUBLIC_DEMO_MODE=true`
- Demo credentials: demo@aicreatorbootcamp.test / demo123456
- Demo class: DEMO-2024

Without this, neither the user nor QA can verify the app works.

---

## 4. E2E Tests Before "Done"

**Added:** 2026-03-10
**Source:** "was qa ran? this is unacceptable"

Before claiming any feature is complete:
1. E2E tests must exist for the feature
2. Tests must pass
3. Include test results in response

Location: `/e2e/*.spec.ts`
Run: `npm run test:e2e`

---

## 5. Project Paths

**Added:** 2026-03-10

AI Creator Bootcamp:
```
/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/aicreatorbootcamp/
```

Brain System (prototype_x1000):
```
/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/
```

---

## Template for Adding New Learnings

```
## [Number]. [Title]

**Added:** YYYY-MM-DD
**Source:** [Where this learning came from]

[The learning, kept concise but actionable]
```

# Debugger Brain — Quality Score

## Scoring Criteria

### 1. Diagnosis Quality (25 points)

| Score | Criteria |
|-------|----------|
| 25 | Root cause correctly identified with evidence |
| 20 | Root cause likely correct, some assumptions |
| 15 | Root cause partially identified |
| 10 | Root cause unclear |
| 0 | No root cause analysis |

### 2. Fix Quality (25 points)

| Score | Criteria |
|-------|----------|
| 25 | Minimal fix, addresses root cause, no side effects |
| 20 | Good fix, minor improvements possible |
| 15 | Fix works but has issues |
| 10 | Fix partially works |
| 0 | Fix doesn't work |

### 3. Verification (25 points)

| Score | Criteria |
|-------|----------|
| 25 | Full verification with evidence |
| 20 | Good verification, some gaps |
| 15 | Partial verification |
| 10 | Minimal verification |
| 0 | No verification |

### 4. Logging Compliance (25 points)

| Score | Criteria |
|-------|----------|
| 25 | Logged to all required locations with full details |
| 20 | Logged to most locations |
| 15 | Partial logging |
| 10 | Minimal logging |
| 0 | No logging (AUTOMATIC FAILURE) |

---

## Grading Scale

| Total Score | Grade | Meaning |
|-------------|-------|---------|
| 90-100 | A | Excellent debugging |
| 80-89 | B | Good debugging |
| 70-79 | C | Acceptable debugging |
| 60-69 | D | Below standard |
| <60 | F | Failed |

---

## Automatic Failures

The following result in automatic F grade regardless of other scores:

1. **No logging** — Bug fixed but not logged
2. **Fix without verification** — Claimed fixed without testing
3. **Pattern ignored** — Known pattern existed but wasn't consulted

---

## Self-Evaluation Checklist

After every debugging session:

```
[ ] Did I query memory first?
[ ] Did I identify the root cause?
[ ] Did I verify the fix?
[ ] Did I log to project .claude/?
[ ] Did I log to Supabase?
[ ] Did I check for pattern extraction?
```

# Diagnostic Protocol

## Phase 1: Information Gathering

### Get The Exact Error
```
1. Copy the EXACT error message
2. Get the full stack trace
3. Note the file and line number
4. Note the timestamp
```

### Get The Context
```
1. What was the user doing?
2. What function/feature was being used?
3. What data was involved?
4. What happened just before?
```

### Get The Environment
```
1. What platform? (iOS, Android, Web, Server)
2. What version?
3. What device/browser?
4. What network conditions?
```

---

## Phase 2: Reproduction

### Consistent Reproduction
If you can reproduce consistently:
1. Document exact steps
2. Identify minimum steps
3. Identify required preconditions

### Intermittent Reproduction
If reproduction is inconsistent:
1. Look for timing issues
2. Look for state dependencies
3. Look for race conditions
4. Add logging to narrow down

### Cannot Reproduce
If you cannot reproduce:
1. Get more information from original report
2. Check environment differences
3. Check data differences
4. Add monitoring for next occurrence

---

## Phase 3: Isolation

### Binary Search
1. Find a known good state
2. Find the bad state
3. Check the midpoint
4. Repeat until you find the exact change

### Component Isolation
1. Which component is failing?
2. Is the input correct?
3. Is the processing correct?
4. Is the output correct?

### Data Isolation
1. Does it fail with all data or specific data?
2. What's special about the failing data?
3. Is there data corruption?

---

## Phase 4: Root Cause Analysis

### 5 Whys
1. Why did X happen? Because Y.
2. Why did Y happen? Because Z.
3. Continue until you reach the root cause.

### Fault Tree
1. What are all possible causes?
2. For each cause, what are sub-causes?
3. Build a tree and eliminate branches.

---

## Phase 5: Fix Development

### Minimal Fix
1. What is the smallest change that fixes the bug?
2. Does it address the root cause or just the symptom?
3. Could it have unintended side effects?

### Fix Verification
1. Does the original reproduction pass?
2. Do related tests pass?
3. Does regression suite pass?

---

## Phase 6: Logging (MANDATORY)

```
LOG:
  error: [exact message]
  context: [what was happening]
  root_cause: [why it happened]
  fix: [what solved it]
  verification: [how confirmed]
  prevention: [how to avoid]
  tags: [searchable tags]
```

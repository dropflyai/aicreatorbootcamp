# Fix Verification Protocol

## The Verification Checklist

A bug is NOT fixed until ALL of these pass:

### 1. Reproduction Test
```
[ ] Original reproduction steps no longer trigger the bug
[ ] Edge cases of reproduction tested
[ ] Different data inputs tested
```

### 2. Regression Test
```
[ ] Related functionality still works
[ ] Adjacent components unaffected
[ ] Integration points verified
```

### 3. Code Review
```
[ ] Fix is minimal (no unnecessary changes)
[ ] Fix addresses root cause (not just symptoms)
[ ] Fix doesn't introduce new issues
[ ] Fix follows code style
```

### 4. Documentation
```
[ ] Bug logged to .claude/ directory
[ ] Bug logged to Supabase
[ ] Pattern updated if recurring
[ ] Code comments added if needed
```

---

## Verification Evidence

Every fix MUST include evidence:

### For UI Bugs
- Screenshot of working state
- Playwright test if applicable

### For API Bugs
- Curl command showing success
- Log output showing correct behavior

### For Logic Bugs
- Test case output
- Console log showing correct values

### For Build Bugs
- Build output showing success
- Deploy confirmation

---

## Verification Levels

### Level 1: Quick Fix (Low Risk)
- Manual reproduction test
- Quick regression check
- Log to memory

### Level 2: Standard Fix (Medium Risk)
- Full reproduction test
- Automated regression tests
- Code review
- Log to memory

### Level 3: Critical Fix (High Risk)
- Full reproduction test
- Full regression suite
- Peer code review
- Staging deployment test
- Production monitoring
- Full documentation
- Log to memory

---

## Never Say "Fixed" Without

1. Evidence that it works
2. Evidence that it doesn't break other things
3. Entry in the memory system

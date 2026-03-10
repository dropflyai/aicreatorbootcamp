# Debugging Theory

## Core Principles

### 1. Bugs Are Systematic
Every bug has a cause. There are no truly "random" bugs. If something seems random, you haven't found the pattern yet.

### 2. Evidence Over Intuition
Never guess at causes. Gather evidence first. The bug will tell you what's wrong if you listen.

### 3. Minimal Changes
Change one thing at a time. Multiple changes make it impossible to know what fixed the bug.

### 4. Regression Awareness
Every fix has the potential to break something else. Always test adjacent functionality.

### 5. Documentation Is Not Optional
Undocumented fixes are bugs waiting to return. If you don't log it, you'll fix it again.

---

## The Scientific Method of Debugging

1. **Observe**: What exactly is happening?
2. **Hypothesize**: What could cause this?
3. **Predict**: If my hypothesis is correct, what should I see?
4. **Test**: Does my prediction hold?
5. **Conclude**: Was I right? If not, new hypothesis.
6. **Document**: Record everything.

---

## Common Debugging Fallacies

### "It was working before"
Code doesn't break itself. Something changed. Find what changed.

### "It works on my machine"
Environment differences are real bugs. Reproduce the other environment.

### "It's probably X"
Probably is not good enough. Verify before acting.

### "I'll just restart it"
Restarting hides bugs, it doesn't fix them. Find the root cause.

### "The bug is in the library"
Most bugs are in your code, not the library. Verify before blaming.

---

## Debugging Mindset

1. **Patience**: Rushing creates more bugs
2. **Humility**: You made the bug, you can fix it
3. **Curiosity**: Every bug teaches something
4. **Discipline**: Follow the protocol, every time

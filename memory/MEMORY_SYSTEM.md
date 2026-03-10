# PX1000 Memory and Learning System

The institutional memory that makes the system smarter over time.

---

## Purpose

1. **Remember** - Store all decisions, discussions, outcomes
2. **Learn** - Identify patterns in successes and failures
3. **Apply** - Surface relevant learnings before new work
4. **Improve** - Avoid repeating mistakes, replicate wins

---

## Memory Architecture

```
memory/
├── MEMORY_SYSTEM.md          # This file - system documentation
├── projects/                  # Project-level memory
│   ├── [project-name]/
│   │   ├── context.json      # Project requirements, constraints
│   │   ├── decisions.json    # Key decisions made
│   │   ├── timeline.json     # What happened when
│   │   └── outcomes.json     # Results, metrics, learnings
├── patterns/                  # Reusable patterns
│   ├── successes/            # What worked
│   ├── failures/             # What didn't work
│   └── approaches/           # Documented approaches
├── discussions/               # Agent collaboration logs
│   ├── [department]/
│   │   └── [date]-[topic].json
├── decisions/                 # All decisions with rationale
│   └── [date]-[decision].json
├── challenges/                # Challenges raised and resolved
│   └── [date]-[challenge].json
├── errors/                    # Errors and how they were fixed
│   └── [date]-[error].json
└── learnings/                 # Distilled insights
    ├── technical.json        # Technical learnings
    ├── business.json         # Business learnings
    ├── process.json          # Process learnings
    └── user.json             # User/customer learnings
```

---

## Schema Definitions

### Project Context
```json
{
  "project_id": "unique-id",
  "name": "Project Name",
  "created": "2024-01-15T10:00:00Z",
  "status": "active|completed|failed|paused",
  "type": "saas|mobile|marketplace|ecommerce|service",
  "problem": "What problem this solves",
  "target_customer": "Who it's for",
  "constraints": {
    "timeline": "3 months",
    "budget": "$50k",
    "team_size": 2,
    "tech_stack": ["Next.js", "Supabase"]
  },
  "brains_involved": ["CEO", "Engineering", "Design", "Marketing"],
  "related_projects": ["project-id-1", "project-id-2"]
}
```

### Decision Record
```json
{
  "decision_id": "unique-id",
  "project_id": "project-id",
  "date": "2024-01-15T10:00:00Z",
  "topic": "What was decided",
  "context": "Why this decision was needed",
  "options_considered": [
    {
      "option": "Option A",
      "pros": ["pro1", "pro2"],
      "cons": ["con1", "con2"],
      "advocates": ["Agent1"]
    }
  ],
  "chosen": "Option A",
  "rationale": "Why this option was chosen",
  "dissent": [
    {
      "agent": "Agent2",
      "concern": "What they disagreed with",
      "noted": true
    }
  ],
  "outcome": {
    "status": "success|failure|partial|unknown",
    "result": "What actually happened",
    "learned": "What we learned from this"
  },
  "tags": ["pricing", "technical", "strategy"]
}
```

### Success Pattern
```json
{
  "pattern_id": "unique-id",
  "name": "Pattern Name",
  "category": "technical|business|process|design",
  "description": "What this pattern is",
  "when_to_use": "Conditions where this works",
  "how_to_apply": "Step by step",
  "evidence": [
    {
      "project_id": "project-1",
      "result": "What happened",
      "metrics": {"conversion": "15%", "time_saved": "2hrs"}
    }
  ],
  "warnings": "Gotchas or edge cases",
  "related_patterns": ["pattern-id-1"]
}
```

### Failure Record
```json
{
  "failure_id": "unique-id",
  "project_id": "project-id",
  "date": "2024-01-15T10:00:00Z",
  "what_failed": "Description of failure",
  "why_it_failed": "Root cause analysis",
  "approach_used": "What we tried",
  "warning_signs": ["Sign 1", "Sign 2"],
  "what_to_do_instead": "Better approach",
  "severity": "critical|major|minor",
  "tags": ["authentication", "performance", "ux"]
}
```

### Error Record
```json
{
  "error_id": "unique-id",
  "date": "2024-01-15T10:00:00Z",
  "error_type": "technical|logic|process|communication",
  "error_message": "Actual error or description",
  "context": "What was happening",
  "root_cause": "Why it happened",
  "fix_applied": "How it was fixed",
  "time_to_fix": "2 hours",
  "prevention": "How to avoid in future",
  "tags": ["typescript", "api", "deployment"]
}
```

### Learning Record
```json
{
  "learning_id": "unique-id",
  "date": "2024-01-15T10:00:00Z",
  "source": "project-id or discussion-id",
  "category": "technical|business|process|user",
  "insight": "The key learning",
  "evidence": "What proved this",
  "application": "How to apply this",
  "confidence": "high|medium|low",
  "tags": ["pricing", "onboarding", "mobile"]
}
```

---

## Query Patterns

### Before Starting Any Work

```
QUERY: Get relevant context for [task]

1. Search projects with similar:
   - Problem domain
   - Tech stack
   - Customer type
   - Business model

2. Get related:
   - Decisions made
   - Patterns that worked
   - Failures to avoid
   - Active learnings

3. Surface:
   - "Last time we tried X, it failed because Y"
   - "Pattern Z worked well for similar project"
   - "Watch out for: [warning signs]"
```

### Query Examples

```
# Find relevant failures before attempting something
QUERY failures WHERE approach SIMILAR TO "implementing auth with JWT"
RETURN what_failed, why_it_failed, what_to_do_instead

# Find successful patterns for a problem type
QUERY patterns WHERE category = "onboarding" AND evidence.result = "success"
RETURN name, how_to_apply, evidence

# Get decisions made in similar contexts
QUERY decisions WHERE tags CONTAINS "pricing" AND outcome.status = "success"
RETURN chosen, rationale, outcome.learned

# Find errors we've encountered before
QUERY errors WHERE error_message SIMILAR TO "Cannot read property X of undefined"
RETURN fix_applied, prevention
```

---

## Logging Protocol

### When to Log

| Event | What to Log | Where |
|-------|-------------|-------|
| New project started | Context, constraints | `projects/[name]/context.json` |
| Decision made | Full decision record | `decisions/` |
| Agents discuss | Discussion summary | `discussions/[dept]/` |
| Challenge raised | Challenge and resolution | `challenges/` |
| Error occurs | Error and fix | `errors/` |
| Something fails | Failure analysis | `patterns/failures/` |
| Something works | Success pattern | `patterns/successes/` |
| Insight gained | Learning record | `learnings/` |
| Project completes | Outcomes and retrospective | `projects/[name]/outcomes.json` |

### How to Log

Every agent MUST log significant interactions:

```python
# Pseudocode for logging
def log_to_memory(category, data):
    data["timestamp"] = now()
    data["logged_by"] = current_agent()

    path = f"memory/{category}/{generate_filename(data)}"
    write_json(path, data)

    # Also update indices
    update_index(category, data)
```

### Logging Commands

```bash
# Log a decision
LOG_DECISION --project "project-name" --topic "What was decided" --chosen "Option A" --rationale "Because X"

# Log a failure
LOG_FAILURE --project "project-name" --what "What failed" --why "Root cause" --instead "Better approach"

# Log a learning
LOG_LEARNING --category "technical" --insight "Key insight" --evidence "Proof" --application "How to use"

# Log an error
LOG_ERROR --type "technical" --message "Error message" --fix "How fixed" --prevent "How to avoid"
```

---

## Learning Application

### Pre-Work Query (MANDATORY)

Before ANY work, agents MUST query memory:

```
BEFORE: Starting task [X]

1. QUERY similar past work
   → Found: [list of related items]

2. SURFACE learnings
   → Success patterns: [list]
   → Failures to avoid: [list]
   → Relevant decisions: [list]

3. APPLY to current work
   → Using pattern: [pattern name]
   → Avoiding: [failure pattern]
   → Following precedent: [decision]

4. WARN if red flags
   → "Warning: Similar approach failed in [project]"
   → "Note: This contradicts decision [X] made on [date]"
```

### Post-Work Logging (MANDATORY)

After ANY significant work:

```
AFTER: Completed task [X]

1. OUTCOME: success|failure|partial

2. LOG decision if made
   → What was decided and why

3. LOG pattern if reusable
   → What worked that others can use

4. LOG failure if failed
   → What failed and why

5. LOG learning if insight gained
   → What we now know

6. UPDATE project timeline
   → What happened when
```

---

## Memory Maintenance

### Daily
- New entries automatically indexed
- Tags extracted and linked

### Weekly
- Review recent failures for patterns
- Identify recurring issues
- Update learning summaries

### Monthly
- Consolidate learnings by category
- Archive completed projects
- Prune outdated information

### Per Project Completion
- Full retrospective
- Extract all learnings
- Update relevant patterns
- Archive project memory

---

## Access Control

```
ALL agents can:
- READ all memory
- QUERY memory
- LOG new entries

BRAIN LEADS can:
- UPDATE existing entries
- ARCHIVE entries
- CREATE patterns

CEO BRAIN can:
- DELETE entries (rare)
- OVERRIDE decisions
- MERGE duplicate patterns
```

---

## Integration with Agent Teams

When teams collaborate:

```
1. BEFORE discussion:
   - Query related past discussions
   - Surface relevant decisions
   - Load applicable patterns

2. DURING discussion:
   - Log key points in real-time
   - Flag when contradicting past decisions
   - Reference evidence from memory

3. AFTER discussion:
   - Log full discussion summary
   - Extract decisions made
   - Identify new learnings
   - Update patterns if applicable
```

---

## Example: Full Memory Cycle

```
PROJECT: Build user authentication

1. PRE-WORK QUERY
   Agent queries: "authentication implementations"

   Memory returns:
   - FAILURE: "JWT without refresh tokens caused UX issues in Project X"
   - SUCCESS: "Supabase Auth worked well in Project Y"
   - LEARNING: "Always implement 'remember me' - users expect it"
   - DECISION: "Prefer OAuth over email/password when possible"

2. APPLY LEARNINGS
   Agent: "Based on memory, I'll use Supabase Auth with refresh tokens
           and OAuth providers. Adding 'remember me' per learning."

3. EXECUTE with awareness
   Team debates, references past decisions, challenges with evidence

4. OUTCOME
   Authentication works well, users happy

5. POST-WORK LOG
   LOG_PATTERN: "Supabase Auth + OAuth + Remember Me = success"
   LOG_LEARNING: "Social login had 3x adoption vs email/password"
   UPDATE: Project timeline, decisions made

6. FUTURE BENEFIT
   Next project queries "authentication"
   Gets this pattern, applies it, succeeds faster
```

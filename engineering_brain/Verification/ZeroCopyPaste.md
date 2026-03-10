# ZERO COPY-PASTE PROTOCOL
**Programmatic Retrieval Over Manual Data Transfer**

---

## 1. Core Principle

> **Never ask for information that can be retrieved programmatically.**

This principle is a direct consequence of the Engineering Brain's Tool
Authority rules (Constitution.md Section 8, Solutions/ToolAuthority.md).
When an agent or engineer has programmatic access to a system, requesting
that a human copy and paste output from that system is a correctness
failure, not merely an inconvenience.

Copy-paste introduces:

- **Truncation risk**: Humans truncate long outputs, often removing the
  critical information.
- **Transcription error**: Characters are misread, whitespace is lost,
  encoding is corrupted.
- **Staleness**: The pasted output may not reflect current state by the time
  it is analyzed.
- **Context loss**: Surrounding log lines, stack frames, and metadata are
  typically omitted.
- **Non-reproducibility**: A manual paste cannot be re-executed to verify
  the result.
- **Cognitive load**: The human must context-switch from their task to
  become a data courier.

Zero Copy-Paste is not about eliminating all human input. It is about
eliminating unnecessary human intermediation in data retrieval.

---

## 2. Formal Decision Framework

For any piece of information needed during engineering work, apply this
decision tree:

```
Is the information retrievable programmatically?
  |
  +-- YES --> Retrieve it automatically. Do not ask the human.
  |             |
  |             +-- Retrieval succeeds --> Use the retrieved data.
  |             |
  |             +-- Retrieval fails --> Document the failure.
  |                                     Attempt repair.
  |                                     If repair fails, then ask the human
  |                                     (this is the ONLY acceptable fallback).
  |
  +-- NO --> Is the information observable by the agent?
               |
               +-- YES (but requires manual steps) --> Automate the observation.
               |                                        If automation is impossible,
               |                                        document why and ask the human.
               |
               +-- NO (external system, human knowledge) --> Ask the human.
                                                              This is acceptable.
```

The key distinction: **asking is acceptable when retrieval is impossible.**
Asking is a violation when retrieval is possible but has not been attempted.

---

## 3. Automated Retrieval Patterns

### 3.1 Error and Exception Retrieval

**Anti-pattern (violation)**:
```
"Can you paste the error message you're seeing?"
```

**Correct pattern**:
```bash
# Retrieve the last N lines of application logs
tail -n 100 /var/log/app/error.log

# Retrieve PM2 process logs
pm2 logs --lines 50 --nostream

# Retrieve Docker container logs
docker logs --tail 100 <container-id>

# Retrieve systemd service logs
journalctl -u myservice --since "5 minutes ago" --no-pager

# Retrieve Next.js/Node build errors
npm run build 2>&1 | tail -50
```

### 3.2 Application State Retrieval

**Anti-pattern (violation)**:
```
"What does the database table look like right now?"
```

**Correct pattern**:
```bash
# Retrieve table schema
psql -c "\d+ table_name"

# Retrieve row counts
psql -c "SELECT COUNT(*) FROM table_name"

# Retrieve Supabase table info via CLI
supabase db dump --schema public | grep "CREATE TABLE"

# Retrieve environment variables (non-secret)
printenv | grep "^APP_"

# Retrieve running processes
ps aux | grep node

# Retrieve port usage
lsof -i :3000
```

### 3.3 Git State Retrieval

**Anti-pattern (violation)**:
```
"What branch are you on? What's the last commit?"
```

**Correct pattern**:
```bash
# Current branch and status
git status

# Recent commits
git log --oneline -10

# Uncommitted changes
git diff

# Staged changes
git diff --cached

# File at a specific commit
git show HEAD:path/to/file
```

### 3.4 System and Environment Retrieval

**Anti-pattern (violation)**:
```
"What version of Node are you running?"
```

**Correct pattern**:
```bash
# Runtime versions
node --version
python3 --version
npm --version

# OS information
uname -a

# Disk usage
df -h

# Memory usage
free -h  # Linux
vm_stat  # macOS

# Current date/time (Tool Authority mandate)
date -u +"%Y-%m-%dT%H:%M:%SZ"
```

### 3.5 CI/CD State Retrieval

**Anti-pattern (violation)**:
```
"Can you share the CI build output?"
```

**Correct pattern**:
```bash
# GitHub Actions run status
gh run list --limit 5
gh run view <run-id> --log

# GitHub Actions job logs
gh run view <run-id> --job <job-id> --log

# Deployment status
gh api repos/{owner}/{repo}/deployments --jq '.[0]'

# PR check status
gh pr checks <pr-number>
```

### 3.6 Network and API Retrieval

**Anti-pattern (violation)**:
```
"What does the API return for that endpoint?"
```

**Correct pattern**:
```bash
# API response
curl -s http://localhost:3000/api/health | jq

# HTTP headers
curl -sI http://localhost:3000/api/health

# DNS resolution
dig example.com +short

# SSL certificate info
openssl s_client -connect example.com:443 </dev/null 2>/dev/null | \
  openssl x509 -noout -dates
```

---

## 4. Tool Authority Integration

Zero Copy-Paste is the behavioral implementation of Tool Authority. The
relationship is:

| Tool Authority Rule | Zero Copy-Paste Implementation |
|--------------------|-------------------------------|
| Time/Date must be retrieved | `date` command, not user-provided |
| UI must be verified via Playwright | Screenshots are captured automatically, not requested |
| Logs must be retrieved automatically | `tail`, `journalctl`, `docker logs`, not pasted |
| DB changes via migration tooling | `supabase migration`, not manual SQL paste |
| Facts must be retrieved, not assumed | CLI queries, not conversational guessing |

### 4.1 Automation Preference Hierarchy Applied

When multiple retrieval methods exist, follow the Automation Preference
Hierarchy (Solutions/ToolAuthority.md):

1. **Native automation**: Existing scripts/recipes in Automations/.
2. **CLI tools**: `supabase`, `gh`, `docker`, `kubectl`.
3. **MCP/SDK/API**: Programmatic interfaces.
4. **Headless browser**: Playwright for UI state.
5. **One-off scripts**: Custom retrieval scripts.
6. **Manual request**: LAST RESORT ONLY.

---

## 5. When Copy-Paste IS Acceptable

Zero Copy-Paste is not absolute. There are legitimate scenarios where
human-provided text is the correct input:

### 5.1 External System Output

When the agent has no access to an external system (third-party SaaS,
vendor API, partner system), asking the user to provide output is
acceptable. The agent cannot retrieve what it cannot access.

**Examples**:
- Error messages from a third-party API dashboard the agent cannot access.
- Configuration from a vendor's admin console.
- Output from a tool not installed in the current environment.

### 5.2 User-Provided Context

When the information originates from the user's intent, knowledge, or
decision-making, asking is not just acceptable but required.

**Examples**:
- Business requirements and acceptance criteria.
- Design preferences and aesthetic choices.
- Priority decisions between competing approaches.
- Domain-specific knowledge the agent does not possess.
- Credentials and secrets (which must NOT be retrieved automatically from
  insecure locations).

### 5.3 Reproduction Steps

When the user has observed behavior that the agent cannot reproduce (e.g.,
a browser-specific rendering issue on a device the agent does not have
access to), asking for a description or screenshot is acceptable.

### 5.4 Ambiguity Resolution

When the agent needs clarification on the user's intent, asking a question
is always acceptable. This is communication, not data retrieval.

---

## 6. Implementation Patterns for Common Scenarios

### 6.1 Error Investigation Workflow

```
1. User reports: "The app is broken."

WRONG:
  Agent: "Can you paste the error message?"

CORRECT:
  Agent:
    a. Check application logs: `tail -100 /var/log/app/error.log`
    b. Check process status: `pm2 status` or `docker ps`
    c. Check recent deployments: `gh run list --limit 3`
    d. Check for crash dumps: `ls -la /tmp/core.*`
    e. Run smoke test: `curl -s http://localhost:3000/api/health`
    f. If all automated retrieval fails to identify the issue:
       "I've checked logs, process status, and health endpoints but
        cannot reproduce the failure. Can you describe what you're
        seeing and which page/action triggers it?"
```

### 6.2 State Diagnosis Workflow

```
1. User reports: "The data looks wrong in the dashboard."

WRONG:
  Agent: "Can you screenshot what you're seeing?"

CORRECT:
  Agent:
    a. Query the data source: `psql -c "SELECT * FROM metrics ORDER BY
       created_at DESC LIMIT 10"`
    b. Capture the UI state: Playwright screenshot of /dashboard
    c. Compare data source to UI rendering
    d. If discrepancy found: diagnose the transformation logic
    e. If no discrepancy: ask user for specific data points that look wrong
```

### 6.3 Configuration Verification Workflow

```
1. Task: Verify environment configuration is correct.

WRONG:
  Agent: "Can you check your .env file and paste the contents?"

CORRECT:
  Agent:
    a. Read the config file: `cat .env | grep -v SECRET | grep -v KEY`
       (redacting secrets)
    b. Validate against schema: compare with .env.example
    c. Check runtime config: `node -e "console.log(process.env.DATABASE_URL
       ? 'DB configured' : 'DB missing')"`
    d. Test connectivity: `pg_isready -h localhost -p 5432`
```

### 6.4 Deployment Verification Workflow

```
1. Task: Verify a deployment succeeded.

WRONG:
  Agent: "Did the deployment work? Can you check?"

CORRECT:
  Agent:
    a. Check CI status: `gh run list --limit 1`
    b. Check deployment: `gh api repos/{owner}/{repo}/deployments --jq '.[0].statuses_url'`
    c. Health check: `curl -s https://production.example.com/api/health`
    d. Smoke test: Run Playwright against production URL
    e. Check error rates: Query monitoring API if available
```

---

## 7. Enforcement and Violations

### 7.1 Detection

A Zero Copy-Paste violation occurs when the agent:

- Asks the user to paste logs that the agent can retrieve.
- Asks the user to describe system state that the agent can query.
- Asks the user to run a command and report the output instead of running
  the command directly.
- Asks the user to check a UI instead of using Playwright.
- Asks the user for the current date/time instead of using `date`.

### 7.2 Severity

Zero Copy-Paste violations are classified as:

- **P2 MEDIUM** under GEAR: BUILD (correctness issue, not emergency).
- **P1 HIGH** under GEAR: SHIP (shipping requires full automation).
- **P3 LOW** under GEAR: EXPLORE (flexibility permitted).

### 7.3 Logging

Violations must be logged in `Solutions/Regressions.md` with:

- What was asked for manually.
- What automated retrieval path should have been used.
- Whether the retrieval path exists in Automations/ or needs to be created.

### 7.4 Remediation

When a violation is discovered:

1. Add the correct retrieval pattern to `Automations/Recipes/` or
   `Solutions/Recipes/`.
2. Update `Automations/AutomationIndex.md` if a new recipe was created.
3. Log the prior violation and new automation path in
   `Solutions/Regressions.md`.

---

## 8. Relationship to Brain Hierarchy

Zero Copy-Paste is enforced at the Engineering Brain level but applies
recursively to all specialist brains invoked by the Engineering Brain.

When the Engineering Brain delegates to the Design Brain, the Design Brain
must also follow Zero Copy-Paste within its domain:

- Do not ask for screenshots of the current UI; capture them via Playwright.
- Do not ask for color values; read them from design tokens or CSS.
- Do not ask for font specifications; inspect the running application.

The CEO Brain's orchestration layer inherits this principle: when routing
tasks to specialist brains, the CEO must provide context that was
programmatically retrievable, not ask the user to re-supply it.

---

## 9. Philosophical Basis

Zero Copy-Paste is rooted in a principle from systems engineering:
**the system should not require a human to compensate for its own
capabilities**. If the agent can read a file, it must read the file.
If the agent can run a command, it must run the command. Asking a human
to perform an action the agent is capable of performing is a delegation
failure, not a communication pattern.

This principle also respects the human's cognitive bandwidth. Every request
for manual data transfer is an interruption. Interruptions have
compounding costs: context switching, error introduction, and trust
erosion. An agent that retrieves its own data earns trust. An agent that
constantly asks "can you paste X" trains the human to expect incompetence.

The goal is an agent that operates with the autonomy of a senior engineer
who has SSH access, database credentials, and CI dashboards open. That
engineer does not ask their colleague to read them the log file. They
open the log file themselves.

---

## 10. Cross-References

- **Tool Authority (authoritative sources)**: `Solutions/ToolAuthority.md`
- **Automation Preference Hierarchy**: `Solutions/ToolAuthority.md` Section 5
- **Log retrieval recipes**: `Solutions/Recipes/LogsAndErrors.md`
- **Playwright automation**: `Verification/UIAutomation.md`
- **Evidence collection**: `Verification/Evidence.md`
- **Constitution (Tool Authority rules)**: `Constitution.md` Section 8
- **Automation enforcement**: `CLAUDE.md` (Automation Enforcement section)
- **Automation recipes index**: `Automations/AutomationIndex.md`

---

**Retrieve programmatically. Ask only when retrieval is impossible.**

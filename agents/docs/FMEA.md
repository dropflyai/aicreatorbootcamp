# Failure Mode and Effects Analysis (FMEA) -- PX1000 Agent System

**Document Owner:** Engineering Brain
**Last Updated:** 2026-02-19
**Review Cadence:** Monthly or after any SEV1/SEV2 incident

---

## Scoring Criteria

| Rating | Severity (S) | Occurrence (O) | Detection (D) |
|--------|-------------|-----------------|----------------|
| 1-2 | Negligible | Extremely rare | Almost always caught |
| 3-4 | Minor degradation | Rare | Usually caught |
| 5-6 | Significant degradation | Occasional | Sometimes caught |
| 7-8 | Major feature broken | Frequent | Rarely caught |
| 9-10 | System-wide outage / data loss | Very frequent | Undetectable until user impact |

**RPN = Severity x Occurrence x Detection** (max 1000). Anything above 200 requires immediate action.

---

## 1. Anthropic API Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 1.1 | **Request timeout** | Anthropic API latency spike; large context payload | User sees a hung task; no output returned | 7 | 5 | 4 | 140 | 30s timeout with abort signal; retry once | Add progressive timeout (15s/30s/60s) with partial-result caching so retries resume from last checkpoint |
| 1.2 | **Rate limit (429)** | Burst of concurrent orchestration requests exceeds tier limit | Tasks queue up; users experience delays or rejection | 6 | 6 | 3 | 108 | Exponential backoff with jitter (base 1s, max 60s) | Implement a token-bucket rate limiter in the gateway; surface estimated wait time to user |
| 1.3 | **Model overloaded (529)** | Anthropic capacity constraints during peak | Identical to timeout from user perspective | 7 | 4 | 3 | 84 | Retry with backoff; fall back to smaller model (Haiku) for non-critical subtasks | Add model failover chain: Opus -> Sonnet -> Haiku with task-complexity routing |
| 1.4 | **Invalid API key** | Key rotated, revoked, or env var missing | All API calls fail; system fully down | 10 | 2 | 2 | 40 | Startup health check validates key before accepting requests | Add key-expiry monitoring; dual-key rotation (old key valid for 24h overlap) |
| 1.5 | **Response truncation** | Output exceeds `max_tokens`; model hits limit mid-sentence | Partial, unusable output delivered to user | 6 | 5 | 5 | 150 | Set `max_tokens` to 4096; check for stop_reason=="end_turn" | Detect `stop_reason=="max_tokens"`, auto-continue with "please continue" follow-up call; stitch results |
| 1.6 | **Content filter triggered** | Model refuses task due to safety classifier | User receives refusal instead of output | 5 | 3 | 3 | 45 | Log refusal; surface clear message to user | Add pre-screening of prompts for known trigger patterns; rephrase and retry once with softened framing |

---

## 2. Supabase Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 2.1 | **Connection refused** | Supabase project paused (free tier), network partition, DNS failure | All DB reads/writes fail; tasks cannot log or retrieve memory | 8 | 3 | 3 | 72 | Connection retry with 3 attempts; graceful degradation (run without persistence) | Add local SQLite fallback for offline mode; sync to Supabase when connection restores |
| 2.2 | **Auth token expired** | JWT expired; service role key rotated without deploy | 401 on all Supabase calls; silent data loss if not caught | 8 | 3 | 4 | 96 | Refresh token logic in Supabase client; startup health check | Add token-expiry pre-check (decode JWT, compare `exp` to now); alert 24h before expiry |
| 2.3 | **Row-level security (RLS) violation** | Policy misconfiguration after migration; wrong role used | Insert/update silently returns 0 rows; data appears lost | 7 | 4 | 7 | 196 | Integration tests cover RLS policies | Add RLS policy smoke tests to every migration; log and alert on 0-row writes when rows were expected |
| 2.4 | **Migration conflict** | Two developers apply conflicting schema changes | Migration fails; deploy blocked; potential data inconsistency | 7 | 3 | 4 | 84 | Sequential migration numbering; CI runs `supabase db push --dry-run` | Add migration locking in CI; require PR review for any migration file |
| 2.5 | **Storage quota exceeded** | Accumulated artifacts (logs, brain outputs) exceed plan limit | File uploads fail; brain artifacts not persisted | 6 | 3 | 5 | 90 | Monitor storage usage in weekly check | Add automated cleanup of artifacts older than 30 days; alert at 80% capacity |

---

## 3. BrainLoader Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 3.1 | **CLAUDE.md missing** | Brain directory exists but CLAUDE.md deleted or never created | BrainLoader throws; specialist cannot be initialized | 8 | 3 | 2 | 48 | Startup scan validates all brain directories; error message names the missing file | Add auto-generation of skeleton CLAUDE.md from brain template if missing; log warning |
| 3.2 | **CLAUDE.md corrupted/empty** | Accidental overwrite; merge conflict markers left in file | Brain loads with no instructions; produces garbage output | 7 | 3 | 6 | 126 | Minimum byte-length check (reject < 50 bytes) | Add CLAUDE.md schema validation (must contain required sections); hash-check against known-good version |
| 3.3 | **Brain directory deleted** | Accidental `rm -rf`; bad git operation | BrainLoader cannot resolve path; orchestration fails for that specialist | 8 | 2 | 2 | 32 | Git tracks all brain directories; CI fails if any brain dir missing | Add directory-existence check at startup; auto-restore from git HEAD if missing |
| 3.4 | **Permission denied** | File permissions changed (e.g., 000); Docker volume mount issue | BrainLoader throws EACCES; brain unavailable | 7 | 2 | 3 | 42 | CI tests run in clean environment matching production perms | Add permission check in health endpoint; auto-fix with `chmod 644` on CLAUDE.md files |
| 3.5 | **Encoding error** | Non-UTF-8 characters in CLAUDE.md (e.g., Windows-1252 from copy-paste) | Parser throws or silently drops characters; instructions garbled | 4 | 3 | 5 | 60 | Read with explicit UTF-8 encoding; catch decode errors | Add pre-commit hook that validates UTF-8 encoding on all .md files |

---

## 4. CEO Agent Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 4.1 | **Task decomposition returns invalid JSON** | Model outputs malformed JSON; markdown fences leak into parse | Orchestrator cannot route subtasks; task fails entirely | 8 | 5 | 4 | 160 | JSON.parse wrapped in try/catch with one retry using stricter prompt | Add structured output (tool_use) instead of free-form JSON; validate with Zod schema before use |
| 4.2 | **Brain selector returns unknown brain** | Model hallucinates a brain name not in the registry | Routing fails; KeyError or undefined behavior | 7 | 4 | 3 | 84 | Validate brain name against `BRAIN_REGISTRY` before dispatch | Constrain model to enum of valid brain names via tool_use parameter schema |
| 4.3 | **Infinite delegation loop** | Brain A delegates to Brain B which delegates back to A | Runaway token consumption; eventual timeout or OOM | 9 | 3 | 5 | 135 | Max delegation depth of 3 | Add call-stack tracking; detect cycles; hard-reject re-delegation to any brain already in the chain |
| 4.4 | **All subtasks fail** | Upstream API down; systemic prompt issue; bad decomposition | User gets no output; error message lacks actionable detail | 8 | 3 | 4 | 96 | Aggregate errors and return summary to user | Add partial-success handling: return whatever subtasks succeeded; clearly label failures with retry option |

---

## 5. Specialist Agent Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 5.1 | **Tool execution error** | Tool called with wrong arguments; external service down | Subtask fails; error bubbled up as generic failure | 6 | 5 | 4 | 120 | Tool calls wrapped in try/catch; errors include tool name and args | Add tool-argument validation before execution; retry with corrected args if schema mismatch detected |
| 5.2 | **Max iterations reached** | Agent stuck in a loop; unable to converge on answer | Subtask times out; tokens wasted; no useful output | 7 | 4 | 3 | 84 | Hard cap of 10 iterations per agent invocation | Add progress detection: if last 3 iterations produced no new tool calls or output, abort early with partial result |
| 5.3 | **Context window exceeded** | Accumulated conversation + tool results exceed model limit | API returns 400; agent crashes mid-task | 8 | 4 | 4 | 128 | Track token count; summarize history when approaching 80% of limit | Implement sliding-window context management; offload older turns to Supabase memory; retrieve on demand |
| 5.4 | **Model hallucination** | Model generates plausible but incorrect output (wrong code, fake data) | User acts on bad information; downstream errors | 8 | 5 | 8 | 320 | N/A (hard to detect programmatically) | Add output validation layer: lint generated code, fact-check against known data, require citations for claims |

---

## 6. Sandbox Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 6.1 | **Docker not installed** | Dev machine or CI runner missing Docker | Sandbox cannot start; code execution disabled | 7 | 2 | 1 | 14 | Startup check for `docker --version`; clear error message | Add Docker-install script to onboarding; fallback to local subprocess with restricted permissions |
| 6.2 | **Image build failure** | Dockerfile syntax error; base image unavailable; registry down | Sandbox unavailable; tasks requiring code execution fail | 7 | 3 | 3 | 63 | Pre-built images cached locally; CI builds and validates images | Pin base image digests; add image-build smoke test to CI; maintain local image cache |
| 6.3 | **OOM kill** | Generated code has memory leak; large dataset loaded in sandbox | Container killed; partial output lost; cryptic error | 7 | 4 | 5 | 140 | Memory limit set to 512MB per container | Add memory-usage monitoring inside container; kill process gracefully at 80% limit with clear error |
| 6.4 | **Execution timeout** | Infinite loop in generated code; blocking I/O | Container killed after timeout; user waits then gets error | 6 | 5 | 3 | 90 | 30s execution timeout per sandbox run | Add CPU-time tracking; warn at 50% of timeout; provide partial stdout on timeout |
| 6.5 | **Network policy blocks required API** | Sandbox network isolation blocks outbound call needed by generated code | Code fails with connection error; confusing for user | 5 | 4 | 6 | 120 | Allowlist for known APIs (Anthropic, Supabase) | Make network policy configurable per task; document allowed endpoints; provide clear error on blocked requests |

---

## 7. CI/CD Failures

| # | Failure Mode | Cause | Effect | S | O | D | RPN | Mitigation | Recommended Action |
|---|-------------|-------|--------|---|---|---|-----|------------|-------------------|
| 7.1 | **Test flakiness** | Non-deterministic tests (timing, network, random seeds) | CI fails intermittently; developers lose trust in CI; bad code merges | 6 | 7 | 6 | 252 | Retry failed tests once in CI | Quarantine flaky tests; track flake rate per test; fix or delete tests with >5% flake rate |
| 7.2 | **Dependency resolution failure** | npm/pip version conflict; yanked package; registry outage | CI build fails; deploys blocked | 7 | 4 | 2 | 56 | Lockfiles committed; `npm ci` used instead of `npm install` | Add lockfile-integrity check; pin critical dependencies; mirror essential packages |
| 7.3 | **GitHub Actions quota exceeded** | Too many concurrent runs; free-tier minutes exhausted | CI stops running; PRs cannot be validated | 6 | 3 | 2 | 36 | Monitor usage in GitHub billing page | Add concurrency limits to workflows; cancel superseded runs; alert at 80% quota usage |

---

## RPN Summary Table (Sorted by Highest RPN)

| Rank | # | Failure Mode | S | O | D | RPN | Status |
|------|---|-------------|---|---|---|-----|--------|
| 1 | 5.4 | Model hallucination | 8 | 5 | 8 | **320** | CRITICAL -- Needs immediate action |
| 2 | 7.1 | Test flakiness | 6 | 7 | 6 | **252** | HIGH -- Active remediation needed |
| 3 | 2.3 | RLS violation (silent 0-row write) | 7 | 4 | 7 | **196** | HIGH -- Active remediation needed |
| 4 | 4.1 | Invalid JSON from task decomposition | 8 | 5 | 4 | **160** | MEDIUM -- Scheduled improvement |
| 5 | 1.5 | Response truncation | 6 | 5 | 5 | **150** | MEDIUM -- Scheduled improvement |
| 6 | 1.1 | API request timeout | 7 | 5 | 4 | **140** | MEDIUM -- Scheduled improvement |
| 7 | 6.3 | OOM kill in sandbox | 7 | 4 | 5 | **140** | MEDIUM -- Scheduled improvement |
| 8 | 4.3 | Infinite delegation loop | 9 | 3 | 5 | **135** | MEDIUM -- Scheduled improvement |
| 9 | 5.3 | Context window exceeded | 8 | 4 | 4 | **128** | MEDIUM -- Scheduled improvement |
| 10 | 3.2 | CLAUDE.md corrupted/empty | 7 | 3 | 6 | **126** | MEDIUM -- Scheduled improvement |
| 11 | 5.1 | Tool execution error | 6 | 5 | 4 | **120** | MEDIUM -- Monitor |
| 12 | 6.5 | Network policy blocks API | 5 | 4 | 6 | **120** | MEDIUM -- Monitor |
| 13 | 1.2 | Rate limit (429) | 6 | 6 | 3 | **108** | LOW -- Acceptable with current mitigation |
| 14 | 2.2 | Auth token expired | 8 | 3 | 4 | **96** | LOW -- Acceptable with current mitigation |
| 15 | 4.4 | All subtasks fail | 8 | 3 | 4 | **96** | LOW -- Acceptable with current mitigation |
| 16 | 2.5 | Storage quota exceeded | 6 | 3 | 5 | **90** | LOW -- Acceptable with current mitigation |
| 17 | 6.4 | Sandbox execution timeout | 6 | 5 | 3 | **90** | LOW -- Acceptable with current mitigation |
| 18 | 1.3 | Model overloaded (529) | 7 | 4 | 3 | **84** | LOW -- Acceptable with current mitigation |
| 19 | 2.4 | Migration conflict | 7 | 3 | 4 | **84** | LOW -- Acceptable with current mitigation |
| 20 | 4.2 | Unknown brain name | 7 | 4 | 3 | **84** | LOW -- Acceptable with current mitigation |
| 21 | 5.2 | Max iterations reached | 7 | 4 | 3 | **84** | LOW -- Acceptable with current mitigation |
| 22 | 2.1 | Connection refused | 8 | 3 | 3 | **72** | LOW -- Acceptable with current mitigation |
| 23 | 6.2 | Image build failure | 7 | 3 | 3 | **63** | LOW -- Acceptable with current mitigation |
| 24 | 3.5 | Encoding error | 4 | 3 | 5 | **60** | LOW -- Acceptable with current mitigation |
| 25 | 7.2 | Dependency resolution failure | 7 | 4 | 2 | **56** | LOW -- Acceptable with current mitigation |
| 26 | 3.1 | CLAUDE.md missing | 8 | 3 | 2 | **48** | LOW -- Acceptable with current mitigation |
| 27 | 1.6 | Content filter triggered | 5 | 3 | 3 | **45** | LOW -- Acceptable with current mitigation |
| 28 | 3.4 | Permission denied | 7 | 2 | 3 | **42** | LOW -- Acceptable with current mitigation |
| 29 | 1.4 | Invalid API key | 10 | 2 | 2 | **40** | LOW -- Acceptable with current mitigation |
| 30 | 7.3 | GitHub Actions quota exceeded | 6 | 3 | 2 | **36** | LOW -- Acceptable with current mitigation |
| 31 | 3.3 | Brain directory deleted | 8 | 2 | 2 | **32** | LOW -- Acceptable with current mitigation |
| 32 | 6.1 | Docker not installed | 7 | 2 | 1 | **14** | LOW -- Acceptable with current mitigation |

---

## Action Items

1. **RPN > 200 (Critical):** Model hallucination (320), Test flakiness (252) -- Requires dedicated sprint
2. **RPN 150-200 (High):** RLS violation (196), Invalid JSON decomposition (160), Response truncation (150) -- Schedule within 2 weeks
3. **RPN 100-149 (Medium):** Review mitigations quarterly; upgrade if occurrence increases
4. **RPN < 100 (Low):** Current mitigations sufficient; re-evaluate during monthly review

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-19 | Engineering Brain | Initial FMEA covering all 7 component categories |

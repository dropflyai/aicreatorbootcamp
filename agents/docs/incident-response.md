# Incident Response Plan -- PX1000 Agent System

**Document Owner:** Engineering Brain
**Last Updated:** 2026-02-19
**Review Cadence:** Quarterly; update after every SEV1 or SEV2 postmortem

---

## 1. Severity Levels

| Level | Name | Definition | Response Time | Example |
|-------|------|-----------|---------------|---------|
| **SEV1** | Critical | System-wide outage; all orchestration requests failing; data loss occurring | **15 minutes** to acknowledge; **1 hour** to mitigate | Anthropic API key revoked; Supabase project deleted; CEO agent crash loop |
| **SEV2** | Major | Significant degradation; >50% of requests failing or latency >5x SLO target | **30 minutes** to acknowledge; **4 hours** to mitigate | Model overloaded (529) sustained for 30+ min; RLS misconfiguration blocking all writes |
| **SEV3** | Minor | Partial degradation; single brain or feature unavailable; <20% of requests affected | **2 hours** to acknowledge; **24 hours** to mitigate | One specialist brain's CLAUDE.md corrupted; sandbox image build failure |
| **SEV4** | Low | Cosmetic or non-urgent issue; no user-facing impact currently | **24 hours** to acknowledge; **1 week** to resolve | Test flakiness increase; non-critical log errors; documentation gap |

### Severity Classification Rules

- Any data loss or security breach is automatically SEV1
- SLO error budget exhaustion (100%) escalates the related issue by one severity level
- If unsure between two levels, choose the higher severity

---

## 2. Detection

Incidents are detected through four channels, in order of typical speed:

### 2.1 Automated Monitoring

- **SLO burn rate alerts** (see SLOs.md): Fires when error budget consumption exceeds thresholds
- **Health check failures**: `/health` endpoint polled every 60s; 3 consecutive failures trigger alert
- **CI pipeline failures**: Any failure on `main` branch triggers Slack notification
- **Supabase alerts**: Database connection pool exhaustion, storage quota warnings

### 2.2 Application Logging

- **Structured logs** in Supabase `orchestration_logs` table
- Errors with `level=error` or `level=fatal` trigger real-time Slack notifications
- Log patterns monitored: repeated 429s, auth failures, JSON parse errors, timeout spikes

### 2.3 Synthetic Probes

- **Canary task** runs every 5 minutes: a simple orchestration request ("List 3 colors") that must complete in < 10s
- **End-to-end test** runs every 30 minutes: a complex multi-brain orchestration with expected output validation
- Probe failures trigger SEV2 investigation if sustained for 2+ cycles

### 2.4 User Reports

- Users report issues via GitHub Issues (tagged `incident`) or direct Slack message
- User-reported issues default to SEV3 unless symptoms indicate higher severity
- On-call engineer must acknowledge user reports within 2 hours during business hours

---

## 3. Triage -- Severity Decision Tree

```
Incident detected
    |
    +-- Is the entire system down (0% success rate)?
    |       YES --> SEV1
    |       NO  --> continue
    |
    +-- Is success rate below 50% OR latency > 5x SLO?
    |       YES --> SEV2
    |       NO  --> continue
    |
    +-- Is a specific brain or feature completely unavailable?
    |       YES --> SEV3
    |       NO  --> continue
    |
    +-- Is the issue cosmetic, logging-only, or test-only?
            YES --> SEV4
            NO  --> Default to SEV3 and investigate further
```

### Triage Checklist

When an incident is detected, the on-call engineer performs the following within the response time SLA:

1. Check Supabase dashboard for error rate and latency spikes
2. Check Anthropic API status page (status.anthropic.com)
3. Check GitHub Actions for CI failures
4. Check recent deployments (last 24h) via `git log --oneline -10`
5. Run canary task manually: `px1000 orchestrate "List 3 colors"`
6. Classify severity using the decision tree above
7. Open incident channel (if SEV1/SEV2)

---

## 4. Response Procedures

### SEV1 -- Critical

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Acknowledge in #px1000-incidents Slack channel | On-call engineer | 15 min |
| 2 | Open dedicated incident Slack channel: `#inc-YYYY-MM-DD-brief-description` | On-call engineer | 15 min |
| 3 | Page engineering lead and project owner | On-call engineer | 15 min |
| 4 | Identify blast radius: which components are affected | On-call engineer | 30 min |
| 5 | Attempt immediate mitigation (see Section 6) | On-call engineer | 30 min |
| 6 | Post status update every 30 minutes | Incident commander | Ongoing |
| 7 | Confirm resolution; run canary and e2e tests | On-call engineer | After fix |
| 8 | Schedule postmortem within 48 hours | Engineering lead | Post-resolution |

### SEV2 -- Major

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Acknowledge in #px1000-incidents | On-call engineer | 30 min |
| 2 | Investigate root cause | On-call engineer | 1 hour |
| 3 | Apply mitigation | On-call engineer | 2 hours |
| 4 | Post status update every 2 hours | On-call engineer | Ongoing |
| 5 | Confirm resolution | On-call engineer | After fix |
| 6 | Write brief postmortem within 1 week | On-call engineer | Post-resolution |

### SEV3 -- Minor

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Acknowledge in #px1000-alerts | On-call engineer | 2 hours |
| 2 | Create GitHub issue with `incident` label | On-call engineer | 4 hours |
| 3 | Fix in next sprint or within 24 hours if trending toward SEV2 | Assigned engineer | 24 hours |
| 4 | Close issue with root cause note | Assigned engineer | After fix |

### SEV4 -- Low

| Step | Action | Owner | Timeline |
|------|--------|-------|----------|
| 1 | Create GitHub issue with `low-priority` label | Anyone | 24 hours |
| 2 | Prioritize in next sprint planning | Engineering lead | 1 week |
| 3 | Fix and close | Assigned engineer | 1 week |

---

## 5. Communication

### Notification Matrix

| Severity | Slack Channel | Page On-Call | Notify Eng Lead | Notify Project Owner |
|----------|--------------|-------------|-----------------|---------------------|
| SEV1 | #px1000-incidents | Yes (immediately) | Yes (immediately) | Yes (within 30 min) |
| SEV2 | #px1000-incidents | Yes (within 30 min) | Yes (within 1 hour) | Status update only |
| SEV3 | #px1000-alerts | No | If trending up | No |
| SEV4 | GitHub issue only | No | No | No |

### Status Update Template

```
**Incident:** [Brief description]
**Severity:** SEV[1-4]
**Status:** Investigating / Identified / Mitigating / Resolved
**Impact:** [What users are experiencing]
**Cause:** [Known or suspected root cause]
**Next Update:** [Time of next update]
**Actions Taken:** [What has been done so far]
```

---

## 6. Mitigation -- Common Quick Fixes

These are pre-approved immediate actions that the on-call engineer can take without additional approval:

### 6.1 Rollback Last Deployment

```bash
# Identify the last good commit
git log --oneline -5

# Revert to previous commit
git revert HEAD --no-edit
git push origin main

# Verify CI passes on the revert commit
```

**When to use:** Incident started immediately after a deployment; symptoms match changed components.

### 6.2 Disable Feature Flag

```sql
-- In Supabase SQL editor
UPDATE feature_flags SET enabled = false WHERE flag_name = '<suspect_feature>';
```

**When to use:** New feature is suspected; need to isolate quickly without full rollback.

### 6.3 Increase Timeout

```bash
# Update environment variable
# In .env or Supabase Edge Function secrets
ORCHESTRATION_TIMEOUT_MS=60000  # double the default
```

**When to use:** Latency SLO breach caused by upstream slowness (Anthropic API latency spike).

### 6.4 Switch Model

```bash
# Failover from primary to fallback model
DEFAULT_MODEL=claude-sonnet-4-20250514  # instead of opus
```

**When to use:** Primary model returning 529 (overloaded) or producing degraded output; fallback model can handle the workload acceptably.

### 6.5 Restart Services

```bash
# Restart Edge Functions (redeploy)
supabase functions deploy orchestrator

# Restart Docker sandbox containers
docker restart px1000-sandbox
```

**When to use:** Suspected state corruption; memory leak; hung connections.

### 6.6 Bypass Broken Brain

```sql
-- Temporarily disable a broken specialist brain
UPDATE brain_registry SET enabled = false WHERE brain_name = '<broken_brain>';
```

**When to use:** Single brain is crashing or producing errors; other brains are healthy; CEO can route around it.

---

## 7. Root Cause Analysis

### 5 Whys Template

Use this template after every SEV1 and SEV2 incident:

```
Incident: [Title]
Date: [YYYY-MM-DD]

1. Why did [the user-facing symptom] happen?
   Because [direct technical cause].

2. Why did [direct technical cause] happen?
   Because [underlying cause].

3. Why did [underlying cause] happen?
   Because [deeper cause].

4. Why did [deeper cause] happen?
   Because [systemic cause].

5. Why did [systemic cause] happen?
   Because [root cause -- usually a process, design, or organizational gap].

Root Cause: [One-sentence summary]
```

### Blameless Postmortem Template

```markdown
# Postmortem: [Incident Title]

**Date:** YYYY-MM-DD
**Duration:** [start time] to [resolution time] ([total duration])
**Severity:** SEV[1-4]
**Author:** [Name]
**Attendees:** [Names of postmortem participants]

## Summary
[2-3 sentences: what happened, who was impacted, how it was resolved]

## Timeline (all times UTC)
- HH:MM -- [Event: first signal of incident]
- HH:MM -- [Event: alert fired / user report received]
- HH:MM -- [Event: on-call acknowledged]
- HH:MM -- [Event: root cause identified]
- HH:MM -- [Event: mitigation applied]
- HH:MM -- [Event: incident resolved]
- HH:MM -- [Event: monitoring confirmed stable]

## Impact
- **Users affected:** [number or percentage]
- **Requests failed:** [count]
- **Duration of impact:** [minutes/hours]
- **SLO budget consumed:** [percentage of monthly budget]
- **Revenue impact:** [if applicable]

## Root Cause
[Detailed explanation of the root cause. What broke and why.]

## 5 Whys
[Fill in the 5 Whys template from above]

## What Went Well
- [Thing that worked during incident response]
- [Detection or mitigation that helped]

## What Went Wrong
- [Thing that made the incident worse or slower to resolve]
- [Gap in monitoring, documentation, or process]

## Action Items
| # | Action | Owner | Priority | Due Date | Status |
|---|--------|-------|----------|----------|--------|
| 1 | [Specific action] | [Name] | P1/P2/P3 | YYYY-MM-DD | Open |
| 2 | [Specific action] | [Name] | P1/P2/P3 | YYYY-MM-DD | Open |

## Lessons Learned
[Key takeaways that should be shared with the broader team]
```

---

## 8. Recovery Verification

After mitigation is applied, the incident is not considered resolved until all of the following pass:

### Recovery Checklist

- [ ] **Canary test passes:** `px1000 orchestrate "List 3 colors"` completes in < 10s
- [ ] **End-to-end test passes:** Complex multi-brain orchestration returns valid output
- [ ] **SLI metrics return to normal:** Availability > 99.5%, latency within SLO, success rate > 90%
- [ ] **Error rate stable:** No new errors in logs for 15 minutes after fix
- [ ] **Supabase health:** All connections healthy, no queued writes, storage accessible
- [ ] **CI green:** Latest commit on `main` passes all tests
- [ ] **No alert regressions:** All alerts have cleared; no new alerts fired

### Monitoring Window

After marking an incident resolved:
- **SEV1:** Monitor closely for 24 hours; on-call stays alert
- **SEV2:** Monitor closely for 6 hours
- **SEV3:** Monitor for 1 hour; check next morning
- **SEV4:** Normal monitoring

---

## 9. Post-Incident Process

### Timeline

| Action | SEV1 | SEV2 | SEV3 | SEV4 |
|--------|------|------|------|------|
| Postmortem meeting | Within 48 hours | Within 1 week | Async write-up | Not required |
| Postmortem document published | Within 72 hours | Within 1 week | Within 1 week | N/A |
| Action items created | At postmortem meeting | At postmortem | In GitHub issue | In GitHub issue |
| Action items reviewed | Next sprint planning | Next sprint planning | Next sprint | Backlog |
| Pattern extraction to Memory/ | Within 1 week | Within 1 week | If novel pattern | If novel pattern |

### Pattern Extraction to Memory/

After each significant incident, extract reusable patterns and store them for the agent system's long-term memory:

```bash
# Location for incident learnings
/prototype_x1000/agents/memory/incidents/

# File naming convention
YYYY-MM-DD-brief-description.md
```

Each pattern file should contain:
- **Pattern name:** Short, searchable title
- **Trigger conditions:** How to recognize this situation is happening again
- **Resolution:** Step-by-step fix that worked
- **Prevention:** What was done to prevent recurrence
- **Related SLO:** Which SLO(s) were impacted

This ensures the system learns from failures and can surface relevant past incidents when similar conditions arise.

### Incident Review Metrics

Track these aggregate metrics monthly:
- Total incidents by severity
- Mean time to detect (MTTD)
- Mean time to acknowledge (MTTA)
- Mean time to mitigate (MTTM)
- Mean time to resolve (MTTR)
- Action item completion rate
- Repeat incident rate (same root cause recurring)

---

## Appendix: On-Call Rotation

- On-call rotation is weekly, Monday to Monday
- On-call engineer must be reachable within 15 minutes during business hours (9 AM - 6 PM local)
- After-hours response time is relaxed to 1 hour for SEV2+; SEV1 remains 15 minutes
- On-call handoff includes a brief summary of active issues and recent deployments
- On-call engineer has pre-authorized access to all mitigation actions in Section 6

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-19 | Engineering Brain | Initial incident response plan |

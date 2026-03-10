# Service Level Objectives (SLOs) -- PX1000 Agent System

**Document Owner:** Engineering Brain
**Last Updated:** 2026-02-19
**Review Cadence:** Monthly; recalibrate targets quarterly

---

## Overview

This document defines the Service Level Indicators (SLIs) and Service Level Objectives (SLOs) for the PX1000 agent orchestration system. Each SLO includes measurement methodology, error budgets, alerting thresholds, and escalation procedures.

**SLO Window:** Rolling 30-day calendar period
**Budget Reset:** 1st of each month at 00:00 UTC

---

## SLO 1: Availability

### Definition

The system is "available" when an orchestration request receives a non-error response (HTTP 2xx or a structured agent result) within the timeout window. Internal errors (5xx), unhandled exceptions, and timeouts count as unavailability.

| Field | Value |
|-------|-------|
| **SLI** | `(successful_requests / total_requests) * 100` over the rolling window |
| **SLO Target** | 99.5% |
| **Error Budget** | 0.5% = ~3.6 hours of downtime per 30-day month (assuming uniform traffic) |
| **Measurement** | Supabase query: `SELECT COUNT(*) FILTER (WHERE status != 'error') / COUNT(*) FROM orchestration_runs WHERE created_at > now() - interval '30 days'` |
| **Alerting Threshold** | Alert when availability drops below 99.7% (approaching budget) |
| **Escalation** | Page on-call engineer if availability drops below 99.3% in any 1-hour window |

### Burn Rate Alerts

| Window | Budget Consumed | Trigger |
|--------|----------------|---------|
| 1 hour | > 5% of monthly budget (~10.8 min of errors) | Slack alert to #px1000-alerts |
| 6 hours | > 20% of monthly budget | Page on-call engineer |
| 24 hours | > 50% of monthly budget | Escalate to engineering lead; consider rollback |

### Exclusions

- Scheduled maintenance windows (announced 24h in advance) are excluded
- Anthropic-side outages confirmed via status.anthropic.com are tracked separately

---

## SLO 2: Latency

### Definition

Latency is measured from the moment the CEO agent receives the orchestration request to the moment the final synthesized response is returned to the caller. Tasks are classified as "simple" (single-brain, no tool use) or "complex" (multi-brain, tool use, or sandbox execution).

| Field | Value |
|-------|-------|
| **SLI (Simple)** | p95 latency of requests tagged `complexity=simple` |
| **SLI (Complex)** | p95 latency of requests tagged `complexity=complex` |
| **SLO Target (Simple)** | p95 < 15 seconds |
| **SLO Target (Complex)** | p95 < 60 seconds |
| **Error Budget** | 5% of requests may exceed the target latency |
| **Measurement** | Supabase query: `SELECT percentile_cont(0.95) WITHIN GROUP (ORDER BY duration_ms) FROM orchestration_runs WHERE complexity = 'simple' AND created_at > now() - interval '30 days'` |
| **Alerting Threshold** | Alert when p95 exceeds 12s (simple) or 50s (complex) -- 80% of budget |
| **Escalation** | Page on-call if p95 exceeds 20s (simple) or 90s (complex) for 15+ minutes |

### Burn Rate Alerts

| Window | Condition | Trigger |
|--------|-----------|---------|
| 1 hour | > 10% of requests exceed 2x the SLO target | Slack alert |
| 6 hours | p95 > 1.5x the SLO target sustained | Page on-call engineer |
| 24 hours | p95 > 1.2x the SLO target sustained | Engineering lead review; check for model regression |

### Latency Breakdown Tracking

To diagnose latency issues, each orchestration run logs sub-timings:

- `t_decomposition`: Time for CEO to decompose task (target < 3s)
- `t_routing`: Time to select and initialize specialist brains (target < 500ms)
- `t_execution`: Time for specialist(s) to execute (largest contributor)
- `t_synthesis`: Time for CEO to combine results (target < 3s)

---

## SLO 3: Success Rate

### Definition

A task is "successful" when the orchestrated output is actionable -- meaning it is parseable, relevant to the request, and does not consist solely of an error message or refusal. Success is determined by a combination of automated checks and sampling.

| Field | Value |
|-------|-------|
| **SLI** | `(tasks_with_actionable_output / total_completed_tasks) * 100` |
| **SLO Target** | 90% |
| **Error Budget** | 10% of tasks may produce non-actionable output |
| **Measurement** | Automated: check `output_validation_passed` flag in Supabase. Manual: weekly sample of 50 tasks reviewed by human for quality |
| **Alerting Threshold** | Alert when automated success rate drops below 92% (buffer before SLO breach) |
| **Escalation** | If success rate drops below 85% for 24h, halt non-critical deployments and investigate |

### Burn Rate Alerts

| Window | Condition | Trigger |
|--------|-----------|---------|
| 1 hour | Success rate < 80% on > 20 tasks | Slack alert; likely systemic issue |
| 6 hours | Success rate < 87% | Page on-call; check for prompt regression or API degradation |
| 24 hours | Success rate < 89% | Engineering review; compare against previous day's prompt versions |

### What Counts as Non-Actionable

- Empty or near-empty response (< 50 characters)
- Response is an error message or stack trace
- Response is a model refusal ("I cannot help with...")
- Response fails output schema validation (when schema is defined)
- Response is a verbatim copy of the input (echo detection)

---

## SLO 4: Token Efficiency

### Definition

Token efficiency measures the total tokens consumed (input + output across all API calls) to complete a single orchestration task. Excessive token usage indicates prompt bloat, unnecessary retries, or runaway agent loops.

| Field | Value |
|-------|-------|
| **SLI (Simple)** | Average `total_tokens` for tasks tagged `complexity=simple` |
| **SLI (Complex)** | Average `total_tokens` for tasks tagged `complexity=complex` |
| **SLO Target (Simple)** | Average < 8,000 tokens per task |
| **SLO Target (Complex)** | Average < 30,000 tokens per task |
| **Error Budget** | 10% of tasks may exceed the target (measured as p90, not hard cap) |
| **Measurement** | Supabase query: `SELECT AVG(total_tokens) FROM orchestration_runs WHERE complexity = 'simple' AND created_at > now() - interval '7 days'` (7-day rolling average) |
| **Alerting Threshold** | Alert when 7-day average exceeds 7,000 (simple) or 27,000 (complex) -- 87.5% of budget |
| **Escalation** | If average exceeds 10,000 (simple) or 40,000 (complex), investigate for prompt regression or infinite loops |

### Burn Rate Alerts

| Window | Condition | Trigger |
|--------|-----------|---------|
| 1 hour | Any single task consumes > 50,000 tokens | Slack alert; likely runaway loop |
| 6 hours | Average exceeds 1.5x target | Review recent prompt changes |
| 24 hours | Average exceeds 1.2x target | Prompt audit; check for new brains with verbose system prompts |

### Token Budget Breakdown (Target)

For a typical complex task (30,000 token budget):

| Component | Target Allocation |
|-----------|------------------|
| CEO system prompt + task decomposition | 4,000 tokens |
| Brain CLAUDE.md loading (per specialist) | 2,000 tokens |
| Specialist execution (per brain) | 8,000 tokens |
| CEO synthesis | 3,000 tokens |
| Overhead (retries, error handling) | 5,000 tokens |

---

## SLO 5: Test Suite Health

### Definition

The CI test suite must maintain a high pass rate to ensure code quality and developer confidence. Flaky tests erode trust and slow down development.

| Field | Value |
|-------|-------|
| **SLI (Pass Rate)** | `(passing_runs / total_runs) * 100` for the full test suite |
| **SLI (Flaky Rate)** | `(tests_that_flaked / total_test_cases) * 100` per CI run |
| **SLO Target (Pass Rate)** | 100% on every CI run (all tests pass) |
| **SLO Target (Flaky Rate)** | < 2% of test cases exhibit flakiness over a 7-day window |
| **Error Budget** | 0 tolerance for legitimate failures; flaky budget is 2% |
| **Measurement** | GitHub Actions API: query workflow run conclusions. Flake detection: compare test results across last 10 runs; any test that passes and fails is flagged flaky |
| **Alerting Threshold** | Any CI failure on `main` branch triggers immediate alert |
| **Escalation** | If `main` is red for > 30 minutes, page on-call; all merges blocked |

### Burn Rate Alerts

| Window | Condition | Trigger |
|--------|-----------|---------|
| 1 hour | 2+ CI failures on `main` | Slack alert; likely real regression, not flake |
| 6 hours | Flaky rate > 3% | Add failing tests to quarantine; investigate root causes |
| 24 hours | Flaky rate > 5% | Halt feature work; dedicate sprint to test stability |

### Flaky Test Management

1. Tests that fail non-deterministically are moved to a `quarantine` tag
2. Quarantined tests run in a separate CI job (non-blocking)
3. Quarantined tests must be fixed or deleted within 7 days
4. Weekly report of flaky test trends posted to #px1000-engineering

---

## Error Budget Policy

When an SLO's error budget is exhausted (100% consumed):

1. **Freeze:** No new feature deployments until budget recovers
2. **Focus:** Engineering effort redirected to reliability improvements
3. **Review:** Postmortem required for the event(s) that consumed the budget
4. **Reset:** Budget resets on the 1st of the following month

When an SLO's error budget is at 50-99% consumed:

1. **Caution:** New deployments require explicit reliability review
2. **Monitor:** Increase alerting sensitivity (lower thresholds by 20%)
3. **Plan:** Schedule reliability work for next sprint

---

## Dashboard

All SLIs are visualized in a Supabase dashboard with:

- Real-time gauges for each SLO (green/yellow/red)
- Error budget burn-down charts (30-day rolling)
- Historical trend lines (90-day)
- Anomaly detection highlights

Access: `https://<project>.supabase.co/dashboard/px1000-slos`

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-19 | Engineering Brain | Initial SLO definitions for all 5 objectives |

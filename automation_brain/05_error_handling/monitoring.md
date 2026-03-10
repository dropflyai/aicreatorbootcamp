# Monitoring: Observability for Automation Systems

## Overview

Automation systems operate unattended, making observability critical for detecting failures, understanding performance, and maintaining reliability. Without comprehensive monitoring, failures can go undetected for hours or days, causing data inconsistencies, missed SLAs, and customer impact. This module covers execution monitoring, alerting strategies, logging standards, dashboard design, and anomaly detection for automation workflows.

---

## 1. Monitoring Philosophy

### 1.1 The Three Pillars of Observability

**Metrics**: Numerical measurements collected over time. Examples: execution success rate, average latency, error count, queue depth. Use for dashboards, alerting, and trend analysis.

**Logs**: Discrete events with contextual information. Examples: workflow execution started, API call returned 429, record created successfully. Use for debugging and audit.

**Traces**: End-to-end tracking of a single workflow execution across all steps. Examples: the complete path of an order through the automation system. Use for debugging complex workflows and identifying bottlenecks.

### 1.2 What to Monitor

| Layer | Metrics | Why |
|-------|---------|-----|
| Workflow Execution | Success rate, failure rate, duration | Core health indicator |
| Individual Steps | Step success rate, latency per step | Identify bottleneck steps |
| External APIs | Response time, error rate, rate limit usage | Third-party dependency health |
| Infrastructure | CPU, memory, queue depth | Capacity and resource health |
| Business | Records processed, data freshness, sync lag | Business outcome verification |

---

## 2. Execution Monitoring

### 2.1 Execution Lifecycle

Track every workflow execution through its complete lifecycle:

```
Triggered --> Queued --> Running --> Completed/Failed/Timed Out
    |            |          |              |
    v            v          v              v
[Log trigger] [Log queue] [Log steps] [Log outcome]
[Record time] [Record wait] [Record each step] [Record duration, status]
```

### 2.2 Key Execution Metrics

| Metric | Description | Aggregation |
|--------|-------------|-------------|
| execution_total | Total executions | Count per workflow per hour |
| execution_success | Successful completions | Count per workflow per hour |
| execution_failure | Failed executions | Count per workflow per hour |
| execution_duration | End-to-end execution time | P50, P95, P99 |
| execution_queue_time | Time waiting in queue | P50, P95, P99 |
| step_duration | Duration of each workflow step | Per step: P50, P95, P99 |
| step_retry_count | Number of retries per step | Sum per step per hour |

### 2.3 Success Rate Calculation

```
Success Rate = execution_success / execution_total * 100

Targets:
  Critical workflows: > 99.9%
  Standard workflows: > 99.0%
  Best-effort workflows: > 95.0%
```

### 2.4 Duration Monitoring

Track execution duration trends to detect performance degradation:
- P50 (median): Typical execution time
- P95: Most executions complete within this time
- P99: Only 1% of executions exceed this time
- Max: The worst-case execution time

Alert when duration metrics increase by more than 50% compared to the 7-day baseline.

---

## 3. Alerting Strategy

### 3.1 Alert Severity Levels

| Level | Criteria | Response Time | Notification |
|-------|----------|---------------|-------------|
| Critical | Service down, data loss risk | < 15 minutes | PagerDuty + Slack + Email |
| High | Elevated failure rate, SLA at risk | < 1 hour | Slack + Email |
| Warning | Anomaly detected, potential issue | < 4 hours | Slack |
| Info | Notable event, no action needed | Next business day | Dashboard only |

### 3.2 Alert Design Principles

**Alert on Symptoms, Not Causes**: Alert on "execution failure rate > 5%" rather than "API X returned 500". The symptom is what matters; the cause will be investigated.

**Avoid Alert Fatigue**: Too many alerts cause teams to ignore all alerts. Each alert should require action. If an alert frequently fires without requiring action, either fix the underlying issue or remove the alert.

**Use Thresholds, Not Absolute Numbers**: "Error rate > 5%" is better than "More than 10 errors." Absolute numbers do not account for volume changes.

**Include Context**: Every alert should include:
- What is failing
- Since when
- Current metric value vs. threshold
- Link to relevant dashboard
- Link to runbook for this alert

### 3.3 Alert Configuration

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| Workflow failure spike | Error rate > 5% for 10 min | High | Investigate, pause if needed |
| Workflow stopped running | No executions for 2x schedule interval | Critical | Check trigger, restart |
| Execution duration spike | P95 > 3x baseline | Warning | Investigate performance |
| Dead letter queue depth | DLQ items > 20 | High | Manual review required |
| Rate limit approaching | API rate limit > 80% | Warning | Review rate limiting |
| Queue backing up | Queue depth > 100 items | High | Scale workers or investigate |
| Credential expiring | Token expires in < 24h | Warning | Rotate credential |

### 3.4 Alert Suppression

Suppress alerts during known events:
- Scheduled maintenance windows
- Known third-party outages (confirmed via status page)
- Planned workflow changes (brief alert suppression during deployment)

---

## 4. Logging Standards

### 4.1 Log Format

Use structured logging (JSON) for machine parseability:

```json
{
  "timestamp": "2024-03-15T10:30:00.000Z",
  "level": "ERROR",
  "workflow_id": "wf_abc123",
  "execution_id": "exec_def456",
  "step": "Create Salesforce Record",
  "step_index": 3,
  "message": "API call failed: 429 Rate Limited",
  "error_code": 429,
  "retry_attempt": 2,
  "api_endpoint": "https://api.salesforce.com/services/data/v58.0/sobjects/Contact",
  "duration_ms": 1250,
  "context": {
    "record_id": "CONTACT-789",
    "operation": "create"
  }
}
```

### 4.2 Log Levels

| Level | Usage | Example |
|-------|-------|---------|
| DEBUG | Detailed diagnostic information | "Processing item 42 of 100" |
| INFO | Normal operation milestones | "Workflow execution started" |
| WARN | Recoverable issues | "Retry attempt 2 of 3" |
| ERROR | Operation failed | "API call failed after all retries" |
| FATAL | System-level failure | "Workflow engine crashed" |

### 4.3 What to Log

**Always Log**:
- Workflow execution start and end (with status and duration)
- Each step start and end (with status and duration)
- All external API calls (request method, URL, status code, duration)
- All errors (with full context for debugging)
- All retries (attempt number, wait time, reason)

**Never Log**:
- Credentials, API keys, or tokens
- Full request/response bodies containing PII
- Unredacted personal information (names, emails, SSNs)

### 4.4 Log Retention

| Log Type | Retention | Reason |
|----------|----------|--------|
| Execution logs | 30 days | Debugging and trend analysis |
| Error logs | 90 days | Root cause analysis |
| Audit logs | 1 year | Compliance |
| Debug logs | 7 days | Short-term diagnostics |

---

## 5. Dashboard Design

### 5.1 Overview Dashboard

The primary dashboard for automation health:

**Section 1 -- Health Summary**:
- Overall success rate (last 24h, 7d, 30d)
- Active workflows count
- Failed workflows count (with severity breakdown)
- Dead letter queue depth

**Section 2 -- Execution Volume**:
- Executions per hour (time series, 24h view)
- Success vs. failure (stacked bar chart)
- Execution duration (P50, P95 lines)

**Section 3 -- Top Failures**:
- Top 10 failing workflows (by failure count)
- Error distribution (by error type)
- New failures (workflows that started failing in the last hour)

### 5.2 Workflow Detail Dashboard

Per-workflow dashboard for investigation:
- Execution history (timeline view)
- Step-by-step duration breakdown (waterfall chart)
- Error rate per step
- Recent failures with error messages
- Retry statistics

### 5.3 API Health Dashboard

Track the health of external API dependencies:
- Response time by API (P50, P95, P99)
- Error rate by API
- Rate limit utilization by API
- Circuit breaker state by API

---

## 6. Anomaly Detection

### 6.1 Statistical Anomaly Detection

Detect unusual patterns without hard-coded thresholds:

**Baseline Calculation**: Compute rolling statistics (mean, standard deviation) over a 7-day window with the same time-of-day granularity (account for daily patterns).

**Anomaly Detection**: Flag values that deviate more than 3 standard deviations from the baseline.

**Seasonal Adjustment**: Account for weekly patterns (Monday volume is typically higher than Sunday). Compute separate baselines for each day of the week.

### 6.2 Anomaly Types

| Type | Detection Method | Example |
|------|-----------------|---------|
| Sudden failure spike | Percentage change vs. baseline | Error rate jumps from 1% to 15% |
| Gradual degradation | Trend analysis over 7 days | P95 latency increasing 10% daily |
| Missing executions | Expected volume vs. actual | Scheduled workflow did not run |
| Volume anomaly | Statistical deviation | Twice the normal number of triggers |
| Pattern break | Day-over-day comparison | Monday traffic is 50% lower than usual |

### 6.3 Automated Response

When anomalies are detected:
1. Generate alert with anomaly context
2. Automatically increase logging verbosity for affected workflows
3. Capture diagnostic snapshot (queue depth, resource utilization)
4. If severity warrants, automatically pause non-critical workflows

---

## 7. Monitoring Tools

| Tool | Strengths | Best For |
|------|-----------|----------|
| Datadog | Comprehensive, great dashboards | Enterprise monitoring |
| Grafana + Prometheus | Open-source, flexible | Self-hosted monitoring |
| New Relic | APM + infrastructure | Application performance |
| PagerDuty | Incident management | Alert routing and escalation |
| Sentry | Error tracking | Application error monitoring |
| Platform-native | Integrated with automation platform | Basic monitoring |

---

## 8. Key References

- Beyer et al. (2016) -- "Site Reliability Engineering" (Google SRE book)
- Majors et al. (2022) -- "Observability Engineering" (O'Reilly)
- Sridharan (2018) -- "Distributed Systems Observability" (The three pillars)

---

*This module covers monitoring. See `error_patterns.md` for error handling and `resilience.md` for advanced resilience patterns.*

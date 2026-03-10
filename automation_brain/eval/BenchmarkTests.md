# Automation Brain Benchmark Tests -- Authoritative

These scenarios test real-world automation engineering competence.
Every scenario requires a complete solution, not a conceptual answer.

A passing response must include: root cause analysis, architecture,
implementation plan, error handling, idempotency strategy, and monitoring.

"It should work" is not engineering. "It will work because..." is.

---

## BENCHMARK RULES

- Each scenario must be answered with a concrete, implementable plan
- Error handling must be specified (not "add error handling later")
- Idempotency must be addressed for every scenario
- Monitoring and alerting must be included
- Edge cases must be handled explicitly
- Time estimate and maintenance cost must be provided

### Scoring Per Scenario

- **5** -- Production-ready plan with error handling, idempotency, monitoring, edge cases, maintenance plan
- **4** -- Strong plan with minor gaps, error handling present, idempotency addressed
- **3** -- Reasonable approach but missing error handling or idempotency or monitoring
- **2** -- Conceptual only, no implementation specifics, no error handling
- **1** -- Wrong approach or critical misunderstanding

### Passing Criteria

- Average across all scenarios >= 4.0
- No scenario < 3
- All "Critical" scenarios >= 4

---

## SCENARIO 1: CRM DUPLICATE RECORDS [Critical]

**Situation:**
CRM sync automation creates duplicate contact records 2% of the time. The sync
runs every 15 minutes, pulling new leads from a web form and creating contacts
in the CRM. Duplicates are caused by: form resubmissions, sync overlap (previous
run not finished when new run starts), and inconsistent email formatting.

**Task:**
Diagnose and design an idempotent solution that eliminates duplicates.

**Required in Response:**
- Root cause analysis for each duplicate source
- Idempotent sync design (dedup keys, upsert strategy)
- Handling for concurrent execution (locking, queue, or serialization)
- Email normalization strategy
- Duplicate detection and merge for existing duplicates
- Monitoring to verify dedup is working
- Rollback plan if dedup logic has bugs

**Red Flags (auto-fail if present):**
- "Just check if the record exists before creating" without addressing race conditions
- No consideration of concurrent execution
- No strategy for existing duplicates

---

## SCENARIO 2: MULTI-LEVEL APPROVAL WORKFLOW [Critical]

**Situation:**
Design an approval workflow with these requirements: 3 approval levels (manager,
director, VP), timeout escalation (if no response in 24 hours, escalate to next
level), full audit trail, rollback capability (approved items can be revoked
within 48 hours), delegation support (approver can delegate to another person).

**Task:**
Architecture the complete workflow system.

**Required in Response:**
- State machine design (all states, transitions, and guards)
- Timeout and escalation mechanism
- Delegation logic (who can delegate, to whom, audit trail)
- Rollback mechanism (revocation within 48 hours)
- Notification strategy per state transition
- Audit trail schema (what is logged, retention, query patterns)
- Error handling for each transition
- Edge cases (approver on vacation, conflicting approvals, system downtime during timeout)

**Red Flags (auto-fail if present):**
- No state machine or state management approach
- Timeout mechanism not specified
- No audit trail design

---

## SCENARIO 3: SCALE FROM 10K TO 100K RECORDS [Critical]

**Situation:**
Automation processes 10K records per hour (daily ETL from source to warehouse).
Business is scaling and needs to handle 100K records per hour. Current implementation
is sequential, processing one record at a time, using a single API connection.

**Task:**
Design a scaling strategy to handle 10x volume.

**Required in Response:**
- Current bottleneck analysis (where is time spent)
- Parallelization strategy (batch size, concurrency limits, worker pools)
- Rate limit management for external APIs
- Queue architecture for backpressure handling
- Resource scaling plan (compute, memory, connections)
- Error handling at scale (partial batch failure, dead letter queue sizing)
- Monitoring for throughput, latency, and error rates
- Cost analysis (infrastructure cost at 10x)
- Gradual rollout plan (not big bang)

**Red Flags (auto-fail if present):**
- "Just add more workers" without rate limit analysis
- No backpressure handling
- No cost analysis

---

## SCENARIO 4: PAYMENT RECONCILIATION

**Situation:**
Stripe payments need to be reconciled with internal order database daily.
Discrepancies found: 0.3% of payments have no matching order, 0.1% of orders
have no matching payment, and 0.05% have amount mismatches. Current process
is manual and takes 4 hours daily.

**Task:**
Automate the reconciliation with exception handling.

**Required in Response:**
- Reconciliation algorithm (matching strategy, fuzzy matching for edge cases)
- Exception categorization (types of discrepancies, severity, auto-resolve vs manual)
- Auto-resolution rules for common discrepancies
- Manual review queue for unresolvable discrepancies
- Audit trail for all reconciliation decisions (auto and manual)
- Reporting dashboard design
- Historical trend tracking (are discrepancies increasing?)
- Edge cases (refunds, partial payments, currency conversion)

---

## SCENARIO 5: WEBHOOK RELIABILITY

**Situation:**
Your system receives webhooks from 5 different third-party services. Problems:
webhooks are sometimes delivered out of order, sometimes duplicated, occasionally
the receiving endpoint is down, and some services do not retry on failure.

**Task:**
Design a reliable webhook ingestion system.

**Required in Response:**
- Webhook receiving architecture (queue-first pattern)
- Deduplication strategy (idempotency keys per service)
- Ordering guarantee strategy (sequence numbers, event timestamps)
- Dead letter queue for unprocessable webhooks
- Monitoring per webhook source
- Backfill strategy for services that do not retry
- Signature validation per service
- Processing guarantee (at-least-once, exactly-once, or best-effort per use case)
- Failure response codes (what to return to prevent retries when appropriate)

---

## SCENARIO 6: MULTI-SYSTEM DATA SYNC

**Situation:**
Keep 4 systems in sync: CRM, billing system, support desk, and marketing platform.
Each system is the source of truth for different fields. Changes in any system
should propagate to the others. Current state: systems are out of sync, and
nobody trusts any single system.

**Task:**
Design the multi-system sync architecture.

**Required in Response:**
- Source of truth matrix (which system owns which fields)
- Event-driven sync architecture (change detection, propagation)
- Conflict resolution strategy (what happens when two systems change the same field)
- Initial reconciliation plan (get systems back in sync before automation)
- Sync monitoring (drift detection, consistency checks)
- Error handling per sync direction
- Idempotency per sync operation
- Circuit breaker per downstream system
- Schema mapping between systems

---

## SCENARIO 7: AUTOMATED ONBOARDING PIPELINE

**Situation:**
New employee onboarding requires 23 steps across 8 systems (HR, IT, security,
facilities, payroll, benefits, training, team tools). Current process is a
shared spreadsheet tracked by HR. Steps have dependencies (cannot provision
laptop until IT account is created). Average time: 5 business days. Target: 4 hours.

**Task:**
Design the automated onboarding pipeline.

**Required in Response:**
- Dependency graph of all 23 steps
- Parallel execution plan (which steps can run simultaneously)
- API integration strategy per system (or manual step if no API)
- Progress dashboard for HR and new hire
- Error handling per step (what if one system is down)
- Rollback capability (offer rescinded after partial onboarding)
- SLA per step and overall
- Notification strategy (HR, manager, new hire)
- Edge cases (contractor vs full-time, international hire, rehire)

---

## SCENARIO 8: RATE LIMIT ORCHESTRATION

**Situation:**
Three automations share the same API: one runs continuously (real-time sync),
one runs hourly (batch update), and one runs on-demand (user triggered). The
API has a global rate limit of 100 requests/second. Currently, the automations
are uncoordinated and hit rate limits during peak overlap.

**Task:**
Design a rate limit orchestration strategy.

**Required in Response:**
- Rate limit budget allocation per automation (priority-based)
- Token bucket or leaky bucket implementation
- Priority system (user-triggered > real-time sync > batch)
- Queue management when rate limit is reached
- Dynamic adjustment based on actual API response headers
- Monitoring and alerting for rate limit utilization
- Graceful degradation per automation when starved
- Cost analysis if upgrading API tier is cheaper than engineering

---

## SCENARIO 9: FILE PROCESSING PIPELINE

**Situation:**
Process incoming files: CSV, Excel, PDF, and JSON. Files arrive via SFTP, email
attachment, API upload, and S3 drop. Each file type requires different parsing.
Files range from 1KB to 5GB. Some files have encoding issues, some are corrupted,
some have schema changes without notice.

**Task:**
Design a robust file processing pipeline.

**Required in Response:**
- Ingestion layer (unified intake from 4 sources)
- File type detection and routing
- Parser per file type with error handling
- Large file handling (streaming, chunking for 5GB files)
- Schema validation and drift detection
- Encoding detection and normalization
- Corrupt file handling (quarantine, notification, retry with different parser)
- Processing status tracking and dashboard
- Idempotent processing (same file uploaded twice = processed once)
- Archive and retention strategy

---

## SCENARIO 10: MONITORING AUTOMATION HEALTH

**Situation:**
You have 47 automations running in production. There is no unified monitoring.
Some automations fail silently. Some have not run in weeks (but should run daily).
Nobody knows which automations are critical vs nice-to-have.

**Task:**
Design an automation health monitoring system.

**Required in Response:**
- Automation registry (catalog of all automations with metadata)
- Health check protocol per automation type
- Expected execution schedule vs actual (missed run detection)
- Alert routing (who gets paged for which automation)
- Criticality classification (P0-P3)
- Dashboard design (health overview, drill-down per automation)
- Dead automation detection (has not run when expected)
- Dependency mapping (which automations depend on which)
- SLA tracking per automation
- Weekly health report generation

---

## SCENARIO 11: DISASTER RECOVERY FOR AUTOMATIONS

**Situation:**
Your primary automation platform goes down (region outage). 12 business-critical
automations stop running. Some process financial transactions. Some sync
customer data. Downtime tolerance: 15 minutes for financial, 1 hour for sync.

**Task:**
Design the disaster recovery strategy.

**Required in Response:**
- Classification of automations by downtime tolerance
- Failover architecture (hot standby, warm standby, or cold recovery per tier)
- State recovery (how to resume from where automation stopped)
- Data consistency check after recovery
- Financial transaction handling during outage (queue, defer, or manual)
- Communication plan during outage
- Recovery testing plan (how often, what is tested)
- Cost of DR infrastructure vs risk of downtime
- RTO and RPO per automation tier

---

## SCENARIO 12: LEGACY SYSTEM INTEGRATION

**Situation:**
Must integrate with a legacy system that has: no API (only SFTP and email),
batch processing once per day at 2 AM, character encoding issues (mixed Latin-1
and UTF-8), no idempotency support, and field length limits that truncate data.

**Task:**
Design a reliable integration strategy.

**Required in Response:**
- Data exchange pattern (file-based via SFTP, email parsing)
- Encoding normalization strategy
- Data truncation handling (what to do when data exceeds field limits)
- Idempotency layer (since the legacy system does not support it)
- Scheduling around the 2 AM batch window
- Error detection (how to know if the legacy system processed successfully)
- Data validation before and after exchange
- Migration path (long-term plan to move off legacy)
- Manual fallback when automation fails

---

## SCENARIO 13: COMPLIANCE AUDIT AUTOMATION

**Situation:**
Quarterly compliance audit requires: collecting evidence from 6 systems,
generating 15 report types, cross-referencing data for inconsistencies,
and producing a final audit package. Currently takes a compliance team 3 weeks.

**Task:**
Automate the compliance audit evidence collection and reporting.

**Required in Response:**
- Evidence collection pipeline per system
- Report generation templates and logic
- Cross-reference and inconsistency detection
- Audit trail of the automation itself (meta-audit)
- Exception flagging for manual review
- Report approval workflow
- Scheduling and deadline management
- Regulatory change management (updating when rules change)
- Data retention and archival per compliance requirements

---

## SCENARIO 14: EVENT-DRIVEN NOTIFICATION SYSTEM

**Situation:**
Build a notification system that: sends notifications across 4 channels (email,
SMS, push, in-app), respects user preferences, handles timezone-aware delivery,
supports batching (digest mode), and has do-not-disturb windows.

**Task:**
Design the event-driven notification architecture.

**Required in Response:**
- Event taxonomy (what events trigger notifications)
- Channel routing logic (preference + fallback)
- Timezone-aware scheduling
- Batch/digest aggregation logic
- Do-not-disturb enforcement
- Rate limiting per user per channel
- Delivery tracking and retry
- Unsubscribe and preference management
- Template management per channel
- Analytics (delivery rate, open rate, engagement)

---

## SCENARIO 15: SELF-HEALING AUTOMATION

**Situation:**
Design an automation framework that detects its own failures and attempts
self-repair before alerting humans. Common failure modes: expired credentials,
schema changes in upstream APIs, rate limit changes, and memory leaks in
long-running processes.

**Task:**
Design the self-healing automation framework.

**Required in Response:**
- Failure pattern detection (how to identify each failure type)
- Auto-remediation per failure type
- Credential refresh automation
- Schema drift detection and adaptation
- Rate limit adaptation (detect new limits, adjust behavior)
- Memory management for long-running processes
- Escalation criteria (when self-healing fails, alert human)
- Self-healing audit trail (what was fixed, when, how)
- Testing strategy for self-healing logic
- Limits of self-healing (what should NOT be auto-fixed)

---

## SCENARIO 16: CROSS-TIMEZONE BATCH PROCESSING

**Situation:**
Global company runs batch processes that must respect business hours in 4 timezones
(US-East, US-West, London, Tokyo). Some batches must run before business opens.
Some must not run during business hours (heavy system load). Daylight savings
changes cause issues twice a year.

**Task:**
Design timezone-aware batch scheduling.

**Required in Response:**
- Business hours definition per timezone (including holidays)
- Scheduling logic that adapts to DST transitions
- Dependency management between cross-timezone batches
- Conflict resolution when timezone windows overlap
- Holiday calendar management (per country)
- Monitoring for missed or delayed batches
- Manual override capability
- Alert for DST transition 1 week before change
- Testing strategy for DST edge cases

---

## FINAL BENCHMARK ASSESSMENT

### Scoring Summary

| Scenario | Score | Critical? | Notes |
|----------|-------|-----------|-------|
| 1. CRM Duplicates | /5 | Yes | |
| 2. Approval Workflow | /5 | Yes | |
| 3. Scale 10K to 100K | /5 | Yes | |
| 4. Payment Reconciliation | /5 | No | |
| 5. Webhook Reliability | /5 | No | |
| 6. Multi-System Sync | /5 | No | |
| 7. Onboarding Pipeline | /5 | No | |
| 8. Rate Limit Orchestration | /5 | No | |
| 9. File Processing | /5 | No | |
| 10. Monitoring Health | /5 | No | |
| 11. Disaster Recovery | /5 | No | |
| 12. Legacy Integration | /5 | No | |
| 13. Compliance Audit | /5 | No | |
| 14. Notification System | /5 | No | |
| 15. Self-Healing | /5 | No | |
| 16. Cross-Timezone Batch | /5 | No | |

**Average:** /5
**Critical Scenarios Average:** /5
**Verdict:** PASS / FAIL
**Weakest Areas:** ________________

---

## END OF BENCHMARK TESTS

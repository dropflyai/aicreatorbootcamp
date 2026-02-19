# Shipping

## What This Enables

Shipping bridges the gap between verified code and production-serving software.
A system that passes all verification gates but never reaches users delivers zero
value. Conversely, a system deployed without disciplined release engineering
exposes users to unacceptable risk. This document codifies the formal practices
that make shipping safe, repeatable, and reversible: semantic versioning for
communicating change impact, deployment strategies with formal tradeoff analysis,
feature flag rollout coordination, database migration sequencing, automated
rollback criteria, and post-deploy monitoring. The goal is not to ship fast at
the expense of safety, but to make safety the enabler of speed.

---

## 1. Semantic Versioning (semver.org)

Semantic versioning provides a machine-readable and human-understandable contract
about the nature of changes in a release.

### 1.1 Version Format

```
MAJOR.MINOR.PATCH[-prerelease][+build]

Examples:
  2.4.1
  3.0.0-beta.2
  1.7.0-rc.1+build.20240315
```

### 1.2 Version Increment Rules

| Change Type                                              | Increment | Example          |
|----------------------------------------------------------|-----------|------------------|
| Breaking change to public API                            | MAJOR     | 1.4.2 -> 2.0.0  |
| New feature, backward compatible                         | MINOR     | 1.4.2 -> 1.5.0  |
| Bug fix, backward compatible                             | PATCH     | 1.4.2 -> 1.4.3  |
| Pre-release (alpha, beta, rc)                            | Suffix    | 2.0.0-alpha.1    |

### 1.3 Automation

Version bumps are automated via conventional commit analysis:
- `feat:` commits trigger MINOR bump
- `fix:` commits trigger PATCH bump
- `BREAKING CHANGE:` footer triggers MAJOR bump
- Tools: semantic-release, standard-version, or release-please

### 1.4 Public API Definition

The "public API" for versioning purposes includes:
- REST/GraphQL endpoint contracts (URL, request/response schema)
- Library function signatures and return types
- Configuration file format and environment variable names
- CLI command syntax and flags
- Database migration compatibility (see Section 5)

Changes to internal implementation that do not affect any of the above are
not breaking changes regardless of scope.

---

## 2. Deployment Strategies

### 2.1 Strategy Definitions

**Recreate (Big Bang)**
Terminate all instances of the old version, then start all instances of the new
version. There is a period of downtime between termination and startup.

**Rolling Update**
Replace instances one at a time (or in small batches). At any moment during the
deployment, both old and new versions are serving traffic. No downtime.

**Blue-Green**
Maintain two identical production environments (blue and green). Deploy the new
version to the idle environment, run smoke tests, then switch the load balancer
to route traffic to the new environment. Instant rollback by switching back.

**Canary**
Route a small percentage of traffic to the new version while the majority
continues on the old version. Gradually increase the percentage as confidence
grows. Automated metrics comparison between canary and baseline.

### 2.2 Formal Tradeoff Matrix

| Factor                   | Recreate       | Rolling        | Blue-Green     | Canary         |
|--------------------------|----------------|----------------|----------------|----------------|
| **Zero downtime**        | No             | Yes            | Yes            | Yes            |
| **Rollback speed**       | Slow (redeploy)| Moderate       | Instant (switch)| Fast (route 0%)|
| **Resource overhead**    | None           | ~1.5x peak     | 2x (double env)| ~1.1x          |
| **Mixed version traffic**| No             | Yes (during)   | No             | Yes (during)   |
| **Infrastructure complexity** | Lowest    | Moderate       | High           | Highest        |
| **Blast radius control** | None (all-or-nothing)| Partial  | All-or-nothing | Granular       |
| **Database compatibility**| Single version | Must be compatible | Must be compatible | Must be compatible |
| **Observability requirement** | Low       | Moderate       | Moderate       | High           |
| **Best for**             | Dev/staging    | Stateless APIs | Critical systems| User-facing features|

### 2.3 Strategy Selection Rule

```
Is zero downtime required?
  ├─ No  → Recreate (simplest)
  └─ Yes
      ├─ Need instant rollback?
      │   ├─ Yes → Blue-Green
      │   └─ No
      │       ├─ Need granular blast radius?
      │       │   ├─ Yes → Canary
      │       │   └─ No  → Rolling
      └─ Default → Rolling (good balance for most services)
```

### 2.4 Default Strategy

Use **Canary** deployment for user-facing services and **Rolling** for internal
services unless specific requirements dictate otherwise. Document the rationale
in the service's deployment configuration.

---

## 3. Deployment Approval Gate

No deployment to production proceeds without satisfying the deployment checklist.

### 3.1 Automated Gates (CI/CD enforced)

| Gate                                    | Tool / Method                       |
|-----------------------------------------|-------------------------------------|
| All tests pass (unit, integration, E2E) | CI pipeline                         |
| No SAST/SCA critical findings           | Security scanner                    |
| Docker image scanned for vulnerabilities| Trivy, Grype, or equivalent         |
| Database migration dry-run succeeds     | Migration tool `--dry-run`          |
| Smoke tests pass on staging             | Automated smoke suite               |

### 3.2 Manual Gates (Human judgment)

| Gate                                    | Responsible Party                   |
|-----------------------------------------|-------------------------------------|
| Feature flag configured correctly       | Feature owner                       |
| Rollback plan reviewed                  | On-call engineer                    |
| Stakeholder sign-off (for major features)| Product owner                      |
| Change window confirmed (if applicable) | Operations lead                     |

---

## 4. Feature Flag Rollout Coordination

Feature flags and deployments are orthogonal operations that must be coordinated.
The deployment puts code into production; the flag controls whether users
experience the new behavior.

### 4.1 Rollout Protocol

```
Step 1: Deploy code with flag defaulting to OFF
Step 2: Verify deployment health (metrics stable for 15 minutes)
Step 3: Enable flag for internal users (Stage 1 from Implementation.md 4.2)
Step 4: Monitor for 1 hour
Step 5: Progress through rollout stages per Implementation.md 4.2
```

### 4.2 Flag-Deployment Failure Matrix

| Deployment Status | Flag Status | Situation                  | Action                       |
|-------------------|-------------|----------------------------|------------------------------|
| Success           | OFF         | Normal pre-rollout         | Proceed with flag rollout    |
| Success           | ON (partial)| Normal rollout in progress | Monitor and advance          |
| Failure           | OFF         | Bad deploy, no user impact | Rollback deployment          |
| Failure           | ON          | Bad deploy, users affected | Kill flag immediately, then rollback |
| Success           | ON (issues) | Feature bug, deploy ok     | Kill flag, investigate       |

### 4.3 Kill Switch Protocol

Every feature flag must support an emergency kill switch that:
- Can be toggled in under 60 seconds
- Does not require a deployment
- Is accessible to on-call engineers
- Propagates to all instances within 30 seconds

---

## 5. Database Migration Coordination

Database migrations and application deployments must be coordinated to prevent
downtime and data corruption. The core principle is **backward compatibility**:
the old application version must be able to function with the new database schema,
and vice versa.

### 5.1 Expand-Contract Pattern

All schema changes follow the expand-contract (parallel change) pattern:

**Phase 1: Expand**
- Add new columns, tables, or indexes
- New columns are nullable or have defaults
- Old application version continues to work
- Deploy migration, then deploy new application code

**Phase 2: Migrate**
- Backfill data from old format to new format
- New application code reads from new location, writes to both

**Phase 3: Contract**
- Deploy application code that only reads/writes new location
- Drop old columns, tables, or indexes
- This is a separate deployment from Phase 2

### 5.2 Migration Safety Rules

| Rule                                               | Rationale                              |
|----------------------------------------------------|----------------------------------------|
| Never rename a column in one step                  | Breaks old app version                 |
| Never change a column type in one step             | Breaks old app version                 |
| Never drop a column without Phase 1-3              | Breaks old app version                 |
| Always add new columns as nullable or with default | Allows old app to INSERT               |
| Always test migrations against production data copy| Catches data-dependent failures        |
| Always measure migration duration on prod-size data| Prevents surprise lock contention      |
| Never run migrations during peak traffic           | Reduces blast radius                   |

### 5.3 Migration Failure Protocol

If a migration fails mid-execution:
1. Do NOT attempt a manual fix on the production database
2. Assess whether the migration is resumable or must be rolled back
3. If rollback is possible (reverse migration exists), execute it
4. If rollback is impossible, escalate to incident response
5. Document the failure in the post-incident review

---

## 6. Rollback Criteria and Automated Rollback

### 6.1 Rollback Triggers

Automated rollback is triggered when any of the following conditions are met
within the rollback monitoring window (default: 30 minutes post-deploy):

| Metric                          | Threshold                              |
|---------------------------------|----------------------------------------|
| Error rate (5xx)                | > 1% increase over baseline            |
| Latency (p99)                  | > 50% increase over baseline           |
| Crash rate                      | Any increase in crash-free rate drop   |
| Health check failures           | > 2 consecutive failures               |
| Business metric anomaly         | > 2 standard deviations from forecast  |

### 6.2 Automated Rollback Process

```
1. Detection:  Monitoring system identifies threshold breach
2. Alerting:   On-call engineer notified (PagerDuty, Opsgenie)
3. Confirmation: 60-second hold for false positive clearance
4. Execution:  Previous version redeployed automatically
5. Verification: Smoke tests run against rolled-back version
6. Notification: Team notified via Slack/Teams with incident link
7. Post-mortem: Scheduled within 24 hours
```

### 6.3 Manual Rollback Authority

Any on-call engineer has the authority to initiate a manual rollback without
approval if they believe production stability is at risk. This authority is
unconditional and does not require manager sign-off. Speed of response
takes precedence over chain of command during incidents.

---

## 7. Post-Deploy Monitoring Checklist

After every production deployment, the deploying engineer monitors the following
dashboard for the rollback monitoring window (minimum 30 minutes).

### 7.1 Infrastructure Metrics

| Metric                     | Normal Range         | Alert Threshold              |
|----------------------------|----------------------|------------------------------|
| CPU utilization            | < 60%                | > 80% for 5 minutes         |
| Memory utilization         | < 70%                | > 85% for 5 minutes         |
| Disk I/O wait              | < 10%                | > 25% for 5 minutes         |
| Network error rate         | < 0.01%              | > 0.1%                       |
| Container restart count    | 0                    | > 0                          |

### 7.2 Application Metrics

| Metric                     | Normal Range         | Alert Threshold              |
|----------------------------|----------------------|------------------------------|
| Request rate               | Within 10% of forecast| > 20% deviation             |
| Error rate (4xx)           | < 2%                 | > 5%                         |
| Error rate (5xx)           | < 0.1%               | > 0.5%                       |
| Latency p50               | < 100ms              | > 200ms                      |
| Latency p95               | < 500ms              | > 1000ms                     |
| Latency p99               | < 1000ms             | > 2000ms                     |
| Database connection pool   | < 70% utilized       | > 90% utilized               |
| Queue depth                | < 1000 messages      | > 5000 messages              |

### 7.3 Business Metrics

| Metric                     | Normal Range         | Alert Threshold              |
|----------------------------|----------------------|------------------------------|
| Conversion rate            | Within 5% of baseline| > 10% drop                   |
| User sign-ups              | Within 10% of forecast| > 20% drop                  |
| Revenue per minute         | Within 10% of forecast| > 15% drop                  |
| Feature adoption (if new)  | Trending up          | Flat or declining after 1h   |

### 7.4 Monitoring Completion

The deploying engineer logs a monitoring completion record:

```
Deploy ID:        [auto-generated]
Version:          [semver]
Strategy:         [canary/rolling/blue-green]
Deploy Time:      [timestamp]
Monitor End:      [timestamp]
Status:           [healthy / rollback triggered / anomaly noted]
Notes:            [any observations]
```

---

## Cross-References

- Semantic versioning derives from conventional commits (`Implementation.md` Section 5)
- Feature flag rollout stages defined in `Implementation.md` Section 4
- Deployment approval requires verification evidence (`Verification.md` Section 5)
- Database migration expand-contract feeds cleanup (`Cleanup.md` Section 1)
- Rollback monitoring uses DORA metrics framework (`Implementation.md` Section 8)
- Post-incident review protocol in `../Incidents.md`
- CI/CD automation recipes in `../Automations/Recipes/CI-CD.md`

---

## Key References

- Humble, J. & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- Kim, G. et al. (2016). *The DevOps Handbook*. IT Revolution.
- Nygard, M. (2007). *Release It!* (2nd ed., 2018). Pragmatic Bookshelf.
- Preston-Werner, T. (2013). Semantic Versioning 2.0.0. semver.org.
- Fowler, M. (2010). BlueGreenDeployment. martinfowler.com.
- Sato, D. (2014). CanaryRelease. martinfowler.com.

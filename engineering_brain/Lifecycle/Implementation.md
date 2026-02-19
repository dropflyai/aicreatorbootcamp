# Implementation

## What This Enables

Implementation translates a reviewed design into working, tested, shippable code.
The difference between amateur and professional implementation is not cleverness
but discipline: disciplined branching strategies, disciplined test-driven
development, disciplined commit hygiene, and disciplined collaboration practices.
This document codifies the practices that, according to the DORA research program
(Forsgren, Humble & Kim, 2018), predict elite software delivery performance:
small batches, fast feedback, trunk-based development, and continuous integration.
Every engineering task that enters the implementation phase follows these protocols.

---

## 1. Branching Strategy

### 1.1 Feature Branch vs. Trunk-Based Development

The branching strategy is not a personal preference; it is an organizational
decision with measurable consequences. The DORA research (Forsgren et al., 2018)
demonstrates that trunk-based development correlates with higher delivery
performance across all four key metrics.

### 1.2 Tradeoff Matrix

| Factor                       | Feature Branches          | Trunk-Based Development         |
|------------------------------|---------------------------|---------------------------------|
| **Merge frequency**          | Days to weeks             | Multiple times per day          |
| **Integration risk**         | High (large diffs)        | Low (small diffs)               |
| **Code review model**        | PR-based, async           | Pair programming or rapid PR    |
| **CI feedback speed**        | Slow (long-lived branches)| Fast (always near trunk)        |
| **Release flexibility**      | Branch-cut releases       | Continuous delivery             |
| **Team coordination cost**   | Low (isolated work)       | Higher (requires communication) |
| **Merge conflict frequency** | High                      | Low                             |
| **Feature isolation**        | Via branches              | Via feature flags               |
| **Required maturity**        | Lower                     | Higher (CI, flags, testing)     |
| **DORA correlation**         | Lower performers          | Elite performers                |

### 1.3 Recommended Strategy

**Default:** Trunk-based development with short-lived branches (< 1 day).

**Acceptable alternative:** Feature branches with maximum 2-day lifetime and
mandatory daily rebase from trunk.

**Prohibited:** Long-lived feature branches (> 3 days). These are a leading
indicator of integration problems and should trigger an immediate process review.

### 1.4 Branch Naming Convention

```
{type}/{ticket-id}-{brief-description}

Examples:
feat/ENG-142-add-user-auth
fix/ENG-287-null-pointer-on-empty-cart
chore/ENG-301-upgrade-react-19
spike/ENG-315-evaluate-redis-cluster
```

---

## 2. Test-Driven Development (Beck, 2003)

TDD is a design technique disguised as a testing technique. The discipline of
writing the test first forces the developer to think about the interface before
the implementation, producing code that is inherently testable and loosely coupled.

### 2.1 The TDD Cycle

```
    ┌──────────────────────────────────────┐
    │                                      │
    ▼                                      │
 RED ────► GREEN ────► REFACTOR ───────────┘
 (write a   (make it    (improve structure
  failing    pass with    without changing
  test)      minimal      behavior)
             code)
```

### 2.2 TDD Rules (Beck, 2003)

1. **Do not write production code unless it makes a failing test pass.**
2. **Do not write more of a test than is sufficient to fail** (including compilation failures).
3. **Do not write more production code than is sufficient to pass** the currently failing test.

### 2.3 When TDD Applies

| Context                          | TDD Applicability | Rationale                              |
|----------------------------------|-------------------|----------------------------------------|
| Business logic / domain layer    | Mandatory         | Highest value, most stable interfaces  |
| API endpoint handlers            | Strongly recommended | Contract verification              |
| Database queries                 | Recommended       | Integration test against test database |
| UI components                    | Optional          | Rapid visual iteration often faster    |
| Spike / prototype code           | Not applicable    | Spike code is discarded               |
| Infrastructure / IaC             | Plan-test cycle   | Terraform plan as "test"              |

### 2.4 Test Structure: Arrange-Act-Assert

Every test follows the AAA pattern:

```
Arrange:  Set up preconditions and inputs
Act:      Execute the behavior under test
Assert:   Verify the expected outcome
```

Each test asserts ONE behavioral expectation. Tests that assert multiple unrelated
behaviors are split into separate test cases.

---

## 3. Vertical Slicing

A vertical slice delivers a thin, end-to-end increment of user-visible
functionality that cuts through all architectural layers (UI, API, business
logic, persistence). This contrasts with horizontal slicing, which delivers
complete layers (e.g., "build all the database tables first").

### 3.1 Why Vertical Slicing

- Enables continuous integration (every slice is deployable)
- Produces faster user feedback (every slice is demonstrable)
- Reduces integration risk (every slice proves the stack works together)
- Aligns with story mapping output (see `Planning.md` Section 3)

### 3.2 Slicing Protocol

1. Take the story or task from the story map
2. Identify the minimal path through ALL layers needed to deliver the behavior
3. Implement that path with production-quality code and tests
4. Ship it behind a feature flag if the feature is incomplete
5. Iterate: expand the slice in subsequent increments

### 3.3 Slicing Anti-Patterns

- **Database-first slicing:** Building the entire schema before any API exists
- **API-first slicing:** Building all endpoints before any UI consumes them
- **Gold-plating a slice:** Adding edge case handling before the happy path ships
- **Phantom slicing:** Claiming a "vertical slice" that has no user-visible output

---

## 4. Feature Flags (Progressive Rollout)

Feature flags decouple deployment from release. Code is deployed to production
continuously; features are released to users progressively.

### 4.1 Flag Types

| Type          | Lifetime     | Purpose                                    |
|---------------|--------------|--------------------------------------------|
| Release flag  | Days to weeks| Gate incomplete features during development |
| Experiment flag| Days to months| A/B testing, measured rollout             |
| Ops flag      | Permanent    | Circuit breaker, kill switch               |
| Permission flag| Permanent   | Entitlement-based feature access           |

### 4.2 Progressive Rollout Protocol

```
Stage 1:  Internal only (team members)           →  0.1% of users
Stage 2:  Canary (opt-in early adopters)          →  1-5% of users
Stage 3:  Limited rollout                         →  10-25% of users
Stage 4:  Broad rollout                           →  50-75% of users
Stage 5:  General availability                    →  100% of users
```

At each stage, monitor error rates, latency, and business metrics. Advance to
the next stage only when metrics are stable for the defined hold period
(minimum 1 hour per stage, 24 hours for Stage 3+).

### 4.3 Flag Hygiene

- Every flag has an owner and an expiration date
- Release flags must be removed within 2 sprints of reaching 100%
- Flag cleanup is tracked in `Cleanup.md` Section 2
- Stale flags (past expiration) generate automated alerts

---

## 5. Commit Hygiene (Conventional Commits)

### 5.1 Conventional Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### 5.2 Type Vocabulary

| Type       | Meaning                                              |
|------------|------------------------------------------------------|
| `feat`     | New feature (correlates to MINOR in semver)          |
| `fix`      | Bug fix (correlates to PATCH in semver)              |
| `docs`     | Documentation only                                   |
| `style`    | Formatting, no code change                           |
| `refactor` | Code change that neither fixes a bug nor adds feature|
| `perf`     | Performance improvement                              |
| `test`     | Adding or correcting tests                           |
| `chore`    | Build process, tooling, dependencies                 |
| `ci`       | CI configuration changes                             |
| `revert`   | Reverts a previous commit                            |

### 5.3 Commit Rules

1. **Atomic commits:** Each commit represents one logical change
2. **Buildable commits:** Every commit compiles and passes tests
3. **Descriptive messages:** The subject line explains WHY, not WHAT (the diff shows WHAT)
4. **No WIP commits on trunk:** Squash or rebase before merging
5. **Breaking changes:** Add `BREAKING CHANGE:` footer (correlates to MAJOR in semver)

---

## 6. Pull Request Best Practices

### 6.1 PR Size

| Size (lines changed) | Classification | Review Expectation           |
|----------------------|----------------|------------------------------|
| 1 - 50               | Small          | Review within 2 hours        |
| 51 - 200             | Medium         | Review within 4 hours        |
| 201 - 400            | Large          | Review within 8 hours        |
| > 400                | Too large      | Must be split before review  |

Research (Cisco, Microsoft studies) demonstrates that review effectiveness drops
sharply above 200 lines. PRs exceeding 400 lines are rejected and must be
decomposed into smaller, independently reviewable units.

### 6.2 PR Description Template

```markdown
## What
Brief description of the change.

## Why
Link to ticket/issue. Explain the motivation.

## How
Key implementation decisions. Link to relevant ADR if applicable.

## Testing
How was this tested? Link to test results.

## Rollback
How to revert if something goes wrong.

## Screenshots (if UI change)
Before/After comparison.
```

### 6.3 Review Protocol

- **Author responsibility:** PR is ready for review (passes CI, includes tests, self-reviewed)
- **Reviewer responsibility:** Review within SLA (see size table above)
- **Approval requirement:** Minimum 1 approval; 2 for security-sensitive or infrastructure changes
- **Nit vs. blocking:** Reviewers explicitly label comments as `nit:` (non-blocking) or `blocking:`
- **No drive-by approvals:** Reviewer must understand the change, not just skim it

---

## 7. Pair and Mob Programming

### 7.1 When to Pair

| Scenario                              | Pair? | Rationale                               |
|---------------------------------------|-------|-----------------------------------------|
| Complex domain logic                  | Yes   | Two perspectives reduce design errors   |
| Onboarding a new team member          | Yes   | Knowledge transfer is the primary goal  |
| Debugging a production incident       | Yes   | Faster convergence under time pressure  |
| Routine CRUD implementation           | No    | Low complexity, pairing adds overhead   |
| Exploratory spike                     | Yes   | Broader exploration of solution space   |

### 7.2 Pairing Protocols

- **Driver/Navigator:** Driver writes code; navigator reviews in real-time and thinks strategically. Swap roles every 25 minutes (Pomodoro cadence).
- **Ping-Pong TDD:** Engineer A writes a failing test; Engineer B makes it pass and writes the next failing test. Continues alternating.

### 7.3 Mob Programming

Three or more engineers at one workstation. One driver, multiple navigators.
Rotate driver every 10-15 minutes. Use for:
- Architectural decisions requiring team consensus
- Complex integration work touching multiple systems
- Knowledge sharing across the entire team

---

## 8. DORA Metrics (Forsgren, Humble & Kim, 2018)

The four key metrics from the Accelerate research predict software delivery
performance and organizational outcomes.

| Metric                    | Elite               | High           | Medium         | Low              |
|---------------------------|---------------------|----------------|----------------|------------------|
| **Deployment Frequency**  | On demand (multi/day)| Weekly-monthly | Monthly-6 monthly | < once/6 months|
| **Lead Time for Changes** | < 1 hour            | 1 day - 1 week | 1 week - 1 month | > 1 month      |
| **Change Failure Rate**   | 0 - 15%             | 16 - 30%       | 16 - 30%       | > 30%            |
| **Time to Restore**       | < 1 hour            | < 1 day        | 1 day - 1 week | > 1 week         |

### 8.1 Measurement Protocol

- **Deployment frequency:** Count production deployments per day (automated)
- **Lead time:** Measure from first commit to production deploy (automated via CI/CD timestamps)
- **Change failure rate:** Count deployments causing incidents / total deployments (incident tracker)
- **Time to restore:** Measure from incident detection to resolution (incident tracker)

### 8.2 Target

All Engineering Brain projects target **Elite** performance on all four metrics.
Deviations are acceptable during initial project phases but must trend toward
Elite within 90 days of first production deployment.

---

## Cross-References

- Branching strategy feeds CI/CD pipeline configuration (`../Automations/Recipes/CI-CD.md`)
- Vertical slicing derives from story mapping (`Planning.md` Section 3)
- Feature flag rollout feeds shipping strategy (`Shipping.md` Section 4)
- Feature flag cleanup tracked in `Cleanup.md` Section 2
- Conventional commits feed semantic versioning (`Shipping.md` Section 1)
- DORA metrics feed engineering performance reviews (`../Score.md`)
- PR review protocol feeds verification process (`Verification.md`)

---

## Key References

- Beck, K. (2003). *Test-Driven Development: By Example*. Addison-Wesley.
- Forsgren, N., Humble, J. & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution.
- Fowler, M. (2023). Feature Toggles (Feature Flags). martinfowler.com.
- Humble, J. & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- Kerievsky, J. (2004). *Refactoring to Patterns*. Addison-Wesley.

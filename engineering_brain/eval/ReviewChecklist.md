# Engineering Review Checklist

A comprehensive 15-section checklist for reviewing engineering work. Every section must be evaluated before approving code for production. Items marked with [CRITICAL] are blocking -- any failure requires remediation before merge.

---

## Section 1: Correctness

- [ ] Code produces correct output for stated requirements.
- [ ] Edge cases are handled (empty inputs, null values, boundary conditions).
- [ ] Error paths return appropriate errors, not silent failures.
- [ ] [CRITICAL] No infinite loops, unbounded recursion, or resource leaks.
- [ ] Concurrent access is safe (no race conditions, proper locking/atomic operations).
- [ ] Floating-point comparisons use epsilon tolerance, not exact equality.
- [ ] Integer overflow is considered for arithmetic on user-controlled inputs.

## Section 2: Architecture & Design

- [ ] Changes follow established architectural patterns in the codebase.
- [ ] New dependencies are justified and evaluated for maintenance/security risk.
- [ ] Separation of concerns maintained (business logic separate from I/O, UI, infrastructure).
- [ ] API contracts are backward-compatible (or breaking changes are versioned).
- [ ] [CRITICAL] No circular dependencies introduced.
- [ ] Domain concepts are modeled accurately (naming matches the domain language).
- [ ] Change scope is minimal -- no unrelated modifications bundled in.

## Section 3: Data Integrity

- [ ] Database migrations are reversible (down migration exists and is tested).
- [ ] [CRITICAL] Schema changes do not cause data loss.
- [ ] Foreign key constraints enforced for referential integrity.
- [ ] Indexes exist for all columns used in WHERE, JOIN, and ORDER BY clauses on large tables.
- [ ] Data validation occurs at trust boundaries (API input, database writes).
- [ ] Nullability is explicit and intentional (columns are NOT NULL unless null has defined meaning).
- [ ] Timestamps use UTC consistently.

## Section 4: Security

- [ ] [CRITICAL] No secrets (API keys, passwords, tokens) in source code.
- [ ] [CRITICAL] All user input is sanitized/parameterized (no SQL injection, XSS, command injection).
- [ ] Authentication required for all non-public endpoints.
- [ ] Authorization checked for resource access (users can only access their own data).
- [ ] Rate limiting on authentication and public-facing endpoints.
- [ ] Security headers set (CSP, HSTS, X-Content-Type-Options, X-Frame-Options).
- [ ] File uploads validated (type, size, content) and stored outside webroot.
- [ ] Logging does not contain PII or secrets.

## Section 5: Testing

- [ ] New code has unit tests covering both success and failure cases.
- [ ] Tests are independent (no shared mutable state, no order dependency).
- [ ] Test names describe the behavior being verified, not the implementation.
- [ ] [CRITICAL] All tests pass in CI.
- [ ] Integration tests exist for new API endpoints or service interactions.
- [ ] Test data is generated or uses factories, not production data.
- [ ] Mocks are used sparingly and only for external dependencies.
- [ ] Edge cases from Section 1 have corresponding test cases.

## Section 6: Performance

- [ ] No N+1 query patterns (use eager loading, batching, or DataLoader).
- [ ] Algorithm complexity is appropriate for expected data sizes.
- [ ] Large result sets are paginated (not loaded entirely into memory).
- [ ] Expensive operations are cached with explicit TTL and invalidation strategy.
- [ ] Database queries checked with EXPLAIN ANALYZE (no unexpected full table scans).
- [ ] No synchronous I/O in hot paths of async applications.
- [ ] Memory allocation patterns are reasonable (no excessive object creation in loops).

## Section 7: Error Handling & Resilience

- [ ] All external calls (API, database, file system) have error handling.
- [ ] Timeouts set on all external calls (HTTP requests, database queries).
- [ ] Retry logic uses exponential backoff with jitter (not immediate retry loops).
- [ ] Circuit breakers for unreliable external dependencies.
- [ ] Graceful degradation: system provides reduced functionality rather than total failure.
- [ ] [CRITICAL] Errors are not swallowed silently (caught exceptions are logged or re-thrown).
- [ ] User-facing error messages do not expose system internals.

## Section 8: Observability

- [ ] Structured logging at appropriate levels (error for failures, info for business events, debug for diagnostics).
- [ ] Log messages include correlation IDs for request tracing.
- [ ] Critical business metrics are instrumented (counters, histograms, gauges).
- [ ] Health check endpoint exists and verifies dependency connectivity.
- [ ] Alerts exist for new failure modes introduced by this change.
- [ ] Distributed tracing spans created for cross-service calls.

## Section 9: API Design

- [ ] Endpoints follow REST conventions (or documented alternative: GraphQL, gRPC).
- [ ] Request/response schemas are validated and documented.
- [ ] Pagination, filtering, and sorting use consistent patterns.
- [ ] Error responses follow a consistent format with error codes.
- [ ] API versioning strategy is followed.
- [ ] Idempotency ensured for mutating operations where appropriate.
- [ ] Rate limits and quotas documented in API docs.

## Section 10: Code Quality

- [ ] Linter passes with zero warnings.
- [ ] Type checker passes with strict mode enabled.
- [ ] No TODO/FIXME/HACK comments without linked issue/ticket.
- [ ] Functions have single responsibility (< 30 lines preferred).
- [ ] Variable and function names communicate intent.
- [ ] No dead code (unreachable code, unused imports, commented-out code).
- [ ] Magic numbers replaced with named constants.
- [ ] Complex logic has explanatory comments explaining "why," not "what."

## Section 11: Dependencies & Configuration

- [ ] New dependencies have active maintenance (commits in last 6 months).
- [ ] New dependencies have acceptable license (MIT, Apache 2.0, BSD; not GPL in proprietary code).
- [ ] Dependency versions are pinned (lock file committed).
- [ ] [CRITICAL] No dependencies with known critical vulnerabilities.
- [ ] Configuration follows 12-factor app principles (environment variables, not config files).
- [ ] Defaults are safe (fail closed, deny by default).
- [ ] Feature flags used for risky changes (gradual rollout capability).

## Section 12: Database & State Management

- [ ] Transactions are used for operations requiring atomicity.
- [ ] Transaction scope is minimal (no long-running transactions holding locks).
- [ ] Appropriate isolation level selected (documented if non-default).
- [ ] Connection pooling configured with appropriate limits.
- [ ] Database migrations run in a transaction where supported.
- [ ] State is stored in the database, not in application memory (for stateless scaling).
- [ ] Cache consistency strategy defined (TTL, event-based invalidation, or both).

## Section 13: Deployment & Operations

- [ ] Change can be deployed independently (no coordination with other services required, or coordination documented).
- [ ] Rollback plan exists (revert commit, feature flag, database migration rollback).
- [ ] Environment-specific configuration does not require code changes.
- [ ] Database migrations are backward-compatible (old code can run with new schema during deployment).
- [ ] Resource limits set (memory, CPU, connections) to prevent noisy-neighbor issues.
- [ ] Deployment smoke tests verify core functionality post-deploy.

## Section 14: Documentation

- [ ] README updated if setup/configuration changed.
- [ ] API documentation updated for new/modified endpoints.
- [ ] Architecture Decision Record (ADR) created for significant architectural changes.
- [ ] CHANGELOG updated for user-facing changes.
- [ ] Complex algorithms have references to theory or external documentation.
- [ ] Breaking changes documented with migration guide.

## Section 15: Compliance & Standards

- [ ] Code follows the project's style guide and conventions.
- [ ] Accessibility requirements met for UI changes (WCAG 2.1 AA minimum).
- [ ] Internationalization considered (no hard-coded strings in UI, date/number formatting locale-aware).
- [ ] Privacy requirements met (data retention, right to deletion, consent).
- [ ] Commit messages follow conventional commits format.
- [ ] [CRITICAL] No license violations in new code or dependencies.
- [ ] PR description explains the change, its motivation, and testing approach.

---

## Review Protocol

1. **Self-review first:** Author reviews their own PR against this checklist before requesting review.
2. **Automated checks:** CI enforces linting, type checking, test passing, security scanning, and dependency auditing.
3. **Human review:** Reviewer evaluates all 15 sections. Focus time on architecture, correctness, and security (hardest to automate).
4. **CRITICAL items:** Any CRITICAL item failure blocks the PR. No exceptions.
5. **Non-blocking items:** Non-critical items can be addressed in follow-up PRs if documented as tech debt tickets.
6. **Review size:** PRs exceeding 400 changed lines should be split. If splitting is impossible, the reviewer should allocate proportionally more time.
7. **Review time:** Reviews should be completed within 24 hours of request to maintain development flow.

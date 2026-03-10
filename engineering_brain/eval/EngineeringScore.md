# Engineering Score — 8-Dimension Scoring Rubric

This rubric evaluates engineering work across eight dimensions on a 1-5 scale. Each dimension has explicit criteria at every level. The overall engineering score is the weighted average, with weights reflecting the importance of each dimension for production-grade systems.

---

## Scoring Scale

| Score | Label | Meaning |
|-------|-------|---------|
| 1 | Inadequate | Fails basic requirements. Would not pass code review. |
| 2 | Below Standard | Partially meets requirements. Significant gaps. |
| 3 | Competent | Meets standard requirements. Acceptable for production with minor caveats. |
| 4 | Strong | Exceeds standard requirements. Demonstrates expertise. |
| 5 | Exceptional | PhD-level mastery. Demonstrates theoretical depth and practical excellence. |

---

## Dimension 1: Code Quality (Weight: 15%)

### Level 1 — Inadequate
- Code has syntax errors or does not compile/run.
- No consistent naming conventions.
- Functions exceed 100 lines with no decomposition.
- No error handling.
- Copy-pasted code with no abstraction.

### Level 2 — Below Standard
- Code runs but has obvious bugs or edge case failures.
- Inconsistent naming and formatting.
- Some functions are too long or do too many things.
- Error handling is incomplete (happy path only).
- Some duplication remains.

### Level 3 — Competent
- Code is correct for known requirements.
- Consistent naming conventions and formatting (linter passes).
- Functions have single responsibility, most under 30 lines.
- Error handling covers common failure modes.
- DRY principle followed; shared logic extracted to utilities.
- Code is readable without excessive comments.

### Level 4 — Strong
- Code handles edge cases and adversarial inputs gracefully.
- Naming communicates intent precisely (self-documenting code).
- Functions are pure where possible; side effects are isolated and explicit.
- Error handling uses typed errors/discriminated unions, not generic catches.
- Abstractions are well-chosen: not too early, not too late.
- Cyclomatic complexity per function < 10. Cognitive complexity per function < 15.

### Level 5 — Exceptional
- Code demonstrates awareness of computational complexity for all operations.
- Type system leveraged to make illegal states unrepresentable.
- Error handling follows a coherent strategy (Result types, Railway-oriented programming, or equivalent).
- Abstractions are informed by design patterns with awareness of their formal properties.
- Code could serve as a teaching example. Reviewers learn from reading it.
- Halstead complexity and maintainability index are in excellent range.

---

## Dimension 2: Architecture (Weight: 15%)

### Level 1 — Inadequate
- No discernible architecture. Everything in one file or random organization.
- Circular dependencies. No separation of concerns.
- Database queries in UI components. Business logic in route handlers.

### Level 2 — Below Standard
- Basic folder structure exists but is inconsistent.
- Some separation of concerns but with frequent violations.
- Dependencies flow in multiple directions.
- No clear API boundaries between modules.

### Level 3 — Competent
- Clear separation of concerns (presentation, business logic, data access).
- Dependency injection or explicit dependency management.
- API boundaries between modules are defined and mostly respected.
- Database access through repository/service pattern.
- Configuration externalized from code.

### Level 4 — Strong
- Architecture follows a recognized pattern (hexagonal, clean, vertical slice) consistently.
- Dependencies flow inward (domain has no external dependencies).
- Modules are independently testable and deployable.
- Architecture decisions are documented with rationale (ADRs).
- System can evolve (add features, replace components) without cascading changes.
- Conway's Law considered in team/module boundaries.

### Level 5 — Exceptional
- Architecture is informed by distributed systems theory (CAP awareness, consistency model selection).
- Formal reasoning about system properties (availability modeling, failure mode analysis).
- Performance characteristics are architectural decisions, not afterthoughts (cache strategy, read/write separation, data locality).
- System demonstrates awareness of Lehman's laws (designed for evolution, not just current requirements).
- Trade-offs are explicit, documented, and theoretically justified.

---

## Dimension 3: Testing (Weight: 15%)

### Level 1 — Inadequate
- No tests.
- Or: tests exist but do not run or are all skipped.

### Level 2 — Below Standard
- Some unit tests exist but coverage < 40%.
- Tests are brittle (break on refactoring, test implementation details).
- No integration or end-to-end tests.
- Tests do not cover error paths.

### Level 3 — Competent
- Unit test coverage > 70% for business logic.
- Tests follow AAA pattern (Arrange, Act, Assert).
- Integration tests for critical paths (API endpoints, database operations).
- Tests cover both happy path and common error cases.
- Tests run in CI on every push.

### Level 4 — Strong
- Unit test coverage > 85% for business logic, > 60% overall.
- Property-based tests for algorithmic/data transformation code.
- Integration tests cover all API endpoints and database operations.
- E2E tests cover critical user journeys (Playwright/Cypress).
- Test data is generated, not hard-coded. Fixtures are maintainable.
- Mutation testing score > 70%.
- Tests serve as documentation (readable, descriptive names).

### Level 5 — Exceptional
- Testing strategy informed by formal methods (property-based testing grounded in specification).
- Contract tests for service boundaries.
- Chaos engineering tests for resilience (fault injection, latency injection).
- Performance benchmarks with statistical rigor (confidence intervals, regression detection).
- Formal verification for critical invariants (TLA+ for distributed protocols, Hoare-style contracts for core algorithms).
- Testing pyramid is intentional and documented (ratio of unit/integration/e2e justified).

---

## Dimension 4: Security (Weight: 15%)

### Level 1 — Inadequate
- SQL injection, XSS, or other OWASP Top 10 vulnerabilities present.
- Secrets hard-coded in source code.
- No authentication or authorization.
- HTTP instead of HTTPS.

### Level 2 — Below Standard
- Basic authentication exists but has gaps (no rate limiting, weak password policy).
- Input validation is inconsistent.
- Some secrets in environment variables but management is ad hoc.
- Dependencies have known vulnerabilities.

### Level 3 — Competent
- OWASP Top 10 mitigated (parameterized queries, output encoding, CSRF protection).
- Authentication uses established library/service (not custom crypto).
- Authorization checks on all protected endpoints.
- Secrets managed via environment variables or secrets manager.
- Dependencies scanned for vulnerabilities (Dependabot, Snyk).
- HTTPS enforced. Security headers set (CSP, HSTS, X-Frame-Options).

### Level 4 — Strong
- Input validation at every trust boundary (defense in depth).
- Principle of least privilege applied to all credentials and permissions.
- Audit logging for security-relevant events.
- Rate limiting and abuse prevention.
- Secrets rotated on a schedule. No long-lived credentials.
- Security threat model documented (STRIDE or equivalent).
- Dependency updates automated with security-focused merge policies.

### Level 5 — Exceptional
- Security design informed by cryptographic theory (understanding of one-way functions, information-theoretic vs computational security).
- Zero-trust architecture principles applied.
- Formal analysis of authentication/authorization protocols.
- Supply chain security (signed commits, SBOM, reproducible builds).
- Incident response plan documented and tested.
- Penetration testing or bug bounty program in place.
- Understanding of side-channel attacks and timing-safe comparisons where relevant.

---

## Dimension 5: Performance (Weight: 10%)

### Level 1 — Inadequate
- N+1 query problems. O(n^2) algorithms where O(n log n) exists.
- No indexes on frequently queried columns.
- Blocking operations on main thread. Synchronous I/O in async context.

### Level 2 — Below Standard
- Obvious performance problems addressed but no systematic approach.
- Some indexes exist but query plans not analyzed.
- No performance budgets or benchmarks.

### Level 3 — Competent
- Algorithmic complexity is appropriate for data sizes.
- Database queries are optimized (indexes, EXPLAIN ANALYZE used).
- Caching strategy for expensive operations.
- Lazy loading for non-critical resources.
- Core Web Vitals meet "Good" thresholds for web applications.

### Level 4 — Strong
- Performance budgets defined and enforced in CI.
- Profiling data guides optimization (not premature).
- Understanding of cache hierarchy implications (data structure layout, access patterns).
- Connection pooling, query batching, and pagination implemented.
- Load testing with realistic data volumes and traffic patterns.
- P99 latency tracked, not just averages.

### Level 5 — Exceptional
- Performance analysis informed by queueing theory (utilization, latency modeling, capacity planning using Little's Law).
- Cache strategy informed by theory (LRU vs LFU vs ARC based on access pattern analysis).
- Data structures chosen with cache-line awareness (struct-of-arrays vs array-of-structs).
- Amortized analysis applied to justify data structure choices.
- Understanding of TCP congestion control implications for network performance.
- Tail latency management (hedged requests, adaptive timeouts).

---

## Dimension 6: DevOps (Weight: 10%)

### Level 1 — Inadequate
- No CI/CD. Manual deployments.
- No version control discipline (commits to main, no branches).
- No environment separation (dev/staging/prod).

### Level 2 — Below Standard
- Basic CI exists but is unreliable or slow.
- Deployments are semi-manual (scripts that require human steps).
- Environment differences cause "works on my machine" issues.

### Level 3 — Competent
- CI runs tests, linting, and type checking on every PR.
- CD deploys to staging automatically. Production deploys require approval.
- Infrastructure as Code for at least core resources (Terraform, Pulumi, CDK).
- Docker or equivalent containerization for consistent environments.
- Logging and basic monitoring in place.

### Level 4 — Strong
- Full CI/CD pipeline: build, test, security scan, deploy, smoke test.
- Blue-green or canary deployments.
- Infrastructure fully codified and version-controlled.
- Observability stack: structured logging, distributed tracing, metrics dashboards.
- Alerting with actionable alerts (not alert fatigue).
- Runbooks for common operational tasks.
- Database migrations automated and reversible.

### Level 5 — Exceptional
- GitOps or equivalent declarative deployment model.
- SLOs defined with error budgets. Automated rollback on SLO violation.
- Chaos engineering in staging or production.
- Cost optimization automated (right-sizing, spot instances, autoscaling).
- Disaster recovery tested and documented (RTO/RPO defined and verified).
- Platform engineering: self-service infrastructure for developers.
- Observability informed by systems theory (queueing metrics, saturation signals, USE method).

---

## Dimension 7: Documentation (Weight: 10%)

### Level 1 — Inadequate
- No documentation. No README. No comments on complex logic.
- API has no documentation or examples.

### Level 2 — Below Standard
- README exists but is outdated or incomplete.
- Some inline comments but they describe "what" not "why."
- API documentation is auto-generated but not curated.

### Level 3 — Competent
- README covers: purpose, setup instructions, environment variables, deployment.
- API documented with request/response examples.
- Complex business logic has explanatory comments.
- Architecture diagram exists (even if simple).
- CHANGELOG maintained.

### Level 4 — Strong
- Architecture Decision Records (ADRs) for significant choices.
- API documentation includes error codes, rate limits, authentication.
- Onboarding guide enables new developers to contribute within a day.
- Runbooks for operational procedures.
- Code documentation follows consistent style (JSDoc, docstrings, etc.).
- Documentation is tested (doc tests, link checking).

### Level 5 — Exceptional
- Documentation is treated as a product: versioned, reviewed, maintained.
- Formal specifications for critical protocols or algorithms (TLA+, Z notation, or equivalent).
- Documentation covers not just "how" but "why" and "why not" (rejected alternatives).
- Learning paths for new team members (progressive disclosure of complexity).
- Documentation generates types/contracts (OpenAPI -> client SDKs).
- Theory references linked where architectural decisions rely on formal results.

---

## Dimension 8: Theory (Weight: 10%)

### Level 1 — Inadequate
- No awareness of algorithmic complexity. O(n^2) used where O(n log n) is standard.
- No understanding of database normalization or transaction isolation.
- Distributed system designed without awareness of CAP or consensus.

### Level 2 — Below Standard
- Basic Big-O awareness but analysis is sometimes wrong.
- Understands that distributed systems are "hard" but cannot articulate why.
- Knows terms (ACID, CAP) but cannot state precise definitions.

### Level 3 — Competent
- Correct Big-O analysis for common algorithms and data structures.
- Can select appropriate data structures for given access patterns with justification.
- Understands CAP theorem and can explain the tradeoff their system makes.
- Knows transaction isolation levels and their implications.
- Can explain why their system's consistency model is appropriate.

### Level 4 — Strong
- Can prove correctness of algorithms (loop invariants, induction).
- Understands computational complexity classes (P, NP, NP-complete) and can recognize NP-hard problems.
- Can analyze amortized complexity.
- Understands distributed consensus (Raft/Paxos) at the protocol level.
- Can reason about formal properties of type systems used in their stack.
- Applies queueing theory to capacity planning.

### Level 5 — Exceptional
- Can reduce problems to known complexity classes and reason about tractability.
- Can design approximation algorithms for NP-hard problems with provable guarantees.
- Can formally verify critical system properties (TLA+, model checking).
- Understands information-theoretic limits (Shannon bounds, compression limits).
- Can derive ML algorithm properties from statistical learning theory.
- Can reason about programming language semantics (operational, denotational).
- Applies cache-oblivious algorithm principles to data structure design.
- Knowledge spans all 10 theory files in this brain's theory directory.

---

## Computing the Overall Score

```
Overall = 0.15 * Code Quality
        + 0.15 * Architecture
        + 0.15 * Testing
        + 0.15 * Security
        + 0.10 * Performance
        + 0.10 * DevOps
        + 0.10 * Documentation
        + 0.10 * Theory
```

| Overall Score | Rating |
|--------------|--------|
| 4.5 - 5.0 | Principal/Staff Engineer Level |
| 3.5 - 4.4 | Senior Engineer Level |
| 2.5 - 3.4 | Mid-Level Engineer Level |
| 1.5 - 2.4 | Junior Engineer Level |
| 1.0 - 1.4 | Below Entry Level |

---

## Usage

1. Score each dimension independently using the rubric above.
2. Compute the weighted overall score.
3. Identify the lowest-scoring dimensions as improvement priorities.
4. Re-evaluate after implementing improvements.
5. Track scores over time to measure engineering maturity growth.

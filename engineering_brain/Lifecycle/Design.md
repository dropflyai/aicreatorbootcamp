# Design

## What This Enables

Design converts a validated plan into a technical blueprint that is reviewable,
testable, and implementable by any qualified engineer on the team. Without formal
design, architecture emerges accidentally from the aggregate of ad-hoc
implementation decisions -- producing systems that are locally coherent but globally
incoherent. This document prescribes a structured design process, architecture
pattern selection criteria, database design principles, API contract design,
SOLID principles, STRIDE threat modeling, and capacity estimation techniques.
Every system that passes through the Engineering Brain receives this level of
design rigor before a single line of production code is written.

---

## 1. System Design Process

System design is a sequential refinement process that moves from context to
containers to components to code (the C4 model, Brown 2018).

### Step-by-Step Protocol

**Step 1: Context Diagram**
Draw the system boundary. Identify all external actors (users, external systems,
third-party APIs). Define the contract at each boundary. This answers: "What does
the system interact with?"

**Step 2: Container Diagram**
Decompose the system into deployable units (web app, API server, database, message
queue, object store). Define the communication protocol between containers (HTTP,
gRPC, AMQP, WebSocket). This answers: "What are the major runtime components?"

**Step 3: Component Diagram**
Within each container, identify the major structural building blocks (controllers,
services, repositories, domain objects). Define the dependency direction. This
answers: "How is responsibility distributed inside each container?"

**Step 4: Code-Level Design**
For complex components, produce class/module diagrams, state machines, or sequence
diagrams. Apply SOLID principles (Section 5). This answers: "How do the critical
algorithms and interactions work?"

**Step 5: Cross-Cutting Concerns**
Address concerns that span all levels:
- Authentication and authorization model
- Observability (logging, metrics, tracing)
- Error handling and retry strategy
- Configuration management
- Secret management

**Step 6: Design Review**
Present the design to at least two engineers. Use a structured review checklist:
- Does the design satisfy all Must requirements from Planning?
- Are failure modes identified and handled?
- Are scalability assumptions stated and justified?
- Is the design testable at each level?

---

## 2. Architecture Pattern Selection

Choosing an architecture pattern is a consequential, partially irreversible decision.
Use this decision framework rather than defaulting to familiarity or trend.

### Decision Matrix

| Factor                    | Monolith          | Modular Monolith      | Microservices          |
|---------------------------|-------------------|-----------------------|------------------------|
| **Team size**             | 1-8 engineers     | 5-25 engineers        | 15+ engineers          |
| **Domain complexity**     | Low-moderate      | Moderate-high         | High, bounded contexts |
| **Deployment independence**| Not needed       | Partially needed      | Critical requirement   |
| **Operational maturity**  | Low (acceptable)  | Moderate              | High (required)        |
| **Initial velocity**      | Highest           | High                  | Lowest                 |
| **Long-term modularity**  | Lowest            | High (with discipline)| Highest                |
| **Infrastructure cost**   | Lowest            | Low-moderate          | Highest                |
| **Data consistency**      | ACID (easy)       | ACID within modules   | Eventual (complex)     |

### Decision Rule

Start with a **modular monolith** unless you have a compelling reason not to. The
modular monolith (Fowler, 2015) gives you the deployment simplicity of a monolith
with the structural discipline of microservices. Module boundaries can later be
promoted to service boundaries if operational need arises.

**Choose microservices only when:**
- Multiple teams need independent deployment cadences
- Different modules require fundamentally different scaling profiles
- Regulatory isolation requires separate process boundaries
- The team has production experience operating distributed systems

**Choose a pure monolith only when:**
- The project is a prototype, spike, or throwaway
- The team is 1-3 engineers and speed is paramount
- The domain is well-understood and unlikely to grow

### ADR Requirement

This decision MUST be captured in an ADR. See `Planning.md` Section 5.

---

## 3. Database Design

### 3.1 Normalization (Codd, 1970)

Normalization eliminates update anomalies by organizing data into relations that
satisfy progressively stricter normal forms.

| Normal Form | Rule                                                              | Practical Meaning                        |
|-------------|-------------------------------------------------------------------|------------------------------------------|
| 1NF         | Atomic values, no repeating groups                                | No arrays-in-columns, no CSV fields      |
| 2NF         | 1NF + no partial dependencies on composite key                   | Every non-key column depends on full key |
| 3NF         | 2NF + no transitive dependencies                                 | Non-key columns depend only on the key   |
| BCNF        | Every determinant is a candidate key                              | Stricter 3NF; resolves edge cases        |

**Default to 3NF for OLTP systems.** This is the standard starting point.

### 3.2 Denormalization Tradeoffs

Denormalization is a deliberate design decision, never an accident. It trades
write complexity and storage for read performance.

| Scenario                        | Denormalization Technique       | Tradeoff                           |
|---------------------------------|---------------------------------|------------------------------------|
| Frequent join on read path      | Materialized view or cache      | Stale reads vs. join cost          |
| High-cardinality aggregation    | Pre-computed summary table      | Write amplification vs. query time |
| Event sourcing reconstruction   | Read-model projection (CQRS)   | Eventual consistency vs. simplicity|
| Full-text search                | Search index (Elasticsearch)    | Index lag vs. query capability     |

**Rule:** Denormalize only after measuring. The burden of proof is on the engineer
proposing denormalization to demonstrate that 3NF is insufficient for the measured
workload.

### 3.3 Migration Discipline

- Every schema change is a versioned, forward-only migration
- Migrations are idempotent (safe to re-run)
- Destructive migrations (DROP COLUMN, DROP TABLE) require a two-phase approach:
  1. Deploy code that no longer reads the column/table
  2. Deploy migration that removes the column/table
- See `Shipping.md` Section 5 for migration-deployment coordination

---

## 4. API Design (Contract-First)

### 4.1 Contract-First Principle

The API contract (OpenAPI 3.x specification) is written and reviewed BEFORE
implementation begins. The contract is the source of truth; code is generated
from or validated against it.

### 4.2 OpenAPI Design Checklist

| Criterion                               | Rationale                                       |
|-----------------------------------------|-------------------------------------------------|
| Resource-oriented URLs (`/users/{id}`)  | Predictable, cacheable, self-documenting        |
| HTTP verbs match semantics              | GET is safe and idempotent; PUT is idempotent   |
| Consistent error schema                 | RFC 7807 Problem Details for HTTP APIs           |
| Pagination on all list endpoints        | Prevents unbounded response sizes                |
| Versioning strategy declared            | URL path (`/v1/`) or header (`Accept-Version`)  |
| Rate limiting headers                   | `X-RateLimit-Limit`, `X-RateLimit-Remaining`    |
| Request/response examples               | Concrete examples in the spec for every endpoint|

### 4.3 Backward Compatibility Rules

- Adding a new optional field: SAFE (backward compatible)
- Adding a new required field: BREAKING (requires version bump)
- Removing a field: BREAKING (requires deprecation period)
- Changing a field type: BREAKING (always)

### 4.4 API Review Gate

No API endpoint ships without review against this checklist. API review is a
separate review from code review; it focuses on contract correctness, not
implementation quality.

---

## 5. SOLID Principles (Martin, 2003)

SOLID provides five design constraints that, when followed, produce systems that
are easier to extend, test, and maintain. These are not suggestions; they are
engineering discipline.

### 5.1 Single Responsibility Principle (SRP)

A module should have one, and only one, reason to change. "Reason to change"
maps to a single actor or stakeholder whose requirements drive modification.

**Violation signal:** A class that changes for multiple unrelated reasons.
**Fix:** Extract responsibilities into separate classes with distinct owners.

### 5.2 Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.
New behavior is added by writing new code (new classes, new implementations),
not by modifying existing code.

**Implementation:** Strategy pattern, plugin architecture, dependency injection.

### 5.3 Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without altering the
correctness of the program (Liskov & Wing, 1994). This means subclasses must
honor the behavioral contract (preconditions, postconditions, invariants) of
the parent.

**Violation signal:** `instanceof` checks or type-switching in client code.
**Fix:** Redesign the type hierarchy or use composition over inheritance.

### 5.4 Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they do not use. Fat
interfaces should be split into role-specific interfaces.

**Violation signal:** Classes that implement interface methods with empty bodies
or `throw new NotImplementedException()`.

### 5.5 Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules; both should depend on
abstractions. Abstractions should not depend on details; details should depend
on abstractions.

**Implementation:** Define interfaces in the domain layer. Inject infrastructure
implementations at the composition root.

---

## 6. STRIDE Threat Modeling

STRIDE (Shostack, 2014) provides a systematic method for identifying security
threats against a system. Threat modeling is performed during design, not after
deployment.

### 6.1 STRIDE Categories

| Threat             | Property Violated  | Example                                    |
|--------------------|--------------------|--------------------------------------------|
| **S**poofing       | Authentication     | Forged JWT token                           |
| **T**ampering      | Integrity          | Modified request body in transit            |
| **R**epudiation    | Non-repudiation    | User denies performing a destructive action |
| **I**nfo Disclosure| Confidentiality    | Error message leaks stack trace             |
| **D**enial of Service | Availability    | Unbounded query exhausts database pool     |
| **E**levation of Privilege | Authorization | Regular user accesses admin endpoint     |

### 6.2 Threat Modeling Process

1. **Diagram the system:** Use the container diagram from Section 1, Step 2
2. **Identify trust boundaries:** Where does privilege change? (client/server, service/database, public/private network)
3. **Enumerate threats:** For each element crossing a trust boundary, apply all six STRIDE categories
4. **Rate threats:** Use the risk matrix from `Planning.md` Section 7
5. **Define mitigations:** For each threat scoring >= 10, specify a concrete countermeasure
6. **Document:** Record the threat model in the design document alongside the architecture

### 6.3 Minimum Mitigations

| Threat               | Minimum Mitigation                                         |
|----------------------|------------------------------------------------------------|
| Spoofing             | Strong authentication (OAuth 2.0 + PKCE, or mTLS)         |
| Tampering            | TLS in transit, checksums at rest, input validation        |
| Repudiation          | Immutable audit log with timestamps and actor identity     |
| Info Disclosure      | Structured error responses (no stack traces in production) |
| Denial of Service    | Rate limiting, request size limits, query timeouts         |
| Elevation of Privilege| RBAC/ABAC with least-privilege defaults                   |

---

## 7. Capacity Estimation (Back-of-Envelope)

Capacity estimation produces order-of-magnitude resource requirements. The goal
is not precision but the ability to distinguish between needing 1 server vs. 10
vs. 1000.

### 7.1 Standard Estimation Framework

1. **Estimate user base:** DAU (Daily Active Users), peak concurrent users
2. **Estimate request rate:** Requests per second = DAU x actions/day / 86400
3. **Estimate data volume:** Storage = users x records/user x record_size x retention
4. **Estimate bandwidth:** Bandwidth = request_rate x avg_response_size
5. **Apply growth factor:** Multiply by expected growth over design horizon (typically 2-3x for 18 months)

### 7.2 Reference Numbers (Latency and Throughput)

| Operation                        | Latency (approx)    |
|----------------------------------|---------------------|
| L1 cache reference               | 0.5 ns              |
| Main memory reference            | 100 ns              |
| SSD random read                  | 150 us              |
| HDD random read                  | 10 ms               |
| Round trip same datacenter       | 0.5 ms              |
| Round trip US coast-to-coast     | 40 ms               |
| Sequential read 1 MB from SSD    | 1 ms                |
| Sequential read 1 MB from HDD    | 20 ms               |

### 7.3 Estimation Output Format

```
System: [Name]
Design Horizon: [18 months]
DAU: [X]  |  Peak QPS: [Y]  |  Storage: [Z TB]  |  Bandwidth: [W Gbps]
Compute: [N instances of type T]
Database: [Read replicas: R, Write primary: 1, Storage class: S]
Cache: [Size: G GB, Eviction: LRU, TTL: T seconds]
CDN: [Yes/No, estimated egress: E TB/month]
```

---

## Cross-References

- Architecture pattern decision requires ADR (`Planning.md` Section 5)
- Risk matrix for STRIDE threat rating (`Planning.md` Section 7)
- Database migration coordination with deploys (`Shipping.md` Section 5)
- SOLID principles inform implementation patterns (`../Patterns/`)
- Capacity estimates feed infrastructure provisioning (`../Playbook.md`)
- API contracts feed verification (`Verification.md` Section 3)

---

## Key References

- Brown, S. (2018). *The C4 Model for Visualising Software Architecture*.
- Codd, E.F. (1970). A Relational Model of Data for Large Shared Data Banks. *CACM*, 13(6).
- Fowler, M. (2015). MonolithFirst. martinfowler.com.
- Liskov, B. & Wing, J. (1994). A Behavioral Notion of Subtyping. *ACM TOPLAS*, 16(6).
- Martin, R.C. (2003). *Agile Software Development: Principles, Patterns, and Practices*. Prentice Hall.
- Shostack, A. (2014). *Threat Modeling: Designing for Security*. Wiley.
- Fielding, R.T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, UC Irvine.

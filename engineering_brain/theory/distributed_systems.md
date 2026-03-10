# Distributed Systems Theory

## What This Enables

Distributed systems theory provides the mathematical framework for understanding what is and is not possible when multiple computers must coordinate. It explains why distributed databases make the tradeoffs they do, why consensus is hard, and why "just add more servers" introduces fundamental impossibilities. This knowledge prevents engineers from building systems that violate proven theoretical limits, and guides the selection of appropriate consistency models, consensus protocols, and failure handling strategies.

---

## Foundational Concepts

### System Models

Before reasoning about distributed systems, we must define our assumptions:

**Timing models:**
- **Synchronous:** Messages delivered within known bounded time. Processors execute at known speeds. Unrealistic but analytically useful.
- **Asynchronous:** No timing guarantees. Messages may be delayed arbitrarily (but eventually arrive). Processes may be arbitrarily slow. Models the real Internet.
- **Partially synchronous:** System behaves asynchronously but eventually becomes synchronous (GST - Global Stabilization Time). Most practical systems assume this.

**Failure models (weakest to strongest):**
- **Crash-stop:** Processes fail by halting and never recover.
- **Crash-recovery:** Processes may crash and restart with durable state.
- **Omission:** Processes may fail to send or receive messages.
- **Byzantine:** Processes may behave arbitrarily (including maliciously).

### Logical Time

In distributed systems, physical clocks cannot be perfectly synchronized. We need logical notions of time.

**Lamport Timestamps (1978):**

Each process maintains a counter C. Rules:
1. Before each event, increment C.
2. When sending message m, attach timestamp C.
3. On receiving message with timestamp t, set C = max(C, t) + 1.

**Property:** If event a happens-before event b (written a -> b), then C(a) < C(b).
**Limitation:** The converse is not true. C(a) < C(b) does not imply a -> b.

**Vector Clocks (Fidge/Mattern, 1988):**

Each process i maintains vector V[1..n]. Rules:
1. Before each event at process i, increment V[i].
2. When sending, attach entire vector V.
3. On receiving vector W at process i, set V[j] = max(V[j], W[j]) for all j, then increment V[i].

**Property:** a -> b if and only if V(a) < V(b) (componentwise comparison).

Vector clocks capture causality precisely, enabling detection of concurrent events (neither a -> b nor b -> a).

### Happens-Before Relation (Lamport, 1978)

The happens-before relation (->) is the smallest relation satisfying:
1. If a and b are events at the same process and a occurs before b, then a -> b.
2. If a is the sending of a message and b is its receipt, then a -> b.
3. Transitivity: if a -> b and b -> c, then a -> c.

Events a and b are **concurrent** (a || b) if neither a -> b nor b -> a.

---

## Key Theorems and Results

### The CAP Theorem

**Informal statement (Brewer, 2000):** A distributed system cannot simultaneously provide all three of Consistency, Availability, and Partition tolerance.

**Formal statement (Gilbert & Lynch, 2002):** In an asynchronous network model, it is impossible for a read/write storage system to simultaneously provide:
- **Consistency (Linearizability):** Every read returns the most recent write.
- **Availability:** Every request to a non-failing node receives a response.
- **Partition tolerance:** The system continues to operate despite arbitrary message loss between nodes.

**Proof sketch:** During a network partition, a write arrives at one partition. A read arrives at the other. The system must either: (a) return potentially stale data (sacrificing C), or (b) refuse to respond (sacrificing A). Since real networks experience partitions, every system must choose CP or AP.

**Important nuances:**
- CAP is about the behavior during a partition. When there is no partition, you can have both C and A.
- "Consistency" in CAP means linearizability specifically, not the C in ACID.
- The theorem is about the impossibility of a universal guarantee, not about moment-to-moment tradeoffs.

### PACELC (Abadi, 2012)

An extension of CAP:

> If there is a **P**artition, choose between **A**vailability and **C**onsistency. **E**lse (no partition), choose between **L**atency and **C**onsistency.

| System | P+A/P+C | E+L/E+C | Classification |
|--------|---------|---------|----------------|
| DynamoDB | PA | EL | PA/EL |
| Cassandra | PA | EL | PA/EL |
| MongoDB | PC | EC | PC/EC |
| PostgreSQL (single) | PC | EC | PC/EC |
| CockroachDB | PC | EC | PC/EC |
| Cosmos DB | Configurable | Configurable | Tunable |

### FLP Impossibility Result

**Theorem (Fischer, Lynch, Paterson, 1985):** In an asynchronous system with even one faulty process (crash failure), no deterministic algorithm can guarantee consensus.

This is one of the most important results in distributed computing. It proves that:
- There is no deterministic, fault-tolerant consensus protocol for asynchronous systems
- Any consensus protocol must use either synchrony assumptions, randomization, or failure detectors to circumvent FLP

**Practical workaround:** Real systems use partial synchrony (timeouts), randomization, or unreliable failure detectors to achieve consensus in practice.

### Byzantine Fault Tolerance

**Theorem (Lamport, Shostak, Pease, 1982):** In a system with n processes, Byzantine consensus is achievable if and only if n >= 3f + 1 where f is the number of Byzantine (arbitrarily faulty) processes.

**Implication:** To tolerate 1 Byzantine fault, you need at least 4 nodes. To tolerate f faults, you need 3f + 1 nodes.

---

## Consensus Algorithms

### Paxos (Lamport, 1998)

Paxos solves consensus in an asynchronous system with crash failures (not Byzantine).

**Roles:** Proposers, Acceptors, Learners (a node may play multiple roles).

**Basic Paxos (single-decree):**

Phase 1 (Prepare):
1. Proposer selects proposal number n, sends Prepare(n) to a majority of acceptors.
2. Acceptors respond with Promise(n, previously_accepted_value) if n is highest seen.

Phase 2 (Accept):
1. If proposer receives promises from a majority, it sends Accept(n, v) where v is either a previously accepted value or the proposer's own value.
2. Acceptors accept if they have not promised a higher number.
3. Once a majority accepts, value is chosen.

**Multi-Paxos:** Optimizes for sequences of decisions by electing a stable leader, reducing to a single round-trip per decision.

**Properties:**
- Safety: At most one value is chosen (even with concurrent proposals).
- Liveness: Not guaranteed (dueling proposers), requires leader election.

### Raft (Ongaro & Ousterhout, 2014)

Designed as an understandable alternative to Paxos.

**Key concepts:**
- **Leader election:** One leader per term. Leaders are elected by majority vote with term numbers. Candidates use randomized timeouts to break ties.
- **Log replication:** Leader appends entries to log, replicates to followers. Entry is committed when replicated to a majority.
- **Safety:** A candidate cannot win election unless its log is at least as up-to-date as any majority member's log.

**Comparison to Paxos:**
- Same safety guarantees
- Easier to understand and implement correctly
- Leader-based (unlike basic Paxos which allows multiple proposers)
- Used in: etcd, CockroachDB, TiKV, Consul, InfluxDB

### Practical Byzantine Fault Tolerance (PBFT, Castro & Liskov, 1999)

For systems with Byzantine faults. Requires 3f + 1 nodes to tolerate f Byzantine faults.

**Three phases:**
1. **Pre-prepare:** Primary assigns sequence number to request, broadcasts.
2. **Prepare:** Replicas verify and broadcast prepare messages. Wait for 2f matching prepares.
3. **Commit:** Replicas broadcast commit messages. Wait for 2f + 1 commits. Execute request.

**Complexity:** O(n^2) message complexity per operation. Does not scale well beyond ~20 nodes.

---

## Distributed Transactions

### Two-Phase Commit (2PC)

**Phase 1 (Prepare):** Coordinator asks all participants to prepare (vote yes/no).
**Phase 2 (Commit/Abort):** If all vote yes, coordinator sends commit. If any vote no, coordinator sends abort.

**Problem:** Blocking protocol. If coordinator crashes after sending prepare but before sending decision, participants holding locks are blocked indefinitely. This is a fundamental limitation.

### Three-Phase Commit (3PC)

Adds a pre-commit phase between prepare and commit to avoid blocking. However, 3PC only works in synchronous systems (bounded message delay) and is not partition-tolerant. Rarely used in practice.

### Saga Pattern

For long-running distributed transactions where 2PC is impractical:

1. Break transaction into sequence of local transactions T1, T2, ..., Tn.
2. Each Ti has a compensating transaction Ci.
3. If Ti fails, execute C_{i-1}, C_{i-2}, ..., C1 to undo previous steps.

**Coordination patterns:**
- **Choreography:** Each service publishes events that trigger the next step. Simple but hard to debug.
- **Orchestration:** Central coordinator manages the saga flow. Easier to reason about.

**Tradeoff:** Sagas provide eventual consistency, not ACID isolation. Intermediate states are visible.

---

## Consistency Models

### Linearizability (Herlihy & Wing, 1990)

The strongest single-object consistency model. Every operation appears to take effect at a single point between its invocation and response. All operations are ordered in a way consistent with real-time ordering.

**Formally:** A history H is linearizable if it can be extended (by adding responses to pending operations) and there exists a sequential history S such that:
1. S is equivalent to H (same operations and results)
2. If op1 completes before op2 starts in H, then op1 precedes op2 in S

### Serializability

A multi-object consistency model from databases. A schedule of transactions is serializable if its result is equivalent to some serial execution of those transactions.

**Strict serializability** = serializability + linearizability. Each transaction appears to execute at a single point in real time.

### Eventual Consistency

If no new updates are made, eventually all reads return the last written value. This is a very weak guarantee -- it says nothing about how long "eventually" takes or what intermediate states are observed.

**Stronger variants:**
- **Causal consistency:** Operations causally related are seen in order. Concurrent operations may be seen in different orders.
- **Read-your-writes:** A process always sees its own writes.
- **Monotonic reads:** Once a process reads a value, it never sees an older value.
- **Session consistency:** Guarantees within a client session.

### CRDTs (Conflict-free Replicated Data Types)

Data structures that can be replicated across multiple nodes with guaranteed eventual convergence without coordination.

**State-based CRDTs (CvRDTs):** Each replica maintains full state. States are merged using a join operation on a join-semilattice. Requires: associativity, commutativity, idempotency.

**Operation-based CRDTs (CmRDTs):** Replicas exchange operations. Requires commutative operations (for concurrent operations).

**Examples:**
- **G-Counter:** Grow-only counter. Each node has its own counter. Value = sum of all counters.
- **PN-Counter:** Positive-negative counter using two G-Counters.
- **G-Set:** Grow-only set. Union for merge.
- **OR-Set (Observed-Remove Set):** Add and remove with unique tags. Resolves concurrent add/remove.
- **LWW-Register:** Last-writer-wins using timestamps.

---

## Practical Implications

1. **You cannot avoid CAP.** Every distributed system must make a choice during partitions. Understand what your system chooses and design accordingly. Most web applications choose AP (availability) and handle inconsistency at the application level.

2. **FLP means consensus needs pragmatism.** Practical consensus (Raft, Paxos) works because networks are mostly well-behaved. Design for the common case but handle the uncommon case gracefully.

3. **2PC is a bottleneck.** Avoid distributed transactions when possible. Use Saga pattern for cross-service workflows. Design services to own their data independently.

4. **Vector clocks are underused.** Most engineers use wall-clock timestamps for ordering, which is incorrect in distributed systems. Use logical clocks or hybrid logical clocks (HLC) when causal ordering matters.

5. **CRDTs enable offline-first.** For applications requiring offline operation or multi-region writes, CRDTs provide a mathematically sound foundation. Libraries: Automerge, Yjs, Riak's built-in CRDTs.

6. **Consistency is a spectrum.** Choose the weakest consistency model your application can tolerate. Stronger consistency means higher latency and lower availability.

---

## Common Misconceptions

1. **"CAP means pick 2 out of 3."** This oversimplification is misleading. Partitions are not a choice -- they happen. The real choice is between consistency and availability during a partition, and between consistency and latency otherwise (PACELC).

2. **"Eventual consistency means data will be lost."** Eventual consistency guarantees convergence -- all replicas will eventually agree. It says nothing about data loss. The concern is stale reads, not lost writes.

3. **"Raft/Paxos provides strong consistency automatically."** These protocols provide consensus on a single value or log. Building a linearizable key-value store on top requires additional careful engineering (read leases, log compaction, snapshot transfer).

4. **"More replicas means more availability."** More replicas means more availability for reads (in AP systems) but can reduce write availability in CP systems that require majority acknowledgment.

5. **"Byzantine fault tolerance is only for blockchains."** BFT is relevant whenever nodes cannot be fully trusted: multi-tenant clouds, edge computing, sensor networks.

---

## Further Reading

- **Kleppmann, M.** *Designing Data-Intensive Applications* - The best bridge between distributed systems theory and practice. Essential reading.
- **Lynch, N.** *Distributed Algorithms* - The definitive theoretical treatment. Formal and rigorous.
- **Tanenbaum, A. & Van Steen, M.** *Distributed Systems: Principles and Paradigms* - Comprehensive textbook covering theory and practice.
- **Lamport, L.** "Time, Clocks, and the Ordering of Events in a Distributed System" (1978) - One of the most cited papers in CS. Introduces happens-before and logical clocks.
- **Fischer, M., Lynch, N., & Paterson, M.** "Impossibility of Distributed Consensus with One Faulty Process" (1985) - The FLP impossibility result.
- **Brewer, E.** "CAP Twelve Years Later: How the Rules Have Changed" (2012) - Brewer's own retrospective on CAP.
- **Ongaro, D. & Ousterhout, J.** "In Search of an Understandable Consensus Algorithm" (2014) - The Raft paper.
- **Shapiro, M. et al.** "Conflict-Free Replicated Data Types" (2011) - Foundational CRDT paper.
- **Bailis, P. & Ghodsi, A.** "Eventual Consistency Today: Limitations, Extensions, and Beyond" (2013) - Excellent survey of consistency models.

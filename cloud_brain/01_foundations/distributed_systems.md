# Distributed Systems Theory

## Foundation

Cloud computing is distributed computing. Every architecture decision in the Cloud Brain must account for the fundamental constraints of distributed systems: network unreliability, partial failure, clock skew, and the impossibility results that bound what distributed systems can guarantee.

This module encodes the theoretical bedrock from Kleppmann's *Designing Data-Intensive Applications*, Lamport's distributed computing corpus, and the consensus algorithm literature.

---

## 1. The Eight Fallacies of Distributed Computing

Peter Deutsch and James Gosling identified eight false assumptions that architects make about networks. Every Cloud Brain design must explicitly address each:

| Fallacy | Reality | Cloud Implication |
|---------|---------|-------------------|
| The network is reliable | Packets drop, links fail, AZs partition | Design for failure; retry with backoff; circuit breakers |
| Latency is zero | Cross-AZ: 1-2ms. Cross-region: 50-200ms. Cross-cloud: variable | Data locality matters; async where possible; cache aggressively |
| Bandwidth is infinite | Data transfer has cost and limits | Minimize cross-AZ/region transfer; compress; use CDN |
| The network is secure | Every packet can be intercepted | Encrypt in transit (TLS); use VPC; zero trust |
| Topology doesn't change | Auto-scaling adds/removes nodes constantly | Service discovery; health checks; load balancer indirection |
| There is one administrator | Multi-team, multi-account, multi-provider | IAM boundaries; organizational policies; shared nothing |
| Transport cost is zero | $0.01-0.09/GB for data transfer | Architecture cost modeling must include transfer |
| The network is homogeneous | Different providers, regions, link qualities | Abstract provider specifics; test cross-region behavior |

---

## 2. CAP Theorem

### Formal Statement

Brewer's CAP Theorem (2000), formalized by Gilbert and Lynch (2002):

In an asynchronous network model, it is impossible for a distributed data store to simultaneously provide more than two of:

- **Consistency (C):** Every read receives the most recent write or an error (linearizability)
- **Availability (A):** Every request receives a non-error response (without guaranteeing it reflects the most recent write)
- **Partition tolerance (P):** The system continues to operate despite arbitrary message loss between nodes

### Why "Pick Two" is Misleading

Network partitions are not optional in distributed systems -- they will happen. The real choice is:

```
                    PARTITION OCCURS
                         │
              ┌──────────┴──────────┐
              │                     │
         CP System              AP System
              │                     │
    Refuse some requests    Allow all requests
    to maintain consistency  but may return stale data
              │                     │
    Examples:                Examples:
    - ZooKeeper              - Cassandra (tunable)
    - etcd                   - DynamoDB (eventually consistent reads)
    - HBase                  - CouchDB
    - Spanner (CP-ish)*      - Riak
```

*Google Spanner achieves practical CP behavior through TrueTime (atomic clocks + GPS receivers in every data center), reducing clock uncertainty to ~7ms. This is not replicable in standard cloud environments.

### PACELC Extension (Abadi, 2012)

CAP only describes behavior during partitions. PACELC adds the normal-operation tradeoff:

```
If Partition:
    Choose Availability or Consistency (PA or PC)
Else (normal operation):
    Choose Latency or Consistency (EL or EC)

System Classifications:
┌──────────────────┬────────────┬─────────────────┐
│ System           │ Partition  │ Normal Operation │
├──────────────────┼────────────┼─────────────────┤
│ DynamoDB (strong)│ PC         │ EC              │
│ DynamoDB (event) │ PA         │ EL              │
│ Cassandra        │ PA         │ EL              │
│ MongoDB          │ PC         │ EC              │
│ Spanner          │ PC         │ EC              │
│ Aurora           │ PC         │ EC              │
│ CockroachDB      │ PC         │ EC (tunable)    │
└──────────────────┴────────────┴─────────────────┘
```

---

## 3. Consistency Models

### Consistency Model Hierarchy

From strongest to weakest, the consistency models relevant to cloud architecture:

```
STRONGEST ─────────────────────────────────────────> WEAKEST

Linearizability → Sequential → Causal → Eventual
      │               │           │          │
  "Real-time      "Legal       "Cause      "Eventually
   ordering"       ordering"   before       same value"
                               effect"
```

### Linearizability (Strong Consistency)

**Definition:** Operations appear to execute atomically at some instant between invocation and completion. Equivalent to a single-copy system.

**Properties:**
- Total order on all operations
- Reads always return the most recent write
- Real-time ordering preserved

**Cloud services providing linearizability:**
- DynamoDB strongly consistent reads
- Aurora reader endpoint with `SELECT ... FOR UPDATE`
- Spanner (all reads/writes by default)
- etcd (used by Kubernetes)

**Cost:** Higher latency (requires coordination), lower throughput, reduced availability during partitions.

### Sequential Consistency

**Definition:** All operations appear to execute in some sequential order, and operations from each individual process appear in the order specified by that process. Does NOT require real-time ordering.

**Practical implication:** If process A writes X=1 then X=2, all processes see X=1 before X=2. But a concurrent write by process B may be ordered anywhere in the global sequence.

### Causal Consistency

**Definition:** Operations that are causally related are seen by all nodes in the same order. Concurrent (causally independent) operations may be seen in different orders.

**Causal relationship:** Operation B is causally dependent on operation A if:
- A and B are in the same process and A precedes B
- B reads a value written by A
- There exists an operation C such that A causally precedes C and C causally precedes B (transitivity)

**Implementation:** Vector clocks, version vectors, or logical timestamps (Lamport clocks) track causal dependencies.

### Eventual Consistency

**Definition:** If no new updates are made, all replicas will eventually converge to the same value. No bound on convergence time.

**Cloud services using eventual consistency:**
- S3 (was eventually consistent for overwrites until 2020; now strongly consistent)
- DynamoDB default reads
- CloudFront cache propagation
- Route53 DNS propagation

**Variants:**
- **Read-your-writes:** A process always sees its own writes (session consistency)
- **Monotonic reads:** If a process reads X=2, it will never subsequently read X=1
- **Monotonic writes:** Writes from a process are applied in order

---

## 4. Consensus Algorithms

Consensus is the fundamental problem of distributed computing: getting multiple nodes to agree on a value despite failures.

### FLP Impossibility Result (1985)

Fischer, Lynch, and Paterson proved that in an asynchronous system with even one faulty process, no deterministic algorithm can guarantee consensus. This is why all practical consensus algorithms use timeouts (partial synchrony assumption) or randomization.

### Paxos (Lamport, 1998)

The canonical consensus algorithm. Paxos proceeds in two phases:

```
Phase 1: PREPARE
┌─────────┐                              ┌─────────┐
│ Proposer │──── Prepare(n) ────────────>│ Acceptor │
│          │<─── Promise(n, prev_val) ───│  (quorum)│
└─────────┘                              └─────────┘

Phase 2: ACCEPT
┌─────────┐                              ┌─────────┐
│ Proposer │──── Accept(n, value) ──────>│ Acceptor │
│          │<─── Accepted(n, value) ─────│  (quorum)│
└─────────┘                              └─────────┘

Phase 3: LEARN
┌─────────┐                              ┌─────────┐
│ Acceptor │──── Accepted(n, value) ────>│ Learner  │
│  (quorum)│                              │          │
└─────────┘                              └─────────┘
```

**Key properties:**
- Safety: Only a single value is chosen
- Liveness: Eventually a value is chosen (under partial synchrony)
- Requires a quorum (majority) of acceptors

**Multi-Paxos:** Extends basic Paxos for a sequence of values (replicated log). Elects a stable leader to skip Phase 1, reducing message complexity.

**Cloud usage:** Multi-Paxos or variants underpin Spanner, Chubby (Google's distributed lock service), and many distributed databases.

### Raft (Ongaro and Ousterhout, 2014)

Designed for understandability while maintaining Paxos-equivalent correctness. Decomposes consensus into three subproblems:

```
┌──────────────────────────────────────────────────────────────┐
│                        RAFT OVERVIEW                          │
│                                                              │
│  1. LEADER ELECTION                                          │
│     ┌────────┐    timeout     ┌───────────┐                  │
│     │Follower│───────────────>│ Candidate  │                 │
│     └────────┘                └─────┬─────┘                  │
│         ^                          │ wins election           │
│         │                          v                         │
│         │         ┌────────────────────┐                     │
│         └─────────│      Leader        │                     │
│       discovers   └────────────────────┘                     │
│       higher term     sends heartbeats                       │
│                                                              │
│  2. LOG REPLICATION                                          │
│     Leader receives client request                           │
│     → Appends to local log                                  │
│     → Sends AppendEntries RPC to all followers               │
│     → Waits for majority acknowledgment                     │
│     → Commits entry, responds to client                     │
│     → Followers apply committed entries                      │
│                                                              │
│  3. SAFETY                                                   │
│     - Election restriction: candidate's log must be          │
│       at least as up-to-date as majority                     │
│     - Leader completeness: committed entries persist         │
│       through all future leaders                             │
│     - State machine safety: all servers apply same           │
│       commands in same order                                 │
└──────────────────────────────────────────────────────────────┘
```

**Cloud usage:** etcd (Kubernetes control plane), CockroachDB, TiKV, HashiCorp Consul, HashiCorp Vault.

**Why Raft matters for cloud architects:** Kubernetes stores all cluster state in etcd, which uses Raft. Understanding Raft explains:
- Why etcd requires an odd number of nodes (quorum)
- Why etcd performance degrades with cluster size (more replication)
- Why etcd latency directly impacts Kubernetes API server responsiveness
- Why cross-region etcd is problematic (consensus requires round-trips)

---

## 5. Replication Strategies

### Single-Leader (Primary-Replica)

```
┌────────┐     sync/async     ┌──────────┐
│ Leader  │──────────────────>│ Follower1 │
│ (writes)│──────────────────>│ Follower2 │
└────────┘──────────────────>│ Follower3 │
     │                        └──────────┘
     │                             │
  All writes                  Read replicas
  go here                    (eventually consistent
                              or sync consistent)
```

**Cloud examples:** RDS Multi-AZ, Aurora, Cloud SQL
**Tradeoffs:** Simple, strong consistency possible for reads from leader, but leader is a bottleneck and single point of failure (requires failover).

### Multi-Leader (Active-Active)

```
┌──────────┐     async     ┌──────────┐
│ Leader A  │<────────────>│ Leader B  │
│ (Region 1)│              │ (Region 2)│
└──────────┘              └──────────┘
     │                          │
  Local writes              Local writes
  low latency              low latency
```

**Cloud examples:** DynamoDB Global Tables, Aurora Global Database (with write forwarding), CockroachDB
**Tradeoffs:** Low write latency in all regions, but conflict resolution is required. Conflicts arise when two leaders concurrently modify the same data. Resolution strategies: last-writer-wins (data loss risk), merge functions (application logic), CRDTs (automatic convergence).

### Leaderless (Quorum-based)

```
Client writes to N nodes simultaneously
Client reads from N nodes simultaneously
Consistency guaranteed when: R + W > N

Example (N=3, W=2, R=2):
┌────────┐
│ Node 1  │ ← write ← read
├────────┤
│ Node 2  │ ← write ← read
├────────┤
│ Node 3  │ ← write
└────────┘

W=2: write succeeds if 2/3 nodes acknowledge
R=2: read from 2/3 nodes, take latest version
R+W=4 > N=3 → guaranteed overlap → consistent
```

**Cloud examples:** Cassandra, DynamoDB (internal implementation), Riak
**Tradeoffs:** No single point of failure, good availability, but quorum operations add latency and require conflict resolution for concurrent writes.

---

## 6. Partitioning (Sharding)

When data exceeds a single node's capacity, it must be partitioned. The partitioning strategy determines data distribution, query routing, and rebalancing behavior.

### Partitioning Strategies

| Strategy | Method | Pros | Cons |
|----------|--------|------|------|
| **Hash partitioning** | hash(key) mod N | Even distribution | No range queries; rebalancing expensive |
| **Range partitioning** | Key ranges assigned to partitions | Range queries efficient | Hot spots if access is skewed |
| **Consistent hashing** | Keys and nodes on a hash ring | Minimal rebalancing on node add/remove | Uneven distribution without virtual nodes |
| **Directory-based** | Lookup table maps keys to partitions | Flexible | Directory is a bottleneck/SPOF |

### DynamoDB Partitioning

DynamoDB uses consistent hashing with the partition key:

```
Partition Key → hash() → Partition (10GB max, 3000 RCU / 1000 WCU)

Hot partition problem:
  If many items share a partition key → one partition overloaded
  Solution: Add random suffix to partition key (write sharding)

  Before: PK = "user-123"  (all items on one partition)
  After:  PK = "user-123#3" (distributed across partitions)
         PK = "user-123#7"
         Read requires scatter-gather across all suffixes
```

---

## 7. Clocks and Ordering

### The Problem with Physical Clocks

Distributed systems cannot rely on synchronized physical clocks because:
- Clock drift: quartz oscillators drift ~50ppm (seconds per day)
- NTP synchronization: accurate to ~1-10ms over internet, ~0.1ms over LAN
- Leap seconds: UTC occasionally adds a second, causing ambiguity
- VM clock issues: vCPU scheduling can cause large clock jumps

### Lamport Clocks (Logical Clocks)

Lamport (1978) defined a logical timestamp that establishes a partial order:

```
Rules:
1. Before sending a message: increment local counter
2. When receiving a message: local = max(local, received) + 1

Process A:  1 ──> 2 ──────────> 3 ──> 4
                   │ msg            ^
                   v                │ msg
Process B:       1 ──> 2 ──> 3 ────┘
```

**Limitation:** Lamport clocks give a partial order. If L(a) < L(b), we cannot conclude a happened before b (they may be concurrent).

### Vector Clocks

Vector clocks extend Lamport clocks to detect concurrency:

```
Each process maintains a vector [clock_A, clock_B, clock_C]

Process A: [1,0,0] → [2,0,0] → [3,2,0]
Process B: [0,1,0] → [2,2,0] → [2,3,0]
Process C: [0,0,1] → [0,0,2] → [3,2,3]

Comparison:
  V1 < V2 iff all V1[i] <= V2[i] and at least one V1[i] < V2[i]
  If neither V1 < V2 nor V2 < V1 → concurrent (conflict)
```

**Cloud relevance:** DynamoDB and Riak use vector clock variants for conflict detection in leaderless replication.

---

## 8. Failure Modes

### Byzantine vs. Crash Failures

| Failure Model | Description | Cloud Relevance |
|---------------|-------------|-----------------|
| **Crash-stop** | Node stops and never recovers | EC2 instance termination |
| **Crash-recovery** | Node stops but may recover with persistent state | EC2 reboot, AZ recovery |
| **Omission** | Node fails to send or receive messages | Network partition, packet loss |
| **Byzantine** | Node behaves arbitrarily (including maliciously) | Rarely assumed in cloud (trusted provider) |

Cloud architectures typically assume crash-recovery and omission failures, not Byzantine. This simplifies consensus requirements (Raft/Paxos vs. PBFT).

### Failure Detection

In asynchronous networks, perfect failure detection is impossible (FLP result). Practical systems use **phi accrual failure detectors** that output a suspicion level rather than binary alive/dead.

**Cloud implementations:**
- ELB health checks (HTTP, TCP, threshold-based)
- Kubernetes liveness/readiness probes
- Route53 health checks (multi-region failover trigger)
- Consul gossip-based failure detection

---

## 9. Cloud Architecture Decision Matrix

When designing distributed cloud systems, use this decision matrix:

| Requirement | Choose | Avoid | Cloud Service |
|-------------|--------|-------|---------------|
| Strong consistency + high availability | CP with multi-AZ | Single-region | Aurora, Spanner |
| Low-latency global reads | Eventual consistency + CDN | Synchronous replication | DynamoDB Global Tables + CloudFront |
| Low-latency global writes | Multi-leader + conflict resolution | Single-leader | DynamoDB Global Tables, CockroachDB |
| Event ordering guarantee | Single-partition sequential | Multi-partition ordering | Kinesis (per-shard), SQS FIFO |
| Exactly-once processing | Idempotency + at-least-once | Relying on at-most-once | SQS + Lambda + idempotency table |

---

## References

- Kleppmann, M. *Designing Data-Intensive Applications.* O'Reilly, 2017. Chapters 5-9.
- Lamport, L. "The Part-Time Parliament." ACM TOCS, 1998 (Paxos).
- Ongaro, D. and Ousterhout, J. "In Search of an Understandable Consensus Algorithm." USENIX ATC, 2014 (Raft).
- Gilbert, S. and Lynch, N. "Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services." 2002.
- Abadi, D. "Consistency Tradeoffs in Modern Distributed Database System Design." IEEE Computer, 2012 (PACELC).
- Fischer, M., Lynch, N., and Paterson, M. "Impossibility of Distributed Consensus with One Faulty Process." JACM, 1985 (FLP).
- Lamport, L. "Time, Clocks, and the Ordering of Events in a Distributed System." CACM, 1978.
- Vogels, W. "Eventually Consistent." CACM, 2009.

---

**This module is prerequisite knowledge for all Cloud Brain architecture decisions. The constraints described here are not obstacles to be overcome -- they are physical laws to be designed around.**

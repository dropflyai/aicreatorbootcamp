# Database Theory

## What This Enables

Database theory provides the mathematical foundations for data storage, retrieval, and integrity. Understanding relational algebra, normalization theory, and transaction semantics enables engineers to design schemas that prevent anomalies, write queries that are provably correct, and reason about the guarantees (and limitations) of their database systems. This knowledge is essential for choosing the right database, understanding why certain query patterns are slow, and designing systems that maintain correctness under concurrent access.

---

## Foundational Concepts

### Relational Model (Codd, 1970)

The relational model represents data as relations (tables), where:

**Relation:** A subset of the Cartesian product of domains D1 x D2 x ... x Dn. Each element is a tuple.

**Key properties:**
- Tuples are unordered (a relation is a set, not a list).
- Attributes are unordered.
- All attribute values are atomic (First Normal Form).
- Each tuple is unique (enforced by keys).

**Formal definitions:**
- **Superkey:** A set of attributes whose values uniquely identify tuples.
- **Candidate key:** A minimal superkey (no proper subset is a superkey).
- **Primary key:** A designated candidate key.
- **Foreign key:** An attribute set in one relation that references a candidate key in another.

### Relational Algebra

A procedural query language with six fundamental operations:

**Selection (sigma):** Filter rows by predicate.
```
sigma_{age > 21}(Students)
```

**Projection (pi):** Select columns.
```
pi_{name, age}(Students)
```

**Union:** Combine tuples from two compatible relations.
```
R union S  (R and S must have same schema)
```

**Set difference:** Tuples in R but not in S.
```
R - S
```

**Cartesian product:** All combinations of tuples.
```
R x S
```

**Rename (rho):** Rename relation or attributes.
```
rho_{S(A,B)}(R)
```

**Derived operations:**
- **Natural join:** R |><| S = pi_{...}(sigma_{R.A=S.A}(R x S))
- **Theta join:** R |><|_theta S = sigma_theta(R x S)
- **Semijoin:** R |><| S projected back to R's schema
- **Division:** R / S = tuples in R associated with all tuples in S
- **Outer joins:** Left, right, full -- preserve unmatched tuples with nulls

**Closure:** These six operations are relationally complete -- they can express any query expressible in first-order predicate logic over relations.

### Relational Calculus

A declarative query language equivalent in expressive power to relational algebra.

**Tuple relational calculus:**
```
{ t | P(t) }
```
"The set of all tuples t such that predicate P(t) holds."

**Domain relational calculus:**
```
{ <x1, x2, ..., xn> | P(x1, x2, ..., xn) }
```

**Codd's Theorem:** Relational algebra and safe relational calculus are equivalent in expressive power. SQL is based on tuple relational calculus.

---

## Normalization Theory

Normalization eliminates data redundancy and update anomalies through decomposition guided by functional dependencies.

### Functional Dependencies

A functional dependency X -> Y holds in relation R if for any two tuples t1, t2:
```
if t1[X] = t2[X] then t1[Y] = t2[Y]
```
"X functionally determines Y" -- knowing X uniquely determines Y.

**Armstrong's Axioms (sound and complete):**
1. **Reflexivity:** If Y subset of X, then X -> Y.
2. **Augmentation:** If X -> Y, then XZ -> YZ.
3. **Transitivity:** If X -> Y and Y -> Z, then X -> Z.

**Derived rules:**
- **Union:** If X -> Y and X -> Z, then X -> YZ.
- **Decomposition:** If X -> YZ, then X -> Y and X -> Z.
- **Pseudotransitivity:** If X -> Y and WY -> Z, then WX -> Z.

**Closure of attributes:** X+ = the set of all attributes functionally determined by X. Computed iteratively by applying FDs until no new attributes are added.

### Normal Forms

**First Normal Form (1NF):** All attributes contain only atomic (indivisible) values. No repeating groups or nested relations.

**Second Normal Form (2NF):** 1NF and every non-prime attribute is fully functionally dependent on every candidate key (no partial dependencies).

**Third Normal Form (3NF):** 2NF and no non-prime attribute transitively depends on any candidate key. Formally: for every FD X -> A where A is not in X, either X is a superkey or A is a prime attribute.

**Boyce-Codd Normal Form (BCNF):** For every non-trivial FD X -> Y, X is a superkey. Stronger than 3NF. Eliminates all redundancy due to functional dependencies.

**Difference between 3NF and BCNF:** 3NF allows FDs where the determinant is not a superkey IF the dependent is a prime attribute. BCNF does not allow this exception.

**3NF decomposition** is always dependency-preserving and lossless. **BCNF decomposition** is always lossless but may not preserve all dependencies.

**Fourth Normal Form (4NF):** BCNF and no multi-valued dependencies except those implied by superkeys. A multi-valued dependency X ->> Y holds when the set of Y values depends only on X, independent of other attributes.

**Fifth Normal Form (5NF / Project-Join Normal Form):** Every join dependency is implied by candidate keys. A relation is in 5NF if it cannot be losslessly decomposed further.

**Sixth Normal Form (6NF):** Every join dependency is trivial. Each relation contains at most one non-key attribute. Primarily relevant for temporal databases.

### Decomposition Properties

**Lossless-join decomposition:** Decomposition of R into R1 and R2 is lossless if R1 |><| R2 = R (no spurious tuples). Guaranteed when: R1 intersect R2 -> R1 or R1 intersect R2 -> R2.

**Dependency preservation:** Every original FD can be checked using attributes within a single decomposed relation (without joining).

---

## Transaction Theory

### ACID Properties

**Atomicity:** A transaction executes completely or not at all. Implemented via write-ahead logging (WAL): log all changes before applying them. On crash, undo incomplete transactions.

**Consistency:** A transaction takes the database from one valid state to another. Application-level invariants are maintained. (Note: this is different from CAP's consistency.)

**Isolation:** Concurrent transactions appear to execute serially. The gold standard is serializability: the outcome of concurrent execution is equivalent to some serial execution.

**Durability:** Once committed, changes survive any subsequent failure. Implemented via WAL (changes logged to durable storage before commit acknowledgment) and checkpointing.

### Transaction Isolation Levels

**Formal definitions based on phenomena:**

| Level | Dirty Read | Non-repeatable Read | Phantom Read | Serialization Anomaly |
|-------|-----------|--------------------|--------------|-----------------------|
| Read Uncommitted | Possible | Possible | Possible | Possible |
| Read Committed | Prevented | Possible | Possible | Possible |
| Repeatable Read | Prevented | Prevented | Possible | Possible |
| Serializable | Prevented | Prevented | Prevented | Prevented |

**Dirty read:** Transaction T1 reads data written by uncommitted T2.
**Non-repeatable read:** T1 reads a row, T2 modifies it and commits, T1 re-reads and gets a different value.
**Phantom read:** T1 reads rows matching a condition, T2 inserts/deletes rows matching the condition, T1 re-reads and gets different rows.

**Snapshot Isolation (SI):** Each transaction sees a consistent snapshot of the database as of its start time. Prevents dirty reads, non-repeatable reads, and phantom reads but allows write skew (two transactions reading overlapping data and making disjoint writes that together violate an invariant).

**Serializable Snapshot Isolation (SSI):** Detects and prevents serialization anomalies on top of snapshot isolation. Used by PostgreSQL (SERIALIZABLE level) and CockroachDB.

### Concurrency Control

**Two-Phase Locking (2PL):**
- Growing phase: acquire locks, never release.
- Shrinking phase: release locks, never acquire.
- Guarantees serializability.
- Strict 2PL: hold all locks until commit (prevents cascading aborts).

**Optimistic Concurrency Control (OCC):**
1. Read phase: execute transaction, buffer writes locally.
2. Validation phase: check for conflicts with concurrent transactions.
3. Write phase: if validation passes, apply writes.

**Multi-Version Concurrency Control (MVCC):**
- Maintain multiple versions of each data item.
- Readers never block writers; writers never block readers.
- Used by PostgreSQL, MySQL InnoDB, Oracle, CockroachDB.

---

## Query Optimization

### Cost Models

Query optimizers estimate the cost of different execution plans using:

**Selectivity estimation:**
```
selectivity(A = v) ~ 1 / |distinct(A)|
selectivity(A > v) ~ (max(A) - v) / (max(A) - min(A))
```

**Cardinality estimation:** Number of output rows = input rows * selectivity. Histograms, most-common-values lists, and HyperLogLog sketches improve estimates.

**Cost components:**
- I/O cost (dominant for disk-based systems): sequential vs random reads
- CPU cost: comparison operations, hash computations
- Memory cost: buffer pool usage, sort buffers
- Network cost (distributed databases): data transfer between nodes

### Join Algorithms

| Algorithm | Best For | Cost |
|-----------|----------|------|
| Nested Loop Join | Small tables, indexed inner | O(n * m) or O(n * log m) with index |
| Hash Join | Equi-joins, large tables | O(n + m) with O(min(n,m)) memory |
| Sort-Merge Join | Pre-sorted data, range joins | O(n log n + m log m) or O(n + m) if sorted |
| Index Nested Loop | One side indexed | O(n * log m) |

**Query plan optimization:**
- **Left-deep plans:** Allow pipelining (streaming results between operators).
- **Bushy plans:** More plans to consider but potentially better.
- **Dynamic programming** (System R approach): Enumerate optimal plans bottom-up for each subset of tables. O(2^n) for n tables -- practical up to ~15-20 tables.

### Index Theory

**B-tree indexes:**
- Balanced tree with high fan-out (typically 100-500 children per node).
- O(log_B N) lookups where B is the branching factor.
- Supports range queries, prefix queries, and ordering.
- Height for 1 billion rows with fan-out 500: log_500(10^9) ~ 3 levels.

**LSM-tree indexes (Log-Structured Merge Tree):**
- Optimized for write-heavy workloads.
- Writes go to in-memory buffer (memtable), flushed to sorted files (SSTables).
- Reads check memtable, then SSTables (bloom filters reduce unnecessary reads).
- Compaction merges SSTables to maintain read performance.
- Used by: LevelDB, RocksDB, Cassandra, ScyllaDB, InfluxDB.

**Write amplification:** LSM-trees trade read performance and space amplification for better write throughput. The write amplification factor is typically O(log(N/M) * T) where N is total data, M is memtable size, and T is the size ratio between levels.

**B-tree vs LSM-tree tradeoff:**
- B-trees: better read performance, worse write performance, stable latency.
- LSM-trees: better write performance, worse read performance (mitigated by bloom filters), compaction spikes.

### Bloom Filters

Probabilistic data structure for set membership testing.

**Properties:**
- No false negatives (if bloom filter says "no," the element is definitely absent).
- Controllable false positive rate: p ~ (1 - e^(-kn/m))^k where k = number of hash functions, m = filter size in bits, n = number of elements.
- Optimal k = (m/n) * ln(2).
- Space: ~10 bits per element for 1% false positive rate.

---

## Consensus in Distributed Databases

### Calvin (Thomson et al., 2012)

Deterministic database protocol:
1. Order all transactions globally before execution.
2. Each replica executes in the same deterministic order.
3. No coordination needed during execution (no 2PC for reads).

**Tradeoff:** Requires knowing read/write sets in advance. Not suitable for interactive transactions.

### Spanner (Google, 2012)

Globally distributed, strongly consistent database.

**Key innovation -- TrueTime:** GPS + atomic clock infrastructure providing bounded clock uncertainty.
```
TT.now() returns [earliest, latest]
```
**Commit wait:** After committing, wait until TrueTime guarantees the commit timestamp has passed on all nodes.

**Properties:** External consistency (linearizability for transactions). Lock-free read-only transactions at a snapshot.

### CockroachDB

Open-source Spanner-inspired distributed SQL database.

**Key mechanisms:**
- Hybrid Logical Clocks (HLC) instead of TrueTime.
- Serializable Snapshot Isolation (SSI).
- Raft consensus for replication within ranges.
- Range-based partitioning with automatic splitting.
- Closed timestamps for consistent reads.

---

## Practical Implications

1. **Normalize first, denormalize for performance.** Start with a properly normalized schema (at least 3NF/BCNF). Denormalize specific tables when you have measured performance needs and understand the anomaly tradeoffs.

2. **Understand your isolation level.** Most databases default to Read Committed (PostgreSQL) or Repeatable Read (MySQL InnoDB). Know what anomalies your application can tolerate. If in doubt, use Serializable.

3. **Indexes are not free.** Each index adds write overhead (maintaining the index on every insert/update/delete) and storage cost. Profile your query patterns and index accordingly.

4. **Query plans matter more than query syntax.** Two syntactically different SQL queries may produce the same plan. Use EXPLAIN ANALYZE to understand what the database actually does. Look for sequential scans on large tables, nested loop joins on large tables, and inaccurate row estimates.

5. **B-tree vs LSM-tree determines your database's personality.** PostgreSQL (B-tree) excels at mixed read/write workloads. Cassandra, ScyllaDB (LSM-tree) excel at write-heavy workloads. Choose accordingly.

6. **MVCC means dead tuples.** In PostgreSQL, updates create new row versions. Dead versions accumulate until VACUUM reclaims them. Monitor and tune autovacuum for write-heavy tables.

---

## Common Misconceptions

1. **"NoSQL means no schema."** All databases have schemas -- NoSQL databases just make the schema implicit (enforced in application code) rather than explicit. This shifts the burden, it does not eliminate it.

2. **"Higher normalization is always better."** Over-normalization creates excessive joins, harming read performance. The right normalization level depends on your access patterns. OLTP systems benefit from normalization; OLAP systems often benefit from denormalization (star/snowflake schemas).

3. **"ACID means the database prevents all anomalies."** ACID is only fully guaranteed at the Serializable isolation level. Lower isolation levels trade correctness for performance. Most applications run at Read Committed or Repeatable Read.

4. **"Adding an index will speed up my query."** Indexes speed up reads but slow down writes. The optimizer may not use your index (wrong selectivity, covering index needed, or the table is small enough that a sequential scan is faster). Always verify with EXPLAIN.

5. **"Distributed databases are just databases with more nodes."** Distribution introduces fundamental tradeoffs (CAP, consensus overhead, clock skew) that do not exist in single-node databases. The programming model changes: network partitions, partial failures, and consistency anomalies must be handled.

6. **"Foreign keys are optional."** Foreign keys enforce referential integrity at the database level. Without them, application bugs can create orphaned records and inconsistent data. The performance cost of foreign key checks is almost always worth the correctness guarantee.

---

## Further Reading

- **Garcia-Molina, H., Ullman, J., & Widom, J.** *Database Systems: The Complete Book* - Comprehensive textbook covering relational theory, SQL, transactions, and query processing.
- **Ramakrishnan, R. & Gehrke, J.** *Database Management Systems* - Excellent alternative textbook with strong coverage of storage and indexing.
- **Codd, E.F.** "A Relational Model of Data for Large Shared Data Banks" (1970) - The founding paper of relational databases.
- **Gray, J. & Reuter, A.** *Transaction Processing: Concepts and Techniques* - The definitive reference on transaction theory and implementation.
- **Kleppmann, M.** *Designing Data-Intensive Applications* - Outstanding practical guide bridging theory and modern database systems.
- **Bernstein, P. & Newcomer, E.** *Principles of Transaction Processing* - Deep treatment of transaction models and concurrency control.
- **O'Neil, P. et al.** "The Log-Structured Merge-Tree (LSM-Tree)" (1996) - Original LSM-tree paper.
- **Corbett, J. et al.** "Spanner: Google's Globally-Distributed Database" (2012) - The Spanner paper introducing TrueTime.
- **Date, C.J.** *An Introduction to Database Systems* - Classic textbook with deep coverage of relational theory and normalization.

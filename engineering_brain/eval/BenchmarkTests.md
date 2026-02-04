# Benchmark Tests — 20 PhD-Level CS Questions

These questions test whether the Engineering Brain can reason from theoretical foundations to practical engineering decisions. Each question requires knowledge from the theory directory and the ability to apply that knowledge to real scenarios. The expected answers reference specific theoretical results and their implications.

---

## Question 1: Complexity Classification

**Question:** A product manager asks you to build a feature that, given a set of delivery locations, finds the shortest route visiting all of them and returning to the warehouse. The dataset is 50 locations. Can you solve this exactly? What approach would you recommend?

**Expected Answer:** This is the Traveling Salesman Problem (TSP), which is NP-hard (NP-complete for the decision version). For 50 locations, exact algorithms (dynamic programming in O(n^2 * 2^n)) are infeasible (2^50 ~ 10^15). Recommend: (1) Use Christofides-Serdyukov algorithm for a 1.5-approximation in polynomial time if distances satisfy triangle inequality. (2) Use metaheuristics (simulated annealing, genetic algorithms, or LKH heuristic) for near-optimal solutions. (3) For real-time use, use Google OR-Tools or OSRM. Reference: `computational_theory.md` (NP-completeness, approximation), `algorithms_and_data_structures.md` (NP-hard approximation).

---

## Question 2: CAP Theorem Application

**Question:** You are designing a user session store for a global web application. Users may hit any region. The store must handle network partitions between regions. Should you choose a CP or AP system, and why?

**Expected Answer:** For session stores, AP is typically correct. During a partition, users should still be able to log in and use the application (availability). Serving a slightly stale session (e.g., missing the last item added to cart) is better than refusing to serve the user. Use eventual consistency with CRDTs or last-writer-wins for conflict resolution. Specific systems: DynamoDB (PA/EL) or Redis with cross-region replication. If the session contains financial data requiring strong consistency, consider CP (e.g., CockroachDB) and accept that users in the partitioned region may experience errors. Reference: `distributed_systems.md` (CAP, PACELC, CRDTs).

---

## Question 3: Normalization Decision

**Question:** You have an orders table with columns: order_id, customer_name, customer_email, customer_address, product_name, product_price, quantity. The same customer places multiple orders and orders the same products. What normal form is this table in, and how would you normalize it?

**Expected Answer:** The table is in 1NF (atomic values) but violates 2NF (customer_name, customer_email, customer_address depend on customer, not the full key). It also violates 3NF (transitive dependencies). Normalize to: (1) Customers(customer_id, name, email, address), (2) Products(product_id, name, price), (3) Orders(order_id, customer_id, order_date), (4) OrderItems(order_id, product_id, quantity). This achieves BCNF. The decomposition is lossless and dependency-preserving. Reference: `database_theory.md` (normalization theory, functional dependencies, Armstrong's axioms).

---

## Question 4: Halting Problem Implications

**Question:** A QA engineer proposes building a tool that automatically detects all infinite loops in the codebase. Is this possible? What can we realistically achieve?

**Expected Answer:** A universal infinite loop detector is impossible -- this is a direct consequence of the undecidability of the halting problem (Turing, 1936). By Rice's theorem, any non-trivial semantic property of programs is undecidable. However, we can: (1) Detect many common infinite loop patterns with static analysis (unbounded loops without break conditions, missing increment in for loops). (2) Use bounded model checking (CBMC) to check specific code paths up to a depth limit. (3) Use runtime watchdogs (timeouts). (4) Use property-based testing to find inputs that cause non-termination. The tool must be sound (may flag some false positives) but cannot be complete (will miss some real infinite loops). Reference: `computational_theory.md` (halting problem, Rice's theorem).

---

## Question 5: Consensus Protocol Selection

**Question:** You need to implement a replicated log for a critical financial service. You have 5 nodes. Up to 1 node may fail (crash, not Byzantine). Should you use Paxos, Raft, or PBFT? How many failures can you tolerate?

**Expected Answer:** With crash failures (not Byzantine), use Raft or Multi-Paxos. Both tolerate f crash failures with 2f+1 nodes. With 5 nodes, you can tolerate 2 crash failures (need majority of 3 to agree). Raft is recommended over Paxos for implementation clarity (the Ongaro/Ousterhout paper specifically designed Raft for understandability). PBFT is unnecessary -- it tolerates Byzantine failures at higher cost (needs 3f+1 = 4 nodes for 1 Byzantine failure, with O(n^2) message complexity). For financial services, Raft with strict durability guarantees (fsync before acknowledging) is appropriate. Reference: `distributed_systems.md` (Paxos, Raft, PBFT, Byzantine fault tolerance).

---

## Question 6: Information-Theoretic Limit

**Question:** Your team is designing a data pipeline that compresses log files before sending them to cold storage. The logs are 90% repetitive (same log format, varying timestamps and IDs). A developer claims they can achieve 100:1 compression. Is this plausible?

**Expected Answer:** Shannon's source coding theorem states that the compression limit is the entropy of the source. For highly repetitive logs (90% structure, 10% varying content), entropy per character is much lower than for random data. If the effective entropy is ~0.5 bits per original byte, the theoretical limit is ~16:1. With dictionary-based compression (LZ77/zstd), 10:1 to 30:1 is realistic for structured logs. 100:1 is possible only if the repetitive portion is extremely high (>99% identical) or if domain-specific compression is used (e.g., storing only deltas or using columnar format). The claim should be benchmarked, not assumed. Reference: `information_theory.md` (Shannon entropy, source coding theorem, LZ compression).

---

## Question 7: Type System Design

**Question:** You are designing a financial API where amounts must always be positive and currencies must always match when adding. How would you use the type system to enforce these invariants?

**Expected Answer:** Use refinement types or dependent types to make invalid states unrepresentable. (1) Define a `PositiveAmount` type that can only be constructed via a validated constructor: `newtype PositiveAmount = PositiveAmount { unAmount :: Decimal } -- constructor not exported; smart constructor validates > 0`. (2) Parameterize the Money type by currency: `data Money (c :: Currency) = Money PositiveAmount`. (3) The addition function's type enforces matching currencies: `add :: Money c -> Money c -> Money c`. Adding USD to EUR is a compile-time type error because `Money USD` and `Money EUR` are different types. In TypeScript, use branded types. In Rust, use phantom types (PhantomData). This is the Curry-Howard correspondence in practice: the type system enforces logical invariants. Reference: `type_theory_and_formal_methods.md` (refinement types, dependent types, Curry-Howard correspondence).

---

## Question 8: Queueing Theory Application

**Question:** Your API server handles 800 requests/second. Average processing time is 1ms. You have 1 worker thread. What is the average response time? What happens if traffic increases to 950 requests/second?

**Expected Answer:** Model as M/M/1 queue. mu = 1000 req/s (1ms per request). At lambda = 800: rho = 800/1000 = 0.8. Average time in system W = 1/(mu - lambda) = 1/(1000-800) = 5ms. Average queue length L = rho/(1-rho) = 0.8/0.2 = 4 requests. At lambda = 950: rho = 0.95. W = 1/(1000-950) = 20ms. L = 0.95/0.05 = 19 requests. Response time 4x'd with only 19% more traffic. At rho approaching 1.0, the system becomes unstable (queue grows without bound). Solution: add workers (M/M/c queue) or optimize processing time. By Little's Law, to handle 950 req/s at 5ms average, you need L = 950 * 0.005 = 4.75 concurrent handlers, so 5 workers. Reference: `systems_theory.md` (M/M/1 queue, Little's Law, Erlang formulas).

---

## Question 9: Gradient Descent Failure

**Question:** You are training a deep neural network and the training loss plateaus after a few epochs at a high value. The model is underfitting. What are the theoretical reasons this might happen, and what are your remedies?

**Expected Answer:** Possible theoretical causes: (1) Vanishing gradients: in deep networks, gradients can become exponentially small through backpropagation (chain rule multiplies many small numbers). Remedy: use residual connections (skip connections), batch normalization, or activation functions that do not saturate (ReLU, GELU instead of sigmoid). (2) Saddle points: in high-dimensional loss surfaces, most critical points are saddle points, not local minima. SGD with momentum helps escape saddle points. (3) Learning rate too low: gradient descent converges slowly. Use learning rate warmup followed by cosine annealing. (4) Model capacity too low: the model does not have enough parameters to represent the function. Increase model width or depth (Universal Approximation Theorem says a single hidden layer suffices in theory, but deeper networks are more parameter-efficient). (5) Poor initialization: use He initialization (for ReLU) or Xavier initialization (for tanh/sigmoid). Reference: `machine_learning_foundations.md` (gradient descent convergence, backpropagation, bias-variance tradeoff).

---

## Question 10: Cache Strategy Selection

**Question:** You have a caching layer in front of a database. Some keys are accessed millions of times per hour (hot keys), while most keys are accessed a few times per day. Occasionally, a previously cold key becomes suddenly hot (viral content). What replacement policy should you use, and why?

**Expected Answer:** LRU would evict cold-but-soon-to-be-hot keys. LFU would be slow to adapt to newly hot keys (frequency count takes time to build). ARC (Adaptive Replacement Cache) dynamically balances between recency and frequency by maintaining ghost lists that track recently evicted entries. When evicted recency entries are re-requested, ARC shifts toward LRU behavior; when evicted frequency entries are re-requested, it shifts toward LFU. W-TinyLFU (used in Caffeine) is another excellent option: it uses a frequency sketch (Count-Min Sketch with aging) for admission control and a segmented LRU for the main cache. For the viral content scenario specifically, W-TinyLFU excels because new hot items pass the frequency threshold quickly and are admitted. Reference: `systems_theory.md` (LRU, LFU, ARC, W-TinyLFU).

---

## Question 11: Distributed Transaction Design

**Question:** You have an e-commerce system with separate Order Service, Payment Service, and Inventory Service. A purchase must: create an order, charge the customer, and decrement inventory. If any step fails, the others must be reversed. Design the transaction strategy.

**Expected Answer:** Avoid distributed 2PC (blocking, single point of failure at coordinator). Use the Saga pattern with orchestration. Define: T1 = Create Order (C1 = Cancel Order), T2 = Reserve Inventory (C2 = Release Inventory), T3 = Charge Payment (C3 = Refund Payment). Orchestrator executes T1 -> T2 -> T3. If T3 fails, execute C2 then C1. Important: Sagas provide eventual consistency, not ACID isolation. Intermediate states are visible (order exists but payment not yet processed). Mitigate with: order status field (PENDING -> CONFIRMED -> FAILED), idempotency keys on all operations (for safe retry), and timeout-based recovery (if orchestrator crashes, a background job detects stale PENDING orders). Reference: `distributed_systems.md` (2PC, 3PC, Saga pattern), `database_theory.md` (ACID).

---

## Question 12: Parser Selection

**Question:** You need to build a parser for a configuration DSL with nested blocks, string interpolation, and comments. What parsing approach would you recommend and why?

**Expected Answer:** The language has nested blocks (context-free, needs a pushdown automaton) and string interpolation (context-sensitive). Recommend: (1) Lexer: use regular expressions for tokens (keywords, operators, string literals). Handle string interpolation in the lexer by switching modes (string mode vs expression mode). (2) Parser: use recursive descent (LL) for simplicity, or a parser combinator library (nom in Rust, Parsec in Haskell, megaparsec) for composability. LL(1) is likely sufficient if the grammar avoids ambiguity. (3) Avoid PEG for this use case if ordered choice could shadow valid alternatives in the block syntax. (4) For a production DSL, consider LALR with error recovery (tree-sitter uses GLR). (5) The Chomsky hierarchy tells us the lexer handles Type 3 (regular) and the parser handles Type 2 (context-free). String interpolation pushes into Type 1 but can be handled by the lexer-parser interface. Reference: `programming_language_theory.md` (Chomsky hierarchy, LL parsing, parser combinators).

---

## Question 13: Availability Modeling

**Question:** Your system has 3 microservices in series (all must work) with individual availability of 99.9%, and a database with 99.95% availability. What is the system availability? How do you improve it?

**Expected Answer:** Series system: R = 0.999 * 0.999 * 0.999 * 0.9995 = 0.9965 (99.65%). That is ~30.7 hours of downtime per year. To improve: (1) Add redundancy (parallel instances) for each service. Two instances in parallel: R_parallel = 1 - (1-0.999)^2 = 0.999999. (2) With each service at 0.999999 and DB at 0.9995: R = 0.999999^3 * 0.9995 = 0.9995 (99.95%), ~4.4 hours/year. (3) For the database (the bottleneck), add a replica: R_db = 1 - (1-0.9995)^2 = 0.99999975. (4) Final system: 0.999999^3 * 0.99999975 ~ 0.999997 (99.9997%), ~1.6 minutes/year. Error budget = 1 - SLO. If SLO is 99.95%, the error budget is 0.05% = 26 minutes/month. Reference: `software_engineering_theory.md` (reliability modeling, availability, error budgets).

---

## Question 14: VC Dimension and Model Selection

**Question:** You have a binary classification task with 100 training examples. A colleague proposes using a neural network with 10,000 parameters. Is this likely to generalize well? What theory guides your answer?

**Expected Answer:** The VC dimension of a neural network is approximately proportional to its parameter count (~10,000). The VC generalization bound suggests the gap between training and test error scales as sqrt(VC/n) ~ sqrt(10000/100) ~ 10, which is a vacuous (useless) bound. Classical theory says this model will overfit severely. However, the double descent phenomenon (Belkin et al., 2019) shows that overparameterized models can generalize well due to implicit regularization of SGD. In practice: (1) Use strong regularization (dropout 0.5, L2, early stopping). (2) Use data augmentation to effectively increase n. (3) PAC-Bayes bounds provide tighter analysis: the effective complexity is the distance from initialization, not raw parameter count. (4) For 100 samples, a simpler model (logistic regression, SVM, gradient-boosted trees) is likely a better starting point. Reference: `machine_learning_foundations.md` (VC dimension, PAC-Bayes, double descent, bias-variance tradeoff).

---

## Question 15: B-tree vs LSM-tree Selection

**Question:** You are building a time-series database that ingests 100,000 data points per second and serves dashboard queries that read the last hour of data. Should you use B-tree or LSM-tree based storage?

**Expected Answer:** LSM-tree. Reasoning: (1) Write pattern: 100K writes/sec is write-heavy. LSM-trees buffer writes in memory (memtable) and flush sequentially, converting random writes to sequential I/O. B-trees require random I/O for each write (in-place update). (2) Read pattern: dashboard queries over the last hour are range scans over recent data. In an LSM-tree, recent data is in the memtable or Level 0 (most recent SSTables), so reads are fast. (3) Write amplification tradeoff: LSM-trees have higher write amplification during compaction, but the total throughput is still higher than B-trees for write-heavy workloads. (4) Real systems: InfluxDB (TSM, derived from LSM), TimescaleDB (B-tree on PostgreSQL, but uses compression and chunk-based partitioning to mitigate write overhead), QuestDB (columnar with memory-mapped files). For pure write throughput with recent-range reads, LSM-tree wins. Reference: `database_theory.md` (B-tree vs LSM-tree, write amplification).

---

## Question 16: Formal Verification Application

**Question:** You are implementing a distributed lock service. How would you verify that the lock satisfies mutual exclusion (at most one holder at a time)?

**Expected Answer:** (1) Specify the protocol in TLA+. Define states (lock_holder, request_queue), actions (request, grant, release), and the safety property: MutualExclusion == [](cardinality(lock_holders) <= 1). (2) Use the TLC model checker to exhaustively explore all possible states and interleavings up to a bounded configuration (e.g., 3 clients, bounded queue). (3) If TLC finds a violation, it produces a counterexample trace. (4) For the implementation, use property-based testing to generate random sequences of lock/unlock operations across simulated clients and verify mutual exclusion holds. (5) Additionally, prove the liveness property (every request is eventually granted) under fairness assumptions: Liveness == [](requesting => <>granted). (6) This approach was used at Amazon for DynamoDB and S3 (Newcombe et al., 2015). Reference: `type_theory_and_formal_methods.md` (TLA+, model checking, Hoare logic).

---

## Question 17: TCP Congestion Control Diagnosis

**Question:** Your microservice-to-microservice calls within the same datacenter have 50ms P99 latency, but the network RTT is only 0.5ms. What could explain this, and what is the theoretical framework for diagnosing it?

**Expected Answer:** The 100x gap between network RTT and observed P99 suggests queueing delays. Diagnose using: (1) Queueing theory: if server utilization rho is high (>0.9), M/M/1 predicts W = 1/(mu - lambda), which can be orders of magnitude above service time. Check CPU utilization and request queue depths. (2) TCP congestion control: TCP slow start begins with a small congestion window. For short-lived connections (new TCP connection per request), each connection starts slow. Solution: use connection pooling or HTTP/2 multiplexing. (3) Head-of-line blocking: if using HTTP/1.1 pipelining over a single connection, one slow request blocks all subsequent requests. (4) GC pauses: if the service uses a garbage-collected language (JVM, Go), GC pauses can cause latency spikes at P99/P999. Check GC logs. (5) Bufferbloat: if switch buffers are deep, TCP Cubic may fill them before detecting congestion, adding latency. BBR would help as it models bandwidth and RTT directly. Use the USE method (Utilization, Saturation, Errors) for each resource in the path. Reference: `systems_theory.md` (TCP congestion control, queueing theory, Little's Law).

---

## Question 18: Zero-Knowledge Proof Application

**Question:** A client wants a system where users can prove they are over 18 without revealing their exact age or any other personal information. Is this possible, and what is the theoretical basis?

**Expected Answer:** Yes, this is a classic application of zero-knowledge proofs. The theoretical basis: a ZKP system has three properties: completeness (valid proofs succeed), soundness (invalid proofs fail), and zero-knowledge (the verifier learns nothing beyond the truth of the statement). Implementation approach: (1) The user has a signed credential from a trusted authority containing their birthdate. (2) Using a zk-SNARK or zk-STARK circuit, the user proves: "I possess a valid credential signed by authority X, and the birthdate in this credential is before [date 18 years ago]." (3) The verifier checks the proof (milliseconds) without learning the birthdate, name, or any other credential data. (4) Libraries: circom/snarkjs, Groth16 (trusted setup), PLONK (universal setup), STARKs (no trusted setup). The information-theoretic foundation: the proof reveals zero bits of information about the witness (birthdate) beyond what is implied by the statement being true. Reference: `information_theory.md` (zero-knowledge proofs, one-way functions).

---

## Question 19: Software Evolution Prediction

**Question:** Your 5-year-old monolithic application is showing signs of degradation: feature delivery is slowing, bugs are increasing, and new developers take 3 months to become productive. Leadership asks if a rewrite would fix these problems. What does software engineering theory tell us?

**Expected Answer:** Lehman's laws predict this trajectory: Law II (increasing complexity without active reduction) and Law VII (declining quality without adaptation to changing environment). However, the "Big Rewrite" is rarely the answer. Joel Spolsky argues it is the worst strategic mistake (discards institutional knowledge embedded in code). Brooks's "No Silver Bullet" applies: if the essential complexity of the domain has not decreased, a rewrite will eventually face the same problems. Recommended approach: (1) Apply the Strangler Fig pattern: incrementally replace components, routing new features to new services. (2) Invest in reducing accidental complexity (Kruchten's quadrant: address prudent/deliberate and inadvertent/prudent debt first). (3) Measure and track: use DORA metrics, cyclomatic complexity trends, and SQALE technical debt ratio. (4) Improve onboarding (Conway's Law: team structure may need to change to support the desired architecture). (5) Set a complexity budget: new code must not increase aggregate complexity. Reference: `software_engineering_theory.md` (Lehman's laws, Brooks's law, Conway's law, technical debt, No Silver Bullet).

---

## Question 20: Transformer Scaling Decision

**Question:** You need to deploy an LLM for a chatbot. The context window must handle 32K tokens. The current model uses standard self-attention. What is the computational bottleneck, and what are theoretically grounded solutions?

**Expected Answer:** Standard self-attention has O(n^2 * d) complexity where n = sequence length and d = model dimension. For n = 32K, the attention matrix is 32K x 32K = 1 billion entries per layer per head. Memory for attention scores alone: 1B * 2 bytes (fp16) = 2GB per layer. With 32 layers, this is 64GB just for attention. Solutions: (1) Flash Attention (Dao et al., 2022): exact attention with O(n) memory by computing attention in tiles, recomputing during backward pass instead of storing. 2-4x wall-clock speedup, no approximation. This is the standard now. (2) For even longer contexts: sliding window attention (Mistral) with O(n * w) where w is window size. Combine with global attention tokens for long-range dependencies. (3) Linear attention approximations (Performer, RWKV) achieve O(n * d^2) but sacrifice some quality. (4) KV-cache optimization: for autoregressive generation, cache key-value pairs from previous tokens. Quantize KV-cache (KV-cache quantization) to reduce memory. (5) Rotary Position Embedding (RoPE) with NTK-aware scaling or YaRN for extending context beyond training length. Reference: `machine_learning_foundations.md` (transformer computational complexity, attention mechanism).

---

## Scoring

| Score | Criteria |
|-------|----------|
| 5/5 | Correct answer citing relevant theoretical results with practical recommendations |
| 4/5 | Correct answer with theoretical basis but missing some nuance |
| 3/5 | Partially correct answer, cites some theory but with gaps |
| 2/5 | Vaguely correct direction but lacks theoretical grounding |
| 1/5 | Incorrect or no theoretical basis |

**Pass threshold:** Average score >= 4.0 across all 20 questions.

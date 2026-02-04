# Systems Theory

## What This Enables

Systems theory provides the formal foundations for understanding how operating systems, networks, and hardware interact to deliver performance and reliability. This knowledge enables engineers to diagnose performance problems from first principles, make informed capacity planning decisions, understand why systems behave counterintuitively under load, and design architectures that work with (rather than against) the underlying hardware and OS. Without this foundation, performance engineering degrades into cargo-cult tuning.

---

## Foundational Concepts

### Process Scheduling Theory

The CPU scheduler determines which process runs next. The choice of algorithm profoundly affects latency, throughput, and fairness.

**Scheduling metrics:**
- **Turnaround time:** Completion time - arrival time
- **Response time:** First run time - arrival time (critical for interactive systems)
- **Throughput:** Jobs completed per unit time
- **Fairness:** Equal (or weighted) share of CPU time
- **Starvation freedom:** Every runnable process eventually gets CPU time

**Classical algorithms:**

**FCFS (First Come First Served):** Non-preemptive. Simple but suffers from convoy effect: short jobs stuck behind long jobs.

**SJF (Shortest Job First) / SRTF (Shortest Remaining Time First):** Optimal for average turnaround time (provably). But requires knowing job duration in advance (generally impossible). SRTF is the preemptive version.

**Round Robin:** Each process gets a time quantum q. When quantum expires, process moves to back of queue. Response time = O(n * q). Tradeoff: small q => high context switch overhead; large q => degrades to FCFS.

**Multi-Level Feedback Queue (MLFQ):** Multiple priority queues. New processes start at highest priority. If a process uses its full quantum, it is demoted. I/O-bound processes stay at high priority; CPU-bound processes sink. Rules:
1. Higher priority processes run first.
2. Equal priority: round robin.
3. New processes enter at top priority.
4. If a process uses its quantum, it is demoted.
5. Periodically boost all processes to top priority (prevents starvation).

**Completely Fair Scheduler (CFS) -- Linux:**

CFS models an ideal multi-tasking CPU where each process gets 1/n of CPU time. It tracks **virtual runtime (vruntime)** -- the CPU time a process has received, weighted by its nice value (priority).

Implementation: Red-black tree keyed by vruntime. The process with the smallest vruntime runs next. When a process runs for time t at nice weight w:
```
vruntime += t * (default_weight / w)
```

**Key properties:**
- O(log n) pick-next and insertion (red-black tree).
- Weighted fair sharing: higher-weight processes accumulate vruntime slower.
- No fixed time quantum: scheduling period = max(sched_min_granularity, period / n_processes).
- Latency target: typically 6ms for interactive workloads.

**BFS (Brain Fuck Scheduler) -- Con Kolivas:**
Alternative to CFS designed for desktop responsiveness. Uses a single global run queue with virtual deadline. Simpler than CFS but does not scale to many CPUs due to global lock.

**EEVDF (Earliest Eligible Virtual Deadline First) -- Linux 6.6+:**
Replacement for CFS. Assigns virtual deadlines based on process weight. Selects the eligible process with the earliest virtual deadline. Provides better latency guarantees than CFS for latency-sensitive workloads.

### Memory Management

**Virtual Memory:**

Each process sees a contiguous virtual address space. The MMU (Memory Management Unit) translates virtual addresses to physical addresses using page tables.

**Page table structure:**
```
Virtual Address = [VPN (Virtual Page Number) | Offset]
Physical Address = [PFN (Physical Frame Number) | Offset]
```

**Multi-level page tables:** A flat page table for 48-bit addresses with 4KB pages would require 512 GB. Multi-level (hierarchical) page tables only allocate entries for mapped regions:
- x86-64 uses 4-level page tables (PGD -> PUD -> PMD -> PTE).
- Each level uses 9 bits of the virtual address.
- 5-level page tables (57-bit virtual addresses) added in recent CPUs.

**Translation Lookaside Buffer (TLB):**

Hardware cache for page table entries. TLB miss requires a page table walk (multiple memory accesses).

**TLB specifications (typical):**
- L1 DTLB: 64-128 entries, fully associative, ~1 cycle hit.
- L2 TLB: 1024-2048 entries, set-associative, ~7-10 cycles hit.
- TLB miss with page walk: 10-100+ cycles.

**Huge pages (2MB, 1GB):** Reduce TLB pressure by covering more memory per entry. 512x improvement in TLB coverage for 2MB pages. Critical for large-memory applications (databases, JVMs, scientific computing).

**Page replacement algorithms:**

**Optimal (Belady's):** Replace the page that will not be used for the longest time. Provably optimal but requires future knowledge (unrealizable). Used as benchmark.

**LRU (Least Recently Used):** Replace the page used least recently. Good approximation of optimal. True LRU is expensive (requires updating data structure on every access).

**Clock (Second-Chance):** Approximation of LRU. Pages arranged in circular buffer with reference bits. On eviction, scan for page with reference bit = 0; set reference bit to 0 as you pass pages.

**Linux page reclaim:** Uses two LRU lists (active and inactive) with aging. Pages start on inactive list, promoted to active on second access, demoted back when under memory pressure. kswapd daemon performs background reclamation; direct reclaim occurs under severe pressure.

**Working set model (Denning, 1968):** The working set W(t, tau) is the set of pages referenced in the time interval [t - tau, t]. A process should be allocated at least enough frames for its working set. Thrashing occurs when total working sets exceed physical memory.

### Demand Paging and Swapping

**Page fault handling:**
1. CPU generates page fault exception.
2. OS checks if access is valid (segfault if not).
3. If valid, find/allocate a physical frame.
4. Read page from disk/swap.
5. Update page table, TLB.
6. Restart faulting instruction.

**Major vs minor page faults:**
- Major: page must be read from disk (milliseconds).
- Minor: page is in memory but not mapped (shared library, copy-on-write). Microseconds.

---

## Network Theory

### TCP Congestion Control

TCP uses congestion control to avoid overwhelming the network. The congestion window (cwnd) limits the amount of unacknowledged data.

**Core principles:**
- **Additive Increase Multiplicative Decrease (AIMD):** Increase cwnd linearly; decrease multiplicatively on loss. Provably converges to fairness.
- **Slow start:** Begin with cwnd = 1 MSS, double each RTT until loss or ssthresh.

**TCP Reno:**
- Slow start: exponential growth until ssthresh.
- Congestion avoidance: linear growth (cwnd += 1 MSS per RTT).
- Fast retransmit: on 3 duplicate ACKs, retransmit without waiting for timeout.
- Fast recovery: set ssthresh = cwnd/2, cwnd = ssthresh + 3, continue with congestion avoidance.

**TCP Cubic (Linux default):**
- cwnd is a cubic function of time since last loss event:
```
W(t) = C * (t - K)^3 + W_max
```
where K = (W_max * beta / C)^(1/3), W_max is cwnd at last loss, beta = 0.7, C = 0.4.
- More aggressive growth far from W_max, gentler near it.
- Better than Reno for high-bandwidth, high-latency networks (long fat pipes).

**BBR (Bottleneck Bandwidth and Round-trip propagation time) -- Google:**
- Model-based rather than loss-based: estimates bottleneck bandwidth (BtlBw) and round-trip propagation time (RTprop).
- Pacing: sends data at the estimated bandwidth rate, not in bursts.
- Four phases: Startup (probe bandwidth), Drain (reduce queue), ProbeBW (steady state with periodic probing), ProbeRTT (measure minimum RTT).
- Significantly better than Cubic in networks with bufferbloat (deep buffers causing delay without loss).

### Routing Algorithms

**Distance Vector (Bellman-Ford distributed):**
- Each node maintains a vector of distances to all destinations.
- Periodically shares vector with neighbors.
- Update: d(x, y) = min over neighbors v of { c(x, v) + d(v, y) }
- Problem: count-to-infinity on link failure. Mitigated by split horizon, poison reverse.
- Used by: RIP (Routing Information Protocol).

**Link State (Dijkstra distributed):**
- Each node floods its link state (neighbors and costs) to all nodes.
- Each node independently computes shortest paths using Dijkstra's algorithm.
- Converges faster than distance vector.
- Used by: OSPF, IS-IS.

**BGP (Border Gateway Protocol):**
- Path vector protocol for inter-domain routing.
- Each AS announces paths to its prefixes.
- Routing decisions based on policy (business relationships), not just shortest path.
- The protocol that holds the Internet together.

---

## Queueing Theory

### M/M/1 Queue

The simplest queueing model: Markovian (Poisson) arrivals, Markovian (exponential) service, 1 server.

**Parameters:**
- lambda: arrival rate (requests/second)
- mu: service rate (requests/second)
- rho = lambda / mu: utilization (must be < 1 for stability)

**Key results:**
```
Average number in system:  L = rho / (1 - rho)
Average time in system:    W = 1 / (mu - lambda)
Average number in queue:   Lq = rho^2 / (1 - rho)
Average wait in queue:     Wq = rho / (mu - lambda)
```

**Critical insight:** As utilization approaches 1, latency approaches infinity. At 90% utilization, average queue length is 9. At 99%, it is 99. This explains why systems that are "only" 80-90% loaded exhibit terrible latency.

### Little's Law

**Theorem (Little, 1961):** For any stable queueing system:
```
L = lambda * W
```
- L: average number of items in the system
- lambda: average arrival rate
- W: average time an item spends in the system

This holds regardless of arrival distribution, service distribution, number of servers, or queueing discipline. It is one of the most powerful and general results in queueing theory.

**Application:** If your web server handles 100 req/s (lambda) and average response time is 200ms (W), then on average there are L = 100 * 0.2 = 20 concurrent requests in the system.

### Erlang Formulas

**Erlang B (loss system):** Probability that all servers are busy and an arriving call is lost:
```
B(N, A) = (A^N / N!) / sum_{k=0}^{N} (A^k / k!)
```
where A = lambda / mu (offered load in Erlangs), N = number of servers.

Used for: call center staffing, network circuit provisioning.

**Erlang C (queueing system):** Probability that an arriving call must wait:
```
C(N, A) = [B(N,A) * N / (N - A)] / [1 + B(N,A) * (N/(N-A) - 1)]
```

Used for: customer service staffing, server provisioning.

### M/M/c Queue

Multiple servers (c servers). Key metric:
```
rho = lambda / (c * mu)    (per-server utilization)
```

With multiple servers, the system can handle higher load at reasonable latency. But latency still goes to infinity as rho approaches 1.

### Queueing Networks

**Jackson's theorem:** For a network of M/M/1 queues with Poisson external arrivals and probabilistic routing, each queue behaves as an independent M/M/1 queue. This enables analyzing complex systems by analyzing each component independently.

---

## Cache Theory

### Cache Architecture

**Cache hierarchy (typical modern CPU):**
```
L1 cache:  32-48 KB, 4-5 cycles,  ~1 ns
L2 cache:  256 KB-1 MB, 12-15 cycles, ~3-5 ns
L3 cache:  8-64 MB, 30-50 cycles, ~10-15 ns
Main memory: GB-TB, 100-300 cycles, ~50-100 ns
SSD:       TB, ~50,000-100,000 ns
HDD:       TB, ~5,000,000-10,000,000 ns
```

**Cache parameters:**
- **Cache line size (B):** Typically 64 bytes. The unit of transfer between cache levels.
- **Associativity:** Direct-mapped (1-way), set-associative (N-way), fully associative.
- **Replacement policy:** LRU (approximated), random, FIFO.

### Replacement Policies

**LRU (Least Recently Used):** Evict the item accessed longest ago. Optimal for temporal locality. O(1) with doubly-linked list + hash map.

**LFU (Least Frequently Used):** Evict the least frequently accessed item. Better for frequency-based access patterns. Problem: old popular items never evicted (solved by aging/decay).

**ARC (Adaptive Replacement Cache, 2003):** Dynamically balances between LRU and LFU. Maintains four lists:
- T1: recently accessed once (recency)
- T2: recently accessed more than once (frequency)
- B1: ghost entries evicted from T1
- B2: ghost entries evicted from T2

The size of T1 vs T2 adapts based on which ghost list has more hits. Used in ZFS, IBM DS8000.

**W-TinyLFU (2017):** Used in Caffeine (Java caching library). Combines a small window cache (LRU) with a main cache (segmented LRU) and a frequency sketch (Count-Min Sketch) for admission control. Near-optimal hit ratios across diverse workloads.

### Cache-Oblivious Algorithms

Algorithms that perform well on any cache hierarchy without knowing cache parameters (cache size M, line size B).

**Ideal cache model:** Two-level memory with cache of M words and blocks of B words. Transfers are in blocks of B.

**Cache-oblivious matrix transpose:**
Recursive decomposition: divide matrix into quadrants, transpose each, recombine. Without knowing M or B, achieves O(N^2 / B) memory transfers (optimal).

**Cache-oblivious sorting:**
Funnel sort achieves O((N/B) * log_{M/B}(N/B)) memory transfers, matching the cache-aware optimal.

**van Emde Boas layout:** Store a binary tree in memory using a recursive van Emde Boas layout. Achieves O(log_B N) memory transfers for search (optimal), regardless of cache parameters.

**Practical implication:** Cache-oblivious algorithms are portable across different hardware without tuning. They are also automatically efficient across all levels of the cache hierarchy simultaneously.

### Cache Coherence Protocols

**MESI protocol:** Each cache line is in one state:
- **Modified:** Changed, only copy. Must write back before sharing.
- **Exclusive:** Unchanged, only copy. Can be modified without bus transaction.
- **Shared:** Unchanged, may exist in other caches. Must invalidate others before modifying.
- **Invalid:** Not valid.

**False sharing:** When two threads modify different variables that happen to be on the same cache line. Each modification invalidates the line in other caches, causing cache-to-cache transfers. Solution: pad data structures to cache line boundaries.

---

## Practical Implications

1. **Utilization is not a target; latency is.** Queueing theory shows that latency explodes near 100% utilization. Target 70-80% CPU utilization for latency-sensitive services. For batch workloads, higher utilization is acceptable.

2. **Little's Law is your capacity planning tool.** If you know your arrival rate and target latency, you can compute the required concurrency. If you know concurrency limits, you can compute sustainable arrival rate.

3. **The memory hierarchy dominates performance.** A cache miss to main memory costs 100x a cache hit. Design data structures for spatial locality (arrays over linked lists), temporal locality (hot data together), and minimal working set size.

4. **Huge pages for large heaps.** If your application uses > 1GB of memory with random access patterns (databases, JVMs), huge pages can improve performance 5-20% by reducing TLB misses.

5. **BBR for cloud networking.** If you control both endpoints (microservices), consider BBR over Cubic. BBR handles bufferbloat better and provides more consistent latency.

6. **False sharing is a silent killer.** When profiling shows unexpectedly poor multi-threaded scaling, check for false sharing. Use cache line padding (alignas(64) in C++, @Contended in Java).

---

## Common Misconceptions

1. **"Adding more CPUs linearly increases throughput."** Amdahl's Law: speedup = 1 / (s + (1-s)/p) where s is the serial fraction and p is the number of processors. Even 5% serial code limits speedup to 20x regardless of CPU count.

2. **"SSD is so fast that caching does not matter."** SSD random read is ~100 microseconds. L1 cache is ~1 nanosecond. That is still a 100,000x difference. The memory hierarchy matters for SSDs too.

3. **"TCP is reliable so I don't need to worry about networking."** TCP handles packet loss and reordering but does not handle application-level failures, connection resets under load, or head-of-line blocking. Understanding congestion control helps diagnose throughput problems.

4. **"CFS is fair."** CFS is fair in terms of CPU time allocation (weighted by nice values), but "fair" does not mean "low latency." Interactive processes sharing a machine with CPU-bound batch jobs may still experience scheduling delays.

5. **"Virtual memory means unlimited memory."** Virtual memory allows address spaces larger than physical memory, but when working sets exceed physical memory, thrashing occurs and performance degrades catastrophically (orders of magnitude).

6. **"LRU is the best cache replacement policy."** LRU is optimal only for temporal locality patterns. For scan workloads (sequential access through large datasets), LRU is catastrophically bad (every access is a miss). Policies like ARC and W-TinyLFU adapt to workload patterns.

---

## Further Reading

- **Tanenbaum, A.** *Modern Operating Systems* (4th ed.) - The standard OS textbook. Covers processes, memory, file systems, and security.
- **Arpaci-Dusseau, R. & Arpaci-Dusseau, A.** *Operating Systems: Three Easy Pieces* (OSTEP) - Freely available online. Excellent modern treatment of OS concepts.
- **Kurose, J. & Ross, K.** *Computer Networking: A Top-Down Approach* - Standard networking textbook covering TCP, routing, and application protocols.
- **Kleinrock, L.** *Queueing Systems, Vol 1: Theory* - Rigorous mathematical treatment of queueing theory.
- **Harchol-Balter, M.** *Performance Modeling and Design of Computer Systems: Queueing Theory in Action* - Excellent applied queueing theory for computer scientists.
- **Hennessy, J. & Patterson, D.** *Computer Architecture: A Quantitative Approach* - The definitive reference on hardware architecture, cache design, and memory systems.
- **Drepper, U.** "What Every Programmer Should Know About Memory" (2007) - Deep technical treatment of memory hierarchy, caches, TLB, and NUMA.
- **Cardwell, N. et al.** "BBR: Congestion-Based Congestion Control" (2017) - The BBR paper from Google.
- **Denning, P.** "The Working Set Model for Program Behavior" (1968) - Foundational paper on virtual memory and working sets.

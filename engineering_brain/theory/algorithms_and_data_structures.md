# Algorithms and Data Structures

## What This Enables

Mastery of algorithms and data structures is the bedrock of engineering competence. This knowledge enables engineers to select optimal data representations, analyze time and space costs rigorously, design efficient solutions to complex problems, and recognize when a problem admits a known algorithmic technique. Without this foundation, engineers are reduced to guessing and benchmarking rather than reasoning from principles.

---

## Foundational Concepts

### Asymptotic Analysis

Asymptotic notation describes the growth rate of functions as input size approaches infinity, abstracting away constant factors and lower-order terms.

**Big-O (upper bound):**
```
f(n) = O(g(n)) iff there exist positive constants c, n0 such that
  f(n) <= c * g(n) for all n >= n0
```

**Big-Omega (lower bound):**
```
f(n) = Omega(g(n)) iff there exist positive constants c, n0 such that
  f(n) >= c * g(n) for all n >= n0
```

**Big-Theta (tight bound):**
```
f(n) = Theta(g(n)) iff f(n) = O(g(n)) AND f(n) = Omega(g(n))
```

**Little-o (strict upper bound):**
```
f(n) = o(g(n)) iff lim(n->infinity) f(n)/g(n) = 0
```

**Common growth rates (slowest to fastest):**
```
O(1) < O(log n) < O(sqrt(n)) < O(n) < O(n log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)
```

### The Master Theorem

For recurrences of the form T(n) = a * T(n/b) + O(n^d) where a >= 1, b > 1:

**Case 1:** If d < log_b(a), then T(n) = O(n^(log_b(a)))
**Case 2:** If d = log_b(a), then T(n) = O(n^d * log n)
**Case 3:** If d > log_b(a), then T(n) = O(n^d)

**Applications:**
- Merge sort: T(n) = 2T(n/2) + O(n) => a=2, b=2, d=1 => Case 2 => O(n log n)
- Binary search: T(n) = T(n/2) + O(1) => a=1, b=2, d=0 => Case 2 => O(log n)
- Strassen's matrix multiplication: T(n) = 7T(n/2) + O(n^2) => Case 1 => O(n^(log_2 7)) ~ O(n^2.807)

### Amortized Analysis

Amortized analysis provides the average cost of operations over a worst-case sequence, not over a probability distribution.

**Aggregate method:** Total cost of n operations divided by n.

**Accounting method:** Assign amortized costs to operations such that for any sequence of operations, the sum of amortized costs >= sum of actual costs.

**Potential method:** Define a potential function Phi mapping states to real numbers:
```
amortized_cost(op_i) = actual_cost(op_i) + Phi(S_i) - Phi(S_{i-1})
```

**Classic example:** Dynamic array (ArrayList/vector) doubling.
- Most insertions cost O(1)
- Occasional resize costs O(n)
- Amortized cost per insertion: O(1) (by potential method with Phi = 2*size - capacity)

---

## Fundamental Data Structures

### Hash Tables

**Theory:** A hash table maps keys to values using a hash function h: U -> {0, 1, ..., m-1}.

**Collision resolution:**
- **Chaining:** Each bucket contains a linked list. Expected O(1) for load factor alpha = n/m.
- **Open addressing:** Linear probing, quadratic probing, double hashing. Requires alpha < 1.
- **Cuckoo hashing:** Two hash functions, O(1) worst-case lookup, amortized O(1) insertion.
- **Robin Hood hashing:** Variant of linear probing that minimizes variance in probe lengths.

**Universal hashing:** A family H of hash functions is universal if for any x != y:
```
Pr[h(x) = h(y)] <= 1/m for h chosen uniformly from H
```

**Perfect hashing:** O(1) worst-case lookup using O(n) space, constructed in expected O(n) time (FKS scheme).

### Trees

**Binary Search Trees (BST):** O(h) operations where h is height. Unbalanced BSTs degenerate to O(n).

**Self-balancing BSTs:**
- **AVL trees:** Strict balance (heights differ by at most 1). O(log n) for all operations. Up to 2 rotations per insertion.
- **Red-black trees:** Relaxed balance (black-height property). O(log n) with at most 3 rotations per insertion. Used in most standard library implementations (C++ std::map, Java TreeMap).
- **B-trees:** Generalized balanced trees with high branching factor. Optimal for disk-based storage. Each node contains O(B) keys where B is the block size. Height O(log_B n).
- **B+ trees:** Variant where all data is in leaves, connected by linked list. Standard index structure in databases.

**Tries:** Tree structure for string keys. O(k) lookup for key of length k, independent of number of keys. Compressed variants (Patricia/radix tries) reduce space.

### Heaps

**Binary heap:** Complete binary tree satisfying heap property. O(log n) insert and extract-min/max. O(n) build-heap (not O(n log n) -- by analysis of summing heights).

**Fibonacci heap:** Amortized O(1) for insert, decrease-key, and merge. O(log n) amortized extract-min. Crucial for optimal Dijkstra's algorithm. Rarely used in practice due to high constants.

**Binomial heap:** O(log n) for all operations. Merge in O(log n). Building block for Fibonacci heaps.

### Graphs

**Representations:**
- **Adjacency matrix:** O(V^2) space. O(1) edge lookup. Best for dense graphs.
- **Adjacency list:** O(V + E) space. O(degree) edge lookup. Best for sparse graphs.

---

## Sorting Algorithm Analysis

| Algorithm | Best | Average | Worst | Space | Stable | Notes |
|-----------|------|---------|-------|-------|--------|-------|
| Insertion sort | O(n) | O(n^2) | O(n^2) | O(1) | Yes | Best for small/nearly-sorted |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Guaranteed O(n log n) |
| Quicksort | O(n log n) | O(n log n) | O(n^2) | O(log n) | No | Fastest in practice (cache-friendly) |
| Heapsort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | In-place, guaranteed O(n log n) |
| Timsort | O(n) | O(n log n) | O(n log n) | O(n) | Yes | Hybrid; default in Python, Java |
| Radix sort | O(nk) | O(nk) | O(nk) | O(n+k) | Yes | Non-comparison; k = key length |
| Counting sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes | Non-comparison; k = range |

**Lower bound theorem:** Any comparison-based sorting algorithm requires Omega(n log n) comparisons in the worst case. Proof by decision tree argument: n! leaves require tree height >= log(n!) = Omega(n log n) by Stirling's approximation.

---

## Graph Algorithms

### Shortest Path Algorithms

**Dijkstra's algorithm:**
- Single-source shortest paths with non-negative weights
- Time: O((V + E) log V) with binary heap, O(V^2) with array, O(E + V log V) with Fibonacci heap
- Greedy approach: always process the closest unvisited vertex

**Bellman-Ford algorithm:**
- Single-source shortest paths, handles negative weights
- Detects negative cycles
- Time: O(VE)
- Relax all edges V-1 times; if any edge can still be relaxed, negative cycle exists

**Floyd-Warshall algorithm:**
- All-pairs shortest paths
- Time: O(V^3), Space: O(V^2)
- Dynamic programming: for each intermediate vertex k, update d[i][j] = min(d[i][j], d[i][k] + d[k][j])

**Johnson's algorithm:**
- All-pairs shortest paths for sparse graphs
- Reweights edges using Bellman-Ford to eliminate negative weights, then runs Dijkstra from each vertex
- Time: O(V^2 log V + VE)

### Minimum Spanning Tree

**Kruskal's algorithm:** Sort edges by weight, add each edge if it does not create a cycle (union-find). Time: O(E log E).

**Prim's algorithm:** Grow tree from arbitrary vertex, always add cheapest crossing edge. Time: O(E + V log V) with Fibonacci heap.

**Cut property:** The lightest edge crossing any cut belongs to some MST. This justifies both algorithms.

### Network Flow

**Max-flow min-cut theorem (Ford-Fulkerson):** The maximum flow in a network equals the minimum cut capacity.

**Algorithms:**
- Ford-Fulkerson: O(E * max_flow) with DFS
- Edmonds-Karp: O(VE^2) with BFS
- Push-relabel: O(V^2 * E), often faster in practice
- Dinic's algorithm: O(V^2 * E), O(E * sqrt(V)) for unit-capacity networks

---

## Dynamic Programming

### Framework

1. **Optimal substructure:** Optimal solution contains optimal solutions to subproblems
2. **Overlapping subproblems:** Same subproblems solved repeatedly
3. **State definition:** Define what constitutes a subproblem
4. **Transition:** Define how to combine subproblems
5. **Base cases:** Define trivial solutions

### Classical DP Problems

**Longest Common Subsequence (LCS):**
```
LCS[i][j] = LCS[i-1][j-1] + 1                    if X[i] = Y[j]
LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1])        otherwise
```
Time: O(mn), Space: O(mn) reducible to O(min(m,n))

**Edit Distance (Levenshtein):**
```
D[i][j] = D[i-1][j-1]                             if X[i] = Y[j]
D[i][j] = 1 + min(D[i-1][j], D[i][j-1], D[i-1][j-1])  otherwise
```

**Knapsack (0/1):**
```
K[i][w] = max(K[i-1][w], K[i-1][w - w_i] + v_i)  if w_i <= w
K[i][w] = K[i-1][w]                                otherwise
```
Time: O(nW) -- pseudo-polynomial (W is not polynomial in input size)

### DP Optimization Techniques

- **Space optimization:** Many 2D DP tables only depend on the previous row; reduce to O(n).
- **Divide and conquer optimization:** When the optimal split point is monotonic, reduce O(kn^2) to O(kn log n).
- **Knuth's optimization:** For certain recurrences, reduce O(n^3) to O(n^2).
- **Convex hull trick:** Optimize DP transitions that can be expressed as linear functions.

---

## Greedy Algorithms

A greedy algorithm makes the locally optimal choice at each step. Correctness typically requires proving the **greedy choice property** (a globally optimal solution can be constructed from greedy choices) and **optimal substructure**.

**Proof techniques:**
- **Exchange argument:** Show that swapping any non-greedy choice with a greedy choice does not worsen the solution.
- **Greedy stays ahead:** Show that at each step, the greedy solution is at least as good as any other.

**Classic greedy algorithms:** Huffman coding, activity selection, fractional knapsack, Kruskal's MST, Prim's MST, Dijkstra's shortest path.

---

## NP-Hard Approximation

When exact solutions are infeasible, approximation algorithms provide guarantees:

**Approximation ratio:** An algorithm has ratio rho(n) if for all inputs of size n:
```
max(C/C*, C*/C) <= rho(n)
```
where C is the algorithm's cost and C* is optimal.

| Problem | Best Known Approximation | Inapproximability (unless P=NP) |
|---------|--------------------------|----------------------------------|
| Vertex Cover | 2-approximation | < 1.3606 (UGC: < 2-epsilon) |
| Metric TSP | 1.5 (Christofides-Serdyukov) | < 123/122 |
| Set Cover | O(ln n) | < (1-epsilon) ln n |
| MAX-3SAT | 7/8 | < 7/8 + epsilon |
| Knapsack | FPTAS: (1+epsilon) for any epsilon | (has FPTAS, so fully tractable) |

**PTAS (Polynomial-Time Approximation Scheme):** For any epsilon > 0, achieves (1+epsilon)-approximation in polynomial time (but polynomial may depend on 1/epsilon).

**FPTAS (Fully Polynomial-Time Approximation Scheme):** Time polynomial in both n and 1/epsilon.

---

## Practical Implications

1. **Choose the right data structure first.** The choice between hash table (O(1) average) and balanced BST (O(log n) guaranteed, ordered) shapes your entire system's performance profile.

2. **Amortized analysis explains real performance.** Dynamic arrays, hash table resizing, and splay trees all have individual expensive operations but excellent amortized behavior.

3. **Know when to use DP vs greedy vs divide-and-conquer.** DP when subproblems overlap and you need optimality. Greedy when local choices lead to global optimality. Divide-and-conquer when subproblems are independent.

4. **Graph modeling is universal.** Many problems that do not look like graph problems can be modeled as shortest path, flow, or matching problems.

5. **Constant factors matter in practice.** Quicksort beats merge sort despite identical O(n log n) due to cache locality. Array-based heaps beat pointer-based trees.

---

## Common Misconceptions

1. **"Hash tables are always O(1)."** Average-case O(1) with a good hash function. Worst case is O(n) without universal hashing or perfect hashing. Also, hash tables do not maintain order.

2. **"Quicksort's O(n^2) worst case makes it bad."** With randomized pivot selection, the probability of worst case is negligible. Median-of-three and introsort (switching to heapsort at depth limit) eliminate the practical risk.

3. **"Dynamic programming is just memoization."** Memoization is top-down DP. Bottom-up DP (tabulation) avoids recursion overhead and can enable space optimizations impossible with memoization.

4. **"Greedy is just heuristic."** When proven correct (via exchange argument or matroid theory), greedy algorithms provide optimal solutions, not approximations.

5. **"O(n log n) sorting is always best."** For specific data (small integers, short strings), radix sort achieves O(n) and should be preferred. For nearly-sorted data, insertion sort or Timsort's natural merge runs are faster.

---

## Further Reading

- **Cormen, T., Leiserson, C., Rivest, R., & Stein, C.** *Introduction to Algorithms* (CLRS, 4th ed.) - The standard comprehensive reference. Covers all topics above with rigorous proofs.
- **Sedgewick, R. & Wayne, K.** *Algorithms* (4th ed.) - Excellent practical treatment with Java implementations. Pairs theory with engineering.
- **Kleinberg, J. & Tardos, E.** *Algorithm Design* - Best book for developing algorithm design intuition; strong on DP, greedy, and network flow.
- **Skiena, S.** *The Algorithm Design Manual* - Practical algorithm selection guide with "war stories" from real applications.
- **Knuth, D.** *The Art of Computer Programming* - The magnum opus. Volumes 1-4A cover fundamental algorithms, sorting/searching, and combinatorial algorithms with encyclopedic depth.
- **Williamson, D. & Shmoys, D.** *The Design of Approximation Algorithms* - Definitive reference on approximation algorithms.
- **Tarjan, R.** *Data Structures and Network Algorithms* - Advanced treatment of amortized analysis and network algorithms.

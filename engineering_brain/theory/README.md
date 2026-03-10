# Theory — PhD-Level Computer Science Foundations

This directory contains formal computer science theory that underpins the Engineering Brain's practical knowledge. Each file provides rigorous mathematical foundations, key theorems with formal statements, and explicit connections to practical engineering.

---

## Index

| File | Topic | Description |
|------|-------|-------------|
| `computational_theory.md` | Computability & Complexity | Turing machines, Church-Turing thesis, halting problem, P vs NP, NP-completeness, Cook-Levin theorem, complexity class hierarchy |
| `algorithms_and_data_structures.md` | Algorithms & Data Structures | Asymptotic analysis, master theorem, amortized analysis, fundamental data structures, sorting, graph algorithms, DP, greedy, approximation |
| `distributed_systems.md` | Distributed Systems | CAP theorem, PACELC, Paxos, Raft, PBFT, 2PC/3PC/Saga, vector clocks, CRDTs, consistency models, FLP impossibility |
| `type_theory_and_formal_methods.md` | Types & Verification | Lambda calculus, Curry-Howard, Hindley-Milner, dependent types, linear types, Hoare logic, TLA+, model checking, property-based testing |
| `information_theory.md` | Information Theory | Shannon entropy, channel capacity, error-correcting codes, compression theory, Kolmogorov complexity, cryptographic foundations, zero-knowledge proofs |
| `database_theory.md` | Database Theory | Relational algebra/calculus, normalization (1NF-6NF), ACID formalism, transaction isolation, query optimization, B-tree/LSM-tree theory, distributed DB consensus |
| `programming_language_theory.md` | Language Theory | Chomsky hierarchy, parsing theory (LL/LR/PEG), operational/denotational semantics, compiler optimization, garbage collection algorithms |
| `systems_theory.md` | Systems Theory | OS scheduling (CFS, EEVDF), virtual memory, TCP congestion control (Reno, Cubic, BBR), queueing theory, cache theory, cache-oblivious algorithms |
| `software_engineering_theory.md` | Software Engineering | Lehman's laws, Brooks's law, Conway's law, complexity metrics, technical debt theory, code review research, reliability engineering |
| `machine_learning_foundations.md` | ML Foundations | PAC learning, VC dimension, bias-variance, gradient descent convergence, backpropagation, regularization, kernel methods, transformer mathematics |

---

## Prerequisite Relationships

The theory files build on each other. The following graph shows dependencies (read: "A -> B" means "understanding A helps with B"):

```
computational_theory
  |
  +---> algorithms_and_data_structures
  |       |
  |       +---> database_theory (query optimization, index theory)
  |       |
  |       +---> systems_theory (scheduling, caching, queueing)
  |       |
  |       +---> machine_learning_foundations (optimization, complexity)
  |
  +---> programming_language_theory (automata, formal languages)
  |       |
  |       +---> type_theory_and_formal_methods (lambda calculus, type systems)
  |
  +---> information_theory (entropy, coding theory)
          |
          +---> machine_learning_foundations (information-theoretic bounds)
          |
          +---> distributed_systems (error correction, consistency)

software_engineering_theory <--- (informed by all others, but no formal prerequisites)
```

### Suggested Reading Order

**Path 1 — Theoretical CS Core:**
1. `computational_theory.md` (start here for foundations)
2. `algorithms_and_data_structures.md`
3. `programming_language_theory.md`
4. `type_theory_and_formal_methods.md`

**Path 2 — Systems & Infrastructure:**
1. `computational_theory.md` (for complexity awareness)
2. `algorithms_and_data_structures.md` (for data structure selection)
3. `systems_theory.md`
4. `distributed_systems.md`
5. `database_theory.md`

**Path 3 — AI/ML Engineering:**
1. `algorithms_and_data_structures.md` (for optimization fundamentals)
2. `information_theory.md`
3. `machine_learning_foundations.md`

**Path 4 — Software Leadership:**
1. `software_engineering_theory.md` (start here for management insights)
2. `distributed_systems.md` (architecture decisions)
3. `database_theory.md` (data layer decisions)

---

## File Format

Each theory file follows a consistent structure:

1. **What This Enables** — Why an engineer should care about this theory
2. **Foundational Concepts** — Core definitions and models with mathematical rigor
3. **Key Theorems and Results** — Formal statements of important results
4. **Practical Implications** — Explicit connections to engineering practice
5. **Common Misconceptions** — Corrections for widely-held incorrect beliefs
6. **Further Reading** — Canonical textbooks and seminal papers

---

## Relationship to Existing Brain Files

The theory directory complements the existing Engineering Brain structure:

| Existing Directory | Theory Complement |
|-------------------|-------------------|
| `Patterns/` | `algorithms_and_data_structures.md` provides formal analysis of pattern performance |
| `Solutions/` | `computational_theory.md` explains why some problems resist solution |
| `Automations/` | `systems_theory.md` and `distributed_systems.md` provide foundations for automation design |
| `Verification/` | `type_theory_and_formal_methods.md` provides formal verification theory |
| `Security.md` | `information_theory.md` provides cryptographic foundations |
| `Performance.md` | `systems_theory.md` provides queueing theory and cache theory |
| `Score.md` | `software_engineering_theory.md` provides metrics theory |

---

## Usage Guidelines

- These files are reference material, not procedures. Consult them when making architectural decisions, diagnosing performance issues, or evaluating technology choices.
- Mathematical notation is kept as simple as possible while maintaining rigor. Formal definitions use standard CS notation.
- Each file is self-contained but references related files where appropriate.
- The "Further Reading" sections point to canonical references for deeper study.

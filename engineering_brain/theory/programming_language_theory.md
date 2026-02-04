# Programming Language Theory

## What This Enables

Programming language theory provides the formal foundations for understanding how languages are defined, parsed, compiled, and executed. This knowledge enables engineers to design DSLs, understand compiler error messages at a deep level, choose the right language for a task based on its semantic model, write more effective parsers and interpreters, and understand why certain language features interact the way they do. It demystifies the "magic" of compilers and runtime systems.

---

## Foundational Concepts

### The Chomsky Hierarchy (1956)

A hierarchy of formal grammars classified by their generative power:

| Type | Grammar | Automaton | Example |
|------|---------|-----------|---------|
| Type 3 | Regular | Finite automaton | Identifiers, numbers, keywords |
| Type 2 | Context-free | Pushdown automaton | Balanced parentheses, arithmetic expressions |
| Type 1 | Context-sensitive | Linear-bounded automaton | `a^n b^n c^n`, some type checking |
| Type 0 | Unrestricted | Turing machine | Any computable language |

Each level strictly contains the one below: Regular subset Context-Free subset Context-Sensitive subset Recursively Enumerable.

**Practical relevance:** Lexical analysis uses Type 3 (regular) grammars. Syntactic analysis uses Type 2 (context-free) grammars. Semantic analysis (type checking) often requires Type 1 or beyond.

### Regular Languages and Finite Automata

**Regular expressions** (formal, not PCRE) describe regular languages using:
- Empty string (epsilon)
- Single character (a)
- Concatenation (ab)
- Union (a | b)
- Kleene star (a*)

**Equivalences (Kleene's theorem):** Regular expressions, deterministic finite automata (DFA), and nondeterministic finite automata (NFA) all describe exactly the class of regular languages.

**DFA construction:** NFA to DFA via subset construction (powerset construction). Worst case: 2^n states from n-state NFA, but practical cases are much smaller.

**DFA minimization:** The Myhill-Nerode theorem states that the minimum DFA for a regular language is unique (up to isomorphism). Hopcroft's algorithm minimizes a DFA in O(n log n) time.

**Pumping lemma for regular languages:** For any regular language L, there exists p (pumping length) such that any string s in L with |s| >= p can be divided into s = xyz where:
1. |y| > 0
2. |xy| <= p
3. xy^i z in L for all i >= 0

Used to prove languages are NOT regular (e.g., `a^n b^n` is not regular).

### Context-Free Grammars (CFG)

A CFG G = (V, T, P, S) where:
- V: set of variables (non-terminals)
- T: set of terminals
- P: set of production rules (V -> (V union T)*)
- S: start symbol (in V)

**Derivation types:**
- **Leftmost derivation:** Always expand the leftmost non-terminal.
- **Rightmost derivation:** Always expand the rightmost non-terminal.

**Ambiguity:** A grammar is ambiguous if some string has multiple parse trees (leftmost derivations). Ambiguity is undecidable for CFGs in general but can often be resolved by rewriting the grammar (operator precedence, associativity).

**Pushdown automata:** Equivalent to CFGs. A finite automaton augmented with a stack.

**Pumping lemma for CFLs:** Similar to regular pumping lemma but decomposes the string into five parts (uvwxy) with two "pumpable" sections.

**Closure properties:** CFLs are closed under union, concatenation, and Kleene star, but NOT under intersection or complement (unlike regular languages).

---

## Parsing Theory

### Top-Down Parsing

**Recursive descent:** Each non-terminal becomes a function. Simple to implement but requires grammar without left recursion.

**LL(k) parsing:** Left-to-right scan, Leftmost derivation, k tokens of lookahead.

**LL(1) conditions:**
- No left recursion (eliminate by rewriting: A -> A alpha | beta becomes A -> beta A', A' -> alpha A' | epsilon)
- No common prefixes (resolve by left factoring)
- FIRST sets of alternatives are disjoint
- If epsilon is in FIRST, then FIRST and FOLLOW are disjoint

**LL(1) parse table construction:**
1. Compute FIRST(alpha) for each production A -> alpha.
2. Compute FOLLOW(A) for each non-terminal A.
3. For each production A -> alpha: for each terminal a in FIRST(alpha), add A -> alpha to table[A, a]. If epsilon in FIRST(alpha), add to table[A, b] for each b in FOLLOW(A).

### Bottom-Up Parsing

**LR(k) parsing:** Left-to-right scan, Rightmost derivation (in reverse), k tokens of lookahead. Strictly more powerful than LL(k).

**LR(0) items:** A production with a dot indicating the parsing position.
```
E -> E . + T    (we have seen E, expecting +)
E -> E + . T    (we have seen E +, expecting T)
```

**SLR(1):** Simple LR. Uses FOLLOW sets to resolve conflicts. Handles most programming language grammars.

**LALR(1):** Look-Ahead LR. Merges LR(1) states with identical cores. Same number of states as SLR(1) but handles more grammars. This is what yacc/bison generate.

**Canonical LR(1):** Full LR(1) construction. Most powerful deterministic bottom-up parsing but generates large tables. Rarely used directly.

**Parsing power hierarchy:**
```
LL(1) subset SLR(1) subset LALR(1) subset LR(1) subset unambiguous CFG subset CFG
```

### Parsing Expression Grammars (PEG)

**PEG (Ford, 2004):** Alternative to CFGs for defining syntax.

Key difference: the choice operator `/` is ordered (prioritized), not unordered like `|` in CFGs. The first matching alternative wins.

**Advantages:**
- No ambiguity (by definition -- ordered choice resolves it).
- Can express some non-context-free patterns (e.g., `a^n b^n c^n`).
- Natural correspondence to recursive descent parsers.

**Packrat parsing:** Memoized recursive descent for PEGs. Guarantees linear-time parsing at the cost of O(n) memory.

**Disadvantages:**
- Ordered choice can cause subtle bugs (an earlier alternative may accidentally "shadow" a later one).
- Left recursion requires special handling.
- The language defined by a PEG may be counterintuitive due to prioritized choice.

### Parser Combinators

Functional approach to building parsers by combining small parsers into larger ones:

```
-- Basic combinators:
char : Char -> Parser Char
many : Parser a -> Parser [a]
alt  : Parser a -> Parser a -> Parser a
seq  : Parser a -> Parser b -> Parser (a, b)
map  : (a -> b) -> Parser a -> Parser b
```

**Libraries:** Parsec (Haskell), nom (Rust), pyparsing (Python), megaparsec (Haskell).

**Advantages:** Composable, readable, embedded in the host language. No separate grammar file or code generation step.

---

## Semantics

### Operational Semantics

Defines meaning by describing how programs execute on an abstract machine.

**Small-step (structural) operational semantics:** Defines individual computation steps.
```
    e1 --> e1'
─────────────────── (E-App1)
  e1 e2 --> e1' e2

    e2 --> e2'
─────────────────── (E-App2)
  v1 e2 --> v1 e2'

─────────────────────────────────── (E-AppAbs)
  (lambda x. e) v --> e[x := v]
```

**Big-step (natural) semantics:** Defines the final result of evaluation.
```
  e1 => (lambda x. e)    e2 => v2    e[x := v2] => v
───────────────────────────────────────────────────────── (E-App)
  e1 e2 => v
```

**Comparison:**
- Small-step: better for reasoning about non-termination, intermediate states, and concurrency.
- Big-step: simpler for implementations and proofs of total correctness.

### Denotational Semantics

Maps programs to mathematical objects (their "denotations"), typically functions or elements of domains.

**Example:** The denotation of a numeral is a number. The denotation of a function definition is a mathematical function.

```
[[n]] = n                          (numeral denotes number)
[[e1 + e2]] = [[e1]] + [[e2]]     (addition denotes addition)
[[lambda x. e]] = f where f(v) = [[e]][x -> v]
```

**Scott domains and fixed points:** For recursive definitions, denotational semantics uses Scott's domain theory and the fixed-point theorem: every continuous function on a complete partial order has a least fixed point.

**Practical use:** Denotational semantics justifies compiler optimizations. If two programs have the same denotation, they can be interchanged (referential transparency in pure functional languages).

### Axiomatic Semantics

Defines meaning by specifying what can be proven about programs. Hoare logic (covered in type_theory_and_formal_methods.md) is the primary example.

---

## Compiler Optimization Theory

### Intermediate Representations

**SSA (Static Single Assignment):** Each variable is assigned exactly once. Phi functions at control flow merge points select the appropriate value. SSA simplifies many optimizations:
```
-- Before SSA:         After SSA:
x = 1                  x1 = 1
x = x + 1             x2 = x1 + 1
y = x                  y1 = x2
```

**SSA enables:** Constant propagation, dead code elimination, common subexpression elimination, loop-invariant code motion, strength reduction.

### Key Optimizations

**Constant folding/propagation:** Evaluate constant expressions at compile time. Propagate known constants through the program.

**Dead code elimination:** Remove code whose results are never used. In SSA form, a variable with no uses is dead.

**Common subexpression elimination (CSE):** If the same expression is computed multiple times with the same operands, compute it once and reuse.

**Loop-invariant code motion (LICM):** Move computations that do not change within a loop to before the loop.

**Strength reduction:** Replace expensive operations with cheaper equivalents (e.g., multiplication by a constant -> shift and add).

**Inlining:** Replace function call with function body. Enables further optimizations. Must be bounded to avoid code size explosion.

**Tail call optimization:** Convert tail-recursive calls to jumps, eliminating stack frame allocation. Required by Scheme standard; common in functional language compilers.

### Register Allocation

**Graph coloring approach:** Build an interference graph where variables that are live simultaneously share an edge. Color the graph with k colors (k = number of registers). NP-complete in general but heuristics work well in practice.

**Linear scan allocation:** Simpler alternative used in JIT compilers (V8, HotSpot). O(n log n) time. Slightly suboptimal but much faster to compute.

---

## Garbage Collection Algorithms

### Reference Counting

Maintain a count of references to each object. Deallocate when count reaches zero.

**Advantages:** Immediate reclamation, predictable latency, simple.
**Disadvantages:** Cannot collect cycles (A -> B -> A with no external references). Overhead on every pointer assignment. Cache-unfriendly (reference count mutations).

**Cycle detection:** Augment with cycle collector (Python). Periodically scan objects to detect unreachable cycles.

### Mark-Sweep

1. **Mark phase:** Starting from roots (stack, globals), traverse all reachable objects and mark them.
2. **Sweep phase:** Scan heap, free unmarked objects.

**Advantages:** Handles cycles. No per-pointer overhead.
**Disadvantages:** Stop-the-world pause. Heap fragmentation.

### Mark-Compact

Like mark-sweep but compacts live objects to eliminate fragmentation:
1. Mark reachable objects.
2. Compute new locations.
3. Update all pointers.
4. Move objects.

**Advantages:** No fragmentation. Better cache locality.
**Disadvantages:** Requires multiple passes. Higher pause time than mark-sweep.

### Generational Collection

**Hypothesis (weak generational hypothesis):** Most objects die young.

**Design:**
- **Young generation (nursery):** Small, collected frequently. Uses copying collection (fast for high mortality).
- **Old generation (tenured):** Large, collected infrequently. Uses mark-sweep or mark-compact.
- **Promotion:** Objects surviving multiple young collections are promoted to old generation.

**Write barrier:** Track pointers from old to young generation (remembered set) so young collection does not need to scan old generation.

Used by: JVM (G1, ZGC, Shenandoah), .NET, V8, Go (non-generational but concurrent).

### Concurrent and Incremental Collection

**Tri-color marking:** Objects are white (unvisited), gray (visited, children not all processed), or black (visited, all children processed). Write barrier maintains invariant: no black object points directly to a white object.

**Concurrent collectors:** G1 (JVM), ZGC (JVM), Shenandoah (JVM). Sub-millisecond pauses for multi-gigabyte heaps. Trade throughput for latency.

**Go's GC:** Concurrent mark-sweep with write barriers. Prioritizes low latency (sub-millisecond pause times) over throughput.

---

## Practical Implications

1. **Know your parsing complexity.** If you are writing a parser, choose LL for simplicity (recursive descent), LALR for power (use a parser generator), or PEG/parser combinators for rapid prototyping.

2. **Language semantics determine optimization safety.** Pure functions (referential transparency) enable aggressive optimization. Mutable state, exceptions, and I/O constrain what the compiler can do.

3. **GC tuning is empirical.** Generational GC parameters (heap sizes, generation thresholds, pause time targets) must be tuned to your workload. Monitor GC logs and adjust.

4. **SSA is the universal IR.** Understanding SSA form helps you read compiler intermediate output (LLVM IR, GCC GIMPLE) and understand why certain code patterns optimize well or poorly.

5. **Language choice has theoretical consequences.** A language with a dependent type system can express more invariants. A language with linear types can manage resources without GC. These are not just "features" but fundamental capability differences.

---

## Common Misconceptions

1. **"Regular expressions in programming languages are regular."** PCRE-style "regular expressions" with backreferences, lookahead, and recursion go far beyond regular languages. Some features make matching NP-hard or even undecidable.

2. **"Parsing is a solved problem."** Context-free parsing is well-understood, but real programming languages have context-sensitive features (indentation-sensitive syntax, type-dependent parsing). Error recovery and producing good error messages remain active research areas.

3. **"Garbage collection is always slower than manual memory management."** Modern concurrent GCs can provide better average throughput than manual management due to compaction (improved cache locality) and batched deallocation. The tradeoff is worst-case latency.

4. **"Interpreted languages are inherently slow."** JIT compilation (V8 for JavaScript, HotSpot for Java, PyPy for Python) can approach native performance for many workloads. The distinction between "compiled" and "interpreted" is increasingly blurred.

5. **"Tail call optimization is just a nice-to-have."** Without TCO, recursive algorithms that are naturally expressed as tail recursion will stack overflow on large inputs. This affects language design decisions (iterative vs recursive style).

6. **"LL parsers are strictly weaker than LR parsers."** True formally, but modern LL parsers with backtracking, predicates, and ALL(*) (used in ANTLR 4) can handle many grammars that require LR. The theoretical hierarchy is less relevant in practice.

---

## Further Reading

- **Aho, A., Lam, M., Sethi, R., & Ullman, J.** *Compilers: Principles, Techniques, and Tools* (Dragon Book, 2nd ed.) - The definitive compiler textbook. Covers lexing, parsing, semantic analysis, optimization, and code generation.
- **Appel, A.** *Modern Compiler Implementation in ML/Java/C* - Practical alternative to the Dragon Book with clear implementations.
- **Pierce, B.** *Types and Programming Languages* - Essential for the type theory underpinning language design.
- **Friedman, D. & Wand, M.** *Essentials of Programming Languages* (EOPL) - Language design through interpreters. Builds understanding of semantics through implementation.
- **Jones, R., Hosking, A., & Moss, E.** *The Garbage Collection Handbook* - Comprehensive treatment of all GC algorithms, from classic to modern concurrent collectors.
- **Ford, B.** "Parsing Expression Grammars: A Recognition-Based Syntactic Foundation" (2004) - The original PEG paper.
- **Hopcroft, J., Motwani, R., & Ullman, J.** *Introduction to Automata Theory, Languages, and Computation* - The standard reference for formal languages.
- **Muchnick, S.** *Advanced Compiler Design and Implementation* - Deep coverage of optimization algorithms.
- **Winskel, G.** *The Formal Semantics of Programming Languages* - Rigorous treatment of operational, denotational, and axiomatic semantics.

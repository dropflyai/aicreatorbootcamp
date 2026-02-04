# Type Theory and Formal Methods

## What This Enables

Type theory and formal methods provide the mathematical tools to prove that software is correct -- not merely to test it. Type systems catch entire categories of bugs at compile time. Formal methods can verify that critical systems (aircraft control, cryptographic protocols, distributed consensus) satisfy their specifications with mathematical certainty. Understanding these foundations transforms an engineer's relationship with correctness: from hoping tests cover enough cases to proving properties hold universally.

---

## Foundational Concepts

### Lambda Calculus (Church, 1936)

The lambda calculus is the mathematical foundation of functional programming and type theory.

**Untyped lambda calculus:**

Syntax (three constructs):
```
e ::= x           (variable)
    | lambda x. e  (abstraction)
    | e1 e2        (application)
```

**Beta reduction (computation rule):**
```
(lambda x. e1) e2  -->  e1[x := e2]
```
Substitute e2 for all free occurrences of x in e1.

**Church encoding:** Natural numbers, booleans, pairs, and lists can all be represented as lambda terms:
```
0 = lambda f. lambda x. x
1 = lambda f. lambda x. f x
2 = lambda f. lambda x. f (f x)
TRUE = lambda t. lambda f. t
FALSE = lambda t. lambda f. f
```

The untyped lambda calculus is Turing-complete. The fixed-point combinator Y = lambda f. (lambda x. f (x x)) (lambda x. f (x x)) enables recursion.

### Simply Typed Lambda Calculus

Add types to prevent non-termination and runtime errors:
```
tau ::= Base         (base types: Int, Bool, ...)
      | tau -> tau   (function types)
```

**Typing rules:**
```
    x : tau in Gamma
  ─────────────────── (Var)
    Gamma |- x : tau

    Gamma, x : tau1 |- e : tau2
  ─────────────────────────────── (Abs)
    Gamma |- (lambda x. e) : tau1 -> tau2

    Gamma |- e1 : tau1 -> tau2    Gamma |- e2 : tau1
  ───────────────────────────────────────────────────── (App)
    Gamma |- e1 e2 : tau2
```

**Key property -- Type Safety (Milner, 1978):** "Well-typed programs don't go wrong."
- **Progress:** A well-typed term is either a value or can take a step.
- **Preservation (Subject Reduction):** If a well-typed term takes a step, the result is also well-typed (at the same type).

### The Curry-Howard Correspondence

One of the deepest results connecting logic and computation:

| Logic | Programming |
|-------|-------------|
| Proposition | Type |
| Proof | Program |
| Implication (A => B) | Function type (A -> B) |
| Conjunction (A and B) | Product type (A, B) |
| Disjunction (A or B) | Sum type (A | B) |
| True | Unit type |
| False | Empty type (Void) |
| Universal quantification (forall x. P(x)) | Polymorphism (forall a. T a) |
| Existential quantification (exists x. P(x)) | Existential types |
| Proof of A => B | Function from A to B |
| Modus ponens | Function application |

**Significance:** Writing a program of type T is equivalent to proving the proposition corresponding to T. A type checker is a proof checker. This is the foundation of proof assistants like Coq, Agda, and Lean.

---

## Type Systems

### Hindley-Milner Type System (1969/1978)

The type system underlying ML, OCaml, Haskell (with extensions), and Rust (partially).

**Key feature: Principal types with type inference.** Every well-typed term has a most general (principal) type, and this type can be inferred automatically without any type annotations.

**Algorithm W (Damas-Milner):**
1. Assign fresh type variables to all expressions.
2. Generate constraints from typing rules.
3. Solve constraints by unification.
4. If unification succeeds, the result is the principal type.

**Let-polymorphism:** Variables bound by `let` can be used at different types:
```
let id = lambda x. x in (id 42, id true)  -- OK: id is polymorphic
```
But lambda-bound variables cannot:
```
(lambda f. (f 42, f true)) (lambda x. x)  -- Type error in HM
```

**Decidability:** Type inference in HM is decidable. Type checking is also decidable. The inference algorithm runs in nearly linear time in practice (though theoretically DEXPTIME-complete via let-nesting).

### Dependent Types

Types that depend on values. The type of a term can mention runtime values.

**Example:** A vector type parameterized by its length:
```
Vec : Nat -> Type -> Type
Vec 0 A = Nil
Vec (n+1) A = Cons A (Vec n A)

-- append has precise type:
append : Vec m A -> Vec n A -> Vec (m + n) A
```

The type system ensures you cannot index out of bounds, because the length is tracked in the type.

**Calculus of Constructions (Coquand & Huet, 1988):** The type theory underlying Coq. Unifies types and terms in a single hierarchy:
```
Term : Type : Kind : ...
```

**Languages with dependent types:** Coq, Agda, Idris, Lean 4, F*

**Tradeoff:** Type checking with dependent types is undecidable in general. Practical systems use various restrictions and heuristics.

### Linear Types

Types that enforce resource usage: each value must be used exactly once.

**Formal basis:** Linear logic (Girard, 1987). Removes the structural rules of weakening (discard) and contraction (duplicate).

**Practical applications:**
- **Rust's ownership system** is based on affine types (use at most once). The borrow checker enforces these constraints.
- **Session types** for protocol verification: ensure communication channels follow a specified protocol.
- **Resource management:** File handles, database connections, memory -- linear types guarantee resources are freed exactly once.

```
-- In a linear type system:
f : File -o ()     -- f consumes the file (must close it)
-- Cannot use the file after passing it to f
```

### Refinement Types

Types augmented with logical predicates:
```
{ x : Int | x > 0 }        -- Positive integers
{ s : String | len(s) < 256 } -- Bounded strings
{ xs : List | sorted(xs) }  -- Sorted lists
```

**Liquid Haskell** implements refinement types for Haskell via SMT solving. The type checker generates verification conditions and sends them to an SMT solver (Z3).

**Practical benefit:** Eliminates many runtime checks by verifying properties at compile time. Bounds checking, null checking, and invariant maintenance can all be encoded as refinement types.

---

## Formal Verification

### Hoare Logic (1969)

A formal system for reasoning about program correctness using triples:
```
{P} S {Q}
```
- **P:** Precondition (what must be true before S executes)
- **S:** Program statement
- **Q:** Postcondition (what is true after S executes)

**Key rules:**

Assignment:
```
{Q[x := e]} x := e {Q}
```

Sequence:
```
{P} S1 {R}    {R} S2 {Q}
───────────────────────────
{P} S1; S2 {Q}
```

Conditional:
```
{P and B} S1 {Q}    {P and not B} S2 {Q}
──────────────────────────────────────────
{P} if B then S1 else S2 {Q}
```

While loop:
```
{I and B} S {I}
─────────────────────────
{I} while B do S {I and not B}
```
Where I is the loop invariant.

**Partial vs Total correctness:**
- Partial correctness {P} S {Q}: IF S terminates, Q holds.
- Total correctness [P] S [Q]: S terminates AND Q holds.

For total correctness of loops, you must also prove a variant (ranking function) that decreases with each iteration and is bounded below.

### TLA+ (Lamport, 1999)

Temporal Logic of Actions -- a formal specification language for concurrent and distributed systems.

**Core concepts:**
- **State:** Assignment of values to all variables.
- **Behavior:** Infinite sequence of states.
- **Action:** Boolean-valued expression on pairs of states (current and next).
- **Temporal formula:** Expression over behaviors using temporal operators (always, eventually).

**Example -- mutual exclusion:**
```
MutualExclusion == [](~(pc[1] = "cs" /\ pc[2] = "cs"))
-- Always, it is not the case that both processes are in critical section
```

**Industrial use:** TLA+ has been used at Amazon (DynamoDB, S3, EBS), Microsoft (Cosmos DB, Azure), and others to find critical bugs in distributed system designs before implementation.

### Model Checking

Exhaustive exploration of all reachable states of a finite-state system.

**Algorithm:** Given a model M and specification phi:
1. Construct the state graph of M.
2. Explore all reachable states.
3. Check whether phi holds in all (or some) states.

**Tools:**
- **SPIN:** Verifies concurrent systems specified in Promela. Uses on-the-fly model checking.
- **TLC:** Model checker for TLA+. Explores all states within given constraints.
- **Alloy:** Lightweight modeling with SAT-based analysis. Good for exploring design spaces.
- **CBMC:** Bounded model checking for C programs.

**State explosion problem:** The number of states grows exponentially with the number of concurrent components. Mitigation techniques: partial order reduction, symmetry reduction, abstraction, symbolic model checking (BDDs).

### Z Notation

A formal specification language based on set theory and first-order predicate logic.

**Schema notation:**
```
┌─ BirthdayBook ─────────────────────
│ known : P NAME
│ birthday : NAME -|-> DATE
├─────────────────────────────────────
│ known = dom birthday
└─────────────────────────────────────
```

Used primarily in safety-critical systems specification (avionics, medical devices, nuclear systems).

---

## Correctness Proofs

### Program Verification Approaches

**Deductive verification:** Prove correctness using Hoare logic or similar systems. Tools: Dafny, Frama-C (for C), KeY (for Java), Isabelle/HOL.

**Interactive theorem proving:** Human-guided proof construction with machine-checked steps. Tools: Coq, Isabelle, Lean, Agda. Notable successes: CompCert (verified C compiler), seL4 (verified OS microkernel), CertiKOS (verified concurrent OS kernel).

**Automated theorem proving:** SMT solvers (Z3, CVC5) can automatically prove many verification conditions. Limited to decidable theories (linear arithmetic, uninterpreted functions, arrays, bitvectors).

### Property-Based Testing Foundations

When full verification is impractical, property-based testing provides a middle ground:

**QuickCheck paradigm (Claessen & Hughes, 2000):**
1. State properties as universally quantified formulas: `forall x. P(x)`
2. Generate random test inputs from the type of x.
3. Check P(x) for each generated input.
4. When P(x) fails, shrink x to find a minimal counterexample.

**Theoretical basis:** Property-based testing is a form of randomized testing with guarantees from probability theory. If a property fails with probability p on random inputs, then after n tests, the probability of not finding the failure is (1-p)^n.

**Stateful property-based testing:** Model-based testing where a simplified model is maintained alongside the system under test. Each operation is applied to both, and their states are compared.

---

## Practical Implications

1. **Types are your first line of defense.** A strong type system (TypeScript strict mode, Rust, Haskell) eliminates entire categories of bugs. The engineering cost of type annotations is repaid many times over in prevented defects.

2. **Make illegal states unrepresentable.** Design your types so that invalid states cannot be constructed. Instead of `{ status: string, data: any }`, use discriminated unions: `{ status: 'loaded', data: T } | { status: 'error', error: E }`.

3. **Use TLA+ for critical distributed designs.** Before implementing a distributed protocol, specify it in TLA+ and model-check it. This catches subtle bugs that testing cannot reach (specific interleavings of events).

4. **Property-based testing complements unit testing.** Unit tests check specific cases; property-based tests check invariants across generated inputs. Use both.

5. **Linear types explain Rust.** Rust's ownership, borrowing, and lifetimes are a practical manifestation of affine/linear type theory. Understanding the theory makes Rust's error messages comprehensible.

6. **Refinement types are the future.** As SMT solvers improve, refinement types will become mainstream, allowing compile-time verification of bounds, nullability, and invariants without runtime cost.

---

## Common Misconceptions

1. **"Formal methods are too expensive for industry."** Formal methods exist on a spectrum. Full verification (Coq proofs) is expensive. TLA+ specification is moderate. Property-based testing is cheap. Choose the level appropriate to your criticality.

2. **"Types restrict what you can express."** Types restrict what you can express incorrectly. A well-designed type system guides you toward correct programs. The feeling of restriction often indicates a design error.

3. **"Formal verification means the software has no bugs."** Verification proves the code matches the specification. If the specification is wrong, the verified code is wrong in a verified way. Specification is the hard part.

4. **"Dynamic typing is more productive."** For small programs and exploration, dynamic typing offers faster iteration. For large systems with many contributors, static typing prevents entire categories of integration bugs and serves as machine-checked documentation.

5. **"Hoare logic is only for academics."** Design-by-contract (Eiffel, Ada SPARK, Dafny) is Hoare logic made practical. Many engineers use preconditions and postconditions (assertions) without recognizing the formal foundation.

---

## Further Reading

- **Pierce, B.** *Types and Programming Languages* (TAPL) - The definitive introduction to type theory. Covers simply typed lambda calculus through System F, existential types, and subtyping.
- **Pierce, B.** *Advanced Topics in Types and Programming Languages* (ATTAPL) - Follow-up covering dependent types, linear types, effect systems, and more.
- **Lamport, L.** *Specifying Systems: The TLA+ Language and Tools for Hardware and Software Engineers* - Practical introduction to TLA+ by its creator.
- **Nipkow, T., Paulson, L., & Wenzel, M.** *Isabelle/HOL: A Proof Assistant for Higher-Order Logic* - Introduction to interactive theorem proving.
- **Claessen, K. & Hughes, J.** "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs" (2000) - The foundational property-based testing paper.
- **Wadler, P.** "Propositions as Types" (2015) - Beautiful exposition of Curry-Howard for a broad audience.
- **Leroy, X.** "Formal Verification of a Realistic Compiler" (2009) - The CompCert paper showing verification at scale is practical.
- **Newcombe, C. et al.** "How Amazon Web Services Uses Formal Methods" (2015) - Case study of TLA+ in industry.
- **Barendregt, H.** *The Lambda Calculus: Its Syntax and Semantics* - The encyclopedic reference on lambda calculus.

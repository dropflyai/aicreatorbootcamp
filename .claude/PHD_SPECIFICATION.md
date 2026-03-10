# PhD-Level Brain Specification

> **This document defines what "PhD-level" means for any brain in the system.**
> **No brain may be marked as PhD-level without passing ALL criteria in this specification.**
> **This specification must be approved by the user before any PhD-level build begins.**

---

## Purpose

This specification exists because:
1. "PhD-level" was being used without definition
2. Builds were marked "complete" without verification
3. The user had to catch quality gaps that should have been caught automatically
4. We were going in circles instead of building correctly the first time

**This stops now.**

---

## Definition of PhD-Level

A PhD-level brain must demonstrate:

1. **Foundational Knowledge** — Built on primary academic sources, not summaries or blog posts
2. **Theoretical Depth** — Understands WHY, not just HOW
3. **Historical Context** — Knows how ideas evolved and connects them
4. **Peer-Reviewed Sources** — Cites actual research, not industry marketing
5. **Canonical Texts** — References the books/papers that defined the field
6. **Formal Rigor** — Where applicable, includes mathematical/logical foundations
7. **Critical Perspective** — Acknowledges limitations, debates, and open problems
8. **20 Years Practitioner Experience** — Case studies, use cases, pattern recognition from real-world application

---

## Practitioner Experience Requirements (20 Years Equivalent)

> **Academic knowledge alone is insufficient. Each brain must have the wisdom of 20 years in the field.**

PhD-level thinking + practitioner experience means:
- Knowing what works in theory AND what works in practice
- Understanding why textbook solutions often fail
- Having seen enough failures to recognize patterns
- Knowing the edge cases and exceptions

### Required Experience Components

Every PhD-level brain MUST include:

| Component | Minimum | Description |
|-----------|---------|-------------|
| **Case Studies** | 10+ | Real-world examples with outcomes, lessons learned |
| **Failure Patterns** | 5+ | Documented failures and why they happened |
| **Success Patterns** | 5+ | Documented successes and what made them work |
| **Industry Variations** | 3+ | How principles apply differently across industries |
| **War Stories** | 5+ | "I've seen this before" pattern recognition triggers |
| **Edge Cases** | 5+ | When the textbook approach doesn't apply |

### Case Study Requirements

Each case study MUST include:

```
CASE STUDY FORMAT
=================
Context: [Industry, company size, situation]
Challenge: [What problem was being solved]
Approach: [What was tried]
Outcome: [What happened - success or failure]
Lessons: [What was learned]
Pattern: [Generalizable insight for future recognition]
```

### Failure Pattern Requirements

Each failure pattern MUST include:

```
FAILURE PATTERN FORMAT
======================
Pattern Name: [Recognizable name for the failure mode]
Warning Signs: [How to recognize this is happening]
Root Cause: [Why this failure occurs]
Prevention: [How to avoid it]
Recovery: [What to do if it happens]
Real Example: [Anonymized case where this occurred]
```

### Success Pattern Requirements

Each success pattern MUST include:

```
SUCCESS PATTERN FORMAT
======================
Pattern Name: [Recognizable name for the approach]
When to Use: [Conditions where this works]
How to Execute: [Step-by-step application]
Why It Works: [Academic theory + practical validation]
Limitations: [When this doesn't apply]
Real Example: [Anonymized case where this worked]
```

### War Story Triggers

War stories are "I've seen this before" moments. Each brain should have pattern recognition triggers:

```
WAR STORY TRIGGER FORMAT
========================
Situation: [When you see X...]
Pattern Match: [It probably means Y...]
Historical Example: [Because in the past, Z happened...]
Recommended Action: [Therefore, do A...]
Confidence Level: [High/Medium/Low based on pattern frequency]
```

### Verification

Before claiming a brain has "20 years experience":

```
PRACTITIONER EXPERIENCE VERIFICATION
====================================

CASE STUDIES:
[ ] 10+ documented case studies
[ ] Mix of successes and failures
[ ] Multiple industries represented
[ ] Lessons explicitly extracted

FAILURE PATTERNS:
[ ] 5+ documented failure patterns
[ ] Warning signs clearly articulated
[ ] Prevention strategies included
[ ] Recovery approaches defined

SUCCESS PATTERNS:
[ ] 5+ documented success patterns
[ ] Conditions for application clear
[ ] Limitations acknowledged
[ ] Theory-practice connection made

INDUSTRY KNOWLEDGE:
[ ] 3+ industries covered
[ ] Industry-specific variations noted
[ ] Cross-industry patterns identified

WAR STORIES:
[ ] 5+ pattern recognition triggers
[ ] "I've seen this before" moments documented
[ ] Historical context provided
```

---

## Cognitive Level Requirements (Bloom's Taxonomy)

> **Based on research across MIT, Stanford, CMU, Berkeley, Caltech, Georgia Tech, ETH Zurich, Princeton, and Harvard.**

PhD-level brains must operate at **Evaluate** and **Create** levels, not just Apply and Analyze.

### Bloom's Revised Taxonomy Levels

| Level | Definition | PhD Requirement | Example |
|-------|------------|-----------------|---------|
| **Remember** | Recall facts | ❌ Not sufficient | "List the SOLID principles" |
| **Understand** | Explain concepts | ❌ Not sufficient | "Explain what SRP means" |
| **Apply** | Use in new situations | ❌ Practitioner level | "Apply SRP to this code" |
| **Analyze** | Break into components | ⚠️ Boundary | "Why does this design violate SRP?" |
| **Evaluate** | Judge and critique | ✅ PhD required | "Critique SRP — when does it fail? What are its limitations?" |
| **Create** | Synthesize new solutions | ✅ PhD required | "Design a principle that addresses SRP's limitations in distributed systems" |

### What This Means in Practice

**Practitioner Brain (Apply/Analyze):**
- Applies existing frameworks to solve problems
- Analyzes code to find issues
- Uses tools effectively
- **Cannot** critique the tools or frameworks themselves

**PhD-Level Brain (Evaluate/Create):**
- Evaluates when frameworks are appropriate vs. inappropriate
- Creates new approaches when existing ones fail
- Identifies limitations and open problems
- **Can** synthesize novel solutions not found in any textbook

### Verification Questions

Before marking a brain as PhD-level, ask:

1. **Evaluate:** "Does this brain know when its frameworks DON'T apply?"
2. **Create:** "Can this brain synthesize a solution to a problem not covered by its frameworks?"
3. **Critique:** "Does this brain acknowledge the limitations of its foundational papers?"

If any answer is NO, the brain is practitioner-level, not PhD-level.

---

## Curriculum Alignment Matrix

> **PhD-level means alignment with top-tier graduate programs, not just citation of academic papers.**

### Reference Programs

| Institution | Key Courses | Distinguishing Requirement |
|-------------|-------------|---------------------------|
| **MIT** | 6.5840 (Distributed), 6.512 (FRAP), 6.1800 (Systems) | TQE: 4 courses, 3 A's + 1 B; RQE: Research defense |
| **Stanford** | CS 242 (Languages), CS 243 (Analysis), CS 240 (Systems) | Proof requirements, formal verification, Lean |
| **CMU** | 17-313 (SE), 15-214 (Design), 17-654 (Analysis) | Clear PhD vs MS vs undergrad progression; SEI CMMI |
| **Berkeley** | CS 262A (Systems), EECS 219C (Formal Methods) | >50% of 219C projects become published papers |
| **Caltech** | CS 116 (Verification), CS 117 (Computability), CS 128 (Coq) | "Principled rigor as only solid basis for progress" |
| **Georgia Tech** | CS 6340 (Analysis), CS 6310 (Architecture) | PhD Qualifier: depth exam + publishable portfolio |
| **ETH Zurich** | Program Verification, Formal Methods, Viper | "Tool building over tool using" |
| **Princeton** | COS 510 (Languages), COS 518 (Systems) | Qualifying exam: breadth + depth |
| **Harvard** | CS 252r (Languages), CS 260r (Systems) | Research seminar format |

### Qualifying Exam Equivalent

Every PhD-level brain must pass a "qualifying exam" equivalent:

**Breadth Requirement (3-4 areas):**
- Must demonstrate competence in related areas, not just one specialty
- Example: Engineering Brain must know Systems + Theory + Security + Testing

**Depth Requirement (1 area):**
- Must demonstrate expert-level knowledge in primary domain
- Example: Engineering Brain primary depth is Software Architecture + Verification

**Research Capability:**
- Must be able to identify open problems
- Must be able to propose novel solutions
- Must be able to critique existing work

---

## Formal Methods Requirements (Curriculum-Based)

> **Based on formal methods courses at MIT, Stanford, Berkeley, Caltech, ETH Zurich.**

### For Engineering Brain (Required)

A PhD-level Engineering Brain MUST understand and apply:

| Topic | Minimum Requirement | Reference Course |
|-------|-------------------|------------------|
| **Hoare Logic** | Preconditions, postconditions, loop invariants | MIT 6.512, Caltech CS 116 |
| **Type Systems** | Type soundness, subtyping, generics | Stanford CS 242, ETH Zurich |
| **Program Verification** | At least one verification approach (deductive, model checking, abstract interpretation) | Berkeley EECS 219C, ETH Viper |
| **Operational Semantics** | Small-step and big-step semantics | MIT 6.512, Stanford CS 243 |
| **SMT Solvers** | Understanding of SAT/SMT, how Z3/CVC5 work | Berkeley EECS 219C |
| **Temporal Logic** | LTL, CTL for system specification | ETH Zurich Formal Methods |

### Tool-Building vs Tool-Using (ETH Zurich Principle)

**Practitioner Level:** Uses verification tools (runs a linter, uses a type checker)

**PhD Level:** Builds verification tools (implements an abstract interpreter, writes a type checker, creates a static analysis)

This is a critical distinction. PhD-level thinking requires understanding how tools work internally, not just how to use them.

### Formal Methods Verification Checklist

```
FORMAL METHODS (PhD-Level)
==========================

HOARE LOGIC:
[ ] Can explain precondition, postcondition, weakest precondition
[ ] Can derive loop invariants for non-trivial programs
[ ] Understands Floyd-Hoare proof rules
[ ] Has read Hoare (1969) original paper

TYPE SYSTEMS:
[ ] Understands type soundness (progress + preservation)
[ ] Can explain subtyping and variance
[ ] Understands type inference (Hindley-Milner or similar)
[ ] Has read Pierce "Types and Programming Languages" or equivalent

VERIFICATION TOOLS:
[ ] Understands at least one: model checking, abstract interpretation, or deductive verification
[ ] Can explain SMT solvers at algorithmic level (DPLL, CDCL)
[ ] Has used at least one: Dafny, Coq, TLA+, Viper, or Z3 directly

OPERATIONAL SEMANTICS:
[ ] Can write small-step and big-step rules
[ ] Understands evaluation contexts
[ ] Can prove properties about language semantics

TEMPORAL LOGIC (for systems):
[ ] Understands LTL: always, eventually, until
[ ] Understands CTL: AG, EG, AF, EF
[ ] Can specify safety and liveness properties
```

---

## Universal Requirements (All Brains)

Every PhD-level brain MUST have:

### Source Requirements

| Requirement | Minimum | Verification |
|-------------|---------|--------------|
| Peer-reviewed journal papers | 5+ | List with DOI/citation |
| Foundational books (field-defining) | 3+ | Full citation |
| Conference papers (top-tier venues) | 3+ | List with venue name |
| Standards documents (IEEE, ISO, etc.) | 2+ | Standard number |
| Primary sources (original, not summaries) | 80%+ | Audit against list |

### Source Quality Criteria

A source counts as "academic" if it meets ANY of:
- Published in peer-reviewed journal (ACM, IEEE, etc.)
- Published by academic press (MIT Press, Cambridge, Springer, etc.)
- Cited 500+ times in Google Scholar
- Written by recognized authority (Turing Award, field founder, etc.)
- Official standard from standards body (IEEE, ISO, NIST, W3C)

A source DOES NOT count if it is:
- Blog post (even from experts)
- Industry white paper
- Marketing material
- Wikipedia (can use for overview, not as source)
- Medium articles
- Conference talks without accompanying paper

### Structure Requirements

Every PhD-level brain MUST include:

```
PART I: THEORETICAL FOUNDATIONS
├── Historical development of the field
├── Foundational papers and their contributions
├── Key debates and schools of thought
├── Mathematical/formal foundations (where applicable)
└── Connections to adjacent fields

PART II: CORE FRAMEWORKS
├── Primary frameworks with academic citations
├── When to use each framework
├── Limitations and critiques of each
└── How frameworks relate to each other

PART III: APPLIED PROTOCOLS
├── How theory translates to practice
├── Decision procedures derived from theory
├── Verification methods
└── Quality criteria

APPENDIX: COMPLETE BIBLIOGRAPHY
├── Organized by topic
├── Full academic citations
├── DOI/links where available
└── Brief annotation of each source's contribution
```

---

## Brain-Specific Requirements

### Engineering Brain

**Required Academic Categories:**

| Category | Required Sources | Examples |
|----------|------------------|----------|
| **Foundational CS** | 3+ seminal papers | Dijkstra, Hoare, Parnas, Knuth |
| **Software Architecture** | 2+ academic texts | Shaw/Garlan, Bass/Clements/Kazman |
| **Formal Methods** | 2+ papers/books | Hoare Logic, TLA+, Model Checking |
| **Distributed Systems** | 2+ papers | Lamport, CAP theorem, consensus |
| **Software Evolution** | 2+ papers | Lehman's Laws, Brooks |
| **Empirical SE Research** | 3+ papers | From TSE, TOSEM, ICSE, FSE |
| **Security** | 2+ foundational | Saltzer/Schroeder, formal security models |
| **Testing Theory** | 2+ academic | Not just practitioner guides |
| **Standards** | 2+ | SWEBOK, IEEE standards |

**Required Foundational Papers (Non-Negotiable):**

1. Dijkstra, E.W. (1968). "Go To Statement Considered Harmful." *Communications of the ACM*
2. Parnas, D.L. (1972). "On the Criteria To Be Used in Decomposing Systems into Modules." *Communications of the ACM*
3. Hoare, C.A.R. (1969). "An Axiomatic Basis for Computer Programming." *Communications of the ACM*
4. Brooks, F.P. (1987). "No Silver Bullet: Essence and Accidents of Software Engineering." *Computer*
5. Lamport, L. (1978). "Time, Clocks, and the Ordering of Events in a Distributed System." *Communications of the ACM*
6. Lehman, M.M. (1980). "Programs, Life Cycles, and Laws of Software Evolution." *Proceedings of the IEEE*

**Curriculum Equivalence (Must Align With):**

| Topic | Reference Course | Key Learning Outcomes |
|-------|-----------------|----------------------|
| Systems | MIT 6.1800, Berkeley CS 262A | Design reliable systems atop unreliable infrastructure |
| Distributed | MIT 6.5840 | Implement Raft consensus, build fault-tolerant KV store |
| Security | MIT 6.5660 | Threat modeling, formal verification, symbolic execution |
| Verification | MIT 6.512, ETH Viper | Machine-checked proofs with Coq/Rocq/Dafny |
| Analysis | Stanford CS 243, Berkeley EECS 219C | Dataflow, abstract interpretation, model checking |
| Architecture | CMU 15-214, Georgia Tech CS 6310 | Quality attributes, architectural styles, design patterns |

**Required Canonical Texts:**

1. Knuth, D.E. — *The Art of Computer Programming* (reference, not full read)
2. Aho, Sethi, Ullman — *Compilers: Principles, Techniques, and Tools* (if compilation relevant)
3. Cormen, Leiserson, Rivest, Stein — *Introduction to Algorithms* (CLRS)
4. Gamma, Helm, Johnson, Vlissides — *Design Patterns* (Gang of Four)
5. Bass, Clements, Kazman — *Software Architecture in Practice*

**Verification Checklist:**

```
ENGINEERING BRAIN PHD VERIFICATION
==================================

FOUNDATIONAL CS:
[ ] Dijkstra "Go To Statement Considered Harmful" - cited and applied
[ ] Parnas "Decomposing Systems into Modules" - cited and applied
[ ] Hoare "Axiomatic Basis for Computer Programming" - cited and applied
[ ] At least 3 foundational papers total

SOFTWARE ARCHITECTURE:
[ ] Shaw & Garlan or equivalent academic text
[ ] Architectural styles with academic backing
[ ] Quality attributes framework with citations
[ ] At least 2 academic sources

FORMAL METHODS:
[ ] Hoare Logic or equivalent explained
[ ] Program verification concepts
[ ] At least 2 sources

DISTRIBUTED SYSTEMS:
[ ] Lamport time/clocks paper cited
[ ] CAP theorem with original source (Brewer/Gilbert-Lynch)
[ ] Consensus algorithms with academic source
[ ] At least 2 papers

SOFTWARE EVOLUTION:
[ ] Lehman's Laws cited
[ ] Brooks "No Silver Bullet" cited
[ ] Technical debt with academic treatment
[ ] At least 2 papers

EMPIRICAL RESEARCH:
[ ] At least 3 papers from TSE, TOSEM, ICSE, or FSE
[ ] Empirical findings, not just opinions

SECURITY:
[ ] Saltzer & Schroeder (1975) - all 8 principles
[ ] At least one formal security model
[ ] At least 2 foundational sources

TESTING:
[ ] Academic testing theory (not just Myers practitioner book)
[ ] Formal testing concepts
[ ] At least 2 academic sources

STANDARDS:
[ ] SWEBOK referenced
[ ] At least one IEEE standard
[ ] At least 2 standards total

BIBLIOGRAPHY:
[ ] Full academic citations (author, year, title, venue)
[ ] DOI or URL where available
[ ] Organized by topic
[ ] 20+ total academic sources

TOTAL REQUIREMENTS:
[ ] 5+ peer-reviewed journal papers
[ ] 3+ foundational books
[ ] 3+ conference papers
[ ] 2+ standards
[ ] 80%+ primary sources
[ ] All 6 non-negotiable foundational papers included
```

---

### Design Brain

**Required Academic Categories:**

| Category | Required Sources | Examples |
|----------|------------------|----------|
| **HCI Foundations** | 3+ seminal works | Card/Moran/Newell, Norman, Nielsen |
| **Cognitive Psychology** | 2+ papers/books | Perception, memory, attention |
| **Visual Perception** | 2+ academic | Gestalt, preattentive processing |
| **Usability Research** | 3+ papers | CHI, UIST proceedings |
| **Accessibility** | 2+ standards/papers | WCAG foundations, research |
| **Design Theory** | 2+ academic | Design methodology, design science |
| **Information Architecture** | 2+ sources | Academic IA literature |

**Required Foundational Works (Non-Negotiable):**

1. Card, S.K., Moran, T.P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*
2. Norman, D.A. (1988). *The Design of Everyday Things*
3. Nielsen, J. (1993). *Usability Engineering*
4. Shneiderman, B. — *Designing the User Interface* (multiple editions)
5. Tufte, E.R. — *The Visual Display of Quantitative Information*
6. Fitts, P.M. (1954). "The Information Capacity of the Human Motor System." *Journal of Experimental Psychology*

**Verification Checklist:**

```
DESIGN BRAIN PHD VERIFICATION
=============================

HCI FOUNDATIONS:
[ ] Card/Moran/Newell "Psychology of HCI" - cited
[ ] GOMS model explained
[ ] Human processor model
[ ] At least 3 foundational HCI sources

COGNITIVE PSYCHOLOGY:
[ ] Working memory limitations (Miller's 7±2 or Cowan's 4)
[ ] Attention and perception research
[ ] Mental models
[ ] At least 2 academic sources

VISUAL PERCEPTION:
[ ] Gestalt principles with academic source
[ ] Preattentive processing
[ ] Color theory with perceptual basis
[ ] At least 2 academic sources

USABILITY:
[ ] Nielsen's heuristics with original source
[ ] Usability testing methodology (academic)
[ ] At least 3 papers from CHI, UIST, or similar

ACCESSIBILITY:
[ ] WCAG with foundational research
[ ] Accessibility research papers
[ ] At least 2 sources

DESIGN THEORY:
[ ] Design methodology (academic treatment)
[ ] Design science research
[ ] At least 2 academic sources

INFORMATION ARCHITECTURE:
[ ] Academic IA foundations
[ ] Navigation and findability research
[ ] At least 2 sources

BIBLIOGRAPHY:
[ ] 20+ total academic sources
[ ] Full citations with venues
[ ] All 6 non-negotiable works included
```

---

### MBA Brain

**Required Academic Categories:**

| Category | Required Sources | Examples |
|----------|------------------|----------|
| **Strategy** | 3+ seminal works | Porter, Mintzberg, Barney |
| **Organizational Behavior** | 2+ papers/books | March, Simon, Weick |
| **Economics** | 2+ foundational | Coase, Williamson, game theory |
| **Finance Theory** | 2+ academic | Modigliani-Miller, CAPM, options |
| **Marketing Science** | 2+ papers | Academic marketing journals |
| **Operations** | 2+ papers | Queuing theory, optimization |
| **Entrepreneurship** | 2+ academic | Not just practitioner books |

**Required Foundational Works (Non-Negotiable):**

1. Porter, M.E. (1980). *Competitive Strategy* + (1985) *Competitive Advantage*
2. Coase, R.H. (1937). "The Nature of the Firm." *Economica*
3. Jensen, M.C. & Meckling, W.H. (1976). "Theory of the Firm." *Journal of Financial Economics*
4. March, J.G. & Simon, H.A. (1958). *Organizations*
5. Barney, J. (1991). "Firm Resources and Sustained Competitive Advantage." *Journal of Management*
6. Kahneman, D. & Tversky, A. (1979). "Prospect Theory." *Econometrica*

**Verification Checklist:**

```
MBA BRAIN PHD VERIFICATION
==========================

STRATEGY:
[ ] Porter's frameworks with original academic source
[ ] Resource-Based View (Barney 1991)
[ ] Mintzberg strategy process
[ ] At least 3 academic strategy sources

ORGANIZATIONAL BEHAVIOR:
[ ] March & Simon - Organizations
[ ] Bounded rationality with Simon's work
[ ] Organizational learning
[ ] At least 2 academic sources

ECONOMICS:
[ ] Coase - Nature of the Firm
[ ] Transaction cost economics
[ ] Game theory foundations
[ ] At least 2 academic sources

FINANCE:
[ ] Agency theory (Jensen & Meckling)
[ ] Capital structure theory
[ ] Valuation methods with academic basis
[ ] At least 2 academic sources

MARKETING:
[ ] Academic marketing theory
[ ] Consumer behavior research
[ ] At least 2 papers from JMR, JCR, or Marketing Science

OPERATIONS:
[ ] Operations research foundations
[ ] Process optimization with academic basis
[ ] At least 2 academic sources

ENTREPRENEURSHIP:
[ ] Academic entrepreneurship research
[ ] Not just practitioner advice
[ ] At least 2 papers from academic journals

BEHAVIORAL ECONOMICS:
[ ] Kahneman & Tversky - Prospect Theory
[ ] Behavioral decision-making
[ ] At least 2 academic sources

BIBLIOGRAPHY:
[ ] 20+ total academic sources
[ ] Full citations with venues
[ ] All 6 non-negotiable works included
```

---

### CEO Brain

**Required Academic Categories:**

| Category | Required Sources | Examples |
|----------|------------------|----------|
| **Decision Science** | 3+ papers | Simon, Kahneman, March |
| **Leadership Theory** | 2+ academic | Not just popular books |
| **Organizational Theory** | 2+ foundational | Weber, March, Weick |
| **Strategy** | 2+ academic | Porter, Mintzberg |
| **Agency Theory** | 2+ papers | Jensen/Meckling, Eisenhardt |
| **Executive Function** | 2+ academic | Drucker (academic works), others |

**Required Foundational Works (Non-Negotiable):**

1. Simon, H.A. (1947). *Administrative Behavior*
2. March, J.G. (1994). *A Primer on Decision Making*
3. Mintzberg, H. (1973). *The Nature of Managerial Work*
4. Cyert, R.M. & March, J.G. (1963). *A Behavioral Theory of the Firm*
5. Weber, M. (1922). *Economy and Society* (bureaucracy theory)
6. Chandler, A.D. (1962). *Strategy and Structure*

---

### Debugger Brain

**Already Verified (2026-03-06):**

The Debugger Brain was built with:
- Zeller, A. (2009). *Why Programs Fail* — Academic textbook
- IEEE Standard 1044-2009 — Defect classification standard
- Chillarege et al. (1992). ODC — IBM Research, peer-reviewed
- Jones et al. (2002). Tarantula — Peer-reviewed SBFL
- Weiser (1981). Program Slicing — Foundational academic paper

**Status:** Meets PhD-level criteria ✓

---

## Verification Process

### Before Building

1. **Identify brain type** (Engineering, Design, MBA, CEO, etc.)
2. **Load brain-specific requirements** from this specification
3. **Gather all required sources** before writing
4. **Create source checklist** specific to this brain
5. **Get user approval** if any substitutions needed

### During Building

1. **Cite as you write** — No claim without citation
2. **Track checklist** — Mark items as you cover them
3. **Flag gaps** — If a requirement can't be met, STOP and report

### Before Claiming Complete

1. **Run full verification checklist**
2. **Include checklist in output** (filled in, not blank)
3. **Include bibliography** organized by topic
4. **Calculate compliance** — Must be 100% on non-negotiable items
5. **State any gaps** explicitly if <100%

### Output Format

Every PhD-level brain must end with:

```
## VERIFICATION REPORT

### Checklist Compliance
[Filled checklist with [x] for met, [ ] for not met]

### Source Count
- Peer-reviewed journal papers: X (required: 5+)
- Foundational books: X (required: 3+)
- Conference papers: X (required: 3+)
- Standards: X (required: 2+)
- Primary sources: X% (required: 80%+)

### Non-Negotiable Items
[List all 6 required foundational works with citation status]

### Gaps (if any)
[Explicit list of any requirements not met and why]

### Verdict
[ ] MEETS PHD-LEVEL SPECIFICATION
[ ] DOES NOT MEET — [reasons]
```

---

## Enforcement

### This Specification is Mandatory

- No brain may be marked "PhD-level" without passing verification
- No verification may be skipped "because it seems complete"
- No self-certification — verification report must be included for user audit
- Gaps must be disclosed, not hidden

### Violation Protocol

If a brain is marked "PhD-level" and later found to not meet this specification:

1. Log the failure to `/memory/patterns/failures/`
2. Identify which verification step was skipped
3. Add additional safeguard to prevent recurrence
4. Rebuild the brain correctly

### Updates to This Specification

This specification may be updated when:
- New brain types are added (add brain-specific requirements)
- Academic standards evolve
- User identifies gaps in the specification itself

All updates must be logged with rationale.

---

## Approval

**This specification requires user approval before any PhD-level build proceeds.**

```
[ ] User has reviewed this specification
[ ] User approves these criteria as the definition of "PhD-level"
[ ] User approves the verification process
[ ] User understands all PhD-level claims will include verification reports
```

---

## Research Sources (Curriculum Analysis)

This specification was upgraded on 2026-03-07 based on comprehensive curriculum research from:

### US Institutions Analyzed
- **MIT**: 6.102, 6.1800, 6.5840, 6.5660, 6.512 (FRAP)
- **Stanford**: CS 242, 243, 240, 344
- **CMU**: 17-313, 15-214, 17-654, SEI CMMI
- **Berkeley**: CS 262A, EECS 219C
- **Caltech**: CS 116, 117, 128
- **Georgia Tech**: CS 6300, 6310, 6340
- **Princeton/Harvard**: Qualifying exam structures

### European Institutions Analyzed
- **ETH Zurich**: Program Verification, Formal Methods, Viper framework

### Standards Bodies
- **ACM**: CS2023 Curriculum Guidelines
- **IEEE**: SWEBOK v4, SE2014
- **Joint Task Force**: CC2020 Computing Curricula

### Cognitive Frameworks
- **Bloom's Revised Taxonomy**: Anderson & Krathwohl (2001)
- **Dreyfus Model**: Novice → Expert progression

---

**Created:** 2026-03-07
**Updated:** 2026-03-07 (Curriculum-based upgrade)
**Purpose:** Prevent false "complete" claims; enable user verification; stop going in circles
**Enforcement:** Mandatory for all PhD-level brain builds
**Research Basis:** MIT, Stanford, CMU, Berkeley, Caltech, Georgia Tech, ETH Zurich, Princeton, Harvard, ACM, IEEE

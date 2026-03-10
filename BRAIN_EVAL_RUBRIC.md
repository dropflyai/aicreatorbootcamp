# PX1000 Universal Brain Evaluation Rubric

> **Applies to ALL 37 brains.** Domain-agnostic scoring across 8 weighted dimensions.

---

## Purpose

Every brain in the PX1000 system -- from CEO to Video -- must meet the same structural
and quality bar. This rubric provides a single, universal framework for evaluating any
brain regardless of its specialty domain.

The rubric measures **how well a brain is built**, not **what it knows**. A Sales Brain
and an Engineering Brain are held to the same standards of governance, structure,
actionability, and completeness.

---

## Scoring Overview

| Dimension               | Weight | What It Measures                                            |
|--------------------------|--------|-------------------------------------------------------------|
| Governance               | 15%    | CLAUDE.md quality, authority hierarchy, commit rules        |
| Domain Knowledge         | 20%    | Depth and accuracy of domain-specific content               |
| Structure                | 15%    | Organization, progressive disclosure, navigation            |
| Actionability            | 15%    | Templates, checklists, recipes, runbooks, decision trees    |
| Memory and Learning      | 10%    | Experience logging, pattern extraction, regression tracking |
| Cross-Brain Integration  | 10%    | Delegation rules, handoff protocols, who-to-call docs       |
| Self-Evaluation          | 5%     | Scoring rubric, quality metrics, continuous improvement     |
| Completeness             | 10%    | No stubs, no placeholder content, all files substantive     |

**Maximum Score: 5.00**

---

## Weighted Formula

OverallScore = (Governance * 0.15) + (DomainKnowledge * 0.20) + (Structure * 0.15) + (Actionability * 0.15) + (MemoryLearning * 0.10) + (CrossBrainIntegration * 0.10) + (SelfEvaluation * 0.05) + (Completeness * 0.10)

---

## Rating Scale

| Score Range  | Rating           | Meaning                                                      |
|--------------|------------------|--------------------------------------------------------------|
| 4.50 - 5.00  | Exceptional      | Production-ready, reference-quality brain                    |
| 3.50 - 4.49  | Strong           | Solid brain with minor gaps; ready for most tasks            |
| 2.50 - 3.49  | Competent        | Functional but needs improvement in several dimensions       |
| 1.50 - 2.49  | Below Standard   | Significant gaps; not reliable for autonomous operation      |
| 0.00 - 1.49  | Inadequate       | Stub or skeleton only; requires full build-out               |

---

## Dimension 1: Governance (15%)

How well does the brain govern itself? Can it operate autonomously without causing harm?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | CLAUDE.md missing or under 20 lines. No commit rules. No authority model. |
| Below Standard | 2 | CLAUDE.md exists with 50+ lines. Basic role description. No commit rules or conflict resolution. |
| Competent | 3 | CLAUDE.md 100+ lines. Has commit rules (must ask before committing). Basic authority model. |
| Strong | 4 | CLAUDE.md 150+ lines. 3+ authority levels defined. Commit rules with preflight checks. Conflict resolution documented. |
| Exceptional | 5 | CLAUDE.md 150+ lines. 5+ authority levels. Mandatory preflight checklist before any action. Explicit stop conditions. Conflict resolution with escalation paths. Cross-brain delegation rules with handoff contracts. |

### What to Check
- CLAUDE.md exists and is substantive
- Authority hierarchy explicitly defined (CEO > CTO > Lead > Brain)
- Commit rules present with COMMIT RULE header
- Stop conditions listed
- Preflight checklist (Before any task, verify...)
- Conflict resolution (If two brains disagree...)
- Scope boundaries (This brain does NOT handle...)
---

## Dimension 2: Domain Knowledge (20%)

How deep and accurate is the brain domain expertise?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | Fewer than 5 .md files. Surface-level content only. No frameworks or models. |
| Below Standard | 2 | 10+ .md files with 500+ total lines. Covers basics but lacks depth. |
| Competent | 3 | 20+ .md files with 2000+ total lines. Covers theory and practice. Includes frameworks. |
| Strong | 4 | 30+ .md files with 5000+ total lines. Expert-level content. Formal frameworks with worked examples. |
| Exceptional | 5 | 35+ .md files with 8000+ total lines. PhD-level depth. Academic citations. Formal frameworks with theory + practice + anti-patterns. |

### What to Check
- Total .md file count and total line count
- Presence of formal frameworks
- Anti-patterns and failure modes documented
- Theory grounded in practice with concrete examples
- Progressive depth from fundamentals to advanced topics
- Citations or references to authoritative sources

---

## Dimension 3: Structure (15%)

How well-organized is the brain? Can a new user navigate it intuitively?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | Flat directory with random file names. No organization pattern. |
| Below Standard | 2 | 3+ subdirectories. Some grouping by topic but inconsistent naming. |
| Competent | 3 | 3+ numbered directories (e.g., 01-Foundations/, 02-Strategy/). Consistent naming. |
| Strong | 4 | 5+ numbered directories. At least 1 README.md for navigation. Clear taxonomy. |
| Exceptional | 5 | 8+ numbered directories. 2+ README.md files (root + subdirectories). Learning paths. Progressive disclosure. |

### What to Check
- Numbered directory prefixes (01-, 02-, etc.)
- README.md at brain root and in subdirectories
- Consistent naming convention across all files
- Logical grouping (foundations to intermediate to advanced)
- No orphan files at root level
- Clear taxonomy that matches the domain

---

## Dimension 4: Actionability (15%)

Can someone immediately USE this brain to get work done?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | Content is purely conceptual. No templates, checklists, or step-by-step guides. |
| Below Standard | 2 | Has at least 1 of: templates, checklists, recipes/runbooks, or decision frameworks. |
| Competent | 3 | Has at least 2 of: templates, checklists, recipes/runbooks, or decision frameworks. |
| Strong | 4 | Has at least 3 of the above. Multiple ready-to-use artifacts. |
| Exceptional | 5 | Has all 4: templates, checklists, recipes/runbooks, AND decision frameworks. Step-by-step procedures. Decision trees. Output contracts. |

### What to Check
- Templates: Fill-in-the-blank documents
- Checklists: Checkbox items for repeatable processes
- Recipes / Runbooks: Step-by-step procedures
- Decision Frameworks: Decision trees or matrices
- Output contracts: what each template/recipe produces

---

## Dimension 5: Memory and Learning (10%)

Does the brain learn from experience? Can it avoid repeating mistakes?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | No memory directory. No experience tracking. Brain is stateless. |
| Below Standard | 2 | Memory/ directory exists but is empty or has minimal content. |
| Competent | 3 | Memory/ExperienceLog.md exists with structured entries. |
| Strong | 4 | ExperienceLog.md AND Patterns.md exist. Patterns extracted from experience. |
| Exceptional | 5 | ExperienceLog + Patterns + cross-brain learning references. Regression tracking. |

### What to Check
- Memory/ directory exists
- Memory/ExperienceLog.md with structured entries
- Memory/Patterns.md with extracted patterns
- Cross-brain references
- Regression tracking
- Feedback loops

---

## Dimension 6: Cross-Brain Integration (10%)

Can this brain collaborate with other brains effectively?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | No mention of other brains. Operates in complete isolation. |
| Below Standard | 2 | References other brains by name. |
| Competent | 3 | Has delegation rules (Call X Brain when Y condition is true). |
| Strong | 4 | Delegation rules + handoff protocols. Documents what to pass and expect back. |
| Exceptional | 5 | Full integration spec: delegation rules, handoff contracts, shared vocabulary, I/O format specs. |

### What to Check
- References to other brains in CLAUDE.md
- Call X brain when... rules
- Handoff protocols
- Shared vocabulary
- Input/output format specifications
- Dependency map

---

## Dimension 7: Self-Evaluation (5%)

Can the brain assess its own quality and improve over time?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | No evaluation capability. No quality metrics. |
| Below Standard | 2 | Mentions quality in passing but no formal metrics. |
| Competent | 3 | Has a scoring rubric or evaluation file. |
| Strong | 4 | Domain-specific evaluation rubric with quantitative metrics. |
| Exceptional | 5 | Dedicated eval/ directory with rubric, metrics, improvement tracking, and targets. |

### What to Check
- eval/ directory exists
- Domain-specific scoring rubric
- Quantitative metrics defined for the domain
- Score history tracking
- Improvement targets and plans

---

## Dimension 8: Completeness (10%)

Is the brain fully built out, or does it have stubs and placeholders?

| Level | Score | Criteria |
|-------|-------|----------|
| Inadequate | 1 | 50%+ of .md files are stubs (under 10 bytes). Mostly placeholder content. |
| Below Standard | 2 | Less than 50% stub files. Some real content but many gaps. |
| Competent | 3 | Less than 20% stub files. Most files have substantive content. |
| Strong | 4 | Zero stub files. Fewer than 5 files under 100 bytes. |
| Exceptional | 5 | Zero files under 10 bytes. Zero files under 100 bytes. All .md files 50+ lines. |

### What to Check
- File sizes (any files under 10 bytes = stubs)
- File sizes (any files under 100 bytes = likely incomplete)
- Search for TODO, TBD, PLACEHOLDER, FIXME in content
- Every section header has content beneath it

---

## How to Use This Rubric

### Manual Evaluation
1. Open a brain directory
2. Score each of the 8 dimensions (1-5)
3. Apply the weighted formula
4. Record the score in the brain eval/ directory

### Automated Evaluation

Evaluate a single brain:
  cd prototype_x1000/agents && python -m agents.tools.brain_evaluator engineering

Evaluate all 37 brains:
  cd prototype_x1000/agents && python -m agents.tools.brain_evaluator --all

### Improvement Workflow
1. Run brain_evaluator --all to get current scores
2. Identify brains with the lowest overall scores
3. For each low-scoring brain, check which dimensions drag it down
4. Address the lowest-scoring dimension first (highest impact)
5. Re-run evaluation to confirm improvement
6. Target: All brains at Competent (2.50+) by end of Phase 1

---

## Automated vs. Manual Assessment

| Dimension              | Auto-Checkable | Manual Needed For                                |
|------------------------|----------------|--------------------------------------------------|
| Governance             | Mostly         | Quality of authority hierarchy, rule clarity      |
| Domain Knowledge       | Partially      | Accuracy, depth, correctness of content           |
| Structure              | Mostly         | Logical flow, progressive disclosure quality      |
| Actionability          | Partially      | Usability of templates, quality of decision trees |
| Memory and Learning    | Mostly         | Quality of extracted patterns                     |
| Cross-Brain Integration| Partially      | Correctness of delegation rules                   |
| Self-Evaluation        | Mostly         | Quality of metrics chosen                         |
| Completeness           | Fully          | N/A - file size checks are definitive             |

---

## Version History

| Date       | Version | Changes                        |
|------------|---------|--------------------------------|
| 2026-02-19 | 1.0     | Initial universal rubric       |

---

**This rubric is the single source of truth for brain quality assessment across the entire PX1000 system.**

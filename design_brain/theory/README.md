# Design Brain -- Theory Module

> PhD-level cognitive science, HCI research, and design theory foundations.

This module provides the formal theoretical foundations that elevate the Design Brain from practitioner-level to research-grade. These files are **reference material** -- they inform design decisions with rigorous academic grounding.

---

## Contents

| # | File | Topic | Lines |
|---|---|---|---|
| 1 | `cognitive_science.md` | Perception, attention, memory, decision-making | ~330 |
| 2 | `hci_foundations.md` | Fitts' Law, Hick's Law, GOMS, Norman's model, distributed cognition | ~340 |
| 3 | `visual_perception.md` | Color science, typography perception, visual search, motion, depth | ~340 |
| 4 | `information_architecture.md` | Information foraging, card sorting, faceted classification, findability | ~340 |
| 5 | `interaction_design_theory.md` | Affordance theory, activity theory, embodied interaction, CSCW | ~350 |
| 6 | `usability_engineering.md` | Heuristic evaluation, SUS, NASA-TLX, ISO 9241, cognitive walkthrough | ~340 |
| 7 | `design_research_methods.md` | Statistics, qualitative methods, A/B testing, eye tracking, triangulation | ~340 |
| 8 | `accessibility_science.md` | Disability models, universal design, WCAG, assistive technology, law | ~340 |
| 9 | `design_philosophy.md` | Semiotics, Rams, Bauhaus, Japanese aesthetics, ethics, design justice | ~340 |
| 10 | `emotional_design.md` | Norman's 3 levels, affect models, persuasive design, TAM/UTAUT | ~350 |

---

## Prerequisite Map

The modules have dependencies. Read foundational modules before advanced ones.

```
                    ┌─────────────────────┐
                    │  cognitive_science   │  (START HERE)
                    │  (foundational)      │
                    └──┬──────────┬───────┘
                       │          │
              ┌────────▼───┐  ┌──▼───────────┐
              │hci_        │  │visual_       │
              │foundations  │  │perception    │
              └──┬─────┬───┘  └──┬───────────┘
                 │     │         │
    ┌────────────▼┐  ┌─▼─────────▼──────┐
    │interaction_ │  │usability_        │
    │design_theory│  │engineering       │
    └─────────────┘  └──┬───────────────┘
                        │
              ┌─────────▼──────────┐
              │design_research_    │
              │methods             │
              └────────────────────┘

  Independent modules (no strict prerequisites):
  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────────┐
  │information_       │  │design_           │  │emotional_       │
  │architecture       │  │philosophy        │  │design           │
  └───────────────────┘  └──────────────────┘  └─────────────────┘

  Integrative module (benefits from all others):
  ┌───────────────────┐
  │accessibility_     │
  │science            │
  └───────────────────┘
```

---

## Reading Order

### Path 1: Core Foundations (Recommended Start)

1. **cognitive_science.md** -- Perception, attention, memory, decision-making. Everything else builds on this.
2. **hci_foundations.md** -- Mathematical models of human performance (Fitts', Hick's, GOMS).
3. **visual_perception.md** -- Color science, typography, visual search, motion.

### Path 2: Design Practice Theory

4. **interaction_design_theory.md** -- Affordances, activity theory, embodied interaction.
5. **usability_engineering.md** -- Evaluation methods, metrics, standards.
6. **design_research_methods.md** -- How to study users rigorously.

### Path 3: Domain Knowledge

7. **information_architecture.md** -- Information foraging, classification, findability.
8. **accessibility_science.md** -- Disability studies, WCAG, assistive technology.
9. **emotional_design.md** -- Affect, aesthetics, persuasion, acceptance.

### Path 4: Philosophy and Ethics

10. **design_philosophy.md** -- Semiotics, design traditions, ethics, justice.

---

## How to Use These Files

### During Design Work

Reference specific sections when making design decisions:

- **Choosing button sizes?** See `hci_foundations.md` Section 1 (Fitts' Law).
- **Deciding on navigation structure?** See `information_architecture.md` Sections 1-3 (foraging, berry-picking, faceted classification).
- **Setting contrast ratios?** See `accessibility_science.md` Section 7 and `visual_perception.md` Section 1.
- **Evaluating a design?** See `usability_engineering.md` Sections 2-5 (heuristic evaluation, SUS, cognitive walkthrough).
- **Planning user research?** See `design_research_methods.md` (full file).
- **Justifying design decisions to stakeholders?** Cite the specific theory and research.

### During Design Reviews

Use theoretical frameworks to structure critique:

- Norman's 7 Stages of Action: Can users figure out what to do? Can they tell what happened?
- Cognitive Load Theory: Is the intrinsic load appropriate? Is extraneous load minimized?
- Gestalt Principles: Is grouping clear? Is figure-ground unambiguous?
- Accessibility: Does it meet WCAG AA? Does it work with assistive technology?

### During Research Planning

Use `design_research_methods.md` to:
- Select appropriate methods for the research question
- Calculate required sample sizes
- Choose appropriate statistical tests
- Plan for triangulation

---

## Key Researchers Index

| Researcher | Primary Contribution | Module |
|---|---|---|
| Baddeley, A. | Working memory model | cognitive_science |
| Beaudouin-Lafon, M. | Instrumental interaction | interaction_design_theory |
| Braun, V. & Clarke, V. | Thematic analysis | design_research_methods |
| Brooke, J. | System Usability Scale (SUS) | usability_engineering |
| Costanza-Chock, S. | Design justice | design_philosophy |
| Dourish, P. | Embodied interaction | interaction_design_theory |
| Dunne, A. & Raby, F. | Critical/speculative design | design_philosophy |
| Engestrom, Y. | Activity theory (expanded) | interaction_design_theory |
| Fitts, P. | Fitts' Law | hci_foundations |
| Fogg, B.J. | Behavior model | emotional_design |
| Friedman, B. | Value Sensitive Design | design_philosophy |
| Gibson, J.J. | Ecological affordances | interaction_design_theory |
| Hassenzahl, M. | Hedonic/pragmatic quality | emotional_design |
| Hutchins, E. | Distributed cognition | hci_foundations |
| Kahneman, D. | Dual-process theory | cognitive_science |
| Mace, R. | Universal design | accessibility_science |
| Miller, G.A. | 7 +/- 2 | cognitive_science |
| Morville, P. | UX honeycomb, findability | emotional_design, information_architecture |
| Nielsen, J. | Heuristic evaluation, discount usability | usability_engineering |
| Norman, D. | 7 stages, affordances, emotional design | hci_foundations, interaction_design_theory, emotional_design |
| Pirolli, P. & Card, S. | Information foraging | information_architecture |
| Rams, D. | 10 principles of good design | design_philosophy |
| Ranganathan, S.R. | Faceted classification | information_architecture |
| Russell, J. | Circumplex model of affect | emotional_design |
| Shneiderman, B. | Direct manipulation | interaction_design_theory |
| Suchman, L. | Situated action | interaction_design_theory |
| Sweller, J. | Cognitive load theory | cognitive_science |
| Tractinsky, N. | Aesthetic-usability effect | emotional_design |
| Treisman, A. | Feature Integration Theory, attenuation | cognitive_science, visual_perception |
| Venkatesh, V. | TAM/UTAUT | emotional_design |
| Wertheimer, M. | Gestalt principles | cognitive_science |

---

## Relationship to Existing Brain Files

These theory files provide the **why** behind the **what** in the existing brain files:

| Existing File | Theoretical Foundation |
|---|---|
| `DesignPlaybook.md` | cognitive_science, hci_foundations |
| `ComponentSpec.md` | hci_foundations (Fitts' Law targets), visual_perception (contrast) |
| `Patterns/*` | interaction_design_theory (affordances), cognitive_science (schemas) |
| `Tokens/*` | visual_perception (color science), accessibility_science (contrast ratios) |
| `eval/A11yRules.md` | accessibility_science (WCAG, assistive technology) |
| `eval/UXScore.md` | usability_engineering (SUS, heuristics), emotional_design (hedonic/pragmatic) |
| `RefactorChecklist.md` | cognitive_science (cognitive load), hci_foundations (Norman's stages) |
| `3-Architecture/*` | information_architecture (foraging, classification, findability) |
| `6-Testing/*` | usability_engineering, design_research_methods |
| `2-Research/*` | design_research_methods (qualitative methods, triangulation) |

---

**This theory module is reference material. It does not modify existing brain files or protocols.**

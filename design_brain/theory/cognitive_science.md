# Cognitive Science Foundations for Design

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** None (foundational module)
> **Related Modules:** visual_perception.md, hci_foundations.md, emotional_design.md

---

## 1. Perception Theory

### 1.1 Gestalt Principles of Perceptual Organization

The Gestalt school (Wertheimer, Koffka, Kohler, c. 1912-1935) established that perception is not a passive aggregation of sensory data but an active organizational process. The central thesis is that the whole is qualitatively different from the sum of its parts.

#### Principle of Proximity (Wertheimer, 1923)

**Formal Definition:** Elements that are spatially or temporally close to one another are perceived as belonging to the same group. Mathematically, for elements e_i and e_j, if d(e_i, e_j) < threshold_t, then P(group(e_i, e_j)) increases monotonically as d decreases.

**Design Implication:** Spacing is the primary grouping mechanism in interface design. Related form fields, navigation items, and content sections must use proximity as the first-order organizational signal before relying on borders, color, or labels.

**Empirical Basis:** Kubovy & van den Berg (2008) demonstrated that grouping strength follows a decreasing exponential function of inter-element distance.

#### Principle of Similarity

**Formal Definition:** Elements sharing visual attributes (color, shape, size, orientation, texture) are perceived as belonging to the same group. When proximity and similarity conflict, the outcome depends on relative salience of each cue (Quinlan & Wilton, 1998).

**Design Implication:** Consistent visual treatment of functionally equivalent elements (all buttons share the same style, all links share the same color) leverages similarity to create implicit categorization without explicit labels.

#### Principle of Closure

**Formal Definition:** The perceptual system completes incomplete figures by filling in missing information to form a closed, bounded region. This operates even when the physical stimulus contains gaps, provided sufficient contour information exists for extrapolation.

**Design Implication:** Icons and logos can use implied shapes rather than fully rendered outlines. Progress indicators, partially loaded states, and skeleton screens all exploit closure -- users perceive the complete structure from partial cues.

#### Principle of Continuity (Good Continuation)

**Formal Definition:** Elements arranged along a smooth, continuous path are perceived as related. The visual system prefers interpretations that minimize abrupt changes in direction. Formally, given a curve C, the preferred perceptual continuation minimizes curvature variation (the minimum-energy principle).

**Design Implication:** Alignment in layouts creates implicit visual connections. Navigation breadcrumbs, step indicators, and timelines use continuity to convey sequence and progression.

#### Principle of Figure-Ground Segregation

**Formal Definition:** The visual field is automatically parsed into a figure (the object of attention, bounded, with form) and a ground (unbounded, formless, extending behind the figure). Factors favoring figure assignment include: smaller area, convexity, symmetry, enclosure, lower region, and higher contrast (Rubin, 1915; Peterson & Gibson, 1994).

**Design Implication:** Modal dialogs, dropdown menus, and toast notifications must establish clear figure-ground relationships through elevation (shadows), contrast, and dimming of background content.

#### Principle of Common Fate

**Formal Definition:** Elements that move together (same direction and velocity) are perceived as a unified group. This extends to elements that change state simultaneously (e.g., color, opacity).

**Design Implication:** Coordinated animations group elements perceptually. When expanding a card, all child elements should animate together to maintain perceptual unity.

#### Principle of Pragnanz (Law of Good Form)

**Formal Definition:** Among all possible perceptual organizations, the one that is selected is the simplest, most regular, most symmetric -- the one with minimum information content (Hochberg & McAlister, 1953). This is the overarching meta-principle governing all other Gestalt laws.

**Design Implication:** Interface layouts should use regular grids, consistent spacing, and symmetric arrangements. Visual "noise" or irregularity forces the perceptual system to work harder, increasing cognitive load.

---

## 2. Attention

### 2.1 Broadbent's Filter Theory (1958)

**Model:** Sensory information enters a buffer. A selective filter (based on physical characteristics such as location, color, pitch) passes only the attended channel for further semantic processing. Unattended information is blocked at the filter.

**Architecture:**
```
Sensory Input --> Sensory Buffer --> Selective Filter --> Limited Capacity Channel --> Response
                                      (physical features)
```

**Limitation:** Cannot explain the "cocktail party effect" (Moray, 1959) where unattended channels carrying one's own name break through the filter.

**Design Application:** Physical salience (color, size, motion, position) determines what captures attention in an interface. Critical alerts must differ on physical features, not just semantic content.

### 2.2 Treisman's Attenuation Model (1964)

**Revision of Broadbent:** The filter does not block unattended information entirely but attenuates it. Highly relevant signals (own name, danger words) have permanently lowered activation thresholds and can break through even when attenuated.

**Design Application:** Important notifications should use multiple channels (visual + auditory + haptic) to ensure they exceed attenuated thresholds. Error states should exploit permanently lowered thresholds for danger signals (red color, warning iconography).

### 2.3 Inattentional Blindness (Mack & Rock, 1998; Simons & Chabris, 1999)

**Phenomenon:** Observers fail to notice unexpected but fully visible stimuli when attention is engaged elsewhere. The famous "invisible gorilla" experiment demonstrated that approximately 50% of observers missed a person in a gorilla suit walking through a basketball game they were watching.

**Theoretical Basis:** Attention is required for conscious perception. Without directed attention, even salient stimuli can go unnoticed. This is distinct from change blindness (failure to detect changes across interruptions).

**Design Application:** Critical system status changes that occur while the user is focused on a task may be completely missed. Designs must actively interrupt attention for critical information (modal dialogs, inline errors at point of focus) rather than relying on peripheral status indicators.

### 2.4 Change Blindness

**Phenomenon:** Observers fail to detect large changes in visual scenes when the change occurs during a brief interruption (saccade, flicker, occlusion). Rensink, O'Regan, & Clark (1997) demonstrated this with the "flicker paradigm."

**Design Application:** Page transitions, tab switches, and any content replacement that occurs during a visual interruption (loading spinner, animation) may cause users to miss the change. Changes should be animated continuously or highlighted explicitly after transition.

### 2.5 Selective Attention and Feature Integration Theory

See `visual_perception.md` for Treisman's Feature Integration Theory and its direct implications for visual search in interfaces.

---

## 3. Working Memory

### 3.1 Miller's Magical Number 7 +/- 2 (1956)

**Finding:** The span of immediate memory (and absolute judgment) is approximately 7 +/- 2 items (chunks). This is a capacity limit on the number of distinct items that can be held in working memory simultaneously.

**Critical Nuance:** The limit is on chunks, not on raw elements. Chunking (organizing information into meaningful units based on long-term memory) expands effective capacity. "FBI-CIA-IBM" is 3 chunks (9 letters); "IFBCAIIBM" is 9 chunks (9 letters).

**Modern Revision:** Cowan (2001) argued the true capacity limit is closer to 4 +/- 1 items when chunking is controlled for. This lower estimate has significant design implications.

**Design Application:** Navigation menus, form sections, dashboard widgets, and option sets should generally be organized into groups of 3-5 items. Progressive disclosure reduces the number of simultaneously active items.

### 3.2 Baddeley's Working Memory Model (1974, revised 2000)

**Architecture:**

```
                    ┌──────────────────────┐
                    │   Central Executive   │
                    │  (attentional control)│
                    └──┬─────┬─────┬───────┘
                       │     │     │
              ┌────────┘     │     └────────┐
              ▼              ▼              ▼
    ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
    │Phonological  │  │  Episodic    │  │Visuospatial  │
    │   Loop       │  │  Buffer      │  │  Sketchpad   │
    │(verbal/      │  │(integration) │  │(spatial/     │
    │ acoustic)    │  │              │  │ visual)      │
    └─────────────┘  └──────────────┘  └──────────────┘
```

**Components:**
- **Central Executive:** Attentional control system that directs focus, coordinates subsystems, and manages task switching. Limited capacity.
- **Phonological Loop:** Stores verbal/acoustic information via rehearsal. Capacity: ~2 seconds of speech. Subject to phonological similarity effect and word-length effect.
- **Visuospatial Sketchpad:** Maintains visual and spatial information. Involved in mental imagery, spatial reasoning, and navigation.
- **Episodic Buffer (added 2000):** Integrates information from the subsystems and long-term memory into coherent episodes. Limited to ~4 chunks.

**Design Application:** Interfaces that require simultaneous verbal processing (reading labels) and spatial processing (navigating layout) load different subsystems, allowing parallel processing. Interfaces that double-load one subsystem (e.g., reading instructions while reading data) create interference.

### 3.3 Cognitive Load Theory (Sweller, 1988, 1994)

**Central Claim:** Learning and task performance are constrained by working memory limitations. Three types of cognitive load:

**Intrinsic Load:** Inherent to the task complexity. Determined by element interactivity -- the number of elements that must be processed simultaneously. Cannot be reduced without simplifying the task itself.

**Extraneous Load:** Imposed by poor instructional or interface design. Does not contribute to learning or task completion. Must be minimized. Examples: inconsistent navigation, decorative graphics, redundant information, split attention between sources.

**Germane Load:** Devoted to schema construction and automation. Beneficial cognitive effort that contributes to learning. Should be facilitated.

**Total Load Equation:** Intrinsic + Extraneous + Germane <= Working Memory Capacity

**Key Effects from CLT Research:**
- **Split-Attention Effect:** Integrating information sources (e.g., labels directly on diagrams rather than in separate legends) reduces extraneous load.
- **Redundancy Effect:** Presenting the same information in multiple formats simultaneously increases load rather than helping.
- **Modality Effect:** Presenting visual and auditory information together is superior to visual-only when both must be processed.
- **Expertise Reversal Effect:** Design features that help novices (scaffolding, worked examples) can increase load for experts.

**Design Application:** Progressive disclosure, contextual help, inline validation, and wizards all function to manage cognitive load by presenting only the information needed at each decision point. Design complexity should be proportional to user expertise.

---

## 4. Long-Term Memory

### 4.1 Encoding

**Levels of Processing (Craik & Lockhart, 1972):** Deeper processing (semantic, meaningful elaboration) produces stronger, more durable memories than shallow processing (structural, phonological).

**Dual Coding Theory (Paivio, 1971):** Information encoded both verbally and visually is better remembered than information encoded in only one modality. Two independent but interconnected memory systems (verbal and imaginal) provide redundant retrieval paths.

**Design Application:** Combining icons with labels, illustrations with text descriptions, and diagrams with explanations leverages dual coding for better retention of interface concepts and navigation structures.

### 4.2 Retrieval

**Encoding Specificity (Tulving & Thomson, 1973):** Retrieval is most effective when the context at retrieval matches the context at encoding. This includes environmental context, emotional state, and cognitive state.

**Recognition vs. Recall:** Recognition (identifying previously encountered items) is easier than recall (generating items from memory). Recognition requires only a familiarity signal; recall requires effortful search.

**Design Application:** Menus, dropdowns, and autocomplete exploit recognition memory. Command-line interfaces, search boxes, and blank forms require recall. Novice-friendly interfaces favor recognition; expert interfaces can leverage recall for speed.

### 4.3 Schema Theory (Bartlett, 1932; Rumelhart, 1980)

**Definition:** Schemas are organized knowledge structures in long-term memory that represent concepts, situations, and action sequences. They guide perception, attention, encoding, and retrieval.

**Properties:**
- Schemas have variables (slots) with default values
- Schemas can embed other schemas (hierarchical)
- Schemas guide expectations and fill in missing information
- Schema-inconsistent information may be distorted to fit (assimilation)
- Novel information that violates schemas strongly may be better remembered (von Restorff effect / schema-violation effect)

**Design Application:** Users have schemas for common interface patterns (shopping cart, search bar, settings gear icon). Leveraging established schemas reduces learning time. Violating schemas creates confusion unless the violation provides clear benefit and is explicitly taught.

### 4.4 Mental Models (Johnson-Laird, 1983; Norman, 1983)

**Definition:** Internal representations of how a system works. Users construct mental models from interaction, instruction, and analogy. Mental models are typically incomplete, unstable, and may contain errors, but they are functional -- they allow users to predict system behavior.

**Design Application:** The gap between the designer's conceptual model and the user's mental model is a primary source of usability problems. Transparent system behavior, consistent feedback, and clear affordances help users build accurate mental models.

---

## 5. Decision-Making

### 5.1 Dual-Process Theory (Kahneman, 2011)

**System 1 (Fast Thinking):**
- Automatic, effortless, rapid
- Operates on heuristics and pattern matching
- Handles routine decisions, emotional reactions, perceptual judgments
- Prone to systematic biases (anchoring, framing, availability)
- Always active, cannot be "turned off"

**System 2 (Slow Thinking):**
- Controlled, effortful, deliberate
- Handles complex reasoning, calculation, novel situations
- Limited capacity, easily depleted (ego depletion, Baumeister et al.)
- Can override System 1 but requires motivation and cognitive resources
- Activated when System 1 encounters unexpected events or explicit cognitive demands

**Interaction Between Systems:**
System 1 continuously generates impressions, feelings, and inclinations. System 2 monitors and may endorse, correct, or override them. Under cognitive load, time pressure, or fatigue, System 2 monitoring weakens and System 1 biases dominate.

**Design Application:**
- **For System 1:** Familiar patterns, clear visual hierarchy, strong defaults, and immediate feedback support fast, automatic processing. Most routine interactions should be designable for System 1.
- **For System 2:** Complex decisions (pricing plans, privacy settings, data deletion) require designs that slow users down, provide comparison tools, and reduce bias. Forced pauses, confirmation dialogs, and side-by-side comparisons engage System 2.
- **Bias Mitigation:** Default options exploit anchoring (use responsibly). Framing effects mean that presenting "95% success rate" vs. "5% failure rate" produces different decisions for the same information. Ethical design requires awareness of these biases.

### 5.2 Satisficing vs. Maximizing (Simon, 1956)

**Bounded Rationality:** Humans do not optimize -- they satisfice. They search for options until they find one that meets a minimum threshold of acceptability, then stop. Search is costly and working memory is limited.

**Design Application:** Users do not read all options before choosing. They scan and select the first reasonable match. Placing the most likely desired action first, using smart defaults, and reducing option sets supports satisficing behavior.

### 5.3 Prospect Theory (Kahneman & Tversky, 1979)

**Key Findings:**
- Losses are weighted approximately 2x more heavily than equivalent gains (loss aversion)
- The value function is concave for gains (risk averse) and convex for losses (risk seeking)
- People evaluate outcomes relative to a reference point, not in absolute terms

**Design Application:** Loss-framed messaging ("Don't lose your progress") is more motivating than gain-framed messaging ("Save your progress"). Free trial expiration leverages loss aversion. Progress indicators show what has been accomplished (loss if abandoned) rather than what remains.

---

## 6. Implications for Design Practice

### 6.1 Synthesis: From Theory to Interface

| Cognitive Principle | Design Guideline | Measurable Outcome |
|---|---|---|
| Working memory limits (4 +/- 1) | Max 5 items per group | Reduced error rates |
| Cognitive load theory | Progressive disclosure | Lower task abandonment |
| Recognition over recall | Visible options, menus | Faster task completion |
| Schema theory | Consistent patterns | Reduced learning time |
| Dual-process theory | Strong defaults for System 1 | Higher conversion rates |
| Loss aversion | Frame progress as accumulated | Lower abandonment rates |
| Gestalt grouping | Proximity-based layout | Better comprehension |
| Inattentional blindness | Active interruption for critical info | Fewer missed alerts |

### 6.2 Common Violations

1. **Overloaded dashboards** violate working memory limits and create excessive extraneous load
2. **Hidden navigation** (hamburger menus on desktop) forces recall instead of leveraging recognition
3. **Inconsistent patterns** across screens break schema expectations and increase learning cost
4. **Peripheral-only notifications** are missed due to inattentional blindness
5. **Undifferentiated option lists** without grouping violate Gestalt proximity and similarity

---

## References

- Baddeley, A. D. (2000). The episodic buffer: A new component of working memory? Trends in Cognitive Sciences, 4(11), 417-423.
- Broadbent, D. E. (1958). Perception and Communication. Pergamon Press.
- Cowan, N. (2001). The magical number 4 in short-term memory. Behavioral and Brain Sciences, 24(1), 87-114.
- Craik, F. I. M., & Lockhart, R. S. (1972). Levels of processing. Journal of Verbal Learning and Verbal Behavior, 11(6), 671-684.
- Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.
- Mack, A., & Rock, I. (1998). Inattentional Blindness. MIT Press.
- Miller, G. A. (1956). The magical number seven, plus or minus two. Psychological Review, 63(2), 81-97.
- Norman, D. A. (1983). Some observations on mental models. In D. Gentner & A. L. Stevens (Eds.), Mental Models. Erlbaum.
- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257-285.
- Treisman, A. M. (1964). Selective attention in man. British Medical Bulletin, 20(1), 12-16.
- Wertheimer, M. (1923). Untersuchungen zur Lehre von der Gestalt II. Psychologische Forschung, 4, 301-350.

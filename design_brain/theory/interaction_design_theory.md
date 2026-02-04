# Interaction Design Theory

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** cognitive_science.md, hci_foundations.md
> **Related Modules:** design_philosophy.md, emotional_design.md

---

## 1. Direct Manipulation (Shneiderman, 1983)

### 1.1 Core Principles

Ben Shneiderman defined direct manipulation as an interaction paradigm with three properties:

1. **Continuous representation of the object of interest.** Users can see the objects they are working with at all times. The state of the system is always visible.

2. **Physical actions or labeled button presses instead of complex syntax.** Users act on objects through pointing, clicking, dragging, and other spatial operations rather than typing commands.

3. **Rapid, incremental, reversible operations whose impact on the object of interest is immediately visible.** Each action produces visible feedback. Effects can be undone.

### 1.2 Theoretical Basis

Direct manipulation is grounded in the "distance" metaphor. The ideal interface has:
- **Minimal articulatory distance:** The physical actions required to express an intention are close to the intention itself (e.g., dragging an object to move it, rather than typing coordinates)
- **Minimal semantic distance:** The concepts in the interface map directly to the user's mental model of the domain (e.g., files-and-folders metaphor for document management)

### 1.3 Advantages

- **Novices learn quickly** through demonstration and exploration
- **Experts work efficiently** through rapid, fluid interaction
- **Error recovery is natural** through undo and direct reversal of actions
- **Anxiety is reduced** because the system state is always visible and actions are reversible

### 1.4 Limitations

- **Space-intensive:** Requires screen real estate for continuous representation
- **Not all operations are spatial.** Abstract operations (search, compute, filter by criteria) do not have natural spatial mappings.
- **Not all objects have visual representations.** Data relationships, system configurations, and abstract entities resist direct visual manipulation.
- **Repetitive tasks are inefficient.** Performing the same direct manipulation operation 100 times is slower than a single batch command.

### 1.5 Design Application

Direct manipulation is the default paradigm for consumer interfaces. Drag-and-drop file management, WYSIWYG editors, drawing tools, and slider controls are all instances. The paradigm should be extended to new domains where spatial metaphors apply (e.g., visual programming, dashboard layout, data flow visualization) and supplemented with command interfaces for repetitive or abstract operations.

---

## 2. Instrumental Interaction (Beaudouin-Lafon, 2000)

### 2.1 Theory

Michel Beaudouin-Lafon proposed instrumental interaction as a design model that extends direct manipulation. Instead of acting directly on objects, users act through **instruments** (tools) that mediate between the user and the objects of interest.

**Key Concepts:**
- **Domain Objects:** The data and content the user cares about (documents, images, data records)
- **Interaction Instruments:** The tools used to act on domain objects (selection tool, paintbrush, formatting toolbar, filter widget)
- **The instrument mediates** between the user's intention and the domain object's transformation

### 2.2 Design Dimensions

Beaudouin-Lafon defined dimensions for evaluating instruments:

**Degree of Indirection:**
- **Spatial offset:** How far is the instrument from the object it acts upon? (Inline editing = zero offset; menu bar commands = high offset)
- **Temporal offset:** How much delay between the action and the visible effect? (Real-time preview = zero offset; batch processing = high offset)

**Degree of Integration:**
- How many input degrees of freedom (DOF) does the instrument capture simultaneously? A scrollbar captures 1 DOF. A multi-touch gesture can capture 6+ DOF (position, rotation, scale for each finger).

**Degree of Compatibility:**
- How similar are the physical actions on the instrument to the resulting transformation of the object? Rotating a knob to rotate an object has high compatibility. Typing a number to set rotation has low compatibility.

### 2.3 Design Application

- **Minimize spatial offset** by placing controls near the objects they affect (inline editing, contextual toolbars, popover controls).
- **Minimize temporal offset** by providing real-time previews (live formatting, instant filter results, interactive sliders with immediate visual feedback).
- **Maximize integration** by capturing user intent in as few actions as possible (gesture-based operations, multi-parameter adjustments in a single control).
- **Maximize compatibility** by matching the physical form of the control to the semantic nature of the transformation (drag to resize, pinch to zoom, swipe to navigate).

---

## 3. Affordance Theory

### 3.1 Ecological Affordances (Gibson, 1979)

James J. Gibson defined affordances as the actionable properties of the environment relative to an organism. Affordances exist in the relationship between the organism and the environment -- they are neither purely physical properties nor purely subjective perceptions.

**Key Properties:**
- Affordances are **relative to the organism.** A chair affords sitting for a human but not for an elephant.
- Affordances exist **independently of perception.** A cliff affords falling-off whether the animal perceives the cliff or not.
- Affordances are **directly perceived** (in Gibson's ecological view) through information in the optic array, without requiring inference or mental representation.

**Examples:**
- A flat, rigid, horizontal surface at knee height affords sitting
- A graspable, throwable object of appropriate size affords grasping and throwing
- A walkable surface affords locomotion

### 3.2 Perceived Affordances (Norman, 1988)

Don Norman adapted Gibson's concept for design. Norman distinguished between:

**Real Affordances:** The actual physical properties of an object (a button can be pushed, a slider can be slid).

**Perceived Affordances:** What the user perceives as possible actions. A flat graphic that looks like a 3D button affords clicking (perceived) even though the screen surface does not physically afford pushing.

**Signifiers (Norman, 2013):** Norman later clarified that what designers actually control are **signifiers** -- perceptible cues that communicate where and how to act. Affordances are properties of the world; signifiers are communicative signals.

### 3.3 The Affordance-Signifier Distinction

| Concept | Definition | Example |
|---|---|---|
| **Affordance** | What action is actually possible | A touchscreen affords tapping |
| **Perceived Affordance** | What action the user thinks is possible | A flat button graphic affords clicking (perceptually) |
| **Signifier** | A cue that communicates where to act | An underlined blue text signals "click here" |
| **False Affordance** | Perceived action that is not actually possible | A decorative element that looks clickable but is not |
| **Hidden Affordance** | Possible action with no perceptible cue | A swipe gesture that is available but not signaled |

### 3.4 Design Application

- **Every interactive element must signal its interactivity** (signifier). Flat design's removal of visual depth cues often creates hidden affordances.
- **False affordances are serious usability defects.** Users who click on non-interactive elements experience frustration and lose trust. Audit designs for elements that look interactive but are not.
- **The cost of hidden affordances** is that users must discover them through exploration or instruction. Hidden affordances are acceptable only for shortcuts or expert features, never for primary actions.
- **Affordance conventions are culturally learned.** Underlines mean links (on the web). Blue text means tappable (on iOS). These conventions are powerful but fragile -- violating them for aesthetic reasons has real usability costs.

---

## 4. Activity Theory (Vygotsky, Leontiev, Engestrom)

### 4.1 Historical Development

Activity Theory originated in Soviet psychology (Vygotsky, 1920s-30s; Leontiev, 1940s-70s) and was adapted for HCI by Nardi (1996), Kaptelinin & Nardi (2006), and Engestrom (1987).

### 4.2 Core Structure: The Activity System

**Hierarchical Structure of Activity:**

```
Activity    ←→  Motive     (Why? The driving need)
  Action    ←→  Goal       (What? The conscious objective)
    Operation ←→ Conditions (How? The routine execution)
```

An activity is motivated by a need. It is accomplished through goal-directed actions. Each action is carried out via operations that are conditioned by the specific circumstances.

**Key Property:** Operations can be automated (unconscious, routine) until conditions change, at which point they must be elevated back to conscious actions. This is central to understanding expertise and breakdown.

### 4.3 Engestrom's Activity System Model (1987)

```
                    Instruments
                   (tools, signs)
                   ╱           ╲
                  ╱             ╲
               Subject ──────► Object ──► Outcome
                  ╲             ╱
                   ╲           ╱
          Rules ── Community ── Division of Labor
```

**Components:**
- **Subject:** The individual or group whose perspective is analyzed
- **Object:** The entity being transformed (the work, the material, the problem)
- **Instruments:** Tools (physical and conceptual) mediating the subject-object relationship
- **Community:** The social group sharing the same general object
- **Rules:** Norms, conventions, and regulations governing the activity
- **Division of Labor:** How tasks are distributed among community members

### 4.4 Contradictions as Design Drivers

Engestrom's key contribution is the concept of **contradictions** -- structural tensions within or between elements of the activity system that drive development and change.

**Types of Contradictions:**
1. **Primary:** Within a single element (e.g., the tool is both enabling and limiting)
2. **Secondary:** Between elements (e.g., new tools conflict with old rules)
3. **Tertiary:** Between the current activity system and a more advanced version
4. **Quaternary:** Between the activity system and neighboring systems

**Design Application:** UX research should identify contradictions in the user's activity system. These contradictions are the most productive targets for design intervention, as they represent genuine friction in the user's practice.

### 4.5 HCI Application

Activity Theory provides a framework for understanding tool use that goes beyond task analysis:
- Tools are not neutral -- they shape the activity and the user's cognition
- Breakdowns (when routine operations become conscious actions) reveal design problems
- Context is not a container but an active element of the activity
- Users are not isolated individuals but members of communities with shared practices

---

## 5. Situated Action (Suchman, 1987)

### 5.1 Core Argument

Lucy Suchman challenged the planning model of human action (the idea that behavior follows predetermined plans). Her ethnographic study of people using photocopiers showed that:

**Plans are resources for action, not determinants of action.** People do not execute pre-formulated plans step by step. Instead, they improvise moment by moment, using plans as loose guides while responding to the specific circumstances at hand.

### 5.2 Key Concepts

**Situated Action:** Every action is fundamentally situated -- it emerges from the specific, local, material circumstances of the moment. The same person with the same goal will act differently depending on the situation.

**Mutual Intelligibility:** Human communication (and human-machine communication) depends on the ability of each party to make sense of the other's actions in context. Machines lack this ability -- they cannot interpret human actions in the rich, situated way that humans interpret each other.

**Interactive Trouble:** When human-machine interaction breaks down, the problem is typically that the machine's model of the interaction is too rigid to accommodate the situated, improvised nature of human action.

### 5.3 Design Application

- **Do not assume users follow predefined paths.** Wizard-style interfaces should support non-linear navigation, backtracking, and skipping.
- **Provide rich contextual information** at every step so users can make situated decisions. Do not hide system state behind abstractions.
- **Support recovery from "wrong" paths.** Users will take unexpected actions. The system should support graceful recovery rather than punishing deviation from the "correct" flow.
- **Observe real use in real contexts.** Lab-based usability testing reveals interaction structure but misses the situated, contextual factors that shape real behavior. Contextual inquiry and field studies are essential.

---

## 6. Embodied Interaction (Dourish, 2001)

### 6.1 Theoretical Foundation

Paul Dourish drew on phenomenology (Heidegger, Merleau-Ponty) to argue that interaction is fundamentally embodied -- it takes place through our physical presence in the world, through our bodies, and through the physical and social environment.

### 6.2 Key Concepts

**Ready-to-Hand (Heidegger):** When a tool is working well, we do not attend to the tool itself -- we attend to the work through the tool. The tool becomes transparent, an extension of our body. This is the ideal state for interactive systems.

**Present-at-Hand (Heidegger):** When a tool breaks down or resists our intentions, it becomes the object of attention rather than the medium of action. This shift from ready-to-hand to present-at-hand is the phenomenological description of a usability breakdown.

**Embodied Cognition:** Cognition is not purely abstract information processing -- it is grounded in bodily experience. Spatial metaphors (up = more, close = related), gestural interactions (pinch, swipe, grab), and physical affordances are not mere conveniences but fundamental cognitive structures.

### 6.3 Design Application

- **Design for transparency.** The ideal interface disappears during use -- the user acts through it, not on it. Unnecessary chrome, dialogs, and confirmations break transparency.
- **Respect embodied metaphors.** Spatial organization (up/down, left/right, near/far) should be semantically consistent and aligned with cultural conventions (left-to-right progression in LTR cultures, vertical hierarchy with important items at top).
- **Support peripheral awareness.** Embodied interaction includes ambient awareness of the environment. Peripheral displays, ambient notifications, and background status indicators leverage the user's embodied awareness without demanding focal attention.

---

## 7. Tangible Interaction (Ishii & Ullmer, 1997)

### 7.1 Tangible User Interfaces (TUI)

Hiroshi Ishii proposed tangible user interfaces that bridge the physical and digital worlds by giving digital information physical form. Physical objects become input/output devices for digital systems.

**Key Properties:**
- **Physical representation:** Digital data has a physical manifestation that can be grasped, moved, and manipulated
- **Physical constraint:** The physical form constrains interaction possibilities (affordances in Gibson's sense)
- **Spatial mapping:** The physical arrangement of objects maps to digital relationships

### 7.2 MCRpd Framework (Ullmer & Ishii, 2000)

- **Model:** The underlying digital information model
- **Control:** The physical object used to manipulate the model
- **Representation:** The perceptual feedback (visual, auditory, haptic)
- **Physical-Digital Coupling:** The mapping between physical manipulation and digital effect

### 7.3 Design Application

While most interface design is screen-based, tangible interaction principles inform:
- **IoT interfaces** (physical controls for smart home, connected devices)
- **Data physicalization** (physical representations of data for collaborative analysis)
- **Mixed-reality interfaces** (AR/VR where physical and digital objects coexist)
- **Accessibility** (physical controls for users who cannot use touchscreens)

---

## 8. Social Computing and CSCW

### 8.1 Computer-Supported Cooperative Work

CSCW research (Grudin, 1994; Schmidt & Bannon, 1992) examines how technology mediates collaborative work.

**Time-Space Matrix (Johansen, 1988):**

| | Same Time (Synchronous) | Different Time (Asynchronous) |
|---|---|---|
| **Same Place** | Face-to-face meetings, shared displays | Shared physical workspaces, bulletin boards |
| **Different Place** | Video conferencing, real-time co-editing | Email, version control, wikis |

### 8.2 Awareness in Collaborative Systems

**Workspace Awareness (Gutwin & Greenberg, 2002):** Understanding of others' activities in a shared workspace. Includes:
- **Who:** Who is in the workspace?
- **What:** What are they doing?
- **Where:** Where are they working?
- **When:** When did they do it?
- **How:** How did they do it?

**Design Application:** Collaborative interfaces must provide awareness mechanisms (presence indicators, activity feeds, cursor/selection sharing, change highlights) without creating information overload. The challenge is maintaining ambient awareness without demanding focal attention.

### 8.3 Coordination Mechanisms

| Mechanism | Description | Digital Implementation |
|---|---|---|
| **Protocols** | Pre-agreed procedures | Workflow systems, approval chains |
| **Schedules** | Temporal coordination | Calendars, deadlines, sprint boards |
| **Shared artifacts** | Objects that coordinate through their state | Shared documents, kanban boards |
| **Communication** | Direct information exchange | Chat, comments, notifications |
| **Awareness** | Peripheral monitoring of others' activity | Presence indicators, activity feeds |

---

## 9. Multimodal Interaction

### 9.1 Modality Types

| Modality | Input Examples | Output Examples |
|---|---|---|
| **Visual** | Eye tracking, gesture recognition | Screen display, AR overlays |
| **Auditory** | Speech recognition, sound input | Speech synthesis, earcons, auditory icons |
| **Haptic** | Touch, pressure, force | Vibration, force feedback, texture |
| **Gestural** | Hand/body gesture, air gesture | -- |
| **Spatial** | Device orientation, location | Spatial audio, location-based content |

### 9.2 CARE Properties (Coutaz et al., 1995)

| Property | Definition | Design Implication |
|---|---|---|
| **Complementarity** | Modalities provide different information | Speech for commands + gesture for targets |
| **Assignment** | A modality is required for a specific input | Voice is assigned for hands-free operation |
| **Redundancy** | Multiple modalities convey the same information | Visual + auditory confirmation |
| **Equivalence** | Different modalities can achieve the same result | Type OR speak a command |

### 9.3 Design Application

- **Multimodal redundancy increases reliability.** Critical feedback should use 2+ modalities (visual + haptic for error, visual + auditory for notification).
- **Modality switching supports accessibility** and context adaptation. Hands-free (voice), eyes-free (audio + haptic), and silent (visual + haptic) modes should be supported where possible.
- **The "put that there" paradigm** (Bolt, 1980): Combining speech ("put that there") with gesture (pointing to source and destination) is more natural than either modality alone for spatial tasks.

---

## References

- Beaudouin-Lafon, M. (2000). Instrumental interaction: An interaction model for designing post-WIMP user interfaces. CHI '00 Proceedings, 446-453.
- Dourish, P. (2001). Where the Action Is: The Foundations of Embodied Interaction. MIT Press.
- Engestrom, Y. (1987). Learning by Expanding. Orienta-Konsultit.
- Gibson, J. J. (1979). The Ecological Approach to Visual Perception. Houghton Mifflin.
- Ishii, H., & Ullmer, B. (1997). Tangible bits: Towards seamless interfaces between people, bits and atoms. CHI '97 Proceedings, 234-241.
- Norman, D. A. (2013). The Design of Everyday Things: Revised and Expanded Edition. Basic Books.
- Shneiderman, B. (1983). Direct manipulation: A step beyond programming languages. Computer, 16(8), 57-69.
- Suchman, L. A. (1987). Plans and Situated Actions. Cambridge University Press.

# Accessibility Science

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** visual_perception.md, cognitive_science.md
> **Related Modules:** usability_engineering.md, design_philosophy.md

---

## 1. Disability Studies: Foundational Models

### 1.1 The Medical Model of Disability

**Definition:** Disability is located within the individual as a deficiency, impairment, or deviation from normal functioning. The "problem" is the person's body or mind, and the "solution" is medical treatment, rehabilitation, or assistive technology to normalize the individual.

**Characteristics:**
- Disability = individual deficit
- Focus on diagnosis and cure
- Professional authority over the disabled person's experience
- Disability is inherently negative

**Critique:** The medical model fails to account for the social, environmental, and systemic barriers that create disability. A wheelchair user is not disabled by their inability to walk -- they are disabled by stairs. The impairment is individual; the disability is environmental.

### 1.2 The Social Model of Disability (Oliver, 1983; UPIAS, 1976)

**Definition:** Disability is the result of the interaction between people with impairments and the barriers created by society. Society disables people by failing to accommodate human variation.

**Key Distinction:**
- **Impairment:** A physical, sensory, cognitive, or psychological difference in bodily or mental function
- **Disability:** The disadvantage or restriction caused by social organization that takes little or no account of people with impairments, thereby excluding them from participation

**Design Implication:** Inaccessible interfaces are not "unfortunate for disabled users" -- they are the product of design decisions that created the barrier. Accessibility is not charity; it is the removal of designer-created barriers.

### 1.3 The Biopsychosocial Model (WHO ICF, 2001)

The International Classification of Functioning, Disability and Health (ICF) integrates both models:

```
Health Condition (disorder/disease)
         │
         ├──► Body Functions & Structures ◄──┐
         │              │                    │
         │              ▼                    │
         ├──► Activity ◄──► Participation ◄──┤
         │                                   │
         │    Environmental      Personal    │
         └──► Factors       ◄──► Factors ◄───┘
```

**Design Application:** The ICF framework recognizes that functioning and disability exist on a continuum, influenced by environmental factors (including technology design). Every design decision is an environmental factor that can enable or disable participation.

### 1.4 Situational, Temporary, and Permanent Disability

| Type | Visual Example | Motor Example | Auditory Example | Cognitive Example |
|---|---|---|---|---|
| **Permanent** | Blind | Amputee | Deaf | Intellectual disability |
| **Temporary** | Eye surgery recovery | Broken arm | Ear infection | Concussion |
| **Situational** | Bright sunlight glare | Holding a baby | Noisy restaurant | Distracted/multitasking |

**Key Insight:** Accessibility features designed for permanent disabilities benefit far more people through temporary and situational use. Captions benefit deaf users, ESL speakers, people in noisy environments, and people watching video silently. The total addressable audience for accessibility features is vastly larger than the population with permanent disabilities.

---

## 2. Universal Design (Mace et al., 1997)

### 2.1 The Seven Principles

Ron Mace and colleagues at the Center for Universal Design at NC State defined seven principles:

| # | Principle | Definition | Digital Application |
|---|---|---|---|
| 1 | **Equitable Use** | Useful and marketable to people with diverse abilities | Same interface for all users; no separate "accessible version" |
| 2 | **Flexibility in Use** | Accommodates a wide range of preferences and abilities | Multiple interaction modes (mouse, keyboard, voice, touch) |
| 3 | **Simple and Intuitive** | Easy to understand regardless of experience, knowledge, language, or concentration level | Clear language, logical layout, consistent patterns |
| 4 | **Perceptible Information** | Communicates necessary information effectively regardless of ambient conditions or user's sensory abilities | Redundant coding (color + shape + text), multiple modalities |
| 5 | **Tolerance for Error** | Minimizes hazards and adverse consequences of accidental or unintended actions | Undo, confirmation dialogs, input validation, graceful error recovery |
| 6 | **Low Physical Effort** | Can be used efficiently and comfortably with minimum fatigue | Keyboard shortcuts, large targets, minimal repetitive actions |
| 7 | **Size and Space for Approach and Use** | Appropriate size and space regardless of body size, posture, or mobility | Responsive design, flexible layouts, adequate spacing |

### 2.2 Distinction: Universal Design vs. Accessible Design

**Universal Design:** Design for the widest possible range of users from the beginning. One design serves all.

**Accessible Design:** Design that meets specific accessibility standards (WCAG, Section 508). May involve separate accommodations or retrofitting.

**Ideal:** Universal design that inherently meets accessibility standards. In practice, universal design provides the foundation; specific accessibility requirements provide the minimum floor.

---

## 3. Inclusive Design (Microsoft, 2016)

### 3.1 Microsoft's Inclusive Design Framework

Microsoft's framework centers on three principles:

**1. Recognize Exclusion:** Exclusion happens when we solve problems using our own biases. Design for one, extend to many.

**2. Learn from Diversity:** People who are excluded from a design process are the experts on the barriers they face. Include them as co-designers.

**3. Solve for One, Extend to Many:** A design solution for a person with a permanent disability often extends to serve people with temporary and situational limitations.

### 3.2 The Persona Spectrum

The Persona Spectrum extends the design target from permanent disability to the full range of human ability:

```
Permanent         Temporary           Situational
─────────────────────────────────────────────────
One arm           Arm injury          New parent (holding baby)
Blind             Cataract recovery   Distracted driver
Deaf              Ear infection       Bartender in loud bar
Non-verbal        Laryngitis          Heavy accent in foreign country
```

**Design Application:** When justifying accessibility investment, quantify the full persona spectrum. Keyboard navigation serves not only users who cannot use a mouse but also power users, users with temporary injuries, and users in constrained environments.

---

## 4. WCAG Formal Conformance Model

### 4.1 WCAG Structure

The Web Content Accessibility Guidelines (W3C) are organized hierarchically:

```
Principles (4)
  └── Guidelines (13)
        └── Success Criteria (78 in WCAG 2.1)
              └── Sufficient Techniques
              └── Advisory Techniques
              └── Failures
```

### 4.2 The Four Principles (POUR)

| Principle | Meaning | Key Question |
|---|---|---|
| **Perceivable** | Information must be presentable to users in ways they can perceive | Can the user detect the content through at least one sense? |
| **Operable** | UI components and navigation must be operable | Can the user interact with all controls and navigate effectively? |
| **Understandable** | Information and operation of UI must be understandable | Can the user comprehend the content and predict interface behavior? |
| **Robust** | Content must be robust enough to be interpreted by assistive technologies | Does the content work with current and future user agents and AT? |

### 4.3 Conformance Levels

| Level | Meaning | Practical Standard |
|---|---|---|
| **A** | Minimum accessibility. Removes most severe barriers. | Legal minimum in many jurisdictions |
| **AA** | Addresses the biggest and most common barriers. | Standard target for web content; required by most regulations |
| **AAA** | Highest level. Not all content can meet all AAA criteria. | Aspirational for specific content types |

### 4.4 Key Success Criteria (Selected)

**Perceivable:**
- **1.1.1 Non-text Content (A):** All non-text content has text alternatives
- **1.3.1 Info and Relationships (A):** Information, structure, and relationships conveyed through presentation are available programmatically
- **1.4.3 Contrast (Minimum) (AA):** Text has contrast ratio of at least 4.5:1 (3:1 for large text)
- **1.4.11 Non-text Contrast (AA):** UI components and graphical objects have 3:1 contrast against adjacent colors

**Operable:**
- **2.1.1 Keyboard (A):** All functionality is available via keyboard
- **2.4.3 Focus Order (A):** Focusable components receive focus in a meaningful sequence
- **2.4.7 Focus Visible (AA):** Keyboard focus indicator is visible
- **2.5.5 Target Size (AAA, enhanced in 2.2):** Pointer input targets are at least 44x44 CSS pixels

**Understandable:**
- **3.1.1 Language of Page (A):** Default human language can be programmatically determined
- **3.2.1 On Focus (A):** Components do not initiate a change of context when receiving focus
- **3.3.1 Error Identification (A):** Input errors are identified and described to the user in text

**Robust:**
- **4.1.2 Name, Role, Value (A):** For all UI components, name, role, and value can be programmatically determined

---

## 5. Assistive Technology Interaction Patterns

### 5.1 Screen Readers

**How Screen Readers Work:**
1. Parse the accessibility tree (derived from DOM + ARIA)
2. Present content linearly (top-to-bottom, left-to-right for LTR languages)
3. Announce element type (heading, link, button, image), name (label), state (expanded, checked, disabled), and value
4. Provide navigation shortcuts (heading jump, landmark jump, form element jump, table navigation)

**Design Implications:**
- Semantic HTML provides the accessibility tree structure for free. Div/span-based UIs require ARIA to be accessible.
- Visual order must match DOM order. Screen readers follow the DOM, not CSS layout.
- Dynamic content updates must be announced via ARIA live regions.
- Focus management during SPA navigation must be explicitly handled.

### 5.2 Switch Access

**How Switch Access Works:**
Users operate one or more switches (physical buttons, sips/puffs, head movements) to navigate the interface. Two primary methods:

**Auto-Scanning:** The system highlights items sequentially. The user activates the switch to select the currently highlighted item. Speed and scan pattern are configurable.

**Step-Scanning:** One switch advances the highlight; a second switch selects the highlighted item.

**Design Implications:**
- Every interactive element must be reachable via sequential navigation
- Groups of elements should be navigable hierarchically (scan to group, select group, scan within group)
- Timing-dependent interactions are inaccessible (switch users cannot respond quickly)
- Provide adequate target sizes and spacing to reduce scanning time

### 5.3 Voice Control

**How Voice Control Works:**
- Users speak commands to interact with the interface
- Elements must be labeled so users can refer to them by name
- Screen overlays may show numbers next to interactive elements for disambiguation
- Voice users combine dictation (text input) with commands (navigation, activation)

**Design Implications:**
- Visible labels must match programmatic names (WCAG 2.5.3 Label in Name)
- Labels must be speakable (avoid icons without labels, visual-only indicators)
- Provide clear, distinctive, non-ambiguous names for interactive elements

---

## 6. Cognitive Accessibility

### 6.1 Scope

Cognitive accessibility addresses barriers faced by people with:
- Intellectual disabilities
- Learning disabilities (dyslexia, dyscalculia)
- Autism spectrum conditions
- Attention deficit disorders
- Memory impairments
- Acquired cognitive disabilities (TBI, stroke, dementia)

### 6.2 COGA (Cognitive and Learning Disabilities Accessibility) Task Force Guidelines

**Key Recommendations:**
- **Clear language:** Use short sentences, common words, active voice. Reading level should match audience.
- **Consistent navigation:** Do not change navigation structure across pages. Consistency reduces cognitive load.
- **Predictable behavior:** Elements should behave as expected. No unexpected changes of context.
- **Error prevention and recovery:** Provide clear error messages, undo capability, and confirmation for destructive actions.
- **Support for focus:** Minimize distractions (auto-playing media, animations, pop-ups). Provide ability to pause/stop/hide.
- **Memory support:** Do not require users to remember information across steps. Provide visible context and state.
- **Multiple ways to accomplish tasks:** Support different cognitive styles and strategies.

### 6.3 Design Application

Cognitive accessibility overlaps significantly with general usability. The principles above benefit all users, not just those with cognitive disabilities. Cognitive accessibility is the frontier of inclusive design -- less well-understood than sensory and motor accessibility, but affecting a larger population.

---

## 7. Perceptual Accessibility

### 7.1 Contrast Ratios: The Scientific Basis

**Weber's Law (1834):**
The just-noticeable difference (JND) in luminance is proportional to the background luminance:

```
Delta-L / L = constant (Weber fraction)
```

Where Delta-L is the luminance difference threshold and L is the background luminance.

**WCAG Contrast Ratio:**
The WCAG contrast ratio is defined as:

```
CR = (L1 + 0.05) / (L2 + 0.05)
```

Where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color. The 0.05 offset accounts for ambient light reflectance.

**Relative Luminance Calculation:**
```
L = 0.2126 * R_linear + 0.7152 * G_linear + 0.0722 * B_linear
```

Where R_linear, G_linear, B_linear are the linearized (gamma-corrected) channel values. The coefficients reflect the spectral sensitivity of the human visual system (the luminous efficiency function V(lambda)).

**WCAG Thresholds:**
| Content Type | AA Minimum | AAA Enhanced |
|---|---|---|
| Normal text (< 18pt, or < 14pt bold) | 4.5:1 | 7:1 |
| Large text (>= 18pt, or >= 14pt bold) | 3:1 | 4.5:1 |
| UI components and graphical objects | 3:1 | Not specified |

### 7.2 APCA (Accessible Perceptual Contrast Algorithm)

APCA (Somers, 2022) is a next-generation contrast model being developed for WCAG 3.0. It improves on the current WCAG 2.x ratio by:
- Accounting for the polarity effect (light text on dark background requires different contrast than dark on light)
- Using a perceptually uniform luminance model
- Adjusting for font weight and size
- Providing finer-grained guidance than binary pass/fail at fixed thresholds

### 7.3 Low Vision Considerations

**Low vision** (visual acuity between 20/70 and 20/400, or visual field < 20 degrees) affects approximately 3-4% of the global population.

**Design Requirements:**
- Support text resizing up to 200% without loss of content or functionality (WCAG 1.4.4)
- Support reflow (responsive layout) at 400% zoom (WCAG 1.4.10)
- Do not use text in images (cannot be resized)
- Provide sufficient spacing between interactive elements (targets grow with zoom)
- Support high-contrast mode / forced colors

---

## 8. Motor Accessibility

### 8.1 Switch Scanning Patterns

| Pattern | Description | Speed | Accuracy |
|---|---|---|---|
| **Linear scan** | Items highlighted one by one | Slowest | Highest accuracy |
| **Row-column scan** | Scan to row, then scan within row | Faster | Moderate accuracy |
| **Group scan** | Scan to group, then scan within group | Fastest | Requires good grouping |
| **Directed scan** | User controls scan direction | Variable | Highest user control |

### 8.2 Voice Control Design Patterns

- Labels must be visible and speakable
- Provide grid overlay access for spatial selection
- Support "show numbers" for disambiguation
- Avoid hover-only interactions (voice users cannot hover)
- Avoid drag-and-drop without keyboard/voice alternative

### 8.3 Keyboard Navigation Patterns

| Pattern | Keys | ARIA Role |
|---|---|---|
| **Tab between components** | Tab / Shift+Tab | All interactive elements |
| **Arrow keys within component** | Arrow keys | Tabs, menus, radio groups, toolbars, listboxes |
| **Activate** | Enter / Space | Buttons, links, checkboxes |
| **Dismiss** | Escape | Dialogs, menus, popovers |
| **Select** | Space | Checkboxes, list items |

**Focus Management Rules:**
1. Focus must be visible at all times (WCAG 2.4.7)
2. Focus order must follow a logical sequence (WCAG 2.4.3)
3. Focus must not be trapped (WCAG 2.1.2) -- except for modals while open
4. Focus must be managed during dynamic content changes (move to new content, return to trigger on dismiss)

---

## 9. Legal and Regulatory Framework

### 9.1 Key Regulations

| Regulation | Jurisdiction | Scope | Standard |
|---|---|---|---|
| **Section 508** | United States (federal) | Federal agency ICT | WCAG 2.0 AA (revised 2017) |
| **ADA Title III** | United States | Places of public accommodation | WCAG 2.0/2.1 AA (case law) |
| **EN 301 549** | European Union | Public sector ICT, products, services | WCAG 2.1 AA + additional requirements |
| **EAA (European Accessibility Act)** | European Union | Private sector products and services | Takes effect June 2025 |
| **AODA** | Ontario, Canada | Public and large private orgs | WCAG 2.0 AA |
| **Equality Act 2010** | United Kingdom | Service providers | WCAG 2.1 AA (recommended) |

### 9.2 ADA Digital Compliance

The Americans with Disabilities Act does not explicitly mention websites, but courts have increasingly interpreted Title III (places of public accommodation) to include digital properties. Key precedents:
- **Robles v. Domino's Pizza (2019):** Website and mobile app must be accessible. WCAG 2.0 AA is the applicable standard.
- **Gil v. Winn-Dixie (2017):** Websites connected to physical places of public accommodation must be accessible.

**Practical Implication:** WCAG 2.1 AA is the de facto legal standard in the US for commercial websites and apps. Compliance is not optional for businesses that serve the public.

### 9.3 EN 301 549

The harmonized European standard for ICT accessibility. It incorporates WCAG 2.1 Level AA and adds requirements for:
- Non-web documents (PDFs, Office documents)
- Non-web software (native apps, desktop apps)
- Hardware (kiosks, ATMs, consumer devices)
- Two-way voice communication (real-time text, video relay)
- Authoring tools (must enable creation of accessible content)

---

## 10. Testing for Accessibility

### 10.1 Testing Approach

| Level | Method | Coverage |
|---|---|---|
| **Automated** | axe, WAVE, Lighthouse, Pa11y | ~30-40% of WCAG criteria (structural, programmatic) |
| **Manual Inspection** | Expert review against WCAG checklist | ~80-90% of criteria (includes context-dependent criteria) |
| **Assistive Technology Testing** | Screen reader, keyboard-only, switch, voice control | Real-world AT compatibility |
| **User Testing** | People with disabilities using the product | Actual usability for target users |

**Critical Insight:** Automated testing catches only the most mechanical violations (missing alt text, insufficient contrast, missing form labels). The majority of accessibility issues require human judgment (is the alt text meaningful? is the focus order logical? is the content understandable?). Automated testing is necessary but grossly insufficient.

### 10.2 Screen Reader Testing Matrix

| Screen Reader | Browser | Platform | User Share |
|---|---|---|---|
| **JAWS** | Chrome, Edge | Windows | ~40% (enterprise) |
| **NVDA** | Firefox, Chrome | Windows | ~35% (personal) |
| **VoiceOver** | Safari | macOS, iOS | ~15% (Apple ecosystem) |
| **TalkBack** | Chrome | Android | ~10% (Android) |

Test with at least NVDA + Chrome (Windows) and VoiceOver + Safari (macOS/iOS) to cover the majority of screen reader users.

---

## References

- Mace, R. L., Hardie, G. J., & Place, J. P. (1997). Accessible Environments: Toward Universal Design. Center for Universal Design, NC State University.
- Microsoft (2016). Inclusive Design Toolkit. Microsoft Corporation.
- Oliver, M. (1983). Social Work with Disabled People. Macmillan.
- W3C (2018). Web Content Accessibility Guidelines (WCAG) 2.1. World Wide Web Consortium.
- WHO (2001). International Classification of Functioning, Disability and Health (ICF). World Health Organization.

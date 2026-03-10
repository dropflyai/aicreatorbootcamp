# User Research Methods

Comprehensive guide to user research methodologies, from interview techniques through usability testing and behavioral experimentation.

---

## 1. Interview Methods

### 1.1 Semi-Structured Interviews

The workhorse of qualitative user research. Combines a prepared interview guide with flexibility to follow emergent topics. The guide ensures all key topics are covered; the semi-structured format allows deep exploration of unexpected insights.

**Structure:**
- Opening (5 min): Build rapport, explain purpose, obtain consent, set expectations.
- Warm-up (5 min): Easy, non-threatening questions about background and context.
- Core exploration (30-40 min): Key topics from the guide, with follow-up probes.
- Cool-down (5 min): Closing questions, opportunity for participant to add anything.
- Debrief (5 min): Thank participant, explain next steps, provide incentive.

**Probing techniques:**
- **Echo probe:** Repeat the last few words with rising intonation. Encourages elaboration.
- **Silent probe:** Pause 5-7 seconds after a response. Discomfort with silence prompts deeper reflection.
- **Elaboration probe:** "Tell me more about that." "Can you walk me through that?"
- **Clarification probe:** "What do you mean by [term]?" "Can you give me an example?"
- **Contrast probe:** "How is that different from [alternative]?"

**Sample size:** 5-8 participants per distinct user segment. Saturation typically occurs at 12-15 for a homogeneous population (Guest, Bunce, & Johnson, 2006).

### 1.2 Contextual Inquiry

Developed by Beyer and Holtzblatt, contextual inquiry observes and interviews users in their natural work environment. The researcher is an apprentice; the user is the master.

**Four principles:**
1. **Context:** Go to the user's workplace. See real artifacts, interruptions, and workarounds.
2. **Partnership:** Researcher and user explore the work together. Neither lectures.
3. **Interpretation:** Share interpretations in real-time. "It seems like you always check X before Y -- is that right?"
4. **Focus:** Maintain focus on the research questions while remaining open to surprises.

**Duration:** 2-3 hours per session. Schedule during typical work times.
**Output:** Sequence models, flow models, artifact models, cultural models, physical models.

### 1.3 Diary Studies

Participants record their experiences, behaviors, and thoughts over an extended period (typically 1-4 weeks). Captures longitudinal data that single-session methods cannot.

**Design considerations:**
- **Entry triggers:** Time-based (daily prompt) or event-based (log each time you do X).
- **Entry format:** Text, photo, video, voice memo, structured form, or combination.
- **Tools:** Dscout, Indeemo, Google Forms, WhatsApp, dedicated diary study apps.
- **Duration:** Long enough to capture variation, short enough to maintain compliance.
- **Reminders:** Automated prompts at consistent times. Escalating reminders for non-response.

**Analysis:** Chronological review per participant, then cross-participant thematic analysis. Map temporal patterns, trigger-behavior-outcome sequences, and emotional arcs.

### 1.4 Think-Aloud Protocol

Participants verbalize their thoughts continuously while performing tasks. Reveals mental models, decision processes, confusion points, and expectations in real-time.

**Two variants:**
- **Concurrent think-aloud:** Verbalize during the task. Rich but may alter behavior.
- **Retrospective think-aloud:** Perform task first, then review recording and narrate. Less interference but relies on memory.

**Facilitator role:** Remind participants to keep talking ("What are you thinking right now?") without leading ("Why did you click that?"). Avoid conveying approval or disapproval.

---

## 2. Observation Methods

### 2.1 Ethnographic Observation

Immersive, prolonged observation of users in their natural context. The researcher participates in the environment to understand the culture, practices, and unspoken rules that shape behavior.

**Participant observation roles (Gold's typology):**
- **Complete participant:** Researcher is fully embedded, identity concealed.
- **Participant as observer:** Researcher participates but identity is known.
- **Observer as participant:** Primarily observes with limited participation.
- **Complete observer:** No participation, no interaction.

**Field notes:** Record observations immediately. Separate descriptive notes (what happened) from analytic notes (what it might mean) from personal notes (how you felt). Thick description (Geertz) captures context, intent, and meaning, not just behavior.

### 2.2 Shadowing

Follow a single user through their entire workflow or day. Less immersive than ethnography but reveals the full context of how a product or service fits into the user's life.

**Protocol:**
1. Brief the participant on expectations (be yourself, narrate as comfortable).
2. Follow, observe, and take notes. Photograph artifacts with permission.
3. Ask clarifying questions during natural pauses (not during concentration).
4. Debrief at the end to clarify observations and fill gaps.

### 2.3 Fly-on-the-Wall Observation

Pure observation without any interaction. Researcher is physically present but does not engage with participants. Best for studying natural behavior in public or semi-public spaces.

**Best for:** Retail environments, shared workspaces, public facilities, waiting rooms.
**Limitations:** Cannot ask "why." Must infer intent from behavior alone.

---

## 3. Information Architecture Methods

### 3.1 Card Sorting

Participants organize content items into categories, revealing their mental models of information structure.

**Open card sort:** Participants create their own categories. Reveals how users naturally group concepts. Analyze with dendrogram clustering or similarity matrix.

**Closed card sort:** Participants sort items into pre-defined categories. Tests whether a proposed IA matches user expectations. Analyze with agreement rates per category.

**Hybrid card sort:** Participants sort into pre-defined categories but can create new ones. Balances structure with discovery.

**Sample size:** 15-20 participants for stable patterns (Tullis & Wood, 2004). Can be done remotely (Optimal Workshop, UserZoom) or in-person with physical cards.

### 3.2 Tree Testing

Evaluates the findability of items within a hierarchical structure (site map or menu). Participants are given tasks ("Find the page where you would change your password") and navigate a text-only tree.

**Metrics:**
- **Success rate:** Percentage who find the correct location.
- **Directness:** Percentage who navigate to the correct location without backtracking.
- **Time to complete:** Seconds per task.
- **First click accuracy:** Whether the first click is on the correct path.

**Sample size:** 50+ participants for reliable quantitative data.

---

## 4. Usability Testing

### 4.1 Moderated Usability Testing

A facilitator guides participants through tasks while observing behavior and collecting verbal feedback. The facilitator can probe deeper when confusion arises, adjust tasks in real-time, and ensure core scenarios are covered.

**Session structure:**
1. Pre-test questionnaire (demographics, prior experience).
2. Task scenarios (5-8 tasks, increasing complexity).
3. Post-task ratings (Single Ease Question: "How easy was this task?" 1-7 scale).
4. Post-test questionnaire (SUS, UMUX-Lite, or custom).
5. Debrief interview (overall impressions, suggestions).

**Facilitator rules:**
- Never help. "What would you do if I were not here?"
- Never judge. Maintain neutral expression and tone.
- Never lead. "What do you think this does?" not "Don't you think you should click there?"
- Always record. Screen + face + audio.

### 4.2 Unmoderated Usability Testing

Participants complete tasks independently using a testing platform (UserTesting, Maze, Lookback). No facilitator present. Tasks and instructions must be self-explanatory.

**Advantages:** Faster recruitment, lower cost, more natural behavior, larger sample sizes, no facilitator bias.
**Disadvantages:** Cannot probe deeper, cannot recover from misunderstandings, lower completion rates.

**Best for:** Validating known issues, benchmarking task success rates, testing multiple design variants.

### 4.3 Remote Usability Testing

Conducted over video conference (moderated) or asynchronous platform (unmoderated). Participants use their own devices in their natural environment.

**Technical considerations:** Screen sharing, recording consent, bandwidth requirements, device compatibility, accessibility of prototypes, time zone coordination.

---

## 5. Quantitative User Research Methods

### 5.1 A/B Testing

Randomly assign users to two or more variants and measure behavioral outcomes. The gold standard for causal inference about design changes.

**Requirements for valid A/B tests:**
- Sufficient sample size (power analysis before launch).
- Random assignment with no contamination between groups.
- Single metric designated as primary before launch.
- Pre-defined success criteria and stopping rules.
- Minimum runtime of 1-2 full business cycles.

**Common pitfalls:** Peeking (checking results before adequate sample), multiple comparisons without correction, novelty/primacy effects, segment cherry-picking.

### 5.2 Preference Testing

Show participants two or more design options and ask which they prefer. Quick and simple but measures stated preference, not actual behavior. Useful for early-stage design decisions where behavioral data is unavailable.

**Variants:** Side-by-side comparison, sequential presentation (reduces primacy bias when randomized), forced choice, scaled preference (how much do you prefer A over B).

### 5.3 Five-Second Test

Show a design for exactly five seconds, then ask recall questions. Tests first impressions, visual hierarchy, and communication clarity. What do users notice first? What do they remember? What is the perceived purpose of the page?

**Analysis:** Code open-ended responses thematically. Calculate recall rates for key elements. Compare intended hierarchy with perceived hierarchy.

### 5.4 First-Click Testing

Participants see a page and click where they would go to accomplish a task. Measures whether users can identify the correct starting point.

**Research finding:** If the first click is correct, users succeed 87% of the time. If the first click is wrong, success drops to 46% (Sauro, 2011).

---

## 6. Expert Evaluation Methods

### 6.1 Heuristic Evaluation

Expert reviewers evaluate an interface against established usability principles (heuristics). Nielsen's 10 heuristics are the most widely used:

1. Visibility of system status
2. Match between system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

**Process:** 3-5 evaluators independently review, then consolidate findings. Rate each issue by severity (cosmetic, minor, major, catastrophic). Aggregated reviews from 3-5 experts find approximately 75% of usability issues.

---

## 7. Method Selection Framework

### 7.1 When to Use Which Method

| Research Question | Best Methods | Phase |
|------------------|-------------|-------|
| Who are our users? | Interviews, surveys, analytics | Discovery |
| What do users need? | Contextual inquiry, diary studies | Discovery |
| How do users think about this domain? | Card sorting, interviews | Discovery |
| Can users find what they need? | Tree testing, first-click testing | Design |
| Can users complete tasks? | Usability testing (moderated) | Design/Validation |
| Which design performs better? | A/B testing, preference testing | Validation |
| What is the first impression? | Five-second test | Design |
| Are there obvious usability issues? | Heuristic evaluation | Any phase |
| What do users do over time? | Diary studies, analytics | Discovery/Validation |

### 7.2 Attitudinal vs Behavioral

```
                    ATTITUDINAL (what people say)
                           │
        Interviews ────────┤──────── Surveys
        Focus Groups       │         Card Sorts
                           │
  QUALITATIVE ─────────────┼─────────── QUANTITATIVE
                           │
        Ethnography ───────┤──────── A/B Tests
        Diary Studies      │         Analytics
        Usability Tests    │         Clickstream
                           │
                    BEHAVIORAL (what people do)
```

### 7.3 Resource Requirements

| Method | Time per Study | Cost | Skill Level | Sample Size |
|--------|---------------|------|-------------|-------------|
| Semi-structured interviews | 2-4 weeks | $$ | Medium | 5-15 |
| Contextual inquiry | 3-6 weeks | $$$ | High | 5-10 |
| Diary studies | 2-6 weeks | $$ | Medium | 10-20 |
| Card sorting | 1-2 weeks | $ | Low | 15-30 |
| Moderated usability test | 1-3 weeks | $$ | Medium | 5-8 |
| Unmoderated usability test | 3-5 days | $ | Low | 20-50 |
| A/B test | 2-4 weeks runtime | $ | High (stats) | 1000+ |
| Heuristic evaluation | 3-5 days | $ | High (UX) | 3-5 experts |

---

## 8. Combining Methods

### 8.1 Sequential Combination

**Discovery phase:** Interviews + ethnography to identify problems and needs.
**Design phase:** Usability testing + card sorting to validate solutions.
**Validation phase:** A/B testing + surveys to measure impact at scale.

### 8.2 Parallel Combination

Run qualitative and quantitative studies simultaneously on the same question. Compare findings for convergence and divergence. Richer understanding than either alone.

---

## 9. Quality Standards for User Research

- [ ] Research question clearly articulated before method selection
- [ ] Method chosen based on question type, not familiarity
- [ ] Participant recruitment targets the actual user population
- [ ] Interview guides are pilot tested
- [ ] Usability tasks are realistic and unambiguous
- [ ] Findings distinguish between observed behavior and inferred motivation
- [ ] Quantitative claims meet statistical standards
- [ ] Qualitative claims are grounded in data with supporting quotes
- [ ] Limitations of chosen method are acknowledged
- [ ] Recommendations are actionable and prioritized

---

**This document governs user research method selection and execution across all research brain operations.**

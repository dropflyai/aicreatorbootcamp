# User Research Methods

## What This Enables

A systematic repertoire of research methods that produces reliable, actionable customer insights. Without methodological rigor, research degenerates into confirmation bias — teams hear what they want to hear, build what they already planned, and call it "customer-driven." This module provides the methodological foundation to generate valid, generalizable insights that reduce product risk at every stage of the lifecycle.

---

## The Core Insight

User research is not a phase. It is a continuous practice. Teresa Torres (Continuous Discovery Habits, 2021) argues that product teams should conduct at least one customer interview per week, every week, indefinitely. The goal is not to complete a research project — it is to build an ever-deepening model of the customer's world that informs every product decision in near-real-time.

The critical distinction: research is not about asking customers what to build. It is about understanding their world so deeply that you can identify opportunities they cannot articulate.

---

## Qualitative vs Quantitative Research

### The Fundamental Distinction

| Dimension | Qualitative | Quantitative |
|-----------|-------------|--------------|
| Question answered | Why? How? What is the experience like? | How many? How much? How often? |
| Data type | Words, observations, artifacts | Numbers, statistics, metrics |
| Sample size | 5-30 participants (saturation-based) | 100-10,000+ (statistical power-based) |
| Analysis | Thematic coding, affinity mapping | Statistical analysis, hypothesis testing |
| Generalizability | Transferable (context-dependent) | Generalizable (population-level) |
| Bias risk | Researcher interpretation bias | Survey design bias, sampling bias |
| When to use | Exploration, discovery, understanding context | Validation, measurement, prioritization |
| Output | Insights, themes, opportunity areas | Metrics, significance levels, confidence intervals |

### The Research Helix

Qualitative and quantitative methods are not alternatives — they are complementary and should spiral together:

```
Qualitative (discover patterns)
    -> Quantitative (validate at scale)
        -> Qualitative (understand why the numbers look that way)
            -> Quantitative (measure the impact of changes)
                -> Qualitative (discover new patterns emerging)
```

**Critical error:** Teams that skip qualitative research and go straight to surveys produce data without understanding. They know WHAT is happening but not WHY. Teams that skip quantitative research have deep understanding of a few users but do not know if those insights represent the broader market.

---

## Method 1: User Interviews

### Structure and Technique

**Interview types:**

| Type | Duration | Focus | When to Use |
|------|----------|-------|-------------|
| Exploratory | 45-60 min | Open-ended discovery of needs, context, workflows | Early discovery, new market entry |
| Problem-focused | 30-45 min | Deep dive into a specific pain point or workflow | Validating opportunity areas |
| Solution-focused | 30-45 min | Reaction to prototypes, concepts, or mockups | Evaluating solution hypotheses |
| Contextual inquiry | 60-120 min | Observation + interview in the user's environment | Understanding real-world context and workarounds |

**The Mom Test (Rob Fitzpatrick, 2013):**

Rules for asking questions that produce truthful answers:

1. Talk about their life, not your idea
2. Ask about specifics in the past, not generics or hypotheticals
3. Talk less, listen more

| Bad Question | Why It Fails | Good Question |
|-------------|-------------|---------------|
| "Would you use a product that does X?" | Hypothetical — people predict poorly | "Tell me about the last time you dealt with X" |
| "Do you think this is a good idea?" | Social desirability bias — they will say yes | "How are you solving this problem today?" |
| "How much would you pay for this?" | Hypothetical pricing is unreliable | "What do you currently spend on solving this?" |
| "Would you recommend this to a friend?" | Leading question | "Who else in your organization deals with this?" |

### Interview Protocol

```
1. Opening (5 min)
   - Introduce yourself and purpose
   - Establish rapport
   - Set expectations: no right or wrong answers
   - Ask permission to record

2. Context Setting (10 min)
   - Role, responsibilities, team structure
   - Typical workflow/day
   - Tools and systems used

3. Problem Exploration (20 min)
   - "Walk me through the last time you..."
   - "What happened next?"
   - "How did that make you feel?"
   - "What did you do about it?"
   - Follow the energy — where do they get animated or frustrated?

4. Current Solutions (10 min)
   - "How are you solving this today?"
   - "What have you tried that did not work?"
   - "What workarounds have you developed?"

5. Desired Outcomes (5 min)
   - "If this problem disappeared, what would be different?"
   - "What would success look like?"

6. Closing (5 min)
   - "Is there anything I should have asked?"
   - "Who else should I talk to?"
   - Thank and next steps
```

### Sample Size for Qualitative Research

Nielsen Norman Group research demonstrates that **5 users reveal approximately 85% of usability problems**. For broader discovery research, aim for 12-20 interviews to reach thematic saturation — the point at which new interviews produce no new themes.

**Saturation detection:** After each interview, log new insights. When three consecutive interviews produce zero new insights, you have reached saturation.

---

## Method 2: Contextual Inquiry

### Definition and Origin

Developed by Hugh Beyer and Karen Holtzblatt (Contextual Design, 1997), contextual inquiry is a field research method where the researcher observes and interviews users in their natural work environment.

### The Four Principles

1. **Context:** Go to the user's workplace. Do not bring them to a lab.
2. **Partnership:** Researcher and user explore the work together. The user is the expert; the researcher is the apprentice.
3. **Interpretation:** Share your interpretation during the session and let the user correct you.
4. **Focus:** Have a clear focus area, but remain open to surprises.

### When Contextual Inquiry is Essential

- Users cannot articulate their workflow (tacit knowledge)
- The environment significantly affects behavior (factory floor, hospital, classroom)
- Workarounds and informal processes are important
- Physical artifacts (sticky notes, whiteboards, printed spreadsheets) are part of the workflow

### Conducting Contextual Inquiry

```
Phase 1: Setup (before the visit)
- Define focus areas and research questions
- Schedule 2-hour blocks minimum
- Prepare observation guide (what to look for)
- Arrange recording equipment (camera, audio, screen recording)

Phase 2: Observation (during the visit)
- Arrive early, observe the physical environment
- Ask the user to "do their work as normal"
- Take notes on: actions, tools, interruptions, workarounds, communication
- Ask clarifying questions in the moment: "I noticed you copied that into a spreadsheet — why?"
- Look for: pain points, moments of confusion, inefficiencies, emotions

Phase 3: Synthesis (after the visit)
- Create a work model: flow model, sequence model, artifact model
- Identify breakdowns (where the work fails or is harder than necessary)
- Compare across multiple contextual inquiries for patterns
```

---

## Method 3: Diary Studies

### Definition

A longitudinal research method where participants self-report their experiences, behaviors, and thoughts over an extended period (typically 1-4 weeks). Participants log entries when triggered by specific events or at scheduled intervals.

### Types

| Type | Trigger | Example |
|------|---------|---------|
| **Event-contingent** | Log when a specific event occurs | "Every time you encounter a billing question" |
| **Interval-contingent** | Log at set intervals | "Every evening, reflect on your project management activities" |
| **Signal-contingent** | Log when prompted by researcher | Random prompts via text/app 3x per day |

### When to Use Diary Studies

- Behaviors occur over time (not in a single session)
- Context and emotional state matter
- Memory decay would corrupt retrospective interviews
- You need to understand frequency and patterns of events
- Studying habitual behaviors (daily routines, recurring pain points)

### Design Considerations

- **Duration:** 1-2 weeks for common events, 4 weeks for rare events
- **Entry burden:** Keep entries to 2-5 minutes maximum or participants will drop out
- **Sample size:** 10-25 participants (higher than interviews due to expected dropout of 20-30%)
- **Follow-up:** Schedule debrief interviews after the study to explore patterns

---

## Method 4: Usability Testing

### Definition

Observing users as they attempt to complete specific tasks with your product or prototype. The goal is to identify usability problems, measure task success, and understand the user's mental model.

### Types of Usability Testing

| Type | Moderated | Setting | When to Use |
|------|-----------|---------|-------------|
| **In-person moderated** | Yes | Lab or office | High-fidelity testing, complex tasks |
| **Remote moderated** | Yes | Video call | Geographically distributed users |
| **Remote unmoderated** | No | User's environment | Scale testing, simple tasks |
| **Guerrilla testing** | Yes | Public space (cafe) | Quick validation, low-fidelity prototypes |

### Task Design

**Good task prompts are:**
- Scenario-based: "You just received a notification that your subscription is expiring. Find how to renew it."
- Realistic: Based on actual use cases, not edge cases
- Non-leading: Do not use the product's terminology in the prompt
- Completable: The user can actually finish the task with the current prototype

**Metrics to capture:**

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Task success rate | Can users complete the task? | >80% |
| Time on task | How efficient is the interaction? | Benchmark + 20% tolerance |
| Error rate | How often do users make mistakes? | <3 per task |
| SUS score (System Usability Scale) | Overall perceived usability | >68 (above average) |
| Task-level satisfaction | Satisfaction with specific flows | >4 out of 5 |

---

## Method 5: A/B Testing (Quantitative)

### Definition

A controlled experiment where two or more variants of a product experience are shown to randomly assigned user groups to determine which variant produces better outcomes on a predefined metric.

### Requirements for Valid A/B Testing

1. **Sufficient traffic:** Statistical power requires adequate sample size (see power analysis in `06_metrics/experimentation.md`)
2. **Random assignment:** Users must be randomly and independently assigned to variants
3. **Single variable:** Ideally test one change at a time (unless multivariate)
4. **Predefined success metric:** Decided before the test starts (no metric shopping)
5. **Predefined duration:** Run until statistical significance or predetermined end date
6. **No peeking:** Do not stop the test early based on preliminary results (inflates false positive rate)

### When A/B Testing Is Appropriate

- You have sufficient traffic (thousands of users per variant)
- The change is measurable and the metric is clearly defined
- You are optimizing, not exploring (you have a hypothesis, not a question)
- The change is reversible and low-risk

### When A/B Testing Is NOT Appropriate

- Pre-product-market-fit (too few users, too many unknowns)
- Strategic decisions (A/B testing optimizes, it does not set direction)
- Ethical concerns (do not A/B test safety-critical features)
- New product categories (no baseline to compare against)

---

## Method 6: Jobs-to-Be-Done Interview Technique

### The JTBD Interview (Bob Moesta, Demand-Side Sales, 2020)

JTBD interviews reconstruct the "timeline" of a purchase or adoption decision to understand the forces that drove the switch from an old solution to a new one.

### The Four Forces of Progress

```
              PUSH (current pain)        PULL (desired outcome)
                     |                          |
                     v                          v
    [Old Solution] -----> SWITCH -----> [New Solution]
                     ^                          ^
                     |                          |
              ANXIETY (fear of new)     HABIT (comfort with old)
```

### JTBD Interview Structure

```
1. Set the scene
   - "Take me back to when you first started thinking about [switching/buying]..."
   - "What was going on in your life/work at that time?"

2. First thought
   - "When did you first realize the old way was not working?"
   - "What was the triggering event?"

3. Passive looking
   - "Did you start looking at alternatives? What did you look at?"
   - "Who did you talk to?"

4. Active looking
   - "When did you get serious about making a change?"
   - "What criteria were you using to evaluate options?"

5. Decision
   - "What made you choose [the product]?"
   - "What almost stopped you from switching?"

6. Post-purchase
   - "Did it solve the problem? What surprised you?"
   - "What do you still wish were different?"
```

### Key Insight

Customers do not buy products. They hire them to make progress in their lives. The job exists independently of your product. Understanding the job — not the product — is what enables breakthrough innovation.

---

## Bias Mitigation in Research

### Common Research Biases

| Bias | Description | Mitigation |
|------|-------------|------------|
| **Confirmation bias** | Seeking/interpreting data that confirms existing beliefs | Pre-register hypotheses; have a skeptic review findings |
| **Social desirability bias** | Participants say what they think you want to hear | Ask about past behavior, not hypothetical intentions |
| **Recency bias** | Over-weighting recent experiences | Ask about multiple instances over time |
| **Sampling bias** | Research sample does not represent target population | Recruit from diverse channels; screen for representativeness |
| **Survivorship bias** | Only studying current users, missing churned users | Actively recruit churned users and non-customers |
| **Anchoring bias** | First piece of information unduly influences interpretation | Randomize question order; blind analysis |
| **Observer effect** | Behavior changes because the user knows they are being watched | Use unmoderated testing; extend observation period |
| **Framing effect** | Question wording influences the response | Test questions with neutral framing; pilot the protocol |

### The Bias Mitigation Protocol

1. **Before research:** Write down your current assumptions and hypotheses. These are what you are testing, not confirming.
2. **During research:** Use a structured protocol. Do not improvise questions based on what you hope to hear.
3. **After research:** Have someone who was not present during the research review the raw data independently. Compare interpretations.
4. **Synthesis:** Use affinity diagramming with the full team. Label themes from the data, not from pre-existing frameworks.

---

## Research Operations and Scaling

### Building a Research Practice

| Maturity Level | Characteristics | Research Cadence |
|---------------|-----------------|------------------|
| **Ad hoc** | Research happens when someone thinks of it | Sporadic, project-based |
| **Emerging** | PM conducts interviews occasionally | Monthly interviews |
| **Continuous** | Product trio conducts weekly discovery | Weekly interviews, quarterly studies |
| **Embedded** | Dedicated research team, research repository | Daily insights flowing to product teams |
| **Democratized** | Anyone can access insights and conduct basic research | Organization-wide research capability |

### The Research Repository

A searchable, tagged collection of all research findings:

```
Research Repository Structure:
├── Studies/
│   ├── [Date]-[Study Name]/
│   │   ├── plan.md (research plan)
│   │   ├── protocol.md (interview guide)
│   │   ├── raw/ (transcripts, recordings)
│   │   ├── analysis.md (coded findings)
│   │   └── insights.md (synthesized insights)
├── Insights/
│   ├── insight-[ID].md (tagged, searchable)
├── Personas/
│   └── (see personas_and_segmentation.md)
└── JTBD/
    └── (jobs mapped with evidence)
```

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Research theater | Research is conducted but findings never influence decisions | Research disconnected from product process | Tie every discovery sprint to a specific product decision |
| Validation masquerading as discovery | Research designed to confirm a predetermined conclusion | Build-first culture, research as checkbox | Require documented hypotheses before research |
| Anecdote-driven | One powerful story overrides quantitative evidence | Narrative bias, no synthesis process | Require N>1; use quantitative data to validate qualitative themes |
| Research debt | Insights exist but are not accessible or actionable | No research repository, no tagging | Build and maintain a searchable research repository |
| Over-researching | Research delays shipping indefinitely | Perfectionism, fear of failure | Time-box research; define "good enough" evidence thresholds |

---

## The Operator's Framework

When planning research for any product decision:

1. **What decision are we trying to make?** (If you cannot name the decision, do not do research)
2. **What do we already know?** (Audit existing data, past research, support tickets)
3. **What is the biggest unknown?** (Value risk? Usability risk? Feasibility risk?)
4. **What method matches the unknown?** (Qualitative for "why," quantitative for "how much")
5. **What sample do we need?** (5 for usability, 12-20 for discovery, 1000+ for quant validation)
6. **How will we synthesize?** (Affinity mapping, thematic analysis, statistical analysis)
7. **How will findings flow into product decisions?** (Which meeting, which artifact, which team)

---

## Summary

User research is a continuous practice, not a project phase. The research helix spirals between qualitative methods (interviews, contextual inquiry, diary studies) that reveal "why" and quantitative methods (A/B testing, surveys, analytics) that reveal "how much." The Mom Test protects against social desirability bias in interviews. Contextual inquiry reveals tacit knowledge invisible in interview settings. JTBD interviews reconstruct the decision timeline to understand the forces driving adoption. Bias mitigation requires pre-registration of hypotheses, structured protocols, and independent analysis. The goal is not to complete research — it is to build an ever-deepening, continuously updated model of the customer's world that makes every product decision better.

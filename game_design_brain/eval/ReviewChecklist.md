# Game Design Review Checklist -- Pre-Production Gate

This checklist must be completed before any game design moves from concept to production.
Every item must be explicitly marked PASS, FAIL, or N/A with justification.
A single FAIL in a Critical section blocks production.

---

## HOW TO USE THIS CHECKLIST

1. Complete the checklist AFTER the design document is written but BEFORE production begins
2. Every item requires an explicit verdict: PASS / FAIL / N/A
3. N/A requires written justification for why the item does not apply
4. Critical items that FAIL block production entirely
5. Important items that FAIL require a documented remediation plan with deadline
6. Review must be signed off by at least one person outside the design team

---

## SECTION 1: CONCEPT VALIDATION (Critical)

All items in this section must PASS to proceed.

### 1.1 Core Concept

- [ ] The game can be described in one sentence (elevator pitch exists)
- [ ] Target audience is explicitly defined with demographics and psychographics
- [ ] Genre and subgenre are stated with awareness of genre conventions
- [ ] Platform(s) are chosen with platform-specific constraints documented
- [ ] The game has a clear unique selling proposition (USP) that differentiates from competitors
- [ ] Competitive analysis covers at least 5 direct competitors and 3 indirect competitors
- [ ] The "why now" question is answered -- why this game at this time for this audience

### 1.2 Market Viability

- [ ] Target market size estimated with methodology documented
- [ ] Revenue model defined (F2P, premium, subscription, hybrid)
- [ ] Comparable titles identified with revenue data where available
- [ ] Platform fees and distribution costs accounted for
- [ ] User acquisition cost estimated for target platforms
- [ ] Break-even analysis completed with conservative and optimistic scenarios

### 1.3 Technical Feasibility

- [ ] Engine/framework selected with justification
- [ ] Target hardware specs defined (minimum and recommended)
- [ ] Performance budget established (frame rate, load times, memory)
- [ ] Network requirements defined (offline, online, hybrid)
- [ ] Third-party dependencies identified and evaluated
- [ ] Build and deployment pipeline requirements documented

---

## SECTION 2: CORE LOOP DESIGN (Critical)

All items in this section must PASS to proceed.

### 2.1 Core Mechanic

- [ ] Core verb is defined and feels inherently satisfying in prototype
- [ ] Core mechanic has been paper-prototyped or digitally prototyped
- [ ] Feedback loop is designed: action -> feedback -> reward -> next action
- [ ] Skill ceiling exists -- players can improve meaningfully over time
- [ ] Core mechanic supports the intended session length
- [ ] Core mechanic has been playtested with at least 3 people from target audience

### 2.2 Game Loop Structure

- [ ] Micro loop defined (single action, <30 seconds)
- [ ] Core loop defined (single session, platform-appropriate duration)
- [ ] Meta loop defined (cross-session progression)
- [ ] Loops nest cleanly -- each loop feeds into the next
- [ ] Entry and exit points for each loop are clearly defined
- [ ] Session start and end are designed intentionally (not just "close the app")

### 2.3 MDA Framework Analysis

- [ ] Mechanics are documented (rules, systems, interactions)
- [ ] Dynamics are predicted (emergent behaviors from mechanics)
- [ ] Aesthetics are defined (intended emotional responses)
- [ ] MDA alignment verified -- mechanics produce dynamics that create intended aesthetics
- [ ] Unintended dynamics identified and addressed (exploits, degenerate strategies)

---

## SECTION 3: PROGRESSION AND ECONOMY (Critical)

### 3.1 Progression Design

- [ ] Progression curve mapped from first session to endgame
- [ ] Progression milestones defined at D1, D7, D30, D90
- [ ] Unlock schedule documented -- what opens when and why
- [ ] Difficulty curve designed with genre-appropriate ramping
- [ ] Content gates serve gameplay purpose, not just time/money extraction
- [ ] Endgame loop defined for players who complete main progression
- [ ] Prestige or reset mechanics designed (if applicable to genre)

### 3.2 Economy Design

- [ ] All currency types defined with distinct purposes
- [ ] Source rates documented for each currency at each progression stage
- [ ] Sink rates documented for each currency at each progression stage
- [ ] Economy spreadsheet models at least D1 through D90
- [ ] Inflation scenarios modeled and mitigation strategies documented
- [ ] Free-to-play economy tested -- can a non-paying player complete all content?
- [ ] Premium economy tested -- do purchases feel valuable, not mandatory?
- [ ] Economy simulation run with at least 1000 virtual players

### 3.3 Reward Design

- [ ] Reward types categorized (functional, cosmetic, social, progression)
- [ ] Reward frequency matches genre expectations
- [ ] Variable ratio reinforcement used appropriately
- [ ] Reward anticipation designed -- players can see what they are working toward
- [ ] No "reward fatigue" -- rewards do not lose meaning over time
- [ ] Rewards respect player time investment

---

## SECTION 4: PLAYER EXPERIENCE (Important)

### 4.1 Onboarding

- [ ] First-time user experience (FTUE) flow documented step by step
- [ ] FTUE can be completed in under 5 minutes (mobile) or 15 minutes (PC/console)
- [ ] No text walls -- mechanics taught through guided play
- [ ] FTUE has been tested with 5+ people unfamiliar with the game
- [ ] FTUE completion rate target set and measurement plan in place
- [ ] Post-FTUE guidance exists (contextual help, tips, hints)
- [ ] FTUE can be skipped by experienced players (genre-dependent)

### 4.2 UX and Interface

- [ ] HUD elements are minimal and information-dense
- [ ] Critical information is always visible without menu diving
- [ ] Menu structure is flat -- no more than 3 levels deep for common actions
- [ ] Touch targets meet platform minimums (44x44pt on mobile)
- [ ] Input scheme documented for all supported input methods
- [ ] UI states defined: default, hover, pressed, disabled, loading, error
- [ ] UI responds to player actions in <100ms

### 4.3 Emotional Design

- [ ] Intended emotional arc documented (per session and per campaign)
- [ ] Tension and release patterns designed into gameplay
- [ ] Victory and defeat states feel appropriate to genre
- [ ] Frustration recovery paths exist (hints, difficulty adjustment, skip)
- [ ] Surprise and delight moments designed at regular intervals
- [ ] Music and sound design brief supports emotional targets

### 4.4 Social Design (if applicable)

- [ ] Social features serve gameplay, not just engagement metrics
- [ ] Toxicity mitigation plan documented
- [ ] Reporting and moderation systems designed
- [ ] Social interactions are opt-in, not forced
- [ ] Async social features exist for players in different time zones
- [ ] Social features have been tested for abuse potential

---

## SECTION 5: RETENTION AND LIVE OPERATIONS (Important)

### 5.1 Retention Design

- [ ] D1, D7, D30 retention targets set with genre benchmarks
- [ ] Day 2-7 experience specifically designed (the critical retention window)
- [ ] Daily engagement hooks documented (daily rewards, challenges, events)
- [ ] Weekly engagement hooks documented (weekly events, resets, tournaments)
- [ ] Monthly engagement hooks documented (seasons, battle passes, major events)
- [ ] Push notification strategy defined with frequency caps
- [ ] Re-engagement campaign triggers defined (for lapsed players)

### 5.2 Live Operations Plan

- [ ] Content update cadence defined (weekly, bi-weekly, monthly)
- [ ] Seasonal content plan for first 6 months post-launch
- [ ] Live event framework documented (repeatable event types)
- [ ] A/B testing plan for key design decisions
- [ ] Analytics event taxonomy defined for tracking player behavior
- [ ] KPI dashboard requirements documented
- [ ] Hotfix process defined for critical design issues

### 5.3 Content Pipeline

- [ ] Content creation pipeline documented with timelines
- [ ] Content review process defined with quality gates
- [ ] User-generated content strategy defined (if applicable)
- [ ] Localization requirements documented for all content
- [ ] Content versioning and rollback plan in place

---

## SECTION 6: MONETIZATION REVIEW (Critical)

### 6.1 Model Design

- [ ] Revenue model documented with projected ARPDAU
- [ ] IAP catalog designed with price tiers and value propositions
- [ ] Ad placement strategy defined (if ad-supported)
- [ ] Subscription model defined with tier benefits (if applicable)
- [ ] Battle pass or season pass designed with free and premium tracks (if applicable)
- [ ] First purchase incentive designed to convert free players

### 6.2 Ethics Review

- [ ] No pay-to-win mechanics in competitive contexts
- [ ] Spending caps or velocity limits implemented
- [ ] Loot box odds disclosed (if loot boxes exist)
- [ ] No dark patterns: deceptive UI, hidden costs, artificial urgency on non-scarce items
- [ ] Children protection measures in place (if audience includes minors)
- [ ] Refund policy documented and accessible
- [ ] Regulatory compliance reviewed for target markets (COPPA, GDPR, PEGI, ESRB)

### 6.3 Economy-Monetization Integration

- [ ] Free players can complete all content (with more time)
- [ ] Paying players gain convenience or cosmetics, not power
- [ ] No artificial friction designed solely to sell solutions
- [ ] Premium currency conversion rates are transparent
- [ ] Bundle value is clearly communicated
- [ ] No "regret purchases" by design -- players know what they get before buying

---

## SECTION 7: ACCESSIBILITY REVIEW (Important)

### 7.1 Visual Accessibility

- [ ] Colorblind-friendly palette or colorblind mode available
- [ ] Text meets minimum size requirements (platform-dependent)
- [ ] Contrast ratios meet WCAG AA for critical UI elements
- [ ] UI elements are distinguishable by shape, not just color
- [ ] Screen reader support for menus and UI (where feasible)
- [ ] No reliance on color alone for gameplay information

### 7.2 Audio Accessibility

- [ ] Subtitles available for all spoken content
- [ ] Speaker identification in subtitles
- [ ] Visual indicators for important audio cues
- [ ] Independent volume controls for music, SFX, voice, UI
- [ ] Game is fully playable without audio

### 7.3 Motor Accessibility

- [ ] Control remapping available
- [ ] Adjustable input timing (hold durations, combo windows)
- [ ] One-handed play mode available (where feasible)
- [ ] Auto-aim or aim assist options (for action games)
- [ ] Difficulty options that reduce motor demands
- [ ] No rapid button mashing requirements without alternatives

### 7.4 Cognitive Accessibility

- [ ] Difficulty options available
- [ ] Game speed adjustable (where feasible)
- [ ] Objectives clearly stated and trackable
- [ ] Complex systems have in-game explanations
- [ ] Save system is generous (no progress loss on quit)
- [ ] Content warnings for potentially distressing content

---

## SECTION 8: BALANCE AND TUNING (Important)

### 8.1 Difficulty Balance

- [ ] Difficulty curve tested across all content
- [ ] No sudden difficulty spikes without intent
- [ ] Easy mode is genuinely easy (not just "normal minus 10%")
- [ ] Hard mode is genuinely challenging (not just "more health on enemies")
- [ ] Rubber-banding or adaptive difficulty considered (genre-dependent)
- [ ] Boss or challenge encounters tuned with specific fail rate targets

### 8.2 Systems Balance

- [ ] All player choices are viable -- no dominant strategy
- [ ] Counter-play exists for every strategy
- [ ] Asymmetric elements (characters, classes, factions) have comparable win rates
- [ ] Balance tested with both novice and expert players
- [ ] Balance levers identified for post-launch tuning
- [ ] Automated balance testing tools considered

### 8.3 Multiplayer Balance (if applicable)

- [ ] Matchmaking design documented
- [ ] Skill rating system designed and tested
- [ ] Smurf prevention considered
- [ ] AFK and disconnect handling defined
- [ ] Anti-cheat requirements documented
- [ ] Ranked and unranked modes serve different player needs

---

## SECTION 9: NARRATIVE AND WORLDBUILDING (If Applicable)

- [ ] Story serves gameplay -- not the reverse
- [ ] Player agency in narrative is meaningful (choices matter)
- [ ] Worldbuilding is consistent and internally logical
- [ ] Dialogue is edited for conciseness -- no walls of text
- [ ] Cutscenes are skippable
- [ ] Narrative hooks are placed at retention-critical moments
- [ ] Localization considered in narrative design (cultural references, humor)
- [ ] Representation reviewed for sensitivity and inclusion

---

## SECTION 10: RISK ASSESSMENT (Critical)

### 10.1 Design Risks

- [ ] Top 5 design risks identified with mitigation strategies
- [ ] "What if it's not fun?" contingency plan exists
- [ ] Scope cut plan documented (what gets cut first if needed)
- [ ] Feature dependency map created (what blocks what)
- [ ] Innovation risk assessed (novel mechanics have higher failure rates)

### 10.2 Market Risks

- [ ] Competitor launch timing considered
- [ ] Platform policy changes that could affect the game identified
- [ ] Regulatory risks for target markets assessed
- [ ] Audience fatigue for the genre assessed

### 10.3 Operational Risks

- [ ] Server capacity plan for launch and spikes
- [ ] Disaster recovery plan for game-breaking bugs
- [ ] Community management plan for launch
- [ ] Customer support readiness assessed

---

## REVIEW SIGN-OFF

```markdown
## Game Design Review: [Game Name]

**Reviewer:** [Name]
**Date:** [Date]
**Design Document Version:** [Version]

### Section Results

| Section | Result | Blockers |
|---------|--------|----------|
| 1. Concept Validation | PASS/FAIL | |
| 2. Core Loop Design | PASS/FAIL | |
| 3. Progression & Economy | PASS/FAIL | |
| 4. Player Experience | PASS/FAIL | |
| 5. Retention & Live Ops | PASS/FAIL | |
| 6. Monetization Review | PASS/FAIL | |
| 7. Accessibility Review | PASS/FAIL | |
| 8. Balance & Tuning | PASS/FAIL | |
| 9. Narrative (if applicable) | PASS/FAIL/N/A | |
| 10. Risk Assessment | PASS/FAIL | |

**Critical Sections Passed:** [X/Y]
**Overall Verdict:** APPROVED / BLOCKED / CONDITIONAL
**Conditions (if conditional):** [list]
**Next Review Date (if blocked):** [date]
```

---

## ENFORCEMENT RULE

No game design moves to production without passing this review.
Critical section failures block production entirely.
Important section failures require remediation plans with deadlines.
This checklist is not optional.

---

## END OF REVIEW CHECKLIST

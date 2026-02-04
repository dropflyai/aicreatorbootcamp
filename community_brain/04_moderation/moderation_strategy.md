# Moderation Strategy — Authoritative Module

Moderation is the immune system of community. Without it, communities degrade
into noise, toxicity, and abandonment. With heavy-handed moderation, they
become sterile and lifeless. Effective moderation creates safety without
stifling authentic expression. This document codifies the strategy, policies,
and enforcement framework for community moderation.

---

## 1. COMMUNITY GUIDELINES

### Purpose of Guidelines

Community guidelines establish behavioral expectations that protect member
safety, maintain discussion quality, and preserve community culture. They
are not legal documents — they are social contracts written in plain language.

### Guideline Structure

Every community must have written guidelines covering these categories:

**Category 1: Behavioral Standards**
- Treat all members with respect and dignity
- Engage in good faith; assume positive intent
- Disagree constructively; attack ideas, not people
- No harassment, bullying, threats, or intimidation
- No discrimination based on protected characteristics
- No doxxing, stalking, or unwanted contact

**Category 2: Content Standards**
- Stay on topic for each channel/space
- No spam, self-promotion without value, or solicitation
- No illegal content or instructions for illegal activity
- No NSFW content (unless community-specific exception)
- No misinformation presented as fact
- Cite sources for factual claims when requested

**Category 3: Safety Standards**
- No sharing of personal information of others
- No coordination of harm against individuals or groups
- No glorification of violence, self-harm, or substance abuse
- Report safety concerns to moderators immediately
- Cooperate with moderation decisions

**Category 4: Community-Specific Standards**
- [Product-specific rules: bug reporting format, feature request process]
- [Technical standards: code formatting, language requirements]
- [Professional standards: no competitor disparagement, NDA compliance]

### Guideline Presentation

- **Visible:** Pinned in main channel, linked in onboarding
- **Plain language:** No legal jargon; readable by non-native speakers
- **Concise:** Under 1,000 words for core guidelines
- **Examples:** Include examples of both acceptable and unacceptable behavior
- **Living document:** Reviewed and updated quarterly

---

## 2. CODE OF CONDUCT

### Beyond Guidelines: The Code of Conduct

A Code of Conduct (CoC) is a more formal document that establishes
behavioral standards for formal community spaces (events, official channels).
It differs from guidelines in that it typically includes:

- Explicit scope (where the CoC applies)
- Enforcement procedures
- Reporting mechanisms
- Consequences for violations

### Recommended Base: Contributor Covenant

For technical communities, the Contributor Covenant (covenantcovenant.com)
provides a well-tested foundation that can be customized.

### Code of Conduct Components

| Component | Content |
|-----------|---------|
| Pledge | Commitment to harassment-free experience |
| Standards | Expected and unacceptable behaviors |
| Scope | Where the CoC applies (platform, events, social media) |
| Enforcement | How violations are reported and handled |
| Attribution | Credit to base document |

### Event-Specific Code of Conduct

Events require additional CoC elements:
- Photography/recording consent policy
- Alcohol-related behavior standards (if applicable)
- Physical space conduct (personal space, consent)
- Emergency procedures and contacts
- On-site reporting mechanism (designated safety person)

---

## 3. ENFORCEMENT FRAMEWORK

### Violation Severity Levels

| Level | Examples | Default Response |
|-------|---------|-----------------|
| 1 — Minor | Off-topic post, mild language, first-time spam | Warning (private) |
| 2 — Moderate | Repeated minor violations, heated argument, light harassment | Formal warning + mute |
| 3 — Serious | Harassment, targeted insult, discrimination, doxxing | Suspension (7–30 days) |
| 4 — Severe | Threats, illegal content, coordinated harm, CSAM | Permanent ban + report |

### Enforcement Actions

**Warning (Level 1):**
- Private message from moderator
- Explanation of which guideline was violated
- Link to relevant guideline
- No public action

**Mute (Level 1–2):**
- Temporary inability to post (1–24 hours)
- Private message explaining reason and duration
- Guideline reference
- Unmute is automatic after duration

**Suspension (Level 2–3):**
- Account access removed for specified period (7–30 days)
- Written notice with specific violation, evidence, and duration
- Conditions for return (acknowledgment of guidelines)
- Appeal process information

**Ban (Level 3–4):**
- Permanent removal from all community spaces
- Written notice with specific violations and evidence
- Appeal process information (with higher bar)
- No public announcement of ban (privacy protection)

### Enforcement Process

```
Violation Detected (report or observed)
       │
       ▼
Evidence Collection
├── Screenshots/links to violating content
├── Context (conversation thread)
├── History check (prior violations)
└── Severity assessment
       │
       ▼
Moderator Deliberation
├── Solo decision for Level 1–2
├── Two-moderator agreement for Level 3
├── Team decision for Level 4
└── Community manager approval for bans
       │
       ▼
Action Taken
├── Document action in moderation log
├── Notify member (private)
├── Remove violating content if needed
└── Monitor for compliance
       │
       ▼
Follow-Up
├── Track for repeat behavior
├── Review if pattern emerges
└── Update guidelines if gap identified
```

### Escalation Matrix

| Situation | First Response | Escalation |
|-----------|---------------|------------|
| Off-topic posting | Moderator redirect | Mute if repeated |
| Heated argument | Moderator cool-down message | Thread lock + DM both |
| Harassment report | Evidence collection + mute | Suspension + investigation |
| Threat of violence | Immediate ban | Legal/law enforcement |
| CSAM or illegal content | Immediate removal + ban | Law enforcement report |
| Coordinated attack | Lock channels + assess | Mass ban + platform report |

---

## 4. CONTENT MODERATION

### Moderation Models

| Model | Description | Best For |
|-------|-------------|---------|
| Pre-moderation | Content reviewed before publishing | High-risk communities |
| Post-moderation | Content published, reviewed after | Most communities |
| Reactive | Content reviewed only when reported | Large, low-risk communities |
| Automated + human | Bot filters + human review | Scale communities |

### Automated Moderation

**What to automate:**
- Spam detection (link patterns, keyword lists)
- Profanity filtering (customizable word lists)
- Duplicate content detection
- Rate limiting (posting frequency)
- New member content restrictions (links, attachments)

**What NOT to automate:**
- Nuanced behavioral judgment
- Context-dependent language assessment
- Interpersonal conflict resolution
- Ban decisions
- Cultural sensitivity determinations

### Moderation Tooling

| Tool | Function | Platform |
|------|----------|----------|
| AutoModerator | Rule-based filtering | Discord, Reddit |
| MEE6 / Dyno | Bot-based moderation | Discord |
| Akismet | Spam filtering | Discourse, WordPress |
| Perspective API | Toxicity scoring | Custom integration |
| Custom bots | Platform-specific rules | Any platform |

---

## 5. TRUST AND SAFETY

### Trust and Safety Framework

Beyond content moderation, trust and safety (T&S) addresses:

- **Physical safety:** Threats, stalking, doxxing
- **Mental health:** Self-harm, crisis situations
- **Minors:** Age-appropriate content, COPPA compliance
- **Fraud:** Scams, impersonation, social engineering
- **Legal:** Law enforcement requests, subpoenas, compliance

### Crisis Response Protocol

**For Safety Threats:**
```
1. Preserve evidence (screenshots, logs)
2. Remove immediate threat (ban user, delete content)
3. Contact affected members (offer support)
4. Report to platform (if applicable)
5. Report to law enforcement (if threat is credible)
6. Document incident
7. Debrief with moderation team
8. Update policies if gap identified
```

**For Mental Health Crises:**
```
1. Do not delete the content immediately (may be a cry for help)
2. Respond with crisis resources (hotline numbers)
3. Contact the member privately with support
4. Escalate to community manager
5. Do not diagnose, counsel, or promise confidentiality
6. If imminent danger is suspected, contact emergency services
7. Document and follow up
```

### Crisis Resources Template

```
If you or someone you know is in crisis:

🇺🇸 National Suicide Prevention Lifeline: 988
🇺🇸 Crisis Text Line: Text HOME to 741741
🌍 International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

You are not alone. Please reach out for help.
```

---

## 6. APPEALS PROCESS

### Appeal Framework

Every member subject to enforcement action at Level 2+ must have access
to an appeal process.

**Appeal Process:**
```
1. Member submits appeal (within 14 days of action)
   ├── Written statement explaining their perspective
   ├── Any additional context or evidence
   └── Acknowledgment of community guidelines

2. Appeal Review (within 7 days)
   ├── Different moderator(s) than original decision
   ├── Review all evidence and appeal statement
   ├── May request additional information from either party
   └── Render decision

3. Decision Communicated (within 48 hours of review)
   ├── Uphold original action (with explanation)
   ├── Modify action (reduce severity, with explanation)
   └── Overturn action (with explanation and apology if warranted)

4. Decision is final (no further appeals for same incident)
```

### Appeal Criteria

Appeals should be considered if:
- New evidence is presented
- Original decision was based on incomplete information
- Policy was applied inconsistently
- Circumstances warrant reconsideration

Appeals should be denied if:
- No new information is provided
- Original decision followed established process
- Violation is clear and severity is appropriate
- Appeal is filed in bad faith

---

## 7. TRANSPARENCY AND REPORTING

### Moderation Transparency

| What to Share Publicly | What to Keep Private |
|----------------------|---------------------|
| Aggregate enforcement stats | Individual identities |
| Policy changes and rationale | Specific incident details |
| Guidelines updates | Private conversations |
| Appeal process existence | Appeal contents |
| Community health metrics | Investigation details |

### Moderation Report (Quarterly)

Publish a quarterly transparency report including:
- Number of enforcement actions by level
- Number of appeals and outcomes
- Policy changes made
- New moderators added
- Community health metrics trend

---

## 8. MODERATOR WELL-BEING

### The Cost of Moderation

Moderators are exposed to the worst content in the community. This
creates real psychological burden (vicarious trauma, compassion fatigue).

**Moderator Support Requirements:**
1. **Rotation:** No single moderator handles all severe content
2. **Breaks:** Mandatory time off from moderation duties
3. **Support:** Access to peer support or professional resources
4. **Training:** Regular training on handling difficult content
5. **Recognition:** Explicit appreciation for moderation work
6. **Boundaries:** Clear limits on hours and scope
7. **Exit:** Graceful process for stepping down

---

## 9. PROACTIVE MODERATION

### Preventing Violations Before They Happen

The best moderation is prevention:

| Strategy | Implementation |
|----------|---------------|
| Culture setting | Founding members model expected behavior |
| Onboarding | Guidelines presented during signup |
| Positive reinforcement | Publicly praise good behavior |
| Design for civility | Slow down heated topics with cooling mechanisms |
| Conversation starters | Seed positive, constructive discussions |
| Norm enforcement | Community members self-moderate through social pressure |
| Early intervention | Address tone shifts before they escalate |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Invisible moderation | No one knows rules exist until enforced | Visible, accessible guidelines |
| Selective enforcement | Rules applied inconsistently | Documented process, multiple mods |
| Public shaming | Calling out violators publicly | Private first, always |
| Zero tolerance | No graduated response | Severity-based framework |
| Mod as police | Adversarial relationship with members | Mod as community steward |
| Ignoring soft violations | Only acting on severe cases | Early intervention |

---

**Moderation is not censorship. Moderation is the curation of a safe,
productive social space where members can be vulnerable, disagree
constructively, and grow together. It requires consistent application of
clear rules, genuine care for member well-being, and the courage to make
difficult decisions. Communities do not fail from over-moderation; they
fail from under-moderation.**

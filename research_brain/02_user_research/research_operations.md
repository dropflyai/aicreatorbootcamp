# Research Operations (ResearchOps)

Infrastructure, processes, and governance that enable scalable, systematic, and ethical user research across the organization.

---

## 1. ResearchOps Definition and Scope

ResearchOps is the people, processes, and tools that support researchers at scale. Just as DevOps enables engineering velocity, ResearchOps enables research velocity without sacrificing rigor. The function emerged from the recognition that research teams spend 30-50% of their time on operational tasks (recruitment, scheduling, consent, data management) rather than analysis and insight generation.

### 1.1 Core ResearchOps Domains

**Participant management:** Recruitment, screening, scheduling, incentive delivery, panel maintenance, participant relationship management.

**Research governance:** Ethics review, consent management, data privacy, research standards, quality assurance, legal compliance.

**Knowledge management:** Research repository, insight synthesis, findability of past research, research impact tracking.

**Tool and infrastructure management:** Research tool stack, lab equipment, recording systems, transcription services, analysis tools.

**Research enablement:** Democratization programs, researcher training, research templates, methodology standards.

---

## 2. Participant Recruitment

### 2.1 Recruitment Channels

**Internal panels:** Maintained database of opted-in participants from your user base. Lowest cost, fastest recruitment, highest relevance. Risk of panel conditioning (over-researched participants whose behavior is no longer representative).

**Customer databases:** Recruit directly from your CRM or product analytics. Can target specific behaviors, segments, or lifecycle stages. Requires coordination with customer success and legal teams.

**Recruitment agencies:** Third-party services (User Interviews, Respondent.io, Prolific, dScout) provide screened participants. Higher cost but access to non-customers and specific demographics. Essential for prospect research.

**Intercept recruitment:** Recruit users during product interaction (in-app surveys, pop-up invitations). High relevance but may disrupt experience. Best for quick, low-commitment studies.

**Social media and community:** Post in relevant online communities, social channels, or forums. Good for niche audiences. Risk of self-selection bias.

**Snowball recruitment:** Ask participants to refer others. Useful for hard-to-reach populations (specific job titles, rare conditions). Network homogeneity risk.

### 2.2 Screener Design

The screener questionnaire determines participant eligibility. It is the most critical quality control point in recruitment.

**Best practices:**
- Start with disqualifying criteria (demographics, role, product usage) to screen quickly.
- Use behavioral questions ("In the past 30 days, how many times have you...") rather than self-identification ("Are you a power user?").
- Include trap questions to detect satisficing or professional respondents.
- Do not reveal desired answers. Frame questions neutrally. If seeking users who have switched providers, do not ask "Have you switched?" in a study about switching behavior.
- Keep screeners under 10 questions. Each additional question reduces completion rate.

**Screener structure:**
1. Basic eligibility (3-4 questions): Role, industry, location, company size.
2. Behavioral qualification (2-3 questions): Usage patterns, decisions made, experience level.
3. Articulation check (1 question): Open-ended question to assess ability to articulate thoughts.
4. Availability and logistics (1-2 questions): Schedule, technology access, consent.

### 2.3 Incentive Strategy

Incentives compensate participants for their time and reduce no-show rates. They should not be so large as to motivate participation from unqualified individuals.

**Benchmarks (US market, 2024-2025):**
| Method | Duration | Consumer | Business Professional | Executive/C-Suite |
|--------|----------|----------|---------------------|-------------------|
| Survey | 15 min | $10-20 | $25-50 | $75-150 |
| Interview | 60 min | $50-100 | $100-200 | $200-500 |
| Usability test | 60 min | $50-100 | $100-200 | $200-400 |
| Diary study | 2 weeks | $150-300 | $300-500 | N/A |
| Ethnography | Half day | $200-400 | $400-800 | N/A |

**Incentive types:** Gift cards (most common, Amazon/Visa), cash (PayPal, Venmo), charitable donation in participant's name, product credits, early access, swag (low value, supplementary only).

**No-show mitigation:** Confirm 24 hours before and 1 hour before. Over-recruit by 20-30%. Have backup participants on standby. Implement no-show tracking and flag repeat no-shows.

---

## 3. Research Repository

### 3.1 Repository Purpose

A centralized, searchable archive of all research findings, raw data, and insights. The repository solves the "research shelf problem" where studies are conducted but findings are lost in slide decks on personal drives.

### 3.2 Repository Architecture

**Atomic unit: The Insight.** An insight is a distinct, evidence-backed finding that informs decisions. It is not an entire report; it is one discrete piece of knowledge extracted from research.

**Insight components:**
- **Statement:** Clear, concise description of the finding (1-2 sentences).
- **Evidence:** Supporting data (quotes, observations, statistics, screenshots).
- **Source:** Study name, date, methodology, sample description.
- **Tags:** User segment, product area, theme, lifecycle stage, confidence level.
- **Status:** Active (still valid), archived (superseded or expired), conflicted (contradicted by newer evidence).

**Repository layers:**
```
INSIGHTS (atomic findings, tagged and searchable)
    │
    ├── STUDIES (individual research projects, with methodology and raw data)
    │
    ├── THEMES (cross-study patterns, emerging trends, ongoing questions)
    │
    └── RECOMMENDATIONS (actionable implications, linked to insights and decisions)
```

### 3.3 Repository Tools

**Dedicated research repository tools:** Dovetail (market leader for tagging, analysis, and insight management), EnjoyHQ (now part of UserZoom/UserTesting), Aurelius, Condens.

**Adapted tools:** Notion databases, Airtable, Confluence with structured templates. Lower cost but require more manual curation.

**Evaluation criteria:** Searchability, tagging flexibility, multimedia support (video clips, images), integration with analysis tools, access control, collaboration features, export capabilities.

### 3.4 Repository Maintenance

- Assign a repository curator (dedicated ResearchOps role or rotating researcher).
- Review insights quarterly for continued validity.
- Tag new studies within 1 week of completion.
- Conduct bi-annual "spring cleaning" to archive stale insights.
- Track repository usage metrics: searches per month, insights cited in decisions, active contributors.

---

## 4. Research Democratization

### 4.1 The Democratization Spectrum

```
CENTRALIZED                                                    DECENTRALIZED
     │                                                              │
Researchers only ──── Researchers lead, ──── Non-researchers ──── Anyone can
do research           others observe        do guided research    do research
```

Most organizations should target the middle: non-researchers (product managers, designers, customer success) conduct lightweight research (interviews, usability tests) with training and oversight, while specialists handle complex studies (experiments, ethnography, statistical analysis).

### 4.2 Enabling Non-Researchers

**Training program:**
1. Research ethics and consent (mandatory, 2 hours).
2. Interview skills workshop (4 hours, with practice sessions).
3. Usability testing basics (2 hours, with observation).
4. Survey design fundamentals (2 hours).
5. Bias awareness and mitigation (2 hours).

**Guardrails:**
- Provide approved templates for interview guides, screeners, and consent forms.
- Require research brief review by a researcher before study launch.
- Mandate findings review by a researcher before presentation.
- Restrict complex methodologies (statistical experiments, ethnography) to trained researchers.

### 4.3 Risks of Democratization

- **Quality degradation:** Untrained researchers ask leading questions, draw unsupported conclusions.
- **Confirmation bias amplification:** Non-researchers more likely to seek evidence for pre-existing beliefs.
- **Over-research fatigue:** Multiple teams contact the same customers, causing research fatigue and opt-outs.
- **Privacy violations:** Mishandling of consent, recording, or data storage.

**Mitigation:** Centralized participant management (prevents duplicate contacts), mandatory training, template enforcement, researcher review gates.

---

## 5. Research Ethics in Practice

### 5.1 Ethical Framework for Applied Research

Even without formal IRB oversight, applied research must follow ethical principles:

**Respect for persons:** Obtain informed consent. Allow withdrawal at any time without penalty. Protect confidentiality. Never pressure participation.

**Beneficence:** Minimize risk to participants. Ensure research benefits justify participant burden. Do not waste participants' time with poorly designed studies.

**Justice:** Recruit fairly across demographics. Do not disproportionately burden vulnerable populations. Share benefits of research broadly.

### 5.2 Consent Management

**Consent form elements:**
- Study purpose (general, not hypothesis-revealing).
- What participation involves (activities, duration, recording).
- Risks and discomforts (minimal for most UX research).
- Benefits (usually: incentive, contribution to product improvement).
- Confidentiality protections (how data is stored, who has access, retention period).
- Voluntary participation and right to withdraw.
- Contact information for questions or complaints.

**Digital consent:** For remote research, use electronic consent tools (DocuSign, HelloSign, or embedded in testing platform). Store consent records separately from research data. Retain for the duration specified in privacy policy plus legal requirements.

### 5.3 Vulnerable Populations

Research with minors, individuals with disabilities, employees of the research sponsor (power dynamics), or populations in crisis requires elevated ethical protections. Obtain parental/guardian consent for minors. Ensure accessibility of research materials. Address power dynamics explicitly.

---

## 6. Data Privacy in Research

### 6.1 Privacy by Design

- **Data minimization:** Collect only what is necessary for the research question.
- **Purpose limitation:** Use data only for the stated research purpose.
- **Storage limitation:** Define retention periods. Delete data when no longer needed.
- **Anonymization:** Remove PII from transcripts, notes, and reports. Use participant codes.
- **Access control:** Restrict raw data access to the research team. Share only anonymized insights.

### 6.2 Regulatory Compliance

**GDPR considerations:** Lawful basis for processing (consent or legitimate interest), right to erasure, data protection impact assessment for sensitive research, cross-border data transfer restrictions.

**CCPA considerations:** Disclosure requirements, opt-out rights, data deletion requests.

**Industry-specific:** HIPAA for health-related research, COPPA for research involving children, FERPA for education research.

### 6.3 Recording and Storage

- Obtain explicit consent before any recording (audio, video, screen).
- Store recordings in encrypted, access-controlled systems.
- Transcribe and anonymize, then delete original recordings within the defined retention period.
- Never share raw recordings outside the research team without explicit participant consent.

---

## 7. Research Scheduling and Logistics

### 7.1 Scheduling Operations

**Tools:** Calendly, Acuity, Cal.com for self-scheduling. Research platforms (UserTesting, dScout) handle scheduling internally.

**Best practices:**
- Offer 3+ time slots spanning different days and times.
- Include timezone conversion for remote research.
- Send calendar invites with video link, duration, and preparation instructions.
- Confirm 24 hours before and send a reminder 1 hour before.
- Build 15-minute buffers between sessions for note-taking and reset.

### 7.2 Lab and Equipment Management

For in-person research: dedicated research lab with one-way mirror or streaming setup, recording equipment, eye-tracking hardware (if applicable), accessibility equipment.

For remote research: video conferencing (Zoom, Teams), screen recording (Lookback, UserTesting), transcription service (Rev, Otter.ai), note-taking tools (Dovetail, Miro).

---

## 8. Research Budget Management

### 8.1 Budget Categories

| Category | Typical Allocation | Notes |
|----------|-------------------|-------|
| Participant incentives | 30-40% | Largest single line item |
| Recruitment services | 15-20% | External panels, agencies |
| Tools and platforms | 15-20% | Repository, testing, analysis |
| Transcription | 5-10% | Increasingly AI-assisted |
| Travel | 5-15% | For in-person/ethnographic research |
| Lab and equipment | 5-10% | Amortized over studies |

### 8.2 Cost Optimization

- Use internal panels for customer research (eliminates recruitment costs).
- Use unmoderated testing for validation studies (reduces researcher time).
- Batch studies to share recruitment costs.
- Negotiate annual contracts with recruitment agencies for volume discounts.
- Use AI transcription (Otter.ai, Whisper) for non-critical transcripts; human transcription for high-stakes qualitative analysis.

### 8.3 ROI of Research

Measuring research ROI is challenging but essential for securing continued investment.

**Quantitative metrics:** Decisions influenced by research, features validated before development (avoiding wasted build cost), usability issues caught before launch (avoiding support costs and churn).

**Qualitative evidence:** Team confidence in decisions, reduced internal disagreements, faster decision-making, stakeholder testimonials.

**Cost-avoidance framework:** Estimate the cost of building the wrong thing. If research prevents one misguided $200K feature per year, the entire research function pays for itself.

---

## 9. ResearchOps Maturity Model

| Level | Description | Indicators |
|-------|-------------|------------|
| 1. Ad Hoc | No ResearchOps; individual researchers manage everything | No panel, no repository, inconsistent practices |
| 2. Emerging | Basic processes established | Shared screener templates, centralized incentive process |
| 3. Defined | Formal ResearchOps function | Dedicated panel, repository in use, training program |
| 4. Managed | Metrics-driven optimization | Repository usage tracked, recruitment SLAs, budget forecasting |
| 5. Optimized | ResearchOps enables organizational learning | Research embedded in all decisions, real-time insight access |

---

## 10. ResearchOps Checklist

- [ ] Participant panel exists and is maintained
- [ ] Screener templates are available for common study types
- [ ] Incentive process is documented and consistent
- [ ] Consent forms are approved by legal
- [ ] Research repository is operational and curated
- [ ] Non-researcher training program is in place
- [ ] Data privacy protocols are documented and enforced
- [ ] Scheduling infrastructure is reliable
- [ ] Budget tracking is current
- [ ] ResearchOps maturity is assessed annually

---

**This document governs research operations infrastructure and processes across all research brain activities.**

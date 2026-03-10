# Support Channels — Omnichannel Strategy and Channel Economics

## Overview

Channel strategy is one of the highest-leverage decisions in support operations. The
channels you offer, how you route between them, and the economics of each channel
determine both customer experience quality and operational cost structure. This module
provides the theoretical and practical framework for omnichannel support design.

---

## 1. Channel Taxonomy

### Primary Support Channels

| Channel | Modality | Synchronicity | Best For | Worst For |
|---------|----------|---------------|----------|-----------|
| **Email / Web Form** | Written | Asynchronous | Complex issues, documentation trail | Urgent issues, real-time troubleshooting |
| **Live Chat** | Written | Synchronous | Quick questions, guided troubleshooting | Long complex issues, emotional situations |
| **Messaging (Async)** | Written | Asynchronous | Convenience, mobile-first users | Time-sensitive issues requiring immediate resolution |
| **Phone** | Verbal | Synchronous | Complex/emotional issues, high-value customers | Simple FAQ, scalability |
| **Video** | Visual+Verbal | Synchronous | Screen sharing, visual troubleshooting | High volume, simple issues |
| **Social Media** | Written | Semi-synchronous | Public resolution, brand perception | Complex/sensitive issues, account-specific |
| **In-App** | Written | Both | Contextual help, onboarding support | Complex issues requiring external tools |
| **Community Forum** | Written | Asynchronous | Peer-to-peer help, knowledge sharing | Urgent issues, account-specific problems |
| **Self-Service (KB)** | Written/Visual | Asynchronous | Known issues, how-to, FAQ | Novel issues, complex configuration |
| **SMS / Text** | Written | Asynchronous | Notifications, simple queries, reminders | Complex troubleshooting |

### Channel Attributes Matrix

Each channel has measurable attributes that determine its fitness for purpose:

```
                    Richness    Scalability   Cost      Convenience   Documentation
Email               Medium      High          Low       High          High
Live Chat           Medium      Medium        Medium    High          High
Phone               High        Low           High      Medium        Low
Video               Very High   Very Low      Very High Low           Low
Social              Low         Medium        Medium    High          High
In-App              Medium      Very High     Very Low  Very High     Medium
Community           Medium      Very High     Very Low  High          High
Self-Service        Medium      Infinite      Minimal   Very High     High
```

---

## 2. Channel Selection Matrix

### Customer-Side Selection Factors

Customers choose channels based on:

1. **Urgency** — How quickly do they need resolution?
2. **Complexity** — How technically involved is the issue?
3. **Emotion** — How frustrated or anxious are they?
4. **Effort** — What is the path of least resistance?
5. **Preference** — What channel do they habitually use?
6. **Context** — Where are they physically and what device are they using?

### Business-Side Selection Factors

Organizations should offer channels based on:

1. **Cost-to-serve** — Fully loaded cost per interaction on each channel
2. **Resolution quality** — FCR and CSAT achievable on each channel
3. **Scalability** — Can volume be absorbed without linear headcount growth?
4. **Data capture** — Does the channel produce structured, analyzable records?
5. **Automation potential** — Can AI/automation handle first-line on this channel?
6. **Customer segment fit** — Do your customers expect/prefer this channel?

### Decision Framework

```
                        Issue Urgency
                    Low              High
                +------------+------------+
  Simple Issue  | Self-serve | Chat/Bot   |
                | Community  | In-app     |
                | Email      | Phone      |
                +------------+------------+
  Complex Issue | Email      | Phone      |
                | Messaging  | Video      |
                | Forum      | Screen share|
                +------------+------------+
```

For each segment-issue combination, determine:
- **Primary channel** — Where you want most traffic to flow
- **Fallback channel** — What you offer when primary is insufficient
- **Escalation channel** — Where complex cases are elevated

---

## 3. Channel Routing Architecture

### Intelligent Routing Principles

Modern support routing goes beyond round-robin. Intelligent routing considers:

1. **Skills-based routing** — Match ticket to agent with relevant expertise
2. **Priority-based routing** — Serve highest-priority issues first
3. **Load-balanced routing** — Distribute evenly across available agents
4. **Relationship-based routing** — Route to the agent who previously helped
5. **Segment-based routing** — Route enterprise customers to senior agents
6. **Language-based routing** — Match customer language to agent fluency
7. **Channel-affinity routing** — Route to agents specialized in that channel

### Routing Decision Tree

```
Incoming Request
  |
  +--> Is this a known issue with self-service resolution?
  |     YES --> Suggest self-service article (deflection attempt)
  |     NO  --> Continue
  |
  +--> Is this from a VIP/Enterprise customer?
  |     YES --> Route to dedicated/senior team
  |     NO  --> Continue
  |
  +--> Can an AI agent resolve this?
  |     YES (high confidence) --> AI handles, human review
  |     MAYBE --> AI drafts, human approves
  |     NO  --> Continue
  |
  +--> Match to skill group based on:
  |     - Product area
  |     - Issue category
  |     - Technical complexity
  |
  +--> Within skill group, select agent based on:
        - Current load
        - Proficiency score
        - Availability
        - Customer history (returning customer preference)
```

### Omnichannel vs. Multichannel

**Multichannel:** Multiple channels exist independently. Customer context does not
transfer between channels. Agent sees only current channel interaction.

**Omnichannel:** Channels are integrated. Customer context follows across channels.
Agent sees full interaction history regardless of channel. Customer can switch channels
without re-explaining.

```
Multichannel (broken):
  Email --> [Agent A, no context]
  Chat  --> [Agent B, no context]  <-- Customer repeats everything
  Phone --> [Agent C, no context]  <-- Customer repeats again

Omnichannel (seamless):
  Email --> [Agent A, full history]
  Chat  --> [Agent B, sees email thread]  <-- Picks up where email left off
  Phone --> [Agent C, sees all]           <-- Knows entire journey
```

**Implementation requirements for true omnichannel:**
- Unified customer record (single source of truth)
- Cross-channel conversation threading
- Context handoff between agents and channels
- Unified reporting across all channels

---

## 4. Channel Economics

### Cost-Per-Resolution by Channel

| Channel | Avg Cost/Interaction | Avg Handle Time | Concurrency | Agent Utilization |
|---------|---------------------|-----------------|-------------|-------------------|
| Phone | $8-15 | 8-12 min | 1:1 | 70-80% |
| Video | $12-20 | 15-25 min | 1:1 | 60-70% |
| Live Chat | $4-8 | 6-10 min | 1:3 | 80-90% |
| Email | $5-10 | 10-20 min | N/A (async) | 85-95% |
| Messaging | $2-5 | 5-15 min (spread) | 1:5+ | 85-95% |
| Social | $3-7 | 8-15 min | 1:2 | 75-85% |
| In-App/Bot | $0.50-2 | 2-5 min | 1:infinite | N/A |
| Self-Service | $0.10-0.50 | N/A | N/A | N/A |
| Community | $0.05-0.25 | N/A | N/A | N/A |

### Channel Migration Strategy

The highest-ROI support investment is often channel migration — shifting volume from
expensive channels to cheaper ones without degrading experience.

```
Channel Migration Funnel:
  Phone ($12)
    |-- Can this be handled via chat? --> Migrate to Chat ($6)
    |     |-- Can this be handled by bot? --> Migrate to Bot ($1)
    |     |     |-- Can self-service prevent this? --> Deflect to KB ($0.25)
    |     |
    |-- Is this a known issue? --> Proactive outreach prevents ticket ($0)
```

**Migration levers:**
1. **Deflection** — Self-service articles resolve before ticket creation
2. **Containment** — Chatbot resolves within automated flow
3. **Shift-left** — Move from phone to chat/messaging without quality loss
4. **Proactive** — Outreach prevents issue from becoming a ticket

### Channel Mix Optimization

Target channel mix varies by company stage and customer segment:

```
Early-Stage Startup:     Mid-Market SaaS:       Enterprise SaaS:
  Email: 60%               Email: 30%             Email: 20%
  Chat: 20%                Chat: 25%              Chat: 15%
  Self-serve: 15%          Self-serve: 25%        Self-serve: 30%
  Phone: 5%                Phone: 10%             Phone: 15%
                           Bot: 10%               Bot: 10%
                                                  Dedicated: 10%
```

---

## 5. CSAT Benchmarks by Channel

### Industry Benchmarks

| Channel | Median CSAT | Top Quartile | Bottom Quartile |
|---------|-------------|-------------|-----------------|
| Phone | 78% | 88%+ | <70% |
| Live Chat | 80% | 90%+ | <72% |
| Email | 75% | 85%+ | <65% |
| Messaging | 82% | 92%+ | <74% |
| Self-Service | 70% | 80%+ | <55% |
| Social | 65% | 78%+ | <50% |
| Community | 60% | 75%+ | <45% |

### Factors Driving Channel CSAT

1. **Speed** — First response time has the strongest correlation with CSAT across
   all channels (r = 0.65-0.80 depending on channel)
2. **Resolution** — Was the issue actually resolved? (r = 0.70-0.85)
3. **Effort** — How much work did the customer have to do? (r = 0.60-0.75)
4. **Empathy** — Did the agent acknowledge the customer's situation? (r = 0.40-0.55)
5. **Personalization** — Did the response feel custom vs. template? (r = 0.35-0.50)

### SLA Expectations by Channel

| Channel | First Response Target | Resolution Target |
|---------|----------------------|-------------------|
| Phone | <60 seconds wait | Same call |
| Live Chat | <30 seconds | Same session |
| Email | <4 hours (business) | <24 hours |
| Messaging | <2 hours | <8 hours |
| Social (public) | <1 hour | <4 hours |
| Social (DM) | <2 hours | <8 hours |

---

## 6. Channel-Specific Best Practices

### Email Support

- Use clear subject lines that reflect resolution status
- Structure responses: acknowledgment, solution, next steps
- Include relevant links to KB articles
- Set explicit expectations for follow-up timing
- Use plain text or simple HTML; avoid heavy formatting

### Live Chat

- Greet within 10 seconds of connection
- Set expectations: "This may take a few minutes while I investigate"
- Send incremental updates; silence > 60 seconds feels like abandonment
- Use canned responses for efficiency but personalize opening/closing
- Offer to email a summary for complex resolutions

### Phone

- Answer within 3 rings / 20 seconds
- Identify yourself by name and department
- Active listening: paraphrase the issue back before solutioning
- Narrate what you are doing: "I'm looking at your account now"
- Confirm resolution and offer "Is there anything else?"

### Social Media

- Respond publicly to acknowledge; move to DM for account-specific details
- Never share customer information publicly
- Tone should match brand voice but be warmer than corporate
- Escalate PR-risk posts immediately to management
- Monitor mentions proactively, not just direct tags

### In-App Support

- Use contextual triggers: offer help based on user behavior
- Pre-populate known context (page, account, recent actions)
- Offer self-service first, then escalate to human
- Keep in-app messaging concise; link to full articles for depth
- Use tooltips and guided tours for common confusion points

---

## 7. Emerging Channels

### Conversational AI / LLM-Powered Chat

- Natural language understanding enables human-like interaction
- Can handle complex multi-turn conversations
- Requires careful guardrails for accuracy and tone
- Best deployed as first-line with seamless human escalation
- Measure: containment rate, escalation rate, CSAT for AI-resolved

### Video Support

- Enables visual troubleshooting (screen share, camera)
- High cost but high resolution rate for complex issues
- Ideal for hardware, physical products, complex configuration
- Requires scheduling infrastructure and bandwidth
- Emerging: AR-assisted support (overlay instructions on camera view)

### Messaging Platforms (WhatsApp, SMS, Apple Messages)

- Asynchronous: customer responds at their convenience
- Higher CSAT than email due to familiarity and convenience
- Rich media: screenshots, videos, documents inline
- Automation-friendly: chatbots deploy natively
- Growing fastest in non-US markets

---

## 8. Channel Strategy Design Process

### Step-by-Step Framework

1. **Audit current state** — Map current channel mix, volume, cost, CSAT
2. **Segment analysis** — Which channels do which customer segments prefer?
3. **Gap analysis** — Where are customers underserved? Where is cost excessive?
4. **Target state design** — Define ideal channel mix for each segment
5. **Migration plan** — How to shift volume from current to target state
6. **Technology assessment** — What platforms enable the target state?
7. **Staffing model** — How does the target state change headcount needs?
8. **Rollout plan** — Phased implementation with measurement at each stage
9. **Optimization cycle** — Quarterly review of channel mix and economics

### Channel Addition Checklist

Before adding a new channel:
- [ ] Customer demand validated (survey, competitor analysis)
- [ ] Cost model built (fully loaded cost per interaction)
- [ ] Staffing plan created (new hires vs. cross-training)
- [ ] Technology selected and integrated with existing stack
- [ ] SLAs defined for the new channel
- [ ] QA rubric updated to include channel-specific criteria
- [ ] Agent training completed
- [ ] Reporting configured
- [ ] Rollout plan with pilot group defined
- [ ] Success criteria and rollback plan documented

---

## References

1. Dixon, M., Toman, N., & DeLisi, R. (2013). "The Effortless Experience." Portfolio.
2. TSIA (2024). "Support Services Benchmark." Technology & Services Industry Association.
3. Zendesk (2024). "CX Trends Report."
4. Intercom (2023). "The State of Conversational Support."
5. McKinsey (2022). "The Next Frontier of Customer Engagement."
6. Forrester (2023). "The US Customer Experience Index."
7. Gartner (2024). "Customer Service and Support Technology Reference Architecture."

---

**This document is authoritative for channel strategy within the Support Brain.**

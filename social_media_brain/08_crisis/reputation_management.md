# Reputation Management

## Purpose

This module provides the comprehensive framework for ongoing brand reputation management across social media: monitoring infrastructure, review management, negative comment strategy, brand safety, troll management, community guidelines, and employee social media policy. Reputation management is the proactive, always-on counterpart to crisis management. While crisis management handles acute incidents, reputation management prevents crises and maintains brand health over time.

---

## 1. Reputation Monitoring Infrastructure

### Monitoring Framework

Reputation monitoring is a continuous, systematic process:

```
Listening Inputs                    Processing                     Outputs
────────────────                 ──────────────                ──────────────
Brand mentions            ──→    Sentiment scoring     ──→    Daily health report
Product mentions          ──→    Theme extraction      ──→    Alert notifications
Executive mentions        ──→    Trend identification  ──→    Weekly reputation score
Industry conversations    ──→    Competitor comparison  ──→    Monthly reputation review
Review platforms          ──→    Risk scoring          ──→    Quarterly board summary
Employee mentions         ──→    Opportunity flagging   ──→    Real-time escalations
```

### Reputation Health Score

Create a composite reputation health score measured weekly:

| Component | Weight | Measurement | Score Range |
|-----------|--------|-------------|-------------|
| Sentiment ratio | 25% | Positive mentions / Total mentions | 0-100 |
| Response rate | 15% | % of mentions responded to within SLA | 0-100 |
| Review rating | 20% | Average rating across review platforms | 0-100 (normalized from stars) |
| Share of voice | 15% | Brand SOV vs. competitors | 0-100 |
| Engagement quality | 15% | Positive engagement / Total engagement | 0-100 |
| Crisis incidents | 10% | Inverse of Level 3+ incidents this period | 0-100 |

**Composite Score Interpretation**

| Score | Health Status | Action |
|-------|-------------|--------|
| 80-100 | Excellent | Maintain current strategy, invest in growth |
| 60-79 | Good | Monitor specific weak areas, preventive action |
| 40-59 | Concerning | Active reputation recovery, increased monitoring |
| 20-39 | Poor | Emergency reputation intervention required |
| 0-19 | Critical | Full reputation crisis response activated |

---

## 2. Review Management

### Review Platform Ecosystem

| Platform | Type | Industries Affected | Priority |
|----------|------|-------------------|----------|
| Google Business Profile | Location/business reviews | All local businesses | Critical |
| Yelp | Business reviews | Restaurants, services, local businesses | High |
| Trustpilot | E-commerce reviews | E-commerce, SaaS, services | High |
| G2 / Capterra | Software reviews | SaaS, technology | Critical for B2B |
| Glassdoor / Indeed | Employer reviews | All companies (employer brand) | High |
| App Store / Google Play | App reviews | Mobile app companies | Critical for apps |
| Amazon | Product reviews | Products sold on Amazon | Critical for Amazon sellers |
| BBB (Better Business Bureau) | Business complaints | All US businesses | Moderate |
| TripAdvisor | Travel/hospitality reviews | Hotels, restaurants, tourism | Critical for travel |
| Facebook Reviews | Business recommendations | Local businesses, services | Moderate |

### Review Response Strategy

**Response Framework**

| Review Type | Response Time | Response Approach |
|-------------|-------------|-------------------|
| 5-star positive | Within 48 hours | Thank specifically, reference details they mentioned |
| 4-star positive | Within 48 hours | Thank, ask what could make it 5 stars |
| 3-star neutral | Within 24 hours | Thank for feedback, address concerns, offer resolution |
| 2-star negative | Within 12 hours | Empathize, apologize, provide resolution path |
| 1-star negative | Within 4 hours | Empathize, apologize, take conversation offline |
| Fake/spam review | Within 24 hours | Report to platform, respond factually if needed |

**Negative Review Response Template**

```
Thank you for sharing your experience, [Name]. We're sorry to hear
that [specific issue mentioned] did not meet your expectations.

This isn't the experience we want for our customers, and we want
to make it right. Please reach out to [specific contact/email/phone]
so we can personally address your concerns.

We appreciate your feedback as it helps us improve.

[Name, Title]
```

**Response Principles**
- Respond to every review (positive and negative)
- Personalize each response (reference specific details)
- Never argue, blame the customer, or be defensive
- Take negative conversations offline (provide direct contact)
- Follow up after resolution to request updated review
- Track review volume, rating trends, and response metrics

### Proactive Review Generation

| Strategy | Method | Volume Potential |
|----------|--------|-----------------|
| Post-purchase email | Automated email 7-14 days after purchase | High (scales with sales) |
| In-app prompt | App-based review request at positive moments | High (for app businesses) |
| SMS request | Text message with review link | Moderate |
| QR code | Physical card/receipt with review link | Moderate (in-person) |
| Employee ask | Staff verbally ask satisfied customers | Low-moderate (personal touch) |
| Social media prompt | Post encouraging reviews with direct link | Low (but public) |

**Review Generation Ethics**
- Never offer incentives for positive reviews (violates most platform policies)
- Never create fake reviews (illegal in many jurisdictions, platform-banned)
- Request reviews from all customers, not just happy ones (representative sample)
- Make review submission easy (direct links, minimal steps)
- Time requests after positive experience moments

---

## 3. Negative Comment Strategy

### Comment Classification and Response

| Comment Type | Definition | Response Strategy |
|-------------|-----------|-------------------|
| Legitimate complaint | Real customer with real issue | Empathize, resolve publicly or take to DM |
| Constructive criticism | Feedback that could improve the brand | Thank, acknowledge, explain actions being taken |
| Emotional venting | Frustrated customer expressing anger | Validate emotions, offer resolution |
| Repeat complainer | Same person complaining across multiple posts | Consistent response, DM to resolve comprehensively |
| Competitive attack | Competitor or competitor-affiliated account | Respond with facts only if necessary; do not engage in argument |
| Misinformation | Factually incorrect claims about brand | Correct factually with evidence, professionally |
| Trolling | Provocative comments seeking emotional reaction | Evaluate visibility; ignore low-visibility, address high-visibility factually |
| Hate speech/harassment | Violates community guidelines and platform policies | Delete, report, document |
| Spam | Irrelevant promotional content | Delete, block if repeated |

### The LAST Framework for Negative Comments

| Step | Action | Example |
|------|--------|---------|
| **L**isten | Read carefully, understand the full complaint | Parse the actual issue vs. emotional language |
| **A**cknowledge | Validate the person's experience and feelings | "We understand how frustrating this must be" |
| **S**olve | Provide a specific resolution or next step | "We'd like to [specific action]. Please DM us your order number" |
| **T**hank | Express gratitude for bringing the issue to attention | "Thank you for letting us know so we can improve" |

### Comment Moderation Policy

| Action | When to Use | Platform Tools |
|--------|------------|----------------|
| Respond publicly | Legitimate complaints, constructive feedback | Comment reply feature |
| DM follow-up | Complex issues, personal information needed | Direct message |
| Hide comment | Mildly inappropriate but not policy-violating | Instagram hide, Facebook hide |
| Delete comment | Policy violations, spam, hate speech | Platform moderation tools |
| Block user | Repeated harassment, persistent trolling | Platform block feature |
| Report to platform | Platform policy violations, illegal content | Platform reporting |
| Keyword filter | Prevent certain words from appearing | Auto-moderation settings |

### Comment Response Time SLAs

| Urgency | Classification | Response Time | Example |
|---------|---------------|---------------|---------|
| Critical | Safety concern, legal issue, media inquiry | 15-30 minutes | "Your product caused injury" |
| High | Viral complaint, influencer criticism | 1-2 hours | Complaint going viral |
| Standard | Regular complaint, question, feedback | 4-8 hours during business hours | "My order hasn't arrived" |
| Low | General comment, positive feedback, questions | 12-24 hours | "Great product!" |

---

## 4. Brand Safety

### Brand Safety Framework

Brand safety ensures that brand content and advertising do not appear alongside harmful, controversial, or inappropriate content:

**Advertising Brand Safety**

| Protection Layer | Implementation |
|-----------------|----------------|
| Platform safety settings | Category exclusions, inventory filters (Meta, YouTube) |
| Blocklists | Keyword and domain blocklists for ad placements |
| Third-party verification | IAS, DoubleVerify, MOAT for ad verification |
| Content adjacency | Control which content your ads appear next to |
| Influencer vetting | Thorough history review before partnership |
| Comment moderation | Active moderation on sponsored content |

**Content Brand Safety**

| Risk Area | Prevention |
|-----------|------------|
| Controversial topics | Clear content guidelines on topics to avoid |
| Political content | Neutral positioning unless brand-relevant |
| Cultural appropriation | Diversity review for all content |
| Trending topic participation | Assessment before joining any trend |
| User-generated content | Moderation before sharing/reposting |
| Humor and tone | Multiple perspectives review for potential offense |

### Brand Safety Audit Checklist

| Category | Check | Frequency |
|----------|-------|-----------|
| Ad placements | Review where ads are appearing | Weekly |
| Influencer content | Review all influencer content for brand safety | Per publication |
| Comment sections | Audit comments on branded content | Daily |
| Associated accounts | Review tagged accounts and associations | Weekly |
| Hashtag safety | Verify branded hashtags are not being hijacked | Weekly |
| Profile security | 2FA enabled, access audit, password rotation | Monthly |
| Employee posts | Spot-check employee social for policy compliance | Monthly |

---

## 5. Troll Management

### Troll Identification

Distinguishing trolls from legitimate unhappy customers:

| Signal | Troll | Legitimate Complaint |
|--------|-------|---------------------|
| History | No prior relationship with brand | Customer or prospect |
| Specificity | Vague attacks, no specific issue | Specific product/service complaint |
| Tone | Deliberately provocative, seeking reaction | Frustrated but sincere |
| Pattern | Comments on multiple posts with same hostility | Focused on one issue |
| Profile | Anonymous, new account, no real identity | Established account with real identity |
| Goal | Attention, disruption, entertainment | Resolution of a problem |
| Engagement | Continues regardless of response | Responds to resolution efforts |

### Troll Response Decision Tree

```
Is this person a customer or prospect with a real issue?
├── Yes → Respond with LAST framework, resolve issue
└── No → Is this person influencing others' perception?
    ├── Yes (high visibility) → One factual response, then disengage
    └── No (low visibility) → Ignore, hide comment if appropriate
        └── Is this escalating?
            ├── Yes → Block and document
            └── No → Continue monitoring, no response
```

### The "Don't Feed the Trolls" Principle with Nuance

| Situation | Strategy |
|-----------|----------|
| Troll on low-visibility post | Ignore completely or hide comment |
| Troll on high-visibility post | One calm, factual response for audience benefit (not for the troll) |
| Coordinated trolling | Document, report, block, consider platform report |
| Troll spreading misinformation | One factual correction for audience benefit, then disengage |
| Troll on competitor's content | Never engage (even in defense) |

---

## 6. Community Guidelines

### Community Guidelines Framework

Every brand social media presence should publish community guidelines:

```
COMMUNITY GUIDELINES

Welcome to [Brand Name]'s community! We want this to be a positive,
inclusive space for everyone. By participating, you agree to:

DO:
- Be respectful and constructive in all interactions
- Share relevant experiences, questions, and ideas
- Support fellow community members
- Flag content that violates these guidelines
- Keep conversations on topic

DO NOT:
- Post hate speech, discriminatory, or harassing content
- Share spam, unsolicited promotion, or scam content
- Post misinformation or deliberately misleading content
- Share others' personal information without consent
- Use profanity or aggressive language toward others or our team
- Post inappropriate or explicit content

OUR COMMITMENT:
- We will respond to questions and concerns as quickly as possible
- We will moderate fairly and consistently
- We will explain moderation decisions when asked
- We will protect your privacy

MODERATION POLICY:
- Comments violating these guidelines may be hidden or deleted
- Repeated violations may result in blocking
- Severe violations will be reported to the platform

[Brand Name] reserves the right to remove content that violates
these guidelines at our discretion.
```

### Platform-Specific Community Rules

| Platform | Additional Rules |
|----------|-----------------|
| Facebook Group | Membership screening questions, posting approval (optional), specific group topic focus |
| Discord Server | Channel-specific rules, role requirements, voice channel conduct |
| Reddit (if brand subreddit) | Subreddit rules aligned with Reddit culture (no overt promotion) |
| Instagram/TikTok | Comment filter keywords, restricted words list |
| LinkedIn | Professional conduct expectations, no solicitation |

---

## 7. Employee Social Media Policy

### Policy Framework

An employee social media policy protects both the company and employees:

```
EMPLOYEE SOCIAL MEDIA POLICY

PURPOSE
This policy provides guidelines for employee use of social media
in both professional and personal contexts.

SCOPE
Applies to all employees, contractors, and representatives of
[Company Name].

GENERAL PRINCIPLES
1. Remember that your online presence reflects on the company,
   even on personal accounts
2. Use good judgment -- if you wouldn't say it in a meeting,
   don't post it
3. Be transparent about your affiliation when discussing
   company-related topics
4. Protect confidential information at all times
5. Respect colleagues, customers, and partners

WHAT YOU CAN SHARE
- Public company announcements and news
- Your professional achievements and experiences
- Industry insights and thought leadership
- Company culture content (with appropriate consent)
- Content from company official accounts (sharing/reposting)

WHAT YOU MUST NOT SHARE
- Confidential business information (financials, strategy,
  unreleased products)
- Customer information or private conversations
- Internal communications (emails, Slack, meeting content)
- Legal matters or ongoing disputes
- Negative comments about colleagues, customers, or partners
- Content that could be discriminatory, harassing, or offensive

DISCLOSURE REQUIREMENTS
- When discussing [Company Name] or its products, disclose
  your employment relationship
- When participating in influencer/affiliate programs, follow
  FTC disclosure requirements

IF IN DOUBT
Contact [Social Media Team / HR / Communications] before posting
content you're unsure about.

VIOLATIONS
Violations of this policy may result in disciplinary action.
Severe violations (confidential information disclosure, harassment)
may result in termination.
```

### Employee Social Media Training

| Training Module | Content | Audience | Frequency |
|----------------|---------|----------|-----------|
| Policy overview | What the policy covers, dos and don'ts | All employees | Onboarding + annual |
| Brand ambassador training | How to share company content effectively | Volunteer advocates | Quarterly |
| Executive social media | Personal branding, thought leadership | Leadership team | Semi-annually |
| Platform-specific training | How to use LinkedIn, etc. effectively | Interested employees | Quarterly |
| Crisis awareness | How to recognize and respond to crises | All employees | Annual |

---

## 8. Reputation Recovery

### Long-Term Reputation Repair Strategy

After a reputation event (crisis, negative press, viral complaint), long-term recovery requires:

| Phase | Timeline | Actions |
|-------|----------|---------|
| Stabilize | Week 1-2 | Resolve immediate issues, reduce negative conversation |
| Rebuild visibility | Week 2-4 | Increase positive content output, amplify positive stories |
| Demonstrate change | Month 1-3 | Show concrete improvements, share progress updates |
| Third-party validation | Month 2-6 | Earn media coverage, analyst endorsement, customer testimonials |
| Sustained improvement | Month 6+ | Consistent positive behavior, community rebuilding |

### Reputation Recovery Content Strategy

| Content Type | Purpose | Example |
|-------------|---------|---------|
| Resolution content | Show the issue is fixed | "What we changed after [incident]" |
| Behind-the-scenes | Demonstrate ongoing improvement | "Inside our new [process/team/facility]" |
| Customer stories | Social proof of positive experiences | Customer testimonials post-recovery |
| Third-party coverage | External validation | Earned media, analyst reports |
| Community content | Rebuild community trust | Community events, member spotlights |
| Values content | Reinforce commitment to brand values | Actions demonstrating values alignment |

---

## 9. Reputation Management Metrics

### Metrics Dashboard

| Metric | Measurement | Target | Frequency |
|--------|-------------|--------|-----------|
| Reputation health score | Composite score (see Section 1) | >70 | Weekly |
| Average review rating | Weighted average across platforms | >4.0 stars | Monthly |
| Review response rate | % of reviews responded to | >95% | Monthly |
| Review response time | Average time to first response | <24 hours | Monthly |
| Sentiment ratio | Positive:Negative mention ratio | >5:1 | Weekly |
| Comment response rate | % of comments responded to within SLA | >90% | Weekly |
| Troll/spam incidents | Number of troll/spam events requiring action | Trending down | Monthly |
| Brand safety incidents | Number of brand safety violations | Zero target | Monthly |
| Employee policy violations | Number of employee social media policy violations | Zero target | Monthly |
| Crisis prevention | Level 3+ incidents caught at Level 2 | Trending up | Quarterly |

---

## 10. Reputation Management Anti-Patterns

| Anti-Pattern | Consequence | Correction |
|-------------|-------------|------------|
| Ignoring negative reviews | Perception of indifference, discourages positive reviewers | Respond to every review within SLA |
| Arguing publicly with critics | Amplifies negativity, makes brand look petty | One professional response, then take offline |
| Deleting all negative comments | Appears censorial, Streisand effect | Only delete policy violations; respond to legitimate complaints |
| No employee social media policy | Uncontrolled risk, inconsistent brand representation | Implement and train on comprehensive policy |
| Reactive only | Always responding to problems, never building positive narrative | Proactive reputation-building content program |
| Ignoring review platforms | Unmonitored reviews damage search reputation | Active monitoring and management of all review sites |
| No community guidelines | Inconsistent moderation, community deterioration | Published guidelines, consistent enforcement |
| Treating all negative content equally | Wasted resources on trolls, insufficient response to legitimate issues | Classification-based response protocol |

---

*Reputation is built in drops and lost in buckets. The best reputation management is invisible: it prevents crises, resolves issues before they escalate, and consistently demonstrates brand values through action. Every interaction is a reputation transaction.*

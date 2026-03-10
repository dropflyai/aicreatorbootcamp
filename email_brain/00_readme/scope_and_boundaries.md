# Email Brain — Scope and Boundaries

## In Scope

The Email Brain is the authoritative system for all work within the following domains. Any task that falls within these boundaries should be routed to or governed by this brain.

---

### 1. Email Program Strategy and Architecture

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Lifecycle Email Design** | Mapping customer lifecycle stages to email touchpoints; defining the complete email journey from acquisition through advocacy |
| **Program Architecture** | Designing the overall email program structure including campaign types, automation flows, segmentation schema, and cadence frameworks |
| **Channel Mix Strategy** | Determining email's role within the broader marketing mix; identifying where email is the optimal channel vs. SMS, push, in-app, or paid |
| **Cadence Planning** | Establishing send frequency rules, fatigue management, priority queuing, and global suppression logic |
| **Email Calendar Management** | Planning promotional calendars, seasonal campaigns, and coordinating batch sends with automated flows |

### 2. Email Deliverability and Infrastructure

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Authentication Protocols** | SPF record design, DKIM key management, DMARC policy configuration and enforcement |
| **Sender Reputation** | IP reputation monitoring, domain reputation management, feedback loop (FBL) processing |
| **IP Warming** | New IP warming schedules, volume ramp plans, reputation establishment protocols |
| **Inbox Placement** | ISP-specific deliverability optimization (Gmail, Microsoft, Yahoo/AOL, Apple Mail Privacy) |
| **Bounce Management** | Hard bounce handling, soft bounce retry logic, invalid address suppression |
| **Blocklist Monitoring** | Monitoring Spamhaus, Barracuda, SURBL, and other major blocklists; remediation procedures |
| **List Hygiene** | Email verification, re-engagement campaigns, sunset policies, suppression list management |

### 3. Email Segmentation and Personalization

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Audience Segmentation** | Behavioral, demographic, psychographic, engagement-based, and RFM segmentation models |
| **Dynamic Content** | Conditional content blocks, personalization tokens, product recommendation logic |
| **Send-Time Optimization** | Individual send-time prediction, timezone-aware sending, engagement-window analysis |
| **Predictive Modeling** | Churn prediction for re-engagement, purchase propensity for promotional targeting, LTV-based segmentation |
| **Preference Management** | Preference center design, topic-level subscriptions, frequency controls |

### 4. Email Campaign Design and Execution

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Campaign Types** | Promotional, newsletter, announcement, event, seasonal, milestone, referral campaigns |
| **Drip Sequences** | Welcome series, onboarding flows, nurture campaigns, re-engagement sequences, win-back series |
| **Triggered Emails** | Behavioral triggers (abandoned cart, browse abandonment, purchase follow-up), milestone triggers, threshold triggers |
| **Transactional Email** | Order confirmation, shipping notification, password reset, account alerts, receipts |
| **Operational Email** | System notifications, digest emails, reporting summaries, alert emails |

### 5. Email Copywriting and Creative

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Subject Line Strategy** | Subject line formulas, length optimization, emoji usage, personalization in subject lines |
| **Preview Text** | Preheader strategy, preview text optimization for mobile and desktop clients |
| **Body Copy** | Email body structure, tone of voice, value proposition framing, storytelling in email |
| **Calls to Action** | CTA copy, button design principles, CTA hierarchy, multi-CTA strategy |
| **Persuasion Techniques** | Urgency, scarcity, social proof, reciprocity, authority, commitment/consistency in email context |

### 6. Email Design and Rendering

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Responsive Design** | Mobile-first email design, fluid layouts, scalable typography, touch-friendly targets |
| **Dark Mode Compatibility** | Dark mode rendering strategies, color inversion handling, transparent image management |
| **Email Client Compatibility** | Cross-client rendering (Gmail, Outlook, Apple Mail, Yahoo, mobile clients), graceful degradation |
| **Accessibility** | Alt text, semantic structure, color contrast, screen reader compatibility, plain text alternatives |
| **Image Strategy** | Image-to-text ratio, retina images, image blocking fallbacks, animated GIF usage |

### 7. Email Automation and Platforms

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **Automation Architecture** | Automation maps, trigger-action-condition logic, branching workflows, scoring integration |
| **Platform Selection** | Evaluating Klaviyo, Mailchimp, HubSpot, Braze, Customer.io, Iterable, Salesforce Marketing Cloud |
| **Platform Migration** | Data migration, template conversion, automation rebuilding, DNS transition |
| **Integration Design** | ESP-to-CRM sync, e-commerce platform integration, event tracking, webhook configuration |

### 8. Email Testing and Optimization

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **A/B Testing** | Test design, hypothesis formulation, sample sizing, statistical significance, result interpretation |
| **Multivariate Testing** | Multi-element testing, interaction effects, factorial design |
| **Holdout Testing** | Incrementality measurement, holdout group sizing, control group management |
| **Engagement Optimization** | Open rate optimization, click optimization, conversion funnel analysis |
| **Rendering Testing** | Cross-client preview testing, dark mode testing, accessibility audits |

### 9. Email Compliance and Privacy

| Domain | Specific Responsibilities |
|--------|--------------------------|
| **CAN-SPAM Compliance** | Physical address requirements, unsubscribe mechanism, header accuracy, content identification |
| **GDPR Compliance** | Lawful basis for processing, consent collection, data subject rights, data portability |
| **CASL Compliance** | Express vs. implied consent, consent records, identification requirements |
| **Privacy Engineering** | Data minimization, retention policies, consent management platforms, privacy-by-design |
| **Apple MPP Adaptation** | Adapting metrics strategy for Mail Privacy Protection, engagement signal alternatives |

---

## Out of Scope

The following domains are explicitly NOT the responsibility of the Email Brain. Route these to the appropriate specialist brain.

### Route to Engineering Brain
- SMTP server configuration and management
- Custom email rendering engine development
- Database schema design for subscriber data
- API endpoint development for email events
- Infrastructure scaling and load balancing
- CI/CD pipelines for email template deployment

### Route to Design Brain
- Brand identity creation and logo design
- Design system tokens and component libraries
- Non-email visual design (web, print, packaging)
- User research methodology (unless email-specific)
- Illustration and photography direction

### Route to MBA Brain
- Overall marketing budget allocation (beyond email)
- Organizational design for marketing teams
- M&A evaluation of email technology companies
- Financial modeling beyond email program ROI
- Competitive strategy beyond email channel

### Route to Marketing Brain (When Available)
- Cross-channel campaign orchestration strategy
- Paid media strategy and execution
- SEO and content marketing strategy
- Social media marketing
- Influencer marketing
- Attribution modeling across all channels

### Route to Legal Brain (When Available)
- Contract negotiation with ESPs
- Terms of service drafting
- Privacy policy legal review
- Regulatory interpretation beyond email-specific law
- Litigation related to email marketing

### Route to Data Brain (When Available)
- Data warehouse architecture
- Machine learning model training for email predictions
- Data pipeline engineering
- Business intelligence dashboard development
- Advanced statistical modeling beyond email testing

---

## Boundary Interactions

### Shared Responsibility Zones

Some work spans multiple brains. In these cases, the Email Brain leads on email-specific aspects and delegates to the appropriate specialist:

| Task | Email Brain Leads | Other Brain Supports |
|------|-------------------|---------------------|
| **Email template development** | Design specs, content blocks, personalization logic | Engineering Brain: HTML/CSS implementation |
| **Subscriber data architecture** | Data requirements, segmentation needs, event definitions | Engineering Brain: Schema design, API development |
| **Email program business case** | Revenue projections, email-specific metrics, benchmark data | MBA Brain: Financial modeling, ROI framework |
| **Brand voice in email** | Email-specific tone adaptation, subject line voice | Design Brain: Overall brand voice guidelines |
| **Email landing pages** | Post-click experience requirements, conversion goals | Design Brain: Page design; Engineering Brain: Implementation |
| **Email analytics dashboards** | Metric definitions, KPI hierarchy, reporting requirements | Data Brain: Dashboard implementation |

### Escalation Protocol

When the Email Brain encounters work that crosses boundaries:

1. **Identify** the out-of-scope component
2. **Document** the requirements from the email perspective
3. **Delegate** to the appropriate brain with clear specifications
4. **Integrate** the specialist output back into the email program
5. **Verify** the integrated result meets email quality standards

### Integration Points

The Email Brain must maintain clean interfaces with:

- **CRM Systems** — Subscriber data sync, lifecycle stage mapping, sales handoff triggers
- **E-Commerce Platforms** — Product catalogs, purchase events, cart data, order status
- **Analytics Systems** — Email event data, conversion tracking, revenue attribution
- **Content Management** — Content feeds, blog posts, product updates for email content
- **Customer Support** — Ticket data for triggered emails, satisfaction surveys, escalation triggers

---

## Scope Evolution

This scope document will expand as:

1. New email technologies emerge (AMP for Email, BIMI, interactive email)
2. New privacy regulations are enacted
3. New marketing automation capabilities become available
4. Cross-brain integration patterns mature
5. Organizational needs evolve

Any scope expansion must be documented here and reflected in the relevant module files.

---

*The Email Brain's scope is deliberately focused on email as a channel. Its power comes from depth, not breadth. When email intersects with other domains, it leads on the email-specific aspects and collaborates with specialist brains for everything else.*

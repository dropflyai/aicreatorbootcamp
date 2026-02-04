# Email Brain — Glossary

## Core Email Marketing Terms

This glossary defines the authoritative terminology used throughout the Email Brain. All modules, patterns, templates, and evaluations reference these definitions. When terminology conflicts arise between sources, the definitions here govern.

---

## A

### A/B Test (Split Test)
A controlled experiment that compares two variants (A and B) of an email element — subject line, sender name, content, layout, send time, or CTA — to determine which performs better against a defined success metric. Statistical significance must be achieved before declaring a winner. See `06_testing/ab_testing.md`.

### Abandon Rate
The percentage of subscribers who begin but do not complete a desired action (cart checkout, form submission, onboarding step). Triggers abandoned-flow emails. Not to be confused with email unsubscribe rate.

### Above the Fold
The portion of an email visible without scrolling. On mobile, approximately 300-400px of vertical space. On desktop, approximately 500-600px. Critical for CTA placement and value proposition delivery. The "fold" varies by device and email client.

### Acceptance Rate
The percentage of sent emails accepted by the receiving mail server (not bounced). Distinct from inbox placement rate, which measures how many accepted emails actually reach the inbox vs. spam folder.

### Authentication
The set of technical protocols (SPF, DKIM, DMARC) that verify the sender's identity and prevent spoofing. Authentication is a deliverability prerequisite, not an option. See `01_foundations/deliverability.md`.

---

## B

### BIMI (Brand Indicators for Message Identification)
A standard that enables brands to display their logo next to authenticated emails in supporting email clients. Requires DMARC enforcement (p=quarantine or p=reject) and a Verified Mark Certificate (VMC). Increases brand recognition and implicit trust.

### Blocklist (formerly Blacklist)
A real-time database of IP addresses or domains identified as sources of spam. Major blocklists include Spamhaus (SBL, XBL, PBL), Barracuda (BRBL), and Invaluement. Listing results in delivery failures across multiple ISPs.

### Bounce (Hard)
A permanent delivery failure caused by an invalid, non-existent, or permanently unavailable email address. Hard bounces must be immediately suppressed. A hard bounce rate exceeding 2% signals list hygiene failure.

### Bounce (Soft)
A temporary delivery failure caused by a full mailbox, temporarily unavailable server, or message size exceeding limits. Soft bounces should be retried (typically 3 attempts over 72 hours) before suppression.

### Broadcast Email (Batch Send)
A one-to-many email sent to a defined segment on a scheduled date/time. Contrast with triggered/automated email. Examples: promotional campaigns, newsletters, announcements.

---

## C

### CAN-SPAM Act (Controlling the Assault of Non-Solicited Pornography And Marketing Act)
US federal law (2003) governing commercial email. Key requirements: accurate headers, truthful subject lines, identification as advertisement, physical address, functioning unsubscribe mechanism (honored within 10 business days). Does NOT require prior consent for commercial email (unlike GDPR). See `07_compliance/email_compliance.md`.

### CASL (Canada's Anti-Spam Legislation)
Canadian law (2014) governing commercial electronic messages. Requires express or implied consent BEFORE sending. Stricter than CAN-SPAM. Consent must be documented with timestamp, method, and purpose. See `07_compliance/email_compliance.md`.

### Click-Through Rate (CTR)
(Unique clicks / Emails delivered) x 100. Measures the percentage of delivered emails that generated at least one click. Industry average: 2-5% depending on vertical. Subject to less inflation than open rate post-Apple MPP.

### Click-to-Open Rate (CTOR)
(Unique clicks / Unique opens) x 100. Measures content relevance among engaged subscribers. A high open rate with low CTOR indicates compelling subject lines but disappointing content. More meaningful than CTR for content optimization.

### Complaint Rate
(Spam complaints / Emails delivered) x 100. The percentage of recipients who mark your email as spam. Must stay below 0.1% (1 per 1,000) for Gmail and below 0.3% for most ISPs. Exceeding thresholds triggers throttling or blocking. The single most dangerous metric for deliverability.

### Consent (Express)
Affirmative, documented agreement to receive commercial email. Required by GDPR and CASL. Must be freely given, specific, informed, and unambiguous. Pre-checked boxes do NOT constitute express consent under GDPR.

### Consent (Implied)
Consent inferred from an existing business relationship (e.g., recent purchase, active account). Recognized by CASL (with time limits) and CAN-SPAM (by default). Not recognized by GDPR for marketing email.

### Conversion Rate
(Conversions / Emails delivered) x 100 or (Conversions / Unique clicks) x 100. The percentage of recipients who completed the desired action (purchase, sign-up, download). The ultimate measure of email effectiveness.

---

## D

### Dedicated IP
An IP address used exclusively by one sender. Provides complete control over sender reputation but requires sufficient volume (typically 100K+ sends/month) to maintain consistent reputation signals. Contrast with shared IP.

### Deliverability
The ability of an email to successfully reach the recipient's inbox (not spam folder, not blocked). A function of sender reputation, authentication, content quality, list hygiene, and engagement signals. See `01_foundations/deliverability.md`.

### DKIM (DomainKeys Identified Mail)
An email authentication standard that uses public-key cryptography to verify that an email was authorized by the sending domain and was not altered in transit. The sending server signs each email with a private key; the receiving server verifies using the public key published in DNS.

### DMARC (Domain-based Message Authentication, Reporting and Conformance)
An authentication protocol that builds on SPF and DKIM to specify how receiving servers should handle messages that fail authentication. Policies: none (monitor), quarantine (spam folder), reject (block). Generates aggregate reports for monitoring.

### Double Opt-In (Confirmed Opt-In)
A two-step subscription process: (1) subscriber enters email address, (2) subscriber clicks a confirmation link in a verification email. Produces higher-quality lists with lower complaint rates and better deliverability. Required by law in some jurisdictions (e.g., Germany).

### Drip Campaign (Drip Sequence)
A series of pre-written emails sent automatically on a time-based or event-based schedule. Unlike one-off campaigns, drips follow a sequence logic. Examples: welcome series (time-based), onboarding (event-based). See `03_campaigns/drip_sequences.md`.

### Dynamic Content
Email content that changes based on subscriber data, segment membership, behavior, or real-time conditions. Examples: personalized product recommendations, location-specific offers, weather-triggered content, countdown timers.

---

## E-F

### Email Client
The software used to read email. Major clients: Apple Mail (desktop + iOS), Gmail (web + mobile), Outlook (desktop + web + mobile), Yahoo Mail, Samsung Mail. Each client renders HTML/CSS differently, requiring cross-client testing.

### Email Service Provider (ESP)
A platform that provides email sending infrastructure, list management, automation, and analytics. Examples: Klaviyo, Mailchimp, HubSpot, Braze, Customer.io, Iterable, Salesforce Marketing Cloud, SendGrid.

### Engagement Rate
A composite metric reflecting subscriber interaction with emails. Typically includes opens, clicks, replies, forwards, and conversions. Used by ISPs as a primary signal for inbox placement decisions.

### Feedback Loop (FBL)
A mechanism by which ISPs report spam complaints back to the sender. Major ISPs (Microsoft, Yahoo, AOL) provide FBLs. Gmail uses its Postmaster Tools instead. FBL data must be processed immediately to suppress complainers.

### Frequency Cap
A rule limiting the maximum number of emails a subscriber can receive within a defined time period (e.g., no more than 5 emails per week). Prevents fatigue and reduces unsubscribe/complaint risk. Applied globally across all campaign types.

---

## G-I

### GDPR (General Data Protection Regulation)
EU regulation (2018) governing personal data processing. For email marketing: requires lawful basis for processing (usually consent), provides data subject rights (access, erasure, portability), mandates data protection by design. Applies to any sender targeting EU residents regardless of sender location. See `07_compliance/email_compliance.md`.

### Graymail
Email that was technically opted into but is no longer wanted by the recipient. Not spam, but not engaged. Graymail is a deliverability risk because ISPs measure engagement; graymail suppresses engagement rates and signals disinterest.

### Inbox Placement Rate (IPR)
The percentage of sent emails that reach the inbox (not spam folder, not blocked). More meaningful than delivery rate. Measured via seed testing (Validity/Return Path, GlockApps) or inferred from engagement metrics.

### IP Warming
The process of gradually increasing send volume from a new or dormant IP address to establish positive sender reputation with ISPs. Typically spans 2-6 weeks with daily volume increases of 20-50%. Premature volume increases cause throttling or blocking.

---

## K-L

### Key Performance Indicator (KPI)
A measurable value that demonstrates email program effectiveness. Primary email KPIs: delivery rate, open rate (with MPP caveat), click-through rate, conversion rate, revenue per email, list growth rate, complaint rate. See `01_foundations/email_metrics.md`.

### Lead Magnet
A valuable resource offered in exchange for an email address. Types: ebooks, checklists, templates, free trials, discounts, webinars, tools. Lead magnet quality directly affects subscriber quality and initial engagement.

### List Churn
The rate at which subscribers leave the list through unsubscribes, hard bounces, and spam complaints. Average annual list churn: 25-30%. Must be offset by list growth to maintain program scale.

### List Hygiene
The practice of maintaining a clean, deliverable email list. Includes: removing hard bounces, suppressing chronic soft bounces, re-engaging inactive subscribers, verifying questionable addresses, and sunsetting unengaged subscribers.

---

## M-O

### Mail Privacy Protection (MPP)
Apple's privacy feature (iOS 15+, macOS Monterey+) that pre-fetches email content and tracking pixels, rendering open tracking unreliable for Apple Mail users. As of 2024, affects approximately 50-60% of email opens. Requires adaptation of metrics strategy to prioritize click and conversion data.

### Marketing Automation
Software systems that automate marketing workflows based on predefined triggers, conditions, and actions. In email: automated sequences, behavioral triggers, scoring-based routing, dynamic content insertion. See `05_automation/marketing_automation.md`.

### Multivariate Test (MVT)
A test that simultaneously evaluates multiple variables and their interactions. Unlike A/B testing (one variable), MVT can test subject line x send time x CTA simultaneously. Requires larger sample sizes. See `06_testing/advanced_testing.md`.

### Open Rate
(Unique opens / Emails delivered) x 100. Historically the primary engagement metric. Post-Apple MPP, open rates are inflated for Apple Mail users. Now used as a directional indicator rather than an absolute metric. See note on MPP.

---

## P-R

### Permission
The explicit or implied agreement from a subscriber to receive email from a sender. The foundational concept of ethical email marketing (Godin, 1999). Permission is granted by the subscriber, not assumed by the sender. It can be revoked at any time.

### Personalization
Tailoring email content to individual subscriber characteristics, behaviors, or preferences. Levels: (1) merge tags (first name), (2) segment-based content, (3) behavioral recommendations, (4) predictive/AI-driven 1:1 content. See `05_automation/personalization.md`.

### Plain Text Email
An email containing only unformatted text with no HTML, images, or styling. Used for: transactional emails requiring maximum deliverability, personal-feel sales emails, accessibility fallbacks, and as a required complement to HTML versions.

### Preference Center
A subscriber-facing interface where recipients manage their email preferences: topic subscriptions, frequency settings, content format, and communication channel choices. Reduces unsubscribes by offering alternatives to full opt-out.

### Preview Text (Preheader)
The text that appears after the subject line in the inbox list view. Typically 40-130 characters depending on the email client and device. Functions as a "second subject line" and significantly impacts open rates. Must complement, not repeat, the subject line.

### RFM Analysis (Recency, Frequency, Monetary)
A segmentation model that scores subscribers based on: (R) how recently they engaged/purchased, (F) how frequently they engage/purchase, (M) how much monetary value they generate. Produces high-value segments for targeted messaging. See `02_strategy/segmentation.md`.

### Revenue Per Email (RPE)
Total email-attributed revenue / Total emails delivered. The primary revenue efficiency metric. More useful than total revenue for comparing campaigns of different sizes. Benchmark varies dramatically by vertical ($0.05-$2.00+).

---

## S

### Seed Testing
A deliverability testing method that sends to a panel of monitored email addresses across major ISPs to measure inbox placement. Providers: Validity (Return Path), GlockApps, 250ok. Provides ISP-specific placement data not available from ESP reporting.

### Segmentation
The practice of dividing an email list into distinct groups based on shared characteristics for targeted messaging. Types: demographic, behavioral, engagement-based, psychographic, transactional (RFM), predictive. See `02_strategy/segmentation.md`.

### Sender Reputation
A score assigned to a sending IP address and/or domain by ISPs based on sending behavior. Factors: complaint rate, bounce rate, spam trap hits, engagement metrics, volume consistency, authentication. The primary determinant of inbox placement.

### Shared IP
An IP address used by multiple senders (typically through an ESP's shared pool). Reputation is collective — one sender's bad behavior affects all. Appropriate for lower-volume senders (<100K/month) who cannot sustain dedicated IP reputation.

### SPF (Sender Policy Framework)
An email authentication standard that allows domain owners to specify which IP addresses are authorized to send email on their behalf. Published as a DNS TXT record. Receiving servers check SPF to verify sender authorization.

### Sunset Policy
A rule defining when and how to stop emailing unengaged subscribers. Example: "Subscribers who have not opened or clicked in 90 days enter re-engagement flow. Those who remain unengaged after re-engagement are suppressed." Critical for list hygiene and deliverability.

### Suppression List
A list of email addresses that must be excluded from all sends. Includes: unsubscribes, hard bounces, spam complainers, manually removed addresses, and legally required suppressions. Suppression must be permanent and cross-system.

---

## T-Z

### Throttling
ISP-imposed rate limiting on incoming email from a sender. Triggered by volume spikes, poor reputation, or suspicious sending patterns. Results in delayed delivery, not permanent blocking. Resolved by reducing volume and improving engagement.

### Transactional Email
Email triggered by a user action that delivers expected information: order confirmations, shipping notifications, password resets, account alerts. Legally distinct from commercial email (exempt from some CAN-SPAM requirements). Must not contain primarily promotional content. See `08_transactional/transactional_email.md`.

### Triggered Email
An email sent automatically in response to a specific subscriber action or event. Examples: abandoned cart (action: add to cart without purchase), birthday email (event: date match), milestone email (event: 100th purchase). See `03_campaigns/triggered_emails.md`.

### Unsubscribe Rate
(Unsubscribes / Emails delivered) x 100. Should remain below 0.5% per campaign. Sustained rates above 1% indicate content-audience misalignment, excessive frequency, or list quality issues. Unsubscribe is preferable to spam complaint.

### Warm-Up
See IP Warming.

### Welcome Series (Welcome Sequence)
An automated email sequence triggered by subscription. Typically 3-7 emails over 7-21 days. The highest-engagement email series in any program (average open rate: 50-60%). Sets expectations, delivers lead magnet, introduces brand value. See `Patterns/welcome_series_pattern.md`.

---

## Metric Benchmarks Quick Reference

| Metric | Good | Average | Poor |
|--------|------|---------|------|
| Open Rate* | >25% | 15-25% | <15% |
| Click-Through Rate | >3.5% | 1.5-3.5% | <1.5% |
| CTOR | >15% | 8-15% | <8% |
| Bounce Rate | <1% | 1-3% | >3% |
| Complaint Rate | <0.05% | 0.05-0.1% | >0.1% |
| Unsubscribe Rate | <0.2% | 0.2-0.5% | >0.5% |
| List Growth Rate | >5%/mo | 2-5%/mo | <2%/mo |

*Open rate benchmarks are less reliable post-Apple MPP. Use primarily as directional indicator.

Source: Litmus, Mailchimp, Campaign Monitor benchmark reports (2023-2024).

---

*This glossary is a living document. New terms should be added as the email landscape evolves.*

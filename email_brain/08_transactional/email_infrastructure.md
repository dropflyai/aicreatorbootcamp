# Email Infrastructure — ESPs, Sending Systems, and Deliverability Architecture

## 1. Email Service Provider (ESP) Landscape

Email infrastructure is the technical foundation that determines whether your emails reach the inbox. Selecting the right ESP and configuring the sending infrastructure correctly is as important as the content itself.

### ESP Categories

**Transactional-First ESPs**
Purpose-built for high-volume, low-latency transactional email delivery.

| ESP | Strengths | Pricing Model | Best For |
|-----|-----------|--------------|----------|
| Postmark | Industry-leading delivery speed, 99%+ inbox rate | Per message ($1.25/1K) | Apps needing fastest transactional delivery |
| Amazon SES | Lowest cost at scale, AWS integration | Per message ($0.10/1K) | High-volume senders on AWS |
| Mailgun | Developer-friendly API, strong analytics | Per message ($0.80/1K) | Developer-centric applications |
| SendGrid | Full-featured, REST API, SMTP relay | Tiered plans + per message | Applications needing both transactional + marketing |
| SparkPost | Predictive analytics, signal data | Per message (volume pricing) | Enterprise with analytics needs |

**Marketing-First ESPs**
Purpose-built for campaign management, automation, and subscriber relationship management.

| ESP | Strengths | Pricing Model | Best For |
|-----|-----------|--------------|----------|
| Klaviyo | E-commerce integration, predictive analytics | Per profile (from $20/mo) | D2C e-commerce (Shopify ecosystem) |
| HubSpot | CRM integration, all-in-one platform | Per contact (from $50/mo) | B2B mid-market wanting integrated CRM |
| Braze | Real-time personalization, cross-channel | Custom pricing | Consumer apps at scale |
| ActiveCampaign | Automation builder, CRM, site tracking | Per contact (from $29/mo) | SMBs needing sophisticated automation |
| Mailchimp | Ease of use, all-in-one for small business | Per contact (free tier) | Small businesses, startups |
| Iterable | Cross-channel, flexible data model | Custom pricing | Growth-stage consumer companies |

### ESP Selection Decision Framework

**Step 1: Define requirements priority**
- Rank: Deliverability, automation, integration, scalability, cost, support

**Step 2: Evaluate integration needs**
- Which CRM, e-commerce, and data platforms must connect?
- API quality and documentation?
- Native vs third-party integrations?

**Step 3: Assess scalability**
- Current volume and projected 24-month volume
- Pricing curve as volume grows
- Performance at 10x current volume

**Step 4: Test deliverability**
- Request trial account
- Send seed list tests through the platform
- Compare inbox placement across ISPs

**Step 5: Evaluate total cost of ownership**
- Platform fees + per-send costs + integration development + team training
- Hidden costs: migration, custom development, premium support

---

## 2. Sending Infrastructure Architecture

### Shared vs. Dedicated IP Addresses

**Shared IP**: Multiple senders share the same IP address. The IP's reputation is a composite of all senders' behavior.

| Aspect | Shared IP | Dedicated IP |
|--------|-----------|-------------|
| Cost | Included in ESP plan | Additional fee ($20-100/mo per IP) |
| Reputation control | Shared (others' behavior affects you) | Full control |
| Warm-up needed | No (already warm) | Yes (gradual volume increase) |
| Best for | Low volume (< 50K/month), new senders | High volume (> 100K/month), established senders |
| Risk | Bad neighbors can damage your deliverability | All reputation management is your responsibility |

**Recommendation**: Use shared IPs until sending at least 50,000 emails per month consistently. Below that volume, you cannot maintain a dedicated IP's reputation.

### IP Warming

When adding a new dedicated IP address, you must gradually increase sending volume to build reputation. ISPs are suspicious of new IPs that suddenly send high volume.

**IP Warming Schedule (Standard)**:

| Day | Daily Volume | Target Audience |
|-----|-------------|-----------------|
| 1-2 | 200-500 | Most engaged subscribers only |
| 3-4 | 500-1,000 | Highly engaged |
| 5-7 | 1,000-5,000 | Engaged |
| 8-14 | 5,000-20,000 | Engaged |
| 15-21 | 20,000-50,000 | Full list minus unengaged |
| 22-30 | 50,000-100,000 | Full active list |
| 31+ | Full volume | All active subscribers |

**Warming rules**:
- Send only to most engaged subscribers during warm-up
- Maintain consistent daily volume (no gaps, no sudden spikes)
- Monitor delivery metrics daily during warm-up
- If bounces or complaints spike, reduce volume and investigate
- Warm each ISP proportionally (do not send all warm-up volume to Gmail only)

### Sending Domain Strategy

**Domain architecture options**:

```
Option 1: Subdomain per function
  marketing.example.com    → Marketing email
  transact.example.com     → Transactional email
  news.example.com         → Newsletter

Option 2: Subdomain per brand
  brand-a.example.com      → Brand A all email
  brand-b.example.com      → Brand B all email

Option 3: Separate domain
  example-mail.com         → All marketing (protects main domain)
  example.com              → Transactional only
```

**Best practice**: Use a subdomain of your primary domain for sending. This inherits some of the primary domain's reputation while isolating email reputation from the website domain.

**Never use your root domain for bulk marketing email**: If marketing reputation degrades, it could affect your website's email (internal communications, support, etc.).

---

## 3. Deliverability Monitoring

### Real-Time Monitoring

**Metrics to monitor in real-time during and after every send**:

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Delivery rate | > 98% | 95-98% | < 95% |
| Bounce rate | < 2% | 2-5% | > 5% |
| Spam complaint rate | < 0.05% | 0.05-0.1% | > 0.1% |
| Unsubscribe rate | < 0.5% | 0.5-1% | > 1% |
| Open rate (vs baseline) | Within 10% | 10-25% decline | > 25% decline |

### Monitoring Tools

| Tool | Primary Function | Key Features |
|------|-----------------|-------------|
| Google Postmaster Tools | Gmail-specific reputation and delivery data | Free, essential for any sender |
| Microsoft SNDS | Outlook-specific data | Free, essential for Microsoft ISPs |
| Validity/Everest | Comprehensive deliverability platform | Inbox placement, reputation, competitive |
| GlockApps | Inbox placement testing | Seed list testing, real-time monitoring |
| MXToolbox | DNS/blacklist monitoring | Free tier available, essential diagnostics |
| 250ok (acquired by Validity) | Deliverability intelligence | Reputation, analytics, threat detection |

### Google Postmaster Tools (Essential Setup)

Google Postmaster Tools provides data directly from Gmail about your sending:
- **Domain reputation**: High, Medium, Low, Bad
- **IP reputation**: High, Medium, Low, Bad
- **Spam rate**: Percentage of emails marked as spam by Gmail users
- **Authentication**: SPF, DKIM, DMARC pass rates
- **Encryption**: TLS usage percentage
- **Delivery errors**: Types and volumes

**Setup**: Verify domain ownership in Google Postmaster Tools. Monitor weekly at minimum.

**Threshold alerts**:
- Spam rate > 0.1%: Investigate immediately (Google's threshold for action)
- Domain reputation drops to "Low": Begin remediation protocol
- Authentication failures: Fix within 24 hours

---

## 4. Bounce Handling

### Bounce Classification

**Hard bounces** (permanent failures):
- `550 User Unknown` — Mailbox does not exist
- `550 Domain not found` — Domain does not exist
- `550 Rejected` — Permanently blocked
- **Action**: Remove from list immediately, never re-attempt

**Soft bounces** (temporary failures):
- `452 Mailbox full` — Recipient's mailbox is full
- `421 Service temporarily unavailable` — Server issue
- `450 Requested action not taken` — Temporary restriction
- **Action**: Retry 3 times over 48-72 hours, then treat as hard bounce

**Block bounces** (policy-based):
- `550 Blocked` — IP or domain is blocked by the receiving server
- `554 Transaction failed` — Spam filter rejection
- **Action**: Investigate cause, remediate, then retry

### Bounce Processing Architecture

```
Incoming Bounce
    │
    ▼
[Parse bounce code and type]
    │
    ├── Hard bounce → [Immediately suppress] → [Remove from all lists]
    │
    ├── Soft bounce → [Queue for retry]
    │   ├── Retry 1 (4 hours later)
    │   ├── Retry 2 (12 hours later)
    │   └── Retry 3 (24 hours later) → Still bouncing → [Treat as hard bounce]
    │
    └── Block bounce → [Alert deliverability team]
        ├── IP block → [Check blacklists, warm backup IP]
        └── Content block → [Review content, modify, resend]
```

### Bounce Rate Management

- Clean your list proactively (email validation before sending)
- Monitor bounce rates per send, per ISP, per segment
- Investigate any bounce rate above 2% immediately
- Separate new addresses (higher bounce risk) from established addresses
- Use real-time email validation at the point of capture

---

## 5. Feedback Loop (FBL) Processing

### What Are Feedback Loops?

Feedback loops are mechanisms where ISPs notify senders when recipients mark their email as spam. The sender receives the spam complaint and should immediately suppress that recipient.

### Major ISP FBL Programs

| ISP | FBL Type | Registration |
|-----|----------|-------------|
| Microsoft (Outlook.com, Hotmail) | JMRP (Junk Mail Reporting Program) | Apply via Microsoft SNDS |
| Yahoo/AOL (Verizon) | CFL (Complaint Feedback Loop) | Apply via Yahoo Postmaster |
| Comcast | Standard ARF format | Apply via Comcast Postmaster |
| Apple Mail | Not available (no FBL program) | N/A |
| Gmail | Not available (uses spam rate in Postmaster Tools) | N/A |

### FBL Processing Requirements

1. **Register for all available FBLs** for ISPs where you have significant subscriber volume
2. **Process complaints in real-time** (or within 1 hour maximum)
3. **Immediately suppress** any address that generates a complaint
4. **Never re-add** a complaint-generating address to any list
5. **Analyze patterns**: Which campaigns, segments, or acquisition sources generate the most complaints?

### Complaint Rate Thresholds

| Rate | Status | Action |
|------|--------|--------|
| < 0.05% | Healthy | Maintain current practices |
| 0.05-0.1% | Elevated | Investigate segment or content causing complaints |
| 0.1-0.3% | Warning | Reduce volume, improve targeting, address root cause |
| > 0.3% | Critical | Pause sending, full investigation, remediation plan |

---

## 6. Suppression List Management

### Types of Suppression Lists

**Global suppression**: Addresses that should never receive ANY email from your organization
- Hard bounces
- Spam complaints
- Legal/compliance suppressions (cease and desist, legal request)
- Manual suppressions (customer request)

**Unsubscribe suppression**: Addresses that have opted out of marketing email
- May still receive transactional email
- Must be respected across all sending systems

**Role address suppression**: Generic addresses that should not receive marketing
- info@, admin@, support@, sales@, webmaster@
- These often reach multiple recipients and generate complaints

### Suppression List Architecture

```
┌────────────────────────────────────────────────────────┐
│                 MASTER SUPPRESSION LIST                  │
│                                                          │
│  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │ GLOBAL SUPPRESS   │  │ MARKETING SUPPRESS          │  │
│  │ (No email ever)   │  │ (No marketing, trans OK)    │  │
│  │ - Hard bounces    │  │ - Unsubscribes              │  │
│  │ - Spam complaints │  │ - Preference center opt-outs│  │
│  │ - Legal suppress  │  │ - List-specific opt-outs    │  │
│  │ - DSAR deletions  │  │                              │  │
│  └──────────────────┘  └────────────────────────────┘  │
│                                                          │
│  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │ ROLE ADDRESSES    │  │ TEMPORARY SUPPRESS          │  │
│  │ - info@, admin@   │  │ - Pause requests            │  │
│  │ - support@, etc.  │  │ - Active automation holds   │  │
│  │                    │  │ - Frequency caps            │  │
│  └──────────────────┘  └────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Suppression List Synchronization

If you use multiple sending systems (marketing ESP + transactional ESP + CRM email):
- Master suppression list must be synchronized across ALL systems
- Use a centralized data store (CDP or custom database) as the source of truth
- Sync frequency: Real-time for complaints and bounces, daily for preference changes
- Audit monthly to confirm synchronization is working

---

## 7. Deliverability Recovery

### Diagnosing Deliverability Problems

**Symptom → Likely Cause → Investigation**:

```
Low open rates (across ISPs)
├── Subject line problem → Test new subject lines
├── Send time problem → Analyze engagement patterns
└── Reputation problem → Check Postmaster Tools

Low open rates (Gmail only)
├── Gmail reputation drop → Check Google Postmaster Tools
├── Spam folder placement → Run seed list test
└── Promotions tab → This may be normal for marketing email

High bounce rates (sudden spike)
├── List quality issue → Validate recent additions
├── ISP blocking → Check for blocks at specific ISPs
└── DNS issue → Verify SPF, DKIM, MX records

High complaint rates
├── Consent problem → Review acquisition sources
├── Frequency problem → Survey subscribers, reduce frequency
├── Relevance problem → Improve segmentation and personalization
└── Unexpected email → Welcome series may be missing
```

### Recovery Protocol

**Phase 1: Triage (Day 1)**
- Identify scope: Which ISPs are affected? Since when?
- Pause non-essential marketing sends
- Continue critical transactional email

**Phase 2: Diagnosis (Days 1-3)**
- Review Google Postmaster Tools (reputation, spam rate, authentication)
- Check blacklist status (MXToolbox)
- Audit recent sends (volume changes, new segments, content changes)
- Review FBL complaints (patterns in complained-about emails)

**Phase 3: Remediation (Days 3-7)**
- Fix root cause (authentication, content, list quality)
- Clean list aggressively (remove unengaged contacts)
- Reduce sending volume to most engaged subscribers only

**Phase 4: Rebuilding (Weeks 2-4)**
- Gradually increase volume (similar to IP warming)
- Send only best content to most engaged segments
- Monitor daily for improvement in placement

**Phase 5: Prevention (Ongoing)**
- Implement monitoring and alerts
- Establish sending governance policies
- Schedule regular deliverability audits

### Recovery Timeline

- Minor reputation dip: 1-2 weeks
- Moderate reputation damage: 2-4 weeks
- Severe reputation damage (blacklisting): 4-8 weeks
- Total reputation rebuild: 8-12 weeks

---

## 8. Email Authentication Infrastructure

### Authentication Records Management

**SPF Record Optimization**:
- Consolidate authorized senders to minimize DNS lookups (10-lookup limit)
- Use `include` mechanisms for third-party services
- Consider SPF flattening services for complex setups (e.g., AutoSPF)
- Review and update SPF records when changing ESPs or adding services

**DKIM Key Management**:
- Rotate DKIM keys annually (or more frequently for high-security environments)
- Use 2048-bit keys minimum (1024-bit is deprecated)
- Use unique selectors for each sending service
- Keep old public keys in DNS for 30 days after rotation (to verify in-transit messages)

**DMARC Policy Progression**:
```
Month 1-3:  p=none (monitor and collect data)
            Analyze aggregate reports (rua)
            Identify all legitimate sending sources

Month 3-6:  p=quarantine; pct=10 (test quarantine on 10% of failures)
            Gradually increase pct to 25, 50, 75, 100

Month 6+:   p=reject (full enforcement)
            Continue monitoring for false positives
            Maintain as new sending sources are added
```

---

## 9. High-Volume Sending Architecture

### Throughput Planning

For organizations sending millions of emails:

**Infrastructure requirements**:
- Multiple sending IPs (spread volume across IPs to avoid throttling)
- Geographic distribution (sending servers near major ISPs)
- Queue management (handle spikes without overwhelming ISPs)
- ISP-specific throttling (respect each ISP's rate limits)

**ISP Rate Limits (Approximate)**:
| ISP | Connections/IP | Messages/Connection | Messages/Hour |
|-----|---------------|--------------------|--------------|
| Gmail | 20-50 | 100-200 | Varies by reputation |
| Microsoft | 500 | 500 | Varies by reputation |
| Yahoo | 10-20 | Varies | Reputation-dependent |

### Queuing Architecture

```
┌──────────────┐    ┌───────────────┐    ┌──────────────────┐
│ Email         │    │ Message Queue  │    │ Sending Cluster   │
│ Generation    │───>│ (RabbitMQ,    │───>│ (Multiple IPs,    │
│ (Application) │    │  SQS, Redis)  │    │  Multiple Servers) │
└──────────────┘    └───────────────┘    └──────────┬───────┘
                                                     │
                                          ┌──────────▼───────┐
                                          │ ISP-Specific      │
                                          │ Throttling Layer   │
                                          │ (Per-ISP queues)   │
                                          └──────────┬───────┘
                                                     │
                                          ┌──────────▼───────┐
                                          │ ISP Mail Servers   │
                                          │ (Gmail, Outlook,   │
                                          │  Yahoo, etc.)      │
                                          └──────────────────┘
```

---

## 10. Infrastructure Cost Optimization

### Cost Drivers

| Cost Factor | Impact | Optimization |
|-------------|--------|-------------|
| ESP per-send fees | High for high volume | Negotiate volume discounts, consider SES for bulk |
| Dedicated IPs | Fixed monthly cost | Use only if volume justifies (> 50K/month) |
| Email validation | Per-validation fee | Validate at capture + quarterly bulk |
| Deliverability tools | Subscription fees | Essential investment — do not cut |
| CDN for images | Usage-based | Optimize image sizes, use appropriate CDN |
| Development time | Team cost | Template standardization reduces dev time |

### Build vs. Buy Decision

**Buy (Use managed ESP)**:
- Best for: Most organizations
- Pros: Maintained infrastructure, compliance features, support, integrations
- Cons: Less control, vendor lock-in, per-send costs add up at scale

**Build (Self-hosted email infrastructure)**:
- Best for: Very high-volume senders (100M+ monthly), organizations with unique requirements
- Pros: Full control, lower marginal costs, custom features
- Cons: Massive operational burden, deliverability expertise needed, IP management, compliance responsibility

**Hybrid (SES + custom layer)**:
- Best for: Technical teams wanting control with reliability
- Pros: Low per-send cost, control over sending logic, AWS infrastructure
- Cons: Must build delivery management, analytics, and compliance layers

### Total Cost of Email Infrastructure

For a program sending 1M emails per month:
- **Budget ESP (Mailchimp)**: ~$800/month
- **Mid-tier ESP (Klaviyo)**: ~$1,200/month
- **Enterprise ESP (Braze)**: ~$3,000-10,000/month
- **Amazon SES + custom**: ~$100/month + development cost
- **Deliverability tools**: ~$200-500/month
- **Email validation**: ~$50-100/month

The cheapest option is rarely the best value. Deliverability, automation capability, and integration quality drive ROI far more than per-send cost savings.

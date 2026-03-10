# Deliverability Testing — Inbox Placement, Authentication, and Rendering

## 1. Inbox Placement Testing

Inbox placement testing determines WHERE your emails land — primary inbox, promotions tab, spam folder, or missing entirely. This is the most critical deliverability metric because an email in spam is functionally equivalent to an email never sent.

### Seed List Testing Methodology

Seed list testing sends your email to a controlled set of test addresses across major ISPs, then checks where each landed.

**How it works**:
1. Maintain seed addresses at every major ISP (Gmail, Outlook, Yahoo, AOL, Apple, Comcast, etc.)
2. Include seed addresses in your normal send (or send a dedicated test)
3. After send, the testing tool checks each seed inbox for placement
4. Report shows inbox vs spam vs missing by ISP

**Seed list testing tools**:

| Tool | Seed Addresses | ISPs Covered | Additional Features |
|------|---------------|-------------|-------------------|
| GlockApps | 70+ | 30+ | Real-time monitoring, bounce analysis |
| Validity/Everest | 100+ | 35+ | Reputation monitoring, competitive intelligence |
| Litmus (Spam Testing) | 20+ | 20+ | Integrated with rendering testing |
| MailMonitor | 50+ | 25+ | ISP-specific recommendations |
| InboxReady (Sinch) | 60+ | 30+ | DMARC analysis, domain monitoring |

### Interpreting Inbox Placement Results

| ISP | Inbox Placement | Interpretation |
|-----|-----------------|---------------|
| Gmail | > 90% inbox | Healthy |
| Gmail | 70-90% inbox | Reputation declining, investigate |
| Gmail | < 70% inbox | Critical — likely reputation or authentication issue |
| Outlook | > 85% inbox | Healthy |
| Yahoo | > 85% inbox | Healthy |
| Apple Mail | > 95% inbox | Healthy (Apple is generally permissive) |

**ISP-specific patterns**:
- **Gmail**: Most sophisticated filtering. Heavily weights engagement. Promotions tab placement is normal for marketing email.
- **Microsoft (Outlook.com, Hotmail, Live)**: Uses SmartScreen filter. Sensitive to complaint rates. Blocks aggressively from new senders.
- **Yahoo/AOL (Verizon Media)**: Uses engagement and complaint data. Slower to update reputation.
- **Apple Mail**: Uses on-device filtering (less centralized). Generally high inbox placement.

### Monitoring Cadence

- **Pre-launch**: Full seed list test before launching any new automation or campaign series
- **Weekly**: Automated seed list test on regular sends
- **After changes**: Test after any change to sending infrastructure, authentication, or domain
- **After incidents**: Test immediately after any spike in bounces, complaints, or blocks

---

## 2. Authentication Verification

### SPF Verification

**Testing SPF records**:
```
DNS lookup: dig TXT example.com | grep spf
Expected output: v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

**Verification checklist**:
- [ ] SPF record exists for sending domain
- [ ] All sending IPs and third-party services are included
- [ ] Record uses `-all` (hard fail) or `~all` (soft fail) — never `+all`
- [ ] Total DNS lookups do not exceed 10 (SPF lookup limit)
- [ ] Record is a single TXT entry (multiple SPF records cause failure)

**Common SPF failures**:
- Too many DNS lookups (use `include` flattening if needed)
- Missing a sending service (new ESP added but SPF not updated)
- Multiple SPF records on the same domain (only one is valid)
- Using `ptr` mechanism (deprecated and slow)

### DKIM Verification

**Testing DKIM signatures**:
- Send a test email and examine headers for `DKIM-Signature`
- Verify the signature using online tools (DKIMValidator.com, MXToolbox)
- Check that the `d=` domain aligns with the From domain (for DMARC alignment)

**Verification checklist**:
- [ ] DKIM signature present in email headers
- [ ] Public key published in DNS at correct selector
- [ ] Key length is 2048 bits (1024 is minimum, 2048 is recommended)
- [ ] Signature validates successfully
- [ ] `d=` domain aligns with From header domain (or organizational domain)

**Common DKIM failures**:
- DNS propagation delay after key rotation
- Key mismatch between signing and verification
- Intermediate servers modifying email content (breaking the signature)
- Using the ESP's default domain instead of your own

### DMARC Verification

**Testing DMARC records**:
```
DNS lookup: dig TXT _dmarc.example.com
Expected output: v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100
```

**DMARC verification checklist**:
- [ ] DMARC record exists at `_dmarc.domain.com`
- [ ] Policy is appropriate for maturity level (none → quarantine → reject)
- [ ] Aggregate report URI (rua) is configured to receive reports
- [ ] Forensic report URI (ruf) is configured (optional but valuable)
- [ ] Percentage (pct) is set appropriately (100% when confident)
- [ ] Subdomain policy (sp) is defined if subdomains are used for sending

**DMARC alignment verification**:
- SPF alignment: Return-Path domain matches From domain (or organizational domain)
- DKIM alignment: DKIM `d=` domain matches From domain (or organizational domain)
- At least ONE must align for DMARC to pass

### BIMI Verification

**Prerequisites for BIMI**:
- DMARC at `p=quarantine` or `p=reject` with 100% enforcement
- SVG logo in BIMI-compliant format (SVG Tiny Portable/Secure)
- Verified Mark Certificate (VMC) from DigiCert or Entrust

**DMARC record for BIMI**:
```
DNS: dig TXT default._bimi.example.com
Expected: v=BIMI1; l=https://example.com/logo.svg; a=https://example.com/cert.pem
```

---

## 3. Blacklist Monitoring

### What Are Blacklists?

Blacklists (DNSBLs — DNS-based Blackhole Lists) are databases of IP addresses and domains identified as spam sources. ISPs query these lists when deciding whether to accept your email.

### Major Blacklists to Monitor

| Blacklist | Severity | Impact | Delisting Process |
|-----------|---------|--------|-------------------|
| Spamhaus SBL | Critical | Blocks at most major ISPs | Manual request, may require remediation |
| Spamhaus XBL | High | Compromised IP detection | Automatic after cleanup |
| Spamhaus DBL | High | Domain-level blocking | Manual request |
| Barracuda BRBL | Medium | Blocks at Barracuda users | Self-service removal |
| SORBS | Medium | Various lists by type | Self-service or automatic |
| SpamCop | Medium | Short-term listing | Automatic (24-48 hours) |
| UCEProtect | Low-Medium | Three levels of listing | Paid or wait for automatic removal |

### Blacklist Monitoring Protocol

**Automated monitoring**: Use MXToolbox, Hetrix Tools, or similar to monitor sending IPs and domains daily.

**Response protocol when listed**:
1. **Identify**: Which blacklist, which IP/domain, since when
2. **Diagnose**: What caused the listing (spam trap hit, complaints, compromised account)
3. **Remediate**: Fix the root cause before requesting delisting
4. **Request delisting**: Follow each blacklist's specific process
5. **Prevent**: Implement safeguards to prevent recurrence

### Spam Trap Types

| Trap Type | Description | Risk Level | How to Avoid |
|-----------|-------------|-----------|-------------|
| Pristine trap | Email address that never belonged to a real person | Critical | Never purchase lists; use double opt-in |
| Recycled trap | Abandoned email address repurposed as a trap | High | Maintain sunset policies; validate regularly |
| Typo trap | Common misspellings of major domains | Medium | Real-time email validation at signup |
| Honeypot trap | Hidden addresses on websites harvested by scrapers | High | Never scrape; use form-based signup only |

---

## 4. Spam Score Testing

### Pre-Send Spam Analysis

Before sending any campaign, run the content through spam score analysis:

**SpamAssassin scoring** (open-source, widely used baseline):
- Score < 3.0: Very low spam risk
- Score 3.0-5.0: Moderate risk (review flagged elements)
- Score > 5.0: High risk (do not send without modifications)

**Common SpamAssassin triggers**:
- `MIME_HTML_ONLY` (+0.7): HTML email with no plain text alternative
- `HTML_IMAGE_ONLY_04` (+1.7): Email is 0-4% text, rest is images
- `RDNS_NONE` (+1.3): Sending IP has no reverse DNS
- `URIBL_BLACK` (+1.7): URL in body matches known spam domains
- `FREEMAIL_FROM` (+1.0): Sending from a free email provider (gmail, yahoo)

### Content Analysis Checklist

- [ ] Text-to-image ratio is at least 60:40 (prefer 70:30 text)
- [ ] No spam trigger word clusters (avoid combining urgency + financial + claims)
- [ ] Subject line is not deceptive or misleading
- [ ] Email contains a physical mailing address
- [ ] Unsubscribe mechanism is present and functional
- [ ] All URLs resolve to legitimate, non-blacklisted domains
- [ ] No URL shorteners in email body
- [ ] Email has both HTML and plain text versions
- [ ] No JavaScript or embedded forms
- [ ] Sender address matches the content and brand

---

## 5. Rendering Testing Across Email Clients

### The 90+ Client Challenge

Email renders differently across 90+ email client/device/OS combinations. Testing ensures consistent experience for the majority of subscribers.

### Priority Testing Matrix

Test these clients based on subscriber data (check your email analytics for actual client distribution):

**Tier 1 (Must test — covers ~80% of subscribers)**:
| Client | Platform | Rendering Engine |
|--------|----------|-----------------|
| Gmail (webmail) | Web | Gmail's renderer |
| Gmail (mobile app) | iOS/Android | Gmail's renderer |
| Apple Mail | iOS | WebKit |
| Apple Mail | macOS | WebKit |
| Outlook 365 | Windows | Microsoft Word |
| Outlook (webmail) | Web | Outlook's renderer |
| Yahoo Mail | Web | Yahoo's renderer |

**Tier 2 (Should test — covers next ~15%)**:
| Client | Platform | Notes |
|--------|----------|-------|
| Outlook 2019/2021 | Windows | Word rendering engine |
| Samsung Mail | Android | Android WebView |
| Outlook (mobile) | iOS/Android | Generally good rendering |
| Thunderbird | Desktop | Gecko engine |
| AOL Mail | Web | Similar to Yahoo |

**Tier 3 (Good to test — edge cases)**:
| Client | Platform | Notes |
|--------|----------|-------|
| Windows Mail | Windows | Modern, generally good |
| Comcast/Xfinity | Web | Limited market share |
| ProtonMail | Web | Privacy-focused, strips tracking |
| Fastmail | Web | Standards-compliant |

### Rendering Issues Checklist

**Layout issues**:
- [ ] Email does not exceed 600-640px width on desktop
- [ ] Tables render correctly in Outlook (test with MSO conditional comments)
- [ ] Responsive design works on mobile (single column, stacked elements)
- [ ] Padding and margins are consistent across clients
- [ ] Centered content is centered in all clients

**Typography issues**:
- [ ] Web fonts fall back to system fonts gracefully
- [ ] Font sizes are readable on mobile (minimum 14px body, 22px headlines)
- [ ] Line height is consistent (use px or unitless values, not em in tables)
- [ ] Text color is visible on both light and dark backgrounds

**Image issues**:
- [ ] Images display correctly (proper dimensions, no stretching)
- [ ] Alt text is present for all images
- [ ] Email is comprehensible with images disabled
- [ ] Retina images display correctly on high-DPI screens

---

## 6. Dark Mode Testing

### Dark Mode Behavior Across Clients

Email clients handle dark mode differently, creating unique testing challenges:

**Type 1: No color change**
- Client: Some webmail clients
- Behavior: Email appears as designed (light mode)
- Testing need: None

**Type 2: Partial inversion**
- Client: Apple Mail (iOS/macOS), Outlook (iOS/Android)
- Behavior: Light backgrounds become dark; dark text becomes light; images unchanged
- Testing need: Check that images, logos, and icons work on dark backgrounds

**Type 3: Full inversion**
- Client: Outlook.com (web), Windows Mail
- Behavior: All colors are inverted
- Testing need: Check all visual elements; some become unreadable

### Dark Mode Defensive Strategies

1. **Transparent PNGs**: Use transparent backgrounds on logos and icons so they adapt to any background color

2. **CSS color-scheme meta tag**: Declare support for dark mode
```html
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
```

3. **Media query (where supported)**:
```css
@media (prefers-color-scheme: dark) {
  .dark-mode-bg { background-color: #1a1a1a !important; }
  .dark-mode-text { color: #ffffff !important; }
}
```

4. **Outline technique for logos**: Add a thin stroke/outline around logos so they remain visible on both light and dark backgrounds

5. **Test extensively**: Dark mode rendering varies significantly. Always visually verify in Apple Mail (iOS dark mode), Outlook (dark mode), and Gmail (dark mode).

---

## 7. Accessibility Testing

### Why Email Accessibility Matters

- 15% of the global population has some form of disability
- 2.2 billion people have visual impairments (WHO)
- Many subscribers use screen readers, voice assistants, or keyboard navigation
- Accessibility often correlates with improved deliverability and engagement

### Accessibility Testing Checklist

**Semantic structure**:
- [ ] Email uses semantic HTML (`<h1>`, `<h2>`, `<p>`, `<ul>`) where possible
- [ ] Reading order is logical when CSS is stripped
- [ ] Tables used for layout include `role="presentation"`
- [ ] Data tables (if any) include `<th>` headers with `scope` attributes

**Images**:
- [ ] All images have descriptive `alt` text
- [ ] Decorative images have `alt=""` (empty alt, not missing)
- [ ] Alt text conveys meaning, not just description ("Chart showing 40% growth" not "chart.png")
- [ ] No text-as-image for essential content

**Color and contrast**:
- [ ] Text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- [ ] Information is not conveyed by color alone
- [ ] Links are distinguishable from surrounding text by more than just color (underline)
- [ ] CTA buttons meet contrast requirements for both text and background

**Text**:
- [ ] Font size is at least 14px for body text
- [ ] Line spacing is at least 1.5x font size
- [ ] Paragraphs are short (5 lines maximum)
- [ ] Language attribute is set (`<html lang="en">`)

**Interactive elements**:
- [ ] All links have descriptive text (no "click here")
- [ ] Buttons are large enough for touch/click (44x44px minimum)
- [ ] Link text makes sense out of context (screen readers may list all links)

**Testing tools**:
- [ ] Run through Litmus accessibility checker
- [ ] Test with VoiceOver (macOS/iOS) or NVDA (Windows) screen reader
- [ ] Verify with WAVE accessibility evaluator
- [ ] Check with high-contrast mode enabled

---

## 8. Email Client-Specific Testing

### Gmail Testing Specifics

Gmail strips and modifies HTML in specific ways:
- Removes `<style>` tags (use inline styles)
- Removes `<link>` elements (cannot reference external CSS)
- Renames classes and IDs
- Strips JavaScript entirely
- Clips emails larger than 102KB
- May alter image dimensions

**Gmail test protocol**:
- [ ] All styles are inlined
- [ ] Email is under 102KB
- [ ] Media queries work in supported contexts (Gmail app, not webmail)
- [ ] Promotions tab annotations are configured (schema.org markup)

### Outlook (Windows) Testing Specifics

Outlook for Windows uses Microsoft Word's rendering engine, the most restrictive of all email clients:
- No support for: background images (without VML), max-width, CSS3 properties, flexbox, grid
- Uses Word's box model (different from CSS box model)
- Tables are the only reliable layout method
- MSO conditional comments required for many workarounds

**Outlook test protocol**:
- [ ] Layout uses tables, not divs
- [ ] MSO conditional comments are in place for layout control
- [ ] VML is used for rounded buttons and background images
- [ ] Padding is applied via cellpadding or inline padding (not margin)
- [ ] Width is specified explicitly on all tables and images
- [ ] Font fallback is specified (Outlook may ignore web fonts)

---

## 9. Automated Testing Integration

### CI/CD for Email

Treat email templates like code — test them automatically before deployment:

**Automated checks**:
- HTML validation (W3C validator)
- Link validation (all links resolve)
- Image validation (all images load)
- Spam score check (SpamAssassin or similar API)
- Accessibility audit (axe-core or similar)
- File size check (under 102KB threshold)

**Integration points**:
- Pre-commit hooks for email template changes
- Automated rendering screenshots via Litmus/Email on Acid API
- Automated deliverability checks in staging environment
- Visual regression testing against baseline screenshots

### Testing in Staging vs. Production

- **Staging**: Full rendering and spam testing with test accounts
- **Pre-production**: Seed list test with real sending infrastructure
- **Production**: Monitor real-time delivery metrics in the first 30 minutes

---

## 10. Post-Send Deliverability Analysis

### Metrics to Monitor Immediately After Send

**First 30 minutes**:
- Delivery rate by ISP (any blocks or deferrals?)
- Bounce rate (unexpected hard bounces suggest list issue)
- Spam complaints (early spike suggests content or targeting problem)

**First 24 hours**:
- Open rate trajectory (compare to baseline)
- ISP-specific engagement patterns
- Unsubscribe rate (compare to baseline)

**48-72 hours**:
- Final delivery statistics
- Inbox placement rate (from seed list test)
- Revenue attribution (if applicable)

### Deliverability Issue Triage

When post-send metrics indicate a problem:

```
Low delivery rate (< 95%)
├── Check bounce types
│   ├── Hard bounces elevated → List quality issue → Clean list
│   └── Soft bounces elevated → Throttling or blocks → Check ISP status
├── Check authentication
│   ├── SPF failures → DNS record issue → Fix SPF
│   └── DKIM failures → Key rotation issue → Fix DKIM
└── Check reputation
    ├── Blacklisted → Remediate and delist
    └── Complaint spike → Content/targeting issue → Review send

Low open rate (< 15%)
├── Check inbox placement → Run seed test
│   ├── Spam folder → Reputation issue → Reduce volume, improve engagement
│   └── Inbox → Subject line problem → Test new subject lines
├── Check segment → Confirm right audience received right content
└── Check send time → Compare to optimal sending windows
```

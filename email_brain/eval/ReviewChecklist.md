# Email Review Checklist — Quality Gate (Authoritative)

This checklist must be completed before any email campaign, automation,
or program change is approved for send.
Every section must pass. Partial completion is a fail.

If a checklist item cannot be verified, it has not been done.

---

## HOW TO USE THIS CHECKLIST

1. Complete every section for the email deliverable under review
2. Mark each item: PASS, FAIL, or N/A (with justification for N/A)
3. All items must be PASS or justified N/A
4. Any FAIL = email is not approved for send
5. Reviewer must sign off with name, date, and verdict
6. Attach evidence (screenshots, test results, data) for every PASS claim

---

## SECTION 1: PRE-SEND TECHNICAL CHECKS

### 1.1 Authentication
- [ ] SPF record includes the sending IP/service
- [ ] DKIM signing is active and verified for the sending domain
- [ ] DMARC policy is set (minimum p=none with reporting; target p=quarantine or p=reject)
- [ ] Return-Path (envelope sender) is configured correctly
- [ ] Custom tracking domain is set up and SSL-secured
- [ ] Sending domain has a good reputation (checked via Google Postmaster Tools)

### 1.2 Infrastructure
- [ ] Sending IP is warmed up appropriately for the volume
- [ ] IP is not on any major blacklists (checked within 24 hours of send)
- [ ] Dedicated IP (if applicable) has consistent sending volume
- [ ] ESP account is in good standing with no warnings or restrictions
- [ ] Sending limits are understood and not being exceeded

### 1.3 Rendering
- [ ] Email renders correctly in Gmail (web and mobile)
- [ ] Email renders correctly in Outlook (desktop and web)
- [ ] Email renders correctly in Apple Mail (desktop and iOS)
- [ ] Email renders correctly in Yahoo Mail
- [ ] Dark mode rendering has been checked and is acceptable
- [ ] Images have alt text (email is readable with images blocked)
- [ ] Email width is <=600px (or responsive)
- [ ] Font stack includes web-safe fallbacks
- [ ] Preheader text is set and not showing raw code

### 1.4 Links and Tracking
- [ ] All links are functional (every link clicked and verified)
- [ ] UTM parameters are correctly appended to all links
- [ ] UTM parameters follow naming conventions consistently
- [ ] Tracking pixels are present (open tracking, if using)
- [ ] Links do not point to staging, development, or broken URLs
- [ ] Unsubscribe link is present and functional
- [ ] Preference center link is present (if applicable)

### 1.5 Deliverability Pre-Check
- [ ] Spam score checked (SpamAssassin or equivalent; target: <3)
- [ ] Subject line does not contain spam trigger words
- [ ] Text-to-image ratio is appropriate (not image-only email)
- [ ] Email has a plain-text version
- [ ] From name and email address are recognizable to recipients
- [ ] Reply-to address is monitored

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 2: CONTENT AND COPY

### 2.1 Subject Line
- [ ] Subject line is <=50 characters (ideal) or <=70 characters (maximum)
- [ ] Subject line is clear about the email's content (no clickbait)
- [ ] Subject line creates urgency or curiosity without being misleading
- [ ] Subject line does not use ALL CAPS or excessive punctuation (!!!)
- [ ] Subject line has been A/B tested (or test is configured for this send)
- [ ] Preheader text complements the subject line (not duplicates it)

### 2.2 Body Content
- [ ] Email has one clear primary CTA (call to action)
- [ ] Primary CTA is above the fold
- [ ] CTA button text is action-oriented (not "Click Here" or "Learn More" generically)
- [ ] Content hierarchy is clear (scannable, not a wall of text)
- [ ] Content is relevant to the target segment
- [ ] Personalization elements render correctly (no broken merge tags showing {first_name})
- [ ] Content tone matches brand voice guidelines
- [ ] Content is proofread (no spelling, grammar, or factual errors)
- [ ] Mobile reading experience is prioritized (short paragraphs, large buttons)

### 2.3 Design
- [ ] Design follows email brand guidelines (colors, typography, layout)
- [ ] Visual hierarchy guides the reader to the CTA
- [ ] Images are optimized for fast loading (<200KB per image, <800KB total)
- [ ] Button size is touch-friendly for mobile (minimum 44x44px tap target)
- [ ] White space is used effectively (not cramped)
- [ ] Footer contains all required elements (address, unsubscribe, privacy link)

### 2.4 Accessibility
- [ ] Color contrast meets minimum standards (4.5:1 for body text)
- [ ] Alt text is descriptive for all images
- [ ] Email is readable without images
- [ ] Link text is descriptive (not "click here")
- [ ] Heading hierarchy is logical (not using headings for styling)
- [ ] Font size is readable (minimum 14px for body text)

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 3: AUDIENCE AND SEGMENTATION

### 3.1 List Selection
- [ ] Target audience is clearly defined for this email
- [ ] Segment criteria are documented and verified
- [ ] Segment size is appropriate (not too broad, not too narrow)
- [ ] Segment has been cleaned of hard bounces, unsubscribes, and complaints
- [ ] Suppression lists have been applied (global unsubscribes, frequency caps, legal holds)
- [ ] Recently bounced addresses are excluded (90-day hard bounce suppression)

### 3.2 Consent Verification
- [ ] All recipients have opted in to receive this type of email
- [ ] Consent type matches the email type (marketing consent for marketing email)
- [ ] No purchased list contacts are included
- [ ] GDPR/CASL-specific consent requirements are met for applicable recipients
- [ ] Consent records can be produced for any recipient if requested

### 3.3 Personalization
- [ ] Personalization fields are populated for all recipients (no blanks that break the template)
- [ ] Fallback values are set for empty personalization fields
- [ ] Dynamic content blocks render correctly for all segments
- [ ] Personalization is tested with sample records from each segment
- [ ] Personalization adds value (not just {first_name} for the sake of it)

### 3.4 Frequency Management
- [ ] This send does not exceed the frequency cap for any recipient
- [ ] Recipients have not received a conflicting message in the past 24 hours
- [ ] Send timing does not conflict with other scheduled campaigns
- [ ] Frequency across all channels (email, SMS, push) is considered
- [ ] High-frequency recipients are identified and managed

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 4: COMPLIANCE

### 4.1 CAN-SPAM Requirements
- [ ] From name accurately identifies the sender
- [ ] Subject line is not deceptive
- [ ] Email is identified as an ad (if it is one)
- [ ] Physical mailing address is included
- [ ] Unsubscribe mechanism is present and conspicuous
- [ ] Unsubscribe mechanism will be honored within 10 business days

### 4.2 GDPR Requirements (if applicable)
- [ ] Lawful basis for processing is documented (consent, legitimate interest, etc.)
- [ ] Privacy notice link is included
- [ ] Data processing records are maintained
- [ ] Right to erasure can be executed if requested
- [ ] Data is not transferred outside EU/EEA without adequate protections

### 4.3 CASL Requirements (if applicable to Canadian recipients)
- [ ] Express or implied consent is documented for all Canadian recipients
- [ ] Sender identification is clear (name, mailing address, contact information)
- [ ] Unsubscribe mechanism is functional and will be honored within 10 business days
- [ ] Consent type and date are recorded for all recipients

### 4.4 Industry-Specific Compliance (if applicable)
- [ ] Financial services: required disclosures are included
- [ ] Healthcare: HIPAA considerations addressed
- [ ] Other regulatory requirements identified and met

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 5: TESTING AND QA

### 5.1 Test Sends
- [ ] Test email sent to internal distribution list
- [ ] Test email reviewed on desktop (minimum 2 email clients)
- [ ] Test email reviewed on mobile (minimum iOS and Android)
- [ ] All personalization fields verified in test
- [ ] All links verified in test
- [ ] Unsubscribe link verified in test
- [ ] Reply-to address verified in test

### 5.2 A/B Test Configuration (if applicable)
- [ ] Test hypothesis is documented
- [ ] Test variable is isolated (only one thing different between A and B)
- [ ] Sample size is sufficient for statistical significance
- [ ] Winner selection criteria are defined (metric, significance level, wait time)
- [ ] Automatic winner deployment is configured (or manual deployment plan is in place)
- [ ] Test results will be documented in the test log

### 5.3 Automation-Specific Testing (if applicable)
- [ ] Trigger conditions are tested and verified
- [ ] Entry criteria are tested (right people enter, wrong people do not)
- [ ] Exit criteria are tested (people exit when they should)
- [ ] Wait steps and delays are correct
- [ ] Branching logic is verified for all paths
- [ ] Edge cases are tested (what if someone triggers mid-sequence?)
- [ ] Automation does not conflict with other active automations

### 5.4 Seed List
- [ ] Seed list (internal monitoring addresses) is included in the send
- [ ] Seed list covers major email clients (Gmail, Outlook, Yahoo, Apple)
- [ ] Seed list results will be monitored post-send

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 6: SEND STRATEGY

### 6.1 Timing
- [ ] Send time is optimized for the target audience (not just "now")
- [ ] Time zone considerations are addressed (send in recipient's local time if possible)
- [ ] Send day is appropriate for the content type and audience
- [ ] Send time does not conflict with major holidays or events
- [ ] Send cadence is consistent with subscriber expectations

### 6.2 Volume Management
- [ ] Send volume is within normal range for this IP/domain (no sudden spikes)
- [ ] If volume is higher than normal, warm-up plan is in place
- [ ] Throttling is configured if needed (gradual send over hours, not all at once)
- [ ] Large list sends are staggered to manage load

### 6.3 Contingency Planning
- [ ] Rollback plan exists if something goes wrong mid-send
- [ ] Correction email template is prepared (in case of errors)
- [ ] Escalation contacts are identified for send-day issues
- [ ] Post-send monitoring plan is defined (what to watch, for how long)

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## SECTION 7: POST-SEND MONITORING

### 7.1 Immediate Monitoring (0-4 hours)
- [ ] Delivery rate is within expected range
- [ ] Bounce rate is within acceptable limits
- [ ] No spike in spam complaints
- [ ] Seed list emails arrived in inbox
- [ ] No rendering issues reported

### 7.2 Short-Term Monitoring (4-48 hours)
- [ ] Open rate tracking (relative to benchmarks)
- [ ] Click-through rate tracking
- [ ] Unsubscribe rate tracking
- [ ] Reply monitoring (if reply-to is active)
- [ ] Conversion tracking setup verified

### 7.3 Post-Send Analysis (within 1 week)
- [ ] Campaign performance documented against goals
- [ ] A/B test results analyzed and documented
- [ ] Key learnings identified and recorded
- [ ] Anomalies investigated and explained
- [ ] Results shared with stakeholders

**Section Verdict:** PASS / FAIL
**Evidence attached:** [ ]

---

## FINAL REVIEW VERDICT

```markdown
## Email Review: [Campaign/Automation Name]

| Section | Verdict | Reviewer |
|---------|---------|----------|
| 1. Pre-Send Technical Checks | PASS/FAIL | |
| 2. Content and Copy | PASS/FAIL | |
| 3. Audience and Segmentation | PASS/FAIL | |
| 4. Compliance | PASS/FAIL | |
| 5. Testing and QA | PASS/FAIL | |
| 6. Send Strategy | PASS/FAIL | |
| 7. Post-Send Monitoring | PASS/FAIL | |

**Overall Verdict:** APPROVED TO SEND / NOT APPROVED
**Reviewer:** [Name]
**Date:** [Date]
**Send Date/Time:** [Planned send]
**Conditions (if conditional approval):** [List]
**Required fixes (if not approved):** [List with deadlines]
```

---

## REVIEW CADENCE

| Review Type | Frequency | Scope |
|-------------|-----------|-------|
| Individual campaign send | Before every send | Sections 1-6 (Section 7 post-send) |
| New automation launch | Before activation | All 7 sections |
| Automation review | Quarterly | Sections 1-5 for all active automations |
| Template update | Before deployment | Sections 1-2 |
| List import | Before import | Sections 3-4 |
| Compliance audit | Semi-annually | Section 4 comprehensively |

---

## ENFORCEMENT RULE

Every email must pass this checklist before sending.
No exceptions for "urgent" sends — urgency does not override quality.
If evidence cannot be produced, the item has not been done.
Email reviews are non-negotiable gates, not suggestions.

---

## END OF REVIEW CHECKLIST

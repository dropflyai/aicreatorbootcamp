# DevRel Review Checklist — Pre-Ship Verification (Authoritative)

This checklist must be completed before any DevRel initiative ships.
Every section must pass. Partial completion is not acceptable.

If an item cannot be verified, it has not been done.

---

## HOW TO USE THIS CHECKLIST

1. Complete every section relevant to the initiative type
2. Mark each item: PASS / FAIL / N/A
3. All FAIL items must be resolved before shipping
4. Reviewer must sign off with name, date, and initiative name
5. Archive completed checklists for retrospective analysis

### Initiative Types and Required Sections
| Type | Required Sections |
|------|-------------------|
| SDK Release | 1, 2, 3, 5, 6, 8, 9, 10 |
| Documentation Update | 1, 2, 3, 9, 10 |
| Community Initiative | 1, 4, 7, 9, 10 |
| Content Publication | 1, 3, 6, 9, 10 |
| Event | 1, 4, 7, 8, 9, 10 |
| Full Program Review | All sections |

---

## SECTION 1: DEVELOPER EXPERIENCE VERIFICATION

### First-Run Experience
- [ ] Time-to-hello-world tested on clean machine (macOS, Linux, Windows)
- [ ] TTFHW is under 5 minutes on all supported platforms
- [ ] Quickstart guide followed step-by-step without deviation
- [ ] All prerequisites are documented and version-pinned
- [ ] Copy-paste commands work without modification
- [ ] No hidden assumptions about developer environment
- [ ] Fallback instructions provided for common environment issues

### Error Experience
- [ ] All error messages include what went wrong
- [ ] All error messages include why it went wrong
- [ ] All error messages include how to fix it
- [ ] Error messages do not expose internal stack traces
- [ ] Error messages include a documentation link where appropriate
- [ ] Error codes are unique, searchable, and documented
- [ ] Network errors are distinguished from user errors

### Progressive Onboarding
- [ ] Learning path defined from beginner to advanced
- [ ] Each step builds on the previous without gaps
- [ ] Complexity increases gradually, not in cliffs
- [ ] "Escape hatches" exist for advanced developers to skip ahead
- [ ] Multiple entry points exist for different experience levels

---

## SECTION 2: DOCUMENTATION VERIFICATION

### Divio Framework Audit
- [ ] Tutorials exist for all core use cases
- [ ] Tutorials are learning-oriented (not reference-oriented)
- [ ] How-to guides exist for common tasks
- [ ] How-to guides are goal-oriented with clear outcomes
- [ ] Explanation pages cover architecture and design decisions
- [ ] Reference docs are complete, accurate, and auto-generated where possible
- [ ] Each doc type is clearly labeled and does not mix types

### Content Quality
- [ ] All code samples compile and run without modification
- [ ] Code samples are tested in CI on every release
- [ ] Code samples use current API versions
- [ ] No deprecated methods in code samples
- [ ] Placeholder values are clearly marked (YOUR_API_KEY, etc.)
- [ ] Code samples include error handling, not just happy path
- [ ] Language/framework-specific idioms are followed

### Search and Navigation
- [ ] Full-text search is functional and returns relevant results
- [ ] Navigation structure matches developer mental model
- [ ] Breadcrumbs and cross-links help developers find related content
- [ ] 404 pages suggest relevant alternatives
- [ ] URL structure is logical and stable (no breaking URL changes)
- [ ] Top search queries return relevant results on the first page

### Freshness and Maintenance
- [ ] Docs are updated within 48 hours of API changes
- [ ] Version selector is available and functional
- [ ] Deprecated features are clearly marked with migration paths
- [ ] Last-updated dates are visible on every page
- [ ] Broken link monitoring is active
- [ ] Content owner is assigned for every section

---

## SECTION 3: SDK AND API VERIFICATION

### API Design
- [ ] API follows consistent naming conventions
- [ ] Method names are intuitive without documentation
- [ ] Parameters are clearly named and typed
- [ ] Required vs. optional parameters are obvious
- [ ] Default values are sensible and documented
- [ ] API surface area is minimal (no unnecessary methods)
- [ ] Pagination, filtering, and sorting follow consistent patterns

### Type Safety
- [ ] TypeScript definitions are complete and accurate
- [ ] Generic types are used appropriately for flexibility
- [ ] Union types are used instead of any/unknown where possible
- [ ] IDE autocompletion works correctly with types
- [ ] Type exports are available for all public interfaces
- [ ] Types are tested against the actual API responses

### Error Handling
- [ ] Errors are typed (not generic Error or string)
- [ ] Error types distinguish between categories (auth, validation, network, server)
- [ ] Retry logic is built in for transient errors
- [ ] Rate limit errors include retry-after information
- [ ] Timeout errors are configurable and clearly messaged
- [ ] Partial failures are handled gracefully in batch operations

### Versioning
- [ ] Strict SemVer compliance verified
- [ ] CHANGELOG is up to date with user-facing descriptions
- [ ] Migration guide exists for every major version bump
- [ ] Deprecation warnings appear at least 2 minor versions before removal
- [ ] Breaking changes are listed prominently in release notes
- [ ] Multiple major versions are supported simultaneously with clear EOL dates

---

## SECTION 4: COMMUNITY VERIFICATION

### Platform Health
- [ ] Community platform is accessible and performant
- [ ] Onboarding flow for new community members is frictionless
- [ ] Code of conduct is visible, clear, and enforced
- [ ] Moderation team is staffed and responsive
- [ ] Community guidelines distinguish questions, discussions, and bugs
- [ ] Spam and abuse detection is active

### Engagement Quality
- [ ] Response time SLA is defined and met (< 4 hours for questions)
- [ ] Responses are helpful, not just acknowledgments
- [ ] Community members are recognized and rewarded for contributions
- [ ] Unanswered questions are escalated within 24 hours
- [ ] Frequently asked questions are converted to documentation
- [ ] Community feedback is routed to product and engineering

### Contributor Experience
- [ ] Contributing guide is clear and up to date
- [ ] First contribution experience is smooth (good-first-issue labels)
- [ ] PR review turnaround is < 48 hours
- [ ] Contributors receive meaningful feedback, not just approve/reject
- [ ] Contributor recognition program is active
- [ ] Path from contributor to maintainer is documented

---

## SECTION 5: RELEASE VERIFICATION

### Pre-Release
- [ ] All tests pass on all supported platforms
- [ ] Integration tests cover core use cases
- [ ] Performance benchmarks show no regressions
- [ ] Security audit completed (dependencies and code)
- [ ] Release notes drafted with user-facing descriptions
- [ ] Migration guide written if breaking changes exist

### Release Process
- [ ] Release follows the documented release process
- [ ] Version number follows SemVer correctly
- [ ] Package published to all supported registries (npm, PyPI, Maven, etc.)
- [ ] Release is tagged in version control
- [ ] Documentation is updated simultaneously with release
- [ ] Changelog is published and linked from release notes

### Post-Release
- [ ] Smoke tests pass on published packages
- [ ] Quickstart guide verified against new release
- [ ] Community notified of release (blog, social, newsletter)
- [ ] Support team briefed on changes
- [ ] Monitoring active for error rate spikes
- [ ] Rollback plan is documented and tested

---

## SECTION 6: CONTENT VERIFICATION

### Technical Accuracy
- [ ] All code in content compiles and runs
- [ ] Technical claims are verified and sourced
- [ ] Architecture diagrams are accurate and current
- [ ] Performance numbers are reproducible
- [ ] No outdated information or references to deprecated features
- [ ] Technical review completed by subject matter expert

### Content Quality
- [ ] Title is clear and descriptive (not clickbait)
- [ ] Introduction states the problem and who the content is for
- [ ] Content follows a logical progression
- [ ] Code examples are progressive (simple to complex)
- [ ] Conclusion includes next steps and related resources
- [ ] Content is accessible (no jargon without explanation)

### Distribution
- [ ] SEO metadata is complete (title, description, keywords)
- [ ] Social media sharing cards are configured
- [ ] Cross-promotion plan is defined
- [ ] Distribution channels are identified and scheduled
- [ ] Content is linked from relevant documentation pages
- [ ] Analytics tracking is configured

---

## SECTION 7: EVENT VERIFICATION

### Pre-Event
- [ ] Event goals and success metrics defined
- [ ] Target audience identified and marketing plan in place
- [ ] Speaker lineup confirmed with talk abstracts
- [ ] Technical requirements verified (demos, Wi-Fi, A/V)
- [ ] Accessibility accommodations available
- [ ] Code of conduct prominently displayed

### During Event
- [ ] Registration and check-in process is smooth
- [ ] Technical demos have been rehearsed and have backup plans
- [ ] Live Q&A is moderated and inclusive
- [ ] Feedback collection mechanism is active
- [ ] Social media coverage is planned and executed
- [ ] Support staff available for technical questions

### Post-Event
- [ ] Attendee feedback collected and analyzed
- [ ] NPS calculated and compared to targets
- [ ] Follow-up resources sent to attendees within 48 hours
- [ ] Recordings published (if applicable) within 1 week
- [ ] Pipeline and conversion tracking initiated
- [ ] Retrospective completed with team

---

## SECTION 8: ATTRIBUTION VERIFICATION

### Tracking Setup
- [ ] UTM parameters configured for all DevRel links
- [ ] CRM integration capturing developer touchpoints
- [ ] Content attribution tracking is functional
- [ ] Event registration linked to CRM records
- [ ] Community activity linked to user accounts
- [ ] Multi-touch attribution model is configured

### Reporting
- [ ] Monthly DevRel metrics report generated
- [ ] Developer-sourced pipeline is calculated and reported
- [ ] Community-influenced deals are tagged and tracked
- [ ] Content performance dashboard is current
- [ ] Event ROI is calculated per event
- [ ] Attribution anomalies are investigated and explained

---

## SECTION 9: ACCESSIBILITY AND INCLUSION

- [ ] Documentation meets WCAG 2.1 AA standards
- [ ] Code samples include comments for screen reader users
- [ ] Video content has captions and transcripts
- [ ] Event venues are physically accessible
- [ ] Virtual events have accessibility features (captions, sign language)
- [ ] Community platforms support assistive technologies
- [ ] Content avoids exclusionary language
- [ ] Images have alt text

---

## SECTION 10: FINAL SIGN-OFF

### Reviewer Certification

```markdown
## DevRel Review Sign-Off

**Initiative:** [Name]
**Type:** [SDK Release / Doc Update / Event / Content / Community / Full Review]
**Date:** [YYYY-MM-DD]
**Reviewer:** [Name]

### Section Results
| Section | Status | Notes |
|---------|--------|-------|
| 1. Developer Experience | PASS/FAIL/N-A | |
| 2. Documentation | PASS/FAIL/N-A | |
| 3. SDK and API | PASS/FAIL/N-A | |
| 4. Community | PASS/FAIL/N-A | |
| 5. Release | PASS/FAIL/N-A | |
| 6. Content | PASS/FAIL/N-A | |
| 7. Event | PASS/FAIL/N-A | |
| 8. Attribution | PASS/FAIL/N-A | |
| 9. Accessibility | PASS/FAIL/N-A | |

**Overall Verdict:** APPROVED / BLOCKED
**Blocking Issues:** [list if any]
**Required Follow-Ups:** [list if any]
**Next Review Date:** [if applicable]
```

---

## ENFORCEMENT RULE

Every initiative must pass this checklist before shipping.
Incomplete reviews are treated as failures.
Do not ship with known FAIL items.

---

## END OF REVIEW CHECKLIST

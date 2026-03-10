# Accessibility Testing — WCAG 2.1, Screen Readers, Automated Tools, and ARIA

## What This Enables

**Decisions it helps make:**
- Which WCAG 2.1 conformance level (A, AA, AAA) to target based on legal requirements, user base, and implementation cost
- Whether to remediate an accessibility issue immediately or accept it with a documented remediation timeline
- Which combination of automated tools and manual testing provides adequate accessibility coverage
- When ARIA attributes are necessary versus when native HTML semantics provide equivalent accessibility

**Mistakes it prevents:**
- Passing automated accessibility audits while the application is unusable for screen reader users due to missing focus management, unlabeled interactive elements, or incorrect ARIA usage
- Treating accessibility as a post-launch remediation task rather than a design and development constraint, which increases fix cost by 10-100x
- Over-relying on automated tools that detect only 30-40% of WCAG violations, missing the majority of usability barriers
- Implementing ARIA attributes incorrectly, which creates worse accessibility than having no ARIA at all

**Outputs it enables:**
- WCAG 2.1 AA compliance audit reports with violation-by-criterion documentation
- Accessibility test automation suites integrated into CI/CD using axe-core and Lighthouse
- Screen reader testing protocols covering NVDA, JAWS, VoiceOver, and TalkBack
- Keyboard navigation matrices documenting focus order, focus trapping, and shortcut keys

---

## The Core Insight

Accessibility testing determines whether people with disabilities can perceive, understand, navigate, and interact with an application. The critical insight that separates amateur from expert accessibility work is that **automated testing catches syntax violations, but usability requires human evaluation**. An automated tool can detect that an image lacks alt text (a WCAG 1.1.1 violation) but cannot determine whether the alt text that was added is meaningful. It can verify that a button has an accessible name but cannot determine whether the name makes sense in context. It can check color contrast ratios but cannot evaluate whether the overall visual hierarchy communicates effectively to users with low vision.

The second insight is that accessibility is not a separate quality attribute -- it is an expression of correct semantics. When HTML elements are used for their intended purpose (buttons for actions, links for navigation, headings for document structure, form labels for inputs), the majority of accessibility requirements are satisfied automatically. Accessibility failures are almost always symptoms of semantic incorrectness: using `<div onclick>` instead of `<button>`, using visual styling instead of heading elements for hierarchy, or using placeholder text instead of labels for form inputs.

---

## WCAG 2.1 Framework

### Conformance Levels

| Level | Requirement | Legal Context | Practical Target |
|-------|-------------|---------------|-----------------|
| Level A | Minimum accessibility | Basic legal compliance in most jurisdictions | Absolute minimum for any public application |
| Level AA | Standard accessibility | ADA (US), EAA (EU), AODA (Canada) requirement | **Standard target for most applications** |
| Level AAA | Enhanced accessibility | Not typically required by law | Aspirational, appropriate for government/healthcare |

### POUR Principles

WCAG is organized around four principles. Every success criterion falls under one:

**Perceivable** — Information and UI must be presentable in ways users can perceive.
- Text alternatives for non-text content (images, icons, charts)
- Captions and transcripts for audio/video
- Content adaptable to different presentations (screen readers, zoom, reflow)
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)

**Operable** — UI components must be operable by all users.
- All functionality available via keyboard
- Sufficient time to read and interact
- No content that causes seizures (flashing)
- Navigable structure (headings, landmarks, skip links)
- Input modalities beyond keyboard (touch, voice)

**Understandable** — Information and UI operation must be understandable.
- Readable text (language declaration, abbreviation expansion)
- Predictable behavior (consistent navigation, no unexpected context changes)
- Input assistance (error identification, labels, suggestions)

**Robust** — Content must be robust enough for diverse user agents and assistive technologies.
- Valid HTML parsing
- Compatible with current and future assistive technologies
- Status messages communicated to assistive tech without focus change

### Critical WCAG 2.1 Success Criteria

| Criterion | Level | Summary | Test Method |
|-----------|-------|---------|------------|
| 1.1.1 Non-text Content | A | All images have text alternatives | Automated + manual review |
| 1.3.1 Info and Relationships | A | Structure conveyed in markup (headings, lists, tables) | Automated + manual |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 for text, 3:1 for large text | Automated |
| 1.4.11 Non-text Contrast | AA | 3:1 contrast for UI components and graphics | Manual |
| 2.1.1 Keyboard | A | All functionality available via keyboard | Manual |
| 2.4.3 Focus Order | A | Focus sequence preserves meaning and operability | Manual |
| 2.4.7 Focus Visible | AA | Keyboard focus indicator is visible | Manual + automated |
| 2.5.3 Label in Name | A | Visible label matches accessible name | Manual |
| 3.3.1 Error Identification | A | Errors described in text, not just color | Manual |
| 4.1.2 Name, Role, Value | A | All UI components have accessible name/role/state | Automated + manual |

---

## Automated Accessibility Testing

### axe-core

axe-core by Deque is the de facto standard for automated accessibility testing. It checks approximately 70 WCAG 2.1 rules and is designed for low false positive rates.

**Integration with testing frameworks:**

```javascript
// Playwright + axe-core
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page accessibility', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('form accessibility after interaction', async ({ page }) => {
  await page.goto('/signup');
  await page.click('button[type="submit"]'); // Trigger validation errors

  const results = await new AxeBuilder({ page })
    .include('#signup-form') // Scope to specific component
    .analyze();

  expect(results.violations).toEqual([]);
});
```

**Lighthouse CI accessibility auditing:**

```yaml
# lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/products'],
    },
  },
};
```

### What Automated Tools Cannot Catch

| Issue | Why Automation Misses It |
|-------|------------------------|
| Meaningful alt text | Can detect missing alt, cannot judge quality |
| Logical focus order | Can detect focusable elements, cannot judge sequence |
| Keyboard trap escape | Cannot determine if trap is intentional (modal) or bug |
| Screen reader announcement quality | Cannot judge if announcements are helpful vs. verbose |
| Cognitive load | Cannot assess information architecture complexity |
| Touch target adequacy | Can measure size, cannot judge context-dependent adequacy |
| Dynamic content updates | May not trigger state changes needed to reveal issues |

---

## Screen Reader Testing

### Screen Reader / Browser Combinations

| Screen Reader | Platform | Primary Browser | Market Share |
|--------------|----------|----------------|-------------|
| NVDA | Windows | Firefox, Chrome | ~40% (desktop) |
| JAWS | Windows | Chrome, Edge | ~30% (desktop) |
| VoiceOver | macOS/iOS | Safari | ~25% (mobile dominant) |
| TalkBack | Android | Chrome | ~5% |

**Minimum testing matrix:** NVDA + Firefox, VoiceOver + Safari (macOS), VoiceOver + Safari (iOS)

### Screen Reader Testing Checklist

```
For each page/component, verify:

1. Page Structure
   □ Page title is descriptive and unique
   □ Heading hierarchy is logical (h1 → h2 → h3, no skips)
   □ Landmark regions are present (main, nav, header, footer)
   □ Skip link navigates to main content

2. Images and Media
   □ Informative images have descriptive alt text
   □ Decorative images have alt="" (not missing alt)
   □ Complex images (charts, diagrams) have extended descriptions
   □ Videos have captions and audio descriptions

3. Interactive Elements
   □ All buttons announce their name and role
   □ All links announce their destination (no "click here")
   □ Form inputs have associated labels
   □ Required fields are announced as required
   □ Error messages are associated with their input and announced

4. Dynamic Content
   □ Content updates are announced via aria-live regions
   □ Modal dialogs trap focus and announce their title
   □ Toasts/notifications are announced without stealing focus
   □ Loading states are communicated

5. Navigation
   □ Tab order matches visual order
   □ Focus is visible on all interactive elements
   □ Focus moves to new content when navigation occurs (SPA)
   □ Escape key closes overlays/modals
```

---

## ARIA (Accessible Rich Internet Applications)

### The First Rule of ARIA

**"If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of repurposing an element and adding an ARIA role, state, or property to make it accessible, then do so."** -- W3C ARIA specification.

ARIA is a remediation tool, not a primary development tool. Native HTML provides accessibility by default:

| Instead of... | Use... |
|--------------|--------|
| `<div role="button" tabindex="0" onclick>` | `<button>` |
| `<span role="link" onclick>` | `<a href>` |
| `<div role="checkbox" aria-checked>` | `<input type="checkbox">` |
| `<div role="heading" aria-level="2">` | `<h2>` |
| `<div role="navigation">` | `<nav>` |
| `<div role="list"><div role="listitem">` | `<ul><li>` |

### When ARIA Is Necessary

ARIA becomes necessary for custom widgets that have no native HTML equivalent:

- **Tabs**: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
- **Accordions**: `aria-expanded`, `aria-controls`
- **Comboboxes/Autocomplete**: `role="combobox"`, `aria-expanded`, `aria-activedescendant`
- **Tree views**: `role="tree"`, `role="treeitem"`, `aria-expanded`
- **Live regions**: `aria-live="polite"` for non-urgent updates, `aria-live="assertive"` for critical alerts
- **Modals**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

### Common ARIA Mistakes

| Mistake | Impact | Correction |
|---------|--------|-----------|
| `role="button"` without keyboard support | Screen reader announces "button" but Enter/Space does nothing | Add keydown handler for Enter and Space |
| `aria-label` overriding visible text | Screen reader announces different text than what is visible | Use `aria-labelledby` referencing visible text |
| `aria-hidden="true"` on focusable elements | Element is invisible to screen reader but receives focus | Remove from tab order or remove aria-hidden |
| Missing `aria-expanded` on toggles | Screen reader cannot determine if menu/accordion is open | Add aria-expanded="true/false" toggled on click |
| `aria-live` on a region that exists at page load | Initial content is announced unexpectedly | Add aria-live to container, then inject content dynamically |

---

## Keyboard Navigation Testing

### Keyboard Testing Protocol

| Key | Expected Behavior |
|-----|------------------|
| Tab | Move focus to next interactive element |
| Shift + Tab | Move focus to previous interactive element |
| Enter | Activate focused button, link, or form submit |
| Space | Activate focused button, toggle checkbox, open select |
| Escape | Close modal, dropdown, tooltip, popover |
| Arrow keys | Navigate within composite widgets (tabs, menus, radio groups) |
| Home / End | Jump to first/last item in list or menu |

**Keyboard trap identification:**
- Tab through the entire page. Focus must never become trapped in a component (except intentionally in modals).
- Test in both directions (Tab and Shift+Tab).
- Verify Escape closes any trap-like components (modals, dialogs).

---

## Failure Modes

1. **Relying solely on automated tools**: Automated accessibility tools detect 30-40% of WCAG violations. Teams that achieve 100% automated audit pass and declare accessibility compliance are missing the majority of barriers. Manual testing with assistive technology is irreplaceable.

2. **Adding ARIA to fix semantic HTML problems**: Using `role="button"` on a `<div>` instead of using a `<button>` element. The native element provides keyboard support, focus management, and form integration automatically. ARIA adds the announcement but not the behavior.

3. **Testing only with sighted keyboard navigation**: Verifying keyboard operability without a screen reader misses announcement issues, role/state communication, and focus context. Keyboard testing and screen reader testing are complementary, not interchangeable.

4. **Ignoring focus management in SPAs**: Single-page applications change content without page navigation. If focus is not managed explicitly (moved to new content, announced via aria-live), screen reader users have no indication that content has changed.

5. **Treating accessibility as a separate backlog**: When accessibility issues are tracked separately from feature work, they accumulate indefinitely. Accessibility criteria must be part of the definition of done for every feature.

6. **Alt text that describes the image file rather than its meaning**: "photo.jpg" or "banner image" instead of "Team of five engineers collaborating at a whiteboard." Alt text should convey the same information the image conveys to sighted users.

---

## The Operator's Framework

**Step 1: Define Conformance Target**
- Determine required WCAG level (AA is standard for most web applications)
- Identify legal requirements (ADA, EAA, Section 508, AODA)
- Scope conformance: all pages or critical user paths

**Step 2: Integrate Automated Testing**
- Add axe-core to component test suite (catch issues during development)
- Add Lighthouse CI to build pipeline (enforce minimum accessibility score)
- Configure CI to fail on new violations (prevent regression)

**Step 3: Establish Manual Testing Protocol**
- Train QA team on screen reader basics (NVDA + Firefox minimum)
- Create keyboard navigation checklist for each component type
- Include accessibility in definition of done for all user-facing features

**Step 4: Conduct Periodic Audits**
- Full WCAG 2.1 AA audit quarterly (all success criteria, manual + automated)
- Prioritize findings by impact (blocker: cannot complete task, critical: significant difficulty, major: inconvenience)
- Track remediation to completion with deadlines

**Step 5: User Testing with Disabled Users**
- Recruit users who use assistive technology for usability testing
- Observe real usage patterns (often different from assumptions)
- Prioritize findings from real user testing above compliance-only findings

---

## Summary

**Key Principles:**

1. Automated accessibility tools detect only 30-40% of WCAG violations -- manual testing with screen readers and keyboard navigation is required for adequate coverage.
2. Correct semantic HTML provides the majority of accessibility for free -- ARIA is a remediation tool for custom widgets, not a replacement for proper HTML element usage.
3. Accessibility testing must cover the full POUR framework (Perceivable, Operable, Understandable, Robust), not just the automated-testable subset.
4. Focus management in single-page applications is the most commonly missed accessibility requirement and the one that most severely impacts screen reader users.
5. Accessibility is not a separate quality attribute but an expression of correct semantics -- when HTML is used correctly, accessibility follows naturally.

---

## Cross-References

- `05_specialized/mobile_testing.md` -- Mobile accessibility (touch targets, VoiceOver, TalkBack)
- `04_performance/performance_engineering.md` -- Performance impact on accessibility (slow pages are inaccessible)
- `06_ci_cd/ci_cd_testing.md` -- Accessibility gates in CI/CD pipelines
- `03_automation/e2e_testing.md` -- Integrating accessibility checks into E2E test flows
- `07_management/quality_culture.md` -- Building accessibility into team culture

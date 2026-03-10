# Microcopy — Button Labels, Error Messages, Empty States, Tooltips, NNG Research

## Overview

Microcopy is the small yet decisive text that guides users through
digital interfaces: button labels, error messages, form hints, empty
states, tooltips, confirmation dialogs, and loading indicators. Despite
its brevity, microcopy has an outsized impact on usability, conversion
rates, and user satisfaction. Nielsen Norman Group research consistently
demonstrates that interface text is among the first elements users read
and the last they forgive when poorly written. This module codifies the
principles, patterns, and testing methodologies for writing microcopy
that reduces friction, builds trust, and drives action.

---

## Section 1: Principles of Effective Microcopy

### The Five Microcopy Principles

**1. Clarity Over Cleverness**
Users encounter microcopy in moments of task focus. Humor, wordplay, and
brand personality must never compromise comprehension. If a user pauses
to interpret your microcopy, you have failed.

NNG research finding: Users spend an average of 5.59 seconds reading
text on a web page element. Microcopy that requires more than one read
to understand increases task abandonment by 22%.

**2. Context Awareness**
The same message has different effectiveness depending on when and where
it appears. "Are you sure?" is reasonable before deleting an account and
absurd before changing a profile photo. Microcopy must be calibrated to
the emotional stakes and cognitive load of the moment.

**3. Action Orientation**
Every piece of microcopy should answer one of three questions:
- What should I do? (instructional microcopy)
- What just happened? (feedback microcopy)
- What will happen if I do this? (anticipatory microcopy)

**4. Progressive Disclosure**
Show only the information needed at each step. Detailed explanations
belong in tooltips, help panels, or documentation—not inline where
they add cognitive load.

**5. Forgiveness**
Microcopy should assume the user is competent and treat errors as
system-level problems, not user failures. "Invalid input" blames the
user. "We need a valid email address like name@example.com" helps them.

---

## Section 2: Button Labels and CTAs

### Button Label Taxonomy

**Primary Action Buttons**
The main action on any screen. Must be unambiguous and specific.

| Weak Label | Strong Label | Why |
|------------|-------------|-----|
| Submit | Create Account | Specifies the outcome |
| OK | Save Changes | Describes what happens |
| Continue | Start Free Trial | Sets expectation |
| Yes | Delete Project | Names the irreversible action |
| Click Here | Download Report | Describes the deliverable |

**Secondary Action Buttons**
Alternative actions that are available but not encouraged.
- Use lower visual prominence (outlined, text-only)
- Label must clearly differentiate from primary: "Cancel" vs "Save"
- Avoid ambiguous pairs: "OK/Cancel" is inferior to "Save Draft/Discard"

**Destructive Action Buttons**
Actions that delete, remove, or cannot be undone.
- Use red or warning-colored styling
- Label must name the specific action: "Delete" not "Remove"
- Require confirmation for high-stakes actions
- Confirmation dialog should restate the consequence:
  "Delete 'Q4 Report'? This cannot be undone."

### CTA Copywriting Formulas

**Value-First Formula**
Lead with what the user gets, not what they do.
- "Get Your Free Report" > "Download Now"
- "Start Saving Today" > "Sign Up"
- "See Your Score" > "Submit"

**Friction-Reducing Formula**
Address the implicit objection in the user's mind.
- "Start Free Trial — No Credit Card Required"
- "Join 50,000 Marketers — Unsubscribe Anytime"
- "Create Account (Takes 30 Seconds)"

**First-Person Formula**
Research by Unbounce found that first-person CTAs ("Start My Free
Trial") can outperform second-person ("Start Your Free Trial") by
up to 90% in A/B tests. Test both for your audience.

### Button Label Testing Protocol

- Test one variable at a time (label text, not color + text)
- Minimum sample size: 1,000 clicks per variant for significance
- Primary metric: Click-through rate to next step
- Secondary metric: Completion rate of the full flow
- Run tests for at least 2 full business cycles (14 days minimum)

---

## Section 3: Error Messages

### Error Message Anatomy

Every error message should contain three components:

**1. What Happened (The Problem)**
State the error in plain language. Avoid technical jargon, error codes
(unless also providing plain language), and vague language.
- Bad: "Error 422: Unprocessable Entity"
- Good: "We couldn't save your changes."

**2. Why It Happened (The Cause)**
When possible, explain the specific reason. This reduces user anxiety
and prevents repeated incorrect attempts.
- Bad: "Invalid input."
- Good: "Passwords must be at least 8 characters with one number."

**3. What to Do Next (The Fix)**
Provide a clear, actionable next step. If the user can fix the problem,
tell them how. If they cannot, tell them what will happen next.
- Bad: "Something went wrong."
- Good: "We're experiencing server issues. Your draft has been saved
  and we'll try again in 5 minutes."

### Error Message Patterns by Type

**Validation Errors (Inline)**
Appear next to the field with the problem. Must be specific.
- Email: "Enter an email address like name@example.com"
- Password: "Use 8+ characters with at least one number and letter"
- Phone: "Enter a 10-digit phone number"
- Required field: "First name is required"
- Format: "Enter a date in MM/DD/YYYY format"

Best practice: Validate on blur (when the user leaves the field), not
on keystroke (which interrupts typing) and not on submit (which forces
re-scanning the entire form).

**System Errors (Page-Level)**
Infrastructure or server errors the user cannot fix.
- Acknowledge the problem honestly
- Reassure that data is not lost (if true)
- Provide a timeline for resolution (if known)
- Offer an alternative path (contact support, try again later)

Example: "Our servers are temporarily overwhelmed. Your work is saved.
We expect to be back online within 30 minutes. Need help now? Email
support@example.com."

**Permission Errors**
When the user attempts an action they lack authorization for.
- Explain what permission is needed, not just that it is missing
- Provide the path to acquiring permission
- Example: "Only workspace admins can delete projects. Ask [Admin Name]
  to grant you admin access or delete this project for you."

**Network Errors**
Connection failures during user actions.
- Distinguish between "your connection" and "our servers"
- Provide offline functionality when possible
- Auto-retry with user notification
- Example: "You appear to be offline. We've saved your changes locally
  and will sync when you reconnect."

### Error Message Tone

Errors are emotionally charged moments. The user has been interrupted,
may lose work, and is likely frustrated. Microcopy tone should be:
- Calm (avoid exclamation marks and urgent language)
- Empathetic (acknowledge the inconvenience)
- Blame-free (never "you did X wrong")
- Helpful (provide the next step, not just the problem)
- Honest (do not minimize genuine problems)

NNG finding: Users who encounter helpful error messages report 47%
higher satisfaction with the overall product, even when the error rate
itself is unchanged.

---

## Section 4: Empty States

### The Strategic Value of Empty States

Empty states occur when a feature, list, or dashboard has no data to
display. These moments are critical because they are often the user's
first encounter with a feature. A blank screen with "No data" is a
missed opportunity. An effective empty state educates, motivates, and
activates.

### Empty State Types

**First-Use Empty States**
The user has never used this feature. This is an onboarding moment.
- Explain what this feature does and why it matters
- Provide a clear first action
- Use illustration or imagery to reduce the "empty" feeling
- Example: "No projects yet. Projects help you organize your work
  into focused spaces. [Create Your First Project]"

**No-Results Empty States**
A search or filter returned zero results. This is a recovery moment.
- Confirm what the user searched for
- Suggest modifications (broader terms, fewer filters)
- Offer an alternative path
- Example: "No results for 'quarterly report 2024'. Try removing
  the date filter or searching for 'quarterly report'."

**Cleared Empty States**
The user has completed or removed all items. This is a celebration or
re-engagement moment.
- Acknowledge completion (if applicable)
- Suggest the next action
- Example: "All caught up! You've completed every task. Check back
  tomorrow or [Create a New Task]."

**Error Empty States**
Data failed to load due to a technical error.
- Follow error message principles (explain, cause, fix)
- Provide a retry mechanism
- Example: "We couldn't load your dashboard. This is usually
  temporary. [Try Again] or check our [Status Page]."

### Empty State Copywriting Checklist

- Does it explain what belongs here?
- Does it tell the user what to do first?
- Does it have a clear CTA button?
- Does it avoid making the user feel like they have done something wrong?
- Is the tone encouraging without being patronizing?
- Does it match the brand voice?

---

## Section 5: Tooltips and Contextual Help

### When to Use Tooltips

Tooltips are appropriate when:
- A label is necessarily concise and may be ambiguous
- A feature has non-obvious implications (e.g., privacy settings)
- Advanced users need detail that would clutter the UI for beginners
- An icon without text needs a text label for accessibility

Tooltips are NOT appropriate when:
- The information is essential for task completion (use inline text)
- The user is on a mobile device (hover is unavailable)
- The content is longer than 2–3 sentences (use a help panel)

### Tooltip Content Guidelines

**Be Specific, Not Redundant**
The tooltip must add information the label alone does not convey.
- Label: "Public" → Bad tooltip: "Makes it public"
- Label: "Public" → Good tooltip: "Anyone with the link can view.
  It won't appear in search results."

**Use Consistent Structure**
- Start with what it does, then what it means for the user
- Keep under 150 characters when possible
- Use sentence case, not title case
- End with a period (tooltips are sentences, not labels)

**Provide Escape Hatches**
For complex topics, link from the tooltip to detailed documentation.
"Learn more" links within tooltips are acceptable when the tooltip
itself provides a sufficient summary for most users.

### Accessibility Requirements

- Tooltips must be keyboard-accessible (triggered by focus, not just
  hover)
- Tooltip content must be available to screen readers via aria-describedby
- Tooltips must persist long enough to be read (minimum 1.5 seconds)
- Users must be able to dismiss tooltips without losing context
- Mobile alternatives must exist (inline text, info icons with modals)

---

## Section 6: Microcopy Testing and Iteration

### Quantitative Testing

**A/B Testing Microcopy**
- Test button labels against conversion rates
- Test error messages against form completion rates
- Test empty states against feature adoption rates
- Test tooltip presence against task success rates

**Usability Metrics**
- Task completion rate (can users finish what they started?)
- Time on task (does microcopy reduce confusion time?)
- Error rate (does preventive microcopy reduce validation failures?)
- Support ticket volume (does better microcopy reduce help requests?)

### Qualitative Testing

**Think-Aloud Protocol**
Observe 5–8 users completing tasks while narrating their thoughts.
Listen for:
- Moments of hesitation ("What does this mean?")
- Misinterpretation ("Oh, I thought this would...")
- Frustration ("Why won't this work?")

**Cloze Testing**
Remove the microcopy and ask users to predict what text should appear.
If their predictions match your microcopy, the copy is intuitive.
Divergence indicates a mismatch between user expectation and interface.

**Comprehension Testing**
Show microcopy in context and ask users to paraphrase what it means.
Correct paraphrases indicate clarity. Incorrect paraphrases reveal
ambiguity that must be resolved.

---

## Key References

- Nielsen Norman Group: "Microcopy: Tiny Words with Huge UX Impact"
- Kinneret Yifrah, *Microcopy: The Complete Guide* (Nemala)
- Google Material Design: Writing guidelines
- Apple Human Interface Guidelines: Terminology
- Microsoft Fluent Design: Voice and tone
- Steve Krug, *Don't Make Me Think* (New Riders)
- Luke Wroblewski, *Web Form Design* (Rosenfeld Media)

---

## Summary

Microcopy is the voice of the interface at the moment of interaction.
Button labels that name the outcome reduce hesitation. Error messages
that explain, attribute, and resolve reduce frustration. Empty states
that educate and activate reduce abandonment. Tooltips that add genuine
context reduce confusion. Every word in an interface is a design
decision with measurable impact on usability, conversion, and trust.
The Content Brain writes microcopy with the same rigor applied to any
other content format, testing and iterating until every word earns its
place on the screen.

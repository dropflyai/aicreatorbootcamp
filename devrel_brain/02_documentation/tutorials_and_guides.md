# Tutorials and Guides — Design, Structure, and Quality

## Overview

Tutorials and guides are the primary vehicles for developer education. They are
the difference between documentation that developers read and documentation that
developers use. This module codifies the methodology for designing, writing, and
maintaining tutorials and guides that meet world-class standards, drawing from
instructional design theory, cognitive load research, and the practices of Stripe,
Twilio, and Google.

---

## Tutorial Design Methodology

### The Tutorial Design Process

Every tutorial should follow this design process before writing begins:

**Step 1: Define the Learning Outcome**
What will the developer be able to do after completing this tutorial that they
could not do before? This must be a specific, observable behavior.

```
Bad:  "Understand how webhooks work"
Good: "Receive and verify a webhook event in a Node.js application"
```

**Step 2: Identify Prerequisites**
What must the developer already know or have installed? List everything explicitly.
Overestimate rather than underestimate prerequisites.

```
Prerequisites:
- Node.js 18+ installed
- A free Example API account (sign up at example.com)
- Basic familiarity with Express.js
- A terminal/command prompt
```

**Step 3: Outline the Steps**
Write the step headings before writing any content. Each step should be a single
action that produces a visible result.

```
1. Create a new Node.js project
2. Install the Example SDK
3. Set up a webhook endpoint
4. Register the endpoint in the dashboard
5. Trigger a test event
6. Verify the event signature
7. Process the event payload
```

**Step 4: Write the Code First**
Write all the code for the tutorial in a working project. Test it. Ensure every
step compiles and runs. Only after the code works should you write the prose.

**Step 5: Write the Prose**
Write explanations for each step. Keep explanations short — the code is the lesson,
the prose is the support.

**Step 6: Test with a Novice**
Have someone unfamiliar with the topic follow the tutorial. Observe where they
get confused, stuck, or make mistakes. Revise accordingly.

### Progressive Complexity Model

Tutorials should follow a progressive complexity curve:

```
Complexity
    ^
    |            .---------. Production-ready
    |          /
    |        /
    |      /  Working integration
    |    /
    |  /  First API call
    | /
    +-------------------> Steps
```

**Never front-load complexity.** The first step should be achievable within 60
seconds. Complexity increases gradually, and each step should be testable
independently. If a developer stops at any step, they should have something
that works up to that point.

### The "Repeat, Vary, Extend" Pattern

For tutorial series that teach multiple features of the same API:

1. **Tutorial 1 — Foundation:** Basic CRUD operations. Teaches the fundamental
   pattern that all subsequent tutorials build on.

2. **Tutorial 2 — Repeat with Variation:** Same pattern, different resource.
   Reinforces the mental model while introducing a new concept.

3. **Tutorial 3 — Extend:** Combines concepts from tutorials 1 and 2 to solve
   a more complex problem. Introduces error handling, edge cases.

4. **Tutorial 4 — Production:** Takes the patterns from tutorials 1-3 and adds
   production concerns: authentication, rate limiting, monitoring, deployment.

---

## Code Sample Standards

### The Code Sample Quality Hierarchy

**Level 1 — Snippet:** A fragment that shows syntax but does not run.
Acceptable only in reference documentation. Never use in tutorials.

**Level 2 — Complete Example:** A standalone code block that runs if copied
into the right context. Acceptable in how-to guides.

**Level 3 — Runnable Project:** A complete project with all dependencies,
configuration, and instructions that a developer can clone and run.
Required for tutorials.

**Level 4 — Tested Project:** A runnable project with automated tests that
verify the code works correctly. Required for quickstart tutorials.

### Code Sample Rules

**Rule 1: Every code sample must be tested.**
Extract code samples from documentation and run them as part of CI. This is
the most important quality rule. Stripe tests every code sample in their
documentation. Google tests every code sample. If your documentation is not
tested, it is wrong.

**Implementation:**
```
docs/                     # Documentation source
  tutorials/
    webhooks.md           # Contains code blocks
samples/                  # Extracted, testable code
  tutorials/
    webhooks/
      index.js            # Complete runnable code
      test.js             # Tests that verify the sample works
      package.json         # Dependencies
.github/workflows/
  test-samples.yml        # CI workflow that tests all samples
```

**Rule 2: Use realistic data.**
Never use `foo`, `bar`, `test`, `example`, or placeholder data in tutorials.
Use data that maps to the actual use case.

```python
# Bad
response = client.create_widget(name="test", type="foo")

# Good
response = client.create_payment(
    amount=2000,          # $20.00 in cents
    currency="usd",
    description="Order #1234 — 2 items"
)
```

**Rule 3: Show error handling.**
Production code handles errors. Tutorial code should too, at least from step 3
onward. Do not teach developers to ignore errors.

```python
# Bad - teaches bad habits
payment = client.payments.create(amount=2000, currency="usd")

# Good - teaches production patterns
try:
    payment = client.payments.create(amount=2000, currency="usd")
    print(f"Payment created: {payment.id}")
except InvalidRequestError as e:
    print(f"Invalid request: {e.message}")
except AuthenticationError:
    print("Check your API key")
except APIError as e:
    print(f"API error: {e.message}. Retry in a moment.")
```

**Rule 4: Show the complete file.**
In tutorials, always show the complete file, not just the changed lines.
Developers do not know where to insert code fragments.

```python
# Bad - where does this go?
client.webhooks.verify(payload, signature, secret)

# Good - complete file
from flask import Flask, request
from example_sdk import Client, WebhookVerificationError

app = Flask(__name__)
client = Client(api_key="sk_test_...")

@app.route("/webhooks", methods=["POST"])
def handle_webhook():
    payload = request.get_data(as_text=True)
    signature = request.headers.get("X-Example-Signature")

    try:
        event = client.webhooks.verify(payload, signature, "whsec_...")
    except WebhookVerificationError:
        return "Invalid signature", 400

    if event.type == "payment.completed":
        handle_payment_completed(event.data)

    return "OK", 200

if __name__ == "__main__":
    app.run(port=4242)
```

**Rule 5: Include copy buttons.**
Every code block in documentation must have a one-click copy button. This is
a documentation platform requirement, not a nicety.

---

## Language-Specific Tutorial Strategy

### Language Prioritization

Not every tutorial needs to exist in every language. Prioritize based on
your developer demographics:

| Priority | Languages | Rationale |
|----------|-----------|-----------|
| P0 (Required) | curl | Universal, no dependencies |
| P1 (Launch) | Python, JavaScript/Node.js | Largest developer populations |
| P2 (Growth) | Go, Java, Ruby | Enterprise and backend populations |
| P3 (Scale) | PHP, C#/.NET, Rust, Swift | Framework-specific populations |

### Multi-Language Display

Use tabbed code blocks that let developers select their preferred language:

```
[curl] [Python] [Node.js] [Go] [Java]

// Each tab shows the complete code sample in that language
// Default tab matches the language the developer last selected
// Language preference is persisted via cookie/localStorage
```

### Language Idiomatic Rules

Each language sample must follow the conventions of that language:

| Language | Naming | Async | Error Handling | Package Manager |
|----------|--------|-------|---------------|----------------|
| Python | snake_case | async/await | try/except | pip |
| JavaScript | camelCase | Promises/async-await | try/catch | npm |
| Go | CamelCase/camelCase | goroutines/channels | error returns | go mod |
| Java | camelCase | CompletableFuture | try/catch | Maven/Gradle |
| Ruby | snake_case | N/A (sync) | begin/rescue | gem |

---

## How-To Guide Design

### The Problem-Solution Structure

Every how-to guide addresses a specific problem. The structure is:

```
Title: How to [solve specific problem]
Problem: [1-2 sentences describing the problem]
Solution: [Steps to solve it]
Verification: [How to confirm the solution works]
Variations: [Alternative approaches]
Troubleshooting: [Common issues]
```

### How-To Guide Catalog Strategy

Organize how-to guides around developer jobs-to-be-done:

**Authentication & Security:**
- How to authenticate API requests
- How to rotate API keys
- How to verify webhook signatures
- How to implement OAuth 2.0 flow

**Data Operations:**
- How to paginate through large datasets
- How to filter and sort results
- How to handle bulk operations
- How to manage file uploads

**Integration Patterns:**
- How to set up webhooks
- How to implement retry logic
- How to handle rate limiting
- How to use idempotency keys

**Testing & Debugging:**
- How to use the sandbox environment
- How to test webhooks locally
- How to debug API errors
- How to monitor API usage

---

## Tutorial Maintenance

### The Tutorial Freshness Problem

Tutorials decay. APIs change, dependencies update, screenshots become outdated.
A tutorial that worked 6 months ago may not work today. This is the single
biggest threat to documentation credibility.

### Automated Freshness Enforcement

```yaml
# Every tutorial has metadata
---
title: "Receive Webhooks with Node.js"
last_tested: 2025-01-15
sdk_version: 2.3.0
node_version: ">=18"
test_file: samples/tutorials/webhooks/test.js
---
```

**CI checks:**
1. Test file runs successfully -> Tutorial is current
2. Test file fails -> Tutorial is flagged for update
3. SDK version in tutorial differs from latest -> Warning issued
4. Last-tested date > 90 days -> Mandatory re-test

### Tutorial Retirement

When a tutorial can no longer be maintained (deprecated API version, sunset feature):

1. Add a deprecation banner at the top of the page
2. Link to the replacement tutorial (if one exists)
3. Keep the page live for 6 months (SEO and bookmark preservation)
4. After 6 months, redirect the URL to the replacement page
5. Never delete tutorial URLs — always redirect

---

## Measuring Tutorial Effectiveness

| Metric | Source | Good | Needs Work |
|--------|--------|------|-----------|
| Completion rate | Analytics (reached final step) | > 70% | < 50% |
| Time to complete | Analytics (first to last step) | Within stated estimate | > 2x stated estimate |
| Copy-paste rate | Code block analytics | > 60% of blocks copied | < 30% |
| Drop-off points | Step-by-step analytics | Gradual decline | Sharp drop at specific step |
| Support tickets referencing tutorial | Support system | < 5% of readers | > 10% |
| Tutorial satisfaction | Post-tutorial survey | > 4.0/5.0 | < 3.5/5.0 |

### Interpreting Drop-Off Data

If analytics show a sharp drop-off at a specific step:
1. The step is too complex -> Break into smaller steps
2. The step has an error -> Test the code
3. The prerequisites are wrong -> Developer lacks required knowledge
4. The step requires context from elsewhere -> Add inline explanation

---

**This module governs the design, structure, and maintenance of all tutorials and guides.**
**Every tutorial must meet these standards before publication.**

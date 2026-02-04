# Developer Tools — CLIs, Playgrounds, IDEs, and Debugging Infrastructure

## What This Enables

**Decisions it helps make:**
- When to build a CLI vs. a web dashboard vs. both
- How to design playground environments that convert explorers into adopters
- Whether to invest in IDE extensions for your platform
- How to structure debugging tools that reduce time-to-resolution
- When to build vs. buy developer tooling infrastructure

**Mistakes it prevents:**
- Building CLIs that violate platform conventions and feel alien to developers
- Creating sandboxes that do not represent real API behavior
- Investing in IDE extensions before the core DX problems are solved
- Shipping debugging tools that require more debugging than the original problem
- Building developer dashboards that display metrics without actionable context

**Outputs it enables:**
- CLI architecture specifications following POSIX and platform conventions
- Playground environment technical designs with isolation and security models
- IDE extension specifications for VS Code, JetBrains, and Neovim
- Developer dashboard wireframes with the right metrics at the right granularity
- API explorer designs that serve both learning and debugging use cases

---

## The Core Insight

Developer tools are force multipliers: they amplify the productivity of every developer
on your platform. A well-designed CLI saves 30 seconds per operation; multiplied by
10,000 developers executing 50 operations per day, that is 4,166 developer-hours saved
daily. The theoretical foundation comes from Seymour Papert's constructionism: developers
learn by building, and tools that reduce the friction between intention and execution
accelerate learning exponentially.

The critical insight for DevRel is that developer tools are not utilities --- they are
onboarding channels. A playground converts a curious visitor into an active user without
requiring signup, installation, or commitment. A CLI transforms a manual workflow into
a repeatable process, increasing platform stickiness. An IDE extension puts your API at
the developer's fingertips during their actual work, not in a separate browser tab.
Each tool category serves a different stage of the developer journey, and the most
successful platforms invest across all of them.

---

## CLI Design

### The POSIX Compliance Foundation

Command-line interfaces must respect the conventions developers have internalized over
decades. Violating POSIX conventions creates cognitive dissonance that makes your CLI
feel broken even when it functions correctly.

**Core Conventions:**
- `--verbose` / `-v` for increased output
- `--quiet` / `-q` for suppressed output
- `--output` / `-o` for output format (json, table, yaml)
- `--help` / `-h` for help text
- `--version` for version information
- Exit code 0 for success, non-zero for failure
- stderr for errors and diagnostics, stdout for data
- Support for pipes and redirects (`|`, `>`, `<`)

### CLI Architecture Patterns

**Subcommand Pattern (recommended):**
Used by git, docker, kubectl, and most modern CLIs. The top-level command is a
namespace; subcommands are the verbs.

```
myplatform auth login
myplatform projects create --name "My Project"
myplatform api keys list
myplatform deploy --env production
```

**Design Rules:**
1. Noun-verb ordering (`projects create`, not `create-project`)
2. Consistent flag naming across all subcommands
3. Confirmation prompts for destructive operations (with `--force` to skip)
4. Interactive mode when stdin is a TTY, machine mode when piped
5. Colored output when terminal supports it, plain text otherwise

### CLI Authentication Flow

Authentication is the first CLI interaction and sets the tone for the entire experience.

**Best Practice: Browser-Based OAuth Flow**
```
$ myplatform auth login
Opening browser to authenticate...
If the browser doesn't open, visit: https://auth.example.com/device?code=ABCD-1234
Waiting for authentication... Done!
Authenticated as developer@example.com
Credentials stored in ~/.myplatform/credentials
```

**Fallback: API Key Input**
```
$ myplatform auth login --api-key
Enter your API key: sk_test_•••••••••••
Verifying... Valid!
Credentials stored in ~/.myplatform/credentials
```

### CLI Output Design

**Human-readable by default, machine-readable on request:**
```
$ myplatform projects list
NAME           STATUS    CREATED
my-app         active    2024-01-15
staging-env    paused    2024-02-01

$ myplatform projects list --output json
[{"name": "my-app", "status": "active", "created": "2024-01-15"}, ...]
```

**Progress indicators for long operations:**
- Spinners for indeterminate operations
- Progress bars for operations with known completion percentage
- Elapsed time display for operations longer than 5 seconds
- ETA display when calculable

### CLI Error Design

CLI errors must be actionable. Every error should answer three questions: What happened?
Why did it happen? What should I do?

```
$ myplatform deploy --env production
Error: Deployment failed - insufficient permissions

  Your API key (sk_test_***abc) does not have the 'deploy:production'
  permission. Test keys cannot deploy to production.

  To fix this:
  1. Go to https://dashboard.example.com/api-keys
  2. Create a production API key with 'deploy:production' scope
  3. Run: myplatform auth login --api-key

  Documentation: https://docs.example.com/authentication#permissions
```

---

## Playground and Sandbox Environments

### The Playground Spectrum

Playgrounds exist on a spectrum from simple to complex:

1. **Embedded code runners** --- In-documentation code blocks with a "Run" button
   (e.g., Go Playground, Rust Playground). Lowest friction, limited capability.

2. **API explorers** --- Web-based tools for making API calls with a form-based UI
   (e.g., Swagger UI, Postman). Medium friction, broad capability.

3. **Full sandbox environments** --- Isolated environments with real (but limited)
   API access, pre-configured projects, and realistic data (e.g., Stripe test mode,
   Twilio test credentials). Highest fidelity, highest investment.

4. **Interactive tutorials** --- Guided environments that combine explanations with
   executable steps (e.g., Katacoda, Instruqt, Killercoda). Highest educational
   value, highest maintenance cost.

### Sandbox Architecture

**Isolation Model:**
Each developer sandbox must be isolated from production and from other sandboxes.
The standard architecture uses:

```
Developer Request -> API Gateway -> Sandbox Router
                                        |
                    ┌───────────────────┼───────────────────┐
                    |                   |                   |
              Sandbox A           Sandbox B           Sandbox C
              (dev_001)           (dev_002)           (dev_003)
              - Test data         - Test data         - Test data
              - Rate limits       - Rate limits       - Rate limits
              - No billing        - No billing        - No billing
```

**Key Design Decisions:**
- **Data isolation:** Each sandbox has its own test data, never shared
- **Rate limiting:** Sandboxes have lower rate limits than production
- **Feature parity:** Sandbox must behave identically to production (except billing)
- **Reset capability:** Developers must be able to reset sandbox state
- **Persistence:** Sandbox data should persist across sessions (not ephemeral)

### Playground Conversion Metrics

Track the funnel from playground to production:
1. Playground visitors (unique users who open the playground)
2. Playground users (visitors who execute at least one action)
3. Account creators (playground users who sign up)
4. Activated users (account creators who make a real API call)

Benchmark: 5-15% conversion from playground visitor to account creator.

---

## IDE Extensions

### When to Build IDE Extensions

IDE extensions are high-investment, high-reward tools. Build them when:
- Your API has a complex type system that benefits from autocomplete
- Developers spend significant time switching between IDE and documentation
- Configuration files benefit from validation and schema support
- Your product involves file formats that benefit from syntax highlighting

### VS Code Extension Architecture

VS Code dominates developer tooling with 70%+ market share. Prioritize VS Code first.

**Extension Capabilities (in priority order):**
1. **Language Server Protocol (LSP)** --- Autocomplete, hover documentation, go-to-definition
   for your configuration files and SDK
2. **Snippets** --- Pre-built code templates for common patterns
3. **Diagnostics** --- Real-time validation of configuration files and API calls
4. **Commands** --- Palette commands that integrate your CLI into the IDE
5. **Webview panels** --- Embedded documentation, dashboards, or API explorers
6. **Authentication** --- Seamless credential management from within the IDE

**Design Principles for IDE Extensions:**
- Extensions must not slow down the IDE (lazy loading, minimal activation events)
- All features must work offline (with graceful degradation for network-dependent features)
- Settings must integrate with VS Code's settings system (not custom config files)
- Output must use VS Code's output channels and problem matchers

### JetBrains Plugin Considerations

JetBrains IDEs (IntelliJ, PyCharm, WebStorm) hold 25-30% market share in enterprise.
Key differences from VS Code:
- Plugin architecture is JVM-based (Kotlin/Java), not Node.js
- UI toolkit is Swing-based, not web-based
- Extension API is more powerful but more complex
- Review and publishing process is slower

---

## Developer Dashboards

### Dashboard Purpose Hierarchy

Developer dashboards serve three audiences with different needs:

**Individual Developer:**
- My API usage (calls, errors, latency)
- My API keys and permissions
- My recent requests with response details
- Quick links to documentation for endpoints I use

**Team Lead:**
- Team usage and quotas
- Error rates and trending issues
- Member management
- Billing and plan management

**Debugging Developer:**
- Request inspector (full request/response with headers)
- Error log with filtering and search
- Webhook delivery status and retry history
- API changelog (what changed recently that might affect me)

### Dashboard Design Principles

**Show trends, not snapshots:** A single number (e.g., "500 errors: 23") is useless
without context. Show the trend (up 300% from yesterday) and the comparison
(normal range: 1-5 per hour).

**Make errors clickable:** Every error displayed in the dashboard should link to
the specific request that caused it, the documentation for that error code, and
a suggested fix.

**Provide copy-paste debugging:** Include a "copy as cURL" button for every API
request, allowing developers to reproduce issues locally.

**Real-time where it matters:** Webhook delivery and error rates should update in
real-time. Historical analytics can update on 5-minute intervals.

---

## API Explorers

### The Three-Panel Pattern

The industry-standard API explorer layout:

```
┌─────────────────┬─────────────────┬─────────────────┐
│  Navigation     │  Request Builder│  Response Viewer │
│                 │                 │                  │
│  - Endpoints    │  - URL          │  - Status code   │
│  - Grouped by   │  - Headers      │  - Headers       │
│    resource     │  - Parameters   │  - Body          │
│  - Search       │  - Body         │  - Timing        │
│                 │  - Auth         │                  │
│                 │                 │  [Copy as cURL]  │
│                 │  [Send Request] │  [Copy Response] │
└─────────────────┴─────────────────┴─────────────────┘
```

**Critical Features:**
1. **Automatic authentication** --- Pre-fill auth headers with the logged-in developer's
   test credentials
2. **Parameter validation** --- Validate parameters client-side before sending
3. **Request history** --- Store recent requests for easy re-execution
4. **Code generation** --- Generate code in multiple languages from the current request
5. **Environment switching** --- Toggle between sandbox and production
6. **Collection sharing** --- Save and share request collections with team members

---

## Failure Modes

1. **Building tools before fixing the API** --- A beautiful CLI on top of a broken API
   just makes the brokenness more convenient to encounter. Fix: Ensure the underlying
   API DX is solid before investing in tooling layers.

2. **Platform-specific assumptions** --- A CLI that works perfectly on macOS but fails
   on Windows and Linux. Fix: Test on all three major platforms in CI. Use
   cross-platform path handling and shell detection.

3. **Stale playgrounds** --- Sandbox environments that run an older API version or
   contain outdated sample data. Developers' first experience is with a broken
   product. Fix: Sandbox environments must be deployed alongside API deployments.

4. **Over-featured IDE extensions** --- Extensions that try to replicate the entire
   dashboard inside the IDE, resulting in poor performance and maintenance burden.
   Fix: IDE extensions should do 3-5 things extremely well, not 30 things adequately.

5. **No offline capability** --- CLI tools that fail completely without internet access
   instead of gracefully degrading. Fix: Cache frequently needed data locally.
   Provide clear error messages when network operations fail.

6. **Ignoring the uninstall experience** --- Tools that leave configuration files,
   credentials, and cache data scattered across the filesystem after uninstallation.
   Fix: Document cleanup procedures and provide an `uninstall` command.

---

## The Operator's Framework

**Step 1: Map the developer workflow**
Observe how developers currently interact with your platform. Document every context
switch (IDE to browser, browser to terminal, terminal to dashboard). Each context
switch is a tool opportunity.

**Step 2: Prioritize by frequency and friction**
Rank tools by (frequency of use) x (friction of current workflow). A tool that saves
10 seconds on a task performed 100 times daily is more valuable than one that saves
10 minutes on a monthly task.

**Step 3: Build the CLI first**
The CLI is the foundation. It serves power users immediately and provides the backend
for IDE extensions and CI/CD integrations later. Follow POSIX conventions and the
subcommand pattern.

**Step 4: Deploy a playground**
Launch an API explorer (Swagger UI or custom) that requires zero setup. This serves
the evaluation stage of the developer journey. Track conversion from playground to
signup.

**Step 5: Build the developer dashboard**
Focus on debugging first: request inspector, error logs, webhook status. Add analytics
later. The dashboard should reduce support ticket volume by enabling self-service
debugging.

**Step 6: Evaluate IDE extension investment**
Only after the CLI, playground, and dashboard are mature should you invest in IDE
extensions. The prerequisite is a stable API with a rich type system that benefits
from editor integration.

**Step 7: Instrument and measure**
Track tool adoption rates, feature usage within tools, and the impact of tools on
key DX metrics (TTFH, support ticket volume, activation rate).

---

## Summary

Developer tools are adoption accelerators with compounding returns. The key principles:

1. **CLI is foundational** --- Build the CLI first; it serves power users and underpins
   every subsequent tool investment
2. **Follow platform conventions** --- POSIX for CLIs, marketplace guidelines for IDE
   extensions, standard UI patterns for dashboards
3. **Playgrounds convert visitors** --- Zero-friction exploration environments are the
   highest-leverage onboarding tool
4. **Dashboards enable self-service** --- Every support ticket that could be resolved via
   dashboard represents a tool gap
5. **IDE extensions are late-stage** --- Invest only after core DX is excellent and the
   API surface is stable
6. **Test across platforms** --- Developer tools must work on macOS, Windows, and Linux
   without special configuration
7. **Tools are products** --- They need testing, CI/CD, versioning, documentation, and
   dedicated maintenance, just like the API itself

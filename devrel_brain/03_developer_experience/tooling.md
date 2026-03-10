# Developer Tooling

## Overview

Developer tooling encompasses the CLIs, SDKs, IDE extensions, debugging tools, and development environments that developers use to interact with a platform. Tooling quality directly determines developer productivity and satisfaction. Great tools make developers feel powerful; poor tools make them feel trapped. This module covers CLI design, SDK architecture, IDE integration, debugging and observability tooling, and the build-versus-buy decisions that shape a developer tooling strategy.

---

## 1. Developer Tooling Ecosystem

### 1.1 The Tooling Stack

```
┌────────────────────────────────────────────────────────┐
│                    DEVELOPER                           │
├────────────────────────────────────────────────────────┤
│  IDE / Editor                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Extension │  │ Snippets │  │ IntelliSense/    │    │
│  │ (LSP)    │  │          │  │ Autocomplete     │    │
│  └──────────┘  └──────────┘  └──────────────────┘    │
├────────────────────────────────────────────────────────┤
│  CLI                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Init/    │  │ Deploy   │  │ Debug / Logs     │    │
│  │ Scaffold │  │          │  │                  │    │
│  └──────────┘  └──────────┘  └──────────────────┘    │
├────────────────────────────────────────────────────────┤
│  SDKs (per language)                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Python   │  │ Node.js  │  │ Go / Java / etc. │    │
│  └──────────┘  └──────────┘  └──────────────────┘    │
├────────────────────────────────────────────────────────┤
│  API Layer                                             │
│  ┌──────────────────────────────────────────────┐     │
│  │  REST / GraphQL / gRPC                        │     │
│  └──────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────┘
```

### 1.2 Tooling Priority Matrix

Not all tools need to be built simultaneously. Prioritize based on developer impact and adoption stage.

| Priority | Tool | When to Build | Impact |
|----------|------|--------------|--------|
| P0 | API Reference (auto-generated) | Day 1 | Foundation for everything else |
| P0 | SDK for top 2 languages | Before public launch | Removes raw HTTP friction |
| P1 | CLI | After API is stable | Accelerates local development |
| P1 | Quickstart templates | Before public launch | TTFS optimization |
| P2 | IDE extension | After significant adoption | Productivity multiplier |
| P2 | Playground / API explorer | Before public launch | Evaluation acceleration |
| P3 | GitHub Actions / CI integrations | After adoption | Production integration |
| P3 | Terraform / IaC provider | When infrastructure customers emerge | Enterprise enablement |

---

## 2. CLI Design

### 2.1 CLI Design Principles

A well-designed CLI is a productivity multiplier that developers use daily. CLI design must follow established conventions while adding platform-specific value.

**Core CLI Principles:**

1. **Predictable structure**: `tool <resource> <action> [options]`
2. **Helpful by default**: Running a command without arguments shows help, not an error
3. **Composable**: Output can be piped to other tools (`| jq`, `| grep`, etc.)
4. **Scriptable**: Machine-readable output format (JSON) available via `--format json`
5. **Progressive**: Simple commands for common tasks, flags for advanced use
6. **Self-documenting**: `--help` on every command with examples

**CLI Command Structure Convention:**

```
myplatform <noun> <verb> [arguments] [flags]

Examples:
  myplatform project create my-app
  myplatform project list --format json
  myplatform deploy --env production
  myplatform logs tail --follow
  myplatform config set api-key sk_live_abc123
```

### 2.2 CLI Architecture

```
┌─────────────────────────────────────────┐
│           CLI Application               │
├────────────┬────────────┬───────────────┤
│  Command   │   Config   │   Output      │
│  Parser    │   Manager  │   Formatter   │
│  (cobra,   │  (dotfile, │  (table, json │
│   click)   │   env var) │   yaml)       │
├────────────┼────────────┼───────────────┤
│         HTTP Client / SDK               │
├─────────────────────────────────────────┤
│         Authentication                  │
│  (stored token, env var, browser flow)  │
└─────────────────────────────────────────┘
```

### 2.3 CLI Authentication Patterns

| Pattern | UX | Security | Best For |
|---------|-----|---------|---------|
| `login` command (browser OAuth) | Excellent | High | Interactive use |
| API key via env variable | Good | Medium | CI/CD, scripts |
| API key via config file | Good | Medium | Local development |
| API key via flag | Poor (leaks in history) | Low | Never recommended |

**Recommended Pattern:**

```bash
# Interactive login (opens browser, stores token)
myplatform login

# CI/CD (reads from environment)
export MYPLATFORM_API_KEY=sk_live_abc123
myplatform deploy

# Config file (~/.myplatform/config.json)
myplatform config set api-key sk_live_abc123
```

### 2.4 CLI Output Design

CLIs must support both human-readable and machine-readable output.

**Human-readable (default):**
```
┌──────────────┬──────────┬─────────────────┐
│ Name         │ Status   │ Last Deployed   │
├──────────────┼──────────┼─────────────────┤
│ my-app       │ active   │ 2 hours ago     │
│ staging-app  │ paused   │ 3 days ago      │
└──────────────┴──────────┴─────────────────┘
```

**Machine-readable (`--format json`):**
```json
[
  {"name": "my-app", "status": "active", "last_deployed": "2024-03-15T10:30:00Z"},
  {"name": "staging-app", "status": "paused", "last_deployed": "2024-03-12T14:22:00Z"}
]
```

### 2.5 CLI Error Messages

CLI errors must be actionable and specific:

```
BAD:
  Error: invalid configuration

GOOD:
  Error: Missing API key.

  Set your API key using one of these methods:
    1. Run: myplatform login
    2. Set environment variable: export MYPLATFORM_API_KEY=your-key
    3. Add to config file: myplatform config set api-key your-key

  Get your API key at: https://dashboard.myplatform.com/api-keys
```

---

## 3. SDK Design and Architecture

### 3.1 SDK Architecture Patterns

**Pattern 1: Thin Wrapper (API Mirror)**

The SDK is a one-to-one mapping of API endpoints to SDK methods. Minimal abstraction.

```python
# Thin wrapper: mirrors the API directly
response = client.post("/v1/users", data={"email": "jane@example.com"})
```

**Pattern 2: Idiomatic Client (Recommended)**

The SDK provides language-native abstractions over the API.

```python
# Idiomatic: feels native to the language
user = client.users.create(email="jane@example.com")
print(user.id)
```

**Pattern 3: High-Level Helper**

The SDK provides workflow-level abstractions that combine multiple API calls.

```python
# High-level: encapsulates complex workflows
onboarding = client.onboarding.start(user_id="usr_123")
onboarding.send_welcome_email()
onboarding.provision_sandbox()
onboarding.track_activation()
```

**Recommendation:** Build the Idiomatic Client as the primary SDK, with thin wrappers for advanced users and high-level helpers for common workflows.

### 3.2 SDK Design Checklist

| Category | Requirement | Notes |
|----------|------------|-------|
| **Initialization** | Single-line init with API key | `Client(api_key="sk_...")` |
| **Authentication** | Support API key, OAuth, env var | Auto-detect from environment |
| **Type Safety** | Full type definitions | TypeScript types, Python type hints, Go structs |
| **Error Handling** | Typed exceptions with error codes | `ApiError`, `ValidationError`, `RateLimitError` |
| **Pagination** | Auto-pagination with iterators | `for user in client.users.list()` |
| **Retry Logic** | Automatic retry with backoff | Configurable retry policy |
| **Rate Limiting** | Automatic rate limit handling | Respect `Retry-After` header |
| **Logging** | Configurable debug logging | Log requests/responses at debug level |
| **Timeouts** | Configurable timeouts | Sensible defaults (30s connect, 60s read) |
| **User-Agent** | Identify SDK in requests | `MyPlatform-Python/1.2.3` |
| **Versioning** | Semantic versioning | Major bump for breaking changes |
| **Testing** | Mock/stub support | `client = Client(mock=True)` |

### 3.3 SDK Generation vs. Handwritten

| Approach | Pros | Cons | When to Use |
|----------|------|------|-------------|
| **Auto-generated** (OpenAPI Generator, Speakeasy) | Consistent, fast updates, covers all endpoints | Generic feel, poor idiomaticity | Large API surface, many languages |
| **Handwritten** | Idiomatic, best DX, custom abstractions | Slow, expensive, drift risk | Core languages, DX-critical platforms |
| **Hybrid** | Generated base + handwritten helpers | Complexity, dual maintenance | Best of both worlds |

**Recommended Approach:** Auto-generate the base client from OpenAPI spec, then add handwritten convenience methods and language-specific patterns on top.

### 3.4 SDK Release Strategy

| Aspect | Strategy |
|--------|---------|
| Versioning | Semantic Versioning (MAJOR.MINOR.PATCH) |
| Release cadence | Within 1 week of API changes |
| Changelog | Generated from commit history, human-reviewed |
| Deprecation | Minimum 6-month deprecation window with warnings |
| Support matrix | Current + 1 previous major version |
| Language versions | Support last 3 major versions of each language runtime |

---

## 4. IDE Extensions

### 4.1 IDE Extension Value Proposition

IDE extensions bring the platform experience directly into the developer's primary workspace, eliminating context-switching between editor, browser, and terminal.

**High-Value IDE Features:**

| Feature | Value | Complexity |
|---------|-------|-----------|
| Autocomplete for API fields | Reduces typos and lookup | Medium |
| Inline documentation | Eliminates browser tab switching | Low |
| Error highlighting | Catches issues before running code | Medium |
| Snippet library | Accelerates common patterns | Low |
| Embedded API explorer | Try API calls from the editor | High |
| Live preview | See results as you type | High |
| Debugging integration | Set breakpoints in webhooks | Very High |

### 4.2 IDE Extension Architecture

```
┌─────────────────────────────────────────┐
│            VS Code Extension            │
├────────────┬────────────┬───────────────┤
│  Language  │  Command   │   WebView     │
│  Server    │  Palette   │   Panels      │
│  (LSP)     │  Commands  │   (UI)        │
├────────────┼────────────┼───────────────┤
│         Extension Host API              │
├─────────────────────────────────────────┤
│         Platform SDK / API              │
└─────────────────────────────────────────┘
```

### 4.3 Language Server Protocol (LSP)

For deep language integration, implement an LSP server that provides:

- **Autocompletion**: Suggest API fields, enum values, config options
- **Hover documentation**: Show inline docs for SDK methods
- **Diagnostics**: Highlight invalid configurations or deprecated usage
- **Go-to-definition**: Navigate to type definitions
- **Code actions**: Quick fixes for common issues

---

## 5. Debugging and Observability Tools

### 5.1 Developer Debugging Tools

| Tool | Purpose | Implementation |
|------|---------|---------------|
| Request inspector | View raw HTTP requests/responses | SDK debug mode, proxy tool |
| Webhook tester | Test webhook endpoints locally | CLI tunnel (`myplatform listen`) |
| Event replay | Re-send past events for debugging | Dashboard feature |
| Log viewer | Stream real-time logs | `myplatform logs tail --follow` |
| Error decoder | Explain error codes with context | CLI + docs deep linking |

### 5.2 Local Development Tunneling

Webhooks require publicly accessible URLs, which creates a local development challenge. Provide a built-in tunneling solution.

**CLI Tunnel Pattern:**

```bash
# Start a tunnel to receive webhooks locally
myplatform listen --port 3000

> Ready! Forwarding webhooks to http://localhost:3000
> Webhook URL: https://hooks.myplatform.com/cli/wh_abc123
>
> 2024-03-15 10:30:00  →  POST /webhook  [200 OK]  (45ms)
> 2024-03-15 10:30:05  →  POST /webhook  [500 Error]  (12ms)
```

### 5.3 Request/Response Logging

SDK debug mode should provide detailed request/response logging for troubleshooting.

```python
# Enable debug logging
client = Client(api_key="sk_...", debug=True)

# Output:
# > POST https://api.myplatform.com/v1/users
# > Headers: Authorization: Bearer sk_..., Content-Type: application/json
# > Body: {"email": "jane@example.com"}
# < 201 Created (234ms)
# < Headers: X-Request-Id: req_abc123, X-RateLimit-Remaining: 99
# < Body: {"id": "usr_456", "email": "jane@example.com", "created_at": "..."}
```

---

## 6. CI/CD Integration Tools

### 6.1 GitHub Actions

Provide official GitHub Actions for common workflows.

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: myplatform/deploy-action@v1
        with:
          api-key: ${{ secrets.MYPLATFORM_API_KEY }}
          environment: production
```

### 6.2 Terraform / IaC Providers

For infrastructure-oriented platforms, provide a Terraform provider.

```hcl
provider "myplatform" {
  api_key = var.myplatform_api_key
}

resource "myplatform_project" "main" {
  name        = "production-app"
  environment = "production"
  region      = "us-east-1"
}
```

### 6.3 Docker Integration

Provide official Docker images for common development scenarios.

```dockerfile
# Official development image with CLI pre-installed
FROM myplatform/dev:latest

COPY . /app
WORKDIR /app

RUN myplatform init
CMD ["myplatform", "dev", "--port", "3000"]
```

---

## 7. Starter Templates and Scaffolding

### 7.1 Template Strategy

Starter templates give developers a complete, working project to build from. This is often faster than building from scratch with docs.

**Template Requirements:**

| Requirement | Details |
|------------|---------|
| Framework coverage | Templates for top 5 frameworks in each language |
| Minimal but complete | Working app with auth, API calls, error handling |
| Production-ready patterns | Environment variables, not hardcoded keys |
| Documentation | README with setup instructions and architecture overview |
| CI-tested | Templates are tested in CI to prevent bit rot |

### 7.2 Scaffolding CLI

```bash
# Interactive scaffolding
myplatform init
> Select your language: [Python / JavaScript / Go / Java]
> Select your framework: [Express / Next.js / FastAPI / Flask]
> Select features: [x] Webhooks  [x] Auth  [ ] Billing
> Creating project...
> Done! Run `cd my-project && npm start` to begin.

# Non-interactive (for scripts)
myplatform init --language javascript --framework nextjs --features webhooks,auth
```

### 7.3 Example Repository Strategy

Maintain a curated set of example repositories:

| Category | Examples | Maintenance |
|----------|----------|-------------|
| Quickstarts | 1 per language (Python, JS, Go, Java, Ruby) | CI-tested, updated monthly |
| Framework integrations | Next.js, Express, FastAPI, Spring Boot | CI-tested, updated quarterly |
| Use case examples | Payment flow, auth flow, data sync | CI-tested, updated quarterly |
| Full applications | Complete SaaS starter kit | CI-tested, updated semi-annually |

---

## 8. Tooling Metrics

### 8.1 SDK Metrics

| Metric | Target | Collection |
|--------|--------|-----------|
| SDK adoption rate (% of API calls via SDK) | > 70% | User-Agent header analysis |
| SDK version distribution | > 80% on latest major | User-Agent header analysis |
| Install count (npm, PyPI, etc.) | Growing trend | Package registry stats |
| GitHub stars and forks | Growing trend | GitHub API |
| Issues response time | < 24 hours | GitHub API |

### 8.2 CLI Metrics

| Metric | Target | Collection |
|--------|--------|-----------|
| CLI install count | Growing trend | Homebrew, npm stats |
| Most-used commands | Inform prioritization | Opt-in telemetry |
| Error rate by command | < 1% for core commands | Opt-in telemetry |
| CLI TTFS | < 3 minutes | Benchmark testing |

### 8.3 Tooling Satisfaction

| Method | Frequency | Goal |
|--------|-----------|------|
| In-SDK satisfaction prompt | After 100th API call | NPS > 40 |
| CLI feedback command | `myplatform feedback` | Qualitative insights |
| GitHub issue analysis | Monthly | Identify tooling friction |
| Developer survey | Quarterly | Comprehensive satisfaction |

---

## 9. Key References

- Heroku CLI Design Guide -- Gold standard for CLI design
- Stripe SDK Design Principles -- SDK ergonomics and API design
- GitHub CLI (gh) -- Modern CLI architecture reference
- Language Server Protocol Specification -- IDE integration standard
- 12 Factor CLI Apps -- Principles for CLI application design

---

*This module covers developer tooling. See `dx_design.md` for DX design principles and `onboarding.md` for onboarding program design.*

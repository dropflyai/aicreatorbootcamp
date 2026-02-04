# Automation Platform Comparison: Selection Matrix and Decision Framework

## Overview

Choosing the right automation platform is a strategic decision that affects development velocity, operational cost, scalability, and data sovereignty. This module provides a comprehensive comparison of n8n, Zapier, and Make across multiple dimensions, along with a decision framework for selecting the optimal platform based on organizational requirements.

---

## 1. Feature Comparison Matrix

### 1.1 Core Capabilities

| Capability | n8n | Zapier | Make |
|-----------|-----|--------|------|
| Visual workflow builder | Yes | Yes | Yes |
| Code execution in workflows | JavaScript, Python | JavaScript, Python | JavaScript (limited) |
| Conditional branching | IF, Switch nodes | Paths (up to 5) | Router (unlimited) |
| Loops | Loop Over Items | Looping by Zapier | Iterator/Aggregator |
| Sub-workflows | Execute Workflow node | Call another Zap | Call another Scenario |
| Error handling | Node-level + workflow-level | Auto-retry + error Zaps | 4 handler types (resume, commit, rollback, break) |
| Version control | Manual (export/import) | Limited (version history) | Scenario versioning |
| Scheduling | Cron expression | Simple scheduler | Cron + interval |
| Webhooks | Full control | Receive + respond | Full control |
| API (programmatic) | Full REST API | Limited API | Full REST API |

### 1.2 Integration Ecosystem

| Dimension | n8n | Zapier | Make |
|-----------|-----|--------|------|
| Total integrations | 400+ | 7,000+ | 1,500+ |
| Custom integrations | Build with Code node | Code by Zapier + Webhooks | HTTP module + Custom apps |
| OAuth support | Built-in OAuth flow | Built-in OAuth | Built-in OAuth |
| Database connectors | Direct (PostgreSQL, MySQL, MongoDB) | Via third-party (e.g., database services) | Direct (MySQL, PostgreSQL, MongoDB) |
| File handling | Binary data support | Limited (via cloud storage) | Binary data support |
| AI integrations | OpenAI, Anthropic, local models | AI by Zapier (GPT) | OpenAI, HTTP to any API |

### 1.3 Deployment and Hosting

| Dimension | n8n | Zapier | Make |
|-----------|-----|--------|------|
| Self-hosted option | Yes (Docker, npm) | No | No |
| Cloud-hosted option | Yes (n8n Cloud) | Yes (only option) | Yes (only option) |
| Data sovereignty | Full control (self-hosted) | Data on Zapier servers | Data on Make servers |
| Air-gapped deployment | Yes (self-hosted) | No | No |
| SSO/SAML | Enterprise plan | Enterprise plan | Enterprise plan |

---

## 2. Pricing Comparison

### 2.1 Pricing Models

**n8n**: Self-hosted is free (open source). Cloud plans based on workflow executions.
- Community (self-hosted): Free, unlimited workflows and executions
- Starter (cloud): Starting at ~$20/month, 2,500 executions
- Pro (cloud): Starting at ~$50/month, 10,000 executions
- Enterprise: Custom pricing

**Zapier**: Cloud-only, priced by tasks (individual action executions).
- Free: 100 tasks/month, 5 single-step Zaps
- Starter: $19.99/month, 750 tasks
- Professional: $49/month, 2,000 tasks
- Team: $69/month per user, 2,000 tasks per user
- Enterprise: Custom pricing

**Make**: Cloud-only, priced by operations (module executions).
- Free: 1,000 operations/month, 2 active scenarios
- Core: $9/month, 10,000 operations
- Pro: $16/month, 10,000 operations + advanced features
- Teams: $29/month per user, 10,000 operations per user
- Enterprise: Custom pricing

### 2.2 Cost Comparison (Equivalent Workload)

For a workflow processing 1,000 items/month with 5 steps each:

| Platform | Unit | Consumption | Monthly Cost |
|----------|------|-------------|-------------|
| n8n (self-hosted) | Executions | 1,000 | $0 (infrastructure only) |
| n8n (cloud) | Executions | 1,000 | ~$20 |
| Zapier | Tasks | 5,000 | ~$49 (Professional) |
| Make | Operations | 5,000 | ~$9 (Core) |

**Key Insight**: Make is significantly cheaper per operation than Zapier. n8n self-hosted is cheapest at scale but requires infrastructure management. Zapier is the most expensive per unit but provides the broadest integration ecosystem.

### 2.3 Hidden Costs

| Cost Factor | n8n (self-hosted) | Zapier | Make |
|------------|-------------------|--------|------|
| Infrastructure | Server, database, Redis | $0 | $0 |
| Maintenance | Updates, backups, monitoring | $0 | $0 |
| Engineering time | Higher (setup, custom nodes) | Lower (more plug-and-play) | Medium |
| Learning curve | Steeper (more flexible) | Gentlest | Medium |
| Premium integrations | All included | Some require higher plans | All included |

---

## 3. Scalability Comparison

### 3.1 Volume Handling

| Dimension | n8n | Zapier | Make |
|-----------|-----|--------|------|
| Max concurrent executions | Hardware-limited (scalable) | Plan-limited | Plan-limited |
| High-volume processing | Excellent (queue mode) | Good (task limits) | Good (operation limits) |
| Burst handling | Scale workers dynamically | Auto-managed | Auto-managed |
| Max execution time | Configurable (no hard limit) | 30 minutes | Variable by plan |
| Large payload handling | 16MB+ (configurable) | Limited (varies) | 350MB per scenario |

### 3.2 Complexity Handling

| Dimension | n8n | Zapier | Make |
|-----------|-----|--------|------|
| Steps per workflow | Unlimited | 100 | 50+ modules |
| Nesting depth | Unlimited sub-workflows | Limited | Nested scenarios |
| Data transformation | Code node (full JS/Python) | Code step + Formatter | Formula editor + JavaScript |
| Binary data processing | Built-in | Limited | Built-in |
| Recursive workflows | Supported | Not supported | Limited |

---

## 4. Use Case Fit Analysis

### 4.1 Best Platform by Use Case

| Use Case | Best Platform | Why |
|----------|--------------|-----|
| Simple app-to-app sync | Zapier | Broadest integrations, fastest setup |
| Complex data transformation | Make or n8n | Superior data manipulation |
| High-volume processing | n8n (self-hosted) | No per-execution cost |
| Regulated industry (HIPAA, SOC2) | n8n (self-hosted) | Full data sovereignty |
| Non-technical team building automations | Zapier | Simplest interface |
| Cost-sensitive operations | Make or n8n | Lower per-operation cost |
| AI-powered workflows | n8n | Direct LLM API access, custom code |
| Internal tool automation | n8n | Self-hosted, no data sharing |
| E-commerce automation | Zapier or Make | Strong e-commerce integrations |
| Document processing | n8n or Make | Binary data handling |

### 4.2 Anti-Patterns (When NOT to Use Each Platform)

**Do NOT use n8n when**:
- Your team has no technical resources for hosting and maintenance
- You need rapid prototyping with maximum integration breadth
- The budget for infrastructure management is zero

**Do NOT use Zapier when**:
- Cost per operation is a primary concern at scale
- You need complex data transformations or binary data processing
- Data sovereignty is a regulatory requirement
- You need more than 100 steps in a workflow

**Do NOT use Make when**:
- You need self-hosting capability
- The workflow requires direct database connections to niche databases
- You need unlimited scenario execution time

---

## 5. Decision Framework

### 5.1 Decision Tree

```
Start
  |
  v
Do you require self-hosting / data sovereignty?
  |
  +--> Yes --> n8n
  |
  +--> No
        |
        v
      Is the team non-technical?
        |
        +--> Yes
        |     |
        |     v
        |   Is broad integration ecosystem the top priority?
        |     |
        |     +--> Yes --> Zapier
        |     +--> No --> Make (good balance of ease and power)
        |
        +--> No (technical team)
              |
              v
            Volume > 10,000 operations/month?
              |
              +--> Yes --> n8n (self-hosted for cost) or Make (managed for simplicity)
              |
              +--> No
                    |
                    v
                  Complex data transformation needed?
                    |
                    +--> Yes --> Make or n8n
                    +--> No --> Zapier (fastest to build)
```

### 5.2 Evaluation Scorecard

Rate each platform 1-5 for your specific requirements:

| Criterion | Weight | n8n | Zapier | Make |
|-----------|--------|-----|--------|------|
| Integration breadth | <!-- 1-5 --> |  |  |  |
| Ease of use | <!-- 1-5 --> |  |  |  |
| Cost at projected volume | <!-- 1-5 --> |  |  |  |
| Data transformation power | <!-- 1-5 --> |  |  |  |
| Self-hosting / data sovereignty | <!-- 1-5 --> |  |  |  |
| Scalability | <!-- 1-5 --> |  |  |  |
| Error handling | <!-- 1-5 --> |  |  |  |
| AI integration | <!-- 1-5 --> |  |  |  |
| Team technical capability | <!-- 1-5 --> |  |  |  |
| **Weighted Total** | | | | |

---

## 6. Migration Considerations

### 6.1 Platform Migration Complexity

| From/To | n8n | Zapier | Make |
|---------|-----|--------|------|
| n8n | -- | Medium (re-build workflows) | Medium |
| Zapier | Medium | -- | Medium |
| Make | Medium | Medium | -- |

All migrations require re-building workflows. There is no automated migration between platforms. Plan for 2-5 hours per complex workflow for migration.

### 6.2 Migration Strategy

1. **Inventory**: Document all existing workflows with triggers, actions, and business logic
2. **Prioritize**: Rank workflows by business criticality
3. **Rebuild**: Rebuild workflows on the new platform, starting with highest priority
4. **Test**: Run both old and new workflows in parallel for 1-2 weeks
5. **Cutover**: Disable old workflows after confirming new ones are stable
6. **Decommission**: Cancel the old platform after a 30-day grace period

---

## 7. Multi-Platform Strategy

### 7.1 When to Use Multiple Platforms

Some organizations benefit from using multiple platforms:
- Zapier for non-technical teams building simple automations
- n8n for the engineering team building complex, high-volume workflows
- Shared integration points through webhooks between platforms

### 7.2 Governance

When using multiple platforms:
- Maintain a central registry of all automations across platforms
- Define which platform should be used for which use case category
- Standardize naming conventions and documentation across platforms
- Centralize monitoring and alerting

---

## 8. Key References

- n8n Documentation -- https://docs.n8n.io
- Zapier Documentation -- https://zapier.com/help
- Make Documentation -- https://www.make.com/en/help
- G2 Reviews Comparison -- Automation Platform Reviews
- Capterra Comparison -- Workflow Automation Software

---

*This module provides platform selection guidance. See `n8n.md`, `zapier.md`, and `make.md` for platform-specific deep dives.*

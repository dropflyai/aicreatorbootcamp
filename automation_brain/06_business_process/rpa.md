# RPA: Robotic Process Automation -- When, Where, and How

## Overview

Robotic Process Automation (RPA) uses software robots ("bots") that mimic human interactions with computer systems -- clicking buttons, filling forms, copying data between applications, and navigating UIs. RPA is distinct from API-based automation: while API-based automation connects systems at the data layer, RPA operates at the UI layer, making it suitable for legacy systems that lack APIs. This module covers when to use RPA, its fundamental limitations, governance requirements, and the major RPA platforms.

---

## 1. Understanding RPA

### 1.1 What RPA Does

RPA bots interact with applications the same way a human user does:
- Navigate screen elements by identifying UI components
- Read text from screens using OCR or UI selectors
- Type text into fields, click buttons, select dropdowns
- Copy data between applications via clipboard or variables
- Follow rules and conditional logic
- Run on a schedule or triggered by events

### 1.2 RPA vs. API-Based Automation

| Dimension | RPA | API-Based Automation |
|-----------|-----|---------------------|
| Integration Point | UI layer (screen interaction) | Data layer (API calls) |
| Speed | Slower (mimics human clicks) | Faster (direct data exchange) |
| Reliability | Lower (UI changes break bots) | Higher (API contracts are stable) |
| Setup Cost | Lower for legacy systems | Lower for modern systems |
| Maintenance | Higher (UI-dependent) | Lower (API-dependent) |
| Scalability | Limited (one bot per session) | High (concurrent API calls) |
| Best For | Legacy systems without APIs | Modern systems with APIs |

### 1.3 The RPA Decision Matrix

```
Does the target system have an API?
  |
  +--> Yes: Is the API sufficient for your needs?
  |         +--> Yes: Use API-based automation (not RPA)
  |         +--> No: Use API for what it covers + RPA for gaps
  |
  +--> No: Is the process high-volume (>100/day)?
            |
            +--> Yes: Consider RPA now, plan API development for long term
            +--> No: Consider manual process or lightweight RPA
```

---

## 2. When to Use RPA

### 2.1 Ideal RPA Candidates

RPA is the right choice when:
- **No API Available**: The target application is a legacy system with no programmatic interface
- **Bridge Solution**: You need automation now while API development is in progress
- **Cross-Application**: The process involves copying data between multiple desktop applications
- **Temporary Need**: The process will be replaced by a modern system within 12-24 months
- **Regulatory Constraint**: The application cannot be modified (regulatory or vendor restrictions)

### 2.2 Strong RPA Use Cases

| Use Case | Description | Why RPA |
|----------|-------------|---------|
| Mainframe data entry | Enter data from modern systems into mainframe terminals | No API for mainframe |
| Legacy ERP interaction | Extract reports from on-premise ERP systems | Limited or no API access |
| Government portal submission | Submit forms on government websites | No API for government portals |
| Desktop application automation | Automate repetitive tasks in desktop software | No web API available |
| Screen scraping | Extract data displayed in UI-only applications | Data not available via API |

### 2.3 Poor RPA Use Cases (Anti-Patterns)

**Do NOT use RPA when**:
- An API exists and is adequate -- API automation is faster, more reliable, and cheaper
- The process requires human judgment at every step -- RPA cannot replace cognition
- The UI changes frequently -- maintenance cost will exceed automation value
- The process has too many exceptions -- RPA handles exceptions poorly
- High accuracy is critical and the process involves unstructured data -- RPA/OCR error rates may be unacceptable

---

## 3. RPA Limitations

### 3.1 Brittleness

RPA bots identify UI elements by selectors (XPath, CSS, accessibility IDs). When the UI changes:
- Button moved: Bot clicks the wrong element or cannot find the button
- Field renamed: Bot enters data in the wrong field
- Page layout changed: Bot navigation breaks entirely
- Pop-up added: Unexpected dialog blocks bot execution

**Mitigation**: Use resilient selectors (accessibility IDs over XPath), implement visual verification checkpoints, and monitor bot health actively.

### 3.2 Scalability Constraints

- Each bot requires a dedicated desktop session (cannot share sessions)
- Licensing is typically per-bot, making scale expensive
- Bot execution is sequential (one task at a time per bot)
- Resource consumption is high (each bot needs CPU, memory, and screen)

**Mitigation**: Use attended bots (shared with human users) for low-volume tasks. Use unattended bot pools with orchestrators for high-volume tasks.

### 3.3 Security Considerations

- Bots need user credentials for the applications they access
- Credential storage and rotation must be managed centrally
- Bot activity must be audited (what did the bot access and modify?)
- Bots can be targets for credential theft if not properly secured
- Screen captures during bot execution may contain sensitive data

---

## 4. RPA Governance

### 4.1 Bot Lifecycle Management

```
Design --> Develop --> Test --> Deploy --> Monitor --> Maintain --> Retire
```

Each phase requires governance:
- **Design**: Process documentation, approval by process owner
- **Develop**: Code review (yes, bot scripts need review), version control
- **Test**: Functional testing, exception testing, regression testing
- **Deploy**: Staged deployment (dev -> UAT -> production)
- **Monitor**: Execution monitoring, error alerting, SLA tracking
- **Maintain**: UI change adaptation, credential rotation, performance optimization
- **Retire**: Clean decommission when the process is deprecated

### 4.2 Bot Inventory

Maintain a registry of all bots:

| Bot | Process | Owner | Systems Accessed | Credentials | Status | Last Updated |
|-----|---------|-------|-----------------|-------------|--------|-------------|
|     |         |       |                 |             |        |             |

### 4.3 Access Control

- Bots should have dedicated service accounts (not human user accounts)
- Service accounts should have minimum necessary permissions
- Credential storage must be encrypted and centrally managed
- Access reviews should include bot accounts
- Bot accounts should be disabled when bots are retired

### 4.4 Change Management

When a target application changes:
1. Detect the change (monitoring or notification from application team)
2. Assess impact on bots that interact with the changed application
3. Update affected bots in a development environment
4. Test updated bots against the changed application
5. Deploy updated bots to production
6. Monitor for issues after deployment

---

## 5. RPA Platforms

### 5.1 UiPath

**Strengths**: Market leader, extensive activity library, strong AI/ML integration, large community, comprehensive orchestrator for enterprise bot management.

**Architecture**: UiPath Studio (development), UiPath Orchestrator (management), UiPath Robots (execution), UiPath AI Center (ML models).

**Best For**: Enterprise-scale RPA deployments, organizations needing extensive integrations, teams requiring strong AI augmentation.

### 5.2 Microsoft Power Automate (Desktop)

**Strengths**: Integrated with Microsoft 365, low cost for Microsoft enterprise customers, visual designer, cloud and desktop flow combination.

**Architecture**: Power Automate Desktop (local execution), Power Automate Cloud (orchestration), Power Platform integration (Power Apps, Power BI).

**Best For**: Microsoft-centric organizations, organizations wanting to combine cloud automation with desktop RPA, cost-sensitive deployments.

### 5.3 Automation Anywhere

**Strengths**: Cloud-native architecture, strong bot lifecycle management, process discovery capabilities, IQ Bot for intelligent document processing.

**Architecture**: Control Room (management), Bot Agent (execution), Bot Insight (analytics).

**Best For**: Cloud-first organizations, enterprises needing strong analytics on bot performance.

### 5.4 Platform Selection Guide

| Criterion | UiPath | Power Automate | Automation Anywhere |
|-----------|--------|---------------|-------------------|
| Enterprise scale | Excellent | Good | Excellent |
| Cost | Higher | Lower (Microsoft licensing) | Higher |
| Ease of use | Good | Excellent | Good |
| AI integration | Excellent | Good | Good |
| Community | Large | Large (Microsoft ecosystem) | Medium |
| Cloud-native | Improving | Yes | Yes |

---

## 6. RPA + AI (Intelligent Automation)

### 6.1 Augmenting RPA with AI

Pure RPA handles structured, rule-based tasks. Adding AI extends RPA to handle:
- **Unstructured Data**: OCR + NLP to read and understand documents
- **Decision Making**: ML models to make classification or routing decisions
- **Exception Handling**: AI to classify exceptions and determine the appropriate response
- **Natural Language**: Chatbots that trigger RPA workflows based on natural language requests

### 6.2 Intelligent Automation Architecture

```
User Request (natural language)
    |
    v
[AI: Intent Classification]
    |
    v
[AI: Entity Extraction]
    |
    v
[RPA: Execute Process in Target System]
    |
    v
[AI: Verify Output Quality]
    |
    v
Response to User
```

### 6.3 Document Processing with AI + RPA

```
Document Received (email, scan, upload)
    |
    v
[AI: Document Classification (invoice, receipt, contract)]
    |
    v
[AI: OCR + Data Extraction]
    |
    v
[AI: Data Validation and Confidence Scoring]
    |
    +--> High Confidence: [RPA: Enter Data into System]
    |
    +--> Low Confidence: [Route to Human for Review]
```

---

## 7. RPA Metrics

### 7.1 Operational Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Bot Utilization | % of time bots are actively processing | > 70% |
| Success Rate | % of executions completing without errors | > 95% |
| Exception Rate | % of executions requiring human intervention | < 10% |
| Processing Time | Average time per transaction | < manual time |
| Queue Wait Time | Average time items wait for bot availability | < 5 minutes |

### 7.2 Business Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| FTE Equivalent | Human hours saved, expressed as FTE | Track monthly |
| Cost Savings | $ saved vs. manual processing | Track monthly |
| Error Reduction | % reduction in processing errors | > 80% |
| Cycle Time Reduction | % reduction in end-to-end process time | > 50% |
| ROI | Return on RPA investment | > 200% within 12 months |

---

## 8. Key References

- van der Aalst et al. (2018) -- "Robotic Process Automation" (comprehensive academic overview)
- Willcocks et al. (2015) -- "The IT Function and Robotic Process Automation"
- UiPath Academy -- Free RPA training and certification
- Gartner Magic Quadrant -- RPA platform comparison

---

*This module covers RPA. See `process_automation.md` for BPA strategy and `document_automation.md` for document-specific automation.*

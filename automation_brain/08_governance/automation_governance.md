# Automation Governance: Standards, Documentation, and Access Management

## Overview

As automation proliferates across an organization, governance becomes essential to prevent chaos. Without governance, organizations accumulate hundreds of undocumented workflows built by different teams, using inconsistent naming, lacking error handling, and creating invisible dependencies between systems. This module covers naming conventions, documentation standards, version control, access management, and the organizational structures needed to maintain automation at scale.

---

## 1. Naming Conventions

### 1.1 Workflow Naming

Format: `[Domain]-[Action]-[Source]-[Target]-[Version]`

Examples:
- `sales-sync-contacts-salesforce-hubspot-v2`
- `finance-process-invoices-email-quickbooks-v1`
- `hr-onboard-new-hire-bamboo-slack-v3`
- `ops-alert-inventory-low-shopify-slack-v1`

### 1.2 Domain Prefixes

| Prefix | Domain | Examples |
|--------|--------|---------|
| sales | Sales operations | Lead routing, deal sync |
| mktg | Marketing | Campaign automation, lead scoring |
| finance | Finance and accounting | Invoice processing, expense reports |
| hr | Human resources | Onboarding, time tracking |
| ops | Operations | Inventory, shipping, alerts |
| support | Customer support | Ticket routing, CSAT surveys |
| eng | Engineering | CI/CD, monitoring, deployments |
| data | Data operations | ETL, sync, quality checks |

### 1.3 Step/Node Naming

Within workflows, name each step descriptively:
- Bad: "Step 1", "HTTP Request", "Code"
- Good: "Fetch new orders from Shopify", "Transform to HubSpot contact format", "Create or update HubSpot contact"

---

## 2. Documentation Standards

### 2.1 Workflow Documentation Template

Every production workflow must have:

**Purpose**: What business process does this workflow automate? (1-2 sentences)

**Trigger**: What starts this workflow? (event, schedule, manual)

**Data Flow**: What data enters, how is it transformed, where does it go?

**Dependencies**: What external services does this workflow depend on?

**Error Handling**: How are errors handled? What happens when [each dependency] fails?

**Owner**: Who is responsible for maintaining this workflow?

**SLA**: What is the expected execution time? What freshness guarantees does it provide?

**Last Reviewed**: When was this documentation last verified against the actual workflow?

### 2.2 Documentation Location

Store documentation alongside the workflow:
- In the workflow's notes/description field (platform-native)
- In a linked documentation system (Confluence, Notion, wiki) referenced by the workflow
- In version control alongside workflow export files

### 2.3 Change Documentation

Every change to a production workflow must be documented:
- What was changed and why
- Who made the change and when
- What testing was performed
- Rollback plan if the change causes issues

---

## 3. Version Control

### 3.1 Workflow Versioning Strategy

**Export-Based Versioning**: Periodically export workflow definitions and commit to Git:
- Export after each change (or on a schedule)
- Store exports in a structured directory: `workflows/[domain]/[workflow-name]/`
- Commit with meaningful messages describing the change
- Tag releases (v1.0, v1.1, v2.0)

**Platform-Native Versioning**: Use the automation platform's built-in version history:
- Simpler but less robust than Git
- Limited diff capabilities
- No branching or pull request workflow
- Acceptable for small teams with few workflows

### 3.2 Change Management Process

```
1. Document proposed change (what, why, impact)
2. Create the change in a development/test environment
3. Test thoroughly (happy path, error paths, edge cases)
4. Export and commit the updated workflow to Git
5. Request review from workflow owner or automation team
6. Deploy to production after approval
7. Monitor the first 10 executions after deployment
8. Update documentation
```

### 3.3 Rollback Strategy

When a workflow change causes issues:
1. Immediately revert to the previous version (import from Git or platform version history)
2. Verify the reverted workflow executes correctly
3. Investigate the issue in the failed version
4. Fix and re-test before attempting deployment again

---

## 4. Access Management

### 4.1 Role-Based Access Control

| Role | Create Workflows | Edit Workflows | Deploy to Prod | Manage Credentials | Admin |
|------|-----------------|---------------|----------------|-------------------|-------|
| Viewer | No | No | No | No | No |
| Builder | Yes (dev only) | Yes (own) | No | No | No |
| Deployer | Yes | Yes | Yes | No | No |
| Admin | Yes | Yes | Yes | Yes | Yes |

### 4.2 Environment Separation

Maintain separate environments for development and production:
- **Development**: Builders create and test workflows. Connected to sandbox/test instances of external services.
- **Staging**: Pre-production testing. Connected to staging instances or production with read-only access.
- **Production**: Live workflows. Changes require approval and the Deployer or Admin role.

### 4.3 Credential Access Control

- Credentials are managed by Admins only
- Builders reference credentials by name but cannot view the actual values
- Each external service has separate credentials for development and production
- Credential usage is logged for audit
- Quarterly credential access review

---

## 5. Automation Inventory

### 5.1 Registry

Maintain a central registry of all automations:

| Field | Description |
|-------|-------------|
| Workflow ID | Unique identifier |
| Name | Following naming conventions |
| Domain | Business domain (sales, finance, etc.) |
| Owner | Responsible person/team |
| Platform | n8n, Zapier, Make, custom |
| Status | Active, Paused, Deprecated |
| Trigger Type | Webhook, schedule, event |
| Schedule | If scheduled, the cron expression |
| External Services | List of APIs and services used |
| Credentials Used | List of credential references |
| SLA | Expected execution time and freshness |
| Last Modified | Date of last change |
| Documentation Link | Link to full documentation |

### 5.2 Dependency Mapping

Map dependencies between workflows and between workflows and external services:

```
Workflow A (CRM Sync) --depends on--> Salesforce API
Workflow A (CRM Sync) --depends on--> HubSpot API
Workflow A (CRM Sync) --triggers--> Workflow B (Lead Scoring)
Workflow B (Lead Scoring) --depends on--> Clearbit API
Workflow B (Lead Scoring) --depends on--> Workflow A output
```

Use this map to:
- Assess impact of API outages (which workflows are affected?)
- Plan maintenance windows (which workflows need to be paused?)
- Identify single points of failure
- Plan workflow retirement (what depends on this workflow?)

---

## 6. Review and Audit

### 6.1 Periodic Review Schedule

| Review Type | Frequency | Scope | Reviewer |
|-------------|-----------|-------|----------|
| Workflow health check | Monthly | All active workflows | Automation team |
| Documentation accuracy | Quarterly | All workflows | Workflow owners |
| Credential review | Quarterly | All credentials | Security + Admin |
| Unused workflow cleanup | Quarterly | Paused/inactive workflows | Automation team |
| Full governance audit | Annually | All governance practices | Management + Security |

### 6.2 Health Check Criteria

During monthly health checks, evaluate each workflow:
- [ ] Workflow has executed successfully in the last expected interval
- [ ] Error rate is below acceptable threshold
- [ ] Execution duration is within expected range
- [ ] All external service connections are active
- [ ] Documentation is up to date
- [ ] Owner is still with the organization and responsive

### 6.3 Compliance Audit

For regulated organizations, the annual audit should verify:
- All workflows processing sensitive data are documented
- Access controls are properly configured
- Credential management follows security policies
- Audit logs are retained for the required period
- Change management process is followed
- Data handling complies with privacy regulations

---

## 7. Organizational Structure

### 7.1 Automation Center of Excellence (CoE)

For organizations with significant automation investment, establish a CoE:

**Responsibilities**:
- Define and maintain governance standards
- Provide platform expertise and best practices
- Review and approve complex automations
- Manage shared infrastructure and platforms
- Train and support automation builders across the organization
- Track automation ROI and impact

**Team Composition**:
- Automation architect (1): Technical leadership, architecture decisions
- Automation engineers (2-4): Build complex workflows, support builders
- Platform administrator (1): Manage platforms, credentials, infrastructure

### 7.2 Federated Model

For smaller organizations, embed automation capability within existing teams:
- Each team has designated automation builders
- A shared automation channel for questions and knowledge sharing
- Quarterly automation community meetings for sharing patterns and lessons
- Shared governance standards applied by each team

---

## 8. Key References

- Gartner -- "Automation Center of Excellence" best practices
- McKinsey -- "Scaling Automation" organizational guidance
- IEEE -- Software engineering governance standards (applicable to automation)

---

*This module covers automation governance. See `scaling.md` for scaling strategies and `security.md` for security practices.*

# Platform Engineering — Internal Developer Platforms, Golden Paths, and Self-Service

## Overview

Platform engineering is the discipline of building and maintaining internal developer platforms (IDPs) that enable development teams to self-serve infrastructure, deployments, and operational tooling without waiting for platform or DevOps teams. It is the organizational evolution from "DevOps as a team" to "DevOps as a platform." The goal is to provide golden paths — opinionated, well-supported workflows that make the right thing the easy thing — while maintaining guardrails that enforce security, compliance, and cost standards.

Gartner predicts that by 2026, 80% of software engineering organizations will establish platform teams as internal providers of reusable services, components, and tools for application delivery. This module codifies IDP architecture, golden path design, Backstage as a developer portal, self-service infrastructure, and platform guardrails.

---

## Internal Developer Platform Architecture

### Platform Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Developer Portal                       │
│  (Backstage, catalog, templates, docs, service status)   │
├──────────────────────────┬──────────────────────────────┤
│      Self-Service API    │      Golden Path Templates    │
│  (create service, deploy,│  (new service scaffold,       │
│   provision database,    │   CI/CD pipeline, monitoring  │
│   request environment)   │   setup, IaC templates)       │
├──────────────────────────┴──────────────────────────────┤
│                     Platform Services                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │ CI/CD    │ │Observ-   │ │ Security │ │ Database   │ │
│  │(GitHub   │ │ability   │ │ (secrets,│ │ (RDS, DDB  │ │
│  │ Actions, │ │(Datadog, │ │  scanning│ │  provision │ │
│  │ ArgoCD)  │ │ Grafana) │ │  IAM)    │ │  + config) │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ │
├─────────────────────────────────────────────────────────┤
│                    Infrastructure                         │
│  (Kubernetes, AWS, Terraform, networking, DNS)            │
└─────────────────────────────────────────────────────────┘
```

### Platform Team Responsibilities

| Responsibility | Description |
|---------------|-------------|
| Developer experience | Make it easy for developers to build, deploy, and operate services |
| Golden paths | Provide opinionated, well-supported workflows for common tasks |
| Self-service | Enable developers to provision resources without tickets or waiting |
| Guardrails | Enforce security, compliance, and cost standards automatically |
| Reliability | Ensure platform services are reliable and well-documented |
| Adoption | Measure and improve developer adoption of platform capabilities |
| Documentation | Maintain comprehensive documentation and examples |

---

## Golden Paths — Opinionated Best Practices

### What is a Golden Path?

A golden path is the supported, recommended way to accomplish a common development task. It is:
- **Opinionated:** Makes decisions for the developer (language, framework, deployment strategy)
- **Supported:** The platform team actively maintains and supports this path
- **Tested:** Automated tests verify the path works correctly
- **Documented:** Clear documentation with examples
- **Not mandatory:** Developers can diverge, but they lose platform support and must self-maintain

### Example Golden Paths

| Golden Path | Provides |
|------------|---------|
| New Service | Repository scaffold, CI/CD pipeline, monitoring, logging, deployment config, service registration |
| New API | OpenAPI template, API gateway config, authentication setup, documentation |
| New Database | RDS/DynamoDB provisioning, backup config, monitoring, connection pooling, migration setup |
| New Frontend | React/Next.js scaffold, CI/CD, CDN deployment, monitoring, feature flags |
| New Environment | Terraform workspace, network config, IAM roles, cost budget, monitoring |

### Golden Path Template (New Service)

When a developer creates a new service via the platform:

```
1. Repository created from template:
   ├── src/                     # Application code scaffold
   ├── Dockerfile               # Multi-stage build, distroless, non-root
   ├── docker-compose.yml       # Local development environment
   ├── .github/workflows/       # CI/CD pipeline (build, test, scan, deploy)
   ├── terraform/               # IaC for service infrastructure
   ├── k8s/                     # Kubernetes manifests (Kustomize)
   ├── docs/                    # ADRs, runbooks, API docs
   └── catalog-info.yaml        # Backstage service registration

2. Infrastructure provisioned:
   - ECR repository for container images
   - IAM role with service-specific permissions
   - CloudWatch log group
   - DynamoDB table (if data service)
   - Secrets Manager entries

3. Pipeline configured:
   - Build, test, SAST, SCA, container scan
   - Deploy to staging automatically
   - Deploy to production with approval

4. Observability configured:
   - CloudWatch dashboards
   - Standard alerting (error rate, latency, 5xx)
   - Distributed tracing (X-Ray)
   - Log aggregation with structured logging

5. Service registered:
   - Backstage catalog entry
   - API documentation published
   - Ownership assigned
   - On-call rotation linked
```

---

## Backstage — Developer Portal

### Backstage Architecture

Backstage (created by Spotify, now a CNCF project) is the leading open-source developer portal:

**Core Features:**
| Feature | Purpose |
|---------|---------|
| Software Catalog | Registry of all services, libraries, websites, pipelines with ownership |
| Software Templates | Scaffolding for new services, APIs, infrastructure (golden paths) |
| TechDocs | Documentation-as-code, rendered and searchable in the portal |
| Search | Cross-cutting search across catalog, docs, and plugins |
| Plugins | Extensible architecture for integrating any tool (CI/CD, monitoring, cost) |

### Software Catalog

```yaml
# catalog-info.yaml (in each service repository)
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: order-service
  description: Manages customer orders and fulfillment
  annotations:
    github.com/project-slug: org/order-service
    backstage.io/techdocs-ref: dir:.
    pagerduty.com/service-id: P123ABC
    datadoghq.com/dashboard-url: https://app.datadoghq.com/...
  tags:
    - typescript
    - api
    - production
spec:
  type: service
  lifecycle: production
  owner: team-orders
  system: ecommerce-platform
  providesApis:
    - order-api
  consumesApis:
    - payment-api
    - inventory-api
  dependsOn:
    - resource:order-database
    - resource:order-cache
```

### Software Templates

```yaml
# template.yaml (Backstage scaffolder template)
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: new-service
  title: Create New Microservice
  description: Creates a new microservice with CI/CD, monitoring, and deployment
spec:
  owner: platform-team
  type: service
  parameters:
    - title: Service Information
      required: [name, description, owner]
      properties:
        name:
          title: Service Name
          type: string
          pattern: '^[a-z][a-z0-9-]*$'
        description:
          title: Description
          type: string
        owner:
          title: Owning Team
          type: string
          ui:field: OwnerPicker
        language:
          title: Programming Language
          type: string
          enum: [typescript, python, go]
          default: typescript
        hasDatabase:
          title: Needs a Database?
          type: boolean
          default: false
  steps:
    - id: fetch-template
      name: Fetch Template
      action: fetch:template
      input:
        url: ./skeleton
        values:
          name: ${{ parameters.name }}
          description: ${{ parameters.description }}
          owner: ${{ parameters.owner }}
    - id: publish
      name: Create Repository
      action: publish:github
      input:
        repoUrl: github.com?repo=${{ parameters.name }}&owner=org
    - id: register
      name: Register in Catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
```

---

## Self-Service Infrastructure

### Self-Service Patterns

| Pattern | Implementation | Example |
|---------|---------------|---------|
| Template-based | Backstage templates + Terraform modules | "Create new service" creates repo + infra |
| API-driven | Platform API that provisions resources | POST /api/databases creates RDS instance |
| GitOps-driven | PR to infra repo triggers provisioning | Add YAML to config repo, ArgoCD provisions |
| Catalog-driven | Declare resources in catalog, platform provisions | `dependsOn: resource:postgres` triggers creation |

### Self-Service Guardrails

Self-service without guardrails leads to cost overruns, security violations, and operational complexity. Guardrails enforce standards without blocking developers:

| Guardrail | Implementation |
|-----------|---------------|
| Cost limits | Budget alerts per team, approve requests above threshold |
| Security standards | OPA/Sentinel policies block non-compliant infrastructure |
| Approved services | Only pre-approved modules available in templates |
| Naming conventions | Validation in templates and policies |
| Network isolation | Templates enforce proper VPC/subnet placement |
| Encryption | All storage modules enable encryption by default |
| Tagging | Required tags enforced by policy (team, environment, cost-center) |
| Resource limits | Maximum instance sizes, storage quotas per team |

---

## Platform Metrics

### Developer Productivity Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Time to first deployment | Time from "create service" to running in production | <1 day |
| Deployment frequency | How often teams deploy | Multiple times per day |
| Lead time for changes | Time from commit to production | <1 hour |
| Change failure rate | % of deployments causing incidents | <5% |
| MTTR | Mean time to recover from failures | <1 hour |
| Developer satisfaction (NPS) | Survey-based satisfaction score | >50 |
| Golden path adoption | % of services using golden paths | >80% |
| Self-service rate | % of infra requests fulfilled without tickets | >90% |

### Platform Health Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Platform availability | Uptime of platform services (CI/CD, portal, etc.) | 99.9% |
| Build success rate | % of CI/CD builds that succeed | >95% |
| Mean build time | Average CI/CD pipeline duration | <10 minutes |
| Template usage | Number of services created via templates per month | Growing trend |
| Support ticket volume | Requests requiring human platform team intervention | Decreasing trend |

---

## Cross-References

- `05_infrastructure_as_code/iac_fundamentals.md` — Terraform foundation
- `05_infrastructure_as_code/iac_patterns.md` — Module library patterns
- `04_containers/container_orchestration.md` — GitOps deployment
- `06_reliability/observability.md` — Platform observability
- `07_cost/cost_management.md` — Platform cost governance

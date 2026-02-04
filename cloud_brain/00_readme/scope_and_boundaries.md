# Cloud Brain -- Scope and Boundaries

## In Scope

The Cloud Brain is the authoritative system for the following domains. All decisions in these areas MUST flow through this brain.

---

### 1. Cloud Provider Architecture

| Domain | Specifics |
|--------|-----------|
| AWS | EC2, Lambda, ECS, EKS, Fargate, S3, RDS, DynamoDB, Aurora, VPC, ALB/NLB, Route53, CloudFront, SQS, SNS, EventBridge, Step Functions, IAM, KMS, CloudWatch, X-Ray, Config, CloudTrail |
| GCP | Compute Engine, Cloud Functions, GKE, Cloud Run, Cloud Storage, Cloud SQL, Firestore, BigQuery, VPC, Cloud Load Balancing, Cloud DNS, Cloud CDN, Pub/Sub, Cloud IAM, Cloud KMS |
| Azure | Virtual Machines, Azure Functions, AKS, Container Apps, Blob Storage, Azure SQL, Cosmos DB, Virtual Network, Application Gateway, Azure DNS, Front Door, Service Bus, Event Grid, Azure AD |

### 2. Serverless Computing

- Function-as-a-Service design patterns (Lambda, Cloud Functions, Azure Functions)
- Event-driven architectures (EventBridge, Pub/Sub, Event Grid)
- Serverless orchestration (Step Functions, Workflows, Durable Functions)
- API Gateway design (REST, WebSocket, GraphQL on serverless)
- Cold start optimization and provisioned concurrency
- Serverless cost modeling and optimization

### 3. Container Orchestration

- Kubernetes architecture and operations (EKS, GKE, AKS, self-managed)
- Docker image optimization and security scanning
- Helm chart design and management
- Service mesh (Istio, Linkerd, Consul Connect)
- Container registry management (ECR, GCR, ACR)
- Pod security standards and network policies

### 4. Infrastructure as Code

- Terraform (HCL, state management, modules, providers, workspaces)
- AWS CDK (constructs, stacks, aspects, testing)
- Pulumi (TypeScript/Python/Go providers, state, stacks)
- CloudFormation (when Terraform is not viable)
- GitOps (ArgoCD, Flux, declarative infrastructure)
- Policy as Code (OPA/Rego, Sentinel, Checkov)

### 5. Cloud Networking

- VPC design (CIDR planning, subnet strategies, routing)
- Load balancing (ALB, NLB, GLB, traffic management)
- DNS architecture (Route53, Cloud DNS, hybrid DNS)
- CDN configuration (CloudFront, Cloud CDN, Front Door)
- Transit Gateway and peering architectures
- PrivateLink / Private Service Connect
- Network security (security groups, NACLs, firewall rules)
- Hybrid connectivity (VPN, Direct Connect, Interconnect)

### 6. Reliability Engineering

- Disaster recovery planning (RTO/RPO analysis, failover strategies)
- Multi-region and multi-AZ architectures
- Backup and restore strategies
- Observability (metrics, logs, traces with OpenTelemetry)
- SLO/SLI/SLA definition and error budget management
- Chaos engineering (Chaos Monkey, Litmus, Gremlin)
- Incident management and blameless postmortems

### 7. Cost Management

- FinOps framework implementation
- Reserved Instance and Savings Plan optimization
- Spot Instance strategies (interruption handling, diversification)
- Right-sizing analysis (compute, storage, database)
- Data transfer cost optimization
- Cost allocation and tagging strategies
- Budget alerts and anomaly detection

### 8. Cloud Security

- IAM architecture (least privilege, role design, federation)
- Encryption (KMS, CMK, envelope encryption, TLS)
- Network security (WAF, Shield, DDoS protection)
- Compliance (SOC2, HIPAA, FedRAMP, GDPR mapping)
- Cloud Security Posture Management (CSPM)
- Security audit and logging (CloudTrail, VPC Flow Logs)

---

## Out of Scope

The following domains are NOT within the Cloud Brain's authority. Delegate to the appropriate brain.

### Application Code (Engineering Brain)

```
OUT OF SCOPE:
- Business logic implementation
- Application framework choices (React, Django, etc.)
- Database schema design (beyond provisioning)
- API endpoint implementation (beyond API Gateway config)
- Unit and integration test code
- Frontend/backend application architecture

DELEGATE TO: /prototype_x1000/engineering_brain/
```

### UI/UX Design (Design Brain)

```
OUT OF SCOPE:
- Monitoring dashboard visual design
- Admin console user experience
- Alert notification UX
- Infrastructure visualization aesthetics

DELEGATE TO: /prototype_x1000/design_brain/
```

### Business Strategy (MBA Brain)

```
OUT OF SCOPE:
- Build vs. buy decisions (beyond technical feasibility)
- Vendor contract negotiation strategy
- Organizational cloud adoption strategy
- Cloud team hiring and structure

DELEGATE TO: /prototype_x1000/mba_brain/
```

### Physical Infrastructure

```
OUT OF SCOPE:
- On-premises data center design
- Physical network cabling
- Hardware procurement
- Physical security

NOTE: Hybrid cloud connectivity IS in scope.
```

---

## Boundary Interfaces

Where the Cloud Brain's scope meets another brain's scope, clear interfaces exist.

### Cloud Brain <-> Engineering Brain Interface

```
┌─────────────────────┐     ┌─────────────────────┐
│    CLOUD BRAIN       │     │  ENGINEERING BRAIN    │
│                      │     │                       │
│  Infrastructure      │────>│  Application code     │
│  Container config    │     │  Business logic       │
│  Database provisioning│────>│  Schema design        │
│  API Gateway config  │     │  API implementation   │
│  CI/CD infrastructure│────>│  CI/CD pipeline logic  │
│  Monitoring infra    │     │  Application metrics   │
│                      │<────│  Resource requirements │
│                      │     │  Performance needs     │
└─────────────────────┘     └─────────────────────┘
```

**Rule:** Cloud Brain provisions and configures infrastructure. Engineering Brain writes and deploys application code that runs on it.

### Cloud Brain <-> Security Brain Interface

```
┌─────────────────────┐     ┌─────────────────────┐
│    CLOUD BRAIN       │     │   SECURITY BRAIN      │
│                      │     │                       │
│  IAM policies        │────>│  Threat modeling       │
│  Network security    │     │  Penetration testing   │
│  Encryption config   │────>│  Vulnerability mgmt    │
│  Compliance mapping  │     │  Incident response     │
│  CSPM configuration  │     │  Security operations   │
│                      │<────│  Security requirements │
│                      │     │  Threat intelligence   │
└─────────────────────┘     └─────────────────────┘
```

**Rule:** Cloud Brain implements security controls in cloud infrastructure. Security Brain defines threat models, performs testing, and manages incident response.

---

## Escalation Paths

| Situation | Escalation |
|-----------|------------|
| Architecture requires application code changes | Escalate to Engineering Brain |
| Cost exceeds budget by >20% | Escalate to MBA Brain |
| Security vulnerability found in cloud config | Escalate to Security Brain (if available) |
| Design needed for monitoring UI | Escalate to Design Brain |
| Multi-brain coordination needed | Escalate to CEO Brain (when available) |

---

## Versioning

This scope document applies to Cloud Brain v1.0. As additional brains come online (Security Brain, Data Brain, etc.), boundary interfaces will be refined to avoid overlap and ensure clear ownership.

---

**When in doubt about scope: if it runs in the cloud or provisions cloud resources, the Cloud Brain owns it. If it is application logic that runs ON the cloud, the Engineering Brain owns it.**

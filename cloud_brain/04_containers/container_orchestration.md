# Container Orchestration — ECS, EKS, GKE, Service Mesh, and GitOps

## Overview

Container orchestration platforms manage the lifecycle, scaling, networking, and scheduling of containerized workloads across clusters of machines. While Kubernetes is the dominant open-source standard, cloud providers offer managed Kubernetes services (EKS, GKE, AKS) and alternative orchestrators (ECS, Fargate) that abstract away cluster management complexity. This module codifies managed container services, the decision framework for choosing between them, service mesh architecture with Istio and Linkerd, and GitOps deployment practices with ArgoCD and Flux.

The orchestration axiom: the orchestrator you can operate is better than the orchestrator with more features. Operational maturity determines the right choice, not feature comparison.

---

## AWS ECS — Elastic Container Service

### ECS Architecture

```
┌──────────────────────────────────────────────────────┐
│                    ECS Cluster                         │
│                                                        │
│  ┌─────────────────┐    ┌─────────────────┐          │
│  │   ECS Service    │    │   ECS Service    │          │
│  │  (order-svc)     │    │  (payment-svc)   │          │
│  │  Desired: 3      │    │  Desired: 2      │          │
│  └────────┬────────┘    └────────┬────────┘          │
│           │                       │                    │
│  ┌────────▼────────────────────▼────────┐             │
│  │         Task Definitions              │             │
│  │  (container images, CPU, memory,      │             │
│  │   networking, IAM roles, logging)     │             │
│  └───────────────────────────────────────┘             │
│                                                        │
│  Launch Type: EC2 instances OR Fargate (serverless)    │
└──────────────────────────────────────────────────────┘
```

### ECS vs EKS Decision Framework

| Factor | ECS | EKS |
|--------|-----|-----|
| Complexity | Simple (AWS-native concepts) | Complex (full Kubernetes API) |
| Learning curve | Low (familiar AWS concepts) | High (Kubernetes ecosystem) |
| Ecosystem | AWS-integrated | Massive K8s ecosystem |
| Portability | AWS-locked | Multi-cloud portable |
| Customization | Limited to ECS features | Full Kubernetes extensibility |
| Operational overhead | Low (fully managed) | Medium (managed control plane, self-managed nodes/addons) |
| Best for | AWS-focused teams, simpler workloads | Multi-cloud, complex workloads, K8s expertise |
| Cost | No control plane cost | $0.10/hr per cluster (~$73/month) |

### AWS Fargate — Serverless Containers

Fargate removes the need to manage EC2 instances entirely. You define CPU and memory per task; AWS handles the infrastructure.

**Fargate vs EC2 Launch Type:**

| Factor | Fargate | EC2 |
|--------|---------|-----|
| Server management | None | You manage instances |
| Scaling | Per-task scaling | Node + task scaling |
| Cost | ~20-30% premium per vCPU-hour | Lower per-unit but includes idle capacity |
| Startup time | 30-60 seconds | Seconds (if node capacity exists) |
| GPU support | No | Yes |
| Persistent storage | EFS only | EBS + EFS |
| Best for | Variable workloads, small teams, security-sensitive | Stable workloads, GPU, high-performance |

---

## Managed Kubernetes Services

### EKS (Elastic Kubernetes Service)

**Architecture:** Managed control plane (API server, etcd, scheduler, controller manager) + customer-managed or Fargate worker nodes.

**EKS Add-ons (Managed):**
| Add-on | Purpose |
|--------|---------|
| CoreDNS | Cluster DNS resolution |
| kube-proxy | Network proxy |
| VPC CNI | Pod networking with VPC IP addresses |
| EBS CSI Driver | EBS persistent volumes |
| EFS CSI Driver | EFS persistent volumes |
| AWS Load Balancer Controller | ALB/NLB Ingress integration |

**EKS Best Practices:**
- Use managed node groups for simplified node lifecycle management
- Enable cluster autoscaler or Karpenter for node autoscaling
- Use IRSA (IAM Roles for Service Accounts) for fine-grained IAM
- Enable envelope encryption for Kubernetes secrets
- Use Pod Security Standards (restricted level for production)
- Enable audit logging to CloudTrail

### GKE (Google Kubernetes Engine)

**Advantages over other managed K8s:**
- Autopilot mode: Fully managed nodes (Google manages node pools, scaling, security)
- Fastest Kubernetes version adoption (often first to support new K8s versions)
- Native integration with Google Cloud services
- Multi-cluster management with GKE Enterprise (formerly Anthos)
- Binary Authorization for supply chain security

### AKS (Azure Kubernetes Service)

**Key features:**
- Free control plane (no cluster management fee)
- Azure Active Directory integration for RBAC
- Azure Container Registry integration
- Azure Monitor integration for observability
- Virtual nodes (ACI) for burstable compute

---

## Service Mesh — Istio and Linkerd

### Service Mesh Architecture

A service mesh provides infrastructure-layer networking for service-to-service communication:

```
┌─────────────────────────────────────────────────┐
│                   Data Plane                      │
│                                                   │
│  ┌──────────────┐      ┌──────────────┐          │
│  │  Service A    │      │  Service B    │          │
│  │  ┌─────────┐ │      │  ┌─────────┐ │          │
│  │  │  App    │ │      │  │  App    │ │          │
│  │  │Container│ │      │  │Container│ │          │
│  │  └────┬────┘ │      │  └────┬────┘ │          │
│  │  ┌────▼────┐ │      │  ┌────▼────┐ │          │
│  │  │  Envoy  │─┼──────┼──│  Envoy  │ │          │
│  │  │ (proxy) │ │ mTLS │  │ (proxy) │ │          │
│  │  └─────────┘ │      │  └─────────┘ │          │
│  └──────────────┘      └──────────────┘          │
│                                                   │
├───────────────────────────────────────────────────┤
│                 Control Plane                      │
│  ┌──────────┐  ┌───────────┐  ┌───────────────┐ │
│  │  Istiod   │  │  Traffic  │  │  Observability│ │
│  │ (config,  │  │  Management│  │  (metrics,    │ │
│  │  certs)   │  │  (routing) │  │   traces)     │ │
│  └──────────┘  └───────────┘  └───────────────┘ │
└───────────────────────────────────────────────────┘
```

### Istio vs Linkerd

| Feature | Istio | Linkerd |
|---------|-------|---------|
| Proxy | Envoy (feature-rich, complex) | linkerd2-proxy (Rust, lightweight) |
| Resource overhead | Higher (~50-100MB per sidecar) | Lower (~10-20MB per sidecar) |
| Feature set | Comprehensive (traffic, security, observability, policy) | Focused (core mesh features, simpler) |
| Complexity | High (many CRDs, configuration options) | Low (opinionated, fewer knobs) |
| mTLS | Yes (automatic) | Yes (automatic, on by default) |
| Traffic management | Advanced (fault injection, mirroring, weighted routing) | Basic (traffic splitting, retries) |
| Multi-cluster | Yes (complex setup) | Yes (simpler setup) |
| Best for | Teams needing advanced traffic management | Teams wanting simplicity and low overhead |

### When to Use a Service Mesh

**Use a service mesh when:**
- You have >10 microservices communicating over the network
- You need mTLS between all services (zero trust networking)
- You need advanced traffic management (canary deployments, A/B testing, fault injection)
- You need consistent observability across all services (without instrumenting each service)
- Compliance requires encrypted service-to-service communication

**Do not use a service mesh when:**
- You have <5 services (overhead exceeds benefit)
- Your team lacks Kubernetes operational expertise
- Simple load balancing meets your needs
- Performance requirements cannot tolerate proxy latency (~1-3ms per hop)

---

## GitOps — ArgoCD and Flux

### GitOps Principles

1. **Declarative:** The entire desired system state is described declaratively
2. **Versioned and Immutable:** Git is the single source of truth; all changes are versioned
3. **Pulled Automatically:** Software agents continuously monitor Git and apply changes
4. **Continuously Reconciled:** Agents detect drift and correct it automatically

### ArgoCD Architecture

```
┌──────────┐     ┌──────────────┐     ┌─────────────────┐
│   Git     │────→│   ArgoCD     │────→│  Kubernetes     │
│   Repo    │     │  Controller  │     │  Cluster        │
│           │←────│              │←────│                 │
│ (desired) │ sync│ (reconcile)  │drift│ (actual state)  │
└──────────┘     └──────────────┘     └─────────────────┘
```

**ArgoCD Application:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service
  namespace: argocd
spec:
  project: production
  source:
    repoURL: https://github.com/org/k8s-manifests.git
    targetRevision: main
    path: production/order-service
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true       # Delete resources removed from Git
      selfHeal: true    # Correct drift from desired state
    syncOptions:
      - CreateNamespace=true
```

### Flux v2 Architecture

Flux takes a toolkit approach with specialized controllers:

| Controller | Purpose |
|-----------|---------|
| Source Controller | Watches Git repos and Helm repos for changes |
| Kustomize Controller | Applies Kustomize configurations from Git |
| Helm Controller | Manages Helm releases from Git-declared HelmRelease resources |
| Notification Controller | Handles alerts and notifications (Slack, Teams, webhooks) |
| Image Automation | Watches container registries, updates Git with new image tags |

### ArgoCD vs Flux

| Factor | ArgoCD | Flux |
|--------|--------|------|
| UI | Rich web UI, visualization | CLI-focused, Weave GitOps UI (separate) |
| Architecture | Monolithic application | Toolkit of specialized controllers |
| Multi-cluster | ApplicationSets, centralized management | Multi-tenancy per cluster |
| Helm support | Native | Via Helm Controller |
| RBAC | Built-in, project-based | Kubernetes native RBAC |
| Learning curve | Moderate (UI helps) | Steeper (more concepts) |
| Best for | Teams wanting visual management | Teams wanting composable toolkit |

### GitOps Repository Structure

```
k8s-manifests/
├── base/                    # Shared base configurations
│   ├── order-service/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   └── payment-service/
├── overlays/               # Environment-specific overrides
│   ├── staging/
│   │   ├── order-service/
│   │   │   ├── kustomization.yaml   # Patches for staging
│   │   │   └── replica-patch.yaml
│   │   └── kustomization.yaml
│   └── production/
│       ├── order-service/
│       │   ├── kustomization.yaml   # Patches for production
│       │   ├── replica-patch.yaml
│       │   └── hpa.yaml
│       └── kustomization.yaml
└── infrastructure/         # Cluster infrastructure
    ├── cert-manager/
    ├── ingress-nginx/
    └── monitoring/
```

---

## Deployment Strategies with Orchestrators

| Strategy | Description | Risk | Rollback Speed |
|----------|-------------|------|---------------|
| Rolling Update | Replace pods incrementally | Low (gradual) | Moderate (re-deploy previous) |
| Blue-Green | Run two full environments, switch traffic | Very low (instant rollback) | Instant (switch back) |
| Canary | Route small % of traffic to new version | Very low (limited blast radius) | Fast (shift traffic back) |
| A/B Testing | Route traffic based on user attributes | Low (controlled) | Fast (remove routing rule) |

---

## Cross-References

- `04_containers/container_fundamentals.md` — Docker image building
- `04_containers/kubernetes.md` — Kubernetes deep dive
- `06_reliability/high_availability.md` — HA architecture with orchestrators
- `05_infrastructure_as_code/platform_engineering.md` — Platform engineering with K8s
- `Patterns/microservices_deployment_pattern.md` — Deployment patterns

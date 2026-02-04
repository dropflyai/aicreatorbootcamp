# Kubernetes — Architecture, Workloads, Networking, Security, and Ecosystem

## Overview

Kubernetes (K8s) is the dominant container orchestration platform, managing containerized workloads at scale across clusters of machines. Originally developed by Google and based on lessons from Borg and Omega, Kubernetes provides declarative configuration, self-healing, horizontal scaling, service discovery, and rolling deployments. This module codifies Kubernetes architecture, core workload types, networking, autoscaling, RBAC, network policies, Helm charts, and the operator pattern.

The Kubernetes axiom: Kubernetes manages desired state. You declare what you want; Kubernetes continuously reconciles actual state toward desired state. Understanding this reconciliation model is fundamental to everything in Kubernetes.

---

## Kubernetes Architecture

### Control Plane Components

```
┌─────────────────────────────── Control Plane ──────────────────────────────┐
│                                                                              │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐  ┌────────────┐ │
│  │  API Server   │  │   Scheduler    │  │ Controller Mgr │  │   etcd     │ │
│  │ (kube-apiserver│  │ (kube-scheduler│  │(kube-controller│  │ (cluster   │ │
│  │  REST API,     │  │  pod placement │  │ -manager)      │  │  state     │ │
│  │  auth, admission│ │  decisions)    │  │ reconciliation │  │  store)    │ │
│  │  control)      │  │               │  │ loops)         │  │            │ │
│  └──────────────┘  └────────────────┘  └────────────────┘  └────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────── Worker Node ──────────────────────────────┐
│                                                                              │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐                  │
│  │   kubelet     │  │  kube-proxy    │  │ Container      │                  │
│  │ (node agent,  │  │ (network proxy,│  │ Runtime        │                  │
│  │  pod lifecycle│  │  service routing│  │ (containerd,   │                  │
│  │  management)  │  │  iptables/IPVS)│  │  CRI-O)        │                  │
│  └──────────────┘  └────────────────┘  └────────────────┘                  │
│                                                                              │
│  ┌─── Pod ──────────────┐  ┌─── Pod ──────────────┐                        │
│  │ ┌─────────┐ ┌──────┐ │  │ ┌─────────┐          │                        │
│  │ │Container│ │Sidecar│ │  │ │Container│          │                        │
│  │ └─────────┘ └──────┘ │  │ └─────────┘          │                        │
│  └──────────────────────┘  └──────────────────────┘                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Core Concepts

| Concept | Description |
|---------|-------------|
| Pod | Smallest deployable unit; one or more containers sharing network/storage |
| Deployment | Manages ReplicaSets; provides declarative updates, rolling deployments, rollback |
| Service | Stable network endpoint for a set of Pods; load balancing, service discovery |
| Ingress | HTTP/HTTPS routing from external traffic to Services |
| ConfigMap | Non-sensitive configuration data injected into Pods |
| Secret | Sensitive configuration (tokens, passwords) — base64 encoded, use external secrets for production |
| Namespace | Logical isolation within a cluster; resource quotas, RBAC scoping |
| PersistentVolumeClaim | Request for persistent storage (EBS, EFS, Ceph) |

---

## Workloads — Deployments, Services, and Ingress

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
    version: v1.2.3
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: order-service
        version: v1.2.3
    spec:
      serviceAccountName: order-service
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      containers:
        - name: order-service
          image: 123456789.dkr.ecr.us-east-1.amazonaws.com/order-service:a1b2c3d
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: 250m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: order-service-secrets
                  key: database-url
```

### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: production
spec:
  type: ClusterIP  # Internal only; use LoadBalancer or Ingress for external
  selector:
    app: order-service
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
```

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts: [api.example.com]
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api/orders
            pathType: Prefix
            backend:
              service:
                name: order-service
                port:
                  number: 80
```

---

## Autoscaling — HPA and VPA

### Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    - type: Pods
      pods:
        metric:
          name: requests_per_second
        target:
          type: AverageValue
          averageValue: "100"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5 min before scaling down
      policies:
        - type: Percent
          value: 25
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 30
      policies:
        - type: Percent
          value: 100
          periodSeconds: 60
```

### Vertical Pod Autoscaler (VPA)

VPA adjusts resource requests/limits based on actual usage:
- **Recommendation mode:** Suggests optimal resource values (safe for production)
- **Auto mode:** Automatically adjusts resources (requires pod restarts)

**Use VPA when:** Resource requirements are unknown or change over time. Start with VPA in recommendation mode to determine appropriate resource requests, then set HPA for scaling.

**Do not use VPA and HPA together on the same metric** (CPU). Use VPA for memory, HPA for CPU, or use HPA alone with custom metrics.

---

## RBAC — Role-Based Access Control

### RBAC Components

```yaml
# ServiceAccount — identity for pods
apiVersion: v1
kind: ServiceAccount
metadata:
  name: order-service
  namespace: production

# Role — defines permissions within a namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: order-service-role
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["configmaps", "secrets"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]

# RoleBinding — binds Role to ServiceAccount
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: order-service-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: order-service
    namespace: production
roleRef:
  kind: Role
  name: order-service-role
  apiGroup: rbac.authorization.k8s.io
```

### RBAC Best Practices

- Every workload gets its own ServiceAccount (never use `default`)
- Use Roles (namespace-scoped), not ClusterRoles (cluster-wide) unless necessary
- Grant minimum required permissions (principle of least privilege)
- Audit RBAC permissions regularly
- Use tools like `kubectl auth can-i` and `rbac-lookup` to verify permissions

---

## Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: order-service-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: order-service
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - port: 3000
          protocol: TCP
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: postgres
      ports:
        - port: 5432
          protocol: TCP
    - to:  # Allow DNS resolution
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - port: 53
          protocol: UDP
```

**Default deny all:** Start with a default deny policy, then explicitly allow required traffic. This is the zero-trust approach applied to Kubernetes networking.

---

## Helm — Package Management

### Helm Chart Structure

```
order-service/
├── Chart.yaml           # Chart metadata (name, version, dependencies)
├── values.yaml          # Default configuration values
├── values-staging.yaml  # Environment-specific overrides
├── values-production.yaml
├── templates/
│   ├── deployment.yaml  # Deployment template with {{ .Values.* }}
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── hpa.yaml
│   ├── networkpolicy.yaml
│   ├── serviceaccount.yaml
│   └── _helpers.tpl     # Template helper functions
└── tests/
    └── test-connection.yaml
```

### Helm Best Practices

- Pin chart versions in `Chart.lock`
- Use `helm diff` before `helm upgrade` to preview changes
- Store values files in version control alongside application code
- Use Helmfile or ArgoCD for managing multiple charts
- Test charts with `helm template` and `helm test`

---

## Operators — Custom Controllers

The Operator pattern extends Kubernetes with domain-specific automation. An Operator is a custom controller that manages a custom resource, encoding operational knowledge as code.

**Use cases:**
- Database operators (PostgreSQL, MySQL, MongoDB) — automated backup, failover, scaling
- Certificate management (cert-manager) — automated TLS certificate issuance and renewal
- Monitoring operators (Prometheus Operator) — automated monitoring configuration
- Custom application lifecycle management

**Building operators:**
- Operator SDK (Go, Ansible, Helm)
- Kubebuilder (Go)
- KUDO (declarative operators)

---

## Cross-References

- `04_containers/container_fundamentals.md` — Docker image building
- `04_containers/container_orchestration.md` — Managed K8s services
- `06_reliability/high_availability.md` — HA with Kubernetes
- `08_security/cloud_iam.md` — K8s service account IAM integration
- `05_infrastructure_as_code/iac_fundamentals.md` — IaC for K8s clusters

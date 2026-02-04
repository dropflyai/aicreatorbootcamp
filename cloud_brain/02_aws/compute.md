# AWS Compute Services

## Overview

AWS offers a compute continuum from bare metal to fully managed serverless. This module covers EC2, Lambda, ECS, EKS, and Fargate -- the five compute primitives that form the backbone of most AWS architectures. The architect's primary decision is selecting the right abstraction level for each workload.

---

## 1. Compute Abstraction Spectrum

```
┌─────────────────────────────────────────────────────────────────┐
│              AWS COMPUTE ABSTRACTION SPECTRUM                     │
│                                                                   │
│  More Control ──────────────────────────────> Less Control        │
│  More Responsibility ──────────────────────> Less Responsibility  │
│                                                                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌────────┐  ┌────────┐          │
│  │ EC2  │  │ ECS  │  │ EKS  │  │Fargate │  │ Lambda │          │
│  │      │  │(EC2) │  │(EC2) │  │        │  │        │          │
│  │Bare  │  │Cont. │  │ K8s  │  │Srvless │  │ FaaS   │          │
│  │Metal │  │on EC2│  │on EC2│  │ Cont.  │  │        │          │
│  └──────┘  └──────┘  └──────┘  └────────┘  └────────┘          │
│                                                                   │
│  You manage:                                                      │
│  EC2:     OS, runtime, app, scaling, patching                    │
│  ECS/EC2: Container runtime, cluster capacity, AMI patching      │
│  EKS/EC2: K8s nodes, kubelet, container runtime, AMI patching    │
│  Fargate: Container image, resource allocation (CPU/mem)         │
│  Lambda:  Function code, memory allocation                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. EC2 (Elastic Compute Cloud)

### Instance Type Taxonomy

AWS instance types follow the pattern: `[family][generation].[size]`

```
Example: m7g.2xlarge
         │││  │
         ││└── generation (7th)
         │└─── processor (g = Graviton)
         └──── family (m = general purpose)

Size progression:
nano → micro → small → medium → large → xlarge → 2xl → ... → metal
```

### Instance Family Decision Matrix

| Family | Optimized For | vCPU:Memory Ratio | Use Cases |
|--------|---------------|-------------------|-----------|
| **M** (General) | Balanced | 1:4 | Web servers, app servers, microservices |
| **C** (Compute) | CPU | 1:2 | Batch processing, ML inference, gaming |
| **R** (Memory) | Memory | 1:8 | Databases, in-memory caches, analytics |
| **I** (Storage) | NVMe SSD | 1:8 + local NVMe | Databases requiring high IOPS |
| **G/P** (Accelerated) | GPU | Varies | ML training, graphics, HPC |
| **T** (Burstable) | Variable CPU | 1:4 (burst) | Dev/test, low-traffic websites |
| **Hpc** (HPC) | Network/compute | 1:2 | Tightly-coupled HPC workloads |

### Graviton (ARM) vs Intel/AMD Decision

```
┌──────────────────────────────────────────────────────────────┐
│                GRAVITON DECISION GUIDE                         │
│                                                              │
│  Default choice: Graviton (m7g, c7g, r7g)                   │
│  - 40% better price-performance than x86 equivalents        │
│  - Lower energy consumption                                  │
│  - Native ARM support in most languages and frameworks       │
│                                                              │
│  Choose x86 ONLY when:                                       │
│  ├── Application has x86-only binary dependencies            │
│  ├── Requires specific Intel/AMD instructions (AVX-512)      │
│  ├── Vendor-licensed software requires x86                   │
│  ├── Windows workloads (limited Graviton Windows support)    │
│  └── GPU workloads (GPU instances are x86)                   │
│                                                              │
│  Validation: Test on Graviton in staging before production   │
│  Common issues: Docker multi-arch builds, JNI native libs    │
└──────────────────────────────────────────────────────────────┘
```

### EC2 Purchasing Options

| Option | Discount | Commitment | Best For |
|--------|----------|-----------|----------|
| **On-Demand** | 0% | None | Unpredictable, short-term workloads |
| **Reserved (1yr)** | ~40% | 1-year, all/partial/no upfront | Steady-state production workloads |
| **Reserved (3yr)** | ~60% | 3-year | Stable, long-running production |
| **Savings Plans** | ~40-60% | $/hr commitment | Flexible across instance families |
| **Spot** | Up to 90% | None (can be reclaimed) | Fault-tolerant batch, CI/CD, testing |
| **Dedicated Host** | Varies | On-demand or reserved | Licensing (per-socket), compliance |

### Auto Scaling Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   AUTO SCALING ARCHITECTURE                    │
│                                                              │
│  CloudWatch Alarm                                            │
│  (CPU > 70% for 5 min)                                      │
│       │                                                      │
│       v                                                      │
│  Auto Scaling Group                                          │
│  ├── Min: 2 (minimum availability)                           │
│  ├── Desired: 4 (current target)                             │
│  ├── Max: 20 (cost ceiling)                                  │
│  │                                                           │
│  ├── Scaling Policies:                                       │
│  │   ├── Target Tracking: CPU at 60% (PREFERRED)             │
│  │   ├── Step Scaling: CPU > 80% add 4, > 90% add 8         │
│  │   └── Scheduled: scale to 10 at 9AM EST weekdays         │
│  │                                                           │
│  ├── Launch Template:                                        │
│  │   ├── AMI: ami-xxx (hardened, patched)                    │
│  │   ├── Instance types: [m7g.xlarge, m6g.xlarge, m7i.xl]   │
│  │   ├── Spot allocation: capacity-optimized                 │
│  │   └── User data: bootstrap script                         │
│  │                                                           │
│  └── Health Check:                                           │
│      ├── EC2 (instance-level, default)                       │
│      └── ELB (application-level, RECOMMENDED)                │
│                                                              │
│  Cooldown: 300s (prevent thrashing)                          │
│  Warm-up: 120s (exclude from metrics until ready)            │
└──────────────────────────────────────────────────────────────┘
```

### Predictive Scaling

AWS predictive scaling uses ML to analyze historical patterns and pre-scale before demand arrives:

```
Traffic Pattern:
  Mon-Fri 9AM:    +300% traffic
  Weekends:       -50% baseline
  Month-end:      +200% (billing runs)

Without predictive scaling:
  9:00 AM → Traffic spikes → CloudWatch alarm → 5 min delay → scale up
  9:00-9:07 AM → degraded performance during scaling lag

With predictive scaling:
  8:55 AM → Instances pre-launched based on ML forecast
  9:00 AM → Capacity ready for traffic spike
  Zero performance degradation
```

---

## 3. Lambda

### Lambda Execution Model

```
┌──────────────────────────────────────────────────────────────┐
│                    LAMBDA EXECUTION MODEL                      │
│                                                              │
│  Invocation Request                                          │
│       │                                                      │
│       ├── Execution environment exists? (warm)               │
│       │   ├── YES → Invoke function (hot path: ~1ms)         │
│       │   └── NO  → Cold start:                              │
│       │             1. Download code (from S3/ECR)            │
│       │             2. Create execution environment           │
│       │             3. Initialize runtime (Node, Python, etc.)│
│       │             4. Run initialization code (outside handler)│
│       │             5. Invoke function handler                │
│       │             Total cold start: 100ms-10s              │
│       │                                                      │
│  Execution Environment Lifecycle:                            │
│  ┌──────┐   ┌──────┐   ┌──────────┐   ┌────────┐           │
│  │ INIT  │──>│INVOKE│──>│IDLE(wait)│──>│SHUTDOWN│           │
│  │(cold) │   │(warm)│   │ (frozen) │   │(reclaim)│          │
│  └──────┘   └──┬───┘   └────┬─────┘   └────────┘           │
│                 │            │                                │
│                 └────────────┘ (reuse for next invocation)   │
│                                                              │
│  Frozen: CPU halted, memory preserved, billed at 0           │
│  Reclaimed: after ~5-15 min of inactivity (not guaranteed)  │
└──────────────────────────────────────────────────────────────┘
```

### Cold Start Optimization Strategies

| Strategy | Cold Start Reduction | Cost Impact | Complexity |
|----------|---------------------|-------------|------------|
| **Provisioned Concurrency** | Eliminates (pre-warm) | High ($$$) | Low |
| **SnapStart (Java)** | 90% reduction | None | Low |
| **Smaller deployment package** | 10-30% | None | Medium |
| **Avoid VPC (if possible)** | Minimal (since 2019 improvement) | None | Low |
| **Use ARM (Graviton)** | 10-20% faster init | 20% cheaper | Low |
| **Keep dependencies minimal** | 20-50% | None | Medium |
| **Use container images wisely** | Varies (up to 10GB, cached) | None | Medium |

### Lambda Limits and Workarounds

| Limit | Value | Workaround |
|-------|-------|-----------|
| Memory | 128MB - 10,240MB | CPU scales linearly with memory |
| Timeout | 15 minutes max | Use Step Functions for longer workflows |
| Payload (sync) | 6MB request/response | Use S3 for large payloads |
| Payload (async) | 256KB event | Put data in S3, pass reference |
| Concurrent executions | 1000 (default, soft) | Request increase, or use reserved concurrency |
| Deployment package | 50MB zipped, 250MB unzipped | Use container images (up to 10GB) |
| /tmp storage | 512MB (default), up to 10GB | Use EFS for larger storage needs |
| Environment variables | 4KB total | Use SSM Parameter Store for large configs |

---

## 4. ECS (Elastic Container Service)

### ECS Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      ECS ARCHITECTURE                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                    ECS CLUSTER                        │    │
│  │                                                       │    │
│  │  ┌─────────────┐     ┌─────────────┐                │    │
│  │  │   SERVICE    │     │   SERVICE    │                │    │
│  │  │  (web-api)   │     │  (worker)    │                │    │
│  │  │  desired: 3  │     │  desired: 2  │                │    │
│  │  └──────┬──────┘     └──────┬──────┘                │    │
│  │         │                    │                        │    │
│  │  ┌──────┴──────────────────┴──────┐                 │    │
│  │  │           TASKS                  │                 │    │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐    │                 │    │
│  │  │  │Task 1│ │Task 2│ │Task 3│    │  web-api        │    │
│  │  │  │(AZ-a)│ │(AZ-b)│ │(AZ-a)│    │                 │    │
│  │  │  └──────┘ └──────┘ └──────┘    │                 │    │
│  │  │  ┌──────┐ ┌──────┐             │                 │    │
│  │  │  │Task 4│ │Task 5│             │  worker          │    │
│  │  │  │(AZ-a)│ │(AZ-b)│             │                 │    │
│  │  │  └──────┘ └──────┘             │                 │    │
│  │  └────────────────────────────────┘                 │    │
│  │                                                       │    │
│  │  Launch Type: EC2 or FARGATE                         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  Task Definition (blueprint):                                │
│  ├── Container image(s)                                      │
│  ├── CPU/Memory requirements                                 │
│  ├── Port mappings                                           │
│  ├── Environment variables / secrets                         │
│  ├── IAM task role (what the container can access)           │
│  ├── IAM execution role (what ECS needs to launch it)        │
│  ├── Log configuration (CloudWatch, Firelens)                │
│  └── Health check command                                    │
└──────────────────────────────────────────────────────────────┘
```

### ECS on EC2 vs Fargate Decision

| Factor | ECS on EC2 | Fargate |
|--------|-----------|---------|
| **Cost at scale** | Cheaper (Reserved/Spot instances) | More expensive per vCPU-hour |
| **Cost at small scale** | Wasted capacity on small clusters | Pay per task, no waste |
| **GPU workloads** | Supported | Not supported |
| **Windows containers** | Supported | Supported (limited) |
| **Operational overhead** | High (AMI patching, cluster capacity) | Low (fully managed) |
| **Startup time** | Fast (if capacity available) | 30-60s (pull image, provision) |
| **Spot support** | Full (EC2 Spot) | Fargate Spot (limited) |
| **daemonsets/sidecars** | Supported | Limited (ECS Service Connect) |
| **Max resources per task** | Instance-limited | 16 vCPU, 120 GB memory |

**Default recommendation:** Start with Fargate. Move to EC2 when cost optimization or GPU workloads require it.

---

## 5. EKS (Elastic Kubernetes Service)

### EKS Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      EKS ARCHITECTURE                         │
│                                                              │
│  ┌──────────────────────────────────────┐  AWS Managed       │
│  │         EKS CONTROL PLANE            │                    │
│  │  ┌──────────┐  ┌──────────┐         │                    │
│  │  │API Server│  │  etcd     │         │                    │
│  │  │(HA, 3 AZ)│  │(encrypted)│         │                    │
│  │  └──────────┘  └──────────┘         │                    │
│  │  ┌──────────────────────────┐       │                    │
│  │  │Controller Manager + Sched│       │                    │
│  │  └──────────────────────────┘       │                    │
│  └──────────────────────────────────────┘                    │
│                      │                                       │
│           kubectl / API                                      │
│                      │                                       │
│  ┌──────────────────────────────────────┐  Customer Managed  │
│  │         DATA PLANE (Worker Nodes)     │                    │
│  │                                       │                    │
│  │  Option A: Managed Node Groups (EC2)  │                    │
│  │  ├── Auto-scaling, auto-patching      │                    │
│  │  ├── Spot + On-Demand mixed           │                    │
│  │  └── GPU instances supported          │                    │
│  │                                       │                    │
│  │  Option B: Fargate Profiles           │                    │
│  │  ├── Serverless pods, no nodes        │                    │
│  │  ├── Per-pod billing                  │                    │
│  │  └── Limited (no DaemonSets, etc.)    │                    │
│  │                                       │                    │
│  │  Option C: Karpenter (RECOMMENDED)    │                    │
│  │  ├── Just-in-time node provisioning   │                    │
│  │  ├── Right-sized instances per pod    │                    │
│  │  ├── Automatic Spot diversification   │                    │
│  │  └── Consolidation of underutilized  │                    │
│  └──────────────────────────────────────┘                    │
│                                                              │
│  EKS Cost: $0.10/hr for control plane + data plane costs     │
└──────────────────────────────────────────────────────────────┘
```

### ECS vs EKS Decision Framework

```
Choose ECS when:
├── Team is AWS-centric, no Kubernetes expertise
├── Simpler operational model preferred
├── Tight AWS service integration (native)
├── Smaller team (< 5 engineers on infrastructure)
└── No multi-cloud requirement

Choose EKS when:
├── Team has Kubernetes expertise
├── Multi-cloud or hybrid-cloud strategy
├── Rich ecosystem needed (Helm, operators, service mesh)
├── Complex scheduling requirements (affinity, topology)
├── Portable workloads (avoid vendor lock-in)
└── Large-scale microservices (100+ services)

Choose Fargate (with either) when:
├── Minimize operational overhead
├── Unpredictable or spiky workloads
├── Small to medium scale
└── No GPU or privileged container requirements
```

---

## 6. Compute Selection Decision Tree

```
┌──────────────────────────────────────────────────────────────┐
│              COMPUTE SELECTION DECISION TREE                   │
│                                                              │
│  Is the workload event-driven with < 15 min execution?       │
│  ├── YES → Lambda                                            │
│  └── NO                                                      │
│       ├── Does it need to run continuously?                   │
│       │   ├── YES → Container or EC2                          │
│       │   └── NO  → Lambda or Step Functions                  │
│       │                                                      │
│       ├── Is it containerized?                                │
│       │   ├── NO  → EC2 with ASG                             │
│       │   └── YES                                            │
│       │       ├── Need Kubernetes ecosystem?                  │
│       │       │   ├── YES → EKS                              │
│       │       │   └── NO  → ECS                              │
│       │       │                                              │
│       │       └── Minimize ops overhead?                      │
│       │           ├── YES → Fargate                          │
│       │           └── NO  → EC2 launch type                  │
│       │                                                      │
│       └── Need GPU?                                          │
│           ├── YES → EC2 (P/G instances) or EKS with GPU nodes│
│           └── NO  → Follow container path above              │
└──────────────────────────────────────────────────────────────┘
```

---

## References

- AWS EC2 Documentation -- Instance Types
- AWS Lambda Developer Guide
- AWS ECS Developer Guide
- AWS EKS Best Practices Guide
- AWS Well-Architected Framework -- Compute Pillar
- Karpenter Documentation (karpenter.sh)
- AWS re:Invent presentations on compute optimization

---

**This module covers the compute decision space. For networking between compute resources, see `02_aws/networking.md`. For storage attached to compute, see `02_aws/storage.md`.**

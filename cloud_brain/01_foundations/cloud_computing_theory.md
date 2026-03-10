# Cloud Computing Theory

## Theoretical Foundations

Cloud computing is the on-demand delivery of computing resources over the internet with pay-as-you-go pricing. This module establishes the theoretical underpinnings: virtualization, the shared responsibility model, and the service model taxonomy (IaaS/PaaS/SaaS/FaaS).

---

## 1. Virtualization Theory

### Hypervisor Architecture

Virtualization enables multiple operating systems to share a single physical host. The hypervisor (Virtual Machine Monitor) provides hardware abstraction.

```
┌──────────────────────────────────────────────────────────────┐
│                    TYPE 1 (BARE METAL)                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │  VM 1    │  │  VM 2    │  │  VM 3    │                   │
│  │ (Guest OS)│  │ (Guest OS)│  │ (Guest OS)│                 │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                   │
│       └──────────────┼──────────────┘                        │
│              ┌───────┴───────┐                               │
│              │  HYPERVISOR   │  (Xen, KVM, VMware ESXi)      │
│              └───────┬───────┘                               │
│              ┌───────┴───────┐                               │
│              │   HARDWARE    │                               │
│              └───────────────┘                               │
│                                                              │
│  TYPE 2 (HOSTED)                                             │
│                                                              │
│  ┌──────────┐  ┌──────────┐                                  │
│  │  VM 1    │  │  VM 2    │                                  │
│  └────┬─────┘  └────┬─────┘                                  │
│       └──────────┬───┘                                       │
│          ┌───────┴───────┐                                   │
│          │  HYPERVISOR   │  (VirtualBox, VMware Workstation)  │
│          └───────┬───────┘                                   │
│          ┌───────┴───────┐                                   │
│          │   HOST OS     │                                   │
│          └───────┬───────┘                                   │
│          ┌───────┴───────┐                                   │
│          │   HARDWARE    │                                   │
│          └───────────────┘                                   │
└──────────────────────────────────────────────────────────────┘
```

**AWS Nitro System:** AWS moved beyond traditional hypervisors with the Nitro System, which offloads virtualization functions (networking, storage, security) to dedicated hardware cards. The Nitro hypervisor is a lightweight firmware-based hypervisor providing bare-metal-like performance. This architectural shift is why AWS can offer instance types with consistent, predictable performance characteristics.

### Hardware-Assisted Virtualization

Modern CPUs provide virtualization extensions (Intel VT-x, AMD-V) that eliminate the performance overhead of software-based trap-and-emulate virtualization:

- **VT-x/AMD-V:** Hardware support for guest OS privilege isolation
- **EPT/NPT (Extended/Nested Page Tables):** Hardware MMU virtualization eliminating shadow page table overhead
- **SR-IOV (Single Root I/O Virtualization):** Direct hardware passthrough for network and storage I/O, enabling near-native performance
- **IOMMU (VT-d/AMD-Vi):** DMA remapping for secure device passthrough

### Container Virtualization vs. Hardware Virtualization

Containers represent OS-level virtualization using Linux kernel primitives:

| Mechanism | Purpose | Analogy |
|-----------|---------|---------|
| **Namespaces** | Resource isolation (PID, network, mount, user, UTS, IPC, cgroup) | Separate rooms in a building |
| **cgroups** | Resource limiting (CPU, memory, I/O, network bandwidth) | Utility meters per room |
| **Union filesystems** | Layered, copy-on-write filesystems (OverlayFS) | Transparent overlays on a base document |
| **seccomp** | System call filtering | Restricted vocabulary |
| **AppArmor/SELinux** | Mandatory access control | Security clearance levels |

**Critical distinction:** Containers share the host kernel. A kernel vulnerability affects all containers on the host. This is why AWS Firecracker (microVMs) exists -- it combines container-like speed with VM-level isolation by using a minimal VMM (Virtual Machine Monitor) with a stripped-down Linux kernel.

---

## 2. The Shared Responsibility Model

The shared responsibility model defines the security boundary between cloud provider and cloud consumer. It is the most important conceptual framework for cloud security architecture.

### AWS Shared Responsibility Model

```
┌─────────────────────────────────────────────────────────────┐
│                   CUSTOMER RESPONSIBILITY                    │
│              "Security IN the Cloud"                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Customer Data                                       │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Platform, Applications, Identity & Access Mgmt      │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Operating System, Network & Firewall Configuration  │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Client-Side Encryption  │  Server-Side Encryption   │    │
│  │  Network Traffic Protection                          │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                   AWS RESPONSIBILITY                         │
│              "Security OF the Cloud"                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Compute  │  Storage  │  Database  │  Networking     │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Hardware / AWS Global Infrastructure                │    │
│  │  Regions, Availability Zones, Edge Locations         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Responsibility Shifts by Service Model

The higher the abstraction, the more responsibility shifts to the provider:

```
Customer Responsibility ────────────────────────────────>

                    IaaS         PaaS         SaaS
                  ┌─────────┐
  Application     │ Customer │  Customer     Provider
                  ├─────────┤  ┌─────────┐
  Runtime         │ Customer │  │ Provider │  Provider
                  ├─────────┤  ├─────────┤
  OS              │ Customer │  │ Provider │  Provider
                  ├─────────┤  ├─────────┤
  Virtualization  │ Provider │  │ Provider │  Provider
                  ├─────────┤  ├─────────┤  ┌─────────┐
  Infrastructure  │ Provider │  │ Provider │  │ Provider │
                  └─────────┘  └─────────┘  └─────────┘

<──────────────────────────────────── Provider Responsibility
```

### Practical Implications by Service

| Service | Customer Manages | Provider Manages |
|---------|-----------------|-----------------|
| EC2 | OS patches, security groups, IAM, data encryption, application | Physical host, hypervisor, network fabric |
| RDS | Security groups, IAM, parameter groups, encryption keys, backups config | OS patches, DB engine patches, replication, failover |
| Lambda | Function code, IAM roles, VPC config, concurrency | Compute fleet, OS, runtime patches, scaling, HA |
| S3 | Bucket policies, ACLs, encryption config, access logging | Storage infrastructure, durability (11 9s), availability |
| DynamoDB | Table design, IAM, encryption config | Everything else (storage, compute, replication, scaling) |

---

## 3. Service Model Taxonomy

### IaaS (Infrastructure as a Service)

**Definition:** Virtualized computing resources (compute, storage, networking) provisioned on demand.

**Characteristics:**
- Consumer controls OS and everything above
- Maximum flexibility, maximum responsibility
- Pricing: per-hour/per-second compute, per-GB storage, per-GB transfer

**When to choose IaaS:**
- Legacy application lift-and-shift requiring specific OS configurations
- Workloads requiring kernel-level access or custom drivers
- Regulatory requirements mandating OS-level control
- GPU/FPGA workloads requiring specific hardware passthrough

**AWS IaaS services:** EC2, EBS, VPC, Direct Connect

### PaaS (Platform as a Service)

**Definition:** Managed platform abstracting OS and middleware. Consumer deploys application code.

**Characteristics:**
- Provider manages OS, runtime, middleware
- Reduced operational burden, reduced flexibility
- Pricing: per-request, per-compute-hour, per-GB

**When to choose PaaS:**
- Greenfield applications without OS-level requirements
- Teams prioritizing development velocity over infrastructure control
- Workloads with variable traffic patterns (auto-scaling built in)

**AWS PaaS services:** Elastic Beanstalk, App Runner, Lightsail

### FaaS (Function as a Service) -- The Serverless Extreme

**Definition:** Event-driven compute where the unit of deployment is a single function.

**Characteristics:**
- Scale to zero (no cost when idle)
- Provider manages everything below the function
- Millisecond billing granularity
- Stateless by design (state externalized to DynamoDB, S3, etc.)

**Execution model:**
```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌────────┐
│  Event   │────>│  Runtime  │────>│ Function │────>│ Output  │
│  Source   │     │ Bootstrap │     │  Code    │     │         │
└─────────┘     └──────────┘     └─────────┘     └────────┘
    │                │                │                │
    │           Cold start        Execution        Response
    │          (100-500ms)       (user code)       (to caller)
    │                                                  │
    │  Event sources: API Gateway, S3, SQS, SNS,      │
    │  DynamoDB Streams, Kinesis, EventBridge,         │
    │  CloudWatch Events, IoT, Cognito                 │
    └──────────────────────────────────────────────────┘
```

**When to choose FaaS:**
- Event-driven workloads (file processing, webhooks, cron jobs)
- APIs with unpredictable traffic (scale to zero saves cost)
- Microservices with simple, bounded logic
- Glue code between AWS services

### SaaS (Software as a Service)

**Definition:** Fully managed software delivered over the network. Consumer configures; provider manages everything.

**Cloud Brain relevance:** SaaS services are consumed, not architected. The Cloud Brain's concern with SaaS is:
- Integration architecture (API connectivity, data flow)
- Vendor evaluation (SLA, security posture, data residency)
- Cost management (license optimization)

---

## 4. Cloud-Native Architecture Principles

The Cloud Native Computing Foundation (CNCF) defines cloud-native as systems that are:

1. **Container-packaged** -- Applications in containers for reproducibility
2. **Dynamically managed** -- Orchestrated by a central scheduler (Kubernetes)
3. **Microservices-oriented** -- Loosely coupled, independently deployable

### The Twelve-Factor App (Heroku, 2011)

The foundational methodology for cloud-native applications:

| Factor | Description | Cloud Implementation |
|--------|-------------|---------------------|
| I. Codebase | One codebase, many deploys | Git + CI/CD |
| II. Dependencies | Explicitly declare and isolate | Package managers, containers |
| III. Config | Store config in environment | SSM Parameter Store, Secrets Manager |
| IV. Backing services | Treat as attached resources | RDS, DynamoDB, S3 as URLs |
| V. Build, release, run | Strictly separate stages | CI/CD pipelines |
| VI. Processes | Stateless processes | Lambda, Fargate, ECS |
| VII. Port binding | Export services via port binding | Container port mapping |
| VIII. Concurrency | Scale out via process model | Auto-scaling groups, HPA |
| IX. Disposability | Fast startup, graceful shutdown | Container health checks, SIGTERM handling |
| X. Dev/prod parity | Keep environments similar | IaC, same Terraform for all envs |
| XI. Logs | Treat as event streams | CloudWatch Logs, stdout/stderr |
| XII. Admin processes | Run admin tasks as one-off processes | ECS tasks, Lambda invocations |

### Beyond Twelve-Factor (Modern Additions)

- **API-first design** -- Services communicate via well-defined APIs
- **Telemetry** -- Built-in observability (metrics, logs, traces)
- **Security** -- Zero-trust, least privilege, encryption everywhere
- **Authentication/Authorization** -- Externalized to identity providers

---

## 5. Cloud Provider Global Infrastructure

### AWS Global Infrastructure (as of reference date)

```
┌──────────────────────────────────────────────────────────┐
│                  AWS GLOBAL INFRASTRUCTURE                 │
│                                                           │
│  Region (e.g., us-east-1)                                │
│  ├── Availability Zone (us-east-1a)                      │
│  │   └── One or more data centers                        │
│  │       └── Physically isolated, independent power/net  │
│  ├── Availability Zone (us-east-1b)                      │
│  │   └── Connected via low-latency private fiber         │
│  ├── Availability Zone (us-east-1c)                      │
│  │   └── Typically 3-6 AZs per region                    │
│  └── Local Zone (optional, for ultra-low latency)        │
│                                                           │
│  Edge Locations (400+)                                    │
│  └── CloudFront CDN, Route53 DNS, WAF, Shield            │
│                                                           │
│  Wavelength Zones (5G edge)                               │
│  └── Ultra-low latency for mobile/IoT                    │
│                                                           │
│  Outposts                                                 │
│  └── AWS infrastructure in customer data centers         │
└──────────────────────────────────────────────────────────┘
```

### Availability Zone Design Implications

AZs are the fundamental failure domain in cloud architecture:

- **Single-AZ deployment:** Not production-ready. Any AZ failure takes down the service.
- **Multi-AZ deployment:** Production minimum. Survives single AZ failure. Latency between AZs is typically <2ms.
- **Multi-region deployment:** Required for global applications or regulatory data residency. Inter-region latency varies (50-200ms+).

**Key design rule:** Data replication across AZs is synchronous (low latency enables this). Data replication across regions is typically asynchronous (high latency makes synchronous impractical). This directly impacts RPO calculations.

---

## 6. Cloud Economics

### The Five Pillars of Cloud Economics

1. **Pay-as-you-go:** No upfront capital expenditure (CapEx to OpEx shift)
2. **Economies of scale:** Providers pass savings from massive scale to consumers
3. **Elasticity:** Scale up/down to match demand, avoid over-provisioning
4. **Agility:** Provision in minutes vs. weeks for on-premises
5. **Global reach:** Deploy worldwide without building data centers

### Total Cost of Ownership (TCO) Analysis

When comparing cloud to on-premises, include:

| Cost Category | On-Premises | Cloud |
|---------------|-------------|-------|
| Hardware | CapEx (servers, storage, network) | $0 (provider) |
| Data center | Rent, power, cooling, physical security | $0 (provider) |
| Operations | Staff for hardware, OS, patching | Reduced (shared responsibility) |
| Networking | ISP, circuits, equipment | Data transfer charges |
| Licensing | OS, database, middleware | Included or BYOL |
| Overprovisioning | 60-80% typical utilization | Right-sized, elastic |
| Opportunity cost | Weeks to provision | Minutes to provision |

**Warning:** Cloud is not always cheaper. For stable, predictable workloads at scale, on-premises or colocation may have lower TCO. The Cloud Brain must produce honest cost analysis, not cloud advocacy.

---

## References

- NIST SP 800-145, "The NIST Definition of Cloud Computing" (2011)
- Kleppmann, M. *Designing Data-Intensive Applications.* O'Reilly, 2017
- AWS Well-Architected Framework (2023)
- Heroku, "The Twelve-Factor App" (2011)
- CNCF Cloud Native Definition v1.0 (2018)
- Barham et al., "Xen and the Art of Virtualization" (2003)
- Agache et al., "Firecracker: Lightweight Virtualization for Serverless Applications" (2020)

---

**This module is the theoretical foundation. All other Cloud Brain modules build upon these concepts.**

# Cloud Brain -- Glossary of Canonical Terms

This glossary defines terms as the Cloud Brain uses them. When ambiguity exists, these definitions take precedence within all Cloud Brain modules.

---

## Cloud Service Models

**IaaS (Infrastructure as a Service)**
Virtualized computing resources provisioned on demand. The provider manages physical infrastructure; the consumer manages OS, middleware, runtime, and applications. Examples: EC2, Compute Engine, Azure VMs.

**PaaS (Platform as a Service)**
A managed platform that abstracts OS and middleware. The consumer deploys application code; the provider manages everything below. Examples: Elastic Beanstalk, App Engine, Azure App Service.

**SaaS (Software as a Service)**
Fully managed software delivered over the network. The consumer configures; the provider manages everything. Examples: Salesforce, Google Workspace, Microsoft 365.

**FaaS (Function as a Service)**
A subset of PaaS where the unit of deployment is a single function. The provider manages all infrastructure including scaling to zero. Examples: Lambda, Cloud Functions, Azure Functions.

**CaaS (Container as a Service)**
Managed container orchestration. The consumer provides container images; the provider manages the orchestration layer. Examples: Fargate, Cloud Run, Azure Container Apps.

---

## Distributed Systems

**CAP Theorem (Brewer's Theorem)**
In a distributed data store, it is impossible to simultaneously guarantee all three of: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition tolerance (the system continues operating despite network partitions). Since partitions are inevitable in distributed systems, the practical choice is between CP and AP systems. Reference: Brewer (2000), formalized by Gilbert and Lynch (2002).

**PACELC Extension**
An extension of CAP: if there is a Partition, choose between Availability and Consistency; Else (normal operation), choose between Latency and Consistency. This captures the reality that even without partitions, there is a consistency-latency tradeoff. Reference: Abadi (2012).

**Eventual Consistency**
A consistency model where, given no new updates, all replicas will eventually converge to the same value. The system may return stale reads during convergence. Defined formally in Vogels (2009).

**Strong Consistency (Linearizability)**
The strongest single-object consistency model. Every operation appears to execute atomically at some point between invocation and response. Equivalent to behaving as if there is a single copy of the data. Reference: Herlihy and Wing (1990).

**Causal Consistency**
Operations that are causally related are seen by all nodes in the same order. Concurrent operations (no causal relationship) may be seen in different orders by different nodes. Strictly weaker than linearizability but stronger than eventual consistency.

**Consensus Algorithm**
A protocol enabling distributed nodes to agree on a single value despite failures. The canonical algorithms are Paxos (Lamport, 1998) and Raft (Ongaro and Ousterhout, 2014). Used in leader election, distributed locks, and replicated state machines.

**Paxos**
A family of consensus protocols proven correct by Lamport. Known for correctness guarantees but notoriously difficult to implement. Multi-Paxos extends basic Paxos for replicated logs.

**Raft**
A consensus algorithm designed for understandability while maintaining Paxos-equivalent correctness. Decomposes consensus into leader election, log replication, and safety. Used in etcd (Kubernetes), CockroachDB, and HashiCorp Consul.

**Split-Brain**
A failure mode where network partitions cause multiple nodes to believe they are the leader, potentially causing data divergence. Prevented by quorum-based consensus and fencing tokens.

**Quorum**
The minimum number of nodes that must agree for an operation to succeed. For a system with N replicas, a typical quorum requires (N/2)+1 agreements. Ensures overlap between read and write quorums guarantees consistency.

---

## Networking

**VPC (Virtual Private Cloud)**
An isolated virtual network within a cloud provider's infrastructure. Provides control over IP addressing, subnets, route tables, and network gateways. The fundamental network boundary in cloud architecture.

**CIDR (Classless Inter-Domain Routing)**
An IP addressing scheme that replaces classful addressing. Notation: `10.0.0.0/16` means the first 16 bits are the network prefix, leaving 16 bits (65,536 addresses) for hosts.

**Subnet**
A logical subdivision of a VPC. Subnets map to availability zones and are classified as public (internet-routable), private (NAT-routed), or isolated (no internet access).

**Security Group**
A stateful virtual firewall controlling inbound and outbound traffic at the instance level. Rules are permissive-only (no deny rules). Default denies all inbound, allows all outbound.

**NACL (Network Access Control List)**
A stateless firewall at the subnet level. Supports both allow and deny rules. Processed in order by rule number. Provides defense-in-depth alongside security groups.

**NAT Gateway**
A managed network address translation service allowing private subnet resources to initiate outbound internet connections without being directly reachable from the internet.

**Transit Gateway**
A network transit hub that connects VPCs, VPN connections, and Direct Connect gateways through a central point. Eliminates the N-squared peering problem.

**PrivateLink / Private Service Connect**
A service that enables private connectivity between VPCs and services without traversing the public internet. Traffic stays on the provider's backbone network.

**ALB (Application Load Balancer)**
A Layer 7 (HTTP/HTTPS) load balancer supporting content-based routing, WebSocket, HTTP/2, and gRPC. Operates at the application layer with path-based and host-based routing.

**NLB (Network Load Balancer)**
A Layer 4 (TCP/UDP/TLS) load balancer designed for extreme performance (millions of requests per second) with ultra-low latency. Preserves source IP addresses.

**CDN (Content Delivery Network)**
A geographically distributed network of edge servers that cache and serve content close to end users. Reduces latency and offloads origin servers. Examples: CloudFront, Cloud CDN, Front Door.

---

## Infrastructure as Code

**IaC (Infrastructure as Code)**
The practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes. Enables version control, review, testing, and reproducibility.

**HCL (HashiCorp Configuration Language)**
The declarative language used by Terraform. Describes desired infrastructure state; Terraform computes and applies the diff.

**State File (Terraform)**
A JSON file that maps Terraform configuration to real-world resources. Critical for drift detection and dependency tracking. Must be stored remotely (S3, GCS) with locking (DynamoDB, GCS) for team use.

**Drift**
The divergence between declared infrastructure state (IaC) and actual infrastructure state (cloud provider). Caused by manual changes, external automation, or provider-side updates. Detected by `terraform plan`.

**Module (Terraform)**
A reusable, encapsulated collection of Terraform resources. Analogous to a function in programming. Published to registries for organizational reuse.

**GitOps**
An operational framework where Git is the single source of truth for declarative infrastructure. Changes are made via pull requests; a reconciliation controller (ArgoCD, Flux) continuously converges actual state to desired state.

---

## Containers and Orchestration

**Container**
An OS-level virtualization unit that packages application code with its dependencies. Uses Linux namespaces and cgroups for isolation. Lighter weight than VMs -- shares the host kernel.

**Pod (Kubernetes)**
The smallest deployable unit in Kubernetes. Contains one or more containers that share network namespace and storage volumes. Co-located and co-scheduled.

**Deployment (Kubernetes)**
A declarative specification for managing Pod replicas. Handles rolling updates, rollbacks, and scaling. The primary workload management primitive.

**Service (Kubernetes)**
An abstract way to expose an application running on a set of Pods. Provides stable DNS name and IP address, load balancing across healthy Pods.

**Helm**
A package manager for Kubernetes. Helm charts are parameterized templates that bundle Kubernetes manifests. Supports versioning, dependencies, and rollbacks.

**Operator (Kubernetes)**
A method of packaging, deploying, and managing a Kubernetes application using custom resources and custom controllers. Encodes operational knowledge into software.

**Service Mesh**
A dedicated infrastructure layer for service-to-service communication. Provides observability, traffic management, and security (mTLS) without application code changes. Examples: Istio, Linkerd.

---

## Reliability

**RTO (Recovery Time Objective)**
The maximum acceptable duration of time between a disaster and restoration of service. Drives DR architecture decisions and cost.

**RPO (Recovery Point Objective)**
The maximum acceptable amount of data loss measured in time. An RPO of 1 hour means up to 1 hour of data loss is tolerable. Drives backup frequency.

**SLO (Service Level Objective)**
A target value or range for a service level measured by an SLI. Example: "99.9% of requests complete in under 300ms." Internal target, not contractual.

**SLI (Service Level Indicator)**
A quantitative measure of service level. Example: request latency, error rate, throughput. The measurement that feeds into SLO evaluation.

**SLA (Service Level Agreement)**
A contractual commitment to customers about service levels. Typically less aggressive than SLOs. Breaches may trigger financial penalties (credits).

**Error Budget**
The allowed amount of unreliability derived from the SLO. A 99.9% SLO means a 0.1% error budget (approximately 43 minutes/month of downtime). When the budget is exhausted, feature velocity must decrease.

**Chaos Engineering**
The discipline of experimenting on a distributed system to build confidence in its ability to withstand turbulent conditions in production. Pioneered by Netflix (Chaos Monkey). Reference: Rosenthal et al., *Chaos Engineering* (2020).

---

## Cost and FinOps

**FinOps (Cloud Financial Operations)**
An operational framework and cultural practice bringing financial accountability to the variable spend model of cloud. Combines technology, finance, and business to optimize cloud value.

**Reserved Instance (RI)**
A billing commitment (1 or 3 years) that provides a significant discount (up to 72%) over on-demand pricing in exchange for a usage commitment. AWS, GCP (CUDs), and Azure all offer variants.

**Savings Plan**
A flexible pricing model (AWS) offering lower prices in exchange for a commitment to a consistent amount of compute usage ($/hour) for 1 or 3 years. More flexible than RIs.

**Spot Instance (Preemptible VM)**
Spare cloud capacity available at up to 90% discount. Can be reclaimed by the provider with short notice (2 minutes on AWS). Suitable for fault-tolerant, stateless workloads.

**Right-Sizing**
The process of matching instance types and sizes to workload requirements. Eliminates waste from over-provisioned resources. Should be continuous, not one-time.

**Showback / Chargeback**
Showback: reporting cloud costs to business units for awareness without billing them. Chargeback: actually billing business units for their cloud consumption. Requires robust tagging and cost allocation.

---

## Security

**IAM (Identity and Access Management)**
The framework for managing digital identities and their permissions to cloud resources. Core principle: least privilege -- grant only the minimum permissions required.

**Least Privilege**
The principle that every identity (user, service, role) should have only the minimum permissions necessary to perform its function. Requires continuous review and pruning.

**Envelope Encryption**
A key management pattern where data is encrypted with a data encryption key (DEK), and the DEK is encrypted with a key encryption key (KEK) managed by a KMS. Balances security with performance.

**WAF (Web Application Firewall)**
A firewall that monitors, filters, and blocks HTTP traffic to and from a web application. Protects against OWASP Top 10 attacks (SQLi, XSS, etc.).

**CSPM (Cloud Security Posture Management)**
Continuous monitoring of cloud infrastructure for security risks, compliance violations, and misconfigurations. Automates security assessment across cloud accounts.

**Zero Trust**
A security model that assumes no implicit trust based on network location. Every request must be authenticated, authorized, and encrypted regardless of origin. "Never trust, always verify."

---

**This glossary is the canonical reference for all Cloud Brain modules. When terms are used in other modules, their definitions here take precedence.**

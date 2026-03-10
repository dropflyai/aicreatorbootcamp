# Networking Fundamentals for Cloud Architecture

## Foundation

Every cloud architecture is fundamentally a distributed system connected by networks. This module covers TCP/IP, DNS, load balancing, CDN, and VPC design -- the networking primitives upon which all cloud services are built.

---

## 1. TCP/IP in Cloud Context

### The OSI Model Mapped to Cloud Services

```
┌─────────────────────────────────────────────────────────────┐
│ Layer │ Name         │ Cloud Relevance                       │
├───────┼──────────────┼───────────────────────────────────────┤
│  7    │ Application  │ API Gateway, ALB (L7), CloudFront     │
│  6    │ Presentation │ TLS termination at load balancer      │
│  5    │ Session      │ WebSocket at ALB, sticky sessions     │
│  4    │ Transport    │ NLB (L4), Security Groups (TCP/UDP)   │
│  3    │ Network      │ VPC, subnets, route tables, NAT, IGW  │
│  2    │ Data Link    │ ENI (Elastic Network Interface)        │
│  1    │ Physical     │ AWS managed (fiber, switches, routers) │
└─────────────────────────────────────────────────────────────┘
```

### TCP Connection Lifecycle in Cloud

```
Client              Load Balancer           Backend
  │                      │                      │
  │──── SYN ────────────>│                      │
  │<─── SYN-ACK ────────│                      │
  │──── ACK ────────────>│                      │
  │                      │──── SYN ────────────>│  (new connection
  │                      │<─── SYN-ACK ────────│   for ALB; NLB
  │                      │──── ACK ────────────>│   passes through)
  │                      │                      │
  │──── HTTP Request ───>│──── HTTP Request ───>│
  │<─── HTTP Response ──│<─── HTTP Response ──│
  │                      │                      │
  │──── FIN ────────────>│──── FIN ────────────>│
  │<─── FIN-ACK ────────│<─── FIN-ACK ────────│
  │──── ACK ────────────>│──── ACK ────────────>│
```

**ALB vs NLB TCP behavior:**
- **ALB (Layer 7):** Terminates the client TCP connection and opens a NEW connection to the backend. Client IP is in `X-Forwarded-For` header. Connection pooling reduces backend connections.
- **NLB (Layer 4):** Passes TCP connections through (with optional TLS termination). Backend sees the client's original IP. No connection pooling -- each client connection maps to a backend connection.

### TCP Tuning for Cloud Workloads

| Parameter | Default | Cloud Recommendation | Reason |
|-----------|---------|---------------------|--------|
| `tcp_keepalive_time` | 7200s | 60s | Detect dead connections faster behind LBs |
| `tcp_keepalive_intvl` | 75s | 10s | Faster probe intervals |
| `tcp_keepalive_probes` | 9 | 6 | Fewer probes before declaring dead |
| `tcp_fin_timeout` | 60s | 30s | Faster TIME_WAIT cleanup |
| `net.core.somaxconn` | 128 | 65535 | Handle connection bursts |
| `tcp_max_syn_backlog` | 128 | 65535 | SYN flood resilience |

**Critical cloud networking rule:** AWS ALBs have a fixed idle timeout (default 60s). If your backend closes the connection before the ALB does, you get 502 errors. Set backend keepalive timeout HIGHER than ALB idle timeout.

---

## 2. DNS Architecture

### DNS Resolution Flow in Cloud

```
┌────────┐     ┌──────────┐     ┌────────────┐     ┌──────────┐
│ Client  │────>│ Recursive │────>│   Root NS   │────>│  TLD NS  │
│         │     │ Resolver  │     │ (13 anycast)│     │(.com,.io)│
└────────┘     └──────────┘     └────────────┘     └──────────┘
                    │                                      │
                    │         ┌─────────────────┐          │
                    └────────>│ Authoritative NS │<────────┘
                              │  (Route 53)      │
                              └────────┬────────┘
                                       │
                              ┌────────┴────────┐
                              │   DNS Record     │
                              │  A: 52.1.2.3    │
                              │  AAAA: 2001:... │
                              │  CNAME: lb.aws  │
                              │  ALIAS: d123.cf │
                              └─────────────────┘
```

### Route 53 Routing Policies

| Policy | Use Case | How It Works |
|--------|----------|-------------|
| **Simple** | Single resource | Returns one or more IP addresses randomly |
| **Weighted** | A/B testing, blue/green | Distribute traffic by weight (e.g., 90/10) |
| **Latency-based** | Global applications | Route to lowest-latency region for the user |
| **Failover** | Active-passive DR | Route to primary; failover on health check failure |
| **Geolocation** | Regulatory compliance | Route by user's geographic location |
| **Geoproximity** | Regional affinity | Route by geographic proximity with bias |
| **Multi-value answer** | Simple load distribution | Return up to 8 healthy records |

### DNS-based Failover Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ROUTE 53 FAILOVER                     │
│                                                          │
│  app.example.com                                         │
│       │                                                  │
│       ├── Primary (us-east-1)                            │
│       │   ├── Health Check: HTTP 200 on /health          │
│       │   └── ALB: alb-primary.us-east-1.elb.aws        │
│       │                                                  │
│       └── Secondary (us-west-2)  [failover]              │
│           ├── Health Check: HTTP 200 on /health          │
│           └── ALB: alb-secondary.us-west-2.elb.aws      │
│                                                          │
│  TTL: 60s (balance between fast failover and DNS cache)  │
│                                                          │
│  Health Check Config:                                    │
│  - Protocol: HTTPS                                       │
│  - Path: /health                                         │
│  - Interval: 10s (fast) or 30s (standard)               │
│  - Failure threshold: 3                                  │
│  - Regions: 3+ health checker regions                    │
│  - String matching: optional (verify response body)      │
└─────────────────────────────────────────────────────────┘
```

**DNS TTL tradeoff:** Low TTL (30-60s) enables fast failover but increases DNS query volume and latency. High TTL (300-3600s) reduces DNS load but delays failover. For production with failover: 60s TTL is the standard compromise.

---

## 3. Load Balancing

### Load Balancing Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **Round Robin** | Requests distributed cyclically | Homogeneous backends, uniform request cost |
| **Weighted Round Robin** | Round robin with weights | Heterogeneous backend capacity |
| **Least Connections** | Route to backend with fewest active connections | Long-lived connections, variable request cost |
| **Least Response Time** | Route to fastest-responding backend | Latency-sensitive workloads |
| **IP Hash** | Hash client IP to deterministic backend | Session affinity without cookies |
| **Random** | Random backend selection | Surprisingly effective at scale (power of two choices) |

### AWS Load Balancer Decision Matrix

```
┌──────────────────────────────────────────────────────────────┐
│              LOAD BALANCER SELECTION GUIDE                     │
│                                                              │
│  Need HTTP/HTTPS routing?                                     │
│  ├── YES → Need path/host-based routing?                     │
│  │         ├── YES → ALB                                     │
│  │         └── NO  → ALB (still best for HTTP)               │
│  └── NO                                                      │
│       ├── Need TCP/UDP raw performance?                       │
│       │   ├── YES → NLB                                      │
│       │   └── NO  → NLB (for non-HTTP protocols)             │
│       └── Need static IP / Elastic IP?                       │
│           ├── YES → NLB (supports EIP per AZ)                │
│           └── NO  → Either; NLB for simplicity               │
│                                                              │
│  Special cases:                                              │
│  - WebSocket:       ALB (native support)                     │
│  - gRPC:            ALB (HTTP/2 support)                     │
│  - IoT / Gaming:    NLB (UDP support, millions of conn)      │
│  - PrivateLink:     NLB (only LB that supports it)           │
│  - Global Accel:    NLB behind Global Accelerator            │
│  - Cross-region:    Global Accelerator + NLB per region      │
└──────────────────────────────────────────────────────────────┘
```

### ALB Advanced Features

**Target Group Types:**
- Instance targets (EC2 instance ID)
- IP targets (any private IP -- enables ECS, Lambda, on-prem)
- Lambda targets (direct integration, no API Gateway needed)

**Listener Rules (evaluated in order):**
```
Rule 1: IF path = /api/*     THEN forward to API target group
Rule 2: IF host = admin.*    THEN forward to Admin target group
Rule 3: IF header X-Test     THEN forward to Canary target group
Rule 4: IF method = POST     THEN forward to Write target group
Default:                      Forward to Default target group
```

**Sticky Sessions:**
- Application-based cookies (custom cookie name)
- Duration-based cookies (AWSALB cookie)
- Warning: sticky sessions reduce load distribution effectiveness and complicate scaling

### Health Check Design

```
Good health check:
  GET /health → checks database connectivity
                checks cache connectivity
                checks downstream service availability
                returns 200 with JSON body
                completes in < 2 seconds

Bad health check:
  GET / → returns 200 if web server is running
          does NOT check downstream dependencies
          false positive: server up but database down

Layered health checks:
  /health/shallow  → process is alive (for LB)
  /health/deep     → all dependencies checked (for monitoring)
  /health/ready    → ready to receive traffic (for k8s readiness)
```

---

## 4. CDN Architecture

### CloudFront Architecture

```
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌────────┐
│  User    │────>│ Edge Location│────>│ Regional Edge │────>│ Origin │
│ (global) │     │  (400+)      │     │ Cache (13)    │     │ (S3/ALB)│
└─────────┘     └─────────────┘     └──────────────┘     └────────┘
                      │                     │                   │
                 Cache HIT             Cache HIT           Cache MISS
                 (fastest)          (regional cache)      (origin fetch)
```

### Cache Strategy Decision Matrix

| Content Type | TTL | Cache-Control | Invalidation Strategy |
|-------------|-----|---------------|----------------------|
| Static assets (JS, CSS, images) | 1 year | `max-age=31536000, immutable` | Filename hashing (v2.js → v2.abc123.js) |
| HTML pages | 0-60s | `max-age=60, s-maxage=300` | CloudFront invalidation or short TTL |
| API responses (public) | 5-60s | `max-age=5, s-maxage=60` | Short TTL, stale-while-revalidate |
| API responses (private) | 0s | `private, no-store` | No caching |
| Media (video/audio) | 1 year | `max-age=31536000` | Versioned URLs |

### Cache Invalidation Patterns

```
Pattern 1: Versioned URLs (PREFERRED)
  /assets/main.abc123.css  → cache forever
  Deploy new version → /assets/main.def456.css
  Old URLs still work until clients refresh
  Zero invalidation cost, instant update

Pattern 2: CloudFront Invalidation
  POST /invalidation → {"Paths": ["/index.html"]}
  Propagation: 5-15 minutes globally
  Cost: first 1000 paths/month free, then $0.005/path
  Use sparingly for HTML and emergency fixes

Pattern 3: Short TTL
  Cache-Control: max-age=60
  Content refreshed every 60 seconds
  Higher origin load, but always relatively fresh
  Good for frequently changing content
```

---

## 5. VPC Design

### Reference VPC Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  VPC: 10.0.0.0/16 (65,536 IPs)                                  │
│                                                                   │
│  ┌─── AZ-a ──────────────┐  ┌─── AZ-b ──────────────┐          │
│  │                        │  │                        │          │
│  │  Public Subnet         │  │  Public Subnet         │          │
│  │  10.0.1.0/24           │  │  10.0.2.0/24           │          │
│  │  ├── NAT Gateway       │  │  ├── NAT Gateway       │          │
│  │  ├── ALB nodes         │  │  ├── ALB nodes         │          │
│  │  └── Bastion (if any)  │  │  └── Bastion (if any)  │          │
│  │                        │  │                        │          │
│  │  Private Subnet (App)  │  │  Private Subnet (App)  │          │
│  │  10.0.11.0/24          │  │  10.0.12.0/24          │          │
│  │  ├── ECS/EKS tasks     │  │  ├── ECS/EKS tasks     │          │
│  │  ├── Lambda (VPC)      │  │  ├── Lambda (VPC)      │          │
│  │  └── App EC2           │  │  └── App EC2           │          │
│  │                        │  │                        │          │
│  │  Private Subnet (Data) │  │  Private Subnet (Data) │          │
│  │  10.0.21.0/24          │  │  10.0.22.0/24          │          │
│  │  ├── RDS (primary)     │  │  ├── RDS (standby)     │          │
│  │  ├── ElastiCache       │  │  ├── ElastiCache       │          │
│  │  └── No internet route │  │  └── No internet route │          │
│  │                        │  │                        │          │
│  └────────────────────────┘  └────────────────────────┘          │
│                                                                   │
│  Internet Gateway ←──── Public subnets route 0.0.0.0/0 here     │
│  NAT Gateways    ←──── Private app subnets route 0.0.0.0/0 here │
│  No route        ←──── Data subnets have NO internet route        │
│                                                                   │
│  VPC Endpoints:                                                   │
│  ├── S3 (Gateway endpoint, free)                                 │
│  ├── DynamoDB (Gateway endpoint, free)                           │
│  ├── ECR, CloudWatch, SSM (Interface endpoints, per-AZ cost)    │
│  └── Secrets Manager (Interface endpoint)                        │
└─────────────────────────────────────────────────────────────────┘
```

### CIDR Planning Best Practices

| Environment | VPC CIDR | Subnet Size | Rationale |
|-------------|----------|-------------|-----------|
| Production | /16 (65,536 IPs) | /24 per subnet (251 usable) | Room for growth |
| Staging | /18 (16,384 IPs) | /24 per subnet | Mirror prod structure |
| Development | /20 (4,096 IPs) | /24 per subnet | Smaller but same pattern |
| Shared Services | /20 (4,096 IPs) | /24 per subnet | VPN, DNS, monitoring |

**CIDR planning rules:**
1. Never overlap CIDRs between VPCs that might peer or connect via Transit Gateway
2. Avoid 10.0.0.0/8 ranges that conflict with corporate networks (common: 10.0.0.0/16, 10.1.0.0/16)
3. Reserve CIDR space for future growth -- you cannot expand a VPC CIDR easily
4. AWS reserves 5 IPs per subnet (network, VPC router, DNS, future use, broadcast)
5. Plan for multi-account, multi-region from day one using a CIDR allocation spreadsheet

### Transit Gateway Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                     TRANSIT GATEWAY HUB                        │
│                                                               │
│              ┌──────────────────────┐                         │
│              │   Transit Gateway     │                         │
│              │   (regional hub)      │                         │
│              └──────────┬───────────┘                         │
│                         │                                     │
│    ┌────────────┬───────┴────┬─────────────┬──────────┐      │
│    │            │            │             │          │      │
│ VPC Prod    VPC Stage    VPC Dev     VPN to       Direct    │
│ 10.1.0.0/16 10.2.0.0/16 10.3.0.0/16 On-Prem    Connect   │
│                                      10.0.0.0/8  (1-100Gbps)│
│                                                              │
│ Route Tables:                                                │
│ ├── Prod RT: routes to Shared, blocks Dev                    │
│ ├── Dev RT: routes to Shared, blocks Prod                    │
│ ├── Shared RT: routes to all VPCs                            │
│ └── On-Prem RT: routes to Prod and Shared only               │
│                                                              │
│ Benefits:                                                    │
│ - Hub-and-spoke replaces N-squared peering                   │
│ - Centralized routing and security                           │
│ - Supports transitive routing                                │
│ - Bandwidth: 50 Gbps per VPC attachment                      │
│ - Cost: $0.05/hr per attachment + $0.02/GB data processed    │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Network Security Layers

### Defense in Depth

```
┌──────────────────────────────────────────────────────────────┐
│                    DEFENSE IN DEPTH                            │
│                                                              │
│  Layer 1: Edge (CloudFront + WAF + Shield)                   │
│  ├── WAF rules: rate limiting, geo-blocking, OWASP rules    │
│  ├── Shield: DDoS protection (L3/L4 auto, L7 with Advanced)│
│  └── CloudFront: absorbs volumetric attacks                  │
│                                                              │
│  Layer 2: VPC Boundary (NACLs)                               │
│  ├── Stateless rules at subnet level                         │
│  ├── Deny known bad IP ranges                                │
│  └── Allow only expected traffic patterns                    │
│                                                              │
│  Layer 3: Instance/Task (Security Groups)                    │
│  ├── Stateful rules at ENI level                             │
│  ├── Allow only from specific security groups (not CIDRs)   │
│  └── Principle: SG references > CIDR rules                   │
│                                                              │
│  Layer 4: Application (TLS + Auth)                           │
│  ├── mTLS between services (service mesh)                    │
│  ├── JWT/OAuth2 for API authentication                       │
│  └── Encryption in transit everywhere                        │
│                                                              │
│  Layer 5: Data (Encryption at rest)                          │
│  ├── KMS-managed keys for all storage                        │
│  ├── Envelope encryption for application secrets             │
│  └── No unencrypted data stores in production                │
└──────────────────────────────────────────────────────────────┘
```

### Security Group Design Patterns

```
Best Practice: Reference security groups, not CIDRs

ALB Security Group:
  Inbound:  443 from 0.0.0.0/0 (public HTTPS)
  Outbound: 8080 to App-SG

App Security Group:
  Inbound:  8080 from ALB-SG (only load balancer)
  Outbound: 5432 to DB-SG
  Outbound: 6379 to Cache-SG
  Outbound: 443 to VPC Endpoints

DB Security Group:
  Inbound:  5432 from App-SG (only app layer)
  Outbound: None needed (stateful return traffic auto-allowed)

Cache Security Group:
  Inbound:  6379 from App-SG
  Outbound: None needed
```

---

## 7. Hybrid and Multi-Cloud Networking

### VPN vs Direct Connect Decision

| Factor | VPN | Direct Connect |
|--------|-----|----------------|
| Setup time | Minutes | Weeks to months |
| Cost | ~$0.05/hr per tunnel | $0.30/hr (1Gbps) to $2.25/hr (10Gbps) |
| Bandwidth | 1.25 Gbps per tunnel (up to 50 with ECMP) | 1-100 Gbps |
| Latency | Variable (internet path) | Consistent (dedicated fiber) |
| Encryption | IPsec built-in | Optional (MACsec for 10/100 Gbps) |
| Redundancy | Dual tunnels per VPN connection | Requires 2nd connection at different location |
| Use case | Dev/test, backup, low-bandwidth | Production, high-bandwidth, latency-sensitive |

### Multi-Cloud Networking Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                  MULTI-CLOUD NETWORKING                         │
│                                                                │
│  ┌──────────┐     VPN/Interconnect     ┌──────────┐           │
│  │   AWS     │<───────────────────────>│   GCP     │           │
│  │  VPC      │                          │  VPC      │           │
│  │  10.1.0.0 │     VPN/ExpressRoute    │  10.2.0.0 │           │
│  └─────┬─────┘<──────────┐             └──────────┘           │
│        │                  │                                    │
│   Transit GW         ┌───┴──────┐                             │
│        │              │  Azure    │                             │
│   ┌────┴────┐        │  VNET     │                             │
│   │  On-Prem │        │  10.3.0.0│                             │
│   │  DC      │        └──────────┘                             │
│   └─────────┘                                                  │
│                                                                │
│  Key requirements:                                             │
│  1. Non-overlapping CIDR ranges across ALL clouds              │
│  2. Consistent DNS resolution (forwarding zones)               │
│  3. Unified identity (federated IAM)                           │
│  4. Centralized monitoring (provider-agnostic: Datadog, etc.) │
│  5. Consistent security policies (OPA/Rego across all)        │
└────────────────────────────────────────────────────────────────┘
```

---

## References

- Kleppmann, M. *Designing Data-Intensive Applications.* O'Reilly, 2017. Chapter 8.
- AWS VPC Documentation and Best Practices
- AWS Well-Architected Framework -- Networking Pillar
- Stevens, W.R. *TCP/IP Illustrated, Volume 1.* Addison-Wesley, 2011.
- RFC 1918 -- Address Allocation for Private Internets
- RFC 7540 -- HTTP/2
- RFC 8446 -- TLS 1.3

---

**This module is the networking foundation for all cloud architecture. Every VPC, load balancer, and CDN decision must be grounded in these fundamentals.**

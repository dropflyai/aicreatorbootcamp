# AWS Networking Services

## Overview

AWS networking connects compute, storage, and database services into coherent architectures. This module covers VPC design, load balancing (ALB/NLB), DNS (Route 53), CDN (CloudFront), and Transit Gateway -- the networking primitives that enable multi-tier, multi-region, and hybrid architectures.

---

## 1. VPC Deep Dive

### VPC Components and Traffic Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        VPC TRAFFIC FLOW                           │
│                                                                   │
│  Internet                                                         │
│     │                                                             │
│     v                                                             │
│  Internet Gateway (IGW)                                           │
│     │                                                             │
│     v                                                             │
│  Route Table (public): 0.0.0.0/0 → IGW                           │
│     │                                                             │
│     v                                                             │
│  Public Subnet (NACL applied here)                                │
│     │                                                             │
│     v                                                             │
│  Elastic Network Interface (ENI) on ALB                           │
│  (Security Group applied here)                                    │
│     │                                                             │
│     v                                                             │
│  ALB routes to target group in private subnet                     │
│     │                                                             │
│     v                                                             │
│  Route Table (private): 0.0.0.0/0 → NAT Gateway                  │
│                          10.0.0.0/16 → local                      │
│                          s3-prefix → vpce-gateway                 │
│     │                                                             │
│     v                                                             │
│  Private Subnet (App)                                             │
│  (NACL + Security Group)                                          │
│     │                                                             │
│     v                                                             │
│  Route Table (data): 10.0.0.0/16 → local (NO internet route)     │
│     │                                                             │
│     v                                                             │
│  Isolated Subnet (Database)                                       │
│  (NACL + Security Group: only from app subnet SG)                 │
└──────────────────────────────────────────────────────────────────┘
```

### Subnet Strategy: Three-Tier Architecture

```
Per Availability Zone:

Tier 1: PUBLIC (Internet-facing)
├── CIDR: /24 (251 usable IPs)
├── Route: 0.0.0.0/0 → IGW
├── Resources: ALB, NAT Gateway, Bastion (if needed)
├── Auto-assign public IP: Yes (for ALB, NAT)
└── NACL: Allow 80, 443 inbound; ephemeral outbound

Tier 2: PRIVATE APPLICATION (No direct internet)
├── CIDR: /24 (251 usable IPs)
├── Route: 0.0.0.0/0 → NAT Gateway (for outbound only)
├── Resources: ECS tasks, EKS pods, Lambda, EC2 app servers
├── Auto-assign public IP: No
└── NACL: Allow from public subnet only; outbound to data + NAT

Tier 3: PRIVATE DATA (Isolated, no internet)
├── CIDR: /24 (251 usable IPs)
├── Route: 10.0.0.0/16 → local (NO 0.0.0.0/0 route)
├── Resources: RDS, ElastiCache, OpenSearch
├── Auto-assign public IP: No
└── NACL: Allow from app subnet only; deny all internet
```

### VPC Endpoints

VPC endpoints enable private connectivity to AWS services without traversing the internet:

| Endpoint Type | Services | Cost | How It Works |
|--------------|----------|------|-------------|
| **Gateway** | S3, DynamoDB | Free | Route table entry pointing to endpoint |
| **Interface** | 100+ services (ECR, CloudWatch, SSM, SQS, KMS, Secrets Manager) | $0.01/hr per AZ + $0.01/GB | ENI in your subnet with private IP |

```
VPC Endpoint Priority (always configure these):

1. S3 Gateway Endpoint (FREE)
   - Eliminates NAT Gateway costs for S3 traffic
   - S3 traffic stays on AWS backbone

2. DynamoDB Gateway Endpoint (FREE)
   - Same benefit as S3

3. ECR Interface Endpoints (if using containers)
   - ecr.api, ecr.dkr, s3 (for image layers)
   - Eliminates NAT for image pulls (significant cost savings)

4. CloudWatch Logs Interface Endpoint
   - High-volume log shipping stays private

5. Secrets Manager / SSM Interface Endpoint
   - Secure secret retrieval without internet

Cost calculation:
NAT Gateway: $0.045/hr + $0.045/GB processed
Interface Endpoint: $0.01/hr per AZ + $0.01/GB
→ For high-traffic services, endpoints save money
→ For low-traffic services, NAT may be cheaper
```

### NAT Gateway Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                NAT GATEWAY HIGH AVAILABILITY                  │
│                                                              │
│  RECOMMENDED: One NAT Gateway per AZ                         │
│                                                              │
│  ┌────── AZ-a ──────┐    ┌────── AZ-b ──────┐              │
│  │                    │    │                    │              │
│  │  NAT-GW-a          │    │  NAT-GW-b          │              │
│  │  (EIP: 1.2.3.4)   │    │  (EIP: 5.6.7.8)   │              │
│  │       │            │    │       │            │              │
│  │  Private Subnet    │    │  Private Subnet    │              │
│  │  Route: 0.0.0.0/0  │    │  Route: 0.0.0.0/0  │              │
│  │  → NAT-GW-a       │    │  → NAT-GW-b       │              │
│  └────────────────────┘    └────────────────────┘              │
│                                                              │
│  Why per-AZ:                                                  │
│  - AZ failure doesn't take out NAT for other AZs             │
│  - No cross-AZ data transfer charges                         │
│  - Each AZ is independently functional                       │
│                                                              │
│  Cost: $0.045/hr per NAT GW ($32.40/month)                   │
│       + $0.045/GB processed                                  │
│                                                              │
│  Cost optimization:                                          │
│  - VPC endpoints for S3, DynamoDB (gateway, free)            │
│  - VPC endpoints for high-traffic AWS services (interface)   │
│  - Consider NAT instances (t4g.nano) for dev/test            │
│  - Monitor NAT GW CloudWatch metrics for throughput          │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Load Balancing (ALB and NLB)

### ALB Architecture

```
┌──────────────────────────────────────────────────────────────┐
│               APPLICATION LOAD BALANCER                       │
│                                                              │
│  Internet → ALB (cross-zone enabled)                         │
│              │                                               │
│              ├── Listener: HTTPS:443                         │
│              │   ├── SSL Certificate (ACM)                   │
│              │   ├── Security Policy (TLS 1.2+)              │
│              │   └── Rules:                                  │
│              │       ├── IF path=/api/* → TG: api-service    │
│              │       ├── IF path=/ws/* → TG: websocket-svc   │
│              │       ├── IF host=admin.* → TG: admin-app     │
│              │       └── DEFAULT → TG: frontend              │
│              │                                               │
│              └── Listener: HTTP:80                            │
│                  └── Rule: Redirect 301 → HTTPS:443          │
│                                                              │
│  Target Groups:                                              │
│  ┌──────────────────────────────────────────────┐            │
│  │ TG: api-service (type: ip)                    │            │
│  │ ├── Health: GET /health, interval 15s         │            │
│  │ ├── Deregistration delay: 30s                 │            │
│  │ ├── Stickiness: disabled                      │            │
│  │ └── Targets: ECS Fargate tasks (dynamic IPs)  │            │
│  └──────────────────────────────────────────────┘            │
│  ┌──────────────────────────────────────────────┐            │
│  │ TG: frontend (type: instance)                 │            │
│  │ ├── Health: GET /, interval 30s               │            │
│  │ └── Targets: EC2 instances in ASG             │            │
│  └──────────────────────────────────────────────┘            │
└──────────────────────────────────────────────────────────────┘
```

### ALB Advanced Features

**Weighted Target Groups (Blue/Green, Canary):**
```
Listener Rule: path = /api/*
├── Forward to:
│   ├── TG: api-v2 (weight: 90%)  ← current production
│   └── TG: api-v3 (weight: 10%)  ← canary deployment
│
│   Shift weights gradually: 10% → 25% → 50% → 100%
│   Rollback: set v3 weight to 0%
```

**Authentication (OIDC):**
```
Listener Rule: path = /admin/*
├── Action 1: Authenticate with OIDC
│   ├── Issuer: https://cognito-idp.us-east-1.amazonaws.com/pool
│   ├── Token endpoint, Authorization endpoint, UserInfo endpoint
│   └── On unauthenticated: authenticate (redirect to login)
├── Action 2: Forward to TG: admin-app
```

### NLB for High Performance

```
┌──────────────────────────────────────────────────────────────┐
│               NETWORK LOAD BALANCER                           │
│                                                              │
│  Key differentiators from ALB:                               │
│                                                              │
│  1. STATIC IP per AZ (Elastic IP supported)                  │
│     - Whitelisting-friendly for partners/firewalls           │
│     - Stable IPs that don't change                           │
│                                                              │
│  2. EXTREME PERFORMANCE                                       │
│     - Millions of requests per second                        │
│     - Ultra-low latency (~100 microseconds)                  │
│     - Handles volatile traffic patterns                      │
│                                                              │
│  3. SOURCE IP PRESERVATION                                    │
│     - Backend sees client's real IP                          │
│     - No X-Forwarded-For header needed                       │
│                                                              │
│  4. PRIVATELINK SUPPORT                                       │
│     - Only NLB supports VPC endpoint services                │
│     - Required for exposing services to other VPCs/accounts  │
│                                                              │
│  5. TLS PASSTHROUGH                                           │
│     - Pass encrypted traffic to backend                      │
│     - Or terminate TLS at NLB (with ACM cert)                │
│                                                              │
│  Use NLB for:                                                │
│  ├── TCP/UDP protocols (not HTTP)                            │
│  ├── IoT / gaming (millions of connections)                  │
│  ├── gRPC (with TLS, better than ALB in some cases)          │
│  ├── PrivateLink service endpoints                           │
│  └── Static IP requirements                                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Route 53 DNS

### DNS Architecture Patterns

```
┌──────────────────────────────────────────────────────────────┐
│              ROUTE 53 MULTI-REGION ARCHITECTURE               │
│                                                              │
│  example.com (Hosted Zone)                                   │
│  │                                                           │
│  ├── app.example.com                                         │
│  │   ├── Type: A (Alias)                                     │
│  │   ├── Routing: Latency-based                              │
│  │   ├── Region us-east-1 → ALB-east                        │
│  │   │   └── Health Check: HTTPS /health (interval: 10s)    │
│  │   ├── Region eu-west-1 → ALB-europe                      │
│  │   │   └── Health Check: HTTPS /health (interval: 10s)    │
│  │   └── Failover: If all health checks fail → S3 static    │
│  │                                                           │
│  ├── api.example.com                                         │
│  │   ├── Type: A (Alias)                                     │
│  │   ├── Routing: Weighted                                   │
│  │   ├── 95% → API v2 ALB                                   │
│  │   └── 5%  → API v3 ALB (canary)                          │
│  │                                                           │
│  ├── static.example.com                                      │
│  │   ├── Type: A (Alias)                                     │
│  │   └── Target: CloudFront distribution                     │
│  │                                                           │
│  └── internal.example.com                                    │
│      ├── Type: Private Hosted Zone (VPC-associated)          │
│      └── Records for internal service discovery              │
└──────────────────────────────────────────────────────────────┘
```

### DNS Failover Patterns

| Pattern | Architecture | RTO | Complexity |
|---------|-------------|-----|-----------|
| **Active-Active** | Latency routing, both regions serve traffic | 0 (instant) | High (data sync) |
| **Active-Passive** | Failover routing, secondary on standby | 60-120s (DNS TTL) | Medium |
| **Active-Passive (S3)** | Failover to S3 static "maintenance" page | 60s | Low |
| **Weighted Failover** | 100/0 weight, shift on failure | Manual or automated | Medium |

---

## 4. CloudFront CDN

### CloudFront Distribution Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              CLOUDFRONT DISTRIBUTION                           │
│                                                              │
│  User Request → Nearest Edge Location (400+)                 │
│       │                                                      │
│       ├── Cache HIT → Return cached response (fastest)       │
│       │                                                      │
│       └── Cache MISS → Regional Edge Cache (13 locations)    │
│               │                                              │
│               ├── Cache HIT → Return + cache at edge         │
│               │                                              │
│               └── Cache MISS → Origin Request                │
│                       │                                      │
│                       ├── S3 Origin (OAC for private access) │
│                       ├── ALB Origin (custom headers)        │
│                       ├── API Gateway Origin                 │
│                       └── Custom Origin (any HTTP endpoint)  │
│                                                              │
│  Origin Access Control (OAC):                                │
│  ├── Replaces Origin Access Identity (OAI) -- deprecated    │
│  ├── S3 bucket policy allows only CloudFront distribution   │
│  ├── Prevents direct S3 access (bucket can be private)      │
│  └── Supports SSE-KMS encryption                            │
│                                                              │
│  Lambda@Edge / CloudFront Functions:                         │
│  ├── Viewer Request: auth, redirects, URL rewrite           │
│  ├── Viewer Response: security headers, cookies             │
│  ├── Origin Request: dynamic origin selection                │
│  └── Origin Response: modify origin response, error pages   │
└──────────────────────────────────────────────────────────────┘
```

### CloudFront Security Configuration

```
CloudFront Security Checklist:
├── TLS: TLSv1.2_2021 minimum (or custom TLS 1.3)
├── Certificate: ACM certificate (us-east-1 only for CF)
├── HTTPS: Redirect HTTP to HTTPS (viewer protocol policy)
├── WAF: Associate AWS WAF web ACL
│   ├── Rate limiting (prevent DDoS)
│   ├── Geo-restriction (block countries if needed)
│   ├── AWS Managed Rules (core, known bad inputs, SQLi, XSS)
│   └── Custom rules (bot detection, IP reputation)
├── Shield: Standard (free, automatic L3/L4 DDoS)
│   └── Advanced ($3000/mo for L7 DDoS, DRT support, cost protection)
├── Headers: Add security headers via CloudFront Functions
│   ├── Strict-Transport-Security (HSTS)
│   ├── Content-Security-Policy
│   ├── X-Content-Type-Options: nosniff
│   ├── X-Frame-Options: DENY
│   └── Referrer-Policy: strict-origin-when-cross-origin
└── Logging: Enable access logs to S3 (for audit/analysis)
```

---

## 5. Transit Gateway

### Multi-Account Transit Gateway Architecture

```
┌──────────────────────────────────────────────────────────────┐
│            TRANSIT GATEWAY MULTI-ACCOUNT                      │
│                                                              │
│  AWS Organization                                            │
│  │                                                           │
│  ├── Network Account (owns Transit Gateway)                  │
│  │   └── Transit Gateway (TGW)                               │
│  │       ├── TGW Route Table: Production                     │
│  │       │   ├── 10.1.0.0/16 → Prod VPC attachment          │
│  │       │   ├── 10.10.0.0/16 → Shared Services attachment  │
│  │       │   └── 0.0.0.0/0 → Inspection VPC attachment      │
│  │       │                                                   │
│  │       ├── TGW Route Table: Non-Production                 │
│  │       │   ├── 10.2.0.0/16 → Stage VPC attachment         │
│  │       │   ├── 10.3.0.0/16 → Dev VPC attachment           │
│  │       │   ├── 10.10.0.0/16 → Shared Services attachment  │
│  │       │   └── 0.0.0.0/0 → Inspection VPC attachment      │
│  │       │                                                   │
│  │       └── TGW Route Table: Shared Services                │
│  │           ├── 10.1.0.0/16 → Prod VPC                     │
│  │           ├── 10.2.0.0/16 → Stage VPC                    │
│  │           └── 10.3.0.0/16 → Dev VPC                      │
│  │                                                           │
│  ├── Production Account                                      │
│  │   └── VPC: 10.1.0.0/16 → TGW attachment                 │
│  │                                                           │
│  ├── Staging Account                                         │
│  │   └── VPC: 10.2.0.0/16 → TGW attachment                 │
│  │                                                           │
│  ├── Dev Account                                             │
│  │   └── VPC: 10.3.0.0/16 → TGW attachment                 │
│  │                                                           │
│  ├── Shared Services Account                                 │
│  │   └── VPC: 10.10.0.0/16 → TGW attachment                │
│  │       ├── DNS resolvers (Route 53 Resolver)               │
│  │       ├── Directory Service (AD)                          │
│  │       └── Monitoring (centralized)                        │
│  │                                                           │
│  └── Inspection Account (Network Firewall)                   │
│      └── VPC: 10.20.0.0/16 → TGW attachment                │
│          └── AWS Network Firewall (inspect all traffic)      │
│                                                              │
│  Isolation rules:                                            │
│  - Prod CANNOT reach Dev/Stage (separate route tables)       │
│  - Dev/Stage CAN reach Shared Services                       │
│  - ALL traffic passes through Inspection VPC                 │
│  - On-premises connects via VPN/DX to TGW                   │
└──────────────────────────────────────────────────────────────┘
```

### Transit Gateway vs VPC Peering Decision

| Factor | Transit Gateway | VPC Peering |
|--------|----------------|-------------|
| Transitive routing | Yes | No (direct only) |
| Scale | 5,000 attachments | 125 peering connections per VPC |
| Cost | $0.05/hr per attachment + $0.02/GB | Free (data transfer charges only) |
| Bandwidth | 50 Gbps per attachment | No limit (full VPC bandwidth) |
| Routing control | Centralized route tables | Per-VPC route tables |
| Use case | Hub-and-spoke, 3+ VPCs | Direct 1:1 connections, 2 VPCs |

**Rule of thumb:** Use VPC Peering for 2-3 VPCs. Use Transit Gateway for 4+ VPCs or when centralized routing/inspection is required.

---

## 6. AWS Global Accelerator

```
┌──────────────────────────────────────────────────────────────┐
│              AWS GLOBAL ACCELERATOR                            │
│                                                              │
│  Problem: Users far from AWS region experience high latency  │
│  due to internet routing (many hops, unpredictable path)     │
│                                                              │
│  Solution: Global Accelerator provides 2 static anycast IPs │
│  that route traffic to the nearest AWS edge location, then   │
│  uses the AWS global backbone network to reach the endpoint  │
│                                                              │
│  User → Nearest Edge (anycast) → AWS Backbone → Endpoint    │
│                                                              │
│  vs. without:                                                │
│  User → ISP → ISP → ISP → ... → AWS Region (many hops)     │
│                                                              │
│  Benefits:                                                   │
│  ├── 60% latency improvement (typical)                       │
│  ├── Static IPs (no DNS propagation delays for failover)     │
│  ├── Instant failover (health check + traffic dial)          │
│  ├── DDoS protection (Shield Standard integrated)            │
│  └── TCP/UDP support (not just HTTP like CloudFront)         │
│                                                              │
│  Use when:                                                   │
│  ├── Non-HTTP traffic (gaming, IoT, VoIP)                   │
│  ├── Need static IPs for enterprise firewalls               │
│  ├── Need instant failover (no DNS TTL wait)                │
│  └── Multi-region active-active with endpoint health checks │
│                                                              │
│  Cost: $0.025/hr per accelerator + $0.015-0.035/GB (by dir) │
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Network Cost Optimization

```
┌──────────────────────────────────────────────────────────────┐
│              NETWORK COST OPTIMIZATION                        │
│                                                              │
│  Data Transfer Costs (us-east-1, approximate):               │
│  ├── Inbound: FREE                                           │
│  ├── Same AZ: FREE (use private IP)                          │
│  ├── Cross-AZ: $0.01/GB each direction                      │
│  ├── To internet: $0.09/GB (first 10TB)                     │
│  ├── Cross-region: $0.02/GB                                  │
│  ├── NAT Gateway processing: $0.045/GB                       │
│  └── CloudFront to internet: $0.085/GB (cheaper than direct)│
│                                                              │
│  Optimization strategies:                                    │
│  1. Use VPC Gateway Endpoints (S3, DynamoDB) → FREE          │
│  2. Use CloudFront for outbound → cheaper than direct        │
│  3. Compress data in transit → less GB = less cost           │
│  4. Keep compute and data in same AZ when possible           │
│  5. Use PrivateLink instead of internet for AWS services     │
│  6. Monitor VPC Flow Logs for unexpected cross-AZ traffic    │
│  7. Consider S3 same-region access points                    │
└──────────────────────────────────────────────────────────────┘
```

---

## References

- AWS VPC Documentation
- AWS ELB Documentation (ALB, NLB)
- AWS Route 53 Developer Guide
- AWS CloudFront Developer Guide
- AWS Transit Gateway Documentation
- AWS Well-Architected Framework -- Networking Pillar
- AWS re:Invent NET301-NET401 sessions

---

**This module covers AWS networking. For compute that uses these networks, see `02_aws/compute.md`. For security layered on these networks, see `08_security/cloud_security.md`.**

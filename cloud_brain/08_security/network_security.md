# Cloud Network Security — VPC Design, Security Groups, WAF, and PrivateLink

## Overview

Cloud network security controls the flow of traffic between and within cloud environments. Unlike traditional on-premises networking where physical topology dictates traffic flow, cloud networking is software-defined — every network rule is a configuration decision that can be changed (or misconfigured) with an API call. This module codifies VPC architecture, the distinction between security groups and NACLs, WAF configuration for application protection, CloudFront security, PrivateLink for private connectivity, and transit gateway for multi-VPC architectures.

The cloud networking axiom: in the cloud, your network security is only as good as your configuration. A misconfigured security group is not a hardening failure — it is a vulnerability with the same impact as an unpatched CVE.

---

## VPC Design

### Reference VPC Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        VPC (10.0.0.0/16)                    │
│                                                              │
│  ┌──────────── AZ-a ──────────┐  ┌──────── AZ-b ─────────┐│
│  │                              │  │                        ││
│  │  Public Subnet (10.0.1.0/24) │  │  Public (10.0.2.0/24) ││
│  │  ┌─────────────────────────┐ │  │  ┌──────────────────┐ ││
│  │  │ NAT Gateway / ALB       │ │  │  │ NAT GW / ALB     │ ││
│  │  └─────────────────────────┘ │  │  └──────────────────┘ ││
│  │                              │  │                        ││
│  │  Private Subnet (10.0.3.0/24)│  │  Private (10.0.4.0/24)││
│  │  ┌─────────────────────────┐ │  │  ┌──────────────────┐ ││
│  │  │ Application Servers     │ │  │  │ Application      │ ││
│  │  │ (ECS/EKS/Lambda)       │ │  │  │ Servers          │ ││
│  │  └─────────────────────────┘ │  │  └──────────────────┘ ││
│  │                              │  │                        ││
│  │  Data Subnet (10.0.5.0/24)  │  │  Data (10.0.6.0/24)   ││
│  │  ┌─────────────────────────┐ │  │  ┌──────────────────┐ ││
│  │  │ RDS / ElastiCache      │ │  │  │ RDS Standby      │ ││
│  │  └─────────────────────────┘ │  │  └──────────────────┘ ││
│  └──────────────────────────────┘  └────────────────────────┘│
│                                                              │
│  Route Tables:                                               │
│  Public:  0.0.0.0/0 → Internet Gateway                      │
│  Private: 0.0.0.0/0 → NAT Gateway                           │
│  Data:    No internet route (isolated)                       │
└────────────────────────────────────────────────────────────┘
```

### Subnet Strategy

| Subnet Type | Internet Access | Resources | Security |
|------------|----------------|-----------|----------|
| Public | Direct (IGW) | ALB, NAT Gateway, bastion (if needed) | Minimally used, only for internet-facing resources |
| Private | Outbound only (NAT GW) | Application servers, containers, Lambda | Most workloads live here |
| Data/Isolated | None | Databases, caches, sensitive data stores | No internet route, accessed only from private subnets |

### VPC Sizing

| VPC Size | CIDR | Available IPs | Use Case |
|----------|------|--------------|----------|
| Small | /24 (256 IPs) | ~250 | Single small service |
| Medium | /20 (4,096 IPs) | ~4,000 | Standard workload |
| Large | /16 (65,536 IPs) | ~65,000 | Large deployment, many services |

**Planning rule:** Always provision more IP space than you think you need. Running out of IPs requires VPC migration, which is extremely disruptive.

---

## Security Groups vs NACLs

### Comparison

| Feature | Security Group | Network ACL |
|---------|---------------|-------------|
| Level | Instance/ENI level | Subnet level |
| State | Stateful (return traffic automatic) | Stateless (must allow return traffic explicitly) |
| Rules | Allow rules only | Allow and Deny rules |
| Evaluation | All rules evaluated | Rules evaluated in order (lowest number first) |
| Default | Deny all inbound, allow all outbound | Allow all (default NACL) |
| Use case | Primary access control | Additional defense layer, subnet isolation |

### Security Group Best Practices

```
# Application Security Group
Inbound:
  - Port 3000 from ALB security group (not 0.0.0.0/0)
  - Port 443 from monitoring security group

Outbound:
  - Port 5432 to database security group
  - Port 6379 to cache security group
  - Port 443 to 0.0.0.0/0 (HTTPS to external APIs)

# Database Security Group
Inbound:
  - Port 5432 from application security group ONLY
  - Nothing else

Outbound:
  - Port 443 to VPC endpoints (for monitoring)
```

**Key rules:**
1. Never allow 0.0.0.0/0 inbound on any port in production
2. Reference security groups by ID, not CIDR (security group chaining)
3. Use separate security groups for each service tier
4. Log security group changes via CloudTrail
5. Review security groups monthly for stale rules

---

## AWS WAF — Web Application Firewall

### WAF Architecture

```
Internet → CloudFront → WAF → ALB → Application
                         │
                    ┌────┴────┐
                    │ WAF Rules │
                    │ - IP block │
                    │ - Rate limit│
                    │ - SQL inject│
                    │ - XSS block │
                    │ - Geo block │
                    │ - Bot detect│
                    └──────────┘
```

### WAF Rule Groups

| Rule Group | Protection |
|-----------|-----------|
| AWS Managed — Core Rule Set | OWASP Top 10 protections |
| AWS Managed — SQL Injection | SQL injection patterns |
| AWS Managed — Known Bad Inputs | Log4j, Spring4Shell, common exploits |
| AWS Managed — Bot Control | Bot detection and management |
| AWS Managed — Account Takeover | Credential stuffing protection |
| Custom — Rate Limiting | Per-IP request rate limits |
| Custom — Geo Restriction | Block or allow by country |
| Custom — IP Reputation | Block known-malicious IPs |

### WAF Configuration Example

```json
{
  "Name": "production-waf",
  "DefaultAction": { "Allow": {} },
  "Rules": [
    {
      "Name": "RateLimit",
      "Priority": 1,
      "Action": { "Block": {} },
      "Statement": {
        "RateBasedStatement": {
          "Limit": 2000,
          "AggregateKeyType": "IP"
        }
      }
    },
    {
      "Name": "AWSManagedRulesCommonRuleSet",
      "Priority": 2,
      "OverrideAction": { "None": {} },
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesCommonRuleSet"
        }
      }
    },
    {
      "Name": "AWSManagedRulesSQLiRuleSet",
      "Priority": 3,
      "OverrideAction": { "None": {} },
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesSQLiRuleSet"
        }
      }
    }
  ]
}
```

---

## CloudFront Security

| Feature | Configuration |
|---------|-------------|
| Origin Access Control (OAC) | Restrict S3 access to CloudFront only (replace OAI) |
| HTTPS enforcement | Redirect HTTP to HTTPS, minimum TLS 1.2 |
| Field-level encryption | Encrypt specific POST fields at the edge |
| Signed URLs/Cookies | Restrict access to authorized users |
| Geo-restriction | Block or allow by country |
| Custom error pages | Hide origin error details from users |
| Security headers | Add security headers via CloudFront Functions |

---

## PrivateLink — Private Connectivity

### PrivateLink Architecture

PrivateLink creates private endpoints within your VPC for accessing AWS services or third-party services without traversing the public internet:

```
VPC                          AWS Service / Third-Party
┌──────────────────┐         ┌──────────────────┐
│                    │         │                    │
│  Application       │         │  S3 / DynamoDB /   │
│  ┌──────────┐     │  ENI    │  SaaS Service      │
│  │          │────────────→│                    │
│  └──────────┘     │ Private │                    │
│                    │ Link    │                    │
│  VPC Endpoint      │         │  Endpoint Service  │
└──────────────────┘         └──────────────────┘
      No internet traversal
      No NAT Gateway needed
      No public IP needed
```

### VPC Endpoint Types

| Type | Services | Cost |
|------|---------|------|
| Gateway Endpoint | S3, DynamoDB | Free |
| Interface Endpoint (PrivateLink) | All other AWS services, third-party | ~$0.01/hour + data processing |

### Recommended VPC Endpoints

Always create these endpoints to avoid NAT Gateway costs and improve security:
- S3 (Gateway) — free, reduces NAT traffic significantly
- DynamoDB (Gateway) — free
- ECR (Interface) — container image pulls stay private
- CloudWatch Logs (Interface) — log shipping stays private
- STS (Interface) — credential refresh stays private
- Secrets Manager (Interface) — secret retrieval stays private
- KMS (Interface) — encryption operations stay private

---

## Transit Gateway

### Multi-VPC Connectivity

```
┌─────────┐     ┌─────────────────┐     ┌─────────┐
│ VPC A    │────→│  Transit Gateway │←────│ VPC B    │
│(Prod)    │     │  (hub)           │     │(Staging) │
└─────────┘     │                  │     └─────────┘
                │  Route tables    │
┌─────────┐    │  Attachments     │     ┌─────────┐
│ VPC C    │───→│  Security groups │←────│ On-Prem  │
│(Shared)  │    └─────────────────┘     │ (VPN)    │
└─────────┘                             └─────────┘
```

### Transit Gateway Security

- Use route table segmentation to control inter-VPC traffic
- Production VPCs should not have routes to development VPCs
- Shared services VPC accessible from all VPCs (monitoring, CI/CD)
- VPN attachment for on-premises connectivity
- Enable flow logs for transit gateway for audit and troubleshooting

---

## Cross-References

- `08_security/cloud_iam.md` — IAM for network security configuration
- `08_security/data_protection.md` — Encryption in transit
- `06_reliability/high_availability.md` — Multi-AZ networking
- `05_infrastructure_as_code/iac_fundamentals.md` — IaC for VPC
- `07_cost/cost_optimization.md` — VPC endpoint cost optimization

# Cloud Security — Shared Responsibility, IAM, and Cloud-Native Defense

## Overview

Cloud computing has not eliminated security — it has redistributed it. The shared responsibility model means the cloud provider secures the infrastructure, but the customer secures everything they deploy on it. The majority of cloud security breaches are customer misconfigurations, not provider failures. Gartner estimates that through 2025, 99% of cloud security failures will be the customer's fault. This module codifies cloud security architecture across AWS (primary), GCP, and Azure, covering IAM, storage security, logging, monitoring, CSPM, and container security.

The axiom: in the cloud, misconfiguration is the new vulnerability. Your attack surface is your configuration.

---

## Shared Responsibility Model

### AWS Shared Responsibility

| Responsibility | AWS | Customer |
|---------------|-----|----------|
| Physical security | Yes | No |
| Network infrastructure | Yes | No |
| Hypervisor | Yes | No |
| Operating system (EC2) | No | Yes |
| Network configuration (SGs, NACLs) | No | Yes |
| Data encryption | No (provides tools) | Yes (must enable) |
| IAM policies | No (provides service) | Yes (must configure) |
| Application security | No | Yes |
| Data classification | No | Yes |

### Model Variations by Service Type

**IaaS (EC2):** Customer responsible for OS, middleware, application, data. Most customer responsibility.

**PaaS (RDS, Elastic Beanstalk):** Provider manages OS and middleware. Customer responsible for application configuration and data. Moderate customer responsibility.

**SaaS (S3, DynamoDB):** Provider manages everything except data and access configuration. Least customer responsibility, but misconfiguration of access controls remains the primary risk.

**Serverless (Lambda):** Provider manages runtime. Customer responsible for function code, IAM permissions, and data. Smallest attack surface, but overprivileged function roles are common.

---

## IAM — Identity and Access Management

### Least Privilege Implementation

**Principle:** Every identity (user, service, application) should have exactly the permissions required to perform its function, and no more. Excessive permissions are not a convenience — they are a vulnerability.

**AWS IAM Policy Structure:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": [
      "arn:aws:s3:::my-app-data",
      "arn:aws:s3:::my-app-data/*"
    ],
    "Condition": {
      "IpAddress": {"aws:SourceIp": "10.0.0.0/8"},
      "StringEquals": {"s3:ExistingObjectTag/classification": "public"}
    }
  }]
}
```

**IAM Anti-Patterns (Common Misconfigurations):**
- `"Action": "*"` — Grants all permissions. Never acceptable for any identity.
- `"Resource": "*"` — Grants access to all resources. Scope to specific ARNs.
- Inline policies on individual users — Use groups or roles for management at scale.
- Long-lived access keys — Use IAM roles with temporary credentials (STS AssumeRole).
- No MFA on privileged accounts — Require MFA for all console access and sensitive API operations.
- Service accounts with human user credentials — Use IAM roles for EC2/Lambda, not access keys.

### Permission Boundaries

Permission boundaries cap the maximum permissions an IAM entity can have, regardless of attached policies:
- Set organization-wide boundaries via SCPs (Service Control Policies)
- Set per-account boundaries via Permission Boundaries
- Neither grants permissions — they only limit what attached policies can grant
- Use for delegation: allow teams to create IAM roles, but bounded by guardrails

### IAM Access Analyzer

AWS IAM Access Analyzer identifies resources shared with external accounts or the public:
- Analyzes S3 buckets, IAM roles, KMS keys, Lambda functions, SQS queues
- Generates findings for any external access
- Validates policies against best practices before deployment
- Archive findings that represent intentional sharing (documented risk acceptance)

---

## S3 Security — The #1 Cloud Misconfiguration

### S3 Security Controls

S3 bucket misconfiguration has caused more data breaches than any other cloud security failure. Every S3 bucket must have:

**Block Public Access (Account Level):**
```
S3 Block Public Access Settings:
  BlockPublicAcls: true
  IgnorePublicAcls: true
  BlockPublicPolicy: true
  RestrictPublicBuckets: true
```
Enable at the account level. Override only for intentionally public buckets (static website hosting) with explicit documentation and review.

**Bucket Policy Best Practices:**
- Deny unencrypted uploads: Require `s3:x-amz-server-side-encryption`
- Deny non-HTTPS access: Condition on `aws:SecureTransport: true`
- Restrict to VPC endpoints for internal data: Condition on `aws:sourceVpce`
- Enable versioning for critical data (ransomware protection)
- Enable MFA Delete for compliance-critical buckets

**Server-Side Encryption:**
- SSE-S3 (AES-256, AWS managed keys) — Minimum acceptable encryption
- SSE-KMS (AWS KMS managed keys) — Recommended for sensitive data (audit trail, key rotation, access control)
- SSE-C (customer-provided keys) — For regulatory requirements mandating customer key control

**S3 Access Logging:**
Enable server access logging for all buckets containing sensitive data. Logs include requester, bucket name, request time, action, response status. Store logs in a separate logging bucket with restricted access.

---

## CloudTrail — Audit Logging

### CloudTrail Configuration Requirements

CloudTrail is the audit log for all AWS API activity. It is non-negotiable for security operations:

**Required Settings:**
- Enable for all regions (not just the primary region)
- Enable for all accounts in the organization (Organization Trail)
- Log both management events and data events for sensitive resources
- Enable log file integrity validation (detect log tampering)
- Deliver to a centralized S3 bucket in a dedicated security account
- Enable CloudWatch Logs integration for real-time alerting
- Encrypt trail logs with a dedicated KMS key

**Critical Events to Monitor:**
| Event | Significance |
|-------|-------------|
| ConsoleLogin without MFA | Policy violation |
| Root account usage | Should never occur in normal operations |
| IAM policy changes | Privilege escalation attempt |
| Security group modifications | Network control changes |
| S3 bucket policy changes | Data exposure risk |
| KMS key deletion/disable | Encryption control sabotage |
| CloudTrail StopLogging | Anti-forensics (critical alert) |
| VPC flow log deletion | Evidence destruction |

### Log Protection

CloudTrail logs must be immutable:
- Store in a separate security account inaccessible to workload accounts
- Enable S3 Object Lock (WORM — Write Once Read Many)
- Restrict deletion permissions to break-glass accounts only
- Monitor for any attempt to modify or delete logs (this itself is a critical security event)

---

## GuardDuty — Threat Detection

### GuardDuty Capabilities

AWS GuardDuty is a managed threat detection service analyzing:
- VPC Flow Logs — Unusual traffic patterns, cryptocurrency mining, DNS exfiltration
- CloudTrail Events — Unusual API calls, credential compromise indicators
- DNS Logs — Connections to known malicious domains
- S3 Data Events — Unusual data access patterns
- EKS Audit Logs — Container-level threats

### GuardDuty Finding Categories

| Category | Examples |
|----------|---------|
| Reconnaissance | Port scanning, unusual API enumeration |
| Instance Compromise | Cryptocurrency mining, malware C2 communication |
| Account Compromise | API calls from Tor, unusual region activity |
| Bucket Compromise | S3 accessed from unusual IP, large data retrieval |
| Credential Compromise | Stolen credentials used from new location |

Enable GuardDuty in all accounts and all regions. Feed findings into Security Hub for centralized visibility. Automate response for high-severity findings (e.g., isolate compromised instance via Lambda).

---

## Cloud Security Posture Management (CSPM)

### CSPM Function

CSPM tools continuously assess cloud configuration against security benchmarks:
- Detect misconfigurations before they become breaches
- Enforce compliance with CIS Benchmarks, SOC 2, HIPAA, PCI DSS
- Track configuration drift from approved baselines
- Prioritize findings by risk severity and blast radius

### CSPM Tools

| Tool | Type | Strengths |
|------|------|-----------|
| AWS Security Hub | Native | Integrates GuardDuty, Inspector, Config |
| AWS Config | Native | Configuration compliance rules, remediation |
| Prowler | Open Source | CIS Benchmark checks, multi-framework |
| ScoutSuite | Open Source | Multi-cloud assessment |
| Wiz | Commercial | Agentless, graph-based risk analysis |
| Orca Security | Commercial | SideScanning, no agent deployment |
| Prisma Cloud | Commercial | Full lifecycle cloud security |

### CIS AWS Foundations Benchmark (Key Controls)

1. Avoid use of root account — monitor, alert, MFA only
2. MFA enabled on all IAM users with console access
3. Credentials unused for 90 days are disabled
4. Access keys rotated every 90 days
5. IAM password policy enforces complexity requirements
6. CloudTrail enabled in all regions with log validation
7. S3 bucket access logging enabled for CloudTrail bucket
8. VPC flow logs enabled on all VPCs
9. Default security groups restrict all traffic
10. No security groups allow unrestricted ingress (0.0.0.0/0) on administrative ports

---

## Container Security in the Cloud

### Container Image Security

- Use minimal base images (distroless, Alpine) to reduce attack surface
- Scan images for vulnerabilities in CI/CD (Trivy, Snyk Container, ECR scanning)
- Sign images and verify signatures before deployment (cosign, Notary)
- Use immutable tags or digests — never deploy `latest` in production
- Implement image provenance (SLSA framework) to verify build integrity

### Runtime Container Security

- Run containers as non-root (securityContext.runAsNonRoot: true)
- Drop all capabilities, add back only those required (drop: ALL, add: NET_BIND_SERVICE)
- Read-only root filesystem where possible
- Resource limits to prevent resource exhaustion attacks
- Network policies to restrict pod-to-pod communication
- Runtime monitoring (Falco, Sysdig) for anomalous container behavior

### EKS/ECS Security

- Use Fargate for workloads that do not need node-level access (reduced attack surface)
- Enable encryption for EKS secrets (KMS envelope encryption)
- Use IRSA (IAM Roles for Service Accounts) instead of node-level IAM roles
- Enable Pod Security Standards (restricted level for production)
- Audit Kubernetes API server logs via CloudTrail

---

## Cross-References

- `04_infrastructure/network_security.md` — Network-level cloud security controls
- `04_infrastructure/endpoint_security.md` — Host-level security for cloud instances
- `05_compliance/compliance_frameworks.md` — Cloud compliance requirements
- `07_secure_sdlc/devsecops.md` — Security in cloud CI/CD pipelines
- `Patterns/security_review_pattern.md` — Cloud security review process

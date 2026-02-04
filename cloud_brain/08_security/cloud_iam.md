# Cloud IAM — Least Privilege, Federation, Service Accounts, and Access Analysis

## Overview

Identity and Access Management (IAM) is the foundation of cloud security. Every API call to a cloud provider is authenticated and authorized through IAM. A misconfigured IAM policy is the most common root cause of cloud security breaches — more so than software vulnerabilities or sophisticated attacks. This module codifies IAM best practices: least privilege implementation, identity federation with SAML and OIDC, service account management, permission boundaries, Service Control Policies (SCPs), and IAM Access Analyzer for continuous permission auditing.

The IAM axiom: excessive permissions are the most dangerous cloud misconfiguration. An overprivileged identity is a dormant vulnerability waiting for credential compromise to activate it.

---

## Least Privilege Implementation

### Least Privilege Methodology

1. **Start with zero permissions** — every identity begins with no access
2. **Grant minimum required** — only the specific actions on specific resources needed for the task
3. **Use conditions** — restrict by source IP, time, MFA, tags, encryption status
4. **Review regularly** — permissions that were once needed may no longer be
5. **Remove unused** — any permission not used in 90 days should be investigated

### IAM Policy Design Patterns

**Resource-scoped policy (recommended):**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:Query",
      "dynamodb:UpdateItem"
    ],
    "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/orders",
    "Condition": {
      "ForAllValues:StringEquals": {
        "dynamodb:LeadingKeys": ["${aws:PrincipalTag/team}"]
      }
    }
  }]
}
```

**Service role for Lambda:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": "arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/order-service:*"
    },
    {
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:Query"],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/orders"
    },
    {
      "Effect": "Allow",
      "Action": ["sqs:SendMessage"],
      "Resource": "arn:aws:sqs:us-east-1:123456789012:order-notifications"
    }
  ]
}
```

### Common IAM Anti-Patterns

| Anti-Pattern | Risk | Correct Approach |
|-------------|------|-----------------|
| `"Action": "*"` | Full access to all services | List specific actions needed |
| `"Resource": "*"` | Access to all resources | Scope to specific ARNs |
| Inline policies on users | Unmanageable at scale | Use managed policies on groups/roles |
| Long-lived access keys | Keys can be compromised and persisted | Use IAM roles with temporary credentials |
| Shared credentials | No accountability, no audit trail | Individual identities for every human and service |
| No MFA on privileged accounts | Single-factor compromise = full access | Require MFA for console and sensitive API calls |
| Root account usage | Unrestricted access, no audit | Lock root, use IAM users/roles |

---

## Identity Federation — SAML and OIDC

### SAML 2.0 Federation

```
User → Corporate IdP (Okta, Azure AD) → AWS STS (AssumeRoleWithSAML) → AWS Role
                                          SAML assertion       Temporary credentials
```

**Implementation:**
1. Configure SAML identity provider in AWS IAM
2. Create IAM roles with trust policy allowing SAML provider
3. Map IdP groups to IAM roles (admin group → AdminRole, dev group → DevRole)
4. Users authenticate through IdP, receive temporary AWS credentials
5. No long-lived AWS credentials needed for human users

### OIDC Federation (Web Identity)

Used for workload identity — Kubernetes pods, GitHub Actions, other OIDC providers:

```
GitHub Actions → AWS STS (AssumeRoleWithWebIdentity) → AWS Role → Deploy
                  OIDC token from GitHub         Temporary credentials
```

**EKS IRSA (IAM Roles for Service Accounts):**
```yaml
# Kubernetes ServiceAccount with IAM role annotation
apiVersion: v1
kind: ServiceAccount
metadata:
  name: order-service
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/order-service-role
```

IRSA provides pod-level IAM permissions — each pod gets only the permissions its ServiceAccount needs, rather than the node-level IAM role.

---

## Service Account Management

### Service Account Best Practices

| Practice | Implementation |
|----------|---------------|
| One role per service | Each Lambda function, ECS task, K8s pod gets its own IAM role |
| No long-lived keys | Use IAM roles (STS temporary credentials), never access keys |
| Rotate keys immediately if used | If access keys are necessary, rotate every 90 days maximum |
| Audit key usage | CloudTrail tracks all API calls; unused keys indicate over-provisioning |
| Separate environments | Different roles for dev/staging/production; no cross-environment access |

### Machine Identity Lifecycle

```
Create Role → Attach Minimal Policy → Deploy Service → Monitor Usage →
  Right-size → Review Quarterly → Decommission with Service
```

---

## Permission Boundaries

Permission boundaries define the maximum permissions an IAM entity can have. They do not grant permissions — they limit what attached policies can grant.

**Use case: Delegated administration**
Allow a team to create IAM roles for their services, but ensure those roles cannot exceed certain permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": [
        "iam:CreateUser",
        "iam:CreateRole",
        "organizations:*",
        "account:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": "*",
      "Resource": "arn:aws:s3:::company-critical-*"
    }
  ]
}
```

### Effective Permissions

Effective permissions = Intersection of:
- Identity-based policies (attached to user/role)
- Permission boundaries (maximum allowed)
- SCPs (organizational limits)
- Session policies (assume role session limits)
- Resource-based policies (S3 bucket policy, KMS key policy)

If any layer denies an action, it is denied regardless of what other layers allow.

---

## Service Control Policies (SCPs)

SCPs are organization-level policies that define the maximum permissions for accounts:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyRegionsOutsideApproved",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": ["us-east-1", "us-west-2", "eu-west-1"]
        },
        "ArnNotLike": {
          "aws:PrincipalArn": "arn:aws:iam::*:role/OrganizationAdmin"
        }
      }
    },
    {
      "Sid": "DenyRootAccount",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringLike": { "aws:PrincipalArn": "arn:aws:iam::*:root" }
      }
    },
    {
      "Sid": "RequireIMDSv2",
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "StringNotEquals": { "ec2:MetadataHttpTokens": "required" }
      }
    }
  ]
}
```

### SCP Strategy

| SCP | Purpose |
|-----|---------|
| Region restriction | Limit operations to approved regions |
| Root account denial | Prevent root account usage |
| Critical service protection | Prevent deletion of CloudTrail, Config, GuardDuty |
| IMDSv2 enforcement | Require Instance Metadata Service v2 |
| Encryption enforcement | Deny unencrypted storage creation |
| Tag enforcement | Require tags on resource creation |
| Network protection | Prevent public access configurations |

---

## IAM Access Analyzer

### Capabilities

IAM Access Analyzer identifies resources shared with external entities:
- S3 buckets accessible from outside the account
- IAM roles assumable from external accounts
- KMS keys accessible from external accounts
- Lambda functions invocable from external accounts
- SQS queues accessible from external accounts

### Access Analyzer Policy Validation

Before deploying IAM policies, validate them:
```bash
aws accessanalyzer validate-policy \
  --policy-type IDENTITY_POLICY \
  --policy-document file://policy.json
```

Validation checks:
- Security warnings (overly permissive actions)
- Errors (invalid syntax, non-existent actions)
- Suggestions (more specific resource ARNs)

### Unused Access Analysis

IAM Access Analyzer identifies:
- Unused roles (no session created in 90+ days)
- Unused permissions (granted but never used)
- Unused access keys (not used in 90+ days)

**Action:** Review quarterly. Remove unused roles and permissions. Disable unused access keys.

---

## Multi-Account IAM Strategy

### AWS Organizations Account Structure

```
Management Account (billing, SCPs)
├── Security Account (GuardDuty, Security Hub, CloudTrail aggregation)
├── Log Archive Account (centralized logging, immutable)
├── Shared Services Account (CI/CD, artifact registry, shared tools)
├── Production OU
│   ├── Production Workload Account 1
│   └── Production Workload Account 2
├── Staging OU
│   └── Staging Account
└── Development OU
    ├── Dev Account 1
    └── Sandbox Account
```

### Cross-Account Access

Use IAM roles with cross-account trust, not shared credentials:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::111111111111:role/DeploymentPipeline"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": { "sts:ExternalId": "unique-external-id" }
    }
  }]
}
```

---

## Cross-References

- `08_security/data_protection.md` — Encryption and secrets management
- `08_security/network_security.md` — Network-level cloud security
- `05_infrastructure_as_code/iac_fundamentals.md` — IaC IAM configuration
- `04_containers/kubernetes.md` — K8s RBAC and IRSA
- `03_serverless/serverless_architecture.md` — Lambda IAM roles

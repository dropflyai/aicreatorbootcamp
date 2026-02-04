# Data Protection — KMS, Encryption, Secrets Management, and Data Classification

## Overview

Data protection in the cloud spans encryption at rest and in transit, key management, secrets management, data classification, and data loss prevention. Cloud providers offer managed services for each of these capabilities, but the customer is responsible for configuring and using them correctly. This module codifies encryption strategies using AWS KMS, encryption patterns for data at rest and in transit, secrets management with HashiCorp Vault and AWS Secrets Manager, data classification frameworks, and DLP implementation.

The data protection axiom: encryption without key management is security theater. The security of encrypted data depends entirely on the security of the encryption keys.

---

## AWS Key Management Service (KMS)

### KMS Key Types

| Key Type | Management | Use Case | Cost |
|----------|-----------|----------|------|
| AWS Managed Key | AWS manages lifecycle | Default encryption for AWS services | Free or low cost |
| Customer Managed Key (CMK) | Customer controls policy, rotation, deletion | Custom encryption policies, cross-account, audit | $1/month + per-API-call |
| Customer Provided Key (SSE-C) | Customer provides key per request | Regulatory requirement for customer key control | No KMS cost, operational overhead |
| CloudHSM | Dedicated HSM hardware | FIPS 140-2 Level 3, regulatory compliance | ~$1.50/hour per HSM |

### KMS Key Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM User Permissions",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow key administrators",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/SecurityAdmin" },
      "Action": [
        "kms:Create*", "kms:Describe*", "kms:Enable*", "kms:List*",
        "kms:Put*", "kms:Update*", "kms:Revoke*", "kms:Disable*",
        "kms:Get*", "kms:Delete*", "kms:TagResource", "kms:UntagResource",
        "kms:ScheduleKeyDeletion", "kms:CancelKeyDeletion"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Allow key usage",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/OrderService" },
      "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
      "Resource": "*",
      "Condition": {
        "StringEquals": { "kms:ViaService": "dynamodb.us-east-1.amazonaws.com" }
      }
    }
  ]
}
```

### Envelope Encryption

KMS uses envelope encryption for efficiency: a data key encrypts the data, and the KMS key encrypts the data key.

```
KMS Master Key → Encrypts → Data Key (plaintext + encrypted)
Data Key (plaintext) → Encrypts → Your Data
Store: Encrypted Data + Encrypted Data Key
Delete: Plaintext Data Key (never stored)

Decryption:
KMS Master Key → Decrypts → Encrypted Data Key → Plaintext Data Key
Plaintext Data Key → Decrypts → Your Data
```

### Key Rotation

| Rotation Type | Frequency | Method |
|--------------|-----------|--------|
| Automatic (KMS managed) | Annual (configurable) | KMS creates new key material, keeps old for decryption |
| Manual | As needed | Create new key, re-encrypt data, update references |
| Secrets Manager rotation | 30-90 days | Lambda function rotates the secret value |

---

## Encryption at Rest

### AWS Service Encryption Options

| Service | Default Encryption | Customer CMK | Notes |
|---------|-------------------|-------------|-------|
| S3 | SSE-S3 (AES-256) | SSE-KMS with CMK | Enable by default for all buckets |
| EBS | Optional (enable!) | SSE-KMS with CMK | Enable default encryption at account level |
| RDS | Optional (enable!) | SSE-KMS with CMK | Must be enabled at creation, cannot change later |
| DynamoDB | Always encrypted | Optional CMK | Encryption at rest always on (AWS managed by default) |
| EFS | Optional | SSE-KMS with CMK | Enable at creation |
| Lambda env vars | SSE-KMS (AWS managed) | Optional CMK | Encrypted by default, CMK for additional control |
| SQS | Optional | SSE-KMS with CMK | Enable for sensitive messages |
| CloudWatch Logs | Optional | SSE-KMS with CMK | Enable for compliance requirements |

### Encryption Best Practices

1. **Enable encryption for ALL data stores** — there is no valid reason for unencrypted data at rest in the cloud
2. **Use customer-managed CMKs** for sensitive data — provides audit trail and key access control
3. **Enable automatic key rotation** for all CMKs
4. **Separate keys by data classification** — different keys for public, internal, confidential, restricted data
5. **Monitor key usage** via CloudTrail — detect unauthorized encryption/decryption
6. **Key deletion protection** — schedule deletion with minimum 7-day waiting period

---

## Encryption in Transit

### TLS Configuration

| Setting | Requirement |
|---------|------------|
| Minimum TLS version | TLS 1.2 (TLS 1.3 preferred) |
| Cipher suites | AEAD only (AES-GCM, ChaCha20-Poly1305) |
| Certificate management | ACM (automated) or Let's Encrypt (automated) |
| HSTS | Enable with preload for web applications |
| mTLS | Use for service-to-service communication in zero-trust |

### Service-to-Service Encryption

| Pattern | Implementation |
|---------|---------------|
| ALB → ECS | TLS termination at ALB, re-encrypt to backend (or end-to-end TLS) |
| Service mesh (Istio/Linkerd) | Automatic mTLS between all services |
| VPC internal | PrivateLink for AWS service access, VPC endpoints |
| Cross-region | VPC peering/Transit Gateway with encryption |
| API Gateway → Lambda | Always encrypted (AWS managed) |

---

## Secrets Management

### HashiCorp Vault

Vault is the industry standard for centralized secrets management:

**Capabilities:**
| Feature | Description |
|---------|-------------|
| Static secrets | Store and retrieve key-value secrets with versioning |
| Dynamic secrets | Generate short-lived credentials on demand (database, AWS, PKI) |
| Encryption as a service | Transit engine — encrypt/decrypt without exposing keys |
| PKI | Generate and manage TLS certificates |
| Authentication | Multiple auth methods (OIDC, Kubernetes, AWS IAM, AppRole) |
| Audit logging | Every secret access logged with full audit trail |
| Lease management | Secrets have TTL and are automatically revoked |

### AWS Secrets Manager

```python
import boto3
import json

client = boto3.client('secretsmanager')

def get_secret(secret_name):
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

# Automatic rotation with Lambda
# Secrets Manager calls the Lambda function on schedule to rotate the secret
```

### Secrets Management Comparison

| Feature | AWS Secrets Manager | AWS SSM Parameter Store | HashiCorp Vault |
|---------|-------------------|-----------------------|----------------|
| Dynamic secrets | No | No | Yes |
| Automatic rotation | Yes (via Lambda) | No | Yes (built-in) |
| Multi-cloud | No | No | Yes |
| Cost | $0.40/secret/month | Free (standard) / $0.05/advanced | Self-hosted or Vault Cloud |
| Encryption | KMS | KMS | Transit engine |
| Audit | CloudTrail | CloudTrail | Built-in audit log |

### Secrets Best Practices

1. **Never hardcode secrets** in source code, configuration files, or environment variables checked into Git
2. **Use short-lived credentials** — dynamic secrets or temporary STS credentials
3. **Rotate regularly** — 90 days maximum for static secrets, shorter for sensitive ones
4. **Audit all access** — every secret retrieval must be logged
5. **Separate by environment** — different secrets for dev/staging/production, different access policies
6. **Least privilege access** — only the service that needs a secret can read it

---

## Data Classification

### Classification Framework

| Level | Label | Description | Controls Required |
|-------|-------|-------------|-------------------|
| 1 | Public | No harm if disclosed | Integrity controls only |
| 2 | Internal | Minor harm if disclosed | Authentication, basic encryption |
| 3 | Confidential | Significant harm if disclosed | Encryption at rest/transit, access logging, need-to-know |
| 4 | Restricted | Severe harm if disclosed | Field-level encryption, MFA, DLP, strict audit, data masking |

### Automated Classification

| Tool | Approach |
|------|----------|
| AWS Macie | ML-based PII detection in S3 |
| AWS Comprehend | NLP for sensitive data identification |
| DLP solutions (Netskope, Symantec) | Content inspection across services |
| Custom regex scanning | Pattern matching for SSN, credit cards, health data |

---

## Data Loss Prevention (DLP)

### DLP Implementation

| Layer | Control | Tool |
|-------|---------|------|
| Network | Inspect outbound traffic for sensitive data patterns | WAF, proxy, CASB |
| Endpoint | Monitor clipboard, file transfers, screenshots | MDM, DLP agent |
| Cloud | Monitor S3, databases, SaaS for sensitive data exposure | Macie, CSPM |
| Application | Prevent sensitive data in logs, error messages, API responses | Code review, SAST |
| Email | Scan outbound email for sensitive attachments/content | Email gateway DLP |

### DLP Best Practices

- Classify data before applying DLP policies (you cannot protect what you have not identified)
- Start with monitoring mode (detect and alert) before enforcement mode (block)
- Focus on high-risk data (PII, PCI, PHI) before expanding scope
- Integrate DLP alerts into incident response workflow
- Test DLP rules thoroughly to minimize false positives blocking legitimate operations

---

## Cross-References

- `08_security/cloud_iam.md` — IAM for key access control
- `08_security/network_security.md` — Network encryption
- `05_infrastructure_as_code/iac_fundamentals.md` — Encryption in IaC
- `04_containers/container_fundamentals.md` — Container secrets
- `06_reliability/high_availability.md` — Cross-region key replication

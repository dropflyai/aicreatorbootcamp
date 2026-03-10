# IaC Patterns — Module Libraries, Drift Detection, Policy as Code, and Testing

## Overview

Infrastructure as Code patterns address the challenges that emerge when IaC scales beyond a single team or project. Module libraries provide reusable, tested infrastructure components. Environment promotion ensures changes flow safely from development to production. Drift detection identifies unauthorized manual changes. Policy as Code enforces organizational standards before infrastructure is provisioned. Terratest provides automated verification that infrastructure actually works. This module codifies these patterns for mature IaC operations.

The pattern axiom: IaC without governance is automated chaos. The ability to provision infrastructure quickly makes governance more important, not less — mistakes also happen quickly.

---

## Module Library Architecture

### Internal Module Registry

A module library is an organization's collection of pre-built, tested, and approved Terraform modules that encode organizational standards:

```
terraform-modules/           # Central module repository
├── networking/
│   ├── vpc/                # VPC with standard subnets, NACLs, flow logs
│   ├── security-group/     # Security group with audit logging
│   └── transit-gateway/    # Multi-VPC connectivity
├── compute/
│   ├── ecs-service/        # ECS Fargate service with ALB, autoscaling
│   ├── lambda-function/    # Lambda with X-Ray, logging, IAM
│   └── ec2-instance/       # EC2 with hardened AMI, SSM, CloudWatch
├── data/
│   ├── rds-postgres/       # RDS PostgreSQL with encryption, backups, monitoring
│   ├── dynamodb-table/     # DynamoDB with auto-scaling, encryption
│   ├── s3-bucket/          # S3 with encryption, versioning, lifecycle
│   └── elasticache-redis/  # ElastiCache with encryption, auth
├── security/
│   ├── iam-role/           # IAM role with permission boundaries
│   ├── kms-key/            # KMS key with rotation, alias
│   └── secrets-manager/    # Secrets Manager with rotation Lambda
└── observability/
    ├── cloudwatch-alarms/  # Standard alarm configurations
    ├── log-group/          # Log group with retention, encryption
    └── dashboard/          # CloudWatch dashboard templates
```

### Module Versioning

```hcl
# Consumer uses specific module version
module "vpc" {
  source  = "git::https://github.com/org/terraform-modules.git//networking/vpc?ref=v2.3.1"
  # OR from private registry:
  source  = "app.terraform.io/myorg/vpc/aws"
  version = "~> 2.3"
}
```

**Versioning strategy:**
- Semantic versioning: MAJOR.MINOR.PATCH
- MAJOR: Breaking changes (removed variables, changed behavior)
- MINOR: New features, backward compatible
- PATCH: Bug fixes, documentation
- Module consumers pin to MINOR: `~> 2.3` allows 2.3.x but not 2.4.0

### Module Development Lifecycle

```
Design → Implement → Test → Review → Release → Consume → Maintain
  Requirements  HCL code   Terratest  PR review  Git tag   Pin version  Update, patch
  Interface     Variables  Examples   Security   Registry  Apply        Deprecate
  Documentation Outputs    CI/CD      Standards  Changelog Monitor      Retire
```

---

## Environment Promotion

### Promotion Pipeline

```
Feature Branch → Dev Environment → Staging → Production
  terraform plan   terraform apply   terraform apply  terraform apply
  automated tests  integration tests  smoke tests      monitored deploy
  PR review        ephemeral or shared persistent      persistent
```

### Promotion Strategies

**Same code, different variables:**
```
environments/
├── dev/
│   ├── main.tf          # Same module references
│   ├── terraform.tfvars # Dev-specific values (smaller instances, fewer replicas)
│   └── backend.tf       # Dev state backend
├── staging/
│   ├── main.tf
│   ├── terraform.tfvars # Staging values (production-like but smaller)
│   └── backend.tf
└── production/
    ├── main.tf
    ├── terraform.tfvars # Production values (full scale)
    └── backend.tf
```

**Promotion gates:**
| Gate | Check | Failure Action |
|------|-------|---------------|
| Pre-plan | Policy as Code (Sentinel/OPA) | Block apply |
| Post-plan | Cost estimate within budget | Require approval |
| Post-apply (dev) | Automated integration tests pass | Block staging promotion |
| Post-apply (staging) | Smoke tests + security scan pass | Block production promotion |
| Post-apply (prod) | Health checks + monitoring | Automatic rollback |

---

## Drift Detection

### What is Drift?

Drift occurs when the actual state of infrastructure diverges from the desired state defined in code. Common causes:
- Manual changes in the AWS console (the most frequent cause)
- Changes by other automation tools
- AWS service auto-modifications (e.g., security group rule normalization)
- Resource modifications outside Terraform's knowledge

### Detecting Drift

**terraform plan as drift detection:**
```bash
# Schedule this in CI/CD (e.g., daily)
terraform plan -detailed-exitcode
# Exit code 0: No changes (no drift)
# Exit code 1: Error
# Exit code 2: Changes detected (drift found)
```

**AWS Config for continuous drift detection:**
- AWS Config rules monitor configuration changes
- Alert when resources deviate from expected configuration
- Integration with CloudTrail for audit trail of who made the change

**Drift detection tools:**
| Tool | Approach |
|------|----------|
| `terraform plan` (scheduled) | Compare state to code; detects all drift |
| AWS Config | Continuous monitoring of AWS resource configuration |
| Driftctl (snyk) | Scan cloud resources, compare to Terraform state |
| Spacelift | Commercial IaC platform with built-in drift detection |
| env0 | Commercial IaC platform with drift detection and alerts |

### Responding to Drift

| Scenario | Response |
|----------|----------|
| Drift matches intended code change | Normal — apply code changes |
| Drift from manual emergency change | Import change into Terraform, document in code |
| Drift from unauthorized manual change | Revert with `terraform apply` (code is source of truth) |
| Drift reveals security issue | Immediate remediation, investigate root cause |

### Preventing Drift

- Restrict console write access (read-only for most users)
- Use SCPs to deny manual changes to Terraform-managed resources (by tag)
- Implement change management process requiring IaC PRs
- Run drift detection frequently (daily minimum)
- Alert on detected drift (Slack, PagerDuty)

---

## Policy as Code — OPA and Sentinel

### Open Policy Agent (OPA) with Terraform

OPA evaluates Terraform plans against organizational policies before apply:

```rego
# policy/terraform.rego

# Deny unencrypted S3 buckets
deny[msg] {
  resource := input.planned_values.root_module.resources[_]
  resource.type == "aws_s3_bucket"
  not has_encryption(resource)
  msg := sprintf("S3 bucket '%s' must have encryption enabled", [resource.name])
}

has_encryption(resource) {
  resource.values.server_side_encryption_configuration
}

# Deny public security groups
deny[msg] {
  resource := input.planned_values.root_module.resources[_]
  resource.type == "aws_security_group_rule"
  resource.values.cidr_blocks[_] == "0.0.0.0/0"
  resource.values.type == "ingress"
  msg := sprintf("Security group rule '%s' allows ingress from 0.0.0.0/0", [resource.name])
}

# Require tags on all resources
deny[msg] {
  resource := input.planned_values.root_module.resources[_]
  not resource.values.tags["Environment"]
  msg := sprintf("Resource '%s' of type '%s' must have an 'Environment' tag",
    [resource.name, resource.type])
}
```

### HashiCorp Sentinel

Sentinel is HashiCorp's policy-as-code framework for Terraform Cloud/Enterprise:

```python
# sentinel/require-encryption.sentinel

import "tfplan/v2" as tfplan

# Require all S3 buckets to have encryption
s3_buckets = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_s3_bucket" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

encryption_check = rule {
  all s3_buckets as _, bucket {
    bucket.change.after.server_side_encryption_configuration is not null
  }
}

main = rule {
  encryption_check
}
```

---

## Terratest — Infrastructure Testing

### Test Architecture

```go
// test/vpc_test.go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/gruntwork-io/terratest/modules/aws"
    "github.com/stretchr/testify/assert"
)

func TestVpcModule(t *testing.T) {
    t.Parallel()

    terraformOptions := &terraform.Options{
        TerraformDir: "../modules/vpc",
        Vars: map[string]interface{}{
            "project_name":       "test",
            "environment":        "test",
            "vpc_cidr":           "10.99.0.0/16",
            "availability_zones": []string{"us-east-1a", "us-east-1b"},
        },
    }

    // Clean up after test
    defer terraform.Destroy(t, terraformOptions)

    // Apply Terraform
    terraform.InitAndApply(t, terraformOptions)

    // Validate outputs
    vpcId := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcId)

    // Validate VPC exists in AWS
    vpc := aws.GetVpcById(t, vpcId, "us-east-1")
    assert.Equal(t, "10.99.0.0/16", vpc.CidrBlock)

    // Validate subnets created
    subnets := terraform.OutputList(t, terraformOptions, "private_subnet_ids")
    assert.Equal(t, 2, len(subnets))

    // Validate DNS settings
    assert.True(t, vpc.EnableDnsHostnames)
    assert.True(t, vpc.EnableDnsSupport)
}
```

### Testing Strategy

| Test Type | What it Tests | Speed | Cost |
|-----------|--------------|-------|------|
| Static analysis | HCL syntax, policy compliance | Seconds | Free |
| Unit test (plan) | Plan output validation without apply | Seconds | Free |
| Integration test (Terratest) | Real infrastructure provisioning | Minutes | Cloud costs |
| Contract test | Module interface compatibility | Seconds | Free |
| End-to-end test | Full stack deployment and validation | 10+ minutes | Cloud costs |

### CI/CD Integration

```yaml
# GitHub Actions for Terraform
terraform-ci:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: hashicorp/setup-terraform@v3
    - run: terraform fmt -check -recursive  # Format check
    - run: terraform init
    - run: terraform validate              # Syntax validation
    - run: terraform plan -out=plan.tfplan
    - run: conftest test plan.json         # OPA policy check
    - run: infracost breakdown --path plan.json  # Cost estimate
    - run: terraform apply plan.tfplan     # Apply (production requires approval)
```

---

## Cross-References

- `05_infrastructure_as_code/iac_fundamentals.md` — Terraform basics
- `05_infrastructure_as_code/platform_engineering.md` — Platform engineering
- `06_reliability/site_reliability.md` — SRE for infrastructure
- `08_security/cloud_iam.md` — IAM for IaC pipelines
- `07_cost/cost_management.md` — Cost governance for IaC

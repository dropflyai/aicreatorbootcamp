# Infrastructure as Code Fundamentals — Terraform Deep Dive

## Overview

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes. Terraform, created by HashiCorp, is the dominant multi-cloud IaC tool, using the HashiCorp Configuration Language (HCL) to define infrastructure declaratively. This module provides a deep technical treatment of Terraform: provider architecture, resource management, modules for reusability, state management, workspaces for environment separation, and remote backends for team collaboration.

The IaC axiom: if it is not in code, it does not exist. Manual infrastructure changes are undocumented, unreproducible, and unreviewable. Every piece of infrastructure must be defined in version-controlled code.

---

## Terraform Architecture

### Core Workflow

```
Write → Plan → Apply → State
 HCL     diff    execute   record
 config   preview  changes   actual
                              state
```

**terraform init:** Initialize the working directory, download providers and modules.
**terraform plan:** Compare desired state (code) with actual state (state file), produce an execution plan.
**terraform apply:** Execute the plan, creating/modifying/destroying resources.
**terraform destroy:** Remove all resources managed by this configuration.

### Provider Architecture

Providers are plugins that interact with cloud APIs, SaaS providers, and other services:

```hcl
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "terraform"
      Project     = var.project_name
    }
  }
}
```

### Resource Definition

```hcl
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "${var.project_name}-private-${var.availability_zones[count.index]}"
    Type = "private"
  }
}
```

### Data Sources

Data sources read information from existing infrastructure (not managed by this Terraform configuration):

```hcl
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
```

---

## Modules — Reusable Infrastructure Components

### Module Structure

```
modules/
├── vpc/
│   ├── main.tf         # Resource definitions
│   ├── variables.tf    # Input variables
│   ├── outputs.tf      # Output values
│   └── README.md       # Module documentation
├── ecs-service/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── iam.tf
└── rds/
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
```

### Module Usage

```hcl
module "vpc" {
  source = "./modules/vpc"

  project_name       = var.project_name
  environment        = var.environment
  vpc_cidr           = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

module "order_service" {
  source = "./modules/ecs-service"

  service_name    = "order-service"
  cluster_id      = aws_ecs_cluster.main.id
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnet_ids
  container_image = "${var.ecr_registry}/order-service:${var.image_tag}"
  container_port  = 3000
  desired_count   = var.environment == "production" ? 3 : 1

  environment_variables = {
    DATABASE_URL = module.rds.connection_string
    ENVIRONMENT  = var.environment
  }
}
```

### Module Best Practices

| Practice | Rationale |
|----------|-----------|
| Pin module versions | Prevent unexpected changes from upstream module updates |
| Minimal input variables | Expose only what varies; use sensible defaults for the rest |
| Output everything useful | Consumers should not need to modify the module to get needed values |
| No hardcoded values | Every value that might change should be a variable |
| Validate inputs | Use `validation` blocks to catch invalid configurations early |
| Document thoroughly | README with examples, variable descriptions, output descriptions |

---

## State Management

### State File Purpose

The state file (`terraform.tfstate`) is a JSON document that maps Terraform resource definitions to real-world infrastructure. It tracks:
- Resource IDs (e.g., `vpc-0123456789abcdef0`)
- Resource attributes (CIDR blocks, ARNs, DNS names)
- Resource dependencies
- Metadata (provider versions, Terraform version)

### Remote State Backends

**Never store state locally for shared infrastructure.** Use a remote backend:

```hcl
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state"
    key            = "production/order-service/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"  # State locking prevents concurrent modifications
    kms_key_id     = "arn:aws:kms:us-east-1:123456789:key/..."
  }
}
```

### State Locking

State locking prevents two team members from running `terraform apply` simultaneously, which would corrupt the state:
- S3 backend uses DynamoDB for locking
- Terraform Cloud has built-in locking
- GCS backend has built-in locking
- Always verify locking is configured; concurrent state modifications can cause resource orphaning

### State Operations

| Operation | Use Case | Command |
|-----------|----------|---------|
| Import | Bring existing resource under Terraform management | `terraform import aws_vpc.main vpc-12345` |
| Move | Rename a resource without destroying/recreating | `terraform state mv aws_vpc.old aws_vpc.new` |
| Remove | Stop managing a resource without destroying it | `terraform state rm aws_vpc.main` |
| Pull | Download remote state for inspection | `terraform state pull` |
| Replace | Force recreation of a resource | `terraform apply -replace=aws_instance.web` |

---

## Workspaces — Environment Separation

### Workspace Strategies

**Terraform Workspaces (built-in):**
```bash
terraform workspace new staging
terraform workspace new production
terraform workspace select staging
terraform apply -var-file="environments/staging.tfvars"
```

Each workspace has its own state file but shares the same code. Use `terraform.workspace` to reference the current workspace in configuration.

**Directory-based separation (recommended for significant environment differences):**
```
infrastructure/
├── modules/           # Shared modules
├── staging/
│   ├── main.tf       # Staging-specific configuration
│   ├── backend.tf    # Staging state backend
│   └── terraform.tfvars
└── production/
    ├── main.tf       # Production-specific configuration
    ├── backend.tf    # Production state backend
    └── terraform.tfvars
```

### Environment Variable Management

```hcl
# variables.tf
variable "environment" {
  type        = string
  description = "Deployment environment"
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be staging or production."
  }
}

# Environment-specific sizing
locals {
  instance_config = {
    staging = {
      instance_type = "t3.small"
      min_size      = 1
      max_size      = 3
      multi_az      = false
    }
    production = {
      instance_type = "t3.large"
      min_size      = 3
      max_size      = 10
      multi_az      = true
    }
  }
  config = local.instance_config[var.environment]
}
```

---

## Advanced Terraform Patterns

### Dynamic Blocks

```hcl
resource "aws_security_group" "web" {
  name   = "${var.project_name}-web-sg"
  vpc_id = aws_vpc.main.id

  dynamic "ingress" {
    for_each = var.allowed_ports
    content {
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
      cidr_blocks = ingress.value.cidr_blocks
      description = ingress.value.description
    }
  }
}
```

### Lifecycle Rules

```hcl
resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type

  lifecycle {
    create_before_destroy = true  # Create replacement before destroying original
    prevent_destroy       = true  # Prevent accidental deletion
    ignore_changes        = [ami] # Don't update when AMI changes (managed separately)
  }
}
```

### Terraform Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `cidrsubnet()` | Calculate subnet CIDR from VPC CIDR | `cidrsubnet("10.0.0.0/16", 8, 1)` → `"10.0.1.0/24"` |
| `lookup()` | Safe map lookup with default | `lookup(var.tags, "Name", "default")` |
| `coalesce()` | First non-empty value | `coalesce(var.custom_name, "${var.env}-default")` |
| `templatefile()` | Render template with variables | `templatefile("userdata.sh.tpl", { env = var.env })` |
| `try()` | Return first expression that succeeds | `try(var.custom_config.value, "default")` |
| `jsonencode()` | Convert HCL to JSON | IAM policy documents |

---

## Terraform Security

### Security Best Practices

| Practice | Implementation |
|----------|---------------|
| Never commit state files | `.gitignore` includes `*.tfstate*` |
| Encrypt state at rest | S3 backend with SSE-KMS encryption |
| Encrypt state in transit | HTTPS backend connections |
| Sensitive variables | Mark with `sensitive = true`; use environment variables or Vault |
| Least privilege for Terraform | IAM role with only required permissions |
| Plan review | Always review `terraform plan` output before `terraform apply` |
| State access control | Restrict S3 bucket access to authorized users/roles |
| Audit trail | CloudTrail logging on state bucket operations |

---

## Cross-References

- `05_infrastructure_as_code/iac_patterns.md` — Advanced patterns and testing
- `05_infrastructure_as_code/platform_engineering.md` — Internal platforms
- `06_reliability/high_availability.md` — HA infrastructure with IaC
- `08_security/cloud_iam.md` — IAM for Terraform
- `07_cost/cost_architecture.md` — Cost-aware IaC

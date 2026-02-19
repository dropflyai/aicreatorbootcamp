# AWS SSM Recipe -- Parameter Store and Secrets

> Practical recipes for managing secrets and configuration with
> AWS Systems Manager Parameter Store.
> Copy, adapt, ship.

---

## Table of Contents

1. [Parameter Store vs Secrets Manager](#parameter-store-vs-secrets-manager)
2. [IAM Policies for Access](#iam-policies)
3. [Parameter Hierarchies](#parameter-hierarchies)
4. [Secret Rotation with Lambda](#secret-rotation)
5. [Local Development Patterns](#local-development)
6. [Fetching Parameters in Application Code](#application-code)
7. [CI/CD Integration](#cicd-integration)

---

## Parameter Store vs Secrets Manager

Both store sensitive values. Choose based on your needs.

| Feature                  | Parameter Store              | Secrets Manager              |
|--------------------------|------------------------------|------------------------------|
| Cost                     | Free (Standard tier)         | $0.40/secret/month           |
| Max size                 | 4 KB (Standard), 8 KB (Adv) | 64 KB                        |
| Automatic rotation       | No (manual with Lambda)      | Yes (built-in for RDS, etc.) |
| Cross-account sharing    | Yes (via RAM)                | Yes (resource policy)        |
| Versioning               | Yes                          | Yes                          |
| Encryption               | Optional (KMS)               | Always (KMS)                 |
| Parameter hierarchies    | Yes (/app/prod/db_url)       | No                           |
| Audit trail              | CloudTrail                   | CloudTrail                   |

### When to use which

**Use Parameter Store when:**
- You need a free solution for config values.
- You want hierarchical organization (/app/env/key).
- Values are non-rotating (feature flags, URLs, static config).

**Use Secrets Manager when:**
- You need automatic rotation (database passwords, API keys).
- You are managing RDS, Redshift, or DocumentDB credentials.
- You need cross-account secret sharing with fine-grained policies.

**Hybrid approach (recommended):**
- Parameter Store for non-sensitive config (feature flags, URLs, settings).
- Secrets Manager for credentials that need rotation (DB passwords, API keys).
- Reference Secrets Manager values from Parameter Store using the
  `/aws/reference/secretsmanager/` prefix.

---

## IAM Policies

### Read-only access to a parameter path

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath"
      ],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/myapp/prod/*"
    },
    {
      "Effect": "Allow",
      "Action": "kms:Decrypt",
      "Resource": "arn:aws:kms:us-east-1:123456789012:key/key-id",
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "ssm.us-east-1.amazonaws.com"
        }
      }
    }
  ]
}
```

### Write access (for CI/CD or admin)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:PutParameter",
        "ssm:DeleteParameter",
        "ssm:GetParameter",
        "ssm:GetParameters",
        "ssm:GetParametersByPath",
        "ssm:AddTagsToResource"
      ],
      "Resource": "arn:aws:ssm:us-east-1:123456789012:parameter/myapp/*"
    }
  ]
}
```

### Principle of least privilege

- Scope by path prefix (`/myapp/prod/*` not `/myapp/*`).
- Separate read and write policies.
- Use conditions to restrict KMS key usage to SSM context.
- Tag parameters and use tag-based conditions for team access.

---

## Parameter Hierarchies

Organize parameters with path-based naming. This maps naturally to
app/environment/service patterns.

### Recommended hierarchy

```
/myapp/
  ├── shared/                    # Values used across all environments
  │   ├── region                 # us-east-1
  │   └── log_level              # info
  ├── prod/
  │   ├── db_url                 # postgres://prod-host:5432/myapp
  │   ├── db_password            # (SecureString)
  │   ├── api_key                # (SecureString)
  │   ├── redis_url              # redis://prod-redis:6379
  │   └── feature_flags/
  │       ├── dark_mode          # true
  │       └── new_onboarding     # false
  ├── staging/
  │   ├── db_url
  │   ├── db_password
  │   └── api_key
  └── dev/
      ├── db_url
      └── db_password
```

### CLI operations

```bash
# Create a parameter
aws ssm put-parameter \
  --name "/myapp/prod/db_url" \
  --value "postgres://prod-host:5432/myapp" \
  --type String \
  --tags "Key=team,Value=engineering"

# Create a secure parameter (encrypted with KMS)
aws ssm put-parameter \
  --name "/myapp/prod/db_password" \
  --value "supersecret" \
  --type SecureString \
  --key-id alias/myapp-key

# Get a single parameter
aws ssm get-parameter \
  --name "/myapp/prod/db_url" \
  --with-decryption

# Get all parameters under a path
aws ssm get-parameters-by-path \
  --path "/myapp/prod" \
  --with-decryption \
  --recursive

# Update an existing parameter
aws ssm put-parameter \
  --name "/myapp/prod/db_url" \
  --value "postgres://new-host:5432/myapp" \
  --type String \
  --overwrite

# Delete a parameter
aws ssm delete-parameter --name "/myapp/dev/old_key"
```

---

## Secret Rotation with Lambda

Parameter Store does not have built-in rotation. Use a Lambda function on a
schedule to rotate secrets.

### Architecture

```
[EventBridge Schedule: every 30 days]
  --> [Lambda: rotate_secret]
      1. Generate new secret value
      2. Update the external service (DB password, API key)
      3. Update Parameter Store with new value
      4. Verify the new secret works
      5. Send notification (SNS/Slack)
```

### Lambda rotation function (Python)

```python
import boto3
import secrets
import string

ssm = boto3.client("ssm")
rds = boto3.client("rds")
sns = boto3.client("sns")

def handler(event, context):
    param_name = event.get("param_name", "/myapp/prod/db_password")

    # 1. Generate new password
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*()"
    new_password = "".join(secrets.choice(alphabet) for _ in range(32))

    # 2. Update the database password
    rds.modify_db_instance(
        DBInstanceIdentifier="myapp-prod",
        MasterUserPassword=new_password,
        ApplyImmediately=True,
    )

    # 3. Update Parameter Store
    ssm.put_parameter(
        Name=param_name,
        Value=new_password,
        Type="SecureString",
        Overwrite=True,
    )

    # 4. Send notification
    sns.publish(
        TopicArn="arn:aws:sns:us-east-1:123456789012:secrets-rotated",
        Subject="Secret Rotated",
        Message=f"Parameter {param_name} was rotated successfully.",
    )

    return {"status": "rotated", "parameter": param_name}
```

---

## Local Development Patterns

### aws-vault (recommended for local dev)

```bash
# Install
brew install aws-vault

# Add a profile
aws-vault add my-profile

# Execute commands with temporary credentials
aws-vault exec my-profile -- aws ssm get-parameter --name "/myapp/dev/db_url"

# Start a shell with credentials
aws-vault exec my-profile -- bash

# Use with your application
aws-vault exec my-profile -- python manage.py runserver
```

### AWS SSO (for organizations)

```bash
# Configure SSO
aws configure sso
# Follow the prompts: SSO start URL, region, account, role

# Login
aws sso login --profile my-sso-profile

# Use the profile
AWS_PROFILE=my-sso-profile aws ssm get-parameters-by-path \
  --path "/myapp/dev" \
  --with-decryption
```

### Local .env file with parameter fetch

```bash
#!/bin/bash
# scripts/fetch-env.sh -- Fetch parameters and write to .env

ENVIRONMENT=${1:-dev}
APP_PREFIX="/myapp/${ENVIRONMENT}"

aws ssm get-parameters-by-path \
  --path "$APP_PREFIX" \
  --with-decryption \
  --recursive \
  --query "Parameters[].{Name:Name,Value:Value}" \
  --output json | python3 -c "
import json, sys, os
params = json.load(sys.stdin)
prefix = '${APP_PREFIX}/'
for p in params:
    key = p['Name'].replace(prefix, '').replace('/', '_').upper()
    print(f\"{key}={p['Value']}\")
" > .env

echo "Wrote $(wc -l < .env | tr -d ' ') parameters to .env"
```

```bash
# Usage
./scripts/fetch-env.sh dev      # writes dev params to .env
./scripts/fetch-env.sh staging  # writes staging params to .env
```

Never commit `.env` files. Add `.env` to `.gitignore`.

---

## Fetching Parameters in Application Code

### Python (boto3)

```python
import boto3
from functools import lru_cache

ssm = boto3.client("ssm")


@lru_cache(maxsize=None)
def get_parameter(name: str, decrypt: bool = True) -> str:
    """Fetch a single parameter from SSM."""
    response = ssm.get_parameter(Name=name, WithDecryption=decrypt)
    return response["Parameter"]["Value"]


def get_parameters_by_path(path: str) -> dict[str, str]:
    """Fetch all parameters under a path as a flat dict."""
    paginator = ssm.get_paginator("get_parameters_by_path")
    params = {}
    for page in paginator.paginate(Path=path, WithDecryption=True, Recursive=True):
        for param in page["Parameters"]:
            # Convert /myapp/prod/db_url to DB_URL
            key = param["Name"].split("/")[-1].upper()
            params[key] = param["Value"]
    return params


# Usage
db_url = get_parameter("/myapp/prod/db_url")
all_config = get_parameters_by_path("/myapp/prod")
```

### Node.js

```javascript
import { SSMClient, GetParameterCommand, GetParametersByPathCommand } from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: "us-east-1" });

async function getParameter(name) {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });
  const response = await ssm.send(command);
  return response.Parameter.Value;
}

async function getParametersByPath(path) {
  const command = new GetParametersByPathCommand({
    Path: path,
    WithDecryption: true,
    Recursive: true,
  });
  const response = await ssm.send(command);
  const params = {};
  for (const param of response.Parameters) {
    const key = param.Name.split("/").pop().toUpperCase();
    params[key] = param.Value;
  }
  return params;
}

// Usage
const dbUrl = await getParameter("/myapp/prod/db_url");
const config = await getParametersByPath("/myapp/prod");
```

---

## CI/CD Integration

### GitHub Actions with OIDC (no long-lived keys)

```yaml
name: Deploy
on:
  push:
    branches: [main]

permissions:
  id-token: write    # required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-deploy
          aws-region: us-east-1

      - name: Fetch config from Parameter Store
        run: |
          DB_URL=$(aws ssm get-parameter --name "/myapp/prod/db_url" --with-decryption --query "Parameter.Value" --output text)
          echo "::add-mask::$DB_URL"
          echo "DB_URL=$DB_URL" >> $GITHUB_ENV

      - name: Deploy
        run: |
          echo "Deploying with config from SSM..."
          # $DB_URL is available as an env var
```

### OIDC trust policy (AWS side)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:myorg/myrepo:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Key points:
- OIDC eliminates long-lived AWS access keys in GitHub secrets.
- The trust policy restricts which repos and branches can assume the role.
- Always use `::add-mask::` to redact secrets from GitHub Actions logs.
- Use `--query` and `--output text` to extract the raw value from the AWS CLI.

---

*Engineering Brain -- Automations/Recipes/AWS-SSM.md*

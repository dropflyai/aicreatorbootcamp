# DevSecOps — Security in CI/CD, Shift-Left, and Security Champions

## Overview

DevSecOps integrates security practices into every phase of the software development lifecycle, eliminating the traditional handoff between development and security teams. The "shift-left" philosophy moves security testing earlier in the pipeline — where defects are cheapest to fix. A vulnerability found in design costs 6x less to fix than one found in testing and 100x less than one found in production (NIST). This module codifies security integration into CI/CD pipelines, pre-commit scanning, container and IaC scanning, and the security champions program that makes security everyone's responsibility.

The DevSecOps axiom: security is not a gate at the end of the pipeline — it is a quality attribute embedded throughout. If security slows you down, your security process is wrong, not your development speed.

---

## Security in CI/CD Pipelines

### Pipeline Security Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CI/CD Security Pipeline                       │
│                                                                       │
│  Developer → Pre-commit → Build → Test → Stage → Deploy → Monitor   │
│     │           │           │       │       │       │        │       │
│     │     ┌─────┴─────┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐  │
│     │     │Secrets scan│ │SAST │ │DAST │ │Image│ │Sign │ │CSPM │  │
│     │     │Lint rules  │ │SCA  │ │IAST │ │scan │ │Deploy│ │SIEM │  │
│     │     │Commit sign │ │SBOM │ │API  │ │IaC  │ │Gate │ │EDR  │  │
│     │     └───────────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘  │
│     │                                                                │
│  IDE Security                                                        │
│  Plugins (real-time)                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Pipeline Stage Security Controls

| Stage | Security Control | Tool Examples | Failure Action |
|-------|-----------------|---------------|----------------|
| IDE | Real-time SAST | Semgrep, Snyk IDE, SonarLint | Highlight in editor |
| Pre-commit | Secrets scanning | gitleaks, detect-secrets, truffleHog | Block commit |
| Pre-commit | Commit signing | GPG, SSH signing | Require signed commits |
| Build | SAST (full scan) | Semgrep, CodeQL, SonarQube | Block merge on critical/high |
| Build | SCA (dependency scan) | Snyk, Dependabot, Trivy | Block merge on critical |
| Build | SBOM generation | syft, cdxgen | Store alongside artifact |
| Build | License compliance | FOSSA, Snyk License | Block on GPL contamination |
| Test | DAST (staging scan) | OWASP ZAP, StackHawk | Warn or block deployment |
| Test | IAST (during tests) | Contrast, Seeker | Report findings |
| Test | API security scan | 42Crunch, Schemathesis | Block on critical API issues |
| Stage | Container image scan | Trivy, Snyk Container, ECR scan | Block deployment |
| Stage | IaC security scan | Checkov, tfsec, KICS | Block on misconfiguration |
| Deploy | Artifact signing | cosign, Sigstore, Notary | Reject unsigned artifacts |
| Deploy | Admission control | OPA Gatekeeper, Kyverno | Reject non-compliant deployments |
| Production | Runtime protection | Falco, Sysdig, RASP | Alert or block |
| Production | CSPM | Prowler, Wiz, Security Hub | Alert and auto-remediate |

---

## Pre-Commit Secrets Scanning

### The Problem

Secrets committed to version control are the most preventable and most damaging security failure. Once a secret is in Git history, it persists even after deletion from the current branch. Exposed secrets enable immediate unauthorized access without any exploitation skill.

### Pre-Commit Hook Configuration

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
        name: Detect secrets in code
        entry: gitleaks protect --staged --verbose
        language: system
        pass_filenames: false

  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        name: Detect secrets (Yelp)
        args: ['--baseline', '.secrets.baseline']
```

### Secrets Scanning Tools

| Tool | Type | Strengths |
|------|------|-----------|
| gitleaks | Open Source | Fast, regex + entropy based, CI/CD friendly |
| detect-secrets | Open Source (Yelp) | Baseline management, plugin architecture |
| truffleHog | Open Source | Git history scanning, entropy detection, regex |
| GitHub Secret Scanning | Integrated | Automatic for GitHub repos, partner integration for token revocation |
| GitGuardian | Commercial | Real-time monitoring, historical scanning, remediation workflows |

### Secret Types to Detect

| Category | Examples | Detection Method |
|----------|---------|-----------------|
| API keys | AWS access keys, GCP service account keys, Stripe keys | Pattern matching (known prefixes) |
| Tokens | GitHub PAT, Slack tokens, JWT secrets | Pattern matching + entropy |
| Passwords | Database passwords, admin passwords | High entropy strings near password-like keys |
| Private keys | RSA, ECDSA, SSH private keys | Begin/end markers |
| Connection strings | Database URLs with credentials | URI pattern with credentials |
| Certificates | TLS private keys, client certificates | PEM format detection |

### Secret Remediation

When a secret is found in Git history:
1. **Immediately rotate the secret** — assume it is compromised regardless of exposure duration
2. **Revoke the old secret** — disable the compromised credential
3. **Audit usage** — check logs for unauthorized use of the compromised secret
4. **Clean Git history** — use `git filter-repo` or BFG Repo Cleaner (but never trust this alone — the secret was exposed)
5. **Update .gitignore** — prevent the file type from being committed again
6. **Root cause analysis** — why was the secret in code? Fix the process (use environment variables, secret managers)

---

## Container Image Scanning

### Scanning in CI/CD

```yaml
# GitHub Actions container scanning
container-security:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Build Docker image
      run: docker build -t myapp:${{ github.sha }} .

    - name: Trivy vulnerability scan
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'myapp:${{ github.sha }}'
        format: 'sarif'
        output: 'trivy-results.sarif'
        severity: 'CRITICAL,HIGH'
        exit-code: '1'  # Fail pipeline on critical/high vulnerabilities

    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v3
      with:
        sarif_file: 'trivy-results.sarif'
```

### Container Security Best Practices

**Dockerfile security:**
```dockerfile
# SECURE — Multi-stage build with minimal final image
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER nonroot:nonroot
EXPOSE 3000
CMD ["dist/server.js"]
```

**Key practices:**
- Use multi-stage builds to minimize final image size and attack surface
- Use distroless or Alpine base images (fewer packages = fewer vulnerabilities)
- Run as non-root user (USER instruction)
- Pin base image versions by digest, not tag
- Do not install unnecessary packages (no curl, wget, shell in production images)
- Scan images in CI/CD and in the container registry
- Sign images with cosign/Sigstore before deployment

---

## Infrastructure as Code (IaC) Scanning

### IaC Security Tools

| Tool | IaC Types | Type |
|------|-----------|------|
| Checkov (Bridgecrew) | Terraform, CloudFormation, K8s, Dockerfile | Open Source |
| tfsec (Aqua) | Terraform | Open Source |
| KICS (Checkmarx) | Terraform, CloudFormation, Ansible, Docker, K8s | Open Source |
| Terrascan (Tenable) | Terraform, K8s, Helm, CloudFormation | Open Source |
| Snyk IaC | Terraform, CloudFormation, K8s | Commercial |

### Common IaC Misconfigurations Detected

| Misconfiguration | Risk | Severity |
|-----------------|------|----------|
| S3 bucket public access | Data exposure | Critical |
| Security group 0.0.0.0/0 on port 22 | Unauthorized SSH access | High |
| Unencrypted RDS instance | Data at rest exposure | High |
| IAM policy with * resources | Overprivileged access | High |
| CloudTrail logging disabled | No audit trail | Critical |
| EBS volume unencrypted | Data at rest exposure | Medium |
| Default VPC in use | No network segmentation | Medium |

### Policy as Code

**Open Policy Agent (OPA) / Rego:**
Define organizational security policies as code that is evaluated against infrastructure configurations:

```rego
# Deny S3 buckets without encryption
deny[msg] {
  resource := input.resource.aws_s3_bucket[name]
  not resource.server_side_encryption_configuration
  msg := sprintf("S3 bucket '%s' must have server-side encryption enabled", [name])
}

# Deny security groups with unrestricted SSH
deny[msg] {
  resource := input.resource.aws_security_group[name]
  ingress := resource.ingress[_]
  ingress.from_port <= 22
  ingress.to_port >= 22
  ingress.cidr_blocks[_] == "0.0.0.0/0"
  msg := sprintf("Security group '%s' allows SSH from 0.0.0.0/0", [name])
}
```

**HashiCorp Sentinel:**
Policy as code for Terraform Enterprise/Cloud — evaluated during `terraform plan` before any infrastructure changes are applied.

---

## Shift-Left Security Implementation

### Maturity Model

| Level | Characteristics | Tools |
|-------|----------------|-------|
| Level 0 — No security in pipeline | Security testing is manual, periodic, disconnected | Ad hoc scanning |
| Level 1 — Gate at end | Security scan before deployment, often blocks and frustrates | DAST before deploy |
| Level 2 — Integrated scanning | SAST/SCA in CI/CD, automated but with noise | SAST + SCA in build |
| Level 3 — Developer-centric | IDE integration, pre-commit hooks, fast feedback loops | IDE plugins + pre-commit |
| Level 4 — Proactive | Threat modeling in design, security requirements, security champions | Full DevSecOps culture |
| Level 5 — Continuous | Automated remediation, policy as code, security as code | Self-healing, guardrails |

---

## Security Champions Program

### Program Structure

Security champions are developers who serve as the security point of contact within their team. They are not security professionals — they are developers with additional security training and responsibility.

**Champion responsibilities:**
- Triage security findings for their team (first-pass assessment)
- Participate in threat modeling sessions
- Review security-sensitive code changes
- Advocate for security best practices within the team
- Attend monthly security champions meetings
- Escalate complex security issues to the security team
- Mentor team members on secure coding practices

**Program structure:**
- One champion per development team (5-10 developers)
- 4-8 hours per sprint dedicated to security champion activities
- Quarterly training on emerging threats and new security tools
- Annual security conference attendance
- Recognition and career progression for champion contributions

### Champion Training Curriculum

| Quarter | Topic | Outcome |
|---------|-------|---------|
| Q1 | OWASP Top 10, secure coding fundamentals | Can identify and fix common vulnerabilities |
| Q2 | Threat modeling, security design review | Can lead threat modeling sessions |
| Q3 | Security testing tools, SAST/DAST interpretation | Can triage security findings |
| Q4 | Incident response, forensics basics | Can participate in IR and post-incident review |

---

## Metrics for DevSecOps

| Metric | Definition | Target |
|--------|-----------|--------|
| Mean Time to Remediate (security findings) | Time from finding to verified fix | Critical: <24h, High: <7d |
| Security finding escape rate | % of findings reaching production | <5% |
| Pipeline security coverage | % of pipelines with security scanning | 100% |
| Pre-commit secrets blocked | Count of secrets caught before commit | Track trend |
| Developer security training completion | % of developers completing annual training | 100% |
| Threat model coverage | % of services with current threat model | 100% |
| Security champion coverage | % of teams with active champion | 100% |

---

## Cross-References

- `07_secure_sdlc/secure_development.md` — Secure coding practices for developers
- `07_secure_sdlc/security_testing.md` — Testing methodologies integrated into CI/CD
- `05_compliance/supply_chain_security.md` — SCA and SBOM in pipelines
- `06_operations/vulnerability_management.md` — Vulnerability lifecycle from CI/CD findings
- `04_infrastructure/cloud_security.md` — Cloud security configuration scanning

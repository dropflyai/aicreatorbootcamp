# Supply Chain Security — SBOM, Dependency Scanning, and Third-Party Risk

## Overview

The software supply chain has become the highest-leverage attack vector in modern cybersecurity. A single compromised library can propagate to thousands of organizations simultaneously, as demonstrated by SolarWinds (2020), Codecov (2021), Log4Shell (2021), and the xz utils backdoor (2024). Supply chain security addresses the transitive trust problem: your application's security is bounded by the security of every component it depends on, every tool in your build pipeline, and every third-party service you integrate.

This module codifies supply chain security practices from Software Bills of Materials (SBOM) through dependency scanning, vendor security assessments, and the operational lessons learned from major supply chain incidents.

---

## Software Bill of Materials (SBOM)

### Definition and Purpose

An SBOM is a formal, machine-readable inventory of all software components in an application, including:
- Direct dependencies (libraries explicitly included)
- Transitive dependencies (dependencies of dependencies)
- Version numbers and integrity hashes
- License information
- Supplier/origin information
- Vulnerability status (mapped to CVE databases)

The U.S. Executive Order 14028 (May 2021) mandates SBOM for software sold to federal agencies. Industry adoption is following rapidly.

### SBOM Formats

| Format | Maintainer | Strengths |
|--------|-----------|-----------|
| SPDX (Software Package Data Exchange) | Linux Foundation / ISO 5962 | ISO standard, comprehensive license tracking, broad ecosystem |
| CycloneDX | OWASP | Security-focused, vulnerability correlation, VEX support |
| SWID (Software Identification) | NISO/ISO 19770-2 | Asset management focus, install-time tagging |

### SBOM Generation

**Build-time generation (preferred):** Generate SBOM during the build process when the exact dependency graph is known:
- `syft` (Anchore) — Multi-language, container-aware SBOM generation
- `cdxgen` (CycloneDX) — Language-specific generators for npm, Maven, pip, etc.
- `spdx-sbom-generator` — Multi-language SPDX generation
- `trivy` — SBOM generation combined with vulnerability scanning

**Analysis-time generation:** Analyze compiled artifacts or container images:
- Container image scanning extracts package manifests from filesystem layers
- Binary analysis tools identify embedded libraries (less complete than build-time)

### SBOM Lifecycle Management

```
Build → Generate SBOM → Sign SBOM → Store SBOM → Monitor → Alert → Remediate
                         (integrity)  (registry)  (new CVEs) (notify)  (update)
```

- Generate SBOM for every release and store alongside the artifact
- Sign SBOMs cryptographically (cosign, Sigstore) to prevent tampering
- Continuously monitor SBOM contents against vulnerability databases (NVD, OSV, GitHub Advisory)
- When a new vulnerability affects a component in your SBOM, trigger automated alerting and remediation workflow

---

## Dependency Scanning

### Scanning Types

**Software Composition Analysis (SCA):**
SCA tools analyze application dependencies and identify:
- Known vulnerabilities (CVE mapping)
- License compliance issues (GPL contamination, license incompatibility)
- Outdated components (technical debt, missed security patches)
- Malicious packages (typosquatting, dependency confusion)

**CI/CD Integration Points:**

| Stage | Scan Type | Action |
|-------|-----------|--------|
| Pre-commit | Lock file analysis | Warn developers of vulnerable additions |
| Pull request | Full SCA scan | Block merge if critical/high vulnerabilities introduced |
| Build | SBOM generation + vulnerability scan | Fail build on policy violations |
| Registry | Container image scan | Prevent deployment of vulnerable images |
| Production | Continuous monitoring | Alert on newly disclosed vulnerabilities in deployed components |

### SCA Tools

| Tool | Type | Strengths |
|------|------|-----------|
| Snyk | Commercial | Developer-friendly, fix PRs, extensive language support |
| GitHub Dependabot | Integrated | Free for GitHub repos, automated PR creation |
| Mend (WhiteSource) | Commercial | Deep license analysis, policy engine |
| OWASP Dependency-Check | Open Source | Free, integrates with CI/CD, NVD-based |
| Trivy | Open Source | Multi-target (code, containers, IaC), fast scanning |
| Grype | Open Source | Vulnerability scanner for containers and filesystems |
| Socket.dev | Commercial | Behavioral analysis of packages, supply chain attack detection |

### Dependency Pinning and Lock Files

**Hard requirement:** All production dependencies must be version-pinned with integrity hashes in lock files:
- `package-lock.json` (npm) — includes `integrity` SHA-512 hashes
- `yarn.lock` / `pnpm-lock.yaml` — deterministic resolution with hashes
- `Pipfile.lock` (Python) — pinned versions with SHA-256 hashes
- `go.sum` (Go) — cryptographic checksums for all dependencies
- `Cargo.lock` (Rust) — pinned versions with checksums

**Never use floating version ranges in production:** `"lodash": "^4.17.0"` allows auto-upgrade to any 4.x version — including a compromised one. Pin to exact versions: `"lodash": "4.17.21"`.

### Dependency Confusion and Namespace Attacks

**Attack vector:** Attacker publishes a malicious package to a public registry with the same name as a private/internal package. If the build system resolves public packages before private ones, the malicious package is installed.

**Mitigations:**
- Registry scoping: Configure package managers to only resolve internal packages from private registries
- Namespace reservation: Register internal package names on public registries (even if empty)
- `.npmrc` / pip configuration: Explicitly configure registry sources per scope/namespace
- Lockfile integrity: Lock files prevent resolution changes between builds

---

## Vendor Security Assessments

### Assessment Framework

Third-party vendors that access your data, infrastructure, or code represent a trust delegation. Vendor security assessments evaluate whether that trust is warranted.

**Tier-based Assessment:**

| Vendor Tier | Criteria | Assessment Depth |
|------------|----------|-----------------|
| Critical | Processes restricted/confidential data, has production access | Full security assessment, on-site audit, annual review |
| High | Processes internal data, has network access | Questionnaire + evidence review, annual review |
| Medium | SaaS tool, limited data exposure | Standard questionnaire, biennial review |
| Low | No data access, no system access | Vendor registration, periodic review |

### Standard Assessment Questionnaires

- **SIG (Standardized Information Gathering)** — Shared Assessments, 18 risk domains, industry standard
- **CAIQ (Consensus Assessment Initiative Questionnaire)** — Cloud Security Alliance, cloud-specific
- **VSA (Vendor Security Alliance)** — Simplified questionnaire for SaaS vendors
- **Custom questionnaires** — Organization-specific based on risk appetite and regulatory requirements

### Assessment Key Areas

| Domain | Key Questions |
|--------|--------------|
| Data Protection | How is data encrypted at rest and in transit? Where is data stored geographically? |
| Access Control | How are access permissions managed? Is MFA required? How are privileged accounts controlled? |
| Incident Response | What is the notification timeline for security incidents? Is there a documented IR plan? |
| Business Continuity | What are RTO/RPO targets? How often are backups tested? |
| Compliance | Which certifications/attestations are held? (SOC 2, ISO 27001, PCI DSS) |
| Development Practices | Is there a secure SDLC? Are penetration tests conducted? What SCA tools are used? |
| Subprocessors | Which fourth-parties have access to data? How are they assessed? |

### Contractual Requirements

Security requirements must be codified in contracts:
- **Data Processing Agreement (DPA):** GDPR-required for processors; defines data processing scope, obligations, and audit rights
- **Security Exhibit:** Minimum security controls, encryption requirements, access controls, logging
- **Breach Notification SLA:** Maximum time to notify of a security incident (24-72 hours)
- **Audit Rights:** Right to audit vendor security controls (or accept SOC 2 report in lieu)
- **Data Return/Deletion:** Vendor must return or certify destruction of data upon contract termination
- **Insurance Requirements:** Cyber liability insurance minimums

---

## Third-Party Risk Management Program

### Risk Management Lifecycle

```
Identification → Assessment → Mitigation → Monitoring → Offboarding
  Vendor inventory  Security review  Contract controls  Continuous eval  Data deletion
  Data mapping       Risk rating      Compensating ctrl  Periodic review  Access revocation
  Classification     Due diligence    Accept/reject      Incident alerts  Certificate destroy
```

### Continuous Monitoring

Point-in-time assessments are insufficient. Continuous monitoring provides ongoing visibility:
- **Security rating services:** BitSight, SecurityScorecard — external security posture rating based on observable indicators
- **Breach monitoring:** Monitor for vendor breaches in threat intelligence feeds
- **Certificate monitoring:** Alert when vendor SSL certificates expire or change unexpectedly
- **Dark web monitoring:** Alert when vendor credentials appear in credential dumps
- **Financial monitoring:** Vendor financial distress increases security risk (reduced investment in security)

---

## Lessons from Major Supply Chain Incidents

### SolarWinds (2020)

**Attack:** Nation-state actor (APT29/Cozy Bear) compromised SolarWinds' build system, inserting the SUNBURST backdoor into Orion software updates. Distributed to ~18,000 organizations including U.S. government agencies.

**Lessons:**
- Build system security is critical — it is the highest-leverage target
- Code signing does not prevent supply chain attacks if the build is compromised
- Software from trusted vendors can be weaponized
- Detection required behavioral analysis (unusual DNS patterns), not signature matching
- Vendor trust must be verified, not assumed

### Log4Shell / Log4j (CVE-2021-44228, CVSS 10.0)

**Attack:** Critical RCE vulnerability in Apache Log4j, a ubiquitous Java logging library. Exploitable via crafted log messages triggering JNDI lookups. Affected virtually every Java application.

**Lessons:**
- Transitive dependencies create invisible attack surface (most affected organizations did not know they used Log4j)
- SBOM would have enabled rapid identification of affected systems
- Open-source maintainer burnout is a systemic risk (Log4j maintained by volunteers)
- Vulnerability response requires knowing what you are running (asset inventory is prerequisite)

### xz Utils Backdoor (2024)

**Attack:** Sophisticated multi-year social engineering campaign. Attacker built trust as an open-source contributor, gained maintainer access to xz utils, and inserted a backdoor targeting SSH authentication on Linux systems.

**Lessons:**
- Open-source trust is earned gradually and can be exploited patiently
- Single-maintainer projects are systemic risk (bus factor = 1)
- Behavioral analysis of build outputs (reproducible builds) would have detected the discrepancy
- Community vigilance (Andres Freund's performance investigation) was the actual detection mechanism
- Automated security tools did not detect this — human judgment was required

---

## Supply Chain Security Maturity Model

| Level | Capability | Activities |
|-------|-----------|------------|
| 1 — Ad Hoc | No formal program | Reactive patching when vulnerabilities are public |
| 2 — Basic | Dependency scanning in CI/CD | SCA tools running, alerts generated, some response |
| 3 — Managed | SBOM generation, vendor assessments | SBOMs for all releases, tiered vendor assessment, policies |
| 4 — Proactive | Continuous monitoring, build security | Signed builds, reproducible builds, continuous vendor monitoring |
| 5 — Optimized | Full provenance, SLSA compliance | SLSA Level 3+, comprehensive supply chain visibility, automated response |

---

## Cross-References

- `07_secure_sdlc/devsecops.md` — SCA integration in CI/CD pipelines
- `07_secure_sdlc/security_testing.md` — Dependency scanning as testing
- `05_compliance/compliance_frameworks.md` — Vendor management compliance requirements
- `03_threat_modeling/threat_landscape.md` — Supply chain threat actor analysis
- `Templates/vendor_assessment_template.md` — Vendor security assessment template

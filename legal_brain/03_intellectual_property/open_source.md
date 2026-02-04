# Open Source -- Licensing, Compliance, and Strategy

> Module: `03_intellectual_property/open_source.md`
> Brain: Legal Brain
> Authority: Domain-specific (intellectual property)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Open Source Licensing Fundamentals

### 1.1 What Open Source Means Legally

Open source software is software distributed under a license that grants users the right to use, study, modify, and distribute the software. The Open Source Initiative (OSI) maintains the Open Source Definition (OSD) with 10 criteria.

**Key Legal Concepts:**
- Open source licenses are copyright licenses -- they grant permissions that would otherwise require copyright holder's consent
- Open source does not mean "no rules" -- every open source license has conditions
- Violation of open source license conditions = copyright infringement
- Open source licenses are generally irrevocable (once granted under the license, the license cannot be revoked for existing copies)

### 1.2 Permissive Licenses

Permissive licenses impose minimal restrictions. You can use, modify, and distribute the software (including in proprietary products) with few obligations.

**MIT License:**
- Obligations: Include copyright notice and license text in all copies/substantial portions
- No copyleft (no requirement to open-source derivative works)
- No patent grant (implicit or none, depending on interpretation)
- Most popular open source license (~30% of GitHub projects)
- Risk level: Very low

**Apache License 2.0:**
- Obligations: Include copyright notice, license text, NOTICE file (if one exists), and state changes made
- Explicit patent grant from contributors (covers patents embodied in their contributions)
- Patent termination clause: If licensee initiates patent litigation alleging the software infringes, their patent license terminates
- Preferred by enterprise and foundations (Apache Software Foundation, Google, Meta)
- Risk level: Very low

**BSD Licenses (2-Clause and 3-Clause):**
- 2-Clause (Simplified): Similar to MIT -- include copyright notice and disclaimer
- 3-Clause (New BSD): Adds restriction on using contributors' names for endorsement without permission
- No patent grant
- Risk level: Very low

**Comparison of Permissive Licenses:**
| Feature | MIT | Apache 2.0 | BSD 2-Clause |
|---------|-----|-----------|-------------|
| Attribution required | Yes | Yes | Yes |
| State changes | No | Yes | No |
| Patent grant | No | Yes | No |
| Patent retaliation | No | Yes | No |
| NOTICE file | No | Yes (if exists) | No |
| Compatibility | Universal | Nearly universal | Universal |

### 1.3 Copyleft Licenses

Copyleft licenses require that derivative works be distributed under the same or compatible license terms. This is the "viral" or "reciprocal" nature of copyleft.

**GNU General Public License (GPL) v2 and v3:**
- **Strong copyleft:** If you distribute software that includes GPL code, the entire combined work must be licensed under GPL
- Derivative works must: provide source code, license under GPL, include copyright notices
- v3 additions: Anti-tivoization (prevents hardware restrictions), patent grant, improved compatibility
- **Critical risk for proprietary software:** Incorporating GPL code into proprietary software and distributing it requires releasing your proprietary code under GPL
- Linking: Static linking generally creates a derivative work; dynamic linking is debated (FSF says yes; others disagree)

**GNU Affero General Public License (AGPL) v3:**
- Same as GPL v3 PLUS: Network use triggers copyleft
- If you modify AGPL software and make it available over a network (SaaS), you must provide the source code to network users
- **Critical risk for SaaS companies:** Using AGPL libraries in your SaaS application may require you to release your entire application source code
- This is the most restrictive common open source license

**GNU Lesser General Public License (LGPL):**
- **Weak copyleft:** Modifications to the LGPL library itself must be released under LGPL
- BUT: Programs that merely link to (use) the LGPL library are not required to be open-sourced
- Common for libraries (e.g., GNU C Library, Qt framework)
- Permits proprietary software to use LGPL libraries without releasing proprietary code (with conditions: dynamic linking preferred, must allow relinking)

### 1.4 License Compatibility Matrix

Compatibility determines whether code under one license can be combined with code under another license.

| Combining | MIT | Apache 2.0 | BSD | LGPL | GPL v2 | GPL v3 | AGPL v3 |
|-----------|-----|-----------|-----|------|--------|--------|---------|
| **MIT** | OK | OK | OK | OK | OK | OK | OK |
| **Apache 2.0** | OK | OK | OK | OK | Debated | OK | OK |
| **BSD** | OK | OK | OK | OK | OK | OK | OK |
| **LGPL** | OK | OK | OK | OK | OK | OK | OK |
| **GPL v2** | NO* | NO* | NO* | NO* | OK | NO | NO |
| **GPL v3** | NO* | NO* | NO* | NO* | NO | OK | OK |
| **AGPL v3** | NO* | NO* | NO* | NO* | NO | NO | OK |

*NO = Cannot combine and distribute under the more permissive license. The combined work must be under the copyleft license (GPL/AGPL).

**Compatibility Rule:** Permissive code can be incorporated into copyleft projects. Copyleft code cannot be incorporated into permissive or proprietary projects without the entire combined work becoming subject to the copyleft license.

---

## 2. Software Bill of Materials (SBOM)

### 2.1 What Is an SBOM?

An SBOM is a comprehensive inventory of all software components (including open source libraries, frameworks, and dependencies) used in a software product.

**Why SBOMs Matter:**
- **Legal compliance:** Identify all open source license obligations
- **Security:** Track components for known vulnerabilities (CVEs)
- **Regulatory:** Executive Order 14028 (2021) requires SBOMs for software sold to US federal government
- **Customer requirements:** Enterprise customers increasingly require SBOMs
- **M&A due diligence:** Acquirers expect SBOM as part of technical due diligence

### 2.2 SBOM Standards and Formats

| Standard | Maintained By | Format | Adoption |
|----------|-------------|--------|---------|
| SPDX | Linux Foundation | JSON, RDF, tag-value, YAML | ISO/IEC 5962:2021 |
| CycloneDX | OWASP | JSON, XML | Growing adoption |
| SWID Tags | ISO/NIST | XML | Government/enterprise |

### 2.3 SBOM Generation and Management

**Automated Tools:**
- **SCA (Software Composition Analysis):** Snyk, Black Duck (Synopsys), WhiteSource (Mend), FOSSA, Dependabot
- **Build-time SBOM generation:** Syft (Anchore), Tern, Microsoft SBOM Tool
- **Package manager analysis:** npm audit, pip-audit, cargo-audit, bundler-audit

**SBOM Lifecycle:**
1. Generate SBOM during build process (automate in CI/CD pipeline)
2. Validate license compliance against company policy
3. Check for known vulnerabilities
4. Store SBOM artifact alongside release artifact
5. Update SBOM with every release
6. Monitor for new vulnerabilities in deployed components

---

## 3. Open Source Policy for Companies

### 3.1 Inbound Open Source Policy (Using Open Source)

**License Classification:**
| Category | Licenses | Policy |
|----------|----------|--------|
| Approved | MIT, Apache 2.0, BSD 2/3-Clause, ISC, Unlicense, CC0 | Use freely; comply with attribution |
| Review Required | LGPL, MPL 2.0, EPL 2.0, CDDL | Legal review before use; OK with proper isolation |
| Restricted | GPL v2, GPL v3 | Legal review required; generally prohibited in proprietary code; OK in build tools/dev tools not distributed |
| Prohibited | AGPL, SSPL, Commons Clause, proprietary "source available" | Do not use in any product code |
| Unknown | No license, custom license | Do not use until license is clarified |

**Compliance Process:**
1. Developer identifies open source component for use
2. Automated SCA tool checks license during PR/CI
3. If Approved: proceed with attribution
4. If Review Required or Restricted: submit request to legal/engineering review
5. If Prohibited or Unknown: find alternative component

### 3.2 Outbound Open Source Policy (Releasing Open Source)

**When to Open Source:**
- Non-differentiating technology (infrastructure, tooling, libraries)
- Developer tools and SDKs (drives platform adoption)
- Standards implementation (interoperability benefits)
- Recruiting signal (attracts engineering talent)
- Community-driven improvement (more eyes, more contributions)

**When NOT to Open Source:**
- Core competitive advantage (crown jewel technology)
- Technology embodying patentable inventions (before filing)
- Code containing or accessing sensitive data
- Code with embedded secrets, credentials, or infrastructure details

**Release Process:**
1. Business justification and approval (engineering leadership + legal)
2. Code review for: secrets/credentials, proprietary dependencies, problematic third-party code
3. License selection (choose license aligned with business goals)
4. Attribution and notices (NOTICE file, LICENSE file, copyright headers)
5. Contributor License Agreement setup (if accepting external contributions)
6. Repository setup (README, CONTRIBUTING, CODE_OF_CONDUCT)
7. Ongoing maintenance plan (who maintains? what is the support commitment?)

---

## 4. Contributor License Agreements (CLAs)

### 4.1 Why CLAs Exist

When external contributors submit code to your open source project, you need legal certainty about:
- **Copyright:** Who owns the contributed code? Can you license it?
- **Patent:** Does the contributor grant a patent license for their contribution?
- **Authority:** Does the contributor have the right to contribute this code?
- **Warranty:** Is the code original? Does it infringe third-party rights?

### 4.2 Types of CLAs

**Individual CLA:**
- Signed by individual contributors
- Grants copyright license (or assignment) and patent license
- Contributor represents they have the right to make the contribution
- Examples: Apache ICLA, Google CLA, Microsoft CLA

**Corporate CLA:**
- Signed by companies whose employees contribute
- Company grants license for contributions by its designated employees
- Company represents it has authority to grant such license
- Lists authorized contributors (or designates a process for designation)

**Developer Certificate of Origin (DCO):**
- Lighter-weight alternative to CLA
- Contributor self-certifies (via sign-off in commit message) that they have the right to submit the contribution
- Used by Linux kernel, many CNCF projects
- Lower friction than CLA but weaker legal protection

### 4.3 CLA vs. DCO Decision

| Factor | CLA | DCO |
|--------|-----|-----|
| Legal protection | Stronger (explicit grant) | Weaker (self-certification) |
| Contributor friction | Higher (must sign agreement) | Lower (sign-off per commit) |
| Corporate contributions | Handled (corporate CLA) | Less clear |
| Re-licensing ability | Yes (if CLA includes assignment or broad grant) | No (only original license) |
| Tooling | CLA Assistant, CLA Hub | Git commit hooks |

---

## 5. Dual Licensing Strategy

### 5.1 Business Source License (BSL) / Source Available

An emerging model where source code is available but commercial use is restricted:

**Business Source License (BSL / BUSL):**
- Source code is publicly available
- Non-production use is free
- Production/commercial use requires a paid license
- After a defined period (typically 3-4 years), code converts to a permissive open source license
- Used by: MariaDB (creator of BSL), HashiCorp, Sentry, Couchbase
- NOT an open source license per OSI definition

**Server Side Public License (SSPL):**
- Created by MongoDB
- Similar to AGPL but even more expansive: requires releasing source code of the entire service stack (not just the application)
- Designed to prevent cloud providers from offering the software as a service without contributing back
- NOT recognized as open source by OSI
- Controversial: AWS, Google Cloud, Red Hat reject SSPL

### 5.2 Open Core Model

- Core product is open source (permissive or weak copyleft)
- Enterprise features are proprietary (closed source, paid license)
- Examples: GitLab (MIT core + proprietary enterprise), Elastic (SSPL core + proprietary), Redis (BSD core + modules under SSPL)
- Legal considerations: Clear boundary between open and closed; CLA enables relicensing

### 5.3 Dual License Model

- Software available under two licenses: open source AND proprietary
- Users choose: (1) Use under open source license (with its obligations, e.g., copyleft), or (2) Purchase proprietary license (removes copyleft obligations)
- Examples: MySQL (GPL + commercial license), Qt (LGPL + commercial)
- Requires owning all copyrights (hence CLA with assignment)

---

## 6. Open Source Risk Mitigation

### 6.1 Top Open Source Legal Risks

| Risk | Description | Mitigation |
|------|-------------|-----------|
| Copyleft contamination | GPL/AGPL code incorporated into proprietary product | SCA scanning in CI/CD; open source policy |
| License non-compliance | Failure to provide required attribution or source code | Automated compliance checks; SBOM |
| Supply chain vulnerability | Known CVEs in dependencies | Continuous vulnerability scanning; dependency updates |
| Abandoned projects | Critical dependency no longer maintained | Evaluate project health before adoption; fork plan |
| License change | Upstream project changes license (rug-pull) | Pin versions; evaluate governance; fork rights under previous license |
| Patent risk | Open source component infringes third-party patents | Prefer licenses with patent grants (Apache 2.0) |

### 6.2 Compliance Checklist for Each Release

- [ ] SBOM generated and reviewed
- [ ] All licenses classified per company policy
- [ ] No Prohibited or Unknown licenses in production code
- [ ] Attribution requirements met (NOTICE file, license files, copyright headers)
- [ ] Source code availability obligations met (for copyleft components)
- [ ] Known vulnerabilities assessed and remediated or accepted
- [ ] License compatibility confirmed for all combined components

---

*Reference: Van Lindberg, Intellectual Property and Open Source; Meeker, Open Source for Business (2nd ed.); OSI Open Source Definition; Free Software Foundation, GNU License Compatibility Guide; Linux Foundation SPDX Specification; NTIA SBOM Minimum Elements.*

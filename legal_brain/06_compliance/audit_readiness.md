# Audit Readiness -- SOC 2 Preparation, Compliance Monitoring, and Continuous Compliance

> Module: `06_compliance/audit_readiness.md`
> Brain: Legal Brain
> Authority: Domain-specific (compliance)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. SOC 2 Overview

### 1.1 What Is SOC 2?

SOC 2 (System and Organization Controls 2) is an auditing standard developed by the AICPA (American Institute of Certified Public Accountants) that evaluates an organization's controls relevant to security, availability, processing integrity, confidentiality, and privacy of customer data.

**Why SOC 2 Matters:**
- Required by enterprise customers (increasingly a prerequisite for enterprise sales)
- Demonstrates commitment to data security and privacy
- Reduces customer security questionnaire burden (share the report instead)
- Competitive advantage (especially against vendors without SOC 2)
- May be required for partnerships, insurance, and regulatory compliance

### 1.2 SOC 2 Trust Services Criteria (TSC)

| Criterion | Description | Required? |
|-----------|-------------|----------|
| **Security (CC)** | Protection against unauthorized access (logical and physical) | Yes (always included) |
| **Availability (A)** | System availability per SLA commitments | Optional (recommended for SaaS) |
| **Processing Integrity (PI)** | System processing is complete, valid, accurate, timely, authorized | Optional (recommended for data processing) |
| **Confidentiality (C)** | Confidential information is protected as committed | Optional (recommended) |
| **Privacy (P)** | Personal information is collected, used, retained, disclosed, disposed per privacy notice | Optional (include if processing personal data) |

**Recommendation for SaaS Companies:** Include Security (mandatory) + Availability + Confidentiality at minimum. Add Privacy if handling personal data. Add Processing Integrity if data accuracy is critical.

### 1.3 SOC 2 Type I vs. Type II

| Feature | Type I | Type II |
|---------|--------|---------|
| What it assesses | Design of controls at a point in time | Design AND operating effectiveness over a period |
| Period covered | Single date (snapshot) | Typically 6-12 months (observation period) |
| Value to customers | Limited (controls were designed well on one day) | High (controls worked consistently over time) |
| Cost | $20,000-50,000 | $40,000-150,000 |
| Timeline | 2-4 months | 6-12 months (after controls are in place) |
| Use case | Stepping stone to Type II; early-stage companies | Mature compliance; what customers actually want |

**Typical Path:**
1. Year 1: SOC 2 Type I (demonstrate controls are designed correctly)
2. Year 2: SOC 2 Type II (demonstrate controls operate effectively over 6-12 months)
3. Year 3+: Annual SOC 2 Type II renewal

---

## 2. SOC 2 Preparation Timeline

### 2.1 Full Timeline (12-18 Months for Type II)

**Phase 1: Readiness Assessment (Months 1-2)**
- Identify scope (systems, processes, data in scope)
- Select Trust Services Criteria to include
- Gap assessment against SOC 2 criteria
- Identify control gaps and remediation needs
- Create remediation roadmap with timeline
- Select audit firm (or engage after readiness)

**Phase 2: Remediation and Control Implementation (Months 3-6)**
- Implement missing controls
- Draft/update policies and procedures
- Configure monitoring tools
- Implement evidence collection mechanisms
- Train employees on new processes
- Conduct internal testing of controls

**Phase 3: Observation Period (Months 7-12)**
- Operate controls consistently for 6-12 months (audit observation window)
- Collect evidence continuously (automated where possible)
- Conduct periodic internal reviews to ensure controls are operating
- Address any control failures promptly (and document remediation)
- Prepare for auditor fieldwork

**Phase 4: Audit (Months 12-14)**
- Auditor fieldwork (document requests, walkthroughs, testing)
- Respond to auditor inquiries and evidence requests
- Auditor drafts report
- Management review of draft report
- Management assertion letter
- Final report issued

**Phase 5: Post-Audit (Ongoing)**
- Address any reported exceptions or findings
- Begin next year's observation period
- Continuously improve controls based on audit findings
- Share report with customers (under NDA or via secure portal)

### 2.2 Accelerated Timeline (6-9 Months for Type I)

If you need SOC 2 quickly (customer requirement, deal dependency):
1. Engage compliance automation platform (Months 1-2)
2. Implement controls and collect evidence (Months 2-5)
3. SOC 2 Type I audit (Month 5-6)
4. Begin Type II observation period immediately after Type I

---

## 3. Evidence Collection and Management

### 3.1 Types of Evidence

| Evidence Type | Description | Examples |
|--------------|-------------|---------|
| Policies | Written documents defining standards | Information Security Policy, Access Control Policy |
| Procedures | Step-by-step operational instructions | Incident Response Procedure, Change Management Procedure |
| Configurations | System settings demonstrating controls | AWS security group rules, MFA settings, encryption configs |
| Logs | Automated records of system and user activity | Access logs, change logs, audit trails |
| Screenshots | Point-in-time captures of system configurations | Dashboard screenshots, settings pages |
| Records | Documentation of control execution | Meeting minutes, training records, review approvals |
| Reports | Outputs from monitoring and testing activities | Vulnerability scan reports, penetration test reports |
| Attestations | Statements confirming control execution | Employee acknowledgments, vendor certifications |

### 3.2 Evidence Collection Best Practices

**Automate Everything Possible:**
- Use compliance automation platforms to continuously collect evidence
- Connect to cloud providers (AWS, GCP, Azure), identity providers (Okta, Google Workspace), and SaaS tools via API
- Automated evidence is more reliable and less burdensome than manual collection

**Compliance Automation Platforms:**
| Platform | Strengths | Price Range |
|----------|----------|------------|
| Vanta | Broadest integrations; developer-friendly; continuous monitoring | $10K-50K/year |
| Drata | Strong automation; good UI; trust center | $10K-50K/year |
| Secureframe | Easy setup; good for smaller companies | $8K-30K/year |
| Laika | GRC-focused; good for complex compliance needs | $15K-60K/year |
| Sprinto | Cost-effective; good for startups | $5K-25K/year |

**Manual Evidence Collection:**
- Assign evidence owners for each control
- Create a collection calendar (quarterly, monthly, or per-event)
- Use standardized naming conventions and storage locations
- Maintain chain of custody documentation
- Retain evidence for at least 7 years (or as required by regulation)

---

## 4. Control Design and Implementation

### 4.1 Common SOC 2 Controls

**Access Control (CC6):**
| Control | Implementation | Evidence |
|---------|---------------|---------|
| Logical access provisioning | RBAC; approval workflow for access requests | Access request tickets, approval records |
| MFA enforcement | MFA required for all production systems and corporate accounts | Identity provider MFA configuration |
| Access reviews | Quarterly access reviews for all systems | Review completion records, remediation evidence |
| Least privilege | Users have minimum access necessary for their role | Role definitions, access matrices |
| Termination procedures | Access removed within 24 hours of termination | HR notification > IT revocation workflow |
| Password policy | Minimum complexity, rotation, history | Identity provider password policy settings |

**Change Management (CC8):**
| Control | Implementation | Evidence |
|---------|---------------|---------|
| Change approval | All production changes require peer review and approval | PR approval records, deployment logs |
| Testing before deployment | Automated testing (CI/CD) before production deployment | CI/CD pipeline configurations, test results |
| Separation of duties | Developers cannot deploy their own code without review | Branch protection rules, deployment permissions |
| Change documentation | All changes documented with description and rationale | Git commit history, change tickets |
| Rollback capability | Ability to revert changes if issues arise | Deployment rollback procedures, evidence of use |

**Risk Management (CC3/CC9):**
| Control | Implementation | Evidence |
|---------|---------------|---------|
| Risk assessment | Annual formal risk assessment | Risk assessment document, risk register |
| Vulnerability management | Regular vulnerability scanning, timely remediation | Scan reports, remediation records |
| Penetration testing | Annual penetration test by qualified third party | Pen test report, remediation evidence |
| Incident response | Documented incident response plan, tested annually | IRP document, tabletop exercise records |
| Vendor management | Due diligence for third-party service providers | Vendor assessment questionnaires, SOC 2 reports from vendors |

**Human Resources (CC1):**
| Control | Implementation | Evidence |
|---------|---------------|---------|
| Background checks | Background checks for employees with access to sensitive data | Background check completion records |
| Security training | Annual security awareness training for all employees | Training completion records, training content |
| Confidentiality agreements | NDA/CIIA for all employees and contractors | Signed agreements on file |
| Code of conduct | Code of conduct acknowledged by all employees | Acknowledgment records |

### 4.2 Control Design Principles

1. **Preventive > Detective > Corrective:** Prevent issues before they occur; detect them if prevention fails; correct them when detected
2. **Automated > Manual:** Automated controls are more reliable and provide continuous evidence
3. **Policy + Procedure + Technical Control:** All three must align (policy says "we do X"; procedure describes how; technical control enforces it)
4. **Proportionate to Risk:** Higher-risk areas require stronger controls
5. **Testable:** Every control must produce evidence that an auditor can test

---

## 5. Audit Firm Selection

### 5.1 Selection Criteria

| Criterion | Considerations |
|-----------|---------------|
| AICPA accreditation | Must be a licensed CPA firm; check PCAOB registration |
| SOC 2 experience | How many SOC 2 audits have they conducted? Industry-specific experience? |
| Technology focus | Do they understand SaaS, cloud, and modern technology architectures? |
| Team composition | Who will be on the engagement team? What is their experience level? |
| Audit methodology | How do they test controls? What evidence do they require? |
| Communication | Responsiveness during the audit; clarity of information requests |
| Timeline | Estimated time from engagement to report delivery |
| Cost | Fixed fee vs. hourly; what is included vs. extra |
| Report format | Quality and clarity of the final report |
| References | Client references, particularly from similar companies |

### 5.2 Major SOC 2 Audit Firms

**Big 4 (Expensive; for larger companies):**
- Deloitte, EY, PwC, KPMG

**Mid-Market (Good balance of quality and cost):**
- BDO, Grant Thornton, RSM, Moss Adams, Baker Tilly

**SOC 2 Specialists (Cost-effective; fast turnaround):**
- Schellman, A-LIGN, Coalfire, Prescient Assurance, Johanson Group

### 5.3 Typical Costs

| Company Size | Type I Cost | Type II Cost | Timeline |
|-------------|-----------|------------|---------|
| Startup (10-50 employees) | $15K-30K | $30K-60K | 4-8 weeks (Type I); 3-6 months (Type II) |
| Growth (50-200 employees) | $25K-50K | $50K-100K | 6-8 weeks (Type I); 3-6 months (Type II) |
| Enterprise (200+ employees) | $40K-80K | $80K-200K+ | 8-12 weeks (Type I); 6-12 months (Type II) |

---

## 6. Continuous Compliance Monitoring

### 6.1 From Point-in-Time to Continuous

Traditional compliance is point-in-time (audit once a year). Modern compliance requires continuous monitoring.

**Continuous Compliance Elements:**
- Real-time configuration monitoring (detect drift from compliant state)
- Automated evidence collection (eliminate manual evidence gathering)
- Continuous vulnerability scanning (not just annual or quarterly)
- Automated access reviews (trigger-based, not just quarterly)
- Real-time alerting for control failures
- Dashboard visibility for compliance team and leadership

### 6.2 Technology Stack for Continuous Compliance

| Layer | Tools | Purpose |
|-------|-------|---------|
| Compliance Platform | Vanta, Drata, Secureframe | Central compliance management, evidence, audit support |
| Cloud Security | AWS Config, Azure Policy, GCP Security Command Center | Cloud configuration monitoring |
| Identity & Access | Okta, Google Workspace, Azure AD | MFA enforcement, access management, access reviews |
| Endpoint | Jamf, Kandji, CrowdStrike | Device management, endpoint security |
| Vulnerability | Qualys, Tenable, Snyk | Vulnerability scanning and remediation |
| SIEM | Datadog Security, Splunk, Sumo Logic | Log aggregation, threat detection |
| Training | KnowBe4, Curricula, Hoxhunt | Security awareness training and phishing simulation |
| Vendor Risk | Whistic, SecurityScorecard, BitSight | Third-party risk management |

### 6.3 Compliance as Code

**Emerging Best Practice:**
Define compliance controls as code (infrastructure as code, policy as code) to:
- Version-control compliance configurations
- Automate compliance testing in CI/CD pipeline
- Detect and prevent non-compliant deployments
- Maintain audit trail of all compliance-relevant changes

**Tools:**
- Open Policy Agent (OPA): General-purpose policy engine
- HashiCorp Sentinel: Policy as code for Terraform
- AWS Config Rules: Automated compliance evaluation for AWS resources
- Checkov: Static analysis for infrastructure as code (Terraform, CloudFormation, Kubernetes)

---

*Reference: AICPA Trust Services Criteria (2017); AICPA SOC 2 Reporting Guide; ISACA COBIT Framework; NIST SP 800-53 Security and Privacy Controls; ISO/IEC 27001:2022; Cloud Security Alliance (CSA) STAR program.*

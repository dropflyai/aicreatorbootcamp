# HR Operations -- HRIS, Automation, and Employee Lifecycle

## Purpose

This module defines the operational infrastructure that enables the HR function to deliver consistent, compliant, and efficient services across the employee lifecycle. HR operations is the engine room of the people function -- it ensures that policies are executed, systems are maintained, data is accurate, and employees receive reliable service. The HR Brain treats HR ops as a product: employees are the customers, and service quality is measured rigorously.

---

## 1. HRIS (Human Resource Information System)

### 1.1 HRIS as System of Record

The HRIS is the single source of truth for employee data. Every HR process, report, and decision depends on the accuracy and completeness of HRIS data. Data quality failures in the HRIS propagate through payroll, benefits, compliance reporting, and analytics.

### 1.2 HRIS Selection Criteria

| Criterion | Weight | Evaluation Questions |
|-----------|:---:|---------------------|
| Core HR data management | Critical | Employee records, org chart, job history, compensation history |
| Payroll integration | Critical | Native payroll or seamless integration with payroll provider |
| Benefits administration | Critical | Open enrollment, life events, carrier feeds, COBRA tracking |
| Compliance and reporting | Critical | EEO-1, ACA, OSHA, state-specific reporting, audit trails |
| Employee self-service | High | Profile management, PTO requests, pay stubs, benefits enrollment |
| Workflow and approvals | High | Configurable approval chains for offers, promotions, terminations |
| Reporting and analytics | High | Standard reports, custom reporting, data export capabilities |
| Performance management | Medium | Native or integrated performance review, goal tracking |
| Recruiting (ATS) | Medium | Native ATS or integration with preferred ATS |
| Learning management | Medium | Native LMS or integration with learning platform |
| Time and attendance | Medium | Time tracking, scheduling (for hourly/non-exempt) |
| Mobile accessibility | Medium | Employee self-service on mobile devices |
| Global capabilities | Conditional | Multi-country, multi-currency, local compliance (if applicable) |
| API and integrations | High | Open API; pre-built integrations with key tools |
| Security and compliance | Critical | SOC 2 Type II, encryption, role-based access, GDPR capability |

### 1.3 HRIS Market Landscape

| Tier | Systems | Best For | Typical Cost |
|------|---------|----------|-------------|
| Enterprise | Workday, SAP SuccessFactors, Oracle HCM | 5,000+ employees; global; complex compliance | $15-50/employee/month |
| Mid-market | ADP Workforce Now, UKG Pro, Paylocity, Namely | 200-5,000 employees; US-centric | $10-25/employee/month |
| SMB | BambooHR, Gusto, Rippling, Justworks | 10-200 employees; simplicity priority | $6-15/employee/month |
| Startup/PEO | Rippling, Justworks, TriNet | <50 employees; bundled HR+payroll+benefits | $50-200/employee/month (PEO) |

### 1.4 HRIS Data Governance

| Principle | Implementation |
|-----------|---------------|
| Single source of truth | All employee data originates in HRIS; downstream systems consume via integration |
| Data ownership | HR operations owns data integrity; functional areas own data within their domain |
| Data accuracy | Monthly data audits; quarterly comprehensive data review; annual data cleanse |
| Access control | Role-based access; minimum necessary principle; audit log for sensitive data access |
| Change management | All system changes documented; tested in sandbox before production; rollback plan |
| Data retention | Per legal requirements and organizational policy (see compliance calendar) |
| Privacy | Employee data classified as confidential; PII handling per CCPA/GDPR as applicable |

---

## 2. HR Process Automation

### 2.1 Automation Opportunity Assessment

| Process | Current State | Automation Potential | Priority |
|---------|-------------|---------------------|----------|
| Onboarding workflow | Manual checklist; email-based | High (automated task assignment, system provisioning) | P0 |
| PTO requests and tracking | Manual approval; spreadsheet | High (self-service request/approval; auto-accrual) | P0 |
| Offboarding | Manual checklist; ad hoc | High (automated deprovisioning, exit process) | P0 |
| Benefits enrollment | Paper forms or semi-digital | High (fully digital enrollment; carrier feeds) | P1 |
| Performance review cycle | Email reminders; manual tracking | High (automated cycle management; reminder workflows) | P1 |
| Compensation changes | Email approval chains | Medium (workflow automation with approval routing) | P1 |
| Offer letter generation | Template + manual customization | Medium (merge fields; digital signature) | P2 |
| I-9 verification | Paper-based | Medium (electronic I-9 with E-Verify integration) | P2 |
| Employee surveys | Manual distribution; manual analysis | Medium (automated distribution; real-time analytics) | P2 |
| Compliance training | Manual assignment and tracking | Medium (LMS auto-assignment based on role/location) | P2 |

### 2.2 Automation Principles

- **Automate the routine, humanize the complex**: Automate repetitive, rule-based tasks (data entry, reminders, routing). Keep human judgment for nuanced decisions (performance evaluation, accommodation, employee relations).
- **Employee experience first**: Automation should improve the employee experience, not just HR efficiency. If automation makes the process worse for employees, reconsider.
- **Audit trail**: All automated processes must maintain a complete audit trail for compliance.
- **Exception handling**: Every automated workflow must have a clear exception path for non-standard situations.
- **Testing**: Test all automations thoroughly before production deployment; maintain rollback capability.

### 2.3 Integration Architecture

```
                    ┌──────────────┐
                    │     HRIS     │
                    │ (System of   │
                    │   Record)    │
                    └──────┬───────┘
                           │
    ┌──────────┬───────────┼───────────┬──────────┐
    │          │           │           │          │
    ▼          ▼           ▼           ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Payroll │ │  ATS   │ │Benefits│ │Learning│ │ Perf   │
│System  │ │(Recrui-│ │Admin   │ │Mgmt    │ │Mgmt    │
│        │ │ ting)  │ │        │ │System  │ │System  │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘
    │          │           │           │          │
    ▼          ▼           ▼           ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Finance/│ │Backgrnd│ │ Health │ │Content │ │Engage- │
│  GL    │ │ Check  │ │Carriers│ │Provider│ │ment    │
│        │ │        │ │        │ │        │ │Survey  │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

---

## 3. Employee Lifecycle Management

### 3.1 Lifecycle Stages

```
PRE-HIRE → HIRE → ONBOARD → DEVELOP → PERFORM → PROMOTE/TRANSFER → OFFBOARD
   │         │        │         │         │            │                │
   │         │        │         │         │            │                │
   ▼         ▼        ▼         ▼         ▼            ▼                ▼
Background  Offer    Day 1     Training  Reviews    Role change      Exit
check       letter   setup     L&D       Feedback   Comp adjust     interview
I-9 prep    Systems  Benefits  Coaching  Goals      New team        Final pay
            access   Buddy     IDP       Calibrate  onboarding      COBRA
            Payroll  30-60-90  Mentor    Merit                      Knowledge
            setup    plan                increase                    transfer
```

### 3.2 Employee Lifecycle Automation Checklist

| Stage | Automated Task | System | Trigger |
|-------|---------------|--------|---------|
| **Pre-hire** | Background check initiation | ATS → Background vendor | Offer accepted |
| **Pre-hire** | Equipment order | ATS → IT ticketing system | Offer accepted |
| **Hire** | Employee record creation | ATS → HRIS | Start date confirmed |
| **Hire** | Payroll setup | HRIS → Payroll | Employee record created |
| **Hire** | Benefits enrollment invitation | HRIS → Benefits platform | Start date |
| **Onboard** | Onboarding task checklist | HRIS → Task management | Start date |
| **Onboard** | System access provisioning | HRIS → IT/Identity management | Start date |
| **Onboard** | Manager notification | HRIS → Email/Slack | Start date - 1 week |
| **Onboard** | Compliance training assignment | HRIS → LMS | Start date |
| **Develop** | IDP reminder | Performance system | Quarterly |
| **Perform** | Review cycle launch | Performance system | Per cycle calendar |
| **Perform** | Merit increase workflow | HRIS → Compensation | Annual cycle |
| **Transfer** | Org chart update | HRIS | Effective date |
| **Transfer** | Access modification | HRIS → IT | Effective date |
| **Offboard** | Exit interview scheduling | HRIS → Survey/calendar | Termination date - 2 weeks |
| **Offboard** | System access revocation | HRIS → IT/Identity management | Last day |
| **Offboard** | Final pay calculation | HRIS → Payroll | Last day |
| **Offboard** | COBRA notification | HRIS → Benefits/COBRA vendor | Termination date |
| **Offboard** | Equipment return | HRIS → IT | Last day |

---

## 4. Compliance Tracking

### 4.1 Compliance Calendar

| Month | Compliance Activity | Owner | Deadline |
|-------|-------------------|-------|----------|
| January | ACA 1095-C distribution to employees | HR Ops/Payroll | January 31 |
| January | State W-2 filing deadlines | Payroll | Varies by state |
| February | 1094-C/1095-C filing with IRS | Payroll/HR Ops | February 28 (paper) / March 31 (electronic) |
| March | EEO-1 Component 1 data collection | HR Ops | Filing deadline varies (typically March-May) |
| April | Q1 401(k) compliance testing | Benefits/TPA | April 15 |
| May | OSHA 300A posting removal | Safety/HR Ops | April 30 |
| July | Form 5500 filing (7 months after plan year end) | Benefits/TPA | July 31 (calendar year plans) |
| September | Benefits renewal strategy | Benefits/Broker | September 30 |
| October | Open enrollment communications | Benefits/HR Ops | October (varies) |
| November | Open enrollment period | Benefits/HR Ops | November (typically 2-4 weeks) |
| December | Year-end payroll processing | Payroll | December 31 |
| Ongoing | New hire reporting (within 20 days) | Payroll | Per state requirement |
| Ongoing | I-9 reverification (expiring work authorization) | HR Ops | Before expiration date |
| Ongoing | FMLA eligibility tracking | HR Ops/HRBP | As leave requests arise |
| Ongoing | Harassment prevention training | L&D/HR Ops | Per state mandate (CA, NY, CT, etc.) |

### 4.2 Compliance Dashboard

```
COMPLIANCE STATUS DASHBOARD

I-9 Compliance:
  Section 1 complete within 1 day of start:   98% ✓
  Section 2 complete within 3 days of start:   95% ✓
  Reverification current:                      100% ✓

Benefits Compliance:
  ACA coverage offered to all eligible:         100% ✓
  COBRA notices sent within 44 days:            100% ✓
  Form 5500 filed on time:                      Yes ✓

Training Compliance:
  Harassment prevention (required states):      92% ⚠ (8% overdue)
  Security awareness training:                  97% ✓
  Safety training (where applicable):           100% ✓

EEO and Reporting:
  EEO-1 filed:                                  Yes ✓
  State pay data reports filed:                 Yes ✓
  Affirmative action plan current:              Yes ✓

Record Retention:
  Personnel files within retention policy:      100% ✓
  Terminated employee files secured:            100% ✓
  Purge schedule on track:                      Yes ✓
```

---

## 5. HR Service Level Agreements (SLAs)

### 5.1 SLA Framework

HR operations should operate with defined service levels, measured and reported like any customer-facing function:

| Service | SLA Target | Measurement | Escalation |
|---------|-----------|-------------|-----------|
| New hire system setup | Complete by start date | % complete on time | Manager + IT 3 days before start |
| Payroll inquiry resolution | 24 business hours | Average resolution time | HR Ops manager at 48 hours |
| Benefits enrollment question | 24 business hours | Average response time | Benefits lead at 48 hours |
| Employment verification | 48 business hours | Average completion time | HR Ops manager at 72 hours |
| FMLA eligibility determination | 5 business days | % within SLA | HRBP at day 4 |
| Offer letter generation | 2 business days | Average turnaround | Recruiting lead at day 2 |
| Exit paperwork processing | Within 1 business day of last day | % within SLA | HR Ops manager |
| HR ticket response (general) | 4 business hours (acknowledgment) | Average first response time | HR Ops manager at 8 hours |
| HR ticket resolution (general) | 48 business hours | Average resolution time | HR Ops manager at 72 hours |

### 5.2 HR Ticketing System

| Requirement | Description |
|-------------|-----------|
| Channel | Self-service portal, Slack integration, email intake |
| Categorization | Auto-categorize by topic (payroll, benefits, leave, general) |
| Routing | Auto-route to appropriate specialist based on category |
| SLA tracking | Automated SLA clock; escalation at threshold |
| Knowledge base | Self-service FAQ and guides reduce ticket volume |
| Reporting | Volume, category, resolution time, satisfaction, trends |
| Confidentiality | Sensitive tickets (employee relations, accommodation) access-restricted |

### 5.3 HR Ops Metrics

| Metric | Formula | Target | Frequency |
|--------|---------|--------|-----------|
| Ticket volume | Total tickets per month | Track trend (goal: decrease through self-service) | Monthly |
| First response time | Average time to first acknowledgment | <4 business hours | Weekly |
| Resolution time | Average time to full resolution | <48 business hours | Weekly |
| Employee satisfaction | Post-resolution survey (1-5 scale) | >4.0/5.0 | Monthly |
| Self-service rate | Self-service resolutions / Total inquiries | >40% | Monthly |
| Data accuracy | Random audit of employee records (sample 10%) | >99% accuracy | Monthly |
| Process compliance | % of lifecycle events completed per SLA | >95% | Monthly |
| Payroll accuracy | Payroll errors / Total pay transactions | <0.5% | Per pay period |

---

## 6. Employee Records Management

### 6.1 Personnel File Contents

| Document | Retention Location | Access Level |
|----------|-------------------|-------------|
| Application and resume | HRIS / ATS | HR, Hiring manager (during process) |
| Offer letter (signed) | HRIS | HR, Employee (self-service) |
| I-9 (Form) | Separate I-9 file (NOT in personnel file) | HR Ops (designated verifiers only) |
| W-4 and state tax forms | Payroll system | Payroll, Employee |
| Benefits enrollment | Benefits platform | Benefits admin, Employee |
| Performance reviews | Performance system | HR, Manager, Employee |
| Disciplinary actions | HRIS (restricted) | HR, Manager (current), Legal |
| Medical/accommodation records | Separate medical file (ADA requirement) | HR (designated), Legal |
| Workers' compensation | Separate file | HR (designated), Legal, Insurance |
| Training records | LMS or HRIS | HR, Manager, Employee |
| Separation agreement | HRIS (restricted) | HR, Legal |
| COBRA election | Benefits platform | Benefits admin |

### 6.2 Record Retention Schedule

| Record Type | Federal Minimum | Recommended | Authority |
|------------|:---:|:---:|-----------|
| Applications and hiring records | 1 year | 3 years | EEOC, ADEA, OFCCP |
| Payroll records | 3 years | 7 years | FLSA, IRS |
| I-9 forms | 3 years from hire OR 1 year after termination (whichever is later) | Per statute | IRCA |
| FMLA records | 3 years | 3 years | FMLA regulations |
| OSHA records | 5 years | 30 years (for exposure records) | OSHA |
| ERISA/benefit plan records | 6 years | 7 years | ERISA |
| EEO-1 reports | 1 year | Indefinite | EEOC |
| Personnel files (general) | No federal minimum (state varies) | 7 years after termination | Best practice; state law |
| Medical records | Duration of employment + 30 years (if OSHA exposure) | Duration + 30 years | ADA, OSHA |
| Tax records | 4 years | 7 years | IRS |

---

## 7. HR Technology Stack Management

### 7.1 Annual Technology Review

Conduct annual review of the HR technology stack:

1. **Utilization audit**: Is each tool being used to its full capability? Feature utilization rates.
2. **User satisfaction**: Employee and HR team satisfaction with each tool (survey).
3. **Integration health**: Are integrations functioning correctly? Data sync lag and errors.
4. **Cost-benefit**: Total cost of ownership vs. value delivered per tool.
5. **Vendor health**: Vendor financial stability, product roadmap alignment, support quality.
6. **Security review**: SOC 2 status, data handling practices, incident history.
7. **Redundancy check**: Are multiple tools serving the same function? Consolidation opportunities.

### 7.2 Change Management for HR Systems

When implementing or changing HR systems:

- **Stakeholder analysis**: Who is affected? What is their current workflow? What changes?
- **Communication plan**: Why the change? What does it mean for each user group? Timeline.
- **Training**: Role-based training for all user groups (HR admins, managers, employees).
- **Parallel running**: Run old and new systems simultaneously during transition (where feasible).
- **Support plan**: Dedicated support during first 30 days post-launch; enhanced SLA.
- **Feedback loop**: Collect and act on user feedback during first 90 days.
- **Success metrics**: Define what success looks like before launch; measure at 30/60/90 days.

---

## References

- SHRM. (2023). *HR Technology Survey*.
- Kavanagh, M. J., Thite, M., & Johnson, R. D. (2015). *Human Resource Information Systems* (3rd ed.). SAGE.
- Sierra-Cedar. (2023). *HR Systems Survey*.
- Bersin, J. (2023). *HR Technology Market Report*.

---

**This module governs HR operations. Accurate data, efficient processes, compliant execution. The foundation of trust.**

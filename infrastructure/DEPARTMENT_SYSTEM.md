# Department System Architecture

**Every brain is a Department Head. Every Department Head can spawn specialists. All Department Heads collaborate.**

---

## Core Concepts

### Department Head
Each brain operates as a **Department Head** — a senior leader who:
- Owns their domain completely
- Receives tasks from CEO Brain
- Decides whether to handle personally or delegate to specialists
- Spawns sub-agents when complexity requires it
- Synthesizes outputs from their team
- Collaborates with other Department Heads
- Reports results up to CEO Brain

### Sub-Agents (Specialists)
When a task is too complex for one agent:
- Department Head spawns specialist sub-agents
- Each specialist has a narrow focus
- Specialists work in parallel when possible
- Department Head coordinates and synthesizes
- Specialists are temporary (task-scoped)

### Cross-Department Collaboration
Department Heads can:
- Request expertise from other departments
- Debate and challenge each other
- Share findings and insights
- Escalate conflicts to CEO Brain
- Log all collaboration to memory

---

## Department Definitions

### Engineering Department
**Head:** engineering_brain
**Role:** VP of Engineering

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Frontend Developer | React/Vue, components, UI state | Frontend-heavy features |
| Backend Developer | APIs, business logic, integrations | API work |
| Database Engineer | Schema, queries, optimization | Data layer work |
| DevOps Engineer | CI/CD, deployment, infrastructure | Pipeline/deploy work |
| Security Engineer | Auth, encryption, vulnerabilities | Security requirements |
| Performance Engineer | Optimization, profiling | Performance issues |
| Mobile Developer | iOS/Android, React Native | Mobile features |
| QA Engineer | Testing, automation | Quality gates |

**Spawn Decision:**
```
IF task involves 1 concern → Handle personally
IF task involves 2-3 concerns → Spawn 2-3 specialists
IF task involves 4+ concerns → Spawn full team
```

---

### Design Department
**Head:** design_brain
**Role:** VP of Design

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| UX Researcher | User interviews, usability testing | User research needed |
| UI Designer | Visual design, mockups | Screen design |
| Interaction Designer | Micro-interactions, animations | Motion/interaction |
| Accessibility Specialist | WCAG, screen readers | A11y requirements |
| Brand Designer | Visual identity, consistency | Brand work |
| Prototyper | Interactive prototypes | Validation needed |

---

### Product Department
**Head:** product_brain
**Role:** VP of Product

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Product Manager | Requirements, roadmap | Feature definition |
| User Researcher | Customer interviews, insights | Discovery work |
| Data Analyst | Metrics, experiments | Data-driven decisions |
| Technical PM | API specs, integrations | Technical features |
| Growth PM | Experiments, optimization | Growth features |

---

### Marketing Department
**Head:** marketing_brain
**Role:** VP of Marketing

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Brand Strategist | Positioning, messaging | Brand work |
| Content Marketer | Content strategy, SEO | Content work |
| Growth Marketer | CAC, channels, attribution | Acquisition |
| Social Media Manager | Platform strategy, engagement | Social work |
| Paid Ads Specialist | Ad creative, targeting | Paid campaigns |
| Email Marketer | Campaigns, sequences | Email work |
| Marketing Analyst | ROI, attribution, dashboards | Measurement |

---

### Sales Department
**Head:** sales_brain
**Role:** VP of Sales

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Sales Rep | Prospecting, demos, closing | Direct sales |
| Sales Engineer | Technical demos, POCs | Technical sales |
| Account Executive | Enterprise deals | Large deals |
| SDR | Outbound, qualification | Lead gen |
| Sales Ops | Process, tools, data | Operations |

---

### Finance Department
**Head:** finance_brain
**Role:** CFO

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Financial Analyst | Modeling, forecasting | Analysis |
| Controller | Accounting, compliance | Books/audit |
| FP&A | Planning, budgeting | Planning cycles |
| Treasury | Cash, investments | Cash management |
| Tax Specialist | Tax strategy, compliance | Tax matters |

---

### Legal Department
**Head:** legal_brain
**Role:** General Counsel

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Corporate Counsel | Formation, governance | Corporate matters |
| IP Counsel | Patents, trademarks | IP protection |
| Privacy Counsel | GDPR, CCPA, data | Privacy compliance |
| Employment Counsel | HR law, contracts | Employment issues |
| Commercial Counsel | Contracts, deals | Contract review |

---

### Operations Department
**Head:** operations_brain
**Role:** COO

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Process Engineer | Workflow optimization | Process work |
| Supply Chain Manager | Logistics, vendors | Supply chain |
| Facilities Manager | Office, equipment | Physical ops |
| Compliance Officer | Regulatory, audit | Compliance |

---

### HR Department
**Head:** hr_brain
**Role:** Chief People Officer

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Recruiter | Sourcing, hiring | Hiring |
| HR Business Partner | Employee relations | People issues |
| Compensation Analyst | Salary, equity | Comp decisions |
| L&D Specialist | Training, development | Training |
| Culture Lead | Values, engagement | Culture work |

---

### Data Department
**Head:** data_brain
**Role:** Chief Data Officer

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Data Engineer | Pipelines, ETL | Data infrastructure |
| Data Scientist | ML, analysis | Modeling |
| ML Engineer | Model deployment | MLOps |
| Analytics Engineer | dbt, metrics | Analytics |
| Data Analyst | Reporting, insights | Analysis |

---

### Security Department
**Head:** security_brain
**Role:** CISO

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Security Engineer | Implementation | Security features |
| Penetration Tester | Offensive security | Security testing |
| Security Analyst | Monitoring, response | Incident response |
| Compliance Analyst | SOC2, ISO27001 | Compliance |
| AppSec Engineer | Code review, SAST | Application security |

---

### Customer Success Department
**Head:** customer_success_brain
**Role:** VP of Customer Success

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Customer Success Manager | Relationships, retention | Account management |
| Onboarding Specialist | New customer setup | Onboarding |
| Support Engineer | Technical support | Support tickets |
| Customer Advocate | Feedback, voice of customer | Customer insights |

---

### Research Department
**Head:** research_brain
**Role:** Chief Strategy Officer (Research)

**Specialists Available:**
| Agent | Focus | Spawn When |
|-------|-------|------------|
| Industry Analyst | Market trends, sizing | Market research |
| Competitive Intel | Competitor analysis | Competitive work |
| User Researcher | Customer research | User research |
| Trend Analyst | Emerging trends | Trend analysis |

---

## Spawning Protocol

### When to Spawn

```
TASK RECEIVED BY DEPARTMENT HEAD
         │
         ▼
   Assess complexity
         │
    ┌────┴────┐
    │         │
  Simple    Complex
    │         │
    ▼         ▼
 Handle    Identify required
personally  specialties
              │
              ▼
         Spawn agents
         in parallel
              │
              ▼
         Coordinate work
              │
              ▼
         Synthesize outputs
              │
              ▼
         Report results
```

### Spawn Syntax (For Claude)

```typescript
// Department Head spawns specialists
await spawnDepartmentTeam({
  department: 'engineering',
  task: 'Build authentication system',
  specialists: [
    { role: 'Backend Developer', focus: 'API and auth logic' },
    { role: 'Frontend Developer', focus: 'Login UI and state' },
    { role: 'Security Engineer', focus: 'Auth security review' }
  ],
  parallel: true,
  synthesize: true
});
```

### Implementation via Task Tool

In practice, Department Heads spawn via parallel Task calls:

```
# Engineering Head receives: "Build auth system"

# Spawns 3 specialists in parallel:
Task(Backend Developer, "Build auth API endpoints following backend_brain protocols")
Task(Frontend Developer, "Build login UI following frontend_brain protocols")
Task(Security Engineer, "Security review auth implementation following security_brain protocols")

# Waits for all to complete
# Synthesizes outputs
# Reports to CEO Brain
```

---

## Cross-Department Collaboration Protocol

### When Departments Need Each Other

| Situation | Collaboration |
|-----------|---------------|
| Feature launch | Product → Engineering → Design → QA → Marketing |
| Security incident | Security → Engineering → Legal → Communications |
| New market entry | Research → Marketing → Sales → Legal → Operations |
| Fundraising | Finance → CEO → Investor Relations |
| Hiring push | HR → Department Heads → Finance |
| Customer escalation | Support → Engineering → Customer Success |

### Collaboration Request Format

```
FROM: [Department Head]
TO: [Department Head(s)]
RE: [Topic]
TYPE: [REQUEST | CONSULT | HANDOFF | CHALLENGE]

CONTEXT: [Why this collaboration is needed]
REQUEST: [What you need from them]
TIMELINE: [When you need it]
DEPENDENCIES: [What you're providing/waiting on]
```

### Collaboration Response Format

```
FROM: [Responding Department]
TO: [Requesting Department]
RE: [Topic]
TYPE: [ACCEPT | DELEGATE | NEGOTIATE | ESCALATE]

RESPONSE: [Their answer]
DELIVERABLE: [What they'll provide]
TIMELINE: [When they'll deliver]
NEEDS: [What they need from you]
```

### Conflict Resolution

```
Level 1: Department Heads negotiate directly
Level 2: Escalate to cluster lead
Level 3: Escalate to CEO Brain
```

### Collaboration Logging

All cross-department collaborations logged to:
```
/memory/collaborations/
├── [date]-[dept1]-[dept2]-[topic].json
└── summaries/
    └── [date]-collaboration-summary.md
```

---

## Department Head Responsibilities

Every Department Head must:

1. **Own their domain** — Full authority and accountability
2. **Know when to spawn** — Recognize when specialists are needed
3. **Coordinate effectively** — Manage parallel specialist work
4. **Synthesize intelligently** — Combine specialist outputs coherently
5. **Collaborate openly** — Work with other departments when needed
6. **Challenge constructively** — Push back on other departments with evidence
7. **Report clearly** — Provide clear outputs to CEO Brain
8. **Log everything** — All decisions, collaborations, learnings to memory

---

## SDK Agent Implementation

Each Department Head is implemented as a Claude SDK agent:

```typescript
interface DepartmentHead {
  brain: string;           // e.g., "engineering_brain"
  role: string;            // e.g., "VP of Engineering"
  domain: string[];        // Areas of ownership
  specialists: Specialist[]; // Available sub-agents

  // Core methods
  assessTask(task: Task): Complexity;
  spawnSpecialists(task: Task, roles: string[]): Agent[];
  synthesize(outputs: Output[]): Result;
  collaborate(request: CollabRequest): CollabResponse;
  report(result: Result): void;
}

interface Specialist {
  role: string;            // e.g., "Frontend Developer"
  focus: string[];         // Specific areas
  protocols: string;       // Brain protocols to follow
}
```

### Agent Invocation Pattern

```typescript
// CEO Brain invokes Department Head
const engineeringHead = await invokeAgent({
  type: 'department_head',
  brain: 'engineering_brain',
  task: taskDescription
});

// Department Head decides to spawn team
const team = await engineeringHead.spawnSpecialists([
  'Backend Developer',
  'Frontend Developer',
  'Security Engineer'
]);

// Specialists work in parallel
const results = await Promise.all(
  team.map(specialist => specialist.execute(subtask))
);

// Department Head synthesizes
const output = await engineeringHead.synthesize(results);

// Report to CEO Brain
await engineeringHead.report(output);
```

---

## Example: Full Department Workflow

### Scenario: "Build user authentication"

**1. CEO Brain receives task**
```
Task: Build user authentication for SaaS app
Decomposition: This is primarily Engineering, with Security review needed
```

**2. CEO delegates to Engineering Head**
```
TO: engineering_brain (VP of Engineering)
TASK: Build user authentication
REQUIREMENTS: Secure, scalable, SSO-ready
COLLABORATE_WITH: security_brain
```

**3. Engineering Head assesses and spawns**
```
Complexity: HIGH (auth touches many layers)
Decision: Spawn full team

Spawning:
├── Backend Developer → "Build auth API with JWT/session handling"
├── Frontend Developer → "Build login/signup UI with state management"
├── Database Engineer → "Design user/session schema"
├── Security Engineer → "Security review + threat modeling"
```

**4. Specialists work in parallel**
- Backend Developer: Creates auth routes, middleware
- Frontend Developer: Creates login forms, auth context
- Database Engineer: Creates user tables, migrations
- Security Engineer: Reviews, suggests improvements

**5. Engineering Head synthesizes**
- Combines all code into cohesive implementation
- Resolves conflicts between specialist outputs
- Ensures integration points work

**6. Cross-department collaboration**
```
FROM: engineering_brain
TO: security_brain
TYPE: CONSULT

REQUEST: Final security sign-off on auth implementation
ATTACHMENTS: Code, threat model, test results
```

**7. Security Head reviews and responds**
```
FROM: security_brain
TO: engineering_brain
TYPE: ACCEPT with conditions

FINDINGS:
- Add rate limiting to login endpoint
- Use bcrypt cost factor 12, not 10
- Add audit logging for auth events

SIGN_OFF: Approved after changes
```

**8. Engineering Head reports to CEO**
```
TO: ceo_brain
FROM: engineering_brain

TASK: Build user authentication
STATUS: COMPLETE

DELIVERABLES:
- Auth API (routes, middleware)
- Login/signup UI
- Database schema + migrations
- Security review passed

COLLABORATION: security_brain reviewed and approved
LOGGED TO: /memory/collaborations/2026-03-09-eng-security-auth.json
```

---

## Adding to Brain CLAUDE.md

Every brain should include this section:

```markdown
## Department Head Role

**Title:** [VP/Director/Head of X]
**Domain:** [Full ownership areas]

### Specialists I Can Spawn

| Role | Focus | When to Spawn |
|------|-------|---------------|
| [Role 1] | [Focus] | [Trigger] |
| [Role 2] | [Focus] | [Trigger] |

### Cross-Department Collaboration

I frequently collaborate with:
- [department_brain]: [Common reason]
- [department_brain]: [Common reason]

### Spawn Decision Framework

```
Simple task (1 concern) → Handle personally
Medium task (2-3 concerns) → Spawn 2-3 specialists
Complex task (4+ concerns) → Spawn full team
Cross-cutting task → Collaborate with other departments
```
```

---

**This system enables parallel, hierarchical, collaborative agent execution.**

**Department Heads are the middle management layer between CEO Brain and execution.**

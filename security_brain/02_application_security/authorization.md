# Authorization — Access Control Models and Policy Enforcement

## Overview

Authorization determines what an authenticated entity is permitted to do. It answers: "You are who you say you are — but are you allowed to do this?" This module covers access control models (RBAC, ABAC, ReBAC), policy engines, broken access control patterns, and implementation guidance. Content draws from NIST SP 800-162 (ABAC Guide), OWASP ASVS, Google Zanzibar (relationship-based access control at scale), and the empirical reality that Broken Access Control is the #1 OWASP Top 10 vulnerability (2021).

Authorization failures are the most common vulnerability class. The root cause is almost always: authorization logic is scattered, inconsistent, or absent from server-side code.

---

## Core Authorization Principles

### 1. Server-Side Enforcement (Non-Negotiable)

```
Authorization MUST be enforced server-side. Client-side authorization
(hiding buttons, disabling form fields, conditional UI rendering) is
a user experience convenience, NOT a security control.

RULE: If removing all client-side JavaScript still allows the action
via direct API call, the authorization is broken.

Every API endpoint, every database query, every file access MUST
include server-side authorization checks.
```

### 2. Default Deny

```
The default state for any access request is DENY.
Access must be explicitly granted, never implicitly available.

# BAD — Deny specific actions (allowlist of denials, fail-open)
if user.role == "banned":
    deny()
# All non-banned users can do everything — dangerous

# GOOD — Allow specific actions (denylist of permissions, fail-closed)
if not user.has_permission("documents:write"):
    deny()
# Only users with explicit permission can write documents
```

### 3. Principle of Least Privilege

Every user, service, and process should have the minimum permissions necessary to perform their intended function. Permissions should be:
- **Scoped** — limited to specific resources, not global
- **Time-limited** — granted for the minimum necessary duration
- **Reviewable** — auditable and subject to periodic review
- **Revocable** — can be removed immediately when no longer needed

### 4. Separation of Duty

Critical operations should require multiple authorization decisions from different parties:
- Deploying to production requires code review approval AND deployment approval
- Financial transactions above threshold require maker AND checker
- Administrative actions require the action AND a second administrator's confirmation

---

## Access Control Models

### RBAC (Role-Based Access Control)

**Standard:** NIST RBAC Model (Ferraiolo, Sandhu, Gavrila, Kuhn — 2001).

**Concept:** Users are assigned to roles; roles are assigned permissions. Users inherit permissions through their role assignments.

```
User ──assigns──→ Role ──grants──→ Permission ──acts on──→ Resource

Example:
  User: alice@example.com
  Role: editor
  Permissions: documents:read, documents:write, documents:publish
  Resources: /documents/*
```

**RBAC hierarchy (NIST levels):**

| Level | Name | Description |
|-------|------|-------------|
| RBAC0 | Flat | Users, roles, permissions. No hierarchy. |
| RBAC1 | Hierarchical | Roles can inherit from parent roles (admin inherits editor permissions) |
| RBAC2 | Constrained | Separation of duty constraints (user cannot be both auditor and admin) |
| RBAC3 | Symmetric | Combines hierarchy and constraints |

**Implementation pattern:**

```typescript
// Database schema (simplified)
// users: id, email, ...
// roles: id, name (admin, editor, viewer)
// user_roles: user_id, role_id
// role_permissions: role_id, permission (string like "documents:write")

// Middleware (Next.js API route example)
function requirePermission(permission: string) {
  return async (req: NextRequest) => {
    const user = await getCurrentUser(req);
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const hasPermission = await checkPermission(user.id, permission);
    if (!hasPermission) return Response.json({ error: "Not found" }, { status: 404 });
    // Return 404 instead of 403 to prevent resource enumeration
  };
}

// Usage
export const GET = requirePermission("documents:read")(async (req) => {
  // Only executes if user has documents:read permission
  const docs = await getDocuments(req.user.id);
  return Response.json(docs);
});
```

**RBAC strengths:**
- Simple to understand and implement
- Easy to audit (list roles, list users in roles, list permissions per role)
- Well-supported by frameworks and databases

**RBAC weaknesses:**
- Role explosion: as resource types and access patterns grow, the number of roles multiplies
- Coarse-grained: "editor" role may grant too much or too little for specific contexts
- No contextual awareness: cannot express "allow access only during business hours" or "allow access only to own department's resources"

**When to use RBAC:** Applications with well-defined, stable role boundaries and fewer than 20 roles. Most web applications start here.

---

### ABAC (Attribute-Based Access Control)

**Standard:** NIST SP 800-162 (Guide to ABAC Definition and Considerations).

**Concept:** Access decisions are based on attributes of the subject, resource, action, and environment. Far more granular than RBAC.

```
Policy: ALLOW if
  subject.department == resource.department AND
  subject.clearance_level >= resource.classification AND
  action IN ["read", "list"] AND
  environment.time BETWEEN "09:00" AND "18:00" AND
  environment.ip_range IN corporate_network

Components:
  PEP (Policy Enforcement Point): Intercepts access requests, asks PDP
  PDP (Policy Decision Point): Evaluates policies against attributes
  PIP (Policy Information Point): Provides attribute data
  PAP (Policy Administration Point): Manages policies
```

**ABAC implementation with OPA (Open Policy Agent):**

```rego
# policy.rego — OPA policy language (Rego)
package authz

default allow = false

# Users can read documents in their own department
allow {
    input.action == "read"
    input.resource.type == "document"
    input.subject.department == input.resource.department
}

# Managers can approve requests from their direct reports
allow {
    input.action == "approve"
    input.resource.type == "request"
    input.subject.id == input.resource.manager_id
}

# Admins can do anything during business hours from corporate network
allow {
    input.subject.role == "admin"
    time.hour(time.now_ns()) >= 9
    time.hour(time.now_ns()) < 18
    net.cidr_contains("10.0.0.0/8", input.environment.source_ip)
}
```

**ABAC strengths:**
- Extremely granular and flexible
- Handles complex access patterns without role explosion
- Context-aware (time, location, device, risk score)
- Supports dynamic policies without code changes

**ABAC weaknesses:**
- Complex to implement and debug
- Harder to audit ("why does this user have access?" requires policy evaluation)
- Requires reliable attribute sources (PIP)
- Performance considerations for complex policy evaluation

**When to use ABAC:** Applications with complex, dynamic access requirements. Multi-tenant systems. Healthcare (HIPAA access controls). Financial services. Government systems.

---

### ReBAC (Relationship-Based Access Control)

**Origin:** Google Zanzibar paper (2019). Used by Google for Google Drive, YouTube, Google Cloud IAM.

**Concept:** Authorization is determined by the relationship between the user and the resource. "Alice can edit Document X because Alice is a member of Team Y, and Team Y is the owner of Folder Z, which contains Document X."

```
Relationship tuples:
  document:readme#viewer@user:alice        (Alice can view readme)
  document:readme#owner@team:engineering   (Engineering team owns readme)
  team:engineering#member@user:alice       (Alice is member of engineering)
  folder:docs#parent@document:readme       (readme is in docs folder)

Check: Can alice edit document:readme?
  → alice is member of engineering
  → engineering owns readme
  → owners can edit
  → YES
```

**Implementation options:**
| Solution | Type | Notes |
|----------|------|-------|
| SpiceDB | Open-source | Google Zanzibar-inspired, gRPC API, Rego-like DSL |
| Ory Keto | Open-source | Zanzibar-based, REST/gRPC API |
| Auth0 FGA | Managed service | Fine-Grained Authorization, OpenFGA-based |
| AWS Verified Permissions | Managed service | Cedar policy language, AWS-native |
| Authzed | Commercial | SpiceDB managed service |

**ReBAC strengths:**
- Natural fit for document/resource sharing (Google Drive model)
- Scales to billions of relationships (Zanzibar serves trillions at Google)
- Intuitive for users ("share with team" instead of "assign role")
- Handles inheritance naturally (folder permissions cascade to documents)

**When to use ReBAC:** Applications with sharing/collaboration models, multi-tenant SaaS, systems where resources have complex ownership/sharing hierarchies.

---

## Policy Engine Architecture

### Centralized Policy Enforcement (Recommended)

```
┌──────────────┐     ┌────────────────┐     ┌─────────────┐
│   API/App    │────→│  Policy Engine │────→│  Decision:  │
│   (PEP)     │     │    (PDP)       │     │  Allow/Deny │
│              │←────│  OPA/Cedar/    │     │  + reasons  │
│  Enforce     │     │  SpiceDB       │     └─────────────┘
│  decision    │     │                │
└──────────────┘     │  Attributes    │
                     │  from PIP:     │
                     │  - User attrs  │
                     │  - Resource    │
                     │  - Environment │
                     └────────────────┘

Benefits:
  - Single source of truth for authorization logic
  - Policy changes without code deployment
  - Centralized audit logging of all access decisions
  - Consistent enforcement across all services
  - Testable policies (unit test authorization rules)
```

### Policy Engine Selection Guide

| Engine | Model | Language | Deployment | Best For |
|--------|-------|----------|------------|----------|
| OPA (Open Policy Agent) | ABAC | Rego | Sidecar/library | Kubernetes, microservices, general ABAC |
| Cedar (AWS) | ABAC + RBAC | Cedar | Library/service | AWS-native, structured policies |
| SpiceDB | ReBAC | Schema DSL | Service | Sharing/collaboration, Zanzibar model |
| Casbin | Multi-model | Config-based | Library | Simpler applications, embedded use |

---

## Broken Access Control — Vulnerability Patterns

### Pattern 1: Missing Authorization Check

```python
# VULNERABLE — No authorization check at all
@app.get("/api/admin/users")
def list_all_users():
    return db.query(User).all()  # Anyone can list all users

# FIXED — Check authorization
@app.get("/api/admin/users")
@require_role("admin")
def list_all_users(current_user: User = Depends(get_current_user)):
    return db.query(User).all()
```

### Pattern 2: IDOR (Insecure Direct Object Reference)

```python
# VULNERABLE — No ownership check
@app.get("/api/orders/{order_id}")
def get_order(order_id: int, user: User = Depends(get_current_user)):
    return db.query(Order).get(order_id)  # User can access ANY order by ID

# FIXED — Ownership check
@app.get("/api/orders/{order_id}")
def get_order(order_id: int, user: User = Depends(get_current_user)):
    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == user.id  # Only return if user owns the order
    ).first()
    if not order:
        raise HTTPException(status_code=404)  # 404, not 403
    return order
```

### Pattern 3: Parameter Tampering

```javascript
// VULNERABLE — Trusting client-side role data
// Client sends: { "role": "admin", "action": "delete_user", "target": 123 }
app.post("/api/actions", (req, res) => {
  if (req.body.role === "admin") {  // Attacker sets role in request body
    deleteUser(req.body.target);
  }
});

// FIXED — Get role from authenticated session, not request body
app.post("/api/actions", requireAuth, (req, res) => {
  const user = req.session.user;  // From server-side session
  if (!hasPermission(user.id, "users:delete")) {
    return res.status(404).send();
  }
  deleteUser(req.body.target);
});
```

### Pattern 4: Path Traversal

```python
# VULNERABLE — User controls file path
@app.get("/api/files")
def get_file(filename: str):
    return send_file(f"/app/uploads/{filename}")
    # Attacker sends: filename=../../../etc/passwd

# FIXED — Validate path stays within allowed directory
import os
@app.get("/api/files")
def get_file(filename: str):
    safe_path = os.path.realpath(os.path.join("/app/uploads", filename))
    if not safe_path.startswith("/app/uploads/"):
        raise HTTPException(status_code=404)
    return send_file(safe_path)
```

### Pattern 5: Privilege Escalation via API

```javascript
// VULNERABLE — User can modify their own role
// PUT /api/users/me
// Body: { "name": "Alice", "role": "admin" }
app.put("/api/users/me", async (req, res) => {
  await User.update(req.user.id, req.body);  // Updates ALL fields including role
});

// FIXED — Whitelist allowed fields
app.put("/api/users/me", async (req, res) => {
  const { name, email, avatar } = req.body;  // Only allow safe fields
  await User.update(req.user.id, { name, email, avatar });
});
```

---

## Multi-Tenancy Authorization

Multi-tenant applications require tenant isolation as a primary authorization concern.

### Isolation Strategies

| Strategy | Isolation Level | Complexity | Cost |
|----------|----------------|------------|------|
| Separate databases | Highest | High | High |
| Separate schemas | High | Medium | Medium |
| Row-level security (RLS) | Medium | Low | Low |
| Application-level filtering | Lowest (risky) | Low | Low |

### Row-Level Security (Supabase/PostgreSQL)

```sql
-- Enable RLS on table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their organization's documents
CREATE POLICY "tenant_isolation" ON documents
  FOR ALL
  USING (org_id = current_setting('app.current_org_id')::uuid);

-- Set tenant context at the start of each request
SET app.current_org_id = 'tenant-uuid-here';

-- All subsequent queries are automatically filtered
SELECT * FROM documents;  -- Only returns current tenant's documents
-- Even if application code has a bug, RLS prevents cross-tenant access
```

**Security Brain mandate for multi-tenant applications:**
- Database-level isolation (RLS minimum) — never rely solely on application-level filtering
- Tenant context must be set from authenticated session, not from request parameters
- Audit logs must include tenant context
- Test cross-tenant access in every security review

---

## Authorization Testing

### Testing Checklist

```
For EVERY endpoint:
□ Unauthenticated request returns 401
□ Authenticated user without permission returns 404 (not 403)
□ User A cannot access User B's resources (horizontal privilege)
□ Regular user cannot access admin functions (vertical privilege)
□ Deleted/disabled user's tokens are rejected
□ Role changes take effect immediately (no stale cached authorization)
□ Rate limiting is applied to prevent enumeration
□ Bulk operations respect per-item authorization (not just list-level)

For multi-tenant:
□ Tenant A cannot access Tenant B's data via any endpoint
□ Tenant context cannot be spoofed via request parameters
□ Shared resources are explicitly modeled (not implicit cross-tenant access)
□ Admin operations are scoped to tenant (super-admin vs. tenant-admin)
```

---

## Authorization Decision Tree

```
Choosing an access control model:

├── Simple application (<10 roles, no multi-tenancy)
│   └── RBAC with database-backed roles and permissions
│
├── Multi-tenant SaaS (tenant isolation + role-based)
│   └── RBAC + Row-Level Security (Supabase RLS)
│       Consider: tenant-admin vs. super-admin distinction
│
├── Complex enterprise (department-based, time-based, location-based)
│   └── ABAC with OPA or Cedar policy engine
│
├── Collaboration/sharing (documents, workspaces, teams)
│   └── ReBAC with SpiceDB or Auth0 FGA
│
└── Hybrid (roles + sharing + attributes)
    └── ReBAC for sharing + ABAC for contextual rules
        Implementation: SpiceDB + OPA, or AWS Verified Permissions
```

---

**Authorization is where most security vulnerabilities live. Broken access control is #1 on the OWASP Top 10 because developers consistently fail to enforce authorization server-side, on every request, for every resource. The Security Brain mandates centralized, server-side, default-deny authorization with automated testing of every access control rule.**

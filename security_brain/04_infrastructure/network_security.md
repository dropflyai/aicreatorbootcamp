# Network Security — Defense in Depth and Zero Trust Architecture

## Overview

Network security has undergone a paradigm shift. The traditional castle-and-moat model — hardened perimeter, trusted interior — is obsolete. Modern networks are porous: cloud workloads, remote workers, SaaS integrations, and supply chain dependencies have dissolved the perimeter. This module codifies network security principles from defense in depth through zero trust, covering segmentation strategies, intrusion detection, web application firewalls, DDoS mitigation, and TLS best practices.

The fundamental axiom: the network is hostile. Every packet, every connection, every device must prove its legitimacy. Trust nothing, verify everything, assume breach.

---

## Defense in Depth — Layered Security Architecture

### The Onion Model

Defense in depth layers multiple independent security controls so that the failure of any single control does not result in compromise:

```
┌─────────────────────────────────────────────┐
│  Layer 1: Physical Security                 │
│  ┌───────────────────────────────────────┐  │
│  │  Layer 2: Network Perimeter           │  │
│  │  ┌───────────────────────────────┐    │  │
│  │  │  Layer 3: Network Segmentation│    │  │
│  │  │  ┌───────────────────────┐    │    │  │
│  │  │  │  Layer 4: Host Security│   │    │  │
│  │  │  │  ┌─────────────────┐  │   │    │  │
│  │  │  │  │ Layer 5: App Sec│  │   │    │  │
│  │  │  │  │  ┌───────────┐  │  │   │    │  │
│  │  │  │  │  │ Layer 6:  │  │  │   │    │  │
│  │  │  │  │  │   Data    │  │  │   │    │  │
│  │  │  │  │  └───────────┘  │  │   │    │  │
│  │  │  │  └─────────────────┘  │   │    │  │
│  │  │  └───────────────────────┘   │    │  │
│  │  └──────────────────────────────┘    │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Layer Controls

| Layer | Controls | Purpose |
|-------|----------|---------|
| Physical | Access controls, surveillance, environmental | Prevent physical access to infrastructure |
| Network Perimeter | Firewall, WAF, DDoS protection, VPN | Filter external traffic at boundary |
| Network Internal | Segmentation, micro-segmentation, NACLs | Limit lateral movement |
| Host | EDR, OS hardening, patch management | Protect individual endpoints |
| Application | Input validation, authentication, authorization | Protect application logic |
| Data | Encryption, tokenization, DLP, access controls | Protect the actual data |

### Key Principle: Independent Failure Domains

Each layer must be independently effective. The failure of the WAF must not mean the application is vulnerable to injection — the application must also validate input. The failure of network segmentation must not mean all data is accessible — data encryption must protect at rest regardless of network access.

---

## Zero Trust Architecture — BeyondCorp Model

### Core Principles (NIST SP 800-207)

1. **All data sources and computing services are considered resources** — not just traditional servers, but SaaS, IoT, serverless functions.
2. **All communication is secured regardless of network location** — internal network traffic gets the same scrutiny as external.
3. **Access to resources is granted on a per-session basis** — no persistent trust; re-authenticate and re-authorize for each session.
4. **Access is determined by dynamic policy** — based on client identity, application/service, device state, behavioral attributes, and environmental conditions.
5. **The enterprise monitors and measures integrity and security posture of all assets** — continuous assessment, not point-in-time.
6. **Authentication and authorization are strictly enforced before access** — the Policy Decision Point (PDP) evaluates every request.
7. **Collect information about asset state, network traffic, and access requests for continuous improvement.**

### BeyondCorp Implementation (Google's Reference Architecture)

Google's BeyondCorp eliminates the privileged corporate network entirely:

**Components:**
- **Device Inventory Database:** Every device tracked with security posture (OS version, patch level, encryption status, EDR status)
- **Access Proxy:** All application access flows through a reverse proxy that enforces authentication and authorization
- **Trust Engine:** Evaluates device trust level based on inventory data, user authentication strength, and behavioral signals
- **Identity Provider:** Strong authentication (hardware security keys, phishing-resistant MFA)
- **Access Policy Engine:** Per-request authorization decisions based on user identity, device trust, resource sensitivity, and context

**Access Decision Flow:**
```
User Request → Access Proxy → Identity Verification (MFA) → Device Trust Check →
Policy Evaluation → Access Granted/Denied → Continuous Monitoring → Session Termination if posture changes
```

### Zero Trust Network Access (ZTNA)

ZTNA replaces traditional VPN with application-level access:
- Users connect to specific applications, not network segments
- No network-level access granted (eliminates lateral movement risk)
- Dynamic access based on user, device, and context
- Software-defined perimeter makes applications invisible to unauthorized users
- Vendors: Zscaler Private Access, Cloudflare Access, Tailscale, Palo Alto Prisma Access

---

## Network Segmentation

### Macro-Segmentation

Divide the network into security zones with controlled traffic flow between zones:

| Zone | Purpose | Trust Level | Access Control |
|------|---------|-------------|---------------|
| DMZ | Public-facing services | Untrusted | Strict ingress/egress filtering |
| Application | Application servers | Semi-trusted | Limited to required protocols |
| Database | Data stores | Restricted | Only from application zone, specific ports |
| Management | Admin access, monitoring | Highly restricted | Jump box, MFA, session recording |
| Development | Dev/test environments | Isolated | No production data access |

### Micro-Segmentation

Extends segmentation to individual workload level using software-defined networking:
- Each workload has its own security policy
- Communication between workloads requires explicit allow rules
- Default deny — no implicit trust between services in the same zone
- Implementations: VMware NSX, Illumio, Guardicore, cloud-native security groups

### East-West Traffic Monitoring

Traditional perimeter security only monitors north-south traffic (in/out of network). Modern attacks primarily move east-west (laterally within the network). Micro-segmentation combined with east-west traffic inspection catches lateral movement that perimeter controls miss entirely.

---

## Intrusion Detection and Prevention (IDS/IPS)

### Detection Methodologies

**Signature-Based:**
- Pattern matching against known attack signatures
- Low false positive rate for known attacks
- Zero capability against novel attacks (zero-days)
- Requires continuous signature updates
- Tools: Snort, Suricata (open source); Palo Alto, Cisco Firepower (commercial)

**Anomaly-Based:**
- Establishes baseline of normal behavior, alerts on deviations
- Can detect novel attacks
- Higher false positive rate (requires tuning)
- Requires training period to establish baselines
- Machine learning models improve accuracy over time

**Behavioral:**
- Analyzes sequences of actions rather than individual packets
- Detects multi-stage attacks that no individual event reveals
- Correlates across multiple data sources (network, endpoint, identity)
- Modern UEBA (User and Entity Behavior Analytics) systems

### IDS vs. IPS Deployment

| Aspect | IDS (Detection) | IPS (Prevention) |
|--------|-----------------|-------------------|
| Action | Alert only | Alert and block |
| Deployment | Passive (span port/tap) | Inline (traffic passes through) |
| Risk | Missed detections | False positives block legitimate traffic |
| Latency | None (out-of-band) | Adds processing latency |
| Failure mode | Fails open (traffic unaffected) | Must decide: fail open or fail closed |

**Recommendation:** Deploy IPS inline for well-characterized attack signatures. Deploy IDS (anomaly-based) in parallel for detection of novel threats. Never rely solely on IPS — it cannot detect what it does not have signatures for.

---

## Web Application Firewall (WAF)

### WAF Capabilities

| Protection | Description |
|-----------|-------------|
| SQL Injection | Pattern-based and behavioral detection of injection attempts |
| XSS | Block reflected and stored cross-site scripting payloads |
| CSRF | Token validation and origin checking |
| Rate Limiting | Throttle excessive requests per IP/session/API key |
| Bot Detection | Distinguish legitimate users from automated tools |
| Virtual Patching | Block exploitation of known CVEs before application patching |
| API Protection | Schema validation, parameter pollution detection |

### WAF Deployment Models

- **Cloud WAF (CDN-integrated):** Cloudflare, AWS WAF + CloudFront, Akamai. Easiest deployment, auto-scaling, managed rulesets.
- **Reverse Proxy WAF:** ModSecurity, NGINX WAF. Self-managed, full control, requires operational expertise.
- **Inline WAF:** Hardware or virtual appliance in the network path. Highest performance, most complex deployment.

### WAF Limitations

A WAF is not a substitute for secure coding. WAF bypass techniques are well-documented and actively researched. The WAF is a compensating control — it buys time for patching and catches low-skill attacks, but a determined attacker with application knowledge will bypass signature-based WAF rules.

---

## DDoS Mitigation

### Attack Types and Defenses

| Attack Type | Layer | Examples | Mitigation |
|------------|-------|----------|------------|
| Volumetric | L3/L4 | UDP flood, ICMP flood, amplification | Upstream scrubbing, CDN absorption |
| Protocol | L3/L4 | SYN flood, Ping of Death, Smurf | SYN cookies, rate limiting, firewall rules |
| Application | L7 | HTTP flood, Slowloris, API abuse | WAF, rate limiting, CAPTCHA, behavioral analysis |

### Mitigation Architecture

```
Internet → CDN/Scrubbing Center → Origin Shield → Load Balancer → Application
              (absorb volumetric)    (filter L7)      (distribute)     (serve)
```

Providers: Cloudflare, AWS Shield, Akamai Prolexic, Google Cloud Armor. For critical services, use always-on DDoS protection (traffic routes through scrubbing permanently) rather than on-demand (detection delay allows initial impact).

---

## TLS Best Practices

### Configuration Requirements

| Setting | Requirement | Rationale |
|---------|-------------|-----------|
| Minimum version | TLS 1.2 | TLS 1.0/1.1 deprecated (RFC 8996) |
| Preferred version | TLS 1.3 | Reduced handshake latency, forward secrecy mandatory |
| Cipher suites | AEAD only (AES-GCM, ChaCha20-Poly1305) | CBC mode vulnerable to padding oracle attacks |
| Key exchange | ECDHE (P-256 or X25519) | Forward secrecy — compromised long-term key does not expose past traffic |
| Certificate | RSA-2048+ or ECDSA P-256 | ECDSA preferred for performance |
| HSTS | Strict-Transport-Security with includeSubDomains, preload | Prevent protocol downgrade attacks |
| Certificate Transparency | Required | Detect misissued certificates |
| OCSP Stapling | Enabled | Reduce certificate validation latency and privacy leakage |

### Certificate Management

- Automate issuance and renewal (Let's Encrypt + certbot, or AWS ACM)
- Monitor certificate expiration (30-day warning threshold)
- Use short-lived certificates (90 days maximum) to limit compromise window
- Implement certificate pinning only for mobile apps with controlled update mechanisms (not for web browsers — pins cause outages)
- Monitor Certificate Transparency logs for unauthorized certificates issued for your domains

---

## Cross-References

- `04_infrastructure/cloud_security.md` — Cloud-specific network security controls
- `04_infrastructure/endpoint_security.md` — Host-level security complementing network controls
- `06_operations/security_monitoring.md` — Network monitoring and detection engineering
- `03_threat_modeling/threat_modeling_methods.md` — DFDs for network threat modeling
- `Patterns/security_review_pattern.md` — Network security review process

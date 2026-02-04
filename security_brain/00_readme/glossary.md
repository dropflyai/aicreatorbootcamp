# Security Brain — Glossary of Terms

## Purpose

This glossary provides precise definitions for security terminology used throughout the Security Brain modules. Definitions draw from authoritative sources: NIST SP 800-53, ISO 27000, OWASP, MITRE, and academic literature (Anderson, Schneier, Boneh). Ambiguous terminology is a security risk — imprecise language leads to imprecise controls.

---

## A

**ABAC (Attribute-Based Access Control)** — An authorization model where access decisions are based on attributes of the subject (user), object (resource), action, and environment. More granular than RBAC. Defined in NIST SP 800-162. Example: "Allow access if user.department == 'engineering' AND resource.classification < 'restricted' AND time.hour BETWEEN 9 AND 17."

**Access Control** — The selective restriction of access to a resource. Encompasses identification, authentication, authorization, and accountability. The foundation of the security reference monitor concept (Anderson, 1972).

**AES (Advanced Encryption Standard)** — NIST-standardized symmetric block cipher (FIPS 197). Operates on 128-bit blocks with key sizes of 128, 192, or 256 bits. Rijndael algorithm selected through public competition (2001). AES-256-GCM is the recommended mode for authenticated encryption.

**APT (Advanced Persistent Threat)** — A threat actor with sophisticated capabilities, significant resources, and long-term objectives. Characterized by persistence (maintains access over months/years), stealth (avoids detection), and specific targeting. Examples: nation-state actors (APT28/Fancy Bear, APT41/Winnti).

**Argon2id** — The recommended password hashing function (winner of the Password Hashing Competition, 2015). Hybrid variant combining Argon2i (side-channel resistant) and Argon2d (GPU-resistant). Parameterized by memory cost, time cost, and parallelism. Supersedes bcrypt and scrypt for new implementations.

**Attack Surface** — The sum of all points where an unauthorized user can attempt to enter data to or extract data from a system. Reducing attack surface is a primary security design objective. Quantified as the number of input/output channels, the privilege level required, and the data accessible.

**Attack Tree** — A formal threat modeling technique (Schneier, 1999) representing attacks against a system as a tree structure. The root node is the attacker's goal; leaf nodes are atomic attack steps. Used to systematically enumerate attack paths and evaluate controls.

**Authentication** — Verification of a claimed identity. Distinguished from authorization (what an authenticated entity is permitted to do). Multi-factor authentication combines two or more of: something you know (password), something you have (token), something you are (biometric).

**Authorization** — The process of determining whether an authenticated entity has permission to perform a requested action on a specific resource. Implemented through access control models (RBAC, ABAC, ACLs).

---

## B

**Blast Radius** — The scope of impact from a security incident. A design principle: minimize blast radius through segmentation, isolation, and least privilege. If a single compromised service can access all databases, the blast radius is the entire data estate.

**Block Cipher** — A symmetric encryption algorithm that operates on fixed-size blocks of plaintext. AES is the standard block cipher. Requires a mode of operation (GCM, CBC, CTR) to encrypt data larger than one block.

**Broken Access Control** — OWASP Top 10 #1 (2021). When access control policies are not properly enforced, allowing users to act outside their intended permissions. Includes IDOR, privilege escalation, path traversal, and missing function-level access control.

**Buffer Overflow** — A vulnerability where data is written beyond the bounds of allocated memory. Can overwrite adjacent memory including return addresses (stack overflow) or heap metadata (heap overflow). Mitigated by: bounds checking, ASLR, stack canaries, NX/DEP, safe languages (Rust, Go).

---

## C

**CAP Theorem** — Brewer's theorem: a distributed system cannot simultaneously guarantee Consistency, Availability, and Partition tolerance. Security implications: in partition scenarios, choose consistency (CP) for security-critical systems to prevent stale authorization data.

**Certificate (X.509)** — A digital document binding a public key to an identity, signed by a Certificate Authority. Contains: subject, issuer, public key, validity period, extensions (SAN, key usage). The foundation of TLS and PKI.

**CIA Triad** — The three fundamental security objectives: **Confidentiality** (data is accessible only to authorized entities), **Integrity** (data is accurate and unmodified), **Availability** (data and systems are accessible when needed). All security controls map to one or more CIA objectives.

**CORS (Cross-Origin Resource Sharing)** — A browser mechanism that allows restricted resources on a web page to be requested from a different origin. Misconfigured CORS (e.g., `Access-Control-Allow-Origin: *` with credentials) is a common vulnerability enabling cross-origin data theft.

**CSRF (Cross-Site Request Forgery)** — An attack that forces authenticated users to execute unintended actions. The attacker tricks the victim's browser into sending a forged request with the victim's session cookie. Mitigated by: synchronizer tokens, SameSite cookies, origin validation.

**CSP (Content Security Policy)** — An HTTP response header that restricts which resources the browser can load. Primary XSS mitigation: `Content-Security-Policy: default-src 'self'; script-src 'self'` prevents inline scripts and third-party script injection.

**CVSS (Common Vulnerability Scoring System)** — A framework for scoring vulnerability severity (0-10). Components: Base (exploitability, impact), Temporal (exploit maturity, remediation), Environmental (modified impact). CVSS is a starting point for prioritization, not the final word — context matters.

**CWE (Common Weakness Enumeration)** — MITRE's hierarchical taxonomy of software and hardware weakness types. Examples: CWE-79 (XSS), CWE-89 (SQL Injection), CWE-287 (Improper Authentication). Used to classify vulnerability root causes.

---

## D

**Data Classification** — The process of categorizing data based on sensitivity and the impact of unauthorized disclosure. Standard levels: Public, Internal, Confidential, Restricted. Classification drives encryption requirements, access controls, and retention policies.

**Defense in Depth** — A security strategy employing multiple independent layers of defense so that if one layer fails, subsequent layers still provide protection. Originates from military strategy; formalized in information security by Saltzer and Schroeder (1975).

**DDoS (Distributed Denial of Service)** — An attack that overwhelms a system's resources (bandwidth, compute, connections) using multiple distributed sources. Types: volumetric (UDP flood), protocol (SYN flood), application layer (HTTP flood). Mitigated by: CDN, rate limiting, traffic scrubbing, auto-scaling.

**DPIA (Data Protection Impact Assessment)** — Required by GDPR Article 35 when processing is likely to result in high risk to individuals. Assesses necessity, proportionality, and risks of processing. Must be conducted before processing begins.

**DREAD** — A risk rating model: **D**amage potential, **R**eproducibility, **E**xploitability, **A**ffected users, **D**iscoverability. Each factor rated 1-10. Sum provides risk score. Less commonly used than STRIDE for threat modeling but useful for quick risk ranking.

---

## E

**Encryption at Rest** — Protecting stored data through encryption. Implementations: full-disk encryption (LUKS, BitLocker), database encryption (TDE), application-level encryption (envelope encryption). Key management is the critical challenge — encrypted data is only as secure as key storage.

**Encryption in Transit** — Protecting data during transmission using TLS 1.3 (or 1.2 minimum). All data in transit must be encrypted — this is non-negotiable in the Security Brain's directive. Mutual TLS (mTLS) adds client certificate verification for service-to-service communication.

**Envelope Encryption** — A key management pattern where data is encrypted with a data encryption key (DEK), and the DEK is encrypted with a key encryption key (KEK). Enables key rotation without re-encrypting data. Used by AWS KMS, GCP Cloud KMS.

---

## F-G

**Fail Secure** — A design principle where system failure results in a secure state. Example: if an authorization service is unreachable, deny access (fail closed) rather than allow access (fail open). Opposite of fail open.

**FIDO2/WebAuthn** — A web standard for passwordless authentication using public-key cryptography. The authenticator (hardware key, platform biometric) holds the private key; the server holds the public key. Eliminates password-related vulnerabilities entirely.

**GDPR (General Data Protection Regulation)** — EU regulation (2018) governing the processing of personal data. Key principles: lawfulness, purpose limitation, data minimization, accuracy, storage limitation, integrity and confidentiality, accountability. Fines up to 4% of annual global turnover.

---

## H-I

**HSTS (HTTP Strict Transport Security)** — An HTTP header (`Strict-Transport-Security`) instructing browsers to only connect via HTTPS. Prevents protocol downgrade attacks and cookie hijacking. Must include `max-age`, should include `includeSubDomains`, and ideally submit to the HSTS preload list.

**IAM (Identity and Access Management)** — The framework of policies and technologies for managing digital identities and their access to resources. Encompasses: identity lifecycle, authentication, authorization, federation, and audit.

**IDOR (Insecure Direct Object Reference)** — A broken access control vulnerability where an application exposes internal implementation objects (database IDs, file paths) without authorization checks. Example: changing `/api/users/123/profile` to `/api/users/124/profile` to access another user's data.

**IDS/IPS (Intrusion Detection/Prevention System)** — Network security systems that monitor traffic for malicious activity. IDS detects and alerts; IPS detects and blocks. Types: signature-based (known patterns), anomaly-based (deviation from baseline), stateful protocol analysis.

**Incident** — A security event that actually or potentially jeopardizes the confidentiality, integrity, or availability of an information system. Defined by NIST SP 800-61. Distinguished from an event (any observable occurrence) — not all events are incidents.

---

## J-K

**JWT (JSON Web Token)** — A compact, URL-safe token format (RFC 7519) for transmitting claims between parties. Structure: header.payload.signature. Security considerations: always validate signature, check `exp` and `aud` claims, prefer RS256 over HS256 for distributed systems, never store sensitive data in payload (it is base64-encoded, not encrypted).

**KEK (Key Encryption Key)** — A cryptographic key used to encrypt other keys. Part of the envelope encryption pattern. Stored in a hardware security module (HSM) or key management service (KMS). Never exposed in plaintext outside the HSM boundary.

**Kill Chain (Cyber Kill Chain)** — Lockheed Martin's model of adversary intrusion phases: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control, Actions on Objectives. Breaking any phase disrupts the attack.

---

## L-M

**Least Privilege** — The principle that every subject should have only the minimum privileges necessary to complete its task (Saltzer and Schroeder, 1975). Applied to: user accounts, service accounts, API keys, IAM roles, network ACLs, file permissions.

**MITRE ATT&CK** — A knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations. Organized by tactics (what the adversary is trying to achieve) and techniques (how they achieve it). Used for threat modeling, detection engineering, and security assessment gap analysis.

**MFA (Multi-Factor Authentication)** — Authentication requiring two or more independent factors: knowledge (password), possession (hardware token, phone), inherence (biometric). SMS-based MFA is deprecated due to SIM-swapping attacks (NIST SP 800-63B). Prefer TOTP, WebAuthn, or push notification.

**mTLS (Mutual TLS)** — A TLS configuration where both client and server present certificates for authentication. Used for service-to-service communication in zero-trust architectures. Eliminates reliance on network-level trust (IP allowlists).

---

## N-O

**NIST CSF (Cybersecurity Framework)** — A voluntary framework (NIST, 2014, updated 2024) organized around five functions: Identify, Protect, Detect, Respond, Recover. Provides a common language for managing cybersecurity risk. Widely adopted as a baseline framework.

**NIST SP 800-53** — Security and Privacy Controls for Information Systems and Organizations. The most comprehensive catalog of security controls, organized into families (Access Control, Audit, Risk Assessment, etc.). Used as the control baseline for FedRAMP and many compliance programs.

**OAuth 2.0** — An authorization framework (RFC 6749) enabling third-party applications to obtain limited access to a web service. Grant types: authorization code (recommended), client credentials (machine-to-machine), device code. NOT an authentication protocol — use OIDC for authentication.

**OIDC (OpenID Connect)** — An identity layer built on top of OAuth 2.0 (2014). Adds an ID token (JWT) containing user identity claims. Provides standardized authentication that OAuth 2.0 alone does not. The recommended protocol for web application authentication.

**OWASP (Open Worldwide Application Security Project)** — A nonprofit producing open-source security guidance. Key resources: Top 10 (web application risks), ASVS (verification standard), Testing Guide, Cheat Sheet Series, SAMM (maturity model).

---

## P-R

**PCI DSS (Payment Card Industry Data Security Standard)** — A security standard for organizations handling cardholder data. 12 requirements covering network security, data protection, vulnerability management, access control, monitoring, and policy. Compliance validated by QSA (Qualified Security Assessor).

**Penetration Testing** — Authorized simulated attack against a system to evaluate security. Types: black box (no knowledge), gray box (partial knowledge), white box (full knowledge). Follows methodology: reconnaissance, scanning, exploitation, post-exploitation, reporting.

**PKI (Public Key Infrastructure)** — A framework for managing digital certificates and public-key encryption. Components: Certificate Authority (CA), Registration Authority (RA), certificate repository, certificate revocation list (CRL), Online Certificate Status Protocol (OCSP).

**RBAC (Role-Based Access Control)** — An access control model where permissions are assigned to roles, and users are assigned to roles. Simplifies administration but can lead to role explosion. Defined in NIST RBAC model. Example: roles "admin", "editor", "viewer" with escalating permissions.

**Risk** — The potential for loss or damage when a threat exploits a vulnerability. Formally: Risk = Likelihood x Impact. Risk management involves: identification, analysis, evaluation, treatment (accept, mitigate, transfer, avoid), and monitoring.

---

## S

**SAST (Static Application Security Testing)** — Analysis of source code for vulnerabilities without executing the program. Tools: Semgrep, SonarQube, CodeQL, Checkmarx. Finds: injection flaws, hardcoded secrets, insecure configurations. High false positive rate requires tuning.

**SCA (Software Composition Analysis)** — Analysis of third-party dependencies for known vulnerabilities. Tools: Snyk, Dependabot, Trivy. Critical because 80%+ of modern application code is third-party dependencies.

**SIEM (Security Information and Event Management)** — A system that aggregates, correlates, and analyzes security log data from multiple sources. Capabilities: log collection, normalization, correlation, alerting, dashboards, compliance reporting. Tools: Splunk, Elastic SIEM, Sentinel.

**SOC 2 (Service Organization Control 2)** — An audit framework (AICPA) for service providers storing customer data. Trust Service Criteria: Security (required), Availability, Processing Integrity, Confidentiality, Privacy (optional). Type I: point-in-time design assessment. Type II: operating effectiveness over 6-12 months.

**SQL Injection** — An injection attack where malicious SQL is inserted into application queries. Types: in-band (UNION-based, error-based), blind (boolean-based, time-based), out-of-band. Prevented by: parameterized queries (prepared statements), not string concatenation. CWE-89.

**SSRF (Server-Side Request Forgery)** — A vulnerability where an attacker can induce the server to make HTTP requests to arbitrary destinations. Can access internal services, cloud metadata endpoints (169.254.169.254), and internal networks. OWASP Top 10 2021 (#10).

**STRIDE** — Microsoft's threat modeling framework categorizing threats: **S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege. Each category maps to a CIA triad violation and suggests specific mitigations.

---

## T-Z

**TLS (Transport Layer Security)** — The cryptographic protocol securing data in transit. TLS 1.3 (RFC 8446) is current; TLS 1.2 is minimum acceptable. TLS 1.0/1.1 are deprecated. Provides: confidentiality (encryption), integrity (MAC), authentication (certificates).

**Threat Actor** — An entity that poses a threat to an organization. Categories: nation-state (APT), cybercriminal (financial motivation), hacktivist (ideological), insider (authorized access, malicious intent), script kiddie (low skill, available tools).

**Tokenization** — Replacing sensitive data with non-sensitive placeholders (tokens) that have no exploitable value. Unlike encryption, tokenization is not mathematically reversible — a token-to-data mapping is stored separately. Used for PCI DSS scope reduction.

**XSS (Cross-Site Scripting)** — An injection attack where malicious scripts are injected into trusted websites. Types: Reflected (in URL parameters), Stored (persisted in database), DOM-based (client-side). Prevented by: output encoding, CSP, input validation. CWE-79.

**Zero Trust** — A security model that eliminates implicit trust based on network location. Principles (NIST SP 800-207): verify explicitly, use least privilege access, assume breach. Implementation: identity-based access, micro-segmentation, continuous verification, encrypt everything.

---

**This glossary is a living document. Terms are added as new modules are created or new concepts are introduced in Security Brain operations.**

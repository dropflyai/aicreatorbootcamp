# Cryptography — Algorithms, Protocols, and Key Management

## Overview

Cryptography is the mathematical foundation of information security. This module covers the cryptographic primitives, protocols, and key management practices that the Security Brain mandates. Content draws from Dan Boneh's Stanford CS255 (Cryptography), Bruce Schneier's "Applied Cryptography," NIST SP 800-57 (Key Management), and the real-world failures that demonstrate why getting cryptography wrong is catastrophic.

**Foundational rule:** Never implement your own cryptography. Use vetted libraries (libsodium, OpenSSL, AWS KMS, Web Crypto API) with correct configurations. Custom cryptographic code is virtually guaranteed to contain side-channel vulnerabilities, timing attacks, or implementation errors that destroy the mathematical security guarantees.

---

## Symmetric Encryption

Symmetric encryption uses the same key for encryption and decryption. Fast, efficient, suitable for bulk data encryption.

### AES (Advanced Encryption Standard)

**Standard:** FIPS 197 (2001). Rijndael algorithm selected through public competition.

**Parameters:**
- Block size: 128 bits (fixed)
- Key sizes: 128, 192, or 256 bits
- Security Brain mandate: **AES-256** for all new implementations

**Modes of operation (critical — wrong mode = broken encryption):**

| Mode | Use Case | Properties | Security Brain Verdict |
|------|----------|------------|----------------------|
| GCM | General purpose | Authenticated encryption (AEAD), parallelizable, nonce-based | **RECOMMENDED** — use this by default |
| CBC | Legacy systems | Requires separate MAC (HMAC), IV must be unpredictable, padding oracle risk | Acceptable with HMAC, prefer GCM |
| CTR | Streaming encryption | Requires separate MAC, parallelizable, nonce-based | Acceptable with HMAC |
| ECB | **NEVER USE** | Deterministic — identical plaintext blocks produce identical ciphertext | **FORBIDDEN** — leaks patterns |
| CFB/OFB | Rarely needed | Streaming modes, less common | Avoid unless specifically required |

**AES-256-GCM implementation requirements:**
- Nonce: 96 bits (12 bytes), MUST be unique per key-nonce pair. Nonce reuse destroys confidentiality AND authenticity.
- For random nonces: limit to ~2^32 encryptions per key to maintain negligible collision probability (birthday bound)
- For counter-based nonces: ensure monotonic increment, never reuse
- Authentication tag: 128 bits (16 bytes) minimum
- Ciphertext includes: nonce || ciphertext || tag

```
// Correct AES-256-GCM usage (pseudocode)
key = KMS.generateDataKey(256)         // Key from KMS, never hardcoded
nonce = secureRandom(12)              // 12 bytes, cryptographically random
(ciphertext, tag) = AES_GCM.encrypt(key, nonce, plaintext, aad)
output = nonce || ciphertext || tag    // Nonce is not secret, prepend to ciphertext

// Decryption
(nonce, ciphertext, tag) = parse(input)
plaintext = AES_GCM.decrypt(key, nonce, ciphertext, tag, aad)  // Fails if tampered
```

### ChaCha20-Poly1305

**Standard:** RFC 8439. Designed by Daniel Bernstein.

**Properties:** AEAD cipher (like AES-GCM), software-friendly (no AES hardware instructions needed), constant-time by design (resistant to timing attacks), 256-bit key, 96-bit nonce.

**When to use:** Mobile devices without AES-NI, environments where timing-attack resistance is critical, TLS cipher suites (widely supported).

**Security Brain verdict:** Acceptable alternative to AES-256-GCM. Preferred for software-only implementations.

---

## Asymmetric Encryption

Asymmetric encryption uses a key pair: public key (encrypt/verify) and private key (decrypt/sign). Slower than symmetric, used for key exchange and digital signatures.

### RSA

**Standard:** PKCS#1 (RFC 8017).

**Parameters:**
- Key size: **4096 bits minimum** for new implementations (2048 acceptable for legacy)
- Padding: **OAEP** (Optimal Asymmetric Encryption Padding) for encryption, **PSS** for signatures
- **NEVER use PKCS#1 v1.5 padding** — vulnerable to Bleichenbacher's attack (1998), a padding oracle that allows decryption

**Common RSA failures:**
- Using textbook RSA (no padding) — deterministic, malleable
- Using PKCS#1 v1.5 padding — Bleichenbacher's million-message attack
- Key sizes below 2048 bits — factorable with modern hardware
- Encrypting large data directly with RSA — use hybrid encryption (RSA encrypts AES key, AES encrypts data)

### Elliptic Curve Cryptography (ECC)

**Standard:** NIST P-256 (secp256r1), P-384 (secp384r1), Curve25519 (X25519 for key exchange, Ed25519 for signatures).

**Advantages over RSA:** Equivalent security at much smaller key sizes (256-bit ECC approximate to 3072-bit RSA), faster operations, smaller signatures and keys.

**Recommended curves:**
| Curve | Use Case | Security Brain Verdict |
|-------|----------|----------------------|
| P-256 (secp256r1) | General purpose, NIST approved, widest compatibility | Recommended |
| P-384 (secp384r1) | Higher security margin, government/military | Recommended for high security |
| Curve25519 / Ed25519 | Key exchange / signatures, constant-time, no known patents | **Preferred** — Bernstein's design |
| P-521 | Maximum security margin | Acceptable, rarely needed |

**Security Brain mandate:** Use Ed25519 for digital signatures and X25519 for key exchange in new systems unless NIST curve compatibility is required.

---

## Hashing

Hash functions produce a fixed-size digest from arbitrary input. Properties: deterministic, one-way (preimage resistance), collision resistant, avalanche effect.

### Cryptographic Hash Functions

| Algorithm | Output | Status | Use |
|-----------|--------|--------|-----|
| SHA-256 | 256 bits | **Current standard** | Data integrity, digital signatures, general purpose |
| SHA-384 | 384 bits | Current | Higher security margin |
| SHA-512 | 512 bits | Current | Maximum security margin, faster on 64-bit hardware |
| SHA-3 (Keccak) | Variable | Current | Alternative to SHA-2 family, different construction (sponge) |
| SHA-1 | 160 bits | **DEPRECATED** | Collision demonstrated (SHAttered, 2017). Never use for security |
| MD5 | 128 bits | **BROKEN** | Collisions trivial. Never use for any security purpose |
| BLAKE2b | Variable | Current | Faster than SHA-2, suitable for general hashing |
| BLAKE3 | Variable | Current | Fastest cryptographic hash, parallelizable |

**Security Brain mandate:** SHA-256 minimum for all cryptographic hashing. SHA-1 and MD5 are forbidden for security purposes.

### Password Hashing (CRITICAL — distinct from cryptographic hashing)

Password hashing has fundamentally different requirements: it must be SLOW (to resist brute force), memory-hard (to resist GPU/ASIC attacks), and parameterized (to increase cost over time).

**Never hash passwords with SHA-256, SHA-512, or any fast cryptographic hash.** A GPU can compute billions of SHA-256 hashes per second, making brute force trivial.

| Algorithm | Status | Parameters | Security Brain Verdict |
|-----------|--------|------------|----------------------|
| Argon2id | **Recommended** | Memory cost, time cost, parallelism | **USE THIS** for all new systems |
| bcrypt | Acceptable | Work factor (cost) | Acceptable for existing systems, 12+ rounds |
| scrypt | Acceptable | N (CPU/memory), r (block size), p (parallelism) | Acceptable, harder to tune correctly |
| PBKDF2 | Legacy only | Iterations, hash function | Avoid for new systems (no memory-hardness) |

**Argon2id parameters (2024 recommendation):**
```
Memory:      64 MB minimum (65536 KB), 256 MB preferred
Time:        3 iterations minimum
Parallelism: 4 threads
Salt:        16 bytes, cryptographically random, unique per password

// Target: ~500ms to compute on server hardware
// Adjust parameters to maintain this target as hardware improves
```

**Password storage format:**
```
$argon2id$v=19$m=65536,t=3,p=4$<base64-salt>$<base64-hash>

NEVER store: plaintext passwords, reversibly encrypted passwords, unsalted hashes
ALWAYS store: algorithm identifier, parameters, salt, and hash together
```

---

## TLS (Transport Layer Security)

TLS secures data in transit. It provides confidentiality (encryption), integrity (MAC), and authentication (certificates).

### TLS Version Requirements

| Version | Status | Security Brain Verdict |
|---------|--------|----------------------|
| TLS 1.3 | Current (RFC 8446) | **REQUIRED** for new systems |
| TLS 1.2 | Acceptable | Minimum for legacy systems, with restricted cipher suites |
| TLS 1.1 | **Deprecated** | FORBIDDEN — disable immediately |
| TLS 1.0 | **Deprecated** | FORBIDDEN — disable immediately |
| SSLv3 | **Broken** | FORBIDDEN — POODLE attack |

### TLS 1.3 Cipher Suites (only these are allowed)

```
TLS_AES_256_GCM_SHA384         (preferred)
TLS_AES_128_GCM_SHA256         (acceptable)
TLS_CHACHA20_POLY1305_SHA256   (acceptable, preferred for mobile)
```

TLS 1.3 eliminated: RSA key exchange (no forward secrecy), CBC mode ciphers, RC4, 3DES, SHA-1, compression (CRIME attack), renegotiation. This is why TLS 1.3 is mandatory — it removes the configuration footguns.

### TLS 1.2 Restricted Cipher Suites (legacy only)

```
TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256

FORBIDDEN in TLS 1.2:
- Any cipher suite with RSA key exchange (no ECDHE/DHE = no forward secrecy)
- Any cipher suite with CBC mode (BEAST, Lucky13, padding oracle attacks)
- Any cipher suite with RC4 (biased keystream, broken)
- Any cipher suite with 3DES (64-bit block size, Sweet32 attack)
- Any cipher suite with SHA-1 (collision attacks)
```

### Certificate Requirements

- Key type: ECDSA P-256 or RSA 4096-bit
- Signature: SHA-256 minimum
- Validity: 90 days maximum (align with Let's Encrypt auto-renewal)
- SAN (Subject Alternative Name): required, CN (Common Name) is deprecated
- OCSP stapling: enabled
- Certificate Transparency: required (all public CAs now submit to CT logs)

### HTTP Security Headers (TLS-Adjacent)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

HSTS instructs browsers to only connect via HTTPS. The `preload` directive submits to browser preload lists, eliminating the first-visit vulnerability.

---

## PKI (Public Key Infrastructure)

PKI is the trust framework for digital certificates.

### Components

```
Root CA (offline, air-gapped, HSM-stored private key)
  └── Intermediate CA (online, HSM-stored, issues end-entity certificates)
        └── End-Entity Certificate (server, client, code signing)
```

**Security Brain rules for PKI:**
- Root CA private key stored in HSM, offline, air-gapped
- Certificate chain must be complete (server sends intermediates)
- Certificate revocation: prefer OCSP stapling over CRL
- Pin certificates only when you control both ends (mobile app to your API)
- Monitor Certificate Transparency logs for unauthorized certificates for your domains

### Certificate Lifecycle

```
1. GENERATION: Create key pair (private key never leaves secure boundary)
2. REQUEST: CSR (Certificate Signing Request) sent to CA
3. ISSUANCE: CA validates identity, signs certificate
4. DEPLOYMENT: Install certificate with complete chain
5. MONITORING: Track expiration, CT log appearances
6. RENEWAL: Automate (Let's Encrypt / ACME protocol)
7. REVOCATION: OCSP responder update if compromised
```

---

## Key Management

Key management is the hardest part of cryptography. The encryption algorithm is irrelevant if keys are poorly managed.

### Key Lifecycle (NIST SP 800-57)

```
1. GENERATION
   - Use cryptographically secure random number generator (CSPRNG)
   - Generate in HSM or KMS when possible
   - Never generate keys deterministically from passwords (use KDF if needed)

2. STORAGE
   - NEVER store keys in source code, environment variables, or configuration files
   - NEVER log keys or include in error messages
   - Use: HSM, KMS (AWS KMS, GCP Cloud KMS), HashiCorp Vault, sealed secrets
   - At minimum: OS keychain, encrypted configuration with key from KMS

3. DISTRIBUTION
   - Use key wrapping (envelope encryption) for distribution
   - Never transmit raw keys over network (even encrypted channels)
   - Use Diffie-Hellman key exchange or KMS-mediated key sharing

4. ROTATION
   - Symmetric keys: rotate annually minimum, more frequently for high-value data
   - Asymmetric keys: rotate every 2 years for signing, annually for encryption
   - TLS certificates: rotate every 90 days (automate with ACME)
   - API keys: rotate every 90 days or upon personnel changes
   - Rotation must be zero-downtime (support multiple active keys during transition)

5. REVOCATION
   - Immediate rotation upon suspected compromise
   - Invalidate all tokens/sessions derived from compromised key
   - Audit all operations performed with compromised key

6. DESTRUCTION
   - Cryptographic erasure: delete key, rendering encrypted data unrecoverable
   - Securely overwrite key material (zeroize memory)
   - HSMs provide certified key destruction
```

### Envelope Encryption Pattern

```
                    ┌──────────────────────────┐
                    │        KMS / HSM         │
                    │   (stores master key)    │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────▼─────────────┐
                    │    Key Encryption Key     │
                    │        (KEK)             │
                    │  Never leaves KMS/HSM    │
                    └────────────┬─────────────┘
                                 │ encrypts/decrypts
                    ┌────────────▼─────────────┐
                    │   Data Encryption Key     │
                    │        (DEK)             │
                    │  Generated per operation │
                    │  Encrypted DEK stored    │
                    │  alongside ciphertext    │
                    └────────────┬─────────────┘
                                 │ encrypts/decrypts
                    ┌────────────▼─────────────┐
                    │       Plaintext Data      │
                    └──────────────────────────┘

Benefits:
- Key rotation only requires re-encrypting DEKs (not all data)
- Master key never leaves HSM boundary
- Each data object can have unique DEK
- KMS provides audit logging of key operations
```

---

## Cryptographic Failures — Real-World Examples

### Failure 1: Adobe Password Breach (2013)
- **What happened:** 153 million passwords encrypted with 3DES-ECB (not hashed)
- **Why it failed:** ECB mode preserves patterns — identical passwords produced identical ciphertext. Crossword-puzzle attack using password hints revealed millions of passwords.
- **Lesson:** Use password hashing (Argon2id), never encryption. Never use ECB mode.

### Failure 2: Heartbleed (2014, CVE-2014-0160)
- **What happened:** Buffer over-read in OpenSSL's TLS heartbeat extension leaked up to 64KB of server memory per request, including private keys.
- **Why it failed:** Missing bounds check on heartbeat payload length.
- **Lesson:** Memory-safe languages prevent this class of bugs. Certificate rotation must be rapid. Forward secrecy (ECDHE) limits damage from key compromise.

### Failure 3: Let's Encrypt CAA Bug (2020)
- **What happened:** Bug in certificate validation checking only one domain of multi-domain certificates against CAA records.
- **Why it failed:** Software bug in CA validation logic.
- **Lesson:** Certificate Transparency monitoring is essential. Defense in depth at the CA level matters.

### Failure 4: SolarWinds Supply Chain (2020)
- **What happened:** Build system compromise injected backdoor into signed software updates.
- **Why it failed:** Code signing verified authenticity of the build output, but the build process itself was compromised.
- **Lesson:** Reproducible builds, build system isolation, SLSA framework compliance.

---

## Cryptographic Decision Tree

```
What are you protecting?

├── Data at rest (stored data)
│   ├── Full disk/volume → AES-256-XTS (LUKS, BitLocker)
│   ├── Database column → Application-level AES-256-GCM + envelope encryption
│   ├── File/object storage → Server-side encryption (KMS) or client-side AES-256-GCM
│   └── Backup → Encrypted with separate key from primary (backup key in escrow)

├── Data in transit (network)
│   ├── Browser to server → TLS 1.3 (mandatory)
│   ├── Service to service → mTLS with TLS 1.3
│   ├── API to API → TLS 1.3 + API authentication (OAuth2 bearer tokens)
│   └── VPN → WireGuard (ChaCha20-Poly1305) or IPsec (AES-256-GCM)

├── Passwords
│   └── ALWAYS Argon2id (never encrypt, never fast-hash)

├── API keys / tokens
│   ├── Short-lived → JWT with RS256 or ES256, <1 hour expiry
│   ├── Long-lived → Opaque tokens stored hashed (SHA-256), rotated every 90 days
│   └── Machine-to-machine → Client credentials with mTLS

├── Digital signatures
│   ├── Documents → Ed25519 or RSA-PSS 4096
│   ├── Code signing → Ed25519 or RSA-PSS 4096
│   └── JWTs → RS256 (RSA-PKCS1-SHA256) or ES256 (ECDSA-P256-SHA256)

└── Key exchange
    ├── TLS → X25519 or ECDHE-P256 (handled by TLS library)
    └── Application-level → X25519 Diffie-Hellman
```

---

**Cryptography is a tool, not a solution. The strongest algorithm is worthless with poor key management, and the best key management is worthless if the wrong algorithm is selected. This module provides the decision framework; the implementation must use vetted libraries.**

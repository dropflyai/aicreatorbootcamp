# Information Theory

## What This Enables

Information theory, founded by Claude Shannon in 1948, provides the mathematical framework for quantifying information, communication, and uncertainty. It underpins every aspect of modern computing: data compression, error correction, cryptography, machine learning, and networking. Understanding information theory enables engineers to reason about the fundamental limits of data transmission, storage, and security -- and to design systems that approach those limits.

---

## Foundational Concepts

### Shannon Entropy

**Definition:** For a discrete random variable X with possible values {x1, x2, ..., xn} and probability mass function P(X):

```
H(X) = -sum_{i=1}^{n} P(x_i) * log_2(P(x_i))
```

Entropy measures the average information content (in bits) of outcomes from the source. It quantifies uncertainty: the more unpredictable the source, the higher the entropy.

**Properties:**
- H(X) >= 0 (non-negativity)
- H(X) = 0 iff X is deterministic
- H(X) <= log_2(n) with equality iff X is uniformly distributed
- H(X, Y) <= H(X) + H(Y) with equality iff X and Y are independent

**Example:** A fair coin has H = -[0.5 * log_2(0.5) + 0.5 * log_2(0.5)] = 1 bit. A biased coin (P(H)=0.9, P(T)=0.1) has H = 0.469 bits.

### Information Content (Surprisal)

The information content of a single event x:
```
I(x) = -log_2(P(x))
```

Rare events carry more information than common ones. An event with probability 1/1024 carries exactly 10 bits of information. Entropy is the expected (average) information content.

### Joint and Conditional Entropy

**Joint entropy:**
```
H(X, Y) = -sum_{x,y} P(x, y) * log_2(P(x, y))
```

**Conditional entropy:**
```
H(X | Y) = -sum_{x,y} P(x, y) * log_2(P(x | y))
```

**Chain rule:** H(X, Y) = H(X) + H(Y | X) = H(Y) + H(X | Y)

### Mutual Information

```
I(X; Y) = H(X) + H(Y) - H(X, Y)
         = H(X) - H(X | Y)
         = H(Y) - H(Y | X)
```

Mutual information measures the amount of information that knowing one variable provides about the other. It is symmetric: I(X; Y) = I(Y; X).

**Relationship to KL divergence:**
```
I(X; Y) = D_KL(P(X,Y) || P(X) * P(Y))
```
where KL divergence is:
```
D_KL(P || Q) = sum_x P(x) * log(P(x) / Q(x))
```

### KL Divergence (Relative Entropy)

```
D_KL(P || Q) = sum_x P(x) * log_2(P(x) / Q(x))
```

Measures how much distribution P diverges from distribution Q. Not a true metric (not symmetric, does not satisfy triangle inequality), but fundamental in information theory and machine learning.

**Gibbs' inequality:** D_KL(P || Q) >= 0 with equality iff P = Q.

**Application in ML:** Cross-entropy loss = H(P) + D_KL(P || Q) where P is the true distribution and Q is the model. Minimizing cross-entropy minimizes KL divergence.

---

## Key Theorems and Results

### Shannon's Source Coding Theorem (Noiseless Channel)

**Theorem (Shannon, 1948):** The expected length of any uniquely decodable code for a source X satisfies:

```
E[length] >= H(X)
```

Furthermore, there exists a code with expected length less than H(X) + 1.

**Implication:** Entropy is the fundamental limit of lossless data compression. No scheme can compress data below its entropy. Optimal compression approaches entropy as block size increases.

### Shannon's Channel Coding Theorem (Noisy Channel)

**Theorem (Shannon, 1948):** For a noisy channel with capacity C:

```
C = max_{P(X)} I(X; Y)
```

For any rate R < C, there exists an encoding/decoding scheme that achieves arbitrarily low error probability. For R > C, reliable communication is impossible.

**Binary symmetric channel:** For a channel that flips each bit independently with probability p:
```
C = 1 - H(p) = 1 + p*log_2(p) + (1-p)*log_2(1-p)
```

**Practical significance:** Shannon proved reliable communication is possible up to capacity C, but the proof is non-constructive (random codes). Finding practical codes approaching capacity took 50 years (turbo codes, LDPC codes, polar codes).

### Shannon-Hartley Theorem

For a continuous channel with bandwidth B Hz and signal-to-noise ratio S/N:
```
C = B * log_2(1 + S/N) bits/second
```

This is the theoretical maximum data rate for any communication channel with given bandwidth and noise. All modern communication systems (WiFi, 5G, fiber optics) are designed to approach this limit.

---

## Error-Correcting Codes

### Hamming Codes (1950)

The first practical error-correcting codes.

**Hamming distance:** The number of positions where two codewords differ. A code with minimum distance d can:
- Detect up to d-1 errors
- Correct up to floor((d-1)/2) errors

**Hamming(7,4) code:**
- 4 data bits + 3 parity bits = 7-bit codeword
- Corrects any single-bit error
- Rate = 4/7 ~ 0.571

**Hamming bound (sphere-packing bound):** For an (n,k) code correcting t errors:
```
2^k * sum_{i=0}^{t} C(n,i) <= 2^n
```
Codes meeting this bound with equality are called perfect codes. Hamming(7,4) is perfect.

### Reed-Solomon Codes (1960)

Block codes operating on symbols (groups of bits) rather than individual bits.

**Key property:** An RS(n, k) code over GF(2^m) (Galois field with 2^m elements):
- n symbols total, k data symbols, n-k parity symbols
- Can correct up to (n-k)/2 symbol errors
- Optimal: meets the Singleton bound (maximum distance separable)

**Applications:**
- CDs, DVDs, Blu-ray (corrects scratches -- burst errors on physical media)
- QR codes (enables partial scanning)
- Deep space communication (Voyager, Mars rovers)
- RAID 6 storage systems
- Distributed storage (erasure coding in HDFS, Ceph)

### Modern Codes

**Turbo codes (Berrou et al., 1993):** Two convolutional codes with interleaving. Near-Shannon-limit performance. Used in 3G/4G mobile communications.

**LDPC codes (Gallager, 1962; rediscovered 1990s):** Sparse parity-check matrix. Near-capacity performance with iterative decoding. Used in WiFi (802.11n/ac/ax), 5G, Ethernet (10GBASE-T), SSD flash memory.

**Polar codes (Arikan, 2009):** Provably achieve channel capacity. Used in 5G NR control channels. Based on channel polarization: recursive construction splits channel into very good and very bad sub-channels.

---

## Data Compression Theory

### Huffman Coding (1952)

Optimal prefix-free code for known symbol probabilities.

**Algorithm:**
1. Create a leaf node for each symbol with its probability.
2. Repeatedly combine the two lowest-probability nodes into a new internal node.
3. Assign 0 to left branches, 1 to right branches.

**Properties:**
- Optimal among all prefix-free codes for the given probabilities.
- Expected code length: H(X) <= E[L] < H(X) + 1
- Limitation: restricted to integer bit lengths per symbol.

**Arithmetic coding** removes this limitation by encoding entire messages as a single number in [0, 1), achieving expected length approaching H(X) per symbol. Used in JPEG 2000, H.265/HEVC.

### Lempel-Ziv Compression (1977/1978)

**LZ77 (sliding window):** Replace repeated sequences with (distance, length) pairs referencing earlier occurrences. Foundation of gzip, zlib, PNG.

**LZ78 (dictionary-based):** Build a dictionary of seen phrases. Each new entry extends an existing dictionary entry by one symbol. Foundation of Unix compress.

**LZW (Welch, 1984):** Variant of LZ78 used in GIF format and early modems.

**Theoretical guarantee:** The Lempel-Ziv family is asymptotically optimal for stationary ergodic sources, achieving entropy rate without knowing the source statistics.

### Rate-Distortion Theory

For lossy compression, Shannon's rate-distortion function R(D) gives the minimum bit rate needed to represent a source with average distortion at most D.

```
R(D) = min_{P(Y|X): E[d(X,Y)] <= D} I(X; Y)
```

**Practical significance:** This tells us the fundamental limit of lossy compression (JPEG, MP3, video codecs). Modern codecs like H.265/HEVC and AV1 approach these limits for video.

---

## Kolmogorov Complexity

**Definition:** The Kolmogorov complexity K(x) of a string x is the length of the shortest program (in a fixed universal programming language) that outputs x.

```
K(x) = min{ |p| : U(p) = x }
```
where U is a universal Turing machine.

**Key properties:**
- K(x) is uncomputable (by reduction from the halting problem).
- K(x) <= |x| + c (you can always describe x by listing it).
- A string is "random" (incompressible) if K(x) >= |x| - c.
- Most strings are incompressible (counting argument: fewer short programs than long strings).

**Invariance theorem:** K_U(x) = K_V(x) + O(1) for any two universal Turing machines U and V. The complexity is machine-independent up to a constant.

**Applications:**
- Foundations of randomness (Martin-Lof randomness)
- Minimum description length (MDL) principle in statistics
- Normalized compression distance for similarity measurement
- Solomonoff induction (theoretical foundation of learning)

---

## Cryptographic Foundations

### One-Way Functions

A function f is **one-way** if:
1. f is computable in polynomial time.
2. For any probabilistic polynomial-time algorithm A:
```
Pr[A(f(x)) in f^{-1}(f(x))] <= negl(n)
```
where x is chosen uniformly at random.

**Candidate one-way functions:**
- Integer factoring: multiply is easy, factoring is (believed) hard
- Discrete logarithm: exponentiation is easy, finding the exponent is (believed) hard
- Cryptographic hash functions (SHA-256): designed to be one-way in practice

**Foundational status:** The existence of one-way functions is unproven (it implies P != NP). Nearly all of modern cryptography rests on this assumption.

### Trapdoor Functions

One-way functions with a trapdoor: a secret that makes inversion easy.

**RSA trapdoor function:**
- Public key (n, e): compute c = m^e mod n (easy)
- Without private key d: find m from c (hard -- requires factoring n)
- With private key d: compute m = c^d mod n (easy)

### Zero-Knowledge Proofs

A proof system where the verifier learns nothing beyond the truth of the statement.

**Formal definition:** A zero-knowledge proof for language L consists of (Prover, Verifier) satisfying:
1. **Completeness:** If x in L, honest Prover convinces Verifier with high probability.
2. **Soundness:** If x not in L, no (cheating) Prover can convince Verifier except with negligible probability.
3. **Zero-knowledge:** For every (cheating) Verifier V*, there exists a simulator S that produces transcripts indistinguishable from real interactions.

**Classic example -- graph isomorphism:** Prover knows isomorphism between G0 and G1. In each round: Prover sends random permutation of one graph. Verifier asks "which one?" Prover answers. After many rounds, Verifier is convinced but learns nothing about the actual isomorphism.

**Modern applications:**
- zk-SNARKs: succinct zero-knowledge proofs, used in blockchain privacy (Zcash).
- zk-STARKs: transparent (no trusted setup), post-quantum secure.
- Private authentication and credential systems.

---

## Practical Implications

1. **Entropy determines compressibility.** If your data has structure (repeated patterns, correlations), it can be compressed. Random (high-entropy) data cannot. Design your serialization formats to expose structure to compressors.

2. **Error correction is everywhere.** TCP checksums, ECC memory, RAID arrays, mobile communications, and QR codes all use error-correcting codes. Understanding the theory helps you choose appropriate redundancy levels.

3. **Shannon's limit is real.** No clever encoding can exceed channel capacity. When designing communication systems, focus on approaching the limit rather than trying to beat it.

4. **Compression before encryption.** Encrypt after compressing, not before. Encryption makes data appear random (high entropy), destroying compressibility. Conversely, compressing encrypted data reveals nothing useful.

5. **Hash functions as entropy extractors.** Cryptographic hash functions take variable-entropy input and produce fixed-size, high-entropy output. This is why password hashing works even for low-entropy passwords (combined with salting and key stretching).

6. **Information-theoretic security vs computational security.** One-time pad provides information-theoretic security (unbreakable regardless of computing power). AES provides computational security (unbreakable given current computing power). Know the difference for your threat model.

---

## Common Misconceptions

1. **"Compression ratios are universal."** Compression is data-dependent. A 10:1 ratio on text tells you nothing about images. Already-compressed data (JPEG, MP3) barely compresses further.

2. **"More redundancy always means more reliability."** Error correction has diminishing returns. The tradeoff is rate (useful data / total data) vs reliability. Reed-Solomon and LDPC codes are near-optimal on this tradeoff.

3. **"Encryption hides everything about the plaintext."** Encryption hides content but typically does not hide message length, timing, or metadata. Traffic analysis can reveal significant information despite encryption.

4. **"Random number generators produce truly random numbers."** Pseudorandom number generators (PRNGs) are deterministic. Cryptographically secure PRNGs (CSPRNGs) are computationally indistinguishable from random to any efficient adversary, but are not information-theoretically random.

5. **"SHA-256 is a one-way function."** No hash function has been proven to be one-way. SHA-256 is believed to be one-way based on extensive analysis, but this is a conjecture, not a theorem.

6. **"Kolmogorov complexity can be used to measure real data complexity."** K(x) is uncomputable. We can only approximate it from above using actual compressors. The approximation can be arbitrarily loose for specific inputs.

---

## Further Reading

- **Cover, T. & Thomas, J.** *Elements of Information Theory* (2nd ed.) - The standard graduate textbook. Rigorous and comprehensive treatment of entropy, coding, and channels.
- **Shannon, C.** "A Mathematical Theory of Communication" (1948) - The founding paper. Remarkably readable and still relevant.
- **MacKay, D.** *Information Theory, Inference, and Learning Algorithms* - Excellent and freely available online. Bridges information theory, Bayesian inference, and machine learning.
- **Li, M. & Vitanyi, P.** *An Introduction to Kolmogorov Complexity and Its Applications* - Definitive reference on algorithmic information theory.
- **Katz, J. & Lindell, Y.** *Introduction to Modern Cryptography* - Rigorous treatment of cryptographic foundations based on information theory.
- **Lin, S. & Costello, D.** *Error Control Coding* - Comprehensive treatment of error-correcting codes.
- **Salomon, D.** *Data Compression: The Complete Reference* - Exhaustive reference on compression algorithms.
- **Goldreich, O.** *Foundations of Cryptography* - The theoretical foundation of modern cryptography. Two volumes covering one-way functions through zero-knowledge.

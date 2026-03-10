# Prototype X1000 Infrastructure

This directory contains the core infrastructure for brain collaboration, communication, and coordination.

---

## Files

| File | Purpose |
|------|---------|
| `BRAIN_WIRING_MAP.md` | Complete inter-brain communication architecture, cluster definitions, message protocols |

---

## Related Files (in other directories)

| File | Purpose |
|------|---------|
| `/ceo_brain/02_orchestration/collaboration_protocol.md` | Debate protocols, source citations, logging |
| `/ceo_brain/02_orchestration/agent_teams.md` | Department spawning, team structures |
| `/ceo_brain/02_orchestration/brain_routing.md` | Brain routing table, decision tree |

---

## Memory Locations

```
/memory/
├── collaborations/          # Full collaboration logs
│   └── summaries/          # Human-readable summaries
├── debates/                 # Debate transcripts
├── handoffs/               # Cross-cluster handoff contracts
├── decisions/              # Decision records
├── learnings/              # Extracted learnings
└── patterns/               # Reusable patterns
```

---

## Quick Reference

### Starting a Collaboration

1. Query memory for past related work
2. Define topic, participants, success criteria
3. Spawn department agents if needed
4. Follow PROPOSE → CHALLENGE → RESOLVE cycle
5. Require sources for all claims
6. Log outcome to memory

### Source Citation Required

```
CLAIM: [Statement]
SOURCE: [Author] ([Year]). "[Title]." [URL]
RELEVANCE: [Why it supports claim]
```

### Consensus Threshold

- 70% agreement = consensus reached
- <70% = Brain Lead decides
- Cross-cluster conflict = CEO Brain decides

---

**All collaboration MUST be logged. Unsourced claims REJECTED.**

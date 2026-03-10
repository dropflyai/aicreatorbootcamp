# Architecture Decision Records

Architecture Decision Records (ADRs) document significant engineering decisions, their context, the options considered, and the rationale for the chosen approach. ADRs create a permanent record of why things are the way they are, preventing future teams from re-debating settled questions or unknowingly reversing past decisions.

---

## When to Write an ADR

Write an ADR when making a decision that:

- Affects system architecture or data models
- Selects a technology, framework, or tool
- Changes deployment strategy or infrastructure
- Establishes a pattern that other engineers will follow
- Reverses or supersedes a previous decision
- Has significant cost, performance, or security implications

### How to Write an ADR

1. **Copy the template** from `ADR-Template.md` in this directory.
2. **Assign a sequential number** using the format `ADR-NNN` (e.g., `ADR-001`, `ADR-002`).
3. **Fill in all sections.** Incomplete ADRs are not valid.
4. **Save the ADR** in this directory with the filename `ADR-NNN-short-title.md`.
5. **Set the status** to `Proposed` until reviewed, then update to `Accepted`, `Deprecated`, or `Superseded`.

### ADR Lifecycle

| Status | Meaning |
|--------|---------|
| `Proposed` | Decision is drafted and awaiting review |
| `Accepted` | Decision is approved and in effect |
| `Deprecated` | Decision is no longer relevant (context changed) |
| `Superseded` | Decision has been replaced by a newer ADR (link to replacement) |

---

## Filing and Numbering

- ADRs are numbered sequentially starting at `ADR-001`.
- Numbers are never reused, even if an ADR is deprecated.
- Superseded ADRs link forward to their replacement.
- New ADRs link back to any ADR they supersede.

---

## Cross-References

- **Templates/adr_template.md** -- Detailed ADR template with field descriptions
- **Solutions/SolutionIndex.md** -- Solutions may reference the ADR that approved them
- **Solutions/GoldenPaths.md** -- Golden paths are often established by ADRs
- **Memory/ExperienceLog.md** -- ADR context often originates from experience log entries

---

**Every significant decision deserves a record. If it was worth debating, it is worth documenting.**

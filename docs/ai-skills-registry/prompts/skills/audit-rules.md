\# audit-rules.md — Skill: Canonical Audit Framework

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.



This skill defines the deterministic audit framework used across all repositories. It ensures consistent audit structure, predictable task generation, and strict adherence to registry governance.



======================================================================

1. PURPOSE

======================================================================

To ensure:

\- consistent audits across all repos

\- deterministic audit categories

\- predictable task generation with correct tags



======================================================================

2. TRIGGERS

======================================================================

\- "perform an audit"

\- "run a 9-category audit"

\- "audit the repo"



======================================================================

3. AUDIT CATEGORIES (MANDATORY)

======================================================================

All audits MUST use these nine categories:



1. **Architecture**
2. **Performance**
3. **Security**
4. **UI/UX/IX**
5. **DX (Developer Experience)**
6. **Feature Flags & Shell Governance**
7. **Data Integrity & Lineage**
8. **Testing & Reliability**
9. **Task & Governance Compliance**

======================================================================

4. MODEL SELECTION FOR AUDITS

======================================================================

- **Security/Architecture/Logic**: [Gemini‑3.1‑Pro‑(High)] or [Claude‑Opus‑4.6]
- **General Coding/Refactors**: [Claude‑Sonnet‑4.6]
- **UI/UX/DX**: [Gemini‑3.1‑Pro‑(High)] or [Claude‑Sonnet‑4.6]
- **Cleanup/Boilerplate**: [Gemini‑3.1‑Pro‑(Low)]

======================================================================

5. REGISTRY AWARENESS

======================================================================

\- This file is maintained in `ai-skills-registry`.

\- All repos must sync this file.

\- Local edits are forbidden.



======================================================================

END OF FILE

======================================================================


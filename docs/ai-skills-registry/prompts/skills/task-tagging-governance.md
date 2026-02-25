\# task-tagging-governance.md — Skill: Task Tagging Governance

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.



======================================================================

1. PURPOSE

======================================================================

Define a deterministic, quota‑aware, cross‑repo standard for tagging tasks with model metadata. Ensure agents choose the best model for the task while avoiding quota exhaustion.



======================================================================

2. TRIGGERS

======================================================================

\- The agent is asked to update TASK.md or ROADMAP.md.

\- The agent is asked to generate tasks during audits, refactors, or planning.



======================================================================

3. TAGGING FORMAT (DETERMINISTIC)

======================================================================

Every task in TASK.md MUST follow this structure:



```
#### [ ] TASK-ID: Goal Description
  [Model Tag] [Category Tag] [Optional Role Tag]
```

======================================================================

4. ALLOWED MODEL TAGS (MANDATORY)

======================================================================

Agents MUST use one of the following model tags (non-breaking hyphens required):

- [Gemini‑3.1‑Pro‑(High)]
- [GPT‑5.3‑Codex‑Max]
- [Claude‑Opus‑4.6]
- [Claude‑Sonnet‑4.6]
- [Gemini‑3.1‑Pro‑(Low)]

======================================================================

5. MODEL SELECTION PHILOSOPHY

======================================================================

**“The best model for the task, while avoiding quota exhaustion.”**

- **Tier 1 — Gemini‑3.1‑Pro‑(High)**: High-stakes reasoning, security engineering, and agentic tool use.
- **Tier 1B — GPT‑5.3‑Codex‑Max**: Large-scale code generation and multi-file refactors.
- **Tier 2 — Claude‑Opus‑4.6 / Claude‑Sonnet‑4.6**: Backend/Frontend reasoning, ultra-long context, and safety-critical tasks.
- **Tier 3 — Gemini‑3.1‑Pro‑(Low)**: Bulk transformations, JSON/Markdown cleanup, and simple classification.

======================================================================

6. CATEGORY TAGS (MANDATORY)

======================================================================

Allowed category tags:
- [security]
- [performance]
- [ui]
- [risk]
- [cleanup]
- [a11y]
- [dx]

======================================================================

7. ROLE TAGS (CONDITIONAL)

======================================================================

Allowed role tags:
- [jules-ai] → automation-safe tasks only
- [antigravity] → planning, architecture, or high-risk tasks

======================================================================

8. REGISTRY AWARENESS

======================================================================

\- This file is maintained in `ai-skills-registry`.

\- All repos must sync this file.

\- Local edits are forbidden.



======================================================================

END OF FILE

======================================================================

# model-tagging.md — Skill: Deterministic Model Routing

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.



This skill defines how agents must assign model tags to tasks in `TASK.md`. It ensures deterministic, tiered model routing across all projects.



======================================================================

1. PURPOSE

======================================================================

To ensure:

- consistent model selection across repos

- deterministic task routing

- tiered model philosophy (Tier 1, Tier 1B, Tier 2, Tier 3)



======================================================================

2. MODEL TIERS (MANDATORY)

======================================================================

Agents MUST use one of the following (must use non-breaking hyphens):

- [Gemini‑3.1‑Pro‑(High)]
- [GPT‑5.3‑Codex‑Max]
- [Claude‑Opus‑4.6]
- [Claude‑Sonnet‑4.6]
- [Gemini‑3.1‑Pro‑(Low)]

======================================================================

3. SELECTION GUIDANCE

======================================================================

- **Tier 1 — Gemini‑3.1 Pro (High)**: High-stakes reasoning, secure tool use.
- **Tier 1B — GPT‑5.3 Codex Max**: Complex multi-file refactors.
- **Tier 2 — Claude Opus/Sonnet 4.6**: General reasoning, long context.
- **Tier 3 — Gemini‑3.1 Pro (Low)**: Bulk cleanup, basic transfers.

======================================================================

4. TAGGING RULES

======================================================================

Every task MUST include:
1. **Model Tag** (e.g., [Claude‑Sonnet‑4.6])
2. **Category Tag** ([security], [performance], [ui], [risk], [cleanup], [a11y], [dx])
3. **Optional Role Tag** ([jules-ai] or [antigravity])

======================================================================

5. REGISTRY AWARENESS

======================================================================

- This file is maintained in `ai-skills-registry`.

- All repos must sync this file.

- Local edits are forbidden.



======================================================================

END OF FILE

======================================================================

# gap-analysis.md — Skill: Cross-Project Gap Analysis

Authoritative Source: Maintained in `ai-skills-registry`.
All repos must sync this file. Local edits are forbidden.

This skill defines the process for detecting governance drift, missing updates, and synchronization gaps across the ecosystem.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- all repositories are synchronized with the central registry
- local governance files match authoritative versions
- `TASK.md` and `ROADMAP.md` follow the correct schema
- project hygiene is maintained

======================================================================
2. TRIGGERS
======================================================================
- "perform gap analysis"
- "check for drift"
- "audit governance"
- "verify sync status"

======================================================================
3. MODEL SELECTION (MANDATORY)
======================================================================
Gap analysis requires precise comparison and structured reporting.

Use:
- **[Gemini-3.1-Pro-(High)]**

NEVER use:
- [Gemini-3.1-Pro-(Low)] (lacks precision for diffing)
- [Qwen]

======================================================================
4. ANALYSIS CHECKLIST (MANDATORY)
======================================================================
Agents MUST verify the following during a gap analysis:

### 4.1 Registry Sync Status
- Compare local governance files (e.g., `prompts/system/GEMINI.md`, `docs/MODEL_ROUTING_GUIDE.md`) with the registry versions.
- Identify missing files that should be present.
- Identify local modifications that violate "Local edits are forbidden" rules.

### 4.2 Task & Roadmap Schema
- Verify `TASK.md` exists and follows the correct structure (Goal, Why, Files, Acceptance Criteria).
- Verify `ROADMAP.md` exists and aligns with `TASK.md` phases.

### 4.3 Versioning & Tags
- Check if model tags in `TASK.md` match the current `MODEL_ROUTING_GUIDE.md` (e.g., no legacy tags like `GPT-5.2-Codex`).
- Verify feature flags usage matches `docs/FEATURE_FLAG_ARCHITECTURE.md`.

======================================================================
5. OUTPUT FORMAT
======================================================================
When gaps are found, generate tasks in `TASK.md` using the following tags:

- **Model Tag:** [Gemini-3.1-Pro-(High)]
- **Category Tag:** [cleanup] or [governance]
- **Role Tag:** [jules-ai]

Example:
```
[Gemini-3.1-Pro-(High)] [governance] [jules-ai]
Sync `docs/MODEL_ROUTING_GUIDE.md` with registry (version mismatch).
```

======================================================================
6. REGISTRY AWARENESS
======================================================================
- This file is maintained in `ai-skills-registry`.
- All repos must sync this file.
- Local edits are forbidden.
- Agents must treat this file as authoritative.

======================================================================
END OF FILE
======================================================================

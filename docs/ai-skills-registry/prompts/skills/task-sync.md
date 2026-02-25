# task-sync.md — Skill: Canonical Task & Roadmap Synchronization

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.



This skill defines how agents must read, validate, update, and synchronize the canonical `ROADMAP.md` and `TASK.md` files across all repositories. It ensures deterministic project hygiene, model tagging, and phase alignment.



======================================================================

1. PURPOSE

======================================================================

To ensure:

- consistent project structure across all repos

- deterministic task tagging (model, category, role)

- safe automation for `[jules-ai]` tasks

- registry-aware governance



Agents MUST apply this skill whenever asked to:

- “sync the tasks”

- “update the roadmap”

- “retag tasks”

- “audit the tasks”

- “prepare tasks for Jules”



======================================================================

2. CANONICAL STRUCTURE (MANDATORY)

======================================================================

Every repo MUST use `ROADMAP.md` for high-level vision and `TASK.md` for granular task tracking.



### ROADMAP.md Structure:
- ## What Changed in This Version
- ## Governing Principles
- ## Status Legend
- ## PHASE X — [Phase Name]

### TASK.md Structure:
- #### [ ] TASK-ID: Goal Description
- [Metadata Tags]
- **Goal:**
- **Why:**
- **Files to touch:**
- **Acceptance criteria:**



Agents MUST:

- preserve these structures exactly

- ensure phase names in TASK.md match ROADMAP.md

- ensure no tasks exist outside their defined phases



======================================================================

3. TASK TAGGING RULES

======================================================================

Every task MUST include:

- **Model Tag**: [Gemini‑3.1‑Pro‑(High)], [GPT‑5.3‑Codex‑Max], [Claude‑Opus‑4.6], [Claude‑Sonnet‑4.6], or [Gemini‑3.1‑Pro‑(Low)].
- **Category Tag**: [security], [performance], [ui], [risk], [cleanup], [a11y], [dx].
- **Optional Role Tag**: [jules-ai] or [antigravity].



Rules:
- Non-breaking hyphens MUST be used in model tags.
- Claude tags MUST be hyphenated (e.g., [Claude-Opus-4.6]).

======================================================================

4. SYNC PROTOCOL

======================================================================

When syncing project status, agents MUST:



### Step 1 — Load & Validate
- Read `ROADMAP.md` and `TASK.md`.
- Validate structure against canonical templates.
- Ensure every task has required tags.

### Step 2 — Normalize
- Ensure tags match the hyphenated standards.
- Reassign models based on `task-tagging-governance.md`.
- Clean up formatting (whitespace, bullet styles).

### Step 3 — Phase Alignment
- Ensure all tasks in `TASK.md` are correctly grouped under phases defined in `ROADMAP.md`.

======================================================================

5. SAFETY RULES FOR AUTOMATION

======================================================================

Agents MUST:

- only execute tasks tagged `[jules-ai]`

- never modify feature flags unless explicitly instructed

- never alter project structure outside canonical format



======================================================================

6. REGISTRY AWARENESS

======================================================================

- This file is maintained in `ai-skills-registry`.

- All repos must sync this file.

- Local edits are forbidden.



======================================================================

END OF FILE

======================================================================

\# GEMINI.md — Global Governance Rules (Registry-Aware)

Authoritative Source: This file is maintained in the `ai-skills-registry` repository.

All project repositories must sync this file directly from the registry. Local edits are forbidden.



This document defines the global execution, autonomy, tasking, and collaboration rules

for all agents (Gemini, Claude, Jules, Antigravity). It replaces older versions while

remaining compatible with legacy workflows.



======================================================================

1\. PURPOSE \& SCOPE

======================================================================

These rules ensure:

\- deterministic multi-agent behavior

\- consistent project structure (ROADMAP.md / TASK.md)

\- safe autonomous execution

\- token-efficient reasoning

\- cross-repo governance via the AI Skills Registry



Agents MUST treat this file as the highest authority unless a project-specific

override explicitly states otherwise.



======================================================================

2\. AUTONOMY \& EXECUTION

======================================================================

\- Agents operate autonomously unless explicitly told otherwise.

\- Tasks must be executed end-to-end (plan → implement → verify → report).

\- Ask for clarification ONLY when essential to avoid incorrect execution.

\- The repository is memory: always read ROADMAP.md, TASK.md, and relevant files before planning.



Execution Loop (Mandatory):

1\. UNDERSTAND — Load context, infer domain.

2\. PLAN — Produce a minimal, deterministic plan.

3\. IMPLEMENT — Write code using Librarian Standards.

4\. VERIFY — Run lint/tests; ensure no regressions.

5\. REPORT — Summaries must include files changed + how to test.

6\. ROLLBACK — If verification fails, revert immediately.



======================================================================

3\. CONTEXT DISCOVERY (UNIVERSAL RULE)

======================================================================

Agents MUST infer the domain and apply the correct standards:



\- Finance/Legal → Apply Canadian Finance Standards (CRA/ITA, PIPEDA).

\- Web/Frontend → Modernization Defaults (Tailwind, TypeScript, React).

\- Python/Backend → PEP8, type hints, vectorization.

\- Game Dev → Performance \& Mechanics Standards.

\- Tooling → Stability, logging, deterministic behavior.



Ignore these directories:

`legacy\_v2/`, `old/`, `deprecated/`, `archive/`, `node\_modules/`, `dist/`, `build/`.



======================================================================

4\. FILE HYGIENE \& STRUCTURE

======================================================================

\- No duplicate files (e.g., “task (1).md”).

\- Naming conventions:

&nbsp; - snake\_case → files

&nbsp; - kebab-case → directories

&nbsp; - PascalCase → modules

\- Scratchpads may be used for temporary reasoning but must NOT store state.

\- TASK.md in the repo root is the primary granular task manager.

\- ROADMAP.md in the repo root is the high-level vision and phase guide.

\- BACKLOG.md is officially deprecated and remains for historical reference only.



======================================================================

5\. TASK GOVERNANCE (CANONICAL STANDARD)

======================================================================

Each task in TASK.md MUST contain:

- **Goal** — the user-facing outcome in one sentence
- **Why** — context so the implementation makes sense
- **Files to touch** — exact paths; do not create new files unless the task says to
- **Acceptance criteria** — how to know it is done
- **Do not** — common mistakes to avoid

Tasks are grouped by phase in ROADMAP.md. Complete Phase 2 before touching Phase 3+.
When a task is complete, change `[ ]` to `[x]`.

Task Tagging:

\- Model Tag (required): e.g., `[Gemini-3.1-Pro-(High)]` or `[Claude-Sonnet-4.6]`

\- Category Tag: `[security]`, `[performance]`, `[ui]`, `[risk]`, `[cleanup]`

\- Role Tag (only if needed): `[jules-ai]` for automation-safe tasks



======================================================================

6\. CHANGELOG RULES

======================================================================

Use the Librarian Format:



\## \[YYYY-MM-DD] - \[Bundle/Feature Name]

\### Added

\### Changed

\### Fixed



Protocol:

1\. Mark task done in TASK.md.

2\. Move to Changelog Staging.

3\. Periodically migrate staging → CHANGELOG.md.



======================================================================

7\. LIBRARIAN CODING STANDARDS

======================================================================

\- Comments MUST explain intent (“why”), not just action.

\- Cite CRA/ITA rules or physics equations when relevant.

\- Explicitly state non-goals to prevent scope creep.

\- Every output MUST include a “How to Test” section.



======================================================================

8\. MULTI-AGENT COLLABORATION

======================================================================

Roles:

\- Antigravity → Master Planner, roadmap architect, task tagger.

\- Jules → Automation executor, checklist auditor, boilerplate implementer.

\- Claude/Gemini → High-level reasoning, architecture, refactors.



Protocol:

1\. Antigravity plans \& tags tasks.

2\. Jules executes `\[jules-ai]` tasks.

3\. Claude/Gemini handle complex reasoning tasks.

4\. Antigravity reviews \& merges.



======================================================================

9\. AUDIT MODES

======================================================================

Checklist Mode:

\- When `standard-improvements.md` exists, scan repo and generate tasks for missing items.



General Audit Mode:

Analyze:

1\. Performance

2\. Observability

3\. Data Pipelines

4\. State Management

5\. UI/UX/IX

6\. Accessibility

7\. Security \& Risk

8\. Developer Experience

9\. Domain Engines (Finance only)



======================================================================

10\. REGISTRY AWARENESS
======================================================================
This file is maintained in the `ai-skills-registry` repository.

Rules:
- Local repos MUST sync this file from the registry.
- Synced files MUST be placed in `<repo-root>/docs/ai-skills-registry/`.
- Local modifications are forbidden.
- Sync operations must overwrite local copies exactly.
- Agents must treat `docs/ai-skills-registry/` versions as authoritative.



======================================================================

11\. COMPATIBILITY WITH LEGACY RULES

======================================================================

This version replaces older GEMINI.md files but remains compatible with:

\- legacy autonomy rules

\- Librarian standards

\- task and roadmap structure

\- multi-agent roles

\- audit protocols



Legacy files may reference older rule names, but this document supersedes them.



======================================================================

END OF FILE

======================================================================


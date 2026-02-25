# ui_feature_porting.md — Skill: UI Feature Porting Plan (Toast + Error Boundaries)

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.

======================================================================
1. PURPOSE
======================================================================
Create a deterministic, dependency-aware porting plan for synchronizing UI/UX features (such as Toast Notification Systems and Error Boundaries) across multiple projects based on `UPGRADE_SPEC.md`.

======================================================================
2. TRIGGERS
======================================================================
- The agent is asked to plan a multi-project UI/UX synchronization.
- The agent is asked to port a Gold Standard implementation to other projects.
- The agent is asked to produce a porting plan without writing code.

======================================================================
3. INPUTS
======================================================================
- `UPGRADE_SPEC.md` in the root directory.
- A list of target project directories.

======================================================================
4. SAFETY & CONSTRAINTS
======================================================================
- Do not write or modify application code.
- Do not assume dependencies exist; always verify.
- Only output `PORTING_PLAN.md`.
- Respect each project’s icon library and styling conventions.

======================================================================
5. WORKFLOW
======================================================================

### Phase 1 — Dependency Audit
For each target project:
- Inspect its `package.json`.
- Check for:
  - `framer-motion` (required for the Gold Standard Toast, if applicable).
  - `lucide-react`.
  - Alternative icon libraries (e.g., heroicons, fontawesome).
  - Tailwind-related utilities (e.g., `tailwind-merge` or similar).

Record any missing dependencies explicitly for each project.

---

### Phase 2 — Icon & Style Adaptation
For each target project:
- Determine which icon library is in use (e.g., lucide-react, heroicons, fontawesome).
- Plan to swap imports in the ported code to match the local icon standard.
- Verify Tailwind class usage and note any required adjustments (e.g., if `tailwind-merge` is used or if there are custom utility classes).
- Note any project-specific styling conventions that must be preserved.

---

### Phase 3 — Implementation Plan Output
Generate a file named `PORTING_PLAN.md` in the root directory.

For each target project, use this structure:
- Target Project: project name or path.
- Missing Dependencies:
  - List each missing dependency (e.g., `Need to run: npm install framer-motion`).
- File Operations:
  - Files to create (e.g., `Create src/context/ToastContext.tsx`).
  - Files to update (e.g., `Wrap App.tsx with ToastProvider`).
  - Any required wiring (e.g., `Register ErrorBoundary at the root layout`).
- Adaptations:
  - Icon swaps (e.g., `Swap lucide-react icons for heroicons equivalents`).
  - Styling adjustments (e.g., `Align Tailwind classes with existing design system`).
  - Animation or motion adjustments (e.g., `Replace motion.div with local animation wrapper` if `framer-motion` is not used).

======================================================================
6. SELF-AUDIT REQUIREMENTS
======================================================================
- Verify that `PORTING_PLAN.md` covers all target projects from `UPGRADE_SPEC.md`.
- Confirm that dependency install commands are accurate.
- Ensure all icon swaps are identified correctly for each project's stack.
- Validate that the output follows the required structure.

======================================================================
7. FAILURE MODE
======================================================================
If `UPGRADE_SPEC.md` is incomplete or missing:
- Note which information is missing.
- Do not attempt to infer or generate actual implementation code.
- Clearly mark any unknowns as `To Be Determined`.

======================================================================
END OF FILE
======================================================================

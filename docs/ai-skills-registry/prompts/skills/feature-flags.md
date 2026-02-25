# feature-flags.md — Skill: Feature Flag & Admin Mode Governance

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.

This skill defines how agents must reason about, modify, and respect feature flags, admin mode, and the separation between the MVP shell and the Full‑OS shell. It ensures deterministic behavior and prevents accidental exposure of unfinished or hidden features.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- strict separation between MVP and Full‑OS shells
- safe handling of hidden features
- deterministic feature flag behavior
- protection of unfinished or experimental features
- consistent admin-mode logic across all repos

======================================================================
2. TRIGGERS
======================================================================
Agents MUST apply this skill whenever:
- modifying routes
- modifying UI shells
- modifying navigation
- adding new features
- refactoring feature-flag logic
- performing audits or task list updates

======================================================================
3. INPUTS
======================================================================
- Local `feature-flags.ts` or `flags.config.ts`.
- Environment variables (`ADMIN_MODE`, `EXPERIMENTAL_MODE`).
- Registry governance on shell separation (`mvp-shell-governance.md`).

======================================================================
4. FEATURE FLAG PRINCIPLES (MANDATORY)
======================================================================
Agents MUST follow these principles:

### 4.1 Flags Control Visibility
- If a feature flag is **false**, the feature MUST NOT appear:
  - in navigation
  - in routes
  - in UI components
  - in API exposure
  - in documentation

### 4.2 Flags Do Not Remove Code
- Hidden features may still exist in the codebase.
- Flags only control visibility and access.

### 4.3 Flags Must Be Deterministic
- No dynamic or user-driven toggles unless explicitly allowed.
- No UI toggles for admin mode.
- No runtime guessing.

### 4.4 Flags Must Be Centralized
All flags MUST be defined in a single source of truth, e.g.:

```ts
export const features = {
  glMapper: true,
  taxWaterfall: true,
  accountantExport: true,
  homeOffice: true,
  shareholderLoan: true,

  // Hidden for MVP
  oasCpp: false,
  resp: false,
  portfolio: false,
  fire: false,
  crypto: false,
};
```

======================================================================
5. ADMIN MODE (MANDATORY)
======================================================================
Admin Mode determines whether hidden features are visible.

### 5.1 Admin Mode Source of Truth
Admin mode MUST be controlled by:

```
ADMIN_MODE=true  // dev or staging
ADMIN_MODE=false // production
```

### 5.2 Admin Mode Behavior
If `ADMIN_MODE=true`:
- All hidden features become visible.
- Full‑OS shell is enabled.
- MVP shell remains accessible but secondary.

If `ADMIN_MODE=false`:
- Only MVP features are visible.
- Full‑OS shell MUST NOT be accessible.
- Hidden features MUST NOT appear anywhere.

### 5.3 No UI Toggles
Agents MUST NOT:
- create UI toggles for admin mode
- expose admin mode to users
- allow user-driven flag changes

======================================================================
6. MVP VS FULL‑OS SHELL GOVERNANCE
======================================================================

### 6.1 MVP Shell
Visible when:
- `ADMIN_MODE=false`

Contains:
- Physician tax workflow
- GL Mapper
- Tax Waterfall
- Accountant Export
- Stripe + Auth
- Core onboarding

### 6.2 Full‑OS Shell
Visible only when:
- `ADMIN_MODE=true`

Contains:
- All features (including hidden ones)
- Experimental modules
- Future OS components

### 6.3 Shell Separation Rules
Agents MUST:
- preserve both shells
- never merge them
- never expose Full‑OS components in MVP mode
- never expose hidden features in production

======================================================================
7. SAFETY & CONSTRAINTS
======================================================================
Agents MUST NOT:
- modify feature flags unless explicitly instructed
- expose hidden features in UI or routes
- remove feature flags without approval
- create new flags without approval
- bypass admin mode logic
- infer admin mode from user input

Agents MUST:
- respect existing flags
- maintain deterministic behavior
- ensure hidden features remain hidden

======================================================================
8. WHEN ADDING NEW FEATURES
======================================================================
Agents MUST:
1. Add a new feature flag (default: `false`)
2. Place the feature behind the flag
3. Ensure it is visible only in admin mode
4. Ensure it is NOT visible in MVP mode
5. Add tasks to TASK.md for:
   - UI integration
   - API integration
   - Testing
   - Documentation

======================================================================
9. SELF-AUDIT REQUIREMENTS
======================================================================
When auditing a repo, agents MUST check:
- Are all hidden features behind flags?
- Are flags centralized?
- Are flags deterministic?
- Is admin mode respected?
- Are MVP and Full‑OS shells separated?
- Are any hidden features accidentally exposed?

If violations exist:
- Create tasks in TASK.md
- Tag with `[security]` or `[risk]`
- Assign appropriate model tags

======================================================================
10. FAILURE MODE
======================================================================
- If the feature flag configuration is corrupted or missing, halt and report the error.
- If environment variables needed for flag evaluation are unavailable, assume `false` for any non-MVP features.
- Do not proceed with feature activation if the auditing process fails to confirm correct gating.

======================================================================
11. REGISTRY AWARENESS
======================================================================
- This file is maintained in `ai-skills-registry`.
- All repos must sync this file.
- Local edits are forbidden.
- Agents must treat this file as authoritative.

======================================================================
END OF FILE
======================================================================


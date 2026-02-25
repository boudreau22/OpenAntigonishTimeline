# mvp-shell-governance.md — Skill: MVP Shell & Full‑OS Shell Governance

Authoritative Source: Maintained in `ai-skills-registry`.

All repos must sync this file. Local edits are forbidden.

This skill defines how agents must reason about, maintain, and protect the separation between the MVP shell and the Full‑OS shell. It ensures that hidden features remain hidden, admin mode is respected, and UI/route exposure is deterministic across all repositories.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- strict separation between MVP and Full‑OS shells
- deterministic feature visibility
- safe handling of hidden features
- consistent admin-mode behavior
- protection of unfinished or experimental modules
- predictable UI and routing behavior across repos

======================================================================
2. TRIGGERS
======================================================================
Agents MUST apply this skill whenever:
- modifying navigation
- modifying routes
- modifying UI shells
- adding new features
- refactoring shell logic
- performing audits or task list updates

======================================================================
3. INPUTS
======================================================================
- Local `App.tsx` or main routing configuration.
- Navigation component definitions.
- Feature flag central configuration.
- Registry governance on feature flags (`feature-flags.md`).

======================================================================
4. SHELL DEFINITIONS
======================================================================

### 4.1 MVP Shell
The MVP shell is the **public-facing**, **production-safe** interface.

It MUST include only:
- Physician tax workflow
- GL Mapper
- Tax Waterfall
- Accountant Export
- Stripe + Authentication
- Core onboarding flows

It MUST NOT include:
- experimental features
- hidden modules
- future OS components
- admin-only tools

### 4.2 Full‑OS Shell
The Full‑OS shell is the **complete system interface**, visible only when:

```
ADMIN_MODE=true
```

It includes:
- all MVP features
- all hidden features
- all experimental modules
- all future OS components
- all admin tools

### 4.3 Shell Separation Rules
Agents MUST:
- preserve both shells
- never merge them
- never expose Full‑OS components in MVP mode
- never expose hidden features in production
- never infer admin mode from user input

======================================================================
5. ADMIN MODE GOVERNANCE
======================================================================

### 5.1 Admin Mode Source of Truth
Admin mode MUST be controlled by:

```
ADMIN_MODE=true  // dev or staging
ADMIN_MODE=false // production
```

### 5.2 Admin Mode Behavior
If `ADMIN_MODE=true`:
- Full‑OS shell is visible
- Hidden features become accessible
- MVP shell remains available but secondary

If `ADMIN_MODE=false`:
- Only MVP shell is visible
- Full‑OS shell MUST NOT be accessible
- Hidden features MUST NOT appear anywhere

### 5.3 No UI Toggles
Agents MUST NOT:
- create UI toggles for admin mode
- expose admin mode to users
- allow user-driven flag changes

======================================================================
6. FEATURE VISIBILITY RULES
======================================================================

### 6.1 Hidden Features
Hidden features MUST:
- be behind feature flags
- be visible ONLY when `ADMIN_MODE=true`
- NEVER appear in production UI
- NEVER appear in production routes
- NEVER appear in public documentation

### 6.2 MVP Features
MVP features MUST:
- always be visible
- always be accessible
- never depend on admin mode

### 6.3 Experimental Features
Experimental features MUST:
- default to `false` in feature flags
- be visible only in admin mode
- be isolated from MVP flows

======================================================================
7. ROUTING & NAVIGATION RULES
======================================================================

### 7.1 MVP Mode Routing
When `ADMIN_MODE=false`, agents MUST ensure:
- only MVP routes are registered
- Full‑OS routes are NOT imported
- hidden feature routes are NOT imported
- navigation shows only MVP items

### 7.2 Full‑OS Mode Routing
When `ADMIN_MODE=true`, agents MUST:
- register all routes
- expose all navigation items
- ensure MVP shell remains functional

### 7.3 Safety Rules
Agents MUST NOT:
- leak hidden routes via deep links
- expose admin-only pages via direct URL
- generate documentation for hidden features

======================================================================
8. SAFETY & CONSTRAINTS
======================================================================
- Never bypass shell separation logic.
- Always verify that new routes are correctly gated.
- Do not modify core authentication or stripe redirects.
- Ensure all hidden features are paired with a valid feature flag.

======================================================================
9. SELF-AUDIT REQUIREMENTS
======================================================================
When auditing a repo, agents MUST check:
- Are MVP and Full‑OS shells separated?
- Are hidden features behind flags?
- Are flags deterministic?
- Is admin mode respected?
- Are any hidden features accidentally exposed?
- Are routes correctly gated?
- Is navigation correctly gated?

======================================================================
10. FAILURE MODE
======================================================================
- If shell logic is compromised, halt and report the security risk.
- If admin mode state is ambiguous, default to MVP-only.
- Mark any features without clear flags as "to be determined" and create a task in TASK.md to gate them.

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


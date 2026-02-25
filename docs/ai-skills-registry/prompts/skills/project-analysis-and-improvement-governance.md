---
name: Project Analysis & Improvement Governance
description: Deterministic cross-repo workflow for auditing architecture, UX, performance, security, accessibility, and generating structured improvement bundles.
---

# Project Analysis & Improvement Governance

**Description:**  
This governed skill defines the deterministic workflow for performing a multi-pillar audit of any repository, identifying actionable improvements, and producing a sequenced roadmap of PR bundles.  
It replaces all ad-hoc analysis prompts and ensures consistent, cross-repo audit behavior, adhering to the `GEMINI.md` standard of managing work through `ROADMAP.md` and `TASKS.md`.  

======================================================================
1. PURPOSE
======================================================================
Use this workflow to perform a structured audit across:
- Architecture  
- Data flow  
- UI/UX  
- Performance  
- Security  
- Accessibility  
- Localization (i18n)  
- Code quality  
- Style guide compliance  

This workflow does **not** modify code or task files until the review phase is complete.

======================================================================
2. TRIGGERS
======================================================================
- Request to "analyze project"
- Request to "audit repository"
- "/audit" slash command
- /web-project-analysis slash command

======================================================================
3. INPUTS
======================================================================
You MUST analyze:
- `README.md`  
- `ROADMAP.md`
- `TASKS.md`
- `BACKLOG.md` (only if present, to identify pending migrations)
- Project structure (`src`, `app`, `modules`, etc.)  
- Style guide location (if present)  
- Routing structure  
- Component architecture  

If a style guide is missing, flag this as a **Major Improvement**.

======================================================================
4. ANALYSIS PILLARS (DETERMINISTIC)
======================================================================

### Pillar 1: UI/IX & UX
Evaluate:
- Visual consistency  
- Responsiveness  
- Layout clarity  
- Interaction feedback (hover, focus, active)  
- Navigation flow  
- Component cohesion  

### Pillar 2: Code Quality
Evaluate:
- Duplication  
- Hardcoded values  
- Dead code  
- Missing abstractions  
- Inconsistent patterns  
- Type safety  

### Pillar 3: Performance
Evaluate:
- Asset optimization  
- Render bottlenecks  
- Layout shifts (CLS)  
- Lazy-loading opportunities  
- Memoization gaps  

### Pillar 4: Security
Evaluate:
- Hardcoded secrets  
- Input validation  
- Dependency risks  
- Exposure of sensitive data  
- Error message leakage  

### Pillar 5: Accessibility
Evaluate:
- ARIA roles  
- Keyboard navigation  
- Contrast  
- Semantic HTML  
- Screen reader compatibility  

### Pillar 6: Localization (i18n)
Evaluate:
- Hardcoded strings  
- Translation structure  
- Locale switching readiness  

### Pillar 7: Style Guide Compliance
Evaluate:
- Presence of a style guide  
- Required sections (Components, Styles, Typography, Layout, Forms, States)  
- Dark mode toggle  
- Pill navigation  
- Live component previews  
- Theming consistency  

If missing, this MUST be included as a **Major Improvement**.

======================================================================
5. IMPROVEMENT DISCOVERY RULES
======================================================================
You MUST:
- Identify **up to 50 improvements**  
- Ensure each is **specific to the repo**  
- Ensure none already exist in `ROADMAP.md` or `TASKS.md`  
- Provide a **clear rationale** for each  
- Categorize by pillar  
- Avoid generic tasks  
- Avoid architectural rewrites unless explicitly approved  

### Categorization Requirements
Each improvement MUST be labeled as:
- **Major Feature / Architectural Change**  
- **Minor Polish / Housekeeping Item**  

======================================================================
6. PR BUNDLING RULES (DETERMINISTIC)
======================================================================
You MUST:
1. Group improvements into logical PR bundles  
2. Keep unrelated nitpicks out of major bundles  
3. Merge related nitpicks into major bundles when appropriate  
4. Sequence bundles by Impact, Effort, and Dependency order.

### Required Bundle Types
- **Core Bundles** (major features, architecture, style guide)  
- **Micro-Bundles** (small polish tasks)  

======================================================================
7. OUTPUT REQUIREMENTS
======================================================================
Your output MUST include:
1. Architectural Summary  
2. Multi-Pillar Audit Summary  
3. Improvement List (up to 50 items, categorized, with rationale)  
4. PR Bundling & Sequence  
5. No Code Changes (analysis-only)

======================================================================
8. TASK INTEGRATION RULES
======================================================================
You MUST NOT modify `TASKS.md` until the user approves the improvement list.

After approval:
- Convert improvements into structured tasks in `TASKS.md`.
- Ensure new tasks are linked to the appropriate Phase in `ROADMAP.md`.
- Preserve deterministic formatting (Goal, Why, Files to touch, Acceptance criteria).
- Preserve model tags and category tags.
- If a legacy `BACKLOG.md` exists, move all verified improvements to `TASKS.md` and mark `BACKLOG.md` for deletion.

See `backlog-tagging-governance.md` for model and domain tagging rules.

======================================================================
9. SAFETY & CONSTRAINTS
======================================================================
You MUST:
- Follow deterministic formatting  
- Preserve user-provided structure  
- Ask for clarification if needed  
- Avoid assumptions  

You MUST NOT:
- Modify code  
- Modify roadmap/tasks prematurely  
- Invent new architectural patterns  
- Skip analysis pillars  

======================================================================
10. SELF-AUDIT REQUIREMENTS
======================================================================
Before declaring completion:
- Re-read the prompt  
- Generate a compliance checklist  
- Verify each requirement  
- Fix anything missing  
- Perform a full self-audit  

Completion is not permitted until all checks pass.

======================================================================
11. FAILURE MODE
======================================================================
- If a pillar cannot be evaluated due to missing information, note it and move on.
- If the project structure is non-standard, report findings based on visible patterns.
- Mark any critical security risks as "Immediate Action Required".

======================================================================
END OF FILE
======================================================================

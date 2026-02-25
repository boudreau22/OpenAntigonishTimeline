---
name: Project Analysis Governance
description: Deterministic cross-repo workflow for auditing architecture, UX, performance, security, accessibility, and code quality.
---

# Project Analysis Governance

**Description:**  
This skill defines the governed workflow for performing a structured, multi‑pillar analysis of any repository.  
It ensures consistent audits, improvement discovery, and architectural insight across all governed repos.

======================================================================
1. PURPOSE
======================================================================
Use this workflow to perform a deterministic audit across:
- Architecture  
- Data flow  
- UI/UX  
- Performance  
- Security  
- Accessibility  
- Localization  
- Code quality  
- Style guide compliance  

This workflow does **not** modify code.

======================================================================
2. TRIGGERS
======================================================================
- Request to "audit architecture"
- Request to "analyze project"
- Periodic repository audit task
- Pre-sprint planning analysis

======================================================================
3. INPUTS
======================================================================
- Project root directory.
- `package.json` and dependency tree.
- Core logic files and component directories.
- Registry governance on audits (`audit-rules.md`).

======================================================================
4. ANALYSIS PILLARS
======================================================================

### Pillar 1: UI/IX & UX
Evaluate:
- Visual consistency  
- Responsiveness  
- Layout clarity  
- Interaction feedback  
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
- Layout shifts  
- Lazy-loading opportunities  
- Memoization gaps  

### Pillar 4: Security
Evaluate:
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

### Pillar 6: Localization
Evaluate:
- Hardcoded strings  
- Translation structure  
- Locale switching readiness  

======================================================================
5. IMPROVEMENT DISCOVERY RULES
======================================================================
You MUST:
- Identify up to 50 improvements  
- Ensure each is specific to the repo  
- Ensure none already exist in BACKLOG.md  
- Provide rationale for each  
- Categorize by pillar  
- Avoid generic tasks  

======================================================================
6. OUTPUT REQUIREMENTS
======================================================================
Your output MUST include:
1. Architectural summary  
2. Multi-pillar audit summary  
3. Improvement list (Major vs. Minor)  
4. Logical PR bundle sequencing  

No code changes are permitted in this workflow.

======================================================================
7. SAFETY & CONSTRAINTS
======================================================================
You MUST:
- Follow deterministic formatting  
- Preserve user-provided structure  
- Ask for clarification if needed  

You MUST NOT:
- Modify code  
- Modify BACKLOG.md  
- Invent new architectural patterns  
- Skip analysis pillars  

======================================================================
8. SELF-AUDIT REQUIREMENTS
======================================================================
- Verify that all pillars were addressed in the report.
- Confirm all improvements are specific and actionable.
- Ensure the bundle sequence is logical and dependency-aware.
- Validate that no code was modified.

======================================================================
9. FAILURE MODE
======================================================================
- If information is insufficient for a pillar, mark as "insufficient data".
- If the project is too large for a single pass, identify the core scope and report findings.
- Report any blocking issues encountered during analysis.

======================================================================
END OF FILE
======================================================================

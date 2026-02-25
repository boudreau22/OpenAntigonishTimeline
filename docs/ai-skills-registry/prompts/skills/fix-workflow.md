---
name: Fix Workflow Governance
description: Deterministic rules for diagnosing and resolving bugs, regressions, routing issues, and UX inconsistencies.
---

# Fix Workflow Governance

**Description:**  
This skill defines the governed, deterministic workflow for diagnosing and resolving defects across all repositories.  
It ensures consistent debugging, verification, and self-audit before completion.

======================================================================
1. PURPOSE
======================================================================
Use this workflow when addressing:
- Bugs  
- Regressions  
- Routing issues  
- Missing components  
- Broken imports  
- UX inconsistencies  

This workflow applies to all governed repos.

======================================================================
2. TRIGGERS
======================================================================
- "Fix [issue description]"
- "Resolve regression in [module]"
- "Fix UI/UX inconsistency"
- "Debug [error message]"
- "/fix [optional query]"

======================================================================
3. INPUTS
======================================================================
- Bug report or error description.
- Relevant source code and configuration files.
- Test suites (unit, integration, or manual verification steps).
- Registry governance on refactoring and audits.

======================================================================
4. DIAGNOSTIC PROTOCOL
======================================================================
You MUST perform a full diagnostic sweep:
1. Identify all visible bugs  
2. Identify regressions  
3. Identify routing issues  
4. Identify missing or broken components  
5. Identify broken imports  
6. Identify UX inconsistencies  
7. Identify console errors or warnings  

Document findings before making changes.

======================================================================
5. FIX PROTOCOL
======================================================================
For each identified issue:
1. Apply the smallest deterministic fix  
2. Preserve architecture and design system  
3. Preserve existing patterns and naming conventions  
4. Avoid introducing new abstractions unless required  
5. Ensure no new regressions are introduced  

======================================================================
6. VERIFICATION PROTOCOL
======================================================================
After applying fixes:
1. Re-test all affected flows  
2. Validate UI/UX consistency  
3. Validate routing and navigation  
4. Validate imports and build integrity  
5. Validate no new warnings or errors appear  
6. Validate accessibility basics (focus, labels, contrast)  

======================================================================
7. SAFETY & CONSTRAINTS
======================================================================
You MUST:
- Follow architecture and design system  
- Maintain deterministic formatting  
- Preserve existing functionality  
- Ask for clarification if requirements are ambiguous  

You MUST NOT:
- Rewrite unrelated code  
- Introduce new features  
- Modify governance files  
- Skip verification steps  

======================================================================
8. SELF-AUDIT REQUIREMENTS
======================================================================
Before declaring completion:
- Re-read the prompt  
- Generate a compliance checklist  
- Verify each requirement  
- Fix anything missing  
- Perform a full self-audit  

Completion is not permitted until all checks pass.

======================================================================
9. FAILURE MODE
======================================================================
- If the root cause cannot be identified, report findings and ask for more information.
- If the fix causes regressions that cannot be immediately resolved, ROLLBACK the changes.
- Do not proceed if test results are ambiguous or contradictory.

======================================================================
END OF FILE
======================================================================

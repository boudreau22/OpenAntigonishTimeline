---
name: Refactor Governance
description: Deterministic rules for improving clarity, maintainability, and consistency without changing functionality.
---

# Refactor Governance

**Description:**  
This skill defines the governed workflow for refactoring code across all repositories.  
It ensures clarity, maintainability, and consistency while preserving functionality.

======================================================================
1. PURPOSE
======================================================================
Use this workflow when improving:
- Readability  
- Maintainability  
- Consistency with architecture  
- Naming conventions  
- Component structure  
- File organization  

Functionality must remain unchanged unless explicitly authorized.

======================================================================
2. TRIGGERS
======================================================================
- Request to "refactor [module]"
- Request to "improve [file]"
- Audit finding identifying code smell or drift
- /refactor [optional query]

======================================================================
3. INPUTS
======================================================================
- Target source files.
- Relevant architecture and design system docs.
- Registry governance on refactoring (`refactor-governance.md`).
- Existing test suites.

======================================================================
4. REFACTOR PROTOCOL
======================================================================
You MUST:
1. Improve clarity  
2. Improve maintainability  
3. Improve consistency with architecture  
4. Improve consistency with design system  
5. Remove dead code  
6. Consolidate duplication  
7. Strengthen typing  
8. Improve file structure  

======================================================================
5. PRESERVATION RULES (AUTHORITATIVE)
======================================================================
You MUST NOT:
- Change functionality  
- Introduce new features  
- Modify business logic  
- Modify financial logic  
- Modify runtime configs  
- Modify governance files  

Unless explicitly instructed.

======================================================================
6. VERIFICATION PROTOCOL
======================================================================
After refactoring:
1. Validate that functionality is unchanged  
2. Validate that UI behavior is unchanged  
3. Validate that tests still pass  
4. Validate that typing is correct  
5. Validate that imports are correct  
6. Validate that build succeeds  

======================================================================
7. SAFETY & CONSTRAINTS
======================================================================
- Always prefer non-breaking refactors.
- Refactor in small, verifiable increments.
- Do not modify files outside the intended scope.
- Maintain deterministic formatting.

======================================================================
8. SELF-AUDIT REQUIREMENTS
======================================================================
Before declaring completion:
- Re-read the prompt  
- Generate a compliance checklist  
- Verify each requirement  
- Fix anything missing  
- Perform a full self-audit  

======================================================================
9. FAILURE MODE
======================================================================
- If a refactor causes a regression that cannot be fixed within 15 minutes, ROLLBACK.
- If a file is too complex to refactor safely, report the risk and request human review.
- Stop if build or tests fail and cannot be immediately addressed.

======================================================================
END OF FILE
======================================================================

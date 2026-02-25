---
name: Prompt Obedience & Self-Audit
description: Ensures structured prompts are followed exactly and all work is self-audited before completion.
---

# Prompt Obedience & Self-Audit

**Description:**  
This skill enforces strict adherence to structured prompts and deterministic self-audit before declaring any workflow, task, or governed action complete.  
It applies across all repositories governed by the ai-skills-registry.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- strict adherence to structured prompts
- deterministic self-audit before completion
- consistent output quality across all repos
- elimination of ad-hoc or compressed workflows

======================================================================
2. TRIGGERS
======================================================================
- Any governed workflow or task completion
- Receipt of a structured prompt or pattern
- Request to "verify work" or "self-audit"
- Any multi-step agentic action

======================================================================
3. INPUTS
======================================================================
- The original user prompt or task description.
- Relevant governance skills and patterns.
- Completed code, documentation, or reports.
- Compliance checklist (generated during audit).

======================================================================
4. STRUCTURED PROMPT OBEDIENCE (AUTHORITATIVE RULE)
======================================================================
When a structured prompt, governed pattern, or system instruction is provided:

You MUST:
- Follow every step exactly as written  
- Preserve order, structure, and formatting  
- Never reinterpret, compress, or simplify requirements  
- Never skip steps, even if they appear optional  
- Never silently modify or “improve” instructions  
- Ask for clarification if any step is ambiguous  

You MUST NOT:
- Invent missing steps  
- Change the meaning of instructions  
- Substitute your own workflow  
- Assume intent beyond what is written  

Structured prompts are **authoritative** and override all defaults.

======================================================================
5. SELF-AUDIT PROTOCOL (BEFORE DECLARING COMPLETION)
======================================================================
Before marking any governed workflow complete, you MUST perform a deterministic self-audit.

### Required Self-Audit Steps

1. **Re-read the entire prompt**  
   Ensure full understanding of all requirements.

2. **Generate a compliance checklist**  
   Convert the prompt into a list of explicit requirements.

3. **Verify each requirement**  
   Confirm that every item in the checklist is satisfied.

4. **Fix anything missing**  
   No partial compliance is allowed.

5. **Perform a full self-audit**  
   Validate formatting, structure, and correctness.

6. **Only then declare completion**  
   Completion is not permitted until all checks pass.

======================================================================
6. COMPLETION RULES
======================================================================
A task, workflow, or governed action may only be declared complete when:
- All steps in the structured prompt are satisfied  
- All outputs match required formats  
- No steps are skipped or compressed  
- No assumptions were made beyond the prompt  
- The self-audit checklist is fully satisfied  

If any requirement is unmet, the task is **not complete**.

======================================================================
7. SAFETY & CONSTRAINTS
======================================================================
You MUST:
- Preserve all user-provided structure  
- Follow governance files exactly  
- Maintain deterministic formatting  
- Ask for clarification when needed  

You MUST NOT:
- Modify governance files  
- Invent new rules  
- Alter required formats  
- Skip the self-audit process  

======================================================================
8. FAILURE MODE
======================================================================
- If self-audit identifies a gap, do not report "complete". Perform the fix first.
- If a prompt remains ambiguous after clarification, document the assumption and mark as "needs human review".
- If a workflow is fundamentally broken, ROLLBACK and report the failure.

======================================================================
END OF FILE
======================================================================

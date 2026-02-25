---
name: Task Transition Manager
description: Enforces deterministic completion of tasks in TASK.md and updates to CHANGELOG.md.
---

======================================================================
1. PURPOSE
======================================================================
This skill enforces the completion workflow:
**TASK.md ([ ]) → TASK.md ([x]) → CHANGELOG.md**

It ensures:
- Tasks are accurately marked as complete in `TASK.md`.
- Completion summaries are added to `CHANGELOG.md`.
- Model tags and category tags are preserved.
- The project's verifiable state is always current.

======================================================================
2. TRIGGERS
======================================================================
Trigger this skill when:
- A task defined in `TASK.md` is completed and verified.
- A phase in `ROADMAP.md` reaches a milestone.

======================================================================
3. WORKFLOW (DETERMINISTIC)
======================================================================
When a task is completed:

1. **Mark as Complete**:
   - Change `[ ]` to `[x]` in the task header in `TASK.md`.

2. **Update CHANGELOG.md**:
   - Append a new entry under the current date in Librarian Format:
     ```
     ## [YYYY-MM-DD] — [Feature/Bundle Name]
     ### Added
     - [Task description]
     ```

3. **Preserve Tags**:
   - Ensure the `[Model Tag] [Category Tag]` are cited in the changelog entry if appropriate.

======================================================================
4. SAFETY RULES
======================================================================
You MUST:
- Only mark tasks as `[x]` if all acceptance criteria are met.
- Maintain the hyphenated model tag standards.
- Follow the Librarian Format for changelog entries.

======================================================================
5. REGISTRY AWARENESS
======================================================================
- This file is maintained in `ai-skills-registry`.
- All repos must sync this file.
- Local edits are forbidden.

======================================================================
END OF FILE
======================================================================

---
name: Changelog & Archiving Governance
description: Deterministic workflow for migrating completed work from ROADMAP.md and TASKS.md to CHANGELOG.md, and archiving legacy history to preserve token efficiency.
---

# Changelog & Archiving Governance

**Description:**  
This governed skill defines the deterministic process for archiving completed work. It ensures that `ROADMAP.md` and `TASKS.md` remain slim and focused on active work, while `CHANGELOG.md` serves as a token-efficient historical record.

======================================================================
1. PURPOSE
======================================================================
- Prevent "Big File Bloat" in `ROADMAP.md` and `TASKS.md`.
- Ensure agents do not waste tokens reading thousands of completed tasks.
- Provide a clear, dated audit trail for all major project developments.

======================================================================
2. TRIGGERS
======================================================================
- Completion of a Phase in `ROADMAP.md`.
- `TASKS.md` exceeding **20 completed items**.
- Manual request to "cleanup roadmap" or "archive completed tasks".

======================================================================
3. ARCHIVING PROTOCOL (DETERMINISTIC)
======================================================================

### Phase 1: Preparation
1. Identify all tasks in `TASKS.md` marked with `[x]`.
2. Group these tasks by their corresponding Phase from `ROADMAP.md`.
3. **Summarize:** Do NOT move the detailed task content verbatim. Convert the technical details into high-level achievement summaries (e.g., "Implemented X" instead of copying the Goal, Why, and Acceptance Criteria).

### Phase 2: Migration
1. **Append to Top:** New entries MUST be added to the top of `CHANGELOG.md`, immediately below the header.
2. **Move, Don't Copy:** Once an entry is verified in `CHANGELOG.md`, the corresponding items MUST be deleted from `TASKS.md` and `ROADMAP.md`.
3. **Phase Legend:** If a Phase is entirely completed and moved, it should be removed from `ROADMAP.md` or moved to a "Completed Phases" section at the very bottom of that file (limited to the last 2 completed phases).

### Phase 3: Archive Threshold
1. If `CHANGELOG.md` exceeds **10,000 lines** or **1 year** of history:
   - Create a new file in `docs/archives/changelog_[YEAR].md`.
   - Move all entries from that year into the archive file.
   - Leave a link at the bottom of the main `CHANGELOG.md` to the archive.

======================================================================
4. FORMATTING (LIBRARIAN STANDARD)
======================================================================
Every `CHANGELOG.md` entry MUST follow this structure:

```markdown
## [YYYY-MM-DD] — [Bundle/Phase Name]
**Summary:**
Concise 1-2 sentence description of the value delivered.

### Added
- Feature A
- Component B

### Changed
- Refactored X for performance
- Updated Y governance

### Fixed
- Regression in Z
```

======================================================================
5. TOKEN EFFICIENCY RULES
======================================================================
- **Short Summaries:** Do not list every single file touched in the changelog; focus on user-facing or architectural value.
- **Incremental Reading:** Agents should only read the first 100 lines of `CHANGELOG.md` unless specifically asked to perform a deep historical audit.

======================================================================
6. SAFETY & CONSTRAINTS
======================================================================
- **NEVER** delete uncompleted tasks `[ ]`.
- **NEVER** archive tasks without a dated entry in `CHANGELOG.md`.
- **ALWAYS** verify the migration with the user before final deletion from `TASKS.md`.

======================================================================
END OF FILE
======================================================================

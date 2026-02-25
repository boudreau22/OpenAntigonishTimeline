# Skill: Multi-Project Gap Analysis (Batch File Audit)

======================================================================
1. PURPOSE
======================================================================
Perform a deterministic, rate-limited, multi-project audit to identify “Gold Standard” UI/UX implementations across multiple repositories and produce an upgrade specification.

======================================================================
2. TRIGGERS
======================================================================
- The agent is asked to compare implementations across multiple project folders.
- The agent is asked to identify reusable UI/UX patterns.
- The agent is asked to generate an upgrade specification.

======================================================================
3. INPUTS
======================================================================
- A list of project directories.
- A set of filename patterns to search for (e.g., Toast, Clip, Error, Valid, Load).

======================================================================
4. SAFETY & CONSTRAINTS
======================================================================
- Hard rate limit: 5 requests per minute.
- Minimize tool calls.
- Do not use `read_file` on individual files.
- Use terminal + `cat` to batch-read multiple files at once.
- Maximum of 2 batch reads.
- Do not modify application code.
- Only output `UPGRADE_SPEC.md`.

======================================================================
5. WORKFLOW
======================================================================

### Phase 1 — Discovery & Batch Extraction

#### Step 1: Locate Files (Single Terminal Call)
Run a `find` command over the provided project directories to locate relevant files matching patterns like `*Toast*`, `*Clip*`, `*Error*`, `*Valid*`, `*Load*`, excluding `node_modules`, `dist`, and `build`, and limit results (e.g., `head -n 20`).

Select 3–5 of the most promising files based on naming and project maturity.

#### Step 2: Batch Inspection (Single Terminal Call)
Use a single `cat` command to read all selected files at once (e.g., `cat <file1> <file2> <file3> ...`).

If the information is insufficient, perform one additional batch read with a new set of files. Never exceed 2 total batch reads.

---

### Phase 2 — Comparative Gap Analysis

#### Identify the Gold Standard
Determine which file demonstrates the most modern, reusable, or robust implementation.

Consider:
- Accessibility
- Strong typing
- Dependency usage
- Modularity and reusability

#### Identify Targets
List all other project files that are missing equivalent functionality or are clearly inferior in robustness, accessibility, or maintainability.

---

### Phase 3 — Output

Generate a file named `UPGRADE_SPEC.md` in the root directory.

For every gap identified, use this format:

- Feature Name: short descriptive name (e.g., `Copy-to-Clipboard on Error`).
- Gold Standard: full path to the best implementation.
- Targets: list of file paths in other projects needing this upgrade.
- Technical Implementation: specific logic, patterns, and snippets required to port the feature.
- Notes: if information is missing, explicitly write `To Be Determined` instead of running extra queries.

======================================================================
6. SELF-AUDIT REQUIREMENTS
======================================================================
- Verify that the rate limit was respected during file discovery and inspection.
- Confirm that the "Gold Standard" implementation is clearly identified with a full path.
- Ensure all target projects needing the upgrade are listed.
- Validate that the output `UPGRADE_SPEC.md` follows the required format.

======================================================================
7. FAILURE MODE
======================================================================
If insufficient data is available:
- Do not run additional queries that might violate rate limits.
- Mark missing sections or details as `To Be Determined`.

======================================================================
END OF FILE
======================================================================

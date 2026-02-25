# Skill: Management Infrastructure Audit (Global Sync)

======================================================================
1. PURPOSE
======================================================================
Perform a deterministic, multi-project audit of documentation and management infrastructure to ensure all projects maintain consistent professional standards. Produce a unified documentation gap analysis and update `UPGRADE_SPEC.md` accordingly.

======================================================================
2. TRIGGERS
======================================================================
- The agent is asked to audit documentation across multiple projects.
- The agent is asked to ensure management files are consistent across repositories.
- The agent is asked to identify missing or outdated documentation.
- The agent is asked to update `UPGRADE_SPEC.md` with documentation-related findings.

======================================================================
3. INPUTS
======================================================================
- A list of project directories.
- A set of standard management files (e.g., `README.md`, `ARCHITECTURE.md`, `backlog.md`, `CHANGELOG.md`).

======================================================================
4. SAFETY & CONSTRAINTS
======================================================================
- Minimize tool calls.
- Use terminal commands to list files; avoid reading individual files unless batching.
- Do not modify application code.
- Only update `UPGRADE_SPEC.md`.
- If information is missing, mark it as `To Be Determined`.

======================================================================
5. WORKFLOW
======================================================================

### Phase 1 — Inventory

#### Step 1: List Documentation Files
For each project directory, list documentation and management files (preferably within the top 1–2 directory levels), focusing on files such as:
- `README.md`
- `ARCHITECTURE.md`
- `backlog.md`
- `CHANGELOG.md`
- Other `.md` files that appear to be management or documentation related.

Record which files exist for each project.

---

### Phase 2 — Gap Analysis

#### Step 2: Identify Mature Project Baselines
Use mature projects (e.g., `familyWealthSystem`, `openantigonishAI`) as baselines.

Determine for these baselines:
- Which standard files they contain.
- Which structural elements they include (e.g., headings, sections, tables, diagrams).

#### Step 3: Identify Missing Files
For each project:
- Compare its documentation inventory to the baseline.
- Identify missing standard files (e.g., no `ARCHITECTURE.md`, no `backlog.md`).
- Note any obviously incomplete or placeholder files.

---

### Phase 3 — Quality Check

#### Step 4: Structural Comparison (Optional, Single Batch)
If needed for quality comparison, batch-read key documentation files (e.g., multiple `ARCHITECTURE.md` files) using a single terminal `cat` call.

Evaluate:
- Heading structure and hierarchy.
- Level of detail and clarity.
- Presence of diagrams, tables, or structured sections.
- Consistency of terminology and concepts across projects.

If details cannot be fully assessed without additional reads, mark those aspects as `To Be Determined` rather than issuing more tool calls.

---

### Phase 4 — Output

Update (or create, if necessary) a section in `UPGRADE_SPEC.md` with the title:

`## Documentation & Management Sync`

For each project, include:

- Project: project name or path.
- Missing Files:
  - List each missing or clearly incomplete standard file.
- Quality Notes:
  - Observations about structure, completeness, and clarity of existing documentation.
- Recommended Template Source:
  - Path to the best-performing version of each file type (e.g., `familyWealthSystem/docs/ARCHITECTURE.md`).
- To Be Determined:
  - Items requiring further review or additional information.

======================================================================
6. SELF-AUDIT REQUIREMENTS
======================================================================
- Verify that the documentation inventory for each repo is recorded.
- Confirm that the baseline for mature projects is clearly established.
- Ensure all missing or incomplete files are explicitly listed in the output.
- Validate that `UPGRADE_SPEC.md` has the correct section heading and formatted entries.

======================================================================
7. FAILURE MODE
======================================================================
If the audit cannot be fully completed due to missing data or limited access:
- Do not run additional queries beyond the defined constraints.
- Clearly mark incomplete sections or unknowns as `To Be Determined`.

# drift-detection.md — Skill: Active Governance Drift Detection

Authoritative Source: Maintained in `ai-skills-registry`.
All repos must sync this file. Local edits are forbidden.

This skill actively uses the Governance Drift Detection Pattern to identify and report discrepancies between local governance files and the authoritative registry.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- local governance files adhere strictly to the registry standards
- unauthorized local modifications are detected immediately
- the repository remains compliant with ecosystem-wide rules
- drift reports are generated deterministically

======================================================================
2. TRIGGERS
======================================================================
- "detect drift"
- "check for governance violations"
- "verify compliance"
- "run drift detector"

======================================================================
3. MODEL SELECTION (MANDATORY)
======================================================================
Drift detection requires precise file comparison and strict adherence to the pattern.

Use:
- **[Gemini-3.1-Pro-(High)]** (Primary analysis & reporting)

NEVER use:
- [Gemini-3.1-Pro-(Low)] (lacks precision for diffs)
- [Qwen] (insufficient reasoning for governance)

======================================================================
4. DETECTION STEPS (MANDATORY)
======================================================================
Agents MUST execute the drift detection workflow defined in `prompts/patterns/governance-drift-detector.md`.

### 4.1 Load the Pattern
- Read `prompts/patterns/governance-drift-detector.md` to load the detection logic.
- Read `SYNC_PROTOCOL.md` (or equivalent) to identify the authoritative file list.

### 4.2 Execute Comparison (Mentally or via Script)
- Compare each authoritative file against its local counterpart.
- Identify:
  - **IDENTICAL**: Content matches exactly.
  - **DRIFTED**: Content differs (whitespace differences may be ignored if semantic meaning is identical, but byte-for-byte is preferred).
  - **MISSING**: File exists in registry list but not locally.
  - **EXTRA**: File exists in governance folders but is not in the registry list.

### 4.3 Analyze Drift Impact
- For DRIFTED files, determine if the change is a critical violation (e.g., changed rules) or a minor formatting issue.
- **CRITICAL**: Changes to `GEMINI.md`, `AGENT_ROLES.md`, or `tool-use.md`.

======================================================================
5. REPORTING
======================================================================
Generate a report using the **Drift Report Format** defined in `prompts/patterns/governance-drift-detector.md`.

Example (Abbreviated):
```
=== GOVERNANCE DRIFT REPORT ===
IDENTICAL: ...
DRIFTED: prompts/system/GEMINI.md
MISSING: ...
EXTRA: ...
RECOMMENDED ACTION: Revert local changes to GEMINI.md.
```

======================================================================
6. REGISTRY AWARENESS
======================================================================
- This file is maintained in `ai-skills-registry`.
- All repos must sync this file.
- Local edits are forbidden.
- Agents must treat this file as authoritative.

======================================================================
END OF FILE
======================================================================

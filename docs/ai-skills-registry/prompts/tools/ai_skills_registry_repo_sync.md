SYNC_MODE: EXECUTE

Task:
Perform a registry sync using the ai-skills-registry.

Rules:
- THE NEW CANONICAL TARGET: All synced files MUST be placed in `<repo-root>/docs/ai-skills-registry/`.
- Create the `docs/ai-skills-registry/` directory if it does not exist.
- Do NOT scan folders outside the paths listed in REPO_MANIFEST.md.
- Do NOT rewrite any governance files except those listed in SYNC_PROTOCOL.md Section 2.
- Do NOT create missing repositories.
- Skip any repo where sync: false.
- Skip any repo whose path does not exist.
- Overwrite files exactly with the versions from ai-skills-registry, preserving their relative internal structure within the `docs/ai-skills-registry/` folder.
- You MUST include `prompts/system/GEMINI.md`, all skills in `prompts/skills/`, and all tools in `prompts/tools/`.
- Do NOT modify, reformat, or interpret content.
- Output a summary only.

Inputs:
- Registry root: C:/Users/andre/OneDrive/Documents/GitHub/ai-skills-registry
- Read: docs/SYNC_PROTOCOL.md
- Read: docs/REPO_MANIFEST.md

Begin the sync now.
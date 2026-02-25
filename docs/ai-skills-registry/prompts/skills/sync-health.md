# sync-health.md — Skill: Registry Sync Health Check

Authoritative Source: Maintained in `ai-skills-registry`.
All repos must sync this file. Local edits are forbidden.

This skill defines the process for verifying the health of the synchronization between the local repository and the central AI Skills Registry.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- the local repository is correctly connected to the registry
- synchronization mechanisms are functional
- immediate feedback on sync status is available
- no "silent failures" in governance updates occur

======================================================================
2. TRIGGERS
======================================================================
- "check sync health"
- "verify registry connection"
- "debug sync issues"
- "post-sync validation"

======================================================================
3. MODEL SELECTION (MANDATORY)
======================================================================
Health checks require precise validation of file states and configurations.

Use:
- **[Jules-AI]** (Primary execution)
- **[Gemini-3.1-Pro-(High)]** (Analysis and reporting)

NEVER use:
- [Gemini-3.1-Pro-(Low)]
- [Claude-Sonnet-4.6]

======================================================================
4. HEALTH CHECK STEPS (MANDATORY)
======================================================================
Agents MUST perform the following checks in order:

### 4.1 Verify Configuration Presence
- Check for the existence of `configs/registry.yaml` (or equivalent config).
- Verify `SYNC_PROTOCOL.md` exists in the root or `docs/`.

### 4.2 check Last Sync Timestamp
- Locate the `.registry_sync` or `LAST_SYNC` file (if implemented).
- Verify the timestamp is within the expected freshness window (e.g., < 24 hours).

### 4.3 Verify Key Governance Files
- Randomly sample 3 critical governance files (e.g., `prompts/system/GEMINI.md`, `TASK.md`, `ROADMAP.md`).
- Verify they are present and not empty.
- (Optional) Compute checksums if a manifest is available.

### 4.4 Simulate Drift Detection
- Run a lightweight drift detection on `prompts/skills/sync-health.md` (this file).
- Confirm it matches the registry version (self-check).

======================================================================
5. OUTPUT FORMAT
======================================================================
Report the health status using the following structure:

```
=== REGISTRY SYNC HEALTH REPORT ===

STATUS: [HEALTHY | DEGRADED | CRITICAL]
TIMESTAMP: [Current Date/Time]

CHECKS:
[PASS] Configuration Presence
[PASS] Last Sync Timestamp (Last sync: 2 hours ago)
[PASS] Key Governance Files (Checked: GEMINI.md, TASK.md)
[PASS] Self-Check (sync-health.md matches registry)

ISSUES:
- None

RECOMMENDED ACTION:
- None (or "Run registry_sync.sh immediately")
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

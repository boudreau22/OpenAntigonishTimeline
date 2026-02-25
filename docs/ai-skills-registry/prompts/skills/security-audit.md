# security-audit.md — Skill: Advanced Security Auditing

Authoritative Source: Maintained in `ai-skills-registry`.
All repos must sync this file. Local edits are forbidden.

This skill defines the canonical process for conducting deep security audits across the ecosystem. It is designed to identify vulnerabilities, ensure compliance, and mitigate risks proactively.

======================================================================
1. PURPOSE
======================================================================
To ensure:
- proactive identification of security vulnerabilities (OWASP Top 10)
- consistent security review process
- detection of hardcoded secrets and credentials
- verification of dependency safety
- strict adherence to permission and authentication models

======================================================================
2. TRIGGERS
======================================================================
- "perform a security audit"
- "audit security"
- "check for vulnerabilities"
- "scan for secrets"
- "review auth logic"

======================================================================
3. MODEL SELECTION (MANDATORY)
======================================================================
Security auditing is a high-stakes task requiring deep reasoning and attention to detail.

Use:
- **[Gemini-3.1-Pro-(High)]**

Alternative (for architectural security reviews):
- **[Claude-Opus-4.6]**

NEVER use:
- [Gemini-3.1-Pro-(Low)]
- [Qwen]

======================================================================
4. AUDIT CHECKLIST (MANDATORY)
======================================================================
Agents MUST verify the following categories during a security audit:

### 4.1 Secrets & Credentials
- Scan for API keys, passwords, and tokens in code.
- Verify that `.env` is in `.gitignore`.
- Ensure no sensitive data is logged.

### 4.2 Dependencies
- Check `package.json` / `requirements.txt` for known vulnerable packages.
- Verify strict versioning is used where appropriate.

### 4.3 OWASP Top 10 Compliance
- **Injection:** Check SQL queries and command execution.
- **Broken Auth:** Verify session management and password handling.
- **Sensitive Data Exposure:** Ensure encryption in transit and at rest.
- **Broken Access Control:** Verify role-based access checks.
- **XSS:** Check for unsanitized user inputs in UI rendering.

### 4.4 Permissions & Roles
- Verify that admin routes are properly protected.
- Ensure "least privilege" principle is applied.

### 4.5 Data Validation
- Verify all inputs are validated and sanitized.
- Check for type safety (TypeScript/MyPy).

======================================================================
5. OUTPUT FORMAT
======================================================================
When issues are found, generate tasks in `TASK.md` using the following tags:

- **Model Tag:** [Gemini-3.1-Pro-(High)]
- **Category Tag:** [security]
- **Role Tag:** [jules-ai] (only if fix is deterministic) or [antigravity] (if planning is needed)

Example:
```
[Gemini-3.1-Pro-(High)] [security] [jules-ai]
Rotate exposed API key in `config.py` and move to environment variable.
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

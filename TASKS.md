# Tasks — Open Antigonish Civic Project System

This file tracks granular tasks for the project.

# PHASE 1 — Roadmap Refinement

- [x] `[Gemini-1.5-Pro]` `[Planning]` **Identify next evolution of Transparency Page**
  - **Goal:** Define Phase 8 goals and identify missing community feedback loops to ensure project growth.
  - **Why:** Keep the project growing and relevant after initial launch, ensuring community needs are met.
  - **Files to touch:** `ROADMAP.md`
  - **Acceptance criteria:**
    - Phase 8 goals are clearly defined in ROADMAP.md.
    - Missing community feedback loops are identified and documented.
  - **Do not:** Start implementing new features before planning is complete.

# PHASE 2 — Core Engine & Integration

- [x] `[Gemini-1.5-Pro]` `[Backend]` **Implement Cross-Project Resource Conflict Detection**
  - **Goal:** Detect when shared resources (e.g., specific crews or equipment) are assigned to overlapping tasks in different projects.
  - **Why:** To prevent scheduling conflicts where resources are double-booked, ensuring realistic project timelines.
  - **Files to touch:** `src/lib/scheduler.js`, `src/pages/api/schedule/recalculate.js`
  - **Acceptance criteria:**
    - The scheduler identifies overlapping tasks for the same resource.
    - Conflicts are flagged in the database or API response.
  - **Do not:** Hardcode resource availability; it should be dynamic based on assignments.

- [x] `[Gemini-1.5-Pro]` `[Integration]` **Automate Shapely Data Sync**
  - **Goal:** Replace the manual `tools/sync_shapely.js` script with an automated scheduled job or webhook listener.
  - **Why:** To ensure the issue backlog is always up-to-date with community ideas without manual intervention.
  - **Files to touch:** `src/pages/api/webhooks/shapely.js` (new), `tools/sync_shapely.js` (refactor)
  - **Acceptance criteria:**
    - New ideas in Shapely appear in the `issues` table within 1 hour (or real-time).
    - Upvote counts are synchronized daily.
  - **Do not:** Expose the webhook without proper authentication/verification.

- [x] `[Gemini-1.5-Pro]` `[Backend]` **Integrate Weather Data into Constraints**
  - **Goal:** Automatically create or update constraints based on weather forecasts for outdoor tasks.
  - **Why:** To make project schedules resilient to real-world conditions and avoid delays due to unforeseen weather.
  - **Files to touch:** `src/lib/weather.js` (new), `src/lib/scheduler.js`, `src/pages/api/constraints.js`
  - **Acceptance criteria:**
    - A scheduled job fetches weather forecasts.
    - "Weather" type constraints are automatically created for tasks during adverse conditions.
    - The scheduler adjusts task start dates based on these constraints.
  - **Do not:** Overwrite manually set weather constraints without user confirmation.

# Open Antigonish — Project Roadmap

This document tracks the high-level phases of the project. Granular tasks are tracked in `TASKS.md`.

For architectural details, schema, and API documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## ✅ Phase 1: Roadmap Refinement
**Goal:** Define Phase 8 goals and identify missing community feedback loops to ensure project growth.
**Status:** Completed.

- Identified next evolution of Transparency Page.
- Defined Phase 8 goals.

## ✅ Phase 2: Core Engine & Integration
**Goal:** Enhance the scheduling engine with conflict detection, external data sync, and weather awareness.
**Status:** Completed.

- **Cross-Project Resource Conflict Detection:** The scheduler now detects when shared resources are double-booked across active projects.
- **Automated Shapely Data Sync:** Webhook integration to sync community ideas from Shapely to the `issues` table.
- **Weather Integration:** Automated generation of constraints based on weather forecasts for outdoor tasks.

---

## 🔮 Phase 8: Community Ecosystem

**Goal:** Establish a comprehensive feedback loop between the Town and its residents.

### Key Initiatives
1. **Digital Town Hall:** Establish a formal platform for real-time feedback on active projects.
2. **Integrated Reporting:** Link "Report an Issue" directly to the maintenance schedule.
3. **Participatory Budgeting:** Enable citizens to vote on proposed projects for future phases.

### Missing Feedback Loops to Address
- **Post-Project Review:** Residents should be able to rate the outcome of a completed project.
- **Constraint Reporting:** Residents should be able to report constraints (e.g., "Road blocked", "Flooding") that might not be in the system yet.
- **Project Notifications:** Residents should be able to subscribe to updates for specific projects via email or SMS.

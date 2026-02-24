# BACKLOG — Open Antigonish Civic Project System

This backlog is structured into phases and formatted for direct use by Jules or other agents.  
Each task includes model preference, domain, description, and rationale.

---

# PHASE 1 — Timeline Modernization (Standalone Repo)

### Timeline Component Migration
- [x] `[Gemini 3 Pro (High)]` `[Frontend]` **Create Astro project scaffold**
  - Initialize Astro with React support
  - Add TailwindCSS
  - Set up `/public` and `/src` structure
  - **Why:** Foundation for the modern timeline component

- [x] `[Gemini 3 Pro (High)]` `[Frontend]` **Implement <Timeline /> React component**
  - Render phases + events from JSON
  - Add zoom, pan, hover interactions
  - Use D3.js or Vis.js
  - **Why:** Core visualization engine

- [x] `[Gemini 3 Flash]` `[Frontend]` **Create /embed build output**
  - Lightweight version for OpenAntigonish
  - No navigation, minimal chrome
  - **Why:** Allows embedding into other sites

- [x] `[Gemini 3 Flash]` `[Data]` **Refactor town_projects.json into schema**
  - Add validation rules
  - Add schema file
  - **Why:** Ensures consistent data for scheduling engine

---

# PHASE 2 — Backend Foundations (Supabase)

### Database Setup
- [x] `[Gemini 3 Pro (High)]` `[Backend]` **Create Supabase project + schema**
  - Tables: issues, projects, tasks, constraints, staff
  - Add RLS policies
  - **Why:** Core backend for unified system

- [x] `[Gemini 3 Flash]` `[Backend]` **Add triggers for priority scoring**
  - Auto-update priority_score on upvote
  - **Why:** Keeps ranking dynamic

### API Layer
- [x] `[Gemini 3 Pro]` `[Backend]` **Implement REST endpoints**
  - /issues, /projects, /tasks, /constraints
  - /schedule/recalculate
  - **Why:** Enables frontend + engine integration

---

# PHASE 3 — Scheduling Engine

### Constraint Solver
- [x] `[Gemini 3 Pro (High)]` `[Backend]` **Implement CPM + constraint solver**
  - Build dependency graph
  - Compute earliest/latest start
  - Detect conflicts
  - **Why:** Automates scheduling

- [x] `[Gemini 3 Flash]` `[Backend]` **Add constraint ingestion**
  - Materials, crews, weather, tenders
  - **Why:** Real-world scheduling inputs

### Engine Integration
- [x] `[Gemini 3 Pro]` `[Backend]` **Implement /schedule/recalculate**
  - Recompute all timelines
  - Return updated project states
  - **Why:** Keeps system current

---

# PHASE 4 — Staff Dashboard

### Core UI
- [x] `[Gemini 3 Pro]` `[Frontend]` **Build IssueTable**
  - Sorting, filtering, search
  - Status indicators
  - **Why:** Staff need operational clarity

- [x] `[Gemini 3 Pro]` `[Frontend]` **Build TaskList + ConstraintEditor**
  - Add/edit tasks
  - Add/edit constraints
  - **Why:** Enables scheduling engine inputs

- [x] `[Gemini 3 Flash]` `[Frontend]` **Build ScheduleSuggestions panel**
  - Show idle crew opportunities
  - Show conflicts
  - **Why:** Helps staff make decisions

---

# PHASE 5 — Public Transparency Page (OpenAntigonish)

### Public-Facing Components
- [x] `[Gemini 3 Flash]` `[Frontend]` **Embed timeline component**
  - Use /embed version
  - **Why:** Public visibility

- [x] `[Gemini 3 Flash]` `[Frontend]` **Add PublicIssueList**
  - Show operational issues + statuses
  - **Why:** Transparency for residents

- [x] `[Gemini 3 Flash]` `[Frontend]` **Add TopIdeasFromShapely**
  - Show upvoted ideas
  - **Why:** Community engagement

- [x] `[Gemini 3 Flash]` `[Frontend]` **Add RecentlyCompleted feed**
  - Pull from completed tasks
  - **Why:** Celebrate progress

---

# PHASE 6 — Shapely Integration

### Sync Layer
- [x] `[Gemini 3 Pro]` `[Backend]` **Implement Shapely → Supabase sync worker**
  - Sync ideas
  - Sync upvotes
  - Map to issues table
  - **Why:** Unified pipeline

### Conversion Tools
- [x] `[Gemini 3 Flash]` `[Frontend]` **Add “Convert to Project Task” button**
  - Staff can turn ideas into tasks
  - **Why:** Bridges ideas → action

---

# PHASE 7 — Final Polish & Governance

### Documentation
- [x] `[Gemini 3 Flash]` `[Docs]` **Write contributor guide**
  - Repo structure
  - Coding standards
  - Deployment steps
  - **Why:** Smooth onboarding

- [x] `[Gemini 3 Flash]` `[Docs]` **Write governance manifest**
  - Decision-making rules
  - Data ownership
  - Transparency commitments
  - **Why:** Long-term sustainability

---

# END OF BACKLOG

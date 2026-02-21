# Open Antigonish — Project Timeline, Scheduling Engine & Integration Roadmap

This document consolidates the full architectural plan for the Town of Antigonish’s unified civic project management system, including:

- The scheduling engine concept  
- The prompt for Jules  
- The database schema  
- The API endpoints  
- The UI component structure  
- The integration logic  
- The Open Antigonish page layout  
- The architectural diagram  
- The contributor workflow  

All in one place, clean and modular.

---

# 🧠 PART 1 — Automated Scheduling Engine

The scheduling engine is the backbone of the system. It enables automated planning, dynamic rescheduling, and transparent public timelines.

## What the Engine Must Do

- Accept a project with tasks  
- Understand task dependencies  
- Understand constraints (materials, crews, weather, approvals, tenders)  
- Auto‑generate a schedule  
- Auto‑update when constraints change  
- Reflow other projects accordingly  
- Suggest opportunities (e.g., “Crew A is idle → start Project C early”)  

This is a classic **constraint‑based scheduling engine**.

---

## How It Works (Simple Version)

Each project is composed of tasks:

| Task             | Duration | Depends On      | Required Resources        | Earliest Start | Latest Start |
|------------------|----------|-----------------|----------------------------|----------------|--------------|
| Tender           | 14 days  | None            | Staff                      | May 1          | May 10       |
| Award Contract   | 7 days   | Tender          | Staff                      | May 15         | May 20       |
| Construction     | 60 days  | Award Contract  | Crew A, Materials          | June 1         | June 10      |

The engine runs a **Critical Path Method (CPM)** or **Constraint Satisfaction Solver**.

### When a constraint changes:

- “Kells won’t have wood until June 20”  
- “Crew B unavailable July 1–15”  
- “Tender delayed by 10 days”  

The engine recalculates:

- New start dates  
- New end dates  
- New critical path  
- Idle periods  
- Opportunities to shift other projects  

### It can run automatically when:

- Staff update a task  
- A supplier updates a constraint  
- Weather API triggers a delay  
- A contractor updates availability  

---

# 🧱 PART 2 — Prompt for Jules (Timeline Repo Modernization)

```
You are a senior full‑stack engineer. Modernize this timeline visualization repo using the following requirements:

1. Replace the existing HTML index with a modern component-based architecture.
2. Use the following tech stack:
   - Astro for static site generation
   - React components
   - D3.js or Vis.js for the timeline visualization
   - TailwindCSS for styling
3. Maintain the existing data structure but refactor it into a clean JSON schema.
4. Create:
   - A reusable <Timeline /> component
   - A public /embed version for external sites
   - A responsive layout with zoom, pan, and hover details
5. Improve visuals:
   - Color-coded categories
   - Milestones
   - Completed vs. upcoming vs. delayed indicators
6. Output:
   - A clean repo structure
   - A build pipeline
   - A dist folder ready for embedding
```

---

# 🗄️ PART 3 — Database Schema (Supabase/Postgres)

## `issues`
- id (uuid)  
- title (text)  
- description (text)  
- category (text)  
- created_at (timestamp)  
- status (enum: new, in_review, assigned, in_progress, completed, deferred)  
- priority_score (integer)  
- upvotes (integer)  
- assigned_to (uuid → staff.id)  
- shapely_id (uuid, nullable)  

## `projects`
- id (uuid)  
- name (text)  
- description (text)  
- status (enum)  
- start_date (date)  
- end_date (date)  
- updated_at (timestamp)  

## `tasks`
- id (uuid)  
- project_id (uuid → projects.id)  
- name (text)  
- duration_days (integer)  
- depends_on (uuid → tasks.id, nullable)  
- required_resources (jsonb)  
- earliest_start (date)  
- latest_start (date)  
- actual_start (date, nullable)  
- actual_end (date, nullable)  
- status (enum)  

## `constraints`
- id (uuid)  
- task_id (uuid → tasks.id)  
- type (enum: material, crew, weather, approval, tender)  
- description (text)  
- available_date (date)  
- created_at (timestamp)  

## `staff`
- id (uuid)  
- name (text)  
- role (text)  
- email (text)  

---

# 🔌 PART 4 — API Endpoints

## Issue Reporting
- POST /issues  
- GET /issues  
- PATCH /issues/:id  
- POST /issues/:id/upvote  

## Project Management
- GET /projects  
- POST /projects  
- PATCH /projects/:id  

## Tasks
- GET /projects/:id/tasks  
- POST /projects/:id/tasks  
- PATCH /tasks/:id  

## Constraints
- POST /tasks/:id/constraints  
- GET /tasks/:id/constraints  

## Scheduling Engine
- POST /schedule/recalculate  
  - Recomputes all project timelines  
  - Returns updated start/end dates  
  - Flags conflicts  
  - Suggests opportunities  

---

# 🎨 PART 5 — UI Component Structure

## Staff Dashboard
- `<IssueTable />`  
- `<IssueDetailPanel />`  
- `<TaskList />`  
- `<ProjectTimeline />`  
- `<ConstraintEditor />`  
- `<ScheduleSuggestions />`  

## Public Dashboard
- `<PublicIssueList />`  
- `<PublicTimeline />`  
- `<TopIdeasFromShapely />`  
- `<RecentlyCompleted />`  

---

# 🔗 PART 6 — Integration Logic (Shapely → Dashboard → Timeline)

### 1. Shapely Idea Submitted  
→ Stored in Shapely  
→ Synced into `issues` table  
→ Upvotes synced nightly or in real time  

### 2. Staff Converts Idea → Project Task  
→ Creates a new project or task  
→ Links `shapely_id`  

### 3. Scheduling Engine Runs  
→ Updates timeline  
→ Updates public view  

### 4. Public Sees  
- Where their idea sits  
- How it affects priorities  
- When it’s scheduled  
- When it’s completed  

---

# 🌐 PART 7 — Open Antigonish Page Layout

```
-----------------------------------------
|   Town Projects & Community Priorities |
-----------------------------------------

[ Timeline Visualization ]

[ Current Projects ]
- In Progress
- Upcoming
- Delayed
- Completed

[ Public Issue Dashboard ]
- Search
- Filter by district
- Filter by category
- Status indicators

[ Top Upvoted Ideas (Shapely) ]

[ Submit an Issue ]
[ Submit an Idea ]
```

---

# 🏗️ PART 8 — Architectural Diagram (Text-Based)

```
Shapely (Ideas + Upvotes)
            |
            v
      Issue Intake
            |
            v
   Staff Dashboard (Admin)
            |
            v
   Scheduling Engine <---- Constraints (materials, crews, weather)
            |
            v
   Project Timelines
            |
            v
   Public Transparency Page
```

---

# 👥 PART 9 — Contributor Workflow

## Staff
- Update statuses  
- Add constraints  
- Assign tasks  
- Approve schedules  

## Engine
- Recalculates timelines  
- Suggests next steps  
- Detects conflicts  
- Recommends reassignments  

## Public
- Submit issues  
- Upvote ideas  
- Track progress  

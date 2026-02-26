# Town of Antigonish — Capital Projects Timeline

An interactive, data‑driven visualization of municipal capital projects in the Town of Antigonish.  
This timeline highlights project phases, milestones, delays, and completion dates for initiatives such as Bay Street, West Street, and the Active Transportation Trail.

## 🚀 Overview

This repository provides:
- A structured dataset of municipal projects (`src/data/town_projects.json`)
- A modern, interactive timeline visualization
- A foundation for integrating automated scheduling, constraints, and public transparency tools in future versions

The goal is to make civic project progress **clear, accessible, and transparent** for residents, staff, and council.

---

## 📁 Project Structure

- **`town_projects.json`** — Source data for all projects  
- **`index.html`** — Entry point for the current visualization  
- **`src/`** — Source code for the Astro/React application
- **`tools/`** — Utility scripts (data validation, sync)
- **`tests/`** — Tests

For detailed architectural documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).
For the project roadmap, see [ROADMAP.md](ROADMAP.md).

---

## 🖥️ Running the Visualization Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open:**
   Navigate to `http://localhost:4321`.

---

## 🌐 Open Antigonish Page Layout

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

## 👥 Contributor Workflow

### Staff
- Update statuses
- Add constraints
- Assign tasks
- Approve schedules

### Engine
- Recalculates timelines
- Suggests next steps
- Detects conflicts
- Recommends reassignments

### Public
- Submit issues
- Upvote ideas
- Track progress

---

## ✔️ Validating the Data

Run the validation script to ensure the JSON file is well‑formed:

```bash
npm run validate
# or
node tools/validate_data.js
```

---

## 📄 License

MIT License — open for community use, adaptation, and contribution.

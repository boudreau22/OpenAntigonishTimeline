# Town of Antigonish — Capital Projects Timeline

An interactive, data‑driven visualization of municipal capital projects in the Town of Antigonish.  
This timeline highlights project phases, milestones, delays, and completion dates for initiatives such as Bay Street, West Street, and the Active Transportation Trail.

## Project Structure

- `public/`: Contains the static HTML and assets.
- `src/`: Contains source code and data for future development (Astro/React).
  - `data/`: Contains `town_projects.json`.
- `tools/`: Contains utility scripts like data validation.
- `tests/`: Contains tests.

## Data

The data is stored in `src/data/town_projects.json`. Each project includes:
- **title**: The name of the project.
- **color**: The color code used for visualization.
- **phases**: A list of project phases (ranges).
- **events**: A list of specific events (moments).
---

## 🚀 Overview

This repository provides:

- A structured dataset of municipal projects  
- A modern, interactive timeline visualization  
- A foundation for integrating automated scheduling, constraints, and public transparency tools in future versions  

1. Ensure you have Python installed.
2. Run the following command in the project directory (root):
   ```bash
   python3 -m http.server
   ```
3. Open your browser and navigate to `http://localhost:8000/public/index.html`.
The goal is to make civic project progress **clear, accessible, and transparent** for residents, staff, and council.

---

## 📁 Project Structure

- **`town_projects.json`** — Source data for all projects  
- **`index.html`** — Entry point for the current visualization  
- **`validate_data.py`** — Script to verify data integrity  
- **`/assets`** — Styles, scripts, and supporting files  

Future versions will migrate to a component‑based architecture (Astro + React + D3/Vis.js) with an embeddable `<Timeline />` component.

---

## 📊 Data Format

Each project in `town_projects.json` includes:

- **title** — Project name  
- **color** — Hex color used in the visualization  
- **phases** — A list of date ranges representing project phases  
- **events** — A list of specific milestone dates  

Example:

```json
{
  "title": "Bay Street Reconstruction",
  "color": "#4A90E2",
  "phases": [
    { "start": "2024-05-01", "end": "2024-07-15" }
  ],
  "events": [
    { "date": "2024-06-10", "label": "Tender Awarded" }
  ]
}
```

---

## 🖥️ Running the Visualization Locally

Modern browsers block `fetch()` calls to local files, so you must run a local web server.

### 1. Ensure Python is installed  
### 2. Start a simple server:

```bash
python3 -m http.server
```

### 3. Open the timeline:

```
http://localhost:8000/index.html
```

---

## ✔️ Validating the Data

Run the validation script to ensure the JSON file is well‑formed:

```bash
python3 tools/validate_data.py
```

---

## 🛠️ Roadmap

This repository is the foundation for a larger civic transparency system, including:

- A modernized timeline component (Astro + React + D3/Vis.js)  
- Integration with a unified municipal issue/idea backend  
- Automated scheduling based on constraints (materials, crews, weather, tenders)  
- Embeddable public transparency pages for OpenAntigonish  

These enhancements will be developed in dedicated repositories and integrated into the OpenAntigonish platform.

---

## 📄 License

MIT License — open for community use, adaptation, and contribution.
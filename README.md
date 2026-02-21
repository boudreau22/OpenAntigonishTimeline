# Town of Antigonish Capital Projects Timeline

This project provides a timeline of capital projects in the Town of Antigonish, visualizing phases and key events for projects such as Bay Street, West Street, and the Active Transportation Trail.

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

## Visualization

To view the interactive timeline, you need to run a local web server because modern browsers block `fetch` requests for local files (`file://`).

1. Ensure you have Python installed.
2. Run the following command in the project directory (root):
   ```bash
   python3 -m http.server
   ```
3. Open your browser and navigate to `http://localhost:8000/public/index.html`.

## Validation

To validate the integrity of the data file, run:
```bash
python3 tools/validate_data.py
```

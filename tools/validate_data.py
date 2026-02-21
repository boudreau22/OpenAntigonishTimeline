import json
import sys
from datetime import datetime

def validate_date(date_str):
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def validate_data(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format in {filepath}: {e}")
        return False
    except FileNotFoundError:
        print(f"Error: File {filepath} not found.")
        return False

    success = True

    # Iterate over all keys in the root object, assuming they are project identifiers
    for project_key, project_data in data.items():
        print(f"Validating project: {project_key}")

        # Check required fields in project
        if 'title' not in project_data or 'color' not in project_data:
            print(f"Error: Project '{project_key}' missing title or color")
            success = False

        # Check phases
        if 'phases' not in project_data:
            print(f"Error: Project '{project_key}' missing phases")
            success = False
        elif not isinstance(project_data['phases'], list):
            print(f"Error: Project '{project_key}' phases should be a list")
            success = False
        else:
            for i, phase in enumerate(project_data['phases']):
                if 'name' not in phase or 'start' not in phase or 'end' not in phase or 'description' not in phase:
                    print(f"Error: Phase {i} in '{project_key}' missing required fields")
                    success = False
                else:
                    if not validate_date(phase['start']) or not validate_date(phase['end']):
                        print(f"Error: Invalid date format in phase {i} of '{project_key}' (expected YYYY-MM-DD)")
                        success = False

        # Check events
        if 'events' not in project_data:
            print(f"Error: Project '{project_key}' missing events")
            success = False
        elif not isinstance(project_data['events'], list):
            print(f"Error: Project '{project_key}' events should be a list")
            success = False
        else:
            for i, event in enumerate(project_data['events']):
                if 'name' not in event or 'date' not in event or 'description' not in event:
                    print(f"Error: Event {i} in '{project_key}' missing required fields")
                    success = False
                else:
                    if not validate_date(event['date']):
                        print(f"Error: Invalid date format in event {i} of '{project_key}' (expected YYYY-MM-DD)")
                        success = False

    return success

if __name__ == "__main__":
    import os
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, '../src/data/town_projects.json')

    if validate_data(json_path):
        print("Data validation passed.")
        sys.exit(0)
    else:
        print("Data validation failed.")
        sys.exit(1)

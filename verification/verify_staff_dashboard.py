from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Capture console logs
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    page.on("pageerror", lambda err: print(f"Page Error: {err}"))

    try:
        print("Navigating to Staff Dashboard...")
        page.goto("http://localhost:4321/staff")

        # Wait a bit for components to load
        page.wait_for_timeout(5000)

        # Wait for the main header
        page.wait_for_selector("h1:has-text('Staff Dashboard')")
        print("Staff Dashboard loaded.")

        # Take a screenshot of the main dashboard
        page.screenshot(path="verification/staff_dashboard_debug.png", full_page=True)
        print("Screenshot saved to verification/staff_dashboard_debug.png")

        # Check if buttons are present
        if page.is_visible("button:has-text('Add Task')"):
            print("Add Task button is visible.")
            page.click("button:has-text('Add Task')")
            page.wait_for_selector("h3:has-text('Add New Task')")
            print("Add Task modal opened.")
            page.screenshot(path="verification/add_task_modal.png")
        else:
            print("Add Task button NOT visible.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)

from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:4321/embed")
            page.goto("http://localhost:4321/embed")

            # Wait for the timeline to render (it's client-side)
            # The timeline creates a .vis-timeline element
            print("Waiting for .vis-timeline selector...")
            page.wait_for_selector('.vis-timeline', timeout=10000)

            # Take a screenshot
            page.screenshot(path="verification/embed_screenshot.png")
            print("Screenshot saved to verification/embed_screenshot.png")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()

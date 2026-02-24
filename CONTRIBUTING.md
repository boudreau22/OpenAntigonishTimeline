# Contributing to Town Projects Timeline

Thank you for your interest in contributing! This guide will help you get started.

## Repository Structure

- `src/`: Source code for the Astro application.
  - `components/`: React UI components.
  - `data/`: Static data files (e.g., `town_projects.json`).
  - `lib/`: Utility libraries (Supabase, Scheduler).
  - `pages/`: Astro pages and API routes.
  - `styles/`: Global styles (TailwindCSS).
- `supabase/`: Database migrations and configuration.
- `tools/`: Utility scripts (data validation, sync scripts).
- `public/`: Static assets.

## Coding Standards

- **Frameworks**: We use [Astro](https://astro.build) for the application shell and [React](https://reactjs.org) for interactive components.
- **Styling**: Use [TailwindCSS](https://tailwindcss.com) for styling. Avoid custom CSS files unless necessary.
- **Database**: We use [Supabase](https://supabase.com). All database changes must be done via migrations in `supabase/migrations`.
- **Linting**: Ensure your code is clean and follows standard JavaScript/React practices.

## Development Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Copy `.env.example` to `.env` and fill in your Supabase credentials.
    ```bash
    cp .env.example .env
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Run Validation**:
    Before submitting changes, run the data validation script:
    ```bash
    npm run validate
    ```

## Deployment Steps

The project is built using Astro's Node.js adapter.

1.  **Build**:
    ```bash
    npm run build
    ```

2.  **Start Server**:
    ```bash
    node ./dist/server/entry.mjs
    ```

## Database Migrations

To apply migrations (if using Supabase CLI locally):
```bash
supabase db reset
```

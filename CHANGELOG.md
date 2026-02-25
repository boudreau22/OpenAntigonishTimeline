# Changelog

All notable changes to the Open Antigonish Civic Project System will be documented in this file.

## [2026-02-25] - System Maturity & Integration
**Summary:**
Completion of the entire initial project roadmap, including the core visualization engine, Supabase backend integration, automated scheduling, and Shapely sync capabilities.

### Added
- **Core Visualization Engine**: Standardized Astro project scaffold with a React/D3 timeline component supporting zoom, pan, and hover.
- **Backend Architecture**: Comprehensive Supabase integration with real-time REST endpoints and automated CPM scheduling engine for constraint solving.
- **Project Portals**: Staff Management Dashboard and resident-facing Transparency Page for public visibility into town projects.
- **Platform Integration**: Seamless Shapely → Supabase sync worker for community idea conversion and automated project tracking.

### Changed
- **Performance**: Optimized /embed build output for lightweight integration into external sites.
- **Governance**: Established formal contributor guides and governance manifests for project sustainability.
- **Data Quality**: Refactored town project data into validated schemas with automated priority scoring.

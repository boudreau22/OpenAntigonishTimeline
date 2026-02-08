# 🏆 Master Ecosystem Checklist
**Version:** 2026.4 (Unified Ecosystem Standard)

This checklist defines the engineering, UX, performance, security, and domain standards expected across all Andre Boudreau ecosystem projects.

**Instruction:** Items marked with a context that does not apply to this project should be ignored.

---

## 1. 🔥 Performance Engineering
*Context: All Web Apps & Games*
- [ ] Cache expensive calculations within a single analysis run
- [ ] Avoid repeated filtering of large lists
- [ ] Replace `iterrows()` with `itertuples()` or vectorized operations (Python)
- [ ] Use DataFrame vectorization for aggregations
- [ ] Cache configuration files (JSON/YAML)
- [ ] Cache historical snapshots to avoid repeated disk I/O
- [ ] Avoid repeated JSON loads
- [ ] Move heavy parsing to Web Workers
- [ ] Virtualize long lists (`react-window`, `react-virtuoso`)
- [ ] Memoize expensive UI calculations (`useMemo`)
- [ ] Memoize table rows (`React.memo`)
- [ ] Memoize form sections
- [ ] Optimize context re-renders
- [ ] Lazy load heavy routes
- [ ] Lazy load heavy libraries (`papaparse`, `jspdf`, charts)
- [ ] Use `content-visibility: auto`
- [ ] Tree-shake icons and date libraries
- [ ] Debounce autosave logic

## 2. 👁 Observability
*Context: Complex Logic / Financial Apps*
- [ ] Event stream logging for all domain events
- [ ] Anomaly detection (spending spikes, missing income, drawdowns, clawback spikes)
- [ ] Explanation engine for financial changes
- [ ] Data freshness metrics
- [ ] Pipeline health metrics
- [ ] Data completeness metrics
- [ ] Unified timeline view
- [ ] "Explain-This" buttons on charts
- [ ] Daily/Weekly digest generation
- [ ] Emit events from all engines (Promo, Allocation, Tax, Retirement, Scenario Planner)
- [ ] Memory usage & state growth metrics (Long-session tracking)

## 3. 🔄 Data Pipelines & Normalization
*Context: Apps with Data Imports/Exports*
- [ ] Header normalization for CSV imports
- [ ] Vendor normalization
- [ ] Categorization rules
- [ ] Ticker normalization
- [ ] Asset class mapping
- [ ] Sanitized file uploads
- [ ] File size & row count limits
- [ ] Web Worker offloading for parsing
- [ ] Structured ingestion pipelines
- [ ] JSON schema validation for imports
- [ ] Idempotent import operations (safe re-runs)

## 4. 🧠 State Management & React Architecture
*Context: React Applications*
- [ ] Split global contexts into smaller contexts
- [ ] Use selectors to reduce re-renders
- [ ] Memoize expensive components
- [ ] Lazy load heavy routes
- [ ] Use path aliases (`@/components`)
- [ ] Add global error boundary
- [ ] Standardized form architecture
- [ ] Consistent state shape conventions
- [ ] Avoid blocking I/O in UI thread
- [ ] Centralized form validation engine (schema-driven)

## 5. 🎨 UI/UX/IX Patterns
*Context: All Frontend UI*
- [ ] Standardized input styling
- [ ] Typography minimums
- [ ] Dark mode variable system
- [ ] Consistent focus rings
- [ ] Consistent spacing via CSS variables
- [ ] Mobile navigation drawer
- [ ] Sticky save buttons
- [ ] Breadcrumb improvements
- [ ] Timeline event states
- [ ] Scenario selection clarity
- [ ] Map marker clustering
- [ ] Drag-and-drop interactions
- [ ] Swipe gestures
- [ ] Layout animations
- [ ] Smooth sidebar transitions
- [ ] Dismissible toasts
- [ ] Global toast system
- [ ] Standardized Empty, Error, and Loading states

## 6. ♿ Accessibility (A11y)
*Context: All Public-Facing UI*
- [ ] ARIA labels for icon-only buttons
- [ ] Semantic interactive elements
- [ ] Programmatic form labels
- [ ] Focus management for sidebars/modals
- [ ] WCAG AA contrast
- [ ] Keyboard navigation for grids
- [ ] Reduced motion support
- [ ] Skip-to-content link
- [ ] Live regions for dynamic updates

## 7. 🔒 Security & Risk
*Context: All Applications*
- [ ] Input sanitization
- [ ] Sanitized imported JSON
- [ ] Sanitized exported filenames
- [ ] Checksum for saved JSON
- [ ] LocalStorage quota checks
- [ ] LocalStorage obfuscation/encryption
- [ ] Secure wipe/reset
- [ ] ReDoS-safe regex patterns
- [ ] CSP (Content Security Policy)
- [ ] HSTS
- [ ] X-Frame-Options
- [ ] Secure headers
- [ ] Prototype pollution protection
- [ ] Secrets management & environment variable hygiene

## 8. 🛠 Developer Experience (DX)
*Context: All Repositories*
- [ ] Architecture overview documentation
- [ ] Path aliasing
- [ ] Strict TS config
- [ ] Unit tests for calculators
- [ ] Integration tests for forms
- [ ] Snapshot tests for UI
- [ ] Linting & formatting enforcement
- [ ] Build cache invalidation checks
- [ ] Consistent project structure (`src/`)
- [ ] Schema & data migration strategy documentation

## 9. 💼 Domain-Specific Engines
*Context: Finance & Planning Projects ONLY*
- [ ] CPP calculation engine
- [ ] CPP projection engine
- [ ] CPP survivor benefit engine
- [ ] OAS integration
- [ ] OAS clawback optimization engine
- [ ] AdviceCards for CPP/OAS
- [ ] Retirement engine integration
- [ ] Tax engine integration
- [ ] Scenario planner integration
- [ ] Promo engine (tiers, penalties, itemchoice)
- [ ] Allocation engine (drift, rebalancing)
- [ ] Event stream integration
- [ ] Financial data lineage & explainability trail
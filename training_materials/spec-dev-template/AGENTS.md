# Spec Dev Template - Agent Instructions

Full-stack monorepo: React frontend + Express backend + SQLite database.
npm workspaces. TypeScript everywhere. ESM modules.

## Commands

```bash
npm install                          # Install all dependencies (root + workspaces)
npm run dev                          # Run backend (port 3000) + frontend (port 5173) concurrently
npm run build                        # Build both workspaces
npm run typecheck                    # Typecheck both workspaces
npm run lint                         # Lint frontend

npm run dev --workspace=backend      # Backend only (tsx --watch)
npm run dev --workspace=frontend     # Frontend only (vite)
npm run build --workspace=backend    # Build backend (tsc)
npm run build --workspace=frontend   # Build frontend (vite build)
```

## Architecture

```
backend/src/index.ts     Express server + all route handlers
backend/src/db.ts        SQLite schema, queries, CRUD helpers (better-sqlite3)
backend/data/app.db      SQLite file (auto-generated, gitignored)

frontend/src/App.tsx              Main app component
frontend/src/api/todos.ts         API client functions
frontend/src/components/atoms/    Basic UI building blocks
frontend/src/components/molecules/ Composed components (TodoForm, Card, FormField)
frontend/src/components/organisms/ Complex compositions (Form, Header)
frontend/src/components/templates/ Page layouts
frontend/src/components/pages/    Full pages (DesignSystem)
frontend/src/utils/               Utility functions

docs/specs/              Feature specifications (source of truth for requirements)
docs/agents/             Agent persona definitions
```

## Stack

- **Backend:** Express 4, better-sqlite3, TypeScript, tsx (dev runner)
- **Frontend:** React 19, Vite 7, Tailwind CSS v4, react-i18next, TypeScript
- **Tooling:** ESLint, Prettier, concurrently

## Key Patterns

### Backend
- All routes defined directly in `backend/src/index.ts` - no router abstractions
- Database resets on every server start (drops tables, recreates schema, seeds data) - this is intentional for dev
- Prepared statements via `better-sqlite3` for all queries - stored in `queries` object in db.ts
- CORS allows all origins (dev only)
- API prefix: `/api/` - RESTful, JSON request/response
- Input validation inline in route handlers (400 for bad input, 201 for creation, 500 for errors)

### Frontend
- Atomic design: atoms -> molecules -> organisms -> templates -> pages
- Tailwind CSS for all styling - use utility classes in `className`
- API calls in `frontend/src/api/` directory
- Components use TypeScript interfaces for props

### Database
- Schema lives in `initializeDatabase()` in `backend/src/db.ts`
- Add new tables/queries there, add CRUD helper functions as named exports
- better-sqlite3 is a native addon - it bundles SQLite and ships prebuilt binaries, no system SQLite needed

## Conventions

- Keep it simple. No over-engineering. No unnecessary abstractions.
- Don't add features, services, or fields that aren't explicitly needed.
- Prefer editing existing files over creating new ones.
- All backend types (interfaces) defined in `backend/src/db.ts` alongside the schema.
- Frontend component files are PascalCase. Each component directory has an `index.ts` barrel export.
- Feature specs in `docs/specs/` are the source of truth for requirements - read them before implementing.

## Validation

**CRITICAL:** After making changes, run `npm run typecheck` and `npm run lint`, and fix all errors before finishing. Code must pass both typecheck and linter. Do not skip this step.

## Adding Features

**New API endpoint:** Add route handler in `backend/src/index.ts`, add query/table/types in `backend/src/db.ts`
**New frontend feature:** Add component in appropriate atomic level, wire into `App.tsx`, add API client in `frontend/src/api/`
**Schema change:** Update `initializeDatabase()` and queries in `backend/src/db.ts`

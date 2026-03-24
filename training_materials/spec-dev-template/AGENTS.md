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

## Build Output

- **Backend**: `backend/dist/` — compiled Node.js server. Run: `node backend/dist/index.js`
- **Frontend**: `frontend/dist/` — static HTML/CSS/JS bundle. Preview: `npm run preview --workspace=frontend`

## API Reference

### Endpoints

| Method | Path | Description | Success | Error |
|--------|------|-------------|---------|-------|
| GET | `/api/todos` | List all todos | 200 | 500 |
| POST | `/api/todos` | Create a todo | 201 | 400, 500 |
| GET | `/api/health` | Health check | 200 | — |

### POST `/api/todos`

Request body:
```json
{"title": "Buy milk", "description": "Optional details"}
```

Response (201):
```json
{"id": 1, "title": "Buy milk", "description": "Optional details", "completed": false, "created_at": "2025-10-24T14:32:00.000Z"}
```

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'
```

### Validation Rules

- `title`: required, max 255 chars
- `description`: optional, max 1000 chars
- Invalid input returns 400 with error message

### API Patterns

- RESTful resource-based design, JSON request/response
- Standard HTTP verbs: GET, POST, PUT, DELETE
- Consistent error format across all endpoints

## Troubleshooting

| Problem | Error | Fix |
|---------|-------|-----|
| Port 3000 in use | `EPERM: operation not permitted 0.0.0.0:3000` | `pkill -f "node dist/index.js"` or `PORT=3001 npm run dev --workspace=backend` |
| Port 5173 in use | Vite fails to start | Change `server.port` in `frontend/vite.config.ts` |
| DB missing/corrupt | `SQLITE_CANTOPEN` or `no such table` | `rm -rf backend/data/ && npm run build --workspace=backend` |
| Missing module | `Cannot find module 'express'` (or similar) | `rm -rf node_modules && npm install` |
| TS export error | `TS4023: Exported variable has or is using name...` | Add explicit type annotation: `import type { X } from 'mod'; export const y: X = ...` |
| Full clean restart | Everything broken | `rm -rf node_modules backend/dist backend/data frontend/dist && npm install && npm run build && npm run dev` |

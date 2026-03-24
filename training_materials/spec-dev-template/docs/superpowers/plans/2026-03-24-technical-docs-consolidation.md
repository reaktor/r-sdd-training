# Technical Documentation Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate documentation duplication by making AGENTS.md the single source of technical truth, slimming README.md to an onboarding guide, and updating agent persona files to point to AGENTS.md.

**Architecture:** Documentation-only changes across 5 markdown files. AGENTS.md gains content moved from README.md. README.md is rewritten. Two persona files lose their project-structure sections and gain a pointer.

**Spec:** `docs/superpowers/specs/2026-03-24-technical-docs-consolidation-design.md`

---

## File Map

| File | Action | Responsibility After |
|------|--------|---------------------|
| `AGENTS.md` | Modify | Single source of technical truth |
| `README.md` | Rewrite | Slim onboarding guide (~60 lines) |
| `docs/agents/agent-fullstack.md` | Modify | Persona only, pointer to AGENTS.md |
| `docs/agents/agent-ui-designer.md` | Modify | Persona only, pointer to AGENTS.md |

---

### Task 1: Add API Reference to AGENTS.md

**Files:**
- Modify: `AGENTS.md`
- Reference: `README.md:202-240` (current API Reference content)

- [ ] **Step 1: Read the current API Reference section in README.md (lines 202-240)**

Understand what's there: endpoints, curl examples, response format, API pattern notes.

- [ ] **Step 2: Add API Reference section to AGENTS.md after the "Adding Features" section**

```markdown
## API Reference

**Prefix:** `/api/` — RESTful, JSON request/response.

**Current Endpoints (CREATE_TODOS):**

| Method | Path | Description | Status Codes |
|--------|------|-------------|-------------|
| GET | `/api/todos` | Fetch all todos | 200 |
| POST | `/api/todos` | Create a new todo | 201, 400 |
| GET | `/api/health` | Health check | 200 |

**POST `/api/todos` request body:**
```json
{"title": "Buy milk", "description": "Optional details"}
```

**Validation:** Title required, max 255 chars. Description optional, max 1000 chars.

**Pattern:** Standard HTTP verbs, resource-based URLs, consistent JSON error format.
```

- [ ] **Step 3: Verify AGENTS.md reads correctly end-to-end**

Read the full file and check the new section fits the existing style and flow.

- [ ] **Step 4: Commit**

```bash
git add training_materials/spec-dev-template/AGENTS.md
git commit -m "docs: add API reference section to AGENTS.md"
```

---

### Task 2: Add Troubleshooting to AGENTS.md

**Files:**
- Modify: `AGENTS.md`
- Reference: `README.md:348-458` (current Troubleshooting content)

- [ ] **Step 1: Read the current Troubleshooting section in README.md (lines 348-458)**

Understand the error scenarios covered: backend won't start, frontend won't start, database errors, missing dependencies, TypeScript build errors, clean build.

- [ ] **Step 2: Add a concise Troubleshooting section at the end of AGENTS.md**

Edit for brevity — keep error message, cause, and fix command. Drop verbose explanations.

```markdown
## Troubleshooting

**Port 3000 in use:**
```bash
lsof -i :3000        # Find process
pkill -f "node dist"  # Kill it
```

**Port 5173 in use:** Change port in `frontend/vite.config.ts` → `server: { port: 5174 }`

**`SQLITE_CANTOPEN` or `no such table`:**
```bash
rm -rf backend/data/
npm run dev  # DB auto-recreates on startup
```

**`Cannot find module 'express'`:**
```bash
rm -rf node_modules && npm install
```

**TypeScript build errors (`TS4023`):** Add explicit type annotations:
```typescript
import type { Database as DatabaseType } from 'better-sqlite3';
export const db: DatabaseType = new Database(dbPath);
```

**Full clean restart:**
```bash
rm -rf node_modules backend/dist backend/data frontend/dist
npm install && npm run build && npm run dev
```
```

- [ ] **Step 3: Verify AGENTS.md reads correctly end-to-end**

Read the full file and check the troubleshooting section fits.

- [ ] **Step 4: Commit**

```bash
git add training_materials/spec-dev-template/AGENTS.md
git commit -m "docs: add troubleshooting section to AGENTS.md"
```

---

### Task 3: Add Building & Deployment to AGENTS.md

**Files:**
- Modify: `AGENTS.md`
- Reference: `README.md:244-270` (current Building & Deployment content)

- [ ] **Step 1: Read current Building & Deployment in README.md (lines 244-270)**

- [ ] **Step 2: Add a concise Build Output section to AGENTS.md after "Adding Features"**

The existing Commands section already has `npm run build`. Add build output paths and production run info after the Adding Features section (alongside the API Reference added in Task 1):

```markdown
## Build Output

- **Backend**: `backend/dist/` — compiled Node.js server. Run: `node backend/dist/index.js`
- **Frontend**: `frontend/dist/` — static HTML/CSS/JS bundle. Preview: `npm run preview --workspace=frontend`
```

- [ ] **Step 3: Verify it doesn't duplicate existing Commands section content**

- [ ] **Step 4: Commit**

```bash
git add training_materials/spec-dev-template/AGENTS.md
git commit -m "docs: add build output section to AGENTS.md"
```

---

### Task 4: Rewrite README.md

**Files:**
- Rewrite: `README.md`

- [ ] **Step 1: Write the new README.md**

```markdown
# Spec Dev Monorepo

A full-stack starter template with React frontend + Express backend + SQLite database. Designed for AI-assisted development and spec-driven workflows.

## Quick Start

**Prerequisites:** Node.js 18+, npm 8+

```bash
npm install    # Install all dependencies
npm run dev    # Run backend (port 3000) + frontend (port 5173)
```

## Project Structure

```
spec-dev-template/
├── backend/              # Express API server
│   ├── src/
│   │   ├── index.ts     # Express server + routes
│   │   └── db.ts        # SQLite initialization & queries
│   └── data/            # SQLite database (auto-generated)
│
├── frontend/            # React + Vite SPA
│   ├── src/
│   │   ├── components/  # Atomic design system
│   │   ├── api/         # API client functions
│   │   ├── utils/       # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── public/
│
├── docs/                # Documentation
│   ├── agents/          # Agent personas for AI-assisted feedback
│   ├── specs/           # Feature specifications (source of truth)
│   └── todo-prd.md      # Product requirements
│
├── AGENTS.md            # Full technical documentation
├── CLAUDE.md            # AI agent entry point
└── package.json         # Root workspace config
```

## Documentation

| Document | What it covers |
|----------|---------------|
| `AGENTS.md` | Technical reference: stack, commands, architecture, patterns, API, troubleshooting |
| `docs/specs/` | Feature specifications and acceptance criteria |
| `docs/todo-prd.md` | Product requirements and goals |
| `docs/agents/` | AI agent personas for getting opinionated feedback |

For full technical documentation, see `AGENTS.md`.
```

- [ ] **Step 2: Verify the new README is under 60 lines and contains no technical details that belong in AGENTS.md**

- [ ] **Step 3: Commit**

```bash
git add training_materials/spec-dev-template/README.md
git commit -m "docs: slim README to onboarding guide, point to AGENTS.md"
```

---

### Task 5: Update agent-fullstack.md

**Files:**
- Modify: `docs/agents/agent-fullstack.md:31-39`

- [ ] **Step 1: Read the current file**

- [ ] **Step 2: Remove the `## Specs` section (lines 31-35) and `## Sources` section (lines 36-39)**

- [ ] **Step 3: Add replacement pointer in the same location**

```markdown
## Project Reference
See `AGENTS.md` for project structure, commands, and technical details.
```

- [ ] **Step 4: Commit**

```bash
git add training_materials/spec-dev-template/docs/agents/agent-fullstack.md
git commit -m "docs: replace stale paths in agent-fullstack with AGENTS.md pointer"
```

---

### Task 6: Update agent-ui-designer.md

**Files:**
- Modify: `docs/agents/agent-ui-designer.md:32-40`

- [ ] **Step 1: Read the current file**

- [ ] **Step 2: Remove the `## Specs` section (lines 32-35) and `## Sources` section (lines 36-40)**

- [ ] **Step 3: Add replacement pointer in the same location**

```markdown
## Project Reference
See `AGENTS.md` for project structure, commands, and technical details.
```

- [ ] **Step 4: Commit**

```bash
git add training_materials/spec-dev-template/docs/agents/agent-ui-designer.md
git commit -m "docs: replace stale paths in agent-ui-designer with AGENTS.md pointer"
```

---

### Task 7: Verification

- [ ] **Step 1: Read all modified files end-to-end**

Verify: AGENTS.md, README.md, agent-fullstack.md, agent-ui-designer.md

- [ ] **Step 2: Check for remaining duplication**

Search for technical facts (stack names, port numbers, file paths) that appear in both README.md and AGENTS.md. There should be no overlap except the project structure tree (which serves a different purpose in README — visual orientation vs. technical reference).

- [ ] **Step 3: Verify AGENTS.md is self-contained**

A reader of AGENTS.md alone should be able to understand: commands, architecture, stack, patterns, conventions, how to add features, API reference, troubleshooting, and build output.

- [ ] **Step 4: Verify README.md is under 60 lines and contains no technical implementation details**

- [ ] **Step 5: Run cleanup-prompt.md against the repo**

Use the `cleanup-prompt.md` prompt to scan all .md files and confirm no remaining duplication between files. Fix any issues found.

**Note for follow-up:** `agent-product-designer.md` line 2 references `src/components/` — a stale path that should be `frontend/src/components/`. This is out of scope for this plan but should be fixed separately.

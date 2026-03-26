# Spec Dev Monorepo

A full-stack starter template with React frontend + Express backend + SQLite database. Designed for AI-assisted development and spec-driven workflows.

## Quick Start

**Prerequisites:** Node.js 20+, npm 8+

```bash
npm install    # Install all dependencies
npm run dev    # Start backend + frontend dev servers
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

# Project Setup Instructions

## 1. Prerequisites

Install these if you don't have them:
- **Git**: https://git-scm.com/downloads
- **Node.js 18+** (includes npm): https://nodejs.org/
- **Claude Code**: `npm install -g @anthropic-ai/claude-code`

Verify:
```
git --version
node --version
npm --version
claude --version
```

## 2. Install the Superpowers plugin

```
claude plugins install superpowers
```

## 3. Clone the repo

```
# HTTPS (easiest)
git clone https://github.com/reaktor/r-sdd-training.git

# OR SSH (if you have SSH keys set up)
git clone git@github.com:reaktor/r-sdd-training.git
```

## 4. Install dependencies and start the app

```
cd r-sdd-training/training_materials/spec-dev-template
npm install
npm run dev
```

## 5. Open the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/health

You should see the todo app in your browser.

## 6. Start Claude Code

From the same folder (`training_materials/spec-dev-template`):
```
claude
```

## Where to go from here

- `README.md` in the repo root — overview of all training materials
- `training_materials/trainee-instructions.md` — workflow guidance and prompting tips
- `training_materials/spec-dev-template/README.md` — project structure and quick reference
- `training_materials/spec-dev-template/AGENTS.md` — full technical documentation
- `docs/todo-prd.md` — product requirements

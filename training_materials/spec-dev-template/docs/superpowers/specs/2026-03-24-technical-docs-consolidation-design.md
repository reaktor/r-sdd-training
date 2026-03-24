# Technical Documentation Consolidation

## Problem

Technical documentation is spread across multiple files with significant overlap. The same facts (stack, architecture, commands, DB schema, how to add features) appear in README.md, AGENTS.md, feature specs, and agent persona files. This leads to inconsistencies when one file is updated but others are not.

Evidence of drift: agent persona files reference `src/components/` and `src/` — paths that don't exist at the repo root. The actual paths are `frontend/src/components/` and `frontend/src/`.

## Design

### Core Rule

**All technical facts live in AGENTS.md. Every other file either links to it or owns a different abstraction level.**

### File Responsibilities

| File | Role | Audience |
|------|------|----------|
| AGENTS.md | Single source of technical truth: stack, architecture, commands, patterns, conventions, API reference, troubleshooting, how to add features | Both humans and AI agents |
| CLAUDE.md | Pointer to AGENTS.md (`@AGENTS.md`) | AI agents |
| README.md | Slim onboarding guide: what this is, quick start (3 commands), project structure tree, pointer to AGENTS.md | Humans |
| Feature specs (docs/specs/) | Feature-level requirements: what to build, feature-specific schema, acceptance criteria | Both |
| Agent personas (docs/agents/) | Personality and perspective definitions for AI-assisted feedback | Trainees |
| todo-prd.md | Product requirements (what the product needs, not how the project works) | Both |
| cleanup-prompt.md | Reusable tool for finding documentation inconsistencies — remains useful as ongoing hygiene check even after consolidation | Both |

### Changes Required

#### AGENTS.md
- Add **API Reference** section after Key Patterns: endpoints, request/response formats, curl examples. Edit for conciseness during the move (no need for verbatim copy).
- Add **Troubleshooting** section at the end: common errors and fixes. Edit for conciseness.
- Add **Building & Deployment** content if not already covered (currently only in README)
- Keep all existing content (commands, architecture, stack, patterns, conventions, validation, adding features)

#### README.md
Strip down to under 60 lines:
- One-paragraph description of the project
- Quick Start: prerequisites, `npm install`, `npm run dev`
- Project structure tree diagram (visual orientation)
- **Documentation Structure** section: brief table or list explaining which file is for what, so trainees know where to find and put information
- Pointer: "For full technical documentation, see `AGENTS.md`"

Remove all other sections: architecture details, stack description, DB schema, API reference, "What Works" status, performance notes, type safety section, scaling decisions, "Files to Modify When Expanding", "Development Workflow", "Building & Deployment", "Root Scripts", "Notes", troubleshooting, "Archimedes' Note" footer.

#### Agent Persona Files
- **agent-fullstack.md**: Remove `## Specs` and `## Sources` sections. Replace with:
  ```
  ## Project Reference
  See `AGENTS.md` for project structure, commands, and technical details.
  ```
- **agent-ui-designer.md**: Remove `## Specs` and `## Sources` sections. Replace with same pointer.
- **agent-product-designer.md**: No structural changes needed (has no Specs/Sources sections). No pointer needed since it does not reference project structure.

#### No Changes
- CLAUDE.md — already points to AGENTS.md
- Feature specs (e.g., CREATE_TODOS.md) — own their feature-level details
- todo-prd.md — product requirements, different abstraction level
- cleanup-prompt.md — reusable tool, not documentation
- ui-improvements-plan.md — analysis document, not project-structure docs
- Files prefixed with EXAMPLE — out of scope per user instruction

## Verification

After implementation, run `cleanup-prompt.md` against the repo to confirm no remaining duplication between files.

## Going Forward

When adding technical documentation:
1. Check if the fact belongs in AGENTS.md. If yes, put it there.
2. Feature-specific details go in the feature spec under docs/specs/.
3. README.md stays slim. Do not add technical details to it.

# Best Practices

AI is Everyone and knows Everything
- Make it be what you want it to be
- Make it do what you want it to do

## Getting Started

This repo has a `docs/` folder with a product requirements document (`docs/todo-prd.md`) and example specs. This is an exercise about spec-driven development — don't spend time tweaking the PRD, focus on using AI to get the specs and implementation done.

The Superpowers plugin for Claude Code is to be used throughout this exercise. It provides structured workflows (skills) that guide you from idea to implementation. See the setup instructions for installation.

## The Superpowers Workflow

Instead of manually crafting prompts and managing context, Superpowers provides skills that automate the spec-driven development process:

1. **Brainstorm** — Tell Claude what you want to build. It asks clarifying questions, proposes approaches, and produces a design spec. Skill: `superpowers:brainstorming`
2. **Plan** — From the approved spec, Claude creates a step-by-step implementation plan with exact file paths, code, and test commands. Skill: `superpowers:writing-plans`
3. **Implement** — Claude executes the plan task by task, with automated review between each. Skill: `superpowers:subagent-driven-development`
4. **Verify** — Tests, typecheck, and lint must all pass before work is considered done. Skill: `superpowers:verification-before-completion`
5. **Finish** — Merge, PR, or keep the branch. Skill: `superpowers:finishing-a-development-branch`

You don't need to invoke these skills manually — Superpowers will suggest the right skill at each stage. Just describe what you want and follow the flow.

## Get Coding

Always check AI generated spec contents. It tends to produce "comprehensive", "robust", "fault-tolerant" plans that are usually too much. Push back and keep things simple.

1. Start from the PRD in `docs/todo-prd.md` — pick a feature to implement
2. Tell Claude to brainstorm it — Superpowers will guide you through the workflow
3. Play around, try to get a feel for it, there is no one correct solution

## Key Skills Reference

| Skill | When to use |
|-------|-------------|
| `brainstorming` | Starting any new feature — explores requirements before code |
| `writing-plans` | After a spec is approved — creates implementation tasks |
| `subagent-driven-development` | Executing a plan — dispatches agents per task with review |
| `test-driven-development` | During implementation — write tests first |
| `systematic-debugging` | When something breaks — structured diagnosis |
| `finishing-a-development-branch` | When done — merge, PR, or keep |

## Critical Points and Tips

AI is non-deterministic by nature, it will hallucinate or do something stupid. It is critical to make sure that the documents used in prompting are kept clean of hallucinations, e.g. "audit trail" on one document will soon poison everything as you iterate and update the code and docs. Here are some guidelines:

- **"Normalize" documents** so that each fact exists only once in one file
- **Documents should only contain what must exist**, no speculation or guesses or extra
- **Always review generated specs and plans** before approving — Claude will ask for your approval at each stage
- **AI will make unnecessary edits** — watch for scope creep in specs and code
- **AGENTS.md is the source of truth** for project conventions, architecture, and API docs — keep it updated

## Working with Claude Code

- **`@` references** — use `@docs/todo-prd.md` to point Claude at specific files
- **Slash commands** — `/model` to check/switch models, `/help` for more
- **CLAUDE.md and AGENTS.md** — Claude reads these automatically for project context
- **Specs and plans** go in `docs/superpowers/specs/` and `docs/superpowers/plans/`
- **Git branches** — Superpowers works on feature branches to keep main clean

@AGENTS.md

# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (flat config via `eslint.config.mjs`, extends `eslint-config-next`)

There is no test setup in this repo yet.


## Neon Database (MCP)

When using the Neon MCP tools, always target:

- **Project:** `devstash` (project_id: `young-bird-44118168`)
- **Branch:** `development` (branch_id: `br-delicate-bird-axq5ou19`)

Rules:

- Always pass both `project_id` and `branch_id` explicitly on every Neon MCP call, including read-only queries. `production` is the project's default branch, so leaving out `branch_id` sends the call to production.
- Never read from or write to the `production` branch (`br-summer-unit-ax4w234a`) unless I explicitly say "production" in that request. Permission applies to that request only and doesn't carry over to later ones.
- If a request is ambiguous about which branch to use, use `development`. Never fall back to the default branch.
- Ask before running any destructive SQL (DELETE, UPDATE, DROP, TRUNCATE, ALTER), even on `development`.
- Schema changes go through `prisma migrate dev`, never raw DDL via the MCP.


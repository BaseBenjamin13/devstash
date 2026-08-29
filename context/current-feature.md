# Current Feature

Seed Data

## Status

Completed

## Goals

Create a seed script (`prisma/seed.ts`) to populate the database with sample data for development and demos. Full spec: @context/features/seed-spec.md

- Demo user: benmorgiewicz@gmail.com / "Demo User", password `12345678` (bcryptjs, 12 rounds), `isPro: false`, `emailVerified` set to current date
- Seed all 7 system item types (snippet, prompt, command, note, file, image, link) with the icon/color values from the spec, all `isSystem: true`
- Seed 5 collections with items:
  - **React Patterns** — 3 TypeScript snippets (custom hooks, component patterns, utility functions)
  - **AI Workflows** — 3 prompts (code review, documentation generation, refactoring assistance)
  - **DevOps** — 1 snippet (Docker/CI-CD config), 1 command (deployment script), 2 links (real documentation URLs)
  - **Terminal Commands** — 4 commands (git, docker, process management, package manager)
  - **Design Resources** — 4 links (real URLs: CSS/Tailwind references, component libraries, design systems, icon libraries)

## Notes

- Overwrites/uses the seed data defined in @context/features/seed-spec.md as source of truth
- Follow standard workflow: branch, implement, verify (`npm run build`), iterate, commit only after approval

## History

<!-- Keep this updated. Earliest to latest -->

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js setup
- Dashboard UI Phase 1: ShadCN UI init, /dashboard route with dark mode by default, top bar (search, New Collection, New Item), and sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with type links, favorite/recent collections, and user avatar footer; sidebar toggle lives above "Types" (desktop collapse to icon rail) with a mobile-only trigger to the left of the logo that opens/closes the drawer
- Dashboard UI Phase 3: main dashboard content — colored stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items, and 10 most recent items
- Prisma + Neon PostgreSQL Setup: Prisma 7 schema (User, Account, Session, VerificationToken, ItemType, Item, Collection, ItemCollection, Tag, ItemTag) with driver adapters (`@prisma/adapter-pg`), `prisma7.config.ts`, client singleton in `src/lib/prisma.ts`, and initial migration applied to the Neon dev branch via `prisma migrate dev` (never `db push`)
- Seed Data: added `User.password` field via migration (`add_user_password`) since NextAuth credentials storage didn't exist yet; `prisma/seed.ts` upserts the demo user (benmorgiewicz@gmail.com, bcrypt-hashed password) and 7 system item types, and does a delete-and-recreate pass for the demo user's 5 collections and 18 items per @context/features/seed-spec.md; wired up via `migrations.seed` in `prisma7.config.ts` and `npm run db:seed`

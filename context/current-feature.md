# Current Feature

<!-- Feature Name -->

## Status

<!-- Not Started|In Progress|Completed -->

Not Started

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js setup
- Dashboard UI Phase 1: ShadCN UI init, /dashboard route with dark mode by default, top bar (search, New Collection, New Item), and sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with type links, favorite/recent collections, and user avatar footer; sidebar toggle lives above "Types" (desktop collapse to icon rail) with a mobile-only trigger to the left of the logo that opens/closes the drawer
- Dashboard UI Phase 3: main dashboard content — colored stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items, and 10 most recent items
- Prisma + Neon PostgreSQL Setup: Prisma 7 schema (User, Account, Session, VerificationToken, ItemType, Item, Collection, ItemCollection, Tag, ItemTag) with driver adapters (`@prisma/adapter-pg`), `prisma7.config.ts`, client singleton in `src/lib/prisma.ts`, and initial migration applied to the Neon dev branch via `prisma migrate dev` (never `db push`)

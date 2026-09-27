# Current Feature

_None — pick the next feature and document it here._

## Status

Not started

## Goals

<!-- Describe the next feature here -->

## Notes

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js setup
- Dashboard UI Phase 1: ShadCN UI init, /dashboard route with dark mode by default, top bar (search, New Collection, New Item), and sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with type links, favorite/recent collections, and user avatar footer; sidebar toggle lives above "Types" (desktop collapse to icon rail) with a mobile-only trigger to the left of the logo that opens/closes the drawer
- Dashboard UI Phase 3: main dashboard content — colored stats cards (items, collections, favorite items, favorite collections), recent collections grid, pinned items, and 10 most recent items
- Prisma + Neon PostgreSQL Setup: Prisma 7 schema (User, Account, Session, VerificationToken, ItemType, Item, Collection, ItemCollection, Tag, ItemTag) with driver adapters (`@prisma/adapter-pg`), `prisma7.config.ts`, client singleton in `src/lib/prisma.ts`, and initial migration applied to the Neon dev branch via `prisma migrate dev` (never `db push`)
- Seed Data: added `User.password` field via migration (`add_user_password`) since NextAuth credentials storage didn't exist yet; `prisma/seed.ts` upserts the demo user (benmorgiewicz@gmail.com, bcrypt-hashed password) and 7 system item types, and does a delete-and-recreate pass for the demo user's 5 collections and 18 items per @context/features/seed-spec.md; wired up via `migrations.seed` in `prisma7.config.ts` and `npm run db:seed`
- Dashboard Collections — Real Data: new `src/lib/db/collections.ts` (`getRecentCollections`, `getCollectionStats`, React `cache`-wrapped; resolves the seeded demo user by email until NextAuth lands); `RecentCollections` + `StatsCards` are now async server components reading from Neon via Prisma; `CollectionCard` takes a `CollectionCardData` shape with `itemCount`, distinct `types` (most-used first), and `dominantColor` for the left border; `/dashboard` set to `force-dynamic`. Sidebar and Pinned/Recent Items still on mock data; items under collection cards deferred. Spec: @context/features/dashboard-collections-spec.md
- Dashboard Items — Real Data: new `src/lib/db/items.ts` (`getPinnedItems`, `getRecentItems`, `getItemStats`, `formatItemDate`, React `cache`-wrapped) returning plain `Item`/`ItemType`/`ItemTag` view types with `itemType` + `tags` pre-resolved; shared demo-user resolver extracted to `src/lib/db/user.ts` (`getCurrentUserId`) and reused by `collections.ts`. `PinnedItems` + `RecentItems` are now async server components reading from Neon; `ItemRow` takes the new `Item` shape; `StatsCards` item + favorite-item counts come from `getItemStats()`. Removed the now-unused `src/lib/dashboard-data.ts`. Sidebar still on mock data; items nested under collection cards still deferred. Spec: @context/features/dashboard-items-spec.md
- Stats & Sidebar — Real Data: `StatsCards` was already reading from the DB (no change needed there). Added `getItemTypesWithCounts` to `src/lib/db/items.ts` and `itemTypeSlug` to `src/lib/icon-map.ts` (kept out of `db/items.ts` so the client-side sidebar doesn't pull in server-only Prisma code); refactored `src/lib/db/collections.ts` to share fetch/mapping logic between `getRecentCollections` and the new `getSidebarCollections`. Sidebar is now a server component (`dashboard-sidebar.tsx`, async, fetches types + collections) rendering a new client `SidebarShell` (holds the collapse/mobile `useSidebar` state) which renders `SidebarContent` (now prop-driven instead of reading `mock-data`) twice for desktop/mobile. Sidebar shows real item types with icons + per-user counts linking to `/items/[typename]`, real favorite collections (star icon) and recent collections (colored circle = most-used item type's color), and a "View all collections" link to `/collections`. User avatar footer still reads `currentUser` from `mock-data.ts` (no auth/session yet — out of scope). Spec: @context/features/stats-sidebar-spec.md
- Add Pro Badge to Sidebar: added the ShadCN `Badge` component (`src/components/ui/badge.tsx`) and a small `isProType()` check in `sidebar-content.tsx` that shows a subtle, uppercase "PRO" badge (outline variant, `text-amber-500`, matching the favorites star color) next to the File and Image item-type links. Spec: @context/features/add-pro-badge-sidebar.md
- Dashboard Header Accessibility & Deduplicated Collections Fetch (from code-scanner review): added `aria-label`s to the "New Collection" / "New Item" header buttons (their text is `hidden` below `sm`) and to the search input in `dashboard-header.tsx`. In `src/lib/db/collections.ts`, removed `fetchCollectionCards`; `getSidebarCollections` (React `cache`-wrapped) now owns the single `collection.findMany`, and `getRecentCollections(limit)` slices its result, so `/dashboard` runs one collections query instead of two. SQL-aggregation rewrite and composite indexes deferred.

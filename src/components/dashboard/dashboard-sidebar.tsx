import { getSidebarCollections } from "@/lib/db/collections";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { SidebarShell } from "@/components/dashboard/sidebar-shell";

const RECENT_COLLECTIONS_LIMIT = 5;

export async function DashboardSidebar() {
  const [itemTypes, sidebarCollections] = await Promise.all([
    getItemTypesWithCounts(),
    getSidebarCollections(),
  ]);

  const favoriteCollections = sidebarCollections.filter((c) => c.isFavorite);
  const recentCollections = sidebarCollections
    .filter((c) => !c.isFavorite)
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  return (
    <SidebarShell
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      recentCollections={recentCollections}
    />
  );
}

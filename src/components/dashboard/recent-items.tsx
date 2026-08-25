import { ItemRow } from "@/components/dashboard/item-row";
import { getRecentItems } from "@/lib/dashboard-data";

const RECENT_ITEMS_LIMIT = 10;

export function RecentItems() {
  const recentItems = getRecentItems(RECENT_ITEMS_LIMIT);

  if (recentItems.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold">Recent Items</h2>
      <div className="mt-3 space-y-2">
        {recentItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

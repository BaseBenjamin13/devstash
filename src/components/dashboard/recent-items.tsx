import { ItemRow } from "@/components/dashboard/item-row";
import { getRecentItems } from "@/lib/db/items";

const RECENT_ITEMS_LIMIT = 10;

export async function RecentItems() {
  const recentItems = await getRecentItems(RECENT_ITEMS_LIMIT);

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

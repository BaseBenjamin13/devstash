import { ItemRow } from "@/components/dashboard/item-row";
import { getPinnedItems } from "@/lib/dashboard-data";

export function PinnedItems() {
  const pinnedItems = getPinnedItems();

  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold">Pinned</h2>
      <div className="mt-3 space-y-2">
        {pinnedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

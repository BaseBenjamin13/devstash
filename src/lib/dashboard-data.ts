import {
  collections,
  itemTypes,
  items,
  tags,
  type Collection,
  type Item,
  type ItemType,
  type Tag,
} from "@/lib/mock-data";

export function getItemType(itemTypeId: string): ItemType {
  const type = itemTypes.find((t) => t.id === itemTypeId);
  if (!type) {
    throw new Error(`Unknown item type: ${itemTypeId}`);
  }
  return type;
}

export function getItemTags(item: Item): Tag[] {
  return item.tagIds
    .map((tagId) => tags.find((tag) => tag.id === tagId))
    .filter((tag): tag is Tag => Boolean(tag));
}

export function getCollectionItems(collectionId: string): Item[] {
  return items.filter((item) => item.collectionIds.includes(collectionId));
}

export function getDominantItemType(collectionId: string): ItemType | null {
  const collectionItems = getCollectionItems(collectionId);
  if (collectionItems.length === 0) return null;

  const counts = new Map<string, number>();
  for (const item of collectionItems) {
    counts.set(item.itemTypeId, (counts.get(item.itemTypeId) ?? 0) + 1);
  }

  let dominantId = collectionItems[0].itemTypeId;
  let highest = 0;
  for (const [itemTypeId, count] of counts) {
    if (count > highest) {
      highest = count;
      dominantId = itemTypeId;
    }
  }

  return getItemType(dominantId);
}

export function getRecentCollections(limit: number): Collection[] {
  return [...collections]
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}

export function getPinnedItems(): Item[] {
  return items
    .filter((item) => item.isPinned)
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export function getRecentItems(limit: number): Item[] {
  return [...items]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function formatItemDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

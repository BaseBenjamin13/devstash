import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/db/user";

export interface CollectionCardTypeIcon {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CollectionCardData {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  // Distinct item types in this collection, most-used first.
  types: CollectionCardTypeIcon[];
  // Border colour for the card = colour of the most-used type; null when empty.
  dominantColor: string | null;
}

const collectionCardInclude = {
  items: {
    include: {
      item: {
        select: {
          itemType: {
            select: { id: true, name: true, icon: true, color: true },
          },
        },
      },
    },
  },
} as const;

type CollectionRow = Awaited<
  ReturnType<
    typeof prisma.collection.findMany<{ include: typeof collectionCardInclude }>
  >
>[number];

function toCollectionCard(collection: CollectionRow): CollectionCardData {
  const counts = new Map<
    string,
    { type: CollectionCardTypeIcon; count: number }
  >();

  for (const { item } of collection.items) {
    const type = item.itemType;
    const entry = counts.get(type.id);
    if (entry) {
      entry.count += 1;
    } else {
      counts.set(type.id, { type, count: 1 });
    }
  }

  const byUsage = [...counts.values()].sort((a, b) => b.count - a.count);

  return {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    isFavorite: collection.isFavorite,
    itemCount: collection.items.length,
    types: byUsage.map((entry) => entry.type),
    dominantColor: byUsage[0]?.type.color ?? null,
  };
}

async function fetchCollectionCards(limit?: number): Promise<CollectionCardData[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    ...(limit !== undefined ? { take: limit } : {}),
    include: collectionCardInclude,
  });

  return collections.map(toCollectionCard);
}

export const getRecentCollections = cache(
  (limit: number): Promise<CollectionCardData[]> => fetchCollectionCards(limit)
);

// All of the user's collections, for the sidebar's favorites/recents lists.
export const getSidebarCollections = cache(
  (): Promise<CollectionCardData[]> => fetchCollectionCards()
);

export interface CollectionStats {
  total: number;
  favorites: number;
}

export const getCollectionStats = cache(async (): Promise<CollectionStats> => {
  const userId = await getCurrentUserId();
  if (!userId) return { total: 0, favorites: 0 };

  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
});

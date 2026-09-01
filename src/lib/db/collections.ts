import { cache } from "react";

import { prisma } from "@/lib/prisma";

// No auth yet — dashboard data is scoped to the seeded demo user for now.
// Swap this for the authenticated session user once NextAuth lands.
const DEMO_USER_EMAIL = "benmorgiewicz@gmail.com";

const getDashboardUserId = cache(async (): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
    select: { id: true },
  });
  return user?.id ?? null;
});

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

export const getRecentCollections = cache(
  async (limit: number): Promise<CollectionCardData[]> => {
    const userId = await getDashboardUserId();
    if (!userId) return [];

    const collections = await prisma.collection.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      include: {
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
      },
    });

    return collections.map((collection) => {
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
    });
  }
);

export interface CollectionStats {
  total: number;
  favorites: number;
}

export const getCollectionStats = cache(async (): Promise<CollectionStats> => {
  const userId = await getDashboardUserId();
  if (!userId) return { total: 0, favorites: 0 };

  const [total, favorites] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
});

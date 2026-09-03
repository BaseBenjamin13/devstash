import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/db/user";

export interface ItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ItemTag {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
  itemType: ItemType;
  tags: ItemTag[];
}

const itemInclude = {
  itemType: { select: { id: true, name: true, icon: true, color: true } },
  tags: { include: { tag: { select: { id: true, name: true } } } },
} as const;

type ItemRow = Awaited<
  ReturnType<typeof prisma.item.findMany<{ include: typeof itemInclude }>>
>[number];

function toItem(row: ItemRow): Item {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    isFavorite: row.isFavorite,
    isPinned: row.isPinned,
    createdAt: row.createdAt.toISOString(),
    itemType: row.itemType,
    tags: row.tags.map(({ tag }) => tag),
  };
}

export const getPinnedItems = cache(async (): Promise<Item[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const rows = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });

  return rows.map(toItem);
});

export const getRecentItems = cache(async (limit: number): Promise<Item[]> => {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const rows = await prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: itemInclude,
  });

  return rows.map(toItem);
});

export function formatItemDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export interface ItemStats {
  total: number;
  favorites: number;
}

export const getItemStats = cache(async (): Promise<ItemStats> => {
  const userId = await getCurrentUserId();
  if (!userId) return { total: 0, favorites: 0 };

  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);

  return { total, favorites };
});

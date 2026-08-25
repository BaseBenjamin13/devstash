import Link from "next/link";
import { Star } from "lucide-react";

import { getTypeIcon } from "@/lib/icon-map";
import { getCollectionItems, getDominantItemType } from "@/lib/dashboard-data";
import { itemTypes, type Collection, type ItemType } from "@/lib/mock-data";

export function CollectionCard({ collection }: { collection: Collection }) {
  const collectionItems = getCollectionItems(collection.id);
  const dominantType = getDominantItemType(collection.id);
  const typeIds = Array.from(
    new Set(collectionItems.map((item) => item.itemTypeId))
  );
  const cardTypes = typeIds
    .map((typeId) => itemTypes.find((type) => type.id === typeId))
    .filter((type): type is ItemType => Boolean(type));

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="flex flex-col gap-3 rounded-lg border border-border border-l-4 bg-card p-4 transition-colors hover:bg-accent/50"
      style={dominantType ? { borderLeftColor: dominantType.color } : undefined}
    >
      <div className="flex items-center gap-1.5">
        <h3 className="font-semibold">{collection.name}</h3>
        {collection.isFavorite && (
          <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {collectionItems.length} items
      </p>
      <p className="text-sm text-muted-foreground">{collection.description}</p>
      {cardTypes.length > 0 && (
        <div className="mt-auto flex items-center gap-2 pt-1">
          {cardTypes.map((type) => {
            const Icon = getTypeIcon(type.icon);
            return (
              <Icon key={type.id} className="size-4" style={{ color: type.color }} />
            );
          })}
        </div>
      )}
    </Link>
  );
}

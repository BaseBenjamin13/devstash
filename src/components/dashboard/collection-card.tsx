import Link from "next/link";
import { Star } from "lucide-react";

import { TypeIcon } from "@/lib/icon-map";
import type { CollectionCardData } from "@/lib/db/collections";

export function CollectionCard({
  collection,
}: {
  collection: CollectionCardData;
}) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="flex flex-col gap-3 rounded-lg border border-border border-l-4 bg-card p-4 transition-colors hover:bg-accent/50"
      style={
        collection.dominantColor
          ? { borderLeftColor: collection.dominantColor }
          : undefined
      }
    >
      <div className="flex items-center gap-1.5">
        <h3 className="font-semibold">{collection.name}</h3>
        {collection.isFavorite && (
          <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {collection.itemCount} items
      </p>
      {collection.description && (
        <p className="text-sm text-muted-foreground">{collection.description}</p>
      )}
      {collection.types.length > 0 && (
        <div className="mt-auto flex items-center gap-2 pt-1">
          {collection.types.map((type) => (
            <TypeIcon
              key={type.id}
              name={type.icon}
              className="size-4"
              style={{ color: type.color }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

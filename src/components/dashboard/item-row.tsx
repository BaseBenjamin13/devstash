import { Pin, Star } from "lucide-react";

import { TypeIcon } from "@/lib/icon-map";
import { formatItemDate, type Item } from "@/lib/db/items";

export function ItemRow({ item }: { item: Item }) {
  const type = item.itemType;

  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-border border-l-4 bg-card p-3 transition-colors hover:bg-accent/50"
      style={{ borderLeftColor: type.color }}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: `${type.color}26`, color: type.color }}
      >
        <TypeIcon name={type.icon} className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-medium">{item.title}</h3>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        {item.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] text-secondary-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatItemDate(item.createdAt)}
      </span>
    </div>
  );
}

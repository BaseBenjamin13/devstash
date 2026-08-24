import Link from "next/link";
import { PanelLeft, Settings, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/dashboard/sidebar-provider";
import { getTypeIcon } from "@/lib/icon-map";
import {
  collections,
  currentUser,
  itemTypeSlug,
  itemTypes,
  items,
} from "@/lib/mock-data";

const RECENT_COLLECTIONS_LIMIT = 5;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const { toggleSidebar } = useSidebar();
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections
    .filter((c) => !c.isFavorite)
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, RECENT_COLLECTIONS_LIMIT);

  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex items-center border-b border-border p-3",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <span className="text-sm font-medium">Navigation</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <PanelLeft className="size-4" />
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <div>
          {!collapsed && (
            <h3 className="px-2 text-xs font-medium text-muted-foreground">
              Types
            </h3>
          )}
          <ul className="mt-1 space-y-0.5">
            {itemTypes.map((type) => {
              const Icon = getTypeIcon(type.icon);
              const count = items.filter((i) => i.itemTypeId === type.id).length;
              return (
                <li key={type.id}>
                  <Link
                    href={`/items/${itemTypeSlug(type.name)}`}
                    onClick={onNavigate}
                    title={collapsed ? type.name : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    <Icon
                      className="size-4 shrink-0"
                      style={{ color: type.color }}
                    />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{type.name}s</span>
                        <span className="text-xs text-muted-foreground">
                          {count}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {!collapsed && (favoriteCollections.length > 0 || recentCollections.length > 0) && (
          <div className="mt-6">
            <h3 className="px-2 text-xs font-medium text-muted-foreground">
              Collections
            </h3>

            {favoriteCollections.length > 0 && (
              <div className="mt-1">
                <p className="px-2 py-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground/70">
                  FAVORITES
                </p>
                <ul className="space-y-0.5">
                  {favoriteCollections.map((collection) => (
                    <li key={collection.id}>
                      <Link
                        href={`/collections/${collection.id}`}
                        onClick={onNavigate}
                        className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="flex-1 truncate">{collection.name}</span>
                        <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recentCollections.length > 0 && (
              <div className="mt-3">
                <p className="px-2 py-1 text-[0.65rem] font-medium tracking-wide text-muted-foreground/70">
                  RECENT
                </p>
                <ul className="space-y-0.5">
                  {recentCollections.map((collection) => {
                    const count = items.filter((i) =>
                      i.collectionIds.includes(collection.id)
                    ).length;
                    return (
                      <li key={collection.id}>
                        <Link
                          href={`/collections/${collection.id}`}
                          onClick={onNavigate}
                          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                        >
                          <span className="flex-1 truncate">{collection.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-border p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
          {initials(currentUser.name)}
        </div>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
            <Settings className="size-4 shrink-0 text-muted-foreground" />
          </>
        )}
      </div>
    </div>
  );
}

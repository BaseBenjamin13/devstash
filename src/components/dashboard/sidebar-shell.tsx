"use client";

import { cn } from "@/lib/utils";
import { SidebarContent } from "@/components/dashboard/sidebar-content";
import { useSidebar } from "@/components/dashboard/sidebar-provider";
import type { CollectionCardData } from "@/lib/db/collections";
import type { ItemTypeWithCount } from "@/lib/db/items";

interface SidebarShellProps {
  itemTypes: ItemTypeWithCount[];
  favoriteCollections: CollectionCardData[];
  recentCollections: CollectionCardData[];
}

export function SidebarShell({
  itemTypes,
  favoriteCollections,
  recentCollections,
}: SidebarShellProps) {
  const { collapsed, mobileOpen, closeMobileSidebar } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 border-r border-border transition-[width] duration-200 md:block",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          itemTypes={itemTypes}
          favoriteCollections={favoriteCollections}
          recentCollections={recentCollections}
        />
      </aside>

      <div
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMobileSidebar}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-background transition-transform duration-200 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          collapsed={false}
          onNavigate={closeMobileSidebar}
          itemTypes={itemTypes}
          favoriteCollections={favoriteCollections}
          recentCollections={recentCollections}
        />
      </aside>
    </>
  );
}

"use client";

import { FolderPlus, Layers, PanelLeft, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/dashboard/sidebar-provider";

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open sidebar"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <PanelLeft className="size-4" />
      </Button>
      <div className="flex items-center gap-2 font-semibold">
        <Layers className="size-5 text-primary" />
        <span className="hidden sm:inline">DevStash</span>
      </div>
      <div className="relative max-w-md flex-1">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search items..." className="pl-8" />
      </div>
      <Button variant="outline" size="sm" className="gap-1.5">
        <FolderPlus className="size-4" />
        <span className="hidden translate-y-px sm:inline">New Collection</span>
      </Button>
      <Button size="sm" className="gap-1.5">
        <Plus className="size-4" />
        <span className="hidden translate-y-px sm:inline">New Item</span>
      </Button>
    </header>
  );
}

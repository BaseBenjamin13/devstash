import { FolderPlus, Layers, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Layers className="size-5 text-primary" />
          <span>DevStash</span>
        </div>
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search items..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <FolderPlus className="size-4" />
          <span className="translate-y-px">New Collection</span>
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          <span className="translate-y-px">New Item</span>
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 border-r border-border p-4">
          <h2 className="text-lg font-semibold">Sidebar</h2>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

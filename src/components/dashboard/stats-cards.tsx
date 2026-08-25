import { FolderOpen, Heart, Layers, Star } from "lucide-react";

import { collections, items } from "@/lib/mock-data";

export function StatsCards() {
  const stats = [
    { label: "Items", value: items.length, icon: Layers, color: "#3b82f6" },
    {
      label: "Collections",
      value: collections.length,
      icon: FolderOpen,
      color: "#10b981",
    },
    {
      label: "Favorite Items",
      value: items.filter((item) => item.isFavorite).length,
      icon: Star,
      color: "#f59e0b",
    },
    {
      label: "Favorite Collections",
      value: collections.filter((collection) => collection.isFavorite).length,
      icon: Heart,
      color: "#ec4899",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex size-7 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: `${color}26`, color }}
            >
              <Icon className="size-4" />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}

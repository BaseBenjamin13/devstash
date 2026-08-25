import Link from "next/link";

import { CollectionCard } from "@/components/dashboard/collection-card";
import { getRecentCollections } from "@/lib/dashboard-data";

const RECENT_COLLECTIONS_LIMIT = 6;

export function RecentCollections() {
  const recentCollections = getRecentCollections(RECENT_COLLECTIONS_LIMIT);

  if (recentCollections.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Collections</h2>
        <Link
          href="/collections"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View all
        </Link>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentCollections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  );
}

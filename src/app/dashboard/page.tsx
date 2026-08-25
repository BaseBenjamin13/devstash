import { PinnedItems } from "@/components/dashboard/pinned-items";
import { RecentCollections } from "@/components/dashboard/recent-collections";
import { RecentItems } from "@/components/dashboard/recent-items";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your developer knowledge hub</p>
      </div>
      <StatsCards />
      <RecentCollections />
      <PinnedItems />
      <RecentItems />
    </div>
  );
}

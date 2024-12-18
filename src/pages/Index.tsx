import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { FollowersList } from "@/components/FollowersList";
import { FollowersChart } from "@/components/FollowersChart";
import { TwitterImport } from "@/components/TwitterImport";
import { AddFollowerDialog } from "@/components/AddFollowerDialog";
import { useFollowers } from "@/hooks/useFollowers";
import { calculateStats, prepareChartData } from "@/utils/statsUtils";
import { Trash2 } from "lucide-react";

const Index = () => {
  const { followers, clearData, addFollower, importFollowers } = useFollowers();

  const stats = calculateStats(followers);
  const chartData = prepareChartData(followers);

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Follower Tracker</h1>
        <div className="flex gap-2">
          <Button onClick={clearData} variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Data
          </Button>
          <AddFollowerDialog onAdd={addFollower} />
        </div>
      </div>

      <TwitterImport onImport={importFollowers} />

      <Stats {...stats} />

      <div className="grid gap-4 md:grid-cols-2">
        <FollowersList
          title="Recent Followers"
          followers={followers.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )}
          type="followers"
        />
        <FollowersList
          title="Recent Unfollowers"
          followers={[]}
          type="unfollowers"
        />
      </div>

      <FollowersChart data={chartData} />
    </div>
  );
};

export default Index;
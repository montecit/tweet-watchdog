import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { FollowersList } from "@/components/FollowersList";
import { FollowersChart } from "@/components/FollowersChart";
import { TwitterImport } from "@/components/TwitterImport";
import { AddFollowerDialog } from "@/components/AddFollowerDialog";
import { useFollowers } from "@/hooks/useFollowers";
import { calculateStats, prepareChartData } from "@/utils/statsUtils";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { followers, clearData, addFollower, importFollowers } = useFollowers();

  const stats = calculateStats(followers);
  const chartData = prepareChartData(followers);

  // Sort followers by timestamp in descending order (most recent first)
  const sortedFollowers = [...followers].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 space-y-8 mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Twitter Follower Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor and analyze your Twitter followers</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              onClick={clearData} 
              variant="destructive" 
              size="sm"
              className="w-full sm:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Data
            </Button>
            <AddFollowerDialog onAdd={addFollower} />
          </div>
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <TwitterImport onImport={importFollowers} />
          </CardContent>
        </Card>

        <Stats {...stats} />

        <div className="grid gap-6 md:grid-cols-2">
          <FollowersList
            title="Recent Followers"
            followers={sortedFollowers}
            type="followers"
          />
          <FollowersList
            title="Recent Unfollowers"
            followers={[]}
            type="unfollowers"
          />
        </div>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <FollowersChart data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
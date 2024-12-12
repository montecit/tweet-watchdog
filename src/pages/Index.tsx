import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { FollowersList } from "@/components/FollowersList";
import { FollowersChart } from "@/components/FollowersChart";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const mockStats = {
    totalFollowers: 1234,
    newFollowers: 5,
    unfollowers: 2,
  };

  const mockFollowers = [
    { id: "1", username: "user1", name: "User One", timestamp: "2024-02-20" },
    { id: "2", username: "user2", name: "User Two", timestamp: "2024-02-19" },
  ];

  const mockChartData = [
    { date: "Feb 15", followers: 1230 },
    { date: "Feb 16", followers: 1232 },
    { date: "Feb 17", followers: 1235 },
    { date: "Feb 18", followers: 1233 },
    { date: "Feb 19", followers: 1234 },
  ];

  const handleManualSync = () => {
    toast({
      title: "Sync Started",
      description: "Checking for follower changes...",
    });
    // Implement actual sync logic here
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Twitter Follower Tracker</h1>
        <Button
          onClick={handleManualSync}
          className="bg-twitter-blue hover:bg-twitter-dark text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Now
        </Button>
      </div>

      <Stats {...mockStats} />

      <div className="grid gap-4 md:grid-cols-2">
        <FollowersList
          title="Recent Followers"
          followers={mockFollowers}
          type="followers"
        />
        <FollowersList
          title="Recent Unfollowers"
          followers={mockFollowers}
          type="unfollowers"
        />
      </div>

      <FollowersChart data={mockChartData} />
    </div>
  );
};

export default Index;
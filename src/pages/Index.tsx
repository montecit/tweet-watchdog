import { Button } from "@/components/ui/button";
import { Stats } from "@/components/Stats";
import { FollowersList } from "@/components/FollowersList";
import { FollowersChart } from "@/components/FollowersChart";
import { TwitterImport } from "@/components/TwitterImport";
import { RefreshCw, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [followers, setFollowers] = useState(() => {
    const saved = localStorage.getItem('followers');
    return saved ? JSON.parse(saved) : [];
  });
  const [newFollowerName, setNewFollowerName] = useState('');
  const [newFollowerUsername, setNewFollowerUsername] = useState('');

  const addFollower = () => {
    if (!newFollowerName || !newFollowerUsername) {
      toast({
        title: "Error",
        description: "Please fill in both name and username",
        variant: "destructive"
      });
      return;
    }

    const newFollower = {
      id: Date.now().toString(),
      name: newFollowerName,
      username: newFollowerUsername,
      timestamp: new Date().toISOString().split('T')[0]
    };

    const updatedFollowers = [...followers, newFollower];
    setFollowers(updatedFollowers);
    localStorage.setItem('followers', JSON.stringify(updatedFollowers));
    
    toast({
      title: "Success",
      description: "Follower added successfully",
    });

    setNewFollowerName('');
    setNewFollowerUsername('');
  };

  const handleImport = (importedFollowers: any[]) => {
    const existingIds = new Set(followers.map((f: any) => f.id));
    const newFollowers = importedFollowers.filter(f => !existingIds.has(f.id));
    
    const updatedFollowers = [...followers, ...newFollowers];
    setFollowers(updatedFollowers);
    localStorage.setItem('followers', JSON.stringify(updatedFollowers));

    toast({
      title: "Success",
      description: `Imported ${newFollowers.length} new followers`,
    });
  };

  // Calculate stats
  const stats = {
    totalFollowers: followers.length,
    newFollowers: followers.filter(f => {
      const date = new Date(f.timestamp);
      const now = new Date();
      return now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;
    }).length,
    unfollowers: 0
  };

  // Prepare chart data
  const chartData = followers.reduce((acc, curr) => {
    const date = curr.timestamp;
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.followers += 1;
    } else {
      acc.push({ date, followers: 1 });
    }
    return acc;
  }, [] as { date: string; followers: number }[]).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Follower Tracker</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Follower
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Follower</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newFollowerName}
                    onChange={(e) => setNewFollowerName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newFollowerUsername}
                    onChange={(e) => setNewFollowerUsername(e.target.value)}
                    placeholder="johndoe"
                  />
                </div>
                <Button onClick={addFollower} className="w-full">
                  Add Follower
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <TwitterImport onImport={handleImport} />

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
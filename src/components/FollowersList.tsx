import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";

interface Follower {
  id: string;
  username: string;
  name: string;
  timestamp: string;
}

interface FollowersListProps {
  title: string;
  followers: Follower[];
  type: "followers" | "unfollowers";
}

export const FollowersList = ({ title, followers, type }: FollowersListProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {followers.map((follower) => (
            <div
              key={follower.id}
              className="flex items-center space-x-4 rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              <div className="rounded-full bg-twitter-light p-2">
                <User className="h-4 w-4 text-twitter-blue" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{follower.name}</p>
                <p className="text-sm text-gray-500">@{follower.username}</p>
              </div>
              <div className="text-xs text-gray-500">{follower.timestamp}</div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
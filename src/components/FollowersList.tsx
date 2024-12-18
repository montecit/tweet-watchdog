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
  const openTwitterProfile = (userId: string) => {
    // Remove any "user_" prefix if present
    const cleanId = userId.replace('user_', '');
    window.open(`https://twitter.com/i/user/${cleanId}`, '_blank');
  };

  return (
    <Card className="animate-fade-in bg-white shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {followers && followers.length > 0 ? (
            <div className="divide-y">
              {followers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openTwitterProfile(follower.username)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openTwitterProfile(follower.username);
                    }
                  }}
                >
                  <div className="rounded-full bg-gray-100 p-2">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{follower.name}</p>
                    <p className="text-sm text-gray-500 truncate">@{follower.username}</p>
                  </div>
                  <div className="text-xs text-gray-400">{follower.timestamp}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 p-4">
              No {type} found
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
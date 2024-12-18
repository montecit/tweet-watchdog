import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, UserMinus, Users } from "lucide-react";

interface StatsProps {
  totalFollowers: number;
  newFollowers: number;
  unfollowers: number;
}

export const Stats = ({ totalFollowers, newFollowers, unfollowers }: StatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="animate-fade-in bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalFollowers}</div>
          <p className="text-xs text-gray-500 mt-1">Active followers</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Followers</CardTitle>
          <UserPlus className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newFollowers}</div>
          <p className="text-xs text-gray-500 mt-1">Recent additions</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unfollowers</CardTitle>
          <UserMinus className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unfollowers}</div>
          <p className="text-xs text-gray-500 mt-1">Lost followers</p>
        </CardContent>
      </Card>
    </div>
  );
};
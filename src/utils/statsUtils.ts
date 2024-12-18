import { Follower } from "@/hooks/useFollowers";

export const calculateStats = (followers: Follower[]) => {
  const totalFollowers = followers.length;
  const newFollowers = followers.filter(f => {
    const date = new Date(f.timestamp);
    const now = new Date();
    return now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return {
    totalFollowers,
    newFollowers,
    unfollowers: 0
  };
};

export const prepareChartData = (followers: Follower[]) => {
  return followers
    .reduce((acc, curr) => {
      const date = curr.timestamp;
      const existing = acc.find(item => item.date === date);
      if (existing) {
        existing.followers += 1;
      } else {
        acc.push({ date, followers: 1 });
      }
      return acc;
    }, [] as { date: string; followers: number }[])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
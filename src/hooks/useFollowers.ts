import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface Follower {
  id: string;
  name: string;
  username: string;
  timestamp: string;
}

export const useFollowers = () => {
  const { toast } = useToast();
  const [followers, setFollowers] = useState<Follower[]>(() => {
    const saved = localStorage.getItem('followers');
    return saved ? JSON.parse(saved) : [];
  });

  const clearData = () => {
    localStorage.removeItem('followers');
    setFollowers([]);
    toast({
      title: "Success",
      description: "All follower data has been cleared",
    });
  };

  const addFollower = (name: string, username: string) => {
    if (!name || !username) {
      toast({
        title: "Error",
        description: "Please fill in both name and username",
        variant: "destructive"
      });
      return;
    }

    const newFollower = {
      id: Date.now().toString(),
      name,
      username,
      timestamp: new Date().toISOString().split('T')[0]
    };

    const updatedFollowers = [...followers, newFollower];
    setFollowers(updatedFollowers);
    localStorage.setItem('followers', JSON.stringify(updatedFollowers));
    
    toast({
      title: "Success",
      description: "Follower added successfully",
    });
  };

  const importFollowers = (importedFollowers: Follower[]) => {
    const existingIds = new Set(followers.map(f => f.id));
    const newFollowers = importedFollowers.filter(f => !existingIds.has(f.id));
    
    const updatedFollowers = [...followers, ...newFollowers];
    setFollowers(updatedFollowers);
    localStorage.setItem('followers', JSON.stringify(updatedFollowers));
  };

  return {
    followers,
    clearData,
    addFollower,
    importFollowers
  };
};
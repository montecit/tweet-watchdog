import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface TwitterFollower {
  follower: {
    accountId: string;
    userLink: string;
    userName: string;
    displayName: string;
  };
}

export const TwitterImport = ({ onImport }: { onImport: (followers: any[]) => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      console.log('Raw file content:', text.substring(0, 200));
      
      // First, clean the text by removing any BOM or whitespace
      const cleanText = text.trim().replace(/^\uFEFF/, '');
      
      // Check if the file starts with the expected prefix (case insensitive)
      if (!cleanText.toLowerCase().startsWith('window.ytd.follower.part0')) {
        throw new Error('Invalid file format: File must start with "window.YTD.follower.part0"');
      }

      // Extract the JSON part after the assignment
      const jsonStartIndex = cleanText.indexOf('=') + 1;
      const jsonText = cleanText.slice(jsonStartIndex).trim();
      
      console.log('Extracted JSON:', jsonText.substring(0, 200));
      
      // Parse the JSON data
      const data = JSON.parse(jsonText);
      console.log('Parsed data:', data);
      
      // Handle both array format and direct object format
      const followersArray = Array.isArray(data) ? data : [data];
      
      const followers = followersArray.map((f: any) => {
        console.log('Raw follower data:', f);
        const userId = f.follower.accountId;
        return {
          id: userId,
          username: `user_${userId}`, // Create a username from the ID
          name: `Twitter User ${userId}`, // Create a display name from the ID
          timestamp: new Date().toISOString().split('T')[0]
        };
      });

      console.log('Mapped followers:', followers);
      
      onImport(followers);
      
      toast({
        title: "Success",
        description: `Imported ${followers.length} followers. Note: Usernames are shown as user IDs since the export file only contains IDs.`,
      });
    } catch (error) {
      console.error('Error parsing Twitter data:', error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to parse Twitter data. Make sure you're uploading the correct follower.js file from your Twitter data export.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold">Import Twitter Data</h3>
      <p className="text-sm text-gray-600">
        1. Go to Twitter Settings → Your Account → Download an archive of your data<br />
        2. Wait for the email with your data<br />
        3. Extract the ZIP file and find the follower.js file in the data folder<br />
        4. Upload that file here<br />
        Note: Due to Twitter's data export format, followers will be shown with their numeric IDs
      </p>
      <div className="flex gap-2">
        <Input
          type="file"
          accept=".js,.json"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        <Button disabled={isLoading} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </div>
    </div>
  );
};
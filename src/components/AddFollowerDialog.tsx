import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddFollowerDialogProps {
  onAdd: (name: string, username: string) => void;
}

export const AddFollowerDialog = ({ onAdd }: AddFollowerDialogProps) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const handleAdd = () => {
    onAdd(name, username);
    setName('');
    setUsername('');
  };

  return (
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
            />
          </div>
          <Button onClick={handleAdd} className="w-full">
            Add Follower
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
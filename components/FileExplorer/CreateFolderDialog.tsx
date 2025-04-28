'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FolderPlus } from 'lucide-react';

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFolderDialog({
  open,
  onOpenChange,
}: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    setFolderName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            Create New Folder
          </DialogTitle>
          <DialogDescription>
            Enter a name for your new folder
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                setError('');
              }}
              placeholder="New Folder"
              className={error ? 'border-destructive' : ''}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm mt-1">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFolderName('');
                setError('');
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { FileUp } from 'lucide-react';
import { createFile } from '@/lib/fun';

interface CreateFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFolderId?: string;
}

export function CreateFileDialog({
  open,
  onOpenChange,
  currentFolderregardingId,
}: CreateFileDialogProps) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileName.trim()) {
      setError('File name cannot be empty');
      return;
    }

    try {
      createFile(fileName, currentFolderId);
      setFileName('');
      setError('');
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create file');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            Create New File
          </DialogTitle>
          <DialogDescription>
            Enter a name for your new file (include the extension, e.g., document.docx)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError('');
              }}
              placeholder="newfile.txt"
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
                setFileName('');
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

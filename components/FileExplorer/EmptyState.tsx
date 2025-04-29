'use client';

import { FolderPlus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CreateFolderDialog } from './CreateFolderDialog';
import { CreateFileDialog } from './CreateFileDialog';
import { createFile } from '@/lib/fun';

interface EmptyStateProps {
  currentFolderId?: string;
  onRefresh: () => void;
}

export function EmptyState({ currentFolderId, onRefresh }: EmptyStateProps) {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        // Assuming createFile is available globally or imported
        createFile(file.name, currentFolderId, file.size);
        onRefresh();
      } catch (err) {
        console.error('Upload failed:', err);
      }
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed border-muted-foreground/25 h-64">
      <div className="space-y-4 text-center">
        <h3 className="text-lg font-medium">No files or folders</h3>
        <p className="text-sm text-muted-foreground">
          Get started by creating a folder or uploading a file
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFolderDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            Create Folder
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
            <input
              type="file"
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>

      <CreateFolderDialog
        open={isFolderDialogOpen}
        onOpenChange={setIsFolderDialogOpen}
        currentFolderId={currentFolderId}
        onRefresh={onRefresh}
      />

      <CreateFileDialog
        open={isFileDialogOpen}
        onOpenChange={setIsFileDialogOpen}
        currentFolderId={currentFolderId}
        onRefresh={onRefresh}
      />
    </div>
  );
}

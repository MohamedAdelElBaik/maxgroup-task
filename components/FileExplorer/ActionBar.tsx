'use client';

import { Button } from '@/components/ui/button';
import { FolderPlus, Upload, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateFolderDialog } from './CreateFolderDialog';
import { CreateFileDialog } from './CreateFileDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createFile } from '@/lib/fun';

interface ActionBarProps {
  currentFolderId?: string;
  onRefresh: () => void;
}

export function ActionBar({ currentFolderId, onRefresh }: ActionBarProps) {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        createFile(file.name, currentFolderId, file.size);
        onRefresh();
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    e.target.value = ''; // Reset input
  };

  const desktopActions = (
    <div className="hidden md:flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsFolderDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <FolderPlus className="h-4 w-4" />
        New Folder
      </Button>

      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
        <input
          type="file"
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          onChange={handleFileUpload}
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsFileDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        New File
      </Button>
    </div>
  );

  const mobileActions = (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsFolderDialogOpen(true)}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsFileDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New File
          </DropdownMenuItem>

          <div className="relative">
            <DropdownMenuItem>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </DropdownMenuItem>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Files</h2>

        {desktopActions}
        {mobileActions}
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
    </>
  );
}

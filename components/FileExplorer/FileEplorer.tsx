'use client';

import { useState } from 'react';
import { ActionBar } from './ActionBar';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';
import { Breadcrumb } from './Breadcrumb';
import { DriveItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { FolderPlus, Upload, Plus } from 'lucide-react';

interface FileExplorerProps {
  driveItems: DriveItem[];
  onFolderSelect: (folder: DriveItem | null) => void;
  currentFolder: DriveItem | null;
  breadcrumbPath: DriveItem[];
}

export function FileExplorer({ driveItems, onFolderSelect, currentFolder, breadcrumbPath }: FileExplorerProps) {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  if (!driveItems || driveItems.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Breadcrumb path={breadcrumbPath} onNavigate={onFolderSelect} />
        <ActionBar currentFolderId={currentFolder?.id} />
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">This folder is empty.</p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFolderDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFileDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New File
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Breadcrumb path={breadcrumbPath} onNavigate={onFolderSelect} />
      <ActionBar currentFolderId={currentFolder?.id} />
      <div className="grid grid-cols-1 gap-4">
        {driveItems.map(item => (
          item.type === "file" ? (
            <FileCard key={item.id} file={item} />
          ) : (
            <FolderCard key={item.id} folder={item} onSelect={() => onFolderSelect(item)} />
          )
        ))}
      </div>
    </div>
  );
}

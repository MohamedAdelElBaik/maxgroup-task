'use client';

import { ActionBar } from './ActionBar';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';
import { Breadcrumb } from './Breadcrumb';
import { EmptyState } from './EmptyState';
import { DriveItem } from '@/lib/types';
import { SkeletonCard } from './SkeletonCard';

interface FileExplorerProps {
  driveItems: DriveItem[];
  onFolderSelect: (folder: DriveItem | null) => void;
  currentFolder: DriveItem | null;
  breadcrumbPath: DriveItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function FileExplorer({ driveItems, onFolderSelect, currentFolder, breadcrumbPath, isLoading, onRefresh }: FileExplorerProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Breadcrumb path={breadcrumbPath} onNavigate={onFolderSelect} />
        <ActionBar currentFolderId={currentFolder?.id} onRefresh={onRefresh} />
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!driveItems || driveItems.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Breadcrumb path={breadcrumbPath} onNavigate={onFolderSelect} />
        <ActionBar currentFolderId={currentFolder?.id} onRefresh={onRefresh} />
        <EmptyState currentFolderId={currentFolder?.id} onRefresh={onRefresh} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Breadcrumb path={breadcrumbPath} onNavigate={onFolderSelect} />
      <ActionBar currentFolderId={currentFolder?.id} onRefresh={onRefresh} />
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

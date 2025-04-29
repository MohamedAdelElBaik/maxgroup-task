"use client"
import { useState } from 'react';
import { FileExplorer } from '@/components/FileExplorer/FileEplorer';
import { getAllItems } from '@/lib/fun';
import { DriveItem } from '@/lib/types';

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<DriveItem | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<DriveItem[]>([]);
  const driveItems = currentFolder ? currentFolder.child : getAllItems();

  const handleFolderSelect = (folder: DriveItem | null) => {
    setCurrentFolder(folder);
    if (folder) {
      // Build breadcrumb path
      const path = [];
      let current: DriveItem | null = folder;
      while (current) {
        path.unshift(current);
        // Find parent (simplified; in a real app, store parentId in DriveItem)
        current = findParent(current.id, getAllItems());
      }
      setBreadcrumbPath(path);
    } else {
      setBreadcrumbPath([]);
    }
  };

  // Helper to find parent (searches recursively)
  const findParent = (id: string, items: DriveItem[]): DriveItem | null => {
    for (const item of items) {
      if (item.child.some(child => child.id === id)) {
        return item;
      }
      if (item.child.length > 0) {
        const found = findParent(id, item.child);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <FileExplorer
      driveItems={driveItems}
      onFolderSelect={handleFolderSelect}
      currentFolder={currentFolder}
      breadcrumbPath={breadcrumbPath}
    />
  );
}

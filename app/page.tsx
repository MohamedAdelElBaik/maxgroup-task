"use client"
import { useState, useEffect } from 'react';
import { FileExplorer } from '@/components/FileExplorer/FileEplorer';
import { getAllItems, findItemById } from '@/lib/fun';
import { DriveItem } from '@/lib/types';

export default function Home() {
  const [currentFolder, setCurrentFolder] = useState<DriveItem | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<DriveItem[]>([]);
  const [driveItems, setDriveItems] = useState<DriveItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data and persisted folder on mount
  useEffect(() => {
    const allItems = getAllItems();
    const savedFolderId = localStorage.getItem('current_folder_id');

    if (savedFolderId) {
      const folder = findItemById(savedFolderId, allItems);
      if (folder) {
        setCurrentFolder(folder);
        buildBreadcrumbPath(folder, allItems);
        setDriveItems(folder.child);
      } else {
        setDriveItems(allItems);
      }
    } else {
      setDriveItems(allItems);
    }

    setIsLoading(false);
  }, []);

  const buildBreadcrumbPath = (folder: DriveItem, items: DriveItem[]) => {
    const path = [];
    let current: DriveItem | null = folder;
    while (current) {
      path.unshift(current);
      current = findParent(current.id, items);
    }
    setBreadcrumbPath(path);
  };

  const refreshDriveItems = () => {
    const allItems = getAllItems();
    const items = currentFolder
      ? findItemById(currentFolder.id, allItems)?.child || []
      : allItems;
    setDriveItems(items);
  };

  const handleFolderSelect = (folder: DriveItem | null) => {
    const allItems = getAllItems();
    if (folder) {
      localStorage.setItem('current_folder_id', folder.id);
      setCurrentFolder(folder);
      buildBreadcrumbPath(folder, allItems);
      setDriveItems(folder.child);
    } else {
      localStorage.removeItem('current_folder_id');
      setCurrentFolder(null);
      setBreadcrumbPath([]);
      setDriveItems(allItems);
    }
  };

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
      isLoading={isLoading}
      onRefresh={refreshDriveItems}
    />
  );
}

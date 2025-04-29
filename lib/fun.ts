import { DriveItem } from "./types"

const STORAGE_KEY = 'drive_clone_data';

export const getAllItems = (): DriveItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const getItemByName = (name: string, parentItems: DriveItem[]): DriveItem | undefined => {
  for (const item of parentItems) {
    if (item.name.toLowerCase() === name.toLowerCase() && item.type === "folder") {
      return item;
    }
    if (item.child.length > 0) {
      const found = getItemByName(name, item.child);
      if (found) return found;
    }
  }
  return undefined;
};

export const storeItemsInLocalStorage = (items: DriveItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function createFile(name: string, parentId?: string, size?: number) {
  const sanitizedName = name.trim().replace(/[<>:"/\\|?*]/g, '');
  if (!sanitizedName) throw new Error("Invalid file name");

  const allItems = getAllItems();
  const newFile: DriveItem = {
    id: `file_${Date.now()}`,
    name: sanitizedName,
    type: "file",
    createdAt: new Date().toISOString(),
    child: [],
    size: size || 0,
  };

  if (!parentId) {
    if (allItems.some(item => item.name.toLowerCase() === sanitizedName.toLowerCase())) {
      throw new Error("File with this name already exists");
    }
    allItems.push(newFile);
  } else {
    const parent = findItemById(parentId, allItems);
    if (!parent || parent.type !== "folder") {
      throw new Error("Parent folder not found");
    }
    if (parent.child.some(item => item.name.toLowerCase() === sanitizedName.toLowerCase())) {
      throw new Error("File with this name already exists in this folder");
    }
    parent.child.push(newFile);
  }

  storeItemsInLocalStorage(allItems);
  return allItems;
}

export function createFolder(name: string, parentId?: string) {
  const sanitizedName = name.trim().replace(/[<>:"/\\|?*]/g, '');
  if (!sanitizedName) throw new Error("Invalid folder name");

  const allItems = getAllItems();
  const newFolder: DriveItem = {
    id: `folder_${Date.now()}`,
    name: sanitizedName,
    type: "folder",
    createdAt: new Date().toISOString(),
    child: [],
  };

  if (!parentId) {
    if (allItems.some(item => item.name.toLowerCase() === sanitizedName.toLowerCase())) {
      throw new Error("Folder with this name already exists");
    }
    allItems.push(newFolder);
  } else {
    const parent = findItemById(parentId, allItems);
    if (!parent || parent.type !== "folder") {
      throw new Error("Parent folder not found");
    }
    if (parent.child.some(item => item.name.toLowerCase() === sanitizedName.toLowerCase())) {
      throw new Error("Folder with this name already exists in this folder");
    }
    parent.child.push(newFolder);
  }

  storeItemsInLocalStorage(allItems);
  return allItems;
}

export function findItemById(id: string, items: DriveItem[]): DriveItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.child.length > 0) {
      const found = findItemById(id, item.child);
      if (found) return found;
    }
  }
  return undefined;
}

export function deleteItem(id: string): DriveItem[] {
  const allItems = getAllItems();

  const index = allItems.findIndex(item => item.id === id);
  if (index !== -1) {
    allItems.splice(index, 1);
    storeItemsInLocalStorage(allItems);
    return allItems;
  }

  const parent = findParent(id, allItems);
  if (parent) {
    const childIndex = parent.child.findIndex(item => item.id === id);
    if (childIndex !== -1) {
      parent.child.splice(childIndex, 1);
      storeItemsInLocalStorage(allItems);
    }
  }

  return allItems;
}

function findParent(id: string, items: DriveItem[]): DriveItem | null {
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
}

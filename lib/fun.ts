import { DriveItem } from "./types"

const STORAGE_KEY = 'drive_clone_data';


export const getAllItems = (): DriveItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export function storeItemInLocalStorage(item: DriveItem) {
  const allItems = getAllItems();
  allItems.push(item);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allItems));
}

export function createFile(name: string) {
  // save in locale storage
  storeItemInLocalStorage({ name, id: "33", type: "file", createdAt: String(Date.now()) })
  // 
}

export function createFolder(name: string) {
  // save in locale storage
  storeItemInLocalStorage({ name, id: "33", type: "folder", createdAt: String(Date.now()), child: null })
  // 
}


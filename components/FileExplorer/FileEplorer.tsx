'use client';

import { ActionBar } from './ActionBar';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';
import { DriveItem } from '@/lib/types';

export function FileExplorer({ driveItems }: { driveItems: DriveItem[] | undefined | null }) {

  console.log(driveItems)
  if (!driveItems) return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ActionBar />
      <h1>there is no items in this folder</h1>
    </div>
  )

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ActionBar />

      {
        driveItems.map(item => {
          const itemType = item.type;
          return itemType === "file" ?
            (
              <FileCard file={item} />
            ) : (
              <FolderCard folder={item} />
            )
        })
      }
    </div>
  );
}

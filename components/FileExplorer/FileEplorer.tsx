
'use client';

import { getAllItems } from '@/lib/fun';
import { ActionBar } from './ActionBar';
import { FileCard } from './FileCard';
import { FolderCard } from './FolderCard';

export function FileExplorer() {
  const driveItems = getAllItems();

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

'use client';

import { Folder as FolderIcon, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';
import { DriveItem } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface FolderCardProps {
  folder: DriveItem;
}

export const FolderCard = forwardRef<HTMLDivElement, FolderCardProps>(
  ({ folder }, ref) => {
    const formattedDate = new Date(folder.createdAt).toLocaleDateString();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
      // Prevent navigation when clicking dropdown
      if (!(e.target as HTMLElement).closest('button')) {
        router.push(folder.id);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className="group relative flex items-center p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer"
      >
        <div className="p-2 mr-3 rounded-md text-amber-500 bg-amber-50 dark:bg-amber-950 dark:text-amber-300">
          <FolderIcon className="h-6 w-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate" title={folder.name}>
            {folder.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>Folder</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

FolderCard.displayName = 'FolderCard';

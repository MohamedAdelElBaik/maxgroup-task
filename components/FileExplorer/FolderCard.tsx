'use client';

import { Folder as FolderIcon, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { forwardRef, useState } from 'react';
import { DriveItem } from '@/lib/types';
import { deleteItem } from '@/lib/fun';
import { ConfirmDialog } from './ConfirmDialog';

interface FolderCardProps {
  folder: DriveItem;
  onSelect: () => void;
  onDelete: () => void;
}

export const FolderCard = forwardRef<HTMLDivElement, FolderCardProps>(
  ({ folder, onSelect, onDelete }, ref) => {
    const formattedDate = new Date(folder.createdAt).toLocaleDateString();

    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowConfirm(true);
    };

    const confirmDelete = () => {
      deleteItem(folder.id);
      onDelete();
      setShowConfirm(false);
    };

    const handleClick = (e: React.MouseEvent) => {
      if (!(e.target as HTMLElement).closest('button')) {
        onSelect();
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
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ConfirmDialog
          open={showConfirm}
          onOpenChange={setShowConfirm}
          onConfirm={confirmDelete}
          title={`Delete ${folder.name}?`}
          description="This action cannot be undone. Are you sure you want to delete this item?"
        />
      </div>
    );
  }
);

FolderCard.displayName = 'FolderCard';

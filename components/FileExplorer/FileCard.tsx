'use client';

import { File, MoreHorizontal, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { DriveItem } from '@/lib/types';
import { deleteItem } from '@/lib/fun';

interface FileCardProps {
  file: DriveItem;
  onDelete: () => void;
}

export const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
  ({ file, onDelete }, ref) => {
    const formattedDate = new Date(file.createdAt).toLocaleDateString();
    const formattedSize = formatFileSize(Math.floor(Math.random() * 1000000));

    function formatFileSize(bytes: number): string {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteItem(file.id);
      onDelete(); // Refresh the parent component
    };

    return (
      <div
        ref={ref}
        className="group relative flex items-center p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer"
      >
        <div className={cn("p-2 mr-3 rounded-md")}>
          <File className="h-6 w-6" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate" title={file.name}>
            {file.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{formattedSize}</span>
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
              onClick={handleDelete}
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

FileCard.displayName = 'FileCard';

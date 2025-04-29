'use client';

import { getFileIcon, getFileTypeColor } from '@/lib/utils';
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

interface FileCardProps {
  file: { id: string, name: string, fileType: string, createdAt: string };
}

export const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
  ({ file }, ref) => {

    console.log(file.name)

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
            <span>{"formattedDate"}</span>
            <span className="mx-2">•</span>
            <span>{"formattedSize"}</span>
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
            //         onClick={() => onDelete(file.id)}
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

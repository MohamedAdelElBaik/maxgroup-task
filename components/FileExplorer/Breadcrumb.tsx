'use client';

import { DriveItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  path: DriveItem[];
  onNavigate: (folder: DriveItem | null) => void;
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
      <Button
        variant="link"
        className="p-0 h-auto text-muted-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(null);
        }}
      >
        Home
      </Button>
      {path.map((folder) => (
        <div key={folder.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Button
            variant="link"
            className="p-0 h-auto text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(folder);
            }}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}

'use client';

import {
  HardDrive,
  Star,
  Clock,
  Trash2,
  Info,
  Settings
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { ThemeToggle } from '../ui/theme-toggle';

export function Sidebar() {

  return (
    <div className="h-full w-[240px] border-r p-4 hidden md:block">
      <div className="flex items-center mb-6">
        <HardDrive className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-xl font-bold">MyDrive</h1>
      </div>

      <div className="space-y-1">
        <SidebarItem
          icon={<HardDrive className="h-4 w-4" />}
          label="My Drive"
        />
        <SidebarItem
          icon={<Star className="h-4 w-4" />}
          label="Starred"
        />
        <SidebarItem
          icon={<Clock className="h-4 w-4" />}
          label="Recent"
        />
        <SidebarItem
          icon={<Trash2 className="h-4 w-4" />}
          label="Trash"
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 space-y-1">
        <div className="flex items-center justify-between px-2 mb-4">
          <ThemeToggle />

          <div className="flex space-x-1">
            <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
            <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
  );
}

'use client';

import { HardDrive, Menu, Star, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SidebarItem } from '../Sidebar/SidebarItem';

export function MobileNav() {

  return (
    <div className="md:hidden border-b p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] pt-12">
            <div className="space-y-4">
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

            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center">
          <HardDrive className="h-5 w-5 mr-2 text-primary" />
          <h1 className="text-lg font-bold">MyDrive</h1>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}

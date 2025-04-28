'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export function SidebarItem({ icon, label, onClick, active = false }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1 font-normal text-muted-foreground",
        active && "bg-secondary text-primary font-medium"
      )}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Button>
  );
}